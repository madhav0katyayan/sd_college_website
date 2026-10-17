# Images folder — exact filenames the site expects

`index.html` already points to these filenames. Bas apni photo ka naam
same rakh ke isi folder me daal do — code me kuch badalna nahi padega.
Agar koi photo abhi tak nahi daali, us jagah page pe khud-ba-khud ek
clean placeholder box dikh jayega (page tootega nahi).

| Filename              | Kahan use ho raha hai                          | Suggested size |
|-----------------------|-------------------------------------------------|-----------------|
| `logo.png`            | Navbar + footer + accreditation row (SDCET mark) | square, 200×200 |
| `hero-1.png`          | Homepage hero slideshow — slide 1 (building)     | 1600×900        |
| `hero-2.png`          | Homepage hero slideshow — slide 2 (campus) — also reused in About section | 1600×900 |
| `hero-3.png`          | Homepage hero slideshow — slide 3 (students)     | 1600×900        |
| `campus-life.jpg`     | About section — small overlay photo              | 700×700 (square)|
| `classroom.jpg`       | Life@SDCET → Academics tab → Smart Classrooms    | 800×640         |
| `lab.jpg`             | Life@SDCET → Academics tab → Engineering Labs    | 800×640         |
| `library.jpg`         | Life@SDCET → Academics tab → Library             | 800×640         |
| `bosch-centre.jpg`    | Life@SDCET → Academics tab → Bosch Bridge Centre | 800×640         |
| `hostel.jpg`          | Life@SDCET → Campus tab → Hostel                 | 800×640         |
| `sports.jpg`          | Life@SDCET → Campus tab → Sports & Clubs         | 800×640         |
| `canteen.jpg`         | Life@SDCET → Campus tab → Canteen                | 800×640         |
| `medical.jpg`         | Life@SDCET → Campus tab → Medical Room           | 800×640         |
| `logo-aicte.png`      | Why SDCET → accreditation row                    | square, transparent PNG if possible |
| `logo-aktu.png`       | Why SDCET → accreditation row                    | square, transparent PNG if possible |
| `logo-nba.webp`       | Why SDCET → accreditation row                    | square, transparent PNG if possible |
| `recruiters/tcs.png`       | Recruiters band (below Placements)  | wide, transparent PNG, ~300×140 |
| `recruiters/accenture.png` | Recruiters band (below Placements)  | wide, transparent PNG, ~300×140 |
| `recruiters/hcl.png`       | Recruiters band (below Placements)  | wide, transparent PNG, ~300×140 |
| `recruiters/chetu.png`     | Recruiters band (below Placements)  | wide, transparent PNG, ~300×140 |
| `testimonials/sandhi-jain.webp`      | Placements → testimonial slider photo (left panel) | portrait, e.g. 800×1000 |
| `testimonials/shubhangi-garg.jpeg`   | Placements → testimonial slider photo (left panel) | portrait, e.g. 800×1000 |
| `testimonials/priyansh-singhal.jpg`  | Placements → testimonial slider photo (left panel) | portrait, e.g. 800×1000 |

The rest of the Recruiters band (Infosys, Cognizant, Wipro, Capgemini, DXC
Technology, L&T, OLA, Sopra Steria, Bajaj Auto, Mindtree, TSYS, Xceedance,
QSpiders, Orient Electric, Lumax Industries) is wired straight to each
company's own logo via the Clearbit Logo API (`logo.clearbit.com/<their
domain>`) — no local file needed for those; if a company ever removes/
changes their logo there, it'll just fall back to showing the plain
company name, page won't break.

Notes:
- **Filename case matters on a real server** (Linux hosting, GitHub
  Pages), even though Windows/VS Code Live Server ignores case. Keep
  everything lowercase exactly as in this table — e.g. save as
  `hero-2.png`, not `Hero-2.png`, even though it'll still preview fine
  locally either way.
- File extensions must match exactly what's in `index.html`. If your
  downloaded file is a different type (e.g. `.jpeg`, `.webp`, `.svg`),
  either rename it to match this table, or update the `src="images/..."`
  in `index.html` (Ctrl+F for the filename).
- Photos ko upload karne se pehle halka compress kar lena (tinypng.com
  jaisi site se) — page fast load hoga.
- Company logos usually download as a wide/rectangular PNG (transparent
  background) — that's exactly the shape `recruiters/*.png` expects,
  no cropping needed.
