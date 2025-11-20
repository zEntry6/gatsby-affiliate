/* ============ Gatsby Affiliate Showcase ============ */
/* --- Data contoh (silakan ganti dengan produk Anda) --- */
const products = [
  {
    id: "p1",
    name: "Dobujack Jacket Luca Black",
    merchant: "Dobujack",
    category: "Fashion",
    price: 175000,
    oldPrice: 540000,
    rating: 4.8,
    reviews: 11400,
    badge: "68% OFF",
    image: "Assets/DobujackLB.png",
    tags: ["Fashion", "Jacket"],
    affiliateBaseUrl: "https://vt.tokopedia.com/t/ZSH3s6GFewsWy-px2OL/"
  },
  {
    id: "p2",
    name: "Jeans Snow Black",
    merchant: "ARS DENIM",
    category: "Fashion",
    price: 79900,
    oldPrice: 81999,
    rating: 4.7,
    reviews: 10000,
    badge: "4% OFF",
    image: "Assets/JeansSB.jpeg",
    tags: ["Fashion", "Jeans"],
    affiliateBaseUrl: "https://vt.tokopedia.com/t/ZSH3sMqyRVBFQ-PSjK0/"
  },
  {
    id: "p3",
    name: "Boxy Crop T-Shirt",
    merchant: "mybasic.indonesia",
    category: "Fashion",
    price: 58000,
    oldPrice: 99000,
    rating: 4.8,
    reviews: 56500,
    badge: "41% OFF",
    image: "Assets/mybasic.webp",
    tags: ["Fashion", "T-Shirt"],
    affiliateBaseUrl: "https://vt.tokopedia.com/t/ZSH3sMnP8hnVe-il9eJ/"
  },
  {
    id: "p4",
    name: "VIBEST Skena T-Shirt",
    merchant: "Vibest Store",
    category: "Fashion",
    price: 30500,
    oldPrice: 150000,
    rating: 4.6,
    reviews: 717,
    badge: "80% OFF",
    image: "Assets/vibest.webp",
    tags: ["Fashion", "T-Shirt"],
    affiliateBaseUrl: "https://vt.tokopedia.com/t/ZSH3sMKfvfEke-AdgpU/"
  },
  {
    id: "p5",
    name: "Octarine - Bulgy Aqua",
    merchant: "Octarine Perfume Indonesia",
    category: "Fragrance",
    price: 24500,
    oldPrice: 27778,
    rating: 4.8,
    reviews: 1400,
    badge: "Hot",
    image: "Assets/octarineba.webp",
    tags: ["Fragrance", "Long-Lasting"],
    affiliateBaseUrl: "https://vt.tokopedia.com/t/ZSH3srdHokxFa-N5O2J/"
  },
  {
    id: "p6",
    name: "Perfume Mix Dnhl Blue x Scandalous",
    merchant: "HYROSE PARFUME",
    category: "Fragrance",
    price: 28750,
    oldPrice: 115000,
    rating: 4.7,
    reviews: 12700,
    badge: "75% OFF",
    image: "Assets/dnhlblue.jpeg",
    tags: ["Fragrance", "Long-Lasting"],
    affiliateBaseUrl: "https://vt.tokopedia.com/t/ZSH3sr2k1NKFr-luXht/"
  },
  {
    id: "p7",
    name: "Sombong 5-in-1 Face Wash",
    merchant: "Sombong Men's Care",
    category: "Personal Care",
    price: 39000,
    oldPrice: 76000,
    rating: 4.8,
    reviews: 104300,
    badge: "Over 49% off",
    image: "Assets/sombong.webp",
    tags: ["Face Wash"],
    affiliateBaseUrl: "https://vt.tokopedia.com/t/ZSH3srhMSy3yK-h9Mty/"
  },
  {
    id: "p8",
    name: "Cuddlenco Perfume LBD",
    merchant: "Cuddle & CO",
    category: "Fragrance",
    price: 99000,
    oldPrice: 135000,
    rating: 4.8,
    reviews: 30900,
    badge: "27% OFF",
    image: "Assets/lbd.webp",
    tags: ["Fragrance", "Long-Lasting"],
    affiliateBaseUrl: "https://vt.tokopedia.com/t/ZSH3srUU3Km1E-H2W4G/"
  },
];

