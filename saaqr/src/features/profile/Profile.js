import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserById } from './profileApiSlice';
import useAuth from '../../hooks/useAuth';
import { Card, CardContent, Typography, Grid, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
}));

const Profile = () => {
    const { id } = useAuth();
    const user = useSelector(state => selectUserById(state, id));

    if (!user) return null;

    const userRolesString = user.roles.join(', ');

    return (
        <StyledCard>
            <CardContent>
                <Typography variant="h4" component="div" gutterBottom>
                    {user.username}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Email:</Typography>
                        <Typography variant="body1">{user.email}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Card Number:</Typography>
                        <Typography variant="body1">{user.card_number}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Roles:</Typography>
                        <Typography variant="body1">{userRolesString}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Year of Study:</Typography>
                        <Typography variant="body1">{user.year_study}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Active:</Typography>
                        <Chip label={user.active ? 'Yes' : 'No'} color={user.active ? 'success' : 'default'} />
                    </Grid>
                </Grid>
            </CardContent>
        </StyledCard>
    );
}

export default Profile;
