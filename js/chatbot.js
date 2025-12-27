// ===================================
// AI CHATBOT - Gemini Integration
// ===================================

class PortfolioChatbot {
  constructor() {
    this.apiEndpoint = 'https://melaku-tilahun-github-io.vercel.app/api/chat';
    this.messages = [];
    this.isOpen = false;
    this.isTyping = false;
    
    this.init();
  }
  
  init() {
    this.createChatUI();
    this.attachEventListeners();
  }
  
  createChatUI() {
    const chatHTML = `
      <!-- Chat Button -->
      <button class="chat-button" id="chatButton" aria-label="Open chat">
        <i class="fas fa-comments"></i>
      </button>
      
      <!-- Chat Window -->
      <div class="chat-window" id="chatWindow">
        <div class="chat-header">
          <h3>Chat with Melaku</h3>
          <button class="chat-close" id="chatClose" aria-label="Close chat">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="chat-messages" id="chatMessages">
          <div class="chat-welcome">
            <h4>👋 Hi! I'm Melaku's AI assistant</h4>
            <p>Ask me about skills, projects, or experience!</p>
            <div class="suggestion-chips">
              <button class="suggestion-chip" data-suggestion="Tell me about your projects">Your projects</button>
              <button class="suggestion-chip" data-suggestion="What are your main skills?">Your skills</button>
              <button class="suggestion-chip" data-suggestion="How can I contact you?">Contact info</button>
            </div>
          </div>
        </div>
        
        <div class="chat-input-container">
          <div class="chat-input-wrapper">
            <input 
              type="text" 
              class="chat-input" 
              id="chatInput" 
              placeholder="Ask me anything..."
              maxlength="500"
            >
            <button class="chat-send" id="chatSend" aria-label="Send message">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatHTML);
  }
  
  attachEventListeners() {
    const chatButton = document.getElementById('chatButton');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    
    chatButton.addEventListener('click', () => this.toggleChat());
    chatClose.addEventListener('click', () => this.toggleChat());
    chatSend.addEventListener('click', () => this.sendMessage());
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
    
    suggestionChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const suggestion = chip.dataset.suggestion;
        this.sendMessage(suggestion);
      });
    });
  }
  
  toggleChat() {
    this.isOpen = !this.isOpen;
    const chatWindow = document.getElementById('chatWindow');
    const chatButton = document.getElementById('chatButton');
    
    chatWindow.classList.toggle('active');
    chatButton.classList.toggle('active');
    
    if (this.isOpen) {
      document.getElementById('chatInput').focus();
    }
  }
  
  async sendMessage(text = null) {
    const chatInput = document.getElementById('chatInput');
    const message = text || chatInput.value.trim();
    
    if (!message || this.isTyping) return;
    
    // Clear input
    chatInput.value = '';
    
    // Add user message
    this.addMessage(message, 'user');
    
    // Show typing indicator
    this.showTypingIndicator();
    
    try {
      // Call API
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });
      
      if (!response.ok) throw new Error('Failed to get response');
      
      const data = await response.json();
      this.hideTypingIndicator();
      
      if (data.success) {
        // Add assistant response
        this.addMessage(data.response, 'assistant', data.suggestions);
        
        // Handle actions
        if (data.actions && data.actions.length > 0) {
          this.handleActions(data.actions);
        }
      } else {
        this.addMessage('Sorry, I encountered an error.', 'assistant');
      }
      
    } catch (error) {
      console.error('Chat error:', error);
      this.hideTypingIndicator();
      this.addMessage('Sorry, I\'m having trouble connecting. Please try again later.', 'assistant');
    }
  }

  handleActions(actions) {
    actions.forEach(action => {
      // Delay actions slightly for better UX
      setTimeout(() => {
        switch (action.type) {
          case 'NAVIGATE':
            if (action.payload.url) {
              const targetUrl = action.payload.url;
              const currentPath = window.location.pathname;
              
              // More robust check: does current path end with target URL?
              // Handles cases like /repo/projects.html vs /projects.html
              const isSamePage = currentPath.endsWith(targetUrl) || 
                                (targetUrl === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('index.html')));

              if (isSamePage) {
                 // Already on page, just apply filter if needed
                 if(action.payload.filter) {
                   this.applyFilter(action.payload.filter);
                 } else {
                   // Optional: Scroll to top if just navigating to same page
                   window.scrollTo({ top: 0, behavior: 'smooth' });
                 }
              } else {
                // Navigate to new page
                // Construct URL to ensure it works on GitHub Pages (relative paths)
                const newUrl = targetUrl + (action.payload.filter ? `?filter=${action.payload.filter}` : '');
                window.location.href = newUrl;
              }
            }
            break;
            
          case 'SCROLL_TO':
            const element = document.getElementById(action.payload.id);
            if (element) {
              // Close chat on mobile before scrolling/showing content
              if (window.innerWidth <= 768) {
                this.toggleChat();
              }
              setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 300);
            }
            break;
            
          case 'OPEN_LINK':
            window.open(action.payload.url, '_blank');
            break;
        }
      }, 800);
    });
  }
  
  applyFilter(filter) {
    // Check if we are on projects page and have functionality
    const filterBtn = document.querySelector(`[data-filter="${filter}"]`);
    if(filterBtn) filterBtn.click();
  }
  
  addMessage(text, sender, suggestions = null) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    let suggestionsHTML = '';
    if (suggestions && suggestions.length > 0) {
      suggestionsHTML = `
        <div class="suggestion-chips" style="justify-content: flex-start; margin-top: 8px;">
          ${suggestions.map(s => 
            `<button class="suggestion-chip" onclick="document.querySelector('.chat-input').value='${s.query}'; document.getElementById('chatSend').click();">${s.label}</button>`
          ).join('')}
        </div>
      `;
    }

    const messageHTML = `
      <div class="chat-message ${sender}">
        <div class="message-content-wrapper">
          <div class="message-bubble">
            ${this.escapeHtml(text)}
          </div>
          ${suggestionsHTML}
          <div class="message-time">${messageTime}</div>
        </div>
      </div>
    `;
    
    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    this.messages.push({ text, sender, time: messageTime });
  }
  
  showTypingIndicator() {
    this.isTyping = true;
    const messagesContainer = document.getElementById('chatMessages');
    const typingHTML = `
      <div class="chat-message assistant typing-message">
        <div class="message-bubble">
          <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
        </div>
      </div>
    `;
    
    messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  hideTypingIndicator() {
    this.isTyping = false;
    const typingMessage = document.querySelector('.typing-message');
    if (typingMessage) {
      typingMessage.remove();
    }
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioChatbot();
});
