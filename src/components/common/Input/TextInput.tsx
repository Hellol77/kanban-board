import { InputHTMLAttributes, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

type VariantType = 'h1' | 'h2';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: VariantType;
  value: string;
}

interface VariantProps {
  variant?: VariantType;
}

const variantMap = {
  h1: css`
    font-size: ${({ theme }) => theme.fontSizes.h1};
    font-weight: 600;
    width: 100%;
  `,
  h2: css`
    font-size: ${({ theme }) => theme.fontSizes.h2};
    font-weight: 600;
    max-width: 12rem;
  `,
};

const S = {
  Input: styled.input<VariantProps>`
    width: 100%;
    min-width: 7rem;
    padding: 2px;
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

const TextInput = ({ variant, value, ...props }: TextInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (variant === 'h1') {
      return;
    }

    if (inputRef.current && value === '') {
      return;
    }
    if (inputRef.current) {
      const newWidth = value.length + 3;
      inputRef.current.style.width = `${Math.min(Math.max(newWidth, 7), inputRef.current.parentElement?.offsetWidth || 12)}rem`;
    }
  }, [value, variant]);

  return <S.Input {...props} ref={inputRef} value={value} type='text' variant={variant} />;
};

export default TextInput;
