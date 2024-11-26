const { pgTable, serial, text, uniqueIndex } = require("drizzle-orm/pg-core");

const widgets = pgTable("widget", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    label: text("label").notNull(),
});

module.exports = { widgets };
