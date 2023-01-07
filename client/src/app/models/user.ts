export class User {
  id: number;
  name: string;
  country_id: number;

  constructor(id: number, name: string, country_id: number) {
    this.id = id;
    this.name = name;
    this.country_id = country_id;
  }
}
