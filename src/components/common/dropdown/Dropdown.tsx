import { DropdownContext } from '@/components/common/dropdown/DropdownContext';
import useClickOutSide from '@/hooks/useClickOutside';
import { ReactNode, useContext, useRef, useState } from 'react';
import styled from 'styled-components';

interface DropdownProps {
  children: ReactNode;
}

const S = {
  DropdownWrapper: styled.nav`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    font-weight: 600;
    font-size: 1.4rem;
    position: relative;
  `,

  DropdownButton: styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 0;
  `,

  DropdownList: styled.ul`
    position: absolute;
    top: 3rem;
    right: 0;
    height: auto;
    width: 14rem;
    padding: 0;
    align-items: center;
    border-radius: 1rem;
    border: 2px solid ${({ theme }) => theme.colors.white[300]};
    background-color: ${({ theme }) => theme.colors.white[100]};
    display: inline-flex;
    flex-direction: column;
    z-index: 10;
    padding: 0.2rem;
  `,

  DropdownItem: styled.li`
    color: ${({ theme }) => theme.colors.text1};
    width: 100%;
    height: 100%;
    text-align: center;
    cursor: pointer;
    font-size: 1.6rem;
    border-radius: 1rem;
    color: ${({ theme }) => theme.colors.black.text2};
    font-weight: 500;
    padding: 1.2rem 0;
    border: 1px solid ${({ theme }) => theme.colors.white[100]};
    &:hover {
      background-color: ${({ theme }) => theme.colors.gray[200]};
      border: 1px solid ${({ theme }) => theme.colors.white[300]};
    }
  `,
};

const Dropdown = ({ children }: DropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
  };

  const dropdownRef = useRef(null);

  useClickOutSide(dropdownRef, handleCloseDropdown);

  return (
    <S.DropdownWrapper ref={dropdownRef}>
      <DropdownContext.Provider value={{ toggleDropdown, isDropdownOpen }}>{children}</DropdownContext.Provider>
    </S.DropdownWrapper>
  );
};

const DropdownButton = ({ children, ...props }: { children: ReactNode }) => {
  const { toggleDropdown } = useContext(DropdownContext);

  return (
    <S.DropdownButton {...props} onClick={toggleDropdown}>
      {children}
    </S.DropdownButton>
  );
};

const DropdownList = ({ children }: { children: ReactNode }) => {
  const { isDropdownOpen } = useContext(DropdownContext);
  if (!isDropdownOpen) return null;

  return <S.DropdownList role='menu'>{children}</S.DropdownList>;
};

const DropdownItem = ({ children }: { children: ReactNode }) => {
  return <S.DropdownItem role='menuitem'>{children}</S.DropdownItem>;
};

Dropdown.Button = DropdownButton;
Dropdown.List = DropdownList;
Dropdown.Item = DropdownItem;

export default Dropdown;
