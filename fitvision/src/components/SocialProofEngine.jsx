import { useState, useEffect } from 'react';

const NAMES = ['Priya S.','Rahul M.','Ananya K.','Vikram P.','Sneha R.','Arjun T.','Kavya N.','Rohan D.','Meera J.','Aakash V.','Nisha B.','Kartik S.'];
const CITIES = ['Mumbai','Delhi','Bengaluru','Hyderabad','Chennai','Pune','Jaipur','Kolkata','Ahmedabad','Surat'];
const ACTIONS = [
  'just bought this item! 🛍️',
  'added this to their cart 🛒',
  'is viewing this right now 👀',
  'placed an order for this ✅',
  'added to wishlist ❤️',
];

function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[randomInt(0, arr.length - 1)]; }

export default function SocialProofEngine({ viewers }) {
  const [toast, setToast] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = () => {
      const notification = {
        name: pick(NAMES),
        city: pick(CITIES),
        action: pick(ACTIONS),
      };
      setToast(notification);
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };

    // First notification after 3s, then every 8–15s
    const first = setTimeout(show, 3000);
    const interval = setInterval(show, randomInt(8000, 15000));
    return () => { clearTimeout(first); clearInterval(interval); };
  }, []);

  if (!toast) return null;

  return (
    <div
      className={`social-toast ${visible ? 'social-toast-show' : 'social-toast-hide'}`}
    >
      <div className="social-toast-avatar">
        {toast.name.charAt(0)}
      </div>
      <div className="social-toast-body">
        <div className="social-toast-name">{toast.name} from {toast.city}</div>
        <div className="social-toast-action">{toast.action}</div>
      </div>
    </div>
  );
}

// Sub-component: live viewer badge for product cards
export function LiveViewers({ count }) {
  const [n, setN] = useState(count || randomInt(18, 60));
  useEffect(() => {
    const id = setInterval(() => {
      setN(prev => Math.max(10, prev + randomInt(-3, 4)));
    }, randomInt(4000, 8000));
    return () => clearInterval(id);
  }, []);
  return (
    <span className="live-viewers">
      <span className="live-dot" /> {n} viewing now
    </span>
  );
}

// Sub-component: stock urgency badge
export function StockBadge({ count }) {
  if (!count || count > 10) return null;
  return (
    <span className="stock-badge">
      ⚡ Only {count} left!
    </span>
  );
}

// Sub-component: delivery countdown
export function DeliveryCountdown() {
  const [mins, setMins] = useState(randomInt(25, 90));
  const [secs, setSecs] = useState(randomInt(0, 59));

  useEffect(() => {
    const id = setInterval(() => {
      setSecs(prev => {
        if (prev === 0) {
          setMins(m => Math.max(0, m - 1));
          return 59;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = n => String(n).padStart(2, '0');
  return (
    <div className="delivery-countdown">
      🚚 Order in <strong>{pad(mins)}:{pad(secs)}</strong> for delivery <strong>by Tomorrow</strong>
    </div>
  );
}
