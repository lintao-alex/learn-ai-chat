/**
 * Created by lintao_alex on 2026/3/14
 */
import { useSessionStore } from './session'
import type { MessageStatus } from '../types'

export function addUserMessage(content: string) {
    const activeSession = useSessionStore().ensureActiveSession()
    activeSession.msgList.push({
        id: crypto.randomUUID(),
        role: 'user',
        content,
        status: 'done',
        createdAt: Date.now()
    })
}

export function startAssistantMessage() {
    const id = crypto.randomUUID()
    const activeSession = useSessionStore().ensureActiveSession()
    activeSession.msgList.push({
        id,
        role: 'assistant',
        status: 'streaming',
        createdAt: Date.now(),
        content: ''
    })
    return id
}

export function appendToken(id: string, token: string) {
    const msg = currentMessages().find(v=>v.id === id)
    if (msg) {
        msg.content += token
    }
}

export function finalizeMessage(id: string, status: Exclude<MessageStatus, 'streaming'>) {
    const msg = currentMessages().find(v=>v.id === id)
    if (msg) {
        msg.status = status
    }
}


function currentMessages() {
    return useSessionStore().ensureActiveSession().msgList
}