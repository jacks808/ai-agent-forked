import { api } from './api'

export const chat = (params: any) => {
  return api({
    url: '/chat',
    method: 'post',
    data: JSON.stringify(params),
  })
}

export const chatfile = (params: any) => {
  return api({
    url: '/local_doc_qa/local_doc_chat',
    method: 'post',
    data: JSON.stringify(params),
  })
}

export const getKnowledge = () => {
  return api({
    url: 'local_doc_qa/list_knowledge_base',
    method: 'get',
    // params: { knowledge_base_id },
  })
}

export const getKnowledgeFiles = (knowledge_base_id: string) => {
  return api({
    url: 'local_doc_qa/list_files',
    method: 'get',
    params: { knowledge_base_id },
  })
}

export const bing_search = (params: any) => {
  return api({
    url: '/local_doc_qa/bing_search_chat',
    method: 'post',
    data: JSON.stringify(params),
  })
}

export const deleteKnowledge = (knowledge_base_id: string) => {
  return api({
    url: '/local_doc_qa/delete_knowledge_base',
    method: 'delete',
    params: {
      knowledge_base_id,
    },
  })
}

interface deleteKnowledgeFileParams {
  knowledge_base_id: string
  doc_name: string
}

export const deleteKnowledgeFile = (params: deleteKnowledgeFileParams) => {
  return api({
    url: '/local_doc_qa/delete_file',
    method: 'delete',
    params,
  })
}

export const web_url = () => {
  return window.location.origin
}
export const setapi = () => {
  return process.env.NODE_ENV === 'development' ? '/api' : window.baseApi
}
