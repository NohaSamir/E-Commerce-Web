import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.html',
  styleUrl: './title.css',
})
export class Title {
  //title = 'Tracker App';

  // It's better to use signals for reactive data
  title = signal('Title Component');

  // Use input to receive data from parent component
  subtitle = input<string>();
  requiredSubtitle = input.required<string>();

}
