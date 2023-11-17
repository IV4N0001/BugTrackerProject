export enum category {
    open = 'OPEN',
    in_progress = 'IN PROGRESS',
    closed = 'CLOSED'
}

export interface Project {
    name?: string
    description?: string
    createdAt?: Date
    expectedCompletionAt?: Date
    category?: category
    collaborators?: string[]
}