import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../home/header/header.component";
import {FooterComponent} from "../home/footer/footer.component";

@Component({
  selector: 'app-customer-layout',
  standalone: true,
    imports: [RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent {

}
