import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { City, ListResponse } from 'models';

export interface CityState {
  loading: boolean;
  list: City[];
}

const initialState: CityState = {
  loading: false,
  list: [],
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },
    fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchCityListFailed(state) {
      state.loading = false;
    },
  },
});

export const cityActions = citySlice.actions;

export const selectCityLoading = (state: RootState) => state.city.loading;
export const selectCityList = (state: RootState) => state.city.list;

export const selectCityMap = createSelector(selectCityList, cityList => {
  const cityMap: {
    [key: string]: City;
  } = {};

  return cityList.reduce((result, city) => {
    result[city.code] = city;
    return result;
  }, cityMap);
});

export const selectCityOptions = createSelector(selectCityList, cityList => {
  return cityList.map(city => ({
    value: city.code,
    label: city.name,
  }));
});

const cityReducer = citySlice.reducer;
export default cityReducer;
