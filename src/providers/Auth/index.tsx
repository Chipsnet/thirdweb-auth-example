import FullScreenLoader from "@/components/common/loading/FullScreenLoader";
import {
    getThirdwebClient,
    getThirdwebConfig,
} from "@/utils/auth/thirdwebClient";
import { createContext, useContext, useEffect, useState } from "react";
import {
    AutoConnect,
    useActiveAccount,
    useConnectModal,
    useIsAutoConnecting,
} from "thirdweb/react";

type ContestType = {
    connectWallet: () => Promise<void>;
    getOrGenerateToken: () => Promise<string | undefined>;
    isModalConnecting: boolean;
    isSigning: boolean;
};

const AuthContext = createContext<ContestType>({
    connectWallet: async () => {},
    getOrGenerateToken: async () => "",
    isModalConnecting: false,
    isSigning: false,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const thirdwebClient = getThirdwebClient();
    const activeAccount = useActiveAccount();
    const isAuthConnecting = useIsAutoConnecting();
    const { wallets, appMetadata } = getThirdwebConfig();
    const { connect, isConnecting } = useConnectModal();
    const [isSigning] = useState(false);

    useEffect(() => {
        if (isAuthConnecting) {
            return;
        }

        if (activeAccount) {
            getOrGenerateToken();
        }
    }, [activeAccount, isAuthConnecting]);

    const connectWallet = async () => {
        await connect({
            wallets,
            client: thirdwebClient,
            appMetadata,
            showAllWallets: false,
        });
    };

    const getOrGenerateToken = async (): Promise<string | undefined> => {
        // generate token for backend

        return "example";
    };

    return (
        <AuthContext.Provider
            value={{
                connectWallet,
                isModalConnecting: isConnecting,
                getOrGenerateToken,
                isSigning,
            }}
        >
            <AutoConnect
                client={thirdwebClient}
                wallets={wallets}
                appMetadata={appMetadata}
            />
            {isSigning && <FullScreenLoader title="Waiting for signing..." />}
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
