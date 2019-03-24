import { loginUser, updateOnboardingState } from "./Auth";
import { saveTopResources } from "./Profile";

export const Operations = {
  loginUser,
  updateOnboardingState,
  saveTopResources,
};

export type Operations = ReturnType<typeof Operations[keyof typeof Operations]>;
