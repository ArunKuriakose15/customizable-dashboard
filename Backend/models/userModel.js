const { pgTable, serial, text } = require("drizzle-orm/pg-core");

const users = pgTable("user", {
    id: serial("id").primaryKey(), 
    name: text("name").notNull(), 
    email: text("email").notNull(), 
    password: text("password").notNull(), 
});

module.exports = { users };
