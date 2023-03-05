import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import '@fontsource/inter';

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

export const theme = extendTheme({
    config,
    fonts: {
        heading: `inter', sans-serif`,
        Text: `'inter', sans-serif`,
        body: `'inter', sans-serif`,
    },
});
