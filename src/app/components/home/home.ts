import { Component, inject, Inject, OnInit } from '@angular/core';
import { TrackerComp } from "../tracker-comp/tracker-comp";
import { Title } from "../title/title";
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-home',
  imports: [TrackerComp, Title],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements OnInit {

  protected readonly title = 'Web App';

  ngOnInit(): void {
    console.log('Home component initialized');
  }

  onClick() {
    console.log('Button clicked');
  }

  onKeyUp(event: KeyboardEvent) {
    console.log('Key up event detected:', event.key);
  }
}
