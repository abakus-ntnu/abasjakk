import { render } from "preact";
import { useRef } from "preact/hooks";
import { Route, Router, route } from "preact-router";
import { Link } from "preact-router/match";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./components/protectedRoute";
import Laser from "./components/laser";
import Matches from "./routes/matches";
import Admin from "./routes/admin";
import Home from "./routes/home";
import "./styles/app.css";

const queryClient = new QueryClient();

function App() {
  // stupid <Link> does not work properly (probably gotta sell my soul to the devil to find out why)
  // so I have to do all this..
  const nav = useRef(null);
  const switchClass = (event) => {
    for (const link of nav.current.children) link.className = null;
    event.target.className = "active-link";
  };

  return (
    <>
      <main>
        <nav ref={nav}>
          <Link
            href={"/"}
            activeClassName="active-link"
            onClick={(e) => {
              route("/");
              switchClass(e);
            }}
          >
            HJEM
          </Link>
          <Link
            href={"/matches"}
            activeClassName="active-link"
            onClick={(e) => {
              route("/matches");
              switchClass(e);
            }}
          >
            KAMPER
          </Link>
        </nav>
        <Router>
          <Route path="/" component={Home} default />
          <Route path="/matches" component={Matches} />
          <ProtectedRoute path="/admin" component={Admin} />
        </Router>
      </main>
      <Laser />
    </>
  );
}

render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools />
  </QueryClientProvider>,
  document.getElementById("root"),
);
