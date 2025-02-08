import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

type VariantType = 'h1' | 'h2' | 'profile' | 'body1' | 'body2' | 'sub';
type ColorType = 'black' | 'gray' | 'white' | 'purple' | 'profileBlack';
interface TextSpanProps {
  variant?: VariantType;
  color?: ColorType;
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
  body1: css`
    font-size: ${({ theme }) => theme.fontSizes.body1};
    font-weight: 400;
  `,
  body2: css`
    font-size: ${({ theme }) => theme.fontSizes.body2};
    font-weight: 500;
  `,
  sub: css`
    font-size: ${({ theme }) => theme.fontSizes.sub};
    font-weight: 500;
  `,
  profile: css`
    font-size: ${({ theme }) => theme.fontSizes.body1};
    font-weight: 600;
  `,
};

const colorMap = {
  black: css`
    color: ${({ theme }) => theme.colors.black.text1};
  `,
  profileBlack: css`
    color: ${({ theme }) => theme.colors.black[200]};
  `,
  gray: css`
    color: ${({ theme }) => theme.colors.gray.text1};
  `,
  white: css`
    color: ${({ theme }) => theme.colors.white[100]};
  `,
  purple: css`
    color: ${({ theme }) => theme.colors.purple[200]};
  `,
};

const TextSpan = styled.span<TextSpanProps>`
  ${({ variant = 'body1', color = 'black' }) => css`
    ${variantMap[variant] || variantMap.body1}
    ${colorMap[color] || colorMap.black}
  `}
`;

const Text = ({ children, variant, color }: { children: ReactNode; variant?: VariantType; color?: ColorType }) => {
  return (
    <TextSpan variant={variant} color={color}>
      {children}
    </TextSpan>
  );
};

export default Text;
