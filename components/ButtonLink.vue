<script setup lang="ts">
import { linkOptions, type LinkType } from "~/db/schema/link";

const props = defineProps<{
    type: LinkType;
    url: string;
}>();

const getOption = computed(() => {
    return linkOptions.find(o => o.value === props.type);
});
</script>

<template>
    <li
        w-full
        h-[44px]
        rounded-2
        inline-flex
        items-center
        py-2.75
        px-4
        text-white
        :style="{
            backgroundColor: getOption?.color,
        }"
    >
        <div :class="getOption?.icon" w-4 h-4 mr-2 />
        <div>{{ getOption?.label }}</div>
        <div class="i-mdi-arrow-right w-4 h-4 ml-auto block" />
    </li>
</template>
