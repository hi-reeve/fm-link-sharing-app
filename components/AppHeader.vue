<script setup lang="ts">
const { logout } = useAuth();
const authUser = useAuthUser();
</script>

<template>
    <nav flex w-full items-center bg-white rounded-3 p-4>
        <div>
            <NuxtImg
                src="/images/logo-devlinks-large.svg"
                alt="logo"
                class="md:block hidden"
                width="120"
            />
            <NuxtImg
                src="/images/logo-devlinks-small.svg"
                alt="logo"
                width="100%"
                class="md:hidden block w-8 h-8"
            />
        </div>

        <ul mx-auto flex>
            <li>
                <NuxtLink
                    flex
                    space-x-2
                    items-center
                    px-6.75
                    py-2.75
                    rounded-2
                    transition-all
                    duration-300
                    ease-in-out
                    exact-active-class="bg-primary3 text-primary"
                    :to="{ name: 'dashboard-link' }"
                >
                    <span class="i-bx-link" block md:w-5 md:h-5 w-6 h-6 />
                    <span class="md:inline hidden">Links</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink
                    flex
                    space-x-2
                    items-center
                    px-6.75
                    py-2.75
                    rounded-2
                    transition-all
                    duration-300
                    ease-in-out
                    exact-active-class="bg-primary3 text-primary"
                    :to="{ name: 'dashboard-profile' }"
                >
                    <span
                        class="i-bx-user-circle"
                        block
                        md:w-5
                        md:h-5
                        w-6
                        h-6
                    />
                    <span class="md:inline hidden">Profile Details</span>
                </NuxtLink>
            </li>
            <li>
                <button
                    flex
                    space-x-2
                    items-center
                    px-6.75
                    py-2.75
                    rounded-2
                    transition-all
                    duration-300
                    ease-in-out
                    bg-transparent
                    @click="logout"
                >
                    <span class="i-bx:log-out" block md:w-5 md:h-5 w-6 h-6 />
                    <span class="md:inline hidden">Logout</span>
                </button>
            </li>
        </ul>

        <Button
            secondary
            @click="
                navigateTo({
                    name: 'preview-id',
                    params: { id: authUser!.userId },
                })
            "
        >
            <div class="md:block hidden">Preview</div>
            <div class="i-ic-outline-remove-red-eye md:hidden block"></div>
        </Button>
    </nav>
</template>
