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
import { View, Text, ActivityIndicator, ScrollView, StyleSheet, Image, RefreshControl } from 'react-native';
import axios from 'axios';
import useAuth from '../auth/useAuth';
import { API_URL } from '../../config/APIconfig';

export default function UserScreen() {
  const [users, setUsers] = useState(null);
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({}); // Track expanded state for each event
  const { id } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(`${API_URL}/users`);
        const eventsResponse = await axios.get(`${API_URL}/events`);
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

  const toggleExpanded = (eventId) => {
    setExpanded(prev => ({ ...prev, [eventId]: !prev[eventId] }));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const usersResponse = await axios.get(`${API_URL}/users`);
      const eventsResponse = await axios.get(`${API_URL}/events`);
      setUsers(usersResponse.data);
      setEvents(eventsResponse.data);
    } catch (error) {
      setError(error);
    } finally {
      setRefreshing(false);
    }
  };

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
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View key={loggedInUser._id} style={styles.userContainer}>
        <Text style={styles.title}>User: {loggedInUser.username}</Text>
        {events && events
          .filter(event => event.attendance && event.attendance.includes(loggedInUser._id))
          .map(event => (
            <View key={event._id} style={styles.eventContainer}>
              <Text style={styles.titleText}>Title: {event.title}</Text>
              <Text>
                Text: {expanded[event._id] ? event.text : `${event.text.substring(0, 100)}...`}
                {event.text.length > 100 && (
                  <Text style={styles.seeMore} onPress={() => toggleExpanded(event._id)}>
                    {expanded[event._id] ? ' See Less' : ' See More'}
                  </Text>
                )}
              </Text>
              <Text>Event Date: {new Date(event.date_event).toLocaleDateString()}</Text>
              <Text>Event Time: {event.time_event}</Text>
              <Text>Event Location: {event.location_event}</Text>
              <Text>Event Price: {event.price_event}</Text>
              <Text>Contact Event: {event.contact_event}</Text>
              {/* {event.img_url_event && (
                <>
                  <Text>Image URL: </Text>
                  <Image
                    source={{ uri: 'http://localhost:3500/'+event.img_url_event }}
                    style={styles.image}
                    onError={(e) => console.log('Image Load Error:', e.nativeEvent.error)}
                  />
                </>
              )} */}
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
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  seeMore: {
    color: '#0000ff',
    fontWeight: 'bold',
  },
});
