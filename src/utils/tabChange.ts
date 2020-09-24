/**
 * @param state 响应式对象
 * @param emit  触发事件
 */
export function TabFun(state: any, emit: any) {

    // 添加一个选项卡
    function addTab() {
        state.list.push({ name: `tab${state.list.length + 1}` });
    }

    // 删除tab
    function removeItem(key: number) {
        state.list.splice(key, 1);
    }

    // 选中状态
    function selectedCurrent(key: number) {
        state.current = key;
        emit('select-tab', key);
    }

    return {
        addTab,
        removeItem,
        selectedCurrent,
    };
}

// 控制选中的状态，切换的时候执行
let w: number = 0;
export function selectedState(current: number): any {
    const line = document.getElementById('line-current');
    const oli = document.querySelector('.Wb-tab-ul-li');
    const W = w || (oli as Element | any).offsetWidth;
    w = w || W;
    ((line as Element | any).style as CSSStyleDeclaration).width = W + 'px';
    ((line as Element | any).style as CSSStyleDeclaration).transform = `translateX(${current * Number(W)}px)`;
}
