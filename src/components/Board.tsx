import { Droppable } from "@hello-pangea/dnd";
import DraggableCard from "./DraggableCard";
import { styled } from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    min-height: 300px;
    padding: 10px 10px 20px;
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
    background-color: ${(props) =>
        props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "#74b9ff"};
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
    return (
        <Wrapper>
            <Title>{boardId}</Title>
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
