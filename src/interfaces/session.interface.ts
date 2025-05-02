export interface User {
  // id: string;
  _id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  isEmailVerified?: boolean;
  avatar?: string;
}

export interface SessionState {
  status: "pending" | "authenticated" | "unauthenticated";
  user: User | null;
  accessToken: string | null;
}

export interface SessionContext {
  session: SessionState;
  clearSession: () => void;
  setSession: React.Dispatch<React.SetStateAction<SessionState>>;
}
