import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { profile } from "./profile";
export const linkType = {
    GITHUB: "GITHUB",
    FRONTEND_MENTOR: "FRONTEND_MENTOR",
    TWITTER: "TWITTER",
    LINKEDIN: "LINKEDIN",
    YOUTUBE: "YOUTUBE",
    FACEBOOK: "FACEBOOK",
    TWITCH: "TWITCH",
    DEVTO: "DEVTO",
    CODEWARS: "CODEWARS",
    CODEPEND: "CODEPEND",
    FREECODECAMP: "FREECODECAMP",
    GITLAB: "GITLAB",
    HASHNODE: "HASHNODE",
    STACK_OVERFLOW: "STACK_OVERFLOW",
} as const;

export type LinkType = (typeof linkType)[keyof typeof linkType];
export const linkOptions: {
    label: string;
    value: LinkType;
    icon: string;
}[] = [
    {
        label: "Github",
        value: "GITHUB",
        icon: "i-uim-github-alt",
    },
    {
        label: "Frontend Mentor",
        value: "FRONTEND_MENTOR",
        icon: "i-simple-icons-frontendmentor",
    },
    {
        label: "Twitter",
        value: "TWITTER",
        icon: "i-ph-twitter-logo-fill",
    },
    {
        label: "LinkedIn",
        value: "LINKEDIN",
        icon: "i-simple-icons-linkedin",
    },
    {
        label: "Youtube",
        value: "YOUTUBE",
        icon: "i-ph-youtube-logo-fill",
    },
    {
        label: "Facebook",
        value: "FACEBOOK",
        icon: "i-simple-icons-facebook",
    },
    {
        label: "Twitch",
        value: "TWITCH",
        icon: "i-simple-icons-twitch",
    },
    {
        label: "Dev.to",
        value: "DEVTO",
        icon: "i-fa-brands-dev",
    },
    {
        label: "Codewars",
        value: "CODEWARS",
        icon: "i-cib-codewars",
    },
    {
        label: "Codepen",
        value: "CODEPEND",
        icon: "i-ph-codepen-logo-fill",
    },
    {
        label: "FreeCodeCamp",
        value: "FREECODECAMP",
        icon: "i-simple-icons-freecodecamp",
    },
    {
        label: "Gitlab",
        value: "GITLAB",
        icon: "i-bi-gitlab",
    },
    {
        label: "Hashnode",
        value: "HASHNODE",
        icon: "i-simple-icons-hashnode",
    },
    {
        label: "Stack Overflow",
        value: "STACK_OVERFLOW",
        icon: "i-simple-icons-stackoverflow",
    },
];

const linkEnum = Object.values(linkType) as [LinkType, ...LinkType[]];
export const link = sqliteTable("link", {
    id: text("id").primaryKey(),
    url: text("url").notNull(),
    type: text("type", { enum: linkEnum }),
    sort: integer("sort"),
    profileId: text("profileId"),
});

export const linkRelations = relations(link, ({ one }) => ({
    profile: one(profile, {
        fields: [link.profileId],
        references: [profile.id],
    }),
}));

export type ProfileLink = typeof link.$inferSelect;
export type ProfileLinkPayload = typeof link.$inferInsert;
