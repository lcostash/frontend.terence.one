import {UserPathEnum, UserRoleEnum} from '../enum';

export declare interface AuthInterface {
  uuid: string;
  firstName: string;
  lastName: string;
  role: UserRoleEnum;
  path: UserPathEnum;
  isLogged: boolean;
}
