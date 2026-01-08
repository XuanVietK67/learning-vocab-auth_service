export class UserAuth{
    userId: string
    email: string
}

export class ChangePasswordDto{
    oldPassword: string
    newPassword: string
}

export class dataChangePassword{
    user: UserAuth
    data: ChangePasswordDto
}