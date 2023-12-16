<script setup lang="ts">
definePageMeta({
    middleware: ["guest"],
});
useHead({
    title: "Login",
});

const authUser = useAuthUser();
</script>

<template>
    <div>
        <LoginForm />
        <p>Current user : {{ authUser }}</p>
    </div>
</template>
