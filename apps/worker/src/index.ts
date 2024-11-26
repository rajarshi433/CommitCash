import express, { Express } from "express";
import "dotenv/config";
import prisma from "@repo/database/client";

const app: Express = express();

app.use(express.json());

app.get("/", async (req, res) => {
    const users = await prisma.user.findMany();
    res.send({
        message: "Hello from worker",
    });
});

const PORT = process.env.PORT || 8002;

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
