import { Box } from '@gluestack-ui/themed';
import { Circle } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

export const QrToggler = ({ toggleQr }) => {
    return (
        <Box style={styles.icons}>
            <Circle size={14} style={styles.icon1} onPress={toggleQr.off} />
            <Circle size={14} style={styles.icon2} onPress={toggleQr.on} />
        </Box>
    );
};

const styles = StyleSheet.create({
    icon1: {
        color: '#7F56D9',
        width: 30,
        height: 30,
        right: 10,
    },
    icon2: {
        width: 30,
        height: 30,
        left: 10,
    },
    icons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
