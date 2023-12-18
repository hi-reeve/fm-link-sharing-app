<script setup lang="ts">
import { z } from "zod";
import { type ProfileLink, linkType } from "~/db/schema/link";
useHead({
    title: "Link",
});
const toast = useToast();

const { isLarge } = useWindow();

const validationSchema = z.object({
    link: z
        .array(
            z.object({
                type: z.nativeEnum(linkType),
                url: z.string().url(),
            })
        )
        .refine(
            items => {
                const type = new Set(items.map(i => i.type));

                return type.size === items.length;
            },
            {
                message: "Duplicate link types are not allowed",
            }
        ),
});

const { handleSubmit, meta } = useForm({
    validationSchema: toTypedSchema(validationSchema),
});

const { push, fields, remove, swap } =
    useFieldArray<z.infer<typeof validationSchema>["link"][number]>("link");
const { data } = await useFetch("/api/link/list");

watch(
    data,
    current => {
        if (current?.length) {
            current.forEach(c => {
                push({
                    type: c.type!,
                    url: c.url,
                });
            });
        }
    },
    { immediate: true }
);

const onAddNewLink = () => {
    push({
        type: linkType.GITHUB,
        url: "",
    });
};
const onSwap = (oldIndex: number, newIndex: number) => {
    swap(oldIndex, newIndex);
};

const { loading, mutate } = useMutation<
    Omit<ProfileLink, "profileId" | "id">[]
>(
    body =>
        $fetch("/api/link/create", {
            method: "POST",
            body,
        }),
    {
        onSuccess: () => {
            toast({
                message: "Links updated successfully",
                type: "success",
            });
        },
        onError: e => {
            toast({
                message: `Error: ${e.statusMessage}`,
                type: "error",
            });
        },
    }
);

const onSubmit = handleSubmit(values => {
    mutate(
        values.link.map((v, i) => ({
            sort: i,
            type: v.type,
            url: v.url,
        }))
    );
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
            <SortableLinkCard
                :fields="fields"
                @remove="remove($event)"
                @sort="onSwap"
            />
        </div>

        <div md:px-10 px-6 md:py-6 py-4 flex>
            <Button
                :block="!isLarge"
                md:ml-auto
                :disabled="!meta.valid"
                :loading="loading"
                @click="onSubmit"
            >
                {{ data?.length ? "Update" : "Save" }}
            </Button>
        </div>
    </div>
</template>
