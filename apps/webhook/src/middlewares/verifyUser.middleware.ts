import prisma from "@repo/database/client";
import { NextFunction, Request, Response } from "express";

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    const zapId = req.params.zapId;
    const bountyGiverId = req.body.sender.id;

    const zap = await prisma.zaps.findFirst({
        where: {
            id: zapId,
        },
    });

    if (bountyGiverId == zap?.githubId) {
        return next();
    }

    const whiteList = await prisma.whiteList.findFirst({
        where: {
            zapId: zapId,
        },
        select: {
            githubId: true,
        },
    });

    if (whiteList?.githubId.includes(bountyGiverId)) {
        return next();
    }

    res.status(403).json({ message: "Unauthorized user" });
};

export { verifyUser };
