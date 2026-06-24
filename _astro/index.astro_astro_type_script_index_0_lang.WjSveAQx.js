const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/index.C06YDL9W.js","_astro/index.EY2QLDgN.js","_astro/leaflet.C03ySvDx.css","_astro/leaflet-src.BcflbDBd.js","_astro/_commonjsHelpers.Cpj98o6Y.js","_astro/index.CPadEFgJ.js"])))=>i.map(i=>d[i]);
import{M as pe,N as bs,J as Ye,O as fo,P as go,Q as hs,h as St,l as bo,a as vs,s as rt,n as ho,q as ys,p as pi,e as j,r as $n,C as An,u as Xe,_ as $t,R as vo,S as yo,w as b,t as F,m as mi,T as wo,j as on,k as fi,U as xo,V as ko,W as je,X as So,Y as ws,Z as xs,H as ks,G as zn,$ as Eo,a0 as Lo,a1 as Do,a2 as $o,a3 as Ao,a4 as Ua,z as Oa,a5 as zo,x as Po,a6 as Ze,a7 as Qe,a8 as Mo,a9 as Va,aa as Co,ab as Io,D as Bo,ac as Ss,ad as Es,ae as _a,af as No,ag as Fo,ah as To,ai as gi,aj as nr,ak as rr,al as qo,am as Ho,an as Oo,ao as _o,ap as Ro,aq as Ko,ar as Wo,as as Ls,at as jo,au as Ds,av as Go,aw as Or,ax as hr,ay as _r,az as Uo,aA as Vo,aB as Pn,aC as bi,aD as ir,aE as Zo,aF as hi,aG as wa,aH as vi,aI as Qo,aJ as yi,aK as wi,aL as Jo,aM as Yo,aN as Xo,aO as el,aP as vr,v as $s,i as tl,b as al,c as nl}from"./index.EY2QLDgN.js";const yr="__psl_history_seeded",wr=200,xi=["Salat","Apfel","Wein","Tomate","Kartoffel","Hopfen","Raps","Birne"],ki=["Spritzung","Düngung","Pflege","Behandlung"],Si=["LACES","MALDO","VITVI","SOLTU","PRNUS","CUPAR","CYNCR","ALLCE"],Ei=["BBCH 10","BBCH 31","BBCH 41","BBCH 55","BBCH 65","BBCH 71","BBCH 81"],rl=[{mediumId:"seed-water",name:"Wasser",unit:"L",methodId:"perKiste",methodLabel:"pro Kiste",value:.02,zulassungsnummer:"N/A"},{mediumId:"seed-tonikum",name:"Tonikum X",unit:"ml",methodId:"perKiste",methodLabel:"pro Kiste",value:.85,zulassungsnummer:"Z-123456"},{mediumId:"seed-oel",name:"Pflegeöl Y",unit:"ml",methodId:"percentWater",methodLabel:"% vom Wasser",value:.12,zulassungsnummer:"Z-654321"}];function il(e){if(typeof window>"u")return;const a=new URLSearchParams(window.location.search).has("seedHistory");if(!a)return;const n=window;n.__PSL||(n.__PSL={});const r=n.__PSL;r.seedHistoryEntries=(l=wr)=>Li(e,{count:l}),r.resetHistorySeedFlag=()=>localStorage.removeItem(yr),!a&&!localStorage.getItem(yr)&&pe()==="sqlite"&&Li(e,{count:wr,setFlag:!0}).catch(l=>{console.error("History seeding failed",l)})}async function sl(e){if(!e.state.getState().app?.hasDatabase){if(typeof e.state.subscribe!="function")throw new Error("SQLite-Datenbank ist noch nicht initialisiert.");await new Promise((t,a)=>{const n=window.setTimeout(()=>{i(),a(new Error("SQLite-Datenbank wurde nicht rechtzeitig initialisiert."))},1e4),r=e.state.subscribe?.(l=>{l.app?.hasDatabase&&(i(),t())}),i=()=>{window.clearTimeout(n),typeof r=="function"&&r()}})}}async function Li(e,t={}){const a=t.count??wr;if(pe()!=="sqlite")throw new Error("SQLite-Treiber muss aktiv sein, bevor Daten befüllt werden können.");await sl(e);const n=performance.now();let r=0;for(let i=0;i<a;i+=1){const l=ol(i);await bs(l),r+=1}try{await Ye()}catch(i){console.warn("Seed-Daten konnten nicht persistent gespeichert werden",i)}return e.events.emit("history:data-changed",{source:"dev-history-seed"}),t.setFlag&&localStorage.setItem(yr,"1"),{inserted:r,durationMs:performance.now()-n}}function ol(e){const t=new Date;t.setDate(t.getDate()-e);const a=t.toLocaleDateString("de-DE"),n=t.toISOString(),r=20+e%30,i=Number((r*.5).toFixed(2));return{datum:a,dateIso:n,ersteller:`Seeder ${1+e%5}`,standort:`Test-Ort ${String.fromCharCode(65+e%6)}`,kultur:xi[e%xi.length],usageType:ki[e%ki.length],kisten:r,eppoCode:Si[e%Si.length],bbch:Ei[e%Ei.length],gps:`GPS-Notiz ${e}`,gpsCoordinates:{latitude:48+e%10*.01,longitude:11+e%10*.01},gpsPointId:`seed-gps-${e}`,invekos:`INV-${String(1e3+e).padStart(4,"0")}`,uhrzeit:`${String(6+e%12).padStart(2,"0")}:${String(e*7%60).padStart(2,"0")}`,savedAt:n,items:ll(e,r,i)}}function ll(e,t,a){return rl.map((n,r)=>{const i=1+(e+r)%4*.05,l=Number((n.value*i).toFixed(4)),o=Number((l*t).toFixed(2));return{id:`seed-item-${e}-${r}`,name:n.name,unit:n.unit,methodLabel:n.methodLabel,methodId:n.methodId,value:l,total:o,inputs:{kisten:t,waterVolume:a},zulassungsnummer:n.zulassungsnummer,mediumId:n.mediumId}})}let Ot=null,xa=null,Di=!1,$i=!1;async function cl(){if(!("serviceWorker"in navigator))return console.warn("[PWA] Service Workers nicht unterstützt"),null;try{return xa=await navigator.serviceWorker.register("/psm/sw.js",{scope:"/psm/",updateViaCache:"none"}),console.log("[PWA] Service Worker registriert:",xa.scope),xa.addEventListener("updatefound",()=>{const e=xa?.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&(console.log("[PWA] Neues Update verfügbar"),na("pwa:update-available"))})}),navigator.serviceWorker.addEventListener("message",dl),Di||(Di=!0,navigator.serviceWorker.addEventListener("controllerchange",()=>{$i||($i=!0,window.location.reload())})),xa}catch(e){return console.error("[PWA] Service Worker Registrierung fehlgeschlagen:",e),null}}function dl(e){const{type:t,payload:a}=e.data||{};switch(t){case"DB_STATE":na("pwa:db-state",a);break;case"CACHES_CLEARED":na("pwa:caches-cleared");break}}async function Rn(e){if(!navigator.serviceWorker.controller){localStorage.setItem("psm-db-state",JSON.stringify({...e,updatedAt:new Date().toISOString()}));return}navigator.serviceWorker.controller.postMessage({type:"SET_DB_STATE",payload:e})}async function As(){const e=localStorage.getItem("psm-db-state");if(e)try{return JSON.parse(e)}catch{}return navigator.serviceWorker?.controller?new Promise(t=>{const a=n=>{n.data?.type==="DB_STATE"&&(navigator.serviceWorker.removeEventListener("message",a),t(n.data.payload))};navigator.serviceWorker.addEventListener("message",a),navigator.serviceWorker.controller.postMessage({type:"GET_DB_STATE"}),setTimeout(()=>{navigator.serviceWorker.removeEventListener("message",a),t(null)},1e3)}):null}async function ul(){const e=await As();return!!(e?.hasDatabase&&e?.autoStartEnabled)}function pl(){window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),Ot=e,console.log("[PWA] Install Prompt verfügbar"),localStorage.getItem("psm-app-installed")==="true"&&(console.log("[PWA] Widerspruch erkannt: Flag sagt installiert, aber Prompt verfügbar"),localStorage.removeItem("psm-app-installed"),console.log("[PWA] Veraltetes Installations-Flag entfernt")),na("pwa:install-available")}),window.addEventListener("appinstalled",()=>{Ot=null,Wn(),console.log("[PWA] App installiert - Flag gesetzt"),na("pwa:installed")})}function Kn(){return Ot!==null}function Kt(){return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0}function Rr(){const e=navigator.userAgent.toLowerCase();return e.includes("edg/")?"edge":e.includes("chrome")&&!e.includes("edg")?"chrome":e.includes("firefox")?"firefox":e.includes("safari")&&!e.includes("chrome")?"safari":"other"}function Kr(){return!!(Kt()||localStorage.getItem("psm-app-installed")==="true"||window.matchMedia("(display-mode: fullscreen)").matches||window.matchMedia("(display-mode: minimal-ui)").matches||window.matchMedia("(display-mode: window-controls-overlay)").matches)}async function zs(){if(Kr())return!0;try{if("getInstalledRelatedApps"in navigator){const e=await navigator.getInstalledRelatedApps();if(console.log("[PWA] getInstalledRelatedApps result:",e),e&&e.length>0)return Wn(),!0}}catch(e){console.warn("[PWA] getInstalledRelatedApps API Fehler:",e)}return!1}function Wn(){localStorage.setItem("psm-app-installed","true"),console.log("[PWA] App als installiert markiert")}function ml(){localStorage.removeItem("psm-app-installed"),console.log("[PWA] Installations-Flag entfernt")}function Ps(){const e=Rr(),t=Kt(),a=Kr();return{canInstall:Kn(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function Ms(){const e=Rr(),t=Kt(),a=await zs();return{canInstall:Kn(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function fl(){if(!Ot)return console.warn("[PWA] Kein Install Prompt verfügbar"),!1;try{await Ot.prompt();const{outcome:e}=await Ot.userChoice;return console.log("[PWA] Install Prompt Ergebnis:",e),e==="accepted"&&Wn(),Ot=null,e==="accepted"}catch(e){return console.error("[PWA] Install Prompt fehlgeschlagen:",e),!1}}function gl(e){if(!("launchQueue"in window)){console.log("[PWA] Launch Queue API nicht verfügbar");return}window.launchQueue?.setConsumer(async t=>{if(!t.files?.length){console.log("[PWA] Launch ohne Dateien");return}console.log("[PWA] Datei via Launch Queue empfangen:",t.files.length);for(const a of t.files)try{await e(a),await Rn({hasDatabase:!0,fileHandleName:a.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0});break}catch(n){console.error("[PWA] Fehler beim Öffnen der Datei:",n)}}),console.log("[PWA] File Handling initialisiert")}const Mt="psm-file-handles",Wr="last-database";async function xr(e){try{const t=await jr(),n=t.transaction(Mt,"readwrite").objectStore(Mt);await new Promise((r,i)=>{const l=n.put({key:Wr,handle:e,savedAt:new Date().toISOString()});l.onsuccess=()=>r(),l.onerror=()=>i(l.error)}),t.close(),console.log("[PWA] FileHandle gespeichert"),await Rn({hasDatabase:!0,fileHandleName:e.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}catch(t){console.error("[PWA] FileHandle speichern fehlgeschlagen:",t)}}async function kr(){try{const e=await jr(),a=e.transaction(Mt,"readonly").objectStore(Mt),n=await new Promise((i,l)=>{const o=a.get(Wr);o.onsuccess=()=>i(o.result),o.onerror=()=>l(o.error)});if(e.close(),!n?.handle)return null;const r=n.handle;return typeof r.queryPermission=="function"&&await r.queryPermission({mode:"readwrite"})==="granted"?(console.log("[PWA] FileHandle mit Berechtigung geladen"),n.handle):(console.log("[PWA] FileHandle gefunden, aber Berechtigung erforderlich"),n.handle)}catch(e){return console.error("[PWA] FileHandle laden fehlgeschlagen:",e),null}}async function bl(e){try{const t=e;return typeof t.requestPermission!="function"?(await e.getFile(),!0):await t.requestPermission({mode:"readwrite"})==="granted"}catch{return!1}}async function hl(){try{const e=await jr(),a=e.transaction(Mt,"readwrite").objectStore(Mt);await new Promise((n,r)=>{const i=a.delete(Wr);i.onsuccess=()=>n(),i.onerror=()=>r(i.error)}),e.close(),await Rn({hasDatabase:!1,autoStartEnabled:!1}),console.log("[PWA] FileHandle gelöscht")}catch(e){console.error("[PWA] FileHandle löschen fehlgeschlagen:",e)}}async function jr(){return new Promise((e,t)=>{const a=indexedDB.open("psm-file-handles",1);a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result),a.onupgradeneeded=n=>{const r=n.target.result;r.objectStoreNames.contains(Mt)||r.createObjectStore(Mt,{keyPath:"key"})}})}function na(e,t){window.dispatchEvent(new CustomEvent(e,{detail:t}))}function Cs(){return{serviceWorker:"serviceWorker"in navigator,fileSystemAccess:typeof window.showOpenFilePicker=="function",launchQueue:"launchQueue"in window,indexedDB:"indexedDB"in window,standalone:Kt(),installAvailable:Kn()}}async function vl(e){if(console.log("[PWA] Initialisierung..."),await cl(),pl(),e?.onFileOpened&&gl(e.onFileOpened),e?.onAutoStart&&await ul()){const t=await kr();if(t){const a=t;let n=!1;if(typeof a.queryPermission=="function"&&(n=await a.queryPermission({mode:"readwrite"})==="granted"),n){console.log("[PWA] Auto-Start mit gespeicherter Datei"),e.onFileOpened&&await e.onFileOpened(t);return}console.log("[PWA] Auto-Start: Berechtigung für Datei erforderlich"),na("pwa:permission-required",{handle:t})}}console.log("[PWA] Capabilities:",Cs())}async function yl(){if(console.group("🔧 PWA Debug Status"),console.log("📱 Standalone Mode:",Kt()),console.log("💾 localStorage Flag:",localStorage.getItem("psm-app-installed")),console.log("🔔 Install Prompt verfügbar:",Kn()),console.log("🌐 Browser:",Rr()),console.group("📺 Display Mode Checks"),console.log("standalone:",window.matchMedia("(display-mode: standalone)").matches),console.log("fullscreen:",window.matchMedia("(display-mode: fullscreen)").matches),console.log("minimal-ui:",window.matchMedia("(display-mode: minimal-ui)").matches),console.log("window-controls-overlay:",window.matchMedia("(display-mode: window-controls-overlay)").matches),console.log("browser:",window.matchMedia("(display-mode: browser)").matches),console.groupEnd(),console.group("🔍 getInstalledRelatedApps API"),"getInstalledRelatedApps"in navigator)try{const e=await navigator.getInstalledRelatedApps();console.log("Installierte Apps:",e)}catch(e){console.log("API Fehler:",e)}else console.log("API nicht verfügbar");console.groupEnd(),console.group("📊 Status Vergleich"),console.log("Sync (isProbablyInstalled):",Kr()),console.log("Async (checkIfInstalled):",await zs()),console.log("getInstallStatus():",Ps()),console.log("getInstallStatusAsync():",await Ms()),console.groupEnd(),console.log("💡 Tipp: clearInstalledFlag() zum Zurücksetzen des Flags"),console.groupEnd()}typeof window<"u"&&(window.pwaDebug=yl,window.pwaClearFlag=ml);let ln=!1;function wl(e){const t=r=>{if(ln){ln=!1;return}return r.preventDefault(),r.returnValue="",""};let a=!1;const n=r=>{const i=!!r.app?.hasDatabase;i&&!a?(window.addEventListener("beforeunload",t),a=!0):!i&&a&&(window.removeEventListener("beforeunload",t),a=!1)};n(e.getState()),e.subscribe(n),document.addEventListener("click",r=>{const i=r.target.closest("a");i&&i.target==="_blank"&&(ln=!0,setTimeout(()=>{ln=!1},100))})}function xl(){const e=document.getElementById("app-root");if(!e)throw new Error("app-root Container fehlt");return{startup:e.querySelector('[data-region="startup"]'),shell:e.querySelector('[data-region="shell"]'),main:e.querySelector('[data-region="main"]'),footer:e.querySelector('[data-region="footer"]')}}async function kl(){if(fo()){window.location.replace("/psm/m/");return}xl(),go();const e=hs();e!=="memory"&&St(e),await bo();const t={state:{getState:j,patchState:pi,updateSlice:Xe,subscribe:An},events:{emit:$n,subscribe:rt}};il(t),vs(),wl(t.state),vl({onFileOpened:async a=>{const n=await $t(()=>import("./index.EY2QLDgN.js").then(i=>i.aR),[]),r=await $t(()=>import("./index.EY2QLDgN.js").then(i=>i.aQ),[]);if(r.isSupported()){n.setActiveDriver("sqlite");const i=await a.getFile(),l=await i.arrayBuffer(),o=await r.importFromArrayBuffer(l,i.name);await xr(a);const{applyDatabase:d}=await $t(async()=>{const{applyDatabase:p}=await import("./index.EY2QLDgN.js").then(u=>u.aT);return{applyDatabase:p}},[]);d(o.data),$n("database:connected",{driver:"sqlite",autoStarted:!0})}}}),rt("database:connected",async a=>{await Rn({hasDatabase:!0,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}),rt("database:connected",async a=>{if(pe()==="sqlite")try{await ho(),await ys()}catch(n){console.warn("GPS-Punkte konnten beim Start nicht geladen werden",n)}}),pi({app:{...j().app,ready:!0}})}const Ai="__pflanzenschutz_bootstrapped__",zi=window;function Pi(){kl().catch(e=>{console.error("bootstrap failed",e)})}zi[Ai]||(zi[Ai]=!0,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Pi,{once:!0}):Pi());const Is=[{id:"start",label:"Start",icon:"bi-grid-1x2",sections:[{section:"dashboard",label:"Übersicht",icon:"bi-grid-1x2"}]},{id:"psm",label:"PSM",icon:"bi-flower1",sections:[{section:"calc",label:"Neu erfassen",icon:"bi-pencil-square"},{section:"documentation",label:"Übersicht",icon:"bi-list-ul"},{section:"lager",label:"Lager",icon:"bi-box-seam"},{section:"settings",label:"Einstellungen",icon:"bi-gear"}]},{id:"acker",label:"Acker-Planer",icon:"bi-map",sections:[{section:"acker",label:"Karte",icon:"bi-map"},{section:"kultur",label:"Kulturführung",icon:"bi-clipboard2-pulse"}]},{id:"fotos",label:"Fotos",icon:"bi-camera",sections:[{section:"fotos",label:"Fotos",icon:"bi-camera"}]},{id:"daten",label:"Daten",icon:"bi-database",sections:[{section:"daten",label:"Import",icon:"bi-cloud-upload"}]}],Bs={dashboard:"start",calc:"psm",documentation:"psm",lager:"psm",history:"psm",report:"psm",acker:"acker",kultur:"acker",fotos:"fotos",settings:"psm",gps:"psm",lookup:"psm",import:"daten",daten:"daten"};function Ns(e){return Is.find(t=>t.id===e)}function Sl(e){const t=Bs[e];return t?Ns(t):void 0}function El(){const e=document.getElementById("offline-indicator");if(!e)return;const t=()=>{const a=!navigator.onLine;e.classList.toggle("d-none",!a)};t(),window.addEventListener("online",t),window.addEventListener("offline",t)}function Mi(e){j().app.activeSection!==e&&(Xe("app",t=>({...t,activeSection:e})),$n("app:sectionChanged",e))}function Ci(){El();const e=document.querySelectorAll(".nav-btn[data-area]"),t=document.getElementById("brand-link"),a=document.getElementById("topnav-tabs"),n=document.getElementById("topnav-area-icon"),r=document.getElementById("topnav-area-label"),i={};for(const m of Is)i[m.id]=m.sections[0].section;let l=null;function o(m,k){if(a){if(m.sections.length<=1){a.innerHTML="";return}a.innerHTML=m.sections.map(S=>`
        <button type="button" class="topnav-tab${S.section===k?" active":""}" data-section="${S.section}">
          <i class="bi ${S.icon}"></i><span>${S.label}</span>
        </button>`).join("")}}function d(m){a&&a.querySelectorAll(".topnav-tab").forEach(k=>{k.classList.toggle("active",k.dataset.section===m)})}const p=m=>{const k=Ns(m);!k||!j().app.hasDatabase||Mi(i[m]??k.sections[0].section)};e.forEach(m=>{m.addEventListener("click",()=>{const k=m.dataset.area;k&&p(k)})}),t?.addEventListener("click",m=>{m.preventDefault(),p("start")}),a?.addEventListener("click",m=>{const S=m.target?.closest(".topnav-tab")?.dataset.section;S&&Mi(S)});const u=document.querySelector('.nav-btn[data-action="share-data"]');u?.addEventListener("click",()=>{u.disabled=!0,$t(async()=>{const{shareMobileData:m}=await import("./index.C06YDL9W.js");return{shareMobileData:m}},__vite__mapDeps([0,1])).then(({shareMobileData:m})=>m()).catch(m=>console.error("Teilen fehlgeschlagen",m)).finally(()=>{u.disabled=!1})}),vo(),rt("history:data-changed",m=>{if(!document.body.classList.contains("mobile-mode"))return;const k=m?.type;(k==="created"||k==="created-bulk")&&yo()});const f=m=>{const k=document.getElementById("brand-title"),S=document.getElementById("brand-tagline"),D=document.getElementById("app-version");k&&m.company.name&&(k.textContent=m.company.name),S&&m.company.headline&&(S.textContent=m.company.headline),D&&m.app.version&&(D.textContent=`v${m.app.version}`);const I=m.app.hasDatabase,Q=m.app.activeSection,W=Sl(Q);W&&Bs[Q]===W.id&&(i[W.id]=Q),e.forEach(me=>{me.disabled=!I;const N=I&&W?.id===me.dataset.area;me.classList.toggle("active",!!N)}),W&&(n&&(n.className=`bi ${W.icon} topnav-area-icon`),r&&(r.textContent=W.label),l!==W.id?(o(W,Q),l=W.id):d(Q))};An(f),f(j());let v=!1;const x=document.title||"Pflanzenschutz";window.addEventListener("beforeprint",()=>{v||(v=!0,document.title=" ")}),window.addEventListener("afterprint",()=>{v&&(v=!1,document.title=x)})}function Ll(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ci,{once:!0}):Ci()}Ll();const Dl="https://api.digitale-psm.de",$l="digitale-psm.de";async function Al(e){try{const t=await fetch(`${Dl}/api/v1/${$l}/views/${e}`,{method:"POST",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`API error: ${t.status}`);return(await t.json()).views}catch(t){return console.warn("[ViewCounter] Fehler beim Zählen:",t),null}}function zl(e){return e>=1e6?(e/1e6).toFixed(1).replace(".",",")+"M":e>=1e3?(e/1e3).toFixed(1).replace(".",",")+"K":e.toString()}const Sr="pflanzenschutz-datenbank.json";let Ii=!1;function Pl(e){return e?`${e.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"pflanzenschutz-datenbank"}.json`:Sr}async function ka(e,t){if(!e){await t();return}const a=e.textContent??"";e.disabled=!0,e.dataset.busy="true",e.textContent="Bitte warten...";try{await t()}finally{e.disabled=!1,e.dataset.busy="false",e.textContent=a}}function Bi(e){return b(e)}function Ml(e){const t=document.createElement("section");t.className="section-container d-none",t.innerHTML=`
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
                <input class="form-control" id="wizard-company-name" name="wizard-company-name" required value="${Bi(e.name)}" placeholder="z.B. Gärtnerei Müller" />
              </div>
              <div class="col-md-6">
                <label class="form-label d-block mb-2" for="wizard-company-headline">
                  Überschrift <span class="text-muted small">(optional)</span>
                </label>
                <input class="form-control" id="wizard-company-headline" name="wizard-company-headline" value="${Bi(e.headline)}" placeholder="z.B. Pflanzenschutz-Dokumentation 2025" />
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
  `;const a=t.querySelector("#database-wizard-form");if(!a)throw new Error("Wizard-Formular konnte nicht erzeugt werden");const n=t.querySelector('[data-role="wizard-result"]');if(!n)throw new Error("Wizard-Resultat-Container fehlt");return{section:t,form:a,resultCard:n,preview:t.querySelector('[data-role="wizard-preview"]'),filenameLabel:t.querySelector('[data-role="wizard-filename"]'),saveHint:t.querySelector('[data-role="wizard-save-hint"]'),saveButton:t.querySelector('[data-action="wizard-save"]'),reset(){a.reset(),n.classList.add("d-none");const r=t.querySelector('[data-role="wizard-preview"]');r&&(r.textContent="");const i=t.querySelector('[data-role="wizard-filename"]');i&&(i.textContent="")}}}function Cl(e,t){if(!e||Ii)return;const a=e;let n=null,r=Sr,i="landing";const o=t.state.getState().company,d=document.createElement("section");d.className="section-container";function p(q,L){const $=q;d.innerHTML=`
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
  `}p(!1,Kt());const u=Ml(o);a.innerHTML="",a.appendChild(d),a.appendChild(u.section);const f=typeof window<"u"&&typeof window.showSaveFilePicker=="function";u.saveButton&&(f?u.saveHint&&(u.saveHint.textContent='Der Browser fragt nach einem Speicherort. Die erzeugte Datei kannst du später über "Bestehende Datei verbinden" erneut laden.'):(u.saveButton.disabled=!0,u.saveButton.textContent="Datei speichern (nicht verfügbar)",u.saveHint&&(u.saveHint.textContent="Dieser Browser unterstützt keinen direkten Dateidialog. Bitte nutze einen Chromium-basierten Browser (z. B. Chrome, Edge) über HTTPS oder http://localhost.")));function v(q=t.state.getState()){const L=!!q.app?.hasDatabase;if(a.classList.toggle("d-none",L),L){d.classList.add("d-none"),u.section.classList.add("d-none");return}i==="wizard"?(d.classList.add("d-none"),u.section.classList.remove("d-none")):(d.classList.remove("d-none"),u.section.classList.add("d-none"))}async function x(q){await ka(q,async()=>{try{const L=pe();L==="sqlite"||L==="filesystem"?St(L):St("filesystem")}catch(L){throw F.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),L instanceof Error?L:new Error("Dateisystem nicht verfügbar")}try{const L=await wo();on(L.data);const $=L.context;$?.fileHandle&&await xr($.fileHandle),t.events.emit("database:connected",{driver:pe()})}catch(L){console.error("Fehler beim Öffnen der Datenbank",L),F.error(L instanceof Error?L.message:"Öffnen der Datenbank fehlgeschlagen")}})}function m(q){ka(q,async()=>{const L=mi(),$=["localstorage","sqlite","memory"];for(const ie of $)try{St(ie);const oe=await fi(L);on(oe.data),t.events.emit("database:connected",{driver:pe()||ie});return}catch(oe){console.warn(`Treiber ${ie} konnte nicht initialisiert werden`,oe)}const Y="Keine geeignete Speicheroption verfügbar. Bitte Browserberechtigungen prüfen.";console.error(Y),F.error(Y)})}async function k(q){if(!n){F.warning("Bitte erst die Datenbank erzeugen.");return}await ka(q,async()=>{try{const L=pe();L==="sqlite"||L==="filesystem"?St(L):St("filesystem")}catch(L){throw F.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),L instanceof Error?L:new Error("Dateisystem nicht verfügbar")}try{const L=await fi(n);on(L.data),t.events.emit("database:connected",{driver:pe()})}catch(L){console.error("Fehler beim Speichern der Datenbank",L),F.error(L instanceof Error?L.message:"Die Datei konnte nicht gespeichert werden")}})}function S(q){q.preventDefault();const L=new FormData(u.form),$=(L.get("wizard-company-name")||"").toString().trim();if(!$){F.warning("Bitte einen Firmennamen angeben.");return}const Y=(L.get("wizard-company-headline")||"").toString().trim(),ie=(L.get("wizard-company-address")||"").toString().trim();n=mi({meta:{company:{name:$,headline:Y,logoUrl:"",contactEmail:"",address:ie}}}),r=Pl($),u.preview.textContent=JSON.stringify(n,null,2),u.filenameLabel.textContent=r,u.resultCard.classList.remove("d-none"),u.resultCard.scrollIntoView({behavior:"smooth",block:"start"})}function D(){i="landing",n=null,r=Sr,u.reset(),v()}function I(){i="wizard",v()}async function Q(q){await ka(q,async()=>{try{const L=await kr();if(!L){F.warning("Keine gespeicherte Datei gefunden.");return}if(!await bl(L)){F.warning("Berechtigung zum Zugriff auf die Datei wurde verweigert.");return}St("sqlite");const Y=await L.getFile(),ie=await Y.arrayBuffer(),oe=await xo(ie,Y.name);ko(L),on(oe.data),await xr(L),t.events.emit("database:connected",{driver:"sqlite",autoStarted:!0}),F.success("Datenbank erfolgreich geladen!")}catch(L){console.error("Auto-Start fehlgeschlagen:",L),F.error(L instanceof Error?L.message:"Fehler beim Laden der gespeicherten Datei")}})}async function W(){await hl();const q=d.querySelector("#auto-start-banner");q&&q.classList.add("d-none"),F.info("Gespeicherte Datei wurde vergessen.")}async function me(q){await ka(q,async()=>{if(await fl()){F.success("App wird installiert!");const $=d.querySelector("#pwa-install-banner");$&&$.classList.add("d-none")}})}if(d.addEventListener("click",q=>{const L=q.target?.closest("button[data-action]");if(!L)return;const $=L.dataset.action;if($==="start-wizard"){I();return}$==="open"?x(L):$==="useDefaults"?m(L):$==="auto-start"?Q(L):$==="auto-start-forget"?W():$==="install-pwa"&&me(L)}),u.form.addEventListener("submit",S),u.section.addEventListener("click",q=>{const L=q.target?.closest("[data-action]");if(!L)return;const $=L.dataset.action;if($==="wizard-back"){D();return}$==="wizard-save"&&k(L)}),t.state.subscribe(q=>v(q)),v(t.state.getState()),!t.state.getState().app.hasDatabase){const q=hs();if(q&&q!==pe())try{St(q)}catch(L){console.warn("Bevorzugter Speicher konnte nicht gesetzt werden",L)}}(async()=>{const q=await kr(),L=await As(),$=!!(q&&L?.hasDatabase),Y=Kt();p($,Y);const ie=d.querySelector('[data-role="view-count"]');if(ie&&Al("app").then(ye=>{ye!==null&&(ie.textContent=zl(ye))}),$&&q){const ye=d.querySelector('[data-role="auto-start-filename"]');ye&&(ye.textContent=`Datei: ${q.name}`)}N(),window.addEventListener("pwa:install-available",()=>{N()}),window.addEventListener("pwa:installed",()=>{Wn(),N()}),window.addEventListener("pwa:permission-required",async ye=>{const Re=ye.detail?.handle;if(Re){const Ce=d.querySelector("#auto-start-banner"),It=d.querySelector('[data-role="auto-start-filename"]');Ce&&It&&(It.textContent=`Datei: ${Re.name} (Berechtigung erforderlich)`,Ce.classList.remove("d-none"))}}),console.log("[Startup] PWA Capabilities:",Cs());const oe=await Ms();console.log("[Startup] PWA Install Status (async):",oe),re(oe)})();function N(){const q=Ps();re(q)}function re(q){const L=d.querySelector("#pwa-install-banner"),$=d.querySelector('[data-role="pwa-content"]');if(!(!L||!$)){if(!q.showBanner){L.classList.add("d-none");return}L.classList.remove("d-none"),q.isInstalled?$.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-check-circle text-success me-1"></i>App ist bereits installiert
        </p>
        <p class="small mb-0" style="color: var(--text-muted);">
          Öffne die App über dein Desktop- oder Startmenü-Symbol für die beste Erfahrung.
        </p>
      `:q.canInstall?$.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-download me-1"></i>Für schnelleren Zugriff als App installieren
        </p>
        <button class="btn btn-sm btn-outline-light" data-action="install-pwa">
          <i class="bi bi-download me-1"></i>App installieren
        </button>
      `:L.classList.add("d-none")}}Ii=!0}function Fs(e){let t=!1,a=!1;const n=o=>{e.onStatusChange&&e.onStatusChange(o)},r=()=>{t||!a||j().app.activeSection!==e.section||e.shouldRefresh&&!e.shouldRefresh()||(a=!1,n("refreshing"),Promise.resolve(e.onRefresh()).catch(d=>{console.error("Auto-Refresh konnte nicht ausgeführt werden",d),a=!0,n("stale")}).finally(()=>{!t&&!a&&n("idle")}))},i=rt(e.event,()=>{e.shouldHandleEvent&&!e.shouldHandleEvent()||(a=!0,n("stale"),r())}),l=rt("app:sectionChanged",o=>{o===e.section&&(a?r():n("idle"))});return j().app.activeSection===e.section&&n("idle"),()=>{t=!0,i(),l()}}const Il={prev:"Zurück",next:"Weiter",loading:"Lädt …",empty:"Keine Einträge verfügbar"};function Ni(){const e=document.createElement("span");return e.className="spinner-border spinner-border-sm",e.setAttribute("role","status"),e.setAttribute("aria-hidden","true"),e}function Fi(e){const t=document.createElement("div");return t.className="pager-widget__info text-muted small text-center flex-grow-1",t.textContent=e?.trim()||"",t}function Za(e,t){if(!e)return null;const a=document.createElement("div");a.className="pager-widget d-flex flex-column gap-2",e.innerHTML="",e.appendChild(a);let n={status:"hidden"},r=!1;const i={...Il,...t.labels||{}};function l(){a.replaceChildren()}function o(f){const v=Fi(f.info||i.empty);a.replaceChildren(v)}function d(f){const v=document.createElement("div");v.className="alert alert-danger mb-0",v.textContent=f.message||"Unbekannter Fehler",a.replaceChildren(v)}function p(f){const v=document.createElement("div");v.className="pager-widget__controls d-flex flex-column flex-md-row gap-2 align-items-stretch";const x=document.createElement("button");x.type="button",x.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",x.disabled=!f.canPrev||f.loadingDirection==="prev",x.textContent=i.prev,f.loadingDirection==="prev"&&x.prepend(Ni()),x.addEventListener("click",()=>{x.disabled||t.onPrev()});const m=document.createElement("button");m.type="button",m.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",m.disabled=!f.canNext||f.loadingDirection==="next",m.textContent=i.next,f.loadingDirection==="next"&&m.append(Ni()),m.addEventListener("click",()=>{m.disabled||t.onNext()});const k=Fi(f.info||(f.canPrev||f.canNext?i.loading:i.empty));v.append(x,k,m),a.replaceChildren(v)}function u(f){switch(f.status){case"hidden":l();break;case"disabled":o(f);break;case"error":d(f);break;case"ready":p(f);break;default:l();break}}return{update(f){r||(n=f,u(f))},destroy(){r||(r=!0,a.replaceChildren(),e.innerHTML="")},getState(){return n}}}const Gr=new Set;let Ti=!1;function Bl(){return typeof window>"u"?null:window.__PSL?.debugOverlayApi??null}function Ts(){Ti||typeof window>"u"||(Ti=!0,window.addEventListener("psl:debug-overlay-ready",()=>{Gr.forEach(e=>{Ur(e)})}))}function Ur(e){const t=Bl();t?.registerProvider&&(e.handle||(e.handle=t.registerProvider(e.config)),e.handle.update(e.lastMetrics??null))}function qs(e){const t={config:e,handle:null,lastMetrics:null};return Gr.add(t),Ts(),Ur(t),t}function Hs(e,t){e.lastMetrics=t,Gr.add(e),Ts(),Ur(e)}function Os(e){if(e==null)return 0;try{const t=JSON.stringify(e);return t?Number((t.length/1024).toFixed(1)):0}catch{return null}}const qi=5e3,Hi=50,Vr=50,vn=3;function sr(e){if(e==null||e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function Nl(e){if(!e)return null;const t=sr(e.areaHa);if(t!==null)return t;const a=sr(e.areaAr);if(a!==null)return a/100;const n=sr(e.areaSqm);return n!==null?n/1e4:null}function Fl(e,t="–"){const a=Nl(e);return a===null?t:Bo(a,2,t)}function Tl(e){return e.toISOString().slice(0,10)}function Mn(e){if(!e)return;if(/^\d{4}-\d{2}-\d{2}$/.test(e))return e;const t=new Date(e);if(!Number.isNaN(t.getTime()))return Tl(t)}function Oi(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function Zr(){return{startDate:"",endDate:""}}function _s(e,t){if(!e)return;const a=e.querySelector("#doc-start"),n=e.querySelector("#doc-end");a&&t.startDate&&(a.value=t.startDate),n&&t.endDate&&(n.value=t.endDate)}function ql(e,t="sqlite"){if(typeof e=="string")return e.includes(":")?e:/^\d+$/.test(e)?Xt(t,Number(e)):e;if(typeof e=="number")return Xt(t,e);if(e&&typeof e=="object"){const a=e.source||t;if(typeof e.ref=="string"&&e.ref.includes(":"))return e.ref;const n=Number(e.ref);if(!Number.isNaN(n))return Xt(a,n)}return null}function Hl(e){const t=new Set;return e?.length&&e.forEach(a=>{const n=ql(a);n&&t.add(n)}),t}function Rs(e){const t=e.querySelector('[data-role="doc-focus-banner"]'),a=e.querySelector('[data-role="doc-focus-text"]');if(!t||!a)return;if(!zt){t.classList.add("d-none");return}const n=V.startDate&&V.endDate?`${V.startDate} - ${V.endDate}`:"Aktuelle Filter",r=zt.label||"Importierter Zeitraum",i=zt.highlightEntryIds.size,l=i?` (${i} markiert)`:"";a.textContent=`${r}: ${n}${l}`,t.classList.remove("d-none")}function Ol(e,t){const a=e.querySelector('[data-role="doc-refresh-indicator"]');if(a){if(a.classList.remove("alert-info","alert-warning"),t==="idle"){a.classList.add("d-none");return}a.classList.remove("d-none"),t==="stale"?(a.classList.add("alert-warning"),a.textContent="Neue Dokumentationseinträge verfügbar. Ansicht aktualisiert sich beim Öffnen."):(a.classList.add("alert-info"),a.textContent="Aktualisiere Dokumentation...")}}function or(e,t,a={}){zt&&(zt=null,Ba=null,Rs(e),a.refreshList&&Ct(e,t.state.getState().fieldLabels))}function _l(e,t){if(!Ba)return;const a=_t(Ba);a&&(Ba=null,Vs(e,a,t))}function Rl(e,t,a){if(!a)return;const n=Mn(a.startDate),r=Mn(a.endDate),i=!!a.entryIds?.length;if(!n&&!r&&!i)return;V={...V,...n?{startDate:n}:{},...r?{endDate:r}:{}},a.creator!==void 0&&(V={...V,creator:a.creator||void 0}),a.crop!==void 0&&(V={...V,crop:a.crop||void 0});const l=Hl(a.entryIds);zt={label:a.label,reason:a.reason,startDate:V.startDate,endDate:V.endDate,highlightEntryIds:l},Ba=a.autoSelectFirst&&l.size?l.values().next().value??null:null;const o=e.querySelector("#doc-filter");_s(o,V),Rs(e),Er=!0,Et(e,t.state.getState()).finally(()=>{Er=!1})}function Kl(){if(typeof window>"u")return{enabled:!1,count:cn};try{const e=new URLSearchParams(window.location.search);if(!e.has("seedHistory"))return{enabled:!1,count:cn};const t=e.get("seedHistory"),a=t?Number(t):Number.NaN;return{enabled:!0,count:Number.isFinite(a)&&a>0?Math.min(Math.round(a),Wl):cn}}catch(e){return console.warn("seedHistory Parameter konnte nicht gelesen werden",e),{enabled:!1,count:cn}}}const it=25,_i=4,lr=new Intl.NumberFormat("de-DE"),cn=200,Wl=2e3,ra=Kl();let Ri=!1,$e="memory",V=Zr(),Te=0,ve=[],gt=[],ne=0;const nt=new Map,Je=new Map([[0,null]]),Ge=new Set,At=new Map,Yt=new Map;let We=!1,Sa=null,Ea=0,zt=null,Er=!1,Ba=null,Cn=!1,yn="",In=!1,dn=null,un=null,Ki=null,Fe=0,pn=null,Wi=null,at=null,Na=!1,ji=null;const jl=qs({id:"documentation",label:"Documentation",budget:{initialLoad:50,maxItems:150}});let Ks=null;function sa(e){return e.app?.storageDriver||pe()}function Xt(e,t){return`${e}:${t}`}function Qr(e){const t={},a=Oi(e.startDate,"start"),n=Oi(e.endDate,"end");return a&&(t.startDate=a),n&&(t.endDate=n),e.creator&&(t.creator=e.creator),e.crop&&(t.crop=e.crop),t}function Gl(e,t){return{id:Xt("state",t),entry:e,source:"state",ref:t}}function Ul(e){const t=Number(e?.id??e?.historyId??0),a={...e};return delete a.id,{id:Xt("sqlite",t),entry:a,source:"sqlite",ref:t}}function Vl(){return $e==="memory"?ve.length:Te>0?Te:ne*it+ve.length||null}function Zl(){const e=[];if(We&&e.push("Lädt …"),at&&e.push("Fehler"),zt&&e.push("Fokus aktiv"),$e==="sqlite"&&Je.get(ne+1)&&e.push("Weitere Seiten verfügbar"),!!e.length)return e.join(" · ")}function Ql(){const e={items:ve.length,totalCount:Vl(),cursor:$e==="sqlite"?`Seite ${ne+1}`:null,payloadKb:Os(gt.map(t=>t.entry)),lastUpdated:Ks,note:Zl()};Hs(jl,e)}function _t(e){return ve.find(t=>t.id===e)}function jn(e){const t=e.querySelector('[data-role="archive-form"]');if(!t)return;const a=t.querySelector('input[name="archive-start"]'),n=t.querySelector('input[name="archive-end"]');a&&(a.value=V.startDate||""),n&&(n.value=V.endDate||"")}function ze(e,t,a="info"){const n=e.querySelector('[data-role="archive-status"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a}`,n.textContent=t,n.classList.remove("d-none")}}function Lr(e,t){const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(!a)return;const r=!a.classList.contains("d-none"),i=typeof t=="boolean"?t:!r;a.classList.toggle("d-none",!i),n&&(n.textContent=i?"Archiv-Eingaben ausblenden":"Archiv erstellen"),i&&jn(e)}function Jl(e){const t=e.querySelector('input[name="archive-start"]'),a=e.querySelector('input[name="archive-end"]');if(!t?.value||!a?.value)return null;const n=e.querySelector('input[name="archive-storage"]'),r=e.querySelector('textarea[name="archive-note"]'),i=e.querySelector('input[name="archive-remove"]');return{startDate:t.value,endDate:a.value,storageHint:n?.value.trim()||void 0,note:r?.value.trim()||void 0,removeAfterExport:i?i.checked:!0}}function Jr(e,t){const a=e.querySelector('[data-action="archive-toggle"]'),n=e.querySelector('[data-action="archive-submit"]'),r=e.querySelector('[data-role="archive-form"]'),i=e.querySelector('[data-role="archive-driver-hint"]'),l=sa(t)==="sqlite"&&!!t.app?.hasDatabase;a&&(a.disabled=!l||Cn),n&&(n.disabled=!l||Cn),!l&&r&&r.classList.add("d-none"),i&&(i.textContent=l?"Lokale SQLite-Datenbank aktiv":"Nur mit SQLite verfügbar",i.className=`badge ${l?"bg-success":"bg-secondary"}`),l?Yr():In=!1}function Gi(e,t){Cn=t;const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(a&&a.querySelectorAll("input, textarea, button").forEach(r=>{if(r.dataset.action==="archive-cancel"&&t){r.setAttribute("disabled","disabled");return}t?r.setAttribute("disabled","disabled"):r.removeAttribute("disabled")}),n&&(n.disabled=t||n.disabled,!t)){const r=j();n.disabled=sa(r)!=="sqlite"||!r.app?.hasDatabase}}function Yl(e,t){const a=n=>n?n.replace(/[^0-9-]/g,""):"unbekannt";return`pflanzenschutz-archiv-${a(e)}_${a(t)}.zip`}function Xl(e){let t=[];return Xe("archives",a=>{const n=Array.isArray(a?.logs)?a.logs:[];return t=[e,...n].slice(0,Vr),{...a||{logs:[]},logs:t}}),t}async function Yr({force:e=!1}={}){if(dn){if(await dn,!e)return}else if(In&&!e)return;const t=j();if(sa(t)!=="sqlite"||!t.app?.hasDatabase)return;const n=(async()=>{try{const r=await So({limit:Vr});Xe("archives",i=>({...i&&typeof i=="object"?i:{logs:[]},logs:r.items})),In=!0}catch(r){console.warn("Archive logs could not be loaded",r)}})();dn=n;try{await n}finally{dn=null}}async function ec(e,t){const a=sa(j());if(Xl(e),a!=="sqlite"){console.warn("Archive logs require SQLite. Changes stored in memory only.");return}try{const n={...e,metadata:t??void 0};await zo(n),await Ye()}catch(n){console.error("Archive log could not be persisted",n),In=!1}finally{await Yr({force:!0})}}function Dr(e){return!Array.isArray(e)||!e.length?"[]":e.map(t=>`${t.id}:${t.archivedAt}:${t.entryCount}`).join("|")}function tc(e){return e?Oa(e)||e.slice(0,16).replace("T"," "):"-"}function Ra(e,t,a={}){const n=e.querySelector('[data-role="archive-log-list"]');if(!n)return;const r=Array.isArray(t)?t:[];a.resetPage!==!1&&(Fe=0);const i=dc(r);if(!i.total){n.innerHTML='<div class="text-muted small">Noch keine Archive erstellt.</div>',Zi(e,i);return}const l=i.items.map(o=>{const d=tc(o.archivedAt),p=`${o.startDate||"-"} – ${o.endDate||"-"}`,u=o.entryCount===1?"Eintrag":"Einträge";return`
        <div class="list-group-item border rounded mb-2 p-3" data-action="archive-log-focus" data-log-id="${o.id}" style="cursor: pointer;">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="fs-5 fw-bold mb-1">${b(p)}</div>
              <div class="text-muted">${o.entryCount} ${u} · Erstellt ${b(d)}</div>
            </div>
            <i class="bi bi-chevron-right text-muted fs-4"></i>
          </div>
        </div>
      `}).join("");n.innerHTML=`<div class="list-group list-group-flush">${l}</div>`,Zi(e,i)}function Ui(e,t){const a=e.archives?.logs;if(Array.isArray(a))return a.find(n=>n.id===t)}async function ac(e){if(e){if(typeof navigator<"u"&&navigator.clipboard&&typeof navigator.clipboard.writeText=="function"){await navigator.clipboard.writeText(e);return}if(typeof document<"u"){const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select(),document.execCommand("copy"),document.body.removeChild(t)}}}async function Qa(e){if(Yt.has(e.id))return Yt.get(e.id);let t=null;if(e.source==="sqlite")try{t=await Po(e.ref)}catch(a){console.error("History entry fetch failed",a)}else{const a=je(j().history);t=(typeof e.ref=="number"?a[e.ref]:void 0)||e.entry}return t&&Yt.set(e.id,t),t}function Ws(e){return e&&(e.datum||Oa(e.dateIso)||(typeof e.date=="string"?e.date:""))||""}function nc(e){if(e?.gpsCoordinates){const t=Io(e.gpsCoordinates);if(t)return t}return""}function rc(e){return e?.gps||""}function $r(e){if(!e)return null;if(e.dateIso){const n=Ss(e.dateIso);if(n)return new Date(n.getFullYear(),n.getMonth(),n.getDate())}const t=typeof e.datum=="string"&&e.datum||typeof e.date=="string"&&e.date||null;if(!t)return null;const a=t.split(".");if(a.length===3){const[n,r,i]=a.map(Number);if(!Number.isNaN(n)&&!Number.isNaN(r)&&!Number.isNaN(i))return new Date(i,r-1,n)}return null}function ic(e,t){const a=$r(e);if(t.startDate){const r=new Date(t.startDate);if(r.setHours(0,0,0,0),!a||a<r)return!1}if(t.endDate){const r=new Date(t.endDate);if(r.setHours(23,59,59,999),!a||a>r)return!1}const n=[["creator",e.ersteller],["crop",e.kultur]];for(const[r,i]of n){const o=t[r]?.trim().toLowerCase();if(o&&!`${i||""}`.toLowerCase().includes(o))return!1}return!0}function Xr(e){if(!e)return"";const t=r=>r==null?"":String(r),n=(Array.isArray(e.items)?e.items:[]).map(r=>{const i=Object.keys(r).sort().reduce((l,o)=>(l[o]=r[o],l),{});return JSON.stringify(i)}).sort();return JSON.stringify({savedAt:t(e.savedAt),dateIso:t(e.dateIso),datum:t(e.datum),ersteller:t(e.ersteller),standort:t(e.standort),kultur:t(e.kultur),usageType:t(e.usageType),eppoCode:t(e.eppoCode),invekos:t(e.invekos),bbch:t(e.bbch),gps:t(e.gps),gpsPointId:t(e.gpsPointId),areaHa:e.areaHa??null,areaAr:e.areaAr??null,areaSqm:e.areaSqm??null,kisten:e.kisten??null,itemHashes:n})}function js(e){e.size&&Xe("history",t=>{const a=Ua(t);if(!a.items.length)return a;let n=!1;const r=a.items.filter(i=>{const l=Xr(i);return e.has(l)?(n=!0,!1):!0});return n?{...a,items:r,totalCount:Math.min(a.totalCount,r.length),lastUpdatedAt:new Date().toISOString()}:a})}function sc(e){return e.slice().sort((t,a)=>{const n=$r(t.entry)?.getTime()||new Date(t.entry.savedAt||0).getTime();return($r(a.entry)?.getTime()||new Date(a.entry.savedAt||0).getTime())-n})}function Vi(){return $e==="sqlite"?Te>0?Math.max(Math.ceil(Te/it),1):Math.max(ne+1,nt.size||0):ve.length?Math.max(Math.ceil(ve.length/it),1):0}function Gs(){if($e==="sqlite"){const t=Math.max(Vi()-1,0);return ne>t&&(ne=t),ne<0&&(ne=0),ne*it}if(!ve.length)return ne=0,0;const e=Math.max(Vi()-1,0);return ne>e&&(ne=e),ne<0&&(ne=0),ne*it}function Gn(){if(!ve.length){gt=[];return}if($e==="sqlite"){gt=ve.slice();return}const e=Gs(),t=Math.min(e+it,ve.length);gt=ve.slice(e,t)}function oc(e){if(nt.size<=_i)return;const t=Array.from(nt.keys()).sort((a,n)=>{const r=Math.abs(a-e);return Math.abs(n-e)-r});for(;nt.size>_i&&t.length;){const a=t.shift();a==null||a===e||nt.delete(a)}}function lc(e){const t=e.querySelector('[data-role="doc-pager"]');return t?((!un||Ki!==t)&&(un?.destroy(),un=Za(t,{onPrev:()=>mc(e),onNext:()=>fc(e),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Dokumentation...",empty:"Keine Einträge"}}),Ki=t),un):null}function cc(e){const t=e.querySelector('[data-role="archive-log-pager"]');return t?((!pn||Wi!==t)&&(pn?.destroy(),pn=Za(t,{onPrev:()=>uc(e),onNext:()=>pc(e),labels:{prev:"Zurück",next:"Weiter",loading:"Archive werden geladen...",empty:"Keine Einträge"}}),Wi=t),pn):null}function dc(e){const t=e.length;if(!t)return Fe=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/vn),1);Fe>=a&&(Fe=a-1),Fe<0&&(Fe=0);const n=Fe*vn,r=Math.min(n+vn,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function Zi(e,t){const a=cc(e);if(a){if(!t.total){a.update({status:"disabled",info:"Noch keine Archive"});return}a.update({status:"ready",info:`Einträge ${t.start+1}–${t.end} von ${t.total}`,canPrev:Fe>0,canNext:t.end<t.total})}}function uc(e){if(Fe===0)return;Fe=Math.max(Fe-1,0);const t=j().archives?.logs??[];Ra(e,t,{resetPage:!1})}function pc(e){const t=j().archives?.logs??[],a=t.length;if(!a)return;const n=Math.max(Math.ceil(a/vn),1);Fe>=n-1||(Fe=Math.min(Fe+1,n-1),Ra(e,t,{resetPage:!1}))}function wn(e){const t=lc(e);if(!t)return;if(at){t.update({status:"error",message:at});return}const a=$e==="memory"?ve.length:Te,n=gt.length;if(!n){const p=We?"Lade Dokumentation...":"Keine Einträge vorhanden.";t.update({status:"disabled",info:p});return}const r=$e==="sqlite"?ne*it:Gs(),i=`Einträge ${lr.format(r+1)}–${lr.format(r+n)}${a?` von ${lr.format(a)}`:""}`,l=$e==="memory"?r+n<ve.length:!!Je.get(ne+1),o=!We&&l,d=ne>0&&!We;t.update({status:"ready",info:i,canPrev:d,canNext:o,loadingDirection:We&&l?"next":null})}function Ar(e){if(!ra.enabled)return;const t=e.querySelector('[data-action="doc-seed"]');t&&(t.disabled=Na,t.textContent=Na?"Dummy-Daten werden erstellt...":`+ ${ra.count} Dummy-Einträge`)}function mc(e){if(ne===0||We)return;const t=Math.max(ne-1,0);if($e==="sqlite"){ei(e,j().fieldLabels,t);return}ne=t,Gn(),Ct(e,j().fieldLabels),Wa(e,j().fieldLabels)}function fc(e){if(We)return;const t=ne+1;if($e==="sqlite"){const n=nt.has(t),r=Je.get(t);if(!n&&!r)return;ei(e,j().fieldLabels,t);return}t*it<ve.length&&(ne=t,Gn(),Ct(e,j().fieldLabels),Wa(e,j().fieldLabels))}function Ka(e){Ge.clear(),At.clear(),e&&Un(e)}function gc(){return $e==="memory"?ve.length:Te}function Un(e){const t=e.querySelector('[data-role="doc-selection-info"]'),a=e.querySelector('[data-action="print-selection"]'),n=e.querySelector('[data-action="pdf-selection"]'),r=e.querySelector('[data-action="export-selection"]'),i=e.querySelector('[data-action="export-zip"]'),l=e.querySelector('[data-action="delete-selection"]'),o=Ge.size;t&&(t.textContent=o?`${o} Eintrag${o===1?"":"e"} ausgewählt`:"Keine Einträge ausgewählt");const d=o===0;a&&(a.disabled=d),n&&(n.disabled=d),r&&(r.disabled=d),i&&(i.disabled=d),l&&(l.disabled=d);const p=e.querySelector('[data-action="toggle-select-all"]');if(p){const u=gc();p.disabled=u===0,p.checked=u>0&&o>=u,p.indeterminate=o>0&&o<u}}function zr(e,t){e.querySelectorAll('[data-role="doc-list"] .doc-sidebar-entry').forEach(n=>{const r=!!(t&&n.dataset.entryId===t);n.classList.toggle("active",r)})}function Aa(e,t,a){const n=e.querySelector("#doc-detail"),r=e.querySelector("#doc-detail-body"),i=e.querySelector('[data-role="doc-detail-card"]'),l=e.querySelector('[data-role="doc-detail-empty"]');if(!n||!r||!i||!l)return;if(!t){n.dataset.entryId="",i.classList.add("d-none"),l.classList.remove("d-none"),r.innerHTML="",zr(e,null);return}n.dataset.entryId=t.entry.id,i.classList.remove("d-none"),l.classList.add("d-none"),zr(e,t.entry.id);const o=a||j().fieldLabels,d=o.history?.tableColumns??{},p=o.history?.detail??{},u=t.detail||t.entry.entry,f=Mo(u.items||[],o,"detail"),v=u.gpsCoordinates?Va(u.gpsCoordinates):null,x=rc(u),m=nc(u),k=p.gpsNote||d.gpsNote||p.gps||d.gps||"GPS-Notiz",S=p.gpsCoordinates||d.gpsCoordinates||p.gps||d.gps||"GPS-Koordinaten",D=m?`${b(m)}${v?` <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${b(v)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:""}`:"-";r.innerHTML=`
    <p>
      <strong>${b(d.date||"Datum")}:</strong> ${b(Ws(u))}<br />
      <strong>${b(p.creator||"Erstellt von")}:</strong> ${b(u.ersteller||"")}<br />
      <strong>${b(p.location||"Standort")}:</strong> ${b(u.standort||"")}<br />
      <strong>${b(p.crop||"Kultur")}:</strong> ${b(u.kultur||"")}<br />
      <strong>${b(p.usageType||"Art der Verwendung")}:</strong> ${b(u.usageType||"")}<br />
      <strong>${b(p.quantity||"Fläche (ha)")}:</strong> ${b(Fl(u))}<br />
      <strong>${b(p.eppoCode||"EPPO-Code")}:</strong> ${b(u.eppoCode||"")}<br />
      <strong>${b(p.bbch||"BBCH")}:</strong> ${b(u.bbch||"")}<br />
      <strong>${b(p.invekos||"InVeKoS")}:</strong> ${b(u.invekos||"")}<br />
      <strong>${b(k)}:</strong> ${x?b(x):"-"}<br />
      <strong>${b(S)}:</strong> ${D}<br />
      <strong>${b(p.time||"Uhrzeit")}:</strong> ${b(u.uhrzeit||"")}<br />
    </p>
    ${Co({maschine:u.qsMaschine,schaderreger:u.qsSchaderreger,verantwortlicher:u.qsVerantwortlicher,wetter:u.qsWetter,behandlungsart:u.qsBehandlungsart})}
    <div class="table-responsive">
      ${f}
    </div>
  `}function Ct(e,t){Gn();const a=e.querySelector('[data-role="doc-list"]');if(!a)return;const r=e.querySelector("#doc-detail")?.dataset.entryId||null;if(!gt.length)a.innerHTML=We?'<div class="text-center text-muted py-4">Lädt ...</div>':'<div class="text-center text-muted py-4">Noch keine Einträge</div>';else{a.innerHTML="";const i=document.createDocumentFragment();(t||j().fieldLabels).history?.detail?.usageType,gt.forEach(o=>{const d=document.createElement("div"),p=!!zt?.highlightEntryIds?.has(o.id);d.className=`doc-sidebar-entry list-group-item${p?" doc-sidebar-entry--highlight":""}`,d.dataset.entryId=o.id;const u=Ws(o.entry)||"-",f=p?'<span class="badge bg-warning-subtle text-warning-emphasis badge-import">Import</span>':"";d.innerHTML=`
        <div
          class="doc-sidebar-entry__main"
          data-action="view-entry"
          data-entry-id="${o.id}"
        >
          <div class="d-flex justify-content-between gap-2">
            <span class="fw-bold d-flex align-items-center gap-2">
              ${b(o.entry.kultur||"-")}
              ${f}
            </span>
            <small class="text-muted">${b(u)}</small>
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
            <input type="checkbox" class="form-check-input" data-action="toggle-select" data-entry-id="${o.id}" ${Ge.has(o.id)?"checked":""} />
            <span class="small">Auswahl</span>
          </label>
        </div>
      `,i.appendChild(d)}),a.appendChild(i)}zr(e,r),_l(e,t),wn(e),Un(e),Ks=new Date().toISOString(),Ql()}function Wa(e,t){const a=e.querySelector('[data-role="doc-info"]');if(!a)return;const n=Te,r=!!(V.crop||V.creator);if(!n&&!We){a.textContent="Keine Einträge";return}if(!n&&We){a.textContent="Lädt...";return}if(V.startDate&&V.endDate){const i=`${V.startDate} - ${V.endDate} (${n})`;a.textContent=r?`${i} + Filter`:i;return}a.textContent=`Alle Einträge (${n})`}async function Us(e,t){const n=e.querySelector("#doc-detail")?.dataset.entryId;if(!n){Aa(e,null,t);return}const r=_t(n);if(!r){Aa(e,null,t);return}const i=await Qa(r);i?Aa(e,{entry:r,detail:i},t):Aa(e,null,t)}async function ei(e,t,a=ne,n={}){const r=Math.max(0,a),i=!!n.forceReload;i&&(nt.clear(),Je.clear(),Je.set(0,null),Te=0,ve=[],gt=[],ne=0,at=null);const l=i?void 0:nt.get(r);if(l&&!n.forceReload){ne=r,ve=l,at=null,Ct(e,t),Wa(e),wn(e);return}const o=Je.has(r)?Je.get(r)??null:null,d=Symbol("doc-load");Sa=d,We=!0,at=null,wn(e);try{const p=await ws({cursor:o,pageSize:it,filters:Qr(V),sortDirection:"desc",includeTotal:i||r===0||Te===0});if(Sa!==d)return;const u=p.items.map(f=>Ul(f));if(nt.set(r,u),oc(r),Je.set(r,o),Je.set(r+1,p.nextCursor??null),typeof p.totalCount=="number")Te=p.totalCount;else{const f=r*it+u.length;Te=Math.max(Te,f)}ne=r,ve=u,at=null,Ct(e,t),Wa(e,t)}catch(p){Sa===d&&(console.error("Dokumentation konnte nicht geladen werden",p),at="Dokumentation konnte nicht geladen werden. Bitte erneut versuchen.",window.alert("Dokumentation konnte nicht geladen werden. Bitte erneut versuchen."))}finally{Sa===d&&(We=!1,Sa=null,wn(e))}}async function bc(e,t){const a=je(t.history);ve=sc(a.map((n,r)=>Gl(n,r)).filter(n=>ic(n.entry,V))),Te=ve.length,ne=0,at=null,Gn(),Ct(e,t.fieldLabels),Wa(e,t.fieldLabels),await Us(e,t.fieldLabels)}async function Et(e,t){const a=sa(t),n=!!t.app?.hasDatabase,r=a==="sqlite"&&n;if($e=r?"sqlite":"memory",Yt.clear(),ne=0,at=null,Te=0,ve=[],gt=[],nt.clear(),Je.clear(),Je.set(0,null),Ka(e),Jr(e,t),jn(e),Ra(e,t.archives?.logs??[]),yn=Dr(t.archives?.logs),r){await ei(e,t.fieldLabels,0,{forceReload:!0}),await Us(e,t.fieldLabels);return}await bc(e,t)}async function cr(){const e=[];for(const t of Ge){const a=At.get(t)||_t(t);if(!a)continue;const n=await Qa(a);n&&e.push(n)}return e}async function hc(e,t){if(!t){Ka(e),Ct(e,j().fieldLabels);return}if(Ge.clear(),At.clear(),$e==="memory")for(const a of ve)Ge.add(a.id),At.set(a.id,a);else try{const a=await xs({filters:Qr(V),sortDirection:"desc",limit:1e4}),n=Array.isArray(a.historyIds)?a.historyIds:[];a.entries.forEach((r,i)=>{const l=Number(n[i]);if(!Number.isFinite(l))return;const o=Xt("sqlite",l);Ge.add(o),At.set(o,{id:o,entry:r,source:"sqlite",ref:l}),Yt.has(o)||Yt.set(o,r)})}catch(a){console.error("Alle Einträge konnten nicht ausgewählt werden",a),window.alert("Alle Einträge konnten nicht ausgewählt werden. Bitte erneut versuchen.")}Ct(e,j().fieldLabels),Un(e)}async function vc(e,t){if(!Ge.size)return;const a=Array.from(Ge).map(o=>At.get(o)||_t(o)).filter(o=>!!o),n=[];for(const o of a){const d=await Qa(o);d&&n.push(d)}const r=a.filter(o=>o.source==="sqlite"),i=!!r.length;if(i)for(const o of r)await Ao(o.ref);const l=new Set(a.filter(o=>o.source==="state").map(o=>o.ref));if(l.size&&(Xe("history",o=>{const d=Ua(o),p=d.items.filter((u,f)=>!l.has(f));return p.length===d.items.length?d:{...d,items:p,totalCount:Math.min(d.totalCount,p.length),lastUpdatedAt:new Date().toISOString()}}),await yc()),n.length){const o=new Set(n.map(d=>Xr(d)));js(o)}if(i){try{await Ye()}catch(o){console.warn("SQLite-Datei konnte nach dem Löschen nicht gespeichert werden",o)}t.events?.emit?.("history:data-changed",{type:"deleted",ids:r.map(o=>o.ref)})}Ka(e),await Et(e,t.state.getState())}async function Vs(e,t,a){const n=await Qa(t);if(!n){window.alert("Details konnten nicht geladen werden.");return}Aa(e,{entry:t,detail:n},a)}async function Qi(e){const t=await Qa(e);t?await Zs([t]):window.alert("Eintrag konnte nicht geladen werden.")}async function yc(){const e=pe();if(!(!e||e==="memory"||e==="sqlite"))try{const t=Ze();await Qe(t)}catch(t){throw console.error("Persist history failed",t),window.alert("Historie konnte nicht gespeichert werden. Bitte erneut versuchen."),t}}async function wc(e,t,a){if(Cn)return;const n=t.state.getState();if(sa(n)!=="sqlite"||!n.app?.hasDatabase){ze(e,"Archivieren ist nur mit einer lokalen SQLite-Datenbank möglich.","warning");return}const i=Jl(a);if(!i?.startDate||!i.endDate){ze(e,"Bitte Start- und Enddatum für das Archiv wählen.","warning");return}const l=Mn(i.startDate),o=Mn(i.endDate);if(!l||!o){ze(e,"Die angegebenen Daten sind ungültig.","danger");return}if(new Date(l)>new Date(o)){ze(e,"Startdatum darf nicht nach dem Enddatum liegen.","danger");return}const d={startDate:l,endDate:o,creator:V.creator,crop:V.crop},p=Qr(d);Gi(e,!0),ze(e,"Prüfe Zeitraum und Eintragsmenge...","info");try{const u=await ws({cursor:null,pageSize:1,filters:p,sortDirection:"asc",includeTotal:!0}),f=u.totalCount??u.items.length??0;if(!f){ze(e,"Im angegebenen Zeitraum wurden keine Einträge gefunden.","warning");return}if(f>qi){ze(e,`Maximal ${qi} Einträge pro Archiv erlaubt. Bitte Zeitraum verkürzen.`,"warning");return}ze(e,`Exportiere ${f} Einträge in ein ZIP-Archiv...`,"info");const v=await xs({filters:p,limit:f,sortDirection:"asc"}),x=v?.entries??[];if(!x.length){ze(e,"Archiv konnte nicht erstellt werden – Export lieferte keine Einträge.","danger");return}const m=x.map(L=>({...L})),k={format:"pflanzenschutz-archive",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:m.length,filters:{startDate:l,endDate:o,creator:d.creator||null,crop:d.crop||null},archive:{removeFromDatabase:i.removeAfterExport,storageHint:i.storageHint||null,note:i.note||null}},S=ks({"pflanzenschutz.json":zn(JSON.stringify(m,null,2)),"metadata.json":zn(JSON.stringify(k,null,2))}),D=new ArrayBuffer(S.byteLength);new Uint8Array(D).set(S);const I=new Blob([D],{type:"application/zip"}),Q=Yl(l,o);ti(I,Q);let W=!1;if(i.removeAfterExport){ze(e,"Export abgeschlossen. Entferne Einträge und bereinige Datenbank...","info"),await Eo({filters:p});const L=new Set(m.map($=>Xr($)));js(L);try{await Ye()}catch($){console.error("SQLite-Datei konnte nach dem Archivieren nicht gespeichert werden",$)}t.events?.emit?.("history:data-changed",{type:"deleted-range",filters:p});try{await Lo()}catch($){W=!0,console.error("VACUUM fehlgeschlagen",$)}}const me=new Date().toISOString(),N={id:`archive-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,archivedAt:me,startDate:l,endDate:o,entryCount:m.length,fileName:Q,storageHint:i.storageHint||void 0,note:i.note||void 0};W&&(N.note=N.note?`${N.note} | VACUUM fehlgeschlagen`:"VACUUM fehlgeschlagen");const re={filters:{...d},removeAfterExport:!!i.removeAfterExport,historyIdSample:v?.historyIds?.slice(0,Hi)};if(await ec(N,re),!i.removeAfterExport&&v?.historyIds?.length){const L=v.historyIds.slice(0,Hi).map($=>({source:"sqlite",ref:$}));t.events?.emit?.("documentation:focus-range",{startDate:l,endDate:o,label:"Archiviert",reason:"archive",entryIds:L})}Lr(e,!1),a.reset(),jn(e),await Et(e,t.state.getState());const q=i.removeAfterExport?`Archiv ${Q} erstellt und ${m.length} Einträge entfernt.`:`Archiv ${Q} erstellt. ${m.length} Einträge bleiben in der Datenbank.`;ze(e,q,W?"warning":"success")}catch(u){console.error("Archivieren fehlgeschlagen",u);const f=u instanceof Error?u.message:"Archiv konnte nicht erstellt werden.";ze(e,f,"danger")}finally{Gi(e,!1),Jr(e,t.state.getState())}}const xc=50;async function Zs(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}if(e.length>xc&&!window.confirm(`Sie möchten ${e.length} Einträge drucken. Bei sehr vielen Einträgen kann das Erstellen der Druckvorschau einige Sekunden dauern und lässt sich nicht unterbrechen.

Fortfahren?`))return;const t=j().fieldLabels,a=Do(j().company||null);await $o(e,t,{title:"Dokumentation",headerHtml:a,chunkSize:25})}function ti(e,t){const a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download=t,n.click(),URL.revokeObjectURL(a)}function kc(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const t=e.map(l=>({...l})),a=JSON.stringify(t,null,2),n=new TextEncoder().encode(a),r=new Blob([n],{type:"application/json; charset=utf-8"}),i=new Date().toISOString().replace(/[:.]/g,"-");ti(r,`pflanzenschutz-dokumentation-${i}.json`)}async function Sc(e,t){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const a=e.map(d=>({...d})),n={format:"pflanzenschutz-export",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:a.length,filters:{startDate:t.startDate||null,endDate:t.endDate||null,creator:t.creator||null,crop:t.crop||null}},r=ks({"pflanzenschutz.json":zn(JSON.stringify(a,null,2)),"metadata.json":zn(JSON.stringify(n,null,2))}),i=new ArrayBuffer(r.byteLength);new Uint8Array(i).set(r);const l=new Blob([i],{type:"application/zip"}),o=new Date().toISOString().replace(/[:.]/g,"-");ti(l,`pflanzenschutz-dokumentation-${o}.zip`)}function Ec(){const e=document.createElement("div"),t=Zr(),a=V.startDate||t.startDate||"",n=V.endDate||t.endDate||"";V={...V,startDate:a,endDate:n};const r=ra.enabled?`<button class="btn btn-outline-info btn-sm" type="button" data-action="doc-seed">+ ${ra.count} Dummy-Einträge</button>`:"";return e.className="section-inner",e.innerHTML=`
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
            <small class="text-muted">Letzte ${Vr}</small>
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
  `,e}function Lc(e){if(!e)return{};const t=new FormData(e),a=r=>{const i=t.get(r);return typeof i=="string"&&i?i:void 0},n=r=>{const i=t.get(r);if(typeof i!="string")return;const l=i.trim();return l||void 0};return{startDate:a("doc-start"),endDate:a("doc-end"),crop:n("doc-crop"),creator:n("doc-creator")}}let Ji="entries";function Dc(e,t){Ji!==t&&(Ji=t,e.querySelectorAll("[data-doc-tab]").forEach(a=>{a.classList.toggle("active",a.dataset.docTab===t)}),e.querySelectorAll("[data-pane]").forEach(a=>{a.style.display=a.dataset.pane===t?"block":"none"}))}function $c(e,t){e.addEventListener("click",a=>{const n=a.target.closest("[data-doc-tab]");if(n&&n.dataset.docTab){Dc(e,n.dataset.docTab);return}}),e.addEventListener("submit",a=>{if(a.target instanceof HTMLFormElement){if(a.target.id==="doc-filter"){a.preventDefault(),or(e,t,{refreshList:!0});const n=Lc(a.target);if(!n.startDate||!n.endDate){window.alert("Bitte Start- und Enddatum auswählen.");return}V=n,Ka(e),Et(e,t.state.getState());return}a.target.dataset.role==="archive-form"&&(a.preventDefault(),wc(e,t,a.target))}}),e.addEventListener("click",a=>{const n=a.target;if(!n)return;const r=n.dataset.action;if(!r){n.closest("[data-action]")&&a.stopPropagation();return}if(r==="reset-filters"){const o=e.querySelector("#doc-filter");o?.reset(),V=Zr(),_s(o??null,V),or(e,t,{refreshList:!0}),Ka(e),Et(e,t.state.getState());return}if(r==="archive-toggle"){Lr(e),ze(e,"");return}if(r==="archive-cancel"){Lr(e,!1),ze(e,"");return}if(r==="archive-log-focus"){const o=n.dataset.logId;if(!o)return;const d=Ui(t.state.getState(),o);if(!d){window.alert("Archiv-Eintrag nicht gefunden.");return}const p=d.fileName?`Archiv ${d.fileName}`:"Archivierter Zeitraum";typeof t.events?.emit=="function"?t.events.emit("documentation:focus-range",{startDate:d.startDate,endDate:d.endDate,label:p,reason:"archive-log"}):(V={...V,startDate:d.startDate,endDate:d.endDate},Et(e,t.state.getState())),ze(e,`Dokumentation auf Archiv ${d.startDate} – ${d.endDate} fokussiert.`,"success");return}if(r==="archive-log-copy-hint"){const o=n.dataset.logId;if(!o)return;const d=Ui(t.state.getState(),o);if(!d||!d.storageHint){window.alert("Kein Speicherhinweis vorhanden.");return}const p=d.storageHint;(async()=>{try{await ac(p),ze(e,"Speicherhinweis kopiert.","success")}catch(u){console.error("Hinweis konnte nicht kopiert werden",u),window.alert("Hinweis konnte nicht kopiert werden.")}})();return}if(r==="doc-focus-clear"){or(e,t,{refreshList:!0});return}if(r==="print-selection"||r==="pdf-selection"){(async()=>{const o=await cr();await Zs(o)})();return}if(r==="export-selection"){(async()=>{const o=await cr();kc(o)})();return}if(r==="export-zip"){(async()=>{const o=await cr();await Sc(o,V)})();return}if(r==="delete-selection"){if(!Ge.size||!window.confirm("Ausgewählte Einträge wirklich löschen?"))return;vc(e,t);return}if(r==="doc-seed"){if(!ra.enabled||Na)return;const d=window.__PSL?.seedHistoryEntries;if(typeof d!="function"){window.alert("Seed-Funktion ist nicht verfügbar. Bitte Entwicklungsmodus verwenden.");return}Na=!0,Ar(e),(async()=>{try{await d(ra.count),await Et(e,t.state.getState())}catch(p){console.error("Dummy-Daten konnten nicht erstellt werden",p),window.alert("Dummy-Daten konnten nicht erstellt werden.")}finally{Na=!1,Ar(e)}})();return}if(r==="detail-print"){const d=e.querySelector("#doc-detail")?.dataset.entryId;if(!d){window.alert("Kein Eintrag ausgewählt.");return}const p=_t(d);if(!p){window.alert("Eintrag nicht verfügbar.");return}Qi(p);return}const i=n.dataset.entryId;if(!i)return;const l=_t(i);if(!l){window.alert("Eintrag nicht verfügbar.");return}if(r==="view-entry"){Vs(e,l,t.state.getState().fieldLabels);return}if(r==="print-entry"){Qi(l);return}}),e.addEventListener("change",a=>{const n=a.target;if(!n)return;if(n.dataset.action==="toggle-select-all"){hc(e,n.checked);return}if(n.dataset.action!=="toggle-select")return;const r=n.dataset.entryId;if(r){if(n.checked){Ge.add(r);const i=_t(r);i&&At.set(r,i)}else Ge.delete(r),At.delete(r);Un(e)}})}function Ac(e,t){if(!e||Ri)return;const a=e;a.innerHTML="";const n=Ec();a.appendChild(n),$c(n,t),Ar(n),Jr(n,t.state.getState()),jn(n);const r=t.state.getState().archives?.logs??[];Ra(n,r),yn=Dr(r),Yr(),typeof t.events?.subscribe=="function"&&t.events.subscribe("documentation:focus-range",o=>{!o||typeof o!="object"||Rl(n,t,o)});const i=o=>je(o.history).length,l=()=>Et(n,t.state.getState());ji?.(),ji=Fs({section:"documentation",event:"history:data-changed",shouldHandleEvent:()=>$e==="sqlite",shouldRefresh:()=>$e==="sqlite",onRefresh:()=>l(),onStatusChange:o=>Ol(n,o)}),Ea=i(t.state.getState()),l(),t.state.subscribe(o=>{const d=Dr(o.archives?.logs);d!==yn&&(yn=d,Ra(n,o.archives?.logs??[]));const p=i(o);if(Er){Ea=p;return}if($e==="sqlite"){Ea=p;return}p!==Ea&&(Ea=p,l())}),Ri=!0}const ja=e=>je(e.gps.points),za=e=>je(e.points),zc=new Intl.NumberFormat("de-DE",{minimumFractionDigits:5,maximumFractionDigits:5}),Pc=new Intl.DateTimeFormat("de-DE",{dateStyle:"short",timeStyle:"short"}),Yi="Deutschland";let Xi=!1,Qs="list",mn=null,A=null,La=null,es=null;const xn=25,dr=new Intl.NumberFormat("de-DE");let Pe=0,Zt=null,Pr=null,ts=null;function Ut(e,t){typeof e.events?.emit=="function"&&e.events.emit("history:gps-activation-result",{...t,source:"gps",timestamp:Date.now()})}function Fa(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Mc(){const e=document.createElement("section");return e.className="section-inner",e.innerHTML=`
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
  `,e}function Cc(e){return{root:e,message:e.querySelector('[data-role="gps-message"]'),refreshIndicator:e.querySelector('[data-role="gps-refresh-indicator"]'),availability:e.querySelector('[data-role="gps-availability"]'),tabButtons:Array.from(e.querySelectorAll('[data-role="gps-tab"]')),panels:Array.from(e.querySelectorAll('[data-role="gps-panel"]')),listBody:e.querySelector('[data-role="gps-list"]'),emptyState:e.querySelector('[data-role="gps-empty"]'),activeInfo:e.querySelector('[data-role="gps-active-info"]'),summaryLabel:e.querySelector('[data-role="gps-summary"]'),statusBadge:e.querySelector('[data-role="gps-status"]'),form:e.querySelector('[data-role="gps-form"]'),formFields:{name:e.querySelector('[name="gps-name"]'),description:e.querySelector('[name="gps-description"]'),latitude:e.querySelector('[name="gps-latitude"]'),longitude:e.querySelector('[name="gps-longitude"]'),source:e.querySelector('[name="gps-source"]'),activate:e.querySelector('[name="gps-activate"]'),rawCoordinates:e.querySelector('[name="gps-raw-coordinates"]')},disableTargets:Array.from(e.querySelectorAll("[data-gps-disable]")),geolocationBtn:e.querySelector('[data-action="use-geolocation"]'),mapButton:e.querySelector('[data-role="gps-open-maps"]'),verifyButton:e.querySelector('[data-action="verify-coords"]')}}function Pa(e){return`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e)}`}function Js(e){const t=e.gps,a=za(t),n=l=>{if(!l)return null;const o=Va(l)||Pa(`${l.latitude},${l.longitude}`),d=l.name?`${l.name}`:`${ia(l.latitude)}, ${ia(l.longitude)}`;return{url:o,label:d}};if(t.activePointId){const l=a.find(d=>d.id===t.activePointId),o=n(l||null);if(o)return o}if(a.length>0){const l=n(a[0]);if(l)return l}const r=e.company?.address?.trim();if(r)return{url:Pa(r.replace(/\n/g,", ")),label:r};const i=e.company?.name?.trim();return i?{url:Pa(i),label:i}:{url:Pa(Yi),label:Yi}}function Ic(e){if(!A)return;const t=Js(e);A.mapButton&&(A.mapButton.href=t.url,A.mapButton.title=`Google Maps öffnen (${t.label})`);const a=A.root.querySelector('[data-role="gps-empty-map-link"]');a&&(a.href=t.url)}function Bc(e){if(!e)return null;const a=e.trim().replace(/\s+/g," ").replace(/[,;]/g," ").match(/-?\d+(?:[.,]\d+)?/g);if(!a||a.length<2)return null;const n=l=>Number(l.replace(/,/g,".")),r=n(a[0]),i=n(a[1]);return!Number.isFinite(r)||!Number.isFinite(i)||r<-90||r>90||i<-180||i>180?null:{latitude:r,longitude:i}}function Nc(){if(!A?.formFields)return null;const e=A.formFields.latitude?.value??"",t=A.formFields.longitude?.value??"";if(!e.trim()||!t.trim())return null;const a=Number(e),n=Number(t);return!Number.isFinite(a)||!Number.isFinite(n)||a<-90||a>90||n<-180||n>180?null:{latitude:a,longitude:n}}function fn(e){return Number(e).toFixed(6)}function Fc(e,t){const a=fn(e),n=fn(t);return ja(j()).some(r=>fn(r.latitude)===a&&fn(r.longitude)===n)}function Ta(){if(!A?.verifyButton)return;const e=Nc(),t=!!e;if(A.verifyButton.disabled=!t,e){const a=Va({latitude:e.latitude,longitude:e.longitude});A.verifyButton.dataset.targetUrl=a||Pa(`${e.latitude},${e.longitude}`)}else delete A.verifyButton.dataset.targetUrl}function ia(e){const t=Number(e);return Number.isFinite(t)?`${zc.format(t)}°`:"–"}function Tc(e){if(!e)return"–";const t=new Date(e);return Number.isNaN(t.getTime())?"–":Pc.format(t)}function ce(e,t="info",a=4500){if(A?.message){if(mn&&(window.clearTimeout(mn),mn=null),!e){A.message.classList.add("d-none"),A.message.textContent="";return}A.message.className=`alert alert-${t}`,A.message.textContent=e,A.message.classList.remove("d-none"),a>0&&(mn=window.setTimeout(()=>{A?.message?.classList.add("d-none")},a))}}function qc(e){const t=A?.refreshIndicator;if(t){if(t.classList.remove("alert-warning","alert-info"),e==="idle"){t.classList.add("d-none");return}t.classList.remove("d-none"),e==="stale"?(t.classList.add("alert-warning"),t.textContent="GPS-Daten wurden geändert. Ansicht aktualisiert sich beim Öffnen."):(t.classList.add("alert-info"),t.textContent="GPS-Daten werden aktualisiert...")}}function Ys(e){A&&(Qs=e,A.tabButtons.forEach(t=>{const a=t.dataset.tab===e;t.classList.toggle("active",a)}),A.panels.forEach(t=>{const a=t.getAttribute("data-panel")===e;t.classList.toggle("d-none",!a)}))}function Ue(e){return e?.hasDatabase?e.storageDriver!=="sqlite"?"wrong-driver":"ok":"no-db"}function Hc(e){if(A?.availability){if(e==="ok"){A.availability.classList.add("d-none"),A.availability.textContent="";return}A.availability.classList.remove("d-none"),A.availability.textContent=e==="no-db"?"Bitte verbinden Sie zuerst eine Datenbank, um GPS-Punkte zu verwalten.":"GPS-Funktionen benötigen eine aktive SQLite-Datenbank. Bitte den SQLite-Treiber in den Einstellungen auswählen."}}function ea(e,t){if(!A)return;const a=t!=="ok"||e.pending||_a.isLocked();if(A.disableTargets.forEach(n=>{(n instanceof HTMLButtonElement||n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n instanceof HTMLSelectElement)&&(n.disabled=a)}),A.statusBadge){let n="badge bg-success",r="Bereit";t==="no-db"?(n="badge bg-secondary",r="Keine Datenbank"):t==="wrong-driver"?(n="badge bg-warning text-dark",r="Nur mit SQLite"):(e.pending||_a.isLocked())&&(n="badge bg-info text-dark",r="Wird verarbeitet"),A.statusBadge.className=n,A.statusBadge.textContent=r}}function Xs(e){const t=e.length;if(!t)return Pe=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/xn),1);Pe>=a&&(Pe=a-1),Pe<0&&(Pe=0);const n=Pe*xn,r=Math.min(n+xn,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function Oc(){if(!A?.root)return null;const e=A.root.querySelector('[data-role="gps-pager"]');return e?((!Zt||Pr!==e)&&(Zt?.destroy(),Zt=Za(e,{onPrev:()=>Rc(),onNext:()=>Kc(),labels:{prev:"Zurück",next:"Weiter",loading:"GPS-Punkte werden geladen...",empty:"Keine GPS-Punkte verfügbar"}}),Pr=e),Zt):null}function as(e,t){const a=Oc();if(!a)return;if(t!=="ok"){Pe=0;const l=t==="no-db"?"Keine Datenbank verbunden.":"Nur mit SQLite verfügbar.";a.update({status:"disabled",info:l});return}const n=ja(e).length;if(!n){Pe=0;const l=e.gps.initialized?"Noch keine GPS-Punkte vorhanden.":"GPS-Punkte werden geladen...";a.update({status:"disabled",info:l});return}const{start:r,end:i}=Xs(ja(e));a.update({status:"ready",info:`Einträge ${dr.format(r+1)}–${dr.format(i)} von ${dr.format(n)}`,canPrev:Pe>0,canNext:i<n})}function _c(e,t){return e.length?e.map(a=>{const n=a.id===t,r=a.description?`<div class="text-muted small">${b(a.description)}</div>`:"",i=a.source?`<span class="badge-psm badge-psm-neutral">${b(a.source)}</span>`:'<span class="text-muted">–</span>',l=n?'<span class="badge bg-success ms-2">Aktiv</span>':"",o=Va(a),d=o?`<a class="btn btn-outline-info" href="${Fa(o)}" target="_blank" rel="noopener noreferrer">
              Karte
            </a>`:"";return`
        <tr data-point-id="${Fa(a.id)}">
          <td>
            <div class="fw-semibold">${b(a.name||"Ohne Namen")}${l}</div>
            ${r}
          </td>
          <td class="font-monospace">
            <div>${ia(a.latitude)}</div>
            <div>${ia(a.longitude)}</div>
          </td>
          <td>
            <div>${i}</div>
            <div class="text-muted small">${Tc(a.updatedAt)}</div>
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
`):""}function ai(e,t){if(!A)return;const a=e.gps,n=Js(e),r=t==="ok";if(A.summaryLabel){const i=za(a).length;A.summaryLabel.textContent=r?`${i} Punkt${i===1?"":"e"} gespeichert`:"Funktion derzeit nicht verfügbar"}if(!r){A.listBody&&(A.listBody.innerHTML=""),A.emptyState&&(A.emptyState.textContent=t==="no-db"?"Keine Datenbank verbunden.":"Bitte SQLite als Speicher-Treiber aktivieren.",A.emptyState.classList.remove("d-none")),A.activeInfo&&(A.activeInfo.textContent=t==="no-db"?"Wartet auf Datenbank.":"Nur mit SQLite verfügbar."),as(e,t);return}if(A.listBody){const{items:i}=Xs(za(a));A.listBody.innerHTML=_c(i,a.activePointId)}if(A.emptyState){const i=za(a).length>0;A.emptyState.classList.toggle("d-none",i),!i&&a.initialized?A.emptyState.innerHTML=`
        <p class="mb-2">Noch keine GPS-Punkte vorhanden.</p>
        <p class="small text-muted mb-3">
          Nutzen Sie "Neuer Punkt" oder öffnen Sie Google Maps, um Koordinaten zu ermitteln.
        </p>
        <a class="btn btn-outline-info btn-sm" data-role="gps-empty-map-link" href="${Fa(n.url)}" target="_blank" rel="noopener noreferrer">
          <i class="bi bi-box-arrow-up-right me-1"></i>
          Google Maps öffnen
        </a>
      `:a.initialized||(A.emptyState.textContent="GPS-Punkte werden geladen...")}if(A.activeInfo)if(a.activePointId){const i=za(a).find(l=>l.id===a.activePointId);if(i){const l=`${i.name||"Ohne Namen"} (${ia(i.latitude)}, ${ia(i.longitude)})`,o=Va(i);o?A.activeInfo.innerHTML=`${b(l)} <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${Fa(o)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:A.activeInfo.textContent=l}else A.activeInfo.textContent="Aktiver Punkt nicht gefunden."}else A.activeInfo.innerHTML=`Kein aktiver Punkt ausgewählt. <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${Fa(n.url)}" target="_blank" rel="noopener noreferrer">Google Maps öffnen</a>`;as(e,t)}function Rc(){if(Pe===0)return;Pe=Math.max(Pe-1,0);const e=j(),t=Ue(e.app);ai(e,t)}function Kc(){const e=j(),t=ja(e).length;if(!t)return;const a=Math.max(Math.ceil(t/xn)-1,0);if(Pe>=a)return;Pe=Math.min(Pe+1,a);const n=Ue(e.app);ai(e,n)}function Ne(e){`${new Date().toLocaleString("de-DE")}${e}`}function Ja(e){if(!e)return null;const t=j();return ja(t).find(a=>a.id===e)||null}async function Wc(e){if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(e);return}const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}function jc(){if(!A?.formFields?.rawCoordinates)return;const e=A.formFields.rawCoordinates.value,t=Bc(e);if(!t){ce("Koordinaten konnten nicht erkannt werden. Bitte Format 47.68952, 9.12091 verwenden.","warning",6e3);return}const a=t.latitude.toFixed(6),n=t.longitude.toFixed(6);A.formFields.latitude&&(A.formFields.latitude.value=a),A.formFields.longitude&&(A.formFields.longitude.value=n),ce("Koordinaten übernommen.","success"),Ta()}function Gc(){if(!A?.verifyButton)return;const e=A.verifyButton.dataset.targetUrl;if(!e){ce("Bitte zuerst gültige Koordinaten eintragen, bevor die Prüfung geöffnet wird.","warning",6e3);return}window.open(e,"_blank","noopener,noreferrer")}async function Mr(e={}){const{notify:t=!1}=e;if(!(!A||Ue(j().app)!=="ok"||j().gps.pending))try{await ys(),t&&ce("GPS-Punkte aktualisiert.","success"),Ne("GPS-Punkte synchronisiert.")}catch(n){const r=n instanceof Error?n.message:"GPS-Punkte konnten nicht geladen werden.";ce(r,"danger",7e3),Ne(`Fehler beim Laden: ${r}`)}}async function Uc(e){if(!e)return;const t=Ja(e);if(!t){ce("Ausgewählter GPS-Punkt wurde nicht gefunden.","warning");return}try{await Es(t.id),ce(`"${t.name}" ist nun aktiv.`,"success"),Ne(`Aktiver GPS-Punkt: ${t.name}`)}catch(a){const n=a instanceof Error?a.message:"GPS-Punkt konnte nicht aktiviert werden.";ce(n,"danger",7e3),Ne(`Fehler beim Aktivieren: ${n}`)}}async function Vc(e){if(!e)return;const t=Ja(e);if(!t){ce("GPS-Punkt existiert nicht mehr.","warning");return}if(window.confirm(`"${t.name}" wirklich löschen? Dieser Schritt kann nicht rückgängig gemacht werden.`))try{await No(t.id),ce(`"${t.name}" wurde gelöscht.`,"success"),Ne(`GPS-Punkt gelöscht: ${t.name}`)}catch(n){const r=n instanceof Error?n.message:"GPS-Punkt konnte nicht gelöscht werden.";ce(r,"danger",7e3),Ne(`Löschen fehlgeschlagen: ${r}`)}}async function Zc(e){if(!e)return;const t=Ja(e);if(!t){ce("GPS-Punkt nicht gefunden.","warning");return}const a=`${t.latitude}, ${t.longitude}`;try{await Wc(a),ce("Koordinaten in die Zwischenablage kopiert.","success")}catch(n){console.error("clipboard error",n),ce("Koordinaten konnten nicht kopiert werden.","danger",7e3)}}async function Qc(e,t){const a=(e||"").trim();if(!a){Ut(t,{status:"error",id:"",message:"Ungültige GPS-Anfrage ohne ID."});return}if(Ue(j().app)!=="ok"){ce("GPS-Modul ist ohne aktive SQLite-Datenbank nicht verfügbar.","warning",6e3),Ut(t,{status:"error",id:a,message:"GPS-Modul ist derzeit nicht verfügbar."});return}const r=Ja(a);if(!r){ce("Verknüpfter GPS-Punkt wurde nicht gefunden.","warning",6e3),Ut(t,{status:"error",id:a,message:"Verknüpfter GPS-Punkt wurde nicht gefunden."});return}Ut(t,{status:"pending",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wird aktiviert...`});try{await Es(r.id),ce(`"${r.name||"Ohne Namen"}" wurde aus der Historie aktiviert.`,"success"),Ne(`Aus Historie aktiviert: ${r.name||r.id}`),Ut(t,{status:"success",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wurde aktiviert.`})}catch(i){const l=i instanceof Error?i.message:"GPS-Punkt konnte nicht aktiviert werden.";ce(l,"danger",7e3),Ne(`Aktivierung aus Historie fehlgeschlagen: ${l}`),Ut(t,{status:"error",id:r.id,name:r.name,message:l})}}async function Jc(){try{await Fo(),Ne("Aktiver GPS-Punkt synchronisiert."),ce("Aktiver GPS-Punkt wurde synchronisiert.","success")}catch(e){const t=e instanceof Error?e.message:"Aktiver GPS-Punkt konnte nicht ermittelt werden.";ce(t,"danger",7e3),Ne(`Sync fehlgeschlagen: ${t}`)}}function Yc(){if(!A?.formFields)throw new Error("Formular nicht initialisiert");const e=A.formFields.name?.value.trim()||"",t=A.formFields.description?.value.trim()||"",a=A.formFields.source?.value.trim()||"",n=Number(A.formFields.latitude?.value),r=Number(A.formFields.longitude?.value),i=!!A.formFields.activate?.checked;if(!e)throw new Error("Name darf nicht leer sein.");if(!Number.isFinite(n)||!Number.isFinite(r))throw new Error("Koordinaten sind ungültig.");return{name:e,description:t,latitude:n,longitude:r,source:a,activate:i}}async function Xc(e){if(e.preventDefault(),_a.isLocked()){ce("Speichern läuft bereits ...","info");return}try{const t=Yc();if(Fc(t.latitude,t.longitude)){ce("Ein GPS-Punkt mit identischen Koordinaten ist bereits vorhanden.","warning",6e3);return}ea(j().gps,Ue(j().app)),await To({name:t.name,description:t.description||null,latitude:t.latitude,longitude:t.longitude,source:t.source||null},{activate:t.activate}),F.success(`GPS-Punkt "${t.name}" gespeichert.`),Ne(`GPS-Punkt gespeichert${t.activate?" und aktiv gesetzt":""}: ${t.name}`),A?.form?.reset()}catch(t){const a=t instanceof Error?t.message:"GPS-Punkt konnte nicht gespeichert werden.";F.error(a),Ne(`Speichern fehlgeschlagen: ${a}`)}finally{ea(j().gps,Ue(j().app))}}function ed(){if(A?.formFields){if(!navigator.geolocation){F.warning("Geolocation wird von diesem Browser nicht unterstützt.");return}if(_a.isLocked()){F.info("Bitte warten...");return}_a.acquire(async()=>(ea(j().gps,Ue(j().app)),new Promise(e=>{navigator.geolocation.getCurrentPosition(t=>{const{latitude:a,longitude:n}=t.coords;A?.formFields.latitude&&(A.formFields.latitude.value=a.toFixed(6)),A?.formFields.longitude&&(A.formFields.longitude.value=n.toFixed(6)),A?.formFields.source&&!A.formFields.source.value.trim()&&(A.formFields.source.value="Browser"),F.success("Koordinaten aus Browser-Position übernommen."),Ne("Browser-Geolocation übernommen"),Ta(),ea(j().gps,Ue(j().app)),e()},t=>{const a=t.code===t.PERMISSION_DENIED?"Zugriff auf Standort wurde verweigert.":"Geolocation konnte nicht ermittelt werden.";F.warning(a),Ne(`Geolocation fehlgeschlagen: ${a}`),ea(j().gps,Ue(j().app)),e()},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})})))}}function td(){A&&(A.root.addEventListener("click",e=>{const t=e.target;if(!t)return;const a=t.closest('[data-role="gps-tab"]');if(a&&a.dataset.tab){Ys(a.dataset.tab);return}const n=t.closest("[data-action]");if(!n||n.dataset.action==="")return;const i=n.closest("[data-point-id]")?.getAttribute("data-point-id")||"";switch(n.dataset.action){case"reload-points":Mr({notify:!0});break;case"sync-active":Jc();break;case"set-active":Uc(i);break;case"delete-point":Vc(i);break;case"copy-coords":Zc(i);break;case"use-geolocation":ed();break;case"apply-raw-coords":jc();break;case"verify-coords":Gc();break}}),A.form?.addEventListener("submit",e=>{Xc(e)}),A.form?.addEventListener("reset",()=>{window.setTimeout(()=>{Ta()},0)}),A.formFields.latitude?.addEventListener("input",()=>{Ta()}),A.formFields.longitude?.addEventListener("input",()=>{Ta()}))}function ad(e,t){if(!e||Xi)return;Xi=!0;const a=e;a.innerHTML="";const n=Mc();a.appendChild(n),A=Cc(n),ts?.(),ts=Fs({section:"gps",event:"gps:data-changed",shouldHandleEvent:()=>Ue(t.state.getState().app)==="ok",shouldRefresh:()=>Ue(t.state.getState().app)==="ok",onRefresh:()=>Mr({notify:!1}),onStatusChange:l=>qc(l)}),Pe=0,Zt?.destroy(),Zt=null,Pr=null,td(),Ys(Qs),typeof t.events?.subscribe=="function"&&t.events.subscribe("gps:set-active-from-history",l=>{let o="";if(l&&typeof l=="object"&&(o=String(l.id||"").trim()),!o){ce("Historische GPS-Anfrage ohne gültige ID erhalten.","warning",6e3);return}Qc(o,t)});const r=t.state.getState();La=r.gps.activePointId;const i=(l,o)=>{const d=Ue(l.app),p=l.gps;if(Hc(d),ai(l,d),ea(p,d),Ic(l),d==="ok"&&!p.initialized&&!p.pending&&Mr({notify:!1}),d==="ok"&&es!=="ok"&&p.initialized&&ce("GPS-Bereich ist wieder verfügbar.","success"),es=d,l.gps.activePointId!==La&&(La=l.gps.activePointId,typeof t.events?.emit=="function")){const u=Ja(La);t.events.emit("gps:active-point-changed",{id:La,point:u})}l.gps.lastError&&l.gps.lastError!==o.gps.lastError&&(ce(l.gps.lastError,"danger",7e3),Ne(`Fehler: ${l.gps.lastError}`))};t.state.subscribe(i),i(r,r)}let qe=[],He=[],Cr=!1,kn=null;async function lt(){try{const[e,t]=await Promise.all([Ro({limit:100}),Ko({limit:100})]);qe=e.items||[],He=t.items||[],$n("savedCodes:changed",{eppoCount:qe.length,bbchCount:He.length})}catch(e){console.error("Failed to load saved codes:",e),qe=[],He=[]}}function nd(){const e=qe.length>0,t=He.length>0;return`
    <div class="row g-4">
      <!-- EPPO Codes Section -->
      <div class="col-lg-6">
        <div class="card card-dark codes-card h-100">
          <div class="card-header codes-card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="bi bi-flower1 me-2 text-success"></i>
              Kulturen (EPPO-Codes)
            </h5>
            <span class="badge badge-psm-neutral">${qe.length} gespeichert</span>
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
                  <span class="badge bg-success ms-2">${qe.length}</span>
                </h6>
                <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${Ir()}
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
            <span class="badge badge-psm-neutral">${He.length} gespeichert</span>
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
                  <span class="badge bg-info ms-2">${He.length}</span>
                </h6>
                <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${Br()}
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
  `}function Ir(){return qe.length?qe.map(e=>`
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
    `}function Br(){return He.length?He.map(e=>`
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
    `}function ct(e){const t=e.querySelector('[data-role="saved-eppo-list"]'),a=qe.length>0;if(t){const o=t.closest(".border-top");o&&a&&(o.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Kulturen
            <span class="badge bg-success ms-2">${qe.length}</span>
          </h6>
          <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Ir()}
          </div>
        `)}else if(a){const o=e.querySelector(".codes-card:first-child .border-top.pt-3.mb-3");o&&(o.innerHTML=`
        <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
          <i class="bi bi-bookmark-star me-1"></i>
          Meine Kulturen
          <span class="badge bg-success ms-2">${qe.length}</span>
        </h6>
        <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
          ${Ir()}
        </div>
      `)}const n=e.querySelector('[data-role="saved-bbch-list"]'),r=He.length>0;if(n){const o=n.closest(".border-top");o&&r&&(o.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${He.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Br()}
          </div>
        `)}else if(r){const d=e.querySelectorAll(".codes-card")[1];if(d){const p=d.querySelector(".border-top.pt-3.mb-3");p&&(p.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${He.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Br()}
          </div>
        `)}}const i=e.querySelector(".codes-card:first-child .card-header .badge"),l=e.querySelector(".codes-card:last-child .card-header .badge");i&&(i.textContent=`${qe.length} gespeichert`),l&&(l.textContent=`${He.length} gespeichert`)}function rd(e){const t=e.querySelector('[data-input="eppo-search"]'),a=e.querySelector('[data-role="eppo-search-results"]');if(t&&a){const o=gi(async()=>{const d=t.value.trim();if(d.length<2){a.innerHTML="";return}try{const p=await Oo(d,10);if(!p.length){a.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${b(d)}"</div>
          `;return}a.innerHTML=p.map(u=>`
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
        `).join("")}catch(p){console.error("EPPO search failed:",p),a.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);t.addEventListener("input",o)}const n=e.querySelector('[data-input="bbch-search"]'),r=e.querySelector('[data-role="bbch-search-results"]');if(n&&r){const o=gi(async()=>{const d=n.value.trim();if(d.length<1){r.innerHTML="";return}try{const p=await _o(d,10);if(!p.length){r.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${b(d)}"</div>
          `;return}r.innerHTML=p.map(u=>`
          <button type="button" class="list-group-item list-group-item-action d-flex align-items-start gap-2 py-2" 
                  data-action="select-bbch" 
                  data-code="${b(u.code)}" 
                  data-label="${b(u.label)}"
                  data-principal="${u.principalStage??""}"
                  data-secondary="${u.secondaryStage??""}">
            <strong class="text-info flex-shrink-0" style="min-width: 35px;">${b(u.code)}</strong>
            <span class="text-break" style="line-height: 1.4;">${b(u.label)}</span>
          </button>
        `).join("")}catch(p){console.error("BBCH search failed:",p),r.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);n.addEventListener("input",o)}e.dataset.codesClickBound!=="1"&&(e.dataset.codesClickBound="1",e.addEventListener("click",async o=>{const p=o.target.closest("[data-action]");if(!p)return;const u=p.dataset.action;if(u==="select-eppo"){const f=p.dataset.code||"",v=p.dataset.name||"",x=p.dataset.language||"",m=p.dataset.dtcode||"";if(!f||!v){console.warn("EPPO selection missing code or name");return}a&&(a.innerHTML=""),t&&(t.value="");const k=qe.find(S=>S.code.toUpperCase()===f.toUpperCase());if(k){const S=e.querySelector(`[data-eppo-id="${k.id}"]`);S&&(S.classList.add("flash-highlight"),setTimeout(()=>S.classList.remove("flash-highlight"),800));return}try{await nr({code:f,name:v,language:x||void 0,dtcode:m||void 0,isFavorite:!1});const S=Ze();await Qe(S),await lt(),ct(e)}catch(S){console.error("Failed to save EPPO from search:",S),alert("Speichern fehlgeschlagen")}}if(u==="select-bbch"){const f=p.dataset.code||"",v=p.dataset.label||"",x=p.dataset.principal,m=p.dataset.secondary,k=x?parseInt(x,10):void 0,S=m?parseInt(m,10):void 0;if(!f||!v){console.warn("BBCH selection missing code or label");return}r&&(r.innerHTML=""),n&&(n.value="");const D=He.find(I=>I.code===f);if(D){const I=e.querySelector(`[data-bbch-id="${D.id}"]`);I&&(I.classList.add("flash-highlight"),setTimeout(()=>I.classList.remove("flash-highlight"),800));return}try{await rr({code:f,label:v,principalStage:Number.isNaN(k)?void 0:k,secondaryStage:Number.isNaN(S)?void 0:S,isFavorite:!1});const I=Ze();await Qe(I),await lt(),ct(e)}catch(I){console.error("Failed to save BBCH from search:",I),alert("Speichern fehlgeschlagen")}}if(u==="toggle-favorite-eppo"){const f=p.dataset.id;if(!f)return;const v=qe.find(x=>x.id===f);if(!v)return;try{await nr({id:v.id,code:v.code,name:v.name,language:v.language,dtcode:v.dtcode,isFavorite:!v.isFavorite});const x=Ze();await Qe(x),await lt(),ct(e)}catch(x){console.error("Failed to toggle EPPO favorite:",x)}}if(u==="toggle-favorite-bbch"){const f=p.dataset.id;if(!f)return;const v=He.find(x=>x.id===f);if(!v)return;try{await rr({id:v.id,code:v.code,label:v.label,principalStage:v.principalStage,secondaryStage:v.secondaryStage,isFavorite:!v.isFavorite});const x=Ze();await Qe(x),await lt(),ct(e)}catch(x){console.error("Failed to toggle BBCH favorite:",x)}}if(u==="delete-eppo"){const f=p.dataset.id;if(!f||!confirm("EPPO-Code wirklich löschen?"))return;try{await qo({id:f});const v=Ze();await Qe(v),await lt(),ct(e)}catch(v){console.error("Failed to delete EPPO:",v)}}if(u==="delete-bbch"){const f=p.dataset.id;if(!f||!confirm("BBCH-Stadium wirklich löschen?"))return;try{await Ho({id:f});const v=Ze();await Qe(v),await lt(),ct(e)}catch(v){console.error("Failed to delete BBCH:",v)}}}));const i=e.querySelector('[data-form="add-eppo"]');i&&i.addEventListener("submit",async o=>{o.preventDefault();const d=e.querySelector('[data-input="eppo-code"]'),p=e.querySelector('[data-input="eppo-name"]'),u=e.querySelector('[data-input="eppo-favorite"]'),f=d?.value.trim(),v=p?.value.trim();if(!f||!v){alert("Bitte Code und Name eingeben");return}try{await nr({code:f,name:v,isFavorite:u?.checked||!1});const x=Ze();await Qe(x),await lt(),ct(e),d&&(d.value=""),p&&(p.value=""),u&&(u.checked=!1)}catch(x){console.error("Failed to save EPPO:",x),alert("Speichern fehlgeschlagen")}});const l=e.querySelector('[data-form="add-bbch"]');l&&l.addEventListener("submit",async o=>{o.preventDefault();const d=e.querySelector('[data-input="bbch-code"]'),p=e.querySelector('[data-input="bbch-label"]'),u=e.querySelector('[data-input="bbch-favorite"]'),f=d?.value.trim(),v=p?.value.trim();if(!f||!v){alert("Bitte Code und Bezeichnung eingeben");return}try{await rr({code:f,label:v,isFavorite:u?.checked||!1});const x=Ze();await Qe(x),await lt(),ct(e),d&&(d.value=""),p&&(p.value=""),u&&(u.checked=!1)}catch(x){console.error("Failed to save BBCH:",x),alert("Speichern fehlgeschlagen")}})}function id(e,t,a={}){if(!e||Cr)return;kn=e,Cr=!0,kn.innerHTML=`
    <div class="section-inner codes-manager">
      <h4 class="mb-3"><i class="bi bi-tags me-2"></i>EPPO & BBCH Codes</h4>
      ${nd()}
    </div>`;const n=kn.querySelector(".codes-manager");if(!n)return;rd(n);const r=async()=>{await lt(),ct(n)};t?.events?.subscribe?.("database:connected",()=>{r()}),t?.state?.getState?.().app?.hasDatabase&&r()}function sd(){Cr=!1,kn=null}let ns=!1,pt=null,Ma=null,Sn=null,Ca=null,Nt=null,Bn=null,mt=null,Ga=null,Nn=null,ft=null,Nr=null,dt=null,Me=new Set,Lt=null,ur=!1,pr=!1,ta=!1;const et=e=>je(e.mediums),En=25,mr=new Intl.NumberFormat("de-DE");let Be=0,Qt=null,Fr=null,Tr=null,ni=null;function od(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function ld(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`profile-${Date.now()}-${Math.random().toString(16).slice(2,10)}`}function eo(e){if(!Me.size)return;const t=new Set(et(e).map(n=>n.id));let a=!1;Me.forEach(n=>{t.has(n)||(Me.delete(n),a=!0)}),a&&(Me=new Set(Me))}function Fn(){pt&&pt.querySelectorAll('[data-role="profile-select"]').forEach(e=>{const t=e.dataset.mediumId;e.checked=!!(t&&Me.has(t))})}function Dt(e){const t=et(e).length,a=Me.size;let n="Noch keine Mittel ausgewählt.";t?a===t&&t>0?n=`${a} Mittel ausgewählt (alle).`:a>0&&(n=`${a} Mittel ausgewählt.`):n="Keine Mittel vorhanden.",Nr&&(Nr.textContent=n),dt&&(dt.disabled=t===0,dt.indeterminate=a>0&&a<t,dt.checked=t>0&&a===t)}function Ln(e){Lt=null,Bn&&Bn.reset(),Ga&&(Ga.value=""),mt&&(mt.value=""),ft&&(ft.textContent="Profil speichern"),Me=new Set,Fn(),Dt(e)}function cd(e,t){Lt=e.id,Ga&&(Ga.value=e.id),mt&&(mt.value=e.name,mt.focus()),ft&&(ft.textContent="Profil aktualisieren"),Me=new Set(e.mediumIds),Fn(),Dt(t)}function rs(e,t){if(ft){if(ft.disabled=e,e){ft.textContent=t||"Speichert...";return}ft.textContent=Lt?"Profil aktualisieren":"Profil speichern"}}function Tn(e,t){if(Ma){if(Ma.disabled=e,e){Ma.textContent=t||"Speichert...";return}Ma.textContent="Hinzufügen"}}async function dd(e,t,a){if(ta)return;const n=t.state.getState(),i=(et(n)[e]??null)?.id||null;ta=!0,Tn(!0);const l=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediums",d=>{const p=Ua(d),u=p.items.slice();return u.splice(e,1),{...p,items:u,totalCount:Math.min(p.totalCount,u.length),lastUpdatedAt:new Date().toISOString()}}),await qn({silent:!0})&&i&&t.events?.emit?.("mediums:data-changed",{action:"deleted",id:i})}finally{ta=!1,Tn(!1),a&&a.isConnected&&(a.disabled=!1,a.textContent=l??"Löschen")}}async function ud(e,t,a){const n=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediumProfiles",(r=[])=>r.filter(i=>i.id!==e.id)),Lt===e.id&&Ln(t.state.getState()),await qn({successMessage:"Profil gelöscht."})}finally{a&&(a.disabled=!1,a.textContent=n||"Löschen")}}function pd(e){if(!Nn)return;const t=Nn,a=e.mediumProfiles||[];if(!a.length){t.innerHTML=`
      <tr>
        <td colspan="3" class="text-center text-muted">Noch keine Profile erstellt.</td>
      </tr>
    `;return}const n=new Map(et(e).map(r=>[r.id,r]));t.innerHTML="",a.forEach(r=>{const i=document.createElement("tr"),l=r.mediumIds.map(d=>n.get(d)).filter(Boolean).map(d=>b(d.name)),o=l.length?l.join(", "):'<span class="text-muted">Keine gültigen Mittel</span>';i.innerHTML=`
      <td>${b(r.name)}</td>
      <td>${o}</td>
      <td>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-sm btn-outline-info" data-action="profile-edit" data-id="${b(r.id)}">Bearbeiten</button>
          <button class="btn btn-sm btn-outline-danger" data-action="profile-delete" data-id="${b(r.id)}">Löschen</button>
        </div>
      </td>
    `,t.appendChild(i)})}function md(e,t){if(ur||!e.mediumProfiles?.length)return;const a=new Set(et(e).map(i=>i.id));let n=!1;const r=e.mediumProfiles.map(i=>{const l=i.mediumIds.filter(o=>a.has(o));return l.length!==i.mediumIds.length?(n=!0,{...i,mediumIds:l,updatedAt:new Date().toISOString()}):i}).filter(i=>i.mediumIds.length?!0:(n=!0,!1));n&&(ur=!0,t.state.updateSlice("mediumProfiles",()=>r),ur=!1)}function to(e){if(!e)return Be=0,{start:0,end:0,total:0};const t=Math.max(Math.ceil(e/En),1);Be>=t&&(Be=t-1),Be<0&&(Be=0);const a=Be*En,n=Math.min(a+En,e);return{start:a,end:n,total:e}}function fd(){if(!Tr)return null;const e=Tr.querySelector('[data-role="mediums-pager"]');return e?((!Qt||Fr!==e)&&(Qt?.destroy(),Qt=Za(e,{onPrev:()=>gd(),onNext:()=>bd(),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Mittel...",empty:"Keine Mittel verfügbar"}}),Fr=e),Qt):null}function is(e){const t=fd();if(!t)return;const a=et(e).length;if(!a){Be=0,t.update({status:"disabled",info:"Noch keine Mittel gespeichert."});return}const{start:n,end:r}=to(a),i=`Mittel ${mr.format(n+1)}–${mr.format(r)} von ${mr.format(a)}`;t.update({status:"ready",info:i,canPrev:Be>0,canNext:r<a})}function gd(){if(Be===0)return;const e=ni?.state.getState();e&&(Be=Math.max(Be-1,0),ri(e))}function bd(){const e=ni?.state.getState();if(!e)return;const t=et(e).length;if(!t)return;const a=Math.max(Math.ceil(t/En)-1,0);Be>=a||(Be=Math.min(Be+1,a),ri(e))}function ri(e){if(!pt)return;eo(e);const t=new Map(e.measurementMethods.map(l=>[l.id,l])),a=et(e).length;if(!a){pt.innerHTML=`
      <tr>
        <td colspan="9" class="text-center text-muted">Noch keine Mittel gespeichert.</td>
      </tr>
    `,Dt(e),is(e);return}const{start:n,end:r}=to(a),i=et(e).slice(n,r);pt.innerHTML="",i.forEach((l,o)=>{const d=n+o,p=document.createElement("tr"),u=t.get(l.methodId),f=l.approval||l.zulassungsnummer,v=typeof f=="string"&&f.trim().length?b(f):"-",x=typeof l.wartezeit=="string"&&l.wartezeit.trim().length?b(l.wartezeit):typeof l.wartezeit=="number"?`${l.wartezeit} Tage`:"-",m=typeof l.wirkstoff=="string"&&l.wirkstoff.trim().length?b(l.wirkstoff):"-";p.innerHTML=`
      <td class="text-center">
        <input type="checkbox" class="form-check-input" data-role="profile-select" data-medium-id="${b(l.id)}" ${Me.has(l.id)?"checked":""} />
      </td>
      <td>${b(l.name)}</td>
      <td>${b(l.unit)}</td>
      <td>${b(u?u.label:l.method||l.methodId||"-")}</td>
      <td>${b(l.value!=null?String(l.value):"")}</td>
      <td>${v}</td>
      <td>${x}</td>
      <td>${m}</td>
      <td>
        <button class="btn btn-sm btn-danger" data-action="delete" data-index="${d}">Löschen</button>
      </td>
    `,pt?.appendChild(p)}),Dt(e),is(e)}function ss(e){if(!Ca)return;const t=new Set;Ca.innerHTML="",e.measurementMethods.forEach(a=>{const n=(a.label??"").toLowerCase(),r=(a.id??"").toLowerCase();if(n&&!t.has(n)){t.add(n);const i=document.createElement("option");i.value=a.label,Ca.appendChild(i)}if(r&&!t.has(r)){t.add(r);const i=document.createElement("option");i.value=a.id,Ca.appendChild(i)}})}function hd(e){const t=e.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t||`method-${Date.now()}-${Math.random().toString(16).slice(2,6)}`}function vd(e,t){if(!Sn)return null;const a=Sn.value.trim();if(!a)return window.alert("Bitte eine Methode angeben."),Sn.focus(),null;const n=e.measurementMethods.find(o=>o.label?.toLowerCase()===a.toLowerCase()||o.id?.toLowerCase()===a.toLowerCase());if(n)return n.id;const r=hd(a),i=e.fieldLabels?.calculation?.fields?.quantity?.unit||"Kiste",l={id:r,label:a,type:"factor",unit:i,requires:["areaHa"],config:{sourceField:"areaHa"}};return t.state.updateSlice("measurementMethods",o=>[...o,l]),r}async function qn(e){try{const t=Ze();return await Qe(t),e?.silent||window.alert(e?.successMessage??"Änderungen wurden gespeichert."),!0}catch(t){console.error("Fehler beim Speichern",t);const a=t instanceof Error?t.message:"Speichern fehlgeschlagen";return window.alert(a),!1}}function yd(e,t){const a=!!t.app?.hasDatabase,n=t.app?.activeSection==="settings";e.classList.toggle("d-none",!(a&&n))}function wd(e,t){if(!e||ns)return;const a=e;a.innerHTML="";const n=od();a.appendChild(n),Tr=n,ni=t,Be=0,Qt?.destroy(),Qt=null,Fr=null,pt=n.querySelector("#settings-mediums-table tbody"),Sn=n.querySelector('input[name="medium-method"]'),Ca=n.querySelector("#settings-method-options"),Nt=n.querySelector("#settings-medium-form"),Ma=Nt?Nt.querySelector('button[type="submit"]'):null,Bn=n.querySelector("#settings-profile-form"),mt=n.querySelector("#profile-name"),Ga=n.querySelector('input[name="profile-id"]'),Nn=n.querySelector("#settings-profile-table tbody"),ft=n.querySelector('[data-role="profile-submit"]'),Nr=n.querySelector('[data-role="profile-selection-summary"]'),dt=n.querySelector('[data-role="profile-select-all"]');let r=!1,i=!1;function l(u){if(n.querySelectorAll("[data-settings-tab]").forEach(f=>{const v=f.dataset.settingsTab===u;f.classList.toggle("active",v)}),n.querySelectorAll("[data-pane]").forEach(f=>{const v=f.dataset.pane===u;f.style.display=v?"block":"none"}),u==="gps"&&!r){const f=n.querySelector('[data-feature="gps-embedded"]');f&&(ad(f,t),r=!0)}if(u==="codes"&&!i){const f=n.querySelector('[data-feature="codes-embedded"]');f&&(sd(),id(f,{state:t.state,events:{subscribe:t.events?.subscribe}},{}),i=!0)}}n.querySelectorAll("[data-settings-tab]").forEach(u=>{u.addEventListener("click",()=>{const f=u.dataset.settingsTab;f&&l(f)})});async function o(){if(!Nt||ta)return;const u=t.state.getState(),f=new FormData(Nt),v=(f.get("medium-name")||"").toString().trim(),x=(f.get("medium-unit")||"").toString().trim(),m=f.get("medium-value"),k=Number(m),S=(f.get("medium-approval")||"").toString().trim(),D=f.get("medium-wartezeit"),I=D?Number(D):null,Q=(f.get("medium-wirkstoff")||"").toString().trim()||null;if(!v||!x||Number.isNaN(k)){window.alert("Bitte alle Felder korrekt ausfüllen.");return}const W=vd(u,t);if(!W)return;const me=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`medium-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,N={id:me,name:v,unit:x,methodId:W,value:k,zulassungsnummer:S||null,wartezeit:I!=null&&!Number.isNaN(I)?I:null,wirkstoff:Q};ta=!0,Tn(!0,"Speichere...");try{t.state.updateSlice("mediums",q=>{const L=Ua(q),$=[...L.items,N];return{...L,items:$,totalCount:$.length,lastUpdatedAt:new Date().toISOString()}}),ss(t.state.getState()),await qn({successMessage:"Mittel gespeichert.",silent:!0})&&(Nt.reset(),t.events?.emit?.("mediums:data-changed",{action:"created",id:me}))}finally{ta=!1,Tn(!1)}}Nt?.addEventListener("submit",u=>{u.preventDefault(),o()}),pt?.addEventListener("click",u=>{const f=u.target?.closest('[data-action="delete"]');if(!f)return;const v=Number(f.dataset.index);Number.isNaN(v)||dd(v,t,f)}),pt?.addEventListener("change",u=>{const f=u.target;if(!f||f.dataset.role!=="profile-select")return;const v=f.dataset.mediumId;if(!v)return;f.checked?Me.add(v):Me.delete(v);const x=t.state.getState();Dt(x)}),dt?.addEventListener("change",()=>{const u=t.state.getState();dt&&(dt.indeterminate=!1,dt.checked?Me=new Set(et(u).map(f=>f.id)):Me=new Set,Fn(),Dt(u))});const d=async()=>{if(!mt)return;const u=mt.value.trim();if(!u){window.alert("Bitte einen Profilnamen eingeben."),mt.focus();return}if(!Me.size){window.alert("Bitte mindestens ein Mittel auswählen.");return}const f=t.state.getState();if(f.mediumProfiles?.some(S=>S.name.toLowerCase()===u.toLowerCase()&&S.id!==Lt)){window.alert("Ein Profil mit diesem Namen existiert bereits.");return}const x=et(f).filter(S=>Me.has(S.id)).map(S=>S.id);if(!x.length){window.alert("Ausgewählte Mittel sind nicht mehr verfügbar. Bitte Auswahl prüfen."),eo(f),Fn(),Dt(f);return}if(pr)return;const m=!!Lt;pr=!0,rs(!0,m?"Aktualisiere...":"Speichere...");const k=new Date().toISOString();try{if(Lt)t.state.updateSlice("mediumProfiles",(D=[])=>D.map(I=>I.id===Lt?{...I,name:u,mediumIds:x,updatedAt:k}:I));else{const D={id:ld(),name:u,mediumIds:x,createdAt:k,updatedAt:k};t.state.updateSlice("mediumProfiles",(I=[])=>[...I,D])}await qn({successMessage:m?"Profil aktualisiert und gespeichert.":"Profil gespeichert."})&&Ln(t.state.getState())}finally{pr=!1,rs(!1)}};Bn?.addEventListener("submit",u=>{u.preventDefault(),d()}),Nn?.addEventListener("click",u=>{const f=u.target?.closest('[data-action^="profile-"]');if(!f)return;const v=f.dataset.id;if(!v)return;const x=t.state.getState();if(f.dataset.action==="profile-edit"){const m=x.mediumProfiles?.find(k=>k.id===v);m&&cd(m,x);return}if(f.dataset.action==="profile-delete"){const m=x.mediumProfiles?.find(k=>k.id===v);if(!m||!window.confirm(`Profil "${m.name}" wirklich löschen?`))return;ud(m,t,f)}}),n.querySelector('[data-action="profile-reset"]')?.addEventListener("click",()=>{Ln(t.state.getState())}),Ln(t.state.getState());const p=u=>{md(u,t),yd(n,u),u.app.activeSection==="settings"&&(ri(u),ss(u),pd(u),Dt(u))};t.state.subscribe(p),p(t.state.getState()),ns=!0}const Da=e=>b(e),fr=(e,t=1)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function aa(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function xd(e){if(!e)return"";const t=new Date(e);if(Number.isNaN(t.getTime()))return b(e);const a=Math.round((t.getTime()-Date.now())/864e5);return a<0?`<span style="color:#ef4444;">${aa(e)} · abgelaufen</span>`:a<180?`<span style="color:#f59e0b;">${aa(e)} · ${a} T</span>`:`<span class="calc-hint">${aa(e)}</span>`}function kd(){return`
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
    </section>`}function Sd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=kd();const a=e.querySelector('[data-role="lager-uebersicht"]'),n=e.querySelector('[data-role="lager-bewegungen"]'),r=e.querySelector('[data-role="lager-form"]'),i=e.querySelector("#lager-mittel-options"),l=e.querySelector('[data-role="lager-empty"]'),o=new Map,d=x=>{if(a){if(!x.length){a.innerHTML='<tr><td colspan="6" class="calc-hint" style="padding:14px;">Noch keine Mittel. Erfasse unten einen Zugang oder dokumentiere Anwendungen in „Neu erfassen".</td></tr>';return}a.innerHTML=x.map(m=>{const k=m.bestand<0?"#ef4444":m.bestand===0?"#f59e0b":"inherit",S=b(m.einheit||"");return`<tr>
          <td><span class="fw-semibold">${b(m.name)}</span>${m.kennr?`<span class="d-block calc-hint">${b(m.kennr)}</span>`:""}</td>
          <td class="calc-hint">${b(m.wirkstoff||"")}</td>
          <td class="text-end">${fr(m.verbraucht)} ${S}<span class="d-block calc-hint">${m.anwendungen} Anw.</span></td>
          <td class="text-end fw-semibold" style="color:${k};">${fr(m.bestand)} ${S}</td>
          <td>${xd(m.zulEnde)}</td>
          <td class="calc-hint">${m.naechsterAblauf?aa(m.naechsterAblauf):""}</td>
        </tr>`}).join("")}},p=x=>{if(n){if(!x.length){n.innerHTML='<div class="calc-hint">Keine Bewegungen erfasst.</div>';return}n.innerHTML=x.map(m=>`
        <div class="d-flex align-items-center gap-2 py-1" style="border-bottom:1px solid var(--border-1);">
          <span class="badge" style="background:${m.typ==="zugang"?"#16a34a":"#64748b"};">${b(m.typ)}</span>
          <span class="flex-grow-1">${b(m.mittelName)} · <b>${fr(m.menge)} ${b(m.einheit||"")}</b>${m.charge?` · Charge ${b(m.charge)}`:""}<span class="d-block calc-hint">${aa(m.datum)}${m.lieferant?" · "+b(m.lieferant):""}${m.ablauf?" · Ablauf "+aa(m.ablauf):""}</span></span>
          <button class="btn btn-sm" style="color:#ef4444;border:1px solid var(--border-1);background:transparent;" data-del="${Da(m.id)}" title="Löschen">×</button>
        </div>`).join(""),n.querySelectorAll("[data-del]").forEach(m=>{m.addEventListener("click",async()=>{const k=m.getAttribute("data-del")||"";try{await Go({id:k}),await Ye().catch(()=>{}),await f()}catch{F.warning("Löschen fehlgeschlagen.")}})})}},u=()=>{i&&(i.innerHTML=Array.from(o.entries()).sort((x,m)=>x[0].localeCompare(m[0],"de")).map(([x,m])=>`<option value="${Da(x)}" data-kennr="${Da(m.kennr||"")}" data-einheit="${Da(m.einheit||"")}" data-wirkstoff="${Da(m.wirkstoff||"")}"></option>`).join(""))},f=async()=>{if(pe()!=="sqlite"){l&&(l.textContent="Bitte zuerst eine Datenbank öffnen.");return}try{const[x,m,k]=await Promise.all([Ls(),jo(),Ds()]);d(x?.rows||[]),p(m?.rows||[]),o.clear(),(k?.rows||[]).forEach(S=>{S.name&&o.set(S.name,{kennr:S.kennr??null,einheit:S.einheit??null,wirkstoff:S.wirkstoff??null})}),(x?.rows||[]).forEach(S=>{S.name&&!o.has(S.name)&&o.set(S.name,{kennr:S.kennr??null,einheit:S.einheit??null,wirkstoff:S.wirkstoff??null})}),u()}catch(x){console.warn("[Lager] Laden fehlgeschlagen:",x)}};r?.addEventListener("submit",async x=>{if(x.preventDefault(),pe()!=="sqlite"){F.warning("Bitte zuerst eine Datenbank öffnen.");return}const m=new FormData(r),k=String(m.get("mittel")||"").trim(),S=Number(String(m.get("menge")||"").replace(",","."));if(!k||!Number.isFinite(S)){F.warning("Mittel und Menge angeben.");return}const D=String(m.get("preis")||"").trim();try{await Wo({mittelName:k,kennr:String(m.get("kennr")||"").trim()||null,wirkstoff:o.get(k)?.wirkstoff||null,typ:String(m.get("typ")||"zugang"),menge:S,einheit:String(m.get("einheit")||"").trim()||null,datum:String(m.get("datum")||"").trim()||null,charge:String(m.get("charge")||"").trim()||null,ablauf:String(m.get("ablauf")||"").trim()||null,lieferant:String(m.get("lieferant")||"").trim()||null,preis:D?Number(D.replace(",",".")):null}),await Ye().catch(()=>{}),r.reset(),F.success("Bewegung gespeichert."),await f()}catch{F.warning("Speichern fehlgeschlagen.")}});const v=e.querySelector('[name="mittel"]');v?.addEventListener("change",()=>{const x=o.get(v.value);if(!x)return;const m=e.querySelector('[name="einheit"]'),k=e.querySelector('[name="kennr"]');m&&x.einheit&&(m.value=x.einheit),k&&x.kennr&&(k.value=x.kennr)}),t.state.subscribe(x=>{x?.app?.activeSection==="lager"&&f()}),f()}const Hn={mechanisch:{label:"Mechanisch",icon:"bi-tools",color:"#2563eb"},chemisch_psm:{label:"Pflanzenschutz",icon:"bi-droplet-half",color:"#dc2626"},duengung:{label:"Düngung",icon:"bi-flower1",color:"#b45309"},nuetzlinge:{label:"Nützlinge",icon:"bi-bug",color:"#7c3aed"},bewaesserung:{label:"Bewässerung",icon:"bi-moisture",color:"#0891b2"},monitoring:{label:"Monitoring",icon:"bi-eye",color:"#475569"},sonstiges:{label:"Sonstiges",icon:"bi-three-dots",color:"#64748b"}},Ed=["mechanisch","chemisch_psm","duengung","nuetzlinge","bewaesserung","monitoring","sonstiges"];function ao(e){return Hn[e]||Hn.sonstiges}const Ld={geplant:{label:"geplant",color:"#64748b"},aktiv:{label:"aktiv",color:"#16a34a"},abgeschlossen:{label:"abgeschlossen",color:"#94a3b8"}},qt=["#16a34a","#0891b2","#7c3aed","#d97706","#dc2626","#0d9488","#65a30d","#db2777"],Dd=/^#[0-9a-fA-F]{3,8}$/;function no(e){return typeof e=="string"&&Dd.test(e.trim())?e.trim():null}function qa(e,t=0){return no(e&&e.color)||qt[t%qt.length]}function tt(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function Ee(e){if(!e)return NaN;const t=String(e).slice(0,10).replace(/-/g,""),a=Number(t);return Number.isFinite(a)?a:NaN}function Ia(e){const t=[...e||[]].sort((i,l)=>(Ee(i.pflanzDatum)||0)-(Ee(l.pflanzDatum)||0)),a=Number(tt().replace(/-/g,""));let n=t.find(i=>i.status==="aktiv")||null;if(!n){const i=t.filter(l=>l.status!=="abgeschlossen"&&Ee(l.pflanzDatum)<=a&&(!l.ernteDatum||Ee(l.ernteDatum)>=a));n=i.length?i[i.length-1]:null}let r=t.filter(i=>i!==n&&i.status!=="abgeschlossen"&&Ee(i.pflanzDatum)>a).sort((i,l)=>(Ee(i.pflanzDatum)||0)-(Ee(l.pflanzDatum)||0))[0]||null;return r||(r=t.filter(i=>i!==n&&i.status==="geplant").sort((i,l)=>(Ee(i.pflanzDatum)||0)-(Ee(l.pflanzDatum)||0))[0]||null),{current:n,next:r,all:t}}const ro=["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];function io(e,t){const a=[];let n=e.getFullYear(),r=e.getMonth();const i=t.getFullYear(),l=t.getMonth();let o=0;for(;(n<i||n===i&&r<=l)&&o<60;)a.push({y:n,m:r}),r++,r>11&&(r=0,n++),o++;return a}function Ke(e,t){if(!t||!e.length)return null;const a=new Date(String(t).slice(0,10)+"T00:00:00");if(isNaN(a.getTime()))return null;const n=e.length,r=a.getFullYear()*12+a.getMonth(),i=e[0].y*12+e[0].m,l=e[n-1].y*12+e[n-1].m;if(r<i)return 0;if(r>l)return 1;const o=r-i,d=new Date(a.getFullYear(),a.getMonth()+1,0).getDate();return(o+(a.getDate()-1)/d)/n}const $d={anzucht:{label:"Anzucht (vorziehen)",short:"Anzucht"},direkt:{label:"Direktsaat",short:"Direkt"}},Ad=["Pflanzen","m²","Beete","lfd. m","g Saatgut"];function ut(e,t){if(!e)return null;const a=new Date(String(e).slice(0,10)+"T00:00:00");return isNaN(a.getTime())?null:(a.setDate(a.getDate()+Math.round(Number(t)||0)),a.getFullYear()+"-"+String(a.getMonth()+1).padStart(2,"0")+"-"+String(a.getDate()).padStart(2,"0"))}function zd(e,t,a){if(!e||!a)return{};const r=(e.anbauMethode==="anzucht"?"anzucht":"direkt")==="anzucht"&&Number(e.anzuchtTage)||0,i=Number(e.kulturTage)||0,l=Number(e.ernteTage)||0;let o;t==="aussaat"?o=ut(a,r):t==="ernte"?o=i?ut(a,-i):a:o=a;const d=ut(o,-r),p=i?ut(o,i):null,u=p?ut(p,l):null;return{aussaatDatum:d,pflanzDatum:o,ernteVon:p,ernteBis:u}}function Pd(e,t){return e?{aussaatDatum:ut(e.aussaatDatum,t),pflanzDatum:ut(e.pflanzDatum,t),ernteVon:ut(e.ernteVon,t),ernteBis:ut(e.ernteBis,t)}:{}}function gn(e,t){if(!t||!Array.isArray(e))return null;const a=String(t).trim().toLowerCase();return a&&(e.find(n=>String(n.name||"").trim().toLowerCase()===a)||e.find(n=>{const r=String(n.name||"").trim().toLowerCase();return r&&(r.startsWith(a)||a.startsWith(r))}))||null}const kt=["#ef4444","#3b82f6","#a855f7","#f59e0b","#06b6d4","#ec4899","#84cc16","#14b8a6"],Md=()=>({bedW:1.2,pathW:.4,rowSp:.5,inRowSp:.4,angle:0}),ee=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";let te=null,Se=null,_=null,bn=!1,Ft=[];function os(){if(!_)return 1;const e=_.getCenter().lat;return 156543.03392*Math.cos(e*Math.PI/180)/Math.pow(2,_.getZoom())}function Cd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Id();const a=[];let n=null;const r=new Map;let i=null,l=null,o={sat:null,osm:null},d=!0,p=!0,u=[];function f(s){const c=u.filter(y=>String(y.flaecheId)===String(s.id)),g=Ia(c).current;return g&&g.kultur?{name:g.kultur,color:qa(g)}:s.kultur?{name:s.kultur,color:null}:null}function v(){const s=[];if(a.forEach(y=>{const h=y.latlngs||[];if(h.length<3)return;const C=h.map(de=>[Number(de[1]),Number(de[0])]),M=C[0],J=C[C.length-1];(M[0]!==J[0]||M[1]!==J[1])&&C.push([M[0],M[1]]),s.push({type:"Feature",geometry:{type:"Polygon",coordinates:[C]},properties:{name:y.name||"",kultur:y.kultur||null,eppoCode:y.eppoCode||null,flaeche_m2:Math.round(y.result?.areaM2||0),flaeche_ha:Number(((y.result?.areaM2||0)/1e4).toFixed(4)),beete:y.result?.beds?.length||0,beetmeter_m:Math.round(y.result?.bedMeters||0),pflanzen:y.result?.plants||0,bettbreite_m:y.params?.bedW??null,wegbreite_m:y.params?.pathW??null,reihenabstand_m:y.params?.rowSp??null,pflanzabstand_m:y.params?.inRowSp??null,ausrichtung_grad:y.params?.angle??null}})}),(je(t.state.getState().gps?.points)||[]).forEach(y=>{const h=Number(y.latitude),C=Number(y.longitude);if(!Number.isFinite(h)||!Number.isFinite(C))return;const M=Number(y.nutzflaecheQm);s.push({type:"Feature",geometry:{type:"Point",coordinates:[C,h]},properties:{name:y.name||"Standort",typ:"standort",flaeche_m2:Number.isFinite(M)&&M>0?Math.round(M):null,kind:y.kind||null}})}),!s.length){F.warning("Keine Flächen oder Standorte zum Exportieren.");return}const g={type:"FeatureCollection",name:"PSM Acker-Planer",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:s};try{const y=new Blob([JSON.stringify(g,null,2)],{type:"application/geo+json"}),h=URL.createObjectURL(y),C=document.createElement("a");C.href=h,C.download="acker-flaechen.geojson",document.body.appendChild(C),C.click(),C.remove(),setTimeout(()=>URL.revokeObjectURL(h),1e3),F.success(`${s.length} Objekt(e) als GeoJSON exportiert.`)}catch(y){console.error("[Acker] GeoJSON-Export fehlgeschlagen",y),F.error("Export fehlgeschlagen.")}}function x(){if(!te||!i)return;i.clearLayers(),(je(t.state.getState().gps?.points)||[]).forEach(c=>{const g=Number(c.latitude),y=Number(c.longitude);if(!Number.isFinite(g)||!Number.isFinite(y))return;const h=Number(c.nutzflaecheQm),C=Number.isFinite(h)&&h>0?`${Math.round(h)} m²`:"",M=c.name||"Standort",J=te.marker([g,y],{icon:te.divIcon({className:"acker-standort",html:'<span class="acker-standort-dot"></span>',iconSize:[16,16],iconAnchor:[8,8]})});J.bindTooltip(`${b(M)}${C?" · "+C:""}`,{permanent:!0,direction:"top",className:"acker-standort-label",offset:[0,-9]});const de=[`<b>${b(M)}</b>`,C?`Fläche: ${C}`:"",c.kind?b(String(c.kind)):""].filter(Boolean).join("<br>");J.bindPopup(de),i.addLayer(J)})}const m=s=>e.querySelector(s),k=m('[data-role="acker-list"]'),S=m('[data-role="acker-empty"]'),D=m('[data-role="acker-totals"]'),I=m('[data-role="acker-map"]'),Q=s=>({id:s.id,name:s.name,kultur:s.kultur||null,eppoCode:s.eppoCode||null,standortId:s.standortId||null,color:s.color,latlngs:s.latlngs,areaQm:s.result?.areaM2||0,bedW:s.params.bedW,pathW:s.params.pathW,rowSp:s.params.rowSp,inRowSp:s.params.inRowSp,angle:s.params.angle,beds:s.result?.beds?.length||0,bedMeters:s.result?.bedMeters||0,plants:s.result?.plants||0}),W=(s,c=!1)=>{if(pe()!=="sqlite")return;const g=async()=>{try{const y=await Vo(Q(s));y?.id&&(s.id=y.id),await Ye().catch(()=>{})}catch(y){console.warn("[Acker] Speichern fehlgeschlagen:",y)}};if(c){g();return}clearTimeout(r.get(s._key)),r.set(s._key,setTimeout(g,600))};function me(s,c){const g=s.map(ot=>[ot[1],ot[0]]);if(g.length<3)return{areaM2:0,beds:[],bedMeters:0,plants:0};const y=g[0],h=g[g.length-1];if((y[0]!==h[0]||y[1]!==h[1])&&g.push(y.slice()),g.length<4)return{areaM2:0,beds:[],bedMeters:0,plants:0};let C;try{C=Se.polygon([g])}catch{return{areaM2:0,beds:[],bedMeters:0,plants:0}}const M=Se.area(C),J=c.bedW+c.pathW;if(J<=0||c.bedW<=0||c.rowSp<=0||c.inRowSp<=0)return{areaM2:M,beds:[],bedMeters:0,plants:0};const de=Se.centroid(C),ue=Se.transformRotate(C,-c.angle,{pivot:de}),ke=Se.bbox(ue),st=1/111320,Gt=J*st,po=c.bedW*st,ya=(ke[2]-ke[0])*.02+1e-4,oi=[];let li=0,ci=0,di=0;for(let ot=ke[1];ot<ke[3]&&di<4e3;ot+=Gt,di++){const ui=Math.min(ot+po,ke[3]),mo=Se.polygon([[[ke[0]-ya,ot],[ke[2]+ya,ot],[ke[2]+ya,ui],[ke[0]-ya,ui],[ke[0]-ya,ot]]]);let sn=null;try{sn=Se.intersect(ue,mo)}catch{sn=null}if(!sn)continue;let Yn;try{Yn=Se.transformRotate(sn,c.angle,{pivot:de})}catch{continue}const Xn=Se.area(Yn);if(Xn<Math.max(.4,c.bedW*.3))continue;const er=Xn/c.bedW,tr=Math.max(1,Math.floor(c.bedW/c.rowSp)),ar=Math.max(0,Math.floor(er/c.inRowSp));li+=er,ci+=tr*ar,oi.push({geo:Yn,lenM:er,rows:tr,perRow:ar,plants:tr*ar,areaM2:Xn})}return{areaM2:M,beds:oi,bedMeters:li,plants:ci}}const N=(s,c,g)=>({color:s.color,weight:c?3.5:2.5,fillColor:s.color,fillOpacity:g?0:c?.3:.18,dashArray:null}),re=(s,c,g)=>({color:"#ffffff",weight:g?1:.7,opacity:.9,fillColor:s.color,fillOpacity:g?.9:.78});function q(s){if(!p||s.bedsHidden)return!1;const c=os(),g=(s.params?.bedW||0)/c,y=(s.params?.pathW||0)/c,h=(s.params?.pathW||0)<=.001||y>=1.2;return g>=4&&h}function L(s){s.outline&&(_.removeLayer(s.outline),s.outline=null),s.bedsLayer&&(_.removeLayer(s.bedsLayer),s.bedsLayer=null),s.label&&l&&(l.removeLayer(s.label),s.label=null),oe(s)}function $(s){const c=!!s.editing;s.outline&&_.removeLayer(s.outline),s.bedsLayer&&(_.removeLayer(s.bedsLayer),s.bedsLayer=null),s.label&&l&&l.removeLayer(s.label),oe(s);const g=s._key===n,y=q(s);s._lastDetail=y,y&&(s.bedsLayer=te.layerGroup(),(s.result?.beds||[]).forEach((h,C)=>{const M=te.geoJSON(h.geo,{style:re(s,C,g),bubblingMouseEvents:!1});M.bindTooltip(`Beet ${C+1} · ${ee(h.lenM,1)} m · ${h.rows}×${ee(h.perRow)} = ${ee(h.plants)} Pfl.`,{sticky:!0}),M.on("click",()=>Z(s._key)),M.on("contextmenu",J=>w(s,J,C+1)),M.addTo(s.bedsLayer)}),s.bedsLayer.addTo(_)),s.outline=te.polygon(s.latlngs,{...N(s,g,y),className:g?"acker-outline-grab":"",bubblingMouseEvents:!1}).addTo(_),s.outline.on("click",()=>Z(s._key)),s.outline.on("dblclick",()=>Ce(s)),s.outline.on("contextmenu",h=>w(s,h)),s.outline.on("mousedown",h=>he(s,h)),Y(s,g),(g||c)&&ie(s)}function Y(s,c){if(!d||!l||!s.outline)return;let g;try{g=s.outline.getBounds().getCenter()}catch{return}const y=s.result?.plants||0,h=f(s),C=h?`<em class="cr" style="--cc:${b(h.color||"#16a34a")}"><span class="dot"></span>${b(h.name)}</em>`:"",M=`<div class="acker-flabel${c?" sel":""}" style="--fc:${s.color}"><b>${b(s.name||"")}</b>${C}<i>${ee(y)} Pfl.</i></div>`;s.label=te.marker(g,{interactive:!1,keyboard:!1,icon:te.divIcon({className:"acker-flabel-wrap",html:M,iconSize:[0,0]})}),l.addLayer(s.label)}function ie(s){oe(s),s.handles=s.latlngs.map((c,g)=>{const y=te.marker(c,{draggable:!0,icon:te.divIcon({className:"acker-vhandle"})}).addTo(_);return y.on("drag",h=>{s.latlngs[g]=[h.target.getLatLng().lat,h.target.getLatLng().lng],s.outline.setLatLngs(s.latlngs)}),y.on("dragend",()=>Oe(s)),y.on("contextmenu",h=>E(s,g,h)),y}),s.editing=!0}function oe(s){(s.handles||[]).forEach(c=>_.removeLayer(c)),s.handles=[],s.editing=!1}function ye(){a.forEach(s=>$(s))}function vt(){a.forEach(s=>{q(s)!==s._lastDetail&&$(s)})}function Re(s,c){s.color=c;try{s.outline?.setStyle({color:c,fillColor:c})}catch{}if(s.bedsLayer)try{s.bedsLayer.eachLayer(y=>y.setStyle&&y.setStyle({fillColor:c}))}catch{}try{const y=s.label?.getElement?.()?.querySelector?.(".acker-flabel");y&&y.style.setProperty("--fc",c)}catch{}const g=k?.querySelector(".acker-field.sel .acker-swatch");g&&(g.style.background=c)}function Ce(s){if(s.latlngs?.length)try{_.fitBounds(te.polygon(s.latlngs).getBounds(),{maxZoom:20,padding:[40,40]})}catch{}}function It(){const s=a.filter(c=>c.latlngs?.length>=3);if(!s.length){F.info("Keine Flächen vorhanden.");return}try{let c=te.polygon(s[0].latlngs).getBounds();s.slice(1).forEach(g=>{c=c.extend(te.polygon(g.latlngs).getBounds())}),_.fitBounds(c,{maxZoom:19,padding:[40,40]})}catch{}}function Oe(s){s.result=me(s.latlngs,s.params),$(s),ae(),W(s)}function oa(s){if(Xe("app",c=>({...c,activeSection:"kultur"})),s?.id)try{window.dispatchEvent(new CustomEvent("psm:openKultur",{detail:{typ:"acker",id:String(s.id)}}))}catch{}else F.info("Fläche wird gespeichert – in der Kulturführung gleich wählbar.")}let Ie=null;const yt=()=>{Ie&&(Ie.remove(),Ie=null,document.removeEventListener("pointerdown",Ya,!0),document.removeEventListener("keydown",Xa,!0))},Ya=s=>{Ie&&!Ie.contains(s.target)&&yt()},Xa=s=>{s.key==="Escape"&&yt()};function Vn(s,c){c.style.left="",c.style.right="",c.style.top="";const g=s.getBoundingClientRect(),y=c.getBoundingClientRect(),h=y.width||210,C=y.height||260;g.right+3+h>window.innerWidth-8&&(c.style.left="auto",c.style.right="calc(100% + 3px)");let M=-5;g.top+M+C>window.innerHeight-8&&(M=Math.min(-5,window.innerHeight-8-C-g.top)),g.top+M<8&&(M=8-g.top),c.style.top=M+"px"}function la(s,c){c.forEach(g=>{if(!g)return;if(g.sep){const h=document.createElement("div");h.className="acker-ctx-sep",s.appendChild(h);return}if(g.type==="swatchGrid"){const h=document.createElement("div");h.className="acker-ctx-swatches",g.colors.forEach(J=>{const de=document.createElement("button");de.type="button",de.className="acker-sw"+(J===g.current?" on":""),de.style.background=J,de.title=J,de.addEventListener("click",ue=>{ue.stopPropagation(),yt(),g.onPick(J)}),h.appendChild(de)});const C=document.createElement("label");C.className="acker-sw-custom",C.innerHTML=`<i class="bi bi-eyedropper"></i><input type="color" value="${g.current||"#3b82f6"}">`;const M=C.querySelector("input");M.addEventListener("input",J=>(g.onLive||g.onPick)(J.target.value)),M.addEventListener("change",J=>{g.onPick(J.target.value),yt()}),h.appendChild(C),s.appendChild(h);return}const y=document.createElement("button");if(y.type="button",y.className="acker-ctx-item"+(g.danger?" danger":"")+(g.submenu?" has-sub":"")+(g.disabled?" disabled":""),y.innerHTML=`<span class="ic">${g.icon||""}</span><span class="lb">${b(g.label)}</span>`+(g.right?`<span class="rt">${b(g.right)}</span>`:"")+(g.submenu?'<span class="ch"><i class="bi bi-chevron-right"></i></span>':""),g.submenu){const h=document.createElement("div");h.className="acker-ctx-sub",la(h,g.submenu),y.appendChild(h),y.addEventListener("pointerenter",()=>Vn(y,h))}else g.disabled||y.addEventListener("click",h=>{h.stopPropagation(),g.keepOpen||yt(),g.action?.()});s.appendChild(y)})}function ca(s,c,g,y){if(yt(),Ie=document.createElement("div"),Ie.className="acker-ctx",y){const J=document.createElement("div");J.className="acker-ctx-title",J.textContent=y,Ie.appendChild(J)}la(Ie,g),document.body.appendChild(Ie);const h=Ie.getBoundingClientRect();let C=s,M=c;C+h.width>window.innerWidth-8&&(C=Math.max(8,window.innerWidth-h.width-8)),M+h.height>window.innerHeight-8&&(M=Math.max(8,window.innerHeight-h.height-8)),Ie.style.left=C+"px",Ie.style.top=M+"px",setTimeout(()=>{document.addEventListener("pointerdown",Ya,!0),document.addEventListener("keydown",Xa,!0)},0)}const da=s=>{const c=s.originalEvent||s;return c&&te.DomEvent.preventDefault?.(c),s.originalEvent&&te.DomEvent.stop?.(s),{x:c.clientX,y:c.clientY}};function ua(s,c){s.params.angle=(Math.round(s.params.angle+c)%180+180)%180,Oe(s),F.info(`Beete-Ausrichtung: ${s.params.angle}°`)}function De(s){const c=s.latlngs||[];if(c.length<2||!Se)return;let g=-1,y=0;for(let h=0;h<c.length;h++){const C=c[h],M=c[(h+1)%c.length];try{const J=Se.point([C[1],C[0]]),de=Se.point([M[1],M[0]]),ue=Se.distance(J,de);ue>g&&(g=ue,y=Se.bearing(J,de))}catch{}}s.params.angle=(Math.round(y-90)%180+180)%180,Oe(s),F.success(`Beete an Fläche ausgerichtet (${s.params.angle}°).`)}function Bt(s,c){s.color=c,$(s),ae(),W(s)}function pa(s,c){s.kultur=c||null,s.eppoCode=Ft.find(g=>g.kultur===s.kultur)?.eppoCode||null,$(s),ae(),W(s),F.success(c?`Kultur: ${c}`:"Kultur entfernt.")}function Zn(s){s.bedsHidden=!s.bedsHidden,$(s),F.info(s.bedsHidden?"Beete ausgeblendet.":"Beete eingeblendet.")}function en(s){Z(s._key),setTimeout(()=>{const c=k?.querySelector(".acker-field.sel .acker-name");c&&(c.focus(),c.select())},30)}function Ve(s){const g=os()*18/111320,y={_key:"new-"+ ++Ae,id:null,name:(s.name||"Fläche")+" (Kopie)",kultur:s.kultur,eppoCode:s.eppoCode,standortId:s.standortId,color:kt[(kt.indexOf(s.color)+1)%kt.length],latlngs:s.latlngs.map(h=>[h[0]+g,h[1]+g]),params:{...s.params},outline:null,bedsLayer:null,label:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(y),n=y._key,Oe(y),W(y,!0),F.success("Fläche dupliziert.")}function tn(s){const c=s.latlngs||[];if(c.length<3){F.warning("Fläche hat keine Geometrie.");return}const g=c.map(h=>[Number(h[1]),Number(h[0])]);(g[0][0]!==g[g.length-1][0]||g[0][1]!==g[g.length-1][1])&&g.push([g[0][0],g[0][1]]);const y={type:"FeatureCollection",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:[{type:"Feature",geometry:{type:"Polygon",coordinates:[g]},properties:{name:s.name||"",kultur:s.kultur||null,eppoCode:s.eppoCode||null,flaeche_m2:Math.round(s.result?.areaM2||0),beete:s.result?.beds?.length||0,beetmeter_m:Math.round(s.result?.bedMeters||0),pflanzen:s.result?.plants||0}}]};try{const h=new Blob([JSON.stringify(y,null,2)],{type:"application/geo+json"}),C=URL.createObjectURL(h),M=document.createElement("a");M.href=C,M.download=`${(s.name||"flaeche").replace(/[^\w\-]+/g,"_")}.geojson`,document.body.appendChild(M),M.click(),M.remove(),setTimeout(()=>URL.revokeObjectURL(C),1e3),F.success("Fläche als GeoJSON exportiert.")}catch{F.error("Export fehlgeschlagen.")}}async function Qn(s){const c=s.result||{},g=[`Fläche: ${s.name||""}`,s.kultur?`Kultur: ${s.kultur}`:"",`Größe: ${ee(c.areaM2||0)} m² (${ee((c.areaM2||0)/1e4,3)} ha)`,`Beete: ${ee(c.beds?.length||0)}`,`Beetmeter: ${ee(c.bedMeters||0)} m`,`Pflanzen: ${ee(c.plants||0)}`].filter(Boolean).join(`
`);try{await navigator.clipboard.writeText(g),F.success("Werte kopiert.")}catch{F.warning("Kopieren nicht möglich.")}}const ma=s=>({icon:'<i class="bi bi-palette"></i>',label:"Farbe",submenu:[{type:"swatchGrid",colors:kt,current:s.color,onPick:c=>Bt(s,c),onLive:c=>Re(s,c)}]}),fa=s=>({icon:'<i class="bi bi-flower1"></i>',label:"Kultur zuweisen",submenu:[{icon:'<i class="bi bi-x"></i>',label:"– keine –",action:()=>pa(s,null)},...Ft.length?[{sep:!0}]:[],...Ft.map(c=>({icon:c.kultur===s.kultur?'<i class="bi bi-check2"></i>':"",label:`${c.kultur}${c.anbau?" ("+c.anbau+")":""}`,action:()=>pa(s,c.kultur)}))]});function w(s,c,g){Z(s._key);const{x:y,y:h}=da(c),C=!!s.editing;ca(y,h,[{icon:'<i class="bi bi-clipboard2-pulse"></i>',label:"Kulturführung öffnen",action:()=>oa(s)},{icon:'<i class="bi bi-pencil"></i>',label:"Umbenennen",action:()=>en(s)},fa(s),ma(s),{sep:!0},{icon:'<i class="bi bi-arrow-clockwise"></i>',label:"Beete drehen +15°",keepOpen:!0,action:()=>ua(s,15)},{icon:'<i class="bi bi-arrow-counterclockwise"></i>',label:"Beete drehen −15°",keepOpen:!0,action:()=>ua(s,-15)},{icon:'<i class="bi bi-bounding-box"></i>',label:"Beete an Fläche ausrichten",action:()=>De(s)},{icon:'<i class="bi bi-grid-3x3-gap"></i>',label:s.bedsHidden?"Beete einblenden":"Beete ausblenden",action:()=>Zn(s)},{icon:'<i class="bi bi-bounding-box-circles"></i>',label:C?"Eckpunkte fertig":"Eckpunkte bearbeiten",action:()=>{C?oe(s):ie(s)}},{sep:!0},{icon:'<i class="bi bi-copy"></i>',label:"Duplizieren",action:()=>Ve(s)},{icon:'<i class="bi bi-zoom-in"></i>',label:"Auf Fläche zoomen",action:()=>Ce(s)},{icon:'<i class="bi bi-clipboard-data"></i>',label:"Werte kopieren",action:()=>Qn(s)},{icon:'<i class="bi bi-download"></i>',label:"Als GeoJSON exportieren",action:()=>tn(s)},{sep:!0},{icon:'<i class="bi bi-trash"></i>',label:"Löschen",danger:!0,action:()=>U(s._key)}],g?`${s.name||"Fläche"} · Beet ${g}`:s.name||"Fläche")}function E(s,c,g){const{x:y,y:h}=da(g);ca(y,h,[{icon:'<i class="bi bi-node-minus"></i>',label:"Eckpunkt löschen",disabled:s.latlngs.length<=3,action:()=>{s.latlngs.length<=3||(s.latlngs.splice(c,1),Oe(s))}},{icon:'<i class="bi bi-check2"></i>',label:"Bearbeiten beenden",action:()=>oe(s)}],`Eckpunkt ${c+1}`)}function O(){!o.sat||!o.osm||(_.hasLayer(o.sat)?(_.removeLayer(o.sat),o.osm.addTo(_),F.info("Karte: OSM")):(_.removeLayer(o.osm),o.sat.addTo(_),F.info("Karte: Satellit")))}function T(s){const c=s.latlng,{x:g,y}=da(s);ca(g,y,[{icon:'<i class="bi bi-pencil-square"></i>',label:"Neue Fläche hier zeichnen",action:()=>{wt(!0),ba({latlng:c})}},{icon:'<i class="bi bi-crosshair"></i>',label:"Hierhin zentrieren",action:()=>_.panTo(c)},{sep:!0},{icon:'<i class="bi bi-arrows-fullscreen"></i>',label:"Alle Flächen anzeigen",disabled:!a.some(h=>h.latlngs?.length>=3),action:It},{icon:'<i class="bi bi-layers"></i>',label:"Kartentyp wechseln (Satellit/OSM)",action:O},{sep:!0},{icon:'<i class="bi bi-geo-alt"></i>',label:"Koordinaten kopieren",action:async()=>{try{await navigator.clipboard.writeText(`${c.lat.toFixed(6)}, ${c.lng.toFixed(6)}`),F.success("Koordinaten kopiert.")}catch{F.warning("Kopieren nicht möglich.")}}}],"Karte")}function z(s){return['<option value="">– Kultur –</option>'].concat(Ft.map(c=>{const g=`${c.kultur}${c.anbau?" ("+c.anbau+")":""}`;return`<option value="${b(c.kultur)}"${c.kultur===s?" selected":""}>${b(g)}</option>`})).join("")}function P(s){const c=je(t.state.getState().gps?.points)||[];return['<option value="">– Standort –</option>'].concat(c.map(g=>`<option value="${b(g.id)}"${g.id===s?" selected":""}>${b(g.name||"")}</option>`)).join("")}function B(s){const c=f(s);return c?`<span class="acker-cropchip" title="Kultur"><span class="dot" style="background:${b(c.color||"#94a3b8")}"></span>${b(c.name)}</span>`:""}function fe(){if(!D)return;let s=0,c=0,g=0,y=0;a.forEach(C=>{s+=C.result?.areaM2||0,c+=C.result?.beds?.length||0,g+=C.result?.bedMeters||0,y+=C.result?.plants||0});const h=(C,M)=>{const J=D.querySelector(C);J&&(J.textContent=M)};h('[data-t="area"]',ee(s)+" m² · "+ee(s/1e4,3)+" ha"),h('[data-t="beds"]',ee(c)),h('[data-t="meters"]',ee(g)+" m"),h('[data-t="plants"]',ee(y))}function be(s,c){const g=c.result||{},y=s.querySelector(".acker-stat");y&&(y.textContent=ee(g.plants||0)+" Pfl.");const h=s.querySelectorAll(".acker-res .r b");h[0]&&(h[0].textContent=ee(g.areaM2||0)+" m² · "+ee((g.areaM2||0)/1e4,3)+" ha"),h[1]&&(h[1].textContent=ee(g.beds?.length||0)),h[2]&&(h[2].textContent=ee(g.bedMeters||0)+" m"),h[3]&&(h[3].textContent=ee(g.plants||0)),fe()}function ae(){if(!k||!S||!D)return;S.style.display=a.length?"none":"block",D.style.display=a.length?"block":"none",k.innerHTML="";let s=0,c=0,g=0,y=0;a.forEach(h=>{s+=h.result?.areaM2||0,c+=h.result?.beds?.length||0,g+=h.result?.bedMeters||0,y+=h.result?.plants||0;const C=h._key===n,M=document.createElement("div");M.className="acker-field"+(C?" sel open":""),M.innerHTML=`
        <div class="acker-fhead">
          <span class="acker-swatch" style="background:${h.color}"></span>
          <input class="acker-name" value="${b(h.name)}" />
          ${B(h)}
          <span class="acker-stat">${ee(h.result?.plants||0)} Pfl.</span>
        </div>
        <div class="acker-fbody">
          <div class="acker-grid">
            <label class="acker-fld span2">Kultur<select data-k="kultur">${z(h.kultur)}</select></label>
            <label class="acker-fld span2">Standort (für PSM)<select data-k="standortId">${P(h.standortId)}</select></label>
            <label class="acker-fld">Bettbreite (m)<input data-k="bedW" type="number" step="0.05" min="0.1" value="${h.params.bedW}"/></label>
            <label class="acker-fld">Wegbreite (m)<input data-k="pathW" type="number" step="0.05" min="0" value="${h.params.pathW}"/></label>
            <label class="acker-fld">Reihenabstand (m)<input data-k="rowSp" type="number" step="0.05" min="0.05" value="${h.params.rowSp}"/></label>
            <label class="acker-fld">Pflanzabstand (m)<input data-k="inRowSp" type="number" step="0.05" min="0.05" value="${h.params.inRowSp}"/></label>
            <div class="acker-fld span2">
              <div class="acker-angle-head"><span>Ausrichtung der Beete: <b>${h.params.angle}°</b></span>
                <button class="acker-align" data-act="align" type="button" title="Beete parallel zur längsten Kante ausrichten"><i class="bi bi-bounding-box"></i> an Fläche</button>
              </div>
              <input data-k="angle" type="range" min="0" max="180" step="5" value="${h.params.angle}"/>
            </div>
          </div>
          <div class="acker-res">
            <div class="r"><span>Fläche</span><b>${ee(h.result?.areaM2||0)} m² · ${ee((h.result?.areaM2||0)/1e4,3)} ha</b></div>
            <div class="r"><span>Beete</span><b>${ee(h.result?.beds?.length||0)}</b></div>
            <div class="r"><span>Beetmeter</span><b>${ee(h.result?.bedMeters||0)} m</b></div>
            <div class="r"><span>Pflanzen</span><b>${ee(h.result?.plants||0)}</b></div>
          </div>
          <div class="acker-actions">
            <label class="acker-colorbtn" title="Farbe wählen"><input type="color" data-act="color" value="${h.color}"><i class="bi bi-palette"></i></label>
            <button class="btn btn-sm acker-abtn" data-act="zoom" title="Auf Fläche zoomen"><i class="bi bi-zoom-in"></i></button>
            <button class="btn btn-sm acker-abtn" data-act="dup" title="Duplizieren"><i class="bi bi-copy"></i></button>
            <button class="btn btn-sm acker-abtn" data-act="rot" title="Beete drehen +15°"><i class="bi bi-arrow-clockwise"></i></button>
            <span style="flex:1"></span>
            <button class="btn btn-sm acker-abtn danger" data-act="del" title="Löschen"><i class="bi bi-trash"></i></button>
          </div>
          <div class="acker-hint"><i class="bi bi-arrows-move"></i> Ausgewählte Fläche ziehen = verschieben · Rechtsklick = mehr Aktionen</div>
        </div>`,M.querySelector(".acker-fhead").addEventListener("click",ue=>{ue.target.classList.contains("acker-name")||Z(h._key)}),M.querySelector(".acker-name").addEventListener("input",ue=>{h.name=ue.target.value,W(h)}),M.querySelectorAll("[data-k]").forEach(ue=>{const ke=ue.dataset.k;if(ke==="kultur"){ue.addEventListener("input",st=>{h.kultur=st.target.value||null,h.eppoCode=Ft.find(Gt=>Gt.kultur===h.kultur)?.eppoCode||null,$(h),W(h)});return}if(ke==="standortId"){ue.addEventListener("input",st=>{h.standortId=st.target.value||null,W(h)});return}ue.addEventListener("input",st=>{if(ke==="angle"?h.params.angle=+st.target.value:h.params[ke]=parseFloat(st.target.value)||0,h.result=me(h.latlngs,h.params),$(h),be(M,h),ke==="angle"){const Gt=M.querySelector(".acker-angle-head b");Gt&&(Gt.textContent=h.params.angle+"°")}W(h)})}),M.querySelector('[data-act="align"]')?.addEventListener("click",()=>De(h)),M.querySelector('[data-act="del"]').addEventListener("click",()=>U(h._key)),M.querySelector('[data-act="zoom"]').addEventListener("click",()=>Ce(h)),M.querySelector('[data-act="dup"]').addEventListener("click",()=>Ve(h)),M.querySelector('[data-act="rot"]').addEventListener("click",()=>ua(h,15));const de=M.querySelector('[data-act="color"]');de.addEventListener("input",ue=>Re(h,ue.target.value)),de.addEventListener("change",ue=>Bt(h,ue.target.value)),k.appendChild(M)}),D.querySelector('[data-t="area"]').textContent=ee(s)+" m² · "+ee(s/1e4,3)+" ha",D.querySelector('[data-t="beds"]').textContent=ee(c),D.querySelector('[data-t="meters"]').textContent=ee(g)+" m",D.querySelector('[data-t="plants"]').textContent=ee(y)}function Z(s){n=s,a.forEach(c=>$(c)),ae()}async function U(s){const c=a.find(y=>y._key===s);if(!c)return;L(c);const g=a.findIndex(y=>y._key===s);if(g>=0&&a.splice(g,1),n===s&&(n=null),ae(),c.id&&pe()==="sqlite")try{await Uo({id:c.id}),await Ye().catch(()=>{})}catch{}}let G=null;function he(s,c){le||s._key!==n||(G={fl:s,lastLL:c.latlng,moved:!1},_.dragging.disable(),_.getContainer().style.cursor="grabbing",te.DomEvent.stop(c))}function we(s){if(!G)return;const c=G.fl;if(!G.moved){c.bedsLayer&&(_.removeLayer(c.bedsLayer),c.bedsLayer=null);try{c.outline.setStyle({fillOpacity:.3,dashArray:"6 5"})}catch{}}const g=s.latlng.lat-G.lastLL.lat,y=s.latlng.lng-G.lastLL.lng;G.lastLL=s.latlng,G.moved=!0,c.latlngs=c.latlngs.map(h=>[h[0]+g,h[1]+y]);try{c.outline.setLatLngs(c.latlngs)}catch{}if((c.handles||[]).forEach((h,C)=>{try{h.setLatLng(c.latlngs[C])}catch{}}),c.label)try{c.label.setLatLng(c.outline.getBounds().getCenter())}catch{}}function _e(){if(!G)return;const s=G.fl,c=G.moved;G=null,_.dragging.enable(),_.getContainer().style.cursor="",c&&Oe(s)}function H(s){if(se.length<3)return!1;const c=_.latLngToContainerPoint(te.latLng(se[0][0],se[0][1])),g=_.latLngToContainerPoint(s);return c.distanceTo(g)<=14}function ge(s){if(!Se||s.length<3)return 0;try{const c=s.map(g=>[g[1],g[0]]);return c.push(c[0]),Se.area(Se.polygon([c]))}catch{return 0}}function xe(s){const c=m('[data-role="acker-draw-stats"]');if(!c)return;const g=ge(s);c.textContent=`${se.length} Punkt${se.length===1?"":"e"}`+(g>0?` · ~${ee(g)} m²`:"")}let le=!1,se=[],R=null,X=[],Ae=0;function ga(){R&&(_.removeLayer(R),R=null),X.forEach(s=>_.removeLayer(s)),X=[],se=[]}function wt(s){le=s,m('[data-role="acker-banner"]').style.display=s?"block":"none",m('[data-role="acker-draw"]').style.display=s?"none":"block",_.getContainer().style.cursor=s?"crosshair":"",s?_.on("mousemove",ha):(_.off("mousemove",ha),ga())}function xt(s){const c=s?[...se,[s.lat,s.lng]]:se;if(c.length<2){R&&(_.removeLayer(R),R=null);return}R?R.setLatLngs(c):R=te.polygon(c,{interactive:!1,className:"acker-draw-preview",color:"#22c55e",weight:2.5,fillColor:"#22c55e",fillOpacity:.18,dashArray:"6 5"}).addTo(_)}function an(s,c){const g=te.circleMarker(s,{radius:c?7:5,color:"#fff",fillColor:c?"#16a34a":"#22c55e",fillOpacity:1,weight:2,interactive:c,bubblingMouseEvents:!1}).addTo(_);c&&(g.bindTooltip("Zum Schließen anklicken",{direction:"top"}),g.on("click",y=>{te.DomEvent.stop(y),se.length>=3&&Wt()})),X.push(g)}function ba(s){if(le){if(H(s.latlng)){Wt();return}se.push([s.latlng.lat,s.latlng.lng]),an(s.latlng,se.length===1),xt(),xe(se)}}function ha(s){if(!le||!se.length)return;const c=H(s.latlng);if(xt(c?void 0:s.latlng),X[0])try{X[0].setRadius(c?10:7),X[0].setStyle({weight:c?3:2})}catch{}xe(c?se:[...se,[s.latlng.lat,s.latlng.lng]])}function nn(){if(!se.length)return;se.pop();const s=X.pop();s&&_.removeLayer(s),xt(),xe(se)}function Wt(){if(se.length<3){F.warning("Mindestens 3 Punkte setzen.");return}const s={_key:"new-"+ ++Ae,id:null,name:"Fläche "+(a.length+1),kultur:null,eppoCode:null,standortId:null,color:kt[a.length%kt.length],latlngs:se.map(c=>c.slice()),params:Md(),outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(s),wt(!1),n=s._key,Oe(s),W(s,!0)}async function va(){const s=m('[data-role="acker-q"]').value.trim();if(s)try{const g=await(await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+encodeURIComponent(s))).json();g[0]?_.setView([+g[0].lat,+g[0].lon],18):F.info("Nichts gefunden.")}catch{F.warning("Suche nicht verfügbar.")}}async function jt(){if(bn){setTimeout(()=>_&&_.invalidateSize(),60);return}bn=!0;try{await $t(()=>Promise.resolve({}),__vite__mapDeps([2]));const y=await $t(()=>import("./leaflet-src.BcflbDBd.js").then(h=>h.l),__vite__mapDeps([3,4]));te=y.default||y,Se=await $t(()=>import("./index.CPadEFgJ.js"),__vite__mapDeps([5,4]))}catch(y){console.warn("[Acker] Karten-Bibliotheken konnten nicht geladen werden:",y),S&&(S.textContent="Karte konnte nicht geladen werden (offline?)."),bn=!1;return}_=te.map(I,{doubleClickZoom:!1,zoomControl:!0,attributionControl:!0}).setView([47.818,8.976],17);const s=te.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:21,maxNativeZoom:19,attribution:"Tiles © Esri"}).addTo(_),c=te.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"});o={sat:s,osm:c},i=te.layerGroup(),x(),i.addTo(_),l=te.layerGroup().addTo(_),te.control.layers({Satellit:s,"Karte (OSM)":c},{"Freiland-Standorte":i},{position:"topright",collapsed:!0}).addTo(_);const g=te.Control.extend({options:{position:"topleft"},onAdd(){const y=te.DomUtil.create("div","leaflet-bar acker-toolbar");y.innerHTML='<a href="#" data-tb="fit" title="Alle Flächen anzeigen"><i class="bi bi-arrows-fullscreen"></i></a><a href="#" data-tb="labels" class="on" title="Beschriftungen ein/aus"><i class="bi bi-tag"></i></a><a href="#" data-tb="beds" class="on" title="Beete-Detail ein/aus"><i class="bi bi-grid-3x3"></i></a>',te.DomEvent.disableClickPropagation(y);const h=(C,M)=>{y.querySelector(C).addEventListener("click",J=>{J.preventDefault(),M()})};return h('[data-tb="fit"]',It),h('[data-tb="labels"]',()=>{d=!d,y.querySelector('[data-tb="labels"]').classList.toggle("on",d),ye()}),h('[data-tb="beds"]',()=>{p=!p,y.querySelector('[data-tb="beds"]').classList.toggle("on",p),ye()}),y}});_.addControl(new g),_.on("click",ba),_.on("contextmenu",y=>{if(le){te.DomEvent.preventDefault?.(y.originalEvent||y),nn();return}T(y)}),_.on("mousemove",we),_.on("mouseup",_e),document.addEventListener("mouseup",_e),_.on("zoomend",vt),m('[data-role="acker-draw"]').addEventListener("click",()=>wt(!0)),m('[data-role="acker-export"]')?.addEventListener("click",v),m('[data-role="acker-finish"]').addEventListener("click",Wt),m('[data-role="acker-cancel"]').addEventListener("click",()=>wt(!1)),m('[data-role="acker-go"]').addEventListener("click",va),m('[data-role="acker-q"]').addEventListener("keydown",y=>{y.key==="Enter"&&va()}),document.addEventListener("keydown",y=>{le&&(y.key==="Backspace"&&(y.preventDefault(),nn()),y.key==="Enter"&&Wt(),y.key==="Escape"&&wt(!1))}),await si(),await rn(),await Jn(),setTimeout(()=>_.invalidateSize(),60)}async function si(){if(pe()==="sqlite")try{Ft=(await Or())?.rows||[]}catch{Ft=[]}}async function rn(){if(pe()!=="sqlite"){u=[];return}try{u=(await hr({flaecheTyp:"acker"}))?.rows||[]}catch{u=[]}}async function Jn(){if(pe()==="sqlite")try{((await _r())?.rows||[]).forEach(g=>{const y={_key:"db-"+g.id,id:g.id,name:g.name,kultur:g.kultur,eppoCode:g.eppoCode,standortId:g.standortId,color:g.color||kt[a.length%kt.length],latlngs:g.latlngs||[],params:{bedW:g.bedW??1.2,pathW:g.pathW??.4,rowSp:g.rowSp??.5,inRowSp:g.inRowSp??.4,angle:g.angle??0},outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};y.result=me(y.latlngs,y.params),a.push(y),$(y)}),ae();const c=a.find(g=>g.latlngs?.length);if(c&&_)try{_.fitBounds(te.polygon(c.latlngs).getBounds(),{maxZoom:19,padding:[30,30]})}catch{}}catch(s){console.warn("[Acker] Flächen laden fehlgeschlagen:",s)}}t.state.subscribe(s=>{if(s?.app?.activeSection==="acker"){if(!bn){jt();return}(async()=>(await rn(),ye(),ae(),setTimeout(()=>_&&_.invalidateSize(),60)))()}}),ae()}function Id(){return`
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
  </section>`}function $a(e){return e.typ+":"+e.id}function Bd(e){if(!Array.isArray(e)||e.length<3)return null;let t=0,a=0,n=0;const r=e.length,i=e[r-1],l=e[0],d=i&&l&&Number(i[0])===Number(l[0])&&Number(i[1])===Number(l[1])?r-1:r;for(let p=0;p<d;p++){const u=Number(e[p]?.[0]),f=Number(e[p]?.[1]);Number.isFinite(u)&&Number.isFinite(f)&&(t+=u,a+=f,n++)}return n?{lat:t/n,lon:a/n}:null}async function ls(e){const t=[];(je(e.state.getState().gps?.points)||[]).forEach(n=>{if(n?.kind!=="gewaechshaus")return;const r=Number(n.latitude),i=Number(n.longitude),l=Number(n.nutzflaecheQm);t.push({typ:"haus",id:String(n.id),name:n.name||"Gewächshaus",areaQm:Number.isFinite(l)&&l>0?l:null,lat:Number.isFinite(r)?r:null,lon:Number.isFinite(i)?i:null,color:null})});try{((await _r())?.rows||[]).forEach(r=>{const i=Bd(r.latlngs),l=Number(r.areaQm);t.push({typ:"acker",id:String(r.id),name:r.name||"Fläche",areaQm:Number.isFinite(l)&&l>0?l:null,lat:i?.lat??null,lon:i?.lon??null,color:r.color||null})})}catch{}return t}const Nd="Wetterdaten: Open-Meteo (CC BY 4.0)",Fd="psm.weather.";function Td(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function qd(e,t){return Fd+e.toFixed(3)+"_"+t.toFixed(3)}function Hd(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch{return null}}function Od(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function _d(e){return!!e&&e.slice(0,10)===Td()}function Rd(e,t,a){const n=e?.time||[],r=e?.temperature_2m_max||[],i=e?.temperature_2m_min||[],l=e?.precipitation_sum||[],o=e?.sunshine_duration||[],d=Pn(new Date),p=bi(d.year,d.week),u=new Map;for(let v=0;v<n.length;v++){const x=Ss(n[v]);if(!x)continue;const{year:m,week:k}=Pn(x),S=bi(m,k);let D=u.get(S);D||(D={key:S,year:m,week:k,tmaxSum:0,tmaxN:0,tminSum:0,tminN:0,precip:0,precipN:0,sun:0,sunN:0,days:0},u.set(S,D)),Number.isFinite(r[v])&&(D.tmaxSum+=r[v],D.tmaxN++),Number.isFinite(i[v])&&(D.tminSum+=i[v],D.tminN++),Number.isFinite(l[v])&&(D.precip+=l[v],D.precipN++),Number.isFinite(o[v])&&(D.sun+=o[v],D.sunN++),D.days++}const f=[...u.values()].sort((v,x)=>v.key<x.key?-1:v.key>x.key?1:0).map(v=>{const x=v.tmaxN?v.tmaxSum/v.tmaxN:null,m=v.tminN?v.tminSum/v.tminN:null;return{weekKey:v.key,year:v.year,week:v.week,tMaxAvg:x,tMinAvg:m,tMeanAvg:x!=null&&m!=null?(x+m)/2:x,precipSum:v.precipN?v.precip:null,sunHours:v.sunN?v.sun/3600:null,days:v.days,isForecast:v.key>=p}});return{lat:t,lon:a,fetchedAt:new Date().toISOString(),weeks:f}}async function Kd(e,t){if(!Number.isFinite(e)||!Number.isFinite(t))return{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const a=qd(e,t),n=Hd(a);if(n&&_d(n.fetchedAt)&&n.weeks?.length)return n;if(typeof navigator<"u"&&navigator.onLine===!1)return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const r="https://api.open-meteo.com/v1/forecast?latitude="+e.toFixed(4)+"&longitude="+t.toFixed(4)+"&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunshine_duration&timezone=Europe%2FBerlin&past_days=92&forecast_days=16";try{const i=await fetch(r);if(!i.ok)throw new Error("HTTP "+i.status);const l=await i.json(),o=Rd(l.daily,e,t);return o.weeks.length&&Od(a,o),o}catch{return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]}}}const gr=66;function Wd(e,t){const{units:a,anbau:n,mass:r,onSelect:i,onContext:l}=t;if(!a||!a.length){e.innerHTML='<div class="km-empty"><i class="bi bi-calendar3"></i><p>Noch keine Flächen für den Anbauplan.</p></div>';return}const o=new Date;let d=new Date(o.getFullYear(),o.getMonth()-1,1),p=new Date(o.getFullYear(),o.getMonth()+4,1);const u=N=>{if(!N)return;const re=new Date(String(N).slice(0,10)+"T00:00:00");isNaN(re.getTime())||(re<d&&(d=new Date(re.getFullYear(),re.getMonth(),1)),re>p&&(p=new Date(re.getFullYear(),re.getMonth(),1)))};(n||[]).forEach(N=>{u(N.pflanzDatum),u(N.ernteBis||N.ernteDatum),u(N.ernteVon)}),(r||[]).forEach(N=>u(N.planDatum||N.erledigtDatum));const f=io(d,p),v=f.length,x=v*gr,m=N=>N==null?null:(N*100).toFixed(2)+"%",k=Ke(f,o.toISOString()),S=a.filter(N=>N.typ==="haus"),D=a.filter(N=>N.typ==="acker");let I="";f.forEach((N,re)=>{const q=N.y===o.getFullYear()&&N.m===o.getMonth();I+=`<div class="kb2-mo${q?" cur":""}" style="width:${gr}px">${ro[N.m]}${N.m===0?" "+String(N.y).slice(2):""}</div>`});const Q=N=>{const re=(n||[]).filter($=>$.flaecheTyp===N.typ&&String($.flaecheId)===String(N.id)),q=(r||[]).filter($=>$.flaecheTyp===N.typ&&String($.flaecheId)===String(N.id));let L="";return re.forEach(($,Y)=>{const ie=Ke(f,$.pflanzDatum);let oe=Ke(f,$.ernteBis||$.ernteDatum||$.pflanzDatum);if(ie==null)return;(oe==null||oe<=ie)&&(oe=Math.min(1,ie+.5/v));const ye=qa($,Y),vt=$.status==="geplant";L+=`<div class="kb2-bar${vt?" planned":""}" title="${b($.kultur||"Kultur")}" style="left:${m(ie)};width:${((oe-ie)*100).toFixed(2)}%;--cc:${b(ye)}"><span>${b($.kultur||"")}</span></div>`;const Re=Ke(f,$.ernteVon),Ce=Ke(f,$.ernteBis);Re!=null&&Ce!=null&&Ce>Re&&(L+=`<div class="kb2-harvest" title="Ernte" style="left:${m(Re)};width:${((Ce-Re)*100).toFixed(2)}%;--cc:${b(ye)}"></div>`)}),q.forEach($=>{const Y=$.status==="erledigt"?$.erledigtDatum||$.planDatum:$.planDatum||$.erledigtDatum,ie=Ke(f,Y);if(ie==null)return;const oe=ao($.art),ye=$.status==="erledigt";L+=`<span class="kb2-mk${ye?" done":""}" title="${b(oe.label+($.notes?": "+$.notes:""))}" style="left:${m(ie)};--mc:${oe.color}"></span>`}),k!=null&&(L+=`<div class="kb2-today" style="left:${m(k)}"></div>`),L},W=N=>{const re=N.typ+":"+N.id,q=(n||[]).filter(Y=>Y.flaecheTyp===N.typ&&String(Y.flaecheId)===String(N.id)),L=q.find(Y=>Y.status==="aktiv")||q.find(Y=>Y.status!=="abgeschlossen"),$=L?b(L.kultur||""):"frei";return`<div class="kb2-row" data-ukey="${re}">
      <div class="kb2-label" title="${b(N.name)}"><b>${b(N.name)}</b><small>${$}</small></div>
      <div class="kb2-track" style="width:${x}px">${Q(N)}</div>
    </div>`},me=(N,re)=>re.length?`<div class="kb2-grp"><div class="kb2-grp-l">${b(N)}</div><div class="kb2-grp-t" style="width:${x}px"></div></div>`+re.map(W).join(""):"";e.innerHTML=`
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
      .kb2-track{position:relative;height:38px;border-top:1px solid var(--border-1);background-image:linear-gradient(to right,var(--border-1) 1px,transparent 1px);background-size:${gr}px 100%}
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
      ${me("Gewächshäuser",S)}
      ${me("Freiland",D)}
    </div>
    <div class="kb2-legend">
      <span class="lg"><span class="d" style="background:var(--text-secondary,#475569)"></span>erledigt</span>
      <span class="lg"><span class="d" style="background:var(--surface-1);box-shadow:inset 0 0 0 2px var(--text-secondary,#475569)"></span>geplant</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:#9FE1CB;display:inline-block"></span>Kultur</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:repeating-linear-gradient(45deg,#bbb,#bbb 2px,transparent 2px,transparent 4px);display:inline-block"></span>Ernte-Zeitraum</span>
      <span class="kb2-hint"><i class="bi bi-mouse2"></i> Klick = öffnen · Rechtsklick = planen</span>
    </div>`,e.querySelectorAll(".kb2-row").forEach(N=>{const re=N.dataset.ukey;N.querySelector(".kb2-label")?.addEventListener("click",()=>i&&i(re)),N.addEventListener("contextmenu",q=>{q.preventDefault(),l&&l(re,q.clientX,q.clientY)})})}const jd=[{art:"bewaesserung",label:"Gießen",icon:"bi-droplet"},{art:"mechanisch",label:"Hacken",icon:"bi-tools"},{art:"duengung",label:"Düngen",icon:"bi-flower1"},{art:"nuetzlinge",label:"Nützlinge",icon:"bi-bug"},{art:"chemisch_psm",label:"Pflanzenschutz",icon:"bi-droplet-half"},{art:"monitoring",label:"Kontrolle",icon:"bi-eye"},{art:"sonstiges",label:"Sonstiges",icon:"bi-three-dots"}],Gd=["Jan.","Feb.","März","Apr.","Mai","Juni","Juli","Aug.","Sep.","Okt.","Nov.","Dez."];function Ud(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Vd();let a=[],n=[],r=[],i=[],l=[],o=null,d="plan",p=!1,u=!1;const f={};let v=null;const x=w=>e.querySelector(w),m=()=>x('[data-role="list"]'),k=()=>x('[data-role="detail"]'),S=()=>x('[data-role="kpis"]'),D=()=>x('[data-role="board-view"]'),I=()=>x('[data-role="flaechen-view"]'),Q=()=>pe()==="sqlite",W=()=>{Q()&&Ye().catch(()=>{})},me=(w,E)=>w.filter(O=>O.flaecheTyp===E.typ&&String(O.flaecheId)===String(E.id)),N=w=>a.find(E=>$a(E)===w)||null,re=(w,E=0)=>no(w.color)||qt[E%qt.length];async function q(){if(a=await ls(t),Q()){try{n=(await hr())?.rows||[]}catch{n=[]}try{r=(await ir())?.rows||[]}catch{r=[]}try{i=(await Or())?.rows||[]}catch{i=[]}try{l=(await Zo())?.rows||[]}catch{l=[]}if(!u){u=!0;try{const w=await hi();w?.imported&&(r=(await ir())?.rows||[],F.info(`${w.imported} Pflanzenschutz-Eintrag(e) übernommen.`),W())}catch{}}}!o&&a.length&&(o=$a(a[0])),Y(),$()}async function L(){if(Q()){try{n=(await hr())?.rows||[]}catch{}try{r=(await ir())?.rows||[]}catch{}}}async function $(){const w=o?N(o):null;if(!w||w.lat==null||w.lon==null)return;const E=$a(w);if(!f[E]){f[E]={loading:!0,weeks:[]};try{f[E]=await Kd(w.lat,w.lon)}catch{f[E]={weeks:[]}}o===E&&Ce()}}function Y(){oe(),d==="plan"?(I().style.display="none",D().style.display="block",Wd(D(),{units:a,anbau:n,mass:r,onSelect:w=>{o=w,ie("flaechen"),$()},onContext:(w,E,O)=>en(w,E,O)})):(D().style.display="none",I().style.display="grid",vt(),Ce()),e.querySelectorAll(".km-modebtn").forEach(w=>w.classList.toggle("active",w.dataset.mode===d))}function ie(w){d=w,Y()}function oe(){const w=S();if(!w)return;a.filter(z=>z.typ==="haus").length,a.filter(z=>z.typ==="acker").length;let E=0,O=null;a.forEach(z=>{const{current:P,next:B}=Ia(me(n,z));P&&E++,B?.pflanzDatum&&(!O||Ee(B.pflanzDatum)<Ee(O.pflanzDatum))&&(O=B)});const T=r.filter(z=>z.status==="geplant").length;w.innerHTML=`
      ${ye(String(a.length),"Flächen")}
      ${ye(String(E),"Kulturen aktiv")}
      ${ye(String(T),"Aufgaben offen")}
      ${ye(O?wa(Oe(O.pflanzDatum)):"–","Nächste Pflanzung")}
      <button class="km-psm" data-role="psm-import" title="Bestehende Pflanzenschutz-Einträge übernehmen"><i class="bi bi-arrow-down-circle"></i><span>PSM übernehmen</span></button>`,w.querySelector('[data-role="psm-import"]')?.addEventListener("click",ca)}const ye=(w,E)=>`<div class="km-kpi"><div class="km-kpi-v">${w}</div><div class="km-kpi-l">${b(E)}</div></div>`;function vt(){const w=m();if(!w)return;if(!a.length){w.innerHTML='<div class="km-empty"><i class="bi bi-geo-alt"></i><p>Noch keine Flächen.<br>Gewächshäuser unter Einstellungen, Freiland im Reiter „Karte".</p></div>';return}const E=a.filter(z=>z.typ==="haus"),O=a.filter(z=>z.typ==="acker"),T=(z,P)=>P.length?`<div class="km-grp">${b(z)}</div>`+P.map(Re).join(""):"";w.innerHTML=T("Gewächshäuser",E)+T("Freiland",O),w.querySelectorAll("[data-ukey]").forEach(z=>{z.addEventListener("click",()=>{o=z.dataset.ukey,vt(),Ce(),$()}),z.addEventListener("contextmenu",P=>{P.preventDefault(),en(z.dataset.ukey,P.clientX,P.clientY)})})}function Re(w,E){const O=$a(w),{current:T}=Ia(me(n,w));return`<div class="km-row${O===o?" sel":""}" data-ukey="${O}">
      <span class="km-dot" style="background:${b(T?qa(T):re(w,E))}"></span>
      <div class="km-row-main"><div class="km-row-name">${b(w.name)}</div>
      <div class="km-row-sub">${T?`<span class="crop">${b(T.kultur||"Kultur")}</span>`:'<span class="free">frei</span>'}</div></div>
    </div>`}function Ce(){const w=k();if(!w)return;const E=o?N(o):null;if(!E){w.innerHTML='<div class="km-empty"><i class="bi bi-hand-index"></i><p>Fläche links wählen.</p></div>';return}const O=me(n,E),T=me(r,E),{current:z,next:P}=Ia(O),B=f[$a(E)],fe=E.typ==="haus"?"Gewächshaus":"Freiland",be=E.areaQm?`${Math.round(E.areaQm).toLocaleString("de-DE")} m²`:"";let ae;if(z){const U=z.pflanzDatum?`seit ${oa(z.pflanzDatum)} · ${wa(Oe(z.pflanzDatum))}`:"",G=Ya(z);ae=`<div class="km-hero active" style="--cc:${b(qa(z))}">
        <div class="km-hero-ic"><i class="bi bi-flower2"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop">${b(z.kultur||"Kultur")}</div><div class="km-hero-sub">${b(U+G+Xa(z))}</div></div>
        <button class="km-hero-edit" data-edit-crop="current" title="Bearbeiten"><i class="bi bi-pencil"></i></button>
      </div>`}else ae=`<div class="km-hero empty">
        <div class="km-hero-ic gray"><i class="bi bi-circle"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop gray">Fläche ist frei</div><div class="km-hero-sub">Noch keine Kultur eingetragen</div></div>
        <button class="km-hero-add" data-edit-crop="current"><i class="bi bi-plus-lg"></i> Kultur setzen</button>
      </div>`;const Z=P?`<div class="km-next"><i class="bi bi-arrow-right-short"></i>Danach geplant: <b>${b(P.kultur||"Kultur")}</b> · ab ${wa(Oe(P.pflanzDatum))} <button class="km-next-edit" data-edit-crop="next" title="Bearbeiten"><i class="bi bi-pencil"></i></button></div>`:z?'<button class="km-next-add" data-edit-crop="next"><i class="bi bi-plus"></i> Nächste Kultur planen</button>':"";w.innerHTML=`
      <div class="km-head"><div class="km-head-l"><span class="km-head-name">${b(E.name)}</span><span class="km-head-badge">${fe}${be?" · "+be:""}</span></div>
        <button class="km-headbtn" data-act="map"><i class="bi bi-map"></i> Auf Karte</button></div>
      ${ae}
      ${Z}
      ${Vn(O,T)}
      <div class="km-tasks-head"><span>Aufgaben</span><button class="km-addtask" data-act="add-massnahme"><i class="bi bi-plus-lg"></i> Aufgabe</button></div>
      ${It(T)}
      <div class="km-foot">
        <span class="km-weather">${yt(B)}</span>
        <button class="km-plan" data-act="plan"><i class="bi bi-calendar3"></i> Saison &amp; Plan</button>
      </div>
      <div class="km-attr">${b(Nd)}${B?.stale?" · offline":""}</div>`,w.querySelector('[data-act="map"]')?.addEventListener("click",()=>la()),w.querySelector('[data-act="plan"]')?.addEventListener("click",()=>ie("plan")),w.querySelector('[data-act="add-massnahme"]')?.addEventListener("click",()=>fa(E,null,z)),w.querySelectorAll("[data-edit-crop]").forEach(U=>U.addEventListener("click",()=>{const G=U.dataset.editCrop;ma(E,G==="current"?z:P,G,O.length)})),w.querySelectorAll("[data-m-done]").forEach(U=>U.addEventListener("click",G=>{G.stopPropagation(),da(U.dataset.mDone)})),w.querySelectorAll("[data-m-del]").forEach(U=>U.addEventListener("click",G=>{G.stopPropagation(),ua(U.dataset.mDel)})),w.querySelectorAll("[data-m-edit]").forEach(U=>U.addEventListener("click",()=>{const G=r.find(he=>he.id===U.dataset.mEdit);fa(E,G,z)}))}function It(w){const E=w.filter(B=>B.status==="geplant").sort((B,fe)=>(Ee(B.planDatum)||9e15)-(Ee(fe.planDatum)||9e15)),O=w.filter(B=>B.status==="erledigt").sort((B,fe)=>(Ee(fe.erledigtDatum)||0)-(Ee(B.erledigtDatum)||0)).slice(0,6),T=Number(tt().replace(/-/g,"")),z=(B,fe)=>{const be=ao(B.art),ae=fe?B.erledigtDatum:B.planDatum,Z=!fe&&ae&&Ee(ae)<T,U=fe?oa(ae):Ie(ae,Z),G=B.notes||be.label,he=B.historyId?'<span class="km-pill">PSM</span>':"",we=[];B.notes&&we.push(b(be.label)),B.mittel&&we.push(b(B.mittel)),B.menge!=null&&we.push(`${B.menge}${B.einheit?" "+b(B.einheit):""}`);const _e=we.join(" · ");return`<div class="km-task${fe?" done":""}" data-m-edit="${B.id}">
        <span class="km-task-ic" style="--mc:${be.color}"><i class="bi ${be.icon}"></i></span>
        <div class="km-task-main"><div class="km-task-title">${b(G)}${he}</div>${_e?`<div class="km-task-sub">${_e}</div>`:""}</div>
        <span class="km-task-when${Z?" overdue":""}">${U}</span>
        ${fe?`<button class="km-tbtn del" data-m-del="${B.id}" title="Löschen"><i class="bi bi-trash"></i></button>`:`<button class="km-check" data-m-done="${B.id}" title="Erledigt"><i class="bi bi-check-lg"></i></button>`}
      </div>`};let P="";return E.length?P+=E.map(B=>z(B,!1)).join(""):P+='<div class="km-tasks-none"><i class="bi bi-check2-circle"></i> Nichts offen</div>',O.length&&(P+='<div class="km-done-h">Erledigt</div>'+O.map(B=>z(B,!0)).join("")),`<div class="km-tasks">${P}</div>`}function Oe(w){const E=new Date(String(w).slice(0,10)+"T00:00:00");return isNaN(E.getTime())?0:Pn(E).week}function oa(w){const E=new Date(String(w).slice(0,10)+"T00:00:00");return isNaN(E.getTime())?"":`${E.getDate()}. ${Gd[E.getMonth()]}`}function Ie(w,E){if(!w)return"offen";const O=new Date(String(w).slice(0,10)+"T00:00:00");if(isNaN(O.getTime()))return"offen";const T=new Date;T.setHours(0,0,0,0);const z=Math.round((O.getTime()-T.getTime())/864e5);return z===0?"heute":z===1?"morgen":E?"überfällig":oa(w)}function yt(w){if(!w||!w.weeks?.length)return w?.loading?"Wetter lädt…":"";const{year:E,week:O}=Pn(new Date),T=w.weeks.find(B=>B.year===E&&B.week===O)||w.weeks.find(B=>!B.isForecast);if(!T)return"";const z=T.tMaxAvg!=null?Math.round(T.tMaxAvg)+"°":"–",P=T.precipSum!=null?Math.round(T.precipSum)+" mm":"–";return`<i class="bi bi-cloud-sun"></i> Diese Woche: ${z} · ${P} Regen`}function Ya(w){const E=w.ernteVon?wa(Oe(w.ernteVon)):null,O=w.ernteBis||w.ernteDatum,T=O?wa(Oe(O)):null;return E&&T?` · Ernte ${E}–${T}`:T?` · Ernte ~${T}`:E?` · Ernte ab ${E}`:""}function Xa(w){return!w||w.menge==null||w.menge===""?"":` · ${w.menge} ${w.einheit||"Pflanzen"}`}function Vn(w,E){if(!w.length&&!E.length)return"";const O=new Date;let T=new Date(O.getFullYear(),O.getMonth()-1,1),z=new Date(O.getFullYear(),O.getMonth()+4,1);const P=H=>{if(!H)return;const ge=new Date(String(H).slice(0,10)+"T00:00:00");isNaN(ge.getTime())||(ge<T&&(T=new Date(ge.getFullYear(),ge.getMonth(),1)),ge>z&&(z=new Date(ge.getFullYear(),ge.getMonth(),1)))};w.forEach(H=>{P(H.pflanzDatum),P(H.ernteBis||H.ernteDatum),P(H.ernteVon)}),E.forEach(H=>P(H.planDatum||H.erledigtDatum));const B=io(T,z),fe=B.length,be=`background-size:${(100/fe).toFixed(4)}% 100%`,ae=H=>H==null?null:(H*100).toFixed(2)+"%",Z=Ke(B,O.toISOString()),U=Z!=null?`<div class="ks-today" style="left:${ae(Z)}"></div>`:"",G=B.map(H=>`<div class="ks-mo${H.y===O.getFullYear()&&H.m===O.getMonth()?" cur":""}">${ro[H.m]}</div>`).join("");let he="";w.forEach((H,ge)=>{const xe=Ke(B,H.pflanzDatum);let le=Ke(B,H.ernteBis||H.ernteDatum||H.pflanzDatum);if(xe==null)return;(le==null||le<=xe)&&(le=Math.min(1,xe+.5/fe));const se=qa(H,ge);he+=`<div class="ks-bar${H.status==="geplant"?" planned":""}" style="left:${ae(xe)};width:${((le-xe)*100).toFixed(2)}%;--cc:${b(se)}"><span>${b(H.kultur||"")}</span></div>`;const R=Ke(B,H.ernteVon),X=Ke(B,H.ernteBis);R!=null&&X!=null&&X>R&&(he+=`<div class="ks-harvest" style="left:${ae(R)};width:${((X-R)*100).toFixed(2)}%"></div>`)});const we={};E.forEach(H=>{(we[H.art]=we[H.art]||[]).push(H)});const _e=Ed.filter(H=>we[H]).map(H=>{const ge=Hn[H],xe=we[H].map(le=>{const se=le.status==="erledigt"?le.erledigtDatum||le.planDatum:le.planDatum||le.erledigtDatum,R=Ke(B,se);return R==null?"":`<span class="ks-mk${le.status==="erledigt"?" done":""}" title="${b(ge.label+(le.notes?": "+le.notes:""))}" style="left:${ae(R)};--mc:${ge.color}"></span>`}).join("");return`<div class="ks-row"><div class="ks-rl">${b(ge.label)}</div><div class="ks-track" style="${be}">${xe}${U}</div></div>`}).join("");return`<div class="ks-wrap">
      <div class="ks-head"><div class="ks-rl"></div><div class="ks-axis">${G}</div></div>
      <div class="ks-row"><div class="ks-rl">Kultur</div><div class="ks-track" style="${be}">${he}${U}</div></div>
      ${_e}
      <div class="ks-legend"><span><span class="ks-d done"></span>erledigt</span><span><span class="ks-d"></span>geplant</span><span style="margin-left:auto"><span class="ks-hbar"></span>Ernte-Zeitraum</span></div>
    </div>`}function la(w){Xe("app",E=>({...E,activeSection:"acker"})),F.info("Karte geöffnet.")}async function ca(){if(!Q()){F.warning("Keine Datenbank aktiv.");return}try{const w=await hi();await L(),Y(),w?.imported?(F.success(`${w.imported} übernommen.`),W()):F.info(`Nichts Neues${w?.skipped?` (${w.skipped} nicht zuordenbar)`:""}.`)}catch{F.error("Übernahme fehlgeschlagen.")}}async function da(w){const E=r.find(O=>O.id===w);if(E)try{await yi({...E,status:"erledigt",erledigtDatum:E.erledigtDatum||tt()}),await L(),Y(),W()}catch{F.error("Speichern fehlgeschlagen.")}}async function ua(w){try{await vi({id:w}),await L(),Y(),W()}catch{F.error("Löschen fehlgeschlagen.")}}let De=null;const Bt=()=>{De&&(De.remove(),De=null,document.removeEventListener("pointerdown",pa,!0))},pa=w=>{De&&!De.contains(w.target)&&Bt()};function Zn(w,E,O,T){if(Bt(),De=document.createElement("div"),De.className="km-ctx",T){const P=document.createElement("div");P.className="km-ctx-t",P.textContent=T,De.appendChild(P)}O.forEach(P=>{if(P.sep){const fe=document.createElement("div");fe.className="km-ctx-sep",De.appendChild(fe);return}const B=document.createElement("button");B.className="km-ctx-i",B.innerHTML=`<i class="bi ${P.icon}"></i><span>${b(P.label)}</span>`,B.addEventListener("click",()=>{Bt(),P.action?.()}),De.appendChild(B)}),document.body.appendChild(De);const z=De.getBoundingClientRect();De.style.left=Math.max(8,Math.min(w,window.innerWidth-z.width-8))+"px",De.style.top=Math.max(8,Math.min(E,window.innerHeight-z.height-8))+"px",setTimeout(()=>document.addEventListener("pointerdown",pa,!0),0)}function en(w,E,O){const T=N(w);if(!T)return;const z=me(n,T),{current:P}=Ia(z);Zn(E,O,[{icon:"bi-flower2",label:P?"Kultur bearbeiten":"Kultur setzen",action:()=>ma(T,P,"current",z.length)},{icon:"bi-plus-lg",label:"Nächste Kultur planen",action:()=>ma(T,null,"next",z.length)},{icon:"bi-list-check",label:"Aufgabe planen",action:()=>fa(T,null,P)},{sep:!0},{icon:"bi-arrow-right-circle",label:"Fläche öffnen",action:()=>{o=w,ie("flaechen"),$()}},{icon:"bi-map",label:"Auf Karte",action:()=>la()}],T.name)}function Ve(){v&&(v.remove(),v=null)}function tn(w,E,O,T){Ve();const z=document.createElement("div");return z.className="kmodal-ov",z.innerHTML=`<div class="kmodal" role="dialog" aria-modal="true">
      <div class="kmodal-h"><span>${b(w)}</span><button class="kmodal-x" aria-label="Schließen"><i class="bi bi-x-lg"></i></button></div>
      <div class="kmodal-b">${E}</div>
      <div class="kmodal-f"><button class="btn-cancel" data-k="cancel">Abbrechen</button><button class="btn-save" data-k="save">${b(O)}</button></div></div>`,e.appendChild(z),v=z,z.querySelector(".kmodal-x").addEventListener("click",Ve),z.querySelector('[data-k="cancel"]').addEventListener("click",Ve),z.addEventListener("mousedown",P=>{P.target===z&&Ve()}),z.querySelector('[data-k="save"]').addEventListener("click",()=>{T(z)!==!1&&Ve()}),z.querySelectorAll("[data-more]").forEach(P=>P.addEventListener("click",()=>{const B=z.querySelector("[data-more-box]");B&&(B.hidden=!1,P.style.display="none")})),setTimeout(()=>z.querySelector("input,select,textarea,.km-tile")?.focus?.(),30),z}function Qn(){const w=new Set,E=[],O=z=>{const P=String(z||"").trim().toLowerCase();z&&!w.has(P)&&(w.add(P),E.push(z))};return l.forEach(z=>O(z.name)),i.forEach(z=>O(z.kultur)),`<datalist id="km-kultur-dl">${E.map(z=>`<option value="${b(z)}"></option>`).join("")}</datalist>`}function ma(w,E,O,T){const z=O==="next"&&!E,P=E||{},B=(P.kulturStammId?l.find(R=>R.id===P.kulturStammId):null)||gn(l,P.kultur),fe=P.pflanzDatum?.slice(0,10)||(z?"":tt()),be=qt.map(R=>`<button type="button" class="km-sw${(P.color||"")===R?" on":""}" data-col="${R}" style="background:${R}"></button>`).join(""),ae=Ad.map(R=>`<option value="${b(R)}"${(P.einheit||"Pflanzen")===R?" selected":""}>${b(R)}</option>`).join(""),Z=`
      <label class="km-fld big">Was wächst hier?<input list="km-kultur-dl" data-f="kultur" value="${b(P.kultur||"")}" placeholder="z. B. Tomate – aus Bibliothek wählen" autocomplete="off" /></label>${Qn()}
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
        <label class="km-fld">${z?"Geplante Pflanzung":"Pflanzung"}<input type="date" data-f="pflanz" value="${fe}" /></label>
      </div>
      <div class="km-frow2">
        <label class="km-fld">Ernte von<input type="date" data-f="ernteVon" value="${(P.ernteVon||"").slice(0,10)}" /></label>
        <label class="km-fld">Ernte bis<input type="date" data-f="ernteBis" value="${(P.ernteBis||P.ernteDatum||"").slice(0,10)}" /></label>
      </div>
      <div class="km-hint2"><i class="bi bi-info-circle"></i> Termine kommen automatisch aus der Bibliothek – jederzeit frei überschreibbar.</div>
      <div class="km-frow2">
        <label class="km-fld">Menge<input type="number" step="1" min="0" data-f="menge" value="${P.menge!=null?P.menge:""}" placeholder="optional" /></label>
        <label class="km-fld">Einheit<select data-f="einheit">${ae}</select></label>
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
        <label class="km-fld">Status<select data-f="status">${["aktiv","geplant","abgeschlossen"].map(R=>`<option value="${R}"${(P.status||(z?"geplant":"aktiv"))===R?" selected":""}>${Ld[R].label}</option>`).join("")}</select></label>
        <div class="km-fld">Farbe<div class="km-sws">${be}</div></div>
        <label class="km-fld">Notiz<textarea data-f="notes" rows="2" placeholder="optional">${b(P.notes||"")}</textarea></label>
      </div>
      ${E?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Satz löschen</button>':""}`,U=tn(E?"Satz bearbeiten":z?"Nächsten Satz planen":"Satz eintragen",Z,"Speichern",R=>{const X=M=>R.querySelector(`[data-f="${M}"]`)?.value?.trim()||"",Ae=X("kultur");if(!Ae)return F.warning("Bitte eine Kultur angeben."),!1;const ga=gn(l,Ae),wt=X("aussaat")||null,xt=X("pflanz")||null,an=X("ernteVon")||null,ba=X("ernteBis")||null,ha=X("menge"),nn=ha?Number(ha):null,Wt=R.querySelector('[data-f="einheit"]')?.value||null,va=!R.querySelector("[data-more-box]").hidden;let jt=va?X("status"):"";jt||(jt=z||xt&&Ee(xt)>Number(tt().replace(/-/g,""))?"geplant":"aktiv");const rn=R.querySelector(".km-sw.on")?.dataset.col||P.color||ga?.color||qt[T%qt.length],Jn=i.find(M=>M.kultur===Ae)?.eppoCode||ga?.eppoCode||null,s=va?X("notes")||null:P.notes||null,c={flaecheTyp:w.typ,flaecheId:w.id,kultur:Ae,eppoCode:Jn,color:rn,menge:nn,einheit:Wt,kulturStammId:ga?.id||P.kulturStammId||null,notes:s},g=!E&&R.querySelector('[data-f="succOn"]')?.checked,y=Math.max(2,Math.min(20,Number(R.querySelector('[data-f="succN"]')?.value)||2)),h=Math.max(1,Number(R.querySelector('[data-f="succGap"]')?.value)||14),C=Number(tt().replace(/-/g,""));(async()=>{try{if(g){const M="sg-"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),J={aussaatDatum:wt,pflanzDatum:xt,ernteVon:an,ernteBis:ba};for(let de=0;de<y;de++){const ue=Pd(J,de*h),ke=ue.pflanzDatum&&Ee(ue.pflanzDatum)>C?"geplant":jt;await wi({...c,...ue,ernteDatum:null,status:ke,satzGruppe:M})}F.success(`${y} Sätze angelegt.`)}else await wi({id:E?.id,...c,aussaatDatum:wt,pflanzDatum:xt,ernteVon:an,ernteBis:ba,ernteDatum:null,status:jt,satzGruppe:P.satzGruppe||null});await L(),Y(),W()}catch{F.error("Speichern fehlgeschlagen.")}})()});let G="pflanz";const he=R=>U.querySelector(`[data-f="${R}"]`),we=U.querySelector("[data-anchor-row]"),_e=U.querySelector("[data-stammhint]");let H=B;const ge=()=>{if(!H){_e.hidden=!0,we.style.opacity="0.45";return}we.style.opacity="1";const X=[$d[H.anbauMethode==="anzucht"?"anzucht":"direkt"].short];H.kulturTage&&X.push(`${H.kulturTage} T. Kultur`),H.anbauMethode==="anzucht"&&H.anzuchtTage&&X.push(`${H.anzuchtTage} T. Anzucht`),H.familie&&X.push(H.familie),_e.innerHTML=`<i class="bi bi-stars"></i> <b>Bibliothek:</b> ${b(X.join(" · "))}`,_e.hidden=!1},xe=()=>{if(!H)return;const X=he(G==="ernte"?"ernteVon":G).value||tt(),Ae=zd(H,G,X);Ae.aussaatDatum!=null&&(he("aussaat").value=Ae.aussaatDatum||""),Ae.pflanzDatum!=null&&(he("pflanz").value=Ae.pflanzDatum||""),Ae.ernteVon!=null&&(he("ernteVon").value=Ae.ernteVon||""),Ae.ernteBis!=null&&(he("ernteBis").value=Ae.ernteBis||"")},le=he("kultur");le.addEventListener("input",()=>{H=gn(l,le.value),ge()}),le.addEventListener("change",()=>{H=gn(l,le.value),ge(),H&&(he("pflanz").value||(he("pflanz").value=tt()),xe())}),U.querySelectorAll("[data-anchor]").forEach(R=>R.addEventListener("click",()=>{U.querySelectorAll("[data-anchorseg] .km-segb").forEach(X=>X.classList.remove("on")),R.classList.add("on"),G=R.dataset.anchor,xe()})),["aussaat","pflanz","ernteVon"].forEach(R=>he(R)?.addEventListener("change",()=>{R===(G==="ernte"?"ernteVon":G)&&xe()})),ge();const se=U.querySelector('[data-f="succOn"]');se?.addEventListener("change",()=>{U.querySelector("[data-succ-box]").hidden=!se.checked}),U.querySelectorAll(".km-sw").forEach(R=>R.addEventListener("click",()=>{U.querySelectorAll(".km-sw").forEach(X=>X.classList.remove("on")),R.classList.add("on")})),U.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(E?.id)try{await Qo({id:E.id}),await L(),Y(),W(),Ve()}catch{F.error("Löschen fehlgeschlagen.")}})}function fa(w,E,O){const T=E||{art:"bewaesserung",status:"geplant"},z=jd.map(Z=>`<button type="button" class="km-tile${(T.art||"bewaesserung")===Z.art?" on":""}" data-art="${Z.art}" style="--ac:${Hn[Z.art].color}"><i class="bi ${Z.icon}"></i><span>${b(Z.label)}</span></button>`).join(""),P=(T.status||"geplant")==="erledigt",B=(P?T.erledigtDatum:T.planDatum)||tt(),fe=`
      <div class="km-tasktiles">${z}</div>
      <div class="km-fld">Wann?<div class="km-when" data-when>
        <button type="button" class="km-chip" data-day="0">Heute</button>
        <button type="button" class="km-chip" data-day="1">Morgen</button>
        <button type="button" class="km-chip" data-day="x">Datum…</button>
        <input type="date" data-f="datum" value="${B.slice(0,10)}" />
      </div></div>
      <div class="km-seg" data-seg>
        <button type="button" class="km-segb${P?"":" on"}" data-status="geplant"><i class="bi bi-clock"></i> Geplant</button>
        <button type="button" class="km-segb${P?" on":""}" data-status="erledigt"><i class="bi bi-check-lg"></i> Erledigt</button>
      </div>
      <button type="button" class="km-more" data-more><i class="bi bi-sliders"></i> Notiz, Menge, Mittel</button>
      <div class="km-more-box" data-more-box hidden>
        <label class="km-fld">Bezeichnung<input data-f="notes" value="${b(T.notes||"")}" placeholder="z. B. Kompostgabe" /></label>
        <div class="km-frow2">
          <label class="km-fld">Menge<input type="number" step="0.1" data-f="menge" value="${T.menge!=null?T.menge:""}" placeholder="optional" /></label>
          <label class="km-fld">Einheit<input data-f="einheit" value="${b(T.einheit||"")}" placeholder="kg/ha, l" /></label>
        </div>
        <label class="km-fld">Mittel<input data-f="mittel" value="${b(T.mittel||"")}" placeholder="optional" /></label>
      </div>
      ${E?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Aufgabe löschen</button>':""}`,be=tn(E?"Aufgabe bearbeiten":"Aufgabe hinzufügen",fe,"Speichern",Z=>{const U=Z.querySelector(".km-tile.on")?.dataset.art||"bewaesserung",G=Z.querySelector(".km-segb.on")?.dataset.status||"geplant",he=Z.querySelector('[data-f="datum"]').value||tt(),we=!Z.querySelector("[data-more-box]").hidden,_e=ge=>{const xe=Z.querySelector(`[data-f="${ge}"]`)?.value;return xe?Number(xe):null},H=ge=>Z.querySelector(`[data-f="${ge}"]`)?.value.trim()||null;(async()=>{try{await yi({id:E?.id,flaecheTyp:w.typ,flaecheId:w.id,anbauId:E?.anbauId||O?.id||null,art:U,status:G,planDatum:G==="geplant"?he:E?.planDatum||null,erledigtDatum:G==="erledigt"?he:null,menge:we?_e("menge"):E?.menge??null,einheit:we?H("einheit"):E?.einheit||null,mittel:we?H("mittel"):E?.mittel||null,historyId:E?.historyId||null,notes:we?H("notes"):E?.notes||null}),await L(),Y(),W()}catch{F.error("Speichern fehlgeschlagen.")}})()});be.querySelectorAll(".km-tile").forEach(Z=>Z.addEventListener("click",()=>{be.querySelectorAll(".km-tile").forEach(U=>U.classList.remove("on")),Z.classList.add("on")})),be.querySelectorAll(".km-segb").forEach(Z=>Z.addEventListener("click",()=>{be.querySelectorAll(".km-segb").forEach(U=>U.classList.remove("on")),Z.classList.add("on")}));const ae=be.querySelector('[data-f="datum"]');be.querySelectorAll("[data-day]").forEach(Z=>Z.addEventListener("click",()=>{const U=Z.dataset.day;if(U==="x"){ae.style.display="inline-block",ae.showPicker?.();return}const G=new Date;G.setDate(G.getDate()+Number(U)),ae.value=G.toISOString().slice(0,10),ae.style.display="none"})),be.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(E?.id)try{await vi({id:E.id}),await L(),Y(),W(),Ve()}catch{F.error("Löschen fehlgeschlagen.")}})}e.querySelectorAll(".km-modebtn").forEach(w=>w.addEventListener("click",()=>ie(w.dataset.mode))),document.addEventListener("keydown",w=>{w.key==="Escape"&&(v&&Ve(),Bt())}),window.addEventListener("psm:openKultur",w=>{const E=w?.detail;!E?.typ||!E?.id||(o=E.typ+":"+E.id,ie("flaechen"),p&&(vt(),Ce(),$()))}),t.state.subscribe(w=>{w?.app?.activeSection==="kultur"&&(p?(async()=>(a=await ls(t),Y(),$()))():(p=!0,q()))}),oe()}function Vd(){return`
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
  </section>`}const Zd=["pflanzenschutz.json","history.json","entries.json"];let cs=!1,K=null,bt=!1;const Rt=25,br=new Intl.NumberFormat("de-DE");let Le=0,hn=null,ds=null;const Qd=qs({id:"import",label:"Import-Vorschau",budget:{initialLoad:20,maxItems:50}});let qr=null;function Jd(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function Yd(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Xd(e,t){const a=e.querySelector('[data-role="import-log-list"]');if(a){if(!t.length){a.innerHTML='<tr><td colspan="5" class="text-muted small">Noch keine Importe protokolliert.</td></tr>';return}a.innerHTML=t.map(n=>{const r=n.rangeStart||n.rangeEnd?`${Oa(n.rangeStart)||n.rangeStart||"?"} – ${Oa(n.rangeEnd)||n.rangeEnd||"?"}`:"-",i=[n.source,n.device].filter(Boolean),l=i.length?b(i.join(" · ")):"-";return`
        <tr>
          <td>${b(Yd(n.importedAt))}</td>
          <td>${l}</td>
          <td class="text-end text-success">${n.added}</td>
          <td class="text-end text-muted">${n.skipped}</td>
          <td class="small text-muted">${b(r)}</td>
        </tr>`}).join("")}}async function Dn(e){if(pe()==="sqlite")try{const t=await Jo(50);Xd(e,t.items||[])}catch(t){console.warn("Import-Historie konnte nicht geladen werden",t)}}function ht(e,t,a="info"){const n=e.querySelector('[data-role="import-hint"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a} small mt-3`,n.textContent=t}}function Ht(e,t){const a=e.querySelector('[data-role="import-feedback"]');a&&(a.textContent=t)}function Pt(e){const t=e.querySelector('[data-action="clear-import"]'),a=e.querySelector('[data-action="focus-import"]'),n=e.querySelector('[data-action="run-import"]'),r=!!K;if(t&&(t.disabled=!r||bt),a&&(a.disabled=!r||bt),n){const i=!!(K?.importableEntries?.length&&K.stats||K?.fotos?.length);n.disabled=!r||!i||bt}}function eu(e){K=null,cu(e);const t=e.querySelector('[data-role="import-summary-card"]'),a=e.querySelector('[data-role="import-file"]');t&&t.classList.add("d-none"),a&&(a.value=""),Ht(e,""),ht(e,"Bereit für eine neue Importdatei."),Pt(e),Jt()}function so(e){if(e.dateIso)return e.dateIso;if(e.datum){const t=new Date(e.datum);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.date){const t=new Date(e.date);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.savedAt){const t=new Date(e.savedAt);if(!Number.isNaN(t.getTime()))return t.toISOString()}return null}function On(e){return e?Oa(e)||e.slice(0,10):"-"}function oo(e){return e.savedAt||(e.savedAt=e.createdAt||e.dateIso||new Date().toISOString()),e}function us(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function tu(e){if(!e||typeof e!="object")return null;const t={...e};if(!Array.isArray(t.items)){const a=e.items;t.items=Array.isArray(a)?[...a]:[]}return oo(t),t}function lo(e,t){const a=e.map(n=>so(n)).filter(n=>!!n).sort();return{startIso:a[0]||t?.filters?.startDate||null,endIso:a[a.length-1]||t?.filters?.endDate||null}}function au(e){if(!e)return;const t=us(e.startIso,"start"),a=us(e.endIso,"end");if(!t&&!a)return;const n={};return t&&(n.startDate=t),a&&(n.endDate=a),n}async function co(e,t){if(pe()!=="sqlite"){const o=je(e.history);return new Set(o.map(d=>_n(d)).filter(d=>!!d))}const n=au(t);if(!n)return new Set;const r=new Set;let i=1;const l=500;try{for(;;){const o=await $s({page:i,pageSize:l,filters:n,sortDirection:"asc"});if(o.items.forEach(d=>{const p=_n(d);p&&r.add(p)}),i*l>=o.totalCount)break;i+=1}}catch(o){return console.warn("Konnte vorhandene Einträge für Duplikatprüfung nicht laden",o),new Set}return r}function _n(e){const t=typeof e.clientUuid=="string"&&e.clientUuid?e.clientUuid:"";if(t)return`uuid:${t}`;const a=e.savedAt||e.dateIso||e.createdAt||e.datum||"",n=e.ersteller||"",r=e.kultur||"",i=e.invekos||e.standort||"";return[a,n,r,i].join("|")}function nu(e,t,a,n){const r=n||lo(e,a),i=r.startIso,l=r.endIso,o=new Set,d=new Set;return t.forEach(p=>{p.ersteller&&o.add(p.ersteller),p.kultur&&d.add(p.kultur)}),{startDateLabel:On(i),endDateLabel:On(l),startDateRaw:i,endDateRaw:l,entryCount:e.length,importableCount:t.length,duplicateCount:e.length-t.length,creators:Array.from(o).slice(0,5),crops:Array.from(d).slice(0,5)}}function ru(e,t){const a=e.querySelector('[data-role="import-stats"]');if(!a)return;if(!t){a.innerHTML="";return}const n=t.stats,r=t.metadata?.filters;a.innerHTML=`
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
  `}function iu(e,t){const a=e.querySelector('[data-role="import-warnings"]');if(!a)return;if(!t||!t.warnings.length){a.innerHTML="";return}const n=t.warnings.map(r=>`<li>${b(r)}</li>`).join("");a.innerHTML=`
    <div class="alert alert-warning">
      <strong>Hinweise:</strong>
      <ul class="mb-0">${n}</ul>
    </div>
  `}function uo(e){const t=e.entries.length;if(!t)return Le=0,{start:0,end:0,total:0};const a=Math.max(Math.ceil(t/Rt),1);Le>=a&&(Le=a-1),Le<0&&(Le=0);const n=Le*Rt,r=Math.min(n+Rt,t);return{start:n,end:r,total:t}}function su(e){const t=e.querySelector('[data-role="import-pager"]');return t?((!hn||ds!==t)&&(hn?.destroy(),hn=Za(t,{onPrev:()=>ou(e),onNext:()=>lu(e),labels:{prev:"Zurück",next:"Weiter",loading:"Vorschau wird geladen...",empty:"Keine Einträge verfügbar"}}),ds=t),hn):null}function Ha(e,t){const a=su(e);if(!a)return;if(!t){Le=0,a.update({status:"hidden"});return}const n=t.entries.length;if(!n){Le=0,a.update({status:"disabled",info:"Keine Einträge vorhanden."});return}const{start:r,end:i}=uo(t),l=`Einträge ${br.format(r+1)}–${br.format(i)} von ${br.format(n)}`;a.update({status:"ready",info:l,canPrev:Le>0,canNext:i<n})}function ou(e){!K||Le===0||(Le=Math.max(Le-1,0),ii(e,K))}function lu(e){if(!K)return;const t=K.entries.length;if(!t)return;const a=Math.max(Math.ceil(t/Rt)-1,0);Le>=a||(Le=Math.min(Le+1,a),ii(e,K))}function cu(e){Le=0,e&&Ha(e,K)}function ii(e,t){const a=e.querySelector('[data-role="import-preview-table"]');if(!a){Jt();return}if(!t){a.innerHTML="",Ha(e,null),Jt();return}if(!t.entries.length){a.innerHTML='<tr><td colspan="5" class="text-center text-muted">Keine Einträge</td></tr>',Ha(e,t),Jt();return}const{start:r,end:i}=uo(t),o=t.entries.slice(r,i).map(d=>{const p=On(so(d));return`
        <tr>
          <td>${b(p)}</td>
          <td>${b(d.kultur||"-")}</td>
          <td>${b(d.ersteller||"-")}</td>
          <td>${b(d.standort||d.invekos||"-")}</td>
          <td>${b(d.savedAt?On(d.savedAt):"-")}</td>
        </tr>
      `}).join("");a.innerHTML=o,Ha(e,t),Jt()}async function du(e){const t=el(e),a=Object.keys(t),n=a.find(p=>Zd.some(u=>p.toLowerCase().endsWith(u)));if(!n)throw new Error("ZIP enthält keine 'pflanzenschutz.json'.");const r=JSON.parse(vr(t[n])),i=a.find(p=>p.toLowerCase().endsWith("metadata.json")),l=i?JSON.parse(vr(t[i])):null,o=Array.isArray(r)?r:Array.isArray(r.entries)?r.entries:Array.isArray(r.history)?r.history:[],d=Array.isArray(r?.fotos)?r.fotos:[];for(const p of d){if(p?.data)continue;const u=p?.file?String(p.file):null,f=u?a.find(v=>v===u||v.toLowerCase().endsWith(u.toLowerCase())):null;f&&t[f]&&(p.data=uu(t[f]),p.mime||(p.mime="image/jpeg"))}return{entries:o,metadata:l,fotos:d}}function uu(e){let t="";for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode(...e.subarray(n,n+32768));return btoa(t)}async function pu(e){const t=vr(e),a=JSON.parse(t);if(Array.isArray(a))return{entries:a,metadata:null,fotos:[]};const n=Array.isArray(a.fotos)?a.fotos:[];if(Array.isArray(a.entries))return{entries:a.entries,metadata:a.metadata||null,fotos:n};if(Array.isArray(a.history))return{entries:a.history,metadata:a.metadata||null,fotos:n};if(n.length)return{entries:[],metadata:a.metadata||null,fotos:n};throw new Error("JSON enthält keine Eintragsliste.")}async function mu(e,t){const a=new Uint8Array(await e.arrayBuffer()),n=/\.zip$/i.test(e.name)||e.type==="application/zip",{entries:r,metadata:i,fotos:l}=n?await du(a):await pu(a),o=Array.isArray(l)?l:[],d=(Array.isArray(r)?r:[]).map(S=>tu(S)).filter(S=>!!S);if(!d.length&&!o.length)throw new Error("Die Datei enthielt keine verwertbaren Einträge.");const p=lo(d,i),u=await co(t,p),f=new Set,v=[];let x=0;d.forEach(S=>{const D=_n(S);if(!D){v.push(S);return}if(u.has(D)||f.has(D)){x+=1;return}f.add(D),v.push(S)});const m=nu(d,v,i,p),k=[];return x&&k.push(`${x} Datensätze wurden wegen gleicher Kennung übersprungen.`),(!m.startDateRaw||!m.endDateRaw)&&k.push("Zeitraum konnte nicht eindeutig ermittelt werden."),{filename:e.name,entries:d,importableEntries:v,metadata:i,stats:m,warnings:k,lastImportRefs:[],fotos:o}}function ps(){if(!K)return"Keine Datei";const e=[];return bt&&e.push("Verarbeitung"),K.warnings.length&&e.push("Warnungen"),K.stats.importableCount<K.stats.entryCount&&e.push("Duplikate entfernt"),e.length?e.join(" · "):void 0}function fu(){const e=!!K,t=e?Math.max(Math.ceil((K?.entries.length||0)/Rt),1):null,a=e?{items:K?.entries.length??0,totalCount:K?.stats.entryCount??null,cursor:K&&(K.entries.length||0)>Rt?`Seite ${Le+1}${t?` / ${t}`:""}`:null,payloadKb:Os(K?.entries.slice(0,Rt)),lastUpdated:qr,note:ps()}:{items:0,totalCount:0,cursor:null,payloadKb:0,lastUpdated:qr,note:ps()};Hs(Qd,a)}function Jt(){qr=new Date().toISOString(),fu()}function Hr(e){const t=e.querySelector('[data-role="import-summary-card"]');if(!t)return;if(!K){t.classList.add("d-none"),Ha(e,null),Pt(e),Jt();return}t.classList.remove("d-none"),Le=0;const a=t.querySelector('[data-role="import-file-name"]'),n=t.querySelector('[data-role="import-summary-subline"]');a&&(a.textContent=K.filename),n&&(n.textContent=`${K.stats.importableCount} von ${K.stats.entryCount} Einträgen importierbar`),ru(e,K),iu(e,K),ii(e,K),Pt(e)}async function gu(){const e=pe();if(!e||e==="memory"||e==="sqlite")return;const t=Ze();await Qe(t)}function ms(e,t){if(!t.length)return[];const a=typeof e.state.updateSlice=="function"?e.state.updateSlice:Xe,n=[];return a("history",r=>{const i=Ua(r),l=i.items.slice(),o=l.length;return t.forEach((d,p)=>{n.push(o+p),l.push(d)}),{...i,items:l,totalCount:l.length,lastUpdatedAt:new Date().toISOString()}}),n}async function bu(e,t){if(!K){window.alert("Bitte zuerst eine Importdatei laden.");return}const a=K.fotos||[];if(!K.importableEntries.length&&!a.length){window.alert("Alle Einträge wurden bereits importiert oder als Duplikat erkannt.");return}bt=!0,Pt(e),Ht(e,"Import läuft ...");const n=t.state.getState(),r={startIso:K.stats.startDateRaw,endIso:K.stats.endDateRaw};let i=new Set;try{i=await co(n,r)}catch(k){console.warn("Duplikatprüfung vor Import fehlgeschlagen",k)}const l=new Set(i),o=[];let d=0;if(K.importableEntries.forEach(k=>{const S=_n(k);if(S&&l.has(S)){d+=1;return}S&&l.add(S),o.push(k)}),!o.length&&!a.length){Ht(e,"Keine neuen Einträge gefunden."),ht(e,"Alle Datensätze sind bereits importiert worden.","warning"),bt=!1,Pt(e);return}const p=pe(),u=[],f=[];let v=0,x=0;const m=o.map(k=>oo({...k}));try{if(p==="sqlite"){const I=[];for(const Q of m)try{const W=await bs(Q);if(W?.duplicate){d+=1;continue}W?.id!=null&&(u.push({source:"sqlite",ref:W.id}),I.push(Q))}catch(W){console.error("appendHistoryEntry failed",W),f.push(Q.savedAt||"Unbekannter Eintrag")}ms(t,I);for(const Q of a)try{(await Yo(Q))?.duplicate?x+=1:v+=1}catch(W){console.error("appendFoto failed",W)}v&&window.dispatchEvent(new CustomEvent("fotos:changed"));try{await Ye()}catch(Q){console.warn("SQLite-Datei konnte nach dem Import nicht gespeichert werden",Q)}}else ms(t,m).forEach(Q=>{u.push({source:"state",ref:Q})}),await gu();const k=u.length;if(k||v){p==="sqlite"&&k&&t.events?.emit?.("history:data-changed",{type:"created-bulk",count:k});const I=[];k&&I.push(`${k} Einträge`),v&&I.push(`${v} Foto(s)`),Ht(e,`${I.join(" und ")} importiert.${f.length?` ${f.length} Einträge konnten nicht übernommen werden.`:""}`.trim()),K.lastImportRefs=u,K.importableEntries=[],K.stats={...K.stats,importableCount:0},Hr(e)}else Ht(e,"Keine neuen Daten importiert.");const S=[];let D="success";if(f.length&&(S.push(`${f.length} Einträge konnten nicht gespeichert werden. Details siehe Konsole.`),D="warning"),d&&(S.push(`${d} Einträge wurden während des Imports als Duplikat übersprungen.`),D="warning"),x&&S.push(`${x} Foto(s) waren bereits vorhanden (übersprungen).`),S.length||S.push("Import abgeschlossen."),ht(e,S.join(" "),D),p==="sqlite"&&(k||d||v||x))try{const I=[];f.length&&I.push(`${f.length} fehlgeschlagen`),v&&I.push(`${v} Fotos`),x&&I.push(`${x} Fotos doppelt`),await Xo({source:K.filename||null,device:K.metadata?.device||K.metadata?.label||null,added:k,skipped:d,rangeStart:K.stats.startDateRaw,rangeEnd:K.stats.endDateRaw,note:I.length?I.join(", "):null}),await Ye().catch(()=>{}),await Dn(e)}catch(I){console.warn("Import-Historie konnte nicht geschrieben werden",I)}}catch(k){console.error("Import fehlgeschlagen",k),Ht(e,"Import fehlgeschlagen. Siehe Konsole für Details."),ht(e,"Import fehlgeschlagen. Bitte erneut versuchen.","danger")}finally{bt=!1,Pt(e)}}function hu(e,t,a){if(!e.events?.emit)return;const n=t.metadata?.label||t.metadata?.filters?.label||`Import ${t.filename}`;e.events.emit("documentation:focus-range",{startDate:t.stats.startDateRaw||void 0,endDate:t.stats.endDateRaw||void 0,label:n,reason:"import",entryIds:a,autoSelectFirst:!!a.length})}function vu(e,t){if(!K){window.alert("Bitte zuerst eine Importdatei laden.");return}if(!K.stats.startDateRaw||!K.stats.endDateRaw){window.alert("Zeitraum konnte nicht bestimmt werden.");return}hu(t,K,K.lastImportRefs),ht(e,"Dokumentation wurde auf den Importzeitraum fokussiert.")}function yu(e,t){const a=e.querySelector('[data-role="import-file"]');a&&a.addEventListener("change",()=>{const n=a.files?.[0];n&&(bt=!0,ht(e,"Datei wird analysiert ..."),Pt(e),Ht(e,""),mu(n,t.state.getState()).then(r=>{K=r,Hr(e),ht(e,`${r.importableEntries.length} Einträge bereit zum Import.`)}).catch(r=>{console.error("Importdatei konnte nicht gelesen werden",r),ht(e,r?.message||"Importdatei konnte nicht gelesen werden.","danger"),K=null,Hr(e)}).finally(()=>{bt=!1,Pt(e)}))}),e.addEventListener("click",n=>{const r=n.target?.closest("[data-action]");if(!r)return;const i=r.dataset.action;if(i){if(i==="clear-import"){eu(e);return}if(i==="focus-import"){vu(e,t);return}i==="run-import"&&bu(e,t)}})}function wu(e,t){if(!e||cs)return;const a=e;a.innerHTML="";const n=Jd();a.appendChild(n),yu(n,t),ht(n,"Wähle eine Datei aus, um den Import zu starten."),Dn(n),rt("database:connected",()=>void Dn(n)),rt("app:sectionChanged",r=>{(r==="daten"||r==="documentation"||r==="import")&&Dn(n)}),cs=!0}const Tt=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function xu(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function Vt(e,t,a,n){return`
    <div class="dash-card"${n?` data-goto="${n}" style="cursor:pointer;"`:""}>
      <div class="dash-card-ic"><i class="bi ${e}"></i></div>
      <div class="dash-card-body"><div class="dash-card-value">${a}</div><div class="dash-card-label">${b(t)}</div></div>
    </div>`}function ku(){return`
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
  </section>`}function Su(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=ku();const a=e.querySelector('[data-role="dash-cards"]'),n=e.querySelector('[data-role="dash-warn"]'),r=e.querySelector('[data-role="dash-recent"]');e.addEventListener("click",l=>{const o=l.target?.closest("[data-goto]");if(!o)return;const d=o.getAttribute("data-goto");d&&t.state.updateSlice("app",p=>({...p,activeSection:d}))});const i=async()=>{if(pe()!=="sqlite"){a&&(a.innerHTML='<div class="dash-empty">Bitte zuerst eine Datenbank öffnen.</div>');return}const l=t.state.getState(),o=(je(l.gps?.points)||[]).length;let d=0,p=0,u=0,f=0,v=[],x=[],m=0;try{d=(await Or())?.rows?.length||0}catch{}try{p=(await Ds())?.rows?.length||0}catch{}try{const k=(await _r())?.rows||[];u=k.length,f=k.reduce((S,D)=>S+(D.plants||0),0)}catch{}try{v=(await Ls())?.rows||[]}catch{}try{const k=await $s({}),S=k?.entries||k?.rows||[];m=k?.totalCount??S.length,x=S.slice(0,6)}catch{}if(a&&(a.innerHTML=[Vt("bi-geo-alt","Standorte",Tt(o)),Vt("bi-flower1","Kulturen",Tt(d)),Vt("bi-droplet","Mittel im Sortiment",Tt(p),"lager"),Vt("bi-journal-check","Anwendungen",Tt(m),"documentation"),Vt("bi-map","Acker-Flächen",Tt(u),"acker"),Vt("bi-flower3","Pflanzen (Acker)",Tt(f),"acker")].join("")),n){const k=[];v.forEach(D=>{D.bestand<=0&&(D.verbraucht>0||D.zugang>0)&&k.push(`<div class="dash-row"><span><i class="bi bi-box-seam me-1" style="color:#ef4444"></i>${b(D.name)}</span><span style="color:#ef4444">Bestand ${Tt(D.bestand)} ${b(D.einheit||"")}</span></div>`)}),v.forEach(D=>{if(!D.zulEnde)return;const I=Math.round((new Date(D.zulEnde).getTime()-Date.now())/864e5);I<0?k.push(`<div class="dash-row"><span><i class="bi bi-calendar-x me-1" style="color:#ef4444"></i>${b(D.name)}</span><span style="color:#ef4444">Zulassung abgelaufen</span></div>`):I<180&&k.push(`<div class="dash-row"><span><i class="bi bi-calendar-event me-1" style="color:#f59e0b"></i>${b(D.name)}</span><span style="color:#f59e0b">Zulassung endet in ${I} T</span></div>`)});const S=k.length>6?`<div class="dash-row" style="color:var(--color-text-muted)"><span>+ ${k.length-6} weitere</span></div>`:"";n.innerHTML=k.length?k.slice(0,6).join("")+S:'<div class="dash-empty">Alles im grünen Bereich. ✓</div>'}r&&(r.innerHTML=x.length?x.map(k=>{const S=xu(k.datum||k.dateIso||k.created_at||k.createdAt||null),D=k.kultur||"",I=k.standort||"";return`<div class="dash-row"><span>${b(I)}${D?" · "+b(D):""}</span><span class="dash-empty" style="padding:0">${b(S)}</span></div>`}).join(""):'<div class="dash-empty">Noch keine Anwendungen erfasst.</div>')};t.state.subscribe(l=>{l?.app?.activeSection==="dashboard"&&i()}),i()}function fs(e){document.querySelectorAll(".content-section").forEach(a=>{a.style.display="none"});const t=document.getElementById(`section-${e}`);t instanceof HTMLElement&&(t.style.display="block")}function gs(){tl(),vs();const e={state:{getState:j,updateSlice:Xe,subscribe:An},events:{emit:(S,D)=>{$t(async()=>{const{emit:I}=await import("./index.EY2QLDgN.js").then(Q=>Q.aS);return{emit:I}},[]).then(({emit:I})=>{I(S,D)})},subscribe:rt}},t=document.querySelector('[data-region="startup"]'),a=document.querySelector('[data-region="shell"]'),n=document.querySelector('[data-region="main"]'),r=document.querySelector('[data-region="footer"]');Cl(t,e);const i=document.querySelector('[data-feature="calculation"]');al(i,e);const l=document.querySelector('[data-feature="documentation"]');Ac(l,e);const o=document.querySelector('[data-feature="settings"]');wd(o,e);const d=document.querySelector('[data-feature="lager"]');Sd(d,e);const p=document.querySelector('[data-feature="acker"]');Cd(p,e);const u=document.querySelector('[data-feature="kultur"]');Ud(u,e);const f=document.querySelector('[data-feature="fotos"]');nl(f,e,{archiveMode:!0});const v=document.querySelector('[data-feature="import-page"]');wu(v,{state:{getState:j,updateSlice:Xe},events:e.events});const x=document.querySelector('[data-feature="dashboard"]');Su(x,e);const m=S=>{const D=document.body;D&&(D.classList.toggle("bg-app",S),D.classList.toggle("bg-startup",!S))},k=S=>{const D=!!S.app?.hasDatabase;if(m(D),t instanceof HTMLElement&&t.classList.toggle("d-none",D),a instanceof HTMLElement&&a.classList.toggle("d-none",!D),n instanceof HTMLElement&&n.classList.toggle("d-none",!D),r instanceof HTMLElement&&r.classList.toggle("d-none",!D),D){const I=S.app?.activeSection??"dashboard";fs(I)}};k(e.state.getState()),An((S,D)=>{S.app?.hasDatabase!==D.app?.hasDatabase&&k(S),S.app?.activeSection!==D.app?.activeSection&&S.app?.hasDatabase&&fs(S.app.activeSection)}),rt("app:sectionChanged",()=>{})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",gs,{once:!0}):gs();
