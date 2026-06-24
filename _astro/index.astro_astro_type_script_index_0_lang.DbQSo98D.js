const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/index.tuviIcDV.js","_astro/index.B020-0f6.js","_astro/leaflet.C03ySvDx.css","_astro/leaflet-src.BcflbDBd.js","_astro/_commonjsHelpers.Cpj98o6Y.js","_astro/index.CPadEFgJ.js"])))=>i.map(i=>d[i]);
import{M as de,N as rs,I as Ve,O as Xs,P as eo,Q as is,k as xt,l as to,a as ss,s as rt,p as Xr,g as W,e as kn,c as Sn,u as Ze,_ as Lt,v as ao,w as os,R as no,S as ro,y as f,t as T,r as ei,T as io,n as en,q as ti,U as so,V as oo,W as _e,X as lo,Y as ls,Z as cs,G as ds,F as En,$ as co,a0 as uo,a1 as po,a2 as mo,a3 as fo,a4 as Ha,B as Ca,a5 as go,z as bo,a6 as je,a7 as Ge,a8 as ho,a9 as Oa,aa as vo,ab as yo,K as wo,ac as us,ad as ps,ae as Ia,af as xo,ag as ko,ah as So,ai,aj as Qn,ak as Jn,al as Eo,am as Lo,an as Do,ao as $o,ap as Ao,aq as zo,ar as Po,as as ms,at as Mo,au as fs,av as Co,aw as Ir,ax as Br,ay as Io,az as Bo,aA as Ln,aB as ni,aC as ri,aD as Yn,aE as No,aF as ii,aG as fa,aH as si,aI as To,aJ as oi,aK as li,aL as Fo,aM as qo,aN as Ho,aO as Oo,aP as ur,x as gs,i as _o,b as Ro,d as Ko}from"./index.B020-0f6.js";const pr="__psl_history_seeded",mr=200,ci=["Salat","Apfel","Wein","Tomate","Kartoffel","Hopfen","Raps","Birne"],di=["Spritzung","Düngung","Pflege","Behandlung"],ui=["LACES","MALDO","VITVI","SOLTU","PRNUS","CUPAR","CYNCR","ALLCE"],pi=["BBCH 10","BBCH 31","BBCH 41","BBCH 55","BBCH 65","BBCH 71","BBCH 81"],Wo=[{mediumId:"seed-water",name:"Wasser",unit:"L",methodId:"perKiste",methodLabel:"pro Kiste",value:.02,zulassungsnummer:"N/A"},{mediumId:"seed-tonikum",name:"Tonikum X",unit:"ml",methodId:"perKiste",methodLabel:"pro Kiste",value:.85,zulassungsnummer:"Z-123456"},{mediumId:"seed-oel",name:"Pflegeöl Y",unit:"ml",methodId:"percentWater",methodLabel:"% vom Wasser",value:.12,zulassungsnummer:"Z-654321"}];function jo(e){if(typeof window>"u")return;const a=new URLSearchParams(window.location.search).has("seedHistory");if(!a)return;const n=window;n.__PSL||(n.__PSL={});const r=n.__PSL;r.seedHistoryEntries=(l=mr)=>mi(e,{count:l}),r.resetHistorySeedFlag=()=>localStorage.removeItem(pr),!a&&!localStorage.getItem(pr)&&de()==="sqlite"&&mi(e,{count:mr,setFlag:!0}).catch(l=>{console.error("History seeding failed",l)})}async function Go(e){if(!e.state.getState().app?.hasDatabase){if(typeof e.state.subscribe!="function")throw new Error("SQLite-Datenbank ist noch nicht initialisiert.");await new Promise((t,a)=>{const n=window.setTimeout(()=>{i(),a(new Error("SQLite-Datenbank wurde nicht rechtzeitig initialisiert."))},1e4),r=e.state.subscribe?.(l=>{l.app?.hasDatabase&&(i(),t())}),i=()=>{window.clearTimeout(n),typeof r=="function"&&r()}})}}async function mi(e,t={}){const a=t.count??mr;if(de()!=="sqlite")throw new Error("SQLite-Treiber muss aktiv sein, bevor Daten befüllt werden können.");await Go(e);const n=performance.now();let r=0;for(let i=0;i<a;i+=1){const l=Uo(i);await rs(l),r+=1}try{await Ve()}catch(i){console.warn("Seed-Daten konnten nicht persistent gespeichert werden",i)}return e.events.emit("history:data-changed",{source:"dev-history-seed"}),t.setFlag&&localStorage.setItem(pr,"1"),{inserted:r,durationMs:performance.now()-n}}function Uo(e){const t=new Date;t.setDate(t.getDate()-e);const a=t.toLocaleDateString("de-DE"),n=t.toISOString(),r=20+e%30,i=Number((r*.5).toFixed(2));return{datum:a,dateIso:n,ersteller:`Seeder ${1+e%5}`,standort:`Test-Ort ${String.fromCharCode(65+e%6)}`,kultur:ci[e%ci.length],usageType:di[e%di.length],kisten:r,eppoCode:ui[e%ui.length],bbch:pi[e%pi.length],gps:`GPS-Notiz ${e}`,gpsCoordinates:{latitude:48+e%10*.01,longitude:11+e%10*.01},gpsPointId:`seed-gps-${e}`,invekos:`INV-${String(1e3+e).padStart(4,"0")}`,uhrzeit:`${String(6+e%12).padStart(2,"0")}:${String(e*7%60).padStart(2,"0")}`,savedAt:n,items:Vo(e,r,i)}}function Vo(e,t,a){return Wo.map((n,r)=>{const i=1+(e+r)%4*.05,l=Number((n.value*i).toFixed(4)),o=Number((l*t).toFixed(2));return{id:`seed-item-${e}-${r}`,name:n.name,unit:n.unit,methodLabel:n.methodLabel,methodId:n.methodId,value:l,total:o,inputs:{kisten:t,waterVolume:a},zulassungsnummer:n.zulassungsnummer,mediumId:n.mediumId}})}let qt=null,ga=null,fi=!1,gi=!1;async function Zo(){if(!("serviceWorker"in navigator))return console.warn("[PWA] Service Workers nicht unterstützt"),null;try{return ga=await navigator.serviceWorker.register("/psm/sw.js",{scope:"/psm/",updateViaCache:"none"}),console.log("[PWA] Service Worker registriert:",ga.scope),ga.addEventListener("updatefound",()=>{const e=ga?.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&(console.log("[PWA] Neues Update verfügbar"),ta("pwa:update-available"))})}),navigator.serviceWorker.addEventListener("message",Qo),fi||(fi=!0,navigator.serviceWorker.addEventListener("controllerchange",()=>{gi||(gi=!0,window.location.reload())})),ga}catch(e){return console.error("[PWA] Service Worker Registrierung fehlgeschlagen:",e),null}}function Qo(e){const{type:t,payload:a}=e.data||{};switch(t){case"DB_STATE":ta("pwa:db-state",a);break;case"CACHES_CLEARED":ta("pwa:caches-cleared");break}}async function Fn(e){if(!navigator.serviceWorker.controller){localStorage.setItem("psm-db-state",JSON.stringify({...e,updatedAt:new Date().toISOString()}));return}navigator.serviceWorker.controller.postMessage({type:"SET_DB_STATE",payload:e})}async function bs(){const e=localStorage.getItem("psm-db-state");if(e)try{return JSON.parse(e)}catch{}return navigator.serviceWorker?.controller?new Promise(t=>{const a=n=>{n.data?.type==="DB_STATE"&&(navigator.serviceWorker.removeEventListener("message",a),t(n.data.payload))};navigator.serviceWorker.addEventListener("message",a),navigator.serviceWorker.controller.postMessage({type:"GET_DB_STATE"}),setTimeout(()=>{navigator.serviceWorker.removeEventListener("message",a),t(null)},1e3)}):null}async function Jo(){const e=await bs();return!!(e?.hasDatabase&&e?.autoStartEnabled)}function Yo(){window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),qt=e,console.log("[PWA] Install Prompt verfügbar"),localStorage.getItem("psm-app-installed")==="true"&&(console.log("[PWA] Widerspruch erkannt: Flag sagt installiert, aber Prompt verfügbar"),localStorage.removeItem("psm-app-installed"),console.log("[PWA] Veraltetes Installations-Flag entfernt")),ta("pwa:install-available")}),window.addEventListener("appinstalled",()=>{qt=null,Hn(),console.log("[PWA] App installiert - Flag gesetzt"),ta("pwa:installed")})}function qn(){return qt!==null}function _t(){return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0}function Nr(){const e=navigator.userAgent.toLowerCase();return e.includes("edg/")?"edge":e.includes("chrome")&&!e.includes("edg")?"chrome":e.includes("firefox")?"firefox":e.includes("safari")&&!e.includes("chrome")?"safari":"other"}function Tr(){return!!(_t()||localStorage.getItem("psm-app-installed")==="true"||window.matchMedia("(display-mode: fullscreen)").matches||window.matchMedia("(display-mode: minimal-ui)").matches||window.matchMedia("(display-mode: window-controls-overlay)").matches)}async function hs(){if(Tr())return!0;try{if("getInstalledRelatedApps"in navigator){const e=await navigator.getInstalledRelatedApps();if(console.log("[PWA] getInstalledRelatedApps result:",e),e&&e.length>0)return Hn(),!0}}catch(e){console.warn("[PWA] getInstalledRelatedApps API Fehler:",e)}return!1}function Hn(){localStorage.setItem("psm-app-installed","true"),console.log("[PWA] App als installiert markiert")}function Xo(){localStorage.removeItem("psm-app-installed"),console.log("[PWA] Installations-Flag entfernt")}function vs(){const e=Nr(),t=_t(),a=Tr();return{canInstall:qn(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function ys(){const e=Nr(),t=_t(),a=await hs();return{canInstall:qn(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function el(){if(!qt)return console.warn("[PWA] Kein Install Prompt verfügbar"),!1;try{await qt.prompt();const{outcome:e}=await qt.userChoice;return console.log("[PWA] Install Prompt Ergebnis:",e),e==="accepted"&&Hn(),qt=null,e==="accepted"}catch(e){return console.error("[PWA] Install Prompt fehlgeschlagen:",e),!1}}function tl(e){if(!("launchQueue"in window)){console.log("[PWA] Launch Queue API nicht verfügbar");return}window.launchQueue?.setConsumer(async t=>{if(!t.files?.length){console.log("[PWA] Launch ohne Dateien");return}console.log("[PWA] Datei via Launch Queue empfangen:",t.files.length);for(const a of t.files)try{await e(a),await Fn({hasDatabase:!0,fileHandleName:a.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0});break}catch(n){console.error("[PWA] Fehler beim Öffnen der Datei:",n)}}),console.log("[PWA] File Handling initialisiert")}const zt="psm-file-handles",Fr="last-database";async function fr(e){try{const t=await qr(),n=t.transaction(zt,"readwrite").objectStore(zt);await new Promise((r,i)=>{const l=n.put({key:Fr,handle:e,savedAt:new Date().toISOString()});l.onsuccess=()=>r(),l.onerror=()=>i(l.error)}),t.close(),console.log("[PWA] FileHandle gespeichert"),await Fn({hasDatabase:!0,fileHandleName:e.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}catch(t){console.error("[PWA] FileHandle speichern fehlgeschlagen:",t)}}async function gr(){try{const e=await qr(),a=e.transaction(zt,"readonly").objectStore(zt),n=await new Promise((i,l)=>{const o=a.get(Fr);o.onsuccess=()=>i(o.result),o.onerror=()=>l(o.error)});if(e.close(),!n?.handle)return null;const r=n.handle;return typeof r.queryPermission=="function"&&await r.queryPermission({mode:"readwrite"})==="granted"?(console.log("[PWA] FileHandle mit Berechtigung geladen"),n.handle):(console.log("[PWA] FileHandle gefunden, aber Berechtigung erforderlich"),n.handle)}catch(e){return console.error("[PWA] FileHandle laden fehlgeschlagen:",e),null}}async function al(e){try{const t=e;return typeof t.requestPermission!="function"?(await e.getFile(),!0):await t.requestPermission({mode:"readwrite"})==="granted"}catch{return!1}}async function nl(){try{const e=await qr(),a=e.transaction(zt,"readwrite").objectStore(zt);await new Promise((n,r)=>{const i=a.delete(Fr);i.onsuccess=()=>n(),i.onerror=()=>r(i.error)}),e.close(),await Fn({hasDatabase:!1,autoStartEnabled:!1}),console.log("[PWA] FileHandle gelöscht")}catch(e){console.error("[PWA] FileHandle löschen fehlgeschlagen:",e)}}async function qr(){return new Promise((e,t)=>{const a=indexedDB.open("psm-file-handles",1);a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result),a.onupgradeneeded=n=>{const r=n.target.result;r.objectStoreNames.contains(zt)||r.createObjectStore(zt,{keyPath:"key"})}})}function ta(e,t){window.dispatchEvent(new CustomEvent(e,{detail:t}))}function ws(){return{serviceWorker:"serviceWorker"in navigator,fileSystemAccess:typeof window.showOpenFilePicker=="function",launchQueue:"launchQueue"in window,indexedDB:"indexedDB"in window,standalone:_t(),installAvailable:qn()}}async function rl(e){if(console.log("[PWA] Initialisierung..."),await Zo(),Yo(),e?.onFileOpened&&tl(e.onFileOpened),e?.onAutoStart&&await Jo()){const t=await gr();if(t){const a=t;let n=!1;if(typeof a.queryPermission=="function"&&(n=await a.queryPermission({mode:"readwrite"})==="granted"),n){console.log("[PWA] Auto-Start mit gespeicherter Datei"),e.onFileOpened&&await e.onFileOpened(t);return}console.log("[PWA] Auto-Start: Berechtigung für Datei erforderlich"),ta("pwa:permission-required",{handle:t})}}console.log("[PWA] Capabilities:",ws())}async function il(){if(console.group("🔧 PWA Debug Status"),console.log("📱 Standalone Mode:",_t()),console.log("💾 localStorage Flag:",localStorage.getItem("psm-app-installed")),console.log("🔔 Install Prompt verfügbar:",qn()),console.log("🌐 Browser:",Nr()),console.group("📺 Display Mode Checks"),console.log("standalone:",window.matchMedia("(display-mode: standalone)").matches),console.log("fullscreen:",window.matchMedia("(display-mode: fullscreen)").matches),console.log("minimal-ui:",window.matchMedia("(display-mode: minimal-ui)").matches),console.log("window-controls-overlay:",window.matchMedia("(display-mode: window-controls-overlay)").matches),console.log("browser:",window.matchMedia("(display-mode: browser)").matches),console.groupEnd(),console.group("🔍 getInstalledRelatedApps API"),"getInstalledRelatedApps"in navigator)try{const e=await navigator.getInstalledRelatedApps();console.log("Installierte Apps:",e)}catch(e){console.log("API Fehler:",e)}else console.log("API nicht verfügbar");console.groupEnd(),console.group("📊 Status Vergleich"),console.log("Sync (isProbablyInstalled):",Tr()),console.log("Async (checkIfInstalled):",await hs()),console.log("getInstallStatus():",vs()),console.log("getInstallStatusAsync():",await ys()),console.groupEnd(),console.log("💡 Tipp: clearInstalledFlag() zum Zurücksetzen des Flags"),console.groupEnd()}typeof window<"u"&&(window.pwaDebug=il,window.pwaClearFlag=Xo);let tn=!1;function sl(e){const t=r=>{if(tn){tn=!1;return}return r.preventDefault(),r.returnValue="",""};let a=!1;const n=r=>{const i=!!r.app?.hasDatabase;i&&!a?(window.addEventListener("beforeunload",t),a=!0):!i&&a&&(window.removeEventListener("beforeunload",t),a=!1)};n(e.getState()),e.subscribe(n),document.addEventListener("click",r=>{const i=r.target.closest("a");i&&i.target==="_blank"&&(tn=!0,setTimeout(()=>{tn=!1},100))})}function ol(){const e=document.getElementById("app-root");if(!e)throw new Error("app-root Container fehlt");return{startup:e.querySelector('[data-region="startup"]'),shell:e.querySelector('[data-region="shell"]'),main:e.querySelector('[data-region="main"]'),footer:e.querySelector('[data-region="footer"]')}}async function ll(){if(Xs()){window.location.replace("/psm/m/");return}ol(),eo();const e=is();e!=="memory"&&xt(e),await to();const t={state:{getState:W,patchState:Xr,updateSlice:Ze,subscribe:Sn},events:{emit:kn,subscribe:rt}};jo(t),ss(),sl(t.state),rl({onFileOpened:async a=>{const n=await Lt(()=>import("./index.B020-0f6.js").then(i=>i.aR),[]),r=await Lt(()=>import("./index.B020-0f6.js").then(i=>i.aQ),[]);if(r.isSupported()){n.setActiveDriver("sqlite");const i=await a.getFile(),l=await i.arrayBuffer(),o=await r.importFromArrayBuffer(l,i.name);await fr(a);const{applyDatabase:c}=await Lt(async()=>{const{applyDatabase:u}=await import("./index.B020-0f6.js").then(d=>d.aT);return{applyDatabase:u}},[]);c(o.data),kn("database:connected",{driver:"sqlite",autoStarted:!0})}}}),rt("database:connected",async a=>{await Fn({hasDatabase:!0,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}),rt("database:connected",async a=>{if(de()==="sqlite")try{await ao(),await os()}catch(n){console.warn("GPS-Punkte konnten beim Start nicht geladen werden",n)}}),Xr({app:{...W().app,ready:!0}})}const bi="__pflanzenschutz_bootstrapped__",hi=window;function vi(){ll().catch(e=>{console.error("bootstrap failed",e)})}hi[bi]||(hi[bi]=!0,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",vi,{once:!0}):vi());const xs=[{id:"start",label:"Start",icon:"bi-grid-1x2",sections:[{section:"dashboard",label:"Übersicht",icon:"bi-grid-1x2"}]},{id:"psm",label:"PSM",icon:"bi-flower1",sections:[{section:"calc",label:"Neu erfassen",icon:"bi-pencil-square"},{section:"documentation",label:"Übersicht",icon:"bi-list-ul"},{section:"lager",label:"Lager",icon:"bi-box-seam"},{section:"settings",label:"Einstellungen",icon:"bi-gear"}]},{id:"acker",label:"Acker-Planer",icon:"bi-map",sections:[{section:"acker",label:"Karte",icon:"bi-map"},{section:"kultur",label:"Kulturführung",icon:"bi-clipboard2-pulse"}]},{id:"fotos",label:"Fotos",icon:"bi-camera",sections:[{section:"fotos",label:"Fotos",icon:"bi-camera"}]},{id:"daten",label:"Daten",icon:"bi-database",sections:[{section:"daten",label:"Import",icon:"bi-cloud-upload"}]}],ks={dashboard:"start",calc:"psm",documentation:"psm",lager:"psm",history:"psm",report:"psm",acker:"acker",kultur:"acker",fotos:"fotos",settings:"psm",gps:"psm",lookup:"psm",import:"daten",daten:"daten"};function Ss(e){return xs.find(t=>t.id===e)}function cl(e){const t=ks[e];return t?Ss(t):void 0}function dl(){const e=document.getElementById("offline-indicator");if(!e)return;const t=()=>{const a=!navigator.onLine;e.classList.toggle("d-none",!a)};t(),window.addEventListener("online",t),window.addEventListener("offline",t)}function yi(e){W().app.activeSection!==e&&(Ze("app",t=>({...t,activeSection:e})),kn("app:sectionChanged",e))}function wi(){dl();const e=document.querySelectorAll(".nav-btn[data-area]"),t=document.getElementById("brand-link"),a=document.getElementById("topnav-tabs"),n=document.getElementById("topnav-area-icon"),r=document.getElementById("topnav-area-label"),i={};for(const g of xs)i[g.id]=g.sections[0].section;let l=null;function o(g,k){if(a){if(g.sections.length<=1){a.innerHTML="";return}a.innerHTML=g.sections.map(S=>`
        <button type="button" class="topnav-tab${S.section===k?" active":""}" data-section="${S.section}">
          <i class="bi ${S.icon}"></i><span>${S.label}</span>
        </button>`).join("")}}function c(g){a&&a.querySelectorAll(".topnav-tab").forEach(k=>{k.classList.toggle("active",k.dataset.section===g)})}const u=g=>{const k=Ss(g);!k||!W().app.hasDatabase||yi(i[g]??k.sections[0].section)};e.forEach(g=>{g.addEventListener("click",()=>{const k=g.dataset.area;k&&u(k)})}),t?.addEventListener("click",g=>{g.preventDefault(),u("start")}),a?.addEventListener("click",g=>{const S=g.target?.closest(".topnav-tab")?.dataset.section;S&&yi(S)});const d=document.querySelector('.nav-btn[data-action="share-data"]');d?.addEventListener("click",()=>{d.disabled=!0,Lt(async()=>{const{shareMobileData:g}=await import("./index.tuviIcDV.js");return{shareMobileData:g}},__vite__mapDeps([0,1])).then(({shareMobileData:g})=>g()).catch(g=>console.error("Teilen fehlgeschlagen",g)).finally(()=>{d.disabled=!1})}),no(),rt("history:data-changed",g=>{if(!document.body.classList.contains("mobile-mode"))return;const k=g?.type;(k==="created"||k==="created-bulk")&&ro()});const p=g=>{const k=document.getElementById("brand-title"),S=document.getElementById("brand-tagline"),A=document.getElementById("app-version");k&&g.company.name&&(k.textContent=g.company.name),S&&g.company.headline&&(S.textContent=g.company.headline),A&&g.app.version&&(A.textContent=`v${g.app.version}`);const M=g.app.hasDatabase,Z=g.app.activeSection,j=cl(Z);j&&ks[Z]===j.id&&(i[j.id]=Z),e.forEach(me=>{me.disabled=!M;const N=M&&j?.id===me.dataset.area;me.classList.toggle("active",!!N)}),j&&(n&&(n.className=`bi ${j.icon} topnav-area-icon`),r&&(r.textContent=j.label),l!==j.id?(o(j,Z),l=j.id):c(Z))};Sn(p),p(W());let m=!1;const y=document.title||"Pflanzenschutz";window.addEventListener("beforeprint",()=>{m||(m=!0,document.title=" ")}),window.addEventListener("afterprint",()=>{m&&(m=!1,document.title=y)})}function ul(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",wi,{once:!0}):wi()}ul();const pl="https://api.digitale-psm.de",ml="digitale-psm.de";async function fl(e){try{const t=await fetch(`${pl}/api/v1/${ml}/views/${e}`,{method:"POST",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`API error: ${t.status}`);return(await t.json()).views}catch(t){return console.warn("[ViewCounter] Fehler beim Zählen:",t),null}}function gl(e){return e>=1e6?(e/1e6).toFixed(1).replace(".",",")+"M":e>=1e3?(e/1e3).toFixed(1).replace(".",",")+"K":e.toString()}const br="pflanzenschutz-datenbank.json";let xi=!1;function bl(e){return e?`${e.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"pflanzenschutz-datenbank"}.json`:br}async function ba(e,t){if(!e){await t();return}const a=e.textContent??"";e.disabled=!0,e.dataset.busy="true",e.textContent="Bitte warten...";try{await t()}finally{e.disabled=!1,e.dataset.busy="false",e.textContent=a}}function ki(e){return f(e)}function hl(e){const t=document.createElement("section");t.className="section-container d-none",t.innerHTML=`
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
                <input class="form-control" id="wizard-company-name" name="wizard-company-name" required value="${ki(e.name)}" placeholder="z.B. Gärtnerei Müller" />
              </div>
              <div class="col-md-6">
                <label class="form-label d-block mb-2" for="wizard-company-headline">
                  Überschrift <span class="text-muted small">(optional)</span>
                </label>
                <input class="form-control" id="wizard-company-headline" name="wizard-company-headline" value="${ki(e.headline)}" placeholder="z.B. Pflanzenschutz-Dokumentation 2025" />
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-12">
                <label class="form-label d-block mb-2" for="wizard-company-address">
                  Adresse <span class="text-muted small">(optional)</span>
                </label>
                <textarea class="form-control" id="wizard-company-address" name="wizard-company-address" rows="2" placeholder="Straße, PLZ Ort">${f(e.address)}</textarea>
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
  `;const a=t.querySelector("#database-wizard-form");if(!a)throw new Error("Wizard-Formular konnte nicht erzeugt werden");const n=t.querySelector('[data-role="wizard-result"]');if(!n)throw new Error("Wizard-Resultat-Container fehlt");return{section:t,form:a,resultCard:n,preview:t.querySelector('[data-role="wizard-preview"]'),filenameLabel:t.querySelector('[data-role="wizard-filename"]'),saveHint:t.querySelector('[data-role="wizard-save-hint"]'),saveButton:t.querySelector('[data-action="wizard-save"]'),reset(){a.reset(),n.classList.add("d-none");const r=t.querySelector('[data-role="wizard-preview"]');r&&(r.textContent="");const i=t.querySelector('[data-role="wizard-filename"]');i&&(i.textContent="")}}}function vl(e,t){if(!e||xi)return;const a=e;let n=null,r=br,i="landing";const o=t.state.getState().company,c=document.createElement("section");c.className="section-container";function u(B,L){const z=B;c.innerHTML=`
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
  `}u(!1,_t());const d=hl(o);a.innerHTML="",a.appendChild(c),a.appendChild(d.section);const p=typeof window<"u"&&typeof window.showSaveFilePicker=="function";d.saveButton&&(p?d.saveHint&&(d.saveHint.textContent='Der Browser fragt nach einem Speicherort. Die erzeugte Datei kannst du später über "Bestehende Datei verbinden" erneut laden.'):(d.saveButton.disabled=!0,d.saveButton.textContent="Datei speichern (nicht verfügbar)",d.saveHint&&(d.saveHint.textContent="Dieser Browser unterstützt keinen direkten Dateidialog. Bitte nutze einen Chromium-basierten Browser (z. B. Chrome, Edge) über HTTPS oder http://localhost.")));function m(B=t.state.getState()){const L=!!B.app?.hasDatabase;if(a.classList.toggle("d-none",L),L){c.classList.add("d-none"),d.section.classList.add("d-none");return}i==="wizard"?(c.classList.add("d-none"),d.section.classList.remove("d-none")):(c.classList.remove("d-none"),d.section.classList.add("d-none"))}async function y(B){await ba(B,async()=>{try{const L=de();L==="sqlite"||L==="filesystem"?xt(L):xt("filesystem")}catch(L){throw T.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),L instanceof Error?L:new Error("Dateisystem nicht verfügbar")}try{const L=await io();en(L.data);const z=L.context;z?.fileHandle&&await fr(z.fileHandle),t.events.emit("database:connected",{driver:de()})}catch(L){console.error("Fehler beim Öffnen der Datenbank",L),T.error(L instanceof Error?L.message:"Öffnen der Datenbank fehlgeschlagen")}})}function g(B){ba(B,async()=>{const L=ei(),z=["localstorage","sqlite","memory"];for(const re of z)try{xt(re);const ue=await ti(L);en(ue.data),t.events.emit("database:connected",{driver:de()||re});return}catch(ue){console.warn(`Treiber ${re} konnte nicht initialisiert werden`,ue)}const V="Keine geeignete Speicheroption verfügbar. Bitte Browserberechtigungen prüfen.";console.error(V),T.error(V)})}async function k(B){if(!n){T.warning("Bitte erst die Datenbank erzeugen.");return}await ba(B,async()=>{try{const L=de();L==="sqlite"||L==="filesystem"?xt(L):xt("filesystem")}catch(L){throw T.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),L instanceof Error?L:new Error("Dateisystem nicht verfügbar")}try{const L=await ti(n);en(L.data),t.events.emit("database:connected",{driver:de()})}catch(L){console.error("Fehler beim Speichern der Datenbank",L),T.error(L instanceof Error?L.message:"Die Datei konnte nicht gespeichert werden")}})}function S(B){B.preventDefault();const L=new FormData(d.form),z=(L.get("wizard-company-name")||"").toString().trim();if(!z){T.warning("Bitte einen Firmennamen angeben.");return}const V=(L.get("wizard-company-headline")||"").toString().trim(),re=(L.get("wizard-company-address")||"").toString().trim();n=ei({meta:{company:{name:z,headline:V,logoUrl:"",contactEmail:"",address:re}}}),r=bl(z),d.preview.textContent=JSON.stringify(n,null,2),d.filenameLabel.textContent=r,d.resultCard.classList.remove("d-none"),d.resultCard.scrollIntoView({behavior:"smooth",block:"start"})}function A(){i="landing",n=null,r=br,d.reset(),m()}function M(){i="wizard",m()}async function Z(B){await ba(B,async()=>{try{const L=await gr();if(!L){T.warning("Keine gespeicherte Datei gefunden.");return}if(!await al(L)){T.warning("Berechtigung zum Zugriff auf die Datei wurde verweigert.");return}xt("sqlite");const V=await L.getFile(),re=await V.arrayBuffer(),ue=await so(re,V.name);oo(L),en(ue.data),await fr(L),t.events.emit("database:connected",{driver:"sqlite",autoStarted:!0}),T.success("Datenbank erfolgreich geladen!")}catch(L){console.error("Auto-Start fehlgeschlagen:",L),T.error(L instanceof Error?L.message:"Fehler beim Laden der gespeicherten Datei")}})}async function j(){await nl();const B=c.querySelector("#auto-start-banner");B&&B.classList.add("d-none"),T.info("Gespeicherte Datei wurde vergessen.")}async function me(B){await ba(B,async()=>{if(await el()){T.success("App wird installiert!");const z=c.querySelector("#pwa-install-banner");z&&z.classList.add("d-none")}})}if(c.addEventListener("click",B=>{const L=B.target?.closest("button[data-action]");if(!L)return;const z=L.dataset.action;if(z==="start-wizard"){M();return}z==="open"?y(L):z==="useDefaults"?g(L):z==="auto-start"?Z(L):z==="auto-start-forget"?j():z==="install-pwa"&&me(L)}),d.form.addEventListener("submit",S),d.section.addEventListener("click",B=>{const L=B.target?.closest("[data-action]");if(!L)return;const z=L.dataset.action;if(z==="wizard-back"){A();return}z==="wizard-save"&&k(L)}),t.state.subscribe(B=>m(B)),m(t.state.getState()),!t.state.getState().app.hasDatabase){const B=is();if(B&&B!==de())try{xt(B)}catch(L){console.warn("Bevorzugter Speicher konnte nicht gesetzt werden",L)}}(async()=>{const B=await gr(),L=await bs(),z=!!(B&&L?.hasDatabase),V=_t();u(z,V);const re=c.querySelector('[data-role="view-count"]');if(re&&fl("app").then(ge=>{ge!==null&&(re.textContent=gl(ge))}),z&&B){const ge=c.querySelector('[data-role="auto-start-filename"]');ge&&(ge.textContent=`Datei: ${B.name}`)}N(),window.addEventListener("pwa:install-available",()=>{N()}),window.addEventListener("pwa:installed",()=>{Hn(),N()}),window.addEventListener("pwa:permission-required",async ge=>{const qe=ge.detail?.handle;if(qe){const ke=c.querySelector("#auto-start-banner"),Rt=c.querySelector('[data-role="auto-start-filename"]');ke&&Rt&&(Rt.textContent=`Datei: ${qe.name} (Berechtigung erforderlich)`,ke.classList.remove("d-none"))}}),console.log("[Startup] PWA Capabilities:",ws());const ue=await ys();console.log("[Startup] PWA Install Status (async):",ue),ne(ue)})();function N(){const B=vs();ne(B)}function ne(B){const L=c.querySelector("#pwa-install-banner"),z=c.querySelector('[data-role="pwa-content"]');if(!(!L||!z)){if(!B.showBanner){L.classList.add("d-none");return}L.classList.remove("d-none"),B.isInstalled?z.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-check-circle text-success me-1"></i>App ist bereits installiert
        </p>
        <p class="small mb-0" style="color: var(--text-muted);">
          Öffne die App über dein Desktop- oder Startmenü-Symbol für die beste Erfahrung.
        </p>
      `:B.canInstall?z.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-download me-1"></i>Für schnelleren Zugriff als App installieren
        </p>
        <button class="btn btn-sm btn-outline-light" data-action="install-pwa">
          <i class="bi bi-download me-1"></i>App installieren
        </button>
      `:L.classList.add("d-none")}}xi=!0}function Es(e){let t=!1,a=!1;const n=o=>{e.onStatusChange&&e.onStatusChange(o)},r=()=>{t||!a||W().app.activeSection!==e.section||e.shouldRefresh&&!e.shouldRefresh()||(a=!1,n("refreshing"),Promise.resolve(e.onRefresh()).catch(c=>{console.error("Auto-Refresh konnte nicht ausgeführt werden",c),a=!0,n("stale")}).finally(()=>{!t&&!a&&n("idle")}))},i=rt(e.event,()=>{e.shouldHandleEvent&&!e.shouldHandleEvent()||(a=!0,n("stale"),r())}),l=rt("app:sectionChanged",o=>{o===e.section&&(a?r():n("idle"))});return W().app.activeSection===e.section&&n("idle"),()=>{t=!0,i(),l()}}const yl={prev:"Zurück",next:"Weiter",loading:"Lädt …",empty:"Keine Einträge verfügbar"};function Si(){const e=document.createElement("span");return e.className="spinner-border spinner-border-sm",e.setAttribute("role","status"),e.setAttribute("aria-hidden","true"),e}function Ei(e){const t=document.createElement("div");return t.className="pager-widget__info text-muted small text-center flex-grow-1",t.textContent=e?.trim()||"",t}function _a(e,t){if(!e)return null;const a=document.createElement("div");a.className="pager-widget d-flex flex-column gap-2",e.innerHTML="",e.appendChild(a);let n={status:"hidden"},r=!1;const i={...yl,...t.labels||{}};function l(){a.replaceChildren()}function o(p){const m=Ei(p.info||i.empty);a.replaceChildren(m)}function c(p){const m=document.createElement("div");m.className="alert alert-danger mb-0",m.textContent=p.message||"Unbekannter Fehler",a.replaceChildren(m)}function u(p){const m=document.createElement("div");m.className="pager-widget__controls d-flex flex-column flex-md-row gap-2 align-items-stretch";const y=document.createElement("button");y.type="button",y.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",y.disabled=!p.canPrev||p.loadingDirection==="prev",y.textContent=i.prev,p.loadingDirection==="prev"&&y.prepend(Si()),y.addEventListener("click",()=>{y.disabled||t.onPrev()});const g=document.createElement("button");g.type="button",g.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",g.disabled=!p.canNext||p.loadingDirection==="next",g.textContent=i.next,p.loadingDirection==="next"&&g.append(Si()),g.addEventListener("click",()=>{g.disabled||t.onNext()});const k=Ei(p.info||(p.canPrev||p.canNext?i.loading:i.empty));m.append(y,k,g),a.replaceChildren(m)}function d(p){switch(p.status){case"hidden":l();break;case"disabled":o(p);break;case"error":c(p);break;case"ready":u(p);break;default:l();break}}return{update(p){r||(n=p,d(p))},destroy(){r||(r=!0,a.replaceChildren(),e.innerHTML="")},getState(){return n}}}const Hr=new Set;let Li=!1;function wl(){return typeof window>"u"?null:window.__PSL?.debugOverlayApi??null}function Ls(){Li||typeof window>"u"||(Li=!0,window.addEventListener("psl:debug-overlay-ready",()=>{Hr.forEach(e=>{Or(e)})}))}function Or(e){const t=wl();t?.registerProvider&&(e.handle||(e.handle=t.registerProvider(e.config)),e.handle.update(e.lastMetrics??null))}function Ds(e){const t={config:e,handle:null,lastMetrics:null};return Hr.add(t),Ls(),Or(t),t}function $s(e,t){e.lastMetrics=t,Hr.add(e),Ls(),Or(e)}function As(e){if(e==null)return 0;try{const t=JSON.stringify(e);return t?Number((t.length/1024).toFixed(1)):0}catch{return null}}const Di=5e3,$i=50,_r=50,pn=3;function Xn(e){if(e==null||e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function xl(e){if(!e)return null;const t=Xn(e.areaHa);if(t!==null)return t;const a=Xn(e.areaAr);if(a!==null)return a/100;const n=Xn(e.areaSqm);return n!==null?n/1e4:null}function kl(e,t="–"){const a=xl(e);return a===null?t:wo(a,2,t)}function Sl(e){return e.toISOString().slice(0,10)}function Dn(e){if(!e)return;if(/^\d{4}-\d{2}-\d{2}$/.test(e))return e;const t=new Date(e);if(!Number.isNaN(t.getTime()))return Sl(t)}function Ai(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function Rr(){return{startDate:"",endDate:""}}function zs(e,t){if(!e)return;const a=e.querySelector("#doc-start"),n=e.querySelector("#doc-end");a&&t.startDate&&(a.value=t.startDate),n&&t.endDate&&(n.value=t.endDate)}function El(e,t="sqlite"){if(typeof e=="string")return e.includes(":")?e:/^\d+$/.test(e)?Jt(t,Number(e)):e;if(typeof e=="number")return Jt(t,e);if(e&&typeof e=="object"){const a=e.source||t;if(typeof e.ref=="string"&&e.ref.includes(":"))return e.ref;const n=Number(e.ref);if(!Number.isNaN(n))return Jt(a,n)}return null}function Ll(e){const t=new Set;return e?.length&&e.forEach(a=>{const n=El(a);n&&t.add(n)}),t}function Ps(e){const t=e.querySelector('[data-role="doc-focus-banner"]'),a=e.querySelector('[data-role="doc-focus-text"]');if(!t||!a)return;if(!$t){t.classList.add("d-none");return}const n=U.startDate&&U.endDate?`${U.startDate} - ${U.endDate}`:"Aktuelle Filter",r=$t.label||"Importierter Zeitraum",i=$t.highlightEntryIds.size,l=i?` (${i} markiert)`:"";a.textContent=`${r}: ${n}${l}`,t.classList.remove("d-none")}function Dl(e,t){const a=e.querySelector('[data-role="doc-refresh-indicator"]');if(a){if(a.classList.remove("alert-info","alert-warning"),t==="idle"){a.classList.add("d-none");return}a.classList.remove("d-none"),t==="stale"?(a.classList.add("alert-warning"),a.textContent="Neue Dokumentationseinträge verfügbar. Ansicht aktualisiert sich beim Öffnen."):(a.classList.add("alert-info"),a.textContent="Aktualisiere Dokumentation...")}}function er(e,t,a={}){$t&&($t=null,$a=null,Ps(e),a.refreshList&&Pt(e,t.state.getState().fieldLabels))}function $l(e,t){if(!$a)return;const a=Ht($a);a&&($a=null,Ts(e,a,t))}function Al(e,t,a){if(!a)return;const n=Dn(a.startDate),r=Dn(a.endDate),i=!!a.entryIds?.length;if(!n&&!r&&!i)return;U={...U,...n?{startDate:n}:{},...r?{endDate:r}:{}},a.creator!==void 0&&(U={...U,creator:a.creator||void 0}),a.crop!==void 0&&(U={...U,crop:a.crop||void 0});const l=Ll(a.entryIds);$t={label:a.label,reason:a.reason,startDate:U.startDate,endDate:U.endDate,highlightEntryIds:l},$a=a.autoSelectFirst&&l.size?l.values().next().value??null:null;const o=e.querySelector("#doc-filter");zs(o,U),Ps(e),hr=!0,kt(e,t.state.getState()).finally(()=>{hr=!1})}function zl(){if(typeof window>"u")return{enabled:!1,count:an};try{const e=new URLSearchParams(window.location.search);if(!e.has("seedHistory"))return{enabled:!1,count:an};const t=e.get("seedHistory"),a=t?Number(t):Number.NaN;return{enabled:!0,count:Number.isFinite(a)&&a>0?Math.min(Math.round(a),Pl):an}}catch(e){return console.warn("seedHistory Parameter konnte nicht gelesen werden",e),{enabled:!1,count:an}}}const it=25,zi=4,tr=new Intl.NumberFormat("de-DE"),an=200,Pl=2e3,aa=zl();let Pi=!1,De="memory",U=Rr(),Be=0,pe=[],mt=[],ae=0;const nt=new Map,Ue=new Map([[0,null]]),Re=new Set,Dt=new Map,Qt=new Map;let Oe=!1,ha=null,va=0,$t=null,hr=!1,$a=null,$n=!1,mn="",An=!1,nn=null,rn=null,Mi=null,Ie=0,sn=null,Ci=null,at=null,Aa=!1,Ii=null;const Ml=Ds({id:"documentation",label:"Documentation",budget:{initialLoad:50,maxItems:150}});let Ms=null;function ra(e){return e.app?.storageDriver||de()}function Jt(e,t){return`${e}:${t}`}function Kr(e){const t={},a=Ai(e.startDate,"start"),n=Ai(e.endDate,"end");return a&&(t.startDate=a),n&&(t.endDate=n),e.creator&&(t.creator=e.creator),e.crop&&(t.crop=e.crop),t}function Cl(e,t){return{id:Jt("state",t),entry:e,source:"state",ref:t}}function Il(e){const t=Number(e?.id??e?.historyId??0),a={...e};return delete a.id,{id:Jt("sqlite",t),entry:a,source:"sqlite",ref:t}}function Bl(){return De==="memory"?pe.length:Be>0?Be:ae*it+pe.length||null}function Nl(){const e=[];if(Oe&&e.push("Lädt …"),at&&e.push("Fehler"),$t&&e.push("Fokus aktiv"),De==="sqlite"&&Ue.get(ae+1)&&e.push("Weitere Seiten verfügbar"),!!e.length)return e.join(" · ")}function Tl(){const e={items:pe.length,totalCount:Bl(),cursor:De==="sqlite"?`Seite ${ae+1}`:null,payloadKb:As(mt.map(t=>t.entry)),lastUpdated:Ms,note:Nl()};$s(Ml,e)}function Ht(e){return pe.find(t=>t.id===e)}function On(e){const t=e.querySelector('[data-role="archive-form"]');if(!t)return;const a=t.querySelector('input[name="archive-start"]'),n=t.querySelector('input[name="archive-end"]');a&&(a.value=U.startDate||""),n&&(n.value=U.endDate||"")}function Ae(e,t,a="info"){const n=e.querySelector('[data-role="archive-status"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a}`,n.textContent=t,n.classList.remove("d-none")}}function vr(e,t){const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(!a)return;const r=!a.classList.contains("d-none"),i=typeof t=="boolean"?t:!r;a.classList.toggle("d-none",!i),n&&(n.textContent=i?"Archiv-Eingaben ausblenden":"Archiv erstellen"),i&&On(e)}function Fl(e){const t=e.querySelector('input[name="archive-start"]'),a=e.querySelector('input[name="archive-end"]');if(!t?.value||!a?.value)return null;const n=e.querySelector('input[name="archive-storage"]'),r=e.querySelector('textarea[name="archive-note"]'),i=e.querySelector('input[name="archive-remove"]');return{startDate:t.value,endDate:a.value,storageHint:n?.value.trim()||void 0,note:r?.value.trim()||void 0,removeAfterExport:i?i.checked:!0}}function Wr(e,t){const a=e.querySelector('[data-action="archive-toggle"]'),n=e.querySelector('[data-action="archive-submit"]'),r=e.querySelector('[data-role="archive-form"]'),i=e.querySelector('[data-role="archive-driver-hint"]'),l=ra(t)==="sqlite"&&!!t.app?.hasDatabase;a&&(a.disabled=!l||$n),n&&(n.disabled=!l||$n),!l&&r&&r.classList.add("d-none"),i&&(i.textContent=l?"Lokale SQLite-Datenbank aktiv":"Nur mit SQLite verfügbar",i.className=`badge ${l?"bg-success":"bg-secondary"}`),l?jr():An=!1}function Bi(e,t){$n=t;const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(a&&a.querySelectorAll("input, textarea, button").forEach(r=>{if(r.dataset.action==="archive-cancel"&&t){r.setAttribute("disabled","disabled");return}t?r.setAttribute("disabled","disabled"):r.removeAttribute("disabled")}),n&&(n.disabled=t||n.disabled,!t)){const r=W();n.disabled=ra(r)!=="sqlite"||!r.app?.hasDatabase}}function ql(e,t){const a=n=>n?n.replace(/[^0-9-]/g,""):"unbekannt";return`pflanzenschutz-archiv-${a(e)}_${a(t)}.zip`}function Hl(e){let t=[];return Ze("archives",a=>{const n=Array.isArray(a?.logs)?a.logs:[];return t=[e,...n].slice(0,_r),{...a||{logs:[]},logs:t}}),t}async function jr({force:e=!1}={}){if(nn){if(await nn,!e)return}else if(An&&!e)return;const t=W();if(ra(t)!=="sqlite"||!t.app?.hasDatabase)return;const n=(async()=>{try{const r=await lo({limit:_r});Ze("archives",i=>({...i&&typeof i=="object"?i:{logs:[]},logs:r.items})),An=!0}catch(r){console.warn("Archive logs could not be loaded",r)}})();nn=n;try{await n}finally{nn=null}}async function Ol(e,t){const a=ra(W());if(Hl(e),a!=="sqlite"){console.warn("Archive logs require SQLite. Changes stored in memory only.");return}try{const n={...e,metadata:t??void 0};await go(n),await Ve()}catch(n){console.error("Archive log could not be persisted",n),An=!1}finally{await jr({force:!0})}}function yr(e){return!Array.isArray(e)||!e.length?"[]":e.map(t=>`${t.id}:${t.archivedAt}:${t.entryCount}`).join("|")}function _l(e){return e?Ca(e)||e.slice(0,16).replace("T"," "):"-"}function Ba(e,t,a={}){const n=e.querySelector('[data-role="archive-log-list"]');if(!n)return;const r=Array.isArray(t)?t:[];a.resetPage!==!1&&(Ie=0);const i=Ql(r);if(!i.total){n.innerHTML='<div class="text-muted small">Noch keine Archive erstellt.</div>',Fi(e,i);return}const l=i.items.map(o=>{const c=_l(o.archivedAt),u=`${o.startDate||"-"} – ${o.endDate||"-"}`,d=o.entryCount===1?"Eintrag":"Einträge";return`
        <div class="list-group-item border rounded mb-2 p-3" data-action="archive-log-focus" data-log-id="${o.id}" style="cursor: pointer;">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="fs-5 fw-bold mb-1">${f(u)}</div>
              <div class="text-muted">${o.entryCount} ${d} · Erstellt ${f(c)}</div>
            </div>
            <i class="bi bi-chevron-right text-muted fs-4"></i>
          </div>
        </div>
      `}).join("");n.innerHTML=`<div class="list-group list-group-flush">${l}</div>`,Fi(e,i)}function Ni(e,t){const a=e.archives?.logs;if(Array.isArray(a))return a.find(n=>n.id===t)}async function Rl(e){if(e){if(typeof navigator<"u"&&navigator.clipboard&&typeof navigator.clipboard.writeText=="function"){await navigator.clipboard.writeText(e);return}if(typeof document<"u"){const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select(),document.execCommand("copy"),document.body.removeChild(t)}}}async function Ra(e){if(Qt.has(e.id))return Qt.get(e.id);let t=null;if(e.source==="sqlite")try{t=await bo(e.ref)}catch(a){console.error("History entry fetch failed",a)}else{const a=_e(W().history);t=(typeof e.ref=="number"?a[e.ref]:void 0)||e.entry}return t&&Qt.set(e.id,t),t}function Cs(e){return e&&(e.datum||Ca(e.dateIso)||(typeof e.date=="string"?e.date:""))||""}function Kl(e){if(e?.gpsCoordinates){const t=yo(e.gpsCoordinates);if(t)return t}return""}function Wl(e){return e?.gps||""}function wr(e){if(!e)return null;if(e.dateIso){const n=us(e.dateIso);if(n)return new Date(n.getFullYear(),n.getMonth(),n.getDate())}const t=typeof e.datum=="string"&&e.datum||typeof e.date=="string"&&e.date||null;if(!t)return null;const a=t.split(".");if(a.length===3){const[n,r,i]=a.map(Number);if(!Number.isNaN(n)&&!Number.isNaN(r)&&!Number.isNaN(i))return new Date(i,r-1,n)}return null}function jl(e,t){const a=wr(e);if(t.startDate){const r=new Date(t.startDate);if(r.setHours(0,0,0,0),!a||a<r)return!1}if(t.endDate){const r=new Date(t.endDate);if(r.setHours(23,59,59,999),!a||a>r)return!1}const n=[["creator",e.ersteller],["crop",e.kultur]];for(const[r,i]of n){const o=t[r]?.trim().toLowerCase();if(o&&!`${i||""}`.toLowerCase().includes(o))return!1}return!0}function Gr(e){if(!e)return"";const t=r=>r==null?"":String(r),n=(Array.isArray(e.items)?e.items:[]).map(r=>{const i=Object.keys(r).sort().reduce((l,o)=>(l[o]=r[o],l),{});return JSON.stringify(i)}).sort();return JSON.stringify({savedAt:t(e.savedAt),dateIso:t(e.dateIso),datum:t(e.datum),ersteller:t(e.ersteller),standort:t(e.standort),kultur:t(e.kultur),usageType:t(e.usageType),eppoCode:t(e.eppoCode),invekos:t(e.invekos),bbch:t(e.bbch),gps:t(e.gps),gpsPointId:t(e.gpsPointId),areaHa:e.areaHa??null,areaAr:e.areaAr??null,areaSqm:e.areaSqm??null,kisten:e.kisten??null,itemHashes:n})}function Is(e){e.size&&Ze("history",t=>{const a=Ha(t);if(!a.items.length)return a;let n=!1;const r=a.items.filter(i=>{const l=Gr(i);return e.has(l)?(n=!0,!1):!0});return n?{...a,items:r,totalCount:Math.min(a.totalCount,r.length),lastUpdatedAt:new Date().toISOString()}:a})}function Gl(e){return e.slice().sort((t,a)=>{const n=wr(t.entry)?.getTime()||new Date(t.entry.savedAt||0).getTime();return(wr(a.entry)?.getTime()||new Date(a.entry.savedAt||0).getTime())-n})}function Ti(){return De==="sqlite"?Be>0?Math.max(Math.ceil(Be/it),1):Math.max(ae+1,nt.size||0):pe.length?Math.max(Math.ceil(pe.length/it),1):0}function Bs(){if(De==="sqlite"){const t=Math.max(Ti()-1,0);return ae>t&&(ae=t),ae<0&&(ae=0),ae*it}if(!pe.length)return ae=0,0;const e=Math.max(Ti()-1,0);return ae>e&&(ae=e),ae<0&&(ae=0),ae*it}function _n(){if(!pe.length){mt=[];return}if(De==="sqlite"){mt=pe.slice();return}const e=Bs(),t=Math.min(e+it,pe.length);mt=pe.slice(e,t)}function Ul(e){if(nt.size<=zi)return;const t=Array.from(nt.keys()).sort((a,n)=>{const r=Math.abs(a-e);return Math.abs(n-e)-r});for(;nt.size>zi&&t.length;){const a=t.shift();a==null||a===e||nt.delete(a)}}function Vl(e){const t=e.querySelector('[data-role="doc-pager"]');return t?((!rn||Mi!==t)&&(rn?.destroy(),rn=_a(t,{onPrev:()=>Xl(e),onNext:()=>ec(e),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Dokumentation...",empty:"Keine Einträge"}}),Mi=t),rn):null}function Zl(e){const t=e.querySelector('[data-role="archive-log-pager"]');return t?((!sn||Ci!==t)&&(sn?.destroy(),sn=_a(t,{onPrev:()=>Jl(e),onNext:()=>Yl(e),labels:{prev:"Zurück",next:"Weiter",loading:"Archive werden geladen...",empty:"Keine Einträge"}}),Ci=t),sn):null}function Ql(e){const t=e.length;if(!t)return Ie=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/pn),1);Ie>=a&&(Ie=a-1),Ie<0&&(Ie=0);const n=Ie*pn,r=Math.min(n+pn,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function Fi(e,t){const a=Zl(e);if(a){if(!t.total){a.update({status:"disabled",info:"Noch keine Archive"});return}a.update({status:"ready",info:`Einträge ${t.start+1}–${t.end} von ${t.total}`,canPrev:Ie>0,canNext:t.end<t.total})}}function Jl(e){if(Ie===0)return;Ie=Math.max(Ie-1,0);const t=W().archives?.logs??[];Ba(e,t,{resetPage:!1})}function Yl(e){const t=W().archives?.logs??[],a=t.length;if(!a)return;const n=Math.max(Math.ceil(a/pn),1);Ie>=n-1||(Ie=Math.min(Ie+1,n-1),Ba(e,t,{resetPage:!1}))}function fn(e){const t=Vl(e);if(!t)return;if(at){t.update({status:"error",message:at});return}const a=De==="memory"?pe.length:Be,n=mt.length;if(!n){const u=Oe?"Lade Dokumentation...":"Keine Einträge vorhanden.";t.update({status:"disabled",info:u});return}const r=De==="sqlite"?ae*it:Bs(),i=`Einträge ${tr.format(r+1)}–${tr.format(r+n)}${a?` von ${tr.format(a)}`:""}`,l=De==="memory"?r+n<pe.length:!!Ue.get(ae+1),o=!Oe&&l,c=ae>0&&!Oe;t.update({status:"ready",info:i,canPrev:c,canNext:o,loadingDirection:Oe&&l?"next":null})}function xr(e){if(!aa.enabled)return;const t=e.querySelector('[data-action="doc-seed"]');t&&(t.disabled=Aa,t.textContent=Aa?"Dummy-Daten werden erstellt...":`+ ${aa.count} Dummy-Einträge`)}function Xl(e){if(ae===0||Oe)return;const t=Math.max(ae-1,0);if(De==="sqlite"){Ur(e,W().fieldLabels,t);return}ae=t,_n(),Pt(e,W().fieldLabels),Ta(e,W().fieldLabels)}function ec(e){if(Oe)return;const t=ae+1;if(De==="sqlite"){const n=nt.has(t),r=Ue.get(t);if(!n&&!r)return;Ur(e,W().fieldLabels,t);return}t*it<pe.length&&(ae=t,_n(),Pt(e,W().fieldLabels),Ta(e,W().fieldLabels))}function Na(e){Re.clear(),Dt.clear(),e&&Rn(e)}function tc(){return De==="memory"?pe.length:Be}function Rn(e){const t=e.querySelector('[data-role="doc-selection-info"]'),a=e.querySelector('[data-action="print-selection"]'),n=e.querySelector('[data-action="pdf-selection"]'),r=e.querySelector('[data-action="export-selection"]'),i=e.querySelector('[data-action="export-zip"]'),l=e.querySelector('[data-action="delete-selection"]'),o=Re.size;t&&(t.textContent=o?`${o} Eintrag${o===1?"":"e"} ausgewählt`:"Keine Einträge ausgewählt");const c=o===0;a&&(a.disabled=c),n&&(n.disabled=c),r&&(r.disabled=c),i&&(i.disabled=c),l&&(l.disabled=c);const u=e.querySelector('[data-action="toggle-select-all"]');if(u){const d=tc();u.disabled=d===0,u.checked=d>0&&o>=d,u.indeterminate=o>0&&o<d}}function kr(e,t){e.querySelectorAll('[data-role="doc-list"] .doc-sidebar-entry').forEach(n=>{const r=!!(t&&n.dataset.entryId===t);n.classList.toggle("active",r)})}function ka(e,t,a){const n=e.querySelector("#doc-detail"),r=e.querySelector("#doc-detail-body"),i=e.querySelector('[data-role="doc-detail-card"]'),l=e.querySelector('[data-role="doc-detail-empty"]');if(!n||!r||!i||!l)return;if(!t){n.dataset.entryId="",i.classList.add("d-none"),l.classList.remove("d-none"),r.innerHTML="",kr(e,null);return}n.dataset.entryId=t.entry.id,i.classList.remove("d-none"),l.classList.add("d-none"),kr(e,t.entry.id);const o=a||W().fieldLabels,c=o.history?.tableColumns??{},u=o.history?.detail??{},d=t.detail||t.entry.entry,p=ho(d.items||[],o,"detail"),m=d.gpsCoordinates?Oa(d.gpsCoordinates):null,y=Wl(d),g=Kl(d),k=u.gpsNote||c.gpsNote||u.gps||c.gps||"GPS-Notiz",S=u.gpsCoordinates||c.gpsCoordinates||u.gps||c.gps||"GPS-Koordinaten",A=g?`${f(g)}${m?` <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${f(m)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:""}`:"-";r.innerHTML=`
    <p>
      <strong>${f(c.date||"Datum")}:</strong> ${f(Cs(d))}<br />
      <strong>${f(u.creator||"Erstellt von")}:</strong> ${f(d.ersteller||"")}<br />
      <strong>${f(u.location||"Standort")}:</strong> ${f(d.standort||"")}<br />
      <strong>${f(u.crop||"Kultur")}:</strong> ${f(d.kultur||"")}<br />
      <strong>${f(u.usageType||"Art der Verwendung")}:</strong> ${f(d.usageType||"")}<br />
      <strong>${f(u.quantity||"Fläche (ha)")}:</strong> ${f(kl(d))}<br />
      <strong>${f(u.eppoCode||"EPPO-Code")}:</strong> ${f(d.eppoCode||"")}<br />
      <strong>${f(u.bbch||"BBCH")}:</strong> ${f(d.bbch||"")}<br />
      <strong>${f(u.invekos||"InVeKoS")}:</strong> ${f(d.invekos||"")}<br />
      <strong>${f(k)}:</strong> ${y?f(y):"-"}<br />
      <strong>${f(S)}:</strong> ${A}<br />
      <strong>${f(u.time||"Uhrzeit")}:</strong> ${f(d.uhrzeit||"")}<br />
    </p>
    ${vo({maschine:d.qsMaschine,schaderreger:d.qsSchaderreger,verantwortlicher:d.qsVerantwortlicher,wetter:d.qsWetter,behandlungsart:d.qsBehandlungsart})}
    <div class="table-responsive">
      ${p}
    </div>
  `}function Pt(e,t){_n();const a=e.querySelector('[data-role="doc-list"]');if(!a)return;const r=e.querySelector("#doc-detail")?.dataset.entryId||null;if(!mt.length)a.innerHTML=Oe?'<div class="text-center text-muted py-4">Lädt ...</div>':'<div class="text-center text-muted py-4">Noch keine Einträge</div>';else{a.innerHTML="";const i=document.createDocumentFragment();(t||W().fieldLabels).history?.detail?.usageType,mt.forEach(o=>{const c=document.createElement("div"),u=!!$t?.highlightEntryIds?.has(o.id);c.className=`doc-sidebar-entry list-group-item${u?" doc-sidebar-entry--highlight":""}`,c.dataset.entryId=o.id;const d=Cs(o.entry)||"-",p=u?'<span class="badge bg-warning-subtle text-warning-emphasis badge-import">Import</span>':"";c.innerHTML=`
        <div
          class="doc-sidebar-entry__main"
          data-action="view-entry"
          data-entry-id="${o.id}"
        >
          <div class="d-flex justify-content-between gap-2">
            <span class="fw-bold d-flex align-items-center gap-2">
              ${f(o.entry.kultur||"-")}
              ${p}
            </span>
            <small class="text-muted">${f(d)}</small>
          </div>
          <div class="text-muted small mb-1">
            ${f(o.entry.ersteller||"-")} | ${f(o.entry.standort||"-")}
          </div>
          <div class="small text-muted">
            ${f(o.entry.usageType||"-")} · ${f(o.entry.eppoCode||"-")} · ${f(o.entry.invekos||"-")}
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2 gap-2 no-print">
          <button class="btn btn-sm btn-outline-secondary" data-action="print-entry" data-entry-id="${o.id}">Drucken</button>
          <label class="form-check-label d-flex align-items-center gap-2 mb-0">
            <input type="checkbox" class="form-check-input" data-action="toggle-select" data-entry-id="${o.id}" ${Re.has(o.id)?"checked":""} />
            <span class="small">Auswahl</span>
          </label>
        </div>
      `,i.appendChild(c)}),a.appendChild(i)}kr(e,r),$l(e,t),fn(e),Rn(e),Ms=new Date().toISOString(),Tl()}function Ta(e,t){const a=e.querySelector('[data-role="doc-info"]');if(!a)return;const n=Be,r=!!(U.crop||U.creator);if(!n&&!Oe){a.textContent="Keine Einträge";return}if(!n&&Oe){a.textContent="Lädt...";return}if(U.startDate&&U.endDate){const i=`${U.startDate} - ${U.endDate} (${n})`;a.textContent=r?`${i} + Filter`:i;return}a.textContent=`Alle Einträge (${n})`}async function Ns(e,t){const n=e.querySelector("#doc-detail")?.dataset.entryId;if(!n){ka(e,null,t);return}const r=Ht(n);if(!r){ka(e,null,t);return}const i=await Ra(r);i?ka(e,{entry:r,detail:i},t):ka(e,null,t)}async function Ur(e,t,a=ae,n={}){const r=Math.max(0,a),i=!!n.forceReload;i&&(nt.clear(),Ue.clear(),Ue.set(0,null),Be=0,pe=[],mt=[],ae=0,at=null);const l=i?void 0:nt.get(r);if(l&&!n.forceReload){ae=r,pe=l,at=null,Pt(e,t),Ta(e),fn(e);return}const o=Ue.has(r)?Ue.get(r)??null:null,c=Symbol("doc-load");ha=c,Oe=!0,at=null,fn(e);try{const u=await ls({cursor:o,pageSize:it,filters:Kr(U),sortDirection:"desc",includeTotal:i||r===0||Be===0});if(ha!==c)return;const d=u.items.map(p=>Il(p));if(nt.set(r,d),Ul(r),Ue.set(r,o),Ue.set(r+1,u.nextCursor??null),typeof u.totalCount=="number")Be=u.totalCount;else{const p=r*it+d.length;Be=Math.max(Be,p)}ae=r,pe=d,at=null,Pt(e,t),Ta(e,t)}catch(u){ha===c&&(console.error("Dokumentation konnte nicht geladen werden",u),at="Dokumentation konnte nicht geladen werden. Bitte erneut versuchen.",window.alert("Dokumentation konnte nicht geladen werden. Bitte erneut versuchen."))}finally{ha===c&&(Oe=!1,ha=null,fn(e))}}async function ac(e,t){const a=_e(t.history);pe=Gl(a.map((n,r)=>Cl(n,r)).filter(n=>jl(n.entry,U))),Be=pe.length,ae=0,at=null,_n(),Pt(e,t.fieldLabels),Ta(e,t.fieldLabels),await Ns(e,t.fieldLabels)}async function kt(e,t){const a=ra(t),n=!!t.app?.hasDatabase,r=a==="sqlite"&&n;if(De=r?"sqlite":"memory",Qt.clear(),ae=0,at=null,Be=0,pe=[],mt=[],nt.clear(),Ue.clear(),Ue.set(0,null),Na(e),Wr(e,t),On(e),Ba(e,t.archives?.logs??[]),mn=yr(t.archives?.logs),r){await Ur(e,t.fieldLabels,0,{forceReload:!0}),await Ns(e,t.fieldLabels);return}await ac(e,t)}async function ar(){const e=[];for(const t of Re){const a=Dt.get(t)||Ht(t);if(!a)continue;const n=await Ra(a);n&&e.push(n)}return e}async function nc(e,t){if(!t){Na(e),Pt(e,W().fieldLabels);return}if(Re.clear(),Dt.clear(),De==="memory")for(const a of pe)Re.add(a.id),Dt.set(a.id,a);else try{const a=await cs({filters:Kr(U),sortDirection:"desc",limit:1e4}),n=Array.isArray(a.historyIds)?a.historyIds:[];a.entries.forEach((r,i)=>{const l=Number(n[i]);if(!Number.isFinite(l))return;const o=Jt("sqlite",l);Re.add(o),Dt.set(o,{id:o,entry:r,source:"sqlite",ref:l}),Qt.has(o)||Qt.set(o,r)})}catch(a){console.error("Alle Einträge konnten nicht ausgewählt werden",a),window.alert("Alle Einträge konnten nicht ausgewählt werden. Bitte erneut versuchen.")}Pt(e,W().fieldLabels),Rn(e)}async function rc(e,t){if(!Re.size)return;const a=Array.from(Re).map(o=>Dt.get(o)||Ht(o)).filter(o=>!!o),n=[];for(const o of a){const c=await Ra(o);c&&n.push(c)}const r=a.filter(o=>o.source==="sqlite"),i=!!r.length;if(i)for(const o of r)await fo(o.ref);const l=new Set(a.filter(o=>o.source==="state").map(o=>o.ref));if(l.size&&(Ze("history",o=>{const c=Ha(o),u=c.items.filter((d,p)=>!l.has(p));return u.length===c.items.length?c:{...c,items:u,totalCount:Math.min(c.totalCount,u.length),lastUpdatedAt:new Date().toISOString()}}),await ic()),n.length){const o=new Set(n.map(c=>Gr(c)));Is(o)}if(i){try{await Ve()}catch(o){console.warn("SQLite-Datei konnte nach dem Löschen nicht gespeichert werden",o)}t.events?.emit?.("history:data-changed",{type:"deleted",ids:r.map(o=>o.ref)})}Na(e),await kt(e,t.state.getState())}async function Ts(e,t,a){const n=await Ra(t);if(!n){window.alert("Details konnten nicht geladen werden.");return}ka(e,{entry:t,detail:n},a)}async function qi(e){const t=await Ra(e);t?await Fs([t]):window.alert("Eintrag konnte nicht geladen werden.")}async function ic(){const e=de();if(!(!e||e==="memory"||e==="sqlite"))try{const t=je();await Ge(t)}catch(t){throw console.error("Persist history failed",t),window.alert("Historie konnte nicht gespeichert werden. Bitte erneut versuchen."),t}}async function sc(e,t,a){if($n)return;const n=t.state.getState();if(ra(n)!=="sqlite"||!n.app?.hasDatabase){Ae(e,"Archivieren ist nur mit einer lokalen SQLite-Datenbank möglich.","warning");return}const i=Fl(a);if(!i?.startDate||!i.endDate){Ae(e,"Bitte Start- und Enddatum für das Archiv wählen.","warning");return}const l=Dn(i.startDate),o=Dn(i.endDate);if(!l||!o){Ae(e,"Die angegebenen Daten sind ungültig.","danger");return}if(new Date(l)>new Date(o)){Ae(e,"Startdatum darf nicht nach dem Enddatum liegen.","danger");return}const c={startDate:l,endDate:o,creator:U.creator,crop:U.crop},u=Kr(c);Bi(e,!0),Ae(e,"Prüfe Zeitraum und Eintragsmenge...","info");try{const d=await ls({cursor:null,pageSize:1,filters:u,sortDirection:"asc",includeTotal:!0}),p=d.totalCount??d.items.length??0;if(!p){Ae(e,"Im angegebenen Zeitraum wurden keine Einträge gefunden.","warning");return}if(p>Di){Ae(e,`Maximal ${Di} Einträge pro Archiv erlaubt. Bitte Zeitraum verkürzen.`,"warning");return}Ae(e,`Exportiere ${p} Einträge in ein ZIP-Archiv...`,"info");const m=await cs({filters:u,limit:p,sortDirection:"asc"}),y=m?.entries??[];if(!y.length){Ae(e,"Archiv konnte nicht erstellt werden – Export lieferte keine Einträge.","danger");return}const g=y.map(L=>({...L})),k={format:"pflanzenschutz-archive",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:g.length,filters:{startDate:l,endDate:o,creator:c.creator||null,crop:c.crop||null},archive:{removeFromDatabase:i.removeAfterExport,storageHint:i.storageHint||null,note:i.note||null}},S=ds({"pflanzenschutz.json":En(JSON.stringify(g,null,2)),"metadata.json":En(JSON.stringify(k,null,2))}),A=new ArrayBuffer(S.byteLength);new Uint8Array(A).set(S);const M=new Blob([A],{type:"application/zip"}),Z=ql(l,o);Vr(M,Z);let j=!1;if(i.removeAfterExport){Ae(e,"Export abgeschlossen. Entferne Einträge und bereinige Datenbank...","info"),await co({filters:u});const L=new Set(g.map(z=>Gr(z)));Is(L);try{await Ve()}catch(z){console.error("SQLite-Datei konnte nach dem Archivieren nicht gespeichert werden",z)}t.events?.emit?.("history:data-changed",{type:"deleted-range",filters:u});try{await uo()}catch(z){j=!0,console.error("VACUUM fehlgeschlagen",z)}}const me=new Date().toISOString(),N={id:`archive-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,archivedAt:me,startDate:l,endDate:o,entryCount:g.length,fileName:Z,storageHint:i.storageHint||void 0,note:i.note||void 0};j&&(N.note=N.note?`${N.note} | VACUUM fehlgeschlagen`:"VACUUM fehlgeschlagen");const ne={filters:{...c},removeAfterExport:!!i.removeAfterExport,historyIdSample:m?.historyIds?.slice(0,$i)};if(await Ol(N,ne),!i.removeAfterExport&&m?.historyIds?.length){const L=m.historyIds.slice(0,$i).map(z=>({source:"sqlite",ref:z}));t.events?.emit?.("documentation:focus-range",{startDate:l,endDate:o,label:"Archiviert",reason:"archive",entryIds:L})}vr(e,!1),a.reset(),On(e),await kt(e,t.state.getState());const B=i.removeAfterExport?`Archiv ${Z} erstellt und ${g.length} Einträge entfernt.`:`Archiv ${Z} erstellt. ${g.length} Einträge bleiben in der Datenbank.`;Ae(e,B,j?"warning":"success")}catch(d){console.error("Archivieren fehlgeschlagen",d);const p=d instanceof Error?d.message:"Archiv konnte nicht erstellt werden.";Ae(e,p,"danger")}finally{Bi(e,!1),Wr(e,t.state.getState())}}const oc=50;async function Fs(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}if(e.length>oc&&!window.confirm(`Sie möchten ${e.length} Einträge drucken. Bei sehr vielen Einträgen kann das Erstellen der Druckvorschau einige Sekunden dauern und lässt sich nicht unterbrechen.

Fortfahren?`))return;const t=W().fieldLabels,a=po(W().company||null);await mo(e,t,{title:"Dokumentation",headerHtml:a,chunkSize:25})}function Vr(e,t){const a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download=t,n.click(),URL.revokeObjectURL(a)}function lc(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const t=e.map(l=>({...l})),a=JSON.stringify(t,null,2),n=new TextEncoder().encode(a),r=new Blob([n],{type:"application/json; charset=utf-8"}),i=new Date().toISOString().replace(/[:.]/g,"-");Vr(r,`pflanzenschutz-dokumentation-${i}.json`)}async function cc(e,t){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const a=e.map(c=>({...c})),n={format:"pflanzenschutz-export",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:a.length,filters:{startDate:t.startDate||null,endDate:t.endDate||null,creator:t.creator||null,crop:t.crop||null}},r=ds({"pflanzenschutz.json":En(JSON.stringify(a,null,2)),"metadata.json":En(JSON.stringify(n,null,2))}),i=new ArrayBuffer(r.byteLength);new Uint8Array(i).set(r);const l=new Blob([i],{type:"application/zip"}),o=new Date().toISOString().replace(/[:.]/g,"-");Vr(l,`pflanzenschutz-dokumentation-${o}.zip`)}function dc(){const e=document.createElement("div"),t=Rr(),a=U.startDate||t.startDate||"",n=U.endDate||t.endDate||"";U={...U,startDate:a,endDate:n};const r=aa.enabled?`<button class="btn btn-outline-info btn-sm" type="button" data-action="doc-seed">+ ${aa.count} Dummy-Einträge</button>`:"";return e.className="section-inner",e.innerHTML=`
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
            <input type="text" class="form-control" id="doc-crop" name="doc-crop" placeholder="z. B. Äpfel" value="${U.crop||""}" />
          </div>
          <div class="col-md-3">
            <label class="form-label" for="doc-creator">Anwender (optional)</label>
            <input type="text" class="form-control" id="doc-creator" name="doc-creator" placeholder="Name" value="${U.creator||""}" />
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
            <small class="text-muted">Letzte ${_r}</small>
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
  `,e}function uc(e){if(!e)return{};const t=new FormData(e),a=r=>{const i=t.get(r);return typeof i=="string"&&i?i:void 0},n=r=>{const i=t.get(r);if(typeof i!="string")return;const l=i.trim();return l||void 0};return{startDate:a("doc-start"),endDate:a("doc-end"),crop:n("doc-crop"),creator:n("doc-creator")}}let Hi="entries";function pc(e,t){Hi!==t&&(Hi=t,e.querySelectorAll("[data-doc-tab]").forEach(a=>{a.classList.toggle("active",a.dataset.docTab===t)}),e.querySelectorAll("[data-pane]").forEach(a=>{a.style.display=a.dataset.pane===t?"block":"none"}))}function mc(e,t){e.addEventListener("click",a=>{const n=a.target.closest("[data-doc-tab]");if(n&&n.dataset.docTab){pc(e,n.dataset.docTab);return}}),e.addEventListener("submit",a=>{if(a.target instanceof HTMLFormElement){if(a.target.id==="doc-filter"){a.preventDefault(),er(e,t,{refreshList:!0});const n=uc(a.target);if(!n.startDate||!n.endDate){window.alert("Bitte Start- und Enddatum auswählen.");return}U=n,Na(e),kt(e,t.state.getState());return}a.target.dataset.role==="archive-form"&&(a.preventDefault(),sc(e,t,a.target))}}),e.addEventListener("click",a=>{const n=a.target;if(!n)return;const r=n.dataset.action;if(!r){n.closest("[data-action]")&&a.stopPropagation();return}if(r==="reset-filters"){const o=e.querySelector("#doc-filter");o?.reset(),U=Rr(),zs(o??null,U),er(e,t,{refreshList:!0}),Na(e),kt(e,t.state.getState());return}if(r==="archive-toggle"){vr(e),Ae(e,"");return}if(r==="archive-cancel"){vr(e,!1),Ae(e,"");return}if(r==="archive-log-focus"){const o=n.dataset.logId;if(!o)return;const c=Ni(t.state.getState(),o);if(!c){window.alert("Archiv-Eintrag nicht gefunden.");return}const u=c.fileName?`Archiv ${c.fileName}`:"Archivierter Zeitraum";typeof t.events?.emit=="function"?t.events.emit("documentation:focus-range",{startDate:c.startDate,endDate:c.endDate,label:u,reason:"archive-log"}):(U={...U,startDate:c.startDate,endDate:c.endDate},kt(e,t.state.getState())),Ae(e,`Dokumentation auf Archiv ${c.startDate} – ${c.endDate} fokussiert.`,"success");return}if(r==="archive-log-copy-hint"){const o=n.dataset.logId;if(!o)return;const c=Ni(t.state.getState(),o);if(!c||!c.storageHint){window.alert("Kein Speicherhinweis vorhanden.");return}const u=c.storageHint;(async()=>{try{await Rl(u),Ae(e,"Speicherhinweis kopiert.","success")}catch(d){console.error("Hinweis konnte nicht kopiert werden",d),window.alert("Hinweis konnte nicht kopiert werden.")}})();return}if(r==="doc-focus-clear"){er(e,t,{refreshList:!0});return}if(r==="print-selection"||r==="pdf-selection"){(async()=>{const o=await ar();await Fs(o)})();return}if(r==="export-selection"){(async()=>{const o=await ar();lc(o)})();return}if(r==="export-zip"){(async()=>{const o=await ar();await cc(o,U)})();return}if(r==="delete-selection"){if(!Re.size||!window.confirm("Ausgewählte Einträge wirklich löschen?"))return;rc(e,t);return}if(r==="doc-seed"){if(!aa.enabled||Aa)return;const c=window.__PSL?.seedHistoryEntries;if(typeof c!="function"){window.alert("Seed-Funktion ist nicht verfügbar. Bitte Entwicklungsmodus verwenden.");return}Aa=!0,xr(e),(async()=>{try{await c(aa.count),await kt(e,t.state.getState())}catch(u){console.error("Dummy-Daten konnten nicht erstellt werden",u),window.alert("Dummy-Daten konnten nicht erstellt werden.")}finally{Aa=!1,xr(e)}})();return}if(r==="detail-print"){const c=e.querySelector("#doc-detail")?.dataset.entryId;if(!c){window.alert("Kein Eintrag ausgewählt.");return}const u=Ht(c);if(!u){window.alert("Eintrag nicht verfügbar.");return}qi(u);return}const i=n.dataset.entryId;if(!i)return;const l=Ht(i);if(!l){window.alert("Eintrag nicht verfügbar.");return}if(r==="view-entry"){Ts(e,l,t.state.getState().fieldLabels);return}if(r==="print-entry"){qi(l);return}}),e.addEventListener("change",a=>{const n=a.target;if(!n)return;if(n.dataset.action==="toggle-select-all"){nc(e,n.checked);return}if(n.dataset.action!=="toggle-select")return;const r=n.dataset.entryId;if(r){if(n.checked){Re.add(r);const i=Ht(r);i&&Dt.set(r,i)}else Re.delete(r),Dt.delete(r);Rn(e)}})}function fc(e,t){if(!e||Pi)return;const a=e;a.innerHTML="";const n=dc();a.appendChild(n),mc(n,t),xr(n),Wr(n,t.state.getState()),On(n);const r=t.state.getState().archives?.logs??[];Ba(n,r),mn=yr(r),jr(),typeof t.events?.subscribe=="function"&&t.events.subscribe("documentation:focus-range",o=>{!o||typeof o!="object"||Al(n,t,o)});const i=o=>_e(o.history).length,l=()=>kt(n,t.state.getState());Ii?.(),Ii=Es({section:"documentation",event:"history:data-changed",shouldHandleEvent:()=>De==="sqlite",shouldRefresh:()=>De==="sqlite",onRefresh:()=>l(),onStatusChange:o=>Dl(n,o)}),va=i(t.state.getState()),l(),t.state.subscribe(o=>{const c=yr(o.archives?.logs);c!==mn&&(mn=c,Ba(n,o.archives?.logs??[]));const u=i(o);if(hr){va=u;return}if(De==="sqlite"){va=u;return}u!==va&&(va=u,l())}),Pi=!0}const Fa=e=>_e(e.gps.points),Sa=e=>_e(e.points),gc=new Intl.NumberFormat("de-DE",{minimumFractionDigits:5,maximumFractionDigits:5}),bc=new Intl.DateTimeFormat("de-DE",{dateStyle:"short",timeStyle:"short"}),Oi="Deutschland";let _i=!1,qs="list",on=null,$=null,ya=null,Ri=null;const gn=25,nr=new Intl.NumberFormat("de-DE");let ze=0,Ut=null,Sr=null,Ki=null;function jt(e,t){typeof e.events?.emit=="function"&&e.events.emit("history:gps-activation-result",{...t,source:"gps",timestamp:Date.now()})}function za(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function hc(){const e=document.createElement("section");return e.className="section-inner",e.innerHTML=`
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
  `,e}function vc(e){return{root:e,message:e.querySelector('[data-role="gps-message"]'),refreshIndicator:e.querySelector('[data-role="gps-refresh-indicator"]'),availability:e.querySelector('[data-role="gps-availability"]'),tabButtons:Array.from(e.querySelectorAll('[data-role="gps-tab"]')),panels:Array.from(e.querySelectorAll('[data-role="gps-panel"]')),listBody:e.querySelector('[data-role="gps-list"]'),emptyState:e.querySelector('[data-role="gps-empty"]'),activeInfo:e.querySelector('[data-role="gps-active-info"]'),summaryLabel:e.querySelector('[data-role="gps-summary"]'),statusBadge:e.querySelector('[data-role="gps-status"]'),form:e.querySelector('[data-role="gps-form"]'),formFields:{name:e.querySelector('[name="gps-name"]'),description:e.querySelector('[name="gps-description"]'),latitude:e.querySelector('[name="gps-latitude"]'),longitude:e.querySelector('[name="gps-longitude"]'),source:e.querySelector('[name="gps-source"]'),activate:e.querySelector('[name="gps-activate"]'),rawCoordinates:e.querySelector('[name="gps-raw-coordinates"]')},disableTargets:Array.from(e.querySelectorAll("[data-gps-disable]")),geolocationBtn:e.querySelector('[data-action="use-geolocation"]'),mapButton:e.querySelector('[data-role="gps-open-maps"]'),verifyButton:e.querySelector('[data-action="verify-coords"]')}}function Ea(e){return`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e)}`}function Hs(e){const t=e.gps,a=Sa(t),n=l=>{if(!l)return null;const o=Oa(l)||Ea(`${l.latitude},${l.longitude}`),c=l.name?`${l.name}`:`${na(l.latitude)}, ${na(l.longitude)}`;return{url:o,label:c}};if(t.activePointId){const l=a.find(c=>c.id===t.activePointId),o=n(l||null);if(o)return o}if(a.length>0){const l=n(a[0]);if(l)return l}const r=e.company?.address?.trim();if(r)return{url:Ea(r.replace(/\n/g,", ")),label:r};const i=e.company?.name?.trim();return i?{url:Ea(i),label:i}:{url:Ea(Oi),label:Oi}}function yc(e){if(!$)return;const t=Hs(e);$.mapButton&&($.mapButton.href=t.url,$.mapButton.title=`Google Maps öffnen (${t.label})`);const a=$.root.querySelector('[data-role="gps-empty-map-link"]');a&&(a.href=t.url)}function wc(e){if(!e)return null;const a=e.trim().replace(/\s+/g," ").replace(/[,;]/g," ").match(/-?\d+(?:[.,]\d+)?/g);if(!a||a.length<2)return null;const n=l=>Number(l.replace(/,/g,".")),r=n(a[0]),i=n(a[1]);return!Number.isFinite(r)||!Number.isFinite(i)||r<-90||r>90||i<-180||i>180?null:{latitude:r,longitude:i}}function xc(){if(!$?.formFields)return null;const e=$.formFields.latitude?.value??"",t=$.formFields.longitude?.value??"";if(!e.trim()||!t.trim())return null;const a=Number(e),n=Number(t);return!Number.isFinite(a)||!Number.isFinite(n)||a<-90||a>90||n<-180||n>180?null:{latitude:a,longitude:n}}function ln(e){return Number(e).toFixed(6)}function kc(e,t){const a=ln(e),n=ln(t);return Fa(W()).some(r=>ln(r.latitude)===a&&ln(r.longitude)===n)}function Pa(){if(!$?.verifyButton)return;const e=xc(),t=!!e;if($.verifyButton.disabled=!t,e){const a=Oa({latitude:e.latitude,longitude:e.longitude});$.verifyButton.dataset.targetUrl=a||Ea(`${e.latitude},${e.longitude}`)}else delete $.verifyButton.dataset.targetUrl}function na(e){const t=Number(e);return Number.isFinite(t)?`${gc.format(t)}°`:"–"}function Sc(e){if(!e)return"–";const t=new Date(e);return Number.isNaN(t.getTime())?"–":bc.format(t)}function oe(e,t="info",a=4500){if($?.message){if(on&&(window.clearTimeout(on),on=null),!e){$.message.classList.add("d-none"),$.message.textContent="";return}$.message.className=`alert alert-${t}`,$.message.textContent=e,$.message.classList.remove("d-none"),a>0&&(on=window.setTimeout(()=>{$?.message?.classList.add("d-none")},a))}}function Ec(e){const t=$?.refreshIndicator;if(t){if(t.classList.remove("alert-warning","alert-info"),e==="idle"){t.classList.add("d-none");return}t.classList.remove("d-none"),e==="stale"?(t.classList.add("alert-warning"),t.textContent="GPS-Daten wurden geändert. Ansicht aktualisiert sich beim Öffnen."):(t.classList.add("alert-info"),t.textContent="GPS-Daten werden aktualisiert...")}}function Os(e){$&&(qs=e,$.tabButtons.forEach(t=>{const a=t.dataset.tab===e;t.classList.toggle("active",a)}),$.panels.forEach(t=>{const a=t.getAttribute("data-panel")===e;t.classList.toggle("d-none",!a)}))}function Ke(e){return e?.hasDatabase?e.storageDriver!=="sqlite"?"wrong-driver":"ok":"no-db"}function Lc(e){if($?.availability){if(e==="ok"){$.availability.classList.add("d-none"),$.availability.textContent="";return}$.availability.classList.remove("d-none"),$.availability.textContent=e==="no-db"?"Bitte verbinden Sie zuerst eine Datenbank, um GPS-Punkte zu verwalten.":"GPS-Funktionen benötigen eine aktive SQLite-Datenbank. Bitte den SQLite-Treiber in den Einstellungen auswählen."}}function Yt(e,t){if(!$)return;const a=t!=="ok"||e.pending||Ia.isLocked();if($.disableTargets.forEach(n=>{(n instanceof HTMLButtonElement||n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n instanceof HTMLSelectElement)&&(n.disabled=a)}),$.statusBadge){let n="badge bg-success",r="Bereit";t==="no-db"?(n="badge bg-secondary",r="Keine Datenbank"):t==="wrong-driver"?(n="badge bg-warning text-dark",r="Nur mit SQLite"):(e.pending||Ia.isLocked())&&(n="badge bg-info text-dark",r="Wird verarbeitet"),$.statusBadge.className=n,$.statusBadge.textContent=r}}function _s(e){const t=e.length;if(!t)return ze=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/gn),1);ze>=a&&(ze=a-1),ze<0&&(ze=0);const n=ze*gn,r=Math.min(n+gn,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function Dc(){if(!$?.root)return null;const e=$.root.querySelector('[data-role="gps-pager"]');return e?((!Ut||Sr!==e)&&(Ut?.destroy(),Ut=_a(e,{onPrev:()=>Ac(),onNext:()=>zc(),labels:{prev:"Zurück",next:"Weiter",loading:"GPS-Punkte werden geladen...",empty:"Keine GPS-Punkte verfügbar"}}),Sr=e),Ut):null}function Wi(e,t){const a=Dc();if(!a)return;if(t!=="ok"){ze=0;const l=t==="no-db"?"Keine Datenbank verbunden.":"Nur mit SQLite verfügbar.";a.update({status:"disabled",info:l});return}const n=Fa(e).length;if(!n){ze=0;const l=e.gps.initialized?"Noch keine GPS-Punkte vorhanden.":"GPS-Punkte werden geladen...";a.update({status:"disabled",info:l});return}const{start:r,end:i}=_s(Fa(e));a.update({status:"ready",info:`Einträge ${nr.format(r+1)}–${nr.format(i)} von ${nr.format(n)}`,canPrev:ze>0,canNext:i<n})}function $c(e,t){return e.length?e.map(a=>{const n=a.id===t,r=a.description?`<div class="text-muted small">${f(a.description)}</div>`:"",i=a.source?`<span class="badge-psm badge-psm-neutral">${f(a.source)}</span>`:'<span class="text-muted">–</span>',l=n?'<span class="badge bg-success ms-2">Aktiv</span>':"",o=Oa(a),c=o?`<a class="btn btn-outline-info" href="${za(o)}" target="_blank" rel="noopener noreferrer">
              Karte
            </a>`:"";return`
        <tr data-point-id="${za(a.id)}">
          <td>
            <div class="fw-semibold">${f(a.name||"Ohne Namen")}${l}</div>
            ${r}
          </td>
          <td class="font-monospace">
            <div>${na(a.latitude)}</div>
            <div>${na(a.longitude)}</div>
          </td>
          <td>
            <div>${i}</div>
            <div class="text-muted small">${Sc(a.updatedAt)}</div>
          </td>
          <td class="text-end">
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-success" data-action="set-active" ${n?"disabled":""}>
                Aktivieren
              </button>
              ${c}
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
`):""}function Zr(e,t){if(!$)return;const a=e.gps,n=Hs(e),r=t==="ok";if($.summaryLabel){const i=Sa(a).length;$.summaryLabel.textContent=r?`${i} Punkt${i===1?"":"e"} gespeichert`:"Funktion derzeit nicht verfügbar"}if(!r){$.listBody&&($.listBody.innerHTML=""),$.emptyState&&($.emptyState.textContent=t==="no-db"?"Keine Datenbank verbunden.":"Bitte SQLite als Speicher-Treiber aktivieren.",$.emptyState.classList.remove("d-none")),$.activeInfo&&($.activeInfo.textContent=t==="no-db"?"Wartet auf Datenbank.":"Nur mit SQLite verfügbar."),Wi(e,t);return}if($.listBody){const{items:i}=_s(Sa(a));$.listBody.innerHTML=$c(i,a.activePointId)}if($.emptyState){const i=Sa(a).length>0;$.emptyState.classList.toggle("d-none",i),!i&&a.initialized?$.emptyState.innerHTML=`
        <p class="mb-2">Noch keine GPS-Punkte vorhanden.</p>
        <p class="small text-muted mb-3">
          Nutzen Sie "Neuer Punkt" oder öffnen Sie Google Maps, um Koordinaten zu ermitteln.
        </p>
        <a class="btn btn-outline-info btn-sm" data-role="gps-empty-map-link" href="${za(n.url)}" target="_blank" rel="noopener noreferrer">
          <i class="bi bi-box-arrow-up-right me-1"></i>
          Google Maps öffnen
        </a>
      `:a.initialized||($.emptyState.textContent="GPS-Punkte werden geladen...")}if($.activeInfo)if(a.activePointId){const i=Sa(a).find(l=>l.id===a.activePointId);if(i){const l=`${i.name||"Ohne Namen"} (${na(i.latitude)}, ${na(i.longitude)})`,o=Oa(i);o?$.activeInfo.innerHTML=`${f(l)} <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${za(o)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:$.activeInfo.textContent=l}else $.activeInfo.textContent="Aktiver Punkt nicht gefunden."}else $.activeInfo.innerHTML=`Kein aktiver Punkt ausgewählt. <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${za(n.url)}" target="_blank" rel="noopener noreferrer">Google Maps öffnen</a>`;Wi(e,t)}function Ac(){if(ze===0)return;ze=Math.max(ze-1,0);const e=W(),t=Ke(e.app);Zr(e,t)}function zc(){const e=W(),t=Fa(e).length;if(!t)return;const a=Math.max(Math.ceil(t/gn)-1,0);if(ze>=a)return;ze=Math.min(ze+1,a);const n=Ke(e.app);Zr(e,n)}function Ce(e){`${new Date().toLocaleString("de-DE")}${e}`}function Ka(e){if(!e)return null;const t=W();return Fa(t).find(a=>a.id===e)||null}async function Pc(e){if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(e);return}const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}function Mc(){if(!$?.formFields?.rawCoordinates)return;const e=$.formFields.rawCoordinates.value,t=wc(e);if(!t){oe("Koordinaten konnten nicht erkannt werden. Bitte Format 47.68952, 9.12091 verwenden.","warning",6e3);return}const a=t.latitude.toFixed(6),n=t.longitude.toFixed(6);$.formFields.latitude&&($.formFields.latitude.value=a),$.formFields.longitude&&($.formFields.longitude.value=n),oe("Koordinaten übernommen.","success"),Pa()}function Cc(){if(!$?.verifyButton)return;const e=$.verifyButton.dataset.targetUrl;if(!e){oe("Bitte zuerst gültige Koordinaten eintragen, bevor die Prüfung geöffnet wird.","warning",6e3);return}window.open(e,"_blank","noopener,noreferrer")}async function Er(e={}){const{notify:t=!1}=e;if(!(!$||Ke(W().app)!=="ok"||W().gps.pending))try{await os(),t&&oe("GPS-Punkte aktualisiert.","success"),Ce("GPS-Punkte synchronisiert.")}catch(n){const r=n instanceof Error?n.message:"GPS-Punkte konnten nicht geladen werden.";oe(r,"danger",7e3),Ce(`Fehler beim Laden: ${r}`)}}async function Ic(e){if(!e)return;const t=Ka(e);if(!t){oe("Ausgewählter GPS-Punkt wurde nicht gefunden.","warning");return}try{await ps(t.id),oe(`"${t.name}" ist nun aktiv.`,"success"),Ce(`Aktiver GPS-Punkt: ${t.name}`)}catch(a){const n=a instanceof Error?a.message:"GPS-Punkt konnte nicht aktiviert werden.";oe(n,"danger",7e3),Ce(`Fehler beim Aktivieren: ${n}`)}}async function Bc(e){if(!e)return;const t=Ka(e);if(!t){oe("GPS-Punkt existiert nicht mehr.","warning");return}if(window.confirm(`"${t.name}" wirklich löschen? Dieser Schritt kann nicht rückgängig gemacht werden.`))try{await xo(t.id),oe(`"${t.name}" wurde gelöscht.`,"success"),Ce(`GPS-Punkt gelöscht: ${t.name}`)}catch(n){const r=n instanceof Error?n.message:"GPS-Punkt konnte nicht gelöscht werden.";oe(r,"danger",7e3),Ce(`Löschen fehlgeschlagen: ${r}`)}}async function Nc(e){if(!e)return;const t=Ka(e);if(!t){oe("GPS-Punkt nicht gefunden.","warning");return}const a=`${t.latitude}, ${t.longitude}`;try{await Pc(a),oe("Koordinaten in die Zwischenablage kopiert.","success")}catch(n){console.error("clipboard error",n),oe("Koordinaten konnten nicht kopiert werden.","danger",7e3)}}async function Tc(e,t){const a=(e||"").trim();if(!a){jt(t,{status:"error",id:"",message:"Ungültige GPS-Anfrage ohne ID."});return}if(Ke(W().app)!=="ok"){oe("GPS-Modul ist ohne aktive SQLite-Datenbank nicht verfügbar.","warning",6e3),jt(t,{status:"error",id:a,message:"GPS-Modul ist derzeit nicht verfügbar."});return}const r=Ka(a);if(!r){oe("Verknüpfter GPS-Punkt wurde nicht gefunden.","warning",6e3),jt(t,{status:"error",id:a,message:"Verknüpfter GPS-Punkt wurde nicht gefunden."});return}jt(t,{status:"pending",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wird aktiviert...`});try{await ps(r.id),oe(`"${r.name||"Ohne Namen"}" wurde aus der Historie aktiviert.`,"success"),Ce(`Aus Historie aktiviert: ${r.name||r.id}`),jt(t,{status:"success",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wurde aktiviert.`})}catch(i){const l=i instanceof Error?i.message:"GPS-Punkt konnte nicht aktiviert werden.";oe(l,"danger",7e3),Ce(`Aktivierung aus Historie fehlgeschlagen: ${l}`),jt(t,{status:"error",id:r.id,name:r.name,message:l})}}async function Fc(){try{await ko(),Ce("Aktiver GPS-Punkt synchronisiert."),oe("Aktiver GPS-Punkt wurde synchronisiert.","success")}catch(e){const t=e instanceof Error?e.message:"Aktiver GPS-Punkt konnte nicht ermittelt werden.";oe(t,"danger",7e3),Ce(`Sync fehlgeschlagen: ${t}`)}}function qc(){if(!$?.formFields)throw new Error("Formular nicht initialisiert");const e=$.formFields.name?.value.trim()||"",t=$.formFields.description?.value.trim()||"",a=$.formFields.source?.value.trim()||"",n=Number($.formFields.latitude?.value),r=Number($.formFields.longitude?.value),i=!!$.formFields.activate?.checked;if(!e)throw new Error("Name darf nicht leer sein.");if(!Number.isFinite(n)||!Number.isFinite(r))throw new Error("Koordinaten sind ungültig.");return{name:e,description:t,latitude:n,longitude:r,source:a,activate:i}}async function Hc(e){if(e.preventDefault(),Ia.isLocked()){oe("Speichern läuft bereits ...","info");return}try{const t=qc();if(kc(t.latitude,t.longitude)){oe("Ein GPS-Punkt mit identischen Koordinaten ist bereits vorhanden.","warning",6e3);return}Yt(W().gps,Ke(W().app)),await So({name:t.name,description:t.description||null,latitude:t.latitude,longitude:t.longitude,source:t.source||null},{activate:t.activate}),T.success(`GPS-Punkt "${t.name}" gespeichert.`),Ce(`GPS-Punkt gespeichert${t.activate?" und aktiv gesetzt":""}: ${t.name}`),$?.form?.reset()}catch(t){const a=t instanceof Error?t.message:"GPS-Punkt konnte nicht gespeichert werden.";T.error(a),Ce(`Speichern fehlgeschlagen: ${a}`)}finally{Yt(W().gps,Ke(W().app))}}function Oc(){if($?.formFields){if(!navigator.geolocation){T.warning("Geolocation wird von diesem Browser nicht unterstützt.");return}if(Ia.isLocked()){T.info("Bitte warten...");return}Ia.acquire(async()=>(Yt(W().gps,Ke(W().app)),new Promise(e=>{navigator.geolocation.getCurrentPosition(t=>{const{latitude:a,longitude:n}=t.coords;$?.formFields.latitude&&($.formFields.latitude.value=a.toFixed(6)),$?.formFields.longitude&&($.formFields.longitude.value=n.toFixed(6)),$?.formFields.source&&!$.formFields.source.value.trim()&&($.formFields.source.value="Browser"),T.success("Koordinaten aus Browser-Position übernommen."),Ce("Browser-Geolocation übernommen"),Pa(),Yt(W().gps,Ke(W().app)),e()},t=>{const a=t.code===t.PERMISSION_DENIED?"Zugriff auf Standort wurde verweigert.":"Geolocation konnte nicht ermittelt werden.";T.warning(a),Ce(`Geolocation fehlgeschlagen: ${a}`),Yt(W().gps,Ke(W().app)),e()},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})})))}}function _c(){$&&($.root.addEventListener("click",e=>{const t=e.target;if(!t)return;const a=t.closest('[data-role="gps-tab"]');if(a&&a.dataset.tab){Os(a.dataset.tab);return}const n=t.closest("[data-action]");if(!n||n.dataset.action==="")return;const i=n.closest("[data-point-id]")?.getAttribute("data-point-id")||"";switch(n.dataset.action){case"reload-points":Er({notify:!0});break;case"sync-active":Fc();break;case"set-active":Ic(i);break;case"delete-point":Bc(i);break;case"copy-coords":Nc(i);break;case"use-geolocation":Oc();break;case"apply-raw-coords":Mc();break;case"verify-coords":Cc();break}}),$.form?.addEventListener("submit",e=>{Hc(e)}),$.form?.addEventListener("reset",()=>{window.setTimeout(()=>{Pa()},0)}),$.formFields.latitude?.addEventListener("input",()=>{Pa()}),$.formFields.longitude?.addEventListener("input",()=>{Pa()}))}function Rc(e,t){if(!e||_i)return;_i=!0;const a=e;a.innerHTML="";const n=hc();a.appendChild(n),$=vc(n),Ki?.(),Ki=Es({section:"gps",event:"gps:data-changed",shouldHandleEvent:()=>Ke(t.state.getState().app)==="ok",shouldRefresh:()=>Ke(t.state.getState().app)==="ok",onRefresh:()=>Er({notify:!1}),onStatusChange:l=>Ec(l)}),ze=0,Ut?.destroy(),Ut=null,Sr=null,_c(),Os(qs),typeof t.events?.subscribe=="function"&&t.events.subscribe("gps:set-active-from-history",l=>{let o="";if(l&&typeof l=="object"&&(o=String(l.id||"").trim()),!o){oe("Historische GPS-Anfrage ohne gültige ID erhalten.","warning",6e3);return}Tc(o,t)});const r=t.state.getState();ya=r.gps.activePointId;const i=(l,o)=>{const c=Ke(l.app),u=l.gps;if(Lc(c),Zr(l,c),Yt(u,c),yc(l),c==="ok"&&!u.initialized&&!u.pending&&Er({notify:!1}),c==="ok"&&Ri!=="ok"&&u.initialized&&oe("GPS-Bereich ist wieder verfügbar.","success"),Ri=c,l.gps.activePointId!==ya&&(ya=l.gps.activePointId,typeof t.events?.emit=="function")){const d=Ka(ya);t.events.emit("gps:active-point-changed",{id:ya,point:d})}l.gps.lastError&&l.gps.lastError!==o.gps.lastError&&(oe(l.gps.lastError,"danger",7e3),Ce(`Fehler: ${l.gps.lastError}`))};t.state.subscribe(i),i(r,r)}let Ne=[],Te=[],Lr=!1,bn=null;async function st(){try{const[e,t]=await Promise.all([Ao({limit:100}),zo({limit:100})]);Ne=e.items||[],Te=t.items||[],kn("savedCodes:changed",{eppoCount:Ne.length,bbchCount:Te.length})}catch(e){console.error("Failed to load saved codes:",e),Ne=[],Te=[]}}function Kc(){const e=Ne.length>0,t=Te.length>0;return`
    <div class="row g-4">
      <!-- EPPO Codes Section -->
      <div class="col-lg-6">
        <div class="card card-dark codes-card h-100">
          <div class="card-header codes-card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="bi bi-flower1 me-2 text-success"></i>
              Kulturen (EPPO-Codes)
            </h5>
            <span class="badge badge-psm-neutral">${Ne.length} gespeichert</span>
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
                  <span class="badge bg-success ms-2">${Ne.length}</span>
                </h6>
                <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${Dr()}
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
            <span class="badge badge-psm-neutral">${Te.length} gespeichert</span>
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
                  <span class="badge bg-info ms-2">${Te.length}</span>
                </h6>
                <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${$r()}
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
  `}function Dr(){return Ne.length?Ne.map(e=>`
    <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-eppo-id="${f(e.id)}">
      <div class="flex-grow-1">
        ${e.isFavorite?'<i class="bi bi-star-fill text-warning me-2"></i>':""}
        <strong class="text-success">${f(e.code)}</strong>
        <span class="ms-2">${f(e.name)}</span>
        ${e.usageCount>0?`<span class="badge bg-secondary ms-2">${e.usageCount}x</span>`:""}
      </div>
      <div class="btn-group btn-group-sm">
        <button type="button" class="btn btn-outline-warning" data-action="toggle-favorite-eppo" data-id="${f(e.id)}" title="Favorit umschalten">
          <i class="bi bi-star${e.isFavorite?"-fill":""}"></i>
        </button>
        <button type="button" class="btn btn-outline-danger" data-action="delete-eppo" data-id="${f(e.id)}" title="Löschen">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  `).join(""):`
      <div class="list-group-item list-group-item-action text-muted text-center py-4">
        <i class="bi bi-inbox fs-2 d-block mb-2"></i>
        Noch keine EPPO-Codes gespeichert
      </div>
    `}function $r(){return Te.length?Te.map(e=>`
    <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-bbch-id="${f(e.id)}">
      <div class="flex-grow-1">
        ${e.isFavorite?'<i class="bi bi-star-fill text-warning me-2"></i>':""}
        <strong class="text-info">${f(e.code)}</strong>
        <span class="ms-2">${f(e.label)}</span>
        ${e.usageCount>0?`<span class="badge bg-secondary ms-2">${e.usageCount}x</span>`:""}
      </div>
      <div class="btn-group btn-group-sm">
        <button type="button" class="btn btn-outline-warning" data-action="toggle-favorite-bbch" data-id="${f(e.id)}" title="Favorit umschalten">
          <i class="bi bi-star${e.isFavorite?"-fill":""}"></i>
        </button>
        <button type="button" class="btn btn-outline-danger" data-action="delete-bbch" data-id="${f(e.id)}" title="Löschen">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  `).join(""):`
      <div class="list-group-item list-group-item-action text-muted text-center py-4">
        <i class="bi bi-inbox fs-2 d-block mb-2"></i>
        Noch keine BBCH-Stadien gespeichert
      </div>
    `}function ot(e){const t=e.querySelector('[data-role="saved-eppo-list"]'),a=Ne.length>0;if(t){const o=t.closest(".border-top");o&&a&&(o.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Kulturen
            <span class="badge bg-success ms-2">${Ne.length}</span>
          </h6>
          <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Dr()}
          </div>
        `)}else if(a){const o=e.querySelector(".codes-card:first-child .border-top.pt-3.mb-3");o&&(o.innerHTML=`
        <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
          <i class="bi bi-bookmark-star me-1"></i>
          Meine Kulturen
          <span class="badge bg-success ms-2">${Ne.length}</span>
        </h6>
        <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
          ${Dr()}
        </div>
      `)}const n=e.querySelector('[data-role="saved-bbch-list"]'),r=Te.length>0;if(n){const o=n.closest(".border-top");o&&r&&(o.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${Te.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${$r()}
          </div>
        `)}else if(r){const c=e.querySelectorAll(".codes-card")[1];if(c){const u=c.querySelector(".border-top.pt-3.mb-3");u&&(u.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${Te.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${$r()}
          </div>
        `)}}const i=e.querySelector(".codes-card:first-child .card-header .badge"),l=e.querySelector(".codes-card:last-child .card-header .badge");i&&(i.textContent=`${Ne.length} gespeichert`),l&&(l.textContent=`${Te.length} gespeichert`)}function Wc(e){const t=e.querySelector('[data-input="eppo-search"]'),a=e.querySelector('[data-role="eppo-search-results"]');if(t&&a){const o=ai(async()=>{const c=t.value.trim();if(c.length<2){a.innerHTML="";return}try{const u=await Do(c,10);if(!u.length){a.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${f(c)}"</div>
          `;return}a.innerHTML=u.map(d=>`
          <button type="button" class="list-group-item list-group-item-action" 
                  data-action="select-eppo" 
                  data-code="${f(d.code)}" 
                  data-name="${f(d.name)}"
                  data-language="${f(d.language||"")}"
                  data-dtcode="${f(d.dtcode||"")}">
            <strong class="text-success">${f(d.code)}</strong>
            <span class="ms-2">${f(d.name)}</span>
            ${d.dtcode?`<small class="text-muted ms-2">(${f(d.dtcode)})</small>`:""}
          </button>
        `).join("")}catch(u){console.error("EPPO search failed:",u),a.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);t.addEventListener("input",o)}const n=e.querySelector('[data-input="bbch-search"]'),r=e.querySelector('[data-role="bbch-search-results"]');if(n&&r){const o=ai(async()=>{const c=n.value.trim();if(c.length<1){r.innerHTML="";return}try{const u=await $o(c,10);if(!u.length){r.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${f(c)}"</div>
          `;return}r.innerHTML=u.map(d=>`
          <button type="button" class="list-group-item list-group-item-action d-flex align-items-start gap-2 py-2" 
                  data-action="select-bbch" 
                  data-code="${f(d.code)}" 
                  data-label="${f(d.label)}"
                  data-principal="${d.principalStage??""}"
                  data-secondary="${d.secondaryStage??""}">
            <strong class="text-info flex-shrink-0" style="min-width: 35px;">${f(d.code)}</strong>
            <span class="text-break" style="line-height: 1.4;">${f(d.label)}</span>
          </button>
        `).join("")}catch(u){console.error("BBCH search failed:",u),r.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);n.addEventListener("input",o)}e.dataset.codesClickBound!=="1"&&(e.dataset.codesClickBound="1",e.addEventListener("click",async o=>{const u=o.target.closest("[data-action]");if(!u)return;const d=u.dataset.action;if(d==="select-eppo"){const p=u.dataset.code||"",m=u.dataset.name||"",y=u.dataset.language||"",g=u.dataset.dtcode||"";if(!p||!m){console.warn("EPPO selection missing code or name");return}a&&(a.innerHTML=""),t&&(t.value="");const k=Ne.find(S=>S.code.toUpperCase()===p.toUpperCase());if(k){const S=e.querySelector(`[data-eppo-id="${k.id}"]`);S&&(S.classList.add("flash-highlight"),setTimeout(()=>S.classList.remove("flash-highlight"),800));return}try{await Qn({code:p,name:m,language:y||void 0,dtcode:g||void 0,isFavorite:!1});const S=je();await Ge(S),await st(),ot(e)}catch(S){console.error("Failed to save EPPO from search:",S),alert("Speichern fehlgeschlagen")}}if(d==="select-bbch"){const p=u.dataset.code||"",m=u.dataset.label||"",y=u.dataset.principal,g=u.dataset.secondary,k=y?parseInt(y,10):void 0,S=g?parseInt(g,10):void 0;if(!p||!m){console.warn("BBCH selection missing code or label");return}r&&(r.innerHTML=""),n&&(n.value="");const A=Te.find(M=>M.code===p);if(A){const M=e.querySelector(`[data-bbch-id="${A.id}"]`);M&&(M.classList.add("flash-highlight"),setTimeout(()=>M.classList.remove("flash-highlight"),800));return}try{await Jn({code:p,label:m,principalStage:Number.isNaN(k)?void 0:k,secondaryStage:Number.isNaN(S)?void 0:S,isFavorite:!1});const M=je();await Ge(M),await st(),ot(e)}catch(M){console.error("Failed to save BBCH from search:",M),alert("Speichern fehlgeschlagen")}}if(d==="toggle-favorite-eppo"){const p=u.dataset.id;if(!p)return;const m=Ne.find(y=>y.id===p);if(!m)return;try{await Qn({id:m.id,code:m.code,name:m.name,language:m.language,dtcode:m.dtcode,isFavorite:!m.isFavorite});const y=je();await Ge(y),await st(),ot(e)}catch(y){console.error("Failed to toggle EPPO favorite:",y)}}if(d==="toggle-favorite-bbch"){const p=u.dataset.id;if(!p)return;const m=Te.find(y=>y.id===p);if(!m)return;try{await Jn({id:m.id,code:m.code,label:m.label,principalStage:m.principalStage,secondaryStage:m.secondaryStage,isFavorite:!m.isFavorite});const y=je();await Ge(y),await st(),ot(e)}catch(y){console.error("Failed to toggle BBCH favorite:",y)}}if(d==="delete-eppo"){const p=u.dataset.id;if(!p||!confirm("EPPO-Code wirklich löschen?"))return;try{await Eo({id:p});const m=je();await Ge(m),await st(),ot(e)}catch(m){console.error("Failed to delete EPPO:",m)}}if(d==="delete-bbch"){const p=u.dataset.id;if(!p||!confirm("BBCH-Stadium wirklich löschen?"))return;try{await Lo({id:p});const m=je();await Ge(m),await st(),ot(e)}catch(m){console.error("Failed to delete BBCH:",m)}}}));const i=e.querySelector('[data-form="add-eppo"]');i&&i.addEventListener("submit",async o=>{o.preventDefault();const c=e.querySelector('[data-input="eppo-code"]'),u=e.querySelector('[data-input="eppo-name"]'),d=e.querySelector('[data-input="eppo-favorite"]'),p=c?.value.trim(),m=u?.value.trim();if(!p||!m){alert("Bitte Code und Name eingeben");return}try{await Qn({code:p,name:m,isFavorite:d?.checked||!1});const y=je();await Ge(y),await st(),ot(e),c&&(c.value=""),u&&(u.value=""),d&&(d.checked=!1)}catch(y){console.error("Failed to save EPPO:",y),alert("Speichern fehlgeschlagen")}});const l=e.querySelector('[data-form="add-bbch"]');l&&l.addEventListener("submit",async o=>{o.preventDefault();const c=e.querySelector('[data-input="bbch-code"]'),u=e.querySelector('[data-input="bbch-label"]'),d=e.querySelector('[data-input="bbch-favorite"]'),p=c?.value.trim(),m=u?.value.trim();if(!p||!m){alert("Bitte Code und Bezeichnung eingeben");return}try{await Jn({code:p,label:m,isFavorite:d?.checked||!1});const y=je();await Ge(y),await st(),ot(e),c&&(c.value=""),u&&(u.value=""),d&&(d.checked=!1)}catch(y){console.error("Failed to save BBCH:",y),alert("Speichern fehlgeschlagen")}})}function jc(e,t,a={}){if(!e||Lr)return;bn=e,Lr=!0,bn.innerHTML=`
    <div class="section-inner codes-manager">
      <h4 class="mb-3"><i class="bi bi-tags me-2"></i>EPPO & BBCH Codes</h4>
      ${Kc()}
    </div>`;const n=bn.querySelector(".codes-manager");if(!n)return;Wc(n);const r=async()=>{await st(),ot(n)};t?.events?.subscribe?.("database:connected",()=>{r()}),t?.state?.getState?.().app?.hasDatabase&&r()}function Gc(){Lr=!1,bn=null}let ji=!1,dt=null,La=null,hn=null,Da=null,It=null,zn=null,ut=null,qa=null,Pn=null,pt=null,Ar=null,lt=null,Pe=new Set,St=null,rr=!1,ir=!1,Xt=!1;const Qe=e=>_e(e.mediums),vn=25,sr=new Intl.NumberFormat("de-DE");let Me=0,Vt=null,zr=null,Pr=null,Qr=null;function Uc(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function Vc(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`profile-${Date.now()}-${Math.random().toString(16).slice(2,10)}`}function Rs(e){if(!Pe.size)return;const t=new Set(Qe(e).map(n=>n.id));let a=!1;Pe.forEach(n=>{t.has(n)||(Pe.delete(n),a=!0)}),a&&(Pe=new Set(Pe))}function Mn(){dt&&dt.querySelectorAll('[data-role="profile-select"]').forEach(e=>{const t=e.dataset.mediumId;e.checked=!!(t&&Pe.has(t))})}function Et(e){const t=Qe(e).length,a=Pe.size;let n="Noch keine Mittel ausgewählt.";t?a===t&&t>0?n=`${a} Mittel ausgewählt (alle).`:a>0&&(n=`${a} Mittel ausgewählt.`):n="Keine Mittel vorhanden.",Ar&&(Ar.textContent=n),lt&&(lt.disabled=t===0,lt.indeterminate=a>0&&a<t,lt.checked=t>0&&a===t)}function yn(e){St=null,zn&&zn.reset(),qa&&(qa.value=""),ut&&(ut.value=""),pt&&(pt.textContent="Profil speichern"),Pe=new Set,Mn(),Et(e)}function Zc(e,t){St=e.id,qa&&(qa.value=e.id),ut&&(ut.value=e.name,ut.focus()),pt&&(pt.textContent="Profil aktualisieren"),Pe=new Set(e.mediumIds),Mn(),Et(t)}function Gi(e,t){if(pt){if(pt.disabled=e,e){pt.textContent=t||"Speichert...";return}pt.textContent=St?"Profil aktualisieren":"Profil speichern"}}function Cn(e,t){if(La){if(La.disabled=e,e){La.textContent=t||"Speichert...";return}La.textContent="Hinzufügen"}}async function Qc(e,t,a){if(Xt)return;const n=t.state.getState(),i=(Qe(n)[e]??null)?.id||null;Xt=!0,Cn(!0);const l=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediums",c=>{const u=Ha(c),d=u.items.slice();return d.splice(e,1),{...u,items:d,totalCount:Math.min(u.totalCount,d.length),lastUpdatedAt:new Date().toISOString()}}),await In({silent:!0})&&i&&t.events?.emit?.("mediums:data-changed",{action:"deleted",id:i})}finally{Xt=!1,Cn(!1),a&&a.isConnected&&(a.disabled=!1,a.textContent=l??"Löschen")}}async function Jc(e,t,a){const n=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediumProfiles",(r=[])=>r.filter(i=>i.id!==e.id)),St===e.id&&yn(t.state.getState()),await In({successMessage:"Profil gelöscht."})}finally{a&&(a.disabled=!1,a.textContent=n||"Löschen")}}function Yc(e){if(!Pn)return;const t=Pn,a=e.mediumProfiles||[];if(!a.length){t.innerHTML=`
      <tr>
        <td colspan="3" class="text-center text-muted">Noch keine Profile erstellt.</td>
      </tr>
    `;return}const n=new Map(Qe(e).map(r=>[r.id,r]));t.innerHTML="",a.forEach(r=>{const i=document.createElement("tr"),l=r.mediumIds.map(c=>n.get(c)).filter(Boolean).map(c=>f(c.name)),o=l.length?l.join(", "):'<span class="text-muted">Keine gültigen Mittel</span>';i.innerHTML=`
      <td>${f(r.name)}</td>
      <td>${o}</td>
      <td>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-sm btn-outline-info" data-action="profile-edit" data-id="${f(r.id)}">Bearbeiten</button>
          <button class="btn btn-sm btn-outline-danger" data-action="profile-delete" data-id="${f(r.id)}">Löschen</button>
        </div>
      </td>
    `,t.appendChild(i)})}function Xc(e,t){if(rr||!e.mediumProfiles?.length)return;const a=new Set(Qe(e).map(i=>i.id));let n=!1;const r=e.mediumProfiles.map(i=>{const l=i.mediumIds.filter(o=>a.has(o));return l.length!==i.mediumIds.length?(n=!0,{...i,mediumIds:l,updatedAt:new Date().toISOString()}):i}).filter(i=>i.mediumIds.length?!0:(n=!0,!1));n&&(rr=!0,t.state.updateSlice("mediumProfiles",()=>r),rr=!1)}function Ks(e){if(!e)return Me=0,{start:0,end:0,total:0};const t=Math.max(Math.ceil(e/vn),1);Me>=t&&(Me=t-1),Me<0&&(Me=0);const a=Me*vn,n=Math.min(a+vn,e);return{start:a,end:n,total:e}}function ed(){if(!Pr)return null;const e=Pr.querySelector('[data-role="mediums-pager"]');return e?((!Vt||zr!==e)&&(Vt?.destroy(),Vt=_a(e,{onPrev:()=>td(),onNext:()=>ad(),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Mittel...",empty:"Keine Mittel verfügbar"}}),zr=e),Vt):null}function Ui(e){const t=ed();if(!t)return;const a=Qe(e).length;if(!a){Me=0,t.update({status:"disabled",info:"Noch keine Mittel gespeichert."});return}const{start:n,end:r}=Ks(a),i=`Mittel ${sr.format(n+1)}–${sr.format(r)} von ${sr.format(a)}`;t.update({status:"ready",info:i,canPrev:Me>0,canNext:r<a})}function td(){if(Me===0)return;const e=Qr?.state.getState();e&&(Me=Math.max(Me-1,0),Jr(e))}function ad(){const e=Qr?.state.getState();if(!e)return;const t=Qe(e).length;if(!t)return;const a=Math.max(Math.ceil(t/vn)-1,0);Me>=a||(Me=Math.min(Me+1,a),Jr(e))}function Jr(e){if(!dt)return;Rs(e);const t=new Map(e.measurementMethods.map(l=>[l.id,l])),a=Qe(e).length;if(!a){dt.innerHTML=`
      <tr>
        <td colspan="9" class="text-center text-muted">Noch keine Mittel gespeichert.</td>
      </tr>
    `,Et(e),Ui(e);return}const{start:n,end:r}=Ks(a),i=Qe(e).slice(n,r);dt.innerHTML="",i.forEach((l,o)=>{const c=n+o,u=document.createElement("tr"),d=t.get(l.methodId),p=l.approval||l.zulassungsnummer,m=typeof p=="string"&&p.trim().length?f(p):"-",y=typeof l.wartezeit=="string"&&l.wartezeit.trim().length?f(l.wartezeit):typeof l.wartezeit=="number"?`${l.wartezeit} Tage`:"-",g=typeof l.wirkstoff=="string"&&l.wirkstoff.trim().length?f(l.wirkstoff):"-";u.innerHTML=`
      <td class="text-center">
        <input type="checkbox" class="form-check-input" data-role="profile-select" data-medium-id="${f(l.id)}" ${Pe.has(l.id)?"checked":""} />
      </td>
      <td>${f(l.name)}</td>
      <td>${f(l.unit)}</td>
      <td>${f(d?d.label:l.method||l.methodId||"-")}</td>
      <td>${f(l.value!=null?String(l.value):"")}</td>
      <td>${m}</td>
      <td>${y}</td>
      <td>${g}</td>
      <td>
        <button class="btn btn-sm btn-danger" data-action="delete" data-index="${c}">Löschen</button>
      </td>
    `,dt?.appendChild(u)}),Et(e),Ui(e)}function Vi(e){if(!Da)return;const t=new Set;Da.innerHTML="",e.measurementMethods.forEach(a=>{const n=(a.label??"").toLowerCase(),r=(a.id??"").toLowerCase();if(n&&!t.has(n)){t.add(n);const i=document.createElement("option");i.value=a.label,Da.appendChild(i)}if(r&&!t.has(r)){t.add(r);const i=document.createElement("option");i.value=a.id,Da.appendChild(i)}})}function nd(e){const t=e.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t||`method-${Date.now()}-${Math.random().toString(16).slice(2,6)}`}function rd(e,t){if(!hn)return null;const a=hn.value.trim();if(!a)return window.alert("Bitte eine Methode angeben."),hn.focus(),null;const n=e.measurementMethods.find(o=>o.label?.toLowerCase()===a.toLowerCase()||o.id?.toLowerCase()===a.toLowerCase());if(n)return n.id;const r=nd(a),i=e.fieldLabels?.calculation?.fields?.quantity?.unit||"Kiste",l={id:r,label:a,type:"factor",unit:i,requires:["areaHa"],config:{sourceField:"areaHa"}};return t.state.updateSlice("measurementMethods",o=>[...o,l]),r}async function In(e){try{const t=je();return await Ge(t),e?.silent||window.alert(e?.successMessage??"Änderungen wurden gespeichert."),!0}catch(t){console.error("Fehler beim Speichern",t);const a=t instanceof Error?t.message:"Speichern fehlgeschlagen";return window.alert(a),!1}}function id(e,t){const a=!!t.app?.hasDatabase,n=t.app?.activeSection==="settings";e.classList.toggle("d-none",!(a&&n))}function sd(e,t){if(!e||ji)return;const a=e;a.innerHTML="";const n=Uc();a.appendChild(n),Pr=n,Qr=t,Me=0,Vt?.destroy(),Vt=null,zr=null,dt=n.querySelector("#settings-mediums-table tbody"),hn=n.querySelector('input[name="medium-method"]'),Da=n.querySelector("#settings-method-options"),It=n.querySelector("#settings-medium-form"),La=It?It.querySelector('button[type="submit"]'):null,zn=n.querySelector("#settings-profile-form"),ut=n.querySelector("#profile-name"),qa=n.querySelector('input[name="profile-id"]'),Pn=n.querySelector("#settings-profile-table tbody"),pt=n.querySelector('[data-role="profile-submit"]'),Ar=n.querySelector('[data-role="profile-selection-summary"]'),lt=n.querySelector('[data-role="profile-select-all"]');let r=!1,i=!1;function l(d){if(n.querySelectorAll("[data-settings-tab]").forEach(p=>{const m=p.dataset.settingsTab===d;p.classList.toggle("active",m)}),n.querySelectorAll("[data-pane]").forEach(p=>{const m=p.dataset.pane===d;p.style.display=m?"block":"none"}),d==="gps"&&!r){const p=n.querySelector('[data-feature="gps-embedded"]');p&&(Rc(p,t),r=!0)}if(d==="codes"&&!i){const p=n.querySelector('[data-feature="codes-embedded"]');p&&(Gc(),jc(p,{state:t.state,events:{subscribe:t.events?.subscribe}},{}),i=!0)}}n.querySelectorAll("[data-settings-tab]").forEach(d=>{d.addEventListener("click",()=>{const p=d.dataset.settingsTab;p&&l(p)})});async function o(){if(!It||Xt)return;const d=t.state.getState(),p=new FormData(It),m=(p.get("medium-name")||"").toString().trim(),y=(p.get("medium-unit")||"").toString().trim(),g=p.get("medium-value"),k=Number(g),S=(p.get("medium-approval")||"").toString().trim(),A=p.get("medium-wartezeit"),M=A?Number(A):null,Z=(p.get("medium-wirkstoff")||"").toString().trim()||null;if(!m||!y||Number.isNaN(k)){window.alert("Bitte alle Felder korrekt ausfüllen.");return}const j=rd(d,t);if(!j)return;const me=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`medium-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,N={id:me,name:m,unit:y,methodId:j,value:k,zulassungsnummer:S||null,wartezeit:M!=null&&!Number.isNaN(M)?M:null,wirkstoff:Z};Xt=!0,Cn(!0,"Speichere...");try{t.state.updateSlice("mediums",B=>{const L=Ha(B),z=[...L.items,N];return{...L,items:z,totalCount:z.length,lastUpdatedAt:new Date().toISOString()}}),Vi(t.state.getState()),await In({successMessage:"Mittel gespeichert.",silent:!0})&&(It.reset(),t.events?.emit?.("mediums:data-changed",{action:"created",id:me}))}finally{Xt=!1,Cn(!1)}}It?.addEventListener("submit",d=>{d.preventDefault(),o()}),dt?.addEventListener("click",d=>{const p=d.target?.closest('[data-action="delete"]');if(!p)return;const m=Number(p.dataset.index);Number.isNaN(m)||Qc(m,t,p)}),dt?.addEventListener("change",d=>{const p=d.target;if(!p||p.dataset.role!=="profile-select")return;const m=p.dataset.mediumId;if(!m)return;p.checked?Pe.add(m):Pe.delete(m);const y=t.state.getState();Et(y)}),lt?.addEventListener("change",()=>{const d=t.state.getState();lt&&(lt.indeterminate=!1,lt.checked?Pe=new Set(Qe(d).map(p=>p.id)):Pe=new Set,Mn(),Et(d))});const c=async()=>{if(!ut)return;const d=ut.value.trim();if(!d){window.alert("Bitte einen Profilnamen eingeben."),ut.focus();return}if(!Pe.size){window.alert("Bitte mindestens ein Mittel auswählen.");return}const p=t.state.getState();if(p.mediumProfiles?.some(S=>S.name.toLowerCase()===d.toLowerCase()&&S.id!==St)){window.alert("Ein Profil mit diesem Namen existiert bereits.");return}const y=Qe(p).filter(S=>Pe.has(S.id)).map(S=>S.id);if(!y.length){window.alert("Ausgewählte Mittel sind nicht mehr verfügbar. Bitte Auswahl prüfen."),Rs(p),Mn(),Et(p);return}if(ir)return;const g=!!St;ir=!0,Gi(!0,g?"Aktualisiere...":"Speichere...");const k=new Date().toISOString();try{if(St)t.state.updateSlice("mediumProfiles",(A=[])=>A.map(M=>M.id===St?{...M,name:d,mediumIds:y,updatedAt:k}:M));else{const A={id:Vc(),name:d,mediumIds:y,createdAt:k,updatedAt:k};t.state.updateSlice("mediumProfiles",(M=[])=>[...M,A])}await In({successMessage:g?"Profil aktualisiert und gespeichert.":"Profil gespeichert."})&&yn(t.state.getState())}finally{ir=!1,Gi(!1)}};zn?.addEventListener("submit",d=>{d.preventDefault(),c()}),Pn?.addEventListener("click",d=>{const p=d.target?.closest('[data-action^="profile-"]');if(!p)return;const m=p.dataset.id;if(!m)return;const y=t.state.getState();if(p.dataset.action==="profile-edit"){const g=y.mediumProfiles?.find(k=>k.id===m);g&&Zc(g,y);return}if(p.dataset.action==="profile-delete"){const g=y.mediumProfiles?.find(k=>k.id===m);if(!g||!window.confirm(`Profil "${g.name}" wirklich löschen?`))return;Jc(g,t,p)}}),n.querySelector('[data-action="profile-reset"]')?.addEventListener("click",()=>{yn(t.state.getState())}),yn(t.state.getState());const u=d=>{Xc(d,t),id(n,d),d.app.activeSection==="settings"&&(Jr(d),Vi(d),Yc(d),Et(d))};t.state.subscribe(u),u(t.state.getState()),ji=!0}const wa=e=>f(e),or=(e,t=1)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function ea(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function od(e){if(!e)return"";const t=new Date(e);if(Number.isNaN(t.getTime()))return f(e);const a=Math.round((t.getTime()-Date.now())/864e5);return a<0?`<span style="color:#ef4444;">${ea(e)} · abgelaufen</span>`:a<180?`<span style="color:#f59e0b;">${ea(e)} · ${a} T</span>`:`<span class="calc-hint">${ea(e)}</span>`}function ld(){return`
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
    </section>`}function cd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=ld();const a=e.querySelector('[data-role="lager-uebersicht"]'),n=e.querySelector('[data-role="lager-bewegungen"]'),r=e.querySelector('[data-role="lager-form"]'),i=e.querySelector("#lager-mittel-options"),l=e.querySelector('[data-role="lager-empty"]'),o=new Map,c=y=>{if(a){if(!y.length){a.innerHTML='<tr><td colspan="6" class="calc-hint" style="padding:14px;">Noch keine Mittel. Erfasse unten einen Zugang oder dokumentiere Anwendungen in „Neu erfassen".</td></tr>';return}a.innerHTML=y.map(g=>{const k=g.bestand<0?"#ef4444":g.bestand===0?"#f59e0b":"inherit",S=f(g.einheit||"");return`<tr>
          <td><span class="fw-semibold">${f(g.name)}</span>${g.kennr?`<span class="d-block calc-hint">${f(g.kennr)}</span>`:""}</td>
          <td class="calc-hint">${f(g.wirkstoff||"")}</td>
          <td class="text-end">${or(g.verbraucht)} ${S}<span class="d-block calc-hint">${g.anwendungen} Anw.</span></td>
          <td class="text-end fw-semibold" style="color:${k};">${or(g.bestand)} ${S}</td>
          <td>${od(g.zulEnde)}</td>
          <td class="calc-hint">${g.naechsterAblauf?ea(g.naechsterAblauf):""}</td>
        </tr>`}).join("")}},u=y=>{if(n){if(!y.length){n.innerHTML='<div class="calc-hint">Keine Bewegungen erfasst.</div>';return}n.innerHTML=y.map(g=>`
        <div class="d-flex align-items-center gap-2 py-1" style="border-bottom:1px solid var(--border-1);">
          <span class="badge" style="background:${g.typ==="zugang"?"#16a34a":"#64748b"};">${f(g.typ)}</span>
          <span class="flex-grow-1">${f(g.mittelName)} · <b>${or(g.menge)} ${f(g.einheit||"")}</b>${g.charge?` · Charge ${f(g.charge)}`:""}<span class="d-block calc-hint">${ea(g.datum)}${g.lieferant?" · "+f(g.lieferant):""}${g.ablauf?" · Ablauf "+ea(g.ablauf):""}</span></span>
          <button class="btn btn-sm" style="color:#ef4444;border:1px solid var(--border-1);background:transparent;" data-del="${wa(g.id)}" title="Löschen">×</button>
        </div>`).join(""),n.querySelectorAll("[data-del]").forEach(g=>{g.addEventListener("click",async()=>{const k=g.getAttribute("data-del")||"";try{await Co({id:k}),await Ve().catch(()=>{}),await p()}catch{T.warning("Löschen fehlgeschlagen.")}})})}},d=()=>{i&&(i.innerHTML=Array.from(o.entries()).sort((y,g)=>y[0].localeCompare(g[0],"de")).map(([y,g])=>`<option value="${wa(y)}" data-kennr="${wa(g.kennr||"")}" data-einheit="${wa(g.einheit||"")}" data-wirkstoff="${wa(g.wirkstoff||"")}"></option>`).join(""))},p=async()=>{if(de()!=="sqlite"){l&&(l.textContent="Bitte zuerst eine Datenbank öffnen.");return}try{const[y,g,k]=await Promise.all([ms(),Mo(),fs()]);c(y?.rows||[]),u(g?.rows||[]),o.clear(),(k?.rows||[]).forEach(S=>{S.name&&o.set(S.name,{kennr:S.kennr??null,einheit:S.einheit??null,wirkstoff:S.wirkstoff??null})}),(y?.rows||[]).forEach(S=>{S.name&&!o.has(S.name)&&o.set(S.name,{kennr:S.kennr??null,einheit:S.einheit??null,wirkstoff:S.wirkstoff??null})}),d()}catch(y){console.warn("[Lager] Laden fehlgeschlagen:",y)}};r?.addEventListener("submit",async y=>{if(y.preventDefault(),de()!=="sqlite"){T.warning("Bitte zuerst eine Datenbank öffnen.");return}const g=new FormData(r),k=String(g.get("mittel")||"").trim(),S=Number(String(g.get("menge")||"").replace(",","."));if(!k||!Number.isFinite(S)){T.warning("Mittel und Menge angeben.");return}const A=String(g.get("preis")||"").trim();try{await Po({mittelName:k,kennr:String(g.get("kennr")||"").trim()||null,wirkstoff:o.get(k)?.wirkstoff||null,typ:String(g.get("typ")||"zugang"),menge:S,einheit:String(g.get("einheit")||"").trim()||null,datum:String(g.get("datum")||"").trim()||null,charge:String(g.get("charge")||"").trim()||null,ablauf:String(g.get("ablauf")||"").trim()||null,lieferant:String(g.get("lieferant")||"").trim()||null,preis:A?Number(A.replace(",",".")):null}),await Ve().catch(()=>{}),r.reset(),T.success("Bewegung gespeichert."),await p()}catch{T.warning("Speichern fehlgeschlagen.")}});const m=e.querySelector('[name="mittel"]');m?.addEventListener("change",()=>{const y=o.get(m.value);if(!y)return;const g=e.querySelector('[name="einheit"]'),k=e.querySelector('[name="kennr"]');g&&y.einheit&&(g.value=y.einheit),k&&y.kennr&&(k.value=y.kennr)}),t.state.subscribe(y=>{y?.app?.activeSection==="lager"&&p()}),p()}const wt=["#ef4444","#3b82f6","#a855f7","#f59e0b","#06b6d4","#ec4899","#84cc16","#14b8a6"],dd=()=>({bedW:1.2,pathW:.4,rowSp:.5,inRowSp:.4,angle:0}),he=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";let X=null,et=null,K=null,lr=!1,Bt=[];function Zi(){if(!K)return 1;const e=K.getCenter().lat;return 156543.03392*Math.cos(e*Math.PI/180)/Math.pow(2,K.getZoom())}function ud(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=pd();const a=[];let n=null;const r=new Map;let i=null,l=null,o={sat:null,osm:null},c=!0,u=!0;function d(){const s=[];if(a.forEach(w=>{const x=w.latlngs||[];if(x.length<3)return;const O=x.map(xe=>[Number(xe[1]),Number(xe[0])]),H=O[0],te=O[O.length-1];(H[0]!==te[0]||H[1]!==te[1])&&O.push([H[0],H[1]]),s.push({type:"Feature",geometry:{type:"Polygon",coordinates:[O]},properties:{name:w.name||"",kultur:w.kultur||null,eppoCode:w.eppoCode||null,flaeche_m2:Math.round(w.result?.areaM2||0),flaeche_ha:Number(((w.result?.areaM2||0)/1e4).toFixed(4)),beete:w.result?.beds?.length||0,beetmeter_m:Math.round(w.result?.bedMeters||0),pflanzen:w.result?.plants||0,bettbreite_m:w.params?.bedW??null,wegbreite_m:w.params?.pathW??null,reihenabstand_m:w.params?.rowSp??null,pflanzabstand_m:w.params?.inRowSp??null,ausrichtung_grad:w.params?.angle??null}})}),(_e(t.state.getState().gps?.points)||[]).forEach(w=>{const x=Number(w.latitude),O=Number(w.longitude);if(!Number.isFinite(x)||!Number.isFinite(O))return;const H=Number(w.nutzflaecheQm);s.push({type:"Feature",geometry:{type:"Point",coordinates:[O,x]},properties:{name:w.name||"Standort",typ:"standort",flaeche_m2:Number.isFinite(H)&&H>0?Math.round(H):null,kind:w.kind||null}})}),!s.length){T.warning("Keine Flächen oder Standorte zum Exportieren.");return}const h={type:"FeatureCollection",name:"PSM Acker-Planer",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:s};try{const w=new Blob([JSON.stringify(h,null,2)],{type:"application/geo+json"}),x=URL.createObjectURL(w),O=document.createElement("a");O.href=x,O.download="acker-flaechen.geojson",document.body.appendChild(O),O.click(),O.remove(),setTimeout(()=>URL.revokeObjectURL(x),1e3),T.success(`${s.length} Objekt(e) als GeoJSON exportiert.`)}catch(w){console.error("[Acker] GeoJSON-Export fehlgeschlagen",w),T.error("Export fehlgeschlagen.")}}function p(){if(!X||!i)return;i.clearLayers(),(_e(t.state.getState().gps?.points)||[]).forEach(b=>{const h=Number(b.latitude),w=Number(b.longitude);if(!Number.isFinite(h)||!Number.isFinite(w))return;const x=Number(b.nutzflaecheQm),O=Number.isFinite(x)&&x>0?`${Math.round(x)} m²`:"",H=b.name||"Standort",te=X.marker([h,w],{icon:X.divIcon({className:"acker-standort",html:'<span class="acker-standort-dot"></span>',iconSize:[16,16],iconAnchor:[8,8]})});te.bindTooltip(`${f(H)}${O?" · "+O:""}`,{permanent:!0,direction:"top",className:"acker-standort-label",offset:[0,-9]});const xe=[`<b>${f(H)}</b>`,O?`Fläche: ${O}`:"",b.kind?f(String(b.kind)):""].filter(Boolean).join("<br>");te.bindPopup(xe),i.addLayer(te)})}const m=s=>e.querySelector(s),y=m('[data-role="acker-list"]'),g=m('[data-role="acker-empty"]'),k=m('[data-role="acker-totals"]'),S=m('[data-role="acker-map"]'),A=s=>({id:s.id,name:s.name,kultur:s.kultur||null,eppoCode:s.eppoCode||null,standortId:s.standortId||null,color:s.color,latlngs:s.latlngs,areaQm:s.result?.areaM2||0,bedW:s.params.bedW,pathW:s.params.pathW,rowSp:s.params.rowSp,inRowSp:s.params.inRowSp,angle:s.params.angle,beds:s.result?.beds?.length||0,bedMeters:s.result?.bedMeters||0,plants:s.result?.plants||0}),M=(s,b=!1)=>{if(de()!=="sqlite")return;const h=async()=>{try{const w=await Bo(A(s));w?.id&&(s.id=w.id),await Ve().catch(()=>{})}catch(w){console.warn("[Acker] Speichern fehlgeschlagen:",w)}};if(b){h();return}clearTimeout(r.get(s._key)),r.set(s._key,setTimeout(h,600))};function Z(s,b){const h=s.map(We=>[We[1],We[0]]);if(h.length<3)return{areaM2:0,beds:[],bedMeters:0,plants:0};const w=h[0],x=h[h.length-1];if((w[0]!==x[0]||w[1]!==x[1])&&h.push(w.slice()),h.length<4)return{areaM2:0,beds:[],bedMeters:0,plants:0};let O;try{O=et.polygon([h])}catch{return{areaM2:0,beds:[],bedMeters:0,plants:0}}const H=et.area(O),te=b.bedW+b.pathW;if(te<=0||b.bedW<=0||b.rowSp<=0||b.inRowSp<=0)return{areaM2:H,beds:[],bedMeters:0,plants:0};const xe=et.centroid(O),Se=et.transformRotate(O,-b.angle,{pivot:xe}),be=et.bbox(Se),ht=1/111320,da=te*ht,jn=b.bedW*ht,Mt=(be[2]-be[0])*.02+1e-4,ua=[];let Ya=0,pa=0,Xa=0;for(let We=be[1];We<be[3]&&Xa<4e3;We+=da,Xa++){const vt=Math.min(We+jn,be[3]),Gn=et.polygon([[[be[0]-Mt,We],[be[2]+Mt,We],[be[2]+Mt,vt],[be[0]-Mt,vt],[be[0]-Mt,We]]]);let yt=null;try{yt=et.intersect(Se,Gn)}catch{yt=null}if(!yt)continue;let Ct;try{Ct=et.transformRotate(yt,b.angle,{pivot:xe})}catch{continue}const ma=et.area(Ct);if(ma<Math.max(.4,b.bedW*.3))continue;const Un=ma/b.bedW,Vn=Math.max(1,Math.floor(b.bedW/b.rowSp)),Zn=Math.max(0,Math.floor(Un/b.inRowSp));Ya+=Un,pa+=Vn*Zn,ua.push({geo:Ct,lenM:Un,rows:Vn,perRow:Zn,plants:Vn*Zn,areaM2:ma})}return{areaM2:H,beds:ua,bedMeters:Ya,plants:pa}}const j=(s,b,h)=>({color:s.color,weight:b?3.5:2.5,fillColor:s.color,fillOpacity:h?0:b?.3:.18,dashArray:null}),me=(s,b,h)=>({color:"#ffffff",weight:h?1:.7,opacity:.9,fillColor:s.color,fillOpacity:h?.9:.78});function N(s){if(!u||s.bedsHidden)return!1;const b=Zi(),h=(s.params?.bedW||0)/b,w=(s.params?.pathW||0)/b,x=(s.params?.pathW||0)<=.001||w>=1.2;return h>=4&&x}function ne(s){s.outline&&(K.removeLayer(s.outline),s.outline=null),s.bedsLayer&&(K.removeLayer(s.bedsLayer),s.bedsLayer=null),s.label&&l&&(l.removeLayer(s.label),s.label=null),V(s)}function B(s){const b=!!s.editing;s.outline&&K.removeLayer(s.outline),s.bedsLayer&&(K.removeLayer(s.bedsLayer),s.bedsLayer=null),s.label&&l&&l.removeLayer(s.label),V(s);const h=s._key===n,w=N(s);s._lastDetail=w,w&&(s.bedsLayer=X.layerGroup(),(s.result?.beds||[]).forEach((x,O)=>{const H=X.geoJSON(x.geo,{style:me(s,O,h),bubblingMouseEvents:!1});H.bindTooltip(`Beet ${O+1} · ${he(x.lenM,1)} m · ${x.rows}×${he(x.perRow)} = ${he(x.plants)} Pfl.`,{sticky:!0}),H.on("click",()=>D(s._key)),H.on("contextmenu",te=>Ja(s,te,O+1)),H.addTo(s.bedsLayer)}),s.bedsLayer.addTo(K)),s.outline=X.polygon(s.latlngs,{...j(s,h,w),bubblingMouseEvents:!1}).addTo(K),s.outline.on("click",()=>D(s._key)),s.outline.on("dblclick",()=>Je(s)),s.outline.on("contextmenu",x=>Ja(s,x)),L(s,h),(h||b)&&z(s)}function L(s,b){if(!c||!l||!s.outline)return;let h;try{h=s.outline.getBounds().getCenter()}catch{return}const w=s.result?.plants||0,x=`<div class="acker-flabel${b?" sel":""}" style="--fc:${s.color}"><b>${f(s.name||"")}</b><i>${he(w)} Pfl.</i></div>`;s.label=X.marker(h,{interactive:!1,keyboard:!1,icon:X.divIcon({className:"acker-flabel-wrap",html:x,iconSize:[0,0]})}),l.addLayer(s.label)}function z(s){V(s),s.handles=s.latlngs.map((b,h)=>{const w=X.marker(b,{draggable:!0,icon:X.divIcon({className:"acker-vhandle"})}).addTo(K);return w.on("drag",x=>{s.latlngs[h]=[x.target.getLatLng().lat,x.target.getLatLng().lng],s.outline.setLatLngs(s.latlngs)}),w.on("dragend",()=>ke(s)),w.on("contextmenu",x=>la(s,h,x)),w}),s.editing=!0}function V(s){(s.handles||[]).forEach(b=>K.removeLayer(b)),s.handles=[],s.editing=!1}function re(){a.forEach(s=>B(s))}function ue(){a.forEach(s=>{N(s)!==s._lastDetail&&B(s)})}function ge(s,b){s.color=b;try{s.outline?.setStyle({color:b,fillColor:b})}catch{}if(s.bedsLayer)try{s.bedsLayer.eachLayer(w=>w.setStyle&&w.setStyle({fillColor:b}))}catch{}try{const w=s.label?.getElement?.()?.querySelector?.(".acker-flabel");w&&w.style.setProperty("--fc",b)}catch{}const h=y?.querySelector(".acker-field.sel .acker-swatch");h&&(h.style.background=b)}function Je(s){if(s.latlngs?.length)try{K.fitBounds(X.polygon(s.latlngs).getBounds(),{maxZoom:20,padding:[40,40]})}catch{}}function qe(){const s=a.filter(b=>b.latlngs?.length>=3);if(!s.length){T.info("Keine Flächen vorhanden.");return}try{let b=X.polygon(s[0].latlngs).getBounds();s.slice(1).forEach(h=>{b=b.extend(X.polygon(h.latlngs).getBounds())}),K.fitBounds(b,{maxZoom:19,padding:[40,40]})}catch{}}function ke(s){s.result=Z(s.latlngs,s.params),B(s),I(),M(s)}function Rt(s){if(Ze("app",b=>({...b,activeSection:"kultur"})),s?.id)try{window.dispatchEvent(new CustomEvent("psm:openKultur",{detail:{typ:"acker",id:String(s.id)}}))}catch{}else T.info("Fläche wird gespeichert – in der Kulturführung gleich wählbar.")}let ve=null;const Ye=()=>{ve&&(ve.remove(),ve=null,document.removeEventListener("pointerdown",Wa,!0),document.removeEventListener("keydown",ja,!0))},Wa=s=>{ve&&!ve.contains(s.target)&&Ye()},ja=s=>{s.key==="Escape"&&Ye()};function Kn(s,b){b.style.left="",b.style.right="",b.style.top="";const h=s.getBoundingClientRect(),w=b.getBoundingClientRect(),x=w.width||210,O=w.height||260;h.right+3+x>window.innerWidth-8&&(b.style.left="auto",b.style.right="calc(100% + 3px)");let H=-5;h.top+H+O>window.innerHeight-8&&(H=Math.min(-5,window.innerHeight-8-O-h.top)),h.top+H<8&&(H=8-h.top),b.style.top=H+"px"}function Ga(s,b){b.forEach(h=>{if(!h)return;if(h.sep){const x=document.createElement("div");x.className="acker-ctx-sep",s.appendChild(x);return}if(h.type==="swatchGrid"){const x=document.createElement("div");x.className="acker-ctx-swatches",h.colors.forEach(te=>{const xe=document.createElement("button");xe.type="button",xe.className="acker-sw"+(te===h.current?" on":""),xe.style.background=te,xe.title=te,xe.addEventListener("click",Se=>{Se.stopPropagation(),Ye(),h.onPick(te)}),x.appendChild(xe)});const O=document.createElement("label");O.className="acker-sw-custom",O.innerHTML=`<i class="bi bi-eyedropper"></i><input type="color" value="${h.current||"#3b82f6"}">`;const H=O.querySelector("input");H.addEventListener("input",te=>(h.onLive||h.onPick)(te.target.value)),H.addEventListener("change",te=>{h.onPick(te.target.value),Ye()}),x.appendChild(O),s.appendChild(x);return}const w=document.createElement("button");if(w.type="button",w.className="acker-ctx-item"+(h.danger?" danger":"")+(h.submenu?" has-sub":"")+(h.disabled?" disabled":""),w.innerHTML=`<span class="ic">${h.icon||""}</span><span class="lb">${f(h.label)}</span>`+(h.right?`<span class="rt">${f(h.right)}</span>`:"")+(h.submenu?'<span class="ch"><i class="bi bi-chevron-right"></i></span>':""),h.submenu){const x=document.createElement("div");x.className="acker-ctx-sub",Ga(x,h.submenu),w.appendChild(x),w.addEventListener("pointerenter",()=>Kn(w,x))}else h.disabled||w.addEventListener("click",x=>{x.stopPropagation(),h.keepOpen||Ye(),h.action?.()});s.appendChild(w)})}function ia(s,b,h,w){if(Ye(),ve=document.createElement("div"),ve.className="acker-ctx",w){const te=document.createElement("div");te.className="acker-ctx-title",te.textContent=w,ve.appendChild(te)}Ga(ve,h),document.body.appendChild(ve);const x=ve.getBoundingClientRect();let O=s,H=b;O+x.width>window.innerWidth-8&&(O=Math.max(8,window.innerWidth-x.width-8)),H+x.height>window.innerHeight-8&&(H=Math.max(8,window.innerHeight-x.height-8)),ve.style.left=O+"px",ve.style.top=H+"px",setTimeout(()=>{document.addEventListener("pointerdown",Wa,!0),document.addEventListener("keydown",ja,!0)},0)}const Kt=s=>{const b=s.originalEvent||s;return b&&X.DomEvent.preventDefault?.(b),s.originalEvent&&X.DomEvent.stop?.(s),{x:b.clientX,y:b.clientY}};function sa(s,b){s.params.angle=(Math.round(s.params.angle+b)%180+180)%180,ke(s),T.info(`Beete-Ausrichtung: ${s.params.angle}°`)}function Ua(s,b){s.color=b,B(s),I(),M(s)}function Va(s,b){s.kultur=b||null,s.eppoCode=Bt.find(h=>h.kultur===s.kultur)?.eppoCode||null,B(s),I(),M(s),T.success(b?`Kultur: ${b}`:"Kultur entfernt.")}function $e(s){s.bedsHidden=!s.bedsHidden,B(s),T.info(s.bedsHidden?"Beete ausgeblendet.":"Beete eingeblendet.")}function Wt(s){D(s._key),setTimeout(()=>{const b=y?.querySelector(".acker-field.sel .acker-name");b&&(b.focus(),b.select())},30)}function oa(s){const h=Zi()*18/111320,w={_key:"new-"+ ++Y,id:null,name:(s.name||"Fläche")+" (Kopie)",kultur:s.kultur,eppoCode:s.eppoCode,standortId:s.standortId,color:wt[(wt.indexOf(s.color)+1)%wt.length],latlngs:s.latlngs.map(x=>[x[0]+h,x[1]+h]),params:{...s.params},outline:null,bedsLayer:null,label:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(w),n=w._key,ke(w),M(w,!0),T.success("Fläche dupliziert.")}function Wn(s){const b=s.latlngs||[];if(b.length<3){T.warning("Fläche hat keine Geometrie.");return}const h=b.map(x=>[Number(x[1]),Number(x[0])]);(h[0][0]!==h[h.length-1][0]||h[0][1]!==h[h.length-1][1])&&h.push([h[0][0],h[0][1]]);const w={type:"FeatureCollection",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:[{type:"Feature",geometry:{type:"Polygon",coordinates:[h]},properties:{name:s.name||"",kultur:s.kultur||null,eppoCode:s.eppoCode||null,flaeche_m2:Math.round(s.result?.areaM2||0),beete:s.result?.beds?.length||0,beetmeter_m:Math.round(s.result?.bedMeters||0),pflanzen:s.result?.plants||0}}]};try{const x=new Blob([JSON.stringify(w,null,2)],{type:"application/geo+json"}),O=URL.createObjectURL(x),H=document.createElement("a");H.href=O,H.download=`${(s.name||"flaeche").replace(/[^\w\-]+/g,"_")}.geojson`,document.body.appendChild(H),H.click(),H.remove(),setTimeout(()=>URL.revokeObjectURL(O),1e3),T.success("Fläche als GeoJSON exportiert.")}catch{T.error("Export fehlgeschlagen.")}}async function Za(s){const b=s.result||{},h=[`Fläche: ${s.name||""}`,s.kultur?`Kultur: ${s.kultur}`:"",`Größe: ${he(b.areaM2||0)} m² (${he((b.areaM2||0)/1e4,3)} ha)`,`Beete: ${he(b.beds?.length||0)}`,`Beetmeter: ${he(b.bedMeters||0)} m`,`Pflanzen: ${he(b.plants||0)}`].filter(Boolean).join(`
`);try{await navigator.clipboard.writeText(h),T.success("Werte kopiert.")}catch{T.warning("Kopieren nicht möglich.")}}const Xe=s=>({icon:'<i class="bi bi-palette"></i>',label:"Farbe",submenu:[{type:"swatchGrid",colors:wt,current:s.color,onPick:b=>Ua(s,b),onLive:b=>ge(s,b)}]}),Qa=s=>({icon:'<i class="bi bi-flower1"></i>',label:"Kultur zuweisen",submenu:[{icon:'<i class="bi bi-x"></i>',label:"– keine –",action:()=>Va(s,null)},...Bt.length?[{sep:!0}]:[],...Bt.map(b=>({icon:b.kultur===s.kultur?'<i class="bi bi-check2"></i>':"",label:`${b.kultur}${b.anbau?" ("+b.anbau+")":""}`,action:()=>Va(s,b.kultur)}))]});function Ja(s,b,h){D(s._key);const{x:w,y:x}=Kt(b),O=!!s.editing;ia(w,x,[{icon:'<i class="bi bi-clipboard2-pulse"></i>',label:"Kulturführung öffnen",action:()=>Rt(s)},{icon:'<i class="bi bi-pencil"></i>',label:"Umbenennen",action:()=>Wt(s)},Qa(s),Xe(s),{sep:!0},{icon:'<i class="bi bi-arrow-clockwise"></i>',label:"Beete drehen +15°",keepOpen:!0,action:()=>sa(s,15)},{icon:'<i class="bi bi-arrow-counterclockwise"></i>',label:"Beete drehen −15°",keepOpen:!0,action:()=>sa(s,-15)},{icon:'<i class="bi bi-grid-3x3-gap"></i>',label:s.bedsHidden?"Beete einblenden":"Beete ausblenden",action:()=>$e(s)},{icon:'<i class="bi bi-bounding-box-circles"></i>',label:O?"Eckpunkte fertig":"Eckpunkte bearbeiten",action:()=>{O?V(s):z(s)}},{sep:!0},{icon:'<i class="bi bi-copy"></i>',label:"Duplizieren",action:()=>oa(s)},{icon:'<i class="bi bi-zoom-in"></i>',label:"Auf Fläche zoomen",action:()=>Je(s)},{icon:'<i class="bi bi-clipboard-data"></i>',label:"Werte kopieren",action:()=>Za(s)},{icon:'<i class="bi bi-download"></i>',label:"Als GeoJSON exportieren",action:()=>Wn(s)},{sep:!0},{icon:'<i class="bi bi-trash"></i>',label:"Löschen",danger:!0,action:()=>P(s._key)}],h?`${s.name||"Fläche"} · Beet ${h}`:s.name||"Fläche")}function la(s,b,h){const{x:w,y:x}=Kt(h);ia(w,x,[{icon:'<i class="bi bi-node-minus"></i>',label:"Eckpunkt löschen",disabled:s.latlngs.length<=3,action:()=>{s.latlngs.length<=3||(s.latlngs.splice(b,1),ke(s))}},{icon:'<i class="bi bi-check2"></i>',label:"Bearbeiten beenden",action:()=>V(s)}],`Eckpunkt ${b+1}`)}function ca(){!o.sat||!o.osm||(K.hasLayer(o.sat)?(K.removeLayer(o.sat),o.osm.addTo(K),T.info("Karte: OSM")):(K.removeLayer(o.osm),o.sat.addTo(K),T.info("Karte: Satellit")))}function v(s){const b=s.latlng,{x:h,y:w}=Kt(s);ia(h,w,[{icon:'<i class="bi bi-pencil-square"></i>',label:"Neue Fläche hier zeichnen",action:()=>{J(!0),Fe({latlng:b})}},{icon:'<i class="bi bi-crosshair"></i>',label:"Hierhin zentrieren",action:()=>K.panTo(b)},{sep:!0},{icon:'<i class="bi bi-arrows-fullscreen"></i>',label:"Alle Flächen anzeigen",disabled:!a.some(x=>x.latlngs?.length>=3),action:qe},{icon:'<i class="bi bi-layers"></i>',label:"Kartentyp wechseln (Satellit/OSM)",action:ca},{sep:!0},{icon:'<i class="bi bi-geo-alt"></i>',label:"Koordinaten kopieren",action:async()=>{try{await navigator.clipboard.writeText(`${b.lat.toFixed(6)}, ${b.lng.toFixed(6)}`),T.success("Koordinaten kopiert.")}catch{T.warning("Kopieren nicht möglich.")}}}],"Karte")}function E(s){return['<option value="">– Kultur –</option>'].concat(Bt.map(b=>{const h=`${b.kultur}${b.anbau?" ("+b.anbau+")":""}`;return`<option value="${f(b.kultur)}"${b.kultur===s?" selected":""}>${f(h)}</option>`})).join("")}function q(s){const b=_e(t.state.getState().gps?.points)||[];return['<option value="">– Standort –</option>'].concat(b.map(h=>`<option value="${f(h.id)}"${h.id===s?" selected":""}>${f(h.name||"")}</option>`)).join("")}function I(){if(!y||!g||!k)return;g.style.display=a.length?"none":"block",k.style.display=a.length?"block":"none",y.innerHTML="";let s=0,b=0,h=0,w=0;a.forEach(x=>{s+=x.result?.areaM2||0,b+=x.result?.beds?.length||0,h+=x.result?.bedMeters||0,w+=x.result?.plants||0;const O=x._key===n,H=document.createElement("div");H.className="acker-field"+(O?" sel open":""),H.innerHTML=`
        <div class="acker-fhead">
          <span class="acker-swatch" style="background:${x.color}"></span>
          <input class="acker-name" value="${f(x.name)}" />
          <span class="acker-stat">${he(x.result?.plants||0)} Pfl.</span>
        </div>
        <div class="acker-fbody">
          <div class="acker-grid">
            <label class="acker-fld span2">Kultur<select data-k="kultur">${E(x.kultur)}</select></label>
            <label class="acker-fld span2">Standort (für PSM)<select data-k="standortId">${q(x.standortId)}</select></label>
            <label class="acker-fld">Bettbreite (m)<input data-k="bedW" type="number" step="0.05" min="0.1" value="${x.params.bedW}"/></label>
            <label class="acker-fld">Wegbreite (m)<input data-k="pathW" type="number" step="0.05" min="0" value="${x.params.pathW}"/></label>
            <label class="acker-fld">Reihenabstand (m)<input data-k="rowSp" type="number" step="0.05" min="0.05" value="${x.params.rowSp}"/></label>
            <label class="acker-fld">Pflanzabstand (m)<input data-k="inRowSp" type="number" step="0.05" min="0.05" value="${x.params.inRowSp}"/></label>
            <label class="acker-fld span2">Ausrichtung der Beete: ${x.params.angle}°<input data-k="angle" type="range" min="0" max="180" step="5" value="${x.params.angle}"/></label>
          </div>
          <div class="acker-res">
            <div class="r"><span>Fläche</span><b>${he(x.result?.areaM2||0)} m² · ${he((x.result?.areaM2||0)/1e4,3)} ha</b></div>
            <div class="r"><span>Beete</span><b>${he(x.result?.beds?.length||0)}</b></div>
            <div class="r"><span>Beetmeter</span><b>${he(x.result?.bedMeters||0)} m</b></div>
            <div class="r"><span>Pflanzen</span><b>${he(x.result?.plants||0)}</b></div>
          </div>
          <div class="acker-actions">
            <label class="acker-colorbtn" title="Farbe wählen"><input type="color" data-act="color" value="${x.color}"><i class="bi bi-palette"></i></label>
            <button class="btn btn-sm acker-abtn" data-act="zoom" title="Auf Fläche zoomen"><i class="bi bi-zoom-in"></i></button>
            <button class="btn btn-sm acker-abtn" data-act="dup" title="Duplizieren"><i class="bi bi-copy"></i></button>
            <button class="btn btn-sm acker-abtn" data-act="rot" title="Beete drehen +15°"><i class="bi bi-arrow-clockwise"></i></button>
            <span style="flex:1"></span>
            <button class="btn btn-sm acker-abtn danger" data-act="del" title="Löschen"><i class="bi bi-trash"></i></button>
          </div>
          <div class="acker-hint"><i class="bi bi-mouse2"></i> Rechtsklick auf die Fläche für mehr Aktionen</div>
        </div>`,H.querySelector(".acker-fhead").addEventListener("click",Se=>{Se.target.classList.contains("acker-name")||D(x._key)}),H.querySelector(".acker-name").addEventListener("input",Se=>{x.name=Se.target.value,M(x)}),H.querySelectorAll("[data-k]").forEach(Se=>{Se.addEventListener("input",be=>{const ht=Se.dataset.k;if(ht==="kultur"){x.kultur=be.target.value||null,x.eppoCode=Bt.find(da=>da.kultur===x.kultur)?.eppoCode||null,M(x);return}if(ht==="standortId"){x.standortId=be.target.value||null,M(x);return}ht==="angle"?x.params.angle=+be.target.value:x.params[ht]=parseFloat(be.target.value)||0,ke(x)})}),H.querySelector('[data-act="del"]').addEventListener("click",()=>P(x._key)),H.querySelector('[data-act="zoom"]').addEventListener("click",()=>Je(x)),H.querySelector('[data-act="dup"]').addEventListener("click",()=>oa(x)),H.querySelector('[data-act="rot"]').addEventListener("click",()=>sa(x,15));const xe=H.querySelector('[data-act="color"]');xe.addEventListener("input",Se=>ge(x,Se.target.value)),xe.addEventListener("change",Se=>Ua(x,Se.target.value)),y.appendChild(H)}),k.querySelector('[data-t="area"]').textContent=he(s)+" m² · "+he(s/1e4,3)+" ha",k.querySelector('[data-t="beds"]').textContent=he(b),k.querySelector('[data-t="meters"]').textContent=he(h)+" m",k.querySelector('[data-t="plants"]').textContent=he(w)}function D(s){n=s,a.forEach(b=>B(b)),I()}async function P(s){const b=a.find(w=>w._key===s);if(!b)return;ne(b);const h=a.findIndex(w=>w._key===s);if(h>=0&&a.splice(h,1),n===s&&(n=null),I(),b.id&&de()==="sqlite")try{await Io({id:b.id}),await Ve().catch(()=>{})}catch{}}let C=!1,Q=[],ee=null,se=[],Y=0;function G(){ee&&(K.removeLayer(ee),ee=null),se.forEach(s=>K.removeLayer(s)),se=[],Q=[]}function J(s){C=s,m('[data-role="acker-banner"]').style.display=s?"block":"none",m('[data-role="acker-draw"]').style.display=s?"none":"block",K.getContainer().style.cursor=s?"crosshair":"",s?K.on("mousemove",F):(K.off("mousemove",F),G())}function le(s){const b=s?[...Q,[s.lat,s.lng]]:Q;if(b.length<2){ee&&(K.removeLayer(ee),ee=null);return}ee?ee.setLatLngs(b):ee=X.polygon(b,{interactive:!1,color:"#22c55e",weight:2.5,fillColor:"#22c55e",fillOpacity:.18,dashArray:"6 5"}).addTo(K)}function ye(s,b){const h=X.circleMarker(s,{radius:b?7:5,color:"#fff",fillColor:b?"#16a34a":"#22c55e",fillOpacity:1,weight:2,interactive:b,bubblingMouseEvents:!1}).addTo(K);b&&(h.bindTooltip("Zum Schließen anklicken",{direction:"top"}),h.on("click",w=>{X.DomEvent.stop(w),Q.length>=3&&we()})),se.push(h)}function Fe(s){if(C){if(Q.length>=3){const b=K.latLngToContainerPoint(X.latLng(Q[0][0],Q[0][1])),h=K.latLngToContainerPoint(s.latlng);if(b.distanceTo(h)<=14){we();return}}Q.push([s.latlng.lat,s.latlng.lng]),ye(s.latlng,Q.length===1),le()}}function F(s){!C||!Q.length||le(s.latlng)}function ce(){if(!Q.length)return;Q.pop();const s=se.pop();s&&K.removeLayer(s),le()}function we(){if(Q.length<3){T.warning("Mindestens 3 Punkte setzen.");return}const s={_key:"new-"+ ++Y,id:null,name:"Fläche "+(a.length+1),kultur:null,eppoCode:null,standortId:null,color:wt[a.length%wt.length],latlngs:Q.map(b=>b.slice()),params:dd(),outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(s),J(!1),n=s._key,ke(s),M(s,!0)}async function fe(){const s=m('[data-role="acker-q"]').value.trim();if(s)try{const h=await(await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+encodeURIComponent(s))).json();h[0]?K.setView([+h[0].lat,+h[0].lon],18):T.info("Nichts gefunden.")}catch{T.warning("Suche nicht verfügbar.")}}async function bt(){if(lr){setTimeout(()=>K&&K.invalidateSize(),60);return}lr=!0;try{await Lt(()=>Promise.resolve({}),__vite__mapDeps([2]));const w=await Lt(()=>import("./leaflet-src.BcflbDBd.js").then(x=>x.l),__vite__mapDeps([3,4]));X=w.default||w,et=await Lt(()=>import("./index.CPadEFgJ.js"),__vite__mapDeps([5,4]))}catch(w){console.warn("[Acker] Karten-Bibliotheken konnten nicht geladen werden:",w),g&&(g.textContent="Karte konnte nicht geladen werden (offline?)."),lr=!1;return}K=X.map(S,{doubleClickZoom:!1,zoomControl:!0,attributionControl:!0}).setView([47.818,8.976],17);const s=X.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:21,maxNativeZoom:19,attribution:"Tiles © Esri"}).addTo(K),b=X.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"});o={sat:s,osm:b},i=X.layerGroup(),p(),i.addTo(K),l=X.layerGroup().addTo(K),X.control.layers({Satellit:s,"Karte (OSM)":b},{"Freiland-Standorte":i},{position:"topright",collapsed:!0}).addTo(K);const h=X.Control.extend({options:{position:"topleft"},onAdd(){const w=X.DomUtil.create("div","leaflet-bar acker-toolbar");w.innerHTML='<a href="#" data-tb="fit" title="Alle Flächen anzeigen"><i class="bi bi-arrows-fullscreen"></i></a><a href="#" data-tb="labels" class="on" title="Beschriftungen ein/aus"><i class="bi bi-tag"></i></a><a href="#" data-tb="beds" class="on" title="Beete-Detail ein/aus"><i class="bi bi-grid-3x3"></i></a>',X.DomEvent.disableClickPropagation(w);const x=(O,H)=>{w.querySelector(O).addEventListener("click",te=>{te.preventDefault(),H()})};return x('[data-tb="fit"]',qe),x('[data-tb="labels"]',()=>{c=!c,w.querySelector('[data-tb="labels"]').classList.toggle("on",c),re()}),x('[data-tb="beds"]',()=>{u=!u,w.querySelector('[data-tb="beds"]').classList.toggle("on",u),re()}),w}});K.addControl(new h),K.on("click",Fe),K.on("contextmenu",w=>{if(C){X.DomEvent.preventDefault?.(w.originalEvent||w),ce();return}v(w)}),K.on("zoomend",ue),m('[data-role="acker-draw"]').addEventListener("click",()=>J(!0)),m('[data-role="acker-export"]')?.addEventListener("click",d),m('[data-role="acker-finish"]').addEventListener("click",we),m('[data-role="acker-cancel"]').addEventListener("click",()=>J(!1)),m('[data-role="acker-go"]').addEventListener("click",fe),m('[data-role="acker-q"]').addEventListener("keydown",w=>{w.key==="Enter"&&fe()}),document.addEventListener("keydown",w=>{C&&(w.key==="Backspace"&&(w.preventDefault(),ce()),w.key==="Enter"&&we(),w.key==="Escape"&&J(!1))}),await R(),await ie(),setTimeout(()=>K.invalidateSize(),60)}async function R(){if(de()==="sqlite")try{Bt=(await Ir())?.rows||[]}catch{Bt=[]}}async function ie(){if(de()==="sqlite")try{((await Br())?.rows||[]).forEach(h=>{const w={_key:"db-"+h.id,id:h.id,name:h.name,kultur:h.kultur,eppoCode:h.eppoCode,standortId:h.standortId,color:h.color||wt[a.length%wt.length],latlngs:h.latlngs||[],params:{bedW:h.bedW??1.2,pathW:h.pathW??.4,rowSp:h.rowSp??.5,inRowSp:h.inRowSp??.4,angle:h.angle??0},outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};w.result=Z(w.latlngs,w.params),a.push(w),B(w)}),I();const b=a.find(h=>h.latlngs?.length);if(b&&K)try{K.fitBounds(X.polygon(b.latlngs).getBounds(),{maxZoom:19,padding:[30,30]})}catch{}}catch(s){console.warn("[Acker] Flächen laden fehlgeschlagen:",s)}}t.state.subscribe(s=>{s?.app?.activeSection==="acker"&&bt()}),I()}function pd(){return`
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
    .acker-standort-dot{display:block;width:14px;height:14px;border-radius:50%;background:#f59e0b;border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.35)}
    .acker-standort-label{background:rgba(255,255,255,.92);color:#1f2937;border:1px solid #d97706;border-radius:6px;padding:1px 6px;font-size:11px;font-weight:600;box-shadow:0 1px 3px rgba(0,0,0,.25)}
    .acker-standort-label::before{display:none}
    /* Flächen-Beschriftung (Zentroid) */
    .acker-flabel-wrap{pointer-events:none!important}
    .acker-flabel{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:0;white-space:nowrap;padding:3px 9px;border-radius:9px;background:rgba(255,255,255,.93);border:1.5px solid var(--fc,#3b82f6);box-shadow:0 1px 5px rgba(0,0,0,.28);line-height:1.15}
    .acker-flabel b{font-weight:700;font-size:12px;color:#1f2937}
    .acker-flabel i{font-style:normal;color:#15803d;font-weight:600;font-size:10.5px}
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
          <div class="acker-banner" data-role="acker-banner">
            <b>Ecke für Ecke anklicken</b> – die Vorschau folgt dem Cursor. Zum Abschließen den <b>ersten Punkt</b> anklicken (oder <b>Enter</b>).<br>
            <span style="opacity:.8">Rechtsklick oder <b>Backspace</b> = letzten Punkt zurück · <b>Esc</b> = abbrechen.</span>
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
  </section>`}function xa(e){return e.typ+":"+e.id}function md(e){if(!Array.isArray(e)||e.length<3)return null;let t=0,a=0,n=0;const r=e.length,i=e[r-1],l=e[0],c=i&&l&&Number(i[0])===Number(l[0])&&Number(i[1])===Number(l[1])?r-1:r;for(let u=0;u<c;u++){const d=Number(e[u]?.[0]),p=Number(e[u]?.[1]);Number.isFinite(d)&&Number.isFinite(p)&&(t+=d,a+=p,n++)}return n?{lat:t/n,lon:a/n}:null}async function Qi(e){const t=[];(_e(e.state.getState().gps?.points)||[]).forEach(n=>{if(n?.kind!=="gewaechshaus")return;const r=Number(n.latitude),i=Number(n.longitude),l=Number(n.nutzflaecheQm);t.push({typ:"haus",id:String(n.id),name:n.name||"Gewächshaus",areaQm:Number.isFinite(l)&&l>0?l:null,lat:Number.isFinite(r)?r:null,lon:Number.isFinite(i)?i:null,color:null})});try{((await Br())?.rows||[]).forEach(r=>{const i=md(r.latlngs),l=Number(r.areaQm);t.push({typ:"acker",id:String(r.id),name:r.name||"Fläche",areaQm:Number.isFinite(l)&&l>0?l:null,lat:i?.lat??null,lon:i?.lon??null,color:r.color||null})})}catch{}return t}const fd="Wetterdaten: Open-Meteo (CC BY 4.0)",gd="psm.weather.";function bd(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function hd(e,t){return gd+e.toFixed(3)+"_"+t.toFixed(3)}function vd(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch{return null}}function yd(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function wd(e){return!!e&&e.slice(0,10)===bd()}function xd(e,t,a){const n=e?.time||[],r=e?.temperature_2m_max||[],i=e?.temperature_2m_min||[],l=e?.precipitation_sum||[],o=e?.sunshine_duration||[],c=Ln(new Date),u=ni(c.year,c.week),d=new Map;for(let m=0;m<n.length;m++){const y=us(n[m]);if(!y)continue;const{year:g,week:k}=Ln(y),S=ni(g,k);let A=d.get(S);A||(A={key:S,year:g,week:k,tmaxSum:0,tmaxN:0,tminSum:0,tminN:0,precip:0,precipN:0,sun:0,sunN:0,days:0},d.set(S,A)),Number.isFinite(r[m])&&(A.tmaxSum+=r[m],A.tmaxN++),Number.isFinite(i[m])&&(A.tminSum+=i[m],A.tminN++),Number.isFinite(l[m])&&(A.precip+=l[m],A.precipN++),Number.isFinite(o[m])&&(A.sun+=o[m],A.sunN++),A.days++}const p=[...d.values()].sort((m,y)=>m.key<y.key?-1:m.key>y.key?1:0).map(m=>{const y=m.tmaxN?m.tmaxSum/m.tmaxN:null,g=m.tminN?m.tminSum/m.tminN:null;return{weekKey:m.key,year:m.year,week:m.week,tMaxAvg:y,tMinAvg:g,tMeanAvg:y!=null&&g!=null?(y+g)/2:y,precipSum:m.precipN?m.precip:null,sunHours:m.sunN?m.sun/3600:null,days:m.days,isForecast:m.key>=u}});return{lat:t,lon:a,fetchedAt:new Date().toISOString(),weeks:p}}async function kd(e,t){if(!Number.isFinite(e)||!Number.isFinite(t))return{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const a=hd(e,t),n=vd(a);if(n&&wd(n.fetchedAt)&&n.weeks?.length)return n;if(typeof navigator<"u"&&navigator.onLine===!1)return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const r="https://api.open-meteo.com/v1/forecast?latitude="+e.toFixed(4)+"&longitude="+t.toFixed(4)+"&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunshine_duration&timezone=Europe%2FBerlin&past_days=92&forecast_days=16";try{const i=await fetch(r);if(!i.ok)throw new Error("HTTP "+i.status);const l=await i.json(),o=xd(l.daily,e,t);return o.weeks.length&&yd(a,o),o}catch{return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]}}}const Bn={mechanisch:{label:"Mechanisch",icon:"bi-tools",color:"#2563eb"},chemisch_psm:{label:"Pflanzenschutz",icon:"bi-droplet-half",color:"#dc2626"},duengung:{label:"Düngung",icon:"bi-flower1",color:"#b45309"},nuetzlinge:{label:"Nützlinge",icon:"bi-bug",color:"#7c3aed"},bewaesserung:{label:"Bewässerung",icon:"bi-moisture",color:"#0891b2"},monitoring:{label:"Monitoring",icon:"bi-eye",color:"#475569"},sonstiges:{label:"Sonstiges",icon:"bi-three-dots",color:"#64748b"}},Sd=["mechanisch","chemisch_psm","duengung","nuetzlinge","bewaesserung","monitoring","sonstiges"];function Ws(e){return Bn[e]||Bn.sonstiges}const Ed={geplant:{label:"geplant",color:"#64748b"},aktiv:{label:"aktiv",color:"#16a34a"},abgeschlossen:{label:"abgeschlossen",color:"#94a3b8"}},Tt=["#16a34a","#0891b2","#7c3aed","#d97706","#dc2626","#0d9488","#65a30d","#db2777"],Ld=/^#[0-9a-fA-F]{3,8}$/;function js(e){return typeof e=="string"&&Ld.test(e.trim())?e.trim():null}function wn(e,t=0){return js(e&&e.color)||Tt[t%Tt.length]}function tt(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function Ee(e){if(!e)return NaN;const t=String(e).slice(0,10).replace(/-/g,""),a=Number(t);return Number.isFinite(a)?a:NaN}function cn(e){const t=[...e||[]].sort((i,l)=>(Ee(i.pflanzDatum)||0)-(Ee(l.pflanzDatum)||0)),a=Number(tt().replace(/-/g,""));let n=t.find(i=>i.status==="aktiv")||null;if(!n){const i=t.filter(l=>l.status!=="abgeschlossen"&&Ee(l.pflanzDatum)<=a&&(!l.ernteDatum||Ee(l.ernteDatum)>=a));n=i.length?i[i.length-1]:null}let r=t.filter(i=>i!==n&&i.status!=="abgeschlossen"&&Ee(i.pflanzDatum)>a).sort((i,l)=>(Ee(i.pflanzDatum)||0)-(Ee(l.pflanzDatum)||0))[0]||null;return r||(r=t.filter(i=>i!==n&&i.status==="geplant").sort((i,l)=>(Ee(i.pflanzDatum)||0)-(Ee(l.pflanzDatum)||0))[0]||null),{current:n,next:r,all:t}}const Gs=["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];function Us(e,t){const a=[];let n=e.getFullYear(),r=e.getMonth();const i=t.getFullYear(),l=t.getMonth();let o=0;for(;(n<i||n===i&&r<=l)&&o<60;)a.push({y:n,m:r}),r++,r>11&&(r=0,n++),o++;return a}function He(e,t){if(!t||!e.length)return null;const a=new Date(String(t).slice(0,10)+"T00:00:00");if(isNaN(a.getTime()))return null;const n=e.length,r=a.getFullYear()*12+a.getMonth(),i=e[0].y*12+e[0].m,l=e[n-1].y*12+e[n-1].m;if(r<i)return 0;if(r>l)return 1;const o=r-i,c=new Date(a.getFullYear(),a.getMonth()+1,0).getDate();return(o+(a.getDate()-1)/c)/n}const Dd={anzucht:{label:"Anzucht (vorziehen)",short:"Anzucht"},direkt:{label:"Direktsaat",short:"Direkt"}},$d=["Pflanzen","m²","Beete","lfd. m","g Saatgut"];function ct(e,t){if(!e)return null;const a=new Date(String(e).slice(0,10)+"T00:00:00");return isNaN(a.getTime())?null:(a.setDate(a.getDate()+Math.round(Number(t)||0)),a.getFullYear()+"-"+String(a.getMonth()+1).padStart(2,"0")+"-"+String(a.getDate()).padStart(2,"0"))}function Ad(e,t,a){if(!e||!a)return{};const r=(e.anbauMethode==="anzucht"?"anzucht":"direkt")==="anzucht"&&Number(e.anzuchtTage)||0,i=Number(e.kulturTage)||0,l=Number(e.ernteTage)||0;let o;t==="aussaat"?o=ct(a,r):t==="ernte"?o=i?ct(a,-i):a:o=a;const c=ct(o,-r),u=i?ct(o,i):null,d=u?ct(u,l):null;return{aussaatDatum:c,pflanzDatum:o,ernteVon:u,ernteBis:d}}function zd(e,t){return e?{aussaatDatum:ct(e.aussaatDatum,t),pflanzDatum:ct(e.pflanzDatum,t),ernteVon:ct(e.ernteVon,t),ernteBis:ct(e.ernteBis,t)}:{}}function dn(e,t){if(!t||!Array.isArray(e))return null;const a=String(t).trim().toLowerCase();return a&&(e.find(n=>String(n.name||"").trim().toLowerCase()===a)||e.find(n=>{const r=String(n.name||"").trim().toLowerCase();return r&&(r.startsWith(a)||a.startsWith(r))}))||null}const cr=66;function Pd(e,t){const{units:a,anbau:n,mass:r,onSelect:i,onContext:l}=t;if(!a||!a.length){e.innerHTML='<div class="km-empty"><i class="bi bi-calendar3"></i><p>Noch keine Flächen für den Anbauplan.</p></div>';return}const o=new Date;let c=new Date(o.getFullYear(),o.getMonth()-1,1),u=new Date(o.getFullYear(),o.getMonth()+4,1);const d=N=>{if(!N)return;const ne=new Date(String(N).slice(0,10)+"T00:00:00");isNaN(ne.getTime())||(ne<c&&(c=new Date(ne.getFullYear(),ne.getMonth(),1)),ne>u&&(u=new Date(ne.getFullYear(),ne.getMonth(),1)))};(n||[]).forEach(N=>{d(N.pflanzDatum),d(N.ernteBis||N.ernteDatum),d(N.ernteVon)}),(r||[]).forEach(N=>d(N.planDatum||N.erledigtDatum));const p=Us(c,u),m=p.length,y=m*cr,g=N=>N==null?null:(N*100).toFixed(2)+"%",k=He(p,o.toISOString()),S=a.filter(N=>N.typ==="haus"),A=a.filter(N=>N.typ==="acker");let M="";p.forEach((N,ne)=>{const B=N.y===o.getFullYear()&&N.m===o.getMonth();M+=`<div class="kb2-mo${B?" cur":""}" style="width:${cr}px">${Gs[N.m]}${N.m===0?" "+String(N.y).slice(2):""}</div>`});const Z=N=>{const ne=(n||[]).filter(z=>z.flaecheTyp===N.typ&&String(z.flaecheId)===String(N.id)),B=(r||[]).filter(z=>z.flaecheTyp===N.typ&&String(z.flaecheId)===String(N.id));let L="";return ne.forEach((z,V)=>{const re=He(p,z.pflanzDatum);let ue=He(p,z.ernteBis||z.ernteDatum||z.pflanzDatum);if(re==null)return;(ue==null||ue<=re)&&(ue=Math.min(1,re+.5/m));const ge=wn(z,V),Je=z.status==="geplant";L+=`<div class="kb2-bar${Je?" planned":""}" title="${f(z.kultur||"Kultur")}" style="left:${g(re)};width:${((ue-re)*100).toFixed(2)}%;--cc:${f(ge)}"><span>${f(z.kultur||"")}</span></div>`;const qe=He(p,z.ernteVon),ke=He(p,z.ernteBis);qe!=null&&ke!=null&&ke>qe&&(L+=`<div class="kb2-harvest" title="Ernte" style="left:${g(qe)};width:${((ke-qe)*100).toFixed(2)}%;--cc:${f(ge)}"></div>`)}),B.forEach(z=>{const V=z.status==="erledigt"?z.erledigtDatum||z.planDatum:z.planDatum||z.erledigtDatum,re=He(p,V);if(re==null)return;const ue=Ws(z.art),ge=z.status==="erledigt";L+=`<span class="kb2-mk${ge?" done":""}" title="${f(ue.label+(z.notes?": "+z.notes:""))}" style="left:${g(re)};--mc:${ue.color}"></span>`}),k!=null&&(L+=`<div class="kb2-today" style="left:${g(k)}"></div>`),L},j=N=>{const ne=N.typ+":"+N.id,B=(n||[]).filter(V=>V.flaecheTyp===N.typ&&String(V.flaecheId)===String(N.id)),L=B.find(V=>V.status==="aktiv")||B.find(V=>V.status!=="abgeschlossen"),z=L?f(L.kultur||""):"frei";return`<div class="kb2-row" data-ukey="${ne}">
      <div class="kb2-label" title="${f(N.name)}"><b>${f(N.name)}</b><small>${z}</small></div>
      <div class="kb2-track" style="width:${y}px">${Z(N)}</div>
    </div>`},me=(N,ne)=>ne.length?`<div class="kb2-grp"><div class="kb2-grp-l">${f(N)}</div><div class="kb2-grp-t" style="width:${y}px"></div></div>`+ne.map(j).join(""):"";e.innerHTML=`
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
      .kb2-track{position:relative;height:38px;border-top:1px solid var(--border-1);background-image:linear-gradient(to right,var(--border-1) 1px,transparent 1px);background-size:${cr}px 100%}
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
      <div class="kb2-head"><div class="kb2-corner">Fläche</div><div class="kb2-axis">${M}</div></div>
      ${me("Gewächshäuser",S)}
      ${me("Freiland",A)}
    </div>
    <div class="kb2-legend">
      <span class="lg"><span class="d" style="background:var(--text-secondary,#475569)"></span>erledigt</span>
      <span class="lg"><span class="d" style="background:var(--surface-1);box-shadow:inset 0 0 0 2px var(--text-secondary,#475569)"></span>geplant</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:#9FE1CB;display:inline-block"></span>Kultur</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:repeating-linear-gradient(45deg,#bbb,#bbb 2px,transparent 2px,transparent 4px);display:inline-block"></span>Ernte-Zeitraum</span>
      <span class="kb2-hint"><i class="bi bi-mouse2"></i> Klick = öffnen · Rechtsklick = planen</span>
    </div>`,e.querySelectorAll(".kb2-row").forEach(N=>{const ne=N.dataset.ukey;N.querySelector(".kb2-label")?.addEventListener("click",()=>i&&i(ne)),N.addEventListener("contextmenu",B=>{B.preventDefault(),l&&l(ne,B.clientX,B.clientY)})})}const Md=[{art:"bewaesserung",label:"Gießen",icon:"bi-droplet"},{art:"mechanisch",label:"Hacken",icon:"bi-tools"},{art:"duengung",label:"Düngen",icon:"bi-flower1"},{art:"nuetzlinge",label:"Nützlinge",icon:"bi-bug"},{art:"chemisch_psm",label:"Pflanzenschutz",icon:"bi-droplet-half"},{art:"monitoring",label:"Kontrolle",icon:"bi-eye"},{art:"sonstiges",label:"Sonstiges",icon:"bi-three-dots"}],Cd=["Jan.","Feb.","März","Apr.","Mai","Juni","Juli","Aug.","Sep.","Okt.","Nov.","Dez."];function Id(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Bd();let a=[],n=[],r=[],i=[],l=[],o=null,c="plan",u=!1,d=!1;const p={};let m=null;const y=v=>e.querySelector(v),g=()=>y('[data-role="list"]'),k=()=>y('[data-role="detail"]'),S=()=>y('[data-role="kpis"]'),A=()=>y('[data-role="board-view"]'),M=()=>y('[data-role="flaechen-view"]'),Z=()=>de()==="sqlite",j=()=>{Z()&&Ve().catch(()=>{})},me=(v,E)=>v.filter(q=>q.flaecheTyp===E.typ&&String(q.flaecheId)===String(E.id)),N=v=>a.find(E=>xa(E)===v)||null,ne=(v,E=0)=>js(v.color)||Tt[E%Tt.length];async function B(){if(a=await Qi(t),Z()){try{n=(await ri())?.rows||[]}catch{n=[]}try{r=(await Yn())?.rows||[]}catch{r=[]}try{i=(await Ir())?.rows||[]}catch{i=[]}try{l=(await No())?.rows||[]}catch{l=[]}if(!d){d=!0;try{const v=await ii();v?.imported&&(r=(await Yn())?.rows||[],T.info(`${v.imported} Pflanzenschutz-Eintrag(e) übernommen.`),j())}catch{}}}!o&&a.length&&(o=xa(a[0])),V(),z()}async function L(){if(Z()){try{n=(await ri())?.rows||[]}catch{}try{r=(await Yn())?.rows||[]}catch{}}}async function z(){const v=o?N(o):null;if(!v||v.lat==null||v.lon==null)return;const E=xa(v);if(!p[E]){p[E]={loading:!0,weeks:[]};try{p[E]=await kd(v.lat,v.lon)}catch{p[E]={weeks:[]}}o===E&&ke()}}function V(){ue(),c==="plan"?(M().style.display="none",A().style.display="block",Pd(A(),{units:a,anbau:n,mass:r,onSelect:v=>{o=v,re("flaechen"),z()},onContext:(v,E,q)=>Za(v,E,q)})):(A().style.display="none",M().style.display="grid",Je(),ke()),e.querySelectorAll(".km-modebtn").forEach(v=>v.classList.toggle("active",v.dataset.mode===c))}function re(v){c=v,V()}function ue(){const v=S();if(!v)return;a.filter(D=>D.typ==="haus").length,a.filter(D=>D.typ==="acker").length;let E=0,q=null;a.forEach(D=>{const{current:P,next:C}=cn(me(n,D));P&&E++,C?.pflanzDatum&&(!q||Ee(C.pflanzDatum)<Ee(q.pflanzDatum))&&(q=C)});const I=r.filter(D=>D.status==="geplant").length;v.innerHTML=`
      ${ge(String(a.length),"Flächen")}
      ${ge(String(E),"Kulturen aktiv")}
      ${ge(String(I),"Aufgaben offen")}
      ${ge(q?fa(ve(q.pflanzDatum)):"–","Nächste Pflanzung")}
      <button class="km-psm" data-role="psm-import" title="Bestehende Pflanzenschutz-Einträge übernehmen"><i class="bi bi-arrow-down-circle"></i><span>PSM übernehmen</span></button>`,v.querySelector('[data-role="psm-import"]')?.addEventListener("click",sa)}const ge=(v,E)=>`<div class="km-kpi"><div class="km-kpi-v">${v}</div><div class="km-kpi-l">${f(E)}</div></div>`;function Je(){const v=g();if(!v)return;if(!a.length){v.innerHTML='<div class="km-empty"><i class="bi bi-geo-alt"></i><p>Noch keine Flächen.<br>Gewächshäuser unter Einstellungen, Freiland im Reiter „Karte".</p></div>';return}const E=a.filter(D=>D.typ==="haus"),q=a.filter(D=>D.typ==="acker"),I=(D,P)=>P.length?`<div class="km-grp">${f(D)}</div>`+P.map(qe).join(""):"";v.innerHTML=I("Gewächshäuser",E)+I("Freiland",q),v.querySelectorAll("[data-ukey]").forEach(D=>{D.addEventListener("click",()=>{o=D.dataset.ukey,Je(),ke(),z()}),D.addEventListener("contextmenu",P=>{P.preventDefault(),Za(D.dataset.ukey,P.clientX,P.clientY)})})}function qe(v,E){const q=xa(v),{current:I}=cn(me(n,v));return`<div class="km-row${q===o?" sel":""}" data-ukey="${q}">
      <span class="km-dot" style="background:${f(I?wn(I):ne(v,E))}"></span>
      <div class="km-row-main"><div class="km-row-name">${f(v.name)}</div>
      <div class="km-row-sub">${I?`<span class="crop">${f(I.kultur||"Kultur")}</span>`:'<span class="free">frei</span>'}</div></div>
    </div>`}function ke(){const v=k();if(!v)return;const E=o?N(o):null;if(!E){v.innerHTML='<div class="km-empty"><i class="bi bi-hand-index"></i><p>Fläche links wählen.</p></div>';return}const q=me(n,E),I=me(r,E),{current:D,next:P}=cn(q),C=p[xa(E)],Q=E.typ==="haus"?"Gewächshaus":"Freiland",ee=E.areaQm?`${Math.round(E.areaQm).toLocaleString("de-DE")} m²`:"";let se;if(D){const G=D.pflanzDatum?`seit ${Ye(D.pflanzDatum)} · ${fa(ve(D.pflanzDatum))}`:"",J=Kn(D);se=`<div class="km-hero active" style="--cc:${f(wn(D))}">
        <div class="km-hero-ic"><i class="bi bi-flower2"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop">${f(D.kultur||"Kultur")}</div><div class="km-hero-sub">${f(G+J+Ga(D))}</div></div>
        <button class="km-hero-edit" data-edit-crop="current" title="Bearbeiten"><i class="bi bi-pencil"></i></button>
      </div>`}else se=`<div class="km-hero empty">
        <div class="km-hero-ic gray"><i class="bi bi-circle"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop gray">Fläche ist frei</div><div class="km-hero-sub">Noch keine Kultur eingetragen</div></div>
        <button class="km-hero-add" data-edit-crop="current"><i class="bi bi-plus-lg"></i> Kultur setzen</button>
      </div>`;const Y=P?`<div class="km-next"><i class="bi bi-arrow-right-short"></i>Danach geplant: <b>${f(P.kultur||"Kultur")}</b> · ab ${fa(ve(P.pflanzDatum))} <button class="km-next-edit" data-edit-crop="next" title="Bearbeiten"><i class="bi bi-pencil"></i></button></div>`:D?'<button class="km-next-add" data-edit-crop="next"><i class="bi bi-plus"></i> Nächste Kultur planen</button>':"";v.innerHTML=`
      <div class="km-head"><div class="km-head-l"><span class="km-head-name">${f(E.name)}</span><span class="km-head-badge">${Q}${ee?" · "+ee:""}</span></div>
        <button class="km-headbtn" data-act="map"><i class="bi bi-map"></i> Auf Karte</button></div>
      ${se}
      ${Y}
      ${ia(q,I)}
      <div class="km-tasks-head"><span>Aufgaben</span><button class="km-addtask" data-act="add-massnahme"><i class="bi bi-plus-lg"></i> Aufgabe</button></div>
      ${Rt(I)}
      <div class="km-foot">
        <span class="km-weather">${ja(C)}</span>
        <button class="km-plan" data-act="plan"><i class="bi bi-calendar3"></i> Saison &amp; Plan</button>
      </div>
      <div class="km-attr">${f(fd)}${C?.stale?" · offline":""}</div>`,v.querySelector('[data-act="map"]')?.addEventListener("click",()=>Kt()),v.querySelector('[data-act="plan"]')?.addEventListener("click",()=>re("plan")),v.querySelector('[data-act="add-massnahme"]')?.addEventListener("click",()=>ca(E,null,D)),v.querySelectorAll("[data-edit-crop]").forEach(G=>G.addEventListener("click",()=>{const J=G.dataset.editCrop;la(E,J==="current"?D:P,J,q.length)})),v.querySelectorAll("[data-m-done]").forEach(G=>G.addEventListener("click",J=>{J.stopPropagation(),Ua(G.dataset.mDone)})),v.querySelectorAll("[data-m-del]").forEach(G=>G.addEventListener("click",J=>{J.stopPropagation(),Va(G.dataset.mDel)})),v.querySelectorAll("[data-m-edit]").forEach(G=>G.addEventListener("click",()=>{const J=r.find(le=>le.id===G.dataset.mEdit);ca(E,J,D)}))}function Rt(v){const E=v.filter(C=>C.status==="geplant").sort((C,Q)=>(Ee(C.planDatum)||9e15)-(Ee(Q.planDatum)||9e15)),q=v.filter(C=>C.status==="erledigt").sort((C,Q)=>(Ee(Q.erledigtDatum)||0)-(Ee(C.erledigtDatum)||0)).slice(0,6),I=Number(tt().replace(/-/g,"")),D=(C,Q)=>{const ee=Ws(C.art),se=Q?C.erledigtDatum:C.planDatum,Y=!Q&&se&&Ee(se)<I,G=Q?Ye(se):Wa(se,Y),J=C.notes||ee.label,le=C.historyId?'<span class="km-pill">PSM</span>':"",ye=[];C.notes&&ye.push(f(ee.label)),C.mittel&&ye.push(f(C.mittel)),C.menge!=null&&ye.push(`${C.menge}${C.einheit?" "+f(C.einheit):""}`);const Fe=ye.join(" · ");return`<div class="km-task${Q?" done":""}" data-m-edit="${C.id}">
        <span class="km-task-ic" style="--mc:${ee.color}"><i class="bi ${ee.icon}"></i></span>
        <div class="km-task-main"><div class="km-task-title">${f(J)}${le}</div>${Fe?`<div class="km-task-sub">${Fe}</div>`:""}</div>
        <span class="km-task-when${Y?" overdue":""}">${G}</span>
        ${Q?`<button class="km-tbtn del" data-m-del="${C.id}" title="Löschen"><i class="bi bi-trash"></i></button>`:`<button class="km-check" data-m-done="${C.id}" title="Erledigt"><i class="bi bi-check-lg"></i></button>`}
      </div>`};let P="";return E.length?P+=E.map(C=>D(C,!1)).join(""):P+='<div class="km-tasks-none"><i class="bi bi-check2-circle"></i> Nichts offen</div>',q.length&&(P+='<div class="km-done-h">Erledigt</div>'+q.map(C=>D(C,!0)).join("")),`<div class="km-tasks">${P}</div>`}function ve(v){const E=new Date(String(v).slice(0,10)+"T00:00:00");return isNaN(E.getTime())?0:Ln(E).week}function Ye(v){const E=new Date(String(v).slice(0,10)+"T00:00:00");return isNaN(E.getTime())?"":`${E.getDate()}. ${Cd[E.getMonth()]}`}function Wa(v,E){if(!v)return"offen";const q=new Date(String(v).slice(0,10)+"T00:00:00");if(isNaN(q.getTime()))return"offen";const I=new Date;I.setHours(0,0,0,0);const D=Math.round((q.getTime()-I.getTime())/864e5);return D===0?"heute":D===1?"morgen":E?"überfällig":Ye(v)}function ja(v){if(!v||!v.weeks?.length)return v?.loading?"Wetter lädt…":"";const{year:E,week:q}=Ln(new Date),I=v.weeks.find(C=>C.year===E&&C.week===q)||v.weeks.find(C=>!C.isForecast);if(!I)return"";const D=I.tMaxAvg!=null?Math.round(I.tMaxAvg)+"°":"–",P=I.precipSum!=null?Math.round(I.precipSum)+" mm":"–";return`<i class="bi bi-cloud-sun"></i> Diese Woche: ${D} · ${P} Regen`}function Kn(v){const E=v.ernteVon?fa(ve(v.ernteVon)):null,q=v.ernteBis||v.ernteDatum,I=q?fa(ve(q)):null;return E&&I?` · Ernte ${E}–${I}`:I?` · Ernte ~${I}`:E?` · Ernte ab ${E}`:""}function Ga(v){return!v||v.menge==null||v.menge===""?"":` · ${v.menge} ${v.einheit||"Pflanzen"}`}function ia(v,E){if(!v.length&&!E.length)return"";const q=new Date;let I=new Date(q.getFullYear(),q.getMonth()-1,1),D=new Date(q.getFullYear(),q.getMonth()+4,1);const P=F=>{if(!F)return;const ce=new Date(String(F).slice(0,10)+"T00:00:00");isNaN(ce.getTime())||(ce<I&&(I=new Date(ce.getFullYear(),ce.getMonth(),1)),ce>D&&(D=new Date(ce.getFullYear(),ce.getMonth(),1)))};v.forEach(F=>{P(F.pflanzDatum),P(F.ernteBis||F.ernteDatum),P(F.ernteVon)}),E.forEach(F=>P(F.planDatum||F.erledigtDatum));const C=Us(I,D),Q=C.length,ee=`background-size:${(100/Q).toFixed(4)}% 100%`,se=F=>F==null?null:(F*100).toFixed(2)+"%",Y=He(C,q.toISOString()),G=Y!=null?`<div class="ks-today" style="left:${se(Y)}"></div>`:"",J=C.map(F=>`<div class="ks-mo${F.y===q.getFullYear()&&F.m===q.getMonth()?" cur":""}">${Gs[F.m]}</div>`).join("");let le="";v.forEach((F,ce)=>{const we=He(C,F.pflanzDatum);let fe=He(C,F.ernteBis||F.ernteDatum||F.pflanzDatum);if(we==null)return;(fe==null||fe<=we)&&(fe=Math.min(1,we+.5/Q));const bt=wn(F,ce);le+=`<div class="ks-bar${F.status==="geplant"?" planned":""}" style="left:${se(we)};width:${((fe-we)*100).toFixed(2)}%;--cc:${f(bt)}"><span>${f(F.kultur||"")}</span></div>`;const R=He(C,F.ernteVon),ie=He(C,F.ernteBis);R!=null&&ie!=null&&ie>R&&(le+=`<div class="ks-harvest" style="left:${se(R)};width:${((ie-R)*100).toFixed(2)}%"></div>`)});const ye={};E.forEach(F=>{(ye[F.art]=ye[F.art]||[]).push(F)});const Fe=Sd.filter(F=>ye[F]).map(F=>{const ce=Bn[F],we=ye[F].map(fe=>{const bt=fe.status==="erledigt"?fe.erledigtDatum||fe.planDatum:fe.planDatum||fe.erledigtDatum,R=He(C,bt);return R==null?"":`<span class="ks-mk${fe.status==="erledigt"?" done":""}" title="${f(ce.label+(fe.notes?": "+fe.notes:""))}" style="left:${se(R)};--mc:${ce.color}"></span>`}).join("");return`<div class="ks-row"><div class="ks-rl">${f(ce.label)}</div><div class="ks-track" style="${ee}">${we}${G}</div></div>`}).join("");return`<div class="ks-wrap">
      <div class="ks-head"><div class="ks-rl"></div><div class="ks-axis">${J}</div></div>
      <div class="ks-row"><div class="ks-rl">Kultur</div><div class="ks-track" style="${ee}">${le}${G}</div></div>
      ${Fe}
      <div class="ks-legend"><span><span class="ks-d done"></span>erledigt</span><span><span class="ks-d"></span>geplant</span><span style="margin-left:auto"><span class="ks-hbar"></span>Ernte-Zeitraum</span></div>
    </div>`}function Kt(v){Ze("app",E=>({...E,activeSection:"acker"})),T.info("Karte geöffnet.")}async function sa(){if(!Z()){T.warning("Keine Datenbank aktiv.");return}try{const v=await ii();await L(),V(),v?.imported?(T.success(`${v.imported} übernommen.`),j()):T.info(`Nichts Neues${v?.skipped?` (${v.skipped} nicht zuordenbar)`:""}.`)}catch{T.error("Übernahme fehlgeschlagen.")}}async function Ua(v){const E=r.find(q=>q.id===v);if(E)try{await oi({...E,status:"erledigt",erledigtDatum:E.erledigtDatum||tt()}),await L(),V(),j()}catch{T.error("Speichern fehlgeschlagen.")}}async function Va(v){try{await si({id:v}),await L(),V(),j()}catch{T.error("Löschen fehlgeschlagen.")}}let $e=null;const Wt=()=>{$e&&($e.remove(),$e=null,document.removeEventListener("pointerdown",oa,!0))},oa=v=>{$e&&!$e.contains(v.target)&&Wt()};function Wn(v,E,q,I){if(Wt(),$e=document.createElement("div"),$e.className="km-ctx",I){const P=document.createElement("div");P.className="km-ctx-t",P.textContent=I,$e.appendChild(P)}q.forEach(P=>{if(P.sep){const Q=document.createElement("div");Q.className="km-ctx-sep",$e.appendChild(Q);return}const C=document.createElement("button");C.className="km-ctx-i",C.innerHTML=`<i class="bi ${P.icon}"></i><span>${f(P.label)}</span>`,C.addEventListener("click",()=>{Wt(),P.action?.()}),$e.appendChild(C)}),document.body.appendChild($e);const D=$e.getBoundingClientRect();$e.style.left=Math.max(8,Math.min(v,window.innerWidth-D.width-8))+"px",$e.style.top=Math.max(8,Math.min(E,window.innerHeight-D.height-8))+"px",setTimeout(()=>document.addEventListener("pointerdown",oa,!0),0)}function Za(v,E,q){const I=N(v);if(!I)return;const D=me(n,I),{current:P}=cn(D);Wn(E,q,[{icon:"bi-flower2",label:P?"Kultur bearbeiten":"Kultur setzen",action:()=>la(I,P,"current",D.length)},{icon:"bi-plus-lg",label:"Nächste Kultur planen",action:()=>la(I,null,"next",D.length)},{icon:"bi-list-check",label:"Aufgabe planen",action:()=>ca(I,null,P)},{sep:!0},{icon:"bi-arrow-right-circle",label:"Fläche öffnen",action:()=>{o=v,re("flaechen"),z()}},{icon:"bi-map",label:"Auf Karte",action:()=>Kt()}],I.name)}function Xe(){m&&(m.remove(),m=null)}function Qa(v,E,q,I){Xe();const D=document.createElement("div");return D.className="kmodal-ov",D.innerHTML=`<div class="kmodal" role="dialog" aria-modal="true">
      <div class="kmodal-h"><span>${f(v)}</span><button class="kmodal-x" aria-label="Schließen"><i class="bi bi-x-lg"></i></button></div>
      <div class="kmodal-b">${E}</div>
      <div class="kmodal-f"><button class="btn-cancel" data-k="cancel">Abbrechen</button><button class="btn-save" data-k="save">${f(q)}</button></div></div>`,e.appendChild(D),m=D,D.querySelector(".kmodal-x").addEventListener("click",Xe),D.querySelector('[data-k="cancel"]').addEventListener("click",Xe),D.addEventListener("mousedown",P=>{P.target===D&&Xe()}),D.querySelector('[data-k="save"]').addEventListener("click",()=>{I(D)!==!1&&Xe()}),D.querySelectorAll("[data-more]").forEach(P=>P.addEventListener("click",()=>{const C=D.querySelector("[data-more-box]");C&&(C.hidden=!1,P.style.display="none")})),setTimeout(()=>D.querySelector("input,select,textarea,.km-tile")?.focus?.(),30),D}function Ja(){const v=new Set,E=[],q=D=>{const P=String(D||"").trim().toLowerCase();D&&!v.has(P)&&(v.add(P),E.push(D))};return l.forEach(D=>q(D.name)),i.forEach(D=>q(D.kultur)),`<datalist id="km-kultur-dl">${E.map(D=>`<option value="${f(D)}"></option>`).join("")}</datalist>`}function la(v,E,q,I){const D=q==="next"&&!E,P=E||{},C=(P.kulturStammId?l.find(R=>R.id===P.kulturStammId):null)||dn(l,P.kultur),Q=P.pflanzDatum?.slice(0,10)||(D?"":tt()),ee=Tt.map(R=>`<button type="button" class="km-sw${(P.color||"")===R?" on":""}" data-col="${R}" style="background:${R}"></button>`).join(""),se=$d.map(R=>`<option value="${f(R)}"${(P.einheit||"Pflanzen")===R?" selected":""}>${f(R)}</option>`).join(""),Y=`
      <label class="km-fld big">Was wächst hier?<input list="km-kultur-dl" data-f="kultur" value="${f(P.kultur||"")}" placeholder="z. B. Tomate – aus Bibliothek wählen" autocomplete="off" /></label>${Ja()}
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
        <label class="km-fld">${D?"Geplante Pflanzung":"Pflanzung"}<input type="date" data-f="pflanz" value="${Q}" /></label>
      </div>
      <div class="km-frow2">
        <label class="km-fld">Ernte von<input type="date" data-f="ernteVon" value="${(P.ernteVon||"").slice(0,10)}" /></label>
        <label class="km-fld">Ernte bis<input type="date" data-f="ernteBis" value="${(P.ernteBis||P.ernteDatum||"").slice(0,10)}" /></label>
      </div>
      <div class="km-hint2"><i class="bi bi-info-circle"></i> Termine kommen automatisch aus der Bibliothek – jederzeit frei überschreibbar.</div>
      <div class="km-frow2">
        <label class="km-fld">Menge<input type="number" step="1" min="0" data-f="menge" value="${P.menge!=null?P.menge:""}" placeholder="optional" /></label>
        <label class="km-fld">Einheit<select data-f="einheit">${se}</select></label>
      </div>
      ${E?"":`
      <div class="km-succ">
        <label class="km-check2"><input type="checkbox" data-f="succOn" /> <span><i class="bi bi-layers"></i> Folgesätze anlegen <small>(gestaffelt für laufende Ernte)</small></span></label>
        <div class="km-succ-box km-frow2" data-succ-box hidden>
          <label class="km-fld">Anzahl Sätze<input type="number" min="2" max="20" step="1" data-f="succN" value="4" /></label>
          <label class="km-fld">Abstand (Tage)<input type="number" min="1" step="1" data-f="succGap" value="14" /></label>
        </div>
      </div>`}
      <button type="button" class="km-more" data-more><i class="bi bi-sliders"></i> Mehr (Status, Farbe, Notiz)</button>
      <div class="km-more-box" data-more-box hidden>
        <label class="km-fld">Status<select data-f="status">${["aktiv","geplant","abgeschlossen"].map(R=>`<option value="${R}"${(P.status||(D?"geplant":"aktiv"))===R?" selected":""}>${Ed[R].label}</option>`).join("")}</select></label>
        <div class="km-fld">Farbe<div class="km-sws">${ee}</div></div>
        <label class="km-fld">Notiz<textarea data-f="notes" rows="2" placeholder="optional">${f(P.notes||"")}</textarea></label>
      </div>
      ${E?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Satz löschen</button>':""}`,G=Qa(E?"Satz bearbeiten":D?"Nächsten Satz planen":"Satz eintragen",Y,"Speichern",R=>{const ie=vt=>R.querySelector(`[data-f="${vt}"]`)?.value?.trim()||"",s=ie("kultur");if(!s)return T.warning("Bitte eine Kultur angeben."),!1;const b=dn(l,s),h=ie("aussaat")||null,w=ie("pflanz")||null,x=ie("ernteVon")||null,O=ie("ernteBis")||null,H=ie("menge"),te=H?Number(H):null,xe=R.querySelector('[data-f="einheit"]')?.value||null,Se=!R.querySelector("[data-more-box]").hidden;let be=Se?ie("status"):"";be||(be=D||w&&Ee(w)>Number(tt().replace(/-/g,""))?"geplant":"aktiv");const da=R.querySelector(".km-sw.on")?.dataset.col||P.color||b?.color||Tt[I%Tt.length],jn=i.find(vt=>vt.kultur===s)?.eppoCode||b?.eppoCode||null,Mt=Se?ie("notes")||null:P.notes||null,ua={flaecheTyp:v.typ,flaecheId:v.id,kultur:s,eppoCode:jn,color:da,menge:te,einheit:xe,kulturStammId:b?.id||P.kulturStammId||null,notes:Mt},Ya=!E&&R.querySelector('[data-f="succOn"]')?.checked,pa=Math.max(2,Math.min(20,Number(R.querySelector('[data-f="succN"]')?.value)||2)),Xa=Math.max(1,Number(R.querySelector('[data-f="succGap"]')?.value)||14),We=Number(tt().replace(/-/g,""));(async()=>{try{if(Ya){const vt="sg-"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),Gn={aussaatDatum:h,pflanzDatum:w,ernteVon:x,ernteBis:O};for(let yt=0;yt<pa;yt++){const Ct=zd(Gn,yt*Xa),ma=Ct.pflanzDatum&&Ee(Ct.pflanzDatum)>We?"geplant":be;await li({...ua,...Ct,ernteDatum:null,status:ma,satzGruppe:vt})}T.success(`${pa} Sätze angelegt.`)}else await li({id:E?.id,...ua,aussaatDatum:h,pflanzDatum:w,ernteVon:x,ernteBis:O,ernteDatum:null,status:be,satzGruppe:P.satzGruppe||null});await L(),V(),j()}catch{T.error("Speichern fehlgeschlagen.")}})()});let J="pflanz";const le=R=>G.querySelector(`[data-f="${R}"]`),ye=G.querySelector("[data-anchor-row]"),Fe=G.querySelector("[data-stammhint]");let F=C;const ce=()=>{if(!F){Fe.hidden=!0,ye.style.opacity="0.45";return}ye.style.opacity="1";const ie=[Dd[F.anbauMethode==="anzucht"?"anzucht":"direkt"].short];F.kulturTage&&ie.push(`${F.kulturTage} T. Kultur`),F.anbauMethode==="anzucht"&&F.anzuchtTage&&ie.push(`${F.anzuchtTage} T. Anzucht`),F.familie&&ie.push(F.familie),Fe.innerHTML=`<i class="bi bi-stars"></i> <b>Bibliothek:</b> ${f(ie.join(" · "))}`,Fe.hidden=!1},we=()=>{if(!F)return;const ie=le(J==="ernte"?"ernteVon":J).value||tt(),s=Ad(F,J,ie);s.aussaatDatum!=null&&(le("aussaat").value=s.aussaatDatum||""),s.pflanzDatum!=null&&(le("pflanz").value=s.pflanzDatum||""),s.ernteVon!=null&&(le("ernteVon").value=s.ernteVon||""),s.ernteBis!=null&&(le("ernteBis").value=s.ernteBis||"")},fe=le("kultur");fe.addEventListener("input",()=>{F=dn(l,fe.value),ce()}),fe.addEventListener("change",()=>{F=dn(l,fe.value),ce(),F&&(le("pflanz").value||(le("pflanz").value=tt()),we())}),G.querySelectorAll("[data-anchor]").forEach(R=>R.addEventListener("click",()=>{G.querySelectorAll("[data-anchorseg] .km-segb").forEach(ie=>ie.classList.remove("on")),R.classList.add("on"),J=R.dataset.anchor,we()})),["aussaat","pflanz","ernteVon"].forEach(R=>le(R)?.addEventListener("change",()=>{R===(J==="ernte"?"ernteVon":J)&&we()})),ce();const bt=G.querySelector('[data-f="succOn"]');bt?.addEventListener("change",()=>{G.querySelector("[data-succ-box]").hidden=!bt.checked}),G.querySelectorAll(".km-sw").forEach(R=>R.addEventListener("click",()=>{G.querySelectorAll(".km-sw").forEach(ie=>ie.classList.remove("on")),R.classList.add("on")})),G.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(E?.id)try{await To({id:E.id}),await L(),V(),j(),Xe()}catch{T.error("Löschen fehlgeschlagen.")}})}function ca(v,E,q){const I=E||{art:"bewaesserung",status:"geplant"},D=Md.map(Y=>`<button type="button" class="km-tile${(I.art||"bewaesserung")===Y.art?" on":""}" data-art="${Y.art}" style="--ac:${Bn[Y.art].color}"><i class="bi ${Y.icon}"></i><span>${f(Y.label)}</span></button>`).join(""),P=(I.status||"geplant")==="erledigt",C=(P?I.erledigtDatum:I.planDatum)||tt(),Q=`
      <div class="km-tasktiles">${D}</div>
      <div class="km-fld">Wann?<div class="km-when" data-when>
        <button type="button" class="km-chip" data-day="0">Heute</button>
        <button type="button" class="km-chip" data-day="1">Morgen</button>
        <button type="button" class="km-chip" data-day="x">Datum…</button>
        <input type="date" data-f="datum" value="${C.slice(0,10)}" />
      </div></div>
      <div class="km-seg" data-seg>
        <button type="button" class="km-segb${P?"":" on"}" data-status="geplant"><i class="bi bi-clock"></i> Geplant</button>
        <button type="button" class="km-segb${P?" on":""}" data-status="erledigt"><i class="bi bi-check-lg"></i> Erledigt</button>
      </div>
      <button type="button" class="km-more" data-more><i class="bi bi-sliders"></i> Notiz, Menge, Mittel</button>
      <div class="km-more-box" data-more-box hidden>
        <label class="km-fld">Bezeichnung<input data-f="notes" value="${f(I.notes||"")}" placeholder="z. B. Kompostgabe" /></label>
        <div class="km-frow2">
          <label class="km-fld">Menge<input type="number" step="0.1" data-f="menge" value="${I.menge!=null?I.menge:""}" placeholder="optional" /></label>
          <label class="km-fld">Einheit<input data-f="einheit" value="${f(I.einheit||"")}" placeholder="kg/ha, l" /></label>
        </div>
        <label class="km-fld">Mittel<input data-f="mittel" value="${f(I.mittel||"")}" placeholder="optional" /></label>
      </div>
      ${E?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Aufgabe löschen</button>':""}`,ee=Qa(E?"Aufgabe bearbeiten":"Aufgabe hinzufügen",Q,"Speichern",Y=>{const G=Y.querySelector(".km-tile.on")?.dataset.art||"bewaesserung",J=Y.querySelector(".km-segb.on")?.dataset.status||"geplant",le=Y.querySelector('[data-f="datum"]').value||tt(),ye=!Y.querySelector("[data-more-box]").hidden,Fe=ce=>{const we=Y.querySelector(`[data-f="${ce}"]`)?.value;return we?Number(we):null},F=ce=>Y.querySelector(`[data-f="${ce}"]`)?.value.trim()||null;(async()=>{try{await oi({id:E?.id,flaecheTyp:v.typ,flaecheId:v.id,anbauId:E?.anbauId||q?.id||null,art:G,status:J,planDatum:J==="geplant"?le:E?.planDatum||null,erledigtDatum:J==="erledigt"?le:null,menge:ye?Fe("menge"):E?.menge??null,einheit:ye?F("einheit"):E?.einheit||null,mittel:ye?F("mittel"):E?.mittel||null,historyId:E?.historyId||null,notes:ye?F("notes"):E?.notes||null}),await L(),V(),j()}catch{T.error("Speichern fehlgeschlagen.")}})()});ee.querySelectorAll(".km-tile").forEach(Y=>Y.addEventListener("click",()=>{ee.querySelectorAll(".km-tile").forEach(G=>G.classList.remove("on")),Y.classList.add("on")})),ee.querySelectorAll(".km-segb").forEach(Y=>Y.addEventListener("click",()=>{ee.querySelectorAll(".km-segb").forEach(G=>G.classList.remove("on")),Y.classList.add("on")}));const se=ee.querySelector('[data-f="datum"]');ee.querySelectorAll("[data-day]").forEach(Y=>Y.addEventListener("click",()=>{const G=Y.dataset.day;if(G==="x"){se.style.display="inline-block",se.showPicker?.();return}const J=new Date;J.setDate(J.getDate()+Number(G)),se.value=J.toISOString().slice(0,10),se.style.display="none"})),ee.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(E?.id)try{await si({id:E.id}),await L(),V(),j(),Xe()}catch{T.error("Löschen fehlgeschlagen.")}})}e.querySelectorAll(".km-modebtn").forEach(v=>v.addEventListener("click",()=>re(v.dataset.mode))),document.addEventListener("keydown",v=>{v.key==="Escape"&&(m&&Xe(),Wt())}),window.addEventListener("psm:openKultur",v=>{const E=v?.detail;!E?.typ||!E?.id||(o=E.typ+":"+E.id,re("flaechen"),u&&(Je(),ke(),z()))}),t.state.subscribe(v=>{v?.app?.activeSection==="kultur"&&(u?(async()=>(a=await Qi(t),V(),z()))():(u=!0,B()))}),ue()}function Bd(){return`
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
  </section>`}const Nd=["pflanzenschutz.json","history.json","entries.json"];let Ji=!1,_=null,ft=!1;const Ot=25,dr=new Intl.NumberFormat("de-DE");let Le=0,un=null,Yi=null;const Td=Ds({id:"import",label:"Import-Vorschau",budget:{initialLoad:20,maxItems:50}});let Mr=null;function Fd(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function qd(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Hd(e,t){const a=e.querySelector('[data-role="import-log-list"]');if(a){if(!t.length){a.innerHTML='<tr><td colspan="5" class="text-muted small">Noch keine Importe protokolliert.</td></tr>';return}a.innerHTML=t.map(n=>{const r=n.rangeStart||n.rangeEnd?`${Ca(n.rangeStart)||n.rangeStart||"?"} – ${Ca(n.rangeEnd)||n.rangeEnd||"?"}`:"-",i=[n.source,n.device].filter(Boolean),l=i.length?f(i.join(" · ")):"-";return`
        <tr>
          <td>${f(qd(n.importedAt))}</td>
          <td>${l}</td>
          <td class="text-end text-success">${n.added}</td>
          <td class="text-end text-muted">${n.skipped}</td>
          <td class="small text-muted">${f(r)}</td>
        </tr>`}).join("")}}async function xn(e){if(de()==="sqlite")try{const t=await Fo(50);Hd(e,t.items||[])}catch(t){console.warn("Import-Historie konnte nicht geladen werden",t)}}function gt(e,t,a="info"){const n=e.querySelector('[data-role="import-hint"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a} small mt-3`,n.textContent=t}}function Ft(e,t){const a=e.querySelector('[data-role="import-feedback"]');a&&(a.textContent=t)}function At(e){const t=e.querySelector('[data-action="clear-import"]'),a=e.querySelector('[data-action="focus-import"]'),n=e.querySelector('[data-action="run-import"]'),r=!!_;if(t&&(t.disabled=!r||ft),a&&(a.disabled=!r||ft),n){const i=!!(_?.importableEntries?.length&&_.stats||_?.fotos?.length);n.disabled=!r||!i||ft}}function Od(e){_=null,Zd(e);const t=e.querySelector('[data-role="import-summary-card"]'),a=e.querySelector('[data-role="import-file"]');t&&t.classList.add("d-none"),a&&(a.value=""),Ft(e,""),gt(e,"Bereit für eine neue Importdatei."),At(e),Zt()}function Vs(e){if(e.dateIso)return e.dateIso;if(e.datum){const t=new Date(e.datum);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.date){const t=new Date(e.date);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.savedAt){const t=new Date(e.savedAt);if(!Number.isNaN(t.getTime()))return t.toISOString()}return null}function Nn(e){return e?Ca(e)||e.slice(0,10):"-"}function Zs(e){return e.savedAt||(e.savedAt=e.createdAt||e.dateIso||new Date().toISOString()),e}function Xi(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function _d(e){if(!e||typeof e!="object")return null;const t={...e};if(!Array.isArray(t.items)){const a=e.items;t.items=Array.isArray(a)?[...a]:[]}return Zs(t),t}function Qs(e,t){const a=e.map(n=>Vs(n)).filter(n=>!!n).sort();return{startIso:a[0]||t?.filters?.startDate||null,endIso:a[a.length-1]||t?.filters?.endDate||null}}function Rd(e){if(!e)return;const t=Xi(e.startIso,"start"),a=Xi(e.endIso,"end");if(!t&&!a)return;const n={};return t&&(n.startDate=t),a&&(n.endDate=a),n}async function Js(e,t){if(de()!=="sqlite"){const o=_e(e.history);return new Set(o.map(c=>Tn(c)).filter(c=>!!c))}const n=Rd(t);if(!n)return new Set;const r=new Set;let i=1;const l=500;try{for(;;){const o=await gs({page:i,pageSize:l,filters:n,sortDirection:"asc"});if(o.items.forEach(c=>{const u=Tn(c);u&&r.add(u)}),i*l>=o.totalCount)break;i+=1}}catch(o){return console.warn("Konnte vorhandene Einträge für Duplikatprüfung nicht laden",o),new Set}return r}function Tn(e){const t=typeof e.clientUuid=="string"&&e.clientUuid?e.clientUuid:"";if(t)return`uuid:${t}`;const a=e.savedAt||e.dateIso||e.createdAt||e.datum||"",n=e.ersteller||"",r=e.kultur||"",i=e.invekos||e.standort||"";return[a,n,r,i].join("|")}function Kd(e,t,a,n){const r=n||Qs(e,a),i=r.startIso,l=r.endIso,o=new Set,c=new Set;return t.forEach(u=>{u.ersteller&&o.add(u.ersteller),u.kultur&&c.add(u.kultur)}),{startDateLabel:Nn(i),endDateLabel:Nn(l),startDateRaw:i,endDateRaw:l,entryCount:e.length,importableCount:t.length,duplicateCount:e.length-t.length,creators:Array.from(o).slice(0,5),crops:Array.from(c).slice(0,5)}}function Wd(e,t){const a=e.querySelector('[data-role="import-stats"]');if(!a)return;if(!t){a.innerHTML="";return}const n=t.stats,r=t.metadata?.filters;a.innerHTML=`
    <div class="col-12 col-md-4">
      <div class="border rounded p-3 h-100">
        <div class="text-muted small">Zeitraum</div>
        <div class="fw-bold">${f(n.startDateLabel)} – ${f(n.endDateLabel)}</div>
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
        <div class="fw-bold">${f(r?.label||r?.scope||"—")}</div>
        <div class="text-muted small">${f(r?[r.creator,r.crop].filter(Boolean).join(" · ")||"Keine zusätzlichen Filter":"Keine Angaben")}</div>
      </div>
    </div>
  `}function jd(e,t){const a=e.querySelector('[data-role="import-warnings"]');if(!a)return;if(!t||!t.warnings.length){a.innerHTML="";return}const n=t.warnings.map(r=>`<li>${f(r)}</li>`).join("");a.innerHTML=`
    <div class="alert alert-warning">
      <strong>Hinweise:</strong>
      <ul class="mb-0">${n}</ul>
    </div>
  `}function Ys(e){const t=e.entries.length;if(!t)return Le=0,{start:0,end:0,total:0};const a=Math.max(Math.ceil(t/Ot),1);Le>=a&&(Le=a-1),Le<0&&(Le=0);const n=Le*Ot,r=Math.min(n+Ot,t);return{start:n,end:r,total:t}}function Gd(e){const t=e.querySelector('[data-role="import-pager"]');return t?((!un||Yi!==t)&&(un?.destroy(),un=_a(t,{onPrev:()=>Ud(e),onNext:()=>Vd(e),labels:{prev:"Zurück",next:"Weiter",loading:"Vorschau wird geladen...",empty:"Keine Einträge verfügbar"}}),Yi=t),un):null}function Ma(e,t){const a=Gd(e);if(!a)return;if(!t){Le=0,a.update({status:"hidden"});return}const n=t.entries.length;if(!n){Le=0,a.update({status:"disabled",info:"Keine Einträge vorhanden."});return}const{start:r,end:i}=Ys(t),l=`Einträge ${dr.format(r+1)}–${dr.format(i)} von ${dr.format(n)}`;a.update({status:"ready",info:l,canPrev:Le>0,canNext:i<n})}function Ud(e){!_||Le===0||(Le=Math.max(Le-1,0),Yr(e,_))}function Vd(e){if(!_)return;const t=_.entries.length;if(!t)return;const a=Math.max(Math.ceil(t/Ot)-1,0);Le>=a||(Le=Math.min(Le+1,a),Yr(e,_))}function Zd(e){Le=0,e&&Ma(e,_)}function Yr(e,t){const a=e.querySelector('[data-role="import-preview-table"]');if(!a){Zt();return}if(!t){a.innerHTML="",Ma(e,null),Zt();return}if(!t.entries.length){a.innerHTML='<tr><td colspan="5" class="text-center text-muted">Keine Einträge</td></tr>',Ma(e,t),Zt();return}const{start:r,end:i}=Ys(t),o=t.entries.slice(r,i).map(c=>{const u=Nn(Vs(c));return`
        <tr>
          <td>${f(u)}</td>
          <td>${f(c.kultur||"-")}</td>
          <td>${f(c.ersteller||"-")}</td>
          <td>${f(c.standort||c.invekos||"-")}</td>
          <td>${f(c.savedAt?Nn(c.savedAt):"-")}</td>
        </tr>
      `}).join("");a.innerHTML=o,Ma(e,t),Zt()}async function Qd(e){const t=Oo(e),a=Object.keys(t),n=a.find(u=>Nd.some(d=>u.toLowerCase().endsWith(d)));if(!n)throw new Error("ZIP enthält keine 'pflanzenschutz.json'.");const r=JSON.parse(ur(t[n])),i=a.find(u=>u.toLowerCase().endsWith("metadata.json")),l=i?JSON.parse(ur(t[i])):null,o=Array.isArray(r)?r:Array.isArray(r.entries)?r.entries:Array.isArray(r.history)?r.history:[],c=Array.isArray(r?.fotos)?r.fotos:[];for(const u of c){if(u?.data)continue;const d=u?.file?String(u.file):null,p=d?a.find(m=>m===d||m.toLowerCase().endsWith(d.toLowerCase())):null;p&&t[p]&&(u.data=Jd(t[p]),u.mime||(u.mime="image/jpeg"))}return{entries:o,metadata:l,fotos:c}}function Jd(e){let t="";for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode(...e.subarray(n,n+32768));return btoa(t)}async function Yd(e){const t=ur(e),a=JSON.parse(t);if(Array.isArray(a))return{entries:a,metadata:null,fotos:[]};const n=Array.isArray(a.fotos)?a.fotos:[];if(Array.isArray(a.entries))return{entries:a.entries,metadata:a.metadata||null,fotos:n};if(Array.isArray(a.history))return{entries:a.history,metadata:a.metadata||null,fotos:n};if(n.length)return{entries:[],metadata:a.metadata||null,fotos:n};throw new Error("JSON enthält keine Eintragsliste.")}async function Xd(e,t){const a=new Uint8Array(await e.arrayBuffer()),n=/\.zip$/i.test(e.name)||e.type==="application/zip",{entries:r,metadata:i,fotos:l}=n?await Qd(a):await Yd(a),o=Array.isArray(l)?l:[],c=(Array.isArray(r)?r:[]).map(S=>_d(S)).filter(S=>!!S);if(!c.length&&!o.length)throw new Error("Die Datei enthielt keine verwertbaren Einträge.");const u=Qs(c,i),d=await Js(t,u),p=new Set,m=[];let y=0;c.forEach(S=>{const A=Tn(S);if(!A){m.push(S);return}if(d.has(A)||p.has(A)){y+=1;return}p.add(A),m.push(S)});const g=Kd(c,m,i,u),k=[];return y&&k.push(`${y} Datensätze wurden wegen gleicher Kennung übersprungen.`),(!g.startDateRaw||!g.endDateRaw)&&k.push("Zeitraum konnte nicht eindeutig ermittelt werden."),{filename:e.name,entries:c,importableEntries:m,metadata:i,stats:g,warnings:k,lastImportRefs:[],fotos:o}}function es(){if(!_)return"Keine Datei";const e=[];return ft&&e.push("Verarbeitung"),_.warnings.length&&e.push("Warnungen"),_.stats.importableCount<_.stats.entryCount&&e.push("Duplikate entfernt"),e.length?e.join(" · "):void 0}function eu(){const e=!!_,t=e?Math.max(Math.ceil((_?.entries.length||0)/Ot),1):null,a=e?{items:_?.entries.length??0,totalCount:_?.stats.entryCount??null,cursor:_&&(_.entries.length||0)>Ot?`Seite ${Le+1}${t?` / ${t}`:""}`:null,payloadKb:As(_?.entries.slice(0,Ot)),lastUpdated:Mr,note:es()}:{items:0,totalCount:0,cursor:null,payloadKb:0,lastUpdated:Mr,note:es()};$s(Td,a)}function Zt(){Mr=new Date().toISOString(),eu()}function Cr(e){const t=e.querySelector('[data-role="import-summary-card"]');if(!t)return;if(!_){t.classList.add("d-none"),Ma(e,null),At(e),Zt();return}t.classList.remove("d-none"),Le=0;const a=t.querySelector('[data-role="import-file-name"]'),n=t.querySelector('[data-role="import-summary-subline"]');a&&(a.textContent=_.filename),n&&(n.textContent=`${_.stats.importableCount} von ${_.stats.entryCount} Einträgen importierbar`),Wd(e,_),jd(e,_),Yr(e,_),At(e)}async function tu(){const e=de();if(!e||e==="memory"||e==="sqlite")return;const t=je();await Ge(t)}function ts(e,t){if(!t.length)return[];const a=typeof e.state.updateSlice=="function"?e.state.updateSlice:Ze,n=[];return a("history",r=>{const i=Ha(r),l=i.items.slice(),o=l.length;return t.forEach((c,u)=>{n.push(o+u),l.push(c)}),{...i,items:l,totalCount:l.length,lastUpdatedAt:new Date().toISOString()}}),n}async function au(e,t){if(!_){window.alert("Bitte zuerst eine Importdatei laden.");return}const a=_.fotos||[];if(!_.importableEntries.length&&!a.length){window.alert("Alle Einträge wurden bereits importiert oder als Duplikat erkannt.");return}ft=!0,At(e),Ft(e,"Import läuft ...");const n=t.state.getState(),r={startIso:_.stats.startDateRaw,endIso:_.stats.endDateRaw};let i=new Set;try{i=await Js(n,r)}catch(k){console.warn("Duplikatprüfung vor Import fehlgeschlagen",k)}const l=new Set(i),o=[];let c=0;if(_.importableEntries.forEach(k=>{const S=Tn(k);if(S&&l.has(S)){c+=1;return}S&&l.add(S),o.push(k)}),!o.length&&!a.length){Ft(e,"Keine neuen Einträge gefunden."),gt(e,"Alle Datensätze sind bereits importiert worden.","warning"),ft=!1,At(e);return}const u=de(),d=[],p=[];let m=0,y=0;const g=o.map(k=>Zs({...k}));try{if(u==="sqlite"){const M=[];for(const Z of g)try{const j=await rs(Z);if(j?.duplicate){c+=1;continue}j?.id!=null&&(d.push({source:"sqlite",ref:j.id}),M.push(Z))}catch(j){console.error("appendHistoryEntry failed",j),p.push(Z.savedAt||"Unbekannter Eintrag")}ts(t,M);for(const Z of a)try{(await qo(Z))?.duplicate?y+=1:m+=1}catch(j){console.error("appendFoto failed",j)}m&&window.dispatchEvent(new CustomEvent("fotos:changed"));try{await Ve()}catch(Z){console.warn("SQLite-Datei konnte nach dem Import nicht gespeichert werden",Z)}}else ts(t,g).forEach(Z=>{d.push({source:"state",ref:Z})}),await tu();const k=d.length;if(k||m){u==="sqlite"&&k&&t.events?.emit?.("history:data-changed",{type:"created-bulk",count:k});const M=[];k&&M.push(`${k} Einträge`),m&&M.push(`${m} Foto(s)`),Ft(e,`${M.join(" und ")} importiert.${p.length?` ${p.length} Einträge konnten nicht übernommen werden.`:""}`.trim()),_.lastImportRefs=d,_.importableEntries=[],_.stats={..._.stats,importableCount:0},Cr(e)}else Ft(e,"Keine neuen Daten importiert.");const S=[];let A="success";if(p.length&&(S.push(`${p.length} Einträge konnten nicht gespeichert werden. Details siehe Konsole.`),A="warning"),c&&(S.push(`${c} Einträge wurden während des Imports als Duplikat übersprungen.`),A="warning"),y&&S.push(`${y} Foto(s) waren bereits vorhanden (übersprungen).`),S.length||S.push("Import abgeschlossen."),gt(e,S.join(" "),A),u==="sqlite"&&(k||c||m||y))try{const M=[];p.length&&M.push(`${p.length} fehlgeschlagen`),m&&M.push(`${m} Fotos`),y&&M.push(`${y} Fotos doppelt`),await Ho({source:_.filename||null,device:_.metadata?.device||_.metadata?.label||null,added:k,skipped:c,rangeStart:_.stats.startDateRaw,rangeEnd:_.stats.endDateRaw,note:M.length?M.join(", "):null}),await Ve().catch(()=>{}),await xn(e)}catch(M){console.warn("Import-Historie konnte nicht geschrieben werden",M)}}catch(k){console.error("Import fehlgeschlagen",k),Ft(e,"Import fehlgeschlagen. Siehe Konsole für Details."),gt(e,"Import fehlgeschlagen. Bitte erneut versuchen.","danger")}finally{ft=!1,At(e)}}function nu(e,t,a){if(!e.events?.emit)return;const n=t.metadata?.label||t.metadata?.filters?.label||`Import ${t.filename}`;e.events.emit("documentation:focus-range",{startDate:t.stats.startDateRaw||void 0,endDate:t.stats.endDateRaw||void 0,label:n,reason:"import",entryIds:a,autoSelectFirst:!!a.length})}function ru(e,t){if(!_){window.alert("Bitte zuerst eine Importdatei laden.");return}if(!_.stats.startDateRaw||!_.stats.endDateRaw){window.alert("Zeitraum konnte nicht bestimmt werden.");return}nu(t,_,_.lastImportRefs),gt(e,"Dokumentation wurde auf den Importzeitraum fokussiert.")}function iu(e,t){const a=e.querySelector('[data-role="import-file"]');a&&a.addEventListener("change",()=>{const n=a.files?.[0];n&&(ft=!0,gt(e,"Datei wird analysiert ..."),At(e),Ft(e,""),Xd(n,t.state.getState()).then(r=>{_=r,Cr(e),gt(e,`${r.importableEntries.length} Einträge bereit zum Import.`)}).catch(r=>{console.error("Importdatei konnte nicht gelesen werden",r),gt(e,r?.message||"Importdatei konnte nicht gelesen werden.","danger"),_=null,Cr(e)}).finally(()=>{ft=!1,At(e)}))}),e.addEventListener("click",n=>{const r=n.target?.closest("[data-action]");if(!r)return;const i=r.dataset.action;if(i){if(i==="clear-import"){Od(e);return}if(i==="focus-import"){ru(e,t);return}i==="run-import"&&au(e,t)}})}function su(e,t){if(!e||Ji)return;const a=e;a.innerHTML="";const n=Fd();a.appendChild(n),iu(n,t),gt(n,"Wähle eine Datei aus, um den Import zu starten."),xn(n),rt("database:connected",()=>void xn(n)),rt("app:sectionChanged",r=>{(r==="daten"||r==="documentation"||r==="import")&&xn(n)}),Ji=!0}const Nt=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function ou(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function Gt(e,t,a,n){return`
    <div class="dash-card"${n?` data-goto="${n}" style="cursor:pointer;"`:""}>
      <div class="dash-card-ic"><i class="bi ${e}"></i></div>
      <div class="dash-card-body"><div class="dash-card-value">${a}</div><div class="dash-card-label">${f(t)}</div></div>
    </div>`}function lu(){return`
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
  </section>`}function cu(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=lu();const a=e.querySelector('[data-role="dash-cards"]'),n=e.querySelector('[data-role="dash-warn"]'),r=e.querySelector('[data-role="dash-recent"]');e.addEventListener("click",l=>{const o=l.target?.closest("[data-goto]");if(!o)return;const c=o.getAttribute("data-goto");c&&t.state.updateSlice("app",u=>({...u,activeSection:c}))});const i=async()=>{if(de()!=="sqlite"){a&&(a.innerHTML='<div class="dash-empty">Bitte zuerst eine Datenbank öffnen.</div>');return}const l=t.state.getState(),o=(_e(l.gps?.points)||[]).length;let c=0,u=0,d=0,p=0,m=[],y=[],g=0;try{c=(await Ir())?.rows?.length||0}catch{}try{u=(await fs())?.rows?.length||0}catch{}try{const k=(await Br())?.rows||[];d=k.length,p=k.reduce((S,A)=>S+(A.plants||0),0)}catch{}try{m=(await ms())?.rows||[]}catch{}try{const k=await gs({}),S=k?.entries||k?.rows||[];g=k?.totalCount??S.length,y=S.slice(0,6)}catch{}if(a&&(a.innerHTML=[Gt("bi-geo-alt","Standorte",Nt(o)),Gt("bi-flower1","Kulturen",Nt(c)),Gt("bi-droplet","Mittel im Sortiment",Nt(u),"lager"),Gt("bi-journal-check","Anwendungen",Nt(g),"documentation"),Gt("bi-map","Acker-Flächen",Nt(d),"acker"),Gt("bi-flower3","Pflanzen (Acker)",Nt(p),"acker")].join("")),n){const k=[];m.forEach(A=>{A.bestand<=0&&(A.verbraucht>0||A.zugang>0)&&k.push(`<div class="dash-row"><span><i class="bi bi-box-seam me-1" style="color:#ef4444"></i>${f(A.name)}</span><span style="color:#ef4444">Bestand ${Nt(A.bestand)} ${f(A.einheit||"")}</span></div>`)}),m.forEach(A=>{if(!A.zulEnde)return;const M=Math.round((new Date(A.zulEnde).getTime()-Date.now())/864e5);M<0?k.push(`<div class="dash-row"><span><i class="bi bi-calendar-x me-1" style="color:#ef4444"></i>${f(A.name)}</span><span style="color:#ef4444">Zulassung abgelaufen</span></div>`):M<180&&k.push(`<div class="dash-row"><span><i class="bi bi-calendar-event me-1" style="color:#f59e0b"></i>${f(A.name)}</span><span style="color:#f59e0b">Zulassung endet in ${M} T</span></div>`)});const S=k.length>6?`<div class="dash-row" style="color:var(--color-text-muted)"><span>+ ${k.length-6} weitere</span></div>`:"";n.innerHTML=k.length?k.slice(0,6).join("")+S:'<div class="dash-empty">Alles im grünen Bereich. ✓</div>'}r&&(r.innerHTML=y.length?y.map(k=>{const S=ou(k.datum||k.dateIso||k.created_at||k.createdAt||null),A=k.kultur||"",M=k.standort||"";return`<div class="dash-row"><span>${f(M)}${A?" · "+f(A):""}</span><span class="dash-empty" style="padding:0">${f(S)}</span></div>`}).join(""):'<div class="dash-empty">Noch keine Anwendungen erfasst.</div>')};t.state.subscribe(l=>{l?.app?.activeSection==="dashboard"&&i()}),i()}function as(e){document.querySelectorAll(".content-section").forEach(a=>{a.style.display="none"});const t=document.getElementById(`section-${e}`);t instanceof HTMLElement&&(t.style.display="block")}function ns(){_o(),ss();const e={state:{getState:W,updateSlice:Ze,subscribe:Sn},events:{emit:(S,A)=>{Lt(async()=>{const{emit:M}=await import("./index.B020-0f6.js").then(Z=>Z.aS);return{emit:M}},[]).then(({emit:M})=>{M(S,A)})},subscribe:rt}},t=document.querySelector('[data-region="startup"]'),a=document.querySelector('[data-region="shell"]'),n=document.querySelector('[data-region="main"]'),r=document.querySelector('[data-region="footer"]');vl(t,e);const i=document.querySelector('[data-feature="calculation"]');Ro(i,e);const l=document.querySelector('[data-feature="documentation"]');fc(l,e);const o=document.querySelector('[data-feature="settings"]');sd(o,e);const c=document.querySelector('[data-feature="lager"]');cd(c,e);const u=document.querySelector('[data-feature="acker"]');ud(u,e);const d=document.querySelector('[data-feature="kultur"]');Id(d,e);const p=document.querySelector('[data-feature="fotos"]');Ko(p,e,{archiveMode:!0});const m=document.querySelector('[data-feature="import-page"]');su(m,{state:{getState:W,updateSlice:Ze},events:e.events});const y=document.querySelector('[data-feature="dashboard"]');cu(y,e);const g=S=>{const A=document.body;A&&(A.classList.toggle("bg-app",S),A.classList.toggle("bg-startup",!S))},k=S=>{const A=!!S.app?.hasDatabase;if(g(A),t instanceof HTMLElement&&t.classList.toggle("d-none",A),a instanceof HTMLElement&&a.classList.toggle("d-none",!A),n instanceof HTMLElement&&n.classList.toggle("d-none",!A),r instanceof HTMLElement&&r.classList.toggle("d-none",!A),A){const M=S.app?.activeSection??"dashboard";as(M)}};k(e.state.getState()),Sn((S,A)=>{S.app?.hasDatabase!==A.app?.hasDatabase&&k(S),S.app?.activeSection!==A.app?.activeSection&&S.app?.hasDatabase&&as(S.app.activeSection)}),rt("app:sectionChanged",()=>{})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ns,{once:!0}):ns();
