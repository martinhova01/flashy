import { api } from "./api";

export const ApiTest = {
  getTest: async function (): Promise<any> {
    return api.get("/test");
  },
};
