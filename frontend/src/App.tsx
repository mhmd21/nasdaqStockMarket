import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from '@mui/styled-engine';
import SplashScreen from './pages/splash/SplashScreen';
import ExploreScreen from './pages/explore/ExploreScreen';
import StockScreen from './pages/stock/StockScreen';

const ContentWrapper = styled(`div`)({
  minHeight: `100vh`,
  position: `relative`,
});

const App: React.FC = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 1500);
  }, []);

  if (showSplashScreen) {
    return <SplashScreen />;
  }
  return (
    <ContentWrapper>
      <Routes>
        <Route path="/" element={<ExploreScreen />} />
        <Route path="/tickers/:ticker" element={<StockScreen />} />
      </Routes>
    </ContentWrapper>
  );
};
export default App;
