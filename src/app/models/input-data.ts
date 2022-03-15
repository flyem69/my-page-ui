import { BehaviorSubject } from 'rxjs';

export interface InputData {
    value$: BehaviorSubject<string>;
    localValidity$: BehaviorSubject<boolean>;
    externalValidity$: BehaviorSubject<boolean>;
}
