import { useState, useRef, useEffect } from "react";

const GFONTS = `@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,500;0,600;1,400&display=swap');`;

const CSS = `
${GFONTS}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#F5F7FA; --surface:#FFFFFF; --surface2:#F0F4F8;
  --border:#E2E8F0; --border2:#CBD5E1;
  --mint:#10B981; --mint-light:#D1FAE5; --mint-mid:#34D399;
  --sky:#3B82F6; --sky-light:#DBEAFE;
  --peach:#F97316; --peach-light:#FFEDD5;
  --amber:#F59E0B; --amber-light:#FEF3C7;
  --purple:#8B5CF6; --purple-light:#EDE9FE;
  --text:#0F172A; --text2:#475569; --text3:#94A3B8;
  --red:#EF4444; --red-light:#FEE2E2;
  --shadow-sm:0 1px 3px rgba(0,0,0,.06);
  --shadow:0 4px 16px rgba(0,0,0,.08);
  --r:16px; --rsm:10px;
}
html{font-size:16px}
body{font-family:'Nunito',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;-webkit-font-smoothing:antialiased}
button{font-family:'Nunito',sans-serif;cursor:pointer;border:none;outline:none}
input,select,textarea{font-family:'Nunito',sans-serif;outline:none}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--border2);border-radius:99px}

.shell{display:flex;flex-direction:column;min-height:100vh}
.topbar{background:var(--surface);border-bottom:1px solid var(--border);padding:0 28px;height:62px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:200}
.brand{display:flex;align-items:center;gap:10px}
.brand-icon{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--mint),#059669);display:flex;align-items:center;justify-content:center;font-size:17px;box-shadow:0 2px 8px rgba(16,185,129,.3)}
.brand-name{font-family:'Lora',serif;font-size:19px;font-weight:600;color:var(--text)}
.brand-name span{color:var(--mint)}
.topbar-right{font-size:13px;font-weight:600;color:var(--text3)}
.prog-wrap{height:3px;background:var(--border)}
.prog-bar{height:3px;background:linear-gradient(90deg,var(--mint),var(--mint-mid));transition:width .5s ease;border-radius:0 2px 2px 0}

.page{flex:1;display:flex;align-items:flex-start;justify-content:center;padding:44px 16px 80px}
.card{background:var(--surface);border-radius:22px;border:1px solid var(--border);box-shadow:var(--shadow);width:100%;max-width:600px;padding:44px 48px;animation:fadeUp .38s ease both}
.card-lg{max-width:800px}.card-xl{max-width:980px}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}

/* Step bar */
.step-row{display:flex;align-items:center;margin-bottom:36px;overflow-x:auto;padding-bottom:4px}
.step-node{display:flex;flex-direction:column;align-items:center;gap:4px}
.sc{width:27px;height:27px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid var(--border2);color:var(--text3);background:var(--surface);transition:all .3s;flex-shrink:0}
.sc.done{background:var(--mint);border-color:var(--mint);color:#fff}
.sc.active{background:var(--sky);border-color:var(--sky);color:#fff;box-shadow:0 0 0 4px var(--sky-light)}
.slbl{font-size:9px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--text3);white-space:nowrap}
.slbl.on{color:var(--text2)}
.sline{width:28px;height:2px;background:var(--border);margin:0 2px;margin-bottom:13px;flex-shrink:0;transition:background .3s}
.sline.done{background:var(--mint)}

/* Typography */
.eyebrow{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--mint);margin-bottom:8px}
.ptitle{font-family:'Lora',serif;font-size:27px;font-weight:600;color:var(--text);line-height:1.25;margin-bottom:7px}
.psub{font-size:15px;color:var(--text2);line-height:1.6;margin-bottom:32px;font-weight:400}

/* Form */
.fg{margin-bottom:18px}
.fg label{display:block;font-size:13px;font-weight:700;color:var(--text2);margin-bottom:5px}
.fg label .opt{font-weight:500;color:var(--text3);margin-left:4px}
.inp{width:100%;padding:12px 15px;border:1.5px solid var(--border);border-radius:var(--rsm);background:var(--bg);color:var(--text);font-size:15px;font-weight:500;transition:border-color .2s,box-shadow .2s,background .2s}
.inp:focus{border-color:var(--sky);background:#fff;box-shadow:0 0 0 3px var(--sky-light)}
.inp.err{border-color:var(--red);background:var(--red-light)}
.sel{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394A3B8' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 13px center;padding-right:36px;appearance:none;cursor:pointer}
.errmsg{font-size:12px;color:var(--red);margin-top:4px;font-weight:600}
.r2{display:grid;grid-template-columns:1fr 1fr;gap:13px}
.r3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:13px}

/* Buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:13px 26px;border-radius:var(--rsm);font-size:15px;font-weight:700;transition:all .2s}
.btn-mint{background:var(--mint);color:#fff;width:100%}
.btn-mint:hover:not(:disabled){background:#059669;transform:translateY(-1px);box-shadow:0 6px 20px rgba(16,185,129,.3)}
.btn-mint:disabled{opacity:.5;cursor:not-allowed;transform:none}
.btn-sky{background:var(--sky);color:#fff;width:100%}
.btn-sky:hover:not(:disabled){background:#2563EB;transform:translateY(-1px);box-shadow:0 6px 20px rgba(59,130,246,.3)}
.btn-sky:disabled{opacity:.5;cursor:not-allowed}
.btn-ghost{background:transparent;border:1.5px solid var(--border2);color:var(--text2);width:100%;margin-top:9px}
.btn-ghost:hover{border-color:var(--text2);color:var(--text)}
.btn-sm{padding:8px 16px;font-size:13px;width:auto;border-radius:8px}

/* Chips */
.chips{display:flex;flex-wrap:wrap;gap:7px}
.chip{padding:8px 16px;border-radius:99px;border:1.5px solid var(--border);background:var(--surface);color:var(--text2);font-size:13px;font-weight:600;cursor:pointer;transition:all .18s}
.chip:hover{border-color:var(--mint);color:var(--mint)}
.chip.on{background:var(--mint-light);border-color:var(--mint);color:#065F46}

/* Goal grid */
.gg{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}
.gc{padding:16px 10px;border-radius:13px;border:1.5px solid var(--border);background:var(--surface);cursor:pointer;transition:all .2s;text-align:center}
.gc:hover{border-color:var(--mint);background:var(--mint-light)}
.gc.on{border-color:var(--mint);background:var(--mint-light);box-shadow:0 0 0 3px rgba(16,185,129,.12)}
.gc .gi{font-size:24px;margin-bottom:5px}
.gc .gn{font-size:12px;font-weight:800;color:var(--text);margin-bottom:2px}
.gc .gd{font-size:10px;color:var(--text3);line-height:1.3}
.gc.on .gn,.gc.on .gd{color:#065F46}

/* Exercise days selector */
.ex-days-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}
.ex-day-btn{padding:10px 4px;border-radius:10px;border:1.5px solid var(--border);background:var(--surface);font-size:11px;font-weight:700;color:var(--text3);cursor:pointer;transition:all .18s;text-align:center}
.ex-day-btn:hover{border-color:var(--mint);color:var(--mint)}
.ex-day-btn.on{background:var(--mint-light);border-color:var(--mint);color:#065F46}
.ex-day-btn .edn{font-size:9px;letter-spacing:.3px;text-transform:uppercase;display:block;margin-bottom:3px}
.ex-day-btn .edd{font-size:14px;font-weight:800;display:block}

/* OTP */
.otp-row{display:flex;gap:9px;justify-content:center;margin:24px 0}
.otp{width:50px;height:58px;text-align:center;font-size:22px;font-weight:800;border:1.5px solid var(--border);border-radius:11px;background:var(--bg);color:var(--text);transition:all .2s}
.otp:focus{border-color:var(--sky);background:#fff;box-shadow:0 0 0 3px var(--sky-light)}

/* File drop */
.fdrop{border:2px dashed var(--border2);border-radius:13px;padding:36px 20px;text-align:center;background:var(--bg);cursor:pointer;transition:all .2s;position:relative}
.fdrop:hover,.fdrop.drag{border-color:var(--mint);background:var(--mint-light)}
.fdrop input{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%}
.fok{display:flex;align-items:center;gap:11px;padding:13px 15px;background:var(--mint-light);border:1.5px solid var(--mint);border-radius:11px}
.fok-name{flex:1;font-size:14px;font-weight:700;color:#065F46;word-break:break-all}

/* Loading */
.lwrap{display:flex;flex-direction:column;align-items:center;gap:22px;padding:56px 28px}
.spin{width:58px;height:58px;border:3px solid var(--border);border-top-color:var(--mint);border-radius:50%;animation:spin .85s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.llist{list-style:none;width:100%;max-width:310px}
.li{display:flex;align-items:center;gap:9px;padding:8px 0;font-size:14px;color:var(--text3);border-bottom:1px solid var(--border)}
.li:last-child{border:none}
.li.done{color:var(--mint)}.li.cur{color:var(--text);font-weight:700}
.ldot{width:7px;height:7px;border-radius:50%;background:var(--border);flex-shrink:0}
.li.done .ldot{background:var(--mint)}
.li.cur .ldot{background:var(--sky);animation:pulse 1s ease infinite}
@keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.5}}

/* Result hero */
.rhero{background:linear-gradient(135deg,#064E3B 0%,#065F46 55%,#047857 100%);padding:40px 48px 36px;border-radius:20px 20px 0 0;position:relative;overflow:hidden}
.rhero::before{content:'';position:absolute;top:-70px;right:-50px;width:220px;height:220px;border-radius:50%;background:rgba(255,255,255,.04)}
.rhero::after{content:'';position:absolute;bottom:-50px;left:10px;width:160px;height:160px;border-radius:50%;background:rgba(16,185,129,.12)}
.rbody{padding:40px 48px}
.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:11px;margin-top:24px;position:relative;z-index:1}
.sb{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.14);border-radius:13px;padding:14px 10px;text-align:center}
.sv{font-family:'Lora',serif;font-size:21px;font-weight:600;color:#fff}
.sl2{font-size:10px;color:rgba(255,255,255,.55);margin-top:2px;font-weight:600;text-transform:uppercase;letter-spacing:.4px}

/* Tabs */
.tabs{display:flex;gap:4px;background:var(--surface2);padding:4px;border-radius:11px;margin-bottom:26px}
.tab{flex:1;padding:9px 4px;border:none;background:transparent;font-family:'Nunito',sans-serif;font-size:12px;font-weight:700;cursor:pointer;border-radius:8px;color:var(--text3);transition:all .2s;white-space:nowrap}
.tab.on{background:var(--surface);color:var(--text);box-shadow:var(--shadow-sm)}

/* Day navigator */
.day-nav{display:flex;align-items:center;justify-content:space-between;background:var(--surface2);border-radius:14px;padding:10px 14px;margin-bottom:22px;gap:10px}
.day-nav-days{display:flex;gap:3px;flex-wrap:nowrap;overflow-x:auto}
.day-btn{width:36px;height:44px;border-radius:9px;border:none;background:transparent;font-family:'Nunito',sans-serif;color:var(--text3);cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;flex-shrink:0}
.day-btn:hover{background:var(--surface);color:var(--text)}
.day-btn.on{background:var(--mint);color:#fff;box-shadow:0 2px 8px rgba(16,185,129,.3)}
.day-btn .dn{font-size:8px;font-weight:800;letter-spacing:.5px;text-transform:uppercase}
.day-btn .dd{font-size:14px;font-weight:800}
.day-info{text-align:right;flex-shrink:0}
.day-kcal-val{font-family:'Lora',serif;font-size:20px;font-weight:600;color:var(--text)}
.day-kcal-lbl{font-size:10px;color:var(--text3);font-weight:600;margin-top:1px}

/* Meals */
.meal-block{margin-bottom:18px}
.meal-tag{display:inline-flex;align-items:center;gap:5px;font-size:10px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:var(--mint);background:var(--mint-light);padding:4px 11px;border-radius:99px;margin-bottom:8px}
.meal-row{padding:10px 13px;background:var(--bg);border-radius:9px;margin-bottom:4px;border:1px solid transparent;transition:border-color .2s}
.meal-row:hover{border-color:var(--border)}
.meal-main{display:flex;align-items:center;gap:9px}
.mdot{width:6px;height:6px;border-radius:50%;background:var(--mint);flex-shrink:0}
.mname{flex:1;font-size:14px;font-weight:600;color:var(--text)}
.mcal{font-size:12px;color:var(--text3);font-weight:600;white-space:nowrap}

/* Protein badges */
.pbadge{display:inline-flex;align-items:center;gap:3px;font-size:10px;font-weight:700;padding:2px 7px;border-radius:99px;margin-right:4px}
.pb-red{background:#FEE2E2;color:#991B1B}
.pb-chicken{background:#FEF3C7;color:#92400E}
.pb-fish{background:#DBEAFE;color:#1E40AF}
.pb-veg{background:#D1FAE5;color:#065F46}

/* Meat alternatives note */
.meat-alt{margin-top:6px;padding:7px 10px 7px 28px;background:var(--surface2);border-radius:8px;font-size:11px;color:var(--text2);line-height:1.5;border-left:3px solid var(--amber)}
.meat-alt strong{color:var(--text);font-weight:800}

/* Full plan - accordion days */
.plan-day-block{border:1px solid var(--border);border-radius:14px;margin-bottom:10px;overflow:hidden}
.plan-day-header{display:flex;align-items:center;justify-content:space-between;padding:13px 18px;background:var(--surface);cursor:pointer;transition:background .2s}
.plan-day-header:hover{background:var(--surface2)}
.plan-day-header.open{background:var(--mint-light);border-bottom:1px solid var(--border)}
.plan-day-left{display:flex;align-items:center;gap:12px}
.plan-day-num{width:28px;height:28px;border-radius:50%;background:var(--mint);color:#fff;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.plan-day-num.rest{background:var(--surface2);color:var(--text3)}
.plan-day-name{font-size:14px;font-weight:800;color:var(--text)}
.plan-day-sub{font-size:11px;color:var(--text3);margin-top:1px}
.plan-day-right{display:flex;align-items:center;gap:8px}
.plan-day-kcal{font-size:13px;font-weight:700;color:var(--mint)}
.plan-day-chevron{font-size:12px;color:var(--text3);transition:transform .25s}
.plan-day-chevron.open{transform:rotate(180deg)}
.plan-day-body{padding:14px 18px;background:var(--bg);border-top:1px solid var(--border)}

/* Weekly exercise schedule */
.ex-week-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:24px}
.ex-week-card{border-radius:12px;padding:12px 6px;text-align:center;border:1px solid var(--border);background:var(--bg)}
.ex-week-card.rest{background:var(--surface2);border-color:var(--border)}
.ex-week-card.active{background:var(--mint-light);border-color:var(--mint)}
.ewc-day{font-size:9px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;color:var(--text3);margin-bottom:6px}
.ewc-icon{font-size:20px;margin-bottom:4px}
.ewc-label{font-size:10px;font-weight:700;color:var(--text2);line-height:1.3}
.ex-week-card.active .ewc-day{color:var(--mint)}
.ex-week-card.active .ewc-label{color:#065F46}
.ex-week-card.rest .ewc-label{color:var(--text3)}

/* Exercise list */
.ex-card{display:flex;align-items:center;gap:13px;padding:13px 15px;background:var(--bg);border-radius:11px;margin-bottom:7px;border:1px solid var(--border);transition:all .2s}
.ex-card:hover{border-color:var(--mint-mid);transform:translateX(3px)}
.ex-num{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--mint),#059669);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#fff;flex-shrink:0}
.ex-info{flex:1}
.ex-name{font-size:14px;font-weight:700;color:var(--text)}
.ex-det{font-size:12px;color:var(--text3);margin-top:2px}
.ex-badge{padding:3px 9px;border-radius:99px;background:var(--sky-light);color:var(--sky);font-size:11px;font-weight:700}

/* Macro bars */
.mbar-wrap{margin-bottom:24px}
.mr{display:flex;align-items:center;gap:11px;margin-bottom:9px}
.mlbl{width:96px;font-size:13px;font-weight:700;color:var(--text2)}
.mtrack{flex:1;height:7px;background:var(--surface2);border-radius:99px;overflow:hidden}
.mfill{height:100%;border-radius:99px;transition:width 1.2s cubic-bezier(.4,0,.2,1)}
.mval{width:46px;font-size:13px;font-weight:700;color:var(--text);text-align:right}

/* Diary */
.diary-summary{background:var(--surface2);border-radius:13px;padding:16px 18px;margin-bottom:20px}
.diary-summary-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.diary-summary-title{font-size:14px;font-weight:800;color:var(--text)}
.diary-kcal-badge{font-size:13px;font-weight:800;padding:4px 12px;border-radius:99px}
.dbar-row{display:flex;align-items:center;gap:10px;margin-bottom:7px}
.dbar-row:last-child{margin-bottom:0}
.dbar-lbl{width:90px;font-size:12px;font-weight:700;color:var(--text2)}
.dbar-track{flex:1;height:7px;background:var(--border);border-radius:99px;overflow:hidden}
.dbar-fill{height:100%;border-radius:99px;transition:width .8s ease}
.dbar-val{font-size:12px;font-weight:700;color:var(--text);min-width:44px;text-align:right}
.diary-input-row{display:flex;gap:8px;margin-bottom:10px}
.diary-inp{flex:1;padding:12px 15px;border:1.5px solid var(--border);border-radius:11px;background:var(--bg);color:var(--text);font-size:14px;font-weight:500;transition:all .2s}
.diary-inp:focus{border-color:var(--mint);background:#fff;box-shadow:0 0 0 3px var(--mint-light)}
.diary-inp:disabled{opacity:.6}
.diary-add{padding:12px 18px;border-radius:11px;background:var(--mint);color:#fff;font-size:14px;font-weight:700;border:none;cursor:pointer;transition:all .2s;white-space:nowrap}
.diary-add:hover:not(:disabled){background:#059669}
.diary-add:disabled{opacity:.5;cursor:not-allowed}
.entries{display:flex;flex-direction:column;gap:6px;max-height:320px;overflow-y:auto;padding-right:2px}
.entry{background:var(--bg);border:1px solid var(--border);border-radius:11px;padding:11px 14px;display:flex;align-items:flex-start;gap:10px;animation:fadeUp .25s ease}
.entry.analyzing{border-color:var(--amber);background:var(--amber-light)}
.entry.done{border-color:var(--mint-light)}
.entry-icon{font-size:16px;flex-shrink:0;margin-top:2px}
.entry-body{flex:1}
.entry-raw{font-size:13px;color:var(--text3);margin-bottom:2px;font-style:italic}
.entry-name{font-size:14px;font-weight:700;color:var(--text);margin-bottom:2px}
.entry-macros{font-size:12px;color:var(--text3)}
.entry-loading{font-size:12px;color:var(--amber);font-weight:700}
.entry-time{font-size:10px;color:var(--text3);white-space:nowrap;margin-top:2px}

/* Tips */
.tip{display:flex;align-items:flex-start;gap:11px;padding:13px 15px;background:var(--bg);border:1px solid var(--border);border-radius:11px;margin-bottom:7px}
.tip-icon{font-size:17px;flex-shrink:0;margin-top:1px}
.tip-text{font-size:14px;color:var(--text2);line-height:1.6;font-weight:500}

/* Callouts */
.callout{border-radius:11px;padding:13px 15px;font-size:13px;line-height:1.6;margin-bottom:18px}
.callout-sky{background:var(--sky-light);border:1px solid #BFDBFE;color:#1E40AF}
.callout-mint{background:var(--mint-light);border:1px solid #A7F3D0;color:#065F46}
.callout-amber{background:var(--amber-light);border:1px solid #FDE68A;color:#92400E}
.callout strong{font-weight:800}
.sec-head{font-family:'Lora',serif;font-size:17px;font-weight:600;color:var(--text);margin-bottom:13px;padding-bottom:9px;border-bottom:1px solid var(--border)}
.divider{height:1px;background:var(--border);margin:22px 0}
.link{color:var(--sky);font-weight:700;cursor:pointer;text-decoration:underline;text-underline-offset:2px;font-size:14px}
.bmi-pill{display:inline-flex;align-items:center;gap:7px;padding:7px 13px;border-radius:99px;font-size:13px;font-weight:700;margin-top:6px;margin-bottom:16px}
.hint{font-size:12px;color:var(--text3);margin-top:4px;line-height:1.5;margin-bottom:14px}
.empty-state{text-align:center;padding:36px 0;color:var(--text3);font-size:14px}
.empty-state div:first-child{font-size:36px;margin-bottom:10px}
.section-note{font-size:12px;color:var(--text3);font-style:italic;margin-bottom:16px}

@media(max-width:660px){
  .card{padding:28px 20px}
  .rhero{padding:28px 20px}.rbody{padding:24px 20px}
  .r2,.r3{grid-template-columns:1fr}
  .gg{grid-template-columns:1fr 1fr}
  .stat-row{grid-template-columns:1fr 1fr}
  .ex-week-grid{grid-template-columns:repeat(4,1fr)}
}
`;

