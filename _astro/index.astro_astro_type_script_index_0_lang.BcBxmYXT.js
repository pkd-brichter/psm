const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/index.D8tPKnpZ.js","_astro/index.C9pRG6w5.js","_astro/leaflet.C03ySvDx.css","_astro/leaflet-src.BcflbDBd.js","_astro/_commonjsHelpers.Cpj98o6Y.js","_astro/index.CPadEFgJ.js"])))=>i.map(i=>d[i]);
import{M as le,N as Vi,J as je,O as js,P as Gs,Q as Zi,h as ft,l as Us,a as Qi,s as Xe,n as Vs,q as Ji,p as Wr,e as R,r as sn,C as on,u as Ge,_ as vt,R as Zs,S as Qs,w as g,t as q,m as jr,T as Js,j as Ha,k as Gr,U as Ys,V as Xs,W as Te,X as eo,Y as Yi,Z as Xi,H as es,G as ln,$ as to,a0 as ao,a1 as no,a2 as ro,a3 as io,a4 as Pa,z as ka,a5 as so,x as oo,a6 as Ke,a7 as Re,a8 as lo,a9 as za,aa as co,ab as uo,D as po,ac as ts,ad as as,ae as Sa,af as mo,ag as fo,ah as go,ai as Ur,aj as Fn,ak as qn,al as bo,am as ho,an as vo,ao as yo,ap as wo,aq as xo,ar as ko,as as ns,at as So,au as rs,av as Eo,aw as yr,ax as wr,ay as Lo,az as Do,aA as cn,aB as Vr,aC as Zr,aD as Tn,aE as Qr,aF as ra,aG as Jr,aH as $o,aI as Yr,aJ as Ao,aK as Po,aL as zo,aM as Mo,aN as Io,aO as Jn,v as is,i as Co,b as Bo,c as No}from"./index.C9pRG6w5.js";const Yn="__psl_history_seeded",Xn=200,Xr=["Salat","Apfel","Wein","Tomate","Kartoffel","Hopfen","Raps","Birne"],ei=["Spritzung","Düngung","Pflege","Behandlung"],ti=["LACES","MALDO","VITVI","SOLTU","PRNUS","CUPAR","CYNCR","ALLCE"],ai=["BBCH 10","BBCH 31","BBCH 41","BBCH 55","BBCH 65","BBCH 71","BBCH 81"],Fo=[{mediumId:"seed-water",name:"Wasser",unit:"L",methodId:"perKiste",methodLabel:"pro Kiste",value:.02,zulassungsnummer:"N/A"},{mediumId:"seed-tonikum",name:"Tonikum X",unit:"ml",methodId:"perKiste",methodLabel:"pro Kiste",value:.85,zulassungsnummer:"Z-123456"},{mediumId:"seed-oel",name:"Pflegeöl Y",unit:"ml",methodId:"percentWater",methodLabel:"% vom Wasser",value:.12,zulassungsnummer:"Z-654321"}];function qo(e){if(typeof window>"u")return;const a=new URLSearchParams(window.location.search).has("seedHistory");if(!a)return;const n=window;n.__PSL||(n.__PSL={});const r=n.__PSL;r.seedHistoryEntries=(o=Xn)=>ni(e,{count:o}),r.resetHistorySeedFlag=()=>localStorage.removeItem(Yn),!a&&!localStorage.getItem(Yn)&&le()==="sqlite"&&ni(e,{count:Xn,setFlag:!0}).catch(o=>{console.error("History seeding failed",o)})}async function To(e){if(!e.state.getState().app?.hasDatabase){if(typeof e.state.subscribe!="function")throw new Error("SQLite-Datenbank ist noch nicht initialisiert.");await new Promise((t,a)=>{const n=window.setTimeout(()=>{i(),a(new Error("SQLite-Datenbank wurde nicht rechtzeitig initialisiert."))},1e4),r=e.state.subscribe?.(o=>{o.app?.hasDatabase&&(i(),t())}),i=()=>{window.clearTimeout(n),typeof r=="function"&&r()}})}}async function ni(e,t={}){const a=t.count??Xn;if(le()!=="sqlite")throw new Error("SQLite-Treiber muss aktiv sein, bevor Daten befüllt werden können.");await To(e);const n=performance.now();let r=0;for(let i=0;i<a;i+=1){const o=Ho(i);await Vi(o),r+=1}try{await je()}catch(i){console.warn("Seed-Daten konnten nicht persistent gespeichert werden",i)}return e.events.emit("history:data-changed",{source:"dev-history-seed"}),t.setFlag&&localStorage.setItem(Yn,"1"),{inserted:r,durationMs:performance.now()-n}}function Ho(e){const t=new Date;t.setDate(t.getDate()-e);const a=t.toLocaleDateString("de-DE"),n=t.toISOString(),r=20+e%30,i=Number((r*.5).toFixed(2));return{datum:a,dateIso:n,ersteller:`Seeder ${1+e%5}`,standort:`Test-Ort ${String.fromCharCode(65+e%6)}`,kultur:Xr[e%Xr.length],usageType:ei[e%ei.length],kisten:r,eppoCode:ti[e%ti.length],bbch:ai[e%ai.length],gps:`GPS-Notiz ${e}`,gpsCoordinates:{latitude:48+e%10*.01,longitude:11+e%10*.01},gpsPointId:`seed-gps-${e}`,invekos:`INV-${String(1e3+e).padStart(4,"0")}`,uhrzeit:`${String(6+e%12).padStart(2,"0")}:${String(e*7%60).padStart(2,"0")}`,savedAt:n,items:_o(e,r,i)}}function _o(e,t,a){return Fo.map((n,r)=>{const i=1+(e+r)%4*.05,o=Number((n.value*i).toFixed(4)),l=Number((o*t).toFixed(2));return{id:`seed-item-${e}-${r}`,name:n.name,unit:n.unit,methodLabel:n.methodLabel,methodId:n.methodId,value:o,total:l,inputs:{kisten:t,waterVolume:a},zulassungsnummer:n.zulassungsnummer,mediumId:n.mediumId}})}let It=null,ia=null,ri=!1,ii=!1;async function Oo(){if(!("serviceWorker"in navigator))return console.warn("[PWA] Service Workers nicht unterstützt"),null;try{return ia=await navigator.serviceWorker.register("/psm/sw.js",{scope:"/psm/",updateViaCache:"none"}),console.log("[PWA] Service Worker registriert:",ia.scope),ia.addEventListener("updatefound",()=>{const e=ia?.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&(console.log("[PWA] Neues Update verfügbar"),Ut("pwa:update-available"))})}),navigator.serviceWorker.addEventListener("message",Ko),ri||(ri=!0,navigator.serviceWorker.addEventListener("controllerchange",()=>{ii||(ii=!0,window.location.reload())})),ia}catch(e){return console.error("[PWA] Service Worker Registrierung fehlgeschlagen:",e),null}}function Ko(e){const{type:t,payload:a}=e.data||{};switch(t){case"DB_STATE":Ut("pwa:db-state",a);break;case"CACHES_CLEARED":Ut("pwa:caches-cleared");break}}async function xn(e){if(!navigator.serviceWorker.controller){localStorage.setItem("psm-db-state",JSON.stringify({...e,updatedAt:new Date().toISOString()}));return}navigator.serviceWorker.controller.postMessage({type:"SET_DB_STATE",payload:e})}async function ss(){const e=localStorage.getItem("psm-db-state");if(e)try{return JSON.parse(e)}catch{}return navigator.serviceWorker?.controller?new Promise(t=>{const a=n=>{n.data?.type==="DB_STATE"&&(navigator.serviceWorker.removeEventListener("message",a),t(n.data.payload))};navigator.serviceWorker.addEventListener("message",a),navigator.serviceWorker.controller.postMessage({type:"GET_DB_STATE"}),setTimeout(()=>{navigator.serviceWorker.removeEventListener("message",a),t(null)},1e3)}):null}async function Ro(){const e=await ss();return!!(e?.hasDatabase&&e?.autoStartEnabled)}function Wo(){window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),It=e,console.log("[PWA] Install Prompt verfügbar"),localStorage.getItem("psm-app-installed")==="true"&&(console.log("[PWA] Widerspruch erkannt: Flag sagt installiert, aber Prompt verfügbar"),localStorage.removeItem("psm-app-installed"),console.log("[PWA] Veraltetes Installations-Flag entfernt")),Ut("pwa:install-available")}),window.addEventListener("appinstalled",()=>{It=null,Sn(),console.log("[PWA] App installiert - Flag gesetzt"),Ut("pwa:installed")})}function kn(){return It!==null}function Nt(){return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0}function xr(){const e=navigator.userAgent.toLowerCase();return e.includes("edg/")?"edge":e.includes("chrome")&&!e.includes("edg")?"chrome":e.includes("firefox")?"firefox":e.includes("safari")&&!e.includes("chrome")?"safari":"other"}function kr(){return!!(Nt()||localStorage.getItem("psm-app-installed")==="true"||window.matchMedia("(display-mode: fullscreen)").matches||window.matchMedia("(display-mode: minimal-ui)").matches||window.matchMedia("(display-mode: window-controls-overlay)").matches)}async function os(){if(kr())return!0;try{if("getInstalledRelatedApps"in navigator){const e=await navigator.getInstalledRelatedApps();if(console.log("[PWA] getInstalledRelatedApps result:",e),e&&e.length>0)return Sn(),!0}}catch(e){console.warn("[PWA] getInstalledRelatedApps API Fehler:",e)}return!1}function Sn(){localStorage.setItem("psm-app-installed","true"),console.log("[PWA] App als installiert markiert")}function jo(){localStorage.removeItem("psm-app-installed"),console.log("[PWA] Installations-Flag entfernt")}function ls(){const e=xr(),t=Nt(),a=kr();return{canInstall:kn(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function cs(){const e=xr(),t=Nt(),a=await os();return{canInstall:kn(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function Go(){if(!It)return console.warn("[PWA] Kein Install Prompt verfügbar"),!1;try{await It.prompt();const{outcome:e}=await It.userChoice;return console.log("[PWA] Install Prompt Ergebnis:",e),e==="accepted"&&Sn(),It=null,e==="accepted"}catch(e){return console.error("[PWA] Install Prompt fehlgeschlagen:",e),!1}}function Uo(e){if(!("launchQueue"in window)){console.log("[PWA] Launch Queue API nicht verfügbar");return}window.launchQueue?.setConsumer(async t=>{if(!t.files?.length){console.log("[PWA] Launch ohne Dateien");return}console.log("[PWA] Datei via Launch Queue empfangen:",t.files.length);for(const a of t.files)try{await e(a),await xn({hasDatabase:!0,fileHandleName:a.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0});break}catch(n){console.error("[PWA] Fehler beim Öffnen der Datei:",n)}}),console.log("[PWA] File Handling initialisiert")}const kt="psm-file-handles",Sr="last-database";async function er(e){try{const t=await Er(),n=t.transaction(kt,"readwrite").objectStore(kt);await new Promise((r,i)=>{const o=n.put({key:Sr,handle:e,savedAt:new Date().toISOString()});o.onsuccess=()=>r(),o.onerror=()=>i(o.error)}),t.close(),console.log("[PWA] FileHandle gespeichert"),await xn({hasDatabase:!0,fileHandleName:e.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}catch(t){console.error("[PWA] FileHandle speichern fehlgeschlagen:",t)}}async function tr(){try{const e=await Er(),a=e.transaction(kt,"readonly").objectStore(kt),n=await new Promise((i,o)=>{const l=a.get(Sr);l.onsuccess=()=>i(l.result),l.onerror=()=>o(l.error)});if(e.close(),!n?.handle)return null;const r=n.handle;return typeof r.queryPermission=="function"&&await r.queryPermission({mode:"readwrite"})==="granted"?(console.log("[PWA] FileHandle mit Berechtigung geladen"),n.handle):(console.log("[PWA] FileHandle gefunden, aber Berechtigung erforderlich"),n.handle)}catch(e){return console.error("[PWA] FileHandle laden fehlgeschlagen:",e),null}}async function Vo(e){try{const t=e;return typeof t.requestPermission!="function"?(await e.getFile(),!0):await t.requestPermission({mode:"readwrite"})==="granted"}catch{return!1}}async function Zo(){try{const e=await Er(),a=e.transaction(kt,"readwrite").objectStore(kt);await new Promise((n,r)=>{const i=a.delete(Sr);i.onsuccess=()=>n(),i.onerror=()=>r(i.error)}),e.close(),await xn({hasDatabase:!1,autoStartEnabled:!1}),console.log("[PWA] FileHandle gelöscht")}catch(e){console.error("[PWA] FileHandle löschen fehlgeschlagen:",e)}}async function Er(){return new Promise((e,t)=>{const a=indexedDB.open("psm-file-handles",1);a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result),a.onupgradeneeded=n=>{const r=n.target.result;r.objectStoreNames.contains(kt)||r.createObjectStore(kt,{keyPath:"key"})}})}function Ut(e,t){window.dispatchEvent(new CustomEvent(e,{detail:t}))}function ds(){return{serviceWorker:"serviceWorker"in navigator,fileSystemAccess:typeof window.showOpenFilePicker=="function",launchQueue:"launchQueue"in window,indexedDB:"indexedDB"in window,standalone:Nt(),installAvailable:kn()}}async function Qo(e){if(console.log("[PWA] Initialisierung..."),await Oo(),Wo(),e?.onFileOpened&&Uo(e.onFileOpened),e?.onAutoStart&&await Ro()){const t=await tr();if(t){const a=t;let n=!1;if(typeof a.queryPermission=="function"&&(n=await a.queryPermission({mode:"readwrite"})==="granted"),n){console.log("[PWA] Auto-Start mit gespeicherter Datei"),e.onFileOpened&&await e.onFileOpened(t);return}console.log("[PWA] Auto-Start: Berechtigung für Datei erforderlich"),Ut("pwa:permission-required",{handle:t})}}console.log("[PWA] Capabilities:",ds())}async function Jo(){if(console.group("🔧 PWA Debug Status"),console.log("📱 Standalone Mode:",Nt()),console.log("💾 localStorage Flag:",localStorage.getItem("psm-app-installed")),console.log("🔔 Install Prompt verfügbar:",kn()),console.log("🌐 Browser:",xr()),console.group("📺 Display Mode Checks"),console.log("standalone:",window.matchMedia("(display-mode: standalone)").matches),console.log("fullscreen:",window.matchMedia("(display-mode: fullscreen)").matches),console.log("minimal-ui:",window.matchMedia("(display-mode: minimal-ui)").matches),console.log("window-controls-overlay:",window.matchMedia("(display-mode: window-controls-overlay)").matches),console.log("browser:",window.matchMedia("(display-mode: browser)").matches),console.groupEnd(),console.group("🔍 getInstalledRelatedApps API"),"getInstalledRelatedApps"in navigator)try{const e=await navigator.getInstalledRelatedApps();console.log("Installierte Apps:",e)}catch(e){console.log("API Fehler:",e)}else console.log("API nicht verfügbar");console.groupEnd(),console.group("📊 Status Vergleich"),console.log("Sync (isProbablyInstalled):",kr()),console.log("Async (checkIfInstalled):",await os()),console.log("getInstallStatus():",ls()),console.log("getInstallStatusAsync():",await cs()),console.groupEnd(),console.log("💡 Tipp: clearInstalledFlag() zum Zurücksetzen des Flags"),console.groupEnd()}typeof window<"u"&&(window.pwaDebug=Jo,window.pwaClearFlag=jo);let _a=!1;function Yo(e){const t=r=>{if(_a){_a=!1;return}return r.preventDefault(),r.returnValue="",""};let a=!1;const n=r=>{const i=!!r.app?.hasDatabase;i&&!a?(window.addEventListener("beforeunload",t),a=!0):!i&&a&&(window.removeEventListener("beforeunload",t),a=!1)};n(e.getState()),e.subscribe(n),document.addEventListener("click",r=>{const i=r.target.closest("a");i&&i.target==="_blank"&&(_a=!0,setTimeout(()=>{_a=!1},100))})}function Xo(){const e=document.getElementById("app-root");if(!e)throw new Error("app-root Container fehlt");return{startup:e.querySelector('[data-region="startup"]'),shell:e.querySelector('[data-region="shell"]'),main:e.querySelector('[data-region="main"]'),footer:e.querySelector('[data-region="footer"]')}}async function el(){if(js()){window.location.replace("/psm/m/");return}Xo(),Gs();const e=Zi();e!=="memory"&&ft(e),await Us();const t={state:{getState:R,patchState:Wr,updateSlice:Ge,subscribe:on},events:{emit:sn,subscribe:Xe}};qo(t),Qi(),Yo(t.state),Qo({onFileOpened:async a=>{const n=await vt(()=>import("./index.C9pRG6w5.js").then(i=>i.aQ),[]),r=await vt(()=>import("./index.C9pRG6w5.js").then(i=>i.aP),[]);if(r.isSupported()){n.setActiveDriver("sqlite");const i=await a.getFile(),o=await i.arrayBuffer(),l=await r.importFromArrayBuffer(o,i.name);await er(a);const{applyDatabase:c}=await vt(async()=>{const{applyDatabase:u}=await import("./index.C9pRG6w5.js").then(d=>d.aS);return{applyDatabase:u}},[]);c(l.data),sn("database:connected",{driver:"sqlite",autoStarted:!0})}}}),Xe("database:connected",async a=>{await xn({hasDatabase:!0,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}),Xe("database:connected",async a=>{if(le()==="sqlite")try{await Vs(),await Ji()}catch(n){console.warn("GPS-Punkte konnten beim Start nicht geladen werden",n)}}),Wr({app:{...R().app,ready:!0}})}const si="__pflanzenschutz_bootstrapped__",oi=window;function li(){el().catch(e=>{console.error("bootstrap failed",e)})}oi[si]||(oi[si]=!0,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",li,{once:!0}):li());const us=[{id:"start",label:"Start",icon:"bi-grid-1x2",sections:[{section:"dashboard",label:"Übersicht",icon:"bi-grid-1x2"}]},{id:"psm",label:"PSM",icon:"bi-flower1",sections:[{section:"calc",label:"Neu erfassen",icon:"bi-pencil-square"},{section:"documentation",label:"Übersicht",icon:"bi-list-ul"},{section:"lager",label:"Lager",icon:"bi-box-seam"},{section:"settings",label:"Einstellungen",icon:"bi-gear"}]},{id:"acker",label:"Acker-Planer",icon:"bi-map",sections:[{section:"acker",label:"Karte",icon:"bi-map"},{section:"kultur",label:"Kulturführung",icon:"bi-clipboard2-pulse"}]},{id:"fotos",label:"Fotos",icon:"bi-camera",sections:[{section:"fotos",label:"Fotos",icon:"bi-camera"}]},{id:"daten",label:"Daten",icon:"bi-database",sections:[{section:"daten",label:"Import",icon:"bi-cloud-upload"}]}],ps={dashboard:"start",calc:"psm",documentation:"psm",lager:"psm",history:"psm",report:"psm",acker:"acker",kultur:"acker",fotos:"fotos",settings:"psm",gps:"psm",lookup:"psm",import:"daten",daten:"daten"};function ms(e){return us.find(t=>t.id===e)}function tl(e){const t=ps[e];return t?ms(t):void 0}function al(){const e=document.getElementById("offline-indicator");if(!e)return;const t=()=>{const a=!navigator.onLine;e.classList.toggle("d-none",!a)};t(),window.addEventListener("online",t),window.addEventListener("offline",t)}function ci(e){R().app.activeSection!==e&&(Ge("app",t=>({...t,activeSection:e})),sn("app:sectionChanged",e))}function di(){al();const e=document.querySelectorAll(".nav-btn[data-area]"),t=document.getElementById("brand-link"),a=document.getElementById("topnav-tabs"),n=document.getElementById("topnav-area-icon"),r=document.getElementById("topnav-area-label"),i={};for(const f of us)i[f.id]=f.sections[0].section;let o=null;function l(f,x){if(a){if(f.sections.length<=1){a.innerHTML="";return}a.innerHTML=f.sections.map(S=>`
        <button type="button" class="topnav-tab${S.section===x?" active":""}" data-section="${S.section}">
          <i class="bi ${S.icon}"></i><span>${S.label}</span>
        </button>`).join("")}}function c(f){a&&a.querySelectorAll(".topnav-tab").forEach(x=>{x.classList.toggle("active",x.dataset.section===f)})}const u=f=>{const x=ms(f);!x||!R().app.hasDatabase||ci(i[f]??x.sections[0].section)};e.forEach(f=>{f.addEventListener("click",()=>{const x=f.dataset.area;x&&u(x)})}),t?.addEventListener("click",f=>{f.preventDefault(),u("start")}),a?.addEventListener("click",f=>{const S=f.target?.closest(".topnav-tab")?.dataset.section;S&&ci(S)});const d=document.querySelector('.nav-btn[data-action="share-data"]');d?.addEventListener("click",()=>{d.disabled=!0,vt(async()=>{const{shareMobileData:f}=await import("./index.D8tPKnpZ.js");return{shareMobileData:f}},__vite__mapDeps([0,1])).then(({shareMobileData:f})=>f()).catch(f=>console.error("Teilen fehlgeschlagen",f)).finally(()=>{d.disabled=!1})}),Zs(),Xe("history:data-changed",f=>{if(!document.body.classList.contains("mobile-mode"))return;const x=f?.type;(x==="created"||x==="created-bulk")&&Qs()});const p=f=>{const x=document.getElementById("brand-title"),S=document.getElementById("brand-tagline"),A=document.getElementById("app-version");x&&f.company.name&&(x.textContent=f.company.name),S&&f.company.headline&&(S.textContent=f.company.headline),A&&f.app.version&&(A.textContent=`v${f.app.version}`);const z=f.app.hasDatabase,j=f.app.activeSection,U=tl(j);U&&ps[j]===U.id&&(i[U.id]=j),e.forEach(pe=>{pe.disabled=!z;const B=z&&U?.id===pe.dataset.area;pe.classList.toggle("active",!!B)}),U&&(n&&(n.className=`bi ${U.icon} topnav-area-icon`),r&&(r.textContent=U.label),o!==U.id?(l(U,j),o=U.id):c(j))};on(p),p(R());let m=!1;const y=document.title||"Pflanzenschutz";window.addEventListener("beforeprint",()=>{m||(m=!0,document.title=" ")}),window.addEventListener("afterprint",()=>{m&&(m=!1,document.title=y)})}function nl(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",di,{once:!0}):di()}nl();const rl="https://api.digitale-psm.de",il="digitale-psm.de";async function sl(e){try{const t=await fetch(`${rl}/api/v1/${il}/views/${e}`,{method:"POST",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`API error: ${t.status}`);return(await t.json()).views}catch(t){return console.warn("[ViewCounter] Fehler beim Zählen:",t),null}}function ol(e){return e>=1e6?(e/1e6).toFixed(1).replace(".",",")+"M":e>=1e3?(e/1e3).toFixed(1).replace(".",",")+"K":e.toString()}const ar="pflanzenschutz-datenbank.json";let ui=!1;function ll(e){return e?`${e.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"pflanzenschutz-datenbank"}.json`:ar}async function sa(e,t){if(!e){await t();return}const a=e.textContent??"";e.disabled=!0,e.dataset.busy="true",e.textContent="Bitte warten...";try{await t()}finally{e.disabled=!1,e.dataset.busy="false",e.textContent=a}}function pi(e){return g(e)}function cl(e){const t=document.createElement("section");t.className="section-container d-none",t.innerHTML=`
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
                <input class="form-control" id="wizard-company-name" name="wizard-company-name" required value="${pi(e.name)}" placeholder="z.B. Gärtnerei Müller" />
              </div>
              <div class="col-md-6">
                <label class="form-label d-block mb-2" for="wizard-company-headline">
                  Überschrift <span class="text-muted small">(optional)</span>
                </label>
                <input class="form-control" id="wizard-company-headline" name="wizard-company-headline" value="${pi(e.headline)}" placeholder="z.B. Pflanzenschutz-Dokumentation 2025" />
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
  `;const a=t.querySelector("#database-wizard-form");if(!a)throw new Error("Wizard-Formular konnte nicht erzeugt werden");const n=t.querySelector('[data-role="wizard-result"]');if(!n)throw new Error("Wizard-Resultat-Container fehlt");return{section:t,form:a,resultCard:n,preview:t.querySelector('[data-role="wizard-preview"]'),filenameLabel:t.querySelector('[data-role="wizard-filename"]'),saveHint:t.querySelector('[data-role="wizard-save-hint"]'),saveButton:t.querySelector('[data-action="wizard-save"]'),reset(){a.reset(),n.classList.add("d-none");const r=t.querySelector('[data-role="wizard-preview"]');r&&(r.textContent="");const i=t.querySelector('[data-role="wizard-filename"]');i&&(i.textContent="")}}}function dl(e,t){if(!e||ui)return;const a=e;let n=null,r=ar,i="landing";const l=t.state.getState().company,c=document.createElement("section");c.className="section-container";function u(M,L){const $=M;c.innerHTML=`
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
            ${$?`<button class="btn btn-link p-0" style="color: var(--text-muted); text-decoration: none; font-size: 0.85rem;" data-action="start-wizard">
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
            ${$?`<!-- Szenario 2: Hat Datei → Fortsetzen im Fokus -->
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
  `}u(!1,Nt());const d=cl(l);a.innerHTML="",a.appendChild(c),a.appendChild(d.section);const p=typeof window<"u"&&typeof window.showSaveFilePicker=="function";d.saveButton&&(p?d.saveHint&&(d.saveHint.textContent='Der Browser fragt nach einem Speicherort. Die erzeugte Datei kannst du später über "Bestehende Datei verbinden" erneut laden.'):(d.saveButton.disabled=!0,d.saveButton.textContent="Datei speichern (nicht verfügbar)",d.saveHint&&(d.saveHint.textContent="Dieser Browser unterstützt keinen direkten Dateidialog. Bitte nutze einen Chromium-basierten Browser (z. B. Chrome, Edge) über HTTPS oder http://localhost.")));function m(M=t.state.getState()){const L=!!M.app?.hasDatabase;if(a.classList.toggle("d-none",L),L){c.classList.add("d-none"),d.section.classList.add("d-none");return}i==="wizard"?(c.classList.add("d-none"),d.section.classList.remove("d-none")):(c.classList.remove("d-none"),d.section.classList.add("d-none"))}async function y(M){await sa(M,async()=>{try{const L=le();L==="sqlite"||L==="filesystem"?ft(L):ft("filesystem")}catch(L){throw q.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),L instanceof Error?L:new Error("Dateisystem nicht verfügbar")}try{const L=await Js();Ha(L.data);const $=L.context;$?.fileHandle&&await er($.fileHandle),t.events.emit("database:connected",{driver:le()})}catch(L){console.error("Fehler beim Öffnen der Datenbank",L),q.error(L instanceof Error?L.message:"Öffnen der Datenbank fehlgeschlagen")}})}function f(M){sa(M,async()=>{const L=jr(),$=["localstorage","sqlite","memory"];for(const ae of $)try{ft(ae);const ie=await Gr(L);Ha(ie.data),t.events.emit("database:connected",{driver:le()||ae});return}catch(ie){console.warn(`Treiber ${ae} konnte nicht initialisiert werden`,ie)}const Z="Keine geeignete Speicheroption verfügbar. Bitte Browserberechtigungen prüfen.";console.error(Z),q.error(Z)})}async function x(M){if(!n){q.warning("Bitte erst die Datenbank erzeugen.");return}await sa(M,async()=>{try{const L=le();L==="sqlite"||L==="filesystem"?ft(L):ft("filesystem")}catch(L){throw q.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),L instanceof Error?L:new Error("Dateisystem nicht verfügbar")}try{const L=await Gr(n);Ha(L.data),t.events.emit("database:connected",{driver:le()})}catch(L){console.error("Fehler beim Speichern der Datenbank",L),q.error(L instanceof Error?L.message:"Die Datei konnte nicht gespeichert werden")}})}function S(M){M.preventDefault();const L=new FormData(d.form),$=(L.get("wizard-company-name")||"").toString().trim();if(!$){q.warning("Bitte einen Firmennamen angeben.");return}const Z=(L.get("wizard-company-headline")||"").toString().trim(),ae=(L.get("wizard-company-address")||"").toString().trim();n=jr({meta:{company:{name:$,headline:Z,logoUrl:"",contactEmail:"",address:ae}}}),r=ll($),d.preview.textContent=JSON.stringify(n,null,2),d.filenameLabel.textContent=r,d.resultCard.classList.remove("d-none"),d.resultCard.scrollIntoView({behavior:"smooth",block:"start"})}function A(){i="landing",n=null,r=ar,d.reset(),m()}function z(){i="wizard",m()}async function j(M){await sa(M,async()=>{try{const L=await tr();if(!L){q.warning("Keine gespeicherte Datei gefunden.");return}if(!await Vo(L)){q.warning("Berechtigung zum Zugriff auf die Datei wurde verweigert.");return}ft("sqlite");const Z=await L.getFile(),ae=await Z.arrayBuffer(),ie=await Ys(ae,Z.name);Xs(L),Ha(ie.data),await er(L),t.events.emit("database:connected",{driver:"sqlite",autoStarted:!0}),q.success("Datenbank erfolgreich geladen!")}catch(L){console.error("Auto-Start fehlgeschlagen:",L),q.error(L instanceof Error?L.message:"Fehler beim Laden der gespeicherten Datei")}})}async function U(){await Zo();const M=c.querySelector("#auto-start-banner");M&&M.classList.add("d-none"),q.info("Gespeicherte Datei wurde vergessen.")}async function pe(M){await sa(M,async()=>{if(await Go()){q.success("App wird installiert!");const $=c.querySelector("#pwa-install-banner");$&&$.classList.add("d-none")}})}if(c.addEventListener("click",M=>{const L=M.target?.closest("button[data-action]");if(!L)return;const $=L.dataset.action;if($==="start-wizard"){z();return}$==="open"?y(L):$==="useDefaults"?f(L):$==="auto-start"?j(L):$==="auto-start-forget"?U():$==="install-pwa"&&pe(L)}),d.form.addEventListener("submit",S),d.section.addEventListener("click",M=>{const L=M.target?.closest("[data-action]");if(!L)return;const $=L.dataset.action;if($==="wizard-back"){A();return}$==="wizard-save"&&x(L)}),t.state.subscribe(M=>m(M)),m(t.state.getState()),!t.state.getState().app.hasDatabase){const M=Zi();if(M&&M!==le())try{ft(M)}catch(L){console.warn("Bevorzugter Speicher konnte nicht gesetzt werden",L)}}(async()=>{const M=await tr(),L=await ss(),$=!!(M&&L?.hasDatabase),Z=Nt();u($,Z);const ae=c.querySelector('[data-role="view-count"]');if(ae&&sl("app").then(me=>{me!==null&&(ae.textContent=ol(me))}),$&&M){const me=c.querySelector('[data-role="auto-start-filename"]');me&&(me.textContent=`Datei: ${M.name}`)}B(),window.addEventListener("pwa:install-available",()=>{B()}),window.addEventListener("pwa:installed",()=>{Sn(),B()}),window.addEventListener("pwa:permission-required",async me=>{const Le=me.detail?.handle;if(Le){const De=c.querySelector("#auto-start-banner"),Ve=c.querySelector('[data-role="auto-start-filename"]');De&&Ve&&(Ve.textContent=`Datei: ${Le.name} (Berechtigung erforderlich)`,De.classList.remove("d-none"))}}),console.log("[Startup] PWA Capabilities:",ds());const ie=await cs();console.log("[Startup] PWA Install Status (async):",ie),X(ie)})();function B(){const M=ls();X(M)}function X(M){const L=c.querySelector("#pwa-install-banner"),$=c.querySelector('[data-role="pwa-content"]');if(!(!L||!$)){if(!M.showBanner){L.classList.add("d-none");return}L.classList.remove("d-none"),M.isInstalled?$.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-check-circle text-success me-1"></i>App ist bereits installiert
        </p>
        <p class="small mb-0" style="color: var(--text-muted);">
          Öffne die App über dein Desktop- oder Startmenü-Symbol für die beste Erfahrung.
        </p>
      `:M.canInstall?$.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-download me-1"></i>Für schnelleren Zugriff als App installieren
        </p>
        <button class="btn btn-sm btn-outline-light" data-action="install-pwa">
          <i class="bi bi-download me-1"></i>App installieren
        </button>
      `:L.classList.add("d-none")}}ui=!0}function fs(e){let t=!1,a=!1;const n=l=>{e.onStatusChange&&e.onStatusChange(l)},r=()=>{t||!a||R().app.activeSection!==e.section||e.shouldRefresh&&!e.shouldRefresh()||(a=!1,n("refreshing"),Promise.resolve(e.onRefresh()).catch(c=>{console.error("Auto-Refresh konnte nicht ausgeführt werden",c),a=!0,n("stale")}).finally(()=>{!t&&!a&&n("idle")}))},i=Xe(e.event,()=>{e.shouldHandleEvent&&!e.shouldHandleEvent()||(a=!0,n("stale"),r())}),o=Xe("app:sectionChanged",l=>{l===e.section&&(a?r():n("idle"))});return R().app.activeSection===e.section&&n("idle"),()=>{t=!0,i(),o()}}const ul={prev:"Zurück",next:"Weiter",loading:"Lädt …",empty:"Keine Einträge verfügbar"};function mi(){const e=document.createElement("span");return e.className="spinner-border spinner-border-sm",e.setAttribute("role","status"),e.setAttribute("aria-hidden","true"),e}function fi(e){const t=document.createElement("div");return t.className="pager-widget__info text-muted small text-center flex-grow-1",t.textContent=e?.trim()||"",t}function Ma(e,t){if(!e)return null;const a=document.createElement("div");a.className="pager-widget d-flex flex-column gap-2",e.innerHTML="",e.appendChild(a);let n={status:"hidden"},r=!1;const i={...ul,...t.labels||{}};function o(){a.replaceChildren()}function l(p){const m=fi(p.info||i.empty);a.replaceChildren(m)}function c(p){const m=document.createElement("div");m.className="alert alert-danger mb-0",m.textContent=p.message||"Unbekannter Fehler",a.replaceChildren(m)}function u(p){const m=document.createElement("div");m.className="pager-widget__controls d-flex flex-column flex-md-row gap-2 align-items-stretch";const y=document.createElement("button");y.type="button",y.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",y.disabled=!p.canPrev||p.loadingDirection==="prev",y.textContent=i.prev,p.loadingDirection==="prev"&&y.prepend(mi()),y.addEventListener("click",()=>{y.disabled||t.onPrev()});const f=document.createElement("button");f.type="button",f.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",f.disabled=!p.canNext||p.loadingDirection==="next",f.textContent=i.next,p.loadingDirection==="next"&&f.append(mi()),f.addEventListener("click",()=>{f.disabled||t.onNext()});const x=fi(p.info||(p.canPrev||p.canNext?i.loading:i.empty));m.append(y,x,f),a.replaceChildren(m)}function d(p){switch(p.status){case"hidden":o();break;case"disabled":l(p);break;case"error":c(p);break;case"ready":u(p);break;default:o();break}}return{update(p){r||(n=p,d(p))},destroy(){r||(r=!0,a.replaceChildren(),e.innerHTML="")},getState(){return n}}}const Lr=new Set;let gi=!1;function pl(){return typeof window>"u"?null:window.__PSL?.debugOverlayApi??null}function gs(){gi||typeof window>"u"||(gi=!0,window.addEventListener("psl:debug-overlay-ready",()=>{Lr.forEach(e=>{Dr(e)})}))}function Dr(e){const t=pl();t?.registerProvider&&(e.handle||(e.handle=t.registerProvider(e.config)),e.handle.update(e.lastMetrics??null))}function bs(e){const t={config:e,handle:null,lastMetrics:null};return Lr.add(t),gs(),Dr(t),t}function hs(e,t){e.lastMetrics=t,Lr.add(e),gs(),Dr(e)}function vs(e){if(e==null)return 0;try{const t=JSON.stringify(e);return t?Number((t.length/1024).toFixed(1)):0}catch{return null}}const bi=5e3,hi=50,$r=50,Za=3;function Hn(e){if(e==null||e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function ml(e){if(!e)return null;const t=Hn(e.areaHa);if(t!==null)return t;const a=Hn(e.areaAr);if(a!==null)return a/100;const n=Hn(e.areaSqm);return n!==null?n/1e4:null}function fl(e,t="–"){const a=ml(e);return a===null?t:po(a,2,t)}function gl(e){return e.toISOString().slice(0,10)}function dn(e){if(!e)return;if(/^\d{4}-\d{2}-\d{2}$/.test(e))return e;const t=new Date(e);if(!Number.isNaN(t.getTime()))return gl(t)}function vi(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function Ar(){return{startDate:"",endDate:""}}function ys(e,t){if(!e)return;const a=e.querySelector("#doc-start"),n=e.querySelector("#doc-end");a&&t.startDate&&(a.value=t.startDate),n&&t.endDate&&(n.value=t.endDate)}function bl(e,t="sqlite"){if(typeof e=="string")return e.includes(":")?e:/^\d+$/.test(e)?Rt(t,Number(e)):e;if(typeof e=="number")return Rt(t,e);if(e&&typeof e=="object"){const a=e.source||t;if(typeof e.ref=="string"&&e.ref.includes(":"))return e.ref;const n=Number(e.ref);if(!Number.isNaN(n))return Rt(a,n)}return null}function hl(e){const t=new Set;return e?.length&&e.forEach(a=>{const n=bl(a);n&&t.add(n)}),t}function ws(e){const t=e.querySelector('[data-role="doc-focus-banner"]'),a=e.querySelector('[data-role="doc-focus-text"]');if(!t||!a)return;if(!wt){t.classList.add("d-none");return}const n=V.startDate&&V.endDate?`${V.startDate} - ${V.endDate}`:"Aktuelle Filter",r=wt.label||"Importierter Zeitraum",i=wt.highlightEntryIds.size,o=i?` (${i} markiert)`:"";a.textContent=`${r}: ${n}${o}`,t.classList.remove("d-none")}function vl(e,t){const a=e.querySelector('[data-role="doc-refresh-indicator"]');if(a){if(a.classList.remove("alert-info","alert-warning"),t==="idle"){a.classList.add("d-none");return}a.classList.remove("d-none"),t==="stale"?(a.classList.add("alert-warning"),a.textContent="Neue Dokumentationseinträge verfügbar. Ansicht aktualisiert sich beim Öffnen."):(a.classList.add("alert-info"),a.textContent="Aktualisiere Dokumentation...")}}function _n(e,t,a={}){wt&&(wt=null,ha=null,ws(e),a.refreshList&&St(e,t.state.getState().fieldLabels))}function yl(e,t){if(!ha)return;const a=Ct(ha);a&&(ha=null,Ds(e,a,t))}function wl(e,t,a){if(!a)return;const n=dn(a.startDate),r=dn(a.endDate),i=!!a.entryIds?.length;if(!n&&!r&&!i)return;V={...V,...n?{startDate:n}:{},...r?{endDate:r}:{}},a.creator!==void 0&&(V={...V,creator:a.creator||void 0}),a.crop!==void 0&&(V={...V,crop:a.crop||void 0});const o=hl(a.entryIds);wt={label:a.label,reason:a.reason,startDate:V.startDate,endDate:V.endDate,highlightEntryIds:o},ha=a.autoSelectFirst&&o.size?o.values().next().value??null:null;const l=e.querySelector("#doc-filter");ys(l,V),ws(e),nr=!0,gt(e,t.state.getState()).finally(()=>{nr=!1})}function xl(){if(typeof window>"u")return{enabled:!1,count:Oa};try{const e=new URLSearchParams(window.location.search);if(!e.has("seedHistory"))return{enabled:!1,count:Oa};const t=e.get("seedHistory"),a=t?Number(t):Number.NaN;return{enabled:!0,count:Number.isFinite(a)&&a>0?Math.min(Math.round(a),kl):Oa}}catch(e){return console.warn("seedHistory Parameter konnte nicht gelesen werden",e),{enabled:!1,count:Oa}}}const et=25,yi=4,On=new Intl.NumberFormat("de-DE"),Oa=200,kl=2e3,Vt=xl();let wi=!1,xe="memory",V=Ar(),Ie=0,ce=[],lt=[],Y=0;const Ye=new Map,We=new Map([[0,null]]),He=new Set,yt=new Map,Kt=new Map;let qe=!1,oa=null,la=0,wt=null,nr=!1,ha=null,un=!1,Qa="",pn=!1,Ka=null,Ra=null,xi=null,Me=0,Wa=null,ki=null,Je=null,va=!1,Si=null;const Sl=bs({id:"documentation",label:"Documentation",budget:{initialLoad:50,maxItems:150}});let xs=null;function Qt(e){return e.app?.storageDriver||le()}function Rt(e,t){return`${e}:${t}`}function Pr(e){const t={},a=vi(e.startDate,"start"),n=vi(e.endDate,"end");return a&&(t.startDate=a),n&&(t.endDate=n),e.creator&&(t.creator=e.creator),e.crop&&(t.crop=e.crop),t}function El(e,t){return{id:Rt("state",t),entry:e,source:"state",ref:t}}function Ll(e){const t=Number(e?.id??e?.historyId??0),a={...e};return delete a.id,{id:Rt("sqlite",t),entry:a,source:"sqlite",ref:t}}function Dl(){return xe==="memory"?ce.length:Ie>0?Ie:Y*et+ce.length||null}function $l(){const e=[];if(qe&&e.push("Lädt …"),Je&&e.push("Fehler"),wt&&e.push("Fokus aktiv"),xe==="sqlite"&&We.get(Y+1)&&e.push("Weitere Seiten verfügbar"),!!e.length)return e.join(" · ")}function Al(){const e={items:ce.length,totalCount:Dl(),cursor:xe==="sqlite"?`Seite ${Y+1}`:null,payloadKb:vs(lt.map(t=>t.entry)),lastUpdated:xs,note:$l()};hs(Sl,e)}function Ct(e){return ce.find(t=>t.id===e)}function En(e){const t=e.querySelector('[data-role="archive-form"]');if(!t)return;const a=t.querySelector('input[name="archive-start"]'),n=t.querySelector('input[name="archive-end"]');a&&(a.value=V.startDate||""),n&&(n.value=V.endDate||"")}function ke(e,t,a="info"){const n=e.querySelector('[data-role="archive-status"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a}`,n.textContent=t,n.classList.remove("d-none")}}function rr(e,t){const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(!a)return;const r=!a.classList.contains("d-none"),i=typeof t=="boolean"?t:!r;a.classList.toggle("d-none",!i),n&&(n.textContent=i?"Archiv-Eingaben ausblenden":"Archiv erstellen"),i&&En(e)}function Pl(e){const t=e.querySelector('input[name="archive-start"]'),a=e.querySelector('input[name="archive-end"]');if(!t?.value||!a?.value)return null;const n=e.querySelector('input[name="archive-storage"]'),r=e.querySelector('textarea[name="archive-note"]'),i=e.querySelector('input[name="archive-remove"]');return{startDate:t.value,endDate:a.value,storageHint:n?.value.trim()||void 0,note:r?.value.trim()||void 0,removeAfterExport:i?i.checked:!0}}function zr(e,t){const a=e.querySelector('[data-action="archive-toggle"]'),n=e.querySelector('[data-action="archive-submit"]'),r=e.querySelector('[data-role="archive-form"]'),i=e.querySelector('[data-role="archive-driver-hint"]'),o=Qt(t)==="sqlite"&&!!t.app?.hasDatabase;a&&(a.disabled=!o||un),n&&(n.disabled=!o||un),!o&&r&&r.classList.add("d-none"),i&&(i.textContent=o?"Lokale SQLite-Datenbank aktiv":"Nur mit SQLite verfügbar",i.className=`badge ${o?"bg-success":"bg-secondary"}`),o?Mr():pn=!1}function Ei(e,t){un=t;const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(a&&a.querySelectorAll("input, textarea, button").forEach(r=>{if(r.dataset.action==="archive-cancel"&&t){r.setAttribute("disabled","disabled");return}t?r.setAttribute("disabled","disabled"):r.removeAttribute("disabled")}),n&&(n.disabled=t||n.disabled,!t)){const r=R();n.disabled=Qt(r)!=="sqlite"||!r.app?.hasDatabase}}function zl(e,t){const a=n=>n?n.replace(/[^0-9-]/g,""):"unbekannt";return`pflanzenschutz-archiv-${a(e)}_${a(t)}.zip`}function Ml(e){let t=[];return Ge("archives",a=>{const n=Array.isArray(a?.logs)?a.logs:[];return t=[e,...n].slice(0,$r),{...a||{logs:[]},logs:t}}),t}async function Mr({force:e=!1}={}){if(Ka){if(await Ka,!e)return}else if(pn&&!e)return;const t=R();if(Qt(t)!=="sqlite"||!t.app?.hasDatabase)return;const n=(async()=>{try{const r=await eo({limit:$r});Ge("archives",i=>({...i&&typeof i=="object"?i:{logs:[]},logs:r.items})),pn=!0}catch(r){console.warn("Archive logs could not be loaded",r)}})();Ka=n;try{await n}finally{Ka=null}}async function Il(e,t){const a=Qt(R());if(Ml(e),a!=="sqlite"){console.warn("Archive logs require SQLite. Changes stored in memory only.");return}try{const n={...e,metadata:t??void 0};await so(n),await je()}catch(n){console.error("Archive log could not be persisted",n),pn=!1}finally{await Mr({force:!0})}}function ir(e){return!Array.isArray(e)||!e.length?"[]":e.map(t=>`${t.id}:${t.archivedAt}:${t.entryCount}`).join("|")}function Cl(e){return e?ka(e)||e.slice(0,16).replace("T"," "):"-"}function Ea(e,t,a={}){const n=e.querySelector('[data-role="archive-log-list"]');if(!n)return;const r=Array.isArray(t)?t:[];a.resetPage!==!1&&(Me=0);const i=Kl(r);if(!i.total){n.innerHTML='<div class="text-muted small">Noch keine Archive erstellt.</div>',$i(e,i);return}const o=i.items.map(l=>{const c=Cl(l.archivedAt),u=`${l.startDate||"-"} – ${l.endDate||"-"}`,d=l.entryCount===1?"Eintrag":"Einträge";return`
        <div class="list-group-item border rounded mb-2 p-3" data-action="archive-log-focus" data-log-id="${l.id}" style="cursor: pointer;">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="fs-5 fw-bold mb-1">${g(u)}</div>
              <div class="text-muted">${l.entryCount} ${d} · Erstellt ${g(c)}</div>
            </div>
            <i class="bi bi-chevron-right text-muted fs-4"></i>
          </div>
        </div>
      `}).join("");n.innerHTML=`<div class="list-group list-group-flush">${o}</div>`,$i(e,i)}function Li(e,t){const a=e.archives?.logs;if(Array.isArray(a))return a.find(n=>n.id===t)}async function Bl(e){if(e){if(typeof navigator<"u"&&navigator.clipboard&&typeof navigator.clipboard.writeText=="function"){await navigator.clipboard.writeText(e);return}if(typeof document<"u"){const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select(),document.execCommand("copy"),document.body.removeChild(t)}}}async function Ia(e){if(Kt.has(e.id))return Kt.get(e.id);let t=null;if(e.source==="sqlite")try{t=await oo(e.ref)}catch(a){console.error("History entry fetch failed",a)}else{const a=Te(R().history);t=(typeof e.ref=="number"?a[e.ref]:void 0)||e.entry}return t&&Kt.set(e.id,t),t}function ks(e){return e&&(e.datum||ka(e.dateIso)||(typeof e.date=="string"?e.date:""))||""}function Nl(e){if(e?.gpsCoordinates){const t=uo(e.gpsCoordinates);if(t)return t}return""}function Fl(e){return e?.gps||""}function sr(e){if(!e)return null;if(e.dateIso){const n=ts(e.dateIso);if(n)return new Date(n.getFullYear(),n.getMonth(),n.getDate())}const t=typeof e.datum=="string"&&e.datum||typeof e.date=="string"&&e.date||null;if(!t)return null;const a=t.split(".");if(a.length===3){const[n,r,i]=a.map(Number);if(!Number.isNaN(n)&&!Number.isNaN(r)&&!Number.isNaN(i))return new Date(i,r-1,n)}return null}function ql(e,t){const a=sr(e);if(t.startDate){const r=new Date(t.startDate);if(r.setHours(0,0,0,0),!a||a<r)return!1}if(t.endDate){const r=new Date(t.endDate);if(r.setHours(23,59,59,999),!a||a>r)return!1}const n=[["creator",e.ersteller],["crop",e.kultur]];for(const[r,i]of n){const l=t[r]?.trim().toLowerCase();if(l&&!`${i||""}`.toLowerCase().includes(l))return!1}return!0}function Ir(e){if(!e)return"";const t=r=>r==null?"":String(r),n=(Array.isArray(e.items)?e.items:[]).map(r=>{const i=Object.keys(r).sort().reduce((o,l)=>(o[l]=r[l],o),{});return JSON.stringify(i)}).sort();return JSON.stringify({savedAt:t(e.savedAt),dateIso:t(e.dateIso),datum:t(e.datum),ersteller:t(e.ersteller),standort:t(e.standort),kultur:t(e.kultur),usageType:t(e.usageType),eppoCode:t(e.eppoCode),invekos:t(e.invekos),bbch:t(e.bbch),gps:t(e.gps),gpsPointId:t(e.gpsPointId),areaHa:e.areaHa??null,areaAr:e.areaAr??null,areaSqm:e.areaSqm??null,kisten:e.kisten??null,itemHashes:n})}function Ss(e){e.size&&Ge("history",t=>{const a=Pa(t);if(!a.items.length)return a;let n=!1;const r=a.items.filter(i=>{const o=Ir(i);return e.has(o)?(n=!0,!1):!0});return n?{...a,items:r,totalCount:Math.min(a.totalCount,r.length),lastUpdatedAt:new Date().toISOString()}:a})}function Tl(e){return e.slice().sort((t,a)=>{const n=sr(t.entry)?.getTime()||new Date(t.entry.savedAt||0).getTime();return(sr(a.entry)?.getTime()||new Date(a.entry.savedAt||0).getTime())-n})}function Di(){return xe==="sqlite"?Ie>0?Math.max(Math.ceil(Ie/et),1):Math.max(Y+1,Ye.size||0):ce.length?Math.max(Math.ceil(ce.length/et),1):0}function Es(){if(xe==="sqlite"){const t=Math.max(Di()-1,0);return Y>t&&(Y=t),Y<0&&(Y=0),Y*et}if(!ce.length)return Y=0,0;const e=Math.max(Di()-1,0);return Y>e&&(Y=e),Y<0&&(Y=0),Y*et}function Ln(){if(!ce.length){lt=[];return}if(xe==="sqlite"){lt=ce.slice();return}const e=Es(),t=Math.min(e+et,ce.length);lt=ce.slice(e,t)}function Hl(e){if(Ye.size<=yi)return;const t=Array.from(Ye.keys()).sort((a,n)=>{const r=Math.abs(a-e);return Math.abs(n-e)-r});for(;Ye.size>yi&&t.length;){const a=t.shift();a==null||a===e||Ye.delete(a)}}function _l(e){const t=e.querySelector('[data-role="doc-pager"]');return t?((!Ra||xi!==t)&&(Ra?.destroy(),Ra=Ma(t,{onPrev:()=>jl(e),onNext:()=>Gl(e),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Dokumentation...",empty:"Keine Einträge"}}),xi=t),Ra):null}function Ol(e){const t=e.querySelector('[data-role="archive-log-pager"]');return t?((!Wa||ki!==t)&&(Wa?.destroy(),Wa=Ma(t,{onPrev:()=>Rl(e),onNext:()=>Wl(e),labels:{prev:"Zurück",next:"Weiter",loading:"Archive werden geladen...",empty:"Keine Einträge"}}),ki=t),Wa):null}function Kl(e){const t=e.length;if(!t)return Me=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/Za),1);Me>=a&&(Me=a-1),Me<0&&(Me=0);const n=Me*Za,r=Math.min(n+Za,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function $i(e,t){const a=Ol(e);if(a){if(!t.total){a.update({status:"disabled",info:"Noch keine Archive"});return}a.update({status:"ready",info:`Einträge ${t.start+1}–${t.end} von ${t.total}`,canPrev:Me>0,canNext:t.end<t.total})}}function Rl(e){if(Me===0)return;Me=Math.max(Me-1,0);const t=R().archives?.logs??[];Ea(e,t,{resetPage:!1})}function Wl(e){const t=R().archives?.logs??[],a=t.length;if(!a)return;const n=Math.max(Math.ceil(a/Za),1);Me>=n-1||(Me=Math.min(Me+1,n-1),Ea(e,t,{resetPage:!1}))}function Ja(e){const t=_l(e);if(!t)return;if(Je){t.update({status:"error",message:Je});return}const a=xe==="memory"?ce.length:Ie,n=lt.length;if(!n){const u=qe?"Lade Dokumentation...":"Keine Einträge vorhanden.";t.update({status:"disabled",info:u});return}const r=xe==="sqlite"?Y*et:Es(),i=`Einträge ${On.format(r+1)}–${On.format(r+n)}${a?` von ${On.format(a)}`:""}`,o=xe==="memory"?r+n<ce.length:!!We.get(Y+1),l=!qe&&o,c=Y>0&&!qe;t.update({status:"ready",info:i,canPrev:c,canNext:l,loadingDirection:qe&&o?"next":null})}function or(e){if(!Vt.enabled)return;const t=e.querySelector('[data-action="doc-seed"]');t&&(t.disabled=va,t.textContent=va?"Dummy-Daten werden erstellt...":`+ ${Vt.count} Dummy-Einträge`)}function jl(e){if(Y===0||qe)return;const t=Math.max(Y-1,0);if(xe==="sqlite"){Cr(e,R().fieldLabels,t);return}Y=t,Ln(),St(e,R().fieldLabels),Da(e,R().fieldLabels)}function Gl(e){if(qe)return;const t=Y+1;if(xe==="sqlite"){const n=Ye.has(t),r=We.get(t);if(!n&&!r)return;Cr(e,R().fieldLabels,t);return}t*et<ce.length&&(Y=t,Ln(),St(e,R().fieldLabels),Da(e,R().fieldLabels))}function La(e){He.clear(),yt.clear(),e&&Dn(e)}function Ul(){return xe==="memory"?ce.length:Ie}function Dn(e){const t=e.querySelector('[data-role="doc-selection-info"]'),a=e.querySelector('[data-action="print-selection"]'),n=e.querySelector('[data-action="pdf-selection"]'),r=e.querySelector('[data-action="export-selection"]'),i=e.querySelector('[data-action="export-zip"]'),o=e.querySelector('[data-action="delete-selection"]'),l=He.size;t&&(t.textContent=l?`${l} Eintrag${l===1?"":"e"} ausgewählt`:"Keine Einträge ausgewählt");const c=l===0;a&&(a.disabled=c),n&&(n.disabled=c),r&&(r.disabled=c),i&&(i.disabled=c),o&&(o.disabled=c);const u=e.querySelector('[data-action="toggle-select-all"]');if(u){const d=Ul();u.disabled=d===0,u.checked=d>0&&l>=d,u.indeterminate=l>0&&l<d}}function lr(e,t){e.querySelectorAll('[data-role="doc-list"] .doc-sidebar-entry').forEach(n=>{const r=!!(t&&n.dataset.entryId===t);n.classList.toggle("active",r)})}function pa(e,t,a){const n=e.querySelector("#doc-detail"),r=e.querySelector("#doc-detail-body"),i=e.querySelector('[data-role="doc-detail-card"]'),o=e.querySelector('[data-role="doc-detail-empty"]');if(!n||!r||!i||!o)return;if(!t){n.dataset.entryId="",i.classList.add("d-none"),o.classList.remove("d-none"),r.innerHTML="",lr(e,null);return}n.dataset.entryId=t.entry.id,i.classList.remove("d-none"),o.classList.add("d-none"),lr(e,t.entry.id);const l=a||R().fieldLabels,c=l.history?.tableColumns??{},u=l.history?.detail??{},d=t.detail||t.entry.entry,p=lo(d.items||[],l,"detail"),m=d.gpsCoordinates?za(d.gpsCoordinates):null,y=Fl(d),f=Nl(d),x=u.gpsNote||c.gpsNote||u.gps||c.gps||"GPS-Notiz",S=u.gpsCoordinates||c.gpsCoordinates||u.gps||c.gps||"GPS-Koordinaten",A=f?`${g(f)}${m?` <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${g(m)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:""}`:"-";r.innerHTML=`
    <p>
      <strong>${g(c.date||"Datum")}:</strong> ${g(ks(d))}<br />
      <strong>${g(u.creator||"Erstellt von")}:</strong> ${g(d.ersteller||"")}<br />
      <strong>${g(u.location||"Standort")}:</strong> ${g(d.standort||"")}<br />
      <strong>${g(u.crop||"Kultur")}:</strong> ${g(d.kultur||"")}<br />
      <strong>${g(u.usageType||"Art der Verwendung")}:</strong> ${g(d.usageType||"")}<br />
      <strong>${g(u.quantity||"Fläche (ha)")}:</strong> ${g(fl(d))}<br />
      <strong>${g(u.eppoCode||"EPPO-Code")}:</strong> ${g(d.eppoCode||"")}<br />
      <strong>${g(u.bbch||"BBCH")}:</strong> ${g(d.bbch||"")}<br />
      <strong>${g(u.invekos||"InVeKoS")}:</strong> ${g(d.invekos||"")}<br />
      <strong>${g(x)}:</strong> ${y?g(y):"-"}<br />
      <strong>${g(S)}:</strong> ${A}<br />
      <strong>${g(u.time||"Uhrzeit")}:</strong> ${g(d.uhrzeit||"")}<br />
    </p>
    ${co({maschine:d.qsMaschine,schaderreger:d.qsSchaderreger,verantwortlicher:d.qsVerantwortlicher,wetter:d.qsWetter,behandlungsart:d.qsBehandlungsart})}
    <div class="table-responsive">
      ${p}
    </div>
  `}function St(e,t){Ln();const a=e.querySelector('[data-role="doc-list"]');if(!a)return;const r=e.querySelector("#doc-detail")?.dataset.entryId||null;if(!lt.length)a.innerHTML=qe?'<div class="text-center text-muted py-4">Lädt ...</div>':'<div class="text-center text-muted py-4">Noch keine Einträge</div>';else{a.innerHTML="";const i=document.createDocumentFragment();(t||R().fieldLabels).history?.detail?.usageType,lt.forEach(l=>{const c=document.createElement("div"),u=!!wt?.highlightEntryIds?.has(l.id);c.className=`doc-sidebar-entry list-group-item${u?" doc-sidebar-entry--highlight":""}`,c.dataset.entryId=l.id;const d=ks(l.entry)||"-",p=u?'<span class="badge bg-warning-subtle text-warning-emphasis badge-import">Import</span>':"";c.innerHTML=`
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
            <input type="checkbox" class="form-check-input" data-action="toggle-select" data-entry-id="${l.id}" ${He.has(l.id)?"checked":""} />
            <span class="small">Auswahl</span>
          </label>
        </div>
      `,i.appendChild(c)}),a.appendChild(i)}lr(e,r),yl(e,t),Ja(e),Dn(e),xs=new Date().toISOString(),Al()}function Da(e,t){const a=e.querySelector('[data-role="doc-info"]');if(!a)return;const n=Ie,r=!!(V.crop||V.creator);if(!n&&!qe){a.textContent="Keine Einträge";return}if(!n&&qe){a.textContent="Lädt...";return}if(V.startDate&&V.endDate){const i=`${V.startDate} - ${V.endDate} (${n})`;a.textContent=r?`${i} + Filter`:i;return}a.textContent=`Alle Einträge (${n})`}async function Ls(e,t){const n=e.querySelector("#doc-detail")?.dataset.entryId;if(!n){pa(e,null,t);return}const r=Ct(n);if(!r){pa(e,null,t);return}const i=await Ia(r);i?pa(e,{entry:r,detail:i},t):pa(e,null,t)}async function Cr(e,t,a=Y,n={}){const r=Math.max(0,a),i=!!n.forceReload;i&&(Ye.clear(),We.clear(),We.set(0,null),Ie=0,ce=[],lt=[],Y=0,Je=null);const o=i?void 0:Ye.get(r);if(o&&!n.forceReload){Y=r,ce=o,Je=null,St(e,t),Da(e),Ja(e);return}const l=We.has(r)?We.get(r)??null:null,c=Symbol("doc-load");oa=c,qe=!0,Je=null,Ja(e);try{const u=await Yi({cursor:l,pageSize:et,filters:Pr(V),sortDirection:"desc",includeTotal:i||r===0||Ie===0});if(oa!==c)return;const d=u.items.map(p=>Ll(p));if(Ye.set(r,d),Hl(r),We.set(r,l),We.set(r+1,u.nextCursor??null),typeof u.totalCount=="number")Ie=u.totalCount;else{const p=r*et+d.length;Ie=Math.max(Ie,p)}Y=r,ce=d,Je=null,St(e,t),Da(e,t)}catch(u){oa===c&&(console.error("Dokumentation konnte nicht geladen werden",u),Je="Dokumentation konnte nicht geladen werden. Bitte erneut versuchen.",window.alert("Dokumentation konnte nicht geladen werden. Bitte erneut versuchen."))}finally{oa===c&&(qe=!1,oa=null,Ja(e))}}async function Vl(e,t){const a=Te(t.history);ce=Tl(a.map((n,r)=>El(n,r)).filter(n=>ql(n.entry,V))),Ie=ce.length,Y=0,Je=null,Ln(),St(e,t.fieldLabels),Da(e,t.fieldLabels),await Ls(e,t.fieldLabels)}async function gt(e,t){const a=Qt(t),n=!!t.app?.hasDatabase,r=a==="sqlite"&&n;if(xe=r?"sqlite":"memory",Kt.clear(),Y=0,Je=null,Ie=0,ce=[],lt=[],Ye.clear(),We.clear(),We.set(0,null),La(e),zr(e,t),En(e),Ea(e,t.archives?.logs??[]),Qa=ir(t.archives?.logs),r){await Cr(e,t.fieldLabels,0,{forceReload:!0}),await Ls(e,t.fieldLabels);return}await Vl(e,t)}async function Kn(){const e=[];for(const t of He){const a=yt.get(t)||Ct(t);if(!a)continue;const n=await Ia(a);n&&e.push(n)}return e}async function Zl(e,t){if(!t){La(e),St(e,R().fieldLabels);return}if(He.clear(),yt.clear(),xe==="memory")for(const a of ce)He.add(a.id),yt.set(a.id,a);else try{const a=await Xi({filters:Pr(V),sortDirection:"desc",limit:1e4}),n=Array.isArray(a.historyIds)?a.historyIds:[];a.entries.forEach((r,i)=>{const o=Number(n[i]);if(!Number.isFinite(o))return;const l=Rt("sqlite",o);He.add(l),yt.set(l,{id:l,entry:r,source:"sqlite",ref:o}),Kt.has(l)||Kt.set(l,r)})}catch(a){console.error("Alle Einträge konnten nicht ausgewählt werden",a),window.alert("Alle Einträge konnten nicht ausgewählt werden. Bitte erneut versuchen.")}St(e,R().fieldLabels),Dn(e)}async function Ql(e,t){if(!He.size)return;const a=Array.from(He).map(l=>yt.get(l)||Ct(l)).filter(l=>!!l),n=[];for(const l of a){const c=await Ia(l);c&&n.push(c)}const r=a.filter(l=>l.source==="sqlite"),i=!!r.length;if(i)for(const l of r)await io(l.ref);const o=new Set(a.filter(l=>l.source==="state").map(l=>l.ref));if(o.size&&(Ge("history",l=>{const c=Pa(l),u=c.items.filter((d,p)=>!o.has(p));return u.length===c.items.length?c:{...c,items:u,totalCount:Math.min(c.totalCount,u.length),lastUpdatedAt:new Date().toISOString()}}),await Jl()),n.length){const l=new Set(n.map(c=>Ir(c)));Ss(l)}if(i){try{await je()}catch(l){console.warn("SQLite-Datei konnte nach dem Löschen nicht gespeichert werden",l)}t.events?.emit?.("history:data-changed",{type:"deleted",ids:r.map(l=>l.ref)})}La(e),await gt(e,t.state.getState())}async function Ds(e,t,a){const n=await Ia(t);if(!n){window.alert("Details konnten nicht geladen werden.");return}pa(e,{entry:t,detail:n},a)}async function Ai(e){const t=await Ia(e);t?await $s([t]):window.alert("Eintrag konnte nicht geladen werden.")}async function Jl(){const e=le();if(!(!e||e==="memory"||e==="sqlite"))try{const t=Ke();await Re(t)}catch(t){throw console.error("Persist history failed",t),window.alert("Historie konnte nicht gespeichert werden. Bitte erneut versuchen."),t}}async function Yl(e,t,a){if(un)return;const n=t.state.getState();if(Qt(n)!=="sqlite"||!n.app?.hasDatabase){ke(e,"Archivieren ist nur mit einer lokalen SQLite-Datenbank möglich.","warning");return}const i=Pl(a);if(!i?.startDate||!i.endDate){ke(e,"Bitte Start- und Enddatum für das Archiv wählen.","warning");return}const o=dn(i.startDate),l=dn(i.endDate);if(!o||!l){ke(e,"Die angegebenen Daten sind ungültig.","danger");return}if(new Date(o)>new Date(l)){ke(e,"Startdatum darf nicht nach dem Enddatum liegen.","danger");return}const c={startDate:o,endDate:l,creator:V.creator,crop:V.crop},u=Pr(c);Ei(e,!0),ke(e,"Prüfe Zeitraum und Eintragsmenge...","info");try{const d=await Yi({cursor:null,pageSize:1,filters:u,sortDirection:"asc",includeTotal:!0}),p=d.totalCount??d.items.length??0;if(!p){ke(e,"Im angegebenen Zeitraum wurden keine Einträge gefunden.","warning");return}if(p>bi){ke(e,`Maximal ${bi} Einträge pro Archiv erlaubt. Bitte Zeitraum verkürzen.`,"warning");return}ke(e,`Exportiere ${p} Einträge in ein ZIP-Archiv...`,"info");const m=await Xi({filters:u,limit:p,sortDirection:"asc"}),y=m?.entries??[];if(!y.length){ke(e,"Archiv konnte nicht erstellt werden – Export lieferte keine Einträge.","danger");return}const f=y.map(L=>({...L})),x={format:"pflanzenschutz-archive",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:f.length,filters:{startDate:o,endDate:l,creator:c.creator||null,crop:c.crop||null},archive:{removeFromDatabase:i.removeAfterExport,storageHint:i.storageHint||null,note:i.note||null}},S=es({"pflanzenschutz.json":ln(JSON.stringify(f,null,2)),"metadata.json":ln(JSON.stringify(x,null,2))}),A=new ArrayBuffer(S.byteLength);new Uint8Array(A).set(S);const z=new Blob([A],{type:"application/zip"}),j=zl(o,l);Br(z,j);let U=!1;if(i.removeAfterExport){ke(e,"Export abgeschlossen. Entferne Einträge und bereinige Datenbank...","info"),await to({filters:u});const L=new Set(f.map($=>Ir($)));Ss(L);try{await je()}catch($){console.error("SQLite-Datei konnte nach dem Archivieren nicht gespeichert werden",$)}t.events?.emit?.("history:data-changed",{type:"deleted-range",filters:u});try{await ao()}catch($){U=!0,console.error("VACUUM fehlgeschlagen",$)}}const pe=new Date().toISOString(),B={id:`archive-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,archivedAt:pe,startDate:o,endDate:l,entryCount:f.length,fileName:j,storageHint:i.storageHint||void 0,note:i.note||void 0};U&&(B.note=B.note?`${B.note} | VACUUM fehlgeschlagen`:"VACUUM fehlgeschlagen");const X={filters:{...c},removeAfterExport:!!i.removeAfterExport,historyIdSample:m?.historyIds?.slice(0,hi)};if(await Il(B,X),!i.removeAfterExport&&m?.historyIds?.length){const L=m.historyIds.slice(0,hi).map($=>({source:"sqlite",ref:$}));t.events?.emit?.("documentation:focus-range",{startDate:o,endDate:l,label:"Archiviert",reason:"archive",entryIds:L})}rr(e,!1),a.reset(),En(e),await gt(e,t.state.getState());const M=i.removeAfterExport?`Archiv ${j} erstellt und ${f.length} Einträge entfernt.`:`Archiv ${j} erstellt. ${f.length} Einträge bleiben in der Datenbank.`;ke(e,M,U?"warning":"success")}catch(d){console.error("Archivieren fehlgeschlagen",d);const p=d instanceof Error?d.message:"Archiv konnte nicht erstellt werden.";ke(e,p,"danger")}finally{Ei(e,!1),zr(e,t.state.getState())}}const Xl=50;async function $s(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}if(e.length>Xl&&!window.confirm(`Sie möchten ${e.length} Einträge drucken. Bei sehr vielen Einträgen kann das Erstellen der Druckvorschau einige Sekunden dauern und lässt sich nicht unterbrechen.

Fortfahren?`))return;const t=R().fieldLabels,a=no(R().company||null);await ro(e,t,{title:"Dokumentation",headerHtml:a,chunkSize:25})}function Br(e,t){const a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download=t,n.click(),URL.revokeObjectURL(a)}function ec(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const t=e.map(o=>({...o})),a=JSON.stringify(t,null,2),n=new TextEncoder().encode(a),r=new Blob([n],{type:"application/json; charset=utf-8"}),i=new Date().toISOString().replace(/[:.]/g,"-");Br(r,`pflanzenschutz-dokumentation-${i}.json`)}async function tc(e,t){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const a=e.map(c=>({...c})),n={format:"pflanzenschutz-export",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:a.length,filters:{startDate:t.startDate||null,endDate:t.endDate||null,creator:t.creator||null,crop:t.crop||null}},r=es({"pflanzenschutz.json":ln(JSON.stringify(a,null,2)),"metadata.json":ln(JSON.stringify(n,null,2))}),i=new ArrayBuffer(r.byteLength);new Uint8Array(i).set(r);const o=new Blob([i],{type:"application/zip"}),l=new Date().toISOString().replace(/[:.]/g,"-");Br(o,`pflanzenschutz-dokumentation-${l}.zip`)}function ac(){const e=document.createElement("div"),t=Ar(),a=V.startDate||t.startDate||"",n=V.endDate||t.endDate||"";V={...V,startDate:a,endDate:n};const r=Vt.enabled?`<button class="btn btn-outline-info btn-sm" type="button" data-action="doc-seed">+ ${Vt.count} Dummy-Einträge</button>`:"";return e.className="section-inner",e.innerHTML=`
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
            <small class="text-muted">Letzte ${$r}</small>
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
  `,e}function nc(e){if(!e)return{};const t=new FormData(e),a=r=>{const i=t.get(r);return typeof i=="string"&&i?i:void 0},n=r=>{const i=t.get(r);if(typeof i!="string")return;const o=i.trim();return o||void 0};return{startDate:a("doc-start"),endDate:a("doc-end"),crop:n("doc-crop"),creator:n("doc-creator")}}let Pi="entries";function rc(e,t){Pi!==t&&(Pi=t,e.querySelectorAll("[data-doc-tab]").forEach(a=>{a.classList.toggle("active",a.dataset.docTab===t)}),e.querySelectorAll("[data-pane]").forEach(a=>{a.style.display=a.dataset.pane===t?"block":"none"}))}function ic(e,t){e.addEventListener("click",a=>{const n=a.target.closest("[data-doc-tab]");if(n&&n.dataset.docTab){rc(e,n.dataset.docTab);return}}),e.addEventListener("submit",a=>{if(a.target instanceof HTMLFormElement){if(a.target.id==="doc-filter"){a.preventDefault(),_n(e,t,{refreshList:!0});const n=nc(a.target);if(!n.startDate||!n.endDate){window.alert("Bitte Start- und Enddatum auswählen.");return}V=n,La(e),gt(e,t.state.getState());return}a.target.dataset.role==="archive-form"&&(a.preventDefault(),Yl(e,t,a.target))}}),e.addEventListener("click",a=>{const n=a.target;if(!n)return;const r=n.dataset.action;if(!r){n.closest("[data-action]")&&a.stopPropagation();return}if(r==="reset-filters"){const l=e.querySelector("#doc-filter");l?.reset(),V=Ar(),ys(l??null,V),_n(e,t,{refreshList:!0}),La(e),gt(e,t.state.getState());return}if(r==="archive-toggle"){rr(e),ke(e,"");return}if(r==="archive-cancel"){rr(e,!1),ke(e,"");return}if(r==="archive-log-focus"){const l=n.dataset.logId;if(!l)return;const c=Li(t.state.getState(),l);if(!c){window.alert("Archiv-Eintrag nicht gefunden.");return}const u=c.fileName?`Archiv ${c.fileName}`:"Archivierter Zeitraum";typeof t.events?.emit=="function"?t.events.emit("documentation:focus-range",{startDate:c.startDate,endDate:c.endDate,label:u,reason:"archive-log"}):(V={...V,startDate:c.startDate,endDate:c.endDate},gt(e,t.state.getState())),ke(e,`Dokumentation auf Archiv ${c.startDate} – ${c.endDate} fokussiert.`,"success");return}if(r==="archive-log-copy-hint"){const l=n.dataset.logId;if(!l)return;const c=Li(t.state.getState(),l);if(!c||!c.storageHint){window.alert("Kein Speicherhinweis vorhanden.");return}const u=c.storageHint;(async()=>{try{await Bl(u),ke(e,"Speicherhinweis kopiert.","success")}catch(d){console.error("Hinweis konnte nicht kopiert werden",d),window.alert("Hinweis konnte nicht kopiert werden.")}})();return}if(r==="doc-focus-clear"){_n(e,t,{refreshList:!0});return}if(r==="print-selection"||r==="pdf-selection"){(async()=>{const l=await Kn();await $s(l)})();return}if(r==="export-selection"){(async()=>{const l=await Kn();ec(l)})();return}if(r==="export-zip"){(async()=>{const l=await Kn();await tc(l,V)})();return}if(r==="delete-selection"){if(!He.size||!window.confirm("Ausgewählte Einträge wirklich löschen?"))return;Ql(e,t);return}if(r==="doc-seed"){if(!Vt.enabled||va)return;const c=window.__PSL?.seedHistoryEntries;if(typeof c!="function"){window.alert("Seed-Funktion ist nicht verfügbar. Bitte Entwicklungsmodus verwenden.");return}va=!0,or(e),(async()=>{try{await c(Vt.count),await gt(e,t.state.getState())}catch(u){console.error("Dummy-Daten konnten nicht erstellt werden",u),window.alert("Dummy-Daten konnten nicht erstellt werden.")}finally{va=!1,or(e)}})();return}if(r==="detail-print"){const c=e.querySelector("#doc-detail")?.dataset.entryId;if(!c){window.alert("Kein Eintrag ausgewählt.");return}const u=Ct(c);if(!u){window.alert("Eintrag nicht verfügbar.");return}Ai(u);return}const i=n.dataset.entryId;if(!i)return;const o=Ct(i);if(!o){window.alert("Eintrag nicht verfügbar.");return}if(r==="view-entry"){Ds(e,o,t.state.getState().fieldLabels);return}if(r==="print-entry"){Ai(o);return}}),e.addEventListener("change",a=>{const n=a.target;if(!n)return;if(n.dataset.action==="toggle-select-all"){Zl(e,n.checked);return}if(n.dataset.action!=="toggle-select")return;const r=n.dataset.entryId;if(r){if(n.checked){He.add(r);const i=Ct(r);i&&yt.set(r,i)}else He.delete(r),yt.delete(r);Dn(e)}})}function sc(e,t){if(!e||wi)return;const a=e;a.innerHTML="";const n=ac();a.appendChild(n),ic(n,t),or(n),zr(n,t.state.getState()),En(n);const r=t.state.getState().archives?.logs??[];Ea(n,r),Qa=ir(r),Mr(),typeof t.events?.subscribe=="function"&&t.events.subscribe("documentation:focus-range",l=>{!l||typeof l!="object"||wl(n,t,l)});const i=l=>Te(l.history).length,o=()=>gt(n,t.state.getState());Si?.(),Si=fs({section:"documentation",event:"history:data-changed",shouldHandleEvent:()=>xe==="sqlite",shouldRefresh:()=>xe==="sqlite",onRefresh:()=>o(),onStatusChange:l=>vl(n,l)}),la=i(t.state.getState()),o(),t.state.subscribe(l=>{const c=ir(l.archives?.logs);c!==Qa&&(Qa=c,Ea(n,l.archives?.logs??[]));const u=i(l);if(nr){la=u;return}if(xe==="sqlite"){la=u;return}u!==la&&(la=u,o())}),wi=!0}const $a=e=>Te(e.gps.points),ma=e=>Te(e.points),oc=new Intl.NumberFormat("de-DE",{minimumFractionDigits:5,maximumFractionDigits:5}),lc=new Intl.DateTimeFormat("de-DE",{dateStyle:"short",timeStyle:"short"}),zi="Deutschland";let Mi=!1,As="list",ja=null,D=null,ca=null,Ii=null;const Ya=25,Rn=new Intl.NumberFormat("de-DE");let Se=0,Ht=null,cr=null,Ci=null;function qt(e,t){typeof e.events?.emit=="function"&&e.events.emit("history:gps-activation-result",{...t,source:"gps",timestamp:Date.now()})}function ya(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function cc(){const e=document.createElement("section");return e.className="section-inner",e.innerHTML=`
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
  `,e}function dc(e){return{root:e,message:e.querySelector('[data-role="gps-message"]'),refreshIndicator:e.querySelector('[data-role="gps-refresh-indicator"]'),availability:e.querySelector('[data-role="gps-availability"]'),tabButtons:Array.from(e.querySelectorAll('[data-role="gps-tab"]')),panels:Array.from(e.querySelectorAll('[data-role="gps-panel"]')),listBody:e.querySelector('[data-role="gps-list"]'),emptyState:e.querySelector('[data-role="gps-empty"]'),activeInfo:e.querySelector('[data-role="gps-active-info"]'),summaryLabel:e.querySelector('[data-role="gps-summary"]'),statusBadge:e.querySelector('[data-role="gps-status"]'),form:e.querySelector('[data-role="gps-form"]'),formFields:{name:e.querySelector('[name="gps-name"]'),description:e.querySelector('[name="gps-description"]'),latitude:e.querySelector('[name="gps-latitude"]'),longitude:e.querySelector('[name="gps-longitude"]'),source:e.querySelector('[name="gps-source"]'),activate:e.querySelector('[name="gps-activate"]'),rawCoordinates:e.querySelector('[name="gps-raw-coordinates"]')},disableTargets:Array.from(e.querySelectorAll("[data-gps-disable]")),geolocationBtn:e.querySelector('[data-action="use-geolocation"]'),mapButton:e.querySelector('[data-role="gps-open-maps"]'),verifyButton:e.querySelector('[data-action="verify-coords"]')}}function fa(e){return`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e)}`}function Ps(e){const t=e.gps,a=ma(t),n=o=>{if(!o)return null;const l=za(o)||fa(`${o.latitude},${o.longitude}`),c=o.name?`${o.name}`:`${Zt(o.latitude)}, ${Zt(o.longitude)}`;return{url:l,label:c}};if(t.activePointId){const o=a.find(c=>c.id===t.activePointId),l=n(o||null);if(l)return l}if(a.length>0){const o=n(a[0]);if(o)return o}const r=e.company?.address?.trim();if(r)return{url:fa(r.replace(/\n/g,", ")),label:r};const i=e.company?.name?.trim();return i?{url:fa(i),label:i}:{url:fa(zi),label:zi}}function uc(e){if(!D)return;const t=Ps(e);D.mapButton&&(D.mapButton.href=t.url,D.mapButton.title=`Google Maps öffnen (${t.label})`);const a=D.root.querySelector('[data-role="gps-empty-map-link"]');a&&(a.href=t.url)}function pc(e){if(!e)return null;const a=e.trim().replace(/\s+/g," ").replace(/[,;]/g," ").match(/-?\d+(?:[.,]\d+)?/g);if(!a||a.length<2)return null;const n=o=>Number(o.replace(/,/g,".")),r=n(a[0]),i=n(a[1]);return!Number.isFinite(r)||!Number.isFinite(i)||r<-90||r>90||i<-180||i>180?null:{latitude:r,longitude:i}}function mc(){if(!D?.formFields)return null;const e=D.formFields.latitude?.value??"",t=D.formFields.longitude?.value??"";if(!e.trim()||!t.trim())return null;const a=Number(e),n=Number(t);return!Number.isFinite(a)||!Number.isFinite(n)||a<-90||a>90||n<-180||n>180?null:{latitude:a,longitude:n}}function Ga(e){return Number(e).toFixed(6)}function fc(e,t){const a=Ga(e),n=Ga(t);return $a(R()).some(r=>Ga(r.latitude)===a&&Ga(r.longitude)===n)}function wa(){if(!D?.verifyButton)return;const e=mc(),t=!!e;if(D.verifyButton.disabled=!t,e){const a=za({latitude:e.latitude,longitude:e.longitude});D.verifyButton.dataset.targetUrl=a||fa(`${e.latitude},${e.longitude}`)}else delete D.verifyButton.dataset.targetUrl}function Zt(e){const t=Number(e);return Number.isFinite(t)?`${oc.format(t)}°`:"–"}function gc(e){if(!e)return"–";const t=new Date(e);return Number.isNaN(t.getTime())?"–":lc.format(t)}function re(e,t="info",a=4500){if(D?.message){if(ja&&(window.clearTimeout(ja),ja=null),!e){D.message.classList.add("d-none"),D.message.textContent="";return}D.message.className=`alert alert-${t}`,D.message.textContent=e,D.message.classList.remove("d-none"),a>0&&(ja=window.setTimeout(()=>{D?.message?.classList.add("d-none")},a))}}function bc(e){const t=D?.refreshIndicator;if(t){if(t.classList.remove("alert-warning","alert-info"),e==="idle"){t.classList.add("d-none");return}t.classList.remove("d-none"),e==="stale"?(t.classList.add("alert-warning"),t.textContent="GPS-Daten wurden geändert. Ansicht aktualisiert sich beim Öffnen."):(t.classList.add("alert-info"),t.textContent="GPS-Daten werden aktualisiert...")}}function zs(e){D&&(As=e,D.tabButtons.forEach(t=>{const a=t.dataset.tab===e;t.classList.toggle("active",a)}),D.panels.forEach(t=>{const a=t.getAttribute("data-panel")===e;t.classList.toggle("d-none",!a)}))}function _e(e){return e?.hasDatabase?e.storageDriver!=="sqlite"?"wrong-driver":"ok":"no-db"}function hc(e){if(D?.availability){if(e==="ok"){D.availability.classList.add("d-none"),D.availability.textContent="";return}D.availability.classList.remove("d-none"),D.availability.textContent=e==="no-db"?"Bitte verbinden Sie zuerst eine Datenbank, um GPS-Punkte zu verwalten.":"GPS-Funktionen benötigen eine aktive SQLite-Datenbank. Bitte den SQLite-Treiber in den Einstellungen auswählen."}}function Wt(e,t){if(!D)return;const a=t!=="ok"||e.pending||Sa.isLocked();if(D.disableTargets.forEach(n=>{(n instanceof HTMLButtonElement||n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n instanceof HTMLSelectElement)&&(n.disabled=a)}),D.statusBadge){let n="badge bg-success",r="Bereit";t==="no-db"?(n="badge bg-secondary",r="Keine Datenbank"):t==="wrong-driver"?(n="badge bg-warning text-dark",r="Nur mit SQLite"):(e.pending||Sa.isLocked())&&(n="badge bg-info text-dark",r="Wird verarbeitet"),D.statusBadge.className=n,D.statusBadge.textContent=r}}function Ms(e){const t=e.length;if(!t)return Se=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/Ya),1);Se>=a&&(Se=a-1),Se<0&&(Se=0);const n=Se*Ya,r=Math.min(n+Ya,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function vc(){if(!D?.root)return null;const e=D.root.querySelector('[data-role="gps-pager"]');return e?((!Ht||cr!==e)&&(Ht?.destroy(),Ht=Ma(e,{onPrev:()=>wc(),onNext:()=>xc(),labels:{prev:"Zurück",next:"Weiter",loading:"GPS-Punkte werden geladen...",empty:"Keine GPS-Punkte verfügbar"}}),cr=e),Ht):null}function Bi(e,t){const a=vc();if(!a)return;if(t!=="ok"){Se=0;const o=t==="no-db"?"Keine Datenbank verbunden.":"Nur mit SQLite verfügbar.";a.update({status:"disabled",info:o});return}const n=$a(e).length;if(!n){Se=0;const o=e.gps.initialized?"Noch keine GPS-Punkte vorhanden.":"GPS-Punkte werden geladen...";a.update({status:"disabled",info:o});return}const{start:r,end:i}=Ms($a(e));a.update({status:"ready",info:`Einträge ${Rn.format(r+1)}–${Rn.format(i)} von ${Rn.format(n)}`,canPrev:Se>0,canNext:i<n})}function yc(e,t){return e.length?e.map(a=>{const n=a.id===t,r=a.description?`<div class="text-muted small">${g(a.description)}</div>`:"",i=a.source?`<span class="badge-psm badge-psm-neutral">${g(a.source)}</span>`:'<span class="text-muted">–</span>',o=n?'<span class="badge bg-success ms-2">Aktiv</span>':"",l=za(a),c=l?`<a class="btn btn-outline-info" href="${ya(l)}" target="_blank" rel="noopener noreferrer">
              Karte
            </a>`:"";return`
        <tr data-point-id="${ya(a.id)}">
          <td>
            <div class="fw-semibold">${g(a.name||"Ohne Namen")}${o}</div>
            ${r}
          </td>
          <td class="font-monospace">
            <div>${Zt(a.latitude)}</div>
            <div>${Zt(a.longitude)}</div>
          </td>
          <td>
            <div>${i}</div>
            <div class="text-muted small">${gc(a.updatedAt)}</div>
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
`):""}function Nr(e,t){if(!D)return;const a=e.gps,n=Ps(e),r=t==="ok";if(D.summaryLabel){const i=ma(a).length;D.summaryLabel.textContent=r?`${i} Punkt${i===1?"":"e"} gespeichert`:"Funktion derzeit nicht verfügbar"}if(!r){D.listBody&&(D.listBody.innerHTML=""),D.emptyState&&(D.emptyState.textContent=t==="no-db"?"Keine Datenbank verbunden.":"Bitte SQLite als Speicher-Treiber aktivieren.",D.emptyState.classList.remove("d-none")),D.activeInfo&&(D.activeInfo.textContent=t==="no-db"?"Wartet auf Datenbank.":"Nur mit SQLite verfügbar."),Bi(e,t);return}if(D.listBody){const{items:i}=Ms(ma(a));D.listBody.innerHTML=yc(i,a.activePointId)}if(D.emptyState){const i=ma(a).length>0;D.emptyState.classList.toggle("d-none",i),!i&&a.initialized?D.emptyState.innerHTML=`
        <p class="mb-2">Noch keine GPS-Punkte vorhanden.</p>
        <p class="small text-muted mb-3">
          Nutzen Sie "Neuer Punkt" oder öffnen Sie Google Maps, um Koordinaten zu ermitteln.
        </p>
        <a class="btn btn-outline-info btn-sm" data-role="gps-empty-map-link" href="${ya(n.url)}" target="_blank" rel="noopener noreferrer">
          <i class="bi bi-box-arrow-up-right me-1"></i>
          Google Maps öffnen
        </a>
      `:a.initialized||(D.emptyState.textContent="GPS-Punkte werden geladen...")}if(D.activeInfo)if(a.activePointId){const i=ma(a).find(o=>o.id===a.activePointId);if(i){const o=`${i.name||"Ohne Namen"} (${Zt(i.latitude)}, ${Zt(i.longitude)})`,l=za(i);l?D.activeInfo.innerHTML=`${g(o)} <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${ya(l)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:D.activeInfo.textContent=o}else D.activeInfo.textContent="Aktiver Punkt nicht gefunden."}else D.activeInfo.innerHTML=`Kein aktiver Punkt ausgewählt. <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${ya(n.url)}" target="_blank" rel="noopener noreferrer">Google Maps öffnen</a>`;Bi(e,t)}function wc(){if(Se===0)return;Se=Math.max(Se-1,0);const e=R(),t=_e(e.app);Nr(e,t)}function xc(){const e=R(),t=$a(e).length;if(!t)return;const a=Math.max(Math.ceil(t/Ya)-1,0);if(Se>=a)return;Se=Math.min(Se+1,a);const n=_e(e.app);Nr(e,n)}function ze(e){`${new Date().toLocaleString("de-DE")}${e}`}function Ca(e){if(!e)return null;const t=R();return $a(t).find(a=>a.id===e)||null}async function kc(e){if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(e);return}const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}function Sc(){if(!D?.formFields?.rawCoordinates)return;const e=D.formFields.rawCoordinates.value,t=pc(e);if(!t){re("Koordinaten konnten nicht erkannt werden. Bitte Format 47.68952, 9.12091 verwenden.","warning",6e3);return}const a=t.latitude.toFixed(6),n=t.longitude.toFixed(6);D.formFields.latitude&&(D.formFields.latitude.value=a),D.formFields.longitude&&(D.formFields.longitude.value=n),re("Koordinaten übernommen.","success"),wa()}function Ec(){if(!D?.verifyButton)return;const e=D.verifyButton.dataset.targetUrl;if(!e){re("Bitte zuerst gültige Koordinaten eintragen, bevor die Prüfung geöffnet wird.","warning",6e3);return}window.open(e,"_blank","noopener,noreferrer")}async function dr(e={}){const{notify:t=!1}=e;if(!(!D||_e(R().app)!=="ok"||R().gps.pending))try{await Ji(),t&&re("GPS-Punkte aktualisiert.","success"),ze("GPS-Punkte synchronisiert.")}catch(n){const r=n instanceof Error?n.message:"GPS-Punkte konnten nicht geladen werden.";re(r,"danger",7e3),ze(`Fehler beim Laden: ${r}`)}}async function Lc(e){if(!e)return;const t=Ca(e);if(!t){re("Ausgewählter GPS-Punkt wurde nicht gefunden.","warning");return}try{await as(t.id),re(`"${t.name}" ist nun aktiv.`,"success"),ze(`Aktiver GPS-Punkt: ${t.name}`)}catch(a){const n=a instanceof Error?a.message:"GPS-Punkt konnte nicht aktiviert werden.";re(n,"danger",7e3),ze(`Fehler beim Aktivieren: ${n}`)}}async function Dc(e){if(!e)return;const t=Ca(e);if(!t){re("GPS-Punkt existiert nicht mehr.","warning");return}if(window.confirm(`"${t.name}" wirklich löschen? Dieser Schritt kann nicht rückgängig gemacht werden.`))try{await mo(t.id),re(`"${t.name}" wurde gelöscht.`,"success"),ze(`GPS-Punkt gelöscht: ${t.name}`)}catch(n){const r=n instanceof Error?n.message:"GPS-Punkt konnte nicht gelöscht werden.";re(r,"danger",7e3),ze(`Löschen fehlgeschlagen: ${r}`)}}async function $c(e){if(!e)return;const t=Ca(e);if(!t){re("GPS-Punkt nicht gefunden.","warning");return}const a=`${t.latitude}, ${t.longitude}`;try{await kc(a),re("Koordinaten in die Zwischenablage kopiert.","success")}catch(n){console.error("clipboard error",n),re("Koordinaten konnten nicht kopiert werden.","danger",7e3)}}async function Ac(e,t){const a=(e||"").trim();if(!a){qt(t,{status:"error",id:"",message:"Ungültige GPS-Anfrage ohne ID."});return}if(_e(R().app)!=="ok"){re("GPS-Modul ist ohne aktive SQLite-Datenbank nicht verfügbar.","warning",6e3),qt(t,{status:"error",id:a,message:"GPS-Modul ist derzeit nicht verfügbar."});return}const r=Ca(a);if(!r){re("Verknüpfter GPS-Punkt wurde nicht gefunden.","warning",6e3),qt(t,{status:"error",id:a,message:"Verknüpfter GPS-Punkt wurde nicht gefunden."});return}qt(t,{status:"pending",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wird aktiviert...`});try{await as(r.id),re(`"${r.name||"Ohne Namen"}" wurde aus der Historie aktiviert.`,"success"),ze(`Aus Historie aktiviert: ${r.name||r.id}`),qt(t,{status:"success",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wurde aktiviert.`})}catch(i){const o=i instanceof Error?i.message:"GPS-Punkt konnte nicht aktiviert werden.";re(o,"danger",7e3),ze(`Aktivierung aus Historie fehlgeschlagen: ${o}`),qt(t,{status:"error",id:r.id,name:r.name,message:o})}}async function Pc(){try{await fo(),ze("Aktiver GPS-Punkt synchronisiert."),re("Aktiver GPS-Punkt wurde synchronisiert.","success")}catch(e){const t=e instanceof Error?e.message:"Aktiver GPS-Punkt konnte nicht ermittelt werden.";re(t,"danger",7e3),ze(`Sync fehlgeschlagen: ${t}`)}}function zc(){if(!D?.formFields)throw new Error("Formular nicht initialisiert");const e=D.formFields.name?.value.trim()||"",t=D.formFields.description?.value.trim()||"",a=D.formFields.source?.value.trim()||"",n=Number(D.formFields.latitude?.value),r=Number(D.formFields.longitude?.value),i=!!D.formFields.activate?.checked;if(!e)throw new Error("Name darf nicht leer sein.");if(!Number.isFinite(n)||!Number.isFinite(r))throw new Error("Koordinaten sind ungültig.");return{name:e,description:t,latitude:n,longitude:r,source:a,activate:i}}async function Mc(e){if(e.preventDefault(),Sa.isLocked()){re("Speichern läuft bereits ...","info");return}try{const t=zc();if(fc(t.latitude,t.longitude)){re("Ein GPS-Punkt mit identischen Koordinaten ist bereits vorhanden.","warning",6e3);return}Wt(R().gps,_e(R().app)),await go({name:t.name,description:t.description||null,latitude:t.latitude,longitude:t.longitude,source:t.source||null},{activate:t.activate}),q.success(`GPS-Punkt "${t.name}" gespeichert.`),ze(`GPS-Punkt gespeichert${t.activate?" und aktiv gesetzt":""}: ${t.name}`),D?.form?.reset()}catch(t){const a=t instanceof Error?t.message:"GPS-Punkt konnte nicht gespeichert werden.";q.error(a),ze(`Speichern fehlgeschlagen: ${a}`)}finally{Wt(R().gps,_e(R().app))}}function Ic(){if(D?.formFields){if(!navigator.geolocation){q.warning("Geolocation wird von diesem Browser nicht unterstützt.");return}if(Sa.isLocked()){q.info("Bitte warten...");return}Sa.acquire(async()=>(Wt(R().gps,_e(R().app)),new Promise(e=>{navigator.geolocation.getCurrentPosition(t=>{const{latitude:a,longitude:n}=t.coords;D?.formFields.latitude&&(D.formFields.latitude.value=a.toFixed(6)),D?.formFields.longitude&&(D.formFields.longitude.value=n.toFixed(6)),D?.formFields.source&&!D.formFields.source.value.trim()&&(D.formFields.source.value="Browser"),q.success("Koordinaten aus Browser-Position übernommen."),ze("Browser-Geolocation übernommen"),wa(),Wt(R().gps,_e(R().app)),e()},t=>{const a=t.code===t.PERMISSION_DENIED?"Zugriff auf Standort wurde verweigert.":"Geolocation konnte nicht ermittelt werden.";q.warning(a),ze(`Geolocation fehlgeschlagen: ${a}`),Wt(R().gps,_e(R().app)),e()},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})})))}}function Cc(){D&&(D.root.addEventListener("click",e=>{const t=e.target;if(!t)return;const a=t.closest('[data-role="gps-tab"]');if(a&&a.dataset.tab){zs(a.dataset.tab);return}const n=t.closest("[data-action]");if(!n||n.dataset.action==="")return;const i=n.closest("[data-point-id]")?.getAttribute("data-point-id")||"";switch(n.dataset.action){case"reload-points":dr({notify:!0});break;case"sync-active":Pc();break;case"set-active":Lc(i);break;case"delete-point":Dc(i);break;case"copy-coords":$c(i);break;case"use-geolocation":Ic();break;case"apply-raw-coords":Sc();break;case"verify-coords":Ec();break}}),D.form?.addEventListener("submit",e=>{Mc(e)}),D.form?.addEventListener("reset",()=>{window.setTimeout(()=>{wa()},0)}),D.formFields.latitude?.addEventListener("input",()=>{wa()}),D.formFields.longitude?.addEventListener("input",()=>{wa()}))}function Bc(e,t){if(!e||Mi)return;Mi=!0;const a=e;a.innerHTML="";const n=cc();a.appendChild(n),D=dc(n),Ci?.(),Ci=fs({section:"gps",event:"gps:data-changed",shouldHandleEvent:()=>_e(t.state.getState().app)==="ok",shouldRefresh:()=>_e(t.state.getState().app)==="ok",onRefresh:()=>dr({notify:!1}),onStatusChange:o=>bc(o)}),Se=0,Ht?.destroy(),Ht=null,cr=null,Cc(),zs(As),typeof t.events?.subscribe=="function"&&t.events.subscribe("gps:set-active-from-history",o=>{let l="";if(o&&typeof o=="object"&&(l=String(o.id||"").trim()),!l){re("Historische GPS-Anfrage ohne gültige ID erhalten.","warning",6e3);return}Ac(l,t)});const r=t.state.getState();ca=r.gps.activePointId;const i=(o,l)=>{const c=_e(o.app),u=o.gps;if(hc(c),Nr(o,c),Wt(u,c),uc(o),c==="ok"&&!u.initialized&&!u.pending&&dr({notify:!1}),c==="ok"&&Ii!=="ok"&&u.initialized&&re("GPS-Bereich ist wieder verfügbar.","success"),Ii=c,o.gps.activePointId!==ca&&(ca=o.gps.activePointId,typeof t.events?.emit=="function")){const d=Ca(ca);t.events.emit("gps:active-point-changed",{id:ca,point:d})}o.gps.lastError&&o.gps.lastError!==l.gps.lastError&&(re(o.gps.lastError,"danger",7e3),ze(`Fehler: ${o.gps.lastError}`))};t.state.subscribe(i),i(r,r)}let Ce=[],Be=[],ur=!1,Xa=null;async function at(){try{const[e,t]=await Promise.all([wo({limit:100}),xo({limit:100})]);Ce=e.items||[],Be=t.items||[],sn("savedCodes:changed",{eppoCount:Ce.length,bbchCount:Be.length})}catch(e){console.error("Failed to load saved codes:",e),Ce=[],Be=[]}}function Nc(){const e=Ce.length>0,t=Be.length>0;return`
    <div class="row g-4">
      <!-- EPPO Codes Section -->
      <div class="col-lg-6">
        <div class="card card-dark codes-card h-100">
          <div class="card-header codes-card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="bi bi-flower1 me-2 text-success"></i>
              Kulturen (EPPO-Codes)
            </h5>
            <span class="badge badge-psm-neutral">${Ce.length} gespeichert</span>
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
                  <span class="badge bg-success ms-2">${Ce.length}</span>
                </h6>
                <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${pr()}
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
            <span class="badge badge-psm-neutral">${Be.length} gespeichert</span>
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
                  <span class="badge bg-info ms-2">${Be.length}</span>
                </h6>
                <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${mr()}
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
  `}function pr(){return Ce.length?Ce.map(e=>`
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
    `}function mr(){return Be.length?Be.map(e=>`
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
    `}function nt(e){const t=e.querySelector('[data-role="saved-eppo-list"]'),a=Ce.length>0;if(t){const l=t.closest(".border-top");l&&a&&(l.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Kulturen
            <span class="badge bg-success ms-2">${Ce.length}</span>
          </h6>
          <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${pr()}
          </div>
        `)}else if(a){const l=e.querySelector(".codes-card:first-child .border-top.pt-3.mb-3");l&&(l.innerHTML=`
        <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
          <i class="bi bi-bookmark-star me-1"></i>
          Meine Kulturen
          <span class="badge bg-success ms-2">${Ce.length}</span>
        </h6>
        <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
          ${pr()}
        </div>
      `)}const n=e.querySelector('[data-role="saved-bbch-list"]'),r=Be.length>0;if(n){const l=n.closest(".border-top");l&&r&&(l.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${Be.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${mr()}
          </div>
        `)}else if(r){const c=e.querySelectorAll(".codes-card")[1];if(c){const u=c.querySelector(".border-top.pt-3.mb-3");u&&(u.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${Be.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${mr()}
          </div>
        `)}}const i=e.querySelector(".codes-card:first-child .card-header .badge"),o=e.querySelector(".codes-card:last-child .card-header .badge");i&&(i.textContent=`${Ce.length} gespeichert`),o&&(o.textContent=`${Be.length} gespeichert`)}function Fc(e){const t=e.querySelector('[data-input="eppo-search"]'),a=e.querySelector('[data-role="eppo-search-results"]');if(t&&a){const l=Ur(async()=>{const c=t.value.trim();if(c.length<2){a.innerHTML="";return}try{const u=await vo(c,10);if(!u.length){a.innerHTML=`
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
        `}},300);t.addEventListener("input",l)}const n=e.querySelector('[data-input="bbch-search"]'),r=e.querySelector('[data-role="bbch-search-results"]');if(n&&r){const l=Ur(async()=>{const c=n.value.trim();if(c.length<1){r.innerHTML="";return}try{const u=await yo(c,10);if(!u.length){r.innerHTML=`
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
        `}},300);n.addEventListener("input",l)}e.dataset.codesClickBound!=="1"&&(e.dataset.codesClickBound="1",e.addEventListener("click",async l=>{const u=l.target.closest("[data-action]");if(!u)return;const d=u.dataset.action;if(d==="select-eppo"){const p=u.dataset.code||"",m=u.dataset.name||"",y=u.dataset.language||"",f=u.dataset.dtcode||"";if(!p||!m){console.warn("EPPO selection missing code or name");return}a&&(a.innerHTML=""),t&&(t.value="");const x=Ce.find(S=>S.code.toUpperCase()===p.toUpperCase());if(x){const S=e.querySelector(`[data-eppo-id="${x.id}"]`);S&&(S.classList.add("flash-highlight"),setTimeout(()=>S.classList.remove("flash-highlight"),800));return}try{await Fn({code:p,name:m,language:y||void 0,dtcode:f||void 0,isFavorite:!1});const S=Ke();await Re(S),await at(),nt(e)}catch(S){console.error("Failed to save EPPO from search:",S),alert("Speichern fehlgeschlagen")}}if(d==="select-bbch"){const p=u.dataset.code||"",m=u.dataset.label||"",y=u.dataset.principal,f=u.dataset.secondary,x=y?parseInt(y,10):void 0,S=f?parseInt(f,10):void 0;if(!p||!m){console.warn("BBCH selection missing code or label");return}r&&(r.innerHTML=""),n&&(n.value="");const A=Be.find(z=>z.code===p);if(A){const z=e.querySelector(`[data-bbch-id="${A.id}"]`);z&&(z.classList.add("flash-highlight"),setTimeout(()=>z.classList.remove("flash-highlight"),800));return}try{await qn({code:p,label:m,principalStage:Number.isNaN(x)?void 0:x,secondaryStage:Number.isNaN(S)?void 0:S,isFavorite:!1});const z=Ke();await Re(z),await at(),nt(e)}catch(z){console.error("Failed to save BBCH from search:",z),alert("Speichern fehlgeschlagen")}}if(d==="toggle-favorite-eppo"){const p=u.dataset.id;if(!p)return;const m=Ce.find(y=>y.id===p);if(!m)return;try{await Fn({id:m.id,code:m.code,name:m.name,language:m.language,dtcode:m.dtcode,isFavorite:!m.isFavorite});const y=Ke();await Re(y),await at(),nt(e)}catch(y){console.error("Failed to toggle EPPO favorite:",y)}}if(d==="toggle-favorite-bbch"){const p=u.dataset.id;if(!p)return;const m=Be.find(y=>y.id===p);if(!m)return;try{await qn({id:m.id,code:m.code,label:m.label,principalStage:m.principalStage,secondaryStage:m.secondaryStage,isFavorite:!m.isFavorite});const y=Ke();await Re(y),await at(),nt(e)}catch(y){console.error("Failed to toggle BBCH favorite:",y)}}if(d==="delete-eppo"){const p=u.dataset.id;if(!p||!confirm("EPPO-Code wirklich löschen?"))return;try{await bo({id:p});const m=Ke();await Re(m),await at(),nt(e)}catch(m){console.error("Failed to delete EPPO:",m)}}if(d==="delete-bbch"){const p=u.dataset.id;if(!p||!confirm("BBCH-Stadium wirklich löschen?"))return;try{await ho({id:p});const m=Ke();await Re(m),await at(),nt(e)}catch(m){console.error("Failed to delete BBCH:",m)}}}));const i=e.querySelector('[data-form="add-eppo"]');i&&i.addEventListener("submit",async l=>{l.preventDefault();const c=e.querySelector('[data-input="eppo-code"]'),u=e.querySelector('[data-input="eppo-name"]'),d=e.querySelector('[data-input="eppo-favorite"]'),p=c?.value.trim(),m=u?.value.trim();if(!p||!m){alert("Bitte Code und Name eingeben");return}try{await Fn({code:p,name:m,isFavorite:d?.checked||!1});const y=Ke();await Re(y),await at(),nt(e),c&&(c.value=""),u&&(u.value=""),d&&(d.checked=!1)}catch(y){console.error("Failed to save EPPO:",y),alert("Speichern fehlgeschlagen")}});const o=e.querySelector('[data-form="add-bbch"]');o&&o.addEventListener("submit",async l=>{l.preventDefault();const c=e.querySelector('[data-input="bbch-code"]'),u=e.querySelector('[data-input="bbch-label"]'),d=e.querySelector('[data-input="bbch-favorite"]'),p=c?.value.trim(),m=u?.value.trim();if(!p||!m){alert("Bitte Code und Bezeichnung eingeben");return}try{await qn({code:p,label:m,isFavorite:d?.checked||!1});const y=Ke();await Re(y),await at(),nt(e),c&&(c.value=""),u&&(u.value=""),d&&(d.checked=!1)}catch(y){console.error("Failed to save BBCH:",y),alert("Speichern fehlgeschlagen")}})}function qc(e,t,a={}){if(!e||ur)return;Xa=e,ur=!0,Xa.innerHTML=`
    <div class="section-inner codes-manager">
      <h4 class="mb-3"><i class="bi bi-tags me-2"></i>EPPO & BBCH Codes</h4>
      ${Nc()}
    </div>`;const n=Xa.querySelector(".codes-manager");if(!n)return;Fc(n);const r=async()=>{await at(),nt(n)};t?.events?.subscribe?.("database:connected",()=>{r()}),t?.state?.getState?.().app?.hasDatabase&&r()}function Tc(){ur=!1,Xa=null}let Ni=!1,it=null,ga=null,en=null,ba=null,Dt=null,mn=null,st=null,Aa=null,fn=null,ot=null,fr=null,rt=null,Ee=new Set,bt=null,Wn=!1,jn=!1,jt=!1;const Ue=e=>Te(e.mediums),tn=25,Gn=new Intl.NumberFormat("de-DE");let Pe=0,_t=null,gr=null,br=null,Fr=null;function Hc(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function _c(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`profile-${Date.now()}-${Math.random().toString(16).slice(2,10)}`}function Is(e){if(!Ee.size)return;const t=new Set(Ue(e).map(n=>n.id));let a=!1;Ee.forEach(n=>{t.has(n)||(Ee.delete(n),a=!0)}),a&&(Ee=new Set(Ee))}function gn(){it&&it.querySelectorAll('[data-role="profile-select"]').forEach(e=>{const t=e.dataset.mediumId;e.checked=!!(t&&Ee.has(t))})}function ht(e){const t=Ue(e).length,a=Ee.size;let n="Noch keine Mittel ausgewählt.";t?a===t&&t>0?n=`${a} Mittel ausgewählt (alle).`:a>0&&(n=`${a} Mittel ausgewählt.`):n="Keine Mittel vorhanden.",fr&&(fr.textContent=n),rt&&(rt.disabled=t===0,rt.indeterminate=a>0&&a<t,rt.checked=t>0&&a===t)}function an(e){bt=null,mn&&mn.reset(),Aa&&(Aa.value=""),st&&(st.value=""),ot&&(ot.textContent="Profil speichern"),Ee=new Set,gn(),ht(e)}function Oc(e,t){bt=e.id,Aa&&(Aa.value=e.id),st&&(st.value=e.name,st.focus()),ot&&(ot.textContent="Profil aktualisieren"),Ee=new Set(e.mediumIds),gn(),ht(t)}function Fi(e,t){if(ot){if(ot.disabled=e,e){ot.textContent=t||"Speichert...";return}ot.textContent=bt?"Profil aktualisieren":"Profil speichern"}}function bn(e,t){if(ga){if(ga.disabled=e,e){ga.textContent=t||"Speichert...";return}ga.textContent="Hinzufügen"}}async function Kc(e,t,a){if(jt)return;const n=t.state.getState(),i=(Ue(n)[e]??null)?.id||null;jt=!0,bn(!0);const o=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediums",c=>{const u=Pa(c),d=u.items.slice();return d.splice(e,1),{...u,items:d,totalCount:Math.min(u.totalCount,d.length),lastUpdatedAt:new Date().toISOString()}}),await hn({silent:!0})&&i&&t.events?.emit?.("mediums:data-changed",{action:"deleted",id:i})}finally{jt=!1,bn(!1),a&&a.isConnected&&(a.disabled=!1,a.textContent=o??"Löschen")}}async function Rc(e,t,a){const n=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediumProfiles",(r=[])=>r.filter(i=>i.id!==e.id)),bt===e.id&&an(t.state.getState()),await hn({successMessage:"Profil gelöscht."})}finally{a&&(a.disabled=!1,a.textContent=n||"Löschen")}}function Wc(e){if(!fn)return;const t=fn,a=e.mediumProfiles||[];if(!a.length){t.innerHTML=`
      <tr>
        <td colspan="3" class="text-center text-muted">Noch keine Profile erstellt.</td>
      </tr>
    `;return}const n=new Map(Ue(e).map(r=>[r.id,r]));t.innerHTML="",a.forEach(r=>{const i=document.createElement("tr"),o=r.mediumIds.map(c=>n.get(c)).filter(Boolean).map(c=>g(c.name)),l=o.length?o.join(", "):'<span class="text-muted">Keine gültigen Mittel</span>';i.innerHTML=`
      <td>${g(r.name)}</td>
      <td>${l}</td>
      <td>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-sm btn-outline-info" data-action="profile-edit" data-id="${g(r.id)}">Bearbeiten</button>
          <button class="btn btn-sm btn-outline-danger" data-action="profile-delete" data-id="${g(r.id)}">Löschen</button>
        </div>
      </td>
    `,t.appendChild(i)})}function jc(e,t){if(Wn||!e.mediumProfiles?.length)return;const a=new Set(Ue(e).map(i=>i.id));let n=!1;const r=e.mediumProfiles.map(i=>{const o=i.mediumIds.filter(l=>a.has(l));return o.length!==i.mediumIds.length?(n=!0,{...i,mediumIds:o,updatedAt:new Date().toISOString()}):i}).filter(i=>i.mediumIds.length?!0:(n=!0,!1));n&&(Wn=!0,t.state.updateSlice("mediumProfiles",()=>r),Wn=!1)}function Cs(e){if(!e)return Pe=0,{start:0,end:0,total:0};const t=Math.max(Math.ceil(e/tn),1);Pe>=t&&(Pe=t-1),Pe<0&&(Pe=0);const a=Pe*tn,n=Math.min(a+tn,e);return{start:a,end:n,total:e}}function Gc(){if(!br)return null;const e=br.querySelector('[data-role="mediums-pager"]');return e?((!_t||gr!==e)&&(_t?.destroy(),_t=Ma(e,{onPrev:()=>Uc(),onNext:()=>Vc(),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Mittel...",empty:"Keine Mittel verfügbar"}}),gr=e),_t):null}function qi(e){const t=Gc();if(!t)return;const a=Ue(e).length;if(!a){Pe=0,t.update({status:"disabled",info:"Noch keine Mittel gespeichert."});return}const{start:n,end:r}=Cs(a),i=`Mittel ${Gn.format(n+1)}–${Gn.format(r)} von ${Gn.format(a)}`;t.update({status:"ready",info:i,canPrev:Pe>0,canNext:r<a})}function Uc(){if(Pe===0)return;const e=Fr?.state.getState();e&&(Pe=Math.max(Pe-1,0),qr(e))}function Vc(){const e=Fr?.state.getState();if(!e)return;const t=Ue(e).length;if(!t)return;const a=Math.max(Math.ceil(t/tn)-1,0);Pe>=a||(Pe=Math.min(Pe+1,a),qr(e))}function qr(e){if(!it)return;Is(e);const t=new Map(e.measurementMethods.map(o=>[o.id,o])),a=Ue(e).length;if(!a){it.innerHTML=`
      <tr>
        <td colspan="9" class="text-center text-muted">Noch keine Mittel gespeichert.</td>
      </tr>
    `,ht(e),qi(e);return}const{start:n,end:r}=Cs(a),i=Ue(e).slice(n,r);it.innerHTML="",i.forEach((o,l)=>{const c=n+l,u=document.createElement("tr"),d=t.get(o.methodId),p=o.approval||o.zulassungsnummer,m=typeof p=="string"&&p.trim().length?g(p):"-",y=typeof o.wartezeit=="string"&&o.wartezeit.trim().length?g(o.wartezeit):typeof o.wartezeit=="number"?`${o.wartezeit} Tage`:"-",f=typeof o.wirkstoff=="string"&&o.wirkstoff.trim().length?g(o.wirkstoff):"-";u.innerHTML=`
      <td class="text-center">
        <input type="checkbox" class="form-check-input" data-role="profile-select" data-medium-id="${g(o.id)}" ${Ee.has(o.id)?"checked":""} />
      </td>
      <td>${g(o.name)}</td>
      <td>${g(o.unit)}</td>
      <td>${g(d?d.label:o.method||o.methodId||"-")}</td>
      <td>${g(o.value!=null?String(o.value):"")}</td>
      <td>${m}</td>
      <td>${y}</td>
      <td>${f}</td>
      <td>
        <button class="btn btn-sm btn-danger" data-action="delete" data-index="${c}">Löschen</button>
      </td>
    `,it?.appendChild(u)}),ht(e),qi(e)}function Ti(e){if(!ba)return;const t=new Set;ba.innerHTML="",e.measurementMethods.forEach(a=>{const n=(a.label??"").toLowerCase(),r=(a.id??"").toLowerCase();if(n&&!t.has(n)){t.add(n);const i=document.createElement("option");i.value=a.label,ba.appendChild(i)}if(r&&!t.has(r)){t.add(r);const i=document.createElement("option");i.value=a.id,ba.appendChild(i)}})}function Zc(e){const t=e.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t||`method-${Date.now()}-${Math.random().toString(16).slice(2,6)}`}function Qc(e,t){if(!en)return null;const a=en.value.trim();if(!a)return window.alert("Bitte eine Methode angeben."),en.focus(),null;const n=e.measurementMethods.find(l=>l.label?.toLowerCase()===a.toLowerCase()||l.id?.toLowerCase()===a.toLowerCase());if(n)return n.id;const r=Zc(a),i=e.fieldLabels?.calculation?.fields?.quantity?.unit||"Kiste",o={id:r,label:a,type:"factor",unit:i,requires:["areaHa"],config:{sourceField:"areaHa"}};return t.state.updateSlice("measurementMethods",l=>[...l,o]),r}async function hn(e){try{const t=Ke();return await Re(t),e?.silent||window.alert(e?.successMessage??"Änderungen wurden gespeichert."),!0}catch(t){console.error("Fehler beim Speichern",t);const a=t instanceof Error?t.message:"Speichern fehlgeschlagen";return window.alert(a),!1}}function Jc(e,t){const a=!!t.app?.hasDatabase,n=t.app?.activeSection==="settings";e.classList.toggle("d-none",!(a&&n))}function Yc(e,t){if(!e||Ni)return;const a=e;a.innerHTML="";const n=Hc();a.appendChild(n),br=n,Fr=t,Pe=0,_t?.destroy(),_t=null,gr=null,it=n.querySelector("#settings-mediums-table tbody"),en=n.querySelector('input[name="medium-method"]'),ba=n.querySelector("#settings-method-options"),Dt=n.querySelector("#settings-medium-form"),ga=Dt?Dt.querySelector('button[type="submit"]'):null,mn=n.querySelector("#settings-profile-form"),st=n.querySelector("#profile-name"),Aa=n.querySelector('input[name="profile-id"]'),fn=n.querySelector("#settings-profile-table tbody"),ot=n.querySelector('[data-role="profile-submit"]'),fr=n.querySelector('[data-role="profile-selection-summary"]'),rt=n.querySelector('[data-role="profile-select-all"]');let r=!1,i=!1;function o(d){if(n.querySelectorAll("[data-settings-tab]").forEach(p=>{const m=p.dataset.settingsTab===d;p.classList.toggle("active",m)}),n.querySelectorAll("[data-pane]").forEach(p=>{const m=p.dataset.pane===d;p.style.display=m?"block":"none"}),d==="gps"&&!r){const p=n.querySelector('[data-feature="gps-embedded"]');p&&(Bc(p,t),r=!0)}if(d==="codes"&&!i){const p=n.querySelector('[data-feature="codes-embedded"]');p&&(Tc(),qc(p,{state:t.state,events:{subscribe:t.events?.subscribe}},{}),i=!0)}}n.querySelectorAll("[data-settings-tab]").forEach(d=>{d.addEventListener("click",()=>{const p=d.dataset.settingsTab;p&&o(p)})});async function l(){if(!Dt||jt)return;const d=t.state.getState(),p=new FormData(Dt),m=(p.get("medium-name")||"").toString().trim(),y=(p.get("medium-unit")||"").toString().trim(),f=p.get("medium-value"),x=Number(f),S=(p.get("medium-approval")||"").toString().trim(),A=p.get("medium-wartezeit"),z=A?Number(A):null,j=(p.get("medium-wirkstoff")||"").toString().trim()||null;if(!m||!y||Number.isNaN(x)){window.alert("Bitte alle Felder korrekt ausfüllen.");return}const U=Qc(d,t);if(!U)return;const pe=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`medium-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,B={id:pe,name:m,unit:y,methodId:U,value:x,zulassungsnummer:S||null,wartezeit:z!=null&&!Number.isNaN(z)?z:null,wirkstoff:j};jt=!0,bn(!0,"Speichere...");try{t.state.updateSlice("mediums",M=>{const L=Pa(M),$=[...L.items,B];return{...L,items:$,totalCount:$.length,lastUpdatedAt:new Date().toISOString()}}),Ti(t.state.getState()),await hn({successMessage:"Mittel gespeichert.",silent:!0})&&(Dt.reset(),t.events?.emit?.("mediums:data-changed",{action:"created",id:pe}))}finally{jt=!1,bn(!1)}}Dt?.addEventListener("submit",d=>{d.preventDefault(),l()}),it?.addEventListener("click",d=>{const p=d.target?.closest('[data-action="delete"]');if(!p)return;const m=Number(p.dataset.index);Number.isNaN(m)||Kc(m,t,p)}),it?.addEventListener("change",d=>{const p=d.target;if(!p||p.dataset.role!=="profile-select")return;const m=p.dataset.mediumId;if(!m)return;p.checked?Ee.add(m):Ee.delete(m);const y=t.state.getState();ht(y)}),rt?.addEventListener("change",()=>{const d=t.state.getState();rt&&(rt.indeterminate=!1,rt.checked?Ee=new Set(Ue(d).map(p=>p.id)):Ee=new Set,gn(),ht(d))});const c=async()=>{if(!st)return;const d=st.value.trim();if(!d){window.alert("Bitte einen Profilnamen eingeben."),st.focus();return}if(!Ee.size){window.alert("Bitte mindestens ein Mittel auswählen.");return}const p=t.state.getState();if(p.mediumProfiles?.some(S=>S.name.toLowerCase()===d.toLowerCase()&&S.id!==bt)){window.alert("Ein Profil mit diesem Namen existiert bereits.");return}const y=Ue(p).filter(S=>Ee.has(S.id)).map(S=>S.id);if(!y.length){window.alert("Ausgewählte Mittel sind nicht mehr verfügbar. Bitte Auswahl prüfen."),Is(p),gn(),ht(p);return}if(jn)return;const f=!!bt;jn=!0,Fi(!0,f?"Aktualisiere...":"Speichere...");const x=new Date().toISOString();try{if(bt)t.state.updateSlice("mediumProfiles",(A=[])=>A.map(z=>z.id===bt?{...z,name:d,mediumIds:y,updatedAt:x}:z));else{const A={id:_c(),name:d,mediumIds:y,createdAt:x,updatedAt:x};t.state.updateSlice("mediumProfiles",(z=[])=>[...z,A])}await hn({successMessage:f?"Profil aktualisiert und gespeichert.":"Profil gespeichert."})&&an(t.state.getState())}finally{jn=!1,Fi(!1)}};mn?.addEventListener("submit",d=>{d.preventDefault(),c()}),fn?.addEventListener("click",d=>{const p=d.target?.closest('[data-action^="profile-"]');if(!p)return;const m=p.dataset.id;if(!m)return;const y=t.state.getState();if(p.dataset.action==="profile-edit"){const f=y.mediumProfiles?.find(x=>x.id===m);f&&Oc(f,y);return}if(p.dataset.action==="profile-delete"){const f=y.mediumProfiles?.find(x=>x.id===m);if(!f||!window.confirm(`Profil "${f.name}" wirklich löschen?`))return;Rc(f,t,p)}}),n.querySelector('[data-action="profile-reset"]')?.addEventListener("click",()=>{an(t.state.getState())}),an(t.state.getState());const u=d=>{jc(d,t),Jc(n,d),d.app.activeSection==="settings"&&(qr(d),Ti(d),Wc(d),ht(d))};t.state.subscribe(u),u(t.state.getState()),Ni=!0}const da=e=>g(e),Un=(e,t=1)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function Gt(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function Xc(e){if(!e)return"";const t=new Date(e);if(Number.isNaN(t.getTime()))return g(e);const a=Math.round((t.getTime()-Date.now())/864e5);return a<0?`<span style="color:#ef4444;">${Gt(e)} · abgelaufen</span>`:a<180?`<span style="color:#f59e0b;">${Gt(e)} · ${a} T</span>`:`<span class="calc-hint">${Gt(e)}</span>`}function ed(){return`
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
    </section>`}function td(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=ed();const a=e.querySelector('[data-role="lager-uebersicht"]'),n=e.querySelector('[data-role="lager-bewegungen"]'),r=e.querySelector('[data-role="lager-form"]'),i=e.querySelector("#lager-mittel-options"),o=e.querySelector('[data-role="lager-empty"]'),l=new Map,c=y=>{if(a){if(!y.length){a.innerHTML='<tr><td colspan="6" class="calc-hint" style="padding:14px;">Noch keine Mittel. Erfasse unten einen Zugang oder dokumentiere Anwendungen in „Neu erfassen".</td></tr>';return}a.innerHTML=y.map(f=>{const x=f.bestand<0?"#ef4444":f.bestand===0?"#f59e0b":"inherit",S=g(f.einheit||"");return`<tr>
          <td><span class="fw-semibold">${g(f.name)}</span>${f.kennr?`<span class="d-block calc-hint">${g(f.kennr)}</span>`:""}</td>
          <td class="calc-hint">${g(f.wirkstoff||"")}</td>
          <td class="text-end">${Un(f.verbraucht)} ${S}<span class="d-block calc-hint">${f.anwendungen} Anw.</span></td>
          <td class="text-end fw-semibold" style="color:${x};">${Un(f.bestand)} ${S}</td>
          <td>${Xc(f.zulEnde)}</td>
          <td class="calc-hint">${f.naechsterAblauf?Gt(f.naechsterAblauf):""}</td>
        </tr>`}).join("")}},u=y=>{if(n){if(!y.length){n.innerHTML='<div class="calc-hint">Keine Bewegungen erfasst.</div>';return}n.innerHTML=y.map(f=>`
        <div class="d-flex align-items-center gap-2 py-1" style="border-bottom:1px solid var(--border-1);">
          <span class="badge" style="background:${f.typ==="zugang"?"#16a34a":"#64748b"};">${g(f.typ)}</span>
          <span class="flex-grow-1">${g(f.mittelName)} · <b>${Un(f.menge)} ${g(f.einheit||"")}</b>${f.charge?` · Charge ${g(f.charge)}`:""}<span class="d-block calc-hint">${Gt(f.datum)}${f.lieferant?" · "+g(f.lieferant):""}${f.ablauf?" · Ablauf "+Gt(f.ablauf):""}</span></span>
          <button class="btn btn-sm" style="color:#ef4444;border:1px solid var(--border-1);background:transparent;" data-del="${da(f.id)}" title="Löschen">×</button>
        </div>`).join(""),n.querySelectorAll("[data-del]").forEach(f=>{f.addEventListener("click",async()=>{const x=f.getAttribute("data-del")||"";try{await Eo({id:x}),await je().catch(()=>{}),await p()}catch{q.warning("Löschen fehlgeschlagen.")}})})}},d=()=>{i&&(i.innerHTML=Array.from(l.entries()).sort((y,f)=>y[0].localeCompare(f[0],"de")).map(([y,f])=>`<option value="${da(y)}" data-kennr="${da(f.kennr||"")}" data-einheit="${da(f.einheit||"")}" data-wirkstoff="${da(f.wirkstoff||"")}"></option>`).join(""))},p=async()=>{if(le()!=="sqlite"){o&&(o.textContent="Bitte zuerst eine Datenbank öffnen.");return}try{const[y,f,x]=await Promise.all([ns(),So(),rs()]);c(y?.rows||[]),u(f?.rows||[]),l.clear(),(x?.rows||[]).forEach(S=>{S.name&&l.set(S.name,{kennr:S.kennr??null,einheit:S.einheit??null,wirkstoff:S.wirkstoff??null})}),(y?.rows||[]).forEach(S=>{S.name&&!l.has(S.name)&&l.set(S.name,{kennr:S.kennr??null,einheit:S.einheit??null,wirkstoff:S.wirkstoff??null})}),d()}catch(y){console.warn("[Lager] Laden fehlgeschlagen:",y)}};r?.addEventListener("submit",async y=>{if(y.preventDefault(),le()!=="sqlite"){q.warning("Bitte zuerst eine Datenbank öffnen.");return}const f=new FormData(r),x=String(f.get("mittel")||"").trim(),S=Number(String(f.get("menge")||"").replace(",","."));if(!x||!Number.isFinite(S)){q.warning("Mittel und Menge angeben.");return}const A=String(f.get("preis")||"").trim();try{await ko({mittelName:x,kennr:String(f.get("kennr")||"").trim()||null,wirkstoff:l.get(x)?.wirkstoff||null,typ:String(f.get("typ")||"zugang"),menge:S,einheit:String(f.get("einheit")||"").trim()||null,datum:String(f.get("datum")||"").trim()||null,charge:String(f.get("charge")||"").trim()||null,ablauf:String(f.get("ablauf")||"").trim()||null,lieferant:String(f.get("lieferant")||"").trim()||null,preis:A?Number(A.replace(",",".")):null}),await je().catch(()=>{}),r.reset(),q.success("Bewegung gespeichert."),await p()}catch{q.warning("Speichern fehlgeschlagen.")}});const m=e.querySelector('[name="mittel"]');m?.addEventListener("change",()=>{const y=l.get(m.value);if(!y)return;const f=e.querySelector('[name="einheit"]'),x=e.querySelector('[name="kennr"]');f&&y.einheit&&(f.value=y.einheit),x&&y.kennr&&(x.value=y.kennr)}),t.state.subscribe(y=>{y?.app?.activeSection==="lager"&&p()}),p()}const mt=["#ef4444","#3b82f6","#a855f7","#f59e0b","#06b6d4","#ec4899","#84cc16","#14b8a6"],ad=()=>({bedW:1.2,pathW:.4,rowSp:.5,inRowSp:.4,angle:0}),ue=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";let ee=null,Qe=null,G=null,Vn=!1,$t=[];function Hi(){if(!G)return 1;const e=G.getCenter().lat;return 156543.03392*Math.cos(e*Math.PI/180)/Math.pow(2,G.getZoom())}function nd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=rd();const a=[];let n=null;const r=new Map;let i=null,o=null,l={sat:null,osm:null},c=!0,u=!0;function d(){const s=[];if(a.forEach(w=>{const k=w.latlngs||[];if(k.length<3)return;const O=k.map(ye=>[Number(ye[1]),Number(ye[0])]),H=O[0],te=O[O.length-1];(H[0]!==te[0]||H[1]!==te[1])&&O.push([H[0],H[1]]),s.push({type:"Feature",geometry:{type:"Polygon",coordinates:[O]},properties:{name:w.name||"",kultur:w.kultur||null,eppoCode:w.eppoCode||null,flaeche_m2:Math.round(w.result?.areaM2||0),flaeche_ha:Number(((w.result?.areaM2||0)/1e4).toFixed(4)),beete:w.result?.beds?.length||0,beetmeter_m:Math.round(w.result?.bedMeters||0),pflanzen:w.result?.plants||0,bettbreite_m:w.params?.bedW??null,wegbreite_m:w.params?.pathW??null,reihenabstand_m:w.params?.rowSp??null,pflanzabstand_m:w.params?.inRowSp??null,ausrichtung_grad:w.params?.angle??null}})}),(Te(t.state.getState().gps?.points)||[]).forEach(w=>{const k=Number(w.latitude),O=Number(w.longitude);if(!Number.isFinite(k)||!Number.isFinite(O))return;const H=Number(w.nutzflaecheQm);s.push({type:"Feature",geometry:{type:"Point",coordinates:[O,k]},properties:{name:w.name||"Standort",typ:"standort",flaeche_m2:Number.isFinite(H)&&H>0?Math.round(H):null,kind:w.kind||null}})}),!s.length){q.warning("Keine Flächen oder Standorte zum Exportieren.");return}const h={type:"FeatureCollection",name:"PSM Acker-Planer",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:s};try{const w=new Blob([JSON.stringify(h,null,2)],{type:"application/geo+json"}),k=URL.createObjectURL(w),O=document.createElement("a");O.href=k,O.download="acker-flaechen.geojson",document.body.appendChild(O),O.click(),O.remove(),setTimeout(()=>URL.revokeObjectURL(k),1e3),q.success(`${s.length} Objekt(e) als GeoJSON exportiert.`)}catch(w){console.error("[Acker] GeoJSON-Export fehlgeschlagen",w),q.error("Export fehlgeschlagen.")}}function p(){if(!ee||!i)return;i.clearLayers(),(Te(t.state.getState().gps?.points)||[]).forEach(b=>{const h=Number(b.latitude),w=Number(b.longitude);if(!Number.isFinite(h)||!Number.isFinite(w))return;const k=Number(b.nutzflaecheQm),O=Number.isFinite(k)&&k>0?`${Math.round(k)} m²`:"",H=b.name||"Standort",te=ee.marker([h,w],{icon:ee.divIcon({className:"acker-standort",html:'<span class="acker-standort-dot"></span>',iconSize:[16,16],iconAnchor:[8,8]})});te.bindTooltip(`${g(H)}${O?" · "+O:""}`,{permanent:!0,direction:"top",className:"acker-standort-label",offset:[0,-9]});const ye=[`<b>${g(H)}</b>`,O?`Fläche: ${O}`:"",b.kind?g(String(b.kind)):""].filter(Boolean).join("<br>");te.bindPopup(ye),i.addLayer(te)})}const m=s=>e.querySelector(s),y=m('[data-role="acker-list"]'),f=m('[data-role="acker-empty"]'),x=m('[data-role="acker-totals"]'),S=m('[data-role="acker-map"]'),A=s=>({id:s.id,name:s.name,kultur:s.kultur||null,eppoCode:s.eppoCode||null,standortId:s.standortId||null,color:s.color,latlngs:s.latlngs,areaQm:s.result?.areaM2||0,bedW:s.params.bedW,pathW:s.params.pathW,rowSp:s.params.rowSp,inRowSp:s.params.inRowSp,angle:s.params.angle,beds:s.result?.beds?.length||0,bedMeters:s.result?.bedMeters||0,plants:s.result?.plants||0}),z=(s,b=!1)=>{if(le()!=="sqlite")return;const h=async()=>{try{const w=await Do(A(s));w?.id&&(s.id=w.id),await je().catch(()=>{})}catch(w){console.warn("[Acker] Speichern fehlgeschlagen:",w)}};if(b){h();return}clearTimeout(r.get(s._key)),r.set(s._key,setTimeout(h,600))};function j(s,b){const h=s.map(tt=>[tt[1],tt[0]]);if(h.length<3)return{areaM2:0,beds:[],bedMeters:0,plants:0};const w=h[0],k=h[h.length-1];if((w[0]!==k[0]||w[1]!==k[1])&&h.push(w.slice()),h.length<4)return{areaM2:0,beds:[],bedMeters:0,plants:0};let O;try{O=Qe.polygon([h])}catch{return{areaM2:0,beds:[],bedMeters:0,plants:0}}const H=Qe.area(O),te=b.bedW+b.pathW;if(te<=0||b.bedW<=0||b.rowSp<=0||b.inRowSp<=0)return{areaM2:H,beds:[],bedMeters:0,plants:0};const ye=Qe.centroid(O),$e=Qe.transformRotate(O,-b.angle,{pivot:ye}),Ae=Qe.bbox($e),Lt=1/111320,zn=te*Lt,Rs=b.bedW*Lt,na=(Ae[2]-Ae[0])*.02+1e-4,Hr=[];let _r=0,Or=0,Kr=0;for(let tt=Ae[1];tt<Ae[3]&&Kr<4e3;tt+=zn,Kr++){const Rr=Math.min(tt+Rs,Ae[3]),Ws=Qe.polygon([[[Ae[0]-na,tt],[Ae[2]+na,tt],[Ae[2]+na,Rr],[Ae[0]-na,Rr],[Ae[0]-na,tt]]]);let Ta=null;try{Ta=Qe.intersect($e,Ws)}catch{Ta=null}if(!Ta)continue;let Mn;try{Mn=Qe.transformRotate(Ta,b.angle,{pivot:ye})}catch{continue}const In=Qe.area(Mn);if(In<Math.max(.4,b.bedW*.3))continue;const Cn=In/b.bedW,Bn=Math.max(1,Math.floor(b.bedW/b.rowSp)),Nn=Math.max(0,Math.floor(Cn/b.inRowSp));_r+=Cn,Or+=Bn*Nn,Hr.push({geo:Mn,lenM:Cn,rows:Bn,perRow:Nn,plants:Bn*Nn,areaM2:In})}return{areaM2:H,beds:Hr,bedMeters:_r,plants:Or}}const U=(s,b,h)=>({color:s.color,weight:b?3:2,fillColor:s.color,fillOpacity:h?b?.04:.1:b?.32:.22,dashArray:b?null:h?"5 5":null}),pe=(s,b,h)=>{const w=b%2===0;return h?{color:"#ffffff",weight:.7,opacity:.85,fillColor:s.color,fillOpacity:w?.78:.52}:{color:s.color,weight:0,fillColor:s.color,fillOpacity:w?.5:.32}};function B(s){return!u||s.bedsHidden?!1:(s.params?.bedW||0)/Hi()>=2.2}function X(s){s.outline&&(G.removeLayer(s.outline),s.outline=null),s.bedsLayer&&(G.removeLayer(s.bedsLayer),s.bedsLayer=null),s.label&&o&&(o.removeLayer(s.label),s.label=null),Z(s)}function M(s){const b=!!s.editing;s.outline&&G.removeLayer(s.outline),s.bedsLayer&&(G.removeLayer(s.bedsLayer),s.bedsLayer=null),s.label&&o&&o.removeLayer(s.label),Z(s);const h=s._key===n,w=B(s);s._lastDetail=w,w&&(s.bedsLayer=ee.layerGroup(),(s.result?.beds||[]).forEach((k,O)=>{const H=ee.geoJSON(k.geo,{style:pe(s,O,h),bubblingMouseEvents:!1});H.bindTooltip(`Beet ${O+1} · ${ue(k.lenM,1)} m · ${k.rows}×${ue(k.perRow)} = ${ue(k.plants)} Pfl.`,{sticky:!0}),H.on("click",()=>C(s._key)),H.on("contextmenu",te=>Ft(s,te,O+1)),H.addTo(s.bedsLayer)}),s.bedsLayer.addTo(G)),s.outline=ee.polygon(s.latlngs,{...U(s,h,w),bubblingMouseEvents:!1}).addTo(G),s.outline.on("click",()=>C(s._key)),s.outline.on("dblclick",()=>ut(s)),s.outline.on("contextmenu",k=>Ft(s,k)),L(s,h),(h||b)&&$(s)}function L(s,b){if(!c||!o||!s.outline)return;let h;try{h=s.outline.getBounds().getCenter()}catch{return}const w=s.result?.plants||0,k=`<div class="acker-flabel${b?" sel":""}" style="--fc:${s.color}"><b>${g(s.name||"")}</b><i>${ue(w)} Pfl.</i></div>`;s.label=ee.marker(h,{interactive:!1,keyboard:!1,icon:ee.divIcon({className:"acker-flabel-wrap",html:k,iconSize:[0,0]})}),o.addLayer(s.label)}function $(s){Z(s),s.handles=s.latlngs.map((b,h)=>{const w=ee.marker(b,{draggable:!0,icon:ee.divIcon({className:"acker-vhandle"})}).addTo(G);return w.on("drag",k=>{s.latlngs[h]=[k.target.getLatLng().lat,k.target.getLatLng().lng],s.outline.setLatLngs(s.latlngs)}),w.on("dragend",()=>De(s)),w.on("contextmenu",k=>v(s,h,k)),w}),s.editing=!0}function Z(s){(s.handles||[]).forEach(b=>G.removeLayer(b)),s.handles=[],s.editing=!1}function ae(){a.forEach(s=>M(s))}function ie(){a.forEach(s=>{B(s)!==s._lastDetail&&M(s)})}function me(s,b){s.color=b;try{s.outline?.setStyle({color:b,fillColor:b})}catch{}if(s.bedsLayer)try{s.bedsLayer.eachLayer(w=>w.setStyle&&w.setStyle({fillColor:b}))}catch{}try{const w=s.label?.getElement?.()?.querySelector?.(".acker-flabel");w&&w.style.setProperty("--fc",b)}catch{}const h=y?.querySelector(".acker-field.sel .acker-swatch");h&&(h.style.background=b)}function ut(s){if(s.latlngs?.length)try{G.fitBounds(ee.polygon(s.latlngs).getBounds(),{maxZoom:20,padding:[40,40]})}catch{}}function Le(){const s=a.filter(b=>b.latlngs?.length>=3);if(!s.length){q.info("Keine Flächen vorhanden.");return}try{let b=ee.polygon(s[0].latlngs).getBounds();s.slice(1).forEach(h=>{b=b.extend(ee.polygon(h.latlngs).getBounds())}),G.fitBounds(b,{maxZoom:19,padding:[40,40]})}catch{}}function De(s){s.result=j(s.latlngs,s.params),M(s),I(),z(s)}function Ve(s){if(Ge("app",b=>({...b,activeSection:"kultur"})),s?.id)try{window.dispatchEvent(new CustomEvent("psm:openKultur",{detail:{typ:"acker",id:String(s.id)}}))}catch{}else q.info("Fläche wird gespeichert – in der Kulturführung gleich wählbar.")}let be=null;const pt=()=>{be&&(be.remove(),be=null,document.removeEventListener("pointerdown",Ba,!0),document.removeEventListener("keydown",Na,!0))},Ba=s=>{be&&!be.contains(s.target)&&pt()},Na=s=>{s.key==="Escape"&&pt()};function $n(s,b){b.style.left="",b.style.right="",b.style.top="";const h=s.getBoundingClientRect(),w=b.getBoundingClientRect(),k=w.width||210,O=w.height||260;h.right+3+k>window.innerWidth-8&&(b.style.left="auto",b.style.right="calc(100% + 3px)");let H=-5;h.top+H+O>window.innerHeight-8&&(H=Math.min(-5,window.innerHeight-8-O-h.top)),h.top+H<8&&(H=8-h.top),b.style.top=H+"px"}function Jt(s,b){b.forEach(h=>{if(!h)return;if(h.sep){const k=document.createElement("div");k.className="acker-ctx-sep",s.appendChild(k);return}if(h.type==="swatchGrid"){const k=document.createElement("div");k.className="acker-ctx-swatches",h.colors.forEach(te=>{const ye=document.createElement("button");ye.type="button",ye.className="acker-sw"+(te===h.current?" on":""),ye.style.background=te,ye.title=te,ye.addEventListener("click",$e=>{$e.stopPropagation(),pt(),h.onPick(te)}),k.appendChild(ye)});const O=document.createElement("label");O.className="acker-sw-custom",O.innerHTML=`<i class="bi bi-eyedropper"></i><input type="color" value="${h.current||"#3b82f6"}">`;const H=O.querySelector("input");H.addEventListener("input",te=>(h.onLive||h.onPick)(te.target.value)),H.addEventListener("change",te=>{h.onPick(te.target.value),pt()}),k.appendChild(O),s.appendChild(k);return}const w=document.createElement("button");if(w.type="button",w.className="acker-ctx-item"+(h.danger?" danger":"")+(h.submenu?" has-sub":"")+(h.disabled?" disabled":""),w.innerHTML=`<span class="ic">${h.icon||""}</span><span class="lb">${g(h.label)}</span>`+(h.right?`<span class="rt">${g(h.right)}</span>`:"")+(h.submenu?'<span class="ch"><i class="bi bi-chevron-right"></i></span>':""),h.submenu){const k=document.createElement("div");k.className="acker-ctx-sub",Jt(k,h.submenu),w.appendChild(k),w.addEventListener("pointerenter",()=>$n(w,k))}else h.disabled||w.addEventListener("click",k=>{k.stopPropagation(),h.keepOpen||pt(),h.action?.()});s.appendChild(w)})}function Yt(s,b,h,w){if(pt(),be=document.createElement("div"),be.className="acker-ctx",w){const te=document.createElement("div");te.className="acker-ctx-title",te.textContent=w,be.appendChild(te)}Jt(be,h),document.body.appendChild(be);const k=be.getBoundingClientRect();let O=s,H=b;O+k.width>window.innerWidth-8&&(O=Math.max(8,window.innerWidth-k.width-8)),H+k.height>window.innerHeight-8&&(H=Math.max(8,window.innerHeight-k.height-8)),be.style.left=O+"px",be.style.top=H+"px",setTimeout(()=>{document.addEventListener("pointerdown",Ba,!0),document.addEventListener("keydown",Na,!0)},0)}const Xt=s=>{const b=s.originalEvent||s;return b&&ee.DomEvent.preventDefault?.(b),s.originalEvent&&ee.DomEvent.stop?.(s),{x:b.clientX,y:b.clientY}};function ea(s,b){s.params.angle=(Math.round(s.params.angle+b)%180+180)%180,De(s),q.info(`Beete-Ausrichtung: ${s.params.angle}°`)}function he(s,b){s.color=b,M(s),I(),z(s)}function Et(s,b){s.kultur=b||null,s.eppoCode=$t.find(h=>h.kultur===s.kultur)?.eppoCode||null,M(s),I(),z(s),q.success(b?`Kultur: ${b}`:"Kultur entfernt.")}function Fa(s){s.bedsHidden=!s.bedsHidden,M(s),q.info(s.bedsHidden?"Beete ausgeblendet.":"Beete eingeblendet.")}function An(s){C(s._key),setTimeout(()=>{const b=y?.querySelector(".acker-field.sel .acker-name");b&&(b.focus(),b.select())},30)}function ta(s){const h=Hi()*18/111320,w={_key:"new-"+ ++J,id:null,name:(s.name||"Fläche")+" (Kopie)",kultur:s.kultur,eppoCode:s.eppoCode,standortId:s.standortId,color:mt[(mt.indexOf(s.color)+1)%mt.length],latlngs:s.latlngs.map(k=>[k[0]+h,k[1]+h]),params:{...s.params},outline:null,bedsLayer:null,label:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(w),n=w._key,De(w),z(w,!0),q.success("Fläche dupliziert.")}function Ze(s){const b=s.latlngs||[];if(b.length<3){q.warning("Fläche hat keine Geometrie.");return}const h=b.map(k=>[Number(k[1]),Number(k[0])]);(h[0][0]!==h[h.length-1][0]||h[0][1]!==h[h.length-1][1])&&h.push([h[0][0],h[0][1]]);const w={type:"FeatureCollection",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:[{type:"Feature",geometry:{type:"Polygon",coordinates:[h]},properties:{name:s.name||"",kultur:s.kultur||null,eppoCode:s.eppoCode||null,flaeche_m2:Math.round(s.result?.areaM2||0),beete:s.result?.beds?.length||0,beetmeter_m:Math.round(s.result?.bedMeters||0),pflanzen:s.result?.plants||0}}]};try{const k=new Blob([JSON.stringify(w,null,2)],{type:"application/geo+json"}),O=URL.createObjectURL(k),H=document.createElement("a");H.href=O,H.download=`${(s.name||"flaeche").replace(/[^\w\-]+/g,"_")}.geojson`,document.body.appendChild(H),H.click(),H.remove(),setTimeout(()=>URL.revokeObjectURL(O),1e3),q.success("Fläche als GeoJSON exportiert.")}catch{q.error("Export fehlgeschlagen.")}}async function qa(s){const b=s.result||{},h=[`Fläche: ${s.name||""}`,s.kultur?`Kultur: ${s.kultur}`:"",`Größe: ${ue(b.areaM2||0)} m² (${ue((b.areaM2||0)/1e4,3)} ha)`,`Beete: ${ue(b.beds?.length||0)}`,`Beetmeter: ${ue(b.bedMeters||0)} m`,`Pflanzen: ${ue(b.plants||0)}`].filter(Boolean).join(`
`);try{await navigator.clipboard.writeText(h),q.success("Werte kopiert.")}catch{q.warning("Kopieren nicht möglich.")}}const Pn=s=>({icon:'<i class="bi bi-palette"></i>',label:"Farbe",submenu:[{type:"swatchGrid",colors:mt,current:s.color,onPick:b=>he(s,b),onLive:b=>me(s,b)}]}),aa=s=>({icon:'<i class="bi bi-flower1"></i>',label:"Kultur zuweisen",submenu:[{icon:'<i class="bi bi-x"></i>',label:"– keine –",action:()=>Et(s,null)},...$t.length?[{sep:!0}]:[],...$t.map(b=>({icon:b.kultur===s.kultur?'<i class="bi bi-check2"></i>':"",label:`${b.kultur}${b.anbau?" ("+b.anbau+")":""}`,action:()=>Et(s,b.kultur)}))]});function Ft(s,b,h){C(s._key);const{x:w,y:k}=Xt(b),O=!!s.editing;Yt(w,k,[{icon:'<i class="bi bi-clipboard2-pulse"></i>',label:"Kulturführung öffnen",action:()=>Ve(s)},{icon:'<i class="bi bi-pencil"></i>',label:"Umbenennen",action:()=>An(s)},aa(s),Pn(s),{sep:!0},{icon:'<i class="bi bi-arrow-clockwise"></i>',label:"Beete drehen +15°",keepOpen:!0,action:()=>ea(s,15)},{icon:'<i class="bi bi-arrow-counterclockwise"></i>',label:"Beete drehen −15°",keepOpen:!0,action:()=>ea(s,-15)},{icon:'<i class="bi bi-grid-3x3-gap"></i>',label:s.bedsHidden?"Beete einblenden":"Beete ausblenden",action:()=>Fa(s)},{icon:'<i class="bi bi-bounding-box-circles"></i>',label:O?"Eckpunkte fertig":"Eckpunkte bearbeiten",action:()=>{O?Z(s):$(s)}},{sep:!0},{icon:'<i class="bi bi-copy"></i>',label:"Duplizieren",action:()=>ta(s)},{icon:'<i class="bi bi-zoom-in"></i>',label:"Auf Fläche zoomen",action:()=>ut(s)},{icon:'<i class="bi bi-clipboard-data"></i>',label:"Werte kopieren",action:()=>qa(s)},{icon:'<i class="bi bi-download"></i>',label:"Als GeoJSON exportieren",action:()=>Ze(s)},{sep:!0},{icon:'<i class="bi bi-trash"></i>',label:"Löschen",danger:!0,action:()=>se(s._key)}],h?`${s.name||"Fläche"} · Beet ${h}`:s.name||"Fläche")}function v(s,b,h){const{x:w,y:k}=Xt(h);Yt(w,k,[{icon:'<i class="bi bi-node-minus"></i>',label:"Eckpunkt löschen",disabled:s.latlngs.length<=3,action:()=>{s.latlngs.length<=3||(s.latlngs.splice(b,1),De(s))}},{icon:'<i class="bi bi-check2"></i>',label:"Bearbeiten beenden",action:()=>Z(s)}],`Eckpunkt ${b+1}`)}function E(){!l.sat||!l.osm||(G.hasLayer(l.sat)?(G.removeLayer(l.sat),l.osm.addTo(G),q.info("Karte: OSM")):(G.removeLayer(l.osm),l.sat.addTo(G),q.info("Karte: Satellit")))}function N(s){const b=s.latlng,{x:h,y:w}=Xt(s);Yt(h,w,[{icon:'<i class="bi bi-pencil-square"></i>',label:"Neue Fläche hier zeichnen",action:()=>{de(!0),fe({latlng:b})}},{icon:'<i class="bi bi-crosshair"></i>',label:"Hierhin zentrieren",action:()=>G.panTo(b)},{sep:!0},{icon:'<i class="bi bi-arrows-fullscreen"></i>',label:"Alle Flächen anzeigen",disabled:!a.some(k=>k.latlngs?.length>=3),action:Le},{icon:'<i class="bi bi-layers"></i>',label:"Kartentyp wechseln (Satellit/OSM)",action:E},{sep:!0},{icon:'<i class="bi bi-geo-alt"></i>',label:"Koordinaten kopieren",action:async()=>{try{await navigator.clipboard.writeText(`${b.lat.toFixed(6)}, ${b.lng.toFixed(6)}`),q.success("Koordinaten kopiert.")}catch{q.warning("Kopieren nicht möglich.")}}}],"Karte")}function F(s){return['<option value="">– Kultur –</option>'].concat($t.map(b=>{const h=`${b.kultur}${b.anbau?" ("+b.anbau+")":""}`;return`<option value="${g(b.kultur)}"${b.kultur===s?" selected":""}>${g(h)}</option>`})).join("")}function P(s){const b=Te(t.state.getState().gps?.points)||[];return['<option value="">– Standort –</option>'].concat(b.map(h=>`<option value="${g(h.id)}"${h.id===s?" selected":""}>${g(h.name||"")}</option>`)).join("")}function I(){if(!y||!f||!x)return;f.style.display=a.length?"none":"block",x.style.display=a.length?"block":"none",y.innerHTML="";let s=0,b=0,h=0,w=0;a.forEach(k=>{s+=k.result?.areaM2||0,b+=k.result?.beds?.length||0,h+=k.result?.bedMeters||0,w+=k.result?.plants||0;const O=k._key===n,H=document.createElement("div");H.className="acker-field"+(O?" sel open":""),H.innerHTML=`
        <div class="acker-fhead">
          <span class="acker-swatch" style="background:${k.color}"></span>
          <input class="acker-name" value="${g(k.name)}" />
          <span class="acker-stat">${ue(k.result?.plants||0)} Pfl.</span>
        </div>
        <div class="acker-fbody">
          <div class="acker-grid">
            <label class="acker-fld span2">Kultur<select data-k="kultur">${F(k.kultur)}</select></label>
            <label class="acker-fld span2">Standort (für PSM)<select data-k="standortId">${P(k.standortId)}</select></label>
            <label class="acker-fld">Bettbreite (m)<input data-k="bedW" type="number" step="0.05" min="0.1" value="${k.params.bedW}"/></label>
            <label class="acker-fld">Wegbreite (m)<input data-k="pathW" type="number" step="0.05" min="0" value="${k.params.pathW}"/></label>
            <label class="acker-fld">Reihenabstand (m)<input data-k="rowSp" type="number" step="0.05" min="0.05" value="${k.params.rowSp}"/></label>
            <label class="acker-fld">Pflanzabstand (m)<input data-k="inRowSp" type="number" step="0.05" min="0.05" value="${k.params.inRowSp}"/></label>
            <label class="acker-fld span2">Ausrichtung der Beete: ${k.params.angle}°<input data-k="angle" type="range" min="0" max="180" step="5" value="${k.params.angle}"/></label>
          </div>
          <div class="acker-res">
            <div class="r"><span>Fläche</span><b>${ue(k.result?.areaM2||0)} m² · ${ue((k.result?.areaM2||0)/1e4,3)} ha</b></div>
            <div class="r"><span>Beete</span><b>${ue(k.result?.beds?.length||0)}</b></div>
            <div class="r"><span>Beetmeter</span><b>${ue(k.result?.bedMeters||0)} m</b></div>
            <div class="r"><span>Pflanzen</span><b>${ue(k.result?.plants||0)}</b></div>
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
        </div>`,H.querySelector(".acker-fhead").addEventListener("click",$e=>{$e.target.classList.contains("acker-name")||C(k._key)}),H.querySelector(".acker-name").addEventListener("input",$e=>{k.name=$e.target.value,z(k)}),H.querySelectorAll("[data-k]").forEach($e=>{$e.addEventListener("input",Ae=>{const Lt=$e.dataset.k;if(Lt==="kultur"){k.kultur=Ae.target.value||null,k.eppoCode=$t.find(zn=>zn.kultur===k.kultur)?.eppoCode||null,z(k);return}if(Lt==="standortId"){k.standortId=Ae.target.value||null,z(k);return}Lt==="angle"?k.params.angle=+Ae.target.value:k.params[Lt]=parseFloat(Ae.target.value)||0,De(k)})}),H.querySelector('[data-act="del"]').addEventListener("click",()=>se(k._key)),H.querySelector('[data-act="zoom"]').addEventListener("click",()=>ut(k)),H.querySelector('[data-act="dup"]').addEventListener("click",()=>ta(k)),H.querySelector('[data-act="rot"]').addEventListener("click",()=>ea(k,15));const ye=H.querySelector('[data-act="color"]');ye.addEventListener("input",$e=>me(k,$e.target.value)),ye.addEventListener("change",$e=>he(k,$e.target.value)),y.appendChild(H)}),x.querySelector('[data-t="area"]').textContent=ue(s)+" m² · "+ue(s/1e4,3)+" ha",x.querySelector('[data-t="beds"]').textContent=ue(b),x.querySelector('[data-t="meters"]').textContent=ue(h)+" m",x.querySelector('[data-t="plants"]').textContent=ue(w)}function C(s){n=s,a.forEach(b=>M(b)),I()}async function se(s){const b=a.find(w=>w._key===s);if(!b)return;X(b);const h=a.findIndex(w=>w._key===s);if(h>=0&&a.splice(h,1),n===s&&(n=null),I(),b.id&&le()==="sqlite")try{await Lo({id:b.id}),await je().catch(()=>{})}catch{}}let ne=!1,Q=[],T=null,W=[],J=0;function de(s){ne=s,m('[data-role="acker-banner"]').style.display=s?"block":"none",m('[data-role="acker-draw"]').style.display=s?"none":"block",G.getContainer().style.cursor=s?"crosshair":"",s||(T&&G.removeLayer(T),W.forEach(b=>G.removeLayer(b)),T=null,W=[],Q=[])}function fe(s){ne&&(Q.push([s.latlng.lat,s.latlng.lng]),W.push(ee.circleMarker(s.latlng,{radius:4,color:"#22c55e",fillColor:"#fff",fillOpacity:1,weight:2}).addTo(G)),T?T.setLatLngs(Q):T=ee.polyline(Q,{color:"#22c55e",weight:2,dashArray:"5 5"}).addTo(G))}function Oe(){if(Q.length<3){q.warning("Mindestens 3 Punkte setzen.");return}const s={_key:"new-"+ ++J,id:null,name:"Fläche "+(a.length+1),kultur:null,eppoCode:null,standortId:null,color:mt[a.length%mt.length],latlngs:Q.map(b=>b.slice()),params:ad(),outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(s),de(!1),n=s._key,De(s),z(s,!0)}async function K(){const s=m('[data-role="acker-q"]').value.trim();if(s)try{const h=await(await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+encodeURIComponent(s))).json();h[0]?G.setView([+h[0].lat,+h[0].lon],18):q.info("Nichts gefunden.")}catch{q.warning("Suche nicht verfügbar.")}}async function oe(){if(Vn){setTimeout(()=>G&&G.invalidateSize(),60);return}Vn=!0;try{await vt(()=>Promise.resolve({}),__vite__mapDeps([2]));const w=await vt(()=>import("./leaflet-src.BcflbDBd.js").then(k=>k.l),__vite__mapDeps([3,4]));ee=w.default||w,Qe=await vt(()=>import("./index.CPadEFgJ.js"),__vite__mapDeps([5,4]))}catch(w){console.warn("[Acker] Karten-Bibliotheken konnten nicht geladen werden:",w),f&&(f.textContent="Karte konnte nicht geladen werden (offline?)."),Vn=!1;return}G=ee.map(S,{doubleClickZoom:!1,zoomControl:!0,attributionControl:!0}).setView([47.818,8.976],17);const s=ee.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:21,maxNativeZoom:19,attribution:"Tiles © Esri"}).addTo(G),b=ee.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"});l={sat:s,osm:b},i=ee.layerGroup(),p(),i.addTo(G),o=ee.layerGroup().addTo(G),ee.control.layers({Satellit:s,"Karte (OSM)":b},{"Freiland-Standorte":i},{position:"topright",collapsed:!0}).addTo(G);const h=ee.Control.extend({options:{position:"topleft"},onAdd(){const w=ee.DomUtil.create("div","leaflet-bar acker-toolbar");w.innerHTML='<a href="#" data-tb="fit" title="Alle Flächen anzeigen"><i class="bi bi-arrows-fullscreen"></i></a><a href="#" data-tb="labels" class="on" title="Beschriftungen ein/aus"><i class="bi bi-tag"></i></a><a href="#" data-tb="beds" class="on" title="Beete-Detail ein/aus"><i class="bi bi-grid-3x3"></i></a>',ee.DomEvent.disableClickPropagation(w);const k=(O,H)=>{w.querySelector(O).addEventListener("click",te=>{te.preventDefault(),H()})};return k('[data-tb="fit"]',Le),k('[data-tb="labels"]',()=>{c=!c,w.querySelector('[data-tb="labels"]').classList.toggle("on",c),ae()}),k('[data-tb="beds"]',()=>{u=!u,w.querySelector('[data-tb="beds"]').classList.toggle("on",u),ae()}),w}});G.addControl(new h),G.on("click",fe),G.on("contextmenu",w=>{ne||N(w)}),G.on("zoomend",ie),m('[data-role="acker-draw"]').addEventListener("click",()=>de(!0)),m('[data-role="acker-export"]')?.addEventListener("click",d),m('[data-role="acker-finish"]').addEventListener("click",Oe),m('[data-role="acker-cancel"]').addEventListener("click",()=>de(!1)),m('[data-role="acker-go"]').addEventListener("click",K),m('[data-role="acker-q"]').addEventListener("keydown",w=>{w.key==="Enter"&&K()}),document.addEventListener("keydown",w=>{if(ne){if(w.key==="Backspace"){w.preventDefault(),Q.pop();const k=W.pop();k&&G.removeLayer(k),T&&T.setLatLngs(Q)}w.key==="Enter"&&Oe(),w.key==="Escape"&&de(!1)}}),await Ne(),await ve(),setTimeout(()=>G.invalidateSize(),60)}async function Ne(){if(le()==="sqlite")try{$t=(await yr())?.rows||[]}catch{$t=[]}}async function ve(){if(le()==="sqlite")try{((await wr())?.rows||[]).forEach(h=>{const w={_key:"db-"+h.id,id:h.id,name:h.name,kultur:h.kultur,eppoCode:h.eppoCode,standortId:h.standortId,color:h.color||mt[a.length%mt.length],latlngs:h.latlngs||[],params:{bedW:h.bedW??1.2,pathW:h.pathW??.4,rowSp:h.rowSp??.5,inRowSp:h.inRowSp??.4,angle:h.angle??0},outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};w.result=j(w.latlngs,w.params),a.push(w),M(w)}),I();const b=a.find(h=>h.latlngs?.length);if(b&&G)try{G.fitBounds(ee.polygon(b.latlngs).getBounds(),{maxZoom:19,padding:[30,30]})}catch{}}catch(s){console.warn("[Acker] Flächen laden fehlgeschlagen:",s)}}t.state.subscribe(s=>{s?.app?.activeSection==="acker"&&oe()}),I()}function rd(){return`
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
  </section>`}function ua(e){return e.typ+":"+e.id}function id(e){if(!Array.isArray(e)||e.length<3)return null;let t=0,a=0,n=0;const r=e.length,i=e[r-1],o=e[0],c=i&&o&&Number(i[0])===Number(o[0])&&Number(i[1])===Number(o[1])?r-1:r;for(let u=0;u<c;u++){const d=Number(e[u]?.[0]),p=Number(e[u]?.[1]);Number.isFinite(d)&&Number.isFinite(p)&&(t+=d,a+=p,n++)}return n?{lat:t/n,lon:a/n}:null}async function _i(e){const t=[];(Te(e.state.getState().gps?.points)||[]).forEach(n=>{if(n?.kind!=="gewaechshaus")return;const r=Number(n.latitude),i=Number(n.longitude),o=Number(n.nutzflaecheQm);t.push({typ:"haus",id:String(n.id),name:n.name||"Gewächshaus",areaQm:Number.isFinite(o)&&o>0?o:null,lat:Number.isFinite(r)?r:null,lon:Number.isFinite(i)?i:null,color:null})});try{((await wr())?.rows||[]).forEach(r=>{const i=id(r.latlngs),o=Number(r.areaQm);t.push({typ:"acker",id:String(r.id),name:r.name||"Fläche",areaQm:Number.isFinite(o)&&o>0?o:null,lat:i?.lat??null,lon:i?.lon??null,color:r.color||null})})}catch{}return t}const sd="Wetterdaten: Open-Meteo (CC BY 4.0)",od="psm.weather.";function ld(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function cd(e,t){return od+e.toFixed(3)+"_"+t.toFixed(3)}function dd(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch{return null}}function ud(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function pd(e){return!!e&&e.slice(0,10)===ld()}function md(e,t,a){const n=e?.time||[],r=e?.temperature_2m_max||[],i=e?.temperature_2m_min||[],o=e?.precipitation_sum||[],l=e?.sunshine_duration||[],c=cn(new Date),u=Vr(c.year,c.week),d=new Map;for(let m=0;m<n.length;m++){const y=ts(n[m]);if(!y)continue;const{year:f,week:x}=cn(y),S=Vr(f,x);let A=d.get(S);A||(A={key:S,year:f,week:x,tmaxSum:0,tmaxN:0,tminSum:0,tminN:0,precip:0,precipN:0,sun:0,sunN:0,days:0},d.set(S,A)),Number.isFinite(r[m])&&(A.tmaxSum+=r[m],A.tmaxN++),Number.isFinite(i[m])&&(A.tminSum+=i[m],A.tminN++),Number.isFinite(o[m])&&(A.precip+=o[m],A.precipN++),Number.isFinite(l[m])&&(A.sun+=l[m],A.sunN++),A.days++}const p=[...d.values()].sort((m,y)=>m.key<y.key?-1:m.key>y.key?1:0).map(m=>{const y=m.tmaxN?m.tmaxSum/m.tmaxN:null,f=m.tminN?m.tminSum/m.tminN:null;return{weekKey:m.key,year:m.year,week:m.week,tMaxAvg:y,tMinAvg:f,tMeanAvg:y!=null&&f!=null?(y+f)/2:y,precipSum:m.precipN?m.precip:null,sunHours:m.sunN?m.sun/3600:null,days:m.days,isForecast:m.key>=u}});return{lat:t,lon:a,fetchedAt:new Date().toISOString(),weeks:p}}async function fd(e,t){if(!Number.isFinite(e)||!Number.isFinite(t))return{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const a=cd(e,t),n=dd(a);if(n&&pd(n.fetchedAt)&&n.weeks?.length)return n;if(typeof navigator<"u"&&navigator.onLine===!1)return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const r="https://api.open-meteo.com/v1/forecast?latitude="+e.toFixed(4)+"&longitude="+t.toFixed(4)+"&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunshine_duration&timezone=Europe%2FBerlin&past_days=92&forecast_days=16";try{const i=await fetch(r);if(!i.ok)throw new Error("HTTP "+i.status);const o=await i.json(),l=md(o.daily,e,t);return l.weeks.length&&ud(a,l),l}catch{return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]}}}const vn={mechanisch:{label:"Mechanisch",icon:"bi-tools",color:"#2563eb"},chemisch_psm:{label:"Pflanzenschutz",icon:"bi-droplet-half",color:"#dc2626"},duengung:{label:"Düngung",icon:"bi-flower1",color:"#b45309"},nuetzlinge:{label:"Nützlinge",icon:"bi-bug",color:"#7c3aed"},bewaesserung:{label:"Bewässerung",icon:"bi-moisture",color:"#0891b2"},monitoring:{label:"Monitoring",icon:"bi-eye",color:"#475569"},sonstiges:{label:"Sonstiges",icon:"bi-three-dots",color:"#64748b"}},gd=["mechanisch","chemisch_psm","duengung","nuetzlinge","bewaesserung","monitoring","sonstiges"];function Bs(e){return vn[e]||vn.sonstiges}const bd={geplant:{label:"geplant",color:"#64748b"},aktiv:{label:"aktiv",color:"#16a34a"},abgeschlossen:{label:"abgeschlossen",color:"#94a3b8"}},zt=["#16a34a","#0891b2","#7c3aed","#d97706","#dc2626","#0d9488","#65a30d","#db2777"],hd=/^#[0-9a-fA-F]{3,8}$/;function Ns(e){return typeof e=="string"&&hd.test(e.trim())?e.trim():null}function nn(e,t=0){return Ns(e&&e.color)||zt[t%zt.length]}function Pt(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function we(e){if(!e)return NaN;const t=String(e).slice(0,10).replace(/-/g,""),a=Number(t);return Number.isFinite(a)?a:NaN}function Ua(e){const t=[...e||[]].sort((i,o)=>(we(i.pflanzDatum)||0)-(we(o.pflanzDatum)||0)),a=Number(Pt().replace(/-/g,""));let n=t.find(i=>i.status==="aktiv")||null;if(!n){const i=t.filter(o=>o.status!=="abgeschlossen"&&we(o.pflanzDatum)<=a&&(!o.ernteDatum||we(o.ernteDatum)>=a));n=i.length?i[i.length-1]:null}let r=t.filter(i=>i!==n&&i.status!=="abgeschlossen"&&we(i.pflanzDatum)>a).sort((i,o)=>(we(i.pflanzDatum)||0)-(we(o.pflanzDatum)||0))[0]||null;return r||(r=t.filter(i=>i!==n&&i.status==="geplant").sort((i,o)=>(we(i.pflanzDatum)||0)-(we(o.pflanzDatum)||0))[0]||null),{current:n,next:r,all:t}}const Fs=["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];function qs(e,t){const a=[];let n=e.getFullYear(),r=e.getMonth();const i=t.getFullYear(),o=t.getMonth();let l=0;for(;(n<i||n===i&&r<=o)&&l<60;)a.push({y:n,m:r}),r++,r>11&&(r=0,n++),l++;return a}function Fe(e,t){if(!t||!e.length)return null;const a=new Date(String(t).slice(0,10)+"T00:00:00");if(isNaN(a.getTime()))return null;const n=e.length,r=a.getFullYear()*12+a.getMonth(),i=e[0].y*12+e[0].m,o=e[n-1].y*12+e[n-1].m;if(r<i)return 0;if(r>o)return 1;const l=r-i,c=new Date(a.getFullYear(),a.getMonth()+1,0).getDate();return(l+(a.getDate()-1)/c)/n}const Zn=66;function vd(e,t){const{units:a,anbau:n,mass:r,onSelect:i,onContext:o}=t;if(!a||!a.length){e.innerHTML='<div class="km-empty"><i class="bi bi-calendar3"></i><p>Noch keine Flächen für den Anbauplan.</p></div>';return}const l=new Date;let c=new Date(l.getFullYear(),l.getMonth()-1,1),u=new Date(l.getFullYear(),l.getMonth()+4,1);const d=B=>{if(!B)return;const X=new Date(String(B).slice(0,10)+"T00:00:00");isNaN(X.getTime())||(X<c&&(c=new Date(X.getFullYear(),X.getMonth(),1)),X>u&&(u=new Date(X.getFullYear(),X.getMonth(),1)))};(n||[]).forEach(B=>{d(B.pflanzDatum),d(B.ernteBis||B.ernteDatum),d(B.ernteVon)}),(r||[]).forEach(B=>d(B.planDatum||B.erledigtDatum));const p=qs(c,u),m=p.length,y=m*Zn,f=B=>B==null?null:(B*100).toFixed(2)+"%",x=Fe(p,l.toISOString()),S=a.filter(B=>B.typ==="haus"),A=a.filter(B=>B.typ==="acker");let z="";p.forEach((B,X)=>{const M=B.y===l.getFullYear()&&B.m===l.getMonth();z+=`<div class="kb2-mo${M?" cur":""}" style="width:${Zn}px">${Fs[B.m]}${B.m===0?" "+String(B.y).slice(2):""}</div>`});const j=B=>{const X=(n||[]).filter($=>$.flaecheTyp===B.typ&&String($.flaecheId)===String(B.id)),M=(r||[]).filter($=>$.flaecheTyp===B.typ&&String($.flaecheId)===String(B.id));let L="";return X.forEach(($,Z)=>{const ae=Fe(p,$.pflanzDatum);let ie=Fe(p,$.ernteBis||$.ernteDatum||$.pflanzDatum);if(ae==null)return;(ie==null||ie<=ae)&&(ie=Math.min(1,ae+.5/m));const me=nn($,Z),ut=$.status==="geplant";L+=`<div class="kb2-bar${ut?" planned":""}" title="${g($.kultur||"Kultur")}" style="left:${f(ae)};width:${((ie-ae)*100).toFixed(2)}%;--cc:${g(me)}"><span>${g($.kultur||"")}</span></div>`;const Le=Fe(p,$.ernteVon),De=Fe(p,$.ernteBis);Le!=null&&De!=null&&De>Le&&(L+=`<div class="kb2-harvest" title="Ernte" style="left:${f(Le)};width:${((De-Le)*100).toFixed(2)}%;--cc:${g(me)}"></div>`)}),M.forEach($=>{const Z=$.status==="erledigt"?$.erledigtDatum||$.planDatum:$.planDatum||$.erledigtDatum,ae=Fe(p,Z);if(ae==null)return;const ie=Bs($.art),me=$.status==="erledigt";L+=`<span class="kb2-mk${me?" done":""}" title="${g(ie.label+($.notes?": "+$.notes:""))}" style="left:${f(ae)};--mc:${ie.color}"></span>`}),x!=null&&(L+=`<div class="kb2-today" style="left:${f(x)}"></div>`),L},U=B=>{const X=B.typ+":"+B.id,M=(n||[]).filter(Z=>Z.flaecheTyp===B.typ&&String(Z.flaecheId)===String(B.id)),L=M.find(Z=>Z.status==="aktiv")||M.find(Z=>Z.status!=="abgeschlossen"),$=L?g(L.kultur||""):"frei";return`<div class="kb2-row" data-ukey="${X}">
      <div class="kb2-label" title="${g(B.name)}"><b>${g(B.name)}</b><small>${$}</small></div>
      <div class="kb2-track" style="width:${y}px">${j(B)}</div>
    </div>`},pe=(B,X)=>X.length?`<div class="kb2-grp"><div class="kb2-grp-l">${g(B)}</div><div class="kb2-grp-t" style="width:${y}px"></div></div>`+X.map(U).join(""):"";e.innerHTML=`
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
      .kb2-track{position:relative;height:38px;border-top:1px solid var(--border-1);background-image:linear-gradient(to right,var(--border-1) 1px,transparent 1px);background-size:${Zn}px 100%}
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
      <div class="kb2-head"><div class="kb2-corner">Fläche</div><div class="kb2-axis">${z}</div></div>
      ${pe("Gewächshäuser",S)}
      ${pe("Freiland",A)}
    </div>
    <div class="kb2-legend">
      <span class="lg"><span class="d" style="background:var(--text-secondary,#475569)"></span>erledigt</span>
      <span class="lg"><span class="d" style="background:var(--surface-1);box-shadow:inset 0 0 0 2px var(--text-secondary,#475569)"></span>geplant</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:#9FE1CB;display:inline-block"></span>Kultur</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:repeating-linear-gradient(45deg,#bbb,#bbb 2px,transparent 2px,transparent 4px);display:inline-block"></span>Ernte-Zeitraum</span>
      <span class="kb2-hint"><i class="bi bi-mouse2"></i> Klick = öffnen · Rechtsklick = planen</span>
    </div>`,e.querySelectorAll(".kb2-row").forEach(B=>{const X=B.dataset.ukey;B.querySelector(".kb2-label")?.addEventListener("click",()=>i&&i(X)),B.addEventListener("contextmenu",M=>{M.preventDefault(),o&&o(X,M.clientX,M.clientY)})})}const yd=[{art:"bewaesserung",label:"Gießen",icon:"bi-droplet"},{art:"mechanisch",label:"Hacken",icon:"bi-tools"},{art:"duengung",label:"Düngen",icon:"bi-flower1"},{art:"nuetzlinge",label:"Nützlinge",icon:"bi-bug"},{art:"chemisch_psm",label:"Pflanzenschutz",icon:"bi-droplet-half"},{art:"monitoring",label:"Kontrolle",icon:"bi-eye"},{art:"sonstiges",label:"Sonstiges",icon:"bi-three-dots"}],wd=["Jan.","Feb.","März","Apr.","Mai","Juni","Juli","Aug.","Sep.","Okt.","Nov.","Dez."];function xd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=kd();let a=[],n=[],r=[],i=[],o=null,l="plan",c=!1,u=!1;const d={};let p=null;const m=v=>e.querySelector(v),y=()=>m('[data-role="list"]'),f=()=>m('[data-role="detail"]'),x=()=>m('[data-role="kpis"]'),S=()=>m('[data-role="board-view"]'),A=()=>m('[data-role="flaechen-view"]'),z=()=>le()==="sqlite",j=()=>{z()&&je().catch(()=>{})},U=(v,E)=>v.filter(N=>N.flaecheTyp===E.typ&&String(N.flaecheId)===String(E.id)),pe=v=>a.find(E=>ua(E)===v)||null,B=(v,E=0)=>Ns(v.color)||zt[E%zt.length];async function X(){if(a=await _i(t),z()){try{n=(await Zr())?.rows||[]}catch{n=[]}try{r=(await Tn())?.rows||[]}catch{r=[]}try{i=(await yr())?.rows||[]}catch{i=[]}if(!u){u=!0;try{const v=await Qr();v?.imported&&(r=(await Tn())?.rows||[],q.info(`${v.imported} Pflanzenschutz-Eintrag(e) übernommen.`),j())}catch{}}}!o&&a.length&&(o=ua(a[0])),$(),L()}async function M(){if(z()){try{n=(await Zr())?.rows||[]}catch{}try{r=(await Tn())?.rows||[]}catch{}}}async function L(){const v=o?pe(o):null;if(!v||v.lat==null||v.lon==null)return;const E=ua(v);if(!d[E]){d[E]={loading:!0,weeks:[]};try{d[E]=await fd(v.lat,v.lon)}catch{d[E]={weeks:[]}}o===E&&Le()}}function $(){ae(),l==="plan"?(A().style.display="none",S().style.display="block",vd(S(),{units:a,anbau:n,mass:r,onSelect:v=>{o=v,Z("flaechen"),L()},onContext:(v,E,N)=>ta(v,E,N)})):(S().style.display="none",A().style.display="grid",me(),Le()),e.querySelectorAll(".km-modebtn").forEach(v=>v.classList.toggle("active",v.dataset.mode===l))}function Z(v){l=v,$()}function ae(){const v=x();if(!v)return;a.filter(P=>P.typ==="haus").length,a.filter(P=>P.typ==="acker").length;let E=0,N=null;a.forEach(P=>{const{current:I,next:C}=Ua(U(n,P));I&&E++,C?.pflanzDatum&&(!N||we(C.pflanzDatum)<we(N.pflanzDatum))&&(N=C)});const F=r.filter(P=>P.status==="geplant").length;v.innerHTML=`
      ${ie(String(a.length),"Flächen")}
      ${ie(String(E),"Kulturen aktiv")}
      ${ie(String(F),"Aufgaben offen")}
      ${ie(N?ra(Ve(N.pflanzDatum)):"–","Nächste Pflanzung")}
      <button class="km-psm" data-role="psm-import" title="Bestehende Pflanzenschutz-Einträge übernehmen"><i class="bi bi-arrow-down-circle"></i><span>PSM übernehmen</span></button>`,v.querySelector('[data-role="psm-import"]')?.addEventListener("click",Yt)}const ie=(v,E)=>`<div class="km-kpi"><div class="km-kpi-v">${v}</div><div class="km-kpi-l">${g(E)}</div></div>`;function me(){const v=y();if(!v)return;if(!a.length){v.innerHTML='<div class="km-empty"><i class="bi bi-geo-alt"></i><p>Noch keine Flächen.<br>Gewächshäuser unter Einstellungen, Freiland im Reiter „Karte".</p></div>';return}const E=a.filter(P=>P.typ==="haus"),N=a.filter(P=>P.typ==="acker"),F=(P,I)=>I.length?`<div class="km-grp">${g(P)}</div>`+I.map(ut).join(""):"";v.innerHTML=F("Gewächshäuser",E)+F("Freiland",N),v.querySelectorAll("[data-ukey]").forEach(P=>{P.addEventListener("click",()=>{o=P.dataset.ukey,me(),Le(),L()}),P.addEventListener("contextmenu",I=>{I.preventDefault(),ta(P.dataset.ukey,I.clientX,I.clientY)})})}function ut(v,E){const N=ua(v),{current:F}=Ua(U(n,v));return`<div class="km-row${N===o?" sel":""}" data-ukey="${N}">
      <span class="km-dot" style="background:${g(F?nn(F):B(v,E))}"></span>
      <div class="km-row-main"><div class="km-row-name">${g(v.name)}</div>
      <div class="km-row-sub">${F?`<span class="crop">${g(F.kultur||"Kultur")}</span>`:'<span class="free">frei</span>'}</div></div>
    </div>`}function Le(){const v=f();if(!v)return;const E=o?pe(o):null;if(!E){v.innerHTML='<div class="km-empty"><i class="bi bi-hand-index"></i><p>Fläche links wählen.</p></div>';return}const N=U(n,E),F=U(r,E),{current:P,next:I}=Ua(N),C=d[ua(E)],se=E.typ==="haus"?"Gewächshaus":"Freiland",ne=E.areaQm?`${Math.round(E.areaQm).toLocaleString("de-DE")} m²`:"";let Q;if(P){const W=P.pflanzDatum?`seit ${be(P.pflanzDatum)} · ${ra(Ve(P.pflanzDatum))}`:"",J=Na(P);Q=`<div class="km-hero active" style="--cc:${g(nn(P))}">
        <div class="km-hero-ic"><i class="bi bi-flower2"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop">${g(P.kultur||"Kultur")}</div><div class="km-hero-sub">${g(W+J)}</div></div>
        <button class="km-hero-edit" data-edit-crop="current" title="Bearbeiten"><i class="bi bi-pencil"></i></button>
      </div>`}else Q=`<div class="km-hero empty">
        <div class="km-hero-ic gray"><i class="bi bi-circle"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop gray">Fläche ist frei</div><div class="km-hero-sub">Noch keine Kultur eingetragen</div></div>
        <button class="km-hero-add" data-edit-crop="current"><i class="bi bi-plus-lg"></i> Kultur setzen</button>
      </div>`;const T=I?`<div class="km-next"><i class="bi bi-arrow-right-short"></i>Danach geplant: <b>${g(I.kultur||"Kultur")}</b> · ab ${ra(Ve(I.pflanzDatum))} <button class="km-next-edit" data-edit-crop="next" title="Bearbeiten"><i class="bi bi-pencil"></i></button></div>`:P?'<button class="km-next-add" data-edit-crop="next"><i class="bi bi-plus"></i> Nächste Kultur planen</button>':"";v.innerHTML=`
      <div class="km-head"><div class="km-head-l"><span class="km-head-name">${g(E.name)}</span><span class="km-head-badge">${se}${ne?" · "+ne:""}</span></div>
        <button class="km-headbtn" data-act="map"><i class="bi bi-map"></i> Auf Karte</button></div>
      ${Q}
      ${T}
      ${$n(N,F)}
      <div class="km-tasks-head"><span>Aufgaben</span><button class="km-addtask" data-act="add-massnahme"><i class="bi bi-plus-lg"></i> Aufgabe</button></div>
      ${De(F)}
      <div class="km-foot">
        <span class="km-weather">${Ba(C)}</span>
        <button class="km-plan" data-act="plan"><i class="bi bi-calendar3"></i> Saison &amp; Plan</button>
      </div>
      <div class="km-attr">${g(sd)}${C?.stale?" · offline":""}</div>`,v.querySelector('[data-act="map"]')?.addEventListener("click",()=>Jt()),v.querySelector('[data-act="plan"]')?.addEventListener("click",()=>Z("plan")),v.querySelector('[data-act="add-massnahme"]')?.addEventListener("click",()=>Ft(E,null,P)),v.querySelectorAll("[data-edit-crop]").forEach(W=>W.addEventListener("click",()=>{const J=W.dataset.editCrop;aa(E,J==="current"?P:I,J,N.length)})),v.querySelectorAll("[data-m-done]").forEach(W=>W.addEventListener("click",J=>{J.stopPropagation(),Xt(W.dataset.mDone)})),v.querySelectorAll("[data-m-del]").forEach(W=>W.addEventListener("click",J=>{J.stopPropagation(),ea(W.dataset.mDel)})),v.querySelectorAll("[data-m-edit]").forEach(W=>W.addEventListener("click",()=>{const J=r.find(de=>de.id===W.dataset.mEdit);Ft(E,J,P)}))}function De(v){const E=v.filter(C=>C.status==="geplant").sort((C,se)=>(we(C.planDatum)||9e15)-(we(se.planDatum)||9e15)),N=v.filter(C=>C.status==="erledigt").sort((C,se)=>(we(se.erledigtDatum)||0)-(we(C.erledigtDatum)||0)).slice(0,6),F=Number(Pt().replace(/-/g,"")),P=(C,se)=>{const ne=Bs(C.art),Q=se?C.erledigtDatum:C.planDatum,T=!se&&Q&&we(Q)<F,W=se?be(Q):pt(Q,T),J=C.notes||ne.label,de=C.historyId?'<span class="km-pill">PSM</span>':"",fe=[];C.notes&&fe.push(g(ne.label)),C.mittel&&fe.push(g(C.mittel)),C.menge!=null&&fe.push(`${C.menge}${C.einheit?" "+g(C.einheit):""}`);const Oe=fe.join(" · ");return`<div class="km-task${se?" done":""}" data-m-edit="${C.id}">
        <span class="km-task-ic" style="--mc:${ne.color}"><i class="bi ${ne.icon}"></i></span>
        <div class="km-task-main"><div class="km-task-title">${g(J)}${de}</div>${Oe?`<div class="km-task-sub">${Oe}</div>`:""}</div>
        <span class="km-task-when${T?" overdue":""}">${W}</span>
        ${se?`<button class="km-tbtn del" data-m-del="${C.id}" title="Löschen"><i class="bi bi-trash"></i></button>`:`<button class="km-check" data-m-done="${C.id}" title="Erledigt"><i class="bi bi-check-lg"></i></button>`}
      </div>`};let I="";return E.length?I+=E.map(C=>P(C,!1)).join(""):I+='<div class="km-tasks-none"><i class="bi bi-check2-circle"></i> Nichts offen</div>',N.length&&(I+='<div class="km-done-h">Erledigt</div>'+N.map(C=>P(C,!0)).join("")),`<div class="km-tasks">${I}</div>`}function Ve(v){const E=new Date(String(v).slice(0,10)+"T00:00:00");return isNaN(E.getTime())?0:cn(E).week}function be(v){const E=new Date(String(v).slice(0,10)+"T00:00:00");return isNaN(E.getTime())?"":`${E.getDate()}. ${wd[E.getMonth()]}`}function pt(v,E){if(!v)return"offen";const N=new Date(String(v).slice(0,10)+"T00:00:00");if(isNaN(N.getTime()))return"offen";const F=new Date;F.setHours(0,0,0,0);const P=Math.round((N.getTime()-F.getTime())/864e5);return P===0?"heute":P===1?"morgen":E?"überfällig":be(v)}function Ba(v){if(!v||!v.weeks?.length)return v?.loading?"Wetter lädt…":"";const{year:E,week:N}=cn(new Date),F=v.weeks.find(C=>C.year===E&&C.week===N)||v.weeks.find(C=>!C.isForecast);if(!F)return"";const P=F.tMaxAvg!=null?Math.round(F.tMaxAvg)+"°":"–",I=F.precipSum!=null?Math.round(F.precipSum)+" mm":"–";return`<i class="bi bi-cloud-sun"></i> Diese Woche: ${P} · ${I} Regen`}function Na(v){const E=v.ernteVon?ra(Ve(v.ernteVon)):null,N=v.ernteBis||v.ernteDatum,F=N?ra(Ve(N)):null;return E&&F?` · Ernte ${E}–${F}`:F?` · Ernte ~${F}`:E?` · Ernte ab ${E}`:""}function $n(v,E){if(!v.length&&!E.length)return"";const N=new Date;let F=new Date(N.getFullYear(),N.getMonth()-1,1),P=new Date(N.getFullYear(),N.getMonth()+4,1);const I=K=>{if(!K)return;const oe=new Date(String(K).slice(0,10)+"T00:00:00");isNaN(oe.getTime())||(oe<F&&(F=new Date(oe.getFullYear(),oe.getMonth(),1)),oe>P&&(P=new Date(oe.getFullYear(),oe.getMonth(),1)))};v.forEach(K=>{I(K.pflanzDatum),I(K.ernteBis||K.ernteDatum),I(K.ernteVon)}),E.forEach(K=>I(K.planDatum||K.erledigtDatum));const C=qs(F,P),se=C.length,ne=`background-size:${(100/se).toFixed(4)}% 100%`,Q=K=>K==null?null:(K*100).toFixed(2)+"%",T=Fe(C,N.toISOString()),W=T!=null?`<div class="ks-today" style="left:${Q(T)}"></div>`:"",J=C.map(K=>`<div class="ks-mo${K.y===N.getFullYear()&&K.m===N.getMonth()?" cur":""}">${Fs[K.m]}</div>`).join("");let de="";v.forEach((K,oe)=>{const Ne=Fe(C,K.pflanzDatum);let ve=Fe(C,K.ernteBis||K.ernteDatum||K.pflanzDatum);if(Ne==null)return;(ve==null||ve<=Ne)&&(ve=Math.min(1,Ne+.5/se));const s=nn(K,oe);de+=`<div class="ks-bar${K.status==="geplant"?" planned":""}" style="left:${Q(Ne)};width:${((ve-Ne)*100).toFixed(2)}%;--cc:${g(s)}"><span>${g(K.kultur||"")}</span></div>`;const b=Fe(C,K.ernteVon),h=Fe(C,K.ernteBis);b!=null&&h!=null&&h>b&&(de+=`<div class="ks-harvest" style="left:${Q(b)};width:${((h-b)*100).toFixed(2)}%"></div>`)});const fe={};E.forEach(K=>{(fe[K.art]=fe[K.art]||[]).push(K)});const Oe=gd.filter(K=>fe[K]).map(K=>{const oe=vn[K],Ne=fe[K].map(ve=>{const s=ve.status==="erledigt"?ve.erledigtDatum||ve.planDatum:ve.planDatum||ve.erledigtDatum,b=Fe(C,s);return b==null?"":`<span class="ks-mk${ve.status==="erledigt"?" done":""}" title="${g(oe.label+(ve.notes?": "+ve.notes:""))}" style="left:${Q(b)};--mc:${oe.color}"></span>`}).join("");return`<div class="ks-row"><div class="ks-rl">${g(oe.label)}</div><div class="ks-track" style="${ne}">${Ne}${W}</div></div>`}).join("");return`<div class="ks-wrap">
      <div class="ks-head"><div class="ks-rl"></div><div class="ks-axis">${J}</div></div>
      <div class="ks-row"><div class="ks-rl">Kultur</div><div class="ks-track" style="${ne}">${de}${W}</div></div>
      ${Oe}
      <div class="ks-legend"><span><span class="ks-d done"></span>erledigt</span><span><span class="ks-d"></span>geplant</span><span style="margin-left:auto"><span class="ks-hbar"></span>Ernte-Zeitraum</span></div>
    </div>`}function Jt(v){Ge("app",E=>({...E,activeSection:"acker"})),q.info("Karte geöffnet.")}async function Yt(){if(!z()){q.warning("Keine Datenbank aktiv.");return}try{const v=await Qr();await M(),$(),v?.imported?(q.success(`${v.imported} übernommen.`),j()):q.info(`Nichts Neues${v?.skipped?` (${v.skipped} nicht zuordenbar)`:""}.`)}catch{q.error("Übernahme fehlgeschlagen.")}}async function Xt(v){const E=r.find(N=>N.id===v);if(E)try{await Yr({...E,status:"erledigt",erledigtDatum:E.erledigtDatum||Pt()}),await M(),$(),j()}catch{q.error("Speichern fehlgeschlagen.")}}async function ea(v){try{await Jr({id:v}),await M(),$(),j()}catch{q.error("Löschen fehlgeschlagen.")}}let he=null;const Et=()=>{he&&(he.remove(),he=null,document.removeEventListener("pointerdown",Fa,!0))},Fa=v=>{he&&!he.contains(v.target)&&Et()};function An(v,E,N,F){if(Et(),he=document.createElement("div"),he.className="km-ctx",F){const I=document.createElement("div");I.className="km-ctx-t",I.textContent=F,he.appendChild(I)}N.forEach(I=>{if(I.sep){const se=document.createElement("div");se.className="km-ctx-sep",he.appendChild(se);return}const C=document.createElement("button");C.className="km-ctx-i",C.innerHTML=`<i class="bi ${I.icon}"></i><span>${g(I.label)}</span>`,C.addEventListener("click",()=>{Et(),I.action?.()}),he.appendChild(C)}),document.body.appendChild(he);const P=he.getBoundingClientRect();he.style.left=Math.max(8,Math.min(v,window.innerWidth-P.width-8))+"px",he.style.top=Math.max(8,Math.min(E,window.innerHeight-P.height-8))+"px",setTimeout(()=>document.addEventListener("pointerdown",Fa,!0),0)}function ta(v,E,N){const F=pe(v);if(!F)return;const P=U(n,F),{current:I}=Ua(P);An(E,N,[{icon:"bi-flower2",label:I?"Kultur bearbeiten":"Kultur setzen",action:()=>aa(F,I,"current",P.length)},{icon:"bi-plus-lg",label:"Nächste Kultur planen",action:()=>aa(F,null,"next",P.length)},{icon:"bi-list-check",label:"Aufgabe planen",action:()=>Ft(F,null,I)},{sep:!0},{icon:"bi-arrow-right-circle",label:"Fläche öffnen",action:()=>{o=v,Z("flaechen"),L()}},{icon:"bi-map",label:"Auf Karte",action:()=>Jt()}],F.name)}function Ze(){p&&(p.remove(),p=null)}function qa(v,E,N,F){Ze();const P=document.createElement("div");return P.className="kmodal-ov",P.innerHTML=`<div class="kmodal" role="dialog" aria-modal="true">
      <div class="kmodal-h"><span>${g(v)}</span><button class="kmodal-x" aria-label="Schließen"><i class="bi bi-x-lg"></i></button></div>
      <div class="kmodal-b">${E}</div>
      <div class="kmodal-f"><button class="btn-cancel" data-k="cancel">Abbrechen</button><button class="btn-save" data-k="save">${g(N)}</button></div></div>`,e.appendChild(P),p=P,P.querySelector(".kmodal-x").addEventListener("click",Ze),P.querySelector('[data-k="cancel"]').addEventListener("click",Ze),P.addEventListener("mousedown",I=>{I.target===P&&Ze()}),P.querySelector('[data-k="save"]').addEventListener("click",()=>{F(P)!==!1&&Ze()}),P.querySelectorAll("[data-more]").forEach(I=>I.addEventListener("click",()=>{const C=P.querySelector("[data-more-box]");C&&(C.hidden=!1,I.style.display="none")})),setTimeout(()=>P.querySelector("input,select,textarea,.km-tile")?.focus?.(),30),P}function Pn(){const v=new Set;return`<datalist id="km-kultur-dl">${i.map(N=>N.kultur).filter(N=>N&&!v.has(N)&&v.add(N)).map(N=>`<option value="${g(N)}"></option>`).join("")}</datalist>`}function aa(v,E,N,F){const P=N==="next"&&!E,I=E||{},C=E?.pflanzDatum?.slice(0,10)||(P?"":Pt()),se=zt.map(T=>`<button type="button" class="km-sw${(I.color||"")===T?" on":""}" data-col="${T}" style="background:${T}"></button>`).join(""),ne=`
      <label class="km-fld big">Was wächst hier?<input list="km-kultur-dl" data-f="kultur" value="${g(I.kultur||"")}" placeholder="z. B. Gurke" autocomplete="off" /></label>${Pn()}
      <div class="km-frow3">
        <label class="km-fld">${P?"Geplante Pflanzung":"Pflanzung"}<input type="date" data-f="pflanz" value="${C}" /></label>
        <label class="km-fld">Ernte von<input type="date" data-f="ernteVon" value="${(I.ernteVon||"").slice(0,10)}" /></label>
        <label class="km-fld">Ernte bis<input type="date" data-f="ernteBis" value="${(I.ernteBis||I.ernteDatum||"").slice(0,10)}" /></label>
      </div>
      <div class="km-hint2"><i class="bi bi-info-circle"></i> Bei Frucht­gemüse (Tomate, Gurke …) wird über den ganzen Zeitraum laufend geerntet.</div>
      <button type="button" class="km-more" data-more><i class="bi bi-sliders"></i> Mehr (Status, Farbe, Notiz)</button>
      <div class="km-more-box" data-more-box hidden>
        <label class="km-fld">Status<select data-f="status">${["aktiv","geplant","abgeschlossen"].map(T=>`<option value="${T}"${(I.status||(P?"geplant":"aktiv"))===T?" selected":""}>${bd[T].label}</option>`).join("")}</select></label>
        <div class="km-fld">Farbe<div class="km-sws">${se}</div></div>
        <label class="km-fld">Notiz<textarea data-f="notes" rows="2" placeholder="optional">${g(I.notes||"")}</textarea></label>
      </div>
      ${E?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Kultur löschen</button>':""}`,Q=qa(E?"Kultur bearbeiten":P?"Nächste Kultur planen":"Kultur eintragen",ne,"Speichern",T=>{const W=b=>T.querySelector(`[data-f="${b}"]`)?.value?.trim()||"",J=W("kultur");if(!J)return q.warning("Bitte eine Kultur angeben."),!1;const de=W("pflanz")||null,fe=W("ernteVon")||null,Oe=W("ernteBis")||null,K=!T.querySelector("[data-more-box]").hidden;let oe=K?W("status"):"";oe||(oe=P||de&&we(de)>Number(Pt().replace(/-/g,""))?"geplant":"aktiv");const ve=T.querySelector(".km-sw.on")?.dataset.col||I.color||zt[F%zt.length],s=i.find(b=>b.kultur===J)?.eppoCode||null;(async()=>{try{await Ao({id:E?.id,flaecheTyp:v.typ,flaecheId:v.id,kultur:J,eppoCode:s,status:oe,pflanzDatum:de,ernteVon:fe,ernteBis:Oe,ernteDatum:null,color:ve,notes:K?W("notes")||null:I.notes||null}),await M(),$(),j()}catch{q.error("Speichern fehlgeschlagen.")}})()});Q.querySelectorAll(".km-sw").forEach(T=>T.addEventListener("click",()=>{Q.querySelectorAll(".km-sw").forEach(W=>W.classList.remove("on")),T.classList.add("on")})),Q.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(E?.id)try{await $o({id:E.id}),await M(),$(),j(),Ze()}catch{q.error("Löschen fehlgeschlagen.")}})}function Ft(v,E,N){const F=E||{art:"bewaesserung",status:"geplant"},P=yd.map(T=>`<button type="button" class="km-tile${(F.art||"bewaesserung")===T.art?" on":""}" data-art="${T.art}" style="--ac:${vn[T.art].color}"><i class="bi ${T.icon}"></i><span>${g(T.label)}</span></button>`).join(""),I=(F.status||"geplant")==="erledigt",C=(I?F.erledigtDatum:F.planDatum)||Pt(),se=`
      <div class="km-tasktiles">${P}</div>
      <div class="km-fld">Wann?<div class="km-when" data-when>
        <button type="button" class="km-chip" data-day="0">Heute</button>
        <button type="button" class="km-chip" data-day="1">Morgen</button>
        <button type="button" class="km-chip" data-day="x">Datum…</button>
        <input type="date" data-f="datum" value="${C.slice(0,10)}" />
      </div></div>
      <div class="km-seg" data-seg>
        <button type="button" class="km-segb${I?"":" on"}" data-status="geplant"><i class="bi bi-clock"></i> Geplant</button>
        <button type="button" class="km-segb${I?" on":""}" data-status="erledigt"><i class="bi bi-check-lg"></i> Erledigt</button>
      </div>
      <button type="button" class="km-more" data-more><i class="bi bi-sliders"></i> Notiz, Menge, Mittel</button>
      <div class="km-more-box" data-more-box hidden>
        <label class="km-fld">Bezeichnung<input data-f="notes" value="${g(F.notes||"")}" placeholder="z. B. Kompostgabe" /></label>
        <div class="km-frow2">
          <label class="km-fld">Menge<input type="number" step="0.1" data-f="menge" value="${F.menge!=null?F.menge:""}" placeholder="optional" /></label>
          <label class="km-fld">Einheit<input data-f="einheit" value="${g(F.einheit||"")}" placeholder="kg/ha, l" /></label>
        </div>
        <label class="km-fld">Mittel<input data-f="mittel" value="${g(F.mittel||"")}" placeholder="optional" /></label>
      </div>
      ${E?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Aufgabe löschen</button>':""}`,ne=qa(E?"Aufgabe bearbeiten":"Aufgabe hinzufügen",se,"Speichern",T=>{const W=T.querySelector(".km-tile.on")?.dataset.art||"bewaesserung",J=T.querySelector(".km-segb.on")?.dataset.status||"geplant",de=T.querySelector('[data-f="datum"]').value||Pt(),fe=!T.querySelector("[data-more-box]").hidden,Oe=oe=>{const Ne=T.querySelector(`[data-f="${oe}"]`)?.value;return Ne?Number(Ne):null},K=oe=>T.querySelector(`[data-f="${oe}"]`)?.value.trim()||null;(async()=>{try{await Yr({id:E?.id,flaecheTyp:v.typ,flaecheId:v.id,anbauId:E?.anbauId||N?.id||null,art:W,status:J,planDatum:J==="geplant"?de:E?.planDatum||null,erledigtDatum:J==="erledigt"?de:null,menge:fe?Oe("menge"):E?.menge??null,einheit:fe?K("einheit"):E?.einheit||null,mittel:fe?K("mittel"):E?.mittel||null,historyId:E?.historyId||null,notes:fe?K("notes"):E?.notes||null}),await M(),$(),j()}catch{q.error("Speichern fehlgeschlagen.")}})()});ne.querySelectorAll(".km-tile").forEach(T=>T.addEventListener("click",()=>{ne.querySelectorAll(".km-tile").forEach(W=>W.classList.remove("on")),T.classList.add("on")})),ne.querySelectorAll(".km-segb").forEach(T=>T.addEventListener("click",()=>{ne.querySelectorAll(".km-segb").forEach(W=>W.classList.remove("on")),T.classList.add("on")}));const Q=ne.querySelector('[data-f="datum"]');ne.querySelectorAll("[data-day]").forEach(T=>T.addEventListener("click",()=>{const W=T.dataset.day;if(W==="x"){Q.style.display="inline-block",Q.showPicker?.();return}const J=new Date;J.setDate(J.getDate()+Number(W)),Q.value=J.toISOString().slice(0,10),Q.style.display="none"})),ne.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(E?.id)try{await Jr({id:E.id}),await M(),$(),j(),Ze()}catch{q.error("Löschen fehlgeschlagen.")}})}e.querySelectorAll(".km-modebtn").forEach(v=>v.addEventListener("click",()=>Z(v.dataset.mode))),document.addEventListener("keydown",v=>{v.key==="Escape"&&(p&&Ze(),Et())}),window.addEventListener("psm:openKultur",v=>{const E=v?.detail;!E?.typ||!E?.id||(o=E.typ+":"+E.id,Z("flaechen"),c&&(me(),Le(),L()))}),t.state.subscribe(v=>{v?.app?.activeSection==="kultur"&&(c?(async()=>(a=await _i(t),$(),L()))():(c=!0,X()))}),ae()}function kd(){return`
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
  </section>`}const Sd=["pflanzenschutz.json","history.json","entries.json"];let Oi=!1,_=null,ct=!1;const Bt=25,Qn=new Intl.NumberFormat("de-DE");let ge=0,Va=null,Ki=null;const Ed=bs({id:"import",label:"Import-Vorschau",budget:{initialLoad:20,maxItems:50}});let hr=null;function Ld(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function Dd(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function $d(e,t){const a=e.querySelector('[data-role="import-log-list"]');if(a){if(!t.length){a.innerHTML='<tr><td colspan="5" class="text-muted small">Noch keine Importe protokolliert.</td></tr>';return}a.innerHTML=t.map(n=>{const r=n.rangeStart||n.rangeEnd?`${ka(n.rangeStart)||n.rangeStart||"?"} – ${ka(n.rangeEnd)||n.rangeEnd||"?"}`:"-",i=[n.source,n.device].filter(Boolean),o=i.length?g(i.join(" · ")):"-";return`
        <tr>
          <td>${g(Dd(n.importedAt))}</td>
          <td>${o}</td>
          <td class="text-end text-success">${n.added}</td>
          <td class="text-end text-muted">${n.skipped}</td>
          <td class="small text-muted">${g(r)}</td>
        </tr>`}).join("")}}async function rn(e){if(le()==="sqlite")try{const t=await Po(50);$d(e,t.items||[])}catch(t){console.warn("Import-Historie konnte nicht geladen werden",t)}}function dt(e,t,a="info"){const n=e.querySelector('[data-role="import-hint"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a} small mt-3`,n.textContent=t}}function Mt(e,t){const a=e.querySelector('[data-role="import-feedback"]');a&&(a.textContent=t)}function xt(e){const t=e.querySelector('[data-action="clear-import"]'),a=e.querySelector('[data-action="focus-import"]'),n=e.querySelector('[data-action="run-import"]'),r=!!_;if(t&&(t.disabled=!r||ct),a&&(a.disabled=!r||ct),n){const i=!!(_?.importableEntries?.length&&_.stats||_?.fotos?.length);n.disabled=!r||!i||ct}}function Ad(e){_=null,qd(e);const t=e.querySelector('[data-role="import-summary-card"]'),a=e.querySelector('[data-role="import-file"]');t&&t.classList.add("d-none"),a&&(a.value=""),Mt(e,""),dt(e,"Bereit für eine neue Importdatei."),xt(e),Ot()}function Ts(e){if(e.dateIso)return e.dateIso;if(e.datum){const t=new Date(e.datum);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.date){const t=new Date(e.date);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.savedAt){const t=new Date(e.savedAt);if(!Number.isNaN(t.getTime()))return t.toISOString()}return null}function yn(e){return e?ka(e)||e.slice(0,10):"-"}function Hs(e){return e.savedAt||(e.savedAt=e.createdAt||e.dateIso||new Date().toISOString()),e}function Ri(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function Pd(e){if(!e||typeof e!="object")return null;const t={...e};if(!Array.isArray(t.items)){const a=e.items;t.items=Array.isArray(a)?[...a]:[]}return Hs(t),t}function _s(e,t){const a=e.map(n=>Ts(n)).filter(n=>!!n).sort();return{startIso:a[0]||t?.filters?.startDate||null,endIso:a[a.length-1]||t?.filters?.endDate||null}}function zd(e){if(!e)return;const t=Ri(e.startIso,"start"),a=Ri(e.endIso,"end");if(!t&&!a)return;const n={};return t&&(n.startDate=t),a&&(n.endDate=a),n}async function Os(e,t){if(le()!=="sqlite"){const l=Te(e.history);return new Set(l.map(c=>wn(c)).filter(c=>!!c))}const n=zd(t);if(!n)return new Set;const r=new Set;let i=1;const o=500;try{for(;;){const l=await is({page:i,pageSize:o,filters:n,sortDirection:"asc"});if(l.items.forEach(c=>{const u=wn(c);u&&r.add(u)}),i*o>=l.totalCount)break;i+=1}}catch(l){return console.warn("Konnte vorhandene Einträge für Duplikatprüfung nicht laden",l),new Set}return r}function wn(e){const t=typeof e.clientUuid=="string"&&e.clientUuid?e.clientUuid:"";if(t)return`uuid:${t}`;const a=e.savedAt||e.dateIso||e.createdAt||e.datum||"",n=e.ersteller||"",r=e.kultur||"",i=e.invekos||e.standort||"";return[a,n,r,i].join("|")}function Md(e,t,a,n){const r=n||_s(e,a),i=r.startIso,o=r.endIso,l=new Set,c=new Set;return t.forEach(u=>{u.ersteller&&l.add(u.ersteller),u.kultur&&c.add(u.kultur)}),{startDateLabel:yn(i),endDateLabel:yn(o),startDateRaw:i,endDateRaw:o,entryCount:e.length,importableCount:t.length,duplicateCount:e.length-t.length,creators:Array.from(l).slice(0,5),crops:Array.from(c).slice(0,5)}}function Id(e,t){const a=e.querySelector('[data-role="import-stats"]');if(!a)return;if(!t){a.innerHTML="";return}const n=t.stats,r=t.metadata?.filters;a.innerHTML=`
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
  `}function Cd(e,t){const a=e.querySelector('[data-role="import-warnings"]');if(!a)return;if(!t||!t.warnings.length){a.innerHTML="";return}const n=t.warnings.map(r=>`<li>${g(r)}</li>`).join("");a.innerHTML=`
    <div class="alert alert-warning">
      <strong>Hinweise:</strong>
      <ul class="mb-0">${n}</ul>
    </div>
  `}function Ks(e){const t=e.entries.length;if(!t)return ge=0,{start:0,end:0,total:0};const a=Math.max(Math.ceil(t/Bt),1);ge>=a&&(ge=a-1),ge<0&&(ge=0);const n=ge*Bt,r=Math.min(n+Bt,t);return{start:n,end:r,total:t}}function Bd(e){const t=e.querySelector('[data-role="import-pager"]');return t?((!Va||Ki!==t)&&(Va?.destroy(),Va=Ma(t,{onPrev:()=>Nd(e),onNext:()=>Fd(e),labels:{prev:"Zurück",next:"Weiter",loading:"Vorschau wird geladen...",empty:"Keine Einträge verfügbar"}}),Ki=t),Va):null}function xa(e,t){const a=Bd(e);if(!a)return;if(!t){ge=0,a.update({status:"hidden"});return}const n=t.entries.length;if(!n){ge=0,a.update({status:"disabled",info:"Keine Einträge vorhanden."});return}const{start:r,end:i}=Ks(t),o=`Einträge ${Qn.format(r+1)}–${Qn.format(i)} von ${Qn.format(n)}`;a.update({status:"ready",info:o,canPrev:ge>0,canNext:i<n})}function Nd(e){!_||ge===0||(ge=Math.max(ge-1,0),Tr(e,_))}function Fd(e){if(!_)return;const t=_.entries.length;if(!t)return;const a=Math.max(Math.ceil(t/Bt)-1,0);ge>=a||(ge=Math.min(ge+1,a),Tr(e,_))}function qd(e){ge=0,e&&xa(e,_)}function Tr(e,t){const a=e.querySelector('[data-role="import-preview-table"]');if(!a){Ot();return}if(!t){a.innerHTML="",xa(e,null),Ot();return}if(!t.entries.length){a.innerHTML='<tr><td colspan="5" class="text-center text-muted">Keine Einträge</td></tr>',xa(e,t),Ot();return}const{start:r,end:i}=Ks(t),l=t.entries.slice(r,i).map(c=>{const u=yn(Ts(c));return`
        <tr>
          <td>${g(u)}</td>
          <td>${g(c.kultur||"-")}</td>
          <td>${g(c.ersteller||"-")}</td>
          <td>${g(c.standort||c.invekos||"-")}</td>
          <td>${g(c.savedAt?yn(c.savedAt):"-")}</td>
        </tr>
      `}).join("");a.innerHTML=l,xa(e,t),Ot()}async function Td(e){const t=Io(e),a=Object.keys(t),n=a.find(u=>Sd.some(d=>u.toLowerCase().endsWith(d)));if(!n)throw new Error("ZIP enthält keine 'pflanzenschutz.json'.");const r=JSON.parse(Jn(t[n])),i=a.find(u=>u.toLowerCase().endsWith("metadata.json")),o=i?JSON.parse(Jn(t[i])):null,l=Array.isArray(r)?r:Array.isArray(r.entries)?r.entries:Array.isArray(r.history)?r.history:[],c=Array.isArray(r?.fotos)?r.fotos:[];for(const u of c){if(u?.data)continue;const d=u?.file?String(u.file):null,p=d?a.find(m=>m===d||m.toLowerCase().endsWith(d.toLowerCase())):null;p&&t[p]&&(u.data=Hd(t[p]),u.mime||(u.mime="image/jpeg"))}return{entries:l,metadata:o,fotos:c}}function Hd(e){let t="";for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode(...e.subarray(n,n+32768));return btoa(t)}async function _d(e){const t=Jn(e),a=JSON.parse(t);if(Array.isArray(a))return{entries:a,metadata:null,fotos:[]};const n=Array.isArray(a.fotos)?a.fotos:[];if(Array.isArray(a.entries))return{entries:a.entries,metadata:a.metadata||null,fotos:n};if(Array.isArray(a.history))return{entries:a.history,metadata:a.metadata||null,fotos:n};if(n.length)return{entries:[],metadata:a.metadata||null,fotos:n};throw new Error("JSON enthält keine Eintragsliste.")}async function Od(e,t){const a=new Uint8Array(await e.arrayBuffer()),n=/\.zip$/i.test(e.name)||e.type==="application/zip",{entries:r,metadata:i,fotos:o}=n?await Td(a):await _d(a),l=Array.isArray(o)?o:[],c=(Array.isArray(r)?r:[]).map(S=>Pd(S)).filter(S=>!!S);if(!c.length&&!l.length)throw new Error("Die Datei enthielt keine verwertbaren Einträge.");const u=_s(c,i),d=await Os(t,u),p=new Set,m=[];let y=0;c.forEach(S=>{const A=wn(S);if(!A){m.push(S);return}if(d.has(A)||p.has(A)){y+=1;return}p.add(A),m.push(S)});const f=Md(c,m,i,u),x=[];return y&&x.push(`${y} Datensätze wurden wegen gleicher Kennung übersprungen.`),(!f.startDateRaw||!f.endDateRaw)&&x.push("Zeitraum konnte nicht eindeutig ermittelt werden."),{filename:e.name,entries:c,importableEntries:m,metadata:i,stats:f,warnings:x,lastImportRefs:[],fotos:l}}function Wi(){if(!_)return"Keine Datei";const e=[];return ct&&e.push("Verarbeitung"),_.warnings.length&&e.push("Warnungen"),_.stats.importableCount<_.stats.entryCount&&e.push("Duplikate entfernt"),e.length?e.join(" · "):void 0}function Kd(){const e=!!_,t=e?Math.max(Math.ceil((_?.entries.length||0)/Bt),1):null,a=e?{items:_?.entries.length??0,totalCount:_?.stats.entryCount??null,cursor:_&&(_.entries.length||0)>Bt?`Seite ${ge+1}${t?` / ${t}`:""}`:null,payloadKb:vs(_?.entries.slice(0,Bt)),lastUpdated:hr,note:Wi()}:{items:0,totalCount:0,cursor:null,payloadKb:0,lastUpdated:hr,note:Wi()};hs(Ed,a)}function Ot(){hr=new Date().toISOString(),Kd()}function vr(e){const t=e.querySelector('[data-role="import-summary-card"]');if(!t)return;if(!_){t.classList.add("d-none"),xa(e,null),xt(e),Ot();return}t.classList.remove("d-none"),ge=0;const a=t.querySelector('[data-role="import-file-name"]'),n=t.querySelector('[data-role="import-summary-subline"]');a&&(a.textContent=_.filename),n&&(n.textContent=`${_.stats.importableCount} von ${_.stats.entryCount} Einträgen importierbar`),Id(e,_),Cd(e,_),Tr(e,_),xt(e)}async function Rd(){const e=le();if(!e||e==="memory"||e==="sqlite")return;const t=Ke();await Re(t)}function ji(e,t){if(!t.length)return[];const a=typeof e.state.updateSlice=="function"?e.state.updateSlice:Ge,n=[];return a("history",r=>{const i=Pa(r),o=i.items.slice(),l=o.length;return t.forEach((c,u)=>{n.push(l+u),o.push(c)}),{...i,items:o,totalCount:o.length,lastUpdatedAt:new Date().toISOString()}}),n}async function Wd(e,t){if(!_){window.alert("Bitte zuerst eine Importdatei laden.");return}const a=_.fotos||[];if(!_.importableEntries.length&&!a.length){window.alert("Alle Einträge wurden bereits importiert oder als Duplikat erkannt.");return}ct=!0,xt(e),Mt(e,"Import läuft ...");const n=t.state.getState(),r={startIso:_.stats.startDateRaw,endIso:_.stats.endDateRaw};let i=new Set;try{i=await Os(n,r)}catch(x){console.warn("Duplikatprüfung vor Import fehlgeschlagen",x)}const o=new Set(i),l=[];let c=0;if(_.importableEntries.forEach(x=>{const S=wn(x);if(S&&o.has(S)){c+=1;return}S&&o.add(S),l.push(x)}),!l.length&&!a.length){Mt(e,"Keine neuen Einträge gefunden."),dt(e,"Alle Datensätze sind bereits importiert worden.","warning"),ct=!1,xt(e);return}const u=le(),d=[],p=[];let m=0,y=0;const f=l.map(x=>Hs({...x}));try{if(u==="sqlite"){const z=[];for(const j of f)try{const U=await Vi(j);if(U?.duplicate){c+=1;continue}U?.id!=null&&(d.push({source:"sqlite",ref:U.id}),z.push(j))}catch(U){console.error("appendHistoryEntry failed",U),p.push(j.savedAt||"Unbekannter Eintrag")}ji(t,z);for(const j of a)try{(await zo(j))?.duplicate?y+=1:m+=1}catch(U){console.error("appendFoto failed",U)}m&&window.dispatchEvent(new CustomEvent("fotos:changed"));try{await je()}catch(j){console.warn("SQLite-Datei konnte nach dem Import nicht gespeichert werden",j)}}else ji(t,f).forEach(j=>{d.push({source:"state",ref:j})}),await Rd();const x=d.length;if(x||m){u==="sqlite"&&x&&t.events?.emit?.("history:data-changed",{type:"created-bulk",count:x});const z=[];x&&z.push(`${x} Einträge`),m&&z.push(`${m} Foto(s)`),Mt(e,`${z.join(" und ")} importiert.${p.length?` ${p.length} Einträge konnten nicht übernommen werden.`:""}`.trim()),_.lastImportRefs=d,_.importableEntries=[],_.stats={..._.stats,importableCount:0},vr(e)}else Mt(e,"Keine neuen Daten importiert.");const S=[];let A="success";if(p.length&&(S.push(`${p.length} Einträge konnten nicht gespeichert werden. Details siehe Konsole.`),A="warning"),c&&(S.push(`${c} Einträge wurden während des Imports als Duplikat übersprungen.`),A="warning"),y&&S.push(`${y} Foto(s) waren bereits vorhanden (übersprungen).`),S.length||S.push("Import abgeschlossen."),dt(e,S.join(" "),A),u==="sqlite"&&(x||c||m||y))try{const z=[];p.length&&z.push(`${p.length} fehlgeschlagen`),m&&z.push(`${m} Fotos`),y&&z.push(`${y} Fotos doppelt`),await Mo({source:_.filename||null,device:_.metadata?.device||_.metadata?.label||null,added:x,skipped:c,rangeStart:_.stats.startDateRaw,rangeEnd:_.stats.endDateRaw,note:z.length?z.join(", "):null}),await je().catch(()=>{}),await rn(e)}catch(z){console.warn("Import-Historie konnte nicht geschrieben werden",z)}}catch(x){console.error("Import fehlgeschlagen",x),Mt(e,"Import fehlgeschlagen. Siehe Konsole für Details."),dt(e,"Import fehlgeschlagen. Bitte erneut versuchen.","danger")}finally{ct=!1,xt(e)}}function jd(e,t,a){if(!e.events?.emit)return;const n=t.metadata?.label||t.metadata?.filters?.label||`Import ${t.filename}`;e.events.emit("documentation:focus-range",{startDate:t.stats.startDateRaw||void 0,endDate:t.stats.endDateRaw||void 0,label:n,reason:"import",entryIds:a,autoSelectFirst:!!a.length})}function Gd(e,t){if(!_){window.alert("Bitte zuerst eine Importdatei laden.");return}if(!_.stats.startDateRaw||!_.stats.endDateRaw){window.alert("Zeitraum konnte nicht bestimmt werden.");return}jd(t,_,_.lastImportRefs),dt(e,"Dokumentation wurde auf den Importzeitraum fokussiert.")}function Ud(e,t){const a=e.querySelector('[data-role="import-file"]');a&&a.addEventListener("change",()=>{const n=a.files?.[0];n&&(ct=!0,dt(e,"Datei wird analysiert ..."),xt(e),Mt(e,""),Od(n,t.state.getState()).then(r=>{_=r,vr(e),dt(e,`${r.importableEntries.length} Einträge bereit zum Import.`)}).catch(r=>{console.error("Importdatei konnte nicht gelesen werden",r),dt(e,r?.message||"Importdatei konnte nicht gelesen werden.","danger"),_=null,vr(e)}).finally(()=>{ct=!1,xt(e)}))}),e.addEventListener("click",n=>{const r=n.target?.closest("[data-action]");if(!r)return;const i=r.dataset.action;if(i){if(i==="clear-import"){Ad(e);return}if(i==="focus-import"){Gd(e,t);return}i==="run-import"&&Wd(e,t)}})}function Vd(e,t){if(!e||Oi)return;const a=e;a.innerHTML="";const n=Ld();a.appendChild(n),Ud(n,t),dt(n,"Wähle eine Datei aus, um den Import zu starten."),rn(n),Xe("database:connected",()=>void rn(n)),Xe("app:sectionChanged",r=>{(r==="daten"||r==="documentation"||r==="import")&&rn(n)}),Oi=!0}const At=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function Zd(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function Tt(e,t,a,n){return`
    <div class="dash-card"${n?` data-goto="${n}" style="cursor:pointer;"`:""}>
      <div class="dash-card-ic"><i class="bi ${e}"></i></div>
      <div class="dash-card-body"><div class="dash-card-value">${a}</div><div class="dash-card-label">${g(t)}</div></div>
    </div>`}function Qd(){return`
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
  </section>`}function Jd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Qd();const a=e.querySelector('[data-role="dash-cards"]'),n=e.querySelector('[data-role="dash-warn"]'),r=e.querySelector('[data-role="dash-recent"]');e.addEventListener("click",o=>{const l=o.target?.closest("[data-goto]");if(!l)return;const c=l.getAttribute("data-goto");c&&t.state.updateSlice("app",u=>({...u,activeSection:c}))});const i=async()=>{if(le()!=="sqlite"){a&&(a.innerHTML='<div class="dash-empty">Bitte zuerst eine Datenbank öffnen.</div>');return}const o=t.state.getState(),l=(Te(o.gps?.points)||[]).length;let c=0,u=0,d=0,p=0,m=[],y=[],f=0;try{c=(await yr())?.rows?.length||0}catch{}try{u=(await rs())?.rows?.length||0}catch{}try{const x=(await wr())?.rows||[];d=x.length,p=x.reduce((S,A)=>S+(A.plants||0),0)}catch{}try{m=(await ns())?.rows||[]}catch{}try{const x=await is({}),S=x?.entries||x?.rows||[];f=x?.totalCount??S.length,y=S.slice(0,6)}catch{}if(a&&(a.innerHTML=[Tt("bi-geo-alt","Standorte",At(l)),Tt("bi-flower1","Kulturen",At(c)),Tt("bi-droplet","Mittel im Sortiment",At(u),"lager"),Tt("bi-journal-check","Anwendungen",At(f),"documentation"),Tt("bi-map","Acker-Flächen",At(d),"acker"),Tt("bi-flower3","Pflanzen (Acker)",At(p),"acker")].join("")),n){const x=[];m.forEach(A=>{A.bestand<=0&&(A.verbraucht>0||A.zugang>0)&&x.push(`<div class="dash-row"><span><i class="bi bi-box-seam me-1" style="color:#ef4444"></i>${g(A.name)}</span><span style="color:#ef4444">Bestand ${At(A.bestand)} ${g(A.einheit||"")}</span></div>`)}),m.forEach(A=>{if(!A.zulEnde)return;const z=Math.round((new Date(A.zulEnde).getTime()-Date.now())/864e5);z<0?x.push(`<div class="dash-row"><span><i class="bi bi-calendar-x me-1" style="color:#ef4444"></i>${g(A.name)}</span><span style="color:#ef4444">Zulassung abgelaufen</span></div>`):z<180&&x.push(`<div class="dash-row"><span><i class="bi bi-calendar-event me-1" style="color:#f59e0b"></i>${g(A.name)}</span><span style="color:#f59e0b">Zulassung endet in ${z} T</span></div>`)});const S=x.length>6?`<div class="dash-row" style="color:var(--color-text-muted)"><span>+ ${x.length-6} weitere</span></div>`:"";n.innerHTML=x.length?x.slice(0,6).join("")+S:'<div class="dash-empty">Alles im grünen Bereich. ✓</div>'}r&&(r.innerHTML=y.length?y.map(x=>{const S=Zd(x.datum||x.dateIso||x.created_at||x.createdAt||null),A=x.kultur||"",z=x.standort||"";return`<div class="dash-row"><span>${g(z)}${A?" · "+g(A):""}</span><span class="dash-empty" style="padding:0">${g(S)}</span></div>`}).join(""):'<div class="dash-empty">Noch keine Anwendungen erfasst.</div>')};t.state.subscribe(o=>{o?.app?.activeSection==="dashboard"&&i()}),i()}function Gi(e){document.querySelectorAll(".content-section").forEach(a=>{a.style.display="none"});const t=document.getElementById(`section-${e}`);t instanceof HTMLElement&&(t.style.display="block")}function Ui(){Co(),Qi();const e={state:{getState:R,updateSlice:Ge,subscribe:on},events:{emit:(S,A)=>{vt(async()=>{const{emit:z}=await import("./index.C9pRG6w5.js").then(j=>j.aR);return{emit:z}},[]).then(({emit:z})=>{z(S,A)})},subscribe:Xe}},t=document.querySelector('[data-region="startup"]'),a=document.querySelector('[data-region="shell"]'),n=document.querySelector('[data-region="main"]'),r=document.querySelector('[data-region="footer"]');dl(t,e);const i=document.querySelector('[data-feature="calculation"]');Bo(i,e);const o=document.querySelector('[data-feature="documentation"]');sc(o,e);const l=document.querySelector('[data-feature="settings"]');Yc(l,e);const c=document.querySelector('[data-feature="lager"]');td(c,e);const u=document.querySelector('[data-feature="acker"]');nd(u,e);const d=document.querySelector('[data-feature="kultur"]');xd(d,e);const p=document.querySelector('[data-feature="fotos"]');No(p,e,{archiveMode:!0});const m=document.querySelector('[data-feature="import-page"]');Vd(m,{state:{getState:R,updateSlice:Ge},events:e.events});const y=document.querySelector('[data-feature="dashboard"]');Jd(y,e);const f=S=>{const A=document.body;A&&(A.classList.toggle("bg-app",S),A.classList.toggle("bg-startup",!S))},x=S=>{const A=!!S.app?.hasDatabase;if(f(A),t instanceof HTMLElement&&t.classList.toggle("d-none",A),a instanceof HTMLElement&&a.classList.toggle("d-none",!A),n instanceof HTMLElement&&n.classList.toggle("d-none",!A),r instanceof HTMLElement&&r.classList.toggle("d-none",!A),A){const z=S.app?.activeSection??"dashboard";Gi(z)}};x(e.state.getState()),on((S,A)=>{S.app?.hasDatabase!==A.app?.hasDatabase&&x(S),S.app?.activeSection!==A.app?.activeSection&&S.app?.hasDatabase&&Gi(S.app.activeSection)}),Xe("app:sectionChanged",()=>{})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ui,{once:!0}):Ui();
