import { Token, XCI } from "@/constants/index";
import {
  BreedData,
  LoginParam,
  SignupParam,
  SuccessSignupRes,
  VerifyParam,
} from "@/types";
import { Response } from "@/types/server";
import { LoginSuccess } from "@/types/server/auth/login";
import { GetMyProfiles } from "@/types/server/profile";
import { GetMeResponse } from "@/types/server/user/me";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const PoopApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

// Common
export const getBreeds = async () => {
  const { data } = await PoopApi.get<BreedData>("/v1/common/breeds");
  return data;
};

// User
export const getMe = async () => {
  const { data } = await PoopApi.get<Response<GetMeResponse>>("/v1/users/me");
  return data;
};

// Profile
export const getLatestProfile = async () => {
  const { data } = await PoopApi.get<Response<GetMyProfiles>>(
    "/v1/profiles/latest"
  );
  return data;
};

export const loginProfile = async (profileId: string) => {
  const { data } = await PoopApi.post<Response<boolean>>("/v1/profiles", {
    profileId,
  });
  return data;
};

export const createProfile = async (form: FormData) => {
  const { data } = await PoopApi.put<Response<boolean>>("/v1/profiles", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const getMyProfileList = async () => {
  const { data } = await PoopApi.get<Response<GetMyProfiles[]>>("/v1/profiles");
  return data;
};

// Auth
export const signUp = async (body: SignupParam) => {
  const { data } = await PoopApi.put<Response<SuccessSignupRes>>(
    "/v1/auth/signup",
    body
  );
  return data;
};

export const socialSignup = async (body: {
  token: string;
  provider: "APPLE" | "GOOGLE";
}) => {
  const { data } = await PoopApi.post<Response<LoginSuccess>>(
    "/v1/auth/social",
    body
  );
  return data.body;
};

export const verify = async (body: VerifyParam) => {
  const { data } = await PoopApi.post("/v1/auth/verify", body);
  return data;
};

export const getVerifyCode = async (params: VerifyParam) => {
  const { data } = await PoopApi.get("/v1/auth/verify", { params });
  return data;
};

export const login = async (body: LoginParam) => {
  const { data } = await PoopApi.post<Response<LoginSuccess>>(
    "/v1/auth/login",
    body
  );
  return data.body;
};

export const refresh = async () => {
  const { data } = await PoopApi.post<Response<LoginSuccess>>(
    "/v1/auth/refresh"
  );
  return data;
};

export const checkUserIdDuplicated = async (nickname: string) => {
  const { data } = await PoopApi.get("/v1/users/nickname", {
    params: {
      nickname,
    },
  });
  return data;
};

export const setAccessToken = async ({
  accessToken,
  shouldRefresh,
}: {
  accessToken: string;
  shouldRefresh?: boolean;
}) => {
  let _accessToken = accessToken;
  PoopApi.defaults.headers.common[XCI] = _accessToken;
  if (shouldRefresh) {
    const response = await refresh();
    const data = response as unknown as Response<LoginSuccess>;
    _accessToken = data.body.accessToken;
  }
  await AsyncStorage.setItem(Token.ACT, _accessToken);
  PoopApi.defaults.headers.common[XCI] = _accessToken;
};

export const getToken = async () => await AsyncStorage.getItem(Token.ACT);

export const injectInterceptor = async (InjectOptions: {
  accessToken: string;
  shouldRefresh?: boolean;
}) => {
  await setAccessToken(InjectOptions);

  PoopApi.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === 401) {
        await AsyncStorage.removeItem(Token.ACT);
        await AsyncStorage.removeItem(Token.RFT);
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );
};
