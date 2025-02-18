export interface NewsCategory {
    id: number;
    name: string;
    description?: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface User {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    email?: string;
    language_code?: string;
    can_join_groups: boolean;
    can_read_all_group_messages: boolean;
    supports_inline_queries: boolean;
    state: string;
    last_active?: string;
    newsCategories: NewsCategory[]; // подписки пользователя
    isNewsActive: boolean;
    created_at: string;
    updated_at: string;
  }