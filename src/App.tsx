import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    max-width: 680px;
    margin: 0 auto;
`;

const Boards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    width: 100%;
    min-height: 200px;
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
        /* setToDos((prevToDos) => {
            const copyToDos = [...prevToDos];
            copyToDos.splice(source.index, 1);
            copyToDos.splice(destination?.index, 0, draggableId);

            return copyToDos;
        }); */
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
