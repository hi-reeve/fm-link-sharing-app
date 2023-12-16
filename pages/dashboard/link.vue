<script setup lang="ts">
definePageMeta({
    pageTransition: {
        enterActiveClass: "transition-all duration-150 ease-in-out",
        enterFromClass: "opacity-0 -translate-x-4",
        enterToClass: "opacity-100 translate-x-0",
        leaveActiveClass: "transition-all duration-150 ease-in-out",
        leaveFromClass: "opacity-100 translate-x-0",
        leaveToClass: "opacity-0 translate-x-4",
        mode: "out-in",
    },
});
</script>

<template>
    <div>Link</div>
</template>
