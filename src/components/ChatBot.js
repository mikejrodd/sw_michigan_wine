import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Typography, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from 'react-markdown';
import Fuse from 'fuse.js';
import wineryData from '../data/wineryData';

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Build a searchable array that also includes per-winery keywords derived from wines
const searchable = wineryData.map(w => ({
  ...w,
  slug: w.slug || slugify(w.name),
  // keywords: wine names + simple tokens to catch things like "shou"
  keywords: [
    ...(Array.isArray(w.wines) ? w.wines.map(x => (x?.name || '')).filter(Boolean) : []),
    ...(w.description ? [w.description] : []),
    w.ava || '',
    w.website || ''
  ].join(' ').toLowerCase()
}));

const fuse = new Fuse(searchable, {
  // Stronger fuzzy matching for short terms like "shou"
  includeScore: true,
  ignoreLocation: true,
  threshold: 0.4,
  distance: 200,
  minMatchCharLength: 2,
  keys: [
    { name: 'name', weight: 0.6 },
    { name: 'wines.name', weight: 0.6 },
    { name: 'keywords', weight: 0.4 },
    { name: 'address', weight: 0.2 },
    { name: 'description', weight: 0.2 },
    { name: 'website', weight: 0.2 },
    { name: 'slug', weight: 0.5 },
  ],
});

// Known aliases/edge cases → mapped to a slug
const ALIASES = [
  { term: 'shou', slug: 'wyncroft', note: '“Shou” is Wyncroft’s Bordeaux-style red blend.' },
];

