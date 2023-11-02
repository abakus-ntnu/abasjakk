import { useEffect, useState } from "preact/hooks";
import { JSXInternal } from "preact/src/jsx";
import { Route } from "preact-router";
import { useMutation } from "@tanstack/react-query";
import { checkPassword } from "@/api/login";
import Login from "@/routes/login";

type Props = {
  path: string;
  component: () => JSXInternal.Element;
};

const ProtectedRoute = ({ path, component }: Props) => {
  const [isAuth, setAuth] = useState(false);
  const checkPasswordMutation = useMutation({
    mutationFn: checkPassword,
  });

  // only want to call this once when ProtectedRoute is mounted
  useEffect(() => {
    checkPasswordMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAuth(checkPasswordMutation.data === 200);
  }, [checkPasswordMutation]);

  return isAuth ? (
    <Route path={path} component={component} />
  ) : (
    <Route component={Login} />
  );
};

export default ProtectedRoute;
