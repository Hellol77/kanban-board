import { DraggedItemType, KanbanDataType } from '@/types/kanban';
import { createContext, Dispatch, SetStateAction } from 'react';

export const KanbanContext = createContext<{
  setData: Dispatch<SetStateAction<KanbanDataType>>;
  setDraggedItem: Dispatch<SetStateAction<DraggedItemType | null>>;
  draggedItem: DraggedItemType | null;
}>({ setData: () => {}, setDraggedItem: () => {}, draggedItem: null });
