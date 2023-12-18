<script setup lang="ts">
const { data } = await useFetch("/api/link/list");
const { data: profile } = await useFetch("/api/profile/detail");
</script>

<template>
    <div h-full mx-auto relative>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="308"
            height="632"
            fill="none"
            viewBox="0 0 308 632"
        >
            <path
                stroke="#737373"
                d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
            />
            <path
                fill="#fff"
                stroke="#737373"
                d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
            />
        </svg>
        <div absolute left-0 top-0 w-full h-full class="max-h-[632px] p-11">
            <div flex flex-col>
                <div v-if="!profile">
                    <div
                        w-24
                        h-24
                        bg-accent3
                        block
                        rounded-full
                        animate-pulse
                        mx-auto
                        mt-13
                    />
                    <div class="w-4/6" h-8 bg-accent3 rounded-2 mx-auto mt-6 />
                    <div class="w-3/4" h-4 bg-accent3 rounded-2 mx-auto mt-4 />
                    <div
                        class="w-full"
                        h-12
                        bg-accent3
                        rounded-2
                        mx-auto
                        mt-12
                    />
                    <div
                        class="w-full"
                        h-12
                        bg-accent3
                        rounded-2
                        mx-auto
                        mt-5
                    />
                    <div
                        class="w-full"
                        h-12
                        bg-accent3
                        rounded-2
                        mx-auto
                        mt-5
                    />
                    <div
                        class="w-full"
                        h-12
                        bg-accent3
                        rounded-2
                        mx-auto
                        mt-5
                    />
                </div>
                <div v-else flex flex-col>
                    <div
                        w-24
                        h-24
                        rounded-full
                        overflow-hidden
                        relative
                        mx-auto
                        mt-8
                    >
                        <img
                            :src="profile.profile.avatar!"
                            alt="avatar"
                            width="96"
                            height="96"
                            object-cover
                        />
                    </div>
                    <p text-center mt-6 font-bold text-black text-lg>
                        {{ profile.profile.first_name }}
                        {{ profile.profile.last_name }}
                    </p>
                    <p text-center mt-2>
                        {{ profile.email }}
                    </p>

                    <div
                        flex
                        flex-col
                        items-center
                        mt-12
                        space-y-5
                        overflow-auto
                        class="max-h-[290px] scrollbar scrollbar-w-0px"
                    >
                        <ButtonLink
                            v-for="link in data"
                            :key="link.id"
                            :type="link.type!"
                            :url="link.url!"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
