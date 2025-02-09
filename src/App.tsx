import Header from '@/components/header/Header';
import Logo from '@/assets/btheegg.svg?react';
import { Dropdown, ContentWrapper, Text, PageLayout } from '@/components/common';
import ProfileIcon from '@/assets/avatar.svg?react';
import ArrowDownIcon from '@/assets/arrowDown.svg?react';
import KanbanBoard from '@/components/KanbanBoard';
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
          <KanbanBoard />
        </ContentWrapper>
      </PageLayout>
    </>
  );
}

export default App;
