import * as React from 'react'
import {SafeAreaView, Text, View} from 'react-native'
import DetailsScreen from './screens/DetailsScreen'
import HomeScreen from './screens/HomeScreen'
import QRScreen from './screens/QRScreens'

export default function MainContainer(){
    return(
        <SafeAreaView style={{flex: 1}}>
            <HomeScreen />
            <DetailsScreen />
            <QRScreen />
        </SafeAreaView>
    )
}