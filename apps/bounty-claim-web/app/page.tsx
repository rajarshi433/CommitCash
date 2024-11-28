import Banner from "@/components/banner/Banner";
import GithubButton from "@/components/button/GithubButton";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Home = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className="flex flex-col justify-center items-center bg-[#1C1917] h-screen overflow-hidden">
            <Banner />
            <GithubButton />
            <div>
                {session ? (
                    <div className="text-white bg-green-700 p-2 rounded-md">
                        You have {session?.user.bounties.length} number of
                        bounties to claim 🎉
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Home;
