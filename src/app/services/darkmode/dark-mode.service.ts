import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DarkModeService {
    private darkMode$: BehaviorSubject<boolean>;

    constructor() {
        this.darkMode$ = new BehaviorSubject<boolean>(false);
    }

    getObservable(): Observable<boolean> {
        return this.darkMode$.asObservable();
    }

    getSubject(): BehaviorSubject<boolean> {
        return this.darkMode$;
    }

    subscribe(appearance$: BehaviorSubject<string>): void {
        this.darkMode$.subscribe((darkMode) => {
            const appearance = darkMode ? 'dark' : 'light';
            appearance$.next(appearance);
        });
    }
}
