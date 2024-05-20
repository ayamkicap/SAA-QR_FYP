import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../auth/useAuth';

export default function HomeScreen() {
  const { id,username, isDeveloper, isAdmin } = useAuth()

  
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://172.20.10.7:3500/events')
      .then(response => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleButtonPress = async (event) => {
    console.log(username,id,isDeveloper, isAdmin)
    console.log(event._id)
    try {
      // Prepare the data
      // const userJoinData = ["660acb1cef323daf613bedae", "660acac9ef323daf613bedaa"];
      const userId = id; // Replace with the actual user ID
      const eventId = event._id; // Replace with the actual event ID from the event object

      // Update the event's user_join field
      await axios.patch(`http://172.20.10.7:3500/events`, {
        id: eventId,
        user_join: [userId]
      });

      // Update the user's events field
      await axios.patch(`http://172.20.10.7:3500/users`, {
        id: userId,
        events: [eventId]
      });

      // Optionally, fetch updated data
      const updatedEvents = await axios.get('http://172.20.10.7:3500/events');
      setEvents(updatedEvents.data);
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    // return (
    //   <View style={styles.centered}>
    //     <Text>Error: {error.message}</Text>
    //   </View>
    // );
    Alert.alert("Error", error.message);
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      {events.map(event => (
        <View key={event._id} style={styles.eventContainer}>
          <Text>Title: {event.title}</Text>
          <Text>Text: {event.text}</Text>
          <Text>Update: {event.update}</Text>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(event)}>
            <Text style={styles.buttonText}>Button</Text>
          </TouchableOpacity>
          {/* Display other event properties here */}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#0000ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
