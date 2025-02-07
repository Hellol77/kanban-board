import { ReactNode } from 'react';
import styled from 'styled-components';

interface PageLayoutProps {
  children: ReactNode;
}

const S = {
  Layout: styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white[200]};
    height: 100vh;
  `,
};

const PageLayout = ({ children }: PageLayoutProps) => {
  return <S.Layout>{children}</S.Layout>;
};

export default PageLayout;
