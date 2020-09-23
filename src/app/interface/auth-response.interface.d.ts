import {UserPathEnum, UserRoleEnum} from '../enum';
import {AjaxResponseInterface} from './ajax-response.interface';

export declare interface AuthResponseInterface extends AjaxResponseInterface {
  token: string;
  profile: {
    uuid: string;
    firstName: string;
    lastName: string;
    thumbnail: string;
    role: UserRoleEnum;
    path: UserPathEnum;
  };
  settings: string;
}
