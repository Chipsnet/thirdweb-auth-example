import { useAuth } from "@/providers/Auth";
import { Button } from "@nextui-org/react";
import { useActiveWallet } from "thirdweb/react";

export default function Home() {
    const { connectWallet, isModalConnecting } = useAuth();
    const wallet = useActiveWallet();

    return (
        <>
            <Button isLoading={isModalConnecting} onPress={connectWallet}>
                Sign in with Thirdweb
            </Button>
            <p>status: {wallet ? "true" : "false"}</p>
        </>
    );
}
