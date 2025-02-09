import { ReactNode } from 'react';
import styled from 'styled-components';

const S = {
  Wrapper: styled.div`
    max-width: 90rem;
    padding: 0 5rem;
    height: 100%;
    margin: 6.4rem auto;
    margin-bottom: 0;
    padding-bottom: 4rem;
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
