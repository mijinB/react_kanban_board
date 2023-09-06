import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { IToDoState, toDoState } from "./atoms";
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
     * 1. event로 draggableId(위치를 변경할 item)와 source(기존 위치에 대한 data), destination(변경할 위치에 대한 data)을 인자로 받고
     * 2. destination의 유무 확인 후 없으면 아무것도 return하지 않고 함수 종료(제자리에 드롭했을 경우를 위함)
     * 3. (setToDos 사용)_기존 toDos object를 copyToDos 변수에 복사하고 아래 5,6으로 수정
     * 5. 드래그한 board 위치에 있는 item 삭제
     * 6. 드롭한 board 위치로 드래그한 item 삽입
     * 7. 수정한 copyToDos를 toDos object로 return
     */
    const onDragEnd = ({ draggableId, source, destination }: DropResult) => {
        if (!destination) return;
        setToDos((allBoards) => {
            const copyToDos: IToDoState = {};

            Object.keys(allBoards).map((toDoKey) => (copyToDos[toDoKey] = [...allBoards[toDoKey]]));

            copyToDos[source.droppableId].splice(source.index, 1);
            copyToDos[destination.droppableId].splice(destination.index, 0, draggableId);

            return copyToDos;
        });
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
