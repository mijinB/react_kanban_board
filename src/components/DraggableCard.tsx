import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { styled } from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    background-color: ${(props) => (props.isDragging ? "#ffdd59" : props.theme.cardColor)};
    box-shadow: ${(props) => (props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.2)" : "none")};
`;

interface IDraggableCardProps {
    toDo: string;
    index: number;
}

function DraggableCard({ toDo, index }: IDraggableCardProps) {
    return (
        <Draggable key={toDo} draggableId={toDo} index={index}>
            {(magic, info) => (
                <Card
                    ref={magic.innerRef}
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}
                    isDragging={info.isDragging}
                >
                    {toDo}
                </Card>
            )}
        </Draggable>
    );
}

export default React.memo(DraggableCard);
