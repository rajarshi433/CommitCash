import express, { Express } from "express";
import "dotenv/config";
import prisma from "@repo/database/client";
import { getBountyClaims } from "./app";

const app: Express = express();

app.use(express.json());

const PORT = process.env.PORT || 8001;

const startServer = async () => {
    try {
        await prisma.$connect();
        console.log("Database connection successful");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            getBountyClaims();
        });
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
};

startServer();
