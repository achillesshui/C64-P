import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      displayText: '',
    };
  }

  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <HomeScreen />
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8'
  },
});
