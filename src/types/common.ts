export type RequiredProps<Type, Keys extends keyof Type> = 
  Omit<Type, Keys> & Required<Pick<Type, Keys>>;