/* --- State --- */
const state = {
  query: "",
  category: "All",
  sort: "featured",
  page: 1,
  pageSize: 8,
};

/* --- DOM --- */
const els = {
  chips:    document.querySelector(".chips"),
  grid:     document.getElementById("grid"),
  resultCount: document.getElementById("resultCount"),
  sort:     document.getElementById("sortSelect"),
  search:   document.getElementById("searchInput"),
  loadMore: document.getElementById("loadMore"),
  toast:    document.getElementById("toast"),
  year:     document.getElementById("year"),
  themeToggle: document.getElementById("themeToggle"),
  favCount: document.getElementById("favCount"),
  toTop: document.getElementById("toTop"),
  scrollTop: null,
  // Menu elements
  menuBtn: document.getElementById("menuBtn"),
  menuDialog: document.getElementById("menuDialog"),
  menuFavBadge: document.getElementById("menuFavBadge"),
  menuThemeToggle: document.getElementById("menuThemeToggle"),
  menuThemeLabel: document.getElementById("menuThemeLabel"),
};

/* --- Utils --- */
function loadJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function formatPrice(n) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
}
function formatCount(n) {
  if (n < 1000) return n.toLocaleString();
  const units = ["K", "M", "B", "T"];
  let u = -1;
  let num = n;
  while (num >= 1000 && u < units.length - 1) {
    num /= 1000;
    u++;
  }
  // 1 desimal hanya untuk angka <10 pada unit (mis. 1.2K, 9.5K); selebihnya bulatkan
  const digits = num < 10 && (Math.round(num * 10) / 10) !== Math.floor(num) ? 1 : 0;
  return `${num.toFixed(digits)}${units[u]}`;
}
function buildAffiliateUrl(baseUrl, productId) {
  // Tambahkan UTM tanpa duplikasi
  try {
    const u = new URL(baseUrl);
    u.searchParams.set("ref", "gatsby");
    u.searchParams.set("utm_source", "gatsby");
    u.searchParams.set("utm_medium", "affiliate");
    u.searchParams.set("utm_campaign", "site");
    u.searchParams.set("utm_content", productId);
    return u.toString();
  } catch {
    return baseUrl;
  }
}
function starString(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "☆" : "") + "✩".repeat(empty);
}
function showToast(msg) {
  els.toast.textContent = msg;
  els.toast.classList.add("show");
  setTimeout(() => els.toast.classList.remove("show"), 1600);
}
function debounce(fn, ms = 200) {
  let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}
function trackClick(productId) {
  const key = `gatsby:clicks:${productId}`;
  const n = Number(localStorage.getItem(key) || "0") + 1;
  localStorage.setItem(key, String(n));
}
function getClicks(productId) {
  return Number(localStorage.getItem(`gatsby:clicks:${productId}`) || "0");
}

/* --- Category chips --- */
function allCategories() {
  const s = new Set(products.map(p => p.category));
  return ["All", ...Array.from(s).sort()];
}
function renderChips() {
  els.chips.innerHTML = "";
  for (const cat of allCategories()) {
    const b = document.createElement("button");
    b.className = "chip";
    b.type = "button";
    b.role = "tab";
    b.dataset.cat = cat;
    b.setAttribute("aria-selected", String(cat === state.category));
    b.textContent = cat;
    b.addEventListener("click", () => {
      state.category = cat;
      state.page = 1;
      for (const el of els.chips.querySelectorAll(".chip")) {
        el.setAttribute("aria-selected", String(el === b));
      }
      refresh();
    });
    els.chips.appendChild(b);
  }
}

