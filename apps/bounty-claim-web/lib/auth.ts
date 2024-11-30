import prisma from "@repo/database/client";
import { Account, NextAuthOptions, Profile, Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import GitHubProvider from "next-auth/providers/github";
import { BountyDescriptionType } from "@repo/common";

declare module "next-auth" {
    interface Profile {
        id: string;
    }

    interface User {
        bounties: BountyDescriptionType[];
    }

    interface Session {
        user: {
            bounties: BountyDescriptionType[];
        };
    }

    interface JWT {
        token: {
            bounties: BountyDescriptionType[];
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
        error: "/unauthorised",
    },
    callbacks: {
        async signIn({
            user,
            account,
            profile,
        }: {
            user: User | AdapterUser;
            account: Account | null;
            profile?: Profile | undefined;
        }): Promise<string | boolean> {
            if (account?.provider == "github") {
                const githubId = Number(profile?.id);

                const bounties = await prisma.zapHit.findMany({
                    where: {
                        bountyReceiverId: githubId,
                        isActive: true,
                        status: "WAITING_TO_CLAIM",
                    },
                });

                if (bounties.length < 1) {
                    return false;
                }

                user.bounties = bounties;
                return true;
            }
            return false;
        },

        async jwt({ token, user }: { token: JWT; user: User | AdapterUser }) {
            if (user?.bounties) {
                token.bounties = user.bounties;
            }
            return token;
        },

        async session({ session, token }: { session: Session; token: JWT }) {
            if (token.bounties) {
                session.user.bounties =
                    token.bounties as BountyDescriptionType[];
            }
            return session;
        },
    },
};
