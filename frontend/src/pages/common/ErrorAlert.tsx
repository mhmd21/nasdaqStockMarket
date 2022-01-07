import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useAppState } from '../../overmind';

const ErrorAlert: React.FC = () => {
  const state = useAppState();
  return (
    <div>
      {state.error.map((error: {} | null | undefined) => (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={error !== ''}
        >
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
};
export default ErrorAlert;
