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
import SomeOtherPage from "./routes/someOtherPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/someOtherPage" component={SomeOtherPage} />
        </Router>
      </main>
    </QueryClientProvider>
  );
}

render(<App />, document.getElementById("root"));
