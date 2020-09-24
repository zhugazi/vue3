/**
 * 朱鹏辉
 * @param state 响应式对象
 */
export function ContentFun(state: any) {
    // 添加一条数据
    function add() {
        state.list.push(state.input);
    }

    // 删除一条数据
    function remove(key: number) {
        state.list.splice(key, 1);
    }

    return {
        add,
        remove,
    };
}
