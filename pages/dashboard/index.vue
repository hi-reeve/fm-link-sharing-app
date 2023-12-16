<script setup lang="ts">
const authUser = useAuthUser();
</script>

<template>
    <div>Current user : {{ authUser }}</div>
</template>
