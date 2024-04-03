import { useGetEventsQuery } from "./eventsApiSlice"
import Event from "./Event"
import useAuth from "../../hooks/useAuth";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const EventsList = () => {

    const { username, isDeveloper, isAdmin } = useAuth()
    const {
        data: events,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetEventsQuery('eventList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = events

        let filteredIds
        if (isDeveloper || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(eventId => entities[eventId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(eventId => <Event key={eventId} eventId={eventId} />)

        content = (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table__th event__status">created</TableCell>
                            <TableCell className="table__th event__status">Updated</TableCell>
                            <TableCell className="table__th event__status">User</TableCell>
                            <TableCell className="table__th event__created">Title</TableCell>
                            <TableCell className="table__th event__updated">Text</TableCell>
                            <TableCell className="table__th event__title">Update</TableCell>
                            <TableCell className="table__th event__username">Completed</TableCell>
                            <TableCell className="table__th event__Date">Date Event</TableCell>
                            <TableCell className="table__th event__Time">Time Event</TableCell>
                            <TableCell className="table__th event__Location">Location Event</TableCell>
                            <TableCell className="table__th event__PRice">Price Event</TableCell>
                            <TableCell className="table__th event__Contact">Contact Event</TableCell>
                            <TableCell className="table__th event__Image">Image URL Event</TableCell>
                            <TableCell className="table__th event__QRCode">QR Code</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableContent}
                    </TableBody>
                </Table>
            </TableContainer>

        )
    }

    return content
}
export default EventsList