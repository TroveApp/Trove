import { loginUser } from "./Auth";

export const Operations = {
  loginUser
};

export type Operations = ReturnType<typeof Operations[keyof typeof Operations]>;
