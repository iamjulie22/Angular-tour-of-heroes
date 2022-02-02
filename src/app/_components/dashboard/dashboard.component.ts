import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hero } from 'src/app/_models/hero';
import { HeroService } from 'src/app/_services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];
  heroForm!: FormGroup;

  constructor(private heroService: HeroService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getHeroes();
    this.createHeroForm();
  }

  getHeroes(): void {
    this.heroService.getAllHeroes()
      .subscribe(data => this.heroes = data);
  }

  createHeroForm(){
    this.heroForm = this.fb.group({
      heroName: ['',Validators.required]
    });
  }

  onSubmit(){
    let obj :Hero = {
      name: this.heroForm.value.heroName
    }
    this.heroService.addHero(obj).subscribe(() => {
      this.getHeroes();
    });
    this.heroForm.reset();
  }
}