import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Pagina2Page } from './pagina2.page';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Validaciones } from 'src/app/services/validaciones';
import { Storageservice } from 'src/app/services/storageservice';
import { Bdlocal } from 'src/app/services/bdlocal';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

fdescribe('Pagina2Page', () => {
  let component: Pagina2Page;
  let fixture: ComponentFixture<Pagina2Page>;
  
  let service: Bdlocal;

  let mockToastController: any;
  let mockRouter: any;
  let mockValidaciones: any;
  let mockStorage: any; 

beforeEach(waitForAsync(() => {

  const mockBdlocal = {
    agregarPerfil: jasmine.createSpy('agregarPerfil').and.returnValue(Promise.resolve(true)),
    getPerfiles: jasmine.createSpy('getPerfiles').and.returnValue(Promise.resolve([]))
  };

  mockStorage = jasmine.createSpyObj('Storageservice', ['registrarUsuario']);
  mockValidaciones = jasmine.createSpyObj('Validaciones', ['obligatorio', 'validaMail', 'validaNum']);
  mockRouter = jasmine.createSpyObj('Router', ['navigate']);

  mockToastController = {
    create: jasmine.createSpy('create').and.returnValue(
      Promise.resolve({ present: jasmine.createSpy('present') })
    )
  };

  TestBed.configureTestingModule({
    declarations: [Pagina2Page],
    imports: [
      FormsModule,
      IonicModule.forRoot()
    ],
    providers: [
      { provide: Bdlocal, useValue: mockBdlocal },

      {
        provide: SQLite,
        useValue: {
          create: jasmine.createSpy('create').and.returnValue(
            Promise.resolve({
              executeSql: jasmine.createSpy('executeSql').and.returnValue(
                Promise.resolve({
                  rows: {
                    length: 0,
                    item: (i: number) => null
                  }
                })
              )
            })
          )
        }
      },

      { provide: ToastController, useValue: mockToastController },
      { provide: Router, useValue: mockRouter },
      { provide: Validaciones, useValue: mockValidaciones },
      { provide: Storageservice, useValue: mockStorage },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }).compileComponents();

  service = TestBed.inject(Bdlocal);

  fixture = TestBed.createComponent(Pagina2Page);
  component = fixture.componentInstance;
  fixture.detectChanges();
}));

  //------- Prueba 1 ---------
  it('registra usuario cuando registrarUsuario devuelve true', async () => {
    spyOn(window, 'alert');

    component.nombre = 'Esteban';
    component.correo = 'esteban@mail.com';
    component.password = 'password';
    component.telefono = '999999999';

    mockStorage.registrarUsuario.and.returnValue(Promise.resolve(true));

    await component.registrar();

    expect(mockStorage.registrarUsuario).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Usuario registrado con éxito');
  });

  // ----------------- prueba 2 -----------------

  it('mostrar alerta cuando registrarUsuario devuelva false', async() => {
    spyOn(window, 'alert');

    mockStorage.registrarUsuario.and.returnValue(Promise.resolve(false));

    await component.registrar();

    expect(window.alert).toHaveBeenCalledWith('El correo ya está registrado');
  })


});
