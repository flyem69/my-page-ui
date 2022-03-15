import { BehaviorSubject, combineLatest } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { DarkModeService } from 'src/app/services/darkmode/dark-mode.service';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
    @Input() placeholder?: string = '';
    @Input() valueRegex?: RegExp;
    @Input() localValidity$?: BehaviorSubject<boolean>;
    @Input() externalValidity$?: BehaviorSubject<boolean>;
    @Input() value$!: BehaviorSubject<string>;
    appearance: string = '';
    validity: string = 'valid';

    constructor(private darkModeService: DarkModeService) {}

    ngOnInit(): void {
        if (this.valueRegex && !this.localValidity$) {
            throw Error(
                'Missing localValidity$ value on input component when valueRegex is present'
            );
        }
        this.darkModeService.getObservable().subscribe((darkMode) => {
            this.appearance = darkMode ? 'dark' : 'light';
        });
        if (this.localValidity$ && this.externalValidity$) {
            combineLatest([
                this.localValidity$,
                this.externalValidity$,
            ]).subscribe((validities) => {
                this.setValidity(validities[0] && validities[1]);
            });
        } else if (this.externalValidity$) {
            this.externalValidity$.subscribe(this.setValidity);
        } else if (this.localValidity$) {
            this.localValidity$.subscribe(this.setValidity);
        }
    }

    change(value: string): void {
        if (this.valueRegex) {
            this.localValidity$?.next(this.valueRegex.test(value));
        } else if (this.localValidity$ && !this.localValidity$.getValue()) {
            this.localValidity$.next(true);
        }
        this.value$.next(value);
    }

    focus(): void {
        if (this.externalValidity$ && !this.externalValidity$.getValue()) {
            this.externalValidity$.next(true);
        }
    }

    private setValidity(condition: boolean) {
        this.validity = condition ? 'valid' : 'invalid';
    }
}
