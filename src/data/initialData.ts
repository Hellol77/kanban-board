import { KanbanDataType } from '@/types/kanban';

const INITIAL_DATA: KanbanDataType = {
  projectName: 'Project No.1',
  kanbanList: [
    {
      listId: 1,
      title: '시작 전',
      cards: [],
    },
    {
      listId: 2,
      title: '진행 중',
      cards: [],
    },
    {
      listId: 3,
      title: '완료',
      cards: [],
    },
  ],
};

export default INITIAL_DATA;
