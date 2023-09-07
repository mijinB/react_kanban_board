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
        "TO DO": [],
        DOING: [],
        DONE: [],
    },
});
