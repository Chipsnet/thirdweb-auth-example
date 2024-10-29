import Layout from "@/components/layout/Layout";
import AuthProvider from "@/providers/Auth";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { ThirdwebProvider } from "thirdweb/react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThirdwebProvider>
            <QueryClientProvider client={queryClient}>
                <NextUIProvider>
                    <AuthProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </AuthProvider>
                </NextUIProvider>
                <Toaster />
            </QueryClientProvider>
        </ThirdwebProvider>
    );
}
