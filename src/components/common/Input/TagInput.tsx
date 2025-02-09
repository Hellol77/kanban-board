import { TagColorType } from '@/types/color';
import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

interface TagInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  color: TagColorType;
}

interface TagStyleProps {
  width: number;
  color: TagColorType;
}

const colorMap = {
  purple: css`
    color: ${({ theme }) => theme.colors.purple[200]};
    background-color: ${({ theme }) => theme.colors.purple[100]};
  `,
  black: css`
    color: ${({ theme }) => theme.colors.black.text1};
    background-color: ${({ theme }) => theme.colors.gray[100]};
  `,
  blue: css`
    color: ${({ theme }) => theme.colors.blue[200]};
    background-color: ${({ theme }) => theme.colors.blue[100]};
  `,
};

const S = {
  Container: styled.div`
    position: relative;
    display: inline-flex;
    width: fit-content;
    max-width: 100%;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-radius: 4px;
    padding: 0.1rem 0.8rem;
  `,
  Tag: styled.input<TagStyleProps>`
    font-size: ${({ theme }) => theme.fontSizes.body1};
    font-weight: 600;
    border: none;
    outline: none;
    width: ${({ width }) => `${width}px`};
    background-color: transparent;
    text-align: center;
    min-width: 2rem;
    ${({ color }) => colorMap[color] || colorMap.black}
  `,
  HiddenText: styled.span`
    font-size: ${({ theme }) => theme.fontSizes.body1};
    font-weight: 600;
    visibility: hidden;
    white-space: pre;
    position: absolute;
  `,
};

const TagInput = ({ value, ...props }: TagInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState(20);
  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth + 16);
    }
  }, [value]);

  return (
    <S.Container>
      <S.HiddenText ref={spanRef}>{value || ' '}</S.HiddenText>
      <S.Tag ref={inputRef} {...props} value={value} width={inputWidth} />
    </S.Container>
  );
};

export default TagInput;
