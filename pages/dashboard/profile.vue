<script setup lang="ts">
import { z } from "zod";

useHead({
    title: "Profile",
});

const toast = useToast();
const { isLarge } = useWindow();

const validationSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    avatar: z.custom<File | string>().superRefine((file, ctx) => {
        if (typeof file === "string") return true;
        if (!file) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Avatar is required",
            });
            return false;
        }

        if (
            ![
                "image/webp",
                "image/png",
                "image/svg",
                "image/jpg",
                "image/jpeg",
            ].includes(file.type)
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "File must be a valid image type",
            });
            return false;
        }

        if (file.size > 1024 * 1024 * 1) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "File must be less than 1MB",
            });
            return false;
        }

        return true;
    }),
});

type CreateProfilePayload = z.infer<typeof validationSchema>;
const { loading, mutate } = useMutation<CreateProfilePayload>(
    body => {
        const formData = new FormData();
        formData.append("avatar", body.avatar);
        formData.append("first_name", body.first_name);
        formData.append("last_name", body.last_name);
        formData.append("email", body.email);

        return $fetch("/api/profile/create", {
            method: "POST",
            body: formData,
        });
    },
    {
        onSuccess: () => {
            toast({
                message: "Profile updated",
                type: "success",
            });
        },
    }
);
const { handleSubmit, meta, setFieldValue } = useForm({
    validationSchema: toTypedSchema(validationSchema),
});

const { data } = await useFetch("/api/profile/detail");

watch(
    data,
    current => {
        if (current) {
            setFieldValue("email", current.email);
            if (current.profile) {
                setFieldValue("first_name", current.profile.first_name!);
                setFieldValue("last_name", current.profile.last_name!);
                setFieldValue("avatar", current.profile.avatar!);
            }
        }
    },
    { immediate: true }
);

const onSubmit = handleSubmit(async values => {
    mutate({
        avatar: values.avatar,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
    });
});
</script>

<template>
    <div bg-white rounded-2 divide-y>
        <div md:p-10 p-6>
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
        <div md:px-10 px-6 md:py-6 py-4 flex>
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
