<script setup lang="ts">
const { width } = useWindowSize();

const isLarge = ref(true);
watchEffect(() => {
    if (width.value >= 769) isLarge.value = true;
    else isLarge.value = false;
});
</script>

<template>
    <div bg-white rounded-2 divide-y>
        <div md:p-10 p-6>
            <h1 text-2xl font-bold text-black mb-2>Customize your links</h1>
            <p class="mb-10">
                Add/edit/remove links below and then share all your profiles
                with the world!
            </p>
            <Button secondary block> + Add new link </Button>
            <div bg-accent3 px-5 text-center py-11.5 mt-6>
                <NuxtImg
                    src="/images/illustration-empty.svg"
                    alt="empty link"
                    mx-auto
                />
                <h2 text-black font-bold text-2xl md:mt-10 mt-6>
                    Let’s get you started
                </h2>
                <p text-center mt-6>
                    Use the “Add new link” button to get started. Once you have
                    more than one link, you can reorder and edit them. We’re
                    here to help you share your profiles with everyone!
                </p>
            </div>
        </div>

        <div md:px-10 px-4 md:py-6 py-4 flex>
            <Button :block="!isLarge" md:ml-auto> Save </Button>
        </div>
    </div>
</template>
