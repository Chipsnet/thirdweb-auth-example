import { Spinner } from "@nextui-org/react";

type Props = {
    title: string;
};

export default function FullScreenLoader(props: Props) {
    const { title } = props;

    return (
        <div
            className="fixed w-screen h-screen"
            style={{
                zIndex: 99999,
            }}
        >
            <div className="max-w-screen-sm mx-auto h-screen backdrop-blur-sm flex items-center justify-center">
                <div className="bg-white rounded-lg p-14 flex flex-col gap-4 items-center">
                    <Spinner size="lg" />
                    <p className="font-bold">{title}</p>
                </div>
            </div>
        </div>
    );
}
