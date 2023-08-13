// 日期格式化函数，传入秒级别的时间戳，返回格式化的字符串
// 返回格式如：1分钟前，1小时前，1天前，1月前，1年前
export function formatDate(timestamp) {
  const date = new Date(timestamp * 1000)
  const now = Date.now()
  const diff = (now - date) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 30) {
    return Math.ceil(diff / 3600 / 24) + '天前'
  } else if (diff < 3600 * 24 * 365) {
    return Math.ceil(diff / 3600 / 24 / 30) + '月前'
  } else {
    return Math.ceil(diff / 3600 / 24 / 365) + '年前'
  }
}
