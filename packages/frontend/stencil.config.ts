import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  namespace: 'fullr',
  outputTargets: [
    {
      type: 'www',
      dir: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      baseUrl: 'https://fullreaction.com/',
      prerenderConfig: './prerender.config.ts',

    }
  ],
};