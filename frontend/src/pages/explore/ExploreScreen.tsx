import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import StockList from './components/StockList';
import Search from './components/Search';
import { useActions, useAppState } from '../../overmind';
import ErrorAlert from '../common/ErrorAlert';

const InnerDiv = styled(`div`)({
  maxWidth: `75%`,
  padding: `50px`,
  margin: `0 auto`,
});

const SearchBox = styled(`div`)({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  marginBottom: `50px`,
});

const ExploreScreen: React.FC = () => {
  const actions = useActions();
  const state = useAppState();
  useEffect(
    () => () => {
      actions.cleanErrors();
    },
    [],
  );

  return (
    <InnerDiv>
      <SearchBox>
        <Search />
      </SearchBox>
      <StockList />
      {state.error && <ErrorAlert />}
    </InnerDiv>
  );
};

export default ExploreScreen;
