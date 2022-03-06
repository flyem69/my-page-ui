import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FuelComponent } from './components/fuel/fuel.component';
import { HeaderComponent } from './components/header/header.component';
import { InputComponent } from './components/input/input.component';
import { MenuComponent } from './components/menu/menu.component';
import { NgModule } from '@angular/core';
import { SwitchComponent } from './components/switch/switch.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SwitchComponent,
        MenuComponent,
        FuelComponent,
        InputComponent,
    ],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
