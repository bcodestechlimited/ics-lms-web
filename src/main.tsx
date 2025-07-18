import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router";
import {Toaster} from "sonner";
import App from "./App.tsx";
import ErrorBoundary from "./components/error-boundary.tsx";
import {Navbar} from "./components/navbar.tsx";
import {ScrollToTop} from "./hooks/use-scroll-to-top.ts";
import "./index.css";
import {ProtectedLayout} from "./layouts/protected-layout.tsx";
import AboutUsPage from "./pages/about-us.tsx";
import UserActivation from "./pages/auth/activate-user.tsx";
import ForgotPasswordPage from "./pages/auth/forgot-password.tsx";
import LoginPage from "./pages/auth/login-page.tsx";
import ResetPasswordPage from "./pages/auth/reset-password.tsx";
import SignupPage from "./pages/auth/signup-page.tsx";
import StaffOnboarding from "./pages/auth/staff-onboarding.tsx";
import CourseCategoryPage from "./pages/course/course-category-page.tsx";
import CourseCheckoutPage from "./pages/course/course-checkout-page.tsx";
import CourseSlugPage from "./pages/course/course-slug-page.tsx";
import CoursesPage from "./pages/course/courses-page.tsx";
import DashboardCertificate from "./pages/dashboard/certificates.tsx";
import DashboardCourseAssessmentPage from "./pages/dashboard/course/course-assessment.tsx";
import DashboardCourseOverview from "./pages/dashboard/course/slug.tsx";
import DashboardExpiredCourses from "./pages/dashboard/expired-courses.tsx";
import UserDashboard from "./pages/dashboard/index.tsx";
import {UserProfileDashboard} from "./pages/dashboard/user-profile.tsx";
import ErrorPage from "./pages/error.tsx";
import NotFoundPage from "./pages/not-found.tsx";
import PrivacyPolicyPage from "./pages/privacy-policy/index.tsx";
import TermsAndConditionsPage from "./pages/terms-and-condition/page.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <ScrollToTop>
          <ErrorBoundary fallback={<ErrorPage />}>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/signup" element={<SignupPage />} />
              <Route
                path="/auth/forgot-password"
                element={<ForgotPasswordPage />}
              />
              <Route path="/auth/user/activate" element={<UserActivation />} />
              <Route
                path="/auth/reset-password"
                element={<ResetPasswordPage />}
              />
              <Route
                path="/auth/staff-onboarding"
                element={<StaffOnboarding />}
              />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/courses/:id" element={<CourseSlugPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route
                path="/courses/category"
                element={<CourseCategoryPage />}
              />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route
                path="/terms-and-condition"
                element={<TermsAndConditionsPage />}
              />
              <Route element={<ProtectedLayout />}>
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route
                  path="/dashboard/courses/:id/modules/:moduleId/overview"
                  element={<DashboardCourseOverview />}
                />
                <Route
                  path="/dashboard/courses/:id/course-assessment"
                  element={<DashboardCourseAssessmentPage />}
                />
                <Route
                  path="/dashboard/expired-courses"
                  element={<DashboardExpiredCourses />}
                />
                <Route
                  path="/dashboard/certificates"
                  element={<DashboardCertificate />}
                />
                <Route
                  path="/course-checkout/:id"
                  element={<CourseCheckoutPage />}
                />
                <Route
                  path="/dashboard/certificates"
                  element={<DashboardCertificate />}
                />
                <Route
                  path="/dashboard/user-profile"
                  element={<UserProfileDashboard />}
                />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ErrorBoundary>
        </ScrollToTop>
        <Toaster richColors={true} closeButton={true} />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
