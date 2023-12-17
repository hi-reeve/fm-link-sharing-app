<script setup lang="ts">
const props = defineProps<{
    labelField: string;
    valueField: string;
    options: any;
    name: string;
    placeholder?: string;
    iconField?: string;
}>();
const { name, placeholder, options } = toRefs(props);
const { value } = useField<string | undefined>(name, undefined, {
    syncVModel: true,
});

const selectedIcon = computed(() => {
    if (!props.iconField) return null;
    const selected = options.value.find(
        (o: any) => o[props.valueField] === value.value
    );
    return selected ? selected[props.iconField] : null;
});
</script>

<template>
    <SelectRoot v-model="value">
        <SelectTrigger
            class="bg-white inline-flex items-center rounded-2 px-4 py-3 border w-full group data-[state=open]:shadow-custom data-[state=open]:border-primary transition-all duration-300 ease-in-out"
        >
            <div v-if="iconField" :class="selectedIcon" w-4 h-4 mr-2 />
            <SelectValue
                :placeholder="placeholder || 'Select an item'"
                text-black
            />

            <div
                i-bx-chevron-down
                w-6
                h-6
                ml-auto
                class="group-data-[state=open]:rotate-180"
                transition-all
                duration-300
                ease-in-out
            />
        </SelectTrigger>

        <SelectPortal>
            <SelectContent
                bg-white
                rounded-2
                px-4
                w-full
                class="shadow-[0px,0px,32px,0px,rgba(0,0,0,0.10)]"
                border
            >
                <SelectViewport>
                    <SelectItem
                        v-for="item in options"
                        :key="item[valueField]"
                        :value="item[valueField]"
                        flex
                        items-center
                        py-3
                        class="data-[state=checked]:text-primary last-of-type:border-none border-b cursor-pointer data-[highlighted]:text-primary data-[highlighted]:outline-0 transition-all duration-150 ease-in-out"
                    >
                        <SelectItemIndicator class="mr-2">
                            <div i-bx-check w-4 h-4 />
                        </SelectItemIndicator>
                        <div
                            v-if="iconField"
                            :class="item[iconField]"
                            w-4
                            h-4
                            mr-3
                        />
                        <SelectItemText inline-flex items-center>
                            <span>{{ item[labelField] }}</span>
                        </SelectItemText>
                    </SelectItem>
                </SelectViewport>
            </SelectContent>
        </SelectPortal>
    </SelectRoot>
</template>
