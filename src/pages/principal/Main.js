import React, {useContext} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeBaseProvider, Box, Button, Icon, Fab } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthProvider, AuthContext} from '../../routes/AuthContext';
// You can import from local files

export default function Main({ navigation }) {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <Box>
      <Button
        onPress={() => {
          navigation.navigate('Login', { item: '' });
          //alert(item.id);
        }}>
       Go to Login Usuario: {user?.email}
      </Button>
      <Button onPress={() => console.log('hello world')}>Click Me</Button>
    </Box>
  );
}
