import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const logsAdapter = createEntityAdapter({})

const initialState = logsAdapter.getInitialState()

// const updatedState = logsAdapter.upsertMany(state, responseData);


export const LogControllerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLogs: builder.query({
            query: () => '/logs/mongo',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: (responseData, state) => {
                console.log('Response Data:', responseData);
                // Assuming responseData is an array of log objects
                const updatedState = logsAdapter.upsertMany(state, responseData);
                console.log('Updated State:', updatedState);
                return updatedState;
            },                                             
            providesTags: ['Log']
        })
    }),
})

export const {
    useGetLogsQuery
} = LogControllerApiSlice

// Returns the query result object
export const selectLogsResult = LogControllerApiSlice.endpoints.getLogs.select()

// Creates a memoized selector
const selectLogsData = createSelector(
    selectLogsResult,
    logsResult => logsResult.data // normalized state object with ids & entities
)

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllLogs,
    selectById: selectLogById,
    selectIds: selectLogIds
    // Pass in a selector that returns the logs slice of state
} = logsAdapter.getSelectors(state => selectLogsData(state) ?? initialState)
