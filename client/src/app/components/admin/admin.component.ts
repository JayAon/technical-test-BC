import { Component, Input, OnInit } from '@angular/core';
import { data } from 'autoprefixer';
import { MdbTabChange } from 'mdb-angular-ui-kit/tabs/tabs.component';
import { Country } from 'src/app/models/country';
import { Crypto } from 'src/app/models/crypto';
import { Manager } from 'src/app/models/manager';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  /* Setting up the routes for the API calls. */
  select_routes = ['getcountries', 'getmanagers', 'getusers'];
  crypto_routes = ['cryptocountries', 'cryptomanager', 'cryptouser'];
  currentTab = 0;
  currentroute = this.crypto_routes[this.currentTab];

  /* Creating an empty array of the type Country, Manager, and User. */
  countries: Country[] = [];
  managers: Manager[] = [];
  users: User[] = [];

  /* An array of the three arrays that are being used in the select dropdown. */
  select_data = [this.countries, this.managers, this.users];
  thisList: Crypto[] = [];

  constructor(private admin: AdminService) {}
  /**
   * When the user selects a currency from the dropdown, the function gets the currency id and passes
   * it to the getCryptos function
   * @param {string} id - The id of the selected currency.
   */
  onSelect(id: string): void {
    this.getCryptos(id);
  }
  /**
   * The function is called when the user clicks on a tab. It sets the current route to the route of the
   * tab that was clicked, and then calls the getSelectList function to populate the select list with
   * the appropriate data
   * @param {MdbTabChange} event - MdbTabChange - this is the event that is triggered when the tab is
   * changed.
   */
  onGetActiveTab(event: MdbTabChange): void {
    this.currentroute = this.crypto_routes[event.index];
    this.currentTab = event.index;
    this.getSelectList(this.select_routes[event.index]);
  }
  /**
   * This function is called when the user clicks on a specific list. It takes the id of the list and
   * uses it to get the cryptos in that list
   * @param {string} id - the id of the user
   */
  getCryptos(id: string) {
    this.admin.getCryptos(this.currentroute, parseInt(id)).subscribe({
      next: (data) => {
        this.thisList = data.cryptos;
      },
    });
  }
  /**
   * It gets the select list data from the server and then calls the getCryptos function with the id of
   * the first item in the select list
   * @param {string} route - the route to the API endpoint
   */
  getSelectList(route: string) {
    this.admin.getSelectList(route).subscribe({
      next: (data) => {
        this.select_data[this.currentTab] = data;
        this.getCryptos(String(this.select_data[this.currentTab][0].id));
      },
    });
  }
  /**
   * The function is called when the component is initialized. It calls the getSelectList function, which
   * is defined in the parent component, and passes it the string 'getcountries'
   */
  ngOnInit(): void {
    this.getSelectList('getcountries');
  }
}
