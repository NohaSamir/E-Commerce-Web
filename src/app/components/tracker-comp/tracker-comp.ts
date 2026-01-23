import { NgFor, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-tracker-comp',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './tracker-comp.html',
  styleUrl: './tracker-comp.css',
})
export class TrackerComp {
  mainHero : Hero = { name: 'SuperDude', age: 1000 };
  heros = [
    { name: 'Windstorm', age: 100 },
    { name: 'Bombasto', age: 42 },
    { name: 'Magneta', age: 40 },
    { name: 'Tornado', age: 32 },
  ];

  selectedHero : Hero | null = null;

  counter = signal(0);

  decrement() {
    if (this.counter() > 0)
      this.counter.update((value) => value - 1);
  }

  increment() {
    this.counter.update((value) => value + 1);
  }

  reset() {
    this.counter.set(0);
  }

  onHeroClick(hero: Hero) {
    console.log('Hero clicked:', hero);
    this.selectedHero = hero;
  }
}

type Hero = {
  name: string;
  age: number;
}
