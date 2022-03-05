import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DarkModeService } from 'src/app/services/darkmode/dark-mode.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

    appearance: string = '';
    darkMode: BehaviorSubject<boolean>;

    constructor(private darkModeService: DarkModeService) {
        this.darkMode = darkModeService.getSubject();
    }

    ngOnInit(): void {
        this.darkModeService.getObservable().subscribe(darkMode => {
            this.appearance = darkMode ? 'dark' : 'light';
        });
    }
}
