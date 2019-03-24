import { loginUser, updateOnboardingState } from "./Auth";

export const Operations = {
  loginUser,
  updateOnboardingState,
};

export type Operations = ReturnType<typeof Operations[keyof typeof Operations]>;
