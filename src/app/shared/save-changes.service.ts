import { Injectable } from '@angular/core';

@Injectable()
export class SaveChangesService {
  edditMode: boolean;
  isChanged: boolean;
  isChangesSaved: boolean;
  constructor() {
    this.isChangesSaved= false;
    this.edditMode = false;
    this.isChanged = false;
   }
  

}
