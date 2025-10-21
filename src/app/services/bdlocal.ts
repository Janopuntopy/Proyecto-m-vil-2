import { Injectable } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { __awaiter } from 'tslib';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Perfil } from '../clase/perfil';


@Injectable({
  providedIn: 'root'
})
export class Bdlocal {
  public database!: SQLiteObject; 
  tblPerfil:string = "CREATE TABLE IF NOT EXISTS perfil(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(100) NOT NULL, correo VARCHAR(100) NOT NULL, password VARCHAR(255) NOT NULL, telefono VARCHAR(50) NOT NULL, login INTEGER DEFAULT 0);"; 

  listaPerfiles = new BehaviorSubject<Perfil[]>([]); 
  private isDbReady: 
  BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, public toastController: ToastController){
    this.crearBD();
  }

  crearBD() {
     this.platform.ready().then(() => { 
      this.sqlite.create({ 
        name: 'perfiles.db', 
        location: 'default' 
      }).then((db: SQLiteObject) => { 
        this.database = db; 
        this.presentToast("BD creada"); 
        //llamo a crear la(s) tabla(s) 
        this.crearTablas();
      }).catch(e => this.presentToast(e)); 
    }) 
  } 
  
  async crearTablas() { 
    try { 
      await this.database.executeSql(this.tblPerfil, []); 
      this.cargarPerfiles(); 
      this.isDbReady.next(true); 
    } catch (error) { 
      this.presentToast("Error en Crear Tabla: " + error); 
    } 
  }

  //trae todos los datos existentes
  cargarPerfiles() {
    let items: Perfil[] = []; 
    this.database.executeSql('SELECT * FROM perfil', []) 
      .then(res => { 
        if (res.rows.length > 0) { 
          for (let i = 0; i < res.rows.length; i++) { 
            items.push({
              nombre: res.rows.item(i).nombre,
              correo: res.rows.item(i).correo, 
              password: res.rows.item(i).password,
              telefono: res.rows.item(i).telefono
            });
          } 
        } 
      }); 
    this.listaPerfiles.next(items);
    return items;
  }

  //inserta perfil en la tabla
  async agregarPerfil(nombre: any, correo: any, password: any, telefono: any) { 
    let data = [nombre,correo,password,telefono]; 
    await this.database.executeSql('INSERT INTO perfil(nombre,correo,password,telefono) VALUES(?,?,?,?)', data); 
    this.cargarPerfiles();
  }

  //verifica inicio de sesion con usuario existente
  /*/async login(correo: string, password: string): Promise<boolean>{
    if (!this.database) return false;

    try{
      const resultado = await this.database.executeSql(
        'SELECT * FROM perfiles WHERE correo = ? AND password = ?',
        [correo, password]
      );
      if (resultado.rows.length > 0){
        await this.database.executeSql(
          'UPDATE perfiles SET login = 1 WHERE correo = ?',
          [correo]
        );
      }
      return resultado.rows.length > 0;
    }catch (e){
      this.presentToast('Usuario incorrecto');
      return false;
    }
  }*/

  async autenticar(correo: string): Promise<boolean>{
    const resultado = await this.database.executeSql(
      'SELECT * FROM perfil WHERE correo = ?',
      [correo]
    );
    return resultado.rows.length > 0;
  }

  dbState() { 
    return this.isDbReady.asObservable(); 
  }

  fetchPerfiles(): Observable<Perfil[]> { 
    return this.listaPerfiles.asObservable(); 
  }

  async presentToast(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      translucent:true,
      color:'medium',
      position:'top',
      duration:2000
    })
    toast.present();
  }

}
