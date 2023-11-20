/*import "react-native-gesture-handler*/
import * as React from "react";
import Navigation from "./navigation/Navigation";
import { LogBox } from 'react-native';

export default function App() {
    LogBox.ignoreAllLogs();

    return (
            < Navigation />
    );

}