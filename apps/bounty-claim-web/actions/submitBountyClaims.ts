"use server";

import { authOptions } from "@/lib/auth";
import { BountyDescriptionType } from "@repo/common";
import prisma from "@repo/database/client";
import { getServerSession } from "next-auth";

export const submitBountyClaims = async (_: unknown, formData: FormData) => {
    const session = await getServerSession(authOptions);

    const accountNumber = formData.get("acn") as string;
    const bountyData = session?.user.bounties[0] as BountyDescriptionType;

    const zapId = bountyData.zapId;
    const zapHitId = bountyData.id
    const githubUsername = bountyData.bountyReceiverUsername;
    const githubId = bountyData.bountyReceiverId;
    const bankCreds = accountNumber;
    const bountyAmount = bountyData.bountyAmount;

    try {
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
    } catch (error) {
        return "An error has occurred";
    }
};
