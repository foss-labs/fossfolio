import { RiLoaderFill } from 'react-icons/ri';

export const Loader = () => {
    return (
        <div className="h-screen flex items-center justify-center p-4">
            <RiLoaderFill className="animate-spin h-8 w-8" />
        </div>
    );
};