const ChatBot = () => {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const chatWindowRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const chatEndRef = useRef(null);
  const isMobile = window.innerWidth <= 600;
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  // Update window height (for mobile keyboard responsiveness)
  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Format a winery as a Markdown “data card”
  const formatWineryMarkdown = (w) => {
    const lines = [];
    lines.push(`**${w.name}**`);
    if (w.website) lines.push(`[Website](${w.website})`);
    if (w.website_meta?.description) lines.push(`_${w.website_meta.description}_`);
    const contacts = [
      w.phone && `**Phone:** ${w.phone}`,
      w.email && `**Email:** ${w.email}`,
      w.address && `**Address:** ${w.address}`,
      w.appointment_only ? `**Visits:** Appointment only` : ''
    ].filter(Boolean);
    if (contacts.length) lines.push(contacts.join(' • '));
    if (w.hours && typeof w.hours === 'object') {
      const hoursStr = Object.entries(w.hours).map(([d, h]) => `${d}: ${h}`).join(' • ');
      if (hoursStr) lines.push(`**Hours:** ${hoursStr}`);
    }
    if (Array.isArray(w.wines) && w.wines.length) {
      lines.push(`**Wines**`);
      lines.push(
        w.wines.slice(0, 5).map(x => {
          const label = [x.name, x.vintage && `(${x.vintage})`, (x.price !== undefined && x.price !== null) && `$${x.price}`]
            .filter(Boolean).join(' ');
          return `- ${x.productUrl ? `[${label}](${x.productUrl})` : label}`;
        }).join('\n')
      );
    }
    return lines.filter(Boolean).join('\n\n');
  };

  // Smarter multi-pass search that understands aliases and wine names
  const searchCandidates = (userMessage) => {
    const q = (userMessage || '').toLowerCase();

    // 1) Alias hits
    const aliasHits = ALIASES
      .filter(a => q.includes(a.term))
      .map(a => searchable.find(w => w.slug === a.slug))
      .filter(Boolean);

    // 2) Fuse on the full message
    const fusePrimary = fuse.search(q, { limit: 5 }).map(r => r.item);

    // 3) If still weak, search by individual tokens over wine names/keywords
    const tokens = Array.from(new Set(q.split(/[^a-z0-9]+/g).filter(t => t.length >= 3)));
    const tokenResults = tokens.flatMap(t =>
      fuse.search(t, { limit: 3 }).map(r => r.item)
    );

    // Merge + de-dupe by slug
    const all = [...aliasHits, ...fusePrimary, ...tokenResults];
    const seen = new Set();
    const unique = [];
    for (const w of all) {
      const key = w.slug || slugify(w.name);
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(w);
      }
    }
    return unique.slice(0, 3);
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    setHasSentMessage(true);
    const userMessage = input.trim();
    const newChat = [...chat, { role: 'user', content: userMessage }];
    setChat(newChat);
    setInput('');

    let response = '';

    // ---- Stronger context lookup (aliases + wine names) ----
    const candidates = searchCandidates(userMessage);
    const contextBlocks = candidates.map(w => {
      const winesList = Array.isArray(w.wines) && w.wines.length
        ? `Wines:\n- ` + w.wines.slice(0, 5).map(x => {
            const bits = [x.name, x.vintage && `(${x.vintage})`, (x.price !== undefined && x.price !== null) && `$${x.price}`]
              .filter(Boolean).join(' ');
            return bits || x.name;
          }).join('\n- ')
        : '';
      const social = w.social
        ? Object.entries(w.social).map(([k, v]) => `${k}: ${v}`).join(' | ')
        : '';
      return [
        `Name: ${w.name}`,
        `Slug: ${w.slug}`,
        `Address: ${w.address || ''}`,
        `AVA: ${w.ava || ''}`,
        `Website: ${w.website || ''}`,
        `Phone: ${w.phone || ''}`,
        `Email: ${w.email || ''}`,
        social && `Social: ${social}`,
        w.description && `Description: ${w.description}`,
        winesList
      ].filter(Boolean).join('\n');
    }).join('\n---\n');

    // ---- Static system prompts (nudge to suggest matches instead of "unfamiliar") ----
    const baseSystem = {
      role: 'system',
      content: `
You are a concise, friendly wine expert specializing in Lake Michigan Shore and Fennville wines.

Rules:
- Recommend only from the approved winery list.
- If you don't know, check likely matches from the provided context and offer the closest 1–3 options before saying you're unsure.
- Provide max 3 recommendations with 1-sentence reasons. If detailed facts (prices, hours, wines) are needed, keep the text brief—those will appear in a data card.
- Ask 1 clarifying question if the query is vague.
- Never invent wineries or websites.
- For general wine questions (styles, grapes, winemaking), answer normally.

Approved wineries:
${wineryData.map(w => w.name).join(', ')}
`
    };

    const examples = [
      { role: 'user', content: 'who makes shou' },
      { role: 'assistant', content: 'Wyncroft. “Shou” is their Bordeaux-style red blend. Do you want the link or tasting notes?' }
    ];

    const recentHistory = newChat.slice(-10);
    const contextMsg = contextBlocks
      ? { role: 'user', content: `Context documents:\n${contextBlocks}` }
      : null;

    const messages = [
      baseSystem,
      ...examples,
      ...recentHistory,
      contextMsg
    ].filter(Boolean);

    try {
      const openaiResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gpt-5-mini',
          temperature: 0.15,
          max_tokens: 500,
          messages
        })
      });

      const data = await openaiResponse.json();
      response = data?.choices?.[0]?.message?.content?.trim() || '(No response)';
    } catch (error) {
      console.error('Error creating completion:', error);
      response = "Sorry, this app is created and maintained for free, and fincuvaAI has a cost. Unfortunately, the app is too popular at the moment, and responses have been limited. Please try again later, or if you really are enjoying the app, consider donating [here](https://buymeacoffee.com/mikerodd).";
    }

    // Append bot response correctly as 'assistant'
    setChat(prevChat => [...prevChat, { role: 'assistant', content: response }]);

    // --- Enriched data card for the best candidate (e.g., Wyncroft for "shou") ---
    try {
      const top = candidates?.[0];
      if (top) {
        const slug = top.slug || slugify(top.name);
        const r = await fetch(`/api/winery/${encodeURIComponent(slug)}`);
        if (r.ok) {
          const data = await r.json();
          const card = formatWineryMarkdown(data);
          if (card && card.trim()) {
            setChat(prev => [...prev, { role: 'assistant', content: card }]);
          }
        }
      }
    } catch {
      // ignore; chat still works
    }
  };

  // Scroll chat messages container to bottom when new message arrives
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat, isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!chatWindowRef.current) return;
      const chatBox = chatWindowRef.current.getBoundingClientRect();
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      if (
        event.clientX >= chatBox.left &&
        event.clientX <= chatBox.right &&
        event.clientY >= chatBox.top &&
        event.clientY <= chatBox.bottom
      ) {
        return;
      }
      if (event.clientX > window.innerWidth - scrollbarWidth) return;
      setIsOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [chatWindowRef]);

  return (
    <Box sx={{ position: 'fixed', bottom: isMobile ? 20 : 35, right: isMobile ? 20 : 55, zIndex: 4002 }}>
      {/* Floating Chat Icon */}
      <IconButton
        color="primary"
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          backgroundColor: '#7b1fa2',
          '&:hover': { backgroundColor: '#682a75' },
          borderRadius: '50%',
          padding: isMobile ? 2 : 4,
          width: isMobile ? 50 : 70,
          height: isMobile ? 50 : 70
        }}
        aria-label="Toggle chat"
      >
        <ChatIcon sx={{ color: '#ffffff', fontSize: isMobile ? 28 : 40 }} />
      </IconButton>

      {/* Background overlay for desktop */}
      {isOpen && !isMobile && (
        <Box
          onClick={() => setIsOpen(false)}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 3001
          }}
        />
      )}

      {/* Chat Window */}
      {isOpen && (
        <Box
          ref={chatWindowRef}
          sx={{
            position: 'fixed',
            top: isMobile ? 0 : '50%',
            left: isMobile ? 0 : '50%',
            width: isMobile ? '100vw' : '30vw',
            height: isMobile ? `${windowHeight}px` : '60vh',
            transform: isMobile ? 'none' : 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            boxShadow: 5,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 3002,
            borderRadius: isMobile ? 0 : '16px',
            overflowY: 'auto'
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 0,
              boxShadow: 0.5,
              borderRadius: isMobile ? '0px' : '8px 8px 0 0',
              minHeight: '80px',
              position: 'sticky',
              top: 0,
              zIndex: 2,
              backgroundColor: '#fff'
            }}
          >
            <img
              src="/assets/fincuvaAI.png"
              alt="fincuva AI"
              style={{ width: isMobile ? '150px' : '220px', padding: isMobile ? '10px' : '0px' }}
            />
            {isMobile && (
              <IconButton
                onClick={() => setIsOpen(false)}
                sx={{
                  color: 'black',
                  position: 'absolute',
                  right: 10,
                  top: 10,
                  backgroundColor: 'rgba(255,255,255,0.8)'
                }}
              >
                <CloseIcon sx={{ fontSize: 28 }} />
              </IconButton>
            )}
          </Box>

          {/* Chat Messages */}
          <Box
            ref={chatMessagesRef}
            sx={{
              flexGrow: 1,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}
          >
            {chat.map((msg, index) => (
              <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Box
                  sx={{
                    backgroundColor: msg.role === 'user' ? '#f7f2f7' : '#f3e5f5',
                    borderRadius: '30px',
                    paddingLeft: 2,
                    paddingRight: 2,
                    marginTop: '5px',
                    marginBottom: '5px',
                    maxWidth: '80%',
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <Typography variant="bodychat">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </Typography>
                </Box>
              </Box>
            ))}
            <div ref={chatEndRef} />
          </Box>

          {/* Input Field */}
          <TextField
            variant="outlined"
            fullWidth
            placeholder={hasSentMessage ? '' : 'Ask about Michigan wines...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
            autoComplete="off"
            inputProps={{
              style: { fontSize: '16px' },
              autoCorrect: 'off',
              autoCapitalize: 'none',
              spellCheck: 'false'
            }}
            sx={{
              fontFamily: 'Roboto',
              p: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
                '& fieldset': { borderColor: '#ddc5e3' },
                '&:hover fieldset': { borderColor: '#ddc5e3' },
                '&.Mui-focused fieldset': { borderColor: '#ddc5e3' }
              }
            }}
            aria-label="User input"
          />
        </Box>
      )}
    </Box>
  );
};

export default ChatBot;
