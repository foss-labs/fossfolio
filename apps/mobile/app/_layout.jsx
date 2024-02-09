import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { config } from '../gluestack-ui.config';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <GluestackUIProvider config={config}>
                <SafeAreaView />
                <Slot />
            </GluestackUIProvider>
        </GestureHandlerRootView>
    );
}
