export interface KanbanDataType {
  projectName: string;
  kanbanColumns: KanbanColumnType[];
}

export interface KanbanColumnType {
  columnId: number;
  title: string;
  cards: CardType[];
}

export interface CardType {
  id: number;
  tag?: TagType;
  description?: string;
}

export interface TagType {
  tagName: string;
  color: 'black' | 'blue' | 'purple';
}

export interface DraggedItemType {
  sourcecolumnId: number;
  cardId: number;
}
