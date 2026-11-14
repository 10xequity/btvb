/* Copied from 10xequity/afh assets/plan.js (v3.3, 2026-10-14) for facility-layout.html. Keep in step with that file. 
   FieldhouseUSA Aurora floor plan — one geometry, drawn by both the walk-in (index.html) and the site page (site.html).
   viewBox 0 0 820 650, rooms and zones from Exhibit A "Facility Site Map" (owner, 2026-10-14). Schematic, not to scale.
   Zones 1–7 keep Exhibit A's names and descriptors; courts are drawn as volleyball courts. */
(function(){
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const ROOMS=[
    {id:'bath1',x:34,y:48,w:61,h:104,label:['Bathroom','1']},
    {id:'office',x:100,y:48,w:88,h:104,label:['Admin'],area:'office'},
    {id:'shoot360',x:193,y:48,w:183,h:104,label:['S360','Basketball'],area:'shoot360'},
    {id:'massage',x:438,y:158,w:45,h:27,label:['Massage'],area:'massage',small:true},
    {id:'admin2',x:486,y:158,w:213,h:59,label:['Admin']},
    {id:'storage',x:703,y:158,w:80,h:66,label:['Storage /','Dock']},
    {id:'socialden',x:438,y:221,w:89,h:116,label:['Social','Den'],area:'socialden'},
    {id:'studio1',x:533,y:221,w:160,h:79,label:['Dance / Yoga','Studio 1'],area:'danceden'},
    {id:'bath2',x:723,y:229,w:60,h:70,label:['Bathroom','2']},
    {id:'odaup',x:438,y:341,w:99,h:66,label:['Bar / Kitchen','Oda Up'],area:'odaup'},
    {id:'studio2',x:542,y:341,w:62,h:66,label:['Studio 2'],area:'yogaden'},
  ];
  /* zone box, its courts, and Exhibit A's descriptor */
  const ZONES={
    1:{box:[22,195,172,199],courts:[[36,209,144,84],[36,303,144,84]],desc:['2 volleyball courts','or 1 basketball court']},
    3:{box:[199,195,184,199],courts:[[215,209,152,84],[215,303,152,84]],desc:['2 volleyball courts','or 1 basketball court']},
    2:{box:[22,398,172,208],courts:[[36,416,144,84],[36,510,144,84]],desc:['2 volleyball courts','or 1 basketball court']},
    4:{box:[199,398,184,208],courts:[[215,416,152,84],[215,510,152,84]],desc:['2 volleyball courts','or 1 basketball court']},
    5:{box:[438,51,345,104],courts:[[452,60,150,86],[618,60,150,86]],desc:['2 volleyball courts','/ sports court']},
    6:{box:[438,413,166,193],courts:[[452,427,138,80],[452,517,138,80]],desc:['2 volleyball courts','or 1 basketball court']},
    7:{box:[609,308,182,298],courts:[[623,322,154,86],[623,418,154,86],[623,514,154,86]],desc:['3 volleyball courts']}
  };
  function court(x,y,w,h){const mx=x+w/2,a=w/6;return `<rect class="court" x="${x}" y="${y}" width="${w}" height="${h}" rx="2"/>
    <line class="attack" x1="${mx-a}" y1="${y}" x2="${mx-a}" y2="${y+h}"/><line class="attack" x1="${mx+a}" y1="${y}" x2="${mx+a}" y2="${y+h}"/>
    <line class="net" x1="${mx}" y1="${y-4}" x2="${mx}" y2="${y+h+4}"/><circle class="post" cx="${mx}" cy="${y-4}" r="3"/><circle class="post" cx="${mx}" cy="${y+h+4}" r="3"/>`;}
  /* o.mini: compact (no labels) · o.areas: the areas array, to name zones · o.you: draw the position marker · o.route: draw the entrance-to-floor route */
  function svg(o={}){
    const mini=!!o.mini,areas=o.areas||[],tab=mini?-1:0;
    let s=`<svg class="plan${mini?' mini':''}" viewBox="0 0 820 650" role="group" aria-label="Facility site map"><rect class="shell" x="15" y="35" width="785" height="574" rx="4"/>`;
    s+=`<rect class="lot" x="205" y="4" width="420" height="24" rx="3"/><text class="lbl" x="520" y="21">Parking lot</text>`;
    s+=`<rect class="door" x="384" y="31" width="48" height="8"/><path class="arrow" d="M408 14 v22 m-6 -7 l6 7 l6 -7"/><text class="lbl-s" x="408" y="48">Main entrance</text>`;
    for(const r of ROOMS){
      s+=`<g ${r.area?`data-area="${r.area}" tabindex="${tab}" role="button" aria-label="${esc(r.label.join(' '))}"`:''}><rect class="room" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="2"/>`;
      const n=r.label.length,lh=r.small?11:14,y0=r.y+r.h/2+5-(n-1)*lh/2;
      r.label.forEach((t,i)=>s+=`<text class="${r.small?'lbl-s':'lbl'}" x="${r.x+r.w/2}" y="${y0+i*lh}">${esc(t)}</text>`);
      if(r.area)s+=`<rect class="hit" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}"/>`;s+='</g>';
    }
    for(const [n,z] of Object.entries(ZONES)){
      const a=areas.find(a=>a.zone==n);const [bx,by,bw,bh]=z.box;
      s+=`<g data-area="${a?a.id:''}" data-zone="${n}" tabindex="${tab}" role="button" aria-label="Zone ${n}, ${esc(z.desc.join(' '))}">`;
      s+=`<rect class="zbox" x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="3"/>`;
      z.courts.forEach(c=>s+=court(...c));
      const cy=by+bh/2;
      s+=`<text class="znum" x="${bx+bw/2}" y="${cy+2}">${n}</text>`;
      z.desc.forEach((t,i)=>s+=`<text class="zdesc" x="${bx+bw/2}" y="${cy+20+i*13}">${esc(t)}</text>`);
      s+=`<rect class="hit" x="${bx}" y="${by}" width="${bw}" height="${bh}"/></g>`;
    }
    s+=`<text class="lbl-s foot" x="22" y="632" style="text-anchor:start">Zones 1–4: convertible courts (8 volleyball / 4 basketball / 12 pickleball). Schematic, not to scale.</text>`;
    if(o.route)s+=`<path id="route" d="M408 60 C 408 100, 404 140, 410 180 S 414 300, 408 400 S 404 520, 410 600"/><path id="route-head" d="M410 612 l -9 -16 h 18 z"/>`;
    if(o.you!==false)s+=`<g class="youg"><path class="cone" d="M0 0 L-34 70 L34 70 Z"/><circle class="you" r="9"/></g>`;
    return s+'</svg>';
  }
  function areaPos(a){
    if(a.zone&&ZONES[a.zone]){const [x,y,w,h]=ZONES[a.zone].box;return [x+w/2,y+h/2,0];}
    const r=ROOMS.find(r=>r.id===a.map);return r?[r.x+r.w/2,r.y+r.h/2,0]:[408,45,0];
  }
  window.FHPLAN={ROOMS,ZONES,svg,areaPos};
})();
