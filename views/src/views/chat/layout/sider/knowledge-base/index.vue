<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput, NPopconfirm } from 'naive-ui'
import { onMounted, ref } from 'vue'
import filelist from './filelist.vue'
import { SvgIcon } from '@/components/common'
import { deleteKnowledge, getKnowledge } from '@/api/chat'
import { useIdStore } from '@/store/modules/knowledgebaseid/id'
import { useBasicLayout } from '@/hooks/useBasicLayout'
const items = ref<any>([])
const choice = ref('')
const store = useIdStore()
const { debug } = useBasicLayout()

onMounted(async () => {
  const res = await getKnowledge()
  choice.value = res.data.data?.[0]
  res.data.data.forEach((item: any) => {
    items.value.push({
      value: item,
      show: true,
    })
  })
})
const formValue = ref({
  user: {
    name: '',
  },
})
const rules = {
  user: {
    name: {
      required: true,
      message: '请输入名称',
      trigger: 'blur',
    },
  },
}
const handleValidateClick = (item: any) => {
  choice.value = item
  store.knowledgeId = choice.value
  items.value.forEach((res: { value: any; show: boolean }) => {
    if (res.value === item)
      res.show = !res.show
  })
}
const handleClick = () => {
  if (formValue.value.user.name.trim() !== '') {
    items.value.push({
      value: formValue.value.user.name.trim(),
      show: false,
    })
  }
}
async function handleDelete(item: any) {
  await deleteKnowledge(item.value)
  const res = await getKnowledge()
  items.value = []
  res.data.data.forEach((item: any) => {
    items.value.push({
      value: item,
      show: false,
    })
  })
}
</script>

<template>
  <div v-if="debug">
    <NButton block size="large">
      对话知识库：{{ choice }}
    </NButton>
    <NForm ref="formRef" inline :label-width="80" :model="formValue" :rules="rules">
      <NFormItem label="" path="user.name">
        <NInput v-model:value="formValue.user.name" placeholder="起个知识库名吧！" />
      </NFormItem>
      <NFormItem>
        <NButton attr-type="button" @click="handleClick">
          新增
        </NButton>
      </NFormItem>
    </NForm>
  </div>

  <div v-for="item in items" :key="item.value">
    <div v-if="debug" class="flex items-center relative">
      <NButton block size="large" style="width: 90%" @click="handleValidateClick(item.value)">
        {{ item.value }}
      </NButton>
      <div class="absolute z-10 flex visible -right-1">
        <template v-if="item.isEdit" />
        <template v-else>
          <NPopconfirm placement="bottom" @positive-click="handleDelete(item)">
            <template #trigger>
              <button class="p-1">
                <SvgIcon icon="ri:delete-bin-line" />
              </button>
            </template>
            确定删除此文件？
          </NPopconfirm>
        </template>
      </div>
    </div>

    <div v-if="item.show" class="p-2 flex-1 min-h-0 pb-4 overflow-hidden">
      <filelist v-if="item.value" :knowledgebaseid="item.value" />
    </div>
    <br>
  </div>
</template>