/* ── Constants ─────────────────────────────────────────────── */
const STEPS = ["Kayıt","E-posta","Profil","Ölçüler","Hedefler","Kan Testi","Program"];
const SIDX  = {register:0,verify:1,profile:2,measures:3,goals:4,blood:5,loading:6,result:6};
const DAYS_TR = ["Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"];
const DAYS_SHORT = ["Pzt","Sal","Çar","Per","Cum","Cmt","Paz"];

/* ── Root ──────────────────────────────────────────────────── */
export default function App() {
  const [stage, setStage] = useState("register");
  const [data,  setData]  = useState({});
  const [program, setProg] = useState(null);
  const [tab,   setTab]   = useState("menu");
  const [selDay, setDay]  = useState(0);

  const merge = d => setData(p=>({...p,...d}));
  const go    = (s, d={}) => { merge(d); setStage(s); };
  const pct   = ((SIDX[stage]+1)/STEPS.length)*100;

  return (
    <>
      <style>{CSS}</style>
      <div className="shell">
        <nav className="topbar">
          <div className="brand">
            <div className="brand-icon">🌿</div>
            <span className="brand-name">Vita<span>Coach</span></span>
          </div>
          <span className="topbar-right">
            {stage!=="result"&&stage!=="loading"
              ?`Adım ${SIDX[stage]+1} / ${STEPS.length}`
              :"Programınız hazır 🎉"}
          </span>
        </nav>
        <div className="prog-wrap"><div className="prog-bar" style={{width:`${pct}%`}}/></div>
        <div className="page">
          {stage==="register" && <Register  onNext={d=>go("verify",d)}/>}
          {stage==="verify"   && <Verify    email={data.email} onNext={()=>go("profile")}/>}
          {stage==="profile"  && <Profile   onNext={d=>go("measures",d)}/>}
          {stage==="measures" && <Measures  onNext={d=>go("goals",d)}/>}
          {stage==="goals"    && <Goals     onNext={d=>go("blood",d)}/>}
          {stage==="blood"    && <Blood     onNext={d=>go("loading",d)}/>}
          {stage==="loading"  && <Loading   data={data} onDone={p=>{setProg(p);setStage("result");}}/>}
          {stage==="result"   && program &&
            <Result program={program} data={data} tab={tab} setTab={setTab} selDay={selDay} setSelDay={setDay}/>}
        </div>
      </div>
    </>
  );
}

