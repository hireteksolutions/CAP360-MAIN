export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      consultations: {
        Row: {
          created_at: string
          current_position: string | null
          email: string
          goals: string | null
          id: string
          name: string
          phone: string | null
          preferred_date: string | null
          preferred_time: string | null
        }
        Insert: {
          created_at?: string
          current_position?: string | null
          email: string
          goals?: string | null
          id?: string
          name: string
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
        }
        Update: {
          created_at?: string
          current_position?: string | null
          email?: string
          goals?: string | null
          id?: string
          name?: string
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          career_level: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          message: string | null
          phone: string | null
          service: string | null
        }
        Insert: {
          career_level?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          message?: string | null
          phone?: string | null
          service?: string | null
        }
        Update: {
          career_level?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          message?: string | null
          phone?: string | null
          service?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          billing_address: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          package_name: string
          package_price: string
          payment_method: string
          zip_code: string | null
        }
        Insert: {
          billing_address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          package_name: string
          package_price: string
          payment_method: string
          zip_code?: string | null
        }
        Update: {
          billing_address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          package_name?: string
          package_price?: string
          payment_method?: string
          zip_code?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      resume_audit_requests: {
        Row: {
          additional_info: string | null
          created_at: string
          current_position: string | null
          email: string
          experience_years: string | null
          id: string
          name: string
          phone: string | null
          resume_file_path: string | null
          status: string | null
          target_position: string | null
          updated_at: string
        }
        Insert: {
          additional_info?: string | null
          created_at?: string
          current_position?: string | null
          email: string
          experience_years?: string | null
          id?: string
          name: string
          phone?: string | null
          resume_file_path?: string | null
          status?: string | null
          target_position?: string | null
          updated_at?: string
        }
        Update: {
          additional_info?: string | null
          created_at?: string
          current_position?: string | null
          email?: string
          experience_years?: string | null
          id?: string
          name?: string
          phone?: string | null
          resume_file_path?: string | null
          status?: string | null
          target_position?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      success_stories: {
        Row: {
          challenges: string
          client_name: string
          company: string
          created_at: string
          id: string
          industry: string
          is_featured: boolean
          is_published: boolean
          new_position: string
          previous_position: string
          rating: number
          results: string
          salary_increase_percentage: number
          solutions: string
          story_date: string
          testimonial_quote: string
          timeline: string
          updated_at: string
        }
        Insert: {
          challenges: string
          client_name: string
          company: string
          created_at?: string
          id?: string
          industry: string
          is_featured?: boolean
          is_published?: boolean
          new_position: string
          previous_position: string
          rating: number
          results: string
          salary_increase_percentage: number
          solutions: string
          story_date?: string
          testimonial_quote: string
          timeline: string
          updated_at?: string
        }
        Update: {
          challenges?: string
          client_name?: string
          company?: string
          created_at?: string
          id?: string
          industry?: string
          is_featured?: boolean
          is_published?: boolean
          new_position?: string
          previous_position?: string
          rating?: number
          results?: string
          salary_increase_percentage?: number
          solutions?: string
          story_date?: string
          testimonial_quote?: string
          timeline?: string
          updated_at?: string
        }
        Relationships: []
      }
      table_name: {
        Row: {
          data: Json | null
          id: number
          inserted_at: string
          name: string | null
          updated_at: string
        }
        Insert: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        args: { _user_id: string }
        returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
export type Constants = typeof Constants