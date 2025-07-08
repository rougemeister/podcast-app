//Authentication and User Management Models
export interface LoginCredentials {
  email: string;
  password: string;
}


export interface RegisterCredentials {
  name: string;
  email: string; 
  password: string; 
  password_confirmation: string;
  role: string; 
}

export interface AuthResponse {
  status: string;
  data: any;
  token: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
