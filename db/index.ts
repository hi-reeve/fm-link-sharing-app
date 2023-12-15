import { drizzle } from "drizzle-orm/better-sqlite3";
//@ts-expect-error
import Database from "better-sqlite3";
import * as accountSchema from "./schema/account";
import * as profileSchema from "./schema/profile";
import * as linkSchema from "./schema/link";
const sqlite = new Database("db/data.db");
export const db = drizzle(sqlite, {
    schema: {
        ...accountSchema,
        ...profileSchema,
        ...linkSchema,
    },
});
