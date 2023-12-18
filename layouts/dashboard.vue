<script setup lang="ts"></script>

<template>
    <header md:px-6 md:pt-6>
        <AppHeader />
    </header>
    <main p-6>
        <div grid lg:grid-cols-3 gap-6>
            <div bg-white rounded-2 p-6 class="lg:grid hidden" w-full>
                <LinkPreview />
            </div>
            <div col-span-2>
                <slot />
            </div>
        </div>
    </main>
</template>
