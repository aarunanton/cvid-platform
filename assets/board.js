/* Universal CV ID — jobs board and company tools (v41)
   Candidate side: Jobs (browse, filter, company page, apply with your CV ID profile).
   Company side: Post a job (pay required), Applicants (ranked, with reasons), Company profile.
   Demo: sample companies, jobs and applicants are made up. What you post or apply to is kept in this browser only. */
(function () {
  'use strict';
  const COUNTIES = ['Carlow', 'Cavan', 'Clare', 'Cork', 'Donegal', 'Dublin', 'Galway', 'Kerry', 'Kildare', 'Kilkenny', 'Laois', 'Leitrim', 'Limerick', 'Longford', 'Louth', 'Mayo', 'Meath', 'Monaghan', 'Offaly', 'Roscommon', 'Sligo', 'Tipperary', 'Waterford', 'Westmeath', 'Wexford', 'Wicklow'];
  const SECTORS = ['Engineering', 'Healthcare', 'Construction', 'Finance', 'Tech', 'Hospitality', 'Other'];
  const WORK = ['On-site', 'Hybrid', 'Remote'];
  const STAGES = ['Applied', 'Reviewing', 'Interview', 'Offer', 'Hired', 'Not a fit'];

  window.UCVBoard = function (ctx) {
    const esc = ctx.esc;
    const cap = (s, n) => String(s == null ? '' : s).slice(0, n);
    const bs = () => { const s = ctx.store(); const b = s.board = s.board || {}; if (!b.company || typeof b.company !== 'object') b.company = { name: '', sector: 'Other', county: 'Dublin', size: '', about: '' }; if (!Array.isArray(b.posted)) b.posted = []; ['applied', 'stage'].forEach(k => { if (!b[k] || typeof b[k] !== 'object' || Array.isArray(b[k])) b[k] = {}; }); return b; };
    const B = { q: '', county: 'All', sector: 'All', work: 'All', open: '', co: '', form: { questions: [''] }, err: '', pjob: '', jtab: 'active', editing: '', apply: false, ans: {}, note: '', sample: false };
    const pay = j => '€' + Math.round(j.min / 1000) + 'k – €' + Math.round(j.max / 1000) + 'k';
    const sel = (name, opts, cur, all) => `<select data-pg="b-${name}">${(all ? ['All'] : []).concat(opts).map(o => `<option value="${esc(o)}" ${o === cur ? 'selected' : ''}>${o === 'All' ? 'All ' + ({ county: 'counties', sector: 'sectors', work: 'work styles' })[name] : esc(o)}</option>`).join('')}</select>`;

    function myCompany() { const c = bs().company; return Object.assign({ id: 'mine', sample: false }, c, { name: c.name || 'Your company' }); }
    function companyOf(j) { return j.co === 'mine' ? myCompany() : Object.assign({ sample: true }, (window.UCV_COMPANIES || []).find(c => c.id === j.co) || { name: 'Company', sector: j.sector, county: j.county, about: '' }); }
    const jobs = () => bs().posted.filter(j => !j.draft).concat(window.UCV_JOBS || []);
    const jobBy = id => jobs().find(j => j.id === id);

    // how much of a job's skill list shows up in my CV
    function myText() { const cv = ctx.cv(); return [cv.basics.label, cv.basics.summary].concat(cv.skills || [], (cv.work || []).map(w => w.position + ' ' + (w.highlights || []).join(' ')), (cv.certificates || []).map(c => c.name)).join(' ').toLowerCase(); }
    const allSk = j => musts(j).concat(nice(j));
    const fitMine = j => { const t = myText(); const sk = allSk(j); const has = sk.filter(s => t.indexOf(s.toLowerCase()) !== -1); return { has, miss: sk.filter(s => has.indexOf(s) === -1) }; };

    // ---------- candidate side: Jobs ----------
    function jobsPage() {
      if (B.co) return companyPage(B.co);
      if (B.open) { const j = jobBy(B.open); if (j) return jobDetail(j); B.open = ''; }
      const q = B.q.toLowerCase().trim(), s = ctx.store();
      const list = jobs().filter(j => (B.county === 'All' || j.county === B.county) && (B.sector === 'All' || j.sector === B.sector) && (B.work === 'All' || j.work === B.work) && (!q || (j.title + ' ' + companyOf(j).name + ' ' + j.skills.join(' ') + ' ' + j.county).toLowerCase().indexOf(q) !== -1));
      const pf = (s.prefs || {}).roles;
      return `
        <header class="pg-head"><div><h1>Jobs</h1><p class="pg-sub">Every job shows its pay. Apply with your CV ID profile in one step.</p></div>
          <div class="pg-actions"><button class="btn" data-tab="find">Search other boards</button></div></header>
        <div class="hr-demo"><b>Demo</b><span>These jobs and companies are made up. Jobs posted from the company side appear here too, on this device only.</span></div>
        <div class="bd-filters">
          <label class="field bd-q"><span class="sr-only">Search jobs</span><input type="search" data-pg="b-q" value="${esc(B.q)}" placeholder="${pf ? 'Try: ' + esc(String(pf).split(/[,;\n]/)[0].trim()) : 'Search by job, company or skill'}"></label>
          <label class="field"><span class="sr-only">County</span>${sel('county', COUNTIES, B.county, 1)}</label>
          <label class="field"><span class="sr-only">Sector</span>${sel('sector', SECTORS, B.sector, 1)}</label>
          <label class="field"><span class="sr-only">Work style</span>${sel('work', WORK, B.work, 1)}</label>
        </div>
        <p class="hint hr-count">${list.length} ${list.length === 1 ? 'job' : 'jobs'}</p>
        ${list.length ? `<div class="bd-list">${list.map(jobCard).join('')}</div>` : '<p class="empty">No jobs match. Try clearing a filter.</p>'}`;
    }
    function jobCard(j) {
      const c = companyOf(j), applied = bs().applied[j.id];
      return `<button type="button" class="bd-job" data-action="pg-b-open" data-id="${esc(j.id)}"><span class="hr-av" aria-hidden="true">${esc((c.name || '?')[0])}</span>
        <span class="hr-main"><b>${esc(j.title)}</b>${c.sample ? '<em class="hr-tag">Sample</em>' : '<em class="hr-tag link">Yours</em>'}<i>${esc(c.name)} · ${esc(j.county)} · ${esc(j.work)}</i>
        <span class="hr-meta"><span class="hr-b ok">${esc(pay(j))}</span><span class="hr-st">${esc(j.type)}</span>${applied ? '<span class="hr-b part">Applied</span>' : ''}</span></span></button>`;
    }
    function jobDetail(j) {
      const c = companyOf(j), b = bs(), applied = b.applied[j.id], f = fitMine(j), s = ctx.store();
      const name = s.master.basics.name;
      return `
        <button class="btn btn-sm btn-ghost hr-back" data-action="pg-b-back">← All jobs</button>
        <section class="pg-card hr-prof">
          <div class="hr-ph"><span class="hr-av big" aria-hidden="true">${esc((c.name || '?')[0])}</span><div><h1>${esc(j.title)}</h1>
            <p><button type="button" class="bd-link" data-action="pg-b-co" data-id="${esc(j.co)}">${esc(c.name)}</button> · ${esc(j.county)} · ${esc(j.work)} · ${esc(j.type)}</p>
            <div class="hr-meta"><span class="hr-b ok">${esc(pay(j))} a year</span>${c.sample ? '<span class="hr-st">Sample job</span>' : ''}<span class="hr-st">Posted ${esc(j.posted || 'today')}</span></div></div></div>
          ${applied ? `<div class="hr-note ok"><b>You applied.</b> It is in your <a href="#tracker" data-tab="tracker">Job tracker</a>. Status: ${esc(applied.status || 'Applied')}.</div>`
            : B.apply ? applyForm(j, name) : `<div class="ctrls"><button class="btn btn-primary" data-action="pg-b-apply">Apply with my CV ID</button><button class="btn" data-action="pg-b-save" data-id="${esc(j.id)}">Save to tracker</button></div>`}
          <h2 class="hr-h">About the job</h2><p>${esc(j.about || '')}</p>
          <h2 class="hr-h">Must-haves</h2>
          <p class="hr-skills">${musts(j).map(x => `<span${f.has.indexOf(x) !== -1 ? ' class="on"' : ''}>${f.has.indexOf(x) !== -1 ? '✓ ' : ''}${esc(x)}</span>`).join('')}</p>
          <p class="hint">What they need to see to shortlist you. Your CV mentions ${f.has.length} of ${allSk(j).length} of the skills listed here.${f.miss.length ? ' Not yet shown: ' + esc(f.miss.join(', ')) + '.' : ''}</p>
          ${nice(j).length ? `<h2 class="hr-h">Other skills that help</h2>
          <p class="hr-skills">${nice(j).map(x => `<span${f.has.indexOf(x) !== -1 ? ' class="on"' : ''}>${f.has.indexOf(x) !== -1 ? '✓ ' : ''}${esc(x)}</span>`).join('')}</p>` : ''}
          <h2 class="hr-h">About ${esc(c.name)}</h2><p>${esc(c.about || 'No description yet.')}</p>
        </section>`;
    }
    function applyForm(j, name) {
      const cv = ctx.cv();
      return `<div class="bd-apply"><h2>Apply to ${esc(companyOf(j).name)}</h2>
        <p class="hint">They will see this profile. Your phone and email are only shared if they get in touch and you say yes.</p>
        <div class="bd-me"><span class="hr-av" aria-hidden="true">${esc((name || '?').split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase())}</span><span><b>${esc(name || 'Your name')}</b><i>${esc(cv.basics.label || 'Add a headline in your CV')}</i></span><a href="#resumes" data-tab="resumes">Edit CV</a></div>
        ${(j.qs || []).map((q, i) => `<label class="field">${esc(q)}<input type="text" data-pg="b-ans" data-i="${i}" value="${esc(B.ans[i] || '')}"></label>`).join('')}
        <label class="field">Anything else to add (optional)<textarea rows="3" data-pg="b-note">${esc(B.note)}</textarea></label>
        <div class="ctrls"><button class="btn btn-primary" data-action="pg-b-send" data-id="${esc(j.id)}">Send application</button><button class="btn" data-action="pg-b-apply">Cancel</button></div></div>`;
    }
    function companyPage(id) {
      const c = id === 'mine' ? myCompany() : Object.assign({ sample: true }, (window.UCV_COMPANIES || []).find(x => x.id === id) || {});
      const list = jobs().filter(j => j.co === id);
      return `<button class="btn btn-sm btn-ghost hr-back" data-action="pg-b-back">← Back</button>
        <section class="pg-card hr-prof"><div class="hr-ph"><span class="hr-av big" aria-hidden="true">${esc((c.name || '?')[0])}</span><div><h1>${esc(c.name || 'Company')}</h1><p>${esc([c.sector, c.county, c.size && c.size + ' people'].filter(Boolean).join(' · '))}</p>${c.sample ? '<div class="hr-meta"><span class="hr-st">Sample company</span></div>' : ''}</div></div>
          <h2 class="hr-h">About</h2><p>${esc(c.about || 'No description yet.')}</p>
          <h2 class="hr-h">Open jobs (${list.length})</h2>${list.length ? `<div class="bd-list">${list.map(jobCard).join('')}</div>` : '<p class="empty">No open jobs.</p>'}</section>`;
    }

    // ---------- company side: Post a job ----------
    function post() {
      const f = B.form, co = bs().company;
      if (!co.name) return `<header class="pg-head"><div><h1>Post a job</h1></div></header>
        <section class="pg-card"><h2>First, tell us about your company</h2><p class="hint">Candidates see this on every job you post. It takes a minute.</p><button class="btn btn-primary" data-tab="company">Set up company page</button></section>`;
      return `
        <header class="pg-head"><div><h1>Post a job</h1><p class="pg-sub">Free during the beta. Add the pay range to publish, so candidates know before they apply.</p></div></header>
        <form class="pg-card bd-form" id="bdPost" novalidate>
          <label class="field">Job title<input type="text" name="title" maxlength="100" value="${esc(f.title || '')}" placeholder="e.g. Staff Nurse, Medical Ward" required></label>
          <div class="grid-2"><label class="field">County<select name="county">${COUNTIES.map(c => `<option ${c === (f.county || co.county) ? 'selected' : ''}>${c}</option>`).join('')}</select></label>
            <label class="field">Work style<select name="work">${WORK.map(c => `<option ${c === f.work ? 'selected' : ''}>${c}</option>`).join('')}</select></label></div>
          <div class="grid-2"><label class="field">Sector<select name="sector">${SECTORS.map(c => `<option ${c === (f.sector || co.sector) ? 'selected' : ''}>${c}</option>`).join('')}</select></label>
            <label class="field">Hours<select name="type">${['Full-time', 'Part-time', 'Contract'].map(c => `<option ${c === f.type ? 'selected' : ''}>${c}</option>`).join('')}</select></label></div>
          <div class="grid-2"><label class="field">Pay from (€ a year)<input type="number" name="min" min="1000" step="500" value="${esc(f.min || '')}" placeholder="40000" required></label>
            <label class="field">Pay up to (€ a year)<input type="number" name="max" min="1000" step="500" value="${esc(f.max || '')}" placeholder="55000" required></label></div>
          <div class="grid-2"><label class="field">Experience<select name="exp">${['Any', 'Entry level', '1–3 years', '3–5 years', '5+ years'].map(c => `<option ${c === f.exp ? 'selected' : ''}>${c}</option>`).join('')}</select></label>
            <label class="field">Right to work<select name="permit">${['Must already have the right to work in Ireland', 'Willing to sponsor a work permit'].map(c => `<option ${c === f.permit ? 'selected' : ''}>${c}</option>`).join('')}</select></label></div>
          <label class="field">Must-haves (up to 5, one per line)<textarea name="must" rows="4" maxlength="400" placeholder="e.g. NMBI registration&#10;IV therapy&#10;Right to work in Ireland">${esc(f.must || '')}</textarea><span class="hint">What the person needs for you to shortlist them. We show you which ones each applicant meets, and how well each is backed up.</span></label>
          <label class="field">Other skills that help (comma separated, optional)<input type="text" name="skills" maxlength="300" value="${esc(f.skills || '')}" placeholder="e.g. Care planning, Mentoring"></label>
          <label class="field">About the job<textarea name="about" rows="5" maxlength="2000" placeholder="What will they do, and who will they work with?">${esc(f.about || '')}</textarea></label>
          <label class="field">Questions for applicants (optional, one per line, up to 3)<textarea name="qs" rows="3" maxlength="600" placeholder="Do you have the right to work in Ireland?">${esc(f.qs || '')}</textarea></label>
          ${B.err ? `<p class="hr-err" role="alert">${esc(B.err)}</p>` : ''}
          <div class="ctrls"><button class="btn btn-primary" type="submit" value="publish">Publish job</button><button class="btn" type="submit" value="draft">Save draft</button></div>
        </form>`;
    }
    function publish(fd, draft) {
      const g = k => String(fd.get(k) || '').trim();
      const f = B.form = { title: g('title'), county: g('county'), work: g('work'), sector: g('sector'), type: g('type'), min: g('min'), max: g('max'), exp: g('exp'), permit: g('permit'), skills: g('skills'), must: g('must'), about: g('about'), qs: g('qs') };
      const min = Math.round(+f.min), max = Math.round(+f.max);
      if (!f.title) { B.err = 'Add a job title.'; return false; }
      if (!draft && (!(min >= 1000) || !(max >= min))) { B.err = 'Add the pay range to publish. The top figure must be at least the bottom one. You can also save a draft.'; return false; }
      const job = { id: B.editing || ctx.uid('j'), co: 'mine', draft: !!draft, title: cap(f.title, 100), county: COUNTIES.includes(f.county) ? f.county : 'Dublin', work: WORK.includes(f.work) ? f.work : 'On-site', type: ['Full-time', 'Part-time', 'Contract'].includes(f.type) ? f.type : 'Full-time', sector: SECTORS.includes(f.sector) ? f.sector : 'Other', min: min >= 0 ? min : 0, max: max >= 0 ? max : 0, exp: cap(f.exp, 20), permit: cap(f.permit, 60), must: String(f.must || '').split('\n').map(x => cap(x.trim(), 80)).filter(Boolean).slice(0, 5), skills: f.skills.split(/[,\n]/).map(x => cap(x.trim(), 50)).filter(Boolean).slice(0, 12), about: cap(f.about, 2000), qs: f.qs.split('\n').map(x => cap(x.trim(), 200)).filter(Boolean).slice(0, 3), posted: 'Today' };
      const b = bs(), i = b.posted.findIndex(x => x.id === job.id);
      if (i >= 0) b.posted[i] = job; else b.posted.unshift(job);
      b.log = (b.log || []).concat({ t: new Date().toISOString(), m: (draft ? 'Saved draft: ' : 'Published: ') + job.title }).slice(-30);
      ctx.persist(); B.err = ''; B.form = { questions: [''] }; B.editing = ''; B.pjob = job.id; return true;
    }
    // ---------- company side: Dashboard and Jobs ----------
    function cdash() {
      const b = bs(), h = ctx.store().hire || {}, live = b.posted.filter(j => !j.draft), name = ctx.store().master.basics.name.split(/\s+/)[0];
      const contacted = Object.keys(h.contacted || {}), yes = contacted.filter(k => h.contacted[k] === 'accepted').length;
      const apps = live.reduce((n, j) => n + rank(j).length, 0);
      const feed = (b.log || []).slice().reverse().slice(0, 6);
      const tile = (n, l) => `<div class="cd-t"><b>${n}</b><span>${l}</span></div>`;
      return `
        <header class="pg-head"><div><h1>Hello${name ? ', ' + esc(name) : ''}</h1></div><div class="pg-actions"><button class="btn btn-primary" data-tab="post">Post a job</button><button class="btn" data-tab="hire">Find talent</button></div></header>
        <div class="hr-demo"><b>Demo</b><span>Numbers here count what you do in this browser. Applicants are sample people.</span></div>
        <div class="pg-cols">
          <section class="pg-card"><div class="pg-card-top"><h2>Applicants</h2><span>Your jobs</span></div><div class="cd-row">${tile(live.length, 'live jobs')}${tile(apps, 'applicants')}${tile(Object.keys((b.stage || {})).length, 'moved on')}</div></section>
          <section class="pg-card"><div class="pg-card-top"><h2>Finding talent</h2><span>This browser</span></div><div class="cd-row">${tile(contacted.length, 'chat requests')}${tile(yes, 'said yes')}${tile(Object.keys(h.saved || {}).filter(k => h.saved[k]).length, 'in pipeline')}</div></section>
        </div>
        <div class="pg-cols">
          <section class="pg-card"><h2>Find people who fit</h2><p class="pg-sub">Filter by sector, skills and verified qualifications, then ask to chat.</p><button class="btn btn-primary" data-tab="hire">Find talent</button></section>
          <section class="pg-card"><h2>Tell candidates about you</h2><p class="pg-sub">A short company page shows on every job you post.</p><button class="btn" data-tab="company">Company page</button></section>
        </div>
        <section class="pg-card"><div class="pg-card-top"><h2>Activity</h2></div>${feed.length ? `<div class="pg-list">${feed.map(x => `<div class="pg-row"><span class="pg-dot ok"></span><span><b>${esc(x.m)}</b><i>${esc(new Date(x.t).toLocaleString('en-IE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }))}</i></span></div>`).join('')}</div>` : '<p class="empty" style="margin:8px 0 0">No activity yet. Post a job or search for talent.</p>'}</section>`;
    }
    function cjobs() {
      const b = bs(), act = b.posted.filter(j => !j.draft), dr = b.posted.filter(j => j.draft), list = B.jtab === 'draft' ? dr : act;
      return `
        <header class="pg-head"><div><h1>Jobs</h1><p class="pg-sub">Free to post. Candidates see pay on every job.</p></div><div class="pg-actions"><button class="btn btn-primary" data-tab="post">+ Post a job</button></div></header>
        <div class="pg-seg" role="tablist"><button type="button" role="tab" aria-selected="${B.jtab !== 'draft'}" data-action="pg-b-jtab" data-v="active">Active ${act.length}</button><button type="button" role="tab" aria-selected="${B.jtab === 'draft'}" data-action="pg-b-jtab" data-v="draft">Drafts ${dr.length}</button></div>
        ${list.length ? `<div class="bd-list" style="margin-top:16px">${list.map(j => `<div class="bd-app cj-row"><span></span><span class="bd-app-main"><b>${esc(j.title)}</b><i>${esc(j.county)} · ${esc(j.work)} · ${j.max ? esc(pay(j)) : 'No pay yet'}</i>${j.draft ? '' : `<span class="bd-why">${rank(j).length} applicants</span>`}</span><span></span>
          <span class="cj-act">${j.draft ? `<button class="btn btn-sm btn-primary" data-action="pg-b-edit" data-id="${esc(j.id)}">Edit and publish</button>` : `<button class="btn btn-sm" data-action="pg-b-pjob-go" data-id="${esc(j.id)}">Applicants</button>`}<button class="btn btn-sm btn-ghost" data-action="pg-b-del" data-id="${esc(j.id)}">Delete</button></span></div>`).join('')}</div>`
        : `<section class="pg-card" style="margin-top:16px"><h2>${B.jtab === 'draft' ? 'No drafts' : 'No jobs yet'}</h2><p class="pg-sub">You do not need to post a job to start reaching out to candidates.</p><div class="ctrls"><button class="btn btn-primary" data-tab="post">Post a job</button><button class="btn" data-tab="hire">Find talent</button></div></section>`}`;
    }

// ---------- must-haves and proof ----------
    const MUST = { j1: ['SolidWorks', 'GD&T', 'BEng Mechanical Engineering'], j2: ['Registered General Nurse', 'Critical care', 'IV therapy'], j3: ['Month-end close', 'Budgeting', 'ACCA member'], j4: ['Programme planning', 'Health and safety', 'Safe Pass'], j5: ['Validation', 'GMP', 'Root cause analysis'], j6: ['Kitchen management', 'Food costing', 'HACCP'], j7: ['TypeScript', 'React', 'Node.js'], j8: ['Musculoskeletal', 'Registered Physiotherapist', 'Rehab programmes'], j9: ['ISO 13485', 'CAPA', 'Risk management'], j10: ['Registered General Nurse', 'Patient assessment', 'IV therapy'] };
    const musts = j => (j.must && j.must.length) ? j.must : (MUST[j.id] || j.skills.slice(0, 3));
    const nice = j => { const m = musts(j).map(x => x.toLowerCase()); return j.skills.filter(x => m.indexOf(x.toLowerCase()) === -1); };
    const PL = ['Self-declared', 'Referee confirmed', 'Employer or school confirmed', 'Register matched', 'Signed credential'];
    const stem = w => w.length > 5 ? w.slice(0, 5) : w;
    const slug = t => String(t).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const hit = (phrase, text) => { const p = String(phrase).toLowerCase().trim(); if (!p) return false; if (text.indexOf(p) !== -1) return true; const ws = p.split(/[^a-z0-9+#.]+/).filter(w => w.length > 2); return ws.length > 0 && ws.every(w => text.indexOf(stem(w)) !== -1); };
    const badge = lv => `<span class="pb pb-${lv}">Level ${lv}: ${esc(PL[lv])}</span>`;
    // How strong is the proof behind one claim on a sample CV? Only what the system recorded is counted.
    function itemLevel(c, i, n, h) {
      if ((h.proof || {})[c.id + '-' + n]) return 1;
      if (!i[2]) return 0;
      if (i[1].indexOf('–') !== -1 || /^(BEng|BSc|BComm|MEng|MPharm|Higher Certificate|Advanced Certificate)/.test(i[0])) return 2;
      return 3;
    }
    function reqs(j, c) {
      const h = ctx.store().hire || {};
      const out = musts(j).map(m => {
        let best = null;
        c.items.forEach((i, n) => { if (hit(m, (i[0] + ' ' + i[1]).toLowerCase())) { const lv = itemLevel(c, i, n, h); if (!best || lv > best.level) best = { level: lv, key: c.id + '-' + n, via: i[1] || i[0] }; } });
        if (!best) { const sk = c.skills.find(x => hit(m, x.toLowerCase())); if (sk) { const key = c.id + '-s-' + slug(sk); best = { level: (h.proof || {})[key] ? 1 : 0, key, via: 'Skill on their CV' }; } }
        const st = !best ? 'not' : best.level === 0 ? 'unproven' : 'met';
        return { m, st, level: best ? best.level : 0, key: best ? best.key : '', via: best ? best.via : '', asked: !!(best && (h.asked || {})[best.key]) };
      });
      const o = { not: 0, unproven: 1, met: 2 };
      return out.sort((a, b) => o[a.st] - o[b.st]);
    }
    function reqRow(r) {
      const right = r.st === 'met' ? badge(r.level) : r.st === 'unproven' ? (r.asked ? '<span class="hint">Asked, waiting</span>' : `<button type="button" class="btn btn-sm" data-action="pg-h-ask" data-k="${esc(r.key)}">Ask for proof</button>`) : '<span class="rq-none">Not on their CV</span>';
      const note = r.st === 'not' ? 'No match found' : r.st === 'unproven' ? esc(r.via) + ' ' + badge(0) : esc(r.via);
      return `<div class="rq rq-${r.st}"><span class="rq-t"><b>${esc(r.m)}</b><i>${note}</i></span>${right}</div>`;
    }

    // ---------- company side: Applicants ----------
    function rank(j) {
      const mu = musts(j), ni = nice(j);
      return (window.UCV_SAMPLES || []).map(c => {
        const rq = reqs(j, c);
        const text = (c.role + ' ' + c.skills.join(' ') + ' ' + c.items.map(i => i[0]).join(' ')).toLowerCase();
        const hasNice = ni.filter(x => hit(x, text));
        const met = rq.filter(r => r.st !== 'not').length, proven = rq.filter(r => r.st === 'met').length;
        const sector = c.sector === j.sector ? 15 : 0;
        const pts = rq.reduce((a, r) => a + (r.st === 'met' ? 1 : r.st === 'unproven' ? 0.6 : 0), 0);
        const score = Math.round((mu.length ? pts / mu.length : 0) * 60 + (ni.length ? hasNice.length / ni.length : 0) * 25 + sector);
        return { c, rq, met, proven, n: mu.length, hasNice, niceN: ni.length, score, sector: !!sector };
      }).filter(r => r.met || r.sector).sort((a, b) => b.score - a.score).slice(0, 8);
    }
    function pipeline() {
      const b = bs(), mine = b.posted.filter(j => !j.draft);
      if (!mine.length && !B.sample) return `<header class="pg-head"><div><h1>Applicants</h1><p class="pg-sub">Jobs you post, and the people who apply.</p></div><div class="pg-actions"><button class="btn btn-primary" data-tab="post">Post a job</button></div></header>
        <p class="empty">You have not posted a job yet.</p><p><button class="btn" data-action="pg-b-sample">See an example with sample applicants</button></p>`;
      const list = mine.length ? mine : [jobBy('j1')];
      const j = list.find(x => x.id === B.pjob) || list[0];
      const rows = rank(j);
      return `
        <header class="pg-head"><div><h1>Applicants</h1><p class="pg-sub">Ranked by how well each CV fits the job. The reasons are shown, and you can change the stage.</p></div><div class="pg-actions"><button class="btn btn-primary" data-tab="post">Post a job</button></div></header>
        ${mine.length ? '' : '<div class="hr-demo"><b>Example</b><span>This is a sample job with made-up applicants. Post your own job to start.</span></div>'}
        <div class="hr-chips" role="group" aria-label="Job">${list.map(x => `<button type="button" class="hr-chip" data-action="pg-b-pjob" data-id="${esc(x.id)}" aria-pressed="${x.id === j.id}">${esc(x.title)}</button>`).join('')}</div>
        <p class="hint hr-count">${esc(j.title)} · ${esc(pay(j))} · ${rows.length} applicant${rows.length === 1 ? '' : 's'}${mine.length ? ' (sample people, to show how ranking works)' : ''}</p>
        <div class="bd-list">${rows.map((r, n) => { const st = b.stage[j.id + ':' + r.c.id] || 'Applied';
          return `<div class="bd-app"><span class="bd-rank">${n + 1}</span><button type="button" class="bd-app-main" data-action="pg-h-open" data-id="${esc(r.c.id)}"><b>${esc(r.c.name)}</b><i>${esc(r.c.role)} · ${esc(r.c.location)}</i>
            <span class="bd-why">Meets ${r.met} of ${r.n} must-haves · ${r.proven} backed by proof${r.niceN ? ' · ' + r.hasNice.length + ' of ' + r.niceN + ' other skills' : ''}${r.sector ? ' · Same sector' : ''}</span></button>
            <span class="bd-score" title="Fit score: how well the CV matches the must-haves, other skills and sector">${r.score}<small>fit</small></span>
            <label class="field"><span class="sr-only">Stage for ${esc(r.c.name)}</span><select data-pg="b-stage" data-j="${esc(j.id)}" data-c="${esc(r.c.id)}">${STAGES.map(x => `<option ${x === st ? 'selected' : ''}>${x}</option>`).join('')}</select></label>
            <div class="rq-list">${r.rq.slice(0, 3).map(reqRow).join('')}${r.rq.length > 3 ? `<p class="hint">${r.rq.length - 3} more must-have${r.rq.length - 3 === 1 ? '' : 's'} in their profile.</p>` : ''}</div></div>`; }).join('') || '<p class="empty">No sample applicants match this job.</p>'}</div>
        <p class="hint"><b>Proof levels:</b> 0 Self-declared · 1 Referee confirmed · 2 Employer or school confirmed · 3 Register matched. Only proof the system recorded is counted.</p>
        <p class="hint">How the fit score works: up to 60 points for the must-haves (full points when something backs the claim, 60% when it is only claimed, nothing when it is missing), 25 for the other skills, 15 for the same sector. Nothing else is used.</p>`;
    }

    // ---------- company side: profile ----------
    function company() {
      const c = bs().company;
      return `
        <header class="pg-head"><div><h1>Company page</h1><p class="pg-sub">What candidates see on every job you post.</p></div>${c.name ? `<div class="pg-actions"><button class="btn" data-action="pg-b-co" data-id="mine">Preview</button></div>` : ''}</header>
        <section class="pg-card bd-form">
          <label class="field">Company name<input type="text" data-pg="b-co-name" maxlength="80" value="${esc(c.name)}" placeholder="e.g. Harbour Logistics"></label>
          <div class="grid-2"><label class="field">Sector<select data-pg="b-co-sector">${SECTORS.map(x => `<option ${x === c.sector ? 'selected' : ''}>${x}</option>`).join('')}</select></label>
            <label class="field">County<select data-pg="b-co-county">${COUNTIES.map(x => `<option ${x === c.county ? 'selected' : ''}>${x}</option>`).join('')}</select></label></div>
          <label class="field">Size<select data-pg="b-co-size">${['', '1–10', '11–50', '51–200', '201–500', '500+'].map(x => `<option ${x === c.size ? 'selected' : ''} value="${x}">${x || 'Choose'}</option>`).join('')}</select></label>
          <label class="field">About your company<textarea data-pg="b-co-about" rows="5" maxlength="1500" placeholder="What you do, and what it is like to work with you.">${esc(c.about)}</textarea></label>
          <p class="hint">Kept on this device for now. Nothing is published to the internet in the demo.</p>
        </section>`;
    }

    // ---------- events ----------
    function click(btn, a) {
      const d = btn.dataset, s = ctx.store(), b = bs();
      switch (a) {
        case 'pg-b-open': B.open = d.id; B.co = ''; B.apply = false; B.ans = {}; B.note = ''; ctx.rerender(); window.scrollTo(0, 0); break;
        case 'pg-b-back': if (B.co && B.open) B.co = ''; else { B.co = ''; B.open = ''; } B.apply = false; ctx.rerender(); window.scrollTo(0, 0); break;
        case 'pg-b-co': B.co = d.id; if (ctx.tab() !== 'jobs') ctx.go('jobs'); else ctx.rerender(); window.scrollTo(0, 0); break;
        case 'pg-b-apply': B.apply = !B.apply; ctx.rerender(); break;
        case 'pg-b-save': { const j = jobBy(d.id); if (!j) break; if (!s.applications.some(x => x.jid === j.id)) s.applications.push({ aid: ctx.uid('a'), jid: j.id, company: companyOf(j).name, role: j.title, vid: s.active, status: 'Saved', date: new Date().toISOString().slice(0, 10), url: '', notes: pay(j) + ' · ' + j.county }); ctx.persist(); ctx.rerender(); ctx.toast('Saved to your tracker'); break; }
        case 'pg-b-send': {
          const j = jobBy(d.id); if (!j) break;
          const ex = s.applications.find(x => x.jid === j.id);
          if (ex) { ex.status = 'Applied'; ex.date = new Date().toISOString().slice(0, 10); } else s.applications.push({ aid: ctx.uid('a'), jid: j.id, company: companyOf(j).name, role: j.title, vid: s.active, status: 'Applied', date: new Date().toISOString().slice(0, 10), url: '', notes: 'Applied through CV ID · ' + pay(j) });
          b.applied[j.id] = { at: new Date().toISOString(), answers: (j.qs || []).map((q, i) => ({ q, a: cap(B.ans[i], 300) })), note: cap(B.note, 1000), status: 'Applied' };
          B.apply = false; ctx.persist(); ctx.rerender(); ctx.toast('Application sent'); window.scrollTo(0, 0); break;
        }
        case 'pg-b-pjob': B.pjob = d.id; ctx.rerender(); break;
        case 'pg-b-pjob-go': B.pjob = d.id; ctx.go('pipeline'); break;
        case 'pg-b-jtab': B.jtab = d.v; ctx.rerender(); break;
        case 'pg-b-edit': { const j = b.posted.find(x => x.id === d.id); if (!j) break; B.editing = j.id; B.form = { title: j.title, county: j.county, work: j.work, sector: j.sector, type: j.type, min: j.min || '', max: j.max || '', exp: j.exp, permit: j.permit, skills: j.skills.join(', '), must: (j.must || []).join('\n'), about: j.about, qs: (j.qs || []).join('\n') }; ctx.go('post'); break; }
        case 'pg-b-del': ctx.armed(btn, 'Click again to delete', () => { b.posted = b.posted.filter(x => x.id !== d.id); ctx.persist(); ctx.rerender(); }); break;
        case 'pg-b-sample': B.sample = true; ctx.rerender(); break;
      }
    }
    function field(e) {
      const t = e.target, d = t.dataset, k = d && d.pg;
      if (!k || k.indexOf('b-') !== 0) return false;
      const isText = e.type === 'input', textLike = t.tagName === 'TEXTAREA' || (t.tagName === 'INPUT' && !['checkbox', 'radio'].includes(t.type));
      if ((isText && !textLike) || (!isText && textLike)) return true;
      const b = bs();
      switch (k) {
        case 'b-q': { B.q = t.value; const p = t.selectionStart; ctx.rerender(); const n = document.querySelector('[data-pg="b-q"]'); if (n) { n.focus(); try { n.setSelectionRange(p, p); } catch (_) {} } break; }
        case 'b-county': case 'b-sector': case 'b-work': B[k.slice(2)] = t.value; ctx.rerender(); break;
        case 'b-ans': B.ans[+d.i] = t.value; break;
        case 'b-note': B.note = t.value; break;
        case 'b-stage': if (STAGES.includes(t.value)) { b.stage[d.j + ':' + d.c] = t.value; ctx.persist(); } break;
        case 'b-co-name': b.company.name = cap(t.value, 80); ctx.save(); break;
        case 'b-co-about': b.company.about = cap(t.value, 1500); ctx.save(); break;
        case 'b-co-sector': b.company.sector = SECTORS.includes(t.value) ? t.value : 'Other'; ctx.save(); break;
        case 'b-co-county': b.company.county = COUNTIES.includes(t.value) ? t.value : 'Dublin'; ctx.save(); break;
        case 'b-co-size': b.company.size = cap(t.value, 12); ctx.save(); break;
      }
      return true;
    }
    function submit(e) {
      if (e.target.id !== 'bdPost') return false;
      e.preventDefault();
      const draft = !!(e.submitter && e.submitter.value === 'draft');
      if (publish(new FormData(e.target), draft)) { ctx.toast(draft ? 'Draft saved' : 'Job published'); B.jtab = draft ? 'draft' : 'active'; ctx.go('cjobs'); } else ctx.rerender();
      return true;
    }
    return { render: { jobs: jobsPage, post, pipeline, company, cdash, cjobs }, click, field, submit };
  };
})();
