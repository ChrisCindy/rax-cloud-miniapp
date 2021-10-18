const { BootstrapStarter } = require('@midwayjs/bootstrap');
const { Framework } = require('@midwayjs/faas');
const { asyncWrapper, start } = require('@midwayjs/serverless-scf-starter');
const { match } = require('path-to-regexp');

const layers = [];


let frameworkInstance;
let runtime;
let inited = false;

const initializeMethod = async (initializeContext = {}) => {
  layers.unshift(engine => {
    engine.addRuntimeExtension({
      async beforeFunctionStart(runtime) {
        let startConfig = {
          initializeContext,
          preloadModules: [],
          applicationAdapter: runtime
        };
        let applicationContext;
        

        frameworkInstance = new Framework();
        frameworkInstance.configure({
          initializeContext,
          preloadModules: [],
          applicationAdapter: runtime
        });
        const boot = new BootstrapStarter();
        boot.configure({
          appDir: __dirname,
          
          applicationContext,
        }).load(frameworkInstance);

        await boot.init();
        await boot.run();
      }
    });
  })
  runtime = await start({
    layers: layers,
    initContext: initializeContext,
    runtimeConfig: {"service":{"name":"midway-hooks-wechat"},"provider":{"name":"wechat"},"functions":{"function-index-gettodolist":{"handler":"function-index-gettodolist.handler","events":[{"event":true}]}},"package":{"include":["config.json","sitemap.json"]},"globalDependencies":{"@midwayjs/serverless-scf-starter":"*"}},
  });

  inited = true;
};

const getHandler = (hanlderName, ...originArgs) => {
  
    if (hanlderName === 'handler') {
      return  frameworkInstance.handleInvokeWrapper('function-index-gettodolist.handler'); 
    }
  
}


 
exports.initializer = asyncWrapper(async (...args) => {
  if (!inited) {
    await initializeMethod(...args);
  }
});


 


exports.handler = asyncWrapper(async (...args) => {
  if (!inited) {
    await initializeMethod();
  }

  const handler = getHandler('handler', ...args);
  return runtime.asyncEvent(handler)(...args);
});



