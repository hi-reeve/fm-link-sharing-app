<script setup lang="ts"></script>

<template>
    <header md:px-6 md:pt-6>
        <AppHeader />
    </header>
    <main p-6>
        <div grid lg:grid-cols-2 gap-6>
            <div
                transition-all
                duration-300
                ease-in-out
                bg-white
                rounded-2
                p-6
                place-content-center
                h-full
                max-h-2xl
                class="lg:grid hidden"
            >
                <NuxtImg
                    src="/images/illustration-phone-mockup.svg"
                    alt="phone"
                    w-xl
                    h-xl
                    width="100%"
                />
            </div>
            <slot />
        </div>
    </main>
</template>
