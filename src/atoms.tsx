import { atom } from "recoil";

export interface IToDo {
    id: number;
    text: string;
}

export interface IToDoState {
    [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
    key: "toDos",
    default: {
        "TO DO": [
            { id: 1, text: "hello" },
            { id: 2, text: "hi" },
        ],
        DOING: [],
        DONE: [],
    },
});
