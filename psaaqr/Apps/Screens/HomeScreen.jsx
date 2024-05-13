import { View, Text } from 'react-native'
import { ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomeScreen() {
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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      {events.map(event => (
        <View key={event._id} style={{ marginVertical: 10, marginHorizontal: 20, padding: 10, borderWidth: 1, borderColor: '#ccc' }}>
          <Text>Title: {event.title}</Text>
          <Text>Text: {event.text}</Text>
          <Text>Update: {event.update}</Text>
          {/* Display other event properties here */}
        </View>
      ))}
    </ScrollView>
  );
}






