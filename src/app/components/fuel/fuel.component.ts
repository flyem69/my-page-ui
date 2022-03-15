import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DarkModeService } from 'src/app/services/darkmode/dark-mode.service';
import { InputData } from 'src/app/models/input-data';
import { InputRegex } from 'src/app/enumeration/input-regex';

@Component({
    selector: 'app-fuel',
    templateUrl: './fuel.component.html',
    styleUrls: ['./fuel.component.scss'],
})
export class FuelComponent implements OnInit {
    private lapTimeValidity: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(true);
    appearance: string = '';
    inputsData: { [name: string]: InputData } = {};
    inputRegex: typeof InputRegex = InputRegex;
    calcLock: boolean = false;

    constructor(private darkModeService: DarkModeService) {
        this.inputsData['lapTimeMin'] = this.getInputData(this.lapTimeValidity);
        this.inputsData['lapTimeS'] = this.getInputData(this.lapTimeValidity);
        this.inputsData['lapTimeMS'] = this.getInputData(this.lapTimeValidity);
        this.inputsData['fuelPerLap'] = this.getInputData();
        this.inputsData['raceLength'] = this.getInputData();
        this.inputsData['fuelPer100'] = this.getInputData();
        this.inputsData['distance'] = this.getInputData();
    }

    ngOnInit(): void {
        this.darkModeService.getObservable().subscribe((darkMode) => {
            this.appearance = darkMode ? 'dark' : 'light';
        });
    }

    calcRaceFuel(): void {
        const raceInputsData = {
            lapTimeMin: this.inputsData['lapTimeMin'],
            lapTimeS: this.inputsData['lapTimeS'],
            lapTimeMS: this.inputsData['lapTimeMS'],
            fuelPerLap: this.inputsData['fuelPerLap'],
            raceLength: this.inputsData['raceLength'],
        };
        if (!this.initialCalcValidation(raceInputsData)) {
            return;
        }
        const lapTimeValue =
            +raceInputsData['lapTimeMin'].value$.getValue() * 60000 +
            +raceInputsData['lapTimeMS'].value$.getValue() * 1000 +
            +raceInputsData['lapTimeMS'].value$.getValue();
        const fuelPerLapValue = +raceInputsData['fuelPerLap'].value$.getValue();
        const raceLengthValue =
            +raceInputsData['raceLength'].value$.getValue() * 60000;
        const raceInputs = {
            lapTime: {
                value: lapTimeValue,
                validity: this.lapTimeValidity,
            },
            fuelPerLap: {
                value: fuelPerLapValue,
                validity: raceInputsData['fuelPerLap'].externalValidity$,
            },
            raceLength: {
                value: raceLengthValue,
                validity: raceInputsData['raceLength'].externalValidity$,
            },
        };
        if (this.finalCalcValidation(raceInputs)) {
            const laps = raceInputs.raceLength.value / raceInputs.lapTime.value;
            const result = raceInputs.fuelPerLap.value * laps;
            console.log(result);
        }
    }

    calcRoadFuel(): void {
        const roadInputsData = {
            fuelPer100: this.inputsData['fuelPer100'],
            distance: this.inputsData['distance'],
        };
        if (!this.initialCalcValidation(roadInputsData)) {
            return;
        }
        const fuelPer100Value = +roadInputsData['fuelPer100'].value$.getValue();
        const distanceValue = +roadInputsData['distance'].value$.getValue();
        const roadInputs = {
            fuelPer100: {
                value: fuelPer100Value,
                validity: roadInputsData['fuelPer100'].externalValidity$,
            },
            distance: {
                value: distanceValue,
                validity: roadInputsData['distance'].externalValidity$,
            },
        };
        if (this.finalCalcValidation(roadInputs)) {
            const distancePer100 = roadInputs.distance.value / 100;
            const result: number = roadInputs.fuelPer100.value * distancePer100;
            console.log(result);
        }
    }

    private initialCalcValidation(inputsData: {
        [key: string]: InputData;
    }): boolean {
        if (this.calcLock) {
            return false;
        }
        for (const inputData of Object.values(inputsData)) {
            if (
                !inputData.localValidity$.getValue() ||
                !inputData.externalValidity$.getValue()
            ) {
                return false;
            }
        }
        return true;
    }

    private finalCalcValidation(inputs: {
        [group: string]: { value: number; validity: BehaviorSubject<boolean> };
    }): boolean {
        const invalidInputs = Object.values(inputs).filter(
            (input) => input.value === 0
        );
        if (invalidInputs.length > 0) {
            this.highlightInputs(
                invalidInputs.map((invalidInput) => invalidInput.validity)
            );
            return false;
        }
        return true;
    }

    private highlightInputs(inputValidities: BehaviorSubject<boolean>[]): void {
        inputValidities.forEach((inputValidity) => {
            inputValidity.next(false);
        });
    }

    private getInputData(
        externalValidity$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
            true
        )
    ): InputData {
        return {
            value$: new BehaviorSubject<string>(''),
            localValidity$: new BehaviorSubject<boolean>(true),
            externalValidity$: externalValidity$,
        };
    }
}
