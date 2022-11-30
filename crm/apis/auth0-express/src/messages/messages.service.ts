import { Message } from "./message.model";

export const getPublicMessage = (): Message => {
  return {
    text: "This is a public event.",
  };
};

export const getProtectedMessage = (): Message => {
  return {
    text: "This is a protected event.",
  };
};

export const getAdminMessage = (): Message => {
  return {
    text: "This is an admin event.",
  };
};
