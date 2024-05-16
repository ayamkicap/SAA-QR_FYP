import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import useAuth from '../auth/useAuth'; // Import the useAuth hook

const TabNavigationTop = () => {
    const navigation = useNavigation();
    const { username } = useAuth(); // Access authentication state using useAuth hook
    console.log(useAuth())

    const handleLogout = async () => {
        try {
            // Perform logout API call
            const response = await axios.post('http://172.20.10.7:3500/auth/logout');
            console.log('Logout successful:', response.data);
            // Navigate to LoginScreen
            navigation.navigate('LoginScreen');
        } catch (error) {
            console.error('Error during logout:', error);
            // Handle logout error
        }
    };
    
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
            <Text style={{ fontSize: 18 }}>{username}</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text style={{ fontSize: 18 }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

export default TabNavigationTop;
