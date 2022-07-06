import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, ViewEncapsulation } from '@angular/core';
import { CountriesFunctionsService } from '../service/countries-functions.service';
import { contriesList, CountryData } from '../service/countries.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ShowScoreDialog } from './dialog/show-score-dialog.component';
import { TimerService } from '../service/timer.service';
import { ApiService } from '../service/api.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-game',
  templateUrl: 'views/game.component.html',
  styleUrls: ['../app/app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class GameComponent implements OnInit {
  title = 'capitales';

  //Global variables
  countriesByContinentList: CountryData[];
  userAnswer: string;
  currentCountry: CountryData;
  countriesLeft: number;
  inputColor: string = "#e22e5d";
  isWrong: boolean = false;
  isCorrect: boolean = false;
  time: number = 0;
  userPoints: number = 0;
  selectedContinent: any;
  routing: any;
  countriesByContinent: number;
  @ViewChild("answerInput") answerInputToFocus: ElementRef;
  @ViewChild("answerField") answerField: ElementRef;
  previousAnswer: string;
  isRed: boolean;
  scores: any;
  displayedColumns: string[] = ['place','pseudo', 'value', 'date'];

  public constructor(public timerService: TimerService, private activatedRoute: ActivatedRoute, private router: Router, private countriesFunctionsService: CountriesFunctionsService, private dialog: MatDialog, public apiService: ApiService) {
  }

  timer: number = this.timerService.time;
  timerDisplay: string = this.timerService.displayTimer;

  ngOnInit(): void {
    this.routing = this.activatedRoute.paramMap.subscribe(params => {
      this.selectedContinent = params.get('continent');
      this.getScores();
    });
    this.activatedRoute.params.subscribe(_res => {
      this.timerService.stop();
      this.initLists();
      this.previousAnswer = "";
    })
    this.initLists();
    this.getScores();
  }

  public async getScores(){
    let allScores: any;
    allScores = await this.apiService.getScoresByContinent(this.selectedContinent);
    if(allScores) this.scores = allScores.slice(0,10);
  }

  public initLists() {
    if (this.countriesFunctionsService.getCountryListByContinent(contriesList, this.selectedContinent).length == 0) {
      this.router.navigate(['/']);
    } else {
      this.countriesByContinentList = this.countriesFunctionsService.getCountryListByContinent(contriesList, this.selectedContinent);
    }
    this.countriesLeft = this.countriesByContinentList.length;
    this.countriesByContinent = this.countriesByContinentList.length;
    this.onChangeCountry();
    this.userAnswer = "";
    this.userPoints = 0;
  }

  public onChangeInput(){
    this.timerService.start();
  }

  public getCountriesList() {
    return this.countriesByContinentList;
  }

  public onChangeCountry() {
    if(this.countriesLeft > 0){
      this.currentCountry = this.countriesFunctionsService.getRandomCountry(this.countriesByContinentList);
    } else {
      this.onAddScore();
      this.timerService.stop();
      this.initLists();
    }
  }

  public onSubmit(currentCountry: CountryData) {
    this.timerService.start();
    let checkAnswer = this.countriesFunctionsService.checkAnswer(this.userAnswer, currentCountry);
    this.previousAnswer = this.currentCountry.capital;
    checkAnswer ? this.correctAnswer() : this.wrongAnswer();
    this.editList(currentCountry);
    this.countPoints(checkAnswer, currentCountry);
    this.userAnswer = "";
    this.answerInputToFocus.nativeElement.focus();
    this.onChangeCountry();
  }

  public wrongAnswer() {
    this.isRed = true;
    this.isWrong = true;
    setTimeout(() => {
      this.isWrong = false;
    }, 1000)
  }

  public correctAnswer() {
    this.isRed = false;
    this.isCorrect = true;
    setTimeout(() => {
      this.isCorrect = false;
    }, 1000)
  }

  public editList(currentCountry: CountryData) {
    let index = this.countriesByContinentList.indexOf(currentCountry);
    if (index > -1) {
      this.countriesByContinentList.splice(index, 1);
    }
    this.countriesLeft--;
  }

  public getTime(): number {
    return this.time + 1;
  }

  public countPoints(checkAnswer: boolean, currentCountry: CountryData) {
    checkAnswer ? this.userPoints += this.getCoeffByTime() * currentCountry.coefficient : this.userPoints -= currentCountry.coefficient;
  }

  public getCoeffByTime(): number {
    let res: number;
    if (this.time <= 300) {
      res = -0.1 * this.time + 50;
    } else if (300 < this.time && this.time <= 600) {
      res = -0.1 * this.time + 50;
    } else {
      res = this.time + 10;
    }
    return Math.floor(0.1 * res);
  }

  public onAddScore(){
    let addDialog = this.dialog.open(ShowScoreDialog, {
      width :'max-content',
      height : 'max-content',
      data: { score: this.userPoints, continent: this.selectedContinent }
    });
    addDialog.afterClosed().subscribe(async result => {
      if (result) {
        await this.apiService.createScore({
          value: result.value,
          user: result.user,
          type: result.type
        });
        this.getScores();
      }
    });
  }


  

}

