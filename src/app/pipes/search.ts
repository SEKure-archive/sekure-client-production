import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'search'})
export class SearchPipe implements PipeTransform {
  transform(value: any, input: any) {
    if(!input){
      return value;
    } else {
      return value.filter(item =>{
        for (let key in item){
          if ((typeof item[key] === 'string' || item[key] instanceof String) &&  (item[key].indexOf(input[0])) !== -1){
              return true;
            }
        }
      });
    }
  }
}
