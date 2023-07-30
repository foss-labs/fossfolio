export const apiResponse = (data: unknown, message: string) => {
    return {
        ok: true,
        data,
        message,
    };
};
