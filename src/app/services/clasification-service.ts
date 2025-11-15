import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { environment } from 'src/environments/environment.prod';
import ILeague from '../models/league.model';
import { from } from 'rxjs/internal/observable/from';
import ISeason from '../models/season.model';
import IClasification from '../models/clasification.model';
import { CODE_LEAGUES } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ClasificationService {

    getFootballLeagues() {

        const options = {
            url: `${environment.apiURL}/all_leagues.php`,
            params: {}
        };

        // el from es para convertir la promesa en un observable
        return from(CapacitorHttp.get(options)
            .then((response: HttpResponse) => {
                
                // el as ILeague[] es para indicar el tipo de dato que esperamos recibir
                const leagues = response.data.leagues as ILeague[];

                if (!leagues) {
                    return [];
                }

                return leagues
                    .filter( (league) => CODE_LEAGUES.includes(league.idLeague))
                    .sort((a, b) => a.strLeagueAlternate < b.strLeagueAlternate ? -1 : 1);
                // el includes es para verificar si el idLeague esta en el array CODE_LEAGUES
                // el sort es para ordenar alfabeticamente las ligas por el nombre alternativo, por medio de una funcion de comparacion, en donde si el valor es -1, a va antes que b, si es 1, b va antes que a, y si es 0, no cambia el orden
            })
            .catch((error) => {
                return [];
            }))
    }

    getSeasons(idLeague: string) {

        const options = {
            url: `${environment.apiURL}/search_all_seasons.php?id=${idLeague}`,
            params: {}
        };

        return from(CapacitorHttp.get(options)
            .then((response: HttpResponse) => {

                const seasons = response.data.seasons as ISeason[];

                if (!seasons) {
                    return [];
                }

                // revertimos el orden para tener las temporadas mas recientes primero
                return seasons.reverse();
            })
            .catch((error) => {
                return [];
            }))
    }

    getTableClasification(idLeague: string, season: string) {

        const options = {
            url: `${environment.apiURL}/lookuptable.php?l=${idLeague}&s=${season}`,
            params: {}
        };

        return from(CapacitorHttp.get(options)
            .then((response: HttpResponse) => {
                
                const clasification = response.data.table as IClasification[];

                if (!clasification) {
                    return [];
                }

                return clasification;
            })
            .catch((error) => {
                return [];
            }))
    }

    
}
