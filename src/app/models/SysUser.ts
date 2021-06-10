import { PersonModel } from "./person";

export class SysUserModel {
  sysUser_Id: number;
  sysUser_Username: string;
  sysUser_Password: string;
  sysUser_Type: string;
  sysUser_Person: PersonModel;
}
