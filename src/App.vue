<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!-- 切换tab -->
  <div class="home-tab">
    <!-- 切换组件 -->
    <wb-tab
      @select-tab="changeTab"
    >
      <template v-slot:content>
        <!-- 我是内容 -->
        <content
          :current="current"
          :msg="'我是内容' + (current + 1)"
        />
      </template>
    </wb-tab>
  </div>
</template>

<script lang="ts">
/**
 * @param defineComponent 标识导出之后就是一个组件
 * @param ref 单个变量转换成响应式
 */
import { defineComponent, ref } from 'vue';
// 引入切换组件
import WbTab from './components/WbUi/tab/index.vue';
// 主体内容组件
import content from './components/content.vue';

export default defineComponent({
  name: 'App',
  components: {
    WbTab,
    content
  },
  setup() {

    // 声明一个下标默认是0， ref转换之后返回一个响应是对象{ value: 0 }
    // 修改访问需要使用current.value
    const current = ref(0)

    // 切换tab
    function changeTab(key: number) {
      current.value = key;
    }

    // 将我们想要在当前实例中用到的方法和属性暴露出来
    return {
      current,
      changeTab
    }
  }
});
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

li{
  list-style: none;
}

.home-tab{
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ebebeb;
  border-radius: 3px;
}
</style>
