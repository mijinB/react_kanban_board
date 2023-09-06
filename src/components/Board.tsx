import { Droppable } from "@hello-pangea/dnd";
import DraggableCard from "./DraggableCard";
import { styled } from "styled-components";

const Wrapper = styled.div`
    padding: 30px 10px 20px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.boardColor};
`;

interface IBoardProps {
    toDos: string[];
    boardId: string;
}

function Board({ boardId, toDos }: IBoardProps) {
    return (
        <Droppable droppableId={boardId}>
            {(magic) => (
                <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
                    {toDos.map((toDo, index) => (
                        <DraggableCard key={toDo} toDo={toDo} index={index} />
                    ))}
                    {magic.placeholder}
                </Wrapper>
            )}
        </Droppable>
    );
}

export default Board;
