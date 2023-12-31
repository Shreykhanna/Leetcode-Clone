import { atom } from "recoil";
type AuthModalState = {
  isOpen: boolean;
  type: "login" | "register" | "forgotPassword";
};
const InitialInputModalState: AuthModalState = {
  isOpen: false,
  type: "login",
};
export const authModalState = atom<AuthModalState>({
  key: "authModalState",
  default: InitialInputModalState,
});
