import React, { Component } from 'react'
import {
    Text, View, StyleSheet,
    TouchableWithoutFeedback, TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeable from 'react-native-swipeable';
import moment from 'moment';
import 'moment/locale/pt-br';

import globalStyles from '../globalStyles'

export default props => {
    let check = null;
    if (props.DoneAt !== null) {
        check = (
            <View style={styles.done}>
                <Icon name='check' size={20}
                    color={globalStyles.colors.secondary}></Icon>
            </View>
        );
    } else {
        check = <View style={styles.pending}></View>
    }

    const descStyle = props.DoneAt !== null ? { textDecorationLine: 'line-through' } : {}

    const leftContent = (
        <View style={styles.exclude}>
            <Icon name='trash' size={20} color='#FFF'></Icon>
            <Text style={styles.excludeText}>Excluir</Text>
        </View>
    );

    const rightContent = [
        <TouchableOpacity
            style={[styles.exclude, { justifyContent: 'flex-start', paddingLeft: 20 }]}
            onPress={() => props.onDelete(props.Id)}>
            <Icon name='trash' size={30} color='#FFF' />
        </TouchableOpacity>,
    ]

    return (
        <Swipeable leftActionActivationDistance={200}
            onLeftActionActivate={() => props.onDelete(props.Id)}
            leftContent={leftContent}
            rightButtons={rightContent}>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.Id)}>
                    <View style={styles.checkContainer}>{check}</View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.description, descStyle]}>{props.Descricao}</Text>
                    <Text style={[styles.date]}>
                        {moment(props.EstimateAt).locale('pt-br').format('ddd, D [de] MMMM')}
                    </Text>
                </View>
            </View>
        </Swipeable>
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
    }, exclude: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'flex-end',

    }, excludeText: {
        fontFamily: globalStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10,
    },
})