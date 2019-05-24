import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Alert,
    AsyncStorage
} from 'react-native';

import axios from 'axios';

import { server, showError } from '../commom';
import globalStyles from '../globalStyles';
import backgroundImage from '../../assets/imgs/login.jpg';
import AuthInput from '../components/AuthInput';

export default class Auth extends Component {
    state = {
        register: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    signinOrSignup = () => {
        if (this.state.register) {
            this.signup();
        } else {
            this.signin();
        }
    }

    signup = async () => {
        try {
            await axios.post(`${server}signup`, {
                nome: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })
            Alert.alert('Sucesso', 'Usuário cadastrado');
            this.setState({ register: false });
        } catch (error) {
            showError(`atencao ${error}`);
        }
    }

    signin = async () => {
        try {
            const res = await axios.post(`${server}signin`, {
                email: this.state.email,
                password: this.state.password,
            });
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`;
            await AsyncStorage.setItem('userData', JSON.stringify(res.data));
            this.props.navigation.navigate('Home', res.data);
        } catch (err) {
            Alert.alert('Atenção', 'Falha no login');
            showError(err);
        }
    }

    render() {
        const validations = [];

        validations.push(this.state.email && this.state.email.includes(`@`));
        validations.push(this.state.password && this.state.password.length >= 6);

        if (this.state.register) {
            validations.push(this.state.name && this.state.name.trim());
            validations.push(this.state.confirmPassword && this.state.confirmPassword == this.state.password);
        }

        const validForm = validations.reduce((all, v) => all && v);


        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.register ? 'Criar conta' : 'Logar'}
                    </Text>
                    {this.state.register &&
                        <AuthInput icon='user' style={styles.input}
                            placeholder='Nome'
                            value={this.state.name}
                            onChangeText={name => this.setState({ name })}></AuthInput>}

                    <AuthInput icon='at' style={styles.input}
                        placeholder='E-mail'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}></AuthInput>

                    <AuthInput icon='lock' secureTextEntry={true} style={styles.input}
                        placeholder='Senha'
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}></AuthInput>

                    {this.state.register &&
                        <AuthInput icon='asterisk' secureTextEntry={true} style={styles.input}
                            placeholder='Confirme a senha'
                            value={this.state.confirmPassword}
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}></AuthInput>}

                    <TouchableOpacity disabled={!validForm}
                        onPress={this.signinOrSignup} 
                        style={[styles.button, !validForm ? { backgroundColor: '#AAA' } : {}]}>
                        <Text style={styles.buttonText}> {this.state.register ? 'Registrar' : 'Entrar'}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => this.setState({ register: !this.state.register })}
                    style={{ padding: 10 }}>
                    <Text style={styles.buttonText}>{this.state.register ? 'Já possui conta?' : 'Ainda não possui conta'}</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}



const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: globalStyles.fontFamily,
        color: '#FFF',
        fontSize: 70,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: globalStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        width: '90%',
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: globalStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    }
})