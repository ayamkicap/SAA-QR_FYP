import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { Text, Card, ActivityIndicator, Avatar, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import useAuth from '../auth/useAuth';
import { API_URL } from '../../config/APIconfig';

const ProfileScreen = () => {
  const { id } = useAuth();
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
  };

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
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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

            {/* Display myCSD information */}
            <Title style={styles.myCSDTitle}>MyCSD Points</Title>
            {loggedInUser.myCSD && loggedInUser.myCSD.length > 0 ? (
              loggedInUser.myCSD.map((csd, index) => (
                <Paragraph key={index}>{csd.teras}: {csd.points}</Paragraph>
              ))
            ) : (
              <Paragraph>No MyCSD points available.</Paragraph>
            )}
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
  myCSDTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
