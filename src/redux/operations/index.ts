import { loginUser, updateOnboardingState } from "./Auth";
import { saveTopResources, addExperience } from "./Profile";

export const Operations = {
  loginUser,
  updateOnboardingState,
  saveTopResources,
  addExperience,
};

export type Operations = ReturnType<typeof Operations[keyof typeof Operations]>;
