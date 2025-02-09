import { TagColorType } from '@/types/color';
import { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface CircleProps extends HTMLAttributes<HTMLDivElement> {
  color: TagColorType;
}

const colorMap = {
  purple: css`
    background-color: ${({ theme }) => theme.colors.purple[200]};
  `,
  black: css`
    background-color: ${({ theme }) => theme.colors.black.text1};
  `,
  blue: css`
    background-color: ${({ theme }) => theme.colors.blue[200]};
  `,
};

const S = {
  Circle: styled.div<CircleProps>`
    border: 2px solid ${({ theme }) => theme.colors.white[100]};
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;
    ${({ color }) => colorMap[color] || colorMap.black}
    &:hover {
      opacity: 0.8;
    }
  `,
};

const Circle = ({ color, ...props }: CircleProps) => {
  return <S.Circle {...props} color={color} />;
};

export default Circle;
