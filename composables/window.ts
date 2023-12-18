export const useWindow = () => {
    const { width } = useWindowSize();

    const isLarge = ref(true);
    watchEffect(() => {
        if (width.value >= 769) isLarge.value = true;
        else isLarge.value = false;
    });

    return {
        isLarge,
    };
};
