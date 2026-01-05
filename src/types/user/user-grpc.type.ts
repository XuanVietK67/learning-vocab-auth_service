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
  GetUserByEmail(data: {email: string}):  Observable<User>
  checkPassword(data: {password: string, email: string}): Observable<ComparePasswordResponse>
}

export interface ComparePasswordResponse {
  check: boolean;
}