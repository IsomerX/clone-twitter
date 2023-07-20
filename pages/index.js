import Head from "next/head";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "../components/Login";
import Modal from "../components/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

export default function Home({ providers }) {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useRecoilState(modalState);

    if (!session) {
        return <Login providers={providers} />;
    }

    return (
        <div>
            <Head>
                <title>Twatter</title>
                <meta
                    name="description"
                    content="Twatter, made with love and code by Dhruv Bakshi (IsomerX)"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
                <Sidebar />
                <Feed />
                {isOpen && <Modal />}
            </main>
        </div>
    );
}

export async function getServerSideProps(context) {
    // const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    //     (res) => res.json()
    // );
    // const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    //     (res) => res.json()
    // );
    const providers = await getProviders();
    const session = await getSession(context);

    return {
        props: {
            // trendingResults,
            // followResults,
            providers,
            session,
        },
    };
}
