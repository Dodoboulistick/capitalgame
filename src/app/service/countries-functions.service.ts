import { Injectable } from '@angular/core';
import { CountryData } from '../service/countries.service';


@Injectable({
    providedIn: 'root'
})

export class CountriesFunctionsService {
    public constructor() {

    }

    public getRandomCountry(countryList: CountryData[]): CountryData {
        let l = countryList.length;
        let index = Math.floor(Math.random() * l);
        return countryList[index];
    }

    public checkAnswer(answer: string, country: CountryData) {
        if (answer) {
            let newAnswer = answer.trim().toLocaleLowerCase();
            let countryCapital = country.capital.trim().toLocaleLowerCase();
            let res = this.hammingDistance(newAnswer, countryCapital)
            return (res < 3);
        }
        return false;
    }

    public hammingDistance(str1: string, str2: string): number {
        let distance = 0;
        if (str1.length === str2.length) {
            for (let i = 0; i < str1.length; i++) {
                if (str1[i] != str2[i]) {
                    distance++;
                }
            }
            return distance;
        };
        return 10;
    }
}