<script setup lang="ts">
definePageMeta({
    middleware: ["guest"],
});
</script>

<template>
    <div flex flex-col justify-center items-center min-h-screen>
        <div w-full>
            <div
                class="md:mb-14 mb-18 grid md:place-items-center place-items-start"
            >
                <NuxtImg
                    src="images/logo-devlinks-large.svg"
                    alt="logo"
                    width="200"
                />
            </div>
            <div
                md:bg-white
                md:p-8.5
                md:rounded-2
                transition-all
                duration-300
                ease-in-out
                class="md:w-3/4 lg:w-1/3 mx-auto"
            >
                <NuxtPage
                    :transition="{
                        enterActiveClass:
                            'transition-all duration-150 ease-in-out',
                        enterFromClass: 'opacity-0 -translate-x-4',
                        enterToClass: 'opacity-100 translate-x-0',
                        leaveActiveClass:
                            'transition-all duration-150 ease-in-out',
                        leaveFromClass: 'opacity-100 translate-x-0',
                        leaveToClass: 'opacity-0 translate-x-4',
                        mode: 'out-in',
                    }"
                />
            </div>
        </div>
    </div>
</template>
