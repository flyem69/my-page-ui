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
    appearance = '';
    darkMode: BehaviorSubject<boolean>;

    constructor(private darkModeService: DarkModeService) {
        this.darkMode = darkModeService.getSubject();
    }

    ngOnInit(): void {
        this.darkModeService.getObservable().subscribe((darkMode) => {
            this.appearance = darkMode ? 'dark' : 'light';
        });
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
