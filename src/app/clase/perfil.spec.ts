import { Perfil } from './perfil';

describe('Perfil', () => {
  it('should create an instance', () => {
  const perfil = new Perfil('Juan', 'juan@mail.com', '1234', '999999');
  expect(perfil).toBeTruthy();
  });
});
