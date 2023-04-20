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
import admin from "./routes/admin";
import AdminPage from "./routes/admin";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/admin" component={AdminPage} />
        </Router>
      </main>
    </QueryClientProvider>
  );
}


render(<App />, document.getElementById("root"));
