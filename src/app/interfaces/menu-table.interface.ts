import { MenuPost } from "./menu-post.interface";

export interface MenuTable {
    id: number;
    name: string;
    description?: string;
    order: number;
    parentId?: number;
    isActive: boolean;
    linked_post?: MenuPost;
    created_at: Date;
    updated_at: Date;
  }