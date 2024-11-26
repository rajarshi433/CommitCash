import express, { Express, Request, Response } from "express";
import prisma from "@repo/database/client";
import { parseWebhookBody } from "./utils/parseWebhookBody";
import { verifyUser } from "./middlewares/verifyUser.middleware";

const app: Express = express();

app.use(express.json());

app.get("/:zapId", async (req, res) => {
    const whiteList = await prisma.whiteList.findFirst({
        where: {
            zapId: req.params.zapId,
        },
        select: {
            githubId: true,
        },
    });
    res.send({
        message: whiteList,
    });
});

app.post(
    "/webhook/fetch/:zapId/:userId",
    verifyUser,
    async (req: Request, res: Response) => {
        const zapId = req.params.zapId as string;
        const zapOwnerId = req.params.userId as string;

        const webhookBody = req.body;
        const parsedBody = parseWebhookBody(webhookBody);

        try {
            const zapHit = await prisma.zapHit.create({
                data: {
                    zapId,
                    zapOwnerId,
                    bountyGiverId: parsedBody.bountyGiverId,
                    bountyReceiverId: parsedBody.bountyReceiverId,
                    bountyAmount: Number(parsedBody.bountyAmount),
                    commentLink: parsedBody.commentLink,
                },
            });

            res.status(200).send({ message: zapHit });
        } catch (error) {
            res.status(500).send({
                message: (error as Error).message,
            });
        }
    }
);

export { app };
