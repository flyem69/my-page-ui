import { Component, OnInit } from '@angular/core';
import { DarkModeService } from './services/darkmode/dark-mode.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    title: string = 'my-page';
    appearance: string = '';

    constructor(private darkModeService: DarkModeService) { }

    ngOnInit(): void {
        this.darkModeService.getObservable().subscribe(darkMode => {
            this.appearance = darkMode ? 'dark' : 'light';
        });
    }
}
