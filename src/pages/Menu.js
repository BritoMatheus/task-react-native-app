import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native'
import { Gravatar } from 'react-native-gravatar';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

import { DrawerItems } from 'react-navigation'

import globalStyles from '../globalStyles';

export default props => {

    const logout = () => {
        delete axios.defaults.headers.common['Authorization'];
        AsyncStorage.removeItem('userData');
        props.navigation.navigate('Loading');
    }

    return (
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
                <Gravatar style={styles.avatar}
                    options={{
                        email: props.navigation.getParam('email'),
                        secure: true
                    }}
                ></Gravatar>
                <View style={styles.userInfo}>
                    <View>
                        <Text style={styles.name}>
                            {props.navigation.getParam('nome')}
                        </Text>
                        <Text style={styles.email}>
                            {props.navigation.getParam('email')}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={logout}>
                        <View style={styles.logoutIcon}>
                            <Icon name='sign-out' size={30} color='#800'></Icon>
                        </View>
                    </TouchableOpacity>
                </View>
                <DrawerItems {...props} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD',
    },
    title: {
        backgroundColor: '#FFF',
        color: '#000',
        fontFamily: globalStyles.fontFamily,
        fontSize: 30,
        paddingTop: 30,
        padding: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderColor: '#AAA',
        borderRadius: 30,
        margin: 10,
    },
    name: {
        fontFamily: globalStyles.fontFamily,
        color: globalStyles.colors.mainText,
        fontSize: 20,
        marginLeft: 10,
    },
    email: {
        fontFamily: globalStyles.fontFamily,
        color: globalStyles.colors.subText,
        fontSize: 15,
        marginLeft: 10,
        marginBottom: 10,
    },
    menu: {
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logoutIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20
    }
})