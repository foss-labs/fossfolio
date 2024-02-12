import { Box } from '@gluestack-ui/themed';
import { View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

import { MoreInfo } from '../src/components/Modal';
import { OpenPage } from '../src/components/OpenPage';
import { Qrcode } from '../src/components/QrCode';
import { useToggle } from '../src/hooks';

const Index = () => {
    const [isQrCodeShowing, toggleQr] = useToggle(false);

    const onGestureEvent = (event) => {
        const translationX = event.nativeEvent.translationX;

        if (translationX > 50) {
            toggleQr.off();
        } else if (translationX < -50) {
            toggleQr.on();
        }
    };

    return (
        <>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <View style={{ flex: 1 }}>
                    {!isQrCodeShowing && <OpenPage />}
                    {isQrCodeShowing && <Qrcode />}
                </View>
            </PanGestureHandler>
            <MoreInfo />
        </>
    );
};

export default Index;
