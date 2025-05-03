import { Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path:"view", component: ViewComponent},
    { path: "home", component: HomeComponent },
    { path: "create", component: CreateComponent}
];