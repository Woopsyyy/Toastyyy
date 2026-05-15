export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      component_comments: {
        Row: {
          component_id: string
          content: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          component_id: string
          content: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          component_id?: string
          content?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      component_favorites: {
        Row: {
          component_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          component_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          component_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      components: {
        Row: {
          category: string
          created_at: string
          css_code: string | null
          description: string | null
          favorites: number
          html_code: string | null
          id: string
          react_code: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
          views: number
        }
        Insert: {
          category?: string
          created_at?: string
          css_code?: string | null
          description?: string | null
          favorites?: number
          html_code?: string | null
          id?: string
          react_code: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
          views?: number
        }
        Update: {
          category?: string
          created_at?: string
          css_code?: string | null
          description?: string | null
          favorites?: number
          html_code?: string | null
          id?: string
          react_code?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
          views?: number
        }
        Relationships: []
      }
      graph_presets: {
        Row: {
          config: Json
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          config?: Json
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          config?: Json
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          role: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          role?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          role?: string
          username?: string | null
        }
        Relationships: []
      }
      user_dashboards: {
        Row: {
          created_at: string
          id: string
          layout: Json
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          layout?: Json
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          layout?: Json
          title?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Row"]

export type TablesInsert<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Insert"]

export type TablesUpdate<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Update"]
