import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { CountryData } from "src/app/service/countries.service";


@Component({
    selector: 'app-show-score-dialog',
    templateUrl: 'views/show-score-dialog.component.html',
    styleUrls: ['../../app/app.component.css']
})

export class ShowScoreDialog {
    constructor(public dialogRef: MatDialogRef<CountryData>, private router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    userScore: number = this.data.score;
    type: string = this.data.continent;
    pseudo: string;

    public onCancel() {
        this.router.navigate(['/']);
        this.dialogRef.close();
    }

    public onAdd(){

        let result = {
            value: this.userScore,
            user: this.pseudo? this.pseudo: 'Inconnu',
            type: this.type
        }
        this.router.navigate(['/']);
        this.dialogRef.close(result);
    }
}