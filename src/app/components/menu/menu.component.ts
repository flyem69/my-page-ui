import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../../services/darkmode/dark-mode.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
    appearance: string = '';

    constructor(private darkModeService: DarkModeService) {}

    ngOnInit(): void {
        this.darkModeService.getObservable().subscribe((darkMode) => {
            this.appearance = darkMode ? 'dark' : 'light';
        });
    }
}
