import React, { Component } from 'react';
import {
    View, Modal, Alert,
    Text, TextInput, StyleSheet,
    DatePickerAndroid, DatePickerIOS,
    TouchableWithoutFeedback, TouchableOpacity
} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

import globalStyles from '../globalStyles';

var initialState = { desc: '', date: new Date() };
export default class TaskCreate extends Component {
    state = { ...initialState };

    save = () => {
        if (!this.state.desc || this.state.desc.length == 0) {
            Alert.alert('Dados inválidos', 'Favor preencher a descrição');
            return;
        }

        var data = { ...this.state };
        this.props.onSave(data);
        this.setState({ ...initialState });
    }

    render() {
        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='slide' transparent={true}>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa!</Text>
                    <TextInput placeholder='Preencha a descrição' style={styles.input}
                        onChangeText={desc => this.setState({ desc })}
                        value={this.state.desc}></TextInput>
                    <DatePickerIOS model='date' date={this.state.date}
                        onDateChange={date => this.setState({ date })}></DatePickerIOS>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: globalStyles.colors.default,
    },
    header: {
        fontFamily: globalStyles.fontFamily,
        backgroundColor: globalStyles.colors.default,
        color: globalStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 15,
    },
    input: {
        fontFamily: globalStyles.fontFamily,
        width: '90%',
        height: 40,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6
    },
    date: {
        fontFamily: globalStyles.fontFamily,
        fontSize: 20,
        marginLeft: 10,
        marginTop: 10,
        textAlign: 'center',
    }
})