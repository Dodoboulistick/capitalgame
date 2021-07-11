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

    public onCancel() {
        this.router.navigate(['/']);
        this.dialogRef.close();
    }
}