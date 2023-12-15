<script setup lang="ts">
import { z } from "zod";
import type { Account } from "~/db/schema/account";

const toast = useToast();

const validationSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
const { handleSubmit, meta } = useForm({
    validationSchema: toTypedSchema(validationSchema),
});

const { mutate, loading } = useMutation<Pick<Account, "email" | "password">>(
    body =>
        $fetch("/api/auth/signup", {
            method: "POST",
            body,
        }),
    {
        onSuccess: () => {
            toast({
                type: "success",
                message: "Success creating your account, please login.",
            });
            navigateTo({
                name: "auth-login",
            });
        },
    }
);
const onSubmit = handleSubmit(v => {
    mutate({
        email: v.email,
        password: v.password,
    });
});
</script>

<template>
    <div w-full>
        <h1 text-2xl font-bold mb-2 text-black>Create account</h1>
        <p font-400>Let’s get you started sharing your links!</p>
        <form mt-10 space-y-6 @submit="onSubmit">
            <Input
                name="email"
                label="Email address"
                type="email"
                placeholder="e.g.johndoe@example.com"
                icon="i-bxs-envelope"
            />
            <Input
                name="password"
                label="Create Password"
                type="password"
                placeholder="Enter your password"
                icon="i-mdi-lock"
            />
            <Input
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Enter password confirmation"
                icon="i-mdi-lock"
            />

            <p text-sm>Password must contain at least 8 characters</p>
            <Button
                block
                :disabled="!meta.valid"
                :loading="loading"
                type="submit"
            >
                Create new account
            </Button>
        </form>
        <div text-center mt-8>
            <p>Already have an account?</p>
            <NuxtLink
                bg-transparent
                text-primary
                hover:underline
                :to="{
                    name: 'auth-login',
                }"
            >
                Login
            </NuxtLink>
        </div>
    </div>
</template>
