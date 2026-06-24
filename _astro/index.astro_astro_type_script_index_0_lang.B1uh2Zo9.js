const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/index.DoEGfA48.js","_astro/index.CKDSmSjT.js","_astro/leaflet.C03ySvDx.css","_astro/leaflet-src.BcflbDBd.js","_astro/_commonjsHelpers.Cpj98o6Y.js","_astro/index.CPadEFgJ.js"])))=>i.map(i=>d[i]);
import{M as le,N as es,J as We,O as Qs,P as Js,Q as ts,h as bt,l as Ys,a as as,s as tt,n as Xs,q as ns,p as Zr,e as R,r as yn,C as wn,u as je,_ as wt,R as eo,S as to,w as b,t as T,m as Qr,T as ao,j as Ja,k as Jr,U as no,V as ro,W as Te,X as io,Y as rs,Z as is,H as ss,G as xn,$ as so,a0 as oo,a1 as lo,a2 as co,a3 as uo,a4 as Fa,z as za,a5 as po,x as mo,a6 as _e,a7 as Ke,a8 as fo,a9 as Ta,aa as go,ab as bo,D as ho,ac as os,ad as ls,ae as Pa,af as vo,ag as yo,ah as wo,ai as Yr,aj as Gn,ak as Un,al as xo,am as ko,an as So,ao as Eo,ap as Lo,aq as Do,ar as $o,as as cs,at as Ao,au as ds,av as zo,aw as zr,ax as Pr,ay as Po,az as Mo,aA as kn,aB as Xr,aC as ei,aD as Vn,aE as Io,aF as ti,aG as ua,aH as ai,aI as Co,aJ as ni,aK as ri,aL as Bo,aM as No,aN as Fo,aO as To,aP as or,v as us,i as qo,b as Ho,c as Oo}from"./index.CKDSmSjT.js";const lr="__psl_history_seeded",cr=200,ii=["Salat","Apfel","Wein","Tomate","Kartoffel","Hopfen","Raps","Birne"],si=["Spritzung","Düngung","Pflege","Behandlung"],oi=["LACES","MALDO","VITVI","SOLTU","PRNUS","CUPAR","CYNCR","ALLCE"],li=["BBCH 10","BBCH 31","BBCH 41","BBCH 55","BBCH 65","BBCH 71","BBCH 81"],_o=[{mediumId:"seed-water",name:"Wasser",unit:"L",methodId:"perKiste",methodLabel:"pro Kiste",value:.02,zulassungsnummer:"N/A"},{mediumId:"seed-tonikum",name:"Tonikum X",unit:"ml",methodId:"perKiste",methodLabel:"pro Kiste",value:.85,zulassungsnummer:"Z-123456"},{mediumId:"seed-oel",name:"Pflegeöl Y",unit:"ml",methodId:"percentWater",methodLabel:"% vom Wasser",value:.12,zulassungsnummer:"Z-654321"}];function Ko(e){if(typeof window>"u")return;const a=new URLSearchParams(window.location.search).has("seedHistory");if(!a)return;const n=window;n.__PSL||(n.__PSL={});const r=n.__PSL;r.seedHistoryEntries=(l=cr)=>ci(e,{count:l}),r.resetHistorySeedFlag=()=>localStorage.removeItem(lr),!a&&!localStorage.getItem(lr)&&le()==="sqlite"&&ci(e,{count:cr,setFlag:!0}).catch(l=>{console.error("History seeding failed",l)})}async function Ro(e){if(!e.state.getState().app?.hasDatabase){if(typeof e.state.subscribe!="function")throw new Error("SQLite-Datenbank ist noch nicht initialisiert.");await new Promise((t,a)=>{const n=window.setTimeout(()=>{i(),a(new Error("SQLite-Datenbank wurde nicht rechtzeitig initialisiert."))},1e4),r=e.state.subscribe?.(l=>{l.app?.hasDatabase&&(i(),t())}),i=()=>{window.clearTimeout(n),typeof r=="function"&&r()}})}}async function ci(e,t={}){const a=t.count??cr;if(le()!=="sqlite")throw new Error("SQLite-Treiber muss aktiv sein, bevor Daten befüllt werden können.");await Ro(e);const n=performance.now();let r=0;for(let i=0;i<a;i+=1){const l=Wo(i);await es(l),r+=1}try{await We()}catch(i){console.warn("Seed-Daten konnten nicht persistent gespeichert werden",i)}return e.events.emit("history:data-changed",{source:"dev-history-seed"}),t.setFlag&&localStorage.setItem(lr,"1"),{inserted:r,durationMs:performance.now()-n}}function Wo(e){const t=new Date;t.setDate(t.getDate()-e);const a=t.toLocaleDateString("de-DE"),n=t.toISOString(),r=20+e%30,i=Number((r*.5).toFixed(2));return{datum:a,dateIso:n,ersteller:`Seeder ${1+e%5}`,standort:`Test-Ort ${String.fromCharCode(65+e%6)}`,kultur:ii[e%ii.length],usageType:si[e%si.length],kisten:r,eppoCode:oi[e%oi.length],bbch:li[e%li.length],gps:`GPS-Notiz ${e}`,gpsCoordinates:{latitude:48+e%10*.01,longitude:11+e%10*.01},gpsPointId:`seed-gps-${e}`,invekos:`INV-${String(1e3+e).padStart(4,"0")}`,uhrzeit:`${String(6+e%12).padStart(2,"0")}:${String(e*7%60).padStart(2,"0")}`,savedAt:n,items:jo(e,r,i)}}function jo(e,t,a){return _o.map((n,r)=>{const i=1+(e+r)%4*.05,l=Number((n.value*i).toFixed(4)),o=Number((l*t).toFixed(2));return{id:`seed-item-${e}-${r}`,name:n.name,unit:n.unit,methodLabel:n.methodLabel,methodId:n.methodId,value:l,total:o,inputs:{kisten:t,waterVolume:a},zulassungsnummer:n.zulassungsnummer,mediumId:n.mediumId}})}let Bt=null,pa=null,di=!1,ui=!1;async function Go(){if(!("serviceWorker"in navigator))return console.warn("[PWA] Service Workers nicht unterstützt"),null;try{return pa=await navigator.serviceWorker.register("/psm/sw.js",{scope:"/psm/",updateViaCache:"none"}),console.log("[PWA] Service Worker registriert:",pa.scope),pa.addEventListener("updatefound",()=>{const e=pa?.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&(console.log("[PWA] Neues Update verfügbar"),Jt("pwa:update-available"))})}),navigator.serviceWorker.addEventListener("message",Uo),di||(di=!0,navigator.serviceWorker.addEventListener("controllerchange",()=>{ui||(ui=!0,window.location.reload())})),pa}catch(e){return console.error("[PWA] Service Worker Registrierung fehlgeschlagen:",e),null}}function Uo(e){const{type:t,payload:a}=e.data||{};switch(t){case"DB_STATE":Jt("pwa:db-state",a);break;case"CACHES_CLEARED":Jt("pwa:caches-cleared");break}}async function Bn(e){if(!navigator.serviceWorker.controller){localStorage.setItem("psm-db-state",JSON.stringify({...e,updatedAt:new Date().toISOString()}));return}navigator.serviceWorker.controller.postMessage({type:"SET_DB_STATE",payload:e})}async function ps(){const e=localStorage.getItem("psm-db-state");if(e)try{return JSON.parse(e)}catch{}return navigator.serviceWorker?.controller?new Promise(t=>{const a=n=>{n.data?.type==="DB_STATE"&&(navigator.serviceWorker.removeEventListener("message",a),t(n.data.payload))};navigator.serviceWorker.addEventListener("message",a),navigator.serviceWorker.controller.postMessage({type:"GET_DB_STATE"}),setTimeout(()=>{navigator.serviceWorker.removeEventListener("message",a),t(null)},1e3)}):null}async function Vo(){const e=await ps();return!!(e?.hasDatabase&&e?.autoStartEnabled)}function Zo(){window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),Bt=e,console.log("[PWA] Install Prompt verfügbar"),localStorage.getItem("psm-app-installed")==="true"&&(console.log("[PWA] Widerspruch erkannt: Flag sagt installiert, aber Prompt verfügbar"),localStorage.removeItem("psm-app-installed"),console.log("[PWA] Veraltetes Installations-Flag entfernt")),Jt("pwa:install-available")}),window.addEventListener("appinstalled",()=>{Bt=null,Fn(),console.log("[PWA] App installiert - Flag gesetzt"),Jt("pwa:installed")})}function Nn(){return Bt!==null}function Tt(){return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0}function Mr(){const e=navigator.userAgent.toLowerCase();return e.includes("edg/")?"edge":e.includes("chrome")&&!e.includes("edg")?"chrome":e.includes("firefox")?"firefox":e.includes("safari")&&!e.includes("chrome")?"safari":"other"}function Ir(){return!!(Tt()||localStorage.getItem("psm-app-installed")==="true"||window.matchMedia("(display-mode: fullscreen)").matches||window.matchMedia("(display-mode: minimal-ui)").matches||window.matchMedia("(display-mode: window-controls-overlay)").matches)}async function ms(){if(Ir())return!0;try{if("getInstalledRelatedApps"in navigator){const e=await navigator.getInstalledRelatedApps();if(console.log("[PWA] getInstalledRelatedApps result:",e),e&&e.length>0)return Fn(),!0}}catch(e){console.warn("[PWA] getInstalledRelatedApps API Fehler:",e)}return!1}function Fn(){localStorage.setItem("psm-app-installed","true"),console.log("[PWA] App als installiert markiert")}function Qo(){localStorage.removeItem("psm-app-installed"),console.log("[PWA] Installations-Flag entfernt")}function fs(){const e=Mr(),t=Tt(),a=Ir();return{canInstall:Nn(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function gs(){const e=Mr(),t=Tt(),a=await ms();return{canInstall:Nn(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function Jo(){if(!Bt)return console.warn("[PWA] Kein Install Prompt verfügbar"),!1;try{await Bt.prompt();const{outcome:e}=await Bt.userChoice;return console.log("[PWA] Install Prompt Ergebnis:",e),e==="accepted"&&Fn(),Bt=null,e==="accepted"}catch(e){return console.error("[PWA] Install Prompt fehlgeschlagen:",e),!1}}function Yo(e){if(!("launchQueue"in window)){console.log("[PWA] Launch Queue API nicht verfügbar");return}window.launchQueue?.setConsumer(async t=>{if(!t.files?.length){console.log("[PWA] Launch ohne Dateien");return}console.log("[PWA] Datei via Launch Queue empfangen:",t.files.length);for(const a of t.files)try{await e(a),await Bn({hasDatabase:!0,fileHandleName:a.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0});break}catch(n){console.error("[PWA] Fehler beim Öffnen der Datei:",n)}}),console.log("[PWA] File Handling initialisiert")}const Et="psm-file-handles",Cr="last-database";async function dr(e){try{const t=await Br(),n=t.transaction(Et,"readwrite").objectStore(Et);await new Promise((r,i)=>{const l=n.put({key:Cr,handle:e,savedAt:new Date().toISOString()});l.onsuccess=()=>r(),l.onerror=()=>i(l.error)}),t.close(),console.log("[PWA] FileHandle gespeichert"),await Bn({hasDatabase:!0,fileHandleName:e.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}catch(t){console.error("[PWA] FileHandle speichern fehlgeschlagen:",t)}}async function ur(){try{const e=await Br(),a=e.transaction(Et,"readonly").objectStore(Et),n=await new Promise((i,l)=>{const o=a.get(Cr);o.onsuccess=()=>i(o.result),o.onerror=()=>l(o.error)});if(e.close(),!n?.handle)return null;const r=n.handle;return typeof r.queryPermission=="function"&&await r.queryPermission({mode:"readwrite"})==="granted"?(console.log("[PWA] FileHandle mit Berechtigung geladen"),n.handle):(console.log("[PWA] FileHandle gefunden, aber Berechtigung erforderlich"),n.handle)}catch(e){return console.error("[PWA] FileHandle laden fehlgeschlagen:",e),null}}async function Xo(e){try{const t=e;return typeof t.requestPermission!="function"?(await e.getFile(),!0):await t.requestPermission({mode:"readwrite"})==="granted"}catch{return!1}}async function el(){try{const e=await Br(),a=e.transaction(Et,"readwrite").objectStore(Et);await new Promise((n,r)=>{const i=a.delete(Cr);i.onsuccess=()=>n(),i.onerror=()=>r(i.error)}),e.close(),await Bn({hasDatabase:!1,autoStartEnabled:!1}),console.log("[PWA] FileHandle gelöscht")}catch(e){console.error("[PWA] FileHandle löschen fehlgeschlagen:",e)}}async function Br(){return new Promise((e,t)=>{const a=indexedDB.open("psm-file-handles",1);a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result),a.onupgradeneeded=n=>{const r=n.target.result;r.objectStoreNames.contains(Et)||r.createObjectStore(Et,{keyPath:"key"})}})}function Jt(e,t){window.dispatchEvent(new CustomEvent(e,{detail:t}))}function bs(){return{serviceWorker:"serviceWorker"in navigator,fileSystemAccess:typeof window.showOpenFilePicker=="function",launchQueue:"launchQueue"in window,indexedDB:"indexedDB"in window,standalone:Tt(),installAvailable:Nn()}}async function tl(e){if(console.log("[PWA] Initialisierung..."),await Go(),Zo(),e?.onFileOpened&&Yo(e.onFileOpened),e?.onAutoStart&&await Vo()){const t=await ur();if(t){const a=t;let n=!1;if(typeof a.queryPermission=="function"&&(n=await a.queryPermission({mode:"readwrite"})==="granted"),n){console.log("[PWA] Auto-Start mit gespeicherter Datei"),e.onFileOpened&&await e.onFileOpened(t);return}console.log("[PWA] Auto-Start: Berechtigung für Datei erforderlich"),Jt("pwa:permission-required",{handle:t})}}console.log("[PWA] Capabilities:",bs())}async function al(){if(console.group("🔧 PWA Debug Status"),console.log("📱 Standalone Mode:",Tt()),console.log("💾 localStorage Flag:",localStorage.getItem("psm-app-installed")),console.log("🔔 Install Prompt verfügbar:",Nn()),console.log("🌐 Browser:",Mr()),console.group("📺 Display Mode Checks"),console.log("standalone:",window.matchMedia("(display-mode: standalone)").matches),console.log("fullscreen:",window.matchMedia("(display-mode: fullscreen)").matches),console.log("minimal-ui:",window.matchMedia("(display-mode: minimal-ui)").matches),console.log("window-controls-overlay:",window.matchMedia("(display-mode: window-controls-overlay)").matches),console.log("browser:",window.matchMedia("(display-mode: browser)").matches),console.groupEnd(),console.group("🔍 getInstalledRelatedApps API"),"getInstalledRelatedApps"in navigator)try{const e=await navigator.getInstalledRelatedApps();console.log("Installierte Apps:",e)}catch(e){console.log("API Fehler:",e)}else console.log("API nicht verfügbar");console.groupEnd(),console.group("📊 Status Vergleich"),console.log("Sync (isProbablyInstalled):",Ir()),console.log("Async (checkIfInstalled):",await ms()),console.log("getInstallStatus():",fs()),console.log("getInstallStatusAsync():",await gs()),console.groupEnd(),console.log("💡 Tipp: clearInstalledFlag() zum Zurücksetzen des Flags"),console.groupEnd()}typeof window<"u"&&(window.pwaDebug=al,window.pwaClearFlag=Qo);let Ya=!1;function nl(e){const t=r=>{if(Ya){Ya=!1;return}return r.preventDefault(),r.returnValue="",""};let a=!1;const n=r=>{const i=!!r.app?.hasDatabase;i&&!a?(window.addEventListener("beforeunload",t),a=!0):!i&&a&&(window.removeEventListener("beforeunload",t),a=!1)};n(e.getState()),e.subscribe(n),document.addEventListener("click",r=>{const i=r.target.closest("a");i&&i.target==="_blank"&&(Ya=!0,setTimeout(()=>{Ya=!1},100))})}function rl(){const e=document.getElementById("app-root");if(!e)throw new Error("app-root Container fehlt");return{startup:e.querySelector('[data-region="startup"]'),shell:e.querySelector('[data-region="shell"]'),main:e.querySelector('[data-region="main"]'),footer:e.querySelector('[data-region="footer"]')}}async function il(){if(Qs()){window.location.replace("/psm/m/");return}rl(),Js();const e=ts();e!=="memory"&&bt(e),await Ys();const t={state:{getState:R,patchState:Zr,updateSlice:je,subscribe:wn},events:{emit:yn,subscribe:tt}};Ko(t),as(),nl(t.state),tl({onFileOpened:async a=>{const n=await wt(()=>import("./index.CKDSmSjT.js").then(i=>i.aR),[]),r=await wt(()=>import("./index.CKDSmSjT.js").then(i=>i.aQ),[]);if(r.isSupported()){n.setActiveDriver("sqlite");const i=await a.getFile(),l=await i.arrayBuffer(),o=await r.importFromArrayBuffer(l,i.name);await dr(a);const{applyDatabase:c}=await wt(async()=>{const{applyDatabase:u}=await import("./index.CKDSmSjT.js").then(d=>d.aT);return{applyDatabase:u}},[]);c(o.data),yn("database:connected",{driver:"sqlite",autoStarted:!0})}}}),tt("database:connected",async a=>{await Bn({hasDatabase:!0,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}),tt("database:connected",async a=>{if(le()==="sqlite")try{await Xs(),await ns()}catch(n){console.warn("GPS-Punkte konnten beim Start nicht geladen werden",n)}}),Zr({app:{...R().app,ready:!0}})}const pi="__pflanzenschutz_bootstrapped__",mi=window;function fi(){il().catch(e=>{console.error("bootstrap failed",e)})}mi[pi]||(mi[pi]=!0,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",fi,{once:!0}):fi());const hs=[{id:"start",label:"Start",icon:"bi-grid-1x2",sections:[{section:"dashboard",label:"Übersicht",icon:"bi-grid-1x2"}]},{id:"psm",label:"PSM",icon:"bi-flower1",sections:[{section:"calc",label:"Neu erfassen",icon:"bi-pencil-square"},{section:"documentation",label:"Übersicht",icon:"bi-list-ul"},{section:"lager",label:"Lager",icon:"bi-box-seam"},{section:"settings",label:"Einstellungen",icon:"bi-gear"}]},{id:"acker",label:"Acker-Planer",icon:"bi-map",sections:[{section:"acker",label:"Karte",icon:"bi-map"},{section:"kultur",label:"Kulturführung",icon:"bi-clipboard2-pulse"}]},{id:"fotos",label:"Fotos",icon:"bi-camera",sections:[{section:"fotos",label:"Fotos",icon:"bi-camera"}]},{id:"daten",label:"Daten",icon:"bi-database",sections:[{section:"daten",label:"Import",icon:"bi-cloud-upload"}]}],vs={dashboard:"start",calc:"psm",documentation:"psm",lager:"psm",history:"psm",report:"psm",acker:"acker",kultur:"acker",fotos:"fotos",settings:"psm",gps:"psm",lookup:"psm",import:"daten",daten:"daten"};function ys(e){return hs.find(t=>t.id===e)}function sl(e){const t=vs[e];return t?ys(t):void 0}function ol(){const e=document.getElementById("offline-indicator");if(!e)return;const t=()=>{const a=!navigator.onLine;e.classList.toggle("d-none",!a)};t(),window.addEventListener("online",t),window.addEventListener("offline",t)}function gi(e){R().app.activeSection!==e&&(je("app",t=>({...t,activeSection:e})),yn("app:sectionChanged",e))}function bi(){ol();const e=document.querySelectorAll(".nav-btn[data-area]"),t=document.getElementById("brand-link"),a=document.getElementById("topnav-tabs"),n=document.getElementById("topnav-area-icon"),r=document.getElementById("topnav-area-label"),i={};for(const h of hs)i[h.id]=h.sections[0].section;let l=null;function o(h,k){if(a){if(h.sections.length<=1){a.innerHTML="";return}a.innerHTML=h.sections.map(S=>`
        <button type="button" class="topnav-tab${S.section===k?" active":""}" data-section="${S.section}">
          <i class="bi ${S.icon}"></i><span>${S.label}</span>
        </button>`).join("")}}function c(h){a&&a.querySelectorAll(".topnav-tab").forEach(k=>{k.classList.toggle("active",k.dataset.section===h)})}const u=h=>{const k=ys(h);!k||!R().app.hasDatabase||gi(i[h]??k.sections[0].section)};e.forEach(h=>{h.addEventListener("click",()=>{const k=h.dataset.area;k&&u(k)})}),t?.addEventListener("click",h=>{h.preventDefault(),u("start")}),a?.addEventListener("click",h=>{const S=h.target?.closest(".topnav-tab")?.dataset.section;S&&gi(S)});const d=document.querySelector('.nav-btn[data-action="share-data"]');d?.addEventListener("click",()=>{d.disabled=!0,wt(async()=>{const{shareMobileData:h}=await import("./index.DoEGfA48.js");return{shareMobileData:h}},__vite__mapDeps([0,1])).then(({shareMobileData:h})=>h()).catch(h=>console.error("Teilen fehlgeschlagen",h)).finally(()=>{d.disabled=!1})}),eo(),tt("history:data-changed",h=>{if(!document.body.classList.contains("mobile-mode"))return;const k=h?.type;(k==="created"||k==="created-bulk")&&to()});const p=h=>{const k=document.getElementById("brand-title"),S=document.getElementById("brand-tagline"),A=document.getElementById("app-version");k&&h.company.name&&(k.textContent=h.company.name),S&&h.company.headline&&(S.textContent=h.company.headline),A&&h.app.version&&(A.textContent=`v${h.app.version}`);const M=h.app.hasDatabase,V=h.app.activeSection,W=sl(V);W&&vs[V]===W.id&&(i[W.id]=V),e.forEach(pe=>{pe.disabled=!M;const F=M&&W?.id===pe.dataset.area;pe.classList.toggle("active",!!F)}),W&&(n&&(n.className=`bi ${W.icon} topnav-area-icon`),r&&(r.textContent=W.label),l!==W.id?(o(W,V),l=W.id):c(V))};wn(p),p(R());let m=!1;const x=document.title||"Pflanzenschutz";window.addEventListener("beforeprint",()=>{m||(m=!0,document.title=" ")}),window.addEventListener("afterprint",()=>{m&&(m=!1,document.title=x)})}function ll(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",bi,{once:!0}):bi()}ll();const cl="https://api.digitale-psm.de",dl="digitale-psm.de";async function ul(e){try{const t=await fetch(`${cl}/api/v1/${dl}/views/${e}`,{method:"POST",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`API error: ${t.status}`);return(await t.json()).views}catch(t){return console.warn("[ViewCounter] Fehler beim Zählen:",t),null}}function pl(e){return e>=1e6?(e/1e6).toFixed(1).replace(".",",")+"M":e>=1e3?(e/1e3).toFixed(1).replace(".",",")+"K":e.toString()}const pr="pflanzenschutz-datenbank.json";let hi=!1;function ml(e){return e?`${e.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"pflanzenschutz-datenbank"}.json`:pr}async function ma(e,t){if(!e){await t();return}const a=e.textContent??"";e.disabled=!0,e.dataset.busy="true",e.textContent="Bitte warten...";try{await t()}finally{e.disabled=!1,e.dataset.busy="false",e.textContent=a}}function vi(e){return b(e)}function fl(e){const t=document.createElement("section");t.className="section-container d-none",t.innerHTML=`
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
                <input class="form-control" id="wizard-company-name" name="wizard-company-name" required value="${vi(e.name)}" placeholder="z.B. Gärtnerei Müller" />
              </div>
              <div class="col-md-6">
                <label class="form-label d-block mb-2" for="wizard-company-headline">
                  Überschrift <span class="text-muted small">(optional)</span>
                </label>
                <input class="form-control" id="wizard-company-headline" name="wizard-company-headline" value="${vi(e.headline)}" placeholder="z.B. Pflanzenschutz-Dokumentation 2025" />
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
  `;const a=t.querySelector("#database-wizard-form");if(!a)throw new Error("Wizard-Formular konnte nicht erzeugt werden");const n=t.querySelector('[data-role="wizard-result"]');if(!n)throw new Error("Wizard-Resultat-Container fehlt");return{section:t,form:a,resultCard:n,preview:t.querySelector('[data-role="wizard-preview"]'),filenameLabel:t.querySelector('[data-role="wizard-filename"]'),saveHint:t.querySelector('[data-role="wizard-save-hint"]'),saveButton:t.querySelector('[data-action="wizard-save"]'),reset(){a.reset(),n.classList.add("d-none");const r=t.querySelector('[data-role="wizard-preview"]');r&&(r.textContent="");const i=t.querySelector('[data-role="wizard-filename"]');i&&(i.textContent="")}}}function gl(e,t){if(!e||hi)return;const a=e;let n=null,r=pr,i="landing";const o=t.state.getState().company,c=document.createElement("section");c.className="section-container";function u(B,L){const z=B;c.innerHTML=`
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
  `}u(!1,Tt());const d=fl(o);a.innerHTML="",a.appendChild(c),a.appendChild(d.section);const p=typeof window<"u"&&typeof window.showSaveFilePicker=="function";d.saveButton&&(p?d.saveHint&&(d.saveHint.textContent='Der Browser fragt nach einem Speicherort. Die erzeugte Datei kannst du später über "Bestehende Datei verbinden" erneut laden.'):(d.saveButton.disabled=!0,d.saveButton.textContent="Datei speichern (nicht verfügbar)",d.saveHint&&(d.saveHint.textContent="Dieser Browser unterstützt keinen direkten Dateidialog. Bitte nutze einen Chromium-basierten Browser (z. B. Chrome, Edge) über HTTPS oder http://localhost.")));function m(B=t.state.getState()){const L=!!B.app?.hasDatabase;if(a.classList.toggle("d-none",L),L){c.classList.add("d-none"),d.section.classList.add("d-none");return}i==="wizard"?(c.classList.add("d-none"),d.section.classList.remove("d-none")):(c.classList.remove("d-none"),d.section.classList.add("d-none"))}async function x(B){await ma(B,async()=>{try{const L=le();L==="sqlite"||L==="filesystem"?bt(L):bt("filesystem")}catch(L){throw T.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),L instanceof Error?L:new Error("Dateisystem nicht verfügbar")}try{const L=await ao();Ja(L.data);const z=L.context;z?.fileHandle&&await dr(z.fileHandle),t.events.emit("database:connected",{driver:le()})}catch(L){console.error("Fehler beim Öffnen der Datenbank",L),T.error(L instanceof Error?L.message:"Öffnen der Datenbank fehlgeschlagen")}})}function h(B){ma(B,async()=>{const L=Qr(),z=["localstorage","sqlite","memory"];for(const ae of z)try{bt(ae);const ce=await Jr(L);Ja(ce.data),t.events.emit("database:connected",{driver:le()||ae});return}catch(ce){console.warn(`Treiber ${ae} konnte nicht initialisiert werden`,ce)}const U="Keine geeignete Speicheroption verfügbar. Bitte Browserberechtigungen prüfen.";console.error(U),T.error(U)})}async function k(B){if(!n){T.warning("Bitte erst die Datenbank erzeugen.");return}await ma(B,async()=>{try{const L=le();L==="sqlite"||L==="filesystem"?bt(L):bt("filesystem")}catch(L){throw T.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),L instanceof Error?L:new Error("Dateisystem nicht verfügbar")}try{const L=await Jr(n);Ja(L.data),t.events.emit("database:connected",{driver:le()})}catch(L){console.error("Fehler beim Speichern der Datenbank",L),T.error(L instanceof Error?L.message:"Die Datei konnte nicht gespeichert werden")}})}function S(B){B.preventDefault();const L=new FormData(d.form),z=(L.get("wizard-company-name")||"").toString().trim();if(!z){T.warning("Bitte einen Firmennamen angeben.");return}const U=(L.get("wizard-company-headline")||"").toString().trim(),ae=(L.get("wizard-company-address")||"").toString().trim();n=Qr({meta:{company:{name:z,headline:U,logoUrl:"",contactEmail:"",address:ae}}}),r=ml(z),d.preview.textContent=JSON.stringify(n,null,2),d.filenameLabel.textContent=r,d.resultCard.classList.remove("d-none"),d.resultCard.scrollIntoView({behavior:"smooth",block:"start"})}function A(){i="landing",n=null,r=pr,d.reset(),m()}function M(){i="wizard",m()}async function V(B){await ma(B,async()=>{try{const L=await ur();if(!L){T.warning("Keine gespeicherte Datei gefunden.");return}if(!await Xo(L)){T.warning("Berechtigung zum Zugriff auf die Datei wurde verweigert.");return}bt("sqlite");const U=await L.getFile(),ae=await U.arrayBuffer(),ce=await no(ae,U.name);ro(L),Ja(ce.data),await dr(L),t.events.emit("database:connected",{driver:"sqlite",autoStarted:!0}),T.success("Datenbank erfolgreich geladen!")}catch(L){console.error("Auto-Start fehlgeschlagen:",L),T.error(L instanceof Error?L.message:"Fehler beim Laden der gespeicherten Datei")}})}async function W(){await el();const B=c.querySelector("#auto-start-banner");B&&B.classList.add("d-none"),T.info("Gespeicherte Datei wurde vergessen.")}async function pe(B){await ma(B,async()=>{if(await Jo()){T.success("App wird installiert!");const z=c.querySelector("#pwa-install-banner");z&&z.classList.add("d-none")}})}if(c.addEventListener("click",B=>{const L=B.target?.closest("button[data-action]");if(!L)return;const z=L.dataset.action;if(z==="start-wizard"){M();return}z==="open"?x(L):z==="useDefaults"?h(L):z==="auto-start"?V(L):z==="auto-start-forget"?W():z==="install-pwa"&&pe(L)}),d.form.addEventListener("submit",S),d.section.addEventListener("click",B=>{const L=B.target?.closest("[data-action]");if(!L)return;const z=L.dataset.action;if(z==="wizard-back"){A();return}z==="wizard-save"&&k(L)}),t.state.subscribe(B=>m(B)),m(t.state.getState()),!t.state.getState().app.hasDatabase){const B=ts();if(B&&B!==le())try{bt(B)}catch(L){console.warn("Bevorzugter Speicher konnte nicht gesetzt werden",L)}}(async()=>{const B=await ur(),L=await ps(),z=!!(B&&L?.hasDatabase),U=Tt();u(z,U);const ae=c.querySelector('[data-role="view-count"]');if(ae&&ul("app").then(me=>{me!==null&&(ae.textContent=pl(me))}),z&&B){const me=c.querySelector('[data-role="auto-start-filename"]');me&&(me.textContent=`Datei: ${B.name}`)}F(),window.addEventListener("pwa:install-available",()=>{F()}),window.addEventListener("pwa:installed",()=>{Fn(),F()}),window.addEventListener("pwa:permission-required",async me=>{const Ce=me.detail?.handle;if(Ce){const he=c.querySelector("#auto-start-banner"),qt=c.querySelector('[data-role="auto-start-filename"]');he&&qt&&(qt.textContent=`Datei: ${Ce.name} (Berechtigung erforderlich)`,he.classList.remove("d-none"))}}),console.log("[Startup] PWA Capabilities:",bs());const ce=await gs();console.log("[Startup] PWA Install Status (async):",ce),te(ce)})();function F(){const B=fs();te(B)}function te(B){const L=c.querySelector("#pwa-install-banner"),z=c.querySelector('[data-role="pwa-content"]');if(!(!L||!z)){if(!B.showBanner){L.classList.add("d-none");return}L.classList.remove("d-none"),B.isInstalled?z.innerHTML=`
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
      `:L.classList.add("d-none")}}hi=!0}function ws(e){let t=!1,a=!1;const n=o=>{e.onStatusChange&&e.onStatusChange(o)},r=()=>{t||!a||R().app.activeSection!==e.section||e.shouldRefresh&&!e.shouldRefresh()||(a=!1,n("refreshing"),Promise.resolve(e.onRefresh()).catch(c=>{console.error("Auto-Refresh konnte nicht ausgeführt werden",c),a=!0,n("stale")}).finally(()=>{!t&&!a&&n("idle")}))},i=tt(e.event,()=>{e.shouldHandleEvent&&!e.shouldHandleEvent()||(a=!0,n("stale"),r())}),l=tt("app:sectionChanged",o=>{o===e.section&&(a?r():n("idle"))});return R().app.activeSection===e.section&&n("idle"),()=>{t=!0,i(),l()}}const bl={prev:"Zurück",next:"Weiter",loading:"Lädt …",empty:"Keine Einträge verfügbar"};function yi(){const e=document.createElement("span");return e.className="spinner-border spinner-border-sm",e.setAttribute("role","status"),e.setAttribute("aria-hidden","true"),e}function wi(e){const t=document.createElement("div");return t.className="pager-widget__info text-muted small text-center flex-grow-1",t.textContent=e?.trim()||"",t}function qa(e,t){if(!e)return null;const a=document.createElement("div");a.className="pager-widget d-flex flex-column gap-2",e.innerHTML="",e.appendChild(a);let n={status:"hidden"},r=!1;const i={...bl,...t.labels||{}};function l(){a.replaceChildren()}function o(p){const m=wi(p.info||i.empty);a.replaceChildren(m)}function c(p){const m=document.createElement("div");m.className="alert alert-danger mb-0",m.textContent=p.message||"Unbekannter Fehler",a.replaceChildren(m)}function u(p){const m=document.createElement("div");m.className="pager-widget__controls d-flex flex-column flex-md-row gap-2 align-items-stretch";const x=document.createElement("button");x.type="button",x.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",x.disabled=!p.canPrev||p.loadingDirection==="prev",x.textContent=i.prev,p.loadingDirection==="prev"&&x.prepend(yi()),x.addEventListener("click",()=>{x.disabled||t.onPrev()});const h=document.createElement("button");h.type="button",h.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",h.disabled=!p.canNext||p.loadingDirection==="next",h.textContent=i.next,p.loadingDirection==="next"&&h.append(yi()),h.addEventListener("click",()=>{h.disabled||t.onNext()});const k=wi(p.info||(p.canPrev||p.canNext?i.loading:i.empty));m.append(x,k,h),a.replaceChildren(m)}function d(p){switch(p.status){case"hidden":l();break;case"disabled":o(p);break;case"error":c(p);break;case"ready":u(p);break;default:l();break}}return{update(p){r||(n=p,d(p))},destroy(){r||(r=!0,a.replaceChildren(),e.innerHTML="")},getState(){return n}}}const Nr=new Set;let xi=!1;function hl(){return typeof window>"u"?null:window.__PSL?.debugOverlayApi??null}function xs(){xi||typeof window>"u"||(xi=!0,window.addEventListener("psl:debug-overlay-ready",()=>{Nr.forEach(e=>{Fr(e)})}))}function Fr(e){const t=hl();t?.registerProvider&&(e.handle||(e.handle=t.registerProvider(e.config)),e.handle.update(e.lastMetrics??null))}function ks(e){const t={config:e,handle:null,lastMetrics:null};return Nr.add(t),xs(),Fr(t),t}function Ss(e,t){e.lastMetrics=t,Nr.add(e),xs(),Fr(e)}function Es(e){if(e==null)return 0;try{const t=JSON.stringify(e);return t?Number((t.length/1024).toFixed(1)):0}catch{return null}}const ki=5e3,Si=50,Tr=50,cn=3;function Zn(e){if(e==null||e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function vl(e){if(!e)return null;const t=Zn(e.areaHa);if(t!==null)return t;const a=Zn(e.areaAr);if(a!==null)return a/100;const n=Zn(e.areaSqm);return n!==null?n/1e4:null}function yl(e,t="–"){const a=vl(e);return a===null?t:ho(a,2,t)}function wl(e){return e.toISOString().slice(0,10)}function Sn(e){if(!e)return;if(/^\d{4}-\d{2}-\d{2}$/.test(e))return e;const t=new Date(e);if(!Number.isNaN(t.getTime()))return wl(t)}function Ei(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function qr(){return{startDate:"",endDate:""}}function Ls(e,t){if(!e)return;const a=e.querySelector("#doc-start"),n=e.querySelector("#doc-end");a&&t.startDate&&(a.value=t.startDate),n&&t.endDate&&(n.value=t.endDate)}function xl(e,t="sqlite"){if(typeof e=="string")return e.includes(":")?e:/^\d+$/.test(e)?Ut(t,Number(e)):e;if(typeof e=="number")return Ut(t,e);if(e&&typeof e=="object"){const a=e.source||t;if(typeof e.ref=="string"&&e.ref.includes(":"))return e.ref;const n=Number(e.ref);if(!Number.isNaN(n))return Ut(a,n)}return null}function kl(e){const t=new Set;return e?.length&&e.forEach(a=>{const n=xl(a);n&&t.add(n)}),t}function Ds(e){const t=e.querySelector('[data-role="doc-focus-banner"]'),a=e.querySelector('[data-role="doc-focus-text"]');if(!t||!a)return;if(!kt){t.classList.add("d-none");return}const n=G.startDate&&G.endDate?`${G.startDate} - ${G.endDate}`:"Aktuelle Filter",r=kt.label||"Importierter Zeitraum",i=kt.highlightEntryIds.size,l=i?` (${i} markiert)`:"";a.textContent=`${r}: ${n}${l}`,t.classList.remove("d-none")}function Sl(e,t){const a=e.querySelector('[data-role="doc-refresh-indicator"]');if(a){if(a.classList.remove("alert-info","alert-warning"),t==="idle"){a.classList.add("d-none");return}a.classList.remove("d-none"),t==="stale"?(a.classList.add("alert-warning"),a.textContent="Neue Dokumentationseinträge verfügbar. Ansicht aktualisiert sich beim Öffnen."):(a.classList.add("alert-info"),a.textContent="Aktualisiere Dokumentation...")}}function Qn(e,t,a={}){kt&&(kt=null,Ea=null,Ds(e),a.refreshList&&Lt(e,t.state.getState().fieldLabels))}function El(e,t){if(!Ea)return;const a=Nt(Ea);a&&(Ea=null,Is(e,a,t))}function Ll(e,t,a){if(!a)return;const n=Sn(a.startDate),r=Sn(a.endDate),i=!!a.entryIds?.length;if(!n&&!r&&!i)return;G={...G,...n?{startDate:n}:{},...r?{endDate:r}:{}},a.creator!==void 0&&(G={...G,creator:a.creator||void 0}),a.crop!==void 0&&(G={...G,crop:a.crop||void 0});const l=kl(a.entryIds);kt={label:a.label,reason:a.reason,startDate:G.startDate,endDate:G.endDate,highlightEntryIds:l},Ea=a.autoSelectFirst&&l.size?l.values().next().value??null:null;const o=e.querySelector("#doc-filter");Ls(o,G),Ds(e),mr=!0,ht(e,t.state.getState()).finally(()=>{mr=!1})}function Dl(){if(typeof window>"u")return{enabled:!1,count:Xa};try{const e=new URLSearchParams(window.location.search);if(!e.has("seedHistory"))return{enabled:!1,count:Xa};const t=e.get("seedHistory"),a=t?Number(t):Number.NaN;return{enabled:!0,count:Number.isFinite(a)&&a>0?Math.min(Math.round(a),$l):Xa}}catch(e){return console.warn("seedHistory Parameter konnte nicht gelesen werden",e),{enabled:!1,count:Xa}}}const at=25,Li=4,Jn=new Intl.NumberFormat("de-DE"),Xa=200,$l=2e3,Yt=Dl();let Di=!1,ke="memory",G=qr(),Pe=0,ue=[],ut=[],ee=0;const et=new Map,Re=new Map([[0,null]]),qe=new Set,xt=new Map,Gt=new Map;let Fe=!1,fa=null,ga=0,kt=null,mr=!1,Ea=null,En=!1,dn="",Ln=!1,en=null,tn=null,$i=null,ze=0,an=null,Ai=null,Xe=null,La=!1,zi=null;const Al=ks({id:"documentation",label:"Documentation",budget:{initialLoad:50,maxItems:150}});let $s=null;function ea(e){return e.app?.storageDriver||le()}function Ut(e,t){return`${e}:${t}`}function Hr(e){const t={},a=Ei(e.startDate,"start"),n=Ei(e.endDate,"end");return a&&(t.startDate=a),n&&(t.endDate=n),e.creator&&(t.creator=e.creator),e.crop&&(t.crop=e.crop),t}function zl(e,t){return{id:Ut("state",t),entry:e,source:"state",ref:t}}function Pl(e){const t=Number(e?.id??e?.historyId??0),a={...e};return delete a.id,{id:Ut("sqlite",t),entry:a,source:"sqlite",ref:t}}function Ml(){return ke==="memory"?ue.length:Pe>0?Pe:ee*at+ue.length||null}function Il(){const e=[];if(Fe&&e.push("Lädt …"),Xe&&e.push("Fehler"),kt&&e.push("Fokus aktiv"),ke==="sqlite"&&Re.get(ee+1)&&e.push("Weitere Seiten verfügbar"),!!e.length)return e.join(" · ")}function Cl(){const e={items:ue.length,totalCount:Ml(),cursor:ke==="sqlite"?`Seite ${ee+1}`:null,payloadKb:Es(ut.map(t=>t.entry)),lastUpdated:$s,note:Il()};Ss(Al,e)}function Nt(e){return ue.find(t=>t.id===e)}function Tn(e){const t=e.querySelector('[data-role="archive-form"]');if(!t)return;const a=t.querySelector('input[name="archive-start"]'),n=t.querySelector('input[name="archive-end"]');a&&(a.value=G.startDate||""),n&&(n.value=G.endDate||"")}function Ee(e,t,a="info"){const n=e.querySelector('[data-role="archive-status"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a}`,n.textContent=t,n.classList.remove("d-none")}}function fr(e,t){const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(!a)return;const r=!a.classList.contains("d-none"),i=typeof t=="boolean"?t:!r;a.classList.toggle("d-none",!i),n&&(n.textContent=i?"Archiv-Eingaben ausblenden":"Archiv erstellen"),i&&Tn(e)}function Bl(e){const t=e.querySelector('input[name="archive-start"]'),a=e.querySelector('input[name="archive-end"]');if(!t?.value||!a?.value)return null;const n=e.querySelector('input[name="archive-storage"]'),r=e.querySelector('textarea[name="archive-note"]'),i=e.querySelector('input[name="archive-remove"]');return{startDate:t.value,endDate:a.value,storageHint:n?.value.trim()||void 0,note:r?.value.trim()||void 0,removeAfterExport:i?i.checked:!0}}function Or(e,t){const a=e.querySelector('[data-action="archive-toggle"]'),n=e.querySelector('[data-action="archive-submit"]'),r=e.querySelector('[data-role="archive-form"]'),i=e.querySelector('[data-role="archive-driver-hint"]'),l=ea(t)==="sqlite"&&!!t.app?.hasDatabase;a&&(a.disabled=!l||En),n&&(n.disabled=!l||En),!l&&r&&r.classList.add("d-none"),i&&(i.textContent=l?"Lokale SQLite-Datenbank aktiv":"Nur mit SQLite verfügbar",i.className=`badge ${l?"bg-success":"bg-secondary"}`),l?_r():Ln=!1}function Pi(e,t){En=t;const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(a&&a.querySelectorAll("input, textarea, button").forEach(r=>{if(r.dataset.action==="archive-cancel"&&t){r.setAttribute("disabled","disabled");return}t?r.setAttribute("disabled","disabled"):r.removeAttribute("disabled")}),n&&(n.disabled=t||n.disabled,!t)){const r=R();n.disabled=ea(r)!=="sqlite"||!r.app?.hasDatabase}}function Nl(e,t){const a=n=>n?n.replace(/[^0-9-]/g,""):"unbekannt";return`pflanzenschutz-archiv-${a(e)}_${a(t)}.zip`}function Fl(e){let t=[];return je("archives",a=>{const n=Array.isArray(a?.logs)?a.logs:[];return t=[e,...n].slice(0,Tr),{...a||{logs:[]},logs:t}}),t}async function _r({force:e=!1}={}){if(en){if(await en,!e)return}else if(Ln&&!e)return;const t=R();if(ea(t)!=="sqlite"||!t.app?.hasDatabase)return;const n=(async()=>{try{const r=await io({limit:Tr});je("archives",i=>({...i&&typeof i=="object"?i:{logs:[]},logs:r.items})),Ln=!0}catch(r){console.warn("Archive logs could not be loaded",r)}})();en=n;try{await n}finally{en=null}}async function Tl(e,t){const a=ea(R());if(Fl(e),a!=="sqlite"){console.warn("Archive logs require SQLite. Changes stored in memory only.");return}try{const n={...e,metadata:t??void 0};await po(n),await We()}catch(n){console.error("Archive log could not be persisted",n),Ln=!1}finally{await _r({force:!0})}}function gr(e){return!Array.isArray(e)||!e.length?"[]":e.map(t=>`${t.id}:${t.archivedAt}:${t.entryCount}`).join("|")}function ql(e){return e?za(e)||e.slice(0,16).replace("T"," "):"-"}function Ma(e,t,a={}){const n=e.querySelector('[data-role="archive-log-list"]');if(!n)return;const r=Array.isArray(t)?t:[];a.resetPage!==!1&&(ze=0);const i=Ul(r);if(!i.total){n.innerHTML='<div class="text-muted small">Noch keine Archive erstellt.</div>',Ci(e,i);return}const l=i.items.map(o=>{const c=ql(o.archivedAt),u=`${o.startDate||"-"} – ${o.endDate||"-"}`,d=o.entryCount===1?"Eintrag":"Einträge";return`
        <div class="list-group-item border rounded mb-2 p-3" data-action="archive-log-focus" data-log-id="${o.id}" style="cursor: pointer;">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="fs-5 fw-bold mb-1">${b(u)}</div>
              <div class="text-muted">${o.entryCount} ${d} · Erstellt ${b(c)}</div>
            </div>
            <i class="bi bi-chevron-right text-muted fs-4"></i>
          </div>
        </div>
      `}).join("");n.innerHTML=`<div class="list-group list-group-flush">${l}</div>`,Ci(e,i)}function Mi(e,t){const a=e.archives?.logs;if(Array.isArray(a))return a.find(n=>n.id===t)}async function Hl(e){if(e){if(typeof navigator<"u"&&navigator.clipboard&&typeof navigator.clipboard.writeText=="function"){await navigator.clipboard.writeText(e);return}if(typeof document<"u"){const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select(),document.execCommand("copy"),document.body.removeChild(t)}}}async function Ha(e){if(Gt.has(e.id))return Gt.get(e.id);let t=null;if(e.source==="sqlite")try{t=await mo(e.ref)}catch(a){console.error("History entry fetch failed",a)}else{const a=Te(R().history);t=(typeof e.ref=="number"?a[e.ref]:void 0)||e.entry}return t&&Gt.set(e.id,t),t}function As(e){return e&&(e.datum||za(e.dateIso)||(typeof e.date=="string"?e.date:""))||""}function Ol(e){if(e?.gpsCoordinates){const t=bo(e.gpsCoordinates);if(t)return t}return""}function _l(e){return e?.gps||""}function br(e){if(!e)return null;if(e.dateIso){const n=os(e.dateIso);if(n)return new Date(n.getFullYear(),n.getMonth(),n.getDate())}const t=typeof e.datum=="string"&&e.datum||typeof e.date=="string"&&e.date||null;if(!t)return null;const a=t.split(".");if(a.length===3){const[n,r,i]=a.map(Number);if(!Number.isNaN(n)&&!Number.isNaN(r)&&!Number.isNaN(i))return new Date(i,r-1,n)}return null}function Kl(e,t){const a=br(e);if(t.startDate){const r=new Date(t.startDate);if(r.setHours(0,0,0,0),!a||a<r)return!1}if(t.endDate){const r=new Date(t.endDate);if(r.setHours(23,59,59,999),!a||a>r)return!1}const n=[["creator",e.ersteller],["crop",e.kultur]];for(const[r,i]of n){const o=t[r]?.trim().toLowerCase();if(o&&!`${i||""}`.toLowerCase().includes(o))return!1}return!0}function Kr(e){if(!e)return"";const t=r=>r==null?"":String(r),n=(Array.isArray(e.items)?e.items:[]).map(r=>{const i=Object.keys(r).sort().reduce((l,o)=>(l[o]=r[o],l),{});return JSON.stringify(i)}).sort();return JSON.stringify({savedAt:t(e.savedAt),dateIso:t(e.dateIso),datum:t(e.datum),ersteller:t(e.ersteller),standort:t(e.standort),kultur:t(e.kultur),usageType:t(e.usageType),eppoCode:t(e.eppoCode),invekos:t(e.invekos),bbch:t(e.bbch),gps:t(e.gps),gpsPointId:t(e.gpsPointId),areaHa:e.areaHa??null,areaAr:e.areaAr??null,areaSqm:e.areaSqm??null,kisten:e.kisten??null,itemHashes:n})}function zs(e){e.size&&je("history",t=>{const a=Fa(t);if(!a.items.length)return a;let n=!1;const r=a.items.filter(i=>{const l=Kr(i);return e.has(l)?(n=!0,!1):!0});return n?{...a,items:r,totalCount:Math.min(a.totalCount,r.length),lastUpdatedAt:new Date().toISOString()}:a})}function Rl(e){return e.slice().sort((t,a)=>{const n=br(t.entry)?.getTime()||new Date(t.entry.savedAt||0).getTime();return(br(a.entry)?.getTime()||new Date(a.entry.savedAt||0).getTime())-n})}function Ii(){return ke==="sqlite"?Pe>0?Math.max(Math.ceil(Pe/at),1):Math.max(ee+1,et.size||0):ue.length?Math.max(Math.ceil(ue.length/at),1):0}function Ps(){if(ke==="sqlite"){const t=Math.max(Ii()-1,0);return ee>t&&(ee=t),ee<0&&(ee=0),ee*at}if(!ue.length)return ee=0,0;const e=Math.max(Ii()-1,0);return ee>e&&(ee=e),ee<0&&(ee=0),ee*at}function qn(){if(!ue.length){ut=[];return}if(ke==="sqlite"){ut=ue.slice();return}const e=Ps(),t=Math.min(e+at,ue.length);ut=ue.slice(e,t)}function Wl(e){if(et.size<=Li)return;const t=Array.from(et.keys()).sort((a,n)=>{const r=Math.abs(a-e);return Math.abs(n-e)-r});for(;et.size>Li&&t.length;){const a=t.shift();a==null||a===e||et.delete(a)}}function jl(e){const t=e.querySelector('[data-role="doc-pager"]');return t?((!tn||$i!==t)&&(tn?.destroy(),tn=qa(t,{onPrev:()=>Ql(e),onNext:()=>Jl(e),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Dokumentation...",empty:"Keine Einträge"}}),$i=t),tn):null}function Gl(e){const t=e.querySelector('[data-role="archive-log-pager"]');return t?((!an||Ai!==t)&&(an?.destroy(),an=qa(t,{onPrev:()=>Vl(e),onNext:()=>Zl(e),labels:{prev:"Zurück",next:"Weiter",loading:"Archive werden geladen...",empty:"Keine Einträge"}}),Ai=t),an):null}function Ul(e){const t=e.length;if(!t)return ze=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/cn),1);ze>=a&&(ze=a-1),ze<0&&(ze=0);const n=ze*cn,r=Math.min(n+cn,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function Ci(e,t){const a=Gl(e);if(a){if(!t.total){a.update({status:"disabled",info:"Noch keine Archive"});return}a.update({status:"ready",info:`Einträge ${t.start+1}–${t.end} von ${t.total}`,canPrev:ze>0,canNext:t.end<t.total})}}function Vl(e){if(ze===0)return;ze=Math.max(ze-1,0);const t=R().archives?.logs??[];Ma(e,t,{resetPage:!1})}function Zl(e){const t=R().archives?.logs??[],a=t.length;if(!a)return;const n=Math.max(Math.ceil(a/cn),1);ze>=n-1||(ze=Math.min(ze+1,n-1),Ma(e,t,{resetPage:!1}))}function un(e){const t=jl(e);if(!t)return;if(Xe){t.update({status:"error",message:Xe});return}const a=ke==="memory"?ue.length:Pe,n=ut.length;if(!n){const u=Fe?"Lade Dokumentation...":"Keine Einträge vorhanden.";t.update({status:"disabled",info:u});return}const r=ke==="sqlite"?ee*at:Ps(),i=`Einträge ${Jn.format(r+1)}–${Jn.format(r+n)}${a?` von ${Jn.format(a)}`:""}`,l=ke==="memory"?r+n<ue.length:!!Re.get(ee+1),o=!Fe&&l,c=ee>0&&!Fe;t.update({status:"ready",info:i,canPrev:c,canNext:o,loadingDirection:Fe&&l?"next":null})}function hr(e){if(!Yt.enabled)return;const t=e.querySelector('[data-action="doc-seed"]');t&&(t.disabled=La,t.textContent=La?"Dummy-Daten werden erstellt...":`+ ${Yt.count} Dummy-Einträge`)}function Ql(e){if(ee===0||Fe)return;const t=Math.max(ee-1,0);if(ke==="sqlite"){Rr(e,R().fieldLabels,t);return}ee=t,qn(),Lt(e,R().fieldLabels),Ca(e,R().fieldLabels)}function Jl(e){if(Fe)return;const t=ee+1;if(ke==="sqlite"){const n=et.has(t),r=Re.get(t);if(!n&&!r)return;Rr(e,R().fieldLabels,t);return}t*at<ue.length&&(ee=t,qn(),Lt(e,R().fieldLabels),Ca(e,R().fieldLabels))}function Ia(e){qe.clear(),xt.clear(),e&&Hn(e)}function Yl(){return ke==="memory"?ue.length:Pe}function Hn(e){const t=e.querySelector('[data-role="doc-selection-info"]'),a=e.querySelector('[data-action="print-selection"]'),n=e.querySelector('[data-action="pdf-selection"]'),r=e.querySelector('[data-action="export-selection"]'),i=e.querySelector('[data-action="export-zip"]'),l=e.querySelector('[data-action="delete-selection"]'),o=qe.size;t&&(t.textContent=o?`${o} Eintrag${o===1?"":"e"} ausgewählt`:"Keine Einträge ausgewählt");const c=o===0;a&&(a.disabled=c),n&&(n.disabled=c),r&&(r.disabled=c),i&&(i.disabled=c),l&&(l.disabled=c);const u=e.querySelector('[data-action="toggle-select-all"]');if(u){const d=Yl();u.disabled=d===0,u.checked=d>0&&o>=d,u.indeterminate=o>0&&o<d}}function vr(e,t){e.querySelectorAll('[data-role="doc-list"] .doc-sidebar-entry').forEach(n=>{const r=!!(t&&n.dataset.entryId===t);n.classList.toggle("active",r)})}function ya(e,t,a){const n=e.querySelector("#doc-detail"),r=e.querySelector("#doc-detail-body"),i=e.querySelector('[data-role="doc-detail-card"]'),l=e.querySelector('[data-role="doc-detail-empty"]');if(!n||!r||!i||!l)return;if(!t){n.dataset.entryId="",i.classList.add("d-none"),l.classList.remove("d-none"),r.innerHTML="",vr(e,null);return}n.dataset.entryId=t.entry.id,i.classList.remove("d-none"),l.classList.add("d-none"),vr(e,t.entry.id);const o=a||R().fieldLabels,c=o.history?.tableColumns??{},u=o.history?.detail??{},d=t.detail||t.entry.entry,p=fo(d.items||[],o,"detail"),m=d.gpsCoordinates?Ta(d.gpsCoordinates):null,x=_l(d),h=Ol(d),k=u.gpsNote||c.gpsNote||u.gps||c.gps||"GPS-Notiz",S=u.gpsCoordinates||c.gpsCoordinates||u.gps||c.gps||"GPS-Koordinaten",A=h?`${b(h)}${m?` <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${b(m)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:""}`:"-";r.innerHTML=`
    <p>
      <strong>${b(c.date||"Datum")}:</strong> ${b(As(d))}<br />
      <strong>${b(u.creator||"Erstellt von")}:</strong> ${b(d.ersteller||"")}<br />
      <strong>${b(u.location||"Standort")}:</strong> ${b(d.standort||"")}<br />
      <strong>${b(u.crop||"Kultur")}:</strong> ${b(d.kultur||"")}<br />
      <strong>${b(u.usageType||"Art der Verwendung")}:</strong> ${b(d.usageType||"")}<br />
      <strong>${b(u.quantity||"Fläche (ha)")}:</strong> ${b(yl(d))}<br />
      <strong>${b(u.eppoCode||"EPPO-Code")}:</strong> ${b(d.eppoCode||"")}<br />
      <strong>${b(u.bbch||"BBCH")}:</strong> ${b(d.bbch||"")}<br />
      <strong>${b(u.invekos||"InVeKoS")}:</strong> ${b(d.invekos||"")}<br />
      <strong>${b(k)}:</strong> ${x?b(x):"-"}<br />
      <strong>${b(S)}:</strong> ${A}<br />
      <strong>${b(u.time||"Uhrzeit")}:</strong> ${b(d.uhrzeit||"")}<br />
    </p>
    ${go({maschine:d.qsMaschine,schaderreger:d.qsSchaderreger,verantwortlicher:d.qsVerantwortlicher,wetter:d.qsWetter,behandlungsart:d.qsBehandlungsart})}
    <div class="table-responsive">
      ${p}
    </div>
  `}function Lt(e,t){qn();const a=e.querySelector('[data-role="doc-list"]');if(!a)return;const r=e.querySelector("#doc-detail")?.dataset.entryId||null;if(!ut.length)a.innerHTML=Fe?'<div class="text-center text-muted py-4">Lädt ...</div>':'<div class="text-center text-muted py-4">Noch keine Einträge</div>';else{a.innerHTML="";const i=document.createDocumentFragment();(t||R().fieldLabels).history?.detail?.usageType,ut.forEach(o=>{const c=document.createElement("div"),u=!!kt?.highlightEntryIds?.has(o.id);c.className=`doc-sidebar-entry list-group-item${u?" doc-sidebar-entry--highlight":""}`,c.dataset.entryId=o.id;const d=As(o.entry)||"-",p=u?'<span class="badge bg-warning-subtle text-warning-emphasis badge-import">Import</span>':"";c.innerHTML=`
        <div
          class="doc-sidebar-entry__main"
          data-action="view-entry"
          data-entry-id="${o.id}"
        >
          <div class="d-flex justify-content-between gap-2">
            <span class="fw-bold d-flex align-items-center gap-2">
              ${b(o.entry.kultur||"-")}
              ${p}
            </span>
            <small class="text-muted">${b(d)}</small>
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
            <input type="checkbox" class="form-check-input" data-action="toggle-select" data-entry-id="${o.id}" ${qe.has(o.id)?"checked":""} />
            <span class="small">Auswahl</span>
          </label>
        </div>
      `,i.appendChild(c)}),a.appendChild(i)}vr(e,r),El(e,t),un(e),Hn(e),$s=new Date().toISOString(),Cl()}function Ca(e,t){const a=e.querySelector('[data-role="doc-info"]');if(!a)return;const n=Pe,r=!!(G.crop||G.creator);if(!n&&!Fe){a.textContent="Keine Einträge";return}if(!n&&Fe){a.textContent="Lädt...";return}if(G.startDate&&G.endDate){const i=`${G.startDate} - ${G.endDate} (${n})`;a.textContent=r?`${i} + Filter`:i;return}a.textContent=`Alle Einträge (${n})`}async function Ms(e,t){const n=e.querySelector("#doc-detail")?.dataset.entryId;if(!n){ya(e,null,t);return}const r=Nt(n);if(!r){ya(e,null,t);return}const i=await Ha(r);i?ya(e,{entry:r,detail:i},t):ya(e,null,t)}async function Rr(e,t,a=ee,n={}){const r=Math.max(0,a),i=!!n.forceReload;i&&(et.clear(),Re.clear(),Re.set(0,null),Pe=0,ue=[],ut=[],ee=0,Xe=null);const l=i?void 0:et.get(r);if(l&&!n.forceReload){ee=r,ue=l,Xe=null,Lt(e,t),Ca(e),un(e);return}const o=Re.has(r)?Re.get(r)??null:null,c=Symbol("doc-load");fa=c,Fe=!0,Xe=null,un(e);try{const u=await rs({cursor:o,pageSize:at,filters:Hr(G),sortDirection:"desc",includeTotal:i||r===0||Pe===0});if(fa!==c)return;const d=u.items.map(p=>Pl(p));if(et.set(r,d),Wl(r),Re.set(r,o),Re.set(r+1,u.nextCursor??null),typeof u.totalCount=="number")Pe=u.totalCount;else{const p=r*at+d.length;Pe=Math.max(Pe,p)}ee=r,ue=d,Xe=null,Lt(e,t),Ca(e,t)}catch(u){fa===c&&(console.error("Dokumentation konnte nicht geladen werden",u),Xe="Dokumentation konnte nicht geladen werden. Bitte erneut versuchen.",window.alert("Dokumentation konnte nicht geladen werden. Bitte erneut versuchen."))}finally{fa===c&&(Fe=!1,fa=null,un(e))}}async function Xl(e,t){const a=Te(t.history);ue=Rl(a.map((n,r)=>zl(n,r)).filter(n=>Kl(n.entry,G))),Pe=ue.length,ee=0,Xe=null,qn(),Lt(e,t.fieldLabels),Ca(e,t.fieldLabels),await Ms(e,t.fieldLabels)}async function ht(e,t){const a=ea(t),n=!!t.app?.hasDatabase,r=a==="sqlite"&&n;if(ke=r?"sqlite":"memory",Gt.clear(),ee=0,Xe=null,Pe=0,ue=[],ut=[],et.clear(),Re.clear(),Re.set(0,null),Ia(e),Or(e,t),Tn(e),Ma(e,t.archives?.logs??[]),dn=gr(t.archives?.logs),r){await Rr(e,t.fieldLabels,0,{forceReload:!0}),await Ms(e,t.fieldLabels);return}await Xl(e,t)}async function Yn(){const e=[];for(const t of qe){const a=xt.get(t)||Nt(t);if(!a)continue;const n=await Ha(a);n&&e.push(n)}return e}async function ec(e,t){if(!t){Ia(e),Lt(e,R().fieldLabels);return}if(qe.clear(),xt.clear(),ke==="memory")for(const a of ue)qe.add(a.id),xt.set(a.id,a);else try{const a=await is({filters:Hr(G),sortDirection:"desc",limit:1e4}),n=Array.isArray(a.historyIds)?a.historyIds:[];a.entries.forEach((r,i)=>{const l=Number(n[i]);if(!Number.isFinite(l))return;const o=Ut("sqlite",l);qe.add(o),xt.set(o,{id:o,entry:r,source:"sqlite",ref:l}),Gt.has(o)||Gt.set(o,r)})}catch(a){console.error("Alle Einträge konnten nicht ausgewählt werden",a),window.alert("Alle Einträge konnten nicht ausgewählt werden. Bitte erneut versuchen.")}Lt(e,R().fieldLabels),Hn(e)}async function tc(e,t){if(!qe.size)return;const a=Array.from(qe).map(o=>xt.get(o)||Nt(o)).filter(o=>!!o),n=[];for(const o of a){const c=await Ha(o);c&&n.push(c)}const r=a.filter(o=>o.source==="sqlite"),i=!!r.length;if(i)for(const o of r)await uo(o.ref);const l=new Set(a.filter(o=>o.source==="state").map(o=>o.ref));if(l.size&&(je("history",o=>{const c=Fa(o),u=c.items.filter((d,p)=>!l.has(p));return u.length===c.items.length?c:{...c,items:u,totalCount:Math.min(c.totalCount,u.length),lastUpdatedAt:new Date().toISOString()}}),await ac()),n.length){const o=new Set(n.map(c=>Kr(c)));zs(o)}if(i){try{await We()}catch(o){console.warn("SQLite-Datei konnte nach dem Löschen nicht gespeichert werden",o)}t.events?.emit?.("history:data-changed",{type:"deleted",ids:r.map(o=>o.ref)})}Ia(e),await ht(e,t.state.getState())}async function Is(e,t,a){const n=await Ha(t);if(!n){window.alert("Details konnten nicht geladen werden.");return}ya(e,{entry:t,detail:n},a)}async function Bi(e){const t=await Ha(e);t?await Cs([t]):window.alert("Eintrag konnte nicht geladen werden.")}async function ac(){const e=le();if(!(!e||e==="memory"||e==="sqlite"))try{const t=_e();await Ke(t)}catch(t){throw console.error("Persist history failed",t),window.alert("Historie konnte nicht gespeichert werden. Bitte erneut versuchen."),t}}async function nc(e,t,a){if(En)return;const n=t.state.getState();if(ea(n)!=="sqlite"||!n.app?.hasDatabase){Ee(e,"Archivieren ist nur mit einer lokalen SQLite-Datenbank möglich.","warning");return}const i=Bl(a);if(!i?.startDate||!i.endDate){Ee(e,"Bitte Start- und Enddatum für das Archiv wählen.","warning");return}const l=Sn(i.startDate),o=Sn(i.endDate);if(!l||!o){Ee(e,"Die angegebenen Daten sind ungültig.","danger");return}if(new Date(l)>new Date(o)){Ee(e,"Startdatum darf nicht nach dem Enddatum liegen.","danger");return}const c={startDate:l,endDate:o,creator:G.creator,crop:G.crop},u=Hr(c);Pi(e,!0),Ee(e,"Prüfe Zeitraum und Eintragsmenge...","info");try{const d=await rs({cursor:null,pageSize:1,filters:u,sortDirection:"asc",includeTotal:!0}),p=d.totalCount??d.items.length??0;if(!p){Ee(e,"Im angegebenen Zeitraum wurden keine Einträge gefunden.","warning");return}if(p>ki){Ee(e,`Maximal ${ki} Einträge pro Archiv erlaubt. Bitte Zeitraum verkürzen.`,"warning");return}Ee(e,`Exportiere ${p} Einträge in ein ZIP-Archiv...`,"info");const m=await is({filters:u,limit:p,sortDirection:"asc"}),x=m?.entries??[];if(!x.length){Ee(e,"Archiv konnte nicht erstellt werden – Export lieferte keine Einträge.","danger");return}const h=x.map(L=>({...L})),k={format:"pflanzenschutz-archive",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:h.length,filters:{startDate:l,endDate:o,creator:c.creator||null,crop:c.crop||null},archive:{removeFromDatabase:i.removeAfterExport,storageHint:i.storageHint||null,note:i.note||null}},S=ss({"pflanzenschutz.json":xn(JSON.stringify(h,null,2)),"metadata.json":xn(JSON.stringify(k,null,2))}),A=new ArrayBuffer(S.byteLength);new Uint8Array(A).set(S);const M=new Blob([A],{type:"application/zip"}),V=Nl(l,o);Wr(M,V);let W=!1;if(i.removeAfterExport){Ee(e,"Export abgeschlossen. Entferne Einträge und bereinige Datenbank...","info"),await so({filters:u});const L=new Set(h.map(z=>Kr(z)));zs(L);try{await We()}catch(z){console.error("SQLite-Datei konnte nach dem Archivieren nicht gespeichert werden",z)}t.events?.emit?.("history:data-changed",{type:"deleted-range",filters:u});try{await oo()}catch(z){W=!0,console.error("VACUUM fehlgeschlagen",z)}}const pe=new Date().toISOString(),F={id:`archive-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,archivedAt:pe,startDate:l,endDate:o,entryCount:h.length,fileName:V,storageHint:i.storageHint||void 0,note:i.note||void 0};W&&(F.note=F.note?`${F.note} | VACUUM fehlgeschlagen`:"VACUUM fehlgeschlagen");const te={filters:{...c},removeAfterExport:!!i.removeAfterExport,historyIdSample:m?.historyIds?.slice(0,Si)};if(await Tl(F,te),!i.removeAfterExport&&m?.historyIds?.length){const L=m.historyIds.slice(0,Si).map(z=>({source:"sqlite",ref:z}));t.events?.emit?.("documentation:focus-range",{startDate:l,endDate:o,label:"Archiviert",reason:"archive",entryIds:L})}fr(e,!1),a.reset(),Tn(e),await ht(e,t.state.getState());const B=i.removeAfterExport?`Archiv ${V} erstellt und ${h.length} Einträge entfernt.`:`Archiv ${V} erstellt. ${h.length} Einträge bleiben in der Datenbank.`;Ee(e,B,W?"warning":"success")}catch(d){console.error("Archivieren fehlgeschlagen",d);const p=d instanceof Error?d.message:"Archiv konnte nicht erstellt werden.";Ee(e,p,"danger")}finally{Pi(e,!1),Or(e,t.state.getState())}}const rc=50;async function Cs(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}if(e.length>rc&&!window.confirm(`Sie möchten ${e.length} Einträge drucken. Bei sehr vielen Einträgen kann das Erstellen der Druckvorschau einige Sekunden dauern und lässt sich nicht unterbrechen.

Fortfahren?`))return;const t=R().fieldLabels,a=lo(R().company||null);await co(e,t,{title:"Dokumentation",headerHtml:a,chunkSize:25})}function Wr(e,t){const a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download=t,n.click(),URL.revokeObjectURL(a)}function ic(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const t=e.map(l=>({...l})),a=JSON.stringify(t,null,2),n=new TextEncoder().encode(a),r=new Blob([n],{type:"application/json; charset=utf-8"}),i=new Date().toISOString().replace(/[:.]/g,"-");Wr(r,`pflanzenschutz-dokumentation-${i}.json`)}async function sc(e,t){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const a=e.map(c=>({...c})),n={format:"pflanzenschutz-export",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:a.length,filters:{startDate:t.startDate||null,endDate:t.endDate||null,creator:t.creator||null,crop:t.crop||null}},r=ss({"pflanzenschutz.json":xn(JSON.stringify(a,null,2)),"metadata.json":xn(JSON.stringify(n,null,2))}),i=new ArrayBuffer(r.byteLength);new Uint8Array(i).set(r);const l=new Blob([i],{type:"application/zip"}),o=new Date().toISOString().replace(/[:.]/g,"-");Wr(l,`pflanzenschutz-dokumentation-${o}.zip`)}function oc(){const e=document.createElement("div"),t=qr(),a=G.startDate||t.startDate||"",n=G.endDate||t.endDate||"";G={...G,startDate:a,endDate:n};const r=Yt.enabled?`<button class="btn btn-outline-info btn-sm" type="button" data-action="doc-seed">+ ${Yt.count} Dummy-Einträge</button>`:"";return e.className="section-inner",e.innerHTML=`
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
            <input type="text" class="form-control" id="doc-crop" name="doc-crop" placeholder="z. B. Äpfel" value="${G.crop||""}" />
          </div>
          <div class="col-md-3">
            <label class="form-label" for="doc-creator">Anwender (optional)</label>
            <input type="text" class="form-control" id="doc-creator" name="doc-creator" placeholder="Name" value="${G.creator||""}" />
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
            <small class="text-muted">Letzte ${Tr}</small>
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
  `,e}function lc(e){if(!e)return{};const t=new FormData(e),a=r=>{const i=t.get(r);return typeof i=="string"&&i?i:void 0},n=r=>{const i=t.get(r);if(typeof i!="string")return;const l=i.trim();return l||void 0};return{startDate:a("doc-start"),endDate:a("doc-end"),crop:n("doc-crop"),creator:n("doc-creator")}}let Ni="entries";function cc(e,t){Ni!==t&&(Ni=t,e.querySelectorAll("[data-doc-tab]").forEach(a=>{a.classList.toggle("active",a.dataset.docTab===t)}),e.querySelectorAll("[data-pane]").forEach(a=>{a.style.display=a.dataset.pane===t?"block":"none"}))}function dc(e,t){e.addEventListener("click",a=>{const n=a.target.closest("[data-doc-tab]");if(n&&n.dataset.docTab){cc(e,n.dataset.docTab);return}}),e.addEventListener("submit",a=>{if(a.target instanceof HTMLFormElement){if(a.target.id==="doc-filter"){a.preventDefault(),Qn(e,t,{refreshList:!0});const n=lc(a.target);if(!n.startDate||!n.endDate){window.alert("Bitte Start- und Enddatum auswählen.");return}G=n,Ia(e),ht(e,t.state.getState());return}a.target.dataset.role==="archive-form"&&(a.preventDefault(),nc(e,t,a.target))}}),e.addEventListener("click",a=>{const n=a.target;if(!n)return;const r=n.dataset.action;if(!r){n.closest("[data-action]")&&a.stopPropagation();return}if(r==="reset-filters"){const o=e.querySelector("#doc-filter");o?.reset(),G=qr(),Ls(o??null,G),Qn(e,t,{refreshList:!0}),Ia(e),ht(e,t.state.getState());return}if(r==="archive-toggle"){fr(e),Ee(e,"");return}if(r==="archive-cancel"){fr(e,!1),Ee(e,"");return}if(r==="archive-log-focus"){const o=n.dataset.logId;if(!o)return;const c=Mi(t.state.getState(),o);if(!c){window.alert("Archiv-Eintrag nicht gefunden.");return}const u=c.fileName?`Archiv ${c.fileName}`:"Archivierter Zeitraum";typeof t.events?.emit=="function"?t.events.emit("documentation:focus-range",{startDate:c.startDate,endDate:c.endDate,label:u,reason:"archive-log"}):(G={...G,startDate:c.startDate,endDate:c.endDate},ht(e,t.state.getState())),Ee(e,`Dokumentation auf Archiv ${c.startDate} – ${c.endDate} fokussiert.`,"success");return}if(r==="archive-log-copy-hint"){const o=n.dataset.logId;if(!o)return;const c=Mi(t.state.getState(),o);if(!c||!c.storageHint){window.alert("Kein Speicherhinweis vorhanden.");return}const u=c.storageHint;(async()=>{try{await Hl(u),Ee(e,"Speicherhinweis kopiert.","success")}catch(d){console.error("Hinweis konnte nicht kopiert werden",d),window.alert("Hinweis konnte nicht kopiert werden.")}})();return}if(r==="doc-focus-clear"){Qn(e,t,{refreshList:!0});return}if(r==="print-selection"||r==="pdf-selection"){(async()=>{const o=await Yn();await Cs(o)})();return}if(r==="export-selection"){(async()=>{const o=await Yn();ic(o)})();return}if(r==="export-zip"){(async()=>{const o=await Yn();await sc(o,G)})();return}if(r==="delete-selection"){if(!qe.size||!window.confirm("Ausgewählte Einträge wirklich löschen?"))return;tc(e,t);return}if(r==="doc-seed"){if(!Yt.enabled||La)return;const c=window.__PSL?.seedHistoryEntries;if(typeof c!="function"){window.alert("Seed-Funktion ist nicht verfügbar. Bitte Entwicklungsmodus verwenden.");return}La=!0,hr(e),(async()=>{try{await c(Yt.count),await ht(e,t.state.getState())}catch(u){console.error("Dummy-Daten konnten nicht erstellt werden",u),window.alert("Dummy-Daten konnten nicht erstellt werden.")}finally{La=!1,hr(e)}})();return}if(r==="detail-print"){const c=e.querySelector("#doc-detail")?.dataset.entryId;if(!c){window.alert("Kein Eintrag ausgewählt.");return}const u=Nt(c);if(!u){window.alert("Eintrag nicht verfügbar.");return}Bi(u);return}const i=n.dataset.entryId;if(!i)return;const l=Nt(i);if(!l){window.alert("Eintrag nicht verfügbar.");return}if(r==="view-entry"){Is(e,l,t.state.getState().fieldLabels);return}if(r==="print-entry"){Bi(l);return}}),e.addEventListener("change",a=>{const n=a.target;if(!n)return;if(n.dataset.action==="toggle-select-all"){ec(e,n.checked);return}if(n.dataset.action!=="toggle-select")return;const r=n.dataset.entryId;if(r){if(n.checked){qe.add(r);const i=Nt(r);i&&xt.set(r,i)}else qe.delete(r),xt.delete(r);Hn(e)}})}function uc(e,t){if(!e||Di)return;const a=e;a.innerHTML="";const n=oc();a.appendChild(n),dc(n,t),hr(n),Or(n,t.state.getState()),Tn(n);const r=t.state.getState().archives?.logs??[];Ma(n,r),dn=gr(r),_r(),typeof t.events?.subscribe=="function"&&t.events.subscribe("documentation:focus-range",o=>{!o||typeof o!="object"||Ll(n,t,o)});const i=o=>Te(o.history).length,l=()=>ht(n,t.state.getState());zi?.(),zi=ws({section:"documentation",event:"history:data-changed",shouldHandleEvent:()=>ke==="sqlite",shouldRefresh:()=>ke==="sqlite",onRefresh:()=>l(),onStatusChange:o=>Sl(n,o)}),ga=i(t.state.getState()),l(),t.state.subscribe(o=>{const c=gr(o.archives?.logs);c!==dn&&(dn=c,Ma(n,o.archives?.logs??[]));const u=i(o);if(mr){ga=u;return}if(ke==="sqlite"){ga=u;return}u!==ga&&(ga=u,l())}),Di=!0}const Ba=e=>Te(e.gps.points),wa=e=>Te(e.points),pc=new Intl.NumberFormat("de-DE",{minimumFractionDigits:5,maximumFractionDigits:5}),mc=new Intl.DateTimeFormat("de-DE",{dateStyle:"short",timeStyle:"short"}),Fi="Deutschland";let Ti=!1,Bs="list",nn=null,$=null,ba=null,qi=null;const pn=25,Xn=new Intl.NumberFormat("de-DE");let Le=0,Rt=null,yr=null,Hi=null;function _t(e,t){typeof e.events?.emit=="function"&&e.events.emit("history:gps-activation-result",{...t,source:"gps",timestamp:Date.now()})}function Da(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function fc(){const e=document.createElement("section");return e.className="section-inner",e.innerHTML=`
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
  `,e}function gc(e){return{root:e,message:e.querySelector('[data-role="gps-message"]'),refreshIndicator:e.querySelector('[data-role="gps-refresh-indicator"]'),availability:e.querySelector('[data-role="gps-availability"]'),tabButtons:Array.from(e.querySelectorAll('[data-role="gps-tab"]')),panels:Array.from(e.querySelectorAll('[data-role="gps-panel"]')),listBody:e.querySelector('[data-role="gps-list"]'),emptyState:e.querySelector('[data-role="gps-empty"]'),activeInfo:e.querySelector('[data-role="gps-active-info"]'),summaryLabel:e.querySelector('[data-role="gps-summary"]'),statusBadge:e.querySelector('[data-role="gps-status"]'),form:e.querySelector('[data-role="gps-form"]'),formFields:{name:e.querySelector('[name="gps-name"]'),description:e.querySelector('[name="gps-description"]'),latitude:e.querySelector('[name="gps-latitude"]'),longitude:e.querySelector('[name="gps-longitude"]'),source:e.querySelector('[name="gps-source"]'),activate:e.querySelector('[name="gps-activate"]'),rawCoordinates:e.querySelector('[name="gps-raw-coordinates"]')},disableTargets:Array.from(e.querySelectorAll("[data-gps-disable]")),geolocationBtn:e.querySelector('[data-action="use-geolocation"]'),mapButton:e.querySelector('[data-role="gps-open-maps"]'),verifyButton:e.querySelector('[data-action="verify-coords"]')}}function xa(e){return`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e)}`}function Ns(e){const t=e.gps,a=wa(t),n=l=>{if(!l)return null;const o=Ta(l)||xa(`${l.latitude},${l.longitude}`),c=l.name?`${l.name}`:`${Xt(l.latitude)}, ${Xt(l.longitude)}`;return{url:o,label:c}};if(t.activePointId){const l=a.find(c=>c.id===t.activePointId),o=n(l||null);if(o)return o}if(a.length>0){const l=n(a[0]);if(l)return l}const r=e.company?.address?.trim();if(r)return{url:xa(r.replace(/\n/g,", ")),label:r};const i=e.company?.name?.trim();return i?{url:xa(i),label:i}:{url:xa(Fi),label:Fi}}function bc(e){if(!$)return;const t=Ns(e);$.mapButton&&($.mapButton.href=t.url,$.mapButton.title=`Google Maps öffnen (${t.label})`);const a=$.root.querySelector('[data-role="gps-empty-map-link"]');a&&(a.href=t.url)}function hc(e){if(!e)return null;const a=e.trim().replace(/\s+/g," ").replace(/[,;]/g," ").match(/-?\d+(?:[.,]\d+)?/g);if(!a||a.length<2)return null;const n=l=>Number(l.replace(/,/g,".")),r=n(a[0]),i=n(a[1]);return!Number.isFinite(r)||!Number.isFinite(i)||r<-90||r>90||i<-180||i>180?null:{latitude:r,longitude:i}}function vc(){if(!$?.formFields)return null;const e=$.formFields.latitude?.value??"",t=$.formFields.longitude?.value??"";if(!e.trim()||!t.trim())return null;const a=Number(e),n=Number(t);return!Number.isFinite(a)||!Number.isFinite(n)||a<-90||a>90||n<-180||n>180?null:{latitude:a,longitude:n}}function rn(e){return Number(e).toFixed(6)}function yc(e,t){const a=rn(e),n=rn(t);return Ba(R()).some(r=>rn(r.latitude)===a&&rn(r.longitude)===n)}function $a(){if(!$?.verifyButton)return;const e=vc(),t=!!e;if($.verifyButton.disabled=!t,e){const a=Ta({latitude:e.latitude,longitude:e.longitude});$.verifyButton.dataset.targetUrl=a||xa(`${e.latitude},${e.longitude}`)}else delete $.verifyButton.dataset.targetUrl}function Xt(e){const t=Number(e);return Number.isFinite(t)?`${pc.format(t)}°`:"–"}function wc(e){if(!e)return"–";const t=new Date(e);return Number.isNaN(t.getTime())?"–":mc.format(t)}function ie(e,t="info",a=4500){if($?.message){if(nn&&(window.clearTimeout(nn),nn=null),!e){$.message.classList.add("d-none"),$.message.textContent="";return}$.message.className=`alert alert-${t}`,$.message.textContent=e,$.message.classList.remove("d-none"),a>0&&(nn=window.setTimeout(()=>{$?.message?.classList.add("d-none")},a))}}function xc(e){const t=$?.refreshIndicator;if(t){if(t.classList.remove("alert-warning","alert-info"),e==="idle"){t.classList.add("d-none");return}t.classList.remove("d-none"),e==="stale"?(t.classList.add("alert-warning"),t.textContent="GPS-Daten wurden geändert. Ansicht aktualisiert sich beim Öffnen."):(t.classList.add("alert-info"),t.textContent="GPS-Daten werden aktualisiert...")}}function Fs(e){$&&(Bs=e,$.tabButtons.forEach(t=>{const a=t.dataset.tab===e;t.classList.toggle("active",a)}),$.panels.forEach(t=>{const a=t.getAttribute("data-panel")===e;t.classList.toggle("d-none",!a)}))}function He(e){return e?.hasDatabase?e.storageDriver!=="sqlite"?"wrong-driver":"ok":"no-db"}function kc(e){if($?.availability){if(e==="ok"){$.availability.classList.add("d-none"),$.availability.textContent="";return}$.availability.classList.remove("d-none"),$.availability.textContent=e==="no-db"?"Bitte verbinden Sie zuerst eine Datenbank, um GPS-Punkte zu verwalten.":"GPS-Funktionen benötigen eine aktive SQLite-Datenbank. Bitte den SQLite-Treiber in den Einstellungen auswählen."}}function Vt(e,t){if(!$)return;const a=t!=="ok"||e.pending||Pa.isLocked();if($.disableTargets.forEach(n=>{(n instanceof HTMLButtonElement||n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n instanceof HTMLSelectElement)&&(n.disabled=a)}),$.statusBadge){let n="badge bg-success",r="Bereit";t==="no-db"?(n="badge bg-secondary",r="Keine Datenbank"):t==="wrong-driver"?(n="badge bg-warning text-dark",r="Nur mit SQLite"):(e.pending||Pa.isLocked())&&(n="badge bg-info text-dark",r="Wird verarbeitet"),$.statusBadge.className=n,$.statusBadge.textContent=r}}function Ts(e){const t=e.length;if(!t)return Le=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/pn),1);Le>=a&&(Le=a-1),Le<0&&(Le=0);const n=Le*pn,r=Math.min(n+pn,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function Sc(){if(!$?.root)return null;const e=$.root.querySelector('[data-role="gps-pager"]');return e?((!Rt||yr!==e)&&(Rt?.destroy(),Rt=qa(e,{onPrev:()=>Lc(),onNext:()=>Dc(),labels:{prev:"Zurück",next:"Weiter",loading:"GPS-Punkte werden geladen...",empty:"Keine GPS-Punkte verfügbar"}}),yr=e),Rt):null}function Oi(e,t){const a=Sc();if(!a)return;if(t!=="ok"){Le=0;const l=t==="no-db"?"Keine Datenbank verbunden.":"Nur mit SQLite verfügbar.";a.update({status:"disabled",info:l});return}const n=Ba(e).length;if(!n){Le=0;const l=e.gps.initialized?"Noch keine GPS-Punkte vorhanden.":"GPS-Punkte werden geladen...";a.update({status:"disabled",info:l});return}const{start:r,end:i}=Ts(Ba(e));a.update({status:"ready",info:`Einträge ${Xn.format(r+1)}–${Xn.format(i)} von ${Xn.format(n)}`,canPrev:Le>0,canNext:i<n})}function Ec(e,t){return e.length?e.map(a=>{const n=a.id===t,r=a.description?`<div class="text-muted small">${b(a.description)}</div>`:"",i=a.source?`<span class="badge-psm badge-psm-neutral">${b(a.source)}</span>`:'<span class="text-muted">–</span>',l=n?'<span class="badge bg-success ms-2">Aktiv</span>':"",o=Ta(a),c=o?`<a class="btn btn-outline-info" href="${Da(o)}" target="_blank" rel="noopener noreferrer">
              Karte
            </a>`:"";return`
        <tr data-point-id="${Da(a.id)}">
          <td>
            <div class="fw-semibold">${b(a.name||"Ohne Namen")}${l}</div>
            ${r}
          </td>
          <td class="font-monospace">
            <div>${Xt(a.latitude)}</div>
            <div>${Xt(a.longitude)}</div>
          </td>
          <td>
            <div>${i}</div>
            <div class="text-muted small">${wc(a.updatedAt)}</div>
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
`):""}function jr(e,t){if(!$)return;const a=e.gps,n=Ns(e),r=t==="ok";if($.summaryLabel){const i=wa(a).length;$.summaryLabel.textContent=r?`${i} Punkt${i===1?"":"e"} gespeichert`:"Funktion derzeit nicht verfügbar"}if(!r){$.listBody&&($.listBody.innerHTML=""),$.emptyState&&($.emptyState.textContent=t==="no-db"?"Keine Datenbank verbunden.":"Bitte SQLite als Speicher-Treiber aktivieren.",$.emptyState.classList.remove("d-none")),$.activeInfo&&($.activeInfo.textContent=t==="no-db"?"Wartet auf Datenbank.":"Nur mit SQLite verfügbar."),Oi(e,t);return}if($.listBody){const{items:i}=Ts(wa(a));$.listBody.innerHTML=Ec(i,a.activePointId)}if($.emptyState){const i=wa(a).length>0;$.emptyState.classList.toggle("d-none",i),!i&&a.initialized?$.emptyState.innerHTML=`
        <p class="mb-2">Noch keine GPS-Punkte vorhanden.</p>
        <p class="small text-muted mb-3">
          Nutzen Sie "Neuer Punkt" oder öffnen Sie Google Maps, um Koordinaten zu ermitteln.
        </p>
        <a class="btn btn-outline-info btn-sm" data-role="gps-empty-map-link" href="${Da(n.url)}" target="_blank" rel="noopener noreferrer">
          <i class="bi bi-box-arrow-up-right me-1"></i>
          Google Maps öffnen
        </a>
      `:a.initialized||($.emptyState.textContent="GPS-Punkte werden geladen...")}if($.activeInfo)if(a.activePointId){const i=wa(a).find(l=>l.id===a.activePointId);if(i){const l=`${i.name||"Ohne Namen"} (${Xt(i.latitude)}, ${Xt(i.longitude)})`,o=Ta(i);o?$.activeInfo.innerHTML=`${b(l)} <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${Da(o)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:$.activeInfo.textContent=l}else $.activeInfo.textContent="Aktiver Punkt nicht gefunden."}else $.activeInfo.innerHTML=`Kein aktiver Punkt ausgewählt. <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${Da(n.url)}" target="_blank" rel="noopener noreferrer">Google Maps öffnen</a>`;Oi(e,t)}function Lc(){if(Le===0)return;Le=Math.max(Le-1,0);const e=R(),t=He(e.app);jr(e,t)}function Dc(){const e=R(),t=Ba(e).length;if(!t)return;const a=Math.max(Math.ceil(t/pn)-1,0);if(Le>=a)return;Le=Math.min(Le+1,a);const n=He(e.app);jr(e,n)}function Ae(e){`${new Date().toLocaleString("de-DE")}${e}`}function Oa(e){if(!e)return null;const t=R();return Ba(t).find(a=>a.id===e)||null}async function $c(e){if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(e);return}const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}function Ac(){if(!$?.formFields?.rawCoordinates)return;const e=$.formFields.rawCoordinates.value,t=hc(e);if(!t){ie("Koordinaten konnten nicht erkannt werden. Bitte Format 47.68952, 9.12091 verwenden.","warning",6e3);return}const a=t.latitude.toFixed(6),n=t.longitude.toFixed(6);$.formFields.latitude&&($.formFields.latitude.value=a),$.formFields.longitude&&($.formFields.longitude.value=n),ie("Koordinaten übernommen.","success"),$a()}function zc(){if(!$?.verifyButton)return;const e=$.verifyButton.dataset.targetUrl;if(!e){ie("Bitte zuerst gültige Koordinaten eintragen, bevor die Prüfung geöffnet wird.","warning",6e3);return}window.open(e,"_blank","noopener,noreferrer")}async function wr(e={}){const{notify:t=!1}=e;if(!(!$||He(R().app)!=="ok"||R().gps.pending))try{await ns(),t&&ie("GPS-Punkte aktualisiert.","success"),Ae("GPS-Punkte synchronisiert.")}catch(n){const r=n instanceof Error?n.message:"GPS-Punkte konnten nicht geladen werden.";ie(r,"danger",7e3),Ae(`Fehler beim Laden: ${r}`)}}async function Pc(e){if(!e)return;const t=Oa(e);if(!t){ie("Ausgewählter GPS-Punkt wurde nicht gefunden.","warning");return}try{await ls(t.id),ie(`"${t.name}" ist nun aktiv.`,"success"),Ae(`Aktiver GPS-Punkt: ${t.name}`)}catch(a){const n=a instanceof Error?a.message:"GPS-Punkt konnte nicht aktiviert werden.";ie(n,"danger",7e3),Ae(`Fehler beim Aktivieren: ${n}`)}}async function Mc(e){if(!e)return;const t=Oa(e);if(!t){ie("GPS-Punkt existiert nicht mehr.","warning");return}if(window.confirm(`"${t.name}" wirklich löschen? Dieser Schritt kann nicht rückgängig gemacht werden.`))try{await vo(t.id),ie(`"${t.name}" wurde gelöscht.`,"success"),Ae(`GPS-Punkt gelöscht: ${t.name}`)}catch(n){const r=n instanceof Error?n.message:"GPS-Punkt konnte nicht gelöscht werden.";ie(r,"danger",7e3),Ae(`Löschen fehlgeschlagen: ${r}`)}}async function Ic(e){if(!e)return;const t=Oa(e);if(!t){ie("GPS-Punkt nicht gefunden.","warning");return}const a=`${t.latitude}, ${t.longitude}`;try{await $c(a),ie("Koordinaten in die Zwischenablage kopiert.","success")}catch(n){console.error("clipboard error",n),ie("Koordinaten konnten nicht kopiert werden.","danger",7e3)}}async function Cc(e,t){const a=(e||"").trim();if(!a){_t(t,{status:"error",id:"",message:"Ungültige GPS-Anfrage ohne ID."});return}if(He(R().app)!=="ok"){ie("GPS-Modul ist ohne aktive SQLite-Datenbank nicht verfügbar.","warning",6e3),_t(t,{status:"error",id:a,message:"GPS-Modul ist derzeit nicht verfügbar."});return}const r=Oa(a);if(!r){ie("Verknüpfter GPS-Punkt wurde nicht gefunden.","warning",6e3),_t(t,{status:"error",id:a,message:"Verknüpfter GPS-Punkt wurde nicht gefunden."});return}_t(t,{status:"pending",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wird aktiviert...`});try{await ls(r.id),ie(`"${r.name||"Ohne Namen"}" wurde aus der Historie aktiviert.`,"success"),Ae(`Aus Historie aktiviert: ${r.name||r.id}`),_t(t,{status:"success",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wurde aktiviert.`})}catch(i){const l=i instanceof Error?i.message:"GPS-Punkt konnte nicht aktiviert werden.";ie(l,"danger",7e3),Ae(`Aktivierung aus Historie fehlgeschlagen: ${l}`),_t(t,{status:"error",id:r.id,name:r.name,message:l})}}async function Bc(){try{await yo(),Ae("Aktiver GPS-Punkt synchronisiert."),ie("Aktiver GPS-Punkt wurde synchronisiert.","success")}catch(e){const t=e instanceof Error?e.message:"Aktiver GPS-Punkt konnte nicht ermittelt werden.";ie(t,"danger",7e3),Ae(`Sync fehlgeschlagen: ${t}`)}}function Nc(){if(!$?.formFields)throw new Error("Formular nicht initialisiert");const e=$.formFields.name?.value.trim()||"",t=$.formFields.description?.value.trim()||"",a=$.formFields.source?.value.trim()||"",n=Number($.formFields.latitude?.value),r=Number($.formFields.longitude?.value),i=!!$.formFields.activate?.checked;if(!e)throw new Error("Name darf nicht leer sein.");if(!Number.isFinite(n)||!Number.isFinite(r))throw new Error("Koordinaten sind ungültig.");return{name:e,description:t,latitude:n,longitude:r,source:a,activate:i}}async function Fc(e){if(e.preventDefault(),Pa.isLocked()){ie("Speichern läuft bereits ...","info");return}try{const t=Nc();if(yc(t.latitude,t.longitude)){ie("Ein GPS-Punkt mit identischen Koordinaten ist bereits vorhanden.","warning",6e3);return}Vt(R().gps,He(R().app)),await wo({name:t.name,description:t.description||null,latitude:t.latitude,longitude:t.longitude,source:t.source||null},{activate:t.activate}),T.success(`GPS-Punkt "${t.name}" gespeichert.`),Ae(`GPS-Punkt gespeichert${t.activate?" und aktiv gesetzt":""}: ${t.name}`),$?.form?.reset()}catch(t){const a=t instanceof Error?t.message:"GPS-Punkt konnte nicht gespeichert werden.";T.error(a),Ae(`Speichern fehlgeschlagen: ${a}`)}finally{Vt(R().gps,He(R().app))}}function Tc(){if($?.formFields){if(!navigator.geolocation){T.warning("Geolocation wird von diesem Browser nicht unterstützt.");return}if(Pa.isLocked()){T.info("Bitte warten...");return}Pa.acquire(async()=>(Vt(R().gps,He(R().app)),new Promise(e=>{navigator.geolocation.getCurrentPosition(t=>{const{latitude:a,longitude:n}=t.coords;$?.formFields.latitude&&($.formFields.latitude.value=a.toFixed(6)),$?.formFields.longitude&&($.formFields.longitude.value=n.toFixed(6)),$?.formFields.source&&!$.formFields.source.value.trim()&&($.formFields.source.value="Browser"),T.success("Koordinaten aus Browser-Position übernommen."),Ae("Browser-Geolocation übernommen"),$a(),Vt(R().gps,He(R().app)),e()},t=>{const a=t.code===t.PERMISSION_DENIED?"Zugriff auf Standort wurde verweigert.":"Geolocation konnte nicht ermittelt werden.";T.warning(a),Ae(`Geolocation fehlgeschlagen: ${a}`),Vt(R().gps,He(R().app)),e()},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})})))}}function qc(){$&&($.root.addEventListener("click",e=>{const t=e.target;if(!t)return;const a=t.closest('[data-role="gps-tab"]');if(a&&a.dataset.tab){Fs(a.dataset.tab);return}const n=t.closest("[data-action]");if(!n||n.dataset.action==="")return;const i=n.closest("[data-point-id]")?.getAttribute("data-point-id")||"";switch(n.dataset.action){case"reload-points":wr({notify:!0});break;case"sync-active":Bc();break;case"set-active":Pc(i);break;case"delete-point":Mc(i);break;case"copy-coords":Ic(i);break;case"use-geolocation":Tc();break;case"apply-raw-coords":Ac();break;case"verify-coords":zc();break}}),$.form?.addEventListener("submit",e=>{Fc(e)}),$.form?.addEventListener("reset",()=>{window.setTimeout(()=>{$a()},0)}),$.formFields.latitude?.addEventListener("input",()=>{$a()}),$.formFields.longitude?.addEventListener("input",()=>{$a()}))}function Hc(e,t){if(!e||Ti)return;Ti=!0;const a=e;a.innerHTML="";const n=fc();a.appendChild(n),$=gc(n),Hi?.(),Hi=ws({section:"gps",event:"gps:data-changed",shouldHandleEvent:()=>He(t.state.getState().app)==="ok",shouldRefresh:()=>He(t.state.getState().app)==="ok",onRefresh:()=>wr({notify:!1}),onStatusChange:l=>xc(l)}),Le=0,Rt?.destroy(),Rt=null,yr=null,qc(),Fs(Bs),typeof t.events?.subscribe=="function"&&t.events.subscribe("gps:set-active-from-history",l=>{let o="";if(l&&typeof l=="object"&&(o=String(l.id||"").trim()),!o){ie("Historische GPS-Anfrage ohne gültige ID erhalten.","warning",6e3);return}Cc(o,t)});const r=t.state.getState();ba=r.gps.activePointId;const i=(l,o)=>{const c=He(l.app),u=l.gps;if(kc(c),jr(l,c),Vt(u,c),bc(l),c==="ok"&&!u.initialized&&!u.pending&&wr({notify:!1}),c==="ok"&&qi!=="ok"&&u.initialized&&ie("GPS-Bereich ist wieder verfügbar.","success"),qi=c,l.gps.activePointId!==ba&&(ba=l.gps.activePointId,typeof t.events?.emit=="function")){const d=Oa(ba);t.events.emit("gps:active-point-changed",{id:ba,point:d})}l.gps.lastError&&l.gps.lastError!==o.gps.lastError&&(ie(l.gps.lastError,"danger",7e3),Ae(`Fehler: ${l.gps.lastError}`))};t.state.subscribe(i),i(r,r)}let Me=[],Ie=[],xr=!1,mn=null;async function rt(){try{const[e,t]=await Promise.all([Lo({limit:100}),Do({limit:100})]);Me=e.items||[],Ie=t.items||[],yn("savedCodes:changed",{eppoCount:Me.length,bbchCount:Ie.length})}catch(e){console.error("Failed to load saved codes:",e),Me=[],Ie=[]}}function Oc(){const e=Me.length>0,t=Ie.length>0;return`
    <div class="row g-4">
      <!-- EPPO Codes Section -->
      <div class="col-lg-6">
        <div class="card card-dark codes-card h-100">
          <div class="card-header codes-card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="bi bi-flower1 me-2 text-success"></i>
              Kulturen (EPPO-Codes)
            </h5>
            <span class="badge badge-psm-neutral">${Me.length} gespeichert</span>
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
                  <span class="badge bg-success ms-2">${Me.length}</span>
                </h6>
                <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${kr()}
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
            <span class="badge badge-psm-neutral">${Ie.length} gespeichert</span>
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
                  <span class="badge bg-info ms-2">${Ie.length}</span>
                </h6>
                <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${Sr()}
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
  `}function kr(){return Me.length?Me.map(e=>`
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
    `}function Sr(){return Ie.length?Ie.map(e=>`
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
    `}function it(e){const t=e.querySelector('[data-role="saved-eppo-list"]'),a=Me.length>0;if(t){const o=t.closest(".border-top");o&&a&&(o.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Kulturen
            <span class="badge bg-success ms-2">${Me.length}</span>
          </h6>
          <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${kr()}
          </div>
        `)}else if(a){const o=e.querySelector(".codes-card:first-child .border-top.pt-3.mb-3");o&&(o.innerHTML=`
        <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
          <i class="bi bi-bookmark-star me-1"></i>
          Meine Kulturen
          <span class="badge bg-success ms-2">${Me.length}</span>
        </h6>
        <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
          ${kr()}
        </div>
      `)}const n=e.querySelector('[data-role="saved-bbch-list"]'),r=Ie.length>0;if(n){const o=n.closest(".border-top");o&&r&&(o.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${Ie.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Sr()}
          </div>
        `)}else if(r){const c=e.querySelectorAll(".codes-card")[1];if(c){const u=c.querySelector(".border-top.pt-3.mb-3");u&&(u.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${Ie.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Sr()}
          </div>
        `)}}const i=e.querySelector(".codes-card:first-child .card-header .badge"),l=e.querySelector(".codes-card:last-child .card-header .badge");i&&(i.textContent=`${Me.length} gespeichert`),l&&(l.textContent=`${Ie.length} gespeichert`)}function _c(e){const t=e.querySelector('[data-input="eppo-search"]'),a=e.querySelector('[data-role="eppo-search-results"]');if(t&&a){const o=Yr(async()=>{const c=t.value.trim();if(c.length<2){a.innerHTML="";return}try{const u=await So(c,10);if(!u.length){a.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${b(c)}"</div>
          `;return}a.innerHTML=u.map(d=>`
          <button type="button" class="list-group-item list-group-item-action" 
                  data-action="select-eppo" 
                  data-code="${b(d.code)}" 
                  data-name="${b(d.name)}"
                  data-language="${b(d.language||"")}"
                  data-dtcode="${b(d.dtcode||"")}">
            <strong class="text-success">${b(d.code)}</strong>
            <span class="ms-2">${b(d.name)}</span>
            ${d.dtcode?`<small class="text-muted ms-2">(${b(d.dtcode)})</small>`:""}
          </button>
        `).join("")}catch(u){console.error("EPPO search failed:",u),a.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);t.addEventListener("input",o)}const n=e.querySelector('[data-input="bbch-search"]'),r=e.querySelector('[data-role="bbch-search-results"]');if(n&&r){const o=Yr(async()=>{const c=n.value.trim();if(c.length<1){r.innerHTML="";return}try{const u=await Eo(c,10);if(!u.length){r.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${b(c)}"</div>
          `;return}r.innerHTML=u.map(d=>`
          <button type="button" class="list-group-item list-group-item-action d-flex align-items-start gap-2 py-2" 
                  data-action="select-bbch" 
                  data-code="${b(d.code)}" 
                  data-label="${b(d.label)}"
                  data-principal="${d.principalStage??""}"
                  data-secondary="${d.secondaryStage??""}">
            <strong class="text-info flex-shrink-0" style="min-width: 35px;">${b(d.code)}</strong>
            <span class="text-break" style="line-height: 1.4;">${b(d.label)}</span>
          </button>
        `).join("")}catch(u){console.error("BBCH search failed:",u),r.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);n.addEventListener("input",o)}e.dataset.codesClickBound!=="1"&&(e.dataset.codesClickBound="1",e.addEventListener("click",async o=>{const u=o.target.closest("[data-action]");if(!u)return;const d=u.dataset.action;if(d==="select-eppo"){const p=u.dataset.code||"",m=u.dataset.name||"",x=u.dataset.language||"",h=u.dataset.dtcode||"";if(!p||!m){console.warn("EPPO selection missing code or name");return}a&&(a.innerHTML=""),t&&(t.value="");const k=Me.find(S=>S.code.toUpperCase()===p.toUpperCase());if(k){const S=e.querySelector(`[data-eppo-id="${k.id}"]`);S&&(S.classList.add("flash-highlight"),setTimeout(()=>S.classList.remove("flash-highlight"),800));return}try{await Gn({code:p,name:m,language:x||void 0,dtcode:h||void 0,isFavorite:!1});const S=_e();await Ke(S),await rt(),it(e)}catch(S){console.error("Failed to save EPPO from search:",S),alert("Speichern fehlgeschlagen")}}if(d==="select-bbch"){const p=u.dataset.code||"",m=u.dataset.label||"",x=u.dataset.principal,h=u.dataset.secondary,k=x?parseInt(x,10):void 0,S=h?parseInt(h,10):void 0;if(!p||!m){console.warn("BBCH selection missing code or label");return}r&&(r.innerHTML=""),n&&(n.value="");const A=Ie.find(M=>M.code===p);if(A){const M=e.querySelector(`[data-bbch-id="${A.id}"]`);M&&(M.classList.add("flash-highlight"),setTimeout(()=>M.classList.remove("flash-highlight"),800));return}try{await Un({code:p,label:m,principalStage:Number.isNaN(k)?void 0:k,secondaryStage:Number.isNaN(S)?void 0:S,isFavorite:!1});const M=_e();await Ke(M),await rt(),it(e)}catch(M){console.error("Failed to save BBCH from search:",M),alert("Speichern fehlgeschlagen")}}if(d==="toggle-favorite-eppo"){const p=u.dataset.id;if(!p)return;const m=Me.find(x=>x.id===p);if(!m)return;try{await Gn({id:m.id,code:m.code,name:m.name,language:m.language,dtcode:m.dtcode,isFavorite:!m.isFavorite});const x=_e();await Ke(x),await rt(),it(e)}catch(x){console.error("Failed to toggle EPPO favorite:",x)}}if(d==="toggle-favorite-bbch"){const p=u.dataset.id;if(!p)return;const m=Ie.find(x=>x.id===p);if(!m)return;try{await Un({id:m.id,code:m.code,label:m.label,principalStage:m.principalStage,secondaryStage:m.secondaryStage,isFavorite:!m.isFavorite});const x=_e();await Ke(x),await rt(),it(e)}catch(x){console.error("Failed to toggle BBCH favorite:",x)}}if(d==="delete-eppo"){const p=u.dataset.id;if(!p||!confirm("EPPO-Code wirklich löschen?"))return;try{await xo({id:p});const m=_e();await Ke(m),await rt(),it(e)}catch(m){console.error("Failed to delete EPPO:",m)}}if(d==="delete-bbch"){const p=u.dataset.id;if(!p||!confirm("BBCH-Stadium wirklich löschen?"))return;try{await ko({id:p});const m=_e();await Ke(m),await rt(),it(e)}catch(m){console.error("Failed to delete BBCH:",m)}}}));const i=e.querySelector('[data-form="add-eppo"]');i&&i.addEventListener("submit",async o=>{o.preventDefault();const c=e.querySelector('[data-input="eppo-code"]'),u=e.querySelector('[data-input="eppo-name"]'),d=e.querySelector('[data-input="eppo-favorite"]'),p=c?.value.trim(),m=u?.value.trim();if(!p||!m){alert("Bitte Code und Name eingeben");return}try{await Gn({code:p,name:m,isFavorite:d?.checked||!1});const x=_e();await Ke(x),await rt(),it(e),c&&(c.value=""),u&&(u.value=""),d&&(d.checked=!1)}catch(x){console.error("Failed to save EPPO:",x),alert("Speichern fehlgeschlagen")}});const l=e.querySelector('[data-form="add-bbch"]');l&&l.addEventListener("submit",async o=>{o.preventDefault();const c=e.querySelector('[data-input="bbch-code"]'),u=e.querySelector('[data-input="bbch-label"]'),d=e.querySelector('[data-input="bbch-favorite"]'),p=c?.value.trim(),m=u?.value.trim();if(!p||!m){alert("Bitte Code und Bezeichnung eingeben");return}try{await Un({code:p,label:m,isFavorite:d?.checked||!1});const x=_e();await Ke(x),await rt(),it(e),c&&(c.value=""),u&&(u.value=""),d&&(d.checked=!1)}catch(x){console.error("Failed to save BBCH:",x),alert("Speichern fehlgeschlagen")}})}function Kc(e,t,a={}){if(!e||xr)return;mn=e,xr=!0,mn.innerHTML=`
    <div class="section-inner codes-manager">
      <h4 class="mb-3"><i class="bi bi-tags me-2"></i>EPPO & BBCH Codes</h4>
      ${Oc()}
    </div>`;const n=mn.querySelector(".codes-manager");if(!n)return;_c(n);const r=async()=>{await rt(),it(n)};t?.events?.subscribe?.("database:connected",()=>{r()}),t?.state?.getState?.().app?.hasDatabase&&r()}function Rc(){xr=!1,mn=null}let _i=!1,lt=null,ka=null,fn=null,Sa=null,zt=null,Dn=null,ct=null,Na=null,$n=null,dt=null,Er=null,st=null,De=new Set,vt=null,er=!1,tr=!1,Zt=!1;const Ge=e=>Te(e.mediums),gn=25,ar=new Intl.NumberFormat("de-DE");let $e=0,Wt=null,Lr=null,Dr=null,Gr=null;function Wc(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function jc(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`profile-${Date.now()}-${Math.random().toString(16).slice(2,10)}`}function qs(e){if(!De.size)return;const t=new Set(Ge(e).map(n=>n.id));let a=!1;De.forEach(n=>{t.has(n)||(De.delete(n),a=!0)}),a&&(De=new Set(De))}function An(){lt&&lt.querySelectorAll('[data-role="profile-select"]').forEach(e=>{const t=e.dataset.mediumId;e.checked=!!(t&&De.has(t))})}function yt(e){const t=Ge(e).length,a=De.size;let n="Noch keine Mittel ausgewählt.";t?a===t&&t>0?n=`${a} Mittel ausgewählt (alle).`:a>0&&(n=`${a} Mittel ausgewählt.`):n="Keine Mittel vorhanden.",Er&&(Er.textContent=n),st&&(st.disabled=t===0,st.indeterminate=a>0&&a<t,st.checked=t>0&&a===t)}function bn(e){vt=null,Dn&&Dn.reset(),Na&&(Na.value=""),ct&&(ct.value=""),dt&&(dt.textContent="Profil speichern"),De=new Set,An(),yt(e)}function Gc(e,t){vt=e.id,Na&&(Na.value=e.id),ct&&(ct.value=e.name,ct.focus()),dt&&(dt.textContent="Profil aktualisieren"),De=new Set(e.mediumIds),An(),yt(t)}function Ki(e,t){if(dt){if(dt.disabled=e,e){dt.textContent=t||"Speichert...";return}dt.textContent=vt?"Profil aktualisieren":"Profil speichern"}}function zn(e,t){if(ka){if(ka.disabled=e,e){ka.textContent=t||"Speichert...";return}ka.textContent="Hinzufügen"}}async function Uc(e,t,a){if(Zt)return;const n=t.state.getState(),i=(Ge(n)[e]??null)?.id||null;Zt=!0,zn(!0);const l=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediums",c=>{const u=Fa(c),d=u.items.slice();return d.splice(e,1),{...u,items:d,totalCount:Math.min(u.totalCount,d.length),lastUpdatedAt:new Date().toISOString()}}),await Pn({silent:!0})&&i&&t.events?.emit?.("mediums:data-changed",{action:"deleted",id:i})}finally{Zt=!1,zn(!1),a&&a.isConnected&&(a.disabled=!1,a.textContent=l??"Löschen")}}async function Vc(e,t,a){const n=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediumProfiles",(r=[])=>r.filter(i=>i.id!==e.id)),vt===e.id&&bn(t.state.getState()),await Pn({successMessage:"Profil gelöscht."})}finally{a&&(a.disabled=!1,a.textContent=n||"Löschen")}}function Zc(e){if(!$n)return;const t=$n,a=e.mediumProfiles||[];if(!a.length){t.innerHTML=`
      <tr>
        <td colspan="3" class="text-center text-muted">Noch keine Profile erstellt.</td>
      </tr>
    `;return}const n=new Map(Ge(e).map(r=>[r.id,r]));t.innerHTML="",a.forEach(r=>{const i=document.createElement("tr"),l=r.mediumIds.map(c=>n.get(c)).filter(Boolean).map(c=>b(c.name)),o=l.length?l.join(", "):'<span class="text-muted">Keine gültigen Mittel</span>';i.innerHTML=`
      <td>${b(r.name)}</td>
      <td>${o}</td>
      <td>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-sm btn-outline-info" data-action="profile-edit" data-id="${b(r.id)}">Bearbeiten</button>
          <button class="btn btn-sm btn-outline-danger" data-action="profile-delete" data-id="${b(r.id)}">Löschen</button>
        </div>
      </td>
    `,t.appendChild(i)})}function Qc(e,t){if(er||!e.mediumProfiles?.length)return;const a=new Set(Ge(e).map(i=>i.id));let n=!1;const r=e.mediumProfiles.map(i=>{const l=i.mediumIds.filter(o=>a.has(o));return l.length!==i.mediumIds.length?(n=!0,{...i,mediumIds:l,updatedAt:new Date().toISOString()}):i}).filter(i=>i.mediumIds.length?!0:(n=!0,!1));n&&(er=!0,t.state.updateSlice("mediumProfiles",()=>r),er=!1)}function Hs(e){if(!e)return $e=0,{start:0,end:0,total:0};const t=Math.max(Math.ceil(e/gn),1);$e>=t&&($e=t-1),$e<0&&($e=0);const a=$e*gn,n=Math.min(a+gn,e);return{start:a,end:n,total:e}}function Jc(){if(!Dr)return null;const e=Dr.querySelector('[data-role="mediums-pager"]');return e?((!Wt||Lr!==e)&&(Wt?.destroy(),Wt=qa(e,{onPrev:()=>Yc(),onNext:()=>Xc(),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Mittel...",empty:"Keine Mittel verfügbar"}}),Lr=e),Wt):null}function Ri(e){const t=Jc();if(!t)return;const a=Ge(e).length;if(!a){$e=0,t.update({status:"disabled",info:"Noch keine Mittel gespeichert."});return}const{start:n,end:r}=Hs(a),i=`Mittel ${ar.format(n+1)}–${ar.format(r)} von ${ar.format(a)}`;t.update({status:"ready",info:i,canPrev:$e>0,canNext:r<a})}function Yc(){if($e===0)return;const e=Gr?.state.getState();e&&($e=Math.max($e-1,0),Ur(e))}function Xc(){const e=Gr?.state.getState();if(!e)return;const t=Ge(e).length;if(!t)return;const a=Math.max(Math.ceil(t/gn)-1,0);$e>=a||($e=Math.min($e+1,a),Ur(e))}function Ur(e){if(!lt)return;qs(e);const t=new Map(e.measurementMethods.map(l=>[l.id,l])),a=Ge(e).length;if(!a){lt.innerHTML=`
      <tr>
        <td colspan="9" class="text-center text-muted">Noch keine Mittel gespeichert.</td>
      </tr>
    `,yt(e),Ri(e);return}const{start:n,end:r}=Hs(a),i=Ge(e).slice(n,r);lt.innerHTML="",i.forEach((l,o)=>{const c=n+o,u=document.createElement("tr"),d=t.get(l.methodId),p=l.approval||l.zulassungsnummer,m=typeof p=="string"&&p.trim().length?b(p):"-",x=typeof l.wartezeit=="string"&&l.wartezeit.trim().length?b(l.wartezeit):typeof l.wartezeit=="number"?`${l.wartezeit} Tage`:"-",h=typeof l.wirkstoff=="string"&&l.wirkstoff.trim().length?b(l.wirkstoff):"-";u.innerHTML=`
      <td class="text-center">
        <input type="checkbox" class="form-check-input" data-role="profile-select" data-medium-id="${b(l.id)}" ${De.has(l.id)?"checked":""} />
      </td>
      <td>${b(l.name)}</td>
      <td>${b(l.unit)}</td>
      <td>${b(d?d.label:l.method||l.methodId||"-")}</td>
      <td>${b(l.value!=null?String(l.value):"")}</td>
      <td>${m}</td>
      <td>${x}</td>
      <td>${h}</td>
      <td>
        <button class="btn btn-sm btn-danger" data-action="delete" data-index="${c}">Löschen</button>
      </td>
    `,lt?.appendChild(u)}),yt(e),Ri(e)}function Wi(e){if(!Sa)return;const t=new Set;Sa.innerHTML="",e.measurementMethods.forEach(a=>{const n=(a.label??"").toLowerCase(),r=(a.id??"").toLowerCase();if(n&&!t.has(n)){t.add(n);const i=document.createElement("option");i.value=a.label,Sa.appendChild(i)}if(r&&!t.has(r)){t.add(r);const i=document.createElement("option");i.value=a.id,Sa.appendChild(i)}})}function ed(e){const t=e.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t||`method-${Date.now()}-${Math.random().toString(16).slice(2,6)}`}function td(e,t){if(!fn)return null;const a=fn.value.trim();if(!a)return window.alert("Bitte eine Methode angeben."),fn.focus(),null;const n=e.measurementMethods.find(o=>o.label?.toLowerCase()===a.toLowerCase()||o.id?.toLowerCase()===a.toLowerCase());if(n)return n.id;const r=ed(a),i=e.fieldLabels?.calculation?.fields?.quantity?.unit||"Kiste",l={id:r,label:a,type:"factor",unit:i,requires:["areaHa"],config:{sourceField:"areaHa"}};return t.state.updateSlice("measurementMethods",o=>[...o,l]),r}async function Pn(e){try{const t=_e();return await Ke(t),e?.silent||window.alert(e?.successMessage??"Änderungen wurden gespeichert."),!0}catch(t){console.error("Fehler beim Speichern",t);const a=t instanceof Error?t.message:"Speichern fehlgeschlagen";return window.alert(a),!1}}function ad(e,t){const a=!!t.app?.hasDatabase,n=t.app?.activeSection==="settings";e.classList.toggle("d-none",!(a&&n))}function nd(e,t){if(!e||_i)return;const a=e;a.innerHTML="";const n=Wc();a.appendChild(n),Dr=n,Gr=t,$e=0,Wt?.destroy(),Wt=null,Lr=null,lt=n.querySelector("#settings-mediums-table tbody"),fn=n.querySelector('input[name="medium-method"]'),Sa=n.querySelector("#settings-method-options"),zt=n.querySelector("#settings-medium-form"),ka=zt?zt.querySelector('button[type="submit"]'):null,Dn=n.querySelector("#settings-profile-form"),ct=n.querySelector("#profile-name"),Na=n.querySelector('input[name="profile-id"]'),$n=n.querySelector("#settings-profile-table tbody"),dt=n.querySelector('[data-role="profile-submit"]'),Er=n.querySelector('[data-role="profile-selection-summary"]'),st=n.querySelector('[data-role="profile-select-all"]');let r=!1,i=!1;function l(d){if(n.querySelectorAll("[data-settings-tab]").forEach(p=>{const m=p.dataset.settingsTab===d;p.classList.toggle("active",m)}),n.querySelectorAll("[data-pane]").forEach(p=>{const m=p.dataset.pane===d;p.style.display=m?"block":"none"}),d==="gps"&&!r){const p=n.querySelector('[data-feature="gps-embedded"]');p&&(Hc(p,t),r=!0)}if(d==="codes"&&!i){const p=n.querySelector('[data-feature="codes-embedded"]');p&&(Rc(),Kc(p,{state:t.state,events:{subscribe:t.events?.subscribe}},{}),i=!0)}}n.querySelectorAll("[data-settings-tab]").forEach(d=>{d.addEventListener("click",()=>{const p=d.dataset.settingsTab;p&&l(p)})});async function o(){if(!zt||Zt)return;const d=t.state.getState(),p=new FormData(zt),m=(p.get("medium-name")||"").toString().trim(),x=(p.get("medium-unit")||"").toString().trim(),h=p.get("medium-value"),k=Number(h),S=(p.get("medium-approval")||"").toString().trim(),A=p.get("medium-wartezeit"),M=A?Number(A):null,V=(p.get("medium-wirkstoff")||"").toString().trim()||null;if(!m||!x||Number.isNaN(k)){window.alert("Bitte alle Felder korrekt ausfüllen.");return}const W=td(d,t);if(!W)return;const pe=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`medium-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,F={id:pe,name:m,unit:x,methodId:W,value:k,zulassungsnummer:S||null,wartezeit:M!=null&&!Number.isNaN(M)?M:null,wirkstoff:V};Zt=!0,zn(!0,"Speichere...");try{t.state.updateSlice("mediums",B=>{const L=Fa(B),z=[...L.items,F];return{...L,items:z,totalCount:z.length,lastUpdatedAt:new Date().toISOString()}}),Wi(t.state.getState()),await Pn({successMessage:"Mittel gespeichert.",silent:!0})&&(zt.reset(),t.events?.emit?.("mediums:data-changed",{action:"created",id:pe}))}finally{Zt=!1,zn(!1)}}zt?.addEventListener("submit",d=>{d.preventDefault(),o()}),lt?.addEventListener("click",d=>{const p=d.target?.closest('[data-action="delete"]');if(!p)return;const m=Number(p.dataset.index);Number.isNaN(m)||Uc(m,t,p)}),lt?.addEventListener("change",d=>{const p=d.target;if(!p||p.dataset.role!=="profile-select")return;const m=p.dataset.mediumId;if(!m)return;p.checked?De.add(m):De.delete(m);const x=t.state.getState();yt(x)}),st?.addEventListener("change",()=>{const d=t.state.getState();st&&(st.indeterminate=!1,st.checked?De=new Set(Ge(d).map(p=>p.id)):De=new Set,An(),yt(d))});const c=async()=>{if(!ct)return;const d=ct.value.trim();if(!d){window.alert("Bitte einen Profilnamen eingeben."),ct.focus();return}if(!De.size){window.alert("Bitte mindestens ein Mittel auswählen.");return}const p=t.state.getState();if(p.mediumProfiles?.some(S=>S.name.toLowerCase()===d.toLowerCase()&&S.id!==vt)){window.alert("Ein Profil mit diesem Namen existiert bereits.");return}const x=Ge(p).filter(S=>De.has(S.id)).map(S=>S.id);if(!x.length){window.alert("Ausgewählte Mittel sind nicht mehr verfügbar. Bitte Auswahl prüfen."),qs(p),An(),yt(p);return}if(tr)return;const h=!!vt;tr=!0,Ki(!0,h?"Aktualisiere...":"Speichere...");const k=new Date().toISOString();try{if(vt)t.state.updateSlice("mediumProfiles",(A=[])=>A.map(M=>M.id===vt?{...M,name:d,mediumIds:x,updatedAt:k}:M));else{const A={id:jc(),name:d,mediumIds:x,createdAt:k,updatedAt:k};t.state.updateSlice("mediumProfiles",(M=[])=>[...M,A])}await Pn({successMessage:h?"Profil aktualisiert und gespeichert.":"Profil gespeichert."})&&bn(t.state.getState())}finally{tr=!1,Ki(!1)}};Dn?.addEventListener("submit",d=>{d.preventDefault(),c()}),$n?.addEventListener("click",d=>{const p=d.target?.closest('[data-action^="profile-"]');if(!p)return;const m=p.dataset.id;if(!m)return;const x=t.state.getState();if(p.dataset.action==="profile-edit"){const h=x.mediumProfiles?.find(k=>k.id===m);h&&Gc(h,x);return}if(p.dataset.action==="profile-delete"){const h=x.mediumProfiles?.find(k=>k.id===m);if(!h||!window.confirm(`Profil "${h.name}" wirklich löschen?`))return;Vc(h,t,p)}}),n.querySelector('[data-action="profile-reset"]')?.addEventListener("click",()=>{bn(t.state.getState())}),bn(t.state.getState());const u=d=>{Qc(d,t),ad(n,d),d.app.activeSection==="settings"&&(Ur(d),Wi(d),Zc(d),yt(d))};t.state.subscribe(u),u(t.state.getState()),_i=!0}const ha=e=>b(e),nr=(e,t=1)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function Qt(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function rd(e){if(!e)return"";const t=new Date(e);if(Number.isNaN(t.getTime()))return b(e);const a=Math.round((t.getTime()-Date.now())/864e5);return a<0?`<span style="color:#ef4444;">${Qt(e)} · abgelaufen</span>`:a<180?`<span style="color:#f59e0b;">${Qt(e)} · ${a} T</span>`:`<span class="calc-hint">${Qt(e)}</span>`}function id(){return`
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
    </section>`}function sd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=id();const a=e.querySelector('[data-role="lager-uebersicht"]'),n=e.querySelector('[data-role="lager-bewegungen"]'),r=e.querySelector('[data-role="lager-form"]'),i=e.querySelector("#lager-mittel-options"),l=e.querySelector('[data-role="lager-empty"]'),o=new Map,c=x=>{if(a){if(!x.length){a.innerHTML='<tr><td colspan="6" class="calc-hint" style="padding:14px;">Noch keine Mittel. Erfasse unten einen Zugang oder dokumentiere Anwendungen in „Neu erfassen".</td></tr>';return}a.innerHTML=x.map(h=>{const k=h.bestand<0?"#ef4444":h.bestand===0?"#f59e0b":"inherit",S=b(h.einheit||"");return`<tr>
          <td><span class="fw-semibold">${b(h.name)}</span>${h.kennr?`<span class="d-block calc-hint">${b(h.kennr)}</span>`:""}</td>
          <td class="calc-hint">${b(h.wirkstoff||"")}</td>
          <td class="text-end">${nr(h.verbraucht)} ${S}<span class="d-block calc-hint">${h.anwendungen} Anw.</span></td>
          <td class="text-end fw-semibold" style="color:${k};">${nr(h.bestand)} ${S}</td>
          <td>${rd(h.zulEnde)}</td>
          <td class="calc-hint">${h.naechsterAblauf?Qt(h.naechsterAblauf):""}</td>
        </tr>`}).join("")}},u=x=>{if(n){if(!x.length){n.innerHTML='<div class="calc-hint">Keine Bewegungen erfasst.</div>';return}n.innerHTML=x.map(h=>`
        <div class="d-flex align-items-center gap-2 py-1" style="border-bottom:1px solid var(--border-1);">
          <span class="badge" style="background:${h.typ==="zugang"?"#16a34a":"#64748b"};">${b(h.typ)}</span>
          <span class="flex-grow-1">${b(h.mittelName)} · <b>${nr(h.menge)} ${b(h.einheit||"")}</b>${h.charge?` · Charge ${b(h.charge)}`:""}<span class="d-block calc-hint">${Qt(h.datum)}${h.lieferant?" · "+b(h.lieferant):""}${h.ablauf?" · Ablauf "+Qt(h.ablauf):""}</span></span>
          <button class="btn btn-sm" style="color:#ef4444;border:1px solid var(--border-1);background:transparent;" data-del="${ha(h.id)}" title="Löschen">×</button>
        </div>`).join(""),n.querySelectorAll("[data-del]").forEach(h=>{h.addEventListener("click",async()=>{const k=h.getAttribute("data-del")||"";try{await zo({id:k}),await We().catch(()=>{}),await p()}catch{T.warning("Löschen fehlgeschlagen.")}})})}},d=()=>{i&&(i.innerHTML=Array.from(o.entries()).sort((x,h)=>x[0].localeCompare(h[0],"de")).map(([x,h])=>`<option value="${ha(x)}" data-kennr="${ha(h.kennr||"")}" data-einheit="${ha(h.einheit||"")}" data-wirkstoff="${ha(h.wirkstoff||"")}"></option>`).join(""))},p=async()=>{if(le()!=="sqlite"){l&&(l.textContent="Bitte zuerst eine Datenbank öffnen.");return}try{const[x,h,k]=await Promise.all([cs(),Ao(),ds()]);c(x?.rows||[]),u(h?.rows||[]),o.clear(),(k?.rows||[]).forEach(S=>{S.name&&o.set(S.name,{kennr:S.kennr??null,einheit:S.einheit??null,wirkstoff:S.wirkstoff??null})}),(x?.rows||[]).forEach(S=>{S.name&&!o.has(S.name)&&o.set(S.name,{kennr:S.kennr??null,einheit:S.einheit??null,wirkstoff:S.wirkstoff??null})}),d()}catch(x){console.warn("[Lager] Laden fehlgeschlagen:",x)}};r?.addEventListener("submit",async x=>{if(x.preventDefault(),le()!=="sqlite"){T.warning("Bitte zuerst eine Datenbank öffnen.");return}const h=new FormData(r),k=String(h.get("mittel")||"").trim(),S=Number(String(h.get("menge")||"").replace(",","."));if(!k||!Number.isFinite(S)){T.warning("Mittel und Menge angeben.");return}const A=String(h.get("preis")||"").trim();try{await $o({mittelName:k,kennr:String(h.get("kennr")||"").trim()||null,wirkstoff:o.get(k)?.wirkstoff||null,typ:String(h.get("typ")||"zugang"),menge:S,einheit:String(h.get("einheit")||"").trim()||null,datum:String(h.get("datum")||"").trim()||null,charge:String(h.get("charge")||"").trim()||null,ablauf:String(h.get("ablauf")||"").trim()||null,lieferant:String(h.get("lieferant")||"").trim()||null,preis:A?Number(A.replace(",",".")):null}),await We().catch(()=>{}),r.reset(),T.success("Bewegung gespeichert."),await p()}catch{T.warning("Speichern fehlgeschlagen.")}});const m=e.querySelector('[name="mittel"]');m?.addEventListener("change",()=>{const x=o.get(m.value);if(!x)return;const h=e.querySelector('[name="einheit"]'),k=e.querySelector('[name="kennr"]');h&&x.einheit&&(h.value=x.einheit),k&&x.kennr&&(k.value=x.kennr)}),t.state.subscribe(x=>{x?.app?.activeSection==="lager"&&p()}),p()}const gt=["#ef4444","#3b82f6","#a855f7","#f59e0b","#06b6d4","#ec4899","#84cc16","#14b8a6"],od=()=>({bedW:1.2,pathW:.4,rowSp:.5,inRowSp:.4,angle:0}),ge=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";let ne=null,Je=null,j=null,rr=!1,Pt=[];function ji(){if(!j)return 1;const e=j.getCenter().lat;return 156543.03392*Math.cos(e*Math.PI/180)/Math.pow(2,j.getZoom())}function ld(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=cd();const a=[];let n=null;const r=new Map;let i=null,l=null,o={sat:null,osm:null},c=!0,u=!0;function d(){const s=[];if(a.forEach(f=>{const v=f.latlngs||[];if(v.length<3)return;const N=v.map(de=>[Number(de[1]),Number(de[0])]),H=N[0],Y=N[N.length-1];(H[0]!==Y[0]||H[1]!==Y[1])&&N.push([H[0],H[1]]),s.push({type:"Feature",geometry:{type:"Polygon",coordinates:[N]},properties:{name:f.name||"",kultur:f.kultur||null,eppoCode:f.eppoCode||null,flaeche_m2:Math.round(f.result?.areaM2||0),flaeche_ha:Number(((f.result?.areaM2||0)/1e4).toFixed(4)),beete:f.result?.beds?.length||0,beetmeter_m:Math.round(f.result?.bedMeters||0),pflanzen:f.result?.plants||0,bettbreite_m:f.params?.bedW??null,wegbreite_m:f.params?.pathW??null,reihenabstand_m:f.params?.rowSp??null,pflanzabstand_m:f.params?.inRowSp??null,ausrichtung_grad:f.params?.angle??null}})}),(Te(t.state.getState().gps?.points)||[]).forEach(f=>{const v=Number(f.latitude),N=Number(f.longitude);if(!Number.isFinite(v)||!Number.isFinite(N))return;const H=Number(f.nutzflaecheQm);s.push({type:"Feature",geometry:{type:"Point",coordinates:[N,v]},properties:{name:f.name||"Standort",typ:"standort",flaeche_m2:Number.isFinite(H)&&H>0?Math.round(H):null,kind:f.kind||null}})}),!s.length){T.warning("Keine Flächen oder Standorte zum Exportieren.");return}const y={type:"FeatureCollection",name:"PSM Acker-Planer",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:s};try{const f=new Blob([JSON.stringify(y,null,2)],{type:"application/geo+json"}),v=URL.createObjectURL(f),N=document.createElement("a");N.href=v,N.download="acker-flaechen.geojson",document.body.appendChild(N),N.click(),N.remove(),setTimeout(()=>URL.revokeObjectURL(v),1e3),T.success(`${s.length} Objekt(e) als GeoJSON exportiert.`)}catch(f){console.error("[Acker] GeoJSON-Export fehlgeschlagen",f),T.error("Export fehlgeschlagen.")}}function p(){if(!ne||!i)return;i.clearLayers(),(Te(t.state.getState().gps?.points)||[]).forEach(g=>{const y=Number(g.latitude),f=Number(g.longitude);if(!Number.isFinite(y)||!Number.isFinite(f))return;const v=Number(g.nutzflaecheQm),N=Number.isFinite(v)&&v>0?`${Math.round(v)} m²`:"",H=g.name||"Standort",Y=ne.marker([y,f],{icon:ne.divIcon({className:"acker-standort",html:'<span class="acker-standort-dot"></span>',iconSize:[16,16],iconAnchor:[8,8]})});Y.bindTooltip(`${b(H)}${N?" · "+N:""}`,{permanent:!0,direction:"top",className:"acker-standort-label",offset:[0,-9]});const de=[`<b>${b(H)}</b>`,N?`Fläche: ${N}`:"",g.kind?b(String(g.kind)):""].filter(Boolean).join("<br>");Y.bindPopup(de),i.addLayer(Y)})}const m=s=>e.querySelector(s),x=m('[data-role="acker-list"]'),h=m('[data-role="acker-empty"]'),k=m('[data-role="acker-totals"]'),S=m('[data-role="acker-map"]'),A=s=>({id:s.id,name:s.name,kultur:s.kultur||null,eppoCode:s.eppoCode||null,standortId:s.standortId||null,color:s.color,latlngs:s.latlngs,areaQm:s.result?.areaM2||0,bedW:s.params.bedW,pathW:s.params.pathW,rowSp:s.params.rowSp,inRowSp:s.params.inRowSp,angle:s.params.angle,beds:s.result?.beds?.length||0,bedMeters:s.result?.bedMeters||0,plants:s.result?.plants||0}),M=(s,g=!1)=>{if(le()!=="sqlite")return;const y=async()=>{try{const f=await Mo(A(s));f?.id&&(s.id=f.id),await We().catch(()=>{})}catch(f){console.warn("[Acker] Speichern fehlgeschlagen:",f)}};if(g){y();return}clearTimeout(r.get(s._key)),r.set(s._key,setTimeout(y,600))};function V(s,g){const y=s.map(Oe=>[Oe[1],Oe[0]]);if(y.length<3)return{areaM2:0,beds:[],bedMeters:0,plants:0};const f=y[0],v=y[y.length-1];if((f[0]!==v[0]||f[1]!==v[1])&&y.push(f.slice()),y.length<4)return{areaM2:0,beds:[],bedMeters:0,plants:0};let N;try{N=Je.polygon([y])}catch{return{areaM2:0,beds:[],bedMeters:0,plants:0}}const H=Je.area(N),Y=g.bedW+g.pathW;if(Y<=0||g.bedW<=0||g.rowSp<=0||g.inRowSp<=0)return{areaM2:H,beds:[],bedMeters:0,plants:0};const de=Je.centroid(N),ve=Je.transformRotate(N,-g.angle,{pivot:de}),ye=Je.bbox(ve),Qe=1/111320,sa=Y*Qe,Kn=g.bedW*Qe,ft=(ye[2]-ye[0])*.02+1e-4,Dt=[];let Rn=0,Za=0,Qa=0;for(let Oe=ye[1];Oe<ye[3]&&Qa<4e3;Oe+=sa,Qa++){const oa=Math.min(Oe+Kn,ye[3]),Wn=Je.polygon([[[ye[0]-ft,Oe],[ye[2]+ft,Oe],[ye[2]+ft,oa],[ye[0]-ft,oa],[ye[0]-ft,Oe]]]);let $t=null;try{$t=Je.intersect(ve,Wn)}catch{$t=null}if(!$t)continue;let la;try{la=Je.transformRotate($t,g.angle,{pivot:de})}catch{continue}const ca=Je.area(la);if(ca<Math.max(.4,g.bedW*.3))continue;const nt=ca/g.bedW,da=Math.max(1,Math.floor(g.bedW/g.rowSp)),At=Math.max(0,Math.floor(nt/g.inRowSp));Rn+=nt,Za+=da*At,Dt.push({geo:la,lenM:nt,rows:da,perRow:At,plants:da*At,areaM2:ca})}return{areaM2:H,beds:Dt,bedMeters:Rn,plants:Za}}const W=(s,g,y)=>({color:s.color,weight:g?3:2,fillColor:s.color,fillOpacity:y?g?.04:.1:g?.32:.22,dashArray:g?null:y?"5 5":null}),pe=(s,g,y)=>{const f=g%2===0;return y?{color:"#ffffff",weight:.7,opacity:.85,fillColor:s.color,fillOpacity:f?.78:.52}:{color:s.color,weight:0,fillColor:s.color,fillOpacity:f?.5:.32}};function F(s){return!u||s.bedsHidden?!1:(s.params?.bedW||0)/ji()>=2.2}function te(s){s.outline&&(j.removeLayer(s.outline),s.outline=null),s.bedsLayer&&(j.removeLayer(s.bedsLayer),s.bedsLayer=null),s.label&&l&&(l.removeLayer(s.label),s.label=null),U(s)}function B(s){const g=!!s.editing;s.outline&&j.removeLayer(s.outline),s.bedsLayer&&(j.removeLayer(s.bedsLayer),s.bedsLayer=null),s.label&&l&&l.removeLayer(s.label),U(s);const y=s._key===n,f=F(s);s._lastDetail=f,f&&(s.bedsLayer=ne.layerGroup(),(s.result?.beds||[]).forEach((v,N)=>{const H=ne.geoJSON(v.geo,{style:pe(s,N,y),bubblingMouseEvents:!1});H.bindTooltip(`Beet ${N+1} · ${ge(v.lenM,1)} m · ${v.rows}×${ge(v.perRow)} = ${ge(v.plants)} Pfl.`,{sticky:!0}),H.on("click",()=>D(s._key)),H.on("contextmenu",Y=>Va(s,Y,N+1)),H.addTo(s.bedsLayer)}),s.bedsLayer.addTo(j)),s.outline=ne.polygon(s.latlngs,{...W(s,y,f),bubblingMouseEvents:!1}).addTo(j),s.outline.on("click",()=>D(s._key)),s.outline.on("dblclick",()=>Ue(s)),s.outline.on("contextmenu",v=>Va(s,v)),L(s,y),(y||g)&&z(s)}function L(s,g){if(!c||!l||!s.outline)return;let y;try{y=s.outline.getBounds().getCenter()}catch{return}const f=s.result?.plants||0,v=`<div class="acker-flabel${g?" sel":""}" style="--fc:${s.color}"><b>${b(s.name||"")}</b><i>${ge(f)} Pfl.</i></div>`;s.label=ne.marker(y,{interactive:!1,keyboard:!1,icon:ne.divIcon({className:"acker-flabel-wrap",html:v,iconSize:[0,0]})}),l.addLayer(s.label)}function z(s){U(s),s.handles=s.latlngs.map((g,y)=>{const f=ne.marker(g,{draggable:!0,icon:ne.divIcon({className:"acker-vhandle"})}).addTo(j);return f.on("drag",v=>{s.latlngs[y]=[v.target.getLatLng().lat,v.target.getLatLng().lng],s.outline.setLatLngs(s.latlngs)}),f.on("dragend",()=>he(s)),f.on("contextmenu",v=>ra(s,y,v)),f}),s.editing=!0}function U(s){(s.handles||[]).forEach(g=>j.removeLayer(g)),s.handles=[],s.editing=!1}function ae(){a.forEach(s=>B(s))}function ce(){a.forEach(s=>{F(s)!==s._lastDetail&&B(s)})}function me(s,g){s.color=g;try{s.outline?.setStyle({color:g,fillColor:g})}catch{}if(s.bedsLayer)try{s.bedsLayer.eachLayer(f=>f.setStyle&&f.setStyle({fillColor:g}))}catch{}try{const f=s.label?.getElement?.()?.querySelector?.(".acker-flabel");f&&f.style.setProperty("--fc",g)}catch{}const y=x?.querySelector(".acker-field.sel .acker-swatch");y&&(y.style.background=g)}function Ue(s){if(s.latlngs?.length)try{j.fitBounds(ne.polygon(s.latlngs).getBounds(),{maxZoom:20,padding:[40,40]})}catch{}}function Ce(){const s=a.filter(g=>g.latlngs?.length>=3);if(!s.length){T.info("Keine Flächen vorhanden.");return}try{let g=ne.polygon(s[0].latlngs).getBounds();s.slice(1).forEach(y=>{g=g.extend(ne.polygon(y.latlngs).getBounds())}),j.fitBounds(g,{maxZoom:19,padding:[40,40]})}catch{}}function he(s){s.result=V(s.latlngs,s.params),B(s),I(),M(s)}function qt(s){if(je("app",g=>({...g,activeSection:"kultur"})),s?.id)try{window.dispatchEvent(new CustomEvent("psm:openKultur",{detail:{typ:"acker",id:String(s.id)}}))}catch{}else T.info("Fläche wird gespeichert – in der Kulturführung gleich wählbar.")}let be=null;const Ve=()=>{be&&(be.remove(),be=null,document.removeEventListener("pointerdown",_a,!0),document.removeEventListener("keydown",Ka,!0))},_a=s=>{be&&!be.contains(s.target)&&Ve()},Ka=s=>{s.key==="Escape"&&Ve()};function On(s,g){g.style.left="",g.style.right="",g.style.top="";const y=s.getBoundingClientRect(),f=g.getBoundingClientRect(),v=f.width||210,N=f.height||260;y.right+3+v>window.innerWidth-8&&(g.style.left="auto",g.style.right="calc(100% + 3px)");let H=-5;y.top+H+N>window.innerHeight-8&&(H=Math.min(-5,window.innerHeight-8-N-y.top)),y.top+H<8&&(H=8-y.top),g.style.top=H+"px"}function Ra(s,g){g.forEach(y=>{if(!y)return;if(y.sep){const v=document.createElement("div");v.className="acker-ctx-sep",s.appendChild(v);return}if(y.type==="swatchGrid"){const v=document.createElement("div");v.className="acker-ctx-swatches",y.colors.forEach(Y=>{const de=document.createElement("button");de.type="button",de.className="acker-sw"+(Y===y.current?" on":""),de.style.background=Y,de.title=Y,de.addEventListener("click",ve=>{ve.stopPropagation(),Ve(),y.onPick(Y)}),v.appendChild(de)});const N=document.createElement("label");N.className="acker-sw-custom",N.innerHTML=`<i class="bi bi-eyedropper"></i><input type="color" value="${y.current||"#3b82f6"}">`;const H=N.querySelector("input");H.addEventListener("input",Y=>(y.onLive||y.onPick)(Y.target.value)),H.addEventListener("change",Y=>{y.onPick(Y.target.value),Ve()}),v.appendChild(N),s.appendChild(v);return}const f=document.createElement("button");if(f.type="button",f.className="acker-ctx-item"+(y.danger?" danger":"")+(y.submenu?" has-sub":"")+(y.disabled?" disabled":""),f.innerHTML=`<span class="ic">${y.icon||""}</span><span class="lb">${b(y.label)}</span>`+(y.right?`<span class="rt">${b(y.right)}</span>`:"")+(y.submenu?'<span class="ch"><i class="bi bi-chevron-right"></i></span>':""),y.submenu){const v=document.createElement("div");v.className="acker-ctx-sub",Ra(v,y.submenu),f.appendChild(v),f.addEventListener("pointerenter",()=>On(f,v))}else y.disabled||f.addEventListener("click",v=>{v.stopPropagation(),y.keepOpen||Ve(),y.action?.()});s.appendChild(f)})}function ta(s,g,y,f){if(Ve(),be=document.createElement("div"),be.className="acker-ctx",f){const Y=document.createElement("div");Y.className="acker-ctx-title",Y.textContent=f,be.appendChild(Y)}Ra(be,y),document.body.appendChild(be);const v=be.getBoundingClientRect();let N=s,H=g;N+v.width>window.innerWidth-8&&(N=Math.max(8,window.innerWidth-v.width-8)),H+v.height>window.innerHeight-8&&(H=Math.max(8,window.innerHeight-v.height-8)),be.style.left=N+"px",be.style.top=H+"px",setTimeout(()=>{document.addEventListener("pointerdown",_a,!0),document.addEventListener("keydown",Ka,!0)},0)}const Ht=s=>{const g=s.originalEvent||s;return g&&ne.DomEvent.preventDefault?.(g),s.originalEvent&&ne.DomEvent.stop?.(s),{x:g.clientX,y:g.clientY}};function aa(s,g){s.params.angle=(Math.round(s.params.angle+g)%180+180)%180,he(s),T.info(`Beete-Ausrichtung: ${s.params.angle}°`)}function Wa(s,g){s.color=g,B(s),I(),M(s)}function ja(s,g){s.kultur=g||null,s.eppoCode=Pt.find(y=>y.kultur===s.kultur)?.eppoCode||null,B(s),I(),M(s),T.success(g?`Kultur: ${g}`:"Kultur entfernt.")}function Se(s){s.bedsHidden=!s.bedsHidden,B(s),T.info(s.bedsHidden?"Beete ausgeblendet.":"Beete eingeblendet.")}function Ot(s){D(s._key),setTimeout(()=>{const g=x?.querySelector(".acker-field.sel .acker-name");g&&(g.focus(),g.select())},30)}function na(s){const y=ji()*18/111320,f={_key:"new-"+ ++Z,id:null,name:(s.name||"Fläche")+" (Kopie)",kultur:s.kultur,eppoCode:s.eppoCode,standortId:s.standortId,color:gt[(gt.indexOf(s.color)+1)%gt.length],latlngs:s.latlngs.map(v=>[v[0]+y,v[1]+y]),params:{...s.params},outline:null,bedsLayer:null,label:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(f),n=f._key,he(f),M(f,!0),T.success("Fläche dupliziert.")}function _n(s){const g=s.latlngs||[];if(g.length<3){T.warning("Fläche hat keine Geometrie.");return}const y=g.map(v=>[Number(v[1]),Number(v[0])]);(y[0][0]!==y[y.length-1][0]||y[0][1]!==y[y.length-1][1])&&y.push([y[0][0],y[0][1]]);const f={type:"FeatureCollection",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:[{type:"Feature",geometry:{type:"Polygon",coordinates:[y]},properties:{name:s.name||"",kultur:s.kultur||null,eppoCode:s.eppoCode||null,flaeche_m2:Math.round(s.result?.areaM2||0),beete:s.result?.beds?.length||0,beetmeter_m:Math.round(s.result?.bedMeters||0),pflanzen:s.result?.plants||0}}]};try{const v=new Blob([JSON.stringify(f,null,2)],{type:"application/geo+json"}),N=URL.createObjectURL(v),H=document.createElement("a");H.href=N,H.download=`${(s.name||"flaeche").replace(/[^\w\-]+/g,"_")}.geojson`,document.body.appendChild(H),H.click(),H.remove(),setTimeout(()=>URL.revokeObjectURL(N),1e3),T.success("Fläche als GeoJSON exportiert.")}catch{T.error("Export fehlgeschlagen.")}}async function Ga(s){const g=s.result||{},y=[`Fläche: ${s.name||""}`,s.kultur?`Kultur: ${s.kultur}`:"",`Größe: ${ge(g.areaM2||0)} m² (${ge((g.areaM2||0)/1e4,3)} ha)`,`Beete: ${ge(g.beds?.length||0)}`,`Beetmeter: ${ge(g.bedMeters||0)} m`,`Pflanzen: ${ge(g.plants||0)}`].filter(Boolean).join(`
`);try{await navigator.clipboard.writeText(y),T.success("Werte kopiert.")}catch{T.warning("Kopieren nicht möglich.")}}const Ze=s=>({icon:'<i class="bi bi-palette"></i>',label:"Farbe",submenu:[{type:"swatchGrid",colors:gt,current:s.color,onPick:g=>Wa(s,g),onLive:g=>me(s,g)}]}),Ua=s=>({icon:'<i class="bi bi-flower1"></i>',label:"Kultur zuweisen",submenu:[{icon:'<i class="bi bi-x"></i>',label:"– keine –",action:()=>ja(s,null)},...Pt.length?[{sep:!0}]:[],...Pt.map(g=>({icon:g.kultur===s.kultur?'<i class="bi bi-check2"></i>':"",label:`${g.kultur}${g.anbau?" ("+g.anbau+")":""}`,action:()=>ja(s,g.kultur)}))]});function Va(s,g,y){D(s._key);const{x:f,y:v}=Ht(g),N=!!s.editing;ta(f,v,[{icon:'<i class="bi bi-clipboard2-pulse"></i>',label:"Kulturführung öffnen",action:()=>qt(s)},{icon:'<i class="bi bi-pencil"></i>',label:"Umbenennen",action:()=>Ot(s)},Ua(s),Ze(s),{sep:!0},{icon:'<i class="bi bi-arrow-clockwise"></i>',label:"Beete drehen +15°",keepOpen:!0,action:()=>aa(s,15)},{icon:'<i class="bi bi-arrow-counterclockwise"></i>',label:"Beete drehen −15°",keepOpen:!0,action:()=>aa(s,-15)},{icon:'<i class="bi bi-grid-3x3-gap"></i>',label:s.bedsHidden?"Beete einblenden":"Beete ausblenden",action:()=>Se(s)},{icon:'<i class="bi bi-bounding-box-circles"></i>',label:N?"Eckpunkte fertig":"Eckpunkte bearbeiten",action:()=>{N?U(s):z(s)}},{sep:!0},{icon:'<i class="bi bi-copy"></i>',label:"Duplizieren",action:()=>na(s)},{icon:'<i class="bi bi-zoom-in"></i>',label:"Auf Fläche zoomen",action:()=>Ue(s)},{icon:'<i class="bi bi-clipboard-data"></i>',label:"Werte kopieren",action:()=>Ga(s)},{icon:'<i class="bi bi-download"></i>',label:"Als GeoJSON exportieren",action:()=>_n(s)},{sep:!0},{icon:'<i class="bi bi-trash"></i>',label:"Löschen",danger:!0,action:()=>P(s._key)}],y?`${s.name||"Fläche"} · Beet ${y}`:s.name||"Fläche")}function ra(s,g,y){const{x:f,y:v}=Ht(y);ta(f,v,[{icon:'<i class="bi bi-node-minus"></i>',label:"Eckpunkt löschen",disabled:s.latlngs.length<=3,action:()=>{s.latlngs.length<=3||(s.latlngs.splice(g,1),he(s))}},{icon:'<i class="bi bi-check2"></i>',label:"Bearbeiten beenden",action:()=>U(s)}],`Eckpunkt ${g+1}`)}function ia(){!o.sat||!o.osm||(j.hasLayer(o.sat)?(j.removeLayer(o.sat),o.osm.addTo(j),T.info("Karte: OSM")):(j.removeLayer(o.osm),o.sat.addTo(j),T.info("Karte: Satellit")))}function w(s){const g=s.latlng,{x:y,y:f}=Ht(s);ta(y,f,[{icon:'<i class="bi bi-pencil-square"></i>',label:"Neue Fläche hier zeichnen",action:()=>{K(!0),Q({latlng:g})}},{icon:'<i class="bi bi-crosshair"></i>',label:"Hierhin zentrieren",action:()=>j.panTo(g)},{sep:!0},{icon:'<i class="bi bi-arrows-fullscreen"></i>',label:"Alle Flächen anzeigen",disabled:!a.some(v=>v.latlngs?.length>=3),action:Ce},{icon:'<i class="bi bi-layers"></i>',label:"Kartentyp wechseln (Satellit/OSM)",action:ia},{sep:!0},{icon:'<i class="bi bi-geo-alt"></i>',label:"Koordinaten kopieren",action:async()=>{try{await navigator.clipboard.writeText(`${g.lat.toFixed(6)}, ${g.lng.toFixed(6)}`),T.success("Koordinaten kopiert.")}catch{T.warning("Kopieren nicht möglich.")}}}],"Karte")}function E(s){return['<option value="">– Kultur –</option>'].concat(Pt.map(g=>{const y=`${g.kultur}${g.anbau?" ("+g.anbau+")":""}`;return`<option value="${b(g.kultur)}"${g.kultur===s?" selected":""}>${b(y)}</option>`})).join("")}function O(s){const g=Te(t.state.getState().gps?.points)||[];return['<option value="">– Standort –</option>'].concat(g.map(y=>`<option value="${b(y.id)}"${y.id===s?" selected":""}>${b(y.name||"")}</option>`)).join("")}function I(){if(!x||!h||!k)return;h.style.display=a.length?"none":"block",k.style.display=a.length?"block":"none",x.innerHTML="";let s=0,g=0,y=0,f=0;a.forEach(v=>{s+=v.result?.areaM2||0,g+=v.result?.beds?.length||0,y+=v.result?.bedMeters||0,f+=v.result?.plants||0;const N=v._key===n,H=document.createElement("div");H.className="acker-field"+(N?" sel open":""),H.innerHTML=`
        <div class="acker-fhead">
          <span class="acker-swatch" style="background:${v.color}"></span>
          <input class="acker-name" value="${b(v.name)}" />
          <span class="acker-stat">${ge(v.result?.plants||0)} Pfl.</span>
        </div>
        <div class="acker-fbody">
          <div class="acker-grid">
            <label class="acker-fld span2">Kultur<select data-k="kultur">${E(v.kultur)}</select></label>
            <label class="acker-fld span2">Standort (für PSM)<select data-k="standortId">${O(v.standortId)}</select></label>
            <label class="acker-fld">Bettbreite (m)<input data-k="bedW" type="number" step="0.05" min="0.1" value="${v.params.bedW}"/></label>
            <label class="acker-fld">Wegbreite (m)<input data-k="pathW" type="number" step="0.05" min="0" value="${v.params.pathW}"/></label>
            <label class="acker-fld">Reihenabstand (m)<input data-k="rowSp" type="number" step="0.05" min="0.05" value="${v.params.rowSp}"/></label>
            <label class="acker-fld">Pflanzabstand (m)<input data-k="inRowSp" type="number" step="0.05" min="0.05" value="${v.params.inRowSp}"/></label>
            <label class="acker-fld span2">Ausrichtung der Beete: ${v.params.angle}°<input data-k="angle" type="range" min="0" max="180" step="5" value="${v.params.angle}"/></label>
          </div>
          <div class="acker-res">
            <div class="r"><span>Fläche</span><b>${ge(v.result?.areaM2||0)} m² · ${ge((v.result?.areaM2||0)/1e4,3)} ha</b></div>
            <div class="r"><span>Beete</span><b>${ge(v.result?.beds?.length||0)}</b></div>
            <div class="r"><span>Beetmeter</span><b>${ge(v.result?.bedMeters||0)} m</b></div>
            <div class="r"><span>Pflanzen</span><b>${ge(v.result?.plants||0)}</b></div>
          </div>
          <div class="acker-actions">
            <label class="acker-colorbtn" title="Farbe wählen"><input type="color" data-act="color" value="${v.color}"><i class="bi bi-palette"></i></label>
            <button class="btn btn-sm acker-abtn" data-act="zoom" title="Auf Fläche zoomen"><i class="bi bi-zoom-in"></i></button>
            <button class="btn btn-sm acker-abtn" data-act="dup" title="Duplizieren"><i class="bi bi-copy"></i></button>
            <button class="btn btn-sm acker-abtn" data-act="rot" title="Beete drehen +15°"><i class="bi bi-arrow-clockwise"></i></button>
            <span style="flex:1"></span>
            <button class="btn btn-sm acker-abtn danger" data-act="del" title="Löschen"><i class="bi bi-trash"></i></button>
          </div>
          <div class="acker-hint"><i class="bi bi-mouse2"></i> Rechtsklick auf die Fläche für mehr Aktionen</div>
        </div>`,H.querySelector(".acker-fhead").addEventListener("click",ve=>{ve.target.classList.contains("acker-name")||D(v._key)}),H.querySelector(".acker-name").addEventListener("input",ve=>{v.name=ve.target.value,M(v)}),H.querySelectorAll("[data-k]").forEach(ve=>{ve.addEventListener("input",ye=>{const Qe=ve.dataset.k;if(Qe==="kultur"){v.kultur=ye.target.value||null,v.eppoCode=Pt.find(sa=>sa.kultur===v.kultur)?.eppoCode||null,M(v);return}if(Qe==="standortId"){v.standortId=ye.target.value||null,M(v);return}Qe==="angle"?v.params.angle=+ye.target.value:v.params[Qe]=parseFloat(ye.target.value)||0,he(v)})}),H.querySelector('[data-act="del"]').addEventListener("click",()=>P(v._key)),H.querySelector('[data-act="zoom"]').addEventListener("click",()=>Ue(v)),H.querySelector('[data-act="dup"]').addEventListener("click",()=>na(v)),H.querySelector('[data-act="rot"]').addEventListener("click",()=>aa(v,15));const de=H.querySelector('[data-act="color"]');de.addEventListener("input",ve=>me(v,ve.target.value)),de.addEventListener("change",ve=>Wa(v,ve.target.value)),x.appendChild(H)}),k.querySelector('[data-t="area"]').textContent=ge(s)+" m² · "+ge(s/1e4,3)+" ha",k.querySelector('[data-t="beds"]').textContent=ge(g),k.querySelector('[data-t="meters"]').textContent=ge(y)+" m",k.querySelector('[data-t="plants"]').textContent=ge(f)}function D(s){n=s,a.forEach(g=>B(g)),I()}async function P(s){const g=a.find(f=>f._key===s);if(!g)return;te(g);const y=a.findIndex(f=>f._key===s);if(y>=0&&a.splice(y,1),n===s&&(n=null),I(),g.id&&le()==="sqlite")try{await Po({id:g.id}),await We().catch(()=>{})}catch{}}let C=!1,J=[],X=null,re=[],Z=0;function K(s){C=s,m('[data-role="acker-banner"]').style.display=s?"block":"none",m('[data-role="acker-draw"]').style.display=s?"none":"block",j.getContainer().style.cursor=s?"crosshair":"",s||(X&&j.removeLayer(X),re.forEach(g=>j.removeLayer(g)),X=null,re=[],J=[])}function Q(s){C&&(J.push([s.latlng.lat,s.latlng.lng]),re.push(ne.circleMarker(s.latlng,{radius:4,color:"#22c55e",fillColor:"#fff",fillOpacity:1,weight:2}).addTo(j)),X?X.setLatLngs(J):X=ne.polyline(J,{color:"#22c55e",weight:2,dashArray:"5 5"}).addTo(j))}function se(){if(J.length<3){T.warning("Mindestens 3 Punkte setzen.");return}const s={_key:"new-"+ ++Z,id:null,name:"Fläche "+(a.length+1),kultur:null,eppoCode:null,standortId:null,color:gt[a.length%gt.length],latlngs:J.map(g=>g.slice()),params:od(),outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(s),K(!1),n=s._key,he(s),M(s,!0)}async function fe(){const s=m('[data-role="acker-q"]').value.trim();if(s)try{const y=await(await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+encodeURIComponent(s))).json();y[0]?j.setView([+y[0].lat,+y[0].lon],18):T.info("Nichts gefunden.")}catch{T.warning("Suche nicht verfügbar.")}}async function Be(){if(rr){setTimeout(()=>j&&j.invalidateSize(),60);return}rr=!0;try{await wt(()=>Promise.resolve({}),__vite__mapDeps([2]));const f=await wt(()=>import("./leaflet-src.BcflbDBd.js").then(v=>v.l),__vite__mapDeps([3,4]));ne=f.default||f,Je=await wt(()=>import("./index.CPadEFgJ.js"),__vite__mapDeps([5,4]))}catch(f){console.warn("[Acker] Karten-Bibliotheken konnten nicht geladen werden:",f),h&&(h.textContent="Karte konnte nicht geladen werden (offline?)."),rr=!1;return}j=ne.map(S,{doubleClickZoom:!1,zoomControl:!0,attributionControl:!0}).setView([47.818,8.976],17);const s=ne.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:21,maxNativeZoom:19,attribution:"Tiles © Esri"}).addTo(j),g=ne.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"});o={sat:s,osm:g},i=ne.layerGroup(),p(),i.addTo(j),l=ne.layerGroup().addTo(j),ne.control.layers({Satellit:s,"Karte (OSM)":g},{"Freiland-Standorte":i},{position:"topright",collapsed:!0}).addTo(j);const y=ne.Control.extend({options:{position:"topleft"},onAdd(){const f=ne.DomUtil.create("div","leaflet-bar acker-toolbar");f.innerHTML='<a href="#" data-tb="fit" title="Alle Flächen anzeigen"><i class="bi bi-arrows-fullscreen"></i></a><a href="#" data-tb="labels" class="on" title="Beschriftungen ein/aus"><i class="bi bi-tag"></i></a><a href="#" data-tb="beds" class="on" title="Beete-Detail ein/aus"><i class="bi bi-grid-3x3"></i></a>',ne.DomEvent.disableClickPropagation(f);const v=(N,H)=>{f.querySelector(N).addEventListener("click",Y=>{Y.preventDefault(),H()})};return v('[data-tb="fit"]',Ce),v('[data-tb="labels"]',()=>{c=!c,f.querySelector('[data-tb="labels"]').classList.toggle("on",c),ae()}),v('[data-tb="beds"]',()=>{u=!u,f.querySelector('[data-tb="beds"]').classList.toggle("on",u),ae()}),f}});j.addControl(new y),j.on("click",Q),j.on("contextmenu",f=>{C||w(f)}),j.on("zoomend",ce),m('[data-role="acker-draw"]').addEventListener("click",()=>K(!0)),m('[data-role="acker-export"]')?.addEventListener("click",d),m('[data-role="acker-finish"]').addEventListener("click",se),m('[data-role="acker-cancel"]').addEventListener("click",()=>K(!1)),m('[data-role="acker-go"]').addEventListener("click",fe),m('[data-role="acker-q"]').addEventListener("keydown",f=>{f.key==="Enter"&&fe()}),document.addEventListener("keydown",f=>{if(C){if(f.key==="Backspace"){f.preventDefault(),J.pop();const v=re.pop();v&&j.removeLayer(v),X&&X.setLatLngs(J)}f.key==="Enter"&&se(),f.key==="Escape"&&K(!1)}}),await q(),await oe(),setTimeout(()=>j.invalidateSize(),60)}async function q(){if(le()==="sqlite")try{Pt=(await zr())?.rows||[]}catch{Pt=[]}}async function oe(){if(le()==="sqlite")try{((await Pr())?.rows||[]).forEach(y=>{const f={_key:"db-"+y.id,id:y.id,name:y.name,kultur:y.kultur,eppoCode:y.eppoCode,standortId:y.standortId,color:y.color||gt[a.length%gt.length],latlngs:y.latlngs||[],params:{bedW:y.bedW??1.2,pathW:y.pathW??.4,rowSp:y.rowSp??.5,inRowSp:y.inRowSp??.4,angle:y.angle??0},outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};f.result=V(f.latlngs,f.params),a.push(f),B(f)}),I();const g=a.find(y=>y.latlngs?.length);if(g&&j)try{j.fitBounds(ne.polygon(g.latlngs).getBounds(),{maxZoom:19,padding:[30,30]})}catch{}}catch(s){console.warn("[Acker] Flächen laden fehlgeschlagen:",s)}}t.state.subscribe(s=>{s?.app?.activeSection==="acker"&&Be()}),I()}function cd(){return`
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
            Auf die Karte klicken setzt Eckpunkte. <b>Backspace</b> = letzten Punkt löschen, <b>Enter</b> = fertig.
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
  </section>`}function va(e){return e.typ+":"+e.id}function dd(e){if(!Array.isArray(e)||e.length<3)return null;let t=0,a=0,n=0;const r=e.length,i=e[r-1],l=e[0],c=i&&l&&Number(i[0])===Number(l[0])&&Number(i[1])===Number(l[1])?r-1:r;for(let u=0;u<c;u++){const d=Number(e[u]?.[0]),p=Number(e[u]?.[1]);Number.isFinite(d)&&Number.isFinite(p)&&(t+=d,a+=p,n++)}return n?{lat:t/n,lon:a/n}:null}async function Gi(e){const t=[];(Te(e.state.getState().gps?.points)||[]).forEach(n=>{if(n?.kind!=="gewaechshaus")return;const r=Number(n.latitude),i=Number(n.longitude),l=Number(n.nutzflaecheQm);t.push({typ:"haus",id:String(n.id),name:n.name||"Gewächshaus",areaQm:Number.isFinite(l)&&l>0?l:null,lat:Number.isFinite(r)?r:null,lon:Number.isFinite(i)?i:null,color:null})});try{((await Pr())?.rows||[]).forEach(r=>{const i=dd(r.latlngs),l=Number(r.areaQm);t.push({typ:"acker",id:String(r.id),name:r.name||"Fläche",areaQm:Number.isFinite(l)&&l>0?l:null,lat:i?.lat??null,lon:i?.lon??null,color:r.color||null})})}catch{}return t}const ud="Wetterdaten: Open-Meteo (CC BY 4.0)",pd="psm.weather.";function md(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function fd(e,t){return pd+e.toFixed(3)+"_"+t.toFixed(3)}function gd(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch{return null}}function bd(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function hd(e){return!!e&&e.slice(0,10)===md()}function vd(e,t,a){const n=e?.time||[],r=e?.temperature_2m_max||[],i=e?.temperature_2m_min||[],l=e?.precipitation_sum||[],o=e?.sunshine_duration||[],c=kn(new Date),u=Xr(c.year,c.week),d=new Map;for(let m=0;m<n.length;m++){const x=os(n[m]);if(!x)continue;const{year:h,week:k}=kn(x),S=Xr(h,k);let A=d.get(S);A||(A={key:S,year:h,week:k,tmaxSum:0,tmaxN:0,tminSum:0,tminN:0,precip:0,precipN:0,sun:0,sunN:0,days:0},d.set(S,A)),Number.isFinite(r[m])&&(A.tmaxSum+=r[m],A.tmaxN++),Number.isFinite(i[m])&&(A.tminSum+=i[m],A.tminN++),Number.isFinite(l[m])&&(A.precip+=l[m],A.precipN++),Number.isFinite(o[m])&&(A.sun+=o[m],A.sunN++),A.days++}const p=[...d.values()].sort((m,x)=>m.key<x.key?-1:m.key>x.key?1:0).map(m=>{const x=m.tmaxN?m.tmaxSum/m.tmaxN:null,h=m.tminN?m.tminSum/m.tminN:null;return{weekKey:m.key,year:m.year,week:m.week,tMaxAvg:x,tMinAvg:h,tMeanAvg:x!=null&&h!=null?(x+h)/2:x,precipSum:m.precipN?m.precip:null,sunHours:m.sunN?m.sun/3600:null,days:m.days,isForecast:m.key>=u}});return{lat:t,lon:a,fetchedAt:new Date().toISOString(),weeks:p}}async function yd(e,t){if(!Number.isFinite(e)||!Number.isFinite(t))return{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const a=fd(e,t),n=gd(a);if(n&&hd(n.fetchedAt)&&n.weeks?.length)return n;if(typeof navigator<"u"&&navigator.onLine===!1)return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const r="https://api.open-meteo.com/v1/forecast?latitude="+e.toFixed(4)+"&longitude="+t.toFixed(4)+"&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunshine_duration&timezone=Europe%2FBerlin&past_days=92&forecast_days=16";try{const i=await fetch(r);if(!i.ok)throw new Error("HTTP "+i.status);const l=await i.json(),o=vd(l.daily,e,t);return o.weeks.length&&bd(a,o),o}catch{return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]}}}const Mn={mechanisch:{label:"Mechanisch",icon:"bi-tools",color:"#2563eb"},chemisch_psm:{label:"Pflanzenschutz",icon:"bi-droplet-half",color:"#dc2626"},duengung:{label:"Düngung",icon:"bi-flower1",color:"#b45309"},nuetzlinge:{label:"Nützlinge",icon:"bi-bug",color:"#7c3aed"},bewaesserung:{label:"Bewässerung",icon:"bi-moisture",color:"#0891b2"},monitoring:{label:"Monitoring",icon:"bi-eye",color:"#475569"},sonstiges:{label:"Sonstiges",icon:"bi-three-dots",color:"#64748b"}},wd=["mechanisch","chemisch_psm","duengung","nuetzlinge","bewaesserung","monitoring","sonstiges"];function Os(e){return Mn[e]||Mn.sonstiges}const xd={geplant:{label:"geplant",color:"#64748b"},aktiv:{label:"aktiv",color:"#16a34a"},abgeschlossen:{label:"abgeschlossen",color:"#94a3b8"}},It=["#16a34a","#0891b2","#7c3aed","#d97706","#dc2626","#0d9488","#65a30d","#db2777"],kd=/^#[0-9a-fA-F]{3,8}$/;function _s(e){return typeof e=="string"&&kd.test(e.trim())?e.trim():null}function hn(e,t=0){return _s(e&&e.color)||It[t%It.length]}function Ye(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function we(e){if(!e)return NaN;const t=String(e).slice(0,10).replace(/-/g,""),a=Number(t);return Number.isFinite(a)?a:NaN}function sn(e){const t=[...e||[]].sort((i,l)=>(we(i.pflanzDatum)||0)-(we(l.pflanzDatum)||0)),a=Number(Ye().replace(/-/g,""));let n=t.find(i=>i.status==="aktiv")||null;if(!n){const i=t.filter(l=>l.status!=="abgeschlossen"&&we(l.pflanzDatum)<=a&&(!l.ernteDatum||we(l.ernteDatum)>=a));n=i.length?i[i.length-1]:null}let r=t.filter(i=>i!==n&&i.status!=="abgeschlossen"&&we(i.pflanzDatum)>a).sort((i,l)=>(we(i.pflanzDatum)||0)-(we(l.pflanzDatum)||0))[0]||null;return r||(r=t.filter(i=>i!==n&&i.status==="geplant").sort((i,l)=>(we(i.pflanzDatum)||0)-(we(l.pflanzDatum)||0))[0]||null),{current:n,next:r,all:t}}const Ks=["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];function Rs(e,t){const a=[];let n=e.getFullYear(),r=e.getMonth();const i=t.getFullYear(),l=t.getMonth();let o=0;for(;(n<i||n===i&&r<=l)&&o<60;)a.push({y:n,m:r}),r++,r>11&&(r=0,n++),o++;return a}function Ne(e,t){if(!t||!e.length)return null;const a=new Date(String(t).slice(0,10)+"T00:00:00");if(isNaN(a.getTime()))return null;const n=e.length,r=a.getFullYear()*12+a.getMonth(),i=e[0].y*12+e[0].m,l=e[n-1].y*12+e[n-1].m;if(r<i)return 0;if(r>l)return 1;const o=r-i,c=new Date(a.getFullYear(),a.getMonth()+1,0).getDate();return(o+(a.getDate()-1)/c)/n}const Sd={anzucht:{label:"Anzucht (vorziehen)",short:"Anzucht"},direkt:{label:"Direktsaat",short:"Direkt"}},Ed=["Pflanzen","m²","Beete","lfd. m","g Saatgut"];function ot(e,t){if(!e)return null;const a=new Date(String(e).slice(0,10)+"T00:00:00");return isNaN(a.getTime())?null:(a.setDate(a.getDate()+Math.round(Number(t)||0)),a.getFullYear()+"-"+String(a.getMonth()+1).padStart(2,"0")+"-"+String(a.getDate()).padStart(2,"0"))}function Ld(e,t,a){if(!e||!a)return{};const r=(e.anbauMethode==="anzucht"?"anzucht":"direkt")==="anzucht"&&Number(e.anzuchtTage)||0,i=Number(e.kulturTage)||0,l=Number(e.ernteTage)||0;let o;t==="aussaat"?o=ot(a,r):t==="ernte"?o=i?ot(a,-i):a:o=a;const c=ot(o,-r),u=i?ot(o,i):null,d=u?ot(u,l):null;return{aussaatDatum:c,pflanzDatum:o,ernteVon:u,ernteBis:d}}function Dd(e,t){return e?{aussaatDatum:ot(e.aussaatDatum,t),pflanzDatum:ot(e.pflanzDatum,t),ernteVon:ot(e.ernteVon,t),ernteBis:ot(e.ernteBis,t)}:{}}function on(e,t){if(!t||!Array.isArray(e))return null;const a=String(t).trim().toLowerCase();return a&&(e.find(n=>String(n.name||"").trim().toLowerCase()===a)||e.find(n=>{const r=String(n.name||"").trim().toLowerCase();return r&&(r.startsWith(a)||a.startsWith(r))}))||null}const ir=66;function $d(e,t){const{units:a,anbau:n,mass:r,onSelect:i,onContext:l}=t;if(!a||!a.length){e.innerHTML='<div class="km-empty"><i class="bi bi-calendar3"></i><p>Noch keine Flächen für den Anbauplan.</p></div>';return}const o=new Date;let c=new Date(o.getFullYear(),o.getMonth()-1,1),u=new Date(o.getFullYear(),o.getMonth()+4,1);const d=F=>{if(!F)return;const te=new Date(String(F).slice(0,10)+"T00:00:00");isNaN(te.getTime())||(te<c&&(c=new Date(te.getFullYear(),te.getMonth(),1)),te>u&&(u=new Date(te.getFullYear(),te.getMonth(),1)))};(n||[]).forEach(F=>{d(F.pflanzDatum),d(F.ernteBis||F.ernteDatum),d(F.ernteVon)}),(r||[]).forEach(F=>d(F.planDatum||F.erledigtDatum));const p=Rs(c,u),m=p.length,x=m*ir,h=F=>F==null?null:(F*100).toFixed(2)+"%",k=Ne(p,o.toISOString()),S=a.filter(F=>F.typ==="haus"),A=a.filter(F=>F.typ==="acker");let M="";p.forEach((F,te)=>{const B=F.y===o.getFullYear()&&F.m===o.getMonth();M+=`<div class="kb2-mo${B?" cur":""}" style="width:${ir}px">${Ks[F.m]}${F.m===0?" "+String(F.y).slice(2):""}</div>`});const V=F=>{const te=(n||[]).filter(z=>z.flaecheTyp===F.typ&&String(z.flaecheId)===String(F.id)),B=(r||[]).filter(z=>z.flaecheTyp===F.typ&&String(z.flaecheId)===String(F.id));let L="";return te.forEach((z,U)=>{const ae=Ne(p,z.pflanzDatum);let ce=Ne(p,z.ernteBis||z.ernteDatum||z.pflanzDatum);if(ae==null)return;(ce==null||ce<=ae)&&(ce=Math.min(1,ae+.5/m));const me=hn(z,U),Ue=z.status==="geplant";L+=`<div class="kb2-bar${Ue?" planned":""}" title="${b(z.kultur||"Kultur")}" style="left:${h(ae)};width:${((ce-ae)*100).toFixed(2)}%;--cc:${b(me)}"><span>${b(z.kultur||"")}</span></div>`;const Ce=Ne(p,z.ernteVon),he=Ne(p,z.ernteBis);Ce!=null&&he!=null&&he>Ce&&(L+=`<div class="kb2-harvest" title="Ernte" style="left:${h(Ce)};width:${((he-Ce)*100).toFixed(2)}%;--cc:${b(me)}"></div>`)}),B.forEach(z=>{const U=z.status==="erledigt"?z.erledigtDatum||z.planDatum:z.planDatum||z.erledigtDatum,ae=Ne(p,U);if(ae==null)return;const ce=Os(z.art),me=z.status==="erledigt";L+=`<span class="kb2-mk${me?" done":""}" title="${b(ce.label+(z.notes?": "+z.notes:""))}" style="left:${h(ae)};--mc:${ce.color}"></span>`}),k!=null&&(L+=`<div class="kb2-today" style="left:${h(k)}"></div>`),L},W=F=>{const te=F.typ+":"+F.id,B=(n||[]).filter(U=>U.flaecheTyp===F.typ&&String(U.flaecheId)===String(F.id)),L=B.find(U=>U.status==="aktiv")||B.find(U=>U.status!=="abgeschlossen"),z=L?b(L.kultur||""):"frei";return`<div class="kb2-row" data-ukey="${te}">
      <div class="kb2-label" title="${b(F.name)}"><b>${b(F.name)}</b><small>${z}</small></div>
      <div class="kb2-track" style="width:${x}px">${V(F)}</div>
    </div>`},pe=(F,te)=>te.length?`<div class="kb2-grp"><div class="kb2-grp-l">${b(F)}</div><div class="kb2-grp-t" style="width:${x}px"></div></div>`+te.map(W).join(""):"";e.innerHTML=`
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
      .kb2-track{position:relative;height:38px;border-top:1px solid var(--border-1);background-image:linear-gradient(to right,var(--border-1) 1px,transparent 1px);background-size:${ir}px 100%}
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
      ${pe("Gewächshäuser",S)}
      ${pe("Freiland",A)}
    </div>
    <div class="kb2-legend">
      <span class="lg"><span class="d" style="background:var(--text-secondary,#475569)"></span>erledigt</span>
      <span class="lg"><span class="d" style="background:var(--surface-1);box-shadow:inset 0 0 0 2px var(--text-secondary,#475569)"></span>geplant</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:#9FE1CB;display:inline-block"></span>Kultur</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:repeating-linear-gradient(45deg,#bbb,#bbb 2px,transparent 2px,transparent 4px);display:inline-block"></span>Ernte-Zeitraum</span>
      <span class="kb2-hint"><i class="bi bi-mouse2"></i> Klick = öffnen · Rechtsklick = planen</span>
    </div>`,e.querySelectorAll(".kb2-row").forEach(F=>{const te=F.dataset.ukey;F.querySelector(".kb2-label")?.addEventListener("click",()=>i&&i(te)),F.addEventListener("contextmenu",B=>{B.preventDefault(),l&&l(te,B.clientX,B.clientY)})})}const Ad=[{art:"bewaesserung",label:"Gießen",icon:"bi-droplet"},{art:"mechanisch",label:"Hacken",icon:"bi-tools"},{art:"duengung",label:"Düngen",icon:"bi-flower1"},{art:"nuetzlinge",label:"Nützlinge",icon:"bi-bug"},{art:"chemisch_psm",label:"Pflanzenschutz",icon:"bi-droplet-half"},{art:"monitoring",label:"Kontrolle",icon:"bi-eye"},{art:"sonstiges",label:"Sonstiges",icon:"bi-three-dots"}],zd=["Jan.","Feb.","März","Apr.","Mai","Juni","Juli","Aug.","Sep.","Okt.","Nov.","Dez."];function Pd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Md();let a=[],n=[],r=[],i=[],l=[],o=null,c="plan",u=!1,d=!1;const p={};let m=null;const x=w=>e.querySelector(w),h=()=>x('[data-role="list"]'),k=()=>x('[data-role="detail"]'),S=()=>x('[data-role="kpis"]'),A=()=>x('[data-role="board-view"]'),M=()=>x('[data-role="flaechen-view"]'),V=()=>le()==="sqlite",W=()=>{V()&&We().catch(()=>{})},pe=(w,E)=>w.filter(O=>O.flaecheTyp===E.typ&&String(O.flaecheId)===String(E.id)),F=w=>a.find(E=>va(E)===w)||null,te=(w,E=0)=>_s(w.color)||It[E%It.length];async function B(){if(a=await Gi(t),V()){try{n=(await ei())?.rows||[]}catch{n=[]}try{r=(await Vn())?.rows||[]}catch{r=[]}try{i=(await zr())?.rows||[]}catch{i=[]}try{l=(await Io())?.rows||[]}catch{l=[]}if(!d){d=!0;try{const w=await ti();w?.imported&&(r=(await Vn())?.rows||[],T.info(`${w.imported} Pflanzenschutz-Eintrag(e) übernommen.`),W())}catch{}}}!o&&a.length&&(o=va(a[0])),U(),z()}async function L(){if(V()){try{n=(await ei())?.rows||[]}catch{}try{r=(await Vn())?.rows||[]}catch{}}}async function z(){const w=o?F(o):null;if(!w||w.lat==null||w.lon==null)return;const E=va(w);if(!p[E]){p[E]={loading:!0,weeks:[]};try{p[E]=await yd(w.lat,w.lon)}catch{p[E]={weeks:[]}}o===E&&he()}}function U(){ce(),c==="plan"?(M().style.display="none",A().style.display="block",$d(A(),{units:a,anbau:n,mass:r,onSelect:w=>{o=w,ae("flaechen"),z()},onContext:(w,E,O)=>Ga(w,E,O)})):(A().style.display="none",M().style.display="grid",Ue(),he()),e.querySelectorAll(".km-modebtn").forEach(w=>w.classList.toggle("active",w.dataset.mode===c))}function ae(w){c=w,U()}function ce(){const w=S();if(!w)return;a.filter(D=>D.typ==="haus").length,a.filter(D=>D.typ==="acker").length;let E=0,O=null;a.forEach(D=>{const{current:P,next:C}=sn(pe(n,D));P&&E++,C?.pflanzDatum&&(!O||we(C.pflanzDatum)<we(O.pflanzDatum))&&(O=C)});const I=r.filter(D=>D.status==="geplant").length;w.innerHTML=`
      ${me(String(a.length),"Flächen")}
      ${me(String(E),"Kulturen aktiv")}
      ${me(String(I),"Aufgaben offen")}
      ${me(O?ua(be(O.pflanzDatum)):"–","Nächste Pflanzung")}
      <button class="km-psm" data-role="psm-import" title="Bestehende Pflanzenschutz-Einträge übernehmen"><i class="bi bi-arrow-down-circle"></i><span>PSM übernehmen</span></button>`,w.querySelector('[data-role="psm-import"]')?.addEventListener("click",aa)}const me=(w,E)=>`<div class="km-kpi"><div class="km-kpi-v">${w}</div><div class="km-kpi-l">${b(E)}</div></div>`;function Ue(){const w=h();if(!w)return;if(!a.length){w.innerHTML='<div class="km-empty"><i class="bi bi-geo-alt"></i><p>Noch keine Flächen.<br>Gewächshäuser unter Einstellungen, Freiland im Reiter „Karte".</p></div>';return}const E=a.filter(D=>D.typ==="haus"),O=a.filter(D=>D.typ==="acker"),I=(D,P)=>P.length?`<div class="km-grp">${b(D)}</div>`+P.map(Ce).join(""):"";w.innerHTML=I("Gewächshäuser",E)+I("Freiland",O),w.querySelectorAll("[data-ukey]").forEach(D=>{D.addEventListener("click",()=>{o=D.dataset.ukey,Ue(),he(),z()}),D.addEventListener("contextmenu",P=>{P.preventDefault(),Ga(D.dataset.ukey,P.clientX,P.clientY)})})}function Ce(w,E){const O=va(w),{current:I}=sn(pe(n,w));return`<div class="km-row${O===o?" sel":""}" data-ukey="${O}">
      <span class="km-dot" style="background:${b(I?hn(I):te(w,E))}"></span>
      <div class="km-row-main"><div class="km-row-name">${b(w.name)}</div>
      <div class="km-row-sub">${I?`<span class="crop">${b(I.kultur||"Kultur")}</span>`:'<span class="free">frei</span>'}</div></div>
    </div>`}function he(){const w=k();if(!w)return;const E=o?F(o):null;if(!E){w.innerHTML='<div class="km-empty"><i class="bi bi-hand-index"></i><p>Fläche links wählen.</p></div>';return}const O=pe(n,E),I=pe(r,E),{current:D,next:P}=sn(O),C=p[va(E)],J=E.typ==="haus"?"Gewächshaus":"Freiland",X=E.areaQm?`${Math.round(E.areaQm).toLocaleString("de-DE")} m²`:"";let re;if(D){const K=D.pflanzDatum?`seit ${Ve(D.pflanzDatum)} · ${ua(be(D.pflanzDatum))}`:"",Q=On(D);re=`<div class="km-hero active" style="--cc:${b(hn(D))}">
        <div class="km-hero-ic"><i class="bi bi-flower2"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop">${b(D.kultur||"Kultur")}</div><div class="km-hero-sub">${b(K+Q+Ra(D))}</div></div>
        <button class="km-hero-edit" data-edit-crop="current" title="Bearbeiten"><i class="bi bi-pencil"></i></button>
      </div>`}else re=`<div class="km-hero empty">
        <div class="km-hero-ic gray"><i class="bi bi-circle"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop gray">Fläche ist frei</div><div class="km-hero-sub">Noch keine Kultur eingetragen</div></div>
        <button class="km-hero-add" data-edit-crop="current"><i class="bi bi-plus-lg"></i> Kultur setzen</button>
      </div>`;const Z=P?`<div class="km-next"><i class="bi bi-arrow-right-short"></i>Danach geplant: <b>${b(P.kultur||"Kultur")}</b> · ab ${ua(be(P.pflanzDatum))} <button class="km-next-edit" data-edit-crop="next" title="Bearbeiten"><i class="bi bi-pencil"></i></button></div>`:D?'<button class="km-next-add" data-edit-crop="next"><i class="bi bi-plus"></i> Nächste Kultur planen</button>':"";w.innerHTML=`
      <div class="km-head"><div class="km-head-l"><span class="km-head-name">${b(E.name)}</span><span class="km-head-badge">${J}${X?" · "+X:""}</span></div>
        <button class="km-headbtn" data-act="map"><i class="bi bi-map"></i> Auf Karte</button></div>
      ${re}
      ${Z}
      ${ta(O,I)}
      <div class="km-tasks-head"><span>Aufgaben</span><button class="km-addtask" data-act="add-massnahme"><i class="bi bi-plus-lg"></i> Aufgabe</button></div>
      ${qt(I)}
      <div class="km-foot">
        <span class="km-weather">${Ka(C)}</span>
        <button class="km-plan" data-act="plan"><i class="bi bi-calendar3"></i> Saison &amp; Plan</button>
      </div>
      <div class="km-attr">${b(ud)}${C?.stale?" · offline":""}</div>`,w.querySelector('[data-act="map"]')?.addEventListener("click",()=>Ht()),w.querySelector('[data-act="plan"]')?.addEventListener("click",()=>ae("plan")),w.querySelector('[data-act="add-massnahme"]')?.addEventListener("click",()=>ia(E,null,D)),w.querySelectorAll("[data-edit-crop]").forEach(K=>K.addEventListener("click",()=>{const Q=K.dataset.editCrop;ra(E,Q==="current"?D:P,Q,O.length)})),w.querySelectorAll("[data-m-done]").forEach(K=>K.addEventListener("click",Q=>{Q.stopPropagation(),Wa(K.dataset.mDone)})),w.querySelectorAll("[data-m-del]").forEach(K=>K.addEventListener("click",Q=>{Q.stopPropagation(),ja(K.dataset.mDel)})),w.querySelectorAll("[data-m-edit]").forEach(K=>K.addEventListener("click",()=>{const Q=r.find(se=>se.id===K.dataset.mEdit);ia(E,Q,D)}))}function qt(w){const E=w.filter(C=>C.status==="geplant").sort((C,J)=>(we(C.planDatum)||9e15)-(we(J.planDatum)||9e15)),O=w.filter(C=>C.status==="erledigt").sort((C,J)=>(we(J.erledigtDatum)||0)-(we(C.erledigtDatum)||0)).slice(0,6),I=Number(Ye().replace(/-/g,"")),D=(C,J)=>{const X=Os(C.art),re=J?C.erledigtDatum:C.planDatum,Z=!J&&re&&we(re)<I,K=J?Ve(re):_a(re,Z),Q=C.notes||X.label,se=C.historyId?'<span class="km-pill">PSM</span>':"",fe=[];C.notes&&fe.push(b(X.label)),C.mittel&&fe.push(b(C.mittel)),C.menge!=null&&fe.push(`${C.menge}${C.einheit?" "+b(C.einheit):""}`);const Be=fe.join(" · ");return`<div class="km-task${J?" done":""}" data-m-edit="${C.id}">
        <span class="km-task-ic" style="--mc:${X.color}"><i class="bi ${X.icon}"></i></span>
        <div class="km-task-main"><div class="km-task-title">${b(Q)}${se}</div>${Be?`<div class="km-task-sub">${Be}</div>`:""}</div>
        <span class="km-task-when${Z?" overdue":""}">${K}</span>
        ${J?`<button class="km-tbtn del" data-m-del="${C.id}" title="Löschen"><i class="bi bi-trash"></i></button>`:`<button class="km-check" data-m-done="${C.id}" title="Erledigt"><i class="bi bi-check-lg"></i></button>`}
      </div>`};let P="";return E.length?P+=E.map(C=>D(C,!1)).join(""):P+='<div class="km-tasks-none"><i class="bi bi-check2-circle"></i> Nichts offen</div>',O.length&&(P+='<div class="km-done-h">Erledigt</div>'+O.map(C=>D(C,!0)).join("")),`<div class="km-tasks">${P}</div>`}function be(w){const E=new Date(String(w).slice(0,10)+"T00:00:00");return isNaN(E.getTime())?0:kn(E).week}function Ve(w){const E=new Date(String(w).slice(0,10)+"T00:00:00");return isNaN(E.getTime())?"":`${E.getDate()}. ${zd[E.getMonth()]}`}function _a(w,E){if(!w)return"offen";const O=new Date(String(w).slice(0,10)+"T00:00:00");if(isNaN(O.getTime()))return"offen";const I=new Date;I.setHours(0,0,0,0);const D=Math.round((O.getTime()-I.getTime())/864e5);return D===0?"heute":D===1?"morgen":E?"überfällig":Ve(w)}function Ka(w){if(!w||!w.weeks?.length)return w?.loading?"Wetter lädt…":"";const{year:E,week:O}=kn(new Date),I=w.weeks.find(C=>C.year===E&&C.week===O)||w.weeks.find(C=>!C.isForecast);if(!I)return"";const D=I.tMaxAvg!=null?Math.round(I.tMaxAvg)+"°":"–",P=I.precipSum!=null?Math.round(I.precipSum)+" mm":"–";return`<i class="bi bi-cloud-sun"></i> Diese Woche: ${D} · ${P} Regen`}function On(w){const E=w.ernteVon?ua(be(w.ernteVon)):null,O=w.ernteBis||w.ernteDatum,I=O?ua(be(O)):null;return E&&I?` · Ernte ${E}–${I}`:I?` · Ernte ~${I}`:E?` · Ernte ab ${E}`:""}function Ra(w){return!w||w.menge==null||w.menge===""?"":` · ${w.menge} ${w.einheit||"Pflanzen"}`}function ta(w,E){if(!w.length&&!E.length)return"";const O=new Date;let I=new Date(O.getFullYear(),O.getMonth()-1,1),D=new Date(O.getFullYear(),O.getMonth()+4,1);const P=q=>{if(!q)return;const oe=new Date(String(q).slice(0,10)+"T00:00:00");isNaN(oe.getTime())||(oe<I&&(I=new Date(oe.getFullYear(),oe.getMonth(),1)),oe>D&&(D=new Date(oe.getFullYear(),oe.getMonth(),1)))};w.forEach(q=>{P(q.pflanzDatum),P(q.ernteBis||q.ernteDatum),P(q.ernteVon)}),E.forEach(q=>P(q.planDatum||q.erledigtDatum));const C=Rs(I,D),J=C.length,X=`background-size:${(100/J).toFixed(4)}% 100%`,re=q=>q==null?null:(q*100).toFixed(2)+"%",Z=Ne(C,O.toISOString()),K=Z!=null?`<div class="ks-today" style="left:${re(Z)}"></div>`:"",Q=C.map(q=>`<div class="ks-mo${q.y===O.getFullYear()&&q.m===O.getMonth()?" cur":""}">${Ks[q.m]}</div>`).join("");let se="";w.forEach((q,oe)=>{const s=Ne(C,q.pflanzDatum);let g=Ne(C,q.ernteBis||q.ernteDatum||q.pflanzDatum);if(s==null)return;(g==null||g<=s)&&(g=Math.min(1,s+.5/J));const y=hn(q,oe);se+=`<div class="ks-bar${q.status==="geplant"?" planned":""}" style="left:${re(s)};width:${((g-s)*100).toFixed(2)}%;--cc:${b(y)}"><span>${b(q.kultur||"")}</span></div>`;const f=Ne(C,q.ernteVon),v=Ne(C,q.ernteBis);f!=null&&v!=null&&v>f&&(se+=`<div class="ks-harvest" style="left:${re(f)};width:${((v-f)*100).toFixed(2)}%"></div>`)});const fe={};E.forEach(q=>{(fe[q.art]=fe[q.art]||[]).push(q)});const Be=wd.filter(q=>fe[q]).map(q=>{const oe=Mn[q],s=fe[q].map(g=>{const y=g.status==="erledigt"?g.erledigtDatum||g.planDatum:g.planDatum||g.erledigtDatum,f=Ne(C,y);return f==null?"":`<span class="ks-mk${g.status==="erledigt"?" done":""}" title="${b(oe.label+(g.notes?": "+g.notes:""))}" style="left:${re(f)};--mc:${oe.color}"></span>`}).join("");return`<div class="ks-row"><div class="ks-rl">${b(oe.label)}</div><div class="ks-track" style="${X}">${s}${K}</div></div>`}).join("");return`<div class="ks-wrap">
      <div class="ks-head"><div class="ks-rl"></div><div class="ks-axis">${Q}</div></div>
      <div class="ks-row"><div class="ks-rl">Kultur</div><div class="ks-track" style="${X}">${se}${K}</div></div>
      ${Be}
      <div class="ks-legend"><span><span class="ks-d done"></span>erledigt</span><span><span class="ks-d"></span>geplant</span><span style="margin-left:auto"><span class="ks-hbar"></span>Ernte-Zeitraum</span></div>
    </div>`}function Ht(w){je("app",E=>({...E,activeSection:"acker"})),T.info("Karte geöffnet.")}async function aa(){if(!V()){T.warning("Keine Datenbank aktiv.");return}try{const w=await ti();await L(),U(),w?.imported?(T.success(`${w.imported} übernommen.`),W()):T.info(`Nichts Neues${w?.skipped?` (${w.skipped} nicht zuordenbar)`:""}.`)}catch{T.error("Übernahme fehlgeschlagen.")}}async function Wa(w){const E=r.find(O=>O.id===w);if(E)try{await ni({...E,status:"erledigt",erledigtDatum:E.erledigtDatum||Ye()}),await L(),U(),W()}catch{T.error("Speichern fehlgeschlagen.")}}async function ja(w){try{await ai({id:w}),await L(),U(),W()}catch{T.error("Löschen fehlgeschlagen.")}}let Se=null;const Ot=()=>{Se&&(Se.remove(),Se=null,document.removeEventListener("pointerdown",na,!0))},na=w=>{Se&&!Se.contains(w.target)&&Ot()};function _n(w,E,O,I){if(Ot(),Se=document.createElement("div"),Se.className="km-ctx",I){const P=document.createElement("div");P.className="km-ctx-t",P.textContent=I,Se.appendChild(P)}O.forEach(P=>{if(P.sep){const J=document.createElement("div");J.className="km-ctx-sep",Se.appendChild(J);return}const C=document.createElement("button");C.className="km-ctx-i",C.innerHTML=`<i class="bi ${P.icon}"></i><span>${b(P.label)}</span>`,C.addEventListener("click",()=>{Ot(),P.action?.()}),Se.appendChild(C)}),document.body.appendChild(Se);const D=Se.getBoundingClientRect();Se.style.left=Math.max(8,Math.min(w,window.innerWidth-D.width-8))+"px",Se.style.top=Math.max(8,Math.min(E,window.innerHeight-D.height-8))+"px",setTimeout(()=>document.addEventListener("pointerdown",na,!0),0)}function Ga(w,E,O){const I=F(w);if(!I)return;const D=pe(n,I),{current:P}=sn(D);_n(E,O,[{icon:"bi-flower2",label:P?"Kultur bearbeiten":"Kultur setzen",action:()=>ra(I,P,"current",D.length)},{icon:"bi-plus-lg",label:"Nächste Kultur planen",action:()=>ra(I,null,"next",D.length)},{icon:"bi-list-check",label:"Aufgabe planen",action:()=>ia(I,null,P)},{sep:!0},{icon:"bi-arrow-right-circle",label:"Fläche öffnen",action:()=>{o=w,ae("flaechen"),z()}},{icon:"bi-map",label:"Auf Karte",action:()=>Ht()}],I.name)}function Ze(){m&&(m.remove(),m=null)}function Ua(w,E,O,I){Ze();const D=document.createElement("div");return D.className="kmodal-ov",D.innerHTML=`<div class="kmodal" role="dialog" aria-modal="true">
      <div class="kmodal-h"><span>${b(w)}</span><button class="kmodal-x" aria-label="Schließen"><i class="bi bi-x-lg"></i></button></div>
      <div class="kmodal-b">${E}</div>
      <div class="kmodal-f"><button class="btn-cancel" data-k="cancel">Abbrechen</button><button class="btn-save" data-k="save">${b(O)}</button></div></div>`,e.appendChild(D),m=D,D.querySelector(".kmodal-x").addEventListener("click",Ze),D.querySelector('[data-k="cancel"]').addEventListener("click",Ze),D.addEventListener("mousedown",P=>{P.target===D&&Ze()}),D.querySelector('[data-k="save"]').addEventListener("click",()=>{I(D)!==!1&&Ze()}),D.querySelectorAll("[data-more]").forEach(P=>P.addEventListener("click",()=>{const C=D.querySelector("[data-more-box]");C&&(C.hidden=!1,P.style.display="none")})),setTimeout(()=>D.querySelector("input,select,textarea,.km-tile")?.focus?.(),30),D}function Va(){const w=new Set,E=[],O=D=>{const P=String(D||"").trim().toLowerCase();D&&!w.has(P)&&(w.add(P),E.push(D))};return l.forEach(D=>O(D.name)),i.forEach(D=>O(D.kultur)),`<datalist id="km-kultur-dl">${E.map(D=>`<option value="${b(D)}"></option>`).join("")}</datalist>`}function ra(w,E,O,I){const D=O==="next"&&!E,P=E||{},C=(P.kulturStammId?l.find(f=>f.id===P.kulturStammId):null)||on(l,P.kultur),J=P.pflanzDatum?.slice(0,10)||(D?"":Ye()),X=It.map(f=>`<button type="button" class="km-sw${(P.color||"")===f?" on":""}" data-col="${f}" style="background:${f}"></button>`).join(""),re=Ed.map(f=>`<option value="${b(f)}"${(P.einheit||"Pflanzen")===f?" selected":""}>${b(f)}</option>`).join(""),Z=`
      <label class="km-fld big">Was wächst hier?<input list="km-kultur-dl" data-f="kultur" value="${b(P.kultur||"")}" placeholder="z. B. Tomate – aus Bibliothek wählen" autocomplete="off" /></label>${Va()}
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
        <label class="km-fld">${D?"Geplante Pflanzung":"Pflanzung"}<input type="date" data-f="pflanz" value="${J}" /></label>
      </div>
      <div class="km-frow2">
        <label class="km-fld">Ernte von<input type="date" data-f="ernteVon" value="${(P.ernteVon||"").slice(0,10)}" /></label>
        <label class="km-fld">Ernte bis<input type="date" data-f="ernteBis" value="${(P.ernteBis||P.ernteDatum||"").slice(0,10)}" /></label>
      </div>
      <div class="km-hint2"><i class="bi bi-info-circle"></i> Termine kommen automatisch aus der Bibliothek – jederzeit frei überschreibbar.</div>
      <div class="km-frow2">
        <label class="km-fld">Menge<input type="number" step="1" min="0" data-f="menge" value="${P.menge!=null?P.menge:""}" placeholder="optional" /></label>
        <label class="km-fld">Einheit<select data-f="einheit">${re}</select></label>
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
        <label class="km-fld">Status<select data-f="status">${["aktiv","geplant","abgeschlossen"].map(f=>`<option value="${f}"${(P.status||(D?"geplant":"aktiv"))===f?" selected":""}>${xd[f].label}</option>`).join("")}</select></label>
        <div class="km-fld">Farbe<div class="km-sws">${X}</div></div>
        <label class="km-fld">Notiz<textarea data-f="notes" rows="2" placeholder="optional">${b(P.notes||"")}</textarea></label>
      </div>
      ${E?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Satz löschen</button>':""}`,K=Ua(E?"Satz bearbeiten":D?"Nächsten Satz planen":"Satz eintragen",Z,"Speichern",f=>{const v=nt=>f.querySelector(`[data-f="${nt}"]`)?.value?.trim()||"",N=v("kultur");if(!N)return T.warning("Bitte eine Kultur angeben."),!1;const H=on(l,N),Y=v("aussaat")||null,de=v("pflanz")||null,ve=v("ernteVon")||null,ye=v("ernteBis")||null,Qe=v("menge"),sa=Qe?Number(Qe):null,Kn=f.querySelector('[data-f="einheit"]')?.value||null,ft=!f.querySelector("[data-more-box]").hidden;let Dt=ft?v("status"):"";Dt||(Dt=D||de&&we(de)>Number(Ye().replace(/-/g,""))?"geplant":"aktiv");const Za=f.querySelector(".km-sw.on")?.dataset.col||P.color||H?.color||It[I%It.length],Qa=i.find(nt=>nt.kultur===N)?.eppoCode||H?.eppoCode||null,Oe=ft?v("notes")||null:P.notes||null,oa={flaecheTyp:w.typ,flaecheId:w.id,kultur:N,eppoCode:Qa,color:Za,menge:sa,einheit:Kn,kulturStammId:H?.id||P.kulturStammId||null,notes:Oe},Wn=!E&&f.querySelector('[data-f="succOn"]')?.checked,$t=Math.max(2,Math.min(20,Number(f.querySelector('[data-f="succN"]')?.value)||2)),la=Math.max(1,Number(f.querySelector('[data-f="succGap"]')?.value)||14),ca=Number(Ye().replace(/-/g,""));(async()=>{try{if(Wn){const nt="sg-"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),da={aussaatDatum:Y,pflanzDatum:de,ernteVon:ve,ernteBis:ye};for(let At=0;At<$t;At++){const jn=Dd(da,At*la),Zs=jn.pflanzDatum&&we(jn.pflanzDatum)>ca?"geplant":Dt;await ri({...oa,...jn,ernteDatum:null,status:Zs,satzGruppe:nt})}T.success(`${$t} Sätze angelegt.`)}else await ri({id:E?.id,...oa,aussaatDatum:Y,pflanzDatum:de,ernteVon:ve,ernteBis:ye,ernteDatum:null,status:Dt,satzGruppe:P.satzGruppe||null});await L(),U(),W()}catch{T.error("Speichern fehlgeschlagen.")}})()});let Q="pflanz";const se=f=>K.querySelector(`[data-f="${f}"]`),fe=K.querySelector("[data-anchor-row]"),Be=K.querySelector("[data-stammhint]");let q=C;const oe=()=>{if(!q){Be.hidden=!0,fe.style.opacity="0.45";return}fe.style.opacity="1";const v=[Sd[q.anbauMethode==="anzucht"?"anzucht":"direkt"].short];q.kulturTage&&v.push(`${q.kulturTage} T. Kultur`),q.anbauMethode==="anzucht"&&q.anzuchtTage&&v.push(`${q.anzuchtTage} T. Anzucht`),q.familie&&v.push(q.familie),Be.innerHTML=`<i class="bi bi-stars"></i> <b>Bibliothek:</b> ${b(v.join(" · "))}`,Be.hidden=!1},s=()=>{if(!q)return;const v=se(Q==="ernte"?"ernteVon":Q).value||Ye(),N=Ld(q,Q,v);N.aussaatDatum!=null&&(se("aussaat").value=N.aussaatDatum||""),N.pflanzDatum!=null&&(se("pflanz").value=N.pflanzDatum||""),N.ernteVon!=null&&(se("ernteVon").value=N.ernteVon||""),N.ernteBis!=null&&(se("ernteBis").value=N.ernteBis||"")},g=se("kultur");g.addEventListener("input",()=>{q=on(l,g.value),oe()}),g.addEventListener("change",()=>{q=on(l,g.value),oe(),q&&(se("pflanz").value||(se("pflanz").value=Ye()),s())}),K.querySelectorAll("[data-anchor]").forEach(f=>f.addEventListener("click",()=>{K.querySelectorAll("[data-anchorseg] .km-segb").forEach(v=>v.classList.remove("on")),f.classList.add("on"),Q=f.dataset.anchor,s()})),["aussaat","pflanz","ernteVon"].forEach(f=>se(f)?.addEventListener("change",()=>{f===(Q==="ernte"?"ernteVon":Q)&&s()})),oe();const y=K.querySelector('[data-f="succOn"]');y?.addEventListener("change",()=>{K.querySelector("[data-succ-box]").hidden=!y.checked}),K.querySelectorAll(".km-sw").forEach(f=>f.addEventListener("click",()=>{K.querySelectorAll(".km-sw").forEach(v=>v.classList.remove("on")),f.classList.add("on")})),K.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(E?.id)try{await Co({id:E.id}),await L(),U(),W(),Ze()}catch{T.error("Löschen fehlgeschlagen.")}})}function ia(w,E,O){const I=E||{art:"bewaesserung",status:"geplant"},D=Ad.map(Z=>`<button type="button" class="km-tile${(I.art||"bewaesserung")===Z.art?" on":""}" data-art="${Z.art}" style="--ac:${Mn[Z.art].color}"><i class="bi ${Z.icon}"></i><span>${b(Z.label)}</span></button>`).join(""),P=(I.status||"geplant")==="erledigt",C=(P?I.erledigtDatum:I.planDatum)||Ye(),J=`
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
        <label class="km-fld">Bezeichnung<input data-f="notes" value="${b(I.notes||"")}" placeholder="z. B. Kompostgabe" /></label>
        <div class="km-frow2">
          <label class="km-fld">Menge<input type="number" step="0.1" data-f="menge" value="${I.menge!=null?I.menge:""}" placeholder="optional" /></label>
          <label class="km-fld">Einheit<input data-f="einheit" value="${b(I.einheit||"")}" placeholder="kg/ha, l" /></label>
        </div>
        <label class="km-fld">Mittel<input data-f="mittel" value="${b(I.mittel||"")}" placeholder="optional" /></label>
      </div>
      ${E?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Aufgabe löschen</button>':""}`,X=Ua(E?"Aufgabe bearbeiten":"Aufgabe hinzufügen",J,"Speichern",Z=>{const K=Z.querySelector(".km-tile.on")?.dataset.art||"bewaesserung",Q=Z.querySelector(".km-segb.on")?.dataset.status||"geplant",se=Z.querySelector('[data-f="datum"]').value||Ye(),fe=!Z.querySelector("[data-more-box]").hidden,Be=oe=>{const s=Z.querySelector(`[data-f="${oe}"]`)?.value;return s?Number(s):null},q=oe=>Z.querySelector(`[data-f="${oe}"]`)?.value.trim()||null;(async()=>{try{await ni({id:E?.id,flaecheTyp:w.typ,flaecheId:w.id,anbauId:E?.anbauId||O?.id||null,art:K,status:Q,planDatum:Q==="geplant"?se:E?.planDatum||null,erledigtDatum:Q==="erledigt"?se:null,menge:fe?Be("menge"):E?.menge??null,einheit:fe?q("einheit"):E?.einheit||null,mittel:fe?q("mittel"):E?.mittel||null,historyId:E?.historyId||null,notes:fe?q("notes"):E?.notes||null}),await L(),U(),W()}catch{T.error("Speichern fehlgeschlagen.")}})()});X.querySelectorAll(".km-tile").forEach(Z=>Z.addEventListener("click",()=>{X.querySelectorAll(".km-tile").forEach(K=>K.classList.remove("on")),Z.classList.add("on")})),X.querySelectorAll(".km-segb").forEach(Z=>Z.addEventListener("click",()=>{X.querySelectorAll(".km-segb").forEach(K=>K.classList.remove("on")),Z.classList.add("on")}));const re=X.querySelector('[data-f="datum"]');X.querySelectorAll("[data-day]").forEach(Z=>Z.addEventListener("click",()=>{const K=Z.dataset.day;if(K==="x"){re.style.display="inline-block",re.showPicker?.();return}const Q=new Date;Q.setDate(Q.getDate()+Number(K)),re.value=Q.toISOString().slice(0,10),re.style.display="none"})),X.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(E?.id)try{await ai({id:E.id}),await L(),U(),W(),Ze()}catch{T.error("Löschen fehlgeschlagen.")}})}e.querySelectorAll(".km-modebtn").forEach(w=>w.addEventListener("click",()=>ae(w.dataset.mode))),document.addEventListener("keydown",w=>{w.key==="Escape"&&(m&&Ze(),Ot())}),window.addEventListener("psm:openKultur",w=>{const E=w?.detail;!E?.typ||!E?.id||(o=E.typ+":"+E.id,ae("flaechen"),u&&(Ue(),he(),z()))}),t.state.subscribe(w=>{w?.app?.activeSection==="kultur"&&(u?(async()=>(a=await Gi(t),U(),z()))():(u=!0,B()))}),ce()}function Md(){return`
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
  </section>`}const Id=["pflanzenschutz.json","history.json","entries.json"];let Ui=!1,_=null,pt=!1;const Ft=25,sr=new Intl.NumberFormat("de-DE");let xe=0,ln=null,Vi=null;const Cd=ks({id:"import",label:"Import-Vorschau",budget:{initialLoad:20,maxItems:50}});let $r=null;function Bd(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function Nd(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Fd(e,t){const a=e.querySelector('[data-role="import-log-list"]');if(a){if(!t.length){a.innerHTML='<tr><td colspan="5" class="text-muted small">Noch keine Importe protokolliert.</td></tr>';return}a.innerHTML=t.map(n=>{const r=n.rangeStart||n.rangeEnd?`${za(n.rangeStart)||n.rangeStart||"?"} – ${za(n.rangeEnd)||n.rangeEnd||"?"}`:"-",i=[n.source,n.device].filter(Boolean),l=i.length?b(i.join(" · ")):"-";return`
        <tr>
          <td>${b(Nd(n.importedAt))}</td>
          <td>${l}</td>
          <td class="text-end text-success">${n.added}</td>
          <td class="text-end text-muted">${n.skipped}</td>
          <td class="small text-muted">${b(r)}</td>
        </tr>`}).join("")}}async function vn(e){if(le()==="sqlite")try{const t=await Bo(50);Fd(e,t.items||[])}catch(t){console.warn("Import-Historie konnte nicht geladen werden",t)}}function mt(e,t,a="info"){const n=e.querySelector('[data-role="import-hint"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a} small mt-3`,n.textContent=t}}function Ct(e,t){const a=e.querySelector('[data-role="import-feedback"]');a&&(a.textContent=t)}function St(e){const t=e.querySelector('[data-action="clear-import"]'),a=e.querySelector('[data-action="focus-import"]'),n=e.querySelector('[data-action="run-import"]'),r=!!_;if(t&&(t.disabled=!r||pt),a&&(a.disabled=!r||pt),n){const i=!!(_?.importableEntries?.length&&_.stats||_?.fotos?.length);n.disabled=!r||!i||pt}}function Td(e){_=null,Gd(e);const t=e.querySelector('[data-role="import-summary-card"]'),a=e.querySelector('[data-role="import-file"]');t&&t.classList.add("d-none"),a&&(a.value=""),Ct(e,""),mt(e,"Bereit für eine neue Importdatei."),St(e),jt()}function Ws(e){if(e.dateIso)return e.dateIso;if(e.datum){const t=new Date(e.datum);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.date){const t=new Date(e.date);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.savedAt){const t=new Date(e.savedAt);if(!Number.isNaN(t.getTime()))return t.toISOString()}return null}function In(e){return e?za(e)||e.slice(0,10):"-"}function js(e){return e.savedAt||(e.savedAt=e.createdAt||e.dateIso||new Date().toISOString()),e}function Zi(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function qd(e){if(!e||typeof e!="object")return null;const t={...e};if(!Array.isArray(t.items)){const a=e.items;t.items=Array.isArray(a)?[...a]:[]}return js(t),t}function Gs(e,t){const a=e.map(n=>Ws(n)).filter(n=>!!n).sort();return{startIso:a[0]||t?.filters?.startDate||null,endIso:a[a.length-1]||t?.filters?.endDate||null}}function Hd(e){if(!e)return;const t=Zi(e.startIso,"start"),a=Zi(e.endIso,"end");if(!t&&!a)return;const n={};return t&&(n.startDate=t),a&&(n.endDate=a),n}async function Us(e,t){if(le()!=="sqlite"){const o=Te(e.history);return new Set(o.map(c=>Cn(c)).filter(c=>!!c))}const n=Hd(t);if(!n)return new Set;const r=new Set;let i=1;const l=500;try{for(;;){const o=await us({page:i,pageSize:l,filters:n,sortDirection:"asc"});if(o.items.forEach(c=>{const u=Cn(c);u&&r.add(u)}),i*l>=o.totalCount)break;i+=1}}catch(o){return console.warn("Konnte vorhandene Einträge für Duplikatprüfung nicht laden",o),new Set}return r}function Cn(e){const t=typeof e.clientUuid=="string"&&e.clientUuid?e.clientUuid:"";if(t)return`uuid:${t}`;const a=e.savedAt||e.dateIso||e.createdAt||e.datum||"",n=e.ersteller||"",r=e.kultur||"",i=e.invekos||e.standort||"";return[a,n,r,i].join("|")}function Od(e,t,a,n){const r=n||Gs(e,a),i=r.startIso,l=r.endIso,o=new Set,c=new Set;return t.forEach(u=>{u.ersteller&&o.add(u.ersteller),u.kultur&&c.add(u.kultur)}),{startDateLabel:In(i),endDateLabel:In(l),startDateRaw:i,endDateRaw:l,entryCount:e.length,importableCount:t.length,duplicateCount:e.length-t.length,creators:Array.from(o).slice(0,5),crops:Array.from(c).slice(0,5)}}function _d(e,t){const a=e.querySelector('[data-role="import-stats"]');if(!a)return;if(!t){a.innerHTML="";return}const n=t.stats,r=t.metadata?.filters;a.innerHTML=`
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
  `}function Kd(e,t){const a=e.querySelector('[data-role="import-warnings"]');if(!a)return;if(!t||!t.warnings.length){a.innerHTML="";return}const n=t.warnings.map(r=>`<li>${b(r)}</li>`).join("");a.innerHTML=`
    <div class="alert alert-warning">
      <strong>Hinweise:</strong>
      <ul class="mb-0">${n}</ul>
    </div>
  `}function Vs(e){const t=e.entries.length;if(!t)return xe=0,{start:0,end:0,total:0};const a=Math.max(Math.ceil(t/Ft),1);xe>=a&&(xe=a-1),xe<0&&(xe=0);const n=xe*Ft,r=Math.min(n+Ft,t);return{start:n,end:r,total:t}}function Rd(e){const t=e.querySelector('[data-role="import-pager"]');return t?((!ln||Vi!==t)&&(ln?.destroy(),ln=qa(t,{onPrev:()=>Wd(e),onNext:()=>jd(e),labels:{prev:"Zurück",next:"Weiter",loading:"Vorschau wird geladen...",empty:"Keine Einträge verfügbar"}}),Vi=t),ln):null}function Aa(e,t){const a=Rd(e);if(!a)return;if(!t){xe=0,a.update({status:"hidden"});return}const n=t.entries.length;if(!n){xe=0,a.update({status:"disabled",info:"Keine Einträge vorhanden."});return}const{start:r,end:i}=Vs(t),l=`Einträge ${sr.format(r+1)}–${sr.format(i)} von ${sr.format(n)}`;a.update({status:"ready",info:l,canPrev:xe>0,canNext:i<n})}function Wd(e){!_||xe===0||(xe=Math.max(xe-1,0),Vr(e,_))}function jd(e){if(!_)return;const t=_.entries.length;if(!t)return;const a=Math.max(Math.ceil(t/Ft)-1,0);xe>=a||(xe=Math.min(xe+1,a),Vr(e,_))}function Gd(e){xe=0,e&&Aa(e,_)}function Vr(e,t){const a=e.querySelector('[data-role="import-preview-table"]');if(!a){jt();return}if(!t){a.innerHTML="",Aa(e,null),jt();return}if(!t.entries.length){a.innerHTML='<tr><td colspan="5" class="text-center text-muted">Keine Einträge</td></tr>',Aa(e,t),jt();return}const{start:r,end:i}=Vs(t),o=t.entries.slice(r,i).map(c=>{const u=In(Ws(c));return`
        <tr>
          <td>${b(u)}</td>
          <td>${b(c.kultur||"-")}</td>
          <td>${b(c.ersteller||"-")}</td>
          <td>${b(c.standort||c.invekos||"-")}</td>
          <td>${b(c.savedAt?In(c.savedAt):"-")}</td>
        </tr>
      `}).join("");a.innerHTML=o,Aa(e,t),jt()}async function Ud(e){const t=To(e),a=Object.keys(t),n=a.find(u=>Id.some(d=>u.toLowerCase().endsWith(d)));if(!n)throw new Error("ZIP enthält keine 'pflanzenschutz.json'.");const r=JSON.parse(or(t[n])),i=a.find(u=>u.toLowerCase().endsWith("metadata.json")),l=i?JSON.parse(or(t[i])):null,o=Array.isArray(r)?r:Array.isArray(r.entries)?r.entries:Array.isArray(r.history)?r.history:[],c=Array.isArray(r?.fotos)?r.fotos:[];for(const u of c){if(u?.data)continue;const d=u?.file?String(u.file):null,p=d?a.find(m=>m===d||m.toLowerCase().endsWith(d.toLowerCase())):null;p&&t[p]&&(u.data=Vd(t[p]),u.mime||(u.mime="image/jpeg"))}return{entries:o,metadata:l,fotos:c}}function Vd(e){let t="";for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode(...e.subarray(n,n+32768));return btoa(t)}async function Zd(e){const t=or(e),a=JSON.parse(t);if(Array.isArray(a))return{entries:a,metadata:null,fotos:[]};const n=Array.isArray(a.fotos)?a.fotos:[];if(Array.isArray(a.entries))return{entries:a.entries,metadata:a.metadata||null,fotos:n};if(Array.isArray(a.history))return{entries:a.history,metadata:a.metadata||null,fotos:n};if(n.length)return{entries:[],metadata:a.metadata||null,fotos:n};throw new Error("JSON enthält keine Eintragsliste.")}async function Qd(e,t){const a=new Uint8Array(await e.arrayBuffer()),n=/\.zip$/i.test(e.name)||e.type==="application/zip",{entries:r,metadata:i,fotos:l}=n?await Ud(a):await Zd(a),o=Array.isArray(l)?l:[],c=(Array.isArray(r)?r:[]).map(S=>qd(S)).filter(S=>!!S);if(!c.length&&!o.length)throw new Error("Die Datei enthielt keine verwertbaren Einträge.");const u=Gs(c,i),d=await Us(t,u),p=new Set,m=[];let x=0;c.forEach(S=>{const A=Cn(S);if(!A){m.push(S);return}if(d.has(A)||p.has(A)){x+=1;return}p.add(A),m.push(S)});const h=Od(c,m,i,u),k=[];return x&&k.push(`${x} Datensätze wurden wegen gleicher Kennung übersprungen.`),(!h.startDateRaw||!h.endDateRaw)&&k.push("Zeitraum konnte nicht eindeutig ermittelt werden."),{filename:e.name,entries:c,importableEntries:m,metadata:i,stats:h,warnings:k,lastImportRefs:[],fotos:o}}function Qi(){if(!_)return"Keine Datei";const e=[];return pt&&e.push("Verarbeitung"),_.warnings.length&&e.push("Warnungen"),_.stats.importableCount<_.stats.entryCount&&e.push("Duplikate entfernt"),e.length?e.join(" · "):void 0}function Jd(){const e=!!_,t=e?Math.max(Math.ceil((_?.entries.length||0)/Ft),1):null,a=e?{items:_?.entries.length??0,totalCount:_?.stats.entryCount??null,cursor:_&&(_.entries.length||0)>Ft?`Seite ${xe+1}${t?` / ${t}`:""}`:null,payloadKb:Es(_?.entries.slice(0,Ft)),lastUpdated:$r,note:Qi()}:{items:0,totalCount:0,cursor:null,payloadKb:0,lastUpdated:$r,note:Qi()};Ss(Cd,a)}function jt(){$r=new Date().toISOString(),Jd()}function Ar(e){const t=e.querySelector('[data-role="import-summary-card"]');if(!t)return;if(!_){t.classList.add("d-none"),Aa(e,null),St(e),jt();return}t.classList.remove("d-none"),xe=0;const a=t.querySelector('[data-role="import-file-name"]'),n=t.querySelector('[data-role="import-summary-subline"]');a&&(a.textContent=_.filename),n&&(n.textContent=`${_.stats.importableCount} von ${_.stats.entryCount} Einträgen importierbar`),_d(e,_),Kd(e,_),Vr(e,_),St(e)}async function Yd(){const e=le();if(!e||e==="memory"||e==="sqlite")return;const t=_e();await Ke(t)}function Ji(e,t){if(!t.length)return[];const a=typeof e.state.updateSlice=="function"?e.state.updateSlice:je,n=[];return a("history",r=>{const i=Fa(r),l=i.items.slice(),o=l.length;return t.forEach((c,u)=>{n.push(o+u),l.push(c)}),{...i,items:l,totalCount:l.length,lastUpdatedAt:new Date().toISOString()}}),n}async function Xd(e,t){if(!_){window.alert("Bitte zuerst eine Importdatei laden.");return}const a=_.fotos||[];if(!_.importableEntries.length&&!a.length){window.alert("Alle Einträge wurden bereits importiert oder als Duplikat erkannt.");return}pt=!0,St(e),Ct(e,"Import läuft ...");const n=t.state.getState(),r={startIso:_.stats.startDateRaw,endIso:_.stats.endDateRaw};let i=new Set;try{i=await Us(n,r)}catch(k){console.warn("Duplikatprüfung vor Import fehlgeschlagen",k)}const l=new Set(i),o=[];let c=0;if(_.importableEntries.forEach(k=>{const S=Cn(k);if(S&&l.has(S)){c+=1;return}S&&l.add(S),o.push(k)}),!o.length&&!a.length){Ct(e,"Keine neuen Einträge gefunden."),mt(e,"Alle Datensätze sind bereits importiert worden.","warning"),pt=!1,St(e);return}const u=le(),d=[],p=[];let m=0,x=0;const h=o.map(k=>js({...k}));try{if(u==="sqlite"){const M=[];for(const V of h)try{const W=await es(V);if(W?.duplicate){c+=1;continue}W?.id!=null&&(d.push({source:"sqlite",ref:W.id}),M.push(V))}catch(W){console.error("appendHistoryEntry failed",W),p.push(V.savedAt||"Unbekannter Eintrag")}Ji(t,M);for(const V of a)try{(await No(V))?.duplicate?x+=1:m+=1}catch(W){console.error("appendFoto failed",W)}m&&window.dispatchEvent(new CustomEvent("fotos:changed"));try{await We()}catch(V){console.warn("SQLite-Datei konnte nach dem Import nicht gespeichert werden",V)}}else Ji(t,h).forEach(V=>{d.push({source:"state",ref:V})}),await Yd();const k=d.length;if(k||m){u==="sqlite"&&k&&t.events?.emit?.("history:data-changed",{type:"created-bulk",count:k});const M=[];k&&M.push(`${k} Einträge`),m&&M.push(`${m} Foto(s)`),Ct(e,`${M.join(" und ")} importiert.${p.length?` ${p.length} Einträge konnten nicht übernommen werden.`:""}`.trim()),_.lastImportRefs=d,_.importableEntries=[],_.stats={..._.stats,importableCount:0},Ar(e)}else Ct(e,"Keine neuen Daten importiert.");const S=[];let A="success";if(p.length&&(S.push(`${p.length} Einträge konnten nicht gespeichert werden. Details siehe Konsole.`),A="warning"),c&&(S.push(`${c} Einträge wurden während des Imports als Duplikat übersprungen.`),A="warning"),x&&S.push(`${x} Foto(s) waren bereits vorhanden (übersprungen).`),S.length||S.push("Import abgeschlossen."),mt(e,S.join(" "),A),u==="sqlite"&&(k||c||m||x))try{const M=[];p.length&&M.push(`${p.length} fehlgeschlagen`),m&&M.push(`${m} Fotos`),x&&M.push(`${x} Fotos doppelt`),await Fo({source:_.filename||null,device:_.metadata?.device||_.metadata?.label||null,added:k,skipped:c,rangeStart:_.stats.startDateRaw,rangeEnd:_.stats.endDateRaw,note:M.length?M.join(", "):null}),await We().catch(()=>{}),await vn(e)}catch(M){console.warn("Import-Historie konnte nicht geschrieben werden",M)}}catch(k){console.error("Import fehlgeschlagen",k),Ct(e,"Import fehlgeschlagen. Siehe Konsole für Details."),mt(e,"Import fehlgeschlagen. Bitte erneut versuchen.","danger")}finally{pt=!1,St(e)}}function eu(e,t,a){if(!e.events?.emit)return;const n=t.metadata?.label||t.metadata?.filters?.label||`Import ${t.filename}`;e.events.emit("documentation:focus-range",{startDate:t.stats.startDateRaw||void 0,endDate:t.stats.endDateRaw||void 0,label:n,reason:"import",entryIds:a,autoSelectFirst:!!a.length})}function tu(e,t){if(!_){window.alert("Bitte zuerst eine Importdatei laden.");return}if(!_.stats.startDateRaw||!_.stats.endDateRaw){window.alert("Zeitraum konnte nicht bestimmt werden.");return}eu(t,_,_.lastImportRefs),mt(e,"Dokumentation wurde auf den Importzeitraum fokussiert.")}function au(e,t){const a=e.querySelector('[data-role="import-file"]');a&&a.addEventListener("change",()=>{const n=a.files?.[0];n&&(pt=!0,mt(e,"Datei wird analysiert ..."),St(e),Ct(e,""),Qd(n,t.state.getState()).then(r=>{_=r,Ar(e),mt(e,`${r.importableEntries.length} Einträge bereit zum Import.`)}).catch(r=>{console.error("Importdatei konnte nicht gelesen werden",r),mt(e,r?.message||"Importdatei konnte nicht gelesen werden.","danger"),_=null,Ar(e)}).finally(()=>{pt=!1,St(e)}))}),e.addEventListener("click",n=>{const r=n.target?.closest("[data-action]");if(!r)return;const i=r.dataset.action;if(i){if(i==="clear-import"){Td(e);return}if(i==="focus-import"){tu(e,t);return}i==="run-import"&&Xd(e,t)}})}function nu(e,t){if(!e||Ui)return;const a=e;a.innerHTML="";const n=Bd();a.appendChild(n),au(n,t),mt(n,"Wähle eine Datei aus, um den Import zu starten."),vn(n),tt("database:connected",()=>void vn(n)),tt("app:sectionChanged",r=>{(r==="daten"||r==="documentation"||r==="import")&&vn(n)}),Ui=!0}const Mt=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function ru(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function Kt(e,t,a,n){return`
    <div class="dash-card"${n?` data-goto="${n}" style="cursor:pointer;"`:""}>
      <div class="dash-card-ic"><i class="bi ${e}"></i></div>
      <div class="dash-card-body"><div class="dash-card-value">${a}</div><div class="dash-card-label">${b(t)}</div></div>
    </div>`}function iu(){return`
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
  </section>`}function su(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=iu();const a=e.querySelector('[data-role="dash-cards"]'),n=e.querySelector('[data-role="dash-warn"]'),r=e.querySelector('[data-role="dash-recent"]');e.addEventListener("click",l=>{const o=l.target?.closest("[data-goto]");if(!o)return;const c=o.getAttribute("data-goto");c&&t.state.updateSlice("app",u=>({...u,activeSection:c}))});const i=async()=>{if(le()!=="sqlite"){a&&(a.innerHTML='<div class="dash-empty">Bitte zuerst eine Datenbank öffnen.</div>');return}const l=t.state.getState(),o=(Te(l.gps?.points)||[]).length;let c=0,u=0,d=0,p=0,m=[],x=[],h=0;try{c=(await zr())?.rows?.length||0}catch{}try{u=(await ds())?.rows?.length||0}catch{}try{const k=(await Pr())?.rows||[];d=k.length,p=k.reduce((S,A)=>S+(A.plants||0),0)}catch{}try{m=(await cs())?.rows||[]}catch{}try{const k=await us({}),S=k?.entries||k?.rows||[];h=k?.totalCount??S.length,x=S.slice(0,6)}catch{}if(a&&(a.innerHTML=[Kt("bi-geo-alt","Standorte",Mt(o)),Kt("bi-flower1","Kulturen",Mt(c)),Kt("bi-droplet","Mittel im Sortiment",Mt(u),"lager"),Kt("bi-journal-check","Anwendungen",Mt(h),"documentation"),Kt("bi-map","Acker-Flächen",Mt(d),"acker"),Kt("bi-flower3","Pflanzen (Acker)",Mt(p),"acker")].join("")),n){const k=[];m.forEach(A=>{A.bestand<=0&&(A.verbraucht>0||A.zugang>0)&&k.push(`<div class="dash-row"><span><i class="bi bi-box-seam me-1" style="color:#ef4444"></i>${b(A.name)}</span><span style="color:#ef4444">Bestand ${Mt(A.bestand)} ${b(A.einheit||"")}</span></div>`)}),m.forEach(A=>{if(!A.zulEnde)return;const M=Math.round((new Date(A.zulEnde).getTime()-Date.now())/864e5);M<0?k.push(`<div class="dash-row"><span><i class="bi bi-calendar-x me-1" style="color:#ef4444"></i>${b(A.name)}</span><span style="color:#ef4444">Zulassung abgelaufen</span></div>`):M<180&&k.push(`<div class="dash-row"><span><i class="bi bi-calendar-event me-1" style="color:#f59e0b"></i>${b(A.name)}</span><span style="color:#f59e0b">Zulassung endet in ${M} T</span></div>`)});const S=k.length>6?`<div class="dash-row" style="color:var(--color-text-muted)"><span>+ ${k.length-6} weitere</span></div>`:"";n.innerHTML=k.length?k.slice(0,6).join("")+S:'<div class="dash-empty">Alles im grünen Bereich. ✓</div>'}r&&(r.innerHTML=x.length?x.map(k=>{const S=ru(k.datum||k.dateIso||k.created_at||k.createdAt||null),A=k.kultur||"",M=k.standort||"";return`<div class="dash-row"><span>${b(M)}${A?" · "+b(A):""}</span><span class="dash-empty" style="padding:0">${b(S)}</span></div>`}).join(""):'<div class="dash-empty">Noch keine Anwendungen erfasst.</div>')};t.state.subscribe(l=>{l?.app?.activeSection==="dashboard"&&i()}),i()}function Yi(e){document.querySelectorAll(".content-section").forEach(a=>{a.style.display="none"});const t=document.getElementById(`section-${e}`);t instanceof HTMLElement&&(t.style.display="block")}function Xi(){qo(),as();const e={state:{getState:R,updateSlice:je,subscribe:wn},events:{emit:(S,A)=>{wt(async()=>{const{emit:M}=await import("./index.CKDSmSjT.js").then(V=>V.aS);return{emit:M}},[]).then(({emit:M})=>{M(S,A)})},subscribe:tt}},t=document.querySelector('[data-region="startup"]'),a=document.querySelector('[data-region="shell"]'),n=document.querySelector('[data-region="main"]'),r=document.querySelector('[data-region="footer"]');gl(t,e);const i=document.querySelector('[data-feature="calculation"]');Ho(i,e);const l=document.querySelector('[data-feature="documentation"]');uc(l,e);const o=document.querySelector('[data-feature="settings"]');nd(o,e);const c=document.querySelector('[data-feature="lager"]');sd(c,e);const u=document.querySelector('[data-feature="acker"]');ld(u,e);const d=document.querySelector('[data-feature="kultur"]');Pd(d,e);const p=document.querySelector('[data-feature="fotos"]');Oo(p,e,{archiveMode:!0});const m=document.querySelector('[data-feature="import-page"]');nu(m,{state:{getState:R,updateSlice:je},events:e.events});const x=document.querySelector('[data-feature="dashboard"]');su(x,e);const h=S=>{const A=document.body;A&&(A.classList.toggle("bg-app",S),A.classList.toggle("bg-startup",!S))},k=S=>{const A=!!S.app?.hasDatabase;if(h(A),t instanceof HTMLElement&&t.classList.toggle("d-none",A),a instanceof HTMLElement&&a.classList.toggle("d-none",!A),n instanceof HTMLElement&&n.classList.toggle("d-none",!A),r instanceof HTMLElement&&r.classList.toggle("d-none",!A),A){const M=S.app?.activeSection??"dashboard";Yi(M)}};k(e.state.getState()),wn((S,A)=>{S.app?.hasDatabase!==A.app?.hasDatabase&&k(S),S.app?.activeSection!==A.app?.activeSection&&S.app?.hasDatabase&&Yi(S.app.activeSection)}),tt("app:sectionChanged",()=>{})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Xi,{once:!0}):Xi();
