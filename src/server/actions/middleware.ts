import { getAuthUser } from "@/lib/next-auth/session";
import { User } from "@/server/model/User";

export type ActionResponse<T> = {
  success: boolean;
  code: number;
  data?: T;
  error?: string;
};

export const successResponse = <T>(
  data: T,
  code: number = 200,
): ActionResponse<T> => {
  return {
    success: true,
    code,
    data,
  };
};

export const errorResponse = (
  message: string = "An unknown error occurred",
  code: number = 500,
): ActionResponse<undefined> => {
  return {
    success: false,
    data: undefined,
    code,
    error: message,
  };
};

export const requireAuth = <T, R>(
  action: (
    data: T,
    sessionUser: User,
  ) => Promise<ActionResponse<R | undefined>>,
) => {
  return async (data: T): Promise<ActionResponse<R | undefined>> => {
    const sessionUser = await getAuthUser();
    if (!sessionUser) {
      return errorResponse("Unauthorized", 401);
    }
    return action(data, sessionUser);
  };
};
