import { AuthService } from '../auth/auth.service';
import { accessToken } from './access-token.mock';
import { jwtPayload } from './jwt-payload.mock';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    createToken: jest.fn().mockReturnValue({ accessToken }),
    checkToken: jest.fn().mockReturnValue(jwtPayload),
    isValidToken: jest.fn().mockReturnValue(true),
    login: jest.fn().mockReturnValue({ accessToken }),
    forget: jest.fn().mockResolvedValue({ success: true }),
    reset: jest.fn().mockReturnValue({ accessToken }),
    register: jest.fn().mockReturnValue({ accessToken }),
  },
};
