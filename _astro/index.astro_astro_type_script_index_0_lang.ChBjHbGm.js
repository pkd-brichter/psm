const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/index.B-QZfLCy.js","_astro/index.D1c2XijN.js","_astro/leaflet-src.BcflbDBd.js","_astro/_commonjsHelpers.Cpj98o6Y.js","_astro/leaflet.C03ySvDx.css"])))=>i.map(i=>d[i]);
import{M as ce,N as ws,J as et,O as wo,P as xo,Q as xs,h as Pt,l as So,a as Ss,s as lt,n as Eo,q as Es,p as hi,e as j,r as On,C as _n,u as Ue,_ as Ut,R as Lo,S as $o,w as b,t as B,m as vi,T as Do,j as hn,k as yi,U as zo,V as Ao,W as We,X as Po,Y as Ls,Z as $s,H as Ds,G as Kn,$ as Mo,a0 as Co,a1 as Io,a2 as Bo,a3 as No,a4 as Xa,z as Ga,a5 as Fo,x as To,a6 as Je,a7 as Ye,a8 as qo,a9 as en,aa as Ho,ab as Oo,D as _o,ac as zs,ad as As,ae as Ua,af as Ko,ag as Ro,ah as Wo,ai as ki,aj as ur,ak as pr,al as jo,am as Go,an as Uo,ao as Vo,ap as Zo,aq as Qo,ar as Jo,as as Ps,at as Yo,au as Ms,av as Xo,aw as Ur,ax as Er,ay as Pn,az as Vr,aA as el,aB as tl,aC as Rn,aD as wi,aE as al,aF as xi,aG as za,aH as Si,aI as nl,aJ as Ei,aK as Li,aL as rl,aM as il,aN as sl,aO as ol,aP as Lr,v as Cs,i as ll,b as cl,c as dl}from"./index.D1c2XijN.js";const $r="__psl_history_seeded",Dr=200,$i=["Salat","Apfel","Wein","Tomate","Kartoffel","Hopfen","Raps","Birne"],Di=["Spritzung","Düngung","Pflege","Behandlung"],zi=["LACES","MALDO","VITVI","SOLTU","PRNUS","CUPAR","CYNCR","ALLCE"],Ai=["BBCH 10","BBCH 31","BBCH 41","BBCH 55","BBCH 65","BBCH 71","BBCH 81"],ul=[{mediumId:"seed-water",name:"Wasser",unit:"L",methodId:"perKiste",methodLabel:"pro Kiste",value:.02,zulassungsnummer:"N/A"},{mediumId:"seed-tonikum",name:"Tonikum X",unit:"ml",methodId:"perKiste",methodLabel:"pro Kiste",value:.85,zulassungsnummer:"Z-123456"},{mediumId:"seed-oel",name:"Pflegeöl Y",unit:"ml",methodId:"percentWater",methodLabel:"% vom Wasser",value:.12,zulassungsnummer:"Z-654321"}];function pl(e){if(typeof window>"u")return;const a=new URLSearchParams(window.location.search).has("seedHistory");if(!a)return;const n=window;n.__PSL||(n.__PSL={});const r=n.__PSL;r.seedHistoryEntries=(o=Dr)=>Pi(e,{count:o}),r.resetHistorySeedFlag=()=>localStorage.removeItem($r),!a&&!localStorage.getItem($r)&&ce()==="sqlite"&&Pi(e,{count:Dr,setFlag:!0}).catch(o=>{console.error("History seeding failed",o)})}async function fl(e){if(!e.state.getState().app?.hasDatabase){if(typeof e.state.subscribe!="function")throw new Error("SQLite-Datenbank ist noch nicht initialisiert.");await new Promise((t,a)=>{const n=window.setTimeout(()=>{s(),a(new Error("SQLite-Datenbank wurde nicht rechtzeitig initialisiert."))},1e4),r=e.state.subscribe?.(o=>{o.app?.hasDatabase&&(s(),t())}),s=()=>{window.clearTimeout(n),typeof r=="function"&&r()}})}}async function Pi(e,t={}){const a=t.count??Dr;if(ce()!=="sqlite")throw new Error("SQLite-Treiber muss aktiv sein, bevor Daten befüllt werden können.");await fl(e);const n=performance.now();let r=0;for(let s=0;s<a;s+=1){const o=ml(s);await ws(o),r+=1}try{await et()}catch(s){console.warn("Seed-Daten konnten nicht persistent gespeichert werden",s)}return e.events.emit("history:data-changed",{source:"dev-history-seed"}),t.setFlag&&localStorage.setItem($r,"1"),{inserted:r,durationMs:performance.now()-n}}function ml(e){const t=new Date;t.setDate(t.getDate()-e);const a=t.toLocaleDateString("de-DE"),n=t.toISOString(),r=20+e%30,s=Number((r*.5).toFixed(2));return{datum:a,dateIso:n,ersteller:`Seeder ${1+e%5}`,standort:`Test-Ort ${String.fromCharCode(65+e%6)}`,kultur:$i[e%$i.length],usageType:Di[e%Di.length],kisten:r,eppoCode:zi[e%zi.length],bbch:Ai[e%Ai.length],gps:`GPS-Notiz ${e}`,gpsCoordinates:{latitude:48+e%10*.01,longitude:11+e%10*.01},gpsPointId:`seed-gps-${e}`,invekos:`INV-${String(1e3+e).padStart(4,"0")}`,uhrzeit:`${String(6+e%12).padStart(2,"0")}:${String(e*7%60).padStart(2,"0")}`,savedAt:n,items:gl(e,r,s)}}function gl(e,t,a){return ul.map((n,r)=>{const s=1+(e+r)%4*.05,o=Number((n.value*s).toFixed(4)),l=Number((o*t).toFixed(2));return{id:`seed-item-${e}-${r}`,name:n.name,unit:n.unit,methodLabel:n.methodLabel,methodId:n.methodId,value:o,total:l,inputs:{kisten:t,waterVolume:a},zulassungsnummer:n.zulassungsnummer,mediumId:n.mediumId}})}let Gt=null,Aa=null,Mi=!1,Ci=!1;async function bl(){if(!("serviceWorker"in navigator))return console.warn("[PWA] Service Workers nicht unterstützt"),null;try{return Aa=await navigator.serviceWorker.register("/psm/sw.js",{scope:"/psm/",updateViaCache:"none"}),console.log("[PWA] Service Worker registriert:",Aa.scope),Aa.addEventListener("updatefound",()=>{const e=Aa?.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&(console.log("[PWA] Neues Update verfügbar"),ba("pwa:update-available"))})}),navigator.serviceWorker.addEventListener("message",hl),Mi||(Mi=!0,navigator.serviceWorker.addEventListener("controllerchange",()=>{Ci||(Ci=!0,window.location.reload())})),Aa}catch(e){return console.error("[PWA] Service Worker Registrierung fehlgeschlagen:",e),null}}function hl(e){const{type:t,payload:a}=e.data||{};switch(t){case"DB_STATE":ba("pwa:db-state",a);break;case"CACHES_CLEARED":ba("pwa:caches-cleared");break}}async function tr(e){if(!navigator.serviceWorker.controller){localStorage.setItem("psm-db-state",JSON.stringify({...e,updatedAt:new Date().toISOString()}));return}navigator.serviceWorker.controller.postMessage({type:"SET_DB_STATE",payload:e})}async function Is(){const e=localStorage.getItem("psm-db-state");if(e)try{return JSON.parse(e)}catch{}return navigator.serviceWorker?.controller?new Promise(t=>{const a=n=>{n.data?.type==="DB_STATE"&&(navigator.serviceWorker.removeEventListener("message",a),t(n.data.payload))};navigator.serviceWorker.addEventListener("message",a),navigator.serviceWorker.controller.postMessage({type:"GET_DB_STATE"}),setTimeout(()=>{navigator.serviceWorker.removeEventListener("message",a),t(null)},1e3)}):null}async function vl(){const e=await Is();return!!(e?.hasDatabase&&e?.autoStartEnabled)}function yl(){window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),Gt=e,console.log("[PWA] Install Prompt verfügbar"),localStorage.getItem("psm-app-installed")==="true"&&(console.log("[PWA] Widerspruch erkannt: Flag sagt installiert, aber Prompt verfügbar"),localStorage.removeItem("psm-app-installed"),console.log("[PWA] Veraltetes Installations-Flag entfernt")),ba("pwa:install-available")}),window.addEventListener("appinstalled",()=>{Gt=null,nr(),console.log("[PWA] App installiert - Flag gesetzt"),ba("pwa:installed")})}function ar(){return Gt!==null}function Qt(){return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0}function Zr(){const e=navigator.userAgent.toLowerCase();return e.includes("edg/")?"edge":e.includes("chrome")&&!e.includes("edg")?"chrome":e.includes("firefox")?"firefox":e.includes("safari")&&!e.includes("chrome")?"safari":"other"}function Qr(){return!!(Qt()||localStorage.getItem("psm-app-installed")==="true"||window.matchMedia("(display-mode: fullscreen)").matches||window.matchMedia("(display-mode: minimal-ui)").matches||window.matchMedia("(display-mode: window-controls-overlay)").matches)}async function Bs(){if(Qr())return!0;try{if("getInstalledRelatedApps"in navigator){const e=await navigator.getInstalledRelatedApps();if(console.log("[PWA] getInstalledRelatedApps result:",e),e&&e.length>0)return nr(),!0}}catch(e){console.warn("[PWA] getInstalledRelatedApps API Fehler:",e)}return!1}function nr(){localStorage.setItem("psm-app-installed","true"),console.log("[PWA] App als installiert markiert")}function kl(){localStorage.removeItem("psm-app-installed"),console.log("[PWA] Installations-Flag entfernt")}function Ns(){const e=Zr(),t=Qt(),a=Qr();return{canInstall:ar(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function Fs(){const e=Zr(),t=Qt(),a=await Bs();return{canInstall:ar(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function wl(){if(!Gt)return console.warn("[PWA] Kein Install Prompt verfügbar"),!1;try{await Gt.prompt();const{outcome:e}=await Gt.userChoice;return console.log("[PWA] Install Prompt Ergebnis:",e),e==="accepted"&&nr(),Gt=null,e==="accepted"}catch(e){return console.error("[PWA] Install Prompt fehlgeschlagen:",e),!1}}function xl(e){if(!("launchQueue"in window)){console.log("[PWA] Launch Queue API nicht verfügbar");return}window.launchQueue?.setConsumer(async t=>{if(!t.files?.length){console.log("[PWA] Launch ohne Dateien");return}console.log("[PWA] Datei via Launch Queue empfangen:",t.files.length);for(const a of t.files)try{await e(a),await tr({hasDatabase:!0,fileHandleName:a.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0});break}catch(n){console.error("[PWA] Fehler beim Öffnen der Datei:",n)}}),console.log("[PWA] File Handling initialisiert")}const Tt="psm-file-handles",Jr="last-database";async function zr(e){try{const t=await Yr(),n=t.transaction(Tt,"readwrite").objectStore(Tt);await new Promise((r,s)=>{const o=n.put({key:Jr,handle:e,savedAt:new Date().toISOString()});o.onsuccess=()=>r(),o.onerror=()=>s(o.error)}),t.close(),console.log("[PWA] FileHandle gespeichert"),await tr({hasDatabase:!0,fileHandleName:e.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}catch(t){console.error("[PWA] FileHandle speichern fehlgeschlagen:",t)}}async function Ar(){try{const e=await Yr(),a=e.transaction(Tt,"readonly").objectStore(Tt),n=await new Promise((s,o)=>{const l=a.get(Jr);l.onsuccess=()=>s(l.result),l.onerror=()=>o(l.error)});if(e.close(),!n?.handle)return null;const r=n.handle;return typeof r.queryPermission=="function"&&await r.queryPermission({mode:"readwrite"})==="granted"?(console.log("[PWA] FileHandle mit Berechtigung geladen"),n.handle):(console.log("[PWA] FileHandle gefunden, aber Berechtigung erforderlich"),n.handle)}catch(e){return console.error("[PWA] FileHandle laden fehlgeschlagen:",e),null}}async function Sl(e){try{const t=e;return typeof t.requestPermission!="function"?(await e.getFile(),!0):await t.requestPermission({mode:"readwrite"})==="granted"}catch{return!1}}async function El(){try{const e=await Yr(),a=e.transaction(Tt,"readwrite").objectStore(Tt);await new Promise((n,r)=>{const s=a.delete(Jr);s.onsuccess=()=>n(),s.onerror=()=>r(s.error)}),e.close(),await tr({hasDatabase:!1,autoStartEnabled:!1}),console.log("[PWA] FileHandle gelöscht")}catch(e){console.error("[PWA] FileHandle löschen fehlgeschlagen:",e)}}async function Yr(){return new Promise((e,t)=>{const a=indexedDB.open("psm-file-handles",1);a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result),a.onupgradeneeded=n=>{const r=n.target.result;r.objectStoreNames.contains(Tt)||r.createObjectStore(Tt,{keyPath:"key"})}})}function ba(e,t){window.dispatchEvent(new CustomEvent(e,{detail:t}))}function Ts(){return{serviceWorker:"serviceWorker"in navigator,fileSystemAccess:typeof window.showOpenFilePicker=="function",launchQueue:"launchQueue"in window,indexedDB:"indexedDB"in window,standalone:Qt(),installAvailable:ar()}}async function Ll(e){if(console.log("[PWA] Initialisierung..."),await bl(),yl(),e?.onFileOpened&&xl(e.onFileOpened),e?.onAutoStart&&await vl()){const t=await Ar();if(t){const a=t;let n=!1;if(typeof a.queryPermission=="function"&&(n=await a.queryPermission({mode:"readwrite"})==="granted"),n){console.log("[PWA] Auto-Start mit gespeicherter Datei"),e.onFileOpened&&await e.onFileOpened(t);return}console.log("[PWA] Auto-Start: Berechtigung für Datei erforderlich"),ba("pwa:permission-required",{handle:t})}}console.log("[PWA] Capabilities:",Ts())}async function $l(){if(console.group("🔧 PWA Debug Status"),console.log("📱 Standalone Mode:",Qt()),console.log("💾 localStorage Flag:",localStorage.getItem("psm-app-installed")),console.log("🔔 Install Prompt verfügbar:",ar()),console.log("🌐 Browser:",Zr()),console.group("📺 Display Mode Checks"),console.log("standalone:",window.matchMedia("(display-mode: standalone)").matches),console.log("fullscreen:",window.matchMedia("(display-mode: fullscreen)").matches),console.log("minimal-ui:",window.matchMedia("(display-mode: minimal-ui)").matches),console.log("window-controls-overlay:",window.matchMedia("(display-mode: window-controls-overlay)").matches),console.log("browser:",window.matchMedia("(display-mode: browser)").matches),console.groupEnd(),console.group("🔍 getInstalledRelatedApps API"),"getInstalledRelatedApps"in navigator)try{const e=await navigator.getInstalledRelatedApps();console.log("Installierte Apps:",e)}catch(e){console.log("API Fehler:",e)}else console.log("API nicht verfügbar");console.groupEnd(),console.group("📊 Status Vergleich"),console.log("Sync (isProbablyInstalled):",Qr()),console.log("Async (checkIfInstalled):",await Bs()),console.log("getInstallStatus():",Ns()),console.log("getInstallStatusAsync():",await Fs()),console.groupEnd(),console.log("💡 Tipp: clearInstalledFlag() zum Zurücksetzen des Flags"),console.groupEnd()}typeof window<"u"&&(window.pwaDebug=$l,window.pwaClearFlag=kl);let vn=!1;function Dl(e){const t=r=>{if(vn){vn=!1;return}return r.preventDefault(),r.returnValue="",""};let a=!1;const n=r=>{const s=!!r.app?.hasDatabase;s&&!a?(window.addEventListener("beforeunload",t),a=!0):!s&&a&&(window.removeEventListener("beforeunload",t),a=!1)};n(e.getState()),e.subscribe(n),document.addEventListener("click",r=>{const s=r.target.closest("a");s&&s.target==="_blank"&&(vn=!0,setTimeout(()=>{vn=!1},100))})}function zl(){const e=document.getElementById("app-root");if(!e)throw new Error("app-root Container fehlt");return{startup:e.querySelector('[data-region="startup"]'),shell:e.querySelector('[data-region="shell"]'),main:e.querySelector('[data-region="main"]'),footer:e.querySelector('[data-region="footer"]')}}async function Al(){if(wo()){window.location.replace("/psm/m/");return}zl(),xo();const e=xs();e!=="memory"&&Pt(e),await So();const t={state:{getState:j,patchState:hi,updateSlice:Ue,subscribe:_n},events:{emit:On,subscribe:lt}};pl(t),Ss(),Dl(t.state),Ll({onFileOpened:async a=>{const n=await Ut(()=>import("./index.D1c2XijN.js").then(s=>s.aR),[]),r=await Ut(()=>import("./index.D1c2XijN.js").then(s=>s.aQ),[]);if(r.isSupported()){n.setActiveDriver("sqlite");const s=await a.getFile(),o=await s.arrayBuffer(),l=await r.importFromArrayBuffer(o,s.name);await zr(a);const{applyDatabase:d}=await Ut(async()=>{const{applyDatabase:f}=await import("./index.D1c2XijN.js").then(u=>u.aT);return{applyDatabase:f}},[]);d(l.data),On("database:connected",{driver:"sqlite",autoStarted:!0})}}}),lt("database:connected",async a=>{await tr({hasDatabase:!0,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}),lt("database:connected",async a=>{if(ce()==="sqlite")try{await Eo(),await Es()}catch(n){console.warn("GPS-Punkte konnten beim Start nicht geladen werden",n)}}),hi({app:{...j().app,ready:!0}})}const Ii="__pflanzenschutz_bootstrapped__",Bi=window;function Ni(){Al().catch(e=>{console.error("bootstrap failed",e)})}Bi[Ii]||(Bi[Ii]=!0,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ni,{once:!0}):Ni());const qs=[{id:"start",label:"Start",icon:"bi-grid-1x2",sections:[{section:"dashboard",label:"Übersicht",icon:"bi-grid-1x2"}]},{id:"psm",label:"PSM",icon:"bi-flower1",sections:[{section:"calc",label:"Neu erfassen",icon:"bi-pencil-square"},{section:"documentation",label:"Übersicht",icon:"bi-list-ul"},{section:"lager",label:"Lager",icon:"bi-box-seam"},{section:"settings",label:"Einstellungen",icon:"bi-gear"}]},{id:"acker",label:"Acker-Planer",icon:"bi-map",sections:[{section:"acker",label:"Karte",icon:"bi-map"},{section:"kultur",label:"Kulturführung",icon:"bi-clipboard2-pulse"}]},{id:"fotos",label:"Fotos",icon:"bi-camera",sections:[{section:"fotos",label:"Fotos",icon:"bi-camera"}]},{id:"daten",label:"Daten",icon:"bi-database",sections:[{section:"daten",label:"Import",icon:"bi-cloud-upload"}]}],Hs={dashboard:"start",calc:"psm",documentation:"psm",lager:"psm",history:"psm",report:"psm",acker:"acker",kultur:"acker",fotos:"fotos",settings:"psm",gps:"psm",lookup:"psm",import:"daten",daten:"daten"};function Os(e){return qs.find(t=>t.id===e)}function Pl(e){const t=Hs[e];return t?Os(t):void 0}function Ml(){const e=document.getElementById("offline-indicator");if(!e)return;const t=()=>{const a=!navigator.onLine;e.classList.toggle("d-none",!a)};t(),window.addEventListener("online",t),window.addEventListener("offline",t)}function Fi(e){j().app.activeSection!==e&&(Ue("app",t=>({...t,activeSection:e})),On("app:sectionChanged",e))}function Ti(){Ml();const e=document.querySelectorAll(".nav-btn[data-area]"),t=document.getElementById("brand-link"),a=document.getElementById("topnav-tabs"),n=document.getElementById("topnav-area-icon"),r=document.getElementById("topnav-area-label"),s={};for(const h of qs)s[h.id]=h.sections[0].section;let o=null;function l(h,S){if(a){if(h.sections.length<=1){a.innerHTML="";return}a.innerHTML=h.sections.map(x=>`
        <button type="button" class="topnav-tab${x.section===S?" active":""}" data-section="${x.section}">
          <i class="bi ${x.icon}"></i><span>${x.label}</span>
        </button>`).join("")}}function d(h){a&&a.querySelectorAll(".topnav-tab").forEach(S=>{S.classList.toggle("active",S.dataset.section===h)})}const f=h=>{const S=Os(h);!S||!j().app.hasDatabase||Fi(s[h]??S.sections[0].section)};e.forEach(h=>{h.addEventListener("click",()=>{const S=h.dataset.area;S&&f(S)})}),t?.addEventListener("click",h=>{h.preventDefault(),f("start")}),a?.addEventListener("click",h=>{const x=h.target?.closest(".topnav-tab")?.dataset.section;x&&Fi(x)});const u=document.querySelector('.nav-btn[data-action="share-data"]');u?.addEventListener("click",()=>{u.disabled=!0,Ut(async()=>{const{shareMobileData:h}=await import("./index.B-QZfLCy.js");return{shareMobileData:h}},__vite__mapDeps([0,1])).then(({shareMobileData:h})=>h()).catch(h=>console.error("Teilen fehlgeschlagen",h)).finally(()=>{u.disabled=!1})}),Lo(),lt("history:data-changed",h=>{if(!document.body.classList.contains("mobile-mode"))return;const S=h?.type;(S==="created"||S==="created-bulk")&&$o()});const g=h=>{const S=document.getElementById("brand-title"),x=document.getElementById("brand-tagline"),E=document.getElementById("app-version");S&&h.company.name&&(S.textContent=h.company.name),x&&h.company.headline&&(x.textContent=h.company.headline),E&&h.app.version&&(E.textContent=`v${h.app.version}`);const I=h.app.hasDatabase,V=h.app.activeSection,R=Pl(V);R&&Hs[V]===R.id&&(s[R.id]=V),e.forEach(ke=>{ke.disabled=!I;const F=I&&R?.id===ke.dataset.area;ke.classList.toggle("active",!!F)}),R&&(n&&(n.className=`bi ${R.icon} topnav-area-icon`),r&&(r.textContent=R.label),o!==R.id?(l(R,V),o=R.id):d(V))};_n(g),g(j());let v=!1;const w=document.title||"Pflanzenschutz";window.addEventListener("beforeprint",()=>{v||(v=!0,document.title=" ")}),window.addEventListener("afterprint",()=>{v&&(v=!1,document.title=w)})}function Cl(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ti,{once:!0}):Ti()}Cl();const Il="https://api.digitale-psm.de",Bl="digitale-psm.de";async function Nl(e){try{const t=await fetch(`${Il}/api/v1/${Bl}/views/${e}`,{method:"POST",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`API error: ${t.status}`);return(await t.json()).views}catch(t){return console.warn("[ViewCounter] Fehler beim Zählen:",t),null}}function Fl(e){return e>=1e6?(e/1e6).toFixed(1).replace(".",",")+"M":e>=1e3?(e/1e3).toFixed(1).replace(".",",")+"K":e.toString()}const Pr="pflanzenschutz-datenbank.json";let qi=!1;function Tl(e){return e?`${e.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"pflanzenschutz-datenbank"}.json`:Pr}async function Pa(e,t){if(!e){await t();return}const a=e.textContent??"";e.disabled=!0,e.dataset.busy="true",e.textContent="Bitte warten...";try{await t()}finally{e.disabled=!1,e.dataset.busy="false",e.textContent=a}}function Hi(e){return b(e)}function ql(e){const t=document.createElement("section");t.className="section-container d-none",t.innerHTML=`
    <div class="section-inner">
      <div class="card startup-card">
        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="mb-0" style="color: var(--color-primary);">Neue Datenbank</h2>
            <button type="button" class="btn btn-psm-secondary-outline" data-action="wizard-back">
              <i class="bi bi-arrow-left me-1"></i>Zurück
            </button>
          </div>
          <form id="database-wizard-form" class="text-start">
            <div class="row mb-4">
              <div class="col-md-6 mb-3 mb-md-0">
                <label class="form-label d-block mb-2" for="wizard-company-name">
                  Firmenname <span class="text-danger">*</span>
                </label>
                <input class="form-control" id="wizard-company-name" name="wizard-company-name" required value="${Hi(e.name)}" placeholder="z.B. Gärtnerei Müller" />
              </div>
              <div class="col-md-6">
                <label class="form-label d-block mb-2" for="wizard-company-headline">
                  Überschrift <span class="text-muted small">(optional)</span>
                </label>
                <input class="form-control" id="wizard-company-headline" name="wizard-company-headline" value="${Hi(e.headline)}" placeholder="z.B. Pflanzenschutz-Dokumentation 2025" />
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-12">
                <label class="form-label d-block mb-2" for="wizard-company-address">
                  Adresse <span class="text-muted small">(optional)</span>
                </label>
                <textarea class="form-control" id="wizard-company-address" name="wizard-company-address" rows="2" placeholder="Straße, PLZ Ort">${b(e.address)}</textarea>
              </div>
            </div>
            <div class="d-flex gap-3">
              <button type="submit" class="btn btn-psm-primary btn-lg px-4">
                <i class="bi bi-database-add me-2"></i>Erstellen
              </button>
              <button type="button" class="btn btn-psm-secondary-outline px-4" data-action="wizard-back">Abbrechen</button>
            </div>
          </form>
        </div>
      </div>
      <div class="card startup-card mt-4 d-none" data-role="wizard-result">
        <div class="card-body p-4">
          <h3 class="mb-3" style="color: var(--color-primary);">✓ Datenbank erstellt</h3>
          <p class="mb-2">Dateiname: <code style="color: var(--color-info);" data-role="wizard-filename"></code></p>
          <div class="d-flex gap-2 mb-3">
            <button type="button" class="btn btn-psm-primary px-4" data-action="wizard-save">
              <i class="bi bi-download me-2"></i>Speichern
            </button>
          </div>
          <p class="small mb-2 text-muted" data-role="wizard-save-hint"></p>
          <details>
            <summary class="small mb-2 text-muted" style="cursor: pointer;">Vorschau anzeigen</summary>
            <pre class="rounded p-3 small overflow-auto mt-2" style="background: var(--color-bg-elevated); max-height: 14rem;" data-role="wizard-preview"></pre>
          </details>
        </div>
      </div>
    </div>
  `;const a=t.querySelector("#database-wizard-form");if(!a)throw new Error("Wizard-Formular konnte nicht erzeugt werden");const n=t.querySelector('[data-role="wizard-result"]');if(!n)throw new Error("Wizard-Resultat-Container fehlt");return{section:t,form:a,resultCard:n,preview:t.querySelector('[data-role="wizard-preview"]'),filenameLabel:t.querySelector('[data-role="wizard-filename"]'),saveHint:t.querySelector('[data-role="wizard-save-hint"]'),saveButton:t.querySelector('[data-action="wizard-save"]'),reset(){a.reset(),n.classList.add("d-none");const r=t.querySelector('[data-role="wizard-preview"]');r&&(r.textContent="");const s=t.querySelector('[data-role="wizard-filename"]');s&&(s.textContent="")}}}function Hl(e,t){if(!e||qi)return;const a=e;let n=null,r=Pr,s="landing";const l=t.state.getState().company,d=document.createElement("section");d.className="section-container";function f(T,$){const P=T;d.innerHTML=`
    <div class="section-inner">
      <div class="card startup-card" style="position: relative;">
        <div class="card-body text-center py-5">
          <!-- Branding Logo oben links -->
          <div style="position: absolute; top: 0.75rem; left: 0.75rem;">
            <div class="d-flex align-items-center gap-2">
              <img src="/psm/assets/img/favicon.svg" alt="PSM" style="width: 28px; height: 28px;" />
              <div style="text-align: left; line-height: 1.1;">
                <span style="font-size: 0.9rem; font-weight: 600; color: var(--text);">Digitale<span style="color: var(--primary-600);">-</span>PSM<span style="font-weight: 400; opacity: 0.5; font-size: 0.75rem;">.de</span></span>
              </div>
            </div>
          </div>
          
          <!-- Sekundäre Aktion + Sprachumschalter oben rechts -->
          <div style="position: absolute; top: 0.75rem; right: 0.75rem; display: flex; align-items: center; gap: 0.85rem;">
            ${P?`<button class="btn btn-link p-0" style="color: var(--text-muted); text-decoration: none; font-size: 0.85rem;" data-action="start-wizard">
                  <i class="bi bi-plus-lg me-1"></i>Neu erstellen
                </button>`:`<button class="btn btn-link p-0" style="color: var(--text-muted); text-decoration: none; font-size: 0.85rem;" data-action="open">
                  <i class="bi bi-folder2-open me-1"></i>Datei öffnen
                </button>`}
            <div class="lang-switch" data-role="lang-switch" role="group" aria-label="Sprache / Język">
              <button type="button" class="lang-btn" data-lang="de" title="Deutsch">DE</button>
              <button type="button" class="lang-btn" data-lang="pl" title="Polski">PL</button>
            </div>
          </div>
          
          <!-- Info & Lizenz + Statistik Links unten links -->
          <div style="position: absolute; bottom: 0.75rem; left: 0.75rem; display: flex; gap: 1rem; align-items: center;">
            <a href="https://info.digitale-psm.de" target="_blank" rel="noopener noreferrer" style="color: var(--text-muted); text-decoration: none; font-size: 0.8rem; transition: color 0.2s;">
              <i class="bi bi-info-circle me-1"></i>Info & Lizenz
            </a>
            <a href="https://st.digitale-psm.de" target="_blank" rel="noopener noreferrer" style="color: var(--text-muted); text-decoration: none; font-size: 0.8rem; transition: color 0.2s;">
              <i class="bi bi-bar-chart-line me-1"></i>Statistik
            </a>
            <span id="startup-view-counter" style="color: var(--text-dim); font-size: 0.75rem; display: inline-flex; align-items: center; gap: 0.3rem;">
              <i class="bi bi-eye"></i>
              <span data-role="view-count">–</span>
            </span>
          </div>
          
          <div style="padding-top: 1rem;">
            ${P?`<!-- Szenario 2: Hat Datei → Fortsetzen im Fokus -->
                <i class="bi bi-arrow-right-circle fs-1 mb-3 d-block" style="color: #3b82f6; opacity: 0.9;"></i>
                <h2 class="mb-3" style="font-size: 1.5rem; color: #3b82f6;">Weiterarbeiten</h2>
                <p class="mb-4" style="color: var(--text-muted);">
                  Deine zuletzt verwendete Datei öffnen
                </p>
                
                <!-- Fortsetzen Banner -->
                <div id="auto-start-banner" class="mb-4 p-4 rounded-3" style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3);">
                  <p class="mb-2" style="color: var(--text-muted); font-size: 0.85rem;">
                    <i class="bi bi-clock-history me-1"></i>Zuletzt verwendet
                  </p>
                  <p class="mb-3" style="color: var(--text); font-size: 1.1rem; font-weight: 500;" data-role="auto-start-filename"></p>
                  <div class="d-flex justify-content-center align-items-center gap-2">
                    <button class="btn btn-lg px-5 py-3" style="background: #3b82f6; color: #fff; font-weight: 600; font-size: 1.1rem; border: none;" data-action="auto-start">
                      <i class="bi bi-arrow-right-circle-fill me-2"></i>Fortsetzen
                    </button>
                    <button class="btn px-2 py-2" style="background: transparent; color: var(--text-dim); border: 1px solid var(--color-border);" data-action="auto-start-forget" title="Aus Liste entfernen">
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>
                
                <!-- Sekundär: Andere Datei öffnen -->
                <div class="d-flex justify-content-center">
                  <button class="btn px-4 py-2" style="background: transparent; color: var(--text-muted); border: 1px solid var(--color-border); font-size: 0.9rem;" data-action="open">
                    <i class="bi bi-folder2-open me-2"></i>Andere Datei öffnen
                  </button>
                </div>`:`<!-- Szenario 1 & 3: Neuer User → Neu erstellen im Fokus -->
                <i class="bi bi-database-add fs-1 mb-3 d-block" style="color: #22c55e; opacity: 0.9;"></i>
                <h2 class="mb-3" style="font-size: 1.5rem; color: #22c55e;">Willkommen</h2>
                <p class="mb-4" style="color: var(--text-muted);">
                  Erstelle eine neue Datenbank oder öffne eine bestehende Datei
                </p>
                
                <!-- Hauptaktion: Neu erstellen -->
                <div class="d-flex justify-content-center mb-4">
                  <button class="btn btn-lg px-5 py-3" style="font-size: 1.1rem; background: #22c55e; color: #fff; font-weight: 600; border: none;" data-action="start-wizard">
                    <i class="bi bi-plus-circle-fill me-2"></i>Neu erstellen
                  </button>
                </div>
                
                <!-- Sekundär: Datei öffnen -->
                <div class="d-flex justify-content-center">
                  <button class="btn px-4 py-2" style="background: transparent; color: var(--text-muted); border: 1px solid var(--color-border); font-size: 0.9rem;" data-action="open">
                    <i class="bi bi-folder2-open me-2"></i>Bestehende Datei öffnen
                  </button>
                </div>`}
            
            <!-- PWA Banner - nur wenn nicht in App -->
            <div id="pwa-install-banner" class="d-none mt-4">
              <hr class="my-3" style="border-color: var(--color-border);" />
              <div data-role="pwa-content">
                <!-- Wird dynamisch gefüllt -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}f(!1,Qt());const u=ql(l);a.innerHTML="",a.appendChild(d),a.appendChild(u.section);const g=typeof window<"u"&&typeof window.showSaveFilePicker=="function";u.saveButton&&(g?u.saveHint&&(u.saveHint.textContent='Der Browser fragt nach einem Speicherort. Die erzeugte Datei kannst du später über "Bestehende Datei verbinden" erneut laden.'):(u.saveButton.disabled=!0,u.saveButton.textContent="Datei speichern (nicht verfügbar)",u.saveHint&&(u.saveHint.textContent="Dieser Browser unterstützt keinen direkten Dateidialog. Bitte nutze einen Chromium-basierten Browser (z. B. Chrome, Edge) über HTTPS oder http://localhost.")));function v(T=t.state.getState()){const $=!!T.app?.hasDatabase;if(a.classList.toggle("d-none",$),$){d.classList.add("d-none"),u.section.classList.add("d-none");return}s==="wizard"?(d.classList.add("d-none"),u.section.classList.remove("d-none")):(d.classList.remove("d-none"),u.section.classList.add("d-none"))}async function w(T){await Pa(T,async()=>{try{const $=ce();$==="sqlite"||$==="filesystem"?Pt($):Pt("filesystem")}catch($){throw B.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),$ instanceof Error?$:new Error("Dateisystem nicht verfügbar")}try{const $=await Do();hn($.data);const P=$.context;P?.fileHandle&&await zr(P.fileHandle),t.events.emit("database:connected",{driver:ce()})}catch($){console.error("Fehler beim Öffnen der Datenbank",$),B.error($ instanceof Error?$.message:"Öffnen der Datenbank fehlgeschlagen")}})}function h(T){Pa(T,async()=>{const $=vi(),P=["localstorage","sqlite","memory"];for(const ie of P)try{Pt(ie);const te=await yi($);hn(te.data),t.events.emit("database:connected",{driver:ce()||ie});return}catch(te){console.warn(`Treiber ${ie} konnte nicht initialisiert werden`,te)}const Y="Keine geeignete Speicheroption verfügbar. Bitte Browserberechtigungen prüfen.";console.error(Y),B.error(Y)})}async function S(T){if(!n){B.warning("Bitte erst die Datenbank erzeugen.");return}await Pa(T,async()=>{try{const $=ce();$==="sqlite"||$==="filesystem"?Pt($):Pt("filesystem")}catch($){throw B.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),$ instanceof Error?$:new Error("Dateisystem nicht verfügbar")}try{const $=await yi(n);hn($.data),t.events.emit("database:connected",{driver:ce()})}catch($){console.error("Fehler beim Speichern der Datenbank",$),B.error($ instanceof Error?$.message:"Die Datei konnte nicht gespeichert werden")}})}function x(T){T.preventDefault();const $=new FormData(u.form),P=($.get("wizard-company-name")||"").toString().trim();if(!P){B.warning("Bitte einen Firmennamen angeben.");return}const Y=($.get("wizard-company-headline")||"").toString().trim(),ie=($.get("wizard-company-address")||"").toString().trim();n=vi({meta:{company:{name:P,headline:Y,logoUrl:"",contactEmail:"",address:ie}}}),r=Tl(P),u.preview.textContent=JSON.stringify(n,null,2),u.filenameLabel.textContent=r,u.resultCard.classList.remove("d-none"),u.resultCard.scrollIntoView({behavior:"smooth",block:"start"})}function E(){s="landing",n=null,r=Pr,u.reset(),v()}function I(){s="wizard",v()}async function V(T){await Pa(T,async()=>{try{const $=await Ar();if(!$){B.warning("Keine gespeicherte Datei gefunden.");return}if(!await Sl($)){B.warning("Berechtigung zum Zugriff auf die Datei wurde verweigert.");return}Pt("sqlite");const Y=await $.getFile(),ie=await Y.arrayBuffer(),te=await zo(ie,Y.name);Ao($),hn(te.data),await zr($),t.events.emit("database:connected",{driver:"sqlite",autoStarted:!0}),B.success("Datenbank erfolgreich geladen!")}catch($){console.error("Auto-Start fehlgeschlagen:",$),B.error($ instanceof Error?$.message:"Fehler beim Laden der gespeicherten Datei")}})}async function R(){await El();const T=d.querySelector("#auto-start-banner");T&&T.classList.add("d-none"),B.info("Gespeicherte Datei wurde vergessen.")}async function ke(T){await Pa(T,async()=>{if(await wl()){B.success("App wird installiert!");const P=d.querySelector("#pwa-install-banner");P&&P.classList.add("d-none")}})}if(d.addEventListener("click",T=>{const $=T.target?.closest("button[data-action]");if(!$)return;const P=$.dataset.action;if(P==="start-wizard"){I();return}P==="open"?w($):P==="useDefaults"?h($):P==="auto-start"?V($):P==="auto-start-forget"?R():P==="install-pwa"&&ke($)}),u.form.addEventListener("submit",x),u.section.addEventListener("click",T=>{const $=T.target?.closest("[data-action]");if(!$)return;const P=$.dataset.action;if(P==="wizard-back"){E();return}P==="wizard-save"&&S($)}),t.state.subscribe(T=>v(T)),v(t.state.getState()),!t.state.getState().app.hasDatabase){const T=xs();if(T&&T!==ce())try{Pt(T)}catch($){console.warn("Bevorzugter Speicher konnte nicht gesetzt werden",$)}}(async()=>{const T=await Ar(),$=await Is(),P=!!(T&&$?.hasDatabase),Y=Qt();f(P,Y);const ie=d.querySelector('[data-role="view-count"]');if(ie&&Nl("app").then(we=>{we!==null&&(ie.textContent=Fl(we))}),P&&T){const we=d.querySelector('[data-role="auto-start-filename"]');we&&(we.textContent=`Datei: ${T.name}`)}F(),window.addEventListener("pwa:install-available",()=>{F()}),window.addEventListener("pwa:installed",()=>{nr(),F()}),window.addEventListener("pwa:permission-required",async we=>{const Be=we.detail?.handle;if(Be){const He=d.querySelector("#auto-start-banner"),Ht=d.querySelector('[data-role="auto-start-filename"]');He&&Ht&&(Ht.textContent=`Datei: ${Be.name} (Berechtigung erforderlich)`,He.classList.remove("d-none"))}}),console.log("[Startup] PWA Capabilities:",Ts());const te=await Fs();console.log("[Startup] PWA Install Status (async):",te),J(te)})();function F(){const T=Ns();J(T)}function J(T){const $=d.querySelector("#pwa-install-banner"),P=d.querySelector('[data-role="pwa-content"]');if(!(!$||!P)){if(!T.showBanner){$.classList.add("d-none");return}$.classList.remove("d-none"),T.isInstalled?P.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-check-circle text-success me-1"></i>App ist bereits installiert
        </p>
        <p class="small mb-0" style="color: var(--text-muted);">
          Öffne die App über dein Desktop- oder Startmenü-Symbol für die beste Erfahrung.
        </p>
      `:T.canInstall?P.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-download me-1"></i>Für schnelleren Zugriff als App installieren
        </p>
        <button class="btn btn-sm btn-outline-light" data-action="install-pwa">
          <i class="bi bi-download me-1"></i>App installieren
        </button>
      `:$.classList.add("d-none")}}qi=!0}function _s(e){let t=!1,a=!1;const n=l=>{e.onStatusChange&&e.onStatusChange(l)},r=()=>{t||!a||j().app.activeSection!==e.section||e.shouldRefresh&&!e.shouldRefresh()||(a=!1,n("refreshing"),Promise.resolve(e.onRefresh()).catch(d=>{console.error("Auto-Refresh konnte nicht ausgeführt werden",d),a=!0,n("stale")}).finally(()=>{!t&&!a&&n("idle")}))},s=lt(e.event,()=>{e.shouldHandleEvent&&!e.shouldHandleEvent()||(a=!0,n("stale"),r())}),o=lt("app:sectionChanged",l=>{l===e.section&&(a?r():n("idle"))});return j().app.activeSection===e.section&&n("idle"),()=>{t=!0,s(),o()}}const Ol={prev:"Zurück",next:"Weiter",loading:"Lädt …",empty:"Keine Einträge verfügbar"};function Oi(){const e=document.createElement("span");return e.className="spinner-border spinner-border-sm",e.setAttribute("role","status"),e.setAttribute("aria-hidden","true"),e}function _i(e){const t=document.createElement("div");return t.className="pager-widget__info text-muted small text-center flex-grow-1",t.textContent=e?.trim()||"",t}function tn(e,t){if(!e)return null;const a=document.createElement("div");a.className="pager-widget d-flex flex-column gap-2",e.innerHTML="",e.appendChild(a);let n={status:"hidden"},r=!1;const s={...Ol,...t.labels||{}};function o(){a.replaceChildren()}function l(g){const v=_i(g.info||s.empty);a.replaceChildren(v)}function d(g){const v=document.createElement("div");v.className="alert alert-danger mb-0",v.textContent=g.message||"Unbekannter Fehler",a.replaceChildren(v)}function f(g){const v=document.createElement("div");v.className="pager-widget__controls d-flex flex-column flex-md-row gap-2 align-items-stretch";const w=document.createElement("button");w.type="button",w.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",w.disabled=!g.canPrev||g.loadingDirection==="prev",w.textContent=s.prev,g.loadingDirection==="prev"&&w.prepend(Oi()),w.addEventListener("click",()=>{w.disabled||t.onPrev()});const h=document.createElement("button");h.type="button",h.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",h.disabled=!g.canNext||g.loadingDirection==="next",h.textContent=s.next,g.loadingDirection==="next"&&h.append(Oi()),h.addEventListener("click",()=>{h.disabled||t.onNext()});const S=_i(g.info||(g.canPrev||g.canNext?s.loading:s.empty));v.append(w,S,h),a.replaceChildren(v)}function u(g){switch(g.status){case"hidden":o();break;case"disabled":l(g);break;case"error":d(g);break;case"ready":f(g);break;default:o();break}}return{update(g){r||(n=g,u(g))},destroy(){r||(r=!0,a.replaceChildren(),e.innerHTML="")},getState(){return n}}}const Xr=new Set;let Ki=!1;function _l(){return typeof window>"u"?null:window.__PSL?.debugOverlayApi??null}function Ks(){Ki||typeof window>"u"||(Ki=!0,window.addEventListener("psl:debug-overlay-ready",()=>{Xr.forEach(e=>{ei(e)})}))}function ei(e){const t=_l();t?.registerProvider&&(e.handle||(e.handle=t.registerProvider(e.config)),e.handle.update(e.lastMetrics??null))}function Rs(e){const t={config:e,handle:null,lastMetrics:null};return Xr.add(t),Ks(),ei(t),t}function Ws(e,t){e.lastMetrics=t,Xr.add(e),Ks(),ei(e)}function js(e){if(e==null)return 0;try{const t=JSON.stringify(e);return t?Number((t.length/1024).toFixed(1)):0}catch{return null}}const Ri=5e3,Wi=50,ti=50,Mn=3;function fr(e){if(e==null||e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function Kl(e){if(!e)return null;const t=fr(e.areaHa);if(t!==null)return t;const a=fr(e.areaAr);if(a!==null)return a/100;const n=fr(e.areaSqm);return n!==null?n/1e4:null}function Rl(e,t="–"){const a=Kl(e);return a===null?t:_o(a,2,t)}function Wl(e){return e.toISOString().slice(0,10)}function Wn(e){if(!e)return;if(/^\d{4}-\d{2}-\d{2}$/.test(e))return e;const t=new Date(e);if(!Number.isNaN(t.getTime()))return Wl(t)}function ji(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function ai(){return{startDate:"",endDate:""}}function Gs(e,t){if(!e)return;const a=e.querySelector("#doc-start"),n=e.querySelector("#doc-end");a&&t.startDate&&(a.value=t.startDate),n&&t.endDate&&(n.value=t.endDate)}function jl(e,t="sqlite"){if(typeof e=="string")return e.includes(":")?e:/^\d+$/.test(e)?ua(t,Number(e)):e;if(typeof e=="number")return ua(t,e);if(e&&typeof e=="object"){const a=e.source||t;if(typeof e.ref=="string"&&e.ref.includes(":"))return e.ref;const n=Number(e.ref);if(!Number.isNaN(n))return ua(a,n)}return null}function Gl(e){const t=new Set;return e?.length&&e.forEach(a=>{const n=jl(a);n&&t.add(n)}),t}function Us(e){const t=e.querySelector('[data-role="doc-focus-banner"]'),a=e.querySelector('[data-role="doc-focus-text"]');if(!t||!a)return;if(!Nt){t.classList.add("d-none");return}const n=Z.startDate&&Z.endDate?`${Z.startDate} - ${Z.endDate}`:"Aktuelle Filter",r=Nt.label||"Importierter Zeitraum",s=Nt.highlightEntryIds.size,o=s?` (${s} markiert)`:"";a.textContent=`${r}: ${n}${o}`,t.classList.remove("d-none")}function Ul(e,t){const a=e.querySelector('[data-role="doc-refresh-indicator"]');if(a){if(a.classList.remove("alert-info","alert-warning"),t==="idle"){a.classList.add("d-none");return}a.classList.remove("d-none"),t==="stale"?(a.classList.add("alert-warning"),a.textContent="Neue Dokumentationseinträge verfügbar. Ansicht aktualisiert sich beim Öffnen."):(a.classList.add("alert-info"),a.textContent="Aktualisiere Dokumentation...")}}function mr(e,t,a={}){Nt&&(Nt=null,_a=null,Us(e),a.refreshList&&qt(e,t.state.getState().fieldLabels))}function Vl(e,t){if(!_a)return;const a=Vt(_a);a&&(_a=null,Xs(e,a,t))}function Zl(e,t,a){if(!a)return;const n=Wn(a.startDate),r=Wn(a.endDate),s=!!a.entryIds?.length;if(!n&&!r&&!s)return;Z={...Z,...n?{startDate:n}:{},...r?{endDate:r}:{}},a.creator!==void 0&&(Z={...Z,creator:a.creator||void 0}),a.crop!==void 0&&(Z={...Z,crop:a.crop||void 0});const o=Gl(a.entryIds);Nt={label:a.label,reason:a.reason,startDate:Z.startDate,endDate:Z.endDate,highlightEntryIds:o},_a=a.autoSelectFirst&&o.size?o.values().next().value??null:null;const l=e.querySelector("#doc-filter");Gs(l,Z),Us(e),Mr=!0,Mt(e,t.state.getState()).finally(()=>{Mr=!1})}function Ql(){if(typeof window>"u")return{enabled:!1,count:yn};try{const e=new URLSearchParams(window.location.search);if(!e.has("seedHistory"))return{enabled:!1,count:yn};const t=e.get("seedHistory"),a=t?Number(t):Number.NaN;return{enabled:!0,count:Number.isFinite(a)&&a>0?Math.min(Math.round(a),Jl):yn}}catch(e){return console.warn("seedHistory Parameter konnte nicht gelesen werden",e),{enabled:!1,count:yn}}}const ct=25,Gi=4,gr=new Intl.NumberFormat("de-DE"),yn=200,Jl=2e3,ha=Ql();let Ui=!1,$e="memory",Z=ai(),Fe=0,ye=[],xt=[],ne=0;const ot=new Map,Xe=new Map([[0,null]]),je=new Set,Bt=new Map,da=new Map;let Re=!1,Ma=null,Ca=0,Nt=null,Mr=!1,_a=null,jn=!1,Cn="",Gn=!1,kn=null,wn=null,Vi=null,Ne=0,xn=null,Zi=null,st=null,Ka=!1,Qi=null;const Yl=Rs({id:"documentation",label:"Documentation",budget:{initialLoad:50,maxItems:150}});let Vs=null;function ya(e){return e.app?.storageDriver||ce()}function ua(e,t){return`${e}:${t}`}function ni(e){const t={},a=ji(e.startDate,"start"),n=ji(e.endDate,"end");return a&&(t.startDate=a),n&&(t.endDate=n),e.creator&&(t.creator=e.creator),e.crop&&(t.crop=e.crop),t}function Xl(e,t){return{id:ua("state",t),entry:e,source:"state",ref:t}}function ec(e){const t=Number(e?.id??e?.historyId??0),a={...e};return delete a.id,{id:ua("sqlite",t),entry:a,source:"sqlite",ref:t}}function tc(){return $e==="memory"?ye.length:Fe>0?Fe:ne*ct+ye.length||null}function ac(){const e=[];if(Re&&e.push("Lädt …"),st&&e.push("Fehler"),Nt&&e.push("Fokus aktiv"),$e==="sqlite"&&Xe.get(ne+1)&&e.push("Weitere Seiten verfügbar"),!!e.length)return e.join(" · ")}function nc(){const e={items:ye.length,totalCount:tc(),cursor:$e==="sqlite"?`Seite ${ne+1}`:null,payloadKb:js(xt.map(t=>t.entry)),lastUpdated:Vs,note:ac()};Ws(Yl,e)}function Vt(e){return ye.find(t=>t.id===e)}function rr(e){const t=e.querySelector('[data-role="archive-form"]');if(!t)return;const a=t.querySelector('input[name="archive-start"]'),n=t.querySelector('input[name="archive-end"]');a&&(a.value=Z.startDate||""),n&&(n.value=Z.endDate||"")}function ze(e,t,a="info"){const n=e.querySelector('[data-role="archive-status"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a}`,n.textContent=t,n.classList.remove("d-none")}}function Cr(e,t){const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(!a)return;const r=!a.classList.contains("d-none"),s=typeof t=="boolean"?t:!r;a.classList.toggle("d-none",!s),n&&(n.textContent=s?"Archiv-Eingaben ausblenden":"Archiv erstellen"),s&&rr(e)}function rc(e){const t=e.querySelector('input[name="archive-start"]'),a=e.querySelector('input[name="archive-end"]');if(!t?.value||!a?.value)return null;const n=e.querySelector('input[name="archive-storage"]'),r=e.querySelector('textarea[name="archive-note"]'),s=e.querySelector('input[name="archive-remove"]');return{startDate:t.value,endDate:a.value,storageHint:n?.value.trim()||void 0,note:r?.value.trim()||void 0,removeAfterExport:s?s.checked:!0}}function ri(e,t){const a=e.querySelector('[data-action="archive-toggle"]'),n=e.querySelector('[data-action="archive-submit"]'),r=e.querySelector('[data-role="archive-form"]'),s=e.querySelector('[data-role="archive-driver-hint"]'),o=ya(t)==="sqlite"&&!!t.app?.hasDatabase;a&&(a.disabled=!o||jn),n&&(n.disabled=!o||jn),!o&&r&&r.classList.add("d-none"),s&&(s.textContent=o?"Lokale SQLite-Datenbank aktiv":"Nur mit SQLite verfügbar",s.className=`badge ${o?"bg-success":"bg-secondary"}`),o?ii():Gn=!1}function Ji(e,t){jn=t;const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(a&&a.querySelectorAll("input, textarea, button").forEach(r=>{if(r.dataset.action==="archive-cancel"&&t){r.setAttribute("disabled","disabled");return}t?r.setAttribute("disabled","disabled"):r.removeAttribute("disabled")}),n&&(n.disabled=t||n.disabled,!t)){const r=j();n.disabled=ya(r)!=="sqlite"||!r.app?.hasDatabase}}function ic(e,t){const a=n=>n?n.replace(/[^0-9-]/g,""):"unbekannt";return`pflanzenschutz-archiv-${a(e)}_${a(t)}.zip`}function sc(e){let t=[];return Ue("archives",a=>{const n=Array.isArray(a?.logs)?a.logs:[];return t=[e,...n].slice(0,ti),{...a||{logs:[]},logs:t}}),t}async function ii({force:e=!1}={}){if(kn){if(await kn,!e)return}else if(Gn&&!e)return;const t=j();if(ya(t)!=="sqlite"||!t.app?.hasDatabase)return;const n=(async()=>{try{const r=await Po({limit:ti});Ue("archives",s=>({...s&&typeof s=="object"?s:{logs:[]},logs:r.items})),Gn=!0}catch(r){console.warn("Archive logs could not be loaded",r)}})();kn=n;try{await n}finally{kn=null}}async function oc(e,t){const a=ya(j());if(sc(e),a!=="sqlite"){console.warn("Archive logs require SQLite. Changes stored in memory only.");return}try{const n={...e,metadata:t??void 0};await Fo(n),await et()}catch(n){console.error("Archive log could not be persisted",n),Gn=!1}finally{await ii({force:!0})}}function Ir(e){return!Array.isArray(e)||!e.length?"[]":e.map(t=>`${t.id}:${t.archivedAt}:${t.entryCount}`).join("|")}function lc(e){return e?Ga(e)||e.slice(0,16).replace("T"," "):"-"}function Va(e,t,a={}){const n=e.querySelector('[data-role="archive-log-list"]');if(!n)return;const r=Array.isArray(t)?t:[];a.resetPage!==!1&&(Ne=0);const s=hc(r);if(!s.total){n.innerHTML='<div class="text-muted small">Noch keine Archive erstellt.</div>',es(e,s);return}const o=s.items.map(l=>{const d=lc(l.archivedAt),f=`${l.startDate||"-"} – ${l.endDate||"-"}`,u=l.entryCount===1?"Eintrag":"Einträge";return`
        <div class="list-group-item border rounded mb-2 p-3" data-action="archive-log-focus" data-log-id="${l.id}" style="cursor: pointer;">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="fs-5 fw-bold mb-1">${b(f)}</div>
              <div class="text-muted">${l.entryCount} ${u} · Erstellt ${b(d)}</div>
            </div>
            <i class="bi bi-chevron-right text-muted fs-4"></i>
          </div>
        </div>
      `}).join("");n.innerHTML=`<div class="list-group list-group-flush">${o}</div>`,es(e,s)}function Yi(e,t){const a=e.archives?.logs;if(Array.isArray(a))return a.find(n=>n.id===t)}async function cc(e){if(e){if(typeof navigator<"u"&&navigator.clipboard&&typeof navigator.clipboard.writeText=="function"){await navigator.clipboard.writeText(e);return}if(typeof document<"u"){const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select(),document.execCommand("copy"),document.body.removeChild(t)}}}async function an(e){if(da.has(e.id))return da.get(e.id);let t=null;if(e.source==="sqlite")try{t=await To(e.ref)}catch(a){console.error("History entry fetch failed",a)}else{const a=We(j().history);t=(typeof e.ref=="number"?a[e.ref]:void 0)||e.entry}return t&&da.set(e.id,t),t}function Zs(e){return e&&(e.datum||Ga(e.dateIso)||(typeof e.date=="string"?e.date:""))||""}function dc(e){if(e?.gpsCoordinates){const t=Oo(e.gpsCoordinates);if(t)return t}return""}function uc(e){return e?.gps||""}function Br(e){if(!e)return null;if(e.dateIso){const n=zs(e.dateIso);if(n)return new Date(n.getFullYear(),n.getMonth(),n.getDate())}const t=typeof e.datum=="string"&&e.datum||typeof e.date=="string"&&e.date||null;if(!t)return null;const a=t.split(".");if(a.length===3){const[n,r,s]=a.map(Number);if(!Number.isNaN(n)&&!Number.isNaN(r)&&!Number.isNaN(s))return new Date(s,r-1,n)}return null}function pc(e,t){const a=Br(e);if(t.startDate){const r=new Date(t.startDate);if(r.setHours(0,0,0,0),!a||a<r)return!1}if(t.endDate){const r=new Date(t.endDate);if(r.setHours(23,59,59,999),!a||a>r)return!1}const n=[["creator",e.ersteller],["crop",e.kultur]];for(const[r,s]of n){const l=t[r]?.trim().toLowerCase();if(l&&!`${s||""}`.toLowerCase().includes(l))return!1}return!0}function si(e){if(!e)return"";const t=r=>r==null?"":String(r),n=(Array.isArray(e.items)?e.items:[]).map(r=>{const s=Object.keys(r).sort().reduce((o,l)=>(o[l]=r[l],o),{});return JSON.stringify(s)}).sort();return JSON.stringify({savedAt:t(e.savedAt),dateIso:t(e.dateIso),datum:t(e.datum),ersteller:t(e.ersteller),standort:t(e.standort),kultur:t(e.kultur),usageType:t(e.usageType),eppoCode:t(e.eppoCode),invekos:t(e.invekos),bbch:t(e.bbch),gps:t(e.gps),gpsPointId:t(e.gpsPointId),areaHa:e.areaHa??null,areaAr:e.areaAr??null,areaSqm:e.areaSqm??null,kisten:e.kisten??null,itemHashes:n})}function Qs(e){e.size&&Ue("history",t=>{const a=Xa(t);if(!a.items.length)return a;let n=!1;const r=a.items.filter(s=>{const o=si(s);return e.has(o)?(n=!0,!1):!0});return n?{...a,items:r,totalCount:Math.min(a.totalCount,r.length),lastUpdatedAt:new Date().toISOString()}:a})}function fc(e){return e.slice().sort((t,a)=>{const n=Br(t.entry)?.getTime()||new Date(t.entry.savedAt||0).getTime();return(Br(a.entry)?.getTime()||new Date(a.entry.savedAt||0).getTime())-n})}function Xi(){return $e==="sqlite"?Fe>0?Math.max(Math.ceil(Fe/ct),1):Math.max(ne+1,ot.size||0):ye.length?Math.max(Math.ceil(ye.length/ct),1):0}function Js(){if($e==="sqlite"){const t=Math.max(Xi()-1,0);return ne>t&&(ne=t),ne<0&&(ne=0),ne*ct}if(!ye.length)return ne=0,0;const e=Math.max(Xi()-1,0);return ne>e&&(ne=e),ne<0&&(ne=0),ne*ct}function ir(){if(!ye.length){xt=[];return}if($e==="sqlite"){xt=ye.slice();return}const e=Js(),t=Math.min(e+ct,ye.length);xt=ye.slice(e,t)}function mc(e){if(ot.size<=Gi)return;const t=Array.from(ot.keys()).sort((a,n)=>{const r=Math.abs(a-e);return Math.abs(n-e)-r});for(;ot.size>Gi&&t.length;){const a=t.shift();a==null||a===e||ot.delete(a)}}function gc(e){const t=e.querySelector('[data-role="doc-pager"]');return t?((!wn||Vi!==t)&&(wn?.destroy(),wn=tn(t,{onPrev:()=>kc(e),onNext:()=>wc(e),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Dokumentation...",empty:"Keine Einträge"}}),Vi=t),wn):null}function bc(e){const t=e.querySelector('[data-role="archive-log-pager"]');return t?((!xn||Zi!==t)&&(xn?.destroy(),xn=tn(t,{onPrev:()=>vc(e),onNext:()=>yc(e),labels:{prev:"Zurück",next:"Weiter",loading:"Archive werden geladen...",empty:"Keine Einträge"}}),Zi=t),xn):null}function hc(e){const t=e.length;if(!t)return Ne=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/Mn),1);Ne>=a&&(Ne=a-1),Ne<0&&(Ne=0);const n=Ne*Mn,r=Math.min(n+Mn,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function es(e,t){const a=bc(e);if(a){if(!t.total){a.update({status:"disabled",info:"Noch keine Archive"});return}a.update({status:"ready",info:`Einträge ${t.start+1}–${t.end} von ${t.total}`,canPrev:Ne>0,canNext:t.end<t.total})}}function vc(e){if(Ne===0)return;Ne=Math.max(Ne-1,0);const t=j().archives?.logs??[];Va(e,t,{resetPage:!1})}function yc(e){const t=j().archives?.logs??[],a=t.length;if(!a)return;const n=Math.max(Math.ceil(a/Mn),1);Ne>=n-1||(Ne=Math.min(Ne+1,n-1),Va(e,t,{resetPage:!1}))}function In(e){const t=gc(e);if(!t)return;if(st){t.update({status:"error",message:st});return}const a=$e==="memory"?ye.length:Fe,n=xt.length;if(!n){const f=Re?"Lade Dokumentation...":"Keine Einträge vorhanden.";t.update({status:"disabled",info:f});return}const r=$e==="sqlite"?ne*ct:Js(),s=`Einträge ${gr.format(r+1)}–${gr.format(r+n)}${a?` von ${gr.format(a)}`:""}`,o=$e==="memory"?r+n<ye.length:!!Xe.get(ne+1),l=!Re&&o,d=ne>0&&!Re;t.update({status:"ready",info:s,canPrev:d,canNext:l,loadingDirection:Re&&o?"next":null})}function Nr(e){if(!ha.enabled)return;const t=e.querySelector('[data-action="doc-seed"]');t&&(t.disabled=Ka,t.textContent=Ka?"Dummy-Daten werden erstellt...":`+ ${ha.count} Dummy-Einträge`)}function kc(e){if(ne===0||Re)return;const t=Math.max(ne-1,0);if($e==="sqlite"){oi(e,j().fieldLabels,t);return}ne=t,ir(),qt(e,j().fieldLabels),Qa(e,j().fieldLabels)}function wc(e){if(Re)return;const t=ne+1;if($e==="sqlite"){const n=ot.has(t),r=Xe.get(t);if(!n&&!r)return;oi(e,j().fieldLabels,t);return}t*ct<ye.length&&(ne=t,ir(),qt(e,j().fieldLabels),Qa(e,j().fieldLabels))}function Za(e){je.clear(),Bt.clear(),e&&sr(e)}function xc(){return $e==="memory"?ye.length:Fe}function sr(e){const t=e.querySelector('[data-role="doc-selection-info"]'),a=e.querySelector('[data-action="print-selection"]'),n=e.querySelector('[data-action="pdf-selection"]'),r=e.querySelector('[data-action="export-selection"]'),s=e.querySelector('[data-action="export-zip"]'),o=e.querySelector('[data-action="delete-selection"]'),l=je.size;t&&(t.textContent=l?`${l} Eintrag${l===1?"":"e"} ausgewählt`:"Keine Einträge ausgewählt");const d=l===0;a&&(a.disabled=d),n&&(n.disabled=d),r&&(r.disabled=d),s&&(s.disabled=d),o&&(o.disabled=d);const f=e.querySelector('[data-action="toggle-select-all"]');if(f){const u=xc();f.disabled=u===0,f.checked=u>0&&l>=u,f.indeterminate=l>0&&l<u}}function Fr(e,t){e.querySelectorAll('[data-role="doc-list"] .doc-sidebar-entry').forEach(n=>{const r=!!(t&&n.dataset.entryId===t);n.classList.toggle("active",r)})}function Fa(e,t,a){const n=e.querySelector("#doc-detail"),r=e.querySelector("#doc-detail-body"),s=e.querySelector('[data-role="doc-detail-card"]'),o=e.querySelector('[data-role="doc-detail-empty"]');if(!n||!r||!s||!o)return;if(!t){n.dataset.entryId="",s.classList.add("d-none"),o.classList.remove("d-none"),r.innerHTML="",Fr(e,null);return}n.dataset.entryId=t.entry.id,s.classList.remove("d-none"),o.classList.add("d-none"),Fr(e,t.entry.id);const l=a||j().fieldLabels,d=l.history?.tableColumns??{},f=l.history?.detail??{},u=t.detail||t.entry.entry,g=qo(u.items||[],l,"detail"),v=u.gpsCoordinates?en(u.gpsCoordinates):null,w=uc(u),h=dc(u),S=f.gpsNote||d.gpsNote||f.gps||d.gps||"GPS-Notiz",x=f.gpsCoordinates||d.gpsCoordinates||f.gps||d.gps||"GPS-Koordinaten",E=h?`${b(h)}${v?` <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${b(v)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:""}`:"-";r.innerHTML=`
    <p>
      <strong>${b(d.date||"Datum")}:</strong> ${b(Zs(u))}<br />
      <strong>${b(f.creator||"Erstellt von")}:</strong> ${b(u.ersteller||"")}<br />
      <strong>${b(f.location||"Standort")}:</strong> ${b(u.standort||"")}<br />
      <strong>${b(f.crop||"Kultur")}:</strong> ${b(u.kultur||"")}<br />
      <strong>${b(f.usageType||"Art der Verwendung")}:</strong> ${b(u.usageType||"")}<br />
      <strong>${b(f.quantity||"Fläche (ha)")}:</strong> ${b(Rl(u))}<br />
      <strong>${b(f.eppoCode||"EPPO-Code")}:</strong> ${b(u.eppoCode||"")}<br />
      <strong>${b(f.bbch||"BBCH")}:</strong> ${b(u.bbch||"")}<br />
      <strong>${b(f.invekos||"InVeKoS")}:</strong> ${b(u.invekos||"")}<br />
      <strong>${b(S)}:</strong> ${w?b(w):"-"}<br />
      <strong>${b(x)}:</strong> ${E}<br />
      <strong>${b(f.time||"Uhrzeit")}:</strong> ${b(u.uhrzeit||"")}<br />
    </p>
    ${Ho({maschine:u.qsMaschine,schaderreger:u.qsSchaderreger,verantwortlicher:u.qsVerantwortlicher,wetter:u.qsWetter,behandlungsart:u.qsBehandlungsart})}
    <div class="table-responsive">
      ${g}
    </div>
  `}function qt(e,t){ir();const a=e.querySelector('[data-role="doc-list"]');if(!a)return;const r=e.querySelector("#doc-detail")?.dataset.entryId||null;if(!xt.length)a.innerHTML=Re?'<div class="text-center text-muted py-4">Lädt ...</div>':'<div class="text-center text-muted py-4">Noch keine Einträge</div>';else{a.innerHTML="";const s=document.createDocumentFragment();(t||j().fieldLabels).history?.detail?.usageType,xt.forEach(l=>{const d=document.createElement("div"),f=!!Nt?.highlightEntryIds?.has(l.id);d.className=`doc-sidebar-entry list-group-item${f?" doc-sidebar-entry--highlight":""}`,d.dataset.entryId=l.id;const u=Zs(l.entry)||"-",g=f?'<span class="badge bg-warning-subtle text-warning-emphasis badge-import">Import</span>':"";d.innerHTML=`
        <div
          class="doc-sidebar-entry__main"
          data-action="view-entry"
          data-entry-id="${l.id}"
        >
          <div class="d-flex justify-content-between gap-2">
            <span class="fw-bold d-flex align-items-center gap-2">
              ${b(l.entry.kultur||"-")}
              ${g}
            </span>
            <small class="text-muted">${b(u)}</small>
          </div>
          <div class="text-muted small mb-1">
            ${b(l.entry.ersteller||"-")} | ${b(l.entry.standort||"-")}
          </div>
          <div class="small text-muted">
            ${b(l.entry.usageType||"-")} · ${b(l.entry.eppoCode||"-")} · ${b(l.entry.invekos||"-")}
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2 gap-2 no-print">
          <button class="btn btn-sm btn-outline-secondary" data-action="print-entry" data-entry-id="${l.id}">Drucken</button>
          <label class="form-check-label d-flex align-items-center gap-2 mb-0">
            <input type="checkbox" class="form-check-input" data-action="toggle-select" data-entry-id="${l.id}" ${je.has(l.id)?"checked":""} />
            <span class="small">Auswahl</span>
          </label>
        </div>
      `,s.appendChild(d)}),a.appendChild(s)}Fr(e,r),Vl(e,t),In(e),sr(e),Vs=new Date().toISOString(),nc()}function Qa(e,t){const a=e.querySelector('[data-role="doc-info"]');if(!a)return;const n=Fe,r=!!(Z.crop||Z.creator);if(!n&&!Re){a.textContent="Keine Einträge";return}if(!n&&Re){a.textContent="Lädt...";return}if(Z.startDate&&Z.endDate){const s=`${Z.startDate} - ${Z.endDate} (${n})`;a.textContent=r?`${s} + Filter`:s;return}a.textContent=`Alle Einträge (${n})`}async function Ys(e,t){const n=e.querySelector("#doc-detail")?.dataset.entryId;if(!n){Fa(e,null,t);return}const r=Vt(n);if(!r){Fa(e,null,t);return}const s=await an(r);s?Fa(e,{entry:r,detail:s},t):Fa(e,null,t)}async function oi(e,t,a=ne,n={}){const r=Math.max(0,a),s=!!n.forceReload;s&&(ot.clear(),Xe.clear(),Xe.set(0,null),Fe=0,ye=[],xt=[],ne=0,st=null);const o=s?void 0:ot.get(r);if(o&&!n.forceReload){ne=r,ye=o,st=null,qt(e,t),Qa(e),In(e);return}const l=Xe.has(r)?Xe.get(r)??null:null,d=Symbol("doc-load");Ma=d,Re=!0,st=null,In(e);try{const f=await Ls({cursor:l,pageSize:ct,filters:ni(Z),sortDirection:"desc",includeTotal:s||r===0||Fe===0});if(Ma!==d)return;const u=f.items.map(g=>ec(g));if(ot.set(r,u),mc(r),Xe.set(r,l),Xe.set(r+1,f.nextCursor??null),typeof f.totalCount=="number")Fe=f.totalCount;else{const g=r*ct+u.length;Fe=Math.max(Fe,g)}ne=r,ye=u,st=null,qt(e,t),Qa(e,t)}catch(f){Ma===d&&(console.error("Dokumentation konnte nicht geladen werden",f),st="Dokumentation konnte nicht geladen werden. Bitte erneut versuchen.",window.alert("Dokumentation konnte nicht geladen werden. Bitte erneut versuchen."))}finally{Ma===d&&(Re=!1,Ma=null,In(e))}}async function Sc(e,t){const a=We(t.history);ye=fc(a.map((n,r)=>Xl(n,r)).filter(n=>pc(n.entry,Z))),Fe=ye.length,ne=0,st=null,ir(),qt(e,t.fieldLabels),Qa(e,t.fieldLabels),await Ys(e,t.fieldLabels)}async function Mt(e,t){const a=ya(t),n=!!t.app?.hasDatabase,r=a==="sqlite"&&n;if($e=r?"sqlite":"memory",da.clear(),ne=0,st=null,Fe=0,ye=[],xt=[],ot.clear(),Xe.clear(),Xe.set(0,null),Za(e),ri(e,t),rr(e),Va(e,t.archives?.logs??[]),Cn=Ir(t.archives?.logs),r){await oi(e,t.fieldLabels,0,{forceReload:!0}),await Ys(e,t.fieldLabels);return}await Sc(e,t)}async function br(){const e=[];for(const t of je){const a=Bt.get(t)||Vt(t);if(!a)continue;const n=await an(a);n&&e.push(n)}return e}async function Ec(e,t){if(!t){Za(e),qt(e,j().fieldLabels);return}if(je.clear(),Bt.clear(),$e==="memory")for(const a of ye)je.add(a.id),Bt.set(a.id,a);else try{const a=await $s({filters:ni(Z),sortDirection:"desc",limit:1e4}),n=Array.isArray(a.historyIds)?a.historyIds:[];a.entries.forEach((r,s)=>{const o=Number(n[s]);if(!Number.isFinite(o))return;const l=ua("sqlite",o);je.add(l),Bt.set(l,{id:l,entry:r,source:"sqlite",ref:o}),da.has(l)||da.set(l,r)})}catch(a){console.error("Alle Einträge konnten nicht ausgewählt werden",a),window.alert("Alle Einträge konnten nicht ausgewählt werden. Bitte erneut versuchen.")}qt(e,j().fieldLabels),sr(e)}async function Lc(e,t){if(!je.size)return;const a=Array.from(je).map(l=>Bt.get(l)||Vt(l)).filter(l=>!!l),n=[];for(const l of a){const d=await an(l);d&&n.push(d)}const r=a.filter(l=>l.source==="sqlite"),s=!!r.length;if(s)for(const l of r)await No(l.ref);const o=new Set(a.filter(l=>l.source==="state").map(l=>l.ref));if(o.size&&(Ue("history",l=>{const d=Xa(l),f=d.items.filter((u,g)=>!o.has(g));return f.length===d.items.length?d:{...d,items:f,totalCount:Math.min(d.totalCount,f.length),lastUpdatedAt:new Date().toISOString()}}),await $c()),n.length){const l=new Set(n.map(d=>si(d)));Qs(l)}if(s){try{await et()}catch(l){console.warn("SQLite-Datei konnte nach dem Löschen nicht gespeichert werden",l)}t.events?.emit?.("history:data-changed",{type:"deleted",ids:r.map(l=>l.ref)})}Za(e),await Mt(e,t.state.getState())}async function Xs(e,t,a){const n=await an(t);if(!n){window.alert("Details konnten nicht geladen werden.");return}Fa(e,{entry:t,detail:n},a)}async function ts(e){const t=await an(e);t?await eo([t]):window.alert("Eintrag konnte nicht geladen werden.")}async function $c(){const e=ce();if(!(!e||e==="memory"||e==="sqlite"))try{const t=Je();await Ye(t)}catch(t){throw console.error("Persist history failed",t),window.alert("Historie konnte nicht gespeichert werden. Bitte erneut versuchen."),t}}async function Dc(e,t,a){if(jn)return;const n=t.state.getState();if(ya(n)!=="sqlite"||!n.app?.hasDatabase){ze(e,"Archivieren ist nur mit einer lokalen SQLite-Datenbank möglich.","warning");return}const s=rc(a);if(!s?.startDate||!s.endDate){ze(e,"Bitte Start- und Enddatum für das Archiv wählen.","warning");return}const o=Wn(s.startDate),l=Wn(s.endDate);if(!o||!l){ze(e,"Die angegebenen Daten sind ungültig.","danger");return}if(new Date(o)>new Date(l)){ze(e,"Startdatum darf nicht nach dem Enddatum liegen.","danger");return}const d={startDate:o,endDate:l,creator:Z.creator,crop:Z.crop},f=ni(d);Ji(e,!0),ze(e,"Prüfe Zeitraum und Eintragsmenge...","info");try{const u=await Ls({cursor:null,pageSize:1,filters:f,sortDirection:"asc",includeTotal:!0}),g=u.totalCount??u.items.length??0;if(!g){ze(e,"Im angegebenen Zeitraum wurden keine Einträge gefunden.","warning");return}if(g>Ri){ze(e,`Maximal ${Ri} Einträge pro Archiv erlaubt. Bitte Zeitraum verkürzen.`,"warning");return}ze(e,`Exportiere ${g} Einträge in ein ZIP-Archiv...`,"info");const v=await $s({filters:f,limit:g,sortDirection:"asc"}),w=v?.entries??[];if(!w.length){ze(e,"Archiv konnte nicht erstellt werden – Export lieferte keine Einträge.","danger");return}const h=w.map($=>({...$})),S={format:"pflanzenschutz-archive",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:h.length,filters:{startDate:o,endDate:l,creator:d.creator||null,crop:d.crop||null},archive:{removeFromDatabase:s.removeAfterExport,storageHint:s.storageHint||null,note:s.note||null}},x=Ds({"pflanzenschutz.json":Kn(JSON.stringify(h,null,2)),"metadata.json":Kn(JSON.stringify(S,null,2))}),E=new ArrayBuffer(x.byteLength);new Uint8Array(E).set(x);const I=new Blob([E],{type:"application/zip"}),V=ic(o,l);li(I,V);let R=!1;if(s.removeAfterExport){ze(e,"Export abgeschlossen. Entferne Einträge und bereinige Datenbank...","info"),await Mo({filters:f});const $=new Set(h.map(P=>si(P)));Qs($);try{await et()}catch(P){console.error("SQLite-Datei konnte nach dem Archivieren nicht gespeichert werden",P)}t.events?.emit?.("history:data-changed",{type:"deleted-range",filters:f});try{await Co()}catch(P){R=!0,console.error("VACUUM fehlgeschlagen",P)}}const ke=new Date().toISOString(),F={id:`archive-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,archivedAt:ke,startDate:o,endDate:l,entryCount:h.length,fileName:V,storageHint:s.storageHint||void 0,note:s.note||void 0};R&&(F.note=F.note?`${F.note} | VACUUM fehlgeschlagen`:"VACUUM fehlgeschlagen");const J={filters:{...d},removeAfterExport:!!s.removeAfterExport,historyIdSample:v?.historyIds?.slice(0,Wi)};if(await oc(F,J),!s.removeAfterExport&&v?.historyIds?.length){const $=v.historyIds.slice(0,Wi).map(P=>({source:"sqlite",ref:P}));t.events?.emit?.("documentation:focus-range",{startDate:o,endDate:l,label:"Archiviert",reason:"archive",entryIds:$})}Cr(e,!1),a.reset(),rr(e),await Mt(e,t.state.getState());const T=s.removeAfterExport?`Archiv ${V} erstellt und ${h.length} Einträge entfernt.`:`Archiv ${V} erstellt. ${h.length} Einträge bleiben in der Datenbank.`;ze(e,T,R?"warning":"success")}catch(u){console.error("Archivieren fehlgeschlagen",u);const g=u instanceof Error?u.message:"Archiv konnte nicht erstellt werden.";ze(e,g,"danger")}finally{Ji(e,!1),ri(e,t.state.getState())}}const zc=50;async function eo(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}if(e.length>zc&&!window.confirm(`Sie möchten ${e.length} Einträge drucken. Bei sehr vielen Einträgen kann das Erstellen der Druckvorschau einige Sekunden dauern und lässt sich nicht unterbrechen.

Fortfahren?`))return;const t=j().fieldLabels,a=Io(j().company||null);await Bo(e,t,{title:"Dokumentation",headerHtml:a,chunkSize:25})}function li(e,t){const a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download=t,n.click(),URL.revokeObjectURL(a)}function Ac(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const t=e.map(o=>({...o})),a=JSON.stringify(t,null,2),n=new TextEncoder().encode(a),r=new Blob([n],{type:"application/json; charset=utf-8"}),s=new Date().toISOString().replace(/[:.]/g,"-");li(r,`pflanzenschutz-dokumentation-${s}.json`)}async function Pc(e,t){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const a=e.map(d=>({...d})),n={format:"pflanzenschutz-export",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:a.length,filters:{startDate:t.startDate||null,endDate:t.endDate||null,creator:t.creator||null,crop:t.crop||null}},r=Ds({"pflanzenschutz.json":Kn(JSON.stringify(a,null,2)),"metadata.json":Kn(JSON.stringify(n,null,2))}),s=new ArrayBuffer(r.byteLength);new Uint8Array(s).set(r);const o=new Blob([s],{type:"application/zip"}),l=new Date().toISOString().replace(/[:.]/g,"-");li(o,`pflanzenschutz-dokumentation-${l}.zip`)}function Mc(){const e=document.createElement("div"),t=ai(),a=Z.startDate||t.startDate||"",n=Z.endDate||t.endDate||"";Z={...Z,startDate:a,endDate:n};const r=ha.enabled?`<button class="btn btn-outline-info btn-sm" type="button" data-action="doc-seed">+ ${ha.count} Dummy-Einträge</button>`:"";return e.className="section-inner",e.innerHTML=`
    <h2 class="text-center mb-4">
      <i class="bi bi-journal-text me-2"></i>Dokumentation
    </h2>
    
    <!-- Tab Contents -->
    <div class="doc-tab-content">
      <!-- Entries Tab -->
      <div class="doc-pane" data-pane="entries" style="display: block;">
    <div class="card card-dark mb-4 no-print">
      <div class="card-body">
        <form id="doc-filter" class="row g-3">
          <div class="col-md-3">
            <label class="form-label" for="doc-start">Startdatum*</label>
            <input type="date" class="form-control" id="doc-start" name="doc-start" required value="${a}" />
          </div>
          <div class="col-md-3">
            <label class="form-label" for="doc-end">Enddatum*</label>
            <input type="date" class="form-control" id="doc-end" name="doc-end" required value="${n}" />
          </div>
          <div class="col-md-3">
            <label class="form-label" for="doc-crop">Kultur (optional)</label>
            <input type="text" class="form-control" id="doc-crop" name="doc-crop" placeholder="z. B. Äpfel" value="${Z.crop||""}" />
          </div>
          <div class="col-md-3">
            <label class="form-label" for="doc-creator">Anwender (optional)</label>
            <input type="text" class="form-control" id="doc-creator" name="doc-creator" placeholder="Name" value="${Z.creator||""}" />
          </div>
          <div class="col-12 d-flex gap-2 justify-content-end">
            <button class="btn btn-outline-secondary" type="reset" data-action="reset-filters">Zurücksetzen</button>
            <button class="btn btn-success" type="submit">Filtern</button>
          </div>
        </form>
      </div>
    </div>

    <div class="card card-dark mt-4" data-role="archive-card">
      <div class="card-header d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-2">
        <div>Archiv & Bereinigung</div>
        <span class="badge bg-secondary" data-role="archive-driver-hint">Nur mit SQLite verfügbar</span>
      </div>
      <div class="card-body">
        <p class="text-muted small mb-3">
          ZIP-Backup erstellen und Einträge löschen.
        </p>
        <div class="alert alert-info d-none" data-role="archive-status"></div>
        <form class="row g-3 d-none" data-role="archive-form">
          <div class="col-md-3">
            <label class="form-label" for="archive-start">Startdatum</label>
            <input type="date" class="form-control" id="archive-start" name="archive-start" required value="${a}" />
          </div>
          <div class="col-md-3">
            <label class="form-label" for="archive-end">Enddatum</label>
            <input type="date" class="form-control" id="archive-end" name="archive-end" required value="${n}" />
          </div>
          <div class="col-md-3">
            <label class="form-label" for="archive-storage">Ablage (optional)</label>
            <input type="text" class="form-control" id="archive-storage" name="archive-storage" placeholder="z.B. NAS" />
          </div>
          <div class="col-12">
            <label class="form-label" for="archive-note">Notiz (optional)</label>
            <textarea class="form-control" id="archive-note" name="archive-note" rows="1" placeholder=""></textarea>
          </div>
          <div class="col-12">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="archive-remove" name="archive-remove" checked />
              <label class="form-check-label" for="archive-remove">
                Nach Export löschen
              </label>
            </div>
          </div>
          <div class="col-12 d-flex flex-wrap gap-2">
            <button class="btn btn-outline-secondary" type="button" data-action="archive-cancel">Abbrechen</button>
            <button class="btn btn-primary" type="submit" data-action="archive-submit">Erstellen</button>
          </div>
        </form>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-outline-warning" type="button" data-action="archive-toggle">Archiv erstellen</button>
        </div>
        <div class="mt-4">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="h6 mb-0">Archiv-Historie</h5>
            <small class="text-muted">Letzte ${ti}</small>
          </div>
          <div data-role="archive-log-list"></div>
          <div class="d-flex justify-content-end mt-2" data-role="archive-log-pager"></div>
        </div>
      </div>
    </div>

    <div class="card card-dark mt-4">
      <div class="card-header d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 no-print">
        <div class="small text-muted" data-role="doc-info">Keine Einträge</div>
        <div class="d-flex flex-wrap gap-2 align-items-center">
          <label class="form-check-label d-flex align-items-center gap-1 mb-0 small text-muted" title="Alle Einträge im aktuellen Filter auswählen">
            <input type="checkbox" class="form-check-input mt-0" data-action="toggle-select-all" disabled />
            <span>Alle auswählen</span>
          </label>
          <div class="small text-muted" data-role="doc-selection-info">Keine Einträge ausgewählt</div>
          <div class="btn-group">
            <button class="btn btn-outline-light btn-sm" data-action="print-selection" disabled>Drucken</button>
            <button class="btn btn-outline-light btn-sm" data-action="pdf-selection" disabled>PDF</button>
            <button class="btn btn-outline-light btn-sm" data-action="export-selection" disabled>JSON</button>
            <button class="btn btn-outline-light btn-sm" data-action="export-zip" disabled>ZIP</button>
            <button class="btn btn-outline-light btn-sm" data-action="delete-selection" disabled>Löschen</button>
          </div>
          ${r}
        </div>
      </div>
      <div class="doc-focus-banner d-none no-print" data-role="doc-focus-banner">
        <div class="d-flex flex-column flex-lg-row align-items-lg-center gap-2">
          <span data-role="doc-focus-text">Filter aktiv</span>
          <button class="btn btn-sm btn-outline-warning" data-action="doc-focus-clear">Entfernen</button>
        </div>
      </div>
      <div class="alert alert-warning py-2 px-3 small d-none no-print" data-role="doc-refresh-indicator">
        Neue Einträge vorhanden.
      </div>
      <div class="card-body p-0">
        <div class="row g-0">
          <div class="col-12 col-lg-4 border-end">
            <div class="d-flex flex-column h-100">
              <div data-role="doc-list" class="list-group list-group-flush flex-grow-1 overflow-auto"></div>
              <div class="p-3">
                <div data-role="doc-pager"></div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-8">
            <div id="doc-detail" class="h-100 d-flex flex-column">
              <div data-role="doc-detail-empty" class="flex-grow-1 d-flex align-items-center justify-content-center text-muted text-center p-4">
                Eintrag auswählen
              </div>
              <div data-role="doc-detail-card" class="d-none h-100 d-flex flex-column">
                <div class="flex-grow-1 overflow-auto p-3" id="doc-detail-body"></div>
                <div class="border-top p-3 d-flex justify-content-end gap-2">
                  <button class="btn btn-outline-secondary" data-action="detail-print">Drucken / PDF</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>

    </div>
  `,e}function Cc(e){if(!e)return{};const t=new FormData(e),a=r=>{const s=t.get(r);return typeof s=="string"&&s?s:void 0},n=r=>{const s=t.get(r);if(typeof s!="string")return;const o=s.trim();return o||void 0};return{startDate:a("doc-start"),endDate:a("doc-end"),crop:n("doc-crop"),creator:n("doc-creator")}}let as="entries";function Ic(e,t){as!==t&&(as=t,e.querySelectorAll("[data-doc-tab]").forEach(a=>{a.classList.toggle("active",a.dataset.docTab===t)}),e.querySelectorAll("[data-pane]").forEach(a=>{a.style.display=a.dataset.pane===t?"block":"none"}))}function Bc(e,t){e.addEventListener("click",a=>{const n=a.target.closest("[data-doc-tab]");if(n&&n.dataset.docTab){Ic(e,n.dataset.docTab);return}}),e.addEventListener("submit",a=>{if(a.target instanceof HTMLFormElement){if(a.target.id==="doc-filter"){a.preventDefault(),mr(e,t,{refreshList:!0});const n=Cc(a.target);if(!n.startDate||!n.endDate){window.alert("Bitte Start- und Enddatum auswählen.");return}Z=n,Za(e),Mt(e,t.state.getState());return}a.target.dataset.role==="archive-form"&&(a.preventDefault(),Dc(e,t,a.target))}}),e.addEventListener("click",a=>{const n=a.target;if(!n)return;const r=n.dataset.action;if(!r){n.closest("[data-action]")&&a.stopPropagation();return}if(r==="reset-filters"){const l=e.querySelector("#doc-filter");l?.reset(),Z=ai(),Gs(l??null,Z),mr(e,t,{refreshList:!0}),Za(e),Mt(e,t.state.getState());return}if(r==="archive-toggle"){Cr(e),ze(e,"");return}if(r==="archive-cancel"){Cr(e,!1),ze(e,"");return}if(r==="archive-log-focus"){const l=n.dataset.logId;if(!l)return;const d=Yi(t.state.getState(),l);if(!d){window.alert("Archiv-Eintrag nicht gefunden.");return}const f=d.fileName?`Archiv ${d.fileName}`:"Archivierter Zeitraum";typeof t.events?.emit=="function"?t.events.emit("documentation:focus-range",{startDate:d.startDate,endDate:d.endDate,label:f,reason:"archive-log"}):(Z={...Z,startDate:d.startDate,endDate:d.endDate},Mt(e,t.state.getState())),ze(e,`Dokumentation auf Archiv ${d.startDate} – ${d.endDate} fokussiert.`,"success");return}if(r==="archive-log-copy-hint"){const l=n.dataset.logId;if(!l)return;const d=Yi(t.state.getState(),l);if(!d||!d.storageHint){window.alert("Kein Speicherhinweis vorhanden.");return}const f=d.storageHint;(async()=>{try{await cc(f),ze(e,"Speicherhinweis kopiert.","success")}catch(u){console.error("Hinweis konnte nicht kopiert werden",u),window.alert("Hinweis konnte nicht kopiert werden.")}})();return}if(r==="doc-focus-clear"){mr(e,t,{refreshList:!0});return}if(r==="print-selection"||r==="pdf-selection"){(async()=>{const l=await br();await eo(l)})();return}if(r==="export-selection"){(async()=>{const l=await br();Ac(l)})();return}if(r==="export-zip"){(async()=>{const l=await br();await Pc(l,Z)})();return}if(r==="delete-selection"){if(!je.size||!window.confirm("Ausgewählte Einträge wirklich löschen?"))return;Lc(e,t);return}if(r==="doc-seed"){if(!ha.enabled||Ka)return;const d=window.__PSL?.seedHistoryEntries;if(typeof d!="function"){window.alert("Seed-Funktion ist nicht verfügbar. Bitte Entwicklungsmodus verwenden.");return}Ka=!0,Nr(e),(async()=>{try{await d(ha.count),await Mt(e,t.state.getState())}catch(f){console.error("Dummy-Daten konnten nicht erstellt werden",f),window.alert("Dummy-Daten konnten nicht erstellt werden.")}finally{Ka=!1,Nr(e)}})();return}if(r==="detail-print"){const d=e.querySelector("#doc-detail")?.dataset.entryId;if(!d){window.alert("Kein Eintrag ausgewählt.");return}const f=Vt(d);if(!f){window.alert("Eintrag nicht verfügbar.");return}ts(f);return}const s=n.dataset.entryId;if(!s)return;const o=Vt(s);if(!o){window.alert("Eintrag nicht verfügbar.");return}if(r==="view-entry"){Xs(e,o,t.state.getState().fieldLabels);return}if(r==="print-entry"){ts(o);return}}),e.addEventListener("change",a=>{const n=a.target;if(!n)return;if(n.dataset.action==="toggle-select-all"){Ec(e,n.checked);return}if(n.dataset.action!=="toggle-select")return;const r=n.dataset.entryId;if(r){if(n.checked){je.add(r);const s=Vt(r);s&&Bt.set(r,s)}else je.delete(r),Bt.delete(r);sr(e)}})}function Nc(e,t){if(!e||Ui)return;const a=e;a.innerHTML="";const n=Mc();a.appendChild(n),Bc(n,t),Nr(n),ri(n,t.state.getState()),rr(n);const r=t.state.getState().archives?.logs??[];Va(n,r),Cn=Ir(r),ii(),typeof t.events?.subscribe=="function"&&t.events.subscribe("documentation:focus-range",l=>{!l||typeof l!="object"||Zl(n,t,l)});const s=l=>We(l.history).length,o=()=>Mt(n,t.state.getState());Qi?.(),Qi=_s({section:"documentation",event:"history:data-changed",shouldHandleEvent:()=>$e==="sqlite",shouldRefresh:()=>$e==="sqlite",onRefresh:()=>o(),onStatusChange:l=>Ul(n,l)}),Ca=s(t.state.getState()),o(),t.state.subscribe(l=>{const d=Ir(l.archives?.logs);d!==Cn&&(Cn=d,Va(n,l.archives?.logs??[]));const f=s(l);if(Mr){Ca=f;return}if($e==="sqlite"){Ca=f;return}f!==Ca&&(Ca=f,o())}),Ui=!0}const Ja=e=>We(e.gps.points),Ta=e=>We(e.points),Fc=new Intl.NumberFormat("de-DE",{minimumFractionDigits:5,maximumFractionDigits:5}),Tc=new Intl.DateTimeFormat("de-DE",{dateStyle:"short",timeStyle:"short"}),ns="Deutschland";let rs=!1,to="list",Sn=null,D=null,Ia=null,is=null;const Bn=25,hr=new Intl.NumberFormat("de-DE");let Ae=0,sa=null,Tr=null,ss=null;function ra(e,t){typeof e.events?.emit=="function"&&e.events.emit("history:gps-activation-result",{...t,source:"gps",timestamp:Date.now()})}function Ra(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function qc(){const e=document.createElement("section");return e.className="section-inner",e.innerHTML=`
    <div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-3 mb-3">
      <div>
        <h2 class="mb-1">
          <i class="bi bi-geo-alt-fill text-success me-2"></i>
          GPS-Standorte
        </h2>
        <p class="text-muted mb-0">GPS-Punkte verwalten</p>
      </div>
      <button class="btn btn-outline-light btn-sm" data-action="reload-points" data-gps-disable>
        <i class="bi bi-arrow-clockwise"></i>
      </button>
    </div>

    <div class="alert d-none" data-role="gps-message"></div>
    <div class="alert alert-warning py-2 px-3 small d-none" data-role="gps-refresh-indicator">
      Daten wurden geändert.
    </div>

    <div class="card card-dark">
      <div class="card-header border-secondary">
        <div class="btn-group btn-group-sm" role="tablist">
          <button class="btn btn-outline-light active" data-role="gps-tab" data-tab="list">
            <i class="bi bi-list-ul me-1"></i> Liste
          </button>
          <button class="btn btn-outline-light" data-role="gps-tab" data-tab="capture">
            <i class="bi bi-plus-circle me-1"></i> Neu
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="alert alert-warning d-none" data-role="gps-availability"></div>
        <div data-role="gps-panel" data-panel="list">
          <div class="d-flex flex-column flex-xl-row justify-content-between align-items-start gap-2 mb-3">
            <div>
              <span class="badge bg-success" data-role="gps-status">Bereit</span>
              <span class="text-muted ms-2" data-role="gps-summary"></span>
            </div>
            <div class="text-muted">
              <i class="bi bi-pin-map"></i>
              <span data-role="gps-active-info">Kein aktiver Punkt ausgewählt.</span>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-dark table-hover align-middle">
              <thead>
                <tr>
                  <th style="min-width: 180px;">Bezeichnung</th>
                  <th style="min-width: 160px;">Koordinaten</th>
                  <th style="min-width: 160px;">Quelle &amp; Aktualisiert</th>
                  <th class="text-end" style="width: 160px;">Aktionen</th>
                </tr>
              </thead>
              <tbody data-role="gps-list"></tbody>
            </table>
          </div>
          <div class="d-flex justify-content-end mt-3" data-role="gps-pager"></div>
          <div class="text-center text-muted py-4" data-role="gps-empty">
            <p class="mb-0">Keine GPS-Punkte vorhanden.</p>
          </div>
        </div>

        <div class="d-none" data-role="gps-panel" data-panel="capture">
          <form data-role="gps-form" class="gps-form">
            <div class="row g-3">
              <div class="col-12">
                <label class="form-label">Koordinaten aus Google Maps</label>
                <div class="input-group">
                  <input type="text" class="form-control" name="gps-raw-coordinates" placeholder="z. B. 47.68952, 9.12091" />
                  <button type="button" class="btn btn-outline-info" data-action="apply-raw-coords" data-gps-disable>
                    <i class="bi bi-clipboard2-check me-1"></i>
                    Einfügen &amp; aufteilen
                  </button>
                </div>
                <small class="form-text text-muted">
                  Tipp: In Google Maps auf die gewünschte Stelle klicken, beide Zahlen kopieren und hier einfügen. Die Felder unten werden automatisch gefüllt.
                </small>
              </div>
              <div class="col-md-6">
                <label class="form-label">Name *</label>
                <input type="text" class="form-control" name="gps-name" required data-gps-disable />
              </div>
              <div class="col-md-6">
                <label class="form-label">Quelle / Hinweis</label>
                <input type="text" class="form-control" name="gps-source" placeholder="z. B. Feld A oder Browser" data-gps-disable />
              </div>
              <div class="col-12">
                <label class="form-label">Beschreibung</label>
                <textarea class="form-control" rows="2" name="gps-description" data-gps-disable></textarea>
              </div>
              <div class="col-md-6">
                <label class="form-label">Breitengrad *</label>
                <input type="number" step="0.000001" class="form-control" name="gps-latitude" required data-gps-disable />
              </div>
              <div class="col-md-6">
                <label class="form-label">Längengrad *</label>
                <input type="number" step="0.000001" class="form-control" name="gps-longitude" required data-gps-disable />
              </div>
              <div class="col-12 d-flex flex-column flex-md-row gap-2">
                <button type="button" class="btn btn-outline-info btn-sm" data-action="verify-coords" data-gps-disable disabled>
                  <i class="bi bi-map me-1"></i>
                  Prüfen
                </button>
              </div>
              <div class="col-12 d-flex flex-wrap align-items-center gap-2">
                <button type="button" class="btn btn-outline-info btn-sm" data-action="use-geolocation" data-gps-disable>
                  <i class="bi bi-crosshair me-1"></i>
                  Browser-GPS
                </button>
                <div class="form-check ms-3">
                  <input class="form-check-input" type="checkbox" id="gps-activate" name="gps-activate" data-gps-disable />
                  <label class="form-check-label" for="gps-activate">Sofort aktivieren</label>
                </div>
                <button type="submit" class="btn btn-success ms-auto" data-gps-disable>
                  <i class="bi bi-save me-1"></i>
                  Speichern
                </button>
                <button type="reset" class="btn btn-outline-light">
                  Leeren
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,e}function Hc(e){return{root:e,message:e.querySelector('[data-role="gps-message"]'),refreshIndicator:e.querySelector('[data-role="gps-refresh-indicator"]'),availability:e.querySelector('[data-role="gps-availability"]'),tabButtons:Array.from(e.querySelectorAll('[data-role="gps-tab"]')),panels:Array.from(e.querySelectorAll('[data-role="gps-panel"]')),listBody:e.querySelector('[data-role="gps-list"]'),emptyState:e.querySelector('[data-role="gps-empty"]'),activeInfo:e.querySelector('[data-role="gps-active-info"]'),summaryLabel:e.querySelector('[data-role="gps-summary"]'),statusBadge:e.querySelector('[data-role="gps-status"]'),form:e.querySelector('[data-role="gps-form"]'),formFields:{name:e.querySelector('[name="gps-name"]'),description:e.querySelector('[name="gps-description"]'),latitude:e.querySelector('[name="gps-latitude"]'),longitude:e.querySelector('[name="gps-longitude"]'),source:e.querySelector('[name="gps-source"]'),activate:e.querySelector('[name="gps-activate"]'),rawCoordinates:e.querySelector('[name="gps-raw-coordinates"]')},disableTargets:Array.from(e.querySelectorAll("[data-gps-disable]")),geolocationBtn:e.querySelector('[data-action="use-geolocation"]'),mapButton:e.querySelector('[data-role="gps-open-maps"]'),verifyButton:e.querySelector('[data-action="verify-coords"]')}}function qa(e){return`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e)}`}function ao(e){const t=e.gps,a=Ta(t),n=o=>{if(!o)return null;const l=en(o)||qa(`${o.latitude},${o.longitude}`),d=o.name?`${o.name}`:`${va(o.latitude)}, ${va(o.longitude)}`;return{url:l,label:d}};if(t.activePointId){const o=a.find(d=>d.id===t.activePointId),l=n(o||null);if(l)return l}if(a.length>0){const o=n(a[0]);if(o)return o}const r=e.company?.address?.trim();if(r)return{url:qa(r.replace(/\n/g,", ")),label:r};const s=e.company?.name?.trim();return s?{url:qa(s),label:s}:{url:qa(ns),label:ns}}function Oc(e){if(!D)return;const t=ao(e);D.mapButton&&(D.mapButton.href=t.url,D.mapButton.title=`Google Maps öffnen (${t.label})`);const a=D.root.querySelector('[data-role="gps-empty-map-link"]');a&&(a.href=t.url)}function _c(e){if(!e)return null;const a=e.trim().replace(/\s+/g," ").replace(/[,;]/g," ").match(/-?\d+(?:[.,]\d+)?/g);if(!a||a.length<2)return null;const n=o=>Number(o.replace(/,/g,".")),r=n(a[0]),s=n(a[1]);return!Number.isFinite(r)||!Number.isFinite(s)||r<-90||r>90||s<-180||s>180?null:{latitude:r,longitude:s}}function Kc(){if(!D?.formFields)return null;const e=D.formFields.latitude?.value??"",t=D.formFields.longitude?.value??"";if(!e.trim()||!t.trim())return null;const a=Number(e),n=Number(t);return!Number.isFinite(a)||!Number.isFinite(n)||a<-90||a>90||n<-180||n>180?null:{latitude:a,longitude:n}}function En(e){return Number(e).toFixed(6)}function Rc(e,t){const a=En(e),n=En(t);return Ja(j()).some(r=>En(r.latitude)===a&&En(r.longitude)===n)}function Wa(){if(!D?.verifyButton)return;const e=Kc(),t=!!e;if(D.verifyButton.disabled=!t,e){const a=en({latitude:e.latitude,longitude:e.longitude});D.verifyButton.dataset.targetUrl=a||qa(`${e.latitude},${e.longitude}`)}else delete D.verifyButton.dataset.targetUrl}function va(e){const t=Number(e);return Number.isFinite(t)?`${Fc.format(t)}°`:"–"}function Wc(e){if(!e)return"–";const t=new Date(e);return Number.isNaN(t.getTime())?"–":Tc.format(t)}function oe(e,t="info",a=4500){if(D?.message){if(Sn&&(window.clearTimeout(Sn),Sn=null),!e){D.message.classList.add("d-none"),D.message.textContent="";return}D.message.className=`alert alert-${t}`,D.message.textContent=e,D.message.classList.remove("d-none"),a>0&&(Sn=window.setTimeout(()=>{D?.message?.classList.add("d-none")},a))}}function jc(e){const t=D?.refreshIndicator;if(t){if(t.classList.remove("alert-warning","alert-info"),e==="idle"){t.classList.add("d-none");return}t.classList.remove("d-none"),e==="stale"?(t.classList.add("alert-warning"),t.textContent="GPS-Daten wurden geändert. Ansicht aktualisiert sich beim Öffnen."):(t.classList.add("alert-info"),t.textContent="GPS-Daten werden aktualisiert...")}}function no(e){D&&(to=e,D.tabButtons.forEach(t=>{const a=t.dataset.tab===e;t.classList.toggle("active",a)}),D.panels.forEach(t=>{const a=t.getAttribute("data-panel")===e;t.classList.toggle("d-none",!a)}))}function Ge(e){return e?.hasDatabase?e.storageDriver!=="sqlite"?"wrong-driver":"ok":"no-db"}function Gc(e){if(D?.availability){if(e==="ok"){D.availability.classList.add("d-none"),D.availability.textContent="";return}D.availability.classList.remove("d-none"),D.availability.textContent=e==="no-db"?"Bitte verbinden Sie zuerst eine Datenbank, um GPS-Punkte zu verwalten.":"GPS-Funktionen benötigen eine aktive SQLite-Datenbank. Bitte den SQLite-Treiber in den Einstellungen auswählen."}}function pa(e,t){if(!D)return;const a=t!=="ok"||e.pending||Ua.isLocked();if(D.disableTargets.forEach(n=>{(n instanceof HTMLButtonElement||n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n instanceof HTMLSelectElement)&&(n.disabled=a)}),D.statusBadge){let n="badge bg-success",r="Bereit";t==="no-db"?(n="badge bg-secondary",r="Keine Datenbank"):t==="wrong-driver"?(n="badge bg-warning text-dark",r="Nur mit SQLite"):(e.pending||Ua.isLocked())&&(n="badge bg-info text-dark",r="Wird verarbeitet"),D.statusBadge.className=n,D.statusBadge.textContent=r}}function ro(e){const t=e.length;if(!t)return Ae=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/Bn),1);Ae>=a&&(Ae=a-1),Ae<0&&(Ae=0);const n=Ae*Bn,r=Math.min(n+Bn,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function Uc(){if(!D?.root)return null;const e=D.root.querySelector('[data-role="gps-pager"]');return e?((!sa||Tr!==e)&&(sa?.destroy(),sa=tn(e,{onPrev:()=>Zc(),onNext:()=>Qc(),labels:{prev:"Zurück",next:"Weiter",loading:"GPS-Punkte werden geladen...",empty:"Keine GPS-Punkte verfügbar"}}),Tr=e),sa):null}function os(e,t){const a=Uc();if(!a)return;if(t!=="ok"){Ae=0;const o=t==="no-db"?"Keine Datenbank verbunden.":"Nur mit SQLite verfügbar.";a.update({status:"disabled",info:o});return}const n=Ja(e).length;if(!n){Ae=0;const o=e.gps.initialized?"Noch keine GPS-Punkte vorhanden.":"GPS-Punkte werden geladen...";a.update({status:"disabled",info:o});return}const{start:r,end:s}=ro(Ja(e));a.update({status:"ready",info:`Einträge ${hr.format(r+1)}–${hr.format(s)} von ${hr.format(n)}`,canPrev:Ae>0,canNext:s<n})}function Vc(e,t){return e.length?e.map(a=>{const n=a.id===t,r=a.description?`<div class="text-muted small">${b(a.description)}</div>`:"",s=a.source?`<span class="badge-psm badge-psm-neutral">${b(a.source)}</span>`:'<span class="text-muted">–</span>',o=n?'<span class="badge bg-success ms-2">Aktiv</span>':"",l=en(a),d=l?`<a class="btn btn-outline-info" href="${Ra(l)}" target="_blank" rel="noopener noreferrer">
              Karte
            </a>`:"";return`
        <tr data-point-id="${Ra(a.id)}">
          <td>
            <div class="fw-semibold">${b(a.name||"Ohne Namen")}${o}</div>
            ${r}
          </td>
          <td class="font-monospace">
            <div>${va(a.latitude)}</div>
            <div>${va(a.longitude)}</div>
          </td>
          <td>
            <div>${s}</div>
            <div class="text-muted small">${Wc(a.updatedAt)}</div>
          </td>
          <td class="text-end">
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-success" data-action="set-active" ${n?"disabled":""}>
                Aktivieren
              </button>
              ${d}
              <button class="btn btn-outline-light" data-action="copy-coords">
                Kopieren
              </button>
              <button class="btn btn-outline-danger" data-action="delete-point">
                Löschen
              </button>
            </div>
          </td>
        </tr>
      `}).join(`
`):""}function ci(e,t){if(!D)return;const a=e.gps,n=ao(e),r=t==="ok";if(D.summaryLabel){const s=Ta(a).length;D.summaryLabel.textContent=r?`${s} Punkt${s===1?"":"e"} gespeichert`:"Funktion derzeit nicht verfügbar"}if(!r){D.listBody&&(D.listBody.innerHTML=""),D.emptyState&&(D.emptyState.textContent=t==="no-db"?"Keine Datenbank verbunden.":"Bitte SQLite als Speicher-Treiber aktivieren.",D.emptyState.classList.remove("d-none")),D.activeInfo&&(D.activeInfo.textContent=t==="no-db"?"Wartet auf Datenbank.":"Nur mit SQLite verfügbar."),os(e,t);return}if(D.listBody){const{items:s}=ro(Ta(a));D.listBody.innerHTML=Vc(s,a.activePointId)}if(D.emptyState){const s=Ta(a).length>0;D.emptyState.classList.toggle("d-none",s),!s&&a.initialized?D.emptyState.innerHTML=`
        <p class="mb-2">Noch keine GPS-Punkte vorhanden.</p>
        <p class="small text-muted mb-3">
          Nutzen Sie "Neuer Punkt" oder öffnen Sie Google Maps, um Koordinaten zu ermitteln.
        </p>
        <a class="btn btn-outline-info btn-sm" data-role="gps-empty-map-link" href="${Ra(n.url)}" target="_blank" rel="noopener noreferrer">
          <i class="bi bi-box-arrow-up-right me-1"></i>
          Google Maps öffnen
        </a>
      `:a.initialized||(D.emptyState.textContent="GPS-Punkte werden geladen...")}if(D.activeInfo)if(a.activePointId){const s=Ta(a).find(o=>o.id===a.activePointId);if(s){const o=`${s.name||"Ohne Namen"} (${va(s.latitude)}, ${va(s.longitude)})`,l=en(s);l?D.activeInfo.innerHTML=`${b(o)} <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${Ra(l)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:D.activeInfo.textContent=o}else D.activeInfo.textContent="Aktiver Punkt nicht gefunden."}else D.activeInfo.innerHTML=`Kein aktiver Punkt ausgewählt. <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${Ra(n.url)}" target="_blank" rel="noopener noreferrer">Google Maps öffnen</a>`;os(e,t)}function Zc(){if(Ae===0)return;Ae=Math.max(Ae-1,0);const e=j(),t=Ge(e.app);ci(e,t)}function Qc(){const e=j(),t=Ja(e).length;if(!t)return;const a=Math.max(Math.ceil(t/Bn)-1,0);if(Ae>=a)return;Ae=Math.min(Ae+1,a);const n=Ge(e.app);ci(e,n)}function Ie(e){`${new Date().toLocaleString("de-DE")}${e}`}function nn(e){if(!e)return null;const t=j();return Ja(t).find(a=>a.id===e)||null}async function Jc(e){if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(e);return}const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}function Yc(){if(!D?.formFields?.rawCoordinates)return;const e=D.formFields.rawCoordinates.value,t=_c(e);if(!t){oe("Koordinaten konnten nicht erkannt werden. Bitte Format 47.68952, 9.12091 verwenden.","warning",6e3);return}const a=t.latitude.toFixed(6),n=t.longitude.toFixed(6);D.formFields.latitude&&(D.formFields.latitude.value=a),D.formFields.longitude&&(D.formFields.longitude.value=n),oe("Koordinaten übernommen.","success"),Wa()}function Xc(){if(!D?.verifyButton)return;const e=D.verifyButton.dataset.targetUrl;if(!e){oe("Bitte zuerst gültige Koordinaten eintragen, bevor die Prüfung geöffnet wird.","warning",6e3);return}window.open(e,"_blank","noopener,noreferrer")}async function qr(e={}){const{notify:t=!1}=e;if(!(!D||Ge(j().app)!=="ok"||j().gps.pending))try{await Es(),t&&oe("GPS-Punkte aktualisiert.","success"),Ie("GPS-Punkte synchronisiert.")}catch(n){const r=n instanceof Error?n.message:"GPS-Punkte konnten nicht geladen werden.";oe(r,"danger",7e3),Ie(`Fehler beim Laden: ${r}`)}}async function ed(e){if(!e)return;const t=nn(e);if(!t){oe("Ausgewählter GPS-Punkt wurde nicht gefunden.","warning");return}try{await As(t.id),oe(`"${t.name}" ist nun aktiv.`,"success"),Ie(`Aktiver GPS-Punkt: ${t.name}`)}catch(a){const n=a instanceof Error?a.message:"GPS-Punkt konnte nicht aktiviert werden.";oe(n,"danger",7e3),Ie(`Fehler beim Aktivieren: ${n}`)}}async function td(e){if(!e)return;const t=nn(e);if(!t){oe("GPS-Punkt existiert nicht mehr.","warning");return}if(window.confirm(`"${t.name}" wirklich löschen? Dieser Schritt kann nicht rückgängig gemacht werden.`))try{await Ko(t.id),oe(`"${t.name}" wurde gelöscht.`,"success"),Ie(`GPS-Punkt gelöscht: ${t.name}`)}catch(n){const r=n instanceof Error?n.message:"GPS-Punkt konnte nicht gelöscht werden.";oe(r,"danger",7e3),Ie(`Löschen fehlgeschlagen: ${r}`)}}async function ad(e){if(!e)return;const t=nn(e);if(!t){oe("GPS-Punkt nicht gefunden.","warning");return}const a=`${t.latitude}, ${t.longitude}`;try{await Jc(a),oe("Koordinaten in die Zwischenablage kopiert.","success")}catch(n){console.error("clipboard error",n),oe("Koordinaten konnten nicht kopiert werden.","danger",7e3)}}async function nd(e,t){const a=(e||"").trim();if(!a){ra(t,{status:"error",id:"",message:"Ungültige GPS-Anfrage ohne ID."});return}if(Ge(j().app)!=="ok"){oe("GPS-Modul ist ohne aktive SQLite-Datenbank nicht verfügbar.","warning",6e3),ra(t,{status:"error",id:a,message:"GPS-Modul ist derzeit nicht verfügbar."});return}const r=nn(a);if(!r){oe("Verknüpfter GPS-Punkt wurde nicht gefunden.","warning",6e3),ra(t,{status:"error",id:a,message:"Verknüpfter GPS-Punkt wurde nicht gefunden."});return}ra(t,{status:"pending",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wird aktiviert...`});try{await As(r.id),oe(`"${r.name||"Ohne Namen"}" wurde aus der Historie aktiviert.`,"success"),Ie(`Aus Historie aktiviert: ${r.name||r.id}`),ra(t,{status:"success",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wurde aktiviert.`})}catch(s){const o=s instanceof Error?s.message:"GPS-Punkt konnte nicht aktiviert werden.";oe(o,"danger",7e3),Ie(`Aktivierung aus Historie fehlgeschlagen: ${o}`),ra(t,{status:"error",id:r.id,name:r.name,message:o})}}async function rd(){try{await Ro(),Ie("Aktiver GPS-Punkt synchronisiert."),oe("Aktiver GPS-Punkt wurde synchronisiert.","success")}catch(e){const t=e instanceof Error?e.message:"Aktiver GPS-Punkt konnte nicht ermittelt werden.";oe(t,"danger",7e3),Ie(`Sync fehlgeschlagen: ${t}`)}}function id(){if(!D?.formFields)throw new Error("Formular nicht initialisiert");const e=D.formFields.name?.value.trim()||"",t=D.formFields.description?.value.trim()||"",a=D.formFields.source?.value.trim()||"",n=Number(D.formFields.latitude?.value),r=Number(D.formFields.longitude?.value),s=!!D.formFields.activate?.checked;if(!e)throw new Error("Name darf nicht leer sein.");if(!Number.isFinite(n)||!Number.isFinite(r))throw new Error("Koordinaten sind ungültig.");return{name:e,description:t,latitude:n,longitude:r,source:a,activate:s}}async function sd(e){if(e.preventDefault(),Ua.isLocked()){oe("Speichern läuft bereits ...","info");return}try{const t=id();if(Rc(t.latitude,t.longitude)){oe("Ein GPS-Punkt mit identischen Koordinaten ist bereits vorhanden.","warning",6e3);return}pa(j().gps,Ge(j().app)),await Wo({name:t.name,description:t.description||null,latitude:t.latitude,longitude:t.longitude,source:t.source||null},{activate:t.activate}),B.success(`GPS-Punkt "${t.name}" gespeichert.`),Ie(`GPS-Punkt gespeichert${t.activate?" und aktiv gesetzt":""}: ${t.name}`),D?.form?.reset()}catch(t){const a=t instanceof Error?t.message:"GPS-Punkt konnte nicht gespeichert werden.";B.error(a),Ie(`Speichern fehlgeschlagen: ${a}`)}finally{pa(j().gps,Ge(j().app))}}function od(){if(D?.formFields){if(!navigator.geolocation){B.warning("Geolocation wird von diesem Browser nicht unterstützt.");return}if(Ua.isLocked()){B.info("Bitte warten...");return}Ua.acquire(async()=>(pa(j().gps,Ge(j().app)),new Promise(e=>{navigator.geolocation.getCurrentPosition(t=>{const{latitude:a,longitude:n}=t.coords;D?.formFields.latitude&&(D.formFields.latitude.value=a.toFixed(6)),D?.formFields.longitude&&(D.formFields.longitude.value=n.toFixed(6)),D?.formFields.source&&!D.formFields.source.value.trim()&&(D.formFields.source.value="Browser"),B.success("Koordinaten aus Browser-Position übernommen."),Ie("Browser-Geolocation übernommen"),Wa(),pa(j().gps,Ge(j().app)),e()},t=>{const a=t.code===t.PERMISSION_DENIED?"Zugriff auf Standort wurde verweigert.":"Geolocation konnte nicht ermittelt werden.";B.warning(a),Ie(`Geolocation fehlgeschlagen: ${a}`),pa(j().gps,Ge(j().app)),e()},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})})))}}function ld(){D&&(D.root.addEventListener("click",e=>{const t=e.target;if(!t)return;const a=t.closest('[data-role="gps-tab"]');if(a&&a.dataset.tab){no(a.dataset.tab);return}const n=t.closest("[data-action]");if(!n||n.dataset.action==="")return;const s=n.closest("[data-point-id]")?.getAttribute("data-point-id")||"";switch(n.dataset.action){case"reload-points":qr({notify:!0});break;case"sync-active":rd();break;case"set-active":ed(s);break;case"delete-point":td(s);break;case"copy-coords":ad(s);break;case"use-geolocation":od();break;case"apply-raw-coords":Yc();break;case"verify-coords":Xc();break}}),D.form?.addEventListener("submit",e=>{sd(e)}),D.form?.addEventListener("reset",()=>{window.setTimeout(()=>{Wa()},0)}),D.formFields.latitude?.addEventListener("input",()=>{Wa()}),D.formFields.longitude?.addEventListener("input",()=>{Wa()}))}function cd(e,t){if(!e||rs)return;rs=!0;const a=e;a.innerHTML="";const n=qc();a.appendChild(n),D=Hc(n),ss?.(),ss=_s({section:"gps",event:"gps:data-changed",shouldHandleEvent:()=>Ge(t.state.getState().app)==="ok",shouldRefresh:()=>Ge(t.state.getState().app)==="ok",onRefresh:()=>qr({notify:!1}),onStatusChange:o=>jc(o)}),Ae=0,sa?.destroy(),sa=null,Tr=null,ld(),no(to),typeof t.events?.subscribe=="function"&&t.events.subscribe("gps:set-active-from-history",o=>{let l="";if(o&&typeof o=="object"&&(l=String(o.id||"").trim()),!l){oe("Historische GPS-Anfrage ohne gültige ID erhalten.","warning",6e3);return}nd(l,t)});const r=t.state.getState();Ia=r.gps.activePointId;const s=(o,l)=>{const d=Ge(o.app),f=o.gps;if(Gc(d),ci(o,d),pa(f,d),Oc(o),d==="ok"&&!f.initialized&&!f.pending&&qr({notify:!1}),d==="ok"&&is!=="ok"&&f.initialized&&oe("GPS-Bereich ist wieder verfügbar.","success"),is=d,o.gps.activePointId!==Ia&&(Ia=o.gps.activePointId,typeof t.events?.emit=="function")){const u=nn(Ia);t.events.emit("gps:active-point-changed",{id:Ia,point:u})}o.gps.lastError&&o.gps.lastError!==l.gps.lastError&&(oe(o.gps.lastError,"danger",7e3),Ie(`Fehler: ${o.gps.lastError}`))};t.state.subscribe(s),s(r,r)}let Te=[],qe=[],Hr=!1,Nn=null;async function mt(){try{const[e,t]=await Promise.all([Zo({limit:100}),Qo({limit:100})]);Te=e.items||[],qe=t.items||[],On("savedCodes:changed",{eppoCount:Te.length,bbchCount:qe.length})}catch(e){console.error("Failed to load saved codes:",e),Te=[],qe=[]}}function dd(){const e=Te.length>0,t=qe.length>0;return`
    <div class="row g-4">
      <!-- EPPO Codes Section -->
      <div class="col-lg-6">
        <div class="card card-dark codes-card h-100">
          <div class="card-header codes-card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="bi bi-flower1 me-2 text-success"></i>
              Kulturen (EPPO-Codes)
            </h5>
            <span class="badge badge-psm-neutral">${Te.length} gespeichert</span>
          </div>
          <div class="card-body">
            <!-- Suchfeld für EPPO - prominent -->
            <div class="mb-3">
              <label class="form-label">
                <i class="bi bi-search me-1"></i>
                Kultur suchen und speichern
              </label>
              <input type="text" class="form-control form-control-lg" 
                     data-input="eppo-search" 
                     placeholder="z.B. Tomate, Apfel, Salat, Gurke..."
                     autocomplete="off" />
              <small class="form-text text-muted">Tippe mindestens 2 Buchstaben – Klick speichert direkt</small>
              <div data-role="eppo-search-results" class="list-group mt-2" style="max-height: 250px; overflow-y: auto;"></div>
            </div>
            
            <!-- Saved EPPO List - MOVED UP for visibility -->
            <div class="border-top pt-3 mb-3" style="border-color: var(--border-1) !important;">
              ${e?`
                <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
                  <i class="bi bi-bookmark-star me-1"></i>
                  Meine Kulturen
                  <span class="badge bg-success ms-2">${Te.length}</span>
                </h6>
                <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${Or()}
                </div>
              `:`
                <div class="text-center py-3 text-muted">
                  <i class="bi bi-inbox fs-3 d-block mb-2 opacity-50"></i>
                  <p class="mb-0 small">Noch keine Kulturen gespeichert</p>
                  <small>Suche oben und klicke zum Speichern</small>
                </div>
              `}
            </div>
            
            <!-- Manuell eingeben - Collapsed by default -->
            <div class="border-top pt-2" style="border-color: var(--border-1) !important;">
              <button class="btn btn-sm btn-link text-decoration-none p-0 text-muted" type="button" 
                      data-bs-toggle="collapse" data-bs-target="#eppo-manual-form" 
                      aria-expanded="false">
                <i class="bi bi-pencil me-1"></i>
                Manuell eingeben
                <i class="bi bi-chevron-down ms-1"></i>
              </button>
              
              <div class="collapse mt-3" id="eppo-manual-form">
                <form data-form="add-eppo" class="row g-2">
                  <div class="col-5">
                    <input type="text" class="form-control form-control-sm" data-input="eppo-code" placeholder="Code (z.B. SOLLY)" />
                  </div>
                  <div class="col-5">
                    <input type="text" class="form-control form-control-sm" data-input="eppo-name" placeholder="Name (z.B. Tomate)" />
                  </div>
                  <div class="col-2">
                    <button type="submit" class="btn btn-psm-primary btn-sm w-100">
                      <i class="bi bi-plus-lg"></i>
                    </button>
                  </div>
                  <div class="col-12">
                    <div class="form-check form-check-inline">
                      <input type="checkbox" class="form-check-input" data-input="eppo-favorite" id="eppo-favorite" />
                      <label class="form-check-label small" for="eppo-favorite">
                        <i class="bi bi-star text-warning me-1"></i>Favorit
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- BBCH Codes Section -->
      <div class="col-lg-6">
        <div class="card card-dark codes-card h-100">
          <div class="card-header codes-card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="bi bi-bar-chart-steps me-2 text-info"></i>
              Wachstumsstadien (BBCH)
            </h5>
            <span class="badge badge-psm-neutral">${qe.length} gespeichert</span>
          </div>
          <div class="card-body">
            <!-- Suchfeld für BBCH - prominent -->
            <div class="mb-3">
              <label class="form-label">
                <i class="bi bi-search me-1"></i>
                Stadium suchen und speichern
              </label>
              <input type="text" class="form-control form-control-lg" 
                     data-input="bbch-search" 
                     placeholder="z.B. Blüte, Ernte, 65, Keimung..."
                     autocomplete="off" />
              <small class="form-text text-muted">Tippe einen Begriff oder eine Nummer – Klick speichert direkt</small>
              <div data-role="bbch-search-results" class="list-group mt-2" style="max-height: 250px; overflow-y: auto;"></div>
            </div>
            
            <!-- Saved BBCH List - MOVED UP for visibility -->
            <div class="border-top pt-3 mb-3" style="border-color: var(--border-1) !important;">
              ${t?`
                <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
                  <i class="bi bi-bookmark-star me-1"></i>
                  Meine Stadien
                  <span class="badge bg-info ms-2">${qe.length}</span>
                </h6>
                <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${_r()}
                </div>
              `:`
                <div class="text-center py-3 text-muted">
                  <i class="bi bi-inbox fs-3 d-block mb-2 opacity-50"></i>
                  <p class="mb-0 small">Noch keine Stadien gespeichert</p>
                  <small>Suche oben und klicke zum Speichern</small>
                </div>
              `}
            </div>
            
            <!-- Manuell eingeben - Collapsed by default -->
            <div class="border-top pt-2" style="border-color: var(--border-1) !important;">
              <button class="btn btn-sm btn-link text-decoration-none p-0 text-muted" type="button" 
                      data-bs-toggle="collapse" data-bs-target="#bbch-manual-form" 
                      aria-expanded="false">
                <i class="bi bi-pencil me-1"></i>
                Manuell eingeben
                <i class="bi bi-chevron-down ms-1"></i>
              </button>
              
              <div class="collapse mt-3" id="bbch-manual-form">
                <form data-form="add-bbch" class="row g-2">
                  <div class="col-3">
                    <input type="text" class="form-control form-control-sm" data-input="bbch-code" placeholder="Code" />
                  </div>
                  <div class="col-7">
                    <input type="text" class="form-control form-control-sm" data-input="bbch-label" placeholder="Bezeichnung" />
                  </div>
                  <div class="col-2">
                    <button type="submit" class="btn btn-psm-primary btn-sm w-100">
                      <i class="bi bi-plus-lg"></i>
                    </button>
                  </div>
                  <div class="col-12">
                    <div class="form-check form-check-inline">
                      <input type="checkbox" class="form-check-input" data-input="bbch-favorite" id="bbch-favorite" />
                      <label class="form-check-label small" for="bbch-favorite">
                        <i class="bi bi-star text-warning me-1"></i>Favorit
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function Or(){return Te.length?Te.map(e=>`
    <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-eppo-id="${b(e.id)}">
      <div class="flex-grow-1">
        ${e.isFavorite?'<i class="bi bi-star-fill text-warning me-2"></i>':""}
        <strong class="text-success">${b(e.code)}</strong>
        <span class="ms-2">${b(e.name)}</span>
        ${e.usageCount>0?`<span class="badge bg-secondary ms-2">${e.usageCount}x</span>`:""}
      </div>
      <div class="btn-group btn-group-sm">
        <button type="button" class="btn btn-outline-warning" data-action="toggle-favorite-eppo" data-id="${b(e.id)}" title="Favorit umschalten">
          <i class="bi bi-star${e.isFavorite?"-fill":""}"></i>
        </button>
        <button type="button" class="btn btn-outline-danger" data-action="delete-eppo" data-id="${b(e.id)}" title="Löschen">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  `).join(""):`
      <div class="list-group-item list-group-item-action text-muted text-center py-4">
        <i class="bi bi-inbox fs-2 d-block mb-2"></i>
        Noch keine EPPO-Codes gespeichert
      </div>
    `}function _r(){return qe.length?qe.map(e=>`
    <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-bbch-id="${b(e.id)}">
      <div class="flex-grow-1">
        ${e.isFavorite?'<i class="bi bi-star-fill text-warning me-2"></i>':""}
        <strong class="text-info">${b(e.code)}</strong>
        <span class="ms-2">${b(e.label)}</span>
        ${e.usageCount>0?`<span class="badge bg-secondary ms-2">${e.usageCount}x</span>`:""}
      </div>
      <div class="btn-group btn-group-sm">
        <button type="button" class="btn btn-outline-warning" data-action="toggle-favorite-bbch" data-id="${b(e.id)}" title="Favorit umschalten">
          <i class="bi bi-star${e.isFavorite?"-fill":""}"></i>
        </button>
        <button type="button" class="btn btn-outline-danger" data-action="delete-bbch" data-id="${b(e.id)}" title="Löschen">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  `).join(""):`
      <div class="list-group-item list-group-item-action text-muted text-center py-4">
        <i class="bi bi-inbox fs-2 d-block mb-2"></i>
        Noch keine BBCH-Stadien gespeichert
      </div>
    `}function gt(e){const t=e.querySelector('[data-role="saved-eppo-list"]'),a=Te.length>0;if(t){const l=t.closest(".border-top");l&&a&&(l.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Kulturen
            <span class="badge bg-success ms-2">${Te.length}</span>
          </h6>
          <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Or()}
          </div>
        `)}else if(a){const l=e.querySelector(".codes-card:first-child .border-top.pt-3.mb-3");l&&(l.innerHTML=`
        <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
          <i class="bi bi-bookmark-star me-1"></i>
          Meine Kulturen
          <span class="badge bg-success ms-2">${Te.length}</span>
        </h6>
        <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
          ${Or()}
        </div>
      `)}const n=e.querySelector('[data-role="saved-bbch-list"]'),r=qe.length>0;if(n){const l=n.closest(".border-top");l&&r&&(l.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${qe.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${_r()}
          </div>
        `)}else if(r){const d=e.querySelectorAll(".codes-card")[1];if(d){const f=d.querySelector(".border-top.pt-3.mb-3");f&&(f.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${qe.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${_r()}
          </div>
        `)}}const s=e.querySelector(".codes-card:first-child .card-header .badge"),o=e.querySelector(".codes-card:last-child .card-header .badge");s&&(s.textContent=`${Te.length} gespeichert`),o&&(o.textContent=`${qe.length} gespeichert`)}function ud(e){const t=e.querySelector('[data-input="eppo-search"]'),a=e.querySelector('[data-role="eppo-search-results"]');if(t&&a){const l=ki(async()=>{const d=t.value.trim();if(d.length<2){a.innerHTML="";return}try{const f=await Uo(d,10);if(!f.length){a.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${b(d)}"</div>
          `;return}a.innerHTML=f.map(u=>`
          <button type="button" class="list-group-item list-group-item-action" 
                  data-action="select-eppo" 
                  data-code="${b(u.code)}" 
                  data-name="${b(u.name)}"
                  data-language="${b(u.language||"")}"
                  data-dtcode="${b(u.dtcode||"")}">
            <strong class="text-success">${b(u.code)}</strong>
            <span class="ms-2">${b(u.name)}</span>
            ${u.dtcode?`<small class="text-muted ms-2">(${b(u.dtcode)})</small>`:""}
          </button>
        `).join("")}catch(f){console.error("EPPO search failed:",f),a.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);t.addEventListener("input",l)}const n=e.querySelector('[data-input="bbch-search"]'),r=e.querySelector('[data-role="bbch-search-results"]');if(n&&r){const l=ki(async()=>{const d=n.value.trim();if(d.length<1){r.innerHTML="";return}try{const f=await Vo(d,10);if(!f.length){r.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${b(d)}"</div>
          `;return}r.innerHTML=f.map(u=>`
          <button type="button" class="list-group-item list-group-item-action d-flex align-items-start gap-2 py-2" 
                  data-action="select-bbch" 
                  data-code="${b(u.code)}" 
                  data-label="${b(u.label)}"
                  data-principal="${u.principalStage??""}"
                  data-secondary="${u.secondaryStage??""}">
            <strong class="text-info flex-shrink-0" style="min-width: 35px;">${b(u.code)}</strong>
            <span class="text-break" style="line-height: 1.4;">${b(u.label)}</span>
          </button>
        `).join("")}catch(f){console.error("BBCH search failed:",f),r.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);n.addEventListener("input",l)}e.dataset.codesClickBound!=="1"&&(e.dataset.codesClickBound="1",e.addEventListener("click",async l=>{const f=l.target.closest("[data-action]");if(!f)return;const u=f.dataset.action;if(u==="select-eppo"){const g=f.dataset.code||"",v=f.dataset.name||"",w=f.dataset.language||"",h=f.dataset.dtcode||"";if(!g||!v){console.warn("EPPO selection missing code or name");return}a&&(a.innerHTML=""),t&&(t.value="");const S=Te.find(x=>x.code.toUpperCase()===g.toUpperCase());if(S){const x=e.querySelector(`[data-eppo-id="${S.id}"]`);x&&(x.classList.add("flash-highlight"),setTimeout(()=>x.classList.remove("flash-highlight"),800));return}try{await ur({code:g,name:v,language:w||void 0,dtcode:h||void 0,isFavorite:!1});const x=Je();await Ye(x),await mt(),gt(e)}catch(x){console.error("Failed to save EPPO from search:",x),alert("Speichern fehlgeschlagen")}}if(u==="select-bbch"){const g=f.dataset.code||"",v=f.dataset.label||"",w=f.dataset.principal,h=f.dataset.secondary,S=w?parseInt(w,10):void 0,x=h?parseInt(h,10):void 0;if(!g||!v){console.warn("BBCH selection missing code or label");return}r&&(r.innerHTML=""),n&&(n.value="");const E=qe.find(I=>I.code===g);if(E){const I=e.querySelector(`[data-bbch-id="${E.id}"]`);I&&(I.classList.add("flash-highlight"),setTimeout(()=>I.classList.remove("flash-highlight"),800));return}try{await pr({code:g,label:v,principalStage:Number.isNaN(S)?void 0:S,secondaryStage:Number.isNaN(x)?void 0:x,isFavorite:!1});const I=Je();await Ye(I),await mt(),gt(e)}catch(I){console.error("Failed to save BBCH from search:",I),alert("Speichern fehlgeschlagen")}}if(u==="toggle-favorite-eppo"){const g=f.dataset.id;if(!g)return;const v=Te.find(w=>w.id===g);if(!v)return;try{await ur({id:v.id,code:v.code,name:v.name,language:v.language,dtcode:v.dtcode,isFavorite:!v.isFavorite});const w=Je();await Ye(w),await mt(),gt(e)}catch(w){console.error("Failed to toggle EPPO favorite:",w)}}if(u==="toggle-favorite-bbch"){const g=f.dataset.id;if(!g)return;const v=qe.find(w=>w.id===g);if(!v)return;try{await pr({id:v.id,code:v.code,label:v.label,principalStage:v.principalStage,secondaryStage:v.secondaryStage,isFavorite:!v.isFavorite});const w=Je();await Ye(w),await mt(),gt(e)}catch(w){console.error("Failed to toggle BBCH favorite:",w)}}if(u==="delete-eppo"){const g=f.dataset.id;if(!g||!confirm("EPPO-Code wirklich löschen?"))return;try{await jo({id:g});const v=Je();await Ye(v),await mt(),gt(e)}catch(v){console.error("Failed to delete EPPO:",v)}}if(u==="delete-bbch"){const g=f.dataset.id;if(!g||!confirm("BBCH-Stadium wirklich löschen?"))return;try{await Go({id:g});const v=Je();await Ye(v),await mt(),gt(e)}catch(v){console.error("Failed to delete BBCH:",v)}}}));const s=e.querySelector('[data-form="add-eppo"]');s&&s.addEventListener("submit",async l=>{l.preventDefault();const d=e.querySelector('[data-input="eppo-code"]'),f=e.querySelector('[data-input="eppo-name"]'),u=e.querySelector('[data-input="eppo-favorite"]'),g=d?.value.trim(),v=f?.value.trim();if(!g||!v){alert("Bitte Code und Name eingeben");return}try{await ur({code:g,name:v,isFavorite:u?.checked||!1});const w=Je();await Ye(w),await mt(),gt(e),d&&(d.value=""),f&&(f.value=""),u&&(u.checked=!1)}catch(w){console.error("Failed to save EPPO:",w),alert("Speichern fehlgeschlagen")}});const o=e.querySelector('[data-form="add-bbch"]');o&&o.addEventListener("submit",async l=>{l.preventDefault();const d=e.querySelector('[data-input="bbch-code"]'),f=e.querySelector('[data-input="bbch-label"]'),u=e.querySelector('[data-input="bbch-favorite"]'),g=d?.value.trim(),v=f?.value.trim();if(!g||!v){alert("Bitte Code und Bezeichnung eingeben");return}try{await pr({code:g,label:v,isFavorite:u?.checked||!1});const w=Je();await Ye(w),await mt(),gt(e),d&&(d.value=""),f&&(f.value=""),u&&(u.checked=!1)}catch(w){console.error("Failed to save BBCH:",w),alert("Speichern fehlgeschlagen")}})}function pd(e,t,a={}){if(!e||Hr)return;Nn=e,Hr=!0,Nn.innerHTML=`
    <div class="section-inner codes-manager">
      <h4 class="mb-3"><i class="bi bi-tags me-2"></i>EPPO & BBCH Codes</h4>
      ${dd()}
    </div>`;const n=Nn.querySelector(".codes-manager");if(!n)return;ud(n);const r=async()=>{await mt(),gt(n)};t?.events?.subscribe?.("database:connected",()=>{r()}),t?.state?.getState?.().app?.hasDatabase&&r()}function fd(){Hr=!1,Nn=null}let ls=!1,vt=null,Ha=null,Fn=null,Oa=null,_t=null,Un=null,yt=null,Ya=null,Vn=null,kt=null,Kr=null,bt=null,Pe=new Set,Ct=null,vr=!1,yr=!1,fa=!1;const tt=e=>We(e.mediums),Tn=25,kr=new Intl.NumberFormat("de-DE");let Ce=0,oa=null,Rr=null,Wr=null,di=null;function md(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
    <h2 class="text-center mb-4">
      <i class="bi bi-gear me-2"></i>Einstellungen
    </h2>
    
    <!-- Settings Tab Navigation -->
    <div class="settings-tabs mb-4">
      <ul class="nav nav-pills nav-fill" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" data-settings-tab="mittel" type="button">
            <i class="bi bi-droplet me-1"></i>
            <span class="d-none d-md-inline">Mittel & Profile</span>
            <span class="d-md-none">Mittel</span>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" data-settings-tab="codes" type="button">
            <i class="bi bi-tags me-1"></i>
            <span class="d-none d-md-inline">EPPO & BBCH Codes</span>
            <span class="d-md-none">Codes</span>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" data-settings-tab="gps" type="button">
            <i class="bi bi-geo-alt me-1"></i>
            <span class="d-none d-md-inline">GPS-Standorte</span>
            <span class="d-md-none">GPS</span>
          </button>
        </li>
      </ul>
    </div>

    <!-- Tab Contents -->
    <div class="settings-tab-content">
      <!-- Mittel & Profile Tab -->
      <div class="settings-pane" data-pane="mittel" style="display: block;">
        <div class="card card-dark">
          <div class="card-header bg-success bg-opacity-25">
            <h5 class="mb-0"><i class="bi bi-droplet me-2"></i>Mittel-Verwaltung</h5>
          </div>
          <div class="card-body">
            <!-- Mittel-Tabelle -->
            <div class="table-responsive mb-4">
              <table class="table table-dark table-hover mb-0" id="settings-mediums-table">
                <thead>
                  <tr>
                    <th class="text-center" style="width:40px">
                      <input type="checkbox" class="form-check-input" data-role="profile-select-all" title="Alle auswählen" />
                    </th>
                    <th>Name</th>
                    <th>Einheit</th>
                    <th>Methode</th>
                    <th>Wert</th>
                    <th>Zulassung</th>
                    <th>Wartezeit</th>
                    <th>Wirkstoff</th>
                    <th style="width:80px"></th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
            <div class="d-flex justify-content-end mb-4" data-role="mediums-pager"></div>

            <hr class="border-secondary my-4" />

            <!-- Neues Mittel hinzufügen -->
            <h5 class="text-success mb-3">+ Neues Mittel</h5>
            <form id="settings-medium-form" class="row g-2 align-items-end mb-4">
              <div class="col-6 col-md-2">
                <label class="form-label small">Name *</label>
                <input class="form-control form-control-sm" name="medium-name" placeholder="Name" required />
              </div>
              <div class="col-6 col-md-1">
                <label class="form-label small">Einheit *</label>
                <select class="form-select form-select-sm" name="medium-unit" required>
                  <option value="L">L (Liter/ha)</option>
                  <option value="ml">ml (ml/ha)</option>
                  <option value="kg">kg (kg/ha)</option>
                  <option value="g">g (g/ha)</option>
                </select>
              </div>
              <div class="col-6 col-md-2">
                <label class="form-label small">Methode *</label>
                <input class="form-control form-control-sm" name="medium-method" placeholder="perHektar" list="settings-method-options" required />
                <datalist id="settings-method-options"></datalist>
              </div>
              <div class="col-6 col-md-1">
                <label class="form-label small">Wert *</label>
                <input type="number" step="any" class="form-control form-control-sm" name="medium-value" placeholder="" required />
              </div>
              <div class="col-6 col-md-2">
                <label class="form-label small">Zulassung</label>
                <input class="form-control form-control-sm" name="medium-approval" placeholder="" />
              </div>
              <div class="col-3 col-md-1">
                <label class="form-label small">Wartetage</label>
                <input type="number" min="0" class="form-control form-control-sm" name="medium-wartezeit" placeholder="" />
              </div>
              <div class="col-6 col-md-2">
                <label class="form-label small">Wirkstoff</label>
                <input class="form-control form-control-sm" name="medium-wirkstoff" placeholder="" />
              </div>
              <div class="col-3 col-md-1">
                <button class="btn btn-success btn-sm w-100" type="submit">+</button>
              </div>
            </form>

            <hr class="border-secondary my-4" />

            <!-- Profile -->
            <div class="row g-4">
              <div class="col-lg-5">
                <h5 class="text-info mb-3">Profil erstellen</h5>
                <form id="settings-profile-form">
                  <input type="hidden" name="profile-id" />
                  <div class="input-group mb-2">
                    <input id="profile-name" class="form-control" name="profile-name" placeholder="Profilname" required />
                    <button class="btn btn-success" type="submit" data-role="profile-submit">Speichern</button>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted" data-role="profile-selection-summary">Keine Mittel ausgewählt</small>
                    <button class="btn btn-outline-secondary btn-sm" type="button" data-action="profile-reset">Zurücksetzen</button>
                  </div>
                </form>
              </div>
              <div class="col-lg-7">
                <h5 class="mb-3">Gespeicherte Profile</h5>
                <div class="table-responsive">
                  <table class="table table-dark table-hover table-sm mb-0" id="settings-profile-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Mittel</th>
                        <th style="width:120px"></th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- GPS Tab -->
      <div class="settings-pane" data-pane="gps" style="display: none;">
        <div data-feature="gps-embedded"></div>
      </div>

      <!-- EPPO & BBCH Codes Tab (eigene Kulturen/Stadien als Schnellauswahl) -->
      <div class="settings-pane" data-pane="codes" style="display: none;">
        <div data-feature="codes-embedded"></div>
      </div>
    </div>
  `,e}function gd(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`profile-${Date.now()}-${Math.random().toString(16).slice(2,10)}`}function io(e){if(!Pe.size)return;const t=new Set(tt(e).map(n=>n.id));let a=!1;Pe.forEach(n=>{t.has(n)||(Pe.delete(n),a=!0)}),a&&(Pe=new Set(Pe))}function Zn(){vt&&vt.querySelectorAll('[data-role="profile-select"]').forEach(e=>{const t=e.dataset.mediumId;e.checked=!!(t&&Pe.has(t))})}function It(e){const t=tt(e).length,a=Pe.size;let n="Noch keine Mittel ausgewählt.";t?a===t&&t>0?n=`${a} Mittel ausgewählt (alle).`:a>0&&(n=`${a} Mittel ausgewählt.`):n="Keine Mittel vorhanden.",Kr&&(Kr.textContent=n),bt&&(bt.disabled=t===0,bt.indeterminate=a>0&&a<t,bt.checked=t>0&&a===t)}function qn(e){Ct=null,Un&&Un.reset(),Ya&&(Ya.value=""),yt&&(yt.value=""),kt&&(kt.textContent="Profil speichern"),Pe=new Set,Zn(),It(e)}function bd(e,t){Ct=e.id,Ya&&(Ya.value=e.id),yt&&(yt.value=e.name,yt.focus()),kt&&(kt.textContent="Profil aktualisieren"),Pe=new Set(e.mediumIds),Zn(),It(t)}function cs(e,t){if(kt){if(kt.disabled=e,e){kt.textContent=t||"Speichert...";return}kt.textContent=Ct?"Profil aktualisieren":"Profil speichern"}}function Qn(e,t){if(Ha){if(Ha.disabled=e,e){Ha.textContent=t||"Speichert...";return}Ha.textContent="Hinzufügen"}}async function hd(e,t,a){if(fa)return;const n=t.state.getState(),s=(tt(n)[e]??null)?.id||null;fa=!0,Qn(!0);const o=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediums",d=>{const f=Xa(d),u=f.items.slice();return u.splice(e,1),{...f,items:u,totalCount:Math.min(f.totalCount,u.length),lastUpdatedAt:new Date().toISOString()}}),await Jn({silent:!0})&&s&&t.events?.emit?.("mediums:data-changed",{action:"deleted",id:s})}finally{fa=!1,Qn(!1),a&&a.isConnected&&(a.disabled=!1,a.textContent=o??"Löschen")}}async function vd(e,t,a){const n=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediumProfiles",(r=[])=>r.filter(s=>s.id!==e.id)),Ct===e.id&&qn(t.state.getState()),await Jn({successMessage:"Profil gelöscht."})}finally{a&&(a.disabled=!1,a.textContent=n||"Löschen")}}function yd(e){if(!Vn)return;const t=Vn,a=e.mediumProfiles||[];if(!a.length){t.innerHTML=`
      <tr>
        <td colspan="3" class="text-center text-muted">Noch keine Profile erstellt.</td>
      </tr>
    `;return}const n=new Map(tt(e).map(r=>[r.id,r]));t.innerHTML="",a.forEach(r=>{const s=document.createElement("tr"),o=r.mediumIds.map(d=>n.get(d)).filter(Boolean).map(d=>b(d.name)),l=o.length?o.join(", "):'<span class="text-muted">Keine gültigen Mittel</span>';s.innerHTML=`
      <td>${b(r.name)}</td>
      <td>${l}</td>
      <td>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-sm btn-outline-info" data-action="profile-edit" data-id="${b(r.id)}">Bearbeiten</button>
          <button class="btn btn-sm btn-outline-danger" data-action="profile-delete" data-id="${b(r.id)}">Löschen</button>
        </div>
      </td>
    `,t.appendChild(s)})}function kd(e,t){if(vr||!e.mediumProfiles?.length)return;const a=new Set(tt(e).map(s=>s.id));let n=!1;const r=e.mediumProfiles.map(s=>{const o=s.mediumIds.filter(l=>a.has(l));return o.length!==s.mediumIds.length?(n=!0,{...s,mediumIds:o,updatedAt:new Date().toISOString()}):s}).filter(s=>s.mediumIds.length?!0:(n=!0,!1));n&&(vr=!0,t.state.updateSlice("mediumProfiles",()=>r),vr=!1)}function so(e){if(!e)return Ce=0,{start:0,end:0,total:0};const t=Math.max(Math.ceil(e/Tn),1);Ce>=t&&(Ce=t-1),Ce<0&&(Ce=0);const a=Ce*Tn,n=Math.min(a+Tn,e);return{start:a,end:n,total:e}}function wd(){if(!Wr)return null;const e=Wr.querySelector('[data-role="mediums-pager"]');return e?((!oa||Rr!==e)&&(oa?.destroy(),oa=tn(e,{onPrev:()=>xd(),onNext:()=>Sd(),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Mittel...",empty:"Keine Mittel verfügbar"}}),Rr=e),oa):null}function ds(e){const t=wd();if(!t)return;const a=tt(e).length;if(!a){Ce=0,t.update({status:"disabled",info:"Noch keine Mittel gespeichert."});return}const{start:n,end:r}=so(a),s=`Mittel ${kr.format(n+1)}–${kr.format(r)} von ${kr.format(a)}`;t.update({status:"ready",info:s,canPrev:Ce>0,canNext:r<a})}function xd(){if(Ce===0)return;const e=di?.state.getState();e&&(Ce=Math.max(Ce-1,0),ui(e))}function Sd(){const e=di?.state.getState();if(!e)return;const t=tt(e).length;if(!t)return;const a=Math.max(Math.ceil(t/Tn)-1,0);Ce>=a||(Ce=Math.min(Ce+1,a),ui(e))}function ui(e){if(!vt)return;io(e);const t=new Map(e.measurementMethods.map(o=>[o.id,o])),a=tt(e).length;if(!a){vt.innerHTML=`
      <tr>
        <td colspan="9" class="text-center text-muted">Noch keine Mittel gespeichert.</td>
      </tr>
    `,It(e),ds(e);return}const{start:n,end:r}=so(a),s=tt(e).slice(n,r);vt.innerHTML="",s.forEach((o,l)=>{const d=n+l,f=document.createElement("tr"),u=t.get(o.methodId),g=o.approval||o.zulassungsnummer,v=typeof g=="string"&&g.trim().length?b(g):"-",w=typeof o.wartezeit=="string"&&o.wartezeit.trim().length?b(o.wartezeit):typeof o.wartezeit=="number"?`${o.wartezeit} Tage`:"-",h=typeof o.wirkstoff=="string"&&o.wirkstoff.trim().length?b(o.wirkstoff):"-";f.innerHTML=`
      <td class="text-center">
        <input type="checkbox" class="form-check-input" data-role="profile-select" data-medium-id="${b(o.id)}" ${Pe.has(o.id)?"checked":""} />
      </td>
      <td>${b(o.name)}</td>
      <td>${b(o.unit)}</td>
      <td>${b(u?u.label:o.method||o.methodId||"-")}</td>
      <td>${b(o.value!=null?String(o.value):"")}</td>
      <td>${v}</td>
      <td>${w}</td>
      <td>${h}</td>
      <td>
        <button class="btn btn-sm btn-danger" data-action="delete" data-index="${d}">Löschen</button>
      </td>
    `,vt?.appendChild(f)}),It(e),ds(e)}function us(e){if(!Oa)return;const t=new Set;Oa.innerHTML="",e.measurementMethods.forEach(a=>{const n=(a.label??"").toLowerCase(),r=(a.id??"").toLowerCase();if(n&&!t.has(n)){t.add(n);const s=document.createElement("option");s.value=a.label,Oa.appendChild(s)}if(r&&!t.has(r)){t.add(r);const s=document.createElement("option");s.value=a.id,Oa.appendChild(s)}})}function Ed(e){const t=e.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t||`method-${Date.now()}-${Math.random().toString(16).slice(2,6)}`}function Ld(e,t){if(!Fn)return null;const a=Fn.value.trim();if(!a)return window.alert("Bitte eine Methode angeben."),Fn.focus(),null;const n=e.measurementMethods.find(l=>l.label?.toLowerCase()===a.toLowerCase()||l.id?.toLowerCase()===a.toLowerCase());if(n)return n.id;const r=Ed(a),s=e.fieldLabels?.calculation?.fields?.quantity?.unit||"Kiste",o={id:r,label:a,type:"factor",unit:s,requires:["areaHa"],config:{sourceField:"areaHa"}};return t.state.updateSlice("measurementMethods",l=>[...l,o]),r}async function Jn(e){try{const t=Je();return await Ye(t),e?.silent||window.alert(e?.successMessage??"Änderungen wurden gespeichert."),!0}catch(t){console.error("Fehler beim Speichern",t);const a=t instanceof Error?t.message:"Speichern fehlgeschlagen";return window.alert(a),!1}}function $d(e,t){const a=!!t.app?.hasDatabase,n=t.app?.activeSection==="settings";e.classList.toggle("d-none",!(a&&n))}function Dd(e,t){if(!e||ls)return;const a=e;a.innerHTML="";const n=md();a.appendChild(n),Wr=n,di=t,Ce=0,oa?.destroy(),oa=null,Rr=null,vt=n.querySelector("#settings-mediums-table tbody"),Fn=n.querySelector('input[name="medium-method"]'),Oa=n.querySelector("#settings-method-options"),_t=n.querySelector("#settings-medium-form"),Ha=_t?_t.querySelector('button[type="submit"]'):null,Un=n.querySelector("#settings-profile-form"),yt=n.querySelector("#profile-name"),Ya=n.querySelector('input[name="profile-id"]'),Vn=n.querySelector("#settings-profile-table tbody"),kt=n.querySelector('[data-role="profile-submit"]'),Kr=n.querySelector('[data-role="profile-selection-summary"]'),bt=n.querySelector('[data-role="profile-select-all"]');let r=!1,s=!1;function o(u){if(n.querySelectorAll("[data-settings-tab]").forEach(g=>{const v=g.dataset.settingsTab===u;g.classList.toggle("active",v)}),n.querySelectorAll("[data-pane]").forEach(g=>{const v=g.dataset.pane===u;g.style.display=v?"block":"none"}),u==="gps"&&!r){const g=n.querySelector('[data-feature="gps-embedded"]');g&&(cd(g,t),r=!0)}if(u==="codes"&&!s){const g=n.querySelector('[data-feature="codes-embedded"]');g&&(fd(),pd(g,{state:t.state,events:{subscribe:t.events?.subscribe}},{}),s=!0)}}n.querySelectorAll("[data-settings-tab]").forEach(u=>{u.addEventListener("click",()=>{const g=u.dataset.settingsTab;g&&o(g)})});async function l(){if(!_t||fa)return;const u=t.state.getState(),g=new FormData(_t),v=(g.get("medium-name")||"").toString().trim(),w=(g.get("medium-unit")||"").toString().trim(),h=g.get("medium-value"),S=Number(h),x=(g.get("medium-approval")||"").toString().trim(),E=g.get("medium-wartezeit"),I=E?Number(E):null,V=(g.get("medium-wirkstoff")||"").toString().trim()||null;if(!v||!w||Number.isNaN(S)){window.alert("Bitte alle Felder korrekt ausfüllen.");return}const R=Ld(u,t);if(!R)return;const ke=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`medium-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,F={id:ke,name:v,unit:w,methodId:R,value:S,zulassungsnummer:x||null,wartezeit:I!=null&&!Number.isNaN(I)?I:null,wirkstoff:V};fa=!0,Qn(!0,"Speichere...");try{t.state.updateSlice("mediums",T=>{const $=Xa(T),P=[...$.items,F];return{...$,items:P,totalCount:P.length,lastUpdatedAt:new Date().toISOString()}}),us(t.state.getState()),await Jn({successMessage:"Mittel gespeichert.",silent:!0})&&(_t.reset(),t.events?.emit?.("mediums:data-changed",{action:"created",id:ke}))}finally{fa=!1,Qn(!1)}}_t?.addEventListener("submit",u=>{u.preventDefault(),l()}),vt?.addEventListener("click",u=>{const g=u.target?.closest('[data-action="delete"]');if(!g)return;const v=Number(g.dataset.index);Number.isNaN(v)||hd(v,t,g)}),vt?.addEventListener("change",u=>{const g=u.target;if(!g||g.dataset.role!=="profile-select")return;const v=g.dataset.mediumId;if(!v)return;g.checked?Pe.add(v):Pe.delete(v);const w=t.state.getState();It(w)}),bt?.addEventListener("change",()=>{const u=t.state.getState();bt&&(bt.indeterminate=!1,bt.checked?Pe=new Set(tt(u).map(g=>g.id)):Pe=new Set,Zn(),It(u))});const d=async()=>{if(!yt)return;const u=yt.value.trim();if(!u){window.alert("Bitte einen Profilnamen eingeben."),yt.focus();return}if(!Pe.size){window.alert("Bitte mindestens ein Mittel auswählen.");return}const g=t.state.getState();if(g.mediumProfiles?.some(x=>x.name.toLowerCase()===u.toLowerCase()&&x.id!==Ct)){window.alert("Ein Profil mit diesem Namen existiert bereits.");return}const w=tt(g).filter(x=>Pe.has(x.id)).map(x=>x.id);if(!w.length){window.alert("Ausgewählte Mittel sind nicht mehr verfügbar. Bitte Auswahl prüfen."),io(g),Zn(),It(g);return}if(yr)return;const h=!!Ct;yr=!0,cs(!0,h?"Aktualisiere...":"Speichere...");const S=new Date().toISOString();try{if(Ct)t.state.updateSlice("mediumProfiles",(E=[])=>E.map(I=>I.id===Ct?{...I,name:u,mediumIds:w,updatedAt:S}:I));else{const E={id:gd(),name:u,mediumIds:w,createdAt:S,updatedAt:S};t.state.updateSlice("mediumProfiles",(I=[])=>[...I,E])}await Jn({successMessage:h?"Profil aktualisiert und gespeichert.":"Profil gespeichert."})&&qn(t.state.getState())}finally{yr=!1,cs(!1)}};Un?.addEventListener("submit",u=>{u.preventDefault(),d()}),Vn?.addEventListener("click",u=>{const g=u.target?.closest('[data-action^="profile-"]');if(!g)return;const v=g.dataset.id;if(!v)return;const w=t.state.getState();if(g.dataset.action==="profile-edit"){const h=w.mediumProfiles?.find(S=>S.id===v);h&&bd(h,w);return}if(g.dataset.action==="profile-delete"){const h=w.mediumProfiles?.find(S=>S.id===v);if(!h||!window.confirm(`Profil "${h.name}" wirklich löschen?`))return;vd(h,t,g)}}),n.querySelector('[data-action="profile-reset"]')?.addEventListener("click",()=>{qn(t.state.getState())}),qn(t.state.getState());const f=u=>{kd(u,t),$d(n,u),u.app.activeSection==="settings"&&(ui(u),us(u),yd(u),It(u))};t.state.subscribe(f),f(t.state.getState()),ls=!0}const Ba=e=>b(e),wr=(e,t=1)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function ma(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function zd(e){if(!e)return"";const t=new Date(e);if(Number.isNaN(t.getTime()))return b(e);const a=Math.round((t.getTime()-Date.now())/864e5);return a<0?`<span style="color:#ef4444;">${ma(e)} · abgelaufen</span>`:a<180?`<span style="color:#f59e0b;">${ma(e)} · ${a} T</span>`:`<span class="calc-hint">${ma(e)}</span>`}function Ad(){return`
    <section class="calc-section">
      <fieldset class="calc-fieldset mb-4">
        <legend class="calc-legend"><i class="bi bi-box-seam me-2"></i>Bestandsübersicht</legend>
        <div class="calc-hint mb-2" data-role="lager-empty">
          Verbrauch wird automatisch aus den dokumentierten Anwendungen berechnet · Bestand = Zugänge − Verbrauch.
        </div>
        <div class="table-responsive">
          <table class="table table-sm align-middle" style="font-size:0.92rem;">
            <thead><tr class="calc-hint">
              <th>Mittel</th><th>Wirkstoff</th><th class="text-end">Verbraucht</th>
              <th class="text-end">Bestand</th><th>Zulassung bis</th><th>nächster Ablauf</th>
            </tr></thead>
            <tbody data-role="lager-uebersicht"></tbody>
          </table>
        </div>
      </fieldset>

      <fieldset class="calc-fieldset mb-4">
        <legend class="calc-legend"><i class="bi bi-plus-circle me-2"></i>Zugang / Bewegung erfassen</legend>
        <form data-role="lager-form">
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label calc-label">Mittel <span class="calc-required">*</span></label>
              <input class="form-control calc-input" name="mittel" list="lager-mittel-options" autocomplete="off" required />
              <datalist id="lager-mittel-options"></datalist>
            </div>
            <div class="col-md-2">
              <label class="form-label calc-label">Zulassungsnr.</label>
              <input class="form-control calc-input" name="kennr" />
            </div>
            <div class="col-md-2">
              <label class="form-label calc-label">Typ</label>
              <select class="form-select calc-input" name="typ">
                <option value="zugang">Zugang (Einkauf)</option>
                <option value="korrektur">Korrektur (±)</option>
                <option value="inventur">Inventur</option>
              </select>
            </div>
            <div class="col-md-2">
              <label class="form-label calc-label">Menge <span class="calc-required">*</span></label>
              <input class="form-control calc-input" name="menge" type="number" step="any" required />
            </div>
            <div class="col-md-2">
              <label class="form-label calc-label">Einheit</label>
              <input class="form-control calc-input" name="einheit" placeholder="L / kg / ml / g" />
            </div>
            <div class="col-md-2">
              <label class="form-label calc-label">Datum</label>
              <input class="form-control calc-input" name="datum" type="date" value="${new Date().toISOString().slice(0,10)}" />
            </div>
            <div class="col-md-2">
              <label class="form-label calc-label">Charge</label>
              <input class="form-control calc-input" name="charge" />
            </div>
            <div class="col-md-2">
              <label class="form-label calc-label">Ablaufdatum</label>
              <input class="form-control calc-input" name="ablauf" type="date" />
            </div>
            <div class="col-md-3">
              <label class="form-label calc-label">Lieferant</label>
              <input class="form-control calc-input" name="lieferant" />
            </div>
            <div class="col-md-2">
              <label class="form-label calc-label">Preis (€)</label>
              <input class="form-control calc-input" name="preis" type="number" step="any" />
            </div>
          </div>
          <div class="mt-3">
            <button type="submit" class="btn btn-psm-primary">Bewegung speichern</button>
          </div>
        </form>
      </fieldset>

      <fieldset class="calc-fieldset mb-4">
        <legend class="calc-legend"><i class="bi bi-clock-history me-2"></i>Letzte Bewegungen</legend>
        <div data-role="lager-bewegungen"></div>
      </fieldset>
    </section>`}function Pd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Ad();const a=e.querySelector('[data-role="lager-uebersicht"]'),n=e.querySelector('[data-role="lager-bewegungen"]'),r=e.querySelector('[data-role="lager-form"]'),s=e.querySelector("#lager-mittel-options"),o=e.querySelector('[data-role="lager-empty"]'),l=new Map,d=w=>{if(a){if(!w.length){a.innerHTML='<tr><td colspan="6" class="calc-hint" style="padding:14px;">Noch keine Mittel. Erfasse unten einen Zugang oder dokumentiere Anwendungen in „Neu erfassen".</td></tr>';return}a.innerHTML=w.map(h=>{const S=h.bestand<0?"#ef4444":h.bestand===0?"#f59e0b":"inherit",x=b(h.einheit||"");return`<tr>
          <td><span class="fw-semibold">${b(h.name)}</span>${h.kennr?`<span class="d-block calc-hint">${b(h.kennr)}</span>`:""}</td>
          <td class="calc-hint">${b(h.wirkstoff||"")}</td>
          <td class="text-end">${wr(h.verbraucht)} ${x}<span class="d-block calc-hint">${h.anwendungen} Anw.</span></td>
          <td class="text-end fw-semibold" style="color:${S};">${wr(h.bestand)} ${x}</td>
          <td>${zd(h.zulEnde)}</td>
          <td class="calc-hint">${h.naechsterAblauf?ma(h.naechsterAblauf):""}</td>
        </tr>`}).join("")}},f=w=>{if(n){if(!w.length){n.innerHTML='<div class="calc-hint">Keine Bewegungen erfasst.</div>';return}n.innerHTML=w.map(h=>`
        <div class="d-flex align-items-center gap-2 py-1" style="border-bottom:1px solid var(--border-1);">
          <span class="badge" style="background:${h.typ==="zugang"?"#16a34a":"#64748b"};">${b(h.typ)}</span>
          <span class="flex-grow-1">${b(h.mittelName)} · <b>${wr(h.menge)} ${b(h.einheit||"")}</b>${h.charge?` · Charge ${b(h.charge)}`:""}<span class="d-block calc-hint">${ma(h.datum)}${h.lieferant?" · "+b(h.lieferant):""}${h.ablauf?" · Ablauf "+ma(h.ablauf):""}</span></span>
          <button class="btn btn-sm" style="color:#ef4444;border:1px solid var(--border-1);background:transparent;" data-del="${Ba(h.id)}" title="Löschen">×</button>
        </div>`).join(""),n.querySelectorAll("[data-del]").forEach(h=>{h.addEventListener("click",async()=>{const S=h.getAttribute("data-del")||"";try{await Xo({id:S}),await et().catch(()=>{}),await g()}catch{B.warning("Löschen fehlgeschlagen.")}})})}},u=()=>{s&&(s.innerHTML=Array.from(l.entries()).sort((w,h)=>w[0].localeCompare(h[0],"de")).map(([w,h])=>`<option value="${Ba(w)}" data-kennr="${Ba(h.kennr||"")}" data-einheit="${Ba(h.einheit||"")}" data-wirkstoff="${Ba(h.wirkstoff||"")}"></option>`).join(""))},g=async()=>{if(ce()!=="sqlite"){o&&(o.textContent="Bitte zuerst eine Datenbank öffnen.");return}try{const[w,h,S]=await Promise.all([Ps(),Yo(),Ms()]);d(w?.rows||[]),f(h?.rows||[]),l.clear(),(S?.rows||[]).forEach(x=>{x.name&&l.set(x.name,{kennr:x.kennr??null,einheit:x.einheit??null,wirkstoff:x.wirkstoff??null})}),(w?.rows||[]).forEach(x=>{x.name&&!l.has(x.name)&&l.set(x.name,{kennr:x.kennr??null,einheit:x.einheit??null,wirkstoff:x.wirkstoff??null})}),u()}catch(w){console.warn("[Lager] Laden fehlgeschlagen:",w)}};r?.addEventListener("submit",async w=>{if(w.preventDefault(),ce()!=="sqlite"){B.warning("Bitte zuerst eine Datenbank öffnen.");return}const h=new FormData(r),S=String(h.get("mittel")||"").trim(),x=Number(String(h.get("menge")||"").replace(",","."));if(!S||!Number.isFinite(x)){B.warning("Mittel und Menge angeben.");return}const E=String(h.get("preis")||"").trim();try{await Jo({mittelName:S,kennr:String(h.get("kennr")||"").trim()||null,wirkstoff:l.get(S)?.wirkstoff||null,typ:String(h.get("typ")||"zugang"),menge:x,einheit:String(h.get("einheit")||"").trim()||null,datum:String(h.get("datum")||"").trim()||null,charge:String(h.get("charge")||"").trim()||null,ablauf:String(h.get("ablauf")||"").trim()||null,lieferant:String(h.get("lieferant")||"").trim()||null,preis:E?Number(E.replace(",",".")):null}),await et().catch(()=>{}),r.reset(),B.success("Bewegung gespeichert."),await g()}catch{B.warning("Speichern fehlgeschlagen.")}});const v=e.querySelector('[name="mittel"]');v?.addEventListener("change",()=>{const w=l.get(v.value);if(!w)return;const h=e.querySelector('[name="einheit"]'),S=e.querySelector('[name="kennr"]');h&&w.einheit&&(h.value=w.einheit),S&&w.kennr&&(S.value=w.kennr)}),t.state.subscribe(w=>{w?.app?.activeSection==="lager"&&g()}),g()}const Yn={mechanisch:{label:"Mechanisch",icon:"bi-tools",color:"#2563eb"},chemisch_psm:{label:"Pflanzenschutz",icon:"bi-droplet-half",color:"#dc2626"},duengung:{label:"Düngung",icon:"bi-flower1",color:"#b45309"},nuetzlinge:{label:"Nützlinge",icon:"bi-bug",color:"#7c3aed"},bewaesserung:{label:"Bewässerung",icon:"bi-moisture",color:"#0891b2"},monitoring:{label:"Monitoring",icon:"bi-eye",color:"#475569"},sonstiges:{label:"Sonstiges",icon:"bi-three-dots",color:"#64748b"}},Md=["mechanisch","chemisch_psm","duengung","nuetzlinge","bewaesserung","monitoring","sonstiges"];function oo(e){return Yn[e]||Yn.sonstiges}const Cd={geplant:{label:"geplant",color:"#64748b"},aktiv:{label:"aktiv",color:"#16a34a"},abgeschlossen:{label:"abgeschlossen",color:"#94a3b8"}},Wt=["#16a34a","#0891b2","#7c3aed","#d97706","#dc2626","#0d9488","#65a30d","#db2777"],Id=/^#[0-9a-fA-F]{3,8}$/;function lo(e){return typeof e=="string"&&Id.test(e.trim())?e.trim():null}function ga(e,t=0){return lo(e&&e.color)||Wt[t%Wt.length]}function it(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function xe(e){if(!e)return NaN;const t=String(e).slice(0,10).replace(/-/g,""),a=Number(t);return Number.isFinite(a)?a:NaN}function la(e){const t=[...e||[]].sort((s,o)=>(xe(s.pflanzDatum)||0)-(xe(o.pflanzDatum)||0)),a=Number(it().replace(/-/g,""));let n=t.find(s=>s.status==="aktiv")||null;if(!n){const s=t.filter(o=>o.status!=="abgeschlossen"&&xe(o.pflanzDatum)<=a&&(!o.ernteDatum||xe(o.ernteDatum)>=a));n=s.length?s[s.length-1]:null}let r=t.filter(s=>s!==n&&s.status!=="abgeschlossen"&&xe(s.pflanzDatum)>a).sort((s,o)=>(xe(s.pflanzDatum)||0)-(xe(o.pflanzDatum)||0))[0]||null;return r||(r=t.filter(s=>s!==n&&s.status==="geplant").sort((s,o)=>(xe(s.pflanzDatum)||0)-(xe(o.pflanzDatum)||0))[0]||null),{current:n,next:r,all:t}}const co=["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];function uo(e,t){const a=[];let n=e.getFullYear(),r=e.getMonth();const s=t.getFullYear(),o=t.getMonth();let l=0;for(;(n<s||n===s&&r<=o)&&l<60;)a.push({y:n,m:r}),r++,r>11&&(r=0,n++),l++;return a}function Ke(e,t){if(!t||!e.length)return null;const a=new Date(String(t).slice(0,10)+"T00:00:00");if(isNaN(a.getTime()))return null;const n=e.length,r=a.getFullYear()*12+a.getMonth(),s=e[0].y*12+e[0].m,o=e[n-1].y*12+e[n-1].m;if(r<s)return 0;if(r>o)return 1;const l=r-s,d=new Date(a.getFullYear(),a.getMonth()+1,0).getDate();return(l+(a.getDate()-1)/d)/n}const Bd={anzucht:{label:"Anzucht (vorziehen)",short:"Anzucht"},direkt:{label:"Direktsaat",short:"Direkt"}},Nd=["Pflanzen","m²","Beete","lfd. m","g Saatgut"];function ht(e,t){if(!e)return null;const a=new Date(String(e).slice(0,10)+"T00:00:00");return isNaN(a.getTime())?null:(a.setDate(a.getDate()+Math.round(Number(t)||0)),a.getFullYear()+"-"+String(a.getMonth()+1).padStart(2,"0")+"-"+String(a.getDate()).padStart(2,"0"))}function Fd(e,t,a){if(!e||!a)return{};const r=(e.anbauMethode==="anzucht"?"anzucht":"direkt")==="anzucht"&&Number(e.anzuchtTage)||0,s=Number(e.kulturTage)||0,o=Number(e.ernteTage)||0;let l;t==="aussaat"?l=ht(a,r):t==="ernte"?l=s?ht(a,-s):a:l=a;const d=ht(l,-r),f=s?ht(l,s):null,u=f?ht(f,o):null;return{aussaatDatum:d,pflanzDatum:l,ernteVon:f,ernteBis:u}}function Td(e,t){return e?{aussaatDatum:ht(e.aussaatDatum,t),pflanzDatum:ht(e.pflanzDatum,t),ernteVon:ht(e.ernteVon,t),ernteBis:ht(e.ernteBis,t)}:{}}function Ln(e,t){if(!t||!Array.isArray(e))return null;const a=String(t).trim().toLowerCase();return a&&(e.find(n=>String(n.name||"").trim().toLowerCase()===a)||e.find(n=>{const r=String(n.name||"").trim().toLowerCase();return r&&(r.startsWith(a)||a.startsWith(r))}))||null}let $n=null;async function po(){if($n)return $n;const t=await import("/psm/vendor/psm-geo/psm_geo.js"),a=new URL("/psm/vendor/psm-geo/psm_geo_bg.wasm",globalThis.location?.href);return await t.default(a),$n=t,$n}async function qd(e,t){const n=(await po()).compute_beds(JSON.stringify(e),t.bedW,t.pathW,t.rowSp,t.inRowSp,t.angle);return JSON.parse(n)}async function Hd(){await po()}const At=["#c62828","#d32f2f","#e53935","#ef5350","#bf360c","#e64a19","#f57c00","#ffb300","#1b5e20","#2e7d32","#388e3c","#66bb6a","#0d47a1","#1565c0","#0277bd","#42a5f5","#4a148c","#6a1b9a","#8e24aa","#e91e63","#3e2723","#4e342e","#00695c","#546e7a"],Od=()=>({bedW:1.2,pathW:.4,rowSp:.5,inRowSp:.4,angle:0}),U=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";let ee=null,H=null;const wt=Math.PI/180;function Dn(e,t,a,n){const r=e*wt,s=a*wt,o=(a-e)*wt,l=(n-t)*wt,d=Math.sin(o/2)**2+Math.cos(r)*Math.cos(s)*Math.sin(l/2)**2;return 6371e3*2*Math.atan2(Math.sqrt(d),Math.sqrt(1-d))}function _d(e,t,a,n){const r=e*wt,s=a*wt,o=(n-t)*wt,l=Math.sin(o)*Math.cos(s),d=Math.cos(r)*Math.sin(s)-Math.sin(r)*Math.cos(s)*Math.cos(o);return(Math.atan2(l,d)/wt+360)%360}function Kd(e){const t=e.length;if(t<3)return 0;const a=e.reduce((o,l)=>o+l[0],0)/t,n=e.reduce((o,l)=>o+l[1],0)/t,r=Math.cos(a*wt)*111320;let s=0;for(let o=0;o<t;o++){const l=(o+1)%t;s+=(e[o][1]-n)*r*((e[l][0]-a)*111320)-(e[l][1]-n)*r*((e[o][0]-a)*111320)}return Math.abs(s/2)}let zn=!1,Kt=[];function ps(){if(!H)return 1;const e=H.getCenter().lat;return 156543.03392*Math.cos(e*Math.PI/180)/Math.pow(2,H.getZoom())}function Rd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Wd();const a=[];let n=null;const r=new Map;let s=null,o=null,l={sat:null,osm:null},d=!0,f=!0,u=[],g=[];const v=(i,c)=>u.filter(m=>m.flaecheTyp===i&&String(m.flaecheId)===String(c)),w=(i,c)=>g.filter(m=>m.flaecheTyp===i&&String(m.flaecheId)===String(c));function h(i){const c=la(v("acker",i.id)).current;return c&&c.kultur?{name:c.kultur,color:ga(c)}:i.kultur?{name:i.kultur,color:null}:null}function S(){const i=[];if(a.forEach(k=>{const p=k.latlngs||[];if(p.length<3)return;const A=p.map(he=>[Number(he[1]),Number(he[0])]),C=A[0],Q=A[A.length-1];(C[0]!==Q[0]||C[1]!==Q[1])&&A.push([C[0],C[1]]),i.push({type:"Feature",geometry:{type:"Polygon",coordinates:[A]},properties:{name:k.name||"",kultur:k.kultur||null,eppoCode:k.eppoCode||null,flaeche_m2:Math.round(k.result?.areaM2||0),flaeche_ha:Number(((k.result?.areaM2||0)/1e4).toFixed(4)),beete:k.result?.beds?.length||0,beetmeter_m:Math.round(k.result?.bedMeters||0),pflanzen:k.result?.plants||0,bettbreite_m:k.params?.bedW??null,wegbreite_m:k.params?.pathW??null,reihenabstand_m:k.params?.rowSp??null,pflanzabstand_m:k.params?.inRowSp??null,ausrichtung_grad:k.params?.angle??null}})}),(We(t.state.getState().gps?.points)||[]).forEach(k=>{const p=Number(k.latitude),A=Number(k.longitude);if(!Number.isFinite(p)||!Number.isFinite(A))return;const C=Number(k.nutzflaecheQm);i.push({type:"Feature",geometry:{type:"Point",coordinates:[A,p]},properties:{name:k.name||"Standort",typ:"standort",flaeche_m2:Number.isFinite(C)&&C>0?Math.round(C):null,kind:k.kind||null}})}),!i.length){B.warning("Keine Flächen oder Standorte zum Exportieren.");return}const m={type:"FeatureCollection",name:"PSM Acker-Planer",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:i};try{const k=new Blob([JSON.stringify(m,null,2)],{type:"application/geo+json"}),p=URL.createObjectURL(k),A=document.createElement("a");A.href=p,A.download="acker-flaechen.geojson",document.body.appendChild(A),A.click(),A.remove(),setTimeout(()=>URL.revokeObjectURL(p),1e3),B.success(`${i.length} Objekt(e) als GeoJSON exportiert.`)}catch(k){console.error("[Acker] GeoJSON-Export fehlgeschlagen",k),B.error("Export fehlgeschlagen.")}}function x(){if(!ee||!s)return;s.clearLayers(),(We(t.state.getState().gps?.points)||[]).forEach(c=>{const m=Number(c.latitude),k=Number(c.longitude);if(!Number.isFinite(m)||!Number.isFinite(k))return;const p=Number(c.nutzflaecheQm),A=Number.isFinite(p)&&p>0?`${Math.round(p)} m²`:"",C=c.name||"Standort",Q=ee.marker([m,k],{icon:ee.divIcon({className:"acker-standort",html:'<span class="acker-standort-dot"></span>',iconSize:[16,16],iconAnchor:[8,8]})});Q.bindTooltip(`${b(C)}${A?" · "+A:""}`,{permanent:!0,direction:"top",className:"acker-standort-label",offset:[0,-9]}),Q.on("click",()=>re({typ:"haus",id:c.id,name:C,area:Number.isFinite(p)&&p>0?p:0,latlng:[m,k]})),s.addLayer(Q)})}const E=i=>e.querySelector(i),I=E('[data-role="acker-list"]'),V=E('[data-role="acker-empty"]'),R=E('[data-role="acker-totals"]'),ke=E('[data-role="acker-map"]'),F=i=>({id:i.id,name:i.name,kultur:i.kultur||null,eppoCode:i.eppoCode||null,standortId:i.standortId||null,color:i.color,latlngs:i.latlngs,areaQm:i.result?.areaM2||0,bedW:i.params.bedW,pathW:i.params.pathW,rowSp:i.params.rowSp,inRowSp:i.params.inRowSp,angle:i.params.angle,beds:i.result?.beds?.length||0,bedMeters:i.result?.bedMeters||0,plants:i.result?.plants||0}),J=(i,c=!1)=>{if(ce()!=="sqlite")return;const m=async()=>{try{const k=await tl(F(i));k?.id&&(i.id=k.id),await et().catch(()=>{})}catch(k){console.warn("[Acker] Speichern fehlgeschlagen:",k)}};if(c){m();return}clearTimeout(r.get(i._key)),r.set(i._key,setTimeout(m,600))};async function T(i,c){if(!i||i.length<3)return{areaM2:0,beds:[],bedMeters:0,plants:0};try{return await qd(i,c)}catch(m){return console.error("[Acker] WASM computeBeds fehlgeschlagen:",m),{areaM2:0,beds:[],bedMeters:0,plants:0}}}const $=(i,c,m)=>({color:i.color,weight:c?3.5:2.5,fillColor:i.color,fillOpacity:m?0:c?.3:.18,dashArray:null}),P=(i,c,m)=>({color:"#ffffff",weight:m?1:.7,opacity:.9,fillColor:i.color,fillOpacity:m?.9:.78});function Y(i){if(!f||i.bedsHidden)return!1;const c=ps(),m=(i.params?.bedW||0)/c,k=(i.params?.pathW||0)/c,p=(i.params?.pathW||0)<=.001||k>=1.2;return m>=4&&p}function ie(i){i.outline&&(H.removeLayer(i.outline),i.outline=null),i.bedsLayer&&(H.removeLayer(i.bedsLayer),i.bedsLayer=null),i.label&&o&&(o.removeLayer(i.label),i.label=null),Be(i),Ve(i)}function te(i){const c=!!i.editing;i.outline&&H.removeLayer(i.outline),i.bedsLayer&&(H.removeLayer(i.bedsLayer),i.bedsLayer=null),i.label&&o&&o.removeLayer(i.label),Be(i),Ve(i);const m=i._key===n,k=Y(i);i._lastDetail=k,k&&(i.bedsLayer=ee.layerGroup(),(i.result?.beds||[]).forEach((p,A)=>{const C=ee.geoJSON(p.geo,{style:P(i,A,m),bubblingMouseEvents:!1});C.bindTooltip(`Beet ${A+1} · ${U(p.lenM,1)} m · ${p.rows}×${U(p.perRow)} = ${U(p.plants)} Pfl.`,{sticky:!0}),C.on("click",()=>ut(i._key)),C.on("contextmenu",Q=>le(i,Q,A+1)),C.addTo(i.bedsLayer)}),i.bedsLayer.addTo(H)),i.outline=ee.polygon(i.latlngs,{...$(i,m,k),className:m?"acker-outline-grab":"",bubblingMouseEvents:!1}).addTo(H),i.outline.on("click",()=>{ut(i._key),re({typ:"acker",id:i.id,name:i.name,area:i.result?.areaM2||0,fieldRef:i})}),i.outline.on("dblclick",()=>Jt(i)),i.outline.on("contextmenu",p=>le(i,p)),i.outline.on("mousedown",p=>dn(i,p)),we(i,m),m&&dt(i),(m||c)&&Ht(i)}function we(i,c){if(!d||!o||!i.outline)return;let m;try{m=i.outline.getBounds().getCenter()}catch{return}const k=i.result?.plants||0,p=h(i),A=p?`<em class="cr" style="--cc:${b(p.color||"#16a34a")}"><span class="dot"></span>${b(p.name)}</em>`:"";let C="";if(c&&i.latlngs?.length>=3){const he=i.latlngs.map(dr=>dr[0]),ve=i.latlngs.map(dr=>dr[1]),rt=Math.min(...he),Ze=Math.max(...he),Qe=Math.min(...ve),mi=Math.max(...ve),gi=(rt+Ze)/2,bi=(Qe+mi)/2,yo=Dn(gi,Qe,gi,mi),ko=Dn(rt,bi,Ze,bi);C=`<span class="dims">↔ ${U(yo,0)} m · ↕ ${U(ko,0)} m</span>`}const Q=`<div class="acker-flabel${c?" sel":""}" style="--fc:${i.color}"><b>${b(i.name||"")}</b>${A}<i>${U(k)} Pfl.</i>${C}</div>`;i.label=ee.marker(m,{interactive:!1,keyboard:!1,icon:ee.divIcon({className:"acker-flabel-wrap",html:Q,iconSize:[0,0]})}),o.addLayer(i.label)}function dt(i){Be(i);const c=i.latlngs,m=c.length;i.edgeLabels=c.map((k,p)=>{const A=c[(p+1)%m],C=(k[0]+A[0])/2,Q=(k[1]+A[1])/2,he=Dn(k[0],k[1],A[0],A[1]);return ee.marker([C,Q],{interactive:!1,keyboard:!1,pane:"edgeLabels",icon:ee.divIcon({className:"acker-edge-label-wrap",html:`<div class="acker-edge-label">${U(he,1)} m</div>`,iconSize:[0,0],iconAnchor:[0,0]})}).addTo(H)})}function Be(i){(i.edgeLabels||[]).forEach(c=>H.removeLayer(c)),i.edgeLabels=[]}function He(i){i.latlngs?.length&&(Be(i),dt(i))}function Ht(i){Ve(i),i.handles=i.latlngs.map((c,m)=>{const k=ee.marker(c,{draggable:!0,icon:ee.divIcon({className:"acker-vhandle"})}).addTo(H);return k.on("drag",p=>{i.latlngs[m]=[p.target.getLatLng().lat,p.target.getLatLng().lng],i.outline.setLatLngs(i.latlngs),He(i)}),k.on("dragend",()=>void at(i)),k.on("contextmenu",p=>fe(i,m,p)),k}),i.editing=!0}function Ve(i){(i.handles||[]).forEach(c=>H.removeLayer(c)),i.handles=[],i.editing=!1}function Ot(){a.forEach(i=>te(i))}function or(){a.forEach(i=>{Y(i)!==i._lastDetail&&te(i)})}function rn(i,c){i.color=c;try{i.outline?.setStyle({color:c,fillColor:c})}catch{}if(i.bedsLayer)try{i.bedsLayer.eachLayer(k=>k.setStyle&&k.setStyle({fillColor:c}))}catch{}try{const k=i.label?.getElement?.()?.querySelector?.(".acker-flabel");k&&k.style.setProperty("--fc",c)}catch{}const m=I?.querySelector(".acker-field.sel .acker-swatch");m&&(m.style.background=c)}function Jt(i){if(i.latlngs?.length)try{H.fitBounds(ee.polygon(i.latlngs).getBounds(),{maxZoom:20,padding:[40,40]})}catch{}}function sn(){const i=a.filter(c=>c.latlngs?.length>=3);if(!i.length){B.info("Keine Flächen vorhanden.");return}try{let c=ee.polygon(i[0].latlngs).getBounds();i.slice(1).forEach(m=>{c=c.extend(ee.polygon(m.latlngs).getBounds())}),H.fitBounds(c,{maxZoom:19,padding:[40,40]})}catch{}}async function at(i){i.result=await T(i.latlngs,i.params),te(i),be(),J(i)}function on(i){if(Ue("app",c=>({...c,activeSection:"kultur"})),i?.id)try{window.dispatchEvent(new CustomEvent("psm:openKultur",{detail:{typ:"acker",id:String(i.id)}}))}catch{}else B.info("Fläche wird gespeichert – in der Kulturführung gleich wählbar.")}let Me=null;const Lt=()=>{Me&&(Me.remove(),Me=null,document.removeEventListener("pointerdown",ln,!0),document.removeEventListener("keydown",Ee,!0))},ln=i=>{Me&&!Me.contains(i.target)&&Lt()},Ee=i=>{i.key==="Escape"&&Lt()};function Yt(i,c){c.style.left="",c.style.right="",c.style.top="";const m=i.getBoundingClientRect(),k=c.getBoundingClientRect(),p=k.width||210,A=k.height||260;m.right+3+p>window.innerWidth-8&&(c.style.left="auto",c.style.right="calc(100% + 3px)");let C=-5;m.top+C+A>window.innerHeight-8&&(C=Math.min(-5,window.innerHeight-8-A-m.top)),m.top+C<8&&(C=8-m.top),c.style.top=C+"px"}function ka(i,c){c.forEach(m=>{if(!m)return;if(m.sep){const p=document.createElement("div");p.className="acker-ctx-sep",i.appendChild(p);return}if(m.type==="swatchGrid"){const p=document.createElement("div");p.className="acker-ctx-swatches",m.colors.forEach(Q=>{const he=document.createElement("button");he.type="button",he.className="acker-sw"+(Q===m.current?" on":""),he.style.background=Q,he.title=Q,he.addEventListener("click",ve=>{ve.stopPropagation(),Lt(),m.onPick(Q)}),p.appendChild(he)});const A=document.createElement("label");A.className="acker-sw-custom",A.innerHTML=`<i class="bi bi-eyedropper"></i><input type="color" value="${m.current||"#3b82f6"}">`;const C=A.querySelector("input");C.addEventListener("input",Q=>(m.onLive||m.onPick)(Q.target.value)),C.addEventListener("change",Q=>{m.onPick(Q.target.value),Lt()}),p.appendChild(A),i.appendChild(p);return}const k=document.createElement("button");if(k.type="button",k.className="acker-ctx-item"+(m.danger?" danger":"")+(m.submenu?" has-sub":"")+(m.disabled?" disabled":""),k.innerHTML=`<span class="ic">${m.icon||""}</span><span class="lb">${b(m.label)}</span>`+(m.right?`<span class="rt">${b(m.right)}</span>`:"")+(m.submenu?'<span class="ch"><i class="bi bi-chevron-right"></i></span>':""),m.submenu){const p=document.createElement("div");p.className="acker-ctx-sub",ka(p,m.submenu),k.appendChild(p);let A=null;const C=()=>{A&&(clearTimeout(A),A=null),k.parentElement?.querySelectorAll(".acker-ctx-sub.open").forEach(he=>{he!==p&&he.classList.remove("open")}),Yt(k,p),p.classList.add("open")},Q=()=>{A=setTimeout(()=>{p.classList.remove("open"),A=null},150)};k.addEventListener("pointerenter",C),k.addEventListener("pointerleave",Q),p.addEventListener("pointerenter",()=>{A&&(clearTimeout(A),A=null)}),p.addEventListener("pointerleave",Q)}else m.disabled||k.addEventListener("click",p=>{p.stopPropagation(),m.keepOpen||Lt(),m.action?.()});i.appendChild(k)})}function wa(i,c,m,k){if(Lt(),Me=document.createElement("div"),Me.className="acker-ctx",k){const Q=document.createElement("div");Q.className="acker-ctx-title",Q.textContent=k,Me.appendChild(Q)}ka(Me,m),document.body.appendChild(Me);const p=Me.getBoundingClientRect();let A=i,C=c;A+p.width>window.innerWidth-8&&(A=Math.max(8,window.innerWidth-p.width-8)),C+p.height>window.innerHeight-8&&(C=Math.max(8,window.innerHeight-p.height-8)),Me.style.left=A+"px",Me.style.top=C+"px",setTimeout(()=>{document.addEventListener("pointerdown",ln,!0),document.addEventListener("keydown",Ee,!0)},0)}const Xt=i=>{const c=i.originalEvent||i;return c&&ee.DomEvent.preventDefault?.(c),i.originalEvent&&ee.DomEvent.stop?.(i),{x:c.clientX,y:c.clientY}};function Oe(i,c){i.params.angle=(Math.round(i.params.angle+c)%180+180)%180,at(i),B.info(`Beete-Ausrichtung: ${i.params.angle}°`)}function xa(i){if(i.length<2)return 0;let c=-1,m=0;for(let k=0;k<i.length;k++){const p=i[k],A=i[(k+1)%i.length],C=Dn(p[0],p[1],A[0],A[1]);C>c&&(c=C,m=_d(p[0],p[1],A[0],A[1]))}return(Math.round(m-90)%180+180)%180}function cn(i){i.params.angle=xa(i.latlngs||[]),at(i),B.success(`Beete an Fläche ausgerichtet (${i.params.angle}°).`)}function ea(i,c){i.color=c,te(i),be(),J(i)}function ta(i,c){i.kultur=c||null,i.eppoCode=Kt.find(m=>m.kultur===i.kultur)?.eppoCode||null,te(i),be(),J(i),B.success(c?`Kultur: ${c}`:"Kultur entfernt.")}function y(i){i.bedsHidden=!i.bedsHidden,te(i),B.info(i.bedsHidden?"Beete ausgeblendet.":"Beete eingeblendet.")}function L(i){ut(i._key),setTimeout(()=>{const c=I?.querySelector(".acker-field.sel .acker-name");c&&(c.focus(),c.select())},30)}function _(i){const m=ps()*18/111320,k={_key:"new-"+ ++fn,id:null,name:(i.name||"Fläche")+" (Kopie)",kultur:i.kultur,eppoCode:i.eppoCode,standortId:i.standortId,color:At[(At.indexOf(i.color)+1)%At.length],latlngs:i.latlngs.map(p=>[p[0]+m,p[1]+m]),params:{...i.params},outline:null,bedsLayer:null,label:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(k),n=k._key,at(k),J(k,!0),B.success("Fläche dupliziert.")}function q(i){const c=i.latlngs||[];if(c.length<3){B.warning("Fläche hat keine Geometrie.");return}const m=c.map(p=>[Number(p[1]),Number(p[0])]);(m[0][0]!==m[m.length-1][0]||m[0][1]!==m[m.length-1][1])&&m.push([m[0][0],m[0][1]]);const k={type:"FeatureCollection",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:[{type:"Feature",geometry:{type:"Polygon",coordinates:[m]},properties:{name:i.name||"",kultur:i.kultur||null,eppoCode:i.eppoCode||null,flaeche_m2:Math.round(i.result?.areaM2||0),beete:i.result?.beds?.length||0,beetmeter_m:Math.round(i.result?.bedMeters||0),pflanzen:i.result?.plants||0}}]};try{const p=new Blob([JSON.stringify(k,null,2)],{type:"application/geo+json"}),A=URL.createObjectURL(p),C=document.createElement("a");C.href=A,C.download=`${(i.name||"flaeche").replace(/[^\w\-]+/g,"_")}.geojson`,document.body.appendChild(C),C.click(),C.remove(),setTimeout(()=>URL.revokeObjectURL(A),1e3),B.success("Fläche als GeoJSON exportiert.")}catch{B.error("Export fehlgeschlagen.")}}async function z(i){const c=i.result||{},m=[`Fläche: ${i.name||""}`,i.kultur?`Kultur: ${i.kultur}`:"",`Größe: ${U(c.areaM2||0)} m² (${U((c.areaM2||0)/1e4,3)} ha)`,`Beete: ${U(c.beds?.length||0)}`,`Beetmeter: ${U(c.bedMeters||0)} m`,`Pflanzen: ${U(c.plants||0)}`].filter(Boolean).join(`
`);try{await navigator.clipboard.writeText(m),B.success("Werte kopiert.")}catch{B.warning("Kopieren nicht möglich.")}}const M=i=>({icon:'<i class="bi bi-palette"></i>',label:"Farbe",submenu:[{type:"swatchGrid",colors:At,current:i.color,onPick:c=>ea(i,c),onLive:c=>rn(i,c)}]}),N=i=>({icon:'<i class="bi bi-flower1"></i>',label:"Kultur zuweisen",submenu:[{icon:'<i class="bi bi-x"></i>',label:"– keine –",action:()=>ta(i,null)},...Kt.length?[{sep:!0}]:[],...Kt.map(c=>({icon:c.kultur===i.kultur?'<i class="bi bi-check2"></i>':"",label:`${c.kultur}${c.anbau?" ("+c.anbau+")":""}`,action:()=>ta(i,c.kultur)}))]});function le(i,c,m){ut(i._key);const{x:k,y:p}=Xt(c),A=!!i.editing;wa(k,p,[{icon:'<i class="bi bi-clipboard2-pulse"></i>',label:"Kulturführung öffnen",action:()=>on(i)},{icon:'<i class="bi bi-pencil"></i>',label:"Umbenennen",action:()=>L(i)},N(i),M(i),{sep:!0},{icon:'<i class="bi bi-arrow-clockwise"></i>',label:"Beete drehen +15°",keepOpen:!0,action:()=>Oe(i,15)},{icon:'<i class="bi bi-arrow-counterclockwise"></i>',label:"Beete drehen −15°",keepOpen:!0,action:()=>Oe(i,-15)},{icon:'<i class="bi bi-bounding-box"></i>',label:"Beete an Fläche ausrichten",action:()=>cn(i)},{icon:'<i class="bi bi-grid-3x3-gap"></i>',label:i.bedsHidden?"Beete einblenden":"Beete ausblenden",action:()=>y(i)},{icon:'<i class="bi bi-bounding-box-circles"></i>',label:A?"Eckpunkte fertig":"Eckpunkte bearbeiten",action:()=>{A?Ve(i):Ht(i)}},{sep:!0},{icon:'<i class="bi bi-copy"></i>',label:"Duplizieren",action:()=>_(i)},{icon:'<i class="bi bi-zoom-in"></i>',label:"Auf Fläche zoomen",action:()=>Jt(i)},{icon:'<i class="bi bi-clipboard-data"></i>',label:"Werte kopieren",action:()=>z(i)},{icon:'<i class="bi bi-download"></i>',label:"Als GeoJSON exportieren",action:()=>q(i)},{sep:!0},{icon:'<i class="bi bi-trash"></i>',label:"Löschen",danger:!0,action:()=>Sa(i._key)}],m?`${i.name||"Fläche"} · Beet ${m}`:i.name||"Fläche")}function fe(i,c,m){const{x:k,y:p}=Xt(m);wa(k,p,[{icon:'<i class="bi bi-node-minus"></i>',label:"Eckpunkt löschen",disabled:i.latlngs.length<=3,action:()=>{i.latlngs.length<=3||(i.latlngs.splice(c,1),at(i))}},{icon:'<i class="bi bi-check2"></i>',label:"Bearbeiten beenden",action:()=>Ve(i)}],`Eckpunkt ${c+1}`)}function de(){!l.sat||!l.osm||(H.hasLayer(l.sat)?(H.removeLayer(l.sat),l.osm.addTo(H),B.info("Karte: OSM")):(H.removeLayer(l.osm),l.sat.addTo(H),B.info("Karte: Satellit")))}function X(i){const c=i.latlng,{x:m,y:k}=Xt(i);wa(m,k,[{icon:'<i class="bi bi-pencil-square"></i>',label:"Neue Fläche hier zeichnen",action:()=>{Dt(!0),gn({latlng:c})}},{icon:'<i class="bi bi-crosshair"></i>',label:"Hierhin zentrieren",action:()=>H.panTo(c)},{sep:!0},{icon:'<i class="bi bi-arrows-fullscreen"></i>',label:"Alle Flächen anzeigen",disabled:!a.some(p=>p.latlngs?.length>=3),action:sn},{icon:'<i class="bi bi-layers"></i>',label:"Kartentyp wechseln (Satellit/OSM)",action:de},{sep:!0},{icon:'<i class="bi bi-geo-alt"></i>',label:"Koordinaten kopieren",action:async()=>{try{await navigator.clipboard.writeText(`${c.lat.toFixed(6)}, ${c.lng.toFixed(6)}`),B.success("Koordinaten kopiert.")}catch{B.warning("Kopieren nicht möglich.")}}}],"Karte")}function G(i){return['<option value="">– Kultur –</option>'].concat(Kt.map(c=>{const m=`${c.kultur}${c.anbau?" ("+c.anbau+")":""}`;return`<option value="${b(c.kultur)}"${c.kultur===i?" selected":""}>${b(m)}</option>`})).join("")}function ae(i){const c=We(t.state.getState().gps?.points)||[];return['<option value="">– Standort –</option>'].concat(c.map(m=>`<option value="${b(m.id)}"${m.id===i?" selected":""}>${b(m.name||"")}</option>`)).join("")}function me(i){const c=h(i);return c?`<span class="acker-cropchip" title="Kultur"><span class="dot" style="background:${b(c.color||"#94a3b8")}"></span>${b(c.name)}</span>`:""}function ge(i){if(i=Math.round(i||0),i<=0)return"0";let c=100;return i>=1e5?c=1e3:i>=1e4&&(c=500),"≈ "+U(Math.round(i/c)*c)}function _e(i,c){const m=i.result?.beds?.length||0,k=i.params.bedW+i.params.pathW;if(m<1||k<=0){B.warning("Erst Beete berechnen lassen.");return}const A=+(m*k/c-i.params.pathW).toFixed(2);if(A<.1){B.warning("Wegbreite ist größer als der gewünschte Abstand – erst Wegbreite verkleinern.");return}i.params.bedW=A,at(i),B.success(`Bettbreite ${U(A,2)} m → ${i.result?.beds?.length||0} Beete.`)}function O(){if(!R)return;let i=0,c=0,m=0,k=0;a.forEach(A=>{i+=A.result?.areaM2||0,c+=A.result?.beds?.length||0,m+=A.result?.bedMeters||0,k+=A.result?.plants||0});const p=(A,C)=>{const Q=R.querySelector(A);Q&&(Q.textContent=C)};p('[data-t="area"]',U(i)+" m² · "+U(i/1e4,3)+" ha"),p('[data-t="beds"]',U(c)),p('[data-t="meters"]',U(m)+" m"),p('[data-t="plants"]',ge(k))}function ue(i,c){const m=c.result||{},k=i.querySelector(".acker-stat");k&&(k.textContent=U(m.plants||0)+" Pfl.");const p=(A,C)=>{const Q=i.querySelector(`[data-r="${A}"]`);Q&&(Q.textContent=C)};p("area",U(m.areaM2||0)+" m² · "+U((m.areaM2||0)/1e4,3)+" ha"),p("pitch",U(c.params.bedW+c.params.pathW,2)+" m"),p("beds",U(m.beds?.length||0)),p("meters",U(m.bedMeters||0)+" m"),p("plants",ge(m.plants||0)),O()}const De=["Jan.","Feb.","März","Apr.","Mai","Juni","Juli","Aug.","Sep.","Okt.","Nov.","Dez."];function pe(i){if(!i)return"";const c=new Date(String(i).slice(0,10)+"T00:00:00");return isNaN(c.getTime())?"":`${c.getDate()}. ${De[c.getMonth()]}`}function $t(i){const c=i?.ernteVon?pe(i.ernteVon):"",m=i?.ernteBis||i?.ernteDatum?pe(i.ernteBis||i.ernteDatum):"";return c&&m?`Ernte ${c}–${m}`:m?`Ernte ~${m}`:c?`Ernte ab ${c}`:""}function W(){const i=E('[data-role="acker-info"]');i&&(i.style.display="none")}function re(i){const c=E('[data-role="acker-info"]');if(!c)return;const{current:m,next:k}=la(v(i.typ,i.id)),p=w(i.typ,i.id).filter(Qe=>Qe.status==="geplant").length,A=i.typ==="haus",C=i.area?`${U(i.area)} m²`:"",Q=m?ga(m):"#94a3b8",he=m?`<div class="ai-row"><span class="ai-dot" style="background:${b(Q)}"></span>
           <div><div class="ai-crop">${b(m.kultur||"Kultur")}</div>
           <div class="ai-sub">${b([m.pflanzDatum?"gepflanzt "+pe(m.pflanzDatum):"",$t(m)].filter(Boolean).join(" · "))}</div></div></div>`:'<div class="ai-row"><span class="ai-dot" style="background:#cbd5e1"></span><div class="ai-crop muted">Fläche ist frei</div></div>',ve=k?`<div class="ai-next"><i class="bi bi-arrow-right-short"></i> Danach: <b>${b(k.kultur||"")}</b>${k.pflanzDatum?" ab "+pe(k.pflanzDatum):""}</div>`:"",rt=!A&&i.fieldRef?`<div class="ai-metrics"><span><b>${U(i.fieldRef.result?.beds?.length||0)}</b> Beete</span><span><b>${U(i.fieldRef.result?.bedMeters||0)}</b> m</span><span><b>${ge(i.fieldRef.result?.plants||0)}</b> Pfl.</span></div>`:"",Ze=`<div class="ai-tasks${p?" has":""}"><i class="bi ${p?"bi-list-check":"bi-check2-circle"}"></i> ${p?p+" Aufgabe"+(p===1?"":"n")+" offen":"Nichts offen"}</div>`;c.innerHTML=`
      <div class="ai-head">
        <div class="ai-title"><b>${b(i.name||"Fläche")}</b><span class="ai-badge">${A?"Gewächshaus":"Freiland"}${C?" · "+C:""}</span></div>
        <button class="ai-x" data-ai="close" title="Schließen"><i class="bi bi-x-lg"></i></button>
      </div>
      ${he}${ve}${rt}${Ze}
      <div class="ai-actions">
        <button class="ai-btn primary" data-ai="kultur"><i class="bi bi-clipboard2-pulse"></i> Kulturführung</button>
        <button class="ai-btn" data-ai="zoom"><i class="bi bi-zoom-in"></i> Hin</button>
      </div>`,c.style.display="block",c.querySelector('[data-ai="close"]')?.addEventListener("click",W),c.querySelector('[data-ai="kultur"]')?.addEventListener("click",()=>{Ue("app",Qe=>({...Qe,activeSection:"kultur"}));try{window.dispatchEvent(new CustomEvent("psm:openKultur",{detail:{typ:i.typ,id:String(i.id)}}))}catch{}}),c.querySelector('[data-ai="zoom"]')?.addEventListener("click",()=>{!A&&i.fieldRef?Jt(i.fieldRef):i.latlng&&H.setView(i.latlng,Math.max(H.getZoom(),18))})}function be(){if(!I||!V||!R)return;V.style.display=a.length?"none":"block",R.style.display=a.length?"block":"none",I.innerHTML="";let i=0,c=0,m=0,k=0;a.forEach(p=>{i+=p.result?.areaM2||0,c+=p.result?.beds?.length||0,m+=p.result?.bedMeters||0,k+=p.result?.plants||0;const A=p._key===n,C=document.createElement("div");C.className="acker-field"+(A?" sel open":""),C.innerHTML=`
        <div class="acker-fhead">
          <span class="acker-swatch" style="background:${p.color}"></span>
          <input class="acker-name" value="${b(p.name)}" />
          ${me(p)}
          <span class="acker-stat">${U(p.result?.plants||0)} Pfl.</span>
        </div>
        <div class="acker-fbody">
          <div class="acker-grid">
            <label class="acker-fld span2">Kultur<select data-k="kultur">${G(p.kultur)}</select></label>
            <label class="acker-fld span2">Standort (für PSM)<select data-k="standortId">${ae(p.standortId)}</select></label>
            <label class="acker-fld">Bettbreite (m)<input data-k="bedW" type="number" step="0.05" min="0.1" value="${p.params.bedW}"/></label>
            <label class="acker-fld">Wegbreite (m)<input data-k="pathW" type="number" step="0.05" min="0" value="${p.params.pathW}"/></label>
            <label class="acker-fld">Reihenabstand (m)<input data-k="rowSp" type="number" step="0.05" min="0.05" value="${p.params.rowSp}"/></label>
            <label class="acker-fld">Pflanzabstand (m)<input data-k="inRowSp" type="number" step="0.05" min="0.05" value="${p.params.inRowSp}"/></label>
            <div class="acker-fld span2">
              <div class="acker-angle-head"><span>Ausrichtung der Beete: <b>${p.params.angle}°</b></span>
                <button class="acker-align" data-act="align" type="button" title="Beete parallel zur längsten Kante ausrichten"><i class="bi bi-bounding-box"></i> an Fläche</button>
              </div>
              <input data-k="angle" type="range" min="0" max="180" step="5" value="${p.params.angle}"/>
            </div>
          </div>
          <div class="acker-res">
            <div class="r"><span>Fläche</span><b data-r="area">${U(p.result?.areaM2||0)} m² · ${U((p.result?.areaM2||0)/1e4,3)} ha</b></div>
            <div class="r"><span>Abstand (Mitte–Mitte)</span><b data-r="pitch">${U(p.params.bedW+p.params.pathW,2)} m</b></div>
            <div class="r"><span>Beete</span><b data-r="beds">${U(p.result?.beds?.length||0)}</b></div>
            <div class="r"><span>Beetmeter</span><b data-r="meters">${U(p.result?.bedMeters||0)} m</b></div>
            <div class="r"><span>Pflanzen (geschätzt)</span><b data-r="plants">${ge(p.result?.plants||0)}</b></div>
          </div>
          <div class="acker-calib">
            <i class="bi bi-info-circle"></i> Beetzahl passt nicht zum echten Feld?
            <span class="calib-row"><input type="number" min="1" max="999" data-calib placeholder="echte Beetzahl" /><button class="acker-align" data-act="calib" type="button"><i class="bi bi-magic"></i> anpassen</button></span>
          </div>
          <div class="acker-actions">
            <label class="acker-colorbtn" title="Farbe wählen"><input type="color" data-act="color" value="${p.color}"><i class="bi bi-palette"></i></label>
            <button class="btn btn-sm acker-abtn" data-act="zoom" title="Auf Fläche zoomen"><i class="bi bi-zoom-in"></i></button>
            <button class="btn btn-sm acker-abtn" data-act="dup" title="Duplizieren"><i class="bi bi-copy"></i></button>
            <button class="btn btn-sm acker-abtn" data-act="rot" title="Beete drehen +15°"><i class="bi bi-arrow-clockwise"></i></button>
            <span style="flex:1"></span>
            <button class="btn btn-sm acker-abtn danger" data-act="del" title="Löschen"><i class="bi bi-trash"></i></button>
          </div>
          <div class="acker-hint"><i class="bi bi-arrows-move"></i> Ausgewählte Fläche ziehen = verschieben · Rechtsklick = mehr Aktionen</div>
        </div>`,C.querySelector(".acker-fhead").addEventListener("click",ve=>{ve.target.classList.contains("acker-name")||(ut(p._key),re({typ:"acker",id:p.id,name:p.name,area:p.result?.areaM2||0,fieldRef:p}))}),C.querySelector(".acker-name").addEventListener("input",ve=>{p.name=ve.target.value,J(p)}),C.querySelectorAll("[data-k]").forEach(ve=>{const rt=ve.dataset.k;if(rt==="kultur"){ve.addEventListener("input",Ze=>{p.kultur=Ze.target.value||null,p.eppoCode=Kt.find(Qe=>Qe.kultur===p.kultur)?.eppoCode||null,te(p),J(p)});return}if(rt==="standortId"){ve.addEventListener("input",Ze=>{p.standortId=Ze.target.value||null,J(p)});return}ve.addEventListener("input",Ze=>{if(rt==="angle"?p.params.angle=+Ze.target.value:p.params[rt]=parseFloat(Ze.target.value)||0,p.result=T(p.latlngs,p.params),te(p),ue(C,p),rt==="angle"){const Qe=C.querySelector(".acker-angle-head b");Qe&&(Qe.textContent=p.params.angle+"°")}J(p)})}),C.querySelector('[data-act="align"]')?.addEventListener("click",()=>cn(p)),C.querySelector('[data-act="calib"]')?.addEventListener("click",()=>{const ve=Math.round(Number(C.querySelector("[data-calib]")?.value)||0);ve>=1?_e(p,ve):B.warning("Bitte die echte Beetzahl eingeben.")}),C.querySelector('[data-act="del"]').addEventListener("click",()=>Sa(p._key)),C.querySelector('[data-act="zoom"]').addEventListener("click",()=>Jt(p)),C.querySelector('[data-act="dup"]').addEventListener("click",()=>_(p)),C.querySelector('[data-act="rot"]').addEventListener("click",()=>Oe(p,15));const he=C.querySelector('[data-act="color"]');he.addEventListener("input",ve=>rn(p,ve.target.value)),he.addEventListener("change",ve=>ea(p,ve.target.value)),I.appendChild(C)}),R.querySelector('[data-t="area"]').textContent=U(i)+" m² · "+U(i/1e4,3)+" ha",R.querySelector('[data-t="beds"]').textContent=U(c),R.querySelector('[data-t="meters"]').textContent=U(m)+" m",R.querySelector('[data-t="plants"]').textContent=U(k)}function ut(i){n=i,a.forEach(c=>te(c)),be()}async function Sa(i){const c=a.find(k=>k._key===i);if(!c)return;ie(c);const m=a.findIndex(k=>k._key===i);if(m>=0&&a.splice(m,1),n===i&&(n=null),be(),c.id&&ce()==="sqlite")try{await el({id:c.id}),await et().catch(()=>{})}catch{}}let Le=null;function dn(i,c){pt||i._key!==n||(Le={fl:i,lastLL:c.latlng,moved:!1},H.dragging.disable(),H.getContainer().style.cursor="grabbing",ee.DomEvent.stop(c))}function un(i){if(!Le)return;const c=Le.fl;if(!Le.moved){c.bedsLayer&&(H.removeLayer(c.bedsLayer),c.bedsLayer=null);try{c.outline.setStyle({fillOpacity:.3,dashArray:"6 5"})}catch{}}const m=i.latlng.lat-Le.lastLL.lat,k=i.latlng.lng-Le.lastLL.lng;Le.lastLL=i.latlng,Le.moved=!0,c.latlngs=c.latlngs.map(p=>[p[0]+m,p[1]+k]);try{c.outline.setLatLngs(c.latlngs)}catch{}if((c.handles||[]).forEach((p,A)=>{try{p.setLatLng(c.latlngs[A])}catch{}}),c.label)try{c.label.setLatLng(c.outline.getBounds().getCenter())}catch{}}function Ea(){if(!Le)return;const i=Le.fl,c=Le.moved;Le=null,H.dragging.enable(),H.getContainer().style.cursor="",c&&at(i)}function pn(i){if(se.length<3)return!1;const c=H.latLngToContainerPoint(ee.latLng(se[0][0],se[0][1])),m=H.latLngToContainerPoint(i);return c.distanceTo(m)<=14}function La(i){const c=E('[data-role="acker-draw-stats"]');if(!c)return;const m=Kd(i);c.textContent=`${se.length} Punkt${se.length===1?"":"e"}`+(m>0?` · ~${U(m)} m²`:"")}let pt=!1,se=[],nt=null,ft=[],fn=0;function lr(){nt&&(H.removeLayer(nt),nt=null),ft.forEach(i=>H.removeLayer(i)),ft=[],se=[]}function Dt(i){pt=i,E('[data-role="acker-banner"]').style.display=i?"block":"none",E('[data-role="acker-draw"]').style.display=i?"none":"block",H.getContainer().style.cursor=i?"crosshair":"",i?H.on("mousemove",bn):(H.off("mousemove",bn),lr())}function $a(i){const c=i?[...se,[i.lat,i.lng]]:se;if(c.length<2){nt&&(H.removeLayer(nt),nt=null);return}nt?nt.setLatLngs(c):nt=ee.polygon(c,{interactive:!1,className:"acker-draw-preview",color:"#22c55e",weight:2.5,fillColor:"#22c55e",fillOpacity:.18,dashArray:"6 5"}).addTo(H)}function mn(i,c){const m=ee.circleMarker(i,{radius:c?7:5,color:"#fff",fillColor:c?"#16a34a":"#22c55e",fillOpacity:1,weight:2,interactive:c,bubblingMouseEvents:!1}).addTo(H);c&&(m.bindTooltip("Zum Schließen anklicken",{direction:"top"}),m.on("click",k=>{ee.DomEvent.stop(k),se.length>=3&&aa()})),ft.push(m)}function gn(i){if(!pt){W();return}if(pn(i.latlng)){aa();return}se.push([i.latlng.lat,i.latlng.lng]),mn(i.latlng,se.length===1),$a(),La(se)}function bn(i){if(!pt||!se.length)return;const c=pn(i.latlng);if($a(c?void 0:i.latlng),ft[0])try{ft[0].setRadius(c?10:7),ft[0].setStyle({weight:c?3:2})}catch{}La(c?se:[...se,[i.latlng.lat,i.latlng.lng]])}function zt(){if(!se.length)return;se.pop();const i=ft.pop();i&&H.removeLayer(i),$a(),La(se)}function aa(){if(se.length<3){B.warning("Mindestens 3 Punkte setzen.");return}const i={_key:"new-"+ ++fn,id:null,name:"Fläche "+(a.length+1),kultur:null,eppoCode:null,standortId:null,color:At[a.length%At.length],latlngs:se.map(c=>c.slice()),params:{...Od(),angle:xa(se)},outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(i),Dt(!1),n=i._key,at(i),J(i,!0)}async function na(){const i=E('[data-role="acker-q"]').value.trim();if(i)try{const m=await(await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+encodeURIComponent(i))).json();m[0]?H.setView([+m[0].lat,+m[0].lon],18):B.info("Nichts gefunden.")}catch{B.warning("Suche nicht verfügbar.")}}async function Da(){if(zn){setTimeout(()=>H&&H.invalidateSize(),60);return}zn=!0;try{const[p]=await Promise.all([Ut(()=>import("./leaflet-src.BcflbDBd.js").then(A=>A.l),__vite__mapDeps([2,3])).then(async A=>(await Ut(()=>Promise.resolve({}),__vite__mapDeps([4])),A)),Hd()]);ee=p.default||p}catch(p){console.warn("[Acker] Karten-Bibliotheken konnten nicht geladen werden:",p),V&&(V.textContent="Karte konnte nicht geladen werden (offline?)."),zn=!1;return}H=ee.map(ke,{doubleClickZoom:!1,zoomControl:!0,attributionControl:!0}).setView([47.818,8.976],17);const i=ee.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:21,maxNativeZoom:19,attribution:"Tiles © Esri"}).addTo(H),c=ee.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"});l={sat:i,osm:c},s=ee.layerGroup(),x(),s.addTo(H),o=ee.layerGroup().addTo(H);const m=H.createPane("edgeLabels");m.style.zIndex="650",m.style.pointerEvents="none";const k=ee.DomUtil.create("div","acker-info");k.setAttribute("data-role","acker-info"),k.style.display="none",H.getContainer().appendChild(k),ee.DomEvent.disableClickPropagation(k),ee.DomEvent.disableScrollPropagation(k),H.on("click",gn),H.on("contextmenu",p=>{if(pt){ee.DomEvent.preventDefault?.(p.originalEvent||p),zt();return}X(p)}),H.on("mousemove",un),H.on("mouseup",Ea),document.addEventListener("mouseup",Ea),H.on("zoomend",or),E('[data-role="acker-draw"]').addEventListener("click",()=>Dt(!0)),E('[data-role="acker-export"]')?.addEventListener("click",S),E('[data-role="acker-finish"]').addEventListener("click",aa),E('[data-role="acker-cancel"]').addEventListener("click",()=>Dt(!1)),E('[data-role="acker-go"]').addEventListener("click",na),E('[data-role="acker-q"]').addEventListener("keydown",p=>{p.key==="Enter"&&na()}),E('[data-role="ctrl-fit"]')?.addEventListener("click",sn),E('[data-role="ctrl-labels"]')?.addEventListener("click",()=>{d=!d,E('[data-role="ctrl-labels"]')?.classList.toggle("on",d),Ot()}),E('[data-role="ctrl-beds"]')?.addEventListener("click",()=>{f=!f,E('[data-role="ctrl-beds"]')?.classList.toggle("on",f),Ot()}),E('[data-role="ctrl-basemap"]')?.addEventListener("click",de),document.addEventListener("keydown",p=>{pt&&(p.key==="Backspace"&&(p.preventDefault(),zt()),p.key==="Enter"&&aa(),p.key==="Escape"&&Dt(!1))}),await cr(),await fi(),await vo(),setTimeout(()=>H.invalidateSize(),60)}async function cr(){if(ce()==="sqlite")try{Kt=(await Ur())?.rows||[]}catch{Kt=[]}}async function fi(){if(ce()!=="sqlite"){u=[],g=[];return}try{u=(await Er())?.rows||[]}catch{u=[]}try{g=(await Pn())?.rows||[]}catch{g=[]}}async function vo(){if(ce()==="sqlite")try{const i=await Vr();for(const m of i?.rows||[]){const k={_key:"db-"+m.id,id:m.id,name:m.name,kultur:m.kultur,eppoCode:m.eppoCode,standortId:m.standortId,color:m.color||At[a.length%At.length],latlngs:m.latlngs||[],params:{bedW:m.bedW??1.2,pathW:m.pathW??.4,rowSp:m.rowSp??.5,inRowSp:m.inRowSp??.4,angle:m.angle??0},outline:null,bedsLayer:null,handles:[],edgeLabels:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};k.result=await T(k.latlngs,k.params),a.push(k),te(k)}be();const c=a.find(m=>m.latlngs?.length);if(c&&H)try{H.fitBounds(ee.polygon(c.latlngs).getBounds(),{maxZoom:19,padding:[30,30]})}catch{}}catch(i){console.warn("[Acker] Flächen laden fehlgeschlagen:",i)}}t.state.subscribe(i=>{if(i?.app?.activeSection==="acker"){if(!zn){Da();return}(async()=>(await fi(),Ot(),be(),setTimeout(()=>H&&H.invalidateSize(),60)))()}}),be()}function Wd(){return`
  <style>
    .acker-wrap{display:flex;gap:0;height:calc(100vh - 80px);min-height:480px;border:1px solid var(--ap-line);border-radius:var(--ap-r-lg);overflow:hidden;background:var(--ap-surface);box-shadow:var(--ap-shadow-sm)}
    .acker-side{width:360px;min-width:320px;display:flex;flex-direction:column;border-right:1px solid var(--ap-line);overflow:hidden;background:var(--ap-surface)}
    .acker-scroll{overflow-y:auto;padding:var(--ap-4);flex:1;display:flex;flex-direction:column;gap:var(--ap-3)}
    .acker-map{flex:1;min-height:300px}
    .acker-search{display:flex;gap:var(--ap-2)}
    .acker-search input{flex:1}
    .acker-banner{display:none;background:var(--ap-green-tint);border:1px solid var(--ap-green-line);color:var(--ap-ink);padding:var(--ap-3) var(--ap-4);border-radius:var(--ap-r);font-size:var(--ap-fs-sm);line-height:1.5}
    .acker-banner .row{display:flex;gap:var(--ap-2);margin-top:var(--ap-3)}
    .acker-totals{background:var(--ap-green-tint);border:1px solid var(--ap-green-line);border-radius:var(--ap-r-lg);padding:var(--ap-4)}
    .acker-totals .t-row{display:flex;justify-content:space-between;align-items:center;font-size:var(--ap-fs-sm);padding:var(--ap-1) 0;color:var(--ap-ink-2)}
    .acker-totals .t-row b{color:var(--ap-ink);font-weight:var(--ap-w-bold)}
    .acker-totals .big{font-size:var(--ap-fs-xl);font-weight:var(--ap-w-black);color:var(--ap-green)}
    .acker-legend{display:flex;align-items:center;gap:var(--ap-3);margin-top:var(--ap-2);padding-top:var(--ap-3);border-top:1px solid var(--ap-green-line);font-size:var(--ap-fs-xs);color:var(--ap-ink-3)}
    .acker-legend .lg{display:inline-flex;align-items:center;gap:5px}
    .acker-legend .lg i{width:17px;height:11px;border-radius:3px;display:inline-block;flex:none}
    .acker-legend .lg i.bed{background:var(--ap-green-bright);box-shadow:inset 0 0 0 1px #fff}
    .acker-legend .lg i.path{background:transparent;border:1px dashed var(--ap-ink-3)}
    .acker-legend .lg-hint{margin-left:auto;color:var(--ap-ink-3)}
    .acker-empty{color:var(--ap-ink-3);font-size:var(--ap-fs-sm);text-align:center;padding:var(--ap-6) var(--ap-2);line-height:1.6}
    .acker-field{border:1px solid var(--ap-line);border-radius:var(--ap-r);margin-bottom:var(--ap-3);overflow:hidden;background:var(--ap-surface);transition:box-shadow var(--ap-t),border-color var(--ap-t)}
    .acker-field.sel{border-color:var(--ap-green);box-shadow:0 0 0 2px var(--ap-green-soft)}
    .acker-fhead{display:flex;align-items:center;gap:var(--ap-2);padding:var(--ap-3);cursor:pointer}
    .acker-swatch{width:18px;height:18px;border-radius:6px;flex:none;border:1px solid rgba(0,0,0,.14)}
    .acker-name{flex:1;font-size:var(--ap-fs-md);font-weight:var(--ap-w-bold);border:0;background:transparent;outline:none;color:var(--ap-ink);min-width:0}
    .acker-stat{font-size:var(--ap-fs-xs);color:var(--ap-ink-3);font-weight:var(--ap-w-med)}
    .acker-cropchip{display:inline-flex;align-items:center;gap:5px;font-size:var(--ap-fs-xs);color:var(--ap-ink);background:var(--ap-surface-2);border:1px solid var(--ap-line);border-radius:var(--ap-r-pill);padding:3px 10px;max-width:120px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
    .acker-cropchip .dot{width:8px;height:8px;border-radius:50%;flex:none}
    .acker-angle-head{display:flex;align-items:center;justify-content:space-between;gap:var(--ap-2);margin-bottom:6px}
    .acker-align{display:inline-flex;align-items:center;gap:5px;font-size:var(--ap-fs-xs);border:1px solid var(--ap-line-2);background:var(--ap-surface);color:var(--ap-ink-2);border-radius:var(--ap-r-sm);padding:8px 12px;cursor:pointer;white-space:nowrap;font-weight:var(--ap-w-med);min-height:var(--ap-control-sm)}
    .acker-align:hover{background:var(--ap-green-soft);color:var(--ap-green-dark);border-color:var(--ap-green-line)}
    /* Karten-Anzeigeschalter im Panel (statt schwebender Icons) */
    .acker-mapctrls{display:flex;gap:var(--ap-2)}
    .acker-mapctrls button{flex:1;height:var(--ap-icon-btn);border:1px solid var(--ap-line);background:var(--ap-surface);color:var(--ap-ink-2);border-radius:var(--ap-r-sm);cursor:pointer;font-size:18px;display:inline-flex;align-items:center;justify-content:center;transition:background var(--ap-t),color var(--ap-t),border-color var(--ap-t)}
    .acker-mapctrls button:hover{background:var(--ap-surface-3);color:var(--ap-ink)}
    .acker-mapctrls button.on{background:var(--ap-green-soft);color:var(--ap-green-dark);border-color:var(--ap-green-line)}
    /* Info-Karte (Klick auf Fläche/Gewächshaus) – Overlay im Karten-Container */
    .acker-info{position:absolute;top:14px;left:54px;z-index:1000;width:300px;max-width:calc(100% - 68px);background:var(--ap-surface);border:1px solid var(--ap-line);border-radius:var(--ap-r-lg);box-shadow:var(--ap-shadow-lg);padding:var(--ap-4);font-size:var(--ap-fs-sm);color:var(--ap-ink)}
    .acker-info .ai-head{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--ap-2);margin-bottom:var(--ap-2)}
    .acker-info .ai-title b{font-size:var(--ap-fs-md);font-weight:var(--ap-w-bold);display:block;line-height:1.2}
    .acker-info .ai-badge{font-size:var(--ap-fs-xs);color:var(--ap-green-dark);background:var(--ap-green-soft);border-radius:var(--ap-r-pill);padding:2px 10px;display:inline-block;margin-top:4px;font-weight:var(--ap-w-med)}
    .acker-info .ai-x{border:0;background:transparent;color:var(--ap-ink-3);cursor:pointer;font-size:18px;padding:2px;line-height:1;border-radius:var(--ap-r-sm)}
    .acker-info .ai-x:hover{color:var(--ap-ink)}
    .acker-info .ai-row{display:flex;gap:var(--ap-2);align-items:flex-start;margin:var(--ap-2) 0}
    .acker-info .ai-dot{width:14px;height:14px;border-radius:50%;flex:none;margin-top:3px}
    .acker-info .ai-crop{font-size:var(--ap-fs-md);font-weight:var(--ap-w-bold);line-height:1.15}
    .acker-info .ai-crop.muted{color:var(--ap-ink-3);font-weight:var(--ap-w-med)}
    .acker-info .ai-sub{font-size:var(--ap-fs-xs);color:var(--ap-ink-3);margin-top:2px}
    .acker-info .ai-next{font-size:var(--ap-fs-sm);color:var(--ap-ink-2);margin:4px 0 2px}
    .acker-info .ai-next b{color:var(--ap-ink)}
    .acker-info .ai-metrics{display:flex;gap:var(--ap-4);margin:var(--ap-3) 0;padding:var(--ap-2) 0;border-top:1px solid var(--ap-line);border-bottom:1px solid var(--ap-line);font-size:var(--ap-fs-xs);color:var(--ap-ink-3)}
    .acker-info .ai-metrics b{color:var(--ap-green-dark);font-size:var(--ap-fs-md)}
    .acker-info .ai-tasks{font-size:var(--ap-fs-sm);color:var(--ap-ink-3);margin:var(--ap-2) 0 0;display:flex;align-items:center;gap:6px}
    .acker-info .ai-tasks.has{color:var(--ap-warn);font-weight:var(--ap-w-med)}
    .acker-info .ai-tasks i{font-size:16px}
    .acker-info .ai-actions{display:flex;gap:var(--ap-2);margin-top:var(--ap-3)}
    .acker-info .ai-btn{flex:1;border:1px solid var(--ap-line-2);background:var(--ap-surface);color:var(--ap-ink-2);border-radius:var(--ap-r-sm);padding:11px 10px;font-size:var(--ap-fs-sm);font-weight:var(--ap-w-med);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap;min-height:var(--ap-control-sm)}
    .acker-info .ai-btn:hover{background:var(--ap-surface-3);color:var(--ap-ink)}
    .acker-info .ai-btn.primary{background:var(--ap-green);border-color:var(--ap-green);color:var(--ap-on-green);font-weight:var(--ap-w-bold)}
    .acker-info .ai-btn.primary:hover{background:var(--ap-green-dark);border-color:var(--ap-green-dark)}
    .acker-fbody{display:none;padding:0 var(--ap-3) var(--ap-3);border-top:1px solid var(--ap-line)}
    .acker-field.open .acker-fbody{display:block}
    .acker-grid{display:grid;grid-template-columns:1fr 1fr;gap:var(--ap-3);margin-top:var(--ap-3)}
    .acker-fld{font-size:var(--ap-fs-xs);color:var(--ap-ink-2);display:flex;flex-direction:column;gap:5px;font-weight:var(--ap-w-med)}
    .acker-fld input:not([type=range]),.acker-fld select{padding:11px 12px;border:1px solid var(--ap-line-2);border-radius:var(--ap-r-sm);font-size:var(--ap-fs);width:100%;background:var(--ap-surface);color:var(--ap-ink);min-height:var(--ap-control-sm)}
    .acker-fld input[type=range]{accent-color:var(--ap-green);width:100%}
    .acker-fld.span2{grid-column:1 / -1}
    .acker-res{margin-top:var(--ap-3);background:var(--ap-surface-2);border-radius:var(--ap-r-sm);padding:var(--ap-3)}
    .acker-res .r{display:flex;justify-content:space-between;align-items:center;font-size:var(--ap-fs-sm);padding:3px 0;color:var(--ap-ink-2)}
    .acker-res .r b{color:var(--ap-green-dark);font-weight:var(--ap-w-bold)}
    .acker-calib{margin-top:var(--ap-3);font-size:var(--ap-fs-xs);color:var(--ap-ink-2);line-height:1.5}
    .acker-calib i{color:var(--ap-info)}
    .acker-calib .calib-row{display:flex;gap:var(--ap-2);margin-top:var(--ap-2)}
    .acker-calib input{flex:1;min-width:0;padding:11px 12px;border:1px solid var(--ap-line-2);border-radius:var(--ap-r-sm);font-size:var(--ap-fs);background:var(--ap-surface);color:var(--ap-ink);min-height:var(--ap-control-sm)}
    .acker-calib button{white-space:nowrap}
    .acker-vhandle{background:#fff;border:2px solid var(--ap-green-dark);border-radius:50%;width:14px!important;height:14px!important;margin-left:-7px!important;margin-top:-7px!important;cursor:grab}
    /* Kantenlängen-Labels: am Mittelpunkt jeder Kante beim Bearbeiten sichtbar */
    .acker-edge-label-wrap{pointer-events:none!important}
    .acker-edge-label{position:absolute;transform:translate(-50%,-50%);background:rgba(0,0,0,.72);color:#fff;font-size:11px;font-weight:600;white-space:nowrap;padding:2px 7px;border-radius:10px;letter-spacing:.02em;box-shadow:0 1px 4px rgba(0,0,0,.35);pointer-events:none;line-height:1.5}
    .acker-outline-grab{cursor:grab}
    .acker-draw-preview{animation:acker-ants .8s linear infinite}
    @keyframes acker-ants{to{stroke-dashoffset:-22}}
    .acker-draw-stats{font-size:var(--ap-fs-sm);font-weight:var(--ap-w-bold);color:var(--ap-green-dark);margin-top:var(--ap-2)}
    .acker-standort-dot{display:block;width:14px;height:14px;border-radius:50%;background:var(--ap-warn);border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.35)}
    .acker-standort-label{background:rgba(255,255,255,.94);color:var(--ap-ink);border:1px solid var(--ap-warn);border-radius:var(--ap-r-sm);padding:2px 7px;font-size:var(--ap-fs-xs);font-weight:var(--ap-w-med);box-shadow:0 1px 3px rgba(0,0,0,.25)}
    .acker-standort-label::before{display:none}
    /* Flächen-Beschriftung (Zentroid) */
    .acker-flabel-wrap{pointer-events:none!important}
    .acker-flabel{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:0;white-space:nowrap;padding:4px 10px;border-radius:var(--ap-r-sm);background:rgba(255,255,255,.94);border:2px solid var(--fc,#3b82f6);box-shadow:0 2px 8px rgba(0,0,0,.22);line-height:1.15}
    .acker-flabel b{font-weight:var(--ap-w-bold);font-size:var(--ap-fs-xs);color:var(--ap-ink)}
    .acker-flabel i{font-style:normal;color:var(--ap-green-dark);font-weight:var(--ap-w-med);font-size:11px}
    .acker-flabel .cr{font-style:normal;font-weight:var(--ap-w-bold);font-size:10px;color:#fff;background:var(--cc,#16a34a);border-radius:5px;padding:1px 6px;margin:1px 0;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .acker-flabel .cr .dot{display:none}
    .acker-flabel .dims{font-style:normal;color:var(--ap-ink-3);font-size:10px;font-weight:var(--ap-w-med);display:block;text-align:center;margin-top:1px}
    .acker-flabel.sel{box-shadow:0 3px 12px rgba(0,0,0,.3);transform:translate(-50%,-50%) scale(1.05)}
    /* Floating-Toolbar */
    .acker-toolbar a{display:flex!important;align-items:center;justify-content:center;font-size:17px;color:var(--ap-ink-2);background:#fff;width:34px;height:34px;line-height:34px}
    .acker-toolbar a.on{color:var(--ap-green-dark);background:var(--ap-green-soft)}
    .acker-toolbar a:hover{background:var(--ap-surface-3)}
    .acker-toolbar a.on:hover{background:var(--ap-green-line)}
    /* Panel-Aktionen */
    .acker-actions{display:flex;align-items:center;gap:var(--ap-2);margin-top:var(--ap-3)}
    .acker-colorbtn{position:relative;width:var(--ap-icon-btn);height:var(--ap-icon-btn);border-radius:var(--ap-r-sm);border:1px solid var(--ap-line-2);display:flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;flex:none;background:var(--ap-surface)}
    .acker-colorbtn:hover{background:var(--ap-surface-3)}
    .acker-colorbtn input{position:absolute;inset:0;opacity:0;cursor:pointer}
    .acker-colorbtn i{font-size:17px;color:var(--ap-ink-2);pointer-events:none}
    .acker-abtn{width:var(--ap-icon-btn);height:var(--ap-icon-btn);display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--ap-line-2);border-radius:var(--ap-r-sm);background:var(--ap-surface);color:var(--ap-ink-2);padding:0;font-size:17px;flex:none;cursor:pointer;transition:background var(--ap-t),color var(--ap-t)}
    .acker-abtn:hover{background:var(--ap-surface-3);color:var(--ap-ink)}
    .acker-abtn.danger{color:var(--ap-danger);border-color:var(--ap-danger-line)}
    .acker-abtn.danger:hover{background:var(--ap-danger-soft)}
    .acker-hint{margin-top:var(--ap-2);font-size:var(--ap-fs-xs);color:var(--ap-ink-3);display:flex;align-items:center;gap:5px;line-height:1.45}
    /* Rechtsklick-Kontextmenü */
    .acker-ctx{position:fixed;z-index:12000;min-width:248px;max-width:320px;background:var(--ap-surface);border:1px solid var(--ap-line);border-radius:var(--ap-r-lg);box-shadow:var(--ap-shadow-lg);padding:var(--ap-2);font-size:var(--ap-fs-sm);color:var(--ap-ink);user-select:none}
    .acker-ctx-title{font-size:var(--ap-fs-xs);font-weight:var(--ap-w-bold);color:var(--ap-ink-3);padding:7px 10px 9px;text-transform:uppercase;letter-spacing:.04em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .acker-ctx-sep{height:1px;background:var(--ap-line);margin:var(--ap-1) var(--ap-1)}
    .acker-ctx-item{display:flex;align-items:center;gap:var(--ap-2);width:100%;border:0;background:transparent;color:inherit;text-align:left;padding:11px 10px;border-radius:var(--ap-r-sm);cursor:pointer;position:relative;font-size:var(--ap-fs-sm);line-height:1.2}
    .acker-ctx-item:hover{background:var(--ap-surface-3)}
    .acker-ctx-item .ic{width:20px;text-align:center;color:var(--ap-ink-2);flex:none;font-size:16px}
    .acker-ctx-item .lb{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .acker-ctx-item .ch{color:var(--ap-ink-3);margin-left:auto;font-size:12px}
    .acker-ctx-item.danger{color:var(--ap-danger)}
    .acker-ctx-item.danger .ic{color:var(--ap-danger)}
    .acker-ctx-item.disabled{opacity:.4;cursor:default}
    .acker-ctx-item.disabled:hover{background:transparent}
    .acker-ctx-sub{display:none;position:absolute;left:calc(100% + 1px);top:-5px;min-width:210px;max-height:62vh;overflow-y:auto;overflow-x:hidden;background:var(--ap-surface);border:1px solid var(--ap-line);border-radius:var(--ap-r-lg);box-shadow:var(--ap-shadow-lg);padding:var(--ap-2)}
    .acker-ctx-sub.open{display:block}
    .acker-ctx-item.has-sub::after{content:'';position:absolute;top:0;bottom:0;left:100%;width:6px}
    .acker-ctx-swatches{display:grid;grid-template-columns:repeat(6,1fr);gap:5px;padding:9px 10px}
    .acker-sw{width:26px;height:26px;border-radius:4px;border:2px solid rgba(0,0,0,.12);cursor:pointer;padding:0;transition:transform .1s}
    .acker-sw:hover{transform:scale(1.18);border-color:rgba(0,0,0,.3)}
    .acker-sw.on{box-shadow:0 0 0 2px var(--ap-ink)}
    .acker-sw-custom{grid-column:1 / -1;display:flex;align-items:center;justify-content:center;gap:6px;border:1px dashed var(--ap-line-2);border-radius:var(--ap-r-sm);padding:7px;cursor:pointer;font-size:var(--ap-fs-xs);color:var(--ap-ink-2)}
    .acker-sw-custom input{width:26px;height:26px;border:0;background:none;padding:0;cursor:pointer}
    @media(max-width:760px){.acker-wrap{flex-direction:column;height:auto}.acker-side{width:100%;max-height:46vh}.acker-map{height:52vh}}
  </style>
  <section class="calc-section">
    <div class="acker-wrap">
      <aside class="acker-side">
        <div class="acker-scroll">
          <div class="acker-search">
            <input class="form-control calc-input" data-role="acker-q" placeholder="Ort suchen (z. B. Wahlwies)" />
            <button class="btn btn-psm-secondary-outline" data-role="acker-go">Suchen</button>
          </div>
          <button class="btn btn-psm-primary" style="width:100%" data-role="acker-draw">+ Neue Fläche zeichnen</button>
          <div class="acker-mapctrls">
            <button data-role="ctrl-fit" title="Alle Flächen anzeigen"><i class="bi bi-arrows-fullscreen"></i></button>
            <button data-role="ctrl-labels" class="on" title="Beschriftungen ein/aus"><i class="bi bi-tag"></i></button>
            <button data-role="ctrl-beds" class="on" title="Beete-Detail ein/aus"><i class="bi bi-grid-3x3"></i></button>
            <button data-role="ctrl-basemap" title="Kartentyp (Satellit/OSM)"><i class="bi bi-layers"></i></button>
          </div>
          <div class="acker-banner" data-role="acker-banner">
            <b>Ecke für Ecke anklicken</b> – die Vorschau folgt dem Cursor. Zum Abschließen den <b>ersten Punkt</b> anklicken (oder <b>Enter</b>).<br>
            <span style="opacity:.8">Rechtsklick oder <b>Backspace</b> = letzten Punkt zurück · <b>Esc</b> = abbrechen.</span>
            <div class="acker-draw-stats" data-role="acker-draw-stats">0 Punkte</div>
            <div class="row">
              <button class="btn btn-sm btn-psm-primary" data-role="acker-finish">✓ Fertig</button>
              <button class="btn btn-sm btn-psm-secondary-outline" data-role="acker-cancel">Abbrechen</button>
            </div>
          </div>
          <div class="acker-totals" data-role="acker-totals" style="display:none">
            <div class="t-row"><span>Gesamtfläche</span><b data-t="area">–</b></div>
            <div class="t-row"><span>Beete gesamt</span><b data-t="beds">–</b></div>
            <div class="t-row"><span>Beetmeter gesamt</span><b data-t="meters">–</b></div>
            <div class="t-row"><span>Pflanzen gesamt</span><b class="big" data-t="plants">–</b></div>
            <div class="acker-legend">
              <span class="lg"><i class="bed"></i>Beet</span>
              <span class="lg"><i class="path"></i>Weg</span>
              <span class="lg-hint">beim Reinzoomen sichtbar</span>
            </div>
          </div>
          <div class="acker-export-box">
            <button class="btn btn-sm btn-psm-secondary-outline" data-role="acker-export" style="width:100%">
              <i class="bi bi-geo me-1"></i>Als GeoJSON exportieren
            </button>
            <div style="font-size:var(--ap-fs-xs);color:var(--ap-ink-3);margin-top:6px;line-height:1.4">Flächen + Standorte (WGS84) für QGIS / FMIS / Traktor-Terminals.</div>
          </div>
          <div data-role="acker-list"></div>
          <div class="acker-empty" data-role="acker-empty">Noch keine Fläche.<br>Zum Acker navigieren, dann <b>Neue Fläche zeichnen</b>.</div>
        </div>
      </aside>
      <div class="acker-map" data-role="acker-map"></div>
    </div>
  </section>`}function Na(e){return e.typ+":"+e.id}function jd(e){if(!Array.isArray(e)||e.length<3)return null;let t=0,a=0,n=0;const r=e.length,s=e[r-1],o=e[0],d=s&&o&&Number(s[0])===Number(o[0])&&Number(s[1])===Number(o[1])?r-1:r;for(let f=0;f<d;f++){const u=Number(e[f]?.[0]),g=Number(e[f]?.[1]);Number.isFinite(u)&&Number.isFinite(g)&&(t+=u,a+=g,n++)}return n?{lat:t/n,lon:a/n}:null}async function fs(e){const t=[];(We(e.state.getState().gps?.points)||[]).forEach(n=>{if(n?.kind!=="gewaechshaus")return;const r=Number(n.latitude),s=Number(n.longitude),o=Number(n.nutzflaecheQm);t.push({typ:"haus",id:String(n.id),name:n.name||"Gewächshaus",areaQm:Number.isFinite(o)&&o>0?o:null,lat:Number.isFinite(r)?r:null,lon:Number.isFinite(s)?s:null,color:null})});try{((await Vr())?.rows||[]).forEach(r=>{const s=jd(r.latlngs),o=Number(r.areaQm);t.push({typ:"acker",id:String(r.id),name:r.name||"Fläche",areaQm:Number.isFinite(o)&&o>0?o:null,lat:s?.lat??null,lon:s?.lon??null,color:r.color||null})})}catch{}return t}const Gd="Wetterdaten: Open-Meteo (CC BY 4.0)",Ud="psm.weather.";function Vd(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function Zd(e,t){return Ud+e.toFixed(3)+"_"+t.toFixed(3)}function Qd(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch{return null}}function Jd(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Yd(e){return!!e&&e.slice(0,10)===Vd()}function Xd(e,t,a){const n=e?.time||[],r=e?.temperature_2m_max||[],s=e?.temperature_2m_min||[],o=e?.precipitation_sum||[],l=e?.sunshine_duration||[],d=Rn(new Date),f=wi(d.year,d.week),u=new Map;for(let v=0;v<n.length;v++){const w=zs(n[v]);if(!w)continue;const{year:h,week:S}=Rn(w),x=wi(h,S);let E=u.get(x);E||(E={key:x,year:h,week:S,tmaxSum:0,tmaxN:0,tminSum:0,tminN:0,precip:0,precipN:0,sun:0,sunN:0,days:0},u.set(x,E)),Number.isFinite(r[v])&&(E.tmaxSum+=r[v],E.tmaxN++),Number.isFinite(s[v])&&(E.tminSum+=s[v],E.tminN++),Number.isFinite(o[v])&&(E.precip+=o[v],E.precipN++),Number.isFinite(l[v])&&(E.sun+=l[v],E.sunN++),E.days++}const g=[...u.values()].sort((v,w)=>v.key<w.key?-1:v.key>w.key?1:0).map(v=>{const w=v.tmaxN?v.tmaxSum/v.tmaxN:null,h=v.tminN?v.tminSum/v.tminN:null;return{weekKey:v.key,year:v.year,week:v.week,tMaxAvg:w,tMinAvg:h,tMeanAvg:w!=null&&h!=null?(w+h)/2:w,precipSum:v.precipN?v.precip:null,sunHours:v.sunN?v.sun/3600:null,days:v.days,isForecast:v.key>=f}});return{lat:t,lon:a,fetchedAt:new Date().toISOString(),weeks:g}}async function eu(e,t){if(!Number.isFinite(e)||!Number.isFinite(t))return{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const a=Zd(e,t),n=Qd(a);if(n&&Yd(n.fetchedAt)&&n.weeks?.length)return n;if(typeof navigator<"u"&&navigator.onLine===!1)return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const r="https://api.open-meteo.com/v1/forecast?latitude="+e.toFixed(4)+"&longitude="+t.toFixed(4)+"&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunshine_duration&timezone=Europe%2FBerlin&past_days=92&forecast_days=16";try{const s=await fetch(r);if(!s.ok)throw new Error("HTTP "+s.status);const o=await s.json(),l=Xd(o.daily,e,t);return l.weeks.length&&Jd(a,l),l}catch{return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]}}}const xr=66;function tu(e,t){const{units:a,anbau:n,mass:r,onSelect:s,onContext:o}=t;if(!a||!a.length){e.innerHTML='<div class="km-empty"><i class="bi bi-calendar3"></i><p>Noch keine Flächen für den Anbauplan.</p></div>';return}const l=new Date;let d=new Date(l.getFullYear(),l.getMonth()-1,1),f=new Date(l.getFullYear(),l.getMonth()+4,1);const u=F=>{if(!F)return;const J=new Date(String(F).slice(0,10)+"T00:00:00");isNaN(J.getTime())||(J<d&&(d=new Date(J.getFullYear(),J.getMonth(),1)),J>f&&(f=new Date(J.getFullYear(),J.getMonth(),1)))};(n||[]).forEach(F=>{u(F.pflanzDatum),u(F.ernteBis||F.ernteDatum),u(F.ernteVon)}),(r||[]).forEach(F=>u(F.planDatum||F.erledigtDatum));const g=uo(d,f),v=g.length,w=v*xr,h=F=>F==null?null:(F*100).toFixed(2)+"%",S=Ke(g,l.toISOString()),x=a.filter(F=>F.typ==="haus"),E=a.filter(F=>F.typ==="acker");let I="";g.forEach((F,J)=>{const T=F.y===l.getFullYear()&&F.m===l.getMonth();I+=`<div class="kb2-mo${T?" cur":""}" style="width:${xr}px">${co[F.m]}${F.m===0?" "+String(F.y).slice(2):""}</div>`});const V=F=>{const J=(n||[]).filter(P=>P.flaecheTyp===F.typ&&String(P.flaecheId)===String(F.id)),T=(r||[]).filter(P=>P.flaecheTyp===F.typ&&String(P.flaecheId)===String(F.id));let $="";return J.forEach((P,Y)=>{const ie=Ke(g,P.pflanzDatum);let te=Ke(g,P.ernteBis||P.ernteDatum||P.pflanzDatum);if(ie==null)return;(te==null||te<=ie)&&(te=Math.min(1,ie+.5/v));const we=ga(P,Y),dt=P.status==="geplant";$+=`<div class="kb2-bar${dt?" planned":""}" title="${b(P.kultur||"Kultur")}" style="left:${h(ie)};width:${((te-ie)*100).toFixed(2)}%;--cc:${b(we)}"><span>${b(P.kultur||"")}</span></div>`;const Be=Ke(g,P.ernteVon),He=Ke(g,P.ernteBis);Be!=null&&He!=null&&He>Be&&($+=`<div class="kb2-harvest" title="Ernte" style="left:${h(Be)};width:${((He-Be)*100).toFixed(2)}%;--cc:${b(we)}"></div>`)}),T.forEach(P=>{const Y=P.status==="erledigt"?P.erledigtDatum||P.planDatum:P.planDatum||P.erledigtDatum,ie=Ke(g,Y);if(ie==null)return;const te=oo(P.art),we=P.status==="erledigt";$+=`<span class="kb2-mk${we?" done":""}" title="${b(te.label+(P.notes?": "+P.notes:""))}" style="left:${h(ie)};--mc:${te.color}"></span>`}),S!=null&&($+=`<div class="kb2-today" style="left:${h(S)}"></div>`),$},R=F=>{const J=F.typ+":"+F.id,T=(n||[]).filter(Y=>Y.flaecheTyp===F.typ&&String(Y.flaecheId)===String(F.id)),$=T.find(Y=>Y.status==="aktiv")||T.find(Y=>Y.status!=="abgeschlossen"),P=$?b($.kultur||""):"frei";return`<div class="kb2-row" data-ukey="${J}">
      <div class="kb2-label" title="${b(F.name)}"><b>${b(F.name)}</b><small>${P}</small></div>
      <div class="kb2-track" style="width:${w}px">${V(F)}</div>
    </div>`},ke=(F,J)=>J.length?`<div class="kb2-grp"><div class="kb2-grp-l">${b(F)}</div><div class="kb2-grp-t" style="width:${w}px"></div></div>`+J.map(R).join(""):"";e.innerHTML=`
    <style>
      .kb2-scroll{overflow:auto;max-width:100%}
      .kb2-head{display:flex;align-items:flex-end;position:sticky;top:0;background:var(--ap-surface);z-index:4}
      .kb2-corner{position:sticky;left:0;z-index:5;background:var(--ap-surface);width:140px;min-width:140px;font-size:var(--ap-fs-xs);font-weight:var(--ap-w-bold);color:var(--ap-ink-2);padding:0 var(--ap-2) 6px}
      .kb2-axis{display:flex}
      .kb2-mo{font-size:11px;color:var(--ap-ink-3);text-align:center;border-left:1px solid var(--ap-line);padding-bottom:6px;box-sizing:border-box}
      .kb2-mo.cur{color:var(--ap-green-dark);font-weight:var(--ap-w-bold)}
      .kb2-grp{display:flex}
      .kb2-grp-l{position:sticky;left:0;z-index:3;background:var(--ap-surface);width:140px;min-width:140px;font-size:var(--ap-fs-xs);text-transform:uppercase;letter-spacing:.04em;font-weight:var(--ap-w-bold);color:var(--ap-ink-3);padding:var(--ap-3) var(--ap-2) 4px}
      .kb2-row{display:flex;align-items:stretch}
      .kb2-row:hover .kb2-label{background:var(--ap-surface-2)}
      .kb2-label{position:sticky;left:0;z-index:3;background:var(--ap-surface);width:140px;min-width:140px;padding:8px var(--ap-2);cursor:pointer;border-top:1px solid var(--ap-line);display:flex;flex-direction:column;justify-content:center;overflow:hidden}
      .kb2-label b{font-size:var(--ap-fs-sm);font-weight:var(--ap-w-bold);color:var(--ap-ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .kb2-label small{font-size:var(--ap-fs-xs);color:var(--ap-ink-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .kb2-track{position:relative;height:44px;border-top:1px solid var(--ap-line);background-image:linear-gradient(to right,var(--ap-line) 1px,transparent 1px);background-size:${xr}px 100%}
      .kb2-bar{position:absolute;top:11px;height:22px;border-radius:6px;background:var(--cc);color:#fff;display:flex;align-items:center;padding:0 8px;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08);min-width:6px}
      .kb2-bar span{font-size:11px;font-weight:var(--ap-w-med);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .kb2-bar.planned{background:transparent;border:1.5px dashed var(--cc);color:var(--cc)}
      .kb2-harvest{position:absolute;top:13px;height:18px;border-radius:5px;background:repeating-linear-gradient(45deg,rgba(255,255,255,.55),rgba(255,255,255,.55) 3px,transparent 3px,transparent 6px);box-shadow:inset 0 0 0 1.5px #fff;pointer-events:none}
      .kb2-mk{position:absolute;top:27px;width:12px;height:12px;border-radius:50%;background:var(--mc);transform:translateX(-50%);border:1.5px solid var(--ap-surface);z-index:2}
      .kb2-mk:not(.done){background:var(--ap-surface);box-shadow:inset 0 0 0 2px var(--mc)}
      .kb2-today{position:absolute;top:0;bottom:0;width:0;border-left:2px dashed var(--ap-green);transform:translateX(-1px);pointer-events:none;z-index:1}
      .kb2-legend{display:flex;flex-wrap:wrap;gap:7px 16px;font-size:var(--ap-fs-xs);color:var(--ap-ink-2);margin-top:var(--ap-3);align-items:center}
      .kb2-legend .lg{display:inline-flex;align-items:center;gap:5px}
      .kb2-legend .d{width:11px;height:11px;border-radius:50%}
      .kb2-hint{margin-left:auto;color:var(--ap-ink-3)}
    </style>
    <div class="kb2-scroll">
      <div class="kb2-head"><div class="kb2-corner">Fläche</div><div class="kb2-axis">${I}</div></div>
      ${ke("Gewächshäuser",x)}
      ${ke("Freiland",E)}
    </div>
    <div class="kb2-legend">
      <span class="lg"><span class="d" style="background:var(--ap-ink-2)"></span>erledigt</span>
      <span class="lg"><span class="d" style="background:var(--ap-surface);box-shadow:inset 0 0 0 2px var(--ap-ink-2)"></span>geplant</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:var(--ap-green-bright);display:inline-block"></span>Kultur</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:repeating-linear-gradient(45deg,var(--ap-line-2),var(--ap-line-2) 2px,transparent 2px,transparent 4px);display:inline-block"></span>Ernte-Zeitraum</span>
      <span class="kb2-hint"><i class="bi bi-mouse2"></i> Klick = öffnen · Rechtsklick = planen</span>
    </div>`,e.querySelectorAll(".kb2-row").forEach(F=>{const J=F.dataset.ukey;F.querySelector(".kb2-label")?.addEventListener("click",()=>s&&s(J)),F.addEventListener("contextmenu",T=>{T.preventDefault(),o&&o(J,T.clientX,T.clientY)})})}const au=[{art:"bewaesserung",label:"Gießen",icon:"bi-droplet"},{art:"mechanisch",label:"Hacken",icon:"bi-tools"},{art:"duengung",label:"Düngen",icon:"bi-flower1"},{art:"nuetzlinge",label:"Nützlinge",icon:"bi-bug"},{art:"chemisch_psm",label:"Pflanzenschutz",icon:"bi-droplet-half"},{art:"monitoring",label:"Kontrolle",icon:"bi-eye"},{art:"sonstiges",label:"Sonstiges",icon:"bi-three-dots"}],nu=["Jan.","Feb.","März","Apr.","Mai","Juni","Juli","Aug.","Sep.","Okt.","Nov.","Dez."];function ru(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=iu();let a=[],n=[],r=[],s=[],o=[],l=null,d="plan",f=!1,u=!1;const g={};let v=null;const w=y=>e.querySelector(y),h=()=>w('[data-role="list"]'),S=()=>w('[data-role="detail"]'),x=()=>w('[data-role="kpis"]'),E=()=>w('[data-role="board-view"]'),I=()=>w('[data-role="flaechen-view"]'),V=()=>ce()==="sqlite",R=()=>{V()&&et().catch(()=>{})},ke=(y,L)=>y.filter(_=>_.flaecheTyp===L.typ&&String(_.flaecheId)===String(L.id)),F=y=>a.find(L=>Na(L)===y)||null,J=(y,L=0)=>lo(y.color)||Wt[L%Wt.length];async function T(){if(a=await fs(t),V()){try{n=(await Er())?.rows||[]}catch{n=[]}try{r=(await Pn())?.rows||[]}catch{r=[]}try{s=(await Ur())?.rows||[]}catch{s=[]}try{o=(await al())?.rows||[]}catch{o=[]}if(!u){u=!0;try{const y=await xi();y?.imported&&(r=(await Pn())?.rows||[],B.info(`${y.imported} Pflanzenschutz-Eintrag(e) übernommen.`),R())}catch{}}}!l&&a.length&&(l=Na(a[0])),Y(),P()}async function $(){if(V()){try{n=(await Er())?.rows||[]}catch{}try{r=(await Pn())?.rows||[]}catch{}}}async function P(){const y=l?F(l):null;if(!y||y.lat==null||y.lon==null)return;const L=Na(y);if(!g[L]){g[L]={loading:!0,weeks:[]};try{g[L]=await eu(y.lat,y.lon)}catch{g[L]={weeks:[]}}l===L&&He()}}function Y(){te(),d==="plan"?(I().style.display="none",E().style.display="block",tu(E(),{units:a,anbau:n,mass:r,onSelect:y=>{l=y,ie("flaechen"),P()},onContext:(y,L,_)=>Xt(y,L,_)})):(E().style.display="none",I().style.display="grid",dt(),He()),e.querySelectorAll(".km-modebtn").forEach(y=>y.classList.toggle("active",y.dataset.mode===d))}function ie(y){d=y,Y()}function te(){const y=x();if(!y)return;a.filter(z=>z.typ==="haus").length,a.filter(z=>z.typ==="acker").length;let L=0,_=null;a.forEach(z=>{const{current:M,next:N}=la(ke(n,z));M&&L++,N?.pflanzDatum&&(!_||xe(N.pflanzDatum)<xe(_.pflanzDatum))&&(_=N)});const q=r.filter(z=>z.status==="geplant").length;y.innerHTML=`
      ${we(String(a.length),"Flächen")}
      ${we(String(L),"Kulturen aktiv")}
      ${we(String(q),"Aufgaben offen")}
      ${we(_?za(Ve(_.pflanzDatum)):"–","Nächste Pflanzung")}
      <button class="km-psm" data-role="psm-import" title="Bestehende Pflanzenschutz-Einträge übernehmen"><i class="bi bi-arrow-down-circle"></i><span>PSM übernehmen</span></button>`,y.querySelector('[data-role="psm-import"]')?.addEventListener("click",Me)}const we=(y,L)=>`<div class="km-kpi"><div class="km-kpi-v">${y}</div><div class="km-kpi-l">${b(L)}</div></div>`;function dt(){const y=h();if(!y)return;if(!a.length){y.innerHTML='<div class="km-empty"><i class="bi bi-geo-alt"></i><p>Noch keine Flächen.<br>Gewächshäuser unter Einstellungen, Freiland im Reiter „Karte".</p></div>';return}const L=a.filter(z=>z.typ==="haus"),_=a.filter(z=>z.typ==="acker"),q=(z,M)=>M.length?`<div class="km-grp">${b(z)}</div>`+M.map(Be).join(""):"";y.innerHTML=q("Gewächshäuser",L)+q("Freiland",_),y.querySelectorAll("[data-ukey]").forEach(z=>{z.addEventListener("click",()=>{l=z.dataset.ukey,dt(),He(),P()}),z.addEventListener("contextmenu",M=>{M.preventDefault(),Xt(z.dataset.ukey,M.clientX,M.clientY)})})}function Be(y,L){const _=Na(y),{current:q}=la(ke(n,y));return`<div class="km-row${_===l?" sel":""}" data-ukey="${_}">
      <span class="km-dot" style="background:${b(q?ga(q):J(y,L))}"></span>
      <div class="km-row-main"><div class="km-row-name">${b(y.name)}</div>
      <div class="km-row-sub">${q?`<span class="crop">${b(q.kultur||"Kultur")}</span>`:'<span class="free">frei</span>'}</div></div>
    </div>`}function He(){const y=S();if(!y)return;const L=l?F(l):null;if(!L){y.innerHTML='<div class="km-empty"><i class="bi bi-hand-index"></i><p>Fläche links wählen.</p></div>';return}const _=ke(n,L),q=ke(r,L),{current:z,next:M}=la(_),N=g[Na(L)],le=L.typ==="haus"?"Gewächshaus":"Freiland",fe=L.areaQm?`${Math.round(L.areaQm).toLocaleString("de-DE")} m²`:"";let de;if(z){const G=z.pflanzDatum?`seit ${Ot(z.pflanzDatum)} · ${za(Ve(z.pflanzDatum))}`:"",ae=Jt(z);de=`<div class="km-hero active" style="--cc:${b(ga(z))}">
        <div class="km-hero-ic"><i class="bi bi-flower2"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop">${b(z.kultur||"Kultur")}</div><div class="km-hero-sub">${b(G+ae+sn(z))}</div></div>
        <button class="km-hero-edit" data-edit-crop="current" title="Bearbeiten"><i class="bi bi-pencil"></i></button>
      </div>`}else de=`<div class="km-hero empty">
        <div class="km-hero-ic gray"><i class="bi bi-circle"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop gray">Fläche ist frei</div><div class="km-hero-sub">Noch keine Kultur eingetragen</div></div>
        <button class="km-hero-add" data-edit-crop="current"><i class="bi bi-plus-lg"></i> Kultur setzen</button>
      </div>`;const X=M?`<div class="km-next"><i class="bi bi-arrow-right-short"></i>Danach geplant: <b>${b(M.kultur||"Kultur")}</b> · ab ${za(Ve(M.pflanzDatum))} <button class="km-next-edit" data-edit-crop="next" title="Bearbeiten"><i class="bi bi-pencil"></i></button></div>`:z?'<button class="km-next-add" data-edit-crop="next"><i class="bi bi-plus"></i> Nächste Kultur planen</button>':"";y.innerHTML=`
      <div class="km-head"><div class="km-head-l"><span class="km-head-name">${b(L.name)}</span><span class="km-head-badge">${le}${fe?" · "+fe:""}</span></div>
        <button class="km-headbtn" data-act="map"><i class="bi bi-map"></i> Auf Karte</button></div>
      ${de}
      ${X}
      ${at(_,q)}
      <div class="km-tasks-head"><span>Aufgaben</span><button class="km-addtask" data-act="add-massnahme"><i class="bi bi-plus-lg"></i> Aufgabe</button></div>
      ${Ht(q)}
      <div class="km-foot">
        <span class="km-weather">${rn(N)}</span>
        <button class="km-plan" data-act="plan"><i class="bi bi-calendar3"></i> Saison &amp; Plan</button>
      </div>
      <div class="km-attr">${b(Gd)}${N?.stale?" · offline":""}</div>`,y.querySelector('[data-act="map"]')?.addEventListener("click",()=>on()),y.querySelector('[data-act="plan"]')?.addEventListener("click",()=>ie("plan")),y.querySelector('[data-act="add-massnahme"]')?.addEventListener("click",()=>ta(L,null,z)),y.querySelectorAll("[data-edit-crop]").forEach(G=>G.addEventListener("click",()=>{const ae=G.dataset.editCrop;ea(L,ae==="current"?z:M,ae,_.length)})),y.querySelectorAll("[data-m-done]").forEach(G=>G.addEventListener("click",ae=>{ae.stopPropagation(),Lt(G.dataset.mDone)})),y.querySelectorAll("[data-m-del]").forEach(G=>G.addEventListener("click",ae=>{ae.stopPropagation(),ln(G.dataset.mDel)})),y.querySelectorAll("[data-m-edit]").forEach(G=>G.addEventListener("click",()=>{const ae=r.find(me=>me.id===G.dataset.mEdit);ta(L,ae,z)}))}function Ht(y){const L=y.filter(N=>N.status==="geplant").sort((N,le)=>(xe(N.planDatum)||9e15)-(xe(le.planDatum)||9e15)),_=y.filter(N=>N.status==="erledigt").sort((N,le)=>(xe(le.erledigtDatum)||0)-(xe(N.erledigtDatum)||0)).slice(0,6),q=Number(it().replace(/-/g,"")),z=(N,le)=>{const fe=oo(N.art),de=le?N.erledigtDatum:N.planDatum,X=!le&&de&&xe(de)<q,G=le?Ot(de):or(de,X),ae=N.notes||fe.label,me=N.historyId?'<span class="km-pill">PSM</span>':"",ge=[];N.notes&&ge.push(b(fe.label)),N.mittel&&ge.push(b(N.mittel)),N.menge!=null&&ge.push(`${N.menge}${N.einheit?" "+b(N.einheit):""}`);const _e=ge.join(" · ");return`<div class="km-task${le?" done":""}" data-m-edit="${N.id}">
        <span class="km-task-ic" style="--mc:${fe.color}"><i class="bi ${fe.icon}"></i></span>
        <div class="km-task-main"><div class="km-task-title">${b(ae)}${me}</div>${_e?`<div class="km-task-sub">${_e}</div>`:""}</div>
        <span class="km-task-when${X?" overdue":""}">${G}</span>
        ${le?`<button class="km-tbtn del" data-m-del="${N.id}" title="Löschen"><i class="bi bi-trash"></i></button>`:`<button class="km-check" data-m-done="${N.id}" title="Erledigt"><i class="bi bi-check-lg"></i></button>`}
      </div>`};let M="";return L.length?M+=L.map(N=>z(N,!1)).join(""):M+='<div class="km-tasks-none"><i class="bi bi-check2-circle"></i> Nichts offen</div>',_.length&&(M+='<div class="km-done-h">Erledigt</div>'+_.map(N=>z(N,!0)).join("")),`<div class="km-tasks">${M}</div>`}function Ve(y){const L=new Date(String(y).slice(0,10)+"T00:00:00");return isNaN(L.getTime())?0:Rn(L).week}function Ot(y){const L=new Date(String(y).slice(0,10)+"T00:00:00");return isNaN(L.getTime())?"":`${L.getDate()}. ${nu[L.getMonth()]}`}function or(y,L){if(!y)return"offen";const _=new Date(String(y).slice(0,10)+"T00:00:00");if(isNaN(_.getTime()))return"offen";const q=new Date;q.setHours(0,0,0,0);const z=Math.round((_.getTime()-q.getTime())/864e5);return z===0?"heute":z===1?"morgen":L?"überfällig":Ot(y)}function rn(y){if(!y||!y.weeks?.length)return y?.loading?"Wetter lädt…":"";const{year:L,week:_}=Rn(new Date),q=y.weeks.find(N=>N.year===L&&N.week===_)||y.weeks.find(N=>!N.isForecast);if(!q)return"";const z=q.tMaxAvg!=null?Math.round(q.tMaxAvg)+"°":"–",M=q.precipSum!=null?Math.round(q.precipSum)+" mm":"–";return`<i class="bi bi-cloud-sun"></i> Diese Woche: ${z} · ${M} Regen`}function Jt(y){const L=y.ernteVon?za(Ve(y.ernteVon)):null,_=y.ernteBis||y.ernteDatum,q=_?za(Ve(_)):null;return L&&q?` · Ernte ${L}–${q}`:q?` · Ernte ~${q}`:L?` · Ernte ab ${L}`:""}function sn(y){return!y||y.menge==null||y.menge===""?"":` · ${y.menge} ${y.einheit||"Pflanzen"}`}function at(y,L){if(!y.length&&!L.length)return"";const _=new Date;let q=new Date(_.getFullYear(),_.getMonth()-1,1),z=new Date(_.getFullYear(),_.getMonth()+4,1);const M=O=>{if(!O)return;const ue=new Date(String(O).slice(0,10)+"T00:00:00");isNaN(ue.getTime())||(ue<q&&(q=new Date(ue.getFullYear(),ue.getMonth(),1)),ue>z&&(z=new Date(ue.getFullYear(),ue.getMonth(),1)))};y.forEach(O=>{M(O.pflanzDatum),M(O.ernteBis||O.ernteDatum),M(O.ernteVon)}),L.forEach(O=>M(O.planDatum||O.erledigtDatum));const N=uo(q,z),le=N.length,fe=`background-size:${(100/le).toFixed(4)}% 100%`,de=O=>O==null?null:(O*100).toFixed(2)+"%",X=Ke(N,_.toISOString()),G=X!=null?`<div class="ks-today" style="left:${de(X)}"></div>`:"",ae=N.map(O=>`<div class="ks-mo${O.y===_.getFullYear()&&O.m===_.getMonth()?" cur":""}">${co[O.m]}</div>`).join("");let me="";y.forEach((O,ue)=>{const De=Ke(N,O.pflanzDatum);let pe=Ke(N,O.ernteBis||O.ernteDatum||O.pflanzDatum);if(De==null)return;(pe==null||pe<=De)&&(pe=Math.min(1,De+.5/le));const $t=ga(O,ue);me+=`<div class="ks-bar${O.status==="geplant"?" planned":""}" style="left:${de(De)};width:${((pe-De)*100).toFixed(2)}%;--cc:${b($t)}"><span>${b(O.kultur||"")}</span></div>`;const W=Ke(N,O.ernteVon),re=Ke(N,O.ernteBis);W!=null&&re!=null&&re>W&&(me+=`<div class="ks-harvest" style="left:${de(W)};width:${((re-W)*100).toFixed(2)}%"></div>`)});const ge={};L.forEach(O=>{(ge[O.art]=ge[O.art]||[]).push(O)});const _e=Md.filter(O=>ge[O]).map(O=>{const ue=Yn[O],De=ge[O].map(pe=>{const $t=pe.status==="erledigt"?pe.erledigtDatum||pe.planDatum:pe.planDatum||pe.erledigtDatum,W=Ke(N,$t);return W==null?"":`<span class="ks-mk${pe.status==="erledigt"?" done":""}" title="${b(ue.label+(pe.notes?": "+pe.notes:""))}" style="left:${de(W)};--mc:${ue.color}"></span>`}).join("");return`<div class="ks-row"><div class="ks-rl">${b(ue.label)}</div><div class="ks-track" style="${fe}">${De}${G}</div></div>`}).join("");return`<div class="ks-wrap">
      <div class="ks-head"><div class="ks-rl"></div><div class="ks-axis">${ae}</div></div>
      <div class="ks-row"><div class="ks-rl">Kultur</div><div class="ks-track" style="${fe}">${me}${G}</div></div>
      ${_e}
      <div class="ks-legend"><span><span class="ks-d done"></span>erledigt</span><span><span class="ks-d"></span>geplant</span><span style="margin-left:auto"><span class="ks-hbar"></span>Ernte-Zeitraum</span></div>
    </div>`}function on(y){Ue("app",L=>({...L,activeSection:"acker"})),B.info("Karte geöffnet.")}async function Me(){if(!V()){B.warning("Keine Datenbank aktiv.");return}try{const y=await xi();await $(),Y(),y?.imported?(B.success(`${y.imported} übernommen.`),R()):B.info(`Nichts Neues${y?.skipped?` (${y.skipped} nicht zuordenbar)`:""}.`)}catch{B.error("Übernahme fehlgeschlagen.")}}async function Lt(y){const L=r.find(_=>_.id===y);if(L)try{await Ei({...L,status:"erledigt",erledigtDatum:L.erledigtDatum||it()}),await $(),Y(),R()}catch{B.error("Speichern fehlgeschlagen.")}}async function ln(y){try{await Si({id:y}),await $(),Y(),R()}catch{B.error("Löschen fehlgeschlagen.")}}let Ee=null;const Yt=()=>{Ee&&(Ee.remove(),Ee=null,document.removeEventListener("pointerdown",ka,!0))},ka=y=>{Ee&&!Ee.contains(y.target)&&Yt()};function wa(y,L,_,q){if(Yt(),Ee=document.createElement("div"),Ee.className="km-ctx",q){const M=document.createElement("div");M.className="km-ctx-t",M.textContent=q,Ee.appendChild(M)}_.forEach(M=>{if(M.sep){const le=document.createElement("div");le.className="km-ctx-sep",Ee.appendChild(le);return}const N=document.createElement("button");N.className="km-ctx-i",N.innerHTML=`<i class="bi ${M.icon}"></i><span>${b(M.label)}</span>`,N.addEventListener("click",()=>{Yt(),M.action?.()}),Ee.appendChild(N)}),document.body.appendChild(Ee);const z=Ee.getBoundingClientRect();Ee.style.left=Math.max(8,Math.min(y,window.innerWidth-z.width-8))+"px",Ee.style.top=Math.max(8,Math.min(L,window.innerHeight-z.height-8))+"px",setTimeout(()=>document.addEventListener("pointerdown",ka,!0),0)}function Xt(y,L,_){const q=F(y);if(!q)return;const z=ke(n,q),{current:M}=la(z);wa(L,_,[{icon:"bi-flower2",label:M?"Kultur bearbeiten":"Kultur setzen",action:()=>ea(q,M,"current",z.length)},{icon:"bi-plus-lg",label:"Nächste Kultur planen",action:()=>ea(q,null,"next",z.length)},{icon:"bi-list-check",label:"Aufgabe planen",action:()=>ta(q,null,M)},{sep:!0},{icon:"bi-arrow-right-circle",label:"Fläche öffnen",action:()=>{l=y,ie("flaechen"),P()}},{icon:"bi-map",label:"Auf Karte",action:()=>on()}],q.name)}function Oe(){v&&(v.remove(),v=null)}function xa(y,L,_,q){Oe();const z=document.createElement("div");return z.className="kmodal-ov",z.innerHTML=`<div class="kmodal" role="dialog" aria-modal="true">
      <div class="kmodal-h"><span>${b(y)}</span><button class="kmodal-x" aria-label="Schließen"><i class="bi bi-x-lg"></i></button></div>
      <div class="kmodal-b">${L}</div>
      <div class="kmodal-f"><button class="btn-cancel" data-k="cancel">Abbrechen</button><button class="btn-save" data-k="save">${b(_)}</button></div></div>`,e.appendChild(z),v=z,z.querySelector(".kmodal-x").addEventListener("click",Oe),z.querySelector('[data-k="cancel"]').addEventListener("click",Oe),z.addEventListener("mousedown",M=>{M.target===z&&Oe()}),z.querySelector('[data-k="save"]').addEventListener("click",()=>{q(z)!==!1&&Oe()}),z.querySelectorAll("[data-more]").forEach(M=>M.addEventListener("click",()=>{const N=z.querySelector("[data-more-box]");N&&(N.hidden=!1,M.style.display="none")})),setTimeout(()=>z.querySelector("input,select,textarea,.km-tile")?.focus?.(),30),z}function cn(){const y=new Set,L=[],_=z=>{const M=String(z||"").trim().toLowerCase();z&&!y.has(M)&&(y.add(M),L.push(z))};return o.forEach(z=>_(z.name)),s.forEach(z=>_(z.kultur)),`<datalist id="km-kultur-dl">${L.map(z=>`<option value="${b(z)}"></option>`).join("")}</datalist>`}function ea(y,L,_,q){const z=_==="next"&&!L,M=L||{},N=(M.kulturStammId?o.find(W=>W.id===M.kulturStammId):null)||Ln(o,M.kultur),le=M.pflanzDatum?.slice(0,10)||(z?"":it()),fe=Wt.map(W=>`<button type="button" class="km-sw${(M.color||"")===W?" on":""}" data-col="${W}" style="background:${W}"></button>`).join(""),de=Nd.map(W=>`<option value="${b(W)}"${(M.einheit||"Pflanzen")===W?" selected":""}>${b(W)}</option>`).join(""),X=`
      <label class="km-fld big">Was wächst hier?<input list="km-kultur-dl" data-f="kultur" value="${b(M.kultur||"")}" placeholder="z. B. Tomate – aus Bibliothek wählen" autocomplete="off" /></label>${cn()}
      <div class="km-stammhint" data-stammhint hidden></div>
      <div class="km-anchor" data-anchor-row>
        <span class="km-anchor-l">Termine berechnen ab</span>
        <div class="km-seg km-anchor-seg" data-anchorseg>
          <button type="button" class="km-segb" data-anchor="aussaat">Aussaat</button>
          <button type="button" class="km-segb on" data-anchor="pflanz">Pflanzung</button>
          <button type="button" class="km-segb" data-anchor="ernte">Ernte</button>
        </div>
      </div>
      <div class="km-frow2">
        <label class="km-fld">Aussaat<input type="date" data-f="aussaat" value="${(M.aussaatDatum||"").slice(0,10)}" /></label>
        <label class="km-fld">${z?"Geplante Pflanzung":"Pflanzung"}<input type="date" data-f="pflanz" value="${le}" /></label>
      </div>
      <div class="km-frow2">
        <label class="km-fld">Ernte von<input type="date" data-f="ernteVon" value="${(M.ernteVon||"").slice(0,10)}" /></label>
        <label class="km-fld">Ernte bis<input type="date" data-f="ernteBis" value="${(M.ernteBis||M.ernteDatum||"").slice(0,10)}" /></label>
      </div>
      <div class="km-hint2"><i class="bi bi-info-circle"></i> Termine kommen automatisch aus der Bibliothek – jederzeit frei überschreibbar.</div>
      <div class="km-frow2">
        <label class="km-fld">Menge<input type="number" step="1" min="0" data-f="menge" value="${M.menge!=null?M.menge:""}" placeholder="optional" /></label>
        <label class="km-fld">Einheit<select data-f="einheit">${de}</select></label>
      </div>
      ${L?"":`
      <div class="km-succ">
        <label class="km-check2"><input type="checkbox" data-f="succOn" /> <span><i class="bi bi-layers"></i> Folgesätze anlegen <small>(gestaffelt für laufende Ernte)</small></span></label>
        <div class="km-succ-box km-frow2" data-succ-box hidden>
          <label class="km-fld">Anzahl Sätze<input type="number" min="2" max="20" step="1" data-f="succN" value="4" /></label>
          <label class="km-fld">Abstand (Tage)<input type="number" min="1" step="1" data-f="succGap" value="14" /></label>
        </div>
      </div>`}
      <button type="button" class="km-more" data-more><i class="bi bi-sliders"></i> Mehr (Status, Farbe, Notiz)</button>
      <div class="km-more-box" data-more-box hidden>
        <label class="km-fld">Status<select data-f="status">${["aktiv","geplant","abgeschlossen"].map(W=>`<option value="${W}"${(M.status||(z?"geplant":"aktiv"))===W?" selected":""}>${Cd[W].label}</option>`).join("")}</select></label>
        <div class="km-fld">Farbe<div class="km-sws">${fe}</div></div>
        <label class="km-fld">Notiz<textarea data-f="notes" rows="2" placeholder="optional">${b(M.notes||"")}</textarea></label>
      </div>
      ${L?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Satz löschen</button>':""}`,G=xa(L?"Satz bearbeiten":z?"Nächsten Satz planen":"Satz eintragen",X,"Speichern",W=>{const re=zt=>W.querySelector(`[data-f="${zt}"]`)?.value?.trim()||"",be=re("kultur");if(!be)return B.warning("Bitte eine Kultur angeben."),!1;const ut=Ln(o,be),Sa=re("aussaat")||null,Le=re("pflanz")||null,dn=re("ernteVon")||null,un=re("ernteBis")||null,Ea=re("menge"),pn=Ea?Number(Ea):null,La=W.querySelector('[data-f="einheit"]')?.value||null,pt=!W.querySelector("[data-more-box]").hidden;let se=pt?re("status"):"";se||(se=z||Le&&xe(Le)>Number(it().replace(/-/g,""))?"geplant":"aktiv");const ft=W.querySelector(".km-sw.on")?.dataset.col||M.color||ut?.color||Wt[q%Wt.length],fn=s.find(zt=>zt.kultur===be)?.eppoCode||ut?.eppoCode||null,lr=pt?re("notes")||null:M.notes||null,Dt={flaecheTyp:y.typ,flaecheId:y.id,kultur:be,eppoCode:fn,color:ft,menge:pn,einheit:La,kulturStammId:ut?.id||M.kulturStammId||null,notes:lr},$a=!L&&W.querySelector('[data-f="succOn"]')?.checked,mn=Math.max(2,Math.min(20,Number(W.querySelector('[data-f="succN"]')?.value)||2)),gn=Math.max(1,Number(W.querySelector('[data-f="succGap"]')?.value)||14),bn=Number(it().replace(/-/g,""));(async()=>{try{if($a){const zt="sg-"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),aa={aussaatDatum:Sa,pflanzDatum:Le,ernteVon:dn,ernteBis:un};for(let na=0;na<mn;na++){const Da=Td(aa,na*gn),cr=Da.pflanzDatum&&xe(Da.pflanzDatum)>bn?"geplant":se;await Li({...Dt,...Da,ernteDatum:null,status:cr,satzGruppe:zt})}B.success(`${mn} Sätze angelegt.`)}else await Li({id:L?.id,...Dt,aussaatDatum:Sa,pflanzDatum:Le,ernteVon:dn,ernteBis:un,ernteDatum:null,status:se,satzGruppe:M.satzGruppe||null});await $(),Y(),R()}catch{B.error("Speichern fehlgeschlagen.")}})()});let ae="pflanz";const me=W=>G.querySelector(`[data-f="${W}"]`),ge=G.querySelector("[data-anchor-row]"),_e=G.querySelector("[data-stammhint]");let O=N;const ue=()=>{if(!O){_e.hidden=!0,ge.style.opacity="0.45";return}ge.style.opacity="1";const re=[Bd[O.anbauMethode==="anzucht"?"anzucht":"direkt"].short];O.kulturTage&&re.push(`${O.kulturTage} T. Kultur`),O.anbauMethode==="anzucht"&&O.anzuchtTage&&re.push(`${O.anzuchtTage} T. Anzucht`),O.familie&&re.push(O.familie),_e.innerHTML=`<i class="bi bi-stars"></i> <b>Bibliothek:</b> ${b(re.join(" · "))}`,_e.hidden=!1},De=()=>{if(!O)return;const re=me(ae==="ernte"?"ernteVon":ae).value||it(),be=Fd(O,ae,re);be.aussaatDatum!=null&&(me("aussaat").value=be.aussaatDatum||""),be.pflanzDatum!=null&&(me("pflanz").value=be.pflanzDatum||""),be.ernteVon!=null&&(me("ernteVon").value=be.ernteVon||""),be.ernteBis!=null&&(me("ernteBis").value=be.ernteBis||"")},pe=me("kultur");pe.addEventListener("input",()=>{O=Ln(o,pe.value),ue()}),pe.addEventListener("change",()=>{O=Ln(o,pe.value),ue(),O&&(me("pflanz").value||(me("pflanz").value=it()),De())}),G.querySelectorAll("[data-anchor]").forEach(W=>W.addEventListener("click",()=>{G.querySelectorAll("[data-anchorseg] .km-segb").forEach(re=>re.classList.remove("on")),W.classList.add("on"),ae=W.dataset.anchor,De()})),["aussaat","pflanz","ernteVon"].forEach(W=>me(W)?.addEventListener("change",()=>{W===(ae==="ernte"?"ernteVon":ae)&&De()})),ue();const $t=G.querySelector('[data-f="succOn"]');$t?.addEventListener("change",()=>{G.querySelector("[data-succ-box]").hidden=!$t.checked}),G.querySelectorAll(".km-sw").forEach(W=>W.addEventListener("click",()=>{G.querySelectorAll(".km-sw").forEach(re=>re.classList.remove("on")),W.classList.add("on")})),G.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(L?.id)try{await nl({id:L.id}),await $(),Y(),R(),Oe()}catch{B.error("Löschen fehlgeschlagen.")}})}function ta(y,L,_){const q=L||{art:"bewaesserung",status:"geplant"},z=au.map(X=>`<button type="button" class="km-tile${(q.art||"bewaesserung")===X.art?" on":""}" data-art="${X.art}" style="--ac:${Yn[X.art].color}"><i class="bi ${X.icon}"></i><span>${b(X.label)}</span></button>`).join(""),M=(q.status||"geplant")==="erledigt",N=(M?q.erledigtDatum:q.planDatum)||it(),le=`
      <div class="km-tasktiles">${z}</div>
      <div class="km-fld">Wann?<div class="km-when" data-when>
        <button type="button" class="km-chip" data-day="0">Heute</button>
        <button type="button" class="km-chip" data-day="1">Morgen</button>
        <button type="button" class="km-chip" data-day="x">Datum…</button>
        <input type="date" data-f="datum" value="${N.slice(0,10)}" />
      </div></div>
      <div class="km-seg" data-seg>
        <button type="button" class="km-segb${M?"":" on"}" data-status="geplant"><i class="bi bi-clock"></i> Geplant</button>
        <button type="button" class="km-segb${M?" on":""}" data-status="erledigt"><i class="bi bi-check-lg"></i> Erledigt</button>
      </div>
      <button type="button" class="km-more" data-more><i class="bi bi-sliders"></i> Notiz, Menge, Mittel</button>
      <div class="km-more-box" data-more-box hidden>
        <label class="km-fld">Bezeichnung<input data-f="notes" value="${b(q.notes||"")}" placeholder="z. B. Kompostgabe" /></label>
        <div class="km-frow2">
          <label class="km-fld">Menge<input type="number" step="0.1" data-f="menge" value="${q.menge!=null?q.menge:""}" placeholder="optional" /></label>
          <label class="km-fld">Einheit<input data-f="einheit" value="${b(q.einheit||"")}" placeholder="kg/ha, l" /></label>
        </div>
        <label class="km-fld">Mittel<input data-f="mittel" value="${b(q.mittel||"")}" placeholder="optional" /></label>
      </div>
      ${L?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Aufgabe löschen</button>':""}`,fe=xa(L?"Aufgabe bearbeiten":"Aufgabe hinzufügen",le,"Speichern",X=>{const G=X.querySelector(".km-tile.on")?.dataset.art||"bewaesserung",ae=X.querySelector(".km-segb.on")?.dataset.status||"geplant",me=X.querySelector('[data-f="datum"]').value||it(),ge=!X.querySelector("[data-more-box]").hidden,_e=ue=>{const De=X.querySelector(`[data-f="${ue}"]`)?.value;return De?Number(De):null},O=ue=>X.querySelector(`[data-f="${ue}"]`)?.value.trim()||null;(async()=>{try{await Ei({id:L?.id,flaecheTyp:y.typ,flaecheId:y.id,anbauId:L?.anbauId||_?.id||null,art:G,status:ae,planDatum:ae==="geplant"?me:L?.planDatum||null,erledigtDatum:ae==="erledigt"?me:null,menge:ge?_e("menge"):L?.menge??null,einheit:ge?O("einheit"):L?.einheit||null,mittel:ge?O("mittel"):L?.mittel||null,historyId:L?.historyId||null,notes:ge?O("notes"):L?.notes||null}),await $(),Y(),R()}catch{B.error("Speichern fehlgeschlagen.")}})()});fe.querySelectorAll(".km-tile").forEach(X=>X.addEventListener("click",()=>{fe.querySelectorAll(".km-tile").forEach(G=>G.classList.remove("on")),X.classList.add("on")})),fe.querySelectorAll(".km-segb").forEach(X=>X.addEventListener("click",()=>{fe.querySelectorAll(".km-segb").forEach(G=>G.classList.remove("on")),X.classList.add("on")}));const de=fe.querySelector('[data-f="datum"]');fe.querySelectorAll("[data-day]").forEach(X=>X.addEventListener("click",()=>{const G=X.dataset.day;if(G==="x"){de.style.display="inline-block",de.showPicker?.();return}const ae=new Date;ae.setDate(ae.getDate()+Number(G)),de.value=ae.toISOString().slice(0,10),de.style.display="none"})),fe.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(L?.id)try{await Si({id:L.id}),await $(),Y(),R(),Oe()}catch{B.error("Löschen fehlgeschlagen.")}})}e.querySelectorAll(".km-modebtn").forEach(y=>y.addEventListener("click",()=>ie(y.dataset.mode))),document.addEventListener("keydown",y=>{y.key==="Escape"&&(v&&Oe(),Yt())}),window.addEventListener("psm:openKultur",y=>{const L=y?.detail;!L?.typ||!L?.id||(l=L.typ+":"+L.id,ie("flaechen"),f&&(dt(),He(),P()))}),t.state.subscribe(y=>{y?.app?.activeSection==="kultur"&&(f?(async()=>(a=await fs(t),Y(),P()))():(f=!0,T()))}),te()}function iu(){return`
  <style>
    .kultur-wrap{display:flex;flex-direction:column;gap:var(--ap-4);min-height:calc(100vh - 120px);font-size:var(--ap-fs)}
    .kultur-top{display:flex;flex-wrap:wrap;gap:var(--ap-3);align-items:center;justify-content:space-between}
    .kultur-modes{display:inline-flex;background:var(--ap-surface-2);border:1px solid var(--ap-line);border-radius:var(--ap-r);padding:4px}
    .km-modebtn{border:0;background:transparent;color:var(--ap-ink-3);font-size:var(--ap-fs-sm);font-weight:var(--ap-w-bold);padding:10px 20px;border-radius:var(--ap-r-sm);cursor:pointer;display:inline-flex;align-items:center;gap:8px;min-height:var(--ap-control-sm);transition:background var(--ap-t),color var(--ap-t)}
    .km-modebtn:hover{color:var(--ap-ink)}
    .km-modebtn.active{background:var(--ap-surface);color:var(--ap-green-dark);box-shadow:var(--ap-shadow-sm)}
    .kultur-kpis{display:flex;flex-wrap:wrap;gap:var(--ap-2);align-items:center}
    .km-kpi{background:var(--ap-surface);border:1px solid var(--ap-line);border-radius:var(--ap-r);padding:10px 18px;text-align:center;min-width:104px}
    .km-kpi-v{font-size:var(--ap-fs-lg);font-weight:var(--ap-w-black);color:var(--ap-ink);line-height:1.1}
    .km-kpi-l{font-size:var(--ap-fs-xs);color:var(--ap-ink-3);margin-top:2px}
    .km-psm{display:inline-flex;align-items:center;gap:7px;border:1px solid var(--ap-line-2);background:var(--ap-surface);color:var(--ap-ink-2);border-radius:var(--ap-r);padding:11px 16px;font-size:var(--ap-fs-sm);font-weight:var(--ap-w-med);cursor:pointer;min-height:var(--ap-control-sm)}
    .km-psm:hover{background:var(--ap-surface-3);color:var(--ap-ink)}
    .kultur-body{display:grid;grid-template-columns:280px 1fr;gap:var(--ap-4);flex:1;min-height:0}
    .kultur-list{background:var(--ap-surface);border:1px solid var(--ap-line);border-radius:var(--ap-r-lg);padding:var(--ap-2);overflow-y:auto;max-height:calc(100vh - 200px);box-shadow:var(--ap-shadow-sm)}
    .km-grp{font-size:var(--ap-fs-xs);color:var(--ap-ink-3);text-transform:uppercase;letter-spacing:.05em;font-weight:var(--ap-w-bold);padding:var(--ap-3) var(--ap-2) 6px}
    .km-row{display:flex;align-items:center;gap:var(--ap-3);padding:var(--ap-3);border-radius:var(--ap-r);cursor:pointer;transition:background var(--ap-t)}
    .km-row:hover{background:var(--ap-surface-2)}
    .km-row.sel{background:var(--ap-green-soft);box-shadow:inset 4px 0 0 var(--ap-green)}
    .km-dot{width:12px;height:12px;border-radius:4px;flex:none}
    .km-row-main{min-width:0}
    .km-row-name{font-size:var(--ap-fs);font-weight:var(--ap-w-bold);color:var(--ap-ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .km-row-sub{font-size:var(--ap-fs-sm)}
    .km-row-sub .crop{color:var(--ap-green-dark);font-weight:var(--ap-w-med)}
    .km-row-sub .free{color:var(--ap-ink-3)}
    .kultur-detail{background:var(--ap-surface);border:1px solid var(--ap-line);border-radius:var(--ap-r-lg);padding:var(--ap-6);overflow-y:auto;max-height:calc(100vh - 200px);box-shadow:var(--ap-shadow-sm)}
    .km-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--ap-3);color:var(--ap-ink-3);text-align:center;padding:var(--ap-8) var(--ap-4);height:100%}
    .km-empty i{font-size:44px;opacity:.4;color:var(--ap-green)}.km-empty p{font-size:var(--ap-fs);line-height:1.6;margin:0}
    .km-head{display:flex;align-items:center;justify-content:space-between;gap:var(--ap-3);margin-bottom:var(--ap-5)}
    .km-head-name{font-size:var(--ap-fs-lg);font-weight:var(--ap-w-black);color:var(--ap-ink)}
    .km-head-badge{font-size:var(--ap-fs-xs);color:var(--ap-green-dark);background:var(--ap-green-soft);border-radius:var(--ap-r-pill);padding:4px 12px;margin-left:var(--ap-3);font-weight:var(--ap-w-med)}
    .km-headbtn{border:1px solid var(--ap-line-2);background:var(--ap-surface);color:var(--ap-ink-2);border-radius:var(--ap-r);padding:10px 16px;font-size:var(--ap-fs-sm);font-weight:var(--ap-w-med);cursor:pointer;display:inline-flex;align-items:center;gap:7px;white-space:nowrap;min-height:var(--ap-control-sm)}
    .km-headbtn:hover{background:var(--ap-surface-3);color:var(--ap-ink)}
    .km-hero{display:flex;align-items:center;gap:var(--ap-4);border-radius:var(--ap-r-lg);padding:var(--ap-5);margin-bottom:var(--ap-3)}
    .km-hero.active{background:var(--ap-green-tint);border:1px solid var(--ap-green-line)}
    .km-hero.empty{background:var(--ap-surface-2);border:1px dashed var(--ap-line-2)}
    .km-hero-ic{width:56px;height:56px;border-radius:50%;background:var(--cc,#16a34a);display:flex;align-items:center;justify-content:center;color:#fff;font-size:26px;flex:none}
    .km-hero-ic.gray{background:var(--ap-line-2);color:var(--ap-surface)}
    .km-hero-body{flex:1;min-width:0}
    .km-hero-crop{font-size:var(--ap-fs-xl);font-weight:var(--ap-w-black);color:var(--ap-ink);line-height:1.15}
    .km-hero-crop.gray{color:var(--ap-ink-3);font-size:var(--ap-fs-lg)}
    .km-hero-sub{font-size:var(--ap-fs-sm);color:var(--ap-ink-2);margin-top:3px}
    .km-hero-edit{border:0;background:transparent;color:var(--ap-ink-3);cursor:pointer;font-size:18px;padding:8px;align-self:flex-start;border-radius:var(--ap-r-sm)}
    .km-hero-edit:hover{color:var(--ap-ink);background:var(--ap-surface-3)}
    .km-hero-add{border:0;background:var(--ap-green);color:var(--ap-on-green);border-radius:var(--ap-r);padding:13px 22px;font-size:var(--ap-fs-sm);font-weight:var(--ap-w-bold);cursor:pointer;display:inline-flex;align-items:center;gap:8px;white-space:nowrap;min-height:var(--ap-control)}
    .km-hero-add:hover{background:var(--ap-green-dark)}
    .km-next{font-size:var(--ap-fs-sm);color:var(--ap-ink-2);display:flex;align-items:center;gap:4px;padding:6px 6px var(--ap-4)}
    .km-next b{color:var(--ap-ink);font-weight:var(--ap-w-bold)}
    .km-next-edit{border:0;background:transparent;color:var(--ap-ink-3);cursor:pointer;font-size:14px;padding:4px 6px;margin-left:4px;border-radius:var(--ap-r-sm)}
    .km-next-edit:hover{color:var(--ap-ink);background:var(--ap-surface-3)}
    .km-next-add{border:1px dashed var(--ap-line-2);background:transparent;color:var(--ap-ink-2);border-radius:var(--ap-r);padding:11px 16px;font-size:var(--ap-fs-sm);font-weight:var(--ap-w-med);cursor:pointer;display:inline-flex;align-items:center;gap:7px;margin:2px 0 var(--ap-4);min-height:var(--ap-control-sm)}
    .km-next-add:hover{border-color:var(--ap-green);color:var(--ap-green-dark);background:var(--ap-green-tint)}
    .km-tasks-head{display:flex;align-items:center;justify-content:space-between;margin:var(--ap-2) 0 var(--ap-3)}
    .km-tasks-head>span{font-size:var(--ap-fs-md);font-weight:var(--ap-w-black);color:var(--ap-ink)}
    .km-addtask{border:0;background:var(--ap-green-soft);color:var(--ap-green-dark);border-radius:var(--ap-r);padding:11px 17px;font-size:var(--ap-fs-sm);font-weight:var(--ap-w-bold);cursor:pointer;display:inline-flex;align-items:center;gap:7px;min-height:var(--ap-control-sm)}
    .km-addtask:hover{background:var(--ap-green-line)}
    .km-tasks{display:flex;flex-direction:column;gap:var(--ap-2)}
    .km-task{display:flex;align-items:center;gap:var(--ap-3);padding:var(--ap-3);border:1px solid var(--ap-line);border-radius:var(--ap-r);cursor:pointer;transition:background var(--ap-t),border-color var(--ap-t)}
    .km-task:hover{background:var(--ap-surface-2);border-color:var(--ap-line-2)}
    .km-task.done{opacity:.62}
    .km-task-ic{width:42px;height:42px;border-radius:var(--ap-r-sm);background:color-mix(in srgb,var(--mc) 14%,transparent);color:var(--mc);display:flex;align-items:center;justify-content:center;font-size:19px;flex:none}
    .km-task-main{flex:1;min-width:0}
    .km-task-title{font-size:var(--ap-fs-sm);font-weight:var(--ap-w-bold);color:var(--ap-ink);display:flex;align-items:center;gap:7px}
    .km-task-sub{font-size:var(--ap-fs-xs);color:var(--ap-ink-3);margin-top:1px}
    .km-task-when{font-size:var(--ap-fs-sm);color:var(--ap-ink-2);white-space:nowrap;font-weight:var(--ap-w-med)}
    .km-task-when.overdue{color:var(--ap-danger);font-weight:var(--ap-w-bold)}
    .km-pill{font-size:10px;background:var(--ap-danger-soft);color:var(--ap-danger);border:1px solid var(--ap-danger-line);border-radius:5px;padding:1px 6px;font-weight:var(--ap-w-bold)}
    .km-check{border:2px solid var(--ap-line-2);background:var(--ap-surface);color:var(--ap-ink-3);width:38px;height:38px;border-radius:50%;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:18px;flex:none;transition:border-color var(--ap-t),color var(--ap-t),background var(--ap-t)}
    .km-check:hover{border-color:var(--ap-green);color:var(--ap-green);background:var(--ap-green-tint)}
    .km-tbtn{border:0;background:transparent;color:var(--ap-ink-3);cursor:pointer;width:36px;height:36px;border-radius:var(--ap-r-sm);font-size:15px}
    .km-tbtn:hover{color:var(--ap-danger);background:var(--ap-danger-soft)}
    .km-tasks-none{display:flex;align-items:center;gap:var(--ap-2);color:var(--ap-ink-3);font-size:var(--ap-fs-sm);padding:var(--ap-4) var(--ap-1)}
    .km-tasks-none i{color:var(--ap-green);font-size:18px}
    .km-done-h{font-size:var(--ap-fs-xs);color:var(--ap-ink-3);text-transform:uppercase;letter-spacing:.04em;font-weight:var(--ap-w-bold);margin:var(--ap-4) 0 2px}
    .km-foot{display:flex;align-items:center;justify-content:space-between;gap:var(--ap-3);margin-top:var(--ap-5);padding-top:var(--ap-4);border-top:1px solid var(--ap-line)}
    .km-weather{font-size:var(--ap-fs-sm);color:var(--ap-ink-2);display:inline-flex;align-items:center;gap:7px}
    .km-weather i{color:var(--ap-info-bright);font-size:18px}
    .km-plan{border:1px solid var(--ap-line-2);background:var(--ap-surface);color:var(--ap-ink-2);border-radius:var(--ap-r);padding:10px 16px;font-size:var(--ap-fs-sm);font-weight:var(--ap-w-med);cursor:pointer;display:inline-flex;align-items:center;gap:7px;min-height:var(--ap-control-sm)}
    .km-plan:hover{background:var(--ap-surface-3);color:var(--ap-ink)}
    .km-attr{font-size:var(--ap-fs-xs);color:var(--ap-ink-3);margin-top:var(--ap-2)}
    .kultur-board{background:var(--ap-surface);border:1px solid var(--ap-line);border-radius:var(--ap-r-lg);padding:var(--ap-4);overflow:auto;max-height:calc(100vh - 190px);box-shadow:var(--ap-shadow-sm)}
    /* Modal */
    .kmodal-ov{position:fixed;inset:0;z-index:3000;background:var(--ap-overlay);display:flex;align-items:center;justify-content:center;padding:var(--ap-4)}
    .kmodal{background:var(--ap-surface);border-radius:var(--ap-r-xl);width:min(500px,96vw);max-height:92vh;display:flex;flex-direction:column;box-shadow:var(--ap-shadow-lg)}
    .kmodal-h{display:flex;align-items:center;justify-content:space-between;padding:var(--ap-5) var(--ap-5) var(--ap-3);font-size:var(--ap-fs-md);font-weight:var(--ap-w-black);color:var(--ap-ink)}
    .kmodal-x{border:0;background:transparent;color:var(--ap-ink-3);cursor:pointer;font-size:18px;padding:4px;border-radius:var(--ap-r-sm)}
    .kmodal-x:hover{color:var(--ap-ink);background:var(--ap-surface-3)}
    .kmodal-b{padding:var(--ap-1) var(--ap-5) var(--ap-4);overflow-y:auto;display:flex;flex-direction:column;gap:var(--ap-4)}
    .kmodal-f{display:flex;justify-content:flex-end;gap:var(--ap-2);padding:var(--ap-4) var(--ap-5);border-top:1px solid var(--ap-line)}
    .btn-cancel{border:1px solid var(--ap-line-2);background:var(--ap-surface);color:var(--ap-ink-2);border-radius:var(--ap-r);padding:12px 20px;font-size:var(--ap-fs-sm);font-weight:var(--ap-w-med);cursor:pointer;min-height:var(--ap-control)}
    .btn-cancel:hover{background:var(--ap-surface-3);color:var(--ap-ink)}
    .btn-save{border:0;background:var(--ap-green);color:var(--ap-on-green);border-radius:var(--ap-r);padding:12px 26px;font-size:var(--ap-fs-sm);font-weight:var(--ap-w-bold);cursor:pointer;min-height:var(--ap-control)}
    .btn-save:hover{background:var(--ap-green-dark)}
    .km-fld{display:flex;flex-direction:column;gap:7px;font-size:var(--ap-fs-xs);color:var(--ap-ink-2);font-weight:var(--ap-w-med)}
    .km-fld.big{font-size:var(--ap-fs-sm);color:var(--ap-ink)}
    .km-fld input,.km-fld select,.km-fld textarea{padding:13px 14px;border:1px solid var(--ap-line-2);border-radius:var(--ap-r-sm);font-size:var(--ap-fs);background:var(--ap-surface);color:var(--ap-ink);width:100%;min-height:var(--ap-control)}
    .km-fld.big input{font-size:var(--ap-fs-md);padding:14px 16px}
    .km-frow2{display:grid;grid-template-columns:1fr 1fr;gap:var(--ap-3)}
    .km-more{border:0;background:transparent;color:var(--ap-ink-2);font-size:var(--ap-fs-sm);font-weight:var(--ap-w-med);cursor:pointer;display:inline-flex;align-items:center;gap:7px;padding:4px 0;align-self:flex-start}
    .km-more:hover{color:var(--ap-ink)}
    .km-more-box{display:flex;flex-direction:column;gap:var(--ap-3);padding-top:var(--ap-1);border-top:1px dashed var(--ap-line)}
    .km-dangerlink{border:0;background:transparent;color:var(--ap-danger);font-size:var(--ap-fs-sm);font-weight:var(--ap-w-med);cursor:pointer;display:inline-flex;align-items:center;gap:6px;align-self:flex-start;padding:2px 0}
    .km-sws{display:flex;gap:8px;flex-wrap:wrap}
    .km-sw{width:34px;height:34px;border-radius:var(--ap-r-sm);border:2px solid rgba(0,0,0,.12);cursor:pointer;padding:0}
    .km-sw.on{box-shadow:0 0 0 2px var(--ap-ink)}
    .km-tasktiles{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--ap-2)}
    .km-tile{display:flex;flex-direction:column;align-items:center;gap:8px;padding:var(--ap-4) 4px;border:1.5px solid var(--ap-line);background:var(--ap-surface);border-radius:var(--ap-r);cursor:pointer;color:var(--ap-ink-2);font-size:var(--ap-fs-xs);font-weight:var(--ap-w-med)}
    .km-tile i{font-size:23px}
    .km-tile.on{border-color:var(--ac);color:var(--ac);background:color-mix(in srgb,var(--ac) 10%,transparent)}
    .km-when{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
    .km-chip{border:1px solid var(--ap-line-2);background:var(--ap-surface);color:var(--ap-ink-2);border-radius:var(--ap-r-sm);padding:10px 16px;font-size:var(--ap-fs-sm);font-weight:var(--ap-w-med);cursor:pointer;min-height:var(--ap-control-sm)}
    .km-chip:hover{border-color:var(--ap-green);color:var(--ap-green-dark);background:var(--ap-green-tint)}
    .km-when input[type=date]{width:auto;display:none}
    .km-seg{display:inline-flex;background:var(--ap-surface-2);border:1px solid var(--ap-line);border-radius:var(--ap-r);padding:4px;align-self:flex-start}
    .km-segb{border:0;background:transparent;color:var(--ap-ink-3);font-size:var(--ap-fs-sm);font-weight:var(--ap-w-bold);padding:10px 18px;border-radius:var(--ap-r-sm);cursor:pointer;display:inline-flex;align-items:center;gap:6px;min-height:var(--ap-control-sm)}
    .km-segb.on{background:var(--ap-surface);color:var(--ap-green-dark);box-shadow:var(--ap-shadow-sm)}
    .km-frow3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--ap-3)}
    .km-hint2{font-size:var(--ap-fs-xs);color:var(--ap-ink-3);display:flex;align-items:center;gap:6px;margin-top:-2px}
    .km-hint2 i{color:var(--ap-info-bright)}
    .km-stammhint{font-size:var(--ap-fs-xs);color:var(--ap-green-dark);background:var(--ap-green-tint);border:1px solid var(--ap-green-line);border-radius:var(--ap-r-sm);padding:10px 12px;display:flex;align-items:center;gap:7px;margin-top:-4px}
    .km-stammhint i{color:var(--ap-green-bright)}
    .km-stammhint b{font-weight:var(--ap-w-bold)}
    .km-anchor{display:flex;align-items:center;justify-content:space-between;gap:var(--ap-3);flex-wrap:wrap;transition:opacity .15s}
    .km-anchor-l{font-size:var(--ap-fs-xs);color:var(--ap-ink-2)}
    .km-anchor-seg{align-self:auto}
    .km-anchor-seg .km-segb{padding:8px 14px;font-size:var(--ap-fs-xs)}
    .km-succ{border:1px dashed var(--ap-line-2);border-radius:var(--ap-r);padding:12px;display:flex;flex-direction:column;gap:var(--ap-3)}
    .km-check2{display:flex;align-items:center;gap:10px;font-size:var(--ap-fs-sm);color:var(--ap-ink);cursor:pointer}
    .km-check2 input{width:19px;height:19px;accent-color:var(--ap-green);flex:none}
    .km-check2 small{color:var(--ap-ink-3);font-weight:400}
    /* Kontextmenü */
    .km-ctx{position:fixed;z-index:4000;min-width:220px;background:var(--ap-surface);border:1px solid var(--ap-line);border-radius:var(--ap-r-lg);box-shadow:var(--ap-shadow-lg);padding:var(--ap-2);font-size:var(--ap-fs-sm);color:var(--ap-ink)}
    .km-ctx-t{font-size:var(--ap-fs-xs);font-weight:var(--ap-w-bold);color:var(--ap-ink-3);text-transform:uppercase;letter-spacing:.04em;padding:7px 10px 9px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .km-ctx-sep{height:1px;background:var(--ap-line);margin:var(--ap-1) var(--ap-1)}
    .km-ctx-i{display:flex;align-items:center;gap:10px;width:100%;border:0;background:transparent;color:inherit;text-align:left;padding:11px 10px;border-radius:var(--ap-r-sm);cursor:pointer;font-size:var(--ap-fs-sm)}
    .km-ctx-i:hover{background:var(--ap-surface-3)}
    .km-ctx-i i{width:18px;text-align:center;color:var(--ap-ink-2);font-size:16px}
    /* Saison-Leiste (Detail) */
    .ks-wrap{border:1px solid var(--ap-line);border-radius:var(--ap-r);padding:var(--ap-3);margin:6px 0 var(--ap-4);background:var(--ap-surface-2)}
    .ks-head,.ks-row{display:flex;align-items:center;min-height:24px}
    .ks-rl{width:88px;min-width:88px;font-size:var(--ap-fs-xs);color:var(--ap-ink-2);padding-right:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:var(--ap-w-med)}
    .ks-axis{display:flex;flex:1}
    .ks-mo{flex:1;text-align:center;font-size:11px;color:var(--ap-ink-3);border-left:1px solid var(--ap-line)}
    .ks-mo.cur{color:var(--ap-green-dark);font-weight:var(--ap-w-bold)}
    .ks-track{position:relative;flex:1;height:24px;background-image:linear-gradient(to right,var(--ap-line) 1px,transparent 1px);background-repeat:repeat-x}
    .ks-bar{position:absolute;top:4px;height:16px;border-radius:5px;background:var(--cc);color:#fff;display:flex;align-items:center;padding:0 6px;overflow:hidden;min-width:6px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)}
    .ks-bar span{font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .ks-bar.planned{background:transparent;border:1.5px dashed var(--cc);color:var(--cc)}
    .ks-harvest{position:absolute;top:6px;height:12px;border-radius:3px;background:repeating-linear-gradient(45deg,rgba(255,255,255,.62),rgba(255,255,255,.62) 3px,transparent 3px,transparent 6px);box-shadow:inset 0 0 0 1.5px #fff;pointer-events:none}
    .ks-mk{position:absolute;top:7px;width:11px;height:11px;border-radius:50%;background:var(--mc);transform:translateX(-50%);border:1.5px solid var(--ap-surface)}
    .ks-mk:not(.done){background:var(--ap-surface);box-shadow:inset 0 0 0 2px var(--mc)}
    .ks-today{position:absolute;top:-2px;bottom:-2px;width:0;border-left:2px dashed var(--ap-green);transform:translateX(-1px);pointer-events:none}
    .ks-legend{display:flex;gap:var(--ap-3);font-size:var(--ap-fs-xs);color:var(--ap-ink-3);margin-top:var(--ap-2);padding-left:88px;align-items:center}
    .ks-legend>span{display:inline-flex;align-items:center;gap:5px}
    .ks-d{width:11px;height:11px;border-radius:50%;background:var(--ap-surface);box-shadow:inset 0 0 0 2px var(--ap-ink-3)}
    .ks-d.done{background:var(--ap-ink-3);box-shadow:none}
    .ks-hbar{width:18px;height:9px;border-radius:3px;background:repeating-linear-gradient(45deg,var(--ap-line-2),var(--ap-line-2) 2px,transparent 2px,transparent 4px);display:inline-block}
    @media(max-width:820px){.kultur-body{grid-template-columns:1fr}.kultur-list{max-height:200px}.km-frow2{grid-template-columns:1fr}.km-frow3{grid-template-columns:1fr}.km-tasktiles{grid-template-columns:repeat(3,1fr)}}
  </style>
  <section class="calc-section kultur-wrap">
    <div class="kultur-top">
      <div class="kultur-modes">
        <button class="km-modebtn active" data-mode="plan"><i class="bi bi-calendar3"></i>Überblick</button>
        <button class="km-modebtn" data-mode="flaechen"><i class="bi bi-grid-1x2"></i>Fläche</button>
      </div>
      <div class="kultur-kpis" data-role="kpis"></div>
    </div>
    <div class="kultur-body" data-role="flaechen-view">
      <aside class="kultur-list" data-role="list"></aside>
      <div class="kultur-detail" data-role="detail"></div>
    </div>
    <div class="kultur-board" data-role="board-view" style="display:none"></div>
  </section>`}const su=["pflanzenschutz.json","history.json","entries.json"];let ms=!1,K=null,St=!1;const Zt=25,Sr=new Intl.NumberFormat("de-DE");let Se=0,An=null,gs=null;const ou=Rs({id:"import",label:"Import-Vorschau",budget:{initialLoad:20,maxItems:50}});let jr=null;function lu(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
    <div class="card card-dark">
      <div class="card-header bg-info bg-opacity-25">
        <h5 class="mb-0"><i class="bi bi-cloud-upload me-2"></i>Backup importieren</h5>
      </div>
      <div class="card-body">
        <p class="text-muted small mb-3">
          ZIP- oder JSON-Backup hochladen und in die Datenbank übernehmen.
        </p>
        <div class="mb-3">
          <label class="form-label">Datei auswählen</label>
          <input type="file" class="form-control" accept=".zip,.json,application/zip,application/json" data-role="import-file" />
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-outline-secondary btn-sm" data-action="clear-import" disabled>Zurücksetzen</button>
        </div>
        <div class="alert alert-info small mt-3 d-none" data-role="import-hint"></div>
      </div>
    </div>

    <div class="card card-dark mt-4 d-none" data-role="import-summary-card">
      <div class="card-header d-flex flex-column flex-lg-row justify-content-between gap-3">
        <div>
          <strong>Datei:</strong> <span data-role="import-file-name">-</span>
        </div>
        <div class="small text-muted" data-role="import-summary-subline"></div>
      </div>
      <div class="card-body">
        <div class="row g-3" data-role="import-stats"></div>
        <div class="mt-3" data-role="import-warnings"></div>
        <div class="table-responsive mt-3">
          <table class="table table-dark table-sm mb-0">
            <thead>
              <tr>
                <th>Datum</th>
                <th>Kultur</th>
                <th>Anwender</th>
                <th>Standort</th>
                <th>Gespeichert</th>
              </tr>
            </thead>
            <tbody data-role="import-preview-table"></tbody>
          </table>
        </div>
        <div class="d-flex justify-content-end mt-3" data-role="import-pager"></div>
        <div class="d-flex flex-wrap gap-2 mt-3">
          <button class="btn btn-outline-info btn-sm" data-action="focus-import" disabled>Einträge anzeigen</button>
          <button class="btn btn-success" data-action="run-import" disabled>Import starten</button>
        </div>
        <p class="small text-muted mt-2" data-role="import-feedback"></p>
      </div>
    </div>

    <div class="card card-dark mt-4" data-role="import-log-card">
      <div class="card-header d-flex align-items-center justify-content-between">
        <h6 class="mb-0"><i class="bi bi-clock-history me-2"></i>Import-Historie</h6>
        <span class="small text-muted">Wann wurde was eingespielt</span>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-dark table-sm mb-0">
            <thead>
              <tr>
                <th>Zeitpunkt</th>
                <th>Quelle / Gerät</th>
                <th class="text-end">Neu</th>
                <th class="text-end">Übersprungen</th>
                <th>Zeitraum</th>
              </tr>
            </thead>
            <tbody data-role="import-log-list">
              <tr><td colspan="5" class="text-muted small">Noch keine Importe protokolliert.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,e}function cu(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function du(e,t){const a=e.querySelector('[data-role="import-log-list"]');if(a){if(!t.length){a.innerHTML='<tr><td colspan="5" class="text-muted small">Noch keine Importe protokolliert.</td></tr>';return}a.innerHTML=t.map(n=>{const r=n.rangeStart||n.rangeEnd?`${Ga(n.rangeStart)||n.rangeStart||"?"} – ${Ga(n.rangeEnd)||n.rangeEnd||"?"}`:"-",s=[n.source,n.device].filter(Boolean),o=s.length?b(s.join(" · ")):"-";return`
        <tr>
          <td>${b(cu(n.importedAt))}</td>
          <td>${o}</td>
          <td class="text-end text-success">${n.added}</td>
          <td class="text-end text-muted">${n.skipped}</td>
          <td class="small text-muted">${b(r)}</td>
        </tr>`}).join("")}}async function Hn(e){if(ce()==="sqlite")try{const t=await rl(50);du(e,t.items||[])}catch(t){console.warn("Import-Historie konnte nicht geladen werden",t)}}function Et(e,t,a="info"){const n=e.querySelector('[data-role="import-hint"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a} small mt-3`,n.textContent=t}}function jt(e,t){const a=e.querySelector('[data-role="import-feedback"]');a&&(a.textContent=t)}function Ft(e){const t=e.querySelector('[data-action="clear-import"]'),a=e.querySelector('[data-action="focus-import"]'),n=e.querySelector('[data-action="run-import"]'),r=!!K;if(t&&(t.disabled=!r||St),a&&(a.disabled=!r||St),n){const s=!!(K?.importableEntries?.length&&K.stats||K?.fotos?.length);n.disabled=!r||!s||St}}function uu(e){K=null,ku(e);const t=e.querySelector('[data-role="import-summary-card"]'),a=e.querySelector('[data-role="import-file"]');t&&t.classList.add("d-none"),a&&(a.value=""),jt(e,""),Et(e,"Bereit für eine neue Importdatei."),Ft(e),ca()}function fo(e){if(e.dateIso)return e.dateIso;if(e.datum){const t=new Date(e.datum);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.date){const t=new Date(e.date);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.savedAt){const t=new Date(e.savedAt);if(!Number.isNaN(t.getTime()))return t.toISOString()}return null}function Xn(e){return e?Ga(e)||e.slice(0,10):"-"}function mo(e){return e.savedAt||(e.savedAt=e.createdAt||e.dateIso||new Date().toISOString()),e}function bs(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function pu(e){if(!e||typeof e!="object")return null;const t={...e};if(!Array.isArray(t.items)){const a=e.items;t.items=Array.isArray(a)?[...a]:[]}return mo(t),t}function go(e,t){const a=e.map(n=>fo(n)).filter(n=>!!n).sort();return{startIso:a[0]||t?.filters?.startDate||null,endIso:a[a.length-1]||t?.filters?.endDate||null}}function fu(e){if(!e)return;const t=bs(e.startIso,"start"),a=bs(e.endIso,"end");if(!t&&!a)return;const n={};return t&&(n.startDate=t),a&&(n.endDate=a),n}async function bo(e,t){if(ce()!=="sqlite"){const l=We(e.history);return new Set(l.map(d=>er(d)).filter(d=>!!d))}const n=fu(t);if(!n)return new Set;const r=new Set;let s=1;const o=500;try{for(;;){const l=await Cs({page:s,pageSize:o,filters:n,sortDirection:"asc"});if(l.items.forEach(d=>{const f=er(d);f&&r.add(f)}),s*o>=l.totalCount)break;s+=1}}catch(l){return console.warn("Konnte vorhandene Einträge für Duplikatprüfung nicht laden",l),new Set}return r}function er(e){const t=typeof e.clientUuid=="string"&&e.clientUuid?e.clientUuid:"";if(t)return`uuid:${t}`;const a=e.savedAt||e.dateIso||e.createdAt||e.datum||"",n=e.ersteller||"",r=e.kultur||"",s=e.invekos||e.standort||"";return[a,n,r,s].join("|")}function mu(e,t,a,n){const r=n||go(e,a),s=r.startIso,o=r.endIso,l=new Set,d=new Set;return t.forEach(f=>{f.ersteller&&l.add(f.ersteller),f.kultur&&d.add(f.kultur)}),{startDateLabel:Xn(s),endDateLabel:Xn(o),startDateRaw:s,endDateRaw:o,entryCount:e.length,importableCount:t.length,duplicateCount:e.length-t.length,creators:Array.from(l).slice(0,5),crops:Array.from(d).slice(0,5)}}function gu(e,t){const a=e.querySelector('[data-role="import-stats"]');if(!a)return;if(!t){a.innerHTML="";return}const n=t.stats,r=t.metadata?.filters;a.innerHTML=`
    <div class="col-12 col-md-4">
      <div class="border rounded p-3 h-100">
        <div class="text-muted small">Zeitraum</div>
        <div class="fw-bold">${b(n.startDateLabel)} – ${b(n.endDateLabel)}</div>
      </div>
    </div>
    <div class="col-12 col-md-4">
      <div class="border rounded p-3 h-100">
        <div class="text-muted small">Einträge</div>
        <div class="fw-bold">${n.importableCount} / ${n.entryCount}</div>
        <div class="text-muted small">${n.duplicateCount} Duplikat(e) übersprungen</div>
      </div>
    </div>
    <div class="col-12 col-md-4">
      <div class="border rounded p-3 h-100">
        <div class="text-muted small">Filter aus Backup</div>
        <div class="fw-bold">${b(r?.label||r?.scope||"—")}</div>
        <div class="text-muted small">${b(r?[r.creator,r.crop].filter(Boolean).join(" · ")||"Keine zusätzlichen Filter":"Keine Angaben")}</div>
      </div>
    </div>
  `}function bu(e,t){const a=e.querySelector('[data-role="import-warnings"]');if(!a)return;if(!t||!t.warnings.length){a.innerHTML="";return}const n=t.warnings.map(r=>`<li>${b(r)}</li>`).join("");a.innerHTML=`
    <div class="alert alert-warning">
      <strong>Hinweise:</strong>
      <ul class="mb-0">${n}</ul>
    </div>
  `}function ho(e){const t=e.entries.length;if(!t)return Se=0,{start:0,end:0,total:0};const a=Math.max(Math.ceil(t/Zt),1);Se>=a&&(Se=a-1),Se<0&&(Se=0);const n=Se*Zt,r=Math.min(n+Zt,t);return{start:n,end:r,total:t}}function hu(e){const t=e.querySelector('[data-role="import-pager"]');return t?((!An||gs!==t)&&(An?.destroy(),An=tn(t,{onPrev:()=>vu(e),onNext:()=>yu(e),labels:{prev:"Zurück",next:"Weiter",loading:"Vorschau wird geladen...",empty:"Keine Einträge verfügbar"}}),gs=t),An):null}function ja(e,t){const a=hu(e);if(!a)return;if(!t){Se=0,a.update({status:"hidden"});return}const n=t.entries.length;if(!n){Se=0,a.update({status:"disabled",info:"Keine Einträge vorhanden."});return}const{start:r,end:s}=ho(t),o=`Einträge ${Sr.format(r+1)}–${Sr.format(s)} von ${Sr.format(n)}`;a.update({status:"ready",info:o,canPrev:Se>0,canNext:s<n})}function vu(e){!K||Se===0||(Se=Math.max(Se-1,0),pi(e,K))}function yu(e){if(!K)return;const t=K.entries.length;if(!t)return;const a=Math.max(Math.ceil(t/Zt)-1,0);Se>=a||(Se=Math.min(Se+1,a),pi(e,K))}function ku(e){Se=0,e&&ja(e,K)}function pi(e,t){const a=e.querySelector('[data-role="import-preview-table"]');if(!a){ca();return}if(!t){a.innerHTML="",ja(e,null),ca();return}if(!t.entries.length){a.innerHTML='<tr><td colspan="5" class="text-center text-muted">Keine Einträge</td></tr>',ja(e,t),ca();return}const{start:r,end:s}=ho(t),l=t.entries.slice(r,s).map(d=>{const f=Xn(fo(d));return`
        <tr>
          <td>${b(f)}</td>
          <td>${b(d.kultur||"-")}</td>
          <td>${b(d.ersteller||"-")}</td>
          <td>${b(d.standort||d.invekos||"-")}</td>
          <td>${b(d.savedAt?Xn(d.savedAt):"-")}</td>
        </tr>
      `}).join("");a.innerHTML=l,ja(e,t),ca()}async function wu(e){const t=ol(e),a=Object.keys(t),n=a.find(f=>su.some(u=>f.toLowerCase().endsWith(u)));if(!n)throw new Error("ZIP enthält keine 'pflanzenschutz.json'.");const r=JSON.parse(Lr(t[n])),s=a.find(f=>f.toLowerCase().endsWith("metadata.json")),o=s?JSON.parse(Lr(t[s])):null,l=Array.isArray(r)?r:Array.isArray(r.entries)?r.entries:Array.isArray(r.history)?r.history:[],d=Array.isArray(r?.fotos)?r.fotos:[];for(const f of d){if(f?.data)continue;const u=f?.file?String(f.file):null,g=u?a.find(v=>v===u||v.toLowerCase().endsWith(u.toLowerCase())):null;g&&t[g]&&(f.data=xu(t[g]),f.mime||(f.mime="image/jpeg"))}return{entries:l,metadata:o,fotos:d}}function xu(e){let t="";for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode(...e.subarray(n,n+32768));return btoa(t)}async function Su(e){const t=Lr(e),a=JSON.parse(t);if(Array.isArray(a))return{entries:a,metadata:null,fotos:[]};const n=Array.isArray(a.fotos)?a.fotos:[];if(Array.isArray(a.entries))return{entries:a.entries,metadata:a.metadata||null,fotos:n};if(Array.isArray(a.history))return{entries:a.history,metadata:a.metadata||null,fotos:n};if(n.length)return{entries:[],metadata:a.metadata||null,fotos:n};throw new Error("JSON enthält keine Eintragsliste.")}async function Eu(e,t){const a=new Uint8Array(await e.arrayBuffer()),n=/\.zip$/i.test(e.name)||e.type==="application/zip",{entries:r,metadata:s,fotos:o}=n?await wu(a):await Su(a),l=Array.isArray(o)?o:[],d=(Array.isArray(r)?r:[]).map(x=>pu(x)).filter(x=>!!x);if(!d.length&&!l.length)throw new Error("Die Datei enthielt keine verwertbaren Einträge.");const f=go(d,s),u=await bo(t,f),g=new Set,v=[];let w=0;d.forEach(x=>{const E=er(x);if(!E){v.push(x);return}if(u.has(E)||g.has(E)){w+=1;return}g.add(E),v.push(x)});const h=mu(d,v,s,f),S=[];return w&&S.push(`${w} Datensätze wurden wegen gleicher Kennung übersprungen.`),(!h.startDateRaw||!h.endDateRaw)&&S.push("Zeitraum konnte nicht eindeutig ermittelt werden."),{filename:e.name,entries:d,importableEntries:v,metadata:s,stats:h,warnings:S,lastImportRefs:[],fotos:l}}function hs(){if(!K)return"Keine Datei";const e=[];return St&&e.push("Verarbeitung"),K.warnings.length&&e.push("Warnungen"),K.stats.importableCount<K.stats.entryCount&&e.push("Duplikate entfernt"),e.length?e.join(" · "):void 0}function Lu(){const e=!!K,t=e?Math.max(Math.ceil((K?.entries.length||0)/Zt),1):null,a=e?{items:K?.entries.length??0,totalCount:K?.stats.entryCount??null,cursor:K&&(K.entries.length||0)>Zt?`Seite ${Se+1}${t?` / ${t}`:""}`:null,payloadKb:js(K?.entries.slice(0,Zt)),lastUpdated:jr,note:hs()}:{items:0,totalCount:0,cursor:null,payloadKb:0,lastUpdated:jr,note:hs()};Ws(ou,a)}function ca(){jr=new Date().toISOString(),Lu()}function Gr(e){const t=e.querySelector('[data-role="import-summary-card"]');if(!t)return;if(!K){t.classList.add("d-none"),ja(e,null),Ft(e),ca();return}t.classList.remove("d-none"),Se=0;const a=t.querySelector('[data-role="import-file-name"]'),n=t.querySelector('[data-role="import-summary-subline"]');a&&(a.textContent=K.filename),n&&(n.textContent=`${K.stats.importableCount} von ${K.stats.entryCount} Einträgen importierbar`),gu(e,K),bu(e,K),pi(e,K),Ft(e)}async function $u(){const e=ce();if(!e||e==="memory"||e==="sqlite")return;const t=Je();await Ye(t)}function vs(e,t){if(!t.length)return[];const a=typeof e.state.updateSlice=="function"?e.state.updateSlice:Ue,n=[];return a("history",r=>{const s=Xa(r),o=s.items.slice(),l=o.length;return t.forEach((d,f)=>{n.push(l+f),o.push(d)}),{...s,items:o,totalCount:o.length,lastUpdatedAt:new Date().toISOString()}}),n}async function Du(e,t){if(!K){window.alert("Bitte zuerst eine Importdatei laden.");return}const a=K.fotos||[];if(!K.importableEntries.length&&!a.length){window.alert("Alle Einträge wurden bereits importiert oder als Duplikat erkannt.");return}St=!0,Ft(e),jt(e,"Import läuft ...");const n=t.state.getState(),r={startIso:K.stats.startDateRaw,endIso:K.stats.endDateRaw};let s=new Set;try{s=await bo(n,r)}catch(S){console.warn("Duplikatprüfung vor Import fehlgeschlagen",S)}const o=new Set(s),l=[];let d=0;if(K.importableEntries.forEach(S=>{const x=er(S);if(x&&o.has(x)){d+=1;return}x&&o.add(x),l.push(S)}),!l.length&&!a.length){jt(e,"Keine neuen Einträge gefunden."),Et(e,"Alle Datensätze sind bereits importiert worden.","warning"),St=!1,Ft(e);return}const f=ce(),u=[],g=[];let v=0,w=0;const h=l.map(S=>mo({...S}));try{if(f==="sqlite"){const I=[];for(const V of h)try{const R=await ws(V);if(R?.duplicate){d+=1;continue}R?.id!=null&&(u.push({source:"sqlite",ref:R.id}),I.push(V))}catch(R){console.error("appendHistoryEntry failed",R),g.push(V.savedAt||"Unbekannter Eintrag")}vs(t,I);for(const V of a)try{(await il(V))?.duplicate?w+=1:v+=1}catch(R){console.error("appendFoto failed",R)}v&&window.dispatchEvent(new CustomEvent("fotos:changed"));try{await et()}catch(V){console.warn("SQLite-Datei konnte nach dem Import nicht gespeichert werden",V)}}else vs(t,h).forEach(V=>{u.push({source:"state",ref:V})}),await $u();const S=u.length;if(S||v){f==="sqlite"&&S&&t.events?.emit?.("history:data-changed",{type:"created-bulk",count:S});const I=[];S&&I.push(`${S} Einträge`),v&&I.push(`${v} Foto(s)`),jt(e,`${I.join(" und ")} importiert.${g.length?` ${g.length} Einträge konnten nicht übernommen werden.`:""}`.trim()),K.lastImportRefs=u,K.importableEntries=[],K.stats={...K.stats,importableCount:0},Gr(e)}else jt(e,"Keine neuen Daten importiert.");const x=[];let E="success";if(g.length&&(x.push(`${g.length} Einträge konnten nicht gespeichert werden. Details siehe Konsole.`),E="warning"),d&&(x.push(`${d} Einträge wurden während des Imports als Duplikat übersprungen.`),E="warning"),w&&x.push(`${w} Foto(s) waren bereits vorhanden (übersprungen).`),x.length||x.push("Import abgeschlossen."),Et(e,x.join(" "),E),f==="sqlite"&&(S||d||v||w))try{const I=[];g.length&&I.push(`${g.length} fehlgeschlagen`),v&&I.push(`${v} Fotos`),w&&I.push(`${w} Fotos doppelt`),await sl({source:K.filename||null,device:K.metadata?.device||K.metadata?.label||null,added:S,skipped:d,rangeStart:K.stats.startDateRaw,rangeEnd:K.stats.endDateRaw,note:I.length?I.join(", "):null}),await et().catch(()=>{}),await Hn(e)}catch(I){console.warn("Import-Historie konnte nicht geschrieben werden",I)}}catch(S){console.error("Import fehlgeschlagen",S),jt(e,"Import fehlgeschlagen. Siehe Konsole für Details."),Et(e,"Import fehlgeschlagen. Bitte erneut versuchen.","danger")}finally{St=!1,Ft(e)}}function zu(e,t,a){if(!e.events?.emit)return;const n=t.metadata?.label||t.metadata?.filters?.label||`Import ${t.filename}`;e.events.emit("documentation:focus-range",{startDate:t.stats.startDateRaw||void 0,endDate:t.stats.endDateRaw||void 0,label:n,reason:"import",entryIds:a,autoSelectFirst:!!a.length})}function Au(e,t){if(!K){window.alert("Bitte zuerst eine Importdatei laden.");return}if(!K.stats.startDateRaw||!K.stats.endDateRaw){window.alert("Zeitraum konnte nicht bestimmt werden.");return}zu(t,K,K.lastImportRefs),Et(e,"Dokumentation wurde auf den Importzeitraum fokussiert.")}function Pu(e,t){const a=e.querySelector('[data-role="import-file"]');a&&a.addEventListener("change",()=>{const n=a.files?.[0];n&&(St=!0,Et(e,"Datei wird analysiert ..."),Ft(e),jt(e,""),Eu(n,t.state.getState()).then(r=>{K=r,Gr(e),Et(e,`${r.importableEntries.length} Einträge bereit zum Import.`)}).catch(r=>{console.error("Importdatei konnte nicht gelesen werden",r),Et(e,r?.message||"Importdatei konnte nicht gelesen werden.","danger"),K=null,Gr(e)}).finally(()=>{St=!1,Ft(e)}))}),e.addEventListener("click",n=>{const r=n.target?.closest("[data-action]");if(!r)return;const s=r.dataset.action;if(s){if(s==="clear-import"){uu(e);return}if(s==="focus-import"){Au(e,t);return}s==="run-import"&&Du(e,t)}})}function Mu(e,t){if(!e||ms)return;const a=e;a.innerHTML="";const n=lu();a.appendChild(n),Pu(n,t),Et(n,"Wähle eine Datei aus, um den Import zu starten."),Hn(n),lt("database:connected",()=>void Hn(n)),lt("app:sectionChanged",r=>{(r==="daten"||r==="documentation"||r==="import")&&Hn(n)}),ms=!0}const Rt=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function Cu(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function ia(e,t,a,n){return`
    <div class="dash-card"${n?` data-goto="${n}" style="cursor:pointer;"`:""}>
      <div class="dash-card-ic"><i class="bi ${e}"></i></div>
      <div class="dash-card-body"><div class="dash-card-value">${a}</div><div class="dash-card-label">${b(t)}</div></div>
    </div>`}function Iu(){return`
  <style>
    .dash-wrap{display:flex;flex-direction:column;gap:16px}
    .dash-greet h2{margin:0;font-weight:650;font-size:1.5rem}
    .dash-greet p{margin:3px 0 0;color:var(--color-text-muted,#94a3b8);font-size:.95rem}
    .dash-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(176px,1fr));gap:12px}
    .dash-card{background:var(--color-surface-1,#fff);border:1px solid var(--border-1,#d3dce4);border-radius:14px;padding:14px 16px;display:flex;align-items:center;gap:13px;transition:border-color .15s,box-shadow .15s}
    .dash-card[data-goto]{cursor:pointer}
    .dash-card[data-goto]:hover{border-color:var(--color-primary,#16a34a);box-shadow:0 2px 10px rgba(16,163,74,.08)}
    .dash-card-ic{width:40px;height:40px;border-radius:11px;background:rgba(22,163,74,.1);color:#16a34a;display:flex;align-items:center;justify-content:center;font-size:1.15rem;flex:none}
    .dash-card-body{min-width:0}
    .dash-card-value{font-size:1.55rem;font-weight:700;font-variant-numeric:tabular-nums;line-height:1.05}
    .dash-card-label{font-size:.82rem;color:var(--color-text-muted,#94a3b8)}
    .dash-cols{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    @media(max-width:820px){.dash-cols{grid-template-columns:1fr}}
    .dash-panel{background:var(--color-surface-1,rgba(255,255,255,.04));border:1px solid var(--border-1,rgba(255,255,255,.1));border-radius:12px;padding:14px 16px}
    .dash-panel h3{font-size:1rem;margin:0 0 10px;display:flex;align-items:center;gap:8px;font-weight:650}
    .dash-row{display:flex;justify-content:space-between;gap:10px;padding:6px 0;border-bottom:1px solid var(--border-1,rgba(255,255,255,.07));font-size:.9rem}
    .dash-row:last-child{border-bottom:0}
    .dash-empty{color:var(--color-text-muted,#94a3b8);font-size:.9rem;padding:8px 0}
    .dash-actions{display:flex;flex-wrap:wrap;gap:8px}
  </style>
  <section class="calc-section">
    <div class="dash-wrap">
      <div class="dash-greet">
        <h2><i class="bi bi-grid-1x2-fill me-2" style="color:var(--color-primary,#22c55e)"></i>Übersicht</h2>
        <p data-role="dash-sub">Willkommen – hier siehst du auf einen Blick, was los ist.</p>
      </div>

      <div class="dash-actions">
        <button class="btn btn-psm-primary" data-goto="calc"><i class="bi bi-pencil-square me-1"></i>Neu erfassen</button>
        <button class="btn btn-psm-secondary-outline" data-goto="kultur"><i class="bi bi-clipboard2-pulse me-1"></i>Kulturführung</button>
        <button class="btn btn-psm-secondary-outline" data-goto="lager"><i class="bi bi-box-seam me-1"></i>PSM-Lager</button>
        <button class="btn btn-psm-secondary-outline" data-goto="acker"><i class="bi bi-map me-1"></i>Acker-Planer</button>
        <button class="btn btn-psm-secondary-outline" data-goto="documentation"><i class="bi bi-list-ul me-1"></i>Übersicht</button>
      </div>

      <div class="dash-cards" data-role="dash-cards"></div>

      <div class="dash-cols">
        <div class="dash-panel">
          <h3><i class="bi bi-exclamation-triangle" style="color:#f59e0b"></i>Zu beachten</h3>
          <div data-role="dash-warn"></div>
        </div>
        <div class="dash-panel">
          <h3><i class="bi bi-clock-history"></i>Letzte Anwendungen</h3>
          <div data-role="dash-recent"></div>
        </div>
      </div>
    </div>
  </section>`}function Bu(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Iu();const a=e.querySelector('[data-role="dash-cards"]'),n=e.querySelector('[data-role="dash-warn"]'),r=e.querySelector('[data-role="dash-recent"]');e.addEventListener("click",o=>{const l=o.target?.closest("[data-goto]");if(!l)return;const d=l.getAttribute("data-goto");d&&t.state.updateSlice("app",f=>({...f,activeSection:d}))});const s=async()=>{if(ce()!=="sqlite"){a&&(a.innerHTML='<div class="dash-empty">Bitte zuerst eine Datenbank öffnen.</div>');return}const o=t.state.getState(),l=(We(o.gps?.points)||[]).length;let d=0,f=0,u=0,g=0,v=[],w=[],h=0;try{d=(await Ur())?.rows?.length||0}catch{}try{f=(await Ms())?.rows?.length||0}catch{}try{const S=(await Vr())?.rows||[];u=S.length,g=S.reduce((x,E)=>x+(E.plants||0),0)}catch{}try{v=(await Ps())?.rows||[]}catch{}try{const S=await Cs({}),x=S?.entries||S?.rows||[];h=S?.totalCount??x.length,w=x.slice(0,6)}catch{}if(a&&(a.innerHTML=[ia("bi-geo-alt","Standorte",Rt(l)),ia("bi-flower1","Kulturen",Rt(d)),ia("bi-droplet","Mittel im Sortiment",Rt(f),"lager"),ia("bi-journal-check","Anwendungen",Rt(h),"documentation"),ia("bi-map","Acker-Flächen",Rt(u),"acker"),ia("bi-flower3","Pflanzen (Acker)",Rt(g),"acker")].join("")),n){const S=[];v.forEach(E=>{E.bestand<=0&&(E.verbraucht>0||E.zugang>0)&&S.push(`<div class="dash-row"><span><i class="bi bi-box-seam me-1" style="color:#ef4444"></i>${b(E.name)}</span><span style="color:#ef4444">Bestand ${Rt(E.bestand)} ${b(E.einheit||"")}</span></div>`)}),v.forEach(E=>{if(!E.zulEnde)return;const I=Math.round((new Date(E.zulEnde).getTime()-Date.now())/864e5);I<0?S.push(`<div class="dash-row"><span><i class="bi bi-calendar-x me-1" style="color:#ef4444"></i>${b(E.name)}</span><span style="color:#ef4444">Zulassung abgelaufen</span></div>`):I<180&&S.push(`<div class="dash-row"><span><i class="bi bi-calendar-event me-1" style="color:#f59e0b"></i>${b(E.name)}</span><span style="color:#f59e0b">Zulassung endet in ${I} T</span></div>`)});const x=S.length>6?`<div class="dash-row" style="color:var(--color-text-muted)"><span>+ ${S.length-6} weitere</span></div>`:"";n.innerHTML=S.length?S.slice(0,6).join("")+x:'<div class="dash-empty">Alles im grünen Bereich. ✓</div>'}r&&(r.innerHTML=w.length?w.map(S=>{const x=Cu(S.datum||S.dateIso||S.created_at||S.createdAt||null),E=S.kultur||"",I=S.standort||"";return`<div class="dash-row"><span>${b(I)}${E?" · "+b(E):""}</span><span class="dash-empty" style="padding:0">${b(x)}</span></div>`}).join(""):'<div class="dash-empty">Noch keine Anwendungen erfasst.</div>')};t.state.subscribe(o=>{o?.app?.activeSection==="dashboard"&&s()}),s()}function ys(e){document.querySelectorAll(".content-section").forEach(a=>{a.style.display="none"});const t=document.getElementById(`section-${e}`);t instanceof HTMLElement&&(t.style.display="block")}function ks(){ll(),Ss();const e={state:{getState:j,updateSlice:Ue,subscribe:_n},events:{emit:(x,E)=>{Ut(async()=>{const{emit:I}=await import("./index.D1c2XijN.js").then(V=>V.aS);return{emit:I}},[]).then(({emit:I})=>{I(x,E)})},subscribe:lt}},t=document.querySelector('[data-region="startup"]'),a=document.querySelector('[data-region="shell"]'),n=document.querySelector('[data-region="main"]'),r=document.querySelector('[data-region="footer"]');Hl(t,e);const s=document.querySelector('[data-feature="calculation"]');cl(s,e);const o=document.querySelector('[data-feature="documentation"]');Nc(o,e);const l=document.querySelector('[data-feature="settings"]');Dd(l,e);const d=document.querySelector('[data-feature="lager"]');Pd(d,e);const f=document.querySelector('[data-feature="acker"]');Rd(f,e);const u=document.querySelector('[data-feature="kultur"]');ru(u,e);const g=document.querySelector('[data-feature="fotos"]');dl(g,e,{archiveMode:!0});const v=document.querySelector('[data-feature="import-page"]');Mu(v,{state:{getState:j,updateSlice:Ue},events:e.events});const w=document.querySelector('[data-feature="dashboard"]');Bu(w,e);const h=x=>{const E=document.body;E&&(E.classList.toggle("bg-app",x),E.classList.toggle("bg-startup",!x))},S=x=>{const E=!!x.app?.hasDatabase;if(h(E),t instanceof HTMLElement&&t.classList.toggle("d-none",E),a instanceof HTMLElement&&a.classList.toggle("d-none",!E),n instanceof HTMLElement&&n.classList.toggle("d-none",!E),r instanceof HTMLElement&&r.classList.toggle("d-none",!E),E){const I=x.app?.activeSection??"dashboard";ys(I)}};S(e.state.getState()),_n((x,E)=>{x.app?.hasDatabase!==E.app?.hasDatabase&&S(x),x.app?.activeSection!==E.app?.activeSection&&x.app?.hasDatabase&&ys(x.app.activeSection)}),lt("app:sectionChanged",()=>{})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ks,{once:!0}):ks();