/* ── Step bar ───────────────────────────────────────────────── */
function StepBar({cur}) {
  return (
    <div className="step-row">
      {STEPS.map((s,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center"}}>
          <div className="step-node">
            <div className={`sc ${i<cur?"done":i===cur?"active":""}`}>{i<cur?"✓":i+1}</div>
            <span className={`slbl ${i<=cur?"on":""}`}>{s}</span>
          </div>
          {i<STEPS.length-1 && <div className={`sline ${i<cur?"done":""}`}/>}
        </div>
      ))}
    </div>
  );
}

/* ── 1. Register ────────────────────────────────────────────── */
function Register({onNext}) {
  const [f,sf]=useState({name:"",email:"",pw:"",pw2:""});
  const [e,se]=useState({});const [busy,sb]=useState(false);
  const up=k=>ev=>sf({...f,[k]:ev.target.value});
  const submit=()=>{
    const err={};
    if(!f.name.trim())err.name="Ad Soyad zorunlu";
    if(!f.email.includes("@"))err.email="Geçerli e-posta girin";
    if(f.pw.length<8)err.pw="En az 8 karakter";
    if(f.pw!==f.pw2)err.pw2="Şifreler eşleşmiyor";
    if(Object.keys(err).length){se(err);return;}
    sb(true);setTimeout(()=>{sb(false);onNext({name:f.name,email:f.email});},900);
  };
  return (
    <div className="card">
      <StepBar cur={0}/>
      <div className="eyebrow">Adım 1</div>
      <h1 className="ptitle">Hesap Oluşturun</h1>
      <p className="psub">Kişisel sağlık yolculuğunuza başlamak için kayıt olun.</p>
      <div className="fg"><label>Ad Soyad</label><input className={`inp${e.name?" err":""}`} placeholder="Zeynep Yılmaz" value={f.name} onChange={up("name")}/>{e.name&&<div className="errmsg">{e.name}</div>}</div>
      <div className="fg"><label>E-posta</label><input className={`inp${e.email?" err":""}`} type="email" placeholder="zeynep@example.com" value={f.email} onChange={up("email")}/>{e.email&&<div className="errmsg">{e.email}</div>}</div>
      <div className="r2">
        <div className="fg"><label>Şifre</label><input className={`inp${e.pw?" err":""}`} type="password" placeholder="En az 8 karakter" value={f.pw} onChange={up("pw")}/>{e.pw&&<div className="errmsg">{e.pw}</div>}</div>
        <div className="fg"><label>Şifre Tekrar</label><input className={`inp${e.pw2?" err":""}`} type="password" placeholder="Tekrar girin" value={f.pw2} onChange={up("pw2")}/>{e.pw2&&<div className="errmsg">{e.pw2}</div>}</div>
      </div>
      <button className="btn btn-mint" disabled={busy} onClick={submit}>{busy?"Kayıt oluşturuluyor…":"Kayıt Ol ve Devam Et →"}</button>
    </div>
  );
}

