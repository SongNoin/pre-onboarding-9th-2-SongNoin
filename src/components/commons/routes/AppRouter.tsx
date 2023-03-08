import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MainPage } from "../../../pages/Main";
import { NotFoundPage } from "../../../pages/NotFound";
import { ReservationPage } from "../../../pages/Reservation";
import { DefaultLayout } from "../../Layouts/DefaultLayout";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/reservations" element={<ReservationPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
