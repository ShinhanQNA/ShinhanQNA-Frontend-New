export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  cyberId: string;
  cyberPassword: string;
  password: string;
  nickname: string;
}

export interface CyberVerifyRequest {
  cyberId: string;
  cyberPassword: string;
}

export interface CyberVerifyResponse {
  studentNumber: string;
  department: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

export interface NicknameUpdateRequest {
  nickname: string;
}
