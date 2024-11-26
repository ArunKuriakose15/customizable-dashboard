const express = require("express");
const { db } = require("../db.js");
const { users } = require("../models/userModel.js");
const { widgets } = require("../models/widgetModel.js")
const { widgetPreferences } = require("../models/widgetPreferenceModel.js")
const bcrypt = require("bcryptjs");
const { eq } = require("drizzle-orm");
const jwt = require("jsonwebtoken")
const router = express.Router();
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;


const hashPasswordGenerator = async (pass) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(pass, salt)
}

router.get("/profile/:userId", async (req, res) => {
    const { userId } = req.params;
    const token = req.headers["token"];

    jwt.verify(token, JWT_SECRET, async(error, decoded) => {
        if (error) {
            return res.status(401).json({
                status: "Unauthorized user",
                message: "Invalid token"
            });
        }

    try {
        const result = await db.select().from(users).where(eq(users.id, userId));;
        res.status(200).json({ status: "success", user: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
})
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status: "error", error: "Email and password are required" });
    }

    try {
        // Fetch the user from the database using a raw SQL query
        const result = await db.select().from(users).where(eq(users.email, email));;
        const user = result[0];
        if (!user) {
            return res.status(401).json({ status: "Invalid email", error: "Invalid email" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: "Invalid password", error: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({ status: "success", userData: user, "token": token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
});

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ status: "error", error: "Name, email, and password are required" });
    }

    try {
        
        const existingUser = await db.select().from(users).where(eq(users.email, email));

        if (existingUser.length > 0) {
            return res.status(409).json({ status: "Email already exists", error: "Email already exists" });
        }

        const hashedPassword = await hashPasswordGenerator(password);
       
        const [newUser] = await db
            .insert(users)
            .values({
                name,
                email,
                password: hashedPassword,
            })
            .returning(users);

        const widgetsData = await db.select({ id: widgets.id }).from(widgets);

        const preferences = widgetsData.map((widget) => ({
            user_id: newUser.id,
            widget_id: widget.id,
        }));

        await db.insert(widgetPreferences).values(preferences);

        res.status(201).json({ status: "success", message: "User registered successfully" });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
});





module.exports = router;
