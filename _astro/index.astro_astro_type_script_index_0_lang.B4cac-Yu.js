const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/index.D2RJH-qu.js","_astro/index.B4FIlGfT.js","_astro/leaflet.C03ySvDx.css","_astro/leaflet-src.BcflbDBd.js","_astro/_commonjsHelpers.Cpj98o6Y.js","_astro/index.CPadEFgJ.js"])))=>i.map(i=>d[i]);
import{M as ue,N as ds,J as Ze,O as so,P as oo,Q as us,h as wt,l as lo,a as ps,s as it,n as co,q as ms,p as ii,e as W,r as Dn,C as $n,u as Qe,_ as Et,R as uo,S as po,w as g,t as T,m as si,T as mo,j as rn,k as oi,U as fo,V as go,W as Ke,X as bo,Y as fs,Z as gs,H as bs,G as An,$ as ho,a0 as vo,a1 as yo,a2 as wo,a3 as xo,a4 as Oa,z as Ia,a5 as ko,x as So,a6 as Ge,a7 as Ue,a8 as Eo,a9 as _a,aa as Lo,ab as Do,D as $o,ac as hs,ad as vs,ae as Ba,af as Ao,ag as zo,ah as Po,ai as li,aj as er,ak as tr,al as Mo,am as Co,an as Io,ao as Bo,ap as No,aq as Fo,ar as To,as as ys,at as qo,au as ws,av as Ho,aw as Tr,ax as qr,ay as Oo,az as _o,aA as zn,aB as ci,aC as di,aD as ar,aE as Ro,aF as ui,aG as ga,aH as pi,aI as Ko,aJ as mi,aK as fi,aL as Wo,aM as jo,aN as Go,aO as Uo,aP as gr,v as xs,i as Vo,b as Zo,c as Qo}from"./index.B4FIlGfT.js";const br="__psl_history_seeded",hr=200,gi=["Salat","Apfel","Wein","Tomate","Kartoffel","Hopfen","Raps","Birne"],bi=["Spritzung","Düngung","Pflege","Behandlung"],hi=["LACES","MALDO","VITVI","SOLTU","PRNUS","CUPAR","CYNCR","ALLCE"],vi=["BBCH 10","BBCH 31","BBCH 41","BBCH 55","BBCH 65","BBCH 71","BBCH 81"],Jo=[{mediumId:"seed-water",name:"Wasser",unit:"L",methodId:"perKiste",methodLabel:"pro Kiste",value:.02,zulassungsnummer:"N/A"},{mediumId:"seed-tonikum",name:"Tonikum X",unit:"ml",methodId:"perKiste",methodLabel:"pro Kiste",value:.85,zulassungsnummer:"Z-123456"},{mediumId:"seed-oel",name:"Pflegeöl Y",unit:"ml",methodId:"percentWater",methodLabel:"% vom Wasser",value:.12,zulassungsnummer:"Z-654321"}];function Yo(e){if(typeof window>"u")return;const a=new URLSearchParams(window.location.search).has("seedHistory");if(!a)return;const n=window;n.__PSL||(n.__PSL={});const r=n.__PSL;r.seedHistoryEntries=(l=hr)=>yi(e,{count:l}),r.resetHistorySeedFlag=()=>localStorage.removeItem(br),!a&&!localStorage.getItem(br)&&ue()==="sqlite"&&yi(e,{count:hr,setFlag:!0}).catch(l=>{console.error("History seeding failed",l)})}async function Xo(e){if(!e.state.getState().app?.hasDatabase){if(typeof e.state.subscribe!="function")throw new Error("SQLite-Datenbank ist noch nicht initialisiert.");await new Promise((t,a)=>{const n=window.setTimeout(()=>{i(),a(new Error("SQLite-Datenbank wurde nicht rechtzeitig initialisiert."))},1e4),r=e.state.subscribe?.(l=>{l.app?.hasDatabase&&(i(),t())}),i=()=>{window.clearTimeout(n),typeof r=="function"&&r()}})}}async function yi(e,t={}){const a=t.count??hr;if(ue()!=="sqlite")throw new Error("SQLite-Treiber muss aktiv sein, bevor Daten befüllt werden können.");await Xo(e);const n=performance.now();let r=0;for(let i=0;i<a;i+=1){const l=el(i);await ds(l),r+=1}try{await Ze()}catch(i){console.warn("Seed-Daten konnten nicht persistent gespeichert werden",i)}return e.events.emit("history:data-changed",{source:"dev-history-seed"}),t.setFlag&&localStorage.setItem(br,"1"),{inserted:r,durationMs:performance.now()-n}}function el(e){const t=new Date;t.setDate(t.getDate()-e);const a=t.toLocaleDateString("de-DE"),n=t.toISOString(),r=20+e%30,i=Number((r*.5).toFixed(2));return{datum:a,dateIso:n,ersteller:`Seeder ${1+e%5}`,standort:`Test-Ort ${String.fromCharCode(65+e%6)}`,kultur:gi[e%gi.length],usageType:bi[e%bi.length],kisten:r,eppoCode:hi[e%hi.length],bbch:vi[e%vi.length],gps:`GPS-Notiz ${e}`,gpsCoordinates:{latitude:48+e%10*.01,longitude:11+e%10*.01},gpsPointId:`seed-gps-${e}`,invekos:`INV-${String(1e3+e).padStart(4,"0")}`,uhrzeit:`${String(6+e%12).padStart(2,"0")}:${String(e*7%60).padStart(2,"0")}`,savedAt:n,items:tl(e,r,i)}}function tl(e,t,a){return Jo.map((n,r)=>{const i=1+(e+r)%4*.05,l=Number((n.value*i).toFixed(4)),o=Number((l*t).toFixed(2));return{id:`seed-item-${e}-${r}`,name:n.name,unit:n.unit,methodLabel:n.methodLabel,methodId:n.methodId,value:l,total:o,inputs:{kisten:t,waterVolume:a},zulassungsnummer:n.zulassungsnummer,mediumId:n.mediumId}})}let Ht=null,ba=null,wi=!1,xi=!1;async function al(){if(!("serviceWorker"in navigator))return console.warn("[PWA] Service Workers nicht unterstützt"),null;try{return ba=await navigator.serviceWorker.register("/psm/sw.js",{scope:"/psm/",updateViaCache:"none"}),console.log("[PWA] Service Worker registriert:",ba.scope),ba.addEventListener("updatefound",()=>{const e=ba?.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&(console.log("[PWA] Neues Update verfügbar"),ia("pwa:update-available"))})}),navigator.serviceWorker.addEventListener("message",nl),wi||(wi=!0,navigator.serviceWorker.addEventListener("controllerchange",()=>{xi||(xi=!0,window.location.reload())})),ba}catch(e){return console.error("[PWA] Service Worker Registrierung fehlgeschlagen:",e),null}}function nl(e){const{type:t,payload:a}=e.data||{};switch(t){case"DB_STATE":ia("pwa:db-state",a);break;case"CACHES_CLEARED":ia("pwa:caches-cleared");break}}async function _n(e){if(!navigator.serviceWorker.controller){localStorage.setItem("psm-db-state",JSON.stringify({...e,updatedAt:new Date().toISOString()}));return}navigator.serviceWorker.controller.postMessage({type:"SET_DB_STATE",payload:e})}async function ks(){const e=localStorage.getItem("psm-db-state");if(e)try{return JSON.parse(e)}catch{}return navigator.serviceWorker?.controller?new Promise(t=>{const a=n=>{n.data?.type==="DB_STATE"&&(navigator.serviceWorker.removeEventListener("message",a),t(n.data.payload))};navigator.serviceWorker.addEventListener("message",a),navigator.serviceWorker.controller.postMessage({type:"GET_DB_STATE"}),setTimeout(()=>{navigator.serviceWorker.removeEventListener("message",a),t(null)},1e3)}):null}async function rl(){const e=await ks();return!!(e?.hasDatabase&&e?.autoStartEnabled)}function il(){window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),Ht=e,console.log("[PWA] Install Prompt verfügbar"),localStorage.getItem("psm-app-installed")==="true"&&(console.log("[PWA] Widerspruch erkannt: Flag sagt installiert, aber Prompt verfügbar"),localStorage.removeItem("psm-app-installed"),console.log("[PWA] Veraltetes Installations-Flag entfernt")),ia("pwa:install-available")}),window.addEventListener("appinstalled",()=>{Ht=null,Kn(),console.log("[PWA] App installiert - Flag gesetzt"),ia("pwa:installed")})}function Rn(){return Ht!==null}function Rt(){return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0}function Hr(){const e=navigator.userAgent.toLowerCase();return e.includes("edg/")?"edge":e.includes("chrome")&&!e.includes("edg")?"chrome":e.includes("firefox")?"firefox":e.includes("safari")&&!e.includes("chrome")?"safari":"other"}function Or(){return!!(Rt()||localStorage.getItem("psm-app-installed")==="true"||window.matchMedia("(display-mode: fullscreen)").matches||window.matchMedia("(display-mode: minimal-ui)").matches||window.matchMedia("(display-mode: window-controls-overlay)").matches)}async function Ss(){if(Or())return!0;try{if("getInstalledRelatedApps"in navigator){const e=await navigator.getInstalledRelatedApps();if(console.log("[PWA] getInstalledRelatedApps result:",e),e&&e.length>0)return Kn(),!0}}catch(e){console.warn("[PWA] getInstalledRelatedApps API Fehler:",e)}return!1}function Kn(){localStorage.setItem("psm-app-installed","true"),console.log("[PWA] App als installiert markiert")}function sl(){localStorage.removeItem("psm-app-installed"),console.log("[PWA] Installations-Flag entfernt")}function Es(){const e=Hr(),t=Rt(),a=Or();return{canInstall:Rn(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function Ls(){const e=Hr(),t=Rt(),a=await Ss();return{canInstall:Rn(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function ol(){if(!Ht)return console.warn("[PWA] Kein Install Prompt verfügbar"),!1;try{await Ht.prompt();const{outcome:e}=await Ht.userChoice;return console.log("[PWA] Install Prompt Ergebnis:",e),e==="accepted"&&Kn(),Ht=null,e==="accepted"}catch(e){return console.error("[PWA] Install Prompt fehlgeschlagen:",e),!1}}function ll(e){if(!("launchQueue"in window)){console.log("[PWA] Launch Queue API nicht verfügbar");return}window.launchQueue?.setConsumer(async t=>{if(!t.files?.length){console.log("[PWA] Launch ohne Dateien");return}console.log("[PWA] Datei via Launch Queue empfangen:",t.files.length);for(const a of t.files)try{await e(a),await _n({hasDatabase:!0,fileHandleName:a.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0});break}catch(n){console.error("[PWA] Fehler beim Öffnen der Datei:",n)}}),console.log("[PWA] File Handling initialisiert")}const At="psm-file-handles",_r="last-database";async function vr(e){try{const t=await Rr(),n=t.transaction(At,"readwrite").objectStore(At);await new Promise((r,i)=>{const l=n.put({key:_r,handle:e,savedAt:new Date().toISOString()});l.onsuccess=()=>r(),l.onerror=()=>i(l.error)}),t.close(),console.log("[PWA] FileHandle gespeichert"),await _n({hasDatabase:!0,fileHandleName:e.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}catch(t){console.error("[PWA] FileHandle speichern fehlgeschlagen:",t)}}async function yr(){try{const e=await Rr(),a=e.transaction(At,"readonly").objectStore(At),n=await new Promise((i,l)=>{const o=a.get(_r);o.onsuccess=()=>i(o.result),o.onerror=()=>l(o.error)});if(e.close(),!n?.handle)return null;const r=n.handle;return typeof r.queryPermission=="function"&&await r.queryPermission({mode:"readwrite"})==="granted"?(console.log("[PWA] FileHandle mit Berechtigung geladen"),n.handle):(console.log("[PWA] FileHandle gefunden, aber Berechtigung erforderlich"),n.handle)}catch(e){return console.error("[PWA] FileHandle laden fehlgeschlagen:",e),null}}async function cl(e){try{const t=e;return typeof t.requestPermission!="function"?(await e.getFile(),!0):await t.requestPermission({mode:"readwrite"})==="granted"}catch{return!1}}async function dl(){try{const e=await Rr(),a=e.transaction(At,"readwrite").objectStore(At);await new Promise((n,r)=>{const i=a.delete(_r);i.onsuccess=()=>n(),i.onerror=()=>r(i.error)}),e.close(),await _n({hasDatabase:!1,autoStartEnabled:!1}),console.log("[PWA] FileHandle gelöscht")}catch(e){console.error("[PWA] FileHandle löschen fehlgeschlagen:",e)}}async function Rr(){return new Promise((e,t)=>{const a=indexedDB.open("psm-file-handles",1);a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result),a.onupgradeneeded=n=>{const r=n.target.result;r.objectStoreNames.contains(At)||r.createObjectStore(At,{keyPath:"key"})}})}function ia(e,t){window.dispatchEvent(new CustomEvent(e,{detail:t}))}function Ds(){return{serviceWorker:"serviceWorker"in navigator,fileSystemAccess:typeof window.showOpenFilePicker=="function",launchQueue:"launchQueue"in window,indexedDB:"indexedDB"in window,standalone:Rt(),installAvailable:Rn()}}async function ul(e){if(console.log("[PWA] Initialisierung..."),await al(),il(),e?.onFileOpened&&ll(e.onFileOpened),e?.onAutoStart&&await rl()){const t=await yr();if(t){const a=t;let n=!1;if(typeof a.queryPermission=="function"&&(n=await a.queryPermission({mode:"readwrite"})==="granted"),n){console.log("[PWA] Auto-Start mit gespeicherter Datei"),e.onFileOpened&&await e.onFileOpened(t);return}console.log("[PWA] Auto-Start: Berechtigung für Datei erforderlich"),ia("pwa:permission-required",{handle:t})}}console.log("[PWA] Capabilities:",Ds())}async function pl(){if(console.group("🔧 PWA Debug Status"),console.log("📱 Standalone Mode:",Rt()),console.log("💾 localStorage Flag:",localStorage.getItem("psm-app-installed")),console.log("🔔 Install Prompt verfügbar:",Rn()),console.log("🌐 Browser:",Hr()),console.group("📺 Display Mode Checks"),console.log("standalone:",window.matchMedia("(display-mode: standalone)").matches),console.log("fullscreen:",window.matchMedia("(display-mode: fullscreen)").matches),console.log("minimal-ui:",window.matchMedia("(display-mode: minimal-ui)").matches),console.log("window-controls-overlay:",window.matchMedia("(display-mode: window-controls-overlay)").matches),console.log("browser:",window.matchMedia("(display-mode: browser)").matches),console.groupEnd(),console.group("🔍 getInstalledRelatedApps API"),"getInstalledRelatedApps"in navigator)try{const e=await navigator.getInstalledRelatedApps();console.log("Installierte Apps:",e)}catch(e){console.log("API Fehler:",e)}else console.log("API nicht verfügbar");console.groupEnd(),console.group("📊 Status Vergleich"),console.log("Sync (isProbablyInstalled):",Or()),console.log("Async (checkIfInstalled):",await Ss()),console.log("getInstallStatus():",Es()),console.log("getInstallStatusAsync():",await Ls()),console.groupEnd(),console.log("💡 Tipp: clearInstalledFlag() zum Zurücksetzen des Flags"),console.groupEnd()}typeof window<"u"&&(window.pwaDebug=pl,window.pwaClearFlag=sl);let sn=!1;function ml(e){const t=r=>{if(sn){sn=!1;return}return r.preventDefault(),r.returnValue="",""};let a=!1;const n=r=>{const i=!!r.app?.hasDatabase;i&&!a?(window.addEventListener("beforeunload",t),a=!0):!i&&a&&(window.removeEventListener("beforeunload",t),a=!1)};n(e.getState()),e.subscribe(n),document.addEventListener("click",r=>{const i=r.target.closest("a");i&&i.target==="_blank"&&(sn=!0,setTimeout(()=>{sn=!1},100))})}function fl(){const e=document.getElementById("app-root");if(!e)throw new Error("app-root Container fehlt");return{startup:e.querySelector('[data-region="startup"]'),shell:e.querySelector('[data-region="shell"]'),main:e.querySelector('[data-region="main"]'),footer:e.querySelector('[data-region="footer"]')}}async function gl(){if(so()){window.location.replace("/psm/m/");return}fl(),oo();const e=us();e!=="memory"&&wt(e),await lo();const t={state:{getState:W,patchState:ii,updateSlice:Qe,subscribe:$n},events:{emit:Dn,subscribe:it}};Yo(t),ps(),ml(t.state),ul({onFileOpened:async a=>{const n=await Et(()=>import("./index.B4FIlGfT.js").then(i=>i.aR),[]),r=await Et(()=>import("./index.B4FIlGfT.js").then(i=>i.aQ),[]);if(r.isSupported()){n.setActiveDriver("sqlite");const i=await a.getFile(),l=await i.arrayBuffer(),o=await r.importFromArrayBuffer(l,i.name);await vr(a);const{applyDatabase:c}=await Et(async()=>{const{applyDatabase:p}=await import("./index.B4FIlGfT.js").then(d=>d.aT);return{applyDatabase:p}},[]);c(o.data),Dn("database:connected",{driver:"sqlite",autoStarted:!0})}}}),it("database:connected",async a=>{await _n({hasDatabase:!0,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}),it("database:connected",async a=>{if(ue()==="sqlite")try{await co(),await ms()}catch(n){console.warn("GPS-Punkte konnten beim Start nicht geladen werden",n)}}),ii({app:{...W().app,ready:!0}})}const ki="__pflanzenschutz_bootstrapped__",Si=window;function Ei(){gl().catch(e=>{console.error("bootstrap failed",e)})}Si[ki]||(Si[ki]=!0,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ei,{once:!0}):Ei());const $s=[{id:"start",label:"Start",icon:"bi-grid-1x2",sections:[{section:"dashboard",label:"Übersicht",icon:"bi-grid-1x2"}]},{id:"psm",label:"PSM",icon:"bi-flower1",sections:[{section:"calc",label:"Neu erfassen",icon:"bi-pencil-square"},{section:"documentation",label:"Übersicht",icon:"bi-list-ul"},{section:"lager",label:"Lager",icon:"bi-box-seam"},{section:"settings",label:"Einstellungen",icon:"bi-gear"}]},{id:"acker",label:"Acker-Planer",icon:"bi-map",sections:[{section:"acker",label:"Karte",icon:"bi-map"},{section:"kultur",label:"Kulturführung",icon:"bi-clipboard2-pulse"}]},{id:"fotos",label:"Fotos",icon:"bi-camera",sections:[{section:"fotos",label:"Fotos",icon:"bi-camera"}]},{id:"daten",label:"Daten",icon:"bi-database",sections:[{section:"daten",label:"Import",icon:"bi-cloud-upload"}]}],As={dashboard:"start",calc:"psm",documentation:"psm",lager:"psm",history:"psm",report:"psm",acker:"acker",kultur:"acker",fotos:"fotos",settings:"psm",gps:"psm",lookup:"psm",import:"daten",daten:"daten"};function zs(e){return $s.find(t=>t.id===e)}function bl(e){const t=As[e];return t?zs(t):void 0}function hl(){const e=document.getElementById("offline-indicator");if(!e)return;const t=()=>{const a=!navigator.onLine;e.classList.toggle("d-none",!a)};t(),window.addEventListener("online",t),window.addEventListener("offline",t)}function Li(e){W().app.activeSection!==e&&(Qe("app",t=>({...t,activeSection:e})),Dn("app:sectionChanged",e))}function Di(){hl();const e=document.querySelectorAll(".nav-btn[data-area]"),t=document.getElementById("brand-link"),a=document.getElementById("topnav-tabs"),n=document.getElementById("topnav-area-icon"),r=document.getElementById("topnav-area-label"),i={};for(const b of $s)i[b.id]=b.sections[0].section;let l=null;function o(b,k){if(a){if(b.sections.length<=1){a.innerHTML="";return}a.innerHTML=b.sections.map(S=>`
        <button type="button" class="topnav-tab${S.section===k?" active":""}" data-section="${S.section}">
          <i class="bi ${S.icon}"></i><span>${S.label}</span>
        </button>`).join("")}}function c(b){a&&a.querySelectorAll(".topnav-tab").forEach(k=>{k.classList.toggle("active",k.dataset.section===b)})}const p=b=>{const k=zs(b);!k||!W().app.hasDatabase||Li(i[b]??k.sections[0].section)};e.forEach(b=>{b.addEventListener("click",()=>{const k=b.dataset.area;k&&p(k)})}),t?.addEventListener("click",b=>{b.preventDefault(),p("start")}),a?.addEventListener("click",b=>{const S=b.target?.closest(".topnav-tab")?.dataset.section;S&&Li(S)});const d=document.querySelector('.nav-btn[data-action="share-data"]');d?.addEventListener("click",()=>{d.disabled=!0,Et(async()=>{const{shareMobileData:b}=await import("./index.D2RJH-qu.js");return{shareMobileData:b}},__vite__mapDeps([0,1])).then(({shareMobileData:b})=>b()).catch(b=>console.error("Teilen fehlgeschlagen",b)).finally(()=>{d.disabled=!1})}),uo(),it("history:data-changed",b=>{if(!document.body.classList.contains("mobile-mode"))return;const k=b?.type;(k==="created"||k==="created-bulk")&&po()});const f=b=>{const k=document.getElementById("brand-title"),S=document.getElementById("brand-tagline"),A=document.getElementById("app-version");k&&b.company.name&&(k.textContent=b.company.name),S&&b.company.headline&&(S.textContent=b.company.headline),A&&b.app.version&&(A.textContent=`v${b.app.version}`);const C=b.app.hasDatabase,Q=b.app.activeSection,j=bl(Q);j&&As[Q]===j.id&&(i[j.id]=Q),e.forEach(ge=>{ge.disabled=!C;const F=C&&j?.id===ge.dataset.area;ge.classList.toggle("active",!!F)}),j&&(n&&(n.className=`bi ${j.icon} topnav-area-icon`),r&&(r.textContent=j.label),l!==j.id?(o(j,Q),l=j.id):c(Q))};$n(f),f(W());let m=!1;const w=document.title||"Pflanzenschutz";window.addEventListener("beforeprint",()=>{m||(m=!0,document.title=" ")}),window.addEventListener("afterprint",()=>{m&&(m=!1,document.title=w)})}function vl(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Di,{once:!0}):Di()}vl();const yl="https://api.digitale-psm.de",wl="digitale-psm.de";async function xl(e){try{const t=await fetch(`${yl}/api/v1/${wl}/views/${e}`,{method:"POST",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`API error: ${t.status}`);return(await t.json()).views}catch(t){return console.warn("[ViewCounter] Fehler beim Zählen:",t),null}}function kl(e){return e>=1e6?(e/1e6).toFixed(1).replace(".",",")+"M":e>=1e3?(e/1e3).toFixed(1).replace(".",",")+"K":e.toString()}const wr="pflanzenschutz-datenbank.json";let $i=!1;function Sl(e){return e?`${e.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"pflanzenschutz-datenbank"}.json`:wr}async function ha(e,t){if(!e){await t();return}const a=e.textContent??"";e.disabled=!0,e.dataset.busy="true",e.textContent="Bitte warten...";try{await t()}finally{e.disabled=!1,e.dataset.busy="false",e.textContent=a}}function Ai(e){return g(e)}function El(e){const t=document.createElement("section");t.className="section-container d-none",t.innerHTML=`
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
                <input class="form-control" id="wizard-company-name" name="wizard-company-name" required value="${Ai(e.name)}" placeholder="z.B. Gärtnerei Müller" />
              </div>
              <div class="col-md-6">
                <label class="form-label d-block mb-2" for="wizard-company-headline">
                  Überschrift <span class="text-muted small">(optional)</span>
                </label>
                <input class="form-control" id="wizard-company-headline" name="wizard-company-headline" value="${Ai(e.headline)}" placeholder="z.B. Pflanzenschutz-Dokumentation 2025" />
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
  `;const a=t.querySelector("#database-wizard-form");if(!a)throw new Error("Wizard-Formular konnte nicht erzeugt werden");const n=t.querySelector('[data-role="wizard-result"]');if(!n)throw new Error("Wizard-Resultat-Container fehlt");return{section:t,form:a,resultCard:n,preview:t.querySelector('[data-role="wizard-preview"]'),filenameLabel:t.querySelector('[data-role="wizard-filename"]'),saveHint:t.querySelector('[data-role="wizard-save-hint"]'),saveButton:t.querySelector('[data-action="wizard-save"]'),reset(){a.reset(),n.classList.add("d-none");const r=t.querySelector('[data-role="wizard-preview"]');r&&(r.textContent="");const i=t.querySelector('[data-role="wizard-filename"]');i&&(i.textContent="")}}}function Ll(e,t){if(!e||$i)return;const a=e;let n=null,r=wr,i="landing";const o=t.state.getState().company,c=document.createElement("section");c.className="section-container";function p(B,L){const z=B;c.innerHTML=`
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
  `}p(!1,Rt());const d=El(o);a.innerHTML="",a.appendChild(c),a.appendChild(d.section);const f=typeof window<"u"&&typeof window.showSaveFilePicker=="function";d.saveButton&&(f?d.saveHint&&(d.saveHint.textContent='Der Browser fragt nach einem Speicherort. Die erzeugte Datei kannst du später über "Bestehende Datei verbinden" erneut laden.'):(d.saveButton.disabled=!0,d.saveButton.textContent="Datei speichern (nicht verfügbar)",d.saveHint&&(d.saveHint.textContent="Dieser Browser unterstützt keinen direkten Dateidialog. Bitte nutze einen Chromium-basierten Browser (z. B. Chrome, Edge) über HTTPS oder http://localhost.")));function m(B=t.state.getState()){const L=!!B.app?.hasDatabase;if(a.classList.toggle("d-none",L),L){c.classList.add("d-none"),d.section.classList.add("d-none");return}i==="wizard"?(c.classList.add("d-none"),d.section.classList.remove("d-none")):(c.classList.remove("d-none"),d.section.classList.add("d-none"))}async function w(B){await ha(B,async()=>{try{const L=ue();L==="sqlite"||L==="filesystem"?wt(L):wt("filesystem")}catch(L){throw T.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),L instanceof Error?L:new Error("Dateisystem nicht verfügbar")}try{const L=await mo();rn(L.data);const z=L.context;z?.fileHandle&&await vr(z.fileHandle),t.events.emit("database:connected",{driver:ue()})}catch(L){console.error("Fehler beim Öffnen der Datenbank",L),T.error(L instanceof Error?L.message:"Öffnen der Datenbank fehlgeschlagen")}})}function b(B){ha(B,async()=>{const L=si(),z=["localstorage","sqlite","memory"];for(const ne of z)try{wt(ne);const pe=await oi(L);rn(pe.data),t.events.emit("database:connected",{driver:ue()||ne});return}catch(pe){console.warn(`Treiber ${ne} konnte nicht initialisiert werden`,pe)}const Z="Keine geeignete Speicheroption verfügbar. Bitte Browserberechtigungen prüfen.";console.error(Z),T.error(Z)})}async function k(B){if(!n){T.warning("Bitte erst die Datenbank erzeugen.");return}await ha(B,async()=>{try{const L=ue();L==="sqlite"||L==="filesystem"?wt(L):wt("filesystem")}catch(L){throw T.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),L instanceof Error?L:new Error("Dateisystem nicht verfügbar")}try{const L=await oi(n);rn(L.data),t.events.emit("database:connected",{driver:ue()})}catch(L){console.error("Fehler beim Speichern der Datenbank",L),T.error(L instanceof Error?L.message:"Die Datei konnte nicht gespeichert werden")}})}function S(B){B.preventDefault();const L=new FormData(d.form),z=(L.get("wizard-company-name")||"").toString().trim();if(!z){T.warning("Bitte einen Firmennamen angeben.");return}const Z=(L.get("wizard-company-headline")||"").toString().trim(),ne=(L.get("wizard-company-address")||"").toString().trim();n=si({meta:{company:{name:z,headline:Z,logoUrl:"",contactEmail:"",address:ne}}}),r=Sl(z),d.preview.textContent=JSON.stringify(n,null,2),d.filenameLabel.textContent=r,d.resultCard.classList.remove("d-none"),d.resultCard.scrollIntoView({behavior:"smooth",block:"start"})}function A(){i="landing",n=null,r=wr,d.reset(),m()}function C(){i="wizard",m()}async function Q(B){await ha(B,async()=>{try{const L=await yr();if(!L){T.warning("Keine gespeicherte Datei gefunden.");return}if(!await cl(L)){T.warning("Berechtigung zum Zugriff auf die Datei wurde verweigert.");return}wt("sqlite");const Z=await L.getFile(),ne=await Z.arrayBuffer(),pe=await fo(ne,Z.name);go(L),rn(pe.data),await vr(L),t.events.emit("database:connected",{driver:"sqlite",autoStarted:!0}),T.success("Datenbank erfolgreich geladen!")}catch(L){console.error("Auto-Start fehlgeschlagen:",L),T.error(L instanceof Error?L.message:"Fehler beim Laden der gespeicherten Datei")}})}async function j(){await dl();const B=c.querySelector("#auto-start-banner");B&&B.classList.add("d-none"),T.info("Gespeicherte Datei wurde vergessen.")}async function ge(B){await ha(B,async()=>{if(await ol()){T.success("App wird installiert!");const z=c.querySelector("#pwa-install-banner");z&&z.classList.add("d-none")}})}if(c.addEventListener("click",B=>{const L=B.target?.closest("button[data-action]");if(!L)return;const z=L.dataset.action;if(z==="start-wizard"){C();return}z==="open"?w(L):z==="useDefaults"?b(L):z==="auto-start"?Q(L):z==="auto-start-forget"?j():z==="install-pwa"&&ge(L)}),d.form.addEventListener("submit",S),d.section.addEventListener("click",B=>{const L=B.target?.closest("[data-action]");if(!L)return;const z=L.dataset.action;if(z==="wizard-back"){A();return}z==="wizard-save"&&k(L)}),t.state.subscribe(B=>m(B)),m(t.state.getState()),!t.state.getState().app.hasDatabase){const B=us();if(B&&B!==ue())try{wt(B)}catch(L){console.warn("Bevorzugter Speicher konnte nicht gesetzt werden",L)}}(async()=>{const B=await yr(),L=await ks(),z=!!(B&&L?.hasDatabase),Z=Rt();p(z,Z);const ne=c.querySelector('[data-role="view-count"]');if(ne&&xl("app").then(he=>{he!==null&&(ne.textContent=kl(he))}),z&&B){const he=c.querySelector('[data-role="auto-start-filename"]');he&&(he.textContent=`Datei: ${B.name}`)}F(),window.addEventListener("pwa:install-available",()=>{F()}),window.addEventListener("pwa:installed",()=>{Kn(),F()}),window.addEventListener("pwa:permission-required",async he=>{const Oe=he.detail?.handle;if(Oe){const we=c.querySelector("#auto-start-banner"),Kt=c.querySelector('[data-role="auto-start-filename"]');we&&Kt&&(Kt.textContent=`Datei: ${Oe.name} (Berechtigung erforderlich)`,we.classList.remove("d-none"))}}),console.log("[Startup] PWA Capabilities:",Ds());const pe=await Ls();console.log("[Startup] PWA Install Status (async):",pe),ae(pe)})();function F(){const B=Es();ae(B)}function ae(B){const L=c.querySelector("#pwa-install-banner"),z=c.querySelector('[data-role="pwa-content"]');if(!(!L||!z)){if(!B.showBanner){L.classList.add("d-none");return}L.classList.remove("d-none"),B.isInstalled?z.innerHTML=`
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
      `:L.classList.add("d-none")}}$i=!0}function Ps(e){let t=!1,a=!1;const n=o=>{e.onStatusChange&&e.onStatusChange(o)},r=()=>{t||!a||W().app.activeSection!==e.section||e.shouldRefresh&&!e.shouldRefresh()||(a=!1,n("refreshing"),Promise.resolve(e.onRefresh()).catch(c=>{console.error("Auto-Refresh konnte nicht ausgeführt werden",c),a=!0,n("stale")}).finally(()=>{!t&&!a&&n("idle")}))},i=it(e.event,()=>{e.shouldHandleEvent&&!e.shouldHandleEvent()||(a=!0,n("stale"),r())}),l=it("app:sectionChanged",o=>{o===e.section&&(a?r():n("idle"))});return W().app.activeSection===e.section&&n("idle"),()=>{t=!0,i(),l()}}const Dl={prev:"Zurück",next:"Weiter",loading:"Lädt …",empty:"Keine Einträge verfügbar"};function zi(){const e=document.createElement("span");return e.className="spinner-border spinner-border-sm",e.setAttribute("role","status"),e.setAttribute("aria-hidden","true"),e}function Pi(e){const t=document.createElement("div");return t.className="pager-widget__info text-muted small text-center flex-grow-1",t.textContent=e?.trim()||"",t}function Ra(e,t){if(!e)return null;const a=document.createElement("div");a.className="pager-widget d-flex flex-column gap-2",e.innerHTML="",e.appendChild(a);let n={status:"hidden"},r=!1;const i={...Dl,...t.labels||{}};function l(){a.replaceChildren()}function o(f){const m=Pi(f.info||i.empty);a.replaceChildren(m)}function c(f){const m=document.createElement("div");m.className="alert alert-danger mb-0",m.textContent=f.message||"Unbekannter Fehler",a.replaceChildren(m)}function p(f){const m=document.createElement("div");m.className="pager-widget__controls d-flex flex-column flex-md-row gap-2 align-items-stretch";const w=document.createElement("button");w.type="button",w.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",w.disabled=!f.canPrev||f.loadingDirection==="prev",w.textContent=i.prev,f.loadingDirection==="prev"&&w.prepend(zi()),w.addEventListener("click",()=>{w.disabled||t.onPrev()});const b=document.createElement("button");b.type="button",b.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",b.disabled=!f.canNext||f.loadingDirection==="next",b.textContent=i.next,f.loadingDirection==="next"&&b.append(zi()),b.addEventListener("click",()=>{b.disabled||t.onNext()});const k=Pi(f.info||(f.canPrev||f.canNext?i.loading:i.empty));m.append(w,k,b),a.replaceChildren(m)}function d(f){switch(f.status){case"hidden":l();break;case"disabled":o(f);break;case"error":c(f);break;case"ready":p(f);break;default:l();break}}return{update(f){r||(n=f,d(f))},destroy(){r||(r=!0,a.replaceChildren(),e.innerHTML="")},getState(){return n}}}const Kr=new Set;let Mi=!1;function $l(){return typeof window>"u"?null:window.__PSL?.debugOverlayApi??null}function Ms(){Mi||typeof window>"u"||(Mi=!0,window.addEventListener("psl:debug-overlay-ready",()=>{Kr.forEach(e=>{Wr(e)})}))}function Wr(e){const t=$l();t?.registerProvider&&(e.handle||(e.handle=t.registerProvider(e.config)),e.handle.update(e.lastMetrics??null))}function Cs(e){const t={config:e,handle:null,lastMetrics:null};return Kr.add(t),Ms(),Wr(t),t}function Is(e,t){e.lastMetrics=t,Kr.add(e),Ms(),Wr(e)}function Bs(e){if(e==null)return 0;try{const t=JSON.stringify(e);return t?Number((t.length/1024).toFixed(1)):0}catch{return null}}const Ci=5e3,Ii=50,jr=50,bn=3;function nr(e){if(e==null||e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function Al(e){if(!e)return null;const t=nr(e.areaHa);if(t!==null)return t;const a=nr(e.areaAr);if(a!==null)return a/100;const n=nr(e.areaSqm);return n!==null?n/1e4:null}function zl(e,t="–"){const a=Al(e);return a===null?t:$o(a,2,t)}function Pl(e){return e.toISOString().slice(0,10)}function Pn(e){if(!e)return;if(/^\d{4}-\d{2}-\d{2}$/.test(e))return e;const t=new Date(e);if(!Number.isNaN(t.getTime()))return Pl(t)}function Bi(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function Gr(){return{startDate:"",endDate:""}}function Ns(e,t){if(!e)return;const a=e.querySelector("#doc-start"),n=e.querySelector("#doc-end");a&&t.startDate&&(a.value=t.startDate),n&&t.endDate&&(n.value=t.endDate)}function Ml(e,t="sqlite"){if(typeof e=="string")return e.includes(":")?e:/^\d+$/.test(e)?ta(t,Number(e)):e;if(typeof e=="number")return ta(t,e);if(e&&typeof e=="object"){const a=e.source||t;if(typeof e.ref=="string"&&e.ref.includes(":"))return e.ref;const n=Number(e.ref);if(!Number.isNaN(n))return ta(a,n)}return null}function Cl(e){const t=new Set;return e?.length&&e.forEach(a=>{const n=Ml(a);n&&t.add(n)}),t}function Fs(e){const t=e.querySelector('[data-role="doc-focus-banner"]'),a=e.querySelector('[data-role="doc-focus-text"]');if(!t||!a)return;if(!Dt){t.classList.add("d-none");return}const n=V.startDate&&V.endDate?`${V.startDate} - ${V.endDate}`:"Aktuelle Filter",r=Dt.label||"Importierter Zeitraum",i=Dt.highlightEntryIds.size,l=i?` (${i} markiert)`:"";a.textContent=`${r}: ${n}${l}`,t.classList.remove("d-none")}function Il(e,t){const a=e.querySelector('[data-role="doc-refresh-indicator"]');if(a){if(a.classList.remove("alert-info","alert-warning"),t==="idle"){a.classList.add("d-none");return}a.classList.remove("d-none"),t==="stale"?(a.classList.add("alert-warning"),a.textContent="Neue Dokumentationseinträge verfügbar. Ansicht aktualisiert sich beim Öffnen."):(a.classList.add("alert-info"),a.textContent="Aktualisiere Dokumentation...")}}function rr(e,t,a={}){Dt&&(Dt=null,Aa=null,Fs(e),a.refreshList&&zt(e,t.state.getState().fieldLabels))}function Bl(e,t){if(!Aa)return;const a=Ot(Aa);a&&(Aa=null,Rs(e,a,t))}function Nl(e,t,a){if(!a)return;const n=Pn(a.startDate),r=Pn(a.endDate),i=!!a.entryIds?.length;if(!n&&!r&&!i)return;V={...V,...n?{startDate:n}:{},...r?{endDate:r}:{}},a.creator!==void 0&&(V={...V,creator:a.creator||void 0}),a.crop!==void 0&&(V={...V,crop:a.crop||void 0});const l=Cl(a.entryIds);Dt={label:a.label,reason:a.reason,startDate:V.startDate,endDate:V.endDate,highlightEntryIds:l},Aa=a.autoSelectFirst&&l.size?l.values().next().value??null:null;const o=e.querySelector("#doc-filter");Ns(o,V),Fs(e),xr=!0,xt(e,t.state.getState()).finally(()=>{xr=!1})}function Fl(){if(typeof window>"u")return{enabled:!1,count:on};try{const e=new URLSearchParams(window.location.search);if(!e.has("seedHistory"))return{enabled:!1,count:on};const t=e.get("seedHistory"),a=t?Number(t):Number.NaN;return{enabled:!0,count:Number.isFinite(a)&&a>0?Math.min(Math.round(a),Tl):on}}catch(e){return console.warn("seedHistory Parameter konnte nicht gelesen werden",e),{enabled:!1,count:on}}}const st=25,Ni=4,ir=new Intl.NumberFormat("de-DE"),on=200,Tl=2e3,sa=Fl();let Fi=!1,De="memory",V=Gr(),Fe=0,fe=[],bt=[],te=0;const rt=new Map,Ve=new Map([[0,null]]),We=new Set,Lt=new Map,ea=new Map;let Re=!1,va=null,ya=0,Dt=null,xr=!1,Aa=null,Mn=!1,hn="",Cn=!1,ln=null,cn=null,Ti=null,Ne=0,dn=null,qi=null,nt=null,za=!1,Hi=null;const ql=Cs({id:"documentation",label:"Documentation",budget:{initialLoad:50,maxItems:150}});let Ts=null;function la(e){return e.app?.storageDriver||ue()}function ta(e,t){return`${e}:${t}`}function Ur(e){const t={},a=Bi(e.startDate,"start"),n=Bi(e.endDate,"end");return a&&(t.startDate=a),n&&(t.endDate=n),e.creator&&(t.creator=e.creator),e.crop&&(t.crop=e.crop),t}function Hl(e,t){return{id:ta("state",t),entry:e,source:"state",ref:t}}function Ol(e){const t=Number(e?.id??e?.historyId??0),a={...e};return delete a.id,{id:ta("sqlite",t),entry:a,source:"sqlite",ref:t}}function _l(){return De==="memory"?fe.length:Fe>0?Fe:te*st+fe.length||null}function Rl(){const e=[];if(Re&&e.push("Lädt …"),nt&&e.push("Fehler"),Dt&&e.push("Fokus aktiv"),De==="sqlite"&&Ve.get(te+1)&&e.push("Weitere Seiten verfügbar"),!!e.length)return e.join(" · ")}function Kl(){const e={items:fe.length,totalCount:_l(),cursor:De==="sqlite"?`Seite ${te+1}`:null,payloadKb:Bs(bt.map(t=>t.entry)),lastUpdated:Ts,note:Rl()};Is(ql,e)}function Ot(e){return fe.find(t=>t.id===e)}function Wn(e){const t=e.querySelector('[data-role="archive-form"]');if(!t)return;const a=t.querySelector('input[name="archive-start"]'),n=t.querySelector('input[name="archive-end"]');a&&(a.value=V.startDate||""),n&&(n.value=V.endDate||"")}function Pe(e,t,a="info"){const n=e.querySelector('[data-role="archive-status"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a}`,n.textContent=t,n.classList.remove("d-none")}}function kr(e,t){const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(!a)return;const r=!a.classList.contains("d-none"),i=typeof t=="boolean"?t:!r;a.classList.toggle("d-none",!i),n&&(n.textContent=i?"Archiv-Eingaben ausblenden":"Archiv erstellen"),i&&Wn(e)}function Wl(e){const t=e.querySelector('input[name="archive-start"]'),a=e.querySelector('input[name="archive-end"]');if(!t?.value||!a?.value)return null;const n=e.querySelector('input[name="archive-storage"]'),r=e.querySelector('textarea[name="archive-note"]'),i=e.querySelector('input[name="archive-remove"]');return{startDate:t.value,endDate:a.value,storageHint:n?.value.trim()||void 0,note:r?.value.trim()||void 0,removeAfterExport:i?i.checked:!0}}function Vr(e,t){const a=e.querySelector('[data-action="archive-toggle"]'),n=e.querySelector('[data-action="archive-submit"]'),r=e.querySelector('[data-role="archive-form"]'),i=e.querySelector('[data-role="archive-driver-hint"]'),l=la(t)==="sqlite"&&!!t.app?.hasDatabase;a&&(a.disabled=!l||Mn),n&&(n.disabled=!l||Mn),!l&&r&&r.classList.add("d-none"),i&&(i.textContent=l?"Lokale SQLite-Datenbank aktiv":"Nur mit SQLite verfügbar",i.className=`badge ${l?"bg-success":"bg-secondary"}`),l?Zr():Cn=!1}function Oi(e,t){Mn=t;const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(a&&a.querySelectorAll("input, textarea, button").forEach(r=>{if(r.dataset.action==="archive-cancel"&&t){r.setAttribute("disabled","disabled");return}t?r.setAttribute("disabled","disabled"):r.removeAttribute("disabled")}),n&&(n.disabled=t||n.disabled,!t)){const r=W();n.disabled=la(r)!=="sqlite"||!r.app?.hasDatabase}}function jl(e,t){const a=n=>n?n.replace(/[^0-9-]/g,""):"unbekannt";return`pflanzenschutz-archiv-${a(e)}_${a(t)}.zip`}function Gl(e){let t=[];return Qe("archives",a=>{const n=Array.isArray(a?.logs)?a.logs:[];return t=[e,...n].slice(0,jr),{...a||{logs:[]},logs:t}}),t}async function Zr({force:e=!1}={}){if(ln){if(await ln,!e)return}else if(Cn&&!e)return;const t=W();if(la(t)!=="sqlite"||!t.app?.hasDatabase)return;const n=(async()=>{try{const r=await bo({limit:jr});Qe("archives",i=>({...i&&typeof i=="object"?i:{logs:[]},logs:r.items})),Cn=!0}catch(r){console.warn("Archive logs could not be loaded",r)}})();ln=n;try{await n}finally{ln=null}}async function Ul(e,t){const a=la(W());if(Gl(e),a!=="sqlite"){console.warn("Archive logs require SQLite. Changes stored in memory only.");return}try{const n={...e,metadata:t??void 0};await ko(n),await Ze()}catch(n){console.error("Archive log could not be persisted",n),Cn=!1}finally{await Zr({force:!0})}}function Sr(e){return!Array.isArray(e)||!e.length?"[]":e.map(t=>`${t.id}:${t.archivedAt}:${t.entryCount}`).join("|")}function Vl(e){return e?Ia(e)||e.slice(0,16).replace("T"," "):"-"}function Na(e,t,a={}){const n=e.querySelector('[data-role="archive-log-list"]');if(!n)return;const r=Array.isArray(t)?t:[];a.resetPage!==!1&&(Ne=0);const i=nc(r);if(!i.total){n.innerHTML='<div class="text-muted small">Noch keine Archive erstellt.</div>',Ki(e,i);return}const l=i.items.map(o=>{const c=Vl(o.archivedAt),p=`${o.startDate||"-"} – ${o.endDate||"-"}`,d=o.entryCount===1?"Eintrag":"Einträge";return`
        <div class="list-group-item border rounded mb-2 p-3" data-action="archive-log-focus" data-log-id="${o.id}" style="cursor: pointer;">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="fs-5 fw-bold mb-1">${g(p)}</div>
              <div class="text-muted">${o.entryCount} ${d} · Erstellt ${g(c)}</div>
            </div>
            <i class="bi bi-chevron-right text-muted fs-4"></i>
          </div>
        </div>
      `}).join("");n.innerHTML=`<div class="list-group list-group-flush">${l}</div>`,Ki(e,i)}function _i(e,t){const a=e.archives?.logs;if(Array.isArray(a))return a.find(n=>n.id===t)}async function Zl(e){if(e){if(typeof navigator<"u"&&navigator.clipboard&&typeof navigator.clipboard.writeText=="function"){await navigator.clipboard.writeText(e);return}if(typeof document<"u"){const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select(),document.execCommand("copy"),document.body.removeChild(t)}}}async function Ka(e){if(ea.has(e.id))return ea.get(e.id);let t=null;if(e.source==="sqlite")try{t=await So(e.ref)}catch(a){console.error("History entry fetch failed",a)}else{const a=Ke(W().history);t=(typeof e.ref=="number"?a[e.ref]:void 0)||e.entry}return t&&ea.set(e.id,t),t}function qs(e){return e&&(e.datum||Ia(e.dateIso)||(typeof e.date=="string"?e.date:""))||""}function Ql(e){if(e?.gpsCoordinates){const t=Do(e.gpsCoordinates);if(t)return t}return""}function Jl(e){return e?.gps||""}function Er(e){if(!e)return null;if(e.dateIso){const n=hs(e.dateIso);if(n)return new Date(n.getFullYear(),n.getMonth(),n.getDate())}const t=typeof e.datum=="string"&&e.datum||typeof e.date=="string"&&e.date||null;if(!t)return null;const a=t.split(".");if(a.length===3){const[n,r,i]=a.map(Number);if(!Number.isNaN(n)&&!Number.isNaN(r)&&!Number.isNaN(i))return new Date(i,r-1,n)}return null}function Yl(e,t){const a=Er(e);if(t.startDate){const r=new Date(t.startDate);if(r.setHours(0,0,0,0),!a||a<r)return!1}if(t.endDate){const r=new Date(t.endDate);if(r.setHours(23,59,59,999),!a||a>r)return!1}const n=[["creator",e.ersteller],["crop",e.kultur]];for(const[r,i]of n){const o=t[r]?.trim().toLowerCase();if(o&&!`${i||""}`.toLowerCase().includes(o))return!1}return!0}function Qr(e){if(!e)return"";const t=r=>r==null?"":String(r),n=(Array.isArray(e.items)?e.items:[]).map(r=>{const i=Object.keys(r).sort().reduce((l,o)=>(l[o]=r[o],l),{});return JSON.stringify(i)}).sort();return JSON.stringify({savedAt:t(e.savedAt),dateIso:t(e.dateIso),datum:t(e.datum),ersteller:t(e.ersteller),standort:t(e.standort),kultur:t(e.kultur),usageType:t(e.usageType),eppoCode:t(e.eppoCode),invekos:t(e.invekos),bbch:t(e.bbch),gps:t(e.gps),gpsPointId:t(e.gpsPointId),areaHa:e.areaHa??null,areaAr:e.areaAr??null,areaSqm:e.areaSqm??null,kisten:e.kisten??null,itemHashes:n})}function Hs(e){e.size&&Qe("history",t=>{const a=Oa(t);if(!a.items.length)return a;let n=!1;const r=a.items.filter(i=>{const l=Qr(i);return e.has(l)?(n=!0,!1):!0});return n?{...a,items:r,totalCount:Math.min(a.totalCount,r.length),lastUpdatedAt:new Date().toISOString()}:a})}function Xl(e){return e.slice().sort((t,a)=>{const n=Er(t.entry)?.getTime()||new Date(t.entry.savedAt||0).getTime();return(Er(a.entry)?.getTime()||new Date(a.entry.savedAt||0).getTime())-n})}function Ri(){return De==="sqlite"?Fe>0?Math.max(Math.ceil(Fe/st),1):Math.max(te+1,rt.size||0):fe.length?Math.max(Math.ceil(fe.length/st),1):0}function Os(){if(De==="sqlite"){const t=Math.max(Ri()-1,0);return te>t&&(te=t),te<0&&(te=0),te*st}if(!fe.length)return te=0,0;const e=Math.max(Ri()-1,0);return te>e&&(te=e),te<0&&(te=0),te*st}function jn(){if(!fe.length){bt=[];return}if(De==="sqlite"){bt=fe.slice();return}const e=Os(),t=Math.min(e+st,fe.length);bt=fe.slice(e,t)}function ec(e){if(rt.size<=Ni)return;const t=Array.from(rt.keys()).sort((a,n)=>{const r=Math.abs(a-e);return Math.abs(n-e)-r});for(;rt.size>Ni&&t.length;){const a=t.shift();a==null||a===e||rt.delete(a)}}function tc(e){const t=e.querySelector('[data-role="doc-pager"]');return t?((!cn||Ti!==t)&&(cn?.destroy(),cn=Ra(t,{onPrev:()=>sc(e),onNext:()=>oc(e),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Dokumentation...",empty:"Keine Einträge"}}),Ti=t),cn):null}function ac(e){const t=e.querySelector('[data-role="archive-log-pager"]');return t?((!dn||qi!==t)&&(dn?.destroy(),dn=Ra(t,{onPrev:()=>rc(e),onNext:()=>ic(e),labels:{prev:"Zurück",next:"Weiter",loading:"Archive werden geladen...",empty:"Keine Einträge"}}),qi=t),dn):null}function nc(e){const t=e.length;if(!t)return Ne=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/bn),1);Ne>=a&&(Ne=a-1),Ne<0&&(Ne=0);const n=Ne*bn,r=Math.min(n+bn,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function Ki(e,t){const a=ac(e);if(a){if(!t.total){a.update({status:"disabled",info:"Noch keine Archive"});return}a.update({status:"ready",info:`Einträge ${t.start+1}–${t.end} von ${t.total}`,canPrev:Ne>0,canNext:t.end<t.total})}}function rc(e){if(Ne===0)return;Ne=Math.max(Ne-1,0);const t=W().archives?.logs??[];Na(e,t,{resetPage:!1})}function ic(e){const t=W().archives?.logs??[],a=t.length;if(!a)return;const n=Math.max(Math.ceil(a/bn),1);Ne>=n-1||(Ne=Math.min(Ne+1,n-1),Na(e,t,{resetPage:!1}))}function vn(e){const t=tc(e);if(!t)return;if(nt){t.update({status:"error",message:nt});return}const a=De==="memory"?fe.length:Fe,n=bt.length;if(!n){const p=Re?"Lade Dokumentation...":"Keine Einträge vorhanden.";t.update({status:"disabled",info:p});return}const r=De==="sqlite"?te*st:Os(),i=`Einträge ${ir.format(r+1)}–${ir.format(r+n)}${a?` von ${ir.format(a)}`:""}`,l=De==="memory"?r+n<fe.length:!!Ve.get(te+1),o=!Re&&l,c=te>0&&!Re;t.update({status:"ready",info:i,canPrev:c,canNext:o,loadingDirection:Re&&l?"next":null})}function Lr(e){if(!sa.enabled)return;const t=e.querySelector('[data-action="doc-seed"]');t&&(t.disabled=za,t.textContent=za?"Dummy-Daten werden erstellt...":`+ ${sa.count} Dummy-Einträge`)}function sc(e){if(te===0||Re)return;const t=Math.max(te-1,0);if(De==="sqlite"){Jr(e,W().fieldLabels,t);return}te=t,jn(),zt(e,W().fieldLabels),Ta(e,W().fieldLabels)}function oc(e){if(Re)return;const t=te+1;if(De==="sqlite"){const n=rt.has(t),r=Ve.get(t);if(!n&&!r)return;Jr(e,W().fieldLabels,t);return}t*st<fe.length&&(te=t,jn(),zt(e,W().fieldLabels),Ta(e,W().fieldLabels))}function Fa(e){We.clear(),Lt.clear(),e&&Gn(e)}function lc(){return De==="memory"?fe.length:Fe}function Gn(e){const t=e.querySelector('[data-role="doc-selection-info"]'),a=e.querySelector('[data-action="print-selection"]'),n=e.querySelector('[data-action="pdf-selection"]'),r=e.querySelector('[data-action="export-selection"]'),i=e.querySelector('[data-action="export-zip"]'),l=e.querySelector('[data-action="delete-selection"]'),o=We.size;t&&(t.textContent=o?`${o} Eintrag${o===1?"":"e"} ausgewählt`:"Keine Einträge ausgewählt");const c=o===0;a&&(a.disabled=c),n&&(n.disabled=c),r&&(r.disabled=c),i&&(i.disabled=c),l&&(l.disabled=c);const p=e.querySelector('[data-action="toggle-select-all"]');if(p){const d=lc();p.disabled=d===0,p.checked=d>0&&o>=d,p.indeterminate=o>0&&o<d}}function Dr(e,t){e.querySelectorAll('[data-role="doc-list"] .doc-sidebar-entry').forEach(n=>{const r=!!(t&&n.dataset.entryId===t);n.classList.toggle("active",r)})}function Sa(e,t,a){const n=e.querySelector("#doc-detail"),r=e.querySelector("#doc-detail-body"),i=e.querySelector('[data-role="doc-detail-card"]'),l=e.querySelector('[data-role="doc-detail-empty"]');if(!n||!r||!i||!l)return;if(!t){n.dataset.entryId="",i.classList.add("d-none"),l.classList.remove("d-none"),r.innerHTML="",Dr(e,null);return}n.dataset.entryId=t.entry.id,i.classList.remove("d-none"),l.classList.add("d-none"),Dr(e,t.entry.id);const o=a||W().fieldLabels,c=o.history?.tableColumns??{},p=o.history?.detail??{},d=t.detail||t.entry.entry,f=Eo(d.items||[],o,"detail"),m=d.gpsCoordinates?_a(d.gpsCoordinates):null,w=Jl(d),b=Ql(d),k=p.gpsNote||c.gpsNote||p.gps||c.gps||"GPS-Notiz",S=p.gpsCoordinates||c.gpsCoordinates||p.gps||c.gps||"GPS-Koordinaten",A=b?`${g(b)}${m?` <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${g(m)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:""}`:"-";r.innerHTML=`
    <p>
      <strong>${g(c.date||"Datum")}:</strong> ${g(qs(d))}<br />
      <strong>${g(p.creator||"Erstellt von")}:</strong> ${g(d.ersteller||"")}<br />
      <strong>${g(p.location||"Standort")}:</strong> ${g(d.standort||"")}<br />
      <strong>${g(p.crop||"Kultur")}:</strong> ${g(d.kultur||"")}<br />
      <strong>${g(p.usageType||"Art der Verwendung")}:</strong> ${g(d.usageType||"")}<br />
      <strong>${g(p.quantity||"Fläche (ha)")}:</strong> ${g(zl(d))}<br />
      <strong>${g(p.eppoCode||"EPPO-Code")}:</strong> ${g(d.eppoCode||"")}<br />
      <strong>${g(p.bbch||"BBCH")}:</strong> ${g(d.bbch||"")}<br />
      <strong>${g(p.invekos||"InVeKoS")}:</strong> ${g(d.invekos||"")}<br />
      <strong>${g(k)}:</strong> ${w?g(w):"-"}<br />
      <strong>${g(S)}:</strong> ${A}<br />
      <strong>${g(p.time||"Uhrzeit")}:</strong> ${g(d.uhrzeit||"")}<br />
    </p>
    ${Lo({maschine:d.qsMaschine,schaderreger:d.qsSchaderreger,verantwortlicher:d.qsVerantwortlicher,wetter:d.qsWetter,behandlungsart:d.qsBehandlungsart})}
    <div class="table-responsive">
      ${f}
    </div>
  `}function zt(e,t){jn();const a=e.querySelector('[data-role="doc-list"]');if(!a)return;const r=e.querySelector("#doc-detail")?.dataset.entryId||null;if(!bt.length)a.innerHTML=Re?'<div class="text-center text-muted py-4">Lädt ...</div>':'<div class="text-center text-muted py-4">Noch keine Einträge</div>';else{a.innerHTML="";const i=document.createDocumentFragment();(t||W().fieldLabels).history?.detail?.usageType,bt.forEach(o=>{const c=document.createElement("div"),p=!!Dt?.highlightEntryIds?.has(o.id);c.className=`doc-sidebar-entry list-group-item${p?" doc-sidebar-entry--highlight":""}`,c.dataset.entryId=o.id;const d=qs(o.entry)||"-",f=p?'<span class="badge bg-warning-subtle text-warning-emphasis badge-import">Import</span>':"";c.innerHTML=`
        <div
          class="doc-sidebar-entry__main"
          data-action="view-entry"
          data-entry-id="${o.id}"
        >
          <div class="d-flex justify-content-between gap-2">
            <span class="fw-bold d-flex align-items-center gap-2">
              ${g(o.entry.kultur||"-")}
              ${f}
            </span>
            <small class="text-muted">${g(d)}</small>
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
            <input type="checkbox" class="form-check-input" data-action="toggle-select" data-entry-id="${o.id}" ${We.has(o.id)?"checked":""} />
            <span class="small">Auswahl</span>
          </label>
        </div>
      `,i.appendChild(c)}),a.appendChild(i)}Dr(e,r),Bl(e,t),vn(e),Gn(e),Ts=new Date().toISOString(),Kl()}function Ta(e,t){const a=e.querySelector('[data-role="doc-info"]');if(!a)return;const n=Fe,r=!!(V.crop||V.creator);if(!n&&!Re){a.textContent="Keine Einträge";return}if(!n&&Re){a.textContent="Lädt...";return}if(V.startDate&&V.endDate){const i=`${V.startDate} - ${V.endDate} (${n})`;a.textContent=r?`${i} + Filter`:i;return}a.textContent=`Alle Einträge (${n})`}async function _s(e,t){const n=e.querySelector("#doc-detail")?.dataset.entryId;if(!n){Sa(e,null,t);return}const r=Ot(n);if(!r){Sa(e,null,t);return}const i=await Ka(r);i?Sa(e,{entry:r,detail:i},t):Sa(e,null,t)}async function Jr(e,t,a=te,n={}){const r=Math.max(0,a),i=!!n.forceReload;i&&(rt.clear(),Ve.clear(),Ve.set(0,null),Fe=0,fe=[],bt=[],te=0,nt=null);const l=i?void 0:rt.get(r);if(l&&!n.forceReload){te=r,fe=l,nt=null,zt(e,t),Ta(e),vn(e);return}const o=Ve.has(r)?Ve.get(r)??null:null,c=Symbol("doc-load");va=c,Re=!0,nt=null,vn(e);try{const p=await fs({cursor:o,pageSize:st,filters:Ur(V),sortDirection:"desc",includeTotal:i||r===0||Fe===0});if(va!==c)return;const d=p.items.map(f=>Ol(f));if(rt.set(r,d),ec(r),Ve.set(r,o),Ve.set(r+1,p.nextCursor??null),typeof p.totalCount=="number")Fe=p.totalCount;else{const f=r*st+d.length;Fe=Math.max(Fe,f)}te=r,fe=d,nt=null,zt(e,t),Ta(e,t)}catch(p){va===c&&(console.error("Dokumentation konnte nicht geladen werden",p),nt="Dokumentation konnte nicht geladen werden. Bitte erneut versuchen.",window.alert("Dokumentation konnte nicht geladen werden. Bitte erneut versuchen."))}finally{va===c&&(Re=!1,va=null,vn(e))}}async function cc(e,t){const a=Ke(t.history);fe=Xl(a.map((n,r)=>Hl(n,r)).filter(n=>Yl(n.entry,V))),Fe=fe.length,te=0,nt=null,jn(),zt(e,t.fieldLabels),Ta(e,t.fieldLabels),await _s(e,t.fieldLabels)}async function xt(e,t){const a=la(t),n=!!t.app?.hasDatabase,r=a==="sqlite"&&n;if(De=r?"sqlite":"memory",ea.clear(),te=0,nt=null,Fe=0,fe=[],bt=[],rt.clear(),Ve.clear(),Ve.set(0,null),Fa(e),Vr(e,t),Wn(e),Na(e,t.archives?.logs??[]),hn=Sr(t.archives?.logs),r){await Jr(e,t.fieldLabels,0,{forceReload:!0}),await _s(e,t.fieldLabels);return}await cc(e,t)}async function sr(){const e=[];for(const t of We){const a=Lt.get(t)||Ot(t);if(!a)continue;const n=await Ka(a);n&&e.push(n)}return e}async function dc(e,t){if(!t){Fa(e),zt(e,W().fieldLabels);return}if(We.clear(),Lt.clear(),De==="memory")for(const a of fe)We.add(a.id),Lt.set(a.id,a);else try{const a=await gs({filters:Ur(V),sortDirection:"desc",limit:1e4}),n=Array.isArray(a.historyIds)?a.historyIds:[];a.entries.forEach((r,i)=>{const l=Number(n[i]);if(!Number.isFinite(l))return;const o=ta("sqlite",l);We.add(o),Lt.set(o,{id:o,entry:r,source:"sqlite",ref:l}),ea.has(o)||ea.set(o,r)})}catch(a){console.error("Alle Einträge konnten nicht ausgewählt werden",a),window.alert("Alle Einträge konnten nicht ausgewählt werden. Bitte erneut versuchen.")}zt(e,W().fieldLabels),Gn(e)}async function uc(e,t){if(!We.size)return;const a=Array.from(We).map(o=>Lt.get(o)||Ot(o)).filter(o=>!!o),n=[];for(const o of a){const c=await Ka(o);c&&n.push(c)}const r=a.filter(o=>o.source==="sqlite"),i=!!r.length;if(i)for(const o of r)await xo(o.ref);const l=new Set(a.filter(o=>o.source==="state").map(o=>o.ref));if(l.size&&(Qe("history",o=>{const c=Oa(o),p=c.items.filter((d,f)=>!l.has(f));return p.length===c.items.length?c:{...c,items:p,totalCount:Math.min(c.totalCount,p.length),lastUpdatedAt:new Date().toISOString()}}),await pc()),n.length){const o=new Set(n.map(c=>Qr(c)));Hs(o)}if(i){try{await Ze()}catch(o){console.warn("SQLite-Datei konnte nach dem Löschen nicht gespeichert werden",o)}t.events?.emit?.("history:data-changed",{type:"deleted",ids:r.map(o=>o.ref)})}Fa(e),await xt(e,t.state.getState())}async function Rs(e,t,a){const n=await Ka(t);if(!n){window.alert("Details konnten nicht geladen werden.");return}Sa(e,{entry:t,detail:n},a)}async function Wi(e){const t=await Ka(e);t?await Ks([t]):window.alert("Eintrag konnte nicht geladen werden.")}async function pc(){const e=ue();if(!(!e||e==="memory"||e==="sqlite"))try{const t=Ge();await Ue(t)}catch(t){throw console.error("Persist history failed",t),window.alert("Historie konnte nicht gespeichert werden. Bitte erneut versuchen."),t}}async function mc(e,t,a){if(Mn)return;const n=t.state.getState();if(la(n)!=="sqlite"||!n.app?.hasDatabase){Pe(e,"Archivieren ist nur mit einer lokalen SQLite-Datenbank möglich.","warning");return}const i=Wl(a);if(!i?.startDate||!i.endDate){Pe(e,"Bitte Start- und Enddatum für das Archiv wählen.","warning");return}const l=Pn(i.startDate),o=Pn(i.endDate);if(!l||!o){Pe(e,"Die angegebenen Daten sind ungültig.","danger");return}if(new Date(l)>new Date(o)){Pe(e,"Startdatum darf nicht nach dem Enddatum liegen.","danger");return}const c={startDate:l,endDate:o,creator:V.creator,crop:V.crop},p=Ur(c);Oi(e,!0),Pe(e,"Prüfe Zeitraum und Eintragsmenge...","info");try{const d=await fs({cursor:null,pageSize:1,filters:p,sortDirection:"asc",includeTotal:!0}),f=d.totalCount??d.items.length??0;if(!f){Pe(e,"Im angegebenen Zeitraum wurden keine Einträge gefunden.","warning");return}if(f>Ci){Pe(e,`Maximal ${Ci} Einträge pro Archiv erlaubt. Bitte Zeitraum verkürzen.`,"warning");return}Pe(e,`Exportiere ${f} Einträge in ein ZIP-Archiv...`,"info");const m=await gs({filters:p,limit:f,sortDirection:"asc"}),w=m?.entries??[];if(!w.length){Pe(e,"Archiv konnte nicht erstellt werden – Export lieferte keine Einträge.","danger");return}const b=w.map(L=>({...L})),k={format:"pflanzenschutz-archive",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:b.length,filters:{startDate:l,endDate:o,creator:c.creator||null,crop:c.crop||null},archive:{removeFromDatabase:i.removeAfterExport,storageHint:i.storageHint||null,note:i.note||null}},S=bs({"pflanzenschutz.json":An(JSON.stringify(b,null,2)),"metadata.json":An(JSON.stringify(k,null,2))}),A=new ArrayBuffer(S.byteLength);new Uint8Array(A).set(S);const C=new Blob([A],{type:"application/zip"}),Q=jl(l,o);Yr(C,Q);let j=!1;if(i.removeAfterExport){Pe(e,"Export abgeschlossen. Entferne Einträge und bereinige Datenbank...","info"),await ho({filters:p});const L=new Set(b.map(z=>Qr(z)));Hs(L);try{await Ze()}catch(z){console.error("SQLite-Datei konnte nach dem Archivieren nicht gespeichert werden",z)}t.events?.emit?.("history:data-changed",{type:"deleted-range",filters:p});try{await vo()}catch(z){j=!0,console.error("VACUUM fehlgeschlagen",z)}}const ge=new Date().toISOString(),F={id:`archive-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,archivedAt:ge,startDate:l,endDate:o,entryCount:b.length,fileName:Q,storageHint:i.storageHint||void 0,note:i.note||void 0};j&&(F.note=F.note?`${F.note} | VACUUM fehlgeschlagen`:"VACUUM fehlgeschlagen");const ae={filters:{...c},removeAfterExport:!!i.removeAfterExport,historyIdSample:m?.historyIds?.slice(0,Ii)};if(await Ul(F,ae),!i.removeAfterExport&&m?.historyIds?.length){const L=m.historyIds.slice(0,Ii).map(z=>({source:"sqlite",ref:z}));t.events?.emit?.("documentation:focus-range",{startDate:l,endDate:o,label:"Archiviert",reason:"archive",entryIds:L})}kr(e,!1),a.reset(),Wn(e),await xt(e,t.state.getState());const B=i.removeAfterExport?`Archiv ${Q} erstellt und ${b.length} Einträge entfernt.`:`Archiv ${Q} erstellt. ${b.length} Einträge bleiben in der Datenbank.`;Pe(e,B,j?"warning":"success")}catch(d){console.error("Archivieren fehlgeschlagen",d);const f=d instanceof Error?d.message:"Archiv konnte nicht erstellt werden.";Pe(e,f,"danger")}finally{Oi(e,!1),Vr(e,t.state.getState())}}const fc=50;async function Ks(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}if(e.length>fc&&!window.confirm(`Sie möchten ${e.length} Einträge drucken. Bei sehr vielen Einträgen kann das Erstellen der Druckvorschau einige Sekunden dauern und lässt sich nicht unterbrechen.

Fortfahren?`))return;const t=W().fieldLabels,a=yo(W().company||null);await wo(e,t,{title:"Dokumentation",headerHtml:a,chunkSize:25})}function Yr(e,t){const a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download=t,n.click(),URL.revokeObjectURL(a)}function gc(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const t=e.map(l=>({...l})),a=JSON.stringify(t,null,2),n=new TextEncoder().encode(a),r=new Blob([n],{type:"application/json; charset=utf-8"}),i=new Date().toISOString().replace(/[:.]/g,"-");Yr(r,`pflanzenschutz-dokumentation-${i}.json`)}async function bc(e,t){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const a=e.map(c=>({...c})),n={format:"pflanzenschutz-export",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:a.length,filters:{startDate:t.startDate||null,endDate:t.endDate||null,creator:t.creator||null,crop:t.crop||null}},r=bs({"pflanzenschutz.json":An(JSON.stringify(a,null,2)),"metadata.json":An(JSON.stringify(n,null,2))}),i=new ArrayBuffer(r.byteLength);new Uint8Array(i).set(r);const l=new Blob([i],{type:"application/zip"}),o=new Date().toISOString().replace(/[:.]/g,"-");Yr(l,`pflanzenschutz-dokumentation-${o}.zip`)}function hc(){const e=document.createElement("div"),t=Gr(),a=V.startDate||t.startDate||"",n=V.endDate||t.endDate||"";V={...V,startDate:a,endDate:n};const r=sa.enabled?`<button class="btn btn-outline-info btn-sm" type="button" data-action="doc-seed">+ ${sa.count} Dummy-Einträge</button>`:"";return e.className="section-inner",e.innerHTML=`
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
            <small class="text-muted">Letzte ${jr}</small>
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
  `,e}function vc(e){if(!e)return{};const t=new FormData(e),a=r=>{const i=t.get(r);return typeof i=="string"&&i?i:void 0},n=r=>{const i=t.get(r);if(typeof i!="string")return;const l=i.trim();return l||void 0};return{startDate:a("doc-start"),endDate:a("doc-end"),crop:n("doc-crop"),creator:n("doc-creator")}}let ji="entries";function yc(e,t){ji!==t&&(ji=t,e.querySelectorAll("[data-doc-tab]").forEach(a=>{a.classList.toggle("active",a.dataset.docTab===t)}),e.querySelectorAll("[data-pane]").forEach(a=>{a.style.display=a.dataset.pane===t?"block":"none"}))}function wc(e,t){e.addEventListener("click",a=>{const n=a.target.closest("[data-doc-tab]");if(n&&n.dataset.docTab){yc(e,n.dataset.docTab);return}}),e.addEventListener("submit",a=>{if(a.target instanceof HTMLFormElement){if(a.target.id==="doc-filter"){a.preventDefault(),rr(e,t,{refreshList:!0});const n=vc(a.target);if(!n.startDate||!n.endDate){window.alert("Bitte Start- und Enddatum auswählen.");return}V=n,Fa(e),xt(e,t.state.getState());return}a.target.dataset.role==="archive-form"&&(a.preventDefault(),mc(e,t,a.target))}}),e.addEventListener("click",a=>{const n=a.target;if(!n)return;const r=n.dataset.action;if(!r){n.closest("[data-action]")&&a.stopPropagation();return}if(r==="reset-filters"){const o=e.querySelector("#doc-filter");o?.reset(),V=Gr(),Ns(o??null,V),rr(e,t,{refreshList:!0}),Fa(e),xt(e,t.state.getState());return}if(r==="archive-toggle"){kr(e),Pe(e,"");return}if(r==="archive-cancel"){kr(e,!1),Pe(e,"");return}if(r==="archive-log-focus"){const o=n.dataset.logId;if(!o)return;const c=_i(t.state.getState(),o);if(!c){window.alert("Archiv-Eintrag nicht gefunden.");return}const p=c.fileName?`Archiv ${c.fileName}`:"Archivierter Zeitraum";typeof t.events?.emit=="function"?t.events.emit("documentation:focus-range",{startDate:c.startDate,endDate:c.endDate,label:p,reason:"archive-log"}):(V={...V,startDate:c.startDate,endDate:c.endDate},xt(e,t.state.getState())),Pe(e,`Dokumentation auf Archiv ${c.startDate} – ${c.endDate} fokussiert.`,"success");return}if(r==="archive-log-copy-hint"){const o=n.dataset.logId;if(!o)return;const c=_i(t.state.getState(),o);if(!c||!c.storageHint){window.alert("Kein Speicherhinweis vorhanden.");return}const p=c.storageHint;(async()=>{try{await Zl(p),Pe(e,"Speicherhinweis kopiert.","success")}catch(d){console.error("Hinweis konnte nicht kopiert werden",d),window.alert("Hinweis konnte nicht kopiert werden.")}})();return}if(r==="doc-focus-clear"){rr(e,t,{refreshList:!0});return}if(r==="print-selection"||r==="pdf-selection"){(async()=>{const o=await sr();await Ks(o)})();return}if(r==="export-selection"){(async()=>{const o=await sr();gc(o)})();return}if(r==="export-zip"){(async()=>{const o=await sr();await bc(o,V)})();return}if(r==="delete-selection"){if(!We.size||!window.confirm("Ausgewählte Einträge wirklich löschen?"))return;uc(e,t);return}if(r==="doc-seed"){if(!sa.enabled||za)return;const c=window.__PSL?.seedHistoryEntries;if(typeof c!="function"){window.alert("Seed-Funktion ist nicht verfügbar. Bitte Entwicklungsmodus verwenden.");return}za=!0,Lr(e),(async()=>{try{await c(sa.count),await xt(e,t.state.getState())}catch(p){console.error("Dummy-Daten konnten nicht erstellt werden",p),window.alert("Dummy-Daten konnten nicht erstellt werden.")}finally{za=!1,Lr(e)}})();return}if(r==="detail-print"){const c=e.querySelector("#doc-detail")?.dataset.entryId;if(!c){window.alert("Kein Eintrag ausgewählt.");return}const p=Ot(c);if(!p){window.alert("Eintrag nicht verfügbar.");return}Wi(p);return}const i=n.dataset.entryId;if(!i)return;const l=Ot(i);if(!l){window.alert("Eintrag nicht verfügbar.");return}if(r==="view-entry"){Rs(e,l,t.state.getState().fieldLabels);return}if(r==="print-entry"){Wi(l);return}}),e.addEventListener("change",a=>{const n=a.target;if(!n)return;if(n.dataset.action==="toggle-select-all"){dc(e,n.checked);return}if(n.dataset.action!=="toggle-select")return;const r=n.dataset.entryId;if(r){if(n.checked){We.add(r);const i=Ot(r);i&&Lt.set(r,i)}else We.delete(r),Lt.delete(r);Gn(e)}})}function xc(e,t){if(!e||Fi)return;const a=e;a.innerHTML="";const n=hc();a.appendChild(n),wc(n,t),Lr(n),Vr(n,t.state.getState()),Wn(n);const r=t.state.getState().archives?.logs??[];Na(n,r),hn=Sr(r),Zr(),typeof t.events?.subscribe=="function"&&t.events.subscribe("documentation:focus-range",o=>{!o||typeof o!="object"||Nl(n,t,o)});const i=o=>Ke(o.history).length,l=()=>xt(n,t.state.getState());Hi?.(),Hi=Ps({section:"documentation",event:"history:data-changed",shouldHandleEvent:()=>De==="sqlite",shouldRefresh:()=>De==="sqlite",onRefresh:()=>l(),onStatusChange:o=>Il(n,o)}),ya=i(t.state.getState()),l(),t.state.subscribe(o=>{const c=Sr(o.archives?.logs);c!==hn&&(hn=c,Na(n,o.archives?.logs??[]));const p=i(o);if(xr){ya=p;return}if(De==="sqlite"){ya=p;return}p!==ya&&(ya=p,l())}),Fi=!0}const qa=e=>Ke(e.gps.points),Ea=e=>Ke(e.points),kc=new Intl.NumberFormat("de-DE",{minimumFractionDigits:5,maximumFractionDigits:5}),Sc=new Intl.DateTimeFormat("de-DE",{dateStyle:"short",timeStyle:"short"}),Gi="Deutschland";let Ui=!1,Ws="list",un=null,$=null,wa=null,Vi=null;const yn=25,or=new Intl.NumberFormat("de-DE");let Me=0,Jt=null,$r=null,Zi=null;function Zt(e,t){typeof e.events?.emit=="function"&&e.events.emit("history:gps-activation-result",{...t,source:"gps",timestamp:Date.now()})}function Pa(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ec(){const e=document.createElement("section");return e.className="section-inner",e.innerHTML=`
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
  `,e}function Lc(e){return{root:e,message:e.querySelector('[data-role="gps-message"]'),refreshIndicator:e.querySelector('[data-role="gps-refresh-indicator"]'),availability:e.querySelector('[data-role="gps-availability"]'),tabButtons:Array.from(e.querySelectorAll('[data-role="gps-tab"]')),panels:Array.from(e.querySelectorAll('[data-role="gps-panel"]')),listBody:e.querySelector('[data-role="gps-list"]'),emptyState:e.querySelector('[data-role="gps-empty"]'),activeInfo:e.querySelector('[data-role="gps-active-info"]'),summaryLabel:e.querySelector('[data-role="gps-summary"]'),statusBadge:e.querySelector('[data-role="gps-status"]'),form:e.querySelector('[data-role="gps-form"]'),formFields:{name:e.querySelector('[name="gps-name"]'),description:e.querySelector('[name="gps-description"]'),latitude:e.querySelector('[name="gps-latitude"]'),longitude:e.querySelector('[name="gps-longitude"]'),source:e.querySelector('[name="gps-source"]'),activate:e.querySelector('[name="gps-activate"]'),rawCoordinates:e.querySelector('[name="gps-raw-coordinates"]')},disableTargets:Array.from(e.querySelectorAll("[data-gps-disable]")),geolocationBtn:e.querySelector('[data-action="use-geolocation"]'),mapButton:e.querySelector('[data-role="gps-open-maps"]'),verifyButton:e.querySelector('[data-action="verify-coords"]')}}function La(e){return`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e)}`}function js(e){const t=e.gps,a=Ea(t),n=l=>{if(!l)return null;const o=_a(l)||La(`${l.latitude},${l.longitude}`),c=l.name?`${l.name}`:`${oa(l.latitude)}, ${oa(l.longitude)}`;return{url:o,label:c}};if(t.activePointId){const l=a.find(c=>c.id===t.activePointId),o=n(l||null);if(o)return o}if(a.length>0){const l=n(a[0]);if(l)return l}const r=e.company?.address?.trim();if(r)return{url:La(r.replace(/\n/g,", ")),label:r};const i=e.company?.name?.trim();return i?{url:La(i),label:i}:{url:La(Gi),label:Gi}}function Dc(e){if(!$)return;const t=js(e);$.mapButton&&($.mapButton.href=t.url,$.mapButton.title=`Google Maps öffnen (${t.label})`);const a=$.root.querySelector('[data-role="gps-empty-map-link"]');a&&(a.href=t.url)}function $c(e){if(!e)return null;const a=e.trim().replace(/\s+/g," ").replace(/[,;]/g," ").match(/-?\d+(?:[.,]\d+)?/g);if(!a||a.length<2)return null;const n=l=>Number(l.replace(/,/g,".")),r=n(a[0]),i=n(a[1]);return!Number.isFinite(r)||!Number.isFinite(i)||r<-90||r>90||i<-180||i>180?null:{latitude:r,longitude:i}}function Ac(){if(!$?.formFields)return null;const e=$.formFields.latitude?.value??"",t=$.formFields.longitude?.value??"";if(!e.trim()||!t.trim())return null;const a=Number(e),n=Number(t);return!Number.isFinite(a)||!Number.isFinite(n)||a<-90||a>90||n<-180||n>180?null:{latitude:a,longitude:n}}function pn(e){return Number(e).toFixed(6)}function zc(e,t){const a=pn(e),n=pn(t);return qa(W()).some(r=>pn(r.latitude)===a&&pn(r.longitude)===n)}function Ma(){if(!$?.verifyButton)return;const e=Ac(),t=!!e;if($.verifyButton.disabled=!t,e){const a=_a({latitude:e.latitude,longitude:e.longitude});$.verifyButton.dataset.targetUrl=a||La(`${e.latitude},${e.longitude}`)}else delete $.verifyButton.dataset.targetUrl}function oa(e){const t=Number(e);return Number.isFinite(t)?`${kc.format(t)}°`:"–"}function Pc(e){if(!e)return"–";const t=new Date(e);return Number.isNaN(t.getTime())?"–":Sc.format(t)}function se(e,t="info",a=4500){if($?.message){if(un&&(window.clearTimeout(un),un=null),!e){$.message.classList.add("d-none"),$.message.textContent="";return}$.message.className=`alert alert-${t}`,$.message.textContent=e,$.message.classList.remove("d-none"),a>0&&(un=window.setTimeout(()=>{$?.message?.classList.add("d-none")},a))}}function Mc(e){const t=$?.refreshIndicator;if(t){if(t.classList.remove("alert-warning","alert-info"),e==="idle"){t.classList.add("d-none");return}t.classList.remove("d-none"),e==="stale"?(t.classList.add("alert-warning"),t.textContent="GPS-Daten wurden geändert. Ansicht aktualisiert sich beim Öffnen."):(t.classList.add("alert-info"),t.textContent="GPS-Daten werden aktualisiert...")}}function Gs(e){$&&(Ws=e,$.tabButtons.forEach(t=>{const a=t.dataset.tab===e;t.classList.toggle("active",a)}),$.panels.forEach(t=>{const a=t.getAttribute("data-panel")===e;t.classList.toggle("d-none",!a)}))}function je(e){return e?.hasDatabase?e.storageDriver!=="sqlite"?"wrong-driver":"ok":"no-db"}function Cc(e){if($?.availability){if(e==="ok"){$.availability.classList.add("d-none"),$.availability.textContent="";return}$.availability.classList.remove("d-none"),$.availability.textContent=e==="no-db"?"Bitte verbinden Sie zuerst eine Datenbank, um GPS-Punkte zu verwalten.":"GPS-Funktionen benötigen eine aktive SQLite-Datenbank. Bitte den SQLite-Treiber in den Einstellungen auswählen."}}function aa(e,t){if(!$)return;const a=t!=="ok"||e.pending||Ba.isLocked();if($.disableTargets.forEach(n=>{(n instanceof HTMLButtonElement||n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n instanceof HTMLSelectElement)&&(n.disabled=a)}),$.statusBadge){let n="badge bg-success",r="Bereit";t==="no-db"?(n="badge bg-secondary",r="Keine Datenbank"):t==="wrong-driver"?(n="badge bg-warning text-dark",r="Nur mit SQLite"):(e.pending||Ba.isLocked())&&(n="badge bg-info text-dark",r="Wird verarbeitet"),$.statusBadge.className=n,$.statusBadge.textContent=r}}function Us(e){const t=e.length;if(!t)return Me=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/yn),1);Me>=a&&(Me=a-1),Me<0&&(Me=0);const n=Me*yn,r=Math.min(n+yn,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function Ic(){if(!$?.root)return null;const e=$.root.querySelector('[data-role="gps-pager"]');return e?((!Jt||$r!==e)&&(Jt?.destroy(),Jt=Ra(e,{onPrev:()=>Nc(),onNext:()=>Fc(),labels:{prev:"Zurück",next:"Weiter",loading:"GPS-Punkte werden geladen...",empty:"Keine GPS-Punkte verfügbar"}}),$r=e),Jt):null}function Qi(e,t){const a=Ic();if(!a)return;if(t!=="ok"){Me=0;const l=t==="no-db"?"Keine Datenbank verbunden.":"Nur mit SQLite verfügbar.";a.update({status:"disabled",info:l});return}const n=qa(e).length;if(!n){Me=0;const l=e.gps.initialized?"Noch keine GPS-Punkte vorhanden.":"GPS-Punkte werden geladen...";a.update({status:"disabled",info:l});return}const{start:r,end:i}=Us(qa(e));a.update({status:"ready",info:`Einträge ${or.format(r+1)}–${or.format(i)} von ${or.format(n)}`,canPrev:Me>0,canNext:i<n})}function Bc(e,t){return e.length?e.map(a=>{const n=a.id===t,r=a.description?`<div class="text-muted small">${g(a.description)}</div>`:"",i=a.source?`<span class="badge-psm badge-psm-neutral">${g(a.source)}</span>`:'<span class="text-muted">–</span>',l=n?'<span class="badge bg-success ms-2">Aktiv</span>':"",o=_a(a),c=o?`<a class="btn btn-outline-info" href="${Pa(o)}" target="_blank" rel="noopener noreferrer">
              Karte
            </a>`:"";return`
        <tr data-point-id="${Pa(a.id)}">
          <td>
            <div class="fw-semibold">${g(a.name||"Ohne Namen")}${l}</div>
            ${r}
          </td>
          <td class="font-monospace">
            <div>${oa(a.latitude)}</div>
            <div>${oa(a.longitude)}</div>
          </td>
          <td>
            <div>${i}</div>
            <div class="text-muted small">${Pc(a.updatedAt)}</div>
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
`):""}function Xr(e,t){if(!$)return;const a=e.gps,n=js(e),r=t==="ok";if($.summaryLabel){const i=Ea(a).length;$.summaryLabel.textContent=r?`${i} Punkt${i===1?"":"e"} gespeichert`:"Funktion derzeit nicht verfügbar"}if(!r){$.listBody&&($.listBody.innerHTML=""),$.emptyState&&($.emptyState.textContent=t==="no-db"?"Keine Datenbank verbunden.":"Bitte SQLite als Speicher-Treiber aktivieren.",$.emptyState.classList.remove("d-none")),$.activeInfo&&($.activeInfo.textContent=t==="no-db"?"Wartet auf Datenbank.":"Nur mit SQLite verfügbar."),Qi(e,t);return}if($.listBody){const{items:i}=Us(Ea(a));$.listBody.innerHTML=Bc(i,a.activePointId)}if($.emptyState){const i=Ea(a).length>0;$.emptyState.classList.toggle("d-none",i),!i&&a.initialized?$.emptyState.innerHTML=`
        <p class="mb-2">Noch keine GPS-Punkte vorhanden.</p>
        <p class="small text-muted mb-3">
          Nutzen Sie "Neuer Punkt" oder öffnen Sie Google Maps, um Koordinaten zu ermitteln.
        </p>
        <a class="btn btn-outline-info btn-sm" data-role="gps-empty-map-link" href="${Pa(n.url)}" target="_blank" rel="noopener noreferrer">
          <i class="bi bi-box-arrow-up-right me-1"></i>
          Google Maps öffnen
        </a>
      `:a.initialized||($.emptyState.textContent="GPS-Punkte werden geladen...")}if($.activeInfo)if(a.activePointId){const i=Ea(a).find(l=>l.id===a.activePointId);if(i){const l=`${i.name||"Ohne Namen"} (${oa(i.latitude)}, ${oa(i.longitude)})`,o=_a(i);o?$.activeInfo.innerHTML=`${g(l)} <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${Pa(o)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:$.activeInfo.textContent=l}else $.activeInfo.textContent="Aktiver Punkt nicht gefunden."}else $.activeInfo.innerHTML=`Kein aktiver Punkt ausgewählt. <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${Pa(n.url)}" target="_blank" rel="noopener noreferrer">Google Maps öffnen</a>`;Qi(e,t)}function Nc(){if(Me===0)return;Me=Math.max(Me-1,0);const e=W(),t=je(e.app);Xr(e,t)}function Fc(){const e=W(),t=qa(e).length;if(!t)return;const a=Math.max(Math.ceil(t/yn)-1,0);if(Me>=a)return;Me=Math.min(Me+1,a);const n=je(e.app);Xr(e,n)}function Be(e){`${new Date().toLocaleString("de-DE")}${e}`}function Wa(e){if(!e)return null;const t=W();return qa(t).find(a=>a.id===e)||null}async function Tc(e){if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(e);return}const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}function qc(){if(!$?.formFields?.rawCoordinates)return;const e=$.formFields.rawCoordinates.value,t=$c(e);if(!t){se("Koordinaten konnten nicht erkannt werden. Bitte Format 47.68952, 9.12091 verwenden.","warning",6e3);return}const a=t.latitude.toFixed(6),n=t.longitude.toFixed(6);$.formFields.latitude&&($.formFields.latitude.value=a),$.formFields.longitude&&($.formFields.longitude.value=n),se("Koordinaten übernommen.","success"),Ma()}function Hc(){if(!$?.verifyButton)return;const e=$.verifyButton.dataset.targetUrl;if(!e){se("Bitte zuerst gültige Koordinaten eintragen, bevor die Prüfung geöffnet wird.","warning",6e3);return}window.open(e,"_blank","noopener,noreferrer")}async function Ar(e={}){const{notify:t=!1}=e;if(!(!$||je(W().app)!=="ok"||W().gps.pending))try{await ms(),t&&se("GPS-Punkte aktualisiert.","success"),Be("GPS-Punkte synchronisiert.")}catch(n){const r=n instanceof Error?n.message:"GPS-Punkte konnten nicht geladen werden.";se(r,"danger",7e3),Be(`Fehler beim Laden: ${r}`)}}async function Oc(e){if(!e)return;const t=Wa(e);if(!t){se("Ausgewählter GPS-Punkt wurde nicht gefunden.","warning");return}try{await vs(t.id),se(`"${t.name}" ist nun aktiv.`,"success"),Be(`Aktiver GPS-Punkt: ${t.name}`)}catch(a){const n=a instanceof Error?a.message:"GPS-Punkt konnte nicht aktiviert werden.";se(n,"danger",7e3),Be(`Fehler beim Aktivieren: ${n}`)}}async function _c(e){if(!e)return;const t=Wa(e);if(!t){se("GPS-Punkt existiert nicht mehr.","warning");return}if(window.confirm(`"${t.name}" wirklich löschen? Dieser Schritt kann nicht rückgängig gemacht werden.`))try{await Ao(t.id),se(`"${t.name}" wurde gelöscht.`,"success"),Be(`GPS-Punkt gelöscht: ${t.name}`)}catch(n){const r=n instanceof Error?n.message:"GPS-Punkt konnte nicht gelöscht werden.";se(r,"danger",7e3),Be(`Löschen fehlgeschlagen: ${r}`)}}async function Rc(e){if(!e)return;const t=Wa(e);if(!t){se("GPS-Punkt nicht gefunden.","warning");return}const a=`${t.latitude}, ${t.longitude}`;try{await Tc(a),se("Koordinaten in die Zwischenablage kopiert.","success")}catch(n){console.error("clipboard error",n),se("Koordinaten konnten nicht kopiert werden.","danger",7e3)}}async function Kc(e,t){const a=(e||"").trim();if(!a){Zt(t,{status:"error",id:"",message:"Ungültige GPS-Anfrage ohne ID."});return}if(je(W().app)!=="ok"){se("GPS-Modul ist ohne aktive SQLite-Datenbank nicht verfügbar.","warning",6e3),Zt(t,{status:"error",id:a,message:"GPS-Modul ist derzeit nicht verfügbar."});return}const r=Wa(a);if(!r){se("Verknüpfter GPS-Punkt wurde nicht gefunden.","warning",6e3),Zt(t,{status:"error",id:a,message:"Verknüpfter GPS-Punkt wurde nicht gefunden."});return}Zt(t,{status:"pending",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wird aktiviert...`});try{await vs(r.id),se(`"${r.name||"Ohne Namen"}" wurde aus der Historie aktiviert.`,"success"),Be(`Aus Historie aktiviert: ${r.name||r.id}`),Zt(t,{status:"success",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wurde aktiviert.`})}catch(i){const l=i instanceof Error?i.message:"GPS-Punkt konnte nicht aktiviert werden.";se(l,"danger",7e3),Be(`Aktivierung aus Historie fehlgeschlagen: ${l}`),Zt(t,{status:"error",id:r.id,name:r.name,message:l})}}async function Wc(){try{await zo(),Be("Aktiver GPS-Punkt synchronisiert."),se("Aktiver GPS-Punkt wurde synchronisiert.","success")}catch(e){const t=e instanceof Error?e.message:"Aktiver GPS-Punkt konnte nicht ermittelt werden.";se(t,"danger",7e3),Be(`Sync fehlgeschlagen: ${t}`)}}function jc(){if(!$?.formFields)throw new Error("Formular nicht initialisiert");const e=$.formFields.name?.value.trim()||"",t=$.formFields.description?.value.trim()||"",a=$.formFields.source?.value.trim()||"",n=Number($.formFields.latitude?.value),r=Number($.formFields.longitude?.value),i=!!$.formFields.activate?.checked;if(!e)throw new Error("Name darf nicht leer sein.");if(!Number.isFinite(n)||!Number.isFinite(r))throw new Error("Koordinaten sind ungültig.");return{name:e,description:t,latitude:n,longitude:r,source:a,activate:i}}async function Gc(e){if(e.preventDefault(),Ba.isLocked()){se("Speichern läuft bereits ...","info");return}try{const t=jc();if(zc(t.latitude,t.longitude)){se("Ein GPS-Punkt mit identischen Koordinaten ist bereits vorhanden.","warning",6e3);return}aa(W().gps,je(W().app)),await Po({name:t.name,description:t.description||null,latitude:t.latitude,longitude:t.longitude,source:t.source||null},{activate:t.activate}),T.success(`GPS-Punkt "${t.name}" gespeichert.`),Be(`GPS-Punkt gespeichert${t.activate?" und aktiv gesetzt":""}: ${t.name}`),$?.form?.reset()}catch(t){const a=t instanceof Error?t.message:"GPS-Punkt konnte nicht gespeichert werden.";T.error(a),Be(`Speichern fehlgeschlagen: ${a}`)}finally{aa(W().gps,je(W().app))}}function Uc(){if($?.formFields){if(!navigator.geolocation){T.warning("Geolocation wird von diesem Browser nicht unterstützt.");return}if(Ba.isLocked()){T.info("Bitte warten...");return}Ba.acquire(async()=>(aa(W().gps,je(W().app)),new Promise(e=>{navigator.geolocation.getCurrentPosition(t=>{const{latitude:a,longitude:n}=t.coords;$?.formFields.latitude&&($.formFields.latitude.value=a.toFixed(6)),$?.formFields.longitude&&($.formFields.longitude.value=n.toFixed(6)),$?.formFields.source&&!$.formFields.source.value.trim()&&($.formFields.source.value="Browser"),T.success("Koordinaten aus Browser-Position übernommen."),Be("Browser-Geolocation übernommen"),Ma(),aa(W().gps,je(W().app)),e()},t=>{const a=t.code===t.PERMISSION_DENIED?"Zugriff auf Standort wurde verweigert.":"Geolocation konnte nicht ermittelt werden.";T.warning(a),Be(`Geolocation fehlgeschlagen: ${a}`),aa(W().gps,je(W().app)),e()},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})})))}}function Vc(){$&&($.root.addEventListener("click",e=>{const t=e.target;if(!t)return;const a=t.closest('[data-role="gps-tab"]');if(a&&a.dataset.tab){Gs(a.dataset.tab);return}const n=t.closest("[data-action]");if(!n||n.dataset.action==="")return;const i=n.closest("[data-point-id]")?.getAttribute("data-point-id")||"";switch(n.dataset.action){case"reload-points":Ar({notify:!0});break;case"sync-active":Wc();break;case"set-active":Oc(i);break;case"delete-point":_c(i);break;case"copy-coords":Rc(i);break;case"use-geolocation":Uc();break;case"apply-raw-coords":qc();break;case"verify-coords":Hc();break}}),$.form?.addEventListener("submit",e=>{Gc(e)}),$.form?.addEventListener("reset",()=>{window.setTimeout(()=>{Ma()},0)}),$.formFields.latitude?.addEventListener("input",()=>{Ma()}),$.formFields.longitude?.addEventListener("input",()=>{Ma()}))}function Zc(e,t){if(!e||Ui)return;Ui=!0;const a=e;a.innerHTML="";const n=Ec();a.appendChild(n),$=Lc(n),Zi?.(),Zi=Ps({section:"gps",event:"gps:data-changed",shouldHandleEvent:()=>je(t.state.getState().app)==="ok",shouldRefresh:()=>je(t.state.getState().app)==="ok",onRefresh:()=>Ar({notify:!1}),onStatusChange:l=>Mc(l)}),Me=0,Jt?.destroy(),Jt=null,$r=null,Vc(),Gs(Ws),typeof t.events?.subscribe=="function"&&t.events.subscribe("gps:set-active-from-history",l=>{let o="";if(l&&typeof l=="object"&&(o=String(l.id||"").trim()),!o){se("Historische GPS-Anfrage ohne gültige ID erhalten.","warning",6e3);return}Kc(o,t)});const r=t.state.getState();wa=r.gps.activePointId;const i=(l,o)=>{const c=je(l.app),p=l.gps;if(Cc(c),Xr(l,c),aa(p,c),Dc(l),c==="ok"&&!p.initialized&&!p.pending&&Ar({notify:!1}),c==="ok"&&Vi!=="ok"&&p.initialized&&se("GPS-Bereich ist wieder verfügbar.","success"),Vi=c,l.gps.activePointId!==wa&&(wa=l.gps.activePointId,typeof t.events?.emit=="function")){const d=Wa(wa);t.events.emit("gps:active-point-changed",{id:wa,point:d})}l.gps.lastError&&l.gps.lastError!==o.gps.lastError&&(se(l.gps.lastError,"danger",7e3),Be(`Fehler: ${l.gps.lastError}`))};t.state.subscribe(i),i(r,r)}let Te=[],qe=[],zr=!1,wn=null;async function ct(){try{const[e,t]=await Promise.all([No({limit:100}),Fo({limit:100})]);Te=e.items||[],qe=t.items||[],Dn("savedCodes:changed",{eppoCount:Te.length,bbchCount:qe.length})}catch(e){console.error("Failed to load saved codes:",e),Te=[],qe=[]}}function Qc(){const e=Te.length>0,t=qe.length>0;return`
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
                  ${Pr()}
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
                  ${Mr()}
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
  `}function Pr(){return Te.length?Te.map(e=>`
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
    `}function Mr(){return qe.length?qe.map(e=>`
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
    `}function dt(e){const t=e.querySelector('[data-role="saved-eppo-list"]'),a=Te.length>0;if(t){const o=t.closest(".border-top");o&&a&&(o.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Kulturen
            <span class="badge bg-success ms-2">${Te.length}</span>
          </h6>
          <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Pr()}
          </div>
        `)}else if(a){const o=e.querySelector(".codes-card:first-child .border-top.pt-3.mb-3");o&&(o.innerHTML=`
        <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
          <i class="bi bi-bookmark-star me-1"></i>
          Meine Kulturen
          <span class="badge bg-success ms-2">${Te.length}</span>
        </h6>
        <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
          ${Pr()}
        </div>
      `)}const n=e.querySelector('[data-role="saved-bbch-list"]'),r=qe.length>0;if(n){const o=n.closest(".border-top");o&&r&&(o.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${qe.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Mr()}
          </div>
        `)}else if(r){const c=e.querySelectorAll(".codes-card")[1];if(c){const p=c.querySelector(".border-top.pt-3.mb-3");p&&(p.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${qe.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Mr()}
          </div>
        `)}}const i=e.querySelector(".codes-card:first-child .card-header .badge"),l=e.querySelector(".codes-card:last-child .card-header .badge");i&&(i.textContent=`${Te.length} gespeichert`),l&&(l.textContent=`${qe.length} gespeichert`)}function Jc(e){const t=e.querySelector('[data-input="eppo-search"]'),a=e.querySelector('[data-role="eppo-search-results"]');if(t&&a){const o=li(async()=>{const c=t.value.trim();if(c.length<2){a.innerHTML="";return}try{const p=await Io(c,10);if(!p.length){a.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${g(c)}"</div>
          `;return}a.innerHTML=p.map(d=>`
          <button type="button" class="list-group-item list-group-item-action" 
                  data-action="select-eppo" 
                  data-code="${g(d.code)}" 
                  data-name="${g(d.name)}"
                  data-language="${g(d.language||"")}"
                  data-dtcode="${g(d.dtcode||"")}">
            <strong class="text-success">${g(d.code)}</strong>
            <span class="ms-2">${g(d.name)}</span>
            ${d.dtcode?`<small class="text-muted ms-2">(${g(d.dtcode)})</small>`:""}
          </button>
        `).join("")}catch(p){console.error("EPPO search failed:",p),a.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);t.addEventListener("input",o)}const n=e.querySelector('[data-input="bbch-search"]'),r=e.querySelector('[data-role="bbch-search-results"]');if(n&&r){const o=li(async()=>{const c=n.value.trim();if(c.length<1){r.innerHTML="";return}try{const p=await Bo(c,10);if(!p.length){r.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${g(c)}"</div>
          `;return}r.innerHTML=p.map(d=>`
          <button type="button" class="list-group-item list-group-item-action d-flex align-items-start gap-2 py-2" 
                  data-action="select-bbch" 
                  data-code="${g(d.code)}" 
                  data-label="${g(d.label)}"
                  data-principal="${d.principalStage??""}"
                  data-secondary="${d.secondaryStage??""}">
            <strong class="text-info flex-shrink-0" style="min-width: 35px;">${g(d.code)}</strong>
            <span class="text-break" style="line-height: 1.4;">${g(d.label)}</span>
          </button>
        `).join("")}catch(p){console.error("BBCH search failed:",p),r.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);n.addEventListener("input",o)}e.dataset.codesClickBound!=="1"&&(e.dataset.codesClickBound="1",e.addEventListener("click",async o=>{const p=o.target.closest("[data-action]");if(!p)return;const d=p.dataset.action;if(d==="select-eppo"){const f=p.dataset.code||"",m=p.dataset.name||"",w=p.dataset.language||"",b=p.dataset.dtcode||"";if(!f||!m){console.warn("EPPO selection missing code or name");return}a&&(a.innerHTML=""),t&&(t.value="");const k=Te.find(S=>S.code.toUpperCase()===f.toUpperCase());if(k){const S=e.querySelector(`[data-eppo-id="${k.id}"]`);S&&(S.classList.add("flash-highlight"),setTimeout(()=>S.classList.remove("flash-highlight"),800));return}try{await er({code:f,name:m,language:w||void 0,dtcode:b||void 0,isFavorite:!1});const S=Ge();await Ue(S),await ct(),dt(e)}catch(S){console.error("Failed to save EPPO from search:",S),alert("Speichern fehlgeschlagen")}}if(d==="select-bbch"){const f=p.dataset.code||"",m=p.dataset.label||"",w=p.dataset.principal,b=p.dataset.secondary,k=w?parseInt(w,10):void 0,S=b?parseInt(b,10):void 0;if(!f||!m){console.warn("BBCH selection missing code or label");return}r&&(r.innerHTML=""),n&&(n.value="");const A=qe.find(C=>C.code===f);if(A){const C=e.querySelector(`[data-bbch-id="${A.id}"]`);C&&(C.classList.add("flash-highlight"),setTimeout(()=>C.classList.remove("flash-highlight"),800));return}try{await tr({code:f,label:m,principalStage:Number.isNaN(k)?void 0:k,secondaryStage:Number.isNaN(S)?void 0:S,isFavorite:!1});const C=Ge();await Ue(C),await ct(),dt(e)}catch(C){console.error("Failed to save BBCH from search:",C),alert("Speichern fehlgeschlagen")}}if(d==="toggle-favorite-eppo"){const f=p.dataset.id;if(!f)return;const m=Te.find(w=>w.id===f);if(!m)return;try{await er({id:m.id,code:m.code,name:m.name,language:m.language,dtcode:m.dtcode,isFavorite:!m.isFavorite});const w=Ge();await Ue(w),await ct(),dt(e)}catch(w){console.error("Failed to toggle EPPO favorite:",w)}}if(d==="toggle-favorite-bbch"){const f=p.dataset.id;if(!f)return;const m=qe.find(w=>w.id===f);if(!m)return;try{await tr({id:m.id,code:m.code,label:m.label,principalStage:m.principalStage,secondaryStage:m.secondaryStage,isFavorite:!m.isFavorite});const w=Ge();await Ue(w),await ct(),dt(e)}catch(w){console.error("Failed to toggle BBCH favorite:",w)}}if(d==="delete-eppo"){const f=p.dataset.id;if(!f||!confirm("EPPO-Code wirklich löschen?"))return;try{await Mo({id:f});const m=Ge();await Ue(m),await ct(),dt(e)}catch(m){console.error("Failed to delete EPPO:",m)}}if(d==="delete-bbch"){const f=p.dataset.id;if(!f||!confirm("BBCH-Stadium wirklich löschen?"))return;try{await Co({id:f});const m=Ge();await Ue(m),await ct(),dt(e)}catch(m){console.error("Failed to delete BBCH:",m)}}}));const i=e.querySelector('[data-form="add-eppo"]');i&&i.addEventListener("submit",async o=>{o.preventDefault();const c=e.querySelector('[data-input="eppo-code"]'),p=e.querySelector('[data-input="eppo-name"]'),d=e.querySelector('[data-input="eppo-favorite"]'),f=c?.value.trim(),m=p?.value.trim();if(!f||!m){alert("Bitte Code und Name eingeben");return}try{await er({code:f,name:m,isFavorite:d?.checked||!1});const w=Ge();await Ue(w),await ct(),dt(e),c&&(c.value=""),p&&(p.value=""),d&&(d.checked=!1)}catch(w){console.error("Failed to save EPPO:",w),alert("Speichern fehlgeschlagen")}});const l=e.querySelector('[data-form="add-bbch"]');l&&l.addEventListener("submit",async o=>{o.preventDefault();const c=e.querySelector('[data-input="bbch-code"]'),p=e.querySelector('[data-input="bbch-label"]'),d=e.querySelector('[data-input="bbch-favorite"]'),f=c?.value.trim(),m=p?.value.trim();if(!f||!m){alert("Bitte Code und Bezeichnung eingeben");return}try{await tr({code:f,label:m,isFavorite:d?.checked||!1});const w=Ge();await Ue(w),await ct(),dt(e),c&&(c.value=""),p&&(p.value=""),d&&(d.checked=!1)}catch(w){console.error("Failed to save BBCH:",w),alert("Speichern fehlgeschlagen")}})}function Yc(e,t,a={}){if(!e||zr)return;wn=e,zr=!0,wn.innerHTML=`
    <div class="section-inner codes-manager">
      <h4 class="mb-3"><i class="bi bi-tags me-2"></i>EPPO & BBCH Codes</h4>
      ${Qc()}
    </div>`;const n=wn.querySelector(".codes-manager");if(!n)return;Jc(n);const r=async()=>{await ct(),dt(n)};t?.events?.subscribe?.("database:connected",()=>{r()}),t?.state?.getState?.().app?.hasDatabase&&r()}function Xc(){zr=!1,wn=null}let Ji=!1,mt=null,Da=null,xn=null,$a=null,Bt=null,In=null,ft=null,Ha=null,Bn=null,gt=null,Cr=null,ut=null,Ce=new Set,kt=null,lr=!1,cr=!1,na=!1;const Je=e=>Ke(e.mediums),kn=25,dr=new Intl.NumberFormat("de-DE");let Ie=0,Yt=null,Ir=null,Br=null,ei=null;function ed(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function td(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`profile-${Date.now()}-${Math.random().toString(16).slice(2,10)}`}function Vs(e){if(!Ce.size)return;const t=new Set(Je(e).map(n=>n.id));let a=!1;Ce.forEach(n=>{t.has(n)||(Ce.delete(n),a=!0)}),a&&(Ce=new Set(Ce))}function Nn(){mt&&mt.querySelectorAll('[data-role="profile-select"]').forEach(e=>{const t=e.dataset.mediumId;e.checked=!!(t&&Ce.has(t))})}function St(e){const t=Je(e).length,a=Ce.size;let n="Noch keine Mittel ausgewählt.";t?a===t&&t>0?n=`${a} Mittel ausgewählt (alle).`:a>0&&(n=`${a} Mittel ausgewählt.`):n="Keine Mittel vorhanden.",Cr&&(Cr.textContent=n),ut&&(ut.disabled=t===0,ut.indeterminate=a>0&&a<t,ut.checked=t>0&&a===t)}function Sn(e){kt=null,In&&In.reset(),Ha&&(Ha.value=""),ft&&(ft.value=""),gt&&(gt.textContent="Profil speichern"),Ce=new Set,Nn(),St(e)}function ad(e,t){kt=e.id,Ha&&(Ha.value=e.id),ft&&(ft.value=e.name,ft.focus()),gt&&(gt.textContent="Profil aktualisieren"),Ce=new Set(e.mediumIds),Nn(),St(t)}function Yi(e,t){if(gt){if(gt.disabled=e,e){gt.textContent=t||"Speichert...";return}gt.textContent=kt?"Profil aktualisieren":"Profil speichern"}}function Fn(e,t){if(Da){if(Da.disabled=e,e){Da.textContent=t||"Speichert...";return}Da.textContent="Hinzufügen"}}async function nd(e,t,a){if(na)return;const n=t.state.getState(),i=(Je(n)[e]??null)?.id||null;na=!0,Fn(!0);const l=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediums",c=>{const p=Oa(c),d=p.items.slice();return d.splice(e,1),{...p,items:d,totalCount:Math.min(p.totalCount,d.length),lastUpdatedAt:new Date().toISOString()}}),await Tn({silent:!0})&&i&&t.events?.emit?.("mediums:data-changed",{action:"deleted",id:i})}finally{na=!1,Fn(!1),a&&a.isConnected&&(a.disabled=!1,a.textContent=l??"Löschen")}}async function rd(e,t,a){const n=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediumProfiles",(r=[])=>r.filter(i=>i.id!==e.id)),kt===e.id&&Sn(t.state.getState()),await Tn({successMessage:"Profil gelöscht."})}finally{a&&(a.disabled=!1,a.textContent=n||"Löschen")}}function id(e){if(!Bn)return;const t=Bn,a=e.mediumProfiles||[];if(!a.length){t.innerHTML=`
      <tr>
        <td colspan="3" class="text-center text-muted">Noch keine Profile erstellt.</td>
      </tr>
    `;return}const n=new Map(Je(e).map(r=>[r.id,r]));t.innerHTML="",a.forEach(r=>{const i=document.createElement("tr"),l=r.mediumIds.map(c=>n.get(c)).filter(Boolean).map(c=>g(c.name)),o=l.length?l.join(", "):'<span class="text-muted">Keine gültigen Mittel</span>';i.innerHTML=`
      <td>${g(r.name)}</td>
      <td>${o}</td>
      <td>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-sm btn-outline-info" data-action="profile-edit" data-id="${g(r.id)}">Bearbeiten</button>
          <button class="btn btn-sm btn-outline-danger" data-action="profile-delete" data-id="${g(r.id)}">Löschen</button>
        </div>
      </td>
    `,t.appendChild(i)})}function sd(e,t){if(lr||!e.mediumProfiles?.length)return;const a=new Set(Je(e).map(i=>i.id));let n=!1;const r=e.mediumProfiles.map(i=>{const l=i.mediumIds.filter(o=>a.has(o));return l.length!==i.mediumIds.length?(n=!0,{...i,mediumIds:l,updatedAt:new Date().toISOString()}):i}).filter(i=>i.mediumIds.length?!0:(n=!0,!1));n&&(lr=!0,t.state.updateSlice("mediumProfiles",()=>r),lr=!1)}function Zs(e){if(!e)return Ie=0,{start:0,end:0,total:0};const t=Math.max(Math.ceil(e/kn),1);Ie>=t&&(Ie=t-1),Ie<0&&(Ie=0);const a=Ie*kn,n=Math.min(a+kn,e);return{start:a,end:n,total:e}}function od(){if(!Br)return null;const e=Br.querySelector('[data-role="mediums-pager"]');return e?((!Yt||Ir!==e)&&(Yt?.destroy(),Yt=Ra(e,{onPrev:()=>ld(),onNext:()=>cd(),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Mittel...",empty:"Keine Mittel verfügbar"}}),Ir=e),Yt):null}function Xi(e){const t=od();if(!t)return;const a=Je(e).length;if(!a){Ie=0,t.update({status:"disabled",info:"Noch keine Mittel gespeichert."});return}const{start:n,end:r}=Zs(a),i=`Mittel ${dr.format(n+1)}–${dr.format(r)} von ${dr.format(a)}`;t.update({status:"ready",info:i,canPrev:Ie>0,canNext:r<a})}function ld(){if(Ie===0)return;const e=ei?.state.getState();e&&(Ie=Math.max(Ie-1,0),ti(e))}function cd(){const e=ei?.state.getState();if(!e)return;const t=Je(e).length;if(!t)return;const a=Math.max(Math.ceil(t/kn)-1,0);Ie>=a||(Ie=Math.min(Ie+1,a),ti(e))}function ti(e){if(!mt)return;Vs(e);const t=new Map(e.measurementMethods.map(l=>[l.id,l])),a=Je(e).length;if(!a){mt.innerHTML=`
      <tr>
        <td colspan="9" class="text-center text-muted">Noch keine Mittel gespeichert.</td>
      </tr>
    `,St(e),Xi(e);return}const{start:n,end:r}=Zs(a),i=Je(e).slice(n,r);mt.innerHTML="",i.forEach((l,o)=>{const c=n+o,p=document.createElement("tr"),d=t.get(l.methodId),f=l.approval||l.zulassungsnummer,m=typeof f=="string"&&f.trim().length?g(f):"-",w=typeof l.wartezeit=="string"&&l.wartezeit.trim().length?g(l.wartezeit):typeof l.wartezeit=="number"?`${l.wartezeit} Tage`:"-",b=typeof l.wirkstoff=="string"&&l.wirkstoff.trim().length?g(l.wirkstoff):"-";p.innerHTML=`
      <td class="text-center">
        <input type="checkbox" class="form-check-input" data-role="profile-select" data-medium-id="${g(l.id)}" ${Ce.has(l.id)?"checked":""} />
      </td>
      <td>${g(l.name)}</td>
      <td>${g(l.unit)}</td>
      <td>${g(d?d.label:l.method||l.methodId||"-")}</td>
      <td>${g(l.value!=null?String(l.value):"")}</td>
      <td>${m}</td>
      <td>${w}</td>
      <td>${b}</td>
      <td>
        <button class="btn btn-sm btn-danger" data-action="delete" data-index="${c}">Löschen</button>
      </td>
    `,mt?.appendChild(p)}),St(e),Xi(e)}function es(e){if(!$a)return;const t=new Set;$a.innerHTML="",e.measurementMethods.forEach(a=>{const n=(a.label??"").toLowerCase(),r=(a.id??"").toLowerCase();if(n&&!t.has(n)){t.add(n);const i=document.createElement("option");i.value=a.label,$a.appendChild(i)}if(r&&!t.has(r)){t.add(r);const i=document.createElement("option");i.value=a.id,$a.appendChild(i)}})}function dd(e){const t=e.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t||`method-${Date.now()}-${Math.random().toString(16).slice(2,6)}`}function ud(e,t){if(!xn)return null;const a=xn.value.trim();if(!a)return window.alert("Bitte eine Methode angeben."),xn.focus(),null;const n=e.measurementMethods.find(o=>o.label?.toLowerCase()===a.toLowerCase()||o.id?.toLowerCase()===a.toLowerCase());if(n)return n.id;const r=dd(a),i=e.fieldLabels?.calculation?.fields?.quantity?.unit||"Kiste",l={id:r,label:a,type:"factor",unit:i,requires:["areaHa"],config:{sourceField:"areaHa"}};return t.state.updateSlice("measurementMethods",o=>[...o,l]),r}async function Tn(e){try{const t=Ge();return await Ue(t),e?.silent||window.alert(e?.successMessage??"Änderungen wurden gespeichert."),!0}catch(t){console.error("Fehler beim Speichern",t);const a=t instanceof Error?t.message:"Speichern fehlgeschlagen";return window.alert(a),!1}}function pd(e,t){const a=!!t.app?.hasDatabase,n=t.app?.activeSection==="settings";e.classList.toggle("d-none",!(a&&n))}function md(e,t){if(!e||Ji)return;const a=e;a.innerHTML="";const n=ed();a.appendChild(n),Br=n,ei=t,Ie=0,Yt?.destroy(),Yt=null,Ir=null,mt=n.querySelector("#settings-mediums-table tbody"),xn=n.querySelector('input[name="medium-method"]'),$a=n.querySelector("#settings-method-options"),Bt=n.querySelector("#settings-medium-form"),Da=Bt?Bt.querySelector('button[type="submit"]'):null,In=n.querySelector("#settings-profile-form"),ft=n.querySelector("#profile-name"),Ha=n.querySelector('input[name="profile-id"]'),Bn=n.querySelector("#settings-profile-table tbody"),gt=n.querySelector('[data-role="profile-submit"]'),Cr=n.querySelector('[data-role="profile-selection-summary"]'),ut=n.querySelector('[data-role="profile-select-all"]');let r=!1,i=!1;function l(d){if(n.querySelectorAll("[data-settings-tab]").forEach(f=>{const m=f.dataset.settingsTab===d;f.classList.toggle("active",m)}),n.querySelectorAll("[data-pane]").forEach(f=>{const m=f.dataset.pane===d;f.style.display=m?"block":"none"}),d==="gps"&&!r){const f=n.querySelector('[data-feature="gps-embedded"]');f&&(Zc(f,t),r=!0)}if(d==="codes"&&!i){const f=n.querySelector('[data-feature="codes-embedded"]');f&&(Xc(),Yc(f,{state:t.state,events:{subscribe:t.events?.subscribe}},{}),i=!0)}}n.querySelectorAll("[data-settings-tab]").forEach(d=>{d.addEventListener("click",()=>{const f=d.dataset.settingsTab;f&&l(f)})});async function o(){if(!Bt||na)return;const d=t.state.getState(),f=new FormData(Bt),m=(f.get("medium-name")||"").toString().trim(),w=(f.get("medium-unit")||"").toString().trim(),b=f.get("medium-value"),k=Number(b),S=(f.get("medium-approval")||"").toString().trim(),A=f.get("medium-wartezeit"),C=A?Number(A):null,Q=(f.get("medium-wirkstoff")||"").toString().trim()||null;if(!m||!w||Number.isNaN(k)){window.alert("Bitte alle Felder korrekt ausfüllen.");return}const j=ud(d,t);if(!j)return;const ge=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`medium-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,F={id:ge,name:m,unit:w,methodId:j,value:k,zulassungsnummer:S||null,wartezeit:C!=null&&!Number.isNaN(C)?C:null,wirkstoff:Q};na=!0,Fn(!0,"Speichere...");try{t.state.updateSlice("mediums",B=>{const L=Oa(B),z=[...L.items,F];return{...L,items:z,totalCount:z.length,lastUpdatedAt:new Date().toISOString()}}),es(t.state.getState()),await Tn({successMessage:"Mittel gespeichert.",silent:!0})&&(Bt.reset(),t.events?.emit?.("mediums:data-changed",{action:"created",id:ge}))}finally{na=!1,Fn(!1)}}Bt?.addEventListener("submit",d=>{d.preventDefault(),o()}),mt?.addEventListener("click",d=>{const f=d.target?.closest('[data-action="delete"]');if(!f)return;const m=Number(f.dataset.index);Number.isNaN(m)||nd(m,t,f)}),mt?.addEventListener("change",d=>{const f=d.target;if(!f||f.dataset.role!=="profile-select")return;const m=f.dataset.mediumId;if(!m)return;f.checked?Ce.add(m):Ce.delete(m);const w=t.state.getState();St(w)}),ut?.addEventListener("change",()=>{const d=t.state.getState();ut&&(ut.indeterminate=!1,ut.checked?Ce=new Set(Je(d).map(f=>f.id)):Ce=new Set,Nn(),St(d))});const c=async()=>{if(!ft)return;const d=ft.value.trim();if(!d){window.alert("Bitte einen Profilnamen eingeben."),ft.focus();return}if(!Ce.size){window.alert("Bitte mindestens ein Mittel auswählen.");return}const f=t.state.getState();if(f.mediumProfiles?.some(S=>S.name.toLowerCase()===d.toLowerCase()&&S.id!==kt)){window.alert("Ein Profil mit diesem Namen existiert bereits.");return}const w=Je(f).filter(S=>Ce.has(S.id)).map(S=>S.id);if(!w.length){window.alert("Ausgewählte Mittel sind nicht mehr verfügbar. Bitte Auswahl prüfen."),Vs(f),Nn(),St(f);return}if(cr)return;const b=!!kt;cr=!0,Yi(!0,b?"Aktualisiere...":"Speichere...");const k=new Date().toISOString();try{if(kt)t.state.updateSlice("mediumProfiles",(A=[])=>A.map(C=>C.id===kt?{...C,name:d,mediumIds:w,updatedAt:k}:C));else{const A={id:td(),name:d,mediumIds:w,createdAt:k,updatedAt:k};t.state.updateSlice("mediumProfiles",(C=[])=>[...C,A])}await Tn({successMessage:b?"Profil aktualisiert und gespeichert.":"Profil gespeichert."})&&Sn(t.state.getState())}finally{cr=!1,Yi(!1)}};In?.addEventListener("submit",d=>{d.preventDefault(),c()}),Bn?.addEventListener("click",d=>{const f=d.target?.closest('[data-action^="profile-"]');if(!f)return;const m=f.dataset.id;if(!m)return;const w=t.state.getState();if(f.dataset.action==="profile-edit"){const b=w.mediumProfiles?.find(k=>k.id===m);b&&ad(b,w);return}if(f.dataset.action==="profile-delete"){const b=w.mediumProfiles?.find(k=>k.id===m);if(!b||!window.confirm(`Profil "${b.name}" wirklich löschen?`))return;rd(b,t,f)}}),n.querySelector('[data-action="profile-reset"]')?.addEventListener("click",()=>{Sn(t.state.getState())}),Sn(t.state.getState());const p=d=>{sd(d,t),pd(n,d),d.app.activeSection==="settings"&&(ti(d),es(d),id(d),St(d))};t.state.subscribe(p),p(t.state.getState()),Ji=!0}const xa=e=>g(e),ur=(e,t=1)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function ra(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function fd(e){if(!e)return"";const t=new Date(e);if(Number.isNaN(t.getTime()))return g(e);const a=Math.round((t.getTime()-Date.now())/864e5);return a<0?`<span style="color:#ef4444;">${ra(e)} · abgelaufen</span>`:a<180?`<span style="color:#f59e0b;">${ra(e)} · ${a} T</span>`:`<span class="calc-hint">${ra(e)}</span>`}function gd(){return`
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
    </section>`}function bd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=gd();const a=e.querySelector('[data-role="lager-uebersicht"]'),n=e.querySelector('[data-role="lager-bewegungen"]'),r=e.querySelector('[data-role="lager-form"]'),i=e.querySelector("#lager-mittel-options"),l=e.querySelector('[data-role="lager-empty"]'),o=new Map,c=w=>{if(a){if(!w.length){a.innerHTML='<tr><td colspan="6" class="calc-hint" style="padding:14px;">Noch keine Mittel. Erfasse unten einen Zugang oder dokumentiere Anwendungen in „Neu erfassen".</td></tr>';return}a.innerHTML=w.map(b=>{const k=b.bestand<0?"#ef4444":b.bestand===0?"#f59e0b":"inherit",S=g(b.einheit||"");return`<tr>
          <td><span class="fw-semibold">${g(b.name)}</span>${b.kennr?`<span class="d-block calc-hint">${g(b.kennr)}</span>`:""}</td>
          <td class="calc-hint">${g(b.wirkstoff||"")}</td>
          <td class="text-end">${ur(b.verbraucht)} ${S}<span class="d-block calc-hint">${b.anwendungen} Anw.</span></td>
          <td class="text-end fw-semibold" style="color:${k};">${ur(b.bestand)} ${S}</td>
          <td>${fd(b.zulEnde)}</td>
          <td class="calc-hint">${b.naechsterAblauf?ra(b.naechsterAblauf):""}</td>
        </tr>`}).join("")}},p=w=>{if(n){if(!w.length){n.innerHTML='<div class="calc-hint">Keine Bewegungen erfasst.</div>';return}n.innerHTML=w.map(b=>`
        <div class="d-flex align-items-center gap-2 py-1" style="border-bottom:1px solid var(--border-1);">
          <span class="badge" style="background:${b.typ==="zugang"?"#16a34a":"#64748b"};">${g(b.typ)}</span>
          <span class="flex-grow-1">${g(b.mittelName)} · <b>${ur(b.menge)} ${g(b.einheit||"")}</b>${b.charge?` · Charge ${g(b.charge)}`:""}<span class="d-block calc-hint">${ra(b.datum)}${b.lieferant?" · "+g(b.lieferant):""}${b.ablauf?" · Ablauf "+ra(b.ablauf):""}</span></span>
          <button class="btn btn-sm" style="color:#ef4444;border:1px solid var(--border-1);background:transparent;" data-del="${xa(b.id)}" title="Löschen">×</button>
        </div>`).join(""),n.querySelectorAll("[data-del]").forEach(b=>{b.addEventListener("click",async()=>{const k=b.getAttribute("data-del")||"";try{await Ho({id:k}),await Ze().catch(()=>{}),await f()}catch{T.warning("Löschen fehlgeschlagen.")}})})}},d=()=>{i&&(i.innerHTML=Array.from(o.entries()).sort((w,b)=>w[0].localeCompare(b[0],"de")).map(([w,b])=>`<option value="${xa(w)}" data-kennr="${xa(b.kennr||"")}" data-einheit="${xa(b.einheit||"")}" data-wirkstoff="${xa(b.wirkstoff||"")}"></option>`).join(""))},f=async()=>{if(ue()!=="sqlite"){l&&(l.textContent="Bitte zuerst eine Datenbank öffnen.");return}try{const[w,b,k]=await Promise.all([ys(),qo(),ws()]);c(w?.rows||[]),p(b?.rows||[]),o.clear(),(k?.rows||[]).forEach(S=>{S.name&&o.set(S.name,{kennr:S.kennr??null,einheit:S.einheit??null,wirkstoff:S.wirkstoff??null})}),(w?.rows||[]).forEach(S=>{S.name&&!o.has(S.name)&&o.set(S.name,{kennr:S.kennr??null,einheit:S.einheit??null,wirkstoff:S.wirkstoff??null})}),d()}catch(w){console.warn("[Lager] Laden fehlgeschlagen:",w)}};r?.addEventListener("submit",async w=>{if(w.preventDefault(),ue()!=="sqlite"){T.warning("Bitte zuerst eine Datenbank öffnen.");return}const b=new FormData(r),k=String(b.get("mittel")||"").trim(),S=Number(String(b.get("menge")||"").replace(",","."));if(!k||!Number.isFinite(S)){T.warning("Mittel und Menge angeben.");return}const A=String(b.get("preis")||"").trim();try{await To({mittelName:k,kennr:String(b.get("kennr")||"").trim()||null,wirkstoff:o.get(k)?.wirkstoff||null,typ:String(b.get("typ")||"zugang"),menge:S,einheit:String(b.get("einheit")||"").trim()||null,datum:String(b.get("datum")||"").trim()||null,charge:String(b.get("charge")||"").trim()||null,ablauf:String(b.get("ablauf")||"").trim()||null,lieferant:String(b.get("lieferant")||"").trim()||null,preis:A?Number(A.replace(",",".")):null}),await Ze().catch(()=>{}),r.reset(),T.success("Bewegung gespeichert."),await f()}catch{T.warning("Speichern fehlgeschlagen.")}});const m=e.querySelector('[name="mittel"]');m?.addEventListener("change",()=>{const w=o.get(m.value);if(!w)return;const b=e.querySelector('[name="einheit"]'),k=e.querySelector('[name="kennr"]');b&&w.einheit&&(b.value=w.einheit),k&&w.kennr&&(k.value=w.kennr)}),t.state.subscribe(w=>{w?.app?.activeSection==="lager"&&f()}),f()}const yt=["#ef4444","#3b82f6","#a855f7","#f59e0b","#06b6d4","#ec4899","#84cc16","#14b8a6"],hd=()=>({bedW:1.2,pathW:.4,rowSp:.5,inRowSp:.4,angle:0}),be=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";let X=null,He=null,_=null,pr=!1,Nt=[];function ts(){if(!_)return 1;const e=_.getCenter().lat;return 156543.03392*Math.cos(e*Math.PI/180)/Math.pow(2,_.getZoom())}function vd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=yd();const a=[];let n=null;const r=new Map;let i=null,l=null,o={sat:null,osm:null},c=!0,p=!0;function d(){const s=[];if(a.forEach(y=>{const x=y.latlngs||[];if(x.length<3)return;const H=x.map(ye=>[Number(ye[1]),Number(ye[0])]),O=H[0],ee=H[H.length-1];(O[0]!==ee[0]||O[1]!==ee[1])&&H.push([O[0],O[1]]),s.push({type:"Feature",geometry:{type:"Polygon",coordinates:[H]},properties:{name:y.name||"",kultur:y.kultur||null,eppoCode:y.eppoCode||null,flaeche_m2:Math.round(y.result?.areaM2||0),flaeche_ha:Number(((y.result?.areaM2||0)/1e4).toFixed(4)),beete:y.result?.beds?.length||0,beetmeter_m:Math.round(y.result?.bedMeters||0),pflanzen:y.result?.plants||0,bettbreite_m:y.params?.bedW??null,wegbreite_m:y.params?.pathW??null,reihenabstand_m:y.params?.rowSp??null,pflanzabstand_m:y.params?.inRowSp??null,ausrichtung_grad:y.params?.angle??null}})}),(Ke(t.state.getState().gps?.points)||[]).forEach(y=>{const x=Number(y.latitude),H=Number(y.longitude);if(!Number.isFinite(x)||!Number.isFinite(H))return;const O=Number(y.nutzflaecheQm);s.push({type:"Feature",geometry:{type:"Point",coordinates:[H,x]},properties:{name:y.name||"Standort",typ:"standort",flaeche_m2:Number.isFinite(O)&&O>0?Math.round(O):null,kind:y.kind||null}})}),!s.length){T.warning("Keine Flächen oder Standorte zum Exportieren.");return}const h={type:"FeatureCollection",name:"PSM Acker-Planer",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:s};try{const y=new Blob([JSON.stringify(h,null,2)],{type:"application/geo+json"}),x=URL.createObjectURL(y),H=document.createElement("a");H.href=x,H.download="acker-flaechen.geojson",document.body.appendChild(H),H.click(),H.remove(),setTimeout(()=>URL.revokeObjectURL(x),1e3),T.success(`${s.length} Objekt(e) als GeoJSON exportiert.`)}catch(y){console.error("[Acker] GeoJSON-Export fehlgeschlagen",y),T.error("Export fehlgeschlagen.")}}function f(){if(!X||!i)return;i.clearLayers(),(Ke(t.state.getState().gps?.points)||[]).forEach(u=>{const h=Number(u.latitude),y=Number(u.longitude);if(!Number.isFinite(h)||!Number.isFinite(y))return;const x=Number(u.nutzflaecheQm),H=Number.isFinite(x)&&x>0?`${Math.round(x)} m²`:"",O=u.name||"Standort",ee=X.marker([h,y],{icon:X.divIcon({className:"acker-standort",html:'<span class="acker-standort-dot"></span>',iconSize:[16,16],iconAnchor:[8,8]})});ee.bindTooltip(`${g(O)}${H?" · "+H:""}`,{permanent:!0,direction:"top",className:"acker-standort-label",offset:[0,-9]});const ye=[`<b>${g(O)}</b>`,H?`Fläche: ${H}`:"",u.kind?g(String(u.kind)):""].filter(Boolean).join("<br>");ee.bindPopup(ye),i.addLayer(ee)})}const m=s=>e.querySelector(s),w=m('[data-role="acker-list"]'),b=m('[data-role="acker-empty"]'),k=m('[data-role="acker-totals"]'),S=m('[data-role="acker-map"]'),A=s=>({id:s.id,name:s.name,kultur:s.kultur||null,eppoCode:s.eppoCode||null,standortId:s.standortId||null,color:s.color,latlngs:s.latlngs,areaQm:s.result?.areaM2||0,bedW:s.params.bedW,pathW:s.params.pathW,rowSp:s.params.rowSp,inRowSp:s.params.inRowSp,angle:s.params.angle,beds:s.result?.beds?.length||0,bedMeters:s.result?.bedMeters||0,plants:s.result?.plants||0}),C=(s,u=!1)=>{if(ue()!=="sqlite")return;const h=async()=>{try{const y=await _o(A(s));y?.id&&(s.id=y.id),await Ze().catch(()=>{})}catch(y){console.warn("[Acker] Speichern fehlgeschlagen:",y)}};if(u){h();return}clearTimeout(r.get(s._key)),r.set(s._key,setTimeout(h,600))};function Q(s,u){const h=s.map(lt=>[lt[1],lt[0]]);if(h.length<3)return{areaM2:0,beds:[],bedMeters:0,plants:0};const y=h[0],x=h[h.length-1];if((y[0]!==x[0]||y[1]!==x[1])&&h.push(y.slice()),h.length<4)return{areaM2:0,beds:[],bedMeters:0,plants:0};let H;try{H=He.polygon([h])}catch{return{areaM2:0,beds:[],bedMeters:0,plants:0}}const O=He.area(H),ee=u.bedW+u.pathW;if(ee<=0||u.bedW<=0||u.rowSp<=0||u.inRowSp<=0)return{areaM2:O,beds:[],bedMeters:0,plants:0};const ye=He.centroid(H),Le=He.transformRotate(H,-u.angle,{pivot:ye}),ke=He.bbox(Le),ot=1/111320,fa=ee*ot,Ct=u.bedW*ot,It=(ke[2]-ke[0])*.02+1e-4,Ut=[];let Vt=0,an=0,ni=0;for(let lt=ke[1];lt<ke[3]&&ni<4e3;lt+=fa,ni++){const ri=Math.min(lt+Ct,ke[3]),io=He.polygon([[[ke[0]-It,lt],[ke[2]+It,lt],[ke[2]+It,ri],[ke[0]-It,ri],[ke[0]-It,lt]]]);let nn=null;try{nn=He.intersect(Le,io)}catch{nn=null}if(!nn)continue;let Zn;try{Zn=He.transformRotate(nn,u.angle,{pivot:ye})}catch{continue}const Qn=He.area(Zn);if(Qn<Math.max(.4,u.bedW*.3))continue;const Jn=Qn/u.bedW,Yn=Math.max(1,Math.floor(u.bedW/u.rowSp)),Xn=Math.max(0,Math.floor(Jn/u.inRowSp));Vt+=Jn,an+=Yn*Xn,Ut.push({geo:Zn,lenM:Jn,rows:Yn,perRow:Xn,plants:Yn*Xn,areaM2:Qn})}return{areaM2:O,beds:Ut,bedMeters:Vt,plants:an}}const j=(s,u,h)=>({color:s.color,weight:u?3.5:2.5,fillColor:s.color,fillOpacity:h?0:u?.3:.18,dashArray:null}),ge=(s,u,h)=>({color:"#ffffff",weight:h?1:.7,opacity:.9,fillColor:s.color,fillOpacity:h?.9:.78});function F(s){if(!p||s.bedsHidden)return!1;const u=ts(),h=(s.params?.bedW||0)/u,y=(s.params?.pathW||0)/u,x=(s.params?.pathW||0)<=.001||y>=1.2;return h>=4&&x}function ae(s){s.outline&&(_.removeLayer(s.outline),s.outline=null),s.bedsLayer&&(_.removeLayer(s.bedsLayer),s.bedsLayer=null),s.label&&l&&(l.removeLayer(s.label),s.label=null),Z(s)}function B(s){const u=!!s.editing;s.outline&&_.removeLayer(s.outline),s.bedsLayer&&(_.removeLayer(s.bedsLayer),s.bedsLayer=null),s.label&&l&&l.removeLayer(s.label),Z(s);const h=s._key===n,y=F(s);s._lastDetail=y,y&&(s.bedsLayer=X.layerGroup(),(s.result?.beds||[]).forEach((x,H)=>{const O=X.geoJSON(x.geo,{style:ge(s,H,h),bubblingMouseEvents:!1});O.bindTooltip(`Beet ${H+1} · ${be(x.lenM,1)} m · ${x.rows}×${be(x.perRow)} = ${be(x.plants)} Pfl.`,{sticky:!0}),O.on("click",()=>D(s._key)),O.on("contextmenu",ee=>Ya(s,ee,H+1)),O.addTo(s.bedsLayer)}),s.bedsLayer.addTo(_)),s.outline=X.polygon(s.latlngs,{...j(s,h,y),className:h?"acker-outline-grab":"",bubblingMouseEvents:!1}).addTo(_),s.outline.on("click",()=>D(s._key)),s.outline.on("dblclick",()=>Ye(s)),s.outline.on("contextmenu",x=>Ya(s,x)),s.outline.on("mousedown",x=>ce(s,x)),L(s,h),(h||u)&&z(s)}function L(s,u){if(!c||!l||!s.outline)return;let h;try{h=s.outline.getBounds().getCenter()}catch{return}const y=s.result?.plants||0,x=`<div class="acker-flabel${u?" sel":""}" style="--fc:${s.color}"><b>${g(s.name||"")}</b><i>${be(y)} Pfl.</i></div>`;s.label=X.marker(h,{interactive:!1,keyboard:!1,icon:X.divIcon({className:"acker-flabel-wrap",html:x,iconSize:[0,0]})}),l.addLayer(s.label)}function z(s){Z(s),s.handles=s.latlngs.map((u,h)=>{const y=X.marker(u,{draggable:!0,icon:X.divIcon({className:"acker-vhandle"})}).addTo(_);return y.on("drag",x=>{s.latlngs[h]=[x.target.getLatLng().lat,x.target.getLatLng().lng],s.outline.setLatLngs(s.latlngs)}),y.on("dragend",()=>we(s)),y.on("contextmenu",x=>pa(s,h,x)),y}),s.editing=!0}function Z(s){(s.handles||[]).forEach(u=>_.removeLayer(u)),s.handles=[],s.editing=!1}function ne(){a.forEach(s=>B(s))}function pe(){a.forEach(s=>{F(s)!==s._lastDetail&&B(s)})}function he(s,u){s.color=u;try{s.outline?.setStyle({color:u,fillColor:u})}catch{}if(s.bedsLayer)try{s.bedsLayer.eachLayer(y=>y.setStyle&&y.setStyle({fillColor:u}))}catch{}try{const y=s.label?.getElement?.()?.querySelector?.(".acker-flabel");y&&y.style.setProperty("--fc",u)}catch{}const h=w?.querySelector(".acker-field.sel .acker-swatch");h&&(h.style.background=u)}function Ye(s){if(s.latlngs?.length)try{_.fitBounds(X.polygon(s.latlngs).getBounds(),{maxZoom:20,padding:[40,40]})}catch{}}function Oe(){const s=a.filter(u=>u.latlngs?.length>=3);if(!s.length){T.info("Keine Flächen vorhanden.");return}try{let u=X.polygon(s[0].latlngs).getBounds();s.slice(1).forEach(h=>{u=u.extend(X.polygon(h.latlngs).getBounds())}),_.fitBounds(u,{maxZoom:19,padding:[40,40]})}catch{}}function we(s){s.result=Q(s.latlngs,s.params),B(s),I(),C(s)}function Kt(s){if(Qe("app",u=>({...u,activeSection:"kultur"})),s?.id)try{window.dispatchEvent(new CustomEvent("psm:openKultur",{detail:{typ:"acker",id:String(s.id)}}))}catch{}else T.info("Fläche wird gespeichert – in der Kulturführung gleich wählbar.")}let xe=null;const Xe=()=>{xe&&(xe.remove(),xe=null,document.removeEventListener("pointerdown",ja,!0),document.removeEventListener("keydown",Ga,!0))},ja=s=>{xe&&!xe.contains(s.target)&&Xe()},Ga=s=>{s.key==="Escape"&&Xe()};function Un(s,u){u.style.left="",u.style.right="",u.style.top="";const h=s.getBoundingClientRect(),y=u.getBoundingClientRect(),x=y.width||210,H=y.height||260;h.right+3+x>window.innerWidth-8&&(u.style.left="auto",u.style.right="calc(100% + 3px)");let O=-5;h.top+O+H>window.innerHeight-8&&(O=Math.min(-5,window.innerHeight-8-H-h.top)),h.top+O<8&&(O=8-h.top),u.style.top=O+"px"}function Ua(s,u){u.forEach(h=>{if(!h)return;if(h.sep){const x=document.createElement("div");x.className="acker-ctx-sep",s.appendChild(x);return}if(h.type==="swatchGrid"){const x=document.createElement("div");x.className="acker-ctx-swatches",h.colors.forEach(ee=>{const ye=document.createElement("button");ye.type="button",ye.className="acker-sw"+(ee===h.current?" on":""),ye.style.background=ee,ye.title=ee,ye.addEventListener("click",Le=>{Le.stopPropagation(),Xe(),h.onPick(ee)}),x.appendChild(ye)});const H=document.createElement("label");H.className="acker-sw-custom",H.innerHTML=`<i class="bi bi-eyedropper"></i><input type="color" value="${h.current||"#3b82f6"}">`;const O=H.querySelector("input");O.addEventListener("input",ee=>(h.onLive||h.onPick)(ee.target.value)),O.addEventListener("change",ee=>{h.onPick(ee.target.value),Xe()}),x.appendChild(H),s.appendChild(x);return}const y=document.createElement("button");if(y.type="button",y.className="acker-ctx-item"+(h.danger?" danger":"")+(h.submenu?" has-sub":"")+(h.disabled?" disabled":""),y.innerHTML=`<span class="ic">${h.icon||""}</span><span class="lb">${g(h.label)}</span>`+(h.right?`<span class="rt">${g(h.right)}</span>`:"")+(h.submenu?'<span class="ch"><i class="bi bi-chevron-right"></i></span>':""),h.submenu){const x=document.createElement("div");x.className="acker-ctx-sub",Ua(x,h.submenu),y.appendChild(x),y.addEventListener("pointerenter",()=>Un(y,x))}else h.disabled||y.addEventListener("click",x=>{x.stopPropagation(),h.keepOpen||Xe(),h.action?.()});s.appendChild(y)})}function ca(s,u,h,y){if(Xe(),xe=document.createElement("div"),xe.className="acker-ctx",y){const ee=document.createElement("div");ee.className="acker-ctx-title",ee.textContent=y,xe.appendChild(ee)}Ua(xe,h),document.body.appendChild(xe);const x=xe.getBoundingClientRect();let H=s,O=u;H+x.width>window.innerWidth-8&&(H=Math.max(8,window.innerWidth-x.width-8)),O+x.height>window.innerHeight-8&&(O=Math.max(8,window.innerHeight-x.height-8)),xe.style.left=H+"px",xe.style.top=O+"px",setTimeout(()=>{document.addEventListener("pointerdown",ja,!0),document.addEventListener("keydown",Ga,!0)},0)}const Wt=s=>{const u=s.originalEvent||s;return u&&X.DomEvent.preventDefault?.(u),s.originalEvent&&X.DomEvent.stop?.(s),{x:u.clientX,y:u.clientY}};function da(s,u){s.params.angle=(Math.round(s.params.angle+u)%180+180)%180,we(s),T.info(`Beete-Ausrichtung: ${s.params.angle}°`)}function Va(s,u){s.color=u,B(s),I(),C(s)}function Za(s,u){s.kultur=u||null,s.eppoCode=Nt.find(h=>h.kultur===s.kultur)?.eppoCode||null,B(s),I(),C(s),T.success(u?`Kultur: ${u}`:"Kultur entfernt.")}function $e(s){s.bedsHidden=!s.bedsHidden,B(s),T.info(s.bedsHidden?"Beete ausgeblendet.":"Beete eingeblendet.")}function jt(s){D(s._key),setTimeout(()=>{const u=w?.querySelector(".acker-field.sel .acker-name");u&&(u.focus(),u.select())},30)}function ua(s){const h=ts()*18/111320,y={_key:"new-"+ ++oe,id:null,name:(s.name||"Fläche")+" (Kopie)",kultur:s.kultur,eppoCode:s.eppoCode,standortId:s.standortId,color:yt[(yt.indexOf(s.color)+1)%yt.length],latlngs:s.latlngs.map(x=>[x[0]+h,x[1]+h]),params:{...s.params},outline:null,bedsLayer:null,label:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(y),n=y._key,we(y),C(y,!0),T.success("Fläche dupliziert.")}function Vn(s){const u=s.latlngs||[];if(u.length<3){T.warning("Fläche hat keine Geometrie.");return}const h=u.map(x=>[Number(x[1]),Number(x[0])]);(h[0][0]!==h[h.length-1][0]||h[0][1]!==h[h.length-1][1])&&h.push([h[0][0],h[0][1]]);const y={type:"FeatureCollection",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:[{type:"Feature",geometry:{type:"Polygon",coordinates:[h]},properties:{name:s.name||"",kultur:s.kultur||null,eppoCode:s.eppoCode||null,flaeche_m2:Math.round(s.result?.areaM2||0),beete:s.result?.beds?.length||0,beetmeter_m:Math.round(s.result?.bedMeters||0),pflanzen:s.result?.plants||0}}]};try{const x=new Blob([JSON.stringify(y,null,2)],{type:"application/geo+json"}),H=URL.createObjectURL(x),O=document.createElement("a");O.href=H,O.download=`${(s.name||"flaeche").replace(/[^\w\-]+/g,"_")}.geojson`,document.body.appendChild(O),O.click(),O.remove(),setTimeout(()=>URL.revokeObjectURL(H),1e3),T.success("Fläche als GeoJSON exportiert.")}catch{T.error("Export fehlgeschlagen.")}}async function Qa(s){const u=s.result||{},h=[`Fläche: ${s.name||""}`,s.kultur?`Kultur: ${s.kultur}`:"",`Größe: ${be(u.areaM2||0)} m² (${be((u.areaM2||0)/1e4,3)} ha)`,`Beete: ${be(u.beds?.length||0)}`,`Beetmeter: ${be(u.bedMeters||0)} m`,`Pflanzen: ${be(u.plants||0)}`].filter(Boolean).join(`
`);try{await navigator.clipboard.writeText(h),T.success("Werte kopiert.")}catch{T.warning("Kopieren nicht möglich.")}}const et=s=>({icon:'<i class="bi bi-palette"></i>',label:"Farbe",submenu:[{type:"swatchGrid",colors:yt,current:s.color,onPick:u=>Va(s,u),onLive:u=>he(s,u)}]}),Ja=s=>({icon:'<i class="bi bi-flower1"></i>',label:"Kultur zuweisen",submenu:[{icon:'<i class="bi bi-x"></i>',label:"– keine –",action:()=>Za(s,null)},...Nt.length?[{sep:!0}]:[],...Nt.map(u=>({icon:u.kultur===s.kultur?'<i class="bi bi-check2"></i>':"",label:`${u.kultur}${u.anbau?" ("+u.anbau+")":""}`,action:()=>Za(s,u.kultur)}))]});function Ya(s,u,h){D(s._key);const{x:y,y:x}=Wt(u),H=!!s.editing;ca(y,x,[{icon:'<i class="bi bi-clipboard2-pulse"></i>',label:"Kulturführung öffnen",action:()=>Kt(s)},{icon:'<i class="bi bi-pencil"></i>',label:"Umbenennen",action:()=>jt(s)},Ja(s),et(s),{sep:!0},{icon:'<i class="bi bi-arrow-clockwise"></i>',label:"Beete drehen +15°",keepOpen:!0,action:()=>da(s,15)},{icon:'<i class="bi bi-arrow-counterclockwise"></i>',label:"Beete drehen −15°",keepOpen:!0,action:()=>da(s,-15)},{icon:'<i class="bi bi-grid-3x3-gap"></i>',label:s.bedsHidden?"Beete einblenden":"Beete ausblenden",action:()=>$e(s)},{icon:'<i class="bi bi-bounding-box-circles"></i>',label:H?"Eckpunkte fertig":"Eckpunkte bearbeiten",action:()=>{H?Z(s):z(s)}},{sep:!0},{icon:'<i class="bi bi-copy"></i>',label:"Duplizieren",action:()=>ua(s)},{icon:'<i class="bi bi-zoom-in"></i>',label:"Auf Fläche zoomen",action:()=>Ye(s)},{icon:'<i class="bi bi-clipboard-data"></i>',label:"Werte kopieren",action:()=>Qa(s)},{icon:'<i class="bi bi-download"></i>',label:"Als GeoJSON exportieren",action:()=>Vn(s)},{sep:!0},{icon:'<i class="bi bi-trash"></i>',label:"Löschen",danger:!0,action:()=>P(s._key)}],h?`${s.name||"Fläche"} · Beet ${h}`:s.name||"Fläche")}function pa(s,u,h){const{x:y,y:x}=Wt(h);ca(y,x,[{icon:'<i class="bi bi-node-minus"></i>',label:"Eckpunkt löschen",disabled:s.latlngs.length<=3,action:()=>{s.latlngs.length<=3||(s.latlngs.splice(u,1),we(s))}},{icon:'<i class="bi bi-check2"></i>',label:"Bearbeiten beenden",action:()=>Z(s)}],`Eckpunkt ${u+1}`)}function ma(){!o.sat||!o.osm||(_.hasLayer(o.sat)?(_.removeLayer(o.sat),o.osm.addTo(_),T.info("Karte: OSM")):(_.removeLayer(o.osm),o.sat.addTo(_),T.info("Karte: Satellit")))}function v(s){const u=s.latlng,{x:h,y}=Wt(s);ca(h,y,[{icon:'<i class="bi bi-pencil-square"></i>',label:"Neue Fläche hier zeichnen",action:()=>{le(!0),ie({latlng:u})}},{icon:'<i class="bi bi-crosshair"></i>',label:"Hierhin zentrieren",action:()=>_.panTo(u)},{sep:!0},{icon:'<i class="bi bi-arrows-fullscreen"></i>',label:"Alle Flächen anzeigen",disabled:!a.some(x=>x.latlngs?.length>=3),action:Oe},{icon:'<i class="bi bi-layers"></i>',label:"Kartentyp wechseln (Satellit/OSM)",action:ma},{sep:!0},{icon:'<i class="bi bi-geo-alt"></i>',label:"Koordinaten kopieren",action:async()=>{try{await navigator.clipboard.writeText(`${u.lat.toFixed(6)}, ${u.lng.toFixed(6)}`),T.success("Koordinaten kopiert.")}catch{T.warning("Kopieren nicht möglich.")}}}],"Karte")}function E(s){return['<option value="">– Kultur –</option>'].concat(Nt.map(u=>{const h=`${u.kultur}${u.anbau?" ("+u.anbau+")":""}`;return`<option value="${g(u.kultur)}"${u.kultur===s?" selected":""}>${g(h)}</option>`})).join("")}function q(s){const u=Ke(t.state.getState().gps?.points)||[];return['<option value="">– Standort –</option>'].concat(u.map(h=>`<option value="${g(h.id)}"${h.id===s?" selected":""}>${g(h.name||"")}</option>`)).join("")}function I(){if(!w||!b||!k)return;b.style.display=a.length?"none":"block",k.style.display=a.length?"block":"none",w.innerHTML="";let s=0,u=0,h=0,y=0;a.forEach(x=>{s+=x.result?.areaM2||0,u+=x.result?.beds?.length||0,h+=x.result?.bedMeters||0,y+=x.result?.plants||0;const H=x._key===n,O=document.createElement("div");O.className="acker-field"+(H?" sel open":""),O.innerHTML=`
        <div class="acker-fhead">
          <span class="acker-swatch" style="background:${x.color}"></span>
          <input class="acker-name" value="${g(x.name)}" />
          <span class="acker-stat">${be(x.result?.plants||0)} Pfl.</span>
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
            <div class="r"><span>Fläche</span><b>${be(x.result?.areaM2||0)} m² · ${be((x.result?.areaM2||0)/1e4,3)} ha</b></div>
            <div class="r"><span>Beete</span><b>${be(x.result?.beds?.length||0)}</b></div>
            <div class="r"><span>Beetmeter</span><b>${be(x.result?.bedMeters||0)} m</b></div>
            <div class="r"><span>Pflanzen</span><b>${be(x.result?.plants||0)}</b></div>
          </div>
          <div class="acker-actions">
            <label class="acker-colorbtn" title="Farbe wählen"><input type="color" data-act="color" value="${x.color}"><i class="bi bi-palette"></i></label>
            <button class="btn btn-sm acker-abtn" data-act="zoom" title="Auf Fläche zoomen"><i class="bi bi-zoom-in"></i></button>
            <button class="btn btn-sm acker-abtn" data-act="dup" title="Duplizieren"><i class="bi bi-copy"></i></button>
            <button class="btn btn-sm acker-abtn" data-act="rot" title="Beete drehen +15°"><i class="bi bi-arrow-clockwise"></i></button>
            <span style="flex:1"></span>
            <button class="btn btn-sm acker-abtn danger" data-act="del" title="Löschen"><i class="bi bi-trash"></i></button>
          </div>
          <div class="acker-hint"><i class="bi bi-arrows-move"></i> Ausgewählte Fläche ziehen = verschieben · Rechtsklick = mehr Aktionen</div>
        </div>`,O.querySelector(".acker-fhead").addEventListener("click",Le=>{Le.target.classList.contains("acker-name")||D(x._key)}),O.querySelector(".acker-name").addEventListener("input",Le=>{x.name=Le.target.value,C(x)}),O.querySelectorAll("[data-k]").forEach(Le=>{Le.addEventListener("input",ke=>{const ot=Le.dataset.k;if(ot==="kultur"){x.kultur=ke.target.value||null,x.eppoCode=Nt.find(fa=>fa.kultur===x.kultur)?.eppoCode||null,C(x);return}if(ot==="standortId"){x.standortId=ke.target.value||null,C(x);return}ot==="angle"?x.params.angle=+ke.target.value:x.params[ot]=parseFloat(ke.target.value)||0,we(x)})}),O.querySelector('[data-act="del"]').addEventListener("click",()=>P(x._key)),O.querySelector('[data-act="zoom"]').addEventListener("click",()=>Ye(x)),O.querySelector('[data-act="dup"]').addEventListener("click",()=>ua(x)),O.querySelector('[data-act="rot"]').addEventListener("click",()=>da(x,15));const ye=O.querySelector('[data-act="color"]');ye.addEventListener("input",Le=>he(x,Le.target.value)),ye.addEventListener("change",Le=>Va(x,Le.target.value)),w.appendChild(O)}),k.querySelector('[data-t="area"]').textContent=be(s)+" m² · "+be(s/1e4,3)+" ha",k.querySelector('[data-t="beds"]').textContent=be(u),k.querySelector('[data-t="meters"]').textContent=be(h)+" m",k.querySelector('[data-t="plants"]').textContent=be(y)}function D(s){n=s,a.forEach(u=>B(u)),I()}async function P(s){const u=a.find(y=>y._key===s);if(!u)return;ae(u);const h=a.findIndex(y=>y._key===s);if(h>=0&&a.splice(h,1),n===s&&(n=null),I(),u.id&&ue()==="sqlite")try{await Oo({id:u.id}),await Ze().catch(()=>{})}catch{}}let M=null;function ce(s,u){re||s._key!==n||(M={fl:s,lastLL:u.latlng,moved:!1},_.dragging.disable(),_.getContainer().style.cursor="grabbing",X.DomEvent.stop(u))}function me(s){if(!M)return;const u=M.fl;if(!M.moved){u.bedsLayer&&(_.removeLayer(u.bedsLayer),u.bedsLayer=null);try{u.outline.setStyle({fillOpacity:.3,dashArray:"6 5"})}catch{}}const h=s.latlng.lat-M.lastLL.lat,y=s.latlng.lng-M.lastLL.lng;M.lastLL=s.latlng,M.moved=!0,u.latlngs=u.latlngs.map(x=>[x[0]+h,x[1]+y]);try{u.outline.setLatLngs(u.latlngs)}catch{}if((u.handles||[]).forEach((x,H)=>{try{x.setLatLng(u.latlngs[H])}catch{}}),u.label)try{u.label.setLatLng(u.outline.getBounds().getCenter())}catch{}}function de(){if(!M)return;const s=M.fl,u=M.moved;M=null,_.dragging.enable(),_.getContainer().style.cursor="",u&&we(s)}function J(s){if(U.length<3)return!1;const u=_.latLngToContainerPoint(X.latLng(U[0][0],U[0][1])),h=_.latLngToContainerPoint(s);return u.distanceTo(h)<=14}function G(s){if(!He||s.length<3)return 0;try{const u=s.map(h=>[h[1],h[0]]);return u.push(u[0]),He.area(He.polygon([u]))}catch{return 0}}function Y(s){const u=m('[data-role="acker-draw-stats"]');if(!u)return;const h=G(s);u.textContent=`${U.length} Punkt${U.length===1?"":"e"}`+(h>0?` · ~${be(h)} m²`:"")}let re=!1,U=[],ve=null,N=[],oe=0;function Ae(){ve&&(_.removeLayer(ve),ve=null),N.forEach(s=>_.removeLayer(s)),N=[],U=[]}function le(s){re=s,m('[data-role="acker-banner"]').style.display=s?"block":"none",m('[data-role="acker-draw"]').style.display=s?"none":"block",_.getContainer().style.cursor=s?"crosshair":"",s?_.on("mousemove",ze):(_.off("mousemove",ze),Ae())}function tt(s){const u=s?[...U,[s.lat,s.lng]]:U;if(u.length<2){ve&&(_.removeLayer(ve),ve=null);return}ve?ve.setLatLngs(u):ve=X.polygon(u,{interactive:!1,className:"acker-draw-preview",color:"#22c55e",weight:2.5,fillColor:"#22c55e",fillOpacity:.18,dashArray:"6 5"}).addTo(_)}function K(s,u){const h=X.circleMarker(s,{radius:u?7:5,color:"#fff",fillColor:u?"#16a34a":"#22c55e",fillOpacity:1,weight:2,interactive:u,bubblingMouseEvents:!1}).addTo(_);u&&(h.bindTooltip("Zum Schließen anklicken",{direction:"top"}),h.on("click",y=>{X.DomEvent.stop(y),U.length>=3&&Pt()})),N.push(h)}function ie(s){if(re){if(J(s.latlng)){Pt();return}U.push([s.latlng.lat,s.latlng.lng]),K(s.latlng,U.length===1),tt(),Y(U)}}function ze(s){if(!re||!U.length)return;const u=J(s.latlng);if(tt(u?void 0:s.latlng),N[0])try{N[0].setRadius(u?10:7),N[0].setStyle({weight:u?3:2})}catch{}Y(u?U:[...U,[s.latlng.lat,s.latlng.lng]])}function Gt(){if(!U.length)return;U.pop();const s=N.pop();s&&_.removeLayer(s),tt(),Y(U)}function Pt(){if(U.length<3){T.warning("Mindestens 3 Punkte setzen.");return}const s={_key:"new-"+ ++oe,id:null,name:"Fläche "+(a.length+1),kultur:null,eppoCode:null,standortId:null,color:yt[a.length%yt.length],latlngs:U.map(u=>u.slice()),params:hd(),outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(s),le(!1),n=s._key,we(s),C(s,!0)}async function Mt(){const s=m('[data-role="acker-q"]').value.trim();if(s)try{const h=await(await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+encodeURIComponent(s))).json();h[0]?_.setView([+h[0].lat,+h[0].lon],18):T.info("Nichts gefunden.")}catch{T.warning("Suche nicht verfügbar.")}}async function Xa(){if(pr){setTimeout(()=>_&&_.invalidateSize(),60);return}pr=!0;try{await Et(()=>Promise.resolve({}),__vite__mapDeps([2]));const y=await Et(()=>import("./leaflet-src.BcflbDBd.js").then(x=>x.l),__vite__mapDeps([3,4]));X=y.default||y,He=await Et(()=>import("./index.CPadEFgJ.js"),__vite__mapDeps([5,4]))}catch(y){console.warn("[Acker] Karten-Bibliotheken konnten nicht geladen werden:",y),b&&(b.textContent="Karte konnte nicht geladen werden (offline?)."),pr=!1;return}_=X.map(S,{doubleClickZoom:!1,zoomControl:!0,attributionControl:!0}).setView([47.818,8.976],17);const s=X.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:21,maxNativeZoom:19,attribution:"Tiles © Esri"}).addTo(_),u=X.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"});o={sat:s,osm:u},i=X.layerGroup(),f(),i.addTo(_),l=X.layerGroup().addTo(_),X.control.layers({Satellit:s,"Karte (OSM)":u},{"Freiland-Standorte":i},{position:"topright",collapsed:!0}).addTo(_);const h=X.Control.extend({options:{position:"topleft"},onAdd(){const y=X.DomUtil.create("div","leaflet-bar acker-toolbar");y.innerHTML='<a href="#" data-tb="fit" title="Alle Flächen anzeigen"><i class="bi bi-arrows-fullscreen"></i></a><a href="#" data-tb="labels" class="on" title="Beschriftungen ein/aus"><i class="bi bi-tag"></i></a><a href="#" data-tb="beds" class="on" title="Beete-Detail ein/aus"><i class="bi bi-grid-3x3"></i></a>',X.DomEvent.disableClickPropagation(y);const x=(H,O)=>{y.querySelector(H).addEventListener("click",ee=>{ee.preventDefault(),O()})};return x('[data-tb="fit"]',Oe),x('[data-tb="labels"]',()=>{c=!c,y.querySelector('[data-tb="labels"]').classList.toggle("on",c),ne()}),x('[data-tb="beds"]',()=>{p=!p,y.querySelector('[data-tb="beds"]').classList.toggle("on",p),ne()}),y}});_.addControl(new h),_.on("click",ie),_.on("contextmenu",y=>{if(re){X.DomEvent.preventDefault?.(y.originalEvent||y),Gt();return}v(y)}),_.on("mousemove",me),_.on("mouseup",de),document.addEventListener("mouseup",de),_.on("zoomend",pe),m('[data-role="acker-draw"]').addEventListener("click",()=>le(!0)),m('[data-role="acker-export"]')?.addEventListener("click",d),m('[data-role="acker-finish"]').addEventListener("click",Pt),m('[data-role="acker-cancel"]').addEventListener("click",()=>le(!1)),m('[data-role="acker-go"]').addEventListener("click",Mt),m('[data-role="acker-q"]').addEventListener("keydown",y=>{y.key==="Enter"&&Mt()}),document.addEventListener("keydown",y=>{re&&(y.key==="Backspace"&&(y.preventDefault(),Gt()),y.key==="Enter"&&Pt(),y.key==="Escape"&&le(!1))}),await en(),await tn(),setTimeout(()=>_.invalidateSize(),60)}async function en(){if(ue()==="sqlite")try{Nt=(await Tr())?.rows||[]}catch{Nt=[]}}async function tn(){if(ue()==="sqlite")try{((await qr())?.rows||[]).forEach(h=>{const y={_key:"db-"+h.id,id:h.id,name:h.name,kultur:h.kultur,eppoCode:h.eppoCode,standortId:h.standortId,color:h.color||yt[a.length%yt.length],latlngs:h.latlngs||[],params:{bedW:h.bedW??1.2,pathW:h.pathW??.4,rowSp:h.rowSp??.5,inRowSp:h.inRowSp??.4,angle:h.angle??0},outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};y.result=Q(y.latlngs,y.params),a.push(y),B(y)}),I();const u=a.find(h=>h.latlngs?.length);if(u&&_)try{_.fitBounds(X.polygon(u.latlngs).getBounds(),{maxZoom:19,padding:[30,30]})}catch{}}catch(s){console.warn("[Acker] Flächen laden fehlgeschlagen:",s)}}t.state.subscribe(s=>{s?.app?.activeSection==="acker"&&Xa()}),I()}function yd(){return`
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
  </section>`}function ka(e){return e.typ+":"+e.id}function wd(e){if(!Array.isArray(e)||e.length<3)return null;let t=0,a=0,n=0;const r=e.length,i=e[r-1],l=e[0],c=i&&l&&Number(i[0])===Number(l[0])&&Number(i[1])===Number(l[1])?r-1:r;for(let p=0;p<c;p++){const d=Number(e[p]?.[0]),f=Number(e[p]?.[1]);Number.isFinite(d)&&Number.isFinite(f)&&(t+=d,a+=f,n++)}return n?{lat:t/n,lon:a/n}:null}async function as(e){const t=[];(Ke(e.state.getState().gps?.points)||[]).forEach(n=>{if(n?.kind!=="gewaechshaus")return;const r=Number(n.latitude),i=Number(n.longitude),l=Number(n.nutzflaecheQm);t.push({typ:"haus",id:String(n.id),name:n.name||"Gewächshaus",areaQm:Number.isFinite(l)&&l>0?l:null,lat:Number.isFinite(r)?r:null,lon:Number.isFinite(i)?i:null,color:null})});try{((await qr())?.rows||[]).forEach(r=>{const i=wd(r.latlngs),l=Number(r.areaQm);t.push({typ:"acker",id:String(r.id),name:r.name||"Fläche",areaQm:Number.isFinite(l)&&l>0?l:null,lat:i?.lat??null,lon:i?.lon??null,color:r.color||null})})}catch{}return t}const xd="Wetterdaten: Open-Meteo (CC BY 4.0)",kd="psm.weather.";function Sd(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function Ed(e,t){return kd+e.toFixed(3)+"_"+t.toFixed(3)}function Ld(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch{return null}}function Dd(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function $d(e){return!!e&&e.slice(0,10)===Sd()}function Ad(e,t,a){const n=e?.time||[],r=e?.temperature_2m_max||[],i=e?.temperature_2m_min||[],l=e?.precipitation_sum||[],o=e?.sunshine_duration||[],c=zn(new Date),p=ci(c.year,c.week),d=new Map;for(let m=0;m<n.length;m++){const w=hs(n[m]);if(!w)continue;const{year:b,week:k}=zn(w),S=ci(b,k);let A=d.get(S);A||(A={key:S,year:b,week:k,tmaxSum:0,tmaxN:0,tminSum:0,tminN:0,precip:0,precipN:0,sun:0,sunN:0,days:0},d.set(S,A)),Number.isFinite(r[m])&&(A.tmaxSum+=r[m],A.tmaxN++),Number.isFinite(i[m])&&(A.tminSum+=i[m],A.tminN++),Number.isFinite(l[m])&&(A.precip+=l[m],A.precipN++),Number.isFinite(o[m])&&(A.sun+=o[m],A.sunN++),A.days++}const f=[...d.values()].sort((m,w)=>m.key<w.key?-1:m.key>w.key?1:0).map(m=>{const w=m.tmaxN?m.tmaxSum/m.tmaxN:null,b=m.tminN?m.tminSum/m.tminN:null;return{weekKey:m.key,year:m.year,week:m.week,tMaxAvg:w,tMinAvg:b,tMeanAvg:w!=null&&b!=null?(w+b)/2:w,precipSum:m.precipN?m.precip:null,sunHours:m.sunN?m.sun/3600:null,days:m.days,isForecast:m.key>=p}});return{lat:t,lon:a,fetchedAt:new Date().toISOString(),weeks:f}}async function zd(e,t){if(!Number.isFinite(e)||!Number.isFinite(t))return{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const a=Ed(e,t),n=Ld(a);if(n&&$d(n.fetchedAt)&&n.weeks?.length)return n;if(typeof navigator<"u"&&navigator.onLine===!1)return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const r="https://api.open-meteo.com/v1/forecast?latitude="+e.toFixed(4)+"&longitude="+t.toFixed(4)+"&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunshine_duration&timezone=Europe%2FBerlin&past_days=92&forecast_days=16";try{const i=await fetch(r);if(!i.ok)throw new Error("HTTP "+i.status);const l=await i.json(),o=Ad(l.daily,e,t);return o.weeks.length&&Dd(a,o),o}catch{return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]}}}const qn={mechanisch:{label:"Mechanisch",icon:"bi-tools",color:"#2563eb"},chemisch_psm:{label:"Pflanzenschutz",icon:"bi-droplet-half",color:"#dc2626"},duengung:{label:"Düngung",icon:"bi-flower1",color:"#b45309"},nuetzlinge:{label:"Nützlinge",icon:"bi-bug",color:"#7c3aed"},bewaesserung:{label:"Bewässerung",icon:"bi-moisture",color:"#0891b2"},monitoring:{label:"Monitoring",icon:"bi-eye",color:"#475569"},sonstiges:{label:"Sonstiges",icon:"bi-three-dots",color:"#64748b"}},Pd=["mechanisch","chemisch_psm","duengung","nuetzlinge","bewaesserung","monitoring","sonstiges"];function Qs(e){return qn[e]||qn.sonstiges}const Md={geplant:{label:"geplant",color:"#64748b"},aktiv:{label:"aktiv",color:"#16a34a"},abgeschlossen:{label:"abgeschlossen",color:"#94a3b8"}},Tt=["#16a34a","#0891b2","#7c3aed","#d97706","#dc2626","#0d9488","#65a30d","#db2777"],Cd=/^#[0-9a-fA-F]{3,8}$/;function Js(e){return typeof e=="string"&&Cd.test(e.trim())?e.trim():null}function En(e,t=0){return Js(e&&e.color)||Tt[t%Tt.length]}function at(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function Se(e){if(!e)return NaN;const t=String(e).slice(0,10).replace(/-/g,""),a=Number(t);return Number.isFinite(a)?a:NaN}function mn(e){const t=[...e||[]].sort((i,l)=>(Se(i.pflanzDatum)||0)-(Se(l.pflanzDatum)||0)),a=Number(at().replace(/-/g,""));let n=t.find(i=>i.status==="aktiv")||null;if(!n){const i=t.filter(l=>l.status!=="abgeschlossen"&&Se(l.pflanzDatum)<=a&&(!l.ernteDatum||Se(l.ernteDatum)>=a));n=i.length?i[i.length-1]:null}let r=t.filter(i=>i!==n&&i.status!=="abgeschlossen"&&Se(i.pflanzDatum)>a).sort((i,l)=>(Se(i.pflanzDatum)||0)-(Se(l.pflanzDatum)||0))[0]||null;return r||(r=t.filter(i=>i!==n&&i.status==="geplant").sort((i,l)=>(Se(i.pflanzDatum)||0)-(Se(l.pflanzDatum)||0))[0]||null),{current:n,next:r,all:t}}const Ys=["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];function Xs(e,t){const a=[];let n=e.getFullYear(),r=e.getMonth();const i=t.getFullYear(),l=t.getMonth();let o=0;for(;(n<i||n===i&&r<=l)&&o<60;)a.push({y:n,m:r}),r++,r>11&&(r=0,n++),o++;return a}function _e(e,t){if(!t||!e.length)return null;const a=new Date(String(t).slice(0,10)+"T00:00:00");if(isNaN(a.getTime()))return null;const n=e.length,r=a.getFullYear()*12+a.getMonth(),i=e[0].y*12+e[0].m,l=e[n-1].y*12+e[n-1].m;if(r<i)return 0;if(r>l)return 1;const o=r-i,c=new Date(a.getFullYear(),a.getMonth()+1,0).getDate();return(o+(a.getDate()-1)/c)/n}const Id={anzucht:{label:"Anzucht (vorziehen)",short:"Anzucht"},direkt:{label:"Direktsaat",short:"Direkt"}},Bd=["Pflanzen","m²","Beete","lfd. m","g Saatgut"];function pt(e,t){if(!e)return null;const a=new Date(String(e).slice(0,10)+"T00:00:00");return isNaN(a.getTime())?null:(a.setDate(a.getDate()+Math.round(Number(t)||0)),a.getFullYear()+"-"+String(a.getMonth()+1).padStart(2,"0")+"-"+String(a.getDate()).padStart(2,"0"))}function Nd(e,t,a){if(!e||!a)return{};const r=(e.anbauMethode==="anzucht"?"anzucht":"direkt")==="anzucht"&&Number(e.anzuchtTage)||0,i=Number(e.kulturTage)||0,l=Number(e.ernteTage)||0;let o;t==="aussaat"?o=pt(a,r):t==="ernte"?o=i?pt(a,-i):a:o=a;const c=pt(o,-r),p=i?pt(o,i):null,d=p?pt(p,l):null;return{aussaatDatum:c,pflanzDatum:o,ernteVon:p,ernteBis:d}}function Fd(e,t){return e?{aussaatDatum:pt(e.aussaatDatum,t),pflanzDatum:pt(e.pflanzDatum,t),ernteVon:pt(e.ernteVon,t),ernteBis:pt(e.ernteBis,t)}:{}}function fn(e,t){if(!t||!Array.isArray(e))return null;const a=String(t).trim().toLowerCase();return a&&(e.find(n=>String(n.name||"").trim().toLowerCase()===a)||e.find(n=>{const r=String(n.name||"").trim().toLowerCase();return r&&(r.startsWith(a)||a.startsWith(r))}))||null}const mr=66;function Td(e,t){const{units:a,anbau:n,mass:r,onSelect:i,onContext:l}=t;if(!a||!a.length){e.innerHTML='<div class="km-empty"><i class="bi bi-calendar3"></i><p>Noch keine Flächen für den Anbauplan.</p></div>';return}const o=new Date;let c=new Date(o.getFullYear(),o.getMonth()-1,1),p=new Date(o.getFullYear(),o.getMonth()+4,1);const d=F=>{if(!F)return;const ae=new Date(String(F).slice(0,10)+"T00:00:00");isNaN(ae.getTime())||(ae<c&&(c=new Date(ae.getFullYear(),ae.getMonth(),1)),ae>p&&(p=new Date(ae.getFullYear(),ae.getMonth(),1)))};(n||[]).forEach(F=>{d(F.pflanzDatum),d(F.ernteBis||F.ernteDatum),d(F.ernteVon)}),(r||[]).forEach(F=>d(F.planDatum||F.erledigtDatum));const f=Xs(c,p),m=f.length,w=m*mr,b=F=>F==null?null:(F*100).toFixed(2)+"%",k=_e(f,o.toISOString()),S=a.filter(F=>F.typ==="haus"),A=a.filter(F=>F.typ==="acker");let C="";f.forEach((F,ae)=>{const B=F.y===o.getFullYear()&&F.m===o.getMonth();C+=`<div class="kb2-mo${B?" cur":""}" style="width:${mr}px">${Ys[F.m]}${F.m===0?" "+String(F.y).slice(2):""}</div>`});const Q=F=>{const ae=(n||[]).filter(z=>z.flaecheTyp===F.typ&&String(z.flaecheId)===String(F.id)),B=(r||[]).filter(z=>z.flaecheTyp===F.typ&&String(z.flaecheId)===String(F.id));let L="";return ae.forEach((z,Z)=>{const ne=_e(f,z.pflanzDatum);let pe=_e(f,z.ernteBis||z.ernteDatum||z.pflanzDatum);if(ne==null)return;(pe==null||pe<=ne)&&(pe=Math.min(1,ne+.5/m));const he=En(z,Z),Ye=z.status==="geplant";L+=`<div class="kb2-bar${Ye?" planned":""}" title="${g(z.kultur||"Kultur")}" style="left:${b(ne)};width:${((pe-ne)*100).toFixed(2)}%;--cc:${g(he)}"><span>${g(z.kultur||"")}</span></div>`;const Oe=_e(f,z.ernteVon),we=_e(f,z.ernteBis);Oe!=null&&we!=null&&we>Oe&&(L+=`<div class="kb2-harvest" title="Ernte" style="left:${b(Oe)};width:${((we-Oe)*100).toFixed(2)}%;--cc:${g(he)}"></div>`)}),B.forEach(z=>{const Z=z.status==="erledigt"?z.erledigtDatum||z.planDatum:z.planDatum||z.erledigtDatum,ne=_e(f,Z);if(ne==null)return;const pe=Qs(z.art),he=z.status==="erledigt";L+=`<span class="kb2-mk${he?" done":""}" title="${g(pe.label+(z.notes?": "+z.notes:""))}" style="left:${b(ne)};--mc:${pe.color}"></span>`}),k!=null&&(L+=`<div class="kb2-today" style="left:${b(k)}"></div>`),L},j=F=>{const ae=F.typ+":"+F.id,B=(n||[]).filter(Z=>Z.flaecheTyp===F.typ&&String(Z.flaecheId)===String(F.id)),L=B.find(Z=>Z.status==="aktiv")||B.find(Z=>Z.status!=="abgeschlossen"),z=L?g(L.kultur||""):"frei";return`<div class="kb2-row" data-ukey="${ae}">
      <div class="kb2-label" title="${g(F.name)}"><b>${g(F.name)}</b><small>${z}</small></div>
      <div class="kb2-track" style="width:${w}px">${Q(F)}</div>
    </div>`},ge=(F,ae)=>ae.length?`<div class="kb2-grp"><div class="kb2-grp-l">${g(F)}</div><div class="kb2-grp-t" style="width:${w}px"></div></div>`+ae.map(j).join(""):"";e.innerHTML=`
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
      .kb2-track{position:relative;height:38px;border-top:1px solid var(--border-1);background-image:linear-gradient(to right,var(--border-1) 1px,transparent 1px);background-size:${mr}px 100%}
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
      <div class="kb2-head"><div class="kb2-corner">Fläche</div><div class="kb2-axis">${C}</div></div>
      ${ge("Gewächshäuser",S)}
      ${ge("Freiland",A)}
    </div>
    <div class="kb2-legend">
      <span class="lg"><span class="d" style="background:var(--text-secondary,#475569)"></span>erledigt</span>
      <span class="lg"><span class="d" style="background:var(--surface-1);box-shadow:inset 0 0 0 2px var(--text-secondary,#475569)"></span>geplant</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:#9FE1CB;display:inline-block"></span>Kultur</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:repeating-linear-gradient(45deg,#bbb,#bbb 2px,transparent 2px,transparent 4px);display:inline-block"></span>Ernte-Zeitraum</span>
      <span class="kb2-hint"><i class="bi bi-mouse2"></i> Klick = öffnen · Rechtsklick = planen</span>
    </div>`,e.querySelectorAll(".kb2-row").forEach(F=>{const ae=F.dataset.ukey;F.querySelector(".kb2-label")?.addEventListener("click",()=>i&&i(ae)),F.addEventListener("contextmenu",B=>{B.preventDefault(),l&&l(ae,B.clientX,B.clientY)})})}const qd=[{art:"bewaesserung",label:"Gießen",icon:"bi-droplet"},{art:"mechanisch",label:"Hacken",icon:"bi-tools"},{art:"duengung",label:"Düngen",icon:"bi-flower1"},{art:"nuetzlinge",label:"Nützlinge",icon:"bi-bug"},{art:"chemisch_psm",label:"Pflanzenschutz",icon:"bi-droplet-half"},{art:"monitoring",label:"Kontrolle",icon:"bi-eye"},{art:"sonstiges",label:"Sonstiges",icon:"bi-three-dots"}],Hd=["Jan.","Feb.","März","Apr.","Mai","Juni","Juli","Aug.","Sep.","Okt.","Nov.","Dez."];function Od(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=_d();let a=[],n=[],r=[],i=[],l=[],o=null,c="plan",p=!1,d=!1;const f={};let m=null;const w=v=>e.querySelector(v),b=()=>w('[data-role="list"]'),k=()=>w('[data-role="detail"]'),S=()=>w('[data-role="kpis"]'),A=()=>w('[data-role="board-view"]'),C=()=>w('[data-role="flaechen-view"]'),Q=()=>ue()==="sqlite",j=()=>{Q()&&Ze().catch(()=>{})},ge=(v,E)=>v.filter(q=>q.flaecheTyp===E.typ&&String(q.flaecheId)===String(E.id)),F=v=>a.find(E=>ka(E)===v)||null,ae=(v,E=0)=>Js(v.color)||Tt[E%Tt.length];async function B(){if(a=await as(t),Q()){try{n=(await di())?.rows||[]}catch{n=[]}try{r=(await ar())?.rows||[]}catch{r=[]}try{i=(await Tr())?.rows||[]}catch{i=[]}try{l=(await Ro())?.rows||[]}catch{l=[]}if(!d){d=!0;try{const v=await ui();v?.imported&&(r=(await ar())?.rows||[],T.info(`${v.imported} Pflanzenschutz-Eintrag(e) übernommen.`),j())}catch{}}}!o&&a.length&&(o=ka(a[0])),Z(),z()}async function L(){if(Q()){try{n=(await di())?.rows||[]}catch{}try{r=(await ar())?.rows||[]}catch{}}}async function z(){const v=o?F(o):null;if(!v||v.lat==null||v.lon==null)return;const E=ka(v);if(!f[E]){f[E]={loading:!0,weeks:[]};try{f[E]=await zd(v.lat,v.lon)}catch{f[E]={weeks:[]}}o===E&&we()}}function Z(){pe(),c==="plan"?(C().style.display="none",A().style.display="block",Td(A(),{units:a,anbau:n,mass:r,onSelect:v=>{o=v,ne("flaechen"),z()},onContext:(v,E,q)=>Qa(v,E,q)})):(A().style.display="none",C().style.display="grid",Ye(),we()),e.querySelectorAll(".km-modebtn").forEach(v=>v.classList.toggle("active",v.dataset.mode===c))}function ne(v){c=v,Z()}function pe(){const v=S();if(!v)return;a.filter(D=>D.typ==="haus").length,a.filter(D=>D.typ==="acker").length;let E=0,q=null;a.forEach(D=>{const{current:P,next:M}=mn(ge(n,D));P&&E++,M?.pflanzDatum&&(!q||Se(M.pflanzDatum)<Se(q.pflanzDatum))&&(q=M)});const I=r.filter(D=>D.status==="geplant").length;v.innerHTML=`
      ${he(String(a.length),"Flächen")}
      ${he(String(E),"Kulturen aktiv")}
      ${he(String(I),"Aufgaben offen")}
      ${he(q?ga(xe(q.pflanzDatum)):"–","Nächste Pflanzung")}
      <button class="km-psm" data-role="psm-import" title="Bestehende Pflanzenschutz-Einträge übernehmen"><i class="bi bi-arrow-down-circle"></i><span>PSM übernehmen</span></button>`,v.querySelector('[data-role="psm-import"]')?.addEventListener("click",da)}const he=(v,E)=>`<div class="km-kpi"><div class="km-kpi-v">${v}</div><div class="km-kpi-l">${g(E)}</div></div>`;function Ye(){const v=b();if(!v)return;if(!a.length){v.innerHTML='<div class="km-empty"><i class="bi bi-geo-alt"></i><p>Noch keine Flächen.<br>Gewächshäuser unter Einstellungen, Freiland im Reiter „Karte".</p></div>';return}const E=a.filter(D=>D.typ==="haus"),q=a.filter(D=>D.typ==="acker"),I=(D,P)=>P.length?`<div class="km-grp">${g(D)}</div>`+P.map(Oe).join(""):"";v.innerHTML=I("Gewächshäuser",E)+I("Freiland",q),v.querySelectorAll("[data-ukey]").forEach(D=>{D.addEventListener("click",()=>{o=D.dataset.ukey,Ye(),we(),z()}),D.addEventListener("contextmenu",P=>{P.preventDefault(),Qa(D.dataset.ukey,P.clientX,P.clientY)})})}function Oe(v,E){const q=ka(v),{current:I}=mn(ge(n,v));return`<div class="km-row${q===o?" sel":""}" data-ukey="${q}">
      <span class="km-dot" style="background:${g(I?En(I):ae(v,E))}"></span>
      <div class="km-row-main"><div class="km-row-name">${g(v.name)}</div>
      <div class="km-row-sub">${I?`<span class="crop">${g(I.kultur||"Kultur")}</span>`:'<span class="free">frei</span>'}</div></div>
    </div>`}function we(){const v=k();if(!v)return;const E=o?F(o):null;if(!E){v.innerHTML='<div class="km-empty"><i class="bi bi-hand-index"></i><p>Fläche links wählen.</p></div>';return}const q=ge(n,E),I=ge(r,E),{current:D,next:P}=mn(q),M=f[ka(E)],ce=E.typ==="haus"?"Gewächshaus":"Freiland",me=E.areaQm?`${Math.round(E.areaQm).toLocaleString("de-DE")} m²`:"";let de;if(D){const G=D.pflanzDatum?`seit ${Xe(D.pflanzDatum)} · ${ga(xe(D.pflanzDatum))}`:"",Y=Un(D);de=`<div class="km-hero active" style="--cc:${g(En(D))}">
        <div class="km-hero-ic"><i class="bi bi-flower2"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop">${g(D.kultur||"Kultur")}</div><div class="km-hero-sub">${g(G+Y+Ua(D))}</div></div>
        <button class="km-hero-edit" data-edit-crop="current" title="Bearbeiten"><i class="bi bi-pencil"></i></button>
      </div>`}else de=`<div class="km-hero empty">
        <div class="km-hero-ic gray"><i class="bi bi-circle"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop gray">Fläche ist frei</div><div class="km-hero-sub">Noch keine Kultur eingetragen</div></div>
        <button class="km-hero-add" data-edit-crop="current"><i class="bi bi-plus-lg"></i> Kultur setzen</button>
      </div>`;const J=P?`<div class="km-next"><i class="bi bi-arrow-right-short"></i>Danach geplant: <b>${g(P.kultur||"Kultur")}</b> · ab ${ga(xe(P.pflanzDatum))} <button class="km-next-edit" data-edit-crop="next" title="Bearbeiten"><i class="bi bi-pencil"></i></button></div>`:D?'<button class="km-next-add" data-edit-crop="next"><i class="bi bi-plus"></i> Nächste Kultur planen</button>':"";v.innerHTML=`
      <div class="km-head"><div class="km-head-l"><span class="km-head-name">${g(E.name)}</span><span class="km-head-badge">${ce}${me?" · "+me:""}</span></div>
        <button class="km-headbtn" data-act="map"><i class="bi bi-map"></i> Auf Karte</button></div>
      ${de}
      ${J}
      ${ca(q,I)}
      <div class="km-tasks-head"><span>Aufgaben</span><button class="km-addtask" data-act="add-massnahme"><i class="bi bi-plus-lg"></i> Aufgabe</button></div>
      ${Kt(I)}
      <div class="km-foot">
        <span class="km-weather">${Ga(M)}</span>
        <button class="km-plan" data-act="plan"><i class="bi bi-calendar3"></i> Saison &amp; Plan</button>
      </div>
      <div class="km-attr">${g(xd)}${M?.stale?" · offline":""}</div>`,v.querySelector('[data-act="map"]')?.addEventListener("click",()=>Wt()),v.querySelector('[data-act="plan"]')?.addEventListener("click",()=>ne("plan")),v.querySelector('[data-act="add-massnahme"]')?.addEventListener("click",()=>ma(E,null,D)),v.querySelectorAll("[data-edit-crop]").forEach(G=>G.addEventListener("click",()=>{const Y=G.dataset.editCrop;pa(E,Y==="current"?D:P,Y,q.length)})),v.querySelectorAll("[data-m-done]").forEach(G=>G.addEventListener("click",Y=>{Y.stopPropagation(),Va(G.dataset.mDone)})),v.querySelectorAll("[data-m-del]").forEach(G=>G.addEventListener("click",Y=>{Y.stopPropagation(),Za(G.dataset.mDel)})),v.querySelectorAll("[data-m-edit]").forEach(G=>G.addEventListener("click",()=>{const Y=r.find(re=>re.id===G.dataset.mEdit);ma(E,Y,D)}))}function Kt(v){const E=v.filter(M=>M.status==="geplant").sort((M,ce)=>(Se(M.planDatum)||9e15)-(Se(ce.planDatum)||9e15)),q=v.filter(M=>M.status==="erledigt").sort((M,ce)=>(Se(ce.erledigtDatum)||0)-(Se(M.erledigtDatum)||0)).slice(0,6),I=Number(at().replace(/-/g,"")),D=(M,ce)=>{const me=Qs(M.art),de=ce?M.erledigtDatum:M.planDatum,J=!ce&&de&&Se(de)<I,G=ce?Xe(de):ja(de,J),Y=M.notes||me.label,re=M.historyId?'<span class="km-pill">PSM</span>':"",U=[];M.notes&&U.push(g(me.label)),M.mittel&&U.push(g(M.mittel)),M.menge!=null&&U.push(`${M.menge}${M.einheit?" "+g(M.einheit):""}`);const ve=U.join(" · ");return`<div class="km-task${ce?" done":""}" data-m-edit="${M.id}">
        <span class="km-task-ic" style="--mc:${me.color}"><i class="bi ${me.icon}"></i></span>
        <div class="km-task-main"><div class="km-task-title">${g(Y)}${re}</div>${ve?`<div class="km-task-sub">${ve}</div>`:""}</div>
        <span class="km-task-when${J?" overdue":""}">${G}</span>
        ${ce?`<button class="km-tbtn del" data-m-del="${M.id}" title="Löschen"><i class="bi bi-trash"></i></button>`:`<button class="km-check" data-m-done="${M.id}" title="Erledigt"><i class="bi bi-check-lg"></i></button>`}
      </div>`};let P="";return E.length?P+=E.map(M=>D(M,!1)).join(""):P+='<div class="km-tasks-none"><i class="bi bi-check2-circle"></i> Nichts offen</div>',q.length&&(P+='<div class="km-done-h">Erledigt</div>'+q.map(M=>D(M,!0)).join("")),`<div class="km-tasks">${P}</div>`}function xe(v){const E=new Date(String(v).slice(0,10)+"T00:00:00");return isNaN(E.getTime())?0:zn(E).week}function Xe(v){const E=new Date(String(v).slice(0,10)+"T00:00:00");return isNaN(E.getTime())?"":`${E.getDate()}. ${Hd[E.getMonth()]}`}function ja(v,E){if(!v)return"offen";const q=new Date(String(v).slice(0,10)+"T00:00:00");if(isNaN(q.getTime()))return"offen";const I=new Date;I.setHours(0,0,0,0);const D=Math.round((q.getTime()-I.getTime())/864e5);return D===0?"heute":D===1?"morgen":E?"überfällig":Xe(v)}function Ga(v){if(!v||!v.weeks?.length)return v?.loading?"Wetter lädt…":"";const{year:E,week:q}=zn(new Date),I=v.weeks.find(M=>M.year===E&&M.week===q)||v.weeks.find(M=>!M.isForecast);if(!I)return"";const D=I.tMaxAvg!=null?Math.round(I.tMaxAvg)+"°":"–",P=I.precipSum!=null?Math.round(I.precipSum)+" mm":"–";return`<i class="bi bi-cloud-sun"></i> Diese Woche: ${D} · ${P} Regen`}function Un(v){const E=v.ernteVon?ga(xe(v.ernteVon)):null,q=v.ernteBis||v.ernteDatum,I=q?ga(xe(q)):null;return E&&I?` · Ernte ${E}–${I}`:I?` · Ernte ~${I}`:E?` · Ernte ab ${E}`:""}function Ua(v){return!v||v.menge==null||v.menge===""?"":` · ${v.menge} ${v.einheit||"Pflanzen"}`}function ca(v,E){if(!v.length&&!E.length)return"";const q=new Date;let I=new Date(q.getFullYear(),q.getMonth()-1,1),D=new Date(q.getFullYear(),q.getMonth()+4,1);const P=N=>{if(!N)return;const oe=new Date(String(N).slice(0,10)+"T00:00:00");isNaN(oe.getTime())||(oe<I&&(I=new Date(oe.getFullYear(),oe.getMonth(),1)),oe>D&&(D=new Date(oe.getFullYear(),oe.getMonth(),1)))};v.forEach(N=>{P(N.pflanzDatum),P(N.ernteBis||N.ernteDatum),P(N.ernteVon)}),E.forEach(N=>P(N.planDatum||N.erledigtDatum));const M=Xs(I,D),ce=M.length,me=`background-size:${(100/ce).toFixed(4)}% 100%`,de=N=>N==null?null:(N*100).toFixed(2)+"%",J=_e(M,q.toISOString()),G=J!=null?`<div class="ks-today" style="left:${de(J)}"></div>`:"",Y=M.map(N=>`<div class="ks-mo${N.y===q.getFullYear()&&N.m===q.getMonth()?" cur":""}">${Ys[N.m]}</div>`).join("");let re="";v.forEach((N,oe)=>{const Ae=_e(M,N.pflanzDatum);let le=_e(M,N.ernteBis||N.ernteDatum||N.pflanzDatum);if(Ae==null)return;(le==null||le<=Ae)&&(le=Math.min(1,Ae+.5/ce));const tt=En(N,oe);re+=`<div class="ks-bar${N.status==="geplant"?" planned":""}" style="left:${de(Ae)};width:${((le-Ae)*100).toFixed(2)}%;--cc:${g(tt)}"><span>${g(N.kultur||"")}</span></div>`;const K=_e(M,N.ernteVon),ie=_e(M,N.ernteBis);K!=null&&ie!=null&&ie>K&&(re+=`<div class="ks-harvest" style="left:${de(K)};width:${((ie-K)*100).toFixed(2)}%"></div>`)});const U={};E.forEach(N=>{(U[N.art]=U[N.art]||[]).push(N)});const ve=Pd.filter(N=>U[N]).map(N=>{const oe=qn[N],Ae=U[N].map(le=>{const tt=le.status==="erledigt"?le.erledigtDatum||le.planDatum:le.planDatum||le.erledigtDatum,K=_e(M,tt);return K==null?"":`<span class="ks-mk${le.status==="erledigt"?" done":""}" title="${g(oe.label+(le.notes?": "+le.notes:""))}" style="left:${de(K)};--mc:${oe.color}"></span>`}).join("");return`<div class="ks-row"><div class="ks-rl">${g(oe.label)}</div><div class="ks-track" style="${me}">${Ae}${G}</div></div>`}).join("");return`<div class="ks-wrap">
      <div class="ks-head"><div class="ks-rl"></div><div class="ks-axis">${Y}</div></div>
      <div class="ks-row"><div class="ks-rl">Kultur</div><div class="ks-track" style="${me}">${re}${G}</div></div>
      ${ve}
      <div class="ks-legend"><span><span class="ks-d done"></span>erledigt</span><span><span class="ks-d"></span>geplant</span><span style="margin-left:auto"><span class="ks-hbar"></span>Ernte-Zeitraum</span></div>
    </div>`}function Wt(v){Qe("app",E=>({...E,activeSection:"acker"})),T.info("Karte geöffnet.")}async function da(){if(!Q()){T.warning("Keine Datenbank aktiv.");return}try{const v=await ui();await L(),Z(),v?.imported?(T.success(`${v.imported} übernommen.`),j()):T.info(`Nichts Neues${v?.skipped?` (${v.skipped} nicht zuordenbar)`:""}.`)}catch{T.error("Übernahme fehlgeschlagen.")}}async function Va(v){const E=r.find(q=>q.id===v);if(E)try{await mi({...E,status:"erledigt",erledigtDatum:E.erledigtDatum||at()}),await L(),Z(),j()}catch{T.error("Speichern fehlgeschlagen.")}}async function Za(v){try{await pi({id:v}),await L(),Z(),j()}catch{T.error("Löschen fehlgeschlagen.")}}let $e=null;const jt=()=>{$e&&($e.remove(),$e=null,document.removeEventListener("pointerdown",ua,!0))},ua=v=>{$e&&!$e.contains(v.target)&&jt()};function Vn(v,E,q,I){if(jt(),$e=document.createElement("div"),$e.className="km-ctx",I){const P=document.createElement("div");P.className="km-ctx-t",P.textContent=I,$e.appendChild(P)}q.forEach(P=>{if(P.sep){const ce=document.createElement("div");ce.className="km-ctx-sep",$e.appendChild(ce);return}const M=document.createElement("button");M.className="km-ctx-i",M.innerHTML=`<i class="bi ${P.icon}"></i><span>${g(P.label)}</span>`,M.addEventListener("click",()=>{jt(),P.action?.()}),$e.appendChild(M)}),document.body.appendChild($e);const D=$e.getBoundingClientRect();$e.style.left=Math.max(8,Math.min(v,window.innerWidth-D.width-8))+"px",$e.style.top=Math.max(8,Math.min(E,window.innerHeight-D.height-8))+"px",setTimeout(()=>document.addEventListener("pointerdown",ua,!0),0)}function Qa(v,E,q){const I=F(v);if(!I)return;const D=ge(n,I),{current:P}=mn(D);Vn(E,q,[{icon:"bi-flower2",label:P?"Kultur bearbeiten":"Kultur setzen",action:()=>pa(I,P,"current",D.length)},{icon:"bi-plus-lg",label:"Nächste Kultur planen",action:()=>pa(I,null,"next",D.length)},{icon:"bi-list-check",label:"Aufgabe planen",action:()=>ma(I,null,P)},{sep:!0},{icon:"bi-arrow-right-circle",label:"Fläche öffnen",action:()=>{o=v,ne("flaechen"),z()}},{icon:"bi-map",label:"Auf Karte",action:()=>Wt()}],I.name)}function et(){m&&(m.remove(),m=null)}function Ja(v,E,q,I){et();const D=document.createElement("div");return D.className="kmodal-ov",D.innerHTML=`<div class="kmodal" role="dialog" aria-modal="true">
      <div class="kmodal-h"><span>${g(v)}</span><button class="kmodal-x" aria-label="Schließen"><i class="bi bi-x-lg"></i></button></div>
      <div class="kmodal-b">${E}</div>
      <div class="kmodal-f"><button class="btn-cancel" data-k="cancel">Abbrechen</button><button class="btn-save" data-k="save">${g(q)}</button></div></div>`,e.appendChild(D),m=D,D.querySelector(".kmodal-x").addEventListener("click",et),D.querySelector('[data-k="cancel"]').addEventListener("click",et),D.addEventListener("mousedown",P=>{P.target===D&&et()}),D.querySelector('[data-k="save"]').addEventListener("click",()=>{I(D)!==!1&&et()}),D.querySelectorAll("[data-more]").forEach(P=>P.addEventListener("click",()=>{const M=D.querySelector("[data-more-box]");M&&(M.hidden=!1,P.style.display="none")})),setTimeout(()=>D.querySelector("input,select,textarea,.km-tile")?.focus?.(),30),D}function Ya(){const v=new Set,E=[],q=D=>{const P=String(D||"").trim().toLowerCase();D&&!v.has(P)&&(v.add(P),E.push(D))};return l.forEach(D=>q(D.name)),i.forEach(D=>q(D.kultur)),`<datalist id="km-kultur-dl">${E.map(D=>`<option value="${g(D)}"></option>`).join("")}</datalist>`}function pa(v,E,q,I){const D=q==="next"&&!E,P=E||{},M=(P.kulturStammId?l.find(K=>K.id===P.kulturStammId):null)||fn(l,P.kultur),ce=P.pflanzDatum?.slice(0,10)||(D?"":at()),me=Tt.map(K=>`<button type="button" class="km-sw${(P.color||"")===K?" on":""}" data-col="${K}" style="background:${K}"></button>`).join(""),de=Bd.map(K=>`<option value="${g(K)}"${(P.einheit||"Pflanzen")===K?" selected":""}>${g(K)}</option>`).join(""),J=`
      <label class="km-fld big">Was wächst hier?<input list="km-kultur-dl" data-f="kultur" value="${g(P.kultur||"")}" placeholder="z. B. Tomate – aus Bibliothek wählen" autocomplete="off" /></label>${Ya()}
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
        <label class="km-fld">${D?"Geplante Pflanzung":"Pflanzung"}<input type="date" data-f="pflanz" value="${ce}" /></label>
      </div>
      <div class="km-frow2">
        <label class="km-fld">Ernte von<input type="date" data-f="ernteVon" value="${(P.ernteVon||"").slice(0,10)}" /></label>
        <label class="km-fld">Ernte bis<input type="date" data-f="ernteBis" value="${(P.ernteBis||P.ernteDatum||"").slice(0,10)}" /></label>
      </div>
      <div class="km-hint2"><i class="bi bi-info-circle"></i> Termine kommen automatisch aus der Bibliothek – jederzeit frei überschreibbar.</div>
      <div class="km-frow2">
        <label class="km-fld">Menge<input type="number" step="1" min="0" data-f="menge" value="${P.menge!=null?P.menge:""}" placeholder="optional" /></label>
        <label class="km-fld">Einheit<select data-f="einheit">${de}</select></label>
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
        <label class="km-fld">Status<select data-f="status">${["aktiv","geplant","abgeschlossen"].map(K=>`<option value="${K}"${(P.status||(D?"geplant":"aktiv"))===K?" selected":""}>${Md[K].label}</option>`).join("")}</select></label>
        <div class="km-fld">Farbe<div class="km-sws">${me}</div></div>
        <label class="km-fld">Notiz<textarea data-f="notes" rows="2" placeholder="optional">${g(P.notes||"")}</textarea></label>
      </div>
      ${E?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Satz löschen</button>':""}`,G=Ja(E?"Satz bearbeiten":D?"Nächsten Satz planen":"Satz eintragen",J,"Speichern",K=>{const ie=Ct=>K.querySelector(`[data-f="${Ct}"]`)?.value?.trim()||"",ze=ie("kultur");if(!ze)return T.warning("Bitte eine Kultur angeben."),!1;const Gt=fn(l,ze),Pt=ie("aussaat")||null,Mt=ie("pflanz")||null,Xa=ie("ernteVon")||null,en=ie("ernteBis")||null,tn=ie("menge"),s=tn?Number(tn):null,u=K.querySelector('[data-f="einheit"]')?.value||null,h=!K.querySelector("[data-more-box]").hidden;let y=h?ie("status"):"";y||(y=D||Mt&&Se(Mt)>Number(at().replace(/-/g,""))?"geplant":"aktiv");const H=K.querySelector(".km-sw.on")?.dataset.col||P.color||Gt?.color||Tt[I%Tt.length],O=i.find(Ct=>Ct.kultur===ze)?.eppoCode||Gt?.eppoCode||null,ee=h?ie("notes")||null:P.notes||null,ye={flaecheTyp:v.typ,flaecheId:v.id,kultur:ze,eppoCode:O,color:H,menge:s,einheit:u,kulturStammId:Gt?.id||P.kulturStammId||null,notes:ee},Le=!E&&K.querySelector('[data-f="succOn"]')?.checked,ke=Math.max(2,Math.min(20,Number(K.querySelector('[data-f="succN"]')?.value)||2)),ot=Math.max(1,Number(K.querySelector('[data-f="succGap"]')?.value)||14),fa=Number(at().replace(/-/g,""));(async()=>{try{if(Le){const Ct="sg-"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),It={aussaatDatum:Pt,pflanzDatum:Mt,ernteVon:Xa,ernteBis:en};for(let Ut=0;Ut<ke;Ut++){const Vt=Fd(It,Ut*ot),an=Vt.pflanzDatum&&Se(Vt.pflanzDatum)>fa?"geplant":y;await fi({...ye,...Vt,ernteDatum:null,status:an,satzGruppe:Ct})}T.success(`${ke} Sätze angelegt.`)}else await fi({id:E?.id,...ye,aussaatDatum:Pt,pflanzDatum:Mt,ernteVon:Xa,ernteBis:en,ernteDatum:null,status:y,satzGruppe:P.satzGruppe||null});await L(),Z(),j()}catch{T.error("Speichern fehlgeschlagen.")}})()});let Y="pflanz";const re=K=>G.querySelector(`[data-f="${K}"]`),U=G.querySelector("[data-anchor-row]"),ve=G.querySelector("[data-stammhint]");let N=M;const oe=()=>{if(!N){ve.hidden=!0,U.style.opacity="0.45";return}U.style.opacity="1";const ie=[Id[N.anbauMethode==="anzucht"?"anzucht":"direkt"].short];N.kulturTage&&ie.push(`${N.kulturTage} T. Kultur`),N.anbauMethode==="anzucht"&&N.anzuchtTage&&ie.push(`${N.anzuchtTage} T. Anzucht`),N.familie&&ie.push(N.familie),ve.innerHTML=`<i class="bi bi-stars"></i> <b>Bibliothek:</b> ${g(ie.join(" · "))}`,ve.hidden=!1},Ae=()=>{if(!N)return;const ie=re(Y==="ernte"?"ernteVon":Y).value||at(),ze=Nd(N,Y,ie);ze.aussaatDatum!=null&&(re("aussaat").value=ze.aussaatDatum||""),ze.pflanzDatum!=null&&(re("pflanz").value=ze.pflanzDatum||""),ze.ernteVon!=null&&(re("ernteVon").value=ze.ernteVon||""),ze.ernteBis!=null&&(re("ernteBis").value=ze.ernteBis||"")},le=re("kultur");le.addEventListener("input",()=>{N=fn(l,le.value),oe()}),le.addEventListener("change",()=>{N=fn(l,le.value),oe(),N&&(re("pflanz").value||(re("pflanz").value=at()),Ae())}),G.querySelectorAll("[data-anchor]").forEach(K=>K.addEventListener("click",()=>{G.querySelectorAll("[data-anchorseg] .km-segb").forEach(ie=>ie.classList.remove("on")),K.classList.add("on"),Y=K.dataset.anchor,Ae()})),["aussaat","pflanz","ernteVon"].forEach(K=>re(K)?.addEventListener("change",()=>{K===(Y==="ernte"?"ernteVon":Y)&&Ae()})),oe();const tt=G.querySelector('[data-f="succOn"]');tt?.addEventListener("change",()=>{G.querySelector("[data-succ-box]").hidden=!tt.checked}),G.querySelectorAll(".km-sw").forEach(K=>K.addEventListener("click",()=>{G.querySelectorAll(".km-sw").forEach(ie=>ie.classList.remove("on")),K.classList.add("on")})),G.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(E?.id)try{await Ko({id:E.id}),await L(),Z(),j(),et()}catch{T.error("Löschen fehlgeschlagen.")}})}function ma(v,E,q){const I=E||{art:"bewaesserung",status:"geplant"},D=qd.map(J=>`<button type="button" class="km-tile${(I.art||"bewaesserung")===J.art?" on":""}" data-art="${J.art}" style="--ac:${qn[J.art].color}"><i class="bi ${J.icon}"></i><span>${g(J.label)}</span></button>`).join(""),P=(I.status||"geplant")==="erledigt",M=(P?I.erledigtDatum:I.planDatum)||at(),ce=`
      <div class="km-tasktiles">${D}</div>
      <div class="km-fld">Wann?<div class="km-when" data-when>
        <button type="button" class="km-chip" data-day="0">Heute</button>
        <button type="button" class="km-chip" data-day="1">Morgen</button>
        <button type="button" class="km-chip" data-day="x">Datum…</button>
        <input type="date" data-f="datum" value="${M.slice(0,10)}" />
      </div></div>
      <div class="km-seg" data-seg>
        <button type="button" class="km-segb${P?"":" on"}" data-status="geplant"><i class="bi bi-clock"></i> Geplant</button>
        <button type="button" class="km-segb${P?" on":""}" data-status="erledigt"><i class="bi bi-check-lg"></i> Erledigt</button>
      </div>
      <button type="button" class="km-more" data-more><i class="bi bi-sliders"></i> Notiz, Menge, Mittel</button>
      <div class="km-more-box" data-more-box hidden>
        <label class="km-fld">Bezeichnung<input data-f="notes" value="${g(I.notes||"")}" placeholder="z. B. Kompostgabe" /></label>
        <div class="km-frow2">
          <label class="km-fld">Menge<input type="number" step="0.1" data-f="menge" value="${I.menge!=null?I.menge:""}" placeholder="optional" /></label>
          <label class="km-fld">Einheit<input data-f="einheit" value="${g(I.einheit||"")}" placeholder="kg/ha, l" /></label>
        </div>
        <label class="km-fld">Mittel<input data-f="mittel" value="${g(I.mittel||"")}" placeholder="optional" /></label>
      </div>
      ${E?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Aufgabe löschen</button>':""}`,me=Ja(E?"Aufgabe bearbeiten":"Aufgabe hinzufügen",ce,"Speichern",J=>{const G=J.querySelector(".km-tile.on")?.dataset.art||"bewaesserung",Y=J.querySelector(".km-segb.on")?.dataset.status||"geplant",re=J.querySelector('[data-f="datum"]').value||at(),U=!J.querySelector("[data-more-box]").hidden,ve=oe=>{const Ae=J.querySelector(`[data-f="${oe}"]`)?.value;return Ae?Number(Ae):null},N=oe=>J.querySelector(`[data-f="${oe}"]`)?.value.trim()||null;(async()=>{try{await mi({id:E?.id,flaecheTyp:v.typ,flaecheId:v.id,anbauId:E?.anbauId||q?.id||null,art:G,status:Y,planDatum:Y==="geplant"?re:E?.planDatum||null,erledigtDatum:Y==="erledigt"?re:null,menge:U?ve("menge"):E?.menge??null,einheit:U?N("einheit"):E?.einheit||null,mittel:U?N("mittel"):E?.mittel||null,historyId:E?.historyId||null,notes:U?N("notes"):E?.notes||null}),await L(),Z(),j()}catch{T.error("Speichern fehlgeschlagen.")}})()});me.querySelectorAll(".km-tile").forEach(J=>J.addEventListener("click",()=>{me.querySelectorAll(".km-tile").forEach(G=>G.classList.remove("on")),J.classList.add("on")})),me.querySelectorAll(".km-segb").forEach(J=>J.addEventListener("click",()=>{me.querySelectorAll(".km-segb").forEach(G=>G.classList.remove("on")),J.classList.add("on")}));const de=me.querySelector('[data-f="datum"]');me.querySelectorAll("[data-day]").forEach(J=>J.addEventListener("click",()=>{const G=J.dataset.day;if(G==="x"){de.style.display="inline-block",de.showPicker?.();return}const Y=new Date;Y.setDate(Y.getDate()+Number(G)),de.value=Y.toISOString().slice(0,10),de.style.display="none"})),me.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(E?.id)try{await pi({id:E.id}),await L(),Z(),j(),et()}catch{T.error("Löschen fehlgeschlagen.")}})}e.querySelectorAll(".km-modebtn").forEach(v=>v.addEventListener("click",()=>ne(v.dataset.mode))),document.addEventListener("keydown",v=>{v.key==="Escape"&&(m&&et(),jt())}),window.addEventListener("psm:openKultur",v=>{const E=v?.detail;!E?.typ||!E?.id||(o=E.typ+":"+E.id,ne("flaechen"),p&&(Ye(),we(),z()))}),t.state.subscribe(v=>{v?.app?.activeSection==="kultur"&&(p?(async()=>(a=await as(t),Z(),z()))():(p=!0,B()))}),pe()}function _d(){return`
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
  </section>`}const Rd=["pflanzenschutz.json","history.json","entries.json"];let ns=!1,R=null,ht=!1;const _t=25,fr=new Intl.NumberFormat("de-DE");let Ee=0,gn=null,rs=null;const Kd=Cs({id:"import",label:"Import-Vorschau",budget:{initialLoad:20,maxItems:50}});let Nr=null;function Wd(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function jd(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Gd(e,t){const a=e.querySelector('[data-role="import-log-list"]');if(a){if(!t.length){a.innerHTML='<tr><td colspan="5" class="text-muted small">Noch keine Importe protokolliert.</td></tr>';return}a.innerHTML=t.map(n=>{const r=n.rangeStart||n.rangeEnd?`${Ia(n.rangeStart)||n.rangeStart||"?"} – ${Ia(n.rangeEnd)||n.rangeEnd||"?"}`:"-",i=[n.source,n.device].filter(Boolean),l=i.length?g(i.join(" · ")):"-";return`
        <tr>
          <td>${g(jd(n.importedAt))}</td>
          <td>${l}</td>
          <td class="text-end text-success">${n.added}</td>
          <td class="text-end text-muted">${n.skipped}</td>
          <td class="small text-muted">${g(r)}</td>
        </tr>`}).join("")}}async function Ln(e){if(ue()==="sqlite")try{const t=await Wo(50);Gd(e,t.items||[])}catch(t){console.warn("Import-Historie konnte nicht geladen werden",t)}}function vt(e,t,a="info"){const n=e.querySelector('[data-role="import-hint"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a} small mt-3`,n.textContent=t}}function qt(e,t){const a=e.querySelector('[data-role="import-feedback"]');a&&(a.textContent=t)}function $t(e){const t=e.querySelector('[data-action="clear-import"]'),a=e.querySelector('[data-action="focus-import"]'),n=e.querySelector('[data-action="run-import"]'),r=!!R;if(t&&(t.disabled=!r||ht),a&&(a.disabled=!r||ht),n){const i=!!(R?.importableEntries?.length&&R.stats||R?.fotos?.length);n.disabled=!r||!i||ht}}function Ud(e){R=null,au(e);const t=e.querySelector('[data-role="import-summary-card"]'),a=e.querySelector('[data-role="import-file"]');t&&t.classList.add("d-none"),a&&(a.value=""),qt(e,""),vt(e,"Bereit für eine neue Importdatei."),$t(e),Xt()}function eo(e){if(e.dateIso)return e.dateIso;if(e.datum){const t=new Date(e.datum);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.date){const t=new Date(e.date);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.savedAt){const t=new Date(e.savedAt);if(!Number.isNaN(t.getTime()))return t.toISOString()}return null}function Hn(e){return e?Ia(e)||e.slice(0,10):"-"}function to(e){return e.savedAt||(e.savedAt=e.createdAt||e.dateIso||new Date().toISOString()),e}function is(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function Vd(e){if(!e||typeof e!="object")return null;const t={...e};if(!Array.isArray(t.items)){const a=e.items;t.items=Array.isArray(a)?[...a]:[]}return to(t),t}function ao(e,t){const a=e.map(n=>eo(n)).filter(n=>!!n).sort();return{startIso:a[0]||t?.filters?.startDate||null,endIso:a[a.length-1]||t?.filters?.endDate||null}}function Zd(e){if(!e)return;const t=is(e.startIso,"start"),a=is(e.endIso,"end");if(!t&&!a)return;const n={};return t&&(n.startDate=t),a&&(n.endDate=a),n}async function no(e,t){if(ue()!=="sqlite"){const o=Ke(e.history);return new Set(o.map(c=>On(c)).filter(c=>!!c))}const n=Zd(t);if(!n)return new Set;const r=new Set;let i=1;const l=500;try{for(;;){const o=await xs({page:i,pageSize:l,filters:n,sortDirection:"asc"});if(o.items.forEach(c=>{const p=On(c);p&&r.add(p)}),i*l>=o.totalCount)break;i+=1}}catch(o){return console.warn("Konnte vorhandene Einträge für Duplikatprüfung nicht laden",o),new Set}return r}function On(e){const t=typeof e.clientUuid=="string"&&e.clientUuid?e.clientUuid:"";if(t)return`uuid:${t}`;const a=e.savedAt||e.dateIso||e.createdAt||e.datum||"",n=e.ersteller||"",r=e.kultur||"",i=e.invekos||e.standort||"";return[a,n,r,i].join("|")}function Qd(e,t,a,n){const r=n||ao(e,a),i=r.startIso,l=r.endIso,o=new Set,c=new Set;return t.forEach(p=>{p.ersteller&&o.add(p.ersteller),p.kultur&&c.add(p.kultur)}),{startDateLabel:Hn(i),endDateLabel:Hn(l),startDateRaw:i,endDateRaw:l,entryCount:e.length,importableCount:t.length,duplicateCount:e.length-t.length,creators:Array.from(o).slice(0,5),crops:Array.from(c).slice(0,5)}}function Jd(e,t){const a=e.querySelector('[data-role="import-stats"]');if(!a)return;if(!t){a.innerHTML="";return}const n=t.stats,r=t.metadata?.filters;a.innerHTML=`
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
  `}function Yd(e,t){const a=e.querySelector('[data-role="import-warnings"]');if(!a)return;if(!t||!t.warnings.length){a.innerHTML="";return}const n=t.warnings.map(r=>`<li>${g(r)}</li>`).join("");a.innerHTML=`
    <div class="alert alert-warning">
      <strong>Hinweise:</strong>
      <ul class="mb-0">${n}</ul>
    </div>
  `}function ro(e){const t=e.entries.length;if(!t)return Ee=0,{start:0,end:0,total:0};const a=Math.max(Math.ceil(t/_t),1);Ee>=a&&(Ee=a-1),Ee<0&&(Ee=0);const n=Ee*_t,r=Math.min(n+_t,t);return{start:n,end:r,total:t}}function Xd(e){const t=e.querySelector('[data-role="import-pager"]');return t?((!gn||rs!==t)&&(gn?.destroy(),gn=Ra(t,{onPrev:()=>eu(e),onNext:()=>tu(e),labels:{prev:"Zurück",next:"Weiter",loading:"Vorschau wird geladen...",empty:"Keine Einträge verfügbar"}}),rs=t),gn):null}function Ca(e,t){const a=Xd(e);if(!a)return;if(!t){Ee=0,a.update({status:"hidden"});return}const n=t.entries.length;if(!n){Ee=0,a.update({status:"disabled",info:"Keine Einträge vorhanden."});return}const{start:r,end:i}=ro(t),l=`Einträge ${fr.format(r+1)}–${fr.format(i)} von ${fr.format(n)}`;a.update({status:"ready",info:l,canPrev:Ee>0,canNext:i<n})}function eu(e){!R||Ee===0||(Ee=Math.max(Ee-1,0),ai(e,R))}function tu(e){if(!R)return;const t=R.entries.length;if(!t)return;const a=Math.max(Math.ceil(t/_t)-1,0);Ee>=a||(Ee=Math.min(Ee+1,a),ai(e,R))}function au(e){Ee=0,e&&Ca(e,R)}function ai(e,t){const a=e.querySelector('[data-role="import-preview-table"]');if(!a){Xt();return}if(!t){a.innerHTML="",Ca(e,null),Xt();return}if(!t.entries.length){a.innerHTML='<tr><td colspan="5" class="text-center text-muted">Keine Einträge</td></tr>',Ca(e,t),Xt();return}const{start:r,end:i}=ro(t),o=t.entries.slice(r,i).map(c=>{const p=Hn(eo(c));return`
        <tr>
          <td>${g(p)}</td>
          <td>${g(c.kultur||"-")}</td>
          <td>${g(c.ersteller||"-")}</td>
          <td>${g(c.standort||c.invekos||"-")}</td>
          <td>${g(c.savedAt?Hn(c.savedAt):"-")}</td>
        </tr>
      `}).join("");a.innerHTML=o,Ca(e,t),Xt()}async function nu(e){const t=Uo(e),a=Object.keys(t),n=a.find(p=>Rd.some(d=>p.toLowerCase().endsWith(d)));if(!n)throw new Error("ZIP enthält keine 'pflanzenschutz.json'.");const r=JSON.parse(gr(t[n])),i=a.find(p=>p.toLowerCase().endsWith("metadata.json")),l=i?JSON.parse(gr(t[i])):null,o=Array.isArray(r)?r:Array.isArray(r.entries)?r.entries:Array.isArray(r.history)?r.history:[],c=Array.isArray(r?.fotos)?r.fotos:[];for(const p of c){if(p?.data)continue;const d=p?.file?String(p.file):null,f=d?a.find(m=>m===d||m.toLowerCase().endsWith(d.toLowerCase())):null;f&&t[f]&&(p.data=ru(t[f]),p.mime||(p.mime="image/jpeg"))}return{entries:o,metadata:l,fotos:c}}function ru(e){let t="";for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode(...e.subarray(n,n+32768));return btoa(t)}async function iu(e){const t=gr(e),a=JSON.parse(t);if(Array.isArray(a))return{entries:a,metadata:null,fotos:[]};const n=Array.isArray(a.fotos)?a.fotos:[];if(Array.isArray(a.entries))return{entries:a.entries,metadata:a.metadata||null,fotos:n};if(Array.isArray(a.history))return{entries:a.history,metadata:a.metadata||null,fotos:n};if(n.length)return{entries:[],metadata:a.metadata||null,fotos:n};throw new Error("JSON enthält keine Eintragsliste.")}async function su(e,t){const a=new Uint8Array(await e.arrayBuffer()),n=/\.zip$/i.test(e.name)||e.type==="application/zip",{entries:r,metadata:i,fotos:l}=n?await nu(a):await iu(a),o=Array.isArray(l)?l:[],c=(Array.isArray(r)?r:[]).map(S=>Vd(S)).filter(S=>!!S);if(!c.length&&!o.length)throw new Error("Die Datei enthielt keine verwertbaren Einträge.");const p=ao(c,i),d=await no(t,p),f=new Set,m=[];let w=0;c.forEach(S=>{const A=On(S);if(!A){m.push(S);return}if(d.has(A)||f.has(A)){w+=1;return}f.add(A),m.push(S)});const b=Qd(c,m,i,p),k=[];return w&&k.push(`${w} Datensätze wurden wegen gleicher Kennung übersprungen.`),(!b.startDateRaw||!b.endDateRaw)&&k.push("Zeitraum konnte nicht eindeutig ermittelt werden."),{filename:e.name,entries:c,importableEntries:m,metadata:i,stats:b,warnings:k,lastImportRefs:[],fotos:o}}function ss(){if(!R)return"Keine Datei";const e=[];return ht&&e.push("Verarbeitung"),R.warnings.length&&e.push("Warnungen"),R.stats.importableCount<R.stats.entryCount&&e.push("Duplikate entfernt"),e.length?e.join(" · "):void 0}function ou(){const e=!!R,t=e?Math.max(Math.ceil((R?.entries.length||0)/_t),1):null,a=e?{items:R?.entries.length??0,totalCount:R?.stats.entryCount??null,cursor:R&&(R.entries.length||0)>_t?`Seite ${Ee+1}${t?` / ${t}`:""}`:null,payloadKb:Bs(R?.entries.slice(0,_t)),lastUpdated:Nr,note:ss()}:{items:0,totalCount:0,cursor:null,payloadKb:0,lastUpdated:Nr,note:ss()};Is(Kd,a)}function Xt(){Nr=new Date().toISOString(),ou()}function Fr(e){const t=e.querySelector('[data-role="import-summary-card"]');if(!t)return;if(!R){t.classList.add("d-none"),Ca(e,null),$t(e),Xt();return}t.classList.remove("d-none"),Ee=0;const a=t.querySelector('[data-role="import-file-name"]'),n=t.querySelector('[data-role="import-summary-subline"]');a&&(a.textContent=R.filename),n&&(n.textContent=`${R.stats.importableCount} von ${R.stats.entryCount} Einträgen importierbar`),Jd(e,R),Yd(e,R),ai(e,R),$t(e)}async function lu(){const e=ue();if(!e||e==="memory"||e==="sqlite")return;const t=Ge();await Ue(t)}function os(e,t){if(!t.length)return[];const a=typeof e.state.updateSlice=="function"?e.state.updateSlice:Qe,n=[];return a("history",r=>{const i=Oa(r),l=i.items.slice(),o=l.length;return t.forEach((c,p)=>{n.push(o+p),l.push(c)}),{...i,items:l,totalCount:l.length,lastUpdatedAt:new Date().toISOString()}}),n}async function cu(e,t){if(!R){window.alert("Bitte zuerst eine Importdatei laden.");return}const a=R.fotos||[];if(!R.importableEntries.length&&!a.length){window.alert("Alle Einträge wurden bereits importiert oder als Duplikat erkannt.");return}ht=!0,$t(e),qt(e,"Import läuft ...");const n=t.state.getState(),r={startIso:R.stats.startDateRaw,endIso:R.stats.endDateRaw};let i=new Set;try{i=await no(n,r)}catch(k){console.warn("Duplikatprüfung vor Import fehlgeschlagen",k)}const l=new Set(i),o=[];let c=0;if(R.importableEntries.forEach(k=>{const S=On(k);if(S&&l.has(S)){c+=1;return}S&&l.add(S),o.push(k)}),!o.length&&!a.length){qt(e,"Keine neuen Einträge gefunden."),vt(e,"Alle Datensätze sind bereits importiert worden.","warning"),ht=!1,$t(e);return}const p=ue(),d=[],f=[];let m=0,w=0;const b=o.map(k=>to({...k}));try{if(p==="sqlite"){const C=[];for(const Q of b)try{const j=await ds(Q);if(j?.duplicate){c+=1;continue}j?.id!=null&&(d.push({source:"sqlite",ref:j.id}),C.push(Q))}catch(j){console.error("appendHistoryEntry failed",j),f.push(Q.savedAt||"Unbekannter Eintrag")}os(t,C);for(const Q of a)try{(await jo(Q))?.duplicate?w+=1:m+=1}catch(j){console.error("appendFoto failed",j)}m&&window.dispatchEvent(new CustomEvent("fotos:changed"));try{await Ze()}catch(Q){console.warn("SQLite-Datei konnte nach dem Import nicht gespeichert werden",Q)}}else os(t,b).forEach(Q=>{d.push({source:"state",ref:Q})}),await lu();const k=d.length;if(k||m){p==="sqlite"&&k&&t.events?.emit?.("history:data-changed",{type:"created-bulk",count:k});const C=[];k&&C.push(`${k} Einträge`),m&&C.push(`${m} Foto(s)`),qt(e,`${C.join(" und ")} importiert.${f.length?` ${f.length} Einträge konnten nicht übernommen werden.`:""}`.trim()),R.lastImportRefs=d,R.importableEntries=[],R.stats={...R.stats,importableCount:0},Fr(e)}else qt(e,"Keine neuen Daten importiert.");const S=[];let A="success";if(f.length&&(S.push(`${f.length} Einträge konnten nicht gespeichert werden. Details siehe Konsole.`),A="warning"),c&&(S.push(`${c} Einträge wurden während des Imports als Duplikat übersprungen.`),A="warning"),w&&S.push(`${w} Foto(s) waren bereits vorhanden (übersprungen).`),S.length||S.push("Import abgeschlossen."),vt(e,S.join(" "),A),p==="sqlite"&&(k||c||m||w))try{const C=[];f.length&&C.push(`${f.length} fehlgeschlagen`),m&&C.push(`${m} Fotos`),w&&C.push(`${w} Fotos doppelt`),await Go({source:R.filename||null,device:R.metadata?.device||R.metadata?.label||null,added:k,skipped:c,rangeStart:R.stats.startDateRaw,rangeEnd:R.stats.endDateRaw,note:C.length?C.join(", "):null}),await Ze().catch(()=>{}),await Ln(e)}catch(C){console.warn("Import-Historie konnte nicht geschrieben werden",C)}}catch(k){console.error("Import fehlgeschlagen",k),qt(e,"Import fehlgeschlagen. Siehe Konsole für Details."),vt(e,"Import fehlgeschlagen. Bitte erneut versuchen.","danger")}finally{ht=!1,$t(e)}}function du(e,t,a){if(!e.events?.emit)return;const n=t.metadata?.label||t.metadata?.filters?.label||`Import ${t.filename}`;e.events.emit("documentation:focus-range",{startDate:t.stats.startDateRaw||void 0,endDate:t.stats.endDateRaw||void 0,label:n,reason:"import",entryIds:a,autoSelectFirst:!!a.length})}function uu(e,t){if(!R){window.alert("Bitte zuerst eine Importdatei laden.");return}if(!R.stats.startDateRaw||!R.stats.endDateRaw){window.alert("Zeitraum konnte nicht bestimmt werden.");return}du(t,R,R.lastImportRefs),vt(e,"Dokumentation wurde auf den Importzeitraum fokussiert.")}function pu(e,t){const a=e.querySelector('[data-role="import-file"]');a&&a.addEventListener("change",()=>{const n=a.files?.[0];n&&(ht=!0,vt(e,"Datei wird analysiert ..."),$t(e),qt(e,""),su(n,t.state.getState()).then(r=>{R=r,Fr(e),vt(e,`${r.importableEntries.length} Einträge bereit zum Import.`)}).catch(r=>{console.error("Importdatei konnte nicht gelesen werden",r),vt(e,r?.message||"Importdatei konnte nicht gelesen werden.","danger"),R=null,Fr(e)}).finally(()=>{ht=!1,$t(e)}))}),e.addEventListener("click",n=>{const r=n.target?.closest("[data-action]");if(!r)return;const i=r.dataset.action;if(i){if(i==="clear-import"){Ud(e);return}if(i==="focus-import"){uu(e,t);return}i==="run-import"&&cu(e,t)}})}function mu(e,t){if(!e||ns)return;const a=e;a.innerHTML="";const n=Wd();a.appendChild(n),pu(n,t),vt(n,"Wähle eine Datei aus, um den Import zu starten."),Ln(n),it("database:connected",()=>void Ln(n)),it("app:sectionChanged",r=>{(r==="daten"||r==="documentation"||r==="import")&&Ln(n)}),ns=!0}const Ft=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function fu(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function Qt(e,t,a,n){return`
    <div class="dash-card"${n?` data-goto="${n}" style="cursor:pointer;"`:""}>
      <div class="dash-card-ic"><i class="bi ${e}"></i></div>
      <div class="dash-card-body"><div class="dash-card-value">${a}</div><div class="dash-card-label">${g(t)}</div></div>
    </div>`}function gu(){return`
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
  </section>`}function bu(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=gu();const a=e.querySelector('[data-role="dash-cards"]'),n=e.querySelector('[data-role="dash-warn"]'),r=e.querySelector('[data-role="dash-recent"]');e.addEventListener("click",l=>{const o=l.target?.closest("[data-goto]");if(!o)return;const c=o.getAttribute("data-goto");c&&t.state.updateSlice("app",p=>({...p,activeSection:c}))});const i=async()=>{if(ue()!=="sqlite"){a&&(a.innerHTML='<div class="dash-empty">Bitte zuerst eine Datenbank öffnen.</div>');return}const l=t.state.getState(),o=(Ke(l.gps?.points)||[]).length;let c=0,p=0,d=0,f=0,m=[],w=[],b=0;try{c=(await Tr())?.rows?.length||0}catch{}try{p=(await ws())?.rows?.length||0}catch{}try{const k=(await qr())?.rows||[];d=k.length,f=k.reduce((S,A)=>S+(A.plants||0),0)}catch{}try{m=(await ys())?.rows||[]}catch{}try{const k=await xs({}),S=k?.entries||k?.rows||[];b=k?.totalCount??S.length,w=S.slice(0,6)}catch{}if(a&&(a.innerHTML=[Qt("bi-geo-alt","Standorte",Ft(o)),Qt("bi-flower1","Kulturen",Ft(c)),Qt("bi-droplet","Mittel im Sortiment",Ft(p),"lager"),Qt("bi-journal-check","Anwendungen",Ft(b),"documentation"),Qt("bi-map","Acker-Flächen",Ft(d),"acker"),Qt("bi-flower3","Pflanzen (Acker)",Ft(f),"acker")].join("")),n){const k=[];m.forEach(A=>{A.bestand<=0&&(A.verbraucht>0||A.zugang>0)&&k.push(`<div class="dash-row"><span><i class="bi bi-box-seam me-1" style="color:#ef4444"></i>${g(A.name)}</span><span style="color:#ef4444">Bestand ${Ft(A.bestand)} ${g(A.einheit||"")}</span></div>`)}),m.forEach(A=>{if(!A.zulEnde)return;const C=Math.round((new Date(A.zulEnde).getTime()-Date.now())/864e5);C<0?k.push(`<div class="dash-row"><span><i class="bi bi-calendar-x me-1" style="color:#ef4444"></i>${g(A.name)}</span><span style="color:#ef4444">Zulassung abgelaufen</span></div>`):C<180&&k.push(`<div class="dash-row"><span><i class="bi bi-calendar-event me-1" style="color:#f59e0b"></i>${g(A.name)}</span><span style="color:#f59e0b">Zulassung endet in ${C} T</span></div>`)});const S=k.length>6?`<div class="dash-row" style="color:var(--color-text-muted)"><span>+ ${k.length-6} weitere</span></div>`:"";n.innerHTML=k.length?k.slice(0,6).join("")+S:'<div class="dash-empty">Alles im grünen Bereich. ✓</div>'}r&&(r.innerHTML=w.length?w.map(k=>{const S=fu(k.datum||k.dateIso||k.created_at||k.createdAt||null),A=k.kultur||"",C=k.standort||"";return`<div class="dash-row"><span>${g(C)}${A?" · "+g(A):""}</span><span class="dash-empty" style="padding:0">${g(S)}</span></div>`}).join(""):'<div class="dash-empty">Noch keine Anwendungen erfasst.</div>')};t.state.subscribe(l=>{l?.app?.activeSection==="dashboard"&&i()}),i()}function ls(e){document.querySelectorAll(".content-section").forEach(a=>{a.style.display="none"});const t=document.getElementById(`section-${e}`);t instanceof HTMLElement&&(t.style.display="block")}function cs(){Vo(),ps();const e={state:{getState:W,updateSlice:Qe,subscribe:$n},events:{emit:(S,A)=>{Et(async()=>{const{emit:C}=await import("./index.B4FIlGfT.js").then(Q=>Q.aS);return{emit:C}},[]).then(({emit:C})=>{C(S,A)})},subscribe:it}},t=document.querySelector('[data-region="startup"]'),a=document.querySelector('[data-region="shell"]'),n=document.querySelector('[data-region="main"]'),r=document.querySelector('[data-region="footer"]');Ll(t,e);const i=document.querySelector('[data-feature="calculation"]');Zo(i,e);const l=document.querySelector('[data-feature="documentation"]');xc(l,e);const o=document.querySelector('[data-feature="settings"]');md(o,e);const c=document.querySelector('[data-feature="lager"]');bd(c,e);const p=document.querySelector('[data-feature="acker"]');vd(p,e);const d=document.querySelector('[data-feature="kultur"]');Od(d,e);const f=document.querySelector('[data-feature="fotos"]');Qo(f,e,{archiveMode:!0});const m=document.querySelector('[data-feature="import-page"]');mu(m,{state:{getState:W,updateSlice:Qe},events:e.events});const w=document.querySelector('[data-feature="dashboard"]');bu(w,e);const b=S=>{const A=document.body;A&&(A.classList.toggle("bg-app",S),A.classList.toggle("bg-startup",!S))},k=S=>{const A=!!S.app?.hasDatabase;if(b(A),t instanceof HTMLElement&&t.classList.toggle("d-none",A),a instanceof HTMLElement&&a.classList.toggle("d-none",!A),n instanceof HTMLElement&&n.classList.toggle("d-none",!A),r instanceof HTMLElement&&r.classList.toggle("d-none",!A),A){const C=S.app?.activeSection??"dashboard";ls(C)}};k(e.state.getState()),$n((S,A)=>{S.app?.hasDatabase!==A.app?.hasDatabase&&k(S),S.app?.activeSection!==A.app?.activeSection&&S.app?.hasDatabase&&ls(S.app.activeSection)}),it("app:sectionChanged",()=>{})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",cs,{once:!0}):cs();
