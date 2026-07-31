import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import DashboardPage from "@/pages/Dashboard";
import AppointmentPage from "@/pages/Appointment";
import PatientRegistrationPage from "@/pages/PatientRegistration";
import Analytics from "@/pages/Analytics"
import Patients from "@/pages/patients";
import QueueManagement from "@/components/queue/QueueManagement";
export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route
                    index
                    element={<Navigate to="/dashboard" replace />}
                />

                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

                <Route
                    path="/patients"
                    element={<PatientRegistrationPage />}
                />

                <Route
                    path="/appointments"
                    element={<AppointmentPage />}
                />

                <Route
                    path="/analytics"
                    element={<Analytics />}
                />
                <Route
                    path="/patient-list"
                    element={<Patients />}
                />
                <Route
                    path="/queue"
                    element={<QueueManagement />}
                />
            </Route>

        </Routes>
    );
}