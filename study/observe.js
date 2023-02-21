// 简易版
// 通过 watch 来监听某个对象的某个值，如果改变后触发方法。

// 思路对某个值进行defineProperty修改其 get 的时候收集、set 的时候触发方法
const data = {
  a: 1
}
Target = null
let dep = []
$watch('a', () => {
  console.log('我被watch了1')
})

$watch('a', () => {
  console.log('我被watch了2')
})

function $watch(exp, fn) {
  // 将 Target 的值设置为 fn
  Target = fn
  // 读取字段值，触发 get 函数
  data[exp]
}

Object.defineProperty(data, 'a', {
  set() {
    dep.forEach(fun => fun())
  },
  get() {
    dep.push(Target)
  }
})
