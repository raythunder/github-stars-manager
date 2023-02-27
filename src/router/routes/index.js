const modules = import.meta.globEager('./modules/*.js');
const externalModules = import.meta.globEager('./externalModules/*.js');

function formatModules(_modules, result) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default;
    if (!defaultModule) return;
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule];
    result.push(...moduleList);
  });
  return result;
}

export const appRoutes = formatModules(modules, []);

export const appExternalRoutes = formatModules(externalModules, []);
