export type BountyClaimsType = {
    id: string;
    zapId: string;
    zapHitId: string;
    githubUsername: string;
    githubId: number;
    bankCreds: string;
    isSuccess: boolean;
    bountyAmount: number;
    createdAt: Date;
};
