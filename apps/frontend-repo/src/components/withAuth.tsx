import React, { useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/useApp";

const withAuth = (Component: React.ComponentType) => {
  const Auth: React.FC = (props) => {
    const auth = useAppSelector((state) => state.auth);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useLayoutEffect(() => {
      if (!auth) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    }, [auth, router]);

    if (isLoading) {
      return "loading...";
    }

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
