import { InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

type VariantType = 'h1' | 'h2';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: VariantType;
}

interface VariantProps {
  variant?: VariantType;
}

const variantMap = {
  h1: css`
    font-size: ${({ theme }) => theme.fontSizes.h1};
    font-weight: 600;
  `,
  h2: css`
    font-size: ${({ theme }) => theme.fontSizes.h2};
    font-weight: 600;
  `,
};

const S = {
  Input: styled.input<VariantProps>`
    width: 100%;
    padding: 8px;
    color: ${({ theme }) => theme.colors.black[100]};
    border: none;
    border-radius: 0.8rem;
    background-color: transparent;
    &:hover {
      background-color: ${({ theme }) => theme.colors.white[300]};
    }
    &:focus {
      outline: none;
    }
    ${({ variant = 'h1' }) => variantMap[variant] || variantMap.h1}
  `,
};

const TextInput = ({ variant, ...props }: TextInputProps) => {
  return <S.Input {...props} type='text' variant={variant} />;
};

export default TextInput;
