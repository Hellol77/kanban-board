import { KanbanDataType } from '@/types/kanban';

const initialData: KanbanDataType = {
  projectName: 'Project No.1',
  kanbanList: [
    {
      listId: 1,
      title: '시작 전',
      cards: [
        {
          id: 1,
          tag: { tagName: 'tag1', color: 'black' },
          description: '안녕하세요ㅕㅇ창ㄴㅊㅇ너 안그애라얼',
        },
        { id: 2, tag: { tagName: 'tag1', color: 'black' }, description: 'description2' },
        { id: 3, tag: { tagName: 'tag1', color: 'black' }, description: 'description3' },
      ],
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

export default initialData;
