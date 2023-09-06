import { atom } from "recoil";

export interface IToDoState {
    [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
    key: "toDos",
    default: {
        "TO DO": ["a", "b"],
        DOING: ["c", "d", "e"],
        DONE: ["f"],
    },
});
