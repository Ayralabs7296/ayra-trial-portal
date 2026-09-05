import { useState, useEffect } from "react";

// ─── MOCK DATABASE ────────────────────────────────────────────────────────────
const DB = {
  users: [
    { id: "admin1", email: "jesus@ayra-labs.com", password: "ayra2025", role: "admin", name: "Jesus Chavez" },
    { id: "c1", email: "maya@email.com", password: "pass123", role: "creator", name: "Maya Torres", instagram: "@mayatorres", tiktok: "@mayat", avatar: "MT", trialStart: "2025-08-01", status: "Trial", affiliateHandoff: false, affiliateCode: "MAYA10", shopifyConnected: false, bio: "content creator. gym rat. dark aesthetics 🖤" },
    { id: "c2", email: "jade@email.com", password: "pass123", role: "creator", name: "Jade Williams", instagram: "@jadewilliams", tiktok: "@jadew", avatar: "JW", trialStart: "2025-07-20", status: "Trial Complete", affiliateHandoff: true, affiliateCode: "JADE15", shopifyConnected: true, bio: "fitness & lifestyle. AYRA athlete 🖤" },
    { id: "c3", email: "riley@email.com", password: "pass123", role: "creator", name: "Riley Chen", instagram: "@rileych", tiktok: "@rileych", avatar: "RC", trialStart: "2025-08-10", status: "Trial", affiliateHandoff: false, affiliateCode: "RILEY10", shopifyConnected: false, bio: "" },
    { id: "c4", email: "nova@email.com", password: "pass123", role: "creator", name: "Nova Reyes", instagram: "@novareyes", tiktok: "@nova_r", avatar: "NR", trialStart: "2025-08-15", status: "Paused", affiliateHandoff: false, affiliateCode: "", shopifyConnected: false, bio: "" },
  ],
  submissions: [
    { id: "s1", creatorId: "c1", platform: "Instagram", url: "https://www.instagram.com/p/abc123", type: "Reel", datePosted: "2025-08-05", status: "Approved", views: 12400, likes: 847, comments: 63, shares: 29, notes: "", rejectionReason: "", submittedAt: "2025-08-06" },
    { id: "s2", creatorId: "c1", platform: "TikTok", url: "https://www.tiktok.com/@mayat/video/1", type: "TikTok", datePosted: "2025-08-08", status: "Approved", views: 31200, likes: 2100, comments: 148, shares: 410, notes: "", rejectionReason: "", submittedAt: "2025-08-09" },
    { id: "s3", creatorId: "c1", platform: "Instagram", url: "https://www.instagram.com/p/def456", type: "Carousel", datePosted: "2025-08-12", status: "Approved", views: 8900, likes: 601, comments: 41, shares: 15, notes: "", rejectionReason: "", submittedAt: "2025-08-13" },
    { id: "s4", creatorId: "c1", platform: "TikTok", url: "https://www.tiktok.com/@mayat/video/2", type: "TikTok", datePosted: "2025-08-15", status: "Approved", views: 44100, likes: 3200, comments: 221, shares: 580, notes: "", rejectionReason: "", submittedAt: "2025-08-16" },
    { id: "s5", creatorId: "c1", platform: "Instagram", url: "https://www.instagram.com/p/ghi789", type: "Reel", datePosted: "2025-08-20", status: "Approved", views: 18700, likes: 1340, comments: 89, shares: 74, notes: "", rejectionReason: "", submittedAt: "2025-08-21" },
    { id: "s6", creatorId: "c1", platform: "TikTok", url: "https://www.tiktok.com/@mayat/video/3", type: "TikTok", datePosted: "2025-08-24", status: "Approved", views: 22000, likes: 1800, comments: 130, shares: 310, notes: "", rejectionReason: "", submittedAt: "2025-08-25" },
    { id: "s7", creatorId: "c1", platform: "Instagram", url: "https://www.instagram.com/p/jkl012", type: "Photo", datePosted: "2025-08-27", status: "Approved", views: 6700, likes: 490, comments: 28, shares: 9, notes: "", rejectionReason: "", submittedAt: "2025-08-28" },
    { id: "s8", creatorId: "c1", platform: "Instagram", url: "https://www.instagram.com/p/mno345", type: "Reel", datePosted: "2025-08-30", status: "Pending", views: 0, likes: 0, comments: 0, shares: 0, notes: "", rejectionReason: "", submittedAt: "2025-08-31" },
    { id: "s9", creatorId: "c1", platform: "TikTok", url: "https://www.tiktok.com/@mayat/video/4", type: "TikTok", datePosted: "2025-09-01", status: "Rejected", views: 0, likes: 0, comments: 0, shares: 0, notes: "", rejectionReason: "AYRA product was not clearly visible in the content.", submittedAt: "2025-09-02" },
    { id: "s10", creatorId: "c2", platform: "Instagram", url: "https://www.instagram.com/p/jade1", type: "Reel", datePosted: "2025-07-25", status: "Approved", views: 28400, likes: 1920, comments: 104, shares: 88, notes: "", rejectionReason: "", submittedAt: "2025-07-26" },
    { id: "s11", creatorId: "c2", platform: "TikTok", url: "https://www.tiktok.com/@jadew/video/1", type: "TikTok", datePosted: "2025-07-28", status: "Approved", views: 51000, likes: 3800, comments: 290, shares: 620, notes: "", rejectionReason: "", submittedAt: "2025-07-29" },
    { id: "s12", creatorId: "c2", platform: "Instagram", url: "https://www.instagram.com/p/jade2", type: "Reel", datePosted: "2025-08-02", status: "Approved", views: 19200, likes: 1350, comments: 78, shares: 55, notes: "", rejectionReason: "", submittedAt: "2025-08-03" },
    { id: "s13", creatorId: "c2", platform: "TikTok", url: "https://www.tiktok.com/@jadew/video/2", type: "TikTok", datePosted: "2025-08-06", status: "Approved", views: 37600, likes: 2700, comments: 188, shares: 440, notes: "", rejectionReason: "", submittedAt: "2025-08-07" },
    { id: "s14", creatorId: "c2", platform: "Instagram", url: "https://www.instagram.com/p/jade3", type: "Carousel", datePosted: "2025-08-10", status: "Approved", views: 9800, likes: 710, comments: 45, shares: 22, notes: "", rejectionReason: "", submittedAt: "2025-08-11" },
    { id: "s15", creatorId: "c2", platform: "TikTok", url: "https://www.tiktok.com/@jadew/video/3", type: "TikTok", datePosted: "2025-08-13", status: "Approved", views: 44000, likes: 3100, comments: 212, shares: 530, notes: "", rejectionReason: "", submittedAt: "2025-08-14" },
    { id: "s16", creatorId: "c2", platform: "Instagram", url: "https://www.instagram.com/p/jade4", type: "Reel", datePosted: "2025-08-16", status: "Approved", views: 21300, likes: 1550, comments: 95, shares: 68, notes: "", rejectionReason: "", submittedAt: "2025-08-17" },
    { id: "s17", creatorId: "c2", platform: "TikTok", url: "https://www.tiktok.com/@jadew/video/4", type: "TikTok", datePosted: "2025-08-19", status: "Approved", views: 33800, likes: 2400, comments: 165, shares: 380, notes: "", rejectionReason: "", submittedAt: "2025-08-20" },
    { id: "s18", creatorId: "c2", platform: "Instagram", url: "https://www.instagram.com/p/jade5", type: "Photo", datePosted: "2025-08-22", status: "Approved", views: 7200, likes: 520, comments: 31, shares: 11, notes: "", rejectionReason: "", submittedAt: "2025-08-23" },
    { id: "s19", creatorId: "c2", platform: "TikTok", url: "https://www.tiktok.com/@jadew/video/5", type: "TikTok", datePosted: "2025-08-25", status: "Approved", views: 48200, likes: 3500, comments: 248, shares: 590, notes: "", rejectionReason: "", submittedAt: "2025-08-26" },
    { id: "s20", creatorId: "c3", platform: "Instagram", url: "https://www.instagram.com/p/riley1", type: "Reel", datePosted: "2025-08-12", status: "Approved", views: 9100, likes: 640, comments: 38, shares: 19, notes: "", rejectionReason: "", submittedAt: "2025-08-13" },
    { id: "s21", creatorId: "c3", platform: "TikTok", url: "https://www.tiktok.com/@rileych/video/1", type: "TikTok", datePosted: "2025-08-15", status: "Approved", views: 17400, likes: 1200, comments: 88, shares: 230, notes: "", rejectionReason: "", submittedAt: "2025-08-16" },
    { id: "s22", creatorId: "c3", platform: "Instagram", url: "https://www.instagram.com/p/riley2", type: "Carousel", datePosted: "2025-08-18", status: "Pending", views: 0, likes: 0, comments: 0, shares: 0, notes: "", rejectionReason: "", submittedAt: "2025-08-19" },
    { id: "s23", creatorId: "c4", platform: "Instagram", url: "https://www.instagram.com/p/nova1", type: "Reel", datePosted: "2025-08-16", status: "Approved", views: 5200, likes: 380, comments: 24, shares: 12, notes: "", rejectionReason: "", submittedAt: "2025-08-17" },
  ],
  // Shopify affiliate code sales data (populated via Shopify Admin API in production)
  // Structure mirrors what Shopify returns for discount code usage
  shopifyOrders: [
    { id: "o1", creatorId: "c2", discountCode: "JADE15", orderId: "SH-10021", orderDate: "2025-08-28", orderTotal: 62.00, discountAmount: 9.30, customerEmail: "customer1@x.com", product: "Vessel Pump Cover", status: "paid" },
    { id: "o2", creatorId: "c2", discountCode: "JADE15", orderId: "SH-10034", orderDate: "2025-08-30", orderTotal: 37.00, discountAmount: 5.55, customerEmail: "customer2@x.com", product: "Veil Halter Top", status: "paid" },
    { id: "o3", creatorId: "c2", discountCode: "JADE15", orderId: "SH-10047", orderDate: "2025-09-01", orderTotal: 80.00, discountAmount: 12.00, customerEmail: "customer3@x.com", product: "Veil Halter Top 3-Pack", status: "paid" },
    { id: "o4", creatorId: "c2", discountCode: "JADE15", orderId: "SH-10058", orderDate: "2025-09-02", orderTotal: 21.00, discountAmount: 3.15, customerEmail: "customer4@x.com", product: "Pulse Gym Shorts", status: "paid" },
    { id: "o5", creatorId: "c2", discountCode: "JADE15", orderId: "SH-10061", orderDate: "2025-09-03", orderTotal: 68.00, discountAmount: 10.20, customerEmail: "customer5@x.com", product: "Vessel Pump Cover", status: "paid" },
    { id: "o6", creatorId: "c2", discountCode: "JADE15", orderId: "SH-10072", orderDate: "2025-09-04", orderTotal: 62.00, discountAmount: 9.30, customerEmail: "customer6@x.com", product: "Core Baggy Sweats", status: "paid" },
    { id: "o7", creatorId: "c1", discountCode: "MAYA10", orderId: "SH-10081", orderDate: "2025-09-03", orderTotal: 37.00, discountAmount: 3.70, customerEmail: "customer7@x.com", product: "Veil Halter Top", status: "paid" },
    { id: "o8", creatorId: "c1", discountCode: "MAYA10", orderId: "SH-10089", orderDate: "2025-09-04", orderTotal: 68.00, discountAmount: 6.80, customerEmail: "customer8@x.com", product: "Vessel Pump Cover", status: "paid" },
    { id: "o9", creatorId: "c3", discountCode: "RILEY10", orderId: "SH-10094", orderDate: "2025-09-04", orderTotal: 21.00, discountAmount: 2.10, customerEmail: "customer9@x.com", product: "Pulse Gym Shorts", status: "paid" },
  ],
  notes: [],
  shopifyConfig: { storeName: "b02z6h-cv", connected: false, apiKey: "" },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const getApproved = (id, subs) => subs.filter(s => s.creatorId === id && s.status === "Approved").length;
const getPending  = (id, subs) => subs.filter(s => s.creatorId === id && s.status === "Pending").length;
const getRejected = (id, subs) => subs.filter(s => s.creatorId === id && s.status === "Rejected").length;
const getTotalViews = (id, subs) => subs.filter(s => s.creatorId === id).reduce((a, s) => a + s.views, 0);
const getOrders = (id, orders) => orders.filter(o => o.creatorId === id);
const getRevenue = (id, orders) => orders.filter(o => o.creatorId === id).reduce((a, o) => a + o.orderTotal, 0);
const fmtNum = (n) => n >= 1000000 ? (n/1000000).toFixed(1)+"M" : n >= 1000 ? (n/1000).toFixed(1)+"K" : String(n);
const fmtMoney = (n) => "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// ─── STYLES ──────────────────────────────────────────────────────────────────
const S = {
  app: { minHeight:"100vh", background:"#080808", color:"#e8e6e1", fontFamily:"'Neue Montreal','Inter',sans-serif", fontSize:15 },
  nav: { borderBottom:"1px solid #1a1a1a", padding:"0 28px", display:"flex", alignItems:"center", justifyContent:"space-between", height:60, position:"sticky", top:0, background:"#080808", zIndex:100 },
  navLogo: { fontFamily:"'Times New Roman',serif", fontSize:20, fontWeight:400, letterSpacing:"0.12em", color:"#e8e6e1" },
  navRight: { display:"flex", alignItems:"center", gap:20 },
  navLink: { fontSize:11, letterSpacing:"0.08em", color:"#717171", cursor:"pointer", background:"none", border:"none", padding:0, textTransform:"uppercase" },
  tabBar: { display:"flex", gap:2, borderBottom:"1px solid #1a1a1a", marginBottom:32, overflowX:"auto" },
  tab: { padding:"12px 18px", fontSize:11, letterSpacing:"0.08em", color:"#717171", cursor:"pointer", background:"none", border:"none", borderBottom:"2px solid transparent", textTransform:"uppercase", whiteSpace:"nowrap", flexShrink:0 },
  tabActive: { color:"#e8e6e1", borderBottom:"2px solid #7A2E2E" },
  card: { background:"#0f0f0f", border:"1px solid #1a1a1a", borderRadius:4, padding:"20px 24px" },
  cardSm: { background:"#0f0f0f", border:"1px solid #1a1a1a", borderRadius:4, padding:"14px 18px" },
  statCard: { background:"#0f0f0f", border:"1px solid #1a1a1a", borderRadius:4, padding:"18px 22px", flex:1 },
  heading: { fontFamily:"'Times New Roman',serif", fontWeight:400, letterSpacing:"0.04em" },
  label: { fontSize:11, letterSpacing:"0.12em", color:"#717171", textTransform:"uppercase", marginBottom:6, margin:0 },
  labelMb: { fontSize:11, letterSpacing:"0.12em", color:"#717171", textTransform:"uppercase", marginBottom:8 },
  muted: { color:"#717171", fontSize:13 },
  progressBar: { background:"#1a1a1a", borderRadius:2, height:3, overflow:"hidden" },
  progressFill: (p) => ({ background:"#7A2E2E", height:"100%", width:`${p}%`, transition:"width 0.5s ease", borderRadius:2 }),
  badge: (status) => {
    const m = { Approved:{bg:"#0d1f0d",color:"#4caf50",border:"#1a3a1a"}, Pending:{bg:"#1a1500",color:"#d4a017",border:"#2a2200"}, Rejected:{bg:"#1f0d0d",color:"#ef5350",border:"#3a1a1a"}, Trial:{bg:"#111",color:"#717171",border:"#222"}, "Trial Complete":{bg:"#0d1a2e",color:"#4a90d9",border:"#1a2e4a"}, Paused:{bg:"#1a1a1a",color:"#555",border:"#222"}, Removed:{bg:"#1f0d0d",color:"#ef5350",border:"#3a1a1a"} };
    const s = m[status] || m.Trial;
    return { display:"inline-flex", alignItems:"center", padding:"3px 10px", borderRadius:2, background:s.bg, color:s.color, border:`1px solid ${s.border}`, fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, whiteSpace:"nowrap" };
  },
  btn:        { background:"#e8e6e1", color:"#080808", border:"none", borderRadius:2, padding:"10px 22px", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", fontWeight:700 },
  btnOutline: { background:"none", color:"#e8e6e1", border:"1px solid #333", borderRadius:2, padding:"9px 18px", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer" },
  btnCrimson: { background:"#7A2E2E", color:"#e8e6e1", border:"none", borderRadius:2, padding:"10px 22px", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", fontWeight:700 },
  btnDanger:  { background:"none", color:"#ef5350", border:"1px solid #3a1a1a", borderRadius:2, padding:"8px 16px", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer" },
  btnSuccess: { background:"#0d1f0d", color:"#4caf50", border:"1px solid #1a3a1a", borderRadius:2, padding:"8px 16px", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer" },
  input:    { background:"#111", border:"1px solid #222", borderRadius:2, color:"#e8e6e1", padding:"10px 14px", fontSize:14, width:"100%", outline:"none", boxSizing:"border-box" },
  select:   { background:"#111", border:"1px solid #222", borderRadius:2, color:"#e8e6e1", padding:"10px 14px", fontSize:14, width:"100%", outline:"none", boxSizing:"border-box" },
  textarea: { background:"#111", border:"1px solid #222", borderRadius:2, color:"#e8e6e1", padding:"10px 14px", fontSize:14, width:"100%", outline:"none", boxSizing:"border-box", resize:"vertical", minHeight:80 },
  formGroup: { marginBottom:20 },
  grid2: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16 },
  grid3: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:14 },
  grid4: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:12 },
  row: { display:"flex", alignItems:"center", gap:14 },
  rowBetween: { display:"flex", alignItems:"center", justifyContent:"space-between" },
  divider: { borderTop:"1px solid #1a1a1a", margin:"22px 0" },
  avatar: { width:40, height:40, borderRadius:"50%", background:"#1a1a1a", border:"1px solid #2a2a2a", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:600, color:"#e8e6e1", flexShrink:0 },
  mobileNav: { position:"fixed", bottom:0, left:0, right:0, background:"#0a0a0a", borderTop:"1px solid #1a1a1a", display:"flex", zIndex:200, padding:"6px 0 10px" },
  mobileNavBtn: { flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3, background:"none", border:"none", color:"#717171", cursor:"pointer", padding:"6px 4px", fontSize:9, letterSpacing:"0.08em", textTransform:"uppercase" },

  // Leaderboard specific
  rankGold:   { background:"linear-gradient(135deg,#2a1f00,#1a1300)", border:"1px solid #5a3e00" },
  rankSilver: { background:"linear-gradient(135deg,#1a1a1a,#111)", border:"1px solid #3a3a3a" },
  rankBronze: { background:"linear-gradient(135deg,#1f0f00,#130800)", border:"1px solid #3a2000" },
};

// ─── SHOPIFY API LAYER ────────────────────────────────────────────────────────
// In production, replace these with real Shopify Admin API calls.
// Required: store Admin API token with read_orders + read_price_rules scopes.
// Endpoint: https://{store}.myshopify.com/admin/api/2024-01/orders.json?discount_code={code}
const ShopifyAPI = {
  async fetchOrdersByCode(storeUrl, token, discountCode) {
    // PRODUCTION CODE (commented out — requires backend proxy to avoid CORS):
    // const res = await fetch(
    //   `https://${storeUrl}/admin/api/2024-01/orders.json?status=any&fields=id,total_price,discount_codes,created_at,email,line_items`,
    //   { headers: { "X-Shopify-Access-Token": token } }
    // );
    // const data = await res.json();
    // return data.orders.filter(o => o.discount_codes.some(d => d.code === discountCode));
    console.log(`[ShopifyAPI] Would fetch orders for code: ${discountCode}`);
    return null; // null = not connected, use local demo data
  },
  buildAffiliateLink(handle, code) {
    return `https://ayra--labs.com/products/${handle}?discount=${code}`;
  },
};

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = () => {
    if (!email || !pass) { setErr("Enter your email and password."); return; }
    setLoading(true);
    setTimeout(() => {
      const u = DB.users.find(u => u.email === email && u.password === pass);
      if (u) { onLogin(u); } else { setErr("Invalid credentials."); setLoading(false); }
    }, 350);
  };

  return (
    <div style={{...S.app, display:"flex", flexDirection:"column"}}>
      <div style={S.nav}>
        <span style={S.navLogo}>AYRA LABS</span>
        <span style={{...S.muted, fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase"}}>Creator Trial Portal</span>
      </div>
      <div style={{flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 24px"}}>
        <div style={{width:"100%", maxWidth:380}}>
          <p style={{...S.labelMb, marginBottom:14}}>Affiliate Trial</p>
          <h1 style={{...S.heading, fontSize:38, margin:"0 0 10px"}}>Sign in</h1>
          <p style={{...S.muted, marginBottom:36}}>Access your creator dashboard.</p>
          <div style={S.formGroup}>
            <p style={{...S.labelMb}}>Email</p>
            <input style={S.input} type="email" value={email} onChange={e=>{setEmail(e.target.value);setErr("");}} placeholder="you@email.com" onKeyDown={e=>e.key==="Enter"&&handle()} />
          </div>
          <div style={S.formGroup}>
            <p style={{...S.labelMb}}>Password</p>
            <input style={S.input} type="password" value={pass} onChange={e=>{setPass(e.target.value);setErr("");}} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&handle()} />
          </div>
          {err && <p style={{color:"#ef5350",fontSize:13,marginBottom:14}}>{err}</p>}
          <button style={{...S.btn, width:"100%", padding:14, opacity:loading?0.6:1}} onClick={handle} disabled={loading}>
            {loading?"Signing in...":"Sign in"}
          </button>
          <div style={{...S.card, marginTop:28, fontSize:12, color:"#555"}}>
            <p style={{margin:"0 0 6px", color:"#717171"}}>Demo accounts:</p>
            <p style={{margin:0}}>Admin: jesus@ayra-labs.com / ayra2025</p>
            <p style={{margin:0}}>Creator: maya@email.com / pass123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CREATOR PORTAL ──────────────────────────────────────────────────────────
function CreatorPortal({ user, onLogout, db, setDb }) {
  const [tab, setTab] = useState("home");
  const [viewingCreatorId, setViewingCreatorId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  useEffect(() => { const fn=()=>setIsMobile(window.innerWidth<700); window.addEventListener("resize",fn); return()=>window.removeEventListener("resize",fn); }, []);

  const handleViewProfile = (creatorId) => {
    setViewingCreatorId(creatorId);
    setTab("profile");
  };

  const creator = db.users.find(u => u.id === user.id);
  const subs = db.submissions.filter(s => s.creatorId === user.id);
  const orders = getOrders(user.id, db.shopifyOrders);
  const approved = subs.filter(s => s.status === "Approved").length;
  const pending  = subs.filter(s => s.status === "Pending").length;
  const totalViews = subs.reduce((a,s) => a+s.views, 0);
  const totalLikes = subs.reduce((a,s) => a+s.likes, 0);
  const pct = Math.min((approved/10)*100, 100);
  const isComplete = creator.status === "Trial Complete";

  const TABS = [
    {id:"home",   label:"Home",      icon:"⌂"},
    {id:"submit", label:"Submit",    icon:"+"},
    {id:"content",label:"Content",   icon:"▤"},
    {id:"leaderboard", label:"Ranks", icon:"↑"},
    {id:"profile",label:"Profile",   icon:"◯"},
  ];

  return (
    <div style={{...S.app, paddingBottom: isMobile?80:0}}>
      <nav style={S.nav}>
        <span style={S.navLogo}>AYRA LABS</span>
        <div style={S.navRight}>
          {!isMobile && <span style={{...S.muted, fontSize:11}}>Affiliate Trial</span>}
          <button style={S.navLink} onClick={onLogout}>Sign out</button>
        </div>
      </nav>
      <div style={{maxWidth:900, margin:"0 auto", padding: isMobile?"22px 16px":"36px 28px"}}>
        {!isMobile && (
          <div style={S.tabBar}>
            {TABS.map(t => <button key={t.id} style={{...S.tab,...(tab===t.id?S.tabActive:{})}} onClick={()=>setTab(t.id)}>{t.label}</button>)}
          </div>
        )}
        {tab==="home"    && <CreatorHome creator={creator} approved={approved} pending={pending} totalViews={totalViews} totalLikes={totalLikes} pct={pct} isComplete={isComplete} orders={orders} onSubmit={()=>setTab("submit")} onContent={()=>setTab("content")} />}
        {tab==="submit"  && <SubmitPost user={user} db={db} onAdd={sub=>setDb(prev=>({...prev,submissions:[...prev.submissions,sub]}))} onDone={()=>setTab("content")} />}
        {tab==="content" && <ContentHistory subs={subs} />}
        {tab==="leaderboard" && <CreatorLeaderboard db={db} currentUserId={user.id} onViewProfile={handleViewProfile} />}
        {tab==="profile" && (() => {
          const profileId = viewingCreatorId || user.id;
          const profileCreator = db.users.find(u => u.id === profileId);
          const profileSubs = db.submissions.filter(s => s.creatorId === profileId);
          const profileOrders = db.shopifyOrders.filter(o => o.creatorId === profileId);
          const profileApproved = profileSubs.filter(s => s.status === "Approved").length;
          const isOwnProfile = profileId === user.id;
          return (
            <div>
              {!isOwnProfile && (
                <button style={{...S.navLink, marginBottom:22, display:"flex", alignItems:"center", gap:6}} onClick={()=>{setViewingCreatorId(null);}}>
                  ← Back
                </button>
              )}
              <CreatorProfile
                creator={profileCreator}
                approved={profileApproved}
                subs={profileSubs}
                orders={profileOrders}
                allCreators={db.users.filter(u=>u.role==="creator")}
                allSubs={db.submissions}
                allOrders={db.shopifyOrders}
                isOwnProfile={isOwnProfile}
              />
            </div>
          );
        })()}
      </div>
      {isMobile && (
        <nav style={S.mobileNav}>
          {TABS.map(t => (
            <button key={t.id} style={{...S.mobileNavBtn,...(tab===t.id?{color:"#e8e6e1"}:{})}} onClick={()=>setTab(t.id)}>
              <span style={{fontSize:16}}>{t.icon}</span>{t.label}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

function CreatorHome({ creator, approved, pending, totalViews, totalLikes, pct, isComplete, orders, onSubmit, onContent }) {
  const revenue = orders.reduce((a,o)=>a+o.orderTotal,0);
  if (isComplete) return (
    <div style={{textAlign:"center", padding:"60px 0"}}>
      <p style={{...S.labelMb, color:"#4a90d9", marginBottom:16}}>Trial Complete</p>
      <h1 style={{...S.heading, fontSize:52, margin:"0 0 14px"}}>10 / 10</h1>
      <p style={{...S.muted, marginBottom:32, fontSize:16}}>You completed your AYRA Labs Affiliate Trial.</p>
      <div style={{...S.card, maxWidth:480, margin:"0 auto", textAlign:"left"}}>
        <p style={{color:"#e8e6e1", marginBottom:10}}>Your submissions have been reviewed and the AYRA Labs team has been notified.</p>
        <p style={S.muted}>We'll reach out with your official affiliate onboarding details. Welcome to the fam. 🖤</p>
        {creator.affiliateCode && (
          <div style={{marginTop:20, paddingTop:20, borderTop:"1px solid #1a1a1a"}}>
            <p style={{...S.labelMb}}>Your affiliate code</p>
            <p style={{fontSize:22, fontWeight:700, letterSpacing:"0.1em", color:"#e8e6e1", margin:0}}>{creator.affiliateCode}</p>
            <p style={{...S.muted, fontSize:12, marginTop:4}}>Share this code. Every order it generates shows in your stats.</p>
          </div>
        )}
      </div>
    </div>
  );
  return (
    <div>
      <div style={{marginBottom:36}}>
        <p style={{...S.muted, fontSize:14, marginBottom:6}}>Welcome back,</p>
        <h1 style={{...S.heading, fontSize:44, margin:0}}>{creator.name.split(" ")[0]}</h1>
      </div>
      <div style={{...S.card, marginBottom:28}}>
        <div style={{...S.rowBetween, marginBottom:18, flexWrap:"wrap", gap:12}}>
          <div>
            <p style={{...S.label, marginBottom:6}}>Trial Progress</p>
            <h2 style={{...S.heading, fontSize:50, margin:0}}>{approved} <span style={{color:"#2a2a2a"}}>/</span> <span style={{color:"#2a2a2a"}}>10</span></h2>
            <p style={{...S.muted, fontSize:11, marginTop:2}}>POSTS COMPLETED</p>
          </div>
          <span style={S.badge(creator.status)}>{creator.status}</span>
        </div>
        <div style={S.progressBar}><div style={S.progressFill(pct)} /></div>
        <p style={{...S.muted, fontSize:12, marginTop:8}}>Complete 10 approved posts to complete your AYRA Labs Affiliate Trial.</p>
      </div>
      <div style={{...S.grid4, marginBottom:28}}>
        {[
          {label:"Approved",  value:approved,         color:"#4caf50"},
          {label:"Pending",   value:pending,           color:"#d4a017"},
          {label:"Total Views",value:fmtNum(totalViews),color:"#e8e6e1"},
          {label:"Total Likes",value:fmtNum(totalLikes),color:"#e8e6e1"},
        ].map(s=>(
          <div key={s.label} style={S.statCard}>
            <p style={S.label}>{s.label}</p>
            <p style={{fontSize:26, fontWeight:700, margin:"6px 0 0", color:s.color}}>{s.value}</p>
          </div>
        ))}
      </div>
      {orders.length > 0 && (
        <div style={{...S.card, marginBottom:28, borderColor:"#1a1a2e"}}>
          <div style={S.rowBetween}>
            <div>
              <p style={{...S.label, marginBottom:6}}>Affiliate Orders</p>
              <p style={{fontSize:28, fontWeight:700, margin:0, color:"#e8e6e1"}}>{orders.length}</p>
              <p style={{...S.muted, fontSize:12, marginTop:2}}>orders via code {creator.affiliateCode}</p>
            </div>
            <p style={{fontSize:32}}>🖤</p>
          </div>
        </div>
      )}
      <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
        <button style={S.btnCrimson} onClick={onSubmit}>Submit New Post</button>
        <button style={S.btnOutline} onClick={onContent}>View All Content</button>
      </div>
      {approved >= 8 && <div style={{...S.cardSm, borderColor:"#2a1a0a", background:"#0a0600", marginTop:22}}><p style={{color:"#d4a017", fontSize:13, margin:0}}>You're {10-approved} post{10-approved!==1?"s":""} away from completing your trial.</p></div>}
    </div>
  );
}

function SubmitPost({ user, db, onAdd, onDone }) {
  const [platform, setPlatform] = useState("Instagram");
  const [url, setUrl] = useState("");
  const [type, setType] = useState("Reel");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  const validate = () => {
    if (!url.trim()) return "Post URL is required.";
    if (platform==="Instagram" && !url.includes("instagram.com")) return "Use an Instagram URL.";
    if (platform==="TikTok" && !url.includes("tiktok.com")) return "Use a TikTok URL.";
    if (!date) return "Date posted is required.";
    if (db.submissions.some(s=>s.url===url.trim())) return "This URL was already submitted.";
    return null;
  };

  const submit = () => {
    const e = validate(); if (e) { setErr(e); return; }
    onAdd({ id:"s"+Date.now(), creatorId:user.id, platform, url:url.trim(), type, datePosted:date, status:"Pending", views:0, likes:0, comments:0, shares:0, notes, rejectionReason:"", submittedAt:new Date().toISOString().split("T")[0] });
    setSuccess(true);
  };

  if (success) return (
    <div style={{textAlign:"center", padding:"60px 0"}}>
      <div style={{fontSize:36, marginBottom:18}}>✓</div>
      <h2 style={{...S.heading, fontSize:28, marginBottom:10}}>Submission received.</h2>
      <p style={S.muted}>Your post is pending review. We'll notify you once it's approved.</p>
      <div style={{display:"flex", gap:10, justifyContent:"center", marginTop:28}}>
        <button style={S.btnCrimson} onClick={()=>{setSuccess(false);setUrl("");setDate("");setNotes("");}}>Submit Another</button>
        <button style={S.btnOutline} onClick={onDone}>View Content</button>
      </div>
    </div>
  );

  return (
    <div>
      <p style={{...S.labelMb, marginBottom:12}}>Submit Content</p>
      <h2 style={{...S.heading, fontSize:32, margin:"0 0 32px"}}>New Post</h2>
      <div style={{maxWidth:520}}>
        <div style={S.formGroup}>
          <p style={{...S.labelMb}}>Platform</p>
          <div style={{display:"flex", gap:8}}>
            {["Instagram","TikTok"].map(p=>(
              <button key={p} style={{...S.btnOutline, flex:1,...(platform===p?{background:"#1a1a1a",borderColor:"#555"}:{})}} onClick={()=>{setPlatform(p);setType(p==="TikTok"?"TikTok":"Reel");}}>{p}</button>
            ))}
          </div>
        </div>
        <div style={S.formGroup}><p style={{...S.labelMb}}>Post URL</p><input style={S.input} value={url} onChange={e=>{setUrl(e.target.value);setErr("");}} placeholder={platform==="Instagram"?"https://www.instagram.com/p/...":"https://www.tiktok.com/@you/video/..."} /></div>
        <div style={S.formGroup}><p style={{...S.labelMb}}>Content Type</p><select style={S.select} value={type} onChange={e=>setType(e.target.value)}>{(platform==="Instagram"?["Reel","Carousel","Photo","Story"]:["TikTok"]).map(t=><option key={t}>{t}</option>)}</select></div>
        <div style={S.formGroup}><p style={{...S.labelMb}}>Date Posted</p><input style={S.input} type="date" value={date} onChange={e=>{setDate(e.target.value);setErr("");}} /></div>
        <div style={S.formGroup}><p style={{...S.labelMb}}>Notes (optional)</p><textarea style={S.textarea} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Any context about the post..." /></div>
        {err && <p style={{color:"#ef5350", fontSize:13, marginBottom:14}}>{err}</p>}
        <button style={S.btnCrimson} onClick={submit}>Submit Post</button>
      </div>
    </div>
  );
}

function ContentHistory({ subs }) {
  const sorted = [...subs].sort((a,b)=>new Date(b.submittedAt)-new Date(a.submittedAt));
  return (
    <div>
      <p style={{...S.labelMb, marginBottom:12}}>Content</p>
      <h2 style={{...S.heading, fontSize:32, margin:"0 0 8px"}}>Your Content</h2>
      <p style={{...S.muted, marginBottom:28}}>{subs.length} submissions total</p>
      {sorted.length===0
        ? <div style={{...S.card, textAlign:"center", padding:48}}><p style={S.muted}>No submissions yet.</p></div>
        : <div style={{display:"flex", flexDirection:"column", gap:10}}>
            {sorted.map(s=>(
              <div key={s.id} style={S.card}>
                <div style={{...S.rowBetween, flexWrap:"wrap", gap:10}}>
                  <div style={S.row}>
                    <span style={{fontSize:18}}>{s.platform==="Instagram"?"📷":"🎵"}</span>
                    <div>
                      <p style={{margin:0, fontSize:13, fontWeight:500}}>{s.type} · {s.platform}</p>
                      <p style={{...S.muted, margin:0, fontSize:11}}>Posted {s.datePosted}</p>
                    </div>
                  </div>
                  <span style={S.badge(s.status)}>{s.status}</span>
                </div>
                <a href={s.url} target="_blank" rel="noopener noreferrer" style={{color:"#444", fontSize:11, wordBreak:"break-all", display:"block", marginTop:8}}>{s.url}</a>
                {s.status==="Approved" && s.views>0 && (
                  <div style={{display:"flex", gap:20, paddingTop:10, marginTop:10, borderTop:"1px solid #1a1a1a"}}>
                    {[["Views",s.views],["Likes",s.likes],["Comments",s.comments],["Shares",s.shares]].map(([k,v])=>(
                      <div key={k}><p style={S.label}>{k}</p><p style={{margin:"4px 0 0", fontSize:14, fontWeight:600}}>{fmtNum(v)}</p></div>
                    ))}
                  </div>
                )}
                {s.status==="Rejected" && s.rejectionReason && (
                  <div style={{background:"#1f0d0d", border:"1px solid #3a1a1a", borderRadius:2, padding:"10px 14px", marginTop:10}}>
                    <p style={{color:"#ef5350", fontSize:12, margin:0}}>Rejected: {s.rejectionReason}</p>
                  </div>
                )}
                {(s.status==="Pending"||(s.status==="Approved"&&s.views===0)) && <p style={{...S.muted, fontSize:11, marginTop:8}}>Metrics unavailable — pending API integration.</p>}
              </div>
            ))}
          </div>
      }
    </div>
  );
}

// ─── CREATOR LEADERBOARD ──────────────────────────────────────────────────────
function CreatorLeaderboard({ db, currentUserId, onViewProfile }) {
  const [sortBy, setSortBy] = useState("orders");

  const rows = db.users.filter(u => u.role === "creator").map(c => {
    const orders = getOrders(c.id, db.shopifyOrders);
    const revenue = orders.reduce((a,o)=>a+o.orderTotal,0);
    const views = getTotalViews(c.id, db.submissions);
    const approved = getApproved(c.id, db.submissions);
    const likes = db.submissions.filter(s=>s.creatorId===c.id).reduce((a,s)=>a+s.likes,0);
    const eng = views > 0 ? ((likes/views)*100).toFixed(1) : "0.0";
    return { ...c, orders:orders.length, revenue, views, approved, likes, eng };
  }).sort((a,b) => {
    if (sortBy==="revenue") return b.revenue - a.revenue;
    if (sortBy==="views") return b.views - a.views;
    if (sortBy==="orders") return b.orders - a.orders;
    if (sortBy==="posts") return b.approved - a.approved;
    return 0;
  });

  const rankStyle = (i) => i===0 ? S.rankGold : i===1 ? S.rankSilver : i===2 ? S.rankBronze : {};
  const rankEmoji = (i) => i===0 ? "🥇" : i===1 ? "🥈" : i===2 ? "🥉" : `#${i+1}`;
  const rankColor = (i) => i===0 ? "#d4a017" : i===1 ? "#aaa" : i===2 ? "#b87333" : "#555";

  const SORTS = [{id:"orders",label:"Orders"},{id:"views",label:"Views"},{id:"posts",label:"Posts"}];

  return (
    <div>
      <p style={{...S.labelMb, marginBottom:12}}>Rankings</p>
      <h2 style={{...S.heading, fontSize:32, margin:"0 0 6px"}}>Leaderboard</h2>
      <p style={{...S.muted, marginBottom:28}}>Ranked by affiliate code performance on ayra--labs.com</p>

      {/* Sort tabs */}
      <div style={{display:"flex", gap:8, marginBottom:24, flexWrap:"wrap"}}>
        {SORTS.map(s=>(
          <button key={s.id} style={{...S.btnOutline, padding:"7px 16px",...(sortBy===s.id?{borderColor:"#7A2E2E",color:"#e8e6e1"}:{})}} onClick={()=>setSortBy(s.id)}>{s.label}</button>
        ))}
      </div>

      {/* Top 3 podium */}
      <div style={{...S.grid3, marginBottom:24}}>
        {rows.slice(0,3).map((c,i)=>(
          <div key={c.id} style={{...S.card, ...rankStyle(i), position:"relative", textAlign:"center", padding:"24px 20px", cursor:"pointer"}} onClick={()=>onViewProfile&&onViewProfile(c.id)}>
            {c.id===currentUserId && <span style={{position:"absolute",top:10,right:10,fontSize:10,color:"#7A2E2E",letterSpacing:"0.08em",textTransform:"uppercase"}}>You</span>}
            <div style={{fontSize:28, marginBottom:10}}>{rankEmoji(i)}</div>
            <div style={{...S.avatar, width:44, height:44, fontSize:15, margin:"0 auto 10px", borderColor: i===0?"#5a3e00": i===1?"#3a3a3a":"#3a2000"}}>{c.avatar}</div>
            <p style={{margin:"0 0 2px", fontWeight:600, fontSize:14}}>{c.name}</p>
            <p style={{...S.muted, margin:"0 0 14px", fontSize:11}}>{c.instagram}</p>
            <p style={{margin:"0 0 4px", fontSize:22, fontWeight:700, color:rankColor(i)}}>
              {sortBy==="orders"?c.orders+" orders": sortBy==="views"?fmtNum(c.views): c.approved+" posts"}
            </p>
            <p style={{...S.muted, fontSize:10, margin:0, textTransform:"uppercase", letterSpacing:"0.08em"}}>
              {sortBy==="orders"?"Total orders": sortBy==="views"?"Content views":"Approved posts"}
            </p>
            <div style={{...S.divider, margin:"14px 0"}} />
            <div style={{display:"flex", justifyContent:"space-around", fontSize:11}}>
              <div><p style={S.label}>Orders</p><p style={{margin:"3px 0 0", fontWeight:600}}>{c.orders}</p></div>
              <div><p style={S.label}>Posts</p><p style={{margin:"3px 0 0", fontWeight:600}}>{c.approved}</p></div>
              <div><p style={S.label}>Views</p><p style={{margin:"3px 0 0", fontWeight:600}}>{fmtNum(c.views)}</p></div>
            </div>
            <span style={{...S.badge(c.status), marginTop:12}}>{c.status}</span>
          </div>
        ))}
      </div>

      {/* Full table */}
      <div style={S.card}>
        <p style={{...S.labelMb, marginBottom:16}}>All Creators</p>
        <div style={{display:"flex", flexDirection:"column", gap:0}}>
          {rows.map((c,i)=>(
            <div key={c.id} style={{display:"flex", alignItems:"center", gap:14, padding:"14px 0", borderBottom: i<rows.length-1?"1px solid #151515":"none", flexWrap:"wrap"}}>
              <span style={{fontWeight:700, fontSize:14, minWidth:28, color:rankColor(i)}}>{rankEmoji(i)}</span>
              <div style={{...S.avatar, width:34, height:34, fontSize:12, cursor:"pointer"}} onClick={()=>onViewProfile&&onViewProfile(c.id)}>{c.avatar}</div>
              <div style={{flex:1, minWidth:100, cursor:"pointer"}} onClick={()=>onViewProfile&&onViewProfile(c.id)}>
                <p style={{margin:0, fontWeight:500, fontSize:13}}>{c.name} {c.id===currentUserId?<span style={{color:"#7A2E2E",fontSize:10}}>(you)</span>:""}</p>
                <p style={{...S.muted, margin:0, fontSize:11}}>{c.instagram}</p>
              </div>
              <div style={{minWidth:60, textAlign:"right"}}>
                <p style={S.label}>Orders</p>
                <p style={{margin:"3px 0 0", fontWeight:600, fontSize:14}}>{c.orders}</p>
              </div>
              <div style={{minWidth:70, textAlign:"right"}}>
                <p style={S.label}>Views</p>
                <p style={{margin:"3px 0 0", fontWeight:600, fontSize:14}}>{fmtNum(c.views)}</p>
              </div>
              <div style={{minWidth:60, textAlign:"right"}}>
                <p style={S.label}>Progress</p>
                <p style={{margin:"3px 0 0", fontSize:13}}>{c.approved} posts</p>
              </div>
              <span style={S.badge(c.status)}>{c.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{...S.cardSm, marginTop:16, borderColor:"#1a1a2e", background:"#060608"}}>
        <p style={{...S.muted, fontSize:12, margin:0}}>Revenue data pulls from Shopify order history using affiliate discount codes. Connect your Shopify store in admin settings to enable live tracking. Demo data shown above.</p>
      </div>
    </div>
  );
}

function CreatorProfile({ creator, approved, subs, orders, allCreators, allSubs, allOrders, isOwnProfile }) {
  const [editBio, setEditBio] = useState(false);
  const [bioText, setBioText] = useState(creator.bio || "");
  const totalViews = subs.reduce((a,s) => a+s.views, 0);
  const sorted = [...subs].sort((a,b) => new Date(b.submittedAt) - new Date(a.submittedAt));

  // Calculate leaderboard rank by orders generated via affiliate code
  const ranked = [...(allCreators||[])].map(c => ({
    id: c.id,
    orders: (allOrders||[]).filter(o => o.creatorId === c.id).length,
  })).sort((a,b) => b.orders - a.orders);
  const rank = ranked.findIndex(r => r.id === creator.id) + 1;
  const rankLabel = rank === 1 ? "🥇 #1" : rank === 2 ? "🥈 #2" : rank === 3 ? "🥉 #3" : `#${rank}`;

  return (
    <div style={{maxWidth:600}}>

      {/* ── Header ── */}
      <div style={{display:"flex", alignItems:"flex-start", gap:28, marginBottom:28, flexWrap:"wrap"}}>
        {/* Avatar */}
        <div style={{width:86, height:86, borderRadius:"50%", background:"#1a1a1a", border:"2px solid #2a2a2a", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, fontWeight:700, color:"#e8e6e1", flexShrink:0}}>
          {creator.avatar}
        </div>

        {/* Name + stats */}
        <div style={{flex:1, minWidth:180}}>
          <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:10, flexWrap:"wrap"}}>
            <h2 style={{...S.heading, fontSize:22, margin:0, letterSpacing:"0.02em"}}>{creator.name}</h2>
            <span style={S.badge(creator.status)}>{creator.status}</span>
          </div>

          {/* Stat row */}
          <div style={{display:"flex", gap:28, marginBottom:14}}>
            <div style={{textAlign:"center"}}>
              <p style={{margin:0, fontWeight:700, fontSize:16, color:"#e8e6e1"}}>{subs.length}</p>
              <p style={{...S.muted, margin:0, fontSize:11, letterSpacing:"0.06em"}}>posts</p>
            </div>
            <div style={{textAlign:"center"}}>
              <p style={{margin:0, fontWeight:700, fontSize:16, color:"#e8e6e1"}}>{fmtNum(totalViews)}</p>
              <p style={{...S.muted, margin:0, fontSize:11, letterSpacing:"0.06em"}}>views</p>
            </div>
            <div style={{textAlign:"center"}}>
              <p style={{margin:0, fontWeight:700, fontSize:16, color: rank <= 3 ? "#d4a017" : "#e8e6e1"}}>{rankLabel}</p>
              <p style={{...S.muted, margin:0, fontSize:11, letterSpacing:"0.06em"}}>rank</p>
            </div>
          </div>

          {/* Bio */}
          {!editBio ? (
            <div>
              <p style={{margin:"0 0 4px", fontSize:13, color:"#e8e6e1", lineHeight:1.5}}>
                {bioText || <span style={S.muted}>{isOwnProfile ? "No bio yet." : ""}</span>}
              </p>
              {isOwnProfile && (
                <button style={{...S.navLink, fontSize:11, color:"#555", marginTop:4}} onClick={()=>setEditBio(true)}>
                  edit bio
                </button>
              )}
            </div>
          ) : (
            <div>
              <textarea
                style={{...S.textarea, minHeight:56, fontSize:13, marginBottom:8}}
                value={bioText}
                onChange={e=>setBioText(e.target.value)}
                placeholder="Write something about yourself..."
                maxLength={150}
                autoFocus
              />
              <div style={{display:"flex", gap:8, alignItems:"center"}}>
                <button style={{...S.btnCrimson, padding:"6px 16px", fontSize:11}} onClick={()=>setEditBio(false)}>Save</button>
                <button style={{...S.navLink, fontSize:11}} onClick={()=>{setBioText(creator.bio||"");setEditBio(false);}}>Cancel</button>
                <span style={{...S.muted, fontSize:10, marginLeft:"auto"}}>{150-bioText.length} left</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Social handles ── */}
      <div style={{display:"flex", gap:10, marginBottom:28, flexWrap:"wrap"}}>
        {creator.instagram && (
          <a href={`https://instagram.com/${creator.instagram.replace("@","")}`} target="_blank" rel="noopener noreferrer"
            style={{display:"flex", alignItems:"center", gap:8, background:"#111", border:"1px solid #222", borderRadius:2, padding:"8px 14px", textDecoration:"none", color:"#e8e6e1", fontSize:12}}>
            <span style={{fontSize:16}}>📷</span> {creator.instagram}
          </a>
        )}
        {creator.tiktok && (
          <a href={`https://tiktok.com/${creator.tiktok.replace("@","@")}`} target="_blank" rel="noopener noreferrer"
            style={{display:"flex", alignItems:"center", gap:8, background:"#111", border:"1px solid #222", borderRadius:2, padding:"8px 14px", textDecoration:"none", color:"#e8e6e1", fontSize:12}}>
            <span style={{fontSize:16}}>🎵</span> {creator.tiktok}
          </a>
        )}
        {creator.affiliateCode && (
          <div style={{display:"flex", alignItems:"center", gap:8, background:"#0f0f0f", border:"1px solid #2a2a1a", borderRadius:2, padding:"8px 14px", fontSize:12}}>
            <span style={{fontSize:14}}>🖤</span>
            <span style={S.muted}>code:</span>
            <span style={{fontWeight:700, letterSpacing:"0.1em"}}>{creator.affiliateCode}</span>
          </div>
        )}
      </div>

      {/* ── Divider ── */}
      <div style={{...S.divider, margin:"0 0 20px"}} />

      {/* ── Posts grid ── */}
      <p style={{...S.labelMb, marginBottom:16}}>Posts</p>

      {sorted.length === 0 ? (
        <div style={{...S.card, textAlign:"center", padding:48}}>
          <p style={S.muted}>No posts yet. Submit your first post.</p>
        </div>
      ) : (
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:3}}>
          {sorted.map(s => (
            <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{textDecoration:"none", display:"block", position:"relative", aspectRatio:"1", background:"#111", border:"1px solid #1a1a1a", overflow:"hidden"}}>
              {/* Platform icon top-left */}
              <div style={{position:"absolute", top:8, left:8, fontSize:14, opacity:0.8}}>
                {s.platform==="Instagram"?"📷":"🎵"}
              </div>
              {/* Status badge top-right */}
              <div style={{position:"absolute", top:8, right:8}}>
                <span style={{...S.badge(s.status), fontSize:9, padding:"2px 6px"}}>{s.status}</span>
              </div>
              {/* Content type label center */}
              <div style={{position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4}}>
                <span style={{fontSize:11, color:"#555", letterSpacing:"0.08em", textTransform:"uppercase"}}>{s.type}</span>
                <span style={{fontSize:10, color:"#333"}}>{s.datePosted}</span>
              </div>
              {/* Stats overlay bottom */}
              {s.views > 0 && (
                <div style={{position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(transparent,rgba(0,0,0,0.85))", padding:"16px 8px 8px", display:"flex", justifyContent:"space-between"}}>
                  <span style={{fontSize:10, color:"#e8e6e1"}}>▶ {fmtNum(s.views)}</span>
                  <span style={{fontSize:10, color:"#e8e6e1"}}>♥ {fmtNum(s.likes)}</span>
                </div>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── ADMIN DASHBOARD ─────────────────────────────────────────────────────────
function AdminDashboard({ user, onLogout, db, setDb }) {
  const [tab, setTab] = useState("overview");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  useEffect(() => { const fn=()=>setIsMobile(window.innerWidth<700); window.addEventListener("resize",fn); return()=>window.removeEventListener("resize",fn); }, []);

  const creators = db.users.filter(u => u.role === "creator");
  const pending = db.submissions.filter(s => s.status === "Pending");
  const totalOrders = db.shopifyOrders.length;

  const TABS = [
    {id:"overview",  label:"Overview"},
    {id:"creators",  label:"Creators"},
    {id:"review",    label:`Review${pending.length>0?" ("+pending.length+")":""}`},
    {id:"leaderboard", label:"Leaderboard"},
    {id:"analytics", label:"Analytics"},
    {id:"shopify",   label:"Shopify"},
  ];
  const MOB_TABS = [
    {id:"overview",label:"Overview",icon:"◈"},
    {id:"creators",label:"Creators",icon:"⊹"},
    {id:"review",label:"Review",icon:"◻"},
    {id:"leaderboard",label:"Ranks",icon:"↑"},
    {id:"shopify",label:"Shopify",icon:"⬡"},
  ];

  return (
    <div style={{...S.app, paddingBottom:isMobile?80:0}}>
      <nav style={S.nav}>
        <span style={S.navLogo}>AYRA LABS</span>
        <div style={S.navRight}>
          {!isMobile && <span style={{...S.muted, fontSize:11}}>Admin</span>}
          {pending.length>0 && <span style={{background:"#7A2E2E",color:"#e8e6e1",borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700}}>{pending.length}</span>}
          <button style={S.navLink} onClick={onLogout}>Sign out</button>
        </div>
      </nav>
      <div style={{maxWidth:1100, margin:"0 auto", padding:isMobile?"22px 16px":"36px 28px"}}>
        {!isMobile && (
          <div style={S.tabBar}>
            {TABS.map(t=><button key={t.id} style={{...S.tab,...(tab===t.id?S.tabActive:{})}} onClick={()=>setTab(t.id)}>{t.label}</button>)}
          </div>
        )}
        {tab==="overview"   && <AdminOverview db={db} creators={creators} pending={pending} totalOrders={totalOrders} onGoReview={()=>setTab("review")} />}
        {tab==="creators"   && <AdminCreators db={db} setDb={setDb} />}
        {tab==="review"     && <AdminReview db={db} setDb={setDb} />}
        {tab==="leaderboard"&& <AdminLeaderboard db={db} setDb={setDb} creators={creators} />}
        {tab==="analytics"  && <AdminAnalytics db={db} creators={creators} />}
        {tab==="shopify"    && <ShopifyIntegration db={db} setDb={setDb} />}
      </div>
      {isMobile && (
        <nav style={S.mobileNav}>
          {MOB_TABS.map(t=>(
            <button key={t.id} style={{...S.mobileNavBtn,...(tab===t.id?{color:"#e8e6e1"}:{})}} onClick={()=>setTab(t.id)}>
              <span style={{fontSize:16}}>{t.icon}</span>{t.label}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

function AdminOverview({ db, creators, pending, totalOrders, onGoReview }) {
  const completed = creators.filter(c=>c.status==="Trial Complete").length;
  const active = creators.filter(c=>c.status==="Trial").length;
  const totalViews = db.submissions.reduce((a,s)=>a+s.views,0);
  const topCreator = creators.map(c=>({...c,orders:getOrders(c.id,db.shopifyOrders).length,approved:getApproved(c.id,db.submissions)})).sort((a,b)=>b.orders-a.orders)[0];
  const topPost = [...db.submissions].sort((a,b)=>b.views-a.views)[0];

  return (
    <div>
      <p style={{...S.labelMb, marginBottom:12}}>Dashboard</p>
      <h1 style={{...S.heading, fontSize:38, margin:"0 0 28px"}}>Overview</h1>
      <div style={{...S.grid4, marginBottom:22}}>
        {[
          {label:"Total Creators", value:creators.length},
          {label:"Active Trials",  value:active},
          {label:"Trials Complete",value:completed},
          {label:"Pending Review", value:pending.length, color:pending.length>0?"#d4a017":"#e8e6e1"},
          {label:"Total Content",  value:db.submissions.length},
          {label:"Total Views",    value:fmtNum(totalViews)},
          {label:"Total Orders",   value:totalOrders},
        ].map(s=>(
          <div key={s.label} style={S.statCard}>
            <p style={S.label}>{s.label}</p>
            <p style={{fontSize:24, fontWeight:700, margin:"6px 0 0", color:s.color||"#e8e6e1"}}>{s.value}</p>
          </div>
        ))}
      </div>
      {pending.length>0 && (
        <div style={{...S.card, borderColor:"#2a1a00", background:"#0a0600", marginBottom:22}}>
          <div style={{...S.rowBetween, flexWrap:"wrap", gap:12}}>
            <div>
              <p style={{color:"#d4a017", fontSize:13, fontWeight:600, margin:"0 0 4px"}}>{pending.length} submission{pending.length!==1?"s":""} waiting for review</p>
              <p style={S.muted}>Creators are waiting on your approval.</p>
            </div>
            <button style={S.btnCrimson} onClick={onGoReview}>Review Now</button>
          </div>
        </div>
      )}
      <div style={{...S.grid2, marginBottom:22}}>
        {topCreator && (
          <div style={S.card}>
            <p style={{...S.labelMb}}>Top Creator by Revenue</p>
            <div style={{...S.row, marginTop:8}}>
              <div style={S.avatar}>{topCreator.avatar}</div>
              <div>
                <p style={{margin:0, fontWeight:600}}>{topCreator.name}</p>
                <p style={{...S.muted, margin:0, fontSize:12}}>{topCreator.orders} orders · {topCreator.approved} posts</p>
              </div>
            </div>
          </div>
        )}
        {topPost && (
          <div style={S.card}>
            <p style={{...S.labelMb}}>Top Performing Post</p>
            <p style={{margin:"8px 0 4px", fontSize:13}}>{topPost.platform} · {topPost.type}</p>
            <p style={{margin:0, fontWeight:700, fontSize:22}}>{fmtNum(topPost.views)} views</p>
            <a href={topPost.url} target="_blank" rel="noopener noreferrer" style={{...S.muted, fontSize:11, display:"block", marginTop:4}}>View post →</a>
          </div>
        )}
      </div>
      <div style={S.card}>
        <p style={{...S.labelMb, marginBottom:16}}>Creator Progress</p>
        <div style={{display:"flex", flexDirection:"column", gap:12}}>
          {creators.sort((a,b)=>getApproved(b.id,db.submissions)-getApproved(a.id,db.submissions)).map(c=>{
            const app=getApproved(c.id,db.submissions);
              return (
              <div key={c.id} style={{display:"flex", alignItems:"center", gap:14, flexWrap:"wrap"}}>
                <div style={{...S.avatar, width:32, height:32, fontSize:11}}>{c.avatar}</div>
                <div style={{flex:1, minWidth:120}}>
                  <div style={{...S.rowBetween, marginBottom:4}}>
                    <span style={{fontSize:12}}>{c.name}</span>
                    <div style={{display:"flex", gap:12, alignItems:"center"}}>
  
                      <span style={{...S.muted, fontSize:11}}>{app}/10</span>
                    </div>
                  </div>
                  <div style={S.progressBar}><div style={S.progressFill(Math.min((app/10)*100,100))} /></div>
                </div>
                <span style={S.badge(c.status)}>{c.status}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN LEADERBOARD ────────────────────────────────────────────────────────
function AdminLeaderboard({ db, setDb, creators }) {
  const [sortBy, setSortBy] = useState("orders");
  const [editCode, setEditCode] = useState(null);
  const [codeInput, setCodeInput] = useState("");

  const rows = creators.map(c => {
    const orders = getOrders(c.id, db.shopifyOrders);
    const revenue = orders.reduce((a,o)=>a+o.orderTotal,0);
    const views = getTotalViews(c.id, db.submissions);
    const approved = getApproved(c.id, db.submissions);
    const likes = db.submissions.filter(s=>s.creatorId===c.id).reduce((a,s)=>a+s.likes,0);
    const eng = views > 0 ? ((likes/views)*100).toFixed(1) : "0.0";
    return { ...c, orders:orders.length, revenue, views, approved, likes, eng };
  }).sort((a,b) => {
    if (sortBy==="revenue") return b.revenue-a.revenue;
    if (sortBy==="views") return b.views-a.views;
    if (sortBy==="orders") return b.orders-a.orders;
    if (sortBy==="posts") return b.approved-a.approved;
    return 0;
  });

  const saveCode = (creatorId) => {
    setDb(prev=>({...prev, users:prev.users.map(u=>u.id===creatorId?{...u,affiliateCode:codeInput.toUpperCase().trim()}:u)}));
    setEditCode(null); setCodeInput("");
  };

  const rankColor = (i) => i===0?"#d4a017": i===1?"#aaa": i===2?"#b87333":"#555";
  const rankEmoji = (i) => i===0?"🥇": i===1?"🥈": i===2?"🥉":`#${i+1}`;
  const SORTS = [{id:"orders",label:"Orders"},{id:"views",label:"Views"},{id:"posts",label:"Posts"}];

  // Revenue totals
  const totalOrd = rows.reduce((a,r)=>a+r.orders,0);

  return (
    <div>
      <div style={{...S.rowBetween, marginBottom:28, flexWrap:"wrap", gap:12}}>
        <div>
          <p style={{...S.labelMb, marginBottom:10}}>Rankings</p>
          <h2 style={{...S.heading, fontSize:32, margin:0}}>Affiliate Leaderboard</h2>
        </div>
        <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
          {SORTS.map(s=>(
            <button key={s.id} style={{...S.btnOutline, padding:"7px 14px",...(sortBy===s.id?{borderColor:"#7A2E2E",color:"#e8e6e1"}:{})}} onClick={()=>setSortBy(s.id)}>{s.label}</button>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div style={{...S.grid4, marginBottom:24}}>
        {[
          {label:"Total Orders", value:totalOrd},
          {label:"Creators w/ Code", value:creators.filter(c=>c.affiliateCode).length},
          {label:"Shopify Connected", value:db.shopifyConfig.connected?"Yes":"Demo Mode", color:db.shopifyConfig.connected?"#4caf50":"#d4a017"},
        ].map(s=>(
          <div key={s.label} style={S.statCard}>
            <p style={S.label}>{s.label}</p>
            <p style={{fontSize:22, fontWeight:700, margin:"6px 0 0", color:s.color||"#e8e6e1"}}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Full leaderboard table */}
      <div style={S.card}>
        <p style={{...S.labelMb, marginBottom:18}}>Sorted by {sortBy}</p>
        <div style={{display:"flex", flexDirection:"column", gap:0}}>
          {rows.map((c,i)=>(
            <div key={c.id} style={{padding:"16px 0", borderBottom:i<rows.length-1?"1px solid #141414":"none"}}>
              <div style={{display:"flex", alignItems:"center", gap:12, flexWrap:"wrap"}}>
                <span style={{fontWeight:700, fontSize:16, minWidth:32, color:rankColor(i)}}>{rankEmoji(i)}</span>
                <div style={{...S.avatar, width:36, height:36, fontSize:12}}>{c.avatar}</div>
                <div style={{flex:1, minWidth:120}}>
                  <p style={{margin:0, fontWeight:600, fontSize:14}}>{c.name}</p>
                  <p style={{...S.muted, margin:0, fontSize:11}}>{c.instagram} · {c.tiktok}</p>
                </div>

                {/* Affiliate Code field */}
                <div style={{minWidth:130}}>
                  <p style={S.label}>Affiliate Code</p>
                  {editCode===c.id ? (
                    <div style={{display:"flex", gap:6, marginTop:4}}>
                      <input style={{...S.input, padding:"5px 8px", fontSize:12, width:90}} value={codeInput} onChange={e=>setCodeInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&saveCode(c.id)} placeholder="CODE10" autoFocus />
                      <button style={{...S.btnSuccess, padding:"5px 10px"}} onClick={()=>saveCode(c.id)}>✓</button>
                    </div>
                  ) : (
                    <div style={{display:"flex", alignItems:"center", gap:6, marginTop:4}}>
                      <span style={{fontSize:12, fontWeight:700, letterSpacing:"0.08em", color:c.affiliateCode?"#d4a017":"#555"}}>{c.affiliateCode||"—"}</span>
                      <button style={{...S.navLink, fontSize:10, color:"#444"}} onClick={()=>{setEditCode(c.id);setCodeInput(c.affiliateCode||"");}}>edit</button>
                    </div>
                  )}
                </div>

                
                <div style={{minWidth:60, textAlign:"right"}}>
                  <p style={S.label}>Orders</p>
                  <p style={{margin:"4px 0 0", fontWeight:600, fontSize:15}}>{c.orders}</p>
                </div>
                <div style={{minWidth:70, textAlign:"right"}}>
                  <p style={S.label}>Views</p>
                  <p style={{margin:"4px 0 0", fontSize:13}}>{fmtNum(c.views)}</p>
                </div>
                <div style={{minWidth:55, textAlign:"right"}}>
                  <p style={S.label}>Eng %</p>
                  <p style={{margin:"4px 0 0", fontSize:13}}>{c.eng}%</p>
                </div>
                <span style={S.badge(c.status)}>{c.status}</span>
              </div>

              {/* Order history for this creator */}
              {c.orders > 0 && (
                <div style={{marginTop:12, marginLeft:80}}>
                  <p style={{...S.muted, fontSize:11, marginBottom:6}}>Recent orders via {c.affiliateCode}:</p>
                  <div style={{display:"flex", flexDirection:"column", gap:4}}>
                    {getOrders(c.id, db.shopifyOrders).slice(0,3).map(o=>(
                      <div key={o.id} style={{display:"flex", gap:20, fontSize:11, color:"#555"}}>
                        <span>{o.orderId}</span>
                        <span>{o.orderDate}</span>
                        <span>{o.product}</span>

                      </div>
                    ))}
                    {c.orders > 3 && <p style={{...S.muted, fontSize:11}}>+{c.orders-3} more orders</p>}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SHOPIFY INTEGRATION PAGE ─────────────────────────────────────────────────
function ShopifyIntegration({ db, setDb }) {
  const [apiKey, setApiKey] = useState(db.shopifyConfig.apiKey);
  const [storeName, setStoreName] = useState(db.shopifyConfig.storeName);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const testConnection = () => {
    setTesting(true); setTestResult(null);
    setTimeout(() => {
      // In production: actually call Shopify Admin API /admin/api/2024-01/shop.json
      setTestResult({ success: false, message: "Connection failed — Shopify Admin API requires a backend proxy server to avoid CORS. See setup instructions below." });
      setTesting(false);
    }, 1200);
  };

  const save = () => {
    setDb(prev=>({...prev, shopifyConfig:{...prev.shopifyConfig, apiKey, storeName}}));
    alert("Config saved (demo mode). Real connection requires backend server.");
  };

  return (
    <div>
      <p style={{...S.labelMb, marginBottom:12}}>Integration</p>
      <h2 style={{...S.heading, fontSize:32, margin:"0 0 8px"}}>Shopify Connection</h2>
      <p style={{...S.muted, marginBottom:32}}>Connect your Shopify store to track affiliate code sales in real-time.</p>

      {/* Status */}
      <div style={{...S.card, marginBottom:24, borderColor:db.shopifyConfig.connected?"#1a3a1a":"#2a2a00"}}>
        <div style={S.rowBetween}>
          <div>
            <p style={{...S.labelMb}}>Connection Status</p>
            <p style={{margin:"6px 0 0", fontSize:16, fontWeight:600, color:db.shopifyConfig.connected?"#4caf50":"#d4a017"}}>
              {db.shopifyConfig.connected ? "Connected" : "Demo Mode — Not Connected"}
            </p>
            <p style={{...S.muted, fontSize:12, marginTop:4}}>Store: ayra--labs.com (b02z6h-cv.myshopify.com)</p>
          </div>
          <span style={{fontSize:28}}>{db.shopifyConfig.connected?"🟢":"🟡"}</span>
        </div>
      </div>

      {/* How it works */}
      <div style={{...S.card, marginBottom:24}}>
        <p style={{...S.labelMb, marginBottom:16}}>How Shopify Integration Works</p>
        <div style={{display:"flex", flexDirection:"column", gap:14}}>
          {[
            ["1. Affiliate gets a discount code","When a creator completes their trial, you assign them a Shopify discount code (e.g. JADE15). This is created manually in Shopify admin under Discounts."],
            ["2. Creator shares their link","The creator shares ayra--labs.com with their code. Shopify automatically applies the discount at checkout."],
            ["3. Orders are tracked by code","The Shopify Admin API returns all orders where that discount code was used — giving you exact revenue per creator."],
            ["4. Leaderboard updates automatically","Once connected, this portal fetches order data via the API and updates the leaderboard in real-time."],
          ].map(([title, desc])=>(
            <div key={title} style={{borderLeft:"2px solid #7A2E2E", paddingLeft:16}}>
              <p style={{margin:"0 0 4px", fontWeight:600, fontSize:13}}>{title}</p>
              <p style={{...S.muted, margin:0, fontSize:12}}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* API Config */}
      <div style={{...S.card, marginBottom:24}}>
        <p style={{...S.labelMb, marginBottom:20}}>API Configuration</p>
        <div style={S.formGroup}>
          <p style={{...S.labelMb}}>Shopify Store Name</p>
          <input style={S.input} value={storeName} onChange={e=>setStoreName(e.target.value)} placeholder="b02z6h-cv" />
          <p style={{...S.muted, fontSize:11, marginTop:6}}>The subdomain before .myshopify.com</p>
        </div>
        <div style={S.formGroup}>
          <p style={{...S.labelMb}}>Admin API Token</p>
          <input style={S.input} type="password" value={apiKey} onChange={e=>setApiKey(e.target.value)} placeholder="shpat_xxxxxxxxxxxxxxxxxxxx" />
          <p style={{...S.muted, fontSize:11, marginTop:6}}>Generated in Shopify Admin → Settings → Apps → Develop apps. Requires read_orders + read_price_rules scopes.</p>
        </div>
        <div style={{display:"flex", gap:10}}>
          <button style={S.btn} onClick={save}>Save Config</button>
          <button style={{...S.btnOutline, opacity:testing?0.6:1}} onClick={testConnection} disabled={testing}>{testing?"Testing...":"Test Connection"}</button>
        </div>
        {testResult && (
          <div style={{marginTop:16, padding:"12px 16px", borderRadius:2, background:testResult.success?"#0d1f0d":"#1f0d0d", border:`1px solid ${testResult.success?"#1a3a1a":"#3a1a1a"}`}}>
            <p style={{color:testResult.success?"#4caf50":"#ef5350", fontSize:13, margin:0}}>{testResult.message}</p>
          </div>
        )}
      </div>

      {/* Backend requirement */}
      <div style={{...S.card, borderColor:"#1a1a2e", background:"#06060f"}}>
        <p style={{...S.labelMb, color:"#4a90d9", marginBottom:14}}>Backend Server Required</p>
        <p style={{...S.muted, fontSize:13, marginBottom:14}}>Shopify's Admin API blocks direct browser requests (CORS). You need a backend server to proxy API calls. Recommended options:</p>
        <div style={{display:"flex", flexDirection:"column", gap:10}}>
          {[
            ["Shopify App (recommended)","Build a private Shopify app. Gives you full Admin API access + webhook support for real-time order tracking."],
            ["Vercel/Netlify Edge Function","Simple serverless function that proxies requests to Shopify Admin API. No server to manage."],
            ["Node.js / Express backend","Self-hosted option. Most flexible — can also handle creator auth, email notifications, etc."],
            ["Supabase + Edge Functions","If you move this app to Supabase for the database, their edge functions can proxy Shopify calls."],
          ].map(([title, desc])=>(
            <div key={title} style={S.cardSm}>
              <p style={{margin:"0 0 4px", fontWeight:600, fontSize:12}}>{title}</p>
              <p style={{...S.muted, margin:0, fontSize:11}}>{desc}</p>
            </div>
          ))}
        </div>
        <div style={{...S.divider}} />
        <p style={{...S.muted, fontSize:12}}>
          Contact: support@ayra--labs.com · Discord: discord.gg/EwwH8xkPRN · Shopify store: b02z6h-cv.myshopify.com
        </p>
      </div>
    </div>
  );
}

function AdminCreators({ db, setDb }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [noteText, setNoteText] = useState("");

  const creators = db.users.filter(u=>u.role==="creator").filter(c=>
    !search||c.name.toLowerCase().includes(search.toLowerCase())||c.instagram.includes(search)||c.tiktok.includes(search)
  );

  const updateCreator = (id, updates) => {
    setDb(prev=>({...prev, users:prev.users.map(u=>u.id===id?{...u,...updates}:u)}));
    if (selected?.id===id) setSelected(prev=>({...prev,...updates}));
  };

  const updateSub = (id, updates) => {
    setDb(prev=>{
      const subs = prev.submissions.map(s=>s.id===id?{...s,...updates}:s);
      const sub = subs.find(s=>s.id===id);
      const approved = subs.filter(s=>s.creatorId===sub.creatorId&&s.status==="Approved").length;
      let users = prev.users;
      if (approved>=10) {
        users = prev.users.map(u=>u.id===sub.creatorId?{...u,status:"Trial Complete"}:u);
        if (selected?.id===sub.creatorId) setSelected(p=>({...p,status:"Trial Complete"}));
      }
      return {...prev, submissions:subs, users};
    });
  };

  if (selected) {
    const creator = db.users.find(u=>u.id===selected.id);
    const subs = db.submissions.filter(s=>s.creatorId===selected.id);
    const orders = getOrders(selected.id, db.shopifyOrders);
    const approved = getApproved(selected.id, db.submissions);
    const revenue = orders.reduce((a,o)=>a+o.orderTotal,0);
    return (
      <div>
        <button style={{...S.navLink, marginBottom:22}} onClick={()=>setSelected(null)}>← Back to Creators</button>
        <div style={{...S.rowBetween, marginBottom:28, flexWrap:"wrap", gap:14}}>
          <div style={S.row}>
            <div style={{...S.avatar, width:52, height:52, fontSize:17}}>{creator.avatar}</div>
            <div>
              <h2 style={{...S.heading, fontSize:26, margin:0}}>{creator.name}</h2>
              <p style={{...S.muted, margin:0}}>{creator.instagram} · {creator.tiktok}</p>
            </div>
          </div>
          <span style={S.badge(creator.status)}>{creator.status}</span>
        </div>
        <div style={{...S.grid4, marginBottom:22}}>
          {[
            {label:"Approved", value:approved, color:"#4caf50"},
            {label:"Pending",  value:getPending(creator.id,db.submissions), color:"#d4a017"},
            {label:"Rejected", value:getRejected(creator.id,db.submissions), color:"#ef5350"},
            {label:"Orders",   value:orders.length},
            {label:"Views",    value:fmtNum(getTotalViews(creator.id,db.submissions))},
          ].map(s=>(
            <div key={s.label} style={S.statCard}>
              <p style={S.label}>{s.label}</p>
              <p style={{fontSize:20, fontWeight:700, margin:"6px 0 0", color:s.color||"#e8e6e1"}}>{s.value}</p>
            </div>
          ))}
        </div>
        <div style={{...S.card, marginBottom:22}}>
          <p style={{...S.labelMb, marginBottom:14}}>Status & Settings</p>
          <div style={{display:"flex", gap:8, flexWrap:"wrap", marginBottom:16}}>
            {["Trial","Trial Complete","Paused","Removed"].map(s=>(
              <button key={s} style={{...S.btnOutline,...(creator.status===s?{borderColor:"#7A2E2E",color:"#e8e6e1"}:{})}} onClick={()=>updateCreator(creator.id,{status:s})}>{s}</button>
            ))}
          </div>
          {creator.status==="Trial Complete" && (
            <div style={{display:"flex", alignItems:"center", gap:12, padding:"12px 16px", background:"#0d1a2e", border:"1px solid #1a2e4a", borderRadius:2}}>
              <input type="checkbox" id="handoff" checked={creator.affiliateHandoff} onChange={e=>updateCreator(creator.id,{affiliateHandoff:e.target.checked})} style={{width:16,height:16,cursor:"pointer"}} />
              <label htmlFor="handoff" style={{color:"#4a90d9", fontSize:13, cursor:"pointer"}}>Affiliate Handoff Complete — Added to affiliate platform</label>
            </div>
          )}
        </div>
        <div style={{...S.card, marginBottom:22}}>
          <p style={{...S.labelMb, marginBottom:14}}>Submissions ({subs.length})</p>
          <div style={{display:"flex", flexDirection:"column", gap:8}}>
            {subs.sort((a,b)=>new Date(b.submittedAt)-new Date(a.submittedAt)).map(s=>(
              <AdminSubRow key={s.id} sub={s} onApprove={()=>updateSub(s.id,{status:"Approved"})} onReject={reason=>updateSub(s.id,{status:"Rejected",rejectionReason:reason})} />
            ))}
          </div>
        </div>
        {orders.length > 0 && (
          <div style={{...S.card, marginBottom:22}}>
            <p style={{...S.labelMb, marginBottom:14}}>Shopify Orders via {creator.affiliateCode}</p>
            <div style={{display:"flex", flexDirection:"column", gap:6}}>
              {orders.map(o=>(
                <div key={o.id} style={{...S.rowBetween, padding:"10px 0", borderBottom:"1px solid #141414", flexWrap:"wrap", gap:8}}>
                  <div>
                    <p style={{margin:0, fontSize:13}}>{o.orderId} · {o.product}</p>
                    <p style={{...S.muted, margin:0, fontSize:11}}>{o.orderDate} · {o.customerEmail}</p>
                  </div>
                  <p style={{margin:0, fontWeight:600, fontSize:12, color:"#717171"}}>{o.orderId}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={S.card}>
          <p style={{...S.labelMb, marginBottom:12}}>Internal Notes</p>
          <textarea style={{...S.textarea, marginBottom:10}} value={noteText} onChange={e=>setNoteText(e.target.value)} placeholder="Add a note..." />
          <button style={S.btn} onClick={()=>{if(!noteText.trim())return;setDb(prev=>({...prev,notes:[...prev.notes,{creatorId:creator.id,text:noteText,date:new Date().toISOString().split("T")[0]}]}));setNoteText("");}}>Save Note</button>
          {db.notes.filter(n=>n.creatorId===creator.id).map((n,i)=>(
            <div key={i} style={{...S.cardSm, marginTop:8}}>
              <p style={{...S.muted, fontSize:11, marginBottom:4}}>{n.date}</p>
              <p style={{margin:0, fontSize:13}}>{n.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{...S.rowBetween, marginBottom:28, flexWrap:"wrap", gap:14}}>
        <div>
          <p style={{...S.labelMb, marginBottom:10}}>Creators</p>
          <h2 style={{...S.heading, fontSize:32, margin:0}}>Creator Management</h2>
        </div>
        <input style={{...S.input, maxWidth:240}} placeholder="Search creators..." value={search} onChange={e=>setSearch(e.target.value)} />
      </div>
      <div style={{display:"flex", flexDirection:"column", gap:10}}>
        {creators.map(c=>{
          const app=getApproved(c.id,db.submissions);
          const lastSub=db.submissions.filter(s=>s.creatorId===c.id).sort((a,b)=>new Date(b.submittedAt)-new Date(a.submittedAt))[0];
          return (
            <div key={c.id} style={{...S.card, cursor:"pointer"}} onClick={()=>setSelected(c)}>
              <div style={{display:"flex", alignItems:"center", gap:14, flexWrap:"wrap"}}>
                <div style={S.avatar}>{c.avatar}</div>
                <div style={{flex:1, minWidth:130}}>
                  <p style={{margin:0, fontWeight:600}}>{c.name}</p>
                  <p style={{...S.muted, margin:0, fontSize:11}}>{c.instagram}</p>
                </div>
                <div style={{minWidth:80}}><p style={S.label}>Progress</p><p style={{margin:"4px 0 0", fontWeight:700}}>{app}/10</p></div>

                <div style={{minWidth:80}}><p style={S.label}>Last Post</p><p style={{margin:"4px 0 0", fontSize:12}}>{lastSub?lastSub.submittedAt:"None"}</p></div>
                <span style={S.badge(c.status)}>{c.status}</span>
              </div>
              <div style={{marginTop:10}}><div style={S.progressBar}><div style={S.progressFill(Math.min((app/10)*100,100))} /></div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AdminSubRow({ sub, onApprove, onReject }) {
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  return (
    <div style={{border:"1px solid #1a1a1a", borderRadius:2, padding:"12px 14px"}}>
      <div style={{...S.rowBetween, flexWrap:"wrap", gap:8}}>
        <div>
          <div style={{display:"flex", alignItems:"center", gap:8}}>
            <span>{sub.platform==="Instagram"?"📷":"🎵"}</span>
            <span style={{fontSize:12}}>{sub.type} · {sub.datePosted}</span>
            <span style={S.badge(sub.status)}>{sub.status}</span>
          </div>
          <a href={sub.url} target="_blank" rel="noopener noreferrer" style={{...S.muted, fontSize:11, display:"block", marginTop:4}}>{sub.url}</a>
        </div>
        {sub.status==="Pending" && (
          <div style={{display:"flex", gap:8}}>
            <button style={S.btnSuccess} onClick={onApprove}>Approve</button>
            <button style={S.btnDanger} onClick={()=>setRejecting(r=>!r)}>Reject</button>
          </div>
        )}
      </div>
      {rejecting && (
        <div style={{marginTop:10}}>
          <input style={{...S.input, marginBottom:8}} placeholder="Rejection reason..." value={reason} onChange={e=>setReason(e.target.value)} />
          <button style={S.btnDanger} onClick={()=>{onReject(reason||"Did not meet content guidelines.");setRejecting(false);}}>Confirm Reject</button>
        </div>
      )}
      {sub.rejectionReason && <p style={{color:"#ef5350", fontSize:12, marginTop:8}}>Reason: {sub.rejectionReason}</p>}
    </div>
  );
}

function AdminReview({ db, setDb }) {
  const pending = db.submissions.filter(s=>s.status==="Pending");
  const updateSub = (id, updates) => {
    setDb(prev=>{
      const subs = prev.submissions.map(s=>s.id===id?{...s,...updates}:s);
      const sub = subs.find(s=>s.id===id);
      const approved = subs.filter(s=>s.creatorId===sub.creatorId&&s.status==="Approved").length;
      let users = prev.users;
      if (approved>=10) users = prev.users.map(u=>u.id===sub.creatorId?{...u,status:"Trial Complete"}:u);
      return {...prev, submissions:subs, users};
    });
  };
  return (
    <div>
      <p style={{...S.labelMb, marginBottom:12}}>Content Review</p>
      <h2 style={{...S.heading, fontSize:32, margin:"0 0 8px"}}>Pending Submissions</h2>
      <p style={{...S.muted, marginBottom:28}}>{pending.length} submission{pending.length!==1?"s":""} awaiting review</p>
      {pending.length===0
        ? <div style={{...S.card, textAlign:"center", padding:60}}><p style={{fontSize:28, marginBottom:12}}>✓</p><p style={S.muted}>All caught up.</p></div>
        : <div style={{display:"flex", flexDirection:"column", gap:14}}>
            {pending.map(s=>{
              const creator=db.users.find(u=>u.id===s.creatorId);
              const approved=getApproved(s.creatorId,db.submissions);
              return <ReviewCard key={s.id} sub={s} creator={creator} approved={approved} onApprove={()=>updateSub(s.id,{status:"Approved"})} onReject={reason=>updateSub(s.id,{status:"Rejected",rejectionReason:reason})} />;
            })}
          </div>
      }
    </div>
  );
}

function ReviewCard({ sub, creator, approved, onApprove, onReject }) {
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  return (
    <div style={S.card}>
      <div style={{...S.rowBetween, marginBottom:14, flexWrap:"wrap", gap:10}}>
        <div style={S.row}>
          <div style={{...S.avatar, width:34, height:34, fontSize:12}}>{creator?.avatar}</div>
          <div>
            <p style={{margin:0, fontWeight:600, fontSize:13}}>{creator?.name}</p>
            <p style={{...S.muted, margin:0, fontSize:11}}>Trial: {approved}/10</p>
          </div>
        </div>
        <span style={S.badge("Pending")}>Pending Review</span>
      </div>
      <div style={{display:"flex", gap:20, marginBottom:14, flexWrap:"wrap"}}>
        {[["Platform",sub.platform==="Instagram"?"📷 Instagram":"🎵 TikTok"],["Type",sub.type],["Date Posted",sub.datePosted],["Submitted",sub.submittedAt]].map(([k,v])=>(
          <div key={k}><p style={S.label}>{k}</p><p style={{margin:"4px 0 0", fontSize:13}}>{v}</p></div>
        ))}
      </div>
      <div style={{marginBottom:14}}>
        <p style={S.label}>Post URL</p>
        <a href={sub.url} target="_blank" rel="noopener noreferrer" style={{color:"#4a90d9", fontSize:13, wordBreak:"break-all"}}>{sub.url} →</a>
      </div>
      {sub.notes && <div style={{...S.cardSm, marginBottom:14}}><p style={S.label}>Creator Notes</p><p style={{margin:"4px 0 0", fontSize:13}}>{sub.notes}</p></div>}
      {!rejecting
        ? <div style={{display:"flex", gap:10}}><button style={S.btnSuccess} onClick={onApprove}>✓ Approve</button><button style={S.btnDanger} onClick={()=>setRejecting(true)}>✕ Reject</button><a href={sub.url} target="_blank" rel="noopener noreferrer" style={{...S.btnOutline, textDecoration:"none", display:"inline-flex", alignItems:"center"}}>View Post</a></div>
        : <div>
            <p style={{...S.labelMb, marginBottom:8}}>Rejection Reason</p>
            <input style={{...S.input, marginBottom:10}} placeholder="e.g. AYRA product was not clearly visible." value={reason} onChange={e=>setReason(e.target.value)} />
            <div style={{display:"flex", gap:8}}>
              <button style={S.btnDanger} onClick={()=>{onReject(reason||"Did not meet content guidelines.");setRejecting(false);}}>Confirm Reject</button>
              <button style={S.btnOutline} onClick={()=>setRejecting(false)}>Cancel</button>
            </div>
          </div>
      }
    </div>
  );
}

function AdminAnalytics({ db, creators }) {
  const [range, setRange] = useState("all");
  const approved = db.submissions.filter(s=>s.status==="Approved");
  const totalViews = approved.reduce((a,s)=>a+s.views,0);
  const totalLikes = approved.reduce((a,s)=>a+s.likes,0);
  const igPosts = approved.filter(s=>s.platform==="Instagram").length;
  const ttPosts = approved.filter(s=>s.platform==="TikTok").length;
  const avgEng = approved.length>0?((totalLikes/Math.max(totalViews,1))*100).toFixed(1):0;
  const completed = creators.filter(c=>c.status==="Trial Complete").length;
  const completionRate = creators.length>0?Math.round((completed/creators.length)*100):0;
  return (
    <div>
      <div style={{...S.rowBetween, marginBottom:28, flexWrap:"wrap", gap:14}}>
        <div><p style={{...S.labelMb, marginBottom:10}}>Analytics</p><h2 style={{...S.heading, fontSize:32, margin:0}}>Program Analytics</h2></div>
        <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
          {[{id:"7d",label:"7 Days"},{id:"30d",label:"30 Days"},{id:"90d",label:"90 Days"},{id:"all",label:"All Time"}].map(r=>(
            <button key={r.id} style={{...S.btnOutline, padding:"7px 14px", fontSize:11,...(range===r.id?{borderColor:"#7A2E2E",color:"#e8e6e1"}:{})}} onClick={()=>setRange(r.id)}>{r.label}</button>
          ))}
        </div>
      </div>
      <div style={{...S.grid4, marginBottom:22}}>
        {[
          {label:"Approved Posts",  value:approved.length},
          {label:"Instagram Posts", value:igPosts},
          {label:"TikTok Posts",    value:ttPosts},
          {label:"Total Views",     value:fmtNum(totalViews)},
          {label:"Total Likes",     value:fmtNum(totalLikes)},
          {label:"Avg Engagement",  value:avgEng+"%"},
          {label:"Trial Completion",value:completionRate+"%"},
          {label:"Total Orders",    value:db.shopifyOrders.length},
        ].map(s=>(
          <div key={s.label} style={S.statCard}>
            <p style={S.label}>{s.label}</p>
            <p style={{fontSize:20, fontWeight:700, margin:"6px 0 0", color:s.color||"#e8e6e1"}}>{s.value}</p>
          </div>
        ))}
      </div>
      <div style={{...S.grid2}}>
        <div style={S.card}>
          <p style={{...S.labelMb, marginBottom:14}}>Top Creators by Orders</p>
          {creators.map(c=>({...c,orders:getOrders(c.id,db.shopifyOrders).length})).sort((a,b)=>b.orders-a.orders).map((c,i)=>(
            <div key={c.id} style={{...S.rowBetween, marginBottom:10}}>
              <div style={S.row}>
                <span style={{...S.muted, fontSize:12, minWidth:14}}>{i+1}</span>
                <div style={{...S.avatar, width:28, height:28, fontSize:10}}>{c.avatar}</div>
                <span style={{fontSize:12}}>{c.name}</span>
              </div>
              <span style={{fontWeight:700, fontSize:13}}>{c.orders} orders</span>
            </div>
          ))}
        </div>
        <div style={S.card}>
          <p style={{...S.labelMb, marginBottom:14}}>Top Posts by Views</p>
          {[...db.submissions].filter(s=>s.status==="Approved").sort((a,b)=>b.views-a.views).slice(0,4).map((s,i)=>{
            const c=db.users.find(u=>u.id===s.creatorId);
            return (
              <div key={s.id} style={{...S.rowBetween, marginBottom:10}}>
                <div style={S.row}>
                  <span style={{...S.muted, fontSize:12, minWidth:14}}>{i+1}</span>
                  <span style={{fontSize:14}}>{s.platform==="Instagram"?"📷":"🎵"}</span>
                  <span style={{fontSize:12}}>{c?.name}</span>
                </div>
                <span style={{fontWeight:700, fontSize:13}}>{fmtNum(s.views)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ROOT
export default function App() {
  const [user, setUser] = useState(null);
  const [db, setDb] = useState(DB);
  return (
    <div>
      {!user && <Login onLogin={setUser} />}
      {user && user.role==="creator" && <CreatorPortal user={user} onLogout={()=>setUser(null)} db={db} setDb={setDb} />}
      {user && user.role==="admin"   && <AdminDashboard user={user} onLogout={()=>setUser(null)} db={db} setDb={setDb} />}
    </div>
  );
}
