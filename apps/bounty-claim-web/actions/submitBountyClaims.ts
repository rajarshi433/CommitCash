"use server";

import { authOptions } from "@/lib/auth";
import { BountyDescriptionType } from "@repo/common";
import prisma from "@repo/database/client";
import { getServerSession } from "next-auth";

export const submitBountyClaims = async (
    intialState: { message: string },
    formData: FormData
) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const session = await getServerSession(authOptions);

    const accountNumber = formData.get("acn") as string;
    const bountyData = session?.user.bounties[0] as BountyDescriptionType;

    const zapId = bountyData.zapId;
    const zapHitId = bountyData.id;
    const githubUsername = bountyData.bountyReceiverUsername;
    const githubId = bountyData.bountyReceiverId;
    const bankCreds = accountNumber;
    const bountyAmount = bountyData.bountyAmount;

    try {
        const bounties = await prisma.zapHit.findMany({
            where: {
                bountyReceiverId: githubId,
                isActive: true,
                status: "WAITING_TO_CLAIM",
            },
        });

        if (bounties.length < 1) {
            throw new Error();
        }

        await prisma.$transaction(async (tx) => {
            await tx.bountyClaims.create({
                data: {
                    zapId,
                    zapHitId,
                    githubUsername,
                    githubId,
                    bankCreds,
                    bountyAmount,
                },
            });

            await tx.bountyClaimsOutbox.create({
                data: {
                    zapId,
                    zapHitId,
                    githubUsername,
                    githubId,
                    bankCreds,
                    bountyAmount,
                },
            });

            await tx.zapHit.updateMany({
                where: {
                    id: session?.user.bounties[0]?.id,
                    bountyReceiverId: githubId,
                },
                data: {
                    status: "QUEUED_FOR_MONEY_TRANSFER",
                    isActive: false,
                },
            });
        });

        return { message: "SUCCESS" };
    } catch (error) {
        return { message: "ERROR" };
    }
};
