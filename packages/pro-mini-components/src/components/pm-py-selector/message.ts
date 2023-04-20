type MsgToast = (msg: string, sec?: number) => void
type Loading = (msg: string | any) => void

class Message {
  error: MsgToast = (msg, sec = 1500) => {
    uni.showToast({ icon: 'none', title: msg, duration: sec })
  }

  success: MsgToast = (msg, sec = 1500) => {
    uni.showToast({ icon: 'none', title: msg, duration: sec })
  }

  info: MsgToast = (msg, sec = 1500) => {
    uni.showToast({ icon: 'none', title: msg, duration: sec })
  }

  infoAfterJump: MsgToast = (msg, sec = 1500) => {
    setTimeout(() => {
      uni.showToast({ icon: 'none', title: msg, duration: sec })
    }, 500)
  }

  loading: Loading = (inf) => {
    if (typeof inf === 'boolean') uni.hideLoading()
    else uni.showLoading({ ...inf, title: inf?.title || '加载中...' })
  }
}

export const message = new Message()
