<script setup lang="ts">
const route = useRoute("preview-id");
const { data: links } = await useFetch("/api/link/list");
const { data: profile } = await useFetch("/api/profile/detail", {});
</script>

<template>
    <div>index</div>
</template>
