:root{
  --bg:#0f172a;         /* azul noite */
  --bg-alt:#0b1228;
  --card:#111827;
  --text:#e5e7eb;
  --muted:#94a3b8;
  --brand:#38bdf8;      /* azul claro */
  --brand-2:#22d3ee;    /* ciano */
  --danger:#ef4444;
  --success:#22c55e;
  --radius:14px;
  --shadow:0 10px 30px rgba(0,0,0,.25);
}

*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{
  font-family:Poppins, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  background:linear-gradient(180deg,var(--bg),#0a0f24 55%, var(--bg-alt));
  color:var(--text);
}

/* container */
.container{width:min(1100px,92%); margin:auto}

/* nav */
.nav{position:sticky; top:0; z-index:50; backdrop-filter:saturate(160%) blur(8px); background:rgba(10,15,36,.6); border-bottom:1px solid rgba(255,255,255,.06)}
.nav__wrap{display:flex; align-items:center; justify-content:space-between; padding:.8rem 0}
.logo{font-weight:700; font-size:1.25rem; color:#fff; text-decoration:none}
.logo span{color:var(--brand-2)}
.menu a{color:var(--text); text-decoration:none; margin-left:1rem}
.menu a:hover{color:#fff}

/* hero */
.hero{padding:72px 0 34px; background:radial-gradient(1200px 400px at 50% -40%, rgba(56,189,248,.18), transparent 60%)}
.hero__wrap{text-align:center}
.hero h1{font-size:clamp(2rem,4vw,3rem); margin:0 0 .2rem}
.hero h1 span{color:var(--brand)}
.hero p{color:var(--muted); margin:.2rem 0 1.2rem}

/* search */
.search{display:grid; grid-template-columns:repeat(5,1fr); gap:.6rem; background:rgba(255,255,255,.04); padding:.8rem; border:1px solid rgba(255,255,255,.06); border-radius:var(--radius); box-shadow:var(--shadow)}
.search input,.search select{width:100%; padding:.7rem .8rem; border-radius:10px; border:1px solid rgba(255,255,255,.08); background:#0e152e; color:var(--text)}
.search button{border:0; border-radius:10px; padding:.7rem .8rem; cursor:pointer}
.search button[type="submit"]{background:linear-gradient(90deg,var(--brand),var(--brand-2)); color:#00111a; font-weight:700}
.search #limpar{background:#1f2937; color:#e5e7eb}
@media (max-width:860px){.search{grid-template-columns:1fr 1fr;}}
@media (max-width:520px){.search{grid-template-columns:1fr;}}

/* sections */
.section{padding:40px 0}
.section.alt{background:linear-gradient(180deg,transparent, rgba(255,255,255,.02))}
.section h2{margin:0 0 16px}

/* grid & cards */
.grid{display:grid; grid-template-columns:repeat(3,1fr); gap:16px}
@media (max-width:980px){.grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:620px){.grid{grid-template-columns:1fr}}

.card{
  background:linear-gradient(180deg,#0d142e,#0a1129);
  border:1px solid rgba(255,255,255,.06);
  border-radius:16px;
  overflow:hidden;
  box-shadow:var(--shadow);
}
.card__img{position:relative; aspect-ratio:16/10; overflow:hidden}
.card__img img{width:100%; height:100%; object-fit:cover; display:block; filter:saturate(105%) contrast(102%)}
.badge{
  position:absolute; top:10px; left:10px;
  background:linear-gradient(90deg,var(--brand),var(--brand-2));
  color:#00111a; padding:.35rem .55rem; border-radius:999px; font-weight:700; font-size:.8rem
}
.card__body{padding:12px 14px 14px}
.card__title{margin:0 0 2px; font-size:1.05rem}
.card__meta{color:var(--muted); font-size:.9rem; margin-bottom:8px}
.card__price{font-weight:700; margin-bottom:10px}
.card__actions{display:flex; gap:8px}
.btn, .card__actions a{
  display:inline-block; text-decoration:none; border-radius:10px; padding:.55rem .75rem; font-weight:600
}
.card__actions a:first-child{background:#1f2937; color:#e5e7eb}
.card__actions a:last-child{background:linear-gradient(90deg,var(--brand),var(--brand-2)); color:#00111a}

/* call-to-action */
.cta{padding:52px 0}
.cta__wrap{background:linear-gradient(180deg,#0f1836,#0a122e); border:1px solid rgba(255,255,255,.08); border-radius:18px; padding:28px; text-align:center; box-shadow:var(--shadow)}
.cta .btn{background:linear-gradient(90deg,var(--brand),var(--brand-2)); color:#00111a}

/* form */
.form{display:flex; flex-direction:column; gap:12px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.06); padding:16px; border-radius:14px}
.form__row{display:flex; gap:12px}
.form input, .form textarea{width:100%; padding:.7rem .8rem; border-radius:10px; border:1px solid rgba(255,255,255,.12); background:#0e152e; color:var(--text)}
.form .btn{align-self:flex-start}

/* footer */
.footer{border-top:1px solid rgba(255,255,255,.06); padding:18px 0; background:rgba(0,0,0,.2)}
.footer__wrap{display:flex; align-items:center; justify-content:space-between}
.footer a{color:var(--muted); text-decoration:none}
.footer a:hover{color:#fff}
