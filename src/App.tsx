import Header from '@/components/header/Header';
import PageLayout from '@/components/layout/PageLayout';
import Logo from '@/assets/btheegg.svg?react';
import { Dropdown } from '@/components/common';
import ContentWrapper from '@/components/common/Wrapper/ContentWrapper';
import ProfileIcon from '@/assets/avatar.svg?react';
import ArrowDownIcon from '@/assets/arrowDown.svg?react';
function App() {
  return (
    <>
      <PageLayout>
        <Header
          logo={<Logo />}
          profile={
            <Dropdown>
              <ProfileIcon />
              <Dropdown.Button>
                <span>원동현님</span>
                <ArrowDownIcon />
              </Dropdown.Button>
              <Dropdown.List>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>Logout</Dropdown.Item>
              </Dropdown.List>
            </Dropdown>
          }
        />
        <ContentWrapper>dd</ContentWrapper>
      </PageLayout>
    </>
  );
}

export default App;
