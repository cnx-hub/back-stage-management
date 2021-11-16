/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
interface Fn {
  formatTime: (value: string) => string
}

declare let $filters: Fn

declare module '*.json'

declare module 'lodash.clonedeep'
