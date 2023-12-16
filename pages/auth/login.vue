<script setup lang="ts">
definePageMeta({
    middleware: ["guest"],
});
useHead({
    title: "Login",
});
</script>

<template>
    <div>
        <LoginForm />
    </div>
</template>
