export const categories = [
  { id: "all",      icon: "🪵", name: "All Products",  hindi: "सभी उत्पाद",      count: "20+ items", img: null },
  { id: "planks",   icon: "📏", name: "Planks",        hindi: "फंटे",             count: "8 items",   img: "/images/planks.jpg" },
  { id: "logs",     icon: "🌲", name: "Logs & Gutke",  hindi: "गुटके / लट्ठे",    count: "6 items",   img: "/images/logs.jpg" },
  { id: "boards",   icon: "📋", name: "Boards",        hindi: "तख्ते",            count: "5 items",   img: "/images/boards.jpg" },
  { id: "raw",      icon: "🌳", name: "Raw Timber",    hindi: "कच्ची लकड़ी",      count: "6 items",   img: "/images/rawtimber.jpg" },
];

export const products = [
  {
    id: 1, cat: "planks", img: "/images/planks.jpg", badge: "Best Seller",
    category: "Planks",
    name: "Natural Wood Plank",   hindi: "फंटा",
    spec1: "Size: 8ft × 4ft × 1inch", spec2: "Grade: A Quality",
    price: "₹850 / piece",
  },
  {
    id: 2, cat: "planks", img: "/images/planks.jpg", badge: null,
    category: "Planks",
    name: "Seasoned Plank",       hindi: "सूखा हुआ फंटा",
    spec1: "Size: 10ft × 1ft",        spec2: "Grade: B Quality",
    price: "₹620 / piece",
  },
  {
    id: 3, cat: "logs", img: "/images/logs.jpg", badge: "Popular",
    category: "Logs & Gutke",
    name: "Wood Log (Latta)",     hindi: "लट्ठा",
    spec1: "Length: 6–8 ft",          spec2: "Diameter: 4–6 inch",
    price: "₹320 / piece",
  },
  {
    id: 4, cat: "logs", img: "/images/logs.jpg", badge: "Bulk Deal",
    category: "Logs & Gutke",
    name: "Gutka Bundle",         hindi: "गुटके का बंडल",
    spec1: "Bundle of 20 pieces",     spec2: "Mixed sizes",
    price: "₹1,800 / bundle",
  },
  {
    id: 5, cat: "boards", img: "/images/boards.jpg", badge: "New",
    category: "Boards",
    name: "Long Wood Board",      hindi: "लंबा तख्ता",
    spec1: "Size: 12ft × 6inch",      spec2: "Smooth finish",
    price: "₹480 / piece",
  },
  {
    id: 6, cat: "boards", img: "/images/boards.jpg", badge: null,
    category: "Boards",
    name: "Wide Board",           hindi: "चौड़ा तख्ता",
    spec1: "Size: 8ft × 10inch",      spec2: "Natural grain",
    price: "₹550 / piece",
  },
  {
    id: 7, cat: "raw", img: "/images/rawtimber.jpg", badge: "Bulk Deal",
    category: "Raw Timber",
    name: "Raw Timber Pieces",    hindi: "कच्ची लकड़ी",
    spec1: "Mixed sizes",             spec2: "Freshly cut",
    price: "₹180 / kg",
  },
  {
    id: 8, cat: "raw", img: "/images/rawtimber.jpg", badge: null,
    category: "Raw Timber",
    name: "Firewood Bundle",      hindi: "जलाऊ लकड़ी",
    spec1: "Bundle of 50kg",          spec2: "Dry seasoned",
    price: "₹2,200 / bundle",
  },
];

export const whyCards = [
  { icon: "🏭", title: "Direct from Mill",      desc: "No middlemen — wholesale prices directly from our processing unit. Better quality at every step." },
  { icon: "🚚", title: "Pan-India Delivery",    desc: "We ship across all 28 states. Bulk orders get priority dispatch with dedicated support." },
  { icon: "✅", title: "Quality Certified",     desc: "All wood is graded and certified. Grade A, B, C clearly labeled so you always know what you're buying." },
  { icon: "📞", title: "One-to-One Support",    desc: "Dedicated support for every B2B client. Discuss custom sizes, bulk pricing, and delivery directly." },
  { icon: "💰", title: "Bulk Pricing",          desc: "Special rates for contractors, builders, and furniture manufacturers. More you buy, better your rate." },
  { icon: "🌿", title: "Sustainable Sourcing", desc: "All timber sourced from licensed forests. We comply with Forest Rights Act and responsible logging." },
];

export const states = [
  "Delhi","Maharashtra","Rajasthan","Gujarat","Uttar Pradesh",
  "Madhya Pradesh","Karnataka","Tamil Nadu","Punjab","Haryana",
  "Bihar","West Bengal","Telangana","Kerala","Odisha","Jharkhand",
  "Chhattisgarh","Assam","Himachal Pradesh","Uttarakhand",
];

export const productOptions = [
  "Planks (फंटे)",
  "Logs & Gutke (गुटके / लट्ठे)",
  "Boards (तख्ते)",
  "Raw Timber (कच्ची लकड़ी)",
  "Buy All Wood",
  "Other / Custom",
];
