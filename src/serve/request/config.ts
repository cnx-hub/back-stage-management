// 1.手动修改
// const BASE_URL = 'http://coderwhy.org./dev'
// const BASE_NAME = 'coderwhy'

// const BASE_URL = 'http://coderwhy.org./prod'
// const BASE_NAME = 'coderwhy'

// const BASE_URL = 'http://coderwhy.org./test'
// const BASE_NAME = 'coderwhy'

// 2.根据process.env.NODE_ENV
// 开发环境下为development  生产环境为production  测试环境为test
let BASE_URL = ''
const BASE_NAME = 5000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://152.136.185.210:5000'
} else {
  BASE_URL = 'http://152.136.185.210:5000'
}

export { BASE_URL, BASE_NAME }
