const test = {
  number(value) {
    return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value)
  }
}

function addUnit(value = 'auto', unit = 'rpx' ?? 'px') {
  value = String(value)
  // 用uView内置验证规则中的number判断是否为数值
  return test.number(value) ? `${value}${unit}` : value
}

function getPx(value, unit = false) {
  if (test.number(value)) {
    return unit ? `${value}px` : Number(value)
  }
  // 如果带有rpx，先取出其数值部分，再转为px值
  if (/(rpx|upx)$/.test(value)) {
    return unit
      ? `${uni.upx2px(parseInt(value))}px`
      : Number(uni.upx2px(parseInt(value)))
  }
  return unit ? `${parseInt(value)}px` : parseInt(value)
}

export { addUnit, getPx }
