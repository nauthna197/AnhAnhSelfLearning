import Welcome from "./pages/Welcome";
import Login from "./pages/Login";

export default [
    { path: "/login", name: "login", component: Login },
    { path: "/", name: "welcome", component: Welcome },
];
