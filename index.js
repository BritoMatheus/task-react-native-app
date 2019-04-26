/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Agenda from './src/pages/Agenda';

AppRegistry.registerComponent(appName, () => Agenda);
