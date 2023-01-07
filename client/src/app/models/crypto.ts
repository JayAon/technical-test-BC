export class Crypto{
    id: number;
    symbol: string;
    name: string;
    value: number;

    constructor(id:number,symbol:string,name:string,value:number){
        this.id = id;
        this.symbol = symbol;
        this.name = name;
        this.value = value;
    }

}