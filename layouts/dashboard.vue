<script setup lang="ts"></script>

<template>
    <header md:px-6 md:pt-6>
        <AppHeader />
    </header>
    <main p-6>
        <div grid grid-cols-2>
            <div>Layout Phone</div>
            <slot />
        </div>
    </main>
</template>
