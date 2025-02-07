import { ReactNode } from 'react';
import styled from 'styled-components';

const S = {
  Wrapper: styled.div`
    width: 100%;
    max-width: 120rem;
    margin: 0 auto;
  `,
};

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return <S.Wrapper>{children}</S.Wrapper>;
};

export default ContentWrapper;
