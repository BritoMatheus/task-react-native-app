import React, { Component } from 'react';
import {
    View, Modal, Alert, Platform,
    Text, TextInput, StyleSheet,
    DatePickerAndroid, DatePickerIOS,
    TouchableWithoutFeedback, TouchableOpacity
} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

import globalStyles from '../globalStyles';

export default class TaskCreate extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialstate();
    }

    getInitialstate = () => {
        return {
            desc: '',
            date: new Date()
        }
    }

    handleDateAndroidChanged = () => {
        DatePickerAndroid.open({
            date: this.state.date
        }).then(e => {
            if (e.action !== DatePickerAndroid.dismissedAction) {
                var momentDate = moment(this.state.date);
                momentDate.date(e.day);
                momentDate.month(e.year);
                momentDate.year(e.year);
                this.setState({ date: momentDate.toDate() });
            }
        });
    };

    save = () => {
        if (!this.state.desc || this.state.desc.length == 0) {
            Alert.alert('Dados inválidos', 'Favor preencher a descrição');
            return;
        }
        var data = { ...this.state };
        this.props.onSave(data);
    }

    render() {
        let datePicker = null;
        if (Platform.OS === 'ios') {
            datePicker = <DatePickerIOS model='date' date={this.state.date}
                onDateChange={date => this.setState({ date })}></DatePickerIOS>;
        } else {
            datePicker = (
                <TouchableOpacity onPress={this.handleDateAndroidChanged}>
                    <Text style={styles.date}>
                        {moment(this.state.date).locale('pt-br').format('ddd, D [de] MMMM')}
                    </Text>
                </TouchableOpacity>
            );
        }
        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='slide' transparent={true}
                onShow={() => this.state = this.getInitialstate()}>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa!</Text>
                    <TextInput placeholder='Preencha a descrição' style={styles.input}
                        onChangeText={desc => this.setState({ desc })}
                        value={this.state.desc}></TextInput>
                    {datePicker}
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