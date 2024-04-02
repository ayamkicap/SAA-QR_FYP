import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const eventsAdapter = createEntityAdapter({})

const initialState = eventsAdapter.getInitialState()

export const eventsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEvents: builder.query({
            query: () => '/events',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedEvents = responseData.map(event => {
                    event.id = event._id
                    return event
                });
                return eventsAdapter.setAll(initialState, loadedEvents)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Event', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Event', id }))
                    ]
                } else return [{ type: 'Event', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetEventsQuery,
} = eventsApiSlice

// returns the query result object
export const selectEventsResult = eventsApiSlice.endpoints.getEvents.select()

// creates memoized selector
const selectEventsData = createSelector(
    selectEventsResult,
    eventsResult => eventsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllEvents,
    selectById: selectEventById,
    selectIds: selectEventIds
    // Pass in a selector that returns the events slice of state
} = eventsAdapter.getSelectors(state => selectEventsData(state) ?? initialState)