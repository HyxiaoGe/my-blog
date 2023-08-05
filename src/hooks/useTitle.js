import { ref, onMounted, onBeforeUnmount } from 'vue';

const NAME = 'TechBlog'

function useTitle(title) {
    const originalTitle = ref(document.title);

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