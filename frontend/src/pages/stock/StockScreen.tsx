import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import StockStatistics from './components/StockStatistics';
import StockAbout from './components/StockAbout';
import { useActions, useAppState } from '../../overmind';
import Backbutton from './components/Backbutton';
import LoadingIcon from '../common/LoadingIcon';

const OuterDiv = styled(`div`)({
  minHeight: `95vh`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
});

const OuterContainer = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(5),
  maxWidth: '70%',
}));

const StockDetails: React.FC = () => {
  const { ticker } = useParams();
  const state = useAppState();
  const actions = useActions();

  useEffect(() => {
    (async () => {
      await actions.getTicker(ticker!);
    })();

    return () => {
      actions.cleanTickerData();
    };
  }, []);

  if (state.isLoading) {
    return <LoadingIcon />;
  }

  return (
    <div>
      <Backbutton />
      <OuterDiv>
        <OuterContainer>
          <StockAbout />
          <StockStatistics />
        </OuterContainer>
      </OuterDiv>
    </div>
  );
};
export default StockDetails;
