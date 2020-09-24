export declare interface MessageInterface {
  id: number;
  name: string;
  email: string;
  message: string;
  subscribed: boolean;
  captcha: string;
  createAt?: Date;
}
