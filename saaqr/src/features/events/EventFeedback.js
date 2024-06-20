import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEventById, useGetEventsQuery } from './eventsApiSlice';
import { useGetUsersQuery } from '../users/usersApiSlice'; // Adjust the import path as necessary

const EventFeedback = () => {
    const { eventId } = useParams();

    const {
        data: events,
        isLoading: eventsLoading,
        isError: eventsError,
        error: eventsErrorObj,
    } = useGetEventsQuery('eventList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    const {
        data: usersData,
        isLoading: usersLoading,
        isError: usersError,
        error: usersErrorObj,
    } = useGetUsersQuery();

    const users = usersData?.data || []; // Adjust this based on actual data structure

    const event = useSelector((state) => selectEventById(state, eventId));

    if (eventsLoading || usersLoading) {
        return (
            <div style={styles.loading}>
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    if (eventsError) {
        return <div style={styles.error}>Error: {eventsErrorObj.message}</div>;
    }

    if (usersError) {
        return <div style={styles.error}>Error: {usersErrorObj.message}</div>;
    }

    if (!event) {
        return <div style={styles.noEvent}>No event found</div>;
    }

    console.log('Event:', event);
    console.log('Users:', users); // Log the users to check its structure

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Students Feedback Event</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>#</th>
                        <th style={styles.tableHeader}>Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {event.feedback.flat().map((feedbackItem, index) => (
                        <tr key={feedbackItem._id} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                            <td style={styles.tableCell}>{index + 1}</td>
                            <td style={styles.tableCell}>{feedbackItem.text}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        padding: '30px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        color: '#333',
    },
    heading: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
        fontSize: '28px',
        fontWeight: 'bold',
    },
    loading: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        color: '#555',
    },
    error: {
        textAlign: 'center',
        color: 'red',
        marginTop: '20px',
    },
    noEvent: {
        textAlign: 'center',
        color: '#777',
        marginTop: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    tableHeader: {
        borderBottom: '2px solid #ccc',
        textAlign: 'left',
        padding: '15px',
        backgroundColor: '#f7f7f7',
        fontWeight: 'bold',
        color: '#333',
    },
    tableRow: {
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #eee',
    },
    tableRowAlt: {
        backgroundColor: '#f9f9f9',
        borderBottom: '1px solid #eee',
    },
    tableCell: {
        padding: '15px',
        textAlign: 'left',
        color: '#555',
    },
};

export default EventFeedback;
