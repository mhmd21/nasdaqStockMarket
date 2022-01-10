import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

// eslint-disable-next-line react/jsx-props-no-spreading

const Backbutton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasPreviousState = location.key !== 'default';

  const handleClick = () => {
    if (hasPreviousState) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };
  return (
    <IconButton onClick={handleClick}>
      <ArrowBackIcon fontSize="large" />
    </IconButton>
  );
};
export default Backbutton;
