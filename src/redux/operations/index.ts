import { loginUser } from "./Auth";

export const Operations = {
  loginUser: loginUser
};

export type Operations = ReturnType<typeof Operations[keyof typeof Operations]>;
