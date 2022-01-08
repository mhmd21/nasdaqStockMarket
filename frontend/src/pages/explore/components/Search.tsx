import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useActions, useAppState } from '../../../overmind/index';

const Search: React.FC = () => {
  const actions = useActions();
  const state = useAppState();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (state.searchInput !== '') {
      const timeout = setTimeout(() => {
        actions.searchTickers(state.searchInput);
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [state.searchInput]);
  return (
    <div>
      <TextField
        type="search"
        sx={{ bgcolor: 'white' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        id="searchBar"
        label="Search"
        variant="outlined"
        value={state.searchInput}
        onChange={(e) => actions.setSearchInput(e.target.value)}
      />
    </div>
  );
};
export default Search;
