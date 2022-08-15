import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { City, ListParams } from 'models';
import { ChangeEvent, Ref, useRef } from 'react';

export interface StudentFiltersProps {
  filter: ListParams;
  cityList: City[];
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

function StudentFilters(props: StudentFiltersProps) {
  const { filter, cityList, onChange, onSearchChange } = props;

  const searchRef: Ref<any> = useRef();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    onSearchChange({
      ...filter,
      _page: 1,
      name_like: e.target.value,
    });
  };

  const handleCityChange = (e: SelectChangeEvent<string>) => {
    if (!onChange) return;

    onChange({
      ...filter,
      _page: 1,
      city: e.target.value === 'all' ? undefined : e.target.value,
    });
  };

  const handleSortChange = (e: SelectChangeEvent<string>) => {
    if (!onChange) return;

    const value = e.target.value;

    if (value === 'none') {
      onChange({
        ...filter,
        _sort: undefined,
        _order: undefined,
      });
    } else {
      const [_sort, _order] = value.split('.');
      onChange({
        ...filter,
        _sort,
        _order: _order as ListParams['_order'],
      });
    }
  };

  const handleFilterClear = () => {
    if (!onChange) return;

    onChange({
      ...filter,
      _page: 1,
      name_like: undefined,
      city: undefined,
      _sort: undefined,
      _order: undefined,
    });

    searchRef.current.value = '';
  };

  return (
    <Box>
      <Grid container spacing={['16px', '16px']}>
        <Grid item xs={6}>
          <TextField
            inputRef={searchRef}
            fullWidth
            size="small"
            variant="outlined"
            label="Search students"
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="city">City</InputLabel>
            <Select
              labelId="city"
              label="City"
              value={filter.city ?? 'all'}
              onChange={handleCityChange}
            >
              <MenuItem value="all">All</MenuItem>

              {cityList.map(x => (
                <MenuItem key={x.code} value={x.code}>
                  {x.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="sort">Sort</InputLabel>
            <Select
              labelId="sort"
              label="Sort"
              value={filter._sort && filter._order ? `${filter._sort}.${filter._order}` : 'none'}
              onChange={handleSortChange}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">Mark ASC</MenuItem>
              <MenuItem value="mark.desc">Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={1}>
          <Button fullWidth variant="contained" onClick={handleFilterClear}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudentFilters;
