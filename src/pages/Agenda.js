import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Platform, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';

import moment from 'moment';
import 'moment/locale/pt-br';
import axios from 'axios';

import { server, showError } from '../commom';
import todayImage from '../../assets/imgs/today.jpg';
import globalStyles from '../globalStyles';
import Task from '../components/Task';
import TaskCreate from './TaskCreate';

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
        showDoneTasks: true,
        showCreateTask: false
    }

    componentDidMount = async () => {

        const tasks = JSON.parse(data) || [];
        this.setState({ tasks }, this.filterTasks);
    }

    toggleTask = async id => {
        try {
            await axios.put(`${server}/task/${id}/toggle`);
            await this.loadTasks();
        } catch (error) {
            showError(error);
        }
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

    addTask = async task => {
        try {
            await axios.post(`${server}task`, {
                descricao: task.desc,
                estimateAt: task.date
            });
            this.setState({ showCreateTask: false }, this.loadTasks);
        } catch (error) {
            showError(error);
        }
    }

    deleteTask = async id => {
        try {
            await axios.delete(`${server}/task/${id}`);
            this.loadTasks();
        } catch (error) {
            showError(error);
        }
    }

    loadTasks = async () => { 
        try {
            const maxDate = moment().format(`YYYY-MM-DD 23:59`);
            const res = await axios.get(`${server}/tasks?date=${maxDate}`);
            this.setState({ tasks: res.data }, this.filterTasks);
        } catch (error) {
            showError(error);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TaskCreate isVisible={this.state.showCreateTask}
                    onSave={this.addTask}
                    onCancel={() => this.setState({ showCreateTask: false })}></TaskCreate>
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
                        renderItem={({ item }) => <Task {...item} onToggleTask={this.toggleTask} onDelete={this.deleteTask} />}></FlatList>
                </View>
                <ActionButton buttonColor={globalStyles.colors.today}
                    onPress={() => this.setState({ showCreateTask: true })}></ActionButton>
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
