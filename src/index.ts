import type { App } from "vue";
import { defaults } from "lodash-es";
import component from './components/VueJsIdle';

interface InstallationOptions {
  name?: string;
}

export default {
  install(app: App, { name = "vuejs-idle" }: InstallationOptions = {}): void {
    app.component(name, defaults(component, { name }));
  },
};
