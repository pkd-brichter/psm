const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/index.BpLk6Kcg.js","_astro/index.DXWdWzHs.js","_astro/leaflet.C03ySvDx.css","_astro/leaflet-src.BcflbDBd.js","_astro/_commonjsHelpers.Cpj98o6Y.js","_astro/index.CPadEFgJ.js"])))=>i.map(i=>d[i]);
import{M as de,N as Ds,J as tt,O as Eo,P as Lo,Q as $s,h as At,l as Do,a as zs,s as ct,n as $o,q as As,p as xi,e as j,r as Tn,C as qn,u as Ve,_ as It,R as zo,S as Ao,w as g,t as B,m as Si,T as Po,j as bn,k as Ei,U as Mo,V as Co,W as je,X as Io,Y as Ps,Z as Ms,H as Cs,G as Hn,$ as Bo,a0 as No,a1 as Fo,a2 as To,a3 as qo,a4 as tn,z as Va,a5 as Ho,x as Oo,a6 as Ye,a7 as Xe,a8 as _o,a9 as an,aa as Ro,ab as Ko,D as Wo,ac as Is,ad as Bs,ae as Za,af as jo,ag as Go,ah as Uo,ai as Li,aj as mr,ak as gr,al as Vo,am as Zo,an as Qo,ao as Jo,ap as Yo,aq as Xo,ar as el,as as Ns,at as tl,au as Fs,av as al,aw as Qr,ax as $r,ay as $n,az as Jr,aA as nl,aB as rl,aC as On,aD as Di,aE as il,aF as $i,aG as Pa,aH as zi,aI as sl,aJ as Ai,aK as Pi,aL as ol,aM as ll,aN as cl,aO as dl,aP as zr,v as Ts,i as ul,b as pl,c as fl}from"./index.DXWdWzHs.js";const Ar="__psl_history_seeded",Pr=200,Mi=["Salat","Apfel","Wein","Tomate","Kartoffel","Hopfen","Raps","Birne"],Ci=["Spritzung","Düngung","Pflege","Behandlung"],Ii=["LACES","MALDO","VITVI","SOLTU","PRNUS","CUPAR","CYNCR","ALLCE"],Bi=["BBCH 10","BBCH 31","BBCH 41","BBCH 55","BBCH 65","BBCH 71","BBCH 81"],ml=[{mediumId:"seed-water",name:"Wasser",unit:"L",methodId:"perKiste",methodLabel:"pro Kiste",value:.02,zulassungsnummer:"N/A"},{mediumId:"seed-tonikum",name:"Tonikum X",unit:"ml",methodId:"perKiste",methodLabel:"pro Kiste",value:.85,zulassungsnummer:"Z-123456"},{mediumId:"seed-oel",name:"Pflegeöl Y",unit:"ml",methodId:"percentWater",methodLabel:"% vom Wasser",value:.12,zulassungsnummer:"Z-654321"}];function gl(e){if(typeof window>"u")return;const a=new URLSearchParams(window.location.search).has("seedHistory");if(!a)return;const n=window;n.__PSL||(n.__PSL={});const r=n.__PSL;r.seedHistoryEntries=(l=Pr)=>Ni(e,{count:l}),r.resetHistorySeedFlag=()=>localStorage.removeItem(Ar),!a&&!localStorage.getItem(Ar)&&de()==="sqlite"&&Ni(e,{count:Pr,setFlag:!0}).catch(l=>{console.error("History seeding failed",l)})}async function bl(e){if(!e.state.getState().app?.hasDatabase){if(typeof e.state.subscribe!="function")throw new Error("SQLite-Datenbank ist noch nicht initialisiert.");await new Promise((t,a)=>{const n=window.setTimeout(()=>{s(),a(new Error("SQLite-Datenbank wurde nicht rechtzeitig initialisiert."))},1e4),r=e.state.subscribe?.(l=>{l.app?.hasDatabase&&(s(),t())}),s=()=>{window.clearTimeout(n),typeof r=="function"&&r()}})}}async function Ni(e,t={}){const a=t.count??Pr;if(de()!=="sqlite")throw new Error("SQLite-Treiber muss aktiv sein, bevor Daten befüllt werden können.");await bl(e);const n=performance.now();let r=0;for(let s=0;s<a;s+=1){const l=hl(s);await Ds(l),r+=1}try{await tt()}catch(s){console.warn("Seed-Daten konnten nicht persistent gespeichert werden",s)}return e.events.emit("history:data-changed",{source:"dev-history-seed"}),t.setFlag&&localStorage.setItem(Ar,"1"),{inserted:r,durationMs:performance.now()-n}}function hl(e){const t=new Date;t.setDate(t.getDate()-e);const a=t.toLocaleDateString("de-DE"),n=t.toISOString(),r=20+e%30,s=Number((r*.5).toFixed(2));return{datum:a,dateIso:n,ersteller:`Seeder ${1+e%5}`,standort:`Test-Ort ${String.fromCharCode(65+e%6)}`,kultur:Mi[e%Mi.length],usageType:Ci[e%Ci.length],kisten:r,eppoCode:Ii[e%Ii.length],bbch:Bi[e%Bi.length],gps:`GPS-Notiz ${e}`,gpsCoordinates:{latitude:48+e%10*.01,longitude:11+e%10*.01},gpsPointId:`seed-gps-${e}`,invekos:`INV-${String(1e3+e).padStart(4,"0")}`,uhrzeit:`${String(6+e%12).padStart(2,"0")}:${String(e*7%60).padStart(2,"0")}`,savedAt:n,items:vl(e,r,s)}}function vl(e,t,a){return ml.map((n,r)=>{const s=1+(e+r)%4*.05,l=Number((n.value*s).toFixed(4)),o=Number((l*t).toFixed(2));return{id:`seed-item-${e}-${r}`,name:n.name,unit:n.unit,methodLabel:n.methodLabel,methodId:n.methodId,value:l,total:o,inputs:{kisten:t,waterVolume:a},zulassungsnummer:n.zulassungsnummer,mediumId:n.mediumId}})}let Vt=null,Ma=null,Fi=!1,Ti=!1;async function yl(){if(!("serviceWorker"in navigator))return console.warn("[PWA] Service Workers nicht unterstützt"),null;try{return Ma=await navigator.serviceWorker.register("/psm/sw.js",{scope:"/psm/",updateViaCache:"none"}),console.log("[PWA] Service Worker registriert:",Ma.scope),Ma.addEventListener("updatefound",()=>{const e=Ma?.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&(console.log("[PWA] Neues Update verfügbar"),ba("pwa:update-available"))})}),navigator.serviceWorker.addEventListener("message",kl),Fi||(Fi=!0,navigator.serviceWorker.addEventListener("controllerchange",()=>{Ti||(Ti=!0,window.location.reload())})),Ma}catch(e){return console.error("[PWA] Service Worker Registrierung fehlgeschlagen:",e),null}}function kl(e){const{type:t,payload:a}=e.data||{};switch(t){case"DB_STATE":ba("pwa:db-state",a);break;case"CACHES_CLEARED":ba("pwa:caches-cleared");break}}async function Yn(e){if(!navigator.serviceWorker.controller){localStorage.setItem("psm-db-state",JSON.stringify({...e,updatedAt:new Date().toISOString()}));return}navigator.serviceWorker.controller.postMessage({type:"SET_DB_STATE",payload:e})}async function qs(){const e=localStorage.getItem("psm-db-state");if(e)try{return JSON.parse(e)}catch{}return navigator.serviceWorker?.controller?new Promise(t=>{const a=n=>{n.data?.type==="DB_STATE"&&(navigator.serviceWorker.removeEventListener("message",a),t(n.data.payload))};navigator.serviceWorker.addEventListener("message",a),navigator.serviceWorker.controller.postMessage({type:"GET_DB_STATE"}),setTimeout(()=>{navigator.serviceWorker.removeEventListener("message",a),t(null)},1e3)}):null}async function wl(){const e=await qs();return!!(e?.hasDatabase&&e?.autoStartEnabled)}function xl(){window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),Vt=e,console.log("[PWA] Install Prompt verfügbar"),localStorage.getItem("psm-app-installed")==="true"&&(console.log("[PWA] Widerspruch erkannt: Flag sagt installiert, aber Prompt verfügbar"),localStorage.removeItem("psm-app-installed"),console.log("[PWA] Veraltetes Installations-Flag entfernt")),ba("pwa:install-available")}),window.addEventListener("appinstalled",()=>{Vt=null,er(),console.log("[PWA] App installiert - Flag gesetzt"),ba("pwa:installed")})}function Xn(){return Vt!==null}function Jt(){return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0}function Yr(){const e=navigator.userAgent.toLowerCase();return e.includes("edg/")?"edge":e.includes("chrome")&&!e.includes("edg")?"chrome":e.includes("firefox")?"firefox":e.includes("safari")&&!e.includes("chrome")?"safari":"other"}function Xr(){return!!(Jt()||localStorage.getItem("psm-app-installed")==="true"||window.matchMedia("(display-mode: fullscreen)").matches||window.matchMedia("(display-mode: minimal-ui)").matches||window.matchMedia("(display-mode: window-controls-overlay)").matches)}async function Hs(){if(Xr())return!0;try{if("getInstalledRelatedApps"in navigator){const e=await navigator.getInstalledRelatedApps();if(console.log("[PWA] getInstalledRelatedApps result:",e),e&&e.length>0)return er(),!0}}catch(e){console.warn("[PWA] getInstalledRelatedApps API Fehler:",e)}return!1}function er(){localStorage.setItem("psm-app-installed","true"),console.log("[PWA] App als installiert markiert")}function Sl(){localStorage.removeItem("psm-app-installed"),console.log("[PWA] Installations-Flag entfernt")}function Os(){const e=Yr(),t=Jt(),a=Xr();return{canInstall:Xn(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function _s(){const e=Yr(),t=Jt(),a=await Hs();return{canInstall:Xn(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function El(){if(!Vt)return console.warn("[PWA] Kein Install Prompt verfügbar"),!1;try{await Vt.prompt();const{outcome:e}=await Vt.userChoice;return console.log("[PWA] Install Prompt Ergebnis:",e),e==="accepted"&&er(),Vt=null,e==="accepted"}catch(e){return console.error("[PWA] Install Prompt fehlgeschlagen:",e),!1}}function Ll(e){if(!("launchQueue"in window)){console.log("[PWA] Launch Queue API nicht verfügbar");return}window.launchQueue?.setConsumer(async t=>{if(!t.files?.length){console.log("[PWA] Launch ohne Dateien");return}console.log("[PWA] Datei via Launch Queue empfangen:",t.files.length);for(const a of t.files)try{await e(a),await Yn({hasDatabase:!0,fileHandleName:a.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0});break}catch(n){console.error("[PWA] Fehler beim Öffnen der Datei:",n)}}),console.log("[PWA] File Handling initialisiert")}const Tt="psm-file-handles",ei="last-database";async function Mr(e){try{const t=await ti(),n=t.transaction(Tt,"readwrite").objectStore(Tt);await new Promise((r,s)=>{const l=n.put({key:ei,handle:e,savedAt:new Date().toISOString()});l.onsuccess=()=>r(),l.onerror=()=>s(l.error)}),t.close(),console.log("[PWA] FileHandle gespeichert"),await Yn({hasDatabase:!0,fileHandleName:e.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}catch(t){console.error("[PWA] FileHandle speichern fehlgeschlagen:",t)}}async function Cr(){try{const e=await ti(),a=e.transaction(Tt,"readonly").objectStore(Tt),n=await new Promise((s,l)=>{const o=a.get(ei);o.onsuccess=()=>s(o.result),o.onerror=()=>l(o.error)});if(e.close(),!n?.handle)return null;const r=n.handle;return typeof r.queryPermission=="function"&&await r.queryPermission({mode:"readwrite"})==="granted"?(console.log("[PWA] FileHandle mit Berechtigung geladen"),n.handle):(console.log("[PWA] FileHandle gefunden, aber Berechtigung erforderlich"),n.handle)}catch(e){return console.error("[PWA] FileHandle laden fehlgeschlagen:",e),null}}async function Dl(e){try{const t=e;return typeof t.requestPermission!="function"?(await e.getFile(),!0):await t.requestPermission({mode:"readwrite"})==="granted"}catch{return!1}}async function $l(){try{const e=await ti(),a=e.transaction(Tt,"readwrite").objectStore(Tt);await new Promise((n,r)=>{const s=a.delete(ei);s.onsuccess=()=>n(),s.onerror=()=>r(s.error)}),e.close(),await Yn({hasDatabase:!1,autoStartEnabled:!1}),console.log("[PWA] FileHandle gelöscht")}catch(e){console.error("[PWA] FileHandle löschen fehlgeschlagen:",e)}}async function ti(){return new Promise((e,t)=>{const a=indexedDB.open("psm-file-handles",1);a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result),a.onupgradeneeded=n=>{const r=n.target.result;r.objectStoreNames.contains(Tt)||r.createObjectStore(Tt,{keyPath:"key"})}})}function ba(e,t){window.dispatchEvent(new CustomEvent(e,{detail:t}))}function Rs(){return{serviceWorker:"serviceWorker"in navigator,fileSystemAccess:typeof window.showOpenFilePicker=="function",launchQueue:"launchQueue"in window,indexedDB:"indexedDB"in window,standalone:Jt(),installAvailable:Xn()}}async function zl(e){if(console.log("[PWA] Initialisierung..."),await yl(),xl(),e?.onFileOpened&&Ll(e.onFileOpened),e?.onAutoStart&&await wl()){const t=await Cr();if(t){const a=t;let n=!1;if(typeof a.queryPermission=="function"&&(n=await a.queryPermission({mode:"readwrite"})==="granted"),n){console.log("[PWA] Auto-Start mit gespeicherter Datei"),e.onFileOpened&&await e.onFileOpened(t);return}console.log("[PWA] Auto-Start: Berechtigung für Datei erforderlich"),ba("pwa:permission-required",{handle:t})}}console.log("[PWA] Capabilities:",Rs())}async function Al(){if(console.group("🔧 PWA Debug Status"),console.log("📱 Standalone Mode:",Jt()),console.log("💾 localStorage Flag:",localStorage.getItem("psm-app-installed")),console.log("🔔 Install Prompt verfügbar:",Xn()),console.log("🌐 Browser:",Yr()),console.group("📺 Display Mode Checks"),console.log("standalone:",window.matchMedia("(display-mode: standalone)").matches),console.log("fullscreen:",window.matchMedia("(display-mode: fullscreen)").matches),console.log("minimal-ui:",window.matchMedia("(display-mode: minimal-ui)").matches),console.log("window-controls-overlay:",window.matchMedia("(display-mode: window-controls-overlay)").matches),console.log("browser:",window.matchMedia("(display-mode: browser)").matches),console.groupEnd(),console.group("🔍 getInstalledRelatedApps API"),"getInstalledRelatedApps"in navigator)try{const e=await navigator.getInstalledRelatedApps();console.log("Installierte Apps:",e)}catch(e){console.log("API Fehler:",e)}else console.log("API nicht verfügbar");console.groupEnd(),console.group("📊 Status Vergleich"),console.log("Sync (isProbablyInstalled):",Xr()),console.log("Async (checkIfInstalled):",await Hs()),console.log("getInstallStatus():",Os()),console.log("getInstallStatusAsync():",await _s()),console.groupEnd(),console.log("💡 Tipp: clearInstalledFlag() zum Zurücksetzen des Flags"),console.groupEnd()}typeof window<"u"&&(window.pwaDebug=Al,window.pwaClearFlag=Sl);let hn=!1;function Pl(e){const t=r=>{if(hn){hn=!1;return}return r.preventDefault(),r.returnValue="",""};let a=!1;const n=r=>{const s=!!r.app?.hasDatabase;s&&!a?(window.addEventListener("beforeunload",t),a=!0):!s&&a&&(window.removeEventListener("beforeunload",t),a=!1)};n(e.getState()),e.subscribe(n),document.addEventListener("click",r=>{const s=r.target.closest("a");s&&s.target==="_blank"&&(hn=!0,setTimeout(()=>{hn=!1},100))})}function Ml(){const e=document.getElementById("app-root");if(!e)throw new Error("app-root Container fehlt");return{startup:e.querySelector('[data-region="startup"]'),shell:e.querySelector('[data-region="shell"]'),main:e.querySelector('[data-region="main"]'),footer:e.querySelector('[data-region="footer"]')}}async function Cl(){if(Eo()){window.location.replace("/psm/m/");return}Ml(),Lo();const e=$s();e!=="memory"&&At(e),await Do();const t={state:{getState:j,patchState:xi,updateSlice:Ve,subscribe:qn},events:{emit:Tn,subscribe:ct}};gl(t),zs(),Pl(t.state),zl({onFileOpened:async a=>{const n=await It(()=>import("./index.DXWdWzHs.js").then(s=>s.aR),[]),r=await It(()=>import("./index.DXWdWzHs.js").then(s=>s.aQ),[]);if(r.isSupported()){n.setActiveDriver("sqlite");const s=await a.getFile(),l=await s.arrayBuffer(),o=await r.importFromArrayBuffer(l,s.name);await Mr(a);const{applyDatabase:d}=await It(async()=>{const{applyDatabase:f}=await import("./index.DXWdWzHs.js").then(u=>u.aT);return{applyDatabase:f}},[]);d(o.data),Tn("database:connected",{driver:"sqlite",autoStarted:!0})}}}),ct("database:connected",async a=>{await Yn({hasDatabase:!0,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}),ct("database:connected",async a=>{if(de()==="sqlite")try{await $o(),await As()}catch(n){console.warn("GPS-Punkte konnten beim Start nicht geladen werden",n)}}),xi({app:{...j().app,ready:!0}})}const qi="__pflanzenschutz_bootstrapped__",Hi=window;function Oi(){Cl().catch(e=>{console.error("bootstrap failed",e)})}Hi[qi]||(Hi[qi]=!0,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Oi,{once:!0}):Oi());const Ks=[{id:"start",label:"Start",icon:"bi-grid-1x2",sections:[{section:"dashboard",label:"Übersicht",icon:"bi-grid-1x2"}]},{id:"psm",label:"PSM",icon:"bi-flower1",sections:[{section:"calc",label:"Neu erfassen",icon:"bi-pencil-square"},{section:"documentation",label:"Übersicht",icon:"bi-list-ul"},{section:"lager",label:"Lager",icon:"bi-box-seam"},{section:"settings",label:"Einstellungen",icon:"bi-gear"}]},{id:"acker",label:"Acker-Planer",icon:"bi-map",sections:[{section:"acker",label:"Karte",icon:"bi-map"},{section:"kultur",label:"Kulturführung",icon:"bi-clipboard2-pulse"}]},{id:"fotos",label:"Fotos",icon:"bi-camera",sections:[{section:"fotos",label:"Fotos",icon:"bi-camera"}]},{id:"daten",label:"Daten",icon:"bi-database",sections:[{section:"daten",label:"Import",icon:"bi-cloud-upload"}]}],Ws={dashboard:"start",calc:"psm",documentation:"psm",lager:"psm",history:"psm",report:"psm",acker:"acker",kultur:"acker",fotos:"fotos",settings:"psm",gps:"psm",lookup:"psm",import:"daten",daten:"daten"};function js(e){return Ks.find(t=>t.id===e)}function Il(e){const t=Ws[e];return t?js(t):void 0}function Bl(){const e=document.getElementById("offline-indicator");if(!e)return;const t=()=>{const a=!navigator.onLine;e.classList.toggle("d-none",!a)};t(),window.addEventListener("online",t),window.addEventListener("offline",t)}function _i(e){j().app.activeSection!==e&&(Ve("app",t=>({...t,activeSection:e})),Tn("app:sectionChanged",e))}function Ri(){Bl();const e=document.querySelectorAll(".nav-btn[data-area]"),t=document.getElementById("brand-link"),a=document.getElementById("topnav-tabs"),n=document.getElementById("topnav-area-icon"),r=document.getElementById("topnav-area-label"),s={};for(const h of Ks)s[h.id]=h.sections[0].section;let l=null;function o(h,S){if(a){if(h.sections.length<=1){a.innerHTML="";return}a.innerHTML=h.sections.map(x=>`
        <button type="button" class="topnav-tab${x.section===S?" active":""}" data-section="${x.section}">
          <i class="bi ${x.icon}"></i><span>${x.label}</span>
        </button>`).join("")}}function d(h){a&&a.querySelectorAll(".topnav-tab").forEach(S=>{S.classList.toggle("active",S.dataset.section===h)})}const f=h=>{const S=js(h);!S||!j().app.hasDatabase||_i(s[h]??S.sections[0].section)};e.forEach(h=>{h.addEventListener("click",()=>{const S=h.dataset.area;S&&f(S)})}),t?.addEventListener("click",h=>{h.preventDefault(),f("start")}),a?.addEventListener("click",h=>{const x=h.target?.closest(".topnav-tab")?.dataset.section;x&&_i(x)});const u=document.querySelector('.nav-btn[data-action="share-data"]');u?.addEventListener("click",()=>{u.disabled=!0,It(async()=>{const{shareMobileData:h}=await import("./index.BpLk6Kcg.js");return{shareMobileData:h}},__vite__mapDeps([0,1])).then(({shareMobileData:h})=>h()).catch(h=>console.error("Teilen fehlgeschlagen",h)).finally(()=>{u.disabled=!1})}),zo(),ct("history:data-changed",h=>{if(!document.body.classList.contains("mobile-mode"))return;const S=h?.type;(S==="created"||S==="created-bulk")&&Ao()});const m=h=>{const S=document.getElementById("brand-title"),x=document.getElementById("brand-tagline"),E=document.getElementById("app-version");S&&h.company.name&&(S.textContent=h.company.name),x&&h.company.headline&&(x.textContent=h.company.headline),E&&h.app.version&&(E.textContent=`v${h.app.version}`);const I=h.app.hasDatabase,U=h.app.activeSection,K=Il(U);K&&Ws[U]===K.id&&(s[K.id]=U),e.forEach(he=>{he.disabled=!I;const F=I&&K?.id===he.dataset.area;he.classList.toggle("active",!!F)}),K&&(n&&(n.className=`bi ${K.icon} topnav-area-icon`),r&&(r.textContent=K.label),l!==K.id?(o(K,U),l=K.id):d(U))};qn(m),m(j());let v=!1;const w=document.title||"Pflanzenschutz";window.addEventListener("beforeprint",()=>{v||(v=!0,document.title=" ")}),window.addEventListener("afterprint",()=>{v&&(v=!1,document.title=w)})}function Nl(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ri,{once:!0}):Ri()}Nl();const Fl="https://api.digitale-psm.de",Tl="digitale-psm.de";async function ql(e){try{const t=await fetch(`${Fl}/api/v1/${Tl}/views/${e}`,{method:"POST",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`API error: ${t.status}`);return(await t.json()).views}catch(t){return console.warn("[ViewCounter] Fehler beim Zählen:",t),null}}function Hl(e){return e>=1e6?(e/1e6).toFixed(1).replace(".",",")+"M":e>=1e3?(e/1e3).toFixed(1).replace(".",",")+"K":e.toString()}const Ir="pflanzenschutz-datenbank.json";let Ki=!1;function Ol(e){return e?`${e.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"pflanzenschutz-datenbank"}.json`:Ir}async function Ca(e,t){if(!e){await t();return}const a=e.textContent??"";e.disabled=!0,e.dataset.busy="true",e.textContent="Bitte warten...";try{await t()}finally{e.disabled=!1,e.dataset.busy="false",e.textContent=a}}function Wi(e){return g(e)}function _l(e){const t=document.createElement("section");t.className="section-container d-none",t.innerHTML=`
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
                <input class="form-control" id="wizard-company-name" name="wizard-company-name" required value="${Wi(e.name)}" placeholder="z.B. Gärtnerei Müller" />
              </div>
              <div class="col-md-6">
                <label class="form-label d-block mb-2" for="wizard-company-headline">
                  Überschrift <span class="text-muted small">(optional)</span>
                </label>
                <input class="form-control" id="wizard-company-headline" name="wizard-company-headline" value="${Wi(e.headline)}" placeholder="z.B. Pflanzenschutz-Dokumentation 2025" />
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-12">
                <label class="form-label d-block mb-2" for="wizard-company-address">
                  Adresse <span class="text-muted small">(optional)</span>
                </label>
                <textarea class="form-control" id="wizard-company-address" name="wizard-company-address" rows="2" placeholder="Straße, PLZ Ort">${g(e.address)}</textarea>
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
  `;const a=t.querySelector("#database-wizard-form");if(!a)throw new Error("Wizard-Formular konnte nicht erzeugt werden");const n=t.querySelector('[data-role="wizard-result"]');if(!n)throw new Error("Wizard-Resultat-Container fehlt");return{section:t,form:a,resultCard:n,preview:t.querySelector('[data-role="wizard-preview"]'),filenameLabel:t.querySelector('[data-role="wizard-filename"]'),saveHint:t.querySelector('[data-role="wizard-save-hint"]'),saveButton:t.querySelector('[data-action="wizard-save"]'),reset(){a.reset(),n.classList.add("d-none");const r=t.querySelector('[data-role="wizard-preview"]');r&&(r.textContent="");const s=t.querySelector('[data-role="wizard-filename"]');s&&(s.textContent="")}}}function Rl(e,t){if(!e||Ki)return;const a=e;let n=null,r=Ir,s="landing";const o=t.state.getState().company,d=document.createElement("section");d.className="section-container";function f(q,D){const A=q;d.innerHTML=`
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
            ${A?`<button class="btn btn-link p-0" style="color: var(--text-muted); text-decoration: none; font-size: 0.85rem;" data-action="start-wizard">
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
            ${A?`<!-- Szenario 2: Hat Datei → Fortsetzen im Fokus -->
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
  `}f(!1,Jt());const u=_l(o);a.innerHTML="",a.appendChild(d),a.appendChild(u.section);const m=typeof window<"u"&&typeof window.showSaveFilePicker=="function";u.saveButton&&(m?u.saveHint&&(u.saveHint.textContent='Der Browser fragt nach einem Speicherort. Die erzeugte Datei kannst du später über "Bestehende Datei verbinden" erneut laden.'):(u.saveButton.disabled=!0,u.saveButton.textContent="Datei speichern (nicht verfügbar)",u.saveHint&&(u.saveHint.textContent="Dieser Browser unterstützt keinen direkten Dateidialog. Bitte nutze einen Chromium-basierten Browser (z. B. Chrome, Edge) über HTTPS oder http://localhost.")));function v(q=t.state.getState()){const D=!!q.app?.hasDatabase;if(a.classList.toggle("d-none",D),D){d.classList.add("d-none"),u.section.classList.add("d-none");return}s==="wizard"?(d.classList.add("d-none"),u.section.classList.remove("d-none")):(d.classList.remove("d-none"),u.section.classList.add("d-none"))}async function w(q){await Ca(q,async()=>{try{const D=de();D==="sqlite"||D==="filesystem"?At(D):At("filesystem")}catch(D){throw B.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),D instanceof Error?D:new Error("Dateisystem nicht verfügbar")}try{const D=await Po();bn(D.data);const A=D.context;A?.fileHandle&&await Mr(A.fileHandle),t.events.emit("database:connected",{driver:de()})}catch(D){console.error("Fehler beim Öffnen der Datenbank",D),B.error(D instanceof Error?D.message:"Öffnen der Datenbank fehlgeschlagen")}})}function h(q){Ca(q,async()=>{const D=Si(),A=["localstorage","sqlite","memory"];for(const ie of A)try{At(ie);const te=await Ei(D);bn(te.data),t.events.emit("database:connected",{driver:de()||ie});return}catch(te){console.warn(`Treiber ${ie} konnte nicht initialisiert werden`,te)}const ee="Keine geeignete Speicheroption verfügbar. Bitte Browserberechtigungen prüfen.";console.error(ee),B.error(ee)})}async function S(q){if(!n){B.warning("Bitte erst die Datenbank erzeugen.");return}await Ca(q,async()=>{try{const D=de();D==="sqlite"||D==="filesystem"?At(D):At("filesystem")}catch(D){throw B.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),D instanceof Error?D:new Error("Dateisystem nicht verfügbar")}try{const D=await Ei(n);bn(D.data),t.events.emit("database:connected",{driver:de()})}catch(D){console.error("Fehler beim Speichern der Datenbank",D),B.error(D instanceof Error?D.message:"Die Datei konnte nicht gespeichert werden")}})}function x(q){q.preventDefault();const D=new FormData(u.form),A=(D.get("wizard-company-name")||"").toString().trim();if(!A){B.warning("Bitte einen Firmennamen angeben.");return}const ee=(D.get("wizard-company-headline")||"").toString().trim(),ie=(D.get("wizard-company-address")||"").toString().trim();n=Si({meta:{company:{name:A,headline:ee,logoUrl:"",contactEmail:"",address:ie}}}),r=Ol(A),u.preview.textContent=JSON.stringify(n,null,2),u.filenameLabel.textContent=r,u.resultCard.classList.remove("d-none"),u.resultCard.scrollIntoView({behavior:"smooth",block:"start"})}function E(){s="landing",n=null,r=Ir,u.reset(),v()}function I(){s="wizard",v()}async function U(q){await Ca(q,async()=>{try{const D=await Cr();if(!D){B.warning("Keine gespeicherte Datei gefunden.");return}if(!await Dl(D)){B.warning("Berechtigung zum Zugriff auf die Datei wurde verweigert.");return}At("sqlite");const ee=await D.getFile(),ie=await ee.arrayBuffer(),te=await Mo(ie,ee.name);Co(D),bn(te.data),await Mr(D),t.events.emit("database:connected",{driver:"sqlite",autoStarted:!0}),B.success("Datenbank erfolgreich geladen!")}catch(D){console.error("Auto-Start fehlgeschlagen:",D),B.error(D instanceof Error?D.message:"Fehler beim Laden der gespeicherten Datei")}})}async function K(){await $l();const q=d.querySelector("#auto-start-banner");q&&q.classList.add("d-none"),B.info("Gespeicherte Datei wurde vergessen.")}async function he(q){await Ca(q,async()=>{if(await El()){B.success("App wird installiert!");const A=d.querySelector("#pwa-install-banner");A&&A.classList.add("d-none")}})}if(d.addEventListener("click",q=>{const D=q.target?.closest("button[data-action]");if(!D)return;const A=D.dataset.action;if(A==="start-wizard"){I();return}A==="open"?w(D):A==="useDefaults"?h(D):A==="auto-start"?U(D):A==="auto-start-forget"?K():A==="install-pwa"&&he(D)}),u.form.addEventListener("submit",x),u.section.addEventListener("click",q=>{const D=q.target?.closest("[data-action]");if(!D)return;const A=D.dataset.action;if(A==="wizard-back"){E();return}A==="wizard-save"&&S(D)}),t.state.subscribe(q=>v(q)),v(t.state.getState()),!t.state.getState().app.hasDatabase){const q=$s();if(q&&q!==de())try{At(q)}catch(D){console.warn("Bevorzugter Speicher konnte nicht gesetzt werden",D)}}(async()=>{const q=await Cr(),D=await qs(),A=!!(q&&D?.hasDatabase),ee=Jt();f(A,ee);const ie=d.querySelector('[data-role="view-count"]');if(ie&&ql("app").then(ye=>{ye!==null&&(ie.textContent=Hl(ye))}),A&&q){const ye=d.querySelector('[data-role="auto-start-filename"]');ye&&(ye.textContent=`Datei: ${q.name}`)}F(),window.addEventListener("pwa:install-available",()=>{F()}),window.addEventListener("pwa:installed",()=>{er(),F()}),window.addEventListener("pwa:permission-required",async ye=>{const Me=ye.detail?.handle;if(Me){const Ce=d.querySelector("#auto-start-banner"),Yt=d.querySelector('[data-role="auto-start-filename"]');Ce&&Yt&&(Yt.textContent=`Datei: ${Me.name} (Berechtigung erforderlich)`,Ce.classList.remove("d-none"))}}),console.log("[Startup] PWA Capabilities:",Rs());const te=await _s();console.log("[Startup] PWA Install Status (async):",te),Q(te)})();function F(){const q=Os();Q(q)}function Q(q){const D=d.querySelector("#pwa-install-banner"),A=d.querySelector('[data-role="pwa-content"]');if(!(!D||!A)){if(!q.showBanner){D.classList.add("d-none");return}D.classList.remove("d-none"),q.isInstalled?A.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-check-circle text-success me-1"></i>App ist bereits installiert
        </p>
        <p class="small mb-0" style="color: var(--text-muted);">
          Öffne die App über dein Desktop- oder Startmenü-Symbol für die beste Erfahrung.
        </p>
      `:q.canInstall?A.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-download me-1"></i>Für schnelleren Zugriff als App installieren
        </p>
        <button class="btn btn-sm btn-outline-light" data-action="install-pwa">
          <i class="bi bi-download me-1"></i>App installieren
        </button>
      `:D.classList.add("d-none")}}Ki=!0}function Gs(e){let t=!1,a=!1;const n=o=>{e.onStatusChange&&e.onStatusChange(o)},r=()=>{t||!a||j().app.activeSection!==e.section||e.shouldRefresh&&!e.shouldRefresh()||(a=!1,n("refreshing"),Promise.resolve(e.onRefresh()).catch(d=>{console.error("Auto-Refresh konnte nicht ausgeführt werden",d),a=!0,n("stale")}).finally(()=>{!t&&!a&&n("idle")}))},s=ct(e.event,()=>{e.shouldHandleEvent&&!e.shouldHandleEvent()||(a=!0,n("stale"),r())}),l=ct("app:sectionChanged",o=>{o===e.section&&(a?r():n("idle"))});return j().app.activeSection===e.section&&n("idle"),()=>{t=!0,s(),l()}}const Kl={prev:"Zurück",next:"Weiter",loading:"Lädt …",empty:"Keine Einträge verfügbar"};function ji(){const e=document.createElement("span");return e.className="spinner-border spinner-border-sm",e.setAttribute("role","status"),e.setAttribute("aria-hidden","true"),e}function Gi(e){const t=document.createElement("div");return t.className="pager-widget__info text-muted small text-center flex-grow-1",t.textContent=e?.trim()||"",t}function nn(e,t){if(!e)return null;const a=document.createElement("div");a.className="pager-widget d-flex flex-column gap-2",e.innerHTML="",e.appendChild(a);let n={status:"hidden"},r=!1;const s={...Kl,...t.labels||{}};function l(){a.replaceChildren()}function o(m){const v=Gi(m.info||s.empty);a.replaceChildren(v)}function d(m){const v=document.createElement("div");v.className="alert alert-danger mb-0",v.textContent=m.message||"Unbekannter Fehler",a.replaceChildren(v)}function f(m){const v=document.createElement("div");v.className="pager-widget__controls d-flex flex-column flex-md-row gap-2 align-items-stretch";const w=document.createElement("button");w.type="button",w.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",w.disabled=!m.canPrev||m.loadingDirection==="prev",w.textContent=s.prev,m.loadingDirection==="prev"&&w.prepend(ji()),w.addEventListener("click",()=>{w.disabled||t.onPrev()});const h=document.createElement("button");h.type="button",h.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",h.disabled=!m.canNext||m.loadingDirection==="next",h.textContent=s.next,m.loadingDirection==="next"&&h.append(ji()),h.addEventListener("click",()=>{h.disabled||t.onNext()});const S=Gi(m.info||(m.canPrev||m.canNext?s.loading:s.empty));v.append(w,S,h),a.replaceChildren(v)}function u(m){switch(m.status){case"hidden":l();break;case"disabled":o(m);break;case"error":d(m);break;case"ready":f(m);break;default:l();break}}return{update(m){r||(n=m,u(m))},destroy(){r||(r=!0,a.replaceChildren(),e.innerHTML="")},getState(){return n}}}const ai=new Set;let Ui=!1;function Wl(){return typeof window>"u"?null:window.__PSL?.debugOverlayApi??null}function Us(){Ui||typeof window>"u"||(Ui=!0,window.addEventListener("psl:debug-overlay-ready",()=>{ai.forEach(e=>{ni(e)})}))}function ni(e){const t=Wl();t?.registerProvider&&(e.handle||(e.handle=t.registerProvider(e.config)),e.handle.update(e.lastMetrics??null))}function Vs(e){const t={config:e,handle:null,lastMetrics:null};return ai.add(t),Us(),ni(t),t}function Zs(e,t){e.lastMetrics=t,ai.add(e),Us(),ni(e)}function Qs(e){if(e==null)return 0;try{const t=JSON.stringify(e);return t?Number((t.length/1024).toFixed(1)):0}catch{return null}}const Vi=5e3,Zi=50,ri=50,zn=3;function br(e){if(e==null||e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function jl(e){if(!e)return null;const t=br(e.areaHa);if(t!==null)return t;const a=br(e.areaAr);if(a!==null)return a/100;const n=br(e.areaSqm);return n!==null?n/1e4:null}function Gl(e,t="–"){const a=jl(e);return a===null?t:Wo(a,2,t)}function Ul(e){return e.toISOString().slice(0,10)}function _n(e){if(!e)return;if(/^\d{4}-\d{2}-\d{2}$/.test(e))return e;const t=new Date(e);if(!Number.isNaN(t.getTime()))return Ul(t)}function Qi(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function ii(){return{startDate:"",endDate:""}}function Js(e,t){if(!e)return;const a=e.querySelector("#doc-start"),n=e.querySelector("#doc-end");a&&t.startDate&&(a.value=t.startDate),n&&t.endDate&&(n.value=t.endDate)}function Vl(e,t="sqlite"){if(typeof e=="string")return e.includes(":")?e:/^\d+$/.test(e)?ua(t,Number(e)):e;if(typeof e=="number")return ua(t,e);if(e&&typeof e=="object"){const a=e.source||t;if(typeof e.ref=="string"&&e.ref.includes(":"))return e.ref;const n=Number(e.ref);if(!Number.isNaN(n))return ua(a,n)}return null}function Zl(e){const t=new Set;return e?.length&&e.forEach(a=>{const n=Vl(a);n&&t.add(n)}),t}function Ys(e){const t=e.querySelector('[data-role="doc-focus-banner"]'),a=e.querySelector('[data-role="doc-focus-text"]');if(!t||!a)return;if(!Nt){t.classList.add("d-none");return}const n=V.startDate&&V.endDate?`${V.startDate} - ${V.endDate}`:"Aktuelle Filter",r=Nt.label||"Importierter Zeitraum",s=Nt.highlightEntryIds.size,l=s?` (${s} markiert)`:"";a.textContent=`${r}: ${n}${l}`,t.classList.remove("d-none")}function Ql(e,t){const a=e.querySelector('[data-role="doc-refresh-indicator"]');if(a){if(a.classList.remove("alert-info","alert-warning"),t==="idle"){a.classList.add("d-none");return}a.classList.remove("d-none"),t==="stale"?(a.classList.add("alert-warning"),a.textContent="Neue Dokumentationseinträge verfügbar. Ansicht aktualisiert sich beim Öffnen."):(a.classList.add("alert-info"),a.textContent="Aktualisiere Dokumentation...")}}function hr(e,t,a={}){Nt&&(Nt=null,Ka=null,Ys(e),a.refreshList&&qt(e,t.state.getState().fieldLabels))}function Jl(e,t){if(!Ka)return;const a=Zt(Ka);a&&(Ka=null,ro(e,a,t))}function Yl(e,t,a){if(!a)return;const n=_n(a.startDate),r=_n(a.endDate),s=!!a.entryIds?.length;if(!n&&!r&&!s)return;V={...V,...n?{startDate:n}:{},...r?{endDate:r}:{}},a.creator!==void 0&&(V={...V,creator:a.creator||void 0}),a.crop!==void 0&&(V={...V,crop:a.crop||void 0});const l=Zl(a.entryIds);Nt={label:a.label,reason:a.reason,startDate:V.startDate,endDate:V.endDate,highlightEntryIds:l},Ka=a.autoSelectFirst&&l.size?l.values().next().value??null:null;const o=e.querySelector("#doc-filter");Js(o,V),Ys(e),Br=!0,Pt(e,t.state.getState()).finally(()=>{Br=!1})}function Xl(){if(typeof window>"u")return{enabled:!1,count:vn};try{const e=new URLSearchParams(window.location.search);if(!e.has("seedHistory"))return{enabled:!1,count:vn};const t=e.get("seedHistory"),a=t?Number(t):Number.NaN;return{enabled:!0,count:Number.isFinite(a)&&a>0?Math.min(Math.round(a),ec):vn}}catch(e){return console.warn("seedHistory Parameter konnte nicht gelesen werden",e),{enabled:!1,count:vn}}}const dt=25,Ji=4,vr=new Intl.NumberFormat("de-DE"),vn=200,ec=2e3,ha=Xl();let Yi=!1,$e="memory",V=ii(),He=0,be=[],wt=[],re=0;const lt=new Map,et=new Map([[0,null]]),Ge=new Set,Bt=new Map,da=new Map;let We=!1,Ia=null,Ba=0,Nt=null,Br=!1,Ka=null,Rn=!1,An="",Kn=!1,yn=null,kn=null,Xi=null,qe=0,wn=null,es=null,ot=null,Wa=!1,ts=null;const tc=Vs({id:"documentation",label:"Documentation",budget:{initialLoad:50,maxItems:150}});let Xs=null;function ya(e){return e.app?.storageDriver||de()}function ua(e,t){return`${e}:${t}`}function si(e){const t={},a=Qi(e.startDate,"start"),n=Qi(e.endDate,"end");return a&&(t.startDate=a),n&&(t.endDate=n),e.creator&&(t.creator=e.creator),e.crop&&(t.crop=e.crop),t}function ac(e,t){return{id:ua("state",t),entry:e,source:"state",ref:t}}function nc(e){const t=Number(e?.id??e?.historyId??0),a={...e};return delete a.id,{id:ua("sqlite",t),entry:a,source:"sqlite",ref:t}}function rc(){return $e==="memory"?be.length:He>0?He:re*dt+be.length||null}function ic(){const e=[];if(We&&e.push("Lädt …"),ot&&e.push("Fehler"),Nt&&e.push("Fokus aktiv"),$e==="sqlite"&&et.get(re+1)&&e.push("Weitere Seiten verfügbar"),!!e.length)return e.join(" · ")}function sc(){const e={items:be.length,totalCount:rc(),cursor:$e==="sqlite"?`Seite ${re+1}`:null,payloadKb:Qs(wt.map(t=>t.entry)),lastUpdated:Xs,note:ic()};Zs(tc,e)}function Zt(e){return be.find(t=>t.id===e)}function tr(e){const t=e.querySelector('[data-role="archive-form"]');if(!t)return;const a=t.querySelector('input[name="archive-start"]'),n=t.querySelector('input[name="archive-end"]');a&&(a.value=V.startDate||""),n&&(n.value=V.endDate||"")}function ze(e,t,a="info"){const n=e.querySelector('[data-role="archive-status"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a}`,n.textContent=t,n.classList.remove("d-none")}}function Nr(e,t){const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(!a)return;const r=!a.classList.contains("d-none"),s=typeof t=="boolean"?t:!r;a.classList.toggle("d-none",!s),n&&(n.textContent=s?"Archiv-Eingaben ausblenden":"Archiv erstellen"),s&&tr(e)}function oc(e){const t=e.querySelector('input[name="archive-start"]'),a=e.querySelector('input[name="archive-end"]');if(!t?.value||!a?.value)return null;const n=e.querySelector('input[name="archive-storage"]'),r=e.querySelector('textarea[name="archive-note"]'),s=e.querySelector('input[name="archive-remove"]');return{startDate:t.value,endDate:a.value,storageHint:n?.value.trim()||void 0,note:r?.value.trim()||void 0,removeAfterExport:s?s.checked:!0}}function oi(e,t){const a=e.querySelector('[data-action="archive-toggle"]'),n=e.querySelector('[data-action="archive-submit"]'),r=e.querySelector('[data-role="archive-form"]'),s=e.querySelector('[data-role="archive-driver-hint"]'),l=ya(t)==="sqlite"&&!!t.app?.hasDatabase;a&&(a.disabled=!l||Rn),n&&(n.disabled=!l||Rn),!l&&r&&r.classList.add("d-none"),s&&(s.textContent=l?"Lokale SQLite-Datenbank aktiv":"Nur mit SQLite verfügbar",s.className=`badge ${l?"bg-success":"bg-secondary"}`),l?li():Kn=!1}function as(e,t){Rn=t;const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(a&&a.querySelectorAll("input, textarea, button").forEach(r=>{if(r.dataset.action==="archive-cancel"&&t){r.setAttribute("disabled","disabled");return}t?r.setAttribute("disabled","disabled"):r.removeAttribute("disabled")}),n&&(n.disabled=t||n.disabled,!t)){const r=j();n.disabled=ya(r)!=="sqlite"||!r.app?.hasDatabase}}function lc(e,t){const a=n=>n?n.replace(/[^0-9-]/g,""):"unbekannt";return`pflanzenschutz-archiv-${a(e)}_${a(t)}.zip`}function cc(e){let t=[];return Ve("archives",a=>{const n=Array.isArray(a?.logs)?a.logs:[];return t=[e,...n].slice(0,ri),{...a||{logs:[]},logs:t}}),t}async function li({force:e=!1}={}){if(yn){if(await yn,!e)return}else if(Kn&&!e)return;const t=j();if(ya(t)!=="sqlite"||!t.app?.hasDatabase)return;const n=(async()=>{try{const r=await Io({limit:ri});Ve("archives",s=>({...s&&typeof s=="object"?s:{logs:[]},logs:r.items})),Kn=!0}catch(r){console.warn("Archive logs could not be loaded",r)}})();yn=n;try{await n}finally{yn=null}}async function dc(e,t){const a=ya(j());if(cc(e),a!=="sqlite"){console.warn("Archive logs require SQLite. Changes stored in memory only.");return}try{const n={...e,metadata:t??void 0};await Ho(n),await tt()}catch(n){console.error("Archive log could not be persisted",n),Kn=!1}finally{await li({force:!0})}}function Fr(e){return!Array.isArray(e)||!e.length?"[]":e.map(t=>`${t.id}:${t.archivedAt}:${t.entryCount}`).join("|")}function uc(e){return e?Va(e)||e.slice(0,16).replace("T"," "):"-"}function Qa(e,t,a={}){const n=e.querySelector('[data-role="archive-log-list"]');if(!n)return;const r=Array.isArray(t)?t:[];a.resetPage!==!1&&(qe=0);const s=kc(r);if(!s.total){n.innerHTML='<div class="text-muted small">Noch keine Archive erstellt.</div>',is(e,s);return}const l=s.items.map(o=>{const d=uc(o.archivedAt),f=`${o.startDate||"-"} – ${o.endDate||"-"}`,u=o.entryCount===1?"Eintrag":"Einträge";return`
        <div class="list-group-item border rounded mb-2 p-3" data-action="archive-log-focus" data-log-id="${o.id}" style="cursor: pointer;">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="fs-5 fw-bold mb-1">${g(f)}</div>
              <div class="text-muted">${o.entryCount} ${u} · Erstellt ${g(d)}</div>
            </div>
            <i class="bi bi-chevron-right text-muted fs-4"></i>
          </div>
        </div>
      `}).join("");n.innerHTML=`<div class="list-group list-group-flush">${l}</div>`,is(e,s)}function ns(e,t){const a=e.archives?.logs;if(Array.isArray(a))return a.find(n=>n.id===t)}async function pc(e){if(e){if(typeof navigator<"u"&&navigator.clipboard&&typeof navigator.clipboard.writeText=="function"){await navigator.clipboard.writeText(e);return}if(typeof document<"u"){const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select(),document.execCommand("copy"),document.body.removeChild(t)}}}async function rn(e){if(da.has(e.id))return da.get(e.id);let t=null;if(e.source==="sqlite")try{t=await Oo(e.ref)}catch(a){console.error("History entry fetch failed",a)}else{const a=je(j().history);t=(typeof e.ref=="number"?a[e.ref]:void 0)||e.entry}return t&&da.set(e.id,t),t}function eo(e){return e&&(e.datum||Va(e.dateIso)||(typeof e.date=="string"?e.date:""))||""}function fc(e){if(e?.gpsCoordinates){const t=Ko(e.gpsCoordinates);if(t)return t}return""}function mc(e){return e?.gps||""}function Tr(e){if(!e)return null;if(e.dateIso){const n=Is(e.dateIso);if(n)return new Date(n.getFullYear(),n.getMonth(),n.getDate())}const t=typeof e.datum=="string"&&e.datum||typeof e.date=="string"&&e.date||null;if(!t)return null;const a=t.split(".");if(a.length===3){const[n,r,s]=a.map(Number);if(!Number.isNaN(n)&&!Number.isNaN(r)&&!Number.isNaN(s))return new Date(s,r-1,n)}return null}function gc(e,t){const a=Tr(e);if(t.startDate){const r=new Date(t.startDate);if(r.setHours(0,0,0,0),!a||a<r)return!1}if(t.endDate){const r=new Date(t.endDate);if(r.setHours(23,59,59,999),!a||a>r)return!1}const n=[["creator",e.ersteller],["crop",e.kultur]];for(const[r,s]of n){const o=t[r]?.trim().toLowerCase();if(o&&!`${s||""}`.toLowerCase().includes(o))return!1}return!0}function ci(e){if(!e)return"";const t=r=>r==null?"":String(r),n=(Array.isArray(e.items)?e.items:[]).map(r=>{const s=Object.keys(r).sort().reduce((l,o)=>(l[o]=r[o],l),{});return JSON.stringify(s)}).sort();return JSON.stringify({savedAt:t(e.savedAt),dateIso:t(e.dateIso),datum:t(e.datum),ersteller:t(e.ersteller),standort:t(e.standort),kultur:t(e.kultur),usageType:t(e.usageType),eppoCode:t(e.eppoCode),invekos:t(e.invekos),bbch:t(e.bbch),gps:t(e.gps),gpsPointId:t(e.gpsPointId),areaHa:e.areaHa??null,areaAr:e.areaAr??null,areaSqm:e.areaSqm??null,kisten:e.kisten??null,itemHashes:n})}function to(e){e.size&&Ve("history",t=>{const a=tn(t);if(!a.items.length)return a;let n=!1;const r=a.items.filter(s=>{const l=ci(s);return e.has(l)?(n=!0,!1):!0});return n?{...a,items:r,totalCount:Math.min(a.totalCount,r.length),lastUpdatedAt:new Date().toISOString()}:a})}function bc(e){return e.slice().sort((t,a)=>{const n=Tr(t.entry)?.getTime()||new Date(t.entry.savedAt||0).getTime();return(Tr(a.entry)?.getTime()||new Date(a.entry.savedAt||0).getTime())-n})}function rs(){return $e==="sqlite"?He>0?Math.max(Math.ceil(He/dt),1):Math.max(re+1,lt.size||0):be.length?Math.max(Math.ceil(be.length/dt),1):0}function ao(){if($e==="sqlite"){const t=Math.max(rs()-1,0);return re>t&&(re=t),re<0&&(re=0),re*dt}if(!be.length)return re=0,0;const e=Math.max(rs()-1,0);return re>e&&(re=e),re<0&&(re=0),re*dt}function ar(){if(!be.length){wt=[];return}if($e==="sqlite"){wt=be.slice();return}const e=ao(),t=Math.min(e+dt,be.length);wt=be.slice(e,t)}function hc(e){if(lt.size<=Ji)return;const t=Array.from(lt.keys()).sort((a,n)=>{const r=Math.abs(a-e);return Math.abs(n-e)-r});for(;lt.size>Ji&&t.length;){const a=t.shift();a==null||a===e||lt.delete(a)}}function vc(e){const t=e.querySelector('[data-role="doc-pager"]');return t?((!kn||Xi!==t)&&(kn?.destroy(),kn=nn(t,{onPrev:()=>Sc(e),onNext:()=>Ec(e),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Dokumentation...",empty:"Keine Einträge"}}),Xi=t),kn):null}function yc(e){const t=e.querySelector('[data-role="archive-log-pager"]');return t?((!wn||es!==t)&&(wn?.destroy(),wn=nn(t,{onPrev:()=>wc(e),onNext:()=>xc(e),labels:{prev:"Zurück",next:"Weiter",loading:"Archive werden geladen...",empty:"Keine Einträge"}}),es=t),wn):null}function kc(e){const t=e.length;if(!t)return qe=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/zn),1);qe>=a&&(qe=a-1),qe<0&&(qe=0);const n=qe*zn,r=Math.min(n+zn,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function is(e,t){const a=yc(e);if(a){if(!t.total){a.update({status:"disabled",info:"Noch keine Archive"});return}a.update({status:"ready",info:`Einträge ${t.start+1}–${t.end} von ${t.total}`,canPrev:qe>0,canNext:t.end<t.total})}}function wc(e){if(qe===0)return;qe=Math.max(qe-1,0);const t=j().archives?.logs??[];Qa(e,t,{resetPage:!1})}function xc(e){const t=j().archives?.logs??[],a=t.length;if(!a)return;const n=Math.max(Math.ceil(a/zn),1);qe>=n-1||(qe=Math.min(qe+1,n-1),Qa(e,t,{resetPage:!1}))}function Pn(e){const t=vc(e);if(!t)return;if(ot){t.update({status:"error",message:ot});return}const a=$e==="memory"?be.length:He,n=wt.length;if(!n){const f=We?"Lade Dokumentation...":"Keine Einträge vorhanden.";t.update({status:"disabled",info:f});return}const r=$e==="sqlite"?re*dt:ao(),s=`Einträge ${vr.format(r+1)}–${vr.format(r+n)}${a?` von ${vr.format(a)}`:""}`,l=$e==="memory"?r+n<be.length:!!et.get(re+1),o=!We&&l,d=re>0&&!We;t.update({status:"ready",info:s,canPrev:d,canNext:o,loadingDirection:We&&l?"next":null})}function qr(e){if(!ha.enabled)return;const t=e.querySelector('[data-action="doc-seed"]');t&&(t.disabled=Wa,t.textContent=Wa?"Dummy-Daten werden erstellt...":`+ ${ha.count} Dummy-Einträge`)}function Sc(e){if(re===0||We)return;const t=Math.max(re-1,0);if($e==="sqlite"){di(e,j().fieldLabels,t);return}re=t,ar(),qt(e,j().fieldLabels),Ya(e,j().fieldLabels)}function Ec(e){if(We)return;const t=re+1;if($e==="sqlite"){const n=lt.has(t),r=et.get(t);if(!n&&!r)return;di(e,j().fieldLabels,t);return}t*dt<be.length&&(re=t,ar(),qt(e,j().fieldLabels),Ya(e,j().fieldLabels))}function Ja(e){Ge.clear(),Bt.clear(),e&&nr(e)}function Lc(){return $e==="memory"?be.length:He}function nr(e){const t=e.querySelector('[data-role="doc-selection-info"]'),a=e.querySelector('[data-action="print-selection"]'),n=e.querySelector('[data-action="pdf-selection"]'),r=e.querySelector('[data-action="export-selection"]'),s=e.querySelector('[data-action="export-zip"]'),l=e.querySelector('[data-action="delete-selection"]'),o=Ge.size;t&&(t.textContent=o?`${o} Eintrag${o===1?"":"e"} ausgewählt`:"Keine Einträge ausgewählt");const d=o===0;a&&(a.disabled=d),n&&(n.disabled=d),r&&(r.disabled=d),s&&(s.disabled=d),l&&(l.disabled=d);const f=e.querySelector('[data-action="toggle-select-all"]');if(f){const u=Lc();f.disabled=u===0,f.checked=u>0&&o>=u,f.indeterminate=o>0&&o<u}}function Hr(e,t){e.querySelectorAll('[data-role="doc-list"] .doc-sidebar-entry').forEach(n=>{const r=!!(t&&n.dataset.entryId===t);n.classList.toggle("active",r)})}function qa(e,t,a){const n=e.querySelector("#doc-detail"),r=e.querySelector("#doc-detail-body"),s=e.querySelector('[data-role="doc-detail-card"]'),l=e.querySelector('[data-role="doc-detail-empty"]');if(!n||!r||!s||!l)return;if(!t){n.dataset.entryId="",s.classList.add("d-none"),l.classList.remove("d-none"),r.innerHTML="",Hr(e,null);return}n.dataset.entryId=t.entry.id,s.classList.remove("d-none"),l.classList.add("d-none"),Hr(e,t.entry.id);const o=a||j().fieldLabels,d=o.history?.tableColumns??{},f=o.history?.detail??{},u=t.detail||t.entry.entry,m=_o(u.items||[],o,"detail"),v=u.gpsCoordinates?an(u.gpsCoordinates):null,w=mc(u),h=fc(u),S=f.gpsNote||d.gpsNote||f.gps||d.gps||"GPS-Notiz",x=f.gpsCoordinates||d.gpsCoordinates||f.gps||d.gps||"GPS-Koordinaten",E=h?`${g(h)}${v?` <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${g(v)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:""}`:"-";r.innerHTML=`
    <p>
      <strong>${g(d.date||"Datum")}:</strong> ${g(eo(u))}<br />
      <strong>${g(f.creator||"Erstellt von")}:</strong> ${g(u.ersteller||"")}<br />
      <strong>${g(f.location||"Standort")}:</strong> ${g(u.standort||"")}<br />
      <strong>${g(f.crop||"Kultur")}:</strong> ${g(u.kultur||"")}<br />
      <strong>${g(f.usageType||"Art der Verwendung")}:</strong> ${g(u.usageType||"")}<br />
      <strong>${g(f.quantity||"Fläche (ha)")}:</strong> ${g(Gl(u))}<br />
      <strong>${g(f.eppoCode||"EPPO-Code")}:</strong> ${g(u.eppoCode||"")}<br />
      <strong>${g(f.bbch||"BBCH")}:</strong> ${g(u.bbch||"")}<br />
      <strong>${g(f.invekos||"InVeKoS")}:</strong> ${g(u.invekos||"")}<br />
      <strong>${g(S)}:</strong> ${w?g(w):"-"}<br />
      <strong>${g(x)}:</strong> ${E}<br />
      <strong>${g(f.time||"Uhrzeit")}:</strong> ${g(u.uhrzeit||"")}<br />
    </p>
    ${Ro({maschine:u.qsMaschine,schaderreger:u.qsSchaderreger,verantwortlicher:u.qsVerantwortlicher,wetter:u.qsWetter,behandlungsart:u.qsBehandlungsart})}
    <div class="table-responsive">
      ${m}
    </div>
  `}function qt(e,t){ar();const a=e.querySelector('[data-role="doc-list"]');if(!a)return;const r=e.querySelector("#doc-detail")?.dataset.entryId||null;if(!wt.length)a.innerHTML=We?'<div class="text-center text-muted py-4">Lädt ...</div>':'<div class="text-center text-muted py-4">Noch keine Einträge</div>';else{a.innerHTML="";const s=document.createDocumentFragment();(t||j().fieldLabels).history?.detail?.usageType,wt.forEach(o=>{const d=document.createElement("div"),f=!!Nt?.highlightEntryIds?.has(o.id);d.className=`doc-sidebar-entry list-group-item${f?" doc-sidebar-entry--highlight":""}`,d.dataset.entryId=o.id;const u=eo(o.entry)||"-",m=f?'<span class="badge bg-warning-subtle text-warning-emphasis badge-import">Import</span>':"";d.innerHTML=`
        <div
          class="doc-sidebar-entry__main"
          data-action="view-entry"
          data-entry-id="${o.id}"
        >
          <div class="d-flex justify-content-between gap-2">
            <span class="fw-bold d-flex align-items-center gap-2">
              ${g(o.entry.kultur||"-")}
              ${m}
            </span>
            <small class="text-muted">${g(u)}</small>
          </div>
          <div class="text-muted small mb-1">
            ${g(o.entry.ersteller||"-")} | ${g(o.entry.standort||"-")}
          </div>
          <div class="small text-muted">
            ${g(o.entry.usageType||"-")} · ${g(o.entry.eppoCode||"-")} · ${g(o.entry.invekos||"-")}
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2 gap-2 no-print">
          <button class="btn btn-sm btn-outline-secondary" data-action="print-entry" data-entry-id="${o.id}">Drucken</button>
          <label class="form-check-label d-flex align-items-center gap-2 mb-0">
            <input type="checkbox" class="form-check-input" data-action="toggle-select" data-entry-id="${o.id}" ${Ge.has(o.id)?"checked":""} />
            <span class="small">Auswahl</span>
          </label>
        </div>
      `,s.appendChild(d)}),a.appendChild(s)}Hr(e,r),Jl(e,t),Pn(e),nr(e),Xs=new Date().toISOString(),sc()}function Ya(e,t){const a=e.querySelector('[data-role="doc-info"]');if(!a)return;const n=He,r=!!(V.crop||V.creator);if(!n&&!We){a.textContent="Keine Einträge";return}if(!n&&We){a.textContent="Lädt...";return}if(V.startDate&&V.endDate){const s=`${V.startDate} - ${V.endDate} (${n})`;a.textContent=r?`${s} + Filter`:s;return}a.textContent=`Alle Einträge (${n})`}async function no(e,t){const n=e.querySelector("#doc-detail")?.dataset.entryId;if(!n){qa(e,null,t);return}const r=Zt(n);if(!r){qa(e,null,t);return}const s=await rn(r);s?qa(e,{entry:r,detail:s},t):qa(e,null,t)}async function di(e,t,a=re,n={}){const r=Math.max(0,a),s=!!n.forceReload;s&&(lt.clear(),et.clear(),et.set(0,null),He=0,be=[],wt=[],re=0,ot=null);const l=s?void 0:lt.get(r);if(l&&!n.forceReload){re=r,be=l,ot=null,qt(e,t),Ya(e),Pn(e);return}const o=et.has(r)?et.get(r)??null:null,d=Symbol("doc-load");Ia=d,We=!0,ot=null,Pn(e);try{const f=await Ps({cursor:o,pageSize:dt,filters:si(V),sortDirection:"desc",includeTotal:s||r===0||He===0});if(Ia!==d)return;const u=f.items.map(m=>nc(m));if(lt.set(r,u),hc(r),et.set(r,o),et.set(r+1,f.nextCursor??null),typeof f.totalCount=="number")He=f.totalCount;else{const m=r*dt+u.length;He=Math.max(He,m)}re=r,be=u,ot=null,qt(e,t),Ya(e,t)}catch(f){Ia===d&&(console.error("Dokumentation konnte nicht geladen werden",f),ot="Dokumentation konnte nicht geladen werden. Bitte erneut versuchen.",window.alert("Dokumentation konnte nicht geladen werden. Bitte erneut versuchen."))}finally{Ia===d&&(We=!1,Ia=null,Pn(e))}}async function Dc(e,t){const a=je(t.history);be=bc(a.map((n,r)=>ac(n,r)).filter(n=>gc(n.entry,V))),He=be.length,re=0,ot=null,ar(),qt(e,t.fieldLabels),Ya(e,t.fieldLabels),await no(e,t.fieldLabels)}async function Pt(e,t){const a=ya(t),n=!!t.app?.hasDatabase,r=a==="sqlite"&&n;if($e=r?"sqlite":"memory",da.clear(),re=0,ot=null,He=0,be=[],wt=[],lt.clear(),et.clear(),et.set(0,null),Ja(e),oi(e,t),tr(e),Qa(e,t.archives?.logs??[]),An=Fr(t.archives?.logs),r){await di(e,t.fieldLabels,0,{forceReload:!0}),await no(e,t.fieldLabels);return}await Dc(e,t)}async function yr(){const e=[];for(const t of Ge){const a=Bt.get(t)||Zt(t);if(!a)continue;const n=await rn(a);n&&e.push(n)}return e}async function $c(e,t){if(!t){Ja(e),qt(e,j().fieldLabels);return}if(Ge.clear(),Bt.clear(),$e==="memory")for(const a of be)Ge.add(a.id),Bt.set(a.id,a);else try{const a=await Ms({filters:si(V),sortDirection:"desc",limit:1e4}),n=Array.isArray(a.historyIds)?a.historyIds:[];a.entries.forEach((r,s)=>{const l=Number(n[s]);if(!Number.isFinite(l))return;const o=ua("sqlite",l);Ge.add(o),Bt.set(o,{id:o,entry:r,source:"sqlite",ref:l}),da.has(o)||da.set(o,r)})}catch(a){console.error("Alle Einträge konnten nicht ausgewählt werden",a),window.alert("Alle Einträge konnten nicht ausgewählt werden. Bitte erneut versuchen.")}qt(e,j().fieldLabels),nr(e)}async function zc(e,t){if(!Ge.size)return;const a=Array.from(Ge).map(o=>Bt.get(o)||Zt(o)).filter(o=>!!o),n=[];for(const o of a){const d=await rn(o);d&&n.push(d)}const r=a.filter(o=>o.source==="sqlite"),s=!!r.length;if(s)for(const o of r)await qo(o.ref);const l=new Set(a.filter(o=>o.source==="state").map(o=>o.ref));if(l.size&&(Ve("history",o=>{const d=tn(o),f=d.items.filter((u,m)=>!l.has(m));return f.length===d.items.length?d:{...d,items:f,totalCount:Math.min(d.totalCount,f.length),lastUpdatedAt:new Date().toISOString()}}),await Ac()),n.length){const o=new Set(n.map(d=>ci(d)));to(o)}if(s){try{await tt()}catch(o){console.warn("SQLite-Datei konnte nach dem Löschen nicht gespeichert werden",o)}t.events?.emit?.("history:data-changed",{type:"deleted",ids:r.map(o=>o.ref)})}Ja(e),await Pt(e,t.state.getState())}async function ro(e,t,a){const n=await rn(t);if(!n){window.alert("Details konnten nicht geladen werden.");return}qa(e,{entry:t,detail:n},a)}async function ss(e){const t=await rn(e);t?await io([t]):window.alert("Eintrag konnte nicht geladen werden.")}async function Ac(){const e=de();if(!(!e||e==="memory"||e==="sqlite"))try{const t=Ye();await Xe(t)}catch(t){throw console.error("Persist history failed",t),window.alert("Historie konnte nicht gespeichert werden. Bitte erneut versuchen."),t}}async function Pc(e,t,a){if(Rn)return;const n=t.state.getState();if(ya(n)!=="sqlite"||!n.app?.hasDatabase){ze(e,"Archivieren ist nur mit einer lokalen SQLite-Datenbank möglich.","warning");return}const s=oc(a);if(!s?.startDate||!s.endDate){ze(e,"Bitte Start- und Enddatum für das Archiv wählen.","warning");return}const l=_n(s.startDate),o=_n(s.endDate);if(!l||!o){ze(e,"Die angegebenen Daten sind ungültig.","danger");return}if(new Date(l)>new Date(o)){ze(e,"Startdatum darf nicht nach dem Enddatum liegen.","danger");return}const d={startDate:l,endDate:o,creator:V.creator,crop:V.crop},f=si(d);as(e,!0),ze(e,"Prüfe Zeitraum und Eintragsmenge...","info");try{const u=await Ps({cursor:null,pageSize:1,filters:f,sortDirection:"asc",includeTotal:!0}),m=u.totalCount??u.items.length??0;if(!m){ze(e,"Im angegebenen Zeitraum wurden keine Einträge gefunden.","warning");return}if(m>Vi){ze(e,`Maximal ${Vi} Einträge pro Archiv erlaubt. Bitte Zeitraum verkürzen.`,"warning");return}ze(e,`Exportiere ${m} Einträge in ein ZIP-Archiv...`,"info");const v=await Ms({filters:f,limit:m,sortDirection:"asc"}),w=v?.entries??[];if(!w.length){ze(e,"Archiv konnte nicht erstellt werden – Export lieferte keine Einträge.","danger");return}const h=w.map(D=>({...D})),S={format:"pflanzenschutz-archive",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:h.length,filters:{startDate:l,endDate:o,creator:d.creator||null,crop:d.crop||null},archive:{removeFromDatabase:s.removeAfterExport,storageHint:s.storageHint||null,note:s.note||null}},x=Cs({"pflanzenschutz.json":Hn(JSON.stringify(h,null,2)),"metadata.json":Hn(JSON.stringify(S,null,2))}),E=new ArrayBuffer(x.byteLength);new Uint8Array(E).set(x);const I=new Blob([E],{type:"application/zip"}),U=lc(l,o);ui(I,U);let K=!1;if(s.removeAfterExport){ze(e,"Export abgeschlossen. Entferne Einträge und bereinige Datenbank...","info"),await Bo({filters:f});const D=new Set(h.map(A=>ci(A)));to(D);try{await tt()}catch(A){console.error("SQLite-Datei konnte nach dem Archivieren nicht gespeichert werden",A)}t.events?.emit?.("history:data-changed",{type:"deleted-range",filters:f});try{await No()}catch(A){K=!0,console.error("VACUUM fehlgeschlagen",A)}}const he=new Date().toISOString(),F={id:`archive-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,archivedAt:he,startDate:l,endDate:o,entryCount:h.length,fileName:U,storageHint:s.storageHint||void 0,note:s.note||void 0};K&&(F.note=F.note?`${F.note} | VACUUM fehlgeschlagen`:"VACUUM fehlgeschlagen");const Q={filters:{...d},removeAfterExport:!!s.removeAfterExport,historyIdSample:v?.historyIds?.slice(0,Zi)};if(await dc(F,Q),!s.removeAfterExport&&v?.historyIds?.length){const D=v.historyIds.slice(0,Zi).map(A=>({source:"sqlite",ref:A}));t.events?.emit?.("documentation:focus-range",{startDate:l,endDate:o,label:"Archiviert",reason:"archive",entryIds:D})}Nr(e,!1),a.reset(),tr(e),await Pt(e,t.state.getState());const q=s.removeAfterExport?`Archiv ${U} erstellt und ${h.length} Einträge entfernt.`:`Archiv ${U} erstellt. ${h.length} Einträge bleiben in der Datenbank.`;ze(e,q,K?"warning":"success")}catch(u){console.error("Archivieren fehlgeschlagen",u);const m=u instanceof Error?u.message:"Archiv konnte nicht erstellt werden.";ze(e,m,"danger")}finally{as(e,!1),oi(e,t.state.getState())}}const Mc=50;async function io(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}if(e.length>Mc&&!window.confirm(`Sie möchten ${e.length} Einträge drucken. Bei sehr vielen Einträgen kann das Erstellen der Druckvorschau einige Sekunden dauern und lässt sich nicht unterbrechen.

Fortfahren?`))return;const t=j().fieldLabels,a=Fo(j().company||null);await To(e,t,{title:"Dokumentation",headerHtml:a,chunkSize:25})}function ui(e,t){const a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download=t,n.click(),URL.revokeObjectURL(a)}function Cc(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const t=e.map(l=>({...l})),a=JSON.stringify(t,null,2),n=new TextEncoder().encode(a),r=new Blob([n],{type:"application/json; charset=utf-8"}),s=new Date().toISOString().replace(/[:.]/g,"-");ui(r,`pflanzenschutz-dokumentation-${s}.json`)}async function Ic(e,t){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const a=e.map(d=>({...d})),n={format:"pflanzenschutz-export",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:a.length,filters:{startDate:t.startDate||null,endDate:t.endDate||null,creator:t.creator||null,crop:t.crop||null}},r=Cs({"pflanzenschutz.json":Hn(JSON.stringify(a,null,2)),"metadata.json":Hn(JSON.stringify(n,null,2))}),s=new ArrayBuffer(r.byteLength);new Uint8Array(s).set(r);const l=new Blob([s],{type:"application/zip"}),o=new Date().toISOString().replace(/[:.]/g,"-");ui(l,`pflanzenschutz-dokumentation-${o}.zip`)}function Bc(){const e=document.createElement("div"),t=ii(),a=V.startDate||t.startDate||"",n=V.endDate||t.endDate||"";V={...V,startDate:a,endDate:n};const r=ha.enabled?`<button class="btn btn-outline-info btn-sm" type="button" data-action="doc-seed">+ ${ha.count} Dummy-Einträge</button>`:"";return e.className="section-inner",e.innerHTML=`
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
            <input type="text" class="form-control" id="doc-crop" name="doc-crop" placeholder="z. B. Äpfel" value="${V.crop||""}" />
          </div>
          <div class="col-md-3">
            <label class="form-label" for="doc-creator">Anwender (optional)</label>
            <input type="text" class="form-control" id="doc-creator" name="doc-creator" placeholder="Name" value="${V.creator||""}" />
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
            <small class="text-muted">Letzte ${ri}</small>
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
  `,e}function Nc(e){if(!e)return{};const t=new FormData(e),a=r=>{const s=t.get(r);return typeof s=="string"&&s?s:void 0},n=r=>{const s=t.get(r);if(typeof s!="string")return;const l=s.trim();return l||void 0};return{startDate:a("doc-start"),endDate:a("doc-end"),crop:n("doc-crop"),creator:n("doc-creator")}}let os="entries";function Fc(e,t){os!==t&&(os=t,e.querySelectorAll("[data-doc-tab]").forEach(a=>{a.classList.toggle("active",a.dataset.docTab===t)}),e.querySelectorAll("[data-pane]").forEach(a=>{a.style.display=a.dataset.pane===t?"block":"none"}))}function Tc(e,t){e.addEventListener("click",a=>{const n=a.target.closest("[data-doc-tab]");if(n&&n.dataset.docTab){Fc(e,n.dataset.docTab);return}}),e.addEventListener("submit",a=>{if(a.target instanceof HTMLFormElement){if(a.target.id==="doc-filter"){a.preventDefault(),hr(e,t,{refreshList:!0});const n=Nc(a.target);if(!n.startDate||!n.endDate){window.alert("Bitte Start- und Enddatum auswählen.");return}V=n,Ja(e),Pt(e,t.state.getState());return}a.target.dataset.role==="archive-form"&&(a.preventDefault(),Pc(e,t,a.target))}}),e.addEventListener("click",a=>{const n=a.target;if(!n)return;const r=n.dataset.action;if(!r){n.closest("[data-action]")&&a.stopPropagation();return}if(r==="reset-filters"){const o=e.querySelector("#doc-filter");o?.reset(),V=ii(),Js(o??null,V),hr(e,t,{refreshList:!0}),Ja(e),Pt(e,t.state.getState());return}if(r==="archive-toggle"){Nr(e),ze(e,"");return}if(r==="archive-cancel"){Nr(e,!1),ze(e,"");return}if(r==="archive-log-focus"){const o=n.dataset.logId;if(!o)return;const d=ns(t.state.getState(),o);if(!d){window.alert("Archiv-Eintrag nicht gefunden.");return}const f=d.fileName?`Archiv ${d.fileName}`:"Archivierter Zeitraum";typeof t.events?.emit=="function"?t.events.emit("documentation:focus-range",{startDate:d.startDate,endDate:d.endDate,label:f,reason:"archive-log"}):(V={...V,startDate:d.startDate,endDate:d.endDate},Pt(e,t.state.getState())),ze(e,`Dokumentation auf Archiv ${d.startDate} – ${d.endDate} fokussiert.`,"success");return}if(r==="archive-log-copy-hint"){const o=n.dataset.logId;if(!o)return;const d=ns(t.state.getState(),o);if(!d||!d.storageHint){window.alert("Kein Speicherhinweis vorhanden.");return}const f=d.storageHint;(async()=>{try{await pc(f),ze(e,"Speicherhinweis kopiert.","success")}catch(u){console.error("Hinweis konnte nicht kopiert werden",u),window.alert("Hinweis konnte nicht kopiert werden.")}})();return}if(r==="doc-focus-clear"){hr(e,t,{refreshList:!0});return}if(r==="print-selection"||r==="pdf-selection"){(async()=>{const o=await yr();await io(o)})();return}if(r==="export-selection"){(async()=>{const o=await yr();Cc(o)})();return}if(r==="export-zip"){(async()=>{const o=await yr();await Ic(o,V)})();return}if(r==="delete-selection"){if(!Ge.size||!window.confirm("Ausgewählte Einträge wirklich löschen?"))return;zc(e,t);return}if(r==="doc-seed"){if(!ha.enabled||Wa)return;const d=window.__PSL?.seedHistoryEntries;if(typeof d!="function"){window.alert("Seed-Funktion ist nicht verfügbar. Bitte Entwicklungsmodus verwenden.");return}Wa=!0,qr(e),(async()=>{try{await d(ha.count),await Pt(e,t.state.getState())}catch(f){console.error("Dummy-Daten konnten nicht erstellt werden",f),window.alert("Dummy-Daten konnten nicht erstellt werden.")}finally{Wa=!1,qr(e)}})();return}if(r==="detail-print"){const d=e.querySelector("#doc-detail")?.dataset.entryId;if(!d){window.alert("Kein Eintrag ausgewählt.");return}const f=Zt(d);if(!f){window.alert("Eintrag nicht verfügbar.");return}ss(f);return}const s=n.dataset.entryId;if(!s)return;const l=Zt(s);if(!l){window.alert("Eintrag nicht verfügbar.");return}if(r==="view-entry"){ro(e,l,t.state.getState().fieldLabels);return}if(r==="print-entry"){ss(l);return}}),e.addEventListener("change",a=>{const n=a.target;if(!n)return;if(n.dataset.action==="toggle-select-all"){$c(e,n.checked);return}if(n.dataset.action!=="toggle-select")return;const r=n.dataset.entryId;if(r){if(n.checked){Ge.add(r);const s=Zt(r);s&&Bt.set(r,s)}else Ge.delete(r),Bt.delete(r);nr(e)}})}function qc(e,t){if(!e||Yi)return;const a=e;a.innerHTML="";const n=Bc();a.appendChild(n),Tc(n,t),qr(n),oi(n,t.state.getState()),tr(n);const r=t.state.getState().archives?.logs??[];Qa(n,r),An=Fr(r),li(),typeof t.events?.subscribe=="function"&&t.events.subscribe("documentation:focus-range",o=>{!o||typeof o!="object"||Yl(n,t,o)});const s=o=>je(o.history).length,l=()=>Pt(n,t.state.getState());ts?.(),ts=Gs({section:"documentation",event:"history:data-changed",shouldHandleEvent:()=>$e==="sqlite",shouldRefresh:()=>$e==="sqlite",onRefresh:()=>l(),onStatusChange:o=>Ql(n,o)}),Ba=s(t.state.getState()),l(),t.state.subscribe(o=>{const d=Fr(o.archives?.logs);d!==An&&(An=d,Qa(n,o.archives?.logs??[]));const f=s(o);if(Br){Ba=f;return}if($e==="sqlite"){Ba=f;return}f!==Ba&&(Ba=f,l())}),Yi=!0}const Xa=e=>je(e.gps.points),Ha=e=>je(e.points),Hc=new Intl.NumberFormat("de-DE",{minimumFractionDigits:5,maximumFractionDigits:5}),Oc=new Intl.DateTimeFormat("de-DE",{dateStyle:"short",timeStyle:"short"}),ls="Deutschland";let cs=!1,so="list",xn=null,$=null,Na=null,ds=null;const Mn=25,kr=new Intl.NumberFormat("de-DE");let Ae=0,sa=null,Or=null,us=null;function ra(e,t){typeof e.events?.emit=="function"&&e.events.emit("history:gps-activation-result",{...t,source:"gps",timestamp:Date.now()})}function ja(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function _c(){const e=document.createElement("section");return e.className="section-inner",e.innerHTML=`
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
  `,e}function Rc(e){return{root:e,message:e.querySelector('[data-role="gps-message"]'),refreshIndicator:e.querySelector('[data-role="gps-refresh-indicator"]'),availability:e.querySelector('[data-role="gps-availability"]'),tabButtons:Array.from(e.querySelectorAll('[data-role="gps-tab"]')),panels:Array.from(e.querySelectorAll('[data-role="gps-panel"]')),listBody:e.querySelector('[data-role="gps-list"]'),emptyState:e.querySelector('[data-role="gps-empty"]'),activeInfo:e.querySelector('[data-role="gps-active-info"]'),summaryLabel:e.querySelector('[data-role="gps-summary"]'),statusBadge:e.querySelector('[data-role="gps-status"]'),form:e.querySelector('[data-role="gps-form"]'),formFields:{name:e.querySelector('[name="gps-name"]'),description:e.querySelector('[name="gps-description"]'),latitude:e.querySelector('[name="gps-latitude"]'),longitude:e.querySelector('[name="gps-longitude"]'),source:e.querySelector('[name="gps-source"]'),activate:e.querySelector('[name="gps-activate"]'),rawCoordinates:e.querySelector('[name="gps-raw-coordinates"]')},disableTargets:Array.from(e.querySelectorAll("[data-gps-disable]")),geolocationBtn:e.querySelector('[data-action="use-geolocation"]'),mapButton:e.querySelector('[data-role="gps-open-maps"]'),verifyButton:e.querySelector('[data-action="verify-coords"]')}}function Oa(e){return`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e)}`}function oo(e){const t=e.gps,a=Ha(t),n=l=>{if(!l)return null;const o=an(l)||Oa(`${l.latitude},${l.longitude}`),d=l.name?`${l.name}`:`${va(l.latitude)}, ${va(l.longitude)}`;return{url:o,label:d}};if(t.activePointId){const l=a.find(d=>d.id===t.activePointId),o=n(l||null);if(o)return o}if(a.length>0){const l=n(a[0]);if(l)return l}const r=e.company?.address?.trim();if(r)return{url:Oa(r.replace(/\n/g,", ")),label:r};const s=e.company?.name?.trim();return s?{url:Oa(s),label:s}:{url:Oa(ls),label:ls}}function Kc(e){if(!$)return;const t=oo(e);$.mapButton&&($.mapButton.href=t.url,$.mapButton.title=`Google Maps öffnen (${t.label})`);const a=$.root.querySelector('[data-role="gps-empty-map-link"]');a&&(a.href=t.url)}function Wc(e){if(!e)return null;const a=e.trim().replace(/\s+/g," ").replace(/[,;]/g," ").match(/-?\d+(?:[.,]\d+)?/g);if(!a||a.length<2)return null;const n=l=>Number(l.replace(/,/g,".")),r=n(a[0]),s=n(a[1]);return!Number.isFinite(r)||!Number.isFinite(s)||r<-90||r>90||s<-180||s>180?null:{latitude:r,longitude:s}}function jc(){if(!$?.formFields)return null;const e=$.formFields.latitude?.value??"",t=$.formFields.longitude?.value??"";if(!e.trim()||!t.trim())return null;const a=Number(e),n=Number(t);return!Number.isFinite(a)||!Number.isFinite(n)||a<-90||a>90||n<-180||n>180?null:{latitude:a,longitude:n}}function Sn(e){return Number(e).toFixed(6)}function Gc(e,t){const a=Sn(e),n=Sn(t);return Xa(j()).some(r=>Sn(r.latitude)===a&&Sn(r.longitude)===n)}function Ga(){if(!$?.verifyButton)return;const e=jc(),t=!!e;if($.verifyButton.disabled=!t,e){const a=an({latitude:e.latitude,longitude:e.longitude});$.verifyButton.dataset.targetUrl=a||Oa(`${e.latitude},${e.longitude}`)}else delete $.verifyButton.dataset.targetUrl}function va(e){const t=Number(e);return Number.isFinite(t)?`${Hc.format(t)}°`:"–"}function Uc(e){if(!e)return"–";const t=new Date(e);return Number.isNaN(t.getTime())?"–":Oc.format(t)}function le(e,t="info",a=4500){if($?.message){if(xn&&(window.clearTimeout(xn),xn=null),!e){$.message.classList.add("d-none"),$.message.textContent="";return}$.message.className=`alert alert-${t}`,$.message.textContent=e,$.message.classList.remove("d-none"),a>0&&(xn=window.setTimeout(()=>{$?.message?.classList.add("d-none")},a))}}function Vc(e){const t=$?.refreshIndicator;if(t){if(t.classList.remove("alert-warning","alert-info"),e==="idle"){t.classList.add("d-none");return}t.classList.remove("d-none"),e==="stale"?(t.classList.add("alert-warning"),t.textContent="GPS-Daten wurden geändert. Ansicht aktualisiert sich beim Öffnen."):(t.classList.add("alert-info"),t.textContent="GPS-Daten werden aktualisiert...")}}function lo(e){$&&(so=e,$.tabButtons.forEach(t=>{const a=t.dataset.tab===e;t.classList.toggle("active",a)}),$.panels.forEach(t=>{const a=t.getAttribute("data-panel")===e;t.classList.toggle("d-none",!a)}))}function Ue(e){return e?.hasDatabase?e.storageDriver!=="sqlite"?"wrong-driver":"ok":"no-db"}function Zc(e){if($?.availability){if(e==="ok"){$.availability.classList.add("d-none"),$.availability.textContent="";return}$.availability.classList.remove("d-none"),$.availability.textContent=e==="no-db"?"Bitte verbinden Sie zuerst eine Datenbank, um GPS-Punkte zu verwalten.":"GPS-Funktionen benötigen eine aktive SQLite-Datenbank. Bitte den SQLite-Treiber in den Einstellungen auswählen."}}function pa(e,t){if(!$)return;const a=t!=="ok"||e.pending||Za.isLocked();if($.disableTargets.forEach(n=>{(n instanceof HTMLButtonElement||n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n instanceof HTMLSelectElement)&&(n.disabled=a)}),$.statusBadge){let n="badge bg-success",r="Bereit";t==="no-db"?(n="badge bg-secondary",r="Keine Datenbank"):t==="wrong-driver"?(n="badge bg-warning text-dark",r="Nur mit SQLite"):(e.pending||Za.isLocked())&&(n="badge bg-info text-dark",r="Wird verarbeitet"),$.statusBadge.className=n,$.statusBadge.textContent=r}}function co(e){const t=e.length;if(!t)return Ae=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/Mn),1);Ae>=a&&(Ae=a-1),Ae<0&&(Ae=0);const n=Ae*Mn,r=Math.min(n+Mn,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function Qc(){if(!$?.root)return null;const e=$.root.querySelector('[data-role="gps-pager"]');return e?((!sa||Or!==e)&&(sa?.destroy(),sa=nn(e,{onPrev:()=>Yc(),onNext:()=>Xc(),labels:{prev:"Zurück",next:"Weiter",loading:"GPS-Punkte werden geladen...",empty:"Keine GPS-Punkte verfügbar"}}),Or=e),sa):null}function ps(e,t){const a=Qc();if(!a)return;if(t!=="ok"){Ae=0;const l=t==="no-db"?"Keine Datenbank verbunden.":"Nur mit SQLite verfügbar.";a.update({status:"disabled",info:l});return}const n=Xa(e).length;if(!n){Ae=0;const l=e.gps.initialized?"Noch keine GPS-Punkte vorhanden.":"GPS-Punkte werden geladen...";a.update({status:"disabled",info:l});return}const{start:r,end:s}=co(Xa(e));a.update({status:"ready",info:`Einträge ${kr.format(r+1)}–${kr.format(s)} von ${kr.format(n)}`,canPrev:Ae>0,canNext:s<n})}function Jc(e,t){return e.length?e.map(a=>{const n=a.id===t,r=a.description?`<div class="text-muted small">${g(a.description)}</div>`:"",s=a.source?`<span class="badge-psm badge-psm-neutral">${g(a.source)}</span>`:'<span class="text-muted">–</span>',l=n?'<span class="badge bg-success ms-2">Aktiv</span>':"",o=an(a),d=o?`<a class="btn btn-outline-info" href="${ja(o)}" target="_blank" rel="noopener noreferrer">
              Karte
            </a>`:"";return`
        <tr data-point-id="${ja(a.id)}">
          <td>
            <div class="fw-semibold">${g(a.name||"Ohne Namen")}${l}</div>
            ${r}
          </td>
          <td class="font-monospace">
            <div>${va(a.latitude)}</div>
            <div>${va(a.longitude)}</div>
          </td>
          <td>
            <div>${s}</div>
            <div class="text-muted small">${Uc(a.updatedAt)}</div>
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
`):""}function pi(e,t){if(!$)return;const a=e.gps,n=oo(e),r=t==="ok";if($.summaryLabel){const s=Ha(a).length;$.summaryLabel.textContent=r?`${s} Punkt${s===1?"":"e"} gespeichert`:"Funktion derzeit nicht verfügbar"}if(!r){$.listBody&&($.listBody.innerHTML=""),$.emptyState&&($.emptyState.textContent=t==="no-db"?"Keine Datenbank verbunden.":"Bitte SQLite als Speicher-Treiber aktivieren.",$.emptyState.classList.remove("d-none")),$.activeInfo&&($.activeInfo.textContent=t==="no-db"?"Wartet auf Datenbank.":"Nur mit SQLite verfügbar."),ps(e,t);return}if($.listBody){const{items:s}=co(Ha(a));$.listBody.innerHTML=Jc(s,a.activePointId)}if($.emptyState){const s=Ha(a).length>0;$.emptyState.classList.toggle("d-none",s),!s&&a.initialized?$.emptyState.innerHTML=`
        <p class="mb-2">Noch keine GPS-Punkte vorhanden.</p>
        <p class="small text-muted mb-3">
          Nutzen Sie "Neuer Punkt" oder öffnen Sie Google Maps, um Koordinaten zu ermitteln.
        </p>
        <a class="btn btn-outline-info btn-sm" data-role="gps-empty-map-link" href="${ja(n.url)}" target="_blank" rel="noopener noreferrer">
          <i class="bi bi-box-arrow-up-right me-1"></i>
          Google Maps öffnen
        </a>
      `:a.initialized||($.emptyState.textContent="GPS-Punkte werden geladen...")}if($.activeInfo)if(a.activePointId){const s=Ha(a).find(l=>l.id===a.activePointId);if(s){const l=`${s.name||"Ohne Namen"} (${va(s.latitude)}, ${va(s.longitude)})`,o=an(s);o?$.activeInfo.innerHTML=`${g(l)} <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${ja(o)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:$.activeInfo.textContent=l}else $.activeInfo.textContent="Aktiver Punkt nicht gefunden."}else $.activeInfo.innerHTML=`Kein aktiver Punkt ausgewählt. <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${ja(n.url)}" target="_blank" rel="noopener noreferrer">Google Maps öffnen</a>`;ps(e,t)}function Yc(){if(Ae===0)return;Ae=Math.max(Ae-1,0);const e=j(),t=Ue(e.app);pi(e,t)}function Xc(){const e=j(),t=Xa(e).length;if(!t)return;const a=Math.max(Math.ceil(t/Mn)-1,0);if(Ae>=a)return;Ae=Math.min(Ae+1,a);const n=Ue(e.app);pi(e,n)}function Te(e){`${new Date().toLocaleString("de-DE")}${e}`}function sn(e){if(!e)return null;const t=j();return Xa(t).find(a=>a.id===e)||null}async function ed(e){if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(e);return}const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}function td(){if(!$?.formFields?.rawCoordinates)return;const e=$.formFields.rawCoordinates.value,t=Wc(e);if(!t){le("Koordinaten konnten nicht erkannt werden. Bitte Format 47.68952, 9.12091 verwenden.","warning",6e3);return}const a=t.latitude.toFixed(6),n=t.longitude.toFixed(6);$.formFields.latitude&&($.formFields.latitude.value=a),$.formFields.longitude&&($.formFields.longitude.value=n),le("Koordinaten übernommen.","success"),Ga()}function ad(){if(!$?.verifyButton)return;const e=$.verifyButton.dataset.targetUrl;if(!e){le("Bitte zuerst gültige Koordinaten eintragen, bevor die Prüfung geöffnet wird.","warning",6e3);return}window.open(e,"_blank","noopener,noreferrer")}async function _r(e={}){const{notify:t=!1}=e;if(!(!$||Ue(j().app)!=="ok"||j().gps.pending))try{await As(),t&&le("GPS-Punkte aktualisiert.","success"),Te("GPS-Punkte synchronisiert.")}catch(n){const r=n instanceof Error?n.message:"GPS-Punkte konnten nicht geladen werden.";le(r,"danger",7e3),Te(`Fehler beim Laden: ${r}`)}}async function nd(e){if(!e)return;const t=sn(e);if(!t){le("Ausgewählter GPS-Punkt wurde nicht gefunden.","warning");return}try{await Bs(t.id),le(`"${t.name}" ist nun aktiv.`,"success"),Te(`Aktiver GPS-Punkt: ${t.name}`)}catch(a){const n=a instanceof Error?a.message:"GPS-Punkt konnte nicht aktiviert werden.";le(n,"danger",7e3),Te(`Fehler beim Aktivieren: ${n}`)}}async function rd(e){if(!e)return;const t=sn(e);if(!t){le("GPS-Punkt existiert nicht mehr.","warning");return}if(window.confirm(`"${t.name}" wirklich löschen? Dieser Schritt kann nicht rückgängig gemacht werden.`))try{await jo(t.id),le(`"${t.name}" wurde gelöscht.`,"success"),Te(`GPS-Punkt gelöscht: ${t.name}`)}catch(n){const r=n instanceof Error?n.message:"GPS-Punkt konnte nicht gelöscht werden.";le(r,"danger",7e3),Te(`Löschen fehlgeschlagen: ${r}`)}}async function id(e){if(!e)return;const t=sn(e);if(!t){le("GPS-Punkt nicht gefunden.","warning");return}const a=`${t.latitude}, ${t.longitude}`;try{await ed(a),le("Koordinaten in die Zwischenablage kopiert.","success")}catch(n){console.error("clipboard error",n),le("Koordinaten konnten nicht kopiert werden.","danger",7e3)}}async function sd(e,t){const a=(e||"").trim();if(!a){ra(t,{status:"error",id:"",message:"Ungültige GPS-Anfrage ohne ID."});return}if(Ue(j().app)!=="ok"){le("GPS-Modul ist ohne aktive SQLite-Datenbank nicht verfügbar.","warning",6e3),ra(t,{status:"error",id:a,message:"GPS-Modul ist derzeit nicht verfügbar."});return}const r=sn(a);if(!r){le("Verknüpfter GPS-Punkt wurde nicht gefunden.","warning",6e3),ra(t,{status:"error",id:a,message:"Verknüpfter GPS-Punkt wurde nicht gefunden."});return}ra(t,{status:"pending",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wird aktiviert...`});try{await Bs(r.id),le(`"${r.name||"Ohne Namen"}" wurde aus der Historie aktiviert.`,"success"),Te(`Aus Historie aktiviert: ${r.name||r.id}`),ra(t,{status:"success",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wurde aktiviert.`})}catch(s){const l=s instanceof Error?s.message:"GPS-Punkt konnte nicht aktiviert werden.";le(l,"danger",7e3),Te(`Aktivierung aus Historie fehlgeschlagen: ${l}`),ra(t,{status:"error",id:r.id,name:r.name,message:l})}}async function od(){try{await Go(),Te("Aktiver GPS-Punkt synchronisiert."),le("Aktiver GPS-Punkt wurde synchronisiert.","success")}catch(e){const t=e instanceof Error?e.message:"Aktiver GPS-Punkt konnte nicht ermittelt werden.";le(t,"danger",7e3),Te(`Sync fehlgeschlagen: ${t}`)}}function ld(){if(!$?.formFields)throw new Error("Formular nicht initialisiert");const e=$.formFields.name?.value.trim()||"",t=$.formFields.description?.value.trim()||"",a=$.formFields.source?.value.trim()||"",n=Number($.formFields.latitude?.value),r=Number($.formFields.longitude?.value),s=!!$.formFields.activate?.checked;if(!e)throw new Error("Name darf nicht leer sein.");if(!Number.isFinite(n)||!Number.isFinite(r))throw new Error("Koordinaten sind ungültig.");return{name:e,description:t,latitude:n,longitude:r,source:a,activate:s}}async function cd(e){if(e.preventDefault(),Za.isLocked()){le("Speichern läuft bereits ...","info");return}try{const t=ld();if(Gc(t.latitude,t.longitude)){le("Ein GPS-Punkt mit identischen Koordinaten ist bereits vorhanden.","warning",6e3);return}pa(j().gps,Ue(j().app)),await Uo({name:t.name,description:t.description||null,latitude:t.latitude,longitude:t.longitude,source:t.source||null},{activate:t.activate}),B.success(`GPS-Punkt "${t.name}" gespeichert.`),Te(`GPS-Punkt gespeichert${t.activate?" und aktiv gesetzt":""}: ${t.name}`),$?.form?.reset()}catch(t){const a=t instanceof Error?t.message:"GPS-Punkt konnte nicht gespeichert werden.";B.error(a),Te(`Speichern fehlgeschlagen: ${a}`)}finally{pa(j().gps,Ue(j().app))}}function dd(){if($?.formFields){if(!navigator.geolocation){B.warning("Geolocation wird von diesem Browser nicht unterstützt.");return}if(Za.isLocked()){B.info("Bitte warten...");return}Za.acquire(async()=>(pa(j().gps,Ue(j().app)),new Promise(e=>{navigator.geolocation.getCurrentPosition(t=>{const{latitude:a,longitude:n}=t.coords;$?.formFields.latitude&&($.formFields.latitude.value=a.toFixed(6)),$?.formFields.longitude&&($.formFields.longitude.value=n.toFixed(6)),$?.formFields.source&&!$.formFields.source.value.trim()&&($.formFields.source.value="Browser"),B.success("Koordinaten aus Browser-Position übernommen."),Te("Browser-Geolocation übernommen"),Ga(),pa(j().gps,Ue(j().app)),e()},t=>{const a=t.code===t.PERMISSION_DENIED?"Zugriff auf Standort wurde verweigert.":"Geolocation konnte nicht ermittelt werden.";B.warning(a),Te(`Geolocation fehlgeschlagen: ${a}`),pa(j().gps,Ue(j().app)),e()},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})})))}}function ud(){$&&($.root.addEventListener("click",e=>{const t=e.target;if(!t)return;const a=t.closest('[data-role="gps-tab"]');if(a&&a.dataset.tab){lo(a.dataset.tab);return}const n=t.closest("[data-action]");if(!n||n.dataset.action==="")return;const s=n.closest("[data-point-id]")?.getAttribute("data-point-id")||"";switch(n.dataset.action){case"reload-points":_r({notify:!0});break;case"sync-active":od();break;case"set-active":nd(s);break;case"delete-point":rd(s);break;case"copy-coords":id(s);break;case"use-geolocation":dd();break;case"apply-raw-coords":td();break;case"verify-coords":ad();break}}),$.form?.addEventListener("submit",e=>{cd(e)}),$.form?.addEventListener("reset",()=>{window.setTimeout(()=>{Ga()},0)}),$.formFields.latitude?.addEventListener("input",()=>{Ga()}),$.formFields.longitude?.addEventListener("input",()=>{Ga()}))}function pd(e,t){if(!e||cs)return;cs=!0;const a=e;a.innerHTML="";const n=_c();a.appendChild(n),$=Rc(n),us?.(),us=Gs({section:"gps",event:"gps:data-changed",shouldHandleEvent:()=>Ue(t.state.getState().app)==="ok",shouldRefresh:()=>Ue(t.state.getState().app)==="ok",onRefresh:()=>_r({notify:!1}),onStatusChange:l=>Vc(l)}),Ae=0,sa?.destroy(),sa=null,Or=null,ud(),lo(so),typeof t.events?.subscribe=="function"&&t.events.subscribe("gps:set-active-from-history",l=>{let o="";if(l&&typeof l=="object"&&(o=String(l.id||"").trim()),!o){le("Historische GPS-Anfrage ohne gültige ID erhalten.","warning",6e3);return}sd(o,t)});const r=t.state.getState();Na=r.gps.activePointId;const s=(l,o)=>{const d=Ue(l.app),f=l.gps;if(Zc(d),pi(l,d),pa(f,d),Kc(l),d==="ok"&&!f.initialized&&!f.pending&&_r({notify:!1}),d==="ok"&&ds!=="ok"&&f.initialized&&le("GPS-Bereich ist wieder verfügbar.","success"),ds=d,l.gps.activePointId!==Na&&(Na=l.gps.activePointId,typeof t.events?.emit=="function")){const u=sn(Na);t.events.emit("gps:active-point-changed",{id:Na,point:u})}l.gps.lastError&&l.gps.lastError!==o.gps.lastError&&(le(l.gps.lastError,"danger",7e3),Te(`Fehler: ${l.gps.lastError}`))};t.state.subscribe(s),s(r,r)}let Oe=[],_e=[],Rr=!1,Cn=null;async function mt(){try{const[e,t]=await Promise.all([Yo({limit:100}),Xo({limit:100})]);Oe=e.items||[],_e=t.items||[],Tn("savedCodes:changed",{eppoCount:Oe.length,bbchCount:_e.length})}catch(e){console.error("Failed to load saved codes:",e),Oe=[],_e=[]}}function fd(){const e=Oe.length>0,t=_e.length>0;return`
    <div class="row g-4">
      <!-- EPPO Codes Section -->
      <div class="col-lg-6">
        <div class="card card-dark codes-card h-100">
          <div class="card-header codes-card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="bi bi-flower1 me-2 text-success"></i>
              Kulturen (EPPO-Codes)
            </h5>
            <span class="badge badge-psm-neutral">${Oe.length} gespeichert</span>
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
                  <span class="badge bg-success ms-2">${Oe.length}</span>
                </h6>
                <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${Kr()}
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
            <span class="badge badge-psm-neutral">${_e.length} gespeichert</span>
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
                  <span class="badge bg-info ms-2">${_e.length}</span>
                </h6>
                <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${Wr()}
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
  `}function Kr(){return Oe.length?Oe.map(e=>`
    <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-eppo-id="${g(e.id)}">
      <div class="flex-grow-1">
        ${e.isFavorite?'<i class="bi bi-star-fill text-warning me-2"></i>':""}
        <strong class="text-success">${g(e.code)}</strong>
        <span class="ms-2">${g(e.name)}</span>
        ${e.usageCount>0?`<span class="badge bg-secondary ms-2">${e.usageCount}x</span>`:""}
      </div>
      <div class="btn-group btn-group-sm">
        <button type="button" class="btn btn-outline-warning" data-action="toggle-favorite-eppo" data-id="${g(e.id)}" title="Favorit umschalten">
          <i class="bi bi-star${e.isFavorite?"-fill":""}"></i>
        </button>
        <button type="button" class="btn btn-outline-danger" data-action="delete-eppo" data-id="${g(e.id)}" title="Löschen">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  `).join(""):`
      <div class="list-group-item list-group-item-action text-muted text-center py-4">
        <i class="bi bi-inbox fs-2 d-block mb-2"></i>
        Noch keine EPPO-Codes gespeichert
      </div>
    `}function Wr(){return _e.length?_e.map(e=>`
    <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-bbch-id="${g(e.id)}">
      <div class="flex-grow-1">
        ${e.isFavorite?'<i class="bi bi-star-fill text-warning me-2"></i>':""}
        <strong class="text-info">${g(e.code)}</strong>
        <span class="ms-2">${g(e.label)}</span>
        ${e.usageCount>0?`<span class="badge bg-secondary ms-2">${e.usageCount}x</span>`:""}
      </div>
      <div class="btn-group btn-group-sm">
        <button type="button" class="btn btn-outline-warning" data-action="toggle-favorite-bbch" data-id="${g(e.id)}" title="Favorit umschalten">
          <i class="bi bi-star${e.isFavorite?"-fill":""}"></i>
        </button>
        <button type="button" class="btn btn-outline-danger" data-action="delete-bbch" data-id="${g(e.id)}" title="Löschen">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  `).join(""):`
      <div class="list-group-item list-group-item-action text-muted text-center py-4">
        <i class="bi bi-inbox fs-2 d-block mb-2"></i>
        Noch keine BBCH-Stadien gespeichert
      </div>
    `}function gt(e){const t=e.querySelector('[data-role="saved-eppo-list"]'),a=Oe.length>0;if(t){const o=t.closest(".border-top");o&&a&&(o.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Kulturen
            <span class="badge bg-success ms-2">${Oe.length}</span>
          </h6>
          <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Kr()}
          </div>
        `)}else if(a){const o=e.querySelector(".codes-card:first-child .border-top.pt-3.mb-3");o&&(o.innerHTML=`
        <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
          <i class="bi bi-bookmark-star me-1"></i>
          Meine Kulturen
          <span class="badge bg-success ms-2">${Oe.length}</span>
        </h6>
        <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
          ${Kr()}
        </div>
      `)}const n=e.querySelector('[data-role="saved-bbch-list"]'),r=_e.length>0;if(n){const o=n.closest(".border-top");o&&r&&(o.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${_e.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Wr()}
          </div>
        `)}else if(r){const d=e.querySelectorAll(".codes-card")[1];if(d){const f=d.querySelector(".border-top.pt-3.mb-3");f&&(f.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${_e.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Wr()}
          </div>
        `)}}const s=e.querySelector(".codes-card:first-child .card-header .badge"),l=e.querySelector(".codes-card:last-child .card-header .badge");s&&(s.textContent=`${Oe.length} gespeichert`),l&&(l.textContent=`${_e.length} gespeichert`)}function md(e){const t=e.querySelector('[data-input="eppo-search"]'),a=e.querySelector('[data-role="eppo-search-results"]');if(t&&a){const o=Li(async()=>{const d=t.value.trim();if(d.length<2){a.innerHTML="";return}try{const f=await Qo(d,10);if(!f.length){a.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${g(d)}"</div>
          `;return}a.innerHTML=f.map(u=>`
          <button type="button" class="list-group-item list-group-item-action" 
                  data-action="select-eppo" 
                  data-code="${g(u.code)}" 
                  data-name="${g(u.name)}"
                  data-language="${g(u.language||"")}"
                  data-dtcode="${g(u.dtcode||"")}">
            <strong class="text-success">${g(u.code)}</strong>
            <span class="ms-2">${g(u.name)}</span>
            ${u.dtcode?`<small class="text-muted ms-2">(${g(u.dtcode)})</small>`:""}
          </button>
        `).join("")}catch(f){console.error("EPPO search failed:",f),a.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);t.addEventListener("input",o)}const n=e.querySelector('[data-input="bbch-search"]'),r=e.querySelector('[data-role="bbch-search-results"]');if(n&&r){const o=Li(async()=>{const d=n.value.trim();if(d.length<1){r.innerHTML="";return}try{const f=await Jo(d,10);if(!f.length){r.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${g(d)}"</div>
          `;return}r.innerHTML=f.map(u=>`
          <button type="button" class="list-group-item list-group-item-action d-flex align-items-start gap-2 py-2" 
                  data-action="select-bbch" 
                  data-code="${g(u.code)}" 
                  data-label="${g(u.label)}"
                  data-principal="${u.principalStage??""}"
                  data-secondary="${u.secondaryStage??""}">
            <strong class="text-info flex-shrink-0" style="min-width: 35px;">${g(u.code)}</strong>
            <span class="text-break" style="line-height: 1.4;">${g(u.label)}</span>
          </button>
        `).join("")}catch(f){console.error("BBCH search failed:",f),r.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);n.addEventListener("input",o)}e.dataset.codesClickBound!=="1"&&(e.dataset.codesClickBound="1",e.addEventListener("click",async o=>{const f=o.target.closest("[data-action]");if(!f)return;const u=f.dataset.action;if(u==="select-eppo"){const m=f.dataset.code||"",v=f.dataset.name||"",w=f.dataset.language||"",h=f.dataset.dtcode||"";if(!m||!v){console.warn("EPPO selection missing code or name");return}a&&(a.innerHTML=""),t&&(t.value="");const S=Oe.find(x=>x.code.toUpperCase()===m.toUpperCase());if(S){const x=e.querySelector(`[data-eppo-id="${S.id}"]`);x&&(x.classList.add("flash-highlight"),setTimeout(()=>x.classList.remove("flash-highlight"),800));return}try{await mr({code:m,name:v,language:w||void 0,dtcode:h||void 0,isFavorite:!1});const x=Ye();await Xe(x),await mt(),gt(e)}catch(x){console.error("Failed to save EPPO from search:",x),alert("Speichern fehlgeschlagen")}}if(u==="select-bbch"){const m=f.dataset.code||"",v=f.dataset.label||"",w=f.dataset.principal,h=f.dataset.secondary,S=w?parseInt(w,10):void 0,x=h?parseInt(h,10):void 0;if(!m||!v){console.warn("BBCH selection missing code or label");return}r&&(r.innerHTML=""),n&&(n.value="");const E=_e.find(I=>I.code===m);if(E){const I=e.querySelector(`[data-bbch-id="${E.id}"]`);I&&(I.classList.add("flash-highlight"),setTimeout(()=>I.classList.remove("flash-highlight"),800));return}try{await gr({code:m,label:v,principalStage:Number.isNaN(S)?void 0:S,secondaryStage:Number.isNaN(x)?void 0:x,isFavorite:!1});const I=Ye();await Xe(I),await mt(),gt(e)}catch(I){console.error("Failed to save BBCH from search:",I),alert("Speichern fehlgeschlagen")}}if(u==="toggle-favorite-eppo"){const m=f.dataset.id;if(!m)return;const v=Oe.find(w=>w.id===m);if(!v)return;try{await mr({id:v.id,code:v.code,name:v.name,language:v.language,dtcode:v.dtcode,isFavorite:!v.isFavorite});const w=Ye();await Xe(w),await mt(),gt(e)}catch(w){console.error("Failed to toggle EPPO favorite:",w)}}if(u==="toggle-favorite-bbch"){const m=f.dataset.id;if(!m)return;const v=_e.find(w=>w.id===m);if(!v)return;try{await gr({id:v.id,code:v.code,label:v.label,principalStage:v.principalStage,secondaryStage:v.secondaryStage,isFavorite:!v.isFavorite});const w=Ye();await Xe(w),await mt(),gt(e)}catch(w){console.error("Failed to toggle BBCH favorite:",w)}}if(u==="delete-eppo"){const m=f.dataset.id;if(!m||!confirm("EPPO-Code wirklich löschen?"))return;try{await Vo({id:m});const v=Ye();await Xe(v),await mt(),gt(e)}catch(v){console.error("Failed to delete EPPO:",v)}}if(u==="delete-bbch"){const m=f.dataset.id;if(!m||!confirm("BBCH-Stadium wirklich löschen?"))return;try{await Zo({id:m});const v=Ye();await Xe(v),await mt(),gt(e)}catch(v){console.error("Failed to delete BBCH:",v)}}}));const s=e.querySelector('[data-form="add-eppo"]');s&&s.addEventListener("submit",async o=>{o.preventDefault();const d=e.querySelector('[data-input="eppo-code"]'),f=e.querySelector('[data-input="eppo-name"]'),u=e.querySelector('[data-input="eppo-favorite"]'),m=d?.value.trim(),v=f?.value.trim();if(!m||!v){alert("Bitte Code und Name eingeben");return}try{await mr({code:m,name:v,isFavorite:u?.checked||!1});const w=Ye();await Xe(w),await mt(),gt(e),d&&(d.value=""),f&&(f.value=""),u&&(u.checked=!1)}catch(w){console.error("Failed to save EPPO:",w),alert("Speichern fehlgeschlagen")}});const l=e.querySelector('[data-form="add-bbch"]');l&&l.addEventListener("submit",async o=>{o.preventDefault();const d=e.querySelector('[data-input="bbch-code"]'),f=e.querySelector('[data-input="bbch-label"]'),u=e.querySelector('[data-input="bbch-favorite"]'),m=d?.value.trim(),v=f?.value.trim();if(!m||!v){alert("Bitte Code und Bezeichnung eingeben");return}try{await gr({code:m,label:v,isFavorite:u?.checked||!1});const w=Ye();await Xe(w),await mt(),gt(e),d&&(d.value=""),f&&(f.value=""),u&&(u.checked=!1)}catch(w){console.error("Failed to save BBCH:",w),alert("Speichern fehlgeschlagen")}})}function gd(e,t,a={}){if(!e||Rr)return;Cn=e,Rr=!0,Cn.innerHTML=`
    <div class="section-inner codes-manager">
      <h4 class="mb-3"><i class="bi bi-tags me-2"></i>EPPO & BBCH Codes</h4>
      ${fd()}
    </div>`;const n=Cn.querySelector(".codes-manager");if(!n)return;md(n);const r=async()=>{await mt(),gt(n)};t?.events?.subscribe?.("database:connected",()=>{r()}),t?.state?.getState?.().app?.hasDatabase&&r()}function bd(){Rr=!1,Cn=null}let fs=!1,vt=null,_a=null,In=null,Ra=null,Kt=null,Wn=null,yt=null,en=null,jn=null,kt=null,jr=null,bt=null,Pe=new Set,Mt=null,wr=!1,xr=!1,fa=!1;const at=e=>je(e.mediums),Bn=25,Sr=new Intl.NumberFormat("de-DE");let Fe=0,oa=null,Gr=null,Ur=null,fi=null;function hd(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function vd(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`profile-${Date.now()}-${Math.random().toString(16).slice(2,10)}`}function uo(e){if(!Pe.size)return;const t=new Set(at(e).map(n=>n.id));let a=!1;Pe.forEach(n=>{t.has(n)||(Pe.delete(n),a=!0)}),a&&(Pe=new Set(Pe))}function Gn(){vt&&vt.querySelectorAll('[data-role="profile-select"]').forEach(e=>{const t=e.dataset.mediumId;e.checked=!!(t&&Pe.has(t))})}function Ct(e){const t=at(e).length,a=Pe.size;let n="Noch keine Mittel ausgewählt.";t?a===t&&t>0?n=`${a} Mittel ausgewählt (alle).`:a>0&&(n=`${a} Mittel ausgewählt.`):n="Keine Mittel vorhanden.",jr&&(jr.textContent=n),bt&&(bt.disabled=t===0,bt.indeterminate=a>0&&a<t,bt.checked=t>0&&a===t)}function Nn(e){Mt=null,Wn&&Wn.reset(),en&&(en.value=""),yt&&(yt.value=""),kt&&(kt.textContent="Profil speichern"),Pe=new Set,Gn(),Ct(e)}function yd(e,t){Mt=e.id,en&&(en.value=e.id),yt&&(yt.value=e.name,yt.focus()),kt&&(kt.textContent="Profil aktualisieren"),Pe=new Set(e.mediumIds),Gn(),Ct(t)}function ms(e,t){if(kt){if(kt.disabled=e,e){kt.textContent=t||"Speichert...";return}kt.textContent=Mt?"Profil aktualisieren":"Profil speichern"}}function Un(e,t){if(_a){if(_a.disabled=e,e){_a.textContent=t||"Speichert...";return}_a.textContent="Hinzufügen"}}async function kd(e,t,a){if(fa)return;const n=t.state.getState(),s=(at(n)[e]??null)?.id||null;fa=!0,Un(!0);const l=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediums",d=>{const f=tn(d),u=f.items.slice();return u.splice(e,1),{...f,items:u,totalCount:Math.min(f.totalCount,u.length),lastUpdatedAt:new Date().toISOString()}}),await Vn({silent:!0})&&s&&t.events?.emit?.("mediums:data-changed",{action:"deleted",id:s})}finally{fa=!1,Un(!1),a&&a.isConnected&&(a.disabled=!1,a.textContent=l??"Löschen")}}async function wd(e,t,a){const n=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediumProfiles",(r=[])=>r.filter(s=>s.id!==e.id)),Mt===e.id&&Nn(t.state.getState()),await Vn({successMessage:"Profil gelöscht."})}finally{a&&(a.disabled=!1,a.textContent=n||"Löschen")}}function xd(e){if(!jn)return;const t=jn,a=e.mediumProfiles||[];if(!a.length){t.innerHTML=`
      <tr>
        <td colspan="3" class="text-center text-muted">Noch keine Profile erstellt.</td>
      </tr>
    `;return}const n=new Map(at(e).map(r=>[r.id,r]));t.innerHTML="",a.forEach(r=>{const s=document.createElement("tr"),l=r.mediumIds.map(d=>n.get(d)).filter(Boolean).map(d=>g(d.name)),o=l.length?l.join(", "):'<span class="text-muted">Keine gültigen Mittel</span>';s.innerHTML=`
      <td>${g(r.name)}</td>
      <td>${o}</td>
      <td>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-sm btn-outline-info" data-action="profile-edit" data-id="${g(r.id)}">Bearbeiten</button>
          <button class="btn btn-sm btn-outline-danger" data-action="profile-delete" data-id="${g(r.id)}">Löschen</button>
        </div>
      </td>
    `,t.appendChild(s)})}function Sd(e,t){if(wr||!e.mediumProfiles?.length)return;const a=new Set(at(e).map(s=>s.id));let n=!1;const r=e.mediumProfiles.map(s=>{const l=s.mediumIds.filter(o=>a.has(o));return l.length!==s.mediumIds.length?(n=!0,{...s,mediumIds:l,updatedAt:new Date().toISOString()}):s}).filter(s=>s.mediumIds.length?!0:(n=!0,!1));n&&(wr=!0,t.state.updateSlice("mediumProfiles",()=>r),wr=!1)}function po(e){if(!e)return Fe=0,{start:0,end:0,total:0};const t=Math.max(Math.ceil(e/Bn),1);Fe>=t&&(Fe=t-1),Fe<0&&(Fe=0);const a=Fe*Bn,n=Math.min(a+Bn,e);return{start:a,end:n,total:e}}function Ed(){if(!Ur)return null;const e=Ur.querySelector('[data-role="mediums-pager"]');return e?((!oa||Gr!==e)&&(oa?.destroy(),oa=nn(e,{onPrev:()=>Ld(),onNext:()=>Dd(),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Mittel...",empty:"Keine Mittel verfügbar"}}),Gr=e),oa):null}function gs(e){const t=Ed();if(!t)return;const a=at(e).length;if(!a){Fe=0,t.update({status:"disabled",info:"Noch keine Mittel gespeichert."});return}const{start:n,end:r}=po(a),s=`Mittel ${Sr.format(n+1)}–${Sr.format(r)} von ${Sr.format(a)}`;t.update({status:"ready",info:s,canPrev:Fe>0,canNext:r<a})}function Ld(){if(Fe===0)return;const e=fi?.state.getState();e&&(Fe=Math.max(Fe-1,0),mi(e))}function Dd(){const e=fi?.state.getState();if(!e)return;const t=at(e).length;if(!t)return;const a=Math.max(Math.ceil(t/Bn)-1,0);Fe>=a||(Fe=Math.min(Fe+1,a),mi(e))}function mi(e){if(!vt)return;uo(e);const t=new Map(e.measurementMethods.map(l=>[l.id,l])),a=at(e).length;if(!a){vt.innerHTML=`
      <tr>
        <td colspan="9" class="text-center text-muted">Noch keine Mittel gespeichert.</td>
      </tr>
    `,Ct(e),gs(e);return}const{start:n,end:r}=po(a),s=at(e).slice(n,r);vt.innerHTML="",s.forEach((l,o)=>{const d=n+o,f=document.createElement("tr"),u=t.get(l.methodId),m=l.approval||l.zulassungsnummer,v=typeof m=="string"&&m.trim().length?g(m):"-",w=typeof l.wartezeit=="string"&&l.wartezeit.trim().length?g(l.wartezeit):typeof l.wartezeit=="number"?`${l.wartezeit} Tage`:"-",h=typeof l.wirkstoff=="string"&&l.wirkstoff.trim().length?g(l.wirkstoff):"-";f.innerHTML=`
      <td class="text-center">
        <input type="checkbox" class="form-check-input" data-role="profile-select" data-medium-id="${g(l.id)}" ${Pe.has(l.id)?"checked":""} />
      </td>
      <td>${g(l.name)}</td>
      <td>${g(l.unit)}</td>
      <td>${g(u?u.label:l.method||l.methodId||"-")}</td>
      <td>${g(l.value!=null?String(l.value):"")}</td>
      <td>${v}</td>
      <td>${w}</td>
      <td>${h}</td>
      <td>
        <button class="btn btn-sm btn-danger" data-action="delete" data-index="${d}">Löschen</button>
      </td>
    `,vt?.appendChild(f)}),Ct(e),gs(e)}function bs(e){if(!Ra)return;const t=new Set;Ra.innerHTML="",e.measurementMethods.forEach(a=>{const n=(a.label??"").toLowerCase(),r=(a.id??"").toLowerCase();if(n&&!t.has(n)){t.add(n);const s=document.createElement("option");s.value=a.label,Ra.appendChild(s)}if(r&&!t.has(r)){t.add(r);const s=document.createElement("option");s.value=a.id,Ra.appendChild(s)}})}function $d(e){const t=e.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t||`method-${Date.now()}-${Math.random().toString(16).slice(2,6)}`}function zd(e,t){if(!In)return null;const a=In.value.trim();if(!a)return window.alert("Bitte eine Methode angeben."),In.focus(),null;const n=e.measurementMethods.find(o=>o.label?.toLowerCase()===a.toLowerCase()||o.id?.toLowerCase()===a.toLowerCase());if(n)return n.id;const r=$d(a),s=e.fieldLabels?.calculation?.fields?.quantity?.unit||"Kiste",l={id:r,label:a,type:"factor",unit:s,requires:["areaHa"],config:{sourceField:"areaHa"}};return t.state.updateSlice("measurementMethods",o=>[...o,l]),r}async function Vn(e){try{const t=Ye();return await Xe(t),e?.silent||window.alert(e?.successMessage??"Änderungen wurden gespeichert."),!0}catch(t){console.error("Fehler beim Speichern",t);const a=t instanceof Error?t.message:"Speichern fehlgeschlagen";return window.alert(a),!1}}function Ad(e,t){const a=!!t.app?.hasDatabase,n=t.app?.activeSection==="settings";e.classList.toggle("d-none",!(a&&n))}function Pd(e,t){if(!e||fs)return;const a=e;a.innerHTML="";const n=hd();a.appendChild(n),Ur=n,fi=t,Fe=0,oa?.destroy(),oa=null,Gr=null,vt=n.querySelector("#settings-mediums-table tbody"),In=n.querySelector('input[name="medium-method"]'),Ra=n.querySelector("#settings-method-options"),Kt=n.querySelector("#settings-medium-form"),_a=Kt?Kt.querySelector('button[type="submit"]'):null,Wn=n.querySelector("#settings-profile-form"),yt=n.querySelector("#profile-name"),en=n.querySelector('input[name="profile-id"]'),jn=n.querySelector("#settings-profile-table tbody"),kt=n.querySelector('[data-role="profile-submit"]'),jr=n.querySelector('[data-role="profile-selection-summary"]'),bt=n.querySelector('[data-role="profile-select-all"]');let r=!1,s=!1;function l(u){if(n.querySelectorAll("[data-settings-tab]").forEach(m=>{const v=m.dataset.settingsTab===u;m.classList.toggle("active",v)}),n.querySelectorAll("[data-pane]").forEach(m=>{const v=m.dataset.pane===u;m.style.display=v?"block":"none"}),u==="gps"&&!r){const m=n.querySelector('[data-feature="gps-embedded"]');m&&(pd(m,t),r=!0)}if(u==="codes"&&!s){const m=n.querySelector('[data-feature="codes-embedded"]');m&&(bd(),gd(m,{state:t.state,events:{subscribe:t.events?.subscribe}},{}),s=!0)}}n.querySelectorAll("[data-settings-tab]").forEach(u=>{u.addEventListener("click",()=>{const m=u.dataset.settingsTab;m&&l(m)})});async function o(){if(!Kt||fa)return;const u=t.state.getState(),m=new FormData(Kt),v=(m.get("medium-name")||"").toString().trim(),w=(m.get("medium-unit")||"").toString().trim(),h=m.get("medium-value"),S=Number(h),x=(m.get("medium-approval")||"").toString().trim(),E=m.get("medium-wartezeit"),I=E?Number(E):null,U=(m.get("medium-wirkstoff")||"").toString().trim()||null;if(!v||!w||Number.isNaN(S)){window.alert("Bitte alle Felder korrekt ausfüllen.");return}const K=zd(u,t);if(!K)return;const he=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`medium-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,F={id:he,name:v,unit:w,methodId:K,value:S,zulassungsnummer:x||null,wartezeit:I!=null&&!Number.isNaN(I)?I:null,wirkstoff:U};fa=!0,Un(!0,"Speichere...");try{t.state.updateSlice("mediums",q=>{const D=tn(q),A=[...D.items,F];return{...D,items:A,totalCount:A.length,lastUpdatedAt:new Date().toISOString()}}),bs(t.state.getState()),await Vn({successMessage:"Mittel gespeichert.",silent:!0})&&(Kt.reset(),t.events?.emit?.("mediums:data-changed",{action:"created",id:he}))}finally{fa=!1,Un(!1)}}Kt?.addEventListener("submit",u=>{u.preventDefault(),o()}),vt?.addEventListener("click",u=>{const m=u.target?.closest('[data-action="delete"]');if(!m)return;const v=Number(m.dataset.index);Number.isNaN(v)||kd(v,t,m)}),vt?.addEventListener("change",u=>{const m=u.target;if(!m||m.dataset.role!=="profile-select")return;const v=m.dataset.mediumId;if(!v)return;m.checked?Pe.add(v):Pe.delete(v);const w=t.state.getState();Ct(w)}),bt?.addEventListener("change",()=>{const u=t.state.getState();bt&&(bt.indeterminate=!1,bt.checked?Pe=new Set(at(u).map(m=>m.id)):Pe=new Set,Gn(),Ct(u))});const d=async()=>{if(!yt)return;const u=yt.value.trim();if(!u){window.alert("Bitte einen Profilnamen eingeben."),yt.focus();return}if(!Pe.size){window.alert("Bitte mindestens ein Mittel auswählen.");return}const m=t.state.getState();if(m.mediumProfiles?.some(x=>x.name.toLowerCase()===u.toLowerCase()&&x.id!==Mt)){window.alert("Ein Profil mit diesem Namen existiert bereits.");return}const w=at(m).filter(x=>Pe.has(x.id)).map(x=>x.id);if(!w.length){window.alert("Ausgewählte Mittel sind nicht mehr verfügbar. Bitte Auswahl prüfen."),uo(m),Gn(),Ct(m);return}if(xr)return;const h=!!Mt;xr=!0,ms(!0,h?"Aktualisiere...":"Speichere...");const S=new Date().toISOString();try{if(Mt)t.state.updateSlice("mediumProfiles",(E=[])=>E.map(I=>I.id===Mt?{...I,name:u,mediumIds:w,updatedAt:S}:I));else{const E={id:vd(),name:u,mediumIds:w,createdAt:S,updatedAt:S};t.state.updateSlice("mediumProfiles",(I=[])=>[...I,E])}await Vn({successMessage:h?"Profil aktualisiert und gespeichert.":"Profil gespeichert."})&&Nn(t.state.getState())}finally{xr=!1,ms(!1)}};Wn?.addEventListener("submit",u=>{u.preventDefault(),d()}),jn?.addEventListener("click",u=>{const m=u.target?.closest('[data-action^="profile-"]');if(!m)return;const v=m.dataset.id;if(!v)return;const w=t.state.getState();if(m.dataset.action==="profile-edit"){const h=w.mediumProfiles?.find(S=>S.id===v);h&&yd(h,w);return}if(m.dataset.action==="profile-delete"){const h=w.mediumProfiles?.find(S=>S.id===v);if(!h||!window.confirm(`Profil "${h.name}" wirklich löschen?`))return;wd(h,t,m)}}),n.querySelector('[data-action="profile-reset"]')?.addEventListener("click",()=>{Nn(t.state.getState())}),Nn(t.state.getState());const f=u=>{Sd(u,t),Ad(n,u),u.app.activeSection==="settings"&&(mi(u),bs(u),xd(u),Ct(u))};t.state.subscribe(f),f(t.state.getState()),fs=!0}const Fa=e=>g(e),Er=(e,t=1)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function ma(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function Md(e){if(!e)return"";const t=new Date(e);if(Number.isNaN(t.getTime()))return g(e);const a=Math.round((t.getTime()-Date.now())/864e5);return a<0?`<span style="color:#ef4444;">${ma(e)} · abgelaufen</span>`:a<180?`<span style="color:#f59e0b;">${ma(e)} · ${a} T</span>`:`<span class="calc-hint">${ma(e)}</span>`}function Cd(){return`
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
    </section>`}function Id(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Cd();const a=e.querySelector('[data-role="lager-uebersicht"]'),n=e.querySelector('[data-role="lager-bewegungen"]'),r=e.querySelector('[data-role="lager-form"]'),s=e.querySelector("#lager-mittel-options"),l=e.querySelector('[data-role="lager-empty"]'),o=new Map,d=w=>{if(a){if(!w.length){a.innerHTML='<tr><td colspan="6" class="calc-hint" style="padding:14px;">Noch keine Mittel. Erfasse unten einen Zugang oder dokumentiere Anwendungen in „Neu erfassen".</td></tr>';return}a.innerHTML=w.map(h=>{const S=h.bestand<0?"#ef4444":h.bestand===0?"#f59e0b":"inherit",x=g(h.einheit||"");return`<tr>
          <td><span class="fw-semibold">${g(h.name)}</span>${h.kennr?`<span class="d-block calc-hint">${g(h.kennr)}</span>`:""}</td>
          <td class="calc-hint">${g(h.wirkstoff||"")}</td>
          <td class="text-end">${Er(h.verbraucht)} ${x}<span class="d-block calc-hint">${h.anwendungen} Anw.</span></td>
          <td class="text-end fw-semibold" style="color:${S};">${Er(h.bestand)} ${x}</td>
          <td>${Md(h.zulEnde)}</td>
          <td class="calc-hint">${h.naechsterAblauf?ma(h.naechsterAblauf):""}</td>
        </tr>`}).join("")}},f=w=>{if(n){if(!w.length){n.innerHTML='<div class="calc-hint">Keine Bewegungen erfasst.</div>';return}n.innerHTML=w.map(h=>`
        <div class="d-flex align-items-center gap-2 py-1" style="border-bottom:1px solid var(--border-1);">
          <span class="badge" style="background:${h.typ==="zugang"?"#16a34a":"#64748b"};">${g(h.typ)}</span>
          <span class="flex-grow-1">${g(h.mittelName)} · <b>${Er(h.menge)} ${g(h.einheit||"")}</b>${h.charge?` · Charge ${g(h.charge)}`:""}<span class="d-block calc-hint">${ma(h.datum)}${h.lieferant?" · "+g(h.lieferant):""}${h.ablauf?" · Ablauf "+ma(h.ablauf):""}</span></span>
          <button class="btn btn-sm" style="color:#ef4444;border:1px solid var(--border-1);background:transparent;" data-del="${Fa(h.id)}" title="Löschen">×</button>
        </div>`).join(""),n.querySelectorAll("[data-del]").forEach(h=>{h.addEventListener("click",async()=>{const S=h.getAttribute("data-del")||"";try{await al({id:S}),await tt().catch(()=>{}),await m()}catch{B.warning("Löschen fehlgeschlagen.")}})})}},u=()=>{s&&(s.innerHTML=Array.from(o.entries()).sort((w,h)=>w[0].localeCompare(h[0],"de")).map(([w,h])=>`<option value="${Fa(w)}" data-kennr="${Fa(h.kennr||"")}" data-einheit="${Fa(h.einheit||"")}" data-wirkstoff="${Fa(h.wirkstoff||"")}"></option>`).join(""))},m=async()=>{if(de()!=="sqlite"){l&&(l.textContent="Bitte zuerst eine Datenbank öffnen.");return}try{const[w,h,S]=await Promise.all([Ns(),tl(),Fs()]);d(w?.rows||[]),f(h?.rows||[]),o.clear(),(S?.rows||[]).forEach(x=>{x.name&&o.set(x.name,{kennr:x.kennr??null,einheit:x.einheit??null,wirkstoff:x.wirkstoff??null})}),(w?.rows||[]).forEach(x=>{x.name&&!o.has(x.name)&&o.set(x.name,{kennr:x.kennr??null,einheit:x.einheit??null,wirkstoff:x.wirkstoff??null})}),u()}catch(w){console.warn("[Lager] Laden fehlgeschlagen:",w)}};r?.addEventListener("submit",async w=>{if(w.preventDefault(),de()!=="sqlite"){B.warning("Bitte zuerst eine Datenbank öffnen.");return}const h=new FormData(r),S=String(h.get("mittel")||"").trim(),x=Number(String(h.get("menge")||"").replace(",","."));if(!S||!Number.isFinite(x)){B.warning("Mittel und Menge angeben.");return}const E=String(h.get("preis")||"").trim();try{await el({mittelName:S,kennr:String(h.get("kennr")||"").trim()||null,wirkstoff:o.get(S)?.wirkstoff||null,typ:String(h.get("typ")||"zugang"),menge:x,einheit:String(h.get("einheit")||"").trim()||null,datum:String(h.get("datum")||"").trim()||null,charge:String(h.get("charge")||"").trim()||null,ablauf:String(h.get("ablauf")||"").trim()||null,lieferant:String(h.get("lieferant")||"").trim()||null,preis:E?Number(E.replace(",",".")):null}),await tt().catch(()=>{}),r.reset(),B.success("Bewegung gespeichert."),await m()}catch{B.warning("Speichern fehlgeschlagen.")}});const v=e.querySelector('[name="mittel"]');v?.addEventListener("change",()=>{const w=o.get(v.value);if(!w)return;const h=e.querySelector('[name="einheit"]'),S=e.querySelector('[name="kennr"]');h&&w.einheit&&(h.value=w.einheit),S&&w.kennr&&(S.value=w.kennr)}),t.state.subscribe(w=>{w?.app?.activeSection==="lager"&&m()}),m()}const Zn={mechanisch:{label:"Mechanisch",icon:"bi-tools",color:"#2563eb"},chemisch_psm:{label:"Pflanzenschutz",icon:"bi-droplet-half",color:"#dc2626"},duengung:{label:"Düngung",icon:"bi-flower1",color:"#b45309"},nuetzlinge:{label:"Nützlinge",icon:"bi-bug",color:"#7c3aed"},bewaesserung:{label:"Bewässerung",icon:"bi-moisture",color:"#0891b2"},monitoring:{label:"Monitoring",icon:"bi-eye",color:"#475569"},sonstiges:{label:"Sonstiges",icon:"bi-three-dots",color:"#64748b"}},Bd=["mechanisch","chemisch_psm","duengung","nuetzlinge","bewaesserung","monitoring","sonstiges"];function fo(e){return Zn[e]||Zn.sonstiges}const Nd={geplant:{label:"geplant",color:"#64748b"},aktiv:{label:"aktiv",color:"#16a34a"},abgeschlossen:{label:"abgeschlossen",color:"#94a3b8"}},Gt=["#16a34a","#0891b2","#7c3aed","#d97706","#dc2626","#0d9488","#65a30d","#db2777"],Fd=/^#[0-9a-fA-F]{3,8}$/;function mo(e){return typeof e=="string"&&Fd.test(e.trim())?e.trim():null}function ga(e,t=0){return mo(e&&e.color)||Gt[t%Gt.length]}function st(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function Le(e){if(!e)return NaN;const t=String(e).slice(0,10).replace(/-/g,""),a=Number(t);return Number.isFinite(a)?a:NaN}function la(e){const t=[...e||[]].sort((s,l)=>(Le(s.pflanzDatum)||0)-(Le(l.pflanzDatum)||0)),a=Number(st().replace(/-/g,""));let n=t.find(s=>s.status==="aktiv")||null;if(!n){const s=t.filter(l=>l.status!=="abgeschlossen"&&Le(l.pflanzDatum)<=a&&(!l.ernteDatum||Le(l.ernteDatum)>=a));n=s.length?s[s.length-1]:null}let r=t.filter(s=>s!==n&&s.status!=="abgeschlossen"&&Le(s.pflanzDatum)>a).sort((s,l)=>(Le(s.pflanzDatum)||0)-(Le(l.pflanzDatum)||0))[0]||null;return r||(r=t.filter(s=>s!==n&&s.status==="geplant").sort((s,l)=>(Le(s.pflanzDatum)||0)-(Le(l.pflanzDatum)||0))[0]||null),{current:n,next:r,all:t}}const go=["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];function bo(e,t){const a=[];let n=e.getFullYear(),r=e.getMonth();const s=t.getFullYear(),l=t.getMonth();let o=0;for(;(n<s||n===s&&r<=l)&&o<60;)a.push({y:n,m:r}),r++,r>11&&(r=0,n++),o++;return a}function Ke(e,t){if(!t||!e.length)return null;const a=new Date(String(t).slice(0,10)+"T00:00:00");if(isNaN(a.getTime()))return null;const n=e.length,r=a.getFullYear()*12+a.getMonth(),s=e[0].y*12+e[0].m,l=e[n-1].y*12+e[n-1].m;if(r<s)return 0;if(r>l)return 1;const o=r-s,d=new Date(a.getFullYear(),a.getMonth()+1,0).getDate();return(o+(a.getDate()-1)/d)/n}const Td={anzucht:{label:"Anzucht (vorziehen)",short:"Anzucht"},direkt:{label:"Direktsaat",short:"Direkt"}},qd=["Pflanzen","m²","Beete","lfd. m","g Saatgut"];function ht(e,t){if(!e)return null;const a=new Date(String(e).slice(0,10)+"T00:00:00");return isNaN(a.getTime())?null:(a.setDate(a.getDate()+Math.round(Number(t)||0)),a.getFullYear()+"-"+String(a.getMonth()+1).padStart(2,"0")+"-"+String(a.getDate()).padStart(2,"0"))}function Hd(e,t,a){if(!e||!a)return{};const r=(e.anbauMethode==="anzucht"?"anzucht":"direkt")==="anzucht"&&Number(e.anzuchtTage)||0,s=Number(e.kulturTage)||0,l=Number(e.ernteTage)||0;let o;t==="aussaat"?o=ht(a,r):t==="ernte"?o=s?ht(a,-s):a:o=a;const d=ht(o,-r),f=s?ht(o,s):null,u=f?ht(f,l):null;return{aussaatDatum:d,pflanzDatum:o,ernteVon:f,ernteBis:u}}function Od(e,t){return e?{aussaatDatum:ht(e.aussaatDatum,t),pflanzDatum:ht(e.pflanzDatum,t),ernteVon:ht(e.ernteVon,t),ernteBis:ht(e.ernteBis,t)}:{}}function En(e,t){if(!t||!Array.isArray(e))return null;const a=String(t).trim().toLowerCase();return a&&(e.find(n=>String(n.name||"").trim().toLowerCase()===a)||e.find(n=>{const r=String(n.name||"").trim().toLowerCase();return r&&(r.startsWith(a)||a.startsWith(r))}))||null}const zt=["#ef4444","#3b82f6","#a855f7","#f59e0b","#06b6d4","#ec4899","#84cc16","#14b8a6"],_d=()=>({bedW:1.2,pathW:.4,rowSp:.5,inRowSp:.4,angle:0}),X=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";let ne=null,Ee=null,_=null,Ln=!1,Wt=[];function hs(){if(!_)return 1;const e=_.getCenter().lat;return 156543.03392*Math.cos(e*Math.PI/180)/Math.pow(2,_.getZoom())}function Rd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Kd();const a=[];let n=null;const r=new Map;let s=null,l=null,o={sat:null,osm:null},d=!0,f=!0,u=[],m=[];const v=(i,c)=>u.filter(p=>p.flaecheTyp===i&&String(p.flaecheId)===String(c)),w=(i,c)=>m.filter(p=>p.flaecheTyp===i&&String(p.flaecheId)===String(c));function h(i){const c=la(v("acker",i.id)).current;return c&&c.kultur?{name:c.kultur,color:ga(c)}:i.kultur?{name:i.kultur,color:null}:null}function S(){const i=[];if(a.forEach(y=>{const b=y.latlngs||[];if(b.length<3)return;const M=b.map(ve=>[Number(ve[1]),Number(ve[0])]),C=M[0],Y=M[M.length-1];(C[0]!==Y[0]||C[1]!==Y[1])&&M.push([C[0],C[1]]),i.push({type:"Feature",geometry:{type:"Polygon",coordinates:[M]},properties:{name:y.name||"",kultur:y.kultur||null,eppoCode:y.eppoCode||null,flaeche_m2:Math.round(y.result?.areaM2||0),flaeche_ha:Number(((y.result?.areaM2||0)/1e4).toFixed(4)),beete:y.result?.beds?.length||0,beetmeter_m:Math.round(y.result?.bedMeters||0),pflanzen:y.result?.plants||0,bettbreite_m:y.params?.bedW??null,wegbreite_m:y.params?.pathW??null,reihenabstand_m:y.params?.rowSp??null,pflanzabstand_m:y.params?.inRowSp??null,ausrichtung_grad:y.params?.angle??null}})}),(je(t.state.getState().gps?.points)||[]).forEach(y=>{const b=Number(y.latitude),M=Number(y.longitude);if(!Number.isFinite(b)||!Number.isFinite(M))return;const C=Number(y.nutzflaecheQm);i.push({type:"Feature",geometry:{type:"Point",coordinates:[M,b]},properties:{name:y.name||"Standort",typ:"standort",flaeche_m2:Number.isFinite(C)&&C>0?Math.round(C):null,kind:y.kind||null}})}),!i.length){B.warning("Keine Flächen oder Standorte zum Exportieren.");return}const p={type:"FeatureCollection",name:"PSM Acker-Planer",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:i};try{const y=new Blob([JSON.stringify(p,null,2)],{type:"application/geo+json"}),b=URL.createObjectURL(y),M=document.createElement("a");M.href=b,M.download="acker-flaechen.geojson",document.body.appendChild(M),M.click(),M.remove(),setTimeout(()=>URL.revokeObjectURL(b),1e3),B.success(`${i.length} Objekt(e) als GeoJSON exportiert.`)}catch(y){console.error("[Acker] GeoJSON-Export fehlgeschlagen",y),B.error("Export fehlgeschlagen.")}}function x(){if(!ne||!s)return;s.clearLayers(),(je(t.state.getState().gps?.points)||[]).forEach(c=>{const p=Number(c.latitude),y=Number(c.longitude);if(!Number.isFinite(p)||!Number.isFinite(y))return;const b=Number(c.nutzflaecheQm),M=Number.isFinite(b)&&b>0?`${Math.round(b)} m²`:"",C=c.name||"Standort",Y=ne.marker([p,y],{icon:ne.divIcon({className:"acker-standort",html:'<span class="acker-standort-dot"></span>',iconSize:[16,16],iconAnchor:[8,8]})});Y.bindTooltip(`${g(C)}${M?" · "+M:""}`,{permanent:!0,direction:"top",className:"acker-standort-label",offset:[0,-9]}),Y.on("click",()=>xe({typ:"haus",id:c.id,name:C,area:Number.isFinite(b)&&b>0?b:0,latlng:[p,y]})),s.addLayer(Y)})}const E=i=>e.querySelector(i),I=E('[data-role="acker-list"]'),U=E('[data-role="acker-empty"]'),K=E('[data-role="acker-totals"]'),he=E('[data-role="acker-map"]'),F=i=>({id:i.id,name:i.name,kultur:i.kultur||null,eppoCode:i.eppoCode||null,standortId:i.standortId||null,color:i.color,latlngs:i.latlngs,areaQm:i.result?.areaM2||0,bedW:i.params.bedW,pathW:i.params.pathW,rowSp:i.params.rowSp,inRowSp:i.params.inRowSp,angle:i.params.angle,beds:i.result?.beds?.length||0,bedMeters:i.result?.bedMeters||0,plants:i.result?.plants||0}),Q=(i,c=!1)=>{if(de()!=="sqlite")return;const p=async()=>{try{const y=await rl(F(i));y?.id&&(i.id=y.id),await tt().catch(()=>{})}catch(y){console.warn("[Acker] Speichern fehlgeschlagen:",y)}};if(c){p();return}clearTimeout(r.get(i._key)),r.set(i._key,setTimeout(p,600))};function q(i,c){const p=i.map(ft=>[ft[1],ft[0]]);if(p.length<3)return{areaM2:0,beds:[],bedMeters:0,plants:0};const y=p[0],b=p[p.length-1];if((y[0]!==b[0]||y[1]!==b[1])&&p.push(y.slice()),p.length<4)return{areaM2:0,beds:[],bedMeters:0,plants:0};let M;try{M=Ee.polygon([p])}catch{return{areaM2:0,beds:[],bedMeters:0,plants:0}}const C=Ee.area(M),Y=c.bedW+c.pathW;if(Y<=0||c.bedW<=0||c.rowSp<=0||c.inRowSp<=0)return{areaM2:C,beds:[],bedMeters:0,plants:0};const ve=Ee.centroid(M),oe=Ee.transformRotate(M,-c.angle,{pivot:ve}),Se=Ee.bbox(oe),Je=1/111320,it=Y*Je,xo=c.bedW*Je,Aa=(Se[2]-Se[0])*.02+1e-4,hi=[];let vi=0,yi=0,ki=0;for(let ft=Se[1];ft<Se[3]&&ki<4e3;ft+=it,ki++){const wi=Math.min(ft+xo,Se[3]),So=Ee.polygon([[[Se[0]-Aa,ft],[Se[2]+Aa,ft],[Se[2]+Aa,wi],[Se[0]-Aa,wi],[Se[0]-Aa,ft]]]);let gn=null;try{gn=Ee.intersect(oe,So)}catch{gn=null}if(!gn)continue;let cr;try{cr=Ee.transformRotate(gn,c.angle,{pivot:ve})}catch{continue}const dr=Ee.area(cr);if(dr<Math.max(.4,c.bedW*.3))continue;const ur=dr/c.bedW,pr=Math.max(1,Math.floor(c.bedW/c.rowSp)),fr=Math.max(0,Math.floor(ur/c.inRowSp));vi+=ur,yi+=pr*fr,hi.push({geo:cr,lenM:ur,rows:pr,perRow:fr,plants:pr*fr,areaM2:dr})}return{areaM2:C,beds:hi,bedMeters:vi,plants:yi}}const D=(i,c,p)=>({color:i.color,weight:c?3.5:2.5,fillColor:i.color,fillOpacity:p?0:c?.3:.18,dashArray:null}),A=(i,c,p)=>({color:"#ffffff",weight:p?1:.7,opacity:.9,fillColor:i.color,fillOpacity:p?.9:.78});function ee(i){if(!f||i.bedsHidden)return!1;const c=hs(),p=(i.params?.bedW||0)/c,y=(i.params?.pathW||0)/c,b=(i.params?.pathW||0)<=.001||y>=1.2;return p>=4&&b}function ie(i){i.outline&&(_.removeLayer(i.outline),i.outline=null),i.bedsLayer&&(_.removeLayer(i.bedsLayer),i.bedsLayer=null),i.label&&l&&(l.removeLayer(i.label),i.label=null),Me(i)}function te(i){const c=!!i.editing;i.outline&&_.removeLayer(i.outline),i.bedsLayer&&(_.removeLayer(i.bedsLayer),i.bedsLayer=null),i.label&&l&&l.removeLayer(i.label),Me(i);const p=i._key===n,y=ee(i);i._lastDetail=y,y&&(i.bedsLayer=ne.layerGroup(),(i.result?.beds||[]).forEach((b,M)=>{const C=ne.geoJSON(b.geo,{style:A(i,M,p),bubblingMouseEvents:!1});C.bindTooltip(`Beet ${M+1} · ${X(b.lenM,1)} m · ${b.rows}×${X(b.perRow)} = ${X(b.plants)} Pfl.`,{sticky:!0}),C.on("click",()=>Re(i._key)),C.on("contextmenu",Y=>T(i,Y,M+1)),C.addTo(i.bedsLayer)}),i.bedsLayer.addTo(_)),i.outline=ne.polygon(i.latlngs,{...D(i,p,y),className:p?"acker-outline-grab":"",bubblingMouseEvents:!1}).addTo(_),i.outline.on("click",()=>{Re(i._key),xe({typ:"acker",id:i.id,name:i.name,area:i.result?.areaM2||0,fieldRef:i})}),i.outline.on("dblclick",()=>Lt(i)),i.outline.on("contextmenu",b=>T(i,b)),i.outline.on("mousedown",b=>Ne(i,b)),ye(i,p),(p||c)&&ut(i)}function ye(i,c){if(!d||!l||!i.outline)return;let p;try{p=i.outline.getBounds().getCenter()}catch{return}const y=i.result?.plants||0,b=h(i),M=b?`<em class="cr" style="--cc:${g(b.color||"#16a34a")}"><span class="dot"></span>${g(b.name)}</em>`:"",C=`<div class="acker-flabel${c?" sel":""}" style="--fc:${i.color}"><b>${g(i.name||"")}</b>${M}<i>${X(y)} Pfl.</i></div>`;i.label=ne.marker(p,{interactive:!1,keyboard:!1,icon:ne.divIcon({className:"acker-flabel-wrap",html:C,iconSize:[0,0]})}),l.addLayer(i.label)}function ut(i){Me(i),i.handles=i.latlngs.map((c,p)=>{const y=ne.marker(c,{draggable:!0,icon:ne.divIcon({className:"acker-vhandle"})}).addTo(_);return y.on("drag",b=>{i.latlngs[p]=[b.target.getLatLng().lat,b.target.getLatLng().lng],i.outline.setLatLngs(i.latlngs)}),y.on("dragend",()=>nt(i)),y.on("contextmenu",b=>z(i,p,b)),y}),i.editing=!0}function Me(i){(i.handles||[]).forEach(c=>_.removeLayer(c)),i.handles=[],i.editing=!1}function Ce(){a.forEach(i=>te(i))}function Yt(){a.forEach(i=>{ee(i)!==i._lastDetail&&te(i)})}function Et(i,c){i.color=c;try{i.outline?.setStyle({color:c,fillColor:c})}catch{}if(i.bedsLayer)try{i.bedsLayer.eachLayer(y=>y.setStyle&&y.setStyle({fillColor:c}))}catch{}try{const y=i.label?.getElement?.()?.querySelector?.(".acker-flabel");y&&y.style.setProperty("--fc",c)}catch{}const p=I?.querySelector(".acker-field.sel .acker-swatch");p&&(p.style.background=c)}function Lt(i){if(i.latlngs?.length)try{_.fitBounds(ne.polygon(i.latlngs).getBounds(),{maxZoom:20,padding:[40,40]})}catch{}}function on(){const i=a.filter(c=>c.latlngs?.length>=3);if(!i.length){B.info("Keine Flächen vorhanden.");return}try{let c=ne.polygon(i[0].latlngs).getBounds();i.slice(1).forEach(p=>{c=c.extend(ne.polygon(p.latlngs).getBounds())}),_.fitBounds(c,{maxZoom:19,padding:[40,40]})}catch{}}function nt(i){i.result=q(i.latlngs,i.params),te(i),se(),Q(i)}function rr(i){if(Ve("app",c=>({...c,activeSection:"kultur"})),i?.id)try{window.dispatchEvent(new CustomEvent("psm:openKultur",{detail:{typ:"acker",id:String(i.id)}}))}catch{}else B.info("Fläche wird gespeichert – in der Kulturführung gleich wählbar.")}let Ie=null;const Dt=()=>{Ie&&(Ie.remove(),Ie=null,document.removeEventListener("pointerdown",ka,!0),document.removeEventListener("keydown",ln,!0))},ka=i=>{Ie&&!Ie.contains(i.target)&&Dt()},ln=i=>{i.key==="Escape"&&Dt()};function ir(i,c){c.style.left="",c.style.right="",c.style.top="";const p=i.getBoundingClientRect(),y=c.getBoundingClientRect(),b=y.width||210,M=y.height||260;p.right+3+b>window.innerWidth-8&&(c.style.left="auto",c.style.right="calc(100% + 3px)");let C=-5;p.top+C+M>window.innerHeight-8&&(C=Math.min(-5,window.innerHeight-8-M-p.top)),p.top+C<8&&(C=8-p.top),c.style.top=C+"px"}function cn(i,c){c.forEach(p=>{if(!p)return;if(p.sep){const b=document.createElement("div");b.className="acker-ctx-sep",i.appendChild(b);return}if(p.type==="swatchGrid"){const b=document.createElement("div");b.className="acker-ctx-swatches",p.colors.forEach(Y=>{const ve=document.createElement("button");ve.type="button",ve.className="acker-sw"+(Y===p.current?" on":""),ve.style.background=Y,ve.title=Y,ve.addEventListener("click",oe=>{oe.stopPropagation(),Dt(),p.onPick(Y)}),b.appendChild(ve)});const M=document.createElement("label");M.className="acker-sw-custom",M.innerHTML=`<i class="bi bi-eyedropper"></i><input type="color" value="${p.current||"#3b82f6"}">`;const C=M.querySelector("input");C.addEventListener("input",Y=>(p.onLive||p.onPick)(Y.target.value)),C.addEventListener("change",Y=>{p.onPick(Y.target.value),Dt()}),b.appendChild(M),i.appendChild(b);return}const y=document.createElement("button");if(y.type="button",y.className="acker-ctx-item"+(p.danger?" danger":"")+(p.submenu?" has-sub":"")+(p.disabled?" disabled":""),y.innerHTML=`<span class="ic">${p.icon||""}</span><span class="lb">${g(p.label)}</span>`+(p.right?`<span class="rt">${g(p.right)}</span>`:"")+(p.submenu?'<span class="ch"><i class="bi bi-chevron-right"></i></span>':""),p.submenu){const b=document.createElement("div");b.className="acker-ctx-sub",cn(b,p.submenu),y.appendChild(b),y.addEventListener("pointerenter",()=>ir(y,b))}else p.disabled||y.addEventListener("click",b=>{b.stopPropagation(),p.keepOpen||Dt(),p.action?.()});i.appendChild(y)})}function we(i,c,p,y){if(Dt(),Ie=document.createElement("div"),Ie.className="acker-ctx",y){const Y=document.createElement("div");Y.className="acker-ctx-title",Y.textContent=y,Ie.appendChild(Y)}cn(Ie,p),document.body.appendChild(Ie);const b=Ie.getBoundingClientRect();let M=i,C=c;M+b.width>window.innerWidth-8&&(M=Math.max(8,window.innerWidth-b.width-8)),C+b.height>window.innerHeight-8&&(C=Math.max(8,window.innerHeight-b.height-8)),Ie.style.left=M+"px",Ie.style.top=C+"px",setTimeout(()=>{document.addEventListener("pointerdown",ka,!0),document.addEventListener("keydown",ln,!0)},0)}const $t=i=>{const c=i.originalEvent||i;return c&&ne.DomEvent.preventDefault?.(c),i.originalEvent&&ne.DomEvent.stop?.(i),{x:c.clientX,y:c.clientY}};function Xt(i,c){i.params.angle=(Math.round(i.params.angle+c)%180+180)%180,nt(i),B.info(`Beete-Ausrichtung: ${i.params.angle}°`)}function dn(i){const c=i.latlngs||[];if(c.length<2||!Ee)return;let p=-1,y=0;for(let b=0;b<c.length;b++){const M=c[b],C=c[(b+1)%c.length];try{const Y=Ee.point([M[1],M[0]]),ve=Ee.point([C[1],C[0]]),oe=Ee.distance(Y,ve);oe>p&&(p=oe,y=Ee.bearing(Y,ve))}catch{}}i.params.angle=(Math.round(y-90)%180+180)%180,nt(i),B.success(`Beete an Fläche ausgerichtet (${i.params.angle}°).`)}function wa(i,c){i.color=c,te(i),se(),Q(i)}function Ze(i,c){i.kultur=c||null,i.eppoCode=Wt.find(p=>p.kultur===i.kultur)?.eppoCode||null,te(i),se(),Q(i),B.success(c?`Kultur: ${c}`:"Kultur entfernt.")}function un(i){i.bedsHidden=!i.bedsHidden,te(i),B.info(i.bedsHidden?"Beete ausgeblendet.":"Beete eingeblendet.")}function sr(i){Re(i._key),setTimeout(()=>{const c=I?.querySelector(".acker-field.sel .acker-name");c&&(c.focus(),c.select())},30)}function ea(i){const p=hs()*18/111320,y={_key:"new-"+ ++Ot,id:null,name:(i.name||"Fläche")+" (Kopie)",kultur:i.kultur,eppoCode:i.eppoCode,standortId:i.standortId,color:zt[(zt.indexOf(i.color)+1)%zt.length],latlngs:i.latlngs.map(b=>[b[0]+p,b[1]+p]),params:{...i.params},outline:null,bedsLayer:null,label:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(y),n=y._key,nt(y),Q(y,!0),B.success("Fläche dupliziert.")}function xa(i){const c=i.latlngs||[];if(c.length<3){B.warning("Fläche hat keine Geometrie.");return}const p=c.map(b=>[Number(b[1]),Number(b[0])]);(p[0][0]!==p[p.length-1][0]||p[0][1]!==p[p.length-1][1])&&p.push([p[0][0],p[0][1]]);const y={type:"FeatureCollection",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:[{type:"Feature",geometry:{type:"Polygon",coordinates:[p]},properties:{name:i.name||"",kultur:i.kultur||null,eppoCode:i.eppoCode||null,flaeche_m2:Math.round(i.result?.areaM2||0),beete:i.result?.beds?.length||0,beetmeter_m:Math.round(i.result?.bedMeters||0),pflanzen:i.result?.plants||0}}]};try{const b=new Blob([JSON.stringify(y,null,2)],{type:"application/geo+json"}),M=URL.createObjectURL(b),C=document.createElement("a");C.href=M,C.download=`${(i.name||"flaeche").replace(/[^\w\-]+/g,"_")}.geojson`,document.body.appendChild(C),C.click(),C.remove(),setTimeout(()=>URL.revokeObjectURL(M),1e3),B.success("Fläche als GeoJSON exportiert.")}catch{B.error("Export fehlgeschlagen.")}}async function k(i){const c=i.result||{},p=[`Fläche: ${i.name||""}`,i.kultur?`Kultur: ${i.kultur}`:"",`Größe: ${X(c.areaM2||0)} m² (${X((c.areaM2||0)/1e4,3)} ha)`,`Beete: ${X(c.beds?.length||0)}`,`Beetmeter: ${X(c.bedMeters||0)} m`,`Pflanzen: ${X(c.plants||0)}`].filter(Boolean).join(`
`);try{await navigator.clipboard.writeText(p),B.success("Werte kopiert.")}catch{B.warning("Kopieren nicht möglich.")}}const L=i=>({icon:'<i class="bi bi-palette"></i>',label:"Farbe",submenu:[{type:"swatchGrid",colors:zt,current:i.color,onPick:c=>wa(i,c),onLive:c=>Et(i,c)}]}),O=i=>({icon:'<i class="bi bi-flower1"></i>',label:"Kultur zuweisen",submenu:[{icon:'<i class="bi bi-x"></i>',label:"– keine –",action:()=>Ze(i,null)},...Wt.length?[{sep:!0}]:[],...Wt.map(c=>({icon:c.kultur===i.kultur?'<i class="bi bi-check2"></i>':"",label:`${c.kultur}${c.anbau?" ("+c.anbau+")":""}`,action:()=>Ze(i,c.kultur)}))]});function T(i,c,p){Re(i._key);const{x:y,y:b}=$t(c),M=!!i.editing;we(y,b,[{icon:'<i class="bi bi-clipboard2-pulse"></i>',label:"Kulturführung öffnen",action:()=>rr(i)},{icon:'<i class="bi bi-pencil"></i>',label:"Umbenennen",action:()=>sr(i)},O(i),L(i),{sep:!0},{icon:'<i class="bi bi-arrow-clockwise"></i>',label:"Beete drehen +15°",keepOpen:!0,action:()=>Xt(i,15)},{icon:'<i class="bi bi-arrow-counterclockwise"></i>',label:"Beete drehen −15°",keepOpen:!0,action:()=>Xt(i,-15)},{icon:'<i class="bi bi-bounding-box"></i>',label:"Beete an Fläche ausrichten",action:()=>dn(i)},{icon:'<i class="bi bi-grid-3x3-gap"></i>',label:i.bedsHidden?"Beete einblenden":"Beete ausblenden",action:()=>un(i)},{icon:'<i class="bi bi-bounding-box-circles"></i>',label:M?"Eckpunkte fertig":"Eckpunkte bearbeiten",action:()=>{M?Me(i):ut(i)}},{sep:!0},{icon:'<i class="bi bi-copy"></i>',label:"Duplizieren",action:()=>ea(i)},{icon:'<i class="bi bi-zoom-in"></i>',label:"Auf Fläche zoomen",action:()=>Lt(i)},{icon:'<i class="bi bi-clipboard-data"></i>',label:"Werte kopieren",action:()=>k(i)},{icon:'<i class="bi bi-download"></i>',label:"Als GeoJSON exportieren",action:()=>xa(i)},{sep:!0},{icon:'<i class="bi bi-trash"></i>',label:"Löschen",danger:!0,action:()=>W(i._key)}],p?`${i.name||"Fläche"} · Beet ${p}`:i.name||"Fläche")}function z(i,c,p){const{x:y,y:b}=$t(p);we(y,b,[{icon:'<i class="bi bi-node-minus"></i>',label:"Eckpunkt löschen",disabled:i.latlngs.length<=3,action:()=>{i.latlngs.length<=3||(i.latlngs.splice(c,1),nt(i))}},{icon:'<i class="bi bi-check2"></i>',label:"Bearbeiten beenden",action:()=>Me(i)}],`Eckpunkt ${c+1}`)}function P(){!o.sat||!o.osm||(_.hasLayer(o.sat)?(_.removeLayer(o.sat),o.osm.addTo(_),B.info("Karte: OSM")):(_.removeLayer(o.osm),o.sat.addTo(_),B.info("Karte: Satellit")))}function N(i){const c=i.latlng,{x:p,y}=$t(i);we(p,y,[{icon:'<i class="bi bi-pencil-square"></i>',label:"Neue Fläche hier zeichnen",action:()=>{_t(!0),Da({latlng:c})}},{icon:'<i class="bi bi-crosshair"></i>',label:"Hierhin zentrieren",action:()=>_.panTo(c)},{sep:!0},{icon:'<i class="bi bi-arrows-fullscreen"></i>',label:"Alle Flächen anzeigen",disabled:!a.some(b=>b.latlngs?.length>=3),action:on},{icon:'<i class="bi bi-layers"></i>',label:"Kartentyp wechseln (Satellit/OSM)",action:P},{sep:!0},{icon:'<i class="bi bi-geo-alt"></i>',label:"Koordinaten kopieren",action:async()=>{try{await navigator.clipboard.writeText(`${c.lat.toFixed(6)}, ${c.lng.toFixed(6)}`),B.success("Koordinaten kopiert.")}catch{B.warning("Kopieren nicht möglich.")}}}],"Karte")}function ue(i){return['<option value="">– Kultur –</option>'].concat(Wt.map(c=>{const p=`${c.kultur}${c.anbau?" ("+c.anbau+")":""}`;return`<option value="${g(c.kultur)}"${c.kultur===i?" selected":""}>${g(p)}</option>`})).join("")}function pe(i){const c=je(t.state.getState().gps?.points)||[];return['<option value="">– Standort –</option>'].concat(c.map(p=>`<option value="${g(p.id)}"${p.id===i?" selected":""}>${g(p.name||"")}</option>`)).join("")}function fe(i){const c=h(i);return c?`<span class="acker-cropchip" title="Kultur"><span class="dot" style="background:${g(c.color||"#94a3b8")}"></span>${g(c.name)}</span>`:""}function J(i){if(i=Math.round(i||0),i<=0)return"0";let c=100;return i>=1e5?c=1e3:i>=1e4&&(c=500),"≈ "+X(Math.round(i/c)*c)}function G(i,c){const p=i.result?.beds?.length||0,y=i.params.bedW+i.params.pathW;if(p<1||y<=0){B.warning("Erst Beete berechnen lassen.");return}const M=+(p*y/c-i.params.pathW).toFixed(2);if(M<.1){B.warning("Wegbreite ist größer als der gewünschte Abstand – erst Wegbreite verkleinern.");return}i.params.bedW=M,nt(i),B.success(`Bettbreite ${X(M,2)} m → ${i.result?.beds?.length||0} Beete.`)}function ae(){if(!K)return;let i=0,c=0,p=0,y=0;a.forEach(M=>{i+=M.result?.areaM2||0,c+=M.result?.beds?.length||0,p+=M.result?.bedMeters||0,y+=M.result?.plants||0});const b=(M,C)=>{const Y=K.querySelector(M);Y&&(Y.textContent=C)};b('[data-t="area"]',X(i)+" m² · "+X(i/1e4,3)+" ha"),b('[data-t="beds"]',X(c)),b('[data-t="meters"]',X(p)+" m"),b('[data-t="plants"]',J(y))}function me(i,c){const p=c.result||{},y=i.querySelector(".acker-stat");y&&(y.textContent=X(p.plants||0)+" Pfl.");const b=(M,C)=>{const Y=i.querySelector(`[data-r="${M}"]`);Y&&(Y.textContent=C)};b("area",X(p.areaM2||0)+" m² · "+X((p.areaM2||0)/1e4,3)+" ha"),b("pitch",X(c.params.bedW+c.params.pathW,2)+" m"),b("beds",X(p.beds?.length||0)),b("meters",X(p.bedMeters||0)+" m"),b("plants",J(p.plants||0)),ae()}const ke=["Jan.","Feb.","März","Apr.","Mai","Juni","Juli","Aug.","Sep.","Okt.","Nov.","Dez."];function Be(i){if(!i)return"";const c=new Date(String(i).slice(0,10)+"T00:00:00");return isNaN(c.getTime())?"":`${c.getDate()}. ${ke[c.getMonth()]}`}function H(i){const c=i?.ernteVon?Be(i.ernteVon):"",p=i?.ernteBis||i?.ernteDatum?Be(i.ernteBis||i.ernteDatum):"";return c&&p?`Ernte ${c}–${p}`:p?`Ernte ~${p}`:c?`Ernte ab ${c}`:""}function ce(){const i=E('[data-role="acker-info"]');i&&(i.style.display="none")}function xe(i){const c=E('[data-role="acker-info"]');if(!c)return;const{current:p,next:y}=la(v(i.typ,i.id)),b=w(i.typ,i.id).filter(it=>it.status==="geplant").length,M=i.typ==="haus",C=i.area?`${X(i.area)} m²`:"",Y=p?ga(p):"#94a3b8",ve=p?`<div class="ai-row"><span class="ai-dot" style="background:${g(Y)}"></span>
           <div><div class="ai-crop">${g(p.kultur||"Kultur")}</div>
           <div class="ai-sub">${g([p.pflanzDatum?"gepflanzt "+Be(p.pflanzDatum):"",H(p)].filter(Boolean).join(" · "))}</div></div></div>`:'<div class="ai-row"><span class="ai-dot" style="background:#cbd5e1"></span><div class="ai-crop muted">Fläche ist frei</div></div>',oe=y?`<div class="ai-next"><i class="bi bi-arrow-right-short"></i> Danach: <b>${g(y.kultur||"")}</b>${y.pflanzDatum?" ab "+Be(y.pflanzDatum):""}</div>`:"",Se=!M&&i.fieldRef?`<div class="ai-metrics"><span><b>${X(i.fieldRef.result?.beds?.length||0)}</b> Beete</span><span><b>${X(i.fieldRef.result?.bedMeters||0)}</b> m</span><span><b>${J(i.fieldRef.result?.plants||0)}</b> Pfl.</span></div>`:"",Je=`<div class="ai-tasks${b?" has":""}"><i class="bi ${b?"bi-list-check":"bi-check2-circle"}"></i> ${b?b+" Aufgabe"+(b===1?"":"n")+" offen":"Nichts offen"}</div>`;c.innerHTML=`
      <div class="ai-head">
        <div class="ai-title"><b>${g(i.name||"Fläche")}</b><span class="ai-badge">${M?"Gewächshaus":"Freiland"}${C?" · "+C:""}</span></div>
        <button class="ai-x" data-ai="close" title="Schließen"><i class="bi bi-x-lg"></i></button>
      </div>
      ${ve}${oe}${Se}${Je}
      <div class="ai-actions">
        <button class="ai-btn primary" data-ai="kultur"><i class="bi bi-clipboard2-pulse"></i> Kulturführung</button>
        <button class="ai-btn" data-ai="zoom"><i class="bi bi-zoom-in"></i> Hin</button>
      </div>`,c.style.display="block",c.querySelector('[data-ai="close"]')?.addEventListener("click",ce),c.querySelector('[data-ai="kultur"]')?.addEventListener("click",()=>{Ve("app",it=>({...it,activeSection:"kultur"}));try{window.dispatchEvent(new CustomEvent("psm:openKultur",{detail:{typ:i.typ,id:String(i.id)}}))}catch{}}),c.querySelector('[data-ai="zoom"]')?.addEventListener("click",()=>{!M&&i.fieldRef?Lt(i.fieldRef):i.latlng&&_.setView(i.latlng,Math.max(_.getZoom(),18))})}function se(){if(!I||!U||!K)return;U.style.display=a.length?"none":"block",K.style.display=a.length?"block":"none",I.innerHTML="";let i=0,c=0,p=0,y=0;a.forEach(b=>{i+=b.result?.areaM2||0,c+=b.result?.beds?.length||0,p+=b.result?.bedMeters||0,y+=b.result?.plants||0;const M=b._key===n,C=document.createElement("div");C.className="acker-field"+(M?" sel open":""),C.innerHTML=`
        <div class="acker-fhead">
          <span class="acker-swatch" style="background:${b.color}"></span>
          <input class="acker-name" value="${g(b.name)}" />
          ${fe(b)}
          <span class="acker-stat">${X(b.result?.plants||0)} Pfl.</span>
        </div>
        <div class="acker-fbody">
          <div class="acker-grid">
            <label class="acker-fld span2">Kultur<select data-k="kultur">${ue(b.kultur)}</select></label>
            <label class="acker-fld span2">Standort (für PSM)<select data-k="standortId">${pe(b.standortId)}</select></label>
            <label class="acker-fld">Bettbreite (m)<input data-k="bedW" type="number" step="0.05" min="0.1" value="${b.params.bedW}"/></label>
            <label class="acker-fld">Wegbreite (m)<input data-k="pathW" type="number" step="0.05" min="0" value="${b.params.pathW}"/></label>
            <label class="acker-fld">Reihenabstand (m)<input data-k="rowSp" type="number" step="0.05" min="0.05" value="${b.params.rowSp}"/></label>
            <label class="acker-fld">Pflanzabstand (m)<input data-k="inRowSp" type="number" step="0.05" min="0.05" value="${b.params.inRowSp}"/></label>
            <div class="acker-fld span2">
              <div class="acker-angle-head"><span>Ausrichtung der Beete: <b>${b.params.angle}°</b></span>
                <button class="acker-align" data-act="align" type="button" title="Beete parallel zur längsten Kante ausrichten"><i class="bi bi-bounding-box"></i> an Fläche</button>
              </div>
              <input data-k="angle" type="range" min="0" max="180" step="5" value="${b.params.angle}"/>
            </div>
          </div>
          <div class="acker-res">
            <div class="r"><span>Fläche</span><b data-r="area">${X(b.result?.areaM2||0)} m² · ${X((b.result?.areaM2||0)/1e4,3)} ha</b></div>
            <div class="r"><span>Abstand (Mitte–Mitte)</span><b data-r="pitch">${X(b.params.bedW+b.params.pathW,2)} m</b></div>
            <div class="r"><span>Beete</span><b data-r="beds">${X(b.result?.beds?.length||0)}</b></div>
            <div class="r"><span>Beetmeter</span><b data-r="meters">${X(b.result?.bedMeters||0)} m</b></div>
            <div class="r"><span>Pflanzen (geschätzt)</span><b data-r="plants">${J(b.result?.plants||0)}</b></div>
          </div>
          <div class="acker-calib">
            <i class="bi bi-info-circle"></i> Beetzahl passt nicht zum echten Feld?
            <span class="calib-row"><input type="number" min="1" max="999" data-calib placeholder="echte Beetzahl" /><button class="acker-align" data-act="calib" type="button"><i class="bi bi-magic"></i> anpassen</button></span>
          </div>
          <div class="acker-actions">
            <label class="acker-colorbtn" title="Farbe wählen"><input type="color" data-act="color" value="${b.color}"><i class="bi bi-palette"></i></label>
            <button class="btn btn-sm acker-abtn" data-act="zoom" title="Auf Fläche zoomen"><i class="bi bi-zoom-in"></i></button>
            <button class="btn btn-sm acker-abtn" data-act="dup" title="Duplizieren"><i class="bi bi-copy"></i></button>
            <button class="btn btn-sm acker-abtn" data-act="rot" title="Beete drehen +15°"><i class="bi bi-arrow-clockwise"></i></button>
            <span style="flex:1"></span>
            <button class="btn btn-sm acker-abtn danger" data-act="del" title="Löschen"><i class="bi bi-trash"></i></button>
          </div>
          <div class="acker-hint"><i class="bi bi-arrows-move"></i> Ausgewählte Fläche ziehen = verschieben · Rechtsklick = mehr Aktionen</div>
        </div>`,C.querySelector(".acker-fhead").addEventListener("click",oe=>{oe.target.classList.contains("acker-name")||(Re(b._key),xe({typ:"acker",id:b.id,name:b.name,area:b.result?.areaM2||0,fieldRef:b}))}),C.querySelector(".acker-name").addEventListener("input",oe=>{b.name=oe.target.value,Q(b)}),C.querySelectorAll("[data-k]").forEach(oe=>{const Se=oe.dataset.k;if(Se==="kultur"){oe.addEventListener("input",Je=>{b.kultur=Je.target.value||null,b.eppoCode=Wt.find(it=>it.kultur===b.kultur)?.eppoCode||null,te(b),Q(b)});return}if(Se==="standortId"){oe.addEventListener("input",Je=>{b.standortId=Je.target.value||null,Q(b)});return}oe.addEventListener("input",Je=>{if(Se==="angle"?b.params.angle=+Je.target.value:b.params[Se]=parseFloat(Je.target.value)||0,b.result=q(b.latlngs,b.params),te(b),me(C,b),Se==="angle"){const it=C.querySelector(".acker-angle-head b");it&&(it.textContent=b.params.angle+"°")}Q(b)})}),C.querySelector('[data-act="align"]')?.addEventListener("click",()=>dn(b)),C.querySelector('[data-act="calib"]')?.addEventListener("click",()=>{const oe=Math.round(Number(C.querySelector("[data-calib]")?.value)||0);oe>=1?G(b,oe):B.warning("Bitte die echte Beetzahl eingeben.")}),C.querySelector('[data-act="del"]').addEventListener("click",()=>W(b._key)),C.querySelector('[data-act="zoom"]').addEventListener("click",()=>Lt(b)),C.querySelector('[data-act="dup"]').addEventListener("click",()=>ea(b)),C.querySelector('[data-act="rot"]').addEventListener("click",()=>Xt(b,15));const ve=C.querySelector('[data-act="color"]');ve.addEventListener("input",oe=>Et(b,oe.target.value)),ve.addEventListener("change",oe=>wa(b,oe.target.value)),I.appendChild(C)}),K.querySelector('[data-t="area"]').textContent=X(i)+" m² · "+X(i/1e4,3)+" ha",K.querySelector('[data-t="beds"]').textContent=X(c),K.querySelector('[data-t="meters"]').textContent=X(p)+" m",K.querySelector('[data-t="plants"]').textContent=X(y)}function Re(i){n=i,a.forEach(c=>te(c)),se()}async function W(i){const c=a.find(y=>y._key===i);if(!c)return;ie(c);const p=a.findIndex(y=>y._key===i);if(p>=0&&a.splice(p,1),n===i&&(n=null),se(),c.id&&de()==="sqlite")try{await nl({id:c.id}),await tt().catch(()=>{})}catch{}}let Z=null;function Ne(i,c){pt||i._key!==n||(Z={fl:i,lastLL:c.latlng,moved:!1},_.dragging.disable(),_.getContainer().style.cursor="grabbing",ne.DomEvent.stop(c))}function Sa(i){if(!Z)return;const c=Z.fl;if(!Z.moved){c.bedsLayer&&(_.removeLayer(c.bedsLayer),c.bedsLayer=null);try{c.outline.setStyle({fillOpacity:.3,dashArray:"6 5"})}catch{}}const p=i.latlng.lat-Z.lastLL.lat,y=i.latlng.lng-Z.lastLL.lng;Z.lastLL=i.latlng,Z.moved=!0,c.latlngs=c.latlngs.map(b=>[b[0]+p,b[1]+y]);try{c.outline.setLatLngs(c.latlngs)}catch{}if((c.handles||[]).forEach((b,M)=>{try{b.setLatLng(c.latlngs[M])}catch{}}),c.label)try{c.label.setLatLng(c.outline.getBounds().getCenter())}catch{}}function Ea(){if(!Z)return;const i=Z.fl,c=Z.moved;Z=null,_.dragging.enable(),_.getContainer().style.cursor="",c&&nt(i)}function Ht(i){if(ge.length<3)return!1;const c=_.latLngToContainerPoint(ne.latLng(ge[0][0],ge[0][1])),p=_.latLngToContainerPoint(i);return c.distanceTo(p)<=14}function pn(i){if(!Ee||i.length<3)return 0;try{const c=i.map(p=>[p[1],p[0]]);return c.push(c[0]),Ee.area(Ee.polygon([c]))}catch{return 0}}function ta(i){const c=E('[data-role="acker-draw-stats"]');if(!c)return;const p=pn(i);c.textContent=`${ge.length} Punkt${ge.length===1?"":"e"}`+(p>0?` · ~${X(p)} m²`:"")}let pt=!1,ge=[],Qe=null,rt=[],Ot=0;function bi(){Qe&&(_.removeLayer(Qe),Qe=null),rt.forEach(i=>_.removeLayer(i)),rt=[],ge=[]}function _t(i){pt=i,E('[data-role="acker-banner"]').style.display=i?"block":"none",E('[data-role="acker-draw"]').style.display=i?"none":"block",_.getContainer().style.cursor=i?"crosshair":"",i?_.on("mousemove",fn):(_.off("mousemove",fn),bi())}function La(i){const c=i?[...ge,[i.lat,i.lng]]:ge;if(c.length<2){Qe&&(_.removeLayer(Qe),Qe=null);return}Qe?Qe.setLatLngs(c):Qe=ne.polygon(c,{interactive:!1,className:"acker-draw-preview",color:"#22c55e",weight:2.5,fillColor:"#22c55e",fillOpacity:.18,dashArray:"6 5"}).addTo(_)}function or(i,c){const p=ne.circleMarker(i,{radius:c?7:5,color:"#fff",fillColor:c?"#16a34a":"#22c55e",fillOpacity:1,weight:2,interactive:c,bubblingMouseEvents:!1}).addTo(_);c&&(p.bindTooltip("Zum Schließen anklicken",{direction:"top"}),p.on("click",y=>{ne.DomEvent.stop(y),ge.length>=3&&aa()})),rt.push(p)}function Da(i){if(!pt){ce();return}if(Ht(i.latlng)){aa();return}ge.push([i.latlng.lat,i.latlng.lng]),or(i.latlng,ge.length===1),La(),ta(ge)}function fn(i){if(!pt||!ge.length)return;const c=Ht(i.latlng);if(La(c?void 0:i.latlng),rt[0])try{rt[0].setRadius(c?10:7),rt[0].setStyle({weight:c?3:2})}catch{}ta(c?ge:[...ge,[i.latlng.lat,i.latlng.lng]])}function $a(){if(!ge.length)return;ge.pop();const i=rt.pop();i&&_.removeLayer(i),La(),ta(ge)}function aa(){if(ge.length<3){B.warning("Mindestens 3 Punkte setzen.");return}const i={_key:"new-"+ ++Ot,id:null,name:"Fläche "+(a.length+1),kultur:null,eppoCode:null,standortId:null,color:zt[a.length%zt.length],latlngs:ge.map(c=>c.slice()),params:_d(),outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(i),_t(!1),n=i._key,nt(i),Q(i,!0)}async function mn(){const i=E('[data-role="acker-q"]').value.trim();if(i)try{const p=await(await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+encodeURIComponent(i))).json();p[0]?_.setView([+p[0].lat,+p[0].lon],18):B.info("Nichts gefunden.")}catch{B.warning("Suche nicht verfügbar.")}}async function Rt(){if(Ln){setTimeout(()=>_&&_.invalidateSize(),60);return}Ln=!0;try{await It(()=>Promise.resolve({}),__vite__mapDeps([2]));const y=await It(()=>import("./leaflet-src.BcflbDBd.js").then(b=>b.l),__vite__mapDeps([3,4]));ne=y.default||y,Ee=await It(()=>import("./index.CPadEFgJ.js"),__vite__mapDeps([5,4]))}catch(y){console.warn("[Acker] Karten-Bibliotheken konnten nicht geladen werden:",y),U&&(U.textContent="Karte konnte nicht geladen werden (offline?)."),Ln=!1;return}_=ne.map(he,{doubleClickZoom:!1,zoomControl:!0,attributionControl:!0}).setView([47.818,8.976],17);const i=ne.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:21,maxNativeZoom:19,attribution:"Tiles © Esri"}).addTo(_),c=ne.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"});o={sat:i,osm:c},s=ne.layerGroup(),x(),s.addTo(_),l=ne.layerGroup().addTo(_);const p=ne.DomUtil.create("div","acker-info");p.setAttribute("data-role","acker-info"),p.style.display="none",_.getContainer().appendChild(p),ne.DomEvent.disableClickPropagation(p),ne.DomEvent.disableScrollPropagation(p),_.on("click",Da),_.on("contextmenu",y=>{if(pt){ne.DomEvent.preventDefault?.(y.originalEvent||y),$a();return}N(y)}),_.on("mousemove",Sa),_.on("mouseup",Ea),document.addEventListener("mouseup",Ea),_.on("zoomend",Yt),E('[data-role="acker-draw"]').addEventListener("click",()=>_t(!0)),E('[data-role="acker-export"]')?.addEventListener("click",S),E('[data-role="acker-finish"]').addEventListener("click",aa),E('[data-role="acker-cancel"]').addEventListener("click",()=>_t(!1)),E('[data-role="acker-go"]').addEventListener("click",mn),E('[data-role="acker-q"]').addEventListener("keydown",y=>{y.key==="Enter"&&mn()}),E('[data-role="ctrl-fit"]')?.addEventListener("click",on),E('[data-role="ctrl-labels"]')?.addEventListener("click",()=>{d=!d,E('[data-role="ctrl-labels"]')?.classList.toggle("on",d),Ce()}),E('[data-role="ctrl-beds"]')?.addEventListener("click",()=>{f=!f,E('[data-role="ctrl-beds"]')?.classList.toggle("on",f),Ce()}),E('[data-role="ctrl-basemap"]')?.addEventListener("click",P),document.addEventListener("keydown",y=>{pt&&(y.key==="Backspace"&&(y.preventDefault(),$a()),y.key==="Enter"&&aa(),y.key==="Escape"&&_t(!1))}),await lr(),await na(),await za(),setTimeout(()=>_.invalidateSize(),60)}async function lr(){if(de()==="sqlite")try{Wt=(await Qr())?.rows||[]}catch{Wt=[]}}async function na(){if(de()!=="sqlite"){u=[],m=[];return}try{u=(await $r())?.rows||[]}catch{u=[]}try{m=(await $n())?.rows||[]}catch{m=[]}}async function za(){if(de()==="sqlite")try{((await Jr())?.rows||[]).forEach(p=>{const y={_key:"db-"+p.id,id:p.id,name:p.name,kultur:p.kultur,eppoCode:p.eppoCode,standortId:p.standortId,color:p.color||zt[a.length%zt.length],latlngs:p.latlngs||[],params:{bedW:p.bedW??1.2,pathW:p.pathW??.4,rowSp:p.rowSp??.5,inRowSp:p.inRowSp??.4,angle:p.angle??0},outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};y.result=q(y.latlngs,y.params),a.push(y),te(y)}),se();const c=a.find(p=>p.latlngs?.length);if(c&&_)try{_.fitBounds(ne.polygon(c.latlngs).getBounds(),{maxZoom:19,padding:[30,30]})}catch{}}catch(i){console.warn("[Acker] Flächen laden fehlgeschlagen:",i)}}t.state.subscribe(i=>{if(i?.app?.activeSection==="acker"){if(!Ln){Rt();return}(async()=>(await na(),Ce(),se(),setTimeout(()=>_&&_.invalidateSize(),60)))()}}),se()}function Kd(){return`
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
    .acker-ctx-sub{display:none;position:absolute;left:calc(100% + 3px);top:-5px;min-width:210px;max-height:62vh;overflow-y:auto;overflow-x:hidden;background:var(--ap-surface);border:1px solid var(--ap-line);border-radius:var(--ap-r-lg);box-shadow:var(--ap-shadow-lg);padding:var(--ap-2)}
    .acker-ctx-item.has-sub:hover>.acker-ctx-sub,.acker-ctx-sub:hover{display:block}
    .acker-ctx-swatches{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--ap-2);padding:7px 10px}
    .acker-sw{width:30px;height:30px;border-radius:var(--ap-r-sm);border:2px solid rgba(0,0,0,.12);cursor:pointer;padding:0}
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
  </section>`}function Ta(e){return e.typ+":"+e.id}function Wd(e){if(!Array.isArray(e)||e.length<3)return null;let t=0,a=0,n=0;const r=e.length,s=e[r-1],l=e[0],d=s&&l&&Number(s[0])===Number(l[0])&&Number(s[1])===Number(l[1])?r-1:r;for(let f=0;f<d;f++){const u=Number(e[f]?.[0]),m=Number(e[f]?.[1]);Number.isFinite(u)&&Number.isFinite(m)&&(t+=u,a+=m,n++)}return n?{lat:t/n,lon:a/n}:null}async function vs(e){const t=[];(je(e.state.getState().gps?.points)||[]).forEach(n=>{if(n?.kind!=="gewaechshaus")return;const r=Number(n.latitude),s=Number(n.longitude),l=Number(n.nutzflaecheQm);t.push({typ:"haus",id:String(n.id),name:n.name||"Gewächshaus",areaQm:Number.isFinite(l)&&l>0?l:null,lat:Number.isFinite(r)?r:null,lon:Number.isFinite(s)?s:null,color:null})});try{((await Jr())?.rows||[]).forEach(r=>{const s=Wd(r.latlngs),l=Number(r.areaQm);t.push({typ:"acker",id:String(r.id),name:r.name||"Fläche",areaQm:Number.isFinite(l)&&l>0?l:null,lat:s?.lat??null,lon:s?.lon??null,color:r.color||null})})}catch{}return t}const jd="Wetterdaten: Open-Meteo (CC BY 4.0)",Gd="psm.weather.";function Ud(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function Vd(e,t){return Gd+e.toFixed(3)+"_"+t.toFixed(3)}function Zd(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch{return null}}function Qd(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Jd(e){return!!e&&e.slice(0,10)===Ud()}function Yd(e,t,a){const n=e?.time||[],r=e?.temperature_2m_max||[],s=e?.temperature_2m_min||[],l=e?.precipitation_sum||[],o=e?.sunshine_duration||[],d=On(new Date),f=Di(d.year,d.week),u=new Map;for(let v=0;v<n.length;v++){const w=Is(n[v]);if(!w)continue;const{year:h,week:S}=On(w),x=Di(h,S);let E=u.get(x);E||(E={key:x,year:h,week:S,tmaxSum:0,tmaxN:0,tminSum:0,tminN:0,precip:0,precipN:0,sun:0,sunN:0,days:0},u.set(x,E)),Number.isFinite(r[v])&&(E.tmaxSum+=r[v],E.tmaxN++),Number.isFinite(s[v])&&(E.tminSum+=s[v],E.tminN++),Number.isFinite(l[v])&&(E.precip+=l[v],E.precipN++),Number.isFinite(o[v])&&(E.sun+=o[v],E.sunN++),E.days++}const m=[...u.values()].sort((v,w)=>v.key<w.key?-1:v.key>w.key?1:0).map(v=>{const w=v.tmaxN?v.tmaxSum/v.tmaxN:null,h=v.tminN?v.tminSum/v.tminN:null;return{weekKey:v.key,year:v.year,week:v.week,tMaxAvg:w,tMinAvg:h,tMeanAvg:w!=null&&h!=null?(w+h)/2:w,precipSum:v.precipN?v.precip:null,sunHours:v.sunN?v.sun/3600:null,days:v.days,isForecast:v.key>=f}});return{lat:t,lon:a,fetchedAt:new Date().toISOString(),weeks:m}}async function Xd(e,t){if(!Number.isFinite(e)||!Number.isFinite(t))return{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const a=Vd(e,t),n=Zd(a);if(n&&Jd(n.fetchedAt)&&n.weeks?.length)return n;if(typeof navigator<"u"&&navigator.onLine===!1)return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const r="https://api.open-meteo.com/v1/forecast?latitude="+e.toFixed(4)+"&longitude="+t.toFixed(4)+"&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunshine_duration&timezone=Europe%2FBerlin&past_days=92&forecast_days=16";try{const s=await fetch(r);if(!s.ok)throw new Error("HTTP "+s.status);const l=await s.json(),o=Yd(l.daily,e,t);return o.weeks.length&&Qd(a,o),o}catch{return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]}}}const Lr=66;function eu(e,t){const{units:a,anbau:n,mass:r,onSelect:s,onContext:l}=t;if(!a||!a.length){e.innerHTML='<div class="km-empty"><i class="bi bi-calendar3"></i><p>Noch keine Flächen für den Anbauplan.</p></div>';return}const o=new Date;let d=new Date(o.getFullYear(),o.getMonth()-1,1),f=new Date(o.getFullYear(),o.getMonth()+4,1);const u=F=>{if(!F)return;const Q=new Date(String(F).slice(0,10)+"T00:00:00");isNaN(Q.getTime())||(Q<d&&(d=new Date(Q.getFullYear(),Q.getMonth(),1)),Q>f&&(f=new Date(Q.getFullYear(),Q.getMonth(),1)))};(n||[]).forEach(F=>{u(F.pflanzDatum),u(F.ernteBis||F.ernteDatum),u(F.ernteVon)}),(r||[]).forEach(F=>u(F.planDatum||F.erledigtDatum));const m=bo(d,f),v=m.length,w=v*Lr,h=F=>F==null?null:(F*100).toFixed(2)+"%",S=Ke(m,o.toISOString()),x=a.filter(F=>F.typ==="haus"),E=a.filter(F=>F.typ==="acker");let I="";m.forEach((F,Q)=>{const q=F.y===o.getFullYear()&&F.m===o.getMonth();I+=`<div class="kb2-mo${q?" cur":""}" style="width:${Lr}px">${go[F.m]}${F.m===0?" "+String(F.y).slice(2):""}</div>`});const U=F=>{const Q=(n||[]).filter(A=>A.flaecheTyp===F.typ&&String(A.flaecheId)===String(F.id)),q=(r||[]).filter(A=>A.flaecheTyp===F.typ&&String(A.flaecheId)===String(F.id));let D="";return Q.forEach((A,ee)=>{const ie=Ke(m,A.pflanzDatum);let te=Ke(m,A.ernteBis||A.ernteDatum||A.pflanzDatum);if(ie==null)return;(te==null||te<=ie)&&(te=Math.min(1,ie+.5/v));const ye=ga(A,ee),ut=A.status==="geplant";D+=`<div class="kb2-bar${ut?" planned":""}" title="${g(A.kultur||"Kultur")}" style="left:${h(ie)};width:${((te-ie)*100).toFixed(2)}%;--cc:${g(ye)}"><span>${g(A.kultur||"")}</span></div>`;const Me=Ke(m,A.ernteVon),Ce=Ke(m,A.ernteBis);Me!=null&&Ce!=null&&Ce>Me&&(D+=`<div class="kb2-harvest" title="Ernte" style="left:${h(Me)};width:${((Ce-Me)*100).toFixed(2)}%;--cc:${g(ye)}"></div>`)}),q.forEach(A=>{const ee=A.status==="erledigt"?A.erledigtDatum||A.planDatum:A.planDatum||A.erledigtDatum,ie=Ke(m,ee);if(ie==null)return;const te=fo(A.art),ye=A.status==="erledigt";D+=`<span class="kb2-mk${ye?" done":""}" title="${g(te.label+(A.notes?": "+A.notes:""))}" style="left:${h(ie)};--mc:${te.color}"></span>`}),S!=null&&(D+=`<div class="kb2-today" style="left:${h(S)}"></div>`),D},K=F=>{const Q=F.typ+":"+F.id,q=(n||[]).filter(ee=>ee.flaecheTyp===F.typ&&String(ee.flaecheId)===String(F.id)),D=q.find(ee=>ee.status==="aktiv")||q.find(ee=>ee.status!=="abgeschlossen"),A=D?g(D.kultur||""):"frei";return`<div class="kb2-row" data-ukey="${Q}">
      <div class="kb2-label" title="${g(F.name)}"><b>${g(F.name)}</b><small>${A}</small></div>
      <div class="kb2-track" style="width:${w}px">${U(F)}</div>
    </div>`},he=(F,Q)=>Q.length?`<div class="kb2-grp"><div class="kb2-grp-l">${g(F)}</div><div class="kb2-grp-t" style="width:${w}px"></div></div>`+Q.map(K).join(""):"";e.innerHTML=`
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
      .kb2-track{position:relative;height:44px;border-top:1px solid var(--ap-line);background-image:linear-gradient(to right,var(--ap-line) 1px,transparent 1px);background-size:${Lr}px 100%}
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
      ${he("Gewächshäuser",x)}
      ${he("Freiland",E)}
    </div>
    <div class="kb2-legend">
      <span class="lg"><span class="d" style="background:var(--ap-ink-2)"></span>erledigt</span>
      <span class="lg"><span class="d" style="background:var(--ap-surface);box-shadow:inset 0 0 0 2px var(--ap-ink-2)"></span>geplant</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:var(--ap-green-bright);display:inline-block"></span>Kultur</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:repeating-linear-gradient(45deg,var(--ap-line-2),var(--ap-line-2) 2px,transparent 2px,transparent 4px);display:inline-block"></span>Ernte-Zeitraum</span>
      <span class="kb2-hint"><i class="bi bi-mouse2"></i> Klick = öffnen · Rechtsklick = planen</span>
    </div>`,e.querySelectorAll(".kb2-row").forEach(F=>{const Q=F.dataset.ukey;F.querySelector(".kb2-label")?.addEventListener("click",()=>s&&s(Q)),F.addEventListener("contextmenu",q=>{q.preventDefault(),l&&l(Q,q.clientX,q.clientY)})})}const tu=[{art:"bewaesserung",label:"Gießen",icon:"bi-droplet"},{art:"mechanisch",label:"Hacken",icon:"bi-tools"},{art:"duengung",label:"Düngen",icon:"bi-flower1"},{art:"nuetzlinge",label:"Nützlinge",icon:"bi-bug"},{art:"chemisch_psm",label:"Pflanzenschutz",icon:"bi-droplet-half"},{art:"monitoring",label:"Kontrolle",icon:"bi-eye"},{art:"sonstiges",label:"Sonstiges",icon:"bi-three-dots"}],au=["Jan.","Feb.","März","Apr.","Mai","Juni","Juli","Aug.","Sep.","Okt.","Nov.","Dez."];function nu(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=ru();let a=[],n=[],r=[],s=[],l=[],o=null,d="plan",f=!1,u=!1;const m={};let v=null;const w=k=>e.querySelector(k),h=()=>w('[data-role="list"]'),S=()=>w('[data-role="detail"]'),x=()=>w('[data-role="kpis"]'),E=()=>w('[data-role="board-view"]'),I=()=>w('[data-role="flaechen-view"]'),U=()=>de()==="sqlite",K=()=>{U()&&tt().catch(()=>{})},he=(k,L)=>k.filter(O=>O.flaecheTyp===L.typ&&String(O.flaecheId)===String(L.id)),F=k=>a.find(L=>Ta(L)===k)||null,Q=(k,L=0)=>mo(k.color)||Gt[L%Gt.length];async function q(){if(a=await vs(t),U()){try{n=(await $r())?.rows||[]}catch{n=[]}try{r=(await $n())?.rows||[]}catch{r=[]}try{s=(await Qr())?.rows||[]}catch{s=[]}try{l=(await il())?.rows||[]}catch{l=[]}if(!u){u=!0;try{const k=await $i();k?.imported&&(r=(await $n())?.rows||[],B.info(`${k.imported} Pflanzenschutz-Eintrag(e) übernommen.`),K())}catch{}}}!o&&a.length&&(o=Ta(a[0])),ee(),A()}async function D(){if(U()){try{n=(await $r())?.rows||[]}catch{}try{r=(await $n())?.rows||[]}catch{}}}async function A(){const k=o?F(o):null;if(!k||k.lat==null||k.lon==null)return;const L=Ta(k);if(!m[L]){m[L]={loading:!0,weeks:[]};try{m[L]=await Xd(k.lat,k.lon)}catch{m[L]={weeks:[]}}o===L&&Ce()}}function ee(){te(),d==="plan"?(I().style.display="none",E().style.display="block",eu(E(),{units:a,anbau:n,mass:r,onSelect:k=>{o=k,ie("flaechen"),A()},onContext:(k,L,O)=>wa(k,L,O)})):(E().style.display="none",I().style.display="grid",ut(),Ce()),e.querySelectorAll(".km-modebtn").forEach(k=>k.classList.toggle("active",k.dataset.mode===d))}function ie(k){d=k,ee()}function te(){const k=x();if(!k)return;a.filter(z=>z.typ==="haus").length,a.filter(z=>z.typ==="acker").length;let L=0,O=null;a.forEach(z=>{const{current:P,next:N}=la(he(n,z));P&&L++,N?.pflanzDatum&&(!O||Le(N.pflanzDatum)<Le(O.pflanzDatum))&&(O=N)});const T=r.filter(z=>z.status==="geplant").length;k.innerHTML=`
      ${ye(String(a.length),"Flächen")}
      ${ye(String(L),"Kulturen aktiv")}
      ${ye(String(T),"Aufgaben offen")}
      ${ye(O?Pa(Et(O.pflanzDatum)):"–","Nächste Pflanzung")}
      <button class="km-psm" data-role="psm-import" title="Bestehende Pflanzenschutz-Einträge übernehmen"><i class="bi bi-arrow-down-circle"></i><span>PSM übernehmen</span></button>`,k.querySelector('[data-role="psm-import"]')?.addEventListener("click",ln)}const ye=(k,L)=>`<div class="km-kpi"><div class="km-kpi-v">${k}</div><div class="km-kpi-l">${g(L)}</div></div>`;function ut(){const k=h();if(!k)return;if(!a.length){k.innerHTML='<div class="km-empty"><i class="bi bi-geo-alt"></i><p>Noch keine Flächen.<br>Gewächshäuser unter Einstellungen, Freiland im Reiter „Karte".</p></div>';return}const L=a.filter(z=>z.typ==="haus"),O=a.filter(z=>z.typ==="acker"),T=(z,P)=>P.length?`<div class="km-grp">${g(z)}</div>`+P.map(Me).join(""):"";k.innerHTML=T("Gewächshäuser",L)+T("Freiland",O),k.querySelectorAll("[data-ukey]").forEach(z=>{z.addEventListener("click",()=>{o=z.dataset.ukey,ut(),Ce(),A()}),z.addEventListener("contextmenu",P=>{P.preventDefault(),wa(z.dataset.ukey,P.clientX,P.clientY)})})}function Me(k,L){const O=Ta(k),{current:T}=la(he(n,k));return`<div class="km-row${O===o?" sel":""}" data-ukey="${O}">
      <span class="km-dot" style="background:${g(T?ga(T):Q(k,L))}"></span>
      <div class="km-row-main"><div class="km-row-name">${g(k.name)}</div>
      <div class="km-row-sub">${T?`<span class="crop">${g(T.kultur||"Kultur")}</span>`:'<span class="free">frei</span>'}</div></div>
    </div>`}function Ce(){const k=S();if(!k)return;const L=o?F(o):null;if(!L){k.innerHTML='<div class="km-empty"><i class="bi bi-hand-index"></i><p>Fläche links wählen.</p></div>';return}const O=he(n,L),T=he(r,L),{current:z,next:P}=la(O),N=m[Ta(L)],ue=L.typ==="haus"?"Gewächshaus":"Freiland",pe=L.areaQm?`${Math.round(L.areaQm).toLocaleString("de-DE")} m²`:"";let fe;if(z){const G=z.pflanzDatum?`seit ${Lt(z.pflanzDatum)} · ${Pa(Et(z.pflanzDatum))}`:"",ae=rr(z);fe=`<div class="km-hero active" style="--cc:${g(ga(z))}">
        <div class="km-hero-ic"><i class="bi bi-flower2"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop">${g(z.kultur||"Kultur")}</div><div class="km-hero-sub">${g(G+ae+Ie(z))}</div></div>
        <button class="km-hero-edit" data-edit-crop="current" title="Bearbeiten"><i class="bi bi-pencil"></i></button>
      </div>`}else fe=`<div class="km-hero empty">
        <div class="km-hero-ic gray"><i class="bi bi-circle"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop gray">Fläche ist frei</div><div class="km-hero-sub">Noch keine Kultur eingetragen</div></div>
        <button class="km-hero-add" data-edit-crop="current"><i class="bi bi-plus-lg"></i> Kultur setzen</button>
      </div>`;const J=P?`<div class="km-next"><i class="bi bi-arrow-right-short"></i>Danach geplant: <b>${g(P.kultur||"Kultur")}</b> · ab ${Pa(Et(P.pflanzDatum))} <button class="km-next-edit" data-edit-crop="next" title="Bearbeiten"><i class="bi bi-pencil"></i></button></div>`:z?'<button class="km-next-add" data-edit-crop="next"><i class="bi bi-plus"></i> Nächste Kultur planen</button>':"";k.innerHTML=`
      <div class="km-head"><div class="km-head-l"><span class="km-head-name">${g(L.name)}</span><span class="km-head-badge">${ue}${pe?" · "+pe:""}</span></div>
        <button class="km-headbtn" data-act="map"><i class="bi bi-map"></i> Auf Karte</button></div>
      ${fe}
      ${J}
      ${Dt(O,T)}
      <div class="km-tasks-head"><span>Aufgaben</span><button class="km-addtask" data-act="add-massnahme"><i class="bi bi-plus-lg"></i> Aufgabe</button></div>
      ${Yt(T)}
      <div class="km-foot">
        <span class="km-weather">${nt(N)}</span>
        <button class="km-plan" data-act="plan"><i class="bi bi-calendar3"></i> Saison &amp; Plan</button>
      </div>
      <div class="km-attr">${g(jd)}${N?.stale?" · offline":""}</div>`,k.querySelector('[data-act="map"]')?.addEventListener("click",()=>ka()),k.querySelector('[data-act="plan"]')?.addEventListener("click",()=>ie("plan")),k.querySelector('[data-act="add-massnahme"]')?.addEventListener("click",()=>xa(L,null,z)),k.querySelectorAll("[data-edit-crop]").forEach(G=>G.addEventListener("click",()=>{const ae=G.dataset.editCrop;ea(L,ae==="current"?z:P,ae,O.length)})),k.querySelectorAll("[data-m-done]").forEach(G=>G.addEventListener("click",ae=>{ae.stopPropagation(),ir(G.dataset.mDone)})),k.querySelectorAll("[data-m-del]").forEach(G=>G.addEventListener("click",ae=>{ae.stopPropagation(),cn(G.dataset.mDel)})),k.querySelectorAll("[data-m-edit]").forEach(G=>G.addEventListener("click",()=>{const ae=r.find(me=>me.id===G.dataset.mEdit);xa(L,ae,z)}))}function Yt(k){const L=k.filter(N=>N.status==="geplant").sort((N,ue)=>(Le(N.planDatum)||9e15)-(Le(ue.planDatum)||9e15)),O=k.filter(N=>N.status==="erledigt").sort((N,ue)=>(Le(ue.erledigtDatum)||0)-(Le(N.erledigtDatum)||0)).slice(0,6),T=Number(st().replace(/-/g,"")),z=(N,ue)=>{const pe=fo(N.art),fe=ue?N.erledigtDatum:N.planDatum,J=!ue&&fe&&Le(fe)<T,G=ue?Lt(fe):on(fe,J),ae=N.notes||pe.label,me=N.historyId?'<span class="km-pill">PSM</span>':"",ke=[];N.notes&&ke.push(g(pe.label)),N.mittel&&ke.push(g(N.mittel)),N.menge!=null&&ke.push(`${N.menge}${N.einheit?" "+g(N.einheit):""}`);const Be=ke.join(" · ");return`<div class="km-task${ue?" done":""}" data-m-edit="${N.id}">
        <span class="km-task-ic" style="--mc:${pe.color}"><i class="bi ${pe.icon}"></i></span>
        <div class="km-task-main"><div class="km-task-title">${g(ae)}${me}</div>${Be?`<div class="km-task-sub">${Be}</div>`:""}</div>
        <span class="km-task-when${J?" overdue":""}">${G}</span>
        ${ue?`<button class="km-tbtn del" data-m-del="${N.id}" title="Löschen"><i class="bi bi-trash"></i></button>`:`<button class="km-check" data-m-done="${N.id}" title="Erledigt"><i class="bi bi-check-lg"></i></button>`}
      </div>`};let P="";return L.length?P+=L.map(N=>z(N,!1)).join(""):P+='<div class="km-tasks-none"><i class="bi bi-check2-circle"></i> Nichts offen</div>',O.length&&(P+='<div class="km-done-h">Erledigt</div>'+O.map(N=>z(N,!0)).join("")),`<div class="km-tasks">${P}</div>`}function Et(k){const L=new Date(String(k).slice(0,10)+"T00:00:00");return isNaN(L.getTime())?0:On(L).week}function Lt(k){const L=new Date(String(k).slice(0,10)+"T00:00:00");return isNaN(L.getTime())?"":`${L.getDate()}. ${au[L.getMonth()]}`}function on(k,L){if(!k)return"offen";const O=new Date(String(k).slice(0,10)+"T00:00:00");if(isNaN(O.getTime()))return"offen";const T=new Date;T.setHours(0,0,0,0);const z=Math.round((O.getTime()-T.getTime())/864e5);return z===0?"heute":z===1?"morgen":L?"überfällig":Lt(k)}function nt(k){if(!k||!k.weeks?.length)return k?.loading?"Wetter lädt…":"";const{year:L,week:O}=On(new Date),T=k.weeks.find(N=>N.year===L&&N.week===O)||k.weeks.find(N=>!N.isForecast);if(!T)return"";const z=T.tMaxAvg!=null?Math.round(T.tMaxAvg)+"°":"–",P=T.precipSum!=null?Math.round(T.precipSum)+" mm":"–";return`<i class="bi bi-cloud-sun"></i> Diese Woche: ${z} · ${P} Regen`}function rr(k){const L=k.ernteVon?Pa(Et(k.ernteVon)):null,O=k.ernteBis||k.ernteDatum,T=O?Pa(Et(O)):null;return L&&T?` · Ernte ${L}–${T}`:T?` · Ernte ~${T}`:L?` · Ernte ab ${L}`:""}function Ie(k){return!k||k.menge==null||k.menge===""?"":` · ${k.menge} ${k.einheit||"Pflanzen"}`}function Dt(k,L){if(!k.length&&!L.length)return"";const O=new Date;let T=new Date(O.getFullYear(),O.getMonth()-1,1),z=new Date(O.getFullYear(),O.getMonth()+4,1);const P=H=>{if(!H)return;const ce=new Date(String(H).slice(0,10)+"T00:00:00");isNaN(ce.getTime())||(ce<T&&(T=new Date(ce.getFullYear(),ce.getMonth(),1)),ce>z&&(z=new Date(ce.getFullYear(),ce.getMonth(),1)))};k.forEach(H=>{P(H.pflanzDatum),P(H.ernteBis||H.ernteDatum),P(H.ernteVon)}),L.forEach(H=>P(H.planDatum||H.erledigtDatum));const N=bo(T,z),ue=N.length,pe=`background-size:${(100/ue).toFixed(4)}% 100%`,fe=H=>H==null?null:(H*100).toFixed(2)+"%",J=Ke(N,O.toISOString()),G=J!=null?`<div class="ks-today" style="left:${fe(J)}"></div>`:"",ae=N.map(H=>`<div class="ks-mo${H.y===O.getFullYear()&&H.m===O.getMonth()?" cur":""}">${go[H.m]}</div>`).join("");let me="";k.forEach((H,ce)=>{const xe=Ke(N,H.pflanzDatum);let se=Ke(N,H.ernteBis||H.ernteDatum||H.pflanzDatum);if(xe==null)return;(se==null||se<=xe)&&(se=Math.min(1,xe+.5/ue));const Re=ga(H,ce);me+=`<div class="ks-bar${H.status==="geplant"?" planned":""}" style="left:${fe(xe)};width:${((se-xe)*100).toFixed(2)}%;--cc:${g(Re)}"><span>${g(H.kultur||"")}</span></div>`;const W=Ke(N,H.ernteVon),Z=Ke(N,H.ernteBis);W!=null&&Z!=null&&Z>W&&(me+=`<div class="ks-harvest" style="left:${fe(W)};width:${((Z-W)*100).toFixed(2)}%"></div>`)});const ke={};L.forEach(H=>{(ke[H.art]=ke[H.art]||[]).push(H)});const Be=Bd.filter(H=>ke[H]).map(H=>{const ce=Zn[H],xe=ke[H].map(se=>{const Re=se.status==="erledigt"?se.erledigtDatum||se.planDatum:se.planDatum||se.erledigtDatum,W=Ke(N,Re);return W==null?"":`<span class="ks-mk${se.status==="erledigt"?" done":""}" title="${g(ce.label+(se.notes?": "+se.notes:""))}" style="left:${fe(W)};--mc:${ce.color}"></span>`}).join("");return`<div class="ks-row"><div class="ks-rl">${g(ce.label)}</div><div class="ks-track" style="${pe}">${xe}${G}</div></div>`}).join("");return`<div class="ks-wrap">
      <div class="ks-head"><div class="ks-rl"></div><div class="ks-axis">${ae}</div></div>
      <div class="ks-row"><div class="ks-rl">Kultur</div><div class="ks-track" style="${pe}">${me}${G}</div></div>
      ${Be}
      <div class="ks-legend"><span><span class="ks-d done"></span>erledigt</span><span><span class="ks-d"></span>geplant</span><span style="margin-left:auto"><span class="ks-hbar"></span>Ernte-Zeitraum</span></div>
    </div>`}function ka(k){Ve("app",L=>({...L,activeSection:"acker"})),B.info("Karte geöffnet.")}async function ln(){if(!U()){B.warning("Keine Datenbank aktiv.");return}try{const k=await $i();await D(),ee(),k?.imported?(B.success(`${k.imported} übernommen.`),K()):B.info(`Nichts Neues${k?.skipped?` (${k.skipped} nicht zuordenbar)`:""}.`)}catch{B.error("Übernahme fehlgeschlagen.")}}async function ir(k){const L=r.find(O=>O.id===k);if(L)try{await Ai({...L,status:"erledigt",erledigtDatum:L.erledigtDatum||st()}),await D(),ee(),K()}catch{B.error("Speichern fehlgeschlagen.")}}async function cn(k){try{await zi({id:k}),await D(),ee(),K()}catch{B.error("Löschen fehlgeschlagen.")}}let we=null;const $t=()=>{we&&(we.remove(),we=null,document.removeEventListener("pointerdown",Xt,!0))},Xt=k=>{we&&!we.contains(k.target)&&$t()};function dn(k,L,O,T){if($t(),we=document.createElement("div"),we.className="km-ctx",T){const P=document.createElement("div");P.className="km-ctx-t",P.textContent=T,we.appendChild(P)}O.forEach(P=>{if(P.sep){const ue=document.createElement("div");ue.className="km-ctx-sep",we.appendChild(ue);return}const N=document.createElement("button");N.className="km-ctx-i",N.innerHTML=`<i class="bi ${P.icon}"></i><span>${g(P.label)}</span>`,N.addEventListener("click",()=>{$t(),P.action?.()}),we.appendChild(N)}),document.body.appendChild(we);const z=we.getBoundingClientRect();we.style.left=Math.max(8,Math.min(k,window.innerWidth-z.width-8))+"px",we.style.top=Math.max(8,Math.min(L,window.innerHeight-z.height-8))+"px",setTimeout(()=>document.addEventListener("pointerdown",Xt,!0),0)}function wa(k,L,O){const T=F(k);if(!T)return;const z=he(n,T),{current:P}=la(z);dn(L,O,[{icon:"bi-flower2",label:P?"Kultur bearbeiten":"Kultur setzen",action:()=>ea(T,P,"current",z.length)},{icon:"bi-plus-lg",label:"Nächste Kultur planen",action:()=>ea(T,null,"next",z.length)},{icon:"bi-list-check",label:"Aufgabe planen",action:()=>xa(T,null,P)},{sep:!0},{icon:"bi-arrow-right-circle",label:"Fläche öffnen",action:()=>{o=k,ie("flaechen"),A()}},{icon:"bi-map",label:"Auf Karte",action:()=>ka()}],T.name)}function Ze(){v&&(v.remove(),v=null)}function un(k,L,O,T){Ze();const z=document.createElement("div");return z.className="kmodal-ov",z.innerHTML=`<div class="kmodal" role="dialog" aria-modal="true">
      <div class="kmodal-h"><span>${g(k)}</span><button class="kmodal-x" aria-label="Schließen"><i class="bi bi-x-lg"></i></button></div>
      <div class="kmodal-b">${L}</div>
      <div class="kmodal-f"><button class="btn-cancel" data-k="cancel">Abbrechen</button><button class="btn-save" data-k="save">${g(O)}</button></div></div>`,e.appendChild(z),v=z,z.querySelector(".kmodal-x").addEventListener("click",Ze),z.querySelector('[data-k="cancel"]').addEventListener("click",Ze),z.addEventListener("mousedown",P=>{P.target===z&&Ze()}),z.querySelector('[data-k="save"]').addEventListener("click",()=>{T(z)!==!1&&Ze()}),z.querySelectorAll("[data-more]").forEach(P=>P.addEventListener("click",()=>{const N=z.querySelector("[data-more-box]");N&&(N.hidden=!1,P.style.display="none")})),setTimeout(()=>z.querySelector("input,select,textarea,.km-tile")?.focus?.(),30),z}function sr(){const k=new Set,L=[],O=z=>{const P=String(z||"").trim().toLowerCase();z&&!k.has(P)&&(k.add(P),L.push(z))};return l.forEach(z=>O(z.name)),s.forEach(z=>O(z.kultur)),`<datalist id="km-kultur-dl">${L.map(z=>`<option value="${g(z)}"></option>`).join("")}</datalist>`}function ea(k,L,O,T){const z=O==="next"&&!L,P=L||{},N=(P.kulturStammId?l.find(W=>W.id===P.kulturStammId):null)||En(l,P.kultur),ue=P.pflanzDatum?.slice(0,10)||(z?"":st()),pe=Gt.map(W=>`<button type="button" class="km-sw${(P.color||"")===W?" on":""}" data-col="${W}" style="background:${W}"></button>`).join(""),fe=qd.map(W=>`<option value="${g(W)}"${(P.einheit||"Pflanzen")===W?" selected":""}>${g(W)}</option>`).join(""),J=`
      <label class="km-fld big">Was wächst hier?<input list="km-kultur-dl" data-f="kultur" value="${g(P.kultur||"")}" placeholder="z. B. Tomate – aus Bibliothek wählen" autocomplete="off" /></label>${sr()}
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
        <label class="km-fld">Aussaat<input type="date" data-f="aussaat" value="${(P.aussaatDatum||"").slice(0,10)}" /></label>
        <label class="km-fld">${z?"Geplante Pflanzung":"Pflanzung"}<input type="date" data-f="pflanz" value="${ue}" /></label>
      </div>
      <div class="km-frow2">
        <label class="km-fld">Ernte von<input type="date" data-f="ernteVon" value="${(P.ernteVon||"").slice(0,10)}" /></label>
        <label class="km-fld">Ernte bis<input type="date" data-f="ernteBis" value="${(P.ernteBis||P.ernteDatum||"").slice(0,10)}" /></label>
      </div>
      <div class="km-hint2"><i class="bi bi-info-circle"></i> Termine kommen automatisch aus der Bibliothek – jederzeit frei überschreibbar.</div>
      <div class="km-frow2">
        <label class="km-fld">Menge<input type="number" step="1" min="0" data-f="menge" value="${P.menge!=null?P.menge:""}" placeholder="optional" /></label>
        <label class="km-fld">Einheit<select data-f="einheit">${fe}</select></label>
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
        <label class="km-fld">Status<select data-f="status">${["aktiv","geplant","abgeschlossen"].map(W=>`<option value="${W}"${(P.status||(z?"geplant":"aktiv"))===W?" selected":""}>${Nd[W].label}</option>`).join("")}</select></label>
        <div class="km-fld">Farbe<div class="km-sws">${pe}</div></div>
        <label class="km-fld">Notiz<textarea data-f="notes" rows="2" placeholder="optional">${g(P.notes||"")}</textarea></label>
      </div>
      ${L?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Satz löschen</button>':""}`,G=un(L?"Satz bearbeiten":z?"Nächsten Satz planen":"Satz eintragen",J,"Speichern",W=>{const Z=Rt=>W.querySelector(`[data-f="${Rt}"]`)?.value?.trim()||"",Ne=Z("kultur");if(!Ne)return B.warning("Bitte eine Kultur angeben."),!1;const Sa=En(l,Ne),Ea=Z("aussaat")||null,Ht=Z("pflanz")||null,pn=Z("ernteVon")||null,ta=Z("ernteBis")||null,pt=Z("menge"),ge=pt?Number(pt):null,Qe=W.querySelector('[data-f="einheit"]')?.value||null,rt=!W.querySelector("[data-more-box]").hidden;let Ot=rt?Z("status"):"";Ot||(Ot=z||Ht&&Le(Ht)>Number(st().replace(/-/g,""))?"geplant":"aktiv");const _t=W.querySelector(".km-sw.on")?.dataset.col||P.color||Sa?.color||Gt[T%Gt.length],La=s.find(Rt=>Rt.kultur===Ne)?.eppoCode||Sa?.eppoCode||null,or=rt?Z("notes")||null:P.notes||null,Da={flaecheTyp:k.typ,flaecheId:k.id,kultur:Ne,eppoCode:La,color:_t,menge:ge,einheit:Qe,kulturStammId:Sa?.id||P.kulturStammId||null,notes:or},fn=!L&&W.querySelector('[data-f="succOn"]')?.checked,$a=Math.max(2,Math.min(20,Number(W.querySelector('[data-f="succN"]')?.value)||2)),aa=Math.max(1,Number(W.querySelector('[data-f="succGap"]')?.value)||14),mn=Number(st().replace(/-/g,""));(async()=>{try{if(fn){const Rt="sg-"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),lr={aussaatDatum:Ea,pflanzDatum:Ht,ernteVon:pn,ernteBis:ta};for(let na=0;na<$a;na++){const za=Od(lr,na*aa),i=za.pflanzDatum&&Le(za.pflanzDatum)>mn?"geplant":Ot;await Pi({...Da,...za,ernteDatum:null,status:i,satzGruppe:Rt})}B.success(`${$a} Sätze angelegt.`)}else await Pi({id:L?.id,...Da,aussaatDatum:Ea,pflanzDatum:Ht,ernteVon:pn,ernteBis:ta,ernteDatum:null,status:Ot,satzGruppe:P.satzGruppe||null});await D(),ee(),K()}catch{B.error("Speichern fehlgeschlagen.")}})()});let ae="pflanz";const me=W=>G.querySelector(`[data-f="${W}"]`),ke=G.querySelector("[data-anchor-row]"),Be=G.querySelector("[data-stammhint]");let H=N;const ce=()=>{if(!H){Be.hidden=!0,ke.style.opacity="0.45";return}ke.style.opacity="1";const Z=[Td[H.anbauMethode==="anzucht"?"anzucht":"direkt"].short];H.kulturTage&&Z.push(`${H.kulturTage} T. Kultur`),H.anbauMethode==="anzucht"&&H.anzuchtTage&&Z.push(`${H.anzuchtTage} T. Anzucht`),H.familie&&Z.push(H.familie),Be.innerHTML=`<i class="bi bi-stars"></i> <b>Bibliothek:</b> ${g(Z.join(" · "))}`,Be.hidden=!1},xe=()=>{if(!H)return;const Z=me(ae==="ernte"?"ernteVon":ae).value||st(),Ne=Hd(H,ae,Z);Ne.aussaatDatum!=null&&(me("aussaat").value=Ne.aussaatDatum||""),Ne.pflanzDatum!=null&&(me("pflanz").value=Ne.pflanzDatum||""),Ne.ernteVon!=null&&(me("ernteVon").value=Ne.ernteVon||""),Ne.ernteBis!=null&&(me("ernteBis").value=Ne.ernteBis||"")},se=me("kultur");se.addEventListener("input",()=>{H=En(l,se.value),ce()}),se.addEventListener("change",()=>{H=En(l,se.value),ce(),H&&(me("pflanz").value||(me("pflanz").value=st()),xe())}),G.querySelectorAll("[data-anchor]").forEach(W=>W.addEventListener("click",()=>{G.querySelectorAll("[data-anchorseg] .km-segb").forEach(Z=>Z.classList.remove("on")),W.classList.add("on"),ae=W.dataset.anchor,xe()})),["aussaat","pflanz","ernteVon"].forEach(W=>me(W)?.addEventListener("change",()=>{W===(ae==="ernte"?"ernteVon":ae)&&xe()})),ce();const Re=G.querySelector('[data-f="succOn"]');Re?.addEventListener("change",()=>{G.querySelector("[data-succ-box]").hidden=!Re.checked}),G.querySelectorAll(".km-sw").forEach(W=>W.addEventListener("click",()=>{G.querySelectorAll(".km-sw").forEach(Z=>Z.classList.remove("on")),W.classList.add("on")})),G.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(L?.id)try{await sl({id:L.id}),await D(),ee(),K(),Ze()}catch{B.error("Löschen fehlgeschlagen.")}})}function xa(k,L,O){const T=L||{art:"bewaesserung",status:"geplant"},z=tu.map(J=>`<button type="button" class="km-tile${(T.art||"bewaesserung")===J.art?" on":""}" data-art="${J.art}" style="--ac:${Zn[J.art].color}"><i class="bi ${J.icon}"></i><span>${g(J.label)}</span></button>`).join(""),P=(T.status||"geplant")==="erledigt",N=(P?T.erledigtDatum:T.planDatum)||st(),ue=`
      <div class="km-tasktiles">${z}</div>
      <div class="km-fld">Wann?<div class="km-when" data-when>
        <button type="button" class="km-chip" data-day="0">Heute</button>
        <button type="button" class="km-chip" data-day="1">Morgen</button>
        <button type="button" class="km-chip" data-day="x">Datum…</button>
        <input type="date" data-f="datum" value="${N.slice(0,10)}" />
      </div></div>
      <div class="km-seg" data-seg>
        <button type="button" class="km-segb${P?"":" on"}" data-status="geplant"><i class="bi bi-clock"></i> Geplant</button>
        <button type="button" class="km-segb${P?" on":""}" data-status="erledigt"><i class="bi bi-check-lg"></i> Erledigt</button>
      </div>
      <button type="button" class="km-more" data-more><i class="bi bi-sliders"></i> Notiz, Menge, Mittel</button>
      <div class="km-more-box" data-more-box hidden>
        <label class="km-fld">Bezeichnung<input data-f="notes" value="${g(T.notes||"")}" placeholder="z. B. Kompostgabe" /></label>
        <div class="km-frow2">
          <label class="km-fld">Menge<input type="number" step="0.1" data-f="menge" value="${T.menge!=null?T.menge:""}" placeholder="optional" /></label>
          <label class="km-fld">Einheit<input data-f="einheit" value="${g(T.einheit||"")}" placeholder="kg/ha, l" /></label>
        </div>
        <label class="km-fld">Mittel<input data-f="mittel" value="${g(T.mittel||"")}" placeholder="optional" /></label>
      </div>
      ${L?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Aufgabe löschen</button>':""}`,pe=un(L?"Aufgabe bearbeiten":"Aufgabe hinzufügen",ue,"Speichern",J=>{const G=J.querySelector(".km-tile.on")?.dataset.art||"bewaesserung",ae=J.querySelector(".km-segb.on")?.dataset.status||"geplant",me=J.querySelector('[data-f="datum"]').value||st(),ke=!J.querySelector("[data-more-box]").hidden,Be=ce=>{const xe=J.querySelector(`[data-f="${ce}"]`)?.value;return xe?Number(xe):null},H=ce=>J.querySelector(`[data-f="${ce}"]`)?.value.trim()||null;(async()=>{try{await Ai({id:L?.id,flaecheTyp:k.typ,flaecheId:k.id,anbauId:L?.anbauId||O?.id||null,art:G,status:ae,planDatum:ae==="geplant"?me:L?.planDatum||null,erledigtDatum:ae==="erledigt"?me:null,menge:ke?Be("menge"):L?.menge??null,einheit:ke?H("einheit"):L?.einheit||null,mittel:ke?H("mittel"):L?.mittel||null,historyId:L?.historyId||null,notes:ke?H("notes"):L?.notes||null}),await D(),ee(),K()}catch{B.error("Speichern fehlgeschlagen.")}})()});pe.querySelectorAll(".km-tile").forEach(J=>J.addEventListener("click",()=>{pe.querySelectorAll(".km-tile").forEach(G=>G.classList.remove("on")),J.classList.add("on")})),pe.querySelectorAll(".km-segb").forEach(J=>J.addEventListener("click",()=>{pe.querySelectorAll(".km-segb").forEach(G=>G.classList.remove("on")),J.classList.add("on")}));const fe=pe.querySelector('[data-f="datum"]');pe.querySelectorAll("[data-day]").forEach(J=>J.addEventListener("click",()=>{const G=J.dataset.day;if(G==="x"){fe.style.display="inline-block",fe.showPicker?.();return}const ae=new Date;ae.setDate(ae.getDate()+Number(G)),fe.value=ae.toISOString().slice(0,10),fe.style.display="none"})),pe.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(L?.id)try{await zi({id:L.id}),await D(),ee(),K(),Ze()}catch{B.error("Löschen fehlgeschlagen.")}})}e.querySelectorAll(".km-modebtn").forEach(k=>k.addEventListener("click",()=>ie(k.dataset.mode))),document.addEventListener("keydown",k=>{k.key==="Escape"&&(v&&Ze(),$t())}),window.addEventListener("psm:openKultur",k=>{const L=k?.detail;!L?.typ||!L?.id||(o=L.typ+":"+L.id,ie("flaechen"),f&&(ut(),Ce(),A()))}),t.state.subscribe(k=>{k?.app?.activeSection==="kultur"&&(f?(async()=>(a=await vs(t),ee(),A()))():(f=!0,q()))}),te()}function ru(){return`
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
  </section>`}const iu=["pflanzenschutz.json","history.json","entries.json"];let ys=!1,R=null,xt=!1;const Qt=25,Dr=new Intl.NumberFormat("de-DE");let De=0,Dn=null,ks=null;const su=Vs({id:"import",label:"Import-Vorschau",budget:{initialLoad:20,maxItems:50}});let Vr=null;function ou(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function lu(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function cu(e,t){const a=e.querySelector('[data-role="import-log-list"]');if(a){if(!t.length){a.innerHTML='<tr><td colspan="5" class="text-muted small">Noch keine Importe protokolliert.</td></tr>';return}a.innerHTML=t.map(n=>{const r=n.rangeStart||n.rangeEnd?`${Va(n.rangeStart)||n.rangeStart||"?"} – ${Va(n.rangeEnd)||n.rangeEnd||"?"}`:"-",s=[n.source,n.device].filter(Boolean),l=s.length?g(s.join(" · ")):"-";return`
        <tr>
          <td>${g(lu(n.importedAt))}</td>
          <td>${l}</td>
          <td class="text-end text-success">${n.added}</td>
          <td class="text-end text-muted">${n.skipped}</td>
          <td class="small text-muted">${g(r)}</td>
        </tr>`}).join("")}}async function Fn(e){if(de()==="sqlite")try{const t=await ol(50);cu(e,t.items||[])}catch(t){console.warn("Import-Historie konnte nicht geladen werden",t)}}function St(e,t,a="info"){const n=e.querySelector('[data-role="import-hint"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a} small mt-3`,n.textContent=t}}function Ut(e,t){const a=e.querySelector('[data-role="import-feedback"]');a&&(a.textContent=t)}function Ft(e){const t=e.querySelector('[data-action="clear-import"]'),a=e.querySelector('[data-action="focus-import"]'),n=e.querySelector('[data-action="run-import"]'),r=!!R;if(t&&(t.disabled=!r||xt),a&&(a.disabled=!r||xt),n){const s=!!(R?.importableEntries?.length&&R.stats||R?.fotos?.length);n.disabled=!r||!s||xt}}function du(e){R=null,yu(e);const t=e.querySelector('[data-role="import-summary-card"]'),a=e.querySelector('[data-role="import-file"]');t&&t.classList.add("d-none"),a&&(a.value=""),Ut(e,""),St(e,"Bereit für eine neue Importdatei."),Ft(e),ca()}function ho(e){if(e.dateIso)return e.dateIso;if(e.datum){const t=new Date(e.datum);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.date){const t=new Date(e.date);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.savedAt){const t=new Date(e.savedAt);if(!Number.isNaN(t.getTime()))return t.toISOString()}return null}function Qn(e){return e?Va(e)||e.slice(0,10):"-"}function vo(e){return e.savedAt||(e.savedAt=e.createdAt||e.dateIso||new Date().toISOString()),e}function ws(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function uu(e){if(!e||typeof e!="object")return null;const t={...e};if(!Array.isArray(t.items)){const a=e.items;t.items=Array.isArray(a)?[...a]:[]}return vo(t),t}function yo(e,t){const a=e.map(n=>ho(n)).filter(n=>!!n).sort();return{startIso:a[0]||t?.filters?.startDate||null,endIso:a[a.length-1]||t?.filters?.endDate||null}}function pu(e){if(!e)return;const t=ws(e.startIso,"start"),a=ws(e.endIso,"end");if(!t&&!a)return;const n={};return t&&(n.startDate=t),a&&(n.endDate=a),n}async function ko(e,t){if(de()!=="sqlite"){const o=je(e.history);return new Set(o.map(d=>Jn(d)).filter(d=>!!d))}const n=pu(t);if(!n)return new Set;const r=new Set;let s=1;const l=500;try{for(;;){const o=await Ts({page:s,pageSize:l,filters:n,sortDirection:"asc"});if(o.items.forEach(d=>{const f=Jn(d);f&&r.add(f)}),s*l>=o.totalCount)break;s+=1}}catch(o){return console.warn("Konnte vorhandene Einträge für Duplikatprüfung nicht laden",o),new Set}return r}function Jn(e){const t=typeof e.clientUuid=="string"&&e.clientUuid?e.clientUuid:"";if(t)return`uuid:${t}`;const a=e.savedAt||e.dateIso||e.createdAt||e.datum||"",n=e.ersteller||"",r=e.kultur||"",s=e.invekos||e.standort||"";return[a,n,r,s].join("|")}function fu(e,t,a,n){const r=n||yo(e,a),s=r.startIso,l=r.endIso,o=new Set,d=new Set;return t.forEach(f=>{f.ersteller&&o.add(f.ersteller),f.kultur&&d.add(f.kultur)}),{startDateLabel:Qn(s),endDateLabel:Qn(l),startDateRaw:s,endDateRaw:l,entryCount:e.length,importableCount:t.length,duplicateCount:e.length-t.length,creators:Array.from(o).slice(0,5),crops:Array.from(d).slice(0,5)}}function mu(e,t){const a=e.querySelector('[data-role="import-stats"]');if(!a)return;if(!t){a.innerHTML="";return}const n=t.stats,r=t.metadata?.filters;a.innerHTML=`
    <div class="col-12 col-md-4">
      <div class="border rounded p-3 h-100">
        <div class="text-muted small">Zeitraum</div>
        <div class="fw-bold">${g(n.startDateLabel)} – ${g(n.endDateLabel)}</div>
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
        <div class="fw-bold">${g(r?.label||r?.scope||"—")}</div>
        <div class="text-muted small">${g(r?[r.creator,r.crop].filter(Boolean).join(" · ")||"Keine zusätzlichen Filter":"Keine Angaben")}</div>
      </div>
    </div>
  `}function gu(e,t){const a=e.querySelector('[data-role="import-warnings"]');if(!a)return;if(!t||!t.warnings.length){a.innerHTML="";return}const n=t.warnings.map(r=>`<li>${g(r)}</li>`).join("");a.innerHTML=`
    <div class="alert alert-warning">
      <strong>Hinweise:</strong>
      <ul class="mb-0">${n}</ul>
    </div>
  `}function wo(e){const t=e.entries.length;if(!t)return De=0,{start:0,end:0,total:0};const a=Math.max(Math.ceil(t/Qt),1);De>=a&&(De=a-1),De<0&&(De=0);const n=De*Qt,r=Math.min(n+Qt,t);return{start:n,end:r,total:t}}function bu(e){const t=e.querySelector('[data-role="import-pager"]');return t?((!Dn||ks!==t)&&(Dn?.destroy(),Dn=nn(t,{onPrev:()=>hu(e),onNext:()=>vu(e),labels:{prev:"Zurück",next:"Weiter",loading:"Vorschau wird geladen...",empty:"Keine Einträge verfügbar"}}),ks=t),Dn):null}function Ua(e,t){const a=bu(e);if(!a)return;if(!t){De=0,a.update({status:"hidden"});return}const n=t.entries.length;if(!n){De=0,a.update({status:"disabled",info:"Keine Einträge vorhanden."});return}const{start:r,end:s}=wo(t),l=`Einträge ${Dr.format(r+1)}–${Dr.format(s)} von ${Dr.format(n)}`;a.update({status:"ready",info:l,canPrev:De>0,canNext:s<n})}function hu(e){!R||De===0||(De=Math.max(De-1,0),gi(e,R))}function vu(e){if(!R)return;const t=R.entries.length;if(!t)return;const a=Math.max(Math.ceil(t/Qt)-1,0);De>=a||(De=Math.min(De+1,a),gi(e,R))}function yu(e){De=0,e&&Ua(e,R)}function gi(e,t){const a=e.querySelector('[data-role="import-preview-table"]');if(!a){ca();return}if(!t){a.innerHTML="",Ua(e,null),ca();return}if(!t.entries.length){a.innerHTML='<tr><td colspan="5" class="text-center text-muted">Keine Einträge</td></tr>',Ua(e,t),ca();return}const{start:r,end:s}=wo(t),o=t.entries.slice(r,s).map(d=>{const f=Qn(ho(d));return`
        <tr>
          <td>${g(f)}</td>
          <td>${g(d.kultur||"-")}</td>
          <td>${g(d.ersteller||"-")}</td>
          <td>${g(d.standort||d.invekos||"-")}</td>
          <td>${g(d.savedAt?Qn(d.savedAt):"-")}</td>
        </tr>
      `}).join("");a.innerHTML=o,Ua(e,t),ca()}async function ku(e){const t=dl(e),a=Object.keys(t),n=a.find(f=>iu.some(u=>f.toLowerCase().endsWith(u)));if(!n)throw new Error("ZIP enthält keine 'pflanzenschutz.json'.");const r=JSON.parse(zr(t[n])),s=a.find(f=>f.toLowerCase().endsWith("metadata.json")),l=s?JSON.parse(zr(t[s])):null,o=Array.isArray(r)?r:Array.isArray(r.entries)?r.entries:Array.isArray(r.history)?r.history:[],d=Array.isArray(r?.fotos)?r.fotos:[];for(const f of d){if(f?.data)continue;const u=f?.file?String(f.file):null,m=u?a.find(v=>v===u||v.toLowerCase().endsWith(u.toLowerCase())):null;m&&t[m]&&(f.data=wu(t[m]),f.mime||(f.mime="image/jpeg"))}return{entries:o,metadata:l,fotos:d}}function wu(e){let t="";for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode(...e.subarray(n,n+32768));return btoa(t)}async function xu(e){const t=zr(e),a=JSON.parse(t);if(Array.isArray(a))return{entries:a,metadata:null,fotos:[]};const n=Array.isArray(a.fotos)?a.fotos:[];if(Array.isArray(a.entries))return{entries:a.entries,metadata:a.metadata||null,fotos:n};if(Array.isArray(a.history))return{entries:a.history,metadata:a.metadata||null,fotos:n};if(n.length)return{entries:[],metadata:a.metadata||null,fotos:n};throw new Error("JSON enthält keine Eintragsliste.")}async function Su(e,t){const a=new Uint8Array(await e.arrayBuffer()),n=/\.zip$/i.test(e.name)||e.type==="application/zip",{entries:r,metadata:s,fotos:l}=n?await ku(a):await xu(a),o=Array.isArray(l)?l:[],d=(Array.isArray(r)?r:[]).map(x=>uu(x)).filter(x=>!!x);if(!d.length&&!o.length)throw new Error("Die Datei enthielt keine verwertbaren Einträge.");const f=yo(d,s),u=await ko(t,f),m=new Set,v=[];let w=0;d.forEach(x=>{const E=Jn(x);if(!E){v.push(x);return}if(u.has(E)||m.has(E)){w+=1;return}m.add(E),v.push(x)});const h=fu(d,v,s,f),S=[];return w&&S.push(`${w} Datensätze wurden wegen gleicher Kennung übersprungen.`),(!h.startDateRaw||!h.endDateRaw)&&S.push("Zeitraum konnte nicht eindeutig ermittelt werden."),{filename:e.name,entries:d,importableEntries:v,metadata:s,stats:h,warnings:S,lastImportRefs:[],fotos:o}}function xs(){if(!R)return"Keine Datei";const e=[];return xt&&e.push("Verarbeitung"),R.warnings.length&&e.push("Warnungen"),R.stats.importableCount<R.stats.entryCount&&e.push("Duplikate entfernt"),e.length?e.join(" · "):void 0}function Eu(){const e=!!R,t=e?Math.max(Math.ceil((R?.entries.length||0)/Qt),1):null,a=e?{items:R?.entries.length??0,totalCount:R?.stats.entryCount??null,cursor:R&&(R.entries.length||0)>Qt?`Seite ${De+1}${t?` / ${t}`:""}`:null,payloadKb:Qs(R?.entries.slice(0,Qt)),lastUpdated:Vr,note:xs()}:{items:0,totalCount:0,cursor:null,payloadKb:0,lastUpdated:Vr,note:xs()};Zs(su,a)}function ca(){Vr=new Date().toISOString(),Eu()}function Zr(e){const t=e.querySelector('[data-role="import-summary-card"]');if(!t)return;if(!R){t.classList.add("d-none"),Ua(e,null),Ft(e),ca();return}t.classList.remove("d-none"),De=0;const a=t.querySelector('[data-role="import-file-name"]'),n=t.querySelector('[data-role="import-summary-subline"]');a&&(a.textContent=R.filename),n&&(n.textContent=`${R.stats.importableCount} von ${R.stats.entryCount} Einträgen importierbar`),mu(e,R),gu(e,R),gi(e,R),Ft(e)}async function Lu(){const e=de();if(!e||e==="memory"||e==="sqlite")return;const t=Ye();await Xe(t)}function Ss(e,t){if(!t.length)return[];const a=typeof e.state.updateSlice=="function"?e.state.updateSlice:Ve,n=[];return a("history",r=>{const s=tn(r),l=s.items.slice(),o=l.length;return t.forEach((d,f)=>{n.push(o+f),l.push(d)}),{...s,items:l,totalCount:l.length,lastUpdatedAt:new Date().toISOString()}}),n}async function Du(e,t){if(!R){window.alert("Bitte zuerst eine Importdatei laden.");return}const a=R.fotos||[];if(!R.importableEntries.length&&!a.length){window.alert("Alle Einträge wurden bereits importiert oder als Duplikat erkannt.");return}xt=!0,Ft(e),Ut(e,"Import läuft ...");const n=t.state.getState(),r={startIso:R.stats.startDateRaw,endIso:R.stats.endDateRaw};let s=new Set;try{s=await ko(n,r)}catch(S){console.warn("Duplikatprüfung vor Import fehlgeschlagen",S)}const l=new Set(s),o=[];let d=0;if(R.importableEntries.forEach(S=>{const x=Jn(S);if(x&&l.has(x)){d+=1;return}x&&l.add(x),o.push(S)}),!o.length&&!a.length){Ut(e,"Keine neuen Einträge gefunden."),St(e,"Alle Datensätze sind bereits importiert worden.","warning"),xt=!1,Ft(e);return}const f=de(),u=[],m=[];let v=0,w=0;const h=o.map(S=>vo({...S}));try{if(f==="sqlite"){const I=[];for(const U of h)try{const K=await Ds(U);if(K?.duplicate){d+=1;continue}K?.id!=null&&(u.push({source:"sqlite",ref:K.id}),I.push(U))}catch(K){console.error("appendHistoryEntry failed",K),m.push(U.savedAt||"Unbekannter Eintrag")}Ss(t,I);for(const U of a)try{(await ll(U))?.duplicate?w+=1:v+=1}catch(K){console.error("appendFoto failed",K)}v&&window.dispatchEvent(new CustomEvent("fotos:changed"));try{await tt()}catch(U){console.warn("SQLite-Datei konnte nach dem Import nicht gespeichert werden",U)}}else Ss(t,h).forEach(U=>{u.push({source:"state",ref:U})}),await Lu();const S=u.length;if(S||v){f==="sqlite"&&S&&t.events?.emit?.("history:data-changed",{type:"created-bulk",count:S});const I=[];S&&I.push(`${S} Einträge`),v&&I.push(`${v} Foto(s)`),Ut(e,`${I.join(" und ")} importiert.${m.length?` ${m.length} Einträge konnten nicht übernommen werden.`:""}`.trim()),R.lastImportRefs=u,R.importableEntries=[],R.stats={...R.stats,importableCount:0},Zr(e)}else Ut(e,"Keine neuen Daten importiert.");const x=[];let E="success";if(m.length&&(x.push(`${m.length} Einträge konnten nicht gespeichert werden. Details siehe Konsole.`),E="warning"),d&&(x.push(`${d} Einträge wurden während des Imports als Duplikat übersprungen.`),E="warning"),w&&x.push(`${w} Foto(s) waren bereits vorhanden (übersprungen).`),x.length||x.push("Import abgeschlossen."),St(e,x.join(" "),E),f==="sqlite"&&(S||d||v||w))try{const I=[];m.length&&I.push(`${m.length} fehlgeschlagen`),v&&I.push(`${v} Fotos`),w&&I.push(`${w} Fotos doppelt`),await cl({source:R.filename||null,device:R.metadata?.device||R.metadata?.label||null,added:S,skipped:d,rangeStart:R.stats.startDateRaw,rangeEnd:R.stats.endDateRaw,note:I.length?I.join(", "):null}),await tt().catch(()=>{}),await Fn(e)}catch(I){console.warn("Import-Historie konnte nicht geschrieben werden",I)}}catch(S){console.error("Import fehlgeschlagen",S),Ut(e,"Import fehlgeschlagen. Siehe Konsole für Details."),St(e,"Import fehlgeschlagen. Bitte erneut versuchen.","danger")}finally{xt=!1,Ft(e)}}function $u(e,t,a){if(!e.events?.emit)return;const n=t.metadata?.label||t.metadata?.filters?.label||`Import ${t.filename}`;e.events.emit("documentation:focus-range",{startDate:t.stats.startDateRaw||void 0,endDate:t.stats.endDateRaw||void 0,label:n,reason:"import",entryIds:a,autoSelectFirst:!!a.length})}function zu(e,t){if(!R){window.alert("Bitte zuerst eine Importdatei laden.");return}if(!R.stats.startDateRaw||!R.stats.endDateRaw){window.alert("Zeitraum konnte nicht bestimmt werden.");return}$u(t,R,R.lastImportRefs),St(e,"Dokumentation wurde auf den Importzeitraum fokussiert.")}function Au(e,t){const a=e.querySelector('[data-role="import-file"]');a&&a.addEventListener("change",()=>{const n=a.files?.[0];n&&(xt=!0,St(e,"Datei wird analysiert ..."),Ft(e),Ut(e,""),Su(n,t.state.getState()).then(r=>{R=r,Zr(e),St(e,`${r.importableEntries.length} Einträge bereit zum Import.`)}).catch(r=>{console.error("Importdatei konnte nicht gelesen werden",r),St(e,r?.message||"Importdatei konnte nicht gelesen werden.","danger"),R=null,Zr(e)}).finally(()=>{xt=!1,Ft(e)}))}),e.addEventListener("click",n=>{const r=n.target?.closest("[data-action]");if(!r)return;const s=r.dataset.action;if(s){if(s==="clear-import"){du(e);return}if(s==="focus-import"){zu(e,t);return}s==="run-import"&&Du(e,t)}})}function Pu(e,t){if(!e||ys)return;const a=e;a.innerHTML="";const n=ou();a.appendChild(n),Au(n,t),St(n,"Wähle eine Datei aus, um den Import zu starten."),Fn(n),ct("database:connected",()=>void Fn(n)),ct("app:sectionChanged",r=>{(r==="daten"||r==="documentation"||r==="import")&&Fn(n)}),ys=!0}const jt=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function Mu(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function ia(e,t,a,n){return`
    <div class="dash-card"${n?` data-goto="${n}" style="cursor:pointer;"`:""}>
      <div class="dash-card-ic"><i class="bi ${e}"></i></div>
      <div class="dash-card-body"><div class="dash-card-value">${a}</div><div class="dash-card-label">${g(t)}</div></div>
    </div>`}function Cu(){return`
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
  </section>`}function Iu(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Cu();const a=e.querySelector('[data-role="dash-cards"]'),n=e.querySelector('[data-role="dash-warn"]'),r=e.querySelector('[data-role="dash-recent"]');e.addEventListener("click",l=>{const o=l.target?.closest("[data-goto]");if(!o)return;const d=o.getAttribute("data-goto");d&&t.state.updateSlice("app",f=>({...f,activeSection:d}))});const s=async()=>{if(de()!=="sqlite"){a&&(a.innerHTML='<div class="dash-empty">Bitte zuerst eine Datenbank öffnen.</div>');return}const l=t.state.getState(),o=(je(l.gps?.points)||[]).length;let d=0,f=0,u=0,m=0,v=[],w=[],h=0;try{d=(await Qr())?.rows?.length||0}catch{}try{f=(await Fs())?.rows?.length||0}catch{}try{const S=(await Jr())?.rows||[];u=S.length,m=S.reduce((x,E)=>x+(E.plants||0),0)}catch{}try{v=(await Ns())?.rows||[]}catch{}try{const S=await Ts({}),x=S?.entries||S?.rows||[];h=S?.totalCount??x.length,w=x.slice(0,6)}catch{}if(a&&(a.innerHTML=[ia("bi-geo-alt","Standorte",jt(o)),ia("bi-flower1","Kulturen",jt(d)),ia("bi-droplet","Mittel im Sortiment",jt(f),"lager"),ia("bi-journal-check","Anwendungen",jt(h),"documentation"),ia("bi-map","Acker-Flächen",jt(u),"acker"),ia("bi-flower3","Pflanzen (Acker)",jt(m),"acker")].join("")),n){const S=[];v.forEach(E=>{E.bestand<=0&&(E.verbraucht>0||E.zugang>0)&&S.push(`<div class="dash-row"><span><i class="bi bi-box-seam me-1" style="color:#ef4444"></i>${g(E.name)}</span><span style="color:#ef4444">Bestand ${jt(E.bestand)} ${g(E.einheit||"")}</span></div>`)}),v.forEach(E=>{if(!E.zulEnde)return;const I=Math.round((new Date(E.zulEnde).getTime()-Date.now())/864e5);I<0?S.push(`<div class="dash-row"><span><i class="bi bi-calendar-x me-1" style="color:#ef4444"></i>${g(E.name)}</span><span style="color:#ef4444">Zulassung abgelaufen</span></div>`):I<180&&S.push(`<div class="dash-row"><span><i class="bi bi-calendar-event me-1" style="color:#f59e0b"></i>${g(E.name)}</span><span style="color:#f59e0b">Zulassung endet in ${I} T</span></div>`)});const x=S.length>6?`<div class="dash-row" style="color:var(--color-text-muted)"><span>+ ${S.length-6} weitere</span></div>`:"";n.innerHTML=S.length?S.slice(0,6).join("")+x:'<div class="dash-empty">Alles im grünen Bereich. ✓</div>'}r&&(r.innerHTML=w.length?w.map(S=>{const x=Mu(S.datum||S.dateIso||S.created_at||S.createdAt||null),E=S.kultur||"",I=S.standort||"";return`<div class="dash-row"><span>${g(I)}${E?" · "+g(E):""}</span><span class="dash-empty" style="padding:0">${g(x)}</span></div>`}).join(""):'<div class="dash-empty">Noch keine Anwendungen erfasst.</div>')};t.state.subscribe(l=>{l?.app?.activeSection==="dashboard"&&s()}),s()}function Es(e){document.querySelectorAll(".content-section").forEach(a=>{a.style.display="none"});const t=document.getElementById(`section-${e}`);t instanceof HTMLElement&&(t.style.display="block")}function Ls(){ul(),zs();const e={state:{getState:j,updateSlice:Ve,subscribe:qn},events:{emit:(x,E)=>{It(async()=>{const{emit:I}=await import("./index.DXWdWzHs.js").then(U=>U.aS);return{emit:I}},[]).then(({emit:I})=>{I(x,E)})},subscribe:ct}},t=document.querySelector('[data-region="startup"]'),a=document.querySelector('[data-region="shell"]'),n=document.querySelector('[data-region="main"]'),r=document.querySelector('[data-region="footer"]');Rl(t,e);const s=document.querySelector('[data-feature="calculation"]');pl(s,e);const l=document.querySelector('[data-feature="documentation"]');qc(l,e);const o=document.querySelector('[data-feature="settings"]');Pd(o,e);const d=document.querySelector('[data-feature="lager"]');Id(d,e);const f=document.querySelector('[data-feature="acker"]');Rd(f,e);const u=document.querySelector('[data-feature="kultur"]');nu(u,e);const m=document.querySelector('[data-feature="fotos"]');fl(m,e,{archiveMode:!0});const v=document.querySelector('[data-feature="import-page"]');Pu(v,{state:{getState:j,updateSlice:Ve},events:e.events});const w=document.querySelector('[data-feature="dashboard"]');Iu(w,e);const h=x=>{const E=document.body;E&&(E.classList.toggle("bg-app",x),E.classList.toggle("bg-startup",!x))},S=x=>{const E=!!x.app?.hasDatabase;if(h(E),t instanceof HTMLElement&&t.classList.toggle("d-none",E),a instanceof HTMLElement&&a.classList.toggle("d-none",!E),n instanceof HTMLElement&&n.classList.toggle("d-none",!E),r instanceof HTMLElement&&r.classList.toggle("d-none",!E),E){const I=x.app?.activeSection??"dashboard";Es(I)}};S(e.state.getState()),qn((x,E)=>{x.app?.hasDatabase!==E.app?.hasDatabase&&S(x),x.app?.activeSection!==E.app?.activeSection&&x.app?.hasDatabase&&Es(x.app.activeSection)}),ct("app:sectionChanged",()=>{})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ls,{once:!0}):Ls();
