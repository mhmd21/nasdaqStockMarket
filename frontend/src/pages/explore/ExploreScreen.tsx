import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import StockList from './components/StockList';
import Search from './components/Search';
import { useActions, useAppState } from '../../overmind';
import ErrorAlert from '../common/ErrorAlert';

const OuterDiv = styled(`div`)({});

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
    <OuterDiv>
      <Search />
      <StockList />
      {state.error && <ErrorAlert />}
    </OuterDiv>
  );
};

export default ExploreScreen;
