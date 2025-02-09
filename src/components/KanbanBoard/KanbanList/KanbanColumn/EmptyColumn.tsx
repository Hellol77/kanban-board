import { Button, Text } from '@/components/common';
import styled from 'styled-components';
import PlusIcon from '@/assets/plus.svg?react';
import { useContext } from 'react';
import { KanbanActionsContext } from '@/components/KanbanBoard/KanbanContext';
import { v4 as uuidv4 } from 'uuid';

interface EmptyColumnProps {
  columnId: string;
}

const S = {
  ListEmptyItem: styled.article`
    display: flex;
    flex-direction: column;
    padding: 2rem 1.8rem;
    height: 11rem;
    background-color: ${({ theme }) => theme.colors.white[100]};
    justify-content: center;
    border-radius: 10px;
    gap: 1.3rem;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSizes.body1};
    color: ${({ theme }) => theme.colors.gray.text1};
  `,
};

const EmptyColumn = ({ columnId }: EmptyColumnProps) => {
  const { setData } = useContext(KanbanActionsContext);

  const onClickAddCard = (columnId: string) => {
    setData((prev) => ({
      ...prev,
      kanbanColumns: prev.kanbanColumns.map((column) =>
        column.columnId === columnId
          ? {
              ...column,
              cards: [
                ...column.cards,
                {
                  id: uuidv4(),
                  tag: { tagName: '무제', color: 'black' },
                  description: '',
                },
              ],
            }
          : column,
      ),
    }));
  };

  return (
    <S.ListEmptyItem>
      <Text color='gray' variant='sub'>
        지금 바로 추가해보세요.
      </Text>
      <Button onClick={() => onClickAddCard(columnId)} icon={<PlusIcon />} aria-label='카드 추가' />
    </S.ListEmptyItem>
  );
};

export default EmptyColumn;
