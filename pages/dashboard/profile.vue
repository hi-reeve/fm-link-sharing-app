<script setup lang="ts">
import { z } from "zod";
useHead({
    title: "Profile",
});

const { isLarge } = useWindow();

const validationSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    avatar: z.string().url(),
});

const { loading, mutate } = useMutation(body =>
    $fetch("/api/profile/create", {
        method: "POST",
        body,
    })
);
const { handleSubmit, meta, setFieldValue } = useForm({
    validationSchema: toTypedSchema(validationSchema),
});

const { data, error } = await useFetch("/api/profile/detail");

watch(
    data,
    current => {
        if (current) {
            setFieldValue("email", current.email);
        }
    },
    { immediate: true }
);

const onSubmit = handleSubmit(async values => {
    console.log(values);
});
</script>

<template>
    <div bg-white rounded-2 divide-y>
        <div md:p-10 p-6>
            {{ error }}
            <h1 text-2xl font-bold text-black mb-2>Profile Details</h1>
            <p class="mb-10">
                Add your details to create a personal touch to your profile.
            </p>

            <div space-y-6>
                <div
                    grid
                    lg:grid-cols-12
                    grid-cols-1
                    bg-accent-3
                    px-5
                    lg:py-8
                    py-5
                    rounded-2
                    items-center
                >
                    <p col-span-3 lg:mb-0 mb-4>Profile picture</p>
                    <div
                        flex
                        lg:flex-row
                        flex-col
                        gap-x-6
                        col-span-9
                        lg:items-center
                    >
                        <FileUpload name="avatar" />
                        <p class="lg:mt-0 mt-6">
                            Image must be below 1024x1024px. Use PNG or JPG
                            format.
                        </p>
                    </div>
                </div>
                <div bg-accent-3 px-5 py-8 rounded-2 space-y-3>
                    <div grid lg:grid-cols-12 grid-cols-1 items-center>
                        <p lg:col-span-3 lg:mb-0 mb-1>First name*</p>
                        <div lg:col-span-9>
                            <Input
                                name="first_name"
                                placeholder="Input your first name"
                            />
                        </div>
                    </div>
                    <div grid lg:grid-cols-12 grid-cols-1 items-center>
                        <p col-span-3 lg:col-span-3 lg:mb-0 mb-1>Last name*</p>
                        <div lg:col-span-9>
                            <Input
                                name="last_name"
                                placeholder="Input your last name"
                            />
                        </div>
                    </div>
                    <div grid lg:grid-cols-12 grid-cols-1 items-center>
                        <p col-span-3 lg:col-span-3 lg:mb-0 mb-1>Email</p>
                        <div lg:col-span-9>
                            <Input
                                name="email"
                                placeholder="john@doe.com"
                                type="email"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div md:px-10 px-4 md:py-6 py-4 flex>
            <Button
                :block="!isLarge"
                md:ml-auto
                :disabled="!meta.valid"
                :loading="loading"
                @click="onSubmit"
            >
                Save
            </Button>
        </div>
    </div>
</template>
