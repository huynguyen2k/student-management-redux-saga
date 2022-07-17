import { NotFound, RequireAuth } from 'components/common';
import { AdminLayout } from 'components/layout';
import LoginPage from 'features/auth/pages/Login';
import { DashboardFeature } from 'features/dashboard';
import { StudentsFeature } from 'features/students';
import { Navigate, Route, Routes } from 'react-router-dom';
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
          <Route path="students" element={<StudentsFeature />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
