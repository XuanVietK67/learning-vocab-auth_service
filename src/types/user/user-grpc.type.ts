import { Observable } from "rxjs";

export type User={
    id: string
    username: string
    email: string
    password: string
    avatar?: string
    role: string
}


export interface UsersService{
  getUserByEmail(data: {email: string}):  Observable<User>
  checkPassword(data: {password: string, email: string}): Observable<ComparePasswordResponse>
  changePassword(data: {_id: string, oldPassword: string, newPassword: string}): Observable<User>
}

export interface ComparePasswordResponse {
  check: boolean;
}