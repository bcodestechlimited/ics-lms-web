/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */

import {PageLoader} from "@/components/loading-spinner";
import {
  SessionContext,
  SessionState,
  User,
} from "@/interfaces/session.interface";
import {authStore} from "@/store/auth.store";
import axios from "axios";
import {createContext, useEffect, useMemo, useState} from "react";

axios.defaults.withCredentials = true;

export const sessionContext = createContext<SessionContext>({
  session: {status: "pending", user: null, accessToken: ""},
  clearSession: () => {},
  setSession: () => {},
});

export const SessionProvider = ({children}: {children: React.ReactNode}) => {
  const [session, setSession] = useState<SessionState>({
    status: "pending",
    user: null,
    accessToken: "",
  });

  const controller = useMemo(() => new AbortController(), []);

  const getUser = async () => {
    try {
      const {data, status} = await axios.get<Partial<User> & {_id: string}>(
        `${import.meta.env.VITE_SERVER_URL}/user/session`,
        {
          withCredentials: true,
          signal: controller.signal,
        }
      );
      console.log("data from session", data);

      if (status === 200 && data?._id) {
        // const data = await data;
        setSession({
          status: "authenticated",
          user: data,
          accessToken: "",
        });
        // auth store
        authStore.getState().setSession(
          {
            email: data.email as string,
            firstName: data.firstName as string,
            lastName: data.lastName as string,
            _id: data._id,
            isEmailVerified: data.isEmailVerified as boolean,
            avatar: data.avatar as string,
            isActive: data.isActive as boolean,
          },
          ""
        );
        return;
      } else {
        setSession({
          status: "unauthenticated",
          user: null,
          accessToken: "",
        });
        return;
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      // toast.error("Login to get access");
      setSession({
        status: "unauthenticated",
        user: null,
        accessToken: "",
      });
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const isValid = await authStore.getState().validateSession();
      if (!isValid) {
        console.log("session expired");
        // authStore.getState().clearSession();
      }
    };

    // Initial check
    checkSession();

    // Periodic checks every 5 minutes
    const interval = setInterval(checkSession, 300_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getUser();
    // return () => controller.abort();
  }, []);

  const clearSession = () => {
    setSession({
      status: "unauthenticated",
      user: null,
      accessToken: "",
    });
  };

  const value = useMemo(
    () => ({
      session,
      clearSession,
      setSession,
    }),
    [session]
  );

  return (
    <sessionContext.Provider value={value}>
      {session.status === "pending" ? (
        <div>
          {" "}
          <PageLoader />{" "}
        </div>
      ) : (
        children
      )}
    </sessionContext.Provider>
  );
};
