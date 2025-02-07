import { ReactNode } from 'react';
import styled from 'styled-components';

interface HeaderProps {
  logo: ReactNode;
  profile: ReactNode;
}

const S = {
  Header: styled.header`
    width: 100%;
    height: 8.8rem;
    background-color: ${({ theme }) => theme.colors.white[100]};
    min-width: 32rem;
  `,

  Wrapper: styled.div`
    max-width: 120rem;
    margin: 0 auto;
    display: flex;
    padding: 0 1rem;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  `,
};

const Header = ({ logo, profile }: HeaderProps) => {
  return (
    <S.Header>
      <S.Wrapper>
        {logo}
        {profile}
      </S.Wrapper>
    </S.Header>
  );
};

export default Header;
