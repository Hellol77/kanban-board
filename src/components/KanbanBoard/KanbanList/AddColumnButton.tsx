import { Button } from '@/components/common';
import { KanbanActionsContext } from '@/components/KanbanBoard/KanbanContext';
import { useContext } from 'react';
import PlusIcon from '@/assets/plus.svg?react';

const AddColumnButton = () => {
  const { setData } = useContext(KanbanActionsContext);
  const onClickAddColumn = () => {
    setData((prev) => ({
      ...prev,
      kanbanColumns: [
        ...prev.kanbanColumns,
        {
          columnId: prev.kanbanColumns.length + 1,
          title: '무제',
          cards: [],
        },
      ],
    }));
  };
  return (
    <Button onClick={() => onClickAddColumn()} icon={<PlusIcon />} aria-label='칼럼 추가' text='Add another list' />
  );
};

export default AddColumnButton;
