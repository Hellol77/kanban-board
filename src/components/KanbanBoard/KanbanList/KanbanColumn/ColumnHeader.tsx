import { TextInput, Badge, Button } from '@/components/common';
import styled from 'styled-components';
import PlusIcon from '@/assets/plus.svg?react';
import XIcon from '@/assets/x.svg?react';
import { KanbanDataType, KanbanColumnType } from '@/types/kanban';
import { Dispatch, SetStateAction } from 'react';

interface ColumnHeaderProps {
  column: KanbanColumnType;
  setData: Dispatch<SetStateAction<KanbanDataType>>;
}

const S = {
  ListTitle: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  ListTitleWrapper: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 100%;
  `,
};

const ColumnHeader = ({ column, setData }: ColumnHeaderProps) => {
  const onClickDeleteColumn = (columnId: number) => {
    setData((prev) => ({
      ...prev,
      kanbanColumns: prev.kanbanColumns.filter((column) => column.columnId !== columnId),
    }));
  };

  const onChangeColumnTitle = (value: string, id: number) => {
    setData((prev) => ({
      ...prev,
      kanbanColumns: prev.kanbanColumns.map((column) =>
        column.columnId === id ? { ...column, title: value } : column,
      ),
    }));
  };

  const onClickAddCard = (columnId: number) => {
    setData((prev) => ({
      ...prev,
      kanbanColumns: prev.kanbanColumns.map((column) =>
        column.columnId === columnId
          ? {
              ...column,
              cards: [
                ...column.cards,
                {
                  id: column.cards.length + 1,
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
    <S.ListTitle>
      <S.ListTitleWrapper>
        <TextInput
          variant='h2'
          role='heading'
          aria-label='컬럼 제목'
          aria-level={2}
          value={column.title}
          placeholder='무제'
          onChange={(e) => onChangeColumnTitle(e.target.value, column.columnId)}
        />
        {column.cards.length !== 0 && <Badge count={column.cards.length} />}
      </S.ListTitleWrapper>
      {column.cards.length !== 0 && (
        <Button onClick={() => onClickAddCard(column.columnId)} icon={<PlusIcon />} aria-label='카드 추가' />
      )}
      {column.cards.length === 0 && column.columnId > 3 && (
        <Button
          onClick={() => onClickDeleteColumn(column.columnId)}
          icon={<XIcon width={16} />}
          aria-label='컬럼 삭제'
        />
      )}
    </S.ListTitle>
  );
};
export default ColumnHeader;