/* ── 2. Verify ──────────────────────────────────────────────── */
function Verify({email,onNext}) {
  const [otp,so]=useState(["","","","","",""]);
  const [busy,sb]=useState(false);const [err,se]=useState("");const [sent,ss]=useState(false);
  const refs=useRef([]);
  const ch=(i,v)=>{if(!/^\d?$/.test(v))return;const n=[...otp];n[i]=v;so(n);if(v&&i<5)refs.current[i+1]?.focus();};
  const kd=(i,e)=>{if(e.key==="Backspace"&&!otp[i]&&i>0)refs.current[i-1]?.focus();};
  const verify=()=>{if(otp.join("").length<6){se("6 haneli kodu eksiksiz girin");return;}sb(true);setTimeout(()=>{sb(false);onNext();},1100);};
  return (
    <div className="card">
      <StepBar cur={1}/>
      <div className="eyebrow">Adım 2</div>
      <h1 className="ptitle">E-posta Doğrulama</h1>
      <p className="psub"><strong>{email}</strong> adresine 6 haneli kod gönderdik.</p>
      <div className="callout callout-sky">📧 Gerçek uygulamada Supabase Auth bu kodu otomatik gönderir. Geçerlilik süresi <strong>10 dakika</strong>.</div>
      <div className="otp-row">{otp.map((v,i)=><input key={i} className="otp" maxLength={1} value={v} inputMode="numeric" ref={el=>refs.current[i]=el} onChange={e=>ch(i,e.target.value)} onKeyDown={e=>kd(i,e)}/>)}</div>
      {err&&<div className="errmsg" style={{textAlign:"center",marginBottom:12}}>{err}</div>}
      <button className="btn btn-sky" disabled={busy} onClick={verify}>{busy?"Doğrulanıyor…":"Kodu Doğrula →"}</button>
      <div style={{textAlign:"center",marginTop:14}}><span style={{fontSize:13,color:"var(--text3)"}}>Kod gelmedi mi? </span><span className="link" onClick={()=>ss(true)}>{sent?"✓ Tekrar gönderildi":"Tekrar Gönder"}</span></div>
    </div>
  );
}

/* ── 3. Profile ─────────────────────────────────────────────── */
function Profile({onNext}) {
  const [f,sf]=useState({age:"",gender:"",job:"",steps:"",water:"",sleep:""});
  const up=k=>e=>sf({...f,[k]:e.target.value});
  const ok=f.age&&f.gender&&f.job&&f.steps&&f.water&&f.sleep;
  return (
    <div className="card">
      <StepBar cur={2}/>
      <div className="eyebrow">Adım 3</div>
      <h1 className="ptitle">Kişisel Profiliniz</h1>
      <p className="psub">Metabolizma hızınızı hesaplamak için temel bilgiler.</p>
      <div className="r2">
        <div className="fg"><label>Yaş</label><input className="inp" type="number" placeholder="28" value={f.age} onChange={up("age")} min={10} max={100}/></div>
        <div className="fg"><label>Cinsiyet</label><select className="inp sel" value={f.gender} onChange={up("gender")}><option value="">Seçin</option><option value="kadin">Kadın</option><option value="erkek">Erkek</option></select></div>
      </div>
      <div className="fg"><label>Meslek / Günlük Aktivite</label><select className="inp sel" value={f.job} onChange={up("job")}><option value="">Seçin</option><option value="masa">Masa Başı (ofis, uzaktan)</option><option value="ayakta">Ayakta / Hareketli İş</option><option value="agir">Ağır Fiziksel İş</option><option value="ogrenci">Öğrenci</option><option value="emekli">Emekli / Serbest</option></select></div>
      <div className="r2">
        <div className="fg"><label>Günlük Adım Sayısı</label><select className="inp sel" value={f.steps} onChange={up("steps")}><option value="">Seçin</option><option value="2000">0–2.000 adım</option><option value="5000">2.000–5.000 adım</option><option value="8000">5.000–8.000 adım</option><option value="10000">8.000–10.000 adım</option><option value="12000">10.000+ adım</option></select></div>
        <div className="fg"><label>Günlük Su Tüketimi</label><select className="inp sel" value={f.water} onChange={up("water")}><option value="">Seçin</option><option value="1">1 litreden az</option><option value="1.5">1–1.5 litre</option><option value="2">1.5–2 litre</option><option value="2.5">2–2.5 litre</option><option value="3">2.5 litre+</option></select></div>
      </div>
      <div className="fg"><label>Günlük Uyku Süresi</label><select className="inp sel" value={f.sleep} onChange={up("sleep")}><option value="">Seçin</option><option value="5">5 saatten az</option><option value="6">5–6 saat</option><option value="7">6–7 saat</option><option value="8">7–8 saat</option><option value="9">8 saat+</option></select></div>
      <button className="btn btn-mint" disabled={!ok} onClick={()=>onNext(f)}>Devam Et →</button>
    </div>
  );
}

/* ── 4. Measures ────────────────────────────────────────────── */
function Measures({onNext}) {
  const [f,sf]=useState({height:"",weight:"",target:"",chest:"",waist:"",hip:"",arm:""});
  const up=k=>e=>sf({...f,[k]:e.target.value});
  const bmi=f.height&&f.weight?+(f.weight/((f.height/100)**2)).toFixed(1):null;
  const bmiLabel=bmi==null?"":bmi<18.5?"Zayıf":bmi<25?"Normal ✓":bmi<30?"Fazla Kilolu":"Obez";
  const bmiColor=bmi==null?"":bmi<18.5?"var(--sky)":bmi<25?"var(--mint)":bmi<30?"var(--peach)":"var(--red)";
  return (
    <div className="card">
      <StepBar cur={3}/>
      <div className="eyebrow">Adım 4</div>
      <h1 className="ptitle">Vücut Ölçüleriniz</h1>
      <p className="psub">Sabah aç karnına, hafif kıyafetle ölçün.</p>
      <div className="r3">
        <div className="fg"><label>Boy (cm)</label><input className="inp" type="number" placeholder="165" value={f.height} onChange={up("height")}/></div>
        <div className="fg"><label>Kilo (kg)</label><input className="inp" type="number" placeholder="68" value={f.weight} onChange={up("weight")}/></div>
        <div className="fg"><label>Hedef Kilo (kg)</label><input className="inp" type="number" placeholder="58" value={f.target} onChange={up("target")}/></div>
      </div>
      {bmi&&<div className="bmi-pill" style={{background:`${bmiColor}18`,border:`1px solid ${bmiColor}40`,color:bmiColor}}>📊 VKİ: <strong>{bmi}</strong> — {bmiLabel}</div>}
      <p style={{fontSize:13,fontWeight:800,color:"var(--text2)",marginBottom:10}}>Çevre Ölçüleri <span style={{fontWeight:500,color:"var(--text3)"}}>(isteğe bağlı)</span></p>
      <div className="r2">
        <div className="fg"><label>Göğüs (cm)</label><input className="inp" type="number" placeholder="88" value={f.chest} onChange={up("chest")}/></div>
        <div className="fg"><label>Bel (cm)</label><input className="inp" type="number" placeholder="70" value={f.waist} onChange={up("waist")}/></div>
        <div className="fg"><label>Kalça (cm)</label><input className="inp" type="number" placeholder="96" value={f.hip} onChange={up("hip")}/></div>
        <div className="fg"><label>Kol (cm)</label><input className="inp" type="number" placeholder="28" value={f.arm} onChange={up("arm")}/></div>
      </div>
      <button className="btn btn-mint" disabled={!f.height||!f.weight||!f.target} onClick={()=>onNext(f)}>Devam Et →</button>
    </div>
  );
}

