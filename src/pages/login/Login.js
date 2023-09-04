import React, {useContext, useState} from 'react';
//import API from '../../../config/API';
import {
    NativeBaseProvider,
    FormControl,
    Input,
    Stack,
    WarningOutlineIcon,
    Box,
    Center,
    Button,
    Image,
    View,
    Text,
    Icon, useToast,
} from 'native-base';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import AlertMsg from '../../components/AlertMsg';
import {AuthContext} from '../../routes/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function Login({ route,navigation}) {
    const {signIn} = useContext(AuthContext);
    const [user, setUser] = useState({
        email: 'admin@admin.com',
        password: 'admin@123',
    });

    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const Logar = async () => {
        setLoading(true);
        console.log(user);
        try {
         
            if (user.email) {
                console.log('logar');
                console.log(user);
               // setUserToken('token');
                signIn(user);
                await AsyncStorage.setItem('@usuario', JSON.stringify(user)); //armazenando em "usuario" o valor de response.data
                navigation.navigate('Main');
            }
        } catch (error) {
            console.error(error);
            let msg = (error);
            toast.show({
                render: () => {
                    return <AlertMsg status="error" msg={msg}/>;
                },
            });
        }
    }

    return (
        <NativeBaseProvider>
            <Center flex={1} px="3" backgroundColor="#CBEDD1">
                <Box alignItems="center">
                    <View maxWidth="130px">
                        <Image
                            maxHeight="130px"
                            source={require('../../assets/imagemLogin.jpg')}
                        />
                    </View>

                    <Box w="100%" maxWidth="300px">
                        <FormControl isRequired>
                            <Stack mx="4">
                                <Box>
                                    <FormControl isInvalid>
                                        <Input
                                            type="user"
                                            placeholder="Usuário"
                                            marginTop="10px"
                                            backgroundColor="white"
                                            name="email"
                                            value={user.email}
                                            onChangeText={(value) =>
                                                setUser({...user, email: value})
                                            }
                                        />
                                    </FormControl>
                                </Box>

                                <Box>
                                    <FormControl isInvalid>
                                        <Input
                                            marginTop="10px"
                                            backgroundColor="white"
                                            type="password"
                                            name="password"
                                            value={user.password}
                                            secureTextEntry={true}
                                            onChangeText={(value) =>
                                                setUser({...user, password: value})
                                            }
                                            placeholder="******"
                                        />
                                    </FormControl>
                                </Box>

                                {/*<FormControl.HelperText> No mínimo 6 caracteres. </FormControl.HelperText>*/}
                                <FormControl.HelperText>
                                    {' '}
                                    Problemas com login?{' '}
                                </FormControl.HelperText>

                                <Box alignItems="center">
                                    <Button
                                        marginTop="10px"
                                        backgroundColor="white"
                                        onPress={Logar}>
                                        <Text colorScheme="dark">Login</Text>
                                    </Button>

                                    <Button
                                        marginTop="10px"
                                        backgroundColor="white"
                                        onPress={() =>
                                            navigation.navigate('TelaCadastroUsuario', {item: ''})
                                        }>
                                        <Text colorScheme="dark">Cadastre-se</Text>
                                    </Button>
                                </Box>

                                <FormControl.ErrorMessage
                                    leftIcon={<WarningOutlineIcon size="xs"/>}>
                                    Atleast 6 characters are required.
                                </FormControl.ErrorMessage>
                            </Stack>
                        </FormControl>
                    </Box>
                </Box>
            </Center>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    inputFormato: {
        marginTop: '10px',
        backgroundColor: 'white',
        borderRadius: 'full',
    },
});
