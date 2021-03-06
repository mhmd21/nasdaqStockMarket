import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import { useAppState } from '../../../overmind';

const TickerLogo = styled('img')({
  maxWidth: '100%',
  height: 'auto',
});

const H1 = styled(`h1`)({
  margin: `0`,
});

// eslint-disable-next-line react/jsx-props-no-spreading
const GridContainer = styled((props) => <Grid {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  [theme.breakpoints.down('sm')]: {
    textAlign: `center`,
  },
  [theme.breakpoints.up('md')]: {
    textAlign: `left`,
  },
}));

const StockAbout: React.FC = () => {
  const state = useAppState();
  const { ticker } = useParams();

  return (
    <GridContainer
      container
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12} md={1}>
        {state.currentTicker.details.logo ? (
          <TickerLogo
            src={state.currentTicker.details.logo}
            alt="logo"
            width="70"
            height="50"
          />
        ) : (
          'No Logo Available'
        )}
      </Grid>
      <Grid item xs={12} md={10}>
        <Grid item xs={12} md={10}>
          <H1>
            {state.currentTicker.details.name
              ? state.currentTicker.details.name
              : 'No Ticker Name Data Available'}
          </H1>
        </Grid>
        <Grid item xs={12} md={4}>
          {ticker}
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <a href={state.currentTicker.details.url}>Visit Company Website</a>
      </Grid>

      <Grid item xs={12} md={4}>
        <b>Industry:</b>{' '}
        {state.currentTicker.details.industry
          ? state.currentTicker.details.industry
          : 'No Industry Data Available'}
      </Grid>
      <Grid item xs={12} md={12}>
        <b>About</b>
      </Grid>
      <Grid item xs={12} md={12}>
        {state.currentTicker.details.description
          ? state.currentTicker.details.description
          : 'No Ticker Descripition Available'}
      </Grid>
    </GridContainer>
  );
};
export default StockAbout;
