<script setup lang="ts"></script>

<template>
    <header md:px-6 md:pt-6>
        <AppHeader />
    </header>
    <main p-6>
        <div grid lg:grid-cols-2 gap-6>
            <div
                bg-white
                rounded-2
                p-6
                max-h-2xl
                place-content-center
                class="lg:grid hidden"
            >
                <LinkPreview />
            </div>
            <slot />
        </div>
    </main>
</template>
