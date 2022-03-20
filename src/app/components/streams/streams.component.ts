import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DarkModeService } from 'src/app/services/darkmode/dark-mode.service';

@Component({
    selector: 'app-streams',
    templateUrl: './streams.component.html',
    styleUrls: ['./streams.component.scss'],
})
export class StreamsComponent implements OnInit, AfterViewInit, OnDestroy {
    private smallInputWidth: string;
    private standardInputWidth: string;
    private inputWidthChangeThreshold: number;
    appearance$: BehaviorSubject<string>;
    inputWidth$: BehaviorSubject<string>;
    searchPhrase$: BehaviorSubject<string>;
    smallerScreen: MediaQueryList;
    standardScreen: MediaQueryList;

    constructor(private darkModeService: DarkModeService) {
        this.smallInputWidth = '300px';
        this.standardInputWidth = '550px';
        this.inputWidthChangeThreshold = 650;
        this.appearance$ = new BehaviorSubject<string>('');
        this.inputWidth$ = new BehaviorSubject<string>(
            window.innerWidth < this.inputWidthChangeThreshold ? this.smallInputWidth : this.standardInputWidth
        );
        this.searchPhrase$ = new BehaviorSubject<string>('');
        this.smallerScreen = window.matchMedia('(max-width: ' + this.inputWidthChangeThreshold + 'px)');
        this.standardScreen = window.matchMedia('(min-width: ' + this.inputWidthChangeThreshold + 'px)');
    }

    ngOnInit(): void {
        this.darkModeService.bindAppearance(this.appearance$);
    }

    ngAfterViewInit(): void {
        this.setScreenChangeListeners();
    }

    ngOnDestroy(): void {
        this.removeScreenChangeListeners();
    }

    private setScreenChangeListeners(): void {
        this.smallerScreen.addEventListener('change', (event) => this.setSmallInputWidth(event));
        this.standardScreen.addEventListener('change', (event) => this.setStandardInputWidth(event));
    }

    private removeScreenChangeListeners(): void {
        this.smallerScreen.removeEventListener('change', (event) => this.setSmallInputWidth(event));
        this.standardScreen.removeEventListener('change', (event) => this.setStandardInputWidth(event));
    }

    private setSmallInputWidth(event: MediaQueryListEvent): void {
        if (event.matches) {
            this.inputWidth$.next(this.smallInputWidth);
        }
    }

    private setStandardInputWidth(event: MediaQueryListEvent): void {
        if (event.matches) {
            this.inputWidth$.next(this.standardInputWidth);
        }
    }
}
