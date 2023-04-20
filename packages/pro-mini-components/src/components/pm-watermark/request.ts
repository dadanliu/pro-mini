type IanyObject = any
declare namespace MyRequest {
  type Options = any
  type Method = any
  type RequestRes = any
}

function request(
  url: string,
  data: IanyObject = {},
  method: MyRequest.Method = 'GET',
  header: IanyObject = {},
  options: MyRequest.Options = { simple: true }
): Promise<MyRequest.RequestRes> {
  const {
    noErrToast = false,
  } = options

  // 下面这行很有用：移除参数中的null, undefined
  return new Promise(function (resolve, reject) {
    console.log('request start=>', url, data)
    uni.request({
      url,
      data: data,
      method,
      header,
      success(res: any) {
        console.log(
          {
            method,
            url,
            data: data,
            header
          },
          {
            res,
            status: 'success'
          }
        )

        if (options.simple) {
          if (res.data.code === 200) {
            // console.log(`${url}=>${data}=>${res?.data?.data}`)
            resolve(res.data.data)
          } else {
            if (!noErrToast) {
              uni.showToast({
                title: res.data.msg || '网络错误',
                icon: 'none',
                duration: 1500
              })
            }
            reject(res.data)
          }
        } else {
          // console.log(`${url}=>${data}=>${res?.data}`)
          resolve(res.data)
        }
      },
      fail(err) {
        console.log(
          {
            method,
            url,
            data: data,
            header
          },
          {
            res: err,
            status: 'fail'
          }
        )

        // todo: 该判断方式可能有问题
        if (err.errMsg?.startsWith('request:fail timeout')) {
          uni.showToast({
            title: '网络超时',
            icon: 'none'
          })
          // todo: 在这里return可能有问题
          reject(err.errMsg)
          return
        }

        // todo: 等微信官方出错误信息的文档后，换成根据err code来判断
        if (
          typeof err.errMsg === 'string' &&
          err.errMsg.startsWith('request:fail')
        ) {
          uni.showToast({
            title: '网络开小差了...',
            icon: 'none'
          })
          // todo: 错误日志收集
          reject(err.errMsg)
          return
        }

        uni.showToast({
          title: err.errMsg || '网络错误',
          icon: 'none'
        })

        reject(err)
      },
      complete(res) {
        console.log('request complete =>', url, res)
      }
    })
  })
}

request.get = (
  url: string,
  data?: IanyObject,
  header?: IanyObject,
  options?: MyRequest.Options
) => {
  return request(url, data, 'GET', header, options)
}

export default request
