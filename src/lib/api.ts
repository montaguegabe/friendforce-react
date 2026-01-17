import type {
  Contact,
  ContactFormData,
  DashboardStats,
  Reminder,
  ReminderFormData,
} from "@/types/friendforce";

import { getCSRFToken } from "./django";

const API_BASE = "/api/friendforce";

async function fetchWithCSRF(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const csrfToken = getCSRFToken();
  return fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(csrfToken && { "X-CSRFToken": csrfToken }),
      ...options.headers,
    },
  });
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `Request failed: ${response.status}`);
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return response.json();
}

export const contactsApi = {
  list: async (): Promise<Contact[]> => {
    const res = await fetchWithCSRF(`${API_BASE}/contacts/`);
    return handleResponse(res);
  },

  get: async (id: string): Promise<Contact> => {
    const res = await fetchWithCSRF(`${API_BASE}/contacts/${id}/`);
    return handleResponse(res);
  },

  create: async (data: ContactFormData): Promise<Contact> => {
    const res = await fetchWithCSRF(`${API_BASE}/contacts/`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  update: async (id: string, data: Partial<ContactFormData>): Promise<Contact> => {
    const res = await fetchWithCSRF(`${API_BASE}/contacts/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetchWithCSRF(`${API_BASE}/contacts/${id}/`, {
      method: "DELETE",
    });
    return handleResponse(res);
  },

  logInteraction: async (id: string): Promise<{ message: string }> => {
    const res = await fetchWithCSRF(`${API_BASE}/contacts/${id}/log-interaction/`, {
      method: "POST",
    });
    return handleResponse(res);
  },
};

export const remindersApi = {
  list: async (): Promise<Reminder[]> => {
    const res = await fetchWithCSRF(`${API_BASE}/reminders/`);
    return handleResponse(res);
  },

  get: async (id: string): Promise<Reminder> => {
    const res = await fetchWithCSRF(`${API_BASE}/reminders/${id}/`);
    return handleResponse(res);
  },

  create: async (data: ReminderFormData): Promise<Reminder> => {
    const res = await fetchWithCSRF(`${API_BASE}/reminders/`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  update: async (id: string, data: Partial<ReminderFormData>): Promise<Reminder> => {
    const res = await fetchWithCSRF(`${API_BASE}/reminders/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetchWithCSRF(`${API_BASE}/reminders/${id}/`, {
      method: "DELETE",
    });
    return handleResponse(res);
  },

  upcoming: async (): Promise<Reminder[]> => {
    const res = await fetchWithCSRF(`${API_BASE}/reminders/upcoming/`);
    return handleResponse(res);
  },

  complete: async (id: string): Promise<{ message: string }> => {
    const res = await fetchWithCSRF(`${API_BASE}/reminders/${id}/complete/`, {
      method: "POST",
    });
    return handleResponse(res);
  },
};

export const dashboardApi = {
  stats: async (): Promise<DashboardStats> => {
    const res = await fetchWithCSRF(`${API_BASE}/dashboard/`);
    return handleResponse(res);
  },

  stale: async (): Promise<Contact[]> => {
    const res = await fetchWithCSRF(`${API_BASE}/dashboard/stale/`);
    return handleResponse(res);
  },

  recent: async (): Promise<Contact[]> => {
    const res = await fetchWithCSRF(`${API_BASE}/dashboard/recent/`);
    return handleResponse(res);
  },
};
