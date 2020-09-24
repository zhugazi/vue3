<template>
  <div class="content-box">
    {{ msg }}
    <div class="actions">
      <input v-model="input" type="text" class="input">
      <wb-button type="primary" @click="add">添加</wb-button>
    </div>

    <div class="list-box">
      <div
        v-for="(item, key) in list"
        :key="key"
        class="list-item"
      >
        <span>{{ item }}</span>
        <wb-button type="danger" @click="remove">移除</wb-button>
      </div>
      <div v-show="!list.length" class="no-data">
        请添加数据
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  watchEffect,       // 每次更新都会执行
  toRefs,
  reactive
} from 'vue';

// button组件
import WbButton from './WbUi/button/index.vue'

// 所有的内容操作方法放到一起
import { ContentFun } from '../utils/contentFun';

const list: any[] = [];

export default defineComponent({
  name: 'HelloWorld',
  components: { WbButton },
  // 接收传过来的属性值
  props: {
    // 切换的下标
    current: {
      type: Number,
      required: true
    },
    // 内容
    msg: {
      type: String,
      required: true
    }
  },
  // 注意这个props传过来的是一个响应式对象，但是setup只会执行一次
  setup(props) {

    // 组件内用到的属性
    const state = reactive({
      input: '',
      list
    })

    // 进来就会执行，每次更新也会立即执行
    watchEffect(() => {
      console.log(props.current)
      console.log(props.msg)
    })

    // 由于props传过来之后会变成类似于reactive一样的响应式，所以我们需要再次将props用toRefs转换一下这样获取到每一个属性都是响应式
    const useRefRes = toRefs(props)
    const useRefStat = toRefs(state)

    return{
      ...useRefRes,
      ...useRefStat,
      ...ContentFun(state)
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.actions{
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}
.input{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 28px;
    line-height: 28px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 150px;
    margin-right: 15px;
}
.input:hover {
    border-color: #c0c4cc;
}
.input:focus {
    outline: none;
    border-color: #409eff;
}

.list-box{
  padding: 20px;
  border: 1px solid #DCDFE6;
}

.list-item{
  display: flex;
  justify-content: space-between;
  padding: 5px 20px;
  border-bottom: 1px solid #DCDFE6;
}
.list-item span{
  font-size: 14px;
  color: #606266;
}

.no-data{
  padding: 40px;
  text-align: center;
  font-size: 14px;
  color: #606266;
}

</style>
