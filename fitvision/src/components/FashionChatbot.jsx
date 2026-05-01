import { useState, useRef, useEffect } from 'react';

// ── Smart fashion AI engine (rule-based but feels real) ──
const RESPONSES = {
  size: [
    "Based on standard Indian sizing, if you're around 5'8\" (172 cm) and 70 kg, **Size M** is usually your best bet. Use our **AI Size Predictor** for a personalised recommendation with confidence scores!",
    "Indian brand sizing can vary. I recommend measuring your chest and waist and using our Size Predictor tool — it gives you a confidence % for each size. Want me to guide you there?",
  ],
  trend: [
    "🔥 **Summer 2025 Trends in India:**\n- Pastel co-ord sets (huge right now)\n- Oversized linen shirts\n- Embroidered ethnic kurtas for casual wear\n- Sneakers with traditional outfits\n\nWant me to suggest some products from our store?",
    "Right now, **earth tones** (camel, olive, rust) are trending for men. For women, **flowy printed dresses** and **block-print kurtas** are flying off the shelves!",
  ],
  outfit: [
    "Great question! For a **college look**, try a white oversized t-shirt + slim-fit jeans + white sneakers. Clean, simple, stylish.\n\nFor an **office look**, a solid kurta with chinos works beautifully across India.",
    "For a **wedding guest** outfit, I'd recommend:\n- Men: A rich-coloured kurta with fitted trousers\n- Women: An embroidered salwar suit or silk saree\n\nWe have several options — click on **Ethnic Wear** in the filter!",
  ],
  delivery: [
    "🚚 Standard delivery takes **2–5 business days** across India.\n\nFor metro cities (Mumbai, Delhi, Bengaluru, Hyderabad), we often deliver **by tomorrow** if you order before 2 PM!\n\nYou can see the live countdown on every product page.",
    "Delivery is **free** on all orders above ₹499! For orders below that, there's a small ₹50 shipping charge.",
  ],
  return: [
    "FitVision offers a **10-day easy return policy** on all clothing items. If the size doesn't fit, just raise a return request and we'll pick it up for free!\n\nOur AI Size Predictor helps reduce wrong-size orders significantly.",
    "Returns are hassle-free! Just go to **My Orders**, select the item, and click **Return**. Refunds are processed within 5–7 business days back to your original payment method.",
  ],
  offer: [
    "🎉 **Current Offers:**\n- 5% cashback on Flipkart Axis Bank Card\n- Extra 10% off with code **FIT10**\n- Free delivery on orders above ₹499\n- Flash Sale live now — up to 70% off selected items!",
  ],
  saree: [
    "Sarees are beautiful! For **beginners**, I'd recommend:\n- **Georgette or chiffon** sarees — lightweight and easy to drape\n- **Cotton sarees** for daily wear\n- **Silk sarees** for weddings and festivals\n\nCheck out the **Ethnic Wear** filter — we have some stunning options!",
  ],
  summer: [
    "For Indian summers, go for:\n- **Light cotton or linen** fabrics — they breathe well\n- **Pastel or white** colours — reflect heat\n- **Loose-fit kurtas or shirts** for comfort\n- Avoid synthetic fabrics — they trap heat!\n\nWe have a great summer collection — use the price filter to find affordable options!",
  ],
  winter: [
    "For Indian winters (which vary by region!):\n- **North India:** Layer up with jackets, hoodies, and warm kurtas\n- **South India:** A light jacket or shawl is usually enough\n\nOur **Men Solid Puffer Jacket** is a bestseller right now — check it out!",
  ],
  hello: [
    "👋 Hi there! I'm **FitVision's AI Fashion Assistant**! I can help you with:\n- 👗 **Outfit recommendations**\n- 📏 **Size guidance**\n- 🛍️ **Current offers & deals**\n- 🚚 **Delivery & returns**\n- 🔥 **What's trending**\n\nWhat can I help you with today?",
  ],
  default: [
    "That's a great question! As a fashion AI assistant, I'm best at helping with outfit ideas, size recommendations, and current trends. Could you tell me a bit more about what you're looking for?",
    "I'm still learning! For specific queries, try asking about **sizes**, **trending styles**, **outfit ideas**, **delivery**, or **current offers**. I'm here to help! 🛍️",
  ],
};

function getResponse(msg) {
  const m = msg.toLowerCase();
  if (m.match(/hello|hi|hey|namaste|good/)) return RESPONSES.hello;
  if (m.match(/size|fit|measure|weight|height|chest|waist|kg|cm/)) return RESPONSES.size;
  if (m.match(/trend|fashion|style|popular|hot|2025/)) return RESPONSES.trend;
  if (m.match(/outfit|wear|combination|match|pair|suggest/)) return RESPONSES.outfit;
  if (m.match(/deliver|shipping|ship|days|tomorrow|fast/)) return RESPONSES.delivery;
  if (m.match(/return|refund|exchange|policy/)) return RESPONSES.return;
  if (m.match(/offer|discount|sale|coupon|cashback|deal/)) return RESPONSES.offer;
  if (m.match(/saree|sari|ethnic|kurta|salwar/)) return RESPONSES.saree;
  if (m.match(/summer|hot|heat|cotton|linen/)) return RESPONSES.summer;
  if (m.match(/winter|cold|jacket|warm|wool/)) return RESPONSES.winter;
  return RESPONSES.default;
}

function renderText(text) {
  return text
    .split('\n')
    .map((line, i) => {
      // Bold: **text**
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <span key={i}>
          {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      );
    });
}

const QUICK_PROMPTS = [
  "What's trending? 🔥",
  "Help me find my size 📏",
  "Suggest an outfit 👗",
  "Current offers? 🎉",
];

export default function FashionChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "👋 Hi! I'm **FitVision AI Assistant**. Ask me about sizes, trends, outfits, or anything fashion! ✨",
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setTyping(true);

    const pool = getResponse(msg);
    const reply = pool[Math.floor(Math.random() * pool.length)];

    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      {/* Floating bubble */}
      <button className="chatbot-bubble" onClick={() => setOpen(o => !o)} title="FitVision AI Assistant">
        {open ? '✕' : '💬'}
        {!open && <span className="chatbot-bubble-label">AI Assistant</span>}
      </button>

      {/* Chat window */}
      {open && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="chatbot-avatar">🤖</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '15px' }}>FitVision AI Assistant</div>
                <div style={{ fontSize: '11px', color: '#a8d5ff' }}>● Online — powered by Fashion AI</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', color: 'white', fontSize: '20px' }}>✕</button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chatbot-msg ${m.role}`}>
                {m.role === 'bot' && <div className="chatbot-msg-avatar">🤖</div>}
                <div className="chatbot-bubble-msg">
                  {renderText(m.text)}
                </div>
              </div>
            ))}
            {typing && (
              <div className="chatbot-msg bot">
                <div className="chatbot-msg-avatar">🤖</div>
                <div className="chatbot-bubble-msg chatbot-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Prompts */}
          <div className="chatbot-quick-prompts">
            {QUICK_PROMPTS.map(p => (
              <button key={p} className="chatbot-quick-btn" onClick={() => sendMessage(p)}>{p}</button>
            ))}
          </div>

          {/* Input */}
          <div className="chatbot-input-row">
            <input
              className="chatbot-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about sizes, trends, outfits…"
            />
            <button className="chatbot-send" onClick={() => sendMessage()}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}
