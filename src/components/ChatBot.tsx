import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Globe, Bot, ChevronDown, Loader2 } from 'lucide-react'
import type { ChatMessage, ChatResponse } from '../api/chatApi'
import { sendChat } from '../api/chatApi'

const INTENT_COLORS: Record<string, string> = {
  NEWS: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  MARKET: 'bg-green-500/20 text-green-300 border-green-500/30',
  IMPACT: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  RECOMMENDATION: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  SIMULATION: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  GRAPH: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  REPORT: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
}

const SUGGESTIONS = [
  'Why is oil rising today?',
  'What stocks benefit from a Taiwan blockade?',
  'Simulate Russia reducing gas exports by 30%',
  'Show latest sanctions',
  'Should I buy energy stocks?',
  'Generate an intelligence report',
]

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Welcome to MarketAtlas. I\'m your Geopolitical Intelligence Officer. Ask me about markets, geopolitics, or run simulations.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  const handleSend = async (text?: string) => {
    const query = (text || input).trim()
    if (!query || loading) return

    setShowSuggestions(false)
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: query }])
    setLoading(true)

    try {
      const result: ChatResponse = await sendChat(query)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: formatResponse(result),
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Connection error. Please ensure the backend server is running.',
      }])
    } finally {
      setLoading(false)
    }
  }

  const formatResponse = (result: ChatResponse): string => {
    let formatted = result.response

    if (result.intent === 'REPORT' && !formatted.startsWith('#')) {
      formatted = `**Intelligence Report**\n\n${formatted}`
    }

    if (result.sources?.length) {
      formatted += `\n\n*Sources: ${result.sources.join(', ')}*`
    }

    return formatted
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
    if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-2 text-white shadow-2xl hover:shadow-accent/30 hover:scale-105 transition-all duration-200 flex items-center justify-center"
        aria-label="Toggle chat"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[420px] h-[600px] dark:bg-gray-900 bg-white rounded-2xl shadow-2xl border dark:border-white/10 border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b dark:border-white/10 border-gray-200 bg-gradient-to-r dark:from-gray-900 dark:to-gray-950 from-white to-gray-50">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold dark:text-white text-gray-900">MarketAtlas AI</h3>
              <p className="text-[10px] dark:text-gray-500 text-gray-400 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Geopolitical Intelligence Officer
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b dark:from-gray-900/50 dark:to-gray-950/50 from-gray-50/50 to-white/50">
            {showSuggestions && messages.length <= 1 && (
              <div className="mb-3">
                <p className="text-[10px] dark:text-gray-500 text-gray-400 mb-2 uppercase tracking-wider font-medium">Suggested queries</p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => { setInput(s); handleSend(s) }}
                      className="text-[10px] px-2.5 py-1.5 rounded-lg dark:bg-white/5 bg-gray-100 dark:text-gray-300 text-gray-700 border dark:border-white/10 border-gray-200 hover:border-accent/50 transition-colors whitespace-nowrap"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.role === 'user'
                  ? 'bg-gradient-to-r from-accent to-accent-2 text-white rounded-2xl rounded-tr-md px-4 py-2.5'
                  : 'dark:bg-gray-800/80 bg-gray-100 dark:text-gray-200 text-gray-800 rounded-2xl rounded-tl-md px-4 py-2.5'
                }`}>
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Globe className="w-3 h-3 text-accent" />
                      <span className="text-[9px] dark:text-gray-400 text-gray-500 font-medium">MarketAtlas AI</span>
                    </div>
                  )}
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="dark:bg-gray-800/80 bg-gray-100 rounded-2xl rounded-tl-md px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-accent" />
                    <span className="text-xs dark:text-gray-400 text-gray-500">Analyzing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t dark:border-white/10 border-gray-200 p-4 dark:bg-gray-950 bg-white">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about markets, geopolitics..."
                className="flex-1 text-sm dark:bg-gray-800 bg-gray-100 dark:text-white text-gray-900 rounded-xl px-4 py-2.5 outline-none border dark:border-white/10 border-gray-200 focus:border-accent/50 transition-colors placeholder:text-gray-500"
                disabled={loading}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center disabled:opacity-40 hover:bg-accent/90 transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[9px] dark:text-gray-600 text-gray-400 mt-1.5 text-center">
              Powered by MarketAtlas Intelligence Engine
            </p>
          </div>
        </div>
      )}
    </>
  )
}
