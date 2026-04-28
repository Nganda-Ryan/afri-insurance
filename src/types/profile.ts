export interface IUserProfileDto {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  isGuest: boolean;
  hasPassword: boolean;
}

export interface IUpdateProfileInfoRequestDto {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface IUpdatePasswordRequestDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
