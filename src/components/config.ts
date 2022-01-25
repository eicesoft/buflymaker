import {ElementGroup, ElementTypes} from "./type";

export const Configs = {
  components: {
    [ElementGroup.basic]: {
      label: '基础字段',
      list: [
        {
          type: ElementTypes.input,
          label: '输入框',
          hide: false,
          icon: 'icon-danhangshurukuang',
          options: {
            width: '100%',
            defaultValue: '',
            required: false,
            pattern: '',
            placeholder: '请输入内容',
            disabled: false,
          },
        },
        {
          type: ElementTypes.textarea,
          label: '文本域',
          icon: 'icon-28fuwenbenkuang',
          hide: false,
          options: {
            width: '100%',
            defaultValue: '',
            rows: 6,
            required: false,
            dataType: 'string',
            pattern: '',
            placeholder: '请输入内容',
            disabled: false,
          },
        },
        {
          type: ElementTypes.radio,
          label: '单选框',
          icon: 'icon-radio',
          hide: false,
          options: {
            defaultValue: null,
            options: [
              {
                label: '选项1',
                value: 1,
              },
              {
                label: '选项2',
                value: 2,
              },
            ],
            required: false,
            disabled: false,
          },
        },
        {
          type: ElementTypes.checkbox,
          label: '多选框',
          icon: 'icon-check-box-outline',
          hide: false,
          options: {
            defaultValue: [],
            options: [
              {
                label: '选项1',
                value: 1,
              },
              {
                label: '选项2',
                value: 2,
              },
            ],
            required: false,
            disabled: false,
          },
        },
        {
          type: ElementTypes.select,
          label: '下拉框',
          icon: 'icon-xialakuang',
          hide: false,
          options: {
            defaultValue: '',
            options: [
              {
                label: '选项1',
                value: 1,
              },
              {
                label: '选项2',
                value: 2,
              },
            ],
            mulitselect: false,
            required: false,
            disabled: false,
          },
        },
        {
          type: ElementTypes.date,
          label: '日期',
          icon: 'icon-xialakuang',
          hide: false,
          options: {
            defaultValue: null,
            options: [],
            mulitselect: false,
            required: false,
            disabled: false,
          },
        },
        {
          type: ElementTypes.time,
          label: '时间',
          icon: 'icon-xialakuang',
          hide: false,
          options: {
            defaultValue: null,
            options: [],
            mulitselect: false,
            required: false,
            disabled: false,
          },
        },
        {
          type: ElementTypes.rate,
          label: '评分',
          icon: 'icon-xialakuang',
          hide: false,
          options: {
            defaultValue: null,
            options: [],
            max: 5,
            min: 0,
            mulitselect: false,
            required: false,
            disabled: false,
          },
        },
        {
          type: ElementTypes.slider,
          label: '范围',
          icon: 'icon-xialakuang',
          hide: false,
          options: {
            defaultValue: [0, 100],
            max: 100,
            min: 0,
            options: [],
            mulitselect: false,
            required: false,
            disabled: false,
          },
        },
        {
          type: ElementTypes.switch,
          label: '开关',
          icon: 'icon-xialakuang',
          hide: false,
          options: {
            defaultValue: false,
            options: [],
            mulitselect: false,
            required: false,
            disabled: false,
          },
        },
      ],
    },
    [ElementGroup.advance]: {
      label: '高级字段',
      list: [
        {
          type: ElementTypes.custom,
          label: '自定义区域',
          icon: 'icon-tab',
          hide: false,
          columns: [],
          options: {
            defaultValue: '',
          },
        },
      ],
    },
    [ElementGroup.layout]: {
      label: '布局字段',
      list: [
        {
          type: ElementTypes.grid,
          label: '宫格布局',
          icon: 'icon-grid',
          hide: false,
          columns: [
            {
              span: 1,
              list: [],
            },
            {
              span: 1,
              list: [],
            },
          ],
          options: {
            column: 2,
          },
        },
        {
          type: ElementTypes.tab,
          label: '标签页',
          icon: 'icon-tab',
          hide: false,
          columns: [
            {
              name: 'tab1',
              list: [],
            },
            {
              name: 'tab2',
              list: [],
            },
          ],
          options: {
            defaultValue: 'tab1',
            column: 2,
          },
        },
        {
          type: ElementTypes.repeat,
          label: '重复',
          icon: 'icon-tab',
          hide: false,
          columns: [
            {
              list: [],
            },
          ],
          options: {
            defaultValue: 'tab1',
            column: 2,
          },
        },

        {
          type: ElementTypes.divider,
          hide: false,
          label: '分割线',
          icon: 'icon-slider',
          options: {},
        },
      ],
    },
  },
  form: {
    size: 'small',
    position: 'left',
    labelWidth: '100px',
  },
};
