import Header from '@/components/header/Header';
import PageLayout from '@/components/common/layout/PageLayout';
import Logo from '@/assets/btheegg.svg?react';
import { Dropdown, ContentWrapper, Text } from '@/components/common';
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
                <Text variant='profile' color='profileBlack'>
                  원동현님
                </Text>
                <ArrowDownIcon />
              </Dropdown.Button>
              <Dropdown.List>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>Logout</Dropdown.Item>
              </Dropdown.List>
            </Dropdown>
          }
        />
        <ContentWrapper>
          <Text variant='body2' color='purple'>
            dd
          </Text>
        </ContentWrapper>
      </PageLayout>
    </>
  );
}

export default App;
