import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    axios.post('http://172.20.10.7:3500/auth', { username, password })
      .then(response => {
        console.log('Login successful:', response.data);
        if (response.data && response.data.accessToken) {
          const accessToken = response.data.accessToken;
          // Call the prop function passed from App component
          onLoginSuccess(accessToken);
        } else {
          console.log('Invalid response from server:', response.data);
          setError('Invalid response from server');
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
        setError(error.response?.data?.message || 'An error occurred during login');
      });
  };
  
  
  
  


  return (
    <View style={{ marginTop: 20 }}>
      <Image source={require('./../../assets/images/USM_Logo.png')} style={{ width: '100%', height: 400 }} />
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 35, fontWeight: 'bold' }}>SAA-QR</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Kami Memimpin</Text>
        {/* <TouchableOpacity onPress={()=>console.log("SignIn")} style={{ padding: 12, backgroundColor: 'purple', borderRadius: 20, marginTop: 20 }}>
          <Text style={{ fontSize: 18, color: 'white' }}>Get Started</Text>
        </TouchableOpacity> */}

        <View style={{}}>
        <Text style={{ color: 'black', fontSize: 20 }}>Login</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5, width: '80%' }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5, width: '80%' }}
        />
        <Button title="Login" onPress={handleLogin} />
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
      </View>

      </View>
    </View>
  );
}
