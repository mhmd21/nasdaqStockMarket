import CircularProgress from '@mui/material/CircularProgress';
import styled from '@mui/styled-engine';

const OuterBox = styled(`div`)({
  minHeight: '95vh',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
});

const LoadingIcon = () => (
  <OuterBox>
    <CircularProgress data-testid="loadingIcon" />
  </OuterBox>
);
export default LoadingIcon;
