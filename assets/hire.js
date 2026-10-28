/* Universal CV ID — Hiring side (v40)
   Pages for someone who is hiring: Candidates, a candidate's profile, Shortlist; plus the job seeker's Requests inbox.
   Today everything is kept in this browser. The 12 sample people are made up. A real candidate is added by pasting
   the CV ID link they shared; nothing is sent anywhere. Real two-way requests need a server (not built yet). */
(function () {
  'use strict';
  const SECTORS = ['All', 'Engineering', 'Healthcare', 'Construction', 'Finance', 'Tech', 'Hospitality'];
  const STAGES = ['Saved', 'Contacted', 'Interviewing', 'Hired'];
  const WHEN = ['2 Oct 2026', '18 Sep 2026', '27 Aug 2026', '9 Oct 2026', '14 Jul 2026', '30 Sep 2026'];

  window.UCVHire = function (ctx) {
    const esc = ctx.esc;
    const cap = (s, n) => String(s == null ? '' : s).slice(0, n);
    const hs = () => { const s = ctx.store(); const h = s.hire = s.hire || {}; ['saved', 'stage', 'notes', 'asked', 'contacted', 'proof', 'hidden'].forEach(k => { if (!h[k] || typeof h[k] !== 'object' || Array.isArray(h[k])) h[k] = {}; }); if (!Array.isArray(h.added)) h.added = []; if (!Array.isArray(h.searches)) h.searches = []; return h; };
    const V = { q: '', sector: 'All', full: false, saved: false, open: '', item: '', adding: false, err: '', tab: 'active' };
    const initials = n => (String(n).split(/\s+/).filter(Boolean).map(w => w[0]).slice(0, 2).join('') || '?').toUpperCase();
    const plain = t => String(t || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

    // ---------- the people ----------
    function samples() {
      return (window.UCV_SAMPLES || []).map(c => ({
        id: c.id, sample: true, name: c.name, role: c.role, location: c.location, sector: c.sector, status: c.status, about: c.about,
        skills: c.skills, type: c.type, where: c.where, avail: c.avail, pay: c.pay, style: c.style, active: c.active,
        items: c.items.map((i, n) => ({ t: i[0], s: i[1], v: !!i[2], k: c.id + '-' + n, n }))
      }));
    }
    function real() {
      return hs().added.map(c => Object.assign({ sample: false, status: 'Shared by link', sector: 'Other', skills: [], items: [], type: '', where: '', avail: '' }, c, {
        items: (c.items || []).map((i, n) => ({ t: i.t, s: i.s, v: false, k: c.id + '-' + n, n }))
      }));
    }
    const everyone = () => real().concat(samples());
    function decorate(c) {
      const h = hs();
      const items = c.items.map(i => {
        const p = h.proof[i.k];
        const v = i.v || !!p;
        return Object.assign({}, i, { v, info: p || (i.v ? checkInfo(i) : null), asked: !!h.asked[i.k] });
      });
      const n = items.filter(i => i.v).length;
      return Object.assign({}, c, { items, nv: n, total: items.length, full: items.length > 0 && n === items.length, saved: !!h.saved[c.id], stage: h.stage[c.id] || 'Saved', contact: h.contacted[c.id] || '' });
    }
    function checkInfo(i) {
      const first = i.s.split(' · ')[0], when = WHEN[(i.n + i.k.length) % WHEN.length];
      if (i.s.indexOf('–') !== -1) return { by: first + ' (HR team)', how: 'Job title and dates confirmed with the employer', when };
      if (/^(BEng|BSc|BComm|MEng|MPharm|Higher Certificate|Advanced Certificate)/.test(i.t)) return { by: first, how: 'Award and year confirmed with the institution', when };
      return { by: first, how: 'Matched against their official register', when };
    }

    // ---------- candidates ----------
    function badge(c) {
      if (!c.total) return '<span class="hr-b none">Self-declared</span>';
      return `<span class="hr-b ${c.full ? 'ok' : c.nv ? 'part' : 'none'}">${c.nv} of ${c.total} verified</span>`;
    }
    function hire() {
      if (V.open) { const c = everyone().find(x => x.id === V.open); if (c) return profile(decorate(c)); V.open = ''; }
      const q = V.q.toLowerCase().trim(), h = hs();
      const all = everyone().map(decorate).filter(c => !h.hidden[c.id]);
      const match = c => (V.sector === 'All' || c.sector === V.sector) && (!V.full || c.full) && (!q || (c.name + ' ' + c.role + ' ' + c.location + ' ' + c.sector + ' ' + c.skills.join(' ') + ' ' + c.items.map(i => i.t + ' ' + i.s).join(' ')).toLowerCase().indexOf(q) !== -1);
      const found = all.filter(match);
      const isAct = c => c.sample ? c.active : true;
      const list = found.filter(c => V.tab === 'active' ? isAct(c) : !isAct(c));
      const nA = found.filter(isAct).length, nP = found.length - nA;
      const nSaved = Object.keys(h.saved).filter(k => h.saved[k]).length;
      return `
        <header class="pg-head"><div><h1>Find talent</h1><p class="pg-sub">Search people who share a CV ID. A Verified badge means the fact was checked, and you can see who checked it.</p></div>
          <div class="pg-actions"><button class="btn btn-primary" data-action="pg-h-add">+ Add a candidate</button><button class="btn" data-tab="shortlist">Pipeline${nSaved ? ' (' + nSaved + ')' : ''}</button></div></header>
        <div class="hr-demo"><b>Demo</b><span>The people marked Sample are made up, so you can try the screens. To add a real person, paste the CV ID link they sent you.</span></div>
        ${V.adding ? addForm() : ''}
        <div class="ft-wrap">
          <aside class="ft-side" aria-label="Saved searches"><div class="ft-top"><h2>Searches</h2><button class="btn btn-sm" data-action="pg-h-savesearch">+ Save this</button></div>
            ${h.searches.length ? h.searches.map((x, i) => `<div class="ft-s"><button type="button" data-action="pg-h-runsearch" data-i="${i}"><b>${esc(x.name)}</b></button><button type="button" class="ft-x" aria-label="Delete search ${esc(x.name)}" data-action="pg-h-delsearch" data-i="${i}">×</button></div>`).join('') : '<p class="hint">Set the filters, then save the search to come back to it.</p>'}</aside>
          <div class="ft-main">
            <div class="hr-bar"><label class="field hr-q"><span class="sr-only">Search</span><input type="search" data-pg="h-q" value="${esc(V.q)}" placeholder="Job title, skill, qualification, place or name"></label>
              <label class="switch"><input type="checkbox" data-pg="h-full" ${V.full ? 'checked' : ''}> Fully verified only</label></div>
            <div class="hr-chips" role="group" aria-label="Sector">${SECTORS.map(s => `<button type="button" class="hr-chip" data-action="pg-h-sector" data-v="${s}" aria-pressed="${V.sector === s}">${s}</button>`).join('')}</div>
            <div class="pg-seg" role="tablist" aria-label="Candidate status"><button type="button" role="tab" aria-selected="${V.tab === 'active'}" data-action="pg-h-tab" data-v="active">Active ${nA}</button><button type="button" role="tab" aria-selected="${V.tab === 'passive'}" data-action="pg-h-tab" data-v="passive">Passive ${nP}</button></div>
            <p class="hint hr-count">${V.tab === 'active' ? 'Looking now' : 'Open to the right offer, not actively looking'}</p>
            ${list.length ? `<div class="ft-list">${list.map(tcard).join('')}</div>` : '<p class="empty">No one matches. Try another sector or clear the search.</p>'}
          </div>
        </div>`;
    }
    function tcard(c) {
      const first = c.name.split(/\s+/)[0];
      const job = c.items.filter(i => /–/.test(i.s)).slice(0, 2), edu = c.items.find(i => !/–/.test(i.s));
      return `<article class="ft-card">
        <div class="ft-head"><button type="button" class="hr-av" data-action="pg-h-open" data-id="${esc(c.id)}" aria-label="Open ${esc(c.name)}">${esc(initials(c.name))}</button>
          <div><button type="button" class="ft-name" data-action="pg-h-open" data-id="${esc(c.id)}">${esc(c.name)}</button>${c.sample ? '<em class="hr-tag">Sample</em>' : '<em class="hr-tag link">From link</em>'}<i>${esc(c.role || 'No title')} · ${esc(c.location)}</i></div>${badge(c)}</div>
        ${c.about ? `<p class="ft-about">${esc(c.about)}</p>` : ''}
        <div class="ft-cols"><div><h3>Experience</h3>${job.map(i => `<p><b>${esc(i.t)}</b><br><span>${esc(i.s)}</span> ${i.v ? '<span class="hr-b ok">✓</span>' : ''}</p>`).join('') || '<p><span>Not listed</span></p>'}</div>
          <div><h3>Education and registration</h3>${edu ? `<p><b>${esc(edu.t)}</b><br><span>${esc(edu.s)}</span> ${edu.v ? '<span class="hr-b ok">✓</span>' : ''}</p>` : '<p><span>Not listed</span></p>'}</div>
          <div><h3>Ideal next job</h3><p><b>${esc(c.role || '')}</b><br><span>${c.pay ? '€' + Math.round(c.pay / 1000) + 'k · ' : ''}${esc(c.style || c.where || '')}${c.location ? ' · ' + esc(c.location) : ''}</span></p></div></div>
        ${c.skills.length ? `<p class="hr-skills">${c.skills.slice(0, 6).map(x => `<span>${esc(x)}</span>`).join('')}</p>` : ''}
        <div class="ft-act"><button class="btn btn-sm" data-action="pg-h-share" data-id="${esc(c.id)}">Share</button><button class="btn btn-sm" data-action="pg-h-hide" data-id="${esc(c.id)}">Not interested</button>
          ${c.contact ? `<span class="hr-b ${c.contact === 'accepted' ? 'ok' : 'part'}">${c.contact === 'accepted' ? 'Chat accepted' : c.contact === 'declined' ? 'Declined' : 'Chat requested'}</span>` : `<button class="btn btn-sm btn-primary" data-action="pg-h-contact" data-id="${esc(c.id)}">Request to chat</button>`}</div></article>`;
    }
    function addForm() {
      return `<section class="pg-card hr-add"><div class="pg-card-top"><h2>Add a candidate</h2><button class="btn btn-sm btn-ghost" data-action="pg-h-add">Close</button></div>
        <label class="field">Paste their CV ID link<input type="text" id="hrLink" data-pg="h-link" placeholder="https://cvid.app/p.html#…" autocomplete="off"></label>
        <p class="hint">The link carries their CV inside it. We read it in your browser and keep it here. Everything is shown as self-declared until it is checked.</p>
        ${V.err ? `<p class="hr-err" role="alert">${esc(V.err)}</p>` : ''}
        <div class="ctrls"><button class="btn btn-primary" data-action="pg-h-link-go">Add to candidates</button></div></section>`;
    }
    function addFromLink(raw) {
      const hash = String(raw || '').trim().replace(/^[^#]*#/, '');
      let data = null; try { data = hash ? UCV.decode(hash) : null; } catch (_) { data = null; }
      if (!data || typeof data !== 'object' || !UCV.validId(data.id) || data.t === 'card') { V.err = 'That link did not open as a CV. Copy the whole link again, including everything after the # sign.'; return false; }
      const h = hs();
      if (h.added.some(c => c.id === data.id) || (window.UCV_SAMPLES || []).some(c => c.id === data.id)) { V.err = 'That person is already in your list.'; return false; }
      const cv = UCV.fromShare(data).cv, b = cv.basics;
      const items = [];
      cv.work.slice(0, 8).forEach(w => items.push({ t: cap(w.position, 120) || 'Role', s: cap([w.company, [w.startDate, w.endDate].filter(Boolean).join(' – ')].filter(Boolean).join(' · '), 160) }));
      cv.education.slice(0, 4).forEach(e => items.push({ t: cap(e.degree, 120) || 'Education', s: cap([e.institution, e.year].filter(Boolean).join(' · '), 160) }));
      cv.certificates.slice(0, 6).forEach(c => items.push({ t: cap(c.name, 120), s: cap([c.issuer, c.date].filter(Boolean).join(' · '), 160) }));
      h.added.unshift({ id: data.id, name: cap(b.name, 100) || 'Unnamed', role: cap(b.label, 120), location: cap(b.location, 100), about: cap(plain(b.summary), 400), skills: cv.skills.slice(0, 12).map(s => cap(s, 40)), items });
      ctx.persist(); V.err = ''; V.adding = false; V.open = data.id; return true;
    }

    // ---------- one person ----------
    function profile(c) {
      const h = hs(), first = c.name.split(/\s+/)[0];
      const it = c.items.find(i => i.k === V.item);
      const contact = c.contact === 'accepted'
        ? `<div class="hr-note ok"><b>${esc(first)} said yes.</b> ${c.sample ? 'Email: <b>' + esc(emailFor(c.name)) + '</b> (sample address)' : 'You can contact them using the details on their CV.'}</div>`
        : c.contact === 'declined' ? `<div class="hr-note">${esc(first)} is not taking contact right now.</div>`
        : c.contact === 'sent' ? `<div class="hr-note">Message sent. ${c.sample ? 'Open <b>Requests</b> in Job seeker view to answer as ' + esc(first) + '.' : ''}</div>` : '';
      return `
        <button class="btn btn-sm btn-ghost hr-back" data-action="pg-h-back">← Find talent</button>
        <section class="pg-card hr-prof">
          <div class="hr-ph"><span class="hr-av big" aria-hidden="true">${esc(initials(c.name))}</span>
            <div><h1>${esc(c.name)}</h1><p>${esc(c.role || '')}${c.location ? ' · ' + esc(c.location) : ''}</p><div class="hr-meta">${badge(c)}${c.sample ? '<span class="hr-st">Sample person</span>' : '<span class="hr-st">From a shared link</span>'}${c.status && c.sample ? `<span class="hr-st">${esc(c.status)}</span>` : ''}</div></div></div>
          <div class="ctrls"><button class="btn ${c.saved ? '' : 'btn-primary'}" data-action="pg-h-save" data-id="${esc(c.id)}">${c.saved ? '✓ On shortlist' : 'Add to shortlist'}</button>
            ${c.contact ? '' : `<button class="btn" data-action="pg-h-contact" data-id="${esc(c.id)}">Request to chat</button>`}</div>
          ${contact}
          ${c.about ? `<h2 class="hr-h">About</h2><p>${esc(c.about)}</p>` : ''}
          ${c.type || c.where || c.avail ? `<dl class="hr-dl">${[['Looking for', c.type], ['Where', c.where], ['Could start in', c.avail]].filter(r => r[1]).map(r => `<div><dt>${r[0]}</dt><dd>${esc(r[1])}</dd></div>`).join('')}</dl>` : ''}
          <h2 class="hr-h">Experience and qualifications</h2>
          ${c.items.length ? `<ul class="hr-items">${c.items.map(i => `<li><button type="button" class="hr-item" data-action="pg-h-item" data-k="${esc(i.k)}" aria-expanded="${V.item === i.k}"><span><b>${esc(i.t)}</b><i>${esc(i.s)}</i></span><span class="hr-b ${i.v ? 'ok' : i.asked ? 'part' : 'none'}">${i.v ? '✓ Verified' : i.asked ? 'Check requested' : 'Not yet verified'}</span></button>
            ${V.item === i.k ? proof(c, i, first) : ''}</li>`).join('')}</ul>` : '<p class="empty">No entries on this CV.</p>'}
          ${c.skills.length ? `<h2 class="hr-h">Skills</h2><p class="hr-skills">${c.skills.map(s => `<span>${esc(s)}</span>`).join('')}</p>` : ''}
          <h2 class="hr-h">Your notes</h2>
          <label class="field"><span class="sr-only">Notes</span><textarea rows="3" data-pg="h-note" data-id="${esc(c.id)}" placeholder="Only you can see these. Kept on this device.">${esc(h.notes[c.id] || '')}</textarea></label>
        </section>`;
    }
    function proof(c, i, first) {
      if (i.v) return `<div class="hr-proof"><dl><div><dt>Checked by</dt><dd>${esc(i.info.by)}</dd></div><div><dt>How</dt><dd>${esc(i.info.how)}</dd></div><div><dt>When</dt><dd>${esc(i.info.when)}</dd></div></dl>${c.sample ? '<p class="hint">Sample: this check is made up to show what a real one would look like.</p>' : ''}</div>`;
      if (i.asked) return `<div class="hr-proof"><p>You asked ${esc(first)} to get this checked. ${c.sample ? 'Open <b>Requests</b> in Job seeker view to answer as them.' : 'Send them the note again if you need to.'}</p>${c.sample ? '' : `<button class="btn btn-sm" data-action="pg-h-copyask" data-k="${esc(i.k)}" data-id="${esc(c.id)}">Copy the note</button>`}</div>`;
      return `<div class="hr-proof"><p>This is what ${esc(first)} wrote. It has not been checked by anyone.</p><button class="btn btn-sm btn-primary" data-action="pg-h-ask" data-k="${esc(i.k)}" data-id="${esc(c.id)}">Ask ${esc(first)} to get this verified</button></div>`;
    }
    const emailFor = n => String(n).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z ]/g, '').split(' ').filter(Boolean).join('.') + '@example.com';

    // ---------- shortlist ----------
    function shortlist() {
      const h = hs(), list = everyone().map(decorate).filter(c => c.saved);
      return `
        <header class="pg-head"><div><h1>Pipeline</h1><p class="pg-sub">The people you are talking to, by stage. Add notes on each profile.</p></div>
          <div class="pg-actions"><button class="btn btn-primary" data-tab="hire">Find talent</button></div></header>
        ${list.length ? `<div class="hr-board">${STAGES.map(st => { const col = list.filter(c => c.stage === st); return `<section class="hr-col" aria-label="${st}"><h2>${st}<span>${col.length}</span></h2>${col.map(c => `<div class="hr-sc"><button type="button" class="hr-sc-open" data-action="pg-h-open" data-id="${esc(c.id)}"><b>${esc(c.name)}</b><i>${esc(c.role)}</i>${badge(c)}</button><label class="field"><span class="sr-only">Stage for ${esc(c.name)}</span><select data-pg="h-stage" data-id="${esc(c.id)}">${STAGES.map(x => `<option ${x === c.stage ? 'selected' : ''}>${x}</option>`).join('')}</select></label><button class="btn btn-sm btn-ghost" data-action="pg-h-save" data-id="${esc(c.id)}">Remove</button></div>`).join('') || '<p class="hint">Empty</p>'}</section>`; }).join('')}</div>`
        : '<p class="empty">Nobody here yet. Open a candidate and choose Add to shortlist.</p>'}`;
    }

    // ---------- the job seeker's inbox (demo) ----------
    function requests() {
      const h = hs(), all = samples();
      const asks = [];
      all.forEach(c => c.items.forEach(i => { if (h.asked[i.k] && !h.proof[i.k]) asks.push({ c, i }); }));
      Object.keys(h.asked).forEach(k => { const m = k.match(/^(c\d+)-s-(.+)$/); if (!m || h.proof[k]) return; const c = all.find(x => x.id === m[1]); const sk = c && c.skills.find(x => x.toLowerCase().replace(/[^a-z0-9]+/g, '-') === m[2]); if (sk) asks.push({ c, i: { k, t: sk, s: 'A skill on your CV' } }); });
      const contacts = all.filter(c => h.contacted[c.id] === 'sent');
      const done = all.filter(c => c.items.some(i => h.proof[i.k]) || h.contacted[c.id] === 'accepted' || h.contacted[c.id] === 'declined');
      return `
        <header class="pg-head"><div><h1>Requests</h1><p class="pg-sub">When an employer wants to contact you, or check something on your CV, it lands here. You decide.</p></div></header>
        <div class="hr-demo"><b>Demo</b><span>Real requests need an account, which is not built yet. Until then this shows what a candidate would see. Ask a Sample person a question in <a href="#hire" data-tab="hire">Candidates</a> and it appears here.</span></div>
        ${asks.length || contacts.length ? '' : '<p class="empty">No requests waiting.</p>'}
        ${contacts.map(c => `<section class="pg-card hr-req"><p class="hr-who">As ${esc(c.name)} (sample)</p><h2>An employer would like to get in touch</h2><p>They can see your verified profile. They only get your contact details if you say yes.</p><div class="ctrls"><button class="btn btn-primary" data-action="pg-h-reply" data-id="${esc(c.id)}" data-v="accepted">Yes, share my details</button><button class="btn" data-action="pg-h-reply" data-id="${esc(c.id)}" data-v="declined">Not now</button></div></section>`).join('')}
        ${asks.map(({ c, i }) => `<section class="pg-card hr-req"><p class="hr-who">As ${esc(c.name)} (sample)</p><h2>Please confirm one thing on your CV</h2><p><b>${esc(i.t)}</b><br><span class="hint">${esc(i.s)}</span></p><p class="hint">Name someone who can confirm it, or attach a document. Either way, the employer will see who checked it.</p>
          <div class="grid-2"><label class="field">Referee name and email<input type="text" data-pg="h-ref" data-k="${esc(i.k)}" placeholder="e.g. Sinéad Walsh, sinead@example.com"></label><label class="field">Or document name<input type="text" data-pg="h-doc" data-k="${esc(i.k)}" placeholder="e.g. Safe Pass card.pdf"></label></div>
          <div class="ctrls"><button class="btn btn-primary" data-action="pg-h-confirm" data-k="${esc(i.k)}">Send for checking</button></div></section>`).join('')}
        ${done.length ? `<section class="pg-card"><div class="pg-card-top"><h2>Answered</h2><button class="btn btn-sm btn-ghost" data-action="pg-h-reset">Reset demo</button></div><div class="pg-list">${done.map(c => `<div class="pg-row"><span class="pg-dot ok"></span><span><b>${esc(c.name)}</b><i>${h.contacted[c.id] === 'declined' ? 'Contact declined' : h.contacted[c.id] === 'accepted' ? 'Contact accepted' : 'Check sent'}</i></span></div>`).join('')}</div></section>` : ''}`;
    }

    // ---------- company side: messages ----------
    function messages() {
      const h = hs(), all = everyone();
      const rows = Object.keys(h.contacted).map(id => ({ c: all.find(x => x.id === id), st: h.contacted[id] })).filter(r => r.c);
      return `
        <header class="pg-head"><div><h1>Messages</h1><p class="pg-sub">Chat requests you have sent, and how each person answered. Contact details appear only after a yes.</p></div><div class="pg-actions"><button class="btn btn-primary" data-tab="hire">Find talent</button></div></header>
        ${rows.length ? `<div class="pg-list pg-card">${rows.map(r => `<button class="pg-row" data-action="pg-h-open" data-id="${esc(r.c.id)}"><span class="pg-dot ${r.st === 'accepted' ? 'ok' : r.st === 'declined' ? '' : 'warn'}"></span><span><b>${esc(r.c.name)}</b><i>${r.st === 'accepted' ? 'Said yes. You can now contact them.' : r.st === 'declined' ? 'Not now' : 'Waiting for their answer' + (r.c.sample ? ' (answer as them in Job seeker view, Requests)' : '')}</i></span><em>Open</em></button>`).join('')}</div>` : '<p class="empty">No chat requests yet. Open Find talent and choose Request to chat.</p>'}`;
    }

    // ---------- events ----------
    const Rf = {}; // referee / document text typed on the Requests page
    function click(btn, a) {
      const h = hs(), d = btn.dataset;
      switch (a) {
        case 'pg-h-add': V.adding = !V.adding; V.err = ''; ctx.rerender(); if (V.adding) setTimeout(() => { const e = document.getElementById('hrLink'); if (e) e.focus(); }, 0); break;
        case 'pg-h-link-go': { const e = document.getElementById('hrLink'); if (addFromLink(e ? e.value : '')) { ctx.toast('Candidate added'); } ctx.rerender(); break; }
        case 'pg-h-tab': V.tab = d.v; ctx.rerender(); break;
        case 'pg-h-hide': h.hidden[d.id] = true; ctx.persist(); ctx.rerender(); ctx.toast('Hidden from your search'); break;
        case 'pg-h-share': { const c = everyone().find(x => x.id === d.id); if (c) ctx.copy(c.name + ' · ' + (c.role || '') + ' · ' + (c.location || '') + '\nProfile on Universal CV ID' + (c.sample ? ' (sample person)' : ''), 'Summary copied'); break; }
        case 'pg-h-savesearch': { const parts = [V.q, V.sector !== 'All' ? V.sector : '', V.full ? 'verified' : ''].filter(Boolean); h.searches.push({ name: cap(parts.join(' · ') || 'All candidates', 60), q: V.q, sector: V.sector, full: V.full }); h.searches = h.searches.slice(-12); ctx.persist(); ctx.rerender(); ctx.toast('Search saved'); break; }
        case 'pg-h-runsearch': { const x = h.searches[+d.i]; if (x) { V.q = x.q; V.sector = x.sector; V.full = !!x.full; ctx.rerender(); } break; }
        case 'pg-h-delsearch': h.searches.splice(+d.i, 1); ctx.persist(); ctx.rerender(); break;
        case 'pg-h-sector': V.sector = d.v; ctx.rerender(); break;
        case 'pg-h-open': V.open = d.id; V.item = ''; if (ctx.tab() !== 'hire') ctx.go('hire'); else { ctx.rerender(); window.scrollTo(0, 0); } break;
        case 'pg-h-back': V.open = ''; V.item = ''; ctx.rerender(); window.scrollTo(0, 0); break;
        case 'pg-h-item': V.item = V.item === d.k ? '' : d.k; ctx.rerender(); break;
        case 'pg-h-save': h.saved[d.id] = !h.saved[d.id]; if (!h.saved[d.id]) delete h.stage[d.id]; ctx.persist(); ctx.rerender(); break;
        case 'pg-h-contact': h.contacted[d.id] = 'sent'; if (!h.stage[d.id] || h.stage[d.id] === 'Saved') h.stage[d.id] = 'Contacted'; h.saved[d.id] = true; ctx.persist(); ctx.rerender(); ctx.toast('Message sent'); break;
        case 'pg-h-ask': h.asked[d.k] = true; ctx.persist(); ctx.rerender(); ctx.toast('Request sent'); break;
        case 'pg-h-copyask': { const c = everyone().find(x => x.id === d.id), i = c && c.items.find(x => x.k === d.k); if (i) ctx.copy(`Hi ${c.name.split(/\s+/)[0]},\n\nBefore we go further, could you get this checked on your CV ID: ${i.t} (${i.s})? A referee or a document is fine.\n\nThanks`, 'Note copied'); break; }
        case 'pg-h-reply': h.contacted[d.id] = d.v; if (d.v === 'accepted') h.stage[d.id] = h.stage[d.id] || 'Contacted'; ctx.persist(); ctx.rerender(); break;
        case 'pg-h-confirm': {
          const r = cap(Rf['ref:' + d.k], 120).trim(), doc = cap(Rf['doc:' + d.k], 120).trim();
          if (!r && !doc) { ctx.toast('Add a referee or a document name first.', true); break; }
          h.proof[d.k] = { by: r || 'Document: ' + doc, how: r ? 'Confirmed by the referee they named' : 'Supporting document provided', when: new Date().toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' }) };
          ctx.persist(); ctx.rerender(); ctx.toast('Sent. The badge now shows as Verified.'); break;
        }
        case 'pg-h-reset': ctx.armed(btn, 'Click again to reset', () => { ctx.store().hire = Object.assign(hs(), { asked: {}, contacted: {}, proof: {}, stage: {}, saved: {}, hidden: {} }); ctx.persist(); ctx.rerender(); }); break;
      }
    }
    function field(e) {
      const t = e.target, d = t.dataset, k = d && d.pg;
      if (!k || k.indexOf('h-') !== 0) return false;
      const isText = e.type === 'input', textLike = t.tagName === 'TEXTAREA' || (t.tagName === 'INPUT' && !['checkbox', 'radio'].includes(t.type));
      if ((isText && !textLike) || (!isText && textLike)) return true;
      const h = hs();
      switch (k) {
        case 'h-q': { V.q = t.value; const pos = t.selectionStart; ctx.rerender(); const n = document.querySelector('[data-pg="h-q"]'); if (n) { n.focus(); try { n.setSelectionRange(pos, pos); } catch (_) {} } break; }
        case 'h-full': V.full = t.checked; ctx.rerender(); break;
        case 'h-stage': h.stage[d.id] = STAGES.includes(t.value) ? t.value : 'Saved'; ctx.persist(); ctx.rerender(); break;
        case 'h-note': h.notes[d.id] = cap(t.value, 4000); ctx.save(); break;
        case 'h-ref': Rf['ref:' + d.k] = t.value; break;
        case 'h-doc': Rf['doc:' + d.k] = t.value; break;
        case 'h-link': break;
      }
      return true;
    }
    function submit() { return false; }
    return { render: { hire, shortlist, requests, messages }, click, field, submit, pending: () => { const h = hs(); let n = 0; samples().forEach(c => { if (h.contacted[c.id] === 'sent') n++; c.items.forEach(i => { if (h.asked[i.k] && !h.proof[i.k]) n++; }); }); return n; }, reset: () => { V.open = ''; V.item = ''; V.adding = false; } };
  };
})();
