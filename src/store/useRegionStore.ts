import { defineStore } from 'pinia'

interface TRegion {
  label: string
  fullName?: string
  value: string
  children?: TRegion[]
}

export const useRegionStore: any = defineStore('regionStore', {
  state: () => ({
    region: [] as TRegion[],
    currentRegion: undefined as TRegion | undefined
  }),
    actions: {
        loadRgion(originRegionList: TRegion[]) {
            this.$state.region = originRegionList
        },
        upateCurrent(current: TRegion) {
            this.$state.currentRegion = current
        },
    }
})
