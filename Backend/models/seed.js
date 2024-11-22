const { db } = require("../db.js");
const { widgets } = require("./widgetModel.js");

const seedWidgets = async () => {
    const defaultWidgets = [
        { name: "EarningCard", label: "Earnings" },
        { name: "ProfitCard", label: "Profit" },
        { name: "PointCard", label: "Points" },
        { name: "ViewChart", label: "Chart" },
    ];

    try {
        const existingWidgets = await db.select().from(widgets);
        
        for (const widget of defaultWidgets) {
            const widgetExists = existingWidgets.some(existingWidget => 
                existingWidget.name === widget.name && existingWidget.label === widget.label
            );

            if (!widgetExists) {
                await db.insert(widgets).values(widget);
            } 
        }

        console.log("Widgets seeding process completed!");
    } catch (error) {
        console.error("Error seeding widgets:", error);
    }
};

module.exports = { seedWidgets };
