/* eslint-disable camelcase */
export interface ISearchParams extends IanyObject {
     location: string
     /**
      * @description 单次召回POI数量，默认为10条记录，最大返回20条。
      * @type {number}
      */
     page_size?: number
     /**
      * @description 分页页码，默认为0，0代表第一页，1代表第二页，依次类推
      * @type {number}
      */
     page_num?: number
     /**
      * @description 半径，单位m
      * @type {number}
      */
     radius?: number
     /**
      * @description 检索结果详细程度。取值为1 或空，则返回基本信息；取值为2，返回检索POI详细信息
      * @type {string}
      */
     scope?: '1' | '2'
     /**
      * @description key值
      * @type {string}
      */
     ak?: string
     query?: string
}

// FIXME: type 生活
export type TpoiType =
     | 'traffic'
     | 'education'
     | 'medical'
     | 'business'
     | 'environment'

export interface Location {
     lat: number
     lng: number
}

export interface PoiDetailInfo {
     /**
      * @description 距离 单位: m
      * @type {string}
      */
     distance: number // 距离中心点多少m
     // ...
}

export interface IpoiRes {
     address: string // poi地址信息
     province: string // 所属省份
     city: string // 所属城市
     area: string // 所属区县
     adcode: number // 行政区划代码
     telephone: string // poi电话信息
     uid: string // poi的唯一标示，可用于详情检索
     detail: string // 是否有详情页：1有，0没有
     name: string
     location: Location
     detail_info: PoiDetailInfo
}

export type TpoiArrRes = Array<IpoiRes>

export interface IaroundRes {
     results: TpoiArrRes
}

/* -------------------------------- 楼盘库反编码接口 -------------------------------- */
export type AReGeoParams = Omit<BReGeoParams, 'output', 'ak'>

/**
 * @description 百度地图逆编码API部分请求参数
 */
export interface BReGeoParams {
     location: string
     output: string
     ak: string
}

/**
 * @description 高德地图逆编码API请求结果的部分声明
 */
export interface AReGeoRes {
     status: '0' | '1'
     regeocode: {
          // eslint-disable-next-line camelcase
          formatted_address: string
          addressComponent: {
               adcode: string
               citycode: string
               province: string
          }
     }
}

/**
 * @description 百度地图逆编码API请求结果的部分声明
 */
export interface BReGeoRes {
     /**
      * @description 0表示成功，其他表示失败
      */
     status: number
     result: {
          location: Location
          formatted_address: string
          business: string
          addressComponent: {
               province: string
               adcode: string
          }
          cityCode: number
     }
}

/* -------------------------------- 楼盘库反编码接口 -------------------------------- */

export interface TransformLocationParams {
     coords: string // 需转换的源坐标，多组坐标以“;”分隔（经度，纬度）114.21892734521,29.575429778924
     ak: string
     /**
      * @description 源坐标类型
      * 1：GPS标准坐标；
        2：搜狗地图坐标；
        3：火星坐标（gcj02），即高德地图、腾讯地图和MapABC等地图使用的坐标；
        4：3中列举的地图坐标对应的墨卡托平面坐标;
        5：百度地图采用的经纬度坐标（bd09ll）；
        6：百度地图采用的墨卡托平面坐标（bd09mc）;
        7：图吧地图坐标；
        8：51地图坐标；
      */
     from: number
     /**
      * @description 目标坐标类型：
      * 3：火星坐标（gcj02），即高德地图、腾讯地图及MapABC等地图使用的坐标；
        5：百度地图采用的经纬度坐标（bd09ll）；
        6：百度地图采用的墨卡托平面坐标（bd09mc）；
      */
     to: number
     output: 'json' | 'xml'
}

export interface TransformLocationResult {
     status: number // 0 代表成功
     result: {
          x: number // 经度
          y: number // 纬度
     }[]
}
