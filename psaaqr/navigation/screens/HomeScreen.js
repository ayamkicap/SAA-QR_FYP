// import * as React from 'react'
// import { View, Text } from 'react-native'

// export default function HomeScreen ({navigation}) {
//     return(
//         <View style={{ flex :1, alignItems: 'center', justifyContyent: 'center'}}>
//             <Text 
//                 onPress= {() => alert('This is the "HOME" screen.')}
//                 style={{ fontSize: 26, fontWeight: 'bold'}}> Home Screen
//             </Text>

//         </View>
//     );
// }

import { View, Text } from 'react-native'
import React from 'react'

const HomeScreen = () => {
  return (
    <View style={{ flex :1, alignItems: 'center', justifyContyent: 'center'}}>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen