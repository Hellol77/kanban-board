import { Button, KanbanWrapper, TextInput } from '@/components/common';
import { KanbanDataType } from '@/types/kanban';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlusIcon from '@/assets/plus.svg?react';
const S = {
  ListWrapper: styled.div`
    display: flex;
    overflow-x: auto;
    height: 100%;
    gap: 16px;
    width: 100%;
    max-width: calc(200px * 4 + 16px * 3);
  `,

  ListColumn: styled.section`
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    height: 11.2rem;
    flex: 0 0 20rem;
    border-radius: 8px;
    height: 100%;
    overflow-y: auto;
  `,

  ListTitle: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  ListItem: styled.article`
    background-color: ${({ theme }) => theme.colors.white[100]};
    padding: 2rem 1.8rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
  `,

  ListItemTag: styled.div`
    display: flex;
    width: fit-content;
    padding: 0.1rem 0.8rem;
    font-size: ${({ theme }) => theme.fontSizes.body1};
    font-weight: 600;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.gray[100]};
  `,

  ListItemDescription: styled.span`
    font-size: ${({ theme }) => theme.fontSizes.body1};
    color: ${({ theme }) => theme.colors.black.text1};
    font-weight: 400;
  `,
};

const initialData: KanbanDataType = {
  projectName: 'Project No.1',
  kanbanList: [
    {
      listId: 0,
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
  ],
};

const KanbanList = () => {
  const [data, setData] = useState<KanbanDataType>(() => {
    const localData = localStorage.getItem('kanban');
    return localData ? initialData : initialData;
  });

  useEffect(() => {
    localStorage.setItem('kanban', JSON.stringify(data));
  }, [data]);

  const onChangeProjectName = (value: string) => setData((prev) => ({ ...prev, projectName: value }));

  const onChangeListTitle = (value: string, id: number) => {
    setData((prev) => ({
      ...prev,
      kanbanList: prev.kanbanList.map((list) => (list.listId === id ? { ...list, title: value } : list)),
    }));
  };

  return (
    <KanbanWrapper>
      <TextInput
        role='heading'
        aria-label='프로젝트 제목'
        aria-level={1}
        variant='h1'
        value={data.projectName}
        placeholder='프로젝트 제목을 입력해주세요.'
        onChange={(e) => onChangeProjectName(e.target.value)}
      />
      <S.ListWrapper>
        {data.kanbanList.map((list) => (
          <S.ListColumn key={list.listId}>
            <S.ListTitle>
              <TextInput
                variant='h2'
                role='heading'
                aria-label='컬럼 제목'
                aria-level={2}
                value={list.title}
                placeholder='컬럼 제목을 입력해주세요.'
                onChange={(e) => onChangeListTitle(e.target.value, list.listId)}
              />
              {list.cards.length !== 0 && <Button icon={<PlusIcon />} aria-label='카드 추가' />}
            </S.ListTitle>
            {list.cards.map((card) => (
              <S.ListItem key={card.id}>
                <S.ListItemTag>{card.tag?.tagName}</S.ListItemTag>
                <S.ListItemDescription>{card.description}</S.ListItemDescription>
              </S.ListItem>
            ))}
          </S.ListColumn>
        ))}
      </S.ListWrapper>
    </KanbanWrapper>
  );
};

export default KanbanList;
