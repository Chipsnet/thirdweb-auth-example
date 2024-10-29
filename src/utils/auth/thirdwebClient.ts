import { createThirdwebClient } from "thirdweb";
import { env } from "../env";
import { createWallet, inAppWallet } from "thirdweb/wallets";

export const getThirdwebClient = () => {
    return createThirdwebClient({
        clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
    });
};

export const getThirdwebConfig = () => {
    const wallets = [
        inAppWallet({
            auth: {
                options: ["email"],
            },
        }),
        createWallet("io.metamask"),
        createWallet("com.coinbase.wallet"),
        createWallet("walletConnect"),
    ];

    const appMetadata = {
        name: "example app",
        url: "https://example.com",
        description: "example app description",
    };

    return {
        wallets,
        appMetadata,
    };
};
