import { NotFound, RequireAuth } from 'components/common';
import { AdminLayout } from 'components/layout';
import LoginPage from 'features/auth/pages/Login';
import { DashboardFeature } from 'features/dashboard';
import { AddEditPage } from 'features/students/pages/AddEdit';
import { ListPage } from 'features/students/pages/List';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './app.scss';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<DashboardFeature />} />

          <Route path="students" element={<Outlet />}>
            <Route index element={<ListPage />} />
            <Route path="add" element={<AddEditPage />} />
            <Route path="edit/:studentId" element={<AddEditPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
