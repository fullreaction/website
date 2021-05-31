export interface User {
  user_id: string | Buffer;
  user_email: string;
  user_pass: string;
  updated_at: Date;
}
