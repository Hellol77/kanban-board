import { ReactNode } from 'react';
import styled from 'styled-components';

const S = {
  Wrapper: styled.div`
    max-width: 90rem;
    padding: 0 5rem;
    height: 100vh;
    margin: 6.4rem auto;
    @media screen and (max-width: 768px) {
      padding: 0 1.2rem;
      margin: 2rem auto;
    }
  `,
};

const KanbanWrapper = ({ children }: { children: ReactNode }) => {
  return <S.Wrapper>{children}</S.Wrapper>;
};

export default KanbanWrapper;
