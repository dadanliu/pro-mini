/**
 * 获取 指定随机值
 * @param {number} min 最小值
 * @param {number} max 最大值
 */
export const random = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}