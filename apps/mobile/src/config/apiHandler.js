import Axios from 'axios';
import { Platform } from 'react-native';

const getBaseUrl = () => {
    if (Platform.OS === 'android') {
        return 'http://192.168.1.4:8080/api'; // Android emulator
    } else {
        return 'http://localhost:8080/api'; // iOS simulator and others
    }
};

const BASE_URL = getBaseUrl();

export const apiHandler = Axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
