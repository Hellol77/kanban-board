import { DraggedItemType, KanbanDataType } from '@/types/kanban';
import { createContext, Dispatch, SetStateAction } from 'react';

export const KanbanDataContext = createContext<{
  draggedItem: DraggedItemType | null;
}>({
  draggedItem: null,
});

export const KanbanActionsContext = createContext<{
  setData: Dispatch<SetStateAction<KanbanDataType>>;
  setDraggedItem: Dispatch<SetStateAction<DraggedItemType | null>>;
}>({
  setData: () => {},
  setDraggedItem: () => {},
});
