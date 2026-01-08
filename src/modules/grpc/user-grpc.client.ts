import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import type { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { ComparePasswordResponse, User, UsersService } from "src/types/user/user-grpc.type";
 
@Injectable()
export class UserGrpcClient implements OnModuleInit {
  private usersService: UsersService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService = this.client.getService<UsersService>('UsersService');
  }

  GetUserByEmail(data: {email: string}): Observable<User> {
    return this.usersService.getUserByEmail(data);
  }

  checkPassword(data: {password: string, email: string}): Observable<ComparePasswordResponse>{
    return this.usersService.checkPassword(data)
  }

  changePassword(data: {_id: string, oldPassword: string, newPassword: string}): Observable<User>{
    return this.usersService.changePassword(data)
  }
}
