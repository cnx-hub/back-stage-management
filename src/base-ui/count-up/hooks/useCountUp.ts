import { ref } from 'vue'
import { CountUp } from 'countup.js'
import type { CountUpOptions } from 'countup.js'

export function useCountUp() {
  const counterRef = ref<HTMLDivElement | null>(null)
  const instance = ref<CountUp | null>(null)

  const defaultOptions: CountUpOptions = {
    decimalPlaces: 2, // 保留两位
    duration: 2, // 动画时长
    separator: ',', // 千位分割
    decimal: '.', // 小数分割
    prefix: '￥' // 单位
  }
  // 创建count-up类
  const createCounter = (number: number, option?: any) => {
    if (!counterRef.value) return
    const opts: CountUpOptions = Object.assign(defaultOptions, option)
    instance.value = new CountUp(counterRef.value, number, opts)
    start()
  }
  // 开始执行count-up动画
  const start = () => {
    if (!instance.value) return
    instance.value.start()
  }
  // 更新count-up动画
  const update = (number: number) => {
    if (!instance.value) return
    instance.value.update(number)
  }

  return {
    counterRef,
    createCounter,
    update
  }
}
