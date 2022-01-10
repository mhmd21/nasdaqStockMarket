import React from 'react';
import { styled } from '@mui/material/styles';

const LogoContainer = styled(`div`)({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

const CreatedByContainer = styled(`div`)({
  textAlign: `center`,
  position: `fixed`,
  left: `50%`,
  bottom: `20px`,
  transform: `translate(-50%, -50%)`,
  margin: `0 auto`,
});

const NasdaqLogo = styled('img')({
  maxWidth: '100%',
  height: 'auto',
});

const SplashScreen: React.FC = () => (
  <>
    <LogoContainer>
      <NasdaqLogo
        src="/images/nasdaq_logo.png"
        alt="Nasdaq Logo"
        width="320px"
        height="300px"
      />
    </LogoContainer>
    <CreatedByContainer>
      <div>
        <b>By</b>
      </div>
      <b>Mohammed Yasser</b>
    </CreatedByContainer>
  </>
);
export default SplashScreen;
