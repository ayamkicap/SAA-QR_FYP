// import { Text, View, StyleSheet, Button, Modal, TextInput } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { Camera, CameraView } from 'expo-camera';
// import useAuth from '../auth/useAuth';
// import axios from 'axios';

// export default function ScanScreen() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const [text, setText] = useState('Not yet scanned');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [feedbackText, setFeedbackText] = useState('');
//   const { id } = useAuth();

//   const askForCameraPermission = () => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })()
//   }

//   useEffect(() => {
//     askForCameraPermission();
//   }, []);

//   const handleBarCodeScanned = async ({ type, data }) => {
//     setScanned(true);
//     setText(data);
//     Alert.alert('Attendance marked!');
//     console.log('Type: ' + type + '\nData: ' + data);

//     try {
//       const userId = id; // Replace with the actual user ID
//       const eventId = data; // Replace with the actual event ID from the event object

//       await axios.patch(`http://172.20.10.7:3500/events`, {
//         id: eventId,
//         attendance: [userId]
//       });

//       await axios.patch(`http://172.20.10.7:3500/users`, {
//         id: userId,
//         events: [eventId]
//       });

//       await axios.post(`http://localhost:3500/mycsd/join-event`, {
//         userId: userId,
//         eventId: eventId,
//       });

//       setModalVisible(true);
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Error', 'Failed to mark attendance. Please try again.');
//     }
//   };

//   const handleFeedbackSubmit = async () => {
//     try {
//       const userId = id;
//       const eventId = text; // Use the scanned event ID

//       await axios.post('http://172.20.10.7:3500/feedback/feedback', {
//         eventId: eventId,
//         userId: userId,
//         text: feedbackText
//       });

//       setModalVisible(false);
//       setFeedbackText('');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (hasPermission === null) {
//     return (
//       <View style={styles.container}>
//         <Text>Requesting for camera permission</Text>
//       </View>
//     );
//   }

//   if (hasPermission === false) {
//     return (
//       <View style={styles.container}>
//         <Text style={{ margin: 10 }}>No access to camera</Text>
//         <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//      <View style={styles.barcodebox}>
//         <CameraView
//         barcodeScannerSettings={{
//     barcodeTypes: ["qr"],
//   }}
//           facing={'back '}
//           onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
//           style={{ height: 400, width: 400 }} />
//       </View>
//       {/* <Text style={styles.maintext}>{text}</Text> */}
//       {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.modalView}>
//           <Text style={styles.modalText}>Give your feedback</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Type your feedback here"
//             value={feedbackText}
//             onChangeText={setFeedbackText}
//           />
//           <Button title="Submit" onPress={handleFeedbackSubmit} />
//           <Button title="Cancel" onPress={() => setModalVisible(false)} />
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   barcodebox: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 300,
//     width: 300,
//     overflow: 'hidden',
//     borderRadius: 30,
//     backgroundColor: 'tomato',
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//     fontSize: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     width: '100%',
//     paddingHorizontal: 10,
//   },
// });


import { Text, View, StyleSheet, Button, Modal, TextInput,Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Camera, CameraView } from 'expo-camera';
import useAuth from '../auth/useAuth';
import axios from 'axios';
import CryptoJS from 'crypto-js';

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');
  const [modalVisible, setModalVisible] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const { id } = useAuth();

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  useEffect(() => {
    askForCameraPermission();
  }, []);


  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setText(data);
    Alert.alert('Attendance marked!');
    console.log('Type: ' + type + '\nData: ' + data);

    try {
      const userId = id; // Replace with the actual user ID
      // const eventId = data; // Replace with the actual event ID from the event object

    const secretKey = '07a4bcf7861cb4052b834bc0b6756cd12d40dc9164dfe0595fed854cd95cfcecf9dcda82b9147aa424542f5e29f005af902007283c50b136e617b22c2fbade72'; // Use the same key as for encryption
      const bytes = CryptoJS.AES.decrypt(data, secretKey);
      const eventId = bytes.toString(CryptoJS.enc.Utf8);

    console.log("event id", eventId)

      const payload = {
        userId: userId,
        eventId: eventId,
      };

      console.log('Payload:', payload);

      await axios.post(`http://172.20.10.7:3500/mycsd/join-event`, {
        userId: userId,
        eventId: eventId,
      })

      await axios.patch(`http://172.20.10.7:3500/events`, {
        id: eventId,
        user_join: [userId]
      });

      await axios.patch(`http://172.20.10.7:3500/users`, {
        id: userId,
        events: [eventId]
      });

      // const response = await axios.post('http://172.20.10.7:3500/mycsd/join-event', payload);
      // console.log('Response:', response.data);

      setModalVisible(true);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to mark attendance. Please try again.');
    }
  };

  const handleFeedbackSubmit = async () => {
    try {
      const userId = id;
      const eventId = text; // Use the scanned event ID

      await axios.post('http://172.20.10.7:3500/feedback/feedback', {
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
