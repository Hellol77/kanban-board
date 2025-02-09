import { Button } from '@/components/common';
import { KanbanContext } from '@/components/KanbanBoard/KanbanContext';
import { useContext } from 'react';
import { styled } from 'styled-components';
import PlusIcon from '@/assets/plus.svg?react';

const S = {
  AddListWrapper: styled.div`
    flex-shrink: 0;
  `,
};

const AddColumnButton = () => {
  const { setData } = useContext(KanbanContext);
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
    <S.AddListWrapper>
      <Button onClick={() => onClickAddColumn()} icon={<PlusIcon />} aria-label='칼럼 추가' text='Add another list' />
    </S.AddListWrapper>
  );
};

export default AddColumnButton;
