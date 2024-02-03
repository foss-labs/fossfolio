import { useState } from 'react';
import { Text, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

import { OpenPage } from '../src/components/OpenPage';
import { QrToggler } from '../src/views/home/QrToggler';

const Index = () => {
    const [isQrCodeShowing, setQrCodeShowing] = useState(false);

    const onGestureEvent = (event) => {
        const translationX = event.nativeEvent.translationX;

        if (translationX > 50) {
            setQrCodeShowing(false);
        } else if (translationX < -50) {
            setQrCodeShowing(true);
        }
    };

    return (
        <PanGestureHandler onGestureEvent={onGestureEvent}>
            <View style={{ flex: 1 }}>
                {!isQrCodeShowing && <OpenPage />}
                {isQrCodeShowing && <Text>Test</Text>}
                <QrToggler />
            </View>
        </PanGestureHandler>
    );
};

export default Index;
