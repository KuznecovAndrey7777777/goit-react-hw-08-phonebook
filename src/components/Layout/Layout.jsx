import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from '../AppBar/AppBar';
import Loader from '../Loader/Loader';
import { ContentWrapper, LoaderStyled } from './Layout.styled';

const Layout = () => {
  return (
    <ContentWrapper>
      <AppBar />
      <Suspense
        fallback={
          <LoaderStyled>
            <Loader color={'#207785'} size={'300'} />
          </LoaderStyled>
        }
      >
        <Outlet />
      </Suspense>
    </ContentWrapper>
  );
};

export default Layout;
