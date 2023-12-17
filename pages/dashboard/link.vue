<script setup lang="ts">
import { z } from "zod";
import { linkType } from "~/db/schema/link";

const { width } = useWindowSize();

const isLarge = ref(true);
watchEffect(() => {
    if (width.value >= 769) isLarge.value = true;
    else isLarge.value = false;
});

const validationSchema = z.object({
    link: z.array(
        z.object({
            type: z.nativeEnum(linkType),
            url: z.string().url(),
        })
    ),
});

const { handleSubmit, meta } = useForm({
    validationSchema: toTypedSchema(validationSchema),
});

const { push, fields, remove } =
    useFieldArray<z.infer<typeof validationSchema>["link"][number]>("link");

const onAddNewLink = () => {
    push({
        type: linkType.GITHUB,
        url: "",
    });
};

const onSubmit = handleSubmit(values => {
    console.log(values);
});
</script>

<template>
    <div bg-white rounded-2 divide-y>
        <div md:p-10 p-6>
            <h1 text-2xl font-bold text-black mb-2>Customize your links</h1>
            <p class="mb-10">
                Add/edit/remove links below and then share all your profiles
                with the world!
            </p>
            <Button secondary block @click="onAddNewLink">
                + Add new link
            </Button>
            <LetsGetStarted v-if="!fields.length" />
            <SortableLinkCard :fields="fields" @remove="remove($event)" />
        </div>

        <div md:px-10 px-4 md:py-6 py-4 flex>
            <Button
                :block="!isLarge"
                md:ml-auto
                :disabled="!meta.valid"
                @click="onSubmit"
            >
                Save
            </Button>
        </div>
    </div>
</template>
