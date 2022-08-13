import cityApi from 'api/cityApi';
import studentApi from 'api/studentApi';
import { City, ListResponse, Student } from 'models';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { dashboardActions, RankingByCity } from './dashboardSlice';

function* getStatistics() {
  const responseList: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'male' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'female' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
  ]);

  const statisticList = responseList.map(x => x.pagination._totalRows);
  const [maleCount, femaleCount, lowMarkCount, highMarkCount] = statisticList;

  yield put(
    dashboardActions.setStatistics({ maleCount, femaleCount, lowMarkCount, highMarkCount })
  );
}

function* getHighestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
  });

  yield put(dashboardActions.setHighestStudentList(data));
}

function* getLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc',
  });

  yield put(dashboardActions.setLowestStudentList(data));
}

function* getRankingByCityList() {
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);

  const callList = cityList.map(x =>
    call(studentApi.getAll, { _page: 1, _limit: 5, _order: 'desc', _sort: 'mark', city: x.code })
  );

  const responseList: Array<ListResponse<Student>> = yield all(callList);
  const rankingByCityList: Array<RankingByCity> = responseList.map((x, idx) => ({
    cityId: cityList[idx].code,
    cityName: cityList[idx].name,
    rankingList: x.data,
  }));

  yield put(dashboardActions.setRankingByCityList(rankingByCityList));
}

function* getDashboardData() {
  try {
    yield all([
      call(getStatistics),
      call(getHighestStudentList),
      call(getLowestStudentList),
      call(getRankingByCityList),
    ]);

    yield put(dashboardActions.fetchDataSuccess());
  } catch (error) {
    console.log('get data failed: ', error);
    yield put(dashboardActions.fetchDataFailed());
  }
}

export function* dashboardSaga() {
  yield takeLatest(dashboardActions.fetchData.toString(), getDashboardData);
}
