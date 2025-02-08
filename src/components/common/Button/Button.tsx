import { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  text?: string;
}

const S = {
  Button: styled.button`
    padding: 0.8rem 1.6rem;
    border: none;
    border-radius: 3rem;
    background-color: ${({ theme }) => theme.colors.buttonBackGround};
    color: ${({ theme }) => theme.colors.gray.text1};
    font-size: ${({ theme }) => theme.fontSizes.body2};
    font-weight: 500;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.colors.white[300]};
    }
  `,
};

const Button = ({ text, icon, ...props }: ButtonProps) => {
  return (
    <S.Button {...props}>
      {icon}
      {text}
    </S.Button>
  );
};

export default Button;
