import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const TabNavigationTop = ({ onLogout }) => {
    const navigation = useNavigation(); 
    
    const handleLogout = async () => {
        try {
            // Perform logout API call
            const response = await axios.post('http://172.20.10.7:3500/auth/logout');
            console.log('Logout successful:', response.data);
            // Call the onLogout function passed as a prop
            await onLogout();
            // Navigate to LoginScreen
            navigation.navigate('LoginScreen');
        } catch (error) {
            console.error('Error during logout:', error);
            // Handle logout error
        }
    };
    
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
            <TouchableOpacity onPress={handleLogout}>
                <Text style={{ fontSize: 18 }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

export default TabNavigationTop;
