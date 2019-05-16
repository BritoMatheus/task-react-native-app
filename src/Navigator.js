import React from 'react';
import { createSwitchNavigator} from 'react-navigation';
import Auth from './pages/Auth';
import Agenda from './pages/Agenda';


const MainRoutes = {
    Auth: {
        name: 'Auth',
        screen: Auth
    }, Home: {
        name: 'Home',
        screen: Agenda
    }
}

const MainNavigator = 
createSwitchNavigator(MainRoutes, {
    initialRouteName: 'Auth'
});
export default MainNavigator