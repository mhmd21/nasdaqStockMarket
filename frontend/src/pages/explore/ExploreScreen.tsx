import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import StockList from './components/StockList';
import Search from './components/Search';
import { useActions } from '../../overmind';

const OuterDiv = styled(`div`)({});

const ExploreScreen: React.FC = () => {
  const actions = useActions();

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
    </OuterDiv>
  );
};

export default ExploreScreen;
