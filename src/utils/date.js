// 日期格式化函数，传入秒级别的时间戳，返回格式化的字符串
// 返回格式如：1分钟前，1小时前，1天前，1月前，1年前
export function formatRelativeTime(timestamp) {
  const date = new Date(timestamp)

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

// 接受一个毫秒级时间戳，创建一个日期对象，并提取各个部分，然后格式化为 yyyy-mm-dd hh:mm:ss 格式的字符串。
export function formatDate(timestamp) {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
