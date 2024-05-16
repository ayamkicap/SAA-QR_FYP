import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for React Native
import { jwtDecode } from 'jwt-decode';
import LoginScreen from '../Screens/LoginScreen';
import "core-js/stable/atob";

const useAuth = () => {
    const [authState, setAuthState] = useState({
        username: '',
        roles: [],
        isDeveloper: false,
        isAdmin: false,
        isOrganizerI: false,
        isOrganizerO: false,
        status: 'Student',
        id: null
    });

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                console.log(token) // Fetch token from AsyncStorage
                if (token) {
                    const decoded = jwtDecode(token);
                    const { username, roles, id } = decoded.UserInfo;

                    const isDeveloper = roles.includes('Developer');
                    const isAdmin = roles.includes('Admin');
                    const isOrganizerI = roles.includes('OrganizerI');
                    const isOrganizerO = roles.includes('OrganizerO');
                    let status = 'Student';

                    if (isDeveloper) status = 'Developer';
                    if (isAdmin) status = 'Admin';
                    if (isOrganizerI) status = 'OrganizerI';
                    if (isOrganizerO) status = 'OrganizerO';

                    setAuthState({
                        username,
                        roles,
                        status,
                        isDeveloper,
                        isAdmin,
                        isOrganizerI,
                        isOrganizerO,
                        id
                    });
                } else {
                    setAuthState({
                        username: '',
                        roles: [],
                        status: 'Student',
                        isDeveloper: false,
                        isAdmin: false,
                        isOrganizerI: false,
                        isOrganizerO: false,
                        id: null
                    });
                }
            } catch (error) {
                console.error('Error retrieving token:', error);
            }
        };

        fetchToken();
    }, []);

    return authState;
};

export default useAuth;
