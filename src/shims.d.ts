/*
 * @Author: zhangyang
 * @Date: 2020-12-07 14:25:19
 * @LastEditTime: 2020-12-10 15:56:41
 * @Description: .vue 描述文件
 */
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}
declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}