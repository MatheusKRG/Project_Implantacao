import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { HomePage } from "../pages/builds/BuildList";
import { LoginPage } from "../pages/auth/Login";
import { RegisterPage } from "../pages/auth/Register";
import { DashboardPage } from "../pages/dashboard/Dashboard";
import { CreateBuildPage } from "../pages/builds/CreateBuild";
import { BuildDetailsPage } from "../pages/builds/BuildDetails";
import { EditBuildPage } from "../pages/builds/EditBuild";
import { ProfilePage } from "../pages/profile/Profile";
import { BloodbornePage } from "../pages/games/BloodbornePage";
import { EldenRingPage } from "../pages/games/EldenRingPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<BloodbornePage />} path="/bloodborne" />
      <Route element={<EldenRingPage />} path="/elden-ring" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<RegisterPage />} path="/register" />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardPage />} path="/dashboard" />
        <Route element={<CreateBuildPage />} path="/builds/new" />
        <Route element={<EditBuildPage />} path="/builds/:id/edit" />
        <Route element={<ProfilePage />} path="/profile" />
      </Route>

      <Route element={<BuildDetailsPage />} path="/builds/:id" />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  );
}
