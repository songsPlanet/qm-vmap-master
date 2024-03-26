/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // const component: DefineComponent<{}, {}, any>
  const component: CompositeOperation
  export default component
}

// declare namespace NodeJS {
//   type Timer = any
// }
declare module '@turf/turf'
