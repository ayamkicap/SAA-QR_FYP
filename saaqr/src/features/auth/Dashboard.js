import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { selectAllUsers } from '../users/usersApiSlice'; // Adjust this selector based on your actual slice
import { selectAllEvents } from '../events/eventsApiSlice'; // Adjust this selector based on your actual slice

/// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const users = useSelector(selectAllUsers);
    const events = useSelector(selectAllEvents);
  
    // User statistics calculations
    const roleCounts = users.reduce((acc, user) => {
      user.roles.forEach(role => {
        acc[role] = (acc[role] || 0) + 1;
      });
      return acc;
    }, {});
  
    const yearStudyCounts = users.reduce((acc, user) => {
      const year = user.year_study;
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {});
  
    const roleData = {
      labels: Object.keys(roleCounts),
      datasets: [{
        label: 'User Roles',
        data: Object.values(roleCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };
  
    const yearStudyData = {
      labels: Object.keys(yearStudyCounts),
      datasets: [{
        label: 'Year of Study',
        data: Object.values(yearStudyCounts),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }]
    };
  
    // Event statistics calculations
    const updateCounts = events.reduce((acc, event) => {
      const updateStatus = event.update.toLowerCase();
      acc[updateStatus] = (acc[updateStatus] || 0) + 1;
      return acc;
    }, {});
  
    const completionCounts = events.reduce((acc, event) => {
      const completionStatus = event.completed ? 'Completed' : 'Open';
      acc[completionStatus] = (acc[completionStatus] || 0) + 1;
      return acc;
    }, {});
  
    const terasCounts = events.reduce((acc, event) => {
      const teras = event.Teras;
      acc[teras] = (acc[teras] || 0) + 1;
      return acc;
    }, {});
  
    const attendanceCounts = events.reduce((acc, event) => {
      const attendance = event.attendance;
      acc[attendance] = (acc[attendance] || 0) + 1;
      return acc;
    }, {});
  
    const updateData = {
      labels: Object.keys(updateCounts),
      datasets: [{
        label: 'Event Updates',
        data: Object.values(updateCounts),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };
  
    const completionData = {
      labels: Object.keys(completionCounts),
      datasets: [{
        label: 'Completion Status',
        data: Object.values(completionCounts),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    };
  
    const terasData = {
      labels: Object.keys(terasCounts),
      datasets: [{
        label: 'Teras Distribution',
        data: Object.values(terasCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };
  
    const attendanceData = {
      labels: Object.keys(attendanceCounts),
      datasets: [{
        label: 'Attendance',
        data: Object.values(attendanceCounts),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }]
    };
  
    return (
      <section className="dashboard-section">
        <h2>User and Event Statistics</h2>
        <div className="user-statistics">
          <h3>User Statistics</h3>
          <div className="chart-container">
            <div className="chart">
              <h4>Roles</h4>
              <Bar data={roleData} />
            </div>
            <div className="chart">
              <h4>Year of Study</h4>
              <Pie data={yearStudyData} />
            </div>
          </div>
        </div>
        <div className="event-statistics">
          <h3>Event Statistics</h3>
          <div className="chart-container">
            <div className="chart">
              <h4>Updates</h4>
              <Bar data={updateData} />
            </div>
            <div className="chart">
              <h4>Completion Status</h4>
              <Pie data={completionData} />
            </div>
            <div className="chart">
              <h4>Teras Distribution</h4>
              <Bar data={terasData} />
            </div>
            <div className="chart">
              <h4>Attendance</h4>
              <Pie data={attendanceData} />
            </div>
          </div>
        </div>
      </section>
    );
  };

export default Dashboard;
