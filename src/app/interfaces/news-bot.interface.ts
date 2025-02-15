export interface NewsBot {
    id: number;
    post_title: string;
    post_content: string;
    post_image_url?: string;
    category: 'football' | 'basketball' | 'box' | 'ufc';
    isActive: boolean;
    news_url?: string;
    created_at: Date;
    updated_at: Date;
  }