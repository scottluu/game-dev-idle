type OauthResponseSchema = {
  access_token: string;
  token_type: string;
  refresh_token: string | null;
  expires_in: number;
};
