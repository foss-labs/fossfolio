import { Toast, ToastDescription, ToastTitle, VStack, useToast } from '@gluestack-ui/themed';
import { useEffect, useState } from 'react';

import { useToggle } from './useToggle';
import { apiHandler } from '../config/apiHandler';

export const useEvents = () => {
    const [isLoading, toggleLoading] = useToggle(true);
    const [eventData, setData] = useState([]);
    const toast = useToast();

    useEffect(() => {
        try {
            toggleLoading.on();

            (async () => {
                const { data } = await apiHandler.get('/events');
                setData(data);
            })();
        } catch {
            toast.show({
                placement: 'top',
                render: ({ id }) => {
                    const toastId = 'toast-' + id;
                    return (
                        <Toast nativeID={toastId} action="error" variant="outline">
                            <VStack space="xs">
                                <ToastTitle>Error Fetching data</ToastTitle>
                                <ToastDescription>couldnt get the event data</ToastDescription>
                            </VStack>
                        </Toast>
                    );
                },
            });
        } finally {
            toggleLoading.off();
        }
    }, []);

    return {
        isLoading,
        eventData,
    };
};
