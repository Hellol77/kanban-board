import { TagColorType } from '@/types/color';

export interface KanbanDataType {
  projectName: string;
  kanbanColumns: KanbanColumnType[];
}

export interface KanbanColumnType {
  columnId: string;
  title: string;
  cards: CardType[];
  indelible?: boolean;
}

export interface CardType {
  id: string;
  tag?: TagType;
  description?: string;
}

export interface TagType {
  tagName: string;
  color: TagColorType;
}

export interface DraggedItemType {
  sourceColumnId: string;
  cardId: string;
  sourceIndex: number;
}
