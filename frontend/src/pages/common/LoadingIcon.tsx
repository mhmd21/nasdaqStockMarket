import CircularProgress from '@mui/material/CircularProgress';
import styled from '@mui/styled-engine';

const LoadingContainer = styled(`div`)({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

const LoadingIcon = () => (
  <LoadingContainer>
    <CircularProgress data-testid="loadingIcon" />
  </LoadingContainer>
);
export default LoadingIcon;
