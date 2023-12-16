<script setup lang="ts">
definePageMeta({
    middleware: ["guest"],
});
useHead({
    title: "Register",
});
</script>

<template>
    <RegisterForm />
</template>
