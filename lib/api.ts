const API_BASE = "/api";

export class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "API request failed");
    }

    return response.json();
  }

  // Goals API
  async getGoals(userId: string, privacy?: string) {
    const params = new URLSearchParams({ userId });
    if (privacy) params.append("privacy", privacy);
    return this.request(`/goals?${params}`);
  }

  async createGoal(goal: {
    title: string;
    description?: string;
    category?: string;
    targetDate?: string;
    privacy?: "public" | "private" | "friends";
    userId: string;
  }) {
    return this.request("/goals", {
      method: "POST",
      body: JSON.stringify(goal),
    });
  }

  async updateGoal(
    id: string,
    updates: {
      title?: string;
      description?: string;
      category?: string;
      targetDate?: string;
      privacy?: "public" | "private" | "friends";
      status?: "active" | "completed" | "paused" | "cancelled";
      progress?: number;
    }
  ) {
    return this.request(`/goals/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  }

  async deleteGoal(id: string) {
    return this.request(`/goals/${id}`, {
      method: "DELETE",
    });
  }

  // Feed API
  async getFeed(userId: string, limit = 20, offset = 0) {
    const params = new URLSearchParams({
      userId,
      limit: limit.toString(),
      offset: offset.toString(),
    });
    return this.request(`/feed?${params}`);
  }

  // Reminders API
  async getReminders(userId: string, type?: string) {
    const params = new URLSearchParams({ userId });
    if (type) params.append("type", type);
    return this.request(`/reminders?${params}`);
  }

  async sendReminder(reminder: {
    message: string;
    type?: "encouragement" | "checkin" | "deadline";
    goalId: string;
    fromUserId: string;
    toUserId: string;
  }) {
    return this.request("/reminders", {
      method: "POST",
      body: JSON.stringify(reminder),
    });
  }

  // Follow API
  async getFollowing(userId: string) {
    return this.request(`/follow?userId=${userId}&type=following`);
  }

  async getFollowers(userId: string) {
    return this.request(`/follow?userId=${userId}&type=followers`);
  }

  async followUser(followerId: string, followingId: string) {
    return this.request("/follow", {
      method: "POST",
      body: JSON.stringify({ followerId, followingId }),
    });
  }

  async unfollowUser(followerId: string, followingId: string) {
    return this.request(
      `/follow?followerId=${followerId}&followingId=${followingId}`,
      {
        method: "DELETE",
      }
    );
  }

  // Users API
  async searchUsers(query: string, limit = 10) {
    return this.request(`/users?q=${encodeURIComponent(query)}&limit=${limit}`);
  }

  async getUser(id: string) {
    return this.request(`/users/${id}`);
  }

  async updateUser(
    id: string,
    updates: {
      name?: string;
      bio?: string;
      avatar?: string;
    }
  ) {
    return this.request(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  }
}

export const api = new ApiClient();
