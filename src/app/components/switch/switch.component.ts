import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DarkModeService } from 'src/app/services/darkmode/dark-mode.service';

@Component({
    selector: 'app-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

    @Input() subject!: BehaviorSubject<boolean>;
    appearance: string = '';
    mode: string = '';

    constructor(private darkModeService: DarkModeService) { }

    ngOnInit(): void {
        this.darkModeService.getObservable().subscribe(darkMode =>
            this.appearance = darkMode ? 'dark' : 'light');
        this.subject.asObservable().subscribe(value => {
            this.mode = value ? 'on' : 'off';
        })
    }

    toggle(): void {
        const negation = !this.subject.getValue();
        this.subject.next(negation);
    }
}
