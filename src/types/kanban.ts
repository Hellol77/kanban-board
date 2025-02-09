import { TagColorType } from '@/types/color';

export interface KanbanDataType {
  projectName: string;
  kanbanColumns: KanbanColumnType[];
}

export interface KanbanColumnType {
  columnId: number;
  title: string;
  cards: CardType[];
  indelible?: boolean;
}

export interface CardType {
  id: number;
  tag?: TagType;
  description?: string;
}

export interface TagType {
  tagName: string;
  color: TagColorType;
}

export interface DraggedItemType {
  sourcecolumnId: number;
  cardId: number;
}
