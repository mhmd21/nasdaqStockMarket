import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useAppState } from '../../../overmind';

const StatisticsContainer = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  marginTop: '20px',
  textAlign: 'left',
}));

const StockStatistics: React.FC = () => {
  const state = useAppState();
  return (
    <StatisticsContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <b>Statistics</b>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <b>Close:</b>
          {state.currentTicker.statistics.close
            ? state.currentTicker.statistics.close
            : 'No Close Data Available'}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <b> Open: </b>
          {state.currentTicker.statistics.open
            ? state.currentTicker.statistics.open
            : 'No Open Data Available'}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <b> Volume:</b>
          {state.currentTicker.statistics.volume
            ? state.currentTicker.statistics.volume
            : 'No Volume Data Available'}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <b> High:</b>
          {state.currentTicker.statistics.high
            ? state.currentTicker.statistics.high
            : 'No High Data Available'}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <b> Low: </b>
          {state.currentTicker.statistics.low
            ? state.currentTicker.statistics.low
            : 'No Low Data Available'}
        </Grid>
      </Grid>
    </StatisticsContainer>
  );
};
export default StockStatistics;
