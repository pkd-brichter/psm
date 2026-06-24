const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/index.BpLk6Kcg.js","_astro/index.DXWdWzHs.js","_astro/leaflet.C03ySvDx.css","_astro/leaflet-src.BcflbDBd.js","_astro/_commonjsHelpers.Cpj98o6Y.js","_astro/index.CPadEFgJ.js"])))=>i.map(i=>d[i]);
import{M as oe,N as $s,J as nt,O as Lo,P as Do,Q as zs,h as At,l as $o,a as As,s as dt,n as zo,q as Ps,p as Si,e as j,r as Hn,C as On,u as Qe,_ as It,R as Ao,S as Po,w as b,t as N,m as Ei,T as Mo,j as vn,k as Li,U as Co,V as Io,W as Ue,X as Bo,Y as Ms,Z as Cs,H as Is,G as _n,$ as No,a0 as Fo,a1 as To,a2 as qo,a3 as Ho,a4 as en,z as Ua,a5 as Oo,x as _o,a6 as et,a7 as tt,a8 as Ro,a9 as tn,aa as Ko,ab as Wo,D as jo,ac as Bs,ad as Ns,ae as Va,af as Go,ag as Uo,ah as Vo,ai as Di,aj as br,ak as hr,al as Zo,am as Qo,an as Jo,ao as Yo,ap as Xo,aq as el,ar as tl,as as Fs,at as al,au as Ts,av as nl,aw as Yr,ax as Ar,ay as An,az as Xr,aA as rl,aB as il,aC as Rn,aD as $i,aE as sl,aF as zi,aG as Aa,aH as Ai,aI as ol,aJ as Pi,aK as Mi,aL as ll,aM as cl,aN as dl,aO as ul,aP as Pr,v as qs,i as pl,b as fl,c as ml}from"./index.DXWdWzHs.js";const Mr="__psl_history_seeded",Cr=200,Ci=["Salat","Apfel","Wein","Tomate","Kartoffel","Hopfen","Raps","Birne"],Ii=["Spritzung","Düngung","Pflege","Behandlung"],Bi=["LACES","MALDO","VITVI","SOLTU","PRNUS","CUPAR","CYNCR","ALLCE"],Ni=["BBCH 10","BBCH 31","BBCH 41","BBCH 55","BBCH 65","BBCH 71","BBCH 81"],gl=[{mediumId:"seed-water",name:"Wasser",unit:"L",methodId:"perKiste",methodLabel:"pro Kiste",value:.02,zulassungsnummer:"N/A"},{mediumId:"seed-tonikum",name:"Tonikum X",unit:"ml",methodId:"perKiste",methodLabel:"pro Kiste",value:.85,zulassungsnummer:"Z-123456"},{mediumId:"seed-oel",name:"Pflegeöl Y",unit:"ml",methodId:"percentWater",methodLabel:"% vom Wasser",value:.12,zulassungsnummer:"Z-654321"}];function bl(e){if(typeof window>"u")return;const a=new URLSearchParams(window.location.search).has("seedHistory");if(!a)return;const n=window;n.__PSL||(n.__PSL={});const r=n.__PSL;r.seedHistoryEntries=(l=Cr)=>Fi(e,{count:l}),r.resetHistorySeedFlag=()=>localStorage.removeItem(Mr),!a&&!localStorage.getItem(Mr)&&oe()==="sqlite"&&Fi(e,{count:Cr,setFlag:!0}).catch(l=>{console.error("History seeding failed",l)})}async function hl(e){if(!e.state.getState().app?.hasDatabase){if(typeof e.state.subscribe!="function")throw new Error("SQLite-Datenbank ist noch nicht initialisiert.");await new Promise((t,a)=>{const n=window.setTimeout(()=>{s(),a(new Error("SQLite-Datenbank wurde nicht rechtzeitig initialisiert."))},1e4),r=e.state.subscribe?.(l=>{l.app?.hasDatabase&&(s(),t())}),s=()=>{window.clearTimeout(n),typeof r=="function"&&r()}})}}async function Fi(e,t={}){const a=t.count??Cr;if(oe()!=="sqlite")throw new Error("SQLite-Treiber muss aktiv sein, bevor Daten befüllt werden können.");await hl(e);const n=performance.now();let r=0;for(let s=0;s<a;s+=1){const l=vl(s);await $s(l),r+=1}try{await nt()}catch(s){console.warn("Seed-Daten konnten nicht persistent gespeichert werden",s)}return e.events.emit("history:data-changed",{source:"dev-history-seed"}),t.setFlag&&localStorage.setItem(Mr,"1"),{inserted:r,durationMs:performance.now()-n}}function vl(e){const t=new Date;t.setDate(t.getDate()-e);const a=t.toLocaleDateString("de-DE"),n=t.toISOString(),r=20+e%30,s=Number((r*.5).toFixed(2));return{datum:a,dateIso:n,ersteller:`Seeder ${1+e%5}`,standort:`Test-Ort ${String.fromCharCode(65+e%6)}`,kultur:Ci[e%Ci.length],usageType:Ii[e%Ii.length],kisten:r,eppoCode:Bi[e%Bi.length],bbch:Ni[e%Ni.length],gps:`GPS-Notiz ${e}`,gpsCoordinates:{latitude:48+e%10*.01,longitude:11+e%10*.01},gpsPointId:`seed-gps-${e}`,invekos:`INV-${String(1e3+e).padStart(4,"0")}`,uhrzeit:`${String(6+e%12).padStart(2,"0")}:${String(e*7%60).padStart(2,"0")}`,savedAt:n,items:yl(e,r,s)}}function yl(e,t,a){return gl.map((n,r)=>{const s=1+(e+r)%4*.05,l=Number((n.value*s).toFixed(4)),o=Number((l*t).toFixed(2));return{id:`seed-item-${e}-${r}`,name:n.name,unit:n.unit,methodLabel:n.methodLabel,methodId:n.methodId,value:l,total:o,inputs:{kisten:t,waterVolume:a},zulassungsnummer:n.zulassungsnummer,mediumId:n.mediumId}})}let Ut=null,Pa=null,Ti=!1,qi=!1;async function xl(){if(!("serviceWorker"in navigator))return console.warn("[PWA] Service Workers nicht unterstützt"),null;try{return Pa=await navigator.serviceWorker.register("/psm/sw.js",{scope:"/psm/",updateViaCache:"none"}),console.log("[PWA] Service Worker registriert:",Pa.scope),Pa.addEventListener("updatefound",()=>{const e=Pa?.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&(console.log("[PWA] Neues Update verfügbar"),ba("pwa:update-available"))})}),navigator.serviceWorker.addEventListener("message",kl),Ti||(Ti=!0,navigator.serviceWorker.addEventListener("controllerchange",()=>{qi||(qi=!0,window.location.reload())})),Pa}catch(e){return console.error("[PWA] Service Worker Registrierung fehlgeschlagen:",e),null}}function kl(e){const{type:t,payload:a}=e.data||{};switch(t){case"DB_STATE":ba("pwa:db-state",a);break;case"CACHES_CLEARED":ba("pwa:caches-cleared");break}}async function er(e){if(!navigator.serviceWorker.controller){localStorage.setItem("psm-db-state",JSON.stringify({...e,updatedAt:new Date().toISOString()}));return}navigator.serviceWorker.controller.postMessage({type:"SET_DB_STATE",payload:e})}async function Hs(){const e=localStorage.getItem("psm-db-state");if(e)try{return JSON.parse(e)}catch{}return navigator.serviceWorker?.controller?new Promise(t=>{const a=n=>{n.data?.type==="DB_STATE"&&(navigator.serviceWorker.removeEventListener("message",a),t(n.data.payload))};navigator.serviceWorker.addEventListener("message",a),navigator.serviceWorker.controller.postMessage({type:"GET_DB_STATE"}),setTimeout(()=>{navigator.serviceWorker.removeEventListener("message",a),t(null)},1e3)}):null}async function wl(){const e=await Hs();return!!(e?.hasDatabase&&e?.autoStartEnabled)}function Sl(){window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),Ut=e,console.log("[PWA] Install Prompt verfügbar"),localStorage.getItem("psm-app-installed")==="true"&&(console.log("[PWA] Widerspruch erkannt: Flag sagt installiert, aber Prompt verfügbar"),localStorage.removeItem("psm-app-installed"),console.log("[PWA] Veraltetes Installations-Flag entfernt")),ba("pwa:install-available")}),window.addEventListener("appinstalled",()=>{Ut=null,ar(),console.log("[PWA] App installiert - Flag gesetzt"),ba("pwa:installed")})}function tr(){return Ut!==null}function Qt(){return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0}function ei(){const e=navigator.userAgent.toLowerCase();return e.includes("edg/")?"edge":e.includes("chrome")&&!e.includes("edg")?"chrome":e.includes("firefox")?"firefox":e.includes("safari")&&!e.includes("chrome")?"safari":"other"}function ti(){return!!(Qt()||localStorage.getItem("psm-app-installed")==="true"||window.matchMedia("(display-mode: fullscreen)").matches||window.matchMedia("(display-mode: minimal-ui)").matches||window.matchMedia("(display-mode: window-controls-overlay)").matches)}async function Os(){if(ti())return!0;try{if("getInstalledRelatedApps"in navigator){const e=await navigator.getInstalledRelatedApps();if(console.log("[PWA] getInstalledRelatedApps result:",e),e&&e.length>0)return ar(),!0}}catch(e){console.warn("[PWA] getInstalledRelatedApps API Fehler:",e)}return!1}function ar(){localStorage.setItem("psm-app-installed","true"),console.log("[PWA] App als installiert markiert")}function El(){localStorage.removeItem("psm-app-installed"),console.log("[PWA] Installations-Flag entfernt")}function _s(){const e=ei(),t=Qt(),a=ti();return{canInstall:tr(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function Rs(){const e=ei(),t=Qt(),a=await Os();return{canInstall:tr(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function Ll(){if(!Ut)return console.warn("[PWA] Kein Install Prompt verfügbar"),!1;try{await Ut.prompt();const{outcome:e}=await Ut.userChoice;return console.log("[PWA] Install Prompt Ergebnis:",e),e==="accepted"&&ar(),Ut=null,e==="accepted"}catch(e){return console.error("[PWA] Install Prompt fehlgeschlagen:",e),!1}}function Dl(e){if(!("launchQueue"in window)){console.log("[PWA] Launch Queue API nicht verfügbar");return}window.launchQueue?.setConsumer(async t=>{if(!t.files?.length){console.log("[PWA] Launch ohne Dateien");return}console.log("[PWA] Datei via Launch Queue empfangen:",t.files.length);for(const a of t.files)try{await e(a),await er({hasDatabase:!0,fileHandleName:a.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0});break}catch(n){console.error("[PWA] Fehler beim Öffnen der Datei:",n)}}),console.log("[PWA] File Handling initialisiert")}const Tt="psm-file-handles",ai="last-database";async function Ir(e){try{const t=await ni(),n=t.transaction(Tt,"readwrite").objectStore(Tt);await new Promise((r,s)=>{const l=n.put({key:ai,handle:e,savedAt:new Date().toISOString()});l.onsuccess=()=>r(),l.onerror=()=>s(l.error)}),t.close(),console.log("[PWA] FileHandle gespeichert"),await er({hasDatabase:!0,fileHandleName:e.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}catch(t){console.error("[PWA] FileHandle speichern fehlgeschlagen:",t)}}async function Br(){try{const e=await ni(),a=e.transaction(Tt,"readonly").objectStore(Tt),n=await new Promise((s,l)=>{const o=a.get(ai);o.onsuccess=()=>s(o.result),o.onerror=()=>l(o.error)});if(e.close(),!n?.handle)return null;const r=n.handle;return typeof r.queryPermission=="function"&&await r.queryPermission({mode:"readwrite"})==="granted"?(console.log("[PWA] FileHandle mit Berechtigung geladen"),n.handle):(console.log("[PWA] FileHandle gefunden, aber Berechtigung erforderlich"),n.handle)}catch(e){return console.error("[PWA] FileHandle laden fehlgeschlagen:",e),null}}async function $l(e){try{const t=e;return typeof t.requestPermission!="function"?(await e.getFile(),!0):await t.requestPermission({mode:"readwrite"})==="granted"}catch{return!1}}async function zl(){try{const e=await ni(),a=e.transaction(Tt,"readwrite").objectStore(Tt);await new Promise((n,r)=>{const s=a.delete(ai);s.onsuccess=()=>n(),s.onerror=()=>r(s.error)}),e.close(),await er({hasDatabase:!1,autoStartEnabled:!1}),console.log("[PWA] FileHandle gelöscht")}catch(e){console.error("[PWA] FileHandle löschen fehlgeschlagen:",e)}}async function ni(){return new Promise((e,t)=>{const a=indexedDB.open("psm-file-handles",1);a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result),a.onupgradeneeded=n=>{const r=n.target.result;r.objectStoreNames.contains(Tt)||r.createObjectStore(Tt,{keyPath:"key"})}})}function ba(e,t){window.dispatchEvent(new CustomEvent(e,{detail:t}))}function Ks(){return{serviceWorker:"serviceWorker"in navigator,fileSystemAccess:typeof window.showOpenFilePicker=="function",launchQueue:"launchQueue"in window,indexedDB:"indexedDB"in window,standalone:Qt(),installAvailable:tr()}}async function Al(e){if(console.log("[PWA] Initialisierung..."),await xl(),Sl(),e?.onFileOpened&&Dl(e.onFileOpened),e?.onAutoStart&&await wl()){const t=await Br();if(t){const a=t;let n=!1;if(typeof a.queryPermission=="function"&&(n=await a.queryPermission({mode:"readwrite"})==="granted"),n){console.log("[PWA] Auto-Start mit gespeicherter Datei"),e.onFileOpened&&await e.onFileOpened(t);return}console.log("[PWA] Auto-Start: Berechtigung für Datei erforderlich"),ba("pwa:permission-required",{handle:t})}}console.log("[PWA] Capabilities:",Ks())}async function Pl(){if(console.group("🔧 PWA Debug Status"),console.log("📱 Standalone Mode:",Qt()),console.log("💾 localStorage Flag:",localStorage.getItem("psm-app-installed")),console.log("🔔 Install Prompt verfügbar:",tr()),console.log("🌐 Browser:",ei()),console.group("📺 Display Mode Checks"),console.log("standalone:",window.matchMedia("(display-mode: standalone)").matches),console.log("fullscreen:",window.matchMedia("(display-mode: fullscreen)").matches),console.log("minimal-ui:",window.matchMedia("(display-mode: minimal-ui)").matches),console.log("window-controls-overlay:",window.matchMedia("(display-mode: window-controls-overlay)").matches),console.log("browser:",window.matchMedia("(display-mode: browser)").matches),console.groupEnd(),console.group("🔍 getInstalledRelatedApps API"),"getInstalledRelatedApps"in navigator)try{const e=await navigator.getInstalledRelatedApps();console.log("Installierte Apps:",e)}catch(e){console.log("API Fehler:",e)}else console.log("API nicht verfügbar");console.groupEnd(),console.group("📊 Status Vergleich"),console.log("Sync (isProbablyInstalled):",ti()),console.log("Async (checkIfInstalled):",await Os()),console.log("getInstallStatus():",_s()),console.log("getInstallStatusAsync():",await Rs()),console.groupEnd(),console.log("💡 Tipp: clearInstalledFlag() zum Zurücksetzen des Flags"),console.groupEnd()}typeof window<"u"&&(window.pwaDebug=Pl,window.pwaClearFlag=El);let yn=!1;function Ml(e){const t=r=>{if(yn){yn=!1;return}return r.preventDefault(),r.returnValue="",""};let a=!1;const n=r=>{const s=!!r.app?.hasDatabase;s&&!a?(window.addEventListener("beforeunload",t),a=!0):!s&&a&&(window.removeEventListener("beforeunload",t),a=!1)};n(e.getState()),e.subscribe(n),document.addEventListener("click",r=>{const s=r.target.closest("a");s&&s.target==="_blank"&&(yn=!0,setTimeout(()=>{yn=!1},100))})}function Cl(){const e=document.getElementById("app-root");if(!e)throw new Error("app-root Container fehlt");return{startup:e.querySelector('[data-region="startup"]'),shell:e.querySelector('[data-region="shell"]'),main:e.querySelector('[data-region="main"]'),footer:e.querySelector('[data-region="footer"]')}}async function Il(){if(Lo()){window.location.replace("/psm/m/");return}Cl(),Do();const e=zs();e!=="memory"&&At(e),await $o();const t={state:{getState:j,patchState:Si,updateSlice:Qe,subscribe:On},events:{emit:Hn,subscribe:dt}};bl(t),As(),Ml(t.state),Al({onFileOpened:async a=>{const n=await It(()=>import("./index.DXWdWzHs.js").then(s=>s.aR),[]),r=await It(()=>import("./index.DXWdWzHs.js").then(s=>s.aQ),[]);if(r.isSupported()){n.setActiveDriver("sqlite");const s=await a.getFile(),l=await s.arrayBuffer(),o=await r.importFromArrayBuffer(l,s.name);await Ir(a);const{applyDatabase:u}=await It(async()=>{const{applyDatabase:f}=await import("./index.DXWdWzHs.js").then(p=>p.aT);return{applyDatabase:f}},[]);u(o.data),Hn("database:connected",{driver:"sqlite",autoStarted:!0})}}}),dt("database:connected",async a=>{await er({hasDatabase:!0,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}),dt("database:connected",async a=>{if(oe()==="sqlite")try{await zo(),await Ps()}catch(n){console.warn("GPS-Punkte konnten beim Start nicht geladen werden",n)}}),Si({app:{...j().app,ready:!0}})}const Hi="__pflanzenschutz_bootstrapped__",Oi=window;function _i(){Il().catch(e=>{console.error("bootstrap failed",e)})}Oi[Hi]||(Oi[Hi]=!0,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",_i,{once:!0}):_i());const Ws=[{id:"start",label:"Start",icon:"bi-grid-1x2",sections:[{section:"dashboard",label:"Übersicht",icon:"bi-grid-1x2"}]},{id:"psm",label:"PSM",icon:"bi-flower1",sections:[{section:"calc",label:"Neu erfassen",icon:"bi-pencil-square"},{section:"documentation",label:"Übersicht",icon:"bi-list-ul"},{section:"lager",label:"Lager",icon:"bi-box-seam"},{section:"settings",label:"Einstellungen",icon:"bi-gear"}]},{id:"acker",label:"Acker-Planer",icon:"bi-map",sections:[{section:"acker",label:"Karte",icon:"bi-map"},{section:"kultur",label:"Kulturführung",icon:"bi-clipboard2-pulse"}]},{id:"fotos",label:"Fotos",icon:"bi-camera",sections:[{section:"fotos",label:"Fotos",icon:"bi-camera"}]},{id:"daten",label:"Daten",icon:"bi-database",sections:[{section:"daten",label:"Import",icon:"bi-cloud-upload"}]}],js={dashboard:"start",calc:"psm",documentation:"psm",lager:"psm",history:"psm",report:"psm",acker:"acker",kultur:"acker",fotos:"fotos",settings:"psm",gps:"psm",lookup:"psm",import:"daten",daten:"daten"};function Gs(e){return Ws.find(t=>t.id===e)}function Bl(e){const t=js[e];return t?Gs(t):void 0}function Nl(){const e=document.getElementById("offline-indicator");if(!e)return;const t=()=>{const a=!navigator.onLine;e.classList.toggle("d-none",!a)};t(),window.addEventListener("online",t),window.addEventListener("offline",t)}function Ri(e){j().app.activeSection!==e&&(Qe("app",t=>({...t,activeSection:e})),Hn("app:sectionChanged",e))}function Ki(){Nl();const e=document.querySelectorAll(".nav-btn[data-area]"),t=document.getElementById("brand-link"),a=document.getElementById("topnav-tabs"),n=document.getElementById("topnav-area-icon"),r=document.getElementById("topnav-area-label"),s={};for(const h of Ws)s[h.id]=h.sections[0].section;let l=null;function o(h,S){if(a){if(h.sections.length<=1){a.innerHTML="";return}a.innerHTML=h.sections.map(w=>`
        <button type="button" class="topnav-tab${w.section===S?" active":""}" data-section="${w.section}">
          <i class="bi ${w.icon}"></i><span>${w.label}</span>
        </button>`).join("")}}function u(h){a&&a.querySelectorAll(".topnav-tab").forEach(S=>{S.classList.toggle("active",S.dataset.section===h)})}const f=h=>{const S=Gs(h);!S||!j().app.hasDatabase||Ri(s[h]??S.sections[0].section)};e.forEach(h=>{h.addEventListener("click",()=>{const S=h.dataset.area;S&&f(S)})}),t?.addEventListener("click",h=>{h.preventDefault(),f("start")}),a?.addEventListener("click",h=>{const w=h.target?.closest(".topnav-tab")?.dataset.section;w&&Ri(w)});const p=document.querySelector('.nav-btn[data-action="share-data"]');p?.addEventListener("click",()=>{p.disabled=!0,It(async()=>{const{shareMobileData:h}=await import("./index.BpLk6Kcg.js");return{shareMobileData:h}},__vite__mapDeps([0,1])).then(({shareMobileData:h})=>h()).catch(h=>console.error("Teilen fehlgeschlagen",h)).finally(()=>{p.disabled=!1})}),Ao(),dt("history:data-changed",h=>{if(!document.body.classList.contains("mobile-mode"))return;const S=h?.type;(S==="created"||S==="created-bulk")&&Po()});const g=h=>{const S=document.getElementById("brand-title"),w=document.getElementById("brand-tagline"),E=document.getElementById("app-version");S&&h.company.name&&(S.textContent=h.company.name),w&&h.company.headline&&(w.textContent=h.company.headline),E&&h.app.version&&(E.textContent=`v${h.app.version}`);const I=h.app.hasDatabase,V=h.app.activeSection,W=Bl(V);W&&js[V]===W.id&&(s[W.id]=V),e.forEach(ye=>{ye.disabled=!I;const F=I&&W?.id===ye.dataset.area;ye.classList.toggle("active",!!F)}),W&&(n&&(n.className=`bi ${W.icon} topnav-area-icon`),r&&(r.textContent=W.label),l!==W.id?(o(W,V),l=W.id):u(V))};On(g),g(j());let v=!1;const k=document.title||"Pflanzenschutz";window.addEventListener("beforeprint",()=>{v||(v=!0,document.title=" ")}),window.addEventListener("afterprint",()=>{v&&(v=!1,document.title=k)})}function Fl(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ki,{once:!0}):Ki()}Fl();const Tl="https://api.digitale-psm.de",ql="digitale-psm.de";async function Hl(e){try{const t=await fetch(`${Tl}/api/v1/${ql}/views/${e}`,{method:"POST",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`API error: ${t.status}`);return(await t.json()).views}catch(t){return console.warn("[ViewCounter] Fehler beim Zählen:",t),null}}function Ol(e){return e>=1e6?(e/1e6).toFixed(1).replace(".",",")+"M":e>=1e3?(e/1e3).toFixed(1).replace(".",",")+"K":e.toString()}const Nr="pflanzenschutz-datenbank.json";let Wi=!1;function _l(e){return e?`${e.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"pflanzenschutz-datenbank"}.json`:Nr}async function Ma(e,t){if(!e){await t();return}const a=e.textContent??"";e.disabled=!0,e.dataset.busy="true",e.textContent="Bitte warten...";try{await t()}finally{e.disabled=!1,e.dataset.busy="false",e.textContent=a}}function ji(e){return b(e)}function Rl(e){const t=document.createElement("section");t.className="section-container d-none",t.innerHTML=`
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
                <input class="form-control" id="wizard-company-name" name="wizard-company-name" required value="${ji(e.name)}" placeholder="z.B. Gärtnerei Müller" />
              </div>
              <div class="col-md-6">
                <label class="form-label d-block mb-2" for="wizard-company-headline">
                  Überschrift <span class="text-muted small">(optional)</span>
                </label>
                <input class="form-control" id="wizard-company-headline" name="wizard-company-headline" value="${ji(e.headline)}" placeholder="z.B. Pflanzenschutz-Dokumentation 2025" />
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
  `;const a=t.querySelector("#database-wizard-form");if(!a)throw new Error("Wizard-Formular konnte nicht erzeugt werden");const n=t.querySelector('[data-role="wizard-result"]');if(!n)throw new Error("Wizard-Resultat-Container fehlt");return{section:t,form:a,resultCard:n,preview:t.querySelector('[data-role="wizard-preview"]'),filenameLabel:t.querySelector('[data-role="wizard-filename"]'),saveHint:t.querySelector('[data-role="wizard-save-hint"]'),saveButton:t.querySelector('[data-action="wizard-save"]'),reset(){a.reset(),n.classList.add("d-none");const r=t.querySelector('[data-role="wizard-preview"]');r&&(r.textContent="");const s=t.querySelector('[data-role="wizard-filename"]');s&&(s.textContent="")}}}function Kl(e,t){if(!e||Wi)return;const a=e;let n=null,r=Nr,s="landing";const o=t.state.getState().company,u=document.createElement("section");u.className="section-container";function f(T,D){const A=T;u.innerHTML=`
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
  `}f(!1,Qt());const p=Rl(o);a.innerHTML="",a.appendChild(u),a.appendChild(p.section);const g=typeof window<"u"&&typeof window.showSaveFilePicker=="function";p.saveButton&&(g?p.saveHint&&(p.saveHint.textContent='Der Browser fragt nach einem Speicherort. Die erzeugte Datei kannst du später über "Bestehende Datei verbinden" erneut laden.'):(p.saveButton.disabled=!0,p.saveButton.textContent="Datei speichern (nicht verfügbar)",p.saveHint&&(p.saveHint.textContent="Dieser Browser unterstützt keinen direkten Dateidialog. Bitte nutze einen Chromium-basierten Browser (z. B. Chrome, Edge) über HTTPS oder http://localhost.")));function v(T=t.state.getState()){const D=!!T.app?.hasDatabase;if(a.classList.toggle("d-none",D),D){u.classList.add("d-none"),p.section.classList.add("d-none");return}s==="wizard"?(u.classList.add("d-none"),p.section.classList.remove("d-none")):(u.classList.remove("d-none"),p.section.classList.add("d-none"))}async function k(T){await Ma(T,async()=>{try{const D=oe();D==="sqlite"||D==="filesystem"?At(D):At("filesystem")}catch(D){throw N.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),D instanceof Error?D:new Error("Dateisystem nicht verfügbar")}try{const D=await Mo();vn(D.data);const A=D.context;A?.fileHandle&&await Ir(A.fileHandle),t.events.emit("database:connected",{driver:oe()})}catch(D){console.error("Fehler beim Öffnen der Datenbank",D),N.error(D instanceof Error?D.message:"Öffnen der Datenbank fehlgeschlagen")}})}function h(T){Ma(T,async()=>{const D=Ei(),A=["localstorage","sqlite","memory"];for(const ne of A)try{At(ne);const le=await Li(D);vn(le.data),t.events.emit("database:connected",{driver:oe()||ne});return}catch(le){console.warn(`Treiber ${ne} konnte nicht initialisiert werden`,le)}const Y="Keine geeignete Speicheroption verfügbar. Bitte Browserberechtigungen prüfen.";console.error(Y),N.error(Y)})}async function S(T){if(!n){N.warning("Bitte erst die Datenbank erzeugen.");return}await Ma(T,async()=>{try{const D=oe();D==="sqlite"||D==="filesystem"?At(D):At("filesystem")}catch(D){throw N.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),D instanceof Error?D:new Error("Dateisystem nicht verfügbar")}try{const D=await Li(n);vn(D.data),t.events.emit("database:connected",{driver:oe()})}catch(D){console.error("Fehler beim Speichern der Datenbank",D),N.error(D instanceof Error?D.message:"Die Datei konnte nicht gespeichert werden")}})}function w(T){T.preventDefault();const D=new FormData(p.form),A=(D.get("wizard-company-name")||"").toString().trim();if(!A){N.warning("Bitte einen Firmennamen angeben.");return}const Y=(D.get("wizard-company-headline")||"").toString().trim(),ne=(D.get("wizard-company-address")||"").toString().trim();n=Ei({meta:{company:{name:A,headline:Y,logoUrl:"",contactEmail:"",address:ne}}}),r=_l(A),p.preview.textContent=JSON.stringify(n,null,2),p.filenameLabel.textContent=r,p.resultCard.classList.remove("d-none"),p.resultCard.scrollIntoView({behavior:"smooth",block:"start"})}function E(){s="landing",n=null,r=Nr,p.reset(),v()}function I(){s="wizard",v()}async function V(T){await Ma(T,async()=>{try{const D=await Br();if(!D){N.warning("Keine gespeicherte Datei gefunden.");return}if(!await $l(D)){N.warning("Berechtigung zum Zugriff auf die Datei wurde verweigert.");return}At("sqlite");const Y=await D.getFile(),ne=await Y.arrayBuffer(),le=await Co(ne,Y.name);Io(D),vn(le.data),await Ir(D),t.events.emit("database:connected",{driver:"sqlite",autoStarted:!0}),N.success("Datenbank erfolgreich geladen!")}catch(D){console.error("Auto-Start fehlgeschlagen:",D),N.error(D instanceof Error?D.message:"Fehler beim Laden der gespeicherten Datei")}})}async function W(){await zl();const T=u.querySelector("#auto-start-banner");T&&T.classList.add("d-none"),N.info("Gespeicherte Datei wurde vergessen.")}async function ye(T){await Ma(T,async()=>{if(await Ll()){N.success("App wird installiert!");const A=u.querySelector("#pwa-install-banner");A&&A.classList.add("d-none")}})}if(u.addEventListener("click",T=>{const D=T.target?.closest("button[data-action]");if(!D)return;const A=D.dataset.action;if(A==="start-wizard"){I();return}A==="open"?k(D):A==="useDefaults"?h(D):A==="auto-start"?V(D):A==="auto-start-forget"?W():A==="install-pwa"&&ye(D)}),p.form.addEventListener("submit",w),p.section.addEventListener("click",T=>{const D=T.target?.closest("[data-action]");if(!D)return;const A=D.dataset.action;if(A==="wizard-back"){E();return}A==="wizard-save"&&S(D)}),t.state.subscribe(T=>v(T)),v(t.state.getState()),!t.state.getState().app.hasDatabase){const T=zs();if(T&&T!==oe())try{At(T)}catch(D){console.warn("Bevorzugter Speicher konnte nicht gesetzt werden",D)}}(async()=>{const T=await Br(),D=await Hs(),A=!!(T&&D?.hasDatabase),Y=Qt();f(A,Y);const ne=u.querySelector('[data-role="view-count"]');if(ne&&Hl("app").then(ke=>{ke!==null&&(ne.textContent=Ol(ke))}),A&&T){const ke=u.querySelector('[data-role="auto-start-filename"]');ke&&(ke.textContent=`Datei: ${T.name}`)}F(),window.addEventListener("pwa:install-available",()=>{F()}),window.addEventListener("pwa:installed",()=>{ar(),F()}),window.addEventListener("pwa:permission-required",async ke=>{const Je=ke.detail?.handle;if(Je){const Te=u.querySelector("#auto-start-banner"),it=u.querySelector('[data-role="auto-start-filename"]');Te&&it&&(it.textContent=`Datei: ${Je.name} (Berechtigung erforderlich)`,Te.classList.remove("d-none"))}}),console.log("[Startup] PWA Capabilities:",Ks());const le=await Rs();console.log("[Startup] PWA Install Status (async):",le),Q(le)})();function F(){const T=_s();Q(T)}function Q(T){const D=u.querySelector("#pwa-install-banner"),A=u.querySelector('[data-role="pwa-content"]');if(!(!D||!A)){if(!T.showBanner){D.classList.add("d-none");return}D.classList.remove("d-none"),T.isInstalled?A.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-check-circle text-success me-1"></i>App ist bereits installiert
        </p>
        <p class="small mb-0" style="color: var(--text-muted);">
          Öffne die App über dein Desktop- oder Startmenü-Symbol für die beste Erfahrung.
        </p>
      `:T.canInstall?A.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-download me-1"></i>Für schnelleren Zugriff als App installieren
        </p>
        <button class="btn btn-sm btn-outline-light" data-action="install-pwa">
          <i class="bi bi-download me-1"></i>App installieren
        </button>
      `:D.classList.add("d-none")}}Wi=!0}function Us(e){let t=!1,a=!1;const n=o=>{e.onStatusChange&&e.onStatusChange(o)},r=()=>{t||!a||j().app.activeSection!==e.section||e.shouldRefresh&&!e.shouldRefresh()||(a=!1,n("refreshing"),Promise.resolve(e.onRefresh()).catch(u=>{console.error("Auto-Refresh konnte nicht ausgeführt werden",u),a=!0,n("stale")}).finally(()=>{!t&&!a&&n("idle")}))},s=dt(e.event,()=>{e.shouldHandleEvent&&!e.shouldHandleEvent()||(a=!0,n("stale"),r())}),l=dt("app:sectionChanged",o=>{o===e.section&&(a?r():n("idle"))});return j().app.activeSection===e.section&&n("idle"),()=>{t=!0,s(),l()}}const Wl={prev:"Zurück",next:"Weiter",loading:"Lädt …",empty:"Keine Einträge verfügbar"};function Gi(){const e=document.createElement("span");return e.className="spinner-border spinner-border-sm",e.setAttribute("role","status"),e.setAttribute("aria-hidden","true"),e}function Ui(e){const t=document.createElement("div");return t.className="pager-widget__info text-muted small text-center flex-grow-1",t.textContent=e?.trim()||"",t}function an(e,t){if(!e)return null;const a=document.createElement("div");a.className="pager-widget d-flex flex-column gap-2",e.innerHTML="",e.appendChild(a);let n={status:"hidden"},r=!1;const s={...Wl,...t.labels||{}};function l(){a.replaceChildren()}function o(g){const v=Ui(g.info||s.empty);a.replaceChildren(v)}function u(g){const v=document.createElement("div");v.className="alert alert-danger mb-0",v.textContent=g.message||"Unbekannter Fehler",a.replaceChildren(v)}function f(g){const v=document.createElement("div");v.className="pager-widget__controls d-flex flex-column flex-md-row gap-2 align-items-stretch";const k=document.createElement("button");k.type="button",k.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",k.disabled=!g.canPrev||g.loadingDirection==="prev",k.textContent=s.prev,g.loadingDirection==="prev"&&k.prepend(Gi()),k.addEventListener("click",()=>{k.disabled||t.onPrev()});const h=document.createElement("button");h.type="button",h.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",h.disabled=!g.canNext||g.loadingDirection==="next",h.textContent=s.next,g.loadingDirection==="next"&&h.append(Gi()),h.addEventListener("click",()=>{h.disabled||t.onNext()});const S=Ui(g.info||(g.canPrev||g.canNext?s.loading:s.empty));v.append(k,S,h),a.replaceChildren(v)}function p(g){switch(g.status){case"hidden":l();break;case"disabled":o(g);break;case"error":u(g);break;case"ready":f(g);break;default:l();break}}return{update(g){r||(n=g,p(g))},destroy(){r||(r=!0,a.replaceChildren(),e.innerHTML="")},getState(){return n}}}const ri=new Set;let Vi=!1;function jl(){return typeof window>"u"?null:window.__PSL?.debugOverlayApi??null}function Vs(){Vi||typeof window>"u"||(Vi=!0,window.addEventListener("psl:debug-overlay-ready",()=>{ri.forEach(e=>{ii(e)})}))}function ii(e){const t=jl();t?.registerProvider&&(e.handle||(e.handle=t.registerProvider(e.config)),e.handle.update(e.lastMetrics??null))}function Zs(e){const t={config:e,handle:null,lastMetrics:null};return ri.add(t),Vs(),ii(t),t}function Qs(e,t){e.lastMetrics=t,ri.add(e),Vs(),ii(e)}function Js(e){if(e==null)return 0;try{const t=JSON.stringify(e);return t?Number((t.length/1024).toFixed(1)):0}catch{return null}}const Zi=5e3,Qi=50,si=50,Pn=3;function vr(e){if(e==null||e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function Gl(e){if(!e)return null;const t=vr(e.areaHa);if(t!==null)return t;const a=vr(e.areaAr);if(a!==null)return a/100;const n=vr(e.areaSqm);return n!==null?n/1e4:null}function Ul(e,t="–"){const a=Gl(e);return a===null?t:jo(a,2,t)}function Vl(e){return e.toISOString().slice(0,10)}function Kn(e){if(!e)return;if(/^\d{4}-\d{2}-\d{2}$/.test(e))return e;const t=new Date(e);if(!Number.isNaN(t.getTime()))return Vl(t)}function Ji(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function oi(){return{startDate:"",endDate:""}}function Ys(e,t){if(!e)return;const a=e.querySelector("#doc-start"),n=e.querySelector("#doc-end");a&&t.startDate&&(a.value=t.startDate),n&&t.endDate&&(n.value=t.endDate)}function Zl(e,t="sqlite"){if(typeof e=="string")return e.includes(":")?e:/^\d+$/.test(e)?ua(t,Number(e)):e;if(typeof e=="number")return ua(t,e);if(e&&typeof e=="object"){const a=e.source||t;if(typeof e.ref=="string"&&e.ref.includes(":"))return e.ref;const n=Number(e.ref);if(!Number.isNaN(n))return ua(a,n)}return null}function Ql(e){const t=new Set;return e?.length&&e.forEach(a=>{const n=Zl(a);n&&t.add(n)}),t}function Xs(e){const t=e.querySelector('[data-role="doc-focus-banner"]'),a=e.querySelector('[data-role="doc-focus-text"]');if(!t||!a)return;if(!Nt){t.classList.add("d-none");return}const n=Z.startDate&&Z.endDate?`${Z.startDate} - ${Z.endDate}`:"Aktuelle Filter",r=Nt.label||"Importierter Zeitraum",s=Nt.highlightEntryIds.size,l=s?` (${s} markiert)`:"";a.textContent=`${r}: ${n}${l}`,t.classList.remove("d-none")}function Jl(e,t){const a=e.querySelector('[data-role="doc-refresh-indicator"]');if(a){if(a.classList.remove("alert-info","alert-warning"),t==="idle"){a.classList.add("d-none");return}a.classList.remove("d-none"),t==="stale"?(a.classList.add("alert-warning"),a.textContent="Neue Dokumentationseinträge verfügbar. Ansicht aktualisiert sich beim Öffnen."):(a.classList.add("alert-info"),a.textContent="Aktualisiere Dokumentation...")}}function yr(e,t,a={}){Nt&&(Nt=null,Ra=null,Xs(e),a.refreshList&&qt(e,t.state.getState().fieldLabels))}function Yl(e,t){if(!Ra)return;const a=Vt(Ra);a&&(Ra=null,io(e,a,t))}function Xl(e,t,a){if(!a)return;const n=Kn(a.startDate),r=Kn(a.endDate),s=!!a.entryIds?.length;if(!n&&!r&&!s)return;Z={...Z,...n?{startDate:n}:{},...r?{endDate:r}:{}},a.creator!==void 0&&(Z={...Z,creator:a.creator||void 0}),a.crop!==void 0&&(Z={...Z,crop:a.crop||void 0});const l=Ql(a.entryIds);Nt={label:a.label,reason:a.reason,startDate:Z.startDate,endDate:Z.endDate,highlightEntryIds:l},Ra=a.autoSelectFirst&&l.size?l.values().next().value??null:null;const o=e.querySelector("#doc-filter");Ys(o,Z),Xs(e),Fr=!0,Pt(e,t.state.getState()).finally(()=>{Fr=!1})}function ec(){if(typeof window>"u")return{enabled:!1,count:xn};try{const e=new URLSearchParams(window.location.search);if(!e.has("seedHistory"))return{enabled:!1,count:xn};const t=e.get("seedHistory"),a=t?Number(t):Number.NaN;return{enabled:!0,count:Number.isFinite(a)&&a>0?Math.min(Math.round(a),tc):xn}}catch(e){return console.warn("seedHistory Parameter konnte nicht gelesen werden",e),{enabled:!1,count:xn}}}const ut=25,Yi=4,xr=new Intl.NumberFormat("de-DE"),xn=200,tc=2e3,ha=ec();let Xi=!1,ze="memory",Z=oi(),He=0,ve=[],wt=[],ae=0;const ct=new Map,at=new Map([[0,null]]),Ve=new Set,Bt=new Map,da=new Map;let Ge=!1,Ca=null,Ia=0,Nt=null,Fr=!1,Ra=null,Wn=!1,Mn="",jn=!1,kn=null,wn=null,es=null,qe=0,Sn=null,ts=null,lt=null,Ka=!1,as=null;const ac=Zs({id:"documentation",label:"Documentation",budget:{initialLoad:50,maxItems:150}});let eo=null;function ya(e){return e.app?.storageDriver||oe()}function ua(e,t){return`${e}:${t}`}function li(e){const t={},a=Ji(e.startDate,"start"),n=Ji(e.endDate,"end");return a&&(t.startDate=a),n&&(t.endDate=n),e.creator&&(t.creator=e.creator),e.crop&&(t.crop=e.crop),t}function nc(e,t){return{id:ua("state",t),entry:e,source:"state",ref:t}}function rc(e){const t=Number(e?.id??e?.historyId??0),a={...e};return delete a.id,{id:ua("sqlite",t),entry:a,source:"sqlite",ref:t}}function ic(){return ze==="memory"?ve.length:He>0?He:ae*ut+ve.length||null}function sc(){const e=[];if(Ge&&e.push("Lädt …"),lt&&e.push("Fehler"),Nt&&e.push("Fokus aktiv"),ze==="sqlite"&&at.get(ae+1)&&e.push("Weitere Seiten verfügbar"),!!e.length)return e.join(" · ")}function oc(){const e={items:ve.length,totalCount:ic(),cursor:ze==="sqlite"?`Seite ${ae+1}`:null,payloadKb:Js(wt.map(t=>t.entry)),lastUpdated:eo,note:sc()};Qs(ac,e)}function Vt(e){return ve.find(t=>t.id===e)}function nr(e){const t=e.querySelector('[data-role="archive-form"]');if(!t)return;const a=t.querySelector('input[name="archive-start"]'),n=t.querySelector('input[name="archive-end"]');a&&(a.value=Z.startDate||""),n&&(n.value=Z.endDate||"")}function Ce(e,t,a="info"){const n=e.querySelector('[data-role="archive-status"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a}`,n.textContent=t,n.classList.remove("d-none")}}function Tr(e,t){const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(!a)return;const r=!a.classList.contains("d-none"),s=typeof t=="boolean"?t:!r;a.classList.toggle("d-none",!s),n&&(n.textContent=s?"Archiv-Eingaben ausblenden":"Archiv erstellen"),s&&nr(e)}function lc(e){const t=e.querySelector('input[name="archive-start"]'),a=e.querySelector('input[name="archive-end"]');if(!t?.value||!a?.value)return null;const n=e.querySelector('input[name="archive-storage"]'),r=e.querySelector('textarea[name="archive-note"]'),s=e.querySelector('input[name="archive-remove"]');return{startDate:t.value,endDate:a.value,storageHint:n?.value.trim()||void 0,note:r?.value.trim()||void 0,removeAfterExport:s?s.checked:!0}}function ci(e,t){const a=e.querySelector('[data-action="archive-toggle"]'),n=e.querySelector('[data-action="archive-submit"]'),r=e.querySelector('[data-role="archive-form"]'),s=e.querySelector('[data-role="archive-driver-hint"]'),l=ya(t)==="sqlite"&&!!t.app?.hasDatabase;a&&(a.disabled=!l||Wn),n&&(n.disabled=!l||Wn),!l&&r&&r.classList.add("d-none"),s&&(s.textContent=l?"Lokale SQLite-Datenbank aktiv":"Nur mit SQLite verfügbar",s.className=`badge ${l?"bg-success":"bg-secondary"}`),l?di():jn=!1}function ns(e,t){Wn=t;const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(a&&a.querySelectorAll("input, textarea, button").forEach(r=>{if(r.dataset.action==="archive-cancel"&&t){r.setAttribute("disabled","disabled");return}t?r.setAttribute("disabled","disabled"):r.removeAttribute("disabled")}),n&&(n.disabled=t||n.disabled,!t)){const r=j();n.disabled=ya(r)!=="sqlite"||!r.app?.hasDatabase}}function cc(e,t){const a=n=>n?n.replace(/[^0-9-]/g,""):"unbekannt";return`pflanzenschutz-archiv-${a(e)}_${a(t)}.zip`}function dc(e){let t=[];return Qe("archives",a=>{const n=Array.isArray(a?.logs)?a.logs:[];return t=[e,...n].slice(0,si),{...a||{logs:[]},logs:t}}),t}async function di({force:e=!1}={}){if(kn){if(await kn,!e)return}else if(jn&&!e)return;const t=j();if(ya(t)!=="sqlite"||!t.app?.hasDatabase)return;const n=(async()=>{try{const r=await Bo({limit:si});Qe("archives",s=>({...s&&typeof s=="object"?s:{logs:[]},logs:r.items})),jn=!0}catch(r){console.warn("Archive logs could not be loaded",r)}})();kn=n;try{await n}finally{kn=null}}async function uc(e,t){const a=ya(j());if(dc(e),a!=="sqlite"){console.warn("Archive logs require SQLite. Changes stored in memory only.");return}try{const n={...e,metadata:t??void 0};await Oo(n),await nt()}catch(n){console.error("Archive log could not be persisted",n),jn=!1}finally{await di({force:!0})}}function qr(e){return!Array.isArray(e)||!e.length?"[]":e.map(t=>`${t.id}:${t.archivedAt}:${t.entryCount}`).join("|")}function pc(e){return e?Ua(e)||e.slice(0,16).replace("T"," "):"-"}function Za(e,t,a={}){const n=e.querySelector('[data-role="archive-log-list"]');if(!n)return;const r=Array.isArray(t)?t:[];a.resetPage!==!1&&(qe=0);const s=kc(r);if(!s.total){n.innerHTML='<div class="text-muted small">Noch keine Archive erstellt.</div>',ss(e,s);return}const l=s.items.map(o=>{const u=pc(o.archivedAt),f=`${o.startDate||"-"} – ${o.endDate||"-"}`,p=o.entryCount===1?"Eintrag":"Einträge";return`
        <div class="list-group-item border rounded mb-2 p-3" data-action="archive-log-focus" data-log-id="${o.id}" style="cursor: pointer;">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="fs-5 fw-bold mb-1">${b(f)}</div>
              <div class="text-muted">${o.entryCount} ${p} · Erstellt ${b(u)}</div>
            </div>
            <i class="bi bi-chevron-right text-muted fs-4"></i>
          </div>
        </div>
      `}).join("");n.innerHTML=`<div class="list-group list-group-flush">${l}</div>`,ss(e,s)}function rs(e,t){const a=e.archives?.logs;if(Array.isArray(a))return a.find(n=>n.id===t)}async function fc(e){if(e){if(typeof navigator<"u"&&navigator.clipboard&&typeof navigator.clipboard.writeText=="function"){await navigator.clipboard.writeText(e);return}if(typeof document<"u"){const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select(),document.execCommand("copy"),document.body.removeChild(t)}}}async function nn(e){if(da.has(e.id))return da.get(e.id);let t=null;if(e.source==="sqlite")try{t=await _o(e.ref)}catch(a){console.error("History entry fetch failed",a)}else{const a=Ue(j().history);t=(typeof e.ref=="number"?a[e.ref]:void 0)||e.entry}return t&&da.set(e.id,t),t}function to(e){return e&&(e.datum||Ua(e.dateIso)||(typeof e.date=="string"?e.date:""))||""}function mc(e){if(e?.gpsCoordinates){const t=Wo(e.gpsCoordinates);if(t)return t}return""}function gc(e){return e?.gps||""}function Hr(e){if(!e)return null;if(e.dateIso){const n=Bs(e.dateIso);if(n)return new Date(n.getFullYear(),n.getMonth(),n.getDate())}const t=typeof e.datum=="string"&&e.datum||typeof e.date=="string"&&e.date||null;if(!t)return null;const a=t.split(".");if(a.length===3){const[n,r,s]=a.map(Number);if(!Number.isNaN(n)&&!Number.isNaN(r)&&!Number.isNaN(s))return new Date(s,r-1,n)}return null}function bc(e,t){const a=Hr(e);if(t.startDate){const r=new Date(t.startDate);if(r.setHours(0,0,0,0),!a||a<r)return!1}if(t.endDate){const r=new Date(t.endDate);if(r.setHours(23,59,59,999),!a||a>r)return!1}const n=[["creator",e.ersteller],["crop",e.kultur]];for(const[r,s]of n){const o=t[r]?.trim().toLowerCase();if(o&&!`${s||""}`.toLowerCase().includes(o))return!1}return!0}function ui(e){if(!e)return"";const t=r=>r==null?"":String(r),n=(Array.isArray(e.items)?e.items:[]).map(r=>{const s=Object.keys(r).sort().reduce((l,o)=>(l[o]=r[o],l),{});return JSON.stringify(s)}).sort();return JSON.stringify({savedAt:t(e.savedAt),dateIso:t(e.dateIso),datum:t(e.datum),ersteller:t(e.ersteller),standort:t(e.standort),kultur:t(e.kultur),usageType:t(e.usageType),eppoCode:t(e.eppoCode),invekos:t(e.invekos),bbch:t(e.bbch),gps:t(e.gps),gpsPointId:t(e.gpsPointId),areaHa:e.areaHa??null,areaAr:e.areaAr??null,areaSqm:e.areaSqm??null,kisten:e.kisten??null,itemHashes:n})}function ao(e){e.size&&Qe("history",t=>{const a=en(t);if(!a.items.length)return a;let n=!1;const r=a.items.filter(s=>{const l=ui(s);return e.has(l)?(n=!0,!1):!0});return n?{...a,items:r,totalCount:Math.min(a.totalCount,r.length),lastUpdatedAt:new Date().toISOString()}:a})}function hc(e){return e.slice().sort((t,a)=>{const n=Hr(t.entry)?.getTime()||new Date(t.entry.savedAt||0).getTime();return(Hr(a.entry)?.getTime()||new Date(a.entry.savedAt||0).getTime())-n})}function is(){return ze==="sqlite"?He>0?Math.max(Math.ceil(He/ut),1):Math.max(ae+1,ct.size||0):ve.length?Math.max(Math.ceil(ve.length/ut),1):0}function no(){if(ze==="sqlite"){const t=Math.max(is()-1,0);return ae>t&&(ae=t),ae<0&&(ae=0),ae*ut}if(!ve.length)return ae=0,0;const e=Math.max(is()-1,0);return ae>e&&(ae=e),ae<0&&(ae=0),ae*ut}function rr(){if(!ve.length){wt=[];return}if(ze==="sqlite"){wt=ve.slice();return}const e=no(),t=Math.min(e+ut,ve.length);wt=ve.slice(e,t)}function vc(e){if(ct.size<=Yi)return;const t=Array.from(ct.keys()).sort((a,n)=>{const r=Math.abs(a-e);return Math.abs(n-e)-r});for(;ct.size>Yi&&t.length;){const a=t.shift();a==null||a===e||ct.delete(a)}}function yc(e){const t=e.querySelector('[data-role="doc-pager"]');return t?((!wn||es!==t)&&(wn?.destroy(),wn=an(t,{onPrev:()=>Ec(e),onNext:()=>Lc(e),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Dokumentation...",empty:"Keine Einträge"}}),es=t),wn):null}function xc(e){const t=e.querySelector('[data-role="archive-log-pager"]');return t?((!Sn||ts!==t)&&(Sn?.destroy(),Sn=an(t,{onPrev:()=>wc(e),onNext:()=>Sc(e),labels:{prev:"Zurück",next:"Weiter",loading:"Archive werden geladen...",empty:"Keine Einträge"}}),ts=t),Sn):null}function kc(e){const t=e.length;if(!t)return qe=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/Pn),1);qe>=a&&(qe=a-1),qe<0&&(qe=0);const n=qe*Pn,r=Math.min(n+Pn,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function ss(e,t){const a=xc(e);if(a){if(!t.total){a.update({status:"disabled",info:"Noch keine Archive"});return}a.update({status:"ready",info:`Einträge ${t.start+1}–${t.end} von ${t.total}`,canPrev:qe>0,canNext:t.end<t.total})}}function wc(e){if(qe===0)return;qe=Math.max(qe-1,0);const t=j().archives?.logs??[];Za(e,t,{resetPage:!1})}function Sc(e){const t=j().archives?.logs??[],a=t.length;if(!a)return;const n=Math.max(Math.ceil(a/Pn),1);qe>=n-1||(qe=Math.min(qe+1,n-1),Za(e,t,{resetPage:!1}))}function Cn(e){const t=yc(e);if(!t)return;if(lt){t.update({status:"error",message:lt});return}const a=ze==="memory"?ve.length:He,n=wt.length;if(!n){const f=Ge?"Lade Dokumentation...":"Keine Einträge vorhanden.";t.update({status:"disabled",info:f});return}const r=ze==="sqlite"?ae*ut:no(),s=`Einträge ${xr.format(r+1)}–${xr.format(r+n)}${a?` von ${xr.format(a)}`:""}`,l=ze==="memory"?r+n<ve.length:!!at.get(ae+1),o=!Ge&&l,u=ae>0&&!Ge;t.update({status:"ready",info:s,canPrev:u,canNext:o,loadingDirection:Ge&&l?"next":null})}function Or(e){if(!ha.enabled)return;const t=e.querySelector('[data-action="doc-seed"]');t&&(t.disabled=Ka,t.textContent=Ka?"Dummy-Daten werden erstellt...":`+ ${ha.count} Dummy-Einträge`)}function Ec(e){if(ae===0||Ge)return;const t=Math.max(ae-1,0);if(ze==="sqlite"){pi(e,j().fieldLabels,t);return}ae=t,rr(),qt(e,j().fieldLabels),Ja(e,j().fieldLabels)}function Lc(e){if(Ge)return;const t=ae+1;if(ze==="sqlite"){const n=ct.has(t),r=at.get(t);if(!n&&!r)return;pi(e,j().fieldLabels,t);return}t*ut<ve.length&&(ae=t,rr(),qt(e,j().fieldLabels),Ja(e,j().fieldLabels))}function Qa(e){Ve.clear(),Bt.clear(),e&&ir(e)}function Dc(){return ze==="memory"?ve.length:He}function ir(e){const t=e.querySelector('[data-role="doc-selection-info"]'),a=e.querySelector('[data-action="print-selection"]'),n=e.querySelector('[data-action="pdf-selection"]'),r=e.querySelector('[data-action="export-selection"]'),s=e.querySelector('[data-action="export-zip"]'),l=e.querySelector('[data-action="delete-selection"]'),o=Ve.size;t&&(t.textContent=o?`${o} Eintrag${o===1?"":"e"} ausgewählt`:"Keine Einträge ausgewählt");const u=o===0;a&&(a.disabled=u),n&&(n.disabled=u),r&&(r.disabled=u),s&&(s.disabled=u),l&&(l.disabled=u);const f=e.querySelector('[data-action="toggle-select-all"]');if(f){const p=Dc();f.disabled=p===0,f.checked=p>0&&o>=p,f.indeterminate=o>0&&o<p}}function _r(e,t){e.querySelectorAll('[data-role="doc-list"] .doc-sidebar-entry').forEach(n=>{const r=!!(t&&n.dataset.entryId===t);n.classList.toggle("active",r)})}function Ta(e,t,a){const n=e.querySelector("#doc-detail"),r=e.querySelector("#doc-detail-body"),s=e.querySelector('[data-role="doc-detail-card"]'),l=e.querySelector('[data-role="doc-detail-empty"]');if(!n||!r||!s||!l)return;if(!t){n.dataset.entryId="",s.classList.add("d-none"),l.classList.remove("d-none"),r.innerHTML="",_r(e,null);return}n.dataset.entryId=t.entry.id,s.classList.remove("d-none"),l.classList.add("d-none"),_r(e,t.entry.id);const o=a||j().fieldLabels,u=o.history?.tableColumns??{},f=o.history?.detail??{},p=t.detail||t.entry.entry,g=Ro(p.items||[],o,"detail"),v=p.gpsCoordinates?tn(p.gpsCoordinates):null,k=gc(p),h=mc(p),S=f.gpsNote||u.gpsNote||f.gps||u.gps||"GPS-Notiz",w=f.gpsCoordinates||u.gpsCoordinates||f.gps||u.gps||"GPS-Koordinaten",E=h?`${b(h)}${v?` <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${b(v)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:""}`:"-";r.innerHTML=`
    <p>
      <strong>${b(u.date||"Datum")}:</strong> ${b(to(p))}<br />
      <strong>${b(f.creator||"Erstellt von")}:</strong> ${b(p.ersteller||"")}<br />
      <strong>${b(f.location||"Standort")}:</strong> ${b(p.standort||"")}<br />
      <strong>${b(f.crop||"Kultur")}:</strong> ${b(p.kultur||"")}<br />
      <strong>${b(f.usageType||"Art der Verwendung")}:</strong> ${b(p.usageType||"")}<br />
      <strong>${b(f.quantity||"Fläche (ha)")}:</strong> ${b(Ul(p))}<br />
      <strong>${b(f.eppoCode||"EPPO-Code")}:</strong> ${b(p.eppoCode||"")}<br />
      <strong>${b(f.bbch||"BBCH")}:</strong> ${b(p.bbch||"")}<br />
      <strong>${b(f.invekos||"InVeKoS")}:</strong> ${b(p.invekos||"")}<br />
      <strong>${b(S)}:</strong> ${k?b(k):"-"}<br />
      <strong>${b(w)}:</strong> ${E}<br />
      <strong>${b(f.time||"Uhrzeit")}:</strong> ${b(p.uhrzeit||"")}<br />
    </p>
    ${Ko({maschine:p.qsMaschine,schaderreger:p.qsSchaderreger,verantwortlicher:p.qsVerantwortlicher,wetter:p.qsWetter,behandlungsart:p.qsBehandlungsart})}
    <div class="table-responsive">
      ${g}
    </div>
  `}function qt(e,t){rr();const a=e.querySelector('[data-role="doc-list"]');if(!a)return;const r=e.querySelector("#doc-detail")?.dataset.entryId||null;if(!wt.length)a.innerHTML=Ge?'<div class="text-center text-muted py-4">Lädt ...</div>':'<div class="text-center text-muted py-4">Noch keine Einträge</div>';else{a.innerHTML="";const s=document.createDocumentFragment();(t||j().fieldLabels).history?.detail?.usageType,wt.forEach(o=>{const u=document.createElement("div"),f=!!Nt?.highlightEntryIds?.has(o.id);u.className=`doc-sidebar-entry list-group-item${f?" doc-sidebar-entry--highlight":""}`,u.dataset.entryId=o.id;const p=to(o.entry)||"-",g=f?'<span class="badge bg-warning-subtle text-warning-emphasis badge-import">Import</span>':"";u.innerHTML=`
        <div
          class="doc-sidebar-entry__main"
          data-action="view-entry"
          data-entry-id="${o.id}"
        >
          <div class="d-flex justify-content-between gap-2">
            <span class="fw-bold d-flex align-items-center gap-2">
              ${b(o.entry.kultur||"-")}
              ${g}
            </span>
            <small class="text-muted">${b(p)}</small>
          </div>
          <div class="text-muted small mb-1">
            ${b(o.entry.ersteller||"-")} | ${b(o.entry.standort||"-")}
          </div>
          <div class="small text-muted">
            ${b(o.entry.usageType||"-")} · ${b(o.entry.eppoCode||"-")} · ${b(o.entry.invekos||"-")}
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2 gap-2 no-print">
          <button class="btn btn-sm btn-outline-secondary" data-action="print-entry" data-entry-id="${o.id}">Drucken</button>
          <label class="form-check-label d-flex align-items-center gap-2 mb-0">
            <input type="checkbox" class="form-check-input" data-action="toggle-select" data-entry-id="${o.id}" ${Ve.has(o.id)?"checked":""} />
            <span class="small">Auswahl</span>
          </label>
        </div>
      `,s.appendChild(u)}),a.appendChild(s)}_r(e,r),Yl(e,t),Cn(e),ir(e),eo=new Date().toISOString(),oc()}function Ja(e,t){const a=e.querySelector('[data-role="doc-info"]');if(!a)return;const n=He,r=!!(Z.crop||Z.creator);if(!n&&!Ge){a.textContent="Keine Einträge";return}if(!n&&Ge){a.textContent="Lädt...";return}if(Z.startDate&&Z.endDate){const s=`${Z.startDate} - ${Z.endDate} (${n})`;a.textContent=r?`${s} + Filter`:s;return}a.textContent=`Alle Einträge (${n})`}async function ro(e,t){const n=e.querySelector("#doc-detail")?.dataset.entryId;if(!n){Ta(e,null,t);return}const r=Vt(n);if(!r){Ta(e,null,t);return}const s=await nn(r);s?Ta(e,{entry:r,detail:s},t):Ta(e,null,t)}async function pi(e,t,a=ae,n={}){const r=Math.max(0,a),s=!!n.forceReload;s&&(ct.clear(),at.clear(),at.set(0,null),He=0,ve=[],wt=[],ae=0,lt=null);const l=s?void 0:ct.get(r);if(l&&!n.forceReload){ae=r,ve=l,lt=null,qt(e,t),Ja(e),Cn(e);return}const o=at.has(r)?at.get(r)??null:null,u=Symbol("doc-load");Ca=u,Ge=!0,lt=null,Cn(e);try{const f=await Ms({cursor:o,pageSize:ut,filters:li(Z),sortDirection:"desc",includeTotal:s||r===0||He===0});if(Ca!==u)return;const p=f.items.map(g=>rc(g));if(ct.set(r,p),vc(r),at.set(r,o),at.set(r+1,f.nextCursor??null),typeof f.totalCount=="number")He=f.totalCount;else{const g=r*ut+p.length;He=Math.max(He,g)}ae=r,ve=p,lt=null,qt(e,t),Ja(e,t)}catch(f){Ca===u&&(console.error("Dokumentation konnte nicht geladen werden",f),lt="Dokumentation konnte nicht geladen werden. Bitte erneut versuchen.",window.alert("Dokumentation konnte nicht geladen werden. Bitte erneut versuchen."))}finally{Ca===u&&(Ge=!1,Ca=null,Cn(e))}}async function $c(e,t){const a=Ue(t.history);ve=hc(a.map((n,r)=>nc(n,r)).filter(n=>bc(n.entry,Z))),He=ve.length,ae=0,lt=null,rr(),qt(e,t.fieldLabels),Ja(e,t.fieldLabels),await ro(e,t.fieldLabels)}async function Pt(e,t){const a=ya(t),n=!!t.app?.hasDatabase,r=a==="sqlite"&&n;if(ze=r?"sqlite":"memory",da.clear(),ae=0,lt=null,He=0,ve=[],wt=[],ct.clear(),at.clear(),at.set(0,null),Qa(e),ci(e,t),nr(e),Za(e,t.archives?.logs??[]),Mn=qr(t.archives?.logs),r){await pi(e,t.fieldLabels,0,{forceReload:!0}),await ro(e,t.fieldLabels);return}await $c(e,t)}async function kr(){const e=[];for(const t of Ve){const a=Bt.get(t)||Vt(t);if(!a)continue;const n=await nn(a);n&&e.push(n)}return e}async function zc(e,t){if(!t){Qa(e),qt(e,j().fieldLabels);return}if(Ve.clear(),Bt.clear(),ze==="memory")for(const a of ve)Ve.add(a.id),Bt.set(a.id,a);else try{const a=await Cs({filters:li(Z),sortDirection:"desc",limit:1e4}),n=Array.isArray(a.historyIds)?a.historyIds:[];a.entries.forEach((r,s)=>{const l=Number(n[s]);if(!Number.isFinite(l))return;const o=ua("sqlite",l);Ve.add(o),Bt.set(o,{id:o,entry:r,source:"sqlite",ref:l}),da.has(o)||da.set(o,r)})}catch(a){console.error("Alle Einträge konnten nicht ausgewählt werden",a),window.alert("Alle Einträge konnten nicht ausgewählt werden. Bitte erneut versuchen.")}qt(e,j().fieldLabels),ir(e)}async function Ac(e,t){if(!Ve.size)return;const a=Array.from(Ve).map(o=>Bt.get(o)||Vt(o)).filter(o=>!!o),n=[];for(const o of a){const u=await nn(o);u&&n.push(u)}const r=a.filter(o=>o.source==="sqlite"),s=!!r.length;if(s)for(const o of r)await Ho(o.ref);const l=new Set(a.filter(o=>o.source==="state").map(o=>o.ref));if(l.size&&(Qe("history",o=>{const u=en(o),f=u.items.filter((p,g)=>!l.has(g));return f.length===u.items.length?u:{...u,items:f,totalCount:Math.min(u.totalCount,f.length),lastUpdatedAt:new Date().toISOString()}}),await Pc()),n.length){const o=new Set(n.map(u=>ui(u)));ao(o)}if(s){try{await nt()}catch(o){console.warn("SQLite-Datei konnte nach dem Löschen nicht gespeichert werden",o)}t.events?.emit?.("history:data-changed",{type:"deleted",ids:r.map(o=>o.ref)})}Qa(e),await Pt(e,t.state.getState())}async function io(e,t,a){const n=await nn(t);if(!n){window.alert("Details konnten nicht geladen werden.");return}Ta(e,{entry:t,detail:n},a)}async function os(e){const t=await nn(e);t?await so([t]):window.alert("Eintrag konnte nicht geladen werden.")}async function Pc(){const e=oe();if(!(!e||e==="memory"||e==="sqlite"))try{const t=et();await tt(t)}catch(t){throw console.error("Persist history failed",t),window.alert("Historie konnte nicht gespeichert werden. Bitte erneut versuchen."),t}}async function Mc(e,t,a){if(Wn)return;const n=t.state.getState();if(ya(n)!=="sqlite"||!n.app?.hasDatabase){Ce(e,"Archivieren ist nur mit einer lokalen SQLite-Datenbank möglich.","warning");return}const s=lc(a);if(!s?.startDate||!s.endDate){Ce(e,"Bitte Start- und Enddatum für das Archiv wählen.","warning");return}const l=Kn(s.startDate),o=Kn(s.endDate);if(!l||!o){Ce(e,"Die angegebenen Daten sind ungültig.","danger");return}if(new Date(l)>new Date(o)){Ce(e,"Startdatum darf nicht nach dem Enddatum liegen.","danger");return}const u={startDate:l,endDate:o,creator:Z.creator,crop:Z.crop},f=li(u);ns(e,!0),Ce(e,"Prüfe Zeitraum und Eintragsmenge...","info");try{const p=await Ms({cursor:null,pageSize:1,filters:f,sortDirection:"asc",includeTotal:!0}),g=p.totalCount??p.items.length??0;if(!g){Ce(e,"Im angegebenen Zeitraum wurden keine Einträge gefunden.","warning");return}if(g>Zi){Ce(e,`Maximal ${Zi} Einträge pro Archiv erlaubt. Bitte Zeitraum verkürzen.`,"warning");return}Ce(e,`Exportiere ${g} Einträge in ein ZIP-Archiv...`,"info");const v=await Cs({filters:f,limit:g,sortDirection:"asc"}),k=v?.entries??[];if(!k.length){Ce(e,"Archiv konnte nicht erstellt werden – Export lieferte keine Einträge.","danger");return}const h=k.map(D=>({...D})),S={format:"pflanzenschutz-archive",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:h.length,filters:{startDate:l,endDate:o,creator:u.creator||null,crop:u.crop||null},archive:{removeFromDatabase:s.removeAfterExport,storageHint:s.storageHint||null,note:s.note||null}},w=Is({"pflanzenschutz.json":_n(JSON.stringify(h,null,2)),"metadata.json":_n(JSON.stringify(S,null,2))}),E=new ArrayBuffer(w.byteLength);new Uint8Array(E).set(w);const I=new Blob([E],{type:"application/zip"}),V=cc(l,o);fi(I,V);let W=!1;if(s.removeAfterExport){Ce(e,"Export abgeschlossen. Entferne Einträge und bereinige Datenbank...","info"),await No({filters:f});const D=new Set(h.map(A=>ui(A)));ao(D);try{await nt()}catch(A){console.error("SQLite-Datei konnte nach dem Archivieren nicht gespeichert werden",A)}t.events?.emit?.("history:data-changed",{type:"deleted-range",filters:f});try{await Fo()}catch(A){W=!0,console.error("VACUUM fehlgeschlagen",A)}}const ye=new Date().toISOString(),F={id:`archive-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,archivedAt:ye,startDate:l,endDate:o,entryCount:h.length,fileName:V,storageHint:s.storageHint||void 0,note:s.note||void 0};W&&(F.note=F.note?`${F.note} | VACUUM fehlgeschlagen`:"VACUUM fehlgeschlagen");const Q={filters:{...u},removeAfterExport:!!s.removeAfterExport,historyIdSample:v?.historyIds?.slice(0,Qi)};if(await uc(F,Q),!s.removeAfterExport&&v?.historyIds?.length){const D=v.historyIds.slice(0,Qi).map(A=>({source:"sqlite",ref:A}));t.events?.emit?.("documentation:focus-range",{startDate:l,endDate:o,label:"Archiviert",reason:"archive",entryIds:D})}Tr(e,!1),a.reset(),nr(e),await Pt(e,t.state.getState());const T=s.removeAfterExport?`Archiv ${V} erstellt und ${h.length} Einträge entfernt.`:`Archiv ${V} erstellt. ${h.length} Einträge bleiben in der Datenbank.`;Ce(e,T,W?"warning":"success")}catch(p){console.error("Archivieren fehlgeschlagen",p);const g=p instanceof Error?p.message:"Archiv konnte nicht erstellt werden.";Ce(e,g,"danger")}finally{ns(e,!1),ci(e,t.state.getState())}}const Cc=50;async function so(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}if(e.length>Cc&&!window.confirm(`Sie möchten ${e.length} Einträge drucken. Bei sehr vielen Einträgen kann das Erstellen der Druckvorschau einige Sekunden dauern und lässt sich nicht unterbrechen.

Fortfahren?`))return;const t=j().fieldLabels,a=To(j().company||null);await qo(e,t,{title:"Dokumentation",headerHtml:a,chunkSize:25})}function fi(e,t){const a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download=t,n.click(),URL.revokeObjectURL(a)}function Ic(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const t=e.map(l=>({...l})),a=JSON.stringify(t,null,2),n=new TextEncoder().encode(a),r=new Blob([n],{type:"application/json; charset=utf-8"}),s=new Date().toISOString().replace(/[:.]/g,"-");fi(r,`pflanzenschutz-dokumentation-${s}.json`)}async function Bc(e,t){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const a=e.map(u=>({...u})),n={format:"pflanzenschutz-export",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:a.length,filters:{startDate:t.startDate||null,endDate:t.endDate||null,creator:t.creator||null,crop:t.crop||null}},r=Is({"pflanzenschutz.json":_n(JSON.stringify(a,null,2)),"metadata.json":_n(JSON.stringify(n,null,2))}),s=new ArrayBuffer(r.byteLength);new Uint8Array(s).set(r);const l=new Blob([s],{type:"application/zip"}),o=new Date().toISOString().replace(/[:.]/g,"-");fi(l,`pflanzenschutz-dokumentation-${o}.zip`)}function Nc(){const e=document.createElement("div"),t=oi(),a=Z.startDate||t.startDate||"",n=Z.endDate||t.endDate||"";Z={...Z,startDate:a,endDate:n};const r=ha.enabled?`<button class="btn btn-outline-info btn-sm" type="button" data-action="doc-seed">+ ${ha.count} Dummy-Einträge</button>`:"";return e.className="section-inner",e.innerHTML=`
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
            <small class="text-muted">Letzte ${si}</small>
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
  `,e}function Fc(e){if(!e)return{};const t=new FormData(e),a=r=>{const s=t.get(r);return typeof s=="string"&&s?s:void 0},n=r=>{const s=t.get(r);if(typeof s!="string")return;const l=s.trim();return l||void 0};return{startDate:a("doc-start"),endDate:a("doc-end"),crop:n("doc-crop"),creator:n("doc-creator")}}let ls="entries";function Tc(e,t){ls!==t&&(ls=t,e.querySelectorAll("[data-doc-tab]").forEach(a=>{a.classList.toggle("active",a.dataset.docTab===t)}),e.querySelectorAll("[data-pane]").forEach(a=>{a.style.display=a.dataset.pane===t?"block":"none"}))}function qc(e,t){e.addEventListener("click",a=>{const n=a.target.closest("[data-doc-tab]");if(n&&n.dataset.docTab){Tc(e,n.dataset.docTab);return}}),e.addEventListener("submit",a=>{if(a.target instanceof HTMLFormElement){if(a.target.id==="doc-filter"){a.preventDefault(),yr(e,t,{refreshList:!0});const n=Fc(a.target);if(!n.startDate||!n.endDate){window.alert("Bitte Start- und Enddatum auswählen.");return}Z=n,Qa(e),Pt(e,t.state.getState());return}a.target.dataset.role==="archive-form"&&(a.preventDefault(),Mc(e,t,a.target))}}),e.addEventListener("click",a=>{const n=a.target;if(!n)return;const r=n.dataset.action;if(!r){n.closest("[data-action]")&&a.stopPropagation();return}if(r==="reset-filters"){const o=e.querySelector("#doc-filter");o?.reset(),Z=oi(),Ys(o??null,Z),yr(e,t,{refreshList:!0}),Qa(e),Pt(e,t.state.getState());return}if(r==="archive-toggle"){Tr(e),Ce(e,"");return}if(r==="archive-cancel"){Tr(e,!1),Ce(e,"");return}if(r==="archive-log-focus"){const o=n.dataset.logId;if(!o)return;const u=rs(t.state.getState(),o);if(!u){window.alert("Archiv-Eintrag nicht gefunden.");return}const f=u.fileName?`Archiv ${u.fileName}`:"Archivierter Zeitraum";typeof t.events?.emit=="function"?t.events.emit("documentation:focus-range",{startDate:u.startDate,endDate:u.endDate,label:f,reason:"archive-log"}):(Z={...Z,startDate:u.startDate,endDate:u.endDate},Pt(e,t.state.getState())),Ce(e,`Dokumentation auf Archiv ${u.startDate} – ${u.endDate} fokussiert.`,"success");return}if(r==="archive-log-copy-hint"){const o=n.dataset.logId;if(!o)return;const u=rs(t.state.getState(),o);if(!u||!u.storageHint){window.alert("Kein Speicherhinweis vorhanden.");return}const f=u.storageHint;(async()=>{try{await fc(f),Ce(e,"Speicherhinweis kopiert.","success")}catch(p){console.error("Hinweis konnte nicht kopiert werden",p),window.alert("Hinweis konnte nicht kopiert werden.")}})();return}if(r==="doc-focus-clear"){yr(e,t,{refreshList:!0});return}if(r==="print-selection"||r==="pdf-selection"){(async()=>{const o=await kr();await so(o)})();return}if(r==="export-selection"){(async()=>{const o=await kr();Ic(o)})();return}if(r==="export-zip"){(async()=>{const o=await kr();await Bc(o,Z)})();return}if(r==="delete-selection"){if(!Ve.size||!window.confirm("Ausgewählte Einträge wirklich löschen?"))return;Ac(e,t);return}if(r==="doc-seed"){if(!ha.enabled||Ka)return;const u=window.__PSL?.seedHistoryEntries;if(typeof u!="function"){window.alert("Seed-Funktion ist nicht verfügbar. Bitte Entwicklungsmodus verwenden.");return}Ka=!0,Or(e),(async()=>{try{await u(ha.count),await Pt(e,t.state.getState())}catch(f){console.error("Dummy-Daten konnten nicht erstellt werden",f),window.alert("Dummy-Daten konnten nicht erstellt werden.")}finally{Ka=!1,Or(e)}})();return}if(r==="detail-print"){const u=e.querySelector("#doc-detail")?.dataset.entryId;if(!u){window.alert("Kein Eintrag ausgewählt.");return}const f=Vt(u);if(!f){window.alert("Eintrag nicht verfügbar.");return}os(f);return}const s=n.dataset.entryId;if(!s)return;const l=Vt(s);if(!l){window.alert("Eintrag nicht verfügbar.");return}if(r==="view-entry"){io(e,l,t.state.getState().fieldLabels);return}if(r==="print-entry"){os(l);return}}),e.addEventListener("change",a=>{const n=a.target;if(!n)return;if(n.dataset.action==="toggle-select-all"){zc(e,n.checked);return}if(n.dataset.action!=="toggle-select")return;const r=n.dataset.entryId;if(r){if(n.checked){Ve.add(r);const s=Vt(r);s&&Bt.set(r,s)}else Ve.delete(r),Bt.delete(r);ir(e)}})}function Hc(e,t){if(!e||Xi)return;const a=e;a.innerHTML="";const n=Nc();a.appendChild(n),qc(n,t),Or(n),ci(n,t.state.getState()),nr(n);const r=t.state.getState().archives?.logs??[];Za(n,r),Mn=qr(r),di(),typeof t.events?.subscribe=="function"&&t.events.subscribe("documentation:focus-range",o=>{!o||typeof o!="object"||Xl(n,t,o)});const s=o=>Ue(o.history).length,l=()=>Pt(n,t.state.getState());as?.(),as=Us({section:"documentation",event:"history:data-changed",shouldHandleEvent:()=>ze==="sqlite",shouldRefresh:()=>ze==="sqlite",onRefresh:()=>l(),onStatusChange:o=>Jl(n,o)}),Ia=s(t.state.getState()),l(),t.state.subscribe(o=>{const u=qr(o.archives?.logs);u!==Mn&&(Mn=u,Za(n,o.archives?.logs??[]));const f=s(o);if(Fr){Ia=f;return}if(ze==="sqlite"){Ia=f;return}f!==Ia&&(Ia=f,l())}),Xi=!0}const Ya=e=>Ue(e.gps.points),qa=e=>Ue(e.points),Oc=new Intl.NumberFormat("de-DE",{minimumFractionDigits:5,maximumFractionDigits:5}),_c=new Intl.DateTimeFormat("de-DE",{dateStyle:"short",timeStyle:"short"}),cs="Deutschland";let ds=!1,oo="list",En=null,$=null,Ba=null,us=null;const In=25,wr=new Intl.NumberFormat("de-DE");let Ie=0,sa=null,Rr=null,ps=null;function ra(e,t){typeof e.events?.emit=="function"&&e.events.emit("history:gps-activation-result",{...t,source:"gps",timestamp:Date.now()})}function Wa(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Rc(){const e=document.createElement("section");return e.className="section-inner",e.innerHTML=`
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
  `,e}function Kc(e){return{root:e,message:e.querySelector('[data-role="gps-message"]'),refreshIndicator:e.querySelector('[data-role="gps-refresh-indicator"]'),availability:e.querySelector('[data-role="gps-availability"]'),tabButtons:Array.from(e.querySelectorAll('[data-role="gps-tab"]')),panels:Array.from(e.querySelectorAll('[data-role="gps-panel"]')),listBody:e.querySelector('[data-role="gps-list"]'),emptyState:e.querySelector('[data-role="gps-empty"]'),activeInfo:e.querySelector('[data-role="gps-active-info"]'),summaryLabel:e.querySelector('[data-role="gps-summary"]'),statusBadge:e.querySelector('[data-role="gps-status"]'),form:e.querySelector('[data-role="gps-form"]'),formFields:{name:e.querySelector('[name="gps-name"]'),description:e.querySelector('[name="gps-description"]'),latitude:e.querySelector('[name="gps-latitude"]'),longitude:e.querySelector('[name="gps-longitude"]'),source:e.querySelector('[name="gps-source"]'),activate:e.querySelector('[name="gps-activate"]'),rawCoordinates:e.querySelector('[name="gps-raw-coordinates"]')},disableTargets:Array.from(e.querySelectorAll("[data-gps-disable]")),geolocationBtn:e.querySelector('[data-action="use-geolocation"]'),mapButton:e.querySelector('[data-role="gps-open-maps"]'),verifyButton:e.querySelector('[data-action="verify-coords"]')}}function Ha(e){return`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e)}`}function lo(e){const t=e.gps,a=qa(t),n=l=>{if(!l)return null;const o=tn(l)||Ha(`${l.latitude},${l.longitude}`),u=l.name?`${l.name}`:`${va(l.latitude)}, ${va(l.longitude)}`;return{url:o,label:u}};if(t.activePointId){const l=a.find(u=>u.id===t.activePointId),o=n(l||null);if(o)return o}if(a.length>0){const l=n(a[0]);if(l)return l}const r=e.company?.address?.trim();if(r)return{url:Ha(r.replace(/\n/g,", ")),label:r};const s=e.company?.name?.trim();return s?{url:Ha(s),label:s}:{url:Ha(cs),label:cs}}function Wc(e){if(!$)return;const t=lo(e);$.mapButton&&($.mapButton.href=t.url,$.mapButton.title=`Google Maps öffnen (${t.label})`);const a=$.root.querySelector('[data-role="gps-empty-map-link"]');a&&(a.href=t.url)}function jc(e){if(!e)return null;const a=e.trim().replace(/\s+/g," ").replace(/[,;]/g," ").match(/-?\d+(?:[.,]\d+)?/g);if(!a||a.length<2)return null;const n=l=>Number(l.replace(/,/g,".")),r=n(a[0]),s=n(a[1]);return!Number.isFinite(r)||!Number.isFinite(s)||r<-90||r>90||s<-180||s>180?null:{latitude:r,longitude:s}}function Gc(){if(!$?.formFields)return null;const e=$.formFields.latitude?.value??"",t=$.formFields.longitude?.value??"";if(!e.trim()||!t.trim())return null;const a=Number(e),n=Number(t);return!Number.isFinite(a)||!Number.isFinite(n)||a<-90||a>90||n<-180||n>180?null:{latitude:a,longitude:n}}function Ln(e){return Number(e).toFixed(6)}function Uc(e,t){const a=Ln(e),n=Ln(t);return Ya(j()).some(r=>Ln(r.latitude)===a&&Ln(r.longitude)===n)}function ja(){if(!$?.verifyButton)return;const e=Gc(),t=!!e;if($.verifyButton.disabled=!t,e){const a=tn({latitude:e.latitude,longitude:e.longitude});$.verifyButton.dataset.targetUrl=a||Ha(`${e.latitude},${e.longitude}`)}else delete $.verifyButton.dataset.targetUrl}function va(e){const t=Number(e);return Number.isFinite(t)?`${Oc.format(t)}°`:"–"}function Vc(e){if(!e)return"–";const t=new Date(e);return Number.isNaN(t.getTime())?"–":_c.format(t)}function se(e,t="info",a=4500){if($?.message){if(En&&(window.clearTimeout(En),En=null),!e){$.message.classList.add("d-none"),$.message.textContent="";return}$.message.className=`alert alert-${t}`,$.message.textContent=e,$.message.classList.remove("d-none"),a>0&&(En=window.setTimeout(()=>{$?.message?.classList.add("d-none")},a))}}function Zc(e){const t=$?.refreshIndicator;if(t){if(t.classList.remove("alert-warning","alert-info"),e==="idle"){t.classList.add("d-none");return}t.classList.remove("d-none"),e==="stale"?(t.classList.add("alert-warning"),t.textContent="GPS-Daten wurden geändert. Ansicht aktualisiert sich beim Öffnen."):(t.classList.add("alert-info"),t.textContent="GPS-Daten werden aktualisiert...")}}function co(e){$&&(oo=e,$.tabButtons.forEach(t=>{const a=t.dataset.tab===e;t.classList.toggle("active",a)}),$.panels.forEach(t=>{const a=t.getAttribute("data-panel")===e;t.classList.toggle("d-none",!a)}))}function Ze(e){return e?.hasDatabase?e.storageDriver!=="sqlite"?"wrong-driver":"ok":"no-db"}function Qc(e){if($?.availability){if(e==="ok"){$.availability.classList.add("d-none"),$.availability.textContent="";return}$.availability.classList.remove("d-none"),$.availability.textContent=e==="no-db"?"Bitte verbinden Sie zuerst eine Datenbank, um GPS-Punkte zu verwalten.":"GPS-Funktionen benötigen eine aktive SQLite-Datenbank. Bitte den SQLite-Treiber in den Einstellungen auswählen."}}function pa(e,t){if(!$)return;const a=t!=="ok"||e.pending||Va.isLocked();if($.disableTargets.forEach(n=>{(n instanceof HTMLButtonElement||n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n instanceof HTMLSelectElement)&&(n.disabled=a)}),$.statusBadge){let n="badge bg-success",r="Bereit";t==="no-db"?(n="badge bg-secondary",r="Keine Datenbank"):t==="wrong-driver"?(n="badge bg-warning text-dark",r="Nur mit SQLite"):(e.pending||Va.isLocked())&&(n="badge bg-info text-dark",r="Wird verarbeitet"),$.statusBadge.className=n,$.statusBadge.textContent=r}}function uo(e){const t=e.length;if(!t)return Ie=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/In),1);Ie>=a&&(Ie=a-1),Ie<0&&(Ie=0);const n=Ie*In,r=Math.min(n+In,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function Jc(){if(!$?.root)return null;const e=$.root.querySelector('[data-role="gps-pager"]');return e?((!sa||Rr!==e)&&(sa?.destroy(),sa=an(e,{onPrev:()=>Xc(),onNext:()=>ed(),labels:{prev:"Zurück",next:"Weiter",loading:"GPS-Punkte werden geladen...",empty:"Keine GPS-Punkte verfügbar"}}),Rr=e),sa):null}function fs(e,t){const a=Jc();if(!a)return;if(t!=="ok"){Ie=0;const l=t==="no-db"?"Keine Datenbank verbunden.":"Nur mit SQLite verfügbar.";a.update({status:"disabled",info:l});return}const n=Ya(e).length;if(!n){Ie=0;const l=e.gps.initialized?"Noch keine GPS-Punkte vorhanden.":"GPS-Punkte werden geladen...";a.update({status:"disabled",info:l});return}const{start:r,end:s}=uo(Ya(e));a.update({status:"ready",info:`Einträge ${wr.format(r+1)}–${wr.format(s)} von ${wr.format(n)}`,canPrev:Ie>0,canNext:s<n})}function Yc(e,t){return e.length?e.map(a=>{const n=a.id===t,r=a.description?`<div class="text-muted small">${b(a.description)}</div>`:"",s=a.source?`<span class="badge-psm badge-psm-neutral">${b(a.source)}</span>`:'<span class="text-muted">–</span>',l=n?'<span class="badge bg-success ms-2">Aktiv</span>':"",o=tn(a),u=o?`<a class="btn btn-outline-info" href="${Wa(o)}" target="_blank" rel="noopener noreferrer">
              Karte
            </a>`:"";return`
        <tr data-point-id="${Wa(a.id)}">
          <td>
            <div class="fw-semibold">${b(a.name||"Ohne Namen")}${l}</div>
            ${r}
          </td>
          <td class="font-monospace">
            <div>${va(a.latitude)}</div>
            <div>${va(a.longitude)}</div>
          </td>
          <td>
            <div>${s}</div>
            <div class="text-muted small">${Vc(a.updatedAt)}</div>
          </td>
          <td class="text-end">
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-success" data-action="set-active" ${n?"disabled":""}>
                Aktivieren
              </button>
              ${u}
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
`):""}function mi(e,t){if(!$)return;const a=e.gps,n=lo(e),r=t==="ok";if($.summaryLabel){const s=qa(a).length;$.summaryLabel.textContent=r?`${s} Punkt${s===1?"":"e"} gespeichert`:"Funktion derzeit nicht verfügbar"}if(!r){$.listBody&&($.listBody.innerHTML=""),$.emptyState&&($.emptyState.textContent=t==="no-db"?"Keine Datenbank verbunden.":"Bitte SQLite als Speicher-Treiber aktivieren.",$.emptyState.classList.remove("d-none")),$.activeInfo&&($.activeInfo.textContent=t==="no-db"?"Wartet auf Datenbank.":"Nur mit SQLite verfügbar."),fs(e,t);return}if($.listBody){const{items:s}=uo(qa(a));$.listBody.innerHTML=Yc(s,a.activePointId)}if($.emptyState){const s=qa(a).length>0;$.emptyState.classList.toggle("d-none",s),!s&&a.initialized?$.emptyState.innerHTML=`
        <p class="mb-2">Noch keine GPS-Punkte vorhanden.</p>
        <p class="small text-muted mb-3">
          Nutzen Sie "Neuer Punkt" oder öffnen Sie Google Maps, um Koordinaten zu ermitteln.
        </p>
        <a class="btn btn-outline-info btn-sm" data-role="gps-empty-map-link" href="${Wa(n.url)}" target="_blank" rel="noopener noreferrer">
          <i class="bi bi-box-arrow-up-right me-1"></i>
          Google Maps öffnen
        </a>
      `:a.initialized||($.emptyState.textContent="GPS-Punkte werden geladen...")}if($.activeInfo)if(a.activePointId){const s=qa(a).find(l=>l.id===a.activePointId);if(s){const l=`${s.name||"Ohne Namen"} (${va(s.latitude)}, ${va(s.longitude)})`,o=tn(s);o?$.activeInfo.innerHTML=`${b(l)} <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${Wa(o)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:$.activeInfo.textContent=l}else $.activeInfo.textContent="Aktiver Punkt nicht gefunden."}else $.activeInfo.innerHTML=`Kein aktiver Punkt ausgewählt. <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${Wa(n.url)}" target="_blank" rel="noopener noreferrer">Google Maps öffnen</a>`;fs(e,t)}function Xc(){if(Ie===0)return;Ie=Math.max(Ie-1,0);const e=j(),t=Ze(e.app);mi(e,t)}function ed(){const e=j(),t=Ya(e).length;if(!t)return;const a=Math.max(Math.ceil(t/In)-1,0);if(Ie>=a)return;Ie=Math.min(Ie+1,a);const n=Ze(e.app);mi(e,n)}function Fe(e){`${new Date().toLocaleString("de-DE")}${e}`}function rn(e){if(!e)return null;const t=j();return Ya(t).find(a=>a.id===e)||null}async function td(e){if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(e);return}const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}function ad(){if(!$?.formFields?.rawCoordinates)return;const e=$.formFields.rawCoordinates.value,t=jc(e);if(!t){se("Koordinaten konnten nicht erkannt werden. Bitte Format 47.68952, 9.12091 verwenden.","warning",6e3);return}const a=t.latitude.toFixed(6),n=t.longitude.toFixed(6);$.formFields.latitude&&($.formFields.latitude.value=a),$.formFields.longitude&&($.formFields.longitude.value=n),se("Koordinaten übernommen.","success"),ja()}function nd(){if(!$?.verifyButton)return;const e=$.verifyButton.dataset.targetUrl;if(!e){se("Bitte zuerst gültige Koordinaten eintragen, bevor die Prüfung geöffnet wird.","warning",6e3);return}window.open(e,"_blank","noopener,noreferrer")}async function Kr(e={}){const{notify:t=!1}=e;if(!(!$||Ze(j().app)!=="ok"||j().gps.pending))try{await Ps(),t&&se("GPS-Punkte aktualisiert.","success"),Fe("GPS-Punkte synchronisiert.")}catch(n){const r=n instanceof Error?n.message:"GPS-Punkte konnten nicht geladen werden.";se(r,"danger",7e3),Fe(`Fehler beim Laden: ${r}`)}}async function rd(e){if(!e)return;const t=rn(e);if(!t){se("Ausgewählter GPS-Punkt wurde nicht gefunden.","warning");return}try{await Ns(t.id),se(`"${t.name}" ist nun aktiv.`,"success"),Fe(`Aktiver GPS-Punkt: ${t.name}`)}catch(a){const n=a instanceof Error?a.message:"GPS-Punkt konnte nicht aktiviert werden.";se(n,"danger",7e3),Fe(`Fehler beim Aktivieren: ${n}`)}}async function id(e){if(!e)return;const t=rn(e);if(!t){se("GPS-Punkt existiert nicht mehr.","warning");return}if(window.confirm(`"${t.name}" wirklich löschen? Dieser Schritt kann nicht rückgängig gemacht werden.`))try{await Go(t.id),se(`"${t.name}" wurde gelöscht.`,"success"),Fe(`GPS-Punkt gelöscht: ${t.name}`)}catch(n){const r=n instanceof Error?n.message:"GPS-Punkt konnte nicht gelöscht werden.";se(r,"danger",7e3),Fe(`Löschen fehlgeschlagen: ${r}`)}}async function sd(e){if(!e)return;const t=rn(e);if(!t){se("GPS-Punkt nicht gefunden.","warning");return}const a=`${t.latitude}, ${t.longitude}`;try{await td(a),se("Koordinaten in die Zwischenablage kopiert.","success")}catch(n){console.error("clipboard error",n),se("Koordinaten konnten nicht kopiert werden.","danger",7e3)}}async function od(e,t){const a=(e||"").trim();if(!a){ra(t,{status:"error",id:"",message:"Ungültige GPS-Anfrage ohne ID."});return}if(Ze(j().app)!=="ok"){se("GPS-Modul ist ohne aktive SQLite-Datenbank nicht verfügbar.","warning",6e3),ra(t,{status:"error",id:a,message:"GPS-Modul ist derzeit nicht verfügbar."});return}const r=rn(a);if(!r){se("Verknüpfter GPS-Punkt wurde nicht gefunden.","warning",6e3),ra(t,{status:"error",id:a,message:"Verknüpfter GPS-Punkt wurde nicht gefunden."});return}ra(t,{status:"pending",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wird aktiviert...`});try{await Ns(r.id),se(`"${r.name||"Ohne Namen"}" wurde aus der Historie aktiviert.`,"success"),Fe(`Aus Historie aktiviert: ${r.name||r.id}`),ra(t,{status:"success",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wurde aktiviert.`})}catch(s){const l=s instanceof Error?s.message:"GPS-Punkt konnte nicht aktiviert werden.";se(l,"danger",7e3),Fe(`Aktivierung aus Historie fehlgeschlagen: ${l}`),ra(t,{status:"error",id:r.id,name:r.name,message:l})}}async function ld(){try{await Uo(),Fe("Aktiver GPS-Punkt synchronisiert."),se("Aktiver GPS-Punkt wurde synchronisiert.","success")}catch(e){const t=e instanceof Error?e.message:"Aktiver GPS-Punkt konnte nicht ermittelt werden.";se(t,"danger",7e3),Fe(`Sync fehlgeschlagen: ${t}`)}}function cd(){if(!$?.formFields)throw new Error("Formular nicht initialisiert");const e=$.formFields.name?.value.trim()||"",t=$.formFields.description?.value.trim()||"",a=$.formFields.source?.value.trim()||"",n=Number($.formFields.latitude?.value),r=Number($.formFields.longitude?.value),s=!!$.formFields.activate?.checked;if(!e)throw new Error("Name darf nicht leer sein.");if(!Number.isFinite(n)||!Number.isFinite(r))throw new Error("Koordinaten sind ungültig.");return{name:e,description:t,latitude:n,longitude:r,source:a,activate:s}}async function dd(e){if(e.preventDefault(),Va.isLocked()){se("Speichern läuft bereits ...","info");return}try{const t=cd();if(Uc(t.latitude,t.longitude)){se("Ein GPS-Punkt mit identischen Koordinaten ist bereits vorhanden.","warning",6e3);return}pa(j().gps,Ze(j().app)),await Vo({name:t.name,description:t.description||null,latitude:t.latitude,longitude:t.longitude,source:t.source||null},{activate:t.activate}),N.success(`GPS-Punkt "${t.name}" gespeichert.`),Fe(`GPS-Punkt gespeichert${t.activate?" und aktiv gesetzt":""}: ${t.name}`),$?.form?.reset()}catch(t){const a=t instanceof Error?t.message:"GPS-Punkt konnte nicht gespeichert werden.";N.error(a),Fe(`Speichern fehlgeschlagen: ${a}`)}finally{pa(j().gps,Ze(j().app))}}function ud(){if($?.formFields){if(!navigator.geolocation){N.warning("Geolocation wird von diesem Browser nicht unterstützt.");return}if(Va.isLocked()){N.info("Bitte warten...");return}Va.acquire(async()=>(pa(j().gps,Ze(j().app)),new Promise(e=>{navigator.geolocation.getCurrentPosition(t=>{const{latitude:a,longitude:n}=t.coords;$?.formFields.latitude&&($.formFields.latitude.value=a.toFixed(6)),$?.formFields.longitude&&($.formFields.longitude.value=n.toFixed(6)),$?.formFields.source&&!$.formFields.source.value.trim()&&($.formFields.source.value="Browser"),N.success("Koordinaten aus Browser-Position übernommen."),Fe("Browser-Geolocation übernommen"),ja(),pa(j().gps,Ze(j().app)),e()},t=>{const a=t.code===t.PERMISSION_DENIED?"Zugriff auf Standort wurde verweigert.":"Geolocation konnte nicht ermittelt werden.";N.warning(a),Fe(`Geolocation fehlgeschlagen: ${a}`),pa(j().gps,Ze(j().app)),e()},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})})))}}function pd(){$&&($.root.addEventListener("click",e=>{const t=e.target;if(!t)return;const a=t.closest('[data-role="gps-tab"]');if(a&&a.dataset.tab){co(a.dataset.tab);return}const n=t.closest("[data-action]");if(!n||n.dataset.action==="")return;const s=n.closest("[data-point-id]")?.getAttribute("data-point-id")||"";switch(n.dataset.action){case"reload-points":Kr({notify:!0});break;case"sync-active":ld();break;case"set-active":rd(s);break;case"delete-point":id(s);break;case"copy-coords":sd(s);break;case"use-geolocation":ud();break;case"apply-raw-coords":ad();break;case"verify-coords":nd();break}}),$.form?.addEventListener("submit",e=>{dd(e)}),$.form?.addEventListener("reset",()=>{window.setTimeout(()=>{ja()},0)}),$.formFields.latitude?.addEventListener("input",()=>{ja()}),$.formFields.longitude?.addEventListener("input",()=>{ja()}))}function fd(e,t){if(!e||ds)return;ds=!0;const a=e;a.innerHTML="";const n=Rc();a.appendChild(n),$=Kc(n),ps?.(),ps=Us({section:"gps",event:"gps:data-changed",shouldHandleEvent:()=>Ze(t.state.getState().app)==="ok",shouldRefresh:()=>Ze(t.state.getState().app)==="ok",onRefresh:()=>Kr({notify:!1}),onStatusChange:l=>Zc(l)}),Ie=0,sa?.destroy(),sa=null,Rr=null,pd(),co(oo),typeof t.events?.subscribe=="function"&&t.events.subscribe("gps:set-active-from-history",l=>{let o="";if(l&&typeof l=="object"&&(o=String(l.id||"").trim()),!o){se("Historische GPS-Anfrage ohne gültige ID erhalten.","warning",6e3);return}od(o,t)});const r=t.state.getState();Ba=r.gps.activePointId;const s=(l,o)=>{const u=Ze(l.app),f=l.gps;if(Qc(u),mi(l,u),pa(f,u),Wc(l),u==="ok"&&!f.initialized&&!f.pending&&Kr({notify:!1}),u==="ok"&&us!=="ok"&&f.initialized&&se("GPS-Bereich ist wieder verfügbar.","success"),us=u,l.gps.activePointId!==Ba&&(Ba=l.gps.activePointId,typeof t.events?.emit=="function")){const p=rn(Ba);t.events.emit("gps:active-point-changed",{id:Ba,point:p})}l.gps.lastError&&l.gps.lastError!==o.gps.lastError&&(se(l.gps.lastError,"danger",7e3),Fe(`Fehler: ${l.gps.lastError}`))};t.state.subscribe(s),s(r,r)}let Oe=[],_e=[],Wr=!1,Bn=null;async function gt(){try{const[e,t]=await Promise.all([Xo({limit:100}),el({limit:100})]);Oe=e.items||[],_e=t.items||[],Hn("savedCodes:changed",{eppoCount:Oe.length,bbchCount:_e.length})}catch(e){console.error("Failed to load saved codes:",e),Oe=[],_e=[]}}function md(){const e=Oe.length>0,t=_e.length>0;return`
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
                  ${jr()}
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
                  ${Gr()}
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
  `}function jr(){return Oe.length?Oe.map(e=>`
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
    `}function Gr(){return _e.length?_e.map(e=>`
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
    `}function bt(e){const t=e.querySelector('[data-role="saved-eppo-list"]'),a=Oe.length>0;if(t){const o=t.closest(".border-top");o&&a&&(o.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Kulturen
            <span class="badge bg-success ms-2">${Oe.length}</span>
          </h6>
          <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${jr()}
          </div>
        `)}else if(a){const o=e.querySelector(".codes-card:first-child .border-top.pt-3.mb-3");o&&(o.innerHTML=`
        <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
          <i class="bi bi-bookmark-star me-1"></i>
          Meine Kulturen
          <span class="badge bg-success ms-2">${Oe.length}</span>
        </h6>
        <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
          ${jr()}
        </div>
      `)}const n=e.querySelector('[data-role="saved-bbch-list"]'),r=_e.length>0;if(n){const o=n.closest(".border-top");o&&r&&(o.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${_e.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Gr()}
          </div>
        `)}else if(r){const u=e.querySelectorAll(".codes-card")[1];if(u){const f=u.querySelector(".border-top.pt-3.mb-3");f&&(f.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${_e.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Gr()}
          </div>
        `)}}const s=e.querySelector(".codes-card:first-child .card-header .badge"),l=e.querySelector(".codes-card:last-child .card-header .badge");s&&(s.textContent=`${Oe.length} gespeichert`),l&&(l.textContent=`${_e.length} gespeichert`)}function gd(e){const t=e.querySelector('[data-input="eppo-search"]'),a=e.querySelector('[data-role="eppo-search-results"]');if(t&&a){const o=Di(async()=>{const u=t.value.trim();if(u.length<2){a.innerHTML="";return}try{const f=await Jo(u,10);if(!f.length){a.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${b(u)}"</div>
          `;return}a.innerHTML=f.map(p=>`
          <button type="button" class="list-group-item list-group-item-action" 
                  data-action="select-eppo" 
                  data-code="${b(p.code)}" 
                  data-name="${b(p.name)}"
                  data-language="${b(p.language||"")}"
                  data-dtcode="${b(p.dtcode||"")}">
            <strong class="text-success">${b(p.code)}</strong>
            <span class="ms-2">${b(p.name)}</span>
            ${p.dtcode?`<small class="text-muted ms-2">(${b(p.dtcode)})</small>`:""}
          </button>
        `).join("")}catch(f){console.error("EPPO search failed:",f),a.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);t.addEventListener("input",o)}const n=e.querySelector('[data-input="bbch-search"]'),r=e.querySelector('[data-role="bbch-search-results"]');if(n&&r){const o=Di(async()=>{const u=n.value.trim();if(u.length<1){r.innerHTML="";return}try{const f=await Yo(u,10);if(!f.length){r.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${b(u)}"</div>
          `;return}r.innerHTML=f.map(p=>`
          <button type="button" class="list-group-item list-group-item-action d-flex align-items-start gap-2 py-2" 
                  data-action="select-bbch" 
                  data-code="${b(p.code)}" 
                  data-label="${b(p.label)}"
                  data-principal="${p.principalStage??""}"
                  data-secondary="${p.secondaryStage??""}">
            <strong class="text-info flex-shrink-0" style="min-width: 35px;">${b(p.code)}</strong>
            <span class="text-break" style="line-height: 1.4;">${b(p.label)}</span>
          </button>
        `).join("")}catch(f){console.error("BBCH search failed:",f),r.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);n.addEventListener("input",o)}e.dataset.codesClickBound!=="1"&&(e.dataset.codesClickBound="1",e.addEventListener("click",async o=>{const f=o.target.closest("[data-action]");if(!f)return;const p=f.dataset.action;if(p==="select-eppo"){const g=f.dataset.code||"",v=f.dataset.name||"",k=f.dataset.language||"",h=f.dataset.dtcode||"";if(!g||!v){console.warn("EPPO selection missing code or name");return}a&&(a.innerHTML=""),t&&(t.value="");const S=Oe.find(w=>w.code.toUpperCase()===g.toUpperCase());if(S){const w=e.querySelector(`[data-eppo-id="${S.id}"]`);w&&(w.classList.add("flash-highlight"),setTimeout(()=>w.classList.remove("flash-highlight"),800));return}try{await br({code:g,name:v,language:k||void 0,dtcode:h||void 0,isFavorite:!1});const w=et();await tt(w),await gt(),bt(e)}catch(w){console.error("Failed to save EPPO from search:",w),alert("Speichern fehlgeschlagen")}}if(p==="select-bbch"){const g=f.dataset.code||"",v=f.dataset.label||"",k=f.dataset.principal,h=f.dataset.secondary,S=k?parseInt(k,10):void 0,w=h?parseInt(h,10):void 0;if(!g||!v){console.warn("BBCH selection missing code or label");return}r&&(r.innerHTML=""),n&&(n.value="");const E=_e.find(I=>I.code===g);if(E){const I=e.querySelector(`[data-bbch-id="${E.id}"]`);I&&(I.classList.add("flash-highlight"),setTimeout(()=>I.classList.remove("flash-highlight"),800));return}try{await hr({code:g,label:v,principalStage:Number.isNaN(S)?void 0:S,secondaryStage:Number.isNaN(w)?void 0:w,isFavorite:!1});const I=et();await tt(I),await gt(),bt(e)}catch(I){console.error("Failed to save BBCH from search:",I),alert("Speichern fehlgeschlagen")}}if(p==="toggle-favorite-eppo"){const g=f.dataset.id;if(!g)return;const v=Oe.find(k=>k.id===g);if(!v)return;try{await br({id:v.id,code:v.code,name:v.name,language:v.language,dtcode:v.dtcode,isFavorite:!v.isFavorite});const k=et();await tt(k),await gt(),bt(e)}catch(k){console.error("Failed to toggle EPPO favorite:",k)}}if(p==="toggle-favorite-bbch"){const g=f.dataset.id;if(!g)return;const v=_e.find(k=>k.id===g);if(!v)return;try{await hr({id:v.id,code:v.code,label:v.label,principalStage:v.principalStage,secondaryStage:v.secondaryStage,isFavorite:!v.isFavorite});const k=et();await tt(k),await gt(),bt(e)}catch(k){console.error("Failed to toggle BBCH favorite:",k)}}if(p==="delete-eppo"){const g=f.dataset.id;if(!g||!confirm("EPPO-Code wirklich löschen?"))return;try{await Zo({id:g});const v=et();await tt(v),await gt(),bt(e)}catch(v){console.error("Failed to delete EPPO:",v)}}if(p==="delete-bbch"){const g=f.dataset.id;if(!g||!confirm("BBCH-Stadium wirklich löschen?"))return;try{await Qo({id:g});const v=et();await tt(v),await gt(),bt(e)}catch(v){console.error("Failed to delete BBCH:",v)}}}));const s=e.querySelector('[data-form="add-eppo"]');s&&s.addEventListener("submit",async o=>{o.preventDefault();const u=e.querySelector('[data-input="eppo-code"]'),f=e.querySelector('[data-input="eppo-name"]'),p=e.querySelector('[data-input="eppo-favorite"]'),g=u?.value.trim(),v=f?.value.trim();if(!g||!v){alert("Bitte Code und Name eingeben");return}try{await br({code:g,name:v,isFavorite:p?.checked||!1});const k=et();await tt(k),await gt(),bt(e),u&&(u.value=""),f&&(f.value=""),p&&(p.checked=!1)}catch(k){console.error("Failed to save EPPO:",k),alert("Speichern fehlgeschlagen")}});const l=e.querySelector('[data-form="add-bbch"]');l&&l.addEventListener("submit",async o=>{o.preventDefault();const u=e.querySelector('[data-input="bbch-code"]'),f=e.querySelector('[data-input="bbch-label"]'),p=e.querySelector('[data-input="bbch-favorite"]'),g=u?.value.trim(),v=f?.value.trim();if(!g||!v){alert("Bitte Code und Bezeichnung eingeben");return}try{await hr({code:g,label:v,isFavorite:p?.checked||!1});const k=et();await tt(k),await gt(),bt(e),u&&(u.value=""),f&&(f.value=""),p&&(p.checked=!1)}catch(k){console.error("Failed to save BBCH:",k),alert("Speichern fehlgeschlagen")}})}function bd(e,t,a={}){if(!e||Wr)return;Bn=e,Wr=!0,Bn.innerHTML=`
    <div class="section-inner codes-manager">
      <h4 class="mb-3"><i class="bi bi-tags me-2"></i>EPPO & BBCH Codes</h4>
      ${md()}
    </div>`;const n=Bn.querySelector(".codes-manager");if(!n)return;gd(n);const r=async()=>{await gt(),bt(n)};t?.events?.subscribe?.("database:connected",()=>{r()}),t?.state?.getState?.().app?.hasDatabase&&r()}function hd(){Wr=!1,Bn=null}let ms=!1,yt=null,Oa=null,Nn=null,_a=null,Rt=null,Gn=null,xt=null,Xa=null,Un=null,kt=null,Ur=null,ht=null,Be=new Set,Mt=null,Sr=!1,Er=!1,fa=!1;const rt=e=>Ue(e.mediums),Fn=25,Lr=new Intl.NumberFormat("de-DE");let Ne=0,oa=null,Vr=null,Zr=null,gi=null;function vd(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function yd(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`profile-${Date.now()}-${Math.random().toString(16).slice(2,10)}`}function po(e){if(!Be.size)return;const t=new Set(rt(e).map(n=>n.id));let a=!1;Be.forEach(n=>{t.has(n)||(Be.delete(n),a=!0)}),a&&(Be=new Set(Be))}function Vn(){yt&&yt.querySelectorAll('[data-role="profile-select"]').forEach(e=>{const t=e.dataset.mediumId;e.checked=!!(t&&Be.has(t))})}function Ct(e){const t=rt(e).length,a=Be.size;let n="Noch keine Mittel ausgewählt.";t?a===t&&t>0?n=`${a} Mittel ausgewählt (alle).`:a>0&&(n=`${a} Mittel ausgewählt.`):n="Keine Mittel vorhanden.",Ur&&(Ur.textContent=n),ht&&(ht.disabled=t===0,ht.indeterminate=a>0&&a<t,ht.checked=t>0&&a===t)}function Tn(e){Mt=null,Gn&&Gn.reset(),Xa&&(Xa.value=""),xt&&(xt.value=""),kt&&(kt.textContent="Profil speichern"),Be=new Set,Vn(),Ct(e)}function xd(e,t){Mt=e.id,Xa&&(Xa.value=e.id),xt&&(xt.value=e.name,xt.focus()),kt&&(kt.textContent="Profil aktualisieren"),Be=new Set(e.mediumIds),Vn(),Ct(t)}function gs(e,t){if(kt){if(kt.disabled=e,e){kt.textContent=t||"Speichert...";return}kt.textContent=Mt?"Profil aktualisieren":"Profil speichern"}}function Zn(e,t){if(Oa){if(Oa.disabled=e,e){Oa.textContent=t||"Speichert...";return}Oa.textContent="Hinzufügen"}}async function kd(e,t,a){if(fa)return;const n=t.state.getState(),s=(rt(n)[e]??null)?.id||null;fa=!0,Zn(!0);const l=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediums",u=>{const f=en(u),p=f.items.slice();return p.splice(e,1),{...f,items:p,totalCount:Math.min(f.totalCount,p.length),lastUpdatedAt:new Date().toISOString()}}),await Qn({silent:!0})&&s&&t.events?.emit?.("mediums:data-changed",{action:"deleted",id:s})}finally{fa=!1,Zn(!1),a&&a.isConnected&&(a.disabled=!1,a.textContent=l??"Löschen")}}async function wd(e,t,a){const n=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediumProfiles",(r=[])=>r.filter(s=>s.id!==e.id)),Mt===e.id&&Tn(t.state.getState()),await Qn({successMessage:"Profil gelöscht."})}finally{a&&(a.disabled=!1,a.textContent=n||"Löschen")}}function Sd(e){if(!Un)return;const t=Un,a=e.mediumProfiles||[];if(!a.length){t.innerHTML=`
      <tr>
        <td colspan="3" class="text-center text-muted">Noch keine Profile erstellt.</td>
      </tr>
    `;return}const n=new Map(rt(e).map(r=>[r.id,r]));t.innerHTML="",a.forEach(r=>{const s=document.createElement("tr"),l=r.mediumIds.map(u=>n.get(u)).filter(Boolean).map(u=>b(u.name)),o=l.length?l.join(", "):'<span class="text-muted">Keine gültigen Mittel</span>';s.innerHTML=`
      <td>${b(r.name)}</td>
      <td>${o}</td>
      <td>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-sm btn-outline-info" data-action="profile-edit" data-id="${b(r.id)}">Bearbeiten</button>
          <button class="btn btn-sm btn-outline-danger" data-action="profile-delete" data-id="${b(r.id)}">Löschen</button>
        </div>
      </td>
    `,t.appendChild(s)})}function Ed(e,t){if(Sr||!e.mediumProfiles?.length)return;const a=new Set(rt(e).map(s=>s.id));let n=!1;const r=e.mediumProfiles.map(s=>{const l=s.mediumIds.filter(o=>a.has(o));return l.length!==s.mediumIds.length?(n=!0,{...s,mediumIds:l,updatedAt:new Date().toISOString()}):s}).filter(s=>s.mediumIds.length?!0:(n=!0,!1));n&&(Sr=!0,t.state.updateSlice("mediumProfiles",()=>r),Sr=!1)}function fo(e){if(!e)return Ne=0,{start:0,end:0,total:0};const t=Math.max(Math.ceil(e/Fn),1);Ne>=t&&(Ne=t-1),Ne<0&&(Ne=0);const a=Ne*Fn,n=Math.min(a+Fn,e);return{start:a,end:n,total:e}}function Ld(){if(!Zr)return null;const e=Zr.querySelector('[data-role="mediums-pager"]');return e?((!oa||Vr!==e)&&(oa?.destroy(),oa=an(e,{onPrev:()=>Dd(),onNext:()=>$d(),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Mittel...",empty:"Keine Mittel verfügbar"}}),Vr=e),oa):null}function bs(e){const t=Ld();if(!t)return;const a=rt(e).length;if(!a){Ne=0,t.update({status:"disabled",info:"Noch keine Mittel gespeichert."});return}const{start:n,end:r}=fo(a),s=`Mittel ${Lr.format(n+1)}–${Lr.format(r)} von ${Lr.format(a)}`;t.update({status:"ready",info:s,canPrev:Ne>0,canNext:r<a})}function Dd(){if(Ne===0)return;const e=gi?.state.getState();e&&(Ne=Math.max(Ne-1,0),bi(e))}function $d(){const e=gi?.state.getState();if(!e)return;const t=rt(e).length;if(!t)return;const a=Math.max(Math.ceil(t/Fn)-1,0);Ne>=a||(Ne=Math.min(Ne+1,a),bi(e))}function bi(e){if(!yt)return;po(e);const t=new Map(e.measurementMethods.map(l=>[l.id,l])),a=rt(e).length;if(!a){yt.innerHTML=`
      <tr>
        <td colspan="9" class="text-center text-muted">Noch keine Mittel gespeichert.</td>
      </tr>
    `,Ct(e),bs(e);return}const{start:n,end:r}=fo(a),s=rt(e).slice(n,r);yt.innerHTML="",s.forEach((l,o)=>{const u=n+o,f=document.createElement("tr"),p=t.get(l.methodId),g=l.approval||l.zulassungsnummer,v=typeof g=="string"&&g.trim().length?b(g):"-",k=typeof l.wartezeit=="string"&&l.wartezeit.trim().length?b(l.wartezeit):typeof l.wartezeit=="number"?`${l.wartezeit} Tage`:"-",h=typeof l.wirkstoff=="string"&&l.wirkstoff.trim().length?b(l.wirkstoff):"-";f.innerHTML=`
      <td class="text-center">
        <input type="checkbox" class="form-check-input" data-role="profile-select" data-medium-id="${b(l.id)}" ${Be.has(l.id)?"checked":""} />
      </td>
      <td>${b(l.name)}</td>
      <td>${b(l.unit)}</td>
      <td>${b(p?p.label:l.method||l.methodId||"-")}</td>
      <td>${b(l.value!=null?String(l.value):"")}</td>
      <td>${v}</td>
      <td>${k}</td>
      <td>${h}</td>
      <td>
        <button class="btn btn-sm btn-danger" data-action="delete" data-index="${u}">Löschen</button>
      </td>
    `,yt?.appendChild(f)}),Ct(e),bs(e)}function hs(e){if(!_a)return;const t=new Set;_a.innerHTML="",e.measurementMethods.forEach(a=>{const n=(a.label??"").toLowerCase(),r=(a.id??"").toLowerCase();if(n&&!t.has(n)){t.add(n);const s=document.createElement("option");s.value=a.label,_a.appendChild(s)}if(r&&!t.has(r)){t.add(r);const s=document.createElement("option");s.value=a.id,_a.appendChild(s)}})}function zd(e){const t=e.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t||`method-${Date.now()}-${Math.random().toString(16).slice(2,6)}`}function Ad(e,t){if(!Nn)return null;const a=Nn.value.trim();if(!a)return window.alert("Bitte eine Methode angeben."),Nn.focus(),null;const n=e.measurementMethods.find(o=>o.label?.toLowerCase()===a.toLowerCase()||o.id?.toLowerCase()===a.toLowerCase());if(n)return n.id;const r=zd(a),s=e.fieldLabels?.calculation?.fields?.quantity?.unit||"Kiste",l={id:r,label:a,type:"factor",unit:s,requires:["areaHa"],config:{sourceField:"areaHa"}};return t.state.updateSlice("measurementMethods",o=>[...o,l]),r}async function Qn(e){try{const t=et();return await tt(t),e?.silent||window.alert(e?.successMessage??"Änderungen wurden gespeichert."),!0}catch(t){console.error("Fehler beim Speichern",t);const a=t instanceof Error?t.message:"Speichern fehlgeschlagen";return window.alert(a),!1}}function Pd(e,t){const a=!!t.app?.hasDatabase,n=t.app?.activeSection==="settings";e.classList.toggle("d-none",!(a&&n))}function Md(e,t){if(!e||ms)return;const a=e;a.innerHTML="";const n=vd();a.appendChild(n),Zr=n,gi=t,Ne=0,oa?.destroy(),oa=null,Vr=null,yt=n.querySelector("#settings-mediums-table tbody"),Nn=n.querySelector('input[name="medium-method"]'),_a=n.querySelector("#settings-method-options"),Rt=n.querySelector("#settings-medium-form"),Oa=Rt?Rt.querySelector('button[type="submit"]'):null,Gn=n.querySelector("#settings-profile-form"),xt=n.querySelector("#profile-name"),Xa=n.querySelector('input[name="profile-id"]'),Un=n.querySelector("#settings-profile-table tbody"),kt=n.querySelector('[data-role="profile-submit"]'),Ur=n.querySelector('[data-role="profile-selection-summary"]'),ht=n.querySelector('[data-role="profile-select-all"]');let r=!1,s=!1;function l(p){if(n.querySelectorAll("[data-settings-tab]").forEach(g=>{const v=g.dataset.settingsTab===p;g.classList.toggle("active",v)}),n.querySelectorAll("[data-pane]").forEach(g=>{const v=g.dataset.pane===p;g.style.display=v?"block":"none"}),p==="gps"&&!r){const g=n.querySelector('[data-feature="gps-embedded"]');g&&(fd(g,t),r=!0)}if(p==="codes"&&!s){const g=n.querySelector('[data-feature="codes-embedded"]');g&&(hd(),bd(g,{state:t.state,events:{subscribe:t.events?.subscribe}},{}),s=!0)}}n.querySelectorAll("[data-settings-tab]").forEach(p=>{p.addEventListener("click",()=>{const g=p.dataset.settingsTab;g&&l(g)})});async function o(){if(!Rt||fa)return;const p=t.state.getState(),g=new FormData(Rt),v=(g.get("medium-name")||"").toString().trim(),k=(g.get("medium-unit")||"").toString().trim(),h=g.get("medium-value"),S=Number(h),w=(g.get("medium-approval")||"").toString().trim(),E=g.get("medium-wartezeit"),I=E?Number(E):null,V=(g.get("medium-wirkstoff")||"").toString().trim()||null;if(!v||!k||Number.isNaN(S)){window.alert("Bitte alle Felder korrekt ausfüllen.");return}const W=Ad(p,t);if(!W)return;const ye=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`medium-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,F={id:ye,name:v,unit:k,methodId:W,value:S,zulassungsnummer:w||null,wartezeit:I!=null&&!Number.isNaN(I)?I:null,wirkstoff:V};fa=!0,Zn(!0,"Speichere...");try{t.state.updateSlice("mediums",T=>{const D=en(T),A=[...D.items,F];return{...D,items:A,totalCount:A.length,lastUpdatedAt:new Date().toISOString()}}),hs(t.state.getState()),await Qn({successMessage:"Mittel gespeichert.",silent:!0})&&(Rt.reset(),t.events?.emit?.("mediums:data-changed",{action:"created",id:ye}))}finally{fa=!1,Zn(!1)}}Rt?.addEventListener("submit",p=>{p.preventDefault(),o()}),yt?.addEventListener("click",p=>{const g=p.target?.closest('[data-action="delete"]');if(!g)return;const v=Number(g.dataset.index);Number.isNaN(v)||kd(v,t,g)}),yt?.addEventListener("change",p=>{const g=p.target;if(!g||g.dataset.role!=="profile-select")return;const v=g.dataset.mediumId;if(!v)return;g.checked?Be.add(v):Be.delete(v);const k=t.state.getState();Ct(k)}),ht?.addEventListener("change",()=>{const p=t.state.getState();ht&&(ht.indeterminate=!1,ht.checked?Be=new Set(rt(p).map(g=>g.id)):Be=new Set,Vn(),Ct(p))});const u=async()=>{if(!xt)return;const p=xt.value.trim();if(!p){window.alert("Bitte einen Profilnamen eingeben."),xt.focus();return}if(!Be.size){window.alert("Bitte mindestens ein Mittel auswählen.");return}const g=t.state.getState();if(g.mediumProfiles?.some(w=>w.name.toLowerCase()===p.toLowerCase()&&w.id!==Mt)){window.alert("Ein Profil mit diesem Namen existiert bereits.");return}const k=rt(g).filter(w=>Be.has(w.id)).map(w=>w.id);if(!k.length){window.alert("Ausgewählte Mittel sind nicht mehr verfügbar. Bitte Auswahl prüfen."),po(g),Vn(),Ct(g);return}if(Er)return;const h=!!Mt;Er=!0,gs(!0,h?"Aktualisiere...":"Speichere...");const S=new Date().toISOString();try{if(Mt)t.state.updateSlice("mediumProfiles",(E=[])=>E.map(I=>I.id===Mt?{...I,name:p,mediumIds:k,updatedAt:S}:I));else{const E={id:yd(),name:p,mediumIds:k,createdAt:S,updatedAt:S};t.state.updateSlice("mediumProfiles",(I=[])=>[...I,E])}await Qn({successMessage:h?"Profil aktualisiert und gespeichert.":"Profil gespeichert."})&&Tn(t.state.getState())}finally{Er=!1,gs(!1)}};Gn?.addEventListener("submit",p=>{p.preventDefault(),u()}),Un?.addEventListener("click",p=>{const g=p.target?.closest('[data-action^="profile-"]');if(!g)return;const v=g.dataset.id;if(!v)return;const k=t.state.getState();if(g.dataset.action==="profile-edit"){const h=k.mediumProfiles?.find(S=>S.id===v);h&&xd(h,k);return}if(g.dataset.action==="profile-delete"){const h=k.mediumProfiles?.find(S=>S.id===v);if(!h||!window.confirm(`Profil "${h.name}" wirklich löschen?`))return;wd(h,t,g)}}),n.querySelector('[data-action="profile-reset"]')?.addEventListener("click",()=>{Tn(t.state.getState())}),Tn(t.state.getState());const f=p=>{Ed(p,t),Pd(n,p),p.app.activeSection==="settings"&&(bi(p),hs(p),Sd(p),Ct(p))};t.state.subscribe(f),f(t.state.getState()),ms=!0}const Na=e=>b(e),Dr=(e,t=1)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function ma(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function Cd(e){if(!e)return"";const t=new Date(e);if(Number.isNaN(t.getTime()))return b(e);const a=Math.round((t.getTime()-Date.now())/864e5);return a<0?`<span style="color:#ef4444;">${ma(e)} · abgelaufen</span>`:a<180?`<span style="color:#f59e0b;">${ma(e)} · ${a} T</span>`:`<span class="calc-hint">${ma(e)}</span>`}function Id(){return`
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
    </section>`}function Bd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Id();const a=e.querySelector('[data-role="lager-uebersicht"]'),n=e.querySelector('[data-role="lager-bewegungen"]'),r=e.querySelector('[data-role="lager-form"]'),s=e.querySelector("#lager-mittel-options"),l=e.querySelector('[data-role="lager-empty"]'),o=new Map,u=k=>{if(a){if(!k.length){a.innerHTML='<tr><td colspan="6" class="calc-hint" style="padding:14px;">Noch keine Mittel. Erfasse unten einen Zugang oder dokumentiere Anwendungen in „Neu erfassen".</td></tr>';return}a.innerHTML=k.map(h=>{const S=h.bestand<0?"#ef4444":h.bestand===0?"#f59e0b":"inherit",w=b(h.einheit||"");return`<tr>
          <td><span class="fw-semibold">${b(h.name)}</span>${h.kennr?`<span class="d-block calc-hint">${b(h.kennr)}</span>`:""}</td>
          <td class="calc-hint">${b(h.wirkstoff||"")}</td>
          <td class="text-end">${Dr(h.verbraucht)} ${w}<span class="d-block calc-hint">${h.anwendungen} Anw.</span></td>
          <td class="text-end fw-semibold" style="color:${S};">${Dr(h.bestand)} ${w}</td>
          <td>${Cd(h.zulEnde)}</td>
          <td class="calc-hint">${h.naechsterAblauf?ma(h.naechsterAblauf):""}</td>
        </tr>`}).join("")}},f=k=>{if(n){if(!k.length){n.innerHTML='<div class="calc-hint">Keine Bewegungen erfasst.</div>';return}n.innerHTML=k.map(h=>`
        <div class="d-flex align-items-center gap-2 py-1" style="border-bottom:1px solid var(--border-1);">
          <span class="badge" style="background:${h.typ==="zugang"?"#16a34a":"#64748b"};">${b(h.typ)}</span>
          <span class="flex-grow-1">${b(h.mittelName)} · <b>${Dr(h.menge)} ${b(h.einheit||"")}</b>${h.charge?` · Charge ${b(h.charge)}`:""}<span class="d-block calc-hint">${ma(h.datum)}${h.lieferant?" · "+b(h.lieferant):""}${h.ablauf?" · Ablauf "+ma(h.ablauf):""}</span></span>
          <button class="btn btn-sm" style="color:#ef4444;border:1px solid var(--border-1);background:transparent;" data-del="${Na(h.id)}" title="Löschen">×</button>
        </div>`).join(""),n.querySelectorAll("[data-del]").forEach(h=>{h.addEventListener("click",async()=>{const S=h.getAttribute("data-del")||"";try{await nl({id:S}),await nt().catch(()=>{}),await g()}catch{N.warning("Löschen fehlgeschlagen.")}})})}},p=()=>{s&&(s.innerHTML=Array.from(o.entries()).sort((k,h)=>k[0].localeCompare(h[0],"de")).map(([k,h])=>`<option value="${Na(k)}" data-kennr="${Na(h.kennr||"")}" data-einheit="${Na(h.einheit||"")}" data-wirkstoff="${Na(h.wirkstoff||"")}"></option>`).join(""))},g=async()=>{if(oe()!=="sqlite"){l&&(l.textContent="Bitte zuerst eine Datenbank öffnen.");return}try{const[k,h,S]=await Promise.all([Fs(),al(),Ts()]);u(k?.rows||[]),f(h?.rows||[]),o.clear(),(S?.rows||[]).forEach(w=>{w.name&&o.set(w.name,{kennr:w.kennr??null,einheit:w.einheit??null,wirkstoff:w.wirkstoff??null})}),(k?.rows||[]).forEach(w=>{w.name&&!o.has(w.name)&&o.set(w.name,{kennr:w.kennr??null,einheit:w.einheit??null,wirkstoff:w.wirkstoff??null})}),p()}catch(k){console.warn("[Lager] Laden fehlgeschlagen:",k)}};r?.addEventListener("submit",async k=>{if(k.preventDefault(),oe()!=="sqlite"){N.warning("Bitte zuerst eine Datenbank öffnen.");return}const h=new FormData(r),S=String(h.get("mittel")||"").trim(),w=Number(String(h.get("menge")||"").replace(",","."));if(!S||!Number.isFinite(w)){N.warning("Mittel und Menge angeben.");return}const E=String(h.get("preis")||"").trim();try{await tl({mittelName:S,kennr:String(h.get("kennr")||"").trim()||null,wirkstoff:o.get(S)?.wirkstoff||null,typ:String(h.get("typ")||"zugang"),menge:w,einheit:String(h.get("einheit")||"").trim()||null,datum:String(h.get("datum")||"").trim()||null,charge:String(h.get("charge")||"").trim()||null,ablauf:String(h.get("ablauf")||"").trim()||null,lieferant:String(h.get("lieferant")||"").trim()||null,preis:E?Number(E.replace(",",".")):null}),await nt().catch(()=>{}),r.reset(),N.success("Bewegung gespeichert."),await g()}catch{N.warning("Speichern fehlgeschlagen.")}});const v=e.querySelector('[name="mittel"]');v?.addEventListener("change",()=>{const k=o.get(v.value);if(!k)return;const h=e.querySelector('[name="einheit"]'),S=e.querySelector('[name="kennr"]');h&&k.einheit&&(h.value=k.einheit),S&&k.kennr&&(S.value=k.kennr)}),t.state.subscribe(k=>{k?.app?.activeSection==="lager"&&g()}),g()}const Jn={mechanisch:{label:"Mechanisch",icon:"bi-tools",color:"#2563eb"},chemisch_psm:{label:"Pflanzenschutz",icon:"bi-droplet-half",color:"#dc2626"},duengung:{label:"Düngung",icon:"bi-flower1",color:"#b45309"},nuetzlinge:{label:"Nützlinge",icon:"bi-bug",color:"#7c3aed"},bewaesserung:{label:"Bewässerung",icon:"bi-moisture",color:"#0891b2"},monitoring:{label:"Monitoring",icon:"bi-eye",color:"#475569"},sonstiges:{label:"Sonstiges",icon:"bi-three-dots",color:"#64748b"}},Nd=["mechanisch","chemisch_psm","duengung","nuetzlinge","bewaesserung","monitoring","sonstiges"];function mo(e){return Jn[e]||Jn.sonstiges}const Fd={geplant:{label:"geplant",color:"#64748b"},aktiv:{label:"aktiv",color:"#16a34a"},abgeschlossen:{label:"abgeschlossen",color:"#94a3b8"}},jt=["#16a34a","#0891b2","#7c3aed","#d97706","#dc2626","#0d9488","#65a30d","#db2777"],Td=/^#[0-9a-fA-F]{3,8}$/;function go(e){return typeof e=="string"&&Td.test(e.trim())?e.trim():null}function ga(e,t=0){return go(e&&e.color)||jt[t%jt.length]}function ot(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function Le(e){if(!e)return NaN;const t=String(e).slice(0,10).replace(/-/g,""),a=Number(t);return Number.isFinite(a)?a:NaN}function la(e){const t=[...e||[]].sort((s,l)=>(Le(s.pflanzDatum)||0)-(Le(l.pflanzDatum)||0)),a=Number(ot().replace(/-/g,""));let n=t.find(s=>s.status==="aktiv")||null;if(!n){const s=t.filter(l=>l.status!=="abgeschlossen"&&Le(l.pflanzDatum)<=a&&(!l.ernteDatum||Le(l.ernteDatum)>=a));n=s.length?s[s.length-1]:null}let r=t.filter(s=>s!==n&&s.status!=="abgeschlossen"&&Le(s.pflanzDatum)>a).sort((s,l)=>(Le(s.pflanzDatum)||0)-(Le(l.pflanzDatum)||0))[0]||null;return r||(r=t.filter(s=>s!==n&&s.status==="geplant").sort((s,l)=>(Le(s.pflanzDatum)||0)-(Le(l.pflanzDatum)||0))[0]||null),{current:n,next:r,all:t}}const bo=["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];function ho(e,t){const a=[];let n=e.getFullYear(),r=e.getMonth();const s=t.getFullYear(),l=t.getMonth();let o=0;for(;(n<s||n===s&&r<=l)&&o<60;)a.push({y:n,m:r}),r++,r>11&&(r=0,n++),o++;return a}function je(e,t){if(!t||!e.length)return null;const a=new Date(String(t).slice(0,10)+"T00:00:00");if(isNaN(a.getTime()))return null;const n=e.length,r=a.getFullYear()*12+a.getMonth(),s=e[0].y*12+e[0].m,l=e[n-1].y*12+e[n-1].m;if(r<s)return 0;if(r>l)return 1;const o=r-s,u=new Date(a.getFullYear(),a.getMonth()+1,0).getDate();return(o+(a.getDate()-1)/u)/n}const qd={anzucht:{label:"Anzucht (vorziehen)",short:"Anzucht"},direkt:{label:"Direktsaat",short:"Direkt"}},Hd=["Pflanzen","m²","Beete","lfd. m","g Saatgut"];function vt(e,t){if(!e)return null;const a=new Date(String(e).slice(0,10)+"T00:00:00");return isNaN(a.getTime())?null:(a.setDate(a.getDate()+Math.round(Number(t)||0)),a.getFullYear()+"-"+String(a.getMonth()+1).padStart(2,"0")+"-"+String(a.getDate()).padStart(2,"0"))}function Od(e,t,a){if(!e||!a)return{};const r=(e.anbauMethode==="anzucht"?"anzucht":"direkt")==="anzucht"&&Number(e.anzuchtTage)||0,s=Number(e.kulturTage)||0,l=Number(e.ernteTage)||0;let o;t==="aussaat"?o=vt(a,r):t==="ernte"?o=s?vt(a,-s):a:o=a;const u=vt(o,-r),f=s?vt(o,s):null,p=f?vt(f,l):null;return{aussaatDatum:u,pflanzDatum:o,ernteVon:f,ernteBis:p}}function _d(e,t){return e?{aussaatDatum:vt(e.aussaatDatum,t),pflanzDatum:vt(e.pflanzDatum,t),ernteVon:vt(e.ernteVon,t),ernteBis:vt(e.ernteBis,t)}:{}}function Dn(e,t){if(!t||!Array.isArray(e))return null;const a=String(t).trim().toLowerCase();return a&&(e.find(n=>String(n.name||"").trim().toLowerCase()===a)||e.find(n=>{const r=String(n.name||"").trim().toLowerCase();return r&&(r.startsWith(a)||a.startsWith(r))}))||null}const zt=["#ef4444","#3b82f6","#a855f7","#f59e0b","#06b6d4","#ec4899","#84cc16","#14b8a6"],Rd=()=>({bedW:1.2,pathW:.4,rowSp:.5,inRowSp:.4,angle:0}),U=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";let te=null,pe=null,_=null,$n=!1,Kt=[];function vs(){if(!_)return 1;const e=_.getCenter().lat;return 156543.03392*Math.cos(e*Math.PI/180)/Math.pow(2,_.getZoom())}function Kd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Wd();const a=[];let n=null;const r=new Map;let s=null,l=null,o={sat:null,osm:null},u=!0,f=!0,p=[],g=[];const v=(i,c)=>p.filter(d=>d.flaecheTyp===i&&String(d.flaecheId)===String(c)),k=(i,c)=>g.filter(d=>d.flaecheTyp===i&&String(d.flaecheId)===String(c));function h(i){const c=la(v("acker",i.id)).current;return c&&c.kultur?{name:c.kultur,color:ga(c)}:i.kultur?{name:i.kultur,color:null}:null}function S(){const i=[];if(a.forEach(y=>{const m=y.latlngs||[];if(m.length<3)return;const P=m.map(xe=>[Number(xe[1]),Number(xe[0])]),C=P[0],J=P[P.length-1];(C[0]!==J[0]||C[1]!==J[1])&&P.push([C[0],C[1]]),i.push({type:"Feature",geometry:{type:"Polygon",coordinates:[P]},properties:{name:y.name||"",kultur:y.kultur||null,eppoCode:y.eppoCode||null,flaeche_m2:Math.round(y.result?.areaM2||0),flaeche_ha:Number(((y.result?.areaM2||0)/1e4).toFixed(4)),beete:y.result?.beds?.length||0,beetmeter_m:Math.round(y.result?.bedMeters||0),pflanzen:y.result?.plants||0,bettbreite_m:y.params?.bedW??null,wegbreite_m:y.params?.pathW??null,reihenabstand_m:y.params?.rowSp??null,pflanzabstand_m:y.params?.inRowSp??null,ausrichtung_grad:y.params?.angle??null}})}),(Ue(t.state.getState().gps?.points)||[]).forEach(y=>{const m=Number(y.latitude),P=Number(y.longitude);if(!Number.isFinite(m)||!Number.isFinite(P))return;const C=Number(y.nutzflaecheQm);i.push({type:"Feature",geometry:{type:"Point",coordinates:[P,m]},properties:{name:y.name||"Standort",typ:"standort",flaeche_m2:Number.isFinite(C)&&C>0?Math.round(C):null,kind:y.kind||null}})}),!i.length){N.warning("Keine Flächen oder Standorte zum Exportieren.");return}const d={type:"FeatureCollection",name:"PSM Acker-Planer",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:i};try{const y=new Blob([JSON.stringify(d,null,2)],{type:"application/geo+json"}),m=URL.createObjectURL(y),P=document.createElement("a");P.href=m,P.download="acker-flaechen.geojson",document.body.appendChild(P),P.click(),P.remove(),setTimeout(()=>URL.revokeObjectURL(m),1e3),N.success(`${i.length} Objekt(e) als GeoJSON exportiert.`)}catch(y){console.error("[Acker] GeoJSON-Export fehlgeschlagen",y),N.error("Export fehlgeschlagen.")}}function w(){if(!te||!s)return;s.clearLayers(),(Ue(t.state.getState().gps?.points)||[]).forEach(c=>{const d=Number(c.latitude),y=Number(c.longitude);if(!Number.isFinite(d)||!Number.isFinite(y))return;const m=Number(c.nutzflaecheQm),P=Number.isFinite(m)&&m>0?`${Math.round(m)} m²`:"",C=c.name||"Standort",J=te.marker([d,y],{icon:te.divIcon({className:"acker-standort",html:'<span class="acker-standort-dot"></span>',iconSize:[16,16],iconAnchor:[8,8]})});J.bindTooltip(`${b(C)}${P?" · "+P:""}`,{permanent:!0,direction:"top",className:"acker-standort-label",offset:[0,-9]}),J.on("click",()=>ge({typ:"haus",id:c.id,name:C,area:Number.isFinite(m)&&m>0?m:0,latlng:[d,y]})),s.addLayer(J)})}const E=i=>e.querySelector(i),I=E('[data-role="acker-list"]'),V=E('[data-role="acker-empty"]'),W=E('[data-role="acker-totals"]'),ye=E('[data-role="acker-map"]'),F=i=>({id:i.id,name:i.name,kultur:i.kultur||null,eppoCode:i.eppoCode||null,standortId:i.standortId||null,color:i.color,latlngs:i.latlngs,areaQm:i.result?.areaM2||0,bedW:i.params.bedW,pathW:i.params.pathW,rowSp:i.params.rowSp,inRowSp:i.params.inRowSp,angle:i.params.angle,beds:i.result?.beds?.length||0,bedMeters:i.result?.bedMeters||0,plants:i.result?.plants||0}),Q=(i,c=!1)=>{if(oe()!=="sqlite")return;const d=async()=>{try{const y=await il(F(i));y?.id&&(i.id=y.id),await nt().catch(()=>{})}catch(y){console.warn("[Acker] Speichern fehlgeschlagen:",y)}};if(c){d();return}clearTimeout(r.get(i._key)),r.set(i._key,setTimeout(d,600))};function T(i,c){const d=i.map(mt=>[mt[1],mt[0]]);if(d.length<3)return{areaM2:0,beds:[],bedMeters:0,plants:0};const y=d[0],m=d[d.length-1];if((y[0]!==m[0]||y[1]!==m[1])&&d.push(y.slice()),d.length<4)return{areaM2:0,beds:[],bedMeters:0,plants:0};let P;try{P=pe.polygon([d])}catch{return{areaM2:0,beds:[],bedMeters:0,plants:0}}const C=pe.area(P),J=c.bedW+c.pathW;if(J<=0||c.bedW<=0||c.rowSp<=0||c.inRowSp<=0)return{areaM2:C,beds:[],bedMeters:0,plants:0};const xe=pe.centroid(P),he=pe.transformRotate(P,-c.angle,{pivot:xe}),Ee=pe.bbox(he),Xe=1/111320,st=J*Xe,So=c.bedW*Xe,za=(Ee[2]-Ee[0])*.02+1e-4,vi=[];let yi=0,xi=0,ki=0;for(let mt=Ee[1];mt<Ee[3]&&ki<4e3;mt+=st,ki++){const wi=Math.min(mt+So,Ee[3]),Eo=pe.polygon([[[Ee[0]-za,mt],[Ee[2]+za,mt],[Ee[2]+za,wi],[Ee[0]-za,wi],[Ee[0]-za,mt]]]);let hn=null;try{hn=pe.intersect(he,Eo)}catch{hn=null}if(!hn)continue;let ur;try{ur=pe.transformRotate(hn,c.angle,{pivot:xe})}catch{continue}const pr=pe.area(ur);if(pr<Math.max(.4,c.bedW*.3))continue;const fr=pr/c.bedW,mr=Math.max(1,Math.floor(c.bedW/c.rowSp)),gr=Math.max(0,Math.floor(fr/c.inRowSp));yi+=fr,xi+=mr*gr,vi.push({geo:ur,lenM:fr,rows:mr,perRow:gr,plants:mr*gr,areaM2:pr})}return{areaM2:C,beds:vi,bedMeters:yi,plants:xi}}function D(i,c){if(!pe)return 1/0;const d=i.map(he=>[he[1],he[0]]);if(d.length<3)return 1/0;const y=d[0],m=d[d.length-1];(y[0]!==m[0]||y[1]!==m[1])&&d.push(y.slice());let P;try{P=pe.polygon([d])}catch{return 1/0}const C=pe.centroid(P);let J;try{J=pe.transformRotate(P,-c,{pivot:C})}catch{return 1/0}const xe=pe.bbox(J);return(xe[3]-xe[1])*111320}function A(i){if(!pe||!i||i.length<3)return 0;const c=new Set;for(let m=0;m<i.length;m++){const P=i[m],C=i[(m+1)%i.length];try{const J=pe.bearing(pe.point([P[1],P[0]]),pe.point([C[1],C[0]]));c.add(((J-90)%180+180)%180)}catch{}}for(let m=0;m<180;m+=3)c.add(m);let d=0,y=1/0;c.forEach(m=>{const P=D(i,m);P<y-1e-6&&(y=P,d=m)});for(let m=d-2;m<=d+2;m+=.25){const P=(m%180+180)%180,C=D(i,P);C<y-1e-6&&(y=C,d=P)}return Math.round(d*10)/10}const Y=(i,c,d)=>({color:i.color,weight:c?3.5:2.5,fillColor:i.color,fillOpacity:d?0:c?.3:.18,dashArray:null}),ne=(i,c,d)=>({color:"#ffffff",weight:d?1:.7,opacity:.9,fillColor:i.color,fillOpacity:d?.9:.78});function le(i){if(!f||i.bedsHidden)return!1;const c=vs(),d=(i.params?.bedW||0)/c,y=(i.params?.pathW||0)/c,m=(i.params?.pathW||0)<=.001||y>=1.2;return d>=4&&m}function ke(i){i.outline&&(_.removeLayer(i.outline),i.outline=null),i.bedsLayer&&(_.removeLayer(i.bedsLayer),i.bedsLayer=null),i.label&&l&&(l.removeLayer(i.label),i.label=null),it(i)}function Se(i){const c=!!i.editing;i.outline&&_.removeLayer(i.outline),i.bedsLayer&&(_.removeLayer(i.bedsLayer),i.bedsLayer=null),i.label&&l&&l.removeLayer(i.label),it(i);const d=i._key===n,y=le(i);i._lastDetail=y,y&&(i.bedsLayer=te.layerGroup(),(i.result?.beds||[]).forEach((m,P)=>{const C=te.geoJSON(m.geo,{style:ne(i,P,d),bubblingMouseEvents:!1});C.bindTooltip(`Beet ${P+1} · ${U(m.lenM,1)} m · ${m.rows}×${U(m.perRow)} = ${U(m.plants)} Pfl.`,{sticky:!0}),C.on("click",()=>K(i._key)),C.on("contextmenu",J=>B(i,J,P+1)),C.addTo(i.bedsLayer)}),i.bedsLayer.addTo(_)),i.outline=te.polygon(i.latlngs,{...Y(i,d,y),className:d?"acker-outline-grab":"",bubblingMouseEvents:!1}).addTo(_),i.outline.on("click",()=>{K(i._key),ge({typ:"acker",id:i.id,name:i.name,area:i.result?.areaM2||0,fieldRef:i})}),i.outline.on("dblclick",()=>Jt(i)),i.outline.on("contextmenu",m=>B(i,m)),i.outline.on("mousedown",m=>Sa(i,m)),Je(i,d),(d||c)&&Te(i)}function Je(i,c){if(!u||!l||!i.outline)return;let d;try{d=i.outline.getBounds().getCenter()}catch{return}const y=i.result?.plants||0,m=h(i),P=m?`<em class="cr" style="--cc:${b(m.color||"#16a34a")}"><span class="dot"></span>${b(m.name)}</em>`:"",C=`<div class="acker-flabel${c?" sel":""}" style="--fc:${i.color}"><b>${b(i.name||"")}</b>${P}<i>${U(y)} Pfl.</i></div>`;i.label=te.marker(d,{interactive:!1,keyboard:!1,icon:te.divIcon({className:"acker-flabel-wrap",html:C,iconSize:[0,0]})}),l.addLayer(i.label)}function Te(i){it(i),i.handles=i.latlngs.map((c,d)=>{const y=te.marker(c,{draggable:!0,icon:te.divIcon({className:"acker-vhandle"})}).addTo(_);return y.on("drag",m=>{i.latlngs[d]=[m.target.getLatLng().lat,m.target.getLatLng().lng],i.outline.setLatLngs(i.latlngs)}),y.on("dragend",()=>ft(i)),y.on("contextmenu",m=>ce(i,d,m)),y}),i.editing=!0}function it(i){(i.handles||[]).forEach(c=>_.removeLayer(c)),i.handles=[],i.editing=!1}function pt(){a.forEach(i=>Se(i))}function xa(){a.forEach(i=>{le(i)!==i._lastDetail&&Se(i)})}function sn(i,c){i.color=c;try{i.outline?.setStyle({color:c,fillColor:c})}catch{}if(i.bedsLayer)try{i.bedsLayer.eachLayer(y=>y.setStyle&&y.setStyle({fillColor:c}))}catch{}try{const y=i.label?.getElement?.()?.querySelector?.(".acker-flabel");y&&y.style.setProperty("--fc",c)}catch{}const d=I?.querySelector(".acker-field.sel .acker-swatch");d&&(d.style.background=c)}function Jt(i){if(i.latlngs?.length)try{_.fitBounds(te.polygon(i.latlngs).getBounds(),{maxZoom:20,padding:[40,40]})}catch{}}function on(){const i=a.filter(c=>c.latlngs?.length>=3);if(!i.length){N.info("Keine Flächen vorhanden.");return}try{let c=te.polygon(i[0].latlngs).getBounds();i.slice(1).forEach(d=>{c=c.extend(te.polygon(d.latlngs).getBounds())}),_.fitBounds(c,{maxZoom:19,padding:[40,40]})}catch{}}function ft(i){i.result=T(i.latlngs,i.params),Se(i),Me(),Q(i)}function sr(i){if(Qe("app",c=>({...c,activeSection:"kultur"})),i?.id)try{window.dispatchEvent(new CustomEvent("psm:openKultur",{detail:{typ:"acker",id:String(i.id)}}))}catch{}else N.info("Fläche wird gespeichert – in der Kulturführung gleich wählbar.")}let Ae=null;const Lt=()=>{Ae&&(Ae.remove(),Ae=null,document.removeEventListener("pointerdown",ln,!0),document.removeEventListener("keydown",cn,!0))},ln=i=>{Ae&&!Ae.contains(i.target)&&Lt()},cn=i=>{i.key==="Escape"&&Lt()};function Pe(i,c){c.style.left="",c.style.right="",c.style.top="";const d=i.getBoundingClientRect(),y=c.getBoundingClientRect(),m=y.width||210,P=y.height||260;d.right+3+m>window.innerWidth-8&&(c.style.left="auto",c.style.right="calc(100% + 3px)");let C=-5;d.top+C+P>window.innerHeight-8&&(C=Math.min(-5,window.innerHeight-8-P-d.top)),d.top+C<8&&(C=8-d.top),c.style.top=C+"px"}function Ht(i,c){c.forEach(d=>{if(!d)return;if(d.sep){const m=document.createElement("div");m.className="acker-ctx-sep",i.appendChild(m);return}if(d.type==="swatchGrid"){const m=document.createElement("div");m.className="acker-ctx-swatches",d.colors.forEach(J=>{const xe=document.createElement("button");xe.type="button",xe.className="acker-sw"+(J===d.current?" on":""),xe.style.background=J,xe.title=J,xe.addEventListener("click",he=>{he.stopPropagation(),Lt(),d.onPick(J)}),m.appendChild(xe)});const P=document.createElement("label");P.className="acker-sw-custom",P.innerHTML=`<i class="bi bi-eyedropper"></i><input type="color" value="${d.current||"#3b82f6"}">`;const C=P.querySelector("input");C.addEventListener("input",J=>(d.onLive||d.onPick)(J.target.value)),C.addEventListener("change",J=>{d.onPick(J.target.value),Lt()}),m.appendChild(P),i.appendChild(m);return}const y=document.createElement("button");if(y.type="button",y.className="acker-ctx-item"+(d.danger?" danger":"")+(d.submenu?" has-sub":"")+(d.disabled?" disabled":""),y.innerHTML=`<span class="ic">${d.icon||""}</span><span class="lb">${b(d.label)}</span>`+(d.right?`<span class="rt">${b(d.right)}</span>`:"")+(d.submenu?'<span class="ch"><i class="bi bi-chevron-right"></i></span>':""),d.submenu){const m=document.createElement("div");m.className="acker-ctx-sub",Ht(m,d.submenu),y.appendChild(m),y.addEventListener("pointerenter",()=>Pe(y,m))}else d.disabled||y.addEventListener("click",m=>{m.stopPropagation(),d.keepOpen||Lt(),d.action?.()});i.appendChild(y)})}function Yt(i,c,d,y){if(Lt(),Ae=document.createElement("div"),Ae.className="acker-ctx",y){const J=document.createElement("div");J.className="acker-ctx-title",J.textContent=y,Ae.appendChild(J)}Ht(Ae,d),document.body.appendChild(Ae);const m=Ae.getBoundingClientRect();let P=i,C=c;P+m.width>window.innerWidth-8&&(P=Math.max(8,window.innerWidth-m.width-8)),C+m.height>window.innerHeight-8&&(C=Math.max(8,window.innerHeight-m.height-8)),Ae.style.left=P+"px",Ae.style.top=C+"px",setTimeout(()=>{document.addEventListener("pointerdown",ln,!0),document.addEventListener("keydown",cn,!0)},0)}const ka=i=>{const c=i.originalEvent||i;return c&&te.DomEvent.preventDefault?.(c),i.originalEvent&&te.DomEvent.stop?.(i),{x:c.clientX,y:c.clientY}};function Xt(i,c){i.params.angle=(Math.round(i.params.angle+c)%180+180)%180,ft(i),N.info(`Beete-Ausrichtung: ${i.params.angle}°`)}function Ye(i){const c=i.latlngs||[];c.length<2||!pe||(i.params.angle=A(c),ft(i),N.success(`Beete an Fläche ausgerichtet (${U(i.params.angle,0)}°).`))}function dn(){const i=a.filter(d=>(d.latlngs||[]).length>=3);if(!i.length){N.info("Keine Flächen vorhanden.");return}let c=0;i.forEach(d=>{const y=A(d.latlngs);Math.abs(y-(d.params.angle||0))>=.5&&(d.params.angle=y,d.result=T(d.latlngs,d.params),Se(d),Q(d),c++)}),Me(),N.success(c?`${c} Fläche(n) an Längsachse ausgerichtet.`:"Alle Flächen sind bereits ausgerichtet.")}function un(i,c){i.color=c,Se(i),Me(),Q(i)}function ea(i,c){i.kultur=c||null,i.eppoCode=Kt.find(d=>d.kultur===i.kultur)?.eppoCode||null,Se(i),Me(),Q(i),N.success(c?`Kultur: ${c}`:"Kultur entfernt.")}function wa(i){i.bedsHidden=!i.bedsHidden,Se(i),N.info(i.bedsHidden?"Beete ausgeblendet.":"Beete eingeblendet.")}function x(i){K(i._key),setTimeout(()=>{const c=I?.querySelector(".acker-field.sel .acker-name");c&&(c.focus(),c.select())},30)}function L(i){const d=vs()*18/111320,y={_key:"new-"+ ++or,id:null,name:(i.name||"Fläche")+" (Kopie)",kultur:i.kultur,eppoCode:i.eppoCode,standortId:i.standortId,color:zt[(zt.indexOf(i.color)+1)%zt.length],latlngs:i.latlngs.map(m=>[m[0]+d,m[1]+d]),params:{...i.params},outline:null,bedsLayer:null,label:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(y),n=y._key,ft(y),Q(y,!0),N.success("Fläche dupliziert.")}function O(i){const c=i.latlngs||[];if(c.length<3){N.warning("Fläche hat keine Geometrie.");return}const d=c.map(m=>[Number(m[1]),Number(m[0])]);(d[0][0]!==d[d.length-1][0]||d[0][1]!==d[d.length-1][1])&&d.push([d[0][0],d[0][1]]);const y={type:"FeatureCollection",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:[{type:"Feature",geometry:{type:"Polygon",coordinates:[d]},properties:{name:i.name||"",kultur:i.kultur||null,eppoCode:i.eppoCode||null,flaeche_m2:Math.round(i.result?.areaM2||0),beete:i.result?.beds?.length||0,beetmeter_m:Math.round(i.result?.bedMeters||0),pflanzen:i.result?.plants||0}}]};try{const m=new Blob([JSON.stringify(y,null,2)],{type:"application/geo+json"}),P=URL.createObjectURL(m),C=document.createElement("a");C.href=P,C.download=`${(i.name||"flaeche").replace(/[^\w\-]+/g,"_")}.geojson`,document.body.appendChild(C),C.click(),C.remove(),setTimeout(()=>URL.revokeObjectURL(P),1e3),N.success("Fläche als GeoJSON exportiert.")}catch{N.error("Export fehlgeschlagen.")}}async function H(i){const c=i.result||{},d=[`Fläche: ${i.name||""}`,i.kultur?`Kultur: ${i.kultur}`:"",`Größe: ${U(c.areaM2||0)} m² (${U((c.areaM2||0)/1e4,3)} ha)`,`Beete: ${U(c.beds?.length||0)}`,`Beetmeter: ${U(c.bedMeters||0)} m`,`Pflanzen: ${U(c.plants||0)}`].filter(Boolean).join(`
`);try{await navigator.clipboard.writeText(d),N.success("Werte kopiert.")}catch{N.warning("Kopieren nicht möglich.")}}const z=i=>({icon:'<i class="bi bi-palette"></i>',label:"Farbe",submenu:[{type:"swatchGrid",colors:zt,current:i.color,onPick:c=>un(i,c),onLive:c=>sn(i,c)}]}),M=i=>({icon:'<i class="bi bi-flower1"></i>',label:"Kultur zuweisen",submenu:[{icon:'<i class="bi bi-x"></i>',label:"– keine –",action:()=>ea(i,null)},...Kt.length?[{sep:!0}]:[],...Kt.map(c=>({icon:c.kultur===i.kultur?'<i class="bi bi-check2"></i>':"",label:`${c.kultur}${c.anbau?" ("+c.anbau+")":""}`,action:()=>ea(i,c.kultur)}))]});function B(i,c,d){K(i._key);const{x:y,y:m}=ka(c),P=!!i.editing;Yt(y,m,[{icon:'<i class="bi bi-clipboard2-pulse"></i>',label:"Kulturführung öffnen",action:()=>sr(i)},{icon:'<i class="bi bi-pencil"></i>',label:"Umbenennen",action:()=>x(i)},M(i),z(i),{sep:!0},{icon:'<i class="bi bi-arrow-clockwise"></i>',label:"Beete drehen +15°",keepOpen:!0,action:()=>Xt(i,15)},{icon:'<i class="bi bi-arrow-counterclockwise"></i>',label:"Beete drehen −15°",keepOpen:!0,action:()=>Xt(i,-15)},{icon:'<i class="bi bi-bounding-box"></i>',label:"Beete an Fläche ausrichten",action:()=>Ye(i)},{icon:'<i class="bi bi-grid-3x3-gap"></i>',label:i.bedsHidden?"Beete einblenden":"Beete ausblenden",action:()=>wa(i)},{icon:'<i class="bi bi-bounding-box-circles"></i>',label:P?"Eckpunkte fertig":"Eckpunkte bearbeiten",action:()=>{P?it(i):Te(i)}},{sep:!0},{icon:'<i class="bi bi-copy"></i>',label:"Duplizieren",action:()=>L(i)},{icon:'<i class="bi bi-zoom-in"></i>',label:"Auf Fläche zoomen",action:()=>Jt(i)},{icon:'<i class="bi bi-clipboard-data"></i>',label:"Werte kopieren",action:()=>H(i)},{icon:'<i class="bi bi-download"></i>',label:"Als GeoJSON exportieren",action:()=>O(i)},{sep:!0},{icon:'<i class="bi bi-trash"></i>',label:"Löschen",danger:!0,action:()=>re(i._key)}],d?`${i.name||"Fläche"} · Beet ${d}`:i.name||"Fläche")}function ce(i,c,d){const{x:y,y:m}=ka(d);Yt(y,m,[{icon:'<i class="bi bi-node-minus"></i>',label:"Eckpunkt löschen",disabled:i.latlngs.length<=3,action:()=>{i.latlngs.length<=3||(i.latlngs.splice(c,1),ft(i))}},{icon:'<i class="bi bi-check2"></i>',label:"Bearbeiten beenden",action:()=>it(i)}],`Eckpunkt ${c+1}`)}function de(){!o.sat||!o.osm||(_.hasLayer(o.sat)?(_.removeLayer(o.sat),o.osm.addTo(_),N.info("Karte: OSM")):(_.removeLayer(o.osm),o.sat.addTo(_),N.info("Karte: Satellit")))}function fe(i){const c=i.latlng,{x:d,y}=ka(i);Yt(d,y,[{icon:'<i class="bi bi-pencil-square"></i>',label:"Neue Fläche hier zeichnen",action:()=>{_t(!0),gn({latlng:c})}},{icon:'<i class="bi bi-crosshair"></i>',label:"Hierhin zentrieren",action:()=>_.panTo(c)},{sep:!0},{icon:'<i class="bi bi-arrows-fullscreen"></i>',label:"Alle Flächen anzeigen",disabled:!a.some(m=>m.latlngs?.length>=3),action:on},{icon:'<i class="bi bi-bounding-box"></i>',label:"Alle Beete an Flächen ausrichten",disabled:!a.some(m=>m.latlngs?.length>=3),action:dn},{icon:'<i class="bi bi-layers"></i>',label:"Kartentyp wechseln (Satellit/OSM)",action:de},{sep:!0},{icon:'<i class="bi bi-geo-alt"></i>',label:"Koordinaten kopieren",action:async()=>{try{await navigator.clipboard.writeText(`${c.lat.toFixed(6)}, ${c.lng.toFixed(6)}`),N.success("Koordinaten kopiert.")}catch{N.warning("Kopieren nicht möglich.")}}}],"Karte")}function X(i){return['<option value="">– Kultur –</option>'].concat(Kt.map(c=>{const d=`${c.kultur}${c.anbau?" ("+c.anbau+")":""}`;return`<option value="${b(c.kultur)}"${c.kultur===i?" selected":""}>${b(d)}</option>`})).join("")}function G(i){const c=Ue(t.state.getState().gps?.points)||[];return['<option value="">– Standort –</option>'].concat(c.map(d=>`<option value="${b(d.id)}"${d.id===i?" selected":""}>${b(d.name||"")}</option>`)).join("")}function ee(i){const c=h(i);return c?`<span class="acker-cropchip" title="Kultur"><span class="dot" style="background:${b(c.color||"#94a3b8")}"></span>${b(c.name)}</span>`:""}function me(){if(!W)return;let i=0,c=0,d=0,y=0;a.forEach(P=>{i+=P.result?.areaM2||0,c+=P.result?.beds?.length||0,d+=P.result?.bedMeters||0,y+=P.result?.plants||0});const m=(P,C)=>{const J=W.querySelector(P);J&&(J.textContent=C)};m('[data-t="area"]',U(i)+" m² · "+U(i/1e4,3)+" ha"),m('[data-t="beds"]',U(c)),m('[data-t="meters"]',U(d)+" m"),m('[data-t="plants"]',U(y))}function we(i,c){const d=c.result||{},y=i.querySelector(".acker-stat");y&&(y.textContent=U(d.plants||0)+" Pfl.");const m=i.querySelectorAll(".acker-res .r b");m[0]&&(m[0].textContent=U(d.areaM2||0)+" m² · "+U((d.areaM2||0)/1e4,3)+" ha"),m[1]&&(m[1].textContent=U(d.beds?.length||0)),m[2]&&(m[2].textContent=U(d.bedMeters||0)+" m"),m[3]&&(m[3].textContent=U(d.plants||0)),me()}const Re=["Jan.","Feb.","März","Apr.","Mai","Juni","Juli","Aug.","Sep.","Okt.","Nov.","Dez."];function q(i){if(!i)return"";const c=new Date(String(i).slice(0,10)+"T00:00:00");return isNaN(c.getTime())?"":`${c.getDate()}. ${Re[c.getMonth()]}`}function ue(i){const c=i?.ernteVon?q(i.ernteVon):"",d=i?.ernteBis||i?.ernteDatum?q(i.ernteBis||i.ernteDatum):"";return c&&d?`Ernte ${c}–${d}`:d?`Ernte ~${d}`:c?`Ernte ab ${c}`:""}function $e(){const i=E('[data-role="acker-info"]');i&&(i.style.display="none")}function ge(i){const c=E('[data-role="acker-info"]');if(!c)return;const{current:d,next:y}=la(v(i.typ,i.id)),m=k(i.typ,i.id).filter(st=>st.status==="geplant").length,P=i.typ==="haus",C=i.area?`${U(i.area)} m²`:"",J=d?ga(d):"#94a3b8",xe=d?`<div class="ai-row"><span class="ai-dot" style="background:${b(J)}"></span>
           <div><div class="ai-crop">${b(d.kultur||"Kultur")}</div>
           <div class="ai-sub">${b([d.pflanzDatum?"gepflanzt "+q(d.pflanzDatum):"",ue(d)].filter(Boolean).join(" · "))}</div></div></div>`:'<div class="ai-row"><span class="ai-dot" style="background:#cbd5e1"></span><div class="ai-crop muted">Fläche ist frei</div></div>',he=y?`<div class="ai-next"><i class="bi bi-arrow-right-short"></i> Danach: <b>${b(y.kultur||"")}</b>${y.pflanzDatum?" ab "+q(y.pflanzDatum):""}</div>`:"",Ee=!P&&i.fieldRef?`<div class="ai-metrics"><span><b>${U(i.fieldRef.result?.beds?.length||0)}</b> Beete</span><span><b>${U(i.fieldRef.result?.bedMeters||0)}</b> m</span><span><b>${U(i.fieldRef.result?.plants||0)}</b> Pfl.</span></div>`:"",Xe=`<div class="ai-tasks${m?" has":""}"><i class="bi ${m?"bi-list-check":"bi-check2-circle"}"></i> ${m?m+" Aufgabe"+(m===1?"":"n")+" offen":"Nichts offen"}</div>`;c.innerHTML=`
      <div class="ai-head">
        <div class="ai-title"><b>${b(i.name||"Fläche")}</b><span class="ai-badge">${P?"Gewächshaus":"Freiland"}${C?" · "+C:""}</span></div>
        <button class="ai-x" data-ai="close" title="Schließen"><i class="bi bi-x-lg"></i></button>
      </div>
      ${xe}${he}${Ee}${Xe}
      <div class="ai-actions">
        <button class="ai-btn primary" data-ai="kultur"><i class="bi bi-clipboard2-pulse"></i> Kulturführung</button>
        <button class="ai-btn" data-ai="zoom"><i class="bi bi-zoom-in"></i> Hin</button>
      </div>`,c.style.display="block",c.querySelector('[data-ai="close"]')?.addEventListener("click",$e),c.querySelector('[data-ai="kultur"]')?.addEventListener("click",()=>{Qe("app",st=>({...st,activeSection:"kultur"}));try{window.dispatchEvent(new CustomEvent("psm:openKultur",{detail:{typ:i.typ,id:String(i.id)}}))}catch{}}),c.querySelector('[data-ai="zoom"]')?.addEventListener("click",()=>{!P&&i.fieldRef?Jt(i.fieldRef):i.latlng&&_.setView(i.latlng,Math.max(_.getZoom(),18))})}function Me(){if(!I||!V||!W)return;V.style.display=a.length?"none":"block",W.style.display=a.length?"block":"none",I.innerHTML="";let i=0,c=0,d=0,y=0;a.forEach(m=>{i+=m.result?.areaM2||0,c+=m.result?.beds?.length||0,d+=m.result?.bedMeters||0,y+=m.result?.plants||0;const P=m._key===n,C=document.createElement("div");C.className="acker-field"+(P?" sel open":""),C.innerHTML=`
        <div class="acker-fhead">
          <span class="acker-swatch" style="background:${m.color}"></span>
          <input class="acker-name" value="${b(m.name)}" />
          ${ee(m)}
          <span class="acker-stat">${U(m.result?.plants||0)} Pfl.</span>
        </div>
        <div class="acker-fbody">
          <div class="acker-grid">
            <label class="acker-fld span2">Kultur<select data-k="kultur">${X(m.kultur)}</select></label>
            <label class="acker-fld span2">Standort (für PSM)<select data-k="standortId">${G(m.standortId)}</select></label>
            <label class="acker-fld">Bettbreite (m)<input data-k="bedW" type="number" step="0.05" min="0.1" value="${m.params.bedW}"/></label>
            <label class="acker-fld">Wegbreite (m)<input data-k="pathW" type="number" step="0.05" min="0" value="${m.params.pathW}"/></label>
            <label class="acker-fld">Reihenabstand (m)<input data-k="rowSp" type="number" step="0.05" min="0.05" value="${m.params.rowSp}"/></label>
            <label class="acker-fld">Pflanzabstand (m)<input data-k="inRowSp" type="number" step="0.05" min="0.05" value="${m.params.inRowSp}"/></label>
            <div class="acker-fld span2">
              <div class="acker-angle-head"><span>Ausrichtung der Beete: <b>${U(m.params.angle,0)}°</b></span>
                <button class="acker-align" data-act="align" type="button" title="Beete an Längsachse der Fläche ausrichten"><i class="bi bi-bounding-box"></i> an Fläche</button>
              </div>
              <input data-k="angle" type="range" min="0" max="180" step="1" value="${m.params.angle}"/>
            </div>
          </div>
          <div class="acker-res">
            <div class="r"><span>Fläche</span><b>${U(m.result?.areaM2||0)} m² · ${U((m.result?.areaM2||0)/1e4,3)} ha</b></div>
            <div class="r"><span>Beete</span><b>${U(m.result?.beds?.length||0)}</b></div>
            <div class="r"><span>Beetmeter</span><b>${U(m.result?.bedMeters||0)} m</b></div>
            <div class="r"><span>Pflanzen</span><b>${U(m.result?.plants||0)}</b></div>
          </div>
          <div class="acker-actions">
            <label class="acker-colorbtn" title="Farbe wählen"><input type="color" data-act="color" value="${m.color}"><i class="bi bi-palette"></i></label>
            <button class="btn btn-sm acker-abtn" data-act="zoom" title="Auf Fläche zoomen"><i class="bi bi-zoom-in"></i></button>
            <button class="btn btn-sm acker-abtn" data-act="dup" title="Duplizieren"><i class="bi bi-copy"></i></button>
            <button class="btn btn-sm acker-abtn" data-act="rot" title="Beete drehen +15°"><i class="bi bi-arrow-clockwise"></i></button>
            <span style="flex:1"></span>
            <button class="btn btn-sm acker-abtn danger" data-act="del" title="Löschen"><i class="bi bi-trash"></i></button>
          </div>
          <div class="acker-hint"><i class="bi bi-arrows-move"></i> Ausgewählte Fläche ziehen = verschieben · Rechtsklick = mehr Aktionen</div>
        </div>`,C.querySelector(".acker-fhead").addEventListener("click",he=>{he.target.classList.contains("acker-name")||(K(m._key),ge({typ:"acker",id:m.id,name:m.name,area:m.result?.areaM2||0,fieldRef:m}))}),C.querySelector(".acker-name").addEventListener("input",he=>{m.name=he.target.value,Q(m)}),C.querySelectorAll("[data-k]").forEach(he=>{const Ee=he.dataset.k;if(Ee==="kultur"){he.addEventListener("input",Xe=>{m.kultur=Xe.target.value||null,m.eppoCode=Kt.find(st=>st.kultur===m.kultur)?.eppoCode||null,Se(m),Q(m)});return}if(Ee==="standortId"){he.addEventListener("input",Xe=>{m.standortId=Xe.target.value||null,Q(m)});return}he.addEventListener("input",Xe=>{if(Ee==="angle"?m.params.angle=+Xe.target.value:m.params[Ee]=parseFloat(Xe.target.value)||0,m.result=T(m.latlngs,m.params),Se(m),we(C,m),Ee==="angle"){const st=C.querySelector(".acker-angle-head b");st&&(st.textContent=U(m.params.angle,0)+"°")}Q(m)})}),C.querySelector('[data-act="align"]')?.addEventListener("click",()=>Ye(m)),C.querySelector('[data-act="del"]').addEventListener("click",()=>re(m._key)),C.querySelector('[data-act="zoom"]').addEventListener("click",()=>Jt(m)),C.querySelector('[data-act="dup"]').addEventListener("click",()=>L(m)),C.querySelector('[data-act="rot"]').addEventListener("click",()=>Xt(m,15));const xe=C.querySelector('[data-act="color"]');xe.addEventListener("input",he=>sn(m,he.target.value)),xe.addEventListener("change",he=>un(m,he.target.value)),I.appendChild(C)}),W.querySelector('[data-t="area"]').textContent=U(i)+" m² · "+U(i/1e4,3)+" ha",W.querySelector('[data-t="beds"]').textContent=U(c),W.querySelector('[data-t="meters"]').textContent=U(d)+" m",W.querySelector('[data-t="plants"]').textContent=U(y)}function K(i){n=i,a.forEach(c=>Se(c)),Me()}async function re(i){const c=a.find(y=>y._key===i);if(!c)return;ke(c);const d=a.findIndex(y=>y._key===i);if(d>=0&&a.splice(d,1),n===i&&(n=null),Me(),c.id&&oe()==="sqlite")try{await rl({id:c.id}),await nt().catch(()=>{})}catch{}}let ie=null;function Sa(i,c){Dt||i._key!==n||(ie={fl:i,lastLL:c.latlng,moved:!1},_.dragging.disable(),_.getContainer().style.cursor="grabbing",te.DomEvent.stop(c))}function pn(i){if(!ie)return;const c=ie.fl;if(!ie.moved){c.bedsLayer&&(_.removeLayer(c.bedsLayer),c.bedsLayer=null);try{c.outline.setStyle({fillOpacity:.3,dashArray:"6 5"})}catch{}}const d=i.latlng.lat-ie.lastLL.lat,y=i.latlng.lng-ie.lastLL.lng;ie.lastLL=i.latlng,ie.moved=!0,c.latlngs=c.latlngs.map(m=>[m[0]+d,m[1]+y]);try{c.outline.setLatLngs(c.latlngs)}catch{}if((c.handles||[]).forEach((m,P)=>{try{m.setLatLng(c.latlngs[P])}catch{}}),c.label)try{c.label.setLatLng(c.outline.getBounds().getCenter())}catch{}}function Ot(){if(!ie)return;const i=ie.fl,c=ie.moved;ie=null,_.dragging.enable(),_.getContainer().style.cursor="",c&&ft(i)}function Ea(i){if(be.length<3)return!1;const c=_.latLngToContainerPoint(te.latLng(be[0][0],be[0][1])),d=_.latLngToContainerPoint(i);return c.distanceTo(d)<=14}function fn(i){if(!pe||i.length<3)return 0;try{const c=i.map(d=>[d[1],d[0]]);return c.push(c[0]),pe.area(pe.polygon([c]))}catch{return 0}}function ta(i){const c=E('[data-role="acker-draw-stats"]');if(!c)return;const d=fn(i);c.textContent=`${be.length} Punkt${be.length===1?"":"e"}`+(d>0?` · ~${U(d)} m²`:"")}let Dt=!1,be=[],Ke=null,We=[],or=0;function lr(){Ke&&(_.removeLayer(Ke),Ke=null),We.forEach(i=>_.removeLayer(i)),We=[],be=[]}function _t(i){Dt=i,E('[data-role="acker-banner"]').style.display=i?"block":"none",E('[data-role="acker-draw"]').style.display=i?"none":"block",_.getContainer().style.cursor=i?"crosshair":"",i?_.on("mousemove",Da):(_.off("mousemove",Da),lr())}function La(i){const c=i?[...be,[i.lat,i.lng]]:be;if(c.length<2){Ke&&(_.removeLayer(Ke),Ke=null);return}Ke?Ke.setLatLngs(c):Ke=te.polygon(c,{interactive:!1,className:"acker-draw-preview",color:"#22c55e",weight:2.5,fillColor:"#22c55e",fillOpacity:.18,dashArray:"6 5"}).addTo(_)}function mn(i,c){const d=te.circleMarker(i,{radius:c?7:5,color:"#fff",fillColor:c?"#16a34a":"#22c55e",fillOpacity:1,weight:2,interactive:c,bubblingMouseEvents:!1}).addTo(_);c&&(d.bindTooltip("Zum Schließen anklicken",{direction:"top"}),d.on("click",y=>{te.DomEvent.stop(y),be.length>=3&&aa()})),We.push(d)}function gn(i){if(!Dt){$e();return}if(Ea(i.latlng)){aa();return}be.push([i.latlng.lat,i.latlng.lng]),mn(i.latlng,be.length===1),La(),ta(be)}function Da(i){if(!Dt||!be.length)return;const c=Ea(i.latlng);if(La(c?void 0:i.latlng),We[0])try{We[0].setRadius(c?10:7),We[0].setStyle({weight:c?3:2})}catch{}ta(c?be:[...be,[i.latlng.lat,i.latlng.lng]])}function bn(){if(!be.length)return;be.pop();const i=We.pop();i&&_.removeLayer(i),La(),ta(be)}function aa(){if(be.length<3){N.warning("Mindestens 3 Punkte setzen.");return}const i={_key:"new-"+ ++or,id:null,name:"Fläche "+(a.length+1),kultur:null,eppoCode:null,standortId:null,color:zt[a.length%zt.length],latlngs:be.map(c=>c.slice()),params:Rd(),outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(i),_t(!1),n=i._key,i.params.angle=A(i.latlngs),ft(i),Q(i,!0)}async function $t(){const i=E('[data-role="acker-q"]').value.trim();if(i)try{const d=await(await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+encodeURIComponent(i))).json();d[0]?_.setView([+d[0].lat,+d[0].lon],18):N.info("Nichts gefunden.")}catch{N.warning("Suche nicht verfügbar.")}}async function cr(){if($n){setTimeout(()=>_&&_.invalidateSize(),60);return}$n=!0;try{await It(()=>Promise.resolve({}),__vite__mapDeps([2]));const y=await It(()=>import("./leaflet-src.BcflbDBd.js").then(m=>m.l),__vite__mapDeps([3,4]));te=y.default||y,pe=await It(()=>import("./index.CPadEFgJ.js"),__vite__mapDeps([5,4]))}catch(y){console.warn("[Acker] Karten-Bibliotheken konnten nicht geladen werden:",y),V&&(V.textContent="Karte konnte nicht geladen werden (offline?)."),$n=!1;return}_=te.map(ye,{doubleClickZoom:!1,zoomControl:!0,attributionControl:!0}).setView([47.818,8.976],17);const i=te.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:21,maxNativeZoom:19,attribution:"Tiles © Esri"}).addTo(_),c=te.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"});o={sat:i,osm:c},s=te.layerGroup(),w(),s.addTo(_),l=te.layerGroup().addTo(_);const d=te.DomUtil.create("div","acker-info");d.setAttribute("data-role","acker-info"),d.style.display="none",_.getContainer().appendChild(d),te.DomEvent.disableClickPropagation(d),te.DomEvent.disableScrollPropagation(d),_.on("click",gn),_.on("contextmenu",y=>{if(Dt){te.DomEvent.preventDefault?.(y.originalEvent||y),bn();return}fe(y)}),_.on("mousemove",pn),_.on("mouseup",Ot),document.addEventListener("mouseup",Ot),_.on("zoomend",xa),E('[data-role="acker-draw"]').addEventListener("click",()=>_t(!0)),E('[data-role="acker-export"]')?.addEventListener("click",S),E('[data-role="acker-finish"]').addEventListener("click",aa),E('[data-role="acker-cancel"]').addEventListener("click",()=>_t(!1)),E('[data-role="acker-go"]').addEventListener("click",$t),E('[data-role="acker-q"]').addEventListener("keydown",y=>{y.key==="Enter"&&$t()}),E('[data-role="ctrl-fit"]')?.addEventListener("click",on),E('[data-role="ctrl-labels"]')?.addEventListener("click",()=>{u=!u,E('[data-role="ctrl-labels"]')?.classList.toggle("on",u),pt()}),E('[data-role="ctrl-beds"]')?.addEventListener("click",()=>{f=!f,E('[data-role="ctrl-beds"]')?.classList.toggle("on",f),pt()}),E('[data-role="ctrl-basemap"]')?.addEventListener("click",de),document.addEventListener("keydown",y=>{Dt&&(y.key==="Backspace"&&(y.preventDefault(),bn()),y.key==="Enter"&&aa(),y.key==="Escape"&&_t(!1))}),await $a(),await na(),await dr(),setTimeout(()=>_.invalidateSize(),60)}async function $a(){if(oe()==="sqlite")try{Kt=(await Yr())?.rows||[]}catch{Kt=[]}}async function na(){if(oe()!=="sqlite"){p=[],g=[];return}try{p=(await Ar())?.rows||[]}catch{p=[]}try{g=(await An())?.rows||[]}catch{g=[]}}async function dr(){if(oe()==="sqlite")try{((await Xr())?.rows||[]).forEach(d=>{const y={_key:"db-"+d.id,id:d.id,name:d.name,kultur:d.kultur,eppoCode:d.eppoCode,standortId:d.standortId,color:d.color||zt[a.length%zt.length],latlngs:d.latlngs||[],params:{bedW:d.bedW??1.2,pathW:d.pathW??.4,rowSp:d.rowSp??.5,inRowSp:d.inRowSp??.4,angle:d.angle??0},outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};y.result=T(y.latlngs,y.params),a.push(y),Se(y)}),Me();const c=a.find(d=>d.latlngs?.length);if(c&&_)try{_.fitBounds(te.polygon(c.latlngs).getBounds(),{maxZoom:19,padding:[30,30]})}catch{}}catch(i){console.warn("[Acker] Flächen laden fehlgeschlagen:",i)}}t.state.subscribe(i=>{if(i?.app?.activeSection==="acker"){if(!$n){cr();return}(async()=>(await na(),pt(),Me(),setTimeout(()=>_&&_.invalidateSize(),60)))()}}),Me()}function Wd(){return`
  <style>
    .acker-wrap{display:flex;gap:0;height:calc(100vh - 80px);min-height:460px;border:1px solid var(--border-1);border-radius:12px;overflow:hidden;background:var(--surface-1,#0f172a)}
    .acker-side{width:340px;min-width:300px;display:flex;flex-direction:column;border-right:1px solid var(--border-1);overflow:hidden}
    .acker-scroll{overflow-y:auto;padding:12px 14px;flex:1}
    .acker-map{flex:1;min-height:300px}
    .acker-search{display:flex;gap:6px;margin-bottom:10px}
    .acker-search input{flex:1}
    .acker-banner{display:none;background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.4);color:var(--text);padding:10px 12px;border-radius:8px;font-size:12.5px;margin-bottom:10px;line-height:1.45}
    .acker-banner .row{display:flex;gap:8px;margin-top:8px}
    .acker-totals{background:var(--surface-2,rgba(255,255,255,.04));border:1px solid var(--border-1);border-radius:10px;padding:12px;margin-bottom:12px}
    .acker-totals .t-row{display:flex;justify-content:space-between;font-size:13px;padding:3px 0}
    .acker-totals .big{font-size:20px;font-weight:700;color:#22c55e}
    .acker-legend{display:flex;align-items:center;gap:13px;margin-top:9px;padding-top:8px;border-top:1px solid var(--border-1);font-size:11.5px;color:var(--text-muted)}
    .acker-legend .lg{display:inline-flex;align-items:center;gap:5px}
    .acker-legend .lg i{width:17px;height:11px;border-radius:3px;display:inline-block;flex:none}
    .acker-legend .lg i.bed{background:#22c55e;box-shadow:inset 0 0 0 1px #fff}
    .acker-legend .lg i.path{background:transparent;border:1px dashed var(--text-dim,#64748b)}
    .acker-legend .lg-hint{margin-left:auto;font-size:10px;color:var(--text-dim)}
    .acker-empty{color:var(--text-muted,#94a3b8);font-size:13px;text-align:center;padding:22px 8px;line-height:1.5}
    .acker-field{border:1px solid var(--border-1);border-radius:10px;margin-bottom:10px;overflow:hidden}
    .acker-field.sel{border-color:#22c55e;box-shadow:0 0 0 1px #22c55e}
    .acker-fhead{display:flex;align-items:center;gap:8px;padding:9px 10px;cursor:pointer}
    .acker-swatch{width:14px;height:14px;border-radius:4px;flex:none;border:1px solid rgba(0,0,0,.2)}
    .acker-name{flex:1;font-size:13.5px;font-weight:600;border:0;background:transparent;outline:none;color:var(--text);min-width:0}
    .acker-stat{font-size:12px;color:var(--text-muted,#94a3b8)}
    .acker-cropchip{display:inline-flex;align-items:center;gap:5px;font-size:11px;color:var(--text);background:var(--surface-2,rgba(255,255,255,.05));border:1px solid var(--border-1);border-radius:20px;padding:2px 9px;max-width:120px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
    .acker-cropchip .dot{width:8px;height:8px;border-radius:50%;flex:none}
    .acker-angle-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:5px}
    .acker-align{display:inline-flex;align-items:center;gap:4px;font-size:11px;border:1px solid var(--border-1);background:var(--surface-1);color:var(--text-muted);border-radius:7px;padding:4px 8px;cursor:pointer;white-space:nowrap}
    .acker-align:hover{background:var(--surface-3);color:#15803d;border-color:#86efac}
    /* Karten-Anzeigeschalter im Panel (statt schwebender Icons) */
    .acker-mapctrls{display:flex;gap:6px;margin-top:8px}
    .acker-mapctrls button{flex:1;height:34px;border:1px solid var(--border-1);background:var(--surface-1);color:var(--text-muted);border-radius:8px;cursor:pointer;font-size:15px;display:inline-flex;align-items:center;justify-content:center}
    .acker-mapctrls button:hover{background:var(--surface-3);color:var(--text)}
    .acker-mapctrls button.on{background:#dcfce7;color:#15803d;border-color:#86efac}
    /* Info-Karte (Klick auf Fläche/Gewächshaus) – Overlay im Karten-Container */
    .acker-info{position:absolute;top:12px;left:52px;z-index:1000;width:270px;max-width:calc(100% - 64px);background:#fff;border:1px solid #d3dce4;border-radius:13px;box-shadow:0 12px 32px rgba(15,23,42,.24);padding:12px 13px;font-size:13px;color:#152230}
    .acker-info .ai-head{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:8px}
    .acker-info .ai-title b{font-size:15px;font-weight:700;display:block;line-height:1.2}
    .acker-info .ai-badge{font-size:11px;color:#0f766e;background:rgba(16,163,74,.1);border-radius:6px;padding:1px 7px;display:inline-block;margin-top:3px}
    .acker-info .ai-x{border:0;background:transparent;color:#94a3b8;cursor:pointer;font-size:14px;padding:2px;line-height:1}
    .acker-info .ai-x:hover{color:#334155}
    .acker-info .ai-row{display:flex;gap:9px;align-items:flex-start;margin:6px 0}
    .acker-info .ai-dot{width:12px;height:12px;border-radius:50%;flex:none;margin-top:3px}
    .acker-info .ai-crop{font-size:14.5px;font-weight:700;line-height:1.15}
    .acker-info .ai-crop.muted{color:#64748b;font-weight:600;font-size:13.5px}
    .acker-info .ai-sub{font-size:12px;color:#64748b;margin-top:1px}
    .acker-info .ai-next{font-size:12px;color:#475569;margin:3px 0 2px}
    .acker-info .ai-next b{color:#152230}
    .acker-info .ai-metrics{display:flex;gap:12px;margin:8px 0;padding:7px 0;border-top:1px solid #eef2f6;border-bottom:1px solid #eef2f6;font-size:12px;color:#64748b}
    .acker-info .ai-metrics b{color:#15803d;font-size:14px}
    .acker-info .ai-tasks{font-size:12.5px;color:#64748b;margin:7px 0 0;display:flex;align-items:center;gap:6px}
    .acker-info .ai-tasks.has{color:#b45309;font-weight:600}
    .acker-info .ai-tasks i{font-size:14px}
    .acker-info .ai-actions{display:flex;gap:7px;margin-top:10px}
    .acker-info .ai-btn{flex:1;border:1px solid #d3dce4;background:#fff;color:#334155;border-radius:8px;padding:7px 8px;font-size:12.5px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:5px;white-space:nowrap}
    .acker-info .ai-btn:hover{background:#eef2f6}
    .acker-info .ai-btn.primary{background:#16a34a;border-color:#16a34a;color:#fff}
    .acker-info .ai-btn.primary:hover{background:#15803d}
    .acker-fbody{display:none;padding:0 10px 10px;border-top:1px solid var(--border-1)}
    .acker-field.open .acker-fbody{display:block}
    .acker-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
    .acker-fld{font-size:11px;color:var(--text-muted,#94a3b8);display:flex;flex-direction:column;gap:3px}
    .acker-fld input,.acker-fld select{padding:6px 7px;border:1px solid var(--border-1);border-radius:7px;font-size:12.5px;width:100%;background:var(--surface-2,rgba(255,255,255,.04));color:var(--text)}
    .acker-fld.span2{grid-column:1 / -1}
    .acker-res{margin-top:10px;background:var(--surface-2,rgba(255,255,255,.04));border-radius:8px;padding:8px 10px}
    .acker-res .r{display:flex;justify-content:space-between;font-size:12.5px;padding:2px 0}
    .acker-res .r b{color:#22c55e}
    .acker-actions{display:flex;justify-content:space-between;margin-top:10px;gap:8px}
    .acker-vhandle{background:#fff;border:2px solid #15803d;border-radius:50%;width:12px!important;height:12px!important;margin-left:-6px!important;margin-top:-6px!important;cursor:grab}
    .acker-outline-grab{cursor:grab}
    .acker-draw-preview{animation:acker-ants .8s linear infinite}
    @keyframes acker-ants{to{stroke-dashoffset:-22}}
    .acker-draw-stats{font-size:12.5px;font-weight:700;color:#15803d;margin-top:6px}
    .acker-standort-dot{display:block;width:14px;height:14px;border-radius:50%;background:#f59e0b;border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.35)}
    .acker-standort-label{background:rgba(255,255,255,.92);color:#1f2937;border:1px solid #d97706;border-radius:6px;padding:1px 6px;font-size:11px;font-weight:600;box-shadow:0 1px 3px rgba(0,0,0,.25)}
    .acker-standort-label::before{display:none}
    /* Flächen-Beschriftung (Zentroid) */
    .acker-flabel-wrap{pointer-events:none!important}
    .acker-flabel{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:0;white-space:nowrap;padding:3px 9px;border-radius:9px;background:rgba(255,255,255,.93);border:1.5px solid var(--fc,#3b82f6);box-shadow:0 1px 5px rgba(0,0,0,.28);line-height:1.15}
    .acker-flabel b{font-weight:700;font-size:12px;color:#1f2937}
    .acker-flabel i{font-style:normal;color:#15803d;font-weight:600;font-size:10.5px}
    .acker-flabel .cr{font-style:normal;font-weight:700;font-size:10px;color:#fff;background:var(--cc,#16a34a);border-radius:5px;padding:1px 6px;margin:1px 0;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .acker-flabel .cr .dot{display:none}
    .acker-flabel.sel{box-shadow:0 2px 9px rgba(0,0,0,.34);transform:translate(-50%,-50%) scale(1.05)}
    /* Floating-Toolbar */
    .acker-toolbar a{display:flex!important;align-items:center;justify-content:center;font-size:15px;color:#334155;background:#fff;width:30px;height:30px;line-height:30px}
    .acker-toolbar a.on{color:#15803d;background:#dcfce7}
    .acker-toolbar a:hover{background:#eef2f6}
    .acker-toolbar a.on:hover{background:#bbf7d0}
    /* Panel-Aktionen */
    .acker-actions{display:flex;align-items:center;gap:6px;margin-top:10px}
    .acker-colorbtn{position:relative;width:30px;height:30px;border-radius:7px;border:1px solid var(--border-1);display:flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;flex:none}
    .acker-colorbtn input{position:absolute;inset:0;opacity:0;cursor:pointer}
    .acker-colorbtn i{font-size:14px;color:var(--text-muted);pointer-events:none}
    .acker-abtn{width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--border-1);border-radius:7px;background:var(--surface-1);color:var(--text-muted);padding:0;font-size:14px;flex:none}
    .acker-abtn:hover{background:var(--surface-3);color:var(--text)}
    .acker-abtn.danger{color:#dc2626;border-color:rgba(220,38,38,.3)}
    .acker-abtn.danger:hover{background:var(--danger-subtle,rgba(220,38,38,.12))}
    .acker-hint{margin-top:8px;font-size:10.5px;color:var(--text-dim);display:flex;align-items:center;gap:5px}
    /* Rechtsklick-Kontextmenü */
    .acker-ctx{position:fixed;z-index:12000;min-width:236px;max-width:300px;background:var(--surface-1,#fff);border:1px solid var(--border-1,#d3dce4);border-radius:11px;box-shadow:0 12px 34px rgba(15,23,42,.22);padding:5px;font-size:13px;color:var(--text,#152230);user-select:none}
    .acker-ctx-title{font-size:11px;font-weight:700;color:var(--text-dim,#687889);padding:5px 9px 7px;text-transform:uppercase;letter-spacing:.04em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .acker-ctx-sep{height:1px;background:var(--border-1,#d3dce4);margin:4px 2px}
    .acker-ctx-item{display:flex;align-items:center;gap:9px;width:100%;border:0;background:transparent;color:inherit;text-align:left;padding:7px 9px;border-radius:7px;cursor:pointer;position:relative;font-size:13px;line-height:1.2}
    .acker-ctx-item:hover{background:var(--surface-3,#e4ebf1)}
    .acker-ctx-item .ic{width:18px;text-align:center;color:var(--text-muted,#45566a);flex:none}
    .acker-ctx-item .lb{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .acker-ctx-item .ch{color:var(--text-dim);margin-left:auto;font-size:11px}
    .acker-ctx-item.danger{color:#dc2626}
    .acker-ctx-item.danger .ic{color:#dc2626}
    .acker-ctx-item.disabled{opacity:.38;cursor:default}
    .acker-ctx-item.disabled:hover{background:transparent}
    .acker-ctx-sub{display:none;position:absolute;left:calc(100% + 3px);top:-5px;min-width:200px;max-height:62vh;overflow-y:auto;overflow-x:hidden;background:var(--surface-1,#fff);border:1px solid var(--border-1);border-radius:11px;box-shadow:0 12px 34px rgba(15,23,42,.22);padding:5px}
    .acker-ctx-item.has-sub:hover>.acker-ctx-sub,.acker-ctx-sub:hover{display:block}
    .acker-ctx-swatches{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:7px 9px}
    .acker-sw{width:26px;height:26px;border-radius:7px;border:2px solid rgba(0,0,0,.12);cursor:pointer;padding:0}
    .acker-sw.on{box-shadow:0 0 0 2px var(--text)}
    .acker-sw-custom{grid-column:1 / -1;display:flex;align-items:center;justify-content:center;gap:6px;border:1px dashed var(--border-2,#b3c1ce);border-radius:7px;padding:5px;cursor:pointer;font-size:12px;color:var(--text-muted)}
    .acker-sw-custom input{width:24px;height:24px;border:0;background:none;padding:0;cursor:pointer}
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
          <div class="acker-totals" data-role="acker-totals" style="display:none;margin-top:12px">
            <div class="t-row"><span>Gesamtfläche</span><b data-t="area">–</b></div>
            <div class="t-row"><span>Beete gesamt</span><b data-t="beds">–</b></div>
            <div class="t-row"><span>Beetmeter gesamt</span><b data-t="meters">–</b></div>
            <div class="t-row" style="margin-top:4px"><span>Pflanzen gesamt</span><b class="big" data-t="plants">–</b></div>
            <div class="acker-legend">
              <span class="lg"><i class="bed"></i>Beet</span>
              <span class="lg"><i class="path"></i>Weg</span>
              <span class="lg-hint">beim Reinzoomen sichtbar</span>
            </div>
          </div>
          <div class="acker-export-box" style="margin:12px 0">
            <button class="btn btn-sm btn-psm-secondary-outline" data-role="acker-export" style="width:100%">
              <i class="bi bi-geo me-1"></i>Als GeoJSON exportieren
            </button>
            <div style="font-size:11px;color:var(--text-dim);margin-top:5px;line-height:1.35">Flächen + Standorte (WGS84) für QGIS / FMIS / Traktor-Terminals.</div>
          </div>
          <div data-role="acker-list"></div>
          <div class="acker-empty" data-role="acker-empty">Noch keine Fläche.<br>Zum Acker navigieren, dann <b>Neue Fläche zeichnen</b>.</div>
        </div>
      </aside>
      <div class="acker-map" data-role="acker-map"></div>
    </div>
  </section>`}function Fa(e){return e.typ+":"+e.id}function jd(e){if(!Array.isArray(e)||e.length<3)return null;let t=0,a=0,n=0;const r=e.length,s=e[r-1],l=e[0],u=s&&l&&Number(s[0])===Number(l[0])&&Number(s[1])===Number(l[1])?r-1:r;for(let f=0;f<u;f++){const p=Number(e[f]?.[0]),g=Number(e[f]?.[1]);Number.isFinite(p)&&Number.isFinite(g)&&(t+=p,a+=g,n++)}return n?{lat:t/n,lon:a/n}:null}async function ys(e){const t=[];(Ue(e.state.getState().gps?.points)||[]).forEach(n=>{if(n?.kind!=="gewaechshaus")return;const r=Number(n.latitude),s=Number(n.longitude),l=Number(n.nutzflaecheQm);t.push({typ:"haus",id:String(n.id),name:n.name||"Gewächshaus",areaQm:Number.isFinite(l)&&l>0?l:null,lat:Number.isFinite(r)?r:null,lon:Number.isFinite(s)?s:null,color:null})});try{((await Xr())?.rows||[]).forEach(r=>{const s=jd(r.latlngs),l=Number(r.areaQm);t.push({typ:"acker",id:String(r.id),name:r.name||"Fläche",areaQm:Number.isFinite(l)&&l>0?l:null,lat:s?.lat??null,lon:s?.lon??null,color:r.color||null})})}catch{}return t}const Gd="Wetterdaten: Open-Meteo (CC BY 4.0)",Ud="psm.weather.";function Vd(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function Zd(e,t){return Ud+e.toFixed(3)+"_"+t.toFixed(3)}function Qd(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch{return null}}function Jd(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Yd(e){return!!e&&e.slice(0,10)===Vd()}function Xd(e,t,a){const n=e?.time||[],r=e?.temperature_2m_max||[],s=e?.temperature_2m_min||[],l=e?.precipitation_sum||[],o=e?.sunshine_duration||[],u=Rn(new Date),f=$i(u.year,u.week),p=new Map;for(let v=0;v<n.length;v++){const k=Bs(n[v]);if(!k)continue;const{year:h,week:S}=Rn(k),w=$i(h,S);let E=p.get(w);E||(E={key:w,year:h,week:S,tmaxSum:0,tmaxN:0,tminSum:0,tminN:0,precip:0,precipN:0,sun:0,sunN:0,days:0},p.set(w,E)),Number.isFinite(r[v])&&(E.tmaxSum+=r[v],E.tmaxN++),Number.isFinite(s[v])&&(E.tminSum+=s[v],E.tminN++),Number.isFinite(l[v])&&(E.precip+=l[v],E.precipN++),Number.isFinite(o[v])&&(E.sun+=o[v],E.sunN++),E.days++}const g=[...p.values()].sort((v,k)=>v.key<k.key?-1:v.key>k.key?1:0).map(v=>{const k=v.tmaxN?v.tmaxSum/v.tmaxN:null,h=v.tminN?v.tminSum/v.tminN:null;return{weekKey:v.key,year:v.year,week:v.week,tMaxAvg:k,tMinAvg:h,tMeanAvg:k!=null&&h!=null?(k+h)/2:k,precipSum:v.precipN?v.precip:null,sunHours:v.sunN?v.sun/3600:null,days:v.days,isForecast:v.key>=f}});return{lat:t,lon:a,fetchedAt:new Date().toISOString(),weeks:g}}async function eu(e,t){if(!Number.isFinite(e)||!Number.isFinite(t))return{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const a=Zd(e,t),n=Qd(a);if(n&&Yd(n.fetchedAt)&&n.weeks?.length)return n;if(typeof navigator<"u"&&navigator.onLine===!1)return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const r="https://api.open-meteo.com/v1/forecast?latitude="+e.toFixed(4)+"&longitude="+t.toFixed(4)+"&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunshine_duration&timezone=Europe%2FBerlin&past_days=92&forecast_days=16";try{const s=await fetch(r);if(!s.ok)throw new Error("HTTP "+s.status);const l=await s.json(),o=Xd(l.daily,e,t);return o.weeks.length&&Jd(a,o),o}catch{return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]}}}const $r=66;function tu(e,t){const{units:a,anbau:n,mass:r,onSelect:s,onContext:l}=t;if(!a||!a.length){e.innerHTML='<div class="km-empty"><i class="bi bi-calendar3"></i><p>Noch keine Flächen für den Anbauplan.</p></div>';return}const o=new Date;let u=new Date(o.getFullYear(),o.getMonth()-1,1),f=new Date(o.getFullYear(),o.getMonth()+4,1);const p=F=>{if(!F)return;const Q=new Date(String(F).slice(0,10)+"T00:00:00");isNaN(Q.getTime())||(Q<u&&(u=new Date(Q.getFullYear(),Q.getMonth(),1)),Q>f&&(f=new Date(Q.getFullYear(),Q.getMonth(),1)))};(n||[]).forEach(F=>{p(F.pflanzDatum),p(F.ernteBis||F.ernteDatum),p(F.ernteVon)}),(r||[]).forEach(F=>p(F.planDatum||F.erledigtDatum));const g=ho(u,f),v=g.length,k=v*$r,h=F=>F==null?null:(F*100).toFixed(2)+"%",S=je(g,o.toISOString()),w=a.filter(F=>F.typ==="haus"),E=a.filter(F=>F.typ==="acker");let I="";g.forEach((F,Q)=>{const T=F.y===o.getFullYear()&&F.m===o.getMonth();I+=`<div class="kb2-mo${T?" cur":""}" style="width:${$r}px">${bo[F.m]}${F.m===0?" "+String(F.y).slice(2):""}</div>`});const V=F=>{const Q=(n||[]).filter(A=>A.flaecheTyp===F.typ&&String(A.flaecheId)===String(F.id)),T=(r||[]).filter(A=>A.flaecheTyp===F.typ&&String(A.flaecheId)===String(F.id));let D="";return Q.forEach((A,Y)=>{const ne=je(g,A.pflanzDatum);let le=je(g,A.ernteBis||A.ernteDatum||A.pflanzDatum);if(ne==null)return;(le==null||le<=ne)&&(le=Math.min(1,ne+.5/v));const ke=ga(A,Y),Se=A.status==="geplant";D+=`<div class="kb2-bar${Se?" planned":""}" title="${b(A.kultur||"Kultur")}" style="left:${h(ne)};width:${((le-ne)*100).toFixed(2)}%;--cc:${b(ke)}"><span>${b(A.kultur||"")}</span></div>`;const Je=je(g,A.ernteVon),Te=je(g,A.ernteBis);Je!=null&&Te!=null&&Te>Je&&(D+=`<div class="kb2-harvest" title="Ernte" style="left:${h(Je)};width:${((Te-Je)*100).toFixed(2)}%;--cc:${b(ke)}"></div>`)}),T.forEach(A=>{const Y=A.status==="erledigt"?A.erledigtDatum||A.planDatum:A.planDatum||A.erledigtDatum,ne=je(g,Y);if(ne==null)return;const le=mo(A.art),ke=A.status==="erledigt";D+=`<span class="kb2-mk${ke?" done":""}" title="${b(le.label+(A.notes?": "+A.notes:""))}" style="left:${h(ne)};--mc:${le.color}"></span>`}),S!=null&&(D+=`<div class="kb2-today" style="left:${h(S)}"></div>`),D},W=F=>{const Q=F.typ+":"+F.id,T=(n||[]).filter(Y=>Y.flaecheTyp===F.typ&&String(Y.flaecheId)===String(F.id)),D=T.find(Y=>Y.status==="aktiv")||T.find(Y=>Y.status!=="abgeschlossen"),A=D?b(D.kultur||""):"frei";return`<div class="kb2-row" data-ukey="${Q}">
      <div class="kb2-label" title="${b(F.name)}"><b>${b(F.name)}</b><small>${A}</small></div>
      <div class="kb2-track" style="width:${k}px">${V(F)}</div>
    </div>`},ye=(F,Q)=>Q.length?`<div class="kb2-grp"><div class="kb2-grp-l">${b(F)}</div><div class="kb2-grp-t" style="width:${k}px"></div></div>`+Q.map(W).join(""):"";e.innerHTML=`
    <style>
      .kb2-scroll{overflow:auto;max-width:100%}
      .kb2-head{display:flex;align-items:flex-end;position:sticky;top:0;background:var(--surface-1);z-index:4}
      .kb2-corner{position:sticky;left:0;z-index:5;background:var(--surface-1);width:130px;min-width:130px;font-size:12px;font-weight:600;color:var(--text-muted);padding:0 8px 6px}
      .kb2-axis{display:flex}
      .kb2-mo{font-size:11px;color:var(--text-dim);text-align:center;border-left:1px solid var(--border-1);padding-bottom:6px;box-sizing:border-box}
      .kb2-mo.cur{color:#16a34a;font-weight:700}
      .kb2-grp{display:flex}
      .kb2-grp-l{position:sticky;left:0;z-index:3;background:var(--surface-1);width:130px;min-width:130px;font-size:10.5px;text-transform:uppercase;letter-spacing:.04em;color:var(--text-dim);padding:9px 8px 3px}
      .kb2-row{display:flex;align-items:stretch}
      .kb2-row:hover .kb2-label{background:var(--surface-2)}
      .kb2-label{position:sticky;left:0;z-index:3;background:var(--surface-1);width:130px;min-width:130px;padding:6px 8px;cursor:pointer;border-top:1px solid var(--border-1);display:flex;flex-direction:column;justify-content:center;overflow:hidden}
      .kb2-label b{font-size:12.5px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .kb2-label small{font-size:11px;color:var(--text-dim);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .kb2-track{position:relative;height:38px;border-top:1px solid var(--border-1);background-image:linear-gradient(to right,var(--border-1) 1px,transparent 1px);background-size:${$r}px 100%}
      .kb2-bar{position:absolute;top:9px;height:20px;border-radius:5px;background:var(--cc);color:#fff;display:flex;align-items:center;padding:0 7px;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08);min-width:6px}
      .kb2-bar span{font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .kb2-bar.planned{background:transparent;border:1.5px dashed var(--cc);color:var(--cc)}
      .kb2-harvest{position:absolute;top:11px;height:16px;border-radius:4px;background:repeating-linear-gradient(45deg,rgba(255,255,255,.55),rgba(255,255,255,.55) 3px,transparent 3px,transparent 6px);box-shadow:inset 0 0 0 1.5px #fff;pointer-events:none}
      .kb2-mk{position:absolute;top:24px;width:11px;height:11px;border-radius:50%;background:var(--mc);transform:translateX(-50%);border:1.5px solid var(--surface-1);z-index:2}
      .kb2-mk:not(.done){background:var(--surface-1);box-shadow:inset 0 0 0 2px var(--mc)}
      .kb2-today{position:absolute;top:0;bottom:0;width:0;border-left:2px dashed #16a34a;transform:translateX(-1px);pointer-events:none;z-index:1}
      .kb2-legend{display:flex;flex-wrap:wrap;gap:7px 16px;font-size:11.5px;color:var(--text-muted);margin-top:12px;align-items:center}
      .kb2-legend .lg{display:inline-flex;align-items:center;gap:5px}
      .kb2-legend .d{width:11px;height:11px;border-radius:50%}
      .kb2-hint{margin-left:auto;color:var(--text-dim)}
    </style>
    <div class="kb2-scroll">
      <div class="kb2-head"><div class="kb2-corner">Fläche</div><div class="kb2-axis">${I}</div></div>
      ${ye("Gewächshäuser",w)}
      ${ye("Freiland",E)}
    </div>
    <div class="kb2-legend">
      <span class="lg"><span class="d" style="background:var(--text-secondary,#475569)"></span>erledigt</span>
      <span class="lg"><span class="d" style="background:var(--surface-1);box-shadow:inset 0 0 0 2px var(--text-secondary,#475569)"></span>geplant</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:#9FE1CB;display:inline-block"></span>Kultur</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:repeating-linear-gradient(45deg,#bbb,#bbb 2px,transparent 2px,transparent 4px);display:inline-block"></span>Ernte-Zeitraum</span>
      <span class="kb2-hint"><i class="bi bi-mouse2"></i> Klick = öffnen · Rechtsklick = planen</span>
    </div>`,e.querySelectorAll(".kb2-row").forEach(F=>{const Q=F.dataset.ukey;F.querySelector(".kb2-label")?.addEventListener("click",()=>s&&s(Q)),F.addEventListener("contextmenu",T=>{T.preventDefault(),l&&l(Q,T.clientX,T.clientY)})})}const au=[{art:"bewaesserung",label:"Gießen",icon:"bi-droplet"},{art:"mechanisch",label:"Hacken",icon:"bi-tools"},{art:"duengung",label:"Düngen",icon:"bi-flower1"},{art:"nuetzlinge",label:"Nützlinge",icon:"bi-bug"},{art:"chemisch_psm",label:"Pflanzenschutz",icon:"bi-droplet-half"},{art:"monitoring",label:"Kontrolle",icon:"bi-eye"},{art:"sonstiges",label:"Sonstiges",icon:"bi-three-dots"}],nu=["Jan.","Feb.","März","Apr.","Mai","Juni","Juli","Aug.","Sep.","Okt.","Nov.","Dez."];function ru(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=iu();let a=[],n=[],r=[],s=[],l=[],o=null,u="plan",f=!1,p=!1;const g={};let v=null;const k=x=>e.querySelector(x),h=()=>k('[data-role="list"]'),S=()=>k('[data-role="detail"]'),w=()=>k('[data-role="kpis"]'),E=()=>k('[data-role="board-view"]'),I=()=>k('[data-role="flaechen-view"]'),V=()=>oe()==="sqlite",W=()=>{V()&&nt().catch(()=>{})},ye=(x,L)=>x.filter(O=>O.flaecheTyp===L.typ&&String(O.flaecheId)===String(L.id)),F=x=>a.find(L=>Fa(L)===x)||null,Q=(x,L=0)=>go(x.color)||jt[L%jt.length];async function T(){if(a=await ys(t),V()){try{n=(await Ar())?.rows||[]}catch{n=[]}try{r=(await An())?.rows||[]}catch{r=[]}try{s=(await Yr())?.rows||[]}catch{s=[]}try{l=(await sl())?.rows||[]}catch{l=[]}if(!p){p=!0;try{const x=await zi();x?.imported&&(r=(await An())?.rows||[],N.info(`${x.imported} Pflanzenschutz-Eintrag(e) übernommen.`),W())}catch{}}}!o&&a.length&&(o=Fa(a[0])),Y(),A()}async function D(){if(V()){try{n=(await Ar())?.rows||[]}catch{}try{r=(await An())?.rows||[]}catch{}}}async function A(){const x=o?F(o):null;if(!x||x.lat==null||x.lon==null)return;const L=Fa(x);if(!g[L]){g[L]={loading:!0,weeks:[]};try{g[L]=await eu(x.lat,x.lon)}catch{g[L]={weeks:[]}}o===L&&Te()}}function Y(){le(),u==="plan"?(I().style.display="none",E().style.display="block",tu(E(),{units:a,anbau:n,mass:r,onSelect:x=>{o=x,ne("flaechen"),A()},onContext:(x,L,O)=>Xt(x,L,O)})):(E().style.display="none",I().style.display="grid",Se(),Te()),e.querySelectorAll(".km-modebtn").forEach(x=>x.classList.toggle("active",x.dataset.mode===u))}function ne(x){u=x,Y()}function le(){const x=w();if(!x)return;a.filter(z=>z.typ==="haus").length,a.filter(z=>z.typ==="acker").length;let L=0,O=null;a.forEach(z=>{const{current:M,next:B}=la(ye(n,z));M&&L++,B?.pflanzDatum&&(!O||Le(B.pflanzDatum)<Le(O.pflanzDatum))&&(O=B)});const H=r.filter(z=>z.status==="geplant").length;x.innerHTML=`
      ${ke(String(a.length),"Flächen")}
      ${ke(String(L),"Kulturen aktiv")}
      ${ke(String(H),"Aufgaben offen")}
      ${ke(O?Aa(pt(O.pflanzDatum)):"–","Nächste Pflanzung")}
      <button class="km-psm" data-role="psm-import" title="Bestehende Pflanzenschutz-Einträge übernehmen"><i class="bi bi-arrow-down-circle"></i><span>PSM übernehmen</span></button>`,x.querySelector('[data-role="psm-import"]')?.addEventListener("click",Lt)}const ke=(x,L)=>`<div class="km-kpi"><div class="km-kpi-v">${x}</div><div class="km-kpi-l">${b(L)}</div></div>`;function Se(){const x=h();if(!x)return;if(!a.length){x.innerHTML='<div class="km-empty"><i class="bi bi-geo-alt"></i><p>Noch keine Flächen.<br>Gewächshäuser unter Einstellungen, Freiland im Reiter „Karte".</p></div>';return}const L=a.filter(z=>z.typ==="haus"),O=a.filter(z=>z.typ==="acker"),H=(z,M)=>M.length?`<div class="km-grp">${b(z)}</div>`+M.map(Je).join(""):"";x.innerHTML=H("Gewächshäuser",L)+H("Freiland",O),x.querySelectorAll("[data-ukey]").forEach(z=>{z.addEventListener("click",()=>{o=z.dataset.ukey,Se(),Te(),A()}),z.addEventListener("contextmenu",M=>{M.preventDefault(),Xt(z.dataset.ukey,M.clientX,M.clientY)})})}function Je(x,L){const O=Fa(x),{current:H}=la(ye(n,x));return`<div class="km-row${O===o?" sel":""}" data-ukey="${O}">
      <span class="km-dot" style="background:${b(H?ga(H):Q(x,L))}"></span>
      <div class="km-row-main"><div class="km-row-name">${b(x.name)}</div>
      <div class="km-row-sub">${H?`<span class="crop">${b(H.kultur||"Kultur")}</span>`:'<span class="free">frei</span>'}</div></div>
    </div>`}function Te(){const x=S();if(!x)return;const L=o?F(o):null;if(!L){x.innerHTML='<div class="km-empty"><i class="bi bi-hand-index"></i><p>Fläche links wählen.</p></div>';return}const O=ye(n,L),H=ye(r,L),{current:z,next:M}=la(O),B=g[Fa(L)],ce=L.typ==="haus"?"Gewächshaus":"Freiland",de=L.areaQm?`${Math.round(L.areaQm).toLocaleString("de-DE")} m²`:"";let fe;if(z){const G=z.pflanzDatum?`seit ${xa(z.pflanzDatum)} · ${Aa(pt(z.pflanzDatum))}`:"",ee=on(z);fe=`<div class="km-hero active" style="--cc:${b(ga(z))}">
        <div class="km-hero-ic"><i class="bi bi-flower2"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop">${b(z.kultur||"Kultur")}</div><div class="km-hero-sub">${b(G+ee+ft(z))}</div></div>
        <button class="km-hero-edit" data-edit-crop="current" title="Bearbeiten"><i class="bi bi-pencil"></i></button>
      </div>`}else fe=`<div class="km-hero empty">
        <div class="km-hero-ic gray"><i class="bi bi-circle"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop gray">Fläche ist frei</div><div class="km-hero-sub">Noch keine Kultur eingetragen</div></div>
        <button class="km-hero-add" data-edit-crop="current"><i class="bi bi-plus-lg"></i> Kultur setzen</button>
      </div>`;const X=M?`<div class="km-next"><i class="bi bi-arrow-right-short"></i>Danach geplant: <b>${b(M.kultur||"Kultur")}</b> · ab ${Aa(pt(M.pflanzDatum))} <button class="km-next-edit" data-edit-crop="next" title="Bearbeiten"><i class="bi bi-pencil"></i></button></div>`:z?'<button class="km-next-add" data-edit-crop="next"><i class="bi bi-plus"></i> Nächste Kultur planen</button>':"";x.innerHTML=`
      <div class="km-head"><div class="km-head-l"><span class="km-head-name">${b(L.name)}</span><span class="km-head-badge">${ce}${de?" · "+de:""}</span></div>
        <button class="km-headbtn" data-act="map"><i class="bi bi-map"></i> Auf Karte</button></div>
      ${fe}
      ${X}
      ${sr(O,H)}
      <div class="km-tasks-head"><span>Aufgaben</span><button class="km-addtask" data-act="add-massnahme"><i class="bi bi-plus-lg"></i> Aufgabe</button></div>
      ${it(H)}
      <div class="km-foot">
        <span class="km-weather">${Jt(B)}</span>
        <button class="km-plan" data-act="plan"><i class="bi bi-calendar3"></i> Saison &amp; Plan</button>
      </div>
      <div class="km-attr">${b(Gd)}${B?.stale?" · offline":""}</div>`,x.querySelector('[data-act="map"]')?.addEventListener("click",()=>Ae()),x.querySelector('[data-act="plan"]')?.addEventListener("click",()=>ne("plan")),x.querySelector('[data-act="add-massnahme"]')?.addEventListener("click",()=>wa(L,null,z)),x.querySelectorAll("[data-edit-crop]").forEach(G=>G.addEventListener("click",()=>{const ee=G.dataset.editCrop;ea(L,ee==="current"?z:M,ee,O.length)})),x.querySelectorAll("[data-m-done]").forEach(G=>G.addEventListener("click",ee=>{ee.stopPropagation(),ln(G.dataset.mDone)})),x.querySelectorAll("[data-m-del]").forEach(G=>G.addEventListener("click",ee=>{ee.stopPropagation(),cn(G.dataset.mDel)})),x.querySelectorAll("[data-m-edit]").forEach(G=>G.addEventListener("click",()=>{const ee=r.find(me=>me.id===G.dataset.mEdit);wa(L,ee,z)}))}function it(x){const L=x.filter(B=>B.status==="geplant").sort((B,ce)=>(Le(B.planDatum)||9e15)-(Le(ce.planDatum)||9e15)),O=x.filter(B=>B.status==="erledigt").sort((B,ce)=>(Le(ce.erledigtDatum)||0)-(Le(B.erledigtDatum)||0)).slice(0,6),H=Number(ot().replace(/-/g,"")),z=(B,ce)=>{const de=mo(B.art),fe=ce?B.erledigtDatum:B.planDatum,X=!ce&&fe&&Le(fe)<H,G=ce?xa(fe):sn(fe,X),ee=B.notes||de.label,me=B.historyId?'<span class="km-pill">PSM</span>':"",we=[];B.notes&&we.push(b(de.label)),B.mittel&&we.push(b(B.mittel)),B.menge!=null&&we.push(`${B.menge}${B.einheit?" "+b(B.einheit):""}`);const Re=we.join(" · ");return`<div class="km-task${ce?" done":""}" data-m-edit="${B.id}">
        <span class="km-task-ic" style="--mc:${de.color}"><i class="bi ${de.icon}"></i></span>
        <div class="km-task-main"><div class="km-task-title">${b(ee)}${me}</div>${Re?`<div class="km-task-sub">${Re}</div>`:""}</div>
        <span class="km-task-when${X?" overdue":""}">${G}</span>
        ${ce?`<button class="km-tbtn del" data-m-del="${B.id}" title="Löschen"><i class="bi bi-trash"></i></button>`:`<button class="km-check" data-m-done="${B.id}" title="Erledigt"><i class="bi bi-check-lg"></i></button>`}
      </div>`};let M="";return L.length?M+=L.map(B=>z(B,!1)).join(""):M+='<div class="km-tasks-none"><i class="bi bi-check2-circle"></i> Nichts offen</div>',O.length&&(M+='<div class="km-done-h">Erledigt</div>'+O.map(B=>z(B,!0)).join("")),`<div class="km-tasks">${M}</div>`}function pt(x){const L=new Date(String(x).slice(0,10)+"T00:00:00");return isNaN(L.getTime())?0:Rn(L).week}function xa(x){const L=new Date(String(x).slice(0,10)+"T00:00:00");return isNaN(L.getTime())?"":`${L.getDate()}. ${nu[L.getMonth()]}`}function sn(x,L){if(!x)return"offen";const O=new Date(String(x).slice(0,10)+"T00:00:00");if(isNaN(O.getTime()))return"offen";const H=new Date;H.setHours(0,0,0,0);const z=Math.round((O.getTime()-H.getTime())/864e5);return z===0?"heute":z===1?"morgen":L?"überfällig":xa(x)}function Jt(x){if(!x||!x.weeks?.length)return x?.loading?"Wetter lädt…":"";const{year:L,week:O}=Rn(new Date),H=x.weeks.find(B=>B.year===L&&B.week===O)||x.weeks.find(B=>!B.isForecast);if(!H)return"";const z=H.tMaxAvg!=null?Math.round(H.tMaxAvg)+"°":"–",M=H.precipSum!=null?Math.round(H.precipSum)+" mm":"–";return`<i class="bi bi-cloud-sun"></i> Diese Woche: ${z} · ${M} Regen`}function on(x){const L=x.ernteVon?Aa(pt(x.ernteVon)):null,O=x.ernteBis||x.ernteDatum,H=O?Aa(pt(O)):null;return L&&H?` · Ernte ${L}–${H}`:H?` · Ernte ~${H}`:L?` · Ernte ab ${L}`:""}function ft(x){return!x||x.menge==null||x.menge===""?"":` · ${x.menge} ${x.einheit||"Pflanzen"}`}function sr(x,L){if(!x.length&&!L.length)return"";const O=new Date;let H=new Date(O.getFullYear(),O.getMonth()-1,1),z=new Date(O.getFullYear(),O.getMonth()+4,1);const M=q=>{if(!q)return;const ue=new Date(String(q).slice(0,10)+"T00:00:00");isNaN(ue.getTime())||(ue<H&&(H=new Date(ue.getFullYear(),ue.getMonth(),1)),ue>z&&(z=new Date(ue.getFullYear(),ue.getMonth(),1)))};x.forEach(q=>{M(q.pflanzDatum),M(q.ernteBis||q.ernteDatum),M(q.ernteVon)}),L.forEach(q=>M(q.planDatum||q.erledigtDatum));const B=ho(H,z),ce=B.length,de=`background-size:${(100/ce).toFixed(4)}% 100%`,fe=q=>q==null?null:(q*100).toFixed(2)+"%",X=je(B,O.toISOString()),G=X!=null?`<div class="ks-today" style="left:${fe(X)}"></div>`:"",ee=B.map(q=>`<div class="ks-mo${q.y===O.getFullYear()&&q.m===O.getMonth()?" cur":""}">${bo[q.m]}</div>`).join("");let me="";x.forEach((q,ue)=>{const $e=je(B,q.pflanzDatum);let ge=je(B,q.ernteBis||q.ernteDatum||q.pflanzDatum);if($e==null)return;(ge==null||ge<=$e)&&(ge=Math.min(1,$e+.5/ce));const Me=ga(q,ue);me+=`<div class="ks-bar${q.status==="geplant"?" planned":""}" style="left:${fe($e)};width:${((ge-$e)*100).toFixed(2)}%;--cc:${b(Me)}"><span>${b(q.kultur||"")}</span></div>`;const K=je(B,q.ernteVon),re=je(B,q.ernteBis);K!=null&&re!=null&&re>K&&(me+=`<div class="ks-harvest" style="left:${fe(K)};width:${((re-K)*100).toFixed(2)}%"></div>`)});const we={};L.forEach(q=>{(we[q.art]=we[q.art]||[]).push(q)});const Re=Nd.filter(q=>we[q]).map(q=>{const ue=Jn[q],$e=we[q].map(ge=>{const Me=ge.status==="erledigt"?ge.erledigtDatum||ge.planDatum:ge.planDatum||ge.erledigtDatum,K=je(B,Me);return K==null?"":`<span class="ks-mk${ge.status==="erledigt"?" done":""}" title="${b(ue.label+(ge.notes?": "+ge.notes:""))}" style="left:${fe(K)};--mc:${ue.color}"></span>`}).join("");return`<div class="ks-row"><div class="ks-rl">${b(ue.label)}</div><div class="ks-track" style="${de}">${$e}${G}</div></div>`}).join("");return`<div class="ks-wrap">
      <div class="ks-head"><div class="ks-rl"></div><div class="ks-axis">${ee}</div></div>
      <div class="ks-row"><div class="ks-rl">Kultur</div><div class="ks-track" style="${de}">${me}${G}</div></div>
      ${Re}
      <div class="ks-legend"><span><span class="ks-d done"></span>erledigt</span><span><span class="ks-d"></span>geplant</span><span style="margin-left:auto"><span class="ks-hbar"></span>Ernte-Zeitraum</span></div>
    </div>`}function Ae(x){Qe("app",L=>({...L,activeSection:"acker"})),N.info("Karte geöffnet.")}async function Lt(){if(!V()){N.warning("Keine Datenbank aktiv.");return}try{const x=await zi();await D(),Y(),x?.imported?(N.success(`${x.imported} übernommen.`),W()):N.info(`Nichts Neues${x?.skipped?` (${x.skipped} nicht zuordenbar)`:""}.`)}catch{N.error("Übernahme fehlgeschlagen.")}}async function ln(x){const L=r.find(O=>O.id===x);if(L)try{await Pi({...L,status:"erledigt",erledigtDatum:L.erledigtDatum||ot()}),await D(),Y(),W()}catch{N.error("Speichern fehlgeschlagen.")}}async function cn(x){try{await Ai({id:x}),await D(),Y(),W()}catch{N.error("Löschen fehlgeschlagen.")}}let Pe=null;const Ht=()=>{Pe&&(Pe.remove(),Pe=null,document.removeEventListener("pointerdown",Yt,!0))},Yt=x=>{Pe&&!Pe.contains(x.target)&&Ht()};function ka(x,L,O,H){if(Ht(),Pe=document.createElement("div"),Pe.className="km-ctx",H){const M=document.createElement("div");M.className="km-ctx-t",M.textContent=H,Pe.appendChild(M)}O.forEach(M=>{if(M.sep){const ce=document.createElement("div");ce.className="km-ctx-sep",Pe.appendChild(ce);return}const B=document.createElement("button");B.className="km-ctx-i",B.innerHTML=`<i class="bi ${M.icon}"></i><span>${b(M.label)}</span>`,B.addEventListener("click",()=>{Ht(),M.action?.()}),Pe.appendChild(B)}),document.body.appendChild(Pe);const z=Pe.getBoundingClientRect();Pe.style.left=Math.max(8,Math.min(x,window.innerWidth-z.width-8))+"px",Pe.style.top=Math.max(8,Math.min(L,window.innerHeight-z.height-8))+"px",setTimeout(()=>document.addEventListener("pointerdown",Yt,!0),0)}function Xt(x,L,O){const H=F(x);if(!H)return;const z=ye(n,H),{current:M}=la(z);ka(L,O,[{icon:"bi-flower2",label:M?"Kultur bearbeiten":"Kultur setzen",action:()=>ea(H,M,"current",z.length)},{icon:"bi-plus-lg",label:"Nächste Kultur planen",action:()=>ea(H,null,"next",z.length)},{icon:"bi-list-check",label:"Aufgabe planen",action:()=>wa(H,null,M)},{sep:!0},{icon:"bi-arrow-right-circle",label:"Fläche öffnen",action:()=>{o=x,ne("flaechen"),A()}},{icon:"bi-map",label:"Auf Karte",action:()=>Ae()}],H.name)}function Ye(){v&&(v.remove(),v=null)}function dn(x,L,O,H){Ye();const z=document.createElement("div");return z.className="kmodal-ov",z.innerHTML=`<div class="kmodal" role="dialog" aria-modal="true">
      <div class="kmodal-h"><span>${b(x)}</span><button class="kmodal-x" aria-label="Schließen"><i class="bi bi-x-lg"></i></button></div>
      <div class="kmodal-b">${L}</div>
      <div class="kmodal-f"><button class="btn-cancel" data-k="cancel">Abbrechen</button><button class="btn-save" data-k="save">${b(O)}</button></div></div>`,e.appendChild(z),v=z,z.querySelector(".kmodal-x").addEventListener("click",Ye),z.querySelector('[data-k="cancel"]').addEventListener("click",Ye),z.addEventListener("mousedown",M=>{M.target===z&&Ye()}),z.querySelector('[data-k="save"]').addEventListener("click",()=>{H(z)!==!1&&Ye()}),z.querySelectorAll("[data-more]").forEach(M=>M.addEventListener("click",()=>{const B=z.querySelector("[data-more-box]");B&&(B.hidden=!1,M.style.display="none")})),setTimeout(()=>z.querySelector("input,select,textarea,.km-tile")?.focus?.(),30),z}function un(){const x=new Set,L=[],O=z=>{const M=String(z||"").trim().toLowerCase();z&&!x.has(M)&&(x.add(M),L.push(z))};return l.forEach(z=>O(z.name)),s.forEach(z=>O(z.kultur)),`<datalist id="km-kultur-dl">${L.map(z=>`<option value="${b(z)}"></option>`).join("")}</datalist>`}function ea(x,L,O,H){const z=O==="next"&&!L,M=L||{},B=(M.kulturStammId?l.find(K=>K.id===M.kulturStammId):null)||Dn(l,M.kultur),ce=M.pflanzDatum?.slice(0,10)||(z?"":ot()),de=jt.map(K=>`<button type="button" class="km-sw${(M.color||"")===K?" on":""}" data-col="${K}" style="background:${K}"></button>`).join(""),fe=Hd.map(K=>`<option value="${b(K)}"${(M.einheit||"Pflanzen")===K?" selected":""}>${b(K)}</option>`).join(""),X=`
      <label class="km-fld big">Was wächst hier?<input list="km-kultur-dl" data-f="kultur" value="${b(M.kultur||"")}" placeholder="z. B. Tomate – aus Bibliothek wählen" autocomplete="off" /></label>${un()}
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
        <label class="km-fld">${z?"Geplante Pflanzung":"Pflanzung"}<input type="date" data-f="pflanz" value="${ce}" /></label>
      </div>
      <div class="km-frow2">
        <label class="km-fld">Ernte von<input type="date" data-f="ernteVon" value="${(M.ernteVon||"").slice(0,10)}" /></label>
        <label class="km-fld">Ernte bis<input type="date" data-f="ernteBis" value="${(M.ernteBis||M.ernteDatum||"").slice(0,10)}" /></label>
      </div>
      <div class="km-hint2"><i class="bi bi-info-circle"></i> Termine kommen automatisch aus der Bibliothek – jederzeit frei überschreibbar.</div>
      <div class="km-frow2">
        <label class="km-fld">Menge<input type="number" step="1" min="0" data-f="menge" value="${M.menge!=null?M.menge:""}" placeholder="optional" /></label>
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
        <label class="km-fld">Status<select data-f="status">${["aktiv","geplant","abgeschlossen"].map(K=>`<option value="${K}"${(M.status||(z?"geplant":"aktiv"))===K?" selected":""}>${Fd[K].label}</option>`).join("")}</select></label>
        <div class="km-fld">Farbe<div class="km-sws">${de}</div></div>
        <label class="km-fld">Notiz<textarea data-f="notes" rows="2" placeholder="optional">${b(M.notes||"")}</textarea></label>
      </div>
      ${L?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Satz löschen</button>':""}`,G=dn(L?"Satz bearbeiten":z?"Nächsten Satz planen":"Satz eintragen",X,"Speichern",K=>{const re=$t=>K.querySelector(`[data-f="${$t}"]`)?.value?.trim()||"",ie=re("kultur");if(!ie)return N.warning("Bitte eine Kultur angeben."),!1;const Sa=Dn(l,ie),pn=re("aussaat")||null,Ot=re("pflanz")||null,Ea=re("ernteVon")||null,fn=re("ernteBis")||null,ta=re("menge"),Dt=ta?Number(ta):null,be=K.querySelector('[data-f="einheit"]')?.value||null,Ke=!K.querySelector("[data-more-box]").hidden;let We=Ke?re("status"):"";We||(We=z||Ot&&Le(Ot)>Number(ot().replace(/-/g,""))?"geplant":"aktiv");const lr=K.querySelector(".km-sw.on")?.dataset.col||M.color||Sa?.color||jt[H%jt.length],_t=s.find($t=>$t.kultur===ie)?.eppoCode||Sa?.eppoCode||null,La=Ke?re("notes")||null:M.notes||null,mn={flaecheTyp:x.typ,flaecheId:x.id,kultur:ie,eppoCode:_t,color:lr,menge:Dt,einheit:be,kulturStammId:Sa?.id||M.kulturStammId||null,notes:La},gn=!L&&K.querySelector('[data-f="succOn"]')?.checked,Da=Math.max(2,Math.min(20,Number(K.querySelector('[data-f="succN"]')?.value)||2)),bn=Math.max(1,Number(K.querySelector('[data-f="succGap"]')?.value)||14),aa=Number(ot().replace(/-/g,""));(async()=>{try{if(gn){const $t="sg-"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),cr={aussaatDatum:pn,pflanzDatum:Ot,ernteVon:Ea,ernteBis:fn};for(let $a=0;$a<Da;$a++){const na=_d(cr,$a*bn),dr=na.pflanzDatum&&Le(na.pflanzDatum)>aa?"geplant":We;await Mi({...mn,...na,ernteDatum:null,status:dr,satzGruppe:$t})}N.success(`${Da} Sätze angelegt.`)}else await Mi({id:L?.id,...mn,aussaatDatum:pn,pflanzDatum:Ot,ernteVon:Ea,ernteBis:fn,ernteDatum:null,status:We,satzGruppe:M.satzGruppe||null});await D(),Y(),W()}catch{N.error("Speichern fehlgeschlagen.")}})()});let ee="pflanz";const me=K=>G.querySelector(`[data-f="${K}"]`),we=G.querySelector("[data-anchor-row]"),Re=G.querySelector("[data-stammhint]");let q=B;const ue=()=>{if(!q){Re.hidden=!0,we.style.opacity="0.45";return}we.style.opacity="1";const re=[qd[q.anbauMethode==="anzucht"?"anzucht":"direkt"].short];q.kulturTage&&re.push(`${q.kulturTage} T. Kultur`),q.anbauMethode==="anzucht"&&q.anzuchtTage&&re.push(`${q.anzuchtTage} T. Anzucht`),q.familie&&re.push(q.familie),Re.innerHTML=`<i class="bi bi-stars"></i> <b>Bibliothek:</b> ${b(re.join(" · "))}`,Re.hidden=!1},$e=()=>{if(!q)return;const re=me(ee==="ernte"?"ernteVon":ee).value||ot(),ie=Od(q,ee,re);ie.aussaatDatum!=null&&(me("aussaat").value=ie.aussaatDatum||""),ie.pflanzDatum!=null&&(me("pflanz").value=ie.pflanzDatum||""),ie.ernteVon!=null&&(me("ernteVon").value=ie.ernteVon||""),ie.ernteBis!=null&&(me("ernteBis").value=ie.ernteBis||"")},ge=me("kultur");ge.addEventListener("input",()=>{q=Dn(l,ge.value),ue()}),ge.addEventListener("change",()=>{q=Dn(l,ge.value),ue(),q&&(me("pflanz").value||(me("pflanz").value=ot()),$e())}),G.querySelectorAll("[data-anchor]").forEach(K=>K.addEventListener("click",()=>{G.querySelectorAll("[data-anchorseg] .km-segb").forEach(re=>re.classList.remove("on")),K.classList.add("on"),ee=K.dataset.anchor,$e()})),["aussaat","pflanz","ernteVon"].forEach(K=>me(K)?.addEventListener("change",()=>{K===(ee==="ernte"?"ernteVon":ee)&&$e()})),ue();const Me=G.querySelector('[data-f="succOn"]');Me?.addEventListener("change",()=>{G.querySelector("[data-succ-box]").hidden=!Me.checked}),G.querySelectorAll(".km-sw").forEach(K=>K.addEventListener("click",()=>{G.querySelectorAll(".km-sw").forEach(re=>re.classList.remove("on")),K.classList.add("on")})),G.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(L?.id)try{await ol({id:L.id}),await D(),Y(),W(),Ye()}catch{N.error("Löschen fehlgeschlagen.")}})}function wa(x,L,O){const H=L||{art:"bewaesserung",status:"geplant"},z=au.map(X=>`<button type="button" class="km-tile${(H.art||"bewaesserung")===X.art?" on":""}" data-art="${X.art}" style="--ac:${Jn[X.art].color}"><i class="bi ${X.icon}"></i><span>${b(X.label)}</span></button>`).join(""),M=(H.status||"geplant")==="erledigt",B=(M?H.erledigtDatum:H.planDatum)||ot(),ce=`
      <div class="km-tasktiles">${z}</div>
      <div class="km-fld">Wann?<div class="km-when" data-when>
        <button type="button" class="km-chip" data-day="0">Heute</button>
        <button type="button" class="km-chip" data-day="1">Morgen</button>
        <button type="button" class="km-chip" data-day="x">Datum…</button>
        <input type="date" data-f="datum" value="${B.slice(0,10)}" />
      </div></div>
      <div class="km-seg" data-seg>
        <button type="button" class="km-segb${M?"":" on"}" data-status="geplant"><i class="bi bi-clock"></i> Geplant</button>
        <button type="button" class="km-segb${M?" on":""}" data-status="erledigt"><i class="bi bi-check-lg"></i> Erledigt</button>
      </div>
      <button type="button" class="km-more" data-more><i class="bi bi-sliders"></i> Notiz, Menge, Mittel</button>
      <div class="km-more-box" data-more-box hidden>
        <label class="km-fld">Bezeichnung<input data-f="notes" value="${b(H.notes||"")}" placeholder="z. B. Kompostgabe" /></label>
        <div class="km-frow2">
          <label class="km-fld">Menge<input type="number" step="0.1" data-f="menge" value="${H.menge!=null?H.menge:""}" placeholder="optional" /></label>
          <label class="km-fld">Einheit<input data-f="einheit" value="${b(H.einheit||"")}" placeholder="kg/ha, l" /></label>
        </div>
        <label class="km-fld">Mittel<input data-f="mittel" value="${b(H.mittel||"")}" placeholder="optional" /></label>
      </div>
      ${L?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Aufgabe löschen</button>':""}`,de=dn(L?"Aufgabe bearbeiten":"Aufgabe hinzufügen",ce,"Speichern",X=>{const G=X.querySelector(".km-tile.on")?.dataset.art||"bewaesserung",ee=X.querySelector(".km-segb.on")?.dataset.status||"geplant",me=X.querySelector('[data-f="datum"]').value||ot(),we=!X.querySelector("[data-more-box]").hidden,Re=ue=>{const $e=X.querySelector(`[data-f="${ue}"]`)?.value;return $e?Number($e):null},q=ue=>X.querySelector(`[data-f="${ue}"]`)?.value.trim()||null;(async()=>{try{await Pi({id:L?.id,flaecheTyp:x.typ,flaecheId:x.id,anbauId:L?.anbauId||O?.id||null,art:G,status:ee,planDatum:ee==="geplant"?me:L?.planDatum||null,erledigtDatum:ee==="erledigt"?me:null,menge:we?Re("menge"):L?.menge??null,einheit:we?q("einheit"):L?.einheit||null,mittel:we?q("mittel"):L?.mittel||null,historyId:L?.historyId||null,notes:we?q("notes"):L?.notes||null}),await D(),Y(),W()}catch{N.error("Speichern fehlgeschlagen.")}})()});de.querySelectorAll(".km-tile").forEach(X=>X.addEventListener("click",()=>{de.querySelectorAll(".km-tile").forEach(G=>G.classList.remove("on")),X.classList.add("on")})),de.querySelectorAll(".km-segb").forEach(X=>X.addEventListener("click",()=>{de.querySelectorAll(".km-segb").forEach(G=>G.classList.remove("on")),X.classList.add("on")}));const fe=de.querySelector('[data-f="datum"]');de.querySelectorAll("[data-day]").forEach(X=>X.addEventListener("click",()=>{const G=X.dataset.day;if(G==="x"){fe.style.display="inline-block",fe.showPicker?.();return}const ee=new Date;ee.setDate(ee.getDate()+Number(G)),fe.value=ee.toISOString().slice(0,10),fe.style.display="none"})),de.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(L?.id)try{await Ai({id:L.id}),await D(),Y(),W(),Ye()}catch{N.error("Löschen fehlgeschlagen.")}})}e.querySelectorAll(".km-modebtn").forEach(x=>x.addEventListener("click",()=>ne(x.dataset.mode))),document.addEventListener("keydown",x=>{x.key==="Escape"&&(v&&Ye(),Ht())}),window.addEventListener("psm:openKultur",x=>{const L=x?.detail;!L?.typ||!L?.id||(o=L.typ+":"+L.id,ne("flaechen"),f&&(Se(),Te(),A()))}),t.state.subscribe(x=>{x?.app?.activeSection==="kultur"&&(f?(async()=>(a=await ys(t),Y(),A()))():(f=!0,T()))}),le()}function iu(){return`
  <style>
    .kultur-wrap{display:flex;flex-direction:column;gap:14px;min-height:calc(100vh - 120px);font-size:14px}
    .kultur-top{display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:space-between}
    .kultur-modes{display:inline-flex;background:var(--surface-2);border:1px solid var(--border-1);border-radius:10px;padding:3px}
    .km-modebtn{border:0;background:transparent;color:var(--text-muted);font-size:14px;font-weight:600;padding:8px 16px;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;gap:7px}
    .km-modebtn.active{background:var(--surface-1);color:var(--text);box-shadow:0 1px 3px rgba(0,0,0,.1)}
    .kultur-kpis{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
    .km-kpi{background:var(--surface-1);border:1px solid var(--border-1);border-radius:11px;padding:8px 16px;text-align:center;min-width:92px}
    .km-kpi-v{font-size:19px;font-weight:700;color:var(--text);line-height:1.1}
    .km-kpi-l{font-size:11px;color:var(--text-dim)}
    .km-psm{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--border-1);background:var(--surface-1);color:var(--text-muted);border-radius:10px;padding:9px 14px;font-size:13px;cursor:pointer}
    .km-psm:hover{background:var(--surface-2);color:var(--text)}
    .kultur-body{display:grid;grid-template-columns:248px 1fr;gap:14px;flex:1;min-height:0}
    .kultur-list{background:var(--surface-1);border:1px solid var(--border-1);border-radius:14px;padding:8px;overflow-y:auto;max-height:calc(100vh - 200px)}
    .km-grp{font-size:11px;color:var(--text-dim);text-transform:uppercase;letter-spacing:.05em;padding:10px 10px 5px}
    .km-row{display:flex;align-items:center;gap:11px;padding:11px 10px;border-radius:10px;cursor:pointer}
    .km-row:hover{background:var(--surface-2)}
    .km-row.sel{background:var(--surface-3);box-shadow:inset 3px 0 0 #16a34a}
    .km-dot{width:10px;height:10px;border-radius:3px;flex:none}
    .km-row-main{min-width:0}
    .km-row-name{font-size:14.5px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .km-row-sub{font-size:12.5px}
    .km-row-sub .crop{color:var(--text-muted)}
    .km-row-sub .free{color:var(--text-dim)}
    .kultur-detail{background:var(--surface-1);border:1px solid var(--border-1);border-radius:14px;padding:20px;overflow-y:auto;max-height:calc(100vh - 200px)}
    .km-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:var(--text-dim);text-align:center;padding:48px 16px;height:100%}
    .km-empty i{font-size:34px;opacity:.45}.km-empty p{font-size:14px;line-height:1.55;margin:0}
    .km-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px}
    .km-head-name{font-size:20px;font-weight:700;color:var(--text)}
    .km-head-badge{font-size:12.5px;color:#0f766e;background:rgba(16,163,74,.1);border-radius:8px;padding:3px 10px;margin-left:10px}
    .km-headbtn{border:1px solid var(--border-1);background:var(--surface-1);color:var(--text-muted);border-radius:9px;padding:8px 13px;font-size:13px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
    .km-headbtn:hover{background:var(--surface-2);color:var(--text)}
    .km-hero{display:flex;align-items:center;gap:16px;border-radius:14px;padding:18px 20px;margin-bottom:10px}
    .km-hero.active{background:rgba(16,163,74,.09)}
    .km-hero.empty{background:var(--surface-2)}
    .km-hero-ic{width:48px;height:48px;border-radius:50%;background:var(--cc,#16a34a);display:flex;align-items:center;justify-content:center;color:#fff;font-size:24px;flex:none}
    .km-hero-ic.gray{background:var(--border-2);color:var(--surface-1)}
    .km-hero-body{flex:1;min-width:0}
    .km-hero-crop{font-size:23px;font-weight:700;color:var(--text);line-height:1.15}
    .km-hero-crop.gray{color:var(--text-muted);font-size:19px}
    .km-hero-sub{font-size:13px;color:var(--text-muted);margin-top:2px}
    .km-hero-edit{border:0;background:transparent;color:var(--text-dim);cursor:pointer;font-size:16px;padding:6px;align-self:flex-start}
    .km-hero-edit:hover{color:var(--text)}
    .km-hero-add{border:0;background:#16a34a;color:#fff;border-radius:10px;padding:11px 18px;font-size:14px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:7px;white-space:nowrap}
    .km-hero-add:hover{background:#15803d}
    .km-next{font-size:13px;color:var(--text-muted);display:flex;align-items:center;gap:3px;padding:4px 6px 14px}
    .km-next b{color:var(--text);font-weight:600}
    .km-next-edit{border:0;background:transparent;color:var(--text-dim);cursor:pointer;font-size:12px;padding:2px 4px;margin-left:4px}
    .km-next-add{border:1px dashed var(--border-2);background:transparent;color:var(--text-muted);border-radius:9px;padding:9px 14px;font-size:13px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;margin:2px 0 14px}
    .km-next-add:hover{border-color:#16a34a;color:#16a34a}
    .km-tasks-head{display:flex;align-items:center;justify-content:space-between;margin:6px 0 8px}
    .km-tasks-head>span{font-size:16px;font-weight:700;color:var(--text)}
    .km-addtask{border:0;background:rgba(16,163,74,.1);color:#15803d;border-radius:9px;padding:9px 15px;font-size:14px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
    .km-addtask:hover{background:rgba(16,163,74,.18)}
    .km-tasks{display:flex;flex-direction:column;gap:6px}
    .km-task{display:flex;align-items:center;gap:12px;padding:12px 12px;border:1px solid var(--border-1);border-radius:11px;cursor:pointer}
    .km-task:hover{background:var(--surface-2)}
    .km-task.done{opacity:.66}
    .km-task-ic{width:36px;height:36px;border-radius:10px;background:color-mix(in srgb,var(--mc) 14%,transparent);color:var(--mc);display:flex;align-items:center;justify-content:center;font-size:17px;flex:none}
    .km-task-main{flex:1;min-width:0}
    .km-task-title{font-size:14.5px;font-weight:600;color:var(--text);display:flex;align-items:center;gap:7px}
    .km-task-sub{font-size:12px;color:var(--text-dim)}
    .km-task-when{font-size:13px;color:var(--text-muted);white-space:nowrap}
    .km-task-when.overdue{color:var(--danger-600);font-weight:600}
    .km-pill{font-size:9.5px;background:rgba(220,38,38,.12);color:var(--danger-600);border-radius:5px;padding:1px 6px;font-weight:700}
    .km-check{border:1.5px solid var(--border-2);background:var(--surface-1);color:var(--text-dim);width:30px;height:30px;border-radius:50%;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:15px;flex:none}
    .km-check:hover{border-color:#16a34a;color:#16a34a;background:rgba(16,163,74,.08)}
    .km-tbtn{border:0;background:transparent;color:var(--text-dim);cursor:pointer;width:28px;height:28px;border-radius:7px;font-size:13px}
    .km-tbtn:hover{color:var(--danger-600)}
    .km-tasks-none{display:flex;align-items:center;gap:8px;color:var(--text-dim);font-size:13.5px;padding:14px 4px}
    .km-tasks-none i{color:#16a34a}
    .km-done-h{font-size:11px;color:var(--text-dim);text-transform:uppercase;letter-spacing:.04em;margin:12px 0 2px}
    .km-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:18px;padding-top:14px;border-top:1px solid var(--border-1)}
    .km-weather{font-size:13.5px;color:var(--text-muted);display:inline-flex;align-items:center;gap:7px}
    .km-weather i{color:#0891b2;font-size:16px}
    .km-plan{border:1px solid var(--border-1);background:var(--surface-1);color:var(--text-muted);border-radius:9px;padding:8px 14px;font-size:13px;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
    .km-plan:hover{background:var(--surface-2);color:var(--text)}
    .km-attr{font-size:10.5px;color:var(--text-dim);margin-top:8px}
    .kultur-board{background:var(--surface-1);border:1px solid var(--border-1);border-radius:14px;padding:14px;overflow:auto;max-height:calc(100vh - 190px)}
    /* Modal */
    .kmodal-ov{position:fixed;inset:0;z-index:3000;background:rgba(15,23,42,.42);display:flex;align-items:center;justify-content:center;padding:16px}
    .kmodal{background:var(--surface-1);border-radius:16px;width:min(480px,96vw);max-height:92vh;display:flex;flex-direction:column;box-shadow:0 24px 64px rgba(0,0,0,.32)}
    .kmodal-h{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;font-size:17px;font-weight:700;color:var(--text)}
    .kmodal-x{border:0;background:transparent;color:var(--text-dim);cursor:pointer;font-size:16px}
    .kmodal-b{padding:4px 20px 16px;overflow-y:auto;display:flex;flex-direction:column;gap:14px}
    .kmodal-f{display:flex;justify-content:flex-end;gap:10px;padding:14px 20px;border-top:1px solid var(--border-1)}
    .btn-cancel{border:1px solid var(--border-1);background:var(--surface-1);color:var(--text-muted);border-radius:10px;padding:10px 18px;font-size:14px;cursor:pointer}
    .btn-save{border:0;background:#16a34a;color:#fff;border-radius:10px;padding:10px 24px;font-size:14px;font-weight:600;cursor:pointer}
    .btn-save:hover{background:#15803d}
    .km-fld{display:flex;flex-direction:column;gap:6px;font-size:12.5px;color:var(--text-muted)}
    .km-fld.big{font-size:14px;color:var(--text)}
    .km-fld input,.km-fld select,.km-fld textarea{padding:11px 12px;border:1px solid var(--border-1);border-radius:10px;font-size:15px;background:var(--surface-1);color:var(--text);width:100%}
    .km-fld.big input{font-size:17px;padding:13px 14px}
    .km-frow2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
    .km-more{border:0;background:transparent;color:var(--text-muted);font-size:13px;cursor:pointer;display:inline-flex;align-items:center;gap:7px;padding:4px 0;align-self:flex-start}
    .km-more:hover{color:var(--text)}
    .km-more-box{display:flex;flex-direction:column;gap:12px;padding-top:4px;border-top:1px dashed var(--border-1)}
    .km-dangerlink{border:0;background:transparent;color:var(--danger-600);font-size:13px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;align-self:flex-start;padding:2px 0}
    .km-sws{display:flex;gap:7px;flex-wrap:wrap}
    .km-sw{width:28px;height:28px;border-radius:8px;border:2px solid rgba(0,0,0,.12);cursor:pointer;padding:0}
    .km-sw.on{box-shadow:0 0 0 2px var(--text)}
    .km-tasktiles{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}
    .km-tile{display:flex;flex-direction:column;align-items:center;gap:7px;padding:14px 4px;border:1.5px solid var(--border-1);background:var(--surface-1);border-radius:12px;cursor:pointer;color:var(--text-muted);font-size:12px}
    .km-tile i{font-size:21px}
    .km-tile.on{border-color:var(--ac);color:var(--ac);background:color-mix(in srgb,var(--ac) 9%,transparent)}
    .km-when{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
    .km-chip{border:1px solid var(--border-1);background:var(--surface-1);color:var(--text-muted);border-radius:8px;padding:8px 14px;font-size:13px;cursor:pointer}
    .km-chip:hover{border-color:#16a34a;color:#16a34a}
    .km-when input[type=date]{width:auto;display:none}
    .km-seg{display:inline-flex;background:var(--surface-2);border:1px solid var(--border-1);border-radius:10px;padding:3px;align-self:flex-start}
    .km-segb{border:0;background:transparent;color:var(--text-muted);font-size:13px;font-weight:600;padding:8px 16px;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
    .km-segb.on{background:var(--surface-1);color:var(--text);box-shadow:0 1px 2px rgba(0,0,0,.1)}
    .km-frow3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
    .km-hint2{font-size:11.5px;color:var(--text-dim);display:flex;align-items:center;gap:6px;margin-top:-2px}
    .km-hint2 i{color:#0891b2}
    .km-stammhint{font-size:12.5px;color:#15803d;background:rgba(16,163,74,.08);border:1px solid rgba(16,163,74,.22);border-radius:9px;padding:8px 11px;display:flex;align-items:center;gap:7px;margin-top:-4px}
    .km-stammhint i{color:#16a34a}
    .km-stammhint b{font-weight:700}
    .km-anchor{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;transition:opacity .15s}
    .km-anchor-l{font-size:12.5px;color:var(--text-muted)}
    .km-anchor-seg{align-self:auto}
    .km-anchor-seg .km-segb{padding:7px 13px;font-size:12.5px}
    .km-succ{border:1px dashed var(--border-2);border-radius:11px;padding:11px 12px;display:flex;flex-direction:column;gap:10px}
    .km-check2{display:flex;align-items:center;gap:9px;font-size:13.5px;color:var(--text);cursor:pointer}
    .km-check2 input{width:17px;height:17px;accent-color:#16a34a;flex:none}
    .km-check2 small{color:var(--text-dim);font-weight:400}
    /* Kontextmenü */
    .km-ctx{position:fixed;z-index:4000;min-width:210px;background:var(--surface-1);border:1px solid var(--border-1);border-radius:11px;box-shadow:0 14px 38px rgba(15,23,42,.22);padding:5px;font-size:14px;color:var(--text)}
    .km-ctx-t{font-size:11px;font-weight:700;color:var(--text-dim);text-transform:uppercase;letter-spacing:.04em;padding:6px 10px 7px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .km-ctx-sep{height:1px;background:var(--border-1);margin:4px 4px}
    .km-ctx-i{display:flex;align-items:center;gap:10px;width:100%;border:0;background:transparent;color:inherit;text-align:left;padding:9px 10px;border-radius:8px;cursor:pointer;font-size:13.5px}
    .km-ctx-i:hover{background:var(--surface-3)}
    .km-ctx-i i{width:18px;text-align:center;color:var(--text-muted)}
    /* Saison-Leiste (Detail) */
    .ks-wrap{border:1px solid var(--border-1);border-radius:12px;padding:10px 12px;margin:6px 0 16px}
    .ks-head,.ks-row{display:flex;align-items:center;min-height:24px}
    .ks-rl{width:88px;min-width:88px;font-size:11.5px;color:var(--text-muted);padding-right:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .ks-axis{display:flex;flex:1}
    .ks-mo{flex:1;text-align:center;font-size:10.5px;color:var(--text-dim);border-left:1px solid var(--border-1)}
    .ks-mo.cur{color:#16a34a;font-weight:700}
    .ks-track{position:relative;flex:1;height:24px;background-image:linear-gradient(to right,var(--border-1) 1px,transparent 1px);background-repeat:repeat-x}
    .ks-bar{position:absolute;top:4px;height:16px;border-radius:4px;background:var(--cc);color:#fff;display:flex;align-items:center;padding:0 6px;overflow:hidden;min-width:6px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)}
    .ks-bar span{font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .ks-bar.planned{background:transparent;border:1.5px dashed var(--cc);color:var(--cc)}
    .ks-harvest{position:absolute;top:6px;height:12px;border-radius:3px;background:repeating-linear-gradient(45deg,rgba(255,255,255,.62),rgba(255,255,255,.62) 3px,transparent 3px,transparent 6px);box-shadow:inset 0 0 0 1.5px #fff;pointer-events:none}
    .ks-mk{position:absolute;top:7px;width:11px;height:11px;border-radius:50%;background:var(--mc);transform:translateX(-50%);border:1.5px solid var(--surface-1)}
    .ks-mk:not(.done){background:var(--surface-1);box-shadow:inset 0 0 0 2px var(--mc)}
    .ks-today{position:absolute;top:-2px;bottom:-2px;width:0;border-left:2px dashed #16a34a;transform:translateX(-1px);pointer-events:none}
    .ks-legend{display:flex;gap:14px;font-size:11px;color:var(--text-dim);margin-top:8px;padding-left:88px;align-items:center}
    .ks-legend>span{display:inline-flex;align-items:center;gap:5px}
    .ks-d{width:11px;height:11px;border-radius:50%;background:var(--surface-1);box-shadow:inset 0 0 0 2px var(--text-dim)}
    .ks-d.done{background:var(--text-dim);box-shadow:none}
    .ks-hbar{width:18px;height:9px;border-radius:3px;background:repeating-linear-gradient(45deg,#bbb,#bbb 2px,transparent 2px,transparent 4px);display:inline-block}
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
  </section>`}const su=["pflanzenschutz.json","history.json","entries.json"];let xs=!1,R=null,St=!1;const Zt=25,zr=new Intl.NumberFormat("de-DE");let De=0,zn=null,ks=null;const ou=Zs({id:"import",label:"Import-Vorschau",budget:{initialLoad:20,maxItems:50}});let Qr=null;function lu(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function cu(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function du(e,t){const a=e.querySelector('[data-role="import-log-list"]');if(a){if(!t.length){a.innerHTML='<tr><td colspan="5" class="text-muted small">Noch keine Importe protokolliert.</td></tr>';return}a.innerHTML=t.map(n=>{const r=n.rangeStart||n.rangeEnd?`${Ua(n.rangeStart)||n.rangeStart||"?"} – ${Ua(n.rangeEnd)||n.rangeEnd||"?"}`:"-",s=[n.source,n.device].filter(Boolean),l=s.length?b(s.join(" · ")):"-";return`
        <tr>
          <td>${b(cu(n.importedAt))}</td>
          <td>${l}</td>
          <td class="text-end text-success">${n.added}</td>
          <td class="text-end text-muted">${n.skipped}</td>
          <td class="small text-muted">${b(r)}</td>
        </tr>`}).join("")}}async function qn(e){if(oe()==="sqlite")try{const t=await ll(50);du(e,t.items||[])}catch(t){console.warn("Import-Historie konnte nicht geladen werden",t)}}function Et(e,t,a="info"){const n=e.querySelector('[data-role="import-hint"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a} small mt-3`,n.textContent=t}}function Gt(e,t){const a=e.querySelector('[data-role="import-feedback"]');a&&(a.textContent=t)}function Ft(e){const t=e.querySelector('[data-action="clear-import"]'),a=e.querySelector('[data-action="focus-import"]'),n=e.querySelector('[data-action="run-import"]'),r=!!R;if(t&&(t.disabled=!r||St),a&&(a.disabled=!r||St),n){const s=!!(R?.importableEntries?.length&&R.stats||R?.fotos?.length);n.disabled=!r||!s||St}}function uu(e){R=null,xu(e);const t=e.querySelector('[data-role="import-summary-card"]'),a=e.querySelector('[data-role="import-file"]');t&&t.classList.add("d-none"),a&&(a.value=""),Gt(e,""),Et(e,"Bereit für eine neue Importdatei."),Ft(e),ca()}function vo(e){if(e.dateIso)return e.dateIso;if(e.datum){const t=new Date(e.datum);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.date){const t=new Date(e.date);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.savedAt){const t=new Date(e.savedAt);if(!Number.isNaN(t.getTime()))return t.toISOString()}return null}function Yn(e){return e?Ua(e)||e.slice(0,10):"-"}function yo(e){return e.savedAt||(e.savedAt=e.createdAt||e.dateIso||new Date().toISOString()),e}function ws(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function pu(e){if(!e||typeof e!="object")return null;const t={...e};if(!Array.isArray(t.items)){const a=e.items;t.items=Array.isArray(a)?[...a]:[]}return yo(t),t}function xo(e,t){const a=e.map(n=>vo(n)).filter(n=>!!n).sort();return{startIso:a[0]||t?.filters?.startDate||null,endIso:a[a.length-1]||t?.filters?.endDate||null}}function fu(e){if(!e)return;const t=ws(e.startIso,"start"),a=ws(e.endIso,"end");if(!t&&!a)return;const n={};return t&&(n.startDate=t),a&&(n.endDate=a),n}async function ko(e,t){if(oe()!=="sqlite"){const o=Ue(e.history);return new Set(o.map(u=>Xn(u)).filter(u=>!!u))}const n=fu(t);if(!n)return new Set;const r=new Set;let s=1;const l=500;try{for(;;){const o=await qs({page:s,pageSize:l,filters:n,sortDirection:"asc"});if(o.items.forEach(u=>{const f=Xn(u);f&&r.add(f)}),s*l>=o.totalCount)break;s+=1}}catch(o){return console.warn("Konnte vorhandene Einträge für Duplikatprüfung nicht laden",o),new Set}return r}function Xn(e){const t=typeof e.clientUuid=="string"&&e.clientUuid?e.clientUuid:"";if(t)return`uuid:${t}`;const a=e.savedAt||e.dateIso||e.createdAt||e.datum||"",n=e.ersteller||"",r=e.kultur||"",s=e.invekos||e.standort||"";return[a,n,r,s].join("|")}function mu(e,t,a,n){const r=n||xo(e,a),s=r.startIso,l=r.endIso,o=new Set,u=new Set;return t.forEach(f=>{f.ersteller&&o.add(f.ersteller),f.kultur&&u.add(f.kultur)}),{startDateLabel:Yn(s),endDateLabel:Yn(l),startDateRaw:s,endDateRaw:l,entryCount:e.length,importableCount:t.length,duplicateCount:e.length-t.length,creators:Array.from(o).slice(0,5),crops:Array.from(u).slice(0,5)}}function gu(e,t){const a=e.querySelector('[data-role="import-stats"]');if(!a)return;if(!t){a.innerHTML="";return}const n=t.stats,r=t.metadata?.filters;a.innerHTML=`
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
  `}function wo(e){const t=e.entries.length;if(!t)return De=0,{start:0,end:0,total:0};const a=Math.max(Math.ceil(t/Zt),1);De>=a&&(De=a-1),De<0&&(De=0);const n=De*Zt,r=Math.min(n+Zt,t);return{start:n,end:r,total:t}}function hu(e){const t=e.querySelector('[data-role="import-pager"]');return t?((!zn||ks!==t)&&(zn?.destroy(),zn=an(t,{onPrev:()=>vu(e),onNext:()=>yu(e),labels:{prev:"Zurück",next:"Weiter",loading:"Vorschau wird geladen...",empty:"Keine Einträge verfügbar"}}),ks=t),zn):null}function Ga(e,t){const a=hu(e);if(!a)return;if(!t){De=0,a.update({status:"hidden"});return}const n=t.entries.length;if(!n){De=0,a.update({status:"disabled",info:"Keine Einträge vorhanden."});return}const{start:r,end:s}=wo(t),l=`Einträge ${zr.format(r+1)}–${zr.format(s)} von ${zr.format(n)}`;a.update({status:"ready",info:l,canPrev:De>0,canNext:s<n})}function vu(e){!R||De===0||(De=Math.max(De-1,0),hi(e,R))}function yu(e){if(!R)return;const t=R.entries.length;if(!t)return;const a=Math.max(Math.ceil(t/Zt)-1,0);De>=a||(De=Math.min(De+1,a),hi(e,R))}function xu(e){De=0,e&&Ga(e,R)}function hi(e,t){const a=e.querySelector('[data-role="import-preview-table"]');if(!a){ca();return}if(!t){a.innerHTML="",Ga(e,null),ca();return}if(!t.entries.length){a.innerHTML='<tr><td colspan="5" class="text-center text-muted">Keine Einträge</td></tr>',Ga(e,t),ca();return}const{start:r,end:s}=wo(t),o=t.entries.slice(r,s).map(u=>{const f=Yn(vo(u));return`
        <tr>
          <td>${b(f)}</td>
          <td>${b(u.kultur||"-")}</td>
          <td>${b(u.ersteller||"-")}</td>
          <td>${b(u.standort||u.invekos||"-")}</td>
          <td>${b(u.savedAt?Yn(u.savedAt):"-")}</td>
        </tr>
      `}).join("");a.innerHTML=o,Ga(e,t),ca()}async function ku(e){const t=ul(e),a=Object.keys(t),n=a.find(f=>su.some(p=>f.toLowerCase().endsWith(p)));if(!n)throw new Error("ZIP enthält keine 'pflanzenschutz.json'.");const r=JSON.parse(Pr(t[n])),s=a.find(f=>f.toLowerCase().endsWith("metadata.json")),l=s?JSON.parse(Pr(t[s])):null,o=Array.isArray(r)?r:Array.isArray(r.entries)?r.entries:Array.isArray(r.history)?r.history:[],u=Array.isArray(r?.fotos)?r.fotos:[];for(const f of u){if(f?.data)continue;const p=f?.file?String(f.file):null,g=p?a.find(v=>v===p||v.toLowerCase().endsWith(p.toLowerCase())):null;g&&t[g]&&(f.data=wu(t[g]),f.mime||(f.mime="image/jpeg"))}return{entries:o,metadata:l,fotos:u}}function wu(e){let t="";for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode(...e.subarray(n,n+32768));return btoa(t)}async function Su(e){const t=Pr(e),a=JSON.parse(t);if(Array.isArray(a))return{entries:a,metadata:null,fotos:[]};const n=Array.isArray(a.fotos)?a.fotos:[];if(Array.isArray(a.entries))return{entries:a.entries,metadata:a.metadata||null,fotos:n};if(Array.isArray(a.history))return{entries:a.history,metadata:a.metadata||null,fotos:n};if(n.length)return{entries:[],metadata:a.metadata||null,fotos:n};throw new Error("JSON enthält keine Eintragsliste.")}async function Eu(e,t){const a=new Uint8Array(await e.arrayBuffer()),n=/\.zip$/i.test(e.name)||e.type==="application/zip",{entries:r,metadata:s,fotos:l}=n?await ku(a):await Su(a),o=Array.isArray(l)?l:[],u=(Array.isArray(r)?r:[]).map(w=>pu(w)).filter(w=>!!w);if(!u.length&&!o.length)throw new Error("Die Datei enthielt keine verwertbaren Einträge.");const f=xo(u,s),p=await ko(t,f),g=new Set,v=[];let k=0;u.forEach(w=>{const E=Xn(w);if(!E){v.push(w);return}if(p.has(E)||g.has(E)){k+=1;return}g.add(E),v.push(w)});const h=mu(u,v,s,f),S=[];return k&&S.push(`${k} Datensätze wurden wegen gleicher Kennung übersprungen.`),(!h.startDateRaw||!h.endDateRaw)&&S.push("Zeitraum konnte nicht eindeutig ermittelt werden."),{filename:e.name,entries:u,importableEntries:v,metadata:s,stats:h,warnings:S,lastImportRefs:[],fotos:o}}function Ss(){if(!R)return"Keine Datei";const e=[];return St&&e.push("Verarbeitung"),R.warnings.length&&e.push("Warnungen"),R.stats.importableCount<R.stats.entryCount&&e.push("Duplikate entfernt"),e.length?e.join(" · "):void 0}function Lu(){const e=!!R,t=e?Math.max(Math.ceil((R?.entries.length||0)/Zt),1):null,a=e?{items:R?.entries.length??0,totalCount:R?.stats.entryCount??null,cursor:R&&(R.entries.length||0)>Zt?`Seite ${De+1}${t?` / ${t}`:""}`:null,payloadKb:Js(R?.entries.slice(0,Zt)),lastUpdated:Qr,note:Ss()}:{items:0,totalCount:0,cursor:null,payloadKb:0,lastUpdated:Qr,note:Ss()};Qs(ou,a)}function ca(){Qr=new Date().toISOString(),Lu()}function Jr(e){const t=e.querySelector('[data-role="import-summary-card"]');if(!t)return;if(!R){t.classList.add("d-none"),Ga(e,null),Ft(e),ca();return}t.classList.remove("d-none"),De=0;const a=t.querySelector('[data-role="import-file-name"]'),n=t.querySelector('[data-role="import-summary-subline"]');a&&(a.textContent=R.filename),n&&(n.textContent=`${R.stats.importableCount} von ${R.stats.entryCount} Einträgen importierbar`),gu(e,R),bu(e,R),hi(e,R),Ft(e)}async function Du(){const e=oe();if(!e||e==="memory"||e==="sqlite")return;const t=et();await tt(t)}function Es(e,t){if(!t.length)return[];const a=typeof e.state.updateSlice=="function"?e.state.updateSlice:Qe,n=[];return a("history",r=>{const s=en(r),l=s.items.slice(),o=l.length;return t.forEach((u,f)=>{n.push(o+f),l.push(u)}),{...s,items:l,totalCount:l.length,lastUpdatedAt:new Date().toISOString()}}),n}async function $u(e,t){if(!R){window.alert("Bitte zuerst eine Importdatei laden.");return}const a=R.fotos||[];if(!R.importableEntries.length&&!a.length){window.alert("Alle Einträge wurden bereits importiert oder als Duplikat erkannt.");return}St=!0,Ft(e),Gt(e,"Import läuft ...");const n=t.state.getState(),r={startIso:R.stats.startDateRaw,endIso:R.stats.endDateRaw};let s=new Set;try{s=await ko(n,r)}catch(S){console.warn("Duplikatprüfung vor Import fehlgeschlagen",S)}const l=new Set(s),o=[];let u=0;if(R.importableEntries.forEach(S=>{const w=Xn(S);if(w&&l.has(w)){u+=1;return}w&&l.add(w),o.push(S)}),!o.length&&!a.length){Gt(e,"Keine neuen Einträge gefunden."),Et(e,"Alle Datensätze sind bereits importiert worden.","warning"),St=!1,Ft(e);return}const f=oe(),p=[],g=[];let v=0,k=0;const h=o.map(S=>yo({...S}));try{if(f==="sqlite"){const I=[];for(const V of h)try{const W=await $s(V);if(W?.duplicate){u+=1;continue}W?.id!=null&&(p.push({source:"sqlite",ref:W.id}),I.push(V))}catch(W){console.error("appendHistoryEntry failed",W),g.push(V.savedAt||"Unbekannter Eintrag")}Es(t,I);for(const V of a)try{(await cl(V))?.duplicate?k+=1:v+=1}catch(W){console.error("appendFoto failed",W)}v&&window.dispatchEvent(new CustomEvent("fotos:changed"));try{await nt()}catch(V){console.warn("SQLite-Datei konnte nach dem Import nicht gespeichert werden",V)}}else Es(t,h).forEach(V=>{p.push({source:"state",ref:V})}),await Du();const S=p.length;if(S||v){f==="sqlite"&&S&&t.events?.emit?.("history:data-changed",{type:"created-bulk",count:S});const I=[];S&&I.push(`${S} Einträge`),v&&I.push(`${v} Foto(s)`),Gt(e,`${I.join(" und ")} importiert.${g.length?` ${g.length} Einträge konnten nicht übernommen werden.`:""}`.trim()),R.lastImportRefs=p,R.importableEntries=[],R.stats={...R.stats,importableCount:0},Jr(e)}else Gt(e,"Keine neuen Daten importiert.");const w=[];let E="success";if(g.length&&(w.push(`${g.length} Einträge konnten nicht gespeichert werden. Details siehe Konsole.`),E="warning"),u&&(w.push(`${u} Einträge wurden während des Imports als Duplikat übersprungen.`),E="warning"),k&&w.push(`${k} Foto(s) waren bereits vorhanden (übersprungen).`),w.length||w.push("Import abgeschlossen."),Et(e,w.join(" "),E),f==="sqlite"&&(S||u||v||k))try{const I=[];g.length&&I.push(`${g.length} fehlgeschlagen`),v&&I.push(`${v} Fotos`),k&&I.push(`${k} Fotos doppelt`),await dl({source:R.filename||null,device:R.metadata?.device||R.metadata?.label||null,added:S,skipped:u,rangeStart:R.stats.startDateRaw,rangeEnd:R.stats.endDateRaw,note:I.length?I.join(", "):null}),await nt().catch(()=>{}),await qn(e)}catch(I){console.warn("Import-Historie konnte nicht geschrieben werden",I)}}catch(S){console.error("Import fehlgeschlagen",S),Gt(e,"Import fehlgeschlagen. Siehe Konsole für Details."),Et(e,"Import fehlgeschlagen. Bitte erneut versuchen.","danger")}finally{St=!1,Ft(e)}}function zu(e,t,a){if(!e.events?.emit)return;const n=t.metadata?.label||t.metadata?.filters?.label||`Import ${t.filename}`;e.events.emit("documentation:focus-range",{startDate:t.stats.startDateRaw||void 0,endDate:t.stats.endDateRaw||void 0,label:n,reason:"import",entryIds:a,autoSelectFirst:!!a.length})}function Au(e,t){if(!R){window.alert("Bitte zuerst eine Importdatei laden.");return}if(!R.stats.startDateRaw||!R.stats.endDateRaw){window.alert("Zeitraum konnte nicht bestimmt werden.");return}zu(t,R,R.lastImportRefs),Et(e,"Dokumentation wurde auf den Importzeitraum fokussiert.")}function Pu(e,t){const a=e.querySelector('[data-role="import-file"]');a&&a.addEventListener("change",()=>{const n=a.files?.[0];n&&(St=!0,Et(e,"Datei wird analysiert ..."),Ft(e),Gt(e,""),Eu(n,t.state.getState()).then(r=>{R=r,Jr(e),Et(e,`${r.importableEntries.length} Einträge bereit zum Import.`)}).catch(r=>{console.error("Importdatei konnte nicht gelesen werden",r),Et(e,r?.message||"Importdatei konnte nicht gelesen werden.","danger"),R=null,Jr(e)}).finally(()=>{St=!1,Ft(e)}))}),e.addEventListener("click",n=>{const r=n.target?.closest("[data-action]");if(!r)return;const s=r.dataset.action;if(s){if(s==="clear-import"){uu(e);return}if(s==="focus-import"){Au(e,t);return}s==="run-import"&&$u(e,t)}})}function Mu(e,t){if(!e||xs)return;const a=e;a.innerHTML="";const n=lu();a.appendChild(n),Pu(n,t),Et(n,"Wähle eine Datei aus, um den Import zu starten."),qn(n),dt("database:connected",()=>void qn(n)),dt("app:sectionChanged",r=>{(r==="daten"||r==="documentation"||r==="import")&&qn(n)}),xs=!0}const Wt=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function Cu(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function ia(e,t,a,n){return`
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
  </section>`}function Bu(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Iu();const a=e.querySelector('[data-role="dash-cards"]'),n=e.querySelector('[data-role="dash-warn"]'),r=e.querySelector('[data-role="dash-recent"]');e.addEventListener("click",l=>{const o=l.target?.closest("[data-goto]");if(!o)return;const u=o.getAttribute("data-goto");u&&t.state.updateSlice("app",f=>({...f,activeSection:u}))});const s=async()=>{if(oe()!=="sqlite"){a&&(a.innerHTML='<div class="dash-empty">Bitte zuerst eine Datenbank öffnen.</div>');return}const l=t.state.getState(),o=(Ue(l.gps?.points)||[]).length;let u=0,f=0,p=0,g=0,v=[],k=[],h=0;try{u=(await Yr())?.rows?.length||0}catch{}try{f=(await Ts())?.rows?.length||0}catch{}try{const S=(await Xr())?.rows||[];p=S.length,g=S.reduce((w,E)=>w+(E.plants||0),0)}catch{}try{v=(await Fs())?.rows||[]}catch{}try{const S=await qs({}),w=S?.entries||S?.rows||[];h=S?.totalCount??w.length,k=w.slice(0,6)}catch{}if(a&&(a.innerHTML=[ia("bi-geo-alt","Standorte",Wt(o)),ia("bi-flower1","Kulturen",Wt(u)),ia("bi-droplet","Mittel im Sortiment",Wt(f),"lager"),ia("bi-journal-check","Anwendungen",Wt(h),"documentation"),ia("bi-map","Acker-Flächen",Wt(p),"acker"),ia("bi-flower3","Pflanzen (Acker)",Wt(g),"acker")].join("")),n){const S=[];v.forEach(E=>{E.bestand<=0&&(E.verbraucht>0||E.zugang>0)&&S.push(`<div class="dash-row"><span><i class="bi bi-box-seam me-1" style="color:#ef4444"></i>${b(E.name)}</span><span style="color:#ef4444">Bestand ${Wt(E.bestand)} ${b(E.einheit||"")}</span></div>`)}),v.forEach(E=>{if(!E.zulEnde)return;const I=Math.round((new Date(E.zulEnde).getTime()-Date.now())/864e5);I<0?S.push(`<div class="dash-row"><span><i class="bi bi-calendar-x me-1" style="color:#ef4444"></i>${b(E.name)}</span><span style="color:#ef4444">Zulassung abgelaufen</span></div>`):I<180&&S.push(`<div class="dash-row"><span><i class="bi bi-calendar-event me-1" style="color:#f59e0b"></i>${b(E.name)}</span><span style="color:#f59e0b">Zulassung endet in ${I} T</span></div>`)});const w=S.length>6?`<div class="dash-row" style="color:var(--color-text-muted)"><span>+ ${S.length-6} weitere</span></div>`:"";n.innerHTML=S.length?S.slice(0,6).join("")+w:'<div class="dash-empty">Alles im grünen Bereich. ✓</div>'}r&&(r.innerHTML=k.length?k.map(S=>{const w=Cu(S.datum||S.dateIso||S.created_at||S.createdAt||null),E=S.kultur||"",I=S.standort||"";return`<div class="dash-row"><span>${b(I)}${E?" · "+b(E):""}</span><span class="dash-empty" style="padding:0">${b(w)}</span></div>`}).join(""):'<div class="dash-empty">Noch keine Anwendungen erfasst.</div>')};t.state.subscribe(l=>{l?.app?.activeSection==="dashboard"&&s()}),s()}function Ls(e){document.querySelectorAll(".content-section").forEach(a=>{a.style.display="none"});const t=document.getElementById(`section-${e}`);t instanceof HTMLElement&&(t.style.display="block")}function Ds(){pl(),As();const e={state:{getState:j,updateSlice:Qe,subscribe:On},events:{emit:(w,E)=>{It(async()=>{const{emit:I}=await import("./index.DXWdWzHs.js").then(V=>V.aS);return{emit:I}},[]).then(({emit:I})=>{I(w,E)})},subscribe:dt}},t=document.querySelector('[data-region="startup"]'),a=document.querySelector('[data-region="shell"]'),n=document.querySelector('[data-region="main"]'),r=document.querySelector('[data-region="footer"]');Kl(t,e);const s=document.querySelector('[data-feature="calculation"]');fl(s,e);const l=document.querySelector('[data-feature="documentation"]');Hc(l,e);const o=document.querySelector('[data-feature="settings"]');Md(o,e);const u=document.querySelector('[data-feature="lager"]');Bd(u,e);const f=document.querySelector('[data-feature="acker"]');Kd(f,e);const p=document.querySelector('[data-feature="kultur"]');ru(p,e);const g=document.querySelector('[data-feature="fotos"]');ml(g,e,{archiveMode:!0});const v=document.querySelector('[data-feature="import-page"]');Mu(v,{state:{getState:j,updateSlice:Qe},events:e.events});const k=document.querySelector('[data-feature="dashboard"]');Bu(k,e);const h=w=>{const E=document.body;E&&(E.classList.toggle("bg-app",w),E.classList.toggle("bg-startup",!w))},S=w=>{const E=!!w.app?.hasDatabase;if(h(E),t instanceof HTMLElement&&t.classList.toggle("d-none",E),a instanceof HTMLElement&&a.classList.toggle("d-none",!E),n instanceof HTMLElement&&n.classList.toggle("d-none",!E),r instanceof HTMLElement&&r.classList.toggle("d-none",!E),E){const I=w.app?.activeSection??"dashboard";Ls(I)}};S(e.state.getState()),On((w,E)=>{w.app?.hasDatabase!==E.app?.hasDatabase&&S(w),w.app?.activeSection!==E.app?.activeSection&&w.app?.hasDatabase&&Ls(w.app.activeSection)}),dt("app:sectionChanged",()=>{})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ds,{once:!0}):Ds();
