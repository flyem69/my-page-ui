import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DarkModeService } from 'src/app/services/darkmode/dark-mode.service';

@Component({
    selector: 'app-streams',
    templateUrl: './streams.component.html',
    styleUrls: ['./streams.component.scss'],
})
export class StreamsComponent implements OnInit {
    appearance$: BehaviorSubject<string>;

    constructor(private darkModeService: DarkModeService) {
        this.appearance$ = new BehaviorSubject<string>('');
    }

    ngOnInit(): void {
        this.darkModeService.subscribe(this.appearance$);
    }
}
