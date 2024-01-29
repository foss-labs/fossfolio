import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Slot } from 'expo-router';
import { SafeAreaView } from "react-native"
import { config } from "../gluestack-ui.config"
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
    return (
        <GluestackUIProvider config={config}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaView/>
                <Slot />
            </GestureHandlerRootView>
        </GluestackUIProvider> 
    );
}
