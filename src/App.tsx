import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    max-width: 680px;
    margin: 0 auto;
`;

const Boards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    min-height: 200px;
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);

    /**@function onDragEnd
     * 1. event로 draggableId와 source, destination을 인자로 받고
     * 2. source(드래그), destination(드롭)이 서로 draggableId(해당 위치의 boardId)가 일치하면 아래 기능 수행, 일치하지 않는다면 아무것도 하지않고 함수 종료
     * 3. toDos의 3개 List 중에서 변화가 일어난 draggableId의 List만 복사해놓고
     * 4. source.index(드래그한 item의 위치)에 있는 item 삭제
     * 5. destination.index(드롭한 item의 위치)에 draggableId(드래그한 item, 삭제했던 item) 삽입
     * 6. toDos의 기존 3개 List에서 변화가 일어난 List만 수정하여 toDos Object 반환(setToDos)
     */
    const onDragEnd = ({ draggableId, source, destination }: DropResult) => {
        if (destination?.droppableId === source.droppableId) {
            setToDos((prevToDos) => {
                const boardCopy = [...prevToDos[source.droppableId]];
                boardCopy.splice(source.index, 1);
                boardCopy.splice(destination?.index, 0, draggableId);

                return { ...prevToDos, [source.droppableId]: boardCopy };
            });
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    {Object.keys(toDos).map((boardId) => (
                        <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
                    ))}
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;
