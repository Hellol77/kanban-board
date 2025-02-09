import styled from 'styled-components';

interface BadgeProps {
  count: number;
}

const S = {
  Badge: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.fontSizes.body2};
    color: ${({ theme }) => theme.colors.gray[200]};
    font-weight: 600;
    border-radius: 30px;
    background-color: ${({ theme }) => theme.colors.buttonBackGround};
    height: fit-content;
    padding: 0.4rem 0.8rem;
  `,
};

const Badge = ({ count }: BadgeProps) => {
  return <S.Badge>{count}</S.Badge>;
};

export default Badge;
