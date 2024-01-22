/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {styles} from './style';

const ChildComponent = React.forwardRef((props, ref) => {
  const [count, setCount] = React.useState(0);

  React.useImperativeHandle(ref, () => ({
    increase() {
      setCount(v => v + 1);
    },
    reset() {
      setCount(0);
    },
  }));

  return (
    <View style={styles.childView}>
      <Text>{count}</Text>
    </View>
  );
});

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const childComponentRef = React.useRef();

  const onPressIncrease = React.useCallback(() => {
    childComponentRef.current?.increase();
  }, []);
  const onPressReset = React.useCallback(() => {
    childComponentRef.current?.reset();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.parentView}>
        <ChildComponent ref={childComponentRef} />
        <Button title="Increase" onPress={onPressIncrease} />
        <Button title="Reset" onPress={onPressReset} />
      </View>
    </SafeAreaView>
  );
}

export default App;