/* ── 5. Goals — now includes exercise days ─────────────────── */
function Goals({onNext}) {
  const [goal,sg]=useState("");
  const [dur,sd]=useState("");
  const [act,sa]=useState("");
  const [exDays,sEx]=useState([]);   // ← NEW: which days to exercise
  const [diet,sdi]=useState([]);
  const [alg,sal]=useState("");

  const goals=[
    {id:"zayiflama",icon:"🔥",name:"Yağ Yakma",desc:"Kalori açığı + kardio"},
    {id:"sikılasma",icon:"💪",name:"Sıkılaşma",desc:"Vücut kompozisyonu"},
    {id:"kas",icon:"🏋️",name:"Kas Kütlesi",desc:"Hipertrofi programı"},
    {id:"saglik",icon:"🌿",name:"Genel Sağlık",desc:"Dengeli beslenme"},
    {id:"dayaniklilik",icon:"🏃",name:"Dayanıklılık",desc:"Kardio + kondisyon"},
    {id:"performans",icon:"🎯",name:"Spor Performansı",desc:"Atletik hedef"},
  ];
  const dietOpts=["Vejetaryen","Vegan","Glutensiz","Laktozsuz","Ketojenik","Akdeniz","Kısıtlama yok"];
  const togDiet=d=>sdi(p=>p.includes(d)?p.filter(x=>x!==d):[...p,d]);
  const togDay=d=>sEx(p=>p.includes(d)?p.filter(x=>x!==d):[...p,d]);
  const ok=goal&&dur&&act&&exDays.length>0;

  return (
    <div className="card card-lg">
      <StepBar cur={4}/>
      <div className="eyebrow">Adım 5</div>
      <h1 className="ptitle">Hedef & Tercihler</h1>
      <p className="psub">Programınız tamamen bu bilgilere göre kişiselleştirilecek.</p>

      <div className="fg">
        <label>Ana Hedefiniz</label>
        <div className="gg">
          {goals.map(g=>(
            <button key={g.id} className={`gc ${goal===g.id?"on":""}`} onClick={()=>sg(g.id)}>
              <div className="gi">{g.icon}</div><div className="gn">{g.name}</div><div className="gd">{g.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="fg">
        <label>Program Süresi</label>
        <div className="chips">
          {["Haftalık","15 Günlük","Aylık"].map(d=>(
            <button key={d} className={`chip ${dur===d?"on":""}`} onClick={()=>sd(d)}>{d}</button>
          ))}
        </div>
      </div>

      <div className="fg">
        <label>Aktivite Düzeyi</label>
        <div className="chips">
          {["Sedanter","Hafif Aktif","Orta Aktif","Çok Aktif","Sporcu"].map(a=>(
            <button key={a} className={`chip ${act===a?"on":""}`} onClick={()=>sa(a)}>{a}</button>
          ))}
        </div>
      </div>

      {/* ── NEW: Exercise days ── */}
      <div className="fg">
        <label>Haftada hangi günler egzersiz yapacaksınız? <span className="opt">(birden fazla seçilebilir)</span></label>
        <div className="ex-days-grid">
          {DAYS_TR.map((d,i)=>(
            <button key={i} className={`ex-day-btn ${exDays.includes(i)?"on":""}`} onClick={()=>togDay(i)}>
              <span className="edn">{DAYS_SHORT[i]}</span>
              <span className="edd">{i===5||i===6?"😴":"💪"}</span>
            </button>
          ))}
        </div>
        {exDays.length>0&&(
          <div style={{marginTop:8,fontSize:12,color:"var(--mint)",fontWeight:700}}>
            ✓ Haftada {exDays.length} gün egzersiz — {exDays.map(i=>DAYS_SHORT[i]).join(", ")}
          </div>
        )}
      </div>

      <div className="fg">
        <label>Beslenme Tercihleri <span className="opt">(çoklu)</span></label>
        <div className="chips">
          {dietOpts.map(d=>(
            <button key={d} className={`chip ${diet.includes(d)?"on":""}`} onClick={()=>togDiet(d)}>{d}</button>
          ))}
        </div>
      </div>

      <div className="fg">
        <label>Alerji / Yemediğiniz Besinler <span className="opt">(isteğe bağlı)</span></label>
        <textarea className="inp" rows={3} placeholder="Örn: fıstık, kabuklu deniz ürünleri, süt…" value={alg} onChange={e=>sal(e.target.value)} style={{resize:"vertical"}}/>
      </div>

      <button className="btn btn-mint" disabled={!ok} onClick={()=>onNext({goal,duration:dur,activity:act,exDays,diet,allergy:alg})}>
        Devam Et →
      </button>
      {!ok&&exDays.length===0&&goal&&dur&&act&&(
        <p style={{textAlign:"center",fontSize:12,color:"var(--red)",marginTop:8}}>Lütfen egzersiz yapacağınız günleri seçin</p>
      )}
    </div>
  );
}

/* ── 6. Blood ───────────────────────────────────────────────── */
function Blood({onNext}) {
  const [file,sf]=useState(null);const [drag,sd]=useState(false);const [skip,ss]=useState(false);
  const pick=f=>{if(f?.type==="application/pdf")sf(f);};
  return (
    <div className="card">
      <StepBar cur={5}/>
      <div className="eyebrow">Adım 6</div>
      <h1 className="ptitle">Kan Testi Sonuçları</h1>
      <p className="psub">Kan değerleriniz programı çok daha hassas hale getirir.</p>
      <div className="callout callout-mint">🔬 <strong>Neden önemli?</strong> Demir, B12, D vitamini, tiroit ve kolesterol değerleri beslenme programını doğrudan etkiler.</div>
      {!file?(
        <div className={`fdrop ${drag?"drag":""}`} onDragOver={e=>{e.preventDefault();sd(true);}} onDragLeave={()=>sd(false)} onDrop={e=>{e.preventDefault();sd(false);pick(e.dataTransfer.files[0]);}}>
          <input type="file" accept=".pdf" onChange={e=>pick(e.target.files[0])}/>
          <div style={{fontSize:36,marginBottom:8}}>📄</div>
          <div style={{fontSize:15,fontWeight:700,color:"var(--text)",marginBottom:4}}>PDF'i buraya sürükleyin veya tıklayın</div>
          <div style={{fontSize:13,color:"var(--text3)"}}>Yalnızca PDF · Maks. 10 MB</div>
        </div>
      ):(
        <div className="fok"><span style={{fontSize:20}}>✅</span><span className="fok-name">{file.name}</span><button className="btn btn-ghost btn-sm" style={{margin:0}} onClick={()=>sf(null)}>Değiştir</button></div>
      )}
      <div style={{textAlign:"center",margin:"16px 0",fontSize:13,color:"var(--text3)"}}>— ya da —</div>
      <button className="btn btn-ghost" style={{marginTop:0}} onClick={()=>{ss(true);sf(null);}}>{skip?"✓ Kan testi olmadan devam edilecek":"Kan testi olmadan devam et"}</button>
      <button className="btn btn-mint" style={{marginTop:10}} disabled={!file&&!skip} onClick={()=>onNext({bloodFile:file,skipBlood:!file})}>Programı Oluştur 🚀</button>
    </div>
  );
}

/* ── 7. Loading ─────────────────────────────────────────────── */
function Loading({data,onDone}) {
  const steps=["Profil bilgileri analiz ediliyor…","Kan değerleri işleniyor…","Metabolizma hızı hesaplanıyor…","Makro besin değerleri belirleniyor…","Tüm plan oluşturuluyor…","Protein kaynakları çeşitlendiriliyor…","Egzersiz takvimi hazırlanıyor…","Program kişiselleştiriliyor…"];
  const [cur,sc]=useState(0);
  useEffect(()=>{
    let i=0;
    const t=setInterval(()=>{i++;sc(i);if(i>=steps.length){clearInterval(t);callAI();}},750);
    return()=>clearInterval(t);
  },[]);
  const callAI=async()=>{
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:buildPrompt(data)}]})});
      const d=await res.json();
      const txt=d.content?.map(b=>b.text||"").join("")||"";
      onDone(JSON.parse(txt.replace(/```json|```/g,"").trim()));
    }catch{onDone(mockProgram(data));}
  };
  return (
    <div className="card">
      <div className="lwrap">
        <div className="spin"/>
        <div style={{textAlign:"center"}}>
          <h2 style={{fontFamily:"'Lora',serif",color:"var(--text)",fontSize:21,marginBottom:5}}>Programınız Hazırlanıyor</h2>
          <p style={{fontSize:14,color:"var(--text3)"}}>Yapay zeka verilerinizi analiz ediyor…</p>
        </div>
        <ul className="llist">
          {steps.map((s,i)=><li key={i} className={`li ${i<cur?"done":i===cur?"cur":""}`}><div className="ldot"/>{i<cur?`✓ ${s}`:s}</li>)}
        </ul>
      </div>
    </div>
  );
}

/* ── Helpers ────────────────────────────────────────────────── */
function proteinType(name) {
  const n=name.toLowerCase();
  if(n.includes("biftek")||n.includes("dana")||n.includes("kuzu")||n.includes("kıyma")||n.includes("köfte"))return "red";
  if(n.includes("tavuk")||n.includes("piliç"))return "chicken";
  if(n.includes("somon")||n.includes("levrek")||n.includes("hamsi")||n.includes("uskumru")||n.includes("sardalya")||n.includes("çipura")||n.includes("balık"))return "fish";
  if(n.includes("yumurta")||n.includes("mercimek")||n.includes("nohut")||n.includes("fasulye")||n.includes("lor")||n.includes("yoğurt")||n.includes("peynir"))return "veg";
  return null;
}

function ProteinBadge({name}) {
  const t=proteinType(name);
  if(!t)return null;
  const map={red:["pb-red","🥩 Kırmızı Et"],chicken:["pb-chicken","🍗 Tavuk"],fish:["pb-fish","🐟 Balık"],veg:["pb-veg","🌱 Bitkisel"]};
  const [cls,label]=map[t];
  return <span className={`pbadge ${cls}`}>{label}</span>;
}

// Returns alternative protein suggestions for a meal
function getMeatAlts(meals) {
  const all=[...meals.ogle||[],...meals.aksam||[]];
  const types=new Set(all.map(m=>proteinType(m.name)).filter(Boolean));
  if(types.size===0)return null;
  const alts=[];
  if(!types.has("red")) alts.push("🥩 kırmızı et (dana biftek, kuzu şiş, köfte)");
  if(!types.has("chicken")) alts.push("🍗 tavuk (göğüs, but, sote)");
  if(!types.has("fish")) alts.push("🐟 balık (somon, levrek, hamsi, uskumru)");
  return alts.length>0 ? alts : null;
}

