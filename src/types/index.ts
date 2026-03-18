/**
 * Created by lintao_alex on 2026/3/15
 */
export type MessageRole = 'user' | 'assistant' | 'system';
export type MessageStatus = 'streaming' | 'done' | 'error';

export interface ChatMessage {
    id: string;
    status: MessageStatus;
    role: MessageRole;
    content: string;
    createdAt: number;
}

export interface ChatSession {
    id: string;
    title: string;
    msgList: ChatMessage[];
    createdAt: number;
}
