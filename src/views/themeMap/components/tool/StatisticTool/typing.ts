export interface TMapSpaceStatistic {
  regionName: string
  area: number
  chartData: { regionName: string; area: number }[]
  name?: string
}


 export interface TStatisticDetail {
   data: TMapSpaceStatistic
   title?: string
 }