const { pgTable, serial, varchar, integer, boolean } = require("drizzle-orm/pg-core");
const users = require("./userModel.js");
const widgets = require("./widgetModel.js");

const widgetPreferences = pgTable("widget_perference", {
    id: serial("id").primaryKey(),
    user_id: integer("user_id")
        .notNull()
        .references(() => users.id),
    widget_id   : integer("widget_id")
        .references(() => widgets.id),
    is_visible: boolean("is_visible").default(true),
});

module.exports = { widgetPreferences };
