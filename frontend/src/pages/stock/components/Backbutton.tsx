import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

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
      <ArrowBackIcon />
    </IconButton>
  );
};
export default Backbutton;
