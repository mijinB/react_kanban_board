import { DragDropContext, Draggable, DropResult, Droppable } from "@hello-pangea/dnd";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { toDoState } from "./atoms";

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

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);

    /**@function onDragEnd
     * 1. event로 draggableId와 source, destination을 인자로 받고
     * 2. destination의 유무 확인 후 없으면 아무것도 return하지 않고 함수 종료(제자리에 드롭했을 경우를 위함)
     * 3. source.index(드래그한 item의 위치)에 있는 item 삭제
     * 4. destination.index(드롭한 item의 위치)에 draggableId(드래그한 item, 삭제했던 item) 삽입
     * 5. setToDos 사용해서 새로 생성한 List를 반환하여 toDos List 수정
     */
    const onDragEnd = ({ draggableId, source, destination }: DropResult) => {
        if (!destination) return;
        setToDos((prevToDos) => {
            const copyToDos = [...prevToDos];
            copyToDos.splice(source.index, 1);
            copyToDos.splice(destination?.index, 0, draggableId);

            return copyToDos;
        });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    <Droppable droppableId="one">
                        {(magic) => (
                            <Board ref={magic.innerRef} {...magic.droppableProps}>
                                {toDos.map((toDo, index) => (
                                    <Draggable key={toDo} draggableId={toDo} index={index}>
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
