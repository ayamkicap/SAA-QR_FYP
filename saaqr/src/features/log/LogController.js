import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Divider, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getLogs } from './logService';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5',
}));

const LogEntry = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const LogController = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logsData = await getLogs();
        setLogs(logsData);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          All Logs
        </Typography>
        {logs.map((log) => (
          <LogEntry key={log.id}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Timestamp:</Typography>
                <Typography variant="body1">{log.dateTime}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Message:</Typography>
                <Typography variant="body1">{log.message}</Typography>
              </Grid>
              {/* Add more fields as needed */}
            </Grid>
          </LogEntry>
        ))}
      </CardContent>
    </StyledCard>
  );
};

export default LogController;
