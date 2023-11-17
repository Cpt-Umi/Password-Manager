export interface Password {
  id: number;
  pass: string;
  app: string;
  iv: string;
}

export interface Encryption {
  id: number;
  password: string;
  iv: string;
}
