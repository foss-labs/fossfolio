import { View } from 'react-native';

import { OpenPage } from '../src/components/OpenPage';
import { QrToggler } from "../src/views/home/QrToggler"
import { useState } from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';

const index = () => {
    const [isQrCodeShowing, setQrCodeShowing] = useState(false)

    const onGestureEvent = (event) => {
        const translationX = event.nativeEvent.translationX;
        if (translationX > 50) {
            setQrCodeShowing(false);
        }
        else if (translationX < -50) {

            setQrCodeShowing(true);
        }

    };

    return (
        <PanGestureHandler onGestureEvent={onGestureEvent}>
            <View>
                {!isQrCodeShowing && <OpenPage />}
                <QrToggler />
            </View>
        </PanGestureHandler>
    );
};

export default index;
