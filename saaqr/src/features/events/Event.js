import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectEventById } from './eventsApiSlice';
import axios from 'axios';
import useAuth from '../../hooks/useAuth'

const Event = ({ eventId }) => {
    const [showPrompt, setShowPrompt] = useState(false);
    const { isDeveloper,isAdmin,isOrganizerI,isOrganizerO} = useAuth()

    const event = useSelector(state => selectEventById(state, eventId));
    const navigate = useNavigate();

    if (event) {
        const created = new Date(event.createdAt).toLocaleString('en-MY', { day: 'numeric', month: 'long' });
        const updated = new Date(event.updatedAt).toLocaleString('en-MY', { day: 'numeric', month: 'long' });

        const handleEdit = () => navigate(`/dash/events/${eventId}`);
        const handleDetail = () => navigate(`/dash/events/${eventId}/detail`);

        const token = 'your-jwt-token-here'; // Replace with your actual JWT token

        const handleAccept = async () => {
            try {
                const response = await axios.patch('http://localhost:3500/events', {
                    id: eventId,
                    update: 'ACCEPT'
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
                setShowPrompt(false);
                window.location.reload(); // Refresh the page
            } catch (error) {
                console.error('Error updating event:', error);
            }
        };

        const handleDecline = async () => {
            try {
                const response = await axios.patch('http://localhost:3500/events', {
                    id: eventId,
                    update: 'REJECT'
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
                setShowPrompt(false);
                window.location.reload(); // Refresh the page
            } catch (error) {
                console.error('Error updating event:', error);
            }
        };

        const handleOpen = async () => {
            try {
                const response = await axios.patch('http://localhost:3500/events', {
                    id: eventId,
                    status: 'Open'
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
                setShowPrompt(false);
                window.location.reload(); // Refresh the page
            } catch (error) {
                console.error('Error updating event:', error);
            }
        };

        const handleClose = async () => {
            try {
                const response = await axios.patch('http://localhost:3500/events', {
                    id: eventId,
                    status: 'Close'
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
                setShowPrompt(false);
                window.location.reload(); // Refresh the page
            } catch (error) {
                console.error('Error updating event:', error);
            }
        };


        return (
            <TableRow className="table__row" key={event._id}>
                <TableCell className="table__cell event__status">
                    {event.completed
                        ? <span className="event__status--completed">Completed</span>
                        : <span className="event__status--open">Open</span>
                    }
                    {isOrganizerI&& isOrganizerO &&(event.completed === 'Open' || event.completed === 'OPEN') ? (
                        <>
                            {showPrompt ? (
                                <div>
                                    <span>Completed ?</span>
                                    <button onClick={handleOpen}>Yes</button>
                                    <button onClick={handleClose}>No</button>
                                </div>
                            ) : (
                                <button onClick={() => setShowPrompt(true)}>Open</button>
                            )}
                        </>
                    ) : (
                        event.completed
                    )}
                </TableCell>
                <TableCell className="table__cell note__created">{created}</TableCell>
                <TableCell className="table__cell note__updated">{updated}</TableCell>
                <TableCell className="table__cell event__updated">
                    {isAdmin &&(event.update === 'pending' || event.update === 'PENDING') ? (
                        <>
                            {showPrompt ? (
                                <div>
                                    <span>Accept update?</span>
                                    <button onClick={handleAccept}>Yes</button>
                                    <button onClick={handleDecline}>No</button>
                                </div>
                            ) : (
                                <button onClick={() => setShowPrompt(true)}>Pending</button>
                            )}
                        </>
                    ) : (
                        event.update
                    )}
                </TableCell>
                <TableCell className="table__cell event__title">{event.title}</TableCell>
                <TableCell className="table__cell">{event.date_event}</TableCell>
                <TableCell className="table__cell">{event.time_event}</TableCell>
                <TableCell className="table__cell">{event.location_event}</TableCell>
                <TableCell className="table__cell">{event.myCSD}</TableCell>
                <TableCell className="table__cell">{event.Teras}</TableCell>
                <TableCell className="table__cell">{event.price_event}</TableCell>
                <TableCell className="table__cell">{event.contact_event}</TableCell>
                <TableCell className="table__th event__Image">
                    <img src={'http://localhost:3500/' + event.img_url_event} alt="Event Thumbnail" style={{ maxWidth: '100px', maxHeight: '100px' }} />
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
        );
    } else return null;
}

export default Event;
