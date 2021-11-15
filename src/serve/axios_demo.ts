import axios from 'axios'

axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 5000

// 1.模拟get请求
// axios
//   .get('get', {
//     params: {
//       name: 'why',
//       age: 18
//     },
//     headers: {}
//   })
//   .then((res) => {
//     console.log(res)
//   })
// // 2.模拟post请求
// axios
//   .post('post', {
//     data: {
//       name: 'kobe',
//       height: 1.88
//     },
//     timeout: 10000
//   })
//   .then((res) => {
//     console.log(res)
//   })

// axios.all  多个请求一起发送

// axios拦截器
// request 参数1为成功请求的拦截  参数2为失败请求的拦截
axios.interceptors.request.use(
  (config) => {
    // 做一些自己想做的操作
    // 1.给请求添加token 2.isLoading动画
    console.log('请求发送成功')
    return config
  },
  (err) => {
    console.log('请求发送失败')
    return err
  }
)
// response 参数1为成功响应的拦截 参数2为失败响应的拦截
axios.interceptors.response.use(
  (config) => {
    console.log('响应成功')
    return config
  },
  (err) => {
    console.log('响应失败')
    return err
  }
)

axios
  .all([
    axios.get('/get', { params: { name: 'why', age: 18 } }),
    axios.post('/post', { data: { name: 'why', age: 18 } })
  ])
  .then((res) => {
    console.log(res)
  })

// promise类似一个类 可以有自己的类型
// new Promise<string>((resolve) => {
//   resolve('123')
// }).then((res) => {
//   console.log(res)
// })
