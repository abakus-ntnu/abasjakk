import { render } from "preact";
import { useRef } from "preact/hooks";
import { Route, Router, Link, getCurrentUrl } from "preact-router";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./routes/home";
import Admin from "./routes/admin";
import Matches from "./routes/matches";

import "./styles/app.css";
import Laser from "./components/laser";

const queryClient = new QueryClient();

function App() {
  const nav = useRef(null);

  const switchClass = (event) => {
    for (const link of nav.current.children)
      link.className = null;
    event.target.className = "active-link";
  }
  const currentPath = getCurrentUrl();

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <nav ref={nav}>
          <Link href="/" className={currentPath == "/" ? "active-link" : null} onClick={switchClass}>HJEM</Link>
          <Link href="/matches" className={currentPath == "/matches" ? "active-link" : null} onClick={switchClass}>KAMPER</Link>
          <Link href="/admin" className={currentPath == "/admin" ? "active-link" : null} onClick={switchClass}>ADMIN</Link>
        </nav>
        <Router>
          <Route path="/" component={Home} default />
          <Route path="/admin" component={Admin} />
          <Route path="/matches" component={Matches} />
        </Router>
      </main>
      <Laser/>
    </QueryClientProvider>
  );
}


render(<App />, document.getElementById("root"));
