import { View, Image, StyleSheet, Text } from 'react-native';
export const OpenPage = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/Logo1.png')} style={styles.image} />
            <View>
                <Image source={require('../../assets/wallpaper1.png')} style={styles.wallpaper} />
            </View>
            <View style={styles.text}>
                <Text style={styles.desc}>
                    Scan, Discover, Thrive. Unveil events effortlessly with{' '}
                    <Text style={{ fontWeight: '700' }}>FossFolio</Text>
                </Text>
            </View>
        </View>
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
});
