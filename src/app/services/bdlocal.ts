import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Perfiles } from '../interfaces/perfiles';
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
  tblPerfil:string = "CREATE TABLE IF NOT EXISTS perfiles(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(100) NOT NULL, correo VARCHAR(100) NOT NULL, password VARCHAR(255) NOT NULL, telefono VARCHAR(50) NOT NULL);"; 

  listaPerfiles = new BehaviorSubject<Perfiles[]>([]); 
  private isDbReady: 
  BehaviorSubject<boolean> = new BehaviorSubject(false);

  perfiles: Perfiles[] = [];
  private _storage: Storage | null=null;

  constructor(private sqlite: SQLite, private platform: Platform, private storage: Storage, public toastController: ToastController){
    this.Init();
    this.cargarPerfiles();
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
      this.presentToast("Tabla creada"); 
      this.cargarPerfiles(); 
      this.isDbReady.next(true); 
    } catch (error) { 
      this.presentToast("Error en Crear Tabla: " + error); 
    } 
  }

  cargarPerfiles() { 
    if (!this.database) {
    console.error("❌ La base de datos no está inicializada aún");
    return [];
  }
    let items: Perfiles[] = []; 
    this.database.executeSql('SELECT * FROM perfiles', []) 
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

  async Init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  guardarPerfiles(nombre: string, password: string, correo: string, telefono: number){
    const existe = this.perfiles.find(c => c.correo === correo);
    if (!existe){
      this.perfiles.unshift({nombre:nombre, password:password, correo:correo, telefono:telefono})
      this._storage?.set('perfiles',this.perfiles);
      this.presentToast("Usuario agregado con éxito!")
    }else{
      this.presentToast("Ya existe un usuario con el correo ingresado.")
    }
  }

   async agregarPerfil(nombre: any, correo: any, password: any, telefono: any) { 
    let data = [nombre,correo,password,telefono]; 
    await this.database.executeSql('INSERT INTO perfiles(nombre,correo,password,telefono) VALUES(?,?,?,?)', data); 
    this.cargarPerfiles();
  }


  async quitarPerfiles(correo: string){
    const existe=this.perfiles.find(c =>c.correo === correo)
    if (existe){
      this.perfiles=this.perfiles.filter(c=>c.correo!== correo);
      this._storage?.set('perfiles',this.perfiles);
      this.presentToast("Se ha eliminado perfil")
    }else{
      this.presentToast("El correo no se encuentra registrado")
    }
  }

  async borrarBD(){
    await this._storage?.clear();
    this.perfiles=[];
    console.log(this.perfiles.length);
    this.presentToast("Se ha eliminado la BD");
  }

  dbState() { 
      return this.isDbReady.asObservable(); 
    }

  fetchNoticias(): Observable<Perfiles[]> { 
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