/* --- Filtering / Sorting / Pagination --- */
function filtered() {
  const q = state.query.trim().toLowerCase();
  return products.filter(p => {
    const matchesCat = state.category === "All" || p.category === state.category;
    const matchesQ = !q || [
      p.name, p.merchant, p.category, ...(p.tags || [])
    ].join(" ").toLowerCase().includes(q);
    return matchesCat && matchesQ;
  });
}
function merchantRanker(keyword) {
  const kw = keyword.toLowerCase();
  return (p) => {
    const m = (p.merchant || "").toLowerCase();
    const u = (p.affiliateBaseUrl || "").toLowerCase();
    // cek di merchant name dan di URL (lebih robust)
    const hit = m.includes(kw) || u.includes(kw);
    return hit ? 0 : 1;   // 0 = prioritas, 1 = sisanya
  };
}
function sorted(list) {
  const copy = [...list];
  const sort = state.sort;
  if (sort === "price-asc") copy.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") copy.sort((a, b) => b.price - a.price);
  else if (sort === "rating") copy.sort((a, b) => b.rating - a.rating);
  else if (sort === "merchant:vt") {
  const rank = merchantRanker("vt");
  copy.sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name));
}
else if (sort === "merchant:tokopedia") {
  const rank = merchantRanker("tokopedia");
  copy.sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name));
}
else if (sort === "merchant:shopee") {
  const rank = merchantRanker("shopee");
  copy.sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name));
}
  return copy; // featured = urutan asli
}
function paged(list) {
  const end = state.page * state.pageSize;
  return list.slice(0, end);
}

/* --- Render cards --- */
function renderList() {
  els.grid.innerHTML = "";
  const base = filtered();
  const ordered = sorted(base);
  const visible = paged(ordered);

  els.resultCount.textContent = `${base.length} result${base.length === 1 ? "" : "s"}`;
  els.loadMore.hidden = visible.length >= base.length || base.length === 0;

  if (visible.length === 0) {
    const empty = document.createElement("div");
    empty.className = "card";
    empty.style.padding = "1.2rem";
    empty.innerHTML = `<h3>No matches found</h3><p class="muted">Try different keywords or another category.</p>`;
    els.grid.appendChild(empty);
    return;
  }

  for (const p of visible) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.productId = p.id;
    card.innerHTML = `
      <span class="badge-corner">${p.badge ?? "Pick"}</span>
      <div class="media">
        <img class="thumb" src="${p.image}" alt="${p.name}" loading="lazy" decoding="async">
      </div>
      <div class="content">
        <h3>${p.name}</h3>
        <div class="merchant">${p.merchant} • <span class="rating"><span class="stars" aria-hidden="true">${starString(p.rating)}</span><span class="sr-only">${p.rating} out of 5</span> • ${formatCount(p.reviews)} reviews</span></div>
        <div class="meta">
          <div class="price">${formatPrice(p.price)} ${p.oldPrice ? `<span class="old">${formatPrice(p.oldPrice)}</span>` : ""}</div>
        </div>
        ${p.tags?.length ? `<div class="tags">${p.tags.map(t => `<button class="tag" data-tag="${t}" title="Filter by ${t}">${t}</button>`).join("")}</div>` : ""}
        <div class="cta">
          <a class="btn btn-primary view-btn" href="${buildAffiliateUrl(p.affiliateBaseUrl, p.id)}" target="_blank" rel="noopener sponsored" data-id="${p.id}">View details</a>
        </div>
      </div>
    `;

    // Events
    card.querySelector(".view-btn").addEventListener("click", e => {
      trackClick(p.id);
    });
    card.querySelectorAll(".tag").forEach(tagBtn => {
      tagBtn.addEventListener("click", () => {
        els.search.value = tagBtn.dataset.tag;
        state.query = tagBtn.dataset.tag;
        state.page = 1;
        refresh();
      });
    });

    els.grid.appendChild(card);
  }
}

