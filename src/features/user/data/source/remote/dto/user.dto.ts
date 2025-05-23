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
  phoneNumber: string | null;
  photo: string | null;
  roles: Role[];
  company: Company;
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
