import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-my-items-dashboard',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './my-items-dashboard.component.html',
  styleUrl: './my-items-dashboard.component.css'
})
export class MyItemsDashboardComponent {

}
