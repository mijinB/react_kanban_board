import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { styled } from "styled-components";

const Card = styled.div`
    padding: 5px 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.cardColor};
`;

interface IDraggableCardProps {
    toDo: string;
    index: number;
}

function DraggableCard({ toDo, index }: IDraggableCardProps) {
    return (
        <Draggable key={toDo} draggableId={toDo} index={index}>
            {(magic) => (
                <Card ref={magic.innerRef} {...magic.dragHandleProps} {...magic.draggableProps}>
                    {toDo}
                </Card>
            )}
        </Draggable>
    );
}

export default React.memo(DraggableCard);
