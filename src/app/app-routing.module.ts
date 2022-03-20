import { RouterModule, Routes } from '@angular/router';
import { FuelComponent } from './components/fuel/fuel.component';
import { MenuComponent } from './components/menu/menu.component';
import { NgModule } from '@angular/core';
import { StreamsComponent } from './components/streams/streams.component';

const routes: Routes = [
    { path: '', component: MenuComponent },
    { path: 'fuel', component: FuelComponent },
    { path: 'streams', component: StreamsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
