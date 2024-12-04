export interface UserDto {
  status: string;
  data: UserDetail;
}

export interface UserDetail {
  id: number;
  createAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  phoneNumber: null;
  photo: null;
  role: Role[];
  comapny: Company;
}

interface Role {
  id: number;
  name: string;
}

interface Company {
  id: number;
  name: string;
  timeZone: string;
}
