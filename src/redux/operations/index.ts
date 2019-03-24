import { registerUser } from "./Auth";

export const Operations = {
  registerUser
};

export type Operations = ReturnType<typeof Operations[keyof typeof Operations]>;
