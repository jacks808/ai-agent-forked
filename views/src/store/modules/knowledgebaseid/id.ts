import { defineStore } from 'pinia'
import { getKnowledge } from '@/api/chat'

export const idStore = defineStore('idStore', {
  state: () => {
    return {
      knowledgeid: 'samples',
    }
  },

  actions: {
    async initValue() {
      const res = await getKnowledge()
      this.knowledgeid = res.data.data?.[0]
    },
  },
})
