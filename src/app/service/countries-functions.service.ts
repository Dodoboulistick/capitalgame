import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CountryData } from '../service/countries.service';


@Injectable({
    providedIn: 'root'
})

export class CountriesFunctionsService {
    public constructor(private router: Router) {

    }

    getCountryListByContinent(countryList: CountryData[], continent: string): any {
        if (continent == "monde") {
            return countryList;
        } else if (continent == "europe" || "asie" || "afrique" || "amerique" || "oceanie") {
            let newCountryList: CountryData[] = [];
            countryList.forEach(element => {
                //lowercases then remove accents
                if (element.continent.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") == continent) {
                    newCountryList.push(element);
                }
            });
            return newCountryList;
        } else {
            return null;
        }

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