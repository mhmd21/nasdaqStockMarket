import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useActions, useAppState } from '../../../overmind/index';
import LoadingIcon from '../../common/LoadingIcon';

// eslint-disable-next-line react/jsx-props-no-spreading
const CardContainer = styled((props) => <Paper {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
}));

const LinkContainer = styled(Link)({
  color: 'black',
  textDecoration: 'none',
});
const StockList: React.FC = () => {
  const actions = useActions();
  const state = useAppState();

  if (state.isLoading) {
    return <LoadingIcon />;
  }

  return (
    <InfiniteScroll
      dataLength={state.tickers.results!.length}
      next={actions.getNextTickers}
      hasMore={state.tickers.next_url !== undefined}
      loader={<h4>Loading more stocks</h4>}
    >
      <Grid container spacing={3}>
        {state.tickers.results!.map((stock) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <LinkContainer
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
            </LinkContainer>
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
};
export default StockList;
