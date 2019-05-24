import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Platform, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';

import moment from 'moment';
import 'moment/locale/pt-br';
import axios from 'axios';

import { server, showError } from '../commom';
import globalStyles from '../globalStyles';
import Task from '../components/Task';
import TaskCreate from './TaskCreate';

import todayImage from '../../assets/imgs/today.jpg';
import tomorrowImage from '../../assets/imgs/tomorrow.jpg';
import weekImage from '../../assets/imgs/week.jpg';
import monthImage from '../../assets/imgs/month.jpg';

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
        this.loadTasks();
    }

    toggleTask = async id => {
        try {
            await axios.put(`${server}task/${id}/toggle`);
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
            var estimateAt = new Date(task.date).toLocaleString();
            var result = await axios.post(`${server}task`, {
                descricao: task.desc,
                estimateAt: estimateAt
            });
            this.setState({ showCreateTask: false }, this.loadTasks);
        } catch (error) {
            Alert.alert('Ocorreu um erro :(', `Mensagem: ${error}`)
            //showError(error);
        }
    }

    onCancel = () => {
        this.setState({ showCreateTask: false }, this.loadTasks);
    }

    deleteTask = async id => {
        try {
            await axios.delete(`${server}task/${id}`);
            this.loadTasks();
        } catch (error) {
            showError(error);
        }
    }

    loadTasks = async () => { 
        try {
            const maxDate = moment().add({ days: this.props.daysAhead }).format(`YYYY-MM-DD 00:00`);
            const res = await axios.get(`${server}task?date=${maxDate}`);
            this.setState({ tasks: res.data }, this.filterTasks);
        } catch (error) {
            Alert.alert('Erro :(', `Mensagem: ${error}`)
            //showError(error);
        }
    }

    render() {
        let styleColor = null;
        let image = null;

        switch (this.props.daysAhead) {
            case 0:
                styleColor = globalStyles.colors.today;
                image = todayImage;
                break;
            case 1:
                styleColor = globalStyles.colors.tomorrow;
                image = tomorrowImage;
                break;
            case 7:
                styleColor = globalStyles.colors.week;
                image = weekImage;
                break;
            default:
            case 0:
                styleColor = globalStyles.colors.month;
                image = monthImage;
                break;
        }


        return (
            <View style={styles.container}>
                <TaskCreate isVisible={this.state.showCreateTask}
                    onSave={this.addTask}
                    onCancel={this.onCancel}></TaskCreate>
                <ImageBackground source={image} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='bars' size={20} color={globalStyles.colors.secondary}></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleVisible}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={20} color={globalStyles.colors.secondary}></Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.subtitle}>
                            {moment().locale('pt-br').format('ddd, D [de] MMMM')}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.tasksContainer}>
                    <FlatList data={this.state.visibleTasks}
                        keyExtractor={item => `${item.Id}`}
                        renderItem={({ item }) => <Task {...item} onToggleTask={this.toggleTask} onDelete={this.deleteTask} />}></FlatList>
                </View>
                <ActionButton buttonColor={styleColor}
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
        justifyContent: 'space-between',
    }

})
