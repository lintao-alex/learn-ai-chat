/**
 * Created by lintao_alex on 2026/3/14
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { ChatSession } from '../types'

export const useSessionStore = defineStore('session', ()=> {
    const sessions = ref<ChatSession[]>([])
    const activeSessionId = ref<string | null>(null)
    const activeSession = computed(()=>{
        const id = activeSessionId.value
        if (!id) return null
        return sessions.value.find(v=>v.id === id) ?? null
    })

    function createSession(): ChatSession {
        const result: ChatSession = {
            id: crypto.randomUUID(),
            title: 'new session',
            msgList: [],
            createdAt: Date.now()
        }
        sessions.value.push(result)
        activeSessionId.value = result.id
        return result
    }

    function ensureActiveSession() {
        let active = activeSession.value
        if (!active) {
            active = createSession()
        }
        return active
    }

    function switchSession(id: string): boolean {
        if (sessions.value.findIndex(v=>v.id === id) < 0) return false
        activeSessionId.value = id
        return true
    }

    function removeSession(id: string): void {
        const list = sessions.value
        const idx = list.findIndex(v=>v.id === id)
        if (idx >= 0) {
            list.splice(idx, 1)
            if (activeSessionId.value === id) {
                const first = list[0]
                if (first) {
                    activeSessionId.value = first.id
                } else {
                    activeSessionId.value = null
                }
            }
        }
    }

    return { sessions, activeSessionId, activeSession, createSession, switchSession, removeSession, ensureActiveSession }
})