/* ── Prompt ─────────────────────────────────────────────────── */
function buildPrompt(d) {
  const duration=d.duration||"Haftalık";
  const numDays=duration==="Aylık"?30:duration==="15 Günlük"?15:7;
  const exDayNames=(d.exDays||[0,2,4]).map(i=>DAYS_TR[i%7]);
  return `Sen uzman bir diyetisyen ve kişisel antrenörsün. Aşağıdaki kişi için ${duration} (${numDays} günlük) program oluştur.

KİŞİ: Cinsiyet:${d.gender||"?"}, Yaş:${d.age||"?"}, Boy:${d.height||165}cm, Kilo:${d.weight||65}kg, Hedef:${d.target||60}kg
Hedef:${d.goal||"zayıflama"} | Aktivite:${d.activity||"hafif aktif"}
Egzersiz günleri: ${exDayNames.join(", ")}
Beslenme:${d.diet?.join(",")||"kısıtlama yok"} | Alerji:${d.allergy||"yok"}

KURALLAR:
1. ${numDays} günün tümü için plan yap - her gün farklı yemekler
2. Protein kaynakları dönüşümlü: kırmızı et (dana/kuzu), tavuk (göğüs/but), balık (somon/levrek/hamsi/uskumru/sardalya)
3. Her öğle ve akşam öğününde et türü belirt (örn: "Izgara tavuk göğsü")
4. Egzersiz günlerinde (${exDayNames.join(", ")}) egzersiz planı, diğer günler "Dinlenme" olsun
5. Türk mutfağına uygun gerçekçi yemekler

YALNIZCA geçerli JSON döndür:
{"dailyCalories":1650,"protein":120,"carbs":180,"fat":55,"weeklyGoal":"Haftada 0.5 kg","summary":"Özet.","days":[{"day":"Pazartesi","kcal":1640,"isExerciseDay":true,"meals":{"kahvalti":[{"name":"Menemen (2 yumurta)","cal":280,"protein":14}],"ogle":[{"name":"Izgara tavuk göğsü (150g)","cal":230,"protein":30}],"aksam":[{"name":"Fırın somon (130g)","cal":250,"protein":28}],"ara":[{"name":"Elma + badem","cal":150,"protein":2}]},"exercises":[{"name":"Squat","sets":"3","reps":"15 tekrar","type":"Alt Vücut"},{"name":"Push-up","sets":"3","reps":"12 tekrar","type":"Üst Vücut"}]}],"tips":["İpucu 1","İpucu 2"]}`;
}

/* ── Mock data ──────────────────────────────────────────────── */
function mockProgram(data) {
  const duration=data.duration||"Haftalık";
  const numDays=duration==="Aylık"?30:duration==="15 Günlük"?15:7;
  const exDaysSet=new Set(data.exDays||[0,2,4]);

  const mealTemplates=[
    {kahvalti:[{name:"Menemen (2 yumurta, domates, biber)",cal:280,protein:14},{name:"Tam buğday ekmek 1 dilim",cal:80,protein:3}],ogle:[{name:"Izgara tavuk göğsü (150g)",cal:230,protein:30},{name:"Bulgur pilavı",cal:220,protein:6},{name:"Mevsim salatası",cal:60,protein:2}],aksam:[{name:"Fırın somon (130g)",cal:250,protein:28},{name:"Zeytinyağlı ıspanak",cal:90,protein:3},{name:"Yoğurt (150g)",cal:90,protein:8}],ara:[{name:"Elma (1 orta)",cal:80,protein:0},{name:"Badem (10 adet)",cal:70,protein:2}]},
    {kahvalti:[{name:"Yulaf (50g) + muz + yoğurt",cal:300,protein:10},{name:"Haşlanmış yumurta",cal:70,protein:6}],ogle:[{name:"Mercimek çorbası",cal:180,protein:9},{name:"Izgara köfte (100g dana kıyma)",cal:220,protein:22},{name:"Çoban salatası",cal:80,protein:2}],aksam:[{name:"Fırın levrek (150g)",cal:180,protein:32},{name:"Haşlanmış brokoli + havuç",cal:70,protein:3},{name:"Zeytinyağı 1 kaşık",cal:90,protein:0}],ara:[{name:"Lor peyniri (80g)",cal:80,protein:12},{name:"Salatalık",cal:20,protein:1}]},
    {kahvalti:[{name:"Tam buğday ekmek + beyaz peynir + domates",cal:280,protein:12},{name:"Haşlanmış yumurta",cal:70,protein:6}],ogle:[{name:"Tavuk sote — but (150g, zeytinyağlı sebzeli)",cal:250,protein:32},{name:"Esmer pirinç (4 kaşık)",cal:160,protein:3},{name:"Yoğurt (100g)",cal:60,protein:5}],aksam:[{name:"Kuzu şiş (120g)",cal:280,protein:26},{name:"Közlenmiş sebze (patlıcan, biber)",cal:80,protein:2},{name:"Cacık",cal:70,protein:4}],ara:[{name:"Portakal",cal:70,protein:1},{name:"Ceviz (3 adet)",cal:90,protein:2}]},
    {kahvalti:[{name:"Yumurtalı ıspanak (2 yumurta, zeytinyağlı)",cal:200,protein:16},{name:"Tam buğday ekmek 1 dilim",cal:80,protein:3}],ogle:[{name:"Nohutlu tavuk yahnisi (150g tavuk göğsü)",cal:320,protein:30},{name:"Bulgur (küçük porsiyon)",cal:160,protein:4},{name:"Yeşillik",cal:40,protein:2}],aksam:[{name:"Hamsi fırın (200g)",cal:220,protein:30},{name:"Mısır ekmeği 1 dilim",cal:80,protein:2},{name:"Zeytinyağlı salata",cal:80,protein:2}],ara:[{name:"Kefir (1 bardak)",cal:100,protein:6},{name:"Muz (küçük)",cal:80,protein:1}]},
    {kahvalti:[{name:"Yulaf + elma + tarçın + yoğurt",cal:320,protein:12},{name:"Ceviz (3 adet)",cal:90,protein:2}],ogle:[{name:"Mercimek köfte (5-6 adet)",cal:220,protein:12},{name:"Tam buğday ekmek",cal:80,protein:3},{name:"Bol yeşillik + limon",cal:40,protein:2}],aksam:[{name:"Dana biftek (120g)",cal:260,protein:28},{name:"Fırın sebze (kabak, havuç, biber)",cal:80,protein:2},{name:"Yoğurt (100g)",cal:60,protein:5}],ara:[{name:"Elma",cal:80,protein:0},{name:"Lor peyniri (60g)",cal:60,protein:9}]},
    {kahvalti:[{name:"Serpme: beyaz peynir, zeytin, domates, 2 yumurta",cal:400,protein:20},{name:"Tam buğday ekmek 2 dilim",cal:160,protein:6}],ogle:[{name:"Izgara tavuk göğsü (150g)",cal:230,protein:32},{name:"Zeytinyağlı nohut salatası",cal:200,protein:9},{name:"Yoğurt",cal:60,protein:5}],aksam:[{name:"Uskumru fırın (1 adet ~150g)",cal:250,protein:26},{name:"Zeytinyağlı taze fasulye",cal:100,protein:3},{name:"Cacık",cal:70,protein:4}],ara:[{name:"Yoğurt + yarım muz",cal:130,protein:7},{name:"Çilek (1 avuç)",cal:40,protein:1}]},
    {kahvalti:[{name:"Menemen (2 yumurta + sebze)",cal:250,protein:14},{name:"Tam buğday ekmek + beyaz peynir",cal:140,protein:8}],ogle:[{name:"Zeytinyağlı kuru fasulye (1 kase)",cal:280,protein:14},{name:"Bulgur pilavı",cal:160,protein:4},{name:"Turşu + salata",cal:40,protein:1}],aksam:[{name:"Tavuk çorbası (1 kase)",cal:150,protein:12},{name:"Izgara sardalya (3-4 adet)",cal:160,protein:20},{name:"Zeytinyağlı ıspanak",cal:80,protein:3}],ara:[{name:"Karışık kuruyemiş (1 avuç)",cal:120,protein:4},{name:"Yeşil elma",cal:70,protein:0}]},
  ];

  const exLibrary=[
    {name:"Tempolu Yürüyüş / Hafif Koşu",sets:"-",reps:"30 dk",type:"Kardio"},
    {name:"Squat",sets:"3",reps:"15 tekrar",type:"Alt Vücut"},
    {name:"Push-up",sets:"3",reps:"12 tekrar",type:"Üst Vücut"},
    {name:"Plank",sets:"3",reps:"45 saniye",type:"Core"},
    {name:"Reverse Lunge",sets:"3",reps:"12 tekrar",type:"Alt Vücut"},
    {name:"Dumbbell Row",sets:"3",reps:"12 tekrar",type:"Sırt"},
    {name:"Bisiklet Crunch",sets:"3",reps:"20 tekrar",type:"Core"},
    {name:"Hip Bridge",sets:"3",reps:"15 tekrar",type:"Alt Vücut"},
    {name:"Lateral Raise",sets:"3",reps:"12 tekrar",type:"Omuz"},
    {name:"Tricep Dip",sets:"3",reps:"12 tekrar",type:"Üst Vücut"},
  ];

  const kcals=[1640,1660,1650,1640,1680,1700,1620];

  const days=Array.from({length:numDays},(_, i)=>({
    day: DAYS_TR[i%7],
    kcal: kcals[i%7],
    isExerciseDay: exDaysSet.has(i%7),
    meals: mealTemplates[i%mealTemplates.length],
    exercises: exDaysSet.has(i%7) ? exLibrary.slice(0,5) : [],
  }));

  return {
    dailyCalories:1650, protein:120, carbs:180, fat:55,
    weeklyGoal:"Haftada 0.5 kg yağ yakımı",
    summary:`${data.name||"Kullanıcı"} için ${duration.toLowerCase()} kişisel program hazırlandı. Protein kaynakları kırmızı et, tavuk ve balık olarak çeşitlendirildi. Seçtiğiniz ${exDaysSet.size} egzersiz günüyle programa uygun takvim oluşturuldu.`,
    days,
    tips:[
      "Sabah kalktığınızda 2 bardak ılık su için — metabolizmayı uyandırır",
      "Yemekten 20 dk önce 1 büyük bardak su için — tokluk hissi artar",
      "Gece 20:00'den sonra katı gıda tüketmeyin",
      "Her öğünde tabağınızın yarısını sebze doldurun",
      "Protein alımını günün her öğününe dengeli dağıtın",
    ],
  };
}

