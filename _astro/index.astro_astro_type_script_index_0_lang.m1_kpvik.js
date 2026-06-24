const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/index.DDpa22np.js","_astro/index.DeI7WYb5.js","_astro/leaflet.C03ySvDx.css","_astro/leaflet-src.BcflbDBd.js","_astro/_commonjsHelpers.Cpj98o6Y.js","_astro/index.CPadEFgJ.js"])))=>i.map(i=>d[i]);
import{M as ce,N as Es,I as tt,O as wo,P as So,Q as Ls,k as Ct,l as Eo,a as Ds,s as lt,p as xi,g as j,e as Bn,c as Nn,u as Ze,_ as Ft,v as Lo,w as $s,R as Do,S as $o,y as g,t as T,r as ki,T as zo,n as fn,q as wi,U as Ao,V as Po,W as Ge,X as Mo,Y as zs,Z as As,G as Ps,F as Fn,$ as Co,a0 as Io,a1 as Bo,a2 as No,a3 as Fo,a4 as Za,B as Ra,a5 as To,z as qo,a6 as Ye,a7 as Xe,a8 as Ho,a9 as Qa,aa as Oo,ab as _o,K as Ro,ac as Ms,ad as Cs,ae as Ka,af as Ko,ag as Wo,ah as jo,ai as Si,aj as fr,ak as mr,al as Go,am as Uo,an as Vo,ao as Zo,ap as Qo,aq as Jo,ar as Yo,as as Is,at as Xo,au as Bs,av as el,aw as Zr,ax as Dr,ay as En,az as Qr,aA as tl,aB as al,aC as Tn,aD as Ei,aE as nl,aF as Li,aG as Ea,aH as Di,aI as rl,aJ as $i,aK as zi,aL as il,aM as sl,aN as ol,aO as ll,aP as $r,x as Ns,i as cl,b as dl,d as ul}from"./index.DeI7WYb5.js";const zr="__psl_history_seeded",Ar=200,Ai=["Salat","Apfel","Wein","Tomate","Kartoffel","Hopfen","Raps","Birne"],Pi=["Spritzung","Düngung","Pflege","Behandlung"],Mi=["LACES","MALDO","VITVI","SOLTU","PRNUS","CUPAR","CYNCR","ALLCE"],Ci=["BBCH 10","BBCH 31","BBCH 41","BBCH 55","BBCH 65","BBCH 71","BBCH 81"],pl=[{mediumId:"seed-water",name:"Wasser",unit:"L",methodId:"perKiste",methodLabel:"pro Kiste",value:.02,zulassungsnummer:"N/A"},{mediumId:"seed-tonikum",name:"Tonikum X",unit:"ml",methodId:"perKiste",methodLabel:"pro Kiste",value:.85,zulassungsnummer:"Z-123456"},{mediumId:"seed-oel",name:"Pflegeöl Y",unit:"ml",methodId:"percentWater",methodLabel:"% vom Wasser",value:.12,zulassungsnummer:"Z-654321"}];function fl(e){if(typeof window>"u")return;const a=new URLSearchParams(window.location.search).has("seedHistory");if(!a)return;const n=window;n.__PSL||(n.__PSL={});const r=n.__PSL;r.seedHistoryEntries=(l=Ar)=>Ii(e,{count:l}),r.resetHistorySeedFlag=()=>localStorage.removeItem(zr),!a&&!localStorage.getItem(zr)&&ce()==="sqlite"&&Ii(e,{count:Ar,setFlag:!0}).catch(l=>{console.error("History seeding failed",l)})}async function ml(e){if(!e.state.getState().app?.hasDatabase){if(typeof e.state.subscribe!="function")throw new Error("SQLite-Datenbank ist noch nicht initialisiert.");await new Promise((t,a)=>{const n=window.setTimeout(()=>{s(),a(new Error("SQLite-Datenbank wurde nicht rechtzeitig initialisiert."))},1e4),r=e.state.subscribe?.(l=>{l.app?.hasDatabase&&(s(),t())}),s=()=>{window.clearTimeout(n),typeof r=="function"&&r()}})}}async function Ii(e,t={}){const a=t.count??Ar;if(ce()!=="sqlite")throw new Error("SQLite-Treiber muss aktiv sein, bevor Daten befüllt werden können.");await ml(e);const n=performance.now();let r=0;for(let s=0;s<a;s+=1){const l=gl(s);await Es(l),r+=1}try{await tt()}catch(s){console.warn("Seed-Daten konnten nicht persistent gespeichert werden",s)}return e.events.emit("history:data-changed",{source:"dev-history-seed"}),t.setFlag&&localStorage.setItem(zr,"1"),{inserted:r,durationMs:performance.now()-n}}function gl(e){const t=new Date;t.setDate(t.getDate()-e);const a=t.toLocaleDateString("de-DE"),n=t.toISOString(),r=20+e%30,s=Number((r*.5).toFixed(2));return{datum:a,dateIso:n,ersteller:`Seeder ${1+e%5}`,standort:`Test-Ort ${String.fromCharCode(65+e%6)}`,kultur:Ai[e%Ai.length],usageType:Pi[e%Pi.length],kisten:r,eppoCode:Mi[e%Mi.length],bbch:Ci[e%Ci.length],gps:`GPS-Notiz ${e}`,gpsCoordinates:{latitude:48+e%10*.01,longitude:11+e%10*.01},gpsPointId:`seed-gps-${e}`,invekos:`INV-${String(1e3+e).padStart(4,"0")}`,uhrzeit:`${String(6+e%12).padStart(2,"0")}:${String(e*7%60).padStart(2,"0")}`,savedAt:n,items:bl(e,r,s)}}function bl(e,t,a){return pl.map((n,r)=>{const s=1+(e+r)%4*.05,l=Number((n.value*s).toFixed(4)),o=Number((l*t).toFixed(2));return{id:`seed-item-${e}-${r}`,name:n.name,unit:n.unit,methodLabel:n.methodLabel,methodId:n.methodId,value:l,total:o,inputs:{kisten:t,waterVolume:a},zulassungsnummer:n.zulassungsnummer,mediumId:n.mediumId}})}let Ut=null,La=null,Bi=!1,Ni=!1;async function hl(){if(!("serviceWorker"in navigator))return console.warn("[PWA] Service Workers nicht unterstützt"),null;try{return La=await navigator.serviceWorker.register("/psm/sw.js",{scope:"/psm/",updateViaCache:"none"}),console.log("[PWA] Service Worker registriert:",La.scope),La.addEventListener("updatefound",()=>{const e=La?.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&(console.log("[PWA] Neues Update verfügbar"),ma("pwa:update-available"))})}),navigator.serviceWorker.addEventListener("message",vl),Bi||(Bi=!0,navigator.serviceWorker.addEventListener("controllerchange",()=>{Ni||(Ni=!0,window.location.reload())})),La}catch(e){return console.error("[PWA] Service Worker Registrierung fehlgeschlagen:",e),null}}function vl(e){const{type:t,payload:a}=e.data||{};switch(t){case"DB_STATE":ma("pwa:db-state",a);break;case"CACHES_CLEARED":ma("pwa:caches-cleared");break}}async function Zn(e){if(!navigator.serviceWorker.controller){localStorage.setItem("psm-db-state",JSON.stringify({...e,updatedAt:new Date().toISOString()}));return}navigator.serviceWorker.controller.postMessage({type:"SET_DB_STATE",payload:e})}async function Fs(){const e=localStorage.getItem("psm-db-state");if(e)try{return JSON.parse(e)}catch{}return navigator.serviceWorker?.controller?new Promise(t=>{const a=n=>{n.data?.type==="DB_STATE"&&(navigator.serviceWorker.removeEventListener("message",a),t(n.data.payload))};navigator.serviceWorker.addEventListener("message",a),navigator.serviceWorker.controller.postMessage({type:"GET_DB_STATE"}),setTimeout(()=>{navigator.serviceWorker.removeEventListener("message",a),t(null)},1e3)}):null}async function yl(){const e=await Fs();return!!(e?.hasDatabase&&e?.autoStartEnabled)}function xl(){window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),Ut=e,console.log("[PWA] Install Prompt verfügbar"),localStorage.getItem("psm-app-installed")==="true"&&(console.log("[PWA] Widerspruch erkannt: Flag sagt installiert, aber Prompt verfügbar"),localStorage.removeItem("psm-app-installed"),console.log("[PWA] Veraltetes Installations-Flag entfernt")),ma("pwa:install-available")}),window.addEventListener("appinstalled",()=>{Ut=null,Jn(),console.log("[PWA] App installiert - Flag gesetzt"),ma("pwa:installed")})}function Qn(){return Ut!==null}function Qt(){return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0}function Jr(){const e=navigator.userAgent.toLowerCase();return e.includes("edg/")?"edge":e.includes("chrome")&&!e.includes("edg")?"chrome":e.includes("firefox")?"firefox":e.includes("safari")&&!e.includes("chrome")?"safari":"other"}function Yr(){return!!(Qt()||localStorage.getItem("psm-app-installed")==="true"||window.matchMedia("(display-mode: fullscreen)").matches||window.matchMedia("(display-mode: minimal-ui)").matches||window.matchMedia("(display-mode: window-controls-overlay)").matches)}async function Ts(){if(Yr())return!0;try{if("getInstalledRelatedApps"in navigator){const e=await navigator.getInstalledRelatedApps();if(console.log("[PWA] getInstalledRelatedApps result:",e),e&&e.length>0)return Jn(),!0}}catch(e){console.warn("[PWA] getInstalledRelatedApps API Fehler:",e)}return!1}function Jn(){localStorage.setItem("psm-app-installed","true"),console.log("[PWA] App als installiert markiert")}function kl(){localStorage.removeItem("psm-app-installed"),console.log("[PWA] Installations-Flag entfernt")}function qs(){const e=Jr(),t=Qt(),a=Yr();return{canInstall:Qn(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function Hs(){const e=Jr(),t=Qt(),a=await Ts();return{canInstall:Qn(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function wl(){if(!Ut)return console.warn("[PWA] Kein Install Prompt verfügbar"),!1;try{await Ut.prompt();const{outcome:e}=await Ut.userChoice;return console.log("[PWA] Install Prompt Ergebnis:",e),e==="accepted"&&Jn(),Ut=null,e==="accepted"}catch(e){return console.error("[PWA] Install Prompt fehlgeschlagen:",e),!1}}function Sl(e){if(!("launchQueue"in window)){console.log("[PWA] Launch Queue API nicht verfügbar");return}window.launchQueue?.setConsumer(async t=>{if(!t.files?.length){console.log("[PWA] Launch ohne Dateien");return}console.log("[PWA] Datei via Launch Queue empfangen:",t.files.length);for(const a of t.files)try{await e(a),await Zn({hasDatabase:!0,fileHandleName:a.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0});break}catch(n){console.error("[PWA] Fehler beim Öffnen der Datei:",n)}}),console.log("[PWA] File Handling initialisiert")}const Ot="psm-file-handles",Xr="last-database";async function Pr(e){try{const t=await ei(),n=t.transaction(Ot,"readwrite").objectStore(Ot);await new Promise((r,s)=>{const l=n.put({key:Xr,handle:e,savedAt:new Date().toISOString()});l.onsuccess=()=>r(),l.onerror=()=>s(l.error)}),t.close(),console.log("[PWA] FileHandle gespeichert"),await Zn({hasDatabase:!0,fileHandleName:e.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}catch(t){console.error("[PWA] FileHandle speichern fehlgeschlagen:",t)}}async function Mr(){try{const e=await ei(),a=e.transaction(Ot,"readonly").objectStore(Ot),n=await new Promise((s,l)=>{const o=a.get(Xr);o.onsuccess=()=>s(o.result),o.onerror=()=>l(o.error)});if(e.close(),!n?.handle)return null;const r=n.handle;return typeof r.queryPermission=="function"&&await r.queryPermission({mode:"readwrite"})==="granted"?(console.log("[PWA] FileHandle mit Berechtigung geladen"),n.handle):(console.log("[PWA] FileHandle gefunden, aber Berechtigung erforderlich"),n.handle)}catch(e){return console.error("[PWA] FileHandle laden fehlgeschlagen:",e),null}}async function El(e){try{const t=e;return typeof t.requestPermission!="function"?(await e.getFile(),!0):await t.requestPermission({mode:"readwrite"})==="granted"}catch{return!1}}async function Ll(){try{const e=await ei(),a=e.transaction(Ot,"readwrite").objectStore(Ot);await new Promise((n,r)=>{const s=a.delete(Xr);s.onsuccess=()=>n(),s.onerror=()=>r(s.error)}),e.close(),await Zn({hasDatabase:!1,autoStartEnabled:!1}),console.log("[PWA] FileHandle gelöscht")}catch(e){console.error("[PWA] FileHandle löschen fehlgeschlagen:",e)}}async function ei(){return new Promise((e,t)=>{const a=indexedDB.open("psm-file-handles",1);a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result),a.onupgradeneeded=n=>{const r=n.target.result;r.objectStoreNames.contains(Ot)||r.createObjectStore(Ot,{keyPath:"key"})}})}function ma(e,t){window.dispatchEvent(new CustomEvent(e,{detail:t}))}function Os(){return{serviceWorker:"serviceWorker"in navigator,fileSystemAccess:typeof window.showOpenFilePicker=="function",launchQueue:"launchQueue"in window,indexedDB:"indexedDB"in window,standalone:Qt(),installAvailable:Qn()}}async function Dl(e){if(console.log("[PWA] Initialisierung..."),await hl(),xl(),e?.onFileOpened&&Sl(e.onFileOpened),e?.onAutoStart&&await yl()){const t=await Mr();if(t){const a=t;let n=!1;if(typeof a.queryPermission=="function"&&(n=await a.queryPermission({mode:"readwrite"})==="granted"),n){console.log("[PWA] Auto-Start mit gespeicherter Datei"),e.onFileOpened&&await e.onFileOpened(t);return}console.log("[PWA] Auto-Start: Berechtigung für Datei erforderlich"),ma("pwa:permission-required",{handle:t})}}console.log("[PWA] Capabilities:",Os())}async function $l(){if(console.group("🔧 PWA Debug Status"),console.log("📱 Standalone Mode:",Qt()),console.log("💾 localStorage Flag:",localStorage.getItem("psm-app-installed")),console.log("🔔 Install Prompt verfügbar:",Qn()),console.log("🌐 Browser:",Jr()),console.group("📺 Display Mode Checks"),console.log("standalone:",window.matchMedia("(display-mode: standalone)").matches),console.log("fullscreen:",window.matchMedia("(display-mode: fullscreen)").matches),console.log("minimal-ui:",window.matchMedia("(display-mode: minimal-ui)").matches),console.log("window-controls-overlay:",window.matchMedia("(display-mode: window-controls-overlay)").matches),console.log("browser:",window.matchMedia("(display-mode: browser)").matches),console.groupEnd(),console.group("🔍 getInstalledRelatedApps API"),"getInstalledRelatedApps"in navigator)try{const e=await navigator.getInstalledRelatedApps();console.log("Installierte Apps:",e)}catch(e){console.log("API Fehler:",e)}else console.log("API nicht verfügbar");console.groupEnd(),console.group("📊 Status Vergleich"),console.log("Sync (isProbablyInstalled):",Yr()),console.log("Async (checkIfInstalled):",await Ts()),console.log("getInstallStatus():",qs()),console.log("getInstallStatusAsync():",await Hs()),console.groupEnd(),console.log("💡 Tipp: clearInstalledFlag() zum Zurücksetzen des Flags"),console.groupEnd()}typeof window<"u"&&(window.pwaDebug=$l,window.pwaClearFlag=kl);let mn=!1;function zl(e){const t=r=>{if(mn){mn=!1;return}return r.preventDefault(),r.returnValue="",""};let a=!1;const n=r=>{const s=!!r.app?.hasDatabase;s&&!a?(window.addEventListener("beforeunload",t),a=!0):!s&&a&&(window.removeEventListener("beforeunload",t),a=!1)};n(e.getState()),e.subscribe(n),document.addEventListener("click",r=>{const s=r.target.closest("a");s&&s.target==="_blank"&&(mn=!0,setTimeout(()=>{mn=!1},100))})}function Al(){const e=document.getElementById("app-root");if(!e)throw new Error("app-root Container fehlt");return{startup:e.querySelector('[data-region="startup"]'),shell:e.querySelector('[data-region="shell"]'),main:e.querySelector('[data-region="main"]'),footer:e.querySelector('[data-region="footer"]')}}async function Pl(){if(wo()){window.location.replace("/psm/m/");return}Al(),So();const e=Ls();e!=="memory"&&Ct(e),await Eo();const t={state:{getState:j,patchState:xi,updateSlice:Ze,subscribe:Nn},events:{emit:Bn,subscribe:lt}};fl(t),Ds(),zl(t.state),Dl({onFileOpened:async a=>{const n=await Ft(()=>import("./index.DeI7WYb5.js").then(s=>s.aR),[]),r=await Ft(()=>import("./index.DeI7WYb5.js").then(s=>s.aQ),[]);if(r.isSupported()){n.setActiveDriver("sqlite");const s=await a.getFile(),l=await s.arrayBuffer(),o=await r.importFromArrayBuffer(l,s.name);await Pr(a);const{applyDatabase:d}=await Ft(async()=>{const{applyDatabase:f}=await import("./index.DeI7WYb5.js").then(u=>u.aT);return{applyDatabase:f}},[]);d(o.data),Bn("database:connected",{driver:"sqlite",autoStarted:!0})}}}),lt("database:connected",async a=>{await Zn({hasDatabase:!0,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}),lt("database:connected",async a=>{if(ce()==="sqlite")try{await Lo(),await $s()}catch(n){console.warn("GPS-Punkte konnten beim Start nicht geladen werden",n)}}),xi({app:{...j().app,ready:!0}})}const Fi="__pflanzenschutz_bootstrapped__",Ti=window;function qi(){Pl().catch(e=>{console.error("bootstrap failed",e)})}Ti[Fi]||(Ti[Fi]=!0,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",qi,{once:!0}):qi());const _s=[{id:"start",label:"Start",icon:"bi-grid-1x2",sections:[{section:"dashboard",label:"Übersicht",icon:"bi-grid-1x2"}]},{id:"psm",label:"PSM",icon:"bi-flower1",sections:[{section:"calc",label:"Neu erfassen",icon:"bi-pencil-square"},{section:"documentation",label:"Übersicht",icon:"bi-list-ul"},{section:"lager",label:"Lager",icon:"bi-box-seam"},{section:"settings",label:"Einstellungen",icon:"bi-gear"}]},{id:"acker",label:"Acker-Planer",icon:"bi-map",sections:[{section:"acker",label:"Karte",icon:"bi-map"},{section:"kultur",label:"Kulturführung",icon:"bi-clipboard2-pulse"}]},{id:"fotos",label:"Fotos",icon:"bi-camera",sections:[{section:"fotos",label:"Fotos",icon:"bi-camera"}]},{id:"daten",label:"Daten",icon:"bi-database",sections:[{section:"daten",label:"Import",icon:"bi-cloud-upload"}]}],Rs={dashboard:"start",calc:"psm",documentation:"psm",lager:"psm",history:"psm",report:"psm",acker:"acker",kultur:"acker",fotos:"fotos",settings:"psm",gps:"psm",lookup:"psm",import:"daten",daten:"daten"};function Ks(e){return _s.find(t=>t.id===e)}function Ml(e){const t=Rs[e];return t?Ks(t):void 0}function Cl(){const e=document.getElementById("offline-indicator");if(!e)return;const t=()=>{const a=!navigator.onLine;e.classList.toggle("d-none",!a)};t(),window.addEventListener("online",t),window.addEventListener("offline",t)}function Hi(e){j().app.activeSection!==e&&(Ze("app",t=>({...t,activeSection:e})),Bn("app:sectionChanged",e))}function Oi(){Cl();const e=document.querySelectorAll(".nav-btn[data-area]"),t=document.getElementById("brand-link"),a=document.getElementById("topnav-tabs"),n=document.getElementById("topnav-area-icon"),r=document.getElementById("topnav-area-label"),s={};for(const h of _s)s[h.id]=h.sections[0].section;let l=null;function o(h,S){if(a){if(h.sections.length<=1){a.innerHTML="";return}a.innerHTML=h.sections.map(w=>`
        <button type="button" class="topnav-tab${w.section===S?" active":""}" data-section="${w.section}">
          <i class="bi ${w.icon}"></i><span>${w.label}</span>
        </button>`).join("")}}function d(h){a&&a.querySelectorAll(".topnav-tab").forEach(S=>{S.classList.toggle("active",S.dataset.section===h)})}const f=h=>{const S=Ks(h);!S||!j().app.hasDatabase||Hi(s[h]??S.sections[0].section)};e.forEach(h=>{h.addEventListener("click",()=>{const S=h.dataset.area;S&&f(S)})}),t?.addEventListener("click",h=>{h.preventDefault(),f("start")}),a?.addEventListener("click",h=>{const w=h.target?.closest(".topnav-tab")?.dataset.section;w&&Hi(w)});const u=document.querySelector('.nav-btn[data-action="share-data"]');u?.addEventListener("click",()=>{u.disabled=!0,Ft(async()=>{const{shareMobileData:h}=await import("./index.DDpa22np.js");return{shareMobileData:h}},__vite__mapDeps([0,1])).then(({shareMobileData:h})=>h()).catch(h=>console.error("Teilen fehlgeschlagen",h)).finally(()=>{u.disabled=!1})}),Do(),lt("history:data-changed",h=>{if(!document.body.classList.contains("mobile-mode"))return;const S=h?.type;(S==="created"||S==="created-bulk")&&$o()});const m=h=>{const S=document.getElementById("brand-title"),w=document.getElementById("brand-tagline"),E=document.getElementById("app-version");S&&h.company.name&&(S.textContent=h.company.name),w&&h.company.headline&&(w.textContent=h.company.headline),E&&h.app.version&&(E.textContent=`v${h.app.version}`);const M=h.app.hasDatabase,U=h.app.activeSection,K=Ml(U);K&&Rs[U]===K.id&&(s[K.id]=U),e.forEach(be=>{be.disabled=!M;const N=M&&K?.id===be.dataset.area;be.classList.toggle("active",!!N)}),K&&(n&&(n.className=`bi ${K.icon} topnav-area-icon`),r&&(r.textContent=K.label),l!==K.id?(o(K,U),l=K.id):d(U))};Nn(m),m(j());let v=!1;const k=document.title||"Pflanzenschutz";window.addEventListener("beforeprint",()=>{v||(v=!0,document.title=" ")}),window.addEventListener("afterprint",()=>{v&&(v=!1,document.title=k)})}function Il(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Oi,{once:!0}):Oi()}Il();const Bl="https://api.digitale-psm.de",Nl="digitale-psm.de";async function Fl(e){try{const t=await fetch(`${Bl}/api/v1/${Nl}/views/${e}`,{method:"POST",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`API error: ${t.status}`);return(await t.json()).views}catch(t){return console.warn("[ViewCounter] Fehler beim Zählen:",t),null}}function Tl(e){return e>=1e6?(e/1e6).toFixed(1).replace(".",",")+"M":e>=1e3?(e/1e3).toFixed(1).replace(".",",")+"K":e.toString()}const Cr="pflanzenschutz-datenbank.json";let _i=!1;function ql(e){return e?`${e.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"pflanzenschutz-datenbank"}.json`:Cr}async function Da(e,t){if(!e){await t();return}const a=e.textContent??"";e.disabled=!0,e.dataset.busy="true",e.textContent="Bitte warten...";try{await t()}finally{e.disabled=!1,e.dataset.busy="false",e.textContent=a}}function Ri(e){return g(e)}function Hl(e){const t=document.createElement("section");t.className="section-container d-none",t.innerHTML=`
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
                <input class="form-control" id="wizard-company-name" name="wizard-company-name" required value="${Ri(e.name)}" placeholder="z.B. Gärtnerei Müller" />
              </div>
              <div class="col-md-6">
                <label class="form-label d-block mb-2" for="wizard-company-headline">
                  Überschrift <span class="text-muted small">(optional)</span>
                </label>
                <input class="form-control" id="wizard-company-headline" name="wizard-company-headline" value="${Ri(e.headline)}" placeholder="z.B. Pflanzenschutz-Dokumentation 2025" />
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
  `;const a=t.querySelector("#database-wizard-form");if(!a)throw new Error("Wizard-Formular konnte nicht erzeugt werden");const n=t.querySelector('[data-role="wizard-result"]');if(!n)throw new Error("Wizard-Resultat-Container fehlt");return{section:t,form:a,resultCard:n,preview:t.querySelector('[data-role="wizard-preview"]'),filenameLabel:t.querySelector('[data-role="wizard-filename"]'),saveHint:t.querySelector('[data-role="wizard-save-hint"]'),saveButton:t.querySelector('[data-action="wizard-save"]'),reset(){a.reset(),n.classList.add("d-none");const r=t.querySelector('[data-role="wizard-preview"]');r&&(r.textContent="");const s=t.querySelector('[data-role="wizard-filename"]');s&&(s.textContent="")}}}function Ol(e,t){if(!e||_i)return;const a=e;let n=null,r=Cr,s="landing";const o=t.state.getState().company,d=document.createElement("section");d.className="section-container";function f(q,D){const A=q;d.innerHTML=`
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
  `}f(!1,Qt());const u=Hl(o);a.innerHTML="",a.appendChild(d),a.appendChild(u.section);const m=typeof window<"u"&&typeof window.showSaveFilePicker=="function";u.saveButton&&(m?u.saveHint&&(u.saveHint.textContent='Der Browser fragt nach einem Speicherort. Die erzeugte Datei kannst du später über "Bestehende Datei verbinden" erneut laden.'):(u.saveButton.disabled=!0,u.saveButton.textContent="Datei speichern (nicht verfügbar)",u.saveHint&&(u.saveHint.textContent="Dieser Browser unterstützt keinen direkten Dateidialog. Bitte nutze einen Chromium-basierten Browser (z. B. Chrome, Edge) über HTTPS oder http://localhost.")));function v(q=t.state.getState()){const D=!!q.app?.hasDatabase;if(a.classList.toggle("d-none",D),D){d.classList.add("d-none"),u.section.classList.add("d-none");return}s==="wizard"?(d.classList.add("d-none"),u.section.classList.remove("d-none")):(d.classList.remove("d-none"),u.section.classList.add("d-none"))}async function k(q){await Da(q,async()=>{try{const D=ce();D==="sqlite"||D==="filesystem"?Ct(D):Ct("filesystem")}catch(D){throw T.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),D instanceof Error?D:new Error("Dateisystem nicht verfügbar")}try{const D=await zo();fn(D.data);const A=D.context;A?.fileHandle&&await Pr(A.fileHandle),t.events.emit("database:connected",{driver:ce()})}catch(D){console.error("Fehler beim Öffnen der Datenbank",D),T.error(D instanceof Error?D.message:"Öffnen der Datenbank fehlgeschlagen")}})}function h(q){Da(q,async()=>{const D=ki(),A=["localstorage","sqlite","memory"];for(const ie of A)try{Ct(ie);const ee=await wi(D);fn(ee.data),t.events.emit("database:connected",{driver:ce()||ie});return}catch(ee){console.warn(`Treiber ${ie} konnte nicht initialisiert werden`,ee)}const J="Keine geeignete Speicheroption verfügbar. Bitte Browserberechtigungen prüfen.";console.error(J),T.error(J)})}async function S(q){if(!n){T.warning("Bitte erst die Datenbank erzeugen.");return}await Da(q,async()=>{try{const D=ce();D==="sqlite"||D==="filesystem"?Ct(D):Ct("filesystem")}catch(D){throw T.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),D instanceof Error?D:new Error("Dateisystem nicht verfügbar")}try{const D=await wi(n);fn(D.data),t.events.emit("database:connected",{driver:ce()})}catch(D){console.error("Fehler beim Speichern der Datenbank",D),T.error(D instanceof Error?D.message:"Die Datei konnte nicht gespeichert werden")}})}function w(q){q.preventDefault();const D=new FormData(u.form),A=(D.get("wizard-company-name")||"").toString().trim();if(!A){T.warning("Bitte einen Firmennamen angeben.");return}const J=(D.get("wizard-company-headline")||"").toString().trim(),ie=(D.get("wizard-company-address")||"").toString().trim();n=ki({meta:{company:{name:A,headline:J,logoUrl:"",contactEmail:"",address:ie}}}),r=ql(A),u.preview.textContent=JSON.stringify(n,null,2),u.filenameLabel.textContent=r,u.resultCard.classList.remove("d-none"),u.resultCard.scrollIntoView({behavior:"smooth",block:"start"})}function E(){s="landing",n=null,r=Cr,u.reset(),v()}function M(){s="wizard",v()}async function U(q){await Da(q,async()=>{try{const D=await Mr();if(!D){T.warning("Keine gespeicherte Datei gefunden.");return}if(!await El(D)){T.warning("Berechtigung zum Zugriff auf die Datei wurde verweigert.");return}Ct("sqlite");const J=await D.getFile(),ie=await J.arrayBuffer(),ee=await Ao(ie,J.name);Po(D),fn(ee.data),await Pr(D),t.events.emit("database:connected",{driver:"sqlite",autoStarted:!0}),T.success("Datenbank erfolgreich geladen!")}catch(D){console.error("Auto-Start fehlgeschlagen:",D),T.error(D instanceof Error?D.message:"Fehler beim Laden der gespeicherten Datei")}})}async function K(){await Ll();const q=d.querySelector("#auto-start-banner");q&&q.classList.add("d-none"),T.info("Gespeicherte Datei wurde vergessen.")}async function be(q){await Da(q,async()=>{if(await wl()){T.success("App wird installiert!");const A=d.querySelector("#pwa-install-banner");A&&A.classList.add("d-none")}})}if(d.addEventListener("click",q=>{const D=q.target?.closest("button[data-action]");if(!D)return;const A=D.dataset.action;if(A==="start-wizard"){M();return}A==="open"?k(D):A==="useDefaults"?h(D):A==="auto-start"?U(D):A==="auto-start-forget"?K():A==="install-pwa"&&be(D)}),u.form.addEventListener("submit",w),u.section.addEventListener("click",q=>{const D=q.target?.closest("[data-action]");if(!D)return;const A=D.dataset.action;if(A==="wizard-back"){E();return}A==="wizard-save"&&S(D)}),t.state.subscribe(q=>v(q)),v(t.state.getState()),!t.state.getState().app.hasDatabase){const q=Ls();if(q&&q!==ce())try{Ct(q)}catch(D){console.warn("Bevorzugter Speicher konnte nicht gesetzt werden",D)}}(async()=>{const q=await Mr(),D=await Fs(),A=!!(q&&D?.hasDatabase),J=Qt();f(A,J);const ie=d.querySelector('[data-role="view-count"]');if(ie&&Fl("app").then(xe=>{xe!==null&&(ie.textContent=Tl(xe))}),A&&q){const xe=d.querySelector('[data-role="auto-start-filename"]');xe&&(xe.textContent=`Datei: ${q.name}`)}N(),window.addEventListener("pwa:install-available",()=>{N()}),window.addEventListener("pwa:installed",()=>{Jn(),N()}),window.addEventListener("pwa:permission-required",async xe=>{const Ie=xe.detail?.handle;if(Ie){const Be=d.querySelector("#auto-start-banner"),Jt=d.querySelector('[data-role="auto-start-filename"]');Be&&Jt&&(Jt.textContent=`Datei: ${Ie.name} (Berechtigung erforderlich)`,Be.classList.remove("d-none"))}}),console.log("[Startup] PWA Capabilities:",Os());const ee=await Hs();console.log("[Startup] PWA Install Status (async):",ee),Z(ee)})();function N(){const q=qs();Z(q)}function Z(q){const D=d.querySelector("#pwa-install-banner"),A=d.querySelector('[data-role="pwa-content"]');if(!(!D||!A)){if(!q.showBanner){D.classList.add("d-none");return}D.classList.remove("d-none"),q.isInstalled?A.innerHTML=`
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
      `:D.classList.add("d-none")}}_i=!0}function Ws(e){let t=!1,a=!1;const n=o=>{e.onStatusChange&&e.onStatusChange(o)},r=()=>{t||!a||j().app.activeSection!==e.section||e.shouldRefresh&&!e.shouldRefresh()||(a=!1,n("refreshing"),Promise.resolve(e.onRefresh()).catch(d=>{console.error("Auto-Refresh konnte nicht ausgeführt werden",d),a=!0,n("stale")}).finally(()=>{!t&&!a&&n("idle")}))},s=lt(e.event,()=>{e.shouldHandleEvent&&!e.shouldHandleEvent()||(a=!0,n("stale"),r())}),l=lt("app:sectionChanged",o=>{o===e.section&&(a?r():n("idle"))});return j().app.activeSection===e.section&&n("idle"),()=>{t=!0,s(),l()}}const _l={prev:"Zurück",next:"Weiter",loading:"Lädt …",empty:"Keine Einträge verfügbar"};function Ki(){const e=document.createElement("span");return e.className="spinner-border spinner-border-sm",e.setAttribute("role","status"),e.setAttribute("aria-hidden","true"),e}function Wi(e){const t=document.createElement("div");return t.className="pager-widget__info text-muted small text-center flex-grow-1",t.textContent=e?.trim()||"",t}function Ja(e,t){if(!e)return null;const a=document.createElement("div");a.className="pager-widget d-flex flex-column gap-2",e.innerHTML="",e.appendChild(a);let n={status:"hidden"},r=!1;const s={..._l,...t.labels||{}};function l(){a.replaceChildren()}function o(m){const v=Wi(m.info||s.empty);a.replaceChildren(v)}function d(m){const v=document.createElement("div");v.className="alert alert-danger mb-0",v.textContent=m.message||"Unbekannter Fehler",a.replaceChildren(v)}function f(m){const v=document.createElement("div");v.className="pager-widget__controls d-flex flex-column flex-md-row gap-2 align-items-stretch";const k=document.createElement("button");k.type="button",k.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",k.disabled=!m.canPrev||m.loadingDirection==="prev",k.textContent=s.prev,m.loadingDirection==="prev"&&k.prepend(Ki()),k.addEventListener("click",()=>{k.disabled||t.onPrev()});const h=document.createElement("button");h.type="button",h.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",h.disabled=!m.canNext||m.loadingDirection==="next",h.textContent=s.next,m.loadingDirection==="next"&&h.append(Ki()),h.addEventListener("click",()=>{h.disabled||t.onNext()});const S=Wi(m.info||(m.canPrev||m.canNext?s.loading:s.empty));v.append(k,S,h),a.replaceChildren(v)}function u(m){switch(m.status){case"hidden":l();break;case"disabled":o(m);break;case"error":d(m);break;case"ready":f(m);break;default:l();break}}return{update(m){r||(n=m,u(m))},destroy(){r||(r=!0,a.replaceChildren(),e.innerHTML="")},getState(){return n}}}const ti=new Set;let ji=!1;function Rl(){return typeof window>"u"?null:window.__PSL?.debugOverlayApi??null}function js(){ji||typeof window>"u"||(ji=!0,window.addEventListener("psl:debug-overlay-ready",()=>{ti.forEach(e=>{ai(e)})}))}function ai(e){const t=Rl();t?.registerProvider&&(e.handle||(e.handle=t.registerProvider(e.config)),e.handle.update(e.lastMetrics??null))}function Gs(e){const t={config:e,handle:null,lastMetrics:null};return ti.add(t),js(),ai(t),t}function Us(e,t){e.lastMetrics=t,ti.add(e),js(),ai(e)}function Vs(e){if(e==null)return 0;try{const t=JSON.stringify(e);return t?Number((t.length/1024).toFixed(1)):0}catch{return null}}const Gi=5e3,Ui=50,ni=50,Ln=3;function gr(e){if(e==null||e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function Kl(e){if(!e)return null;const t=gr(e.areaHa);if(t!==null)return t;const a=gr(e.areaAr);if(a!==null)return a/100;const n=gr(e.areaSqm);return n!==null?n/1e4:null}function Wl(e,t="–"){const a=Kl(e);return a===null?t:Ro(a,2,t)}function jl(e){return e.toISOString().slice(0,10)}function qn(e){if(!e)return;if(/^\d{4}-\d{2}-\d{2}$/.test(e))return e;const t=new Date(e);if(!Number.isNaN(t.getTime()))return jl(t)}function Vi(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function ri(){return{startDate:"",endDate:""}}function Zs(e,t){if(!e)return;const a=e.querySelector("#doc-start"),n=e.querySelector("#doc-end");a&&t.startDate&&(a.value=t.startDate),n&&t.endDate&&(n.value=t.endDate)}function Gl(e,t="sqlite"){if(typeof e=="string")return e.includes(":")?e:/^\d+$/.test(e)?ca(t,Number(e)):e;if(typeof e=="number")return ca(t,e);if(e&&typeof e=="object"){const a=e.source||t;if(typeof e.ref=="string"&&e.ref.includes(":"))return e.ref;const n=Number(e.ref);if(!Number.isNaN(n))return ca(a,n)}return null}function Ul(e){const t=new Set;return e?.length&&e.forEach(a=>{const n=Gl(a);n&&t.add(n)}),t}function Qs(e){const t=e.querySelector('[data-role="doc-focus-banner"]'),a=e.querySelector('[data-role="doc-focus-text"]');if(!t||!a)return;if(!qt){t.classList.add("d-none");return}const n=V.startDate&&V.endDate?`${V.startDate} - ${V.endDate}`:"Aktuelle Filter",r=qt.label||"Importierter Zeitraum",s=qt.highlightEntryIds.size,l=s?` (${s} markiert)`:"";a.textContent=`${r}: ${n}${l}`,t.classList.remove("d-none")}function Vl(e,t){const a=e.querySelector('[data-role="doc-refresh-indicator"]');if(a){if(a.classList.remove("alert-info","alert-warning"),t==="idle"){a.classList.add("d-none");return}a.classList.remove("d-none"),t==="stale"?(a.classList.add("alert-warning"),a.textContent="Neue Dokumentationseinträge verfügbar. Ansicht aktualisiert sich beim Öffnen."):(a.classList.add("alert-info"),a.textContent="Aktualisiere Dokumentation...")}}function br(e,t,a={}){qt&&(qt=null,Ta=null,Qs(e),a.refreshList&&_t(e,t.state.getState().fieldLabels))}function Zl(e,t){if(!Ta)return;const a=Vt(Ta);a&&(Ta=null,ao(e,a,t))}function Ql(e,t,a){if(!a)return;const n=qn(a.startDate),r=qn(a.endDate),s=!!a.entryIds?.length;if(!n&&!r&&!s)return;V={...V,...n?{startDate:n}:{},...r?{endDate:r}:{}},a.creator!==void 0&&(V={...V,creator:a.creator||void 0}),a.crop!==void 0&&(V={...V,crop:a.crop||void 0});const l=Ul(a.entryIds);qt={label:a.label,reason:a.reason,startDate:V.startDate,endDate:V.endDate,highlightEntryIds:l},Ta=a.autoSelectFirst&&l.size?l.values().next().value??null:null;const o=e.querySelector("#doc-filter");Zs(o,V),Qs(e),Ir=!0,It(e,t.state.getState()).finally(()=>{Ir=!1})}function Jl(){if(typeof window>"u")return{enabled:!1,count:gn};try{const e=new URLSearchParams(window.location.search);if(!e.has("seedHistory"))return{enabled:!1,count:gn};const t=e.get("seedHistory"),a=t?Number(t):Number.NaN;return{enabled:!0,count:Number.isFinite(a)&&a>0?Math.min(Math.round(a),Yl):gn}}catch(e){return console.warn("seedHistory Parameter konnte nicht gelesen werden",e),{enabled:!1,count:gn}}}const ct=25,Zi=4,hr=new Intl.NumberFormat("de-DE"),gn=200,Yl=2e3,ga=Jl();let Qi=!1,ze="memory",V=ri(),He=0,ge=[],wt=[],re=0;const ot=new Map,et=new Map([[0,null]]),Ue=new Set,Tt=new Map,la=new Map;let je=!1,$a=null,za=0,qt=null,Ir=!1,Ta=null,Hn=!1,Dn="",On=!1,bn=null,hn=null,Ji=null,qe=0,vn=null,Yi=null,st=null,qa=!1,Xi=null;const Xl=Gs({id:"documentation",label:"Documentation",budget:{initialLoad:50,maxItems:150}});let Js=null;function ha(e){return e.app?.storageDriver||ce()}function ca(e,t){return`${e}:${t}`}function ii(e){const t={},a=Vi(e.startDate,"start"),n=Vi(e.endDate,"end");return a&&(t.startDate=a),n&&(t.endDate=n),e.creator&&(t.creator=e.creator),e.crop&&(t.crop=e.crop),t}function ec(e,t){return{id:ca("state",t),entry:e,source:"state",ref:t}}function tc(e){const t=Number(e?.id??e?.historyId??0),a={...e};return delete a.id,{id:ca("sqlite",t),entry:a,source:"sqlite",ref:t}}function ac(){return ze==="memory"?ge.length:He>0?He:re*ct+ge.length||null}function nc(){const e=[];if(je&&e.push("Lädt …"),st&&e.push("Fehler"),qt&&e.push("Fokus aktiv"),ze==="sqlite"&&et.get(re+1)&&e.push("Weitere Seiten verfügbar"),!!e.length)return e.join(" · ")}function rc(){const e={items:ge.length,totalCount:ac(),cursor:ze==="sqlite"?`Seite ${re+1}`:null,payloadKb:Vs(wt.map(t=>t.entry)),lastUpdated:Js,note:nc()};Us(Xl,e)}function Vt(e){return ge.find(t=>t.id===e)}function Yn(e){const t=e.querySelector('[data-role="archive-form"]');if(!t)return;const a=t.querySelector('input[name="archive-start"]'),n=t.querySelector('input[name="archive-end"]');a&&(a.value=V.startDate||""),n&&(n.value=V.endDate||"")}function Pe(e,t,a="info"){const n=e.querySelector('[data-role="archive-status"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a}`,n.textContent=t,n.classList.remove("d-none")}}function Br(e,t){const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(!a)return;const r=!a.classList.contains("d-none"),s=typeof t=="boolean"?t:!r;a.classList.toggle("d-none",!s),n&&(n.textContent=s?"Archiv-Eingaben ausblenden":"Archiv erstellen"),s&&Yn(e)}function ic(e){const t=e.querySelector('input[name="archive-start"]'),a=e.querySelector('input[name="archive-end"]');if(!t?.value||!a?.value)return null;const n=e.querySelector('input[name="archive-storage"]'),r=e.querySelector('textarea[name="archive-note"]'),s=e.querySelector('input[name="archive-remove"]');return{startDate:t.value,endDate:a.value,storageHint:n?.value.trim()||void 0,note:r?.value.trim()||void 0,removeAfterExport:s?s.checked:!0}}function si(e,t){const a=e.querySelector('[data-action="archive-toggle"]'),n=e.querySelector('[data-action="archive-submit"]'),r=e.querySelector('[data-role="archive-form"]'),s=e.querySelector('[data-role="archive-driver-hint"]'),l=ha(t)==="sqlite"&&!!t.app?.hasDatabase;a&&(a.disabled=!l||Hn),n&&(n.disabled=!l||Hn),!l&&r&&r.classList.add("d-none"),s&&(s.textContent=l?"Lokale SQLite-Datenbank aktiv":"Nur mit SQLite verfügbar",s.className=`badge ${l?"bg-success":"bg-secondary"}`),l?oi():On=!1}function es(e,t){Hn=t;const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(a&&a.querySelectorAll("input, textarea, button").forEach(r=>{if(r.dataset.action==="archive-cancel"&&t){r.setAttribute("disabled","disabled");return}t?r.setAttribute("disabled","disabled"):r.removeAttribute("disabled")}),n&&(n.disabled=t||n.disabled,!t)){const r=j();n.disabled=ha(r)!=="sqlite"||!r.app?.hasDatabase}}function sc(e,t){const a=n=>n?n.replace(/[^0-9-]/g,""):"unbekannt";return`pflanzenschutz-archiv-${a(e)}_${a(t)}.zip`}function oc(e){let t=[];return Ze("archives",a=>{const n=Array.isArray(a?.logs)?a.logs:[];return t=[e,...n].slice(0,ni),{...a||{logs:[]},logs:t}}),t}async function oi({force:e=!1}={}){if(bn){if(await bn,!e)return}else if(On&&!e)return;const t=j();if(ha(t)!=="sqlite"||!t.app?.hasDatabase)return;const n=(async()=>{try{const r=await Mo({limit:ni});Ze("archives",s=>({...s&&typeof s=="object"?s:{logs:[]},logs:r.items})),On=!0}catch(r){console.warn("Archive logs could not be loaded",r)}})();bn=n;try{await n}finally{bn=null}}async function lc(e,t){const a=ha(j());if(oc(e),a!=="sqlite"){console.warn("Archive logs require SQLite. Changes stored in memory only.");return}try{const n={...e,metadata:t??void 0};await To(n),await tt()}catch(n){console.error("Archive log could not be persisted",n),On=!1}finally{await oi({force:!0})}}function Nr(e){return!Array.isArray(e)||!e.length?"[]":e.map(t=>`${t.id}:${t.archivedAt}:${t.entryCount}`).join("|")}function cc(e){return e?Ra(e)||e.slice(0,16).replace("T"," "):"-"}function Wa(e,t,a={}){const n=e.querySelector('[data-role="archive-log-list"]');if(!n)return;const r=Array.isArray(t)?t:[];a.resetPage!==!1&&(qe=0);const s=vc(r);if(!s.total){n.innerHTML='<div class="text-muted small">Noch keine Archive erstellt.</div>',ns(e,s);return}const l=s.items.map(o=>{const d=cc(o.archivedAt),f=`${o.startDate||"-"} – ${o.endDate||"-"}`,u=o.entryCount===1?"Eintrag":"Einträge";return`
        <div class="list-group-item border rounded mb-2 p-3" data-action="archive-log-focus" data-log-id="${o.id}" style="cursor: pointer;">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="fs-5 fw-bold mb-1">${g(f)}</div>
              <div class="text-muted">${o.entryCount} ${u} · Erstellt ${g(d)}</div>
            </div>
            <i class="bi bi-chevron-right text-muted fs-4"></i>
          </div>
        </div>
      `}).join("");n.innerHTML=`<div class="list-group list-group-flush">${l}</div>`,ns(e,s)}function ts(e,t){const a=e.archives?.logs;if(Array.isArray(a))return a.find(n=>n.id===t)}async function dc(e){if(e){if(typeof navigator<"u"&&navigator.clipboard&&typeof navigator.clipboard.writeText=="function"){await navigator.clipboard.writeText(e);return}if(typeof document<"u"){const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select(),document.execCommand("copy"),document.body.removeChild(t)}}}async function Ya(e){if(la.has(e.id))return la.get(e.id);let t=null;if(e.source==="sqlite")try{t=await qo(e.ref)}catch(a){console.error("History entry fetch failed",a)}else{const a=Ge(j().history);t=(typeof e.ref=="number"?a[e.ref]:void 0)||e.entry}return t&&la.set(e.id,t),t}function Ys(e){return e&&(e.datum||Ra(e.dateIso)||(typeof e.date=="string"?e.date:""))||""}function uc(e){if(e?.gpsCoordinates){const t=_o(e.gpsCoordinates);if(t)return t}return""}function pc(e){return e?.gps||""}function Fr(e){if(!e)return null;if(e.dateIso){const n=Ms(e.dateIso);if(n)return new Date(n.getFullYear(),n.getMonth(),n.getDate())}const t=typeof e.datum=="string"&&e.datum||typeof e.date=="string"&&e.date||null;if(!t)return null;const a=t.split(".");if(a.length===3){const[n,r,s]=a.map(Number);if(!Number.isNaN(n)&&!Number.isNaN(r)&&!Number.isNaN(s))return new Date(s,r-1,n)}return null}function fc(e,t){const a=Fr(e);if(t.startDate){const r=new Date(t.startDate);if(r.setHours(0,0,0,0),!a||a<r)return!1}if(t.endDate){const r=new Date(t.endDate);if(r.setHours(23,59,59,999),!a||a>r)return!1}const n=[["creator",e.ersteller],["crop",e.kultur]];for(const[r,s]of n){const o=t[r]?.trim().toLowerCase();if(o&&!`${s||""}`.toLowerCase().includes(o))return!1}return!0}function li(e){if(!e)return"";const t=r=>r==null?"":String(r),n=(Array.isArray(e.items)?e.items:[]).map(r=>{const s=Object.keys(r).sort().reduce((l,o)=>(l[o]=r[o],l),{});return JSON.stringify(s)}).sort();return JSON.stringify({savedAt:t(e.savedAt),dateIso:t(e.dateIso),datum:t(e.datum),ersteller:t(e.ersteller),standort:t(e.standort),kultur:t(e.kultur),usageType:t(e.usageType),eppoCode:t(e.eppoCode),invekos:t(e.invekos),bbch:t(e.bbch),gps:t(e.gps),gpsPointId:t(e.gpsPointId),areaHa:e.areaHa??null,areaAr:e.areaAr??null,areaSqm:e.areaSqm??null,kisten:e.kisten??null,itemHashes:n})}function Xs(e){e.size&&Ze("history",t=>{const a=Za(t);if(!a.items.length)return a;let n=!1;const r=a.items.filter(s=>{const l=li(s);return e.has(l)?(n=!0,!1):!0});return n?{...a,items:r,totalCount:Math.min(a.totalCount,r.length),lastUpdatedAt:new Date().toISOString()}:a})}function mc(e){return e.slice().sort((t,a)=>{const n=Fr(t.entry)?.getTime()||new Date(t.entry.savedAt||0).getTime();return(Fr(a.entry)?.getTime()||new Date(a.entry.savedAt||0).getTime())-n})}function as(){return ze==="sqlite"?He>0?Math.max(Math.ceil(He/ct),1):Math.max(re+1,ot.size||0):ge.length?Math.max(Math.ceil(ge.length/ct),1):0}function eo(){if(ze==="sqlite"){const t=Math.max(as()-1,0);return re>t&&(re=t),re<0&&(re=0),re*ct}if(!ge.length)return re=0,0;const e=Math.max(as()-1,0);return re>e&&(re=e),re<0&&(re=0),re*ct}function Xn(){if(!ge.length){wt=[];return}if(ze==="sqlite"){wt=ge.slice();return}const e=eo(),t=Math.min(e+ct,ge.length);wt=ge.slice(e,t)}function gc(e){if(ot.size<=Zi)return;const t=Array.from(ot.keys()).sort((a,n)=>{const r=Math.abs(a-e);return Math.abs(n-e)-r});for(;ot.size>Zi&&t.length;){const a=t.shift();a==null||a===e||ot.delete(a)}}function bc(e){const t=e.querySelector('[data-role="doc-pager"]');return t?((!hn||Ji!==t)&&(hn?.destroy(),hn=Ja(t,{onPrev:()=>kc(e),onNext:()=>wc(e),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Dokumentation...",empty:"Keine Einträge"}}),Ji=t),hn):null}function hc(e){const t=e.querySelector('[data-role="archive-log-pager"]');return t?((!vn||Yi!==t)&&(vn?.destroy(),vn=Ja(t,{onPrev:()=>yc(e),onNext:()=>xc(e),labels:{prev:"Zurück",next:"Weiter",loading:"Archive werden geladen...",empty:"Keine Einträge"}}),Yi=t),vn):null}function vc(e){const t=e.length;if(!t)return qe=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/Ln),1);qe>=a&&(qe=a-1),qe<0&&(qe=0);const n=qe*Ln,r=Math.min(n+Ln,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function ns(e,t){const a=hc(e);if(a){if(!t.total){a.update({status:"disabled",info:"Noch keine Archive"});return}a.update({status:"ready",info:`Einträge ${t.start+1}–${t.end} von ${t.total}`,canPrev:qe>0,canNext:t.end<t.total})}}function yc(e){if(qe===0)return;qe=Math.max(qe-1,0);const t=j().archives?.logs??[];Wa(e,t,{resetPage:!1})}function xc(e){const t=j().archives?.logs??[],a=t.length;if(!a)return;const n=Math.max(Math.ceil(a/Ln),1);qe>=n-1||(qe=Math.min(qe+1,n-1),Wa(e,t,{resetPage:!1}))}function $n(e){const t=bc(e);if(!t)return;if(st){t.update({status:"error",message:st});return}const a=ze==="memory"?ge.length:He,n=wt.length;if(!n){const f=je?"Lade Dokumentation...":"Keine Einträge vorhanden.";t.update({status:"disabled",info:f});return}const r=ze==="sqlite"?re*ct:eo(),s=`Einträge ${hr.format(r+1)}–${hr.format(r+n)}${a?` von ${hr.format(a)}`:""}`,l=ze==="memory"?r+n<ge.length:!!et.get(re+1),o=!je&&l,d=re>0&&!je;t.update({status:"ready",info:s,canPrev:d,canNext:o,loadingDirection:je&&l?"next":null})}function Tr(e){if(!ga.enabled)return;const t=e.querySelector('[data-action="doc-seed"]');t&&(t.disabled=qa,t.textContent=qa?"Dummy-Daten werden erstellt...":`+ ${ga.count} Dummy-Einträge`)}function kc(e){if(re===0||je)return;const t=Math.max(re-1,0);if(ze==="sqlite"){ci(e,j().fieldLabels,t);return}re=t,Xn(),_t(e,j().fieldLabels),Ga(e,j().fieldLabels)}function wc(e){if(je)return;const t=re+1;if(ze==="sqlite"){const n=ot.has(t),r=et.get(t);if(!n&&!r)return;ci(e,j().fieldLabels,t);return}t*ct<ge.length&&(re=t,Xn(),_t(e,j().fieldLabels),Ga(e,j().fieldLabels))}function ja(e){Ue.clear(),Tt.clear(),e&&er(e)}function Sc(){return ze==="memory"?ge.length:He}function er(e){const t=e.querySelector('[data-role="doc-selection-info"]'),a=e.querySelector('[data-action="print-selection"]'),n=e.querySelector('[data-action="pdf-selection"]'),r=e.querySelector('[data-action="export-selection"]'),s=e.querySelector('[data-action="export-zip"]'),l=e.querySelector('[data-action="delete-selection"]'),o=Ue.size;t&&(t.textContent=o?`${o} Eintrag${o===1?"":"e"} ausgewählt`:"Keine Einträge ausgewählt");const d=o===0;a&&(a.disabled=d),n&&(n.disabled=d),r&&(r.disabled=d),s&&(s.disabled=d),l&&(l.disabled=d);const f=e.querySelector('[data-action="toggle-select-all"]');if(f){const u=Sc();f.disabled=u===0,f.checked=u>0&&o>=u,f.indeterminate=o>0&&o<u}}function qr(e,t){e.querySelectorAll('[data-role="doc-list"] .doc-sidebar-entry').forEach(n=>{const r=!!(t&&n.dataset.entryId===t);n.classList.toggle("active",r)})}function Ca(e,t,a){const n=e.querySelector("#doc-detail"),r=e.querySelector("#doc-detail-body"),s=e.querySelector('[data-role="doc-detail-card"]'),l=e.querySelector('[data-role="doc-detail-empty"]');if(!n||!r||!s||!l)return;if(!t){n.dataset.entryId="",s.classList.add("d-none"),l.classList.remove("d-none"),r.innerHTML="",qr(e,null);return}n.dataset.entryId=t.entry.id,s.classList.remove("d-none"),l.classList.add("d-none"),qr(e,t.entry.id);const o=a||j().fieldLabels,d=o.history?.tableColumns??{},f=o.history?.detail??{},u=t.detail||t.entry.entry,m=Ho(u.items||[],o,"detail"),v=u.gpsCoordinates?Qa(u.gpsCoordinates):null,k=pc(u),h=uc(u),S=f.gpsNote||d.gpsNote||f.gps||d.gps||"GPS-Notiz",w=f.gpsCoordinates||d.gpsCoordinates||f.gps||d.gps||"GPS-Koordinaten",E=h?`${g(h)}${v?` <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${g(v)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:""}`:"-";r.innerHTML=`
    <p>
      <strong>${g(d.date||"Datum")}:</strong> ${g(Ys(u))}<br />
      <strong>${g(f.creator||"Erstellt von")}:</strong> ${g(u.ersteller||"")}<br />
      <strong>${g(f.location||"Standort")}:</strong> ${g(u.standort||"")}<br />
      <strong>${g(f.crop||"Kultur")}:</strong> ${g(u.kultur||"")}<br />
      <strong>${g(f.usageType||"Art der Verwendung")}:</strong> ${g(u.usageType||"")}<br />
      <strong>${g(f.quantity||"Fläche (ha)")}:</strong> ${g(Wl(u))}<br />
      <strong>${g(f.eppoCode||"EPPO-Code")}:</strong> ${g(u.eppoCode||"")}<br />
      <strong>${g(f.bbch||"BBCH")}:</strong> ${g(u.bbch||"")}<br />
      <strong>${g(f.invekos||"InVeKoS")}:</strong> ${g(u.invekos||"")}<br />
      <strong>${g(S)}:</strong> ${k?g(k):"-"}<br />
      <strong>${g(w)}:</strong> ${E}<br />
      <strong>${g(f.time||"Uhrzeit")}:</strong> ${g(u.uhrzeit||"")}<br />
    </p>
    ${Oo({maschine:u.qsMaschine,schaderreger:u.qsSchaderreger,verantwortlicher:u.qsVerantwortlicher,wetter:u.qsWetter,behandlungsart:u.qsBehandlungsart})}
    <div class="table-responsive">
      ${m}
    </div>
  `}function _t(e,t){Xn();const a=e.querySelector('[data-role="doc-list"]');if(!a)return;const r=e.querySelector("#doc-detail")?.dataset.entryId||null;if(!wt.length)a.innerHTML=je?'<div class="text-center text-muted py-4">Lädt ...</div>':'<div class="text-center text-muted py-4">Noch keine Einträge</div>';else{a.innerHTML="";const s=document.createDocumentFragment();(t||j().fieldLabels).history?.detail?.usageType,wt.forEach(o=>{const d=document.createElement("div"),f=!!qt?.highlightEntryIds?.has(o.id);d.className=`doc-sidebar-entry list-group-item${f?" doc-sidebar-entry--highlight":""}`,d.dataset.entryId=o.id;const u=Ys(o.entry)||"-",m=f?'<span class="badge bg-warning-subtle text-warning-emphasis badge-import">Import</span>':"";d.innerHTML=`
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
            <input type="checkbox" class="form-check-input" data-action="toggle-select" data-entry-id="${o.id}" ${Ue.has(o.id)?"checked":""} />
            <span class="small">Auswahl</span>
          </label>
        </div>
      `,s.appendChild(d)}),a.appendChild(s)}qr(e,r),Zl(e,t),$n(e),er(e),Js=new Date().toISOString(),rc()}function Ga(e,t){const a=e.querySelector('[data-role="doc-info"]');if(!a)return;const n=He,r=!!(V.crop||V.creator);if(!n&&!je){a.textContent="Keine Einträge";return}if(!n&&je){a.textContent="Lädt...";return}if(V.startDate&&V.endDate){const s=`${V.startDate} - ${V.endDate} (${n})`;a.textContent=r?`${s} + Filter`:s;return}a.textContent=`Alle Einträge (${n})`}async function to(e,t){const n=e.querySelector("#doc-detail")?.dataset.entryId;if(!n){Ca(e,null,t);return}const r=Vt(n);if(!r){Ca(e,null,t);return}const s=await Ya(r);s?Ca(e,{entry:r,detail:s},t):Ca(e,null,t)}async function ci(e,t,a=re,n={}){const r=Math.max(0,a),s=!!n.forceReload;s&&(ot.clear(),et.clear(),et.set(0,null),He=0,ge=[],wt=[],re=0,st=null);const l=s?void 0:ot.get(r);if(l&&!n.forceReload){re=r,ge=l,st=null,_t(e,t),Ga(e),$n(e);return}const o=et.has(r)?et.get(r)??null:null,d=Symbol("doc-load");$a=d,je=!0,st=null,$n(e);try{const f=await zs({cursor:o,pageSize:ct,filters:ii(V),sortDirection:"desc",includeTotal:s||r===0||He===0});if($a!==d)return;const u=f.items.map(m=>tc(m));if(ot.set(r,u),gc(r),et.set(r,o),et.set(r+1,f.nextCursor??null),typeof f.totalCount=="number")He=f.totalCount;else{const m=r*ct+u.length;He=Math.max(He,m)}re=r,ge=u,st=null,_t(e,t),Ga(e,t)}catch(f){$a===d&&(console.error("Dokumentation konnte nicht geladen werden",f),st="Dokumentation konnte nicht geladen werden. Bitte erneut versuchen.",window.alert("Dokumentation konnte nicht geladen werden. Bitte erneut versuchen."))}finally{$a===d&&(je=!1,$a=null,$n(e))}}async function Ec(e,t){const a=Ge(t.history);ge=mc(a.map((n,r)=>ec(n,r)).filter(n=>fc(n.entry,V))),He=ge.length,re=0,st=null,Xn(),_t(e,t.fieldLabels),Ga(e,t.fieldLabels),await to(e,t.fieldLabels)}async function It(e,t){const a=ha(t),n=!!t.app?.hasDatabase,r=a==="sqlite"&&n;if(ze=r?"sqlite":"memory",la.clear(),re=0,st=null,He=0,ge=[],wt=[],ot.clear(),et.clear(),et.set(0,null),ja(e),si(e,t),Yn(e),Wa(e,t.archives?.logs??[]),Dn=Nr(t.archives?.logs),r){await ci(e,t.fieldLabels,0,{forceReload:!0}),await to(e,t.fieldLabels);return}await Ec(e,t)}async function vr(){const e=[];for(const t of Ue){const a=Tt.get(t)||Vt(t);if(!a)continue;const n=await Ya(a);n&&e.push(n)}return e}async function Lc(e,t){if(!t){ja(e),_t(e,j().fieldLabels);return}if(Ue.clear(),Tt.clear(),ze==="memory")for(const a of ge)Ue.add(a.id),Tt.set(a.id,a);else try{const a=await As({filters:ii(V),sortDirection:"desc",limit:1e4}),n=Array.isArray(a.historyIds)?a.historyIds:[];a.entries.forEach((r,s)=>{const l=Number(n[s]);if(!Number.isFinite(l))return;const o=ca("sqlite",l);Ue.add(o),Tt.set(o,{id:o,entry:r,source:"sqlite",ref:l}),la.has(o)||la.set(o,r)})}catch(a){console.error("Alle Einträge konnten nicht ausgewählt werden",a),window.alert("Alle Einträge konnten nicht ausgewählt werden. Bitte erneut versuchen.")}_t(e,j().fieldLabels),er(e)}async function Dc(e,t){if(!Ue.size)return;const a=Array.from(Ue).map(o=>Tt.get(o)||Vt(o)).filter(o=>!!o),n=[];for(const o of a){const d=await Ya(o);d&&n.push(d)}const r=a.filter(o=>o.source==="sqlite"),s=!!r.length;if(s)for(const o of r)await Fo(o.ref);const l=new Set(a.filter(o=>o.source==="state").map(o=>o.ref));if(l.size&&(Ze("history",o=>{const d=Za(o),f=d.items.filter((u,m)=>!l.has(m));return f.length===d.items.length?d:{...d,items:f,totalCount:Math.min(d.totalCount,f.length),lastUpdatedAt:new Date().toISOString()}}),await $c()),n.length){const o=new Set(n.map(d=>li(d)));Xs(o)}if(s){try{await tt()}catch(o){console.warn("SQLite-Datei konnte nach dem Löschen nicht gespeichert werden",o)}t.events?.emit?.("history:data-changed",{type:"deleted",ids:r.map(o=>o.ref)})}ja(e),await It(e,t.state.getState())}async function ao(e,t,a){const n=await Ya(t);if(!n){window.alert("Details konnten nicht geladen werden.");return}Ca(e,{entry:t,detail:n},a)}async function rs(e){const t=await Ya(e);t?await no([t]):window.alert("Eintrag konnte nicht geladen werden.")}async function $c(){const e=ce();if(!(!e||e==="memory"||e==="sqlite"))try{const t=Ye();await Xe(t)}catch(t){throw console.error("Persist history failed",t),window.alert("Historie konnte nicht gespeichert werden. Bitte erneut versuchen."),t}}async function zc(e,t,a){if(Hn)return;const n=t.state.getState();if(ha(n)!=="sqlite"||!n.app?.hasDatabase){Pe(e,"Archivieren ist nur mit einer lokalen SQLite-Datenbank möglich.","warning");return}const s=ic(a);if(!s?.startDate||!s.endDate){Pe(e,"Bitte Start- und Enddatum für das Archiv wählen.","warning");return}const l=qn(s.startDate),o=qn(s.endDate);if(!l||!o){Pe(e,"Die angegebenen Daten sind ungültig.","danger");return}if(new Date(l)>new Date(o)){Pe(e,"Startdatum darf nicht nach dem Enddatum liegen.","danger");return}const d={startDate:l,endDate:o,creator:V.creator,crop:V.crop},f=ii(d);es(e,!0),Pe(e,"Prüfe Zeitraum und Eintragsmenge...","info");try{const u=await zs({cursor:null,pageSize:1,filters:f,sortDirection:"asc",includeTotal:!0}),m=u.totalCount??u.items.length??0;if(!m){Pe(e,"Im angegebenen Zeitraum wurden keine Einträge gefunden.","warning");return}if(m>Gi){Pe(e,`Maximal ${Gi} Einträge pro Archiv erlaubt. Bitte Zeitraum verkürzen.`,"warning");return}Pe(e,`Exportiere ${m} Einträge in ein ZIP-Archiv...`,"info");const v=await As({filters:f,limit:m,sortDirection:"asc"}),k=v?.entries??[];if(!k.length){Pe(e,"Archiv konnte nicht erstellt werden – Export lieferte keine Einträge.","danger");return}const h=k.map(D=>({...D})),S={format:"pflanzenschutz-archive",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:h.length,filters:{startDate:l,endDate:o,creator:d.creator||null,crop:d.crop||null},archive:{removeFromDatabase:s.removeAfterExport,storageHint:s.storageHint||null,note:s.note||null}},w=Ps({"pflanzenschutz.json":Fn(JSON.stringify(h,null,2)),"metadata.json":Fn(JSON.stringify(S,null,2))}),E=new ArrayBuffer(w.byteLength);new Uint8Array(E).set(w);const M=new Blob([E],{type:"application/zip"}),U=sc(l,o);di(M,U);let K=!1;if(s.removeAfterExport){Pe(e,"Export abgeschlossen. Entferne Einträge und bereinige Datenbank...","info"),await Co({filters:f});const D=new Set(h.map(A=>li(A)));Xs(D);try{await tt()}catch(A){console.error("SQLite-Datei konnte nach dem Archivieren nicht gespeichert werden",A)}t.events?.emit?.("history:data-changed",{type:"deleted-range",filters:f});try{await Io()}catch(A){K=!0,console.error("VACUUM fehlgeschlagen",A)}}const be=new Date().toISOString(),N={id:`archive-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,archivedAt:be,startDate:l,endDate:o,entryCount:h.length,fileName:U,storageHint:s.storageHint||void 0,note:s.note||void 0};K&&(N.note=N.note?`${N.note} | VACUUM fehlgeschlagen`:"VACUUM fehlgeschlagen");const Z={filters:{...d},removeAfterExport:!!s.removeAfterExport,historyIdSample:v?.historyIds?.slice(0,Ui)};if(await lc(N,Z),!s.removeAfterExport&&v?.historyIds?.length){const D=v.historyIds.slice(0,Ui).map(A=>({source:"sqlite",ref:A}));t.events?.emit?.("documentation:focus-range",{startDate:l,endDate:o,label:"Archiviert",reason:"archive",entryIds:D})}Br(e,!1),a.reset(),Yn(e),await It(e,t.state.getState());const q=s.removeAfterExport?`Archiv ${U} erstellt und ${h.length} Einträge entfernt.`:`Archiv ${U} erstellt. ${h.length} Einträge bleiben in der Datenbank.`;Pe(e,q,K?"warning":"success")}catch(u){console.error("Archivieren fehlgeschlagen",u);const m=u instanceof Error?u.message:"Archiv konnte nicht erstellt werden.";Pe(e,m,"danger")}finally{es(e,!1),si(e,t.state.getState())}}const Ac=50;async function no(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}if(e.length>Ac&&!window.confirm(`Sie möchten ${e.length} Einträge drucken. Bei sehr vielen Einträgen kann das Erstellen der Druckvorschau einige Sekunden dauern und lässt sich nicht unterbrechen.

Fortfahren?`))return;const t=j().fieldLabels,a=Bo(j().company||null);await No(e,t,{title:"Dokumentation",headerHtml:a,chunkSize:25})}function di(e,t){const a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download=t,n.click(),URL.revokeObjectURL(a)}function Pc(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const t=e.map(l=>({...l})),a=JSON.stringify(t,null,2),n=new TextEncoder().encode(a),r=new Blob([n],{type:"application/json; charset=utf-8"}),s=new Date().toISOString().replace(/[:.]/g,"-");di(r,`pflanzenschutz-dokumentation-${s}.json`)}async function Mc(e,t){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const a=e.map(d=>({...d})),n={format:"pflanzenschutz-export",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:a.length,filters:{startDate:t.startDate||null,endDate:t.endDate||null,creator:t.creator||null,crop:t.crop||null}},r=Ps({"pflanzenschutz.json":Fn(JSON.stringify(a,null,2)),"metadata.json":Fn(JSON.stringify(n,null,2))}),s=new ArrayBuffer(r.byteLength);new Uint8Array(s).set(r);const l=new Blob([s],{type:"application/zip"}),o=new Date().toISOString().replace(/[:.]/g,"-");di(l,`pflanzenschutz-dokumentation-${o}.zip`)}function Cc(){const e=document.createElement("div"),t=ri(),a=V.startDate||t.startDate||"",n=V.endDate||t.endDate||"";V={...V,startDate:a,endDate:n};const r=ga.enabled?`<button class="btn btn-outline-info btn-sm" type="button" data-action="doc-seed">+ ${ga.count} Dummy-Einträge</button>`:"";return e.className="section-inner",e.innerHTML=`
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
            <small class="text-muted">Letzte ${ni}</small>
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
  `,e}function Ic(e){if(!e)return{};const t=new FormData(e),a=r=>{const s=t.get(r);return typeof s=="string"&&s?s:void 0},n=r=>{const s=t.get(r);if(typeof s!="string")return;const l=s.trim();return l||void 0};return{startDate:a("doc-start"),endDate:a("doc-end"),crop:n("doc-crop"),creator:n("doc-creator")}}let is="entries";function Bc(e,t){is!==t&&(is=t,e.querySelectorAll("[data-doc-tab]").forEach(a=>{a.classList.toggle("active",a.dataset.docTab===t)}),e.querySelectorAll("[data-pane]").forEach(a=>{a.style.display=a.dataset.pane===t?"block":"none"}))}function Nc(e,t){e.addEventListener("click",a=>{const n=a.target.closest("[data-doc-tab]");if(n&&n.dataset.docTab){Bc(e,n.dataset.docTab);return}}),e.addEventListener("submit",a=>{if(a.target instanceof HTMLFormElement){if(a.target.id==="doc-filter"){a.preventDefault(),br(e,t,{refreshList:!0});const n=Ic(a.target);if(!n.startDate||!n.endDate){window.alert("Bitte Start- und Enddatum auswählen.");return}V=n,ja(e),It(e,t.state.getState());return}a.target.dataset.role==="archive-form"&&(a.preventDefault(),zc(e,t,a.target))}}),e.addEventListener("click",a=>{const n=a.target;if(!n)return;const r=n.dataset.action;if(!r){n.closest("[data-action]")&&a.stopPropagation();return}if(r==="reset-filters"){const o=e.querySelector("#doc-filter");o?.reset(),V=ri(),Zs(o??null,V),br(e,t,{refreshList:!0}),ja(e),It(e,t.state.getState());return}if(r==="archive-toggle"){Br(e),Pe(e,"");return}if(r==="archive-cancel"){Br(e,!1),Pe(e,"");return}if(r==="archive-log-focus"){const o=n.dataset.logId;if(!o)return;const d=ts(t.state.getState(),o);if(!d){window.alert("Archiv-Eintrag nicht gefunden.");return}const f=d.fileName?`Archiv ${d.fileName}`:"Archivierter Zeitraum";typeof t.events?.emit=="function"?t.events.emit("documentation:focus-range",{startDate:d.startDate,endDate:d.endDate,label:f,reason:"archive-log"}):(V={...V,startDate:d.startDate,endDate:d.endDate},It(e,t.state.getState())),Pe(e,`Dokumentation auf Archiv ${d.startDate} – ${d.endDate} fokussiert.`,"success");return}if(r==="archive-log-copy-hint"){const o=n.dataset.logId;if(!o)return;const d=ts(t.state.getState(),o);if(!d||!d.storageHint){window.alert("Kein Speicherhinweis vorhanden.");return}const f=d.storageHint;(async()=>{try{await dc(f),Pe(e,"Speicherhinweis kopiert.","success")}catch(u){console.error("Hinweis konnte nicht kopiert werden",u),window.alert("Hinweis konnte nicht kopiert werden.")}})();return}if(r==="doc-focus-clear"){br(e,t,{refreshList:!0});return}if(r==="print-selection"||r==="pdf-selection"){(async()=>{const o=await vr();await no(o)})();return}if(r==="export-selection"){(async()=>{const o=await vr();Pc(o)})();return}if(r==="export-zip"){(async()=>{const o=await vr();await Mc(o,V)})();return}if(r==="delete-selection"){if(!Ue.size||!window.confirm("Ausgewählte Einträge wirklich löschen?"))return;Dc(e,t);return}if(r==="doc-seed"){if(!ga.enabled||qa)return;const d=window.__PSL?.seedHistoryEntries;if(typeof d!="function"){window.alert("Seed-Funktion ist nicht verfügbar. Bitte Entwicklungsmodus verwenden.");return}qa=!0,Tr(e),(async()=>{try{await d(ga.count),await It(e,t.state.getState())}catch(f){console.error("Dummy-Daten konnten nicht erstellt werden",f),window.alert("Dummy-Daten konnten nicht erstellt werden.")}finally{qa=!1,Tr(e)}})();return}if(r==="detail-print"){const d=e.querySelector("#doc-detail")?.dataset.entryId;if(!d){window.alert("Kein Eintrag ausgewählt.");return}const f=Vt(d);if(!f){window.alert("Eintrag nicht verfügbar.");return}rs(f);return}const s=n.dataset.entryId;if(!s)return;const l=Vt(s);if(!l){window.alert("Eintrag nicht verfügbar.");return}if(r==="view-entry"){ao(e,l,t.state.getState().fieldLabels);return}if(r==="print-entry"){rs(l);return}}),e.addEventListener("change",a=>{const n=a.target;if(!n)return;if(n.dataset.action==="toggle-select-all"){Lc(e,n.checked);return}if(n.dataset.action!=="toggle-select")return;const r=n.dataset.entryId;if(r){if(n.checked){Ue.add(r);const s=Vt(r);s&&Tt.set(r,s)}else Ue.delete(r),Tt.delete(r);er(e)}})}function Fc(e,t){if(!e||Qi)return;const a=e;a.innerHTML="";const n=Cc();a.appendChild(n),Nc(n,t),Tr(n),si(n,t.state.getState()),Yn(n);const r=t.state.getState().archives?.logs??[];Wa(n,r),Dn=Nr(r),oi(),typeof t.events?.subscribe=="function"&&t.events.subscribe("documentation:focus-range",o=>{!o||typeof o!="object"||Ql(n,t,o)});const s=o=>Ge(o.history).length,l=()=>It(n,t.state.getState());Xi?.(),Xi=Ws({section:"documentation",event:"history:data-changed",shouldHandleEvent:()=>ze==="sqlite",shouldRefresh:()=>ze==="sqlite",onRefresh:()=>l(),onStatusChange:o=>Vl(n,o)}),za=s(t.state.getState()),l(),t.state.subscribe(o=>{const d=Nr(o.archives?.logs);d!==Dn&&(Dn=d,Wa(n,o.archives?.logs??[]));const f=s(o);if(Ir){za=f;return}if(ze==="sqlite"){za=f;return}f!==za&&(za=f,l())}),Qi=!0}const Ua=e=>Ge(e.gps.points),Ia=e=>Ge(e.points),Tc=new Intl.NumberFormat("de-DE",{minimumFractionDigits:5,maximumFractionDigits:5}),qc=new Intl.DateTimeFormat("de-DE",{dateStyle:"short",timeStyle:"short"}),ss="Deutschland";let os=!1,ro="list",yn=null,$=null,Aa=null,ls=null;const zn=25,yr=new Intl.NumberFormat("de-DE");let Me=0,ra=null,Hr=null,cs=null;function aa(e,t){typeof e.events?.emit=="function"&&e.events.emit("history:gps-activation-result",{...t,source:"gps",timestamp:Date.now()})}function Ha(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Hc(){const e=document.createElement("section");return e.className="section-inner",e.innerHTML=`
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
  `,e}function Oc(e){return{root:e,message:e.querySelector('[data-role="gps-message"]'),refreshIndicator:e.querySelector('[data-role="gps-refresh-indicator"]'),availability:e.querySelector('[data-role="gps-availability"]'),tabButtons:Array.from(e.querySelectorAll('[data-role="gps-tab"]')),panels:Array.from(e.querySelectorAll('[data-role="gps-panel"]')),listBody:e.querySelector('[data-role="gps-list"]'),emptyState:e.querySelector('[data-role="gps-empty"]'),activeInfo:e.querySelector('[data-role="gps-active-info"]'),summaryLabel:e.querySelector('[data-role="gps-summary"]'),statusBadge:e.querySelector('[data-role="gps-status"]'),form:e.querySelector('[data-role="gps-form"]'),formFields:{name:e.querySelector('[name="gps-name"]'),description:e.querySelector('[name="gps-description"]'),latitude:e.querySelector('[name="gps-latitude"]'),longitude:e.querySelector('[name="gps-longitude"]'),source:e.querySelector('[name="gps-source"]'),activate:e.querySelector('[name="gps-activate"]'),rawCoordinates:e.querySelector('[name="gps-raw-coordinates"]')},disableTargets:Array.from(e.querySelectorAll("[data-gps-disable]")),geolocationBtn:e.querySelector('[data-action="use-geolocation"]'),mapButton:e.querySelector('[data-role="gps-open-maps"]'),verifyButton:e.querySelector('[data-action="verify-coords"]')}}function Ba(e){return`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e)}`}function io(e){const t=e.gps,a=Ia(t),n=l=>{if(!l)return null;const o=Qa(l)||Ba(`${l.latitude},${l.longitude}`),d=l.name?`${l.name}`:`${ba(l.latitude)}, ${ba(l.longitude)}`;return{url:o,label:d}};if(t.activePointId){const l=a.find(d=>d.id===t.activePointId),o=n(l||null);if(o)return o}if(a.length>0){const l=n(a[0]);if(l)return l}const r=e.company?.address?.trim();if(r)return{url:Ba(r.replace(/\n/g,", ")),label:r};const s=e.company?.name?.trim();return s?{url:Ba(s),label:s}:{url:Ba(ss),label:ss}}function _c(e){if(!$)return;const t=io(e);$.mapButton&&($.mapButton.href=t.url,$.mapButton.title=`Google Maps öffnen (${t.label})`);const a=$.root.querySelector('[data-role="gps-empty-map-link"]');a&&(a.href=t.url)}function Rc(e){if(!e)return null;const a=e.trim().replace(/\s+/g," ").replace(/[,;]/g," ").match(/-?\d+(?:[.,]\d+)?/g);if(!a||a.length<2)return null;const n=l=>Number(l.replace(/,/g,".")),r=n(a[0]),s=n(a[1]);return!Number.isFinite(r)||!Number.isFinite(s)||r<-90||r>90||s<-180||s>180?null:{latitude:r,longitude:s}}function Kc(){if(!$?.formFields)return null;const e=$.formFields.latitude?.value??"",t=$.formFields.longitude?.value??"";if(!e.trim()||!t.trim())return null;const a=Number(e),n=Number(t);return!Number.isFinite(a)||!Number.isFinite(n)||a<-90||a>90||n<-180||n>180?null:{latitude:a,longitude:n}}function xn(e){return Number(e).toFixed(6)}function Wc(e,t){const a=xn(e),n=xn(t);return Ua(j()).some(r=>xn(r.latitude)===a&&xn(r.longitude)===n)}function Oa(){if(!$?.verifyButton)return;const e=Kc(),t=!!e;if($.verifyButton.disabled=!t,e){const a=Qa({latitude:e.latitude,longitude:e.longitude});$.verifyButton.dataset.targetUrl=a||Ba(`${e.latitude},${e.longitude}`)}else delete $.verifyButton.dataset.targetUrl}function ba(e){const t=Number(e);return Number.isFinite(t)?`${Tc.format(t)}°`:"–"}function jc(e){if(!e)return"–";const t=new Date(e);return Number.isNaN(t.getTime())?"–":qc.format(t)}function le(e,t="info",a=4500){if($?.message){if(yn&&(window.clearTimeout(yn),yn=null),!e){$.message.classList.add("d-none"),$.message.textContent="";return}$.message.className=`alert alert-${t}`,$.message.textContent=e,$.message.classList.remove("d-none"),a>0&&(yn=window.setTimeout(()=>{$?.message?.classList.add("d-none")},a))}}function Gc(e){const t=$?.refreshIndicator;if(t){if(t.classList.remove("alert-warning","alert-info"),e==="idle"){t.classList.add("d-none");return}t.classList.remove("d-none"),e==="stale"?(t.classList.add("alert-warning"),t.textContent="GPS-Daten wurden geändert. Ansicht aktualisiert sich beim Öffnen."):(t.classList.add("alert-info"),t.textContent="GPS-Daten werden aktualisiert...")}}function so(e){$&&(ro=e,$.tabButtons.forEach(t=>{const a=t.dataset.tab===e;t.classList.toggle("active",a)}),$.panels.forEach(t=>{const a=t.getAttribute("data-panel")===e;t.classList.toggle("d-none",!a)}))}function Ve(e){return e?.hasDatabase?e.storageDriver!=="sqlite"?"wrong-driver":"ok":"no-db"}function Uc(e){if($?.availability){if(e==="ok"){$.availability.classList.add("d-none"),$.availability.textContent="";return}$.availability.classList.remove("d-none"),$.availability.textContent=e==="no-db"?"Bitte verbinden Sie zuerst eine Datenbank, um GPS-Punkte zu verwalten.":"GPS-Funktionen benötigen eine aktive SQLite-Datenbank. Bitte den SQLite-Treiber in den Einstellungen auswählen."}}function da(e,t){if(!$)return;const a=t!=="ok"||e.pending||Ka.isLocked();if($.disableTargets.forEach(n=>{(n instanceof HTMLButtonElement||n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n instanceof HTMLSelectElement)&&(n.disabled=a)}),$.statusBadge){let n="badge bg-success",r="Bereit";t==="no-db"?(n="badge bg-secondary",r="Keine Datenbank"):t==="wrong-driver"?(n="badge bg-warning text-dark",r="Nur mit SQLite"):(e.pending||Ka.isLocked())&&(n="badge bg-info text-dark",r="Wird verarbeitet"),$.statusBadge.className=n,$.statusBadge.textContent=r}}function oo(e){const t=e.length;if(!t)return Me=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/zn),1);Me>=a&&(Me=a-1),Me<0&&(Me=0);const n=Me*zn,r=Math.min(n+zn,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function Vc(){if(!$?.root)return null;const e=$.root.querySelector('[data-role="gps-pager"]');return e?((!ra||Hr!==e)&&(ra?.destroy(),ra=Ja(e,{onPrev:()=>Qc(),onNext:()=>Jc(),labels:{prev:"Zurück",next:"Weiter",loading:"GPS-Punkte werden geladen...",empty:"Keine GPS-Punkte verfügbar"}}),Hr=e),ra):null}function ds(e,t){const a=Vc();if(!a)return;if(t!=="ok"){Me=0;const l=t==="no-db"?"Keine Datenbank verbunden.":"Nur mit SQLite verfügbar.";a.update({status:"disabled",info:l});return}const n=Ua(e).length;if(!n){Me=0;const l=e.gps.initialized?"Noch keine GPS-Punkte vorhanden.":"GPS-Punkte werden geladen...";a.update({status:"disabled",info:l});return}const{start:r,end:s}=oo(Ua(e));a.update({status:"ready",info:`Einträge ${yr.format(r+1)}–${yr.format(s)} von ${yr.format(n)}`,canPrev:Me>0,canNext:s<n})}function Zc(e,t){return e.length?e.map(a=>{const n=a.id===t,r=a.description?`<div class="text-muted small">${g(a.description)}</div>`:"",s=a.source?`<span class="badge-psm badge-psm-neutral">${g(a.source)}</span>`:'<span class="text-muted">–</span>',l=n?'<span class="badge bg-success ms-2">Aktiv</span>':"",o=Qa(a),d=o?`<a class="btn btn-outline-info" href="${Ha(o)}" target="_blank" rel="noopener noreferrer">
              Karte
            </a>`:"";return`
        <tr data-point-id="${Ha(a.id)}">
          <td>
            <div class="fw-semibold">${g(a.name||"Ohne Namen")}${l}</div>
            ${r}
          </td>
          <td class="font-monospace">
            <div>${ba(a.latitude)}</div>
            <div>${ba(a.longitude)}</div>
          </td>
          <td>
            <div>${s}</div>
            <div class="text-muted small">${jc(a.updatedAt)}</div>
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
`):""}function ui(e,t){if(!$)return;const a=e.gps,n=io(e),r=t==="ok";if($.summaryLabel){const s=Ia(a).length;$.summaryLabel.textContent=r?`${s} Punkt${s===1?"":"e"} gespeichert`:"Funktion derzeit nicht verfügbar"}if(!r){$.listBody&&($.listBody.innerHTML=""),$.emptyState&&($.emptyState.textContent=t==="no-db"?"Keine Datenbank verbunden.":"Bitte SQLite als Speicher-Treiber aktivieren.",$.emptyState.classList.remove("d-none")),$.activeInfo&&($.activeInfo.textContent=t==="no-db"?"Wartet auf Datenbank.":"Nur mit SQLite verfügbar."),ds(e,t);return}if($.listBody){const{items:s}=oo(Ia(a));$.listBody.innerHTML=Zc(s,a.activePointId)}if($.emptyState){const s=Ia(a).length>0;$.emptyState.classList.toggle("d-none",s),!s&&a.initialized?$.emptyState.innerHTML=`
        <p class="mb-2">Noch keine GPS-Punkte vorhanden.</p>
        <p class="small text-muted mb-3">
          Nutzen Sie "Neuer Punkt" oder öffnen Sie Google Maps, um Koordinaten zu ermitteln.
        </p>
        <a class="btn btn-outline-info btn-sm" data-role="gps-empty-map-link" href="${Ha(n.url)}" target="_blank" rel="noopener noreferrer">
          <i class="bi bi-box-arrow-up-right me-1"></i>
          Google Maps öffnen
        </a>
      `:a.initialized||($.emptyState.textContent="GPS-Punkte werden geladen...")}if($.activeInfo)if(a.activePointId){const s=Ia(a).find(l=>l.id===a.activePointId);if(s){const l=`${s.name||"Ohne Namen"} (${ba(s.latitude)}, ${ba(s.longitude)})`,o=Qa(s);o?$.activeInfo.innerHTML=`${g(l)} <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${Ha(o)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:$.activeInfo.textContent=l}else $.activeInfo.textContent="Aktiver Punkt nicht gefunden."}else $.activeInfo.innerHTML=`Kein aktiver Punkt ausgewählt. <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${Ha(n.url)}" target="_blank" rel="noopener noreferrer">Google Maps öffnen</a>`;ds(e,t)}function Qc(){if(Me===0)return;Me=Math.max(Me-1,0);const e=j(),t=Ve(e.app);ui(e,t)}function Jc(){const e=j(),t=Ua(e).length;if(!t)return;const a=Math.max(Math.ceil(t/zn)-1,0);if(Me>=a)return;Me=Math.min(Me+1,a);const n=Ve(e.app);ui(e,n)}function Te(e){`${new Date().toLocaleString("de-DE")}${e}`}function Xa(e){if(!e)return null;const t=j();return Ua(t).find(a=>a.id===e)||null}async function Yc(e){if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(e);return}const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}function Xc(){if(!$?.formFields?.rawCoordinates)return;const e=$.formFields.rawCoordinates.value,t=Rc(e);if(!t){le("Koordinaten konnten nicht erkannt werden. Bitte Format 47.68952, 9.12091 verwenden.","warning",6e3);return}const a=t.latitude.toFixed(6),n=t.longitude.toFixed(6);$.formFields.latitude&&($.formFields.latitude.value=a),$.formFields.longitude&&($.formFields.longitude.value=n),le("Koordinaten übernommen.","success"),Oa()}function ed(){if(!$?.verifyButton)return;const e=$.verifyButton.dataset.targetUrl;if(!e){le("Bitte zuerst gültige Koordinaten eintragen, bevor die Prüfung geöffnet wird.","warning",6e3);return}window.open(e,"_blank","noopener,noreferrer")}async function Or(e={}){const{notify:t=!1}=e;if(!(!$||Ve(j().app)!=="ok"||j().gps.pending))try{await $s(),t&&le("GPS-Punkte aktualisiert.","success"),Te("GPS-Punkte synchronisiert.")}catch(n){const r=n instanceof Error?n.message:"GPS-Punkte konnten nicht geladen werden.";le(r,"danger",7e3),Te(`Fehler beim Laden: ${r}`)}}async function td(e){if(!e)return;const t=Xa(e);if(!t){le("Ausgewählter GPS-Punkt wurde nicht gefunden.","warning");return}try{await Cs(t.id),le(`"${t.name}" ist nun aktiv.`,"success"),Te(`Aktiver GPS-Punkt: ${t.name}`)}catch(a){const n=a instanceof Error?a.message:"GPS-Punkt konnte nicht aktiviert werden.";le(n,"danger",7e3),Te(`Fehler beim Aktivieren: ${n}`)}}async function ad(e){if(!e)return;const t=Xa(e);if(!t){le("GPS-Punkt existiert nicht mehr.","warning");return}if(window.confirm(`"${t.name}" wirklich löschen? Dieser Schritt kann nicht rückgängig gemacht werden.`))try{await Ko(t.id),le(`"${t.name}" wurde gelöscht.`,"success"),Te(`GPS-Punkt gelöscht: ${t.name}`)}catch(n){const r=n instanceof Error?n.message:"GPS-Punkt konnte nicht gelöscht werden.";le(r,"danger",7e3),Te(`Löschen fehlgeschlagen: ${r}`)}}async function nd(e){if(!e)return;const t=Xa(e);if(!t){le("GPS-Punkt nicht gefunden.","warning");return}const a=`${t.latitude}, ${t.longitude}`;try{await Yc(a),le("Koordinaten in die Zwischenablage kopiert.","success")}catch(n){console.error("clipboard error",n),le("Koordinaten konnten nicht kopiert werden.","danger",7e3)}}async function rd(e,t){const a=(e||"").trim();if(!a){aa(t,{status:"error",id:"",message:"Ungültige GPS-Anfrage ohne ID."});return}if(Ve(j().app)!=="ok"){le("GPS-Modul ist ohne aktive SQLite-Datenbank nicht verfügbar.","warning",6e3),aa(t,{status:"error",id:a,message:"GPS-Modul ist derzeit nicht verfügbar."});return}const r=Xa(a);if(!r){le("Verknüpfter GPS-Punkt wurde nicht gefunden.","warning",6e3),aa(t,{status:"error",id:a,message:"Verknüpfter GPS-Punkt wurde nicht gefunden."});return}aa(t,{status:"pending",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wird aktiviert...`});try{await Cs(r.id),le(`"${r.name||"Ohne Namen"}" wurde aus der Historie aktiviert.`,"success"),Te(`Aus Historie aktiviert: ${r.name||r.id}`),aa(t,{status:"success",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wurde aktiviert.`})}catch(s){const l=s instanceof Error?s.message:"GPS-Punkt konnte nicht aktiviert werden.";le(l,"danger",7e3),Te(`Aktivierung aus Historie fehlgeschlagen: ${l}`),aa(t,{status:"error",id:r.id,name:r.name,message:l})}}async function id(){try{await Wo(),Te("Aktiver GPS-Punkt synchronisiert."),le("Aktiver GPS-Punkt wurde synchronisiert.","success")}catch(e){const t=e instanceof Error?e.message:"Aktiver GPS-Punkt konnte nicht ermittelt werden.";le(t,"danger",7e3),Te(`Sync fehlgeschlagen: ${t}`)}}function sd(){if(!$?.formFields)throw new Error("Formular nicht initialisiert");const e=$.formFields.name?.value.trim()||"",t=$.formFields.description?.value.trim()||"",a=$.formFields.source?.value.trim()||"",n=Number($.formFields.latitude?.value),r=Number($.formFields.longitude?.value),s=!!$.formFields.activate?.checked;if(!e)throw new Error("Name darf nicht leer sein.");if(!Number.isFinite(n)||!Number.isFinite(r))throw new Error("Koordinaten sind ungültig.");return{name:e,description:t,latitude:n,longitude:r,source:a,activate:s}}async function od(e){if(e.preventDefault(),Ka.isLocked()){le("Speichern läuft bereits ...","info");return}try{const t=sd();if(Wc(t.latitude,t.longitude)){le("Ein GPS-Punkt mit identischen Koordinaten ist bereits vorhanden.","warning",6e3);return}da(j().gps,Ve(j().app)),await jo({name:t.name,description:t.description||null,latitude:t.latitude,longitude:t.longitude,source:t.source||null},{activate:t.activate}),T.success(`GPS-Punkt "${t.name}" gespeichert.`),Te(`GPS-Punkt gespeichert${t.activate?" und aktiv gesetzt":""}: ${t.name}`),$?.form?.reset()}catch(t){const a=t instanceof Error?t.message:"GPS-Punkt konnte nicht gespeichert werden.";T.error(a),Te(`Speichern fehlgeschlagen: ${a}`)}finally{da(j().gps,Ve(j().app))}}function ld(){if($?.formFields){if(!navigator.geolocation){T.warning("Geolocation wird von diesem Browser nicht unterstützt.");return}if(Ka.isLocked()){T.info("Bitte warten...");return}Ka.acquire(async()=>(da(j().gps,Ve(j().app)),new Promise(e=>{navigator.geolocation.getCurrentPosition(t=>{const{latitude:a,longitude:n}=t.coords;$?.formFields.latitude&&($.formFields.latitude.value=a.toFixed(6)),$?.formFields.longitude&&($.formFields.longitude.value=n.toFixed(6)),$?.formFields.source&&!$.formFields.source.value.trim()&&($.formFields.source.value="Browser"),T.success("Koordinaten aus Browser-Position übernommen."),Te("Browser-Geolocation übernommen"),Oa(),da(j().gps,Ve(j().app)),e()},t=>{const a=t.code===t.PERMISSION_DENIED?"Zugriff auf Standort wurde verweigert.":"Geolocation konnte nicht ermittelt werden.";T.warning(a),Te(`Geolocation fehlgeschlagen: ${a}`),da(j().gps,Ve(j().app)),e()},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})})))}}function cd(){$&&($.root.addEventListener("click",e=>{const t=e.target;if(!t)return;const a=t.closest('[data-role="gps-tab"]');if(a&&a.dataset.tab){so(a.dataset.tab);return}const n=t.closest("[data-action]");if(!n||n.dataset.action==="")return;const s=n.closest("[data-point-id]")?.getAttribute("data-point-id")||"";switch(n.dataset.action){case"reload-points":Or({notify:!0});break;case"sync-active":id();break;case"set-active":td(s);break;case"delete-point":ad(s);break;case"copy-coords":nd(s);break;case"use-geolocation":ld();break;case"apply-raw-coords":Xc();break;case"verify-coords":ed();break}}),$.form?.addEventListener("submit",e=>{od(e)}),$.form?.addEventListener("reset",()=>{window.setTimeout(()=>{Oa()},0)}),$.formFields.latitude?.addEventListener("input",()=>{Oa()}),$.formFields.longitude?.addEventListener("input",()=>{Oa()}))}function dd(e,t){if(!e||os)return;os=!0;const a=e;a.innerHTML="";const n=Hc();a.appendChild(n),$=Oc(n),cs?.(),cs=Ws({section:"gps",event:"gps:data-changed",shouldHandleEvent:()=>Ve(t.state.getState().app)==="ok",shouldRefresh:()=>Ve(t.state.getState().app)==="ok",onRefresh:()=>Or({notify:!1}),onStatusChange:l=>Gc(l)}),Me=0,ra?.destroy(),ra=null,Hr=null,cd(),so(ro),typeof t.events?.subscribe=="function"&&t.events.subscribe("gps:set-active-from-history",l=>{let o="";if(l&&typeof l=="object"&&(o=String(l.id||"").trim()),!o){le("Historische GPS-Anfrage ohne gültige ID erhalten.","warning",6e3);return}rd(o,t)});const r=t.state.getState();Aa=r.gps.activePointId;const s=(l,o)=>{const d=Ve(l.app),f=l.gps;if(Uc(d),ui(l,d),da(f,d),_c(l),d==="ok"&&!f.initialized&&!f.pending&&Or({notify:!1}),d==="ok"&&ls!=="ok"&&f.initialized&&le("GPS-Bereich ist wieder verfügbar.","success"),ls=d,l.gps.activePointId!==Aa&&(Aa=l.gps.activePointId,typeof t.events?.emit=="function")){const u=Xa(Aa);t.events.emit("gps:active-point-changed",{id:Aa,point:u})}l.gps.lastError&&l.gps.lastError!==o.gps.lastError&&(le(l.gps.lastError,"danger",7e3),Te(`Fehler: ${l.gps.lastError}`))};t.state.subscribe(s),s(r,r)}let Oe=[],_e=[],_r=!1,An=null;async function gt(){try{const[e,t]=await Promise.all([Qo({limit:100}),Jo({limit:100})]);Oe=e.items||[],_e=t.items||[],Bn("savedCodes:changed",{eppoCount:Oe.length,bbchCount:_e.length})}catch(e){console.error("Failed to load saved codes:",e),Oe=[],_e=[]}}function ud(){const e=Oe.length>0,t=_e.length>0;return`
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
                  ${Rr()}
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
  `}function Rr(){return Oe.length?Oe.map(e=>`
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
    `}function Kr(){return _e.length?_e.map(e=>`
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
    `}function bt(e){const t=e.querySelector('[data-role="saved-eppo-list"]'),a=Oe.length>0;if(t){const o=t.closest(".border-top");o&&a&&(o.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Kulturen
            <span class="badge bg-success ms-2">${Oe.length}</span>
          </h6>
          <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Rr()}
          </div>
        `)}else if(a){const o=e.querySelector(".codes-card:first-child .border-top.pt-3.mb-3");o&&(o.innerHTML=`
        <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
          <i class="bi bi-bookmark-star me-1"></i>
          Meine Kulturen
          <span class="badge bg-success ms-2">${Oe.length}</span>
        </h6>
        <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
          ${Rr()}
        </div>
      `)}const n=e.querySelector('[data-role="saved-bbch-list"]'),r=_e.length>0;if(n){const o=n.closest(".border-top");o&&r&&(o.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${_e.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Kr()}
          </div>
        `)}else if(r){const d=e.querySelectorAll(".codes-card")[1];if(d){const f=d.querySelector(".border-top.pt-3.mb-3");f&&(f.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${_e.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Kr()}
          </div>
        `)}}const s=e.querySelector(".codes-card:first-child .card-header .badge"),l=e.querySelector(".codes-card:last-child .card-header .badge");s&&(s.textContent=`${Oe.length} gespeichert`),l&&(l.textContent=`${_e.length} gespeichert`)}function pd(e){const t=e.querySelector('[data-input="eppo-search"]'),a=e.querySelector('[data-role="eppo-search-results"]');if(t&&a){const o=Si(async()=>{const d=t.value.trim();if(d.length<2){a.innerHTML="";return}try{const f=await Vo(d,10);if(!f.length){a.innerHTML=`
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
        `}},300);t.addEventListener("input",o)}const n=e.querySelector('[data-input="bbch-search"]'),r=e.querySelector('[data-role="bbch-search-results"]');if(n&&r){const o=Si(async()=>{const d=n.value.trim();if(d.length<1){r.innerHTML="";return}try{const f=await Zo(d,10);if(!f.length){r.innerHTML=`
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
        `}},300);n.addEventListener("input",o)}e.dataset.codesClickBound!=="1"&&(e.dataset.codesClickBound="1",e.addEventListener("click",async o=>{const f=o.target.closest("[data-action]");if(!f)return;const u=f.dataset.action;if(u==="select-eppo"){const m=f.dataset.code||"",v=f.dataset.name||"",k=f.dataset.language||"",h=f.dataset.dtcode||"";if(!m||!v){console.warn("EPPO selection missing code or name");return}a&&(a.innerHTML=""),t&&(t.value="");const S=Oe.find(w=>w.code.toUpperCase()===m.toUpperCase());if(S){const w=e.querySelector(`[data-eppo-id="${S.id}"]`);w&&(w.classList.add("flash-highlight"),setTimeout(()=>w.classList.remove("flash-highlight"),800));return}try{await fr({code:m,name:v,language:k||void 0,dtcode:h||void 0,isFavorite:!1});const w=Ye();await Xe(w),await gt(),bt(e)}catch(w){console.error("Failed to save EPPO from search:",w),alert("Speichern fehlgeschlagen")}}if(u==="select-bbch"){const m=f.dataset.code||"",v=f.dataset.label||"",k=f.dataset.principal,h=f.dataset.secondary,S=k?parseInt(k,10):void 0,w=h?parseInt(h,10):void 0;if(!m||!v){console.warn("BBCH selection missing code or label");return}r&&(r.innerHTML=""),n&&(n.value="");const E=_e.find(M=>M.code===m);if(E){const M=e.querySelector(`[data-bbch-id="${E.id}"]`);M&&(M.classList.add("flash-highlight"),setTimeout(()=>M.classList.remove("flash-highlight"),800));return}try{await mr({code:m,label:v,principalStage:Number.isNaN(S)?void 0:S,secondaryStage:Number.isNaN(w)?void 0:w,isFavorite:!1});const M=Ye();await Xe(M),await gt(),bt(e)}catch(M){console.error("Failed to save BBCH from search:",M),alert("Speichern fehlgeschlagen")}}if(u==="toggle-favorite-eppo"){const m=f.dataset.id;if(!m)return;const v=Oe.find(k=>k.id===m);if(!v)return;try{await fr({id:v.id,code:v.code,name:v.name,language:v.language,dtcode:v.dtcode,isFavorite:!v.isFavorite});const k=Ye();await Xe(k),await gt(),bt(e)}catch(k){console.error("Failed to toggle EPPO favorite:",k)}}if(u==="toggle-favorite-bbch"){const m=f.dataset.id;if(!m)return;const v=_e.find(k=>k.id===m);if(!v)return;try{await mr({id:v.id,code:v.code,label:v.label,principalStage:v.principalStage,secondaryStage:v.secondaryStage,isFavorite:!v.isFavorite});const k=Ye();await Xe(k),await gt(),bt(e)}catch(k){console.error("Failed to toggle BBCH favorite:",k)}}if(u==="delete-eppo"){const m=f.dataset.id;if(!m||!confirm("EPPO-Code wirklich löschen?"))return;try{await Go({id:m});const v=Ye();await Xe(v),await gt(),bt(e)}catch(v){console.error("Failed to delete EPPO:",v)}}if(u==="delete-bbch"){const m=f.dataset.id;if(!m||!confirm("BBCH-Stadium wirklich löschen?"))return;try{await Uo({id:m});const v=Ye();await Xe(v),await gt(),bt(e)}catch(v){console.error("Failed to delete BBCH:",v)}}}));const s=e.querySelector('[data-form="add-eppo"]');s&&s.addEventListener("submit",async o=>{o.preventDefault();const d=e.querySelector('[data-input="eppo-code"]'),f=e.querySelector('[data-input="eppo-name"]'),u=e.querySelector('[data-input="eppo-favorite"]'),m=d?.value.trim(),v=f?.value.trim();if(!m||!v){alert("Bitte Code und Name eingeben");return}try{await fr({code:m,name:v,isFavorite:u?.checked||!1});const k=Ye();await Xe(k),await gt(),bt(e),d&&(d.value=""),f&&(f.value=""),u&&(u.checked=!1)}catch(k){console.error("Failed to save EPPO:",k),alert("Speichern fehlgeschlagen")}});const l=e.querySelector('[data-form="add-bbch"]');l&&l.addEventListener("submit",async o=>{o.preventDefault();const d=e.querySelector('[data-input="bbch-code"]'),f=e.querySelector('[data-input="bbch-label"]'),u=e.querySelector('[data-input="bbch-favorite"]'),m=d?.value.trim(),v=f?.value.trim();if(!m||!v){alert("Bitte Code und Bezeichnung eingeben");return}try{await mr({code:m,label:v,isFavorite:u?.checked||!1});const k=Ye();await Xe(k),await gt(),bt(e),d&&(d.value=""),f&&(f.value=""),u&&(u.checked=!1)}catch(k){console.error("Failed to save BBCH:",k),alert("Speichern fehlgeschlagen")}})}function fd(e,t,a={}){if(!e||_r)return;An=e,_r=!0,An.innerHTML=`
    <div class="section-inner codes-manager">
      <h4 class="mb-3"><i class="bi bi-tags me-2"></i>EPPO & BBCH Codes</h4>
      ${ud()}
    </div>`;const n=An.querySelector(".codes-manager");if(!n)return;pd(n);const r=async()=>{await gt(),bt(n)};t?.events?.subscribe?.("database:connected",()=>{r()}),t?.state?.getState?.().app?.hasDatabase&&r()}function md(){_r=!1,An=null}let us=!1,yt=null,Na=null,Pn=null,Fa=null,Rt=null,_n=null,xt=null,Va=null,Rn=null,kt=null,Wr=null,ht=null,Ce=new Set,Bt=null,xr=!1,kr=!1,ua=!1;const at=e=>Ge(e.mediums),Mn=25,wr=new Intl.NumberFormat("de-DE");let Fe=0,ia=null,jr=null,Gr=null,pi=null;function gd(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function bd(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`profile-${Date.now()}-${Math.random().toString(16).slice(2,10)}`}function lo(e){if(!Ce.size)return;const t=new Set(at(e).map(n=>n.id));let a=!1;Ce.forEach(n=>{t.has(n)||(Ce.delete(n),a=!0)}),a&&(Ce=new Set(Ce))}function Kn(){yt&&yt.querySelectorAll('[data-role="profile-select"]').forEach(e=>{const t=e.dataset.mediumId;e.checked=!!(t&&Ce.has(t))})}function Nt(e){const t=at(e).length,a=Ce.size;let n="Noch keine Mittel ausgewählt.";t?a===t&&t>0?n=`${a} Mittel ausgewählt (alle).`:a>0&&(n=`${a} Mittel ausgewählt.`):n="Keine Mittel vorhanden.",Wr&&(Wr.textContent=n),ht&&(ht.disabled=t===0,ht.indeterminate=a>0&&a<t,ht.checked=t>0&&a===t)}function Cn(e){Bt=null,_n&&_n.reset(),Va&&(Va.value=""),xt&&(xt.value=""),kt&&(kt.textContent="Profil speichern"),Ce=new Set,Kn(),Nt(e)}function hd(e,t){Bt=e.id,Va&&(Va.value=e.id),xt&&(xt.value=e.name,xt.focus()),kt&&(kt.textContent="Profil aktualisieren"),Ce=new Set(e.mediumIds),Kn(),Nt(t)}function ps(e,t){if(kt){if(kt.disabled=e,e){kt.textContent=t||"Speichert...";return}kt.textContent=Bt?"Profil aktualisieren":"Profil speichern"}}function Wn(e,t){if(Na){if(Na.disabled=e,e){Na.textContent=t||"Speichert...";return}Na.textContent="Hinzufügen"}}async function vd(e,t,a){if(ua)return;const n=t.state.getState(),s=(at(n)[e]??null)?.id||null;ua=!0,Wn(!0);const l=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediums",d=>{const f=Za(d),u=f.items.slice();return u.splice(e,1),{...f,items:u,totalCount:Math.min(f.totalCount,u.length),lastUpdatedAt:new Date().toISOString()}}),await jn({silent:!0})&&s&&t.events?.emit?.("mediums:data-changed",{action:"deleted",id:s})}finally{ua=!1,Wn(!1),a&&a.isConnected&&(a.disabled=!1,a.textContent=l??"Löschen")}}async function yd(e,t,a){const n=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediumProfiles",(r=[])=>r.filter(s=>s.id!==e.id)),Bt===e.id&&Cn(t.state.getState()),await jn({successMessage:"Profil gelöscht."})}finally{a&&(a.disabled=!1,a.textContent=n||"Löschen")}}function xd(e){if(!Rn)return;const t=Rn,a=e.mediumProfiles||[];if(!a.length){t.innerHTML=`
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
    `,t.appendChild(s)})}function kd(e,t){if(xr||!e.mediumProfiles?.length)return;const a=new Set(at(e).map(s=>s.id));let n=!1;const r=e.mediumProfiles.map(s=>{const l=s.mediumIds.filter(o=>a.has(o));return l.length!==s.mediumIds.length?(n=!0,{...s,mediumIds:l,updatedAt:new Date().toISOString()}):s}).filter(s=>s.mediumIds.length?!0:(n=!0,!1));n&&(xr=!0,t.state.updateSlice("mediumProfiles",()=>r),xr=!1)}function co(e){if(!e)return Fe=0,{start:0,end:0,total:0};const t=Math.max(Math.ceil(e/Mn),1);Fe>=t&&(Fe=t-1),Fe<0&&(Fe=0);const a=Fe*Mn,n=Math.min(a+Mn,e);return{start:a,end:n,total:e}}function wd(){if(!Gr)return null;const e=Gr.querySelector('[data-role="mediums-pager"]');return e?((!ia||jr!==e)&&(ia?.destroy(),ia=Ja(e,{onPrev:()=>Sd(),onNext:()=>Ed(),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Mittel...",empty:"Keine Mittel verfügbar"}}),jr=e),ia):null}function fs(e){const t=wd();if(!t)return;const a=at(e).length;if(!a){Fe=0,t.update({status:"disabled",info:"Noch keine Mittel gespeichert."});return}const{start:n,end:r}=co(a),s=`Mittel ${wr.format(n+1)}–${wr.format(r)} von ${wr.format(a)}`;t.update({status:"ready",info:s,canPrev:Fe>0,canNext:r<a})}function Sd(){if(Fe===0)return;const e=pi?.state.getState();e&&(Fe=Math.max(Fe-1,0),fi(e))}function Ed(){const e=pi?.state.getState();if(!e)return;const t=at(e).length;if(!t)return;const a=Math.max(Math.ceil(t/Mn)-1,0);Fe>=a||(Fe=Math.min(Fe+1,a),fi(e))}function fi(e){if(!yt)return;lo(e);const t=new Map(e.measurementMethods.map(l=>[l.id,l])),a=at(e).length;if(!a){yt.innerHTML=`
      <tr>
        <td colspan="9" class="text-center text-muted">Noch keine Mittel gespeichert.</td>
      </tr>
    `,Nt(e),fs(e);return}const{start:n,end:r}=co(a),s=at(e).slice(n,r);yt.innerHTML="",s.forEach((l,o)=>{const d=n+o,f=document.createElement("tr"),u=t.get(l.methodId),m=l.approval||l.zulassungsnummer,v=typeof m=="string"&&m.trim().length?g(m):"-",k=typeof l.wartezeit=="string"&&l.wartezeit.trim().length?g(l.wartezeit):typeof l.wartezeit=="number"?`${l.wartezeit} Tage`:"-",h=typeof l.wirkstoff=="string"&&l.wirkstoff.trim().length?g(l.wirkstoff):"-";f.innerHTML=`
      <td class="text-center">
        <input type="checkbox" class="form-check-input" data-role="profile-select" data-medium-id="${g(l.id)}" ${Ce.has(l.id)?"checked":""} />
      </td>
      <td>${g(l.name)}</td>
      <td>${g(l.unit)}</td>
      <td>${g(u?u.label:l.method||l.methodId||"-")}</td>
      <td>${g(l.value!=null?String(l.value):"")}</td>
      <td>${v}</td>
      <td>${k}</td>
      <td>${h}</td>
      <td>
        <button class="btn btn-sm btn-danger" data-action="delete" data-index="${d}">Löschen</button>
      </td>
    `,yt?.appendChild(f)}),Nt(e),fs(e)}function ms(e){if(!Fa)return;const t=new Set;Fa.innerHTML="",e.measurementMethods.forEach(a=>{const n=(a.label??"").toLowerCase(),r=(a.id??"").toLowerCase();if(n&&!t.has(n)){t.add(n);const s=document.createElement("option");s.value=a.label,Fa.appendChild(s)}if(r&&!t.has(r)){t.add(r);const s=document.createElement("option");s.value=a.id,Fa.appendChild(s)}})}function Ld(e){const t=e.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t||`method-${Date.now()}-${Math.random().toString(16).slice(2,6)}`}function Dd(e,t){if(!Pn)return null;const a=Pn.value.trim();if(!a)return window.alert("Bitte eine Methode angeben."),Pn.focus(),null;const n=e.measurementMethods.find(o=>o.label?.toLowerCase()===a.toLowerCase()||o.id?.toLowerCase()===a.toLowerCase());if(n)return n.id;const r=Ld(a),s=e.fieldLabels?.calculation?.fields?.quantity?.unit||"Kiste",l={id:r,label:a,type:"factor",unit:s,requires:["areaHa"],config:{sourceField:"areaHa"}};return t.state.updateSlice("measurementMethods",o=>[...o,l]),r}async function jn(e){try{const t=Ye();return await Xe(t),e?.silent||window.alert(e?.successMessage??"Änderungen wurden gespeichert."),!0}catch(t){console.error("Fehler beim Speichern",t);const a=t instanceof Error?t.message:"Speichern fehlgeschlagen";return window.alert(a),!1}}function $d(e,t){const a=!!t.app?.hasDatabase,n=t.app?.activeSection==="settings";e.classList.toggle("d-none",!(a&&n))}function zd(e,t){if(!e||us)return;const a=e;a.innerHTML="";const n=gd();a.appendChild(n),Gr=n,pi=t,Fe=0,ia?.destroy(),ia=null,jr=null,yt=n.querySelector("#settings-mediums-table tbody"),Pn=n.querySelector('input[name="medium-method"]'),Fa=n.querySelector("#settings-method-options"),Rt=n.querySelector("#settings-medium-form"),Na=Rt?Rt.querySelector('button[type="submit"]'):null,_n=n.querySelector("#settings-profile-form"),xt=n.querySelector("#profile-name"),Va=n.querySelector('input[name="profile-id"]'),Rn=n.querySelector("#settings-profile-table tbody"),kt=n.querySelector('[data-role="profile-submit"]'),Wr=n.querySelector('[data-role="profile-selection-summary"]'),ht=n.querySelector('[data-role="profile-select-all"]');let r=!1,s=!1;function l(u){if(n.querySelectorAll("[data-settings-tab]").forEach(m=>{const v=m.dataset.settingsTab===u;m.classList.toggle("active",v)}),n.querySelectorAll("[data-pane]").forEach(m=>{const v=m.dataset.pane===u;m.style.display=v?"block":"none"}),u==="gps"&&!r){const m=n.querySelector('[data-feature="gps-embedded"]');m&&(dd(m,t),r=!0)}if(u==="codes"&&!s){const m=n.querySelector('[data-feature="codes-embedded"]');m&&(md(),fd(m,{state:t.state,events:{subscribe:t.events?.subscribe}},{}),s=!0)}}n.querySelectorAll("[data-settings-tab]").forEach(u=>{u.addEventListener("click",()=>{const m=u.dataset.settingsTab;m&&l(m)})});async function o(){if(!Rt||ua)return;const u=t.state.getState(),m=new FormData(Rt),v=(m.get("medium-name")||"").toString().trim(),k=(m.get("medium-unit")||"").toString().trim(),h=m.get("medium-value"),S=Number(h),w=(m.get("medium-approval")||"").toString().trim(),E=m.get("medium-wartezeit"),M=E?Number(E):null,U=(m.get("medium-wirkstoff")||"").toString().trim()||null;if(!v||!k||Number.isNaN(S)){window.alert("Bitte alle Felder korrekt ausfüllen.");return}const K=Dd(u,t);if(!K)return;const be=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`medium-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,N={id:be,name:v,unit:k,methodId:K,value:S,zulassungsnummer:w||null,wartezeit:M!=null&&!Number.isNaN(M)?M:null,wirkstoff:U};ua=!0,Wn(!0,"Speichere...");try{t.state.updateSlice("mediums",q=>{const D=Za(q),A=[...D.items,N];return{...D,items:A,totalCount:A.length,lastUpdatedAt:new Date().toISOString()}}),ms(t.state.getState()),await jn({successMessage:"Mittel gespeichert.",silent:!0})&&(Rt.reset(),t.events?.emit?.("mediums:data-changed",{action:"created",id:be}))}finally{ua=!1,Wn(!1)}}Rt?.addEventListener("submit",u=>{u.preventDefault(),o()}),yt?.addEventListener("click",u=>{const m=u.target?.closest('[data-action="delete"]');if(!m)return;const v=Number(m.dataset.index);Number.isNaN(v)||vd(v,t,m)}),yt?.addEventListener("change",u=>{const m=u.target;if(!m||m.dataset.role!=="profile-select")return;const v=m.dataset.mediumId;if(!v)return;m.checked?Ce.add(v):Ce.delete(v);const k=t.state.getState();Nt(k)}),ht?.addEventListener("change",()=>{const u=t.state.getState();ht&&(ht.indeterminate=!1,ht.checked?Ce=new Set(at(u).map(m=>m.id)):Ce=new Set,Kn(),Nt(u))});const d=async()=>{if(!xt)return;const u=xt.value.trim();if(!u){window.alert("Bitte einen Profilnamen eingeben."),xt.focus();return}if(!Ce.size){window.alert("Bitte mindestens ein Mittel auswählen.");return}const m=t.state.getState();if(m.mediumProfiles?.some(w=>w.name.toLowerCase()===u.toLowerCase()&&w.id!==Bt)){window.alert("Ein Profil mit diesem Namen existiert bereits.");return}const k=at(m).filter(w=>Ce.has(w.id)).map(w=>w.id);if(!k.length){window.alert("Ausgewählte Mittel sind nicht mehr verfügbar. Bitte Auswahl prüfen."),lo(m),Kn(),Nt(m);return}if(kr)return;const h=!!Bt;kr=!0,ps(!0,h?"Aktualisiere...":"Speichere...");const S=new Date().toISOString();try{if(Bt)t.state.updateSlice("mediumProfiles",(E=[])=>E.map(M=>M.id===Bt?{...M,name:u,mediumIds:k,updatedAt:S}:M));else{const E={id:bd(),name:u,mediumIds:k,createdAt:S,updatedAt:S};t.state.updateSlice("mediumProfiles",(M=[])=>[...M,E])}await jn({successMessage:h?"Profil aktualisiert und gespeichert.":"Profil gespeichert."})&&Cn(t.state.getState())}finally{kr=!1,ps(!1)}};_n?.addEventListener("submit",u=>{u.preventDefault(),d()}),Rn?.addEventListener("click",u=>{const m=u.target?.closest('[data-action^="profile-"]');if(!m)return;const v=m.dataset.id;if(!v)return;const k=t.state.getState();if(m.dataset.action==="profile-edit"){const h=k.mediumProfiles?.find(S=>S.id===v);h&&hd(h,k);return}if(m.dataset.action==="profile-delete"){const h=k.mediumProfiles?.find(S=>S.id===v);if(!h||!window.confirm(`Profil "${h.name}" wirklich löschen?`))return;yd(h,t,m)}}),n.querySelector('[data-action="profile-reset"]')?.addEventListener("click",()=>{Cn(t.state.getState())}),Cn(t.state.getState());const f=u=>{kd(u,t),$d(n,u),u.app.activeSection==="settings"&&(fi(u),ms(u),xd(u),Nt(u))};t.state.subscribe(f),f(t.state.getState()),us=!0}const Pa=e=>g(e),Sr=(e,t=1)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function pa(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function Ad(e){if(!e)return"";const t=new Date(e);if(Number.isNaN(t.getTime()))return g(e);const a=Math.round((t.getTime()-Date.now())/864e5);return a<0?`<span style="color:#ef4444;">${pa(e)} · abgelaufen</span>`:a<180?`<span style="color:#f59e0b;">${pa(e)} · ${a} T</span>`:`<span class="calc-hint">${pa(e)}</span>`}function Pd(){return`
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
    </section>`}function Md(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Pd();const a=e.querySelector('[data-role="lager-uebersicht"]'),n=e.querySelector('[data-role="lager-bewegungen"]'),r=e.querySelector('[data-role="lager-form"]'),s=e.querySelector("#lager-mittel-options"),l=e.querySelector('[data-role="lager-empty"]'),o=new Map,d=k=>{if(a){if(!k.length){a.innerHTML='<tr><td colspan="6" class="calc-hint" style="padding:14px;">Noch keine Mittel. Erfasse unten einen Zugang oder dokumentiere Anwendungen in „Neu erfassen".</td></tr>';return}a.innerHTML=k.map(h=>{const S=h.bestand<0?"#ef4444":h.bestand===0?"#f59e0b":"inherit",w=g(h.einheit||"");return`<tr>
          <td><span class="fw-semibold">${g(h.name)}</span>${h.kennr?`<span class="d-block calc-hint">${g(h.kennr)}</span>`:""}</td>
          <td class="calc-hint">${g(h.wirkstoff||"")}</td>
          <td class="text-end">${Sr(h.verbraucht)} ${w}<span class="d-block calc-hint">${h.anwendungen} Anw.</span></td>
          <td class="text-end fw-semibold" style="color:${S};">${Sr(h.bestand)} ${w}</td>
          <td>${Ad(h.zulEnde)}</td>
          <td class="calc-hint">${h.naechsterAblauf?pa(h.naechsterAblauf):""}</td>
        </tr>`}).join("")}},f=k=>{if(n){if(!k.length){n.innerHTML='<div class="calc-hint">Keine Bewegungen erfasst.</div>';return}n.innerHTML=k.map(h=>`
        <div class="d-flex align-items-center gap-2 py-1" style="border-bottom:1px solid var(--border-1);">
          <span class="badge" style="background:${h.typ==="zugang"?"#16a34a":"#64748b"};">${g(h.typ)}</span>
          <span class="flex-grow-1">${g(h.mittelName)} · <b>${Sr(h.menge)} ${g(h.einheit||"")}</b>${h.charge?` · Charge ${g(h.charge)}`:""}<span class="d-block calc-hint">${pa(h.datum)}${h.lieferant?" · "+g(h.lieferant):""}${h.ablauf?" · Ablauf "+pa(h.ablauf):""}</span></span>
          <button class="btn btn-sm" style="color:#ef4444;border:1px solid var(--border-1);background:transparent;" data-del="${Pa(h.id)}" title="Löschen">×</button>
        </div>`).join(""),n.querySelectorAll("[data-del]").forEach(h=>{h.addEventListener("click",async()=>{const S=h.getAttribute("data-del")||"";try{await el({id:S}),await tt().catch(()=>{}),await m()}catch{T.warning("Löschen fehlgeschlagen.")}})})}},u=()=>{s&&(s.innerHTML=Array.from(o.entries()).sort((k,h)=>k[0].localeCompare(h[0],"de")).map(([k,h])=>`<option value="${Pa(k)}" data-kennr="${Pa(h.kennr||"")}" data-einheit="${Pa(h.einheit||"")}" data-wirkstoff="${Pa(h.wirkstoff||"")}"></option>`).join(""))},m=async()=>{if(ce()!=="sqlite"){l&&(l.textContent="Bitte zuerst eine Datenbank öffnen.");return}try{const[k,h,S]=await Promise.all([Is(),Xo(),Bs()]);d(k?.rows||[]),f(h?.rows||[]),o.clear(),(S?.rows||[]).forEach(w=>{w.name&&o.set(w.name,{kennr:w.kennr??null,einheit:w.einheit??null,wirkstoff:w.wirkstoff??null})}),(k?.rows||[]).forEach(w=>{w.name&&!o.has(w.name)&&o.set(w.name,{kennr:w.kennr??null,einheit:w.einheit??null,wirkstoff:w.wirkstoff??null})}),u()}catch(k){console.warn("[Lager] Laden fehlgeschlagen:",k)}};r?.addEventListener("submit",async k=>{if(k.preventDefault(),ce()!=="sqlite"){T.warning("Bitte zuerst eine Datenbank öffnen.");return}const h=new FormData(r),S=String(h.get("mittel")||"").trim(),w=Number(String(h.get("menge")||"").replace(",","."));if(!S||!Number.isFinite(w)){T.warning("Mittel und Menge angeben.");return}const E=String(h.get("preis")||"").trim();try{await Yo({mittelName:S,kennr:String(h.get("kennr")||"").trim()||null,wirkstoff:o.get(S)?.wirkstoff||null,typ:String(h.get("typ")||"zugang"),menge:w,einheit:String(h.get("einheit")||"").trim()||null,datum:String(h.get("datum")||"").trim()||null,charge:String(h.get("charge")||"").trim()||null,ablauf:String(h.get("ablauf")||"").trim()||null,lieferant:String(h.get("lieferant")||"").trim()||null,preis:E?Number(E.replace(",",".")):null}),await tt().catch(()=>{}),r.reset(),T.success("Bewegung gespeichert."),await m()}catch{T.warning("Speichern fehlgeschlagen.")}});const v=e.querySelector('[name="mittel"]');v?.addEventListener("change",()=>{const k=o.get(v.value);if(!k)return;const h=e.querySelector('[name="einheit"]'),S=e.querySelector('[name="kennr"]');h&&k.einheit&&(h.value=k.einheit),S&&k.kennr&&(S.value=k.kennr)}),t.state.subscribe(k=>{k?.app?.activeSection==="lager"&&m()}),m()}const Gn={mechanisch:{label:"Mechanisch",icon:"bi-tools",color:"#2563eb"},chemisch_psm:{label:"Pflanzenschutz",icon:"bi-droplet-half",color:"#dc2626"},duengung:{label:"Düngung",icon:"bi-flower1",color:"#b45309"},nuetzlinge:{label:"Nützlinge",icon:"bi-bug",color:"#7c3aed"},bewaesserung:{label:"Bewässerung",icon:"bi-moisture",color:"#0891b2"},monitoring:{label:"Monitoring",icon:"bi-eye",color:"#475569"},sonstiges:{label:"Sonstiges",icon:"bi-three-dots",color:"#64748b"}},Cd=["mechanisch","chemisch_psm","duengung","nuetzlinge","bewaesserung","monitoring","sonstiges"];function uo(e){return Gn[e]||Gn.sonstiges}const Id={geplant:{label:"geplant",color:"#64748b"},aktiv:{label:"aktiv",color:"#16a34a"},abgeschlossen:{label:"abgeschlossen",color:"#94a3b8"}},jt=["#16a34a","#0891b2","#7c3aed","#d97706","#dc2626","#0d9488","#65a30d","#db2777"],Bd=/^#[0-9a-fA-F]{3,8}$/;function po(e){return typeof e=="string"&&Bd.test(e.trim())?e.trim():null}function fa(e,t=0){return po(e&&e.color)||jt[t%jt.length]}function it(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function De(e){if(!e)return NaN;const t=String(e).slice(0,10).replace(/-/g,""),a=Number(t);return Number.isFinite(a)?a:NaN}function sa(e){const t=[...e||[]].sort((s,l)=>(De(s.pflanzDatum)||0)-(De(l.pflanzDatum)||0)),a=Number(it().replace(/-/g,""));let n=t.find(s=>s.status==="aktiv")||null;if(!n){const s=t.filter(l=>l.status!=="abgeschlossen"&&De(l.pflanzDatum)<=a&&(!l.ernteDatum||De(l.ernteDatum)>=a));n=s.length?s[s.length-1]:null}let r=t.filter(s=>s!==n&&s.status!=="abgeschlossen"&&De(s.pflanzDatum)>a).sort((s,l)=>(De(s.pflanzDatum)||0)-(De(l.pflanzDatum)||0))[0]||null;return r||(r=t.filter(s=>s!==n&&s.status==="geplant").sort((s,l)=>(De(s.pflanzDatum)||0)-(De(l.pflanzDatum)||0))[0]||null),{current:n,next:r,all:t}}const fo=["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];function mo(e,t){const a=[];let n=e.getFullYear(),r=e.getMonth();const s=t.getFullYear(),l=t.getMonth();let o=0;for(;(n<s||n===s&&r<=l)&&o<60;)a.push({y:n,m:r}),r++,r>11&&(r=0,n++),o++;return a}function We(e,t){if(!t||!e.length)return null;const a=new Date(String(t).slice(0,10)+"T00:00:00");if(isNaN(a.getTime()))return null;const n=e.length,r=a.getFullYear()*12+a.getMonth(),s=e[0].y*12+e[0].m,l=e[n-1].y*12+e[n-1].m;if(r<s)return 0;if(r>l)return 1;const o=r-s,d=new Date(a.getFullYear(),a.getMonth()+1,0).getDate();return(o+(a.getDate()-1)/d)/n}const Nd={anzucht:{label:"Anzucht (vorziehen)",short:"Anzucht"},direkt:{label:"Direktsaat",short:"Direkt"}},Fd=["Pflanzen","m²","Beete","lfd. m","g Saatgut"];function vt(e,t){if(!e)return null;const a=new Date(String(e).slice(0,10)+"T00:00:00");return isNaN(a.getTime())?null:(a.setDate(a.getDate()+Math.round(Number(t)||0)),a.getFullYear()+"-"+String(a.getMonth()+1).padStart(2,"0")+"-"+String(a.getDate()).padStart(2,"0"))}function Td(e,t,a){if(!e||!a)return{};const r=(e.anbauMethode==="anzucht"?"anzucht":"direkt")==="anzucht"&&Number(e.anzuchtTage)||0,s=Number(e.kulturTage)||0,l=Number(e.ernteTage)||0;let o;t==="aussaat"?o=vt(a,r):t==="ernte"?o=s?vt(a,-s):a:o=a;const d=vt(o,-r),f=s?vt(o,s):null,u=f?vt(f,l):null;return{aussaatDatum:d,pflanzDatum:o,ernteVon:f,ernteBis:u}}function qd(e,t){return e?{aussaatDatum:vt(e.aussaatDatum,t),pflanzDatum:vt(e.pflanzDatum,t),ernteVon:vt(e.ernteVon,t),ernteBis:vt(e.ernteBis,t)}:{}}function kn(e,t){if(!t||!Array.isArray(e))return null;const a=String(t).trim().toLowerCase();return a&&(e.find(n=>String(n.name||"").trim().toLowerCase()===a)||e.find(n=>{const r=String(n.name||"").trim().toLowerCase();return r&&(r.startsWith(a)||a.startsWith(r))}))||null}const Mt=["#ef4444","#3b82f6","#a855f7","#f59e0b","#06b6d4","#ec4899","#84cc16","#14b8a6"],Hd=()=>({bedW:1.2,pathW:.4,rowSp:.5,inRowSp:.4,angle:0}),Q=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";let ae=null,Le=null,_=null,wn=!1,Kt=[];function gs(){if(!_)return 1;const e=_.getCenter().lat;return 156543.03392*Math.cos(e*Math.PI/180)/Math.pow(2,_.getZoom())}function Od(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=_d();const a=[];let n=null;const r=new Map;let s=null,l=null,o={sat:null,osm:null},d=!0,f=!0,u=[],m=[];const v=(i,c)=>u.filter(p=>p.flaecheTyp===i&&String(p.flaecheId)===String(c)),k=(i,c)=>m.filter(p=>p.flaecheTyp===i&&String(p.flaecheId)===String(c));function h(i){const c=sa(v("acker",i.id)).current;return c&&c.kultur?{name:c.kultur,color:fa(c)}:i.kultur?{name:i.kultur,color:null}:null}function S(){const i=[];if(a.forEach(y=>{const b=y.latlngs||[];if(b.length<3)return;const C=b.map(ye=>[Number(ye[1]),Number(ye[0])]),I=C[0],X=C[C.length-1];(I[0]!==X[0]||I[1]!==X[1])&&C.push([I[0],I[1]]),i.push({type:"Feature",geometry:{type:"Polygon",coordinates:[C]},properties:{name:y.name||"",kultur:y.kultur||null,eppoCode:y.eppoCode||null,flaeche_m2:Math.round(y.result?.areaM2||0),flaeche_ha:Number(((y.result?.areaM2||0)/1e4).toFixed(4)),beete:y.result?.beds?.length||0,beetmeter_m:Math.round(y.result?.bedMeters||0),pflanzen:y.result?.plants||0,bettbreite_m:y.params?.bedW??null,wegbreite_m:y.params?.pathW??null,reihenabstand_m:y.params?.rowSp??null,pflanzabstand_m:y.params?.inRowSp??null,ausrichtung_grad:y.params?.angle??null}})}),(Ge(t.state.getState().gps?.points)||[]).forEach(y=>{const b=Number(y.latitude),C=Number(y.longitude);if(!Number.isFinite(b)||!Number.isFinite(C))return;const I=Number(y.nutzflaecheQm);i.push({type:"Feature",geometry:{type:"Point",coordinates:[C,b]},properties:{name:y.name||"Standort",typ:"standort",flaeche_m2:Number.isFinite(I)&&I>0?Math.round(I):null,kind:y.kind||null}})}),!i.length){T.warning("Keine Flächen oder Standorte zum Exportieren.");return}const p={type:"FeatureCollection",name:"PSM Acker-Planer",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:i};try{const y=new Blob([JSON.stringify(p,null,2)],{type:"application/geo+json"}),b=URL.createObjectURL(y),C=document.createElement("a");C.href=b,C.download="acker-flaechen.geojson",document.body.appendChild(C),C.click(),C.remove(),setTimeout(()=>URL.revokeObjectURL(b),1e3),T.success(`${i.length} Objekt(e) als GeoJSON exportiert.`)}catch(y){console.error("[Acker] GeoJSON-Export fehlgeschlagen",y),T.error("Export fehlgeschlagen.")}}function w(){if(!ae||!s)return;s.clearLayers(),(Ge(t.state.getState().gps?.points)||[]).forEach(c=>{const p=Number(c.latitude),y=Number(c.longitude);if(!Number.isFinite(p)||!Number.isFinite(y))return;const b=Number(c.nutzflaecheQm),C=Number.isFinite(b)&&b>0?`${Math.round(b)} m²`:"",I=c.name||"Standort",X=ae.marker([p,y],{icon:ae.divIcon({className:"acker-standort",html:'<span class="acker-standort-dot"></span>',iconSize:[16,16],iconAnchor:[8,8]})});X.bindTooltip(`${g(I)}${C?" · "+C:""}`,{permanent:!0,direction:"top",className:"acker-standort-label",offset:[0,-9]}),X.on("click",()=>H({typ:"haus",id:c.id,name:I,area:Number.isFinite(b)&&b>0?b:0,latlng:[p,y]})),s.addLayer(X)})}const E=i=>e.querySelector(i),M=E('[data-role="acker-list"]'),U=E('[data-role="acker-empty"]'),K=E('[data-role="acker-totals"]'),be=E('[data-role="acker-map"]'),N=i=>({id:i.id,name:i.name,kultur:i.kultur||null,eppoCode:i.eppoCode||null,standortId:i.standortId||null,color:i.color,latlngs:i.latlngs,areaQm:i.result?.areaM2||0,bedW:i.params.bedW,pathW:i.params.pathW,rowSp:i.params.rowSp,inRowSp:i.params.inRowSp,angle:i.params.angle,beds:i.result?.beds?.length||0,bedMeters:i.result?.bedMeters||0,plants:i.result?.plants||0}),Z=(i,c=!1)=>{if(ce()!=="sqlite")return;const p=async()=>{try{const y=await al(N(i));y?.id&&(i.id=y.id),await tt().catch(()=>{})}catch(y){console.warn("[Acker] Speichern fehlgeschlagen:",y)}};if(c){p();return}clearTimeout(r.get(i._key)),r.set(i._key,setTimeout(p,600))};function q(i,c){const p=i.map(mt=>[mt[1],mt[0]]);if(p.length<3)return{areaM2:0,beds:[],bedMeters:0,plants:0};const y=p[0],b=p[p.length-1];if((y[0]!==b[0]||y[1]!==b[1])&&p.push(y.slice()),p.length<4)return{areaM2:0,beds:[],bedMeters:0,plants:0};let C;try{C=Le.polygon([p])}catch{return{areaM2:0,beds:[],bedMeters:0,plants:0}}const I=Le.area(C),X=c.bedW+c.pathW;if(X<=0||c.bedW<=0||c.rowSp<=0||c.inRowSp<=0)return{areaM2:I,beds:[],bedMeters:0,plants:0};const ye=Le.centroid(C),me=Le.transformRotate(C,-c.angle,{pivot:ye}),Ee=Le.bbox(me),Je=1/111320,rt=X*Je,xo=c.bedW*Je,Sa=(Ee[2]-Ee[0])*.02+1e-4,gi=[];let bi=0,hi=0,vi=0;for(let mt=Ee[1];mt<Ee[3]&&vi<4e3;mt+=rt,vi++){const yi=Math.min(mt+xo,Ee[3]),ko=Le.polygon([[[Ee[0]-Sa,mt],[Ee[2]+Sa,mt],[Ee[2]+Sa,yi],[Ee[0]-Sa,yi],[Ee[0]-Sa,mt]]]);let pn=null;try{pn=Le.intersect(me,ko)}catch{pn=null}if(!pn)continue;let lr;try{lr=Le.transformRotate(pn,c.angle,{pivot:ye})}catch{continue}const cr=Le.area(lr);if(cr<Math.max(.4,c.bedW*.3))continue;const dr=cr/c.bedW,ur=Math.max(1,Math.floor(c.bedW/c.rowSp)),pr=Math.max(0,Math.floor(dr/c.inRowSp));bi+=dr,hi+=ur*pr,gi.push({geo:lr,lenM:dr,rows:ur,perRow:pr,plants:ur*pr,areaM2:cr})}return{areaM2:I,beds:gi,bedMeters:bi,plants:hi}}const D=(i,c,p)=>({color:i.color,weight:c?3.5:2.5,fillColor:i.color,fillOpacity:p?0:c?.3:.18,dashArray:null}),A=(i,c,p)=>({color:"#ffffff",weight:p?1:.7,opacity:.9,fillColor:i.color,fillOpacity:p?.9:.78});function J(i){if(!f||i.bedsHidden)return!1;const c=gs(),p=(i.params?.bedW||0)/c,y=(i.params?.pathW||0)/c,b=(i.params?.pathW||0)<=.001||y>=1.2;return p>=4&&b}function ie(i){i.outline&&(_.removeLayer(i.outline),i.outline=null),i.bedsLayer&&(_.removeLayer(i.bedsLayer),i.bedsLayer=null),i.label&&l&&(l.removeLayer(i.label),i.label=null),Ie(i)}function ee(i){const c=!!i.editing;i.outline&&_.removeLayer(i.outline),i.bedsLayer&&(_.removeLayer(i.bedsLayer),i.bedsLayer=null),i.label&&l&&l.removeLayer(i.label),Ie(i);const p=i._key===n,y=J(i);i._lastDetail=y,y&&(i.bedsLayer=ae.layerGroup(),(i.result?.beds||[]).forEach((b,C)=>{const I=ae.geoJSON(b.geo,{style:A(i,C,p),bubblingMouseEvents:!1});I.bindTooltip(`Beet ${C+1} · ${Q(b.lenM,1)} m · ${b.rows}×${Q(b.perRow)} = ${Q(b.plants)} Pfl.`,{sticky:!0}),I.on("click",()=>ve(i._key)),I.on("contextmenu",X=>F(i,X,C+1)),I.addTo(i.bedsLayer)}),i.bedsLayer.addTo(_)),i.outline=ae.polygon(i.latlngs,{...D(i,p,y),className:p?"acker-outline-grab":"",bubblingMouseEvents:!1}).addTo(_),i.outline.on("click",()=>{ve(i._key),H({typ:"acker",id:i.id,name:i.name,area:i.result?.areaM2||0,fieldRef:i})}),i.outline.on("dblclick",()=>Dt(i)),i.outline.on("contextmenu",b=>F(i,b)),i.outline.on("mousedown",b=>W(i,b)),xe(i,p),(p||c)&&dt(i)}function xe(i,c){if(!d||!l||!i.outline)return;let p;try{p=i.outline.getBounds().getCenter()}catch{return}const y=i.result?.plants||0,b=h(i),C=b?`<em class="cr" style="--cc:${g(b.color||"#16a34a")}"><span class="dot"></span>${g(b.name)}</em>`:"",I=`<div class="acker-flabel${c?" sel":""}" style="--fc:${i.color}"><b>${g(i.name||"")}</b>${C}<i>${Q(y)} Pfl.</i></div>`;i.label=ae.marker(p,{interactive:!1,keyboard:!1,icon:ae.divIcon({className:"acker-flabel-wrap",html:I,iconSize:[0,0]})}),l.addLayer(i.label)}function dt(i){Ie(i),i.handles=i.latlngs.map((c,p)=>{const y=ae.marker(c,{draggable:!0,icon:ae.divIcon({className:"acker-vhandle"})}).addTo(_);return y.on("drag",b=>{i.latlngs[p]=[b.target.getLatLng().lat,b.target.getLatLng().lng],i.outline.setLatLngs(i.latlngs)}),y.on("dragend",()=>ut(i)),y.on("contextmenu",b=>z(i,p,b)),y}),i.editing=!0}function Ie(i){(i.handles||[]).forEach(c=>_.removeLayer(c)),i.handles=[],i.editing=!1}function Be(){a.forEach(i=>ee(i))}function Jt(){a.forEach(i=>{J(i)!==i._lastDetail&&ee(i)})}function Lt(i,c){i.color=c;try{i.outline?.setStyle({color:c,fillColor:c})}catch{}if(i.bedsLayer)try{i.bedsLayer.eachLayer(y=>y.setStyle&&y.setStyle({fillColor:c}))}catch{}try{const y=i.label?.getElement?.()?.querySelector?.(".acker-flabel");y&&y.style.setProperty("--fc",c)}catch{}const p=M?.querySelector(".acker-field.sel .acker-swatch");p&&(p.style.background=c)}function Dt(i){if(i.latlngs?.length)try{_.fitBounds(ae.polygon(i.latlngs).getBounds(),{maxZoom:20,padding:[40,40]})}catch{}}function en(){const i=a.filter(c=>c.latlngs?.length>=3);if(!i.length){T.info("Keine Flächen vorhanden.");return}try{let c=ae.polygon(i[0].latlngs).getBounds();i.slice(1).forEach(p=>{c=c.extend(ae.polygon(p.latlngs).getBounds())}),_.fitBounds(c,{maxZoom:19,padding:[40,40]})}catch{}}function ut(i){i.result=q(i.latlngs,i.params),ee(i),ne(),Z(i)}function tr(i){if(Ze("app",c=>({...c,activeSection:"kultur"})),i?.id)try{window.dispatchEvent(new CustomEvent("psm:openKultur",{detail:{typ:"acker",id:String(i.id)}}))}catch{}else T.info("Fläche wird gespeichert – in der Kulturführung gleich wählbar.")}let Ne=null;const $t=()=>{Ne&&(Ne.remove(),Ne=null,document.removeEventListener("pointerdown",va,!0),document.removeEventListener("keydown",tn,!0))},va=i=>{Ne&&!Ne.contains(i.target)&&$t()},tn=i=>{i.key==="Escape"&&$t()};function ar(i,c){c.style.left="",c.style.right="",c.style.top="";const p=i.getBoundingClientRect(),y=c.getBoundingClientRect(),b=y.width||210,C=y.height||260;p.right+3+b>window.innerWidth-8&&(c.style.left="auto",c.style.right="calc(100% + 3px)");let I=-5;p.top+I+C>window.innerHeight-8&&(I=Math.min(-5,window.innerHeight-8-C-p.top)),p.top+I<8&&(I=8-p.top),c.style.top=I+"px"}function an(i,c){c.forEach(p=>{if(!p)return;if(p.sep){const b=document.createElement("div");b.className="acker-ctx-sep",i.appendChild(b);return}if(p.type==="swatchGrid"){const b=document.createElement("div");b.className="acker-ctx-swatches",p.colors.forEach(X=>{const ye=document.createElement("button");ye.type="button",ye.className="acker-sw"+(X===p.current?" on":""),ye.style.background=X,ye.title=X,ye.addEventListener("click",me=>{me.stopPropagation(),$t(),p.onPick(X)}),b.appendChild(ye)});const C=document.createElement("label");C.className="acker-sw-custom",C.innerHTML=`<i class="bi bi-eyedropper"></i><input type="color" value="${p.current||"#3b82f6"}">`;const I=C.querySelector("input");I.addEventListener("input",X=>(p.onLive||p.onPick)(X.target.value)),I.addEventListener("change",X=>{p.onPick(X.target.value),$t()}),b.appendChild(C),i.appendChild(b);return}const y=document.createElement("button");if(y.type="button",y.className="acker-ctx-item"+(p.danger?" danger":"")+(p.submenu?" has-sub":"")+(p.disabled?" disabled":""),y.innerHTML=`<span class="ic">${p.icon||""}</span><span class="lb">${g(p.label)}</span>`+(p.right?`<span class="rt">${g(p.right)}</span>`:"")+(p.submenu?'<span class="ch"><i class="bi bi-chevron-right"></i></span>':""),p.submenu){const b=document.createElement("div");b.className="acker-ctx-sub",an(b,p.submenu),y.appendChild(b),y.addEventListener("pointerenter",()=>ar(y,b))}else p.disabled||y.addEventListener("click",b=>{b.stopPropagation(),p.keepOpen||$t(),p.action?.()});i.appendChild(y)})}function Se(i,c,p,y){if($t(),Ne=document.createElement("div"),Ne.className="acker-ctx",y){const X=document.createElement("div");X.className="acker-ctx-title",X.textContent=y,Ne.appendChild(X)}an(Ne,p),document.body.appendChild(Ne);const b=Ne.getBoundingClientRect();let C=i,I=c;C+b.width>window.innerWidth-8&&(C=Math.max(8,window.innerWidth-b.width-8)),I+b.height>window.innerHeight-8&&(I=Math.max(8,window.innerHeight-b.height-8)),Ne.style.left=C+"px",Ne.style.top=I+"px",setTimeout(()=>{document.addEventListener("pointerdown",va,!0),document.addEventListener("keydown",tn,!0)},0)}const zt=i=>{const c=i.originalEvent||i;return c&&ae.DomEvent.preventDefault?.(c),i.originalEvent&&ae.DomEvent.stop?.(i),{x:c.clientX,y:c.clientY}};function Yt(i,c){i.params.angle=(Math.round(i.params.angle+c)%180+180)%180,ut(i),T.info(`Beete-Ausrichtung: ${i.params.angle}°`)}function nn(i){const c=i.latlngs||[];if(c.length<2||!Le)return;let p=-1,y=0;for(let b=0;b<c.length;b++){const C=c[b],I=c[(b+1)%c.length];try{const X=Le.point([C[1],C[0]]),ye=Le.point([I[1],I[0]]),me=Le.distance(X,ye);me>p&&(p=me,y=Le.bearing(X,ye))}catch{}}i.params.angle=(Math.round(y-90)%180+180)%180,ut(i),T.success(`Beete an Fläche ausgerichtet (${i.params.angle}°).`)}function ya(i,c){i.color=c,ee(i),ne(),Z(i)}function Qe(i,c){i.kultur=c||null,i.eppoCode=Kt.find(p=>p.kultur===i.kultur)?.eppoCode||null,ee(i),ne(),Z(i),T.success(c?`Kultur: ${c}`:"Kultur entfernt.")}function rn(i){i.bedsHidden=!i.bedsHidden,ee(i),T.info(i.bedsHidden?"Beete ausgeblendet.":"Beete eingeblendet.")}function nr(i){ve(i._key),setTimeout(()=>{const c=M?.querySelector(".acker-field.sel .acker-name");c&&(c.focus(),c.select())},30)}function Xt(i){const p=gs()*18/111320,y={_key:"new-"+ ++on,id:null,name:(i.name||"Fläche")+" (Kopie)",kultur:i.kultur,eppoCode:i.eppoCode,standortId:i.standortId,color:Mt[(Mt.indexOf(i.color)+1)%Mt.length],latlngs:i.latlngs.map(b=>[b[0]+p,b[1]+p]),params:{...i.params},outline:null,bedsLayer:null,label:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(y),n=y._key,ut(y),Z(y,!0),T.success("Fläche dupliziert.")}function xa(i){const c=i.latlngs||[];if(c.length<3){T.warning("Fläche hat keine Geometrie.");return}const p=c.map(b=>[Number(b[1]),Number(b[0])]);(p[0][0]!==p[p.length-1][0]||p[0][1]!==p[p.length-1][1])&&p.push([p[0][0],p[0][1]]);const y={type:"FeatureCollection",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:[{type:"Feature",geometry:{type:"Polygon",coordinates:[p]},properties:{name:i.name||"",kultur:i.kultur||null,eppoCode:i.eppoCode||null,flaeche_m2:Math.round(i.result?.areaM2||0),beete:i.result?.beds?.length||0,beetmeter_m:Math.round(i.result?.bedMeters||0),pflanzen:i.result?.plants||0}}]};try{const b=new Blob([JSON.stringify(y,null,2)],{type:"application/geo+json"}),C=URL.createObjectURL(b),I=document.createElement("a");I.href=C,I.download=`${(i.name||"flaeche").replace(/[^\w\-]+/g,"_")}.geojson`,document.body.appendChild(I),I.click(),I.remove(),setTimeout(()=>URL.revokeObjectURL(C),1e3),T.success("Fläche als GeoJSON exportiert.")}catch{T.error("Export fehlgeschlagen.")}}async function x(i){const c=i.result||{},p=[`Fläche: ${i.name||""}`,i.kultur?`Kultur: ${i.kultur}`:"",`Größe: ${Q(c.areaM2||0)} m² (${Q((c.areaM2||0)/1e4,3)} ha)`,`Beete: ${Q(c.beds?.length||0)}`,`Beetmeter: ${Q(c.bedMeters||0)} m`,`Pflanzen: ${Q(c.plants||0)}`].filter(Boolean).join(`
`);try{await navigator.clipboard.writeText(p),T.success("Werte kopiert.")}catch{T.warning("Kopieren nicht möglich.")}}const L=i=>({icon:'<i class="bi bi-palette"></i>',label:"Farbe",submenu:[{type:"swatchGrid",colors:Mt,current:i.color,onPick:c=>ya(i,c),onLive:c=>Lt(i,c)}]}),O=i=>({icon:'<i class="bi bi-flower1"></i>',label:"Kultur zuweisen",submenu:[{icon:'<i class="bi bi-x"></i>',label:"– keine –",action:()=>Qe(i,null)},...Kt.length?[{sep:!0}]:[],...Kt.map(c=>({icon:c.kultur===i.kultur?'<i class="bi bi-check2"></i>':"",label:`${c.kultur}${c.anbau?" ("+c.anbau+")":""}`,action:()=>Qe(i,c.kultur)}))]});function F(i,c,p){ve(i._key);const{x:y,y:b}=zt(c),C=!!i.editing;Se(y,b,[{icon:'<i class="bi bi-clipboard2-pulse"></i>',label:"Kulturführung öffnen",action:()=>tr(i)},{icon:'<i class="bi bi-pencil"></i>',label:"Umbenennen",action:()=>nr(i)},O(i),L(i),{sep:!0},{icon:'<i class="bi bi-arrow-clockwise"></i>',label:"Beete drehen +15°",keepOpen:!0,action:()=>Yt(i,15)},{icon:'<i class="bi bi-arrow-counterclockwise"></i>',label:"Beete drehen −15°",keepOpen:!0,action:()=>Yt(i,-15)},{icon:'<i class="bi bi-bounding-box"></i>',label:"Beete an Fläche ausrichten",action:()=>nn(i)},{icon:'<i class="bi bi-grid-3x3-gap"></i>',label:i.bedsHidden?"Beete einblenden":"Beete ausblenden",action:()=>rn(i)},{icon:'<i class="bi bi-bounding-box-circles"></i>',label:C?"Eckpunkte fertig":"Eckpunkte bearbeiten",action:()=>{C?Ie(i):dt(i)}},{sep:!0},{icon:'<i class="bi bi-copy"></i>',label:"Duplizieren",action:()=>Xt(i)},{icon:'<i class="bi bi-zoom-in"></i>',label:"Auf Fläche zoomen",action:()=>Dt(i)},{icon:'<i class="bi bi-clipboard-data"></i>',label:"Werte kopieren",action:()=>x(i)},{icon:'<i class="bi bi-download"></i>',label:"Als GeoJSON exportieren",action:()=>xa(i)},{sep:!0},{icon:'<i class="bi bi-trash"></i>',label:"Löschen",danger:!0,action:()=>he(i._key)}],p?`${i.name||"Fläche"} · Beet ${p}`:i.name||"Fläche")}function z(i,c,p){const{x:y,y:b}=zt(p);Se(y,b,[{icon:'<i class="bi bi-node-minus"></i>',label:"Eckpunkt löschen",disabled:i.latlngs.length<=3,action:()=>{i.latlngs.length<=3||(i.latlngs.splice(c,1),ut(i))}},{icon:'<i class="bi bi-check2"></i>',label:"Bearbeiten beenden",action:()=>Ie(i)}],`Eckpunkt ${c+1}`)}function P(){!o.sat||!o.osm||(_.hasLayer(o.sat)?(_.removeLayer(o.sat),o.osm.addTo(_),T.info("Karte: OSM")):(_.removeLayer(o.osm),o.sat.addTo(_),T.info("Karte: Satellit")))}function B(i){const c=i.latlng,{x:p,y}=zt(i);Se(p,y,[{icon:'<i class="bi bi-pencil-square"></i>',label:"Neue Fläche hier zeichnen",action:()=>{nt(!0),dn({latlng:c})}},{icon:'<i class="bi bi-crosshair"></i>',label:"Hierhin zentrieren",action:()=>_.panTo(c)},{sep:!0},{icon:'<i class="bi bi-arrows-fullscreen"></i>',label:"Alle Flächen anzeigen",disabled:!a.some(b=>b.latlngs?.length>=3),action:en},{icon:'<i class="bi bi-layers"></i>',label:"Kartentyp wechseln (Satellit/OSM)",action:P},{sep:!0},{icon:'<i class="bi bi-geo-alt"></i>',label:"Koordinaten kopieren",action:async()=>{try{await navigator.clipboard.writeText(`${c.lat.toFixed(6)}, ${c.lng.toFixed(6)}`),T.success("Koordinaten kopiert.")}catch{T.warning("Kopieren nicht möglich.")}}}],"Karte")}function de(i){return['<option value="">– Kultur –</option>'].concat(Kt.map(c=>{const p=`${c.kultur}${c.anbau?" ("+c.anbau+")":""}`;return`<option value="${g(c.kultur)}"${c.kultur===i?" selected":""}>${g(p)}</option>`})).join("")}function pe(i){const c=Ge(t.state.getState().gps?.points)||[];return['<option value="">– Standort –</option>'].concat(c.map(p=>`<option value="${g(p.id)}"${p.id===i?" selected":""}>${g(p.name||"")}</option>`)).join("")}function fe(i){const c=h(i);return c?`<span class="acker-cropchip" title="Kultur"><span class="dot" style="background:${g(c.color||"#94a3b8")}"></span>${g(c.name)}</span>`:""}function Y(){if(!K)return;let i=0,c=0,p=0,y=0;a.forEach(C=>{i+=C.result?.areaM2||0,c+=C.result?.beds?.length||0,p+=C.result?.bedMeters||0,y+=C.result?.plants||0});const b=(C,I)=>{const X=K.querySelector(C);X&&(X.textContent=I)};b('[data-t="area"]',Q(i)+" m² · "+Q(i/1e4,3)+" ha"),b('[data-t="beds"]',Q(c)),b('[data-t="meters"]',Q(p)+" m"),b('[data-t="plants"]',Q(y))}function G(i,c){const p=c.result||{},y=i.querySelector(".acker-stat");y&&(y.textContent=Q(p.plants||0)+" Pfl.");const b=i.querySelectorAll(".acker-res .r b");b[0]&&(b[0].textContent=Q(p.areaM2||0)+" m² · "+Q((p.areaM2||0)/1e4,3)+" ha"),b[1]&&(b[1].textContent=Q(p.beds?.length||0)),b[2]&&(b[2].textContent=Q(p.bedMeters||0)+" m"),b[3]&&(b[3].textContent=Q(p.plants||0)),Y()}const te=["Jan.","Feb.","März","Apr.","Mai","Juni","Juli","Aug.","Sep.","Okt.","Nov.","Dez."];function oe(i){if(!i)return"";const c=new Date(String(i).slice(0,10)+"T00:00:00");return isNaN(c.getTime())?"":`${c.getDate()}. ${te[c.getMonth()]}`}function ke(i){const c=i?.ernteVon?oe(i.ernteVon):"",p=i?.ernteBis||i?.ernteDatum?oe(i.ernteBis||i.ernteDatum):"";return c&&p?`Ernte ${c}–${p}`:p?`Ernte ~${p}`:c?`Ernte ab ${c}`:""}function Re(){const i=E('[data-role="acker-info"]');i&&(i.style.display="none")}function H(i){const c=E('[data-role="acker-info"]');if(!c)return;const{current:p,next:y}=sa(v(i.typ,i.id)),b=k(i.typ,i.id).filter(rt=>rt.status==="geplant").length,C=i.typ==="haus",I=i.area?`${Q(i.area)} m²`:"",X=p?fa(p):"#94a3b8",ye=p?`<div class="ai-row"><span class="ai-dot" style="background:${g(X)}"></span>
           <div><div class="ai-crop">${g(p.kultur||"Kultur")}</div>
           <div class="ai-sub">${g([p.pflanzDatum?"gepflanzt "+oe(p.pflanzDatum):"",ke(p)].filter(Boolean).join(" · "))}</div></div></div>`:'<div class="ai-row"><span class="ai-dot" style="background:#cbd5e1"></span><div class="ai-crop muted">Fläche ist frei</div></div>',me=y?`<div class="ai-next"><i class="bi bi-arrow-right-short"></i> Danach: <b>${g(y.kultur||"")}</b>${y.pflanzDatum?" ab "+oe(y.pflanzDatum):""}</div>`:"",Ee=!C&&i.fieldRef?`<div class="ai-metrics"><span><b>${Q(i.fieldRef.result?.beds?.length||0)}</b> Beete</span><span><b>${Q(i.fieldRef.result?.bedMeters||0)}</b> m</span><span><b>${Q(i.fieldRef.result?.plants||0)}</b> Pfl.</span></div>`:"",Je=`<div class="ai-tasks${b?" has":""}"><i class="bi ${b?"bi-list-check":"bi-check2-circle"}"></i> ${b?b+" Aufgabe"+(b===1?"":"n")+" offen":"Nichts offen"}</div>`;c.innerHTML=`
      <div class="ai-head">
        <div class="ai-title"><b>${g(i.name||"Fläche")}</b><span class="ai-badge">${C?"Gewächshaus":"Freiland"}${I?" · "+I:""}</span></div>
        <button class="ai-x" data-ai="close" title="Schließen"><i class="bi bi-x-lg"></i></button>
      </div>
      ${ye}${me}${Ee}${Je}
      <div class="ai-actions">
        <button class="ai-btn primary" data-ai="kultur"><i class="bi bi-clipboard2-pulse"></i> Kulturführung</button>
        <button class="ai-btn" data-ai="zoom"><i class="bi bi-zoom-in"></i> Hin</button>
      </div>`,c.style.display="block",c.querySelector('[data-ai="close"]')?.addEventListener("click",Re),c.querySelector('[data-ai="kultur"]')?.addEventListener("click",()=>{Ze("app",rt=>({...rt,activeSection:"kultur"}));try{window.dispatchEvent(new CustomEvent("psm:openKultur",{detail:{typ:i.typ,id:String(i.id)}}))}catch{}}),c.querySelector('[data-ai="zoom"]')?.addEventListener("click",()=>{!C&&i.fieldRef?Dt(i.fieldRef):i.latlng&&_.setView(i.latlng,Math.max(_.getZoom(),18))})}function ne(){if(!M||!U||!K)return;U.style.display=a.length?"none":"block",K.style.display=a.length?"block":"none",M.innerHTML="";let i=0,c=0,p=0,y=0;a.forEach(b=>{i+=b.result?.areaM2||0,c+=b.result?.beds?.length||0,p+=b.result?.bedMeters||0,y+=b.result?.plants||0;const C=b._key===n,I=document.createElement("div");I.className="acker-field"+(C?" sel open":""),I.innerHTML=`
        <div class="acker-fhead">
          <span class="acker-swatch" style="background:${b.color}"></span>
          <input class="acker-name" value="${g(b.name)}" />
          ${fe(b)}
          <span class="acker-stat">${Q(b.result?.plants||0)} Pfl.</span>
        </div>
        <div class="acker-fbody">
          <div class="acker-grid">
            <label class="acker-fld span2">Kultur<select data-k="kultur">${de(b.kultur)}</select></label>
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
            <div class="r"><span>Fläche</span><b>${Q(b.result?.areaM2||0)} m² · ${Q((b.result?.areaM2||0)/1e4,3)} ha</b></div>
            <div class="r"><span>Beete</span><b>${Q(b.result?.beds?.length||0)}</b></div>
            <div class="r"><span>Beetmeter</span><b>${Q(b.result?.bedMeters||0)} m</b></div>
            <div class="r"><span>Pflanzen</span><b>${Q(b.result?.plants||0)}</b></div>
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
        </div>`,I.querySelector(".acker-fhead").addEventListener("click",me=>{me.target.classList.contains("acker-name")||(ve(b._key),H({typ:"acker",id:b.id,name:b.name,area:b.result?.areaM2||0,fieldRef:b}))}),I.querySelector(".acker-name").addEventListener("input",me=>{b.name=me.target.value,Z(b)}),I.querySelectorAll("[data-k]").forEach(me=>{const Ee=me.dataset.k;if(Ee==="kultur"){me.addEventListener("input",Je=>{b.kultur=Je.target.value||null,b.eppoCode=Kt.find(rt=>rt.kultur===b.kultur)?.eppoCode||null,ee(b),Z(b)});return}if(Ee==="standortId"){me.addEventListener("input",Je=>{b.standortId=Je.target.value||null,Z(b)});return}me.addEventListener("input",Je=>{if(Ee==="angle"?b.params.angle=+Je.target.value:b.params[Ee]=parseFloat(Je.target.value)||0,b.result=q(b.latlngs,b.params),ee(b),G(I,b),Ee==="angle"){const rt=I.querySelector(".acker-angle-head b");rt&&(rt.textContent=b.params.angle+"°")}Z(b)})}),I.querySelector('[data-act="align"]')?.addEventListener("click",()=>nn(b)),I.querySelector('[data-act="del"]').addEventListener("click",()=>he(b._key)),I.querySelector('[data-act="zoom"]').addEventListener("click",()=>Dt(b)),I.querySelector('[data-act="dup"]').addEventListener("click",()=>Xt(b)),I.querySelector('[data-act="rot"]').addEventListener("click",()=>Yt(b,15));const ye=I.querySelector('[data-act="color"]');ye.addEventListener("input",me=>Lt(b,me.target.value)),ye.addEventListener("change",me=>ya(b,me.target.value)),M.appendChild(I)}),K.querySelector('[data-t="area"]').textContent=Q(i)+" m² · "+Q(i/1e4,3)+" ha",K.querySelector('[data-t="beds"]').textContent=Q(c),K.querySelector('[data-t="meters"]').textContent=Q(p)+" m",K.querySelector('[data-t="plants"]').textContent=Q(y)}function ve(i){n=i,a.forEach(c=>ee(c)),ne()}async function he(i){const c=a.find(y=>y._key===i);if(!c)return;ie(c);const p=a.findIndex(y=>y._key===i);if(p>=0&&a.splice(p,1),n===i&&(n=null),ne(),c.id&&ce()==="sqlite")try{await tl({id:c.id}),await tt().catch(()=>{})}catch{}}let we=null;function W(i,c){pt||i._key!==n||(we={fl:i,lastLL:c.latlng,moved:!1},_.dragging.disable(),_.getContainer().style.cursor="grabbing",ae.DomEvent.stop(c))}function se(i){if(!we)return;const c=we.fl;if(!we.moved){c.bedsLayer&&(_.removeLayer(c.bedsLayer),c.bedsLayer=null);try{c.outline.setStyle({fillOpacity:.3,dashArray:"6 5"})}catch{}}const p=i.latlng.lat-we.lastLL.lat,y=i.latlng.lng-we.lastLL.lng;we.lastLL=i.latlng,we.moved=!0,c.latlngs=c.latlngs.map(b=>[b[0]+p,b[1]+y]);try{c.outline.setLatLngs(c.latlngs)}catch{}if((c.handles||[]).forEach((b,C)=>{try{b.setLatLng(c.latlngs[C])}catch{}}),c.label)try{c.label.setLatLng(c.outline.getBounds().getCenter())}catch{}}function Ae(){if(!we)return;const i=we.fl,c=we.moved;we=null,_.dragging.enable(),_.getContainer().style.cursor="",c&&ut(i)}function ea(i){if(ue.length<3)return!1;const c=_.latLngToContainerPoint(ae.latLng(ue[0][0],ue[0][1])),p=_.latLngToContainerPoint(i);return c.distanceTo(p)<=14}function sn(i){if(!Le||i.length<3)return 0;try{const c=i.map(p=>[p[1],p[0]]);return c.push(c[0]),Le.area(Le.polygon([c]))}catch{return 0}}function At(i){const c=E('[data-role="acker-draw-stats"]');if(!c)return;const p=sn(i);c.textContent=`${ue.length} Punkt${ue.length===1?"":"e"}`+(p>0?` · ~${Q(p)} m²`:"")}let pt=!1,ue=[],Ke=null,ft=[],on=0;function ln(){Ke&&(_.removeLayer(Ke),Ke=null),ft.forEach(i=>_.removeLayer(i)),ft=[],ue=[]}function nt(i){pt=i,E('[data-role="acker-banner"]').style.display=i?"block":"none",E('[data-role="acker-draw"]').style.display=i?"none":"block",_.getContainer().style.cursor=i?"crosshair":"",i?_.on("mousemove",un):(_.off("mousemove",un),ln())}function cn(i){const c=i?[...ue,[i.lat,i.lng]]:ue;if(c.length<2){Ke&&(_.removeLayer(Ke),Ke=null);return}Ke?Ke.setLatLngs(c):Ke=ae.polygon(c,{interactive:!1,className:"acker-draw-preview",color:"#22c55e",weight:2.5,fillColor:"#22c55e",fillOpacity:.18,dashArray:"6 5"}).addTo(_)}function rr(i,c){const p=ae.circleMarker(i,{radius:c?7:5,color:"#fff",fillColor:c?"#16a34a":"#22c55e",fillOpacity:1,weight:2,interactive:c,bubblingMouseEvents:!1}).addTo(_);c&&(p.bindTooltip("Zum Schließen anklicken",{direction:"top"}),p.on("click",y=>{ae.DomEvent.stop(y),ue.length>=3&&ta()})),ft.push(p)}function dn(i){if(!pt){Re();return}if(ea(i.latlng)){ta();return}ue.push([i.latlng.lat,i.latlng.lng]),rr(i.latlng,ue.length===1),cn(),At(ue)}function un(i){if(!pt||!ue.length)return;const c=ea(i.latlng);if(cn(c?void 0:i.latlng),ft[0])try{ft[0].setRadius(c?10:7),ft[0].setStyle({weight:c?3:2})}catch{}At(c?ue:[...ue,[i.latlng.lat,i.latlng.lng]])}function ka(){if(!ue.length)return;ue.pop();const i=ft.pop();i&&_.removeLayer(i),cn(),At(ue)}function ta(){if(ue.length<3){T.warning("Mindestens 3 Punkte setzen.");return}const i={_key:"new-"+ ++on,id:null,name:"Fläche "+(a.length+1),kultur:null,eppoCode:null,standortId:null,color:Mt[a.length%Mt.length],latlngs:ue.map(c=>c.slice()),params:Hd(),outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(i),nt(!1),n=i._key,ut(i),Z(i,!0)}async function wa(){const i=E('[data-role="acker-q"]').value.trim();if(i)try{const p=await(await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+encodeURIComponent(i))).json();p[0]?_.setView([+p[0].lat,+p[0].lon],18):T.info("Nichts gefunden.")}catch{T.warning("Suche nicht verfügbar.")}}async function ir(){if(wn){setTimeout(()=>_&&_.invalidateSize(),60);return}wn=!0;try{await Ft(()=>Promise.resolve({}),__vite__mapDeps([2]));const y=await Ft(()=>import("./leaflet-src.BcflbDBd.js").then(b=>b.l),__vite__mapDeps([3,4]));ae=y.default||y,Le=await Ft(()=>import("./index.CPadEFgJ.js"),__vite__mapDeps([5,4]))}catch(y){console.warn("[Acker] Karten-Bibliotheken konnten nicht geladen werden:",y),U&&(U.textContent="Karte konnte nicht geladen werden (offline?)."),wn=!1;return}_=ae.map(be,{doubleClickZoom:!1,zoomControl:!0,attributionControl:!0}).setView([47.818,8.976],17);const i=ae.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:21,maxNativeZoom:19,attribution:"Tiles © Esri"}).addTo(_),c=ae.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"});o={sat:i,osm:c},s=ae.layerGroup(),w(),s.addTo(_),l=ae.layerGroup().addTo(_);const p=ae.DomUtil.create("div","acker-info");p.setAttribute("data-role","acker-info"),p.style.display="none",_.getContainer().appendChild(p),ae.DomEvent.disableClickPropagation(p),ae.DomEvent.disableScrollPropagation(p),_.on("click",dn),_.on("contextmenu",y=>{if(pt){ae.DomEvent.preventDefault?.(y.originalEvent||y),ka();return}B(y)}),_.on("mousemove",se),_.on("mouseup",Ae),document.addEventListener("mouseup",Ae),_.on("zoomend",Jt),E('[data-role="acker-draw"]').addEventListener("click",()=>nt(!0)),E('[data-role="acker-export"]')?.addEventListener("click",S),E('[data-role="acker-finish"]').addEventListener("click",ta),E('[data-role="acker-cancel"]').addEventListener("click",()=>nt(!1)),E('[data-role="acker-go"]').addEventListener("click",wa),E('[data-role="acker-q"]').addEventListener("keydown",y=>{y.key==="Enter"&&wa()}),E('[data-role="ctrl-fit"]')?.addEventListener("click",en),E('[data-role="ctrl-labels"]')?.addEventListener("click",()=>{d=!d,E('[data-role="ctrl-labels"]')?.classList.toggle("on",d),Be()}),E('[data-role="ctrl-beds"]')?.addEventListener("click",()=>{f=!f,E('[data-role="ctrl-beds"]')?.classList.toggle("on",f),Be()}),E('[data-role="ctrl-basemap"]')?.addEventListener("click",P),document.addEventListener("keydown",y=>{pt&&(y.key==="Backspace"&&(y.preventDefault(),ka()),y.key==="Enter"&&ta(),y.key==="Escape"&&nt(!1))}),await sr(),await Pt(),await or(),setTimeout(()=>_.invalidateSize(),60)}async function sr(){if(ce()==="sqlite")try{Kt=(await Zr())?.rows||[]}catch{Kt=[]}}async function Pt(){if(ce()!=="sqlite"){u=[],m=[];return}try{u=(await Dr())?.rows||[]}catch{u=[]}try{m=(await En())?.rows||[]}catch{m=[]}}async function or(){if(ce()==="sqlite")try{((await Qr())?.rows||[]).forEach(p=>{const y={_key:"db-"+p.id,id:p.id,name:p.name,kultur:p.kultur,eppoCode:p.eppoCode,standortId:p.standortId,color:p.color||Mt[a.length%Mt.length],latlngs:p.latlngs||[],params:{bedW:p.bedW??1.2,pathW:p.pathW??.4,rowSp:p.rowSp??.5,inRowSp:p.inRowSp??.4,angle:p.angle??0},outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};y.result=q(y.latlngs,y.params),a.push(y),ee(y)}),ne();const c=a.find(p=>p.latlngs?.length);if(c&&_)try{_.fitBounds(ae.polygon(c.latlngs).getBounds(),{maxZoom:19,padding:[30,30]})}catch{}}catch(i){console.warn("[Acker] Flächen laden fehlgeschlagen:",i)}}t.state.subscribe(i=>{if(i?.app?.activeSection==="acker"){if(!wn){ir();return}(async()=>(await Pt(),Be(),ne(),setTimeout(()=>_&&_.invalidateSize(),60)))()}}),ne()}function _d(){return`
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
  </section>`}function Ma(e){return e.typ+":"+e.id}function Rd(e){if(!Array.isArray(e)||e.length<3)return null;let t=0,a=0,n=0;const r=e.length,s=e[r-1],l=e[0],d=s&&l&&Number(s[0])===Number(l[0])&&Number(s[1])===Number(l[1])?r-1:r;for(let f=0;f<d;f++){const u=Number(e[f]?.[0]),m=Number(e[f]?.[1]);Number.isFinite(u)&&Number.isFinite(m)&&(t+=u,a+=m,n++)}return n?{lat:t/n,lon:a/n}:null}async function bs(e){const t=[];(Ge(e.state.getState().gps?.points)||[]).forEach(n=>{if(n?.kind!=="gewaechshaus")return;const r=Number(n.latitude),s=Number(n.longitude),l=Number(n.nutzflaecheQm);t.push({typ:"haus",id:String(n.id),name:n.name||"Gewächshaus",areaQm:Number.isFinite(l)&&l>0?l:null,lat:Number.isFinite(r)?r:null,lon:Number.isFinite(s)?s:null,color:null})});try{((await Qr())?.rows||[]).forEach(r=>{const s=Rd(r.latlngs),l=Number(r.areaQm);t.push({typ:"acker",id:String(r.id),name:r.name||"Fläche",areaQm:Number.isFinite(l)&&l>0?l:null,lat:s?.lat??null,lon:s?.lon??null,color:r.color||null})})}catch{}return t}const Kd="Wetterdaten: Open-Meteo (CC BY 4.0)",Wd="psm.weather.";function jd(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function Gd(e,t){return Wd+e.toFixed(3)+"_"+t.toFixed(3)}function Ud(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch{return null}}function Vd(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Zd(e){return!!e&&e.slice(0,10)===jd()}function Qd(e,t,a){const n=e?.time||[],r=e?.temperature_2m_max||[],s=e?.temperature_2m_min||[],l=e?.precipitation_sum||[],o=e?.sunshine_duration||[],d=Tn(new Date),f=Ei(d.year,d.week),u=new Map;for(let v=0;v<n.length;v++){const k=Ms(n[v]);if(!k)continue;const{year:h,week:S}=Tn(k),w=Ei(h,S);let E=u.get(w);E||(E={key:w,year:h,week:S,tmaxSum:0,tmaxN:0,tminSum:0,tminN:0,precip:0,precipN:0,sun:0,sunN:0,days:0},u.set(w,E)),Number.isFinite(r[v])&&(E.tmaxSum+=r[v],E.tmaxN++),Number.isFinite(s[v])&&(E.tminSum+=s[v],E.tminN++),Number.isFinite(l[v])&&(E.precip+=l[v],E.precipN++),Number.isFinite(o[v])&&(E.sun+=o[v],E.sunN++),E.days++}const m=[...u.values()].sort((v,k)=>v.key<k.key?-1:v.key>k.key?1:0).map(v=>{const k=v.tmaxN?v.tmaxSum/v.tmaxN:null,h=v.tminN?v.tminSum/v.tminN:null;return{weekKey:v.key,year:v.year,week:v.week,tMaxAvg:k,tMinAvg:h,tMeanAvg:k!=null&&h!=null?(k+h)/2:k,precipSum:v.precipN?v.precip:null,sunHours:v.sunN?v.sun/3600:null,days:v.days,isForecast:v.key>=f}});return{lat:t,lon:a,fetchedAt:new Date().toISOString(),weeks:m}}async function Jd(e,t){if(!Number.isFinite(e)||!Number.isFinite(t))return{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const a=Gd(e,t),n=Ud(a);if(n&&Zd(n.fetchedAt)&&n.weeks?.length)return n;if(typeof navigator<"u"&&navigator.onLine===!1)return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const r="https://api.open-meteo.com/v1/forecast?latitude="+e.toFixed(4)+"&longitude="+t.toFixed(4)+"&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunshine_duration&timezone=Europe%2FBerlin&past_days=92&forecast_days=16";try{const s=await fetch(r);if(!s.ok)throw new Error("HTTP "+s.status);const l=await s.json(),o=Qd(l.daily,e,t);return o.weeks.length&&Vd(a,o),o}catch{return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]}}}const Er=66;function Yd(e,t){const{units:a,anbau:n,mass:r,onSelect:s,onContext:l}=t;if(!a||!a.length){e.innerHTML='<div class="km-empty"><i class="bi bi-calendar3"></i><p>Noch keine Flächen für den Anbauplan.</p></div>';return}const o=new Date;let d=new Date(o.getFullYear(),o.getMonth()-1,1),f=new Date(o.getFullYear(),o.getMonth()+4,1);const u=N=>{if(!N)return;const Z=new Date(String(N).slice(0,10)+"T00:00:00");isNaN(Z.getTime())||(Z<d&&(d=new Date(Z.getFullYear(),Z.getMonth(),1)),Z>f&&(f=new Date(Z.getFullYear(),Z.getMonth(),1)))};(n||[]).forEach(N=>{u(N.pflanzDatum),u(N.ernteBis||N.ernteDatum),u(N.ernteVon)}),(r||[]).forEach(N=>u(N.planDatum||N.erledigtDatum));const m=mo(d,f),v=m.length,k=v*Er,h=N=>N==null?null:(N*100).toFixed(2)+"%",S=We(m,o.toISOString()),w=a.filter(N=>N.typ==="haus"),E=a.filter(N=>N.typ==="acker");let M="";m.forEach((N,Z)=>{const q=N.y===o.getFullYear()&&N.m===o.getMonth();M+=`<div class="kb2-mo${q?" cur":""}" style="width:${Er}px">${fo[N.m]}${N.m===0?" "+String(N.y).slice(2):""}</div>`});const U=N=>{const Z=(n||[]).filter(A=>A.flaecheTyp===N.typ&&String(A.flaecheId)===String(N.id)),q=(r||[]).filter(A=>A.flaecheTyp===N.typ&&String(A.flaecheId)===String(N.id));let D="";return Z.forEach((A,J)=>{const ie=We(m,A.pflanzDatum);let ee=We(m,A.ernteBis||A.ernteDatum||A.pflanzDatum);if(ie==null)return;(ee==null||ee<=ie)&&(ee=Math.min(1,ie+.5/v));const xe=fa(A,J),dt=A.status==="geplant";D+=`<div class="kb2-bar${dt?" planned":""}" title="${g(A.kultur||"Kultur")}" style="left:${h(ie)};width:${((ee-ie)*100).toFixed(2)}%;--cc:${g(xe)}"><span>${g(A.kultur||"")}</span></div>`;const Ie=We(m,A.ernteVon),Be=We(m,A.ernteBis);Ie!=null&&Be!=null&&Be>Ie&&(D+=`<div class="kb2-harvest" title="Ernte" style="left:${h(Ie)};width:${((Be-Ie)*100).toFixed(2)}%;--cc:${g(xe)}"></div>`)}),q.forEach(A=>{const J=A.status==="erledigt"?A.erledigtDatum||A.planDatum:A.planDatum||A.erledigtDatum,ie=We(m,J);if(ie==null)return;const ee=uo(A.art),xe=A.status==="erledigt";D+=`<span class="kb2-mk${xe?" done":""}" title="${g(ee.label+(A.notes?": "+A.notes:""))}" style="left:${h(ie)};--mc:${ee.color}"></span>`}),S!=null&&(D+=`<div class="kb2-today" style="left:${h(S)}"></div>`),D},K=N=>{const Z=N.typ+":"+N.id,q=(n||[]).filter(J=>J.flaecheTyp===N.typ&&String(J.flaecheId)===String(N.id)),D=q.find(J=>J.status==="aktiv")||q.find(J=>J.status!=="abgeschlossen"),A=D?g(D.kultur||""):"frei";return`<div class="kb2-row" data-ukey="${Z}">
      <div class="kb2-label" title="${g(N.name)}"><b>${g(N.name)}</b><small>${A}</small></div>
      <div class="kb2-track" style="width:${k}px">${U(N)}</div>
    </div>`},be=(N,Z)=>Z.length?`<div class="kb2-grp"><div class="kb2-grp-l">${g(N)}</div><div class="kb2-grp-t" style="width:${k}px"></div></div>`+Z.map(K).join(""):"";e.innerHTML=`
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
      .kb2-track{position:relative;height:38px;border-top:1px solid var(--border-1);background-image:linear-gradient(to right,var(--border-1) 1px,transparent 1px);background-size:${Er}px 100%}
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
      ${be("Gewächshäuser",w)}
      ${be("Freiland",E)}
    </div>
    <div class="kb2-legend">
      <span class="lg"><span class="d" style="background:var(--text-secondary,#475569)"></span>erledigt</span>
      <span class="lg"><span class="d" style="background:var(--surface-1);box-shadow:inset 0 0 0 2px var(--text-secondary,#475569)"></span>geplant</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:#9FE1CB;display:inline-block"></span>Kultur</span>
      <span class="lg"><span style="width:18px;height:9px;border-radius:3px;background:repeating-linear-gradient(45deg,#bbb,#bbb 2px,transparent 2px,transparent 4px);display:inline-block"></span>Ernte-Zeitraum</span>
      <span class="kb2-hint"><i class="bi bi-mouse2"></i> Klick = öffnen · Rechtsklick = planen</span>
    </div>`,e.querySelectorAll(".kb2-row").forEach(N=>{const Z=N.dataset.ukey;N.querySelector(".kb2-label")?.addEventListener("click",()=>s&&s(Z)),N.addEventListener("contextmenu",q=>{q.preventDefault(),l&&l(Z,q.clientX,q.clientY)})})}const Xd=[{art:"bewaesserung",label:"Gießen",icon:"bi-droplet"},{art:"mechanisch",label:"Hacken",icon:"bi-tools"},{art:"duengung",label:"Düngen",icon:"bi-flower1"},{art:"nuetzlinge",label:"Nützlinge",icon:"bi-bug"},{art:"chemisch_psm",label:"Pflanzenschutz",icon:"bi-droplet-half"},{art:"monitoring",label:"Kontrolle",icon:"bi-eye"},{art:"sonstiges",label:"Sonstiges",icon:"bi-three-dots"}],eu=["Jan.","Feb.","März","Apr.","Mai","Juni","Juli","Aug.","Sep.","Okt.","Nov.","Dez."];function tu(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=au();let a=[],n=[],r=[],s=[],l=[],o=null,d="plan",f=!1,u=!1;const m={};let v=null;const k=x=>e.querySelector(x),h=()=>k('[data-role="list"]'),S=()=>k('[data-role="detail"]'),w=()=>k('[data-role="kpis"]'),E=()=>k('[data-role="board-view"]'),M=()=>k('[data-role="flaechen-view"]'),U=()=>ce()==="sqlite",K=()=>{U()&&tt().catch(()=>{})},be=(x,L)=>x.filter(O=>O.flaecheTyp===L.typ&&String(O.flaecheId)===String(L.id)),N=x=>a.find(L=>Ma(L)===x)||null,Z=(x,L=0)=>po(x.color)||jt[L%jt.length];async function q(){if(a=await bs(t),U()){try{n=(await Dr())?.rows||[]}catch{n=[]}try{r=(await En())?.rows||[]}catch{r=[]}try{s=(await Zr())?.rows||[]}catch{s=[]}try{l=(await nl())?.rows||[]}catch{l=[]}if(!u){u=!0;try{const x=await Li();x?.imported&&(r=(await En())?.rows||[],T.info(`${x.imported} Pflanzenschutz-Eintrag(e) übernommen.`),K())}catch{}}}!o&&a.length&&(o=Ma(a[0])),J(),A()}async function D(){if(U()){try{n=(await Dr())?.rows||[]}catch{}try{r=(await En())?.rows||[]}catch{}}}async function A(){const x=o?N(o):null;if(!x||x.lat==null||x.lon==null)return;const L=Ma(x);if(!m[L]){m[L]={loading:!0,weeks:[]};try{m[L]=await Jd(x.lat,x.lon)}catch{m[L]={weeks:[]}}o===L&&Be()}}function J(){ee(),d==="plan"?(M().style.display="none",E().style.display="block",Yd(E(),{units:a,anbau:n,mass:r,onSelect:x=>{o=x,ie("flaechen"),A()},onContext:(x,L,O)=>ya(x,L,O)})):(E().style.display="none",M().style.display="grid",dt(),Be()),e.querySelectorAll(".km-modebtn").forEach(x=>x.classList.toggle("active",x.dataset.mode===d))}function ie(x){d=x,J()}function ee(){const x=w();if(!x)return;a.filter(z=>z.typ==="haus").length,a.filter(z=>z.typ==="acker").length;let L=0,O=null;a.forEach(z=>{const{current:P,next:B}=sa(be(n,z));P&&L++,B?.pflanzDatum&&(!O||De(B.pflanzDatum)<De(O.pflanzDatum))&&(O=B)});const F=r.filter(z=>z.status==="geplant").length;x.innerHTML=`
      ${xe(String(a.length),"Flächen")}
      ${xe(String(L),"Kulturen aktiv")}
      ${xe(String(F),"Aufgaben offen")}
      ${xe(O?Ea(Lt(O.pflanzDatum)):"–","Nächste Pflanzung")}
      <button class="km-psm" data-role="psm-import" title="Bestehende Pflanzenschutz-Einträge übernehmen"><i class="bi bi-arrow-down-circle"></i><span>PSM übernehmen</span></button>`,x.querySelector('[data-role="psm-import"]')?.addEventListener("click",tn)}const xe=(x,L)=>`<div class="km-kpi"><div class="km-kpi-v">${x}</div><div class="km-kpi-l">${g(L)}</div></div>`;function dt(){const x=h();if(!x)return;if(!a.length){x.innerHTML='<div class="km-empty"><i class="bi bi-geo-alt"></i><p>Noch keine Flächen.<br>Gewächshäuser unter Einstellungen, Freiland im Reiter „Karte".</p></div>';return}const L=a.filter(z=>z.typ==="haus"),O=a.filter(z=>z.typ==="acker"),F=(z,P)=>P.length?`<div class="km-grp">${g(z)}</div>`+P.map(Ie).join(""):"";x.innerHTML=F("Gewächshäuser",L)+F("Freiland",O),x.querySelectorAll("[data-ukey]").forEach(z=>{z.addEventListener("click",()=>{o=z.dataset.ukey,dt(),Be(),A()}),z.addEventListener("contextmenu",P=>{P.preventDefault(),ya(z.dataset.ukey,P.clientX,P.clientY)})})}function Ie(x,L){const O=Ma(x),{current:F}=sa(be(n,x));return`<div class="km-row${O===o?" sel":""}" data-ukey="${O}">
      <span class="km-dot" style="background:${g(F?fa(F):Z(x,L))}"></span>
      <div class="km-row-main"><div class="km-row-name">${g(x.name)}</div>
      <div class="km-row-sub">${F?`<span class="crop">${g(F.kultur||"Kultur")}</span>`:'<span class="free">frei</span>'}</div></div>
    </div>`}function Be(){const x=S();if(!x)return;const L=o?N(o):null;if(!L){x.innerHTML='<div class="km-empty"><i class="bi bi-hand-index"></i><p>Fläche links wählen.</p></div>';return}const O=be(n,L),F=be(r,L),{current:z,next:P}=sa(O),B=m[Ma(L)],de=L.typ==="haus"?"Gewächshaus":"Freiland",pe=L.areaQm?`${Math.round(L.areaQm).toLocaleString("de-DE")} m²`:"";let fe;if(z){const G=z.pflanzDatum?`seit ${Dt(z.pflanzDatum)} · ${Ea(Lt(z.pflanzDatum))}`:"",te=tr(z);fe=`<div class="km-hero active" style="--cc:${g(fa(z))}">
        <div class="km-hero-ic"><i class="bi bi-flower2"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop">${g(z.kultur||"Kultur")}</div><div class="km-hero-sub">${g(G+te+Ne(z))}</div></div>
        <button class="km-hero-edit" data-edit-crop="current" title="Bearbeiten"><i class="bi bi-pencil"></i></button>
      </div>`}else fe=`<div class="km-hero empty">
        <div class="km-hero-ic gray"><i class="bi bi-circle"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop gray">Fläche ist frei</div><div class="km-hero-sub">Noch keine Kultur eingetragen</div></div>
        <button class="km-hero-add" data-edit-crop="current"><i class="bi bi-plus-lg"></i> Kultur setzen</button>
      </div>`;const Y=P?`<div class="km-next"><i class="bi bi-arrow-right-short"></i>Danach geplant: <b>${g(P.kultur||"Kultur")}</b> · ab ${Ea(Lt(P.pflanzDatum))} <button class="km-next-edit" data-edit-crop="next" title="Bearbeiten"><i class="bi bi-pencil"></i></button></div>`:z?'<button class="km-next-add" data-edit-crop="next"><i class="bi bi-plus"></i> Nächste Kultur planen</button>':"";x.innerHTML=`
      <div class="km-head"><div class="km-head-l"><span class="km-head-name">${g(L.name)}</span><span class="km-head-badge">${de}${pe?" · "+pe:""}</span></div>
        <button class="km-headbtn" data-act="map"><i class="bi bi-map"></i> Auf Karte</button></div>
      ${fe}
      ${Y}
      ${$t(O,F)}
      <div class="km-tasks-head"><span>Aufgaben</span><button class="km-addtask" data-act="add-massnahme"><i class="bi bi-plus-lg"></i> Aufgabe</button></div>
      ${Jt(F)}
      <div class="km-foot">
        <span class="km-weather">${ut(B)}</span>
        <button class="km-plan" data-act="plan"><i class="bi bi-calendar3"></i> Saison &amp; Plan</button>
      </div>
      <div class="km-attr">${g(Kd)}${B?.stale?" · offline":""}</div>`,x.querySelector('[data-act="map"]')?.addEventListener("click",()=>va()),x.querySelector('[data-act="plan"]')?.addEventListener("click",()=>ie("plan")),x.querySelector('[data-act="add-massnahme"]')?.addEventListener("click",()=>xa(L,null,z)),x.querySelectorAll("[data-edit-crop]").forEach(G=>G.addEventListener("click",()=>{const te=G.dataset.editCrop;Xt(L,te==="current"?z:P,te,O.length)})),x.querySelectorAll("[data-m-done]").forEach(G=>G.addEventListener("click",te=>{te.stopPropagation(),ar(G.dataset.mDone)})),x.querySelectorAll("[data-m-del]").forEach(G=>G.addEventListener("click",te=>{te.stopPropagation(),an(G.dataset.mDel)})),x.querySelectorAll("[data-m-edit]").forEach(G=>G.addEventListener("click",()=>{const te=r.find(oe=>oe.id===G.dataset.mEdit);xa(L,te,z)}))}function Jt(x){const L=x.filter(B=>B.status==="geplant").sort((B,de)=>(De(B.planDatum)||9e15)-(De(de.planDatum)||9e15)),O=x.filter(B=>B.status==="erledigt").sort((B,de)=>(De(de.erledigtDatum)||0)-(De(B.erledigtDatum)||0)).slice(0,6),F=Number(it().replace(/-/g,"")),z=(B,de)=>{const pe=uo(B.art),fe=de?B.erledigtDatum:B.planDatum,Y=!de&&fe&&De(fe)<F,G=de?Dt(fe):en(fe,Y),te=B.notes||pe.label,oe=B.historyId?'<span class="km-pill">PSM</span>':"",ke=[];B.notes&&ke.push(g(pe.label)),B.mittel&&ke.push(g(B.mittel)),B.menge!=null&&ke.push(`${B.menge}${B.einheit?" "+g(B.einheit):""}`);const Re=ke.join(" · ");return`<div class="km-task${de?" done":""}" data-m-edit="${B.id}">
        <span class="km-task-ic" style="--mc:${pe.color}"><i class="bi ${pe.icon}"></i></span>
        <div class="km-task-main"><div class="km-task-title">${g(te)}${oe}</div>${Re?`<div class="km-task-sub">${Re}</div>`:""}</div>
        <span class="km-task-when${Y?" overdue":""}">${G}</span>
        ${de?`<button class="km-tbtn del" data-m-del="${B.id}" title="Löschen"><i class="bi bi-trash"></i></button>`:`<button class="km-check" data-m-done="${B.id}" title="Erledigt"><i class="bi bi-check-lg"></i></button>`}
      </div>`};let P="";return L.length?P+=L.map(B=>z(B,!1)).join(""):P+='<div class="km-tasks-none"><i class="bi bi-check2-circle"></i> Nichts offen</div>',O.length&&(P+='<div class="km-done-h">Erledigt</div>'+O.map(B=>z(B,!0)).join("")),`<div class="km-tasks">${P}</div>`}function Lt(x){const L=new Date(String(x).slice(0,10)+"T00:00:00");return isNaN(L.getTime())?0:Tn(L).week}function Dt(x){const L=new Date(String(x).slice(0,10)+"T00:00:00");return isNaN(L.getTime())?"":`${L.getDate()}. ${eu[L.getMonth()]}`}function en(x,L){if(!x)return"offen";const O=new Date(String(x).slice(0,10)+"T00:00:00");if(isNaN(O.getTime()))return"offen";const F=new Date;F.setHours(0,0,0,0);const z=Math.round((O.getTime()-F.getTime())/864e5);return z===0?"heute":z===1?"morgen":L?"überfällig":Dt(x)}function ut(x){if(!x||!x.weeks?.length)return x?.loading?"Wetter lädt…":"";const{year:L,week:O}=Tn(new Date),F=x.weeks.find(B=>B.year===L&&B.week===O)||x.weeks.find(B=>!B.isForecast);if(!F)return"";const z=F.tMaxAvg!=null?Math.round(F.tMaxAvg)+"°":"–",P=F.precipSum!=null?Math.round(F.precipSum)+" mm":"–";return`<i class="bi bi-cloud-sun"></i> Diese Woche: ${z} · ${P} Regen`}function tr(x){const L=x.ernteVon?Ea(Lt(x.ernteVon)):null,O=x.ernteBis||x.ernteDatum,F=O?Ea(Lt(O)):null;return L&&F?` · Ernte ${L}–${F}`:F?` · Ernte ~${F}`:L?` · Ernte ab ${L}`:""}function Ne(x){return!x||x.menge==null||x.menge===""?"":` · ${x.menge} ${x.einheit||"Pflanzen"}`}function $t(x,L){if(!x.length&&!L.length)return"";const O=new Date;let F=new Date(O.getFullYear(),O.getMonth()-1,1),z=new Date(O.getFullYear(),O.getMonth()+4,1);const P=H=>{if(!H)return;const ne=new Date(String(H).slice(0,10)+"T00:00:00");isNaN(ne.getTime())||(ne<F&&(F=new Date(ne.getFullYear(),ne.getMonth(),1)),ne>z&&(z=new Date(ne.getFullYear(),ne.getMonth(),1)))};x.forEach(H=>{P(H.pflanzDatum),P(H.ernteBis||H.ernteDatum),P(H.ernteVon)}),L.forEach(H=>P(H.planDatum||H.erledigtDatum));const B=mo(F,z),de=B.length,pe=`background-size:${(100/de).toFixed(4)}% 100%`,fe=H=>H==null?null:(H*100).toFixed(2)+"%",Y=We(B,O.toISOString()),G=Y!=null?`<div class="ks-today" style="left:${fe(Y)}"></div>`:"",te=B.map(H=>`<div class="ks-mo${H.y===O.getFullYear()&&H.m===O.getMonth()?" cur":""}">${fo[H.m]}</div>`).join("");let oe="";x.forEach((H,ne)=>{const ve=We(B,H.pflanzDatum);let he=We(B,H.ernteBis||H.ernteDatum||H.pflanzDatum);if(ve==null)return;(he==null||he<=ve)&&(he=Math.min(1,ve+.5/de));const we=fa(H,ne);oe+=`<div class="ks-bar${H.status==="geplant"?" planned":""}" style="left:${fe(ve)};width:${((he-ve)*100).toFixed(2)}%;--cc:${g(we)}"><span>${g(H.kultur||"")}</span></div>`;const W=We(B,H.ernteVon),se=We(B,H.ernteBis);W!=null&&se!=null&&se>W&&(oe+=`<div class="ks-harvest" style="left:${fe(W)};width:${((se-W)*100).toFixed(2)}%"></div>`)});const ke={};L.forEach(H=>{(ke[H.art]=ke[H.art]||[]).push(H)});const Re=Cd.filter(H=>ke[H]).map(H=>{const ne=Gn[H],ve=ke[H].map(he=>{const we=he.status==="erledigt"?he.erledigtDatum||he.planDatum:he.planDatum||he.erledigtDatum,W=We(B,we);return W==null?"":`<span class="ks-mk${he.status==="erledigt"?" done":""}" title="${g(ne.label+(he.notes?": "+he.notes:""))}" style="left:${fe(W)};--mc:${ne.color}"></span>`}).join("");return`<div class="ks-row"><div class="ks-rl">${g(ne.label)}</div><div class="ks-track" style="${pe}">${ve}${G}</div></div>`}).join("");return`<div class="ks-wrap">
      <div class="ks-head"><div class="ks-rl"></div><div class="ks-axis">${te}</div></div>
      <div class="ks-row"><div class="ks-rl">Kultur</div><div class="ks-track" style="${pe}">${oe}${G}</div></div>
      ${Re}
      <div class="ks-legend"><span><span class="ks-d done"></span>erledigt</span><span><span class="ks-d"></span>geplant</span><span style="margin-left:auto"><span class="ks-hbar"></span>Ernte-Zeitraum</span></div>
    </div>`}function va(x){Ze("app",L=>({...L,activeSection:"acker"})),T.info("Karte geöffnet.")}async function tn(){if(!U()){T.warning("Keine Datenbank aktiv.");return}try{const x=await Li();await D(),J(),x?.imported?(T.success(`${x.imported} übernommen.`),K()):T.info(`Nichts Neues${x?.skipped?` (${x.skipped} nicht zuordenbar)`:""}.`)}catch{T.error("Übernahme fehlgeschlagen.")}}async function ar(x){const L=r.find(O=>O.id===x);if(L)try{await $i({...L,status:"erledigt",erledigtDatum:L.erledigtDatum||it()}),await D(),J(),K()}catch{T.error("Speichern fehlgeschlagen.")}}async function an(x){try{await Di({id:x}),await D(),J(),K()}catch{T.error("Löschen fehlgeschlagen.")}}let Se=null;const zt=()=>{Se&&(Se.remove(),Se=null,document.removeEventListener("pointerdown",Yt,!0))},Yt=x=>{Se&&!Se.contains(x.target)&&zt()};function nn(x,L,O,F){if(zt(),Se=document.createElement("div"),Se.className="km-ctx",F){const P=document.createElement("div");P.className="km-ctx-t",P.textContent=F,Se.appendChild(P)}O.forEach(P=>{if(P.sep){const de=document.createElement("div");de.className="km-ctx-sep",Se.appendChild(de);return}const B=document.createElement("button");B.className="km-ctx-i",B.innerHTML=`<i class="bi ${P.icon}"></i><span>${g(P.label)}</span>`,B.addEventListener("click",()=>{zt(),P.action?.()}),Se.appendChild(B)}),document.body.appendChild(Se);const z=Se.getBoundingClientRect();Se.style.left=Math.max(8,Math.min(x,window.innerWidth-z.width-8))+"px",Se.style.top=Math.max(8,Math.min(L,window.innerHeight-z.height-8))+"px",setTimeout(()=>document.addEventListener("pointerdown",Yt,!0),0)}function ya(x,L,O){const F=N(x);if(!F)return;const z=be(n,F),{current:P}=sa(z);nn(L,O,[{icon:"bi-flower2",label:P?"Kultur bearbeiten":"Kultur setzen",action:()=>Xt(F,P,"current",z.length)},{icon:"bi-plus-lg",label:"Nächste Kultur planen",action:()=>Xt(F,null,"next",z.length)},{icon:"bi-list-check",label:"Aufgabe planen",action:()=>xa(F,null,P)},{sep:!0},{icon:"bi-arrow-right-circle",label:"Fläche öffnen",action:()=>{o=x,ie("flaechen"),A()}},{icon:"bi-map",label:"Auf Karte",action:()=>va()}],F.name)}function Qe(){v&&(v.remove(),v=null)}function rn(x,L,O,F){Qe();const z=document.createElement("div");return z.className="kmodal-ov",z.innerHTML=`<div class="kmodal" role="dialog" aria-modal="true">
      <div class="kmodal-h"><span>${g(x)}</span><button class="kmodal-x" aria-label="Schließen"><i class="bi bi-x-lg"></i></button></div>
      <div class="kmodal-b">${L}</div>
      <div class="kmodal-f"><button class="btn-cancel" data-k="cancel">Abbrechen</button><button class="btn-save" data-k="save">${g(O)}</button></div></div>`,e.appendChild(z),v=z,z.querySelector(".kmodal-x").addEventListener("click",Qe),z.querySelector('[data-k="cancel"]').addEventListener("click",Qe),z.addEventListener("mousedown",P=>{P.target===z&&Qe()}),z.querySelector('[data-k="save"]').addEventListener("click",()=>{F(z)!==!1&&Qe()}),z.querySelectorAll("[data-more]").forEach(P=>P.addEventListener("click",()=>{const B=z.querySelector("[data-more-box]");B&&(B.hidden=!1,P.style.display="none")})),setTimeout(()=>z.querySelector("input,select,textarea,.km-tile")?.focus?.(),30),z}function nr(){const x=new Set,L=[],O=z=>{const P=String(z||"").trim().toLowerCase();z&&!x.has(P)&&(x.add(P),L.push(z))};return l.forEach(z=>O(z.name)),s.forEach(z=>O(z.kultur)),`<datalist id="km-kultur-dl">${L.map(z=>`<option value="${g(z)}"></option>`).join("")}</datalist>`}function Xt(x,L,O,F){const z=O==="next"&&!L,P=L||{},B=(P.kulturStammId?l.find(W=>W.id===P.kulturStammId):null)||kn(l,P.kultur),de=P.pflanzDatum?.slice(0,10)||(z?"":it()),pe=jt.map(W=>`<button type="button" class="km-sw${(P.color||"")===W?" on":""}" data-col="${W}" style="background:${W}"></button>`).join(""),fe=Fd.map(W=>`<option value="${g(W)}"${(P.einheit||"Pflanzen")===W?" selected":""}>${g(W)}</option>`).join(""),Y=`
      <label class="km-fld big">Was wächst hier?<input list="km-kultur-dl" data-f="kultur" value="${g(P.kultur||"")}" placeholder="z. B. Tomate – aus Bibliothek wählen" autocomplete="off" /></label>${nr()}
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
        <label class="km-fld">${z?"Geplante Pflanzung":"Pflanzung"}<input type="date" data-f="pflanz" value="${de}" /></label>
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
        <label class="km-fld">Status<select data-f="status">${["aktiv","geplant","abgeschlossen"].map(W=>`<option value="${W}"${(P.status||(z?"geplant":"aktiv"))===W?" selected":""}>${Id[W].label}</option>`).join("")}</select></label>
        <div class="km-fld">Farbe<div class="km-sws">${pe}</div></div>
        <label class="km-fld">Notiz<textarea data-f="notes" rows="2" placeholder="optional">${g(P.notes||"")}</textarea></label>
      </div>
      ${L?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Satz löschen</button>':""}`,G=rn(L?"Satz bearbeiten":z?"Nächsten Satz planen":"Satz eintragen",Y,"Speichern",W=>{const se=Pt=>W.querySelector(`[data-f="${Pt}"]`)?.value?.trim()||"",Ae=se("kultur");if(!Ae)return T.warning("Bitte eine Kultur angeben."),!1;const ea=kn(l,Ae),sn=se("aussaat")||null,At=se("pflanz")||null,pt=se("ernteVon")||null,ue=se("ernteBis")||null,Ke=se("menge"),ft=Ke?Number(Ke):null,on=W.querySelector('[data-f="einheit"]')?.value||null,ln=!W.querySelector("[data-more-box]").hidden;let nt=ln?se("status"):"";nt||(nt=z||At&&De(At)>Number(it().replace(/-/g,""))?"geplant":"aktiv");const rr=W.querySelector(".km-sw.on")?.dataset.col||P.color||ea?.color||jt[F%jt.length],dn=s.find(Pt=>Pt.kultur===Ae)?.eppoCode||ea?.eppoCode||null,un=ln?se("notes")||null:P.notes||null,ka={flaecheTyp:x.typ,flaecheId:x.id,kultur:Ae,eppoCode:dn,color:rr,menge:ft,einheit:on,kulturStammId:ea?.id||P.kulturStammId||null,notes:un},ta=!L&&W.querySelector('[data-f="succOn"]')?.checked,wa=Math.max(2,Math.min(20,Number(W.querySelector('[data-f="succN"]')?.value)||2)),ir=Math.max(1,Number(W.querySelector('[data-f="succGap"]')?.value)||14),sr=Number(it().replace(/-/g,""));(async()=>{try{if(ta){const Pt="sg-"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),or={aussaatDatum:sn,pflanzDatum:At,ernteVon:pt,ernteBis:ue};for(let i=0;i<wa;i++){const c=qd(or,i*ir),p=c.pflanzDatum&&De(c.pflanzDatum)>sr?"geplant":nt;await zi({...ka,...c,ernteDatum:null,status:p,satzGruppe:Pt})}T.success(`${wa} Sätze angelegt.`)}else await zi({id:L?.id,...ka,aussaatDatum:sn,pflanzDatum:At,ernteVon:pt,ernteBis:ue,ernteDatum:null,status:nt,satzGruppe:P.satzGruppe||null});await D(),J(),K()}catch{T.error("Speichern fehlgeschlagen.")}})()});let te="pflanz";const oe=W=>G.querySelector(`[data-f="${W}"]`),ke=G.querySelector("[data-anchor-row]"),Re=G.querySelector("[data-stammhint]");let H=B;const ne=()=>{if(!H){Re.hidden=!0,ke.style.opacity="0.45";return}ke.style.opacity="1";const se=[Nd[H.anbauMethode==="anzucht"?"anzucht":"direkt"].short];H.kulturTage&&se.push(`${H.kulturTage} T. Kultur`),H.anbauMethode==="anzucht"&&H.anzuchtTage&&se.push(`${H.anzuchtTage} T. Anzucht`),H.familie&&se.push(H.familie),Re.innerHTML=`<i class="bi bi-stars"></i> <b>Bibliothek:</b> ${g(se.join(" · "))}`,Re.hidden=!1},ve=()=>{if(!H)return;const se=oe(te==="ernte"?"ernteVon":te).value||it(),Ae=Td(H,te,se);Ae.aussaatDatum!=null&&(oe("aussaat").value=Ae.aussaatDatum||""),Ae.pflanzDatum!=null&&(oe("pflanz").value=Ae.pflanzDatum||""),Ae.ernteVon!=null&&(oe("ernteVon").value=Ae.ernteVon||""),Ae.ernteBis!=null&&(oe("ernteBis").value=Ae.ernteBis||"")},he=oe("kultur");he.addEventListener("input",()=>{H=kn(l,he.value),ne()}),he.addEventListener("change",()=>{H=kn(l,he.value),ne(),H&&(oe("pflanz").value||(oe("pflanz").value=it()),ve())}),G.querySelectorAll("[data-anchor]").forEach(W=>W.addEventListener("click",()=>{G.querySelectorAll("[data-anchorseg] .km-segb").forEach(se=>se.classList.remove("on")),W.classList.add("on"),te=W.dataset.anchor,ve()})),["aussaat","pflanz","ernteVon"].forEach(W=>oe(W)?.addEventListener("change",()=>{W===(te==="ernte"?"ernteVon":te)&&ve()})),ne();const we=G.querySelector('[data-f="succOn"]');we?.addEventListener("change",()=>{G.querySelector("[data-succ-box]").hidden=!we.checked}),G.querySelectorAll(".km-sw").forEach(W=>W.addEventListener("click",()=>{G.querySelectorAll(".km-sw").forEach(se=>se.classList.remove("on")),W.classList.add("on")})),G.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(L?.id)try{await rl({id:L.id}),await D(),J(),K(),Qe()}catch{T.error("Löschen fehlgeschlagen.")}})}function xa(x,L,O){const F=L||{art:"bewaesserung",status:"geplant"},z=Xd.map(Y=>`<button type="button" class="km-tile${(F.art||"bewaesserung")===Y.art?" on":""}" data-art="${Y.art}" style="--ac:${Gn[Y.art].color}"><i class="bi ${Y.icon}"></i><span>${g(Y.label)}</span></button>`).join(""),P=(F.status||"geplant")==="erledigt",B=(P?F.erledigtDatum:F.planDatum)||it(),de=`
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
        <label class="km-fld">Bezeichnung<input data-f="notes" value="${g(F.notes||"")}" placeholder="z. B. Kompostgabe" /></label>
        <div class="km-frow2">
          <label class="km-fld">Menge<input type="number" step="0.1" data-f="menge" value="${F.menge!=null?F.menge:""}" placeholder="optional" /></label>
          <label class="km-fld">Einheit<input data-f="einheit" value="${g(F.einheit||"")}" placeholder="kg/ha, l" /></label>
        </div>
        <label class="km-fld">Mittel<input data-f="mittel" value="${g(F.mittel||"")}" placeholder="optional" /></label>
      </div>
      ${L?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Aufgabe löschen</button>':""}`,pe=rn(L?"Aufgabe bearbeiten":"Aufgabe hinzufügen",de,"Speichern",Y=>{const G=Y.querySelector(".km-tile.on")?.dataset.art||"bewaesserung",te=Y.querySelector(".km-segb.on")?.dataset.status||"geplant",oe=Y.querySelector('[data-f="datum"]').value||it(),ke=!Y.querySelector("[data-more-box]").hidden,Re=ne=>{const ve=Y.querySelector(`[data-f="${ne}"]`)?.value;return ve?Number(ve):null},H=ne=>Y.querySelector(`[data-f="${ne}"]`)?.value.trim()||null;(async()=>{try{await $i({id:L?.id,flaecheTyp:x.typ,flaecheId:x.id,anbauId:L?.anbauId||O?.id||null,art:G,status:te,planDatum:te==="geplant"?oe:L?.planDatum||null,erledigtDatum:te==="erledigt"?oe:null,menge:ke?Re("menge"):L?.menge??null,einheit:ke?H("einheit"):L?.einheit||null,mittel:ke?H("mittel"):L?.mittel||null,historyId:L?.historyId||null,notes:ke?H("notes"):L?.notes||null}),await D(),J(),K()}catch{T.error("Speichern fehlgeschlagen.")}})()});pe.querySelectorAll(".km-tile").forEach(Y=>Y.addEventListener("click",()=>{pe.querySelectorAll(".km-tile").forEach(G=>G.classList.remove("on")),Y.classList.add("on")})),pe.querySelectorAll(".km-segb").forEach(Y=>Y.addEventListener("click",()=>{pe.querySelectorAll(".km-segb").forEach(G=>G.classList.remove("on")),Y.classList.add("on")}));const fe=pe.querySelector('[data-f="datum"]');pe.querySelectorAll("[data-day]").forEach(Y=>Y.addEventListener("click",()=>{const G=Y.dataset.day;if(G==="x"){fe.style.display="inline-block",fe.showPicker?.();return}const te=new Date;te.setDate(te.getDate()+Number(G)),fe.value=te.toISOString().slice(0,10),fe.style.display="none"})),pe.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(L?.id)try{await Di({id:L.id}),await D(),J(),K(),Qe()}catch{T.error("Löschen fehlgeschlagen.")}})}e.querySelectorAll(".km-modebtn").forEach(x=>x.addEventListener("click",()=>ie(x.dataset.mode))),document.addEventListener("keydown",x=>{x.key==="Escape"&&(v&&Qe(),zt())}),window.addEventListener("psm:openKultur",x=>{const L=x?.detail;!L?.typ||!L?.id||(o=L.typ+":"+L.id,ie("flaechen"),f&&(dt(),Be(),A()))}),t.state.subscribe(x=>{x?.app?.activeSection==="kultur"&&(f?(async()=>(a=await bs(t),J(),A()))():(f=!0,q()))}),ee()}function au(){return`
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
  </section>`}const nu=["pflanzenschutz.json","history.json","entries.json"];let hs=!1,R=null,St=!1;const Zt=25,Lr=new Intl.NumberFormat("de-DE");let $e=0,Sn=null,vs=null;const ru=Gs({id:"import",label:"Import-Vorschau",budget:{initialLoad:20,maxItems:50}});let Ur=null;function iu(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function su(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function ou(e,t){const a=e.querySelector('[data-role="import-log-list"]');if(a){if(!t.length){a.innerHTML='<tr><td colspan="5" class="text-muted small">Noch keine Importe protokolliert.</td></tr>';return}a.innerHTML=t.map(n=>{const r=n.rangeStart||n.rangeEnd?`${Ra(n.rangeStart)||n.rangeStart||"?"} – ${Ra(n.rangeEnd)||n.rangeEnd||"?"}`:"-",s=[n.source,n.device].filter(Boolean),l=s.length?g(s.join(" · ")):"-";return`
        <tr>
          <td>${g(su(n.importedAt))}</td>
          <td>${l}</td>
          <td class="text-end text-success">${n.added}</td>
          <td class="text-end text-muted">${n.skipped}</td>
          <td class="small text-muted">${g(r)}</td>
        </tr>`}).join("")}}async function In(e){if(ce()==="sqlite")try{const t=await il(50);ou(e,t.items||[])}catch(t){console.warn("Import-Historie konnte nicht geladen werden",t)}}function Et(e,t,a="info"){const n=e.querySelector('[data-role="import-hint"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a} small mt-3`,n.textContent=t}}function Gt(e,t){const a=e.querySelector('[data-role="import-feedback"]');a&&(a.textContent=t)}function Ht(e){const t=e.querySelector('[data-action="clear-import"]'),a=e.querySelector('[data-action="focus-import"]'),n=e.querySelector('[data-action="run-import"]'),r=!!R;if(t&&(t.disabled=!r||St),a&&(a.disabled=!r||St),n){const s=!!(R?.importableEntries?.length&&R.stats||R?.fotos?.length);n.disabled=!r||!s||St}}function lu(e){R=null,hu(e);const t=e.querySelector('[data-role="import-summary-card"]'),a=e.querySelector('[data-role="import-file"]');t&&t.classList.add("d-none"),a&&(a.value=""),Gt(e,""),Et(e,"Bereit für eine neue Importdatei."),Ht(e),oa()}function go(e){if(e.dateIso)return e.dateIso;if(e.datum){const t=new Date(e.datum);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.date){const t=new Date(e.date);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.savedAt){const t=new Date(e.savedAt);if(!Number.isNaN(t.getTime()))return t.toISOString()}return null}function Un(e){return e?Ra(e)||e.slice(0,10):"-"}function bo(e){return e.savedAt||(e.savedAt=e.createdAt||e.dateIso||new Date().toISOString()),e}function ys(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function cu(e){if(!e||typeof e!="object")return null;const t={...e};if(!Array.isArray(t.items)){const a=e.items;t.items=Array.isArray(a)?[...a]:[]}return bo(t),t}function ho(e,t){const a=e.map(n=>go(n)).filter(n=>!!n).sort();return{startIso:a[0]||t?.filters?.startDate||null,endIso:a[a.length-1]||t?.filters?.endDate||null}}function du(e){if(!e)return;const t=ys(e.startIso,"start"),a=ys(e.endIso,"end");if(!t&&!a)return;const n={};return t&&(n.startDate=t),a&&(n.endDate=a),n}async function vo(e,t){if(ce()!=="sqlite"){const o=Ge(e.history);return new Set(o.map(d=>Vn(d)).filter(d=>!!d))}const n=du(t);if(!n)return new Set;const r=new Set;let s=1;const l=500;try{for(;;){const o=await Ns({page:s,pageSize:l,filters:n,sortDirection:"asc"});if(o.items.forEach(d=>{const f=Vn(d);f&&r.add(f)}),s*l>=o.totalCount)break;s+=1}}catch(o){return console.warn("Konnte vorhandene Einträge für Duplikatprüfung nicht laden",o),new Set}return r}function Vn(e){const t=typeof e.clientUuid=="string"&&e.clientUuid?e.clientUuid:"";if(t)return`uuid:${t}`;const a=e.savedAt||e.dateIso||e.createdAt||e.datum||"",n=e.ersteller||"",r=e.kultur||"",s=e.invekos||e.standort||"";return[a,n,r,s].join("|")}function uu(e,t,a,n){const r=n||ho(e,a),s=r.startIso,l=r.endIso,o=new Set,d=new Set;return t.forEach(f=>{f.ersteller&&o.add(f.ersteller),f.kultur&&d.add(f.kultur)}),{startDateLabel:Un(s),endDateLabel:Un(l),startDateRaw:s,endDateRaw:l,entryCount:e.length,importableCount:t.length,duplicateCount:e.length-t.length,creators:Array.from(o).slice(0,5),crops:Array.from(d).slice(0,5)}}function pu(e,t){const a=e.querySelector('[data-role="import-stats"]');if(!a)return;if(!t){a.innerHTML="";return}const n=t.stats,r=t.metadata?.filters;a.innerHTML=`
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
  `}function fu(e,t){const a=e.querySelector('[data-role="import-warnings"]');if(!a)return;if(!t||!t.warnings.length){a.innerHTML="";return}const n=t.warnings.map(r=>`<li>${g(r)}</li>`).join("");a.innerHTML=`
    <div class="alert alert-warning">
      <strong>Hinweise:</strong>
      <ul class="mb-0">${n}</ul>
    </div>
  `}function yo(e){const t=e.entries.length;if(!t)return $e=0,{start:0,end:0,total:0};const a=Math.max(Math.ceil(t/Zt),1);$e>=a&&($e=a-1),$e<0&&($e=0);const n=$e*Zt,r=Math.min(n+Zt,t);return{start:n,end:r,total:t}}function mu(e){const t=e.querySelector('[data-role="import-pager"]');return t?((!Sn||vs!==t)&&(Sn?.destroy(),Sn=Ja(t,{onPrev:()=>gu(e),onNext:()=>bu(e),labels:{prev:"Zurück",next:"Weiter",loading:"Vorschau wird geladen...",empty:"Keine Einträge verfügbar"}}),vs=t),Sn):null}function _a(e,t){const a=mu(e);if(!a)return;if(!t){$e=0,a.update({status:"hidden"});return}const n=t.entries.length;if(!n){$e=0,a.update({status:"disabled",info:"Keine Einträge vorhanden."});return}const{start:r,end:s}=yo(t),l=`Einträge ${Lr.format(r+1)}–${Lr.format(s)} von ${Lr.format(n)}`;a.update({status:"ready",info:l,canPrev:$e>0,canNext:s<n})}function gu(e){!R||$e===0||($e=Math.max($e-1,0),mi(e,R))}function bu(e){if(!R)return;const t=R.entries.length;if(!t)return;const a=Math.max(Math.ceil(t/Zt)-1,0);$e>=a||($e=Math.min($e+1,a),mi(e,R))}function hu(e){$e=0,e&&_a(e,R)}function mi(e,t){const a=e.querySelector('[data-role="import-preview-table"]');if(!a){oa();return}if(!t){a.innerHTML="",_a(e,null),oa();return}if(!t.entries.length){a.innerHTML='<tr><td colspan="5" class="text-center text-muted">Keine Einträge</td></tr>',_a(e,t),oa();return}const{start:r,end:s}=yo(t),o=t.entries.slice(r,s).map(d=>{const f=Un(go(d));return`
        <tr>
          <td>${g(f)}</td>
          <td>${g(d.kultur||"-")}</td>
          <td>${g(d.ersteller||"-")}</td>
          <td>${g(d.standort||d.invekos||"-")}</td>
          <td>${g(d.savedAt?Un(d.savedAt):"-")}</td>
        </tr>
      `}).join("");a.innerHTML=o,_a(e,t),oa()}async function vu(e){const t=ll(e),a=Object.keys(t),n=a.find(f=>nu.some(u=>f.toLowerCase().endsWith(u)));if(!n)throw new Error("ZIP enthält keine 'pflanzenschutz.json'.");const r=JSON.parse($r(t[n])),s=a.find(f=>f.toLowerCase().endsWith("metadata.json")),l=s?JSON.parse($r(t[s])):null,o=Array.isArray(r)?r:Array.isArray(r.entries)?r.entries:Array.isArray(r.history)?r.history:[],d=Array.isArray(r?.fotos)?r.fotos:[];for(const f of d){if(f?.data)continue;const u=f?.file?String(f.file):null,m=u?a.find(v=>v===u||v.toLowerCase().endsWith(u.toLowerCase())):null;m&&t[m]&&(f.data=yu(t[m]),f.mime||(f.mime="image/jpeg"))}return{entries:o,metadata:l,fotos:d}}function yu(e){let t="";for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode(...e.subarray(n,n+32768));return btoa(t)}async function xu(e){const t=$r(e),a=JSON.parse(t);if(Array.isArray(a))return{entries:a,metadata:null,fotos:[]};const n=Array.isArray(a.fotos)?a.fotos:[];if(Array.isArray(a.entries))return{entries:a.entries,metadata:a.metadata||null,fotos:n};if(Array.isArray(a.history))return{entries:a.history,metadata:a.metadata||null,fotos:n};if(n.length)return{entries:[],metadata:a.metadata||null,fotos:n};throw new Error("JSON enthält keine Eintragsliste.")}async function ku(e,t){const a=new Uint8Array(await e.arrayBuffer()),n=/\.zip$/i.test(e.name)||e.type==="application/zip",{entries:r,metadata:s,fotos:l}=n?await vu(a):await xu(a),o=Array.isArray(l)?l:[],d=(Array.isArray(r)?r:[]).map(w=>cu(w)).filter(w=>!!w);if(!d.length&&!o.length)throw new Error("Die Datei enthielt keine verwertbaren Einträge.");const f=ho(d,s),u=await vo(t,f),m=new Set,v=[];let k=0;d.forEach(w=>{const E=Vn(w);if(!E){v.push(w);return}if(u.has(E)||m.has(E)){k+=1;return}m.add(E),v.push(w)});const h=uu(d,v,s,f),S=[];return k&&S.push(`${k} Datensätze wurden wegen gleicher Kennung übersprungen.`),(!h.startDateRaw||!h.endDateRaw)&&S.push("Zeitraum konnte nicht eindeutig ermittelt werden."),{filename:e.name,entries:d,importableEntries:v,metadata:s,stats:h,warnings:S,lastImportRefs:[],fotos:o}}function xs(){if(!R)return"Keine Datei";const e=[];return St&&e.push("Verarbeitung"),R.warnings.length&&e.push("Warnungen"),R.stats.importableCount<R.stats.entryCount&&e.push("Duplikate entfernt"),e.length?e.join(" · "):void 0}function wu(){const e=!!R,t=e?Math.max(Math.ceil((R?.entries.length||0)/Zt),1):null,a=e?{items:R?.entries.length??0,totalCount:R?.stats.entryCount??null,cursor:R&&(R.entries.length||0)>Zt?`Seite ${$e+1}${t?` / ${t}`:""}`:null,payloadKb:Vs(R?.entries.slice(0,Zt)),lastUpdated:Ur,note:xs()}:{items:0,totalCount:0,cursor:null,payloadKb:0,lastUpdated:Ur,note:xs()};Us(ru,a)}function oa(){Ur=new Date().toISOString(),wu()}function Vr(e){const t=e.querySelector('[data-role="import-summary-card"]');if(!t)return;if(!R){t.classList.add("d-none"),_a(e,null),Ht(e),oa();return}t.classList.remove("d-none"),$e=0;const a=t.querySelector('[data-role="import-file-name"]'),n=t.querySelector('[data-role="import-summary-subline"]');a&&(a.textContent=R.filename),n&&(n.textContent=`${R.stats.importableCount} von ${R.stats.entryCount} Einträgen importierbar`),pu(e,R),fu(e,R),mi(e,R),Ht(e)}async function Su(){const e=ce();if(!e||e==="memory"||e==="sqlite")return;const t=Ye();await Xe(t)}function ks(e,t){if(!t.length)return[];const a=typeof e.state.updateSlice=="function"?e.state.updateSlice:Ze,n=[];return a("history",r=>{const s=Za(r),l=s.items.slice(),o=l.length;return t.forEach((d,f)=>{n.push(o+f),l.push(d)}),{...s,items:l,totalCount:l.length,lastUpdatedAt:new Date().toISOString()}}),n}async function Eu(e,t){if(!R){window.alert("Bitte zuerst eine Importdatei laden.");return}const a=R.fotos||[];if(!R.importableEntries.length&&!a.length){window.alert("Alle Einträge wurden bereits importiert oder als Duplikat erkannt.");return}St=!0,Ht(e),Gt(e,"Import läuft ...");const n=t.state.getState(),r={startIso:R.stats.startDateRaw,endIso:R.stats.endDateRaw};let s=new Set;try{s=await vo(n,r)}catch(S){console.warn("Duplikatprüfung vor Import fehlgeschlagen",S)}const l=new Set(s),o=[];let d=0;if(R.importableEntries.forEach(S=>{const w=Vn(S);if(w&&l.has(w)){d+=1;return}w&&l.add(w),o.push(S)}),!o.length&&!a.length){Gt(e,"Keine neuen Einträge gefunden."),Et(e,"Alle Datensätze sind bereits importiert worden.","warning"),St=!1,Ht(e);return}const f=ce(),u=[],m=[];let v=0,k=0;const h=o.map(S=>bo({...S}));try{if(f==="sqlite"){const M=[];for(const U of h)try{const K=await Es(U);if(K?.duplicate){d+=1;continue}K?.id!=null&&(u.push({source:"sqlite",ref:K.id}),M.push(U))}catch(K){console.error("appendHistoryEntry failed",K),m.push(U.savedAt||"Unbekannter Eintrag")}ks(t,M);for(const U of a)try{(await sl(U))?.duplicate?k+=1:v+=1}catch(K){console.error("appendFoto failed",K)}v&&window.dispatchEvent(new CustomEvent("fotos:changed"));try{await tt()}catch(U){console.warn("SQLite-Datei konnte nach dem Import nicht gespeichert werden",U)}}else ks(t,h).forEach(U=>{u.push({source:"state",ref:U})}),await Su();const S=u.length;if(S||v){f==="sqlite"&&S&&t.events?.emit?.("history:data-changed",{type:"created-bulk",count:S});const M=[];S&&M.push(`${S} Einträge`),v&&M.push(`${v} Foto(s)`),Gt(e,`${M.join(" und ")} importiert.${m.length?` ${m.length} Einträge konnten nicht übernommen werden.`:""}`.trim()),R.lastImportRefs=u,R.importableEntries=[],R.stats={...R.stats,importableCount:0},Vr(e)}else Gt(e,"Keine neuen Daten importiert.");const w=[];let E="success";if(m.length&&(w.push(`${m.length} Einträge konnten nicht gespeichert werden. Details siehe Konsole.`),E="warning"),d&&(w.push(`${d} Einträge wurden während des Imports als Duplikat übersprungen.`),E="warning"),k&&w.push(`${k} Foto(s) waren bereits vorhanden (übersprungen).`),w.length||w.push("Import abgeschlossen."),Et(e,w.join(" "),E),f==="sqlite"&&(S||d||v||k))try{const M=[];m.length&&M.push(`${m.length} fehlgeschlagen`),v&&M.push(`${v} Fotos`),k&&M.push(`${k} Fotos doppelt`),await ol({source:R.filename||null,device:R.metadata?.device||R.metadata?.label||null,added:S,skipped:d,rangeStart:R.stats.startDateRaw,rangeEnd:R.stats.endDateRaw,note:M.length?M.join(", "):null}),await tt().catch(()=>{}),await In(e)}catch(M){console.warn("Import-Historie konnte nicht geschrieben werden",M)}}catch(S){console.error("Import fehlgeschlagen",S),Gt(e,"Import fehlgeschlagen. Siehe Konsole für Details."),Et(e,"Import fehlgeschlagen. Bitte erneut versuchen.","danger")}finally{St=!1,Ht(e)}}function Lu(e,t,a){if(!e.events?.emit)return;const n=t.metadata?.label||t.metadata?.filters?.label||`Import ${t.filename}`;e.events.emit("documentation:focus-range",{startDate:t.stats.startDateRaw||void 0,endDate:t.stats.endDateRaw||void 0,label:n,reason:"import",entryIds:a,autoSelectFirst:!!a.length})}function Du(e,t){if(!R){window.alert("Bitte zuerst eine Importdatei laden.");return}if(!R.stats.startDateRaw||!R.stats.endDateRaw){window.alert("Zeitraum konnte nicht bestimmt werden.");return}Lu(t,R,R.lastImportRefs),Et(e,"Dokumentation wurde auf den Importzeitraum fokussiert.")}function $u(e,t){const a=e.querySelector('[data-role="import-file"]');a&&a.addEventListener("change",()=>{const n=a.files?.[0];n&&(St=!0,Et(e,"Datei wird analysiert ..."),Ht(e),Gt(e,""),ku(n,t.state.getState()).then(r=>{R=r,Vr(e),Et(e,`${r.importableEntries.length} Einträge bereit zum Import.`)}).catch(r=>{console.error("Importdatei konnte nicht gelesen werden",r),Et(e,r?.message||"Importdatei konnte nicht gelesen werden.","danger"),R=null,Vr(e)}).finally(()=>{St=!1,Ht(e)}))}),e.addEventListener("click",n=>{const r=n.target?.closest("[data-action]");if(!r)return;const s=r.dataset.action;if(s){if(s==="clear-import"){lu(e);return}if(s==="focus-import"){Du(e,t);return}s==="run-import"&&Eu(e,t)}})}function zu(e,t){if(!e||hs)return;const a=e;a.innerHTML="";const n=iu();a.appendChild(n),$u(n,t),Et(n,"Wähle eine Datei aus, um den Import zu starten."),In(n),lt("database:connected",()=>void In(n)),lt("app:sectionChanged",r=>{(r==="daten"||r==="documentation"||r==="import")&&In(n)}),hs=!0}const Wt=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function Au(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function na(e,t,a,n){return`
    <div class="dash-card"${n?` data-goto="${n}" style="cursor:pointer;"`:""}>
      <div class="dash-card-ic"><i class="bi ${e}"></i></div>
      <div class="dash-card-body"><div class="dash-card-value">${a}</div><div class="dash-card-label">${g(t)}</div></div>
    </div>`}function Pu(){return`
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
  </section>`}function Mu(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Pu();const a=e.querySelector('[data-role="dash-cards"]'),n=e.querySelector('[data-role="dash-warn"]'),r=e.querySelector('[data-role="dash-recent"]');e.addEventListener("click",l=>{const o=l.target?.closest("[data-goto]");if(!o)return;const d=o.getAttribute("data-goto");d&&t.state.updateSlice("app",f=>({...f,activeSection:d}))});const s=async()=>{if(ce()!=="sqlite"){a&&(a.innerHTML='<div class="dash-empty">Bitte zuerst eine Datenbank öffnen.</div>');return}const l=t.state.getState(),o=(Ge(l.gps?.points)||[]).length;let d=0,f=0,u=0,m=0,v=[],k=[],h=0;try{d=(await Zr())?.rows?.length||0}catch{}try{f=(await Bs())?.rows?.length||0}catch{}try{const S=(await Qr())?.rows||[];u=S.length,m=S.reduce((w,E)=>w+(E.plants||0),0)}catch{}try{v=(await Is())?.rows||[]}catch{}try{const S=await Ns({}),w=S?.entries||S?.rows||[];h=S?.totalCount??w.length,k=w.slice(0,6)}catch{}if(a&&(a.innerHTML=[na("bi-geo-alt","Standorte",Wt(o)),na("bi-flower1","Kulturen",Wt(d)),na("bi-droplet","Mittel im Sortiment",Wt(f),"lager"),na("bi-journal-check","Anwendungen",Wt(h),"documentation"),na("bi-map","Acker-Flächen",Wt(u),"acker"),na("bi-flower3","Pflanzen (Acker)",Wt(m),"acker")].join("")),n){const S=[];v.forEach(E=>{E.bestand<=0&&(E.verbraucht>0||E.zugang>0)&&S.push(`<div class="dash-row"><span><i class="bi bi-box-seam me-1" style="color:#ef4444"></i>${g(E.name)}</span><span style="color:#ef4444">Bestand ${Wt(E.bestand)} ${g(E.einheit||"")}</span></div>`)}),v.forEach(E=>{if(!E.zulEnde)return;const M=Math.round((new Date(E.zulEnde).getTime()-Date.now())/864e5);M<0?S.push(`<div class="dash-row"><span><i class="bi bi-calendar-x me-1" style="color:#ef4444"></i>${g(E.name)}</span><span style="color:#ef4444">Zulassung abgelaufen</span></div>`):M<180&&S.push(`<div class="dash-row"><span><i class="bi bi-calendar-event me-1" style="color:#f59e0b"></i>${g(E.name)}</span><span style="color:#f59e0b">Zulassung endet in ${M} T</span></div>`)});const w=S.length>6?`<div class="dash-row" style="color:var(--color-text-muted)"><span>+ ${S.length-6} weitere</span></div>`:"";n.innerHTML=S.length?S.slice(0,6).join("")+w:'<div class="dash-empty">Alles im grünen Bereich. ✓</div>'}r&&(r.innerHTML=k.length?k.map(S=>{const w=Au(S.datum||S.dateIso||S.created_at||S.createdAt||null),E=S.kultur||"",M=S.standort||"";return`<div class="dash-row"><span>${g(M)}${E?" · "+g(E):""}</span><span class="dash-empty" style="padding:0">${g(w)}</span></div>`}).join(""):'<div class="dash-empty">Noch keine Anwendungen erfasst.</div>')};t.state.subscribe(l=>{l?.app?.activeSection==="dashboard"&&s()}),s()}function ws(e){document.querySelectorAll(".content-section").forEach(a=>{a.style.display="none"});const t=document.getElementById(`section-${e}`);t instanceof HTMLElement&&(t.style.display="block")}function Ss(){cl(),Ds();const e={state:{getState:j,updateSlice:Ze,subscribe:Nn},events:{emit:(w,E)=>{Ft(async()=>{const{emit:M}=await import("./index.DeI7WYb5.js").then(U=>U.aS);return{emit:M}},[]).then(({emit:M})=>{M(w,E)})},subscribe:lt}},t=document.querySelector('[data-region="startup"]'),a=document.querySelector('[data-region="shell"]'),n=document.querySelector('[data-region="main"]'),r=document.querySelector('[data-region="footer"]');Ol(t,e);const s=document.querySelector('[data-feature="calculation"]');dl(s,e);const l=document.querySelector('[data-feature="documentation"]');Fc(l,e);const o=document.querySelector('[data-feature="settings"]');zd(o,e);const d=document.querySelector('[data-feature="lager"]');Md(d,e);const f=document.querySelector('[data-feature="acker"]');Od(f,e);const u=document.querySelector('[data-feature="kultur"]');tu(u,e);const m=document.querySelector('[data-feature="fotos"]');ul(m,e,{archiveMode:!0});const v=document.querySelector('[data-feature="import-page"]');zu(v,{state:{getState:j,updateSlice:Ze},events:e.events});const k=document.querySelector('[data-feature="dashboard"]');Mu(k,e);const h=w=>{const E=document.body;E&&(E.classList.toggle("bg-app",w),E.classList.toggle("bg-startup",!w))},S=w=>{const E=!!w.app?.hasDatabase;if(h(E),t instanceof HTMLElement&&t.classList.toggle("d-none",E),a instanceof HTMLElement&&a.classList.toggle("d-none",!E),n instanceof HTMLElement&&n.classList.toggle("d-none",!E),r instanceof HTMLElement&&r.classList.toggle("d-none",!E),E){const M=w.app?.activeSection??"dashboard";ws(M)}};S(e.state.getState()),Nn((w,E)=>{w.app?.hasDatabase!==E.app?.hasDatabase&&S(w),w.app?.activeSection!==E.app?.activeSection&&w.app?.hasDatabase&&ws(w.app.activeSection)}),lt("app:sectionChanged",()=>{})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ss,{once:!0}):Ss();
