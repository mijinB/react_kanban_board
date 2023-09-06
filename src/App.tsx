import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { styled } from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    max-width: 480px;
    margin: 0 auto;
`;

const Boards = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    min-height: 200px;
`;

const Board = styled.div`
    padding: 30px 10px 20px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.boardColor};
`;

const Card = styled.div`
    padding: 5px 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.cardColor};
`;

const toDos = ["a", "b", "c", "d", "e", "f"];

function App() {
    const onDragEnd = () => {};

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    <Droppable droppableId="one">
                        {(magic) => (
                            <Board ref={magic.innerRef} {...magic.droppableProps}>
                                {toDos.map((toDo, index) => (
                                    <Draggable key={index} draggableId={toDo} index={index}>
                                        {(magic) => (
                                            <Card
                                                ref={magic.innerRef}
                                                {...magic.dragHandleProps}
                                                {...magic.draggableProps}
                                            >
                                                {toDo}
                                            </Card>
                                        )}
                                    </Draggable>
                                ))}
                                {magic.placeholder}
                            </Board>
                        )}
                    </Droppable>
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;
