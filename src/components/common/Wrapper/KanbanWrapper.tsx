import { ReactNode } from 'react';
import styled from 'styled-components';

const S = {
  Wrapper: styled.div`
    max-width: 80rem;
    height: 100vh;
    margin: 0 auto;
  `,
};

const KanbanWrapper = ({ children }: { children: ReactNode }) => {
  return <S.Wrapper>{children}</S.Wrapper>;
};

export default KanbanWrapper;
