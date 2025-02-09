import { KanbanDataType } from '@/types/kanban';
import { v4 as uuidv4 } from 'uuid';

const INITIAL_DATA: KanbanDataType = {
  projectName: 'Project No.1',
  kanbanColumns: [
    {
      columnId: uuidv4(),
      title: '시작 전',
      cards: [],
      indelible: true,
    },
    {
      columnId: uuidv4(),
      title: '진행 중',
      cards: [],
      indelible: true,
    },
    {
      columnId: uuidv4(),
      title: '완료',
      cards: [],
      indelible: true,
    },
  ],
};

export default INITIAL_DATA;
