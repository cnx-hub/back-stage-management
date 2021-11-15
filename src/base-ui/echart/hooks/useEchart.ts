import * as echart from 'echarts'

// 注册中国地图
import chinaJson from '../data/china.json'
echart.registerMap('china', chinaJson)

export default function (el: HTMLElement, theme = 'light') {
  // 初始化echart
  const echartInstance = echart.init(el, theme, { renderer: 'svg' })
  // 设置options
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }
  // 监听window尺寸变化
  const updateSize = () => {
    echartInstance.resize()
  }
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
