import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ScrollToTop } from "../components/common/ScrollToTop";
import AppLayout from "../layout/AppLayout";
import Home from "../pages/Dashboard/Home";
import SignIn from "../pages/AuthPages/SignIn";
import SignUp from "../pages/AuthPages/SignUp";
import NotFound from "../pages/OtherPage/NotFound";
import Laporan from "../pages/Laporants/Laporan";
import PageMaps from "../pages/Maps";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Admin Pages
import AdminPage from "../pages/Admin";
import ManageDInas from "../pages/Admin/ManageDInas/ManageDInas";
import PageJenisKerusakan from "../pages/Admin/JenisKerusakan/PageJenisKerusakan";
import Laporans from "../pages/Admin/Laporan/Laporans";

const AppRoute = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes - Hanya bisa diakses jika belum login */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />

          {/* Protected Routes - Hanya bisa diakses jika sudah login */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >

            {/* Admin Only Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manage-dinas"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <ManageDInas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/jenis-kerusakan"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <PageJenisKerusakan />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/laporans"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <Laporans />
                </ProtectedRoute>
              }
            />

            {/* Dinas Only Routes */}
            <Route
              path="/dinas"
              element={
                <ProtectedRoute allowedRoles={["DINAS"]}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dinas/maps"
              element={
                <ProtectedRoute allowedRoles={["DINAS"]}>
                  <PageMaps />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dinas/laporan"
              element={
                <ProtectedRoute allowedRoles={["DINAS"]}>
                  <Laporan />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoute;
