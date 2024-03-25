import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

type Props = {
    open: boolean;
    onClose: () => void;
};

export const TaskPane = ({ open, onClose }: Props) => {
    return (
        <Drawer
            open={open}
            onClose={onClose}
            direction="right"
            size={850}
            className="p-5 bg-red-300"
        >
            <h1>Hello world</h1>
        </Drawer>
    );
};
