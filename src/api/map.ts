import request from '@/utils/axios'
/**
 * 获取新型农业主体责任人人员列表
 * @param {string} keyword  承保方姓名 、承保方证件号.
 */
export const getXXNYZTUserListApi = (keyword: string) => {
  return request.post(`/v1.0/xxnyjyzt/getXxjyztList`, { keyword })
}

/**
 * 获取作物遥感识别图斑列表
 * @param {string} objectId 承保方主键.
 * @param {string} zwType 作物类型.
 */
export const getXxjyztListDetailApi = (id: string, tableName: string) => {
  return request.post(`/v1.0/xxnyjyzt/getXxjyztListDetail`, { id, tableName })
}

/**
 * 获取分类
 *
 */
export const getSearchLayerListApi = (dictTypeCode: 'table_name') => {
  return request.post(`/v1.0/sysDict/list`, { dictTypeCode })
}
