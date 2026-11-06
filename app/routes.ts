import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("components/ProtectedRoute/ProtectedRoute.tsx", [
    route("dashboard", "routes/dashboard.tsx"),
    route("profile", "routes/profile.tsx"),
  ]),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
