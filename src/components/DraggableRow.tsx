import React, { useRef } from "react";
import type { Identifier, XYCoord } from "dnd-core";
import { useDrag, useDrop } from "react-dnd";

export interface RowProps {
  id: string;
  rowData: React.ReactElement[];
  index: number;
  moveRow: (dragIndex: any, hoverIndex: any) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

function DraggableRow({ id, rowData, index, moveRow }: RowProps) {
  const ref = useRef<HTMLTableRowElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "row",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "row",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <tr
      ref={ref}
      style={{ cursor: "move", opacity }}
      data-handler-id={handlerId}
    >
      {rowData.map((data, i) => (
        <td key={i}>{data}</td>
      ))}
    </tr>
  );
}

export default DraggableRow;
