import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, ViewEncapsulation } from '@angular/core';
import { CountriesFunctionsService } from '../service/countries-functions.service';
import { CountriesService, CountryData } from '../service/countries.service';

@Component({
  selector: 'app-game',
  templateUrl: 'views/game.component.html',
  styleUrls: ['../app/app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GameComponent implements OnInit, AfterViewInit {
  title = 'capitales';

  //Global variables
  public countriesList: CountryData[];
  userAnswer: string;
  currentCountry: CountryData;
  countriesLeft: number;
  inputColor: string = "#e22e5d";
  isWrong: boolean = false;
  isCorrect: boolean = false;
  time: number = 0;
  userPoints: number = 0;

  public constructor(private countriesService: CountriesService, private countriesFunctionsService: CountriesFunctionsService) {
  }

  ngOnInit(): void {
    this.countriesList = this.countriesService.country;
    this.countriesLeft = this.countriesList.length;
    this.onChangeCountry();
    this.stopWatch();
  }

  @ViewChild("answerInput") answerInputToFocus: ElementRef;
  @ViewChild("answerField") answerField: ElementRef;

  ngAfterViewInit(): void {
    this.answerInputToFocus.nativeElement.focus();
  }

  public getCountriesList() {
    return this.countriesList;
  }

  public onChangeCountry() {
    this.currentCountry = this.countriesFunctionsService.getRandomCountry(this.countriesList);
  }

  public onSubmit(currentCountry: CountryData) {
    let checkAnswer = this.countriesFunctionsService.checkAnswer(this.userAnswer, currentCountry);
    checkAnswer ? this.correctAnswer(currentCountry) :  this.wrongAnswer();
    this.countPoints(checkAnswer, currentCountry);
    this.userAnswer = "";
    this.answerInputToFocus.nativeElement.focus();
    this.onChangeCountry();
  }

  public wrongAnswer() {
    this.isWrong = true;
    setTimeout(() => {
      this.isWrong = false;
    }, 1000)
  }

  public correctAnswer(currentCountry: CountryData) {
    let index = this.countriesList.indexOf(currentCountry);
    if (index > -1) {
      this.countriesList.splice(index, 1);
    }
    this.countriesLeft--;
    this.isCorrect = true;
    setTimeout(() => {
      this.isCorrect = false;
    }, 1000)
  }


  public stopWatch(): any {
    let interval;
    interval = setInterval(() => {
      this.time++;
    }, 1000)
  }

  public getTime(): number {
    return this.time+1;
  }

  public countPoints(checkAnswer: boolean, currentCountry: CountryData){
    checkAnswer ? this.userPoints += this.getCoeffByTime() * currentCountry.coefficient : this.userPoints -= currentCountry.coefficient;
  }

  public getCoeffByTime(): number{
    let res: number;
    if(this.time <= 300){
      res = -0.1 * this.time + 50;
    } else if ( 300 < this.time && this.time <= 600) {
      res = -0.1 * this.time + 50;
    } else {
      res = this.time + 10;
    }
    return Math.floor(0.1*res);
  }


}

