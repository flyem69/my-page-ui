import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DarkModeService } from 'src/app/services/dark-mode/dark-mode.service';

@Component({
    selector: 'app-stream-card',
    templateUrl: './stream-card.component.html',
    styleUrls: ['./stream-card.component.scss'],
})
export class StreamCardComponent implements OnInit {
    @Input() id!: string;
    @Input() author!: string;
    appearance$: BehaviorSubject<string>;
    preview$: BehaviorSubject<boolean>;

    constructor(private darkModeService: DarkModeService) {
        this.appearance$ = new BehaviorSubject<string>('');
        this.preview$ = new BehaviorSubject<boolean>(false);
    }

    ngOnInit(): void {
        this.darkModeService.bindAppearance(this.appearance$);
    }

    enterPreview(): void {
        this.preview$.next(true);
    }

    leavePreview(): void {
        this.preview$.next(false);
    }

    afterPreviewInit(preview: HTMLVideoElement): void {
        preview.src = 'https://www.w3schools.com/html/mov_bbb.mp4#t=0.5';
        console.log('start previewing');
    }
}