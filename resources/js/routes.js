import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import TodoList from "./pages/TodoList";
import DailyVocabulary from "./pages/DailyVocabulary/DailyVocabulary"

export default [
    { path: "/login", name: "login", component: Login },
    { path: "/todo-list", name: "Todo List", component: TodoList },
    { path: "/daily-vocabulary", name: "Daily Vocabulary", component: DailyVocabulary },
    { path: "/", name: "welcome", component: Welcome },
];
