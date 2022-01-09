import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import StockStatistics from './components/StockStatistics';
import StockAbout from './components/StockAbout';
import { useActions, useAppState } from '../../overmind';
import Backbutton from './components/Backbutton';
import LoadingIcon from '../common/LoadingIcon';
import ErrorAlert from '../common/ErrorAlert';

const OuterDiv = styled(`div`)({
  minHeight: `95vh`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
});

// eslint-disable-next-line react/jsx-props-no-spreading
const OuterContainer = styled((props) => <Paper {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(5),
  maxWidth: '70%',
}));

const StockScreen: React.FC = () => {
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

  return (
    <div>
      <Backbutton />
      {state.currentTicker.isLoading ? (
        <LoadingIcon />
      ) : (
        <OuterDiv>
          <OuterContainer>
            <StockAbout />
            <StockStatistics />
          </OuterContainer>
        </OuterDiv>
      )}
      {state.error && <ErrorAlert />}
    </div>
  );
};
export default StockScreen;
