import { Component, inject, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-dialog',
  template: `<h2 mat-dialog-title>Deletar produto</h2>
          <mat-dialog-content>
          Tem certeza que deseja deletar este produto?
        </mat-dialog-content>
          <mat-dialog-actions align="end">
            <button mat-button (click)="onNot()">Não</button>
            <button mat-button cdkFocusInitial (click)="onYes()">Sim</button>
          </mat-dialog-actions>`,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmationDialogComponent {

  matDialogRef = inject(MatDialogRef);

  onNot() {
    this.matDialogRef.close(false);
  }

  onYes() {
    this.matDialogRef.close(true);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
  matDialog = inject(MatDialog);

  constructor() { }

  openDialog(): Observable<boolean> {
   return this.matDialog.open(ConfirmationDialogComponent, {})
          .afterClosed();          
        }           
}
