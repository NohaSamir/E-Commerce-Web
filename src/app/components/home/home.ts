import { Component, inject, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements OnInit {

  protected readonly title = 'Web App';

  ngOnInit(): void {
  
  }
}
