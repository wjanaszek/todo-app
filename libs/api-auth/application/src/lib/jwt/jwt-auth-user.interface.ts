export interface JwtAuthUser<Id = string> {
  id: Id;
  password: string;
}
