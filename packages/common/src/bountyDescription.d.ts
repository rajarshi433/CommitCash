export type BountyDescriptionType = {
    id: string;
    zapId: string;
    zapOwnerId: string;
    bountyGiverUsername: string;
    bountyGiverId: number;
    bountyReceiverUsername: string;
    bountyReceiverId: number;
    bountyAmount: number;
    status: string;
    commentLink: string;
    createdAt: Date;
    isActive: boolean;
};