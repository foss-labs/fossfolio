import { useState } from 'react';
import { Text, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

import { OpenPage } from '../src/components/OpenPage';
import { QrToggler } from '../src/views/home/QrToggler';
import { Qrcode} from "../src/components/QrCode"
import { useToggle } from '../src/hooks';

const Index = () => {
    const [isQrCodeShowing, toggleQr] = useToggle(false)

    const onGestureEvent = (event) => {
        const translationX = event.nativeEvent.translationX;

        if (translationX > 50) {
            toggleQr.off()
        } else if (translationX < -50) {
            toggleQr.on()
        }
    };

    return (
        <PanGestureHandler onGestureEvent={onGestureEvent}>
            <View style={{ flex: 1 }}>
                {!isQrCodeShowing && <OpenPage />}
                {isQrCodeShowing && <Qrcode/>}
                <QrToggler toggleQr={toggleQr}/>
            </View>
        </PanGestureHandler>
    );
};

export default Index;
