import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, ActivityIndicator, Avatar, Title, Paragraph, List } from 'react-native-paper';
import axios from 'axios';
import useAuth from '../auth/useAuth';

const ProfileScreen = () => {
  const { id } = useAuth();
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://172.20.10.7:3500/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  // Find the logged-in user
  const loggedInUser = users.find(user => user._id === id);

  return (
    <ScrollView style={styles.container}>
      {loggedInUser ? (
        <Card style={styles.card}>
          <Card.Title
            title={loggedInUser.username}
            subtitle={loggedInUser.email}
            left={(props) => <Avatar.Text {...props} label={loggedInUser.username.charAt(0).toUpperCase()} />}
          />
          <Card.Content>
            <Title>Profile Details</Title>
            <Paragraph>Card Number: {loggedInUser.card_number}</Paragraph>
            <Paragraph>Year of Study: {loggedInUser.year_study}</Paragraph>
            <Paragraph>Roles: {loggedInUser.roles.join(', ')}</Paragraph>
            <Paragraph>Active: {loggedInUser.active ? 'Yes' : 'No'}</Paragraph>
          </Card.Content>
        </Card>
      ) : (
        <Text>User not found</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: 10,
    padding: 10,
  },
});

export default ProfileScreen;
