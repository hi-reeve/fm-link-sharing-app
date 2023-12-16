<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        secondary?: boolean;
        type?: "button" | "submit" | "reset";
        disabled?: boolean;
        block?: boolean;
        loading?: boolean;
    }>(),
    {
        secondary: false,
        type: "button",
        disabled: false,
        block: false,
        loading: false,
    }
);
const { block } = toRefs(props);
</script>

<template>
    <button
        md:px-6.75
        px-4
        py-2.75
        rounded-2
        transition-all
        duration-150
        ease-in-out
        :class="{
            'bg-primary text-white active:bg-primary-2 disabled:opacity-25 disabled:cursor-not-allowed disabled:active:bg-primary active:shadow-md active:shadow-primary-2/25':
                !secondary,
            'bg-transparent text-primary active:bg-primary-3 border border-primary bg:border-primary-2 disabled:opacity-25 disabled:active:bg-transparent disabled:cursor-not-allowed':
                secondary,
            'w-full': block,
        }"
        :type="type"
        :disabled="disabled || loading"
    >
        <div flex w-full h-full space-x-2 items-center justify-center>
            <div v-if="loading" class="i-gg-spinner" w-6 h-6 animate-spin />
            <span>
                <slot />
            </span>
        </div>
    </button>
</template>