/* ── Food diary AI ──────────────────────────────────────────── */
async function analyzeFood(text) {
  try{
    const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:200,messages:[{role:"user",content:`Kullanıcı şunu yedi/içti: "${text}"\nKalori ve makro değerlerini hesapla. YALNIZCA JSON döndür:\n{"cal":150,"protein":5,"carbs":20,"fat":4,"desc":"Kısa standart isim"}`}]})});
    const d=await res.json();
    const txt=d.content?.map(b=>b.text||"").join("")||"";
    return JSON.parse(txt.replace(/```json|```/g,"").trim());
  }catch{
    const t=text.toLowerCase();
    if(t.includes("latte"))return{cal:120,protein:4,carbs:12,fat:5,desc:"Orta boy latte"};
    if(t.includes("çikolata"))return{cal:100,protein:1,carbs:12,fat:6,desc:"2 kare sütlü çikolata"};
    if(t.includes("çorba"))return{cal:180,protein:8,carbs:22,fat:5,desc:text};
    return{cal:200,protein:6,carbs:25,fat:8,desc:text};
  }
}

/* ── Result ─────────────────────────────────────────────────── */
function Result({program,data,tab,setTab,selDay,setSelDay}) {
  const total=program.protein*4+program.carbs*4+program.fat*9;
  const pp=Math.round(program.protein*4/total*100);
  const cp=Math.round(program.carbs*4/total*100);
  const fp=Math.round(program.fat*9/total*100);
  return (
    <div className="card card-xl" style={{padding:0,overflow:"hidden"}}>
      <div className="rhero">
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:11,fontWeight:800,letterSpacing:1.5,textTransform:"uppercase",color:"#6EE7B7",marginBottom:7}}>Programınız Hazır ✨</div>
          <h1 style={{fontFamily:"'Lora',serif",color:"#fff",fontSize:24,marginBottom:7,fontWeight:600,lineHeight:1.2}}>
            {data.name||"Kullanıcı"}'nın {data.duration||"Haftalık"} Programı
          </h1>
          <p style={{color:"rgba(255,255,255,.72)",fontSize:14,lineHeight:1.65,maxWidth:500}}>{program.summary}</p>
          <div className="stat-row">
            {[{v:program.dailyCalories,l:"Ort. Kalori"},{v:`${program.protein}g`,l:"Protein"},{v:`${program.carbs}g`,l:"Karbonhidrat"},{v:`${program.fat}g`,l:"Yağ"}].map((s,i)=>(
              <div key={i} className="sb"><div className="sv">{s.v}</div><div className="sl2">{s.l}</div></div>
            ))}
          </div>
        </div>
      </div>
      <div className="rbody">
        <div className="tabs">
          {[["menu","📅 Günlük Menü"],["plan","📋 Tam Plan"],["gunluk","📝 Yemek Günlüğü"],["egzersiz","🏋️ Egzersiz"],["tavsiyeler","💡 Tavsiyeler"]].map(([k,l])=>(
            <button key={k} className={`tab ${tab===k?"on":""}`} onClick={()=>setTab(k)}>{l}</button>
          ))}
        </div>
        {tab==="menu"       && <MenuTab      program={program} selDay={selDay} setSelDay={setSelDay} pp={pp} cp={cp} fp={fp}/>}
        {tab==="plan"       && <FullPlanTab  program={program}/>}
        {tab==="gunluk"     && <DiaryTab     program={program} selDay={selDay}/>}
        {tab==="egzersiz"   && <ExerciseTab  program={program} data={data}/>}
        {tab==="tavsiyeler" && <TipsTab      program={program}/>}
      </div>
    </div>
  );
}

/* ── Shared meal renderer ───────────────────────────────────── */
function MealSection({meals,compact=false}) {
  const sections=[
    {k:"kahvalti",icon:"🌅",lbl:"KAHVALTI"},
    {k:"ogle",icon:"☀️",lbl:"ÖĞLE"},
    {k:"aksam",icon:"🌙",lbl:"AKŞAM"},
    {k:"ara",icon:"🍎",lbl:"ARA ÖĞÜN"},
  ];
  // Find which meals have protein in ogle/aksam
  const alts=getMeatAlts(meals||{});

  return (
    <>
      {sections.map(({k,icon,lbl})=>(
        <div key={k} className="meal-block">
          <div className="meal-tag"><span>{icon}</span>{lbl}</div>
          {(meals?.[k]||[]).map((item,i)=>(
            <div key={i} className="meal-row">
              <div className="meal-main">
                <div className="mdot"/>
                <span className="mname">{item.name}</span>
                <ProteinBadge name={item.name}/>
                {!compact&&<span className="mcal">{item.cal} kcal · {item.protein}g protein</span>}
                {compact&&<span className="mcal">{item.cal} kcal</span>}
              </div>
            </div>
          ))}
          {/* Meat alternatives note for ogle and aksam */}
          {(k==="ogle"||k==="aksam")&&alts&&alts.length>0&&!compact&&(
            <div className="meat-alt">
              💡 <strong>Alternatif:</strong> Bu öğünde menüdeki eti yerine {alts.join(" veya ")} de kullanabilirsiniz.
            </div>
          )}
        </div>
      ))}
    </>
  );
}

/* ── Menu Tab (single day view) ─────────────────────────────── */
function MenuTab({program,selDay,setSelDay,pp,cp,fp}) {
  const today=program.days[selDay]||program.days[0];
  const showDays=program.days.slice(0,7); // show at most 7 day buttons

  return (
    <>
      <div className="day-nav">
        <div className="day-nav-days">
          {showDays.map((d,i)=>(
            <button key={i} className={`day-btn ${selDay===i?"on":""}`} onClick={()=>setSelDay(i)}>
              <span className="dn">{DAYS_SHORT[i%7]}</span>
              <span className="dd">{i+1}</span>
            </button>
          ))}
          {program.days.length>7&&(
            <div style={{display:"flex",alignItems:"center",paddingLeft:6,fontSize:12,color:"var(--text3)",fontWeight:700}}>
              +{program.days.length-7} gün
            </div>
          )}
        </div>
        <div className="day-info">
          <div className="day-kcal-val">{today.kcal} kcal</div>
          <div className="day-kcal-lbl">{today.day} {today.isExerciseDay?"💪":"😴"}</div>
        </div>
      </div>

      <div className="mbar-wrap">
        {[{l:"Protein",pct:pp,color:"#10B981",v:`${program.protein}g`},{l:"Karbonhidrat",pct:cp,color:"#3B82F6",v:`${program.carbs}g`},{l:"Yağ",pct:fp,color:"#F97316",v:`${program.fat}g`}].map(m=>(
          <div key={m.l} className="mr"><span className="mlbl">{m.l}</span><div className="mtrack"><div className="mfill" style={{width:`${m.pct}%`,background:m.color}}/></div><span className="mval">{m.v}</span></div>
        ))}
      </div>

      <h3 className="sec-head">{today.day} — Öğün Planı</h3>
      <MealSection meals={today.meals}/>
    </>
  );
}

