import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./db/schema/*",
    out: "db/migrations",
    driver: "better-sqlite",
    dbCredentials: {
        url: "db/data.db",
    },
    verbose: true,
});
