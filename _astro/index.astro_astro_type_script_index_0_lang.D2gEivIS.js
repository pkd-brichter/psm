const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/index.IUdjU3JQ.js","_astro/index.D36E7-Az.js","_astro/jspdf.es.min.BQ-Uo8Gf.js","_astro/leaflet.C03ySvDx.css","_astro/leaflet-src.BcflbDBd.js","_astro/_commonjsHelpers.Cpj98o6Y.js","_astro/index.CPadEFgJ.js"])))=>i.map(i=>d[i]);
import{L as G,M as Ai,J as $e,N as zo,O as To,P as $i,h as Ze,l as No,a as Ci,s as Pe,n as qo,q as Mi,p as $r,e as I,r as qa,C as Ha,u as Ue,_ as Ae,Q as Ho,R as _o,w as y,t as N,m as Cr,S as Ro,j as ha,k as Mr,T as Wo,U as Oo,V as he,W as Ko,X as Ii,Y as Fi,H as Bi,G as _a,Z as jo,$ as Go,a0 as Uo,a1 as Vo,a2 as Zo,a3 as oa,z as Xt,a4 as Qo,x as Jo,a5 as we,a6 as xe,a7 as Yo,a8 as sa,a9 as Xo,aa as es,D as ts,ab as as,ac as zi,ad as Yn,ae as ea,af as ns,ag as rs,ah as is,ai as Ir,aj as bn,ak as hn,al as os,am as ss,an as ls,ao as cs,ap as ds,aq as us,ar as ps,as as Ti,at as fs,au as Ni,av as ms,aw as qi,ax as gs,ay as bs,az as hs,aA as vs,aB as ys,aC as ws,aD as $n,v as Hi,i as xs,b as ks,c as Ss}from"./index.D36E7-Az.js";const Cn="__psl_history_seeded",Mn=200,Fr=["Salat","Apfel","Wein","Tomate","Kartoffel","Hopfen","Raps","Birne"],Br=["Spritzung","Düngung","Pflege","Behandlung"],zr=["LACES","MALDO","VITVI","SOLTU","PRNUS","CUPAR","CYNCR","ALLCE"],Tr=["BBCH 10","BBCH 31","BBCH 41","BBCH 55","BBCH 65","BBCH 71","BBCH 81"],Es=[{mediumId:"seed-water",name:"Wasser",unit:"L",methodId:"perKiste",methodLabel:"pro Kiste",value:.02,zulassungsnummer:"N/A"},{mediumId:"seed-tonikum",name:"Tonikum X",unit:"ml",methodId:"perKiste",methodLabel:"pro Kiste",value:.85,zulassungsnummer:"Z-123456"},{mediumId:"seed-oel",name:"Pflegeöl Y",unit:"ml",methodId:"percentWater",methodLabel:"% vom Wasser",value:.12,zulassungsnummer:"Z-654321"}];function Ls(e){if(typeof window>"u")return;const a=new URLSearchParams(window.location.search).has("seedHistory");if(!a)return;const n=window;n.__PSL||(n.__PSL={});const r=n.__PSL;r.seedHistoryEntries=(o=Mn)=>Nr(e,{count:o}),r.resetHistorySeedFlag=()=>localStorage.removeItem(Cn),!a&&!localStorage.getItem(Cn)&&G()==="sqlite"&&Nr(e,{count:Mn,setFlag:!0}).catch(o=>{console.error("History seeding failed",o)})}async function Ds(e){if(!e.state.getState().app?.hasDatabase){if(typeof e.state.subscribe!="function")throw new Error("SQLite-Datenbank ist noch nicht initialisiert.");await new Promise((t,a)=>{const n=window.setTimeout(()=>{i(),a(new Error("SQLite-Datenbank wurde nicht rechtzeitig initialisiert."))},1e4),r=e.state.subscribe?.(o=>{o.app?.hasDatabase&&(i(),t())}),i=()=>{window.clearTimeout(n),typeof r=="function"&&r()}})}}async function Nr(e,t={}){const a=t.count??Mn;if(G()!=="sqlite")throw new Error("SQLite-Treiber muss aktiv sein, bevor Daten befüllt werden können.");await Ds(e);const n=performance.now();let r=0;for(let i=0;i<a;i+=1){const o=Ps(i);await Ai(o),r+=1}try{await $e()}catch(i){console.warn("Seed-Daten konnten nicht persistent gespeichert werden",i)}return e.events.emit("history:data-changed",{source:"dev-history-seed"}),t.setFlag&&localStorage.setItem(Cn,"1"),{inserted:r,durationMs:performance.now()-n}}function Ps(e){const t=new Date;t.setDate(t.getDate()-e);const a=t.toLocaleDateString("de-DE"),n=t.toISOString(),r=20+e%30,i=Number((r*.5).toFixed(2));return{datum:a,dateIso:n,ersteller:`Seeder ${1+e%5}`,standort:`Test-Ort ${String.fromCharCode(65+e%6)}`,kultur:Fr[e%Fr.length],usageType:Br[e%Br.length],kisten:r,eppoCode:zr[e%zr.length],bbch:Tr[e%Tr.length],gps:`GPS-Notiz ${e}`,gpsCoordinates:{latitude:48+e%10*.01,longitude:11+e%10*.01},gpsPointId:`seed-gps-${e}`,invekos:`INV-${String(1e3+e).padStart(4,"0")}`,uhrzeit:`${String(6+e%12).padStart(2,"0")}:${String(e*7%60).padStart(2,"0")}`,savedAt:n,items:As(e,r,i)}}function As(e,t,a){return Es.map((n,r)=>{const i=1+(e+r)%4*.05,o=Number((n.value*i).toFixed(4)),s=Number((o*t).toFixed(2));return{id:`seed-item-${e}-${r}`,name:n.name,unit:n.unit,methodLabel:n.methodLabel,methodId:n.methodId,value:o,total:s,inputs:{kisten:t,waterVolume:a},zulassungsnummer:n.zulassungsnummer,mediumId:n.mediumId}})}let ut=null,Ht=null,qr=!1,Hr=!1;async function $s(){if(!("serviceWorker"in navigator))return console.warn("[PWA] Service Workers nicht unterstützt"),null;try{return Ht=await navigator.serviceWorker.register("/psm/sw.js",{scope:"/psm/",updateViaCache:"none"}),console.log("[PWA] Service Worker registriert:",Ht.scope),Ht.addEventListener("updatefound",()=>{const e=Ht?.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&(console.log("[PWA] Neues Update verfügbar"),Mt("pwa:update-available"))})}),navigator.serviceWorker.addEventListener("message",Cs),qr||(qr=!0,navigator.serviceWorker.addEventListener("controllerchange",()=>{Hr||(Hr=!0,window.location.reload())})),Ht}catch(e){return console.error("[PWA] Service Worker Registrierung fehlgeschlagen:",e),null}}function Cs(e){const{type:t,payload:a}=e.data||{};switch(t){case"DB_STATE":Mt("pwa:db-state",a);break;case"CACHES_CLEARED":Mt("pwa:caches-cleared");break}}async function Xa(e){if(!navigator.serviceWorker.controller){localStorage.setItem("psm-db-state",JSON.stringify({...e,updatedAt:new Date().toISOString()}));return}navigator.serviceWorker.controller.postMessage({type:"SET_DB_STATE",payload:e})}async function _i(){const e=localStorage.getItem("psm-db-state");if(e)try{return JSON.parse(e)}catch{}return navigator.serviceWorker?.controller?new Promise(t=>{const a=n=>{n.data?.type==="DB_STATE"&&(navigator.serviceWorker.removeEventListener("message",a),t(n.data.payload))};navigator.serviceWorker.addEventListener("message",a),navigator.serviceWorker.controller.postMessage({type:"GET_DB_STATE"}),setTimeout(()=>{navigator.serviceWorker.removeEventListener("message",a),t(null)},1e3)}):null}async function Ms(){const e=await _i();return!!(e?.hasDatabase&&e?.autoStartEnabled)}function Is(){window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),ut=e,console.log("[PWA] Install Prompt verfügbar"),localStorage.getItem("psm-app-installed")==="true"&&(console.log("[PWA] Widerspruch erkannt: Flag sagt installiert, aber Prompt verfügbar"),localStorage.removeItem("psm-app-installed"),console.log("[PWA] Veraltetes Installations-Flag entfernt")),Mt("pwa:install-available")}),window.addEventListener("appinstalled",()=>{ut=null,tn(),console.log("[PWA] App installiert - Flag gesetzt"),Mt("pwa:installed")})}function en(){return ut!==null}function mt(){return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0}function Xn(){const e=navigator.userAgent.toLowerCase();return e.includes("edg/")?"edge":e.includes("chrome")&&!e.includes("edg")?"chrome":e.includes("firefox")?"firefox":e.includes("safari")&&!e.includes("chrome")?"safari":"other"}function er(){return!!(mt()||localStorage.getItem("psm-app-installed")==="true"||window.matchMedia("(display-mode: fullscreen)").matches||window.matchMedia("(display-mode: minimal-ui)").matches||window.matchMedia("(display-mode: window-controls-overlay)").matches)}async function Ri(){if(er())return!0;try{if("getInstalledRelatedApps"in navigator){const e=await navigator.getInstalledRelatedApps();if(console.log("[PWA] getInstalledRelatedApps result:",e),e&&e.length>0)return tn(),!0}}catch(e){console.warn("[PWA] getInstalledRelatedApps API Fehler:",e)}return!1}function tn(){localStorage.setItem("psm-app-installed","true"),console.log("[PWA] App als installiert markiert")}function Fs(){localStorage.removeItem("psm-app-installed"),console.log("[PWA] Installations-Flag entfernt")}function Wi(){const e=Xn(),t=mt(),a=er();return{canInstall:en(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function Oi(){const e=Xn(),t=mt(),a=await Ri();return{canInstall:en(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function Bs(){if(!ut)return console.warn("[PWA] Kein Install Prompt verfügbar"),!1;try{await ut.prompt();const{outcome:e}=await ut.userChoice;return console.log("[PWA] Install Prompt Ergebnis:",e),e==="accepted"&&tn(),ut=null,e==="accepted"}catch(e){return console.error("[PWA] Install Prompt fehlgeschlagen:",e),!1}}function zs(e){if(!("launchQueue"in window)){console.log("[PWA] Launch Queue API nicht verfügbar");return}window.launchQueue?.setConsumer(async t=>{if(!t.files?.length){console.log("[PWA] Launch ohne Dateien");return}console.log("[PWA] Datei via Launch Queue empfangen:",t.files.length);for(const a of t.files)try{await e(a),await Xa({hasDatabase:!0,fileHandleName:a.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0});break}catch(n){console.error("[PWA] Fehler beim Öffnen der Datei:",n)}}),console.log("[PWA] File Handling initialisiert")}const at="psm-file-handles",tr="last-database";async function In(e){try{const t=await ar(),n=t.transaction(at,"readwrite").objectStore(at);await new Promise((r,i)=>{const o=n.put({key:tr,handle:e,savedAt:new Date().toISOString()});o.onsuccess=()=>r(),o.onerror=()=>i(o.error)}),t.close(),console.log("[PWA] FileHandle gespeichert"),await Xa({hasDatabase:!0,fileHandleName:e.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}catch(t){console.error("[PWA] FileHandle speichern fehlgeschlagen:",t)}}async function Fn(){try{const e=await ar(),a=e.transaction(at,"readonly").objectStore(at),n=await new Promise((i,o)=>{const s=a.get(tr);s.onsuccess=()=>i(s.result),s.onerror=()=>o(s.error)});if(e.close(),!n?.handle)return null;const r=n.handle;return typeof r.queryPermission=="function"&&await r.queryPermission({mode:"readwrite"})==="granted"?(console.log("[PWA] FileHandle mit Berechtigung geladen"),n.handle):(console.log("[PWA] FileHandle gefunden, aber Berechtigung erforderlich"),n.handle)}catch(e){return console.error("[PWA] FileHandle laden fehlgeschlagen:",e),null}}async function Ts(e){try{const t=e;return typeof t.requestPermission!="function"?(await e.getFile(),!0):await t.requestPermission({mode:"readwrite"})==="granted"}catch{return!1}}async function Ns(){try{const e=await ar(),a=e.transaction(at,"readwrite").objectStore(at);await new Promise((n,r)=>{const i=a.delete(tr);i.onsuccess=()=>n(),i.onerror=()=>r(i.error)}),e.close(),await Xa({hasDatabase:!1,autoStartEnabled:!1}),console.log("[PWA] FileHandle gelöscht")}catch(e){console.error("[PWA] FileHandle löschen fehlgeschlagen:",e)}}async function ar(){return new Promise((e,t)=>{const a=indexedDB.open("psm-file-handles",1);a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result),a.onupgradeneeded=n=>{const r=n.target.result;r.objectStoreNames.contains(at)||r.createObjectStore(at,{keyPath:"key"})}})}function Mt(e,t){window.dispatchEvent(new CustomEvent(e,{detail:t}))}function Ki(){return{serviceWorker:"serviceWorker"in navigator,fileSystemAccess:typeof window.showOpenFilePicker=="function",launchQueue:"launchQueue"in window,indexedDB:"indexedDB"in window,standalone:mt(),installAvailable:en()}}async function qs(e){if(console.log("[PWA] Initialisierung..."),await $s(),Is(),e?.onFileOpened&&zs(e.onFileOpened),e?.onAutoStart&&await Ms()){const t=await Fn();if(t){const a=t;let n=!1;if(typeof a.queryPermission=="function"&&(n=await a.queryPermission({mode:"readwrite"})==="granted"),n){console.log("[PWA] Auto-Start mit gespeicherter Datei"),e.onFileOpened&&await e.onFileOpened(t);return}console.log("[PWA] Auto-Start: Berechtigung für Datei erforderlich"),Mt("pwa:permission-required",{handle:t})}}console.log("[PWA] Capabilities:",Ki())}async function Hs(){if(console.group("🔧 PWA Debug Status"),console.log("📱 Standalone Mode:",mt()),console.log("💾 localStorage Flag:",localStorage.getItem("psm-app-installed")),console.log("🔔 Install Prompt verfügbar:",en()),console.log("🌐 Browser:",Xn()),console.group("📺 Display Mode Checks"),console.log("standalone:",window.matchMedia("(display-mode: standalone)").matches),console.log("fullscreen:",window.matchMedia("(display-mode: fullscreen)").matches),console.log("minimal-ui:",window.matchMedia("(display-mode: minimal-ui)").matches),console.log("window-controls-overlay:",window.matchMedia("(display-mode: window-controls-overlay)").matches),console.log("browser:",window.matchMedia("(display-mode: browser)").matches),console.groupEnd(),console.group("🔍 getInstalledRelatedApps API"),"getInstalledRelatedApps"in navigator)try{const e=await navigator.getInstalledRelatedApps();console.log("Installierte Apps:",e)}catch(e){console.log("API Fehler:",e)}else console.log("API nicht verfügbar");console.groupEnd(),console.group("📊 Status Vergleich"),console.log("Sync (isProbablyInstalled):",er()),console.log("Async (checkIfInstalled):",await Ri()),console.log("getInstallStatus():",Wi()),console.log("getInstallStatusAsync():",await Oi()),console.groupEnd(),console.log("💡 Tipp: clearInstalledFlag() zum Zurücksetzen des Flags"),console.groupEnd()}typeof window<"u"&&(window.pwaDebug=Hs,window.pwaClearFlag=Fs);let va=!1;function _s(e){const t=r=>{if(va){va=!1;return}return r.preventDefault(),r.returnValue="",""};let a=!1;const n=r=>{const i=!!r.app?.hasDatabase;i&&!a?(window.addEventListener("beforeunload",t),a=!0):!i&&a&&(window.removeEventListener("beforeunload",t),a=!1)};n(e.getState()),e.subscribe(n),document.addEventListener("click",r=>{const i=r.target.closest("a");i&&i.target==="_blank"&&(va=!0,setTimeout(()=>{va=!1},100))})}function Rs(){const e=document.getElementById("app-root");if(!e)throw new Error("app-root Container fehlt");return{startup:e.querySelector('[data-region="startup"]'),shell:e.querySelector('[data-region="shell"]'),main:e.querySelector('[data-region="main"]'),footer:e.querySelector('[data-region="footer"]')}}async function Ws(){if(zo()){window.location.replace("/psm/m/");return}Rs(),To();const e=$i();e!=="memory"&&Ze(e),await No();const t={state:{getState:I,patchState:$r,updateSlice:Ue,subscribe:Ha},events:{emit:qa,subscribe:Pe}};Ls(t),Ci(),_s(t.state),qs({onFileOpened:async a=>{const n=await Ae(()=>import("./index.D36E7-Az.js").then(i=>i.aG),[]),r=await Ae(()=>import("./index.D36E7-Az.js").then(i=>i.aF),[]);if(r.isSupported()){n.setActiveDriver("sqlite");const i=await a.getFile(),o=await i.arrayBuffer(),s=await r.importFromArrayBuffer(o,i.name);await In(a);const{applyDatabase:l}=await Ae(async()=>{const{applyDatabase:u}=await import("./index.D36E7-Az.js").then(c=>c.aI);return{applyDatabase:u}},[]);l(s.data),qa("database:connected",{driver:"sqlite",autoStarted:!0})}}}),Pe("database:connected",async a=>{await Xa({hasDatabase:!0,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}),Pe("database:connected",async a=>{if(G()==="sqlite")try{await qo(),await Mi()}catch(n){console.warn("GPS-Punkte konnten beim Start nicht geladen werden",n)}}),$r({app:{...I().app,ready:!0}})}const _r="__pflanzenschutz_bootstrapped__",Rr=window;function Wr(){Ws().catch(e=>{console.error("bootstrap failed",e)})}Rr[_r]||(Rr[_r]=!0,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Wr,{once:!0}):Wr());const ji=[{id:"start",label:"Start",icon:"bi-grid-1x2",sections:[{section:"dashboard",label:"Übersicht",icon:"bi-grid-1x2"}]},{id:"psm",label:"PSM",icon:"bi-flower1",sections:[{section:"calc",label:"Neu erfassen",icon:"bi-pencil-square"},{section:"documentation",label:"Übersicht",icon:"bi-list-ul"},{section:"lager",label:"Lager",icon:"bi-box-seam"},{section:"settings",label:"Einstellungen",icon:"bi-gear"}]},{id:"acker",label:"Acker-Planer",icon:"bi-map",sections:[{section:"acker",label:"Acker-Planer",icon:"bi-map"}]},{id:"fotos",label:"Fotos",icon:"bi-camera",sections:[{section:"fotos",label:"Fotos",icon:"bi-camera"}]},{id:"daten",label:"Daten",icon:"bi-database",sections:[{section:"daten",label:"Import",icon:"bi-cloud-upload"}]}],Gi={dashboard:"start",calc:"psm",documentation:"psm",lager:"psm",history:"psm",report:"psm",acker:"acker",fotos:"fotos",settings:"psm",gps:"psm",lookup:"psm",import:"daten",daten:"daten"};function Ui(e){return ji.find(t=>t.id===e)}function Os(e){const t=Gi[e];return t?Ui(t):void 0}function Ks(){const e=document.getElementById("offline-indicator");if(!e)return;const t=()=>{const a=!navigator.onLine;e.classList.toggle("d-none",!a)};t(),window.addEventListener("online",t),window.addEventListener("offline",t)}function Or(e){I().app.activeSection!==e&&(Ue("app",t=>({...t,activeSection:e})),qa("app:sectionChanged",e))}function Kr(){Ks();const e=document.querySelectorAll(".nav-btn[data-area]"),t=document.getElementById("brand-link"),a=document.getElementById("topnav-tabs"),n=document.getElementById("topnav-area-icon"),r=document.getElementById("topnav-area-label"),i={};for(const w of ji)i[w.id]=w.sections[0].section;let o=null;function s(w,b){if(a){if(w.sections.length<=1){a.innerHTML="";return}a.innerHTML=w.sections.map(h=>`
        <button type="button" class="topnav-tab${h.section===b?" active":""}" data-section="${h.section}">
          <i class="bi ${h.icon}"></i><span>${h.label}</span>
        </button>`).join("")}}function l(w){a&&a.querySelectorAll(".topnav-tab").forEach(b=>{b.classList.toggle("active",b.dataset.section===w)})}const u=w=>{const b=Ui(w);!b||!I().app.hasDatabase||Or(i[w]??b.sections[0].section)};e.forEach(w=>{w.addEventListener("click",()=>{const b=w.dataset.area;b&&u(b)})}),t?.addEventListener("click",w=>{w.preventDefault(),u("start")}),a?.addEventListener("click",w=>{const h=w.target?.closest(".topnav-tab")?.dataset.section;h&&Or(h)});const c=document.querySelector('.nav-btn[data-action="share-data"]');c?.addEventListener("click",()=>{c.disabled=!0,Ae(async()=>{const{shareMobileData:w}=await import("./index.IUdjU3JQ.js");return{shareMobileData:w}},__vite__mapDeps([0,1])).then(({shareMobileData:w})=>w()).catch(w=>console.error("Teilen fehlgeschlagen",w)).finally(()=>{c.disabled=!1})}),Ho(),Pe("history:data-changed",w=>{if(!document.body.classList.contains("mobile-mode"))return;const b=w?.type;(b==="created"||b==="created-bulk")&&_o()});const p=w=>{const b=document.getElementById("brand-title"),h=document.getElementById("brand-tagline"),P=document.getElementById("app-version");b&&w.company.name&&(b.textContent=w.company.name),h&&w.company.headline&&(h.textContent=w.company.headline),P&&w.app.version&&(P.textContent=`v${w.app.version}`);const A=w.app.hasDatabase,T=w.app.activeSection,B=Os(T);B&&Gi[T]===B.id&&(i[B.id]=T),e.forEach(J=>{J.disabled=!A;const Y=A&&B?.id===J.dataset.area;J.classList.toggle("active",!!Y)}),B&&(n&&(n.className=`bi ${B.icon} topnav-area-icon`),r&&(r.textContent=B.label),o!==B.id?(s(B,T),o=B.id):l(T))};Ha(p),p(I());let m=!1;const f=document.title||"Pflanzenschutz";window.addEventListener("beforeprint",()=>{m||(m=!0,document.title=" ")}),window.addEventListener("afterprint",()=>{m&&(m=!1,document.title=f)})}function js(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Kr,{once:!0}):Kr()}js();const Gs="https://api.digitale-psm.de",Us="digitale-psm.de";async function Vs(e){try{const t=await fetch(`${Gs}/api/v1/${Us}/views/${e}`,{method:"POST",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`API error: ${t.status}`);return(await t.json()).views}catch(t){return console.warn("[ViewCounter] Fehler beim Zählen:",t),null}}function Zs(e){return e>=1e6?(e/1e6).toFixed(1).replace(".",",")+"M":e>=1e3?(e/1e3).toFixed(1).replace(".",",")+"K":e.toString()}const Bn="pflanzenschutz-datenbank.json";let jr=!1;function Qs(e){return e?`${e.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"pflanzenschutz-datenbank"}.json`:Bn}async function _t(e,t){if(!e){await t();return}const a=e.textContent??"";e.disabled=!0,e.dataset.busy="true",e.textContent="Bitte warten...";try{await t()}finally{e.disabled=!1,e.dataset.busy="false",e.textContent=a}}function Gr(e){return y(e)}function Js(e){const t=document.createElement("section");t.className="section-container d-none",t.innerHTML=`
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
                <input class="form-control" id="wizard-company-name" name="wizard-company-name" required value="${Gr(e.name)}" placeholder="z.B. Gärtnerei Müller" />
              </div>
              <div class="col-md-6">
                <label class="form-label d-block mb-2" for="wizard-company-headline">
                  Überschrift <span class="text-muted small">(optional)</span>
                </label>
                <input class="form-control" id="wizard-company-headline" name="wizard-company-headline" value="${Gr(e.headline)}" placeholder="z.B. Pflanzenschutz-Dokumentation 2025" />
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-12">
                <label class="form-label d-block mb-2" for="wizard-company-address">
                  Adresse <span class="text-muted small">(optional)</span>
                </label>
                <textarea class="form-control" id="wizard-company-address" name="wizard-company-address" rows="2" placeholder="Straße, PLZ Ort">${y(e.address)}</textarea>
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
  `;const a=t.querySelector("#database-wizard-form");if(!a)throw new Error("Wizard-Formular konnte nicht erzeugt werden");const n=t.querySelector('[data-role="wizard-result"]');if(!n)throw new Error("Wizard-Resultat-Container fehlt");return{section:t,form:a,resultCard:n,preview:t.querySelector('[data-role="wizard-preview"]'),filenameLabel:t.querySelector('[data-role="wizard-filename"]'),saveHint:t.querySelector('[data-role="wizard-save-hint"]'),saveButton:t.querySelector('[data-action="wizard-save"]'),reset(){a.reset(),n.classList.add("d-none");const r=t.querySelector('[data-role="wizard-preview"]');r&&(r.textContent="");const i=t.querySelector('[data-role="wizard-filename"]');i&&(i.textContent="")}}}function Ys(e,t){if(!e||jr)return;const a=e;let n=null,r=Bn,i="landing";const s=t.state.getState().company,l=document.createElement("section");l.className="section-container";function u($,v){const x=$;l.innerHTML=`
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
            ${x?`<button class="btn btn-link p-0" style="color: var(--text-muted); text-decoration: none; font-size: 0.85rem;" data-action="start-wizard">
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
            ${x?`<!-- Szenario 2: Hat Datei → Fortsetzen im Fokus -->
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
  `}u(!1,mt());const c=Js(s);a.innerHTML="",a.appendChild(l),a.appendChild(c.section);const p=typeof window<"u"&&typeof window.showSaveFilePicker=="function";c.saveButton&&(p?c.saveHint&&(c.saveHint.textContent='Der Browser fragt nach einem Speicherort. Die erzeugte Datei kannst du später über "Bestehende Datei verbinden" erneut laden.'):(c.saveButton.disabled=!0,c.saveButton.textContent="Datei speichern (nicht verfügbar)",c.saveHint&&(c.saveHint.textContent="Dieser Browser unterstützt keinen direkten Dateidialog. Bitte nutze einen Chromium-basierten Browser (z. B. Chrome, Edge) über HTTPS oder http://localhost.")));function m($=t.state.getState()){const v=!!$.app?.hasDatabase;if(a.classList.toggle("d-none",v),v){l.classList.add("d-none"),c.section.classList.add("d-none");return}i==="wizard"?(l.classList.add("d-none"),c.section.classList.remove("d-none")):(l.classList.remove("d-none"),c.section.classList.add("d-none"))}async function f($){await _t($,async()=>{try{const v=G();v==="sqlite"||v==="filesystem"?Ze(v):Ze("filesystem")}catch(v){throw N.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),v instanceof Error?v:new Error("Dateisystem nicht verfügbar")}try{const v=await Ro();ha(v.data);const x=v.context;x?.fileHandle&&await In(x.fileHandle),t.events.emit("database:connected",{driver:G()})}catch(v){console.error("Fehler beim Öffnen der Datenbank",v),N.error(v instanceof Error?v.message:"Öffnen der Datenbank fehlgeschlagen")}})}function w($){_t($,async()=>{const v=Cr(),x=["localstorage","sqlite","memory"];for(const F of x)try{Ze(F);const W=await Mr(v);ha(W.data),t.events.emit("database:connected",{driver:G()||F});return}catch(W){console.warn(`Treiber ${F} konnte nicht initialisiert werden`,W)}const D="Keine geeignete Speicheroption verfügbar. Bitte Browserberechtigungen prüfen.";console.error(D),N.error(D)})}async function b($){if(!n){N.warning("Bitte erst die Datenbank erzeugen.");return}await _t($,async()=>{try{const v=G();v==="sqlite"||v==="filesystem"?Ze(v):Ze("filesystem")}catch(v){throw N.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),v instanceof Error?v:new Error("Dateisystem nicht verfügbar")}try{const v=await Mr(n);ha(v.data),t.events.emit("database:connected",{driver:G()})}catch(v){console.error("Fehler beim Speichern der Datenbank",v),N.error(v instanceof Error?v.message:"Die Datei konnte nicht gespeichert werden")}})}function h($){$.preventDefault();const v=new FormData(c.form),x=(v.get("wizard-company-name")||"").toString().trim();if(!x){N.warning("Bitte einen Firmennamen angeben.");return}const D=(v.get("wizard-company-headline")||"").toString().trim(),F=(v.get("wizard-company-address")||"").toString().trim();n=Cr({meta:{company:{name:x,headline:D,logoUrl:"",contactEmail:"",address:F}}}),r=Qs(x),c.preview.textContent=JSON.stringify(n,null,2),c.filenameLabel.textContent=r,c.resultCard.classList.remove("d-none"),c.resultCard.scrollIntoView({behavior:"smooth",block:"start"})}function P(){i="landing",n=null,r=Bn,c.reset(),m()}function A(){i="wizard",m()}async function T($){await _t($,async()=>{try{const v=await Fn();if(!v){N.warning("Keine gespeicherte Datei gefunden.");return}if(!await Ts(v)){N.warning("Berechtigung zum Zugriff auf die Datei wurde verweigert.");return}Ze("sqlite");const D=await v.getFile(),F=await D.arrayBuffer(),W=await Wo(F,D.name);Oo(v),ha(W.data),await In(v),t.events.emit("database:connected",{driver:"sqlite",autoStarted:!0}),N.success("Datenbank erfolgreich geladen!")}catch(v){console.error("Auto-Start fehlgeschlagen:",v),N.error(v instanceof Error?v.message:"Fehler beim Laden der gespeicherten Datei")}})}async function B(){await Ns();const $=l.querySelector("#auto-start-banner");$&&$.classList.add("d-none"),N.info("Gespeicherte Datei wurde vergessen.")}async function J($){await _t($,async()=>{if(await Bs()){N.success("App wird installiert!");const x=l.querySelector("#pwa-install-banner");x&&x.classList.add("d-none")}})}if(l.addEventListener("click",$=>{const v=$.target?.closest("button[data-action]");if(!v)return;const x=v.dataset.action;if(x==="start-wizard"){A();return}x==="open"?f(v):x==="useDefaults"?w(v):x==="auto-start"?T(v):x==="auto-start-forget"?B():x==="install-pwa"&&J(v)}),c.form.addEventListener("submit",h),c.section.addEventListener("click",$=>{const v=$.target?.closest("[data-action]");if(!v)return;const x=v.dataset.action;if(x==="wizard-back"){P();return}x==="wizard-save"&&b(v)}),t.state.subscribe($=>m($)),m(t.state.getState()),!t.state.getState().app.hasDatabase){const $=$i();if($&&$!==G())try{Ze($)}catch(v){console.warn("Bevorzugter Speicher konnte nicht gesetzt werden",v)}}(async()=>{const $=await Fn(),v=await _i(),x=!!($&&v?.hasDatabase),D=mt();u(x,D);const F=l.querySelector('[data-role="view-count"]');if(F&&Vs("app").then(K=>{K!==null&&(F.textContent=Zs(K))}),x&&$){const K=l.querySelector('[data-role="auto-start-filename"]');K&&(K.textContent=`Datei: ${$.name}`)}Y(),window.addEventListener("pwa:install-available",()=>{Y()}),window.addEventListener("pwa:installed",()=>{tn(),Y()}),window.addEventListener("pwa:permission-required",async K=>{const Ie=K.detail?.handle;if(Ie){const it=l.querySelector("#auto-start-banner"),Bt=l.querySelector('[data-role="auto-start-filename"]');it&&Bt&&(Bt.textContent=`Datei: ${Ie.name} (Berechtigung erforderlich)`,it.classList.remove("d-none"))}}),console.log("[Startup] PWA Capabilities:",Ki());const W=await Oi();console.log("[Startup] PWA Install Status (async):",W),Q(W)})();function Y(){const $=Wi();Q($)}function Q($){const v=l.querySelector("#pwa-install-banner"),x=l.querySelector('[data-role="pwa-content"]');if(!(!v||!x)){if(!$.showBanner){v.classList.add("d-none");return}v.classList.remove("d-none"),$.isInstalled?x.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-check-circle text-success me-1"></i>App ist bereits installiert
        </p>
        <p class="small mb-0" style="color: var(--text-muted);">
          Öffne die App über dein Desktop- oder Startmenü-Symbol für die beste Erfahrung.
        </p>
      `:$.canInstall?x.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-download me-1"></i>Für schnelleren Zugriff als App installieren
        </p>
        <button class="btn btn-sm btn-outline-light" data-action="install-pwa">
          <i class="bi bi-download me-1"></i>App installieren
        </button>
      `:v.classList.add("d-none")}}jr=!0}function Vi(e){let t=!1,a=!1;const n=s=>{e.onStatusChange&&e.onStatusChange(s)},r=()=>{t||!a||I().app.activeSection!==e.section||e.shouldRefresh&&!e.shouldRefresh()||(a=!1,n("refreshing"),Promise.resolve(e.onRefresh()).catch(l=>{console.error("Auto-Refresh konnte nicht ausgeführt werden",l),a=!0,n("stale")}).finally(()=>{!t&&!a&&n("idle")}))},i=Pe(e.event,()=>{e.shouldHandleEvent&&!e.shouldHandleEvent()||(a=!0,n("stale"),r())}),o=Pe("app:sectionChanged",s=>{s===e.section&&(a?r():n("idle"))});return I().app.activeSection===e.section&&n("idle"),()=>{t=!0,i(),o()}}const Xs={prev:"Zurück",next:"Weiter",loading:"Lädt …",empty:"Keine Einträge verfügbar"};function Ur(){const e=document.createElement("span");return e.className="spinner-border spinner-border-sm",e.setAttribute("role","status"),e.setAttribute("aria-hidden","true"),e}function Vr(e){const t=document.createElement("div");return t.className="pager-widget__info text-muted small text-center flex-grow-1",t.textContent=e?.trim()||"",t}function la(e,t){if(!e)return null;const a=document.createElement("div");a.className="pager-widget d-flex flex-column gap-2",e.innerHTML="",e.appendChild(a);let n={status:"hidden"},r=!1;const i={...Xs,...t.labels||{}};function o(){a.replaceChildren()}function s(p){const m=Vr(p.info||i.empty);a.replaceChildren(m)}function l(p){const m=document.createElement("div");m.className="alert alert-danger mb-0",m.textContent=p.message||"Unbekannter Fehler",a.replaceChildren(m)}function u(p){const m=document.createElement("div");m.className="pager-widget__controls d-flex flex-column flex-md-row gap-2 align-items-stretch";const f=document.createElement("button");f.type="button",f.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",f.disabled=!p.canPrev||p.loadingDirection==="prev",f.textContent=i.prev,p.loadingDirection==="prev"&&f.prepend(Ur()),f.addEventListener("click",()=>{f.disabled||t.onPrev()});const w=document.createElement("button");w.type="button",w.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",w.disabled=!p.canNext||p.loadingDirection==="next",w.textContent=i.next,p.loadingDirection==="next"&&w.append(Ur()),w.addEventListener("click",()=>{w.disabled||t.onNext()});const b=Vr(p.info||(p.canPrev||p.canNext?i.loading:i.empty));m.append(f,b,w),a.replaceChildren(m)}function c(p){switch(p.status){case"hidden":o();break;case"disabled":s(p);break;case"error":l(p);break;case"ready":u(p);break;default:o();break}}return{update(p){r||(n=p,c(p))},destroy(){r||(r=!0,a.replaceChildren(),e.innerHTML="")},getState(){return n}}}const nr=new Set;let Zr=!1;function el(){return typeof window>"u"?null:window.__PSL?.debugOverlayApi??null}function Zi(){Zr||typeof window>"u"||(Zr=!0,window.addEventListener("psl:debug-overlay-ready",()=>{nr.forEach(e=>{rr(e)})}))}function rr(e){const t=el();t?.registerProvider&&(e.handle||(e.handle=t.registerProvider(e.config)),e.handle.update(e.lastMetrics??null))}function Qi(e){const t={config:e,handle:null,lastMetrics:null};return nr.add(t),Zi(),rr(t),t}function Ji(e,t){e.lastMetrics=t,nr.add(e),Zi(),rr(e)}function Yi(e){if(e==null)return 0;try{const t=JSON.stringify(e);return t?Number((t.length/1024).toFixed(1)):0}catch{return null}}const Qr=5e3,Jr=50,ir=50,$a=3;function vn(e){if(e==null||e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function tl(e){if(!e)return null;const t=vn(e.areaHa);if(t!==null)return t;const a=vn(e.areaAr);if(a!==null)return a/100;const n=vn(e.areaSqm);return n!==null?n/1e4:null}function al(e,t="–"){const a=tl(e);return a===null?t:ts(a,2,t)}function nl(e){return e.toISOString().slice(0,10)}function Ra(e){if(!e)return;if(/^\d{4}-\d{2}-\d{2}$/.test(e))return e;const t=new Date(e);if(!Number.isNaN(t.getTime()))return nl(t)}function Yr(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function or(){return{startDate:"",endDate:""}}function Xi(e,t){if(!e)return;const a=e.querySelector("#doc-start"),n=e.querySelector("#doc-end");a&&t.startDate&&(a.value=t.startDate),n&&t.endDate&&(n.value=t.endDate)}function rl(e,t="sqlite"){if(typeof e=="string")return e.includes(":")?e:/^\d+$/.test(e)?Lt(t,Number(e)):e;if(typeof e=="number")return Lt(t,e);if(e&&typeof e=="object"){const a=e.source||t;if(typeof e.ref=="string"&&e.ref.includes(":"))return e.ref;const n=Number(e.ref);if(!Number.isNaN(n))return Lt(a,n)}return null}function il(e){const t=new Set;return e?.length&&e.forEach(a=>{const n=rl(a);n&&t.add(n)}),t}function eo(e){const t=e.querySelector('[data-role="doc-focus-banner"]'),a=e.querySelector('[data-role="doc-focus-text"]');if(!t||!a)return;if(!et){t.classList.add("d-none");return}const n=z.startDate&&z.endDate?`${z.startDate} - ${z.endDate}`:"Aktuelle Filter",r=et.label||"Importierter Zeitraum",i=et.highlightEntryIds.size,o=i?` (${i} markiert)`:"";a.textContent=`${r}: ${n}${o}`,t.classList.remove("d-none")}function ol(e,t){const a=e.querySelector('[data-role="doc-refresh-indicator"]');if(a){if(a.classList.remove("alert-info","alert-warning"),t==="idle"){a.classList.add("d-none");return}a.classList.remove("d-none"),t==="stale"?(a.classList.add("alert-warning"),a.textContent="Neue Dokumentationseinträge verfügbar. Ansicht aktualisiert sich beim Öffnen."):(a.classList.add("alert-info"),a.textContent="Aktualisiere Dokumentation...")}}function yn(e,t,a={}){et&&(et=null,Zt=null,eo(e),a.refreshList&&nt(e,t.state.getState().fieldLabels))}function sl(e,t){if(!Zt)return;const a=pt(Zt);a&&(Zt=null,oo(e,a,t))}function ll(e,t,a){if(!a)return;const n=Ra(a.startDate),r=Ra(a.endDate),i=!!a.entryIds?.length;if(!n&&!r&&!i)return;z={...z,...n?{startDate:n}:{},...r?{endDate:r}:{}},a.creator!==void 0&&(z={...z,creator:a.creator||void 0}),a.crop!==void 0&&(z={...z,crop:a.crop||void 0});const o=il(a.entryIds);et={label:a.label,reason:a.reason,startDate:z.startDate,endDate:z.endDate,highlightEntryIds:o},Zt=a.autoSelectFirst&&o.size?o.values().next().value??null:null;const s=e.querySelector("#doc-filter");Xi(s,z),eo(e),zn=!0,Qe(e,t.state.getState()).finally(()=>{zn=!1})}function cl(){if(typeof window>"u")return{enabled:!1,count:ya};try{const e=new URLSearchParams(window.location.search);if(!e.has("seedHistory"))return{enabled:!1,count:ya};const t=e.get("seedHistory"),a=t?Number(t):Number.NaN;return{enabled:!0,count:Number.isFinite(a)&&a>0?Math.min(Math.round(a),dl):ya}}catch(e){return console.warn("seedHistory Parameter konnte nicht gelesen werden",e),{enabled:!1,count:ya}}}const Ce=25,Xr=4,wn=new Intl.NumberFormat("de-DE"),ya=200,dl=2e3,It=cl();let ei=!1,ne="memory",z=or(),fe=0,U=[],Ke=[],O=0;const De=new Map,ke=new Map([[0,null]]),ye=new Set,Xe=new Map,Et=new Map;let ve=!1,Rt=null,Wt=0,et=null,zn=!1,Zt=null,Wa=!1,Ca="",Oa=!1,wa=null,xa=null,ti=null,pe=0,ka=null,ai=null,Le=null,Qt=!1,ni=null;const ul=Qi({id:"documentation",label:"Documentation",budget:{initialLoad:50,maxItems:150}});let to=null;function Ft(e){return e.app?.storageDriver||G()}function Lt(e,t){return`${e}:${t}`}function sr(e){const t={},a=Yr(e.startDate,"start"),n=Yr(e.endDate,"end");return a&&(t.startDate=a),n&&(t.endDate=n),e.creator&&(t.creator=e.creator),e.crop&&(t.crop=e.crop),t}function pl(e,t){return{id:Lt("state",t),entry:e,source:"state",ref:t}}function fl(e){const t=Number(e?.id??e?.historyId??0),a={...e};return delete a.id,{id:Lt("sqlite",t),entry:a,source:"sqlite",ref:t}}function ml(){return ne==="memory"?U.length:fe>0?fe:O*Ce+U.length||null}function gl(){const e=[];if(ve&&e.push("Lädt …"),Le&&e.push("Fehler"),et&&e.push("Fokus aktiv"),ne==="sqlite"&&ke.get(O+1)&&e.push("Weitere Seiten verfügbar"),!!e.length)return e.join(" · ")}function bl(){const e={items:U.length,totalCount:ml(),cursor:ne==="sqlite"?`Seite ${O+1}`:null,payloadKb:Yi(Ke.map(t=>t.entry)),lastUpdated:to,note:gl()};Ji(ul,e)}function pt(e){return U.find(t=>t.id===e)}function an(e){const t=e.querySelector('[data-role="archive-form"]');if(!t)return;const a=t.querySelector('input[name="archive-start"]'),n=t.querySelector('input[name="archive-end"]');a&&(a.value=z.startDate||""),n&&(n.value=z.endDate||"")}function re(e,t,a="info"){const n=e.querySelector('[data-role="archive-status"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a}`,n.textContent=t,n.classList.remove("d-none")}}function Tn(e,t){const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(!a)return;const r=!a.classList.contains("d-none"),i=typeof t=="boolean"?t:!r;a.classList.toggle("d-none",!i),n&&(n.textContent=i?"Archiv-Eingaben ausblenden":"Archiv erstellen"),i&&an(e)}function hl(e){const t=e.querySelector('input[name="archive-start"]'),a=e.querySelector('input[name="archive-end"]');if(!t?.value||!a?.value)return null;const n=e.querySelector('input[name="archive-storage"]'),r=e.querySelector('textarea[name="archive-note"]'),i=e.querySelector('input[name="archive-remove"]');return{startDate:t.value,endDate:a.value,storageHint:n?.value.trim()||void 0,note:r?.value.trim()||void 0,removeAfterExport:i?i.checked:!0}}function lr(e,t){const a=e.querySelector('[data-action="archive-toggle"]'),n=e.querySelector('[data-action="archive-submit"]'),r=e.querySelector('[data-role="archive-form"]'),i=e.querySelector('[data-role="archive-driver-hint"]'),o=Ft(t)==="sqlite"&&!!t.app?.hasDatabase;a&&(a.disabled=!o||Wa),n&&(n.disabled=!o||Wa),!o&&r&&r.classList.add("d-none"),i&&(i.textContent=o?"Lokale SQLite-Datenbank aktiv":"Nur mit SQLite verfügbar",i.className=`badge ${o?"bg-success":"bg-secondary"}`),o?cr():Oa=!1}function ri(e,t){Wa=t;const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(a&&a.querySelectorAll("input, textarea, button").forEach(r=>{if(r.dataset.action==="archive-cancel"&&t){r.setAttribute("disabled","disabled");return}t?r.setAttribute("disabled","disabled"):r.removeAttribute("disabled")}),n&&(n.disabled=t||n.disabled,!t)){const r=I();n.disabled=Ft(r)!=="sqlite"||!r.app?.hasDatabase}}function vl(e,t){const a=n=>n?n.replace(/[^0-9-]/g,""):"unbekannt";return`pflanzenschutz-archiv-${a(e)}_${a(t)}.zip`}function yl(e){let t=[];return Ue("archives",a=>{const n=Array.isArray(a?.logs)?a.logs:[];return t=[e,...n].slice(0,ir),{...a||{logs:[]},logs:t}}),t}async function cr({force:e=!1}={}){if(wa){if(await wa,!e)return}else if(Oa&&!e)return;const t=I();if(Ft(t)!=="sqlite"||!t.app?.hasDatabase)return;const n=(async()=>{try{const r=await Ko({limit:ir});Ue("archives",i=>({...i&&typeof i=="object"?i:{logs:[]},logs:r.items})),Oa=!0}catch(r){console.warn("Archive logs could not be loaded",r)}})();wa=n;try{await n}finally{wa=null}}async function wl(e,t){const a=Ft(I());if(yl(e),a!=="sqlite"){console.warn("Archive logs require SQLite. Changes stored in memory only.");return}try{const n={...e,metadata:t??void 0};await Qo(n),await $e()}catch(n){console.error("Archive log could not be persisted",n),Oa=!1}finally{await cr({force:!0})}}function Nn(e){return!Array.isArray(e)||!e.length?"[]":e.map(t=>`${t.id}:${t.archivedAt}:${t.entryCount}`).join("|")}function xl(e){return e?Xt(e)||e.slice(0,16).replace("T"," "):"-"}function ta(e,t,a={}){const n=e.querySelector('[data-role="archive-log-list"]');if(!n)return;const r=Array.isArray(t)?t:[];a.resetPage!==!1&&(pe=0);const i=Cl(r);if(!i.total){n.innerHTML='<div class="text-muted small">Noch keine Archive erstellt.</div>',si(e,i);return}const o=i.items.map(s=>{const l=xl(s.archivedAt),u=`${s.startDate||"-"} – ${s.endDate||"-"}`,c=s.entryCount===1?"Eintrag":"Einträge";return`
        <div class="list-group-item border rounded mb-2 p-3" data-action="archive-log-focus" data-log-id="${s.id}" style="cursor: pointer;">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="fs-5 fw-bold mb-1">${y(u)}</div>
              <div class="text-muted">${s.entryCount} ${c} · Erstellt ${y(l)}</div>
            </div>
            <i class="bi bi-chevron-right text-muted fs-4"></i>
          </div>
        </div>
      `}).join("");n.innerHTML=`<div class="list-group list-group-flush">${o}</div>`,si(e,i)}function ii(e,t){const a=e.archives?.logs;if(Array.isArray(a))return a.find(n=>n.id===t)}async function kl(e){if(e){if(typeof navigator<"u"&&navigator.clipboard&&typeof navigator.clipboard.writeText=="function"){await navigator.clipboard.writeText(e);return}if(typeof document<"u"){const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select(),document.execCommand("copy"),document.body.removeChild(t)}}}async function ca(e){if(Et.has(e.id))return Et.get(e.id);let t=null;if(e.source==="sqlite")try{t=await Jo(e.ref)}catch(a){console.error("History entry fetch failed",a)}else{const a=he(I().history);t=(typeof e.ref=="number"?a[e.ref]:void 0)||e.entry}return t&&Et.set(e.id,t),t}function ao(e){return e&&(e.datum||Xt(e.dateIso)||(typeof e.date=="string"?e.date:""))||""}function Sl(e){if(e?.gpsCoordinates){const t=es(e.gpsCoordinates);if(t)return t}return""}function El(e){return e?.gps||""}function qn(e){if(!e)return null;if(e.dateIso){const n=as(e.dateIso);if(n)return new Date(n.getFullYear(),n.getMonth(),n.getDate())}const t=typeof e.datum=="string"&&e.datum||typeof e.date=="string"&&e.date||null;if(!t)return null;const a=t.split(".");if(a.length===3){const[n,r,i]=a.map(Number);if(!Number.isNaN(n)&&!Number.isNaN(r)&&!Number.isNaN(i))return new Date(i,r-1,n)}return null}function Ll(e,t){const a=qn(e);if(t.startDate){const r=new Date(t.startDate);if(r.setHours(0,0,0,0),!a||a<r)return!1}if(t.endDate){const r=new Date(t.endDate);if(r.setHours(23,59,59,999),!a||a>r)return!1}const n=[["creator",e.ersteller],["crop",e.kultur]];for(const[r,i]of n){const s=t[r]?.trim().toLowerCase();if(s&&!`${i||""}`.toLowerCase().includes(s))return!1}return!0}function dr(e){if(!e)return"";const t=r=>r==null?"":String(r),n=(Array.isArray(e.items)?e.items:[]).map(r=>{const i=Object.keys(r).sort().reduce((o,s)=>(o[s]=r[s],o),{});return JSON.stringify(i)}).sort();return JSON.stringify({savedAt:t(e.savedAt),dateIso:t(e.dateIso),datum:t(e.datum),ersteller:t(e.ersteller),standort:t(e.standort),kultur:t(e.kultur),usageType:t(e.usageType),eppoCode:t(e.eppoCode),invekos:t(e.invekos),bbch:t(e.bbch),gps:t(e.gps),gpsPointId:t(e.gpsPointId),areaHa:e.areaHa??null,areaAr:e.areaAr??null,areaSqm:e.areaSqm??null,kisten:e.kisten??null,itemHashes:n})}function no(e){e.size&&Ue("history",t=>{const a=oa(t);if(!a.items.length)return a;let n=!1;const r=a.items.filter(i=>{const o=dr(i);return e.has(o)?(n=!0,!1):!0});return n?{...a,items:r,totalCount:Math.min(a.totalCount,r.length),lastUpdatedAt:new Date().toISOString()}:a})}function Dl(e){return e.slice().sort((t,a)=>{const n=qn(t.entry)?.getTime()||new Date(t.entry.savedAt||0).getTime();return(qn(a.entry)?.getTime()||new Date(a.entry.savedAt||0).getTime())-n})}function oi(){return ne==="sqlite"?fe>0?Math.max(Math.ceil(fe/Ce),1):Math.max(O+1,De.size||0):U.length?Math.max(Math.ceil(U.length/Ce),1):0}function ro(){if(ne==="sqlite"){const t=Math.max(oi()-1,0);return O>t&&(O=t),O<0&&(O=0),O*Ce}if(!U.length)return O=0,0;const e=Math.max(oi()-1,0);return O>e&&(O=e),O<0&&(O=0),O*Ce}function nn(){if(!U.length){Ke=[];return}if(ne==="sqlite"){Ke=U.slice();return}const e=ro(),t=Math.min(e+Ce,U.length);Ke=U.slice(e,t)}function Pl(e){if(De.size<=Xr)return;const t=Array.from(De.keys()).sort((a,n)=>{const r=Math.abs(a-e);return Math.abs(n-e)-r});for(;De.size>Xr&&t.length;){const a=t.shift();a==null||a===e||De.delete(a)}}function Al(e){const t=e.querySelector('[data-role="doc-pager"]');return t?((!xa||ti!==t)&&(xa?.destroy(),xa=la(t,{onPrev:()=>Fl(e),onNext:()=>Bl(e),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Dokumentation...",empty:"Keine Einträge"}}),ti=t),xa):null}function $l(e){const t=e.querySelector('[data-role="archive-log-pager"]');return t?((!ka||ai!==t)&&(ka?.destroy(),ka=la(t,{onPrev:()=>Ml(e),onNext:()=>Il(e),labels:{prev:"Zurück",next:"Weiter",loading:"Archive werden geladen...",empty:"Keine Einträge"}}),ai=t),ka):null}function Cl(e){const t=e.length;if(!t)return pe=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/$a),1);pe>=a&&(pe=a-1),pe<0&&(pe=0);const n=pe*$a,r=Math.min(n+$a,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function si(e,t){const a=$l(e);if(a){if(!t.total){a.update({status:"disabled",info:"Noch keine Archive"});return}a.update({status:"ready",info:`Einträge ${t.start+1}–${t.end} von ${t.total}`,canPrev:pe>0,canNext:t.end<t.total})}}function Ml(e){if(pe===0)return;pe=Math.max(pe-1,0);const t=I().archives?.logs??[];ta(e,t,{resetPage:!1})}function Il(e){const t=I().archives?.logs??[],a=t.length;if(!a)return;const n=Math.max(Math.ceil(a/$a),1);pe>=n-1||(pe=Math.min(pe+1,n-1),ta(e,t,{resetPage:!1}))}function Ma(e){const t=Al(e);if(!t)return;if(Le){t.update({status:"error",message:Le});return}const a=ne==="memory"?U.length:fe,n=Ke.length;if(!n){const u=ve?"Lade Dokumentation...":"Keine Einträge vorhanden.";t.update({status:"disabled",info:u});return}const r=ne==="sqlite"?O*Ce:ro(),i=`Einträge ${wn.format(r+1)}–${wn.format(r+n)}${a?` von ${wn.format(a)}`:""}`,o=ne==="memory"?r+n<U.length:!!ke.get(O+1),s=!ve&&o,l=O>0&&!ve;t.update({status:"ready",info:i,canPrev:l,canNext:s,loadingDirection:ve&&o?"next":null})}function Hn(e){if(!It.enabled)return;const t=e.querySelector('[data-action="doc-seed"]');t&&(t.disabled=Qt,t.textContent=Qt?"Dummy-Daten werden erstellt...":`+ ${It.count} Dummy-Einträge`)}function Fl(e){if(O===0||ve)return;const t=Math.max(O-1,0);if(ne==="sqlite"){ur(e,I().fieldLabels,t);return}O=t,nn(),nt(e,I().fieldLabels),na(e,I().fieldLabels)}function Bl(e){if(ve)return;const t=O+1;if(ne==="sqlite"){const n=De.has(t),r=ke.get(t);if(!n&&!r)return;ur(e,I().fieldLabels,t);return}t*Ce<U.length&&(O=t,nn(),nt(e,I().fieldLabels),na(e,I().fieldLabels))}function aa(e){ye.clear(),Xe.clear(),e&&rn(e)}function zl(){return ne==="memory"?U.length:fe}function rn(e){const t=e.querySelector('[data-role="doc-selection-info"]'),a=e.querySelector('[data-action="print-selection"]'),n=e.querySelector('[data-action="pdf-selection"]'),r=e.querySelector('[data-action="export-selection"]'),i=e.querySelector('[data-action="export-zip"]'),o=e.querySelector('[data-action="delete-selection"]'),s=ye.size;t&&(t.textContent=s?`${s} Eintrag${s===1?"":"e"} ausgewählt`:"Keine Einträge ausgewählt");const l=s===0;a&&(a.disabled=l),n&&(n.disabled=l),r&&(r.disabled=l),i&&(i.disabled=l),o&&(o.disabled=l);const u=e.querySelector('[data-action="toggle-select-all"]');if(u){const c=zl();u.disabled=c===0,u.checked=c>0&&s>=c,u.indeterminate=s>0&&s<c}}function _n(e,t){e.querySelectorAll('[data-role="doc-list"] .doc-sidebar-entry').forEach(n=>{const r=!!(t&&n.dataset.entryId===t);n.classList.toggle("active",r)})}function Kt(e,t,a){const n=e.querySelector("#doc-detail"),r=e.querySelector("#doc-detail-body"),i=e.querySelector('[data-role="doc-detail-card"]'),o=e.querySelector('[data-role="doc-detail-empty"]');if(!n||!r||!i||!o)return;if(!t){n.dataset.entryId="",i.classList.add("d-none"),o.classList.remove("d-none"),r.innerHTML="",_n(e,null);return}n.dataset.entryId=t.entry.id,i.classList.remove("d-none"),o.classList.add("d-none"),_n(e,t.entry.id);const s=a||I().fieldLabels,l=s.history?.tableColumns??{},u=s.history?.detail??{},c=t.detail||t.entry.entry,p=Yo(c.items||[],s,"detail"),m=c.gpsCoordinates?sa(c.gpsCoordinates):null,f=El(c),w=Sl(c),b=u.gpsNote||l.gpsNote||u.gps||l.gps||"GPS-Notiz",h=u.gpsCoordinates||l.gpsCoordinates||u.gps||l.gps||"GPS-Koordinaten",P=w?`${y(w)}${m?` <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${y(m)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:""}`:"-";r.innerHTML=`
    <p>
      <strong>${y(l.date||"Datum")}:</strong> ${y(ao(c))}<br />
      <strong>${y(u.creator||"Erstellt von")}:</strong> ${y(c.ersteller||"")}<br />
      <strong>${y(u.location||"Standort")}:</strong> ${y(c.standort||"")}<br />
      <strong>${y(u.crop||"Kultur")}:</strong> ${y(c.kultur||"")}<br />
      <strong>${y(u.usageType||"Art der Verwendung")}:</strong> ${y(c.usageType||"")}<br />
      <strong>${y(u.quantity||"Fläche (ha)")}:</strong> ${y(al(c))}<br />
      <strong>${y(u.eppoCode||"EPPO-Code")}:</strong> ${y(c.eppoCode||"")}<br />
      <strong>${y(u.bbch||"BBCH")}:</strong> ${y(c.bbch||"")}<br />
      <strong>${y(u.invekos||"InVeKoS")}:</strong> ${y(c.invekos||"")}<br />
      <strong>${y(b)}:</strong> ${f?y(f):"-"}<br />
      <strong>${y(h)}:</strong> ${P}<br />
      <strong>${y(u.time||"Uhrzeit")}:</strong> ${y(c.uhrzeit||"")}<br />
    </p>
    ${Xo({maschine:c.qsMaschine,schaderreger:c.qsSchaderreger,verantwortlicher:c.qsVerantwortlicher,wetter:c.qsWetter,behandlungsart:c.qsBehandlungsart})}
    <div class="table-responsive">
      ${p}
    </div>
  `}function nt(e,t){nn();const a=e.querySelector('[data-role="doc-list"]');if(!a)return;const r=e.querySelector("#doc-detail")?.dataset.entryId||null;if(!Ke.length)a.innerHTML=ve?'<div class="text-center text-muted py-4">Lädt ...</div>':'<div class="text-center text-muted py-4">Noch keine Einträge</div>';else{a.innerHTML="";const i=document.createDocumentFragment();(t||I().fieldLabels).history?.detail?.usageType,Ke.forEach(s=>{const l=document.createElement("div"),u=!!et?.highlightEntryIds?.has(s.id);l.className=`doc-sidebar-entry list-group-item${u?" doc-sidebar-entry--highlight":""}`,l.dataset.entryId=s.id;const c=ao(s.entry)||"-",p=u?'<span class="badge bg-warning-subtle text-warning-emphasis badge-import">Import</span>':"";l.innerHTML=`
        <div
          class="doc-sidebar-entry__main"
          data-action="view-entry"
          data-entry-id="${s.id}"
        >
          <div class="d-flex justify-content-between gap-2">
            <span class="fw-bold d-flex align-items-center gap-2">
              ${y(s.entry.kultur||"-")}
              ${p}
            </span>
            <small class="text-muted">${y(c)}</small>
          </div>
          <div class="text-muted small mb-1">
            ${y(s.entry.ersteller||"-")} | ${y(s.entry.standort||"-")}
          </div>
          <div class="small text-muted">
            ${y(s.entry.usageType||"-")} · ${y(s.entry.eppoCode||"-")} · ${y(s.entry.invekos||"-")}
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2 gap-2 no-print">
          <button class="btn btn-sm btn-outline-secondary" data-action="print-entry" data-entry-id="${s.id}">Drucken</button>
          <label class="form-check-label d-flex align-items-center gap-2 mb-0">
            <input type="checkbox" class="form-check-input" data-action="toggle-select" data-entry-id="${s.id}" ${ye.has(s.id)?"checked":""} />
            <span class="small">Auswahl</span>
          </label>
        </div>
      `,i.appendChild(l)}),a.appendChild(i)}_n(e,r),sl(e,t),Ma(e),rn(e),to=new Date().toISOString(),bl()}function na(e,t){const a=e.querySelector('[data-role="doc-info"]');if(!a)return;const n=fe,r=!!(z.crop||z.creator);if(!n&&!ve){a.textContent="Keine Einträge";return}if(!n&&ve){a.textContent="Lädt...";return}if(z.startDate&&z.endDate){const i=`${z.startDate} - ${z.endDate} (${n})`;a.textContent=r?`${i} + Filter`:i;return}a.textContent=`Alle Einträge (${n})`}async function io(e,t){const n=e.querySelector("#doc-detail")?.dataset.entryId;if(!n){Kt(e,null,t);return}const r=pt(n);if(!r){Kt(e,null,t);return}const i=await ca(r);i?Kt(e,{entry:r,detail:i},t):Kt(e,null,t)}async function ur(e,t,a=O,n={}){const r=Math.max(0,a),i=!!n.forceReload;i&&(De.clear(),ke.clear(),ke.set(0,null),fe=0,U=[],Ke=[],O=0,Le=null);const o=i?void 0:De.get(r);if(o&&!n.forceReload){O=r,U=o,Le=null,nt(e,t),na(e),Ma(e);return}const s=ke.has(r)?ke.get(r)??null:null,l=Symbol("doc-load");Rt=l,ve=!0,Le=null,Ma(e);try{const u=await Ii({cursor:s,pageSize:Ce,filters:sr(z),sortDirection:"desc",includeTotal:i||r===0||fe===0});if(Rt!==l)return;const c=u.items.map(p=>fl(p));if(De.set(r,c),Pl(r),ke.set(r,s),ke.set(r+1,u.nextCursor??null),typeof u.totalCount=="number")fe=u.totalCount;else{const p=r*Ce+c.length;fe=Math.max(fe,p)}O=r,U=c,Le=null,nt(e,t),na(e,t)}catch(u){Rt===l&&(console.error("Dokumentation konnte nicht geladen werden",u),Le="Dokumentation konnte nicht geladen werden. Bitte erneut versuchen.",window.alert("Dokumentation konnte nicht geladen werden. Bitte erneut versuchen."))}finally{Rt===l&&(ve=!1,Rt=null,Ma(e))}}async function Tl(e,t){const a=he(t.history);U=Dl(a.map((n,r)=>pl(n,r)).filter(n=>Ll(n.entry,z))),fe=U.length,O=0,Le=null,nn(),nt(e,t.fieldLabels),na(e,t.fieldLabels),await io(e,t.fieldLabels)}async function Qe(e,t){const a=Ft(t),n=!!t.app?.hasDatabase,r=a==="sqlite"&&n;if(ne=r?"sqlite":"memory",Et.clear(),O=0,Le=null,fe=0,U=[],Ke=[],De.clear(),ke.clear(),ke.set(0,null),aa(e),lr(e,t),an(e),ta(e,t.archives?.logs??[]),Ca=Nn(t.archives?.logs),r){await ur(e,t.fieldLabels,0,{forceReload:!0}),await io(e,t.fieldLabels);return}await Tl(e,t)}async function xn(){const e=[];for(const t of ye){const a=Xe.get(t)||pt(t);if(!a)continue;const n=await ca(a);n&&e.push(n)}return e}async function Nl(e,t){if(!t){aa(e),nt(e,I().fieldLabels);return}if(ye.clear(),Xe.clear(),ne==="memory")for(const a of U)ye.add(a.id),Xe.set(a.id,a);else try{const a=await Fi({filters:sr(z),sortDirection:"desc",limit:1e4}),n=Array.isArray(a.historyIds)?a.historyIds:[];a.entries.forEach((r,i)=>{const o=Number(n[i]);if(!Number.isFinite(o))return;const s=Lt("sqlite",o);ye.add(s),Xe.set(s,{id:s,entry:r,source:"sqlite",ref:o}),Et.has(s)||Et.set(s,r)})}catch(a){console.error("Alle Einträge konnten nicht ausgewählt werden",a),window.alert("Alle Einträge konnten nicht ausgewählt werden. Bitte erneut versuchen.")}nt(e,I().fieldLabels),rn(e)}async function ql(e,t){if(!ye.size)return;const a=Array.from(ye).map(s=>Xe.get(s)||pt(s)).filter(s=>!!s),n=[];for(const s of a){const l=await ca(s);l&&n.push(l)}const r=a.filter(s=>s.source==="sqlite"),i=!!r.length;if(i)for(const s of r)await Zo(s.ref);const o=new Set(a.filter(s=>s.source==="state").map(s=>s.ref));if(o.size&&(Ue("history",s=>{const l=oa(s),u=l.items.filter((c,p)=>!o.has(p));return u.length===l.items.length?l:{...l,items:u,totalCount:Math.min(l.totalCount,u.length),lastUpdatedAt:new Date().toISOString()}}),await Hl()),n.length){const s=new Set(n.map(l=>dr(l)));no(s)}if(i){try{await $e()}catch(s){console.warn("SQLite-Datei konnte nach dem Löschen nicht gespeichert werden",s)}t.events?.emit?.("history:data-changed",{type:"deleted",ids:r.map(s=>s.ref)})}aa(e),await Qe(e,t.state.getState())}async function oo(e,t,a){const n=await ca(t);if(!n){window.alert("Details konnten nicht geladen werden.");return}Kt(e,{entry:t,detail:n},a)}async function li(e){const t=await ca(e);t?await so([t]):window.alert("Eintrag konnte nicht geladen werden.")}async function Hl(){const e=G();if(!(!e||e==="memory"||e==="sqlite"))try{const t=we();await xe(t)}catch(t){throw console.error("Persist history failed",t),window.alert("Historie konnte nicht gespeichert werden. Bitte erneut versuchen."),t}}async function _l(e,t,a){if(Wa)return;const n=t.state.getState();if(Ft(n)!=="sqlite"||!n.app?.hasDatabase){re(e,"Archivieren ist nur mit einer lokalen SQLite-Datenbank möglich.","warning");return}const i=hl(a);if(!i?.startDate||!i.endDate){re(e,"Bitte Start- und Enddatum für das Archiv wählen.","warning");return}const o=Ra(i.startDate),s=Ra(i.endDate);if(!o||!s){re(e,"Die angegebenen Daten sind ungültig.","danger");return}if(new Date(o)>new Date(s)){re(e,"Startdatum darf nicht nach dem Enddatum liegen.","danger");return}const l={startDate:o,endDate:s,creator:z.creator,crop:z.crop},u=sr(l);ri(e,!0),re(e,"Prüfe Zeitraum und Eintragsmenge...","info");try{const c=await Ii({cursor:null,pageSize:1,filters:u,sortDirection:"asc",includeTotal:!0}),p=c.totalCount??c.items.length??0;if(!p){re(e,"Im angegebenen Zeitraum wurden keine Einträge gefunden.","warning");return}if(p>Qr){re(e,`Maximal ${Qr} Einträge pro Archiv erlaubt. Bitte Zeitraum verkürzen.`,"warning");return}re(e,`Exportiere ${p} Einträge in ein ZIP-Archiv...`,"info");const m=await Fi({filters:u,limit:p,sortDirection:"asc"}),f=m?.entries??[];if(!f.length){re(e,"Archiv konnte nicht erstellt werden – Export lieferte keine Einträge.","danger");return}const w=f.map(v=>({...v})),b={format:"pflanzenschutz-archive",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:w.length,filters:{startDate:o,endDate:s,creator:l.creator||null,crop:l.crop||null},archive:{removeFromDatabase:i.removeAfterExport,storageHint:i.storageHint||null,note:i.note||null}},h=Bi({"pflanzenschutz.json":_a(JSON.stringify(w,null,2)),"metadata.json":_a(JSON.stringify(b,null,2))}),P=new ArrayBuffer(h.byteLength);new Uint8Array(P).set(h);const A=new Blob([P],{type:"application/zip"}),T=vl(o,s);pr(A,T);let B=!1;if(i.removeAfterExport){re(e,"Export abgeschlossen. Entferne Einträge und bereinige Datenbank...","info"),await jo({filters:u});const v=new Set(w.map(x=>dr(x)));no(v);try{await $e()}catch(x){console.error("SQLite-Datei konnte nach dem Archivieren nicht gespeichert werden",x)}t.events?.emit?.("history:data-changed",{type:"deleted-range",filters:u});try{await Go()}catch(x){B=!0,console.error("VACUUM fehlgeschlagen",x)}}const J=new Date().toISOString(),Y={id:`archive-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,archivedAt:J,startDate:o,endDate:s,entryCount:w.length,fileName:T,storageHint:i.storageHint||void 0,note:i.note||void 0};B&&(Y.note=Y.note?`${Y.note} | VACUUM fehlgeschlagen`:"VACUUM fehlgeschlagen");const Q={filters:{...l},removeAfterExport:!!i.removeAfterExport,historyIdSample:m?.historyIds?.slice(0,Jr)};if(await wl(Y,Q),!i.removeAfterExport&&m?.historyIds?.length){const v=m.historyIds.slice(0,Jr).map(x=>({source:"sqlite",ref:x}));t.events?.emit?.("documentation:focus-range",{startDate:o,endDate:s,label:"Archiviert",reason:"archive",entryIds:v})}Tn(e,!1),a.reset(),an(e),await Qe(e,t.state.getState());const $=i.removeAfterExport?`Archiv ${T} erstellt und ${w.length} Einträge entfernt.`:`Archiv ${T} erstellt. ${w.length} Einträge bleiben in der Datenbank.`;re(e,$,B?"warning":"success")}catch(c){console.error("Archivieren fehlgeschlagen",c);const p=c instanceof Error?c.message:"Archiv konnte nicht erstellt werden.";re(e,p,"danger")}finally{ri(e,!1),lr(e,t.state.getState())}}const Rl=50;async function so(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}if(e.length>Rl&&!window.confirm(`Sie möchten ${e.length} Einträge drucken. Bei sehr vielen Einträgen kann das Erstellen der Druckvorschau einige Sekunden dauern und lässt sich nicht unterbrechen.

Fortfahren?`))return;const t=I().fieldLabels,a=Uo(I().company||null);await Vo(e,t,{title:"Dokumentation",headerHtml:a,chunkSize:25})}function pr(e,t){const a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download=t,n.click(),URL.revokeObjectURL(a)}function Wl(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const t=e.map(o=>({...o})),a=JSON.stringify(t,null,2),n=new TextEncoder().encode(a),r=new Blob([n],{type:"application/json; charset=utf-8"}),i=new Date().toISOString().replace(/[:.]/g,"-");pr(r,`pflanzenschutz-dokumentation-${i}.json`)}async function Ol(e,t){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const a=e.map(l=>({...l})),n={format:"pflanzenschutz-export",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:a.length,filters:{startDate:t.startDate||null,endDate:t.endDate||null,creator:t.creator||null,crop:t.crop||null}},r=Bi({"pflanzenschutz.json":_a(JSON.stringify(a,null,2)),"metadata.json":_a(JSON.stringify(n,null,2))}),i=new ArrayBuffer(r.byteLength);new Uint8Array(i).set(r);const o=new Blob([i],{type:"application/zip"}),s=new Date().toISOString().replace(/[:.]/g,"-");pr(o,`pflanzenschutz-dokumentation-${s}.zip`)}function Kl(){const e=document.createElement("div"),t=or(),a=z.startDate||t.startDate||"",n=z.endDate||t.endDate||"";z={...z,startDate:a,endDate:n};const r=It.enabled?`<button class="btn btn-outline-info btn-sm" type="button" data-action="doc-seed">+ ${It.count} Dummy-Einträge</button>`:"";return e.className="section-inner",e.innerHTML=`
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
            <input type="text" class="form-control" id="doc-crop" name="doc-crop" placeholder="z. B. Äpfel" value="${z.crop||""}" />
          </div>
          <div class="col-md-3">
            <label class="form-label" for="doc-creator">Anwender (optional)</label>
            <input type="text" class="form-control" id="doc-creator" name="doc-creator" placeholder="Name" value="${z.creator||""}" />
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
            <small class="text-muted">Letzte ${ir}</small>
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
  `,e}function jl(e){if(!e)return{};const t=new FormData(e),a=r=>{const i=t.get(r);return typeof i=="string"&&i?i:void 0},n=r=>{const i=t.get(r);if(typeof i!="string")return;const o=i.trim();return o||void 0};return{startDate:a("doc-start"),endDate:a("doc-end"),crop:n("doc-crop"),creator:n("doc-creator")}}let ci="entries";function Gl(e,t){ci!==t&&(ci=t,e.querySelectorAll("[data-doc-tab]").forEach(a=>{a.classList.toggle("active",a.dataset.docTab===t)}),e.querySelectorAll("[data-pane]").forEach(a=>{a.style.display=a.dataset.pane===t?"block":"none"}))}function Ul(e,t){e.addEventListener("click",a=>{const n=a.target.closest("[data-doc-tab]");if(n&&n.dataset.docTab){Gl(e,n.dataset.docTab);return}}),e.addEventListener("submit",a=>{if(a.target instanceof HTMLFormElement){if(a.target.id==="doc-filter"){a.preventDefault(),yn(e,t,{refreshList:!0});const n=jl(a.target);if(!n.startDate||!n.endDate){window.alert("Bitte Start- und Enddatum auswählen.");return}z=n,aa(e),Qe(e,t.state.getState());return}a.target.dataset.role==="archive-form"&&(a.preventDefault(),_l(e,t,a.target))}}),e.addEventListener("click",a=>{const n=a.target;if(!n)return;const r=n.dataset.action;if(!r){n.closest("[data-action]")&&a.stopPropagation();return}if(r==="reset-filters"){const s=e.querySelector("#doc-filter");s?.reset(),z=or(),Xi(s??null,z),yn(e,t,{refreshList:!0}),aa(e),Qe(e,t.state.getState());return}if(r==="archive-toggle"){Tn(e),re(e,"");return}if(r==="archive-cancel"){Tn(e,!1),re(e,"");return}if(r==="archive-log-focus"){const s=n.dataset.logId;if(!s)return;const l=ii(t.state.getState(),s);if(!l){window.alert("Archiv-Eintrag nicht gefunden.");return}const u=l.fileName?`Archiv ${l.fileName}`:"Archivierter Zeitraum";typeof t.events?.emit=="function"?t.events.emit("documentation:focus-range",{startDate:l.startDate,endDate:l.endDate,label:u,reason:"archive-log"}):(z={...z,startDate:l.startDate,endDate:l.endDate},Qe(e,t.state.getState())),re(e,`Dokumentation auf Archiv ${l.startDate} – ${l.endDate} fokussiert.`,"success");return}if(r==="archive-log-copy-hint"){const s=n.dataset.logId;if(!s)return;const l=ii(t.state.getState(),s);if(!l||!l.storageHint){window.alert("Kein Speicherhinweis vorhanden.");return}const u=l.storageHint;(async()=>{try{await kl(u),re(e,"Speicherhinweis kopiert.","success")}catch(c){console.error("Hinweis konnte nicht kopiert werden",c),window.alert("Hinweis konnte nicht kopiert werden.")}})();return}if(r==="doc-focus-clear"){yn(e,t,{refreshList:!0});return}if(r==="print-selection"||r==="pdf-selection"){(async()=>{const s=await xn();await so(s)})();return}if(r==="export-selection"){(async()=>{const s=await xn();Wl(s)})();return}if(r==="export-zip"){(async()=>{const s=await xn();await Ol(s,z)})();return}if(r==="delete-selection"){if(!ye.size||!window.confirm("Ausgewählte Einträge wirklich löschen?"))return;ql(e,t);return}if(r==="doc-seed"){if(!It.enabled||Qt)return;const l=window.__PSL?.seedHistoryEntries;if(typeof l!="function"){window.alert("Seed-Funktion ist nicht verfügbar. Bitte Entwicklungsmodus verwenden.");return}Qt=!0,Hn(e),(async()=>{try{await l(It.count),await Qe(e,t.state.getState())}catch(u){console.error("Dummy-Daten konnten nicht erstellt werden",u),window.alert("Dummy-Daten konnten nicht erstellt werden.")}finally{Qt=!1,Hn(e)}})();return}if(r==="detail-print"){const l=e.querySelector("#doc-detail")?.dataset.entryId;if(!l){window.alert("Kein Eintrag ausgewählt.");return}const u=pt(l);if(!u){window.alert("Eintrag nicht verfügbar.");return}li(u);return}const i=n.dataset.entryId;if(!i)return;const o=pt(i);if(!o){window.alert("Eintrag nicht verfügbar.");return}if(r==="view-entry"){oo(e,o,t.state.getState().fieldLabels);return}if(r==="print-entry"){li(o);return}}),e.addEventListener("change",a=>{const n=a.target;if(!n)return;if(n.dataset.action==="toggle-select-all"){Nl(e,n.checked);return}if(n.dataset.action!=="toggle-select")return;const r=n.dataset.entryId;if(r){if(n.checked){ye.add(r);const i=pt(r);i&&Xe.set(r,i)}else ye.delete(r),Xe.delete(r);rn(e)}})}function Vl(e,t){if(!e||ei)return;const a=e;a.innerHTML="";const n=Kl();a.appendChild(n),Ul(n,t),Hn(n),lr(n,t.state.getState()),an(n);const r=t.state.getState().archives?.logs??[];ta(n,r),Ca=Nn(r),cr(),typeof t.events?.subscribe=="function"&&t.events.subscribe("documentation:focus-range",s=>{!s||typeof s!="object"||ll(n,t,s)});const i=s=>he(s.history).length,o=()=>Qe(n,t.state.getState());ni?.(),ni=Vi({section:"documentation",event:"history:data-changed",shouldHandleEvent:()=>ne==="sqlite",shouldRefresh:()=>ne==="sqlite",onRefresh:()=>o(),onStatusChange:s=>ol(n,s)}),Wt=i(t.state.getState()),o(),t.state.subscribe(s=>{const l=Nn(s.archives?.logs);l!==Ca&&(Ca=l,ta(n,s.archives?.logs??[]));const u=i(s);if(zn){Wt=u;return}if(ne==="sqlite"){Wt=u;return}u!==Wt&&(Wt=u,o())}),ei=!0}const ra=e=>he(e.gps.points),jt=e=>he(e.points),Zl=new Intl.NumberFormat("de-DE",{minimumFractionDigits:5,maximumFractionDigits:5}),Ql=new Intl.DateTimeFormat("de-DE",{dateStyle:"short",timeStyle:"short"}),di="Deutschland";let ui=!1,lo="list",Sa=null,S=null,Ot=null,pi=null;const Ia=25,kn=new Intl.NumberFormat("de-DE");let ie=0,xt=null,Rn=null,fi=null;function yt(e,t){typeof e.events?.emit=="function"&&e.events.emit("history:gps-activation-result",{...t,source:"gps",timestamp:Date.now()})}function Dt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Jl(){const e=document.createElement("section");return e.className="section-inner",e.innerHTML=`
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
  `,e}function Yl(e){return{root:e,message:e.querySelector('[data-role="gps-message"]'),refreshIndicator:e.querySelector('[data-role="gps-refresh-indicator"]'),availability:e.querySelector('[data-role="gps-availability"]'),tabButtons:Array.from(e.querySelectorAll('[data-role="gps-tab"]')),panels:Array.from(e.querySelectorAll('[data-role="gps-panel"]')),listBody:e.querySelector('[data-role="gps-list"]'),emptyState:e.querySelector('[data-role="gps-empty"]'),activeInfo:e.querySelector('[data-role="gps-active-info"]'),summaryLabel:e.querySelector('[data-role="gps-summary"]'),statusBadge:e.querySelector('[data-role="gps-status"]'),form:e.querySelector('[data-role="gps-form"]'),formFields:{name:e.querySelector('[name="gps-name"]'),description:e.querySelector('[name="gps-description"]'),latitude:e.querySelector('[name="gps-latitude"]'),longitude:e.querySelector('[name="gps-longitude"]'),source:e.querySelector('[name="gps-source"]'),activate:e.querySelector('[name="gps-activate"]'),rawCoordinates:e.querySelector('[name="gps-raw-coordinates"]')},disableTargets:Array.from(e.querySelectorAll("[data-gps-disable]")),geolocationBtn:e.querySelector('[data-action="use-geolocation"]'),mapButton:e.querySelector('[data-role="gps-open-maps"]'),verifyButton:e.querySelector('[data-action="verify-coords"]')}}function Gt(e){return`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e)}`}function co(e){const t=e.gps,a=jt(t),n=o=>{if(!o)return null;const s=sa(o)||Gt(`${o.latitude},${o.longitude}`),l=o.name?`${o.name}`:`${rt(o.latitude)}, ${rt(o.longitude)}`;return{url:s,label:l}};if(t.activePointId){const o=a.find(l=>l.id===t.activePointId),s=n(o||null);if(s)return s}if(a.length>0){const o=n(a[0]);if(o)return o}const r=e.company?.address?.trim();if(r)return{url:Gt(r.replace(/\n/g,", ")),label:r};const i=e.company?.name?.trim();return i?{url:Gt(i),label:i}:{url:Gt(di),label:di}}function Xl(e){if(!S)return;const t=co(e);S.mapButton&&(S.mapButton.href=t.url,S.mapButton.title=`Google Maps öffnen (${t.label})`);const a=S.root.querySelector('[data-role="gps-empty-map-link"]');a&&(a.href=t.url)}function ec(e){if(!e)return null;const a=e.trim().replace(/\s+/g," ").replace(/[,;]/g," ").match(/-?\d+(?:[.,]\d+)?/g);if(!a||a.length<2)return null;const n=o=>Number(o.replace(/,/g,".")),r=n(a[0]),i=n(a[1]);return!Number.isFinite(r)||!Number.isFinite(i)||r<-90||r>90||i<-180||i>180?null:{latitude:r,longitude:i}}function tc(){if(!S?.formFields)return null;const e=S.formFields.latitude?.value??"",t=S.formFields.longitude?.value??"";if(!e.trim()||!t.trim())return null;const a=Number(e),n=Number(t);return!Number.isFinite(a)||!Number.isFinite(n)||a<-90||a>90||n<-180||n>180?null:{latitude:a,longitude:n}}function Ea(e){return Number(e).toFixed(6)}function ac(e,t){const a=Ea(e),n=Ea(t);return ra(I()).some(r=>Ea(r.latitude)===a&&Ea(r.longitude)===n)}function Jt(){if(!S?.verifyButton)return;const e=tc(),t=!!e;if(S.verifyButton.disabled=!t,e){const a=sa({latitude:e.latitude,longitude:e.longitude});S.verifyButton.dataset.targetUrl=a||Gt(`${e.latitude},${e.longitude}`)}else delete S.verifyButton.dataset.targetUrl}function rt(e){const t=Number(e);return Number.isFinite(t)?`${Zl.format(t)}°`:"–"}function uo(e){if(!e)return"–";const t=new Date(e);return Number.isNaN(t.getTime())?"–":Ql.format(t)}function j(e,t="info",a=4500){if(S?.message){if(Sa&&(window.clearTimeout(Sa),Sa=null),!e){S.message.classList.add("d-none"),S.message.textContent="";return}S.message.className=`alert alert-${t}`,S.message.textContent=e,S.message.classList.remove("d-none"),a>0&&(Sa=window.setTimeout(()=>{S?.message?.classList.add("d-none")},a))}}function nc(e){const t=S?.refreshIndicator;if(t){if(t.classList.remove("alert-warning","alert-info"),e==="idle"){t.classList.add("d-none");return}t.classList.remove("d-none"),e==="stale"?(t.classList.add("alert-warning"),t.textContent="GPS-Daten wurden geändert. Ansicht aktualisiert sich beim Öffnen."):(t.classList.add("alert-info"),t.textContent="GPS-Daten werden aktualisiert...")}}function po(e){S&&(lo=e,S.tabButtons.forEach(t=>{const a=t.dataset.tab===e;t.classList.toggle("active",a)}),S.panels.forEach(t=>{const a=t.getAttribute("data-panel")===e;t.classList.toggle("d-none",!a)}))}function be(e){return e?.hasDatabase?e.storageDriver!=="sqlite"?"wrong-driver":"ok":"no-db"}function rc(e){if(S?.availability){if(e==="ok"){S.availability.classList.add("d-none"),S.availability.textContent="";return}S.availability.classList.remove("d-none"),S.availability.textContent=e==="no-db"?"Bitte verbinden Sie zuerst eine Datenbank, um GPS-Punkte zu verwalten.":"GPS-Funktionen benötigen eine aktive SQLite-Datenbank. Bitte den SQLite-Treiber in den Einstellungen auswählen."}}function Pt(e,t){if(!S)return;const a=t!=="ok"||e.pending||ea.isLocked();if(S.disableTargets.forEach(n=>{(n instanceof HTMLButtonElement||n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n instanceof HTMLSelectElement)&&(n.disabled=a)}),S.statusBadge){let n="badge bg-success",r="Bereit";t==="no-db"?(n="badge bg-secondary",r="Keine Datenbank"):t==="wrong-driver"?(n="badge bg-warning text-dark",r="Nur mit SQLite"):(e.pending||ea.isLocked())&&(n="badge bg-info text-dark",r="Wird verarbeitet"),S.statusBadge.className=n,S.statusBadge.textContent=r}}function fo(e){const t=e.length;if(!t)return ie=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/Ia),1);ie>=a&&(ie=a-1),ie<0&&(ie=0);const n=ie*Ia,r=Math.min(n+Ia,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function ic(){if(!S?.root)return null;const e=S.root.querySelector('[data-role="gps-pager"]');return e?((!xt||Rn!==e)&&(xt?.destroy(),xt=la(e,{onPrev:()=>dc(),onNext:()=>uc(),labels:{prev:"Zurück",next:"Weiter",loading:"GPS-Punkte werden geladen...",empty:"Keine GPS-Punkte verfügbar"}}),Rn=e),xt):null}function mi(e,t){const a=ic();if(!a)return;if(t!=="ok"){ie=0;const o=t==="no-db"?"Keine Datenbank verbunden.":"Nur mit SQLite verfügbar.";a.update({status:"disabled",info:o});return}const n=ra(e).length;if(!n){ie=0;const o=e.gps.initialized?"Noch keine GPS-Punkte vorhanden.":"GPS-Punkte werden geladen...";a.update({status:"disabled",info:o});return}const{start:r,end:i}=fo(ra(e));a.update({status:"ready",info:`Einträge ${kn.format(r+1)}–${kn.format(i)} von ${kn.format(n)}`,canPrev:ie>0,canNext:i<n})}let At=[];async function mo(){if(be(I().app)!=="ok"){At=[];return}try{const e=await Yn();At=Array.isArray(e?.rows)?e.rows:[]}catch{At=[]}S&&on(I(),be(I().app))}function oc(e){return!Number.isFinite(e)||e<=0?"":`${(e/1e4).toLocaleString("de-DE",{minimumFractionDigits:2,maximumFractionDigits:2})} ha`}function sc(e){const t=(e||[]).filter(r=>Number.isFinite(r?.[0])&&Number.isFinite(r?.[1]));if(!t.length)return null;let a=0,n=0;return t.forEach(r=>{a+=r[0],n+=r[1]}),{lat:a/t.length,lng:n/t.length}}function lc(e){return e.length?e.map(t=>{const a=sc(t.latlngs),n=a?`<div>${rt(a.lat)}</div><div>${rt(a.lng)}</div>`:'<span class="text-muted">–</span>',r=oc(Number(t.areaQm)),i=[r?`🌱 ${r}`:"",t.kultur?y(String(t.kultur)):""].filter(Boolean).join(" · "),o=t.updatedAt?uo(t.updatedAt):"";return`
        <tr data-acker-id="${Dt(t.id)}">
          <td>
            <div class="fw-semibold">${y(t.name||"Fläche")}<span class="badge bg-secondary ms-2">Freiland-Fläche</span></div>
            ${i?`<div class="text-muted small">${i}</div>`:""}
          </td>
          <td class="font-monospace">${n}</td>
          <td>
            <div><span class="badge-psm badge-psm-neutral">Acker-Planer</span></div>
            <div class="text-muted small">${o}</div>
          </td>
          <td class="text-end">
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-success" data-action="open-acker">
                Im Acker-Planer
              </button>
            </div>
          </td>
        </tr>
      `}).join(`
`):""}function cc(e,t){return e.length?e.map(a=>{const n=a.id===t,r=a.kind==="gewaechshaus"?'<span class="badge bg-info ms-2">Gewächshaus</span>':a.kind==="freiland"?'<span class="badge bg-secondary ms-2">Freiland</span>':"",o=[a.nutzflaecheQm!=null&&Number.isFinite(Number(a.nutzflaecheQm))?`📐 ${Number(a.nutzflaecheQm).toLocaleString("de-DE")} m²`:"",a.description?y(a.description):""].filter(Boolean).join(" · "),s=o?`<div class="text-muted small">${o}</div>`:"",l=a.source?`<span class="badge-psm badge-psm-neutral">${y(a.source)}</span>`:'<span class="text-muted">–</span>',u=n?'<span class="badge bg-success ms-2">Aktiv</span>':"",c=sa(a),p=c?`<a class="btn btn-outline-info" href="${Dt(c)}" target="_blank" rel="noopener noreferrer">
              Karte
            </a>`:"";return`
        <tr data-point-id="${Dt(a.id)}">
          <td>
            <div class="fw-semibold">${y(a.name||"Ohne Namen")}${r}${u}</div>
            ${s}
          </td>
          <td class="font-monospace">
            <div>${rt(a.latitude)}</div>
            <div>${rt(a.longitude)}</div>
          </td>
          <td>
            <div>${l}</div>
            <div class="text-muted small">${uo(a.updatedAt)}</div>
          </td>
          <td class="text-end">
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-success" data-action="set-active" ${n?"disabled":""}>
                Aktivieren
              </button>
              ${p}
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
`):""}function on(e,t){if(!S)return;const a=e.gps,n=co(e),r=t==="ok";if(S.summaryLabel){const i=jt(a).length,o=At.length;S.summaryLabel.textContent=r?`${i} Punkt${i===1?"":"e"}${o?` · ${o} Fläche${o===1?"":"n"}`:""}`:"Funktion derzeit nicht verfügbar"}if(!r){S.listBody&&(S.listBody.innerHTML=""),S.emptyState&&(S.emptyState.textContent=t==="no-db"?"Keine Datenbank verbunden.":"Bitte SQLite als Speicher-Treiber aktivieren.",S.emptyState.classList.remove("d-none")),S.activeInfo&&(S.activeInfo.textContent=t==="no-db"?"Wartet auf Datenbank.":"Nur mit SQLite verfügbar."),mi(e,t);return}if(S.listBody){const i=fo(jt(a)),o=i.start+i.items.length>=i.total;S.listBody.innerHTML=cc(i.items,a.activePointId)+(o?lc(At):"")}if(S.emptyState){const i=jt(a).length>0||At.length>0;S.emptyState.classList.toggle("d-none",i),!i&&a.initialized?S.emptyState.innerHTML=`
        <p class="mb-2">Noch keine GPS-Punkte vorhanden.</p>
        <p class="small text-muted mb-3">
          Nutzen Sie "Neuer Punkt" oder öffnen Sie Google Maps, um Koordinaten zu ermitteln.
        </p>
        <a class="btn btn-outline-info btn-sm" data-role="gps-empty-map-link" href="${Dt(n.url)}" target="_blank" rel="noopener noreferrer">
          <i class="bi bi-box-arrow-up-right me-1"></i>
          Google Maps öffnen
        </a>
      `:a.initialized||(S.emptyState.textContent="GPS-Punkte werden geladen...")}if(S.activeInfo)if(a.activePointId){const i=jt(a).find(o=>o.id===a.activePointId);if(i){const o=`${i.name||"Ohne Namen"} (${rt(i.latitude)}, ${rt(i.longitude)})`,s=sa(i);s?S.activeInfo.innerHTML=`${y(o)} <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${Dt(s)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:S.activeInfo.textContent=o}else S.activeInfo.textContent="Aktiver Punkt nicht gefunden."}else S.activeInfo.innerHTML=`Kein aktiver Punkt ausgewählt. <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${Dt(n.url)}" target="_blank" rel="noopener noreferrer">Google Maps öffnen</a>`;mi(e,t)}function dc(){if(ie===0)return;ie=Math.max(ie-1,0);const e=I(),t=be(e.app);on(e,t)}function uc(){const e=I(),t=ra(e).length;if(!t)return;const a=Math.max(Math.ceil(t/Ia)-1,0);if(ie>=a)return;ie=Math.min(ie+1,a);const n=be(e.app);on(e,n)}function ce(e){`${new Date().toLocaleString("de-DE")}${e}`}function da(e){if(!e)return null;const t=I();return ra(t).find(a=>a.id===e)||null}async function pc(e){if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(e);return}const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}function fc(){if(!S?.formFields?.rawCoordinates)return;const e=S.formFields.rawCoordinates.value,t=ec(e);if(!t){j("Koordinaten konnten nicht erkannt werden. Bitte Format 47.68952, 9.12091 verwenden.","warning",6e3);return}const a=t.latitude.toFixed(6),n=t.longitude.toFixed(6);S.formFields.latitude&&(S.formFields.latitude.value=a),S.formFields.longitude&&(S.formFields.longitude.value=n),j("Koordinaten übernommen.","success"),Jt()}function mc(){if(!S?.verifyButton)return;const e=S.verifyButton.dataset.targetUrl;if(!e){j("Bitte zuerst gültige Koordinaten eintragen, bevor die Prüfung geöffnet wird.","warning",6e3);return}window.open(e,"_blank","noopener,noreferrer")}async function Wn(e={}){const{notify:t=!1}=e;if(!(!S||be(I().app)!=="ok"||I().gps.pending))try{await Mi(),await mo(),t&&j("GPS-Punkte aktualisiert.","success"),ce("GPS-Punkte synchronisiert.")}catch(n){const r=n instanceof Error?n.message:"GPS-Punkte konnten nicht geladen werden.";j(r,"danger",7e3),ce(`Fehler beim Laden: ${r}`)}}async function gc(e){if(!e)return;const t=da(e);if(!t){j("Ausgewählter GPS-Punkt wurde nicht gefunden.","warning");return}try{await zi(t.id),j(`"${t.name}" ist nun aktiv.`,"success"),ce(`Aktiver GPS-Punkt: ${t.name}`)}catch(a){const n=a instanceof Error?a.message:"GPS-Punkt konnte nicht aktiviert werden.";j(n,"danger",7e3),ce(`Fehler beim Aktivieren: ${n}`)}}async function bc(e){if(!e)return;const t=da(e);if(!t){j("GPS-Punkt existiert nicht mehr.","warning");return}if(window.confirm(`"${t.name}" wirklich löschen? Dieser Schritt kann nicht rückgängig gemacht werden.`))try{await ns(t.id),j(`"${t.name}" wurde gelöscht.`,"success"),ce(`GPS-Punkt gelöscht: ${t.name}`)}catch(n){const r=n instanceof Error?n.message:"GPS-Punkt konnte nicht gelöscht werden.";j(r,"danger",7e3),ce(`Löschen fehlgeschlagen: ${r}`)}}async function hc(e){if(!e)return;const t=da(e);if(!t){j("GPS-Punkt nicht gefunden.","warning");return}const a=`${t.latitude}, ${t.longitude}`;try{await pc(a),j("Koordinaten in die Zwischenablage kopiert.","success")}catch(n){console.error("clipboard error",n),j("Koordinaten konnten nicht kopiert werden.","danger",7e3)}}async function vc(e,t){const a=(e||"").trim();if(!a){yt(t,{status:"error",id:"",message:"Ungültige GPS-Anfrage ohne ID."});return}if(be(I().app)!=="ok"){j("GPS-Modul ist ohne aktive SQLite-Datenbank nicht verfügbar.","warning",6e3),yt(t,{status:"error",id:a,message:"GPS-Modul ist derzeit nicht verfügbar."});return}const r=da(a);if(!r){j("Verknüpfter GPS-Punkt wurde nicht gefunden.","warning",6e3),yt(t,{status:"error",id:a,message:"Verknüpfter GPS-Punkt wurde nicht gefunden."});return}yt(t,{status:"pending",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wird aktiviert...`});try{await zi(r.id),j(`"${r.name||"Ohne Namen"}" wurde aus der Historie aktiviert.`,"success"),ce(`Aus Historie aktiviert: ${r.name||r.id}`),yt(t,{status:"success",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wurde aktiviert.`})}catch(i){const o=i instanceof Error?i.message:"GPS-Punkt konnte nicht aktiviert werden.";j(o,"danger",7e3),ce(`Aktivierung aus Historie fehlgeschlagen: ${o}`),yt(t,{status:"error",id:r.id,name:r.name,message:o})}}async function yc(){try{await rs(),ce("Aktiver GPS-Punkt synchronisiert."),j("Aktiver GPS-Punkt wurde synchronisiert.","success")}catch(e){const t=e instanceof Error?e.message:"Aktiver GPS-Punkt konnte nicht ermittelt werden.";j(t,"danger",7e3),ce(`Sync fehlgeschlagen: ${t}`)}}function wc(){if(!S?.formFields)throw new Error("Formular nicht initialisiert");const e=S.formFields.name?.value.trim()||"",t=S.formFields.description?.value.trim()||"",a=S.formFields.source?.value.trim()||"",n=Number(S.formFields.latitude?.value),r=Number(S.formFields.longitude?.value),i=!!S.formFields.activate?.checked;if(!e)throw new Error("Name darf nicht leer sein.");if(!Number.isFinite(n)||!Number.isFinite(r))throw new Error("Koordinaten sind ungültig.");return{name:e,description:t,latitude:n,longitude:r,source:a,activate:i}}async function xc(e){if(e.preventDefault(),ea.isLocked()){j("Speichern läuft bereits ...","info");return}try{const t=wc();if(ac(t.latitude,t.longitude)){j("Ein GPS-Punkt mit identischen Koordinaten ist bereits vorhanden.","warning",6e3);return}Pt(I().gps,be(I().app)),await is({name:t.name,description:t.description||null,latitude:t.latitude,longitude:t.longitude,source:t.source||null},{activate:t.activate}),N.success(`GPS-Punkt "${t.name}" gespeichert.`),ce(`GPS-Punkt gespeichert${t.activate?" und aktiv gesetzt":""}: ${t.name}`),S?.form?.reset()}catch(t){const a=t instanceof Error?t.message:"GPS-Punkt konnte nicht gespeichert werden.";N.error(a),ce(`Speichern fehlgeschlagen: ${a}`)}finally{Pt(I().gps,be(I().app))}}function kc(){if(S?.formFields){if(!navigator.geolocation){N.warning("Geolocation wird von diesem Browser nicht unterstützt.");return}if(ea.isLocked()){N.info("Bitte warten...");return}ea.acquire(async()=>(Pt(I().gps,be(I().app)),new Promise(e=>{navigator.geolocation.getCurrentPosition(t=>{const{latitude:a,longitude:n}=t.coords;S?.formFields.latitude&&(S.formFields.latitude.value=a.toFixed(6)),S?.formFields.longitude&&(S.formFields.longitude.value=n.toFixed(6)),S?.formFields.source&&!S.formFields.source.value.trim()&&(S.formFields.source.value="Browser"),N.success("Koordinaten aus Browser-Position übernommen."),ce("Browser-Geolocation übernommen"),Jt(),Pt(I().gps,be(I().app)),e()},t=>{const a=t.code===t.PERMISSION_DENIED?"Zugriff auf Standort wurde verweigert.":"Geolocation konnte nicht ermittelt werden.";N.warning(a),ce(`Geolocation fehlgeschlagen: ${a}`),Pt(I().gps,be(I().app)),e()},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})})))}}function Sc(){S&&(S.root.addEventListener("click",e=>{const t=e.target;if(!t)return;const a=t.closest('[data-role="gps-tab"]');if(a&&a.dataset.tab){po(a.dataset.tab);return}const n=t.closest("[data-action]");if(!n||n.dataset.action==="")return;const i=n.closest("[data-point-id]")?.getAttribute("data-point-id")||"";switch(n.dataset.action){case"reload-points":Wn({notify:!0});break;case"open-acker":document.querySelector('.nav-btn[data-area="acker"]')?.click();break;case"sync-active":yc();break;case"set-active":gc(i);break;case"delete-point":bc(i);break;case"copy-coords":hc(i);break;case"use-geolocation":kc();break;case"apply-raw-coords":fc();break;case"verify-coords":mc();break}}),S.form?.addEventListener("submit",e=>{xc(e)}),S.form?.addEventListener("reset",()=>{window.setTimeout(()=>{Jt()},0)}),S.formFields.latitude?.addEventListener("input",()=>{Jt()}),S.formFields.longitude?.addEventListener("input",()=>{Jt()}))}function Ec(e,t){if(!e||ui)return;ui=!0;const a=e;a.innerHTML="";const n=Jl();a.appendChild(n),S=Yl(n),fi?.(),fi=Vi({section:"gps",event:"gps:data-changed",shouldHandleEvent:()=>be(t.state.getState().app)==="ok",shouldRefresh:()=>be(t.state.getState().app)==="ok",onRefresh:()=>Wn({notify:!1}),onStatusChange:o=>nc(o)}),ie=0,xt?.destroy(),xt=null,Rn=null,Sc(),po(lo),typeof t.events?.subscribe=="function"&&t.events.subscribe("gps:set-active-from-history",o=>{let s="";if(o&&typeof o=="object"&&(s=String(o.id||"").trim()),!s){j("Historische GPS-Anfrage ohne gültige ID erhalten.","warning",6e3);return}vc(s,t)});const r=t.state.getState();Ot=r.gps.activePointId;const i=(o,s)=>{const l=be(o.app),u=o.gps;if(o.app.activeSection==="gps"&&s.app.activeSection!=="gps"&&mo(),rc(l),on(o,l),Pt(u,l),Xl(o),l==="ok"&&!u.initialized&&!u.pending&&Wn({notify:!1}),l==="ok"&&pi!=="ok"&&u.initialized&&j("GPS-Bereich ist wieder verfügbar.","success"),pi=l,o.gps.activePointId!==Ot&&(Ot=o.gps.activePointId,typeof t.events?.emit=="function")){const c=da(Ot);t.events.emit("gps:active-point-changed",{id:Ot,point:c})}o.gps.lastError&&o.gps.lastError!==s.gps.lastError&&(j(o.gps.lastError,"danger",7e3),ce(`Fehler: ${o.gps.lastError}`))};t.state.subscribe(i),i(r,r)}let me=[],ge=[],On=!1,Fa=null;async function qe(){try{const[e,t]=await Promise.all([ds({limit:100}),us({limit:100})]);me=e.items||[],ge=t.items||[],qa("savedCodes:changed",{eppoCount:me.length,bbchCount:ge.length})}catch(e){console.error("Failed to load saved codes:",e),me=[],ge=[]}}function Lc(){const e=me.length>0,t=ge.length>0;return`
    <div class="row g-4">
      <!-- EPPO Codes Section -->
      <div class="col-lg-6">
        <div class="card card-dark codes-card h-100">
          <div class="card-header codes-card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="bi bi-flower1 me-2 text-success"></i>
              Kulturen (EPPO-Codes)
            </h5>
            <span class="badge badge-psm-neutral">${me.length} gespeichert</span>
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
                  <span class="badge bg-success ms-2">${me.length}</span>
                </h6>
                <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${Kn()}
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
            <span class="badge badge-psm-neutral">${ge.length} gespeichert</span>
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
                  <span class="badge bg-info ms-2">${ge.length}</span>
                </h6>
                <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${jn()}
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
  `}function Kn(){return me.length?me.map(e=>`
    <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-eppo-id="${y(e.id)}">
      <div class="flex-grow-1">
        ${e.isFavorite?'<i class="bi bi-star-fill text-warning me-2"></i>':""}
        <strong class="text-success">${y(e.code)}</strong>
        <span class="ms-2">${y(e.name)}</span>
        ${e.usageCount>0?`<span class="badge bg-secondary ms-2">${e.usageCount}x</span>`:""}
      </div>
      <div class="btn-group btn-group-sm">
        <button type="button" class="btn btn-outline-warning" data-action="toggle-favorite-eppo" data-id="${y(e.id)}" title="Favorit umschalten">
          <i class="bi bi-star${e.isFavorite?"-fill":""}"></i>
        </button>
        <button type="button" class="btn btn-outline-danger" data-action="delete-eppo" data-id="${y(e.id)}" title="Löschen">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  `).join(""):`
      <div class="list-group-item list-group-item-action text-muted text-center py-4">
        <i class="bi bi-inbox fs-2 d-block mb-2"></i>
        Noch keine EPPO-Codes gespeichert
      </div>
    `}function jn(){return ge.length?ge.map(e=>`
    <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" data-bbch-id="${y(e.id)}">
      <div class="flex-grow-1">
        ${e.isFavorite?'<i class="bi bi-star-fill text-warning me-2"></i>':""}
        <strong class="text-info">${y(e.code)}</strong>
        <span class="ms-2">${y(e.label)}</span>
        ${e.usageCount>0?`<span class="badge bg-secondary ms-2">${e.usageCount}x</span>`:""}
      </div>
      <div class="btn-group btn-group-sm">
        <button type="button" class="btn btn-outline-warning" data-action="toggle-favorite-bbch" data-id="${y(e.id)}" title="Favorit umschalten">
          <i class="bi bi-star${e.isFavorite?"-fill":""}"></i>
        </button>
        <button type="button" class="btn btn-outline-danger" data-action="delete-bbch" data-id="${y(e.id)}" title="Löschen">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  `).join(""):`
      <div class="list-group-item list-group-item-action text-muted text-center py-4">
        <i class="bi bi-inbox fs-2 d-block mb-2"></i>
        Noch keine BBCH-Stadien gespeichert
      </div>
    `}function He(e){const t=e.querySelector('[data-role="saved-eppo-list"]'),a=me.length>0;if(t){const s=t.closest(".border-top");s&&a&&(s.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Kulturen
            <span class="badge bg-success ms-2">${me.length}</span>
          </h6>
          <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Kn()}
          </div>
        `)}else if(a){const s=e.querySelector(".codes-card:first-child .border-top.pt-3.mb-3");s&&(s.innerHTML=`
        <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
          <i class="bi bi-bookmark-star me-1"></i>
          Meine Kulturen
          <span class="badge bg-success ms-2">${me.length}</span>
        </h6>
        <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
          ${Kn()}
        </div>
      `)}const n=e.querySelector('[data-role="saved-bbch-list"]'),r=ge.length>0;if(n){const s=n.closest(".border-top");s&&r&&(s.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${ge.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${jn()}
          </div>
        `)}else if(r){const l=e.querySelectorAll(".codes-card")[1];if(l){const u=l.querySelector(".border-top.pt-3.mb-3");u&&(u.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${ge.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${jn()}
          </div>
        `)}}const i=e.querySelector(".codes-card:first-child .card-header .badge"),o=e.querySelector(".codes-card:last-child .card-header .badge");i&&(i.textContent=`${me.length} gespeichert`),o&&(o.textContent=`${ge.length} gespeichert`)}function Dc(e){const t=e.querySelector('[data-input="eppo-search"]'),a=e.querySelector('[data-role="eppo-search-results"]');if(t&&a){const s=Ir(async()=>{const l=t.value.trim();if(l.length<2){a.innerHTML="";return}try{const u=await ls(l,10);if(!u.length){a.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${y(l)}"</div>
          `;return}a.innerHTML=u.map(c=>`
          <button type="button" class="list-group-item list-group-item-action" 
                  data-action="select-eppo" 
                  data-code="${y(c.code)}" 
                  data-name="${y(c.name)}"
                  data-language="${y(c.language||"")}"
                  data-dtcode="${y(c.dtcode||"")}">
            <strong class="text-success">${y(c.code)}</strong>
            <span class="ms-2">${y(c.name)}</span>
            ${c.dtcode?`<small class="text-muted ms-2">(${y(c.dtcode)})</small>`:""}
          </button>
        `).join("")}catch(u){console.error("EPPO search failed:",u),a.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);t.addEventListener("input",s)}const n=e.querySelector('[data-input="bbch-search"]'),r=e.querySelector('[data-role="bbch-search-results"]');if(n&&r){const s=Ir(async()=>{const l=n.value.trim();if(l.length<1){r.innerHTML="";return}try{const u=await cs(l,10);if(!u.length){r.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${y(l)}"</div>
          `;return}r.innerHTML=u.map(c=>`
          <button type="button" class="list-group-item list-group-item-action d-flex align-items-start gap-2 py-2" 
                  data-action="select-bbch" 
                  data-code="${y(c.code)}" 
                  data-label="${y(c.label)}"
                  data-principal="${c.principalStage??""}"
                  data-secondary="${c.secondaryStage??""}">
            <strong class="text-info flex-shrink-0" style="min-width: 35px;">${y(c.code)}</strong>
            <span class="text-break" style="line-height: 1.4;">${y(c.label)}</span>
          </button>
        `).join("")}catch(u){console.error("BBCH search failed:",u),r.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);n.addEventListener("input",s)}e.dataset.codesClickBound!=="1"&&(e.dataset.codesClickBound="1",e.addEventListener("click",async s=>{const u=s.target.closest("[data-action]");if(!u)return;const c=u.dataset.action;if(c==="select-eppo"){const p=u.dataset.code||"",m=u.dataset.name||"",f=u.dataset.language||"",w=u.dataset.dtcode||"";if(!p||!m){console.warn("EPPO selection missing code or name");return}a&&(a.innerHTML=""),t&&(t.value="");const b=me.find(h=>h.code.toUpperCase()===p.toUpperCase());if(b){const h=e.querySelector(`[data-eppo-id="${b.id}"]`);h&&(h.classList.add("flash-highlight"),setTimeout(()=>h.classList.remove("flash-highlight"),800));return}try{await bn({code:p,name:m,language:f||void 0,dtcode:w||void 0,isFavorite:!1});const h=we();await xe(h),await qe(),He(e)}catch(h){console.error("Failed to save EPPO from search:",h),alert("Speichern fehlgeschlagen")}}if(c==="select-bbch"){const p=u.dataset.code||"",m=u.dataset.label||"",f=u.dataset.principal,w=u.dataset.secondary,b=f?parseInt(f,10):void 0,h=w?parseInt(w,10):void 0;if(!p||!m){console.warn("BBCH selection missing code or label");return}r&&(r.innerHTML=""),n&&(n.value="");const P=ge.find(A=>A.code===p);if(P){const A=e.querySelector(`[data-bbch-id="${P.id}"]`);A&&(A.classList.add("flash-highlight"),setTimeout(()=>A.classList.remove("flash-highlight"),800));return}try{await hn({code:p,label:m,principalStage:Number.isNaN(b)?void 0:b,secondaryStage:Number.isNaN(h)?void 0:h,isFavorite:!1});const A=we();await xe(A),await qe(),He(e)}catch(A){console.error("Failed to save BBCH from search:",A),alert("Speichern fehlgeschlagen")}}if(c==="toggle-favorite-eppo"){const p=u.dataset.id;if(!p)return;const m=me.find(f=>f.id===p);if(!m)return;try{await bn({id:m.id,code:m.code,name:m.name,language:m.language,dtcode:m.dtcode,isFavorite:!m.isFavorite});const f=we();await xe(f),await qe(),He(e)}catch(f){console.error("Failed to toggle EPPO favorite:",f)}}if(c==="toggle-favorite-bbch"){const p=u.dataset.id;if(!p)return;const m=ge.find(f=>f.id===p);if(!m)return;try{await hn({id:m.id,code:m.code,label:m.label,principalStage:m.principalStage,secondaryStage:m.secondaryStage,isFavorite:!m.isFavorite});const f=we();await xe(f),await qe(),He(e)}catch(f){console.error("Failed to toggle BBCH favorite:",f)}}if(c==="delete-eppo"){const p=u.dataset.id;if(!p||!confirm("EPPO-Code wirklich löschen?"))return;try{await os({id:p});const m=we();await xe(m),await qe(),He(e)}catch(m){console.error("Failed to delete EPPO:",m)}}if(c==="delete-bbch"){const p=u.dataset.id;if(!p||!confirm("BBCH-Stadium wirklich löschen?"))return;try{await ss({id:p});const m=we();await xe(m),await qe(),He(e)}catch(m){console.error("Failed to delete BBCH:",m)}}}));const i=e.querySelector('[data-form="add-eppo"]');i&&i.addEventListener("submit",async s=>{s.preventDefault();const l=e.querySelector('[data-input="eppo-code"]'),u=e.querySelector('[data-input="eppo-name"]'),c=e.querySelector('[data-input="eppo-favorite"]'),p=l?.value.trim(),m=u?.value.trim();if(!p||!m){alert("Bitte Code und Name eingeben");return}try{await bn({code:p,name:m,isFavorite:c?.checked||!1});const f=we();await xe(f),await qe(),He(e),l&&(l.value=""),u&&(u.value=""),c&&(c.checked=!1)}catch(f){console.error("Failed to save EPPO:",f),alert("Speichern fehlgeschlagen")}});const o=e.querySelector('[data-form="add-bbch"]');o&&o.addEventListener("submit",async s=>{s.preventDefault();const l=e.querySelector('[data-input="bbch-code"]'),u=e.querySelector('[data-input="bbch-label"]'),c=e.querySelector('[data-input="bbch-favorite"]'),p=l?.value.trim(),m=u?.value.trim();if(!p||!m){alert("Bitte Code und Bezeichnung eingeben");return}try{await hn({code:p,label:m,isFavorite:c?.checked||!1});const f=we();await xe(f),await qe(),He(e),l&&(l.value=""),u&&(u.value=""),c&&(c.checked=!1)}catch(f){console.error("Failed to save BBCH:",f),alert("Speichern fehlgeschlagen")}})}function Pc(e,t,a={}){if(!e||On)return;Fa=e,On=!0,Fa.innerHTML=`
    <div class="section-inner codes-manager">
      <h4 class="mb-3"><i class="bi bi-tags me-2"></i>EPPO & BBCH Codes</h4>
      ${Lc()}
    </div>`;const n=Fa.querySelector(".codes-manager");if(!n)return;Dc(n);const r=async()=>{await qe(),He(n)};t?.events?.subscribe?.("database:connected",()=>{r()}),t?.state?.getState?.().app?.hasDatabase&&r()}function Ac(){On=!1,Fa=null}let gi=!1,Re=null,Ut=null,Ba=null,Vt=null,st=null,Ka=null,We=null,ia=null,ja=null,Oe=null,Gn=null,_e=null,oe=new Set,Je=null,Sn=!1,En=!1,$t=!1;const Se=e=>he(e.mediums),za=25,Ln=new Intl.NumberFormat("de-DE");let le=0,kt=null,Un=null,Vn=null,fr=null;function $c(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function Cc(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`profile-${Date.now()}-${Math.random().toString(16).slice(2,10)}`}function go(e){if(!oe.size)return;const t=new Set(Se(e).map(n=>n.id));let a=!1;oe.forEach(n=>{t.has(n)||(oe.delete(n),a=!0)}),a&&(oe=new Set(oe))}function Ga(){Re&&Re.querySelectorAll('[data-role="profile-select"]').forEach(e=>{const t=e.dataset.mediumId;e.checked=!!(t&&oe.has(t))})}function Ye(e){const t=Se(e).length,a=oe.size;let n="Noch keine Mittel ausgewählt.";t?a===t&&t>0?n=`${a} Mittel ausgewählt (alle).`:a>0&&(n=`${a} Mittel ausgewählt.`):n="Keine Mittel vorhanden.",Gn&&(Gn.textContent=n),_e&&(_e.disabled=t===0,_e.indeterminate=a>0&&a<t,_e.checked=t>0&&a===t)}function Ta(e){Je=null,Ka&&Ka.reset(),ia&&(ia.value=""),We&&(We.value=""),Oe&&(Oe.textContent="Profil speichern"),oe=new Set,Ga(),Ye(e)}function Mc(e,t){Je=e.id,ia&&(ia.value=e.id),We&&(We.value=e.name,We.focus()),Oe&&(Oe.textContent="Profil aktualisieren"),oe=new Set(e.mediumIds),Ga(),Ye(t)}function bi(e,t){if(Oe){if(Oe.disabled=e,e){Oe.textContent=t||"Speichert...";return}Oe.textContent=Je?"Profil aktualisieren":"Profil speichern"}}function Ua(e,t){if(Ut){if(Ut.disabled=e,e){Ut.textContent=t||"Speichert...";return}Ut.textContent="Hinzufügen"}}async function Ic(e,t,a){if($t)return;const n=t.state.getState(),i=(Se(n)[e]??null)?.id||null;$t=!0,Ua(!0);const o=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediums",l=>{const u=oa(l),c=u.items.slice();return c.splice(e,1),{...u,items:c,totalCount:Math.min(u.totalCount,c.length),lastUpdatedAt:new Date().toISOString()}}),await Va({silent:!0})&&i&&t.events?.emit?.("mediums:data-changed",{action:"deleted",id:i})}finally{$t=!1,Ua(!1),a&&a.isConnected&&(a.disabled=!1,a.textContent=o??"Löschen")}}async function Fc(e,t,a){const n=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediumProfiles",(r=[])=>r.filter(i=>i.id!==e.id)),Je===e.id&&Ta(t.state.getState()),await Va({successMessage:"Profil gelöscht."})}finally{a&&(a.disabled=!1,a.textContent=n||"Löschen")}}function Bc(e){if(!ja)return;const t=ja,a=e.mediumProfiles||[];if(!a.length){t.innerHTML=`
      <tr>
        <td colspan="3" class="text-center text-muted">Noch keine Profile erstellt.</td>
      </tr>
    `;return}const n=new Map(Se(e).map(r=>[r.id,r]));t.innerHTML="",a.forEach(r=>{const i=document.createElement("tr"),o=r.mediumIds.map(l=>n.get(l)).filter(Boolean).map(l=>y(l.name)),s=o.length?o.join(", "):'<span class="text-muted">Keine gültigen Mittel</span>';i.innerHTML=`
      <td>${y(r.name)}</td>
      <td>${s}</td>
      <td>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-sm btn-outline-info" data-action="profile-edit" data-id="${y(r.id)}">Bearbeiten</button>
          <button class="btn btn-sm btn-outline-danger" data-action="profile-delete" data-id="${y(r.id)}">Löschen</button>
        </div>
      </td>
    `,t.appendChild(i)})}function zc(e,t){if(Sn||!e.mediumProfiles?.length)return;const a=new Set(Se(e).map(i=>i.id));let n=!1;const r=e.mediumProfiles.map(i=>{const o=i.mediumIds.filter(s=>a.has(s));return o.length!==i.mediumIds.length?(n=!0,{...i,mediumIds:o,updatedAt:new Date().toISOString()}):i}).filter(i=>i.mediumIds.length?!0:(n=!0,!1));n&&(Sn=!0,t.state.updateSlice("mediumProfiles",()=>r),Sn=!1)}function bo(e){if(!e)return le=0,{start:0,end:0,total:0};const t=Math.max(Math.ceil(e/za),1);le>=t&&(le=t-1),le<0&&(le=0);const a=le*za,n=Math.min(a+za,e);return{start:a,end:n,total:e}}function Tc(){if(!Vn)return null;const e=Vn.querySelector('[data-role="mediums-pager"]');return e?((!kt||Un!==e)&&(kt?.destroy(),kt=la(e,{onPrev:()=>Nc(),onNext:()=>qc(),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Mittel...",empty:"Keine Mittel verfügbar"}}),Un=e),kt):null}function hi(e){const t=Tc();if(!t)return;const a=Se(e).length;if(!a){le=0,t.update({status:"disabled",info:"Noch keine Mittel gespeichert."});return}const{start:n,end:r}=bo(a),i=`Mittel ${Ln.format(n+1)}–${Ln.format(r)} von ${Ln.format(a)}`;t.update({status:"ready",info:i,canPrev:le>0,canNext:r<a})}function Nc(){if(le===0)return;const e=fr?.state.getState();e&&(le=Math.max(le-1,0),mr(e))}function qc(){const e=fr?.state.getState();if(!e)return;const t=Se(e).length;if(!t)return;const a=Math.max(Math.ceil(t/za)-1,0);le>=a||(le=Math.min(le+1,a),mr(e))}function mr(e){if(!Re)return;go(e);const t=new Map(e.measurementMethods.map(o=>[o.id,o])),a=Se(e).length;if(!a){Re.innerHTML=`
      <tr>
        <td colspan="9" class="text-center text-muted">Noch keine Mittel gespeichert.</td>
      </tr>
    `,Ye(e),hi(e);return}const{start:n,end:r}=bo(a),i=Se(e).slice(n,r);Re.innerHTML="",i.forEach((o,s)=>{const l=n+s,u=document.createElement("tr"),c=t.get(o.methodId),p=o.approval||o.zulassungsnummer,m=typeof p=="string"&&p.trim().length?y(p):"-",f=typeof o.wartezeit=="string"&&o.wartezeit.trim().length?y(o.wartezeit):typeof o.wartezeit=="number"?`${o.wartezeit} Tage`:"-",w=typeof o.wirkstoff=="string"&&o.wirkstoff.trim().length?y(o.wirkstoff):"-";u.innerHTML=`
      <td class="text-center">
        <input type="checkbox" class="form-check-input" data-role="profile-select" data-medium-id="${y(o.id)}" ${oe.has(o.id)?"checked":""} />
      </td>
      <td>${y(o.name)}</td>
      <td>${y(o.unit)}</td>
      <td>${y(c?c.label:o.method||o.methodId||"-")}</td>
      <td>${y(o.value!=null?String(o.value):"")}</td>
      <td>${m}</td>
      <td>${f}</td>
      <td>${w}</td>
      <td>
        <button class="btn btn-sm btn-danger" data-action="delete" data-index="${l}">Löschen</button>
      </td>
    `,Re?.appendChild(u)}),Ye(e),hi(e)}function vi(e){if(!Vt)return;const t=new Set;Vt.innerHTML="",e.measurementMethods.forEach(a=>{const n=(a.label??"").toLowerCase(),r=(a.id??"").toLowerCase();if(n&&!t.has(n)){t.add(n);const i=document.createElement("option");i.value=a.label,Vt.appendChild(i)}if(r&&!t.has(r)){t.add(r);const i=document.createElement("option");i.value=a.id,Vt.appendChild(i)}})}function Hc(e){const t=e.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t||`method-${Date.now()}-${Math.random().toString(16).slice(2,6)}`}function _c(e,t){if(!Ba)return null;const a=Ba.value.trim();if(!a)return window.alert("Bitte eine Methode angeben."),Ba.focus(),null;const n=e.measurementMethods.find(s=>s.label?.toLowerCase()===a.toLowerCase()||s.id?.toLowerCase()===a.toLowerCase());if(n)return n.id;const r=Hc(a),i=e.fieldLabels?.calculation?.fields?.quantity?.unit||"Kiste",o={id:r,label:a,type:"factor",unit:i,requires:["areaHa"],config:{sourceField:"areaHa"}};return t.state.updateSlice("measurementMethods",s=>[...s,o]),r}async function Va(e){try{const t=we();return await xe(t),e?.silent||window.alert(e?.successMessage??"Änderungen wurden gespeichert."),!0}catch(t){console.error("Fehler beim Speichern",t);const a=t instanceof Error?t.message:"Speichern fehlgeschlagen";return window.alert(a),!1}}function Rc(e,t){const a=!!t.app?.hasDatabase,n=t.app?.activeSection==="settings";e.classList.toggle("d-none",!(a&&n))}function Wc(e,t){if(!e||gi)return;const a=e;a.innerHTML="";const n=$c();a.appendChild(n),Vn=n,fr=t,le=0,kt?.destroy(),kt=null,Un=null,Re=n.querySelector("#settings-mediums-table tbody"),Ba=n.querySelector('input[name="medium-method"]'),Vt=n.querySelector("#settings-method-options"),st=n.querySelector("#settings-medium-form"),Ut=st?st.querySelector('button[type="submit"]'):null,Ka=n.querySelector("#settings-profile-form"),We=n.querySelector("#profile-name"),ia=n.querySelector('input[name="profile-id"]'),ja=n.querySelector("#settings-profile-table tbody"),Oe=n.querySelector('[data-role="profile-submit"]'),Gn=n.querySelector('[data-role="profile-selection-summary"]'),_e=n.querySelector('[data-role="profile-select-all"]');let r=!1,i=!1;function o(c){if(n.querySelectorAll("[data-settings-tab]").forEach(p=>{const m=p.dataset.settingsTab===c;p.classList.toggle("active",m)}),n.querySelectorAll("[data-pane]").forEach(p=>{const m=p.dataset.pane===c;p.style.display=m?"block":"none"}),c==="gps"&&!r){const p=n.querySelector('[data-feature="gps-embedded"]');p&&(Ec(p,t),r=!0)}if(c==="codes"&&!i){const p=n.querySelector('[data-feature="codes-embedded"]');p&&(Ac(),Pc(p,{state:t.state,events:{subscribe:t.events?.subscribe}},{}),i=!0)}}n.querySelectorAll("[data-settings-tab]").forEach(c=>{c.addEventListener("click",()=>{const p=c.dataset.settingsTab;p&&o(p)})});async function s(){if(!st||$t)return;const c=t.state.getState(),p=new FormData(st),m=(p.get("medium-name")||"").toString().trim(),f=(p.get("medium-unit")||"").toString().trim(),w=p.get("medium-value"),b=Number(w),h=(p.get("medium-approval")||"").toString().trim(),P=p.get("medium-wartezeit"),A=P?Number(P):null,T=(p.get("medium-wirkstoff")||"").toString().trim()||null;if(!m||!f||Number.isNaN(b)){window.alert("Bitte alle Felder korrekt ausfüllen.");return}const B=_c(c,t);if(!B)return;const J=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`medium-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,Y={id:J,name:m,unit:f,methodId:B,value:b,zulassungsnummer:h||null,wartezeit:A!=null&&!Number.isNaN(A)?A:null,wirkstoff:T};$t=!0,Ua(!0,"Speichere...");try{t.state.updateSlice("mediums",$=>{const v=oa($),x=[...v.items,Y];return{...v,items:x,totalCount:x.length,lastUpdatedAt:new Date().toISOString()}}),vi(t.state.getState()),await Va({successMessage:"Mittel gespeichert.",silent:!0})&&(st.reset(),t.events?.emit?.("mediums:data-changed",{action:"created",id:J}))}finally{$t=!1,Ua(!1)}}st?.addEventListener("submit",c=>{c.preventDefault(),s()}),Re?.addEventListener("click",c=>{const p=c.target?.closest('[data-action="delete"]');if(!p)return;const m=Number(p.dataset.index);Number.isNaN(m)||Ic(m,t,p)}),Re?.addEventListener("change",c=>{const p=c.target;if(!p||p.dataset.role!=="profile-select")return;const m=p.dataset.mediumId;if(!m)return;p.checked?oe.add(m):oe.delete(m);const f=t.state.getState();Ye(f)}),_e?.addEventListener("change",()=>{const c=t.state.getState();_e&&(_e.indeterminate=!1,_e.checked?oe=new Set(Se(c).map(p=>p.id)):oe=new Set,Ga(),Ye(c))});const l=async()=>{if(!We)return;const c=We.value.trim();if(!c){window.alert("Bitte einen Profilnamen eingeben."),We.focus();return}if(!oe.size){window.alert("Bitte mindestens ein Mittel auswählen.");return}const p=t.state.getState();if(p.mediumProfiles?.some(h=>h.name.toLowerCase()===c.toLowerCase()&&h.id!==Je)){window.alert("Ein Profil mit diesem Namen existiert bereits.");return}const f=Se(p).filter(h=>oe.has(h.id)).map(h=>h.id);if(!f.length){window.alert("Ausgewählte Mittel sind nicht mehr verfügbar. Bitte Auswahl prüfen."),go(p),Ga(),Ye(p);return}if(En)return;const w=!!Je;En=!0,bi(!0,w?"Aktualisiere...":"Speichere...");const b=new Date().toISOString();try{if(Je)t.state.updateSlice("mediumProfiles",(P=[])=>P.map(A=>A.id===Je?{...A,name:c,mediumIds:f,updatedAt:b}:A));else{const P={id:Cc(),name:c,mediumIds:f,createdAt:b,updatedAt:b};t.state.updateSlice("mediumProfiles",(A=[])=>[...A,P])}await Va({successMessage:w?"Profil aktualisiert und gespeichert.":"Profil gespeichert."})&&Ta(t.state.getState())}finally{En=!1,bi(!1)}};Ka?.addEventListener("submit",c=>{c.preventDefault(),l()}),ja?.addEventListener("click",c=>{const p=c.target?.closest('[data-action^="profile-"]');if(!p)return;const m=p.dataset.id;if(!m)return;const f=t.state.getState();if(p.dataset.action==="profile-edit"){const w=f.mediumProfiles?.find(b=>b.id===m);w&&Mc(w,f);return}if(p.dataset.action==="profile-delete"){const w=f.mediumProfiles?.find(b=>b.id===m);if(!w||!window.confirm(`Profil "${w.name}" wirklich löschen?`))return;Fc(w,t,p)}}),n.querySelector('[data-action="profile-reset"]')?.addEventListener("click",()=>{Ta(t.state.getState())}),Ta(t.state.getState());const u=c=>{zc(c,t),Rc(n,c),c.app.activeSection==="settings"&&(mr(c),vi(c),Bc(c),Ye(c))};t.state.subscribe(u),u(t.state.getState()),gi=!0}const La=e=>y(e),Dn=(e,t=1)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function Ct(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function Zn(e){if(!e)return null;const t=new Date(e);return Number.isNaN(t.getTime())?null:Math.round((t.getTime()-Date.now())/864e5)}function Oc(e){const t=Zn(e);return t===null?e?y(e):"":t<0?`<span class="lager-pill bad">${Ct(e)} · abgelaufen</span>`:t<180?`<span class="lager-pill low">${Ct(e)} · ${t} T</span>`:`<span class="lager-muted">${Ct(e)}</span>`}function Kc(e){return Number.isFinite(e)?e<0?'<span class="lager-badge bad">Negativ</span>':e===0?'<span class="lager-badge low">Leer</span>':'<span class="lager-badge ok">Vorrätig</span>':'<span class="lager-badge neutral">–</span>'}function Da(e,t,a,n=""){return`
    <div class="lager-kpi${n?` is-${n}`:""}">
      <i class="bi ${e} lager-kpi-icon"></i>
      <div class="lager-kpi-value">${y(String(a))}</div>
      <div class="lager-kpi-label">${y(t)}</div>
    </div>`}const jc=`
  <style>
    .lager-wrap{display:flex;flex-direction:column;gap:18px}
    .lager-head h2{margin:0;font-weight:650;display:flex;align-items:center;gap:8px}
    .lager-head h2 i{color:var(--color-primary,#22c55e)}
    .lager-head p{margin:4px 0 0;color:var(--color-text-muted,#94a3b8);font-size:.9rem;max-width:78ch}
    .lager-kpis{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px}
    .lager-kpi{background:var(--color-surface-1,rgba(255,255,255,.04));border:1px solid var(--border-1,rgba(255,255,255,.1));border-radius:12px;padding:14px 16px;display:flex;flex-direction:column;gap:2px}
    .lager-kpi-icon{font-size:1.2rem;color:var(--color-primary,#22c55e)}
    .lager-kpi-value{font-size:1.6rem;font-weight:700;font-variant-numeric:tabular-nums;line-height:1.1}
    .lager-kpi-label{font-size:.82rem;color:var(--color-text-muted,#94a3b8)}
    .lager-kpi.is-warn .lager-kpi-icon,.lager-kpi.is-warn .lager-kpi-value{color:#f59e0b}
    .lager-kpi.is-bad .lager-kpi-icon,.lager-kpi.is-bad .lager-kpi-value{color:#ef4444}

    .lager-toolbar{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
    .lager-search{position:relative;flex:0 1 380px;min-width:200px}
    .lager-search i{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--color-text-muted,#94a3b8);font-size:.9rem;pointer-events:none}
    .lager-search input{width:100%;padding:9px 12px 9px 34px;border-radius:9px;border:1px solid var(--border-1,rgba(255,255,255,.14));background:var(--surface-1);color:var(--text);font-size:.92rem}
    .lager-search input:focus{outline:none;border-color:var(--color-primary,#22c55e)}
    .lager-spacer{flex:1 1 auto}

    .lager-panel{background:var(--color-surface-1,rgba(255,255,255,.04));border:1px solid var(--border-1,rgba(255,255,255,.1));border-radius:12px;padding:16px 18px}
    .lager-panel[hidden]{display:none}
    .lager-panel-head{display:flex;align-items:center;gap:10px;margin-bottom:14px}
    .lager-panel-head h3{font-size:1rem;margin:0;display:flex;align-items:center;gap:8px;font-weight:650;flex:1}
    .lager-panel-head h3 i{color:var(--color-primary,#22c55e)}
    .lager-count{font-size:.82rem;color:var(--color-text-muted,#94a3b8)}
    .lager-panel-close{border:none;background:transparent;color:var(--color-text-muted,#94a3b8);cursor:pointer;font-size:1rem;padding:4px;line-height:1}
    .lager-panel-close:hover{color:var(--text)}

    .lager-form-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
    @media(max-width:900px){.lager-form-grid{grid-template-columns:repeat(2,1fr)}}
    .lager-field{display:flex;flex-direction:column;gap:5px;min-width:0}
    .lager-field.col-2{grid-column:span 2}
    @media(max-width:900px){.lager-field.col-2{grid-column:span 2}}
    .lager-field label{font-size:.76rem;font-weight:600;color:var(--color-text-muted,#94a3b8)}
    .lager-field input,.lager-field select{padding:8px 10px;border-radius:8px;border:1px solid var(--border-1,rgba(255,255,255,.14));background:var(--surface-1);color:var(--text);font-size:.9rem;width:100%}
    .lager-field input:focus,.lager-field select:focus{outline:none;border-color:var(--color-primary,#22c55e)}
    .lager-req{color:#ef4444}
    .lager-form-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:16px}

    .lager-tablewrap{overflow-x:auto;margin:0 -4px}
    .lager-table{width:100%;border-collapse:collapse;font-size:.9rem}
    .lager-table th{text-align:left;font-size:.7rem;text-transform:uppercase;letter-spacing:.04em;color:var(--color-text-muted,#94a3b8);font-weight:700;padding:0 12px 10px;border-bottom:1px solid var(--border-1,rgba(255,255,255,.12));white-space:nowrap}
    .lager-table th.num,.lager-table td.num{text-align:right;font-variant-numeric:tabular-nums}
    .lager-table td{padding:11px 12px;border-bottom:1px solid var(--border-1,rgba(255,255,255,.06));vertical-align:middle}
    .lager-table tbody tr:hover{background:var(--surface-2,rgba(255,255,255,.03))}
    .lager-table tbody tr:last-child td{border-bottom:0}
    .lager-mname{font-weight:600;color:var(--text)}
    .lager-sub{display:block;font-size:.76rem;color:var(--color-text-muted,#94a3b8)}
    .lager-bestand{font-weight:700}
    .lager-bestand.bad{color:#ef4444}
    .lager-bestand.low{color:#f59e0b}
    .lager-row-add{border:1px solid var(--border-1,rgba(255,255,255,.14));background:transparent;color:var(--color-primary,#22c55e);border-radius:8px;width:30px;height:30px;cursor:pointer;line-height:1;font-size:.95rem;display:inline-flex;align-items:center;justify-content:center}
    .lager-row-add:hover{background:rgba(34,197,94,.12);border-color:var(--color-primary,#22c55e)}

    .lager-badge{display:inline-flex;align-items:center;gap:6px;padding:3px 11px;border-radius:999px;font-size:.74rem;font-weight:600;white-space:nowrap}
    .lager-badge::before{content:"";width:7px;height:7px;border-radius:999px;background:currentColor}
    .lager-badge.ok{color:#16a34a;background:rgba(22,163,74,.12)}
    .lager-badge.low{color:#f59e0b;background:rgba(245,158,11,.14)}
    .lager-badge.bad{color:#ef4444;background:rgba(239,68,68,.14)}
    .lager-badge.neutral{color:var(--color-text-muted,#94a3b8);background:rgba(148,163,184,.14)}
    .lager-pill{font-size:.8rem;font-weight:600}
    .lager-pill.bad{color:#ef4444}
    .lager-pill.low{color:#f59e0b}
    .lager-muted{color:var(--color-text-muted,#94a3b8)}

    .lager-mov{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border-1,rgba(255,255,255,.06))}
    .lager-mov:last-child{border-bottom:0}
    .lager-mov-type{flex:0 0 auto;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.03em;padding:3px 10px;border-radius:999px}
    .lager-mov-type.zugang{color:#16a34a;background:rgba(22,163,74,.12)}
    .lager-mov-type.other{color:var(--color-text-muted,#94a3b8);background:rgba(148,163,184,.14)}
    .lager-mov-main{flex:1 1 auto;min-width:0}
    .lager-mov-main b{color:var(--text)}
    .lager-mov-sub{display:block;font-size:.78rem;color:var(--color-text-muted,#94a3b8)}
    .lager-mov-del{flex:0 0 auto;border:1px solid var(--border-1,rgba(255,255,255,.14));background:transparent;color:#ef4444;border-radius:8px;width:32px;height:32px;cursor:pointer;line-height:1;font-size:1rem}
    .lager-mov-del:hover{background:rgba(239,68,68,.12)}
    .lager-empty{color:var(--color-text-muted,#94a3b8);font-size:.9rem;padding:18px 2px;text-align:center}
  </style>`;function Gc(){const e=new Date().toISOString().slice(0,10);return`
    ${jc}
    <section class="calc-section">
      <div class="lager-wrap">
        <div class="lager-head">
          <h2><i class="bi bi-box-seam"></i>PSM-Lager</h2>
          <p data-role="lager-empty-hint">Bestand = Zugänge − Verbrauch · der Verbrauch wird automatisch aus den dokumentierten Anwendungen berechnet.</p>
        </div>

        <div class="lager-kpis" data-role="lager-kpis"></div>

        <div class="lager-toolbar">
          <div class="lager-search">
            <i class="bi bi-search"></i>
            <input type="search" data-role="lager-search" placeholder="Mittel oder Wirkstoff suchen …" autocomplete="off" />
          </div>
          <span class="lager-spacer"></span>
          <button type="button" class="btn btn-psm-primary" data-role="lager-add-toggle">
            <i class="bi bi-plus-lg me-1"></i>Zugang erfassen
          </button>
        </div>

        <div class="lager-panel" data-role="lager-form-panel" hidden>
          <div class="lager-panel-head">
            <h3><i class="bi bi-plus-circle"></i>Zugang / Bewegung erfassen</h3>
            <button type="button" class="lager-panel-close" data-role="lager-add-close" aria-label="Schließen"><i class="bi bi-x-lg"></i></button>
          </div>
          <form data-role="lager-form">
            <div class="lager-form-grid">
              <div class="lager-field col-2">
                <label>Mittel <span class="lager-req">*</span></label>
                <select name="mittel" data-role="lager-mittel-select" required>
                  <option value="">— Mittel wählen —</option>
                  <option value="__new__">➕ Neues Mittel …</option>
                </select>
                <input name="mittelNew" data-role="lager-mittel-new" placeholder="Name des neuen Mittels" autocomplete="off" hidden style="margin-top:6px" />
              </div>
              <div class="lager-field">
                <label>Typ</label>
                <select name="typ">
                  <option value="zugang">Zugang (Einkauf)</option>
                  <option value="korrektur">Korrektur (±)</option>
                  <option value="inventur">Inventur</option>
                </select>
              </div>
              <div class="lager-field">
                <label>Zulassungsnr.</label>
                <input name="kennr" />
              </div>
              <div class="lager-field">
                <label>Menge <span class="lager-req">*</span></label>
                <input name="menge" type="number" step="any" required />
              </div>
              <div class="lager-field">
                <label>Einheit</label>
                <input name="einheit" placeholder="L / kg / ml / g" />
              </div>
              <div class="lager-field">
                <label>Datum</label>
                <input name="datum" type="date" value="${e}" />
              </div>
              <div class="lager-field">
                <label>Charge</label>
                <input name="charge" />
              </div>
              <div class="lager-field">
                <label>Ablaufdatum</label>
                <input name="ablauf" type="date" />
              </div>
              <div class="lager-field col-2">
                <label>Lieferant</label>
                <input name="lieferant" />
              </div>
              <div class="lager-field">
                <label>Preis (€)</label>
                <input name="preis" type="number" step="any" />
              </div>
            </div>
            <div class="lager-form-actions">
              <button type="button" class="btn btn-psm-secondary-outline" data-role="lager-add-cancel">Abbrechen</button>
              <button type="submit" class="btn btn-psm-primary">Bewegung speichern</button>
            </div>
          </form>
        </div>

        <div class="lager-panel">
          <div class="lager-panel-head">
            <h3><i class="bi bi-card-checklist"></i>Bestandsübersicht</h3>
            <span class="lager-count" data-role="lager-count"></span>
          </div>
          <div class="lager-tablewrap">
            <table class="lager-table">
              <thead><tr>
                <th>Mittel</th>
                <th>Wirkstoff</th>
                <th class="num">Verbraucht</th>
                <th class="num">Bestand</th>
                <th>Status</th>
                <th>Zulassung bis</th>
                <th>Nächster Ablauf</th>
                <th class="num"></th>
              </tr></thead>
              <tbody data-role="lager-uebersicht"></tbody>
            </table>
          </div>
        </div>

        <div class="lager-panel">
          <div class="lager-panel-head">
            <h3><i class="bi bi-clock-history"></i>Letzte Bewegungen</h3>
          </div>
          <div data-role="lager-bewegungen"></div>
        </div>
      </div>
    </section>`}function Uc(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Gc();const a=e.querySelector('[data-role="lager-kpis"]'),n=e.querySelector('[data-role="lager-uebersicht"]'),r=e.querySelector('[data-role="lager-count"]'),i=e.querySelector('[data-role="lager-bewegungen"]'),o=e.querySelector('[data-role="lager-form"]'),s=e.querySelector('[data-role="lager-form-panel"]'),l=e.querySelector('[data-role="lager-add-toggle"]'),u=e.querySelector('[data-role="lager-search"]'),c=e.querySelector('[data-role="lager-mittel-select"]'),p=e.querySelector('[data-role="lager-mittel-new"]'),m=e.querySelector('[name="einheit"]'),f=e.querySelector('[name="kennr"]'),w=e.querySelector('[data-role="lager-empty-hint"]'),b=new Map;let h=[];const P=v=>{if(!a)return;const x=v.length,D=v.filter(K=>Number(K.bestand)<=0).length,F=v.filter(K=>{const Me=Zn(K.naechsterAblauf||K.zulEnde);return Me!==null&&Me>=0&&Me<180}).length,W=v.filter(K=>{const Me=Zn(K.zulEnde);return Me!==null&&Me<0}).length;a.innerHTML=Da("bi-boxes","Mittel im Lager",x)+Da("bi-exclamation-triangle","Bestand kritisch",D,D?"warn":"")+Da("bi-hourglass-split","Bald ablaufend (< 6 Mon.)",F,F?"warn":"")+Da("bi-slash-circle","Zulassung abgelaufen",W,W?"bad":"")},A=()=>{if(!n)return;const v=(u?.value||"").trim().toLowerCase(),x=v?h.filter(D=>String(D.name||"").toLowerCase().includes(v)||String(D.wirkstoff||"").toLowerCase().includes(v)):h;if(r&&(r.textContent=v?`${x.length} von ${h.length}`:`${h.length} Mittel`),!h.length){n.innerHTML='<tr><td colspan="8" class="lager-empty">Noch keine Mittel. Erfasse oben einen Zugang oder dokumentiere Anwendungen in „Neu erfassen".</td></tr>';return}if(!x.length){n.innerHTML=`<tr><td colspan="8" class="lager-empty">Keine Treffer für „${y(v)}".</td></tr>`;return}n.innerHTML=x.map(D=>{const F=y(D.einheit||""),W=D.bestand<0?" bad":D.bestand===0?" low":"";return`<tr>
          <td>
            <span class="lager-mname">${y(D.name)}</span>
            ${D.kennr?`<span class="lager-sub">${y(D.kennr)}</span>`:""}
          </td>
          <td class="lager-muted">${y(D.wirkstoff||"")}</td>
          <td class="num">
            ${Dn(D.verbraucht)} ${F}
            <span class="lager-sub">${D.anwendungen} Anw.</span>
          </td>
          <td class="num"><span class="lager-bestand${W}">${Dn(D.bestand)} ${F}</span></td>
          <td>${Kc(Number(D.bestand))}</td>
          <td>${Oc(D.zulEnde)}</td>
          <td class="lager-muted">${D.naechsterAblauf?Ct(D.naechsterAblauf):""}</td>
          <td class="num"><button type="button" class="lager-row-add" data-add="${La(D.name)}" title="Zugang für „${La(D.name)}" erfassen" aria-label="Zugang erfassen"><i class="bi bi-plus-lg"></i></button></td>
        </tr>`}).join("")},T=v=>{if(i){if(!v.length){i.innerHTML='<div class="lager-empty">Noch keine Bewegungen erfasst.</div>';return}i.innerHTML=v.map(x=>{const D=x.typ==="zugang",F=[Ct(x.datum),x.lieferant?y(x.lieferant):"",x.ablauf?"Ablauf "+Ct(x.ablauf):""].filter(Boolean).join(" · ");return`
        <div class="lager-mov">
          <span class="lager-mov-type ${D?"zugang":"other"}">${y(x.typ)}</span>
          <span class="lager-mov-main">
            <b>${y(x.mittelName)}</b> · ${Dn(x.menge)} ${y(x.einheit||"")}${x.charge?` · Charge ${y(x.charge)}`:""}
            <span class="lager-mov-sub">${F}</span>
          </span>
          <button class="lager-mov-del" data-del="${La(x.id)}" title="Löschen" aria-label="Löschen">×</button>
        </div>`}).join(""),i.querySelectorAll("[data-del]").forEach(x=>{x.addEventListener("click",async()=>{const D=x.getAttribute("data-del")||"";try{await ms({id:D}),await $e().catch(()=>{}),await $()}catch{N.warning("Löschen fehlgeschlagen.")}})})}},B=()=>{if(!c)return;const v=c.value,x=Array.from(b.keys()).sort((D,F)=>D.localeCompare(F,"de"));c.innerHTML='<option value="">— Mittel wählen —</option>'+x.map(D=>`<option value="${La(D)}">${y(D)}</option>`).join("")+'<option value="__new__">➕ Neues Mittel …</option>',v&&(v==="__new__"||x.includes(v))&&(c.value=v)},J=()=>{if(!c)return;const v=c.value==="__new__";p&&(p.hidden=!v,v&&p.focus());const x=b.get(c.value);x&&(m&&x.einheit&&(m.value=x.einheit),f&&x.kennr&&(f.value=x.kennr))};c?.addEventListener("change",J);const Y=v=>{Q(!0,!1),c&&(c.value=v,J()),s?.querySelector('[name="menge"]')?.focus()},Q=(v,x=!0)=>{s&&(s.hidden=!v,l&&(l.innerHTML=v?'<i class="bi bi-x-lg me-1"></i>Formular schließen':'<i class="bi bi-plus-lg me-1"></i>Zugang erfassen'),v&&(x&&s.querySelector('[name="mittel"]')?.focus(),s.scrollIntoView({behavior:"smooth",block:"nearest"})))},$=async()=>{if(G()!=="sqlite"){w&&(w.textContent="Bitte zuerst eine Datenbank öffnen.");return}try{const[v,x,D]=await Promise.all([Ti(),fs(),Ni()]);h=v?.rows||[],P(h),A(),T(x?.rows||[]),b.clear(),(D?.rows||[]).forEach(F=>{F.name&&b.set(F.name,{kennr:F.kennr??null,einheit:F.einheit??null,wirkstoff:F.wirkstoff??null})}),h.forEach(F=>{F.name&&!b.has(F.name)&&b.set(F.name,{kennr:F.kennr??null,einheit:F.einheit??null,wirkstoff:F.wirkstoff??null})}),B()}catch(v){console.warn("[Lager] Laden fehlgeschlagen:",v)}};l?.addEventListener("click",()=>Q(!!s?.hidden)),e.querySelector('[data-role="lager-add-close"]')?.addEventListener("click",()=>Q(!1)),e.querySelector('[data-role="lager-add-cancel"]')?.addEventListener("click",()=>Q(!1)),u?.addEventListener("input",()=>A()),n?.addEventListener("click",v=>{const x=v.target?.closest("[data-add]");if(!x)return;const D=x.getAttribute("data-add")||"";D&&Y(D)}),o?.addEventListener("submit",async v=>{if(v.preventDefault(),G()!=="sqlite"){N.warning("Bitte zuerst eine Datenbank öffnen.");return}const x=new FormData(o),D=String(x.get("mittel")||"").trim(),F=D==="__new__"?String(x.get("mittelNew")||"").trim():D,W=Number(String(x.get("menge")||"").replace(",","."));if(!F||!Number.isFinite(W)){N.warning("Bitte ein Mittel wählen und die Menge angeben.");return}const K=String(x.get("preis")||"").trim();try{await ps({mittelName:F,kennr:String(x.get("kennr")||"").trim()||null,wirkstoff:b.get(F)?.wirkstoff||null,typ:String(x.get("typ")||"zugang"),menge:W,einheit:String(x.get("einheit")||"").trim()||null,datum:String(x.get("datum")||"").trim()||null,charge:String(x.get("charge")||"").trim()||null,ablauf:String(x.get("ablauf")||"").trim()||null,lieferant:String(x.get("lieferant")||"").trim()||null,preis:K?Number(K.replace(",",".")):null}),await $e().catch(()=>{}),o.reset(),J(),Q(!1),N.success("Bewegung gespeichert."),await $()}catch{N.warning("Speichern fehlgeschlagen.")}}),t.state.subscribe(v=>{v?.app?.activeSection==="lager"&&$()}),$()}const Za=111320;function R(e,t=0){return Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–"}function gr(e){const t=/^#?([0-9a-f]{6})$/i.exec(e||"");if(!t)return[34,197,94];const a=parseInt(t[1],16);return[a>>16&255,a>>8&255,a&255]}function Vc([e,t,a],n){return[Math.round(e+(255-e)*n),Math.round(t+(255-t)*n),Math.round(a+(255-a)*n)]}function Zc(e){const t=e?.geometry||e;return!t||!t.coordinates?[]:t.type==="Polygon"?t.coordinates.length?[t.coordinates[0]]:[]:t.type==="MultiPolygon"?t.coordinates.map(a=>a[0]).filter(Boolean):[]}async function Qc(){const[{jsPDF:e},t]=await Promise.all([Ae(()=>import("./jspdf.es.min.BQ-Uo8Gf.js").then(n=>n.j),__vite__mapDeps([2,1])),Ae(()=>import("./jspdf.plugin.autotable.B0IxatYY.js"),[])]),a=t.default||t;return{jsPDF:e,autoTable:a}}function Qa(e,t,a){if(t.length<2)return;const n=[];for(let r=1;r<t.length;r++)n.push([t[r][0]-t[r-1][0],t[r][1]-t[r-1][1]]);e.lines(n,t[0][0],t[0][1],[1,1],a,!0)}function Jc(e,t=.12){const a=(e.latlngs||[]).filter(u=>Number.isFinite(u?.[0])&&Number.isFinite(u?.[1]));if(a.length<3)return null;let n=1/0,r=-1/0,i=1/0,o=-1/0;a.forEach(([u,c])=>{u<n&&(n=u),u>r&&(r=u),c<i&&(i=c),c>o&&(o=c)});const s=(r-n)*t+1e-5,l=(o-i)*t+1e-5;return{minLat:n-s,maxLat:r+s,minLng:i-l,maxLng:o+l}}function Yc(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>a(n.error),n.readAsDataURL(e)})}async function Xc(e){const t=Jc(e);if(!t)return null;const a=(t.minLat+t.maxLat)/2,n=(t.maxLng-t.minLng)*Math.cos(a*Math.PI/180)*Za,r=(t.maxLat-t.minLat)*Za,i=r>0?n/r:1;let o,s;i>=1?(o=1e3,s=Math.round(1e3/i)):(s=1e3,o=Math.round(1e3*i)),o=Math.max(240,Math.min(1200,o)),s=Math.max(240,Math.min(1200,s));const l=`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=${t.minLng},${t.minLat},${t.maxLng},${t.maxLat}&bboxSR=4326&imageSR=4326&size=${o},${s}&format=jpg&transparent=false&f=image`,u=new AbortController,c=setTimeout(()=>u.abort(),9e3);try{const p=await fetch(l,{signal:u.signal});if(clearTimeout(c),!p.ok)return null;const m=await p.blob();return m.size?{dataUrl:await Yc(m),bbox:t,aspect:o/s}:null}catch{return clearTimeout(c),null}}function ed(e,t,a,n,r,i){const o=(t.latlngs||[]).filter(x=>Number.isFinite(x?.[0])&&Number.isFinite(x?.[1]));if(o.length<3)return null;const s=[o.map(([x,D])=>[D,x])];(t.beds||[]).forEach(x=>Zc(x.geo).forEach(D=>s.push(D)));let l=0,u=0;s.forEach(x=>x.forEach(([,D])=>{l+=D,u++}));const c=u?l/u:0,p=Math.cos(c*Math.PI/180)||1,m=(x,D)=>[x*p*Za,D*Za];let f=1/0,w=1/0,b=-1/0,h=-1/0;const P=s.map(x=>x.map(([D,F])=>{const[W,K]=m(D,F);return W<f&&(f=W),W>b&&(b=W),K<w&&(w=K),K>h&&(h=K),[W,K]})),A=Math.max(1e-6,b-f),T=Math.max(1e-6,h-w),B=Math.min(r/A,i/T),J=a+(r-A*B)/2,Y=n+(i-T*B)/2,Q=([x,D])=>[J+(x-f)*B,Y+(h-D)*B],$=gr(t.color),v=Vc($,.55);e.setLineWidth(.1),e.setDrawColor($[0],$[1],$[2]),e.setFillColor(v[0],v[1],v[2]);for(let x=1;x<P.length;x++)Qa(e,P[x].map(Q),"FD");return e.setLineWidth(.6),e.setDrawColor($[0],$[1],$[2]),Qa(e,P[0].map(Q),"S"),{spanX:A,spanY:T}}function td(e,t,a,n,r,i){const o=i-r*2;let s=n;e.setFont("helvetica","bold"),e.setFontSize(11),e.setTextColor(20),e.text(a?"Luftbild der Fläche":"Skizze (maßstäblich)",r,s),s+=3;const l=gr(t.color);let u=o,c;if(a){c=Math.min(92,u/Math.max(.2,a.aspect)),u=c*a.aspect,u>o&&(u=o,c=u/a.aspect);const m=r;try{e.addImage(a.dataUrl,"JPEG",m,s,u,c)}catch{}const f=a.bbox,w=([b,h])=>[m+(h-f.minLng)/(f.maxLng-f.minLng)*u,s+(f.maxLat-b)/(f.maxLat-f.minLat)*c];return e.setDrawColor(l[0],l[1],l[2]),e.setLineWidth(.9),Qa(e,t.latlngs.map(w),"S"),e.setDrawColor(255,255,255),e.setLineWidth(.25),Qa(e,t.latlngs.map(w),"S"),e.setDrawColor(190),e.setLineWidth(.2),e.rect(m,s,u,c),e.setFont("helvetica","normal"),e.setFontSize(8),e.setTextColor(150),e.text("Luftbild © Esri World Imagery",r+1,s+c+3.5),e.setTextColor(20),s+c+6}c=80,e.setDrawColor(220),e.setLineWidth(.2),e.rect(r,s,u,c);const p=ed(e,t,r+4,s+4,u-8,c-8);return p&&(e.setFont("helvetica","normal"),e.setFontSize(8.5),e.setTextColor(130),e.text(`ca. ${R(p.spanX)} m × ${R(p.spanY)} m  ·  Beet-Streifen in Flächenfarbe`,r+1,s+c+3.8),e.setTextColor(20)),s+c+6}function ad(e){return e.params.rowSp>0?Math.max(1,Math.floor(e.params.bedW/e.params.rowSp)):0}function nd(e){let t=0;return(e.beds||[]).forEach(a=>{t+=(a.rows||0)*(a.lenM||0)}),{plants:e.plants||0,reserve:Math.ceil((e.plants||0)*1.05),beetMeter:e.bedMeters||0,reihenMeter:t}}function yi(e,t,a,n,r,i,o){const s=o-i*2;let l=r;const u=gr(a.color);e.setFillColor(u[0],u[1],u[2]),e.rect(i,l-3.4,4,4,"F"),e.setFont("helvetica","bold"),e.setFontSize(13),e.setTextColor(20),e.text(a.name||"Fläche",i+6,l),l+=4,e.setDrawColor(200),e.line(i,l,o-i,l),l+=6;const c=[["Kultur",a.kultur||"–"],["Standort",a.standortName||"–"],["EPPO-Code",a.eppoCode||"–"]];e.setFontSize(10);const p=s/3;c.forEach(([b,h],P)=>{const A=i+P*p;e.setFont("helvetica","normal"),e.setTextColor(120),e.text(b,A,l),e.setTextColor(20),e.setFont("helvetica","bold"),e.text(String(h),A,l+5)}),l+=12,l=td(e,a,n,l,i,o),t(e,{startY:l,margin:{left:i,right:i},head:[["Kennzahl","Wert"]],body:[["Fläche",`${R(a.areaM2)} m²  ·  ${R(a.areaM2/1e4,3)} ha`],["Beete",R(a.bedsCount)],["Beetmeter",`${R(a.bedMeters)} m`],["Pflanzen (Bedarf)",R(a.plants)]],styles:{fontSize:9.5,cellPadding:2},headStyles:{fillColor:[34,197,94],textColor:255},columnStyles:{0:{cellWidth:38,textColor:90},1:{fontStyle:"bold"}},theme:"grid",tableWidth:s/2-4}),t(e,{startY:l,margin:{left:i+s/2+4,right:i},head:[["Anbauparameter","Wert"]],body:[["Bettbreite",`${R(a.params.bedW,2)} m`],["Wegbreite",`${R(a.params.pathW,2)} m`],["Reihenabstand",`${R(a.params.rowSp,2)} m`],["Pflanzabstand",`${R(a.params.inRowSp,2)} m`],["Reihen je Beet",R(ad(a))],["Ausrichtung",`${R(a.params.angle)}°`]],styles:{fontSize:9.5,cellPadding:2},headStyles:{fillColor:[71,85,105],textColor:255},columnStyles:{0:{cellWidth:38,textColor:90},1:{fontStyle:"bold"}},theme:"grid",tableWidth:s/2-4});let m=(e.lastAutoTable?.finalY||l)+8;const f=nd(a);t(e,{startY:m,margin:{left:i,right:i},head:[["Bedarf (Schätzung)","Menge","Verwendung"]],body:[["Jungpflanzen / Setzlinge",R(f.plants),"Pflanzbedarf"],["Empfohlene Bestellmenge",R(f.reserve),"inkl. 5 % Reserve"],["Beetmeter",`${R(f.beetMeter)} m`,"Vlies / Folie / Mulch"],["Reihenmeter",`${R(f.reihenMeter)} m`,"Tropfschlauch / Aussaat"]],styles:{fontSize:9.5,cellPadding:2},headStyles:{fillColor:[217,119,6],textColor:255},columnStyles:{1:{fontStyle:"bold",halign:"right"},2:{textColor:110}},theme:"grid"}),m=(e.lastAutoTable?.finalY||m)+8;const w=a.beds||[];if(w.length){const h=w.slice(0,120).map((P,A)=>[String(A+1),`${R(P.lenM,1)} m`,R(P.rows),R(P.perRow),R(P.plants),`${R(P.areaM2,1)} m²`]);if(e.setFont("helvetica","bold"),e.setFontSize(11),e.setTextColor(20),e.text("Beete im Detail",i,m),t(e,{startY:m+2,margin:{left:i,right:i},head:[["Beet","Länge","Reihen","Pfl./Reihe","Pflanzen","Fläche"]],body:h,styles:{fontSize:8.5,cellPadding:1.6},headStyles:{fillColor:[51,65,85],textColor:255},columnStyles:{0:{halign:"right",cellWidth:14},1:{halign:"right"},2:{halign:"right"},3:{halign:"right"},4:{halign:"right",fontStyle:"bold"},5:{halign:"right"}},theme:"striped"}),w.length>120){const P=(e.lastAutoTable?.finalY||m)+4;e.setFont("helvetica","italic"),e.setFontSize(8.5),e.setTextColor(130),e.text(`… und ${w.length-120} weitere Beete.`,i,P),e.setTextColor(20)}}}async function rd(e,t){const{jsPDF:a,autoTable:n}=await Qc(),r=new a({unit:"mm",format:"a4"}),i=r.internal.pageSize.getWidth(),o=14,s=await Promise.all(e.map(m=>Xc(m).catch(()=>null))),l=t||{},u=m=>{let f=m;const w=l.headline||l.name||"";if(w&&(r.setFont("helvetica","bold"),r.setFontSize(14),r.setTextColor(20),r.text(w,o,f),f+=6),r.setFont("helvetica","normal"),r.setFontSize(9),r.setTextColor(90),l.name&&l.headline&&l.name!==l.headline&&(r.text(l.name,o,f),f+=4.5),l.address)for(const b of String(l.address).split(/\r?\n/))b.trim()&&(r.text(b.trim(),o,f),f+=4.5);return l.contactEmail&&(r.text(l.contactEmail,o,f),f+=4.5),r.setTextColor(20),f};let c=u(o);c+=2,r.setFont("helvetica","bold"),r.setFontSize(13),r.text("Acker-Planer – Flächenauswertung",o,c);const p=new Date().toLocaleDateString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric"});if(r.setFontSize(11),r.text(p,i-o,c,{align:"right"}),c+=3,r.setDrawColor(180),r.line(o,c,i-o,c),c+=7,e.length>1){const m=e.reduce((f,w)=>({areaM2:f.areaM2+(w.areaM2||0),bedsCount:f.bedsCount+(w.bedsCount||0),bedMeters:f.bedMeters+(w.bedMeters||0),plants:f.plants+(w.plants||0)}),{areaM2:0,bedsCount:0,bedMeters:0,plants:0});n(r,{startY:c,margin:{left:o,right:o},head:[["Fläche","Kultur","ha","Beete","Beetmeter","Pflanzen"]],body:e.map(f=>[f.name||"–",f.kultur||"–",R(f.areaM2/1e4,3),R(f.bedsCount),`${R(f.bedMeters)} m`,R(f.plants)]),foot:[["Summe","",R(m.areaM2/1e4,3),R(m.bedsCount),`${R(m.bedMeters)} m`,R(m.plants)]],styles:{fontSize:9.5,cellPadding:2},headStyles:{fillColor:[34,197,94],textColor:255},footStyles:{fillColor:[226,232,240],textColor:20,fontStyle:"bold"},theme:"grid"})}return e.forEach((m,f)=>{if(f===0&&e.length<=1)yi(r,n,m,s[f],c,o,i);else{r.addPage();const w=u(o);yi(r,n,m,s[f],w+4,o,i)}}),r.output("blob")}function id(e){return e.replace(/[^\wäöüÄÖÜ.-]+/g,"_").replace(/^_+|_+$/g,"").slice(0,80)||"Acker"}async function wi(e,t,a={}){if(!e.length)return;const n=await rd(e,t),r=a.title||(e.length===1?e[0].name:"Acker-Flaechen"),i=`${id(r||"Acker")}.pdf`,o=new File([n],i,{type:"application/pdf"}),s=navigator;if(typeof s.share=="function"&&(typeof s.canShare!="function"||s.canShare({files:[o]})))try{await s.share({files:[o],title:r});return}catch(c){if(c?.name==="AbortError")return;console.warn("[Acker] PDF-Share fehlgeschlagen, nutze Download",c)}const l=URL.createObjectURL(n),u=document.createElement("a");u.href=l,u.download=i,document.body.appendChild(u),u.click(),u.remove(),setTimeout(()=>URL.revokeObjectURL(l),1e3)}const lt=["#ef4444","#3b82f6","#a855f7","#f59e0b","#06b6d4","#ec4899","#84cc16","#14b8a6"],od=()=>({bedW:1.2,pathW:.4,rowSp:.5,inRowSp:.4,angle:0}),ee=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";let q=null,ue=null,C=null,Pn=!1,Pa=[];function sd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=ld();const a=[];let n=null;const r=new Map;let i=null;function o(){const d=[];if(a.forEach(L=>{const E=L.latlngs||[];if(E.length<3)return;const H=E.map(V=>[Number(V[1]),Number(V[0])]),_=H[0],Z=H[H.length-1];(_[0]!==Z[0]||_[1]!==Z[1])&&H.push([_[0],_[1]]),d.push({type:"Feature",geometry:{type:"Polygon",coordinates:[H]},properties:{name:L.name||"",kultur:L.kultur||null,eppoCode:L.eppoCode||null,flaeche_m2:Math.round(L.result?.areaM2||0),flaeche_ha:Number(((L.result?.areaM2||0)/1e4).toFixed(4)),beete:L.result?.beds?.length||0,beetmeter_m:Math.round(L.result?.bedMeters||0),pflanzen:L.result?.plants||0,bettbreite_m:L.params?.bedW??null,wegbreite_m:L.params?.pathW??null,reihenabstand_m:L.params?.rowSp??null,pflanzabstand_m:L.params?.inRowSp??null,ausrichtung_grad:L.params?.angle??null}})}),(he(t.state.getState().gps?.points)||[]).forEach(L=>{const E=Number(L.latitude),H=Number(L.longitude);if(!Number.isFinite(E)||!Number.isFinite(H))return;const _=Number(L.nutzflaecheQm);d.push({type:"Feature",geometry:{type:"Point",coordinates:[H,E]},properties:{name:L.name||"Standort",typ:"standort",flaeche_m2:Number.isFinite(_)&&_>0?Math.round(_):null,kind:L.kind||null}})}),!d.length){N.warning("Keine Flächen oder Standorte zum Exportieren.");return}const k={type:"FeatureCollection",name:"PSM Acker-Planer",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:d};try{const L=new Blob([JSON.stringify(k,null,2)],{type:"application/geo+json"}),E=URL.createObjectURL(L),H=document.createElement("a");H.href=E,H.download="acker-flaechen.geojson",document.body.appendChild(H),H.click(),H.remove(),setTimeout(()=>URL.revokeObjectURL(E),1e3),N.success(`${d.length} Objekt(e) als GeoJSON exportiert.`)}catch(L){console.error("[Acker] GeoJSON-Export fehlgeschlagen",L),N.error("Export fehlgeschlagen.")}}function s(d){return d&&(he(t.state.getState().gps?.points)||[]).find(L=>String(L.id)===String(d))?.name||null}function l(d){return{name:d.name||"Fläche",kultur:d.kultur||null,standortName:s(d.standortId),eppoCode:d.eppoCode||null,color:d.color,params:{...d.params},areaM2:d.result?.areaM2||0,bedsCount:d.result?.beds?.length||0,bedMeters:d.result?.bedMeters||0,plants:d.result?.plants||0,latlngs:(d.latlngs||[]).map(g=>[Number(g[0]),Number(g[1])]),beds:(d.result?.beds||[]).map(g=>({geo:g.geo,lenM:g.lenM||0,rows:g.rows||0,perRow:g.perRow||0,plants:g.plants||0,areaM2:g.areaM2||0}))}}function u(){const d=t.state.getState().company||{};return{name:d.name||"",headline:d.headline||"",address:d.address||"",contactEmail:d.contactEmail||""}}async function c(d){if(!d||(d.latlngs?.length||0)<3){N.warning("Diese Fläche hat noch keine Geometrie.");return}try{N.info("PDF wird erstellt …"),await wi([l(d)],u(),{title:d.name||"Acker-Flaeche"})}catch(g){console.error("[Acker] PDF-Export fehlgeschlagen",g),N.error("PDF-Export fehlgeschlagen.")}}async function p(){const d=a.filter(g=>(g.latlngs?.length||0)>=3);if(!d.length){N.warning("Keine Flächen zum Exportieren.");return}try{N.info("PDF wird erstellt …"),await wi(d.map(l),u(),{title:"Acker-Flaechen"})}catch(g){console.error("[Acker] PDF-Export fehlgeschlagen",g),N.error("PDF-Export fehlgeschlagen.")}}function m(){if(!q||!i)return;i.clearLayers(),(he(t.state.getState().gps?.points)||[]).forEach(g=>{const k=Number(g.latitude),L=Number(g.longitude);if(!Number.isFinite(k)||!Number.isFinite(L))return;const E=Number(g.nutzflaecheQm),H=Number.isFinite(E)&&E>0?`${Math.round(E)} m²`:"",_=g.name||"Standort",Z=q.marker([k,L],{icon:q.divIcon({className:"acker-standort",html:'<span class="acker-standort-dot"></span>',iconSize:[16,16],iconAnchor:[8,8]})});Z.bindTooltip(`${y(_)}${H?" · "+H:""}`,{permanent:!0,direction:"top",className:"acker-standort-label",offset:[0,-9]});const V=[`<b>${y(_)}</b>`,H?`Fläche: ${H}`:"",g.kind?y(String(g.kind)):""].filter(Boolean).join("<br>");Z.bindPopup(V),i.addLayer(Z)})}const f=d=>e.querySelector(d),w=f('[data-role="acker-list"]'),b=f('[data-role="acker-empty"]'),h=f('[data-role="acker-totals"]'),P=f('[data-role="acker-map"]'),A=d=>({id:d.id,name:d.name,kultur:d.kultur||null,eppoCode:d.eppoCode||null,standortId:d.standortId||null,color:d.color,latlngs:d.latlngs,areaQm:d.result?.areaM2||0,bedW:d.params.bedW,pathW:d.params.pathW,rowSp:d.params.rowSp,inRowSp:d.params.inRowSp,angle:d.params.angle,beds:d.result?.beds?.length||0,bedMeters:d.result?.bedMeters||0,plants:d.result?.plants||0}),T=(d,g=!1)=>{if(G()!=="sqlite")return;const k=async()=>{try{const L=await bs(A(d));L?.id&&(d.id=L.id),await $e().catch(()=>{})}catch(L){console.warn("[Acker] Speichern fehlgeschlagen:",L)}};if(g){k();return}clearTimeout(r.get(d._key)),r.set(d._key,setTimeout(k,600))};function B(d,g){const k=d.map(Ne=>[Ne[1],Ne[0]]);if(k.length<3)return{areaM2:0,beds:[],bedMeters:0,plants:0};const L=k[0],E=k[k.length-1];if((L[0]!==E[0]||L[1]!==E[1])&&k.push(L.slice()),k.length<4)return{areaM2:0,beds:[],bedMeters:0,plants:0};let H;try{H=ue.polygon([k])}catch{return{areaM2:0,beds:[],bedMeters:0,plants:0}}const _=ue.area(H),Z=g.bedW+g.pathW;if(Z<=0||g.bedW<=0||g.rowSp<=0||g.inRowSp<=0)return{areaM2:_,beds:[],bedMeters:0,plants:0};const V=ue.centroid(H),Ee=ue.transformRotate(H,-g.angle,{pivot:V}),se=ue.bbox(Ee),ga=1/111320,Io=Z*ga,Fo=g.bedW*ga,qt=(se[2]-se[0])*.02+1e-4,Er=[];let Lr=0,Dr=0,Pr=0;for(let Ne=se[1];Ne<se[3]&&Pr<4e3;Ne+=Io,Pr++){const Ar=Math.min(Ne+Fo,se[3]),Bo=ue.polygon([[[se[0]-qt,Ne],[se[2]+qt,Ne],[se[2]+qt,Ar],[se[0]-qt,Ar],[se[0]-qt,Ne]]]);let ba=null;try{ba=ue.intersect(Ee,Bo)}catch{ba=null}if(!ba)continue;let un;try{un=ue.transformRotate(ba,g.angle,{pivot:V})}catch{continue}const pn=ue.area(un);if(pn<Math.max(.4,g.bedW*.3))continue;const fn=pn/g.bedW,mn=Math.max(1,Math.floor(g.bedW/g.rowSp)),gn=Math.max(0,Math.floor(fn/g.inRowSp));Lr+=fn,Dr+=mn*gn,Er.push({geo:un,lenM:fn,rows:mn,perRow:gn,plants:mn*gn,areaM2:pn})}return{areaM2:_,beds:Er,bedMeters:Lr,plants:Dr}}const J=(d,g)=>({color:d.color,weight:g?3:2,fillColor:d.color,fillOpacity:g?.05:.12,dashArray:g?null:"4 4",bubblingMouseEvents:!1}),Y=d=>({color:d.color,weight:1,fillColor:d.color,fillOpacity:.4});function Q(d){d.outline&&C.removeLayer(d.outline),d.bedsLayer&&C.removeLayer(d.bedsLayer),F(d);const g=d._key===n;d.bedsLayer=q.layerGroup(),(d.result?.beds||[]).forEach(k=>{q.geoJSON(k.geo,{style:Y(d)}).bindTooltip(`${ee(k.lenM,1)} m · ${k.rows}×${ee(k.perRow)} = ${ee(k.plants)} Pfl.`,{sticky:!0}).addTo(d.bedsLayer)}),d.bedsLayer.addTo(C),d.outline=q.polygon(d.latlngs,J(d,g)).addTo(C),d.outline.on("click",()=>it(d._key)),d.outline.on("contextmenu",k=>Ao(d,k)),g&&$(d)}function $(d){F(d),d.handles=d.latlngs.map((g,k)=>{const L=q.marker(g,{draggable:!0,icon:q.divIcon({className:"acker-vhandle"}),title:"Ziehen = verschieben · Doppelklick = löschen"}).addTo(C);return L.on("dragstart",()=>x(d)),L.on("drag",E=>{d.latlngs[k]=[E.target.getLatLng().lat,E.target.getLatLng().lng],d.outline.setLatLngs(d.latlngs)}),L.on("dragend",()=>W(d)),L.on("dblclick",E=>{q.DomEvent.stop(E),D(d,k)}),L.on("contextmenu",E=>{q.DomEvent.stop(E),D(d,k)}),L}),v(d)}function v(d){(d.midHandles||[]).forEach(k=>C.removeLayer(k)),d.midHandles=[];const g=d.latlngs||[];if(!(g.length<2))for(let k=0;k<g.length;k++){const L=g[k],E=g[(k+1)%g.length],H=[(L[0]+E[0])/2,(L[1]+E[1])/2],_=k+1,Z=q.marker(H,{icon:q.divIcon({className:"acker-mhandle",html:"+"}),keyboard:!1,title:"Klicken = Punkt einfügen"}).addTo(C);Z.on("click",V=>{q.DomEvent.stop(V),d.latlngs.splice(_,0,H.slice()),W(d)}),d.midHandles.push(Z)}}function x(d){(d.midHandles||[]).forEach(g=>C.removeLayer(g)),d.midHandles=[]}function D(d,g){if((d.latlngs?.length||0)<=3){N.warning("Eine Fläche braucht mindestens 3 Punkte.");return}d.latlngs.splice(g,1),W(d)}function F(d){(d.handles||[]).forEach(g=>C.removeLayer(g)),(d.midHandles||[]).forEach(g=>C.removeLayer(g)),d.handles=[],d.midHandles=[]}function W(d){d.result=B(d.latlngs,d.params),Q(d),Ie(),T(d)}function K(d){return['<option value="">– Kultur –</option>'].concat(Pa.map(g=>{const k=`${g.kultur}${g.anbau?" ("+g.anbau+")":""}`;return`<option value="${y(g.kultur)}"${g.kultur===d?" selected":""}>${y(k)}</option>`})).join("")}function Me(d){const g=he(t.state.getState().gps?.points)||[];return['<option value="">– Standort –</option>'].concat(g.map(k=>`<option value="${y(k.id)}"${k.id===d?" selected":""}>${y(k.name||"")}</option>`)).join("")}function Ie(){if(!w||!b||!h)return;b.style.display=a.length?"none":"block",h.style.display=a.length?"block":"none",w.innerHTML="";let d=0,g=0,k=0,L=0;a.forEach(E=>{d+=E.result?.areaM2||0,g+=E.result?.beds?.length||0,k+=E.result?.bedMeters||0,L+=E.result?.plants||0;const H=E._key===n,_=document.createElement("div");_.className="acker-field"+(H?" sel open":""),_.innerHTML=`
        <div class="acker-fhead">
          <span class="acker-swatch" style="background:${E.color}"></span>
          <input class="acker-name" value="${y(E.name)}" />
          <span class="acker-stat">${ee(E.result?.plants||0)} Pfl.</span>
        </div>
        <div class="acker-fbody">
          <div class="acker-grid">
            <label class="acker-fld span2">Kultur<select data-k="kultur">${K(E.kultur)}</select></label>
            <label class="acker-fld span2">Standort (für PSM)<select data-k="standortId">${Me(E.standortId)}</select></label>
            <label class="acker-fld">Bettbreite (m)<input data-k="bedW" type="number" step="0.05" min="0.1" value="${E.params.bedW}"/></label>
            <label class="acker-fld">Wegbreite (m)<input data-k="pathW" type="number" step="0.05" min="0" value="${E.params.pathW}"/></label>
            <label class="acker-fld">Reihenabstand (m)<input data-k="rowSp" type="number" step="0.05" min="0.05" value="${E.params.rowSp}"/></label>
            <label class="acker-fld">Pflanzabstand (m)<input data-k="inRowSp" type="number" step="0.05" min="0.05" value="${E.params.inRowSp}"/></label>
            <label class="acker-fld span2">Ausrichtung der Beete: ${E.params.angle}°<input data-k="angle" type="range" min="0" max="180" step="5" value="${E.params.angle}"/></label>
          </div>
          <div class="acker-res">
            <div class="r"><span>Fläche</span><b>${ee(E.result?.areaM2||0)} m² · ${ee((E.result?.areaM2||0)/1e4,3)} ha</b></div>
            <div class="r"><span>Beete</span><b>${ee(E.result?.beds?.length||0)}</b></div>
            <div class="r"><span>Beetmeter</span><b>${ee(E.result?.bedMeters||0)} m</b></div>
            <div class="r"><span>Pflanzen</span><b>${ee(E.result?.plants||0)}</b></div>
          </div>
          <div class="acker-edithint"><i class="bi bi-pencil me-1"></i>Eckpunkt ziehen = verschieben · Doppelklick = löschen · „+" auf der Kante = einfügen</div>
          <div class="acker-actions">
            <button class="btn btn-sm btn-psm-primary" data-act="pdf"><i class="bi bi-file-earmark-pdf me-1"></i>PDF-Export</button>
            <button class="btn btn-sm" data-act="recolor">Farbe</button>
            <button class="btn btn-sm" data-act="del" style="color:#ef4444;">Löschen</button>
          </div>
        </div>`,_.querySelector(".acker-fhead").addEventListener("click",V=>{V.target.classList.contains("acker-name")||it(E._key)}),_.querySelector(".acker-name").addEventListener("input",V=>{E.name=V.target.value,T(E)}),_.querySelectorAll("[data-k]").forEach(V=>{V.addEventListener("input",Ee=>{const se=V.dataset.k;if(se==="kultur"){E.kultur=Ee.target.value||null,E.eppoCode=Pa.find(ga=>ga.kultur===E.kultur)?.eppoCode||null,T(E);return}if(se==="standortId"){E.standortId=Ee.target.value||null,T(E);return}se==="angle"?E.params.angle=+Ee.target.value:E.params[se]=parseFloat(Ee.target.value)||0,W(E)})}),_.querySelector('[data-act="pdf"]').addEventListener("click",()=>void c(E)),_.querySelector('[data-act="del"]').addEventListener("click",()=>Bt(E._key)),_.querySelector('[data-act="recolor"]').addEventListener("click",()=>{E.color=lt[(lt.indexOf(E.color)+1)%lt.length],Q(E),Ie(),T(E)}),w.appendChild(_)}),h.querySelector('[data-t="area"]').textContent=ee(d)+" m² · "+ee(d/1e4,3)+" ha",h.querySelector('[data-t="beds"]').textContent=ee(g),h.querySelector('[data-t="meters"]').textContent=ee(k)+" m",h.querySelector('[data-t="plants"]').textContent=ee(L)}function it(d){n=d,a.forEach(g=>Q(g)),Ie()}async function Bt(d){const g=a.find(L=>L._key===d);if(!g)return;g.outline&&C.removeLayer(g.outline),g.bedsLayer&&C.removeLayer(g.bedsLayer),F(g);const k=a.findIndex(L=>L._key===d);if(k>=0&&a.splice(k,1),n===d&&(n=null),Ie(),g.id&&G()==="sqlite")try{await gs({id:g.id}),await $e().catch(()=>{})}catch{}}let Ve=!1,ae=[],gt=null,Fe=null,zt=[],ko=0;function hr(){const d=ae.length;if(d<2)return{areaM2:0,perimM:0,n:d};const g=ae.map(E=>[E[1],E[0]]);let k=0,L=0;try{k=ue.length(ue.lineString(g),{units:"kilometers"})*1e3}catch{}if(d>=3){const E=g.slice();E.push(g[0]);try{L=ue.area(ue.polygon([E]))}catch{}}return{areaM2:L,perimM:k,n:d}}function ua(){dn();const d=f('[data-role="acker-drawstat"]');if(!d)return;const{areaM2:g,perimM:k,n:L}=hr();if(L===0){d.textContent="Noch keine Punkte – auf die Karte tippen.";return}const E=[`${L} Punkt${L===1?"":"e"}`];k&&E.push(`Umfang ${ee(k)} m`),g&&E.push(`Fläche ${ee(g)} m² (${ee(g/1e4,3)} ha)`),d.textContent=E.join(" · ")}function sn(){gt?gt.setLatLngs(ae):gt=q.polyline(ae,{color:"#22c55e",weight:2,dashArray:"5 5"}).addTo(C),ae.length>=3?Fe?Fe.setLatLngs(ae):Fe=q.polygon(ae,{color:"#22c55e",weight:0,fillColor:"#22c55e",fillOpacity:.12,interactive:!1}).addTo(C):Fe&&(C.removeLayer(Fe),Fe=null)}function Be(d){Ve=d,f('[data-role="acker-banner"]').style.display=d?"block":"none",C.getContainer().style.cursor=d?"crosshair":"",d||(gt&&C.removeLayer(gt),Fe&&C.removeLayer(Fe),zt.forEach(g=>C.removeLayer(g)),gt=null,Fe=null,zt=[],ae=[]),yr(),vt(),ua()}function pa(){if(!ae.length)return;ae.pop();const d=zt.pop();d&&C.removeLayer(d),sn(),ua()}function So(d){if(Ve){if(ae.length>=3){const g=C.latLngToContainerPoint(q.latLng(ae[0][0],ae[0][1])),k=C.latLngToContainerPoint(d.latlng);if(g.distanceTo(k)<14){bt();return}}ae.push([d.latlng.lat,d.latlng.lng]),zt.push(q.circleMarker(d.latlng,{radius:4,color:"#22c55e",fillColor:"#fff",fillOpacity:1,weight:2}).addTo(C)),sn(),ua()}}function bt(){if(ae.length<3){N.warning("Mindestens 3 Punkte setzen.");return}const d=ae.map(g=>g.slice());Be(!1),vr(d)}function vr(d){const g={_key:"new-"+ ++ko,id:null,name:"Fläche "+(a.length+1),kultur:null,eppoCode:null,standortId:null,color:lt[a.length%lt.length],latlngs:d.map(k=>k.slice()),params:od(),outline:null,bedsLayer:null,handles:[],midHandles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};return a.push(g),n=g._key,W(g),T(g,!0),g}let ze=!1,ot=null,ht=null,fa=null;function yr(){const d=Ve||ze,g=f('[data-role="acker-draw"]'),k=f('[data-role="acker-rect"]');g&&(g.style.display=d?"none":"block"),k&&(k.style.display=d?"none":"block")}function Te(d){ze=d;const g=f('[data-role="acker-rectbanner"]');g&&(g.style.display=d?"block":"none"),C.getContainer().style.cursor=d?"crosshair":"",d||(ht&&C.removeLayer(ht),fa&&C.removeLayer(fa),ht=null,fa=null,ot=null),yr(),vt(),dn()}function wr(d,g){return[[d[0],d[1]],[d[0],g[1]],[g[0],g[1]],[g[0],d[1]]]}function xr(d){if(!ze)return;const g=[d.latlng.lat,d.latlng.lng];if(!ot)ot=g,fa=q.circleMarker(d.latlng,{radius:4,color:"#22c55e",fillColor:"#fff",fillOpacity:1,weight:2}).addTo(C),dn();else{const k=wr(ot,g);Te(!1),vr(k)}}function Eo(d){if(!ze||!ot)return;const g=wr(ot,[d.latlng.lat,d.latlng.lng]);ht?ht.setLatLngs(g):ht=q.polygon(g,{color:"#22c55e",weight:2,dashArray:"5 5",fillColor:"#22c55e",fillOpacity:.12,interactive:!1}).addTo(C)}let de=null,ln=null,cn=null,Tt=null,Nt=null;function Lo(){de||!C||(de=document.createElement("div"),de.className="acker-ov",de.innerHTML=`
      <div class="acker-ov-instr" data-ov="instr"></div>
      <div class="acker-ov-stat" data-ov="stat"></div>
      <div class="acker-ov-btns">
        <button class="btn btn-sm btn-psm-primary" data-ov="finish">✓ Fertig</button>
        <button class="btn btn-sm btn-psm-secondary-outline" data-ov="undo">↶ Zurück</button>
        <button class="btn btn-sm btn-psm-secondary-outline" data-ov="cancel">✕ Abbrechen</button>
      </div>`,C.getContainer().appendChild(de),q.DomEvent.disableClickPropagation(de),q.DomEvent.disableScrollPropagation(de),ln=de.querySelector('[data-ov="instr"]'),cn=de.querySelector('[data-ov="stat"]'),Tt=de.querySelector('[data-ov="finish"]'),Nt=de.querySelector('[data-ov="undo"]'),Tt.addEventListener("click",()=>bt()),Nt.addEventListener("click",()=>pa()),de.querySelector('[data-ov="cancel"]').addEventListener("click",()=>{Be(!1),Te(!1)}))}function dn(){if(Lo(),!de)return;const d=Ve||ze;if(de.style.display=d?"block":"none",!d)return;if(ze){ln.innerHTML=ot?"Jetzt die <b>gegenüberliegende Ecke</b> antippen.":"Tippe die <b>erste Ecke</b> des Rechtecks.",cn.textContent="Rechteck-Modus",Tt.style.display="none",Nt.style.display="none";return}Tt.style.display="",Nt.style.display="";const{areaM2:g,n:k}=hr();let L;k===0?L="Tippe auf die Karte, um die <b>1. Ecke</b> zu setzen.":k<3?L=`Weiter tippen – noch mindestens <b>${3-k}</b> Ecke${3-k===1?"":"n"}.`:L='Bereit! <b>Doppelklick</b> oder „Fertig" schließt die Fläche ab.',ln.innerHTML=L;const E=[`${k} Punkt${k===1?"":"e"} gesetzt`];g&&E.push(`${ee(g)} m²`),cn.textContent=E.join(" · "),Tt.disabled=k<3,Nt.disabled=k<1}let X=null;function Do(){X||!C||(X=document.createElement("div"),X.className="acker-ctx",X.style.display="none",C.getContainer().appendChild(X),q.DomEvent.disableClickPropagation(X),q.DomEvent.disableScrollPropagation(X))}function vt(){X&&(X.style.display="none")}function ma(d,g){if(Do(),!X)return;X.innerHTML="",g.forEach(Z=>{if(Z==="sep"){const Ee=document.createElement("div");Ee.className="acker-ctx-sep",X.appendChild(Ee);return}const V=document.createElement("button");V.className="acker-ctx-item"+(Z.danger?" danger":""),V.innerHTML=(Z.icon?`<i class="bi ${Z.icon} me-2"></i>`:"")+`<span>${Z.label}</span>`,V.addEventListener("click",()=>{vt(),Z.act()}),X.appendChild(V)}),X.style.display="block";const k=C.getContainer(),L=X.offsetWidth,E=X.offsetHeight;let H=d.x+2,_=d.y+2;H+L>k.clientWidth&&(H=k.clientWidth-L-6),_+E>k.clientHeight&&(_=k.clientHeight-E-6),X.style.left=Math.max(6,H)+"px",X.style.top=Math.max(6,_)+"px"}function kr(d){ae.push([d.lat,d.lng]),zt.push(q.circleMarker(d,{radius:4,color:"#22c55e",fillColor:"#fff",fillOpacity:1,weight:2}).addTo(C)),sn(),ua()}function Po(d){if(d.originalEvent&&q.DomEvent.preventDefault(d.originalEvent),Ve){ma(d.containerPoint,[{label:"Punkt hier hinzufügen",icon:"bi-plus-circle",act:()=>kr(d.latlng)},{label:"Fläche abschließen",icon:"bi-check-circle",act:()=>bt()},{label:"Letzten Punkt entfernen",icon:"bi-arrow-counterclockwise",act:()=>pa()},"sep",{label:"Zeichnen abbrechen",icon:"bi-x-circle",danger:!0,act:()=>Be(!1)}]);return}if(ze){ma(d.containerPoint,[{label:"Rechteck abbrechen",icon:"bi-x-circle",danger:!0,act:()=>Te(!1)}]);return}ma(d.containerPoint,[{label:"Fläche hier zeichnen",icon:"bi-pentagon",act:()=>{Te(!1),Be(!0),kr(d.latlng)}},{label:"Rechteck hier beginnen",icon:"bi-bounding-box",act:()=>{Be(!1),Te(!0),xr(d)}}])}function Ao(d,g){q.DomEvent.stop(g),g.originalEvent&&q.DomEvent.preventDefault(g.originalEvent),!(Ve||ze)&&(it(d._key),ma(g.containerPoint,[{label:`„${d.name||"Fläche"}" bearbeiten`,icon:"bi-pencil",act:()=>it(d._key)},{label:"Als PDF exportieren",icon:"bi-file-earmark-pdf",act:()=>void c(d)},"sep",{label:"Fläche löschen",icon:"bi-trash",danger:!0,act:()=>void Bt(d._key)}]))}async function Sr(){const d=f('[data-role="acker-q"]').value.trim();if(d)try{const k=await(await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+encodeURIComponent(d))).json();k[0]?C.setView([+k[0].lat,+k[0].lon],18):N.info("Nichts gefunden.")}catch{N.warning("Suche nicht verfügbar.")}}async function $o(){if(Pn){setTimeout(()=>C&&C.invalidateSize(),60);return}Pn=!0;try{await Ae(()=>Promise.resolve({}),__vite__mapDeps([3]));const k=await Ae(()=>import("./leaflet-src.BcflbDBd.js").then(L=>L.l),__vite__mapDeps([4,5]));q=k.default||k,ue=await Ae(()=>import("./index.CPadEFgJ.js"),__vite__mapDeps([6,5]))}catch(k){console.warn("[Acker] Karten-Bibliotheken konnten nicht geladen werden:",k),b&&(b.textContent="Karte konnte nicht geladen werden (offline?)."),Pn=!1;return}C=q.map(P,{doubleClickZoom:!1}).setView([47.818,8.976],17);const d=q.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:21,maxNativeZoom:19,attribution:"Tiles © Esri"}).addTo(C),g=q.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"});i=q.layerGroup(),m(),i.addTo(C),q.control.layers({Satellit:d,"Karte (OSM)":g},{"Freiland-Standorte":i},{position:"topright"}).addTo(C),C.on("click",So),C.on("click",xr),C.on("click",vt),C.on("mousemove",Eo),C.on("contextmenu",Po),C.on("movestart zoomstart",vt),C.getContainer().addEventListener("contextmenu",k=>k.preventDefault()),C.on("dblclick",()=>{Ve&&bt()}),f('[data-role="acker-draw"]').addEventListener("click",()=>{Te(!1),Be(!0)}),f('[data-role="acker-rect"]')?.addEventListener("click",()=>{Be(!1),Te(!0)}),f('[data-role="acker-rectcancel"]')?.addEventListener("click",()=>Te(!1)),f('[data-role="acker-export"]')?.addEventListener("click",o),f('[data-role="acker-export-pdf"]')?.addEventListener("click",()=>void p()),f('[data-role="acker-finish"]').addEventListener("click",bt),f('[data-role="acker-undo"]')?.addEventListener("click",pa),f('[data-role="acker-cancel"]').addEventListener("click",()=>Be(!1)),f('[data-role="acker-go"]').addEventListener("click",Sr),f('[data-role="acker-q"]').addEventListener("keydown",k=>{k.key==="Enter"&&Sr()}),document.addEventListener("keydown",k=>{if(k.key==="Escape"&&vt(),ze&&k.key==="Escape"){Te(!1);return}Ve&&(k.key==="Backspace"&&(k.preventDefault(),pa()),k.key==="Enter"&&bt(),k.key==="Escape"&&Be(!1))}),await Co(),await Mo(),setTimeout(()=>C.invalidateSize(),60)}async function Co(){if(G()==="sqlite")try{Pa=(await qi())?.rows||[]}catch{Pa=[]}}async function Mo(){if(G()==="sqlite")try{((await Yn())?.rows||[]).forEach(k=>{const L={_key:"db-"+k.id,id:k.id,name:k.name,kultur:k.kultur,eppoCode:k.eppoCode,standortId:k.standortId,color:k.color||lt[a.length%lt.length],latlngs:k.latlngs||[],params:{bedW:k.bedW??1.2,pathW:k.pathW??.4,rowSp:k.rowSp??.5,inRowSp:k.inRowSp??.4,angle:k.angle??0},outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};L.result=B(L.latlngs,L.params),a.push(L),Q(L)}),Ie();const g=a.find(k=>k.latlngs?.length);if(g&&C)try{C.fitBounds(q.polygon(g.latlngs).getBounds(),{maxZoom:19,padding:[30,30]})}catch{}}catch(d){console.warn("[Acker] Flächen laden fehlgeschlagen:",d)}}t.state.subscribe(d=>{d?.app?.activeSection==="acker"&&$o()}),Ie()}function ld(){return`
  <style>
    .acker-wrap{display:flex;gap:0;height:calc(100vh - 80px);min-height:460px;border:1px solid var(--border-1);border-radius:12px;overflow:hidden;background:var(--surface-1,#0f172a)}
    .acker-side{width:340px;min-width:300px;display:flex;flex-direction:column;border-right:1px solid var(--border-1);overflow:hidden}
    .acker-scroll{overflow-y:auto;padding:12px 14px;flex:1}
    .acker-map{flex:1;min-height:300px;position:relative}
    .acker-search{display:flex;gap:6px;margin-bottom:10px}
    .acker-search input{flex:1}
    .acker-tools{display:flex;gap:8px;margin-bottom:4px}
    .acker-tools .btn{flex:1;display:inline-flex;align-items:center;justify-content:center}
    .acker-hint{font-size:11.5px;color:var(--text-dim,#94a3b8);margin:2px 0 8px;line-height:1.4}
    .acker-banner{display:none;background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.4);color:var(--text);padding:10px 12px;border-radius:8px;font-size:12.5px;margin:8px 0 10px;line-height:1.45}
    .acker-banner .row{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
    .acker-drawstat{margin-top:8px;font-weight:700;color:#16a34a;font-size:13px}
    .acker-export-cap{font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--text-muted,#94a3b8);margin-bottom:6px}
    .acker-edithint{font-size:11px;color:var(--text-muted,#94a3b8);margin-top:10px;line-height:1.4}
    .acker-mhandle{background:#fff;border:2px dashed #15803d;border-radius:50%;width:16px!important;height:16px!important;margin-left:-8px!important;margin-top:-8px!important;color:#15803d;font-weight:700;font-size:12px;line-height:12px;text-align:center;cursor:copy;display:flex;align-items:center;justify-content:center;opacity:.85}
    .acker-mhandle:hover{opacity:1;background:#dcfce7}
    .acker-totals{background:var(--surface-2,rgba(255,255,255,.04));border:1px solid var(--border-1);border-radius:10px;padding:12px;margin-bottom:12px}
    .acker-totals .t-row{display:flex;justify-content:space-between;font-size:13px;padding:3px 0}
    .acker-totals .big{font-size:20px;font-weight:700;color:#22c55e}
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
    .acker-actions{display:flex;flex-wrap:wrap;align-items:center;margin-top:10px;gap:8px}
    .acker-actions [data-act="pdf"]{flex:1 1 100%}
    .acker-vhandle{background:#fff;border:2px solid #15803d;border-radius:50%;width:12px!important;height:12px!important;margin-left:-6px!important;margin-top:-6px!important;cursor:grab}
    .acker-standort-dot{display:block;width:14px;height:14px;border-radius:50%;background:#f59e0b;border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.35)}
    .acker-standort-label{background:rgba(255,255,255,.92);color:#1f2937;border:1px solid #d97706;border-radius:6px;padding:1px 6px;font-size:11px;font-weight:600;box-shadow:0 1px 3px rgba(0,0,0,.25)}
    .acker-standort-label::before{display:none}
    /* On-Map-Overlay (Hinweis + Aktionen direkt auf der Karte) */
    .acker-ov{position:absolute;top:12px;left:50%;transform:translateX(-50%);z-index:1000;
      background:rgba(15,23,42,.92);color:#fff;border:1px solid rgba(34,197,94,.55);
      border-radius:12px;padding:10px 14px;box-shadow:0 6px 24px rgba(0,0,0,.4);
      max-width:min(92%,460px);text-align:center;backdrop-filter:blur(4px)}
    .acker-ov-instr{font-size:13.5px;line-height:1.4}
    .acker-ov-instr b{color:#4ade80}
    .acker-ov-stat{font-size:11.5px;color:#cbd5e1;margin-top:3px}
    .acker-ov-btns{display:flex;gap:7px;justify-content:center;margin-top:9px;flex-wrap:wrap}
    .acker-ov-btns .btn:disabled{opacity:.45}
    /* Rechtsklick-Kontextmenü */
    .acker-ctx{position:absolute;z-index:1100;min-width:208px;background:#0f172a;
      border:1px solid var(--border-1,#334155);border-radius:10px;padding:5px;
      box-shadow:0 10px 30px rgba(0,0,0,.5)}
    .acker-ctx-item{display:flex;align-items:center;width:100%;border:0;background:transparent;
      color:#e2e8f0;font-size:13px;text-align:left;padding:8px 10px;border-radius:7px;cursor:pointer}
    .acker-ctx-item:hover{background:rgba(34,197,94,.18)}
    .acker-ctx-item.danger{color:#f87171}
    .acker-ctx-item.danger:hover{background:rgba(248,113,113,.16)}
    .acker-ctx-sep{height:1px;background:var(--border-1,#334155);margin:4px 6px}
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
          <div class="acker-tools">
            <button class="btn btn-psm-primary" data-role="acker-draw"><i class="bi bi-pentagon me-1"></i>Fläche zeichnen</button>
            <button class="btn btn-psm-secondary-outline" data-role="acker-rect"><i class="bi bi-bounding-box me-1"></i>Rechteck</button>
          </div>
          <div class="acker-hint">💡 <b>Rechtsklick</b> auf die Karte öffnet ein Menü. Beim Zeichnen führt dich der grüne Hinweis oben auf der Karte.</div>
          <div class="acker-banner" data-role="acker-rectbanner">
            <div><b>Rechteck aufziehen:</b> erste Ecke klicken/tippen, dann die gegenüberliegende Ecke.</div>
            <div class="row">
              <button class="btn btn-sm btn-psm-secondary-outline" data-role="acker-rectcancel">Abbrechen</button>
            </div>
          </div>
          <div class="acker-banner" data-role="acker-banner">
            <div><b>Fläche zeichnen:</b> auf die Karte tippen/klicken setzt die Eckpunkte. Abschließen: <b>Doppelklick</b>, Klick auf den <b>ersten Punkt</b> oder „Fertig".</div>
            <div class="acker-drawstat" data-role="acker-drawstat">Noch keine Punkte – auf die Karte tippen.</div>
            <div class="row">
              <button class="btn btn-sm btn-psm-primary" data-role="acker-finish">✓ Fertig</button>
              <button class="btn btn-sm btn-psm-secondary-outline" data-role="acker-undo">↶ Punkt zurück</button>
              <button class="btn btn-sm btn-psm-secondary-outline" data-role="acker-cancel">Abbrechen</button>
            </div>
          </div>
          <div class="acker-totals" data-role="acker-totals" style="display:none;margin-top:12px">
            <div class="t-row"><span>Gesamtfläche</span><b data-t="area">–</b></div>
            <div class="t-row"><span>Beete gesamt</span><b data-t="beds">–</b></div>
            <div class="t-row"><span>Beetmeter gesamt</span><b data-t="meters">–</b></div>
            <div class="t-row" style="margin-top:4px"><span>Pflanzen gesamt</span><b class="big" data-t="plants">–</b></div>
          </div>
          <div class="acker-export-box" style="margin:12px 0">
            <div class="acker-export-cap">Export</div>
            <button class="btn btn-sm btn-psm-primary" data-role="acker-export-pdf" style="width:100%">
              <i class="bi bi-file-earmark-pdf me-1"></i>Auswertung als PDF (alle Flächen)
            </button>
            <button class="btn btn-sm btn-psm-secondary-outline" data-role="acker-export" style="width:100%;margin-top:6px">
              <i class="bi bi-geo me-1"></i>Als GeoJSON exportieren
            </button>
            <div style="font-size:11px;color:var(--text-dim);margin-top:5px;line-height:1.35">PDF: Kennzahlen + maßstäbliche Skizze je Fläche. GeoJSON (WGS84): QGIS / FMIS / Traktor-Terminals.</div>
          </div>
          <div data-role="acker-list"></div>
          <div class="acker-empty" data-role="acker-empty">Noch keine Fläche.<br>Zum Acker navigieren, dann <b>Neue Fläche zeichnen</b>.</div>
        </div>
      </aside>
      <div class="acker-map" data-role="acker-map"></div>
    </div>
  </section>`}const cd=["pflanzenschutz.json","history.json","entries.json"];let xi=!1,M=null,je=!1;const ft=25,An=new Intl.NumberFormat("de-DE");let te=0,Aa=null,ki=null;const dd=Qi({id:"import",label:"Import-Vorschau",budget:{initialLoad:20,maxItems:50}});let Qn=null;function ud(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function pd(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function fd(e,t){const a=e.querySelector('[data-role="import-log-list"]');if(a){if(!t.length){a.innerHTML='<tr><td colspan="5" class="text-muted small">Noch keine Importe protokolliert.</td></tr>';return}a.innerHTML=t.map(n=>{const r=n.rangeStart||n.rangeEnd?`${Xt(n.rangeStart)||n.rangeStart||"?"} – ${Xt(n.rangeEnd)||n.rangeEnd||"?"}`:"-",i=[n.source,n.device].filter(Boolean),o=i.length?y(i.join(" · ")):"-";return`
        <tr>
          <td>${y(pd(n.importedAt))}</td>
          <td>${o}</td>
          <td class="text-end text-success">${n.added}</td>
          <td class="text-end text-muted">${n.skipped}</td>
          <td class="small text-muted">${y(r)}</td>
        </tr>`}).join("")}}async function Na(e){if(G()==="sqlite")try{const t=await hs(50);fd(e,t.items||[])}catch(t){console.warn("Import-Historie konnte nicht geladen werden",t)}}function Ge(e,t,a="info"){const n=e.querySelector('[data-role="import-hint"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a} small mt-3`,n.textContent=t}}function dt(e,t){const a=e.querySelector('[data-role="import-feedback"]');a&&(a.textContent=t)}function tt(e){const t=e.querySelector('[data-action="clear-import"]'),a=e.querySelector('[data-action="focus-import"]'),n=e.querySelector('[data-action="run-import"]'),r=!!M;if(t&&(t.disabled=!r||je),a&&(a.disabled=!r||je),n){const i=!!(M?.importableEntries?.length&&M.stats||M?.fotos?.length);n.disabled=!r||!i||je}}function md(e){M=null,Sd(e);const t=e.querySelector('[data-role="import-summary-card"]'),a=e.querySelector('[data-role="import-file"]');t&&t.classList.add("d-none"),a&&(a.value=""),dt(e,""),Ge(e,"Bereit für eine neue Importdatei."),tt(e),St()}function ho(e){if(e.dateIso)return e.dateIso;if(e.datum){const t=new Date(e.datum);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.date){const t=new Date(e.date);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.savedAt){const t=new Date(e.savedAt);if(!Number.isNaN(t.getTime()))return t.toISOString()}return null}function Ja(e){return e?Xt(e)||e.slice(0,10):"-"}function vo(e){return e.savedAt||(e.savedAt=e.createdAt||e.dateIso||new Date().toISOString()),e}function Si(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function gd(e){if(!e||typeof e!="object")return null;const t={...e};if(!Array.isArray(t.items)){const a=e.items;t.items=Array.isArray(a)?[...a]:[]}return vo(t),t}function yo(e,t){const a=e.map(n=>ho(n)).filter(n=>!!n).sort();return{startIso:a[0]||t?.filters?.startDate||null,endIso:a[a.length-1]||t?.filters?.endDate||null}}function bd(e){if(!e)return;const t=Si(e.startIso,"start"),a=Si(e.endIso,"end");if(!t&&!a)return;const n={};return t&&(n.startDate=t),a&&(n.endDate=a),n}async function wo(e,t){if(G()!=="sqlite"){const s=he(e.history);return new Set(s.map(l=>Ya(l)).filter(l=>!!l))}const n=bd(t);if(!n)return new Set;const r=new Set;let i=1;const o=500;try{for(;;){const s=await Hi({page:i,pageSize:o,filters:n,sortDirection:"asc"});if(s.items.forEach(l=>{const u=Ya(l);u&&r.add(u)}),i*o>=s.totalCount)break;i+=1}}catch(s){return console.warn("Konnte vorhandene Einträge für Duplikatprüfung nicht laden",s),new Set}return r}function Ya(e){const t=typeof e.clientUuid=="string"&&e.clientUuid?e.clientUuid:"";if(t)return`uuid:${t}`;const a=e.savedAt||e.dateIso||e.createdAt||e.datum||"",n=e.ersteller||"",r=e.kultur||"",i=e.invekos||e.standort||"";return[a,n,r,i].join("|")}function hd(e,t,a,n){const r=n||yo(e,a),i=r.startIso,o=r.endIso,s=new Set,l=new Set;return t.forEach(u=>{u.ersteller&&s.add(u.ersteller),u.kultur&&l.add(u.kultur)}),{startDateLabel:Ja(i),endDateLabel:Ja(o),startDateRaw:i,endDateRaw:o,entryCount:e.length,importableCount:t.length,duplicateCount:e.length-t.length,creators:Array.from(s).slice(0,5),crops:Array.from(l).slice(0,5)}}function vd(e,t){const a=e.querySelector('[data-role="import-stats"]');if(!a)return;if(!t){a.innerHTML="";return}const n=t.stats,r=t.metadata?.filters;a.innerHTML=`
    <div class="col-12 col-md-4">
      <div class="border rounded p-3 h-100">
        <div class="text-muted small">Zeitraum</div>
        <div class="fw-bold">${y(n.startDateLabel)} – ${y(n.endDateLabel)}</div>
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
        <div class="fw-bold">${y(r?.label||r?.scope||"—")}</div>
        <div class="text-muted small">${y(r?[r.creator,r.crop].filter(Boolean).join(" · ")||"Keine zusätzlichen Filter":"Keine Angaben")}</div>
      </div>
    </div>
  `}function yd(e,t){const a=e.querySelector('[data-role="import-warnings"]');if(!a)return;if(!t||!t.warnings.length){a.innerHTML="";return}const n=t.warnings.map(r=>`<li>${y(r)}</li>`).join("");a.innerHTML=`
    <div class="alert alert-warning">
      <strong>Hinweise:</strong>
      <ul class="mb-0">${n}</ul>
    </div>
  `}function xo(e){const t=e.entries.length;if(!t)return te=0,{start:0,end:0,total:0};const a=Math.max(Math.ceil(t/ft),1);te>=a&&(te=a-1),te<0&&(te=0);const n=te*ft,r=Math.min(n+ft,t);return{start:n,end:r,total:t}}function wd(e){const t=e.querySelector('[data-role="import-pager"]');return t?((!Aa||ki!==t)&&(Aa?.destroy(),Aa=la(t,{onPrev:()=>xd(e),onNext:()=>kd(e),labels:{prev:"Zurück",next:"Weiter",loading:"Vorschau wird geladen...",empty:"Keine Einträge verfügbar"}}),ki=t),Aa):null}function Yt(e,t){const a=wd(e);if(!a)return;if(!t){te=0,a.update({status:"hidden"});return}const n=t.entries.length;if(!n){te=0,a.update({status:"disabled",info:"Keine Einträge vorhanden."});return}const{start:r,end:i}=xo(t),o=`Einträge ${An.format(r+1)}–${An.format(i)} von ${An.format(n)}`;a.update({status:"ready",info:o,canPrev:te>0,canNext:i<n})}function xd(e){!M||te===0||(te=Math.max(te-1,0),br(e,M))}function kd(e){if(!M)return;const t=M.entries.length;if(!t)return;const a=Math.max(Math.ceil(t/ft)-1,0);te>=a||(te=Math.min(te+1,a),br(e,M))}function Sd(e){te=0,e&&Yt(e,M)}function br(e,t){const a=e.querySelector('[data-role="import-preview-table"]');if(!a){St();return}if(!t){a.innerHTML="",Yt(e,null),St();return}if(!t.entries.length){a.innerHTML='<tr><td colspan="5" class="text-center text-muted">Keine Einträge</td></tr>',Yt(e,t),St();return}const{start:r,end:i}=xo(t),s=t.entries.slice(r,i).map(l=>{const u=Ja(ho(l));return`
        <tr>
          <td>${y(u)}</td>
          <td>${y(l.kultur||"-")}</td>
          <td>${y(l.ersteller||"-")}</td>
          <td>${y(l.standort||l.invekos||"-")}</td>
          <td>${y(l.savedAt?Ja(l.savedAt):"-")}</td>
        </tr>
      `}).join("");a.innerHTML=s,Yt(e,t),St()}async function Ed(e){const t=ws(e),a=Object.keys(t),n=a.find(u=>cd.some(c=>u.toLowerCase().endsWith(c)));if(!n)throw new Error("ZIP enthält keine 'pflanzenschutz.json'.");const r=JSON.parse($n(t[n])),i=a.find(u=>u.toLowerCase().endsWith("metadata.json")),o=i?JSON.parse($n(t[i])):null,s=Array.isArray(r)?r:Array.isArray(r.entries)?r.entries:Array.isArray(r.history)?r.history:[],l=Array.isArray(r?.fotos)?r.fotos:[];for(const u of l){if(u?.data)continue;const c=u?.file?String(u.file):null,p=c?a.find(m=>m===c||m.toLowerCase().endsWith(c.toLowerCase())):null;p&&t[p]&&(u.data=Ld(t[p]),u.mime||(u.mime="image/jpeg"))}return{entries:s,metadata:o,fotos:l}}function Ld(e){let t="";for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode(...e.subarray(n,n+32768));return btoa(t)}async function Dd(e){const t=$n(e),a=JSON.parse(t);if(Array.isArray(a))return{entries:a,metadata:null,fotos:[]};const n=Array.isArray(a.fotos)?a.fotos:[];if(Array.isArray(a.entries))return{entries:a.entries,metadata:a.metadata||null,fotos:n};if(Array.isArray(a.history))return{entries:a.history,metadata:a.metadata||null,fotos:n};if(n.length)return{entries:[],metadata:a.metadata||null,fotos:n};throw new Error("JSON enthält keine Eintragsliste.")}async function Pd(e,t){const a=new Uint8Array(await e.arrayBuffer()),n=/\.zip$/i.test(e.name)||e.type==="application/zip",{entries:r,metadata:i,fotos:o}=n?await Ed(a):await Dd(a),s=Array.isArray(o)?o:[],l=(Array.isArray(r)?r:[]).map(h=>gd(h)).filter(h=>!!h);if(!l.length&&!s.length)throw new Error("Die Datei enthielt keine verwertbaren Einträge.");const u=yo(l,i),c=await wo(t,u),p=new Set,m=[];let f=0;l.forEach(h=>{const P=Ya(h);if(!P){m.push(h);return}if(c.has(P)||p.has(P)){f+=1;return}p.add(P),m.push(h)});const w=hd(l,m,i,u),b=[];return f&&b.push(`${f} Datensätze wurden wegen gleicher Kennung übersprungen.`),(!w.startDateRaw||!w.endDateRaw)&&b.push("Zeitraum konnte nicht eindeutig ermittelt werden."),{filename:e.name,entries:l,importableEntries:m,metadata:i,stats:w,warnings:b,lastImportRefs:[],fotos:s}}function Ei(){if(!M)return"Keine Datei";const e=[];return je&&e.push("Verarbeitung"),M.warnings.length&&e.push("Warnungen"),M.stats.importableCount<M.stats.entryCount&&e.push("Duplikate entfernt"),e.length?e.join(" · "):void 0}function Ad(){const e=!!M,t=e?Math.max(Math.ceil((M?.entries.length||0)/ft),1):null,a=e?{items:M?.entries.length??0,totalCount:M?.stats.entryCount??null,cursor:M&&(M.entries.length||0)>ft?`Seite ${te+1}${t?` / ${t}`:""}`:null,payloadKb:Yi(M?.entries.slice(0,ft)),lastUpdated:Qn,note:Ei()}:{items:0,totalCount:0,cursor:null,payloadKb:0,lastUpdated:Qn,note:Ei()};Ji(dd,a)}function St(){Qn=new Date().toISOString(),Ad()}function Jn(e){const t=e.querySelector('[data-role="import-summary-card"]');if(!t)return;if(!M){t.classList.add("d-none"),Yt(e,null),tt(e),St();return}t.classList.remove("d-none"),te=0;const a=t.querySelector('[data-role="import-file-name"]'),n=t.querySelector('[data-role="import-summary-subline"]');a&&(a.textContent=M.filename),n&&(n.textContent=`${M.stats.importableCount} von ${M.stats.entryCount} Einträgen importierbar`),vd(e,M),yd(e,M),br(e,M),tt(e)}async function $d(){const e=G();if(!e||e==="memory"||e==="sqlite")return;const t=we();await xe(t)}function Li(e,t){if(!t.length)return[];const a=typeof e.state.updateSlice=="function"?e.state.updateSlice:Ue,n=[];return a("history",r=>{const i=oa(r),o=i.items.slice(),s=o.length;return t.forEach((l,u)=>{n.push(s+u),o.push(l)}),{...i,items:o,totalCount:o.length,lastUpdatedAt:new Date().toISOString()}}),n}async function Cd(e,t){if(!M){window.alert("Bitte zuerst eine Importdatei laden.");return}const a=M.fotos||[];if(!M.importableEntries.length&&!a.length){window.alert("Alle Einträge wurden bereits importiert oder als Duplikat erkannt.");return}je=!0,tt(e),dt(e,"Import läuft ...");const n=t.state.getState(),r={startIso:M.stats.startDateRaw,endIso:M.stats.endDateRaw};let i=new Set;try{i=await wo(n,r)}catch(b){console.warn("Duplikatprüfung vor Import fehlgeschlagen",b)}const o=new Set(i),s=[];let l=0;if(M.importableEntries.forEach(b=>{const h=Ya(b);if(h&&o.has(h)){l+=1;return}h&&o.add(h),s.push(b)}),!s.length&&!a.length){dt(e,"Keine neuen Einträge gefunden."),Ge(e,"Alle Datensätze sind bereits importiert worden.","warning"),je=!1,tt(e);return}const u=G(),c=[],p=[];let m=0,f=0;const w=s.map(b=>vo({...b}));try{if(u==="sqlite"){const A=[];for(const T of w)try{const B=await Ai(T);if(B?.duplicate){l+=1;continue}B?.id!=null&&(c.push({source:"sqlite",ref:B.id}),A.push(T))}catch(B){console.error("appendHistoryEntry failed",B),p.push(T.savedAt||"Unbekannter Eintrag")}Li(t,A);for(const T of a)try{(await vs(T))?.duplicate?f+=1:m+=1}catch(B){console.error("appendFoto failed",B)}m&&window.dispatchEvent(new CustomEvent("fotos:changed"));try{await $e()}catch(T){console.warn("SQLite-Datei konnte nach dem Import nicht gespeichert werden",T)}}else Li(t,w).forEach(T=>{c.push({source:"state",ref:T})}),await $d();const b=c.length;if(b||m){u==="sqlite"&&b&&t.events?.emit?.("history:data-changed",{type:"created-bulk",count:b});const A=[];b&&A.push(`${b} Einträge`),m&&A.push(`${m} Foto(s)`),dt(e,`${A.join(" und ")} importiert.${p.length?` ${p.length} Einträge konnten nicht übernommen werden.`:""}`.trim()),M.lastImportRefs=c,M.importableEntries=[],M.stats={...M.stats,importableCount:0},Jn(e)}else dt(e,"Keine neuen Daten importiert.");const h=[];let P="success";if(p.length&&(h.push(`${p.length} Einträge konnten nicht gespeichert werden. Details siehe Konsole.`),P="warning"),l&&(h.push(`${l} Einträge wurden während des Imports als Duplikat übersprungen.`),P="warning"),f&&h.push(`${f} Foto(s) waren bereits vorhanden (übersprungen).`),h.length||h.push("Import abgeschlossen."),Ge(e,h.join(" "),P),u==="sqlite"&&(b||l||m||f))try{const A=[];p.length&&A.push(`${p.length} fehlgeschlagen`),m&&A.push(`${m} Fotos`),f&&A.push(`${f} Fotos doppelt`),await ys({source:M.filename||null,device:M.metadata?.device||M.metadata?.label||null,added:b,skipped:l,rangeStart:M.stats.startDateRaw,rangeEnd:M.stats.endDateRaw,note:A.length?A.join(", "):null}),await $e().catch(()=>{}),await Na(e)}catch(A){console.warn("Import-Historie konnte nicht geschrieben werden",A)}}catch(b){console.error("Import fehlgeschlagen",b),dt(e,"Import fehlgeschlagen. Siehe Konsole für Details."),Ge(e,"Import fehlgeschlagen. Bitte erneut versuchen.","danger")}finally{je=!1,tt(e)}}function Md(e,t,a){if(!e.events?.emit)return;const n=t.metadata?.label||t.metadata?.filters?.label||`Import ${t.filename}`;e.events.emit("documentation:focus-range",{startDate:t.stats.startDateRaw||void 0,endDate:t.stats.endDateRaw||void 0,label:n,reason:"import",entryIds:a,autoSelectFirst:!!a.length})}function Id(e,t){if(!M){window.alert("Bitte zuerst eine Importdatei laden.");return}if(!M.stats.startDateRaw||!M.stats.endDateRaw){window.alert("Zeitraum konnte nicht bestimmt werden.");return}Md(t,M,M.lastImportRefs),Ge(e,"Dokumentation wurde auf den Importzeitraum fokussiert.")}function Fd(e,t){const a=e.querySelector('[data-role="import-file"]');a&&a.addEventListener("change",()=>{const n=a.files?.[0];n&&(je=!0,Ge(e,"Datei wird analysiert ..."),tt(e),dt(e,""),Pd(n,t.state.getState()).then(r=>{M=r,Jn(e),Ge(e,`${r.importableEntries.length} Einträge bereit zum Import.`)}).catch(r=>{console.error("Importdatei konnte nicht gelesen werden",r),Ge(e,r?.message||"Importdatei konnte nicht gelesen werden.","danger"),M=null,Jn(e)}).finally(()=>{je=!1,tt(e)}))}),e.addEventListener("click",n=>{const r=n.target?.closest("[data-action]");if(!r)return;const i=r.dataset.action;if(i){if(i==="clear-import"){md(e);return}if(i==="focus-import"){Id(e,t);return}i==="run-import"&&Cd(e,t)}})}function Bd(e,t){if(!e||xi)return;const a=e;a.innerHTML="";const n=ud();a.appendChild(n),Fd(n,t),Ge(n,"Wähle eine Datei aus, um den Import zu starten."),Na(n),Pe("database:connected",()=>void Na(n)),Pe("app:sectionChanged",r=>{(r==="daten"||r==="documentation"||r==="import")&&Na(n)}),xi=!0}const ct=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function zd(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function wt(e,t,a,n){return`
    <div class="dash-card"${n?` data-goto="${n}" style="cursor:pointer;"`:""}>
      <i class="bi ${e} dash-card-icon"></i>
      <div class="dash-card-value">${a}</div>
      <div class="dash-card-label">${y(t)}</div>
    </div>`}function Td(){return`
  <style>
    .dash-wrap{display:flex;flex-direction:column;gap:18px}
    .dash-greet h2{margin:0;font-weight:650}
    .dash-greet p{margin:2px 0 0;color:var(--color-text-muted,#94a3b8);font-size:.95rem}
    .dash-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}
    .dash-card{background:var(--color-surface-1,rgba(255,255,255,.04));border:1px solid var(--border-1,rgba(255,255,255,.1));border-radius:12px;padding:14px 16px;display:flex;flex-direction:column;gap:2px;transition:border-color .15s}
    .dash-card[data-goto]:hover{border-color:var(--color-primary,#22c55e)}
    .dash-card-icon{font-size:1.2rem;color:var(--color-primary,#22c55e)}
    .dash-card-value{font-size:1.6rem;font-weight:700;font-variant-numeric:tabular-nums;line-height:1.1}
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

      <div class="dash-cards" data-role="dash-cards"></div>

      <div class="dash-actions">
        <button class="btn btn-psm-primary" data-goto="calc"><i class="bi bi-pencil-square me-1"></i>Neu erfassen</button>
        <button class="btn btn-psm-secondary-outline" data-goto="lager"><i class="bi bi-box-seam me-1"></i>PSM-Lager</button>
        <button class="btn btn-psm-secondary-outline" data-goto="acker"><i class="bi bi-map me-1"></i>Acker-Planer</button>
        <button class="btn btn-psm-secondary-outline" data-goto="documentation"><i class="bi bi-list-ul me-1"></i>Übersicht</button>
      </div>

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
  </section>`}function Nd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Td();const a=e.querySelector('[data-role="dash-cards"]'),n=e.querySelector('[data-role="dash-warn"]'),r=e.querySelector('[data-role="dash-recent"]');e.addEventListener("click",o=>{const s=o.target?.closest("[data-goto]");if(!s)return;const l=s.getAttribute("data-goto");l&&t.state.updateSlice("app",u=>({...u,activeSection:l}))});const i=async()=>{if(G()!=="sqlite"){a&&(a.innerHTML='<div class="dash-empty">Bitte zuerst eine Datenbank öffnen.</div>');return}const o=t.state.getState(),s=(he(o.gps?.points)||[]).length;let l=0,u=0,c=0,p=0,m=[],f=[],w=0;try{l=(await qi())?.rows?.length||0}catch{}try{u=(await Ni())?.rows?.length||0}catch{}try{const b=(await Yn())?.rows||[];c=b.length,p=b.reduce((h,P)=>h+(P.plants||0),0)}catch{}try{m=(await Ti())?.rows||[]}catch{}try{const b=await Hi({}),h=b?.entries||b?.rows||[];w=b?.totalCount??h.length,f=h.slice(0,6)}catch{}if(a&&(a.innerHTML=[wt("bi-geo-alt","Standorte",ct(s)),wt("bi-flower1","Kulturen",ct(l)),wt("bi-droplet","Mittel im Sortiment",ct(u),"lager"),wt("bi-journal-check","Anwendungen",ct(w),"documentation"),wt("bi-map","Acker-Flächen",ct(c),"acker"),wt("bi-flower3","Pflanzen (Acker)",ct(p),"acker")].join("")),n){const b=[];m.forEach(h=>{h.bestand<=0&&(h.verbraucht>0||h.zugang>0)&&b.push(`<div class="dash-row"><span><i class="bi bi-box-seam me-1" style="color:#ef4444"></i>${y(h.name)}</span><span style="color:#ef4444">Bestand ${ct(h.bestand)} ${y(h.einheit||"")}</span></div>`)}),m.forEach(h=>{if(!h.zulEnde)return;const P=Math.round((new Date(h.zulEnde).getTime()-Date.now())/864e5);P<0?b.push(`<div class="dash-row"><span><i class="bi bi-calendar-x me-1" style="color:#ef4444"></i>${y(h.name)}</span><span style="color:#ef4444">Zulassung abgelaufen</span></div>`):P<180&&b.push(`<div class="dash-row"><span><i class="bi bi-calendar-event me-1" style="color:#f59e0b"></i>${y(h.name)}</span><span style="color:#f59e0b">Zulassung endet in ${P} T</span></div>`)}),n.innerHTML=b.length?b.slice(0,8).join(""):'<div class="dash-empty">Alles im grünen Bereich. ✓</div>'}r&&(r.innerHTML=f.length?f.map(b=>{const h=zd(b.datum||b.dateIso||b.created_at||b.createdAt||null),P=b.kultur||"",A=b.standort||"";return`<div class="dash-row"><span>${y(A)}${P?" · "+y(P):""}</span><span class="dash-empty" style="padding:0">${y(h)}</span></div>`}).join(""):'<div class="dash-empty">Noch keine Anwendungen erfasst.</div>')};t.state.subscribe(o=>{o?.app?.activeSection==="dashboard"&&i()}),i()}function Di(e){document.querySelectorAll(".content-section").forEach(a=>{a.style.display="none"});const t=document.getElementById(`section-${e}`);t instanceof HTMLElement&&(t.style.display="block")}function Pi(){xs(),Ci();const e={state:{getState:I,updateSlice:Ue,subscribe:Ha},events:{emit:(b,h)=>{Ae(async()=>{const{emit:P}=await import("./index.D36E7-Az.js").then(A=>A.aH);return{emit:P}},[]).then(({emit:P})=>{P(b,h)})},subscribe:Pe}},t=document.querySelector('[data-region="startup"]'),a=document.querySelector('[data-region="shell"]'),n=document.querySelector('[data-region="main"]'),r=document.querySelector('[data-region="footer"]');Ys(t,e);const i=document.querySelector('[data-feature="calculation"]');ks(i,e);const o=document.querySelector('[data-feature="documentation"]');Vl(o,e);const s=document.querySelector('[data-feature="settings"]');Wc(s,e);const l=document.querySelector('[data-feature="lager"]');Uc(l,e);const u=document.querySelector('[data-feature="acker"]');sd(u,e);const c=document.querySelector('[data-feature="fotos"]');Ss(c,e,{archiveMode:!0});const p=document.querySelector('[data-feature="import-page"]');Bd(p,{state:{getState:I,updateSlice:Ue},events:e.events});const m=document.querySelector('[data-feature="dashboard"]');Nd(m,e);const f=b=>{const h=document.body;h&&(h.classList.toggle("bg-app",b),h.classList.toggle("bg-startup",!b))},w=b=>{const h=!!b.app?.hasDatabase;if(f(h),t instanceof HTMLElement&&t.classList.toggle("d-none",h),a instanceof HTMLElement&&a.classList.toggle("d-none",!h),n instanceof HTMLElement&&n.classList.toggle("d-none",!h),r instanceof HTMLElement&&r.classList.toggle("d-none",!h),h){const P=b.app?.activeSection??"dashboard";Di(P)}};w(e.state.getState()),Ha((b,h)=>{b.app?.hasDatabase!==h.app?.hasDatabase&&w(b),b.app?.activeSection!==h.app?.activeSection&&b.app?.hasDatabase&&Di(b.app.activeSection)}),Pe("app:sectionChanged",()=>{})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Pi,{once:!0}):Pi();
