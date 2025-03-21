import { User, ValidationErrorDataItem } from "@repo/types";

interface AuthInitialState {
  errorLoginMessage: string;
  errorData: ValidationErrorDataItem[];
  isLoading: boolean;
  isLogin: boolean;
  token: string;
  user: User | null;
}

interface UserInitialState {
  me: User | null;
  users: User[];
  meFetchingStatus: "idle" | "fetching" | "succeeded" | "failed";
  meUpdatingStatus: "idle" | "updating" | "succeeded" | "failed";
  usersFetchingStatus: "idle" | "fetching" | "succeeded" | "failed";
  errorUpdatingMessage: string;
  errorUpdatingData: ValidationErrorDataItem[];
}

export type { AuthInitialState, UserInitialState };
