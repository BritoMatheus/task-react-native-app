import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/pt-br';

import globalStyles from '../globalStyles'

export default props => {
    let check = null;
    if (props.doneAt !== null) {
        check = (
            <View style={styles.done}>
                <Icon name='check' size={20}
                    color={globalStyles.colors.secondary}></Icon>
            </View>
        );
    } else { 
        check = <View style={styles.pending}></View>
    }

    const descStyle = props.doneAt !== null ? { textDecorationLine: 'line-through' } : {}

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
                <View style={styles.checkContainer}>{check}</View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[styles.description, descStyle]}>{props.desc}</Text>
                <Text style={[styles.date]}>
                    {moment(props.estimateAt).locale('pt-br').format('ddd, D [de] MMMM')}
                </Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#AAA',
    }, checkContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%',
    }, pending: {
        borderWidth: 1,
        height: 25,
        width: 25,
        borderRadius: 15,
        borderColor: '#555',
    }, done: {
        height: 25,
        width: 25,
        borderRadius: 15,
        backgroundColor: '#4D7031',
        alignContent: 'center',
        justifyContent: 'center',
    }, description: {
        fontFamily: globalStyles.fontFamily,
        color: globalStyles.colors.mainText,
        fontSize: 15,
    }, date: {
        fontFamily: globalStyles.fontFamily,
        color: globalStyles.colors.subText,
        fontSize: 12
    }
})