// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
// import axios from 'axios';

// export default function UserScreen() {
//   const [users, setUsers] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios.get('http://172.20.10.7:3500/users')
//       .then(response => {
//         setUsers(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Error: {error.message}</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={{ flex: 1 }}>
//       {users.map(user => (
//         <View key={user._id} style={{ marginVertical: 10, marginHorizontal: 20, padding: 10, borderWidth: 1, borderColor: '#ccc' }}>
//           <Text>: {user.username}</Text>
//           {/* <Text>Email: {user.email}</Text>
//           <Text>Year of Study: {user.year_study}</Text>
//           <Text>Card Number: {user.card_number}</Text>
//           <Text>Roles: {user.roles}</Text>
//           <Text>Active: {user.active}</Text> */}
//         </View>
//       ))}
//     </ScrollView>
//   );
// }


import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet,Image } from 'react-native';
import axios from 'axios';
import useAuth from '../auth/useAuth';

export default function UserScreen() {
  const [users, setUsers] = useState(null);
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('http://172.20.10.7:3500/users');
        const eventsResponse = await axios.get('http://172.20.10.7:3500/events');
        setUsers(usersResponse.data);
        setEvents(eventsResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
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
      <View key={loggedInUser._id} style={styles.userContainer}>
        <Text style={styles.title}>User: {loggedInUser.username}</Text>
        {events && events
          .filter(event => event.user_join && event.user_join.includes(loggedInUser._id))
          .map(event => (
            <View key={event._id} style={styles.eventContainer}>
              <Text>Event Title: {event.title}</Text>
              <Text>Event Text: {event.text}</Text>
              <Text>Event Date: {new Date(event.date_event).toLocaleDateString()}</Text>
              <Text>Event Time: {event.time_event}</Text>
              <Text>Event Location: {event.location_event}</Text>
              <Text>Event Price: {event.price_event}</Text>
              <Text>Contact Event: {event.contact_event}</Text>
              {event.img_url_event && (
                  <>
                    <Text>Image URL: </Text>
                    <Image
                      source={{ uri: 'http://localhost:3500/'+event.img_url_event }}
                      style={styles.image}
                      onError={(e) => console.log('Image Load Error:', e.nativeEvent.error)}
                    />
                  </>
                )}
            </View>
        ))}
      </View>
    </ScrollView>
  );
}

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
  userContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  eventContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});


