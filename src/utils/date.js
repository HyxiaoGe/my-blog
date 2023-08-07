// 日期格式化函数，传入日期时间（或字符串），返回格式化的字符串
// 返回格式如：1分钟前，1小时前，1天前，1月前，1年前
export function formatDate(date) {
    // 获取当前时间
    const now = new Date().getTime();
    // 获取传入时间
    const time = new Date(date).getTime();
    // 获取时间差
    const diff = now - time;
    // 定义时间差转换为分钟的变量
    const diffMin = diff / 1000 / 60;
    // 定义时间差转换为小时的变量
    const diffHour = diff / 1000 / 60 / 60;
    // 定义时间差转换为天的变量
    const diffDay = diff / 1000 / 60 / 60 / 24;
    // 定义时间差转换为月的变量
    const diffMonth = diff / 1000 / 60 / 60 / 24 / 30;
    // 定义时间差转换为年的变量
    const diffYear = diff / 1000 / 60 / 60 / 24 / 30 / 12;
    // 判断时间差是否小于1分钟
    if (diffMin < 1) {
        return '刚刚';
    } else if (diffMin < 60) {
        // 判断时间差是否小于1小时
        return Math.floor(diffMin) + '分钟前';
    } else if (diffHour < 24) {
        // 判断时间差是否小于1天
        return Math.floor(diffHour) + '小时前';
    } else if (diffDay < 30) {
        // 判断时间差是否小于1月
        return Math.floor(diffDay) + '天前';
    } else if (diffMonth < 12) {
        // 判断时间差是否小于1年/*  */
        return Math.floor(diffMonth) + '月前';
    } else {
        return Math.floor(diffYear) + '年前';
    }
}