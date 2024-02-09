import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { apiHandler } from '../config/apiHandler';

export function Qrcode() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        try {
            const customRefreshToken = `refresh_token=${data};`;
            const response = await apiHandler.get('/auth/refresh/mobile', {
                headers: {
                    Cookie: customRefreshToken,
                },
            });
            console.log(response);
        } catch (e) {
            console.log('ERROR', e);
        }
        setScanned(true);
    };

    const renderCamera = () => {
        return (
            <View style={styles.cameraContainer}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={styles.camera}
                />
            </View>
        );
    };

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Camera permission not granted</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>Scan to find the ticket info</Text>
            {renderCamera()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: '70%',
        borderColor: 'red',
        borderEndWidth: 1,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 40,
    },
    cameraContainer: {
        width: '80%',
        aspectRatio: 1,
        overflow: 'hidden',
        borderRadius: 10,
        marginBottom: 40,
    },
    camera: {
        flex: 1,
    },
    button: {
        backgroundColor: 'blue',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
