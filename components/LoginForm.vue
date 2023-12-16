<script setup lang="ts">
import { z } from "zod";
const validationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});
const { handleSubmit, meta } = useForm({
    validationSchema: toTypedSchema(validationSchema),
});

const { loadingLogin, login } = useAuth();
const onSubmit = handleSubmit(v => {
    login(v);
});
</script>

<template>
    <div>
        <h1 text-2xl font-bold mb-2 text-black>Login</h1>
        <p font-400>Add your details below to get back into the app</p>

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
                label="Password"
                type="password"
                placeholder="Enter your password"
                icon="i-mdi-lock"
            />
            <Button
                block
                :disabled="!meta.valid"
                :loading="loadingLogin"
                type="submit"
            >
                Login
            </Button>
        </form>
        <div text-center mt-8>
            <p>Don't have an account?</p>
            <NuxtLink
                bg-transparent
                text-primary
                hover:underline
                :to="{
                    name: 'auth-register',
                }"
            >
                Create account
            </NuxtLink>
        </div>
    </div>
</template>
