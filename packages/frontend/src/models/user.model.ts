export interface User {
  user_id?: number;
  user_email?: string;
  user_pass?: string;
  updated_at: Date;
  errors: Map<string, string>;
  [key: string]: any;
}
