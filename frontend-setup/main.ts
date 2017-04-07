console.log("main is loaded");

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'; 

import { AppModule }              from '../hoey-scripts/app.module';


platformBrowserDynamic().bootstrapModule(AppModule);