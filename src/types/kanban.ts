export interface KanbanDataType {
  projectName: string;
  kanbanList: KanbanListType[];
}

export interface KanbanListType {
  listId: number;
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
