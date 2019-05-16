import { Alert, Platform } from 'react-native';

const server = Platform.OS === 'ios' ? 'http://192.168.15.40:3000/' : 'http://192.168.15.40:3000/';

function showError(mensagem) { 
    Alert.alert('Ops! Ocorreu um problema', `Mensagem: ${mensagem}`)
}

export { server, showError };