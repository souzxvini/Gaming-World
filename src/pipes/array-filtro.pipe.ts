import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'arrayFiltro'
})
export class ArrayFiltroPipe implements PipeTransform {
    transform(value: Array<any>, filtro: string): any {
        if (filtro != null && filtro.length > 0) {
            filtro = filtro.toUpperCase();

          value = value.filter(a =>
            a.nome.toUpperCase().indexOf(filtro) >= 0).map(x => x)

            console.log(value)

            return value;

        } else {
            return value;
        }
    }
}
