import { render } from "preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  BrowserRouter,
  NavLink,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Laser from "./components/laser";
import Matches from "./routes/matches";
import Login from "./routes/login";
import Admin from "./routes/admin";
import Home from "./routes/home";
import "./styles/app.css";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="matches" element={<Matches />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <>
      <main>
        <nav>
          <NavLink to={"/"}>HJEM</NavLink>
          <NavLink to={"/matches"}>KAMPER</NavLink>
        </nav>
        <Outlet />
      </main>
      <Laser />
    </>
  );
}

render(
  <QueryClientProvider client={queryClient}>
    <App />
    {/* <ReactQueryDevtools /> */}
  </QueryClientProvider>,
  document.getElementById("root"),
);
