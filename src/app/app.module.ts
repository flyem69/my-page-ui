import { AfterElementInitDirective } from './directives/after-element-init/after-element-init.directive';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsAnchorDirective } from './directives/components-anchor/components-anchor.directive';
import { FormsModule } from '@angular/forms';
import { FuelComponent } from './components/fuel/fuel.component';
import { HeaderComponent } from './components/header/header.component';
import { InputComponent } from './components/input/input.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MenuComponent } from './components/menu/menu.component';
import { NgModule } from '@angular/core';
import { StreamCardComponent } from './components/stream-card/stream-card.component';
import { StreamsComponent } from './components/streams/streams.component';
import { SwitchComponent } from './components/switch/switch.component';

@NgModule({
    declarations: [
        AppComponent,
        FuelComponent,
        HeaderComponent,
        InputComponent,
        MenuComponent,
        StreamsComponent,
        SwitchComponent,
        StreamCardComponent,
        LoaderComponent,
        ComponentsAnchorDirective,
        AfterElementInitDirective,
    ],
    imports: [AppRoutingModule, BrowserModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
