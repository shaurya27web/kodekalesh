const API_BASE_URL = 'http://localhost:3001';

export const contentApi = {
  // Health check
  async getHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) throw new Error('Health check failed');
      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      return {
        status: "unhealthy",
        networks: {
          ethereum: { connected: false },
          aptos: { connected: false }
        }
      };
    }
  },

  // Generate content
  async generateContent(prompt, contentType = 'social-media') {
    try {
      const response = await fetch(`${API_BASE_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, contentType }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Generation failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Content generation error:', error);
      throw error;
    }
  },

  // Verify content
  async verifyContent(contentId, contentHash, content = null) {
    try {
      const payload = { contentId, contentHash };
      if (content) payload.content = content;
      
      const response = await fetch(`${API_BASE_URL}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) throw new Error('Verification failed');
      return await response.json();
    } catch (error) {
      console.error('Content verification error:', error);
      throw error;
    }
  },

  // Get content analytics (mock for now - would connect to your backend analytics)
  async getContentAnalytics() {
    try {
      // This would be a new endpoint in your backend
      // For now, return mock data
      return {
        totalContent: 156,
        publishedThisWeek: 23,
        pendingReview: 8,
        completionRate: 74.2,
        categories: {
          'Social Media': 45,
          'Blog Articles': 32,
          'Video Content': 28,
          'Email Campaigns': 25,
          'Advertising Copy': 26
        }
      };
    } catch (error) {
      console.error('Analytics fetch error:', error);
      // Return fallback data
      return {
        totalContent: 0,
        publishedThisWeek: 0,
        pendingReview: 0,
        completionRate: 0,
        categories: {}
      };
    }
  }
};