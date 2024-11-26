import prisma from "@repo/database/client";
import { app } from "./app";
import "dotenv/config";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await prisma.$connect();
        console.log("Database connection successful");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
};

startServer();
