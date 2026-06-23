const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/index.D8SAyDFT.js","_astro/index.Jw5NaxwS.js","_astro/leaflet.C03ySvDx.css","_astro/leaflet-src.BcflbDBd.js","_astro/_commonjsHelpers.Cpj98o6Y.js","_astro/index.CPadEFgJ.js"])))=>i.map(i=>d[i]);
import{M as le,N as Vi,J as Oe,O as Us,P as Vs,Q as Zi,h as ct,l as Zs,a as Qi,s as Ve,n as Qs,q as Ji,p as Rr,e as K,r as an,C as nn,u as Ke,_ as mt,R as Js,S as Ys,w as g,t as C,m as Wr,T as Xs,j as Ta,k as jr,U as eo,V as to,W as Be,X as ao,Y as Yi,Z as Xi,H as es,G as rn,$ as no,a0 as ro,a1 as io,a2 as so,a3 as oo,a4 as Da,z as va,a5 as lo,x as co,a6 as qe,a7 as He,a8 as uo,a9 as $a,aa as po,ab as mo,D as fo,ac as ts,ad as as,ae as ya,af as go,ag as bo,ah as ho,ai as Gr,aj as Cn,ak as Mn,al as vo,am as yo,an as wo,ao as ko,ap as xo,aq as So,ar as Eo,as as ns,at as Lo,au as rs,av as Do,aw as gr,ax as br,ay as $o,az as Ao,aA as Nt,aB as wa,aC as Po,aD as Ur,aE as In,aF as Vr,aG as Yt,aH as Co,aI as Zr,aJ as Qr,aK as Mo,aL as Io,aM as zo,aN as Bo,aO as No,aP as jn,v as is,i as Fo,b as To,c as qo}from"./index.Jw5NaxwS.js";const Gn="__psl_history_seeded",Un=200,Jr=["Salat","Apfel","Wein","Tomate","Kartoffel","Hopfen","Raps","Birne"],Yr=["Spritzung","Düngung","Pflege","Behandlung"],Xr=["LACES","MALDO","VITVI","SOLTU","PRNUS","CUPAR","CYNCR","ALLCE"],ei=["BBCH 10","BBCH 31","BBCH 41","BBCH 55","BBCH 65","BBCH 71","BBCH 81"],Ho=[{mediumId:"seed-water",name:"Wasser",unit:"L",methodId:"perKiste",methodLabel:"pro Kiste",value:.02,zulassungsnummer:"N/A"},{mediumId:"seed-tonikum",name:"Tonikum X",unit:"ml",methodId:"perKiste",methodLabel:"pro Kiste",value:.85,zulassungsnummer:"Z-123456"},{mediumId:"seed-oel",name:"Pflegeöl Y",unit:"ml",methodId:"percentWater",methodLabel:"% vom Wasser",value:.12,zulassungsnummer:"Z-654321"}];function _o(e){if(typeof window>"u")return;const a=new URLSearchParams(window.location.search).has("seedHistory");if(!a)return;const n=window;n.__PSL||(n.__PSL={});const r=n.__PSL;r.seedHistoryEntries=(s=Un)=>ti(e,{count:s}),r.resetHistorySeedFlag=()=>localStorage.removeItem(Gn),!a&&!localStorage.getItem(Gn)&&le()==="sqlite"&&ti(e,{count:Un,setFlag:!0}).catch(s=>{console.error("History seeding failed",s)})}async function Oo(e){if(!e.state.getState().app?.hasDatabase){if(typeof e.state.subscribe!="function")throw new Error("SQLite-Datenbank ist noch nicht initialisiert.");await new Promise((t,a)=>{const n=window.setTimeout(()=>{i(),a(new Error("SQLite-Datenbank wurde nicht rechtzeitig initialisiert."))},1e4),r=e.state.subscribe?.(s=>{s.app?.hasDatabase&&(i(),t())}),i=()=>{window.clearTimeout(n),typeof r=="function"&&r()}})}}async function ti(e,t={}){const a=t.count??Un;if(le()!=="sqlite")throw new Error("SQLite-Treiber muss aktiv sein, bevor Daten befüllt werden können.");await Oo(e);const n=performance.now();let r=0;for(let i=0;i<a;i+=1){const s=Ko(i);await Vi(s),r+=1}try{await Oe()}catch(i){console.warn("Seed-Daten konnten nicht persistent gespeichert werden",i)}return e.events.emit("history:data-changed",{source:"dev-history-seed"}),t.setFlag&&localStorage.setItem(Gn,"1"),{inserted:r,durationMs:performance.now()-n}}function Ko(e){const t=new Date;t.setDate(t.getDate()-e);const a=t.toLocaleDateString("de-DE"),n=t.toISOString(),r=20+e%30,i=Number((r*.5).toFixed(2));return{datum:a,dateIso:n,ersteller:`Seeder ${1+e%5}`,standort:`Test-Ort ${String.fromCharCode(65+e%6)}`,kultur:Jr[e%Jr.length],usageType:Yr[e%Yr.length],kisten:r,eppoCode:Xr[e%Xr.length],bbch:ei[e%ei.length],gps:`GPS-Notiz ${e}`,gpsCoordinates:{latitude:48+e%10*.01,longitude:11+e%10*.01},gpsPointId:`seed-gps-${e}`,invekos:`INV-${String(1e3+e).padStart(4,"0")}`,uhrzeit:`${String(6+e%12).padStart(2,"0")}:${String(e*7%60).padStart(2,"0")}`,savedAt:n,items:Ro(e,r,i)}}function Ro(e,t,a){return Ho.map((n,r)=>{const i=1+(e+r)%4*.05,s=Number((n.value*i).toFixed(4)),l=Number((s*t).toFixed(2));return{id:`seed-item-${e}-${r}`,name:n.name,unit:n.unit,methodLabel:n.methodLabel,methodId:n.methodId,value:s,total:l,inputs:{kisten:t,waterVolume:a},zulassungsnummer:n.zulassungsnummer,mediumId:n.mediumId}})}let Dt=null,Xt=null,ai=!1,ni=!1;async function Wo(){if(!("serviceWorker"in navigator))return console.warn("[PWA] Service Workers nicht unterstützt"),null;try{return Xt=await navigator.serviceWorker.register("/psm/sw.js",{scope:"/psm/",updateViaCache:"none"}),console.log("[PWA] Service Worker registriert:",Xt.scope),Xt.addEventListener("updatefound",()=>{const e=Xt?.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&(console.log("[PWA] Neues Update verfügbar"),Ot("pwa:update-available"))})}),navigator.serviceWorker.addEventListener("message",jo),ai||(ai=!0,navigator.serviceWorker.addEventListener("controllerchange",()=>{ni||(ni=!0,window.location.reload())})),Xt}catch(e){return console.error("[PWA] Service Worker Registrierung fehlgeschlagen:",e),null}}function jo(e){const{type:t,payload:a}=e.data||{};switch(t){case"DB_STATE":Ot("pwa:db-state",a);break;case"CACHES_CLEARED":Ot("pwa:caches-cleared");break}}async function hn(e){if(!navigator.serviceWorker.controller){localStorage.setItem("psm-db-state",JSON.stringify({...e,updatedAt:new Date().toISOString()}));return}navigator.serviceWorker.controller.postMessage({type:"SET_DB_STATE",payload:e})}async function ss(){const e=localStorage.getItem("psm-db-state");if(e)try{return JSON.parse(e)}catch{}return navigator.serviceWorker?.controller?new Promise(t=>{const a=n=>{n.data?.type==="DB_STATE"&&(navigator.serviceWorker.removeEventListener("message",a),t(n.data.payload))};navigator.serviceWorker.addEventListener("message",a),navigator.serviceWorker.controller.postMessage({type:"GET_DB_STATE"}),setTimeout(()=>{navigator.serviceWorker.removeEventListener("message",a),t(null)},1e3)}):null}async function Go(){const e=await ss();return!!(e?.hasDatabase&&e?.autoStartEnabled)}function Uo(){window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),Dt=e,console.log("[PWA] Install Prompt verfügbar"),localStorage.getItem("psm-app-installed")==="true"&&(console.log("[PWA] Widerspruch erkannt: Flag sagt installiert, aber Prompt verfügbar"),localStorage.removeItem("psm-app-installed"),console.log("[PWA] Veraltetes Installations-Flag entfernt")),Ot("pwa:install-available")}),window.addEventListener("appinstalled",()=>{Dt=null,yn(),console.log("[PWA] App installiert - Flag gesetzt"),Ot("pwa:installed")})}function vn(){return Dt!==null}function Pt(){return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0}function hr(){const e=navigator.userAgent.toLowerCase();return e.includes("edg/")?"edge":e.includes("chrome")&&!e.includes("edg")?"chrome":e.includes("firefox")?"firefox":e.includes("safari")&&!e.includes("chrome")?"safari":"other"}function vr(){return!!(Pt()||localStorage.getItem("psm-app-installed")==="true"||window.matchMedia("(display-mode: fullscreen)").matches||window.matchMedia("(display-mode: minimal-ui)").matches||window.matchMedia("(display-mode: window-controls-overlay)").matches)}async function os(){if(vr())return!0;try{if("getInstalledRelatedApps"in navigator){const e=await navigator.getInstalledRelatedApps();if(console.log("[PWA] getInstalledRelatedApps result:",e),e&&e.length>0)return yn(),!0}}catch(e){console.warn("[PWA] getInstalledRelatedApps API Fehler:",e)}return!1}function yn(){localStorage.setItem("psm-app-installed","true"),console.log("[PWA] App als installiert markiert")}function Vo(){localStorage.removeItem("psm-app-installed"),console.log("[PWA] Installations-Flag entfernt")}function ls(){const e=hr(),t=Pt(),a=vr();return{canInstall:vn(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function cs(){const e=hr(),t=Pt(),a=await os();return{canInstall:vn(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function Zo(){if(!Dt)return console.warn("[PWA] Kein Install Prompt verfügbar"),!1;try{await Dt.prompt();const{outcome:e}=await Dt.userChoice;return console.log("[PWA] Install Prompt Ergebnis:",e),e==="accepted"&&yn(),Dt=null,e==="accepted"}catch(e){return console.error("[PWA] Install Prompt fehlgeschlagen:",e),!1}}function Qo(e){if(!("launchQueue"in window)){console.log("[PWA] Launch Queue API nicht verfügbar");return}window.launchQueue?.setConsumer(async t=>{if(!t.files?.length){console.log("[PWA] Launch ohne Dateien");return}console.log("[PWA] Datei via Launch Queue empfangen:",t.files.length);for(const a of t.files)try{await e(a),await hn({hasDatabase:!0,fileHandleName:a.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0});break}catch(n){console.error("[PWA] Fehler beim Öffnen der Datei:",n)}}),console.log("[PWA] File Handling initialisiert")}const ht="psm-file-handles",yr="last-database";async function Vn(e){try{const t=await wr(),n=t.transaction(ht,"readwrite").objectStore(ht);await new Promise((r,i)=>{const s=n.put({key:yr,handle:e,savedAt:new Date().toISOString()});s.onsuccess=()=>r(),s.onerror=()=>i(s.error)}),t.close(),console.log("[PWA] FileHandle gespeichert"),await hn({hasDatabase:!0,fileHandleName:e.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}catch(t){console.error("[PWA] FileHandle speichern fehlgeschlagen:",t)}}async function Zn(){try{const e=await wr(),a=e.transaction(ht,"readonly").objectStore(ht),n=await new Promise((i,s)=>{const l=a.get(yr);l.onsuccess=()=>i(l.result),l.onerror=()=>s(l.error)});if(e.close(),!n?.handle)return null;const r=n.handle;return typeof r.queryPermission=="function"&&await r.queryPermission({mode:"readwrite"})==="granted"?(console.log("[PWA] FileHandle mit Berechtigung geladen"),n.handle):(console.log("[PWA] FileHandle gefunden, aber Berechtigung erforderlich"),n.handle)}catch(e){return console.error("[PWA] FileHandle laden fehlgeschlagen:",e),null}}async function Jo(e){try{const t=e;return typeof t.requestPermission!="function"?(await e.getFile(),!0):await t.requestPermission({mode:"readwrite"})==="granted"}catch{return!1}}async function Yo(){try{const e=await wr(),a=e.transaction(ht,"readwrite").objectStore(ht);await new Promise((n,r)=>{const i=a.delete(yr);i.onsuccess=()=>n(),i.onerror=()=>r(i.error)}),e.close(),await hn({hasDatabase:!1,autoStartEnabled:!1}),console.log("[PWA] FileHandle gelöscht")}catch(e){console.error("[PWA] FileHandle löschen fehlgeschlagen:",e)}}async function wr(){return new Promise((e,t)=>{const a=indexedDB.open("psm-file-handles",1);a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result),a.onupgradeneeded=n=>{const r=n.target.result;r.objectStoreNames.contains(ht)||r.createObjectStore(ht,{keyPath:"key"})}})}function Ot(e,t){window.dispatchEvent(new CustomEvent(e,{detail:t}))}function ds(){return{serviceWorker:"serviceWorker"in navigator,fileSystemAccess:typeof window.showOpenFilePicker=="function",launchQueue:"launchQueue"in window,indexedDB:"indexedDB"in window,standalone:Pt(),installAvailable:vn()}}async function Xo(e){if(console.log("[PWA] Initialisierung..."),await Wo(),Uo(),e?.onFileOpened&&Qo(e.onFileOpened),e?.onAutoStart&&await Go()){const t=await Zn();if(t){const a=t;let n=!1;if(typeof a.queryPermission=="function"&&(n=await a.queryPermission({mode:"readwrite"})==="granted"),n){console.log("[PWA] Auto-Start mit gespeicherter Datei"),e.onFileOpened&&await e.onFileOpened(t);return}console.log("[PWA] Auto-Start: Berechtigung für Datei erforderlich"),Ot("pwa:permission-required",{handle:t})}}console.log("[PWA] Capabilities:",ds())}async function el(){if(console.group("🔧 PWA Debug Status"),console.log("📱 Standalone Mode:",Pt()),console.log("💾 localStorage Flag:",localStorage.getItem("psm-app-installed")),console.log("🔔 Install Prompt verfügbar:",vn()),console.log("🌐 Browser:",hr()),console.group("📺 Display Mode Checks"),console.log("standalone:",window.matchMedia("(display-mode: standalone)").matches),console.log("fullscreen:",window.matchMedia("(display-mode: fullscreen)").matches),console.log("minimal-ui:",window.matchMedia("(display-mode: minimal-ui)").matches),console.log("window-controls-overlay:",window.matchMedia("(display-mode: window-controls-overlay)").matches),console.log("browser:",window.matchMedia("(display-mode: browser)").matches),console.groupEnd(),console.group("🔍 getInstalledRelatedApps API"),"getInstalledRelatedApps"in navigator)try{const e=await navigator.getInstalledRelatedApps();console.log("Installierte Apps:",e)}catch(e){console.log("API Fehler:",e)}else console.log("API nicht verfügbar");console.groupEnd(),console.group("📊 Status Vergleich"),console.log("Sync (isProbablyInstalled):",vr()),console.log("Async (checkIfInstalled):",await os()),console.log("getInstallStatus():",ls()),console.log("getInstallStatusAsync():",await cs()),console.groupEnd(),console.log("💡 Tipp: clearInstalledFlag() zum Zurücksetzen des Flags"),console.groupEnd()}typeof window<"u"&&(window.pwaDebug=el,window.pwaClearFlag=Vo);let qa=!1;function tl(e){const t=r=>{if(qa){qa=!1;return}return r.preventDefault(),r.returnValue="",""};let a=!1;const n=r=>{const i=!!r.app?.hasDatabase;i&&!a?(window.addEventListener("beforeunload",t),a=!0):!i&&a&&(window.removeEventListener("beforeunload",t),a=!1)};n(e.getState()),e.subscribe(n),document.addEventListener("click",r=>{const i=r.target.closest("a");i&&i.target==="_blank"&&(qa=!0,setTimeout(()=>{qa=!1},100))})}function al(){const e=document.getElementById("app-root");if(!e)throw new Error("app-root Container fehlt");return{startup:e.querySelector('[data-region="startup"]'),shell:e.querySelector('[data-region="shell"]'),main:e.querySelector('[data-region="main"]'),footer:e.querySelector('[data-region="footer"]')}}async function nl(){if(Us()){window.location.replace("/psm/m/");return}al(),Vs();const e=Zi();e!=="memory"&&ct(e),await Zs();const t={state:{getState:K,patchState:Rr,updateSlice:Ke,subscribe:nn},events:{emit:an,subscribe:Ve}};_o(t),Qi(),tl(t.state),Xo({onFileOpened:async a=>{const n=await mt(()=>import("./index.Jw5NaxwS.js").then(i=>i.aR),[]),r=await mt(()=>import("./index.Jw5NaxwS.js").then(i=>i.aQ),[]);if(r.isSupported()){n.setActiveDriver("sqlite");const i=await a.getFile(),s=await i.arrayBuffer(),l=await r.importFromArrayBuffer(s,i.name);await Vn(a);const{applyDatabase:c}=await mt(async()=>{const{applyDatabase:u}=await import("./index.Jw5NaxwS.js").then(d=>d.aT);return{applyDatabase:u}},[]);c(l.data),an("database:connected",{driver:"sqlite",autoStarted:!0})}}}),Ve("database:connected",async a=>{await hn({hasDatabase:!0,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}),Ve("database:connected",async a=>{if(le()==="sqlite")try{await Qs(),await Ji()}catch(n){console.warn("GPS-Punkte konnten beim Start nicht geladen werden",n)}}),Rr({app:{...K().app,ready:!0}})}const ri="__pflanzenschutz_bootstrapped__",ii=window;function si(){nl().catch(e=>{console.error("bootstrap failed",e)})}ii[ri]||(ii[ri]=!0,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",si,{once:!0}):si());const us=[{id:"start",label:"Start",icon:"bi-grid-1x2",sections:[{section:"dashboard",label:"Übersicht",icon:"bi-grid-1x2"}]},{id:"psm",label:"PSM",icon:"bi-flower1",sections:[{section:"calc",label:"Neu erfassen",icon:"bi-pencil-square"},{section:"documentation",label:"Übersicht",icon:"bi-list-ul"},{section:"lager",label:"Lager",icon:"bi-box-seam"},{section:"settings",label:"Einstellungen",icon:"bi-gear"}]},{id:"acker",label:"Acker-Planer",icon:"bi-map",sections:[{section:"acker",label:"Karte",icon:"bi-map"},{section:"kultur",label:"Kulturführung",icon:"bi-clipboard2-pulse"}]},{id:"fotos",label:"Fotos",icon:"bi-camera",sections:[{section:"fotos",label:"Fotos",icon:"bi-camera"}]},{id:"daten",label:"Daten",icon:"bi-database",sections:[{section:"daten",label:"Import",icon:"bi-cloud-upload"}]}],ps={dashboard:"start",calc:"psm",documentation:"psm",lager:"psm",history:"psm",report:"psm",acker:"acker",kultur:"acker",fotos:"fotos",settings:"psm",gps:"psm",lookup:"psm",import:"daten",daten:"daten"};function ms(e){return us.find(t=>t.id===e)}function rl(e){const t=ps[e];return t?ms(t):void 0}function il(){const e=document.getElementById("offline-indicator");if(!e)return;const t=()=>{const a=!navigator.onLine;e.classList.toggle("d-none",!a)};t(),window.addEventListener("online",t),window.addEventListener("offline",t)}function oi(e){K().app.activeSection!==e&&(Ke("app",t=>({...t,activeSection:e})),an("app:sectionChanged",e))}function li(){il();const e=document.querySelectorAll(".nav-btn[data-area]"),t=document.getElementById("brand-link"),a=document.getElementById("topnav-tabs"),n=document.getElementById("topnav-area-icon"),r=document.getElementById("topnav-area-label"),i={};for(const f of us)i[f.id]=f.sections[0].section;let s=null;function l(f,x){if(a){if(f.sections.length<=1){a.innerHTML="";return}a.innerHTML=f.sections.map(v=>`
        <button type="button" class="topnav-tab${v.section===x?" active":""}" data-section="${v.section}">
          <i class="bi ${v.icon}"></i><span>${v.label}</span>
        </button>`).join("")}}function c(f){a&&a.querySelectorAll(".topnav-tab").forEach(x=>{x.classList.toggle("active",x.dataset.section===f)})}const u=f=>{const x=ms(f);!x||!K().app.hasDatabase||oi(i[f]??x.sections[0].section)};e.forEach(f=>{f.addEventListener("click",()=>{const x=f.dataset.area;x&&u(x)})}),t?.addEventListener("click",f=>{f.preventDefault(),u("start")}),a?.addEventListener("click",f=>{const v=f.target?.closest(".topnav-tab")?.dataset.section;v&&oi(v)});const d=document.querySelector('.nav-btn[data-action="share-data"]');d?.addEventListener("click",()=>{d.disabled=!0,mt(async()=>{const{shareMobileData:f}=await import("./index.D8SAyDFT.js");return{shareMobileData:f}},__vite__mapDeps([0,1])).then(({shareMobileData:f})=>f()).catch(f=>console.error("Teilen fehlgeschlagen",f)).finally(()=>{d.disabled=!1})}),Js(),Ve("history:data-changed",f=>{if(!document.body.classList.contains("mobile-mode"))return;const x=f?.type;(x==="created"||x==="created-bulk")&&Ys()});const p=f=>{const x=document.getElementById("brand-title"),v=document.getElementById("brand-tagline"),$=document.getElementById("app-version");x&&f.company.name&&(x.textContent=f.company.name),v&&f.company.headline&&(v.textContent=f.company.headline),$&&f.app.version&&($.textContent=`v${f.app.version}`);const A=f.app.hasDatabase,R=f.app.activeSection,Q=rl(R);Q&&ps[R]===Q.id&&(i[Q.id]=R),e.forEach(O=>{O.disabled=!A;const J=A&&Q?.id===O.dataset.area;O.classList.toggle("active",!!J)}),Q&&(n&&(n.className=`bi ${Q.icon} topnav-area-icon`),r&&(r.textContent=Q.label),s!==Q.id?(l(Q,R),s=Q.id):c(R))};nn(p),p(K());let m=!1;const y=document.title||"Pflanzenschutz";window.addEventListener("beforeprint",()=>{m||(m=!0,document.title=" ")}),window.addEventListener("afterprint",()=>{m&&(m=!1,document.title=y)})}function sl(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",li,{once:!0}):li()}sl();const ol="https://api.digitale-psm.de",ll="digitale-psm.de";async function cl(e){try{const t=await fetch(`${ol}/api/v1/${ll}/views/${e}`,{method:"POST",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`API error: ${t.status}`);return(await t.json()).views}catch(t){return console.warn("[ViewCounter] Fehler beim Zählen:",t),null}}function dl(e){return e>=1e6?(e/1e6).toFixed(1).replace(".",",")+"M":e>=1e3?(e/1e3).toFixed(1).replace(".",",")+"K":e.toString()}const Qn="pflanzenschutz-datenbank.json";let ci=!1;function ul(e){return e?`${e.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"pflanzenschutz-datenbank"}.json`:Qn}async function ea(e,t){if(!e){await t();return}const a=e.textContent??"";e.disabled=!0,e.dataset.busy="true",e.textContent="Bitte warten...";try{await t()}finally{e.disabled=!1,e.dataset.busy="false",e.textContent=a}}function di(e){return g(e)}function pl(e){const t=document.createElement("section");t.className="section-container d-none",t.innerHTML=`
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
                <input class="form-control" id="wizard-company-name" name="wizard-company-name" required value="${di(e.name)}" placeholder="z.B. Gärtnerei Müller" />
              </div>
              <div class="col-md-6">
                <label class="form-label d-block mb-2" for="wizard-company-headline">
                  Überschrift <span class="text-muted small">(optional)</span>
                </label>
                <input class="form-control" id="wizard-company-headline" name="wizard-company-headline" value="${di(e.headline)}" placeholder="z.B. Pflanzenschutz-Dokumentation 2025" />
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
  `;const a=t.querySelector("#database-wizard-form");if(!a)throw new Error("Wizard-Formular konnte nicht erzeugt werden");const n=t.querySelector('[data-role="wizard-result"]');if(!n)throw new Error("Wizard-Resultat-Container fehlt");return{section:t,form:a,resultCard:n,preview:t.querySelector('[data-role="wizard-preview"]'),filenameLabel:t.querySelector('[data-role="wizard-filename"]'),saveHint:t.querySelector('[data-role="wizard-save-hint"]'),saveButton:t.querySelector('[data-action="wizard-save"]'),reset(){a.reset(),n.classList.add("d-none");const r=t.querySelector('[data-role="wizard-preview"]');r&&(r.textContent="");const i=t.querySelector('[data-role="wizard-filename"]');i&&(i.textContent="")}}}function ml(e,t){if(!e||ci)return;const a=e;let n=null,r=Qn,i="landing";const l=t.state.getState().company,c=document.createElement("section");c.className="section-container";function u(M,D){const I=M;c.innerHTML=`
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
            ${I?`<button class="btn btn-link p-0" style="color: var(--text-muted); text-decoration: none; font-size: 0.85rem;" data-action="start-wizard">
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
            ${I?`<!-- Szenario 2: Hat Datei → Fortsetzen im Fokus -->
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
  `}u(!1,Pt());const d=pl(l);a.innerHTML="",a.appendChild(c),a.appendChild(d.section);const p=typeof window<"u"&&typeof window.showSaveFilePicker=="function";d.saveButton&&(p?d.saveHint&&(d.saveHint.textContent='Der Browser fragt nach einem Speicherort. Die erzeugte Datei kannst du später über "Bestehende Datei verbinden" erneut laden.'):(d.saveButton.disabled=!0,d.saveButton.textContent="Datei speichern (nicht verfügbar)",d.saveHint&&(d.saveHint.textContent="Dieser Browser unterstützt keinen direkten Dateidialog. Bitte nutze einen Chromium-basierten Browser (z. B. Chrome, Edge) über HTTPS oder http://localhost.")));function m(M=t.state.getState()){const D=!!M.app?.hasDatabase;if(a.classList.toggle("d-none",D),D){c.classList.add("d-none"),d.section.classList.add("d-none");return}i==="wizard"?(c.classList.add("d-none"),d.section.classList.remove("d-none")):(c.classList.remove("d-none"),d.section.classList.add("d-none"))}async function y(M){await ea(M,async()=>{try{const D=le();D==="sqlite"||D==="filesystem"?ct(D):ct("filesystem")}catch(D){throw C.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),D instanceof Error?D:new Error("Dateisystem nicht verfügbar")}try{const D=await Xs();Ta(D.data);const I=D.context;I?.fileHandle&&await Vn(I.fileHandle),t.events.emit("database:connected",{driver:le()})}catch(D){console.error("Fehler beim Öffnen der Datenbank",D),C.error(D instanceof Error?D.message:"Öffnen der Datenbank fehlgeschlagen")}})}function f(M){ea(M,async()=>{const D=Wr(),I=["localstorage","sqlite","memory"];for(const ce of I)try{ct(ce);const re=await jr(D);Ta(re.data),t.events.emit("database:connected",{driver:le()||ce});return}catch(re){console.warn(`Treiber ${ce} konnte nicht initialisiert werden`,re)}const W="Keine geeignete Speicheroption verfügbar. Bitte Browserberechtigungen prüfen.";console.error(W),C.error(W)})}async function x(M){if(!n){C.warning("Bitte erst die Datenbank erzeugen.");return}await ea(M,async()=>{try{const D=le();D==="sqlite"||D==="filesystem"?ct(D):ct("filesystem")}catch(D){throw C.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),D instanceof Error?D:new Error("Dateisystem nicht verfügbar")}try{const D=await jr(n);Ta(D.data),t.events.emit("database:connected",{driver:le()})}catch(D){console.error("Fehler beim Speichern der Datenbank",D),C.error(D instanceof Error?D.message:"Die Datei konnte nicht gespeichert werden")}})}function v(M){M.preventDefault();const D=new FormData(d.form),I=(D.get("wizard-company-name")||"").toString().trim();if(!I){C.warning("Bitte einen Firmennamen angeben.");return}const W=(D.get("wizard-company-headline")||"").toString().trim(),ce=(D.get("wizard-company-address")||"").toString().trim();n=Wr({meta:{company:{name:I,headline:W,logoUrl:"",contactEmail:"",address:ce}}}),r=ul(I),d.preview.textContent=JSON.stringify(n,null,2),d.filenameLabel.textContent=r,d.resultCard.classList.remove("d-none"),d.resultCard.scrollIntoView({behavior:"smooth",block:"start"})}function $(){i="landing",n=null,r=Qn,d.reset(),m()}function A(){i="wizard",m()}async function R(M){await ea(M,async()=>{try{const D=await Zn();if(!D){C.warning("Keine gespeicherte Datei gefunden.");return}if(!await Jo(D)){C.warning("Berechtigung zum Zugriff auf die Datei wurde verweigert.");return}ct("sqlite");const W=await D.getFile(),ce=await W.arrayBuffer(),re=await eo(ce,W.name);to(D),Ta(re.data),await Vn(D),t.events.emit("database:connected",{driver:"sqlite",autoStarted:!0}),C.success("Datenbank erfolgreich geladen!")}catch(D){console.error("Auto-Start fehlgeschlagen:",D),C.error(D instanceof Error?D.message:"Fehler beim Laden der gespeicherten Datei")}})}async function Q(){await Yo();const M=c.querySelector("#auto-start-banner");M&&M.classList.add("d-none"),C.info("Gespeicherte Datei wurde vergessen.")}async function O(M){await ea(M,async()=>{if(await Zo()){C.success("App wird installiert!");const I=c.querySelector("#pwa-install-banner");I&&I.classList.add("d-none")}})}if(c.addEventListener("click",M=>{const D=M.target?.closest("button[data-action]");if(!D)return;const I=D.dataset.action;if(I==="start-wizard"){A();return}I==="open"?y(D):I==="useDefaults"?f(D):I==="auto-start"?R(D):I==="auto-start-forget"?Q():I==="install-pwa"&&O(D)}),d.form.addEventListener("submit",v),d.section.addEventListener("click",M=>{const D=M.target?.closest("[data-action]");if(!D)return;const I=D.dataset.action;if(I==="wizard-back"){$();return}I==="wizard-save"&&x(D)}),t.state.subscribe(M=>m(M)),m(t.state.getState()),!t.state.getState().app.hasDatabase){const M=Zi();if(M&&M!==le())try{ct(M)}catch(D){console.warn("Bevorzugter Speicher konnte nicht gesetzt werden",D)}}(async()=>{const M=await Zn(),D=await ss(),I=!!(M&&D?.hasDatabase),W=Pt();u(I,W);const ce=c.querySelector('[data-role="view-count"]');if(ce&&cl("app").then(ue=>{ue!==null&&(ce.textContent=dl(ue))}),I&&M){const ue=c.querySelector('[data-role="auto-start-filename"]');ue&&(ue.textContent=`Datei: ${M.name}`)}J(),window.addEventListener("pwa:install-available",()=>{J()}),window.addEventListener("pwa:installed",()=>{yn(),J()}),window.addEventListener("pwa:permission-required",async ue=>{const yt=ue.detail?.handle;if(yt){const Ee=c.querySelector("#auto-start-banner"),wt=c.querySelector('[data-role="auto-start-filename"]');Ee&&wt&&(wt.textContent=`Datei: ${yt.name} (Berechtigung erforderlich)`,Ee.classList.remove("d-none"))}}),console.log("[Startup] PWA Capabilities:",ds());const re=await cs();console.log("[Startup] PWA Install Status (async):",re),Te(re)})();function J(){const M=ls();Te(M)}function Te(M){const D=c.querySelector("#pwa-install-banner"),I=c.querySelector('[data-role="pwa-content"]');if(!(!D||!I)){if(!M.showBanner){D.classList.add("d-none");return}D.classList.remove("d-none"),M.isInstalled?I.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-check-circle text-success me-1"></i>App ist bereits installiert
        </p>
        <p class="small mb-0" style="color: var(--text-muted);">
          Öffne die App über dein Desktop- oder Startmenü-Symbol für die beste Erfahrung.
        </p>
      `:M.canInstall?I.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-download me-1"></i>Für schnelleren Zugriff als App installieren
        </p>
        <button class="btn btn-sm btn-outline-light" data-action="install-pwa">
          <i class="bi bi-download me-1"></i>App installieren
        </button>
      `:D.classList.add("d-none")}}ci=!0}function fs(e){let t=!1,a=!1;const n=l=>{e.onStatusChange&&e.onStatusChange(l)},r=()=>{t||!a||K().app.activeSection!==e.section||e.shouldRefresh&&!e.shouldRefresh()||(a=!1,n("refreshing"),Promise.resolve(e.onRefresh()).catch(c=>{console.error("Auto-Refresh konnte nicht ausgeführt werden",c),a=!0,n("stale")}).finally(()=>{!t&&!a&&n("idle")}))},i=Ve(e.event,()=>{e.shouldHandleEvent&&!e.shouldHandleEvent()||(a=!0,n("stale"),r())}),s=Ve("app:sectionChanged",l=>{l===e.section&&(a?r():n("idle"))});return K().app.activeSection===e.section&&n("idle"),()=>{t=!0,i(),s()}}const fl={prev:"Zurück",next:"Weiter",loading:"Lädt …",empty:"Keine Einträge verfügbar"};function ui(){const e=document.createElement("span");return e.className="spinner-border spinner-border-sm",e.setAttribute("role","status"),e.setAttribute("aria-hidden","true"),e}function pi(e){const t=document.createElement("div");return t.className="pager-widget__info text-muted small text-center flex-grow-1",t.textContent=e?.trim()||"",t}function Aa(e,t){if(!e)return null;const a=document.createElement("div");a.className="pager-widget d-flex flex-column gap-2",e.innerHTML="",e.appendChild(a);let n={status:"hidden"},r=!1;const i={...fl,...t.labels||{}};function s(){a.replaceChildren()}function l(p){const m=pi(p.info||i.empty);a.replaceChildren(m)}function c(p){const m=document.createElement("div");m.className="alert alert-danger mb-0",m.textContent=p.message||"Unbekannter Fehler",a.replaceChildren(m)}function u(p){const m=document.createElement("div");m.className="pager-widget__controls d-flex flex-column flex-md-row gap-2 align-items-stretch";const y=document.createElement("button");y.type="button",y.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",y.disabled=!p.canPrev||p.loadingDirection==="prev",y.textContent=i.prev,p.loadingDirection==="prev"&&y.prepend(ui()),y.addEventListener("click",()=>{y.disabled||t.onPrev()});const f=document.createElement("button");f.type="button",f.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",f.disabled=!p.canNext||p.loadingDirection==="next",f.textContent=i.next,p.loadingDirection==="next"&&f.append(ui()),f.addEventListener("click",()=>{f.disabled||t.onNext()});const x=pi(p.info||(p.canPrev||p.canNext?i.loading:i.empty));m.append(y,x,f),a.replaceChildren(m)}function d(p){switch(p.status){case"hidden":s();break;case"disabled":l(p);break;case"error":c(p);break;case"ready":u(p);break;default:s();break}}return{update(p){r||(n=p,d(p))},destroy(){r||(r=!0,a.replaceChildren(),e.innerHTML="")},getState(){return n}}}const kr=new Set;let mi=!1;function gl(){return typeof window>"u"?null:window.__PSL?.debugOverlayApi??null}function gs(){mi||typeof window>"u"||(mi=!0,window.addEventListener("psl:debug-overlay-ready",()=>{kr.forEach(e=>{xr(e)})}))}function xr(e){const t=gl();t?.registerProvider&&(e.handle||(e.handle=t.registerProvider(e.config)),e.handle.update(e.lastMetrics??null))}function bs(e){const t={config:e,handle:null,lastMetrics:null};return kr.add(t),gs(),xr(t),t}function hs(e,t){e.lastMetrics=t,kr.add(e),gs(),xr(e)}function vs(e){if(e==null)return 0;try{const t=JSON.stringify(e);return t?Number((t.length/1024).toFixed(1)):0}catch{return null}}const fi=5e3,gi=50,Sr=50,Ga=3;function zn(e){if(e==null||e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function bl(e){if(!e)return null;const t=zn(e.areaHa);if(t!==null)return t;const a=zn(e.areaAr);if(a!==null)return a/100;const n=zn(e.areaSqm);return n!==null?n/1e4:null}function hl(e,t="–"){const a=bl(e);return a===null?t:fo(a,2,t)}function vl(e){return e.toISOString().slice(0,10)}function sn(e){if(!e)return;if(/^\d{4}-\d{2}-\d{2}$/.test(e))return e;const t=new Date(e);if(!Number.isNaN(t.getTime()))return vl(t)}function bi(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function Er(){return{startDate:"",endDate:""}}function ys(e,t){if(!e)return;const a=e.querySelector("#doc-start"),n=e.querySelector("#doc-end");a&&t.startDate&&(a.value=t.startDate),n&&t.endDate&&(n.value=t.endDate)}function yl(e,t="sqlite"){if(typeof e=="string")return e.includes(":")?e:/^\d+$/.test(e)?Tt(t,Number(e)):e;if(typeof e=="number")return Tt(t,e);if(e&&typeof e=="object"){const a=e.source||t;if(typeof e.ref=="string"&&e.ref.includes(":"))return e.ref;const n=Number(e.ref);if(!Number.isNaN(n))return Tt(a,n)}return null}function wl(e){const t=new Set;return e?.length&&e.forEach(a=>{const n=yl(a);n&&t.add(n)}),t}function ws(e){const t=e.querySelector('[data-role="doc-focus-banner"]'),a=e.querySelector('[data-role="doc-focus-text"]');if(!t||!a)return;if(!gt){t.classList.add("d-none");return}const n=Z.startDate&&Z.endDate?`${Z.startDate} - ${Z.endDate}`:"Aktuelle Filter",r=gt.label||"Importierter Zeitraum",i=gt.highlightEntryIds.size,s=i?` (${i} markiert)`:"";a.textContent=`${r}: ${n}${s}`,t.classList.remove("d-none")}function kl(e,t){const a=e.querySelector('[data-role="doc-refresh-indicator"]');if(a){if(a.classList.remove("alert-info","alert-warning"),t==="idle"){a.classList.add("d-none");return}a.classList.remove("d-none"),t==="stale"?(a.classList.add("alert-warning"),a.textContent="Neue Dokumentationseinträge verfügbar. Ansicht aktualisiert sich beim Öffnen."):(a.classList.add("alert-info"),a.textContent="Aktualisiere Dokumentation...")}}function Bn(e,t,a={}){gt&&(gt=null,pa=null,ws(e),a.refreshList&&vt(e,t.state.getState().fieldLabels))}function xl(e,t){if(!pa)return;const a=$t(pa);a&&(pa=null,Ds(e,a,t))}function Sl(e,t,a){if(!a)return;const n=sn(a.startDate),r=sn(a.endDate),i=!!a.entryIds?.length;if(!n&&!r&&!i)return;Z={...Z,...n?{startDate:n}:{},...r?{endDate:r}:{}},a.creator!==void 0&&(Z={...Z,creator:a.creator||void 0}),a.crop!==void 0&&(Z={...Z,crop:a.crop||void 0});const s=wl(a.entryIds);gt={label:a.label,reason:a.reason,startDate:Z.startDate,endDate:Z.endDate,highlightEntryIds:s},pa=a.autoSelectFirst&&s.size?s.values().next().value??null:null;const l=e.querySelector("#doc-filter");ys(l,Z),ws(e),Jn=!0,dt(e,t.state.getState()).finally(()=>{Jn=!1})}function El(){if(typeof window>"u")return{enabled:!1,count:Ha};try{const e=new URLSearchParams(window.location.search);if(!e.has("seedHistory"))return{enabled:!1,count:Ha};const t=e.get("seedHistory"),a=t?Number(t):Number.NaN;return{enabled:!0,count:Number.isFinite(a)&&a>0?Math.min(Math.round(a),Ll):Ha}}catch(e){return console.warn("seedHistory Parameter konnte nicht gelesen werden",e),{enabled:!1,count:Ha}}}const Ze=25,hi=4,Nn=new Intl.NumberFormat("de-DE"),Ha=200,Ll=2e3,Kt=El();let vi=!1,ge="memory",Z=Er(),Ae=0,de=[],nt=[],ee=0;const Ue=new Map,_e=new Map([[0,null]]),Ne=new Set,ft=new Map,Ft=new Map;let ze=!1,ta=null,aa=0,gt=null,Jn=!1,pa=null,on=!1,Ua="",ln=!1,_a=null,Oa=null,yi=null,$e=0,Ka=null,wi=null,Ge=null,ma=!1,ki=null;const Dl=bs({id:"documentation",label:"Documentation",budget:{initialLoad:50,maxItems:150}});let ks=null;function jt(e){return e.app?.storageDriver||le()}function Tt(e,t){return`${e}:${t}`}function Lr(e){const t={},a=bi(e.startDate,"start"),n=bi(e.endDate,"end");return a&&(t.startDate=a),n&&(t.endDate=n),e.creator&&(t.creator=e.creator),e.crop&&(t.crop=e.crop),t}function $l(e,t){return{id:Tt("state",t),entry:e,source:"state",ref:t}}function Al(e){const t=Number(e?.id??e?.historyId??0),a={...e};return delete a.id,{id:Tt("sqlite",t),entry:a,source:"sqlite",ref:t}}function Pl(){return ge==="memory"?de.length:Ae>0?Ae:ee*Ze+de.length||null}function Cl(){const e=[];if(ze&&e.push("Lädt …"),Ge&&e.push("Fehler"),gt&&e.push("Fokus aktiv"),ge==="sqlite"&&_e.get(ee+1)&&e.push("Weitere Seiten verfügbar"),!!e.length)return e.join(" · ")}function Ml(){const e={items:de.length,totalCount:Pl(),cursor:ge==="sqlite"?`Seite ${ee+1}`:null,payloadKb:vs(nt.map(t=>t.entry)),lastUpdated:ks,note:Cl()};hs(Dl,e)}function $t(e){return de.find(t=>t.id===e)}function wn(e){const t=e.querySelector('[data-role="archive-form"]');if(!t)return;const a=t.querySelector('input[name="archive-start"]'),n=t.querySelector('input[name="archive-end"]');a&&(a.value=Z.startDate||""),n&&(n.value=Z.endDate||"")}function be(e,t,a="info"){const n=e.querySelector('[data-role="archive-status"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a}`,n.textContent=t,n.classList.remove("d-none")}}function Yn(e,t){const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(!a)return;const r=!a.classList.contains("d-none"),i=typeof t=="boolean"?t:!r;a.classList.toggle("d-none",!i),n&&(n.textContent=i?"Archiv-Eingaben ausblenden":"Archiv erstellen"),i&&wn(e)}function Il(e){const t=e.querySelector('input[name="archive-start"]'),a=e.querySelector('input[name="archive-end"]');if(!t?.value||!a?.value)return null;const n=e.querySelector('input[name="archive-storage"]'),r=e.querySelector('textarea[name="archive-note"]'),i=e.querySelector('input[name="archive-remove"]');return{startDate:t.value,endDate:a.value,storageHint:n?.value.trim()||void 0,note:r?.value.trim()||void 0,removeAfterExport:i?i.checked:!0}}function Dr(e,t){const a=e.querySelector('[data-action="archive-toggle"]'),n=e.querySelector('[data-action="archive-submit"]'),r=e.querySelector('[data-role="archive-form"]'),i=e.querySelector('[data-role="archive-driver-hint"]'),s=jt(t)==="sqlite"&&!!t.app?.hasDatabase;a&&(a.disabled=!s||on),n&&(n.disabled=!s||on),!s&&r&&r.classList.add("d-none"),i&&(i.textContent=s?"Lokale SQLite-Datenbank aktiv":"Nur mit SQLite verfügbar",i.className=`badge ${s?"bg-success":"bg-secondary"}`),s?$r():ln=!1}function xi(e,t){on=t;const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(a&&a.querySelectorAll("input, textarea, button").forEach(r=>{if(r.dataset.action==="archive-cancel"&&t){r.setAttribute("disabled","disabled");return}t?r.setAttribute("disabled","disabled"):r.removeAttribute("disabled")}),n&&(n.disabled=t||n.disabled,!t)){const r=K();n.disabled=jt(r)!=="sqlite"||!r.app?.hasDatabase}}function zl(e,t){const a=n=>n?n.replace(/[^0-9-]/g,""):"unbekannt";return`pflanzenschutz-archiv-${a(e)}_${a(t)}.zip`}function Bl(e){let t=[];return Ke("archives",a=>{const n=Array.isArray(a?.logs)?a.logs:[];return t=[e,...n].slice(0,Sr),{...a||{logs:[]},logs:t}}),t}async function $r({force:e=!1}={}){if(_a){if(await _a,!e)return}else if(ln&&!e)return;const t=K();if(jt(t)!=="sqlite"||!t.app?.hasDatabase)return;const n=(async()=>{try{const r=await ao({limit:Sr});Ke("archives",i=>({...i&&typeof i=="object"?i:{logs:[]},logs:r.items})),ln=!0}catch(r){console.warn("Archive logs could not be loaded",r)}})();_a=n;try{await n}finally{_a=null}}async function Nl(e,t){const a=jt(K());if(Bl(e),a!=="sqlite"){console.warn("Archive logs require SQLite. Changes stored in memory only.");return}try{const n={...e,metadata:t??void 0};await lo(n),await Oe()}catch(n){console.error("Archive log could not be persisted",n),ln=!1}finally{await $r({force:!0})}}function Xn(e){return!Array.isArray(e)||!e.length?"[]":e.map(t=>`${t.id}:${t.archivedAt}:${t.entryCount}`).join("|")}function Fl(e){return e?va(e)||e.slice(0,16).replace("T"," "):"-"}function ka(e,t,a={}){const n=e.querySelector('[data-role="archive-log-list"]');if(!n)return;const r=Array.isArray(t)?t:[];a.resetPage!==!1&&($e=0);const i=jl(r);if(!i.total){n.innerHTML='<div class="text-muted small">Noch keine Archive erstellt.</div>',Li(e,i);return}const s=i.items.map(l=>{const c=Fl(l.archivedAt),u=`${l.startDate||"-"} – ${l.endDate||"-"}`,d=l.entryCount===1?"Eintrag":"Einträge";return`
        <div class="list-group-item border rounded mb-2 p-3" data-action="archive-log-focus" data-log-id="${l.id}" style="cursor: pointer;">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="fs-5 fw-bold mb-1">${g(u)}</div>
              <div class="text-muted">${l.entryCount} ${d} · Erstellt ${g(c)}</div>
            </div>
            <i class="bi bi-chevron-right text-muted fs-4"></i>
          </div>
        </div>
      `}).join("");n.innerHTML=`<div class="list-group list-group-flush">${s}</div>`,Li(e,i)}function Si(e,t){const a=e.archives?.logs;if(Array.isArray(a))return a.find(n=>n.id===t)}async function Tl(e){if(e){if(typeof navigator<"u"&&navigator.clipboard&&typeof navigator.clipboard.writeText=="function"){await navigator.clipboard.writeText(e);return}if(typeof document<"u"){const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select(),document.execCommand("copy"),document.body.removeChild(t)}}}async function Pa(e){if(Ft.has(e.id))return Ft.get(e.id);let t=null;if(e.source==="sqlite")try{t=await co(e.ref)}catch(a){console.error("History entry fetch failed",a)}else{const a=Be(K().history);t=(typeof e.ref=="number"?a[e.ref]:void 0)||e.entry}return t&&Ft.set(e.id,t),t}function xs(e){return e&&(e.datum||va(e.dateIso)||(typeof e.date=="string"?e.date:""))||""}function ql(e){if(e?.gpsCoordinates){const t=mo(e.gpsCoordinates);if(t)return t}return""}function Hl(e){return e?.gps||""}function er(e){if(!e)return null;if(e.dateIso){const n=ts(e.dateIso);if(n)return new Date(n.getFullYear(),n.getMonth(),n.getDate())}const t=typeof e.datum=="string"&&e.datum||typeof e.date=="string"&&e.date||null;if(!t)return null;const a=t.split(".");if(a.length===3){const[n,r,i]=a.map(Number);if(!Number.isNaN(n)&&!Number.isNaN(r)&&!Number.isNaN(i))return new Date(i,r-1,n)}return null}function _l(e,t){const a=er(e);if(t.startDate){const r=new Date(t.startDate);if(r.setHours(0,0,0,0),!a||a<r)return!1}if(t.endDate){const r=new Date(t.endDate);if(r.setHours(23,59,59,999),!a||a>r)return!1}const n=[["creator",e.ersteller],["crop",e.kultur]];for(const[r,i]of n){const l=t[r]?.trim().toLowerCase();if(l&&!`${i||""}`.toLowerCase().includes(l))return!1}return!0}function Ar(e){if(!e)return"";const t=r=>r==null?"":String(r),n=(Array.isArray(e.items)?e.items:[]).map(r=>{const i=Object.keys(r).sort().reduce((s,l)=>(s[l]=r[l],s),{});return JSON.stringify(i)}).sort();return JSON.stringify({savedAt:t(e.savedAt),dateIso:t(e.dateIso),datum:t(e.datum),ersteller:t(e.ersteller),standort:t(e.standort),kultur:t(e.kultur),usageType:t(e.usageType),eppoCode:t(e.eppoCode),invekos:t(e.invekos),bbch:t(e.bbch),gps:t(e.gps),gpsPointId:t(e.gpsPointId),areaHa:e.areaHa??null,areaAr:e.areaAr??null,areaSqm:e.areaSqm??null,kisten:e.kisten??null,itemHashes:n})}function Ss(e){e.size&&Ke("history",t=>{const a=Da(t);if(!a.items.length)return a;let n=!1;const r=a.items.filter(i=>{const s=Ar(i);return e.has(s)?(n=!0,!1):!0});return n?{...a,items:r,totalCount:Math.min(a.totalCount,r.length),lastUpdatedAt:new Date().toISOString()}:a})}function Ol(e){return e.slice().sort((t,a)=>{const n=er(t.entry)?.getTime()||new Date(t.entry.savedAt||0).getTime();return(er(a.entry)?.getTime()||new Date(a.entry.savedAt||0).getTime())-n})}function Ei(){return ge==="sqlite"?Ae>0?Math.max(Math.ceil(Ae/Ze),1):Math.max(ee+1,Ue.size||0):de.length?Math.max(Math.ceil(de.length/Ze),1):0}function Es(){if(ge==="sqlite"){const t=Math.max(Ei()-1,0);return ee>t&&(ee=t),ee<0&&(ee=0),ee*Ze}if(!de.length)return ee=0,0;const e=Math.max(Ei()-1,0);return ee>e&&(ee=e),ee<0&&(ee=0),ee*Ze}function kn(){if(!de.length){nt=[];return}if(ge==="sqlite"){nt=de.slice();return}const e=Es(),t=Math.min(e+Ze,de.length);nt=de.slice(e,t)}function Kl(e){if(Ue.size<=hi)return;const t=Array.from(Ue.keys()).sort((a,n)=>{const r=Math.abs(a-e);return Math.abs(n-e)-r});for(;Ue.size>hi&&t.length;){const a=t.shift();a==null||a===e||Ue.delete(a)}}function Rl(e){const t=e.querySelector('[data-role="doc-pager"]');return t?((!Oa||yi!==t)&&(Oa?.destroy(),Oa=Aa(t,{onPrev:()=>Vl(e),onNext:()=>Zl(e),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Dokumentation...",empty:"Keine Einträge"}}),yi=t),Oa):null}function Wl(e){const t=e.querySelector('[data-role="archive-log-pager"]');return t?((!Ka||wi!==t)&&(Ka?.destroy(),Ka=Aa(t,{onPrev:()=>Gl(e),onNext:()=>Ul(e),labels:{prev:"Zurück",next:"Weiter",loading:"Archive werden geladen...",empty:"Keine Einträge"}}),wi=t),Ka):null}function jl(e){const t=e.length;if(!t)return $e=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/Ga),1);$e>=a&&($e=a-1),$e<0&&($e=0);const n=$e*Ga,r=Math.min(n+Ga,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function Li(e,t){const a=Wl(e);if(a){if(!t.total){a.update({status:"disabled",info:"Noch keine Archive"});return}a.update({status:"ready",info:`Einträge ${t.start+1}–${t.end} von ${t.total}`,canPrev:$e>0,canNext:t.end<t.total})}}function Gl(e){if($e===0)return;$e=Math.max($e-1,0);const t=K().archives?.logs??[];ka(e,t,{resetPage:!1})}function Ul(e){const t=K().archives?.logs??[],a=t.length;if(!a)return;const n=Math.max(Math.ceil(a/Ga),1);$e>=n-1||($e=Math.min($e+1,n-1),ka(e,t,{resetPage:!1}))}function Va(e){const t=Rl(e);if(!t)return;if(Ge){t.update({status:"error",message:Ge});return}const a=ge==="memory"?de.length:Ae,n=nt.length;if(!n){const u=ze?"Lade Dokumentation...":"Keine Einträge vorhanden.";t.update({status:"disabled",info:u});return}const r=ge==="sqlite"?ee*Ze:Es(),i=`Einträge ${Nn.format(r+1)}–${Nn.format(r+n)}${a?` von ${Nn.format(a)}`:""}`,s=ge==="memory"?r+n<de.length:!!_e.get(ee+1),l=!ze&&s,c=ee>0&&!ze;t.update({status:"ready",info:i,canPrev:c,canNext:l,loadingDirection:ze&&s?"next":null})}function tr(e){if(!Kt.enabled)return;const t=e.querySelector('[data-action="doc-seed"]');t&&(t.disabled=ma,t.textContent=ma?"Dummy-Daten werden erstellt...":`+ ${Kt.count} Dummy-Einträge`)}function Vl(e){if(ee===0||ze)return;const t=Math.max(ee-1,0);if(ge==="sqlite"){Pr(e,K().fieldLabels,t);return}ee=t,kn(),vt(e,K().fieldLabels),Sa(e,K().fieldLabels)}function Zl(e){if(ze)return;const t=ee+1;if(ge==="sqlite"){const n=Ue.has(t),r=_e.get(t);if(!n&&!r)return;Pr(e,K().fieldLabels,t);return}t*Ze<de.length&&(ee=t,kn(),vt(e,K().fieldLabels),Sa(e,K().fieldLabels))}function xa(e){Ne.clear(),ft.clear(),e&&xn(e)}function Ql(){return ge==="memory"?de.length:Ae}function xn(e){const t=e.querySelector('[data-role="doc-selection-info"]'),a=e.querySelector('[data-action="print-selection"]'),n=e.querySelector('[data-action="pdf-selection"]'),r=e.querySelector('[data-action="export-selection"]'),i=e.querySelector('[data-action="export-zip"]'),s=e.querySelector('[data-action="delete-selection"]'),l=Ne.size;t&&(t.textContent=l?`${l} Eintrag${l===1?"":"e"} ausgewählt`:"Keine Einträge ausgewählt");const c=l===0;a&&(a.disabled=c),n&&(n.disabled=c),r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=c);const u=e.querySelector('[data-action="toggle-select-all"]');if(u){const d=Ql();u.disabled=d===0,u.checked=d>0&&l>=d,u.indeterminate=l>0&&l<d}}function ar(e,t){e.querySelectorAll('[data-role="doc-list"] .doc-sidebar-entry').forEach(n=>{const r=!!(t&&n.dataset.entryId===t);n.classList.toggle("active",r)})}function sa(e,t,a){const n=e.querySelector("#doc-detail"),r=e.querySelector("#doc-detail-body"),i=e.querySelector('[data-role="doc-detail-card"]'),s=e.querySelector('[data-role="doc-detail-empty"]');if(!n||!r||!i||!s)return;if(!t){n.dataset.entryId="",i.classList.add("d-none"),s.classList.remove("d-none"),r.innerHTML="",ar(e,null);return}n.dataset.entryId=t.entry.id,i.classList.remove("d-none"),s.classList.add("d-none"),ar(e,t.entry.id);const l=a||K().fieldLabels,c=l.history?.tableColumns??{},u=l.history?.detail??{},d=t.detail||t.entry.entry,p=uo(d.items||[],l,"detail"),m=d.gpsCoordinates?$a(d.gpsCoordinates):null,y=Hl(d),f=ql(d),x=u.gpsNote||c.gpsNote||u.gps||c.gps||"GPS-Notiz",v=u.gpsCoordinates||c.gpsCoordinates||u.gps||c.gps||"GPS-Koordinaten",$=f?`${g(f)}${m?` <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${g(m)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:""}`:"-";r.innerHTML=`
    <p>
      <strong>${g(c.date||"Datum")}:</strong> ${g(xs(d))}<br />
      <strong>${g(u.creator||"Erstellt von")}:</strong> ${g(d.ersteller||"")}<br />
      <strong>${g(u.location||"Standort")}:</strong> ${g(d.standort||"")}<br />
      <strong>${g(u.crop||"Kultur")}:</strong> ${g(d.kultur||"")}<br />
      <strong>${g(u.usageType||"Art der Verwendung")}:</strong> ${g(d.usageType||"")}<br />
      <strong>${g(u.quantity||"Fläche (ha)")}:</strong> ${g(hl(d))}<br />
      <strong>${g(u.eppoCode||"EPPO-Code")}:</strong> ${g(d.eppoCode||"")}<br />
      <strong>${g(u.bbch||"BBCH")}:</strong> ${g(d.bbch||"")}<br />
      <strong>${g(u.invekos||"InVeKoS")}:</strong> ${g(d.invekos||"")}<br />
      <strong>${g(x)}:</strong> ${y?g(y):"-"}<br />
      <strong>${g(v)}:</strong> ${$}<br />
      <strong>${g(u.time||"Uhrzeit")}:</strong> ${g(d.uhrzeit||"")}<br />
    </p>
    ${po({maschine:d.qsMaschine,schaderreger:d.qsSchaderreger,verantwortlicher:d.qsVerantwortlicher,wetter:d.qsWetter,behandlungsart:d.qsBehandlungsart})}
    <div class="table-responsive">
      ${p}
    </div>
  `}function vt(e,t){kn();const a=e.querySelector('[data-role="doc-list"]');if(!a)return;const r=e.querySelector("#doc-detail")?.dataset.entryId||null;if(!nt.length)a.innerHTML=ze?'<div class="text-center text-muted py-4">Lädt ...</div>':'<div class="text-center text-muted py-4">Noch keine Einträge</div>';else{a.innerHTML="";const i=document.createDocumentFragment();(t||K().fieldLabels).history?.detail?.usageType,nt.forEach(l=>{const c=document.createElement("div"),u=!!gt?.highlightEntryIds?.has(l.id);c.className=`doc-sidebar-entry list-group-item${u?" doc-sidebar-entry--highlight":""}`,c.dataset.entryId=l.id;const d=xs(l.entry)||"-",p=u?'<span class="badge bg-warning-subtle text-warning-emphasis badge-import">Import</span>':"";c.innerHTML=`
        <div
          class="doc-sidebar-entry__main"
          data-action="view-entry"
          data-entry-id="${l.id}"
        >
          <div class="d-flex justify-content-between gap-2">
            <span class="fw-bold d-flex align-items-center gap-2">
              ${g(l.entry.kultur||"-")}
              ${p}
            </span>
            <small class="text-muted">${g(d)}</small>
          </div>
          <div class="text-muted small mb-1">
            ${g(l.entry.ersteller||"-")} | ${g(l.entry.standort||"-")}
          </div>
          <div class="small text-muted">
            ${g(l.entry.usageType||"-")} · ${g(l.entry.eppoCode||"-")} · ${g(l.entry.invekos||"-")}
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2 gap-2 no-print">
          <button class="btn btn-sm btn-outline-secondary" data-action="print-entry" data-entry-id="${l.id}">Drucken</button>
          <label class="form-check-label d-flex align-items-center gap-2 mb-0">
            <input type="checkbox" class="form-check-input" data-action="toggle-select" data-entry-id="${l.id}" ${Ne.has(l.id)?"checked":""} />
            <span class="small">Auswahl</span>
          </label>
        </div>
      `,i.appendChild(c)}),a.appendChild(i)}ar(e,r),xl(e,t),Va(e),xn(e),ks=new Date().toISOString(),Ml()}function Sa(e,t){const a=e.querySelector('[data-role="doc-info"]');if(!a)return;const n=Ae,r=!!(Z.crop||Z.creator);if(!n&&!ze){a.textContent="Keine Einträge";return}if(!n&&ze){a.textContent="Lädt...";return}if(Z.startDate&&Z.endDate){const i=`${Z.startDate} - ${Z.endDate} (${n})`;a.textContent=r?`${i} + Filter`:i;return}a.textContent=`Alle Einträge (${n})`}async function Ls(e,t){const n=e.querySelector("#doc-detail")?.dataset.entryId;if(!n){sa(e,null,t);return}const r=$t(n);if(!r){sa(e,null,t);return}const i=await Pa(r);i?sa(e,{entry:r,detail:i},t):sa(e,null,t)}async function Pr(e,t,a=ee,n={}){const r=Math.max(0,a),i=!!n.forceReload;i&&(Ue.clear(),_e.clear(),_e.set(0,null),Ae=0,de=[],nt=[],ee=0,Ge=null);const s=i?void 0:Ue.get(r);if(s&&!n.forceReload){ee=r,de=s,Ge=null,vt(e,t),Sa(e),Va(e);return}const l=_e.has(r)?_e.get(r)??null:null,c=Symbol("doc-load");ta=c,ze=!0,Ge=null,Va(e);try{const u=await Yi({cursor:l,pageSize:Ze,filters:Lr(Z),sortDirection:"desc",includeTotal:i||r===0||Ae===0});if(ta!==c)return;const d=u.items.map(p=>Al(p));if(Ue.set(r,d),Kl(r),_e.set(r,l),_e.set(r+1,u.nextCursor??null),typeof u.totalCount=="number")Ae=u.totalCount;else{const p=r*Ze+d.length;Ae=Math.max(Ae,p)}ee=r,de=d,Ge=null,vt(e,t),Sa(e,t)}catch(u){ta===c&&(console.error("Dokumentation konnte nicht geladen werden",u),Ge="Dokumentation konnte nicht geladen werden. Bitte erneut versuchen.",window.alert("Dokumentation konnte nicht geladen werden. Bitte erneut versuchen."))}finally{ta===c&&(ze=!1,ta=null,Va(e))}}async function Jl(e,t){const a=Be(t.history);de=Ol(a.map((n,r)=>$l(n,r)).filter(n=>_l(n.entry,Z))),Ae=de.length,ee=0,Ge=null,kn(),vt(e,t.fieldLabels),Sa(e,t.fieldLabels),await Ls(e,t.fieldLabels)}async function dt(e,t){const a=jt(t),n=!!t.app?.hasDatabase,r=a==="sqlite"&&n;if(ge=r?"sqlite":"memory",Ft.clear(),ee=0,Ge=null,Ae=0,de=[],nt=[],Ue.clear(),_e.clear(),_e.set(0,null),xa(e),Dr(e,t),wn(e),ka(e,t.archives?.logs??[]),Ua=Xn(t.archives?.logs),r){await Pr(e,t.fieldLabels,0,{forceReload:!0}),await Ls(e,t.fieldLabels);return}await Jl(e,t)}async function Fn(){const e=[];for(const t of Ne){const a=ft.get(t)||$t(t);if(!a)continue;const n=await Pa(a);n&&e.push(n)}return e}async function Yl(e,t){if(!t){xa(e),vt(e,K().fieldLabels);return}if(Ne.clear(),ft.clear(),ge==="memory")for(const a of de)Ne.add(a.id),ft.set(a.id,a);else try{const a=await Xi({filters:Lr(Z),sortDirection:"desc",limit:1e4}),n=Array.isArray(a.historyIds)?a.historyIds:[];a.entries.forEach((r,i)=>{const s=Number(n[i]);if(!Number.isFinite(s))return;const l=Tt("sqlite",s);Ne.add(l),ft.set(l,{id:l,entry:r,source:"sqlite",ref:s}),Ft.has(l)||Ft.set(l,r)})}catch(a){console.error("Alle Einträge konnten nicht ausgewählt werden",a),window.alert("Alle Einträge konnten nicht ausgewählt werden. Bitte erneut versuchen.")}vt(e,K().fieldLabels),xn(e)}async function Xl(e,t){if(!Ne.size)return;const a=Array.from(Ne).map(l=>ft.get(l)||$t(l)).filter(l=>!!l),n=[];for(const l of a){const c=await Pa(l);c&&n.push(c)}const r=a.filter(l=>l.source==="sqlite"),i=!!r.length;if(i)for(const l of r)await oo(l.ref);const s=new Set(a.filter(l=>l.source==="state").map(l=>l.ref));if(s.size&&(Ke("history",l=>{const c=Da(l),u=c.items.filter((d,p)=>!s.has(p));return u.length===c.items.length?c:{...c,items:u,totalCount:Math.min(c.totalCount,u.length),lastUpdatedAt:new Date().toISOString()}}),await ec()),n.length){const l=new Set(n.map(c=>Ar(c)));Ss(l)}if(i){try{await Oe()}catch(l){console.warn("SQLite-Datei konnte nach dem Löschen nicht gespeichert werden",l)}t.events?.emit?.("history:data-changed",{type:"deleted",ids:r.map(l=>l.ref)})}xa(e),await dt(e,t.state.getState())}async function Ds(e,t,a){const n=await Pa(t);if(!n){window.alert("Details konnten nicht geladen werden.");return}sa(e,{entry:t,detail:n},a)}async function Di(e){const t=await Pa(e);t?await $s([t]):window.alert("Eintrag konnte nicht geladen werden.")}async function ec(){const e=le();if(!(!e||e==="memory"||e==="sqlite"))try{const t=qe();await He(t)}catch(t){throw console.error("Persist history failed",t),window.alert("Historie konnte nicht gespeichert werden. Bitte erneut versuchen."),t}}async function tc(e,t,a){if(on)return;const n=t.state.getState();if(jt(n)!=="sqlite"||!n.app?.hasDatabase){be(e,"Archivieren ist nur mit einer lokalen SQLite-Datenbank möglich.","warning");return}const i=Il(a);if(!i?.startDate||!i.endDate){be(e,"Bitte Start- und Enddatum für das Archiv wählen.","warning");return}const s=sn(i.startDate),l=sn(i.endDate);if(!s||!l){be(e,"Die angegebenen Daten sind ungültig.","danger");return}if(new Date(s)>new Date(l)){be(e,"Startdatum darf nicht nach dem Enddatum liegen.","danger");return}const c={startDate:s,endDate:l,creator:Z.creator,crop:Z.crop},u=Lr(c);xi(e,!0),be(e,"Prüfe Zeitraum und Eintragsmenge...","info");try{const d=await Yi({cursor:null,pageSize:1,filters:u,sortDirection:"asc",includeTotal:!0}),p=d.totalCount??d.items.length??0;if(!p){be(e,"Im angegebenen Zeitraum wurden keine Einträge gefunden.","warning");return}if(p>fi){be(e,`Maximal ${fi} Einträge pro Archiv erlaubt. Bitte Zeitraum verkürzen.`,"warning");return}be(e,`Exportiere ${p} Einträge in ein ZIP-Archiv...`,"info");const m=await Xi({filters:u,limit:p,sortDirection:"asc"}),y=m?.entries??[];if(!y.length){be(e,"Archiv konnte nicht erstellt werden – Export lieferte keine Einträge.","danger");return}const f=y.map(D=>({...D})),x={format:"pflanzenschutz-archive",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:f.length,filters:{startDate:s,endDate:l,creator:c.creator||null,crop:c.crop||null},archive:{removeFromDatabase:i.removeAfterExport,storageHint:i.storageHint||null,note:i.note||null}},v=es({"pflanzenschutz.json":rn(JSON.stringify(f,null,2)),"metadata.json":rn(JSON.stringify(x,null,2))}),$=new ArrayBuffer(v.byteLength);new Uint8Array($).set(v);const A=new Blob([$],{type:"application/zip"}),R=zl(s,l);Cr(A,R);let Q=!1;if(i.removeAfterExport){be(e,"Export abgeschlossen. Entferne Einträge und bereinige Datenbank...","info"),await no({filters:u});const D=new Set(f.map(I=>Ar(I)));Ss(D);try{await Oe()}catch(I){console.error("SQLite-Datei konnte nach dem Archivieren nicht gespeichert werden",I)}t.events?.emit?.("history:data-changed",{type:"deleted-range",filters:u});try{await ro()}catch(I){Q=!0,console.error("VACUUM fehlgeschlagen",I)}}const O=new Date().toISOString(),J={id:`archive-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,archivedAt:O,startDate:s,endDate:l,entryCount:f.length,fileName:R,storageHint:i.storageHint||void 0,note:i.note||void 0};Q&&(J.note=J.note?`${J.note} | VACUUM fehlgeschlagen`:"VACUUM fehlgeschlagen");const Te={filters:{...c},removeAfterExport:!!i.removeAfterExport,historyIdSample:m?.historyIds?.slice(0,gi)};if(await Nl(J,Te),!i.removeAfterExport&&m?.historyIds?.length){const D=m.historyIds.slice(0,gi).map(I=>({source:"sqlite",ref:I}));t.events?.emit?.("documentation:focus-range",{startDate:s,endDate:l,label:"Archiviert",reason:"archive",entryIds:D})}Yn(e,!1),a.reset(),wn(e),await dt(e,t.state.getState());const M=i.removeAfterExport?`Archiv ${R} erstellt und ${f.length} Einträge entfernt.`:`Archiv ${R} erstellt. ${f.length} Einträge bleiben in der Datenbank.`;be(e,M,Q?"warning":"success")}catch(d){console.error("Archivieren fehlgeschlagen",d);const p=d instanceof Error?d.message:"Archiv konnte nicht erstellt werden.";be(e,p,"danger")}finally{xi(e,!1),Dr(e,t.state.getState())}}const ac=50;async function $s(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}if(e.length>ac&&!window.confirm(`Sie möchten ${e.length} Einträge drucken. Bei sehr vielen Einträgen kann das Erstellen der Druckvorschau einige Sekunden dauern und lässt sich nicht unterbrechen.

Fortfahren?`))return;const t=K().fieldLabels,a=io(K().company||null);await so(e,t,{title:"Dokumentation",headerHtml:a,chunkSize:25})}function Cr(e,t){const a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download=t,n.click(),URL.revokeObjectURL(a)}function nc(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const t=e.map(s=>({...s})),a=JSON.stringify(t,null,2),n=new TextEncoder().encode(a),r=new Blob([n],{type:"application/json; charset=utf-8"}),i=new Date().toISOString().replace(/[:.]/g,"-");Cr(r,`pflanzenschutz-dokumentation-${i}.json`)}async function rc(e,t){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const a=e.map(c=>({...c})),n={format:"pflanzenschutz-export",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:a.length,filters:{startDate:t.startDate||null,endDate:t.endDate||null,creator:t.creator||null,crop:t.crop||null}},r=es({"pflanzenschutz.json":rn(JSON.stringify(a,null,2)),"metadata.json":rn(JSON.stringify(n,null,2))}),i=new ArrayBuffer(r.byteLength);new Uint8Array(i).set(r);const s=new Blob([i],{type:"application/zip"}),l=new Date().toISOString().replace(/[:.]/g,"-");Cr(s,`pflanzenschutz-dokumentation-${l}.zip`)}function ic(){const e=document.createElement("div"),t=Er(),a=Z.startDate||t.startDate||"",n=Z.endDate||t.endDate||"";Z={...Z,startDate:a,endDate:n};const r=Kt.enabled?`<button class="btn btn-outline-info btn-sm" type="button" data-action="doc-seed">+ ${Kt.count} Dummy-Einträge</button>`:"";return e.className="section-inner",e.innerHTML=`
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
            <small class="text-muted">Letzte ${Sr}</small>
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
  `,e}function sc(e){if(!e)return{};const t=new FormData(e),a=r=>{const i=t.get(r);return typeof i=="string"&&i?i:void 0},n=r=>{const i=t.get(r);if(typeof i!="string")return;const s=i.trim();return s||void 0};return{startDate:a("doc-start"),endDate:a("doc-end"),crop:n("doc-crop"),creator:n("doc-creator")}}let $i="entries";function oc(e,t){$i!==t&&($i=t,e.querySelectorAll("[data-doc-tab]").forEach(a=>{a.classList.toggle("active",a.dataset.docTab===t)}),e.querySelectorAll("[data-pane]").forEach(a=>{a.style.display=a.dataset.pane===t?"block":"none"}))}function lc(e,t){e.addEventListener("click",a=>{const n=a.target.closest("[data-doc-tab]");if(n&&n.dataset.docTab){oc(e,n.dataset.docTab);return}}),e.addEventListener("submit",a=>{if(a.target instanceof HTMLFormElement){if(a.target.id==="doc-filter"){a.preventDefault(),Bn(e,t,{refreshList:!0});const n=sc(a.target);if(!n.startDate||!n.endDate){window.alert("Bitte Start- und Enddatum auswählen.");return}Z=n,xa(e),dt(e,t.state.getState());return}a.target.dataset.role==="archive-form"&&(a.preventDefault(),tc(e,t,a.target))}}),e.addEventListener("click",a=>{const n=a.target;if(!n)return;const r=n.dataset.action;if(!r){n.closest("[data-action]")&&a.stopPropagation();return}if(r==="reset-filters"){const l=e.querySelector("#doc-filter");l?.reset(),Z=Er(),ys(l??null,Z),Bn(e,t,{refreshList:!0}),xa(e),dt(e,t.state.getState());return}if(r==="archive-toggle"){Yn(e),be(e,"");return}if(r==="archive-cancel"){Yn(e,!1),be(e,"");return}if(r==="archive-log-focus"){const l=n.dataset.logId;if(!l)return;const c=Si(t.state.getState(),l);if(!c){window.alert("Archiv-Eintrag nicht gefunden.");return}const u=c.fileName?`Archiv ${c.fileName}`:"Archivierter Zeitraum";typeof t.events?.emit=="function"?t.events.emit("documentation:focus-range",{startDate:c.startDate,endDate:c.endDate,label:u,reason:"archive-log"}):(Z={...Z,startDate:c.startDate,endDate:c.endDate},dt(e,t.state.getState())),be(e,`Dokumentation auf Archiv ${c.startDate} – ${c.endDate} fokussiert.`,"success");return}if(r==="archive-log-copy-hint"){const l=n.dataset.logId;if(!l)return;const c=Si(t.state.getState(),l);if(!c||!c.storageHint){window.alert("Kein Speicherhinweis vorhanden.");return}const u=c.storageHint;(async()=>{try{await Tl(u),be(e,"Speicherhinweis kopiert.","success")}catch(d){console.error("Hinweis konnte nicht kopiert werden",d),window.alert("Hinweis konnte nicht kopiert werden.")}})();return}if(r==="doc-focus-clear"){Bn(e,t,{refreshList:!0});return}if(r==="print-selection"||r==="pdf-selection"){(async()=>{const l=await Fn();await $s(l)})();return}if(r==="export-selection"){(async()=>{const l=await Fn();nc(l)})();return}if(r==="export-zip"){(async()=>{const l=await Fn();await rc(l,Z)})();return}if(r==="delete-selection"){if(!Ne.size||!window.confirm("Ausgewählte Einträge wirklich löschen?"))return;Xl(e,t);return}if(r==="doc-seed"){if(!Kt.enabled||ma)return;const c=window.__PSL?.seedHistoryEntries;if(typeof c!="function"){window.alert("Seed-Funktion ist nicht verfügbar. Bitte Entwicklungsmodus verwenden.");return}ma=!0,tr(e),(async()=>{try{await c(Kt.count),await dt(e,t.state.getState())}catch(u){console.error("Dummy-Daten konnten nicht erstellt werden",u),window.alert("Dummy-Daten konnten nicht erstellt werden.")}finally{ma=!1,tr(e)}})();return}if(r==="detail-print"){const c=e.querySelector("#doc-detail")?.dataset.entryId;if(!c){window.alert("Kein Eintrag ausgewählt.");return}const u=$t(c);if(!u){window.alert("Eintrag nicht verfügbar.");return}Di(u);return}const i=n.dataset.entryId;if(!i)return;const s=$t(i);if(!s){window.alert("Eintrag nicht verfügbar.");return}if(r==="view-entry"){Ds(e,s,t.state.getState().fieldLabels);return}if(r==="print-entry"){Di(s);return}}),e.addEventListener("change",a=>{const n=a.target;if(!n)return;if(n.dataset.action==="toggle-select-all"){Yl(e,n.checked);return}if(n.dataset.action!=="toggle-select")return;const r=n.dataset.entryId;if(r){if(n.checked){Ne.add(r);const i=$t(r);i&&ft.set(r,i)}else Ne.delete(r),ft.delete(r);xn(e)}})}function cc(e,t){if(!e||vi)return;const a=e;a.innerHTML="";const n=ic();a.appendChild(n),lc(n,t),tr(n),Dr(n,t.state.getState()),wn(n);const r=t.state.getState().archives?.logs??[];ka(n,r),Ua=Xn(r),$r(),typeof t.events?.subscribe=="function"&&t.events.subscribe("documentation:focus-range",l=>{!l||typeof l!="object"||Sl(n,t,l)});const i=l=>Be(l.history).length,s=()=>dt(n,t.state.getState());ki?.(),ki=fs({section:"documentation",event:"history:data-changed",shouldHandleEvent:()=>ge==="sqlite",shouldRefresh:()=>ge==="sqlite",onRefresh:()=>s(),onStatusChange:l=>kl(n,l)}),aa=i(t.state.getState()),s(),t.state.subscribe(l=>{const c=Xn(l.archives?.logs);c!==Ua&&(Ua=c,ka(n,l.archives?.logs??[]));const u=i(l);if(Jn){aa=u;return}if(ge==="sqlite"){aa=u;return}u!==aa&&(aa=u,s())}),vi=!0}const Ea=e=>Be(e.gps.points),oa=e=>Be(e.points),dc=new Intl.NumberFormat("de-DE",{minimumFractionDigits:5,maximumFractionDigits:5}),uc=new Intl.DateTimeFormat("de-DE",{dateStyle:"short",timeStyle:"short"}),Ai="Deutschland";let Pi=!1,As="list",Ra=null,L=null,na=null,Ci=null;const Za=25,Tn=new Intl.NumberFormat("de-DE");let he=0,It=null,nr=null,Mi=null;function Ct(e,t){typeof e.events?.emit=="function"&&e.events.emit("history:gps-activation-result",{...t,source:"gps",timestamp:Date.now()})}function fa(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function pc(){const e=document.createElement("section");return e.className="section-inner",e.innerHTML=`
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
  `,e}function mc(e){return{root:e,message:e.querySelector('[data-role="gps-message"]'),refreshIndicator:e.querySelector('[data-role="gps-refresh-indicator"]'),availability:e.querySelector('[data-role="gps-availability"]'),tabButtons:Array.from(e.querySelectorAll('[data-role="gps-tab"]')),panels:Array.from(e.querySelectorAll('[data-role="gps-panel"]')),listBody:e.querySelector('[data-role="gps-list"]'),emptyState:e.querySelector('[data-role="gps-empty"]'),activeInfo:e.querySelector('[data-role="gps-active-info"]'),summaryLabel:e.querySelector('[data-role="gps-summary"]'),statusBadge:e.querySelector('[data-role="gps-status"]'),form:e.querySelector('[data-role="gps-form"]'),formFields:{name:e.querySelector('[name="gps-name"]'),description:e.querySelector('[name="gps-description"]'),latitude:e.querySelector('[name="gps-latitude"]'),longitude:e.querySelector('[name="gps-longitude"]'),source:e.querySelector('[name="gps-source"]'),activate:e.querySelector('[name="gps-activate"]'),rawCoordinates:e.querySelector('[name="gps-raw-coordinates"]')},disableTargets:Array.from(e.querySelectorAll("[data-gps-disable]")),geolocationBtn:e.querySelector('[data-action="use-geolocation"]'),mapButton:e.querySelector('[data-role="gps-open-maps"]'),verifyButton:e.querySelector('[data-action="verify-coords"]')}}function la(e){return`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e)}`}function Ps(e){const t=e.gps,a=oa(t),n=s=>{if(!s)return null;const l=$a(s)||la(`${s.latitude},${s.longitude}`),c=s.name?`${s.name}`:`${Rt(s.latitude)}, ${Rt(s.longitude)}`;return{url:l,label:c}};if(t.activePointId){const s=a.find(c=>c.id===t.activePointId),l=n(s||null);if(l)return l}if(a.length>0){const s=n(a[0]);if(s)return s}const r=e.company?.address?.trim();if(r)return{url:la(r.replace(/\n/g,", ")),label:r};const i=e.company?.name?.trim();return i?{url:la(i),label:i}:{url:la(Ai),label:Ai}}function fc(e){if(!L)return;const t=Ps(e);L.mapButton&&(L.mapButton.href=t.url,L.mapButton.title=`Google Maps öffnen (${t.label})`);const a=L.root.querySelector('[data-role="gps-empty-map-link"]');a&&(a.href=t.url)}function gc(e){if(!e)return null;const a=e.trim().replace(/\s+/g," ").replace(/[,;]/g," ").match(/-?\d+(?:[.,]\d+)?/g);if(!a||a.length<2)return null;const n=s=>Number(s.replace(/,/g,".")),r=n(a[0]),i=n(a[1]);return!Number.isFinite(r)||!Number.isFinite(i)||r<-90||r>90||i<-180||i>180?null:{latitude:r,longitude:i}}function bc(){if(!L?.formFields)return null;const e=L.formFields.latitude?.value??"",t=L.formFields.longitude?.value??"";if(!e.trim()||!t.trim())return null;const a=Number(e),n=Number(t);return!Number.isFinite(a)||!Number.isFinite(n)||a<-90||a>90||n<-180||n>180?null:{latitude:a,longitude:n}}function Wa(e){return Number(e).toFixed(6)}function hc(e,t){const a=Wa(e),n=Wa(t);return Ea(K()).some(r=>Wa(r.latitude)===a&&Wa(r.longitude)===n)}function ga(){if(!L?.verifyButton)return;const e=bc(),t=!!e;if(L.verifyButton.disabled=!t,e){const a=$a({latitude:e.latitude,longitude:e.longitude});L.verifyButton.dataset.targetUrl=a||la(`${e.latitude},${e.longitude}`)}else delete L.verifyButton.dataset.targetUrl}function Rt(e){const t=Number(e);return Number.isFinite(t)?`${dc.format(t)}°`:"–"}function vc(e){if(!e)return"–";const t=new Date(e);return Number.isNaN(t.getTime())?"–":uc.format(t)}function se(e,t="info",a=4500){if(L?.message){if(Ra&&(window.clearTimeout(Ra),Ra=null),!e){L.message.classList.add("d-none"),L.message.textContent="";return}L.message.className=`alert alert-${t}`,L.message.textContent=e,L.message.classList.remove("d-none"),a>0&&(Ra=window.setTimeout(()=>{L?.message?.classList.add("d-none")},a))}}function yc(e){const t=L?.refreshIndicator;if(t){if(t.classList.remove("alert-warning","alert-info"),e==="idle"){t.classList.add("d-none");return}t.classList.remove("d-none"),e==="stale"?(t.classList.add("alert-warning"),t.textContent="GPS-Daten wurden geändert. Ansicht aktualisiert sich beim Öffnen."):(t.classList.add("alert-info"),t.textContent="GPS-Daten werden aktualisiert...")}}function Cs(e){L&&(As=e,L.tabButtons.forEach(t=>{const a=t.dataset.tab===e;t.classList.toggle("active",a)}),L.panels.forEach(t=>{const a=t.getAttribute("data-panel")===e;t.classList.toggle("d-none",!a)}))}function Fe(e){return e?.hasDatabase?e.storageDriver!=="sqlite"?"wrong-driver":"ok":"no-db"}function wc(e){if(L?.availability){if(e==="ok"){L.availability.classList.add("d-none"),L.availability.textContent="";return}L.availability.classList.remove("d-none"),L.availability.textContent=e==="no-db"?"Bitte verbinden Sie zuerst eine Datenbank, um GPS-Punkte zu verwalten.":"GPS-Funktionen benötigen eine aktive SQLite-Datenbank. Bitte den SQLite-Treiber in den Einstellungen auswählen."}}function qt(e,t){if(!L)return;const a=t!=="ok"||e.pending||ya.isLocked();if(L.disableTargets.forEach(n=>{(n instanceof HTMLButtonElement||n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n instanceof HTMLSelectElement)&&(n.disabled=a)}),L.statusBadge){let n="badge bg-success",r="Bereit";t==="no-db"?(n="badge bg-secondary",r="Keine Datenbank"):t==="wrong-driver"?(n="badge bg-warning text-dark",r="Nur mit SQLite"):(e.pending||ya.isLocked())&&(n="badge bg-info text-dark",r="Wird verarbeitet"),L.statusBadge.className=n,L.statusBadge.textContent=r}}function Ms(e){const t=e.length;if(!t)return he=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/Za),1);he>=a&&(he=a-1),he<0&&(he=0);const n=he*Za,r=Math.min(n+Za,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function kc(){if(!L?.root)return null;const e=L.root.querySelector('[data-role="gps-pager"]');return e?((!It||nr!==e)&&(It?.destroy(),It=Aa(e,{onPrev:()=>Sc(),onNext:()=>Ec(),labels:{prev:"Zurück",next:"Weiter",loading:"GPS-Punkte werden geladen...",empty:"Keine GPS-Punkte verfügbar"}}),nr=e),It):null}function Ii(e,t){const a=kc();if(!a)return;if(t!=="ok"){he=0;const s=t==="no-db"?"Keine Datenbank verbunden.":"Nur mit SQLite verfügbar.";a.update({status:"disabled",info:s});return}const n=Ea(e).length;if(!n){he=0;const s=e.gps.initialized?"Noch keine GPS-Punkte vorhanden.":"GPS-Punkte werden geladen...";a.update({status:"disabled",info:s});return}const{start:r,end:i}=Ms(Ea(e));a.update({status:"ready",info:`Einträge ${Tn.format(r+1)}–${Tn.format(i)} von ${Tn.format(n)}`,canPrev:he>0,canNext:i<n})}function xc(e,t){return e.length?e.map(a=>{const n=a.id===t,r=a.description?`<div class="text-muted small">${g(a.description)}</div>`:"",i=a.source?`<span class="badge-psm badge-psm-neutral">${g(a.source)}</span>`:'<span class="text-muted">–</span>',s=n?'<span class="badge bg-success ms-2">Aktiv</span>':"",l=$a(a),c=l?`<a class="btn btn-outline-info" href="${fa(l)}" target="_blank" rel="noopener noreferrer">
              Karte
            </a>`:"";return`
        <tr data-point-id="${fa(a.id)}">
          <td>
            <div class="fw-semibold">${g(a.name||"Ohne Namen")}${s}</div>
            ${r}
          </td>
          <td class="font-monospace">
            <div>${Rt(a.latitude)}</div>
            <div>${Rt(a.longitude)}</div>
          </td>
          <td>
            <div>${i}</div>
            <div class="text-muted small">${vc(a.updatedAt)}</div>
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
`):""}function Mr(e,t){if(!L)return;const a=e.gps,n=Ps(e),r=t==="ok";if(L.summaryLabel){const i=oa(a).length;L.summaryLabel.textContent=r?`${i} Punkt${i===1?"":"e"} gespeichert`:"Funktion derzeit nicht verfügbar"}if(!r){L.listBody&&(L.listBody.innerHTML=""),L.emptyState&&(L.emptyState.textContent=t==="no-db"?"Keine Datenbank verbunden.":"Bitte SQLite als Speicher-Treiber aktivieren.",L.emptyState.classList.remove("d-none")),L.activeInfo&&(L.activeInfo.textContent=t==="no-db"?"Wartet auf Datenbank.":"Nur mit SQLite verfügbar."),Ii(e,t);return}if(L.listBody){const{items:i}=Ms(oa(a));L.listBody.innerHTML=xc(i,a.activePointId)}if(L.emptyState){const i=oa(a).length>0;L.emptyState.classList.toggle("d-none",i),!i&&a.initialized?L.emptyState.innerHTML=`
        <p class="mb-2">Noch keine GPS-Punkte vorhanden.</p>
        <p class="small text-muted mb-3">
          Nutzen Sie "Neuer Punkt" oder öffnen Sie Google Maps, um Koordinaten zu ermitteln.
        </p>
        <a class="btn btn-outline-info btn-sm" data-role="gps-empty-map-link" href="${fa(n.url)}" target="_blank" rel="noopener noreferrer">
          <i class="bi bi-box-arrow-up-right me-1"></i>
          Google Maps öffnen
        </a>
      `:a.initialized||(L.emptyState.textContent="GPS-Punkte werden geladen...")}if(L.activeInfo)if(a.activePointId){const i=oa(a).find(s=>s.id===a.activePointId);if(i){const s=`${i.name||"Ohne Namen"} (${Rt(i.latitude)}, ${Rt(i.longitude)})`,l=$a(i);l?L.activeInfo.innerHTML=`${g(s)} <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${fa(l)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:L.activeInfo.textContent=s}else L.activeInfo.textContent="Aktiver Punkt nicht gefunden."}else L.activeInfo.innerHTML=`Kein aktiver Punkt ausgewählt. <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${fa(n.url)}" target="_blank" rel="noopener noreferrer">Google Maps öffnen</a>`;Ii(e,t)}function Sc(){if(he===0)return;he=Math.max(he-1,0);const e=K(),t=Fe(e.app);Mr(e,t)}function Ec(){const e=K(),t=Ea(e).length;if(!t)return;const a=Math.max(Math.ceil(t/Za)-1,0);if(he>=a)return;he=Math.min(he+1,a);const n=Fe(e.app);Mr(e,n)}function Se(e){`${new Date().toLocaleString("de-DE")}${e}`}function Ca(e){if(!e)return null;const t=K();return Ea(t).find(a=>a.id===e)||null}async function Lc(e){if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(e);return}const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}function Dc(){if(!L?.formFields?.rawCoordinates)return;const e=L.formFields.rawCoordinates.value,t=gc(e);if(!t){se("Koordinaten konnten nicht erkannt werden. Bitte Format 47.68952, 9.12091 verwenden.","warning",6e3);return}const a=t.latitude.toFixed(6),n=t.longitude.toFixed(6);L.formFields.latitude&&(L.formFields.latitude.value=a),L.formFields.longitude&&(L.formFields.longitude.value=n),se("Koordinaten übernommen.","success"),ga()}function $c(){if(!L?.verifyButton)return;const e=L.verifyButton.dataset.targetUrl;if(!e){se("Bitte zuerst gültige Koordinaten eintragen, bevor die Prüfung geöffnet wird.","warning",6e3);return}window.open(e,"_blank","noopener,noreferrer")}async function rr(e={}){const{notify:t=!1}=e;if(!(!L||Fe(K().app)!=="ok"||K().gps.pending))try{await Ji(),t&&se("GPS-Punkte aktualisiert.","success"),Se("GPS-Punkte synchronisiert.")}catch(n){const r=n instanceof Error?n.message:"GPS-Punkte konnten nicht geladen werden.";se(r,"danger",7e3),Se(`Fehler beim Laden: ${r}`)}}async function Ac(e){if(!e)return;const t=Ca(e);if(!t){se("Ausgewählter GPS-Punkt wurde nicht gefunden.","warning");return}try{await as(t.id),se(`"${t.name}" ist nun aktiv.`,"success"),Se(`Aktiver GPS-Punkt: ${t.name}`)}catch(a){const n=a instanceof Error?a.message:"GPS-Punkt konnte nicht aktiviert werden.";se(n,"danger",7e3),Se(`Fehler beim Aktivieren: ${n}`)}}async function Pc(e){if(!e)return;const t=Ca(e);if(!t){se("GPS-Punkt existiert nicht mehr.","warning");return}if(window.confirm(`"${t.name}" wirklich löschen? Dieser Schritt kann nicht rückgängig gemacht werden.`))try{await go(t.id),se(`"${t.name}" wurde gelöscht.`,"success"),Se(`GPS-Punkt gelöscht: ${t.name}`)}catch(n){const r=n instanceof Error?n.message:"GPS-Punkt konnte nicht gelöscht werden.";se(r,"danger",7e3),Se(`Löschen fehlgeschlagen: ${r}`)}}async function Cc(e){if(!e)return;const t=Ca(e);if(!t){se("GPS-Punkt nicht gefunden.","warning");return}const a=`${t.latitude}, ${t.longitude}`;try{await Lc(a),se("Koordinaten in die Zwischenablage kopiert.","success")}catch(n){console.error("clipboard error",n),se("Koordinaten konnten nicht kopiert werden.","danger",7e3)}}async function Mc(e,t){const a=(e||"").trim();if(!a){Ct(t,{status:"error",id:"",message:"Ungültige GPS-Anfrage ohne ID."});return}if(Fe(K().app)!=="ok"){se("GPS-Modul ist ohne aktive SQLite-Datenbank nicht verfügbar.","warning",6e3),Ct(t,{status:"error",id:a,message:"GPS-Modul ist derzeit nicht verfügbar."});return}const r=Ca(a);if(!r){se("Verknüpfter GPS-Punkt wurde nicht gefunden.","warning",6e3),Ct(t,{status:"error",id:a,message:"Verknüpfter GPS-Punkt wurde nicht gefunden."});return}Ct(t,{status:"pending",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wird aktiviert...`});try{await as(r.id),se(`"${r.name||"Ohne Namen"}" wurde aus der Historie aktiviert.`,"success"),Se(`Aus Historie aktiviert: ${r.name||r.id}`),Ct(t,{status:"success",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wurde aktiviert.`})}catch(i){const s=i instanceof Error?i.message:"GPS-Punkt konnte nicht aktiviert werden.";se(s,"danger",7e3),Se(`Aktivierung aus Historie fehlgeschlagen: ${s}`),Ct(t,{status:"error",id:r.id,name:r.name,message:s})}}async function Ic(){try{await bo(),Se("Aktiver GPS-Punkt synchronisiert."),se("Aktiver GPS-Punkt wurde synchronisiert.","success")}catch(e){const t=e instanceof Error?e.message:"Aktiver GPS-Punkt konnte nicht ermittelt werden.";se(t,"danger",7e3),Se(`Sync fehlgeschlagen: ${t}`)}}function zc(){if(!L?.formFields)throw new Error("Formular nicht initialisiert");const e=L.formFields.name?.value.trim()||"",t=L.formFields.description?.value.trim()||"",a=L.formFields.source?.value.trim()||"",n=Number(L.formFields.latitude?.value),r=Number(L.formFields.longitude?.value),i=!!L.formFields.activate?.checked;if(!e)throw new Error("Name darf nicht leer sein.");if(!Number.isFinite(n)||!Number.isFinite(r))throw new Error("Koordinaten sind ungültig.");return{name:e,description:t,latitude:n,longitude:r,source:a,activate:i}}async function Bc(e){if(e.preventDefault(),ya.isLocked()){se("Speichern läuft bereits ...","info");return}try{const t=zc();if(hc(t.latitude,t.longitude)){se("Ein GPS-Punkt mit identischen Koordinaten ist bereits vorhanden.","warning",6e3);return}qt(K().gps,Fe(K().app)),await ho({name:t.name,description:t.description||null,latitude:t.latitude,longitude:t.longitude,source:t.source||null},{activate:t.activate}),C.success(`GPS-Punkt "${t.name}" gespeichert.`),Se(`GPS-Punkt gespeichert${t.activate?" und aktiv gesetzt":""}: ${t.name}`),L?.form?.reset()}catch(t){const a=t instanceof Error?t.message:"GPS-Punkt konnte nicht gespeichert werden.";C.error(a),Se(`Speichern fehlgeschlagen: ${a}`)}finally{qt(K().gps,Fe(K().app))}}function Nc(){if(L?.formFields){if(!navigator.geolocation){C.warning("Geolocation wird von diesem Browser nicht unterstützt.");return}if(ya.isLocked()){C.info("Bitte warten...");return}ya.acquire(async()=>(qt(K().gps,Fe(K().app)),new Promise(e=>{navigator.geolocation.getCurrentPosition(t=>{const{latitude:a,longitude:n}=t.coords;L?.formFields.latitude&&(L.formFields.latitude.value=a.toFixed(6)),L?.formFields.longitude&&(L.formFields.longitude.value=n.toFixed(6)),L?.formFields.source&&!L.formFields.source.value.trim()&&(L.formFields.source.value="Browser"),C.success("Koordinaten aus Browser-Position übernommen."),Se("Browser-Geolocation übernommen"),ga(),qt(K().gps,Fe(K().app)),e()},t=>{const a=t.code===t.PERMISSION_DENIED?"Zugriff auf Standort wurde verweigert.":"Geolocation konnte nicht ermittelt werden.";C.warning(a),Se(`Geolocation fehlgeschlagen: ${a}`),qt(K().gps,Fe(K().app)),e()},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})})))}}function Fc(){L&&(L.root.addEventListener("click",e=>{const t=e.target;if(!t)return;const a=t.closest('[data-role="gps-tab"]');if(a&&a.dataset.tab){Cs(a.dataset.tab);return}const n=t.closest("[data-action]");if(!n||n.dataset.action==="")return;const i=n.closest("[data-point-id]")?.getAttribute("data-point-id")||"";switch(n.dataset.action){case"reload-points":rr({notify:!0});break;case"sync-active":Ic();break;case"set-active":Ac(i);break;case"delete-point":Pc(i);break;case"copy-coords":Cc(i);break;case"use-geolocation":Nc();break;case"apply-raw-coords":Dc();break;case"verify-coords":$c();break}}),L.form?.addEventListener("submit",e=>{Bc(e)}),L.form?.addEventListener("reset",()=>{window.setTimeout(()=>{ga()},0)}),L.formFields.latitude?.addEventListener("input",()=>{ga()}),L.formFields.longitude?.addEventListener("input",()=>{ga()}))}function Tc(e,t){if(!e||Pi)return;Pi=!0;const a=e;a.innerHTML="";const n=pc();a.appendChild(n),L=mc(n),Mi?.(),Mi=fs({section:"gps",event:"gps:data-changed",shouldHandleEvent:()=>Fe(t.state.getState().app)==="ok",shouldRefresh:()=>Fe(t.state.getState().app)==="ok",onRefresh:()=>rr({notify:!1}),onStatusChange:s=>yc(s)}),he=0,It?.destroy(),It=null,nr=null,Fc(),Cs(As),typeof t.events?.subscribe=="function"&&t.events.subscribe("gps:set-active-from-history",s=>{let l="";if(s&&typeof s=="object"&&(l=String(s.id||"").trim()),!l){se("Historische GPS-Anfrage ohne gültige ID erhalten.","warning",6e3);return}Mc(l,t)});const r=t.state.getState();na=r.gps.activePointId;const i=(s,l)=>{const c=Fe(s.app),u=s.gps;if(wc(c),Mr(s,c),qt(u,c),fc(s),c==="ok"&&!u.initialized&&!u.pending&&rr({notify:!1}),c==="ok"&&Ci!=="ok"&&u.initialized&&se("GPS-Bereich ist wieder verfügbar.","success"),Ci=c,s.gps.activePointId!==na&&(na=s.gps.activePointId,typeof t.events?.emit=="function")){const d=Ca(na);t.events.emit("gps:active-point-changed",{id:na,point:d})}s.gps.lastError&&s.gps.lastError!==l.gps.lastError&&(se(s.gps.lastError,"danger",7e3),Se(`Fehler: ${s.gps.lastError}`))};t.state.subscribe(i),i(r,r)}let Pe=[],Ce=[],ir=!1,Qa=null;async function Je(){try{const[e,t]=await Promise.all([xo({limit:100}),So({limit:100})]);Pe=e.items||[],Ce=t.items||[],an("savedCodes:changed",{eppoCount:Pe.length,bbchCount:Ce.length})}catch(e){console.error("Failed to load saved codes:",e),Pe=[],Ce=[]}}function qc(){const e=Pe.length>0,t=Ce.length>0;return`
    <div class="row g-4">
      <!-- EPPO Codes Section -->
      <div class="col-lg-6">
        <div class="card card-dark codes-card h-100">
          <div class="card-header codes-card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="bi bi-flower1 me-2 text-success"></i>
              Kulturen (EPPO-Codes)
            </h5>
            <span class="badge badge-psm-neutral">${Pe.length} gespeichert</span>
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
                  <span class="badge bg-success ms-2">${Pe.length}</span>
                </h6>
                <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${sr()}
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
            <span class="badge badge-psm-neutral">${Ce.length} gespeichert</span>
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
                  <span class="badge bg-info ms-2">${Ce.length}</span>
                </h6>
                <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${or()}
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
  `}function sr(){return Pe.length?Pe.map(e=>`
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
    `}function or(){return Ce.length?Ce.map(e=>`
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
    `}function Ye(e){const t=e.querySelector('[data-role="saved-eppo-list"]'),a=Pe.length>0;if(t){const l=t.closest(".border-top");l&&a&&(l.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Kulturen
            <span class="badge bg-success ms-2">${Pe.length}</span>
          </h6>
          <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${sr()}
          </div>
        `)}else if(a){const l=e.querySelector(".codes-card:first-child .border-top.pt-3.mb-3");l&&(l.innerHTML=`
        <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
          <i class="bi bi-bookmark-star me-1"></i>
          Meine Kulturen
          <span class="badge bg-success ms-2">${Pe.length}</span>
        </h6>
        <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
          ${sr()}
        </div>
      `)}const n=e.querySelector('[data-role="saved-bbch-list"]'),r=Ce.length>0;if(n){const l=n.closest(".border-top");l&&r&&(l.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${Ce.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${or()}
          </div>
        `)}else if(r){const c=e.querySelectorAll(".codes-card")[1];if(c){const u=c.querySelector(".border-top.pt-3.mb-3");u&&(u.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${Ce.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${or()}
          </div>
        `)}}const i=e.querySelector(".codes-card:first-child .card-header .badge"),s=e.querySelector(".codes-card:last-child .card-header .badge");i&&(i.textContent=`${Pe.length} gespeichert`),s&&(s.textContent=`${Ce.length} gespeichert`)}function Hc(e){const t=e.querySelector('[data-input="eppo-search"]'),a=e.querySelector('[data-role="eppo-search-results"]');if(t&&a){const l=Gr(async()=>{const c=t.value.trim();if(c.length<2){a.innerHTML="";return}try{const u=await wo(c,10);if(!u.length){a.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${g(c)}"</div>
          `;return}a.innerHTML=u.map(d=>`
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
        `).join("")}catch(u){console.error("EPPO search failed:",u),a.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);t.addEventListener("input",l)}const n=e.querySelector('[data-input="bbch-search"]'),r=e.querySelector('[data-role="bbch-search-results"]');if(n&&r){const l=Gr(async()=>{const c=n.value.trim();if(c.length<1){r.innerHTML="";return}try{const u=await ko(c,10);if(!u.length){r.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${g(c)}"</div>
          `;return}r.innerHTML=u.map(d=>`
          <button type="button" class="list-group-item list-group-item-action d-flex align-items-start gap-2 py-2" 
                  data-action="select-bbch" 
                  data-code="${g(d.code)}" 
                  data-label="${g(d.label)}"
                  data-principal="${d.principalStage??""}"
                  data-secondary="${d.secondaryStage??""}">
            <strong class="text-info flex-shrink-0" style="min-width: 35px;">${g(d.code)}</strong>
            <span class="text-break" style="line-height: 1.4;">${g(d.label)}</span>
          </button>
        `).join("")}catch(u){console.error("BBCH search failed:",u),r.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);n.addEventListener("input",l)}e.dataset.codesClickBound!=="1"&&(e.dataset.codesClickBound="1",e.addEventListener("click",async l=>{const u=l.target.closest("[data-action]");if(!u)return;const d=u.dataset.action;if(d==="select-eppo"){const p=u.dataset.code||"",m=u.dataset.name||"",y=u.dataset.language||"",f=u.dataset.dtcode||"";if(!p||!m){console.warn("EPPO selection missing code or name");return}a&&(a.innerHTML=""),t&&(t.value="");const x=Pe.find(v=>v.code.toUpperCase()===p.toUpperCase());if(x){const v=e.querySelector(`[data-eppo-id="${x.id}"]`);v&&(v.classList.add("flash-highlight"),setTimeout(()=>v.classList.remove("flash-highlight"),800));return}try{await Cn({code:p,name:m,language:y||void 0,dtcode:f||void 0,isFavorite:!1});const v=qe();await He(v),await Je(),Ye(e)}catch(v){console.error("Failed to save EPPO from search:",v),alert("Speichern fehlgeschlagen")}}if(d==="select-bbch"){const p=u.dataset.code||"",m=u.dataset.label||"",y=u.dataset.principal,f=u.dataset.secondary,x=y?parseInt(y,10):void 0,v=f?parseInt(f,10):void 0;if(!p||!m){console.warn("BBCH selection missing code or label");return}r&&(r.innerHTML=""),n&&(n.value="");const $=Ce.find(A=>A.code===p);if($){const A=e.querySelector(`[data-bbch-id="${$.id}"]`);A&&(A.classList.add("flash-highlight"),setTimeout(()=>A.classList.remove("flash-highlight"),800));return}try{await Mn({code:p,label:m,principalStage:Number.isNaN(x)?void 0:x,secondaryStage:Number.isNaN(v)?void 0:v,isFavorite:!1});const A=qe();await He(A),await Je(),Ye(e)}catch(A){console.error("Failed to save BBCH from search:",A),alert("Speichern fehlgeschlagen")}}if(d==="toggle-favorite-eppo"){const p=u.dataset.id;if(!p)return;const m=Pe.find(y=>y.id===p);if(!m)return;try{await Cn({id:m.id,code:m.code,name:m.name,language:m.language,dtcode:m.dtcode,isFavorite:!m.isFavorite});const y=qe();await He(y),await Je(),Ye(e)}catch(y){console.error("Failed to toggle EPPO favorite:",y)}}if(d==="toggle-favorite-bbch"){const p=u.dataset.id;if(!p)return;const m=Ce.find(y=>y.id===p);if(!m)return;try{await Mn({id:m.id,code:m.code,label:m.label,principalStage:m.principalStage,secondaryStage:m.secondaryStage,isFavorite:!m.isFavorite});const y=qe();await He(y),await Je(),Ye(e)}catch(y){console.error("Failed to toggle BBCH favorite:",y)}}if(d==="delete-eppo"){const p=u.dataset.id;if(!p||!confirm("EPPO-Code wirklich löschen?"))return;try{await vo({id:p});const m=qe();await He(m),await Je(),Ye(e)}catch(m){console.error("Failed to delete EPPO:",m)}}if(d==="delete-bbch"){const p=u.dataset.id;if(!p||!confirm("BBCH-Stadium wirklich löschen?"))return;try{await yo({id:p});const m=qe();await He(m),await Je(),Ye(e)}catch(m){console.error("Failed to delete BBCH:",m)}}}));const i=e.querySelector('[data-form="add-eppo"]');i&&i.addEventListener("submit",async l=>{l.preventDefault();const c=e.querySelector('[data-input="eppo-code"]'),u=e.querySelector('[data-input="eppo-name"]'),d=e.querySelector('[data-input="eppo-favorite"]'),p=c?.value.trim(),m=u?.value.trim();if(!p||!m){alert("Bitte Code und Name eingeben");return}try{await Cn({code:p,name:m,isFavorite:d?.checked||!1});const y=qe();await He(y),await Je(),Ye(e),c&&(c.value=""),u&&(u.value=""),d&&(d.checked=!1)}catch(y){console.error("Failed to save EPPO:",y),alert("Speichern fehlgeschlagen")}});const s=e.querySelector('[data-form="add-bbch"]');s&&s.addEventListener("submit",async l=>{l.preventDefault();const c=e.querySelector('[data-input="bbch-code"]'),u=e.querySelector('[data-input="bbch-label"]'),d=e.querySelector('[data-input="bbch-favorite"]'),p=c?.value.trim(),m=u?.value.trim();if(!p||!m){alert("Bitte Code und Bezeichnung eingeben");return}try{await Mn({code:p,label:m,isFavorite:d?.checked||!1});const y=qe();await He(y),await Je(),Ye(e),c&&(c.value=""),u&&(u.value=""),d&&(d.checked=!1)}catch(y){console.error("Failed to save BBCH:",y),alert("Speichern fehlgeschlagen")}})}function _c(e,t,a={}){if(!e||ir)return;Qa=e,ir=!0,Qa.innerHTML=`
    <div class="section-inner codes-manager">
      <h4 class="mb-3"><i class="bi bi-tags me-2"></i>EPPO & BBCH Codes</h4>
      ${qc()}
    </div>`;const n=Qa.querySelector(".codes-manager");if(!n)return;Hc(n);const r=async()=>{await Je(),Ye(n)};t?.events?.subscribe?.("database:connected",()=>{r()}),t?.state?.getState?.().app?.hasDatabase&&r()}function Oc(){ir=!1,Qa=null}let zi=!1,et=null,ca=null,Ja=null,da=null,xt=null,cn=null,tt=null,La=null,dn=null,at=null,lr=null,Xe=null,ve=new Set,ut=null,qn=!1,Hn=!1,Ht=!1;const Re=e=>Be(e.mediums),Ya=25,_n=new Intl.NumberFormat("de-DE");let xe=0,zt=null,cr=null,dr=null,Ir=null;function Kc(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function Rc(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`profile-${Date.now()}-${Math.random().toString(16).slice(2,10)}`}function Is(e){if(!ve.size)return;const t=new Set(Re(e).map(n=>n.id));let a=!1;ve.forEach(n=>{t.has(n)||(ve.delete(n),a=!0)}),a&&(ve=new Set(ve))}function un(){et&&et.querySelectorAll('[data-role="profile-select"]').forEach(e=>{const t=e.dataset.mediumId;e.checked=!!(t&&ve.has(t))})}function pt(e){const t=Re(e).length,a=ve.size;let n="Noch keine Mittel ausgewählt.";t?a===t&&t>0?n=`${a} Mittel ausgewählt (alle).`:a>0&&(n=`${a} Mittel ausgewählt.`):n="Keine Mittel vorhanden.",lr&&(lr.textContent=n),Xe&&(Xe.disabled=t===0,Xe.indeterminate=a>0&&a<t,Xe.checked=t>0&&a===t)}function Xa(e){ut=null,cn&&cn.reset(),La&&(La.value=""),tt&&(tt.value=""),at&&(at.textContent="Profil speichern"),ve=new Set,un(),pt(e)}function Wc(e,t){ut=e.id,La&&(La.value=e.id),tt&&(tt.value=e.name,tt.focus()),at&&(at.textContent="Profil aktualisieren"),ve=new Set(e.mediumIds),un(),pt(t)}function Bi(e,t){if(at){if(at.disabled=e,e){at.textContent=t||"Speichert...";return}at.textContent=ut?"Profil aktualisieren":"Profil speichern"}}function pn(e,t){if(ca){if(ca.disabled=e,e){ca.textContent=t||"Speichert...";return}ca.textContent="Hinzufügen"}}async function jc(e,t,a){if(Ht)return;const n=t.state.getState(),i=(Re(n)[e]??null)?.id||null;Ht=!0,pn(!0);const s=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediums",c=>{const u=Da(c),d=u.items.slice();return d.splice(e,1),{...u,items:d,totalCount:Math.min(u.totalCount,d.length),lastUpdatedAt:new Date().toISOString()}}),await mn({silent:!0})&&i&&t.events?.emit?.("mediums:data-changed",{action:"deleted",id:i})}finally{Ht=!1,pn(!1),a&&a.isConnected&&(a.disabled=!1,a.textContent=s??"Löschen")}}async function Gc(e,t,a){const n=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediumProfiles",(r=[])=>r.filter(i=>i.id!==e.id)),ut===e.id&&Xa(t.state.getState()),await mn({successMessage:"Profil gelöscht."})}finally{a&&(a.disabled=!1,a.textContent=n||"Löschen")}}function Uc(e){if(!dn)return;const t=dn,a=e.mediumProfiles||[];if(!a.length){t.innerHTML=`
      <tr>
        <td colspan="3" class="text-center text-muted">Noch keine Profile erstellt.</td>
      </tr>
    `;return}const n=new Map(Re(e).map(r=>[r.id,r]));t.innerHTML="",a.forEach(r=>{const i=document.createElement("tr"),s=r.mediumIds.map(c=>n.get(c)).filter(Boolean).map(c=>g(c.name)),l=s.length?s.join(", "):'<span class="text-muted">Keine gültigen Mittel</span>';i.innerHTML=`
      <td>${g(r.name)}</td>
      <td>${l}</td>
      <td>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-sm btn-outline-info" data-action="profile-edit" data-id="${g(r.id)}">Bearbeiten</button>
          <button class="btn btn-sm btn-outline-danger" data-action="profile-delete" data-id="${g(r.id)}">Löschen</button>
        </div>
      </td>
    `,t.appendChild(i)})}function Vc(e,t){if(qn||!e.mediumProfiles?.length)return;const a=new Set(Re(e).map(i=>i.id));let n=!1;const r=e.mediumProfiles.map(i=>{const s=i.mediumIds.filter(l=>a.has(l));return s.length!==i.mediumIds.length?(n=!0,{...i,mediumIds:s,updatedAt:new Date().toISOString()}):i}).filter(i=>i.mediumIds.length?!0:(n=!0,!1));n&&(qn=!0,t.state.updateSlice("mediumProfiles",()=>r),qn=!1)}function zs(e){if(!e)return xe=0,{start:0,end:0,total:0};const t=Math.max(Math.ceil(e/Ya),1);xe>=t&&(xe=t-1),xe<0&&(xe=0);const a=xe*Ya,n=Math.min(a+Ya,e);return{start:a,end:n,total:e}}function Zc(){if(!dr)return null;const e=dr.querySelector('[data-role="mediums-pager"]');return e?((!zt||cr!==e)&&(zt?.destroy(),zt=Aa(e,{onPrev:()=>Qc(),onNext:()=>Jc(),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Mittel...",empty:"Keine Mittel verfügbar"}}),cr=e),zt):null}function Ni(e){const t=Zc();if(!t)return;const a=Re(e).length;if(!a){xe=0,t.update({status:"disabled",info:"Noch keine Mittel gespeichert."});return}const{start:n,end:r}=zs(a),i=`Mittel ${_n.format(n+1)}–${_n.format(r)} von ${_n.format(a)}`;t.update({status:"ready",info:i,canPrev:xe>0,canNext:r<a})}function Qc(){if(xe===0)return;const e=Ir?.state.getState();e&&(xe=Math.max(xe-1,0),zr(e))}function Jc(){const e=Ir?.state.getState();if(!e)return;const t=Re(e).length;if(!t)return;const a=Math.max(Math.ceil(t/Ya)-1,0);xe>=a||(xe=Math.min(xe+1,a),zr(e))}function zr(e){if(!et)return;Is(e);const t=new Map(e.measurementMethods.map(s=>[s.id,s])),a=Re(e).length;if(!a){et.innerHTML=`
      <tr>
        <td colspan="9" class="text-center text-muted">Noch keine Mittel gespeichert.</td>
      </tr>
    `,pt(e),Ni(e);return}const{start:n,end:r}=zs(a),i=Re(e).slice(n,r);et.innerHTML="",i.forEach((s,l)=>{const c=n+l,u=document.createElement("tr"),d=t.get(s.methodId),p=s.approval||s.zulassungsnummer,m=typeof p=="string"&&p.trim().length?g(p):"-",y=typeof s.wartezeit=="string"&&s.wartezeit.trim().length?g(s.wartezeit):typeof s.wartezeit=="number"?`${s.wartezeit} Tage`:"-",f=typeof s.wirkstoff=="string"&&s.wirkstoff.trim().length?g(s.wirkstoff):"-";u.innerHTML=`
      <td class="text-center">
        <input type="checkbox" class="form-check-input" data-role="profile-select" data-medium-id="${g(s.id)}" ${ve.has(s.id)?"checked":""} />
      </td>
      <td>${g(s.name)}</td>
      <td>${g(s.unit)}</td>
      <td>${g(d?d.label:s.method||s.methodId||"-")}</td>
      <td>${g(s.value!=null?String(s.value):"")}</td>
      <td>${m}</td>
      <td>${y}</td>
      <td>${f}</td>
      <td>
        <button class="btn btn-sm btn-danger" data-action="delete" data-index="${c}">Löschen</button>
      </td>
    `,et?.appendChild(u)}),pt(e),Ni(e)}function Fi(e){if(!da)return;const t=new Set;da.innerHTML="",e.measurementMethods.forEach(a=>{const n=(a.label??"").toLowerCase(),r=(a.id??"").toLowerCase();if(n&&!t.has(n)){t.add(n);const i=document.createElement("option");i.value=a.label,da.appendChild(i)}if(r&&!t.has(r)){t.add(r);const i=document.createElement("option");i.value=a.id,da.appendChild(i)}})}function Yc(e){const t=e.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t||`method-${Date.now()}-${Math.random().toString(16).slice(2,6)}`}function Xc(e,t){if(!Ja)return null;const a=Ja.value.trim();if(!a)return window.alert("Bitte eine Methode angeben."),Ja.focus(),null;const n=e.measurementMethods.find(l=>l.label?.toLowerCase()===a.toLowerCase()||l.id?.toLowerCase()===a.toLowerCase());if(n)return n.id;const r=Yc(a),i=e.fieldLabels?.calculation?.fields?.quantity?.unit||"Kiste",s={id:r,label:a,type:"factor",unit:i,requires:["areaHa"],config:{sourceField:"areaHa"}};return t.state.updateSlice("measurementMethods",l=>[...l,s]),r}async function mn(e){try{const t=qe();return await He(t),e?.silent||window.alert(e?.successMessage??"Änderungen wurden gespeichert."),!0}catch(t){console.error("Fehler beim Speichern",t);const a=t instanceof Error?t.message:"Speichern fehlgeschlagen";return window.alert(a),!1}}function ed(e,t){const a=!!t.app?.hasDatabase,n=t.app?.activeSection==="settings";e.classList.toggle("d-none",!(a&&n))}function td(e,t){if(!e||zi)return;const a=e;a.innerHTML="";const n=Kc();a.appendChild(n),dr=n,Ir=t,xe=0,zt?.destroy(),zt=null,cr=null,et=n.querySelector("#settings-mediums-table tbody"),Ja=n.querySelector('input[name="medium-method"]'),da=n.querySelector("#settings-method-options"),xt=n.querySelector("#settings-medium-form"),ca=xt?xt.querySelector('button[type="submit"]'):null,cn=n.querySelector("#settings-profile-form"),tt=n.querySelector("#profile-name"),La=n.querySelector('input[name="profile-id"]'),dn=n.querySelector("#settings-profile-table tbody"),at=n.querySelector('[data-role="profile-submit"]'),lr=n.querySelector('[data-role="profile-selection-summary"]'),Xe=n.querySelector('[data-role="profile-select-all"]');let r=!1,i=!1;function s(d){if(n.querySelectorAll("[data-settings-tab]").forEach(p=>{const m=p.dataset.settingsTab===d;p.classList.toggle("active",m)}),n.querySelectorAll("[data-pane]").forEach(p=>{const m=p.dataset.pane===d;p.style.display=m?"block":"none"}),d==="gps"&&!r){const p=n.querySelector('[data-feature="gps-embedded"]');p&&(Tc(p,t),r=!0)}if(d==="codes"&&!i){const p=n.querySelector('[data-feature="codes-embedded"]');p&&(Oc(),_c(p,{state:t.state,events:{subscribe:t.events?.subscribe}},{}),i=!0)}}n.querySelectorAll("[data-settings-tab]").forEach(d=>{d.addEventListener("click",()=>{const p=d.dataset.settingsTab;p&&s(p)})});async function l(){if(!xt||Ht)return;const d=t.state.getState(),p=new FormData(xt),m=(p.get("medium-name")||"").toString().trim(),y=(p.get("medium-unit")||"").toString().trim(),f=p.get("medium-value"),x=Number(f),v=(p.get("medium-approval")||"").toString().trim(),$=p.get("medium-wartezeit"),A=$?Number($):null,R=(p.get("medium-wirkstoff")||"").toString().trim()||null;if(!m||!y||Number.isNaN(x)){window.alert("Bitte alle Felder korrekt ausfüllen.");return}const Q=Xc(d,t);if(!Q)return;const O=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`medium-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,J={id:O,name:m,unit:y,methodId:Q,value:x,zulassungsnummer:v||null,wartezeit:A!=null&&!Number.isNaN(A)?A:null,wirkstoff:R};Ht=!0,pn(!0,"Speichere...");try{t.state.updateSlice("mediums",M=>{const D=Da(M),I=[...D.items,J];return{...D,items:I,totalCount:I.length,lastUpdatedAt:new Date().toISOString()}}),Fi(t.state.getState()),await mn({successMessage:"Mittel gespeichert.",silent:!0})&&(xt.reset(),t.events?.emit?.("mediums:data-changed",{action:"created",id:O}))}finally{Ht=!1,pn(!1)}}xt?.addEventListener("submit",d=>{d.preventDefault(),l()}),et?.addEventListener("click",d=>{const p=d.target?.closest('[data-action="delete"]');if(!p)return;const m=Number(p.dataset.index);Number.isNaN(m)||jc(m,t,p)}),et?.addEventListener("change",d=>{const p=d.target;if(!p||p.dataset.role!=="profile-select")return;const m=p.dataset.mediumId;if(!m)return;p.checked?ve.add(m):ve.delete(m);const y=t.state.getState();pt(y)}),Xe?.addEventListener("change",()=>{const d=t.state.getState();Xe&&(Xe.indeterminate=!1,Xe.checked?ve=new Set(Re(d).map(p=>p.id)):ve=new Set,un(),pt(d))});const c=async()=>{if(!tt)return;const d=tt.value.trim();if(!d){window.alert("Bitte einen Profilnamen eingeben."),tt.focus();return}if(!ve.size){window.alert("Bitte mindestens ein Mittel auswählen.");return}const p=t.state.getState();if(p.mediumProfiles?.some(v=>v.name.toLowerCase()===d.toLowerCase()&&v.id!==ut)){window.alert("Ein Profil mit diesem Namen existiert bereits.");return}const y=Re(p).filter(v=>ve.has(v.id)).map(v=>v.id);if(!y.length){window.alert("Ausgewählte Mittel sind nicht mehr verfügbar. Bitte Auswahl prüfen."),Is(p),un(),pt(p);return}if(Hn)return;const f=!!ut;Hn=!0,Bi(!0,f?"Aktualisiere...":"Speichere...");const x=new Date().toISOString();try{if(ut)t.state.updateSlice("mediumProfiles",($=[])=>$.map(A=>A.id===ut?{...A,name:d,mediumIds:y,updatedAt:x}:A));else{const $={id:Rc(),name:d,mediumIds:y,createdAt:x,updatedAt:x};t.state.updateSlice("mediumProfiles",(A=[])=>[...A,$])}await mn({successMessage:f?"Profil aktualisiert und gespeichert.":"Profil gespeichert."})&&Xa(t.state.getState())}finally{Hn=!1,Bi(!1)}};cn?.addEventListener("submit",d=>{d.preventDefault(),c()}),dn?.addEventListener("click",d=>{const p=d.target?.closest('[data-action^="profile-"]');if(!p)return;const m=p.dataset.id;if(!m)return;const y=t.state.getState();if(p.dataset.action==="profile-edit"){const f=y.mediumProfiles?.find(x=>x.id===m);f&&Wc(f,y);return}if(p.dataset.action==="profile-delete"){const f=y.mediumProfiles?.find(x=>x.id===m);if(!f||!window.confirm(`Profil "${f.name}" wirklich löschen?`))return;Gc(f,t,p)}}),n.querySelector('[data-action="profile-reset"]')?.addEventListener("click",()=>{Xa(t.state.getState())}),Xa(t.state.getState());const u=d=>{Vc(d,t),ed(n,d),d.app.activeSection==="settings"&&(zr(d),Fi(d),Uc(d),pt(d))};t.state.subscribe(u),u(t.state.getState()),zi=!0}const ra=e=>g(e),On=(e,t=1)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function _t(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function ad(e){if(!e)return"";const t=new Date(e);if(Number.isNaN(t.getTime()))return g(e);const a=Math.round((t.getTime()-Date.now())/864e5);return a<0?`<span style="color:#ef4444;">${_t(e)} · abgelaufen</span>`:a<180?`<span style="color:#f59e0b;">${_t(e)} · ${a} T</span>`:`<span class="calc-hint">${_t(e)}</span>`}function nd(){return`
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
    </section>`}function rd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=nd();const a=e.querySelector('[data-role="lager-uebersicht"]'),n=e.querySelector('[data-role="lager-bewegungen"]'),r=e.querySelector('[data-role="lager-form"]'),i=e.querySelector("#lager-mittel-options"),s=e.querySelector('[data-role="lager-empty"]'),l=new Map,c=y=>{if(a){if(!y.length){a.innerHTML='<tr><td colspan="6" class="calc-hint" style="padding:14px;">Noch keine Mittel. Erfasse unten einen Zugang oder dokumentiere Anwendungen in „Neu erfassen".</td></tr>';return}a.innerHTML=y.map(f=>{const x=f.bestand<0?"#ef4444":f.bestand===0?"#f59e0b":"inherit",v=g(f.einheit||"");return`<tr>
          <td><span class="fw-semibold">${g(f.name)}</span>${f.kennr?`<span class="d-block calc-hint">${g(f.kennr)}</span>`:""}</td>
          <td class="calc-hint">${g(f.wirkstoff||"")}</td>
          <td class="text-end">${On(f.verbraucht)} ${v}<span class="d-block calc-hint">${f.anwendungen} Anw.</span></td>
          <td class="text-end fw-semibold" style="color:${x};">${On(f.bestand)} ${v}</td>
          <td>${ad(f.zulEnde)}</td>
          <td class="calc-hint">${f.naechsterAblauf?_t(f.naechsterAblauf):""}</td>
        </tr>`}).join("")}},u=y=>{if(n){if(!y.length){n.innerHTML='<div class="calc-hint">Keine Bewegungen erfasst.</div>';return}n.innerHTML=y.map(f=>`
        <div class="d-flex align-items-center gap-2 py-1" style="border-bottom:1px solid var(--border-1);">
          <span class="badge" style="background:${f.typ==="zugang"?"#16a34a":"#64748b"};">${g(f.typ)}</span>
          <span class="flex-grow-1">${g(f.mittelName)} · <b>${On(f.menge)} ${g(f.einheit||"")}</b>${f.charge?` · Charge ${g(f.charge)}`:""}<span class="d-block calc-hint">${_t(f.datum)}${f.lieferant?" · "+g(f.lieferant):""}${f.ablauf?" · Ablauf "+_t(f.ablauf):""}</span></span>
          <button class="btn btn-sm" style="color:#ef4444;border:1px solid var(--border-1);background:transparent;" data-del="${ra(f.id)}" title="Löschen">×</button>
        </div>`).join(""),n.querySelectorAll("[data-del]").forEach(f=>{f.addEventListener("click",async()=>{const x=f.getAttribute("data-del")||"";try{await Do({id:x}),await Oe().catch(()=>{}),await p()}catch{C.warning("Löschen fehlgeschlagen.")}})})}},d=()=>{i&&(i.innerHTML=Array.from(l.entries()).sort((y,f)=>y[0].localeCompare(f[0],"de")).map(([y,f])=>`<option value="${ra(y)}" data-kennr="${ra(f.kennr||"")}" data-einheit="${ra(f.einheit||"")}" data-wirkstoff="${ra(f.wirkstoff||"")}"></option>`).join(""))},p=async()=>{if(le()!=="sqlite"){s&&(s.textContent="Bitte zuerst eine Datenbank öffnen.");return}try{const[y,f,x]=await Promise.all([ns(),Lo(),rs()]);c(y?.rows||[]),u(f?.rows||[]),l.clear(),(x?.rows||[]).forEach(v=>{v.name&&l.set(v.name,{kennr:v.kennr??null,einheit:v.einheit??null,wirkstoff:v.wirkstoff??null})}),(y?.rows||[]).forEach(v=>{v.name&&!l.has(v.name)&&l.set(v.name,{kennr:v.kennr??null,einheit:v.einheit??null,wirkstoff:v.wirkstoff??null})}),d()}catch(y){console.warn("[Lager] Laden fehlgeschlagen:",y)}};r?.addEventListener("submit",async y=>{if(y.preventDefault(),le()!=="sqlite"){C.warning("Bitte zuerst eine Datenbank öffnen.");return}const f=new FormData(r),x=String(f.get("mittel")||"").trim(),v=Number(String(f.get("menge")||"").replace(",","."));if(!x||!Number.isFinite(v)){C.warning("Mittel und Menge angeben.");return}const $=String(f.get("preis")||"").trim();try{await Eo({mittelName:x,kennr:String(f.get("kennr")||"").trim()||null,wirkstoff:l.get(x)?.wirkstoff||null,typ:String(f.get("typ")||"zugang"),menge:v,einheit:String(f.get("einheit")||"").trim()||null,datum:String(f.get("datum")||"").trim()||null,charge:String(f.get("charge")||"").trim()||null,ablauf:String(f.get("ablauf")||"").trim()||null,lieferant:String(f.get("lieferant")||"").trim()||null,preis:$?Number($.replace(",",".")):null}),await Oe().catch(()=>{}),r.reset(),C.success("Bewegung gespeichert."),await p()}catch{C.warning("Speichern fehlgeschlagen.")}});const m=e.querySelector('[name="mittel"]');m?.addEventListener("change",()=>{const y=l.get(m.value);if(!y)return;const f=e.querySelector('[name="einheit"]'),x=e.querySelector('[name="kennr"]');f&&y.einheit&&(f.value=y.einheit),x&&y.kennr&&(x.value=y.kennr)}),t.state.subscribe(y=>{y?.app?.activeSection==="lager"&&p()}),p()}const lt=["#ef4444","#3b82f6","#a855f7","#f59e0b","#06b6d4","#ec4899","#84cc16","#14b8a6"],id=()=>({bedW:1.2,pathW:.4,rowSp:.5,inRowSp:.4,angle:0}),pe=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";let te=null,je=null,U=null,Kn=!1,St=[];function Ti(){if(!U)return 1;const e=U.getCenter().lat;return 156543.03392*Math.cos(e*Math.PI/180)/Math.pow(2,U.getZoom())}function sd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=od();const a=[];let n=null;const r=new Map;let i=null,s=null,l={sat:null,osm:null},c=!0,u=!0;function d(){const o=[];if(a.forEach(w=>{const k=w.latlngs||[];if(k.length<3)return;const H=k.map(fe=>[Number(fe[1]),Number(fe[0])]),F=H[0],ae=H[H.length-1];(F[0]!==ae[0]||F[1]!==ae[1])&&H.push([F[0],F[1]]),o.push({type:"Feature",geometry:{type:"Polygon",coordinates:[H]},properties:{name:w.name||"",kultur:w.kultur||null,eppoCode:w.eppoCode||null,flaeche_m2:Math.round(w.result?.areaM2||0),flaeche_ha:Number(((w.result?.areaM2||0)/1e4).toFixed(4)),beete:w.result?.beds?.length||0,beetmeter_m:Math.round(w.result?.bedMeters||0),pflanzen:w.result?.plants||0,bettbreite_m:w.params?.bedW??null,wegbreite_m:w.params?.pathW??null,reihenabstand_m:w.params?.rowSp??null,pflanzabstand_m:w.params?.inRowSp??null,ausrichtung_grad:w.params?.angle??null}})}),(Be(t.state.getState().gps?.points)||[]).forEach(w=>{const k=Number(w.latitude),H=Number(w.longitude);if(!Number.isFinite(k)||!Number.isFinite(H))return;const F=Number(w.nutzflaecheQm);o.push({type:"Feature",geometry:{type:"Point",coordinates:[H,k]},properties:{name:w.name||"Standort",typ:"standort",flaeche_m2:Number.isFinite(F)&&F>0?Math.round(F):null,kind:w.kind||null}})}),!o.length){C.warning("Keine Flächen oder Standorte zum Exportieren.");return}const h={type:"FeatureCollection",name:"PSM Acker-Planer",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:o};try{const w=new Blob([JSON.stringify(h,null,2)],{type:"application/geo+json"}),k=URL.createObjectURL(w),H=document.createElement("a");H.href=k,H.download="acker-flaechen.geojson",document.body.appendChild(H),H.click(),H.remove(),setTimeout(()=>URL.revokeObjectURL(k),1e3),C.success(`${o.length} Objekt(e) als GeoJSON exportiert.`)}catch(w){console.error("[Acker] GeoJSON-Export fehlgeschlagen",w),C.error("Export fehlgeschlagen.")}}function p(){if(!te||!i)return;i.clearLayers(),(Be(t.state.getState().gps?.points)||[]).forEach(b=>{const h=Number(b.latitude),w=Number(b.longitude);if(!Number.isFinite(h)||!Number.isFinite(w))return;const k=Number(b.nutzflaecheQm),H=Number.isFinite(k)&&k>0?`${Math.round(k)} m²`:"",F=b.name||"Standort",ae=te.marker([h,w],{icon:te.divIcon({className:"acker-standort",html:'<span class="acker-standort-dot"></span>',iconSize:[16,16],iconAnchor:[8,8]})});ae.bindTooltip(`${g(F)}${H?" · "+H:""}`,{permanent:!0,direction:"top",className:"acker-standort-label",offset:[0,-9]});const fe=[`<b>${g(F)}</b>`,H?`Fläche: ${H}`:"",b.kind?g(String(b.kind)):""].filter(Boolean).join("<br>");ae.bindPopup(fe),i.addLayer(ae)})}const m=o=>e.querySelector(o),y=m('[data-role="acker-list"]'),f=m('[data-role="acker-empty"]'),x=m('[data-role="acker-totals"]'),v=m('[data-role="acker-map"]'),$=o=>({id:o.id,name:o.name,kultur:o.kultur||null,eppoCode:o.eppoCode||null,standortId:o.standortId||null,color:o.color,latlngs:o.latlngs,areaQm:o.result?.areaM2||0,bedW:o.params.bedW,pathW:o.params.pathW,rowSp:o.params.rowSp,inRowSp:o.params.inRowSp,angle:o.params.angle,beds:o.result?.beds?.length||0,bedMeters:o.result?.bedMeters||0,plants:o.result?.plants||0}),A=(o,b=!1)=>{if(le()!=="sqlite")return;const h=async()=>{try{const w=await Ao($(o));w?.id&&(o.id=w.id),await Oe().catch(()=>{})}catch(w){console.warn("[Acker] Speichern fehlgeschlagen:",w)}};if(b){h();return}clearTimeout(r.get(o._key)),r.set(o._key,setTimeout(h,600))};function R(o,b){const h=o.map(Qe=>[Qe[1],Qe[0]]);if(h.length<3)return{areaM2:0,beds:[],bedMeters:0,plants:0};const w=h[0],k=h[h.length-1];if((w[0]!==k[0]||w[1]!==k[1])&&h.push(w.slice()),h.length<4)return{areaM2:0,beds:[],bedMeters:0,plants:0};let H;try{H=je.polygon([h])}catch{return{areaM2:0,beds:[],bedMeters:0,plants:0}}const F=je.area(H),ae=b.bedW+b.pathW;if(ae<=0||b.bedW<=0||b.rowSp<=0||b.inRowSp<=0)return{areaM2:F,beds:[],bedMeters:0,plants:0};const fe=je.centroid(H),we=je.transformRotate(H,-b.angle,{pivot:fe}),ke=je.bbox(we),kt=1/111320,En=ae*kt,js=b.bedW*kt,Jt=(ke[2]-ke[0])*.02+1e-4,qr=[];let Hr=0,_r=0,Or=0;for(let Qe=ke[1];Qe<ke[3]&&Or<4e3;Qe+=En,Or++){const Kr=Math.min(Qe+js,ke[3]),Gs=je.polygon([[[ke[0]-Jt,Qe],[ke[2]+Jt,Qe],[ke[2]+Jt,Kr],[ke[0]-Jt,Kr],[ke[0]-Jt,Qe]]]);let Fa=null;try{Fa=je.intersect(we,Gs)}catch{Fa=null}if(!Fa)continue;let Ln;try{Ln=je.transformRotate(Fa,b.angle,{pivot:fe})}catch{continue}const Dn=je.area(Ln);if(Dn<Math.max(.4,b.bedW*.3))continue;const $n=Dn/b.bedW,An=Math.max(1,Math.floor(b.bedW/b.rowSp)),Pn=Math.max(0,Math.floor($n/b.inRowSp));Hr+=$n,_r+=An*Pn,qr.push({geo:Ln,lenM:$n,rows:An,perRow:Pn,plants:An*Pn,areaM2:Dn})}return{areaM2:F,beds:qr,bedMeters:Hr,plants:_r}}const Q=(o,b,h)=>({color:o.color,weight:b?3:2,fillColor:o.color,fillOpacity:h?b?.04:.1:b?.32:.22,dashArray:b?null:h?"5 5":null}),O=(o,b,h)=>{const w=b%2===0;return h?{color:"#ffffff",weight:.7,opacity:.85,fillColor:o.color,fillOpacity:w?.78:.52}:{color:o.color,weight:0,fillColor:o.color,fillOpacity:w?.5:.32}};function J(o){return!u||o.bedsHidden?!1:(o.params?.bedW||0)/Ti()>=2.2}function Te(o){o.outline&&(U.removeLayer(o.outline),o.outline=null),o.bedsLayer&&(U.removeLayer(o.bedsLayer),o.bedsLayer=null),o.label&&s&&(s.removeLayer(o.label),o.label=null),W(o)}function M(o){const b=!!o.editing;o.outline&&U.removeLayer(o.outline),o.bedsLayer&&(U.removeLayer(o.bedsLayer),o.bedsLayer=null),o.label&&s&&s.removeLayer(o.label),W(o);const h=o._key===n,w=J(o);o._lastDetail=w,w&&(o.bedsLayer=te.layerGroup(),(o.result?.beds||[]).forEach((k,H)=>{const F=te.geoJSON(k.geo,{style:O(o,H,h),bubblingMouseEvents:!1});F.bindTooltip(`Beet ${H+1} · ${pe(k.lenM,1)} m · ${k.rows}×${pe(k.perRow)} = ${pe(k.plants)} Pfl.`,{sticky:!0}),F.on("click",()=>Le(o._key)),F.on("contextmenu",ae=>V(o,ae,H+1)),F.addTo(o.bedsLayer)}),o.bedsLayer.addTo(U)),o.outline=te.polygon(o.latlngs,{...Q(o,h,w),bubblingMouseEvents:!1}).addTo(U),o.outline.on("click",()=>Le(o._key)),o.outline.on("dblclick",()=>We(o)),o.outline.on("contextmenu",k=>V(o,k)),D(o,h),(h||b)&&I(o)}function D(o,b){if(!c||!s||!o.outline)return;let h;try{h=o.outline.getBounds().getCenter()}catch{return}const w=o.result?.plants||0,k=`<div class="acker-flabel${b?" sel":""}" style="--fc:${o.color}"><b>${g(o.name||"")}</b><i>${pe(w)} Pfl.</i></div>`;o.label=te.marker(h,{interactive:!1,keyboard:!1,icon:te.divIcon({className:"acker-flabel-wrap",html:k,iconSize:[0,0]})}),s.addLayer(o.label)}function I(o){W(o),o.handles=o.latlngs.map((b,h)=>{const w=te.marker(b,{draggable:!0,icon:te.divIcon({className:"acker-vhandle"})}).addTo(U);return w.on("drag",k=>{o.latlngs[h]=[k.target.getLatLng().lat,k.target.getLatLng().lng],o.outline.setLatLngs(o.latlngs)}),w.on("dragend",()=>Ee(o)),w.on("contextmenu",k=>P(o,h,k)),w}),o.editing=!0}function W(o){(o.handles||[]).forEach(b=>U.removeLayer(b)),o.handles=[],o.editing=!1}function ce(){a.forEach(o=>M(o))}function re(){a.forEach(o=>{J(o)!==o._lastDetail&&M(o)})}function ue(o,b){o.color=b;try{o.outline?.setStyle({color:b,fillColor:b})}catch{}if(o.bedsLayer)try{o.bedsLayer.eachLayer(w=>w.setStyle&&w.setStyle({fillColor:b}))}catch{}try{const w=o.label?.getElement?.()?.querySelector?.(".acker-flabel");w&&w.style.setProperty("--fc",b)}catch{}const h=y?.querySelector(".acker-field.sel .acker-swatch");h&&(h.style.background=b)}function We(o){if(o.latlngs?.length)try{U.fitBounds(te.polygon(o.latlngs).getBounds(),{maxZoom:20,padding:[40,40]})}catch{}}function yt(){const o=a.filter(b=>b.latlngs?.length>=3);if(!o.length){C.info("Keine Flächen vorhanden.");return}try{let b=te.polygon(o[0].latlngs).getBounds();o.slice(1).forEach(h=>{b=b.extend(te.polygon(h.latlngs).getBounds())}),U.fitBounds(b,{maxZoom:19,padding:[40,40]})}catch{}}function Ee(o){o.result=R(o.latlngs,o.params),M(o),X(),A(o)}function wt(o){if(Ke("app",b=>({...b,activeSection:"kultur"})),o?.id)try{window.dispatchEvent(new CustomEvent("psm:openKultur",{detail:{typ:"acker",id:String(o.id)}}))}catch{}else C.info("Fläche wird gespeichert – in der Kulturführung gleich wählbar.")}let ye=null;const st=()=>{ye&&(ye.remove(),ye=null,document.removeEventListener("pointerdown",Ma,!0),document.removeEventListener("keydown",Ia,!0))},Ma=o=>{ye&&!ye.contains(o.target)&&st()},Ia=o=>{o.key==="Escape"&&st()};function Sn(o,b){b.style.left="",b.style.right="",b.style.top="";const h=o.getBoundingClientRect(),w=b.getBoundingClientRect(),k=w.width||210,H=w.height||260;h.right+3+k>window.innerWidth-8&&(b.style.left="auto",b.style.right="calc(100% + 3px)");let F=-5;h.top+F+H>window.innerHeight-8&&(F=Math.min(-5,window.innerHeight-8-H-h.top)),h.top+F<8&&(F=8-h.top),b.style.top=F+"px"}function za(o,b){b.forEach(h=>{if(!h)return;if(h.sep){const k=document.createElement("div");k.className="acker-ctx-sep",o.appendChild(k);return}if(h.type==="swatchGrid"){const k=document.createElement("div");k.className="acker-ctx-swatches",h.colors.forEach(ae=>{const fe=document.createElement("button");fe.type="button",fe.className="acker-sw"+(ae===h.current?" on":""),fe.style.background=ae,fe.title=ae,fe.addEventListener("click",we=>{we.stopPropagation(),st(),h.onPick(ae)}),k.appendChild(fe)});const H=document.createElement("label");H.className="acker-sw-custom",H.innerHTML=`<i class="bi bi-eyedropper"></i><input type="color" value="${h.current||"#3b82f6"}">`;const F=H.querySelector("input");F.addEventListener("input",ae=>(h.onLive||h.onPick)(ae.target.value)),F.addEventListener("change",ae=>{h.onPick(ae.target.value),st()}),k.appendChild(H),o.appendChild(k);return}const w=document.createElement("button");if(w.type="button",w.className="acker-ctx-item"+(h.danger?" danger":"")+(h.submenu?" has-sub":"")+(h.disabled?" disabled":""),w.innerHTML=`<span class="ic">${h.icon||""}</span><span class="lb">${g(h.label)}</span>`+(h.right?`<span class="rt">${g(h.right)}</span>`:"")+(h.submenu?'<span class="ch"><i class="bi bi-chevron-right"></i></span>':""),h.submenu){const k=document.createElement("div");k.className="acker-ctx-sub",za(k,h.submenu),w.appendChild(k),w.addEventListener("pointerenter",()=>Sn(w,k))}else h.disabled||w.addEventListener("click",k=>{k.stopPropagation(),h.keepOpen||st(),h.action?.()});o.appendChild(w)})}function Gt(o,b,h,w){if(st(),ye=document.createElement("div"),ye.className="acker-ctx",w){const ae=document.createElement("div");ae.className="acker-ctx-title",ae.textContent=w,ye.appendChild(ae)}za(ye,h),document.body.appendChild(ye);const k=ye.getBoundingClientRect();let H=o,F=b;H+k.width>window.innerWidth-8&&(H=Math.max(8,window.innerWidth-k.width-8)),F+k.height>window.innerHeight-8&&(F=Math.max(8,window.innerHeight-k.height-8)),ye.style.left=H+"px",ye.style.top=F+"px",setTimeout(()=>{document.addEventListener("pointerdown",Ma,!0),document.addEventListener("keydown",Ia,!0)},0)}const Ut=o=>{const b=o.originalEvent||o;return b&&te.DomEvent.preventDefault?.(b),o.originalEvent&&te.DomEvent.stop?.(o),{x:b.clientX,y:b.clientY}};function Ie(o,b){o.params.angle=(Math.round(o.params.angle+b)%180+180)%180,Ee(o),C.info(`Beete-Ausrichtung: ${o.params.angle}°`)}function Vt(o,b){o.color=b,M(o),X(),A(o)}function Ba(o,b){o.kultur=b||null,o.eppoCode=St.find(h=>h.kultur===o.kultur)?.eppoCode||null,M(o),X(),A(o),C.success(b?`Kultur: ${b}`:"Kultur entfernt.")}function Zt(o){o.bedsHidden=!o.bedsHidden,M(o),C.info(o.bedsHidden?"Beete ausgeblendet.":"Beete eingeblendet.")}function Na(o){Le(o._key),setTimeout(()=>{const b=y?.querySelector(".acker-field.sel .acker-name");b&&(b.focus(),b.select())},30)}function S(o){const h=Ti()*18/111320,w={_key:"new-"+ ++ot,id:null,name:(o.name||"Fläche")+" (Kopie)",kultur:o.kultur,eppoCode:o.eppoCode,standortId:o.standortId,color:lt[(lt.indexOf(o.color)+1)%lt.length],latlngs:o.latlngs.map(k=>[k[0]+h,k[1]+h]),params:{...o.params},outline:null,bedsLayer:null,label:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(w),n=w._key,Ee(w),A(w,!0),C.success("Fläche dupliziert.")}function E(o){const b=o.latlngs||[];if(b.length<3){C.warning("Fläche hat keine Geometrie.");return}const h=b.map(k=>[Number(k[1]),Number(k[0])]);(h[0][0]!==h[h.length-1][0]||h[0][1]!==h[h.length-1][1])&&h.push([h[0][0],h[0][1]]);const w={type:"FeatureCollection",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:[{type:"Feature",geometry:{type:"Polygon",coordinates:[h]},properties:{name:o.name||"",kultur:o.kultur||null,eppoCode:o.eppoCode||null,flaeche_m2:Math.round(o.result?.areaM2||0),beete:o.result?.beds?.length||0,beetmeter_m:Math.round(o.result?.bedMeters||0),pflanzen:o.result?.plants||0}}]};try{const k=new Blob([JSON.stringify(w,null,2)],{type:"application/geo+json"}),H=URL.createObjectURL(k),F=document.createElement("a");F.href=H,F.download=`${(o.name||"flaeche").replace(/[^\w\-]+/g,"_")}.geojson`,document.body.appendChild(F),F.click(),F.remove(),setTimeout(()=>URL.revokeObjectURL(H),1e3),C.success("Fläche als GeoJSON exportiert.")}catch{C.error("Export fehlgeschlagen.")}}async function z(o){const b=o.result||{},h=[`Fläche: ${o.name||""}`,o.kultur?`Kultur: ${o.kultur}`:"",`Größe: ${pe(b.areaM2||0)} m² (${pe((b.areaM2||0)/1e4,3)} ha)`,`Beete: ${pe(b.beds?.length||0)}`,`Beetmeter: ${pe(b.bedMeters||0)} m`,`Pflanzen: ${pe(b.plants||0)}`].filter(Boolean).join(`
`);try{await navigator.clipboard.writeText(h),C.success("Werte kopiert.")}catch{C.warning("Kopieren nicht möglich.")}}const N=o=>({icon:'<i class="bi bi-palette"></i>',label:"Farbe",submenu:[{type:"swatchGrid",colors:lt,current:o.color,onPick:b=>Vt(o,b),onLive:b=>ue(o,b)}]}),B=o=>({icon:'<i class="bi bi-flower1"></i>',label:"Kultur zuweisen",submenu:[{icon:'<i class="bi bi-x"></i>',label:"– keine –",action:()=>Ba(o,null)},...St.length?[{sep:!0}]:[],...St.map(b=>({icon:b.kultur===o.kultur?'<i class="bi bi-check2"></i>':"",label:`${b.kultur}${b.anbau?" ("+b.anbau+")":""}`,action:()=>Ba(o,b.kultur)}))]});function V(o,b,h){Le(o._key);const{x:w,y:k}=Ut(b),H=!!o.editing;Gt(w,k,[{icon:'<i class="bi bi-clipboard2-pulse"></i>',label:"Kulturführung öffnen",action:()=>wt(o)},{icon:'<i class="bi bi-pencil"></i>',label:"Umbenennen",action:()=>Na(o)},B(o),N(o),{sep:!0},{icon:'<i class="bi bi-arrow-clockwise"></i>',label:"Beete drehen +15°",keepOpen:!0,action:()=>Ie(o,15)},{icon:'<i class="bi bi-arrow-counterclockwise"></i>',label:"Beete drehen −15°",keepOpen:!0,action:()=>Ie(o,-15)},{icon:'<i class="bi bi-grid-3x3-gap"></i>',label:o.bedsHidden?"Beete einblenden":"Beete ausblenden",action:()=>Zt(o)},{icon:'<i class="bi bi-bounding-box-circles"></i>',label:H?"Eckpunkte fertig":"Eckpunkte bearbeiten",action:()=>{H?W(o):I(o)}},{sep:!0},{icon:'<i class="bi bi-copy"></i>',label:"Duplizieren",action:()=>S(o)},{icon:'<i class="bi bi-zoom-in"></i>',label:"Auf Fläche zoomen",action:()=>We(o)},{icon:'<i class="bi bi-clipboard-data"></i>',label:"Werte kopieren",action:()=>z(o)},{icon:'<i class="bi bi-download"></i>',label:"Als GeoJSON exportieren",action:()=>E(o)},{sep:!0},{icon:'<i class="bi bi-trash"></i>',label:"Löschen",danger:!0,action:()=>De(o._key)}],h?`${o.name||"Fläche"} · Beet ${h}`:o.name||"Fläche")}function P(o,b,h){const{x:w,y:k}=Ut(h);Gt(w,k,[{icon:'<i class="bi bi-node-minus"></i>',label:"Eckpunkt löschen",disabled:o.latlngs.length<=3,action:()=>{o.latlngs.length<=3||(o.latlngs.splice(b,1),Ee(o))}},{icon:'<i class="bi bi-check2"></i>',label:"Bearbeiten beenden",action:()=>W(o)}],`Eckpunkt ${b+1}`)}function _(){!l.sat||!l.osm||(U.hasLayer(l.sat)?(U.removeLayer(l.sat),l.osm.addTo(U),C.info("Karte: OSM")):(U.removeLayer(l.osm),l.sat.addTo(U),C.info("Karte: Satellit")))}function j(o){const b=o.latlng,{x:h,y:w}=Ut(o);Gt(h,w,[{icon:'<i class="bi bi-pencil-square"></i>',label:"Neue Fläche hier zeichnen",action:()=>{Qt(!0),Nr({latlng:b})}},{icon:'<i class="bi bi-crosshair"></i>',label:"Hierhin zentrieren",action:()=>U.panTo(b)},{sep:!0},{icon:'<i class="bi bi-arrows-fullscreen"></i>',label:"Alle Flächen anzeigen",disabled:!a.some(k=>k.latlngs?.length>=3),action:yt},{icon:'<i class="bi bi-layers"></i>',label:"Kartentyp wechseln (Satellit/OSM)",action:_},{sep:!0},{icon:'<i class="bi bi-geo-alt"></i>',label:"Koordinaten kopieren",action:async()=>{try{await navigator.clipboard.writeText(`${b.lat.toFixed(6)}, ${b.lng.toFixed(6)}`),C.success("Koordinaten kopiert.")}catch{C.warning("Kopieren nicht möglich.")}}}],"Karte")}function q(o){return['<option value="">– Kultur –</option>'].concat(St.map(b=>{const h=`${b.kultur}${b.anbau?" ("+b.anbau+")":""}`;return`<option value="${g(b.kultur)}"${b.kultur===o?" selected":""}>${g(h)}</option>`})).join("")}function oe(o){const b=Be(t.state.getState().gps?.points)||[];return['<option value="">– Standort –</option>'].concat(b.map(h=>`<option value="${g(h.id)}"${h.id===o?" selected":""}>${g(h.name||"")}</option>`)).join("")}function X(){if(!y||!f||!x)return;f.style.display=a.length?"none":"block",x.style.display=a.length?"block":"none",y.innerHTML="";let o=0,b=0,h=0,w=0;a.forEach(k=>{o+=k.result?.areaM2||0,b+=k.result?.beds?.length||0,h+=k.result?.bedMeters||0,w+=k.result?.plants||0;const H=k._key===n,F=document.createElement("div");F.className="acker-field"+(H?" sel open":""),F.innerHTML=`
        <div class="acker-fhead">
          <span class="acker-swatch" style="background:${k.color}"></span>
          <input class="acker-name" value="${g(k.name)}" />
          <span class="acker-stat">${pe(k.result?.plants||0)} Pfl.</span>
        </div>
        <div class="acker-fbody">
          <div class="acker-grid">
            <label class="acker-fld span2">Kultur<select data-k="kultur">${q(k.kultur)}</select></label>
            <label class="acker-fld span2">Standort (für PSM)<select data-k="standortId">${oe(k.standortId)}</select></label>
            <label class="acker-fld">Bettbreite (m)<input data-k="bedW" type="number" step="0.05" min="0.1" value="${k.params.bedW}"/></label>
            <label class="acker-fld">Wegbreite (m)<input data-k="pathW" type="number" step="0.05" min="0" value="${k.params.pathW}"/></label>
            <label class="acker-fld">Reihenabstand (m)<input data-k="rowSp" type="number" step="0.05" min="0.05" value="${k.params.rowSp}"/></label>
            <label class="acker-fld">Pflanzabstand (m)<input data-k="inRowSp" type="number" step="0.05" min="0.05" value="${k.params.inRowSp}"/></label>
            <label class="acker-fld span2">Ausrichtung der Beete: ${k.params.angle}°<input data-k="angle" type="range" min="0" max="180" step="5" value="${k.params.angle}"/></label>
          </div>
          <div class="acker-res">
            <div class="r"><span>Fläche</span><b>${pe(k.result?.areaM2||0)} m² · ${pe((k.result?.areaM2||0)/1e4,3)} ha</b></div>
            <div class="r"><span>Beete</span><b>${pe(k.result?.beds?.length||0)}</b></div>
            <div class="r"><span>Beetmeter</span><b>${pe(k.result?.bedMeters||0)} m</b></div>
            <div class="r"><span>Pflanzen</span><b>${pe(k.result?.plants||0)}</b></div>
          </div>
          <div class="acker-actions">
            <label class="acker-colorbtn" title="Farbe wählen"><input type="color" data-act="color" value="${k.color}"><i class="bi bi-palette"></i></label>
            <button class="btn btn-sm acker-abtn" data-act="zoom" title="Auf Fläche zoomen"><i class="bi bi-zoom-in"></i></button>
            <button class="btn btn-sm acker-abtn" data-act="dup" title="Duplizieren"><i class="bi bi-copy"></i></button>
            <button class="btn btn-sm acker-abtn" data-act="rot" title="Beete drehen +15°"><i class="bi bi-arrow-clockwise"></i></button>
            <span style="flex:1"></span>
            <button class="btn btn-sm acker-abtn danger" data-act="del" title="Löschen"><i class="bi bi-trash"></i></button>
          </div>
          <div class="acker-hint"><i class="bi bi-mouse2"></i> Rechtsklick auf die Fläche für mehr Aktionen</div>
        </div>`,F.querySelector(".acker-fhead").addEventListener("click",we=>{we.target.classList.contains("acker-name")||Le(k._key)}),F.querySelector(".acker-name").addEventListener("input",we=>{k.name=we.target.value,A(k)}),F.querySelectorAll("[data-k]").forEach(we=>{we.addEventListener("input",ke=>{const kt=we.dataset.k;if(kt==="kultur"){k.kultur=ke.target.value||null,k.eppoCode=St.find(En=>En.kultur===k.kultur)?.eppoCode||null,A(k);return}if(kt==="standortId"){k.standortId=ke.target.value||null,A(k);return}kt==="angle"?k.params.angle=+ke.target.value:k.params[kt]=parseFloat(ke.target.value)||0,Ee(k)})}),F.querySelector('[data-act="del"]').addEventListener("click",()=>De(k._key)),F.querySelector('[data-act="zoom"]').addEventListener("click",()=>We(k)),F.querySelector('[data-act="dup"]').addEventListener("click",()=>S(k)),F.querySelector('[data-act="rot"]').addEventListener("click",()=>Ie(k,15));const fe=F.querySelector('[data-act="color"]');fe.addEventListener("input",we=>ue(k,we.target.value)),fe.addEventListener("change",we=>Vt(k,we.target.value)),y.appendChild(F)}),x.querySelector('[data-t="area"]').textContent=pe(o)+" m² · "+pe(o/1e4,3)+" ha",x.querySelector('[data-t="beds"]').textContent=pe(b),x.querySelector('[data-t="meters"]').textContent=pe(h)+" m",x.querySelector('[data-t="plants"]').textContent=pe(w)}function Le(o){n=o,a.forEach(b=>M(b)),X()}async function De(o){const b=a.find(w=>w._key===o);if(!b)return;Te(b);const h=a.findIndex(w=>w._key===o);if(h>=0&&a.splice(h,1),n===o&&(n=null),X(),b.id&&le()==="sqlite")try{await $o({id:b.id}),await Oe().catch(()=>{})}catch{}}let G=!1,ne=[],Y=null,Me=[],ot=0;function Qt(o){G=o,m('[data-role="acker-banner"]').style.display=o?"block":"none",m('[data-role="acker-draw"]').style.display=o?"none":"block",U.getContainer().style.cursor=o?"crosshair":"",o||(Y&&U.removeLayer(Y),Me.forEach(b=>U.removeLayer(b)),Y=null,Me=[],ne=[])}function Nr(o){G&&(ne.push([o.latlng.lat,o.latlng.lng]),Me.push(te.circleMarker(o.latlng,{radius:4,color:"#22c55e",fillColor:"#fff",fillOpacity:1,weight:2}).addTo(U)),Y?Y.setLatLngs(ne):Y=te.polyline(ne,{color:"#22c55e",weight:2,dashArray:"5 5"}).addTo(U))}function Fr(){if(ne.length<3){C.warning("Mindestens 3 Punkte setzen.");return}const o={_key:"new-"+ ++ot,id:null,name:"Fläche "+(a.length+1),kultur:null,eppoCode:null,standortId:null,color:lt[a.length%lt.length],latlngs:ne.map(b=>b.slice()),params:id(),outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(o),Qt(!1),n=o._key,Ee(o),A(o,!0)}async function Tr(){const o=m('[data-role="acker-q"]').value.trim();if(o)try{const h=await(await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+encodeURIComponent(o))).json();h[0]?U.setView([+h[0].lat,+h[0].lon],18):C.info("Nichts gefunden.")}catch{C.warning("Suche nicht verfügbar.")}}async function Ks(){if(Kn){setTimeout(()=>U&&U.invalidateSize(),60);return}Kn=!0;try{await mt(()=>Promise.resolve({}),__vite__mapDeps([2]));const w=await mt(()=>import("./leaflet-src.BcflbDBd.js").then(k=>k.l),__vite__mapDeps([3,4]));te=w.default||w,je=await mt(()=>import("./index.CPadEFgJ.js"),__vite__mapDeps([5,4]))}catch(w){console.warn("[Acker] Karten-Bibliotheken konnten nicht geladen werden:",w),f&&(f.textContent="Karte konnte nicht geladen werden (offline?)."),Kn=!1;return}U=te.map(v,{doubleClickZoom:!1,zoomControl:!0,attributionControl:!0}).setView([47.818,8.976],17);const o=te.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:21,maxNativeZoom:19,attribution:"Tiles © Esri"}).addTo(U),b=te.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"});l={sat:o,osm:b},i=te.layerGroup(),p(),i.addTo(U),s=te.layerGroup().addTo(U),te.control.layers({Satellit:o,"Karte (OSM)":b},{"Freiland-Standorte":i},{position:"topright",collapsed:!0}).addTo(U);const h=te.Control.extend({options:{position:"topleft"},onAdd(){const w=te.DomUtil.create("div","leaflet-bar acker-toolbar");w.innerHTML='<a href="#" data-tb="fit" title="Alle Flächen anzeigen"><i class="bi bi-arrows-fullscreen"></i></a><a href="#" data-tb="labels" class="on" title="Beschriftungen ein/aus"><i class="bi bi-tag"></i></a><a href="#" data-tb="beds" class="on" title="Beete-Detail ein/aus"><i class="bi bi-grid-3x3"></i></a>',te.DomEvent.disableClickPropagation(w);const k=(H,F)=>{w.querySelector(H).addEventListener("click",ae=>{ae.preventDefault(),F()})};return k('[data-tb="fit"]',yt),k('[data-tb="labels"]',()=>{c=!c,w.querySelector('[data-tb="labels"]').classList.toggle("on",c),ce()}),k('[data-tb="beds"]',()=>{u=!u,w.querySelector('[data-tb="beds"]').classList.toggle("on",u),ce()}),w}});U.addControl(new h),U.on("click",Nr),U.on("contextmenu",w=>{G||j(w)}),U.on("zoomend",re),m('[data-role="acker-draw"]').addEventListener("click",()=>Qt(!0)),m('[data-role="acker-export"]')?.addEventListener("click",d),m('[data-role="acker-finish"]').addEventListener("click",Fr),m('[data-role="acker-cancel"]').addEventListener("click",()=>Qt(!1)),m('[data-role="acker-go"]').addEventListener("click",Tr),m('[data-role="acker-q"]').addEventListener("keydown",w=>{w.key==="Enter"&&Tr()}),document.addEventListener("keydown",w=>{if(G){if(w.key==="Backspace"){w.preventDefault(),ne.pop();const k=Me.pop();k&&U.removeLayer(k),Y&&Y.setLatLngs(ne)}w.key==="Enter"&&Fr(),w.key==="Escape"&&Qt(!1)}}),await Rs(),await Ws(),setTimeout(()=>U.invalidateSize(),60)}async function Rs(){if(le()==="sqlite")try{St=(await gr())?.rows||[]}catch{St=[]}}async function Ws(){if(le()==="sqlite")try{((await br())?.rows||[]).forEach(h=>{const w={_key:"db-"+h.id,id:h.id,name:h.name,kultur:h.kultur,eppoCode:h.eppoCode,standortId:h.standortId,color:h.color||lt[a.length%lt.length],latlngs:h.latlngs||[],params:{bedW:h.bedW??1.2,pathW:h.pathW??.4,rowSp:h.rowSp??.5,inRowSp:h.inRowSp??.4,angle:h.angle??0},outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};w.result=R(w.latlngs,w.params),a.push(w),M(w)}),X();const b=a.find(h=>h.latlngs?.length);if(b&&U)try{U.fitBounds(te.polygon(b.latlngs).getBounds(),{maxZoom:19,padding:[30,30]})}catch{}}catch(o){console.warn("[Acker] Flächen laden fehlgeschlagen:",o)}}t.state.subscribe(o=>{o?.app?.activeSection==="acker"&&Ks()}),X()}function od(){return`
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
  </section>`}function ia(e){return e.typ+":"+e.id}function ld(e){if(!Array.isArray(e)||e.length<3)return null;let t=0,a=0,n=0;const r=e.length,i=e[r-1],s=e[0],c=i&&s&&Number(i[0])===Number(s[0])&&Number(i[1])===Number(s[1])?r-1:r;for(let u=0;u<c;u++){const d=Number(e[u]?.[0]),p=Number(e[u]?.[1]);Number.isFinite(d)&&Number.isFinite(p)&&(t+=d,a+=p,n++)}return n?{lat:t/n,lon:a/n}:null}async function qi(e){const t=[];(Be(e.state.getState().gps?.points)||[]).forEach(n=>{if(n?.kind!=="gewaechshaus")return;const r=Number(n.latitude),i=Number(n.longitude),s=Number(n.nutzflaecheQm);t.push({typ:"haus",id:String(n.id),name:n.name||"Gewächshaus",areaQm:Number.isFinite(s)&&s>0?s:null,lat:Number.isFinite(r)?r:null,lon:Number.isFinite(i)?i:null,color:null})});try{((await br())?.rows||[]).forEach(r=>{const i=ld(r.latlngs),s=Number(r.areaQm);t.push({typ:"acker",id:String(r.id),name:r.name||"Fläche",areaQm:Number.isFinite(s)&&s>0?s:null,lat:i?.lat??null,lon:i?.lon??null,color:r.color||null})})}catch{}return t}const cd="Wetterdaten: Open-Meteo (CC BY 4.0)",dd="psm.weather.";function ud(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function pd(e,t){return dd+e.toFixed(3)+"_"+t.toFixed(3)}function md(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch{return null}}function fd(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function gd(e){return!!e&&e.slice(0,10)===ud()}function bd(e,t,a){const n=e?.time||[],r=e?.temperature_2m_max||[],i=e?.temperature_2m_min||[],s=e?.precipitation_sum||[],l=e?.sunshine_duration||[],c=Nt(new Date),u=wa(c.year,c.week),d=new Map;for(let m=0;m<n.length;m++){const y=ts(n[m]);if(!y)continue;const{year:f,week:x}=Nt(y),v=wa(f,x);let $=d.get(v);$||($={key:v,year:f,week:x,tmaxSum:0,tmaxN:0,tminSum:0,tminN:0,precip:0,precipN:0,sun:0,sunN:0,days:0},d.set(v,$)),Number.isFinite(r[m])&&($.tmaxSum+=r[m],$.tmaxN++),Number.isFinite(i[m])&&($.tminSum+=i[m],$.tminN++),Number.isFinite(s[m])&&($.precip+=s[m],$.precipN++),Number.isFinite(l[m])&&($.sun+=l[m],$.sunN++),$.days++}const p=[...d.values()].sort((m,y)=>m.key<y.key?-1:m.key>y.key?1:0).map(m=>{const y=m.tmaxN?m.tmaxSum/m.tmaxN:null,f=m.tminN?m.tminSum/m.tminN:null;return{weekKey:m.key,year:m.year,week:m.week,tMaxAvg:y,tMinAvg:f,tMeanAvg:y!=null&&f!=null?(y+f)/2:y,precipSum:m.precipN?m.precip:null,sunHours:m.sunN?m.sun/3600:null,days:m.days,isForecast:m.key>=u}});return{lat:t,lon:a,fetchedAt:new Date().toISOString(),weeks:p}}async function hd(e,t){if(!Number.isFinite(e)||!Number.isFinite(t))return{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const a=pd(e,t),n=md(a);if(n&&gd(n.fetchedAt)&&n.weeks?.length)return n;if(typeof navigator<"u"&&navigator.onLine===!1)return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const r="https://api.open-meteo.com/v1/forecast?latitude="+e.toFixed(4)+"&longitude="+t.toFixed(4)+"&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunshine_duration&timezone=Europe%2FBerlin&past_days=92&forecast_days=16";try{const i=await fetch(r);if(!i.ok)throw new Error("HTTP "+i.status);const s=await i.json(),l=bd(s.daily,e,t);return l.weeks.length&&fd(a,l),l}catch{return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]}}}const Wt={mechanisch:{label:"Mechanisch",icon:"bi-tools",color:"#2563eb"},chemisch_psm:{label:"Pflanzenschutz",icon:"bi-droplet-half",color:"#dc2626"},duengung:{label:"Düngung",icon:"bi-flower1",color:"#b45309"},nuetzlinge:{label:"Nützlinge",icon:"bi-bug",color:"#7c3aed"},bewaesserung:{label:"Bewässerung",icon:"bi-moisture",color:"#0891b2"},monitoring:{label:"Monitoring",icon:"bi-eye",color:"#475569"},sonstiges:{label:"Sonstiges",icon:"bi-three-dots",color:"#64748b"}},ur=["mechanisch","chemisch_psm","duengung","nuetzlinge","bewaesserung","monitoring","sonstiges"];function pr(e){return Wt[e]||Wt.sonstiges}const Hi={geplant:{label:"geplant",color:"#64748b"},aktiv:{label:"aktiv",color:"#16a34a"},abgeschlossen:{label:"abgeschlossen",color:"#94a3b8"}},ba=["#16a34a","#0891b2","#7c3aed","#d97706","#dc2626","#0d9488","#65a30d","#db2777"],vd=/^#[0-9a-fA-F]{3,8}$/;function Bs(e){return typeof e=="string"&&vd.test(e.trim())?e.trim():null}function en(e,t=0){return Bs(e&&e.color)||ba[t%ba.length]}function ua(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function ie(e){if(!e)return NaN;const t=String(e).slice(0,10).replace(/-/g,""),a=Number(t);return Number.isFinite(a)?a:NaN}function Rn(e){const t=[...e||[]].sort((i,s)=>(ie(i.pflanzDatum)||0)-(ie(s.pflanzDatum)||0)),a=Number(ua().replace(/-/g,""));let n=t.find(i=>i.status==="aktiv")||null;if(!n){const i=t.filter(s=>s.status!=="abgeschlossen"&&ie(s.pflanzDatum)<=a&&(!s.ernteDatum||ie(s.ernteDatum)>=a));n=i.length?i[i.length-1]:null}let r=t.filter(i=>i!==n&&i.status!=="abgeschlossen"&&ie(i.pflanzDatum)>a).sort((i,s)=>(ie(i.pflanzDatum)||0)-(ie(s.pflanzDatum)||0))[0]||null;return r||(r=t.filter(i=>i!==n&&i.status==="geplant").sort((i,s)=>(ie(i.pflanzDatum)||0)-(ie(s.pflanzDatum)||0))[0]||null),{current:n,next:r,all:t}}function Ns(e,t,a=70){const n=[],r=Nt(e);let i=Po(r.year,r.week);const s=t.getTime(),l=Nt(new Date),c=wa(l.year,l.week);let u=0;for(;i.getTime()<=s&&u<a;){const d=Nt(i),p=wa(d.year,d.week);n.push({year:d.year,week:d.week,key:p,monday:new Date(i),isCurrent:p===c,isPast:p<c,isFuture:p>c}),i=new Date(i.getFullYear(),i.getMonth(),i.getDate()+7),u++}return n}function fn(e,t){if(!t)return-1;const a=new Date(String(t).slice(0,10)+"T00:00:00");if(isNaN(a.getTime()))return-1;const n=Nt(a),r=wa(n.year,n.week);return e.findIndex(i=>i.key===r)}function _i(e){return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function Fs(e,t,a){if(!e||!e.length||!t)return null;const n=e[0].monday,r=e[e.length-1].monday,i=new Date(r.getFullYear(),r.getMonth(),r.getDate()+6),s=ie(_i(n)),l=ie(_i(i)),c=ie(t),u=a?ie(a):l;if(!Number.isFinite(c)||c>l||Number.isFinite(u)&&u<s)return null;let d=fn(e,t);d<0&&(d=c<s?0:e.length-1);let p=a?fn(e,a):e.length-1;return p<0&&(p=Number.isFinite(u)&&u>l?e.length-1:d),p<d&&(p=d),{s:d,e:p,openEnd:!a}}function yd(e,t){const{units:a,anbau:n,mass:r,onSelect:i}=t;if(!a||!a.length){e.innerHTML='<div class="km-empty"><i class="bi bi-calendar3"></i><p>Noch keine Flächen für den Anbauplan.</p></div>';return}const s=new Date;let l=new Date(s.getFullYear(),s.getMonth(),s.getDate()-28),c=new Date(s.getFullYear(),s.getMonth(),s.getDate()+112);const u=O=>{if(!O)return;const J=new Date(String(O).slice(0,10)+"T00:00:00");isNaN(J.getTime())||(J<l&&(l=J),J>c&&(c=J))};(n||[]).forEach(O=>{u(O.pflanzDatum),u(O.ernteDatum)}),(r||[]).forEach(O=>u(O.planDatum||O.erledigtDatum));const d=Ns(l,c),p=d.length,m=30,y=a.filter(O=>O.typ==="haus"),f=a.filter(O=>O.typ==="acker"),x=[{label:"Gewächshäuser",arr:y},{label:"Freiland",arr:f}];let v='<div class="kb-corner" style="grid-row:1;grid-column:1">Fläche</div>';d.forEach((O,J)=>{v+=`<div class="kb-h${O.isCurrent?" cur":""}${O.isFuture?" fut":""}" style="grid-row:1;grid-column:${J+2}">${O.week}</div>`});let $="",A=1;x.forEach(O=>{O.arr.length&&(A++,$+=`<div class="kb-group" style="grid-row:${A};grid-column:1/-1">${g(O.label)}</div>`,O.arr.forEach(J=>{A++;const Te=J.typ+":"+J.id;$+=`<div class="kb-name" data-ukey="${Te}" title="${g(J.name)}" style="grid-row:${A};grid-column:1">${g(J.name)}</div>`,(n||[]).filter(W=>W.flaecheTyp===J.typ&&String(W.flaecheId)===String(J.id)).sort((W,ce)=>(ie(W.pflanzDatum)||0)-(ie(ce.pflanzDatum)||0)).forEach((W,ce)=>{const re=Fs(d,W.pflanzDatum,W.ernteDatum);if(!re)return;const ue=en(W,ce),We=W.status==="geplant";$+=`<div class="kb-bar${We?" planned":""}" title="${g(W.kultur||"Kultur")}" style="grid-row:${A};grid-column:${re.s+2}/${re.e+3};--cc:${ue}">${g(W.kultur||"")}</div>`});const D=(r||[]).filter(W=>W.flaecheTyp===J.typ&&String(W.flaecheId)===String(J.id)),I={};D.forEach(W=>{const ce=W.status==="erledigt"?W.erledigtDatum||W.planDatum:W.planDatum||W.erledigtDatum,re=fn(d,ce);if(re<0||I[re])return;I[re]=!0;const ue=pr(W.art);$+=`<div class="kb-m" title="${g(ue.label)}" style="grid-row:${A};grid-column:${re+2};--mc:${ue.color}"></div>`})}))});const R=d.findIndex(O=>O.isCurrent),Q=R>=0?`<div class="kb-today" style="grid-row:1/${A+1};grid-column:${R+2}"></div>`:"";e.innerHTML=`<div class="kb-wrap"><div class="kb-grid" style="grid-template-columns:150px repeat(${p},${m}px);grid-auto-rows:26px">${v}${$}${Q}</div></div>
    <div class="km-legend" style="margin-top:10px">${ur.map(O=>`<span class="km-leg"><span class="km-leg-dot" style="background:${Wt[O].color}"></span>${g(Wt[O].label)}</span>`).join("")}</div>`,e.querySelectorAll("[data-ukey]").forEach(O=>O.addEventListener("click",()=>i&&i(O.dataset.ukey)))}const wd=["geplant","aktiv","abgeschlossen"];function kd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Sd();let a=[],n=[],r=[],i=[],s=null,l="flaechen",c=!1,u=!1;const d={};let p=null;const m=S=>e.querySelector(S),y=()=>m('[data-role="list"]'),f=()=>m('[data-role="detail"]'),x=()=>m('[data-role="kpis"]'),v=()=>m('[data-role="board-view"]'),$=()=>m('[data-role="flaechen-view"]'),A=()=>le()==="sqlite",R=()=>{A()&&Oe().catch(()=>{})},Q=(S,E)=>S.filter(z=>z.flaecheTyp===E.typ&&String(z.flaecheId)===String(E.id)),O=S=>a.find(E=>ia(E)===S)||null,J=(S,E=0)=>Bs(S.color)||ba[E%ba.length];async function Te(){if(a=await qi(t),A()){try{n=(await Ur())?.rows||[]}catch{n=[]}try{r=(await In())?.rows||[]}catch{r=[]}try{i=(await gr())?.rows||[]}catch{i=[]}if(!u){u=!0;try{const S=await Vr();S?.imported&&(r=(await In())?.rows||[],C.info(`${S.imported} Pflanzenschutz-Eintrag(e) in die Kulturführung übernommen.`),R())}catch{}}}!s&&a.length&&(s=ia(a[0])),I(),D()}async function M(){if(A()){try{n=(await Ur())?.rows||[]}catch{}try{r=(await In())?.rows||[]}catch{}}}async function D(){const S=s?O(s):null;if(!S||S.lat==null||S.lon==null)return;const E=ia(S);if(!d[E]){d[E]={loading:!0,weeks:[]};try{const z=await hd(S.lat,S.lon);d[E]=z}catch{d[E]={weeks:[]}}s===E&&Ee()}}function I(){ce(),l==="plan"?($().style.display="none",v().style.display="block",yd(v(),{units:a,anbau:n,mass:r,onSelect:S=>{s=S,W("flaechen")}})):(v().style.display="none",$().style.display="grid",We(),Ee()),e.querySelectorAll(".km-btn").forEach(S=>S.classList.toggle("active",S.dataset.mode===l))}function W(S){l=S,I()}function ce(){const S=x();if(!S)return;const E=a.filter(q=>q.typ==="haus").length,z=a.filter(q=>q.typ==="acker").length;let N=0,B=null;a.forEach(q=>{const{current:oe,next:X}=Rn(Q(n,q));oe&&N++,X&&X.pflanzDatum&&(!B||ie(X.pflanzDatum)<ie(B.crop.pflanzDatum))&&(B={crop:X,unit:q})});const V=Number(ua().replace(/-/g,"")),P=r.filter(q=>q.status==="geplant"),_=P.filter(q=>q.planDatum&&ie(q.planDatum)<V).length,j=B?Yt(ue(B.crop.pflanzDatum))+" · "+g(B.crop.kultur||"Kultur"):"–";S.innerHTML=`
      ${re("bi-grid-3x3-gap","Flächen",String(a.length),`${E} Häuser · ${z} Freiland`)}
      ${re("bi-flower2","Aktive Kulturen",String(N),`${Math.max(0,a.length-N)} frei`)}
      ${re("bi-list-check","Offene Maßnahmen",String(P.length),_?`<span style="color:var(--danger-600)">${_} überfällig</span>`:"im Plan")}
      ${re("bi-calendar-event","Nächste Pflanzung",j,B?g(B.unit.name):"nichts geplant")}
      <button class="btn btn-sm btn-psm-secondary-outline km-import" data-role="psm-import" title="Bestehende Pflanzenschutz-Einträge übernehmen"><i class="bi bi-arrow-down-circle me-1"></i>PSM übernehmen</button>`,S.querySelector('[data-role="psm-import"]')?.addEventListener("click",za)}function re(S,E,z,N){return`<div class="km-kpi"><div class="km-kpi-ic"><i class="bi ${S}"></i></div><div class="km-kpi-body"><div class="km-kpi-label">${g(E)}</div><div class="km-kpi-value">${z}</div><div class="km-kpi-sub">${N}</div></div></div>`}function ue(S){const E=new Date(String(S).slice(0,10)+"T00:00:00");return isNaN(E.getTime())?0:xd(E)}function We(){const S=y();if(!S)return;if(!a.length){S.innerHTML='<div class="km-empty"><i class="bi bi-geo-alt"></i><p>Noch keine Flächen.<br>Gewächshäuser unter <b>Einstellungen → Standorte</b> anlegen oder Freiland im <b>Karte</b>-Reiter zeichnen.</p></div>';return}const E=a.filter(B=>B.typ==="haus"),z=a.filter(B=>B.typ==="acker"),N=(B,V)=>V.length?`<div class="km-group">${g(B)}</div>`+V.map((P,_)=>yt(P,_)).join(""):"";S.innerHTML=N("Gewächshäuser",E)+N("Freiland",z),S.querySelectorAll("[data-ukey]").forEach(B=>B.addEventListener("click",()=>{s=B.dataset.ukey,We(),Ee(),D()}))}function yt(S,E){const z=ia(S),{current:N}=Rn(Q(n,S)),B=z===s,V=N?`<span class="km-row-crop">${g(N.kultur||"Kultur")}</span>`:'<span class="km-row-free">frei</span>';return`<div class="km-row${B?" sel":""}" data-ukey="${z}">
      <span class="km-dot" style="background:${N?en(N):J(S,E)}"></span>
      <div class="km-row-main"><div class="km-row-name">${g(S.name)}</div><div class="km-row-sub">${V}</div></div>
    </div>`}function Ee(){const S=f();if(!S)return;const E=s?O(s):null;if(!E){S.innerHTML='<div class="km-empty"><i class="bi bi-hand-index"></i><p>Fläche links auswählen.</p></div>';return}const z=Q(n,E),N=Q(r,E),{current:B,next:V}=Rn(z),P=d[ia(E)],_=E.typ==="haus"?"Gewächshaus":"Freiland",j=E.areaQm?`${Math.round(E.areaQm).toLocaleString("de-DE")} m²`:"";S.innerHTML=`
      <div class="km-head">
        <div class="km-head-l">
          <span class="km-head-name">${g(E.name)}</span>
          <span class="km-head-badge">${_}${j?" · "+j:""}</span>
        </div>
        <button class="btn btn-sm btn-psm-secondary-outline" data-act="map"><i class="bi bi-map me-1"></i>Auf Karte</button>
      </div>
      <div class="km-tiles">
        ${wt("JETZT",B,"current")}
        ${wt("NÄCHSTE",V,"next")}
      </div>
      ${st(z,N,P)}
      ${Ma()}
      ${Ia(N)}
      <div class="km-attr">${g(cd)}${P?.stale?" · offline (zwischengespeichert)":""}</div>`,S.querySelector('[data-act="map"]')?.addEventListener("click",()=>Sn(E)),S.querySelectorAll("[data-tile]").forEach(q=>q.addEventListener("click",oe=>{if(oe.target.closest("[data-edit-crop]"))return;const X=q.dataset.tile;Zt(E,X==="current"?B:V,X==="next"?"geplant":"aktiv")})),S.querySelectorAll("[data-edit-crop]").forEach(q=>q.addEventListener("click",()=>{const oe=q.dataset.editCrop==="current"?B:V;Zt(E,oe,q.dataset.editCrop==="next"?"geplant":"aktiv")})),S.querySelector('[data-act="add-massnahme"]')?.addEventListener("click",()=>Na(E,null,B)),S.querySelectorAll("[data-m-done]").forEach(q=>q.addEventListener("click",()=>Gt(q.dataset.mDone))),S.querySelectorAll("[data-m-edit]").forEach(q=>q.addEventListener("click",()=>{const oe=r.find(X=>X.id===q.dataset.mEdit);Na(E,oe,B)})),S.querySelectorAll("[data-m-del]").forEach(q=>q.addEventListener("click",()=>Ut(q.dataset.mDel))),S.querySelectorAll(".kw-bar[data-crop]").forEach(q=>q.addEventListener("click",()=>{const oe=z.find(X=>X.id===q.dataset.crop);oe&&Zt(E,oe,oe.status)}))}function wt(S,E,z){if(!E)return`<div class="km-tile empty" data-tile="${z}"><div class="km-tile-label">${S}</div><div class="km-tile-add"><i class="bi bi-plus-lg"></i> ${z==="next"?"Nächste Kultur planen":"Kultur eintragen"}</div></div>`;const N=en(E);let B="";if(z==="current"){const V=E.pflanzDatum?Math.max(0,Math.floor((Date.now()-new Date(E.pflanzDatum).getTime())/864e5)):null,P=[];E.pflanzDatum&&P.push("seit "+Yt(ue(E.pflanzDatum))),V!=null&&P.push("Tag "+V),E.ernteDatum&&P.push("Ernte "+Yt(ue(E.ernteDatum))),B=P.join(" · ")}else{const V=[];if(E.pflanzDatum){V.push("Pflanzung "+Yt(ue(E.pflanzDatum)));const P=Math.round((new Date(E.pflanzDatum).getTime()-Date.now())/(7*864e5));P>0&&V.push("in "+P+" Wo.")}else V.push("Termin offen");B=V.join(" · ")}return`<div class="km-tile" data-tile="${z}" style="border-left-color:${N}">
      <div class="km-tile-top"><div class="km-tile-label">${S}</div><button class="km-tile-edit" data-edit-crop="${z}" title="Bearbeiten"><i class="bi bi-pencil"></i></button></div>
      <div class="km-tile-crop">${g(E.kultur||"Kultur")}</div>
      <div class="km-tile-info">${g(B)}</div>
    </div>`}function ye(S,E){const z=new Date;let N=new Date(z.getFullYear(),z.getMonth(),z.getDate()-35),B=new Date(z.getFullYear(),z.getMonth(),z.getDate()+98);const V=P=>{if(!P)return;const _=new Date(String(P).slice(0,10)+"T00:00:00");isNaN(_.getTime())||(_<N&&(N=_),_>B&&(B=_))};return S.forEach(P=>{V(P.pflanzDatum),V(P.ernteDatum)}),E.forEach(P=>V(P.planDatum||P.erledigtDatum)),Ns(N,B)}function st(S,E,z){const N=ye(S,E),B=N.length,V=40;let P="";N.forEach((G,ne)=>{P+=`<div class="kw-h${G.isCurrent?" cur":""}${G.isFuture?" fut":""}" style="grid-row:1;grid-column:${ne+2}">${G.week}</div>`}),[...S].sort((G,ne)=>(ie(G.pflanzDatum)||0)-(ie(ne.pflanzDatum)||0)).forEach((G,ne)=>{const Y=Fs(N,G.pflanzDatum,G.ernteDatum);if(!Y)return;const Me=en(G,ne),ot=G.status==="geplant";P+=`<div class="kw-bar${ot?" planned":""}${Y.openEnd?" open":""}" data-crop="${G.id}" title="${g((G.kultur||"Kultur")+" · "+(Hi[G.status]?.label||G.status))}" style="grid-row:2;grid-column:${Y.s+2}/${Y.e+3};--cc:${Me}">${g(G.kultur||"Kultur")}</div>`});const j={};E.forEach(G=>{const ne=G.status==="erledigt"?G.erledigtDatum||G.planDatum:G.planDatum||G.erledigtDatum,Y=fn(N,ne);Y>=0&&(j[Y]=j[Y]||[]).push(G)}),Object.keys(j).forEach(G=>{const ne=Number(G),Y=j[ne].map(Me=>{const ot=pr(Me.art);return`<span class="kw-dot${Me.status==="erledigt"?" done":""}" title="${g(ot.label+(Me.notes?": "+Me.notes:""))}" style="--mc:${ot.color}"><i class="bi ${ot.icon}"></i></span>`}).join("");P+=`<div class="kw-mcell" style="grid-row:3;grid-column:${ne+2}">${Y}</div>`});const q={};(z?.weeks||[]).forEach(G=>q[G.weekKey]=G);const oe=Math.max(1,...(z?.weeks||[]).map(G=>G.precipSum||0));N.forEach((G,ne)=>{const Y=q[G.key];if(!Y){P+=`<div class="kw-wcell" style="grid-row:4;grid-column:${ne+2}"></div>`;return}const Me=Math.round(2+(Y.precipSum||0)/oe*20);P+=`<div class="kw-wcell${Y.isForecast?" fut":""}" style="grid-row:4;grid-column:${ne+2}" title="${Math.round(Y.precipSum||0)} mm · ${Y.tMaxAvg!=null?Math.round(Y.tMaxAvg):"–"}°C"><span class="kw-precip" style="height:${Me}px"></span><span class="kw-temp">${Y.tMaxAvg!=null?Math.round(Y.tMaxAvg)+"°":""}</span></div>`});const X=N.findIndex(G=>G.isCurrent),Le=X>=0?`<div class="kw-today" style="grid-row:1/5;grid-column:${X+2}"></div>`:"",De=z?.loading?'<div class="kw-loading">Wetter lädt…</div>':"";return`<div class="kw-scroll"><div class="kw-grid" style="grid-template-columns:62px repeat(${B},${V}px)">
      <div class="kw-rl" style="grid-row:1;grid-column:1">KW</div>
      <div class="kw-rl" style="grid-row:2;grid-column:1">Kultur</div>
      <div class="kw-rl" style="grid-row:3;grid-column:1">Maßn.</div>
      <div class="kw-rl" style="grid-row:4;grid-column:1">Wetter</div>
      ${P}${Le}
    </div>${De}</div>
    <div class="kw-split"><span>◀ Ist / Archiv</span><span>Vorhersage ▶</span></div>`}function Ma(){return`<div class="km-legend">${ur.map(S=>{const E=Wt[S];return`<span class="km-leg"><span class="km-leg-dot" style="background:${E.color}"></span>${g(E.label)}</span>`}).join("")}</div>`}function Ia(S,E){const z=S.filter(P=>P.status==="geplant").sort((P,_)=>(ie(P.planDatum)||9e15)-(ie(_.planDatum)||9e15)),N=S.filter(P=>P.status==="erledigt").sort((P,_)=>(ie(_.erledigtDatum)||0)-(ie(P.erledigtDatum)||0)).slice(0,8),B=Number(ua().replace(/-/g,"")),V=P=>{const _=pr(P.art),j=P.status==="erledigt"?P.erledigtDatum:P.planDatum,q=P.status==="geplant"&&j&&ie(j)<B,oe=j?Yt(ue(j)):"Termin offen",X=P.historyId?'<span class="km-tag">PSM</span>':"",Le=P.menge!=null?` · ${P.menge}${P.einheit?" "+g(P.einheit):""}`:"",De=P.notes||_.label;return`<div class="km-m">
        <i class="bi ${_.icon}" style="color:${_.color}"></i>
        <div class="km-m-main"><div class="km-m-title">${g(De)}${X}</div><div class="km-m-sub">${_.label}${P.mittel?" · "+g(P.mittel):""}${Le}</div></div>
        <div class="km-m-date${q?" overdue":""}">${oe}${q?" · überfällig":""}</div>
        <div class="km-m-acts">
          ${P.status==="geplant"?`<button class="km-ic" data-m-done="${P.id}" title="Als erledigt markieren"><i class="bi bi-check2"></i></button>`:""}
          <button class="km-ic" data-m-edit="${P.id}" title="Bearbeiten"><i class="bi bi-pencil"></i></button>
          <button class="km-ic danger" data-m-del="${P.id}" title="Löschen"><i class="bi bi-trash"></i></button>
        </div>
      </div>`};return`<div class="km-mhead"><span>Maßnahmen</span><button class="btn btn-sm btn-psm-primary" data-act="add-massnahme"><i class="bi bi-plus-lg me-1"></i>Maßnahme</button></div>
      ${z.length?`<div class="km-msub">Anstehend</div>${z.map(V).join("")}`:'<div class="km-mnone">Keine offenen Maßnahmen.</div>'}
      ${N.length?`<div class="km-msub">Erledigt</div>${N.map(V).join("")}`:""}`}function Sn(S){Ke("app",E=>({...E,activeSection:"acker"})),t.events?.emit?.("kultur:focusUnit",{typ:S.typ,id:S.id}),C.info("Karte geöffnet.")}async function za(){if(!A()){C.warning("Keine Datenbank aktiv.");return}try{const S=await Vr();await M(),I(),S?.imported?(C.success(`${S.imported} Pflanzenschutz-Maßnahme(n) übernommen.`),R()):C.info(`Nichts Neues zu übernehmen${S?.skipped?` (${S.skipped} nicht eindeutig zuordenbar)`:""}.`)}catch{C.error("Übernahme fehlgeschlagen.")}}async function Gt(S){const E=r.find(z=>z.id===S);if(E)try{await Qr({...E,status:"erledigt",erledigtDatum:E.erledigtDatum||ua()}),await M(),I(),R()}catch{C.error("Speichern fehlgeschlagen.")}}async function Ut(S){try{await Zr({id:S}),await M(),I(),R(),C.info("Maßnahme gelöscht.")}catch{C.error("Löschen fehlgeschlagen.")}}function Ie(){p&&(p.remove(),p=null)}function Vt(S,E,z,N){Ie();const B=document.createElement("div");B.className="kmodal-ov",B.innerHTML=`<div class="kmodal" role="dialog" aria-modal="true">
      <div class="kmodal-h"><span>${g(S)}</span><button class="kmodal-x" aria-label="Schließen"><i class="bi bi-x-lg"></i></button></div>
      <div class="kmodal-b">${E}</div>
      <div class="kmodal-f"><button class="btn btn-psm-secondary-outline" data-k="cancel">Abbrechen</button><button class="btn btn-psm-primary" data-k="save">${g(z)}</button></div>
    </div>`,e.appendChild(B),p=B,B.querySelector(".kmodal-x").addEventListener("click",Ie),B.querySelector('[data-k="cancel"]').addEventListener("click",Ie),B.addEventListener("mousedown",P=>{P.target===B&&Ie()}),B.querySelector('[data-k="save"]').addEventListener("click",()=>{N(B)!==!1&&Ie()});const V=B.querySelector("input,select,textarea");return setTimeout(()=>V?.focus(),30),B}function Ba(){const S=new Set;return`<datalist id="km-kultur-dl">${i.map(z=>z.kultur).filter(z=>z&&!S.has(z)&&S.add(z)).map(z=>`<option value="${g(z)}"></option>`).join("")}</datalist>`}function Zt(S,E,z){const N=E||{status:z,color:null},B=ba.map(_=>`<button type="button" class="km-sw${(N.color||"")===_?" on":""}" data-col="${_}" style="background:${_}"></button>`).join(""),V=`
      <label class="km-fld">Kultur<input list="km-kultur-dl" data-f="kultur" value="${g(N.kultur||"")}" placeholder="z. B. Babyleafsalate" /></label>${Ba()}
      <div class="km-frow">
        <label class="km-fld">Status<select data-f="status">${wd.map(_=>`<option value="${_}"${(N.status||z)===_?" selected":""}>${Hi[_].label}</option>`).join("")}</select></label>
        <label class="km-fld">Pflanzdatum<input type="date" data-f="pflanz" value="${(N.pflanzDatum||"").slice(0,10)}" /></label>
        <label class="km-fld">Erntedatum<input type="date" data-f="ernte" value="${(N.ernteDatum||"").slice(0,10)}" /></label>
      </div>
      <div class="km-fld">Farbe<div class="km-sws">${B}</div></div>
      <label class="km-fld">Notiz<textarea data-f="notes" rows="2" placeholder="optional">${g(N.notes||"")}</textarea></label>
      ${E?'<button type="button" class="btn btn-sm btn-psm-danger-outline" data-f="del" style="margin-top:8px"><i class="bi bi-trash me-1"></i>Kultur löschen</button>':""}`,P=Vt(E?"Kultur bearbeiten":"Kultur eintragen",V,"Speichern",_=>{const j=De=>_.querySelector(`[data-f="${De}"]`)?.value?.trim()||"",q=j("kultur");if(!q)return C.warning("Bitte eine Kultur angeben."),!1;const oe=_.querySelector(".km-sw.on"),X=i.find(De=>De.kultur===q)?.eppoCode||null,Le={id:E?.id,flaecheTyp:S.typ,flaecheId:S.id,kultur:q,eppoCode:X,status:j("status")||z,pflanzDatum:j("pflanz")||null,ernteDatum:j("ernte")||null,color:oe?.dataset.col||N.color||null,notes:j("notes")||null};(async()=>{try{await Mo(Le),await M(),I(),R()}catch{C.error("Speichern fehlgeschlagen.")}})()});P.querySelectorAll(".km-sw").forEach(_=>_.addEventListener("click",()=>{P.querySelectorAll(".km-sw").forEach(j=>j.classList.remove("on")),_.classList.add("on")})),P.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(E?.id)try{await Co({id:E.id}),await M(),I(),R(),Ie(),C.info("Kultur gelöscht.")}catch{C.error("Löschen fehlgeschlagen.")}})}function Na(S,E,z){const N=E||{art:"mechanisch",status:"geplant"},B=ur.map(j=>{const q=Wt[j];return`<button type="button" class="km-chip${(N.art||"mechanisch")===j?" on":""}" data-art="${j}" style="--ac:${q.color}"><i class="bi ${q.icon}"></i>${g(q.label)}</button>`}).join(""),V=(N.status||"geplant")==="erledigt",P=`
      <div class="km-fld">Art<div class="km-chips">${B}</div></div>
      <label class="km-fld">Bezeichnung<input data-f="notes" value="${g(N.notes||"")}" placeholder="z. B. Unkraut hacken, Kompostgabe" /></label>
      <div class="km-frow">
        <label class="km-fld">Status<select data-f="status"><option value="geplant"${V?"":" selected"}>geplant</option><option value="erledigt"${V?" selected":""}>erledigt</option></select></label>
        <label class="km-fld"><span data-role="datelabel">${V?"Erledigt am":"Plandatum"}</span><input type="date" data-f="datum" value="${((V?N.erledigtDatum:N.planDatum)||ua()).slice(0,10)}" /></label>
      </div>
      <div class="km-frow">
        <label class="km-fld">Menge<input type="number" step="0.1" data-f="menge" value="${N.menge!=null?N.menge:""}" placeholder="optional" /></label>
        <label class="km-fld">Einheit<input data-f="einheit" value="${g(N.einheit||"")}" placeholder="z. B. kg/ha, l" /></label>
        <label class="km-fld">Mittel<input data-f="mittel" value="${g(N.mittel||"")}" placeholder="optional" /></label>
      </div>
      <div class="km-psmhint" data-role="psmhint" style="${(N.art||"mechanisch")==="chemisch_psm"?"":"display:none"}"><i class="bi bi-info-circle me-1"></i>Für die rechtssichere Pflanzenschutz-Doku bitte den <b>PSM-Bereich</b> nutzen – diese Maßnahme dient der Planung/Übersicht.</div>
      ${E?'<button type="button" class="btn btn-sm btn-psm-danger-outline" data-f="del" style="margin-top:8px"><i class="bi bi-trash me-1"></i>Maßnahme löschen</button>':""}`,_=Vt(E?"Maßnahme bearbeiten":"Neue Maßnahme",P,"Speichern",j=>{const q=j.querySelector(".km-chip.on")?.dataset.art||"mechanisch",oe=j.querySelector('[data-f="status"]').value,X=j.querySelector('[data-f="datum"]').value||null,Le=ne=>{const Y=j.querySelector(`[data-f="${ne}"]`).value;return Y?Number(Y):null},De=ne=>j.querySelector(`[data-f="${ne}"]`).value.trim()||null,G={id:E?.id,flaecheTyp:S.typ,flaecheId:S.id,anbauId:E?.anbauId||z?.id||null,art:q,status:oe,planDatum:oe==="geplant"?X:E?.planDatum||null,erledigtDatum:oe==="erledigt"?X:null,menge:Le("menge"),einheit:De("einheit"),mittel:De("mittel"),historyId:E?.historyId||null,notes:De("notes")};(async()=>{try{await Qr(G),await M(),I(),R()}catch{C.error("Speichern fehlgeschlagen.")}})()});_.querySelectorAll(".km-chip").forEach(j=>j.addEventListener("click",()=>{_.querySelectorAll(".km-chip").forEach(q=>q.classList.remove("on")),j.classList.add("on"),_.querySelector('[data-role="psmhint"]').style.display=j.dataset.art==="chemisch_psm"?"":"none"})),_.querySelector('[data-f="status"]')?.addEventListener("change",j=>{_.querySelector('[data-role="datelabel"]').textContent=j.target.value==="erledigt"?"Erledigt am":"Plandatum"}),_.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(E?.id)try{await Zr({id:E.id}),await M(),I(),R(),Ie(),C.info("Maßnahme gelöscht.")}catch{C.error("Löschen fehlgeschlagen.")}})}e.querySelectorAll(".km-btn").forEach(S=>S.addEventListener("click",()=>W(S.dataset.mode))),document.addEventListener("keydown",S=>{S.key==="Escape"&&p&&Ie()}),window.addEventListener("psm:openKultur",S=>{const E=S?.detail;!E||!E.typ||!E.id||(s=E.typ+":"+E.id,W("flaechen"),c&&(We(),Ee(),D()))}),t.state.subscribe(S=>{S?.app?.activeSection==="kultur"&&(c?(async()=>(a=await qi(t),I(),D()))():(c=!0,Te()))}),ce()}function xd(e){const t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),a=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-a);const n=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t.getTime()-n.getTime())/864e5+1)/7)}function Sd(){return`
  <style>
    .kultur-wrap{display:flex;flex-direction:column;gap:12px;min-height:calc(100vh - 120px)}
    .kultur-top{display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between}
    .kultur-modes{display:inline-flex;background:var(--surface-2);border:1px solid var(--border-1);border-radius:9px;padding:3px}
    .km-btn{border:0;background:transparent;color:var(--text-muted);font-size:13px;font-weight:600;padding:6px 14px;border-radius:7px;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
    .km-btn.active{background:var(--surface-1);color:var(--text);box-shadow:0 1px 2px rgba(0,0,0,.08)}
    .kultur-kpis{display:flex;flex-wrap:wrap;gap:10px;align-items:stretch}
    .km-kpi{display:flex;gap:10px;align-items:center;background:var(--surface-1);border:1px solid var(--border-1);border-radius:11px;padding:9px 13px;min-width:148px}
    .km-kpi-ic{width:34px;height:34px;border-radius:9px;background:var(--surface-2);display:flex;align-items:center;justify-content:center;color:#16a34a;font-size:16px;flex:none}
    .km-kpi-label{font-size:11px;color:var(--text-dim)}
    .km-kpi-value{font-size:18px;font-weight:700;color:var(--text);line-height:1.15}
    .km-kpi-sub{font-size:10.5px;color:var(--text-dim)}
    .km-import{white-space:nowrap}
    .kultur-body{display:grid;grid-template-columns:240px 1fr;gap:12px;flex:1;min-height:0}
    .kultur-list{background:var(--surface-1);border:1px solid var(--border-1);border-radius:12px;padding:8px;overflow-y:auto;max-height:calc(100vh - 200px)}
    .km-group{font-size:11px;color:var(--text-dim);text-transform:uppercase;letter-spacing:.04em;padding:8px 8px 4px}
    .km-row{display:flex;align-items:center;gap:9px;padding:8px;border-radius:8px;cursor:pointer}
    .km-row:hover{background:var(--surface-2)}
    .km-row.sel{background:var(--surface-3);box-shadow:inset 2px 0 0 #16a34a}
    .km-dot{width:9px;height:9px;border-radius:3px;flex:none}
    .km-row-main{min-width:0}
    .km-row-name{font-size:13.5px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .km-row-sub{font-size:11.5px}
    .km-row-crop{color:var(--text-muted)}
    .km-row-free{color:var(--text-dim)}
    .kultur-detail{background:var(--surface-1);border:1px solid var(--border-1);border-radius:12px;padding:14px;overflow-y:auto;max-height:calc(100vh - 200px)}
    .km-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:var(--text-dim);text-align:center;padding:36px 14px;height:100%}
    .km-empty i{font-size:30px;opacity:.5}
    .km-empty p{font-size:13px;line-height:1.5;margin:0}
    .km-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}
    .km-head-name{font-size:17px;font-weight:700;color:var(--text)}
    .km-head-badge{font-size:11.5px;color:#0f766e;background:rgba(16,163,74,.1);border-radius:7px;padding:2px 8px;margin-left:8px}
    .km-tiles{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px}
    .km-tile{background:var(--surface-2);border-radius:10px;border-left:3px solid #16a34a;padding:10px 12px;cursor:pointer}
    .km-tile.empty{border-left-color:var(--border-2);display:flex;flex-direction:column;justify-content:center;min-height:78px}
    .km-tile-top{display:flex;align-items:center;justify-content:space-between}
    .km-tile-label{font-size:10.5px;color:var(--text-dim);text-transform:uppercase;letter-spacing:.05em}
    .km-tile-edit{border:0;background:transparent;color:var(--text-dim);cursor:pointer;padding:2px;font-size:12px}
    .km-tile-edit:hover{color:var(--text)}
    .km-tile-crop{font-size:16px;font-weight:700;color:var(--text);margin-top:2px}
    .km-tile-info{font-size:12px;color:var(--text-muted)}
    .km-tile-add{color:var(--text-dim);font-size:13px;display:flex;align-items:center;gap:6px}
    .kw-scroll{overflow-x:auto;border:1px solid var(--border-1);border-radius:10px;padding:8px;background:var(--surface-1)}
    .kw-grid{display:grid;column-gap:2px;row-gap:6px;align-items:center;position:relative;min-width:min-content}
    .kw-rl{position:sticky;left:0;z-index:3;background:var(--surface-1);font-size:11px;color:var(--text-muted);padding-right:6px}
    .kw-h{text-align:center;font-size:11px;color:var(--text-muted)}
    .kw-h.cur{color:#16a34a;font-weight:700}
    .kw-h.fut{color:var(--info-600,#0891b2)}
    .kw-bar{height:20px;border-radius:5px;background:var(--cc);color:#fff;font-size:11px;display:flex;align-items:center;padding:0 7px;overflow:hidden;white-space:nowrap;cursor:pointer;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)}
    .kw-bar.planned{background:transparent;color:var(--cc);border:1.5px dashed var(--cc)}
    .kw-bar.open{border-top-right-radius:0;border-bottom-right-radius:0}
    .kw-mcell{display:flex;flex-wrap:wrap;gap:2px;justify-content:center}
    .kw-dot{width:18px;height:18px;border-radius:50%;background:#fff;border:1.5px solid var(--mc);color:var(--mc);display:flex;align-items:center;justify-content:center;font-size:10px}
    .kw-dot.done{background:var(--mc);color:#fff}
    .kw-wcell{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:1px;min-height:30px}
    .kw-precip{width:9px;border-radius:2px;background:#0ea5e9}
    .kw-wcell.fut .kw-precip{background:transparent;border:1px solid #7dd3fc}
    .kw-temp{font-size:9.5px;color:var(--text-dim);line-height:1}
    .kw-today{border-left:2px dashed #16a34a;pointer-events:none;z-index:1}
    .kw-loading{font-size:11px;color:var(--text-dim);padding:4px}
    .kw-split{display:flex;justify-content:space-between;font-size:10.5px;color:var(--text-dim);margin:4px 2px 10px}
    .km-legend{display:flex;flex-wrap:wrap;gap:5px 12px;font-size:11px;color:var(--text-muted);margin-bottom:14px}
    .km-leg{display:flex;align-items:center;gap:5px}
    .km-leg-dot{width:10px;height:10px;border-radius:3px}
    .km-mhead{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
    .km-mhead>span{font-size:14px;font-weight:700;color:var(--text)}
    .km-msub{font-size:11px;color:var(--text-dim);text-transform:uppercase;letter-spacing:.04em;margin:10px 0 4px}
    .km-mnone{font-size:12.5px;color:var(--text-dim);padding:6px 0}
    .km-m{display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid var(--border-1);border-radius:9px;margin-bottom:6px}
    .km-m>i{font-size:16px;flex:none}
    .km-m-main{flex:1;min-width:0}
    .km-m-title{font-size:13px;font-weight:600;color:var(--text);display:flex;align-items:center;gap:6px}
    .km-m-sub{font-size:11px;color:var(--text-dim)}
    .km-m-date{font-size:11.5px;color:var(--text-muted);white-space:nowrap}
    .km-m-date.overdue{color:var(--danger-600);font-weight:600}
    .km-tag{font-size:9.5px;background:rgba(220,38,38,.12);color:var(--danger-600);border-radius:5px;padding:1px 5px;font-weight:700}
    .km-m-acts{display:flex;gap:3px}
    .km-ic{border:1px solid var(--border-1);background:var(--surface-1);color:var(--text-muted);width:27px;height:27px;border-radius:7px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:13px}
    .km-ic:hover{background:var(--surface-3);color:var(--text)}
    .km-ic.danger:hover{color:var(--danger-600)}
    .km-attr{font-size:10.5px;color:var(--text-dim);border-top:1px solid var(--border-1);margin-top:12px;padding-top:8px}
    .kultur-board{background:var(--surface-1);border:1px solid var(--border-1);border-radius:12px;padding:12px;overflow:auto;max-height:calc(100vh - 190px)}
    /* Modal */
    .kmodal-ov{position:fixed;inset:0;z-index:3000;background:rgba(15,23,42,.4);display:flex;align-items:center;justify-content:center;padding:16px}
    .kmodal{background:var(--surface-1);border-radius:14px;width:min(520px,96vw);max-height:92vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.3)}
    .kmodal-h{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid var(--border-1);font-size:15px;font-weight:700;color:var(--text)}
    .kmodal-x{border:0;background:transparent;color:var(--text-dim);cursor:pointer;font-size:15px}
    .kmodal-b{padding:14px 16px;overflow-y:auto;display:flex;flex-direction:column;gap:10px}
    .kmodal-f{display:flex;justify-content:flex-end;gap:8px;padding:12px 16px;border-top:1px solid var(--border-1)}
    .km-fld{display:flex;flex-direction:column;gap:4px;font-size:12px;color:var(--text-muted)}
    .km-fld input,.km-fld select,.km-fld textarea{padding:8px 9px;border:1px solid var(--border-1);border-radius:8px;font-size:13px;background:var(--surface-1);color:var(--text);width:100%}
    .km-frow{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
    .km-sws{display:flex;gap:6px;flex-wrap:wrap}
    .km-sw{width:26px;height:26px;border-radius:7px;border:2px solid rgba(0,0,0,.12);cursor:pointer;padding:0}
    .km-sw.on{box-shadow:0 0 0 2px var(--text)}
    .km-chips{display:flex;flex-wrap:wrap;gap:6px}
    .km-chip{display:inline-flex;align-items:center;gap:5px;border:1.5px solid var(--border-1);background:var(--surface-1);color:var(--text-muted);border-radius:8px;padding:6px 10px;font-size:12px;cursor:pointer}
    .km-chip.on{border-color:var(--ac);color:var(--ac);background:color-mix(in srgb,var(--ac) 10%,transparent)}
    .km-psmhint{font-size:11.5px;color:var(--text-muted);background:var(--surface-2);border-radius:8px;padding:8px 10px;line-height:1.45}
    /* Anbauplan-Board */
    .kb-wrap{overflow:auto;max-width:100%}
    .kb-grid{display:grid;column-gap:2px;row-gap:3px;align-items:center;position:relative;min-width:min-content}
    .kb-corner{position:sticky;left:0;top:0;z-index:5;background:var(--surface-1);font-size:11px;font-weight:600;color:var(--text-muted);display:flex;align-items:center}
    .kb-h{position:sticky;top:0;z-index:3;background:var(--surface-1);text-align:center;font-size:10.5px;color:var(--text-muted)}
    .kb-h.cur{color:#16a34a;font-weight:700}
    .kb-h.fut{color:var(--info-600,#0891b2)}
    .kb-group{font-size:10.5px;color:var(--text-dim);text-transform:uppercase;letter-spacing:.04em;padding-top:4px}
    .kb-name{position:sticky;left:0;z-index:2;background:var(--surface-1);font-size:12px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;padding-right:6px}
    .kb-name:hover{color:#16a34a}
    .kb-bar{height:18px;border-radius:4px;background:var(--cc);color:#fff;font-size:10px;display:flex;align-items:center;padding:0 5px;overflow:hidden;white-space:nowrap;z-index:1}
    .kb-bar.planned{background:transparent;color:var(--cc);border:1.5px dashed var(--cc)}
    .kb-m{width:7px;height:7px;border-radius:2px;background:var(--mc);align-self:start;justify-self:center;margin-top:1px;z-index:2}
    .kb-today{border-left:2px dashed #16a34a;pointer-events:none;z-index:1}
    @media(max-width:820px){.kultur-body{grid-template-columns:1fr}.kultur-list{max-height:200px}.km-frow{grid-template-columns:1fr 1fr}}
  </style>
  <section class="calc-section kultur-wrap">
    <div class="kultur-top">
      <div class="kultur-modes">
        <button class="km-btn active" data-mode="flaechen"><i class="bi bi-grid-1x2"></i>Flächen</button>
        <button class="km-btn" data-mode="plan"><i class="bi bi-calendar3"></i>Anbauplan</button>
      </div>
      <div class="kultur-kpis" data-role="kpis"></div>
    </div>
    <div class="kultur-body" data-role="flaechen-view">
      <aside class="kultur-list" data-role="list"></aside>
      <div class="kultur-detail" data-role="detail"></div>
    </div>
    <div class="kultur-board" data-role="board-view" style="display:none"></div>
  </section>`}const Ed=["pflanzenschutz.json","history.json","entries.json"];let Oi=!1,T=null,rt=!1;const At=25,Wn=new Intl.NumberFormat("de-DE");let me=0,ja=null,Ki=null;const Ld=bs({id:"import",label:"Import-Vorschau",budget:{initialLoad:20,maxItems:50}});let mr=null;function Dd(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function $d(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Ad(e,t){const a=e.querySelector('[data-role="import-log-list"]');if(a){if(!t.length){a.innerHTML='<tr><td colspan="5" class="text-muted small">Noch keine Importe protokolliert.</td></tr>';return}a.innerHTML=t.map(n=>{const r=n.rangeStart||n.rangeEnd?`${va(n.rangeStart)||n.rangeStart||"?"} – ${va(n.rangeEnd)||n.rangeEnd||"?"}`:"-",i=[n.source,n.device].filter(Boolean),s=i.length?g(i.join(" · ")):"-";return`
        <tr>
          <td>${g($d(n.importedAt))}</td>
          <td>${s}</td>
          <td class="text-end text-success">${n.added}</td>
          <td class="text-end text-muted">${n.skipped}</td>
          <td class="small text-muted">${g(r)}</td>
        </tr>`}).join("")}}async function tn(e){if(le()==="sqlite")try{const t=await Io(50);Ad(e,t.items||[])}catch(t){console.warn("Import-Historie konnte nicht geladen werden",t)}}function it(e,t,a="info"){const n=e.querySelector('[data-role="import-hint"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a} small mt-3`,n.textContent=t}}function Lt(e,t){const a=e.querySelector('[data-role="import-feedback"]');a&&(a.textContent=t)}function bt(e){const t=e.querySelector('[data-action="clear-import"]'),a=e.querySelector('[data-action="focus-import"]'),n=e.querySelector('[data-action="run-import"]'),r=!!T;if(t&&(t.disabled=!r||rt),a&&(a.disabled=!r||rt),n){const i=!!(T?.importableEntries?.length&&T.stats||T?.fotos?.length);n.disabled=!r||!i||rt}}function Pd(e){T=null,qd(e);const t=e.querySelector('[data-role="import-summary-card"]'),a=e.querySelector('[data-role="import-file"]');t&&t.classList.add("d-none"),a&&(a.value=""),Lt(e,""),it(e,"Bereit für eine neue Importdatei."),bt(e),Bt()}function Ts(e){if(e.dateIso)return e.dateIso;if(e.datum){const t=new Date(e.datum);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.date){const t=new Date(e.date);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.savedAt){const t=new Date(e.savedAt);if(!Number.isNaN(t.getTime()))return t.toISOString()}return null}function gn(e){return e?va(e)||e.slice(0,10):"-"}function qs(e){return e.savedAt||(e.savedAt=e.createdAt||e.dateIso||new Date().toISOString()),e}function Ri(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function Cd(e){if(!e||typeof e!="object")return null;const t={...e};if(!Array.isArray(t.items)){const a=e.items;t.items=Array.isArray(a)?[...a]:[]}return qs(t),t}function Hs(e,t){const a=e.map(n=>Ts(n)).filter(n=>!!n).sort();return{startIso:a[0]||t?.filters?.startDate||null,endIso:a[a.length-1]||t?.filters?.endDate||null}}function Md(e){if(!e)return;const t=Ri(e.startIso,"start"),a=Ri(e.endIso,"end");if(!t&&!a)return;const n={};return t&&(n.startDate=t),a&&(n.endDate=a),n}async function _s(e,t){if(le()!=="sqlite"){const l=Be(e.history);return new Set(l.map(c=>bn(c)).filter(c=>!!c))}const n=Md(t);if(!n)return new Set;const r=new Set;let i=1;const s=500;try{for(;;){const l=await is({page:i,pageSize:s,filters:n,sortDirection:"asc"});if(l.items.forEach(c=>{const u=bn(c);u&&r.add(u)}),i*s>=l.totalCount)break;i+=1}}catch(l){return console.warn("Konnte vorhandene Einträge für Duplikatprüfung nicht laden",l),new Set}return r}function bn(e){const t=typeof e.clientUuid=="string"&&e.clientUuid?e.clientUuid:"";if(t)return`uuid:${t}`;const a=e.savedAt||e.dateIso||e.createdAt||e.datum||"",n=e.ersteller||"",r=e.kultur||"",i=e.invekos||e.standort||"";return[a,n,r,i].join("|")}function Id(e,t,a,n){const r=n||Hs(e,a),i=r.startIso,s=r.endIso,l=new Set,c=new Set;return t.forEach(u=>{u.ersteller&&l.add(u.ersteller),u.kultur&&c.add(u.kultur)}),{startDateLabel:gn(i),endDateLabel:gn(s),startDateRaw:i,endDateRaw:s,entryCount:e.length,importableCount:t.length,duplicateCount:e.length-t.length,creators:Array.from(l).slice(0,5),crops:Array.from(c).slice(0,5)}}function zd(e,t){const a=e.querySelector('[data-role="import-stats"]');if(!a)return;if(!t){a.innerHTML="";return}const n=t.stats,r=t.metadata?.filters;a.innerHTML=`
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
  `}function Bd(e,t){const a=e.querySelector('[data-role="import-warnings"]');if(!a)return;if(!t||!t.warnings.length){a.innerHTML="";return}const n=t.warnings.map(r=>`<li>${g(r)}</li>`).join("");a.innerHTML=`
    <div class="alert alert-warning">
      <strong>Hinweise:</strong>
      <ul class="mb-0">${n}</ul>
    </div>
  `}function Os(e){const t=e.entries.length;if(!t)return me=0,{start:0,end:0,total:0};const a=Math.max(Math.ceil(t/At),1);me>=a&&(me=a-1),me<0&&(me=0);const n=me*At,r=Math.min(n+At,t);return{start:n,end:r,total:t}}function Nd(e){const t=e.querySelector('[data-role="import-pager"]');return t?((!ja||Ki!==t)&&(ja?.destroy(),ja=Aa(t,{onPrev:()=>Fd(e),onNext:()=>Td(e),labels:{prev:"Zurück",next:"Weiter",loading:"Vorschau wird geladen...",empty:"Keine Einträge verfügbar"}}),Ki=t),ja):null}function ha(e,t){const a=Nd(e);if(!a)return;if(!t){me=0,a.update({status:"hidden"});return}const n=t.entries.length;if(!n){me=0,a.update({status:"disabled",info:"Keine Einträge vorhanden."});return}const{start:r,end:i}=Os(t),s=`Einträge ${Wn.format(r+1)}–${Wn.format(i)} von ${Wn.format(n)}`;a.update({status:"ready",info:s,canPrev:me>0,canNext:i<n})}function Fd(e){!T||me===0||(me=Math.max(me-1,0),Br(e,T))}function Td(e){if(!T)return;const t=T.entries.length;if(!t)return;const a=Math.max(Math.ceil(t/At)-1,0);me>=a||(me=Math.min(me+1,a),Br(e,T))}function qd(e){me=0,e&&ha(e,T)}function Br(e,t){const a=e.querySelector('[data-role="import-preview-table"]');if(!a){Bt();return}if(!t){a.innerHTML="",ha(e,null),Bt();return}if(!t.entries.length){a.innerHTML='<tr><td colspan="5" class="text-center text-muted">Keine Einträge</td></tr>',ha(e,t),Bt();return}const{start:r,end:i}=Os(t),l=t.entries.slice(r,i).map(c=>{const u=gn(Ts(c));return`
        <tr>
          <td>${g(u)}</td>
          <td>${g(c.kultur||"-")}</td>
          <td>${g(c.ersteller||"-")}</td>
          <td>${g(c.standort||c.invekos||"-")}</td>
          <td>${g(c.savedAt?gn(c.savedAt):"-")}</td>
        </tr>
      `}).join("");a.innerHTML=l,ha(e,t),Bt()}async function Hd(e){const t=No(e),a=Object.keys(t),n=a.find(u=>Ed.some(d=>u.toLowerCase().endsWith(d)));if(!n)throw new Error("ZIP enthält keine 'pflanzenschutz.json'.");const r=JSON.parse(jn(t[n])),i=a.find(u=>u.toLowerCase().endsWith("metadata.json")),s=i?JSON.parse(jn(t[i])):null,l=Array.isArray(r)?r:Array.isArray(r.entries)?r.entries:Array.isArray(r.history)?r.history:[],c=Array.isArray(r?.fotos)?r.fotos:[];for(const u of c){if(u?.data)continue;const d=u?.file?String(u.file):null,p=d?a.find(m=>m===d||m.toLowerCase().endsWith(d.toLowerCase())):null;p&&t[p]&&(u.data=_d(t[p]),u.mime||(u.mime="image/jpeg"))}return{entries:l,metadata:s,fotos:c}}function _d(e){let t="";for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode(...e.subarray(n,n+32768));return btoa(t)}async function Od(e){const t=jn(e),a=JSON.parse(t);if(Array.isArray(a))return{entries:a,metadata:null,fotos:[]};const n=Array.isArray(a.fotos)?a.fotos:[];if(Array.isArray(a.entries))return{entries:a.entries,metadata:a.metadata||null,fotos:n};if(Array.isArray(a.history))return{entries:a.history,metadata:a.metadata||null,fotos:n};if(n.length)return{entries:[],metadata:a.metadata||null,fotos:n};throw new Error("JSON enthält keine Eintragsliste.")}async function Kd(e,t){const a=new Uint8Array(await e.arrayBuffer()),n=/\.zip$/i.test(e.name)||e.type==="application/zip",{entries:r,metadata:i,fotos:s}=n?await Hd(a):await Od(a),l=Array.isArray(s)?s:[],c=(Array.isArray(r)?r:[]).map(v=>Cd(v)).filter(v=>!!v);if(!c.length&&!l.length)throw new Error("Die Datei enthielt keine verwertbaren Einträge.");const u=Hs(c,i),d=await _s(t,u),p=new Set,m=[];let y=0;c.forEach(v=>{const $=bn(v);if(!$){m.push(v);return}if(d.has($)||p.has($)){y+=1;return}p.add($),m.push(v)});const f=Id(c,m,i,u),x=[];return y&&x.push(`${y} Datensätze wurden wegen gleicher Kennung übersprungen.`),(!f.startDateRaw||!f.endDateRaw)&&x.push("Zeitraum konnte nicht eindeutig ermittelt werden."),{filename:e.name,entries:c,importableEntries:m,metadata:i,stats:f,warnings:x,lastImportRefs:[],fotos:l}}function Wi(){if(!T)return"Keine Datei";const e=[];return rt&&e.push("Verarbeitung"),T.warnings.length&&e.push("Warnungen"),T.stats.importableCount<T.stats.entryCount&&e.push("Duplikate entfernt"),e.length?e.join(" · "):void 0}function Rd(){const e=!!T,t=e?Math.max(Math.ceil((T?.entries.length||0)/At),1):null,a=e?{items:T?.entries.length??0,totalCount:T?.stats.entryCount??null,cursor:T&&(T.entries.length||0)>At?`Seite ${me+1}${t?` / ${t}`:""}`:null,payloadKb:vs(T?.entries.slice(0,At)),lastUpdated:mr,note:Wi()}:{items:0,totalCount:0,cursor:null,payloadKb:0,lastUpdated:mr,note:Wi()};hs(Ld,a)}function Bt(){mr=new Date().toISOString(),Rd()}function fr(e){const t=e.querySelector('[data-role="import-summary-card"]');if(!t)return;if(!T){t.classList.add("d-none"),ha(e,null),bt(e),Bt();return}t.classList.remove("d-none"),me=0;const a=t.querySelector('[data-role="import-file-name"]'),n=t.querySelector('[data-role="import-summary-subline"]');a&&(a.textContent=T.filename),n&&(n.textContent=`${T.stats.importableCount} von ${T.stats.entryCount} Einträgen importierbar`),zd(e,T),Bd(e,T),Br(e,T),bt(e)}async function Wd(){const e=le();if(!e||e==="memory"||e==="sqlite")return;const t=qe();await He(t)}function ji(e,t){if(!t.length)return[];const a=typeof e.state.updateSlice=="function"?e.state.updateSlice:Ke,n=[];return a("history",r=>{const i=Da(r),s=i.items.slice(),l=s.length;return t.forEach((c,u)=>{n.push(l+u),s.push(c)}),{...i,items:s,totalCount:s.length,lastUpdatedAt:new Date().toISOString()}}),n}async function jd(e,t){if(!T){window.alert("Bitte zuerst eine Importdatei laden.");return}const a=T.fotos||[];if(!T.importableEntries.length&&!a.length){window.alert("Alle Einträge wurden bereits importiert oder als Duplikat erkannt.");return}rt=!0,bt(e),Lt(e,"Import läuft ...");const n=t.state.getState(),r={startIso:T.stats.startDateRaw,endIso:T.stats.endDateRaw};let i=new Set;try{i=await _s(n,r)}catch(x){console.warn("Duplikatprüfung vor Import fehlgeschlagen",x)}const s=new Set(i),l=[];let c=0;if(T.importableEntries.forEach(x=>{const v=bn(x);if(v&&s.has(v)){c+=1;return}v&&s.add(v),l.push(x)}),!l.length&&!a.length){Lt(e,"Keine neuen Einträge gefunden."),it(e,"Alle Datensätze sind bereits importiert worden.","warning"),rt=!1,bt(e);return}const u=le(),d=[],p=[];let m=0,y=0;const f=l.map(x=>qs({...x}));try{if(u==="sqlite"){const A=[];for(const R of f)try{const Q=await Vi(R);if(Q?.duplicate){c+=1;continue}Q?.id!=null&&(d.push({source:"sqlite",ref:Q.id}),A.push(R))}catch(Q){console.error("appendHistoryEntry failed",Q),p.push(R.savedAt||"Unbekannter Eintrag")}ji(t,A);for(const R of a)try{(await zo(R))?.duplicate?y+=1:m+=1}catch(Q){console.error("appendFoto failed",Q)}m&&window.dispatchEvent(new CustomEvent("fotos:changed"));try{await Oe()}catch(R){console.warn("SQLite-Datei konnte nach dem Import nicht gespeichert werden",R)}}else ji(t,f).forEach(R=>{d.push({source:"state",ref:R})}),await Wd();const x=d.length;if(x||m){u==="sqlite"&&x&&t.events?.emit?.("history:data-changed",{type:"created-bulk",count:x});const A=[];x&&A.push(`${x} Einträge`),m&&A.push(`${m} Foto(s)`),Lt(e,`${A.join(" und ")} importiert.${p.length?` ${p.length} Einträge konnten nicht übernommen werden.`:""}`.trim()),T.lastImportRefs=d,T.importableEntries=[],T.stats={...T.stats,importableCount:0},fr(e)}else Lt(e,"Keine neuen Daten importiert.");const v=[];let $="success";if(p.length&&(v.push(`${p.length} Einträge konnten nicht gespeichert werden. Details siehe Konsole.`),$="warning"),c&&(v.push(`${c} Einträge wurden während des Imports als Duplikat übersprungen.`),$="warning"),y&&v.push(`${y} Foto(s) waren bereits vorhanden (übersprungen).`),v.length||v.push("Import abgeschlossen."),it(e,v.join(" "),$),u==="sqlite"&&(x||c||m||y))try{const A=[];p.length&&A.push(`${p.length} fehlgeschlagen`),m&&A.push(`${m} Fotos`),y&&A.push(`${y} Fotos doppelt`),await Bo({source:T.filename||null,device:T.metadata?.device||T.metadata?.label||null,added:x,skipped:c,rangeStart:T.stats.startDateRaw,rangeEnd:T.stats.endDateRaw,note:A.length?A.join(", "):null}),await Oe().catch(()=>{}),await tn(e)}catch(A){console.warn("Import-Historie konnte nicht geschrieben werden",A)}}catch(x){console.error("Import fehlgeschlagen",x),Lt(e,"Import fehlgeschlagen. Siehe Konsole für Details."),it(e,"Import fehlgeschlagen. Bitte erneut versuchen.","danger")}finally{rt=!1,bt(e)}}function Gd(e,t,a){if(!e.events?.emit)return;const n=t.metadata?.label||t.metadata?.filters?.label||`Import ${t.filename}`;e.events.emit("documentation:focus-range",{startDate:t.stats.startDateRaw||void 0,endDate:t.stats.endDateRaw||void 0,label:n,reason:"import",entryIds:a,autoSelectFirst:!!a.length})}function Ud(e,t){if(!T){window.alert("Bitte zuerst eine Importdatei laden.");return}if(!T.stats.startDateRaw||!T.stats.endDateRaw){window.alert("Zeitraum konnte nicht bestimmt werden.");return}Gd(t,T,T.lastImportRefs),it(e,"Dokumentation wurde auf den Importzeitraum fokussiert.")}function Vd(e,t){const a=e.querySelector('[data-role="import-file"]');a&&a.addEventListener("change",()=>{const n=a.files?.[0];n&&(rt=!0,it(e,"Datei wird analysiert ..."),bt(e),Lt(e,""),Kd(n,t.state.getState()).then(r=>{T=r,fr(e),it(e,`${r.importableEntries.length} Einträge bereit zum Import.`)}).catch(r=>{console.error("Importdatei konnte nicht gelesen werden",r),it(e,r?.message||"Importdatei konnte nicht gelesen werden.","danger"),T=null,fr(e)}).finally(()=>{rt=!1,bt(e)}))}),e.addEventListener("click",n=>{const r=n.target?.closest("[data-action]");if(!r)return;const i=r.dataset.action;if(i){if(i==="clear-import"){Pd(e);return}if(i==="focus-import"){Ud(e,t);return}i==="run-import"&&jd(e,t)}})}function Zd(e,t){if(!e||Oi)return;const a=e;a.innerHTML="";const n=Dd();a.appendChild(n),Vd(n,t),it(n,"Wähle eine Datei aus, um den Import zu starten."),tn(n),Ve("database:connected",()=>void tn(n)),Ve("app:sectionChanged",r=>{(r==="daten"||r==="documentation"||r==="import")&&tn(n)}),Oi=!0}const Et=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function Qd(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function Mt(e,t,a,n){return`
    <div class="dash-card"${n?` data-goto="${n}" style="cursor:pointer;"`:""}>
      <i class="bi ${e} dash-card-icon"></i>
      <div class="dash-card-value">${a}</div>
      <div class="dash-card-label">${g(t)}</div>
    </div>`}function Jd(){return`
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
  </section>`}function Yd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Jd();const a=e.querySelector('[data-role="dash-cards"]'),n=e.querySelector('[data-role="dash-warn"]'),r=e.querySelector('[data-role="dash-recent"]');e.addEventListener("click",s=>{const l=s.target?.closest("[data-goto]");if(!l)return;const c=l.getAttribute("data-goto");c&&t.state.updateSlice("app",u=>({...u,activeSection:c}))});const i=async()=>{if(le()!=="sqlite"){a&&(a.innerHTML='<div class="dash-empty">Bitte zuerst eine Datenbank öffnen.</div>');return}const s=t.state.getState(),l=(Be(s.gps?.points)||[]).length;let c=0,u=0,d=0,p=0,m=[],y=[],f=0;try{c=(await gr())?.rows?.length||0}catch{}try{u=(await rs())?.rows?.length||0}catch{}try{const x=(await br())?.rows||[];d=x.length,p=x.reduce((v,$)=>v+($.plants||0),0)}catch{}try{m=(await ns())?.rows||[]}catch{}try{const x=await is({}),v=x?.entries||x?.rows||[];f=x?.totalCount??v.length,y=v.slice(0,6)}catch{}if(a&&(a.innerHTML=[Mt("bi-geo-alt","Standorte",Et(l)),Mt("bi-flower1","Kulturen",Et(c)),Mt("bi-droplet","Mittel im Sortiment",Et(u),"lager"),Mt("bi-journal-check","Anwendungen",Et(f),"documentation"),Mt("bi-map","Acker-Flächen",Et(d),"acker"),Mt("bi-flower3","Pflanzen (Acker)",Et(p),"acker")].join("")),n){const x=[];m.forEach(v=>{v.bestand<=0&&(v.verbraucht>0||v.zugang>0)&&x.push(`<div class="dash-row"><span><i class="bi bi-box-seam me-1" style="color:#ef4444"></i>${g(v.name)}</span><span style="color:#ef4444">Bestand ${Et(v.bestand)} ${g(v.einheit||"")}</span></div>`)}),m.forEach(v=>{if(!v.zulEnde)return;const $=Math.round((new Date(v.zulEnde).getTime()-Date.now())/864e5);$<0?x.push(`<div class="dash-row"><span><i class="bi bi-calendar-x me-1" style="color:#ef4444"></i>${g(v.name)}</span><span style="color:#ef4444">Zulassung abgelaufen</span></div>`):$<180&&x.push(`<div class="dash-row"><span><i class="bi bi-calendar-event me-1" style="color:#f59e0b"></i>${g(v.name)}</span><span style="color:#f59e0b">Zulassung endet in ${$} T</span></div>`)}),n.innerHTML=x.length?x.slice(0,8).join(""):'<div class="dash-empty">Alles im grünen Bereich. ✓</div>'}r&&(r.innerHTML=y.length?y.map(x=>{const v=Qd(x.datum||x.dateIso||x.created_at||x.createdAt||null),$=x.kultur||"",A=x.standort||"";return`<div class="dash-row"><span>${g(A)}${$?" · "+g($):""}</span><span class="dash-empty" style="padding:0">${g(v)}</span></div>`}).join(""):'<div class="dash-empty">Noch keine Anwendungen erfasst.</div>')};t.state.subscribe(s=>{s?.app?.activeSection==="dashboard"&&i()}),i()}function Gi(e){document.querySelectorAll(".content-section").forEach(a=>{a.style.display="none"});const t=document.getElementById(`section-${e}`);t instanceof HTMLElement&&(t.style.display="block")}function Ui(){Fo(),Qi();const e={state:{getState:K,updateSlice:Ke,subscribe:nn},events:{emit:(v,$)=>{mt(async()=>{const{emit:A}=await import("./index.Jw5NaxwS.js").then(R=>R.aS);return{emit:A}},[]).then(({emit:A})=>{A(v,$)})},subscribe:Ve}},t=document.querySelector('[data-region="startup"]'),a=document.querySelector('[data-region="shell"]'),n=document.querySelector('[data-region="main"]'),r=document.querySelector('[data-region="footer"]');ml(t,e);const i=document.querySelector('[data-feature="calculation"]');To(i,e);const s=document.querySelector('[data-feature="documentation"]');cc(s,e);const l=document.querySelector('[data-feature="settings"]');td(l,e);const c=document.querySelector('[data-feature="lager"]');rd(c,e);const u=document.querySelector('[data-feature="acker"]');sd(u,e);const d=document.querySelector('[data-feature="kultur"]');kd(d,e);const p=document.querySelector('[data-feature="fotos"]');qo(p,e,{archiveMode:!0});const m=document.querySelector('[data-feature="import-page"]');Zd(m,{state:{getState:K,updateSlice:Ke},events:e.events});const y=document.querySelector('[data-feature="dashboard"]');Yd(y,e);const f=v=>{const $=document.body;$&&($.classList.toggle("bg-app",v),$.classList.toggle("bg-startup",!v))},x=v=>{const $=!!v.app?.hasDatabase;if(f($),t instanceof HTMLElement&&t.classList.toggle("d-none",$),a instanceof HTMLElement&&a.classList.toggle("d-none",!$),n instanceof HTMLElement&&n.classList.toggle("d-none",!$),r instanceof HTMLElement&&r.classList.toggle("d-none",!$),$){const A=v.app?.activeSection??"dashboard";Gi(A)}};x(e.state.getState()),nn((v,$)=>{v.app?.hasDatabase!==$.app?.hasDatabase&&x(v),v.app?.activeSection!==$.app?.activeSection&&v.app?.hasDatabase&&Gi(v.app.activeSection)}),Ve("app:sectionChanged",()=>{})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ui,{once:!0}):Ui();