/* ── Full Plan Tab (accordion) ──────────────────────────────── */
function FullPlanTab({program}) {
  const [openDay,setOpenDay]=useState(0);
  return (
    <>
      <div className="callout callout-sky">
        📋 <strong>Tam program:</strong> {program.days.length} günlük planın tamamı aşağıda. Her güne tıklayarak detayları görün.
      </div>
      {program.days.map((d,i)=>(
        <div key={i} className="plan-day-block">
          <div
            className={`plan-day-header ${openDay===i?"open":""}`}
            onClick={()=>setOpenDay(openDay===i?-1:i)}
          >
            <div className="plan-day-left">
              <div className={`plan-day-num ${!d.isExerciseDay?"rest":""}`}>
                {d.isExerciseDay?"💪":"😴"}
              </div>
              <div>
                <div className="plan-day-name">Gün {i+1} — {d.day}</div>
                <div className="plan-day-sub">
                  {d.isExerciseDay?"Egzersiz günü":"Dinlenme günü"}
                  {d.exercises?.length>0&&` · ${d.exercises.length} egzersiz`}
                </div>
              </div>
            </div>
            <div className="plan-day-right">
              <span className="plan-day-kcal">{d.kcal} kcal</span>
              <span className={`plan-day-chevron ${openDay===i?"open":""}`}>▼</span>
            </div>
          </div>
          {openDay===i&&(
            <div className="plan-day-body">
              <MealSection meals={d.meals} compact={false}/>
              {d.isExerciseDay&&d.exercises?.length>0&&(
                <>
                  <div style={{height:1,background:"var(--border)",margin:"16px 0"}}/>
                  <div style={{fontSize:11,fontWeight:800,letterSpacing:1,textTransform:"uppercase",color:"var(--mint)",marginBottom:10}}>💪 Bugünün Egzersizleri</div>
                  {d.exercises.map((ex,j)=>(
                    <div key={j} className="ex-card">
                      <div className="ex-num">{j+1}</div>
                      <div className="ex-info"><div className="ex-name">{ex.name}</div><div className="ex-det">{ex.sets!=="-"?`${ex.sets} set × `:""}{ex.reps}</div></div>
                      <span className="ex-badge">{ex.type}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
}

/* ── Exercise Tab ───────────────────────────────────────────── */
function ExerciseTab({program,data}) {
  const [selWeek,setSelWeek]=useState(0);
  const exDaysSet=new Set((data.exDays||[0,2,4]).map(d=>d%7));

  // Build week view (first 7 days or week by selWeek)
  const weekStart=selWeek*7;
  const weekDays=program.days.slice(weekStart,weekStart+7);
  const totalWeeks=Math.ceil(program.days.length/7);

  // Collect all unique exercises across exercise days
  const allExercises=[];
  const seen=new Set();
  program.days.filter(d=>d.isExerciseDay&&d.exercises?.length>0).forEach(d=>{
    d.exercises.forEach(ex=>{if(!seen.has(ex.name)){seen.add(ex.name);allExercises.push(ex);}});
  });

  return (
    <>
      <div className="callout callout-mint">
        🗓️ <strong>{program.weeklyGoal}</strong> · Haftada {exDaysSet.size} gün egzersiz
      </div>

      {/* Week selector if more than 1 week */}
      {totalWeeks>1&&(
        <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
          {Array.from({length:totalWeeks},(_,i)=>(
            <button key={i} className={`chip ${selWeek===i?"on":""}`} onClick={()=>setSelWeek(i)}>
              Hafta {i+1}
            </button>
          ))}
        </div>
      )}

      {/* Weekly schedule grid */}
      <h3 className="sec-head">
        {totalWeeks>1?`Hafta ${selWeek+1} — `:""} Haftalık Egzersiz Takvimi
      </h3>
      <div className="ex-week-grid">
        {weekDays.map((d,i)=>(
          <div key={i} className={`ex-week-card ${d.isExerciseDay?"active":"rest"}`}>
            <div className="ewc-day">{DAYS_SHORT[i%7]}</div>
            <div className="ewc-icon">{d.isExerciseDay?"💪":"😴"}</div>
            <div className="ewc-label">{d.isExerciseDay?"Egzersiz":"Dinlenme"}</div>
          </div>
        ))}
        {/* Fill remaining slots if week is incomplete */}
        {Array.from({length:7-weekDays.length},(_,i)=>(
          <div key={`empty-${i}`} className="ex-week-card rest" style={{opacity:.4}}>
            <div className="ewc-day">—</div><div className="ewc-icon">·</div><div className="ewc-label">—</div>
          </div>
        ))}
      </div>

      {/* Exercise list */}
      <h3 className="sec-head">Egzersiz Listesi</h3>
      <p className="section-note">Egzersiz günlerinizde aşağıdaki hareketleri uygulayın. Seti bitirince 60-90 saniye dinlenin.</p>
      {allExercises.map((ex,i)=>(
        <div key={i} className="ex-card">
          <div className="ex-num">{i+1}</div>
          <div className="ex-info">
            <div className="ex-name">{ex.name}</div>
            <div className="ex-det">{ex.sets!=="-"?`${ex.sets} set × `:""}{ex.reps}</div>
          </div>
          <span className="ex-badge">{ex.type}</span>
        </div>
      ))}
    </>
  );
}

/* ── Diary Tab ──────────────────────────────────────────────── */
function DiaryTab({program,selDay}) {
  const [entries,setEntries]=useState([]);
  const [input,setInput]=useState("");
  const [busy,setBusy]=useState(false);
  const dayKcal=program.days[selDay]?.kcal||program.dailyCalories;
  const totals=entries.filter(e=>e.result).reduce((a,e)=>({cal:a.cal+(e.result.cal||0),protein:a.protein+(e.result.protein||0),carbs:a.carbs+(e.result.carbs||0),fat:a.fat+(e.result.fat||0)}),{cal:0,protein:0,carbs:0,fat:0});
  const calOver=totals.cal>dayKcal;

  const add=async()=>{
    if(!input.trim()||busy)return;
    const text=input.trim();setInput("");
    const id=Date.now();
    const time=new Date().toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"});
    setEntries(p=>[{id,text,time,result:null},...p]);
    setBusy(true);
    const result=await analyzeFood(text);
    setEntries(p=>p.map(e=>e.id===id?{...e,result}:e));
    setBusy(false);
  };
  const onKey=e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();add();}};

  return (
    <>
      <div className="callout callout-sky">
        📝 <strong>Yemek günlüğü:</strong> Gün içinde ne yediyseniz doğal dille yazın. <em>"1 orta boy latte içtim"</em>, <em>"2 kare sütlü çikolata yedim"</em>, <em>"1 kase mercimek çorbası içtim"</em> gibi. AI kalori ve makrolarını otomatik hesaplar.
      </div>
      <div className="diary-summary">
        <div className="diary-summary-top">
          <span className="diary-summary-title">Bugünkü Tüketim</span>
          <span className="diary-kcal-badge" style={{background:calOver?"var(--red-light)":"var(--mint-light)",color:calOver?"var(--red)":"var(--mint)"}}>
            {totals.cal} / {dayKcal} kcal {calOver?"⚠️ Aşıldı":""}
          </span>
        </div>
        {[{l:"Kalori",v:totals.cal,max:dayKcal,color:calOver?"#EF4444":"#10B981",unit:"kcal"},{l:"Protein",v:totals.protein,max:program.protein,color:"#3B82F6",unit:"g"},{l:"Karbonhidrat",v:totals.carbs,max:program.carbs,color:"#F59E0B",unit:"g"},{l:"Yağ",v:totals.fat,max:program.fat,color:"#F97316",unit:"g"}].map(m=>(
          <div key={m.l} className="dbar-row">
            <span className="dbar-lbl">{m.l}</span>
            <div className="dbar-track"><div className="dbar-fill" style={{width:`${Math.min(100,(m.v/m.max)*100)}%`,background:m.color}}/></div>
            <span className="dbar-val">{m.v}{m.unit}</span>
          </div>
        ))}
      </div>
      <div className="diary-input-row">
        <input className="diary-inp" placeholder='"1 orta boy latte içtim" veya "2 kare sütlü çikolata yedim"' value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKey} disabled={busy}/>
        <button className="diary-add" disabled={!input.trim()||busy} onClick={add}>{busy?"⏳":"+ Ekle"}</button>
      </div>
      <p className="hint">↵ Enter ile ekleyebilirsiniz · Yapay zeka otomatik analiz eder</p>
      {entries.length===0?(
        <div className="empty-state"><div>🍽️</div>Henüz kayıt yok — bugün yediklerinizi buraya yazın</div>
      ):(
        <div className="entries">
          {entries.map(e=>(
            <div key={e.id} className={`entry ${e.result?"done":"analyzing"}`}>
              <span className="entry-icon">{e.result?"✅":"⏳"}</span>
              <div className="entry-body">
                <div className="entry-raw">"{e.text}"</div>
                {e.result&&<div className="entry-name">{e.result.desc}</div>}
                {e.result&&<div className="entry-macros">🔥 {e.result.cal} kcal · 🥩 {e.result.protein}g protein · 🌾 {e.result.carbs}g karb · 🫒 {e.result.fat}g yağ</div>}
                {!e.result&&<div className="entry-loading">Analiz ediliyor…</div>}
              </div>
              <span className="entry-time">{e.time}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ── Tips Tab ───────────────────────────────────────────────── */
function TipsTab({program}) {
  return (
    <>
      <h3 className="sec-head">Uzman Tavsiyeleri</h3>
      {(program.tips||[]).map((t,i)=>(
        <div key={i} className="tip"><span className="tip-icon">💡</span><span className="tip-text">{t}</span></div>
      ))}
      <div className="divider"/>
      <div className="callout callout-amber">⚠️ <strong>Hatırlatma:</strong> Bu program genel öneriler içermektedir. Sağlık sorunlarınız varsa bir doktor veya diyetisyene danışmanız önerilir.</div>
    </>
  );
}
