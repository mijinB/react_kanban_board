import { Droppable } from "@hello-pangea/dnd";
import DraggableCard from "./DraggableCard";
import { styled } from "styled-components";
import { useRef } from "react";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    min-height: 300px;
    padding-top: 10px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.boardColor};
`;

const Title = styled.h2`
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
`;

const Area = styled.div<IAreaProps>`
    flex-grow: 1;
    padding: 20px;
    background-color: ${(props) =>
        props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent"};
    transition: background-color 0.3s ease-in-out;
`;

interface IBoardProps {
    toDos: string[];
    boardId: string;
}

interface IAreaProps {
    isDraggingOver: boolean;
    isDraggingFromThis: boolean;
}

function Board({ boardId, toDos }: IBoardProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    /**@function onClick
     * 1. 참조 중인 input에 focus 주기
     */
    const onClick = () => {
        inputRef.current?.focus();
    };

    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <input ref={inputRef} placeholder="grab me" />
            <button onClick={onClick}>click me</button>
            <Droppable droppableId={boardId}>
                {(magic, info) => (
                    <Area
                        ref={magic.innerRef}
                        {...magic.droppableProps}
                        isDraggingOver={info.isDraggingOver}
                        isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                    >
                        {toDos.map((toDo, index) => (
                            <DraggableCard key={toDo} toDo={toDo} index={index} />
                        ))}
                        {magic.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    );
}

export default Board;
