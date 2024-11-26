const express = require("express");
const { db } = require("../db.js");
const { users } = require("../models/userModel.js");
const { widgets } = require("../models/widgetModel.js")
const { widgetPreferences } = require("../models/widgetPreferenceModel.js")

const { eq } = require("drizzle-orm");
const { and } = require("drizzle-orm");
const jwt = require("jsonwebtoken")
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

router.get("/widget-preferences/:userId", async (req, res) => {
    const { userId } = req.params;
    const token = req.headers["token"];

    jwt.verify(token, JWT_SECRET, async (error, decoded) => {
        if (error) {
            return res.status(401).json({
                status: "Unauthorized user",
                message: "Invalid token"
            });
        }

        try {
            if (!userId) {
                return res.status(400).json({ status: "error", error: "User ID is required" });
            }

            const preferences = await db
                .select({
                    userId: widgetPreferences.user_id,
                    widgetId: widgetPreferences.widget_id,
                    widgetName: widgets.name,
                    widgetLabel: widgets.label,
                    is_visible: widgetPreferences.is_visible,
                })
                .from(widgetPreferences)
                .leftJoin(widgets, (eq(widgets.id, widgetPreferences.widget_id)))
                .where(eq(widgetPreferences.user_id, (parseInt(userId))));

            if (preferences.length === 0) {
                return res.status(404).json({ status: "error", error: "No widget preferences found for the user" });
            }
            res.status(200).json({ status: "success", data: preferences });
        } catch (error) {
            console.error("Error fetching widget preferences:", error);
            res.status(500).json({ status: "error", error: "Internal Server Error" });
        }
    })
});

router.put("/update-widget-preferences", async (req, res) => {
    const { userId, updates } = req.body;
    const token = req.headers["token"];

    jwt.verify(token, JWT_SECRET, async (error, decoded) => {
        if (error) {
            return res.status(401).json({
                status: "Unauthorized user",
                message: "Invalid token"
            });
        }

        try {
            if (!userId || !Array.isArray(updates) || updates.length === 0) {
                return res.status(400).json({
                    status: "error",
                    error: "userId and a non-empty updates array are required",
                });
            }

            for (const update of updates) {
                const { widgetId, isVisible } = update;

                if (widgetId == null || isVisible == null) {
                    return res.status(400).json({
                        status: "error",
                        error: "Each update must contain widgetId and isVisible",
                    });
                }

                await db
                    .update(widgetPreferences)
                    .set({ is_visible: isVisible })
                    .where(
                        and(
                            eq(widgetPreferences.user_id, parseInt(userId)),
                            eq(widgetPreferences.widget_id, parseInt(widgetId))
                        )
                    );
            }

            res.status(200).json({
                status: "success",
                message: "Widget preferences updated successfully",
            });
        } catch (error) {
            console.error("Error updating widget preferences:", error);
            res.status(500).json({
                status: "error",
                error: "Internal Server Error",
            });
        }
    })
});




module.exports = router;