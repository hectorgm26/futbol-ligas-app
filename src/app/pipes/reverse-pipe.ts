import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: string): string{

    return value.split('').reverse().join(); 
    // truco para invertir un string, se corta por nada con split quedando igual, luego se invierte con reverse y finalmente se une con join
  }

}
