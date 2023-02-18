import type { App } from "vue";
import VueJsIdle from "../src/components/VueJsIdle";

export interface InstallationOptions {
  name?: string;
}

declare namespace VueJsIdle {
  export function install(app: App, options: InstallationOptions): any;
}

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    VueJsIdle: typeof VueJsIdle;
  }
}

export default VueJsIdle;
