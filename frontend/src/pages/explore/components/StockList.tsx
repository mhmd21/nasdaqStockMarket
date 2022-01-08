import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useActions, useAppState } from '../../../overmind/index';
import LoadingIcon from '../../common/LoadingIcon';

const CardContainer = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  marginBottom: '20px',
  textAlign: 'center',
}));

const OuterDiv = styled(`div`)({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
});

const StockList: React.FC = () => {
  const actions = useActions();
  const state = useAppState();

  if (state.isLoading) {
    return <LoadingIcon />;
  }

  return (
    <OuterDiv>
      <InfiniteScroll
        dataLength={state.tickers.results!.length}
        next={actions.getNextTickers}
        hasMore={state.tickers.next_url !== undefined}
        loader={<h4>Loading more stocks</h4>}
      >
        <Grid container spacing={2}>
          {state.tickers.results!.map((stock) => (
            <Grid item xs={4}>
              <Link
                id={stock.ticker}
                key={stock.ticker}
                to={`/tickers/${stock.ticker}`}
              >
                <CardContainer>
                  <Typography variant="h5" component="h2">
                    {stock.ticker}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stock.name}
                  </Typography>
                </CardContainer>
              </Link>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </OuterDiv>
  );
};
export default StockList;
