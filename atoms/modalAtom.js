import { atom } from "recoil";

export const modalState = atom({
    key: "modelState",
    default: false,
});

export const postIdState = atom({
    key: "postIdState",
    default: "",
});
