import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ApiModule } from './api.module';

platformBrowserDynamic().bootstrapModule(ApiModule)
  .catch(err => console.log(err));
