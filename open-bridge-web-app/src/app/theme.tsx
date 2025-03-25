import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import colors from './theme/colors';
import shadows from './theme/shadows';

const themeConfig = defineConfig({
    theme: {
        tokens: {
            fonts: {
                body: { value: 'Ubuntu, sans-serif' },
                heading: { value: 'Ubuntu, sans-serif' },
            },
            colors: colors,
            fontSizes: {
                lyricsText: {
                    1: { value: '12px' },
                    2: { value: '16px' },
                    3: { value: '20px' },
                    4: { value: '24px' },
                    5: { value: '32px' },
                    6: { value: '48px' },
                    7: { value: '64px' },
                    8: { value: '96px' },
                    9: { value: '128px' },
                }
            },
            shadows
        }
    },
    globalCss: {
        body: {
            margin: 0,
            fontFamily: 'Ubuntu, sans-serif',
        },
        '#root': {
            margin: 0,
            padding: 0
        },
        "*:focus-visible, *:focus": {
            boxShadow: "none",
            outline: "none",
        },
    }
});

export default createSystem(defaultConfig, themeConfig);