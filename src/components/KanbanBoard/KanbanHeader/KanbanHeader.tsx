import { TextInput } from '@/components/common';
import { KanbanActionsContext } from '@/components/KanbanBoard/KanbanContext';
import { useContext } from 'react';

interface KanbanHeaderProps {
  projectName: string;
}

const KanbanHeader = ({ projectName }: KanbanHeaderProps) => {
  const { setData } = useContext(KanbanActionsContext);
  const onChangeProjectName = (value: string) => {
    setData((prev) => ({ ...prev, projectName: value }));
  };

  return (
    <TextInput
      role='heading'
      aria-label='프로젝트 제목'
      aria-level={1}
      variant='h1'
      value={projectName}
      placeholder='프로젝트 제목을 입력해주세요.'
      onChange={(e) => onChangeProjectName(e.target.value)}
    />
  );
};
export default KanbanHeader;
