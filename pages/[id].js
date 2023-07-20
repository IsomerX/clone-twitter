import Head from "next/head";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import { useRouter } from "next/router";
import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import { getProviders, getSession, useSession } from "next-auth/react";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { db } from "../firebase";
import Login from "../components/Login";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import Post from "../components/Post";
import Comment from "../components/comment";

const PostPoge = ({ providers }) => {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const { id } = useRouter().query;
    const [post, setPost] = useState();
    const router = useRouter();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        onSnapshot(doc(db, "posts", id), (snapshot) => {
            setPost(snapshot.data());
        });
    }, [id]);

    useEffect(() => {
        onSnapshot(
            query(
                collection(db, "posts", id, "comments"),
                orderBy("timestamp", "desc")
            ),
            (snapshot) => {
                setComments(snapshot.docs);
            }
        );
    }, [id]);

    if (!session) return <Login providers={providers} />;

    return (
        <div>
            <Head>
                <title>
                    {post?.username} on Twitter: {post?.text}{" "}
                </title>
                <meta
                    name="description"
                    content="Twatter, made with love and code by Dhruv Bakshi (IsomerX)"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
                <Sidebar />
                <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
                    <div
                        className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black"
                        onClick={() => router.push("/")}
                    >
                        <div className="hoverAnimation w-9 aspect-square flex items-center justify-center xl:px-0">
                            <ArrowLeftIcon className="h-5 text-white" />
                        </div>
                    </div>
                    <Post id={id} post={post} postPage={true} />
                    {comments.length > 0 && (
                        <div className="pb-72">
                            {comments.map((comment) => (
                                <Comment
                                    key={comment.id}
                                    id={comment.id}
                                    comment={comment.data()}
                                />
                            ))}
                        </div>
                    )}
                </div>
                {isOpen && <Modal />}
            </main>
        </div>
    );
};

export default PostPoge;

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
