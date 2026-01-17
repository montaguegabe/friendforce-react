export type ContactType = "friend" | "professional" | "mentor";

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  contact_type: ContactType;
  birthday: string | null;
  last_contact: string | null;
  notes: string;
  needs_attention: boolean;
  created_at: string;
  updated_at: string;
}

export type ReminderFrequency =
  | "none"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "yearly";

export interface Reminder {
  id: string;
  contact: string;
  contact_name: string;
  title: string;
  due_date: string;
  frequency: ReminderFrequency;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  total_contacts: number;
  upcoming_reminders: number;
  recent_interactions_count: number;
  needs_attention: number;
}

export interface ContactFormData {
  name: string;
  email?: string;
  phone?: string;
  contact_type: ContactType;
  birthday?: string;
  notes?: string;
}

export interface ReminderFormData {
  contact: string;
  title: string;
  due_date: string;
  frequency: ReminderFrequency;
}
