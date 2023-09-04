import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

// You can import from local files
import Login from '../pages/login/Login';
import TelaCadastroUsuario from '../pages/login/TelaCadastroUsuario';
import Main from '../pages/principal/Main';

const AcessoStack = createNativeStackNavigator();

function AcessoStackScreen() {
  return (
    <AcessoStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <AcessoStack.Screen
        name="Login"
        component={Login}
        options={{ title: 'Tela login' }}
      />
      <AcessoStack.Screen
        name="TelaCadastroUsuario"
        component={TelaCadastroUsuario}
        options={{ title: 'Tela Cadastro Usuario' }}
      />
      <AcessoStack.Screen
        name="Main"
        component={Main}
        options={{ title: 'Tela Principal' }}
      />
    </AcessoStack.Navigator>
  );
}

const UsuarioStack = createNativeStackNavigator();

function UsuarioStackScreen() {
  return (
    <UsuarioStack.Navigator>
      <UsuarioStack.Screen
        name="Main"
        component={Main}
        options={{ title: 'Tela Principal' }}
      />
    </UsuarioStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const AuthTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="usuario"
        component={UsuarioStackScreen}
        options={{
          tabBarLabel: 'Usuário',
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="inicio"
        component={AcessoStackScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

import { AuthProvider, AuthContext } from './AuthContext';

const RootStack = createNativeStackNavigator();

export default function Router() {
  const { user } = useContext(AuthContext);
  console.error(user);
  return (
    <AuthProvider>
      <NavigationContainer>
        {user ? (
          <RootStack.Navigator
            screenOptions={
              {
                // headerShown: false
              }
            }
            initialRouteName={'LoggedIn'}>
            <RootStack.Screen name="LoggedIn" component={AuthTabNavigator} />
          </RootStack.Navigator>
        ) : (
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={'LoggedOut'}>
            <RootStack.Screen name="LoggedOut" component={AcessoStackScreen} />
          </RootStack.Navigator>
        )}
      </NavigationContainer>
    </AuthProvider>
  );
}
