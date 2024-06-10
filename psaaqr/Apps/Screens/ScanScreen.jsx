import { Text, View, StyleSheet, Button, Modal, TextInput,Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Camera, CameraView } from 'expo-camera';
import useAuth from '../auth/useAuth';
import axios from 'axios';
import {API_URL} from '../../config/APIconfig'
//import CryptoJS from 'crypto-js';

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');
  const [modalVisible, setModalVisible] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const { id } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  useEffect(() => {
    askForCameraPermission();
  }, []);

  // useEffect(() => {
  //   axios.get(`${API_URL}/events`)
  //     .then(response => {
  //       setEvent(response.data);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       setError(error);
  //       setLoading(false);
  //     });
  // }, []);


  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setText(data);
    Alert.alert('Attendance marked!');
    console.log('Type: ' + type + '\nData: ' + data);

    try {

    //   const response = await axios.post(`${API_URL}/events/decrypt`, {
    //     encrypted_data: data,
    // });
      const userId = id; // Replace with the actual user ID
      //const event = event.find(e => e.QR_code === data); // Get the event data
      const eventId = data; // Replace with the actual event ID from the event object

      // Log key and iv to check their values
      // console.log('QR_code:', event.QR_code);
    //   console.log('key:', event.key);

    //   if (!event || !event.key) {
    //     throw new Error('QR code, key, and iv are required');
    //   }

      
    // const decryptedData = response.data.decrypted;
    // const eventId = decryptedData;

      console.log("event id" +eventId)
      console.log("user id" +userId)


      // await axios.post(`${API_URL}/mycsd/join-event`, {
      //   userId: userId,
      //   eventId: eventId,
      // })

      await axios.patch(`${API_URL}/events`, {
        id: eventId,
        attendance: [userId]
      });

      // await axios.patch(`${API_URL}/users`, {
      //   id: userId,
      //   events: [eventId]
      // });

      // const response = await axios.post(`${API_URL}/mycsd/join-event`, payload);
      // console.log('Response:', response.data);

      setModalVisible(true);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to mark attendance. Please try again.');
    }
  };

//   const handleBarCodeScanned = async ({ type, data }) => {
//     setScanned(true);
//     setText(data);
//     Alert.alert('Attendance marked!');
//     console.log('Type: ' + type + '\nData: ' + data);

//     try {
//         const response = await axios.post(`${API_URL}/events/decrypt`, {
//             encrypted_data: data,
//         });

//         const { decrypted, key, iv } = response.data;

//         // Now you have access to decrypted data, key, and iv
//         console.log('Decrypted Data:', decrypted);
//         console.log('Key:', key);
//         console.log('IV:', iv);

//         // Proceed with your logic using decrypted data, key, and iv
//     } catch (err) {
//         console.error(err);
//         Alert.alert('Error', 'Failed to mark attendance. Please try again.');
//     }
// };


  const handleFeedbackSubmit = async () => {
    try {
      const userId = id;
      const eventId = text; // Use the scanned event ID

      await axios.post(`${API_URL}/feedback/feedback`, {
        eventId: eventId,
        userId: userId,
        text: feedbackText
      });

      setModalVisible(false);
      setFeedbackText('');
    } catch (err) {
      console.error(err);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
     <View style={styles.barcodebox}>
        <CameraView
        barcodeScannerSettings={{
    barcodeTypes: ["qr"],
  }}
          facing={'back '}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      {/* <Text style={styles.maintext}>{text}</Text> */}
      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Give your feedback</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your feedback here"
            value={feedbackText}
            onChangeText={setFeedbackText}
          />
          <Button title="Submit" onPress={handleFeedbackSubmit} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
});
