import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DarkModeService {

    private darkMode: BehaviorSubject<boolean>;

    constructor() {
        this.darkMode = new BehaviorSubject<boolean>(false);
    }

    getObservable(): Observable<boolean> {
        return this.darkMode.asObservable();
    }

    getSubject(): BehaviorSubject<boolean> {
        return this.darkMode;
    }
}
