import Banner from "@/components/banner/Banner";
import GithubButton from "@/components/button/GithubButton";

const Home = async () => {
    return (
        <div className="flex flex-col justify-center items-center bg-[#1C1917] h-screen">
            <Banner />
            <GithubButton />
        </div>
    );
};

export default Home;