/* --- SEO structured data --- */
function writeItemListSchema(list) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Gatsby Deal Picks",
    "numberOfItems": list.length,
    "itemListElement": list.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": buildAffiliateUrl(p.affiliateBaseUrl, p.id),
      "name": p.name
    }))
  };
  document.getElementById("gatsbySchema").textContent = JSON.stringify(schema);
}

/* --- Theme --- */
function loadTheme() {
  const t = localStorage.getItem("gatsby:theme");
  if (t === "light" || t === "dark") document.documentElement.dataset.theme = t;
  updateThemeToggle();
}
function toggleTheme() {
  const cur = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = cur;
  localStorage.setItem("gatsby:theme", cur);
  updateThemeToggle();
}
function updateMenuThemeLabel() {
  const isDark = document.documentElement.dataset.theme !== "light";
  if (els.menuThemeLabel) {
    els.menuThemeLabel.textContent = isDark ? "Switch to Light" : "Switch to Dark";
  }
}
function updateThemeToggle() {
  const isDark = document.documentElement.dataset.theme !== "light";
  els.themeToggle?.setAttribute("aria-pressed", String(isDark));
  updateMenuThemeLabel();
}

/* --- Refresh pipeline --- */
function refresh() {
  renderList();
  writeItemListSchema(sorted(filtered()));
}

/* --- Events / Init --- */
function init() {
  els.year.textContent = new Date().getFullYear();

  // Theme
  loadTheme();
  els.themeToggle?.addEventListener("click", toggleTheme);

  // Tombol Theme di header (mobile & desktop)
const themeBtn = document.getElementById("themeBtn");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    toggleTheme(); // fungsi ini sudah ada di proyek Anda
    // (opsional) ganti ikon sesuai tema terkini
    const icon = themeBtn.querySelector("iconify-icon");
    if (icon) {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      icon.setAttribute("icon", isDark ? "lucide:moon" : "lucide:sun");
    }
  });
}

  // Search
  els.search.addEventListener("input", debounce(e => {
    state.query = e.target.value;
    state.page = 1;
    refresh();
  }, 180));
  els.search.addEventListener("keydown", e => {
    if (e.key === "Enter") e.preventDefault();
  });

  // Sort
  els.sort.addEventListener("change", e => {
    state.sort = e.target.value;
    state.page = 1;
    refresh();
  });

  // Load more
  els.loadMore.addEventListener("click", () => {
    state.page += 1;
    refresh();
  });

  // Back to top + floating button
  const scrollBtn = document.createElement("button");
  scrollBtn.id = "scrollTop";
  scrollBtn.className = "scroll-top";
  scrollBtn.setAttribute("aria-label", "Scroll to top");
  scrollBtn.innerHTML = "↑";
  document.body.appendChild(scrollBtn);
  els.scrollTop = scrollBtn;

  function onScroll() {
    if (window.scrollY > 600) scrollBtn.classList.add("visible");
    else scrollBtn.classList.remove("visible");
  }
  window.addEventListener("scroll", onScroll);
  onScroll();

  scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  els.toTop.addEventListener("click", e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });

  // Build category chips and first render
  renderChips();
  refresh();

  // Accessibility: remove initial skeleton state
  const results = document.getElementById("results");
  results.setAttribute("aria-busy", "false");

  // Mobile hamburger menu
  if (els.menuBtn && els.menuDialog) {
    els.menuBtn.addEventListener("click", () => {
      els.menuBtn.setAttribute("aria-expanded", "true");
      els.menuDialog.showModal();
    });
  // Tutup jika klik backdrop (area gelap di luar panel)
  els.menuDialog.addEventListener("click", (e) => {
    if (e.target === els.menuDialog) els.menuDialog.close();
  });

    els.menuThemeToggle?.addEventListener("click", () => {
      toggleTheme();
    });
  }
}

document.addEventListener("DOMContentLoaded", init);
