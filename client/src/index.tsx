import { render } from "preact";
import "./index.css";
import { Route, Router } from "preact-router";
import {
  QueryClient,
  QueryClientProvider,
  useQueries,
  useQuery,
  useQueryClient,
} from "react-query";
import Home from "./routes/home";
import Admin from "./routes/admin";
import Matches from "./routes/matches";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/matches" component={Matches} />
        </Router>
      </main>
    </QueryClientProvider>
  );
}


render(<App />, document.getElementById("root"));
