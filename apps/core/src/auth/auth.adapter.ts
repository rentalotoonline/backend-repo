import LoginResponseDto from "../../../dto/src/users/login.response.dto";
import CreateUserResponse from "../../../dto/src/users/create.user.response";
import LoginRequest from "../../../dto/src/users/login.request";
import LoginDto from "../../../dto/src/users/LoginDto";
import Users from "../users/Users";
import PersonalAccessToken from "./personal.access.token";
import AuthResponseDto from "../../../dto/src/users/auth.response.dto";
import UserAdapter from "../users/user.adapter";


export default class AuthAdapter{
  static createLoginResponse(user:CreateUserResponse,token:string):LoginResponseDto{
		return new LoginResponseDto().setUser(user).setToken(token)
  }

  static createLoginDto(request:LoginRequest):LoginDto{
	return new LoginDto().setEmail(request.email).setPassword(request.password)
  }

  static createEntity(user: Users, token: string, expiryTime: number){
	return new PersonalAccessToken().setToken(token).setUser(user).setExpiry(expiryTime)
  }

  static createLoginWithTokenResponse(app:PersonalAccessToken):AuthResponseDto{
		return new AuthResponseDto()
		  .setUser(UserAdapter.entityToResponse(app.getUser()))
		  .setID(app.id)
		  .setToken(app.token)
  }
}