import { ref, isRef, onMounted, onBeforeUnmount, watchEffect } from 'vue';

const NAME = 'HyxiaoBlog'

function useTitle(title) {
    const originalTitle = ref(document.title);

    if (isRef(title)) {
        watchEffect(() => {
            if (title.value) {
                document.title = title.value  + '-'  + NAME;
            }
        });
    }

    // 更新网页标题
    const updateTitle = () => {
        document.title = `${title} - ${NAME}`;
    };

    // 在组件挂载时更新网页标题
    onMounted(() => {
        updateTitle();
    });

    // 在组件卸载时恢复原始网页标题
    onBeforeUnmount(() => {
        document.title = originalTitle.value;
    });

    return {
        updateTitle
    };
}

export default useTitle;