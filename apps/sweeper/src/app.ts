import { Client } from "pg";
import "dotenv/config";
import prisma from "@repo/database/client";
import { pushToQueue } from "./kafka/producer";

export const getBountyClaims = () => {
    const pgClient = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    pgClient.connect();

    pgClient.query("LISTEN new_row");

    pgClient.on("notification", async (msg) => {
        const newRow = JSON.parse(msg.payload as string);
        console.log("New row received:", newRow);

        try {
            await pushToQueue(newRow);

            await prisma.bountyClaimsOutbox.delete({
                where: {
                    id: newRow.id,
                },
            });
        } catch (error) {
            console.error("Error processing row:", error);
        }
    });
};
