import { Component } from '@angular/core';
import { AddItemsComponent } from '../add-items/add-items.component';

@Component({
  selector: 'app-my-items',
  standalone: true,
  imports: [AddItemsComponent],
  templateUrl: './my-items.component.html',
  styleUrl: './my-items.component.css'
})
export class MyItemsComponent {

}
