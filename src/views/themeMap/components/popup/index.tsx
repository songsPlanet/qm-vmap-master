import { defineComponent } from 'vue'
import { Descriptions } from 'ant-design-vue'

export default defineComponent({
  props: ['data'],
  setup(props) {
    const fieldMap = [
      {
        name: 'dkbm',
        text: '地块编码'
      },
      {
        name: 'dkmc',
        text: '地块名称'
      },
      {
        name: 'zjrxm',
        text: '确权人名称'
      },
      {
        name: 'scmjm',
        text: '实测面积',
        func: () => `${props.data['scmjm']}亩`
      },
      {
        name: 'XZQH',
        text: '行政区划',
        func: () =>
          `${props.data['sjxzqh']}-${props.data['xjxzqh']}-${props.data['xzxzqh']}-${props.data['cjxzqh']}`
      }
    ]
    return () => (
      <Descriptions column={1} layout="horizontal" bordered size="small">
        {fieldMap.map((d) => (
          <Descriptions.Item key={d.name} label={d.text}>
            {d.func ? d.func() : props.data[d.name]}
          </Descriptions.Item>
        ))}
      </Descriptions>
    )
  }
})
