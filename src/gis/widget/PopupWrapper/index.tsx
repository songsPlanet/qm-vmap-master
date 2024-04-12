import { h, defineComponent } from 'vue'

export default defineComponent(
  (props) => {
    return () => {
      // 渲染函数或 JSX
      return h(props.template, { data: props.data })
    }
  },
  // 其他选项，例如声明 props 和 emits。
  {
    props: ['template', 'data']
  }
)
