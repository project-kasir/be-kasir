export enum USER_ROLES {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export type PaginationReq = {
  page: number;
  size: number;
};

export type UserClaims = {
  id: string;
  username: string;
  role: string;
};
