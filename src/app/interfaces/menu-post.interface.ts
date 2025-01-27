import { MenuPostButton } from "./menu-post-button.interface";

export interface MenuPost {
    id: number;
    post_title?: string;
    post_content?: string;
    post_image_url?: string;
    created_at: Date;
    updated_at: Date;
    buttons?: MenuPostButton[];
  }