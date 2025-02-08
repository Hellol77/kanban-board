import { KanbanWrapper, TextInput } from '@/components/common';
import { useState } from 'react';

const KanbanList = () => {
  const [data, setData] = useState({
    projectName: 'Project No.1',
    kanbanList: [
      { id: 0, title: '시작 전', cards: [] },
      { id: 1, title: '진행 중', cards: [] },
      { id: 2, title: '완료', cards: [] },
    ],
  });

  const onChangeProjectName = (value: string) => setData((prev) => ({ ...prev, projectName: value }));

  return (
    <KanbanWrapper>
      <TextInput value={data.projectName} onChangeValue={onChangeProjectName} />
    </KanbanWrapper>
  );
};

export default KanbanList;
