const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/index.B-QZfLCy.js","_astro/index.D1c2XijN.js","_astro/jspdf.es.min.YCCBj60b.js","_astro/leaflet-src.BcflbDBd.js","_astro/_commonjsHelpers.Cpj98o6Y.js","_astro/leaflet.C03ySvDx.css"])))=>i.map(i=>d[i]);
import{M as ce,N as Ms,J as it,O as To,P as qo,Q as Cs,h as Bt,l as Ho,a as Is,s as ft,n as _o,q as Bs,p as Li,e as U,r as _n,C as Rn,u as Qe,_ as Dt,R as Ro,S as Oo,w as v,t as N,m as Di,T as Wo,j as hn,k as $i,U as Ko,V as jo,W as Ue,X as Go,Y as Fs,Z as Ns,H as Ts,G as On,$ as Uo,a0 as Vo,a1 as Zo,a2 as Qo,a3 as Jo,a4 as rn,z as Ja,a5 as Yo,x as Xo,a6 as at,a7 as nt,a8 as el,a9 as sn,aa as tl,ab as al,D as nl,ac as qs,ad as Hs,ae as Ya,af as rl,ag as il,ah as sl,ai as zi,aj as mr,ak as gr,al as ol,am as ll,an as cl,ao as dl,ap as ul,aq as pl,ar as fl,as as _s,at as ml,au as Rs,av as gl,aw as Jr,ax as $r,ay as Pn,az as Yr,aA as bl,aB as hl,aC as Wn,aD as Ai,aE as vl,aF as Pi,aG as Ia,aH as Mi,aI as yl,aJ as Ci,aK as Ii,aL as kl,aM as wl,aN as xl,aO as Sl,aP as zr,v as Os,i as El,b as Ll,c as Dl}from"./index.D1c2XijN.js";const Ar="__psl_history_seeded",Pr=200,Bi=["Salat","Apfel","Wein","Tomate","Kartoffel","Hopfen","Raps","Birne"],Fi=["Spritzung","Düngung","Pflege","Behandlung"],Ni=["LACES","MALDO","VITVI","SOLTU","PRNUS","CUPAR","CYNCR","ALLCE"],Ti=["BBCH 10","BBCH 31","BBCH 41","BBCH 55","BBCH 65","BBCH 71","BBCH 81"],$l=[{mediumId:"seed-water",name:"Wasser",unit:"L",methodId:"perKiste",methodLabel:"pro Kiste",value:.02,zulassungsnummer:"N/A"},{mediumId:"seed-tonikum",name:"Tonikum X",unit:"ml",methodId:"perKiste",methodLabel:"pro Kiste",value:.85,zulassungsnummer:"Z-123456"},{mediumId:"seed-oel",name:"Pflegeöl Y",unit:"ml",methodId:"percentWater",methodLabel:"% vom Wasser",value:.12,zulassungsnummer:"Z-654321"}];function zl(e){if(typeof window>"u")return;const a=new URLSearchParams(window.location.search).has("seedHistory");if(!a)return;const n=window;n.__PSL||(n.__PSL={});const r=n.__PSL;r.seedHistoryEntries=(o=Pr)=>qi(e,{count:o}),r.resetHistorySeedFlag=()=>localStorage.removeItem(Ar),!a&&!localStorage.getItem(Ar)&&ce()==="sqlite"&&qi(e,{count:Pr,setFlag:!0}).catch(o=>{console.error("History seeding failed",o)})}async function Al(e){if(!e.state.getState().app?.hasDatabase){if(typeof e.state.subscribe!="function")throw new Error("SQLite-Datenbank ist noch nicht initialisiert.");await new Promise((t,a)=>{const n=window.setTimeout(()=>{s(),a(new Error("SQLite-Datenbank wurde nicht rechtzeitig initialisiert."))},1e4),r=e.state.subscribe?.(o=>{o.app?.hasDatabase&&(s(),t())}),s=()=>{window.clearTimeout(n),typeof r=="function"&&r()}})}}async function qi(e,t={}){const a=t.count??Pr;if(ce()!=="sqlite")throw new Error("SQLite-Treiber muss aktiv sein, bevor Daten befüllt werden können.");await Al(e);const n=performance.now();let r=0;for(let s=0;s<a;s+=1){const o=Pl(s);await Ms(o),r+=1}try{await it()}catch(s){console.warn("Seed-Daten konnten nicht persistent gespeichert werden",s)}return e.events.emit("history:data-changed",{source:"dev-history-seed"}),t.setFlag&&localStorage.setItem(Ar,"1"),{inserted:r,durationMs:performance.now()-n}}function Pl(e){const t=new Date;t.setDate(t.getDate()-e);const a=t.toLocaleDateString("de-DE"),n=t.toISOString(),r=20+e%30,s=Number((r*.5).toFixed(2));return{datum:a,dateIso:n,ersteller:`Seeder ${1+e%5}`,standort:`Test-Ort ${String.fromCharCode(65+e%6)}`,kultur:Bi[e%Bi.length],usageType:Fi[e%Fi.length],kisten:r,eppoCode:Ni[e%Ni.length],bbch:Ti[e%Ti.length],gps:`GPS-Notiz ${e}`,gpsCoordinates:{latitude:48+e%10*.01,longitude:11+e%10*.01},gpsPointId:`seed-gps-${e}`,invekos:`INV-${String(1e3+e).padStart(4,"0")}`,uhrzeit:`${String(6+e%12).padStart(2,"0")}:${String(e*7%60).padStart(2,"0")}`,savedAt:n,items:Ml(e,r,s)}}function Ml(e,t,a){return $l.map((n,r)=>{const s=1+(e+r)%4*.05,o=Number((n.value*s).toFixed(4)),l=Number((o*t).toFixed(2));return{id:`seed-item-${e}-${r}`,name:n.name,unit:n.unit,methodLabel:n.methodLabel,methodId:n.methodId,value:o,total:l,inputs:{kisten:t,waterVolume:a},zulassungsnummer:n.zulassungsnummer,mediumId:n.mediumId}})}let ea=null,Ba=null,Hi=!1,_i=!1;async function Cl(){if(!("serviceWorker"in navigator))return console.warn("[PWA] Service Workers nicht unterstützt"),null;try{return Ba=await navigator.serviceWorker.register("/psm/sw.js",{scope:"/psm/",updateViaCache:"none"}),console.log("[PWA] Service Worker registriert:",Ba.scope),Ba.addEventListener("updatefound",()=>{const e=Ba?.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&(console.log("[PWA] Neues Update verfügbar"),wa("pwa:update-available"))})}),navigator.serviceWorker.addEventListener("message",Il),Hi||(Hi=!0,navigator.serviceWorker.addEventListener("controllerchange",()=>{_i||(_i=!0,window.location.reload())})),Ba}catch(e){return console.error("[PWA] Service Worker Registrierung fehlgeschlagen:",e),null}}function Il(e){const{type:t,payload:a}=e.data||{};switch(t){case"DB_STATE":wa("pwa:db-state",a);break;case"CACHES_CLEARED":wa("pwa:caches-cleared");break}}async function tr(e){if(!navigator.serviceWorker.controller){localStorage.setItem("psm-db-state",JSON.stringify({...e,updatedAt:new Date().toISOString()}));return}navigator.serviceWorker.controller.postMessage({type:"SET_DB_STATE",payload:e})}async function Ws(){const e=localStorage.getItem("psm-db-state");if(e)try{return JSON.parse(e)}catch{}return navigator.serviceWorker?.controller?new Promise(t=>{const a=n=>{n.data?.type==="DB_STATE"&&(navigator.serviceWorker.removeEventListener("message",a),t(n.data.payload))};navigator.serviceWorker.addEventListener("message",a),navigator.serviceWorker.controller.postMessage({type:"GET_DB_STATE"}),setTimeout(()=>{navigator.serviceWorker.removeEventListener("message",a),t(null)},1e3)}):null}async function Bl(){const e=await Ws();return!!(e?.hasDatabase&&e?.autoStartEnabled)}function Fl(){window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),ea=e,console.log("[PWA] Install Prompt verfügbar"),localStorage.getItem("psm-app-installed")==="true"&&(console.log("[PWA] Widerspruch erkannt: Flag sagt installiert, aber Prompt verfügbar"),localStorage.removeItem("psm-app-installed"),console.log("[PWA] Veraltetes Installations-Flag entfernt")),wa("pwa:install-available")}),window.addEventListener("appinstalled",()=>{ea=null,nr(),console.log("[PWA] App installiert - Flag gesetzt"),wa("pwa:installed")})}function ar(){return ea!==null}function na(){return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0}function Xr(){const e=navigator.userAgent.toLowerCase();return e.includes("edg/")?"edge":e.includes("chrome")&&!e.includes("edg")?"chrome":e.includes("firefox")?"firefox":e.includes("safari")&&!e.includes("chrome")?"safari":"other"}function ei(){return!!(na()||localStorage.getItem("psm-app-installed")==="true"||window.matchMedia("(display-mode: fullscreen)").matches||window.matchMedia("(display-mode: minimal-ui)").matches||window.matchMedia("(display-mode: window-controls-overlay)").matches)}async function Ks(){if(ei())return!0;try{if("getInstalledRelatedApps"in navigator){const e=await navigator.getInstalledRelatedApps();if(console.log("[PWA] getInstalledRelatedApps result:",e),e&&e.length>0)return nr(),!0}}catch(e){console.warn("[PWA] getInstalledRelatedApps API Fehler:",e)}return!1}function nr(){localStorage.setItem("psm-app-installed","true"),console.log("[PWA] App als installiert markiert")}function Nl(){localStorage.removeItem("psm-app-installed"),console.log("[PWA] Installations-Flag entfernt")}function js(){const e=Xr(),t=na(),a=ei();return{canInstall:ar(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function Gs(){const e=Xr(),t=na(),a=await Ks();return{canInstall:ar(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function Tl(){if(!ea)return console.warn("[PWA] Kein Install Prompt verfügbar"),!1;try{await ea.prompt();const{outcome:e}=await ea.userChoice;return console.log("[PWA] Install Prompt Ergebnis:",e),e==="accepted"&&nr(),ea=null,e==="accepted"}catch(e){return console.error("[PWA] Install Prompt fehlgeschlagen:",e),!1}}function ql(e){if(!("launchQueue"in window)){console.log("[PWA] Launch Queue API nicht verfügbar");return}window.launchQueue?.setConsumer(async t=>{if(!t.files?.length){console.log("[PWA] Launch ohne Dateien");return}console.log("[PWA] Datei via Launch Queue empfangen:",t.files.length);for(const a of t.files)try{await e(a),await tr({hasDatabase:!0,fileHandleName:a.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0});break}catch(n){console.error("[PWA] Fehler beim Öffnen der Datei:",n)}}),console.log("[PWA] File Handling initialisiert")}const Rt="psm-file-handles",ti="last-database";async function Mr(e){try{const t=await ai(),n=t.transaction(Rt,"readwrite").objectStore(Rt);await new Promise((r,s)=>{const o=n.put({key:ti,handle:e,savedAt:new Date().toISOString()});o.onsuccess=()=>r(),o.onerror=()=>s(o.error)}),t.close(),console.log("[PWA] FileHandle gespeichert"),await tr({hasDatabase:!0,fileHandleName:e.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}catch(t){console.error("[PWA] FileHandle speichern fehlgeschlagen:",t)}}async function Cr(){try{const e=await ai(),a=e.transaction(Rt,"readonly").objectStore(Rt),n=await new Promise((s,o)=>{const l=a.get(ti);l.onsuccess=()=>s(l.result),l.onerror=()=>o(l.error)});if(e.close(),!n?.handle)return null;const r=n.handle;return typeof r.queryPermission=="function"&&await r.queryPermission({mode:"readwrite"})==="granted"?(console.log("[PWA] FileHandle mit Berechtigung geladen"),n.handle):(console.log("[PWA] FileHandle gefunden, aber Berechtigung erforderlich"),n.handle)}catch(e){return console.error("[PWA] FileHandle laden fehlgeschlagen:",e),null}}async function Hl(e){try{const t=e;return typeof t.requestPermission!="function"?(await e.getFile(),!0):await t.requestPermission({mode:"readwrite"})==="granted"}catch{return!1}}async function _l(){try{const e=await ai(),a=e.transaction(Rt,"readwrite").objectStore(Rt);await new Promise((n,r)=>{const s=a.delete(ti);s.onsuccess=()=>n(),s.onerror=()=>r(s.error)}),e.close(),await tr({hasDatabase:!1,autoStartEnabled:!1}),console.log("[PWA] FileHandle gelöscht")}catch(e){console.error("[PWA] FileHandle löschen fehlgeschlagen:",e)}}async function ai(){return new Promise((e,t)=>{const a=indexedDB.open("psm-file-handles",1);a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result),a.onupgradeneeded=n=>{const r=n.target.result;r.objectStoreNames.contains(Rt)||r.createObjectStore(Rt,{keyPath:"key"})}})}function wa(e,t){window.dispatchEvent(new CustomEvent(e,{detail:t}))}function Us(){return{serviceWorker:"serviceWorker"in navigator,fileSystemAccess:typeof window.showOpenFilePicker=="function",launchQueue:"launchQueue"in window,indexedDB:"indexedDB"in window,standalone:na(),installAvailable:ar()}}async function Rl(e){if(console.log("[PWA] Initialisierung..."),await Cl(),Fl(),e?.onFileOpened&&ql(e.onFileOpened),e?.onAutoStart&&await Bl()){const t=await Cr();if(t){const a=t;let n=!1;if(typeof a.queryPermission=="function"&&(n=await a.queryPermission({mode:"readwrite"})==="granted"),n){console.log("[PWA] Auto-Start mit gespeicherter Datei"),e.onFileOpened&&await e.onFileOpened(t);return}console.log("[PWA] Auto-Start: Berechtigung für Datei erforderlich"),wa("pwa:permission-required",{handle:t})}}console.log("[PWA] Capabilities:",Us())}async function Ol(){if(console.group("🔧 PWA Debug Status"),console.log("📱 Standalone Mode:",na()),console.log("💾 localStorage Flag:",localStorage.getItem("psm-app-installed")),console.log("🔔 Install Prompt verfügbar:",ar()),console.log("🌐 Browser:",Xr()),console.group("📺 Display Mode Checks"),console.log("standalone:",window.matchMedia("(display-mode: standalone)").matches),console.log("fullscreen:",window.matchMedia("(display-mode: fullscreen)").matches),console.log("minimal-ui:",window.matchMedia("(display-mode: minimal-ui)").matches),console.log("window-controls-overlay:",window.matchMedia("(display-mode: window-controls-overlay)").matches),console.log("browser:",window.matchMedia("(display-mode: browser)").matches),console.groupEnd(),console.group("🔍 getInstalledRelatedApps API"),"getInstalledRelatedApps"in navigator)try{const e=await navigator.getInstalledRelatedApps();console.log("Installierte Apps:",e)}catch(e){console.log("API Fehler:",e)}else console.log("API nicht verfügbar");console.groupEnd(),console.group("📊 Status Vergleich"),console.log("Sync (isProbablyInstalled):",ei()),console.log("Async (checkIfInstalled):",await Ks()),console.log("getInstallStatus():",js()),console.log("getInstallStatusAsync():",await Gs()),console.groupEnd(),console.log("💡 Tipp: clearInstalledFlag() zum Zurücksetzen des Flags"),console.groupEnd()}typeof window<"u"&&(window.pwaDebug=Ol,window.pwaClearFlag=Nl);let vn=!1;function Wl(e){const t=r=>{if(vn){vn=!1;return}return r.preventDefault(),r.returnValue="",""};let a=!1;const n=r=>{const s=!!r.app?.hasDatabase;s&&!a?(window.addEventListener("beforeunload",t),a=!0):!s&&a&&(window.removeEventListener("beforeunload",t),a=!1)};n(e.getState()),e.subscribe(n),document.addEventListener("click",r=>{const s=r.target.closest("a");s&&s.target==="_blank"&&(vn=!0,setTimeout(()=>{vn=!1},100))})}function Kl(){const e=document.getElementById("app-root");if(!e)throw new Error("app-root Container fehlt");return{startup:e.querySelector('[data-region="startup"]'),shell:e.querySelector('[data-region="shell"]'),main:e.querySelector('[data-region="main"]'),footer:e.querySelector('[data-region="footer"]')}}async function jl(){if(To()){window.location.replace("/psm/m/");return}Kl(),qo();const e=Cs();e!=="memory"&&Bt(e),await Ho();const t={state:{getState:U,patchState:Li,updateSlice:Qe,subscribe:Rn},events:{emit:_n,subscribe:ft}};zl(t),Is(),Wl(t.state),Rl({onFileOpened:async a=>{const n=await Dt(()=>import("./index.D1c2XijN.js").then(s=>s.aR),[]),r=await Dt(()=>import("./index.D1c2XijN.js").then(s=>s.aQ),[]);if(r.isSupported()){n.setActiveDriver("sqlite");const s=await a.getFile(),o=await s.arrayBuffer(),l=await r.importFromArrayBuffer(o,s.name);await Mr(a);const{applyDatabase:d}=await Dt(async()=>{const{applyDatabase:p}=await import("./index.D1c2XijN.js").then(u=>u.aT);return{applyDatabase:p}},[]);d(l.data),_n("database:connected",{driver:"sqlite",autoStarted:!0})}}}),ft("database:connected",async a=>{await tr({hasDatabase:!0,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}),ft("database:connected",async a=>{if(ce()==="sqlite")try{await _o(),await Bs()}catch(n){console.warn("GPS-Punkte konnten beim Start nicht geladen werden",n)}}),Li({app:{...U().app,ready:!0}})}const Ri="__pflanzenschutz_bootstrapped__",Oi=window;function Wi(){jl().catch(e=>{console.error("bootstrap failed",e)})}Oi[Ri]||(Oi[Ri]=!0,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Wi,{once:!0}):Wi());const Vs=[{id:"start",label:"Start",icon:"bi-grid-1x2",sections:[{section:"dashboard",label:"Übersicht",icon:"bi-grid-1x2"}]},{id:"psm",label:"PSM",icon:"bi-flower1",sections:[{section:"calc",label:"Neu erfassen",icon:"bi-pencil-square"},{section:"documentation",label:"Übersicht",icon:"bi-list-ul"},{section:"lager",label:"Lager",icon:"bi-box-seam"},{section:"settings",label:"Einstellungen",icon:"bi-gear"}]},{id:"acker",label:"Acker-Planer",icon:"bi-map",sections:[{section:"acker",label:"Karte",icon:"bi-map"},{section:"kultur",label:"Kulturführung",icon:"bi-clipboard2-pulse"}]},{id:"fotos",label:"Fotos",icon:"bi-camera",sections:[{section:"fotos",label:"Fotos",icon:"bi-camera"}]},{id:"daten",label:"Daten",icon:"bi-database",sections:[{section:"daten",label:"Import",icon:"bi-cloud-upload"}]}],Zs={dashboard:"start",calc:"psm",documentation:"psm",lager:"psm",history:"psm",report:"psm",acker:"acker",kultur:"acker",fotos:"fotos",settings:"psm",gps:"psm",lookup:"psm",import:"daten",daten:"daten"};function Qs(e){return Vs.find(t=>t.id===e)}function Gl(e){const t=Zs[e];return t?Qs(t):void 0}function Ul(){const e=document.getElementById("offline-indicator");if(!e)return;const t=()=>{const a=!navigator.onLine;e.classList.toggle("d-none",!a)};t(),window.addEventListener("online",t),window.addEventListener("offline",t)}function Ki(e){U().app.activeSection!==e&&(Qe("app",t=>({...t,activeSection:e})),_n("app:sectionChanged",e))}function ji(){Ul();const e=document.querySelectorAll(".nav-btn[data-area]"),t=document.getElementById("brand-link"),a=document.getElementById("topnav-tabs"),n=document.getElementById("topnav-area-icon"),r=document.getElementById("topnav-area-label"),s={};for(const f of Vs)s[f.id]=f.sections[0].section;let o=null;function l(f,y){if(a){if(f.sections.length<=1){a.innerHTML="";return}a.innerHTML=f.sections.map(w=>`
        <button type="button" class="topnav-tab${w.section===y?" active":""}" data-section="${w.section}">
          <i class="bi ${w.icon}"></i><span>${w.label}</span>
        </button>`).join("")}}function d(f){a&&a.querySelectorAll(".topnav-tab").forEach(y=>{y.classList.toggle("active",y.dataset.section===f)})}const p=f=>{const y=Qs(f);!y||!U().app.hasDatabase||Ki(s[f]??y.sections[0].section)};e.forEach(f=>{f.addEventListener("click",()=>{const y=f.dataset.area;y&&p(y)})}),t?.addEventListener("click",f=>{f.preventDefault(),p("start")}),a?.addEventListener("click",f=>{const w=f.target?.closest(".topnav-tab")?.dataset.section;w&&Ki(w)});const u=document.querySelector('.nav-btn[data-action="share-data"]');u?.addEventListener("click",()=>{u.disabled=!0,Dt(async()=>{const{shareMobileData:f}=await import("./index.B-QZfLCy.js");return{shareMobileData:f}},__vite__mapDeps([0,1])).then(({shareMobileData:f})=>f()).catch(f=>console.error("Teilen fehlgeschlagen",f)).finally(()=>{u.disabled=!1})}),Ro(),ft("history:data-changed",f=>{if(!document.body.classList.contains("mobile-mode"))return;const y=f?.type;(y==="created"||y==="created-bulk")&&Oo()});const m=f=>{const y=document.getElementById("brand-title"),w=document.getElementById("brand-tagline"),$=document.getElementById("app-version");y&&f.company.name&&(y.textContent=f.company.name),w&&f.company.headline&&(w.textContent=f.company.headline),$&&f.app.version&&($.textContent=`v${f.app.version}`);const I=f.app.hasDatabase,C=f.app.activeSection,H=Gl(C);H&&Zs[C]===H.id&&(s[H.id]=C),e.forEach(Z=>{Z.disabled=!I;const F=I&&H?.id===Z.dataset.area;Z.classList.toggle("active",!!F)}),H&&(n&&(n.className=`bi ${H.icon} topnav-area-icon`),r&&(r.textContent=H.label),o!==H.id?(l(H,C),o=H.id):d(C))};Rn(m),m(U());let h=!1;const k=document.title||"Pflanzenschutz";window.addEventListener("beforeprint",()=>{h||(h=!0,document.title=" ")}),window.addEventListener("afterprint",()=>{h&&(h=!1,document.title=k)})}function Vl(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ji,{once:!0}):ji()}Vl();const Zl="https://api.digitale-psm.de",Ql="digitale-psm.de";async function Jl(e){try{const t=await fetch(`${Zl}/api/v1/${Ql}/views/${e}`,{method:"POST",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`API error: ${t.status}`);return(await t.json()).views}catch(t){return console.warn("[ViewCounter] Fehler beim Zählen:",t),null}}function Yl(e){return e>=1e6?(e/1e6).toFixed(1).replace(".",",")+"M":e>=1e3?(e/1e3).toFixed(1).replace(".",",")+"K":e.toString()}const Ir="pflanzenschutz-datenbank.json";let Gi=!1;function Xl(e){return e?`${e.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"pflanzenschutz-datenbank"}.json`:Ir}async function Fa(e,t){if(!e){await t();return}const a=e.textContent??"";e.disabled=!0,e.dataset.busy="true",e.textContent="Bitte warten...";try{await t()}finally{e.disabled=!1,e.dataset.busy="false",e.textContent=a}}function Ui(e){return v(e)}function ec(e){const t=document.createElement("section");t.className="section-container d-none",t.innerHTML=`
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
                <input class="form-control" id="wizard-company-name" name="wizard-company-name" required value="${Ui(e.name)}" placeholder="z.B. Gärtnerei Müller" />
              </div>
              <div class="col-md-6">
                <label class="form-label d-block mb-2" for="wizard-company-headline">
                  Überschrift <span class="text-muted small">(optional)</span>
                </label>
                <input class="form-control" id="wizard-company-headline" name="wizard-company-headline" value="${Ui(e.headline)}" placeholder="z.B. Pflanzenschutz-Dokumentation 2025" />
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-12">
                <label class="form-label d-block mb-2" for="wizard-company-address">
                  Adresse <span class="text-muted small">(optional)</span>
                </label>
                <textarea class="form-control" id="wizard-company-address" name="wizard-company-address" rows="2" placeholder="Straße, PLZ Ort">${v(e.address)}</textarea>
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
  `;const a=t.querySelector("#database-wizard-form");if(!a)throw new Error("Wizard-Formular konnte nicht erzeugt werden");const n=t.querySelector('[data-role="wizard-result"]');if(!n)throw new Error("Wizard-Resultat-Container fehlt");return{section:t,form:a,resultCard:n,preview:t.querySelector('[data-role="wizard-preview"]'),filenameLabel:t.querySelector('[data-role="wizard-filename"]'),saveHint:t.querySelector('[data-role="wizard-save-hint"]'),saveButton:t.querySelector('[data-action="wizard-save"]'),reset(){a.reset(),n.classList.add("d-none");const r=t.querySelector('[data-role="wizard-preview"]');r&&(r.textContent="");const s=t.querySelector('[data-role="wizard-filename"]');s&&(s.textContent="")}}}function tc(e,t){if(!e||Gi)return;const a=e;let n=null,r=Ir,s="landing";const l=t.state.getState().company,d=document.createElement("section");d.className="section-container";function p(R,E){const z=R;d.innerHTML=`
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
            ${z?`<button class="btn btn-link p-0" style="color: var(--text-muted); text-decoration: none; font-size: 0.85rem;" data-action="start-wizard">
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
            ${z?`<!-- Szenario 2: Hat Datei → Fortsetzen im Fokus -->
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
  `}p(!1,na());const u=ec(l);a.innerHTML="",a.appendChild(d),a.appendChild(u.section);const m=typeof window<"u"&&typeof window.showSaveFilePicker=="function";u.saveButton&&(m?u.saveHint&&(u.saveHint.textContent='Der Browser fragt nach einem Speicherort. Die erzeugte Datei kannst du später über "Bestehende Datei verbinden" erneut laden.'):(u.saveButton.disabled=!0,u.saveButton.textContent="Datei speichern (nicht verfügbar)",u.saveHint&&(u.saveHint.textContent="Dieser Browser unterstützt keinen direkten Dateidialog. Bitte nutze einen Chromium-basierten Browser (z. B. Chrome, Edge) über HTTPS oder http://localhost.")));function h(R=t.state.getState()){const E=!!R.app?.hasDatabase;if(a.classList.toggle("d-none",E),E){d.classList.add("d-none"),u.section.classList.add("d-none");return}s==="wizard"?(d.classList.add("d-none"),u.section.classList.remove("d-none")):(d.classList.remove("d-none"),u.section.classList.add("d-none"))}async function k(R){await Fa(R,async()=>{try{const E=ce();E==="sqlite"||E==="filesystem"?Bt(E):Bt("filesystem")}catch(E){throw N.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),E instanceof Error?E:new Error("Dateisystem nicht verfügbar")}try{const E=await Wo();hn(E.data);const z=E.context;z?.fileHandle&&await Mr(z.fileHandle),t.events.emit("database:connected",{driver:ce()})}catch(E){console.error("Fehler beim Öffnen der Datenbank",E),N.error(E instanceof Error?E.message:"Öffnen der Datenbank fehlgeschlagen")}})}function f(R){Fa(R,async()=>{const E=Di(),z=["localstorage","sqlite","memory"];for(const re of z)try{Bt(re);const de=await $i(E);hn(de.data),t.events.emit("database:connected",{driver:ce()||re});return}catch(de){console.warn(`Treiber ${re} konnte nicht initialisiert werden`,de)}const Y="Keine geeignete Speicheroption verfügbar. Bitte Browserberechtigungen prüfen.";console.error(Y),N.error(Y)})}async function y(R){if(!n){N.warning("Bitte erst die Datenbank erzeugen.");return}await Fa(R,async()=>{try{const E=ce();E==="sqlite"||E==="filesystem"?Bt(E):Bt("filesystem")}catch(E){throw N.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),E instanceof Error?E:new Error("Dateisystem nicht verfügbar")}try{const E=await $i(n);hn(E.data),t.events.emit("database:connected",{driver:ce()})}catch(E){console.error("Fehler beim Speichern der Datenbank",E),N.error(E instanceof Error?E.message:"Die Datei konnte nicht gespeichert werden")}})}function w(R){R.preventDefault();const E=new FormData(u.form),z=(E.get("wizard-company-name")||"").toString().trim();if(!z){N.warning("Bitte einen Firmennamen angeben.");return}const Y=(E.get("wizard-company-headline")||"").toString().trim(),re=(E.get("wizard-company-address")||"").toString().trim();n=Di({meta:{company:{name:z,headline:Y,logoUrl:"",contactEmail:"",address:re}}}),r=Xl(z),u.preview.textContent=JSON.stringify(n,null,2),u.filenameLabel.textContent=r,u.resultCard.classList.remove("d-none"),u.resultCard.scrollIntoView({behavior:"smooth",block:"start"})}function $(){s="landing",n=null,r=Ir,u.reset(),h()}function I(){s="wizard",h()}async function C(R){await Fa(R,async()=>{try{const E=await Cr();if(!E){N.warning("Keine gespeicherte Datei gefunden.");return}if(!await Hl(E)){N.warning("Berechtigung zum Zugriff auf die Datei wurde verweigert.");return}Bt("sqlite");const Y=await E.getFile(),re=await Y.arrayBuffer(),de=await Ko(re,Y.name);jo(E),hn(de.data),await Mr(E),t.events.emit("database:connected",{driver:"sqlite",autoStarted:!0}),N.success("Datenbank erfolgreich geladen!")}catch(E){console.error("Auto-Start fehlgeschlagen:",E),N.error(E instanceof Error?E.message:"Fehler beim Laden der gespeicherten Datei")}})}async function H(){await _l();const R=d.querySelector("#auto-start-banner");R&&R.classList.add("d-none"),N.info("Gespeicherte Datei wurde vergessen.")}async function Z(R){await Fa(R,async()=>{if(await Tl()){N.success("App wird installiert!");const z=d.querySelector("#pwa-install-banner");z&&z.classList.add("d-none")}})}if(d.addEventListener("click",R=>{const E=R.target?.closest("button[data-action]");if(!E)return;const z=E.dataset.action;if(z==="start-wizard"){I();return}z==="open"?k(E):z==="useDefaults"?f(E):z==="auto-start"?C(E):z==="auto-start-forget"?H():z==="install-pwa"&&Z(E)}),u.form.addEventListener("submit",w),u.section.addEventListener("click",R=>{const E=R.target?.closest("[data-action]");if(!E)return;const z=E.dataset.action;if(z==="wizard-back"){$();return}z==="wizard-save"&&y(E)}),t.state.subscribe(R=>h(R)),h(t.state.getState()),!t.state.getState().app.hasDatabase){const R=Cs();if(R&&R!==ce())try{Bt(R)}catch(E){console.warn("Bevorzugter Speicher konnte nicht gesetzt werden",E)}}(async()=>{const R=await Cr(),E=await Ws(),z=!!(R&&E?.hasDatabase),Y=na();p(z,Y);const re=d.querySelector('[data-role="view-count"]');if(re&&Jl("app").then(xe=>{xe!==null&&(re.textContent=Yl(xe))}),z&&R){const xe=d.querySelector('[data-role="auto-start-filename"]');xe&&(xe.textContent=`Datei: ${R.name}`)}F(),window.addEventListener("pwa:install-available",()=>{F()}),window.addEventListener("pwa:installed",()=>{nr(),F()}),window.addEventListener("pwa:permission-required",async xe=>{const Je=xe.detail?.handle;if(Je){const Te=d.querySelector("#auto-start-banner"),gt=d.querySelector('[data-role="auto-start-filename"]');Te&&gt&&(gt.textContent=`Datei: ${Je.name} (Berechtigung erforderlich)`,Te.classList.remove("d-none"))}}),console.log("[Startup] PWA Capabilities:",Us());const de=await Gs();console.log("[Startup] PWA Install Status (async):",de),ae(de)})();function F(){const R=js();ae(R)}function ae(R){const E=d.querySelector("#pwa-install-banner"),z=d.querySelector('[data-role="pwa-content"]');if(!(!E||!z)){if(!R.showBanner){E.classList.add("d-none");return}E.classList.remove("d-none"),R.isInstalled?z.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-check-circle text-success me-1"></i>App ist bereits installiert
        </p>
        <p class="small mb-0" style="color: var(--text-muted);">
          Öffne die App über dein Desktop- oder Startmenü-Symbol für die beste Erfahrung.
        </p>
      `:R.canInstall?z.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-download me-1"></i>Für schnelleren Zugriff als App installieren
        </p>
        <button class="btn btn-sm btn-outline-light" data-action="install-pwa">
          <i class="bi bi-download me-1"></i>App installieren
        </button>
      `:E.classList.add("d-none")}}Gi=!0}function Js(e){let t=!1,a=!1;const n=l=>{e.onStatusChange&&e.onStatusChange(l)},r=()=>{t||!a||U().app.activeSection!==e.section||e.shouldRefresh&&!e.shouldRefresh()||(a=!1,n("refreshing"),Promise.resolve(e.onRefresh()).catch(d=>{console.error("Auto-Refresh konnte nicht ausgeführt werden",d),a=!0,n("stale")}).finally(()=>{!t&&!a&&n("idle")}))},s=ft(e.event,()=>{e.shouldHandleEvent&&!e.shouldHandleEvent()||(a=!0,n("stale"),r())}),o=ft("app:sectionChanged",l=>{l===e.section&&(a?r():n("idle"))});return U().app.activeSection===e.section&&n("idle"),()=>{t=!0,s(),o()}}const ac={prev:"Zurück",next:"Weiter",loading:"Lädt …",empty:"Keine Einträge verfügbar"};function Vi(){const e=document.createElement("span");return e.className="spinner-border spinner-border-sm",e.setAttribute("role","status"),e.setAttribute("aria-hidden","true"),e}function Zi(e){const t=document.createElement("div");return t.className="pager-widget__info text-muted small text-center flex-grow-1",t.textContent=e?.trim()||"",t}function on(e,t){if(!e)return null;const a=document.createElement("div");a.className="pager-widget d-flex flex-column gap-2",e.innerHTML="",e.appendChild(a);let n={status:"hidden"},r=!1;const s={...ac,...t.labels||{}};function o(){a.replaceChildren()}function l(m){const h=Zi(m.info||s.empty);a.replaceChildren(h)}function d(m){const h=document.createElement("div");h.className="alert alert-danger mb-0",h.textContent=m.message||"Unbekannter Fehler",a.replaceChildren(h)}function p(m){const h=document.createElement("div");h.className="pager-widget__controls d-flex flex-column flex-md-row gap-2 align-items-stretch";const k=document.createElement("button");k.type="button",k.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",k.disabled=!m.canPrev||m.loadingDirection==="prev",k.textContent=s.prev,m.loadingDirection==="prev"&&k.prepend(Vi()),k.addEventListener("click",()=>{k.disabled||t.onPrev()});const f=document.createElement("button");f.type="button",f.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",f.disabled=!m.canNext||m.loadingDirection==="next",f.textContent=s.next,m.loadingDirection==="next"&&f.append(Vi()),f.addEventListener("click",()=>{f.disabled||t.onNext()});const y=Zi(m.info||(m.canPrev||m.canNext?s.loading:s.empty));h.append(k,y,f),a.replaceChildren(h)}function u(m){switch(m.status){case"hidden":o();break;case"disabled":l(m);break;case"error":d(m);break;case"ready":p(m);break;default:o();break}}return{update(m){r||(n=m,u(m))},destroy(){r||(r=!0,a.replaceChildren(),e.innerHTML="")},getState(){return n}}}const ni=new Set;let Qi=!1;function nc(){return typeof window>"u"?null:window.__PSL?.debugOverlayApi??null}function Ys(){Qi||typeof window>"u"||(Qi=!0,window.addEventListener("psl:debug-overlay-ready",()=>{ni.forEach(e=>{ri(e)})}))}function ri(e){const t=nc();t?.registerProvider&&(e.handle||(e.handle=t.registerProvider(e.config)),e.handle.update(e.lastMetrics??null))}function Xs(e){const t={config:e,handle:null,lastMetrics:null};return ni.add(t),Ys(),ri(t),t}function eo(e,t){e.lastMetrics=t,ni.add(e),Ys(),ri(e)}function to(e){if(e==null)return 0;try{const t=JSON.stringify(e);return t?Number((t.length/1024).toFixed(1)):0}catch{return null}}const Ji=5e3,Yi=50,ii=50,Mn=3;function br(e){if(e==null||e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function rc(e){if(!e)return null;const t=br(e.areaHa);if(t!==null)return t;const a=br(e.areaAr);if(a!==null)return a/100;const n=br(e.areaSqm);return n!==null?n/1e4:null}function ic(e,t="–"){const a=rc(e);return a===null?t:nl(a,2,t)}function sc(e){return e.toISOString().slice(0,10)}function Kn(e){if(!e)return;if(/^\d{4}-\d{2}-\d{2}$/.test(e))return e;const t=new Date(e);if(!Number.isNaN(t.getTime()))return sc(t)}function Xi(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function si(){return{startDate:"",endDate:""}}function ao(e,t){if(!e)return;const a=e.querySelector("#doc-start"),n=e.querySelector("#doc-end");a&&t.startDate&&(a.value=t.startDate),n&&t.endDate&&(n.value=t.endDate)}function oc(e,t="sqlite"){if(typeof e=="string")return e.includes(":")?e:/^\d+$/.test(e)?ba(t,Number(e)):e;if(typeof e=="number")return ba(t,e);if(e&&typeof e=="object"){const a=e.source||t;if(typeof e.ref=="string"&&e.ref.includes(":"))return e.ref;const n=Number(e.ref);if(!Number.isNaN(n))return ba(a,n)}return null}function lc(e){const t=new Set;return e?.length&&e.forEach(a=>{const n=oc(a);n&&t.add(n)}),t}function no(e){const t=e.querySelector('[data-role="doc-focus-banner"]'),a=e.querySelector('[data-role="doc-focus-text"]');if(!t||!a)return;if(!Ht){t.classList.add("d-none");return}const n=J.startDate&&J.endDate?`${J.startDate} - ${J.endDate}`:"Aktuelle Filter",r=Ht.label||"Importierter Zeitraum",s=Ht.highlightEntryIds.size,o=s?` (${s} markiert)`:"";a.textContent=`${r}: ${n}${o}`,t.classList.remove("d-none")}function cc(e,t){const a=e.querySelector('[data-role="doc-refresh-indicator"]');if(a){if(a.classList.remove("alert-info","alert-warning"),t==="idle"){a.classList.add("d-none");return}a.classList.remove("d-none"),t==="stale"?(a.classList.add("alert-warning"),a.textContent="Neue Dokumentationseinträge verfügbar. Ansicht aktualisiert sich beim Öffnen."):(a.classList.add("alert-info"),a.textContent="Aktualisiere Dokumentation...")}}function hr(e,t,a={}){Ht&&(Ht=null,Ga=null,no(e),a.refreshList&&Ot(e,t.state.getState().fieldLabels))}function dc(e,t){if(!Ga)return;const a=ta(Ga);a&&(Ga=null,co(e,a,t))}function uc(e,t,a){if(!a)return;const n=Kn(a.startDate),r=Kn(a.endDate),s=!!a.entryIds?.length;if(!n&&!r&&!s)return;J={...J,...n?{startDate:n}:{},...r?{endDate:r}:{}},a.creator!==void 0&&(J={...J,creator:a.creator||void 0}),a.crop!==void 0&&(J={...J,crop:a.crop||void 0});const o=lc(a.entryIds);Ht={label:a.label,reason:a.reason,startDate:J.startDate,endDate:J.endDate,highlightEntryIds:o},Ga=a.autoSelectFirst&&o.size?o.values().next().value??null:null;const l=e.querySelector("#doc-filter");ao(l,J),no(e),Br=!0,Ft(e,t.state.getState()).finally(()=>{Br=!1})}function pc(){if(typeof window>"u")return{enabled:!1,count:yn};try{const e=new URLSearchParams(window.location.search);if(!e.has("seedHistory"))return{enabled:!1,count:yn};const t=e.get("seedHistory"),a=t?Number(t):Number.NaN;return{enabled:!0,count:Number.isFinite(a)&&a>0?Math.min(Math.round(a),fc):yn}}catch(e){return console.warn("seedHistory Parameter konnte nicht gelesen werden",e),{enabled:!1,count:yn}}}const mt=25,es=4,vr=new Intl.NumberFormat("de-DE"),yn=200,fc=2e3,xa=pc();let ts=!1,$e="memory",J=si(),He=0,ve=[],$t=[],ne=0;const pt=new Map,rt=new Map([[0,null]]),Ve=new Set,qt=new Map,ga=new Map;let Ge=!1,Na=null,Ta=0,Ht=null,Br=!1,Ga=null,jn=!1,Cn="",Gn=!1,kn=null,wn=null,as=null,qe=0,xn=null,ns=null,ut=null,Ua=!1,rs=null;const mc=Xs({id:"documentation",label:"Documentation",budget:{initialLoad:50,maxItems:150}});let ro=null;function Ea(e){return e.app?.storageDriver||ce()}function ba(e,t){return`${e}:${t}`}function oi(e){const t={},a=Xi(e.startDate,"start"),n=Xi(e.endDate,"end");return a&&(t.startDate=a),n&&(t.endDate=n),e.creator&&(t.creator=e.creator),e.crop&&(t.crop=e.crop),t}function gc(e,t){return{id:ba("state",t),entry:e,source:"state",ref:t}}function bc(e){const t=Number(e?.id??e?.historyId??0),a={...e};return delete a.id,{id:ba("sqlite",t),entry:a,source:"sqlite",ref:t}}function hc(){return $e==="memory"?ve.length:He>0?He:ne*mt+ve.length||null}function vc(){const e=[];if(Ge&&e.push("Lädt …"),ut&&e.push("Fehler"),Ht&&e.push("Fokus aktiv"),$e==="sqlite"&&rt.get(ne+1)&&e.push("Weitere Seiten verfügbar"),!!e.length)return e.join(" · ")}function yc(){const e={items:ve.length,totalCount:hc(),cursor:$e==="sqlite"?`Seite ${ne+1}`:null,payloadKb:to($t.map(t=>t.entry)),lastUpdated:ro,note:vc()};eo(mc,e)}function ta(e){return ve.find(t=>t.id===e)}function rr(e){const t=e.querySelector('[data-role="archive-form"]');if(!t)return;const a=t.querySelector('input[name="archive-start"]'),n=t.querySelector('input[name="archive-end"]');a&&(a.value=J.startDate||""),n&&(n.value=J.endDate||"")}function Pe(e,t,a="info"){const n=e.querySelector('[data-role="archive-status"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a}`,n.textContent=t,n.classList.remove("d-none")}}function Fr(e,t){const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(!a)return;const r=!a.classList.contains("d-none"),s=typeof t=="boolean"?t:!r;a.classList.toggle("d-none",!s),n&&(n.textContent=s?"Archiv-Eingaben ausblenden":"Archiv erstellen"),s&&rr(e)}function kc(e){const t=e.querySelector('input[name="archive-start"]'),a=e.querySelector('input[name="archive-end"]');if(!t?.value||!a?.value)return null;const n=e.querySelector('input[name="archive-storage"]'),r=e.querySelector('textarea[name="archive-note"]'),s=e.querySelector('input[name="archive-remove"]');return{startDate:t.value,endDate:a.value,storageHint:n?.value.trim()||void 0,note:r?.value.trim()||void 0,removeAfterExport:s?s.checked:!0}}function li(e,t){const a=e.querySelector('[data-action="archive-toggle"]'),n=e.querySelector('[data-action="archive-submit"]'),r=e.querySelector('[data-role="archive-form"]'),s=e.querySelector('[data-role="archive-driver-hint"]'),o=Ea(t)==="sqlite"&&!!t.app?.hasDatabase;a&&(a.disabled=!o||jn),n&&(n.disabled=!o||jn),!o&&r&&r.classList.add("d-none"),s&&(s.textContent=o?"Lokale SQLite-Datenbank aktiv":"Nur mit SQLite verfügbar",s.className=`badge ${o?"bg-success":"bg-secondary"}`),o?ci():Gn=!1}function is(e,t){jn=t;const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(a&&a.querySelectorAll("input, textarea, button").forEach(r=>{if(r.dataset.action==="archive-cancel"&&t){r.setAttribute("disabled","disabled");return}t?r.setAttribute("disabled","disabled"):r.removeAttribute("disabled")}),n&&(n.disabled=t||n.disabled,!t)){const r=U();n.disabled=Ea(r)!=="sqlite"||!r.app?.hasDatabase}}function wc(e,t){const a=n=>n?n.replace(/[^0-9-]/g,""):"unbekannt";return`pflanzenschutz-archiv-${a(e)}_${a(t)}.zip`}function xc(e){let t=[];return Qe("archives",a=>{const n=Array.isArray(a?.logs)?a.logs:[];return t=[e,...n].slice(0,ii),{...a||{logs:[]},logs:t}}),t}async function ci({force:e=!1}={}){if(kn){if(await kn,!e)return}else if(Gn&&!e)return;const t=U();if(Ea(t)!=="sqlite"||!t.app?.hasDatabase)return;const n=(async()=>{try{const r=await Go({limit:ii});Qe("archives",s=>({...s&&typeof s=="object"?s:{logs:[]},logs:r.items})),Gn=!0}catch(r){console.warn("Archive logs could not be loaded",r)}})();kn=n;try{await n}finally{kn=null}}async function Sc(e,t){const a=Ea(U());if(xc(e),a!=="sqlite"){console.warn("Archive logs require SQLite. Changes stored in memory only.");return}try{const n={...e,metadata:t??void 0};await Yo(n),await it()}catch(n){console.error("Archive log could not be persisted",n),Gn=!1}finally{await ci({force:!0})}}function Nr(e){return!Array.isArray(e)||!e.length?"[]":e.map(t=>`${t.id}:${t.archivedAt}:${t.entryCount}`).join("|")}function Ec(e){return e?Ja(e)||e.slice(0,16).replace("T"," "):"-"}function Xa(e,t,a={}){const n=e.querySelector('[data-role="archive-log-list"]');if(!n)return;const r=Array.isArray(t)?t:[];a.resetPage!==!1&&(qe=0);const s=Ic(r);if(!s.total){n.innerHTML='<div class="text-muted small">Noch keine Archive erstellt.</div>',ls(e,s);return}const o=s.items.map(l=>{const d=Ec(l.archivedAt),p=`${l.startDate||"-"} – ${l.endDate||"-"}`,u=l.entryCount===1?"Eintrag":"Einträge";return`
        <div class="list-group-item border rounded mb-2 p-3" data-action="archive-log-focus" data-log-id="${l.id}" style="cursor: pointer;">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="fs-5 fw-bold mb-1">${v(p)}</div>
              <div class="text-muted">${l.entryCount} ${u} · Erstellt ${v(d)}</div>
            </div>
            <i class="bi bi-chevron-right text-muted fs-4"></i>
          </div>
        </div>
      `}).join("");n.innerHTML=`<div class="list-group list-group-flush">${o}</div>`,ls(e,s)}function ss(e,t){const a=e.archives?.logs;if(Array.isArray(a))return a.find(n=>n.id===t)}async function Lc(e){if(e){if(typeof navigator<"u"&&navigator.clipboard&&typeof navigator.clipboard.writeText=="function"){await navigator.clipboard.writeText(e);return}if(typeof document<"u"){const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select(),document.execCommand("copy"),document.body.removeChild(t)}}}async function ln(e){if(ga.has(e.id))return ga.get(e.id);let t=null;if(e.source==="sqlite")try{t=await Xo(e.ref)}catch(a){console.error("History entry fetch failed",a)}else{const a=Ue(U().history);t=(typeof e.ref=="number"?a[e.ref]:void 0)||e.entry}return t&&ga.set(e.id,t),t}function io(e){return e&&(e.datum||Ja(e.dateIso)||(typeof e.date=="string"?e.date:""))||""}function Dc(e){if(e?.gpsCoordinates){const t=al(e.gpsCoordinates);if(t)return t}return""}function $c(e){return e?.gps||""}function Tr(e){if(!e)return null;if(e.dateIso){const n=qs(e.dateIso);if(n)return new Date(n.getFullYear(),n.getMonth(),n.getDate())}const t=typeof e.datum=="string"&&e.datum||typeof e.date=="string"&&e.date||null;if(!t)return null;const a=t.split(".");if(a.length===3){const[n,r,s]=a.map(Number);if(!Number.isNaN(n)&&!Number.isNaN(r)&&!Number.isNaN(s))return new Date(s,r-1,n)}return null}function zc(e,t){const a=Tr(e);if(t.startDate){const r=new Date(t.startDate);if(r.setHours(0,0,0,0),!a||a<r)return!1}if(t.endDate){const r=new Date(t.endDate);if(r.setHours(23,59,59,999),!a||a>r)return!1}const n=[["creator",e.ersteller],["crop",e.kultur]];for(const[r,s]of n){const l=t[r]?.trim().toLowerCase();if(l&&!`${s||""}`.toLowerCase().includes(l))return!1}return!0}function di(e){if(!e)return"";const t=r=>r==null?"":String(r),n=(Array.isArray(e.items)?e.items:[]).map(r=>{const s=Object.keys(r).sort().reduce((o,l)=>(o[l]=r[l],o),{});return JSON.stringify(s)}).sort();return JSON.stringify({savedAt:t(e.savedAt),dateIso:t(e.dateIso),datum:t(e.datum),ersteller:t(e.ersteller),standort:t(e.standort),kultur:t(e.kultur),usageType:t(e.usageType),eppoCode:t(e.eppoCode),invekos:t(e.invekos),bbch:t(e.bbch),gps:t(e.gps),gpsPointId:t(e.gpsPointId),areaHa:e.areaHa??null,areaAr:e.areaAr??null,areaSqm:e.areaSqm??null,kisten:e.kisten??null,itemHashes:n})}function so(e){e.size&&Qe("history",t=>{const a=rn(t);if(!a.items.length)return a;let n=!1;const r=a.items.filter(s=>{const o=di(s);return e.has(o)?(n=!0,!1):!0});return n?{...a,items:r,totalCount:Math.min(a.totalCount,r.length),lastUpdatedAt:new Date().toISOString()}:a})}function Ac(e){return e.slice().sort((t,a)=>{const n=Tr(t.entry)?.getTime()||new Date(t.entry.savedAt||0).getTime();return(Tr(a.entry)?.getTime()||new Date(a.entry.savedAt||0).getTime())-n})}function os(){return $e==="sqlite"?He>0?Math.max(Math.ceil(He/mt),1):Math.max(ne+1,pt.size||0):ve.length?Math.max(Math.ceil(ve.length/mt),1):0}function oo(){if($e==="sqlite"){const t=Math.max(os()-1,0);return ne>t&&(ne=t),ne<0&&(ne=0),ne*mt}if(!ve.length)return ne=0,0;const e=Math.max(os()-1,0);return ne>e&&(ne=e),ne<0&&(ne=0),ne*mt}function ir(){if(!ve.length){$t=[];return}if($e==="sqlite"){$t=ve.slice();return}const e=oo(),t=Math.min(e+mt,ve.length);$t=ve.slice(e,t)}function Pc(e){if(pt.size<=es)return;const t=Array.from(pt.keys()).sort((a,n)=>{const r=Math.abs(a-e);return Math.abs(n-e)-r});for(;pt.size>es&&t.length;){const a=t.shift();a==null||a===e||pt.delete(a)}}function Mc(e){const t=e.querySelector('[data-role="doc-pager"]');return t?((!wn||as!==t)&&(wn?.destroy(),wn=on(t,{onPrev:()=>Nc(e),onNext:()=>Tc(e),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Dokumentation...",empty:"Keine Einträge"}}),as=t),wn):null}function Cc(e){const t=e.querySelector('[data-role="archive-log-pager"]');return t?((!xn||ns!==t)&&(xn?.destroy(),xn=on(t,{onPrev:()=>Bc(e),onNext:()=>Fc(e),labels:{prev:"Zurück",next:"Weiter",loading:"Archive werden geladen...",empty:"Keine Einträge"}}),ns=t),xn):null}function Ic(e){const t=e.length;if(!t)return qe=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/Mn),1);qe>=a&&(qe=a-1),qe<0&&(qe=0);const n=qe*Mn,r=Math.min(n+Mn,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function ls(e,t){const a=Cc(e);if(a){if(!t.total){a.update({status:"disabled",info:"Noch keine Archive"});return}a.update({status:"ready",info:`Einträge ${t.start+1}–${t.end} von ${t.total}`,canPrev:qe>0,canNext:t.end<t.total})}}function Bc(e){if(qe===0)return;qe=Math.max(qe-1,0);const t=U().archives?.logs??[];Xa(e,t,{resetPage:!1})}function Fc(e){const t=U().archives?.logs??[],a=t.length;if(!a)return;const n=Math.max(Math.ceil(a/Mn),1);qe>=n-1||(qe=Math.min(qe+1,n-1),Xa(e,t,{resetPage:!1}))}function In(e){const t=Mc(e);if(!t)return;if(ut){t.update({status:"error",message:ut});return}const a=$e==="memory"?ve.length:He,n=$t.length;if(!n){const p=Ge?"Lade Dokumentation...":"Keine Einträge vorhanden.";t.update({status:"disabled",info:p});return}const r=$e==="sqlite"?ne*mt:oo(),s=`Einträge ${vr.format(r+1)}–${vr.format(r+n)}${a?` von ${vr.format(a)}`:""}`,o=$e==="memory"?r+n<ve.length:!!rt.get(ne+1),l=!Ge&&o,d=ne>0&&!Ge;t.update({status:"ready",info:s,canPrev:d,canNext:l,loadingDirection:Ge&&o?"next":null})}function qr(e){if(!xa.enabled)return;const t=e.querySelector('[data-action="doc-seed"]');t&&(t.disabled=Ua,t.textContent=Ua?"Dummy-Daten werden erstellt...":`+ ${xa.count} Dummy-Einträge`)}function Nc(e){if(ne===0||Ge)return;const t=Math.max(ne-1,0);if($e==="sqlite"){ui(e,U().fieldLabels,t);return}ne=t,ir(),Ot(e,U().fieldLabels),tn(e,U().fieldLabels)}function Tc(e){if(Ge)return;const t=ne+1;if($e==="sqlite"){const n=pt.has(t),r=rt.get(t);if(!n&&!r)return;ui(e,U().fieldLabels,t);return}t*mt<ve.length&&(ne=t,ir(),Ot(e,U().fieldLabels),tn(e,U().fieldLabels))}function en(e){Ve.clear(),qt.clear(),e&&sr(e)}function qc(){return $e==="memory"?ve.length:He}function sr(e){const t=e.querySelector('[data-role="doc-selection-info"]'),a=e.querySelector('[data-action="print-selection"]'),n=e.querySelector('[data-action="pdf-selection"]'),r=e.querySelector('[data-action="export-selection"]'),s=e.querySelector('[data-action="export-zip"]'),o=e.querySelector('[data-action="delete-selection"]'),l=Ve.size;t&&(t.textContent=l?`${l} Eintrag${l===1?"":"e"} ausgewählt`:"Keine Einträge ausgewählt");const d=l===0;a&&(a.disabled=d),n&&(n.disabled=d),r&&(r.disabled=d),s&&(s.disabled=d),o&&(o.disabled=d);const p=e.querySelector('[data-action="toggle-select-all"]');if(p){const u=qc();p.disabled=u===0,p.checked=u>0&&l>=u,p.indeterminate=l>0&&l<u}}function Hr(e,t){e.querySelectorAll('[data-role="doc-list"] .doc-sidebar-entry').forEach(n=>{const r=!!(t&&n.dataset.entryId===t);n.classList.toggle("active",r)})}function Ra(e,t,a){const n=e.querySelector("#doc-detail"),r=e.querySelector("#doc-detail-body"),s=e.querySelector('[data-role="doc-detail-card"]'),o=e.querySelector('[data-role="doc-detail-empty"]');if(!n||!r||!s||!o)return;if(!t){n.dataset.entryId="",s.classList.add("d-none"),o.classList.remove("d-none"),r.innerHTML="",Hr(e,null);return}n.dataset.entryId=t.entry.id,s.classList.remove("d-none"),o.classList.add("d-none"),Hr(e,t.entry.id);const l=a||U().fieldLabels,d=l.history?.tableColumns??{},p=l.history?.detail??{},u=t.detail||t.entry.entry,m=el(u.items||[],l,"detail"),h=u.gpsCoordinates?sn(u.gpsCoordinates):null,k=$c(u),f=Dc(u),y=p.gpsNote||d.gpsNote||p.gps||d.gps||"GPS-Notiz",w=p.gpsCoordinates||d.gpsCoordinates||p.gps||d.gps||"GPS-Koordinaten",$=f?`${v(f)}${h?` <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${v(h)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:""}`:"-";r.innerHTML=`
    <p>
      <strong>${v(d.date||"Datum")}:</strong> ${v(io(u))}<br />
      <strong>${v(p.creator||"Erstellt von")}:</strong> ${v(u.ersteller||"")}<br />
      <strong>${v(p.location||"Standort")}:</strong> ${v(u.standort||"")}<br />
      <strong>${v(p.crop||"Kultur")}:</strong> ${v(u.kultur||"")}<br />
      <strong>${v(p.usageType||"Art der Verwendung")}:</strong> ${v(u.usageType||"")}<br />
      <strong>${v(p.quantity||"Fläche (ha)")}:</strong> ${v(ic(u))}<br />
      <strong>${v(p.eppoCode||"EPPO-Code")}:</strong> ${v(u.eppoCode||"")}<br />
      <strong>${v(p.bbch||"BBCH")}:</strong> ${v(u.bbch||"")}<br />
      <strong>${v(p.invekos||"InVeKoS")}:</strong> ${v(u.invekos||"")}<br />
      <strong>${v(y)}:</strong> ${k?v(k):"-"}<br />
      <strong>${v(w)}:</strong> ${$}<br />
      <strong>${v(p.time||"Uhrzeit")}:</strong> ${v(u.uhrzeit||"")}<br />
    </p>
    ${tl({maschine:u.qsMaschine,schaderreger:u.qsSchaderreger,verantwortlicher:u.qsVerantwortlicher,wetter:u.qsWetter,behandlungsart:u.qsBehandlungsart})}
    <div class="table-responsive">
      ${m}
    </div>
  `}function Ot(e,t){ir();const a=e.querySelector('[data-role="doc-list"]');if(!a)return;const r=e.querySelector("#doc-detail")?.dataset.entryId||null;if(!$t.length)a.innerHTML=Ge?'<div class="text-center text-muted py-4">Lädt ...</div>':'<div class="text-center text-muted py-4">Noch keine Einträge</div>';else{a.innerHTML="";const s=document.createDocumentFragment();(t||U().fieldLabels).history?.detail?.usageType,$t.forEach(l=>{const d=document.createElement("div"),p=!!Ht?.highlightEntryIds?.has(l.id);d.className=`doc-sidebar-entry list-group-item${p?" doc-sidebar-entry--highlight":""}`,d.dataset.entryId=l.id;const u=io(l.entry)||"-",m=p?'<span class="badge bg-warning-subtle text-warning-emphasis badge-import">Import</span>':"";d.innerHTML=`
        <div
          class="doc-sidebar-entry__main"
          data-action="view-entry"
          data-entry-id="${l.id}"
        >
          <div class="d-flex justify-content-between gap-2">
            <span class="fw-bold d-flex align-items-center gap-2">
              ${v(l.entry.kultur||"-")}
              ${m}
            </span>
            <small class="text-muted">${v(u)}</small>
          </div>
          <div class="text-muted small mb-1">
            ${v(l.entry.ersteller||"-")} | ${v(l.entry.standort||"-")}
          </div>
          <div class="small text-muted">
            ${v(l.entry.usageType||"-")} · ${v(l.entry.eppoCode||"-")} · ${v(l.entry.invekos||"-")}
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2 gap-2 no-print">
          <button class="btn btn-sm btn-outline-secondary" data-action="print-entry" data-entry-id="${l.id}">Drucken</button>
          <label class="form-check-label d-flex align-items-center gap-2 mb-0">
            <input type="checkbox" class="form-check-input" data-action="toggle-select" data-entry-id="${l.id}" ${Ve.has(l.id)?"checked":""} />
            <span class="small">Auswahl</span>
          </label>
        </div>
      `,s.appendChild(d)}),a.appendChild(s)}Hr(e,r),dc(e,t),In(e),sr(e),ro=new Date().toISOString(),yc()}function tn(e,t){const a=e.querySelector('[data-role="doc-info"]');if(!a)return;const n=He,r=!!(J.crop||J.creator);if(!n&&!Ge){a.textContent="Keine Einträge";return}if(!n&&Ge){a.textContent="Lädt...";return}if(J.startDate&&J.endDate){const s=`${J.startDate} - ${J.endDate} (${n})`;a.textContent=r?`${s} + Filter`:s;return}a.textContent=`Alle Einträge (${n})`}async function lo(e,t){const n=e.querySelector("#doc-detail")?.dataset.entryId;if(!n){Ra(e,null,t);return}const r=ta(n);if(!r){Ra(e,null,t);return}const s=await ln(r);s?Ra(e,{entry:r,detail:s},t):Ra(e,null,t)}async function ui(e,t,a=ne,n={}){const r=Math.max(0,a),s=!!n.forceReload;s&&(pt.clear(),rt.clear(),rt.set(0,null),He=0,ve=[],$t=[],ne=0,ut=null);const o=s?void 0:pt.get(r);if(o&&!n.forceReload){ne=r,ve=o,ut=null,Ot(e,t),tn(e),In(e);return}const l=rt.has(r)?rt.get(r)??null:null,d=Symbol("doc-load");Na=d,Ge=!0,ut=null,In(e);try{const p=await Fs({cursor:l,pageSize:mt,filters:oi(J),sortDirection:"desc",includeTotal:s||r===0||He===0});if(Na!==d)return;const u=p.items.map(m=>bc(m));if(pt.set(r,u),Pc(r),rt.set(r,l),rt.set(r+1,p.nextCursor??null),typeof p.totalCount=="number")He=p.totalCount;else{const m=r*mt+u.length;He=Math.max(He,m)}ne=r,ve=u,ut=null,Ot(e,t),tn(e,t)}catch(p){Na===d&&(console.error("Dokumentation konnte nicht geladen werden",p),ut="Dokumentation konnte nicht geladen werden. Bitte erneut versuchen.",window.alert("Dokumentation konnte nicht geladen werden. Bitte erneut versuchen."))}finally{Na===d&&(Ge=!1,Na=null,In(e))}}async function Hc(e,t){const a=Ue(t.history);ve=Ac(a.map((n,r)=>gc(n,r)).filter(n=>zc(n.entry,J))),He=ve.length,ne=0,ut=null,ir(),Ot(e,t.fieldLabels),tn(e,t.fieldLabels),await lo(e,t.fieldLabels)}async function Ft(e,t){const a=Ea(t),n=!!t.app?.hasDatabase,r=a==="sqlite"&&n;if($e=r?"sqlite":"memory",ga.clear(),ne=0,ut=null,He=0,ve=[],$t=[],pt.clear(),rt.clear(),rt.set(0,null),en(e),li(e,t),rr(e),Xa(e,t.archives?.logs??[]),Cn=Nr(t.archives?.logs),r){await ui(e,t.fieldLabels,0,{forceReload:!0}),await lo(e,t.fieldLabels);return}await Hc(e,t)}async function yr(){const e=[];for(const t of Ve){const a=qt.get(t)||ta(t);if(!a)continue;const n=await ln(a);n&&e.push(n)}return e}async function _c(e,t){if(!t){en(e),Ot(e,U().fieldLabels);return}if(Ve.clear(),qt.clear(),$e==="memory")for(const a of ve)Ve.add(a.id),qt.set(a.id,a);else try{const a=await Ns({filters:oi(J),sortDirection:"desc",limit:1e4}),n=Array.isArray(a.historyIds)?a.historyIds:[];a.entries.forEach((r,s)=>{const o=Number(n[s]);if(!Number.isFinite(o))return;const l=ba("sqlite",o);Ve.add(l),qt.set(l,{id:l,entry:r,source:"sqlite",ref:o}),ga.has(l)||ga.set(l,r)})}catch(a){console.error("Alle Einträge konnten nicht ausgewählt werden",a),window.alert("Alle Einträge konnten nicht ausgewählt werden. Bitte erneut versuchen.")}Ot(e,U().fieldLabels),sr(e)}async function Rc(e,t){if(!Ve.size)return;const a=Array.from(Ve).map(l=>qt.get(l)||ta(l)).filter(l=>!!l),n=[];for(const l of a){const d=await ln(l);d&&n.push(d)}const r=a.filter(l=>l.source==="sqlite"),s=!!r.length;if(s)for(const l of r)await Jo(l.ref);const o=new Set(a.filter(l=>l.source==="state").map(l=>l.ref));if(o.size&&(Qe("history",l=>{const d=rn(l),p=d.items.filter((u,m)=>!o.has(m));return p.length===d.items.length?d:{...d,items:p,totalCount:Math.min(d.totalCount,p.length),lastUpdatedAt:new Date().toISOString()}}),await Oc()),n.length){const l=new Set(n.map(d=>di(d)));so(l)}if(s){try{await it()}catch(l){console.warn("SQLite-Datei konnte nach dem Löschen nicht gespeichert werden",l)}t.events?.emit?.("history:data-changed",{type:"deleted",ids:r.map(l=>l.ref)})}en(e),await Ft(e,t.state.getState())}async function co(e,t,a){const n=await ln(t);if(!n){window.alert("Details konnten nicht geladen werden.");return}Ra(e,{entry:t,detail:n},a)}async function cs(e){const t=await ln(e);t?await uo([t]):window.alert("Eintrag konnte nicht geladen werden.")}async function Oc(){const e=ce();if(!(!e||e==="memory"||e==="sqlite"))try{const t=at();await nt(t)}catch(t){throw console.error("Persist history failed",t),window.alert("Historie konnte nicht gespeichert werden. Bitte erneut versuchen."),t}}async function Wc(e,t,a){if(jn)return;const n=t.state.getState();if(Ea(n)!=="sqlite"||!n.app?.hasDatabase){Pe(e,"Archivieren ist nur mit einer lokalen SQLite-Datenbank möglich.","warning");return}const s=kc(a);if(!s?.startDate||!s.endDate){Pe(e,"Bitte Start- und Enddatum für das Archiv wählen.","warning");return}const o=Kn(s.startDate),l=Kn(s.endDate);if(!o||!l){Pe(e,"Die angegebenen Daten sind ungültig.","danger");return}if(new Date(o)>new Date(l)){Pe(e,"Startdatum darf nicht nach dem Enddatum liegen.","danger");return}const d={startDate:o,endDate:l,creator:J.creator,crop:J.crop},p=oi(d);is(e,!0),Pe(e,"Prüfe Zeitraum und Eintragsmenge...","info");try{const u=await Fs({cursor:null,pageSize:1,filters:p,sortDirection:"asc",includeTotal:!0}),m=u.totalCount??u.items.length??0;if(!m){Pe(e,"Im angegebenen Zeitraum wurden keine Einträge gefunden.","warning");return}if(m>Ji){Pe(e,`Maximal ${Ji} Einträge pro Archiv erlaubt. Bitte Zeitraum verkürzen.`,"warning");return}Pe(e,`Exportiere ${m} Einträge in ein ZIP-Archiv...`,"info");const h=await Ns({filters:p,limit:m,sortDirection:"asc"}),k=h?.entries??[];if(!k.length){Pe(e,"Archiv konnte nicht erstellt werden – Export lieferte keine Einträge.","danger");return}const f=k.map(E=>({...E})),y={format:"pflanzenschutz-archive",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:f.length,filters:{startDate:o,endDate:l,creator:d.creator||null,crop:d.crop||null},archive:{removeFromDatabase:s.removeAfterExport,storageHint:s.storageHint||null,note:s.note||null}},w=Ts({"pflanzenschutz.json":On(JSON.stringify(f,null,2)),"metadata.json":On(JSON.stringify(y,null,2))}),$=new ArrayBuffer(w.byteLength);new Uint8Array($).set(w);const I=new Blob([$],{type:"application/zip"}),C=wc(o,l);pi(I,C);let H=!1;if(s.removeAfterExport){Pe(e,"Export abgeschlossen. Entferne Einträge und bereinige Datenbank...","info"),await Uo({filters:p});const E=new Set(f.map(z=>di(z)));so(E);try{await it()}catch(z){console.error("SQLite-Datei konnte nach dem Archivieren nicht gespeichert werden",z)}t.events?.emit?.("history:data-changed",{type:"deleted-range",filters:p});try{await Vo()}catch(z){H=!0,console.error("VACUUM fehlgeschlagen",z)}}const Z=new Date().toISOString(),F={id:`archive-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,archivedAt:Z,startDate:o,endDate:l,entryCount:f.length,fileName:C,storageHint:s.storageHint||void 0,note:s.note||void 0};H&&(F.note=F.note?`${F.note} | VACUUM fehlgeschlagen`:"VACUUM fehlgeschlagen");const ae={filters:{...d},removeAfterExport:!!s.removeAfterExport,historyIdSample:h?.historyIds?.slice(0,Yi)};if(await Sc(F,ae),!s.removeAfterExport&&h?.historyIds?.length){const E=h.historyIds.slice(0,Yi).map(z=>({source:"sqlite",ref:z}));t.events?.emit?.("documentation:focus-range",{startDate:o,endDate:l,label:"Archiviert",reason:"archive",entryIds:E})}Fr(e,!1),a.reset(),rr(e),await Ft(e,t.state.getState());const R=s.removeAfterExport?`Archiv ${C} erstellt und ${f.length} Einträge entfernt.`:`Archiv ${C} erstellt. ${f.length} Einträge bleiben in der Datenbank.`;Pe(e,R,H?"warning":"success")}catch(u){console.error("Archivieren fehlgeschlagen",u);const m=u instanceof Error?u.message:"Archiv konnte nicht erstellt werden.";Pe(e,m,"danger")}finally{is(e,!1),li(e,t.state.getState())}}const Kc=50;async function uo(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}if(e.length>Kc&&!window.confirm(`Sie möchten ${e.length} Einträge drucken. Bei sehr vielen Einträgen kann das Erstellen der Druckvorschau einige Sekunden dauern und lässt sich nicht unterbrechen.

Fortfahren?`))return;const t=U().fieldLabels,a=Zo(U().company||null);await Qo(e,t,{title:"Dokumentation",headerHtml:a,chunkSize:25})}function pi(e,t){const a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download=t,n.click(),URL.revokeObjectURL(a)}function jc(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const t=e.map(o=>({...o})),a=JSON.stringify(t,null,2),n=new TextEncoder().encode(a),r=new Blob([n],{type:"application/json; charset=utf-8"}),s=new Date().toISOString().replace(/[:.]/g,"-");pi(r,`pflanzenschutz-dokumentation-${s}.json`)}async function Gc(e,t){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const a=e.map(d=>({...d})),n={format:"pflanzenschutz-export",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:a.length,filters:{startDate:t.startDate||null,endDate:t.endDate||null,creator:t.creator||null,crop:t.crop||null}},r=Ts({"pflanzenschutz.json":On(JSON.stringify(a,null,2)),"metadata.json":On(JSON.stringify(n,null,2))}),s=new ArrayBuffer(r.byteLength);new Uint8Array(s).set(r);const o=new Blob([s],{type:"application/zip"}),l=new Date().toISOString().replace(/[:.]/g,"-");pi(o,`pflanzenschutz-dokumentation-${l}.zip`)}function Uc(){const e=document.createElement("div"),t=si(),a=J.startDate||t.startDate||"",n=J.endDate||t.endDate||"";J={...J,startDate:a,endDate:n};const r=xa.enabled?`<button class="btn btn-outline-info btn-sm" type="button" data-action="doc-seed">+ ${xa.count} Dummy-Einträge</button>`:"";return e.className="section-inner",e.innerHTML=`
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
            <input type="text" class="form-control" id="doc-crop" name="doc-crop" placeholder="z. B. Äpfel" value="${J.crop||""}" />
          </div>
          <div class="col-md-3">
            <label class="form-label" for="doc-creator">Anwender (optional)</label>
            <input type="text" class="form-control" id="doc-creator" name="doc-creator" placeholder="Name" value="${J.creator||""}" />
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
            <small class="text-muted">Letzte ${ii}</small>
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
  `,e}function Vc(e){if(!e)return{};const t=new FormData(e),a=r=>{const s=t.get(r);return typeof s=="string"&&s?s:void 0},n=r=>{const s=t.get(r);if(typeof s!="string")return;const o=s.trim();return o||void 0};return{startDate:a("doc-start"),endDate:a("doc-end"),crop:n("doc-crop"),creator:n("doc-creator")}}let ds="entries";function Zc(e,t){ds!==t&&(ds=t,e.querySelectorAll("[data-doc-tab]").forEach(a=>{a.classList.toggle("active",a.dataset.docTab===t)}),e.querySelectorAll("[data-pane]").forEach(a=>{a.style.display=a.dataset.pane===t?"block":"none"}))}function Qc(e,t){e.addEventListener("click",a=>{const n=a.target.closest("[data-doc-tab]");if(n&&n.dataset.docTab){Zc(e,n.dataset.docTab);return}}),e.addEventListener("submit",a=>{if(a.target instanceof HTMLFormElement){if(a.target.id==="doc-filter"){a.preventDefault(),hr(e,t,{refreshList:!0});const n=Vc(a.target);if(!n.startDate||!n.endDate){window.alert("Bitte Start- und Enddatum auswählen.");return}J=n,en(e),Ft(e,t.state.getState());return}a.target.dataset.role==="archive-form"&&(a.preventDefault(),Wc(e,t,a.target))}}),e.addEventListener("click",a=>{const n=a.target;if(!n)return;const r=n.dataset.action;if(!r){n.closest("[data-action]")&&a.stopPropagation();return}if(r==="reset-filters"){const l=e.querySelector("#doc-filter");l?.reset(),J=si(),ao(l??null,J),hr(e,t,{refreshList:!0}),en(e),Ft(e,t.state.getState());return}if(r==="archive-toggle"){Fr(e),Pe(e,"");return}if(r==="archive-cancel"){Fr(e,!1),Pe(e,"");return}if(r==="archive-log-focus"){const l=n.dataset.logId;if(!l)return;const d=ss(t.state.getState(),l);if(!d){window.alert("Archiv-Eintrag nicht gefunden.");return}const p=d.fileName?`Archiv ${d.fileName}`:"Archivierter Zeitraum";typeof t.events?.emit=="function"?t.events.emit("documentation:focus-range",{startDate:d.startDate,endDate:d.endDate,label:p,reason:"archive-log"}):(J={...J,startDate:d.startDate,endDate:d.endDate},Ft(e,t.state.getState())),Pe(e,`Dokumentation auf Archiv ${d.startDate} – ${d.endDate} fokussiert.`,"success");return}if(r==="archive-log-copy-hint"){const l=n.dataset.logId;if(!l)return;const d=ss(t.state.getState(),l);if(!d||!d.storageHint){window.alert("Kein Speicherhinweis vorhanden.");return}const p=d.storageHint;(async()=>{try{await Lc(p),Pe(e,"Speicherhinweis kopiert.","success")}catch(u){console.error("Hinweis konnte nicht kopiert werden",u),window.alert("Hinweis konnte nicht kopiert werden.")}})();return}if(r==="doc-focus-clear"){hr(e,t,{refreshList:!0});return}if(r==="print-selection"||r==="pdf-selection"){(async()=>{const l=await yr();await uo(l)})();return}if(r==="export-selection"){(async()=>{const l=await yr();jc(l)})();return}if(r==="export-zip"){(async()=>{const l=await yr();await Gc(l,J)})();return}if(r==="delete-selection"){if(!Ve.size||!window.confirm("Ausgewählte Einträge wirklich löschen?"))return;Rc(e,t);return}if(r==="doc-seed"){if(!xa.enabled||Ua)return;const d=window.__PSL?.seedHistoryEntries;if(typeof d!="function"){window.alert("Seed-Funktion ist nicht verfügbar. Bitte Entwicklungsmodus verwenden.");return}Ua=!0,qr(e),(async()=>{try{await d(xa.count),await Ft(e,t.state.getState())}catch(p){console.error("Dummy-Daten konnten nicht erstellt werden",p),window.alert("Dummy-Daten konnten nicht erstellt werden.")}finally{Ua=!1,qr(e)}})();return}if(r==="detail-print"){const d=e.querySelector("#doc-detail")?.dataset.entryId;if(!d){window.alert("Kein Eintrag ausgewählt.");return}const p=ta(d);if(!p){window.alert("Eintrag nicht verfügbar.");return}cs(p);return}const s=n.dataset.entryId;if(!s)return;const o=ta(s);if(!o){window.alert("Eintrag nicht verfügbar.");return}if(r==="view-entry"){co(e,o,t.state.getState().fieldLabels);return}if(r==="print-entry"){cs(o);return}}),e.addEventListener("change",a=>{const n=a.target;if(!n)return;if(n.dataset.action==="toggle-select-all"){_c(e,n.checked);return}if(n.dataset.action!=="toggle-select")return;const r=n.dataset.entryId;if(r){if(n.checked){Ve.add(r);const s=ta(r);s&&qt.set(r,s)}else Ve.delete(r),qt.delete(r);sr(e)}})}function Jc(e,t){if(!e||ts)return;const a=e;a.innerHTML="";const n=Uc();a.appendChild(n),Qc(n,t),qr(n),li(n,t.state.getState()),rr(n);const r=t.state.getState().archives?.logs??[];Xa(n,r),Cn=Nr(r),ci(),typeof t.events?.subscribe=="function"&&t.events.subscribe("documentation:focus-range",l=>{!l||typeof l!="object"||uc(n,t,l)});const s=l=>Ue(l.history).length,o=()=>Ft(n,t.state.getState());rs?.(),rs=Js({section:"documentation",event:"history:data-changed",shouldHandleEvent:()=>$e==="sqlite",shouldRefresh:()=>$e==="sqlite",onRefresh:()=>o(),onStatusChange:l=>cc(n,l)}),Ta=s(t.state.getState()),o(),t.state.subscribe(l=>{const d=Nr(l.archives?.logs);d!==Cn&&(Cn=d,Xa(n,l.archives?.logs??[]));const p=s(l);if(Br){Ta=p;return}if($e==="sqlite"){Ta=p;return}p!==Ta&&(Ta=p,o())}),ts=!0}const an=e=>Ue(e.gps.points),Oa=e=>Ue(e.points),Yc=new Intl.NumberFormat("de-DE",{minimumFractionDigits:5,maximumFractionDigits:5}),Xc=new Intl.DateTimeFormat("de-DE",{dateStyle:"short",timeStyle:"short"}),us="Deutschland";let ps=!1,po="list",Sn=null,A=null,qa=null,fs=null;const Bn=25,kr=new Intl.NumberFormat("de-DE");let Me=0,ua=null,_r=null,ms=null;function ca(e,t){typeof e.events?.emit=="function"&&e.events.emit("history:gps-activation-result",{...t,source:"gps",timestamp:Date.now()})}function Va(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ed(){const e=document.createElement("section");return e.className="section-inner",e.innerHTML=`
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
  `,e}function td(e){return{root:e,message:e.querySelector('[data-role="gps-message"]'),refreshIndicator:e.querySelector('[data-role="gps-refresh-indicator"]'),availability:e.querySelector('[data-role="gps-availability"]'),tabButtons:Array.from(e.querySelectorAll('[data-role="gps-tab"]')),panels:Array.from(e.querySelectorAll('[data-role="gps-panel"]')),listBody:e.querySelector('[data-role="gps-list"]'),emptyState:e.querySelector('[data-role="gps-empty"]'),activeInfo:e.querySelector('[data-role="gps-active-info"]'),summaryLabel:e.querySelector('[data-role="gps-summary"]'),statusBadge:e.querySelector('[data-role="gps-status"]'),form:e.querySelector('[data-role="gps-form"]'),formFields:{name:e.querySelector('[name="gps-name"]'),description:e.querySelector('[name="gps-description"]'),latitude:e.querySelector('[name="gps-latitude"]'),longitude:e.querySelector('[name="gps-longitude"]'),source:e.querySelector('[name="gps-source"]'),activate:e.querySelector('[name="gps-activate"]'),rawCoordinates:e.querySelector('[name="gps-raw-coordinates"]')},disableTargets:Array.from(e.querySelectorAll("[data-gps-disable]")),geolocationBtn:e.querySelector('[data-action="use-geolocation"]'),mapButton:e.querySelector('[data-role="gps-open-maps"]'),verifyButton:e.querySelector('[data-action="verify-coords"]')}}function Wa(e){return`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e)}`}function fo(e){const t=e.gps,a=Oa(t),n=o=>{if(!o)return null;const l=sn(o)||Wa(`${o.latitude},${o.longitude}`),d=o.name?`${o.name}`:`${Sa(o.latitude)}, ${Sa(o.longitude)}`;return{url:l,label:d}};if(t.activePointId){const o=a.find(d=>d.id===t.activePointId),l=n(o||null);if(l)return l}if(a.length>0){const o=n(a[0]);if(o)return o}const r=e.company?.address?.trim();if(r)return{url:Wa(r.replace(/\n/g,", ")),label:r};const s=e.company?.name?.trim();return s?{url:Wa(s),label:s}:{url:Wa(us),label:us}}function ad(e){if(!A)return;const t=fo(e);A.mapButton&&(A.mapButton.href=t.url,A.mapButton.title=`Google Maps öffnen (${t.label})`);const a=A.root.querySelector('[data-role="gps-empty-map-link"]');a&&(a.href=t.url)}function nd(e){if(!e)return null;const a=e.trim().replace(/\s+/g," ").replace(/[,;]/g," ").match(/-?\d+(?:[.,]\d+)?/g);if(!a||a.length<2)return null;const n=o=>Number(o.replace(/,/g,".")),r=n(a[0]),s=n(a[1]);return!Number.isFinite(r)||!Number.isFinite(s)||r<-90||r>90||s<-180||s>180?null:{latitude:r,longitude:s}}function rd(){if(!A?.formFields)return null;const e=A.formFields.latitude?.value??"",t=A.formFields.longitude?.value??"";if(!e.trim()||!t.trim())return null;const a=Number(e),n=Number(t);return!Number.isFinite(a)||!Number.isFinite(n)||a<-90||a>90||n<-180||n>180?null:{latitude:a,longitude:n}}function En(e){return Number(e).toFixed(6)}function id(e,t){const a=En(e),n=En(t);return an(U()).some(r=>En(r.latitude)===a&&En(r.longitude)===n)}function Za(){if(!A?.verifyButton)return;const e=rd(),t=!!e;if(A.verifyButton.disabled=!t,e){const a=sn({latitude:e.latitude,longitude:e.longitude});A.verifyButton.dataset.targetUrl=a||Wa(`${e.latitude},${e.longitude}`)}else delete A.verifyButton.dataset.targetUrl}function Sa(e){const t=Number(e);return Number.isFinite(t)?`${Yc.format(t)}°`:"–"}function sd(e){if(!e)return"–";const t=new Date(e);return Number.isNaN(t.getTime())?"–":Xc.format(t)}function oe(e,t="info",a=4500){if(A?.message){if(Sn&&(window.clearTimeout(Sn),Sn=null),!e){A.message.classList.add("d-none"),A.message.textContent="";return}A.message.className=`alert alert-${t}`,A.message.textContent=e,A.message.classList.remove("d-none"),a>0&&(Sn=window.setTimeout(()=>{A?.message?.classList.add("d-none")},a))}}function od(e){const t=A?.refreshIndicator;if(t){if(t.classList.remove("alert-warning","alert-info"),e==="idle"){t.classList.add("d-none");return}t.classList.remove("d-none"),e==="stale"?(t.classList.add("alert-warning"),t.textContent="GPS-Daten wurden geändert. Ansicht aktualisiert sich beim Öffnen."):(t.classList.add("alert-info"),t.textContent="GPS-Daten werden aktualisiert...")}}function mo(e){A&&(po=e,A.tabButtons.forEach(t=>{const a=t.dataset.tab===e;t.classList.toggle("active",a)}),A.panels.forEach(t=>{const a=t.getAttribute("data-panel")===e;t.classList.toggle("d-none",!a)}))}function Ze(e){return e?.hasDatabase?e.storageDriver!=="sqlite"?"wrong-driver":"ok":"no-db"}function ld(e){if(A?.availability){if(e==="ok"){A.availability.classList.add("d-none"),A.availability.textContent="";return}A.availability.classList.remove("d-none"),A.availability.textContent=e==="no-db"?"Bitte verbinden Sie zuerst eine Datenbank, um GPS-Punkte zu verwalten.":"GPS-Funktionen benötigen eine aktive SQLite-Datenbank. Bitte den SQLite-Treiber in den Einstellungen auswählen."}}function ha(e,t){if(!A)return;const a=t!=="ok"||e.pending||Ya.isLocked();if(A.disableTargets.forEach(n=>{(n instanceof HTMLButtonElement||n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n instanceof HTMLSelectElement)&&(n.disabled=a)}),A.statusBadge){let n="badge bg-success",r="Bereit";t==="no-db"?(n="badge bg-secondary",r="Keine Datenbank"):t==="wrong-driver"?(n="badge bg-warning text-dark",r="Nur mit SQLite"):(e.pending||Ya.isLocked())&&(n="badge bg-info text-dark",r="Wird verarbeitet"),A.statusBadge.className=n,A.statusBadge.textContent=r}}function go(e){const t=e.length;if(!t)return Me=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/Bn),1);Me>=a&&(Me=a-1),Me<0&&(Me=0);const n=Me*Bn,r=Math.min(n+Bn,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function cd(){if(!A?.root)return null;const e=A.root.querySelector('[data-role="gps-pager"]');return e?((!ua||_r!==e)&&(ua?.destroy(),ua=on(e,{onPrev:()=>ud(),onNext:()=>pd(),labels:{prev:"Zurück",next:"Weiter",loading:"GPS-Punkte werden geladen...",empty:"Keine GPS-Punkte verfügbar"}}),_r=e),ua):null}function gs(e,t){const a=cd();if(!a)return;if(t!=="ok"){Me=0;const o=t==="no-db"?"Keine Datenbank verbunden.":"Nur mit SQLite verfügbar.";a.update({status:"disabled",info:o});return}const n=an(e).length;if(!n){Me=0;const o=e.gps.initialized?"Noch keine GPS-Punkte vorhanden.":"GPS-Punkte werden geladen...";a.update({status:"disabled",info:o});return}const{start:r,end:s}=go(an(e));a.update({status:"ready",info:`Einträge ${kr.format(r+1)}–${kr.format(s)} von ${kr.format(n)}`,canPrev:Me>0,canNext:s<n})}function dd(e,t){return e.length?e.map(a=>{const n=a.id===t,r=a.description?`<div class="text-muted small">${v(a.description)}</div>`:"",s=a.source?`<span class="badge-psm badge-psm-neutral">${v(a.source)}</span>`:'<span class="text-muted">–</span>',o=n?'<span class="badge bg-success ms-2">Aktiv</span>':"",l=sn(a),d=l?`<a class="btn btn-outline-info" href="${Va(l)}" target="_blank" rel="noopener noreferrer">
              Karte
            </a>`:"";return`
        <tr data-point-id="${Va(a.id)}">
          <td>
            <div class="fw-semibold">${v(a.name||"Ohne Namen")}${o}</div>
            ${r}
          </td>
          <td class="font-monospace">
            <div>${Sa(a.latitude)}</div>
            <div>${Sa(a.longitude)}</div>
          </td>
          <td>
            <div>${s}</div>
            <div class="text-muted small">${sd(a.updatedAt)}</div>
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
`):""}function fi(e,t){if(!A)return;const a=e.gps,n=fo(e),r=t==="ok";if(A.summaryLabel){const s=Oa(a).length;A.summaryLabel.textContent=r?`${s} Punkt${s===1?"":"e"} gespeichert`:"Funktion derzeit nicht verfügbar"}if(!r){A.listBody&&(A.listBody.innerHTML=""),A.emptyState&&(A.emptyState.textContent=t==="no-db"?"Keine Datenbank verbunden.":"Bitte SQLite als Speicher-Treiber aktivieren.",A.emptyState.classList.remove("d-none")),A.activeInfo&&(A.activeInfo.textContent=t==="no-db"?"Wartet auf Datenbank.":"Nur mit SQLite verfügbar."),gs(e,t);return}if(A.listBody){const{items:s}=go(Oa(a));A.listBody.innerHTML=dd(s,a.activePointId)}if(A.emptyState){const s=Oa(a).length>0;A.emptyState.classList.toggle("d-none",s),!s&&a.initialized?A.emptyState.innerHTML=`
        <p class="mb-2">Noch keine GPS-Punkte vorhanden.</p>
        <p class="small text-muted mb-3">
          Nutzen Sie "Neuer Punkt" oder öffnen Sie Google Maps, um Koordinaten zu ermitteln.
        </p>
        <a class="btn btn-outline-info btn-sm" data-role="gps-empty-map-link" href="${Va(n.url)}" target="_blank" rel="noopener noreferrer">
          <i class="bi bi-box-arrow-up-right me-1"></i>
          Google Maps öffnen
        </a>
      `:a.initialized||(A.emptyState.textContent="GPS-Punkte werden geladen...")}if(A.activeInfo)if(a.activePointId){const s=Oa(a).find(o=>o.id===a.activePointId);if(s){const o=`${s.name||"Ohne Namen"} (${Sa(s.latitude)}, ${Sa(s.longitude)})`,l=sn(s);l?A.activeInfo.innerHTML=`${v(o)} <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${Va(l)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:A.activeInfo.textContent=o}else A.activeInfo.textContent="Aktiver Punkt nicht gefunden."}else A.activeInfo.innerHTML=`Kein aktiver Punkt ausgewählt. <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${Va(n.url)}" target="_blank" rel="noopener noreferrer">Google Maps öffnen</a>`;gs(e,t)}function ud(){if(Me===0)return;Me=Math.max(Me-1,0);const e=U(),t=Ze(e.app);fi(e,t)}function pd(){const e=U(),t=an(e).length;if(!t)return;const a=Math.max(Math.ceil(t/Bn)-1,0);if(Me>=a)return;Me=Math.min(Me+1,a);const n=Ze(e.app);fi(e,n)}function Ne(e){`${new Date().toLocaleString("de-DE")}${e}`}function cn(e){if(!e)return null;const t=U();return an(t).find(a=>a.id===e)||null}async function fd(e){if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(e);return}const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}function md(){if(!A?.formFields?.rawCoordinates)return;const e=A.formFields.rawCoordinates.value,t=nd(e);if(!t){oe("Koordinaten konnten nicht erkannt werden. Bitte Format 47.68952, 9.12091 verwenden.","warning",6e3);return}const a=t.latitude.toFixed(6),n=t.longitude.toFixed(6);A.formFields.latitude&&(A.formFields.latitude.value=a),A.formFields.longitude&&(A.formFields.longitude.value=n),oe("Koordinaten übernommen.","success"),Za()}function gd(){if(!A?.verifyButton)return;const e=A.verifyButton.dataset.targetUrl;if(!e){oe("Bitte zuerst gültige Koordinaten eintragen, bevor die Prüfung geöffnet wird.","warning",6e3);return}window.open(e,"_blank","noopener,noreferrer")}async function Rr(e={}){const{notify:t=!1}=e;if(!(!A||Ze(U().app)!=="ok"||U().gps.pending))try{await Bs(),t&&oe("GPS-Punkte aktualisiert.","success"),Ne("GPS-Punkte synchronisiert.")}catch(n){const r=n instanceof Error?n.message:"GPS-Punkte konnten nicht geladen werden.";oe(r,"danger",7e3),Ne(`Fehler beim Laden: ${r}`)}}async function bd(e){if(!e)return;const t=cn(e);if(!t){oe("Ausgewählter GPS-Punkt wurde nicht gefunden.","warning");return}try{await Hs(t.id),oe(`"${t.name}" ist nun aktiv.`,"success"),Ne(`Aktiver GPS-Punkt: ${t.name}`)}catch(a){const n=a instanceof Error?a.message:"GPS-Punkt konnte nicht aktiviert werden.";oe(n,"danger",7e3),Ne(`Fehler beim Aktivieren: ${n}`)}}async function hd(e){if(!e)return;const t=cn(e);if(!t){oe("GPS-Punkt existiert nicht mehr.","warning");return}if(window.confirm(`"${t.name}" wirklich löschen? Dieser Schritt kann nicht rückgängig gemacht werden.`))try{await rl(t.id),oe(`"${t.name}" wurde gelöscht.`,"success"),Ne(`GPS-Punkt gelöscht: ${t.name}`)}catch(n){const r=n instanceof Error?n.message:"GPS-Punkt konnte nicht gelöscht werden.";oe(r,"danger",7e3),Ne(`Löschen fehlgeschlagen: ${r}`)}}async function vd(e){if(!e)return;const t=cn(e);if(!t){oe("GPS-Punkt nicht gefunden.","warning");return}const a=`${t.latitude}, ${t.longitude}`;try{await fd(a),oe("Koordinaten in die Zwischenablage kopiert.","success")}catch(n){console.error("clipboard error",n),oe("Koordinaten konnten nicht kopiert werden.","danger",7e3)}}async function yd(e,t){const a=(e||"").trim();if(!a){ca(t,{status:"error",id:"",message:"Ungültige GPS-Anfrage ohne ID."});return}if(Ze(U().app)!=="ok"){oe("GPS-Modul ist ohne aktive SQLite-Datenbank nicht verfügbar.","warning",6e3),ca(t,{status:"error",id:a,message:"GPS-Modul ist derzeit nicht verfügbar."});return}const r=cn(a);if(!r){oe("Verknüpfter GPS-Punkt wurde nicht gefunden.","warning",6e3),ca(t,{status:"error",id:a,message:"Verknüpfter GPS-Punkt wurde nicht gefunden."});return}ca(t,{status:"pending",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wird aktiviert...`});try{await Hs(r.id),oe(`"${r.name||"Ohne Namen"}" wurde aus der Historie aktiviert.`,"success"),Ne(`Aus Historie aktiviert: ${r.name||r.id}`),ca(t,{status:"success",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wurde aktiviert.`})}catch(s){const o=s instanceof Error?s.message:"GPS-Punkt konnte nicht aktiviert werden.";oe(o,"danger",7e3),Ne(`Aktivierung aus Historie fehlgeschlagen: ${o}`),ca(t,{status:"error",id:r.id,name:r.name,message:o})}}async function kd(){try{await il(),Ne("Aktiver GPS-Punkt synchronisiert."),oe("Aktiver GPS-Punkt wurde synchronisiert.","success")}catch(e){const t=e instanceof Error?e.message:"Aktiver GPS-Punkt konnte nicht ermittelt werden.";oe(t,"danger",7e3),Ne(`Sync fehlgeschlagen: ${t}`)}}function wd(){if(!A?.formFields)throw new Error("Formular nicht initialisiert");const e=A.formFields.name?.value.trim()||"",t=A.formFields.description?.value.trim()||"",a=A.formFields.source?.value.trim()||"",n=Number(A.formFields.latitude?.value),r=Number(A.formFields.longitude?.value),s=!!A.formFields.activate?.checked;if(!e)throw new Error("Name darf nicht leer sein.");if(!Number.isFinite(n)||!Number.isFinite(r))throw new Error("Koordinaten sind ungültig.");return{name:e,description:t,latitude:n,longitude:r,source:a,activate:s}}async function xd(e){if(e.preventDefault(),Ya.isLocked()){oe("Speichern läuft bereits ...","info");return}try{const t=wd();if(id(t.latitude,t.longitude)){oe("Ein GPS-Punkt mit identischen Koordinaten ist bereits vorhanden.","warning",6e3);return}ha(U().gps,Ze(U().app)),await sl({name:t.name,description:t.description||null,latitude:t.latitude,longitude:t.longitude,source:t.source||null},{activate:t.activate}),N.success(`GPS-Punkt "${t.name}" gespeichert.`),Ne(`GPS-Punkt gespeichert${t.activate?" und aktiv gesetzt":""}: ${t.name}`),A?.form?.reset()}catch(t){const a=t instanceof Error?t.message:"GPS-Punkt konnte nicht gespeichert werden.";N.error(a),Ne(`Speichern fehlgeschlagen: ${a}`)}finally{ha(U().gps,Ze(U().app))}}function Sd(){if(A?.formFields){if(!navigator.geolocation){N.warning("Geolocation wird von diesem Browser nicht unterstützt.");return}if(Ya.isLocked()){N.info("Bitte warten...");return}Ya.acquire(async()=>(ha(U().gps,Ze(U().app)),new Promise(e=>{navigator.geolocation.getCurrentPosition(t=>{const{latitude:a,longitude:n}=t.coords;A?.formFields.latitude&&(A.formFields.latitude.value=a.toFixed(6)),A?.formFields.longitude&&(A.formFields.longitude.value=n.toFixed(6)),A?.formFields.source&&!A.formFields.source.value.trim()&&(A.formFields.source.value="Browser"),N.success("Koordinaten aus Browser-Position übernommen."),Ne("Browser-Geolocation übernommen"),Za(),ha(U().gps,Ze(U().app)),e()},t=>{const a=t.code===t.PERMISSION_DENIED?"Zugriff auf Standort wurde verweigert.":"Geolocation konnte nicht ermittelt werden.";N.warning(a),Ne(`Geolocation fehlgeschlagen: ${a}`),ha(U().gps,Ze(U().app)),e()},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})})))}}function Ed(){A&&(A.root.addEventListener("click",e=>{const t=e.target;if(!t)return;const a=t.closest('[data-role="gps-tab"]');if(a&&a.dataset.tab){mo(a.dataset.tab);return}const n=t.closest("[data-action]");if(!n||n.dataset.action==="")return;const s=n.closest("[data-point-id]")?.getAttribute("data-point-id")||"";switch(n.dataset.action){case"reload-points":Rr({notify:!0});break;case"sync-active":kd();break;case"set-active":bd(s);break;case"delete-point":hd(s);break;case"copy-coords":vd(s);break;case"use-geolocation":Sd();break;case"apply-raw-coords":md();break;case"verify-coords":gd();break}}),A.form?.addEventListener("submit",e=>{xd(e)}),A.form?.addEventListener("reset",()=>{window.setTimeout(()=>{Za()},0)}),A.formFields.latitude?.addEventListener("input",()=>{Za()}),A.formFields.longitude?.addEventListener("input",()=>{Za()}))}function Ld(e,t){if(!e||ps)return;ps=!0;const a=e;a.innerHTML="";const n=ed();a.appendChild(n),A=td(n),ms?.(),ms=Js({section:"gps",event:"gps:data-changed",shouldHandleEvent:()=>Ze(t.state.getState().app)==="ok",shouldRefresh:()=>Ze(t.state.getState().app)==="ok",onRefresh:()=>Rr({notify:!1}),onStatusChange:o=>od(o)}),Me=0,ua?.destroy(),ua=null,_r=null,Ed(),mo(po),typeof t.events?.subscribe=="function"&&t.events.subscribe("gps:set-active-from-history",o=>{let l="";if(o&&typeof o=="object"&&(l=String(o.id||"").trim()),!l){oe("Historische GPS-Anfrage ohne gültige ID erhalten.","warning",6e3);return}yd(l,t)});const r=t.state.getState();qa=r.gps.activePointId;const s=(o,l)=>{const d=Ze(o.app),p=o.gps;if(ld(d),fi(o,d),ha(p,d),ad(o),d==="ok"&&!p.initialized&&!p.pending&&Rr({notify:!1}),d==="ok"&&fs!=="ok"&&p.initialized&&oe("GPS-Bereich ist wieder verfügbar.","success"),fs=d,o.gps.activePointId!==qa&&(qa=o.gps.activePointId,typeof t.events?.emit=="function")){const u=cn(qa);t.events.emit("gps:active-point-changed",{id:qa,point:u})}o.gps.lastError&&o.gps.lastError!==l.gps.lastError&&(oe(o.gps.lastError,"danger",7e3),Ne(`Fehler: ${o.gps.lastError}`))};t.state.subscribe(s),s(r,r)}let _e=[],Re=[],Or=!1,Fn=null;async function vt(){try{const[e,t]=await Promise.all([ul({limit:100}),pl({limit:100})]);_e=e.items||[],Re=t.items||[],_n("savedCodes:changed",{eppoCount:_e.length,bbchCount:Re.length})}catch(e){console.error("Failed to load saved codes:",e),_e=[],Re=[]}}function Dd(){const e=_e.length>0,t=Re.length>0;return`
    <div class="row g-4">
      <!-- EPPO Codes Section -->
      <div class="col-lg-6">
        <div class="card card-dark codes-card h-100">
          <div class="card-header codes-card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="bi bi-flower1 me-2 text-success"></i>
              Kulturen (EPPO-Codes)
            </h5>
            <span class="badge badge-psm-neutral">${_e.length} gespeichert</span>
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
                  <span class="badge bg-success ms-2">${_e.length}</span>
                </h6>
                <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${Wr()}
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
            <span class="badge badge-psm-neutral">${Re.length} gespeichert</span>
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
                  <span class="badge bg-info ms-2">${Re.length}</span>
                </h6>
                <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${Kr()}
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
  `}function Wr(){return _e.length?_e.map(e=>`
    <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-eppo-id="${v(e.id)}">
      <div class="flex-grow-1">
        ${e.isFavorite?'<i class="bi bi-star-fill text-warning me-2"></i>':""}
        <strong class="text-success">${v(e.code)}</strong>
        <span class="ms-2">${v(e.name)}</span>
        ${e.usageCount>0?`<span class="badge bg-secondary ms-2">${e.usageCount}x</span>`:""}
      </div>
      <div class="btn-group btn-group-sm">
        <button type="button" class="btn btn-outline-warning" data-action="toggle-favorite-eppo" data-id="${v(e.id)}" title="Favorit umschalten">
          <i class="bi bi-star${e.isFavorite?"-fill":""}"></i>
        </button>
        <button type="button" class="btn btn-outline-danger" data-action="delete-eppo" data-id="${v(e.id)}" title="Löschen">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  `).join(""):`
      <div class="list-group-item list-group-item-action text-muted text-center py-4">
        <i class="bi bi-inbox fs-2 d-block mb-2"></i>
        Noch keine EPPO-Codes gespeichert
      </div>
    `}function Kr(){return Re.length?Re.map(e=>`
    <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-bbch-id="${v(e.id)}">
      <div class="flex-grow-1">
        ${e.isFavorite?'<i class="bi bi-star-fill text-warning me-2"></i>':""}
        <strong class="text-info">${v(e.code)}</strong>
        <span class="ms-2">${v(e.label)}</span>
        ${e.usageCount>0?`<span class="badge bg-secondary ms-2">${e.usageCount}x</span>`:""}
      </div>
      <div class="btn-group btn-group-sm">
        <button type="button" class="btn btn-outline-warning" data-action="toggle-favorite-bbch" data-id="${v(e.id)}" title="Favorit umschalten">
          <i class="bi bi-star${e.isFavorite?"-fill":""}"></i>
        </button>
        <button type="button" class="btn btn-outline-danger" data-action="delete-bbch" data-id="${v(e.id)}" title="Löschen">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  `).join(""):`
      <div class="list-group-item list-group-item-action text-muted text-center py-4">
        <i class="bi bi-inbox fs-2 d-block mb-2"></i>
        Noch keine BBCH-Stadien gespeichert
      </div>
    `}function yt(e){const t=e.querySelector('[data-role="saved-eppo-list"]'),a=_e.length>0;if(t){const l=t.closest(".border-top");l&&a&&(l.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Kulturen
            <span class="badge bg-success ms-2">${_e.length}</span>
          </h6>
          <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Wr()}
          </div>
        `)}else if(a){const l=e.querySelector(".codes-card:first-child .border-top.pt-3.mb-3");l&&(l.innerHTML=`
        <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
          <i class="bi bi-bookmark-star me-1"></i>
          Meine Kulturen
          <span class="badge bg-success ms-2">${_e.length}</span>
        </h6>
        <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
          ${Wr()}
        </div>
      `)}const n=e.querySelector('[data-role="saved-bbch-list"]'),r=Re.length>0;if(n){const l=n.closest(".border-top");l&&r&&(l.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${Re.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Kr()}
          </div>
        `)}else if(r){const d=e.querySelectorAll(".codes-card")[1];if(d){const p=d.querySelector(".border-top.pt-3.mb-3");p&&(p.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${Re.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Kr()}
          </div>
        `)}}const s=e.querySelector(".codes-card:first-child .card-header .badge"),o=e.querySelector(".codes-card:last-child .card-header .badge");s&&(s.textContent=`${_e.length} gespeichert`),o&&(o.textContent=`${Re.length} gespeichert`)}function $d(e){const t=e.querySelector('[data-input="eppo-search"]'),a=e.querySelector('[data-role="eppo-search-results"]');if(t&&a){const l=zi(async()=>{const d=t.value.trim();if(d.length<2){a.innerHTML="";return}try{const p=await cl(d,10);if(!p.length){a.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${v(d)}"</div>
          `;return}a.innerHTML=p.map(u=>`
          <button type="button" class="list-group-item list-group-item-action" 
                  data-action="select-eppo" 
                  data-code="${v(u.code)}" 
                  data-name="${v(u.name)}"
                  data-language="${v(u.language||"")}"
                  data-dtcode="${v(u.dtcode||"")}">
            <strong class="text-success">${v(u.code)}</strong>
            <span class="ms-2">${v(u.name)}</span>
            ${u.dtcode?`<small class="text-muted ms-2">(${v(u.dtcode)})</small>`:""}
          </button>
        `).join("")}catch(p){console.error("EPPO search failed:",p),a.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);t.addEventListener("input",l)}const n=e.querySelector('[data-input="bbch-search"]'),r=e.querySelector('[data-role="bbch-search-results"]');if(n&&r){const l=zi(async()=>{const d=n.value.trim();if(d.length<1){r.innerHTML="";return}try{const p=await dl(d,10);if(!p.length){r.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${v(d)}"</div>
          `;return}r.innerHTML=p.map(u=>`
          <button type="button" class="list-group-item list-group-item-action d-flex align-items-start gap-2 py-2" 
                  data-action="select-bbch" 
                  data-code="${v(u.code)}" 
                  data-label="${v(u.label)}"
                  data-principal="${u.principalStage??""}"
                  data-secondary="${u.secondaryStage??""}">
            <strong class="text-info flex-shrink-0" style="min-width: 35px;">${v(u.code)}</strong>
            <span class="text-break" style="line-height: 1.4;">${v(u.label)}</span>
          </button>
        `).join("")}catch(p){console.error("BBCH search failed:",p),r.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);n.addEventListener("input",l)}e.dataset.codesClickBound!=="1"&&(e.dataset.codesClickBound="1",e.addEventListener("click",async l=>{const p=l.target.closest("[data-action]");if(!p)return;const u=p.dataset.action;if(u==="select-eppo"){const m=p.dataset.code||"",h=p.dataset.name||"",k=p.dataset.language||"",f=p.dataset.dtcode||"";if(!m||!h){console.warn("EPPO selection missing code or name");return}a&&(a.innerHTML=""),t&&(t.value="");const y=_e.find(w=>w.code.toUpperCase()===m.toUpperCase());if(y){const w=e.querySelector(`[data-eppo-id="${y.id}"]`);w&&(w.classList.add("flash-highlight"),setTimeout(()=>w.classList.remove("flash-highlight"),800));return}try{await mr({code:m,name:h,language:k||void 0,dtcode:f||void 0,isFavorite:!1});const w=at();await nt(w),await vt(),yt(e)}catch(w){console.error("Failed to save EPPO from search:",w),alert("Speichern fehlgeschlagen")}}if(u==="select-bbch"){const m=p.dataset.code||"",h=p.dataset.label||"",k=p.dataset.principal,f=p.dataset.secondary,y=k?parseInt(k,10):void 0,w=f?parseInt(f,10):void 0;if(!m||!h){console.warn("BBCH selection missing code or label");return}r&&(r.innerHTML=""),n&&(n.value="");const $=Re.find(I=>I.code===m);if($){const I=e.querySelector(`[data-bbch-id="${$.id}"]`);I&&(I.classList.add("flash-highlight"),setTimeout(()=>I.classList.remove("flash-highlight"),800));return}try{await gr({code:m,label:h,principalStage:Number.isNaN(y)?void 0:y,secondaryStage:Number.isNaN(w)?void 0:w,isFavorite:!1});const I=at();await nt(I),await vt(),yt(e)}catch(I){console.error("Failed to save BBCH from search:",I),alert("Speichern fehlgeschlagen")}}if(u==="toggle-favorite-eppo"){const m=p.dataset.id;if(!m)return;const h=_e.find(k=>k.id===m);if(!h)return;try{await mr({id:h.id,code:h.code,name:h.name,language:h.language,dtcode:h.dtcode,isFavorite:!h.isFavorite});const k=at();await nt(k),await vt(),yt(e)}catch(k){console.error("Failed to toggle EPPO favorite:",k)}}if(u==="toggle-favorite-bbch"){const m=p.dataset.id;if(!m)return;const h=Re.find(k=>k.id===m);if(!h)return;try{await gr({id:h.id,code:h.code,label:h.label,principalStage:h.principalStage,secondaryStage:h.secondaryStage,isFavorite:!h.isFavorite});const k=at();await nt(k),await vt(),yt(e)}catch(k){console.error("Failed to toggle BBCH favorite:",k)}}if(u==="delete-eppo"){const m=p.dataset.id;if(!m||!confirm("EPPO-Code wirklich löschen?"))return;try{await ol({id:m});const h=at();await nt(h),await vt(),yt(e)}catch(h){console.error("Failed to delete EPPO:",h)}}if(u==="delete-bbch"){const m=p.dataset.id;if(!m||!confirm("BBCH-Stadium wirklich löschen?"))return;try{await ll({id:m});const h=at();await nt(h),await vt(),yt(e)}catch(h){console.error("Failed to delete BBCH:",h)}}}));const s=e.querySelector('[data-form="add-eppo"]');s&&s.addEventListener("submit",async l=>{l.preventDefault();const d=e.querySelector('[data-input="eppo-code"]'),p=e.querySelector('[data-input="eppo-name"]'),u=e.querySelector('[data-input="eppo-favorite"]'),m=d?.value.trim(),h=p?.value.trim();if(!m||!h){alert("Bitte Code und Name eingeben");return}try{await mr({code:m,name:h,isFavorite:u?.checked||!1});const k=at();await nt(k),await vt(),yt(e),d&&(d.value=""),p&&(p.value=""),u&&(u.checked=!1)}catch(k){console.error("Failed to save EPPO:",k),alert("Speichern fehlgeschlagen")}});const o=e.querySelector('[data-form="add-bbch"]');o&&o.addEventListener("submit",async l=>{l.preventDefault();const d=e.querySelector('[data-input="bbch-code"]'),p=e.querySelector('[data-input="bbch-label"]'),u=e.querySelector('[data-input="bbch-favorite"]'),m=d?.value.trim(),h=p?.value.trim();if(!m||!h){alert("Bitte Code und Bezeichnung eingeben");return}try{await gr({code:m,label:h,isFavorite:u?.checked||!1});const k=at();await nt(k),await vt(),yt(e),d&&(d.value=""),p&&(p.value=""),u&&(u.checked=!1)}catch(k){console.error("Failed to save BBCH:",k),alert("Speichern fehlgeschlagen")}})}function zd(e,t,a={}){if(!e||Or)return;Fn=e,Or=!0,Fn.innerHTML=`
    <div class="section-inner codes-manager">
      <h4 class="mb-3"><i class="bi bi-tags me-2"></i>EPPO & BBCH Codes</h4>
      ${Dd()}
    </div>`;const n=Fn.querySelector(".codes-manager");if(!n)return;$d(n);const r=async()=>{await vt(),yt(n)};t?.events?.subscribe?.("database:connected",()=>{r()}),t?.state?.getState?.().app?.hasDatabase&&r()}function Ad(){Or=!1,Fn=null}let bs=!1,xt=null,Ka=null,Nn=null,ja=null,Zt=null,Un=null,St=null,nn=null,Vn=null,Et=null,jr=null,kt=null,Ce=new Set,Nt=null,wr=!1,xr=!1,va=!1;const st=e=>Ue(e.mediums),Tn=25,Sr=new Intl.NumberFormat("de-DE");let Fe=0,pa=null,Gr=null,Ur=null,mi=null;function Pd(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function Md(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`profile-${Date.now()}-${Math.random().toString(16).slice(2,10)}`}function bo(e){if(!Ce.size)return;const t=new Set(st(e).map(n=>n.id));let a=!1;Ce.forEach(n=>{t.has(n)||(Ce.delete(n),a=!0)}),a&&(Ce=new Set(Ce))}function Zn(){xt&&xt.querySelectorAll('[data-role="profile-select"]').forEach(e=>{const t=e.dataset.mediumId;e.checked=!!(t&&Ce.has(t))})}function Tt(e){const t=st(e).length,a=Ce.size;let n="Noch keine Mittel ausgewählt.";t?a===t&&t>0?n=`${a} Mittel ausgewählt (alle).`:a>0&&(n=`${a} Mittel ausgewählt.`):n="Keine Mittel vorhanden.",jr&&(jr.textContent=n),kt&&(kt.disabled=t===0,kt.indeterminate=a>0&&a<t,kt.checked=t>0&&a===t)}function qn(e){Nt=null,Un&&Un.reset(),nn&&(nn.value=""),St&&(St.value=""),Et&&(Et.textContent="Profil speichern"),Ce=new Set,Zn(),Tt(e)}function Cd(e,t){Nt=e.id,nn&&(nn.value=e.id),St&&(St.value=e.name,St.focus()),Et&&(Et.textContent="Profil aktualisieren"),Ce=new Set(e.mediumIds),Zn(),Tt(t)}function hs(e,t){if(Et){if(Et.disabled=e,e){Et.textContent=t||"Speichert...";return}Et.textContent=Nt?"Profil aktualisieren":"Profil speichern"}}function Qn(e,t){if(Ka){if(Ka.disabled=e,e){Ka.textContent=t||"Speichert...";return}Ka.textContent="Hinzufügen"}}async function Id(e,t,a){if(va)return;const n=t.state.getState(),s=(st(n)[e]??null)?.id||null;va=!0,Qn(!0);const o=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediums",d=>{const p=rn(d),u=p.items.slice();return u.splice(e,1),{...p,items:u,totalCount:Math.min(p.totalCount,u.length),lastUpdatedAt:new Date().toISOString()}}),await Jn({silent:!0})&&s&&t.events?.emit?.("mediums:data-changed",{action:"deleted",id:s})}finally{va=!1,Qn(!1),a&&a.isConnected&&(a.disabled=!1,a.textContent=o??"Löschen")}}async function Bd(e,t,a){const n=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediumProfiles",(r=[])=>r.filter(s=>s.id!==e.id)),Nt===e.id&&qn(t.state.getState()),await Jn({successMessage:"Profil gelöscht."})}finally{a&&(a.disabled=!1,a.textContent=n||"Löschen")}}function Fd(e){if(!Vn)return;const t=Vn,a=e.mediumProfiles||[];if(!a.length){t.innerHTML=`
      <tr>
        <td colspan="3" class="text-center text-muted">Noch keine Profile erstellt.</td>
      </tr>
    `;return}const n=new Map(st(e).map(r=>[r.id,r]));t.innerHTML="",a.forEach(r=>{const s=document.createElement("tr"),o=r.mediumIds.map(d=>n.get(d)).filter(Boolean).map(d=>v(d.name)),l=o.length?o.join(", "):'<span class="text-muted">Keine gültigen Mittel</span>';s.innerHTML=`
      <td>${v(r.name)}</td>
      <td>${l}</td>
      <td>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-sm btn-outline-info" data-action="profile-edit" data-id="${v(r.id)}">Bearbeiten</button>
          <button class="btn btn-sm btn-outline-danger" data-action="profile-delete" data-id="${v(r.id)}">Löschen</button>
        </div>
      </td>
    `,t.appendChild(s)})}function Nd(e,t){if(wr||!e.mediumProfiles?.length)return;const a=new Set(st(e).map(s=>s.id));let n=!1;const r=e.mediumProfiles.map(s=>{const o=s.mediumIds.filter(l=>a.has(l));return o.length!==s.mediumIds.length?(n=!0,{...s,mediumIds:o,updatedAt:new Date().toISOString()}):s}).filter(s=>s.mediumIds.length?!0:(n=!0,!1));n&&(wr=!0,t.state.updateSlice("mediumProfiles",()=>r),wr=!1)}function ho(e){if(!e)return Fe=0,{start:0,end:0,total:0};const t=Math.max(Math.ceil(e/Tn),1);Fe>=t&&(Fe=t-1),Fe<0&&(Fe=0);const a=Fe*Tn,n=Math.min(a+Tn,e);return{start:a,end:n,total:e}}function Td(){if(!Ur)return null;const e=Ur.querySelector('[data-role="mediums-pager"]');return e?((!pa||Gr!==e)&&(pa?.destroy(),pa=on(e,{onPrev:()=>qd(),onNext:()=>Hd(),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Mittel...",empty:"Keine Mittel verfügbar"}}),Gr=e),pa):null}function vs(e){const t=Td();if(!t)return;const a=st(e).length;if(!a){Fe=0,t.update({status:"disabled",info:"Noch keine Mittel gespeichert."});return}const{start:n,end:r}=ho(a),s=`Mittel ${Sr.format(n+1)}–${Sr.format(r)} von ${Sr.format(a)}`;t.update({status:"ready",info:s,canPrev:Fe>0,canNext:r<a})}function qd(){if(Fe===0)return;const e=mi?.state.getState();e&&(Fe=Math.max(Fe-1,0),gi(e))}function Hd(){const e=mi?.state.getState();if(!e)return;const t=st(e).length;if(!t)return;const a=Math.max(Math.ceil(t/Tn)-1,0);Fe>=a||(Fe=Math.min(Fe+1,a),gi(e))}function gi(e){if(!xt)return;bo(e);const t=new Map(e.measurementMethods.map(o=>[o.id,o])),a=st(e).length;if(!a){xt.innerHTML=`
      <tr>
        <td colspan="9" class="text-center text-muted">Noch keine Mittel gespeichert.</td>
      </tr>
    `,Tt(e),vs(e);return}const{start:n,end:r}=ho(a),s=st(e).slice(n,r);xt.innerHTML="",s.forEach((o,l)=>{const d=n+l,p=document.createElement("tr"),u=t.get(o.methodId),m=o.approval||o.zulassungsnummer,h=typeof m=="string"&&m.trim().length?v(m):"-",k=typeof o.wartezeit=="string"&&o.wartezeit.trim().length?v(o.wartezeit):typeof o.wartezeit=="number"?`${o.wartezeit} Tage`:"-",f=typeof o.wirkstoff=="string"&&o.wirkstoff.trim().length?v(o.wirkstoff):"-";p.innerHTML=`
      <td class="text-center">
        <input type="checkbox" class="form-check-input" data-role="profile-select" data-medium-id="${v(o.id)}" ${Ce.has(o.id)?"checked":""} />
      </td>
      <td>${v(o.name)}</td>
      <td>${v(o.unit)}</td>
      <td>${v(u?u.label:o.method||o.methodId||"-")}</td>
      <td>${v(o.value!=null?String(o.value):"")}</td>
      <td>${h}</td>
      <td>${k}</td>
      <td>${f}</td>
      <td>
        <button class="btn btn-sm btn-danger" data-action="delete" data-index="${d}">Löschen</button>
      </td>
    `,xt?.appendChild(p)}),Tt(e),vs(e)}function ys(e){if(!ja)return;const t=new Set;ja.innerHTML="",e.measurementMethods.forEach(a=>{const n=(a.label??"").toLowerCase(),r=(a.id??"").toLowerCase();if(n&&!t.has(n)){t.add(n);const s=document.createElement("option");s.value=a.label,ja.appendChild(s)}if(r&&!t.has(r)){t.add(r);const s=document.createElement("option");s.value=a.id,ja.appendChild(s)}})}function _d(e){const t=e.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t||`method-${Date.now()}-${Math.random().toString(16).slice(2,6)}`}function Rd(e,t){if(!Nn)return null;const a=Nn.value.trim();if(!a)return window.alert("Bitte eine Methode angeben."),Nn.focus(),null;const n=e.measurementMethods.find(l=>l.label?.toLowerCase()===a.toLowerCase()||l.id?.toLowerCase()===a.toLowerCase());if(n)return n.id;const r=_d(a),s=e.fieldLabels?.calculation?.fields?.quantity?.unit||"Kiste",o={id:r,label:a,type:"factor",unit:s,requires:["areaHa"],config:{sourceField:"areaHa"}};return t.state.updateSlice("measurementMethods",l=>[...l,o]),r}async function Jn(e){try{const t=at();return await nt(t),e?.silent||window.alert(e?.successMessage??"Änderungen wurden gespeichert."),!0}catch(t){console.error("Fehler beim Speichern",t);const a=t instanceof Error?t.message:"Speichern fehlgeschlagen";return window.alert(a),!1}}function Od(e,t){const a=!!t.app?.hasDatabase,n=t.app?.activeSection==="settings";e.classList.toggle("d-none",!(a&&n))}function Wd(e,t){if(!e||bs)return;const a=e;a.innerHTML="";const n=Pd();a.appendChild(n),Ur=n,mi=t,Fe=0,pa?.destroy(),pa=null,Gr=null,xt=n.querySelector("#settings-mediums-table tbody"),Nn=n.querySelector('input[name="medium-method"]'),ja=n.querySelector("#settings-method-options"),Zt=n.querySelector("#settings-medium-form"),Ka=Zt?Zt.querySelector('button[type="submit"]'):null,Un=n.querySelector("#settings-profile-form"),St=n.querySelector("#profile-name"),nn=n.querySelector('input[name="profile-id"]'),Vn=n.querySelector("#settings-profile-table tbody"),Et=n.querySelector('[data-role="profile-submit"]'),jr=n.querySelector('[data-role="profile-selection-summary"]'),kt=n.querySelector('[data-role="profile-select-all"]');let r=!1,s=!1;function o(u){if(n.querySelectorAll("[data-settings-tab]").forEach(m=>{const h=m.dataset.settingsTab===u;m.classList.toggle("active",h)}),n.querySelectorAll("[data-pane]").forEach(m=>{const h=m.dataset.pane===u;m.style.display=h?"block":"none"}),u==="gps"&&!r){const m=n.querySelector('[data-feature="gps-embedded"]');m&&(Ld(m,t),r=!0)}if(u==="codes"&&!s){const m=n.querySelector('[data-feature="codes-embedded"]');m&&(Ad(),zd(m,{state:t.state,events:{subscribe:t.events?.subscribe}},{}),s=!0)}}n.querySelectorAll("[data-settings-tab]").forEach(u=>{u.addEventListener("click",()=>{const m=u.dataset.settingsTab;m&&o(m)})});async function l(){if(!Zt||va)return;const u=t.state.getState(),m=new FormData(Zt),h=(m.get("medium-name")||"").toString().trim(),k=(m.get("medium-unit")||"").toString().trim(),f=m.get("medium-value"),y=Number(f),w=(m.get("medium-approval")||"").toString().trim(),$=m.get("medium-wartezeit"),I=$?Number($):null,C=(m.get("medium-wirkstoff")||"").toString().trim()||null;if(!h||!k||Number.isNaN(y)){window.alert("Bitte alle Felder korrekt ausfüllen.");return}const H=Rd(u,t);if(!H)return;const Z=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`medium-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,F={id:Z,name:h,unit:k,methodId:H,value:y,zulassungsnummer:w||null,wartezeit:I!=null&&!Number.isNaN(I)?I:null,wirkstoff:C};va=!0,Qn(!0,"Speichere...");try{t.state.updateSlice("mediums",R=>{const E=rn(R),z=[...E.items,F];return{...E,items:z,totalCount:z.length,lastUpdatedAt:new Date().toISOString()}}),ys(t.state.getState()),await Jn({successMessage:"Mittel gespeichert.",silent:!0})&&(Zt.reset(),t.events?.emit?.("mediums:data-changed",{action:"created",id:Z}))}finally{va=!1,Qn(!1)}}Zt?.addEventListener("submit",u=>{u.preventDefault(),l()}),xt?.addEventListener("click",u=>{const m=u.target?.closest('[data-action="delete"]');if(!m)return;const h=Number(m.dataset.index);Number.isNaN(h)||Id(h,t,m)}),xt?.addEventListener("change",u=>{const m=u.target;if(!m||m.dataset.role!=="profile-select")return;const h=m.dataset.mediumId;if(!h)return;m.checked?Ce.add(h):Ce.delete(h);const k=t.state.getState();Tt(k)}),kt?.addEventListener("change",()=>{const u=t.state.getState();kt&&(kt.indeterminate=!1,kt.checked?Ce=new Set(st(u).map(m=>m.id)):Ce=new Set,Zn(),Tt(u))});const d=async()=>{if(!St)return;const u=St.value.trim();if(!u){window.alert("Bitte einen Profilnamen eingeben."),St.focus();return}if(!Ce.size){window.alert("Bitte mindestens ein Mittel auswählen.");return}const m=t.state.getState();if(m.mediumProfiles?.some(w=>w.name.toLowerCase()===u.toLowerCase()&&w.id!==Nt)){window.alert("Ein Profil mit diesem Namen existiert bereits.");return}const k=st(m).filter(w=>Ce.has(w.id)).map(w=>w.id);if(!k.length){window.alert("Ausgewählte Mittel sind nicht mehr verfügbar. Bitte Auswahl prüfen."),bo(m),Zn(),Tt(m);return}if(xr)return;const f=!!Nt;xr=!0,hs(!0,f?"Aktualisiere...":"Speichere...");const y=new Date().toISOString();try{if(Nt)t.state.updateSlice("mediumProfiles",($=[])=>$.map(I=>I.id===Nt?{...I,name:u,mediumIds:k,updatedAt:y}:I));else{const $={id:Md(),name:u,mediumIds:k,createdAt:y,updatedAt:y};t.state.updateSlice("mediumProfiles",(I=[])=>[...I,$])}await Jn({successMessage:f?"Profil aktualisiert und gespeichert.":"Profil gespeichert."})&&qn(t.state.getState())}finally{xr=!1,hs(!1)}};Un?.addEventListener("submit",u=>{u.preventDefault(),d()}),Vn?.addEventListener("click",u=>{const m=u.target?.closest('[data-action^="profile-"]');if(!m)return;const h=m.dataset.id;if(!h)return;const k=t.state.getState();if(m.dataset.action==="profile-edit"){const f=k.mediumProfiles?.find(y=>y.id===h);f&&Cd(f,k);return}if(m.dataset.action==="profile-delete"){const f=k.mediumProfiles?.find(y=>y.id===h);if(!f||!window.confirm(`Profil "${f.name}" wirklich löschen?`))return;Bd(f,t,m)}}),n.querySelector('[data-action="profile-reset"]')?.addEventListener("click",()=>{qn(t.state.getState())}),qn(t.state.getState());const p=u=>{Nd(u,t),Od(n,u),u.app.activeSection==="settings"&&(gi(u),ys(u),Fd(u),Tt(u))};t.state.subscribe(p),p(t.state.getState()),bs=!0}const Ha=e=>v(e),Er=(e,t=1)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function ya(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function Kd(e){if(!e)return"";const t=new Date(e);if(Number.isNaN(t.getTime()))return v(e);const a=Math.round((t.getTime()-Date.now())/864e5);return a<0?`<span style="color:#ef4444;">${ya(e)} · abgelaufen</span>`:a<180?`<span style="color:#f59e0b;">${ya(e)} · ${a} T</span>`:`<span class="calc-hint">${ya(e)}</span>`}function jd(){return`
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
    </section>`}function Gd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=jd();const a=e.querySelector('[data-role="lager-uebersicht"]'),n=e.querySelector('[data-role="lager-bewegungen"]'),r=e.querySelector('[data-role="lager-form"]'),s=e.querySelector("#lager-mittel-options"),o=e.querySelector('[data-role="lager-empty"]'),l=new Map,d=k=>{if(a){if(!k.length){a.innerHTML='<tr><td colspan="6" class="calc-hint" style="padding:14px;">Noch keine Mittel. Erfasse unten einen Zugang oder dokumentiere Anwendungen in „Neu erfassen".</td></tr>';return}a.innerHTML=k.map(f=>{const y=f.bestand<0?"#ef4444":f.bestand===0?"#f59e0b":"inherit",w=v(f.einheit||"");return`<tr>
          <td><span class="fw-semibold">${v(f.name)}</span>${f.kennr?`<span class="d-block calc-hint">${v(f.kennr)}</span>`:""}</td>
          <td class="calc-hint">${v(f.wirkstoff||"")}</td>
          <td class="text-end">${Er(f.verbraucht)} ${w}<span class="d-block calc-hint">${f.anwendungen} Anw.</span></td>
          <td class="text-end fw-semibold" style="color:${y};">${Er(f.bestand)} ${w}</td>
          <td>${Kd(f.zulEnde)}</td>
          <td class="calc-hint">${f.naechsterAblauf?ya(f.naechsterAblauf):""}</td>
        </tr>`}).join("")}},p=k=>{if(n){if(!k.length){n.innerHTML='<div class="calc-hint">Keine Bewegungen erfasst.</div>';return}n.innerHTML=k.map(f=>`
        <div class="d-flex align-items-center gap-2 py-1" style="border-bottom:1px solid var(--border-1);">
          <span class="badge" style="background:${f.typ==="zugang"?"#16a34a":"#64748b"};">${v(f.typ)}</span>
          <span class="flex-grow-1">${v(f.mittelName)} · <b>${Er(f.menge)} ${v(f.einheit||"")}</b>${f.charge?` · Charge ${v(f.charge)}`:""}<span class="d-block calc-hint">${ya(f.datum)}${f.lieferant?" · "+v(f.lieferant):""}${f.ablauf?" · Ablauf "+ya(f.ablauf):""}</span></span>
          <button class="btn btn-sm" style="color:#ef4444;border:1px solid var(--border-1);background:transparent;" data-del="${Ha(f.id)}" title="Löschen">×</button>
        </div>`).join(""),n.querySelectorAll("[data-del]").forEach(f=>{f.addEventListener("click",async()=>{const y=f.getAttribute("data-del")||"";try{await gl({id:y}),await it().catch(()=>{}),await m()}catch{N.warning("Löschen fehlgeschlagen.")}})})}},u=()=>{s&&(s.innerHTML=Array.from(l.entries()).sort((k,f)=>k[0].localeCompare(f[0],"de")).map(([k,f])=>`<option value="${Ha(k)}" data-kennr="${Ha(f.kennr||"")}" data-einheit="${Ha(f.einheit||"")}" data-wirkstoff="${Ha(f.wirkstoff||"")}"></option>`).join(""))},m=async()=>{if(ce()!=="sqlite"){o&&(o.textContent="Bitte zuerst eine Datenbank öffnen.");return}try{const[k,f,y]=await Promise.all([_s(),ml(),Rs()]);d(k?.rows||[]),p(f?.rows||[]),l.clear(),(y?.rows||[]).forEach(w=>{w.name&&l.set(w.name,{kennr:w.kennr??null,einheit:w.einheit??null,wirkstoff:w.wirkstoff??null})}),(k?.rows||[]).forEach(w=>{w.name&&!l.has(w.name)&&l.set(w.name,{kennr:w.kennr??null,einheit:w.einheit??null,wirkstoff:w.wirkstoff??null})}),u()}catch(k){console.warn("[Lager] Laden fehlgeschlagen:",k)}};r?.addEventListener("submit",async k=>{if(k.preventDefault(),ce()!=="sqlite"){N.warning("Bitte zuerst eine Datenbank öffnen.");return}const f=new FormData(r),y=String(f.get("mittel")||"").trim(),w=Number(String(f.get("menge")||"").replace(",","."));if(!y||!Number.isFinite(w)){N.warning("Mittel und Menge angeben.");return}const $=String(f.get("preis")||"").trim();try{await fl({mittelName:y,kennr:String(f.get("kennr")||"").trim()||null,wirkstoff:l.get(y)?.wirkstoff||null,typ:String(f.get("typ")||"zugang"),menge:w,einheit:String(f.get("einheit")||"").trim()||null,datum:String(f.get("datum")||"").trim()||null,charge:String(f.get("charge")||"").trim()||null,ablauf:String(f.get("ablauf")||"").trim()||null,lieferant:String(f.get("lieferant")||"").trim()||null,preis:$?Number($.replace(",",".")):null}),await it().catch(()=>{}),r.reset(),N.success("Bewegung gespeichert."),await m()}catch{N.warning("Speichern fehlgeschlagen.")}});const h=e.querySelector('[name="mittel"]');h?.addEventListener("change",()=>{const k=l.get(h.value);if(!k)return;const f=e.querySelector('[name="einheit"]'),y=e.querySelector('[name="kennr"]');f&&k.einheit&&(f.value=k.einheit),y&&k.kennr&&(y.value=k.kennr)}),t.state.subscribe(k=>{k?.app?.activeSection==="lager"&&m()}),m()}const Yn={mechanisch:{label:"Mechanisch",icon:"bi-tools",color:"#2563eb"},chemisch_psm:{label:"Pflanzenschutz",icon:"bi-droplet-half",color:"#dc2626"},duengung:{label:"Düngung",icon:"bi-flower1",color:"#b45309"},nuetzlinge:{label:"Nützlinge",icon:"bi-bug",color:"#7c3aed"},bewaesserung:{label:"Bewässerung",icon:"bi-moisture",color:"#0891b2"},monitoring:{label:"Monitoring",icon:"bi-eye",color:"#475569"},sonstiges:{label:"Sonstiges",icon:"bi-three-dots",color:"#64748b"}},Ud=["mechanisch","chemisch_psm","duengung","nuetzlinge","bewaesserung","monitoring","sonstiges"];function vo(e){return Yn[e]||Yn.sonstiges}const Vd={geplant:{label:"geplant",color:"#64748b"},aktiv:{label:"aktiv",color:"#16a34a"},abgeschlossen:{label:"abgeschlossen",color:"#94a3b8"}},Yt=["#16a34a","#0891b2","#7c3aed","#d97706","#dc2626","#0d9488","#65a30d","#db2777"],Zd=/^#[0-9a-fA-F]{3,8}$/;function yo(e){return typeof e=="string"&&Zd.test(e.trim())?e.trim():null}function ka(e,t=0){return yo(e&&e.color)||Yt[t%Yt.length]}function dt(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function Ee(e){if(!e)return NaN;const t=String(e).slice(0,10).replace(/-/g,""),a=Number(t);return Number.isFinite(a)?a:NaN}function fa(e){const t=[...e||[]].sort((s,o)=>(Ee(s.pflanzDatum)||0)-(Ee(o.pflanzDatum)||0)),a=Number(dt().replace(/-/g,""));let n=t.find(s=>s.status==="aktiv")||null;if(!n){const s=t.filter(o=>o.status!=="abgeschlossen"&&Ee(o.pflanzDatum)<=a&&(!o.ernteDatum||Ee(o.ernteDatum)>=a));n=s.length?s[s.length-1]:null}let r=t.filter(s=>s!==n&&s.status!=="abgeschlossen"&&Ee(s.pflanzDatum)>a).sort((s,o)=>(Ee(s.pflanzDatum)||0)-(Ee(o.pflanzDatum)||0))[0]||null;return r||(r=t.filter(s=>s!==n&&s.status==="geplant").sort((s,o)=>(Ee(s.pflanzDatum)||0)-(Ee(o.pflanzDatum)||0))[0]||null),{current:n,next:r,all:t}}const ko=["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];function wo(e,t){const a=[];let n=e.getFullYear(),r=e.getMonth();const s=t.getFullYear(),o=t.getMonth();let l=0;for(;(n<s||n===s&&r<=o)&&l<60;)a.push({y:n,m:r}),r++,r>11&&(r=0,n++),l++;return a}function je(e,t){if(!t||!e.length)return null;const a=new Date(String(t).slice(0,10)+"T00:00:00");if(isNaN(a.getTime()))return null;const n=e.length,r=a.getFullYear()*12+a.getMonth(),s=e[0].y*12+e[0].m,o=e[n-1].y*12+e[n-1].m;if(r<s)return 0;if(r>o)return 1;const l=r-s,d=new Date(a.getFullYear(),a.getMonth()+1,0).getDate();return(l+(a.getDate()-1)/d)/n}const Qd={anzucht:{label:"Anzucht (vorziehen)",short:"Anzucht"},direkt:{label:"Direktsaat",short:"Direkt"}},Jd=["Pflanzen","m²","Beete","lfd. m","g Saatgut"];function wt(e,t){if(!e)return null;const a=new Date(String(e).slice(0,10)+"T00:00:00");return isNaN(a.getTime())?null:(a.setDate(a.getDate()+Math.round(Number(t)||0)),a.getFullYear()+"-"+String(a.getMonth()+1).padStart(2,"0")+"-"+String(a.getDate()).padStart(2,"0"))}function Yd(e,t,a){if(!e||!a)return{};const r=(e.anbauMethode==="anzucht"?"anzucht":"direkt")==="anzucht"&&Number(e.anzuchtTage)||0,s=Number(e.kulturTage)||0,o=Number(e.ernteTage)||0;let l;t==="aussaat"?l=wt(a,r):t==="ernte"?l=s?wt(a,-s):a:l=a;const d=wt(l,-r),p=s?wt(l,s):null,u=p?wt(p,o):null;return{aussaatDatum:d,pflanzDatum:l,ernteVon:p,ernteBis:u}}function Xd(e,t){return e?{aussaatDatum:wt(e.aussaatDatum,t),pflanzDatum:wt(e.pflanzDatum,t),ernteVon:wt(e.ernteVon,t),ernteBis:wt(e.ernteBis,t)}:{}}function Ln(e,t){if(!t||!Array.isArray(e))return null;const a=String(t).trim().toLowerCase();return a&&(e.find(n=>String(n.name||"").trim().toLowerCase()===a)||e.find(n=>{const r=String(n.name||"").trim().toLowerCase();return r&&(r.startsWith(a)||a.startsWith(r))}))||null}let Dn=null;async function xo(){if(Dn)return Dn;const t=await import("/psm/vendor/psm-geo/psm_geo.js"),a=new URL("/psm/vendor/psm-geo/psm_geo_bg.wasm",globalThis.location?.href);return await t.default(a),Dn=t,Dn}async function eu(e,t){const n=(await xo()).compute_beds(JSON.stringify(e),t.bedW,t.pathW,t.rowSp,t.inRowSp,t.angle);return JSON.parse(n)}async function tu(){await xo()}const au=Math.PI/180;function ge(e,t=0){return Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–"}function Vr(e){if(e=Math.round(e||0),e<=0)return"0";if(e<100)return`≈ ${e}`;const t=e<1e3?50:e<1e4?100:500;return`≈ ${(Math.round(e/t)*t).toLocaleString("de-DE")}`}function nu(e){return e.replace(/[^\wäöüÄÖÜ.-]+/g,"_").replace(/^_+|_+$/g,"").slice(0,80)||"Acker"}function ru(e,t,a,n=.12){const r=e.map(E=>E[0]),s=e.map(E=>E[1]),o=(Math.min(...r)+Math.max(...r))/2,l=(Math.min(...s)+Math.max(...s))/2,d=Math.cos(o*au),p=(E,z)=>({x:(z-l)*111320*d,y:(E-o)*111320}),u=e.map(([E,z])=>p(E,z)),m=u.map(E=>E.x),h=u.map(E=>E.y);let k=Math.min(...m),f=Math.max(...m),y=Math.min(...h),w=Math.max(...h);const $=Math.max((f-k)*n,1),I=Math.max((w-y)*n,1);k-=$,f+=$,y-=I,w+=I;const C=f-k||1,H=w-y||1,Z=Math.min(t/C,a/H),F=(t-C*Z)/2,ae=(a-H*Z)/2;return{toXY:(E,z)=>{const Y=p(E,z);return{x:(Y.x-k)*Z+F,y:a-((Y.y-y)*Z+ae)}},pxPerM:Z}}function iu(e,t,a,n=18){e.save(),e.translate(t,a),e.beginPath(),e.moveTo(0,-n),e.lineTo(n*.35,0),e.lineTo(-n*.35,0),e.closePath(),e.fillStyle="#222",e.fill(),e.strokeStyle="#222",e.lineWidth=Math.max(1.5,n*.09),e.beginPath(),e.moveTo(0,0),e.lineTo(0,n),e.stroke(),e.fillStyle="#222",e.font=`bold ${Math.round(n*.7)}px sans-serif`,e.textAlign="center",e.textBaseline="bottom",e.fillText("N",0,-n-3),e.restore()}function su(e,t,a,n){const r=[1,2,5,10,20,50,100,200,500,1e3],s=90;let o=r.find(d=>d*n<=s)??r[r.length-1];const l=o*n;e.save(),e.strokeStyle="#222",e.fillStyle="#222",e.lineWidth=2,e.beginPath(),e.moveTo(t,a),e.lineTo(t+l,a),e.stroke(),e.lineWidth=1.5,[0,l].forEach(d=>{e.beginPath(),e.moveTo(t+d,a-4),e.lineTo(t+d,a+4),e.stroke()}),e.font="11px sans-serif",e.textAlign="center",e.textBaseline="top",e.fillText(`${o} m`,t+l/2,a+5),e.restore()}function ou(e){const t=e.geo;if(!t)return null;const a=t?.geometry?.coordinates?.[0];return a?.length?a.map(([n,r])=>[r,n]):null}function So(e,t,a){const n=document.createElement("canvas");n.width=t,n.height=a;const r=n.getContext("2d");r.fillStyle="#f5f7f5",r.fillRect(0,0,t,a);const s=e.latlngs;if(!s||s.length<3)return r.fillStyle="#aaa",r.font="13px sans-serif",r.textAlign="center",r.textBaseline="middle",r.fillText("Keine Koordinaten",t/2,a/2),n.toDataURL("image/png");const o=20,{toXY:l,pxPerM:d}=ru(s,t-o*2,a-o*2),p=(h,k)=>{const{x:f,y}=l(h,k);return{x:f+o,y:y+o}},u=e.color||"#388e3c";return r.beginPath(),s.forEach(([h,k],f)=>{const{x:y,y:w}=p(h,k);f===0?r.moveTo(y,w):r.lineTo(y,w)}),r.closePath(),r.fillStyle=`${u}28`,r.fill(),(e.result?.beds||[]).forEach((h,k)=>{const f=ou(h);!f||f.length<3||(r.beginPath(),f.forEach(([y,w],$)=>{const{x:I,y:C}=p(y,w);$===0?r.moveTo(I,C):r.lineTo(I,C)}),r.closePath(),r.fillStyle=k%2===0?`${u}cc`:`${u}88`,r.fill())}),r.beginPath(),s.forEach(([h,k],f)=>{const{x:y,y:w}=p(h,k);f===0?r.moveTo(y,w):r.lineTo(y,w)}),r.closePath(),r.strokeStyle="#1a1a1a",r.lineWidth=2,r.stroke(),iu(r,t-30,32,18),su(r,o,a-18,d),n.toDataURL("image/png")}async function lu(){const[{jsPDF:e},t]=await Promise.all([Dt(()=>import("./jspdf.es.min.YCCBj60b.js").then(n=>n.j),__vite__mapDeps([2,1])),Dt(()=>import("./jspdf.plugin.autotable.B0IxatYY.js"),[])]),a=t.default??t;return{jsPDF:e,autoTable:a}}const we=14,Eo=[34,139,34];function Lo(e,t,a){if(!t?.name)return a;if(e.setFont("helvetica","bold"),e.setFontSize(12),e.setTextColor(20),e.text(t.name,we,a),a+=5,t.address){e.setFont("helvetica","normal"),e.setFontSize(8),e.setTextColor(110);for(const n of String(t.address).split(/\r?\n/))n.trim()&&(e.text(n.trim(),we,a),a+=3.5);e.setTextColor(20)}return a+2}function Do(e,t,a){const n=e.internal.pageSize.getWidth();return e.setFont("helvetica","bold"),e.setFontSize(14),e.setTextColor(20),e.text(t,we,a),a+=4,e.setDrawColor(190),e.setLineWidth(.4),e.line(we,a,n-we,a),a+6}function ks(e,t,a,n,r,s){s||e.addPage();const l=e.internal.pageSize.getWidth()-we*2;let d=we;s&&(d=Lo(e,r,d)),d=Do(e,n,d);const p=100,u=Math.round(p*.6),m=we+p+7,h=l-p-7,k=So(a,600,360);e.addImage(k,"PNG",we,d,p,u);const f=a.result??{},y=f.beds??[],w=C=>y.length?y.reduce((H,Z)=>H+(C(Z)||0),0)/y.length:null,$=[["Fläche",`${ge(f.areaM2,0)} m²  ·  ${ge((f.areaM2??0)/1e4,3)} ha`],["Beete",ge(y.length,0)],["Beetmeter",`${ge(f.bedMeters,0)} m`],["Pflanzen (gesch.)",Vr(f.plants??0)],null,["Beet-Breite",`${ge(a.params.bedW,2)} m`],["Weg-Breite",`${ge(a.params.pathW,2)} m`],["Reihenabstand",`${ge(a.params.rowSp,2)} m`],["Pflanzabstand",`${ge(a.params.inRowSp,2)} m`],["Winkel",`${a.params.angle}°`],null,["Reihen/Beet (⌀)",y.length?ge(w(C=>C.rows),1):"–"],["Pfl./Reihe (⌀)",y.length?ge(w(C=>C.perRow),1):"–"],["Pfl./Beet (⌀)",y.length?ge(w(C=>C.plants),0):"–"],["Beet-Fläche (⌀)",y.length?`${ge(w(C=>C.areaM2),1)} m²`:"–"]];let I=d;e.setFontSize(8.5);for(const C of $){if(I>d+u+4)break;if(C===null){I+=2,e.setDrawColor(220),e.setLineWidth(.3),e.line(m,I,m+h,I),I+=2;continue}const[H,Z]=C;e.setFont("helvetica","normal"),e.setTextColor(120),e.text(H+":",m,I),e.setFont("helvetica","bold"),e.setTextColor(20),e.text(Z,m+h,I,{align:"right"}),I+=5.2}if(d+=u+7,y.length>0){e.setFont("helvetica","bold"),e.setFontSize(10),e.setTextColor(20),e.text("Beet-Details",we,d),d+=4;const C=80,H=y.slice(0,C).map((Z,F)=>[String(F+1),ge(Z.lenM,1),ge(Z.rows,0),ge(Z.perRow,0),ge(Z.plants,0),ge(Z.areaM2,1)]);y.length>C&&H.push(["…","","","",`+ ${y.length-C} weitere`,""]),t(e,{startY:d,margin:{left:we,right:we},head:[["Nr.","Länge (m)","Reihen","Pfl./Reihe","Pflanzen","Fläche (m²)"]],body:H,styles:{fontSize:8,cellPadding:1.8},headStyles:{fillColor:Eo,textColor:255,fontStyle:"bold"},columnStyles:{0:{cellWidth:12,halign:"right"},1:{cellWidth:28},2:{cellWidth:22},3:{cellWidth:28},4:{cellWidth:28},5:{cellWidth:28}},alternateRowStyles:{fillColor:[245,250,245]},theme:"striped"})}}function cu(e,t,a,n){const r=e.internal.pageSize.getWidth();let s=we;s=Lo(e,n,s),s=Do(e,"Acker-Übersicht",s);const o=(r-we*2-6)/2,l=Math.round(o*.5),d=2,p=a.slice(0,6);if(p.forEach((y,w)=>{const $=w%d,I=Math.floor(w/d),C=we+$*(o+6),H=s+I*(l+14),Z=So(y,Math.round(o*4),Math.round(l*4));e.addImage(Z,"PNG",C,H,o,l),e.setFont("helvetica","normal"),e.setFontSize(7.5),e.setTextColor(80),e.text(y.name||"Unbenannt",C+o/2,H+l+3.5,{align:"center"})}),p.length>0){const y=Math.ceil(p.length/d);s+=y*(l+14)+4}e.setFont("helvetica","bold"),e.setFontSize(10),e.setTextColor(20),e.text("Zusammenfassung",we,s),s+=4;const u=a.map(y=>{const w=y.result??{};return[y.name||"Unbenannt",ge(w.areaM2,0),ge(w.beds?.length??0,0),ge(w.bedMeters,0),Vr(w.plants??0)]}),m=a.reduce((y,w)=>y+(w.result?.areaM2??0),0),h=a.reduce((y,w)=>y+(w.result?.beds?.length??0),0),k=a.reduce((y,w)=>y+(w.result?.bedMeters??0),0),f=a.reduce((y,w)=>y+(w.result?.plants??0),0);t(e,{startY:s,margin:{left:we,right:we},head:[["Fläche","m²","Beete","Beetmeter","Pflanzen (gesch.)"]],body:u,foot:[["Gesamt",ge(m,0),ge(h,0),ge(k,0),Vr(f)]],styles:{fontSize:9,cellPadding:2},headStyles:{fillColor:Eo,textColor:255,fontStyle:"bold"},footStyles:{fillColor:[230,245,230],fontStyle:"bold",textColor:20},showFoot:"lastPage",alternateRowStyles:{fillColor:[245,250,245]},theme:"striped"})}function du(e,t){const a=e.internal.getNumberOfPages(),n=e.internal.pageSize.getWidth(),r=e.internal.pageSize.getHeight();for(let s=1;s<=a;s++)e.setPage(s),e.setFont("helvetica","normal"),e.setFontSize(7.5),e.setTextColor(150),e.text(t,we,r-5),e.text(`${s} / ${a}`,n-we,r-5,{align:"right"})}async function ws(e,t={}){if(!e.length)return;const{jsPDF:a,autoTable:n}=await lu(),r=new a({unit:"mm",format:"a4"}),s=t.company??null,o=t.singleField??(e.length===1?e[0]:null);if(o){const f=t.title||o.name||"Ackerfläche";ks(r,n,o,f,s,!0)}else cu(r,n,e,s),e.forEach((f,y)=>{ks(r,n,f,f.name||`Fläche ${y+1}`,s,!1)});const l=t.title??(o?o.name:"Acker-Übersicht")??"Acker-PDF";du(r,l);const d=`${nu(l)}.pdf`,p=r.output("blob"),u=new File([p],d,{type:"application/pdf"}),m=navigator;if(typeof m.share=="function"&&(typeof m.canShare!="function"||m.canShare({files:[u]})))try{await m.share({files:[u],title:l});return}catch(f){if(f?.name==="AbortError")return}const h=URL.createObjectURL(p),k=document.createElement("a");k.href=h,k.download=d,document.body.appendChild(k),k.click(),k.remove(),setTimeout(()=>URL.revokeObjectURL(h),1e3)}const It=["#c62828","#d32f2f","#e53935","#ef5350","#bf360c","#e64a19","#f57c00","#ffb300","#1b5e20","#2e7d32","#388e3c","#66bb6a","#0d47a1","#1565c0","#0277bd","#42a5f5","#4a148c","#6a1b9a","#8e24aa","#e91e63","#3e2723","#4e342e","#00695c","#546e7a"],uu=()=>({bedW:1.2,pathW:.4,rowSp:.5,inRowSp:.4,angle:0}),V=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";let X=null,O=null;const Lt=Math.PI/180;function $n(e,t,a,n){const r=e*Lt,s=a*Lt,o=(a-e)*Lt,l=(n-t)*Lt,d=Math.sin(o/2)**2+Math.cos(r)*Math.cos(s)*Math.sin(l/2)**2;return 6371e3*2*Math.atan2(Math.sqrt(d),Math.sqrt(1-d))}function pu(e,t,a,n){const r=e*Lt,s=a*Lt,o=(n-t)*Lt,l=Math.sin(o)*Math.cos(s),d=Math.cos(r)*Math.sin(s)-Math.sin(r)*Math.cos(s)*Math.cos(o);return(Math.atan2(l,d)/Lt+360)%360}function fu(e){const t=e.length;if(t<3)return 0;const a=e.reduce((o,l)=>o+l[0],0)/t,n=e.reduce((o,l)=>o+l[1],0)/t,r=Math.cos(a*Lt)*111320;let s=0;for(let o=0;o<t;o++){const l=(o+1)%t;s+=(e[o][1]-n)*r*((e[l][0]-a)*111320)-(e[l][1]-n)*r*((e[o][0]-a)*111320)}return Math.abs(s/2)}let zn=!1,Qt=[];function xs(){if(!O)return 1;const e=O.getCenter().lat;return 156543.03392*Math.cos(e*Math.PI/180)/Math.pow(2,O.getZoom())}function mu(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=gu();const a=[];let n=null;const r=new Map;let s=null,o=null,l={sat:null,dop:null,osm:null},d=!0,p=!0,u=[],m=[];const h=(i,c)=>u.filter(g=>g.flaecheTyp===i&&String(g.flaecheId)===String(c)),k=(i,c)=>m.filter(g=>g.flaecheTyp===i&&String(g.flaecheId)===String(c));function f(i){const c=fa(h("acker",i.id)).current;return c&&c.kultur?{name:c.kultur,color:ka(c)}:i.kultur?{name:i.kultur,color:null}:null}function y(){const i=[];if(a.forEach(S=>{const b=S.latlngs||[];if(b.length<3)return;const D=b.map(ie=>[Number(ie[1]),Number(ie[0])]),M=D[0],G=D[D.length-1];(M[0]!==G[0]||M[1]!==G[1])&&D.push([M[0],M[1]]),i.push({type:"Feature",geometry:{type:"Polygon",coordinates:[D]},properties:{name:S.name||"",kultur:S.kultur||null,eppoCode:S.eppoCode||null,flaeche_m2:Math.round(S.result?.areaM2||0),flaeche_ha:Number(((S.result?.areaM2||0)/1e4).toFixed(4)),beete:S.result?.beds?.length||0,beetmeter_m:Math.round(S.result?.bedMeters||0),pflanzen:S.result?.plants||0,bettbreite_m:S.params?.bedW??null,wegbreite_m:S.params?.pathW??null,reihenabstand_m:S.params?.rowSp??null,pflanzabstand_m:S.params?.inRowSp??null,ausrichtung_grad:S.params?.angle??null}})}),(Ue(t.state.getState().gps?.points)||[]).forEach(S=>{const b=Number(S.latitude),D=Number(S.longitude);if(!Number.isFinite(b)||!Number.isFinite(D))return;const M=Number(S.nutzflaecheQm);i.push({type:"Feature",geometry:{type:"Point",coordinates:[D,b]},properties:{name:S.name||"Standort",typ:"standort",flaeche_m2:Number.isFinite(M)&&M>0?Math.round(M):null,kind:S.kind||null}})}),!i.length){N.warning("Keine Flächen oder Standorte zum Exportieren.");return}const g={type:"FeatureCollection",name:"PSM Acker-Planer",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:i};try{const S=new Blob([JSON.stringify(g,null,2)],{type:"application/geo+json"}),b=URL.createObjectURL(S),D=document.createElement("a");D.href=b,D.download="acker-flaechen.geojson",document.body.appendChild(D),D.click(),D.remove(),setTimeout(()=>URL.revokeObjectURL(b),1e3),N.success(`${i.length} Objekt(e) als GeoJSON exportiert.`)}catch(S){console.error("[Acker] GeoJSON-Export fehlgeschlagen",S),N.error("Export fehlgeschlagen.")}}async function w(i){try{N.info("PDF wird erstellt …"),await ws([i],{singleField:i,title:i.name||"Ackerfläche"})}catch(c){console.error("[Acker] PDF-Export fehlgeschlagen",c),N.error("PDF-Export fehlgeschlagen.")}}async function $(){if(!a.length){N.warning("Keine Flächen vorhanden.");return}try{N.info("PDF wird erstellt …"),await ws(a,{title:"Acker-Übersicht"})}catch(i){console.error("[Acker] PDF-Export fehlgeschlagen",i),N.error("PDF-Export fehlgeschlagen.")}}function I(){if(!X||!s)return;s.clearLayers(),(Ue(t.state.getState().gps?.points)||[]).forEach(c=>{const g=Number(c.latitude),S=Number(c.longitude);if(!Number.isFinite(g)||!Number.isFinite(S))return;const b=Number(c.nutzflaecheQm),D=Number.isFinite(b)&&b>0?`${Math.round(b)} m²`:"",M=c.name||"Standort",G=X.marker([g,S],{icon:X.divIcon({className:"acker-standort",html:'<span class="acker-standort-dot"></span>',iconSize:[16,16],iconAnchor:[8,8]})});G.bindTooltip(`${v(M)}${D?" · "+D:""}`,{permanent:!0,direction:"top",className:"acker-standort-label",offset:[0,-9]}),G.on("click",()=>Gt({typ:"haus",id:c.id,name:M,area:Number.isFinite(b)&&b>0?b:0,latlng:[g,S]})),s.addLayer(G)})}const C=i=>e.querySelector(i),H=C('[data-role="acker-list"]'),Z=C('[data-role="acker-empty"]'),F=C('[data-role="acker-totals"]'),ae=C('[data-role="acker-map"]'),R=i=>({id:i.id,name:i.name,kultur:i.kultur||null,eppoCode:i.eppoCode||null,standortId:i.standortId||null,color:i.color,latlngs:i.latlngs,areaQm:i.result?.areaM2||0,bedW:i.params.bedW,pathW:i.params.pathW,rowSp:i.params.rowSp,inRowSp:i.params.inRowSp,angle:i.params.angle,beds:i.result?.beds?.length||0,bedMeters:i.result?.bedMeters||0,plants:i.result?.plants||0}),E=(i,c=!1)=>{if(ce()!=="sqlite")return;const g=async()=>{try{const S=await hl(R(i));S?.id&&(i.id=S.id),await it().catch(()=>{})}catch(S){console.warn("[Acker] Speichern fehlgeschlagen:",S)}};if(c){g();return}clearTimeout(r.get(i._key)),r.set(i._key,setTimeout(g,600))};async function z(i,c){if(!i||i.length<3)return{areaM2:0,beds:[],bedMeters:0,plants:0};try{return await eu(i,c)}catch(g){return console.error("[Acker] WASM computeBeds fehlgeschlagen:",g),{areaM2:0,beds:[],bedMeters:0,plants:0}}}const Y=(i,c,g)=>({color:i.color,weight:c?3.5:2.5,fillColor:i.color,fillOpacity:g?0:c?.3:.18,dashArray:null}),re=(i,c,g)=>({color:"#ffffff",weight:g?1:.7,opacity:.9,fillColor:i.color,fillOpacity:g?.9:.78});function de(i){if(!p||i.bedsHidden)return!1;const c=xs(),g=(i.params?.bedW||0)/c,S=(i.params?.pathW||0)/c,b=(i.params?.pathW||0)<=.001||S>=1.2;return g>=4&&b}function xe(i){i.outline&&(O.removeLayer(i.outline),i.outline=null),i.bedsLayer&&(O.removeLayer(i.bedsLayer),i.bedsLayer=null),i.label&&o&&(o.removeLayer(i.label),i.label=null),gt(i),Kt(i)}function De(i){const c=!!i.editing;i.outline&&O.removeLayer(i.outline),i.bedsLayer&&(O.removeLayer(i.bedsLayer),i.bedsLayer=null),i.label&&o&&o.removeLayer(i.label),gt(i),Kt(i);const g=i._key===n,S=de(i);i._lastDetail=S,S&&(i.bedsLayer=X.layerGroup(),(i.result?.beds||[]).forEach((b,D)=>{const M=X.geoJSON(b.geo,{style:re(i,D,g),bubblingMouseEvents:!1});M.bindTooltip(`Beet ${D+1} · ${V(b.lenM,1)} m · ${b.rows}×${V(b.perRow)} = ${V(b.plants)} Pfl.`,{sticky:!0}),M.on("click",()=>lt(i._key)),M.on("contextmenu",G=>pe(i,G,D+1)),M.addTo(i.bedsLayer)}),i.bedsLayer.addTo(O)),i.outline=X.polygon(i.latlngs,{...Y(i,g,S),className:g?"acker-outline-grab":"",bubblingMouseEvents:!1}).addTo(O),i.outline.on("click",()=>{lt(i._key),Gt({typ:"acker",id:i.id,name:i.name,area:i.result?.areaM2||0,fieldRef:i})}),i.outline.on("dblclick",()=>ia(i)),i.outline.on("contextmenu",b=>pe(i,b)),i.outline.on("mousedown",b=>un(i,b)),Je(i,g),g&&Te(i),(g||c)&&ra(i)}function Je(i,c){if(!d||!o||!i.outline)return;let g;try{g=i.outline.getBounds().getCenter()}catch{return}const S=i.result?.plants||0,b=f(i),D=b?`<em class="cr" style="--cc:${v(b.color||"#16a34a")}"><span class="dot"></span>${v(b.name)}</em>`:"";let M="";if(c&&i.latlngs?.length>=3){const ie=i.latlngs.map(fr=>fr[0]),le=i.latlngs.map(fr=>fr[1]),ct=Math.min(...ie),et=Math.max(...ie),tt=Math.min(...le),xi=Math.max(...le),Si=(ct+et)/2,Ei=(tt+xi)/2,Fo=$n(Si,tt,Si,xi),No=$n(ct,Ei,et,Ei);M=`<span class="dims">↔ ${V(Fo,0)} m · ↕ ${V(No,0)} m</span>`}const G=`<div class="acker-flabel${c?" sel":""}" style="--fc:${i.color}"><b>${v(i.name||"")}</b>${D}<i>${V(S)} Pfl.</i>${M}</div>`;i.label=X.marker(g,{interactive:!1,keyboard:!1,icon:X.divIcon({className:"acker-flabel-wrap",html:G,iconSize:[0,0]})}),o.addLayer(i.label)}function Te(i){gt(i);const c=i.latlngs,g=c.length;i.edgeLabels=c.map((S,b)=>{const D=c[(b+1)%g],M=(S[0]+D[0])/2,G=(S[1]+D[1])/2,ie=$n(S[0],S[1],D[0],D[1]);return X.marker([M,G],{interactive:!1,keyboard:!1,pane:"edgeLabels",icon:X.divIcon({className:"acker-edge-label-wrap",html:`<div class="acker-edge-label">${V(ie,1)} m</div>`,iconSize:[0,0],iconAnchor:[0,0]})}).addTo(O)})}function gt(i){(i.edgeLabels||[]).forEach(c=>O.removeLayer(c)),i.edgeLabels=[]}function Wt(i){i.latlngs?.length&&(gt(i),Te(i))}function ra(i){Kt(i),i.handles=i.latlngs.map((c,g)=>{const S=X.marker(c,{draggable:!0,icon:X.divIcon({className:"acker-vhandle"})}).addTo(O);return S.on("drag",b=>{i.latlngs[g]=[b.target.getLatLng().lat,b.target.getLatLng().lng],i.outline.setLatLngs(i.latlngs),Wt(i)}),S.on("dragend",()=>void ot(i)),S.on("contextmenu",b=>ee(i,g,b)),S}),i.editing=!0}function Kt(i){(i.handles||[]).forEach(c=>O.removeLayer(c)),i.handles=[],i.editing=!1}function La(){a.forEach(i=>De(i))}function or(){a.forEach(i=>{de(i)!==i._lastDetail&&De(i)})}function dn(i,c){i.color=c;try{i.outline?.setStyle({color:c,fillColor:c})}catch{}if(i.bedsLayer)try{i.bedsLayer.eachLayer(S=>S.setStyle&&S.setStyle({fillColor:c}))}catch{}try{const S=i.label?.getElement?.()?.querySelector?.(".acker-flabel");S&&S.style.setProperty("--fc",c)}catch{}const g=H?.querySelector(".acker-field.sel .acker-swatch");g&&(g.style.background=c)}function ia(i){if(i.latlngs?.length)try{O.fitBounds(X.polygon(i.latlngs).getBounds(),{maxZoom:20,padding:[40,40]})}catch{}}function Da(){const i=a.filter(c=>c.latlngs?.length>=3);if(!i.length){N.info("Keine Flächen vorhanden.");return}try{let c=X.polygon(i[0].latlngs).getBounds();i.slice(1).forEach(g=>{c=c.extend(X.polygon(g.latlngs).getBounds())}),O.fitBounds(c,{maxZoom:19,padding:[40,40]})}catch{}}async function ot(i){i.result=await z(i.latlngs,i.params),De(i),Ye(),E(i)}function lr(i){if(Qe("app",c=>({...c,activeSection:"kultur"})),i?.id)try{window.dispatchEvent(new CustomEvent("psm:openKultur",{detail:{typ:"acker",id:String(i.id)}}))}catch{}else N.info("Fläche wird gespeichert – in der Kulturführung gleich wählbar.")}let Ie=null;const ye=()=>{Ie&&(Ie.remove(),Ie=null,document.removeEventListener("pointerdown",jt,!0),document.removeEventListener("keydown",$a,!0))},jt=i=>{Ie&&!Ie.contains(i.target)&&ye()},$a=i=>{i.key==="Escape"&&ye()};function cr(i,c){c.style.left="",c.style.right="",c.style.top="";const g=i.getBoundingClientRect(),S=c.getBoundingClientRect(),b=S.width||210,D=S.height||260;g.right+3+b>window.innerWidth-8&&(c.style.left="auto",c.style.right="calc(100% + 3px)");let M=-5;g.top+M+D>window.innerHeight-8&&(M=Math.min(-5,window.innerHeight-8-D-g.top)),g.top+M<8&&(M=8-g.top),c.style.top=M+"px"}function za(i,c){c.forEach(g=>{if(!g)return;if(g.sep){const b=document.createElement("div");b.className="acker-ctx-sep",i.appendChild(b);return}if(g.type==="swatchGrid"){const b=document.createElement("div");b.className="acker-ctx-swatches",g.colors.forEach(G=>{const ie=document.createElement("button");ie.type="button",ie.className="acker-sw"+(G===g.current?" on":""),ie.style.background=G,ie.title=G,ie.addEventListener("click",le=>{le.stopPropagation(),ye(),g.onPick(G)}),b.appendChild(ie)});const D=document.createElement("label");D.className="acker-sw-custom",D.innerHTML=`<i class="bi bi-eyedropper"></i><input type="color" value="${g.current||"#3b82f6"}">`;const M=D.querySelector("input");M.addEventListener("input",G=>(g.onLive||g.onPick)(G.target.value)),M.addEventListener("change",G=>{g.onPick(G.target.value),ye()}),b.appendChild(D),i.appendChild(b);return}const S=document.createElement("button");if(S.type="button",S.className="acker-ctx-item"+(g.danger?" danger":"")+(g.submenu?" has-sub":"")+(g.disabled?" disabled":""),S.innerHTML=`<span class="ic">${g.icon||""}</span><span class="lb">${v(g.label)}</span>`+(g.right?`<span class="rt">${v(g.right)}</span>`:"")+(g.submenu?'<span class="ch"><i class="bi bi-chevron-right"></i></span>':""),g.submenu){const b=document.createElement("div");b.className="acker-ctx-sub",za(b,g.submenu),S.appendChild(b);let D=null;const M=()=>{D&&(clearTimeout(D),D=null),S.parentElement?.querySelectorAll(".acker-ctx-sub.open").forEach(ie=>{ie!==b&&ie.classList.remove("open")}),cr(S,b),b.classList.add("open")},G=()=>{D=setTimeout(()=>{b.classList.remove("open"),D=null},150)};S.addEventListener("pointerenter",M),S.addEventListener("pointerleave",G),b.addEventListener("pointerenter",()=>{D&&(clearTimeout(D),D=null)}),b.addEventListener("pointerleave",G)}else g.disabled||S.addEventListener("click",b=>{b.stopPropagation(),g.keepOpen||ye(),g.action?.()});i.appendChild(S)})}function We(i,c,g,S){if(ye(),Ie=document.createElement("div"),Ie.className="acker-ctx",S){const G=document.createElement("div");G.className="acker-ctx-title",G.textContent=S,Ie.appendChild(G)}za(Ie,g),document.body.appendChild(Ie);const b=Ie.getBoundingClientRect();let D=i,M=c;D+b.width>window.innerWidth-8&&(D=Math.max(8,window.innerWidth-b.width-8)),M+b.height>window.innerHeight-8&&(M=Math.max(8,window.innerHeight-b.height-8)),Ie.style.left=D+"px",Ie.style.top=M+"px",setTimeout(()=>{document.addEventListener("pointerdown",jt,!0),document.addEventListener("keydown",$a,!0)},0)}const sa=i=>{const c=i.originalEvent||i;return c&&X.DomEvent.preventDefault?.(c),i.originalEvent&&X.DomEvent.stop?.(i),{x:c.clientX,y:c.clientY}};function Aa(i,c){i.params.angle=(Math.round(i.params.angle+c)%180+180)%180,ot(i),N.info(`Beete-Ausrichtung: ${i.params.angle}°`)}function oa(i){if(i.length<2)return 0;let c=-1,g=0;for(let S=0;S<i.length;S++){const b=i[S],D=i[(S+1)%i.length],M=$n(b[0],b[1],D[0],D[1]);M>c&&(c=M,g=pu(b[0],b[1],D[0],D[1]))}return((90-Math.round(g))%180+180)%180}function la(i){i.params.angle=oa(i.latlngs||[]),ot(i),N.success(`Beete an Fläche ausgerichtet (${i.params.angle}°).`)}function x(i,c){i.color=c,De(i),Ye(),E(i)}function L(i,c){i.kultur=c||null,i.eppoCode=Qt.find(g=>g.kultur===i.kultur)?.eppoCode||null,De(i),Ye(),E(i),N.success(c?`Kultur: ${c}`:"Kultur entfernt.")}function W(i){i.bedsHidden=!i.bedsHidden,De(i),N.info(i.bedsHidden?"Beete ausgeblendet.":"Beete eingeblendet.")}function _(i){lt(i._key),setTimeout(()=>{const c=H?.querySelector(".acker-field.sel .acker-name");c&&(c.focus(),c.select())},30)}function P(i){const g=xs()*18/111320,S={_key:"new-"+ ++Ca,id:null,name:(i.name||"Fläche")+" (Kopie)",kultur:i.kultur,eppoCode:i.eppoCode,standortId:i.standortId,color:It[(It.indexOf(i.color)+1)%It.length],latlngs:i.latlngs.map(b=>[b[0]+g,b[1]+g]),params:{...i.params},outline:null,bedsLayer:null,label:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(S),n=S._key,ot(S),E(S,!0),N.success("Fläche dupliziert.")}function B(i){const c=i.latlngs||[];if(c.length<3){N.warning("Fläche hat keine Geometrie.");return}const g=c.map(b=>[Number(b[1]),Number(b[0])]);(g[0][0]!==g[g.length-1][0]||g[0][1]!==g[g.length-1][1])&&g.push([g[0][0],g[0][1]]);const S={type:"FeatureCollection",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:[{type:"Feature",geometry:{type:"Polygon",coordinates:[g]},properties:{name:i.name||"",kultur:i.kultur||null,eppoCode:i.eppoCode||null,flaeche_m2:Math.round(i.result?.areaM2||0),beete:i.result?.beds?.length||0,beetmeter_m:Math.round(i.result?.bedMeters||0),pflanzen:i.result?.plants||0}}]};try{const b=new Blob([JSON.stringify(S,null,2)],{type:"application/geo+json"}),D=URL.createObjectURL(b),M=document.createElement("a");M.href=D,M.download=`${(i.name||"flaeche").replace(/[^\w\-]+/g,"_")}.geojson`,document.body.appendChild(M),M.click(),M.remove(),setTimeout(()=>URL.revokeObjectURL(D),1e3),N.success("Fläche als GeoJSON exportiert.")}catch{N.error("Export fehlgeschlagen.")}}async function T(i){const c=i.result||{},g=[`Fläche: ${i.name||""}`,i.kultur?`Kultur: ${i.kultur}`:"",`Größe: ${V(c.areaM2||0)} m² (${V((c.areaM2||0)/1e4,3)} ha)`,`Beete: ${V(c.beds?.length||0)}`,`Beetmeter: ${V(c.bedMeters||0)} m`,`Pflanzen: ${V(c.plants||0)}`].filter(Boolean).join(`
`);try{await navigator.clipboard.writeText(g),N.success("Werte kopiert.")}catch{N.warning("Kopieren nicht möglich.")}}const ue=i=>({icon:'<i class="bi bi-palette"></i>',label:"Farbe",submenu:[{type:"swatchGrid",colors:It,current:i.color,onPick:c=>x(i,c),onLive:c=>dn(i,c)}]}),be=i=>({icon:'<i class="bi bi-flower1"></i>',label:"Kultur zuweisen",submenu:[{icon:'<i class="bi bi-x"></i>',label:"– keine –",action:()=>L(i,null)},...Qt.length?[{sep:!0}]:[],...Qt.map(c=>({icon:c.kultur===i.kultur?'<i class="bi bi-check2"></i>':"",label:`${c.kultur}${c.anbau?" ("+c.anbau+")":""}`,action:()=>L(i,c.kultur)}))]});function pe(i,c,g){lt(i._key);const{x:S,y:b}=sa(c),D=!!i.editing;We(S,b,[{icon:'<i class="bi bi-clipboard2-pulse"></i>',label:"Kulturführung öffnen",action:()=>lr(i)},{icon:'<i class="bi bi-pencil"></i>',label:"Umbenennen",action:()=>_(i)},be(i),ue(i),{sep:!0},{icon:'<i class="bi bi-arrow-clockwise"></i>',label:"Beete drehen +15°",keepOpen:!0,action:()=>Aa(i,15)},{icon:'<i class="bi bi-arrow-counterclockwise"></i>',label:"Beete drehen −15°",keepOpen:!0,action:()=>Aa(i,-15)},{icon:'<i class="bi bi-bounding-box"></i>',label:"Beete an Fläche ausrichten",action:()=>la(i)},{icon:'<i class="bi bi-grid-3x3-gap"></i>',label:i.bedsHidden?"Beete einblenden":"Beete ausblenden",action:()=>W(i)},{icon:'<i class="bi bi-bounding-box-circles"></i>',label:D?"Eckpunkte fertig":"Eckpunkte bearbeiten",action:()=>{D?Kt(i):ra(i)}},{sep:!0},{icon:'<i class="bi bi-copy"></i>',label:"Duplizieren",action:()=>P(i)},{icon:'<i class="bi bi-zoom-in"></i>',label:"Auf Fläche zoomen",action:()=>ia(i)},{icon:'<i class="bi bi-clipboard-data"></i>',label:"Werte kopieren",action:()=>T(i)},{icon:'<i class="bi bi-download"></i>',label:"Als GeoJSON exportieren",action:()=>B(i)},{sep:!0},{icon:'<i class="bi bi-trash"></i>',label:"Löschen",danger:!0,action:()=>Pa(i._key)}],g?`${i.name||"Fläche"} · Beet ${g}`:i.name||"Fläche")}function ee(i,c,g){const{x:S,y:b}=sa(g);We(S,b,[{icon:'<i class="bi bi-node-minus"></i>',label:"Eckpunkt löschen",disabled:i.latlngs.length<=3,action:()=>{i.latlngs.length<=3||(i.latlngs.splice(c,1),ot(i))}},{icon:'<i class="bi bi-check2"></i>',label:"Bearbeiten beenden",action:()=>Kt(i)}],`Eckpunkt ${c+1}`)}function Q(){const{sat:i,dop:c,osm:g}=l;if(!i||!g)return;const S=[{layer:i,label:"Satellit (weltweit)"},{layer:c,label:"Luftbild BW – scharf (20 cm)"},{layer:g,label:"Straßenkarte (OSM)"}].filter(M=>M.layer),b=S.findIndex(M=>O.hasLayer(M.layer)),D=S[(b+1)%S.length];S.forEach(M=>{O.hasLayer(M.layer)&&O.removeLayer(M.layer)}),D.layer.addTo(O),N.info("Karte: "+D.label)}function te(i){const c=i.latlng,{x:g,y:S}=sa(i);We(g,S,[{icon:'<i class="bi bi-pencil-square"></i>',label:"Neue Fläche hier zeichnen",action:()=>{ht(!0),hi({latlng:c})}},{icon:'<i class="bi bi-crosshair"></i>',label:"Hierhin zentrieren",action:()=>O.panTo(c)},{sep:!0},{icon:'<i class="bi bi-arrows-fullscreen"></i>',label:"Alle Flächen anzeigen",disabled:!a.some(b=>b.latlngs?.length>=3),action:Da},{icon:'<i class="bi bi-layers"></i>',label:"Kartentyp wechseln (Satellit / Luftbild BW / OSM)",action:Q},{sep:!0},{icon:'<i class="bi bi-geo-alt"></i>',label:"Koordinaten kopieren",action:async()=>{try{await navigator.clipboard.writeText(`${c.lat.toFixed(6)}, ${c.lng.toFixed(6)}`),N.success("Koordinaten kopiert.")}catch{N.warning("Kopieren nicht möglich.")}}}],"Karte")}function he(i){return['<option value="">– Kultur –</option>'].concat(Qt.map(c=>{const g=`${c.kultur}${c.anbau?" ("+c.anbau+")":""}`;return`<option value="${v(c.kultur)}"${c.kultur===i?" selected":""}>${v(g)}</option>`})).join("")}function Se(i){const c=Ue(t.state.getState().gps?.points)||[];return['<option value="">– Standort –</option>'].concat(c.map(g=>`<option value="${v(g.id)}"${g.id===i?" selected":""}>${v(g.name||"")}</option>`)).join("")}function Ke(i){const c=f(i);return c?`<span class="acker-cropchip" title="Kultur"><span class="dot" style="background:${v(c.color||"#94a3b8")}"></span>${v(c.name)}</span>`:""}function q(i){if(i=Math.round(i||0),i<=0)return"0";let c=100;return i>=1e5?c=1e3:i>=1e4&&(c=500),"≈ "+V(Math.round(i/c)*c)}function fe(i,c){const g=i.result?.beds?.length||0,S=i.params.bedW+i.params.pathW;if(g<1||S<=0){N.warning("Erst Beete berechnen lassen.");return}const D=+(g*S/c-i.params.pathW).toFixed(2);if(D<.1){N.warning("Wegbreite ist größer als der gewünschte Abstand – erst Wegbreite verkleinern.");return}i.params.bedW=D,ot(i),N.success(`Bettbreite ${V(D,2)} m → ${i.result?.beds?.length||0} Beete.`)}function ze(){if(!F)return;let i=0,c=0,g=0,S=0;a.forEach(D=>{i+=D.result?.areaM2||0,c+=D.result?.beds?.length||0,g+=D.result?.bedMeters||0,S+=D.result?.plants||0});const b=(D,M)=>{const G=F.querySelector(D);G&&(G.textContent=M)};b('[data-t="area"]',V(i)+" m² · "+V(i/1e4,3)+" ha"),b('[data-t="beds"]',V(c)),b('[data-t="meters"]',V(g)+" m"),b('[data-t="plants"]',q(S))}function ke(i,c){const g=c.result||{},S=i.querySelector(".acker-stat");S&&(S.textContent=V(g.plants||0)+" Pfl.");const b=(M,G)=>{const ie=i.querySelector(`[data-r="${M}"]`);ie&&(ie.textContent=G)};b("area",V(g.areaM2||0)+" m² · "+V((g.areaM2||0)/1e4,3)+" ha"),b("pitch",V(c.params.bedW+c.params.pathW,2)+" m"),b("beds",V(g.beds?.length||0)),b("meters",V(g.bedMeters||0)+" m"),b("plants",q(g.plants||0));const D=g.beds||[];if(D.length){const M=G=>D.reduce((ie,le)=>ie+(G(le)||0),0)/D.length;b("rows-per-bed",V(M(G=>G.rows),1)),b("per-row",V(M(G=>G.perRow),1)),b("plants-per-bed",V(M(G=>G.plants),0)),b("bed-area",V(M(G=>G.areaM2),1)+" m²")}ze()}const Pt=["Jan.","Feb.","März","Apr.","Mai","Juni","Juli","Aug.","Sep.","Okt.","Nov.","Dez."];function j(i){if(!i)return"";const c=new Date(String(i).slice(0,10)+"T00:00:00");return isNaN(c.getTime())?"":`${c.getDate()}. ${Pt[c.getMonth()]}`}function se(i){const c=i?.ernteVon?j(i.ernteVon):"",g=i?.ernteBis||i?.ernteDatum?j(i.ernteBis||i.ernteDatum):"";return c&&g?`Ernte ${c}–${g}`:g?`Ernte ~${g}`:c?`Ernte ab ${c}`:""}function Ae(){const i=C('[data-role="acker-info"]');i&&(i.style.display="none")}function Gt(i){const c=C('[data-role="acker-info"]');if(!c)return;const{current:g,next:S}=fa(h(i.typ,i.id)),b=k(i.typ,i.id).filter(tt=>tt.status==="geplant").length,D=i.typ==="haus",M=i.area?`${V(i.area)} m²`:"",G=g?ka(g):"#94a3b8",ie=g?`<div class="ai-row"><span class="ai-dot" style="background:${v(G)}"></span>
           <div><div class="ai-crop">${v(g.kultur||"Kultur")}</div>
           <div class="ai-sub">${v([g.pflanzDatum?"gepflanzt "+j(g.pflanzDatum):"",se(g)].filter(Boolean).join(" · "))}</div></div></div>`:'<div class="ai-row"><span class="ai-dot" style="background:#cbd5e1"></span><div class="ai-crop muted">Fläche ist frei</div></div>',le=S?`<div class="ai-next"><i class="bi bi-arrow-right-short"></i> Danach: <b>${v(S.kultur||"")}</b>${S.pflanzDatum?" ab "+j(S.pflanzDatum):""}</div>`:"",ct=!D&&i.fieldRef?`<div class="ai-metrics"><span><b>${V(i.fieldRef.result?.beds?.length||0)}</b> Beete</span><span><b>${V(i.fieldRef.result?.bedMeters||0)}</b> m</span><span><b>${q(i.fieldRef.result?.plants||0)}</b> Pfl.</span></div>`:"",et=`<div class="ai-tasks${b?" has":""}"><i class="bi ${b?"bi-list-check":"bi-check2-circle"}"></i> ${b?b+" Aufgabe"+(b===1?"":"n")+" offen":"Nichts offen"}</div>`;c.innerHTML=`
      <div class="ai-head">
        <div class="ai-title"><b>${v(i.name||"Fläche")}</b><span class="ai-badge">${D?"Gewächshaus":"Freiland"}${M?" · "+M:""}</span></div>
        <button class="ai-x" data-ai="close" title="Schließen"><i class="bi bi-x-lg"></i></button>
      </div>
      ${ie}${le}${ct}${et}
      <div class="ai-actions">
        <button class="ai-btn primary" data-ai="kultur"><i class="bi bi-clipboard2-pulse"></i> Kulturführung</button>
        <button class="ai-btn" data-ai="zoom"><i class="bi bi-zoom-in"></i> Hin</button>
      </div>`,c.style.display="block",c.querySelector('[data-ai="close"]')?.addEventListener("click",Ae),c.querySelector('[data-ai="kultur"]')?.addEventListener("click",()=>{Qe("app",tt=>({...tt,activeSection:"kultur"}));try{window.dispatchEvent(new CustomEvent("psm:openKultur",{detail:{typ:i.typ,id:String(i.id)}}))}catch{}}),c.querySelector('[data-ai="zoom"]')?.addEventListener("click",()=>{!D&&i.fieldRef?ia(i.fieldRef):i.latlng&&O.setView(i.latlng,Math.max(O.getZoom(),18))})}function Ye(){if(!H||!Z||!F)return;Z.style.display=a.length?"none":"block",F.style.display=a.length?"block":"none",H.innerHTML="";let i=0,c=0,g=0,S=0;a.forEach(b=>{i+=b.result?.areaM2||0,c+=b.result?.beds?.length||0,g+=b.result?.bedMeters||0,S+=b.result?.plants||0;const D=b._key===n,M=document.createElement("div");M.className="acker-field"+(D?" sel open":""),M.innerHTML=`
        <div class="acker-fhead">
          <span class="acker-swatch" style="background:${b.color}"></span>
          <input class="acker-name" value="${v(b.name)}" />
          ${Ke(b)}
          <span class="acker-stat">${V(b.result?.plants||0)} Pfl.</span>
        </div>
        <div class="acker-fbody">
          <div class="acker-grid">
            <label class="acker-fld span2">Kultur<select data-k="kultur">${he(b.kultur)}</select></label>
            <label class="acker-fld span2">Standort (für PSM)<select data-k="standortId">${Se(b.standortId)}</select></label>
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
            <div class="r"><span>Fläche</span><b data-r="area">${V(b.result?.areaM2||0)} m² · ${V((b.result?.areaM2||0)/1e4,3)} ha</b></div>
            <div class="r"><span>Abstand (Mitte–Mitte)</span><b data-r="pitch">${V(b.params.bedW+b.params.pathW,2)} m</b></div>
            <div class="r"><span>Beete</span><b data-r="beds">${V(b.result?.beds?.length||0)}</b></div>
            <div class="r"><span>Beetmeter</span><b data-r="meters">${V(b.result?.bedMeters||0)} m</b></div>
            <div class="r"><span>Pflanzen (geschätzt)</span><b data-r="plants">${q(b.result?.plants||0)}</b></div>
            <div class="sep"></div>
            <div class="r"><span>Reihen/Beet (⌀)</span><b data-r="rows-per-bed">–</b></div>
            <div class="r"><span>Pflanzen/Reihe (⌀)</span><b data-r="per-row">–</b></div>
            <div class="r"><span>Pflanzen/Beet (⌀)</span><b data-r="plants-per-bed">–</b></div>
            <div class="r"><span>Beet-Fläche (⌀)</span><b data-r="bed-area">–</b></div>
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
            <button class="btn btn-sm acker-abtn" data-act="pdf" title="Als PDF exportieren"><i class="bi bi-file-earmark-pdf"></i></button>
            <span style="flex:1"></span>
            <button class="btn btn-sm acker-abtn danger" data-act="del" title="Löschen"><i class="bi bi-trash"></i></button>
          </div>
          <div class="acker-hint"><i class="bi bi-arrows-move"></i> Ausgewählte Fläche ziehen = verschieben · Rechtsklick = mehr Aktionen</div>
        </div>`,M.querySelector(".acker-fhead").addEventListener("click",le=>{le.target.classList.contains("acker-name")||(lt(b._key),Gt({typ:"acker",id:b.id,name:b.name,area:b.result?.areaM2||0,fieldRef:b}))}),M.querySelector(".acker-name").addEventListener("input",le=>{b.name=le.target.value,E(b)}),M.querySelectorAll("[data-k]").forEach(le=>{const ct=le.dataset.k;if(ct==="kultur"){le.addEventListener("input",et=>{b.kultur=et.target.value||null,b.eppoCode=Qt.find(tt=>tt.kultur===b.kultur)?.eppoCode||null,De(b),E(b)});return}if(ct==="standortId"){le.addEventListener("input",et=>{b.standortId=et.target.value||null,E(b)});return}le.addEventListener("input",et=>{if(ct==="angle"?b.params.angle=+et.target.value:b.params[ct]=parseFloat(et.target.value)||0,b.result=z(b.latlngs,b.params),De(b),ke(M,b),ct==="angle"){const tt=M.querySelector(".acker-angle-head b");tt&&(tt.textContent=b.params.angle+"°")}E(b)})}),M.querySelector('[data-act="align"]')?.addEventListener("click",()=>la(b)),M.querySelector('[data-act="calib"]')?.addEventListener("click",()=>{const le=Math.round(Number(M.querySelector("[data-calib]")?.value)||0);le>=1?fe(b,le):N.warning("Bitte die echte Beetzahl eingeben.")}),M.querySelector('[data-act="del"]').addEventListener("click",()=>Pa(b._key)),M.querySelector('[data-act="zoom"]').addEventListener("click",()=>ia(b)),M.querySelector('[data-act="dup"]').addEventListener("click",()=>P(b)),M.querySelector('[data-act="rot"]').addEventListener("click",()=>Aa(b,15)),M.querySelector('[data-act="pdf"]').addEventListener("click",()=>w(b));const ie=M.querySelector('[data-act="color"]');ie.addEventListener("input",le=>dn(b,le.target.value)),ie.addEventListener("change",le=>x(b,le.target.value)),H.appendChild(M)}),F.querySelector('[data-t="area"]').textContent=V(i)+" m² · "+V(i/1e4,3)+" ha",F.querySelector('[data-t="beds"]').textContent=V(c),F.querySelector('[data-t="meters"]').textContent=V(g)+" m",F.querySelector('[data-t="plants"]').textContent=V(S)}function lt(i){n=i,a.forEach(c=>De(c)),Ye(),setTimeout(()=>{const c=H?.querySelector(".acker-field.sel");c&&c.scrollIntoView({behavior:"smooth",block:"nearest"})},20)}async function Pa(i){const c=a.find(S=>S._key===i);if(!c)return;xe(c);const g=a.findIndex(S=>S._key===i);if(g>=0&&a.splice(g,1),n===i&&(n=null),Ye(),c.id&&ce()==="sqlite")try{await bl({id:c.id}),await it().catch(()=>{})}catch{}}let Be=null;function un(i,c){Ut||i._key!==n||(Be={fl:i,lastLL:c.latlng,moved:!1},O.dragging.disable(),O.getContainer().style.cursor="grabbing",X.DomEvent.stop(c))}function dr(i){if(!Be)return;const c=Be.fl;if(!Be.moved){c.bedsLayer&&(O.removeLayer(c.bedsLayer),c.bedsLayer=null);try{c.outline.setStyle({fillOpacity:.3,dashArray:"6 5"})}catch{}}const g=i.latlng.lat-Be.lastLL.lat,S=i.latlng.lng-Be.lastLL.lng;Be.lastLL=i.latlng,Be.moved=!0,c.latlngs=c.latlngs.map(b=>[b[0]+g,b[1]+S]);try{c.outline.setLatLngs(c.latlngs)}catch{}if((c.handles||[]).forEach((b,D)=>{try{b.setLatLng(c.latlngs[D])}catch{}}),c.label)try{c.label.setLatLng(c.outline.getBounds().getCenter())}catch{}}function pn(){if(!Be)return;const i=Be.fl,c=Be.moved;Be=null,O.dragging.enable(),O.getContainer().style.cursor="",c&&ot(i)}function Ma(i){if(me.length<3)return!1;const c=O.latLngToContainerPoint(X.latLng(me[0][0],me[0][1])),g=O.latLngToContainerPoint(i);return c.distanceTo(g)<=14}function Mt(i){const c=C('[data-role="acker-draw-stats"]');if(!c)return;const g=fu(i);c.textContent=`${me.length} Punkt${me.length===1?"":"e"}`+(g>0?` · ~${V(g)} m²`:"")}let Ut=!1,me=[],Xe=null,bt=[],Ca=0,fn=0,Oe=null;function mn(){return Oe||(Oe=document.createElement("div"),Oe.className="acker-draw-cur",Oe.innerHTML='<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19" cy="19" r="9" stroke="#22c55e" stroke-width="2.5"/><line x1="19" y1="2" x2="19" y2="9" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round"/><line x1="19" y1="29" x2="19" y2="36" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round"/><line x1="2" y1="19" x2="9" y2="19" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round"/><line x1="29" y1="19" x2="36" y2="19" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round"/><circle cx="19" cy="19" r="2.5" fill="#22c55e"/></svg>',document.body.appendChild(Oe)),Oe}function gn(i){const c=mn();c.style.left=i.clientX+"px",c.style.top=i.clientY+"px",c.style.opacity="1"}function Ct(){Oe&&(Oe.style.opacity="0")}function ur(){Xe&&(O.removeLayer(Xe),Xe=null),bt.forEach(i=>O.removeLayer(i)),bt=[],me=[]}function ht(i){Ut=i,C('[data-role="acker-banner"]').style.display=i?"block":"none",C('[data-role="acker-draw"]').style.display=i?"none":"block";const c=O.getContainer();if(i){fn=Date.now()+250,c.style.cursor="none";const g=mn();g.style.opacity="0",c.addEventListener("mousemove",gn),c.addEventListener("mouseleave",Ct),O.on("mousemove",vi)}else c.style.cursor="",Oe&&(Oe.style.opacity="0"),c.removeEventListener("mousemove",gn),c.removeEventListener("mouseleave",Ct),O.off("mousemove",vi),ur()}function Vt(i){const c=i?[...me,[i.lat,i.lng]]:me;if(c.length<2){Xe&&(O.removeLayer(Xe),Xe=null);return}Xe?Xe.setLatLngs(c):Xe=X.polygon(c,{interactive:!1,className:"acker-draw-preview",color:"#22c55e",weight:2.5,fillColor:"#22c55e",fillOpacity:.18,dashArray:"6 5"}).addTo(O)}function pr(i,c){const g=X.circleMarker(i,{radius:c?7:5,color:"#fff",fillColor:c?"#16a34a":"#22c55e",fillOpacity:1,weight:2,interactive:c,bubblingMouseEvents:!1}).addTo(O);c&&(g.bindTooltip("Zum Schließen anklicken",{direction:"top"}),g.on("click",S=>{X.DomEvent.stop(S),me.length>=3&&bn()})),bt.push(g)}function hi(i){if(!Ut){Ae();return}if(!(Date.now()<fn)){if(Ma(i.latlng)){bn();return}me.push([i.latlng.lat,i.latlng.lng]),pr(i.latlng,me.length===1),Vt(),Mt(me)}}function vi(i){if(!Ut||!me.length)return;const c=Ma(i.latlng);if(Vt(c?void 0:i.latlng),bt[0])try{bt[0].setRadius(c?10:7),bt[0].setStyle({weight:c?3:2})}catch{}Mt(c?me:[...me,[i.latlng.lat,i.latlng.lng]])}function yi(){if(!me.length)return;me.pop();const i=bt.pop();i&&O.removeLayer(i),Vt(),Mt(me)}function bn(){if(me.length<3){N.warning("Mindestens 3 Punkte setzen.");return}const i={_key:"new-"+ ++Ca,id:null,name:"Fläche "+(a.length+1),kultur:null,eppoCode:null,standortId:null,color:It[a.length%It.length],latlngs:me.map(c=>c.slice()),params:{...uu(),angle:oa(me)},outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(i),ht(!1),n=i._key,ot(i),E(i,!0)}async function ki(){const i=C('[data-role="acker-q"]').value.trim();if(i)try{const g=await(await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+encodeURIComponent(i))).json();g[0]?O.setView([+g[0].lat,+g[0].lon],18):N.info("Nichts gefunden.")}catch{N.warning("Suche nicht verfügbar.")}}async function Co(){if(zn){setTimeout(()=>O&&O.invalidateSize(),60);return}zn=!0;try{const[D]=await Promise.all([Dt(()=>import("./leaflet-src.BcflbDBd.js").then(M=>M.l),__vite__mapDeps([3,4])).then(async M=>(await Dt(()=>Promise.resolve({}),__vite__mapDeps([5])),M)),tu()]);X=D.default||D}catch(D){console.warn("[Acker] Karten-Bibliotheken konnten nicht geladen werden:",D),Z&&(Z.textContent="Karte konnte nicht geladen werden (offline?)."),zn=!1;return}O=X.map(ae,{doubleClickZoom:!1,zoomControl:!0,attributionControl:!0}).setView([47.818,8.976],17);const i=X.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:21,maxNativeZoom:19,attribution:"Tiles © Esri"}).addTo(O),c=X.tileLayer.wms("https://owsproxy.lgl-bw.de/owsproxy/ows/WMS_LGL-BW_ATKIS_DOP_20_C",{layers:"IMAGES_DOP_20_RGB",format:"image/jpeg",transparent:!1,maxZoom:21,maxNativeZoom:20,attribution:"Luftbild © LGL-BW (dl-de/by-2-0)"}),g=X.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"});l={sat:i,dop:c,osm:g},s=X.layerGroup(),I(),s.addTo(O),o=X.layerGroup().addTo(O);const S=O.createPane("edgeLabels");S.style.zIndex="650",S.style.pointerEvents="none";const b=X.DomUtil.create("div","acker-info");b.setAttribute("data-role","acker-info"),b.style.display="none",O.getContainer().appendChild(b),X.DomEvent.disableClickPropagation(b),X.DomEvent.disableScrollPropagation(b),O.on("click",hi),O.on("contextmenu",D=>{if(Ut){X.DomEvent.preventDefault?.(D.originalEvent||D),yi();return}te(D)}),O.on("mousemove",dr),O.on("mouseup",pn),document.addEventListener("mouseup",pn),O.on("zoomend",or),C('[data-role="acker-draw"]').addEventListener("click",()=>ht(!0)),C('[data-role="acker-export"]')?.addEventListener("click",y),C('[data-role="acker-export-pdf"]')?.addEventListener("click",$),C('[data-role="acker-finish"]').addEventListener("click",bn),C('[data-role="acker-cancel"]').addEventListener("click",()=>ht(!1)),C('[data-role="acker-go"]').addEventListener("click",ki),C('[data-role="acker-q"]').addEventListener("keydown",D=>{D.key==="Enter"&&ki()}),C('[data-role="ctrl-fit"]')?.addEventListener("click",Da),C('[data-role="ctrl-labels"]')?.addEventListener("click",()=>{d=!d,C('[data-role="ctrl-labels"]')?.classList.toggle("on",d),La()}),C('[data-role="ctrl-beds"]')?.addEventListener("click",()=>{p=!p,C('[data-role="ctrl-beds"]')?.classList.toggle("on",p),La()}),C('[data-role="ctrl-basemap"]')?.addEventListener("click",Q),document.addEventListener("keydown",D=>{Ut&&(D.key==="Backspace"&&(D.preventDefault(),yi()),D.key==="Enter"&&bn(),D.key==="Escape"&&ht(!1))}),await Io(),await wi(),await Bo(),setTimeout(()=>O.invalidateSize(),60)}async function Io(){if(ce()==="sqlite")try{Qt=(await Jr())?.rows||[]}catch{Qt=[]}}async function wi(){if(ce()!=="sqlite"){u=[],m=[];return}try{u=(await $r())?.rows||[]}catch{u=[]}try{m=(await Pn())?.rows||[]}catch{m=[]}}async function Bo(){if(ce()==="sqlite")try{const i=await Yr();for(const g of i?.rows||[]){const S={_key:"db-"+g.id,id:g.id,name:g.name,kultur:g.kultur,eppoCode:g.eppoCode,standortId:g.standortId,color:g.color||It[a.length%It.length],latlngs:g.latlngs||[],params:{bedW:g.bedW??1.2,pathW:g.pathW??.4,rowSp:g.rowSp??.5,inRowSp:g.inRowSp??.4,angle:g.angle??0},outline:null,bedsLayer:null,handles:[],edgeLabels:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};S.result=await z(S.latlngs,S.params),a.push(S),De(S)}Ye();const c=a.find(g=>g.latlngs?.length);if(c&&O)try{O.fitBounds(X.polygon(c.latlngs).getBounds(),{maxZoom:19,padding:[30,30]})}catch{}}catch(i){console.warn("[Acker] Flächen laden fehlgeschlagen:",i)}}t.state.subscribe(i=>{if(i?.app?.activeSection==="acker"){if(!zn){Co();return}(async()=>(await wi(),La(),Ye(),setTimeout(()=>O&&O.invalidateSize(),60)))()}}),Ye()}function gu(){return`
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
    .acker-res .sep{height:1px;background:var(--ap-line,#e5e7eb);margin:5px 0}
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
    .acker-draw-cur{position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:opacity .1s;will-change:left,top;filter:drop-shadow(0 1px 3px rgba(0,0,0,.35))}
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
            <button data-role="ctrl-basemap" title="Kartentyp (Satellit / Luftbild BW / OSM)"><i class="bi bi-layers"></i></button>
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
            <button class="btn btn-sm btn-psm-secondary-outline" data-role="acker-export-pdf" style="width:100%;margin-bottom:6px">
              <i class="bi bi-file-earmark-pdf me-1"></i>Alle Flächen als PDF
            </button>
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
  </section>`}function _a(e){return e.typ+":"+e.id}function bu(e){if(!Array.isArray(e)||e.length<3)return null;let t=0,a=0,n=0;const r=e.length,s=e[r-1],o=e[0],d=s&&o&&Number(s[0])===Number(o[0])&&Number(s[1])===Number(o[1])?r-1:r;for(let p=0;p<d;p++){const u=Number(e[p]?.[0]),m=Number(e[p]?.[1]);Number.isFinite(u)&&Number.isFinite(m)&&(t+=u,a+=m,n++)}return n?{lat:t/n,lon:a/n}:null}async function Ss(e){const t=[];(Ue(e.state.getState().gps?.points)||[]).forEach(n=>{if(n?.kind!=="gewaechshaus")return;const r=Number(n.latitude),s=Number(n.longitude),o=Number(n.nutzflaecheQm);t.push({typ:"haus",id:String(n.id),name:n.name||"Gewächshaus",areaQm:Number.isFinite(o)&&o>0?o:null,lat:Number.isFinite(r)?r:null,lon:Number.isFinite(s)?s:null,color:null})});try{((await Yr())?.rows||[]).forEach(r=>{const s=bu(r.latlngs),o=Number(r.areaQm);t.push({typ:"acker",id:String(r.id),name:r.name||"Fläche",areaQm:Number.isFinite(o)&&o>0?o:null,lat:s?.lat??null,lon:s?.lon??null,color:r.color||null})})}catch{}return t}const hu="Wetterdaten: Open-Meteo (CC BY 4.0)",vu="psm.weather.";function yu(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function ku(e,t){return vu+e.toFixed(3)+"_"+t.toFixed(3)}function wu(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch{return null}}function xu(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Su(e){return!!e&&e.slice(0,10)===yu()}function Eu(e,t,a){const n=e?.time||[],r=e?.temperature_2m_max||[],s=e?.temperature_2m_min||[],o=e?.precipitation_sum||[],l=e?.sunshine_duration||[],d=Wn(new Date),p=Ai(d.year,d.week),u=new Map;for(let h=0;h<n.length;h++){const k=qs(n[h]);if(!k)continue;const{year:f,week:y}=Wn(k),w=Ai(f,y);let $=u.get(w);$||($={key:w,year:f,week:y,tmaxSum:0,tmaxN:0,tminSum:0,tminN:0,precip:0,precipN:0,sun:0,sunN:0,days:0},u.set(w,$)),Number.isFinite(r[h])&&($.tmaxSum+=r[h],$.tmaxN++),Number.isFinite(s[h])&&($.tminSum+=s[h],$.tminN++),Number.isFinite(o[h])&&($.precip+=o[h],$.precipN++),Number.isFinite(l[h])&&($.sun+=l[h],$.sunN++),$.days++}const m=[...u.values()].sort((h,k)=>h.key<k.key?-1:h.key>k.key?1:0).map(h=>{const k=h.tmaxN?h.tmaxSum/h.tmaxN:null,f=h.tminN?h.tminSum/h.tminN:null;return{weekKey:h.key,year:h.year,week:h.week,tMaxAvg:k,tMinAvg:f,tMeanAvg:k!=null&&f!=null?(k+f)/2:k,precipSum:h.precipN?h.precip:null,sunHours:h.sunN?h.sun/3600:null,days:h.days,isForecast:h.key>=p}});return{lat:t,lon:a,fetchedAt:new Date().toISOString(),weeks:m}}async function Lu(e,t){if(!Number.isFinite(e)||!Number.isFinite(t))return{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const a=ku(e,t),n=wu(a);if(n&&Su(n.fetchedAt)&&n.weeks?.length)return n;if(typeof navigator<"u"&&navigator.onLine===!1)return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const r="https://api.open-meteo.com/v1/forecast?latitude="+e.toFixed(4)+"&longitude="+t.toFixed(4)+"&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunshine_duration&timezone=Europe%2FBerlin&past_days=92&forecast_days=16";try{const s=await fetch(r);if(!s.ok)throw new Error("HTTP "+s.status);const o=await s.json(),l=Eu(o.daily,e,t);return l.weeks.length&&xu(a,l),l}catch{return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]}}}const Lr=66;function Du(e,t){const{units:a,anbau:n,mass:r,onSelect:s,onContext:o}=t;if(!a||!a.length){e.innerHTML='<div class="km-empty"><i class="bi bi-calendar3"></i><p>Noch keine Flächen für den Anbauplan.</p></div>';return}const l=new Date;let d=new Date(l.getFullYear(),l.getMonth()-1,1),p=new Date(l.getFullYear(),l.getMonth()+4,1);const u=F=>{if(!F)return;const ae=new Date(String(F).slice(0,10)+"T00:00:00");isNaN(ae.getTime())||(ae<d&&(d=new Date(ae.getFullYear(),ae.getMonth(),1)),ae>p&&(p=new Date(ae.getFullYear(),ae.getMonth(),1)))};(n||[]).forEach(F=>{u(F.pflanzDatum),u(F.ernteBis||F.ernteDatum),u(F.ernteVon)}),(r||[]).forEach(F=>u(F.planDatum||F.erledigtDatum));const m=wo(d,p),h=m.length,k=h*Lr,f=F=>F==null?null:(F*100).toFixed(2)+"%",y=je(m,l.toISOString()),w=a.filter(F=>F.typ==="haus"),$=a.filter(F=>F.typ==="acker");let I="";m.forEach((F,ae)=>{const R=F.y===l.getFullYear()&&F.m===l.getMonth();I+=`<div class="kb2-mo${R?" cur":""}" style="width:${Lr}px">${ko[F.m]}${F.m===0?" "+String(F.y).slice(2):""}</div>`});const C=F=>{const ae=(n||[]).filter(z=>z.flaecheTyp===F.typ&&String(z.flaecheId)===String(F.id)),R=(r||[]).filter(z=>z.flaecheTyp===F.typ&&String(z.flaecheId)===String(F.id));let E="";return ae.forEach((z,Y)=>{const re=je(m,z.pflanzDatum);let de=je(m,z.ernteBis||z.ernteDatum||z.pflanzDatum);if(re==null)return;(de==null||de<=re)&&(de=Math.min(1,re+.5/h));const xe=ka(z,Y),De=z.status==="geplant";E+=`<div class="kb2-bar${De?" planned":""}" title="${v(z.kultur||"Kultur")}" style="left:${f(re)};width:${((de-re)*100).toFixed(2)}%;--cc:${v(xe)}"><span>${v(z.kultur||"")}</span></div>`;const Je=je(m,z.ernteVon),Te=je(m,z.ernteBis);Je!=null&&Te!=null&&Te>Je&&(E+=`<div class="kb2-harvest" title="Ernte" style="left:${f(Je)};width:${((Te-Je)*100).toFixed(2)}%;--cc:${v(xe)}"></div>`)}),R.forEach(z=>{const Y=z.status==="erledigt"?z.erledigtDatum||z.planDatum:z.planDatum||z.erledigtDatum,re=je(m,Y);if(re==null)return;const de=vo(z.art),xe=z.status==="erledigt";E+=`<span class="kb2-mk${xe?" done":""}" title="${v(de.label+(z.notes?": "+z.notes:""))}" style="left:${f(re)};--mc:${de.color}"></span>`}),y!=null&&(E+=`<div class="kb2-today" style="left:${f(y)}"></div>`),E},H=F=>{const ae=F.typ+":"+F.id,R=(n||[]).filter(Y=>Y.flaecheTyp===F.typ&&String(Y.flaecheId)===String(F.id)),E=R.find(Y=>Y.status==="aktiv")||R.find(Y=>Y.status!=="abgeschlossen"),z=E?v(E.kultur||""):"frei";return`<div class="kb2-row" data-ukey="${ae}">
      <div class="kb2-label" title="${v(F.name)}"><b>${v(F.name)}</b><small>${z}</small></div>
      <div class="kb2-track" style="width:${k}px">${C(F)}</div>
    </div>`},Z=(F,ae)=>ae.length?`<div class="kb2-grp"><div class="kb2-grp-l">${v(F)}</div><div class="kb2-grp-t" style="width:${k}px"></div></div>`+ae.map(H).join(""):"";e.innerHTML=`
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
      ${Z("Gewächshäuser",w)}
      ${Z("Freiland",$)}
    </div>
    <div class="kb2-legend">
      <span class="lg"><span class="d" style="background:var(--ap-ink-2)"></span>erledigt</span>
      <span class="lg"><span class="d" style="background:var(--ap-surface);box-shadow:inset 0 0 0 2px var(--ap-ink-2)"></span>geplant</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:var(--ap-green-bright);display:inline-block"></span>Kultur</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:repeating-linear-gradient(45deg,var(--ap-line-2),var(--ap-line-2) 2px,transparent 2px,transparent 4px);display:inline-block"></span>Ernte-Zeitraum</span>
      <span class="kb2-hint"><i class="bi bi-mouse2"></i> Klick = öffnen · Rechtsklick = planen</span>
    </div>`,e.querySelectorAll(".kb2-row").forEach(F=>{const ae=F.dataset.ukey;F.querySelector(".kb2-label")?.addEventListener("click",()=>s&&s(ae)),F.addEventListener("contextmenu",R=>{R.preventDefault(),o&&o(ae,R.clientX,R.clientY)})})}const $u=[{art:"bewaesserung",label:"Gießen",icon:"bi-droplet"},{art:"mechanisch",label:"Hacken",icon:"bi-tools"},{art:"duengung",label:"Düngen",icon:"bi-flower1"},{art:"nuetzlinge",label:"Nützlinge",icon:"bi-bug"},{art:"chemisch_psm",label:"Pflanzenschutz",icon:"bi-droplet-half"},{art:"monitoring",label:"Kontrolle",icon:"bi-eye"},{art:"sonstiges",label:"Sonstiges",icon:"bi-three-dots"}],zu=["Jan.","Feb.","März","Apr.","Mai","Juni","Juli","Aug.","Sep.","Okt.","Nov.","Dez."];function Au(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Pu();let a=[],n=[],r=[],s=[],o=[],l=null,d="plan",p=!1,u=!1;const m={};let h=null;const k=x=>e.querySelector(x),f=()=>k('[data-role="list"]'),y=()=>k('[data-role="detail"]'),w=()=>k('[data-role="kpis"]'),$=()=>k('[data-role="board-view"]'),I=()=>k('[data-role="flaechen-view"]'),C=()=>ce()==="sqlite",H=()=>{C()&&it().catch(()=>{})},Z=(x,L)=>x.filter(W=>W.flaecheTyp===L.typ&&String(W.flaecheId)===String(L.id)),F=x=>a.find(L=>_a(L)===x)||null,ae=(x,L=0)=>yo(x.color)||Yt[L%Yt.length];async function R(){if(a=await Ss(t),C()){try{n=(await $r())?.rows||[]}catch{n=[]}try{r=(await Pn())?.rows||[]}catch{r=[]}try{s=(await Jr())?.rows||[]}catch{s=[]}try{o=(await vl())?.rows||[]}catch{o=[]}if(!u){u=!0;try{const x=await Pi();x?.imported&&(r=(await Pn())?.rows||[],N.info(`${x.imported} Pflanzenschutz-Eintrag(e) übernommen.`),H())}catch{}}}!l&&a.length&&(l=_a(a[0])),Y(),z()}async function E(){if(C()){try{n=(await $r())?.rows||[]}catch{}try{r=(await Pn())?.rows||[]}catch{}}}async function z(){const x=l?F(l):null;if(!x||x.lat==null||x.lon==null)return;const L=_a(x);if(!m[L]){m[L]={loading:!0,weeks:[]};try{m[L]=await Lu(x.lat,x.lon)}catch{m[L]={weeks:[]}}l===L&&Te()}}function Y(){de(),d==="plan"?(I().style.display="none",$().style.display="block",Du($(),{units:a,anbau:n,mass:r,onSelect:x=>{l=x,re("flaechen"),z()},onContext:(x,L,W)=>za(x,L,W)})):($().style.display="none",I().style.display="grid",De(),Te()),e.querySelectorAll(".km-modebtn").forEach(x=>x.classList.toggle("active",x.dataset.mode===d))}function re(x){d=x,Y()}function de(){const x=w();if(!x)return;a.filter(P=>P.typ==="haus").length,a.filter(P=>P.typ==="acker").length;let L=0,W=null;a.forEach(P=>{const{current:B,next:T}=fa(Z(n,P));B&&L++,T?.pflanzDatum&&(!W||Ee(T.pflanzDatum)<Ee(W.pflanzDatum))&&(W=T)});const _=r.filter(P=>P.status==="geplant").length;x.innerHTML=`
      ${xe(String(a.length),"Flächen")}
      ${xe(String(L),"Kulturen aktiv")}
      ${xe(String(_),"Aufgaben offen")}
      ${xe(W?Ia(Wt(W.pflanzDatum)):"–","Nächste Pflanzung")}
      <button class="km-psm" data-role="psm-import" title="Bestehende Pflanzenschutz-Einträge übernehmen"><i class="bi bi-arrow-down-circle"></i><span>PSM übernehmen</span></button>`,x.querySelector('[data-role="psm-import"]')?.addEventListener("click",ot)}const xe=(x,L)=>`<div class="km-kpi"><div class="km-kpi-v">${x}</div><div class="km-kpi-l">${v(L)}</div></div>`;function De(){const x=f();if(!x)return;if(!a.length){x.innerHTML='<div class="km-empty"><i class="bi bi-geo-alt"></i><p>Noch keine Flächen.<br>Gewächshäuser unter Einstellungen, Freiland im Reiter „Karte".</p></div>';return}const L=a.filter(P=>P.typ==="haus"),W=a.filter(P=>P.typ==="acker"),_=(P,B)=>B.length?`<div class="km-grp">${v(P)}</div>`+B.map(Je).join(""):"";x.innerHTML=_("Gewächshäuser",L)+_("Freiland",W),x.querySelectorAll("[data-ukey]").forEach(P=>{P.addEventListener("click",()=>{l=P.dataset.ukey,De(),Te(),z()}),P.addEventListener("contextmenu",B=>{B.preventDefault(),za(P.dataset.ukey,B.clientX,B.clientY)})})}function Je(x,L){const W=_a(x),{current:_}=fa(Z(n,x));return`<div class="km-row${W===l?" sel":""}" data-ukey="${W}">
      <span class="km-dot" style="background:${v(_?ka(_):ae(x,L))}"></span>
      <div class="km-row-main"><div class="km-row-name">${v(x.name)}</div>
      <div class="km-row-sub">${_?`<span class="crop">${v(_.kultur||"Kultur")}</span>`:'<span class="free">frei</span>'}</div></div>
    </div>`}function Te(){const x=y();if(!x)return;const L=l?F(l):null;if(!L){x.innerHTML='<div class="km-empty"><i class="bi bi-hand-index"></i><p>Fläche links wählen.</p></div>';return}const W=Z(n,L),_=Z(r,L),{current:P,next:B}=fa(W),T=m[_a(L)],ue=L.typ==="haus"?"Gewächshaus":"Freiland",be=L.areaQm?`${Math.round(L.areaQm).toLocaleString("de-DE")} m²`:"";let pe;if(P){const Q=P.pflanzDatum?`seit ${ra(P.pflanzDatum)} · ${Ia(Wt(P.pflanzDatum))}`:"",te=or(P);pe=`<div class="km-hero active" style="--cc:${v(ka(P))}">
        <div class="km-hero-ic"><i class="bi bi-flower2"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop">${v(P.kultur||"Kultur")}</div><div class="km-hero-sub">${v(Q+te+dn(P))}</div></div>
        <button class="km-hero-edit" data-edit-crop="current" title="Bearbeiten"><i class="bi bi-pencil"></i></button>
      </div>`}else pe=`<div class="km-hero empty">
        <div class="km-hero-ic gray"><i class="bi bi-circle"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop gray">Fläche ist frei</div><div class="km-hero-sub">Noch keine Kultur eingetragen</div></div>
        <button class="km-hero-add" data-edit-crop="current"><i class="bi bi-plus-lg"></i> Kultur setzen</button>
      </div>`;const ee=B?`<div class="km-next"><i class="bi bi-arrow-right-short"></i>Danach geplant: <b>${v(B.kultur||"Kultur")}</b> · ab ${Ia(Wt(B.pflanzDatum))} <button class="km-next-edit" data-edit-crop="next" title="Bearbeiten"><i class="bi bi-pencil"></i></button></div>`:P?'<button class="km-next-add" data-edit-crop="next"><i class="bi bi-plus"></i> Nächste Kultur planen</button>':"";x.innerHTML=`
      <div class="km-head"><div class="km-head-l"><span class="km-head-name">${v(L.name)}</span><span class="km-head-badge">${ue}${be?" · "+be:""}</span></div>
        <button class="km-headbtn" data-act="map"><i class="bi bi-map"></i> Auf Karte</button></div>
      ${pe}
      ${ee}
      ${ia(W,_)}
      <div class="km-tasks-head"><span>Aufgaben</span><button class="km-addtask" data-act="add-massnahme"><i class="bi bi-plus-lg"></i> Aufgabe</button></div>
      ${gt(_)}
      <div class="km-foot">
        <span class="km-weather">${La(T)}</span>
        <button class="km-plan" data-act="plan"><i class="bi bi-calendar3"></i> Saison &amp; Plan</button>
      </div>
      <div class="km-attr">${v(hu)}${T?.stale?" · offline":""}</div>`,x.querySelector('[data-act="map"]')?.addEventListener("click",()=>Da()),x.querySelector('[data-act="plan"]')?.addEventListener("click",()=>re("plan")),x.querySelector('[data-act="add-massnahme"]')?.addEventListener("click",()=>la(L,null,P)),x.querySelectorAll("[data-edit-crop]").forEach(Q=>Q.addEventListener("click",()=>{const te=Q.dataset.editCrop;oa(L,te==="current"?P:B,te,W.length)})),x.querySelectorAll("[data-m-done]").forEach(Q=>Q.addEventListener("click",te=>{te.stopPropagation(),lr(Q.dataset.mDone)})),x.querySelectorAll("[data-m-del]").forEach(Q=>Q.addEventListener("click",te=>{te.stopPropagation(),Ie(Q.dataset.mDel)})),x.querySelectorAll("[data-m-edit]").forEach(Q=>Q.addEventListener("click",()=>{const te=r.find(he=>he.id===Q.dataset.mEdit);la(L,te,P)}))}function gt(x){const L=x.filter(T=>T.status==="geplant").sort((T,ue)=>(Ee(T.planDatum)||9e15)-(Ee(ue.planDatum)||9e15)),W=x.filter(T=>T.status==="erledigt").sort((T,ue)=>(Ee(ue.erledigtDatum)||0)-(Ee(T.erledigtDatum)||0)).slice(0,6),_=Number(dt().replace(/-/g,"")),P=(T,ue)=>{const be=vo(T.art),pe=ue?T.erledigtDatum:T.planDatum,ee=!ue&&pe&&Ee(pe)<_,Q=ue?ra(pe):Kt(pe,ee),te=T.notes||be.label,he=T.historyId?'<span class="km-pill">PSM</span>':"",Se=[];T.notes&&Se.push(v(be.label)),T.mittel&&Se.push(v(T.mittel)),T.menge!=null&&Se.push(`${T.menge}${T.einheit?" "+v(T.einheit):""}`);const Ke=Se.join(" · ");return`<div class="km-task${ue?" done":""}" data-m-edit="${T.id}">
        <span class="km-task-ic" style="--mc:${be.color}"><i class="bi ${be.icon}"></i></span>
        <div class="km-task-main"><div class="km-task-title">${v(te)}${he}</div>${Ke?`<div class="km-task-sub">${Ke}</div>`:""}</div>
        <span class="km-task-when${ee?" overdue":""}">${Q}</span>
        ${ue?`<button class="km-tbtn del" data-m-del="${T.id}" title="Löschen"><i class="bi bi-trash"></i></button>`:`<button class="km-check" data-m-done="${T.id}" title="Erledigt"><i class="bi bi-check-lg"></i></button>`}
      </div>`};let B="";return L.length?B+=L.map(T=>P(T,!1)).join(""):B+='<div class="km-tasks-none"><i class="bi bi-check2-circle"></i> Nichts offen</div>',W.length&&(B+='<div class="km-done-h">Erledigt</div>'+W.map(T=>P(T,!0)).join("")),`<div class="km-tasks">${B}</div>`}function Wt(x){const L=new Date(String(x).slice(0,10)+"T00:00:00");return isNaN(L.getTime())?0:Wn(L).week}function ra(x){const L=new Date(String(x).slice(0,10)+"T00:00:00");return isNaN(L.getTime())?"":`${L.getDate()}. ${zu[L.getMonth()]}`}function Kt(x,L){if(!x)return"offen";const W=new Date(String(x).slice(0,10)+"T00:00:00");if(isNaN(W.getTime()))return"offen";const _=new Date;_.setHours(0,0,0,0);const P=Math.round((W.getTime()-_.getTime())/864e5);return P===0?"heute":P===1?"morgen":L?"überfällig":ra(x)}function La(x){if(!x||!x.weeks?.length)return x?.loading?"Wetter lädt…":"";const{year:L,week:W}=Wn(new Date),_=x.weeks.find(T=>T.year===L&&T.week===W)||x.weeks.find(T=>!T.isForecast);if(!_)return"";const P=_.tMaxAvg!=null?Math.round(_.tMaxAvg)+"°":"–",B=_.precipSum!=null?Math.round(_.precipSum)+" mm":"–";return`<i class="bi bi-cloud-sun"></i> Diese Woche: ${P} · ${B} Regen`}function or(x){const L=x.ernteVon?Ia(Wt(x.ernteVon)):null,W=x.ernteBis||x.ernteDatum,_=W?Ia(Wt(W)):null;return L&&_?` · Ernte ${L}–${_}`:_?` · Ernte ~${_}`:L?` · Ernte ab ${L}`:""}function dn(x){return!x||x.menge==null||x.menge===""?"":` · ${x.menge} ${x.einheit||"Pflanzen"}`}function ia(x,L){if(!x.length&&!L.length)return"";const W=new Date;let _=new Date(W.getFullYear(),W.getMonth()-1,1),P=new Date(W.getFullYear(),W.getMonth()+4,1);const B=q=>{if(!q)return;const fe=new Date(String(q).slice(0,10)+"T00:00:00");isNaN(fe.getTime())||(fe<_&&(_=new Date(fe.getFullYear(),fe.getMonth(),1)),fe>P&&(P=new Date(fe.getFullYear(),fe.getMonth(),1)))};x.forEach(q=>{B(q.pflanzDatum),B(q.ernteBis||q.ernteDatum),B(q.ernteVon)}),L.forEach(q=>B(q.planDatum||q.erledigtDatum));const T=wo(_,P),ue=T.length,be=`background-size:${(100/ue).toFixed(4)}% 100%`,pe=q=>q==null?null:(q*100).toFixed(2)+"%",ee=je(T,W.toISOString()),Q=ee!=null?`<div class="ks-today" style="left:${pe(ee)}"></div>`:"",te=T.map(q=>`<div class="ks-mo${q.y===W.getFullYear()&&q.m===W.getMonth()?" cur":""}">${ko[q.m]}</div>`).join("");let he="";x.forEach((q,fe)=>{const ze=je(T,q.pflanzDatum);let ke=je(T,q.ernteBis||q.ernteDatum||q.pflanzDatum);if(ze==null)return;(ke==null||ke<=ze)&&(ke=Math.min(1,ze+.5/ue));const Pt=ka(q,fe);he+=`<div class="ks-bar${q.status==="geplant"?" planned":""}" style="left:${pe(ze)};width:${((ke-ze)*100).toFixed(2)}%;--cc:${v(Pt)}"><span>${v(q.kultur||"")}</span></div>`;const j=je(T,q.ernteVon),se=je(T,q.ernteBis);j!=null&&se!=null&&se>j&&(he+=`<div class="ks-harvest" style="left:${pe(j)};width:${((se-j)*100).toFixed(2)}%"></div>`)});const Se={};L.forEach(q=>{(Se[q.art]=Se[q.art]||[]).push(q)});const Ke=Ud.filter(q=>Se[q]).map(q=>{const fe=Yn[q],ze=Se[q].map(ke=>{const Pt=ke.status==="erledigt"?ke.erledigtDatum||ke.planDatum:ke.planDatum||ke.erledigtDatum,j=je(T,Pt);return j==null?"":`<span class="ks-mk${ke.status==="erledigt"?" done":""}" title="${v(fe.label+(ke.notes?": "+ke.notes:""))}" style="left:${pe(j)};--mc:${fe.color}"></span>`}).join("");return`<div class="ks-row"><div class="ks-rl">${v(fe.label)}</div><div class="ks-track" style="${be}">${ze}${Q}</div></div>`}).join("");return`<div class="ks-wrap">
      <div class="ks-head"><div class="ks-rl"></div><div class="ks-axis">${te}</div></div>
      <div class="ks-row"><div class="ks-rl">Kultur</div><div class="ks-track" style="${be}">${he}${Q}</div></div>
      ${Ke}
      <div class="ks-legend"><span><span class="ks-d done"></span>erledigt</span><span><span class="ks-d"></span>geplant</span><span style="margin-left:auto"><span class="ks-hbar"></span>Ernte-Zeitraum</span></div>
    </div>`}function Da(x){Qe("app",L=>({...L,activeSection:"acker"})),N.info("Karte geöffnet.")}async function ot(){if(!C()){N.warning("Keine Datenbank aktiv.");return}try{const x=await Pi();await E(),Y(),x?.imported?(N.success(`${x.imported} übernommen.`),H()):N.info(`Nichts Neues${x?.skipped?` (${x.skipped} nicht zuordenbar)`:""}.`)}catch{N.error("Übernahme fehlgeschlagen.")}}async function lr(x){const L=r.find(W=>W.id===x);if(L)try{await Ci({...L,status:"erledigt",erledigtDatum:L.erledigtDatum||dt()}),await E(),Y(),H()}catch{N.error("Speichern fehlgeschlagen.")}}async function Ie(x){try{await Mi({id:x}),await E(),Y(),H()}catch{N.error("Löschen fehlgeschlagen.")}}let ye=null;const jt=()=>{ye&&(ye.remove(),ye=null,document.removeEventListener("pointerdown",$a,!0))},$a=x=>{ye&&!ye.contains(x.target)&&jt()};function cr(x,L,W,_){if(jt(),ye=document.createElement("div"),ye.className="km-ctx",_){const B=document.createElement("div");B.className="km-ctx-t",B.textContent=_,ye.appendChild(B)}W.forEach(B=>{if(B.sep){const ue=document.createElement("div");ue.className="km-ctx-sep",ye.appendChild(ue);return}const T=document.createElement("button");T.className="km-ctx-i",T.innerHTML=`<i class="bi ${B.icon}"></i><span>${v(B.label)}</span>`,T.addEventListener("click",()=>{jt(),B.action?.()}),ye.appendChild(T)}),document.body.appendChild(ye);const P=ye.getBoundingClientRect();ye.style.left=Math.max(8,Math.min(x,window.innerWidth-P.width-8))+"px",ye.style.top=Math.max(8,Math.min(L,window.innerHeight-P.height-8))+"px",setTimeout(()=>document.addEventListener("pointerdown",$a,!0),0)}function za(x,L,W){const _=F(x);if(!_)return;const P=Z(n,_),{current:B}=fa(P);cr(L,W,[{icon:"bi-flower2",label:B?"Kultur bearbeiten":"Kultur setzen",action:()=>oa(_,B,"current",P.length)},{icon:"bi-plus-lg",label:"Nächste Kultur planen",action:()=>oa(_,null,"next",P.length)},{icon:"bi-list-check",label:"Aufgabe planen",action:()=>la(_,null,B)},{sep:!0},{icon:"bi-arrow-right-circle",label:"Fläche öffnen",action:()=>{l=x,re("flaechen"),z()}},{icon:"bi-map",label:"Auf Karte",action:()=>Da()}],_.name)}function We(){h&&(h.remove(),h=null)}function sa(x,L,W,_){We();const P=document.createElement("div");return P.className="kmodal-ov",P.innerHTML=`<div class="kmodal" role="dialog" aria-modal="true">
      <div class="kmodal-h"><span>${v(x)}</span><button class="kmodal-x" aria-label="Schließen"><i class="bi bi-x-lg"></i></button></div>
      <div class="kmodal-b">${L}</div>
      <div class="kmodal-f"><button class="btn-cancel" data-k="cancel">Abbrechen</button><button class="btn-save" data-k="save">${v(W)}</button></div></div>`,e.appendChild(P),h=P,P.querySelector(".kmodal-x").addEventListener("click",We),P.querySelector('[data-k="cancel"]').addEventListener("click",We),P.addEventListener("mousedown",B=>{B.target===P&&We()}),P.querySelector('[data-k="save"]').addEventListener("click",()=>{_(P)!==!1&&We()}),P.querySelectorAll("[data-more]").forEach(B=>B.addEventListener("click",()=>{const T=P.querySelector("[data-more-box]");T&&(T.hidden=!1,B.style.display="none")})),setTimeout(()=>P.querySelector("input,select,textarea,.km-tile")?.focus?.(),30),P}function Aa(){const x=new Set,L=[],W=P=>{const B=String(P||"").trim().toLowerCase();P&&!x.has(B)&&(x.add(B),L.push(P))};return o.forEach(P=>W(P.name)),s.forEach(P=>W(P.kultur)),`<datalist id="km-kultur-dl">${L.map(P=>`<option value="${v(P)}"></option>`).join("")}</datalist>`}function oa(x,L,W,_){const P=W==="next"&&!L,B=L||{},T=(B.kulturStammId?o.find(j=>j.id===B.kulturStammId):null)||Ln(o,B.kultur),ue=B.pflanzDatum?.slice(0,10)||(P?"":dt()),be=Yt.map(j=>`<button type="button" class="km-sw${(B.color||"")===j?" on":""}" data-col="${j}" style="background:${j}"></button>`).join(""),pe=Jd.map(j=>`<option value="${v(j)}"${(B.einheit||"Pflanzen")===j?" selected":""}>${v(j)}</option>`).join(""),ee=`
      <label class="km-fld big">Was wächst hier?<input list="km-kultur-dl" data-f="kultur" value="${v(B.kultur||"")}" placeholder="z. B. Tomate – aus Bibliothek wählen" autocomplete="off" /></label>${Aa()}
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
        <label class="km-fld">Aussaat<input type="date" data-f="aussaat" value="${(B.aussaatDatum||"").slice(0,10)}" /></label>
        <label class="km-fld">${P?"Geplante Pflanzung":"Pflanzung"}<input type="date" data-f="pflanz" value="${ue}" /></label>
      </div>
      <div class="km-frow2">
        <label class="km-fld">Ernte von<input type="date" data-f="ernteVon" value="${(B.ernteVon||"").slice(0,10)}" /></label>
        <label class="km-fld">Ernte bis<input type="date" data-f="ernteBis" value="${(B.ernteBis||B.ernteDatum||"").slice(0,10)}" /></label>
      </div>
      <div class="km-hint2"><i class="bi bi-info-circle"></i> Termine kommen automatisch aus der Bibliothek – jederzeit frei überschreibbar.</div>
      <div class="km-frow2">
        <label class="km-fld">Menge<input type="number" step="1" min="0" data-f="menge" value="${B.menge!=null?B.menge:""}" placeholder="optional" /></label>
        <label class="km-fld">Einheit<select data-f="einheit">${pe}</select></label>
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
        <label class="km-fld">Status<select data-f="status">${["aktiv","geplant","abgeschlossen"].map(j=>`<option value="${j}"${(B.status||(P?"geplant":"aktiv"))===j?" selected":""}>${Vd[j].label}</option>`).join("")}</select></label>
        <div class="km-fld">Farbe<div class="km-sws">${be}</div></div>
        <label class="km-fld">Notiz<textarea data-f="notes" rows="2" placeholder="optional">${v(B.notes||"")}</textarea></label>
      </div>
      ${L?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Satz löschen</button>':""}`,Q=sa(L?"Satz bearbeiten":P?"Nächsten Satz planen":"Satz eintragen",ee,"Speichern",j=>{const se=Ct=>j.querySelector(`[data-f="${Ct}"]`)?.value?.trim()||"",Ae=se("kultur");if(!Ae)return N.warning("Bitte eine Kultur angeben."),!1;const Gt=Ln(o,Ae),Ye=se("aussaat")||null,lt=se("pflanz")||null,Pa=se("ernteVon")||null,Be=se("ernteBis")||null,un=se("menge"),dr=un?Number(un):null,pn=j.querySelector('[data-f="einheit"]')?.value||null,Ma=!j.querySelector("[data-more-box]").hidden;let Mt=Ma?se("status"):"";Mt||(Mt=P||lt&&Ee(lt)>Number(dt().replace(/-/g,""))?"geplant":"aktiv");const me=j.querySelector(".km-sw.on")?.dataset.col||B.color||Gt?.color||Yt[_%Yt.length],Xe=s.find(Ct=>Ct.kultur===Ae)?.eppoCode||Gt?.eppoCode||null,bt=Ma?se("notes")||null:B.notes||null,Ca={flaecheTyp:x.typ,flaecheId:x.id,kultur:Ae,eppoCode:Xe,color:me,menge:dr,einheit:pn,kulturStammId:Gt?.id||B.kulturStammId||null,notes:bt},fn=!L&&j.querySelector('[data-f="succOn"]')?.checked,Oe=Math.max(2,Math.min(20,Number(j.querySelector('[data-f="succN"]')?.value)||2)),mn=Math.max(1,Number(j.querySelector('[data-f="succGap"]')?.value)||14),gn=Number(dt().replace(/-/g,""));(async()=>{try{if(fn){const Ct="sg-"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),ur={aussaatDatum:Ye,pflanzDatum:lt,ernteVon:Pa,ernteBis:Be};for(let ht=0;ht<Oe;ht++){const Vt=Xd(ur,ht*mn),pr=Vt.pflanzDatum&&Ee(Vt.pflanzDatum)>gn?"geplant":Mt;await Ii({...Ca,...Vt,ernteDatum:null,status:pr,satzGruppe:Ct})}N.success(`${Oe} Sätze angelegt.`)}else await Ii({id:L?.id,...Ca,aussaatDatum:Ye,pflanzDatum:lt,ernteVon:Pa,ernteBis:Be,ernteDatum:null,status:Mt,satzGruppe:B.satzGruppe||null});await E(),Y(),H()}catch{N.error("Speichern fehlgeschlagen.")}})()});let te="pflanz";const he=j=>Q.querySelector(`[data-f="${j}"]`),Se=Q.querySelector("[data-anchor-row]"),Ke=Q.querySelector("[data-stammhint]");let q=T;const fe=()=>{if(!q){Ke.hidden=!0,Se.style.opacity="0.45";return}Se.style.opacity="1";const se=[Qd[q.anbauMethode==="anzucht"?"anzucht":"direkt"].short];q.kulturTage&&se.push(`${q.kulturTage} T. Kultur`),q.anbauMethode==="anzucht"&&q.anzuchtTage&&se.push(`${q.anzuchtTage} T. Anzucht`),q.familie&&se.push(q.familie),Ke.innerHTML=`<i class="bi bi-stars"></i> <b>Bibliothek:</b> ${v(se.join(" · "))}`,Ke.hidden=!1},ze=()=>{if(!q)return;const se=he(te==="ernte"?"ernteVon":te).value||dt(),Ae=Yd(q,te,se);Ae.aussaatDatum!=null&&(he("aussaat").value=Ae.aussaatDatum||""),Ae.pflanzDatum!=null&&(he("pflanz").value=Ae.pflanzDatum||""),Ae.ernteVon!=null&&(he("ernteVon").value=Ae.ernteVon||""),Ae.ernteBis!=null&&(he("ernteBis").value=Ae.ernteBis||"")},ke=he("kultur");ke.addEventListener("input",()=>{q=Ln(o,ke.value),fe()}),ke.addEventListener("change",()=>{q=Ln(o,ke.value),fe(),q&&(he("pflanz").value||(he("pflanz").value=dt()),ze())}),Q.querySelectorAll("[data-anchor]").forEach(j=>j.addEventListener("click",()=>{Q.querySelectorAll("[data-anchorseg] .km-segb").forEach(se=>se.classList.remove("on")),j.classList.add("on"),te=j.dataset.anchor,ze()})),["aussaat","pflanz","ernteVon"].forEach(j=>he(j)?.addEventListener("change",()=>{j===(te==="ernte"?"ernteVon":te)&&ze()})),fe();const Pt=Q.querySelector('[data-f="succOn"]');Pt?.addEventListener("change",()=>{Q.querySelector("[data-succ-box]").hidden=!Pt.checked}),Q.querySelectorAll(".km-sw").forEach(j=>j.addEventListener("click",()=>{Q.querySelectorAll(".km-sw").forEach(se=>se.classList.remove("on")),j.classList.add("on")})),Q.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(L?.id)try{await yl({id:L.id}),await E(),Y(),H(),We()}catch{N.error("Löschen fehlgeschlagen.")}})}function la(x,L,W){const _=L||{art:"bewaesserung",status:"geplant"},P=$u.map(ee=>`<button type="button" class="km-tile${(_.art||"bewaesserung")===ee.art?" on":""}" data-art="${ee.art}" style="--ac:${Yn[ee.art].color}"><i class="bi ${ee.icon}"></i><span>${v(ee.label)}</span></button>`).join(""),B=(_.status||"geplant")==="erledigt",T=(B?_.erledigtDatum:_.planDatum)||dt(),ue=`
      <div class="km-tasktiles">${P}</div>
      <div class="km-fld">Wann?<div class="km-when" data-when>
        <button type="button" class="km-chip" data-day="0">Heute</button>
        <button type="button" class="km-chip" data-day="1">Morgen</button>
        <button type="button" class="km-chip" data-day="x">Datum…</button>
        <input type="date" data-f="datum" value="${T.slice(0,10)}" />
      </div></div>
      <div class="km-seg" data-seg>
        <button type="button" class="km-segb${B?"":" on"}" data-status="geplant"><i class="bi bi-clock"></i> Geplant</button>
        <button type="button" class="km-segb${B?" on":""}" data-status="erledigt"><i class="bi bi-check-lg"></i> Erledigt</button>
      </div>
      <button type="button" class="km-more" data-more><i class="bi bi-sliders"></i> Notiz, Menge, Mittel</button>
      <div class="km-more-box" data-more-box hidden>
        <label class="km-fld">Bezeichnung<input data-f="notes" value="${v(_.notes||"")}" placeholder="z. B. Kompostgabe" /></label>
        <div class="km-frow2">
          <label class="km-fld">Menge<input type="number" step="0.1" data-f="menge" value="${_.menge!=null?_.menge:""}" placeholder="optional" /></label>
          <label class="km-fld">Einheit<input data-f="einheit" value="${v(_.einheit||"")}" placeholder="kg/ha, l" /></label>
        </div>
        <label class="km-fld">Mittel<input data-f="mittel" value="${v(_.mittel||"")}" placeholder="optional" /></label>
      </div>
      ${L?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Aufgabe löschen</button>':""}`,be=sa(L?"Aufgabe bearbeiten":"Aufgabe hinzufügen",ue,"Speichern",ee=>{const Q=ee.querySelector(".km-tile.on")?.dataset.art||"bewaesserung",te=ee.querySelector(".km-segb.on")?.dataset.status||"geplant",he=ee.querySelector('[data-f="datum"]').value||dt(),Se=!ee.querySelector("[data-more-box]").hidden,Ke=fe=>{const ze=ee.querySelector(`[data-f="${fe}"]`)?.value;return ze?Number(ze):null},q=fe=>ee.querySelector(`[data-f="${fe}"]`)?.value.trim()||null;(async()=>{try{await Ci({id:L?.id,flaecheTyp:x.typ,flaecheId:x.id,anbauId:L?.anbauId||W?.id||null,art:Q,status:te,planDatum:te==="geplant"?he:L?.planDatum||null,erledigtDatum:te==="erledigt"?he:null,menge:Se?Ke("menge"):L?.menge??null,einheit:Se?q("einheit"):L?.einheit||null,mittel:Se?q("mittel"):L?.mittel||null,historyId:L?.historyId||null,notes:Se?q("notes"):L?.notes||null}),await E(),Y(),H()}catch{N.error("Speichern fehlgeschlagen.")}})()});be.querySelectorAll(".km-tile").forEach(ee=>ee.addEventListener("click",()=>{be.querySelectorAll(".km-tile").forEach(Q=>Q.classList.remove("on")),ee.classList.add("on")})),be.querySelectorAll(".km-segb").forEach(ee=>ee.addEventListener("click",()=>{be.querySelectorAll(".km-segb").forEach(Q=>Q.classList.remove("on")),ee.classList.add("on")}));const pe=be.querySelector('[data-f="datum"]');be.querySelectorAll("[data-day]").forEach(ee=>ee.addEventListener("click",()=>{const Q=ee.dataset.day;if(Q==="x"){pe.style.display="inline-block",pe.showPicker?.();return}const te=new Date;te.setDate(te.getDate()+Number(Q)),pe.value=te.toISOString().slice(0,10),pe.style.display="none"})),be.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(L?.id)try{await Mi({id:L.id}),await E(),Y(),H(),We()}catch{N.error("Löschen fehlgeschlagen.")}})}e.querySelectorAll(".km-modebtn").forEach(x=>x.addEventListener("click",()=>re(x.dataset.mode))),document.addEventListener("keydown",x=>{x.key==="Escape"&&(h&&We(),jt())}),window.addEventListener("psm:openKultur",x=>{const L=x?.detail;!L?.typ||!L?.id||(l=L.typ+":"+L.id,re("flaechen"),p&&(De(),Te(),z()))}),t.state.subscribe(x=>{x?.app?.activeSection==="kultur"&&(p?(async()=>(a=await Ss(t),Y(),z()))():(p=!0,R()))}),de()}function Pu(){return`
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
  </section>`}const Mu=["pflanzenschutz.json","history.json","entries.json"];let Es=!1,K=null,zt=!1;const aa=25,Dr=new Intl.NumberFormat("de-DE");let Le=0,An=null,Ls=null;const Cu=Xs({id:"import",label:"Import-Vorschau",budget:{initialLoad:20,maxItems:50}});let Zr=null;function Iu(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function Bu(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Fu(e,t){const a=e.querySelector('[data-role="import-log-list"]');if(a){if(!t.length){a.innerHTML='<tr><td colspan="5" class="text-muted small">Noch keine Importe protokolliert.</td></tr>';return}a.innerHTML=t.map(n=>{const r=n.rangeStart||n.rangeEnd?`${Ja(n.rangeStart)||n.rangeStart||"?"} – ${Ja(n.rangeEnd)||n.rangeEnd||"?"}`:"-",s=[n.source,n.device].filter(Boolean),o=s.length?v(s.join(" · ")):"-";return`
        <tr>
          <td>${v(Bu(n.importedAt))}</td>
          <td>${o}</td>
          <td class="text-end text-success">${n.added}</td>
          <td class="text-end text-muted">${n.skipped}</td>
          <td class="small text-muted">${v(r)}</td>
        </tr>`}).join("")}}async function Hn(e){if(ce()==="sqlite")try{const t=await kl(50);Fu(e,t.items||[])}catch(t){console.warn("Import-Historie konnte nicht geladen werden",t)}}function At(e,t,a="info"){const n=e.querySelector('[data-role="import-hint"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a} small mt-3`,n.textContent=t}}function Xt(e,t){const a=e.querySelector('[data-role="import-feedback"]');a&&(a.textContent=t)}function _t(e){const t=e.querySelector('[data-action="clear-import"]'),a=e.querySelector('[data-action="focus-import"]'),n=e.querySelector('[data-action="run-import"]'),r=!!K;if(t&&(t.disabled=!r||zt),a&&(a.disabled=!r||zt),n){const s=!!(K?.importableEntries?.length&&K.stats||K?.fotos?.length);n.disabled=!r||!s||zt}}function Nu(e){K=null,ju(e);const t=e.querySelector('[data-role="import-summary-card"]'),a=e.querySelector('[data-role="import-file"]');t&&t.classList.add("d-none"),a&&(a.value=""),Xt(e,""),At(e,"Bereit für eine neue Importdatei."),_t(e),ma()}function $o(e){if(e.dateIso)return e.dateIso;if(e.datum){const t=new Date(e.datum);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.date){const t=new Date(e.date);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.savedAt){const t=new Date(e.savedAt);if(!Number.isNaN(t.getTime()))return t.toISOString()}return null}function Xn(e){return e?Ja(e)||e.slice(0,10):"-"}function zo(e){return e.savedAt||(e.savedAt=e.createdAt||e.dateIso||new Date().toISOString()),e}function Ds(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function Tu(e){if(!e||typeof e!="object")return null;const t={...e};if(!Array.isArray(t.items)){const a=e.items;t.items=Array.isArray(a)?[...a]:[]}return zo(t),t}function Ao(e,t){const a=e.map(n=>$o(n)).filter(n=>!!n).sort();return{startIso:a[0]||t?.filters?.startDate||null,endIso:a[a.length-1]||t?.filters?.endDate||null}}function qu(e){if(!e)return;const t=Ds(e.startIso,"start"),a=Ds(e.endIso,"end");if(!t&&!a)return;const n={};return t&&(n.startDate=t),a&&(n.endDate=a),n}async function Po(e,t){if(ce()!=="sqlite"){const l=Ue(e.history);return new Set(l.map(d=>er(d)).filter(d=>!!d))}const n=qu(t);if(!n)return new Set;const r=new Set;let s=1;const o=500;try{for(;;){const l=await Os({page:s,pageSize:o,filters:n,sortDirection:"asc"});if(l.items.forEach(d=>{const p=er(d);p&&r.add(p)}),s*o>=l.totalCount)break;s+=1}}catch(l){return console.warn("Konnte vorhandene Einträge für Duplikatprüfung nicht laden",l),new Set}return r}function er(e){const t=typeof e.clientUuid=="string"&&e.clientUuid?e.clientUuid:"";if(t)return`uuid:${t}`;const a=e.savedAt||e.dateIso||e.createdAt||e.datum||"",n=e.ersteller||"",r=e.kultur||"",s=e.invekos||e.standort||"";return[a,n,r,s].join("|")}function Hu(e,t,a,n){const r=n||Ao(e,a),s=r.startIso,o=r.endIso,l=new Set,d=new Set;return t.forEach(p=>{p.ersteller&&l.add(p.ersteller),p.kultur&&d.add(p.kultur)}),{startDateLabel:Xn(s),endDateLabel:Xn(o),startDateRaw:s,endDateRaw:o,entryCount:e.length,importableCount:t.length,duplicateCount:e.length-t.length,creators:Array.from(l).slice(0,5),crops:Array.from(d).slice(0,5)}}function _u(e,t){const a=e.querySelector('[data-role="import-stats"]');if(!a)return;if(!t){a.innerHTML="";return}const n=t.stats,r=t.metadata?.filters;a.innerHTML=`
    <div class="col-12 col-md-4">
      <div class="border rounded p-3 h-100">
        <div class="text-muted small">Zeitraum</div>
        <div class="fw-bold">${v(n.startDateLabel)} – ${v(n.endDateLabel)}</div>
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
        <div class="fw-bold">${v(r?.label||r?.scope||"—")}</div>
        <div class="text-muted small">${v(r?[r.creator,r.crop].filter(Boolean).join(" · ")||"Keine zusätzlichen Filter":"Keine Angaben")}</div>
      </div>
    </div>
  `}function Ru(e,t){const a=e.querySelector('[data-role="import-warnings"]');if(!a)return;if(!t||!t.warnings.length){a.innerHTML="";return}const n=t.warnings.map(r=>`<li>${v(r)}</li>`).join("");a.innerHTML=`
    <div class="alert alert-warning">
      <strong>Hinweise:</strong>
      <ul class="mb-0">${n}</ul>
    </div>
  `}function Mo(e){const t=e.entries.length;if(!t)return Le=0,{start:0,end:0,total:0};const a=Math.max(Math.ceil(t/aa),1);Le>=a&&(Le=a-1),Le<0&&(Le=0);const n=Le*aa,r=Math.min(n+aa,t);return{start:n,end:r,total:t}}function Ou(e){const t=e.querySelector('[data-role="import-pager"]');return t?((!An||Ls!==t)&&(An?.destroy(),An=on(t,{onPrev:()=>Wu(e),onNext:()=>Ku(e),labels:{prev:"Zurück",next:"Weiter",loading:"Vorschau wird geladen...",empty:"Keine Einträge verfügbar"}}),Ls=t),An):null}function Qa(e,t){const a=Ou(e);if(!a)return;if(!t){Le=0,a.update({status:"hidden"});return}const n=t.entries.length;if(!n){Le=0,a.update({status:"disabled",info:"Keine Einträge vorhanden."});return}const{start:r,end:s}=Mo(t),o=`Einträge ${Dr.format(r+1)}–${Dr.format(s)} von ${Dr.format(n)}`;a.update({status:"ready",info:o,canPrev:Le>0,canNext:s<n})}function Wu(e){!K||Le===0||(Le=Math.max(Le-1,0),bi(e,K))}function Ku(e){if(!K)return;const t=K.entries.length;if(!t)return;const a=Math.max(Math.ceil(t/aa)-1,0);Le>=a||(Le=Math.min(Le+1,a),bi(e,K))}function ju(e){Le=0,e&&Qa(e,K)}function bi(e,t){const a=e.querySelector('[data-role="import-preview-table"]');if(!a){ma();return}if(!t){a.innerHTML="",Qa(e,null),ma();return}if(!t.entries.length){a.innerHTML='<tr><td colspan="5" class="text-center text-muted">Keine Einträge</td></tr>',Qa(e,t),ma();return}const{start:r,end:s}=Mo(t),l=t.entries.slice(r,s).map(d=>{const p=Xn($o(d));return`
        <tr>
          <td>${v(p)}</td>
          <td>${v(d.kultur||"-")}</td>
          <td>${v(d.ersteller||"-")}</td>
          <td>${v(d.standort||d.invekos||"-")}</td>
          <td>${v(d.savedAt?Xn(d.savedAt):"-")}</td>
        </tr>
      `}).join("");a.innerHTML=l,Qa(e,t),ma()}async function Gu(e){const t=Sl(e),a=Object.keys(t),n=a.find(p=>Mu.some(u=>p.toLowerCase().endsWith(u)));if(!n)throw new Error("ZIP enthält keine 'pflanzenschutz.json'.");const r=JSON.parse(zr(t[n])),s=a.find(p=>p.toLowerCase().endsWith("metadata.json")),o=s?JSON.parse(zr(t[s])):null,l=Array.isArray(r)?r:Array.isArray(r.entries)?r.entries:Array.isArray(r.history)?r.history:[],d=Array.isArray(r?.fotos)?r.fotos:[];for(const p of d){if(p?.data)continue;const u=p?.file?String(p.file):null,m=u?a.find(h=>h===u||h.toLowerCase().endsWith(u.toLowerCase())):null;m&&t[m]&&(p.data=Uu(t[m]),p.mime||(p.mime="image/jpeg"))}return{entries:l,metadata:o,fotos:d}}function Uu(e){let t="";for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode(...e.subarray(n,n+32768));return btoa(t)}async function Vu(e){const t=zr(e),a=JSON.parse(t);if(Array.isArray(a))return{entries:a,metadata:null,fotos:[]};const n=Array.isArray(a.fotos)?a.fotos:[];if(Array.isArray(a.entries))return{entries:a.entries,metadata:a.metadata||null,fotos:n};if(Array.isArray(a.history))return{entries:a.history,metadata:a.metadata||null,fotos:n};if(n.length)return{entries:[],metadata:a.metadata||null,fotos:n};throw new Error("JSON enthält keine Eintragsliste.")}async function Zu(e,t){const a=new Uint8Array(await e.arrayBuffer()),n=/\.zip$/i.test(e.name)||e.type==="application/zip",{entries:r,metadata:s,fotos:o}=n?await Gu(a):await Vu(a),l=Array.isArray(o)?o:[],d=(Array.isArray(r)?r:[]).map(w=>Tu(w)).filter(w=>!!w);if(!d.length&&!l.length)throw new Error("Die Datei enthielt keine verwertbaren Einträge.");const p=Ao(d,s),u=await Po(t,p),m=new Set,h=[];let k=0;d.forEach(w=>{const $=er(w);if(!$){h.push(w);return}if(u.has($)||m.has($)){k+=1;return}m.add($),h.push(w)});const f=Hu(d,h,s,p),y=[];return k&&y.push(`${k} Datensätze wurden wegen gleicher Kennung übersprungen.`),(!f.startDateRaw||!f.endDateRaw)&&y.push("Zeitraum konnte nicht eindeutig ermittelt werden."),{filename:e.name,entries:d,importableEntries:h,metadata:s,stats:f,warnings:y,lastImportRefs:[],fotos:l}}function $s(){if(!K)return"Keine Datei";const e=[];return zt&&e.push("Verarbeitung"),K.warnings.length&&e.push("Warnungen"),K.stats.importableCount<K.stats.entryCount&&e.push("Duplikate entfernt"),e.length?e.join(" · "):void 0}function Qu(){const e=!!K,t=e?Math.max(Math.ceil((K?.entries.length||0)/aa),1):null,a=e?{items:K?.entries.length??0,totalCount:K?.stats.entryCount??null,cursor:K&&(K.entries.length||0)>aa?`Seite ${Le+1}${t?` / ${t}`:""}`:null,payloadKb:to(K?.entries.slice(0,aa)),lastUpdated:Zr,note:$s()}:{items:0,totalCount:0,cursor:null,payloadKb:0,lastUpdated:Zr,note:$s()};eo(Cu,a)}function ma(){Zr=new Date().toISOString(),Qu()}function Qr(e){const t=e.querySelector('[data-role="import-summary-card"]');if(!t)return;if(!K){t.classList.add("d-none"),Qa(e,null),_t(e),ma();return}t.classList.remove("d-none"),Le=0;const a=t.querySelector('[data-role="import-file-name"]'),n=t.querySelector('[data-role="import-summary-subline"]');a&&(a.textContent=K.filename),n&&(n.textContent=`${K.stats.importableCount} von ${K.stats.entryCount} Einträgen importierbar`),_u(e,K),Ru(e,K),bi(e,K),_t(e)}async function Ju(){const e=ce();if(!e||e==="memory"||e==="sqlite")return;const t=at();await nt(t)}function zs(e,t){if(!t.length)return[];const a=typeof e.state.updateSlice=="function"?e.state.updateSlice:Qe,n=[];return a("history",r=>{const s=rn(r),o=s.items.slice(),l=o.length;return t.forEach((d,p)=>{n.push(l+p),o.push(d)}),{...s,items:o,totalCount:o.length,lastUpdatedAt:new Date().toISOString()}}),n}async function Yu(e,t){if(!K){window.alert("Bitte zuerst eine Importdatei laden.");return}const a=K.fotos||[];if(!K.importableEntries.length&&!a.length){window.alert("Alle Einträge wurden bereits importiert oder als Duplikat erkannt.");return}zt=!0,_t(e),Xt(e,"Import läuft ...");const n=t.state.getState(),r={startIso:K.stats.startDateRaw,endIso:K.stats.endDateRaw};let s=new Set;try{s=await Po(n,r)}catch(y){console.warn("Duplikatprüfung vor Import fehlgeschlagen",y)}const o=new Set(s),l=[];let d=0;if(K.importableEntries.forEach(y=>{const w=er(y);if(w&&o.has(w)){d+=1;return}w&&o.add(w),l.push(y)}),!l.length&&!a.length){Xt(e,"Keine neuen Einträge gefunden."),At(e,"Alle Datensätze sind bereits importiert worden.","warning"),zt=!1,_t(e);return}const p=ce(),u=[],m=[];let h=0,k=0;const f=l.map(y=>zo({...y}));try{if(p==="sqlite"){const I=[];for(const C of f)try{const H=await Ms(C);if(H?.duplicate){d+=1;continue}H?.id!=null&&(u.push({source:"sqlite",ref:H.id}),I.push(C))}catch(H){console.error("appendHistoryEntry failed",H),m.push(C.savedAt||"Unbekannter Eintrag")}zs(t,I);for(const C of a)try{(await wl(C))?.duplicate?k+=1:h+=1}catch(H){console.error("appendFoto failed",H)}h&&window.dispatchEvent(new CustomEvent("fotos:changed"));try{await it()}catch(C){console.warn("SQLite-Datei konnte nach dem Import nicht gespeichert werden",C)}}else zs(t,f).forEach(C=>{u.push({source:"state",ref:C})}),await Ju();const y=u.length;if(y||h){p==="sqlite"&&y&&t.events?.emit?.("history:data-changed",{type:"created-bulk",count:y});const I=[];y&&I.push(`${y} Einträge`),h&&I.push(`${h} Foto(s)`),Xt(e,`${I.join(" und ")} importiert.${m.length?` ${m.length} Einträge konnten nicht übernommen werden.`:""}`.trim()),K.lastImportRefs=u,K.importableEntries=[],K.stats={...K.stats,importableCount:0},Qr(e)}else Xt(e,"Keine neuen Daten importiert.");const w=[];let $="success";if(m.length&&(w.push(`${m.length} Einträge konnten nicht gespeichert werden. Details siehe Konsole.`),$="warning"),d&&(w.push(`${d} Einträge wurden während des Imports als Duplikat übersprungen.`),$="warning"),k&&w.push(`${k} Foto(s) waren bereits vorhanden (übersprungen).`),w.length||w.push("Import abgeschlossen."),At(e,w.join(" "),$),p==="sqlite"&&(y||d||h||k))try{const I=[];m.length&&I.push(`${m.length} fehlgeschlagen`),h&&I.push(`${h} Fotos`),k&&I.push(`${k} Fotos doppelt`),await xl({source:K.filename||null,device:K.metadata?.device||K.metadata?.label||null,added:y,skipped:d,rangeStart:K.stats.startDateRaw,rangeEnd:K.stats.endDateRaw,note:I.length?I.join(", "):null}),await it().catch(()=>{}),await Hn(e)}catch(I){console.warn("Import-Historie konnte nicht geschrieben werden",I)}}catch(y){console.error("Import fehlgeschlagen",y),Xt(e,"Import fehlgeschlagen. Siehe Konsole für Details."),At(e,"Import fehlgeschlagen. Bitte erneut versuchen.","danger")}finally{zt=!1,_t(e)}}function Xu(e,t,a){if(!e.events?.emit)return;const n=t.metadata?.label||t.metadata?.filters?.label||`Import ${t.filename}`;e.events.emit("documentation:focus-range",{startDate:t.stats.startDateRaw||void 0,endDate:t.stats.endDateRaw||void 0,label:n,reason:"import",entryIds:a,autoSelectFirst:!!a.length})}function ep(e,t){if(!K){window.alert("Bitte zuerst eine Importdatei laden.");return}if(!K.stats.startDateRaw||!K.stats.endDateRaw){window.alert("Zeitraum konnte nicht bestimmt werden.");return}Xu(t,K,K.lastImportRefs),At(e,"Dokumentation wurde auf den Importzeitraum fokussiert.")}function tp(e,t){const a=e.querySelector('[data-role="import-file"]');a&&a.addEventListener("change",()=>{const n=a.files?.[0];n&&(zt=!0,At(e,"Datei wird analysiert ..."),_t(e),Xt(e,""),Zu(n,t.state.getState()).then(r=>{K=r,Qr(e),At(e,`${r.importableEntries.length} Einträge bereit zum Import.`)}).catch(r=>{console.error("Importdatei konnte nicht gelesen werden",r),At(e,r?.message||"Importdatei konnte nicht gelesen werden.","danger"),K=null,Qr(e)}).finally(()=>{zt=!1,_t(e)}))}),e.addEventListener("click",n=>{const r=n.target?.closest("[data-action]");if(!r)return;const s=r.dataset.action;if(s){if(s==="clear-import"){Nu(e);return}if(s==="focus-import"){ep(e,t);return}s==="run-import"&&Yu(e,t)}})}function ap(e,t){if(!e||Es)return;const a=e;a.innerHTML="";const n=Iu();a.appendChild(n),tp(n,t),At(n,"Wähle eine Datei aus, um den Import zu starten."),Hn(n),ft("database:connected",()=>void Hn(n)),ft("app:sectionChanged",r=>{(r==="daten"||r==="documentation"||r==="import")&&Hn(n)}),Es=!0}const Jt=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function np(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function da(e,t,a,n){return`
    <div class="dash-card"${n?` data-goto="${n}" style="cursor:pointer;"`:""}>
      <div class="dash-card-ic"><i class="bi ${e}"></i></div>
      <div class="dash-card-body"><div class="dash-card-value">${a}</div><div class="dash-card-label">${v(t)}</div></div>
    </div>`}function rp(){return`
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
  </section>`}function ip(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=rp();const a=e.querySelector('[data-role="dash-cards"]'),n=e.querySelector('[data-role="dash-warn"]'),r=e.querySelector('[data-role="dash-recent"]');e.addEventListener("click",o=>{const l=o.target?.closest("[data-goto]");if(!l)return;const d=l.getAttribute("data-goto");d&&t.state.updateSlice("app",p=>({...p,activeSection:d}))});const s=async()=>{if(ce()!=="sqlite"){a&&(a.innerHTML='<div class="dash-empty">Bitte zuerst eine Datenbank öffnen.</div>');return}const o=t.state.getState(),l=(Ue(o.gps?.points)||[]).length;let d=0,p=0,u=0,m=0,h=[],k=[],f=0;try{d=(await Jr())?.rows?.length||0}catch{}try{p=(await Rs())?.rows?.length||0}catch{}try{const y=(await Yr())?.rows||[];u=y.length,m=y.reduce((w,$)=>w+($.plants||0),0)}catch{}try{h=(await _s())?.rows||[]}catch{}try{const y=await Os({}),w=y?.entries||y?.rows||[];f=y?.totalCount??w.length,k=w.slice(0,6)}catch{}if(a&&(a.innerHTML=[da("bi-geo-alt","Standorte",Jt(l)),da("bi-flower1","Kulturen",Jt(d)),da("bi-droplet","Mittel im Sortiment",Jt(p),"lager"),da("bi-journal-check","Anwendungen",Jt(f),"documentation"),da("bi-map","Acker-Flächen",Jt(u),"acker"),da("bi-flower3","Pflanzen (Acker)",Jt(m),"acker")].join("")),n){const y=[];h.forEach($=>{$.bestand<=0&&($.verbraucht>0||$.zugang>0)&&y.push(`<div class="dash-row"><span><i class="bi bi-box-seam me-1" style="color:#ef4444"></i>${v($.name)}</span><span style="color:#ef4444">Bestand ${Jt($.bestand)} ${v($.einheit||"")}</span></div>`)}),h.forEach($=>{if(!$.zulEnde)return;const I=Math.round((new Date($.zulEnde).getTime()-Date.now())/864e5);I<0?y.push(`<div class="dash-row"><span><i class="bi bi-calendar-x me-1" style="color:#ef4444"></i>${v($.name)}</span><span style="color:#ef4444">Zulassung abgelaufen</span></div>`):I<180&&y.push(`<div class="dash-row"><span><i class="bi bi-calendar-event me-1" style="color:#f59e0b"></i>${v($.name)}</span><span style="color:#f59e0b">Zulassung endet in ${I} T</span></div>`)});const w=y.length>6?`<div class="dash-row" style="color:var(--color-text-muted)"><span>+ ${y.length-6} weitere</span></div>`:"";n.innerHTML=y.length?y.slice(0,6).join("")+w:'<div class="dash-empty">Alles im grünen Bereich. ✓</div>'}r&&(r.innerHTML=k.length?k.map(y=>{const w=np(y.datum||y.dateIso||y.created_at||y.createdAt||null),$=y.kultur||"",I=y.standort||"";return`<div class="dash-row"><span>${v(I)}${$?" · "+v($):""}</span><span class="dash-empty" style="padding:0">${v(w)}</span></div>`}).join(""):'<div class="dash-empty">Noch keine Anwendungen erfasst.</div>')};t.state.subscribe(o=>{o?.app?.activeSection==="dashboard"&&s()}),s()}function As(e){document.querySelectorAll(".content-section").forEach(a=>{a.style.display="none"});const t=document.getElementById(`section-${e}`);t instanceof HTMLElement&&(t.style.display="block")}function Ps(){El(),Is();const e={state:{getState:U,updateSlice:Qe,subscribe:Rn},events:{emit:(w,$)=>{Dt(async()=>{const{emit:I}=await import("./index.D1c2XijN.js").then(C=>C.aS);return{emit:I}},[]).then(({emit:I})=>{I(w,$)})},subscribe:ft}},t=document.querySelector('[data-region="startup"]'),a=document.querySelector('[data-region="shell"]'),n=document.querySelector('[data-region="main"]'),r=document.querySelector('[data-region="footer"]');tc(t,e);const s=document.querySelector('[data-feature="calculation"]');Ll(s,e);const o=document.querySelector('[data-feature="documentation"]');Jc(o,e);const l=document.querySelector('[data-feature="settings"]');Wd(l,e);const d=document.querySelector('[data-feature="lager"]');Gd(d,e);const p=document.querySelector('[data-feature="acker"]');mu(p,e);const u=document.querySelector('[data-feature="kultur"]');Au(u,e);const m=document.querySelector('[data-feature="fotos"]');Dl(m,e,{archiveMode:!0});const h=document.querySelector('[data-feature="import-page"]');ap(h,{state:{getState:U,updateSlice:Qe},events:e.events});const k=document.querySelector('[data-feature="dashboard"]');ip(k,e);const f=w=>{const $=document.body;$&&($.classList.toggle("bg-app",w),$.classList.toggle("bg-startup",!w))},y=w=>{const $=!!w.app?.hasDatabase;if(f($),t instanceof HTMLElement&&t.classList.toggle("d-none",$),a instanceof HTMLElement&&a.classList.toggle("d-none",!$),n instanceof HTMLElement&&n.classList.toggle("d-none",!$),r instanceof HTMLElement&&r.classList.toggle("d-none",!$),$){const I=w.app?.activeSection??"dashboard";As(I)}};y(e.state.getState()),Rn((w,$)=>{w.app?.hasDatabase!==$.app?.hasDatabase&&y(w),w.app?.activeSection!==$.app?.activeSection&&w.app?.hasDatabase&&As(w.app.activeSection)}),ft("app:sectionChanged",()=>{})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ps,{once:!0}):Ps();
