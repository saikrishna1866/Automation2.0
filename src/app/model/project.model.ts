export interface Project {
    name: string,
    type: 'Project' | 'Folder' | 'File',
    id: number,
    parentId?: number,
    children?: Project[],
    content?: string
}
