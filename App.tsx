/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';

function App(): React.JSX.Element {
  useEffect(() => {
    // (async () => {
    //   await fetch('http://localhost:3000/users')
    //     .then(res => {
    //       res.json().then(res2 => console.log(res2));
    //     })
    //     .catch(e => console.log('err', e));
    // })();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>Aayush</Text>
      </View>
    </SafeAreaView>
  );
}

export default App;
