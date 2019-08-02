import { Route } from "../models/route";
import HomePage from "../containers/HomePage";
import AddTodo from "../containers/AddTodo";
import TodosPage from "../containers/TodosPage";
import NotFound from "../components/404";
const routes: Route[] = [
  {
    path: "/",
    component: HomePage
  },
  {
    path: "/add",
    component: AddTodo
  },
  {
    path: "/todos",
    component: TodosPage
  },
  {
    component: NotFound
  }
];
export default routes;
