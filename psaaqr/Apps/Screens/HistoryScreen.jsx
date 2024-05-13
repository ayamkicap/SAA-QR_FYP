import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

export default function UserScreen() {
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      {users.map(user => (
        <View key={user._id} style={{ marginVertical: 10, marginHorizontal: 20, padding: 10, borderWidth: 1, borderColor: '#ccc' }}>
          <Text>Username: {user.username}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Year of Study: {user.year_study}</Text>
          <Text>Card Number: {user.card_number}</Text>
          <Text>Roles: {user.roles}</Text>
          <Text>Active: {user.active}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
