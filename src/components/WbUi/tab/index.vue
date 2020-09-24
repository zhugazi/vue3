<template>
    <div class="Wb-tab">
        <div class="Wb-tab-top">
            <div id="line-current" class="wb-tab-line-current"></div>
            <ul class="Wb-tab-ul">
                <li
                    v-for="(item, key) in list"
                    :key="key"
                    :class="['Wb-tab-ul-li', current === key && 'current']"
                    @click="selectedCurrent(key)"
                >
                    <slot name="name">{{ item.name }}</slot>
                    <span class="Wb-remove" @click.stop="removeItem(key)">X</span>
                </li>
            </ul>
            <button class="Wb-tab-add" @click="addTab">+</button>
        </div>

        <slot name="content">
            <div class="Wb-tab-content">
                {{ list[current].name }}
            </div>
        </slot>
        
    </div>
</template>

<script lang="ts">
import {
    defineComponent,     // 标识导出一个组件
    reactive,           // 接收一个对象，返回一个响应式对象
    toRefs,             // 可以用来为一个 reactive 对象的属性创建一个 ref。这个 ref 可以被传递并且能够保持响应性
    nextTick,           // 这是一个任务队列，等待同步任务结束之后依次执行
    onMounted,          // 挂载结束之后执行
    watch               // 监控一个对象或者属性，发生变化之后在操作
} from 'vue'

// 所有的操作方法都放在一起
import { TabFun, selectedState } from '../../../utils/tabChange';

export default defineComponent({
    /**
     * @param props // 传过来的参数信息
     * @param {}    // (parameter) data: SetupContext<EmitsOptions>
     */
    setup (props, { emit }) {
        // 把需要的数据转换成响应式
        const state = reactive({
            list:[
                { name: 'tab1' },
                { name: 'tab2' },
                { name: 'tab3' }
            ],
            current: 0
        })

        // toRefs 可以保证我们的reactive下边的所有属性都是响应式的
        const reactiveState = toRefs(state)

        onMounted(() => {
            nextTick(() => {
                selectedState(state.current)
            })
        })

        watch(
            () => state.current,
            (nv) => { // cb回调函数中有两个参数，新值和旧值
                selectedState(nv)
            }
        )

        return {
            ...reactiveState,
            ...TabFun(state, emit)
        }
    }
})
</script>

<style scoped>
.Wb-tab{
    position: relative;
}
.Wb-tab-top{
    position: relative;
    display: flex;
    justify-content: flex-start;
    justify-items: start;
    align-items: center;
    align-content: center;
    margin: 0 0 15px;
}
.Wb-tab-top:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #e4e7ed;
    z-index: 1;
}

.wb-tab-line-current{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: #409eff;
    z-index: 2;
    transition: transform .3s cubic-bezier(.645,.045,.355,1);
    list-style: none;
}

.Wb-tab-ul{
    position: relative;
    display: flex;
    justify-content: flex-start;
    flex-grow: 1;
}

.Wb-tab-ul-li{
    padding: 0 20px;
    min-width: 80px;
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    position: relative;
    cursor: pointer;
}
.Wb-tab-ul-li.current{
    color: #409eff;
}
.Wb-tab-ul-li .Wb-remove{
    width: 0;
}
.Wb-tab-ul-li.current .Wb-remove{
    width: 14px;
}
.Wb-tab-ul-li:not(.current):hover{
    padding-left: 6px;
    transition: padding-left .4s;
}
.Wb-tab-ul-li:not(.current):hover .Wb-remove{
    width: 15px;
    transition: width .4s;
}

.Wb-remove{
    position: relative;
    display: inline-block;
    font-size: 12px;
    width: 14px;
    height: 16px;
    vertical-align: middle;
    line-height: 15px;
    overflow: hidden;
    top: -1px;
    right: -2px;
    border-radius: 50%;
    transform-origin: 100% 50%;
    zoom: 0.8;
}
.Wb-remove::after{
    display: block;
    content: 'x';
}
.Wb-remove:hover{
    background-color: #c0c4cc;
    color: #fff;
}

.Wb-tab-add{
    border: 1px solid #d3dce6;
    height: 18px;
    width: 18px;
    line-height: 18px;
    margin: 12px 0 9px 10px;
    border-radius: 3px;
    text-align: center;
    font-size: 12px;
    color: #d3dce6;
    cursor: pointer;
    transition: all .15s;
}
.Wb-tab-add:hover {
    color: #409eff;
}

.Wb-tab-content{
    position: relative;
    overflow: hidden;
}
</style>