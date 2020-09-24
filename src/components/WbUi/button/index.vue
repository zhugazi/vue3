<template>
    <button class="el-button" :class="['el-button--' + type]">
        <slot></slot>
    </button>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
    name: 'content',
    props: {
        type: {
            type: String,
            required: true
        }
    },
    setup (props) {

        const pro = toRefs(props)

        return {
            ...pro
        }
    }
})
</script>

<style scoped>
.el-button{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 6px 15px;
    font-size: 12px;
    border-radius: 4px;
}
.el-button--primary {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
}

.el-button--primary:focus,
.el-button--primary:hover{
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
}
.el-button--primary:active {
    background: #3a8ee6;
    border-color: #3a8ee6;
    color: #fff;
}

.el-button--danger {
    color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;
}
.el-button--danger:focus, .el-button--danger:hover {
    background: #f78989;
    border-color: #f78989;
    color: #fff;
}
.el-button--danger:active {
    background: #dd6161;
    border-color: #dd6161;
    color: #fff;
}
</style>