import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { Storageservice } from '../services/storageservice';

describe('AuthGuard (Class)', () => {

  let guard: AuthGuard;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockStorage: jasmine.SpyObj<Storageservice>;

  beforeEach(() => {

    // Creamos los mocks de los servicios inyectados en AuthGuard
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockStorage = jasmine.createSpyObj('Storageservice', ['getUsuarioSesion']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: mockRouter },
        { provide: Storageservice, useValue: mockStorage }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  // ------------------------------------------------
  // TEST 1: El guard se crea correctamente
  // ------------------------------------------------
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // ------------------------------------------------
  // TEST 2: Permite acceso si hay usuario en sesión
  // ------------------------------------------------
  it('should allow activation when user exists', async () => {

    const perfilMock = {
    nombre: 'Daniel',
    correo: 'daniel@mail.com',
    password: '1234',
    telefono: '99999999'
  };

    // Simular que sí existe usuario en la sesión
    mockStorage.getUsuarioSesion.and.returnValue(Promise.resolve(perfilMock));

    const result = await guard.canActivate();

    expect(result).toBeTrue();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  // ------------------------------------------------
  // TEST 3: Bloquea acceso si NO hay usuario
  // ------------------------------------------------
  it('should deny activation and redirect to /inicio when user does NOT exist', async () => {

    // Simular que NO existe usuario
    mockStorage.getUsuarioSesion.and.returnValue(Promise.resolve(null));

    const result = await guard.canActivate();

    expect(result).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/inicio']);
  });

});
