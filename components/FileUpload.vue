<script setup lang="ts">
const props = defineProps<{ name: string }>();
const { name } = toRefs(props);
const { handleChange, value } = useField<File>(name, undefined, {
    syncVModel: true,
});
const selectFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = e => {
        const files = (e.target as HTMLInputElement).files;
        if (files && files.length) handleChange(files[0]);
    };
    input.click();
};

const fileSrc = computed(() => {
    if (typeof value.value === "object")
        return URL.createObjectURL(value.value);

    return value.value;
});
</script>

<template>
    <button bg-primary3 rounded-2 w-max @click="selectFile">
        <div
            v-if="!value"
            grid
            place-items-center
            gap-2
            text-primary
            py-15.5
            px-9
        >
            <div i-bx-image w-10 h-10 />
            <span>+ Upload Image</span>
        </div>
        <div v-else relative overflow-hidden rounded-2 class="group">
            <div
                class="absolute z-10 w-full h-full text-white bg-black/50 place-content-center grid opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
            >
                <div i-bx-image w-10 h-10 mx-auto />
                <span block mt-2>Change Image</span>
            </div>
            <img
                alt="avatar"
                :src="fileSrc"
                w-48
                h-48
                object-cover
                z-9
                width="192"
                height="192"
            />
        </div>
    </button>
</template>
