/** ユーザープロフィール（サーバー側、role 含む） */
export type Profile = {
  id: string;
  displayName: string;
  avatarUrl: string | null;
  role: "user" | "admin";
  createdAt: string;
};

/** 公開プロフィール（role を除く、クライアントに渡す用） */
export type PublicProfile = Omit<Profile, "role">;
