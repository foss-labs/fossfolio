import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
    return (
        <GluestackUIProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Slot />
            </GestureHandlerRootView>
        </GluestackUIProvider>
    );
}
