import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
// 添加格式化utc格式的时间
dayjs.extend(utc)

const DATE_TIME_FROMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FROMAT
) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
