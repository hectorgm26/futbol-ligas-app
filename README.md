# ⚽ Clasificación Ligas - Ionic Angular Standalone + Capacitor

> 📱 Aplicación móvil híbrida para consultar clasificaciones de las principales ligas de fútbol europeas en tiempo real.

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Configuración de Capacitor](#-configuración-de-capacitor)
- [Arquitectura y Patrones](#-arquitectura-y-patrones)
- [Componentes Principales](#-componentes-principales)
- [Servicios](#-servicios)
- [Pipes Personalizados](#-pipes-personalizados)
- [Estilos y UI](#-estilos-y-ui)
- [Limitaciones de la API](#-limitaciones-de-la-api)
- [Instalación](#-instalación)
- [Generación de Assets](#-generación-de-assets)
- [Comandos Útiles](#-comandos-útiles)

---

## 📖 Descripción

Aplicación móvil desarrollada con **Ionic 7**, **Angular 20 (Standalone)** y **Capacitor ** que permite consultar las clasificaciones actuales de las principales ligas europeas de fútbol. La app consume datos de TheSportsDB API y muestra información detallada de equipos, puntos, forma reciente y estadísticas completas.

Este proyecto está diseñado como **material de referencia** para desarrolladores que trabajan con:
- ✅ Angular Standalone Components
- ✅ Ionic Framework moderno
- ✅ Capacitor para aplicaciones híbridas
- ✅ RxJS y programación reactiva

---

## ✨ Características

- 🏆 **7 Ligas principales**: España, Inglaterra, Alemania, Italia, Francia, Portugal y Países Bajos
- 📊 **Visualización de clasificaciones** con posición, escudo, nombre del equipo y puntos
- 📈 **Últimos 5 resultados** de cada equipo con íconos visuales (W/D/L)
- 📱 **Diseño responsive** optimizado para móviles
- 🔍 **Popover con estadísticas detalladas**: partidos jugados, victorias, empates, derrotas, goles a favor/contra y diferencia de goles
- 🔄 **Selector de temporadas** para consultar clasificaciones históricas
- ⚡ **Programación reactiva** con RxJS Observables
- 🎨 **UI moderna** con Ionic Components y animaciones

---

## 🛠 Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Ionic** | 8.x | Framework UI para aplicaciones híbridas |
| **Angular** | 20.x | Framework frontend con Standalone Components |
| **Capacitor** | 7.x | Runtime nativo para ejecutar en iOS/Android |
| **TypeScript** | 5.x | Lenguaje tipado para JavaScript |
| **RxJS** | 7.x | Programación reactiva con Observables |
| **Capacitor HTTP** | Plugin nativo | Peticiones HTTP optimizadas |
| **Ionicons** | 7.x | Librería de iconos |

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── constants/
│   │   └── index.ts                    # Códigos de ligas seleccionadas
│   ├── models/
│   │   ├── league.model.ts             # Interfaz de Liga
│   │   ├── season.model.ts             # Interfaz de Temporada
│   │   └── clasification.model.ts      # Interfaz de Clasificación
│   ├── pages/
│   │   └── clasification-table/
│   │       ├── clasification-table.page.html
│   │       ├── clasification-table.page.ts
│   │       └── clasification-table.page.scss
│   ├── pipes/
│   │   └── reverse-pipe.ts             # Pipe para invertir strings
│   ├── services/
│   │   └── clasification-service.ts    # Servicio API
│   └── app.routes.ts                   # Configuración de rutas
├── environments/
│   └── environment.prod.ts             # Variables de entorno
├── global.scss                         # Estilos globales
└── theme/
    └── variables.scss                  # Variables de tema Ionic
```

---

## ⚙️ Configuración de Capacitor

### `capacitor.config.ts`

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.futbolligas.app',
  appName: 'Clasificacion Ligas',
  webDir: 'www',
  android: {
    adjustMarginsForEdgeToEdge: 'force',
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
```

### 🔧 Explicación de la Configuración

#### **`adjustMarginsForEdgeToEdge: 'force'`**
Esta configuración es crucial para dispositivos Android modernos con **notch**, **cámara en pantalla** o **navegación gestual**. 

**¿Qué hace?**
- Fuerza a la aplicación a extenderse hasta los bordes de la pantalla
- Permite que el contenido utilice toda la superficie disponible
- Gestiona automáticamente los márgenes de seguridad (safe areas)

**¿Por qué es importante?**
En Android 10+ con gestos, sin esta configuración la app tendría márgenes negros en la parte superior e inferior. Con `'force'` activado, la app se ve moderna y aprovecha toda la pantalla.

**Complemento en CSS:**
```scss
// global.scss
ion-header {
    // Margen automático según notch o barra de estado 
    margin-top: env(safe-area-inset-top, 0px);
}
```

La función CSS `env(safe-area-inset-top)` lee el área segura del dispositivo y aplica el margen necesario para que el header no quede oculto detrás del notch o la barra de estado.

#### **`CapacitorHttp: { enabled: true }`**
Habilita el plugin nativo de HTTP de Capacitor.

**Ventajas sobre `HttpClient` de Angular:**
- ✅ Evita problemas de CORS en dispositivos móviles
- ✅ Mejor rendimiento en peticiones nativas
- ✅ Manejo automático de certificados SSL
- ✅ Compatible con políticas de seguridad de iOS/Android

---

## 🏗 Arquitectura y Patrones

### **Standalone Components (Angular 18+)**

Este proyecto utiliza la nueva arquitectura de componentes standalone, eliminando la necesidad de `NgModule`:

```typescript
@Component({
  selector: 'app-clasification-table',
  templateUrl: './clasification-table.page.html',
  styleUrls: ['./clasification-table.page.scss'],
  standalone: true,  // ✅ Componente independiente
  imports: [
    IonContent, IonHeader, IonTitle,
    CommonModule, FormsModule, AsyncPipe,
    ReversePipe, NgClass
  ],
})
export class ClasificationTablePage implements OnInit { }
```

**Ventajas:**
- Carga bajo demanda (lazy loading) más eficiente
- Menos boilerplate code
- Mejor tree-shaking
- Imports explícitos y claros

### **Programación Reactiva con RxJS**

Uso extensivo de Observables para gestionar flujos de datos asíncronos:

```typescript
public leagues$: Observable<ILeague[]> = this.clasificationService.getFootballLeagues();
public seasons$: Observable<ISeason[]> = new Observable<ISeason[]>();
public clasification$: Observable<IClasification[]> = new Observable<IClasification[]>();
```

**Convención de nomenclatura:**
- El sufijo `$` indica que la variable es un Observable
- Permite identificar rápidamente flujos reactivos en el código

### **Dependency Injection con `inject()`**

Angular 18+ introduce la función `inject()` como alternativa moderna al constructor:

```typescript
private clasificationService = inject(ClasificationService);
```

**Ventajas:**
- Sintaxis más concisa
- Inyección condicional más flexible
- Compatible con funciones fuera de clases

---

## 🧩 Componentes Principales

### **ClasificationTablePage**

Componente principal que orquesta toda la funcionalidad de la aplicación.

#### **Template HTML - Conceptos Clave**

##### **1. Control Flow Moderno (@if, @for)**

Angular 17+ introduce una nueva sintaxis de control de flujo:

```html
@if(leagues$ | async; as leagues) {
    <ion-select>
        @for (league of leagues; track league.idLeague) {
            <ion-select-option [value]="league.idLeague">
                {{ league.strLeagueAlternate || league.strLeague }}
            </ion-select-option>
        }
    </ion-select>
}
```

**Ventajas sobre `*ngIf` y `*ngFor`:**
- ✅ Sintaxis más clara y legible
- ✅ Mejor rendimiento en compilación
- ✅ Menos directivas estructurales anidadas
- ✅ Obligación de usar `track` para optimización

##### **2. Async Pipe + Observable Unwrapping**

```html
@if(clasification$ | async; as clasifications) {
    <!-- clasifications ya está desempaquetado -->
}
```

**¿Qué hace el `async` pipe?**
- Suscribe automáticamente al Observable
- Desempaqueta el valor emitido
- Se desuscribe automáticamente al destruir el componente (previene memory leaks)

##### **3. Two-Way Binding con `[(ngModel)]`**

```html
<ion-select 
    [(ngModel)]="idLeagueSelected"
    (ionChange)="getSeasons()"
>
```

**Explicación:**
- `[(ngModel)]`: Banana in a box syntax - enlace bidireccional
- Actualiza automáticamente `idLeagueSelected` cuando cambia el select
- `(ionChange)`: Event listener que ejecuta `getSeasons()` al cambiar

##### **4. Switch Case con Nueva Sintaxis**

```html
@for (form of clasification.strForm | reverse; track form; let last = $last) {
    @switch (form) {
        @case('W') {
            <ion-icon name="checkmark-circle" color="success"></ion-icon>
        }
        @case('D') {
            <ion-icon name="remove-circle" color="medium"></ion-icon>
        }
        @case('L') {
            <ion-icon name="close-circle" color="danger"></ion-icon>
        }
    }
}
```

**Detalles importantes:**
- `let last = $last`: Variable de contexto que indica si es el último elemento
- Usado para aplicar la clase `recent-result` al resultado más reciente
- `clasification.strForm` contiene un string tipo `"WWDLW"` (Win, Win, Draw, Loss, Win)

##### **5. Popover con Trigger Dinámico**

```html
<ion-row [attr.id]="'row-' + index">
    <!-- Contenido de la fila -->
</ion-row>

<ion-popover 
    [trigger]="'row-' + index"
    triggerAction="click"
    size="cover">
    <ng-template>
        <!-- Estadísticas detalladas -->
    </ng-template>
</ion-popover>
```

**Cómo funciona:**
- Cada fila tiene un ID único: `row-0`, `row-1`, etc.
- El popover se vincula a ese ID mediante `[trigger]`
- Al hacer click en la fila, se muestra el popover con estadísticas completas

#### **Lógica TypeScript - Métodos Principales**

##### **`ngOnInit()`**

```typescript
ngOnInit() {
    addIcons({
        checkmarkCircle,
        removeCircle,
        closeCircle
    })
    
    this.getSeasons();
}
```

**Registro de íconos:**
- Ionic 7 requiere registro explícito de íconos para tree-shaking
- Solo se empaquetan los íconos que realmente se usan

##### **`getSeasons()`**

```typescript
getSeasons() {
    this.seasons$ = this.clasificationService.getSeasons(this.idLeagueSelected);

    // El pipe(first()) toma solo el primer valor emitido y completa
    this.seasons$.pipe(first()).subscribe({
        next: (seasons: ISeason[]) => {
            if(seasons.length > 0) {
                this.seasonSelected = seasons[0].strSeason;
                this.changeClasification(); // Efecto cascada
            }
        }
    })
}
```

**Patrón de efecto cascada:**
1. Se obtienen las temporadas de la liga seleccionada
2. Se selecciona automáticamente la temporada más reciente (index 0 después del reverse)
3. Se dispara automáticamente la carga de la clasificación

**`pipe(first())`:**
- Operador RxJS que toma solo la primera emisión
- Completa el Observable automáticamente
- Previene memory leaks en suscripciones puntuales

##### **`changeClasification()`**

```typescript
changeClasification() {
    this.clasification$ = this.clasificationService.getTableClasification(
        this.idLeagueSelected, 
        this.seasonSelected
    );
}
```

Método simple que actualiza el Observable de clasificación. El `async` pipe en el template se encarga de la suscripción.

---

## 🔌 Servicios

### **ClasificationService**

Servicio singleton que gestiona todas las peticiones HTTP a la API.

```typescript
@Injectable({
  providedIn: 'root', // Servicio singleton a nivel raíz
})
export class ClasificationService { }
```

#### **1. `getFootballLeagues()`**

```typescript
getFootballLeagues() {
    const options = {
        url: `${environment.apiURL}/all_leagues.php`,
        params: {}
    };

    // Convertir promesa en observable con 'from'
    return from(CapacitorHttp.get(options)
        .then((response: HttpResponse) => {
            const leagues = response.data.leagues as ILeague[];

            if (!leagues) {
                return [];
            }

            return leagues
                .filter((league) => CODE_LEAGUES.includes(league.idLeague))
                .sort((a, b) => a.strLeagueAlternate < b.strLeagueAlternate ? -1 : 1);
        })
        .catch((error) => {
            return [];
        }))
}
```

**Análisis línea por línea:**

1. **`from()`**: Operador RxJS que convierte una Promesa en Observable
   - CapacitorHttp devuelve Promesas
   - Los componentes trabajan con Observables
   - `from()` hace la conversión

2. **`response.data.leagues as ILeague[]`**: Type assertion de TypeScript
   - Indica al compilador que trate `leagues` como array de `ILeague`
   - Proporciona autocompletado e intellisense

3. **`.filter()`**: Filtra solo las ligas incluidas en `CODE_LEAGUES`
   ```typescript
   export const CODE_LEAGUES = [
     '4335', // La Liga (España)
     '4328', // Premier League (Inglaterra)
     '4332', // Bundesliga (Alemania)
     '4331', // Serie A (Italia)
     '4334', // Ligue 1 (Francia)
     '4337', // Primeira Liga (Portugal)
     '4338', // Eredivisie (Países Bajos)
   ];
   ```

4. **`.sort()`**: Ordena alfabéticamente por nombre alternativo
   ```typescript
   (a, b) => a.strLeagueAlternate < b.strLeagueAlternate ? -1 : 1
   ```
   - Retorna `-1`: `a` va antes que `b`
   - Retorna `1`: `b` va antes que `a`
   - Retorna `0`: mantiene el orden actual

#### **2. `getSeasons(idLeague: string)`**

```typescript
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

            // Revertir el orden para tener las temporadas más recientes primero
            return seasons.reverse();
        })
        .catch((error) => {
            return [];
        }))
}
```

**Detalle importante:**
- `.reverse()`: La API devuelve temporadas desde la más antigua
- Invertimos para que `2024-2025` aparezca primero
- El componente selecciona `seasons[0]` como defecto

#### **3. `getTableClasification(idLeague: string, season: string)`**

```typescript
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
```

**Parámetros de la API:**
- `l`: ID de la liga (ej: `4335`)
- `s`: Temporada (ej: `2024-2025`)

---

## 🔄 Pipes Personalizados

### **ReversePipe** - Invertir Strings

```typescript
@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: string): string {
    return value.split('').reverse().join(''); 
  }

}
```

**¿Cómo funciona?**

Ejemplo: `"WDLLW"` → `"WLLDW"`

1. **`.split('')`**: Convierte el string en array de caracteres
   - `"WDLLW"` → `['W', 'D', 'L', 'L', 'W']`

2. **`.reverse()`**: Invierte el array
   - `['W', 'D', 'L', 'L', 'W']` → `['W', 'L', 'L', 'D', 'W']`

3. **`.join('')`**: Une el array en un string
   - `['W', 'L', 'L', 'D', 'W']` → `"WLLDW"`

**¿Por qué se invierte?**
La API devuelve `strForm` del partido más antiguo al más reciente. Queremos mostrar el partido más reciente primero (de derecha a izquierda en la UI).

**Uso en el template:**
```html
@for (form of clasification.strForm | reverse; track form; let last = $last) {
    <!-- last = true en el primer elemento después de reverse -->
}
```

---

## 🎨 Estilos y UI

### **Global SCSS**

```scss
ion-header {
    // Margen automático según notch o barra de estado 
    margin-top: env(safe-area-inset-top, 0px);
}
```

**Función CSS `env()`:**
- Lee variables de entorno del navegador
- `safe-area-inset-top`: Área segura superior del dispositivo
- Fallback a `0px` si no está disponible
- Esencial para dispositivos con notch (iPhone X+, Android con cámara en pantalla)

---

## ⚠️ Limitaciones de la API

### **TheSportsDB API - Free Tier**

🚨 **IMPORTANTE:** Este proyecto utiliza la versión gratuita de TheSportsDB API, que tiene las siguientes limitaciones:

- **Solo 5 equipos por clasificación**: La API free no devuelve la tabla completa
- **100 requests por día**: Límite diario de peticiones
- **Retraso en datos**: Actualización no en tiempo real

### **Comparación Free vs Premium**

| Característica | Free 🆓 | Premium 💎 |
|----------------|---------|-----------|
| Equipos por tabla | 5 | Todos (20+) |
| Requests diarios | 100 | Ilimitados |
| Actualización | Diferida | Tiempo real |
| Coste | $0 | $3/mes |

### **Workaround Implementado**

```typescript
if (!clasification) {
    return [];
}

return clasification; // Solo 5 equipos
```

En producción con API Premium, se obtendría la tabla completa de 20 equipos.

**Mensaje en UI:**
```html
@if(clasifications.length === 0) {
    <ion-text class="ion-text-center">No hay datos</ion-text>
}
```

---

## 📦 Instalación

### **Requisitos Previos**

- Node.js 18+ y npm
- Angular CLI 18+
- Ionic CLI 7+
- Android Studio (para Android)
- Xcode (para iOS, solo en Mac)

### **Pasos de Instalación**

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/clasificacion-ligas.git
cd clasificacion-ligas

# 2. Instalar dependencias
npm install

# 3. Ejecutar en navegador
ionic serve

# 4. Sincronizar con plataformas nativas
npx cap sync

# 5. Abrir en Android Studio
npx cap open android

# 6. Abrir en Xcode (Mac)
npx cap open ios
```

---

## 🎨 Generación de Assets

Este proyecto utiliza el generador oficial de assets de Capacitor para crear automáticamente todos los tamaños de iconos y splash screens necesarios para iOS y Android.

### **Configuración de Assets**

```bash
npx @capacitor/assets generate
```

### **Estructura de Carpeta `resources/`**

```
resources/
├── icon.png          # 1024x1024px - Icono base
└── splash.png        # 2732x2732px - Splash screen base
```

**Requisitos de las imágenes fuente:**
- **icon.png**: 
  - Dimensiones: 1024x1024px mínimo
  - Formato: PNG con transparencia
  - Diseño centrado con márgenes de seguridad
  
- **splash.png**:
  - Dimensiones: 2732x2732px (iPad Pro 12.9")
  - Formato: PNG
  - Contenido centrado en área segura de 1200x1200px

### **Assets Generados Automáticamente**

El comando genera:
- **Android**: `android/app/src/main/res/` con todos los densities (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi)
- **iOS**: `ios/App/App/Assets.xcassets/` con todos los tamaños (@1x, @2x, @3x)
- **PWA**: `public/` con manifest icons

### **Ejemplo de Generación**

```bash
# En la raíz del proyecto
npx @capacitor/assets generate --iconBackgroundColor '#ffffff' --splashBackgroundColor '#3880ff'
```

**Opciones disponibles:**
- `--iconBackgroundColor`: Color de fondo del icono (hex)
- `--splashBackgroundColor`: Color de fondo del splash
- `--pwa`: Generar también assets para PWA

---

## 🚀 Comandos Útiles

```bash
# Desarrollo
ionic serve                    # Servidor de desarrollo en navegador
ionic serve --lab             # Vista simultánea iOS/Android/Desktop

# Build
ionic build                    # Build de producción
ionic build --prod            # Build optimizado

# Capacitor
npx cap sync                   # Sincronizar cambios web con nativo
npx cap sync android          # Solo Android
npx cap sync ios              # Solo iOS

npx cap open android          # Abrir en Android Studio
npx cap open ios              # Abrir en Xcode

npx cap run android           # Compilar y ejecutar en Android
npx cap run android -l        # Con live reload
npx cap run ios              # Compilar y ejecutar en iOS

# Assets
npx @capacitor/assets generate # Generar iconos y splash screens

# Actualizar Capacitor
npm install @capacitor/core@latest @capacitor/cli@latest
npx cap sync
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría realizar.

---

## 📧 Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme.
