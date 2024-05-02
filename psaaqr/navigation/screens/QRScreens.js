import { useNavigation } from '@react-navigation/native';
import * as React from 'react'
import { View, Text } from 'react-native'

export default function QRScreen () {

    const navigation = useNavigation();
    return(
        <View style={{ flex :1, alignItems: 'center', justifyContyent: 'center'}}>
            <Text 
                onPress= {() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold'}}> QR Screen
            </Text>

        </View>
    );
}