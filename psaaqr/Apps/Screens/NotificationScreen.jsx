import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { Text, Card, ActivityIndicator, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import useAuth from '../auth/useAuth';
import { API_URL } from '../../config/APIconfig';

const NotificationScreen = () => {
  const { id } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${API_URL}/notifications/${id}/notifications`);
      setNotifications(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [id]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
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
    console.log('Error:', error.message);
    return (
      <View style={styles.center}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {notifications.length > 0 ? (
        notifications.map(notification => (
          <Card key={notification._id} style={styles.card}>
            <Card.Content>
              <Title>Type: {notification.type}</Title>
              <Paragraph>Message: {notification.message}</Paragraph>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Text>No notifications found</Text>
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

export default NotificationScreen;
