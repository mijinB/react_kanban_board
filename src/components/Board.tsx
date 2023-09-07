import { Droppable } from "@hello-pangea/dnd";
import DraggableCard from "./DraggableCard";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { IToDo } from "../atoms";

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
        props.$isDraggingOver ? "#dfe6e9" : props.$isDraggingFromThis ? "#b2bec3" : "transparent"};
    transition: background-color 0.3s ease-in-out;
`;

const Form = styled.form`
    width: 100%;
    input {
        width: 100%;
    }
`;

interface IBoardProps {
    toDos: IToDo[];
    boardId: string;
}

interface IAreaProps {
    $isDraggingOver: boolean;
    $isDraggingFromThis: boolean;
}

interface IForm {
    toDo: string;
}

function Board({ boardId, toDos }: IBoardProps) {
    const { register, setValue, handleSubmit } = useForm<IForm>();

    /**@function onValid
     * 1. 인자로 받은 input의 data를 출력해서 확인
     * 2. input을 빈 값으로 초기화
     */
    const onValid = ({ toDo }: IForm) => {
        setValue("toDo", "");
    };

    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input {...register("toDo", { required: true })} type="text" placeholder={`Add task on ${boardId}`} />
            </Form>
            <Droppable droppableId={boardId}>
                {(magic, info) => (
                    <Area
                        ref={magic.innerRef}
                        {...magic.droppableProps}
                        $isDraggingOver={info.isDraggingOver}
                        $isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                    >
                        {toDos.map((toDo, index) => (
                            <DraggableCard key={toDo.id} toDoId={toDo.id} toDoText={toDo.text} index={index} />
                        ))}
                        {magic.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    );
}

export default Board;
