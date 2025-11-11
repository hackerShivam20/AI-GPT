# AI Chat Application

A responsive, multi-session AI Chat application built with React, Vite, TailwindCSS, and Gemini API. The application supports persistent chat sessions, localStorage-based state management, and a clean dark UI.

---

## ✅ How to Run the Application

### **1. Clone or download the project**

```
cd your-folder
```

### **2. Install dependencies**

```
npm install
```

### **3. Add Gemini API Key**

Create a `.env` file in the project root:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

You can generate the key from: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

Restart dev server after adding the key.

### **4. Start the development server**

```
npm run dev
```

The application will launch at:

```
http://localhost:5173/
```

---

## ✅ Features Implemented

### **Core Features**

* Responsive UI (mobile + desktop)
* Clean dark theme layout
* Sidebar for managing multiple chat sessions
* Create new chat sessions
* Switch between sessions instantly
* Chat messages stored in `localStorage`
* Active session restored on refresh
* Auto-scroll to latest message
* Scroll-to-top and scroll-to-bottom floating arrows
* Gemini API integration for real AI responses
* Loading/typing indicator for AI
* Error handling with fallback messages

### **Session Features**

* Each session has a unique ID
* Messages persist between page reloads
* Sessions stored locally (no backend needed)

### **Message Features**

* User & AI messages styled differently
* Dark-themed chat bubbles
* Smooth scrolling behavior
* Enter to send, Shift+Enter for new line
* Auto-resizing input box

### **UI/UX Enhancements**

* Hidden scrollbars for clean look
* Centered chat area with max-width
* Fixed floating scroll buttons
* Mobile-friendly spacing and structure

---

## ✅ Design Decisions & Assumptions

### **1. LocalStorage Instead of Backend**

The application stores sessions and messages in the browser via `localStorage` to avoid backend complexity. This keeps the project lightweight and easy to run locally.

### **2. Component-Based Structure**

The UI is broken into small reusable components:

* Sidebar
* ChatWindow
* MessageList
* MessageItem
* MessageInput
* API Wrapper

This improves readability and makes future updates easier.

### **3. TailwindCSS for Styling**

Tailwind was chosen due to:

* Rapid UI prototyping
* Consistent utility-first structure
* Easy dark mode support

### **4. Gemini API via REST**

The app uses the REST endpoint instead of the SDK to simplify:

* No additional library installation
* Pure fetch-based integration
* Easy debugging and portability

### **5. Dark Theme First Approach**

A dark UI was chosen because:

* Chat apps look cleaner in dark mode
* Better readability for message bubbles
* Modern aesthetic matching existing AI tools

### **6. Smooth Scrolling UX**

Auto-scroll and floating scroll buttons help maintain a polished, app-like feel similar to WhatsApp or ChatGPT.

---

## ✅ Future Improvements (Optional)

* Session rename/delete options
* Markdown rendering for AI messages
* Retry failed messages
* Export chat history as JSON
* Use React Context for global state
* TypeScript version for improved safety

---

## ✅ Summary

This project is a full-featured AI chat interface with a modern UI, persistent session management, and real Gemini-powered responses. It is lightweight, modular, and easy to extend for portfolio or production use.
