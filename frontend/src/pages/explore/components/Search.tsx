import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useActions, useAppState } from '../../../overmind/index';

const Search: React.FC = () => {
  const actions = useActions();
  const state = useAppState();
  // eslint-disable-next-line consistent-return

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
        onChange={(e) => actions.search(e.target.value)}
      />
    </div>
  );
};
export default Search;
