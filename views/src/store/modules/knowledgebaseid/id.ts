import { defineStore } from 'pinia'
import { getKnowledge } from '@/api/chat'

export const useIdStore = defineStore('idStore', {
  state: () => {
    return {
      knowledgeId: '',
    }
  },

  actions: {
    async initValue() {
      const res = await getKnowledge()
      this.knowledgeId = res.data.data?.[0]
    },
  },
})
