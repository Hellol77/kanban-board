import { ReactNode } from 'react';
import styled from 'styled-components';

const S = {
  Layout: styled.div`
    width: 100%;
  `,
  Wrapper: styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  `,
};
const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <S.Layout>
      <S.Wrapper>{children}</S.Wrapper>
    </S.Layout>
  );
};

export default PageLayout;
