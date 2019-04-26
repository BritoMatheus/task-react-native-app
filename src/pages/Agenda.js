import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Platform, FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import Icon from 'react-native-vector-icons/FontAwesome';

import todayImage from '../../assets/imgs/today.jpg';
import globalStyles from '../globalStyles';
import Task from '../components/Task';

export default class Agenda extends Component {
    state = {
        tasks: [
            {
                id: Math.random(), desc: 'Comprar curso de React Native',
                estimateAt: new Date(), doneAt: new Date()
            }, {
                id: Math.random(), desc: 'Concluir o curso',
                estimateAt: new Date(), doneAt: null
            }, {
                id: Math.random(), desc: 'Concluir o curso',
                estimateAt: new Date(), doneAt: null
            }, {
                id: Math.random(), desc: 'Concluir o curso',
                estimateAt: new Date(), doneAt: null
            }, {
                id: Math.random(), desc: 'Concluir o curso',
                estimateAt: new Date(), doneAt: null
            }, {
                id: Math.random(), desc: 'Concluir o curso',
                estimateAt: new Date(), doneAt: null
            }, {
                id: Math.random(), desc: 'Concluir o curso',
                estimateAt: new Date(), doneAt: null
            }, {
                id: Math.random(), desc: 'Concluir o curso',
                estimateAt: new Date(), doneAt: null
            }, {
                id: Math.random(), desc: 'Concluir o curso',
                estimateAt: new Date(), doneAt: null
            },
        ],
        visibleTasks: [],
        showDoneTasks: true
    }

    componentDidMount = () => {
        this.filterTasks();
    }

    toggleTask = id => {
        var tasks = [...this.state.tasks];
        tasks.find((task) => task.id == id).doneAt = tasks.find((task) => task.id == id).doneAt ? null : new Date();
        this.setState({ tasks }, this.filterTasks);
    }

    filterTasks = () => {
        let visibleTasks = null;
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            var pending = task => task.doneAt === null;
            visibleTasks = this.state.tasks.filter(pending); 
        }
        this.setState({ visibleTasks });
    }

    toggleVisible = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks);
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleVisible}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={20} color={globalStyles.colors.secondary}></Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>
                            {moment().locale('pt-br').format('ddd, D [de] MMMM')}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.tasksContainer}>
                    <FlatList data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} />}></FlatList>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 3,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: globalStyles.fontFamily,
        color: globalStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: globalStyles.fontFamily,
        color: globalStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    tasksContainer: {
        flex: 7,
    },
    iconBar: {
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }

})
