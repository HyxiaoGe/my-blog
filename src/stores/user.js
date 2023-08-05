import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    // 定义 userInfo ，包括 username 和 nickname
    const userInfo = reactive({
        username: '',
        nickname: ''
    })

    // 设置用户信息
    function setUserInfo({username, nickname}) {
        userInfo.username = username
        userInfo.nickname = nickname
    }

    // 重置用户信息
    function resetUserInfo() {
        userInfo.username = ''
        userInfo.nickname = ''
    }

    return { userInfo, setUserInfo, resetUserInfo }
})