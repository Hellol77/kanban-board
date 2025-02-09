import { KanbanWrapper } from '@/components/common';
import { KanbanContext } from '@/components/KanbanBoard/KanbanContext';
import KanbanHeader from '@/components/KanbanBoard/KanbanHeader/KanbanHeader';
import KanbanList from '@/components/KanbanBoard/KanbanList';
import INITIAL_DATA from '@/data/initialData';
import { KanbanDataType } from '@/types/kanban';
import { useState, useEffect } from 'react';

const KanbanBoard = () => {
  const [data, setData] = useState<KanbanDataType>(() => {
    const localData = localStorage.getItem('kanban');
    return localData ? JSON.parse(localData) : INITIAL_DATA;
  });
  const [draggedItem, setDraggedItem] = useState<{
    sourcecolumnId: number;
    cardId: number;
  } | null>(null);

  useEffect(() => {
    localStorage.setItem('kanban', JSON.stringify(data));
  }, [data]);

  return (
    <KanbanContext.Provider value={{ setData, setDraggedItem, draggedItem }}>
      <KanbanWrapper>
        <KanbanHeader projectName={data.projectName} />
        <KanbanList columns={data.kanbanColumns} />
      </KanbanWrapper>
    </KanbanContext.Provider>
  );
};

export default KanbanBoard;
