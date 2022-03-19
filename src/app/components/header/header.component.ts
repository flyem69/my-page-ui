import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DarkModeService } from 'src/app/services/darkmode/dark-mode.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('toolbar') toolbar!: ElementRef<HTMLDivElement>;
    appearance$: BehaviorSubject<string>;
    darkMode$: BehaviorSubject<boolean>;

    constructor(private darkModeService: DarkModeService) {
        this.appearance$ = new BehaviorSubject<string>('');
        this.darkMode$ = darkModeService.getSubject();
    }

    ngOnInit(): void {
        this.darkModeService.subscribe(this.appearance$);
    }

    ngAfterViewInit(): void {
        this.toolbar.nativeElement.addEventListener('wheel', (event) =>
            this.scrollToolbar(event)
        );
    }

    ngOnDestroy(): void {
        this.toolbar.nativeElement.removeEventListener('wheel', (event) =>
            this.scrollToolbar(event)
        );
    }

    private scrollToolbar(event: WheelEvent) {
        event.preventDefault();
        this.toolbar.nativeElement.scrollLeft += event.deltaY;
    }
}
