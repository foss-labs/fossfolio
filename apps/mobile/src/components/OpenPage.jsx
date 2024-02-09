/* eslint-disable no-unused-expressions */
import { Card, VStack, Box, Button, ButtonText } from '@gluestack-ui/themed';
import { View, Image, StyleSheet, Text } from 'react-native';

import { useEvents } from '../hooks/useEvents';

export const OpenPage = () => {
    const { eventData, isLoading } = useEvents();
    if (isLoading) {
        return (
            <View style={styles.container}>
                <Image source={require('../../assets/Logo1.png')} style={styles.image} />
                <View>
                    <Image
                        source={require('../../assets/wallpaper1.png')}
                        style={styles.wallpaper}
                    />
                </View>
                <View style={styles.text}>
                    <Text style={styles.desc}>
                        Scan, Discover, Thrive. Unveil events effortlessly with{' '}
                        <Text style={{ fontWeight: '700' }}>FossFolio</Text>
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <Box>
            <Box style={styles.main} mb={7}>
                <Text style={styles.main}>All Events</Text>
            </Box>
            {eventData.map((el) => (
                <Card p="$5" borderRadius="$lg" maxWidth={360} m="$3">
                    <VStack>
                        <Text style={styles.head}>{el.name}</Text>
                    </VStack>
                    <Box flexDirection="row">
                        <VStack>
                            <Text size="sm" fontFamily="$heading" mb="$1">
                                Last Date - {new Date(el.lastDate).getDate()}-
                                {new Date(el.lastDate).getMonth()}-
                                {new Date(el.lastDate).getFullYear()}
                            </Text>
                        </VStack>
                    </Box>
                    <Button
                        mt={10}
                        size="md"
                        variant="outline"
                        action="primary"
                        isDisabled={false}
                        isFocusVisible={false}
                    >
                        <ButtonText>More Info</ButtonText>
                    </Button>
                </Card>
            ))}
        </Box>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70%',
    },

    wallpaper: {
        width: 430,
        height: 260,
    },
    text: {
        width: 364,
        marginTop: 30,
    },
    desc: {
        fontWeight: '400',
        lineHeight: 24,
        fontSize: 20,
        textAlign: 'center',
    },
    head: {
        fontSize: 30,
        marginTop: 10,
        marginBottom: 10,
    },
    main: {
        marginTop: 10,
        height: 40,
        display: 'flex',
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
