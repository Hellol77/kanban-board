import { TextareaHTMLAttributes, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface TextAreaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
}

const S = {
  TextArea: styled.textarea`
    font-size: ${({ theme }) => theme.fontSizes.body1};
    color: ${({ theme }) => theme.colors.black.text1};
    font-weight: 400;
    height: 4rem;
    border-radius: 4px;
    &:hover {
      background-color: ${({ theme }) => theme.colors.gray[100]};
    }
    &:focus {
      outline: none;
    }
    border: none;
    resize: none;
  `,
};

const TextAreaInput = ({ value, ...props }: TextAreaInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return <S.TextArea value={value} ref={textareaRef} {...props} />;
};

export default TextAreaInput;
