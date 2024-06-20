import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEventById, useGetEventsQuery } from './eventsApiSlice';
import { useGetUsersQuery } from '../users/usersApiSlice'; // Adjust the import path as necessary

const StudentList = () => {
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
    data: users,
    isLoading: usersLoading,
    isError: usersError,
    error: usersErrorObj,
  } = useGetUsersQuery();

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

  const getUsernameById = (id) => {
    return users.entities[id]?.username || 'Unknown';
  };

  const getMatricById = (id) => {
    return users.entities[id]?.card_number || 'Unknown';
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Students Joined Event</h2>
      <ul style={styles.studentList}>
        {event.attendance.map((studentId) => (
          <li key={studentId} style={styles.studentItem}>
            <div style={styles.studentAvatar}></div>
            <div style={styles.studentDetails}>
              <span style={styles.studentName}>{getUsernameById(studentId)}</span>
              <span style={styles.studentId}>Matric ID: {getMatricById(studentId)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
  noEvent: {
    textAlign: 'center',
    color: '#333',
  },
  studentList: {
    listStyleType: 'none',
    padding: 0,
  },
  studentItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #ccc',
  },
  studentAvatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#ddd',
    marginRight: '15px',
  },
  studentDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  studentName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
  studentId: {
    fontSize: '14px',
    color: '#666',
  },
};

export default StudentList;


