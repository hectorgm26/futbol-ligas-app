import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption,
  IonText,
  IonImg,
  IonIcon, IonPopover } from '@ionic/angular/standalone';
import { ClasificationService } from 'src/app/services/clasification-service';
import { first, Observable } from 'rxjs';
import ISeason from 'src/app/models/season.model';
import ILeague from 'src/app/models/league.model';
import IClasification from 'src/app/models/clasification.model';
import { addIcons } from 'ionicons';
import { checkmarkCircle, removeCircle, closeCircle } from 'ionicons/icons';
import { ReversePipe } from 'src/app/pipes/reverse-pipe';

@Component({
  selector: 'app-clasification-table',
  templateUrl: './clasification-table.page.html',
  styleUrls: ['./clasification-table.page.scss'],
  standalone: true,
  imports: [IonPopover, IonIcon, IonImg, IonText, IonSelect, IonSelectOption, IonCol, IonRow, IonGrid, 
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    AsyncPipe,
    ReversePipe,
    NgClass
  ],
})
export class ClasificationTablePage implements OnInit {

    private clasificationService = inject(ClasificationService);

    // con el $ indicamos que es un observable y podemos acceder a el con el async pipe
    public leagues$: Observable<ILeague[]> = this.clasificationService.getFootballLeagues();

    // ACA no podemos iniciar el servicio porque todavia no tenemos la liga seleccionada
    public seasons$: Observable<ISeason[]> = new Observable<ISeason[]>();

    // ACA no podemos iniciar el servicio porque todavia no tenemos la liga y temporada seleccionada
    public clasification$: Observable<IClasification[]> = new Observable<IClasification[]>();

    
    public idLeagueSelected = '4335'; // Muestra por defecto la Liga Española en Home
    public seasonSelected = ''; 

    ngOnInit() {
        
        addIcons({
            checkmarkCircle,
            removeCircle,
            closeCircle
        })

        this.getSeasons();
    }

    getSeasons() {
        this.seasons$ = this.clasificationService.getSeasons(this.idLeagueSelected);

        // el pipe(first()) es para tomar solo el primer valor emitido por el observable y luego completar, para evitar memory leaks y tener observables abiertos
        this.seasons$.pipe(first()).subscribe({
            next: (seasons: ISeason[]) => {
                
                if(seasons.length > 0) {

                    // antes el [0] era la primera, pero ahora con el reverse es la primera
                    this.seasonSelected = seasons[0].strSeason;
                    // Selecciona la temporada mas reciente por defecto

                    // efecto cadena para cargar la clasificacion despues de obtener las temporadas
                    this.changeClasification();
                }
            }
        })
    }

    changeClasification() {

        this.clasification$ = this.clasificationService.getTableClasification(this.idLeagueSelected, this.seasonSelected);
    }

}
