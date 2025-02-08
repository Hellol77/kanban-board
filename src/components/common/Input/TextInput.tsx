import styled, { css } from 'styled-components';

type VariantType = 'h1' | 'h2';

interface TextInputProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChangeValue: (value: string) => void;
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
    &:hover {
      background-color: ${({ theme }) => theme.colors.white[300]};
    }
    border: none;
    border-radius: 0.8rem;
    background-color: transparent;
    ${({ variant = 'h1' }) => variantMap[variant] || variantMap.h1}
    &:focus {
      outline: none;
    }
  `,
};

const TextInput = ({ value, onChangeValue }: TextInputProps) => {
  return (
    <S.Input
      type='text'
      placeholder='프로젝트 제목을 입력해주세요'
      value={value}
      onChange={(e) => onChangeValue(e.target.value)}
    />
  );
};

export default TextInput;
