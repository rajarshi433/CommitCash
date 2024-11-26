import { Button } from "@/components/ui/button";
import prisma from "@repo/database/client";

const Home = async () => {
    const users = await prisma.user.findMany();
    return (
        <div>
            <Button variant="destructive" className="bg-green-900 text-white">
                Click me
            </Button>

            <div>
                {users.map((user) => (
                    <ul key={user.id}>
                        <li>{user.id}</li>
                        <li>{user.name}</li>
                        <li>{user.email}</li>
                        <li>{user.provider}</li>
                    </ul>
                ))}
            </div>
        </div>
    );
};

export default Home;
