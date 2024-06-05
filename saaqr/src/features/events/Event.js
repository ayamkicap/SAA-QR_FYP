import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleDoubleRight, faPenToSquare
 } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useSelector } from 'react-redux'
import { selectEventById } from './eventsApiSlice'

const Event = ({ eventId }) => {

    const event = useSelector(state => selectEventById(state, eventId))

    const navigate = useNavigate()

    if (event) {
        const created = new Date(event.createdAt).toLocaleString('en-MY', { day: 'numeric', month: 'long' })

        const updated = new Date(event.updatedAt).toLocaleString('en-MY', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/events/${eventId}`)

        const handleDetail = () => {
            navigate(`/dash/events/${eventId}/detail`); // Adjust the path as per your route structure
          };
          

        return (
            <TableRow className="table__row" key={event._id}>
                <TableCell className="table__cell event__status">
                    {event.completed
                        ? <span className="event__status--completed">Completed</span>
                        : <span className="event__status--open">Open</span>
                    }
                </TableCell>
                <TableCell className="table__cell note__created">{created}</TableCell>
                <TableCell className="table__cell note__updated">{updated}</TableCell>
                <TableCell className="table__cell event__updated">{event.update}</TableCell>
                <TableCell className="table__cell event__title">{event.title}</TableCell>
                <TableCell className="table__cell">{event.date_event}</TableCell>
                <TableCell className="table__cell">{event.time_event}</TableCell>
                <TableCell className="table__cell">{event.location_event}</TableCell>
                <TableCell className="table__cell">{event.myCSD}</TableCell>
                <TableCell className="table__cell">{event.Teras}</TableCell>
                <TableCell className="table__cell">{event.price_event}</TableCell>
                <TableCell className="table__cell">{event.contact_event}</TableCell>
                <TableCell className="table__th event__Image">
                    <img src={'http://localhost:3500/'+event.img_url_event} alt="Event Thumbnail" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    {/* <img src={'http://localhost:3500/'+event.img_url_event} alt="Event Thumbnail" /> */}

                </TableCell>
                <TableCell className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                        className="icon-button table__button"
                        onClick={handleDetail}
                    >
                        <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </button>
                </TableCell>
            </TableRow>


        )

    } else return null
}
export default Event