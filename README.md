# SDCET Website — Project Notes

Front page (`index.html`) ka clean, split-up source. VS Code me kholo
aur seedha edit karo — koi build step nahi chahiye, plain HTML/CSS/JS hai.

## Folder structure

```
sdcet-website/
├── index.html        ← homepage (this is the only page built so far)
├── css/
│   └── style.css      ← saara styling, section-wise comments ke saath
├── js/
│   └── main.js         ← hero slideshow, mobile menu, tab-switcher, photo-fallback
├── images/
│   ├── README.md       ← exact filenames + where each photo goes
│   └── (your photos go here)
└── pages/               ← empty for now — future pages (about.html, why-us.html,
                            programs.html, placements.html, contact.html...) go here
```

## How to preview it

Sabse aasan: VS Code me **Live Server** extension install karo, phir
`index.html` pe right-click → "Open with Live Server". Seedha double-click
karke bhi browser me khul jayegi, bas kuch cheezein (jaise future me agar
fetch/JSON add kiya) local file se kaam nahi karengi — Live Server better hai.

## Adding your photos

`images/README.md` me exact filenames di hain jo `index.html` already
reference kar raha hai. Wahi naam rakh ke photo daal do, kaam ho jayega.
Jab tak photo nahi aati, us jagah ek clean "photo not found" placeholder
box dikhta rahega — page kabhi tootega nahi.

## What's built vs what's next

**Built:** Homepage — hero slideshow, notices ticker, program strip,
about section, admission CTA, stats row, placements panel, Life@SDCET
tabs (Academics/Campus), Why SDCET + accreditation row, final CTA,
full ABESIT-style footer.

**Next (not built yet):** individual pages for About, Why Us, Academics/
Courses, Placements, Campus Life, Notices, Contact — these will live in
`pages/` and link out from the navbar (currently the navbar just scrolls
to sections on the homepage with `#anchors`).

Continue this project in the same chat — just say which page/section to
build next (e.g. "About page bana do") and it'll be added the same way,
matching this exact design system (colors, fonts, components already in
`css/style.css` — reuse the same classes like `.section-head`, `.btn`,
`.stat-card`, `.why-card` etc. instead of inventing new ones, so every
page stays visually consistent).

## Design tokens (css/style.css `:root`)

- Navy (headings/nav): `--navy-900 #0f2c4f`
- Orange (CTAs/accents): `--orange-500 #f07f1c`
- Fonts: Zilla Slab (headings), Inter (body), IBM Plex Mono (numbers/stats)
# sd_college_website
