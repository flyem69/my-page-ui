import { BehaviorSubject, Observable } from 'rxjs';
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
    @Input() validity$?: BehaviorSubject<boolean>;
    @Input() value$!: BehaviorSubject<string>;
    appearance: string = '';
    validity: string = 'valid';
    value: string = '';

    constructor(private darkModeService: DarkModeService) {}

    ngOnInit(): void {
        this.darkModeService.getObservable().subscribe((darkMode) => {
            this.appearance = darkMode ? 'dark' : 'light';
        });
        if (this.validity$) {
            this.validity$.subscribe((validity) => {
                this.validity = validity ? 'valid' : 'invalid';
            });
        }
        this.value$.subscribe((value) => {
            this.value = value;
        });
    }

    change(event: Event): void {
        const value: string = (event.target as HTMLInputElement).value;
        if (this.valueRegex && !this.valueRegex.test(value)) {
            return;
        }
        this.value$.next(value);
    }

    focus(): void {
        if (this.validity$) {
            this.validity$?.next(true);
        }
    }
}
