import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

function useNavToHome() {
    const router = useRouter();
    const { userInfo } = useUserStore();
    // 监听 userInfo.username 的变化，如果有值，说明用户已经登录，跳转到首页
    watch(() => userInfo.username, (val) => {
      if (val) {
        router.push('/');
      }
    }, { immediate: true });
}

export default useNavToHome;