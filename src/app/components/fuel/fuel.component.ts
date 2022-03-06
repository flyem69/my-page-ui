import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DarkModeService } from 'src/app/services/darkmode/dark-mode.service';

@Component({
    selector: 'app-fuel',
    templateUrl: './fuel.component.html',
    styleUrls: ['./fuel.component.scss'],
})
export class FuelComponent implements OnInit {
    appearance: string = '';
    test$: BehaviorSubject<string> = new BehaviorSubject('');

    constructor(private darkModeService: DarkModeService) {}

    ngOnInit(): void {
        this.darkModeService.getObservable().subscribe((darkMode) => {
            this.appearance = darkMode ? 'dark' : 'light';
        });
    }
}
