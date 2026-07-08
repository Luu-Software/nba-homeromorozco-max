import { cuandoPasa, enviarAlFrontend, iniciar } from './lib/ui.ts';
import { cargarJugadores, obtenerJugadoresPorIds } from './lib/jugadores.ts';

const ids: number[] = cargarJugadores();
let roster: number[] = [];

export function estaEnRoster(roster: number[], id: number): boolean {
  let esta: boolean = false; 
  let longitud: number= roster.length
  let contador: number = 0
  let n: number=0
  while(contador<longitud){
    if(id === roster[n]){
      esta=true
    }
    n++
    contador++
  }
  return esta;

}

export function agregarAlRoster(roster: number[], id: number): number[] {
  let nuevoRoster: number[] = []; 
  let longitud: number= roster.length
  let n: number=0
let contador=0
while(contador<longitud)
  { nuevoRoster.push(roster [n])
    n++
    contador++
  }
  nuevoRoster.push(id)

  

  return nuevoRoster;
}

export function quitarDelRoster(roster: number[], id: number): number[] {
  let nuevoRoster: number[] = []; 
  let longitud: number= roster.length
  let n: number=0
let contador=0
while(contador<longitud)
  { 
    if(id!==roster[n]){
    nuevoRoster.push(roster [n])
    }
    n++
    contador++}
  return nuevoRoster;

}

cuandoPasa('filtrar', () => {
  enviarAlFrontend('jugadores', obtenerJugadoresPorIds(ids));
});

cuandoPasa('agregar', ({ id }: Record<string, string>) => {
  let idNumero: number = Number(id);
  if (roster.length < 5 && !estaEnRoster(roster, idNumero)) {
    roster = agregarAlRoster(roster, idNumero);
  }
  enviarAlFrontend('roster', obtenerJugadoresPorIds(roster));
});

cuandoPasa('quitar', ({ id }: Record<string, string>) => {
  let idNumero: number = Number(id);
  roster = quitarDelRoster(roster, idNumero);
  enviarAlFrontend('roster', obtenerJugadoresPorIds(roster));
});

cuandoPasa('limpiarRoster', () => {
  roster = [];
  enviarAlFrontend('roster', []);
});

iniciar();
