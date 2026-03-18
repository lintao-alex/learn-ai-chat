import { defineStore } from 'pinia'
import { reactive } from 'vue'

/**
 * Created by lintao_alex on 2026/3/14
 */
export interface IConfig {
    apiKey: string
    modelUrl: string
    availableModels: Record<string, string>
    selectedModel: string
    temperature: number
    systemPrompt: string
}

export const useConfig = defineStore('config', ()=>{
    const result = reactive<IConfig>({
        apiKey: '',
        modelUrl: '',
        availableModels: {
            'DeepSeek Chat': 'deepseek-chat',
            'DeepSeek Reasoner': 'deepseek-reasoner',
        },
        selectedModel: 'deepseek-chat',
        temperature: 0.7,
        systemPrompt: '你是个聪明的AI助手'
    })
    return result
})