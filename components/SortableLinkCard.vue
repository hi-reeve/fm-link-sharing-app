<script setup lang="ts">
import { linkOptions } from "~/db/schema/link";
import Sortable from "sortablejs";

defineProps<{
    fields: any[];
}>();

const emit = defineEmits<{
    (e: "remove", index: number): void;
}>();

const rootRef = ref<HTMLElement | null>(null);

const sortableInst = ref<Sortable | null>(null);

onMounted(() => {
    if (rootRef.value) {
        sortableInst.value = new Sortable(rootRef.value, {
            animation: 150,
            handle: "div[i-system-uicons-drag]",
        });
    }
});
</script>

<template>
    <div ref="rootRef" space-y-5 mt-5>
        <div
            v-for="(field, index) in fields"
            :key="field.key"
            bg-accent-3
            p-5
            rounded-2
            space-y-3
        >
            <div flex items-center w-full>
                <div i-system-uicons-drag w-6 h-6 cursor-pointer />
                <div font-semibold ml-1>Link #{{ index + 1 }}</div>
                <button bg-transparent ml-auto @click="emit('remove', index)">
                    Remove
                </button>
            </div>

            <div>
                <p mb-1>Platform</p>
                <Select
                    :name="`link[${index}].type`"
                    :options="linkOptions"
                    label-field="label"
                    value-field="value"
                    icon-field="icon"
                />
            </div>
            <div>
                <p mb-1>Link</p>
                <Input
                    :name="`link[${index}].url`"
                    placeholder="e.g. https://www.github.com/hi-reeve"
                />
            </div>
        </div>
    </div>
</template>
