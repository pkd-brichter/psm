const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/index.B1rjTSlt.js","_astro/index.BYnQNgHq.js","_astro/leaflet.C03ySvDx.css","_astro/leaflet-src.BcflbDBd.js","_astro/_commonjsHelpers.Cpj98o6Y.js","_astro/index.CPadEFgJ.js"])))=>i.map(i=>d[i]);
import{L as R,M as pi,J as Ee,N as ks,O as Ss,P as fi,h as _e,l as xs,a as mi,s as xe,n as Es,q as gi,p as mr,e as M,r as En,C as Ln,u as Ne,_ as Ge,Q as Ls,R as Ds,w as v,t as B,m as gr,S as Ps,j as sn,k as br,T as As,U as $s,V as he,W as Is,X as bi,Y as hi,H as vi,G as Dn,Z as Cs,$ as Bs,a0 as Ms,a1 as zs,a2 as qs,a3 as Qt,z as Wt,a4 as Fs,x as Ns,a5 as me,a6 as ge,a7 as Ts,a8 as Jt,a9 as Hs,aa as Os,D as _s,ab as Rs,ac as yi,ad as Kt,ae as Ws,af as Ks,ag as Gs,ah as hr,ai as Yn,aj as Xn,ak as js,al as Us,am as Vs,an as Zs,ao as Qs,ap as Js,aq as Ys,ar as wi,as as Xs,at as ki,au as eo,av as Si,aw as xi,ax as to,ay as no,az as ao,aA as ro,aB as io,aC as so,aD as ua,v as Ei,i as oo,b as lo,c as co}from"./index.BYnQNgHq.js";const pa="__psl_history_seeded",fa=200,vr=["Salat","Apfel","Wein","Tomate","Kartoffel","Hopfen","Raps","Birne"],yr=["Spritzung","Düngung","Pflege","Behandlung"],wr=["LACES","MALDO","VITVI","SOLTU","PRNUS","CUPAR","CYNCR","ALLCE"],kr=["BBCH 10","BBCH 31","BBCH 41","BBCH 55","BBCH 65","BBCH 71","BBCH 81"],uo=[{mediumId:"seed-water",name:"Wasser",unit:"L",methodId:"perKiste",methodLabel:"pro Kiste",value:.02,zulassungsnummer:"N/A"},{mediumId:"seed-tonikum",name:"Tonikum X",unit:"ml",methodId:"perKiste",methodLabel:"pro Kiste",value:.85,zulassungsnummer:"Z-123456"},{mediumId:"seed-oel",name:"Pflegeöl Y",unit:"ml",methodId:"percentWater",methodLabel:"% vom Wasser",value:.12,zulassungsnummer:"Z-654321"}];function po(e){if(typeof window>"u")return;const n=new URLSearchParams(window.location.search).has("seedHistory");if(!n)return;const a=window;a.__PSL||(a.__PSL={});const r=a.__PSL;r.seedHistoryEntries=(l=fa)=>Sr(e,{count:l}),r.resetHistorySeedFlag=()=>localStorage.removeItem(pa),!n&&!localStorage.getItem(pa)&&R()==="sqlite"&&Sr(e,{count:fa,setFlag:!0}).catch(l=>{console.error("History seeding failed",l)})}async function fo(e){if(!e.state.getState().app?.hasDatabase){if(typeof e.state.subscribe!="function")throw new Error("SQLite-Datenbank ist noch nicht initialisiert.");await new Promise((t,n)=>{const a=window.setTimeout(()=>{i(),n(new Error("SQLite-Datenbank wurde nicht rechtzeitig initialisiert."))},1e4),r=e.state.subscribe?.(l=>{l.app?.hasDatabase&&(i(),t())}),i=()=>{window.clearTimeout(a),typeof r=="function"&&r()}})}}async function Sr(e,t={}){const n=t.count??fa;if(R()!=="sqlite")throw new Error("SQLite-Treiber muss aktiv sein, bevor Daten befüllt werden können.");await fo(e);const a=performance.now();let r=0;for(let i=0;i<n;i+=1){const l=mo(i);await pi(l),r+=1}try{await Ee()}catch(i){console.warn("Seed-Daten konnten nicht persistent gespeichert werden",i)}return e.events.emit("history:data-changed",{source:"dev-history-seed"}),t.setFlag&&localStorage.setItem(pa,"1"),{inserted:r,durationMs:performance.now()-a}}function mo(e){const t=new Date;t.setDate(t.getDate()-e);const n=t.toLocaleDateString("de-DE"),a=t.toISOString(),r=20+e%30,i=Number((r*.5).toFixed(2));return{datum:n,dateIso:a,ersteller:`Seeder ${1+e%5}`,standort:`Test-Ort ${String.fromCharCode(65+e%6)}`,kultur:vr[e%vr.length],usageType:yr[e%yr.length],kisten:r,eppoCode:wr[e%wr.length],bbch:kr[e%kr.length],gps:`GPS-Notiz ${e}`,gpsCoordinates:{latitude:48+e%10*.01,longitude:11+e%10*.01},gpsPointId:`seed-gps-${e}`,invekos:`INV-${String(1e3+e).padStart(4,"0")}`,uhrzeit:`${String(6+e%12).padStart(2,"0")}:${String(e*7%60).padStart(2,"0")}`,savedAt:a,items:go(e,r,i)}}function go(e,t,n){return uo.map((a,r)=>{const i=1+(e+r)%4*.05,l=Number((a.value*i).toFixed(4)),o=Number((l*t).toFixed(2));return{id:`seed-item-${e}-${r}`,name:a.name,unit:a.unit,methodLabel:a.methodLabel,methodId:a.methodId,value:l,total:o,inputs:{kisten:t,waterVolume:n},zulassungsnummer:a.zulassungsnummer,mediumId:a.mediumId}})}let rt=null,Pt=null,xr=!1,Er=!1;async function bo(){if(!("serviceWorker"in navigator))return console.warn("[PWA] Service Workers nicht unterstützt"),null;try{return Pt=await navigator.serviceWorker.register("/psm/sw.js",{scope:"/psm/",updateViaCache:"none"}),console.log("[PWA] Service Worker registriert:",Pt.scope),Pt.addEventListener("updatefound",()=>{const e=Pt?.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&(console.log("[PWA] Neues Update verfügbar"),yt("pwa:update-available"))})}),navigator.serviceWorker.addEventListener("message",ho),xr||(xr=!0,navigator.serviceWorker.addEventListener("controllerchange",()=>{Er||(Er=!0,window.location.reload())})),Pt}catch(e){return console.error("[PWA] Service Worker Registrierung fehlgeschlagen:",e),null}}function ho(e){const{type:t,payload:n}=e.data||{};switch(t){case"DB_STATE":yt("pwa:db-state",n);break;case"CACHES_CLEARED":yt("pwa:caches-cleared");break}}async function Nn(e){if(!navigator.serviceWorker.controller){localStorage.setItem("psm-db-state",JSON.stringify({...e,updatedAt:new Date().toISOString()}));return}navigator.serviceWorker.controller.postMessage({type:"SET_DB_STATE",payload:e})}async function Li(){const e=localStorage.getItem("psm-db-state");if(e)try{return JSON.parse(e)}catch{}return navigator.serviceWorker?.controller?new Promise(t=>{const n=a=>{a.data?.type==="DB_STATE"&&(navigator.serviceWorker.removeEventListener("message",n),t(a.data.payload))};navigator.serviceWorker.addEventListener("message",n),navigator.serviceWorker.controller.postMessage({type:"GET_DB_STATE"}),setTimeout(()=>{navigator.serviceWorker.removeEventListener("message",n),t(null)},1e3)}):null}async function vo(){const e=await Li();return!!(e?.hasDatabase&&e?.autoStartEnabled)}function yo(){window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),rt=e,console.log("[PWA] Install Prompt verfügbar"),localStorage.getItem("psm-app-installed")==="true"&&(console.log("[PWA] Widerspruch erkannt: Flag sagt installiert, aber Prompt verfügbar"),localStorage.removeItem("psm-app-installed"),console.log("[PWA] Veraltetes Installations-Flag entfernt")),yt("pwa:install-available")}),window.addEventListener("appinstalled",()=>{rt=null,Hn(),console.log("[PWA] App installiert - Flag gesetzt"),yt("pwa:installed")})}function Tn(){return rt!==null}function ot(){return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0}function Ma(){const e=navigator.userAgent.toLowerCase();return e.includes("edg/")?"edge":e.includes("chrome")&&!e.includes("edg")?"chrome":e.includes("firefox")?"firefox":e.includes("safari")&&!e.includes("chrome")?"safari":"other"}function za(){return!!(ot()||localStorage.getItem("psm-app-installed")==="true"||window.matchMedia("(display-mode: fullscreen)").matches||window.matchMedia("(display-mode: minimal-ui)").matches||window.matchMedia("(display-mode: window-controls-overlay)").matches)}async function Di(){if(za())return!0;try{if("getInstalledRelatedApps"in navigator){const e=await navigator.getInstalledRelatedApps();if(console.log("[PWA] getInstalledRelatedApps result:",e),e&&e.length>0)return Hn(),!0}}catch(e){console.warn("[PWA] getInstalledRelatedApps API Fehler:",e)}return!1}function Hn(){localStorage.setItem("psm-app-installed","true"),console.log("[PWA] App als installiert markiert")}function wo(){localStorage.removeItem("psm-app-installed"),console.log("[PWA] Installations-Flag entfernt")}function Pi(){const e=Ma(),t=ot(),n=za();return{canInstall:Tn(),isInstalled:n&&!t,isStandalone:t,browser:e,showBanner:!t}}async function Ai(){const e=Ma(),t=ot(),n=await Di();return{canInstall:Tn(),isInstalled:n&&!t,isStandalone:t,browser:e,showBanner:!t}}async function ko(){if(!rt)return console.warn("[PWA] Kein Install Prompt verfügbar"),!1;try{await rt.prompt();const{outcome:e}=await rt.userChoice;return console.log("[PWA] Install Prompt Ergebnis:",e),e==="accepted"&&Hn(),rt=null,e==="accepted"}catch(e){return console.error("[PWA] Install Prompt fehlgeschlagen:",e),!1}}function So(e){if(!("launchQueue"in window)){console.log("[PWA] Launch Queue API nicht verfügbar");return}window.launchQueue?.setConsumer(async t=>{if(!t.files?.length){console.log("[PWA] Launch ohne Dateien");return}console.log("[PWA] Datei via Launch Queue empfangen:",t.files.length);for(const n of t.files)try{await e(n),await Nn({hasDatabase:!0,fileHandleName:n.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0});break}catch(a){console.error("[PWA] Fehler beim Öffnen der Datei:",a)}}),console.log("[PWA] File Handling initialisiert")}const Ze="psm-file-handles",qa="last-database";async function ma(e){try{const t=await Fa(),a=t.transaction(Ze,"readwrite").objectStore(Ze);await new Promise((r,i)=>{const l=a.put({key:qa,handle:e,savedAt:new Date().toISOString()});l.onsuccess=()=>r(),l.onerror=()=>i(l.error)}),t.close(),console.log("[PWA] FileHandle gespeichert"),await Nn({hasDatabase:!0,fileHandleName:e.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}catch(t){console.error("[PWA] FileHandle speichern fehlgeschlagen:",t)}}async function ga(){try{const e=await Fa(),n=e.transaction(Ze,"readonly").objectStore(Ze),a=await new Promise((i,l)=>{const o=n.get(qa);o.onsuccess=()=>i(o.result),o.onerror=()=>l(o.error)});if(e.close(),!a?.handle)return null;const r=a.handle;return typeof r.queryPermission=="function"&&await r.queryPermission({mode:"readwrite"})==="granted"?(console.log("[PWA] FileHandle mit Berechtigung geladen"),a.handle):(console.log("[PWA] FileHandle gefunden, aber Berechtigung erforderlich"),a.handle)}catch(e){return console.error("[PWA] FileHandle laden fehlgeschlagen:",e),null}}async function xo(e){try{const t=e;return typeof t.requestPermission!="function"?(await e.getFile(),!0):await t.requestPermission({mode:"readwrite"})==="granted"}catch{return!1}}async function Eo(){try{const e=await Fa(),n=e.transaction(Ze,"readwrite").objectStore(Ze);await new Promise((a,r)=>{const i=n.delete(qa);i.onsuccess=()=>a(),i.onerror=()=>r(i.error)}),e.close(),await Nn({hasDatabase:!1,autoStartEnabled:!1}),console.log("[PWA] FileHandle gelöscht")}catch(e){console.error("[PWA] FileHandle löschen fehlgeschlagen:",e)}}async function Fa(){return new Promise((e,t)=>{const n=indexedDB.open("psm-file-handles",1);n.onerror=()=>t(n.error),n.onsuccess=()=>e(n.result),n.onupgradeneeded=a=>{const r=a.target.result;r.objectStoreNames.contains(Ze)||r.createObjectStore(Ze,{keyPath:"key"})}})}function yt(e,t){window.dispatchEvent(new CustomEvent(e,{detail:t}))}function $i(){return{serviceWorker:"serviceWorker"in navigator,fileSystemAccess:typeof window.showOpenFilePicker=="function",launchQueue:"launchQueue"in window,indexedDB:"indexedDB"in window,standalone:ot(),installAvailable:Tn()}}async function Lo(e){if(console.log("[PWA] Initialisierung..."),await bo(),yo(),e?.onFileOpened&&So(e.onFileOpened),e?.onAutoStart&&await vo()){const t=await ga();if(t){const n=t;let a=!1;if(typeof n.queryPermission=="function"&&(a=await n.queryPermission({mode:"readwrite"})==="granted"),a){console.log("[PWA] Auto-Start mit gespeicherter Datei"),e.onFileOpened&&await e.onFileOpened(t);return}console.log("[PWA] Auto-Start: Berechtigung für Datei erforderlich"),yt("pwa:permission-required",{handle:t})}}console.log("[PWA] Capabilities:",$i())}async function Do(){if(console.group("🔧 PWA Debug Status"),console.log("📱 Standalone Mode:",ot()),console.log("💾 localStorage Flag:",localStorage.getItem("psm-app-installed")),console.log("🔔 Install Prompt verfügbar:",Tn()),console.log("🌐 Browser:",Ma()),console.group("📺 Display Mode Checks"),console.log("standalone:",window.matchMedia("(display-mode: standalone)").matches),console.log("fullscreen:",window.matchMedia("(display-mode: fullscreen)").matches),console.log("minimal-ui:",window.matchMedia("(display-mode: minimal-ui)").matches),console.log("window-controls-overlay:",window.matchMedia("(display-mode: window-controls-overlay)").matches),console.log("browser:",window.matchMedia("(display-mode: browser)").matches),console.groupEnd(),console.group("🔍 getInstalledRelatedApps API"),"getInstalledRelatedApps"in navigator)try{const e=await navigator.getInstalledRelatedApps();console.log("Installierte Apps:",e)}catch(e){console.log("API Fehler:",e)}else console.log("API nicht verfügbar");console.groupEnd(),console.group("📊 Status Vergleich"),console.log("Sync (isProbablyInstalled):",za()),console.log("Async (checkIfInstalled):",await Di()),console.log("getInstallStatus():",Pi()),console.log("getInstallStatusAsync():",await Ai()),console.groupEnd(),console.log("💡 Tipp: clearInstalledFlag() zum Zurücksetzen des Flags"),console.groupEnd()}typeof window<"u"&&(window.pwaDebug=Do,window.pwaClearFlag=wo);let on=!1;function Po(e){const t=r=>{if(on){on=!1;return}return r.preventDefault(),r.returnValue="",""};let n=!1;const a=r=>{const i=!!r.app?.hasDatabase;i&&!n?(window.addEventListener("beforeunload",t),n=!0):!i&&n&&(window.removeEventListener("beforeunload",t),n=!1)};a(e.getState()),e.subscribe(a),document.addEventListener("click",r=>{const i=r.target.closest("a");i&&i.target==="_blank"&&(on=!0,setTimeout(()=>{on=!1},100))})}function Ao(){const e=document.getElementById("app-root");if(!e)throw new Error("app-root Container fehlt");return{startup:e.querySelector('[data-region="startup"]'),shell:e.querySelector('[data-region="shell"]'),main:e.querySelector('[data-region="main"]'),footer:e.querySelector('[data-region="footer"]')}}async function $o(){if(ks()){window.location.replace("/psm/m/");return}Ao(),Ss();const e=fi();e!=="memory"&&_e(e),await xs();const t={state:{getState:M,patchState:mr,updateSlice:Ne,subscribe:Ln},events:{emit:En,subscribe:xe}};po(t),mi(),Po(t.state),Lo({onFileOpened:async n=>{const a=await Ge(()=>import("./index.BYnQNgHq.js").then(i=>i.aG),[]),r=await Ge(()=>import("./index.BYnQNgHq.js").then(i=>i.aF),[]);if(r.isSupported()){a.setActiveDriver("sqlite");const i=await n.getFile(),l=await i.arrayBuffer(),o=await r.importFromArrayBuffer(l,i.name);await ma(n);const{applyDatabase:c}=await Ge(async()=>{const{applyDatabase:u}=await import("./index.BYnQNgHq.js").then(d=>d.aI);return{applyDatabase:u}},[]);c(o.data),En("database:connected",{driver:"sqlite",autoStarted:!0})}}}),xe("database:connected",async n=>{await Nn({hasDatabase:!0,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}),xe("database:connected",async n=>{if(R()==="sqlite")try{await Es(),await gi()}catch(a){console.warn("GPS-Punkte konnten beim Start nicht geladen werden",a)}}),mr({app:{...M().app,ready:!0}})}const Lr="__pflanzenschutz_bootstrapped__",Dr=window;function Pr(){$o().catch(e=>{console.error("bootstrap failed",e)})}Dr[Lr]||(Dr[Lr]=!0,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Pr,{once:!0}):Pr());const Ii=[{id:"start",label:"Start",icon:"bi-grid-1x2",sections:[{section:"dashboard",label:"Übersicht",icon:"bi-grid-1x2"}]},{id:"psm",label:"PSM",icon:"bi-flower1",sections:[{section:"calc",label:"Neu erfassen",icon:"bi-pencil-square"},{section:"documentation",label:"Übersicht",icon:"bi-list-ul"},{section:"lager",label:"Lager",icon:"bi-box-seam"},{section:"settings",label:"Einstellungen",icon:"bi-gear"}]},{id:"acker",label:"Acker-Planer",icon:"bi-map",sections:[{section:"acker",label:"Acker-Planer",icon:"bi-map"}]},{id:"fotos",label:"Fotos",icon:"bi-camera",sections:[{section:"fotos",label:"Fotos",icon:"bi-camera"}]},{id:"daten",label:"Daten",icon:"bi-database",sections:[{section:"daten",label:"Import",icon:"bi-cloud-upload"}]}],Ci={dashboard:"start",calc:"psm",documentation:"psm",lager:"psm",history:"psm",report:"psm",acker:"acker",fotos:"fotos",settings:"psm",gps:"psm",lookup:"psm",import:"daten",daten:"daten"};function Bi(e){return Ii.find(t=>t.id===e)}function Io(e){const t=Ci[e];return t?Bi(t):void 0}function Co(){const e=document.getElementById("offline-indicator");if(!e)return;const t=()=>{const n=!navigator.onLine;e.classList.toggle("d-none",!n)};t(),window.addEventListener("online",t),window.addEventListener("offline",t)}function Ar(e){M().app.activeSection!==e&&(Ne("app",t=>({...t,activeSection:e})),En("app:sectionChanged",e))}function $r(){Co();const e=document.querySelectorAll(".nav-btn[data-area]"),t=document.getElementById("brand-link"),n=document.getElementById("topnav-tabs"),a=document.getElementById("topnav-area-icon"),r=document.getElementById("topnav-area-label"),i={};for(const p of Ii)i[p.id]=p.sections[0].section;let l=null;function o(p,y){if(n){if(p.sections.length<=1){n.innerHTML="";return}n.innerHTML=p.sections.map(w=>`
        <button type="button" class="topnav-tab${w.section===y?" active":""}" data-section="${w.section}">
          <i class="bi ${w.icon}"></i><span>${w.label}</span>
        </button>`).join("")}}function c(p){n&&n.querySelectorAll(".topnav-tab").forEach(y=>{y.classList.toggle("active",y.dataset.section===p)})}const u=p=>{const y=Bi(p);!y||!M().app.hasDatabase||Ar(i[p]??y.sections[0].section)};e.forEach(p=>{p.addEventListener("click",()=>{const y=p.dataset.area;y&&u(y)})}),t?.addEventListener("click",p=>{p.preventDefault(),u("start")}),n?.addEventListener("click",p=>{const w=p.target?.closest(".topnav-tab")?.dataset.section;w&&Ar(w)});const d=document.querySelector('.nav-btn[data-action="share-data"]');d?.addEventListener("click",()=>{d.disabled=!0,Ge(async()=>{const{shareMobileData:p}=await import("./index.B1rjTSlt.js");return{shareMobileData:p}},__vite__mapDeps([0,1])).then(({shareMobileData:p})=>p()).catch(p=>console.error("Teilen fehlgeschlagen",p)).finally(()=>{d.disabled=!1})}),Ls(),xe("history:data-changed",p=>{if(!document.body.classList.contains("mobile-mode"))return;const y=p?.type;(y==="created"||y==="created-bulk")&&Ds()});const f=p=>{const y=document.getElementById("brand-title"),w=document.getElementById("brand-tagline"),I=document.getElementById("app-version");y&&p.company.name&&(y.textContent=p.company.name),w&&p.company.headline&&(w.textContent=p.company.headline),I&&p.app.version&&(I.textContent=`v${p.app.version}`);const L=p.app.hasDatabase,H=p.app.activeSection,F=Io(H);F&&Ci[H]===F.id&&(i[F.id]=H),e.forEach(ce=>{ce.disabled=!L;const Y=L&&F?.id===ce.dataset.area;ce.classList.toggle("active",!!Y)}),F&&(a&&(a.className=`bi ${F.icon} topnav-area-icon`),r&&(r.textContent=F.label),l!==F.id?(o(F,H),l=F.id):c(H))};Ln(f),f(M());let b=!1;const S=document.title||"Pflanzenschutz";window.addEventListener("beforeprint",()=>{b||(b=!0,document.title=" ")}),window.addEventListener("afterprint",()=>{b&&(b=!1,document.title=S)})}function Bo(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",$r,{once:!0}):$r()}Bo();const Mo="https://api.digitale-psm.de",zo="digitale-psm.de";async function qo(e){try{const t=await fetch(`${Mo}/api/v1/${zo}/views/${e}`,{method:"POST",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`API error: ${t.status}`);return(await t.json()).views}catch(t){return console.warn("[ViewCounter] Fehler beim Zählen:",t),null}}function Fo(e){return e>=1e6?(e/1e6).toFixed(1).replace(".",",")+"M":e>=1e3?(e/1e3).toFixed(1).replace(".",",")+"K":e.toString()}const ba="pflanzenschutz-datenbank.json";let Ir=!1;function No(e){return e?`${e.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"pflanzenschutz-datenbank"}.json`:ba}async function At(e,t){if(!e){await t();return}const n=e.textContent??"";e.disabled=!0,e.dataset.busy="true",e.textContent="Bitte warten...";try{await t()}finally{e.disabled=!1,e.dataset.busy="false",e.textContent=n}}function Cr(e){return v(e)}function To(e){const t=document.createElement("section");t.className="section-container d-none",t.innerHTML=`
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
                <input class="form-control" id="wizard-company-name" name="wizard-company-name" required value="${Cr(e.name)}" placeholder="z.B. Gärtnerei Müller" />
              </div>
              <div class="col-md-6">
                <label class="form-label d-block mb-2" for="wizard-company-headline">
                  Überschrift <span class="text-muted small">(optional)</span>
                </label>
                <input class="form-control" id="wizard-company-headline" name="wizard-company-headline" value="${Cr(e.headline)}" placeholder="z.B. Pflanzenschutz-Dokumentation 2025" />
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
  `;const n=t.querySelector("#database-wizard-form");if(!n)throw new Error("Wizard-Formular konnte nicht erzeugt werden");const a=t.querySelector('[data-role="wizard-result"]');if(!a)throw new Error("Wizard-Resultat-Container fehlt");return{section:t,form:n,resultCard:a,preview:t.querySelector('[data-role="wizard-preview"]'),filenameLabel:t.querySelector('[data-role="wizard-filename"]'),saveHint:t.querySelector('[data-role="wizard-save-hint"]'),saveButton:t.querySelector('[data-action="wizard-save"]'),reset(){n.reset(),a.classList.add("d-none");const r=t.querySelector('[data-role="wizard-preview"]');r&&(r.textContent="");const i=t.querySelector('[data-role="wizard-filename"]');i&&(i.textContent="")}}}function Ho(e,t){if(!e||Ir)return;const n=e;let a=null,r=ba,i="landing";const o=t.state.getState().company,c=document.createElement("section");c.className="section-container";function u(P,E){const C=P;c.innerHTML=`
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
            ${C?`<button class="btn btn-link p-0" style="color: var(--text-muted); text-decoration: none; font-size: 0.85rem;" data-action="start-wizard">
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
            ${C?`<!-- Szenario 2: Hat Datei → Fortsetzen im Fokus -->
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
  `}u(!1,ot());const d=To(o);n.innerHTML="",n.appendChild(c),n.appendChild(d.section);const f=typeof window<"u"&&typeof window.showSaveFilePicker=="function";d.saveButton&&(f?d.saveHint&&(d.saveHint.textContent='Der Browser fragt nach einem Speicherort. Die erzeugte Datei kannst du später über "Bestehende Datei verbinden" erneut laden.'):(d.saveButton.disabled=!0,d.saveButton.textContent="Datei speichern (nicht verfügbar)",d.saveHint&&(d.saveHint.textContent="Dieser Browser unterstützt keinen direkten Dateidialog. Bitte nutze einen Chromium-basierten Browser (z. B. Chrome, Edge) über HTTPS oder http://localhost.")));function b(P=t.state.getState()){const E=!!P.app?.hasDatabase;if(n.classList.toggle("d-none",E),E){c.classList.add("d-none"),d.section.classList.add("d-none");return}i==="wizard"?(c.classList.add("d-none"),d.section.classList.remove("d-none")):(c.classList.remove("d-none"),d.section.classList.add("d-none"))}async function S(P){await At(P,async()=>{try{const E=R();E==="sqlite"||E==="filesystem"?_e(E):_e("filesystem")}catch(E){throw B.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),E instanceof Error?E:new Error("Dateisystem nicht verfügbar")}try{const E=await Ps();sn(E.data);const C=E.context;C?.fileHandle&&await ma(C.fileHandle),t.events.emit("database:connected",{driver:R()})}catch(E){console.error("Fehler beim Öffnen der Datenbank",E),B.error(E instanceof Error?E.message:"Öffnen der Datenbank fehlgeschlagen")}})}function p(P){At(P,async()=>{const E=gr(),C=["localstorage","sqlite","memory"];for(const le of C)try{_e(le);const fe=await br(E);sn(fe.data),t.events.emit("database:connected",{driver:R()||le});return}catch(fe){console.warn(`Treiber ${le} konnte nicht initialisiert werden`,fe)}const X="Keine geeignete Speicheroption verfügbar. Bitte Browserberechtigungen prüfen.";console.error(X),B.error(X)})}async function y(P){if(!a){B.warning("Bitte erst die Datenbank erzeugen.");return}await At(P,async()=>{try{const E=R();E==="sqlite"||E==="filesystem"?_e(E):_e("filesystem")}catch(E){throw B.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),E instanceof Error?E:new Error("Dateisystem nicht verfügbar")}try{const E=await br(a);sn(E.data),t.events.emit("database:connected",{driver:R()})}catch(E){console.error("Fehler beim Speichern der Datenbank",E),B.error(E instanceof Error?E.message:"Die Datei konnte nicht gespeichert werden")}})}function w(P){P.preventDefault();const E=new FormData(d.form),C=(E.get("wizard-company-name")||"").toString().trim();if(!C){B.warning("Bitte einen Firmennamen angeben.");return}const X=(E.get("wizard-company-headline")||"").toString().trim(),le=(E.get("wizard-company-address")||"").toString().trim();a=gr({meta:{company:{name:C,headline:X,logoUrl:"",contactEmail:"",address:le}}}),r=No(C),d.preview.textContent=JSON.stringify(a,null,2),d.filenameLabel.textContent=r,d.resultCard.classList.remove("d-none"),d.resultCard.scrollIntoView({behavior:"smooth",block:"start"})}function I(){i="landing",a=null,r=ba,d.reset(),b()}function L(){i="wizard",b()}async function H(P){await At(P,async()=>{try{const E=await ga();if(!E){B.warning("Keine gespeicherte Datei gefunden.");return}if(!await xo(E)){B.warning("Berechtigung zum Zugriff auf die Datei wurde verweigert.");return}_e("sqlite");const X=await E.getFile(),le=await X.arrayBuffer(),fe=await As(le,X.name);$s(E),sn(fe.data),await ma(E),t.events.emit("database:connected",{driver:"sqlite",autoStarted:!0}),B.success("Datenbank erfolgreich geladen!")}catch(E){console.error("Auto-Start fehlgeschlagen:",E),B.error(E instanceof Error?E.message:"Fehler beim Laden der gespeicherten Datei")}})}async function F(){await Eo();const P=c.querySelector("#auto-start-banner");P&&P.classList.add("d-none"),B.info("Gespeicherte Datei wurde vergessen.")}async function ce(P){await At(P,async()=>{if(await ko()){B.success("App wird installiert!");const C=c.querySelector("#pwa-install-banner");C&&C.classList.add("d-none")}})}if(c.addEventListener("click",P=>{const E=P.target?.closest("button[data-action]");if(!E)return;const C=E.dataset.action;if(C==="start-wizard"){L();return}C==="open"?S(E):C==="useDefaults"?p(E):C==="auto-start"?H(E):C==="auto-start-forget"?F():C==="install-pwa"&&ce(E)}),d.form.addEventListener("submit",w),d.section.addEventListener("click",P=>{const E=P.target?.closest("[data-action]");if(!E)return;const C=E.dataset.action;if(C==="wizard-back"){I();return}C==="wizard-save"&&y(E)}),t.state.subscribe(P=>b(P)),b(t.state.getState()),!t.state.getState().app.hasDatabase){const P=fi();if(P&&P!==R())try{_e(P)}catch(E){console.warn("Bevorzugter Speicher konnte nicht gesetzt werden",E)}}(async()=>{const P=await ga(),E=await Li(),C=!!(P&&E?.hasDatabase),X=ot();u(C,X);const le=c.querySelector('[data-role="view-count"]');if(le&&qo("app").then(ye=>{ye!==null&&(le.textContent=Fo(ye))}),C&&P){const ye=c.querySelector('[data-role="auto-start-filename"]');ye&&(ye.textContent=`Datei: ${P.name}`)}Y(),window.addEventListener("pwa:install-available",()=>{Y()}),window.addEventListener("pwa:installed",()=>{Hn(),Y()}),window.addEventListener("pwa:permission-required",async ye=>{const xt=ye.detail?.handle;if(xt){const De=c.querySelector("#auto-start-banner"),V=c.querySelector('[data-role="auto-start-filename"]');De&&V&&(V.textContent=`Datei: ${xt.name} (Berechtigung erforderlich)`,De.classList.remove("d-none"))}}),console.log("[Startup] PWA Capabilities:",$i());const fe=await Ai();console.log("[Startup] PWA Install Status (async):",fe),Je(fe)})();function Y(){const P=Pi();Je(P)}function Je(P){const E=c.querySelector("#pwa-install-banner"),C=c.querySelector('[data-role="pwa-content"]');if(!(!E||!C)){if(!P.showBanner){E.classList.add("d-none");return}E.classList.remove("d-none"),P.isInstalled?C.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-check-circle text-success me-1"></i>App ist bereits installiert
        </p>
        <p class="small mb-0" style="color: var(--text-muted);">
          Öffne die App über dein Desktop- oder Startmenü-Symbol für die beste Erfahrung.
        </p>
      `:P.canInstall?C.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-download me-1"></i>Für schnelleren Zugriff als App installieren
        </p>
        <button class="btn btn-sm btn-outline-light" data-action="install-pwa">
          <i class="bi bi-download me-1"></i>App installieren
        </button>
      `:E.classList.add("d-none")}}Ir=!0}function Mi(e){let t=!1,n=!1;const a=o=>{e.onStatusChange&&e.onStatusChange(o)},r=()=>{t||!n||M().app.activeSection!==e.section||e.shouldRefresh&&!e.shouldRefresh()||(n=!1,a("refreshing"),Promise.resolve(e.onRefresh()).catch(c=>{console.error("Auto-Refresh konnte nicht ausgeführt werden",c),n=!0,a("stale")}).finally(()=>{!t&&!n&&a("idle")}))},i=xe(e.event,()=>{e.shouldHandleEvent&&!e.shouldHandleEvent()||(n=!0,a("stale"),r())}),l=xe("app:sectionChanged",o=>{o===e.section&&(n?r():a("idle"))});return M().app.activeSection===e.section&&a("idle"),()=>{t=!0,i(),l()}}const Oo={prev:"Zurück",next:"Weiter",loading:"Lädt …",empty:"Keine Einträge verfügbar"};function Br(){const e=document.createElement("span");return e.className="spinner-border spinner-border-sm",e.setAttribute("role","status"),e.setAttribute("aria-hidden","true"),e}function Mr(e){const t=document.createElement("div");return t.className="pager-widget__info text-muted small text-center flex-grow-1",t.textContent=e?.trim()||"",t}function Yt(e,t){if(!e)return null;const n=document.createElement("div");n.className="pager-widget d-flex flex-column gap-2",e.innerHTML="",e.appendChild(n);let a={status:"hidden"},r=!1;const i={...Oo,...t.labels||{}};function l(){n.replaceChildren()}function o(f){const b=Mr(f.info||i.empty);n.replaceChildren(b)}function c(f){const b=document.createElement("div");b.className="alert alert-danger mb-0",b.textContent=f.message||"Unbekannter Fehler",n.replaceChildren(b)}function u(f){const b=document.createElement("div");b.className="pager-widget__controls d-flex flex-column flex-md-row gap-2 align-items-stretch";const S=document.createElement("button");S.type="button",S.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",S.disabled=!f.canPrev||f.loadingDirection==="prev",S.textContent=i.prev,f.loadingDirection==="prev"&&S.prepend(Br()),S.addEventListener("click",()=>{S.disabled||t.onPrev()});const p=document.createElement("button");p.type="button",p.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",p.disabled=!f.canNext||f.loadingDirection==="next",p.textContent=i.next,f.loadingDirection==="next"&&p.append(Br()),p.addEventListener("click",()=>{p.disabled||t.onNext()});const y=Mr(f.info||(f.canPrev||f.canNext?i.loading:i.empty));b.append(S,y,p),n.replaceChildren(b)}function d(f){switch(f.status){case"hidden":l();break;case"disabled":o(f);break;case"error":c(f);break;case"ready":u(f);break;default:l();break}}return{update(f){r||(a=f,d(f))},destroy(){r||(r=!0,n.replaceChildren(),e.innerHTML="")},getState(){return a}}}const Na=new Set;let zr=!1;function _o(){return typeof window>"u"?null:window.__PSL?.debugOverlayApi??null}function zi(){zr||typeof window>"u"||(zr=!0,window.addEventListener("psl:debug-overlay-ready",()=>{Na.forEach(e=>{Ta(e)})}))}function Ta(e){const t=_o();t?.registerProvider&&(e.handle||(e.handle=t.registerProvider(e.config)),e.handle.update(e.lastMetrics??null))}function qi(e){const t={config:e,handle:null,lastMetrics:null};return Na.add(t),zi(),Ta(t),t}function Fi(e,t){e.lastMetrics=t,Na.add(e),zi(),Ta(e)}function Ni(e){if(e==null)return 0;try{const t=JSON.stringify(e);return t?Number((t.length/1024).toFixed(1)):0}catch{return null}}const qr=5e3,Fr=50,Ha=50,gn=3;function ea(e){if(e==null||e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function Ro(e){if(!e)return null;const t=ea(e.areaHa);if(t!==null)return t;const n=ea(e.areaAr);if(n!==null)return n/100;const a=ea(e.areaSqm);return a!==null?a/1e4:null}function Wo(e,t="–"){const n=Ro(e);return n===null?t:_s(n,2,t)}function Ko(e){return e.toISOString().slice(0,10)}function Pn(e){if(!e)return;if(/^\d{4}-\d{2}-\d{2}$/.test(e))return e;const t=new Date(e);if(!Number.isNaN(t.getTime()))return Ko(t)}function Nr(e,t){if(!e)return;const n=new Date(e);if(!Number.isNaN(n.getTime()))return t==="start"?n.setHours(0,0,0,0):n.setHours(23,59,59,999),n.toISOString()}function Oa(){return{startDate:"",endDate:""}}function Ti(e,t){if(!e)return;const n=e.querySelector("#doc-start"),a=e.querySelector("#doc-end");n&&t.startDate&&(n.value=t.startDate),a&&t.endDate&&(a.value=t.endDate)}function Go(e,t="sqlite"){if(typeof e=="string")return e.includes(":")?e:/^\d+$/.test(e)?gt(t,Number(e)):e;if(typeof e=="number")return gt(t,e);if(e&&typeof e=="object"){const n=e.source||t;if(typeof e.ref=="string"&&e.ref.includes(":"))return e.ref;const a=Number(e.ref);if(!Number.isNaN(a))return gt(n,a)}return null}function jo(e){const t=new Set;return e?.length&&e.forEach(n=>{const a=Go(n);a&&t.add(a)}),t}function Hi(e){const t=e.querySelector('[data-role="doc-focus-banner"]'),n=e.querySelector('[data-role="doc-focus-text"]');if(!t||!n)return;if(!Ue){t.classList.add("d-none");return}const a=q.startDate&&q.endDate?`${q.startDate} - ${q.endDate}`:"Aktuelle Filter",r=Ue.label||"Importierter Zeitraum",i=Ue.highlightEntryIds.size,l=i?` (${i} markiert)`:"";n.textContent=`${r}: ${a}${l}`,t.classList.remove("d-none")}function Uo(e,t){const n=e.querySelector('[data-role="doc-refresh-indicator"]');if(n){if(n.classList.remove("alert-info","alert-warning"),t==="idle"){n.classList.add("d-none");return}n.classList.remove("d-none"),t==="stale"?(n.classList.add("alert-warning"),n.textContent="Neue Dokumentationseinträge verfügbar. Ansicht aktualisiert sich beim Öffnen."):(n.classList.add("alert-info"),n.textContent="Aktualisiere Dokumentation...")}}function ta(e,t,n={}){Ue&&(Ue=null,Tt=null,Hi(e),n.refreshList&&Qe(e,t.state.getState().fieldLabels))}function Vo(e,t){if(!Tt)return;const n=it(Tt);n&&(Tt=null,Gi(e,n,t))}function Zo(e,t,n){if(!n)return;const a=Pn(n.startDate),r=Pn(n.endDate),i=!!n.entryIds?.length;if(!a&&!r&&!i)return;q={...q,...a?{startDate:a}:{},...r?{endDate:r}:{}},n.creator!==void 0&&(q={...q,creator:n.creator||void 0}),n.crop!==void 0&&(q={...q,crop:n.crop||void 0});const l=jo(n.entryIds);Ue={label:n.label,reason:n.reason,startDate:q.startDate,endDate:q.endDate,highlightEntryIds:l},Tt=n.autoSelectFirst&&l.size?l.values().next().value??null:null;const o=e.querySelector("#doc-filter");Ti(o,q),Hi(e),ha=!0,Re(e,t.state.getState()).finally(()=>{ha=!1})}function Qo(){if(typeof window>"u")return{enabled:!1,count:ln};try{const e=new URLSearchParams(window.location.search);if(!e.has("seedHistory"))return{enabled:!1,count:ln};const t=e.get("seedHistory"),n=t?Number(t):Number.NaN;return{enabled:!0,count:Number.isFinite(n)&&n>0?Math.min(Math.round(n),Jo):ln}}catch(e){return console.warn("seedHistory Parameter konnte nicht gelesen werden",e),{enabled:!1,count:ln}}}const Le=25,Tr=4,na=new Intl.NumberFormat("de-DE"),ln=200,Jo=2e3,wt=Qo();let Hr=!1,U="memory",q=Oa(),ie=0,W=[],ze=[],N=0;const Se=new Map,be=new Map([[0,null]]),ue=new Set,je=new Map,mt=new Map;let de=!1,$t=null,It=0,Ue=null,ha=!1,Tt=null,An=!1,bn="",$n=!1,cn=null,dn=null,Or=null,re=0,un=null,_r=null,ke=null,Ht=!1,Rr=null;const Yo=qi({id:"documentation",label:"Documentation",budget:{initialLoad:50,maxItems:150}});let Oi=null;function St(e){return e.app?.storageDriver||R()}function gt(e,t){return`${e}:${t}`}function _a(e){const t={},n=Nr(e.startDate,"start"),a=Nr(e.endDate,"end");return n&&(t.startDate=n),a&&(t.endDate=a),e.creator&&(t.creator=e.creator),e.crop&&(t.crop=e.crop),t}function Xo(e,t){return{id:gt("state",t),entry:e,source:"state",ref:t}}function el(e){const t=Number(e?.id??e?.historyId??0),n={...e};return delete n.id,{id:gt("sqlite",t),entry:n,source:"sqlite",ref:t}}function tl(){return U==="memory"?W.length:ie>0?ie:N*Le+W.length||null}function nl(){const e=[];if(de&&e.push("Lädt …"),ke&&e.push("Fehler"),Ue&&e.push("Fokus aktiv"),U==="sqlite"&&be.get(N+1)&&e.push("Weitere Seiten verfügbar"),!!e.length)return e.join(" · ")}function al(){const e={items:W.length,totalCount:tl(),cursor:U==="sqlite"?`Seite ${N+1}`:null,payloadKb:Ni(ze.map(t=>t.entry)),lastUpdated:Oi,note:nl()};Fi(Yo,e)}function it(e){return W.find(t=>t.id===e)}function On(e){const t=e.querySelector('[data-role="archive-form"]');if(!t)return;const n=t.querySelector('input[name="archive-start"]'),a=t.querySelector('input[name="archive-end"]');n&&(n.value=q.startDate||""),a&&(a.value=q.endDate||"")}function Z(e,t,n="info"){const a=e.querySelector('[data-role="archive-status"]');if(a){if(!t){a.classList.add("d-none"),a.textContent="";return}a.className=`alert alert-${n}`,a.textContent=t,a.classList.remove("d-none")}}function va(e,t){const n=e.querySelector('[data-role="archive-form"]'),a=e.querySelector('[data-action="archive-toggle"]');if(!n)return;const r=!n.classList.contains("d-none"),i=typeof t=="boolean"?t:!r;n.classList.toggle("d-none",!i),a&&(a.textContent=i?"Archiv-Eingaben ausblenden":"Archiv erstellen"),i&&On(e)}function rl(e){const t=e.querySelector('input[name="archive-start"]'),n=e.querySelector('input[name="archive-end"]');if(!t?.value||!n?.value)return null;const a=e.querySelector('input[name="archive-storage"]'),r=e.querySelector('textarea[name="archive-note"]'),i=e.querySelector('input[name="archive-remove"]');return{startDate:t.value,endDate:n.value,storageHint:a?.value.trim()||void 0,note:r?.value.trim()||void 0,removeAfterExport:i?i.checked:!0}}function Ra(e,t){const n=e.querySelector('[data-action="archive-toggle"]'),a=e.querySelector('[data-action="archive-submit"]'),r=e.querySelector('[data-role="archive-form"]'),i=e.querySelector('[data-role="archive-driver-hint"]'),l=St(t)==="sqlite"&&!!t.app?.hasDatabase;n&&(n.disabled=!l||An),a&&(a.disabled=!l||An),!l&&r&&r.classList.add("d-none"),i&&(i.textContent=l?"Lokale SQLite-Datenbank aktiv":"Nur mit SQLite verfügbar",i.className=`badge ${l?"bg-success":"bg-secondary"}`),l?Wa():$n=!1}function Wr(e,t){An=t;const n=e.querySelector('[data-role="archive-form"]'),a=e.querySelector('[data-action="archive-toggle"]');if(n&&n.querySelectorAll("input, textarea, button").forEach(r=>{if(r.dataset.action==="archive-cancel"&&t){r.setAttribute("disabled","disabled");return}t?r.setAttribute("disabled","disabled"):r.removeAttribute("disabled")}),a&&(a.disabled=t||a.disabled,!t)){const r=M();a.disabled=St(r)!=="sqlite"||!r.app?.hasDatabase}}function il(e,t){const n=a=>a?a.replace(/[^0-9-]/g,""):"unbekannt";return`pflanzenschutz-archiv-${n(e)}_${n(t)}.zip`}function sl(e){let t=[];return Ne("archives",n=>{const a=Array.isArray(n?.logs)?n.logs:[];return t=[e,...a].slice(0,Ha),{...n||{logs:[]},logs:t}}),t}async function Wa({force:e=!1}={}){if(cn){if(await cn,!e)return}else if($n&&!e)return;const t=M();if(St(t)!=="sqlite"||!t.app?.hasDatabase)return;const a=(async()=>{try{const r=await Is({limit:Ha});Ne("archives",i=>({...i&&typeof i=="object"?i:{logs:[]},logs:r.items})),$n=!0}catch(r){console.warn("Archive logs could not be loaded",r)}})();cn=a;try{await a}finally{cn=null}}async function ol(e,t){const n=St(M());if(sl(e),n!=="sqlite"){console.warn("Archive logs require SQLite. Changes stored in memory only.");return}try{const a={...e,metadata:t??void 0};await Fs(a),await Ee()}catch(a){console.error("Archive log could not be persisted",a),$n=!1}finally{await Wa({force:!0})}}function ya(e){return!Array.isArray(e)||!e.length?"[]":e.map(t=>`${t.id}:${t.archivedAt}:${t.entryCount}`).join("|")}function ll(e){return e?Wt(e)||e.slice(0,16).replace("T"," "):"-"}function Gt(e,t,n={}){const a=e.querySelector('[data-role="archive-log-list"]');if(!a)return;const r=Array.isArray(t)?t:[];n.resetPage!==!1&&(re=0);const i=hl(r);if(!i.total){a.innerHTML='<div class="text-muted small">Noch keine Archive erstellt.</div>',jr(e,i);return}const l=i.items.map(o=>{const c=ll(o.archivedAt),u=`${o.startDate||"-"} – ${o.endDate||"-"}`,d=o.entryCount===1?"Eintrag":"Einträge";return`
        <div class="list-group-item border rounded mb-2 p-3" data-action="archive-log-focus" data-log-id="${o.id}" style="cursor: pointer;">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="fs-5 fw-bold mb-1">${v(u)}</div>
              <div class="text-muted">${o.entryCount} ${d} · Erstellt ${v(c)}</div>
            </div>
            <i class="bi bi-chevron-right text-muted fs-4"></i>
          </div>
        </div>
      `}).join("");a.innerHTML=`<div class="list-group list-group-flush">${l}</div>`,jr(e,i)}function Kr(e,t){const n=e.archives?.logs;if(Array.isArray(n))return n.find(a=>a.id===t)}async function cl(e){if(e){if(typeof navigator<"u"&&navigator.clipboard&&typeof navigator.clipboard.writeText=="function"){await navigator.clipboard.writeText(e);return}if(typeof document<"u"){const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select(),document.execCommand("copy"),document.body.removeChild(t)}}}async function Xt(e){if(mt.has(e.id))return mt.get(e.id);let t=null;if(e.source==="sqlite")try{t=await Ns(e.ref)}catch(n){console.error("History entry fetch failed",n)}else{const n=he(M().history);t=(typeof e.ref=="number"?n[e.ref]:void 0)||e.entry}return t&&mt.set(e.id,t),t}function _i(e){return e&&(e.datum||Wt(e.dateIso)||(typeof e.date=="string"?e.date:""))||""}function dl(e){if(e?.gpsCoordinates){const t=Os(e.gpsCoordinates);if(t)return t}return""}function ul(e){return e?.gps||""}function wa(e){if(!e)return null;if(e.dateIso){const a=Rs(e.dateIso);if(a)return new Date(a.getFullYear(),a.getMonth(),a.getDate())}const t=typeof e.datum=="string"&&e.datum||typeof e.date=="string"&&e.date||null;if(!t)return null;const n=t.split(".");if(n.length===3){const[a,r,i]=n.map(Number);if(!Number.isNaN(a)&&!Number.isNaN(r)&&!Number.isNaN(i))return new Date(i,r-1,a)}return null}function pl(e,t){const n=wa(e);if(t.startDate){const r=new Date(t.startDate);if(r.setHours(0,0,0,0),!n||n<r)return!1}if(t.endDate){const r=new Date(t.endDate);if(r.setHours(23,59,59,999),!n||n>r)return!1}const a=[["creator",e.ersteller],["crop",e.kultur]];for(const[r,i]of a){const o=t[r]?.trim().toLowerCase();if(o&&!`${i||""}`.toLowerCase().includes(o))return!1}return!0}function Ka(e){if(!e)return"";const t=r=>r==null?"":String(r),a=(Array.isArray(e.items)?e.items:[]).map(r=>{const i=Object.keys(r).sort().reduce((l,o)=>(l[o]=r[o],l),{});return JSON.stringify(i)}).sort();return JSON.stringify({savedAt:t(e.savedAt),dateIso:t(e.dateIso),datum:t(e.datum),ersteller:t(e.ersteller),standort:t(e.standort),kultur:t(e.kultur),usageType:t(e.usageType),eppoCode:t(e.eppoCode),invekos:t(e.invekos),bbch:t(e.bbch),gps:t(e.gps),gpsPointId:t(e.gpsPointId),areaHa:e.areaHa??null,areaAr:e.areaAr??null,areaSqm:e.areaSqm??null,kisten:e.kisten??null,itemHashes:a})}function Ri(e){e.size&&Ne("history",t=>{const n=Qt(t);if(!n.items.length)return n;let a=!1;const r=n.items.filter(i=>{const l=Ka(i);return e.has(l)?(a=!0,!1):!0});return a?{...n,items:r,totalCount:Math.min(n.totalCount,r.length),lastUpdatedAt:new Date().toISOString()}:n})}function fl(e){return e.slice().sort((t,n)=>{const a=wa(t.entry)?.getTime()||new Date(t.entry.savedAt||0).getTime();return(wa(n.entry)?.getTime()||new Date(n.entry.savedAt||0).getTime())-a})}function Gr(){return U==="sqlite"?ie>0?Math.max(Math.ceil(ie/Le),1):Math.max(N+1,Se.size||0):W.length?Math.max(Math.ceil(W.length/Le),1):0}function Wi(){if(U==="sqlite"){const t=Math.max(Gr()-1,0);return N>t&&(N=t),N<0&&(N=0),N*Le}if(!W.length)return N=0,0;const e=Math.max(Gr()-1,0);return N>e&&(N=e),N<0&&(N=0),N*Le}function _n(){if(!W.length){ze=[];return}if(U==="sqlite"){ze=W.slice();return}const e=Wi(),t=Math.min(e+Le,W.length);ze=W.slice(e,t)}function ml(e){if(Se.size<=Tr)return;const t=Array.from(Se.keys()).sort((n,a)=>{const r=Math.abs(n-e);return Math.abs(a-e)-r});for(;Se.size>Tr&&t.length;){const n=t.shift();n==null||n===e||Se.delete(n)}}function gl(e){const t=e.querySelector('[data-role="doc-pager"]');return t?((!dn||Or!==t)&&(dn?.destroy(),dn=Yt(t,{onPrev:()=>wl(e),onNext:()=>kl(e),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Dokumentation...",empty:"Keine Einträge"}}),Or=t),dn):null}function bl(e){const t=e.querySelector('[data-role="archive-log-pager"]');return t?((!un||_r!==t)&&(un?.destroy(),un=Yt(t,{onPrev:()=>vl(e),onNext:()=>yl(e),labels:{prev:"Zurück",next:"Weiter",loading:"Archive werden geladen...",empty:"Keine Einträge"}}),_r=t),un):null}function hl(e){const t=e.length;if(!t)return re=0,{total:0,start:0,end:0,items:[]};const n=Math.max(Math.ceil(t/gn),1);re>=n&&(re=n-1),re<0&&(re=0);const a=re*gn,r=Math.min(a+gn,t);return{total:t,start:a,end:r,items:e.slice(a,r)}}function jr(e,t){const n=bl(e);if(n){if(!t.total){n.update({status:"disabled",info:"Noch keine Archive"});return}n.update({status:"ready",info:`Einträge ${t.start+1}–${t.end} von ${t.total}`,canPrev:re>0,canNext:t.end<t.total})}}function vl(e){if(re===0)return;re=Math.max(re-1,0);const t=M().archives?.logs??[];Gt(e,t,{resetPage:!1})}function yl(e){const t=M().archives?.logs??[],n=t.length;if(!n)return;const a=Math.max(Math.ceil(n/gn),1);re>=a-1||(re=Math.min(re+1,a-1),Gt(e,t,{resetPage:!1}))}function hn(e){const t=gl(e);if(!t)return;if(ke){t.update({status:"error",message:ke});return}const n=U==="memory"?W.length:ie,a=ze.length;if(!a){const u=de?"Lade Dokumentation...":"Keine Einträge vorhanden.";t.update({status:"disabled",info:u});return}const r=U==="sqlite"?N*Le:Wi(),i=`Einträge ${na.format(r+1)}–${na.format(r+a)}${n?` von ${na.format(n)}`:""}`,l=U==="memory"?r+a<W.length:!!be.get(N+1),o=!de&&l,c=N>0&&!de;t.update({status:"ready",info:i,canPrev:c,canNext:o,loadingDirection:de&&l?"next":null})}function ka(e){if(!wt.enabled)return;const t=e.querySelector('[data-action="doc-seed"]');t&&(t.disabled=Ht,t.textContent=Ht?"Dummy-Daten werden erstellt...":`+ ${wt.count} Dummy-Einträge`)}function wl(e){if(N===0||de)return;const t=Math.max(N-1,0);if(U==="sqlite"){Ga(e,M().fieldLabels,t);return}N=t,_n(),Qe(e,M().fieldLabels),Ut(e,M().fieldLabels)}function kl(e){if(de)return;const t=N+1;if(U==="sqlite"){const a=Se.has(t),r=be.get(t);if(!a&&!r)return;Ga(e,M().fieldLabels,t);return}t*Le<W.length&&(N=t,_n(),Qe(e,M().fieldLabels),Ut(e,M().fieldLabels))}function jt(e){ue.clear(),je.clear(),e&&Rn(e)}function Sl(){return U==="memory"?W.length:ie}function Rn(e){const t=e.querySelector('[data-role="doc-selection-info"]'),n=e.querySelector('[data-action="print-selection"]'),a=e.querySelector('[data-action="pdf-selection"]'),r=e.querySelector('[data-action="export-selection"]'),i=e.querySelector('[data-action="export-zip"]'),l=e.querySelector('[data-action="delete-selection"]'),o=ue.size;t&&(t.textContent=o?`${o} Eintrag${o===1?"":"e"} ausgewählt`:"Keine Einträge ausgewählt");const c=o===0;n&&(n.disabled=c),a&&(a.disabled=c),r&&(r.disabled=c),i&&(i.disabled=c),l&&(l.disabled=c);const u=e.querySelector('[data-action="toggle-select-all"]');if(u){const d=Sl();u.disabled=d===0,u.checked=d>0&&o>=d,u.indeterminate=o>0&&o<d}}function Sa(e,t){e.querySelectorAll('[data-role="doc-list"] .doc-sidebar-entry').forEach(a=>{const r=!!(t&&a.dataset.entryId===t);a.classList.toggle("active",r)})}function Mt(e,t,n){const a=e.querySelector("#doc-detail"),r=e.querySelector("#doc-detail-body"),i=e.querySelector('[data-role="doc-detail-card"]'),l=e.querySelector('[data-role="doc-detail-empty"]');if(!a||!r||!i||!l)return;if(!t){a.dataset.entryId="",i.classList.add("d-none"),l.classList.remove("d-none"),r.innerHTML="",Sa(e,null);return}a.dataset.entryId=t.entry.id,i.classList.remove("d-none"),l.classList.add("d-none"),Sa(e,t.entry.id);const o=n||M().fieldLabels,c=o.history?.tableColumns??{},u=o.history?.detail??{},d=t.detail||t.entry.entry,f=Ts(d.items||[],o,"detail"),b=d.gpsCoordinates?Jt(d.gpsCoordinates):null,S=ul(d),p=dl(d),y=u.gpsNote||c.gpsNote||u.gps||c.gps||"GPS-Notiz",w=u.gpsCoordinates||c.gpsCoordinates||u.gps||c.gps||"GPS-Koordinaten",I=p?`${v(p)}${b?` <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${v(b)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:""}`:"-";r.innerHTML=`
    <p>
      <strong>${v(c.date||"Datum")}:</strong> ${v(_i(d))}<br />
      <strong>${v(u.creator||"Erstellt von")}:</strong> ${v(d.ersteller||"")}<br />
      <strong>${v(u.location||"Standort")}:</strong> ${v(d.standort||"")}<br />
      <strong>${v(u.crop||"Kultur")}:</strong> ${v(d.kultur||"")}<br />
      <strong>${v(u.usageType||"Art der Verwendung")}:</strong> ${v(d.usageType||"")}<br />
      <strong>${v(u.quantity||"Fläche (ha)")}:</strong> ${v(Wo(d))}<br />
      <strong>${v(u.eppoCode||"EPPO-Code")}:</strong> ${v(d.eppoCode||"")}<br />
      <strong>${v(u.bbch||"BBCH")}:</strong> ${v(d.bbch||"")}<br />
      <strong>${v(u.invekos||"InVeKoS")}:</strong> ${v(d.invekos||"")}<br />
      <strong>${v(y)}:</strong> ${S?v(S):"-"}<br />
      <strong>${v(w)}:</strong> ${I}<br />
      <strong>${v(u.time||"Uhrzeit")}:</strong> ${v(d.uhrzeit||"")}<br />
    </p>
    ${Hs({maschine:d.qsMaschine,schaderreger:d.qsSchaderreger,verantwortlicher:d.qsVerantwortlicher,wetter:d.qsWetter,behandlungsart:d.qsBehandlungsart})}
    <div class="table-responsive">
      ${f}
    </div>
  `}function Qe(e,t){_n();const n=e.querySelector('[data-role="doc-list"]');if(!n)return;const r=e.querySelector("#doc-detail")?.dataset.entryId||null;if(!ze.length)n.innerHTML=de?'<div class="text-center text-muted py-4">Lädt ...</div>':'<div class="text-center text-muted py-4">Noch keine Einträge</div>';else{n.innerHTML="";const i=document.createDocumentFragment();(t||M().fieldLabels).history?.detail?.usageType,ze.forEach(o=>{const c=document.createElement("div"),u=!!Ue?.highlightEntryIds?.has(o.id);c.className=`doc-sidebar-entry list-group-item${u?" doc-sidebar-entry--highlight":""}`,c.dataset.entryId=o.id;const d=_i(o.entry)||"-",f=u?'<span class="badge bg-warning-subtle text-warning-emphasis badge-import">Import</span>':"";c.innerHTML=`
        <div
          class="doc-sidebar-entry__main"
          data-action="view-entry"
          data-entry-id="${o.id}"
        >
          <div class="d-flex justify-content-between gap-2">
            <span class="fw-bold d-flex align-items-center gap-2">
              ${v(o.entry.kultur||"-")}
              ${f}
            </span>
            <small class="text-muted">${v(d)}</small>
          </div>
          <div class="text-muted small mb-1">
            ${v(o.entry.ersteller||"-")} | ${v(o.entry.standort||"-")}
          </div>
          <div class="small text-muted">
            ${v(o.entry.usageType||"-")} · ${v(o.entry.eppoCode||"-")} · ${v(o.entry.invekos||"-")}
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2 gap-2 no-print">
          <button class="btn btn-sm btn-outline-secondary" data-action="print-entry" data-entry-id="${o.id}">Drucken</button>
          <label class="form-check-label d-flex align-items-center gap-2 mb-0">
            <input type="checkbox" class="form-check-input" data-action="toggle-select" data-entry-id="${o.id}" ${ue.has(o.id)?"checked":""} />
            <span class="small">Auswahl</span>
          </label>
        </div>
      `,i.appendChild(c)}),n.appendChild(i)}Sa(e,r),Vo(e,t),hn(e),Rn(e),Oi=new Date().toISOString(),al()}function Ut(e,t){const n=e.querySelector('[data-role="doc-info"]');if(!n)return;const a=ie,r=!!(q.crop||q.creator);if(!a&&!de){n.textContent="Keine Einträge";return}if(!a&&de){n.textContent="Lädt...";return}if(q.startDate&&q.endDate){const i=`${q.startDate} - ${q.endDate} (${a})`;n.textContent=r?`${i} + Filter`:i;return}n.textContent=`Alle Einträge (${a})`}async function Ki(e,t){const a=e.querySelector("#doc-detail")?.dataset.entryId;if(!a){Mt(e,null,t);return}const r=it(a);if(!r){Mt(e,null,t);return}const i=await Xt(r);i?Mt(e,{entry:r,detail:i},t):Mt(e,null,t)}async function Ga(e,t,n=N,a={}){const r=Math.max(0,n),i=!!a.forceReload;i&&(Se.clear(),be.clear(),be.set(0,null),ie=0,W=[],ze=[],N=0,ke=null);const l=i?void 0:Se.get(r);if(l&&!a.forceReload){N=r,W=l,ke=null,Qe(e,t),Ut(e),hn(e);return}const o=be.has(r)?be.get(r)??null:null,c=Symbol("doc-load");$t=c,de=!0,ke=null,hn(e);try{const u=await bi({cursor:o,pageSize:Le,filters:_a(q),sortDirection:"desc",includeTotal:i||r===0||ie===0});if($t!==c)return;const d=u.items.map(f=>el(f));if(Se.set(r,d),ml(r),be.set(r,o),be.set(r+1,u.nextCursor??null),typeof u.totalCount=="number")ie=u.totalCount;else{const f=r*Le+d.length;ie=Math.max(ie,f)}N=r,W=d,ke=null,Qe(e,t),Ut(e,t)}catch(u){$t===c&&(console.error("Dokumentation konnte nicht geladen werden",u),ke="Dokumentation konnte nicht geladen werden. Bitte erneut versuchen.",window.alert("Dokumentation konnte nicht geladen werden. Bitte erneut versuchen."))}finally{$t===c&&(de=!1,$t=null,hn(e))}}async function xl(e,t){const n=he(t.history);W=fl(n.map((a,r)=>Xo(a,r)).filter(a=>pl(a.entry,q))),ie=W.length,N=0,ke=null,_n(),Qe(e,t.fieldLabels),Ut(e,t.fieldLabels),await Ki(e,t.fieldLabels)}async function Re(e,t){const n=St(t),a=!!t.app?.hasDatabase,r=n==="sqlite"&&a;if(U=r?"sqlite":"memory",mt.clear(),N=0,ke=null,ie=0,W=[],ze=[],Se.clear(),be.clear(),be.set(0,null),jt(e),Ra(e,t),On(e),Gt(e,t.archives?.logs??[]),bn=ya(t.archives?.logs),r){await Ga(e,t.fieldLabels,0,{forceReload:!0}),await Ki(e,t.fieldLabels);return}await xl(e,t)}async function aa(){const e=[];for(const t of ue){const n=je.get(t)||it(t);if(!n)continue;const a=await Xt(n);a&&e.push(a)}return e}async function El(e,t){if(!t){jt(e),Qe(e,M().fieldLabels);return}if(ue.clear(),je.clear(),U==="memory")for(const n of W)ue.add(n.id),je.set(n.id,n);else try{const n=await hi({filters:_a(q),sortDirection:"desc",limit:1e4}),a=Array.isArray(n.historyIds)?n.historyIds:[];n.entries.forEach((r,i)=>{const l=Number(a[i]);if(!Number.isFinite(l))return;const o=gt("sqlite",l);ue.add(o),je.set(o,{id:o,entry:r,source:"sqlite",ref:l}),mt.has(o)||mt.set(o,r)})}catch(n){console.error("Alle Einträge konnten nicht ausgewählt werden",n),window.alert("Alle Einträge konnten nicht ausgewählt werden. Bitte erneut versuchen.")}Qe(e,M().fieldLabels),Rn(e)}async function Ll(e,t){if(!ue.size)return;const n=Array.from(ue).map(o=>je.get(o)||it(o)).filter(o=>!!o),a=[];for(const o of n){const c=await Xt(o);c&&a.push(c)}const r=n.filter(o=>o.source==="sqlite"),i=!!r.length;if(i)for(const o of r)await qs(o.ref);const l=new Set(n.filter(o=>o.source==="state").map(o=>o.ref));if(l.size&&(Ne("history",o=>{const c=Qt(o),u=c.items.filter((d,f)=>!l.has(f));return u.length===c.items.length?c:{...c,items:u,totalCount:Math.min(c.totalCount,u.length),lastUpdatedAt:new Date().toISOString()}}),await Dl()),a.length){const o=new Set(a.map(c=>Ka(c)));Ri(o)}if(i){try{await Ee()}catch(o){console.warn("SQLite-Datei konnte nach dem Löschen nicht gespeichert werden",o)}t.events?.emit?.("history:data-changed",{type:"deleted",ids:r.map(o=>o.ref)})}jt(e),await Re(e,t.state.getState())}async function Gi(e,t,n){const a=await Xt(t);if(!a){window.alert("Details konnten nicht geladen werden.");return}Mt(e,{entry:t,detail:a},n)}async function Ur(e){const t=await Xt(e);t?await ji([t]):window.alert("Eintrag konnte nicht geladen werden.")}async function Dl(){const e=R();if(!(!e||e==="memory"||e==="sqlite"))try{const t=me();await ge(t)}catch(t){throw console.error("Persist history failed",t),window.alert("Historie konnte nicht gespeichert werden. Bitte erneut versuchen."),t}}async function Pl(e,t,n){if(An)return;const a=t.state.getState();if(St(a)!=="sqlite"||!a.app?.hasDatabase){Z(e,"Archivieren ist nur mit einer lokalen SQLite-Datenbank möglich.","warning");return}const i=rl(n);if(!i?.startDate||!i.endDate){Z(e,"Bitte Start- und Enddatum für das Archiv wählen.","warning");return}const l=Pn(i.startDate),o=Pn(i.endDate);if(!l||!o){Z(e,"Die angegebenen Daten sind ungültig.","danger");return}if(new Date(l)>new Date(o)){Z(e,"Startdatum darf nicht nach dem Enddatum liegen.","danger");return}const c={startDate:l,endDate:o,creator:q.creator,crop:q.crop},u=_a(c);Wr(e,!0),Z(e,"Prüfe Zeitraum und Eintragsmenge...","info");try{const d=await bi({cursor:null,pageSize:1,filters:u,sortDirection:"asc",includeTotal:!0}),f=d.totalCount??d.items.length??0;if(!f){Z(e,"Im angegebenen Zeitraum wurden keine Einträge gefunden.","warning");return}if(f>qr){Z(e,`Maximal ${qr} Einträge pro Archiv erlaubt. Bitte Zeitraum verkürzen.`,"warning");return}Z(e,`Exportiere ${f} Einträge in ein ZIP-Archiv...`,"info");const b=await hi({filters:u,limit:f,sortDirection:"asc"}),S=b?.entries??[];if(!S.length){Z(e,"Archiv konnte nicht erstellt werden – Export lieferte keine Einträge.","danger");return}const p=S.map(E=>({...E})),y={format:"pflanzenschutz-archive",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:p.length,filters:{startDate:l,endDate:o,creator:c.creator||null,crop:c.crop||null},archive:{removeFromDatabase:i.removeAfterExport,storageHint:i.storageHint||null,note:i.note||null}},w=vi({"pflanzenschutz.json":Dn(JSON.stringify(p,null,2)),"metadata.json":Dn(JSON.stringify(y,null,2))}),I=new ArrayBuffer(w.byteLength);new Uint8Array(I).set(w);const L=new Blob([I],{type:"application/zip"}),H=il(l,o);ja(L,H);let F=!1;if(i.removeAfterExport){Z(e,"Export abgeschlossen. Entferne Einträge und bereinige Datenbank...","info"),await Cs({filters:u});const E=new Set(p.map(C=>Ka(C)));Ri(E);try{await Ee()}catch(C){console.error("SQLite-Datei konnte nach dem Archivieren nicht gespeichert werden",C)}t.events?.emit?.("history:data-changed",{type:"deleted-range",filters:u});try{await Bs()}catch(C){F=!0,console.error("VACUUM fehlgeschlagen",C)}}const ce=new Date().toISOString(),Y={id:`archive-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,archivedAt:ce,startDate:l,endDate:o,entryCount:p.length,fileName:H,storageHint:i.storageHint||void 0,note:i.note||void 0};F&&(Y.note=Y.note?`${Y.note} | VACUUM fehlgeschlagen`:"VACUUM fehlgeschlagen");const Je={filters:{...c},removeAfterExport:!!i.removeAfterExport,historyIdSample:b?.historyIds?.slice(0,Fr)};if(await ol(Y,Je),!i.removeAfterExport&&b?.historyIds?.length){const E=b.historyIds.slice(0,Fr).map(C=>({source:"sqlite",ref:C}));t.events?.emit?.("documentation:focus-range",{startDate:l,endDate:o,label:"Archiviert",reason:"archive",entryIds:E})}va(e,!1),n.reset(),On(e),await Re(e,t.state.getState());const P=i.removeAfterExport?`Archiv ${H} erstellt und ${p.length} Einträge entfernt.`:`Archiv ${H} erstellt. ${p.length} Einträge bleiben in der Datenbank.`;Z(e,P,F?"warning":"success")}catch(d){console.error("Archivieren fehlgeschlagen",d);const f=d instanceof Error?d.message:"Archiv konnte nicht erstellt werden.";Z(e,f,"danger")}finally{Wr(e,!1),Ra(e,t.state.getState())}}const Al=50;async function ji(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}if(e.length>Al&&!window.confirm(`Sie möchten ${e.length} Einträge drucken. Bei sehr vielen Einträgen kann das Erstellen der Druckvorschau einige Sekunden dauern und lässt sich nicht unterbrechen.

Fortfahren?`))return;const t=M().fieldLabels,n=Ms(M().company||null);await zs(e,t,{title:"Dokumentation",headerHtml:n,chunkSize:25})}function ja(e,t){const n=URL.createObjectURL(e),a=document.createElement("a");a.href=n,a.download=t,a.click(),URL.revokeObjectURL(n)}function $l(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const t=e.map(l=>({...l})),n=JSON.stringify(t,null,2),a=new TextEncoder().encode(n),r=new Blob([a],{type:"application/json; charset=utf-8"}),i=new Date().toISOString().replace(/[:.]/g,"-");ja(r,`pflanzenschutz-dokumentation-${i}.json`)}async function Il(e,t){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const n=e.map(c=>({...c})),a={format:"pflanzenschutz-export",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:n.length,filters:{startDate:t.startDate||null,endDate:t.endDate||null,creator:t.creator||null,crop:t.crop||null}},r=vi({"pflanzenschutz.json":Dn(JSON.stringify(n,null,2)),"metadata.json":Dn(JSON.stringify(a,null,2))}),i=new ArrayBuffer(r.byteLength);new Uint8Array(i).set(r);const l=new Blob([i],{type:"application/zip"}),o=new Date().toISOString().replace(/[:.]/g,"-");ja(l,`pflanzenschutz-dokumentation-${o}.zip`)}function Cl(){const e=document.createElement("div"),t=Oa(),n=q.startDate||t.startDate||"",a=q.endDate||t.endDate||"";q={...q,startDate:n,endDate:a};const r=wt.enabled?`<button class="btn btn-outline-info btn-sm" type="button" data-action="doc-seed">+ ${wt.count} Dummy-Einträge</button>`:"";return e.className="section-inner",e.innerHTML=`
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
            <input type="date" class="form-control" id="doc-start" name="doc-start" required value="${n}" />
          </div>
          <div class="col-md-3">
            <label class="form-label" for="doc-end">Enddatum*</label>
            <input type="date" class="form-control" id="doc-end" name="doc-end" required value="${a}" />
          </div>
          <div class="col-md-3">
            <label class="form-label" for="doc-crop">Kultur (optional)</label>
            <input type="text" class="form-control" id="doc-crop" name="doc-crop" placeholder="z. B. Äpfel" value="${q.crop||""}" />
          </div>
          <div class="col-md-3">
            <label class="form-label" for="doc-creator">Anwender (optional)</label>
            <input type="text" class="form-control" id="doc-creator" name="doc-creator" placeholder="Name" value="${q.creator||""}" />
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
            <input type="date" class="form-control" id="archive-start" name="archive-start" required value="${n}" />
          </div>
          <div class="col-md-3">
            <label class="form-label" for="archive-end">Enddatum</label>
            <input type="date" class="form-control" id="archive-end" name="archive-end" required value="${a}" />
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
            <small class="text-muted">Letzte ${Ha}</small>
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
  `,e}function Bl(e){if(!e)return{};const t=new FormData(e),n=r=>{const i=t.get(r);return typeof i=="string"&&i?i:void 0},a=r=>{const i=t.get(r);if(typeof i!="string")return;const l=i.trim();return l||void 0};return{startDate:n("doc-start"),endDate:n("doc-end"),crop:a("doc-crop"),creator:a("doc-creator")}}let Vr="entries";function Ml(e,t){Vr!==t&&(Vr=t,e.querySelectorAll("[data-doc-tab]").forEach(n=>{n.classList.toggle("active",n.dataset.docTab===t)}),e.querySelectorAll("[data-pane]").forEach(n=>{n.style.display=n.dataset.pane===t?"block":"none"}))}function zl(e,t){e.addEventListener("click",n=>{const a=n.target.closest("[data-doc-tab]");if(a&&a.dataset.docTab){Ml(e,a.dataset.docTab);return}}),e.addEventListener("submit",n=>{if(n.target instanceof HTMLFormElement){if(n.target.id==="doc-filter"){n.preventDefault(),ta(e,t,{refreshList:!0});const a=Bl(n.target);if(!a.startDate||!a.endDate){window.alert("Bitte Start- und Enddatum auswählen.");return}q=a,jt(e),Re(e,t.state.getState());return}n.target.dataset.role==="archive-form"&&(n.preventDefault(),Pl(e,t,n.target))}}),e.addEventListener("click",n=>{const a=n.target;if(!a)return;const r=a.dataset.action;if(!r){a.closest("[data-action]")&&n.stopPropagation();return}if(r==="reset-filters"){const o=e.querySelector("#doc-filter");o?.reset(),q=Oa(),Ti(o??null,q),ta(e,t,{refreshList:!0}),jt(e),Re(e,t.state.getState());return}if(r==="archive-toggle"){va(e),Z(e,"");return}if(r==="archive-cancel"){va(e,!1),Z(e,"");return}if(r==="archive-log-focus"){const o=a.dataset.logId;if(!o)return;const c=Kr(t.state.getState(),o);if(!c){window.alert("Archiv-Eintrag nicht gefunden.");return}const u=c.fileName?`Archiv ${c.fileName}`:"Archivierter Zeitraum";typeof t.events?.emit=="function"?t.events.emit("documentation:focus-range",{startDate:c.startDate,endDate:c.endDate,label:u,reason:"archive-log"}):(q={...q,startDate:c.startDate,endDate:c.endDate},Re(e,t.state.getState())),Z(e,`Dokumentation auf Archiv ${c.startDate} – ${c.endDate} fokussiert.`,"success");return}if(r==="archive-log-copy-hint"){const o=a.dataset.logId;if(!o)return;const c=Kr(t.state.getState(),o);if(!c||!c.storageHint){window.alert("Kein Speicherhinweis vorhanden.");return}const u=c.storageHint;(async()=>{try{await cl(u),Z(e,"Speicherhinweis kopiert.","success")}catch(d){console.error("Hinweis konnte nicht kopiert werden",d),window.alert("Hinweis konnte nicht kopiert werden.")}})();return}if(r==="doc-focus-clear"){ta(e,t,{refreshList:!0});return}if(r==="print-selection"||r==="pdf-selection"){(async()=>{const o=await aa();await ji(o)})();return}if(r==="export-selection"){(async()=>{const o=await aa();$l(o)})();return}if(r==="export-zip"){(async()=>{const o=await aa();await Il(o,q)})();return}if(r==="delete-selection"){if(!ue.size||!window.confirm("Ausgewählte Einträge wirklich löschen?"))return;Ll(e,t);return}if(r==="doc-seed"){if(!wt.enabled||Ht)return;const c=window.__PSL?.seedHistoryEntries;if(typeof c!="function"){window.alert("Seed-Funktion ist nicht verfügbar. Bitte Entwicklungsmodus verwenden.");return}Ht=!0,ka(e),(async()=>{try{await c(wt.count),await Re(e,t.state.getState())}catch(u){console.error("Dummy-Daten konnten nicht erstellt werden",u),window.alert("Dummy-Daten konnten nicht erstellt werden.")}finally{Ht=!1,ka(e)}})();return}if(r==="detail-print"){const c=e.querySelector("#doc-detail")?.dataset.entryId;if(!c){window.alert("Kein Eintrag ausgewählt.");return}const u=it(c);if(!u){window.alert("Eintrag nicht verfügbar.");return}Ur(u);return}const i=a.dataset.entryId;if(!i)return;const l=it(i);if(!l){window.alert("Eintrag nicht verfügbar.");return}if(r==="view-entry"){Gi(e,l,t.state.getState().fieldLabels);return}if(r==="print-entry"){Ur(l);return}}),e.addEventListener("change",n=>{const a=n.target;if(!a)return;if(a.dataset.action==="toggle-select-all"){El(e,a.checked);return}if(a.dataset.action!=="toggle-select")return;const r=a.dataset.entryId;if(r){if(a.checked){ue.add(r);const i=it(r);i&&je.set(r,i)}else ue.delete(r),je.delete(r);Rn(e)}})}function ql(e,t){if(!e||Hr)return;const n=e;n.innerHTML="";const a=Cl();n.appendChild(a),zl(a,t),ka(a),Ra(a,t.state.getState()),On(a);const r=t.state.getState().archives?.logs??[];Gt(a,r),bn=ya(r),Wa(),typeof t.events?.subscribe=="function"&&t.events.subscribe("documentation:focus-range",o=>{!o||typeof o!="object"||Zo(a,t,o)});const i=o=>he(o.history).length,l=()=>Re(a,t.state.getState());Rr?.(),Rr=Mi({section:"documentation",event:"history:data-changed",shouldHandleEvent:()=>U==="sqlite",shouldRefresh:()=>U==="sqlite",onRefresh:()=>l(),onStatusChange:o=>Uo(a,o)}),It=i(t.state.getState()),l(),t.state.subscribe(o=>{const c=ya(o.archives?.logs);c!==bn&&(bn=c,Gt(a,o.archives?.logs??[]));const u=i(o);if(ha){It=u;return}if(U==="sqlite"){It=u;return}u!==It&&(It=u,l())}),Hr=!0}const Vt=e=>he(e.gps.points),zt=e=>he(e.points),Fl=new Intl.NumberFormat("de-DE",{minimumFractionDigits:5,maximumFractionDigits:5}),Nl=new Intl.DateTimeFormat("de-DE",{dateStyle:"short",timeStyle:"short"}),Zr="Deutschland";let Qr=!1,Ui="list",pn=null,x=null,Ct=null,Jr=null;const vn=25,ra=new Intl.NumberFormat("de-DE");let Q=0,ut=null,xa=null,Yr=null;function ct(e,t){typeof e.events?.emit=="function"&&e.events.emit("history:gps-activation-result",{...t,source:"gps",timestamp:Date.now()})}function Ot(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Tl(){const e=document.createElement("section");return e.className="section-inner",e.innerHTML=`
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
  `,e}function Hl(e){return{root:e,message:e.querySelector('[data-role="gps-message"]'),refreshIndicator:e.querySelector('[data-role="gps-refresh-indicator"]'),availability:e.querySelector('[data-role="gps-availability"]'),tabButtons:Array.from(e.querySelectorAll('[data-role="gps-tab"]')),panels:Array.from(e.querySelectorAll('[data-role="gps-panel"]')),listBody:e.querySelector('[data-role="gps-list"]'),emptyState:e.querySelector('[data-role="gps-empty"]'),activeInfo:e.querySelector('[data-role="gps-active-info"]'),summaryLabel:e.querySelector('[data-role="gps-summary"]'),statusBadge:e.querySelector('[data-role="gps-status"]'),form:e.querySelector('[data-role="gps-form"]'),formFields:{name:e.querySelector('[name="gps-name"]'),description:e.querySelector('[name="gps-description"]'),latitude:e.querySelector('[name="gps-latitude"]'),longitude:e.querySelector('[name="gps-longitude"]'),source:e.querySelector('[name="gps-source"]'),activate:e.querySelector('[name="gps-activate"]'),rawCoordinates:e.querySelector('[name="gps-raw-coordinates"]')},disableTargets:Array.from(e.querySelectorAll("[data-gps-disable]")),geolocationBtn:e.querySelector('[data-action="use-geolocation"]'),mapButton:e.querySelector('[data-role="gps-open-maps"]'),verifyButton:e.querySelector('[data-action="verify-coords"]')}}function qt(e){return`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e)}`}function Vi(e){const t=e.gps,n=zt(t),a=l=>{if(!l)return null;const o=Jt(l)||qt(`${l.latitude},${l.longitude}`),c=l.name?`${l.name}`:`${kt(l.latitude)}, ${kt(l.longitude)}`;return{url:o,label:c}};if(t.activePointId){const l=n.find(c=>c.id===t.activePointId),o=a(l||null);if(o)return o}if(n.length>0){const l=a(n[0]);if(l)return l}const r=e.company?.address?.trim();if(r)return{url:qt(r.replace(/\n/g,", ")),label:r};const i=e.company?.name?.trim();return i?{url:qt(i),label:i}:{url:qt(Zr),label:Zr}}function Ol(e){if(!x)return;const t=Vi(e);x.mapButton&&(x.mapButton.href=t.url,x.mapButton.title=`Google Maps öffnen (${t.label})`);const n=x.root.querySelector('[data-role="gps-empty-map-link"]');n&&(n.href=t.url)}function _l(e){if(!e)return null;const n=e.trim().replace(/\s+/g," ").replace(/[,;]/g," ").match(/-?\d+(?:[.,]\d+)?/g);if(!n||n.length<2)return null;const a=l=>Number(l.replace(/,/g,".")),r=a(n[0]),i=a(n[1]);return!Number.isFinite(r)||!Number.isFinite(i)||r<-90||r>90||i<-180||i>180?null:{latitude:r,longitude:i}}function Rl(){if(!x?.formFields)return null;const e=x.formFields.latitude?.value??"",t=x.formFields.longitude?.value??"";if(!e.trim()||!t.trim())return null;const n=Number(e),a=Number(t);return!Number.isFinite(n)||!Number.isFinite(a)||n<-90||n>90||a<-180||a>180?null:{latitude:n,longitude:a}}function fn(e){return Number(e).toFixed(6)}function Wl(e,t){const n=fn(e),a=fn(t);return Vt(M()).some(r=>fn(r.latitude)===n&&fn(r.longitude)===a)}function _t(){if(!x?.verifyButton)return;const e=Rl(),t=!!e;if(x.verifyButton.disabled=!t,e){const n=Jt({latitude:e.latitude,longitude:e.longitude});x.verifyButton.dataset.targetUrl=n||qt(`${e.latitude},${e.longitude}`)}else delete x.verifyButton.dataset.targetUrl}function kt(e){const t=Number(e);return Number.isFinite(t)?`${Fl.format(t)}°`:"–"}function Kl(e){if(!e)return"–";const t=new Date(e);return Number.isNaN(t.getTime())?"–":Nl.format(t)}function _(e,t="info",n=4500){if(x?.message){if(pn&&(window.clearTimeout(pn),pn=null),!e){x.message.classList.add("d-none"),x.message.textContent="";return}x.message.className=`alert alert-${t}`,x.message.textContent=e,x.message.classList.remove("d-none"),n>0&&(pn=window.setTimeout(()=>{x?.message?.classList.add("d-none")},n))}}function Gl(e){const t=x?.refreshIndicator;if(t){if(t.classList.remove("alert-warning","alert-info"),e==="idle"){t.classList.add("d-none");return}t.classList.remove("d-none"),e==="stale"?(t.classList.add("alert-warning"),t.textContent="GPS-Daten wurden geändert. Ansicht aktualisiert sich beim Öffnen."):(t.classList.add("alert-info"),t.textContent="GPS-Daten werden aktualisiert...")}}function Zi(e){x&&(Ui=e,x.tabButtons.forEach(t=>{const n=t.dataset.tab===e;t.classList.toggle("active",n)}),x.panels.forEach(t=>{const n=t.getAttribute("data-panel")===e;t.classList.toggle("d-none",!n)}))}function pe(e){return e?.hasDatabase?e.storageDriver!=="sqlite"?"wrong-driver":"ok":"no-db"}function jl(e){if(x?.availability){if(e==="ok"){x.availability.classList.add("d-none"),x.availability.textContent="";return}x.availability.classList.remove("d-none"),x.availability.textContent=e==="no-db"?"Bitte verbinden Sie zuerst eine Datenbank, um GPS-Punkte zu verwalten.":"GPS-Funktionen benötigen eine aktive SQLite-Datenbank. Bitte den SQLite-Treiber in den Einstellungen auswählen."}}function bt(e,t){if(!x)return;const n=t!=="ok"||e.pending||Kt.isLocked();if(x.disableTargets.forEach(a=>{(a instanceof HTMLButtonElement||a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a instanceof HTMLSelectElement)&&(a.disabled=n)}),x.statusBadge){let a="badge bg-success",r="Bereit";t==="no-db"?(a="badge bg-secondary",r="Keine Datenbank"):t==="wrong-driver"?(a="badge bg-warning text-dark",r="Nur mit SQLite"):(e.pending||Kt.isLocked())&&(a="badge bg-info text-dark",r="Wird verarbeitet"),x.statusBadge.className=a,x.statusBadge.textContent=r}}function Qi(e){const t=e.length;if(!t)return Q=0,{total:0,start:0,end:0,items:[]};const n=Math.max(Math.ceil(t/vn),1);Q>=n&&(Q=n-1),Q<0&&(Q=0);const a=Q*vn,r=Math.min(a+vn,t);return{total:t,start:a,end:r,items:e.slice(a,r)}}function Ul(){if(!x?.root)return null;const e=x.root.querySelector('[data-role="gps-pager"]');return e?((!ut||xa!==e)&&(ut?.destroy(),ut=Yt(e,{onPrev:()=>Zl(),onNext:()=>Ql(),labels:{prev:"Zurück",next:"Weiter",loading:"GPS-Punkte werden geladen...",empty:"Keine GPS-Punkte verfügbar"}}),xa=e),ut):null}function Xr(e,t){const n=Ul();if(!n)return;if(t!=="ok"){Q=0;const l=t==="no-db"?"Keine Datenbank verbunden.":"Nur mit SQLite verfügbar.";n.update({status:"disabled",info:l});return}const a=Vt(e).length;if(!a){Q=0;const l=e.gps.initialized?"Noch keine GPS-Punkte vorhanden.":"GPS-Punkte werden geladen...";n.update({status:"disabled",info:l});return}const{start:r,end:i}=Qi(Vt(e));n.update({status:"ready",info:`Einträge ${ra.format(r+1)}–${ra.format(i)} von ${ra.format(a)}`,canPrev:Q>0,canNext:i<a})}function Vl(e,t){return e.length?e.map(n=>{const a=n.id===t,r=n.description?`<div class="text-muted small">${v(n.description)}</div>`:"",i=n.source?`<span class="badge-psm badge-psm-neutral">${v(n.source)}</span>`:'<span class="text-muted">–</span>',l=a?'<span class="badge bg-success ms-2">Aktiv</span>':"",o=Jt(n),c=o?`<a class="btn btn-outline-info" href="${Ot(o)}" target="_blank" rel="noopener noreferrer">
              Karte
            </a>`:"";return`
        <tr data-point-id="${Ot(n.id)}">
          <td>
            <div class="fw-semibold">${v(n.name||"Ohne Namen")}${l}</div>
            ${r}
          </td>
          <td class="font-monospace">
            <div>${kt(n.latitude)}</div>
            <div>${kt(n.longitude)}</div>
          </td>
          <td>
            <div>${i}</div>
            <div class="text-muted small">${Kl(n.updatedAt)}</div>
          </td>
          <td class="text-end">
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-success" data-action="set-active" ${a?"disabled":""}>
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
`):""}function Ua(e,t){if(!x)return;const n=e.gps,a=Vi(e),r=t==="ok";if(x.summaryLabel){const i=zt(n).length;x.summaryLabel.textContent=r?`${i} Punkt${i===1?"":"e"} gespeichert`:"Funktion derzeit nicht verfügbar"}if(!r){x.listBody&&(x.listBody.innerHTML=""),x.emptyState&&(x.emptyState.textContent=t==="no-db"?"Keine Datenbank verbunden.":"Bitte SQLite als Speicher-Treiber aktivieren.",x.emptyState.classList.remove("d-none")),x.activeInfo&&(x.activeInfo.textContent=t==="no-db"?"Wartet auf Datenbank.":"Nur mit SQLite verfügbar."),Xr(e,t);return}if(x.listBody){const{items:i}=Qi(zt(n));x.listBody.innerHTML=Vl(i,n.activePointId)}if(x.emptyState){const i=zt(n).length>0;x.emptyState.classList.toggle("d-none",i),!i&&n.initialized?x.emptyState.innerHTML=`
        <p class="mb-2">Noch keine GPS-Punkte vorhanden.</p>
        <p class="small text-muted mb-3">
          Nutzen Sie "Neuer Punkt" oder öffnen Sie Google Maps, um Koordinaten zu ermitteln.
        </p>
        <a class="btn btn-outline-info btn-sm" data-role="gps-empty-map-link" href="${Ot(a.url)}" target="_blank" rel="noopener noreferrer">
          <i class="bi bi-box-arrow-up-right me-1"></i>
          Google Maps öffnen
        </a>
      `:n.initialized||(x.emptyState.textContent="GPS-Punkte werden geladen...")}if(x.activeInfo)if(n.activePointId){const i=zt(n).find(l=>l.id===n.activePointId);if(i){const l=`${i.name||"Ohne Namen"} (${kt(i.latitude)}, ${kt(i.longitude)})`,o=Jt(i);o?x.activeInfo.innerHTML=`${v(l)} <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${Ot(o)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:x.activeInfo.textContent=l}else x.activeInfo.textContent="Aktiver Punkt nicht gefunden."}else x.activeInfo.innerHTML=`Kein aktiver Punkt ausgewählt. <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${Ot(a.url)}" target="_blank" rel="noopener noreferrer">Google Maps öffnen</a>`;Xr(e,t)}function Zl(){if(Q===0)return;Q=Math.max(Q-1,0);const e=M(),t=pe(e.app);Ua(e,t)}function Ql(){const e=M(),t=Vt(e).length;if(!t)return;const n=Math.max(Math.ceil(t/vn)-1,0);if(Q>=n)return;Q=Math.min(Q+1,n);const a=pe(e.app);Ua(e,a)}function ae(e){`${new Date().toLocaleString("de-DE")}${e}`}function en(e){if(!e)return null;const t=M();return Vt(t).find(n=>n.id===e)||null}async function Jl(e){if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(e);return}const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}function Yl(){if(!x?.formFields?.rawCoordinates)return;const e=x.formFields.rawCoordinates.value,t=_l(e);if(!t){_("Koordinaten konnten nicht erkannt werden. Bitte Format 47.68952, 9.12091 verwenden.","warning",6e3);return}const n=t.latitude.toFixed(6),a=t.longitude.toFixed(6);x.formFields.latitude&&(x.formFields.latitude.value=n),x.formFields.longitude&&(x.formFields.longitude.value=a),_("Koordinaten übernommen.","success"),_t()}function Xl(){if(!x?.verifyButton)return;const e=x.verifyButton.dataset.targetUrl;if(!e){_("Bitte zuerst gültige Koordinaten eintragen, bevor die Prüfung geöffnet wird.","warning",6e3);return}window.open(e,"_blank","noopener,noreferrer")}async function Ea(e={}){const{notify:t=!1}=e;if(!(!x||pe(M().app)!=="ok"||M().gps.pending))try{await gi(),t&&_("GPS-Punkte aktualisiert.","success"),ae("GPS-Punkte synchronisiert.")}catch(a){const r=a instanceof Error?a.message:"GPS-Punkte konnten nicht geladen werden.";_(r,"danger",7e3),ae(`Fehler beim Laden: ${r}`)}}async function ec(e){if(!e)return;const t=en(e);if(!t){_("Ausgewählter GPS-Punkt wurde nicht gefunden.","warning");return}try{await yi(t.id),_(`"${t.name}" ist nun aktiv.`,"success"),ae(`Aktiver GPS-Punkt: ${t.name}`)}catch(n){const a=n instanceof Error?n.message:"GPS-Punkt konnte nicht aktiviert werden.";_(a,"danger",7e3),ae(`Fehler beim Aktivieren: ${a}`)}}async function tc(e){if(!e)return;const t=en(e);if(!t){_("GPS-Punkt existiert nicht mehr.","warning");return}if(window.confirm(`"${t.name}" wirklich löschen? Dieser Schritt kann nicht rückgängig gemacht werden.`))try{await Ws(t.id),_(`"${t.name}" wurde gelöscht.`,"success"),ae(`GPS-Punkt gelöscht: ${t.name}`)}catch(a){const r=a instanceof Error?a.message:"GPS-Punkt konnte nicht gelöscht werden.";_(r,"danger",7e3),ae(`Löschen fehlgeschlagen: ${r}`)}}async function nc(e){if(!e)return;const t=en(e);if(!t){_("GPS-Punkt nicht gefunden.","warning");return}const n=`${t.latitude}, ${t.longitude}`;try{await Jl(n),_("Koordinaten in die Zwischenablage kopiert.","success")}catch(a){console.error("clipboard error",a),_("Koordinaten konnten nicht kopiert werden.","danger",7e3)}}async function ac(e,t){const n=(e||"").trim();if(!n){ct(t,{status:"error",id:"",message:"Ungültige GPS-Anfrage ohne ID."});return}if(pe(M().app)!=="ok"){_("GPS-Modul ist ohne aktive SQLite-Datenbank nicht verfügbar.","warning",6e3),ct(t,{status:"error",id:n,message:"GPS-Modul ist derzeit nicht verfügbar."});return}const r=en(n);if(!r){_("Verknüpfter GPS-Punkt wurde nicht gefunden.","warning",6e3),ct(t,{status:"error",id:n,message:"Verknüpfter GPS-Punkt wurde nicht gefunden."});return}ct(t,{status:"pending",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wird aktiviert...`});try{await yi(r.id),_(`"${r.name||"Ohne Namen"}" wurde aus der Historie aktiviert.`,"success"),ae(`Aus Historie aktiviert: ${r.name||r.id}`),ct(t,{status:"success",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wurde aktiviert.`})}catch(i){const l=i instanceof Error?i.message:"GPS-Punkt konnte nicht aktiviert werden.";_(l,"danger",7e3),ae(`Aktivierung aus Historie fehlgeschlagen: ${l}`),ct(t,{status:"error",id:r.id,name:r.name,message:l})}}async function rc(){try{await Ks(),ae("Aktiver GPS-Punkt synchronisiert."),_("Aktiver GPS-Punkt wurde synchronisiert.","success")}catch(e){const t=e instanceof Error?e.message:"Aktiver GPS-Punkt konnte nicht ermittelt werden.";_(t,"danger",7e3),ae(`Sync fehlgeschlagen: ${t}`)}}function ic(){if(!x?.formFields)throw new Error("Formular nicht initialisiert");const e=x.formFields.name?.value.trim()||"",t=x.formFields.description?.value.trim()||"",n=x.formFields.source?.value.trim()||"",a=Number(x.formFields.latitude?.value),r=Number(x.formFields.longitude?.value),i=!!x.formFields.activate?.checked;if(!e)throw new Error("Name darf nicht leer sein.");if(!Number.isFinite(a)||!Number.isFinite(r))throw new Error("Koordinaten sind ungültig.");return{name:e,description:t,latitude:a,longitude:r,source:n,activate:i}}async function sc(e){if(e.preventDefault(),Kt.isLocked()){_("Speichern läuft bereits ...","info");return}try{const t=ic();if(Wl(t.latitude,t.longitude)){_("Ein GPS-Punkt mit identischen Koordinaten ist bereits vorhanden.","warning",6e3);return}bt(M().gps,pe(M().app)),await Gs({name:t.name,description:t.description||null,latitude:t.latitude,longitude:t.longitude,source:t.source||null},{activate:t.activate}),B.success(`GPS-Punkt "${t.name}" gespeichert.`),ae(`GPS-Punkt gespeichert${t.activate?" und aktiv gesetzt":""}: ${t.name}`),x?.form?.reset()}catch(t){const n=t instanceof Error?t.message:"GPS-Punkt konnte nicht gespeichert werden.";B.error(n),ae(`Speichern fehlgeschlagen: ${n}`)}finally{bt(M().gps,pe(M().app))}}function oc(){if(x?.formFields){if(!navigator.geolocation){B.warning("Geolocation wird von diesem Browser nicht unterstützt.");return}if(Kt.isLocked()){B.info("Bitte warten...");return}Kt.acquire(async()=>(bt(M().gps,pe(M().app)),new Promise(e=>{navigator.geolocation.getCurrentPosition(t=>{const{latitude:n,longitude:a}=t.coords;x?.formFields.latitude&&(x.formFields.latitude.value=n.toFixed(6)),x?.formFields.longitude&&(x.formFields.longitude.value=a.toFixed(6)),x?.formFields.source&&!x.formFields.source.value.trim()&&(x.formFields.source.value="Browser"),B.success("Koordinaten aus Browser-Position übernommen."),ae("Browser-Geolocation übernommen"),_t(),bt(M().gps,pe(M().app)),e()},t=>{const n=t.code===t.PERMISSION_DENIED?"Zugriff auf Standort wurde verweigert.":"Geolocation konnte nicht ermittelt werden.";B.warning(n),ae(`Geolocation fehlgeschlagen: ${n}`),bt(M().gps,pe(M().app)),e()},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})})))}}function lc(){x&&(x.root.addEventListener("click",e=>{const t=e.target;if(!t)return;const n=t.closest('[data-role="gps-tab"]');if(n&&n.dataset.tab){Zi(n.dataset.tab);return}const a=t.closest("[data-action]");if(!a||a.dataset.action==="")return;const i=a.closest("[data-point-id]")?.getAttribute("data-point-id")||"";switch(a.dataset.action){case"reload-points":Ea({notify:!0});break;case"sync-active":rc();break;case"set-active":ec(i);break;case"delete-point":tc(i);break;case"copy-coords":nc(i);break;case"use-geolocation":oc();break;case"apply-raw-coords":Yl();break;case"verify-coords":Xl();break}}),x.form?.addEventListener("submit",e=>{sc(e)}),x.form?.addEventListener("reset",()=>{window.setTimeout(()=>{_t()},0)}),x.formFields.latitude?.addEventListener("input",()=>{_t()}),x.formFields.longitude?.addEventListener("input",()=>{_t()}))}function cc(e,t){if(!e||Qr)return;Qr=!0;const n=e;n.innerHTML="";const a=Tl();n.appendChild(a),x=Hl(a),Yr?.(),Yr=Mi({section:"gps",event:"gps:data-changed",shouldHandleEvent:()=>pe(t.state.getState().app)==="ok",shouldRefresh:()=>pe(t.state.getState().app)==="ok",onRefresh:()=>Ea({notify:!1}),onStatusChange:l=>Gl(l)}),Q=0,ut?.destroy(),ut=null,xa=null,lc(),Zi(Ui),typeof t.events?.subscribe=="function"&&t.events.subscribe("gps:set-active-from-history",l=>{let o="";if(l&&typeof l=="object"&&(o=String(l.id||"").trim()),!o){_("Historische GPS-Anfrage ohne gültige ID erhalten.","warning",6e3);return}ac(o,t)});const r=t.state.getState();Ct=r.gps.activePointId;const i=(l,o)=>{const c=pe(l.app),u=l.gps;if(jl(c),Ua(l,c),bt(u,c),Ol(l),c==="ok"&&!u.initialized&&!u.pending&&Ea({notify:!1}),c==="ok"&&Jr!=="ok"&&u.initialized&&_("GPS-Bereich ist wieder verfügbar.","success"),Jr=c,l.gps.activePointId!==Ct&&(Ct=l.gps.activePointId,typeof t.events?.emit=="function")){const d=en(Ct);t.events.emit("gps:active-point-changed",{id:Ct,point:d})}l.gps.lastError&&l.gps.lastError!==o.gps.lastError&&(_(l.gps.lastError,"danger",7e3),ae(`Fehler: ${l.gps.lastError}`))};t.state.subscribe(i),i(r,r)}let se=[],oe=[],La=!1,yn=null;async function Ae(){try{const[e,t]=await Promise.all([Qs({limit:100}),Js({limit:100})]);se=e.items||[],oe=t.items||[],En("savedCodes:changed",{eppoCount:se.length,bbchCount:oe.length})}catch(e){console.error("Failed to load saved codes:",e),se=[],oe=[]}}function dc(){const e=se.length>0,t=oe.length>0;return`
    <div class="row g-4">
      <!-- EPPO Codes Section -->
      <div class="col-lg-6">
        <div class="card card-dark codes-card h-100">
          <div class="card-header codes-card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="bi bi-flower1 me-2 text-success"></i>
              Kulturen (EPPO-Codes)
            </h5>
            <span class="badge badge-psm-neutral">${se.length} gespeichert</span>
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
                  <span class="badge bg-success ms-2">${se.length}</span>
                </h6>
                <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${Da()}
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
            <span class="badge badge-psm-neutral">${oe.length} gespeichert</span>
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
                  <span class="badge bg-info ms-2">${oe.length}</span>
                </h6>
                <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${Pa()}
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
  `}function Da(){return se.length?se.map(e=>`
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
    `}function Pa(){return oe.length?oe.map(e=>`
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
    `}function $e(e){const t=e.querySelector('[data-role="saved-eppo-list"]'),n=se.length>0;if(t){const o=t.closest(".border-top");o&&n&&(o.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Kulturen
            <span class="badge bg-success ms-2">${se.length}</span>
          </h6>
          <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Da()}
          </div>
        `)}else if(n){const o=e.querySelector(".codes-card:first-child .border-top.pt-3.mb-3");o&&(o.innerHTML=`
        <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
          <i class="bi bi-bookmark-star me-1"></i>
          Meine Kulturen
          <span class="badge bg-success ms-2">${se.length}</span>
        </h6>
        <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
          ${Da()}
        </div>
      `)}const a=e.querySelector('[data-role="saved-bbch-list"]'),r=oe.length>0;if(a){const o=a.closest(".border-top");o&&r&&(o.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${oe.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Pa()}
          </div>
        `)}else if(r){const c=e.querySelectorAll(".codes-card")[1];if(c){const u=c.querySelector(".border-top.pt-3.mb-3");u&&(u.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${oe.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${Pa()}
          </div>
        `)}}const i=e.querySelector(".codes-card:first-child .card-header .badge"),l=e.querySelector(".codes-card:last-child .card-header .badge");i&&(i.textContent=`${se.length} gespeichert`),l&&(l.textContent=`${oe.length} gespeichert`)}function uc(e){const t=e.querySelector('[data-input="eppo-search"]'),n=e.querySelector('[data-role="eppo-search-results"]');if(t&&n){const o=hr(async()=>{const c=t.value.trim();if(c.length<2){n.innerHTML="";return}try{const u=await Vs(c,10);if(!u.length){n.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${v(c)}"</div>
          `;return}n.innerHTML=u.map(d=>`
          <button type="button" class="list-group-item list-group-item-action" 
                  data-action="select-eppo" 
                  data-code="${v(d.code)}" 
                  data-name="${v(d.name)}"
                  data-language="${v(d.language||"")}"
                  data-dtcode="${v(d.dtcode||"")}">
            <strong class="text-success">${v(d.code)}</strong>
            <span class="ms-2">${v(d.name)}</span>
            ${d.dtcode?`<small class="text-muted ms-2">(${v(d.dtcode)})</small>`:""}
          </button>
        `).join("")}catch(u){console.error("EPPO search failed:",u),n.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);t.addEventListener("input",o)}const a=e.querySelector('[data-input="bbch-search"]'),r=e.querySelector('[data-role="bbch-search-results"]');if(a&&r){const o=hr(async()=>{const c=a.value.trim();if(c.length<1){r.innerHTML="";return}try{const u=await Zs(c,10);if(!u.length){r.innerHTML=`
            <div class="list-group-item text-muted">Keine Ergebnisse für "${v(c)}"</div>
          `;return}r.innerHTML=u.map(d=>`
          <button type="button" class="list-group-item list-group-item-action d-flex align-items-start gap-2 py-2" 
                  data-action="select-bbch" 
                  data-code="${v(d.code)}" 
                  data-label="${v(d.label)}"
                  data-principal="${d.principalStage??""}"
                  data-secondary="${d.secondaryStage??""}">
            <strong class="text-info flex-shrink-0" style="min-width: 35px;">${v(d.code)}</strong>
            <span class="text-break" style="line-height: 1.4;">${v(d.label)}</span>
          </button>
        `).join("")}catch(u){console.error("BBCH search failed:",u),r.innerHTML=`
          <div class="list-group-item text-danger">Suche fehlgeschlagen</div>
        `}},300);a.addEventListener("input",o)}e.dataset.codesClickBound!=="1"&&(e.dataset.codesClickBound="1",e.addEventListener("click",async o=>{const u=o.target.closest("[data-action]");if(!u)return;const d=u.dataset.action;if(d==="select-eppo"){const f=u.dataset.code||"",b=u.dataset.name||"",S=u.dataset.language||"",p=u.dataset.dtcode||"";if(!f||!b){console.warn("EPPO selection missing code or name");return}n&&(n.innerHTML=""),t&&(t.value="");const y=se.find(w=>w.code.toUpperCase()===f.toUpperCase());if(y){const w=e.querySelector(`[data-eppo-id="${y.id}"]`);w&&(w.classList.add("flash-highlight"),setTimeout(()=>w.classList.remove("flash-highlight"),800));return}try{await Yn({code:f,name:b,language:S||void 0,dtcode:p||void 0,isFavorite:!1});const w=me();await ge(w),await Ae(),$e(e)}catch(w){console.error("Failed to save EPPO from search:",w),alert("Speichern fehlgeschlagen")}}if(d==="select-bbch"){const f=u.dataset.code||"",b=u.dataset.label||"",S=u.dataset.principal,p=u.dataset.secondary,y=S?parseInt(S,10):void 0,w=p?parseInt(p,10):void 0;if(!f||!b){console.warn("BBCH selection missing code or label");return}r&&(r.innerHTML=""),a&&(a.value="");const I=oe.find(L=>L.code===f);if(I){const L=e.querySelector(`[data-bbch-id="${I.id}"]`);L&&(L.classList.add("flash-highlight"),setTimeout(()=>L.classList.remove("flash-highlight"),800));return}try{await Xn({code:f,label:b,principalStage:Number.isNaN(y)?void 0:y,secondaryStage:Number.isNaN(w)?void 0:w,isFavorite:!1});const L=me();await ge(L),await Ae(),$e(e)}catch(L){console.error("Failed to save BBCH from search:",L),alert("Speichern fehlgeschlagen")}}if(d==="toggle-favorite-eppo"){const f=u.dataset.id;if(!f)return;const b=se.find(S=>S.id===f);if(!b)return;try{await Yn({id:b.id,code:b.code,name:b.name,language:b.language,dtcode:b.dtcode,isFavorite:!b.isFavorite});const S=me();await ge(S),await Ae(),$e(e)}catch(S){console.error("Failed to toggle EPPO favorite:",S)}}if(d==="toggle-favorite-bbch"){const f=u.dataset.id;if(!f)return;const b=oe.find(S=>S.id===f);if(!b)return;try{await Xn({id:b.id,code:b.code,label:b.label,principalStage:b.principalStage,secondaryStage:b.secondaryStage,isFavorite:!b.isFavorite});const S=me();await ge(S),await Ae(),$e(e)}catch(S){console.error("Failed to toggle BBCH favorite:",S)}}if(d==="delete-eppo"){const f=u.dataset.id;if(!f||!confirm("EPPO-Code wirklich löschen?"))return;try{await js({id:f});const b=me();await ge(b),await Ae(),$e(e)}catch(b){console.error("Failed to delete EPPO:",b)}}if(d==="delete-bbch"){const f=u.dataset.id;if(!f||!confirm("BBCH-Stadium wirklich löschen?"))return;try{await Us({id:f});const b=me();await ge(b),await Ae(),$e(e)}catch(b){console.error("Failed to delete BBCH:",b)}}}));const i=e.querySelector('[data-form="add-eppo"]');i&&i.addEventListener("submit",async o=>{o.preventDefault();const c=e.querySelector('[data-input="eppo-code"]'),u=e.querySelector('[data-input="eppo-name"]'),d=e.querySelector('[data-input="eppo-favorite"]'),f=c?.value.trim(),b=u?.value.trim();if(!f||!b){alert("Bitte Code und Name eingeben");return}try{await Yn({code:f,name:b,isFavorite:d?.checked||!1});const S=me();await ge(S),await Ae(),$e(e),c&&(c.value=""),u&&(u.value=""),d&&(d.checked=!1)}catch(S){console.error("Failed to save EPPO:",S),alert("Speichern fehlgeschlagen")}});const l=e.querySelector('[data-form="add-bbch"]');l&&l.addEventListener("submit",async o=>{o.preventDefault();const c=e.querySelector('[data-input="bbch-code"]'),u=e.querySelector('[data-input="bbch-label"]'),d=e.querySelector('[data-input="bbch-favorite"]'),f=c?.value.trim(),b=u?.value.trim();if(!f||!b){alert("Bitte Code und Bezeichnung eingeben");return}try{await Xn({code:f,label:b,isFavorite:d?.checked||!1});const S=me();await ge(S),await Ae(),$e(e),c&&(c.value=""),u&&(u.value=""),d&&(d.checked=!1)}catch(S){console.error("Failed to save BBCH:",S),alert("Speichern fehlgeschlagen")}})}function pc(e,t,n={}){if(!e||La)return;yn=e,La=!0,yn.innerHTML=`
    <div class="section-inner codes-manager">
      <h4 class="mb-3"><i class="bi bi-tags me-2"></i>EPPO & BBCH Codes</h4>
      ${dc()}
    </div>`;const a=yn.querySelector(".codes-manager");if(!a)return;uc(a);const r=async()=>{await Ae(),$e(a)};t?.events?.subscribe?.("database:connected",()=>{r()}),t?.state?.getState?.().app?.hasDatabase&&r()}function fc(){La=!1,yn=null}let ei=!1,Ce=null,Ft=null,wn=null,Nt=null,et=null,In=null,Be=null,Zt=null,Cn=null,Me=null,Aa=null,Ie=null,J=new Set,We=null,ia=!1,sa=!1,ht=!1;const ve=e=>he(e.mediums),kn=25,oa=new Intl.NumberFormat("de-DE");let ne=0,pt=null,$a=null,Ia=null,Va=null;function mc(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function gc(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`profile-${Date.now()}-${Math.random().toString(16).slice(2,10)}`}function Ji(e){if(!J.size)return;const t=new Set(ve(e).map(a=>a.id));let n=!1;J.forEach(a=>{t.has(a)||(J.delete(a),n=!0)}),n&&(J=new Set(J))}function Bn(){Ce&&Ce.querySelectorAll('[data-role="profile-select"]').forEach(e=>{const t=e.dataset.mediumId;e.checked=!!(t&&J.has(t))})}function Ke(e){const t=ve(e).length,n=J.size;let a="Noch keine Mittel ausgewählt.";t?n===t&&t>0?a=`${n} Mittel ausgewählt (alle).`:n>0&&(a=`${n} Mittel ausgewählt.`):a="Keine Mittel vorhanden.",Aa&&(Aa.textContent=a),Ie&&(Ie.disabled=t===0,Ie.indeterminate=n>0&&n<t,Ie.checked=t>0&&n===t)}function Sn(e){We=null,In&&In.reset(),Zt&&(Zt.value=""),Be&&(Be.value=""),Me&&(Me.textContent="Profil speichern"),J=new Set,Bn(),Ke(e)}function bc(e,t){We=e.id,Zt&&(Zt.value=e.id),Be&&(Be.value=e.name,Be.focus()),Me&&(Me.textContent="Profil aktualisieren"),J=new Set(e.mediumIds),Bn(),Ke(t)}function ti(e,t){if(Me){if(Me.disabled=e,e){Me.textContent=t||"Speichert...";return}Me.textContent=We?"Profil aktualisieren":"Profil speichern"}}function Mn(e,t){if(Ft){if(Ft.disabled=e,e){Ft.textContent=t||"Speichert...";return}Ft.textContent="Hinzufügen"}}async function hc(e,t,n){if(ht)return;const a=t.state.getState(),i=(ve(a)[e]??null)?.id||null;ht=!0,Mn(!0);const l=n?.textContent??null;n&&(n.disabled=!0,n.textContent="Lösche...");try{t.state.updateSlice("mediums",c=>{const u=Qt(c),d=u.items.slice();return d.splice(e,1),{...u,items:d,totalCount:Math.min(u.totalCount,d.length),lastUpdatedAt:new Date().toISOString()}}),await zn({silent:!0})&&i&&t.events?.emit?.("mediums:data-changed",{action:"deleted",id:i})}finally{ht=!1,Mn(!1),n&&n.isConnected&&(n.disabled=!1,n.textContent=l??"Löschen")}}async function vc(e,t,n){const a=n?.textContent??null;n&&(n.disabled=!0,n.textContent="Lösche...");try{t.state.updateSlice("mediumProfiles",(r=[])=>r.filter(i=>i.id!==e.id)),We===e.id&&Sn(t.state.getState()),await zn({successMessage:"Profil gelöscht."})}finally{n&&(n.disabled=!1,n.textContent=a||"Löschen")}}function yc(e){if(!Cn)return;const t=Cn,n=e.mediumProfiles||[];if(!n.length){t.innerHTML=`
      <tr>
        <td colspan="3" class="text-center text-muted">Noch keine Profile erstellt.</td>
      </tr>
    `;return}const a=new Map(ve(e).map(r=>[r.id,r]));t.innerHTML="",n.forEach(r=>{const i=document.createElement("tr"),l=r.mediumIds.map(c=>a.get(c)).filter(Boolean).map(c=>v(c.name)),o=l.length?l.join(", "):'<span class="text-muted">Keine gültigen Mittel</span>';i.innerHTML=`
      <td>${v(r.name)}</td>
      <td>${o}</td>
      <td>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-sm btn-outline-info" data-action="profile-edit" data-id="${v(r.id)}">Bearbeiten</button>
          <button class="btn btn-sm btn-outline-danger" data-action="profile-delete" data-id="${v(r.id)}">Löschen</button>
        </div>
      </td>
    `,t.appendChild(i)})}function wc(e,t){if(ia||!e.mediumProfiles?.length)return;const n=new Set(ve(e).map(i=>i.id));let a=!1;const r=e.mediumProfiles.map(i=>{const l=i.mediumIds.filter(o=>n.has(o));return l.length!==i.mediumIds.length?(a=!0,{...i,mediumIds:l,updatedAt:new Date().toISOString()}):i}).filter(i=>i.mediumIds.length?!0:(a=!0,!1));a&&(ia=!0,t.state.updateSlice("mediumProfiles",()=>r),ia=!1)}function Yi(e){if(!e)return ne=0,{start:0,end:0,total:0};const t=Math.max(Math.ceil(e/kn),1);ne>=t&&(ne=t-1),ne<0&&(ne=0);const n=ne*kn,a=Math.min(n+kn,e);return{start:n,end:a,total:e}}function kc(){if(!Ia)return null;const e=Ia.querySelector('[data-role="mediums-pager"]');return e?((!pt||$a!==e)&&(pt?.destroy(),pt=Yt(e,{onPrev:()=>Sc(),onNext:()=>xc(),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Mittel...",empty:"Keine Mittel verfügbar"}}),$a=e),pt):null}function ni(e){const t=kc();if(!t)return;const n=ve(e).length;if(!n){ne=0,t.update({status:"disabled",info:"Noch keine Mittel gespeichert."});return}const{start:a,end:r}=Yi(n),i=`Mittel ${oa.format(a+1)}–${oa.format(r)} von ${oa.format(n)}`;t.update({status:"ready",info:i,canPrev:ne>0,canNext:r<n})}function Sc(){if(ne===0)return;const e=Va?.state.getState();e&&(ne=Math.max(ne-1,0),Za(e))}function xc(){const e=Va?.state.getState();if(!e)return;const t=ve(e).length;if(!t)return;const n=Math.max(Math.ceil(t/kn)-1,0);ne>=n||(ne=Math.min(ne+1,n),Za(e))}function Za(e){if(!Ce)return;Ji(e);const t=new Map(e.measurementMethods.map(l=>[l.id,l])),n=ve(e).length;if(!n){Ce.innerHTML=`
      <tr>
        <td colspan="9" class="text-center text-muted">Noch keine Mittel gespeichert.</td>
      </tr>
    `,Ke(e),ni(e);return}const{start:a,end:r}=Yi(n),i=ve(e).slice(a,r);Ce.innerHTML="",i.forEach((l,o)=>{const c=a+o,u=document.createElement("tr"),d=t.get(l.methodId),f=l.approval||l.zulassungsnummer,b=typeof f=="string"&&f.trim().length?v(f):"-",S=typeof l.wartezeit=="string"&&l.wartezeit.trim().length?v(l.wartezeit):typeof l.wartezeit=="number"?`${l.wartezeit} Tage`:"-",p=typeof l.wirkstoff=="string"&&l.wirkstoff.trim().length?v(l.wirkstoff):"-";u.innerHTML=`
      <td class="text-center">
        <input type="checkbox" class="form-check-input" data-role="profile-select" data-medium-id="${v(l.id)}" ${J.has(l.id)?"checked":""} />
      </td>
      <td>${v(l.name)}</td>
      <td>${v(l.unit)}</td>
      <td>${v(d?d.label:l.method||l.methodId||"-")}</td>
      <td>${v(l.value!=null?String(l.value):"")}</td>
      <td>${b}</td>
      <td>${S}</td>
      <td>${p}</td>
      <td>
        <button class="btn btn-sm btn-danger" data-action="delete" data-index="${c}">Löschen</button>
      </td>
    `,Ce?.appendChild(u)}),Ke(e),ni(e)}function ai(e){if(!Nt)return;const t=new Set;Nt.innerHTML="",e.measurementMethods.forEach(n=>{const a=(n.label??"").toLowerCase(),r=(n.id??"").toLowerCase();if(a&&!t.has(a)){t.add(a);const i=document.createElement("option");i.value=n.label,Nt.appendChild(i)}if(r&&!t.has(r)){t.add(r);const i=document.createElement("option");i.value=n.id,Nt.appendChild(i)}})}function Ec(e){const t=e.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t||`method-${Date.now()}-${Math.random().toString(16).slice(2,6)}`}function Lc(e,t){if(!wn)return null;const n=wn.value.trim();if(!n)return window.alert("Bitte eine Methode angeben."),wn.focus(),null;const a=e.measurementMethods.find(o=>o.label?.toLowerCase()===n.toLowerCase()||o.id?.toLowerCase()===n.toLowerCase());if(a)return a.id;const r=Ec(n),i=e.fieldLabels?.calculation?.fields?.quantity?.unit||"Kiste",l={id:r,label:n,type:"factor",unit:i,requires:["areaHa"],config:{sourceField:"areaHa"}};return t.state.updateSlice("measurementMethods",o=>[...o,l]),r}async function zn(e){try{const t=me();return await ge(t),e?.silent||window.alert(e?.successMessage??"Änderungen wurden gespeichert."),!0}catch(t){console.error("Fehler beim Speichern",t);const n=t instanceof Error?t.message:"Speichern fehlgeschlagen";return window.alert(n),!1}}function Dc(e,t){const n=!!t.app?.hasDatabase,a=t.app?.activeSection==="settings";e.classList.toggle("d-none",!(n&&a))}function Pc(e,t){if(!e||ei)return;const n=e;n.innerHTML="";const a=mc();n.appendChild(a),Ia=a,Va=t,ne=0,pt?.destroy(),pt=null,$a=null,Ce=a.querySelector("#settings-mediums-table tbody"),wn=a.querySelector('input[name="medium-method"]'),Nt=a.querySelector("#settings-method-options"),et=a.querySelector("#settings-medium-form"),Ft=et?et.querySelector('button[type="submit"]'):null,In=a.querySelector("#settings-profile-form"),Be=a.querySelector("#profile-name"),Zt=a.querySelector('input[name="profile-id"]'),Cn=a.querySelector("#settings-profile-table tbody"),Me=a.querySelector('[data-role="profile-submit"]'),Aa=a.querySelector('[data-role="profile-selection-summary"]'),Ie=a.querySelector('[data-role="profile-select-all"]');let r=!1,i=!1;function l(d){if(a.querySelectorAll("[data-settings-tab]").forEach(f=>{const b=f.dataset.settingsTab===d;f.classList.toggle("active",b)}),a.querySelectorAll("[data-pane]").forEach(f=>{const b=f.dataset.pane===d;f.style.display=b?"block":"none"}),d==="gps"&&!r){const f=a.querySelector('[data-feature="gps-embedded"]');f&&(cc(f,t),r=!0)}if(d==="codes"&&!i){const f=a.querySelector('[data-feature="codes-embedded"]');f&&(fc(),pc(f,{state:t.state,events:{subscribe:t.events?.subscribe}},{}),i=!0)}}a.querySelectorAll("[data-settings-tab]").forEach(d=>{d.addEventListener("click",()=>{const f=d.dataset.settingsTab;f&&l(f)})});async function o(){if(!et||ht)return;const d=t.state.getState(),f=new FormData(et),b=(f.get("medium-name")||"").toString().trim(),S=(f.get("medium-unit")||"").toString().trim(),p=f.get("medium-value"),y=Number(p),w=(f.get("medium-approval")||"").toString().trim(),I=f.get("medium-wartezeit"),L=I?Number(I):null,H=(f.get("medium-wirkstoff")||"").toString().trim()||null;if(!b||!S||Number.isNaN(y)){window.alert("Bitte alle Felder korrekt ausfüllen.");return}const F=Lc(d,t);if(!F)return;const ce=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`medium-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,Y={id:ce,name:b,unit:S,methodId:F,value:y,zulassungsnummer:w||null,wartezeit:L!=null&&!Number.isNaN(L)?L:null,wirkstoff:H};ht=!0,Mn(!0,"Speichere...");try{t.state.updateSlice("mediums",P=>{const E=Qt(P),C=[...E.items,Y];return{...E,items:C,totalCount:C.length,lastUpdatedAt:new Date().toISOString()}}),ai(t.state.getState()),await zn({successMessage:"Mittel gespeichert.",silent:!0})&&(et.reset(),t.events?.emit?.("mediums:data-changed",{action:"created",id:ce}))}finally{ht=!1,Mn(!1)}}et?.addEventListener("submit",d=>{d.preventDefault(),o()}),Ce?.addEventListener("click",d=>{const f=d.target?.closest('[data-action="delete"]');if(!f)return;const b=Number(f.dataset.index);Number.isNaN(b)||hc(b,t,f)}),Ce?.addEventListener("change",d=>{const f=d.target;if(!f||f.dataset.role!=="profile-select")return;const b=f.dataset.mediumId;if(!b)return;f.checked?J.add(b):J.delete(b);const S=t.state.getState();Ke(S)}),Ie?.addEventListener("change",()=>{const d=t.state.getState();Ie&&(Ie.indeterminate=!1,Ie.checked?J=new Set(ve(d).map(f=>f.id)):J=new Set,Bn(),Ke(d))});const c=async()=>{if(!Be)return;const d=Be.value.trim();if(!d){window.alert("Bitte einen Profilnamen eingeben."),Be.focus();return}if(!J.size){window.alert("Bitte mindestens ein Mittel auswählen.");return}const f=t.state.getState();if(f.mediumProfiles?.some(w=>w.name.toLowerCase()===d.toLowerCase()&&w.id!==We)){window.alert("Ein Profil mit diesem Namen existiert bereits.");return}const S=ve(f).filter(w=>J.has(w.id)).map(w=>w.id);if(!S.length){window.alert("Ausgewählte Mittel sind nicht mehr verfügbar. Bitte Auswahl prüfen."),Ji(f),Bn(),Ke(f);return}if(sa)return;const p=!!We;sa=!0,ti(!0,p?"Aktualisiere...":"Speichere...");const y=new Date().toISOString();try{if(We)t.state.updateSlice("mediumProfiles",(I=[])=>I.map(L=>L.id===We?{...L,name:d,mediumIds:S,updatedAt:y}:L));else{const I={id:gc(),name:d,mediumIds:S,createdAt:y,updatedAt:y};t.state.updateSlice("mediumProfiles",(L=[])=>[...L,I])}await zn({successMessage:p?"Profil aktualisiert und gespeichert.":"Profil gespeichert."})&&Sn(t.state.getState())}finally{sa=!1,ti(!1)}};In?.addEventListener("submit",d=>{d.preventDefault(),c()}),Cn?.addEventListener("click",d=>{const f=d.target?.closest('[data-action^="profile-"]');if(!f)return;const b=f.dataset.id;if(!b)return;const S=t.state.getState();if(f.dataset.action==="profile-edit"){const p=S.mediumProfiles?.find(y=>y.id===b);p&&bc(p,S);return}if(f.dataset.action==="profile-delete"){const p=S.mediumProfiles?.find(y=>y.id===b);if(!p||!window.confirm(`Profil "${p.name}" wirklich löschen?`))return;vc(p,t,f)}}),a.querySelector('[data-action="profile-reset"]')?.addEventListener("click",()=>{Sn(t.state.getState())}),Sn(t.state.getState());const u=d=>{wc(d,t),Dc(a,d),d.app.activeSection==="settings"&&(Za(d),ai(d),yc(d),Ke(d))};t.state.subscribe(u),u(t.state.getState()),ei=!0}const Bt=e=>v(e),la=(e,t=1)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function vt(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function Ac(e){if(!e)return"";const t=new Date(e);if(Number.isNaN(t.getTime()))return v(e);const n=Math.round((t.getTime()-Date.now())/864e5);return n<0?`<span style="color:#ef4444;">${vt(e)} · abgelaufen</span>`:n<180?`<span style="color:#f59e0b;">${vt(e)} · ${n} T</span>`:`<span class="calc-hint">${vt(e)}</span>`}function $c(){return`
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
    </section>`}function Ic(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=$c();const n=e.querySelector('[data-role="lager-uebersicht"]'),a=e.querySelector('[data-role="lager-bewegungen"]'),r=e.querySelector('[data-role="lager-form"]'),i=e.querySelector("#lager-mittel-options"),l=e.querySelector('[data-role="lager-empty"]'),o=new Map,c=S=>{if(n){if(!S.length){n.innerHTML='<tr><td colspan="6" class="calc-hint" style="padding:14px;">Noch keine Mittel. Erfasse unten einen Zugang oder dokumentiere Anwendungen in „Neu erfassen".</td></tr>';return}n.innerHTML=S.map(p=>{const y=p.bestand<0?"#ef4444":p.bestand===0?"#f59e0b":"inherit",w=v(p.einheit||"");return`<tr>
          <td><span class="fw-semibold">${v(p.name)}</span>${p.kennr?`<span class="d-block calc-hint">${v(p.kennr)}</span>`:""}</td>
          <td class="calc-hint">${v(p.wirkstoff||"")}</td>
          <td class="text-end">${la(p.verbraucht)} ${w}<span class="d-block calc-hint">${p.anwendungen} Anw.</span></td>
          <td class="text-end fw-semibold" style="color:${y};">${la(p.bestand)} ${w}</td>
          <td>${Ac(p.zulEnde)}</td>
          <td class="calc-hint">${p.naechsterAblauf?vt(p.naechsterAblauf):""}</td>
        </tr>`}).join("")}},u=S=>{if(a){if(!S.length){a.innerHTML='<div class="calc-hint">Keine Bewegungen erfasst.</div>';return}a.innerHTML=S.map(p=>`
        <div class="d-flex align-items-center gap-2 py-1" style="border-bottom:1px solid var(--border-1);">
          <span class="badge" style="background:${p.typ==="zugang"?"#16a34a":"#64748b"};">${v(p.typ)}</span>
          <span class="flex-grow-1">${v(p.mittelName)} · <b>${la(p.menge)} ${v(p.einheit||"")}</b>${p.charge?` · Charge ${v(p.charge)}`:""}<span class="d-block calc-hint">${vt(p.datum)}${p.lieferant?" · "+v(p.lieferant):""}${p.ablauf?" · Ablauf "+vt(p.ablauf):""}</span></span>
          <button class="btn btn-sm" style="color:#ef4444;border:1px solid var(--border-1);background:transparent;" data-del="${Bt(p.id)}" title="Löschen">×</button>
        </div>`).join(""),a.querySelectorAll("[data-del]").forEach(p=>{p.addEventListener("click",async()=>{const y=p.getAttribute("data-del")||"";try{await eo({id:y}),await Ee().catch(()=>{}),await f()}catch{B.warning("Löschen fehlgeschlagen.")}})})}},d=()=>{i&&(i.innerHTML=Array.from(o.entries()).sort((S,p)=>S[0].localeCompare(p[0],"de")).map(([S,p])=>`<option value="${Bt(S)}" data-kennr="${Bt(p.kennr||"")}" data-einheit="${Bt(p.einheit||"")}" data-wirkstoff="${Bt(p.wirkstoff||"")}"></option>`).join(""))},f=async()=>{if(R()!=="sqlite"){l&&(l.textContent="Bitte zuerst eine Datenbank öffnen.");return}try{const[S,p,y]=await Promise.all([wi(),Xs(),ki()]);c(S?.rows||[]),u(p?.rows||[]),o.clear(),(y?.rows||[]).forEach(w=>{w.name&&o.set(w.name,{kennr:w.kennr??null,einheit:w.einheit??null,wirkstoff:w.wirkstoff??null})}),(S?.rows||[]).forEach(w=>{w.name&&!o.has(w.name)&&o.set(w.name,{kennr:w.kennr??null,einheit:w.einheit??null,wirkstoff:w.wirkstoff??null})}),d()}catch(S){console.warn("[Lager] Laden fehlgeschlagen:",S)}};r?.addEventListener("submit",async S=>{if(S.preventDefault(),R()!=="sqlite"){B.warning("Bitte zuerst eine Datenbank öffnen.");return}const p=new FormData(r),y=String(p.get("mittel")||"").trim(),w=Number(String(p.get("menge")||"").replace(",","."));if(!y||!Number.isFinite(w)){B.warning("Mittel und Menge angeben.");return}const I=String(p.get("preis")||"").trim();try{await Ys({mittelName:y,kennr:String(p.get("kennr")||"").trim()||null,wirkstoff:o.get(y)?.wirkstoff||null,typ:String(p.get("typ")||"zugang"),menge:w,einheit:String(p.get("einheit")||"").trim()||null,datum:String(p.get("datum")||"").trim()||null,charge:String(p.get("charge")||"").trim()||null,ablauf:String(p.get("ablauf")||"").trim()||null,lieferant:String(p.get("lieferant")||"").trim()||null,preis:I?Number(I.replace(",",".")):null}),await Ee().catch(()=>{}),r.reset(),B.success("Bewegung gespeichert."),await f()}catch{B.warning("Speichern fehlgeschlagen.")}});const b=e.querySelector('[name="mittel"]');b?.addEventListener("change",()=>{const S=o.get(b.value);if(!S)return;const p=e.querySelector('[name="einheit"]'),y=e.querySelector('[name="kennr"]');p&&S.einheit&&(p.value=S.einheit),y&&S.kennr&&(y.value=S.kennr)}),t.state.subscribe(S=>{S?.app?.activeSection==="lager"&&f()}),f()}const Oe=["#ef4444","#3b82f6","#a855f7","#f59e0b","#06b6d4","#ec4899","#84cc16","#14b8a6"],Cc=()=>({bedW:1.2,pathW:.4,rowSp:.5,inRowSp:.4,angle:0}),K=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";let T=null,we=null,z=null,ca=!1,tt=[];function ri(){if(!z)return 1;const e=z.getCenter().lat;return 156543.03392*Math.cos(e*Math.PI/180)/Math.pow(2,z.getZoom())}function Bc(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Mc();const n=[];let a=null;const r=new Map;let i=null,l=null,o={sat:null,osm:null},c=!0,u=!0;function d(){const s=[];if(n.forEach(h=>{const k=h.latlngs||[];if(k.length<3)return;const $=k.map(j=>[Number(j[1]),Number(j[0])]),D=$[0],O=$[$.length-1];(D[0]!==O[0]||D[1]!==O[1])&&$.push([D[0],D[1]]),s.push({type:"Feature",geometry:{type:"Polygon",coordinates:[$]},properties:{name:h.name||"",kultur:h.kultur||null,eppoCode:h.eppoCode||null,flaeche_m2:Math.round(h.result?.areaM2||0),flaeche_ha:Number(((h.result?.areaM2||0)/1e4).toFixed(4)),beete:h.result?.beds?.length||0,beetmeter_m:Math.round(h.result?.bedMeters||0),pflanzen:h.result?.plants||0,bettbreite_m:h.params?.bedW??null,wegbreite_m:h.params?.pathW??null,reihenabstand_m:h.params?.rowSp??null,pflanzabstand_m:h.params?.inRowSp??null,ausrichtung_grad:h.params?.angle??null}})}),(he(t.state.getState().gps?.points)||[]).forEach(h=>{const k=Number(h.latitude),$=Number(h.longitude);if(!Number.isFinite(k)||!Number.isFinite($))return;const D=Number(h.nutzflaecheQm);s.push({type:"Feature",geometry:{type:"Point",coordinates:[$,k]},properties:{name:h.name||"Standort",typ:"standort",flaeche_m2:Number.isFinite(D)&&D>0?Math.round(D):null,kind:h.kind||null}})}),!s.length){B.warning("Keine Flächen oder Standorte zum Exportieren.");return}const g={type:"FeatureCollection",name:"PSM Acker-Planer",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:s};try{const h=new Blob([JSON.stringify(g,null,2)],{type:"application/geo+json"}),k=URL.createObjectURL(h),$=document.createElement("a");$.href=k,$.download="acker-flaechen.geojson",document.body.appendChild($),$.click(),$.remove(),setTimeout(()=>URL.revokeObjectURL(k),1e3),B.success(`${s.length} Objekt(e) als GeoJSON exportiert.`)}catch(h){console.error("[Acker] GeoJSON-Export fehlgeschlagen",h),B.error("Export fehlgeschlagen.")}}function f(){if(!T||!i)return;i.clearLayers(),(he(t.state.getState().gps?.points)||[]).forEach(m=>{const g=Number(m.latitude),h=Number(m.longitude);if(!Number.isFinite(g)||!Number.isFinite(h))return;const k=Number(m.nutzflaecheQm),$=Number.isFinite(k)&&k>0?`${Math.round(k)} m²`:"",D=m.name||"Standort",O=T.marker([g,h],{icon:T.divIcon({className:"acker-standort",html:'<span class="acker-standort-dot"></span>',iconSize:[16,16],iconAnchor:[8,8]})});O.bindTooltip(`${v(D)}${$?" · "+$:""}`,{permanent:!0,direction:"top",className:"acker-standort-label",offset:[0,-9]});const j=[`<b>${v(D)}</b>`,$?`Fläche: ${$}`:"",m.kind?v(String(m.kind)):""].filter(Boolean).join("<br>");O.bindPopup(j),i.addLayer(O)})}const b=s=>e.querySelector(s),S=b('[data-role="acker-list"]'),p=b('[data-role="acker-empty"]'),y=b('[data-role="acker-totals"]'),w=b('[data-role="acker-map"]'),I=s=>({id:s.id,name:s.name,kultur:s.kultur||null,eppoCode:s.eppoCode||null,standortId:s.standortId||null,color:s.color,latlngs:s.latlngs,areaQm:s.result?.areaM2||0,bedW:s.params.bedW,pathW:s.params.pathW,rowSp:s.params.rowSp,inRowSp:s.params.inRowSp,angle:s.params.angle,beds:s.result?.beds?.length||0,bedMeters:s.result?.bedMeters||0,plants:s.result?.plants||0}),L=(s,m=!1)=>{if(R()!=="sqlite")return;const g=async()=>{try{const h=await no(I(s));h?.id&&(s.id=h.id),await Ee().catch(()=>{})}catch(h){console.warn("[Acker] Speichern fehlgeschlagen:",h)}};if(m){g();return}clearTimeout(r.get(s._key)),r.set(s._key,setTimeout(g,600))};function H(s,m){const g=s.map(Pe=>[Pe[1],Pe[0]]);if(g.length<3)return{areaM2:0,beds:[],bedMeters:0,plants:0};const h=g[0],k=g[g.length-1];if((h[0]!==k[0]||h[1]!==k[1])&&g.push(h.slice()),g.length<4)return{areaM2:0,beds:[],bedMeters:0,plants:0};let $;try{$=we.polygon([g])}catch{return{areaM2:0,beds:[],bedMeters:0,plants:0}}const D=we.area($),O=m.bedW+m.pathW;if(O<=0||m.bedW<=0||m.rowSp<=0||m.inRowSp<=0)return{areaM2:D,beds:[],bedMeters:0,plants:0};const j=we.centroid($),ee=we.transformRotate($,-m.angle,{pivot:j}),te=we.bbox(ee),Xe=1/111320,jn=O*Xe,ys=m.bedW*Xe,Dt=(te[2]-te[0])*.02+1e-4,cr=[];let dr=0,ur=0,pr=0;for(let Pe=te[1];Pe<te[3]&&pr<4e3;Pe+=jn,pr++){const fr=Math.min(Pe+ys,te[3]),ws=we.polygon([[[te[0]-Dt,Pe],[te[2]+Dt,Pe],[te[2]+Dt,fr],[te[0]-Dt,fr],[te[0]-Dt,Pe]]]);let rn=null;try{rn=we.intersect(ee,ws)}catch{rn=null}if(!rn)continue;let Un;try{Un=we.transformRotate(rn,m.angle,{pivot:j})}catch{continue}const Vn=we.area(Un);if(Vn<Math.max(.4,m.bedW*.3))continue;const Zn=Vn/m.bedW,Qn=Math.max(1,Math.floor(m.bedW/m.rowSp)),Jn=Math.max(0,Math.floor(Zn/m.inRowSp));dr+=Zn,ur+=Qn*Jn,cr.push({geo:Un,lenM:Zn,rows:Qn,perRow:Jn,plants:Qn*Jn,areaM2:Vn})}return{areaM2:D,beds:cr,bedMeters:dr,plants:ur}}const F=(s,m,g)=>({color:s.color,weight:m?3:2,fillColor:s.color,fillOpacity:g?m?.04:.1:m?.32:.22,dashArray:m?null:g?"5 5":null}),ce=(s,m,g)=>{const h=m%2===0;return g?{color:"#ffffff",weight:.7,opacity:.85,fillColor:s.color,fillOpacity:h?.78:.52}:{color:s.color,weight:0,fillColor:s.color,fillOpacity:h?.5:.32}};function Y(s){return!u||s.bedsHidden?!1:(s.params?.bedW||0)/ri()>=2.2}function Je(s){s.outline&&(z.removeLayer(s.outline),s.outline=null),s.bedsLayer&&(z.removeLayer(s.bedsLayer),s.bedsLayer=null),s.label&&l&&(l.removeLayer(s.label),s.label=null),X(s)}function P(s){const m=!!s.editing;s.outline&&z.removeLayer(s.outline),s.bedsLayer&&(z.removeLayer(s.bedsLayer),s.bedsLayer=null),s.label&&l&&l.removeLayer(s.label),X(s);const g=s._key===a,h=Y(s);s._lastDetail=h,h&&(s.bedsLayer=T.layerGroup(),(s.result?.beds||[]).forEach((k,$)=>{const D=T.geoJSON(k.geo,{style:ce(s,$,g),bubblingMouseEvents:!1});D.bindTooltip(`Beet ${$+1} · ${K(k.lenM,1)} m · ${k.rows}×${K(k.perRow)} = ${K(k.plants)} Pfl.`,{sticky:!0}),D.on("click",()=>Et(s._key)),D.on("contextmenu",O=>ar(s,O,$+1)),D.addTo(s.bedsLayer)}),s.bedsLayer.addTo(z)),s.outline=T.polygon(s.latlngs,{...F(s,g,h),bubblingMouseEvents:!1}).addTo(z),s.outline.on("click",()=>Et(s._key)),s.outline.on("dblclick",()=>tn(s)),s.outline.on("contextmenu",k=>ar(s,k)),E(s,g),(g||m)&&C(s)}function E(s,m){if(!c||!l||!s.outline)return;let g;try{g=s.outline.getBounds().getCenter()}catch{return}const h=s.result?.plants||0,k=`<div class="acker-flabel${m?" sel":""}" style="--fc:${s.color}"><b>${v(s.name||"")}</b><i>${K(h)} Pfl.</i></div>`;s.label=T.marker(g,{interactive:!1,keyboard:!1,icon:T.divIcon({className:"acker-flabel-wrap",html:k,iconSize:[0,0]})}),l.addLayer(s.label)}function C(s){X(s),s.handles=s.latlngs.map((m,g)=>{const h=T.marker(m,{draggable:!0,icon:T.divIcon({className:"acker-vhandle"})}).addTo(z);return h.on("drag",k=>{s.latlngs[g]=[k.target.getLatLng().lat,k.target.getLatLng().lng],s.outline.setLatLngs(s.latlngs)}),h.on("dragend",()=>De(s)),h.on("contextmenu",k=>us(s,g,k)),h}),s.editing=!0}function X(s){(s.handles||[]).forEach(m=>z.removeLayer(m)),s.handles=[],s.editing=!1}function le(){n.forEach(s=>P(s))}function fe(){n.forEach(s=>{Y(s)!==s._lastDetail&&P(s)})}function ye(s,m){s.color=m;try{s.outline?.setStyle({color:m,fillColor:m})}catch{}if(s.bedsLayer)try{s.bedsLayer.eachLayer(h=>h.setStyle&&h.setStyle({fillColor:m}))}catch{}try{const h=s.label?.getElement?.()?.querySelector?.(".acker-flabel");h&&h.style.setProperty("--fc",m)}catch{}const g=S?.querySelector(".acker-field.sel .acker-swatch");g&&(g.style.background=m)}function tn(s){if(s.latlngs?.length)try{z.fitBounds(T.polygon(s.latlngs).getBounds(),{maxZoom:20,padding:[40,40]})}catch{}}function xt(){const s=n.filter(m=>m.latlngs?.length>=3);if(!s.length){B.info("Keine Flächen vorhanden.");return}try{let m=T.polygon(s[0].latlngs).getBounds();s.slice(1).forEach(g=>{m=m.extend(T.polygon(g.latlngs).getBounds())}),z.fitBounds(m,{maxZoom:19,padding:[40,40]})}catch{}}function De(s){s.result=H(s.latlngs,s.params),P(s),Ye(),L(s)}let V=null;const lt=()=>{V&&(V.remove(),V=null,document.removeEventListener("pointerdown",Ja,!0),document.removeEventListener("keydown",Ya,!0))},Ja=s=>{V&&!V.contains(s.target)&&lt()},Ya=s=>{s.key==="Escape"&&lt()};function rs(s,m){m.style.left="",m.style.right="",m.style.top="";const g=s.getBoundingClientRect(),h=m.getBoundingClientRect(),k=h.width||210,$=h.height||260;g.right+3+k>window.innerWidth-8&&(m.style.left="auto",m.style.right="calc(100% + 3px)");let D=-5;g.top+D+$>window.innerHeight-8&&(D=Math.min(-5,window.innerHeight-8-$-g.top)),g.top+D<8&&(D=8-g.top),m.style.top=D+"px"}function Xa(s,m){m.forEach(g=>{if(!g)return;if(g.sep){const k=document.createElement("div");k.className="acker-ctx-sep",s.appendChild(k);return}if(g.type==="swatchGrid"){const k=document.createElement("div");k.className="acker-ctx-swatches",g.colors.forEach(O=>{const j=document.createElement("button");j.type="button",j.className="acker-sw"+(O===g.current?" on":""),j.style.background=O,j.title=O,j.addEventListener("click",ee=>{ee.stopPropagation(),lt(),g.onPick(O)}),k.appendChild(j)});const $=document.createElement("label");$.className="acker-sw-custom",$.innerHTML=`<i class="bi bi-eyedropper"></i><input type="color" value="${g.current||"#3b82f6"}">`;const D=$.querySelector("input");D.addEventListener("input",O=>(g.onLive||g.onPick)(O.target.value)),D.addEventListener("change",O=>{g.onPick(O.target.value),lt()}),k.appendChild($),s.appendChild(k);return}const h=document.createElement("button");if(h.type="button",h.className="acker-ctx-item"+(g.danger?" danger":"")+(g.submenu?" has-sub":"")+(g.disabled?" disabled":""),h.innerHTML=`<span class="ic">${g.icon||""}</span><span class="lb">${v(g.label)}</span>`+(g.right?`<span class="rt">${v(g.right)}</span>`:"")+(g.submenu?'<span class="ch"><i class="bi bi-chevron-right"></i></span>':""),g.submenu){const k=document.createElement("div");k.className="acker-ctx-sub",Xa(k,g.submenu),h.appendChild(k),h.addEventListener("pointerenter",()=>rs(h,k))}else g.disabled||h.addEventListener("click",k=>{k.stopPropagation(),g.keepOpen||lt(),g.action?.()});s.appendChild(h)})}function Wn(s,m,g,h){if(lt(),V=document.createElement("div"),V.className="acker-ctx",h){const O=document.createElement("div");O.className="acker-ctx-title",O.textContent=h,V.appendChild(O)}Xa(V,g),document.body.appendChild(V);const k=V.getBoundingClientRect();let $=s,D=m;$+k.width>window.innerWidth-8&&($=Math.max(8,window.innerWidth-k.width-8)),D+k.height>window.innerHeight-8&&(D=Math.max(8,window.innerHeight-k.height-8)),V.style.left=$+"px",V.style.top=D+"px",setTimeout(()=>{document.addEventListener("pointerdown",Ja,!0),document.addEventListener("keydown",Ya,!0)},0)}const Kn=s=>{const m=s.originalEvent||s;return m&&T.DomEvent.preventDefault?.(m),s.originalEvent&&T.DomEvent.stop?.(s),{x:m.clientX,y:m.clientY}};function Gn(s,m){s.params.angle=(Math.round(s.params.angle+m)%180+180)%180,De(s),B.info(`Beete-Ausrichtung: ${s.params.angle}°`)}function er(s,m){s.color=m,P(s),Ye(),L(s)}function tr(s,m){s.kultur=m||null,s.eppoCode=tt.find(g=>g.kultur===s.kultur)?.eppoCode||null,P(s),Ye(),L(s),B.success(m?`Kultur: ${m}`:"Kultur entfernt.")}function is(s){s.bedsHidden=!s.bedsHidden,P(s),B.info(s.bedsHidden?"Beete ausgeblendet.":"Beete eingeblendet.")}function ss(s){Et(s._key),setTimeout(()=>{const m=S?.querySelector(".acker-field.sel .acker-name");m&&(m.focus(),m.select())},30)}function nr(s){const g=ri()*18/111320,h={_key:"new-"+ ++ir,id:null,name:(s.name||"Fläche")+" (Kopie)",kultur:s.kultur,eppoCode:s.eppoCode,standortId:s.standortId,color:Oe[(Oe.indexOf(s.color)+1)%Oe.length],latlngs:s.latlngs.map(k=>[k[0]+g,k[1]+g]),params:{...s.params},outline:null,bedsLayer:null,label:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};n.push(h),a=h._key,De(h),L(h,!0),B.success("Fläche dupliziert.")}function os(s){const m=s.latlngs||[];if(m.length<3){B.warning("Fläche hat keine Geometrie.");return}const g=m.map(k=>[Number(k[1]),Number(k[0])]);(g[0][0]!==g[g.length-1][0]||g[0][1]!==g[g.length-1][1])&&g.push([g[0][0],g[0][1]]);const h={type:"FeatureCollection",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:[{type:"Feature",geometry:{type:"Polygon",coordinates:[g]},properties:{name:s.name||"",kultur:s.kultur||null,eppoCode:s.eppoCode||null,flaeche_m2:Math.round(s.result?.areaM2||0),beete:s.result?.beds?.length||0,beetmeter_m:Math.round(s.result?.bedMeters||0),pflanzen:s.result?.plants||0}}]};try{const k=new Blob([JSON.stringify(h,null,2)],{type:"application/geo+json"}),$=URL.createObjectURL(k),D=document.createElement("a");D.href=$,D.download=`${(s.name||"flaeche").replace(/[^\w\-]+/g,"_")}.geojson`,document.body.appendChild(D),D.click(),D.remove(),setTimeout(()=>URL.revokeObjectURL($),1e3),B.success("Fläche als GeoJSON exportiert.")}catch{B.error("Export fehlgeschlagen.")}}async function ls(s){const m=s.result||{},g=[`Fläche: ${s.name||""}`,s.kultur?`Kultur: ${s.kultur}`:"",`Größe: ${K(m.areaM2||0)} m² (${K((m.areaM2||0)/1e4,3)} ha)`,`Beete: ${K(m.beds?.length||0)}`,`Beetmeter: ${K(m.bedMeters||0)} m`,`Pflanzen: ${K(m.plants||0)}`].filter(Boolean).join(`
`);try{await navigator.clipboard.writeText(g),B.success("Werte kopiert.")}catch{B.warning("Kopieren nicht möglich.")}}const cs=s=>({icon:'<i class="bi bi-palette"></i>',label:"Farbe",submenu:[{type:"swatchGrid",colors:Oe,current:s.color,onPick:m=>er(s,m),onLive:m=>ye(s,m)}]}),ds=s=>({icon:'<i class="bi bi-flower1"></i>',label:"Kultur zuweisen",submenu:[{icon:'<i class="bi bi-x"></i>',label:"– keine –",action:()=>tr(s,null)},...tt.length?[{sep:!0}]:[],...tt.map(m=>({icon:m.kultur===s.kultur?'<i class="bi bi-check2"></i>':"",label:`${m.kultur}${m.anbau?" ("+m.anbau+")":""}`,action:()=>tr(s,m.kultur)}))]});function ar(s,m,g){Et(s._key);const{x:h,y:k}=Kn(m),$=!!s.editing;Wn(h,k,[{icon:'<i class="bi bi-pencil"></i>',label:"Umbenennen",action:()=>ss(s)},ds(s),cs(s),{sep:!0},{icon:'<i class="bi bi-arrow-clockwise"></i>',label:"Beete drehen +15°",keepOpen:!0,action:()=>Gn(s,15)},{icon:'<i class="bi bi-arrow-counterclockwise"></i>',label:"Beete drehen −15°",keepOpen:!0,action:()=>Gn(s,-15)},{icon:'<i class="bi bi-grid-3x3-gap"></i>',label:s.bedsHidden?"Beete einblenden":"Beete ausblenden",action:()=>is(s)},{icon:'<i class="bi bi-bounding-box-circles"></i>',label:$?"Eckpunkte fertig":"Eckpunkte bearbeiten",action:()=>{$?X(s):C(s)}},{sep:!0},{icon:'<i class="bi bi-copy"></i>',label:"Duplizieren",action:()=>nr(s)},{icon:'<i class="bi bi-zoom-in"></i>',label:"Auf Fläche zoomen",action:()=>tn(s)},{icon:'<i class="bi bi-clipboard-data"></i>',label:"Werte kopieren",action:()=>ls(s)},{icon:'<i class="bi bi-download"></i>',label:"Als GeoJSON exportieren",action:()=>os(s)},{sep:!0},{icon:'<i class="bi bi-trash"></i>',label:"Löschen",danger:!0,action:()=>rr(s._key)}],g?`${s.name||"Fläche"} · Beet ${g}`:s.name||"Fläche")}function us(s,m,g){const{x:h,y:k}=Kn(g);Wn(h,k,[{icon:'<i class="bi bi-node-minus"></i>',label:"Eckpunkt löschen",disabled:s.latlngs.length<=3,action:()=>{s.latlngs.length<=3||(s.latlngs.splice(m,1),De(s))}},{icon:'<i class="bi bi-check2"></i>',label:"Bearbeiten beenden",action:()=>X(s)}],`Eckpunkt ${m+1}`)}function ps(){!o.sat||!o.osm||(z.hasLayer(o.sat)?(z.removeLayer(o.sat),o.osm.addTo(z),B.info("Karte: OSM")):(z.removeLayer(o.osm),o.sat.addTo(z),B.info("Karte: Satellit")))}function fs(s){const m=s.latlng,{x:g,y:h}=Kn(s);Wn(g,h,[{icon:'<i class="bi bi-pencil-square"></i>',label:"Neue Fläche hier zeichnen",action:()=>{Lt(!0),sr({latlng:m})}},{icon:'<i class="bi bi-crosshair"></i>',label:"Hierhin zentrieren",action:()=>z.panTo(m)},{sep:!0},{icon:'<i class="bi bi-arrows-fullscreen"></i>',label:"Alle Flächen anzeigen",disabled:!n.some(k=>k.latlngs?.length>=3),action:xt},{icon:'<i class="bi bi-layers"></i>',label:"Kartentyp wechseln (Satellit/OSM)",action:ps},{sep:!0},{icon:'<i class="bi bi-geo-alt"></i>',label:"Koordinaten kopieren",action:async()=>{try{await navigator.clipboard.writeText(`${m.lat.toFixed(6)}, ${m.lng.toFixed(6)}`),B.success("Koordinaten kopiert.")}catch{B.warning("Kopieren nicht möglich.")}}}],"Karte")}function ms(s){return['<option value="">– Kultur –</option>'].concat(tt.map(m=>{const g=`${m.kultur}${m.anbau?" ("+m.anbau+")":""}`;return`<option value="${v(m.kultur)}"${m.kultur===s?" selected":""}>${v(g)}</option>`})).join("")}function gs(s){const m=he(t.state.getState().gps?.points)||[];return['<option value="">– Standort –</option>'].concat(m.map(g=>`<option value="${v(g.id)}"${g.id===s?" selected":""}>${v(g.name||"")}</option>`)).join("")}function Ye(){if(!S||!p||!y)return;p.style.display=n.length?"none":"block",y.style.display=n.length?"block":"none",S.innerHTML="";let s=0,m=0,g=0,h=0;n.forEach(k=>{s+=k.result?.areaM2||0,m+=k.result?.beds?.length||0,g+=k.result?.bedMeters||0,h+=k.result?.plants||0;const $=k._key===a,D=document.createElement("div");D.className="acker-field"+($?" sel open":""),D.innerHTML=`
        <div class="acker-fhead">
          <span class="acker-swatch" style="background:${k.color}"></span>
          <input class="acker-name" value="${v(k.name)}" />
          <span class="acker-stat">${K(k.result?.plants||0)} Pfl.</span>
        </div>
        <div class="acker-fbody">
          <div class="acker-grid">
            <label class="acker-fld span2">Kultur<select data-k="kultur">${ms(k.kultur)}</select></label>
            <label class="acker-fld span2">Standort (für PSM)<select data-k="standortId">${gs(k.standortId)}</select></label>
            <label class="acker-fld">Bettbreite (m)<input data-k="bedW" type="number" step="0.05" min="0.1" value="${k.params.bedW}"/></label>
            <label class="acker-fld">Wegbreite (m)<input data-k="pathW" type="number" step="0.05" min="0" value="${k.params.pathW}"/></label>
            <label class="acker-fld">Reihenabstand (m)<input data-k="rowSp" type="number" step="0.05" min="0.05" value="${k.params.rowSp}"/></label>
            <label class="acker-fld">Pflanzabstand (m)<input data-k="inRowSp" type="number" step="0.05" min="0.05" value="${k.params.inRowSp}"/></label>
            <label class="acker-fld span2">Ausrichtung der Beete: ${k.params.angle}°<input data-k="angle" type="range" min="0" max="180" step="5" value="${k.params.angle}"/></label>
          </div>
          <div class="acker-res">
            <div class="r"><span>Fläche</span><b>${K(k.result?.areaM2||0)} m² · ${K((k.result?.areaM2||0)/1e4,3)} ha</b></div>
            <div class="r"><span>Beete</span><b>${K(k.result?.beds?.length||0)}</b></div>
            <div class="r"><span>Beetmeter</span><b>${K(k.result?.bedMeters||0)} m</b></div>
            <div class="r"><span>Pflanzen</span><b>${K(k.result?.plants||0)}</b></div>
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
        </div>`,D.querySelector(".acker-fhead").addEventListener("click",ee=>{ee.target.classList.contains("acker-name")||Et(k._key)}),D.querySelector(".acker-name").addEventListener("input",ee=>{k.name=ee.target.value,L(k)}),D.querySelectorAll("[data-k]").forEach(ee=>{ee.addEventListener("input",te=>{const Xe=ee.dataset.k;if(Xe==="kultur"){k.kultur=te.target.value||null,k.eppoCode=tt.find(jn=>jn.kultur===k.kultur)?.eppoCode||null,L(k);return}if(Xe==="standortId"){k.standortId=te.target.value||null,L(k);return}Xe==="angle"?k.params.angle=+te.target.value:k.params[Xe]=parseFloat(te.target.value)||0,De(k)})}),D.querySelector('[data-act="del"]').addEventListener("click",()=>rr(k._key)),D.querySelector('[data-act="zoom"]').addEventListener("click",()=>tn(k)),D.querySelector('[data-act="dup"]').addEventListener("click",()=>nr(k)),D.querySelector('[data-act="rot"]').addEventListener("click",()=>Gn(k,15));const j=D.querySelector('[data-act="color"]');j.addEventListener("input",ee=>ye(k,ee.target.value)),j.addEventListener("change",ee=>er(k,ee.target.value)),S.appendChild(D)}),y.querySelector('[data-t="area"]').textContent=K(s)+" m² · "+K(s/1e4,3)+" ha",y.querySelector('[data-t="beds"]').textContent=K(m),y.querySelector('[data-t="meters"]').textContent=K(g)+" m",y.querySelector('[data-t="plants"]').textContent=K(h)}function Et(s){a=s,n.forEach(m=>P(m)),Ye()}async function rr(s){const m=n.find(h=>h._key===s);if(!m)return;Je(m);const g=n.findIndex(h=>h._key===s);if(g>=0&&n.splice(g,1),a===s&&(a=null),Ye(),m.id&&R()==="sqlite")try{await to({id:m.id}),await Ee().catch(()=>{})}catch{}}let nn=!1,Te=[],He=null,an=[],ir=0;function Lt(s){nn=s,b('[data-role="acker-banner"]').style.display=s?"block":"none",b('[data-role="acker-draw"]').style.display=s?"none":"block",z.getContainer().style.cursor=s?"crosshair":"",s||(He&&z.removeLayer(He),an.forEach(m=>z.removeLayer(m)),He=null,an=[],Te=[])}function sr(s){nn&&(Te.push([s.latlng.lat,s.latlng.lng]),an.push(T.circleMarker(s.latlng,{radius:4,color:"#22c55e",fillColor:"#fff",fillOpacity:1,weight:2}).addTo(z)),He?He.setLatLngs(Te):He=T.polyline(Te,{color:"#22c55e",weight:2,dashArray:"5 5"}).addTo(z))}function or(){if(Te.length<3){B.warning("Mindestens 3 Punkte setzen.");return}const s={_key:"new-"+ ++ir,id:null,name:"Fläche "+(n.length+1),kultur:null,eppoCode:null,standortId:null,color:Oe[n.length%Oe.length],latlngs:Te.map(m=>m.slice()),params:Cc(),outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};n.push(s),Lt(!1),a=s._key,De(s),L(s,!0)}async function lr(){const s=b('[data-role="acker-q"]').value.trim();if(s)try{const g=await(await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+encodeURIComponent(s))).json();g[0]?z.setView([+g[0].lat,+g[0].lon],18):B.info("Nichts gefunden.")}catch{B.warning("Suche nicht verfügbar.")}}async function bs(){if(ca){setTimeout(()=>z&&z.invalidateSize(),60);return}ca=!0;try{await Ge(()=>Promise.resolve({}),__vite__mapDeps([2]));const h=await Ge(()=>import("./leaflet-src.BcflbDBd.js").then(k=>k.l),__vite__mapDeps([3,4]));T=h.default||h,we=await Ge(()=>import("./index.CPadEFgJ.js"),__vite__mapDeps([5,4]))}catch(h){console.warn("[Acker] Karten-Bibliotheken konnten nicht geladen werden:",h),p&&(p.textContent="Karte konnte nicht geladen werden (offline?)."),ca=!1;return}z=T.map(w,{doubleClickZoom:!1,zoomControl:!0,attributionControl:!0}).setView([47.818,8.976],17);const s=T.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:21,maxNativeZoom:19,attribution:"Tiles © Esri"}).addTo(z),m=T.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"});o={sat:s,osm:m},i=T.layerGroup(),f(),i.addTo(z),l=T.layerGroup().addTo(z),T.control.layers({Satellit:s,"Karte (OSM)":m},{"Freiland-Standorte":i},{position:"topright",collapsed:!0}).addTo(z);const g=T.Control.extend({options:{position:"topleft"},onAdd(){const h=T.DomUtil.create("div","leaflet-bar acker-toolbar");h.innerHTML='<a href="#" data-tb="fit" title="Alle Flächen anzeigen"><i class="bi bi-arrows-fullscreen"></i></a><a href="#" data-tb="labels" class="on" title="Beschriftungen ein/aus"><i class="bi bi-tag"></i></a><a href="#" data-tb="beds" class="on" title="Beete-Detail ein/aus"><i class="bi bi-grid-3x3"></i></a>',T.DomEvent.disableClickPropagation(h);const k=($,D)=>{h.querySelector($).addEventListener("click",O=>{O.preventDefault(),D()})};return k('[data-tb="fit"]',xt),k('[data-tb="labels"]',()=>{c=!c,h.querySelector('[data-tb="labels"]').classList.toggle("on",c),le()}),k('[data-tb="beds"]',()=>{u=!u,h.querySelector('[data-tb="beds"]').classList.toggle("on",u),le()}),h}});z.addControl(new g),z.on("click",sr),z.on("contextmenu",h=>{nn||fs(h)}),z.on("zoomend",fe),b('[data-role="acker-draw"]').addEventListener("click",()=>Lt(!0)),b('[data-role="acker-export"]')?.addEventListener("click",d),b('[data-role="acker-finish"]').addEventListener("click",or),b('[data-role="acker-cancel"]').addEventListener("click",()=>Lt(!1)),b('[data-role="acker-go"]').addEventListener("click",lr),b('[data-role="acker-q"]').addEventListener("keydown",h=>{h.key==="Enter"&&lr()}),document.addEventListener("keydown",h=>{if(nn){if(h.key==="Backspace"){h.preventDefault(),Te.pop();const k=an.pop();k&&z.removeLayer(k),He&&He.setLatLngs(Te)}h.key==="Enter"&&or(),h.key==="Escape"&&Lt(!1)}}),await hs(),await vs(),setTimeout(()=>z.invalidateSize(),60)}async function hs(){if(R()==="sqlite")try{tt=(await Si())?.rows||[]}catch{tt=[]}}async function vs(){if(R()==="sqlite")try{((await xi())?.rows||[]).forEach(g=>{const h={_key:"db-"+g.id,id:g.id,name:g.name,kultur:g.kultur,eppoCode:g.eppoCode,standortId:g.standortId,color:g.color||Oe[n.length%Oe.length],latlngs:g.latlngs||[],params:{bedW:g.bedW??1.2,pathW:g.pathW??.4,rowSp:g.rowSp??.5,inRowSp:g.inRowSp??.4,angle:g.angle??0},outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};h.result=H(h.latlngs,h.params),n.push(h),P(h)}),Ye();const m=n.find(g=>g.latlngs?.length);if(m&&z)try{z.fitBounds(T.polygon(m.latlngs).getBounds(),{maxZoom:19,padding:[30,30]})}catch{}}catch(s){console.warn("[Acker] Flächen laden fehlgeschlagen:",s)}}t.state.subscribe(s=>{s?.app?.activeSection==="acker"&&bs()}),Ye()}function Mc(){return`
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
  </section>`}const zc=["pflanzenschutz.json","history.json","entries.json"];let ii=!1,A=null,qe=!1;const st=25,da=new Intl.NumberFormat("de-DE");let G=0,mn=null,si=null;const qc=qi({id:"import",label:"Import-Vorschau",budget:{initialLoad:20,maxItems:50}});let Ca=null;function Fc(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function Nc(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Tc(e,t){const n=e.querySelector('[data-role="import-log-list"]');if(n){if(!t.length){n.innerHTML='<tr><td colspan="5" class="text-muted small">Noch keine Importe protokolliert.</td></tr>';return}n.innerHTML=t.map(a=>{const r=a.rangeStart||a.rangeEnd?`${Wt(a.rangeStart)||a.rangeStart||"?"} – ${Wt(a.rangeEnd)||a.rangeEnd||"?"}`:"-",i=[a.source,a.device].filter(Boolean),l=i.length?v(i.join(" · ")):"-";return`
        <tr>
          <td>${v(Nc(a.importedAt))}</td>
          <td>${l}</td>
          <td class="text-end text-success">${a.added}</td>
          <td class="text-end text-muted">${a.skipped}</td>
          <td class="small text-muted">${v(r)}</td>
        </tr>`}).join("")}}async function xn(e){if(R()==="sqlite")try{const t=await ao(50);Tc(e,t.items||[])}catch(t){console.warn("Import-Historie konnte nicht geladen werden",t)}}function Fe(e,t,n="info"){const a=e.querySelector('[data-role="import-hint"]');if(a){if(!t){a.classList.add("d-none"),a.textContent="";return}a.className=`alert alert-${n} small mt-3`,a.textContent=t}}function at(e,t){const n=e.querySelector('[data-role="import-feedback"]');n&&(n.textContent=t)}function Ve(e){const t=e.querySelector('[data-action="clear-import"]'),n=e.querySelector('[data-action="focus-import"]'),a=e.querySelector('[data-action="run-import"]'),r=!!A;if(t&&(t.disabled=!r||qe),n&&(n.disabled=!r||qe),a){const i=!!(A?.importableEntries?.length&&A.stats||A?.fotos?.length);a.disabled=!r||!i||qe}}function Hc(e){A=null,Vc(e);const t=e.querySelector('[data-role="import-summary-card"]'),n=e.querySelector('[data-role="import-file"]');t&&t.classList.add("d-none"),n&&(n.value=""),at(e,""),Fe(e,"Bereit für eine neue Importdatei."),Ve(e),ft()}function Xi(e){if(e.dateIso)return e.dateIso;if(e.datum){const t=new Date(e.datum);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.date){const t=new Date(e.date);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.savedAt){const t=new Date(e.savedAt);if(!Number.isNaN(t.getTime()))return t.toISOString()}return null}function qn(e){return e?Wt(e)||e.slice(0,10):"-"}function es(e){return e.savedAt||(e.savedAt=e.createdAt||e.dateIso||new Date().toISOString()),e}function oi(e,t){if(!e)return;const n=new Date(e);if(!Number.isNaN(n.getTime()))return t==="start"?n.setHours(0,0,0,0):n.setHours(23,59,59,999),n.toISOString()}function Oc(e){if(!e||typeof e!="object")return null;const t={...e};if(!Array.isArray(t.items)){const n=e.items;t.items=Array.isArray(n)?[...n]:[]}return es(t),t}function ts(e,t){const n=e.map(a=>Xi(a)).filter(a=>!!a).sort();return{startIso:n[0]||t?.filters?.startDate||null,endIso:n[n.length-1]||t?.filters?.endDate||null}}function _c(e){if(!e)return;const t=oi(e.startIso,"start"),n=oi(e.endIso,"end");if(!t&&!n)return;const a={};return t&&(a.startDate=t),n&&(a.endDate=n),a}async function ns(e,t){if(R()!=="sqlite"){const o=he(e.history);return new Set(o.map(c=>Fn(c)).filter(c=>!!c))}const a=_c(t);if(!a)return new Set;const r=new Set;let i=1;const l=500;try{for(;;){const o=await Ei({page:i,pageSize:l,filters:a,sortDirection:"asc"});if(o.items.forEach(c=>{const u=Fn(c);u&&r.add(u)}),i*l>=o.totalCount)break;i+=1}}catch(o){return console.warn("Konnte vorhandene Einträge für Duplikatprüfung nicht laden",o),new Set}return r}function Fn(e){const t=typeof e.clientUuid=="string"&&e.clientUuid?e.clientUuid:"";if(t)return`uuid:${t}`;const n=e.savedAt||e.dateIso||e.createdAt||e.datum||"",a=e.ersteller||"",r=e.kultur||"",i=e.invekos||e.standort||"";return[n,a,r,i].join("|")}function Rc(e,t,n,a){const r=a||ts(e,n),i=r.startIso,l=r.endIso,o=new Set,c=new Set;return t.forEach(u=>{u.ersteller&&o.add(u.ersteller),u.kultur&&c.add(u.kultur)}),{startDateLabel:qn(i),endDateLabel:qn(l),startDateRaw:i,endDateRaw:l,entryCount:e.length,importableCount:t.length,duplicateCount:e.length-t.length,creators:Array.from(o).slice(0,5),crops:Array.from(c).slice(0,5)}}function Wc(e,t){const n=e.querySelector('[data-role="import-stats"]');if(!n)return;if(!t){n.innerHTML="";return}const a=t.stats,r=t.metadata?.filters;n.innerHTML=`
    <div class="col-12 col-md-4">
      <div class="border rounded p-3 h-100">
        <div class="text-muted small">Zeitraum</div>
        <div class="fw-bold">${v(a.startDateLabel)} – ${v(a.endDateLabel)}</div>
      </div>
    </div>
    <div class="col-12 col-md-4">
      <div class="border rounded p-3 h-100">
        <div class="text-muted small">Einträge</div>
        <div class="fw-bold">${a.importableCount} / ${a.entryCount}</div>
        <div class="text-muted small">${a.duplicateCount} Duplikat(e) übersprungen</div>
      </div>
    </div>
    <div class="col-12 col-md-4">
      <div class="border rounded p-3 h-100">
        <div class="text-muted small">Filter aus Backup</div>
        <div class="fw-bold">${v(r?.label||r?.scope||"—")}</div>
        <div class="text-muted small">${v(r?[r.creator,r.crop].filter(Boolean).join(" · ")||"Keine zusätzlichen Filter":"Keine Angaben")}</div>
      </div>
    </div>
  `}function Kc(e,t){const n=e.querySelector('[data-role="import-warnings"]');if(!n)return;if(!t||!t.warnings.length){n.innerHTML="";return}const a=t.warnings.map(r=>`<li>${v(r)}</li>`).join("");n.innerHTML=`
    <div class="alert alert-warning">
      <strong>Hinweise:</strong>
      <ul class="mb-0">${a}</ul>
    </div>
  `}function as(e){const t=e.entries.length;if(!t)return G=0,{start:0,end:0,total:0};const n=Math.max(Math.ceil(t/st),1);G>=n&&(G=n-1),G<0&&(G=0);const a=G*st,r=Math.min(a+st,t);return{start:a,end:r,total:t}}function Gc(e){const t=e.querySelector('[data-role="import-pager"]');return t?((!mn||si!==t)&&(mn?.destroy(),mn=Yt(t,{onPrev:()=>jc(e),onNext:()=>Uc(e),labels:{prev:"Zurück",next:"Weiter",loading:"Vorschau wird geladen...",empty:"Keine Einträge verfügbar"}}),si=t),mn):null}function Rt(e,t){const n=Gc(e);if(!n)return;if(!t){G=0,n.update({status:"hidden"});return}const a=t.entries.length;if(!a){G=0,n.update({status:"disabled",info:"Keine Einträge vorhanden."});return}const{start:r,end:i}=as(t),l=`Einträge ${da.format(r+1)}–${da.format(i)} von ${da.format(a)}`;n.update({status:"ready",info:l,canPrev:G>0,canNext:i<a})}function jc(e){!A||G===0||(G=Math.max(G-1,0),Qa(e,A))}function Uc(e){if(!A)return;const t=A.entries.length;if(!t)return;const n=Math.max(Math.ceil(t/st)-1,0);G>=n||(G=Math.min(G+1,n),Qa(e,A))}function Vc(e){G=0,e&&Rt(e,A)}function Qa(e,t){const n=e.querySelector('[data-role="import-preview-table"]');if(!n){ft();return}if(!t){n.innerHTML="",Rt(e,null),ft();return}if(!t.entries.length){n.innerHTML='<tr><td colspan="5" class="text-center text-muted">Keine Einträge</td></tr>',Rt(e,t),ft();return}const{start:r,end:i}=as(t),o=t.entries.slice(r,i).map(c=>{const u=qn(Xi(c));return`
        <tr>
          <td>${v(u)}</td>
          <td>${v(c.kultur||"-")}</td>
          <td>${v(c.ersteller||"-")}</td>
          <td>${v(c.standort||c.invekos||"-")}</td>
          <td>${v(c.savedAt?qn(c.savedAt):"-")}</td>
        </tr>
      `}).join("");n.innerHTML=o,Rt(e,t),ft()}async function Zc(e){const t=so(e),n=Object.keys(t),a=n.find(u=>zc.some(d=>u.toLowerCase().endsWith(d)));if(!a)throw new Error("ZIP enthält keine 'pflanzenschutz.json'.");const r=JSON.parse(ua(t[a])),i=n.find(u=>u.toLowerCase().endsWith("metadata.json")),l=i?JSON.parse(ua(t[i])):null,o=Array.isArray(r)?r:Array.isArray(r.entries)?r.entries:Array.isArray(r.history)?r.history:[],c=Array.isArray(r?.fotos)?r.fotos:[];for(const u of c){if(u?.data)continue;const d=u?.file?String(u.file):null,f=d?n.find(b=>b===d||b.toLowerCase().endsWith(d.toLowerCase())):null;f&&t[f]&&(u.data=Qc(t[f]),u.mime||(u.mime="image/jpeg"))}return{entries:o,metadata:l,fotos:c}}function Qc(e){let t="";for(let a=0;a<e.length;a+=32768)t+=String.fromCharCode(...e.subarray(a,a+32768));return btoa(t)}async function Jc(e){const t=ua(e),n=JSON.parse(t);if(Array.isArray(n))return{entries:n,metadata:null,fotos:[]};const a=Array.isArray(n.fotos)?n.fotos:[];if(Array.isArray(n.entries))return{entries:n.entries,metadata:n.metadata||null,fotos:a};if(Array.isArray(n.history))return{entries:n.history,metadata:n.metadata||null,fotos:a};if(a.length)return{entries:[],metadata:n.metadata||null,fotos:a};throw new Error("JSON enthält keine Eintragsliste.")}async function Yc(e,t){const n=new Uint8Array(await e.arrayBuffer()),a=/\.zip$/i.test(e.name)||e.type==="application/zip",{entries:r,metadata:i,fotos:l}=a?await Zc(n):await Jc(n),o=Array.isArray(l)?l:[],c=(Array.isArray(r)?r:[]).map(w=>Oc(w)).filter(w=>!!w);if(!c.length&&!o.length)throw new Error("Die Datei enthielt keine verwertbaren Einträge.");const u=ts(c,i),d=await ns(t,u),f=new Set,b=[];let S=0;c.forEach(w=>{const I=Fn(w);if(!I){b.push(w);return}if(d.has(I)||f.has(I)){S+=1;return}f.add(I),b.push(w)});const p=Rc(c,b,i,u),y=[];return S&&y.push(`${S} Datensätze wurden wegen gleicher Kennung übersprungen.`),(!p.startDateRaw||!p.endDateRaw)&&y.push("Zeitraum konnte nicht eindeutig ermittelt werden."),{filename:e.name,entries:c,importableEntries:b,metadata:i,stats:p,warnings:y,lastImportRefs:[],fotos:o}}function li(){if(!A)return"Keine Datei";const e=[];return qe&&e.push("Verarbeitung"),A.warnings.length&&e.push("Warnungen"),A.stats.importableCount<A.stats.entryCount&&e.push("Duplikate entfernt"),e.length?e.join(" · "):void 0}function Xc(){const e=!!A,t=e?Math.max(Math.ceil((A?.entries.length||0)/st),1):null,n=e?{items:A?.entries.length??0,totalCount:A?.stats.entryCount??null,cursor:A&&(A.entries.length||0)>st?`Seite ${G+1}${t?` / ${t}`:""}`:null,payloadKb:Ni(A?.entries.slice(0,st)),lastUpdated:Ca,note:li()}:{items:0,totalCount:0,cursor:null,payloadKb:0,lastUpdated:Ca,note:li()};Fi(qc,n)}function ft(){Ca=new Date().toISOString(),Xc()}function Ba(e){const t=e.querySelector('[data-role="import-summary-card"]');if(!t)return;if(!A){t.classList.add("d-none"),Rt(e,null),Ve(e),ft();return}t.classList.remove("d-none"),G=0;const n=t.querySelector('[data-role="import-file-name"]'),a=t.querySelector('[data-role="import-summary-subline"]');n&&(n.textContent=A.filename),a&&(a.textContent=`${A.stats.importableCount} von ${A.stats.entryCount} Einträgen importierbar`),Wc(e,A),Kc(e,A),Qa(e,A),Ve(e)}async function ed(){const e=R();if(!e||e==="memory"||e==="sqlite")return;const t=me();await ge(t)}function ci(e,t){if(!t.length)return[];const n=typeof e.state.updateSlice=="function"?e.state.updateSlice:Ne,a=[];return n("history",r=>{const i=Qt(r),l=i.items.slice(),o=l.length;return t.forEach((c,u)=>{a.push(o+u),l.push(c)}),{...i,items:l,totalCount:l.length,lastUpdatedAt:new Date().toISOString()}}),a}async function td(e,t){if(!A){window.alert("Bitte zuerst eine Importdatei laden.");return}const n=A.fotos||[];if(!A.importableEntries.length&&!n.length){window.alert("Alle Einträge wurden bereits importiert oder als Duplikat erkannt.");return}qe=!0,Ve(e),at(e,"Import läuft ...");const a=t.state.getState(),r={startIso:A.stats.startDateRaw,endIso:A.stats.endDateRaw};let i=new Set;try{i=await ns(a,r)}catch(y){console.warn("Duplikatprüfung vor Import fehlgeschlagen",y)}const l=new Set(i),o=[];let c=0;if(A.importableEntries.forEach(y=>{const w=Fn(y);if(w&&l.has(w)){c+=1;return}w&&l.add(w),o.push(y)}),!o.length&&!n.length){at(e,"Keine neuen Einträge gefunden."),Fe(e,"Alle Datensätze sind bereits importiert worden.","warning"),qe=!1,Ve(e);return}const u=R(),d=[],f=[];let b=0,S=0;const p=o.map(y=>es({...y}));try{if(u==="sqlite"){const L=[];for(const H of p)try{const F=await pi(H);if(F?.duplicate){c+=1;continue}F?.id!=null&&(d.push({source:"sqlite",ref:F.id}),L.push(H))}catch(F){console.error("appendHistoryEntry failed",F),f.push(H.savedAt||"Unbekannter Eintrag")}ci(t,L);for(const H of n)try{(await ro(H))?.duplicate?S+=1:b+=1}catch(F){console.error("appendFoto failed",F)}b&&window.dispatchEvent(new CustomEvent("fotos:changed"));try{await Ee()}catch(H){console.warn("SQLite-Datei konnte nach dem Import nicht gespeichert werden",H)}}else ci(t,p).forEach(H=>{d.push({source:"state",ref:H})}),await ed();const y=d.length;if(y||b){u==="sqlite"&&y&&t.events?.emit?.("history:data-changed",{type:"created-bulk",count:y});const L=[];y&&L.push(`${y} Einträge`),b&&L.push(`${b} Foto(s)`),at(e,`${L.join(" und ")} importiert.${f.length?` ${f.length} Einträge konnten nicht übernommen werden.`:""}`.trim()),A.lastImportRefs=d,A.importableEntries=[],A.stats={...A.stats,importableCount:0},Ba(e)}else at(e,"Keine neuen Daten importiert.");const w=[];let I="success";if(f.length&&(w.push(`${f.length} Einträge konnten nicht gespeichert werden. Details siehe Konsole.`),I="warning"),c&&(w.push(`${c} Einträge wurden während des Imports als Duplikat übersprungen.`),I="warning"),S&&w.push(`${S} Foto(s) waren bereits vorhanden (übersprungen).`),w.length||w.push("Import abgeschlossen."),Fe(e,w.join(" "),I),u==="sqlite"&&(y||c||b||S))try{const L=[];f.length&&L.push(`${f.length} fehlgeschlagen`),b&&L.push(`${b} Fotos`),S&&L.push(`${S} Fotos doppelt`),await io({source:A.filename||null,device:A.metadata?.device||A.metadata?.label||null,added:y,skipped:c,rangeStart:A.stats.startDateRaw,rangeEnd:A.stats.endDateRaw,note:L.length?L.join(", "):null}),await Ee().catch(()=>{}),await xn(e)}catch(L){console.warn("Import-Historie konnte nicht geschrieben werden",L)}}catch(y){console.error("Import fehlgeschlagen",y),at(e,"Import fehlgeschlagen. Siehe Konsole für Details."),Fe(e,"Import fehlgeschlagen. Bitte erneut versuchen.","danger")}finally{qe=!1,Ve(e)}}function nd(e,t,n){if(!e.events?.emit)return;const a=t.metadata?.label||t.metadata?.filters?.label||`Import ${t.filename}`;e.events.emit("documentation:focus-range",{startDate:t.stats.startDateRaw||void 0,endDate:t.stats.endDateRaw||void 0,label:a,reason:"import",entryIds:n,autoSelectFirst:!!n.length})}function ad(e,t){if(!A){window.alert("Bitte zuerst eine Importdatei laden.");return}if(!A.stats.startDateRaw||!A.stats.endDateRaw){window.alert("Zeitraum konnte nicht bestimmt werden.");return}nd(t,A,A.lastImportRefs),Fe(e,"Dokumentation wurde auf den Importzeitraum fokussiert.")}function rd(e,t){const n=e.querySelector('[data-role="import-file"]');n&&n.addEventListener("change",()=>{const a=n.files?.[0];a&&(qe=!0,Fe(e,"Datei wird analysiert ..."),Ve(e),at(e,""),Yc(a,t.state.getState()).then(r=>{A=r,Ba(e),Fe(e,`${r.importableEntries.length} Einträge bereit zum Import.`)}).catch(r=>{console.error("Importdatei konnte nicht gelesen werden",r),Fe(e,r?.message||"Importdatei konnte nicht gelesen werden.","danger"),A=null,Ba(e)}).finally(()=>{qe=!1,Ve(e)}))}),e.addEventListener("click",a=>{const r=a.target?.closest("[data-action]");if(!r)return;const i=r.dataset.action;if(i){if(i==="clear-import"){Hc(e);return}if(i==="focus-import"){ad(e,t);return}i==="run-import"&&td(e,t)}})}function id(e,t){if(!e||ii)return;const n=e;n.innerHTML="";const a=Fc();n.appendChild(a),rd(a,t),Fe(a,"Wähle eine Datei aus, um den Import zu starten."),xn(a),xe("database:connected",()=>void xn(a)),xe("app:sectionChanged",r=>{(r==="daten"||r==="documentation"||r==="import")&&xn(a)}),ii=!0}const nt=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function sd(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function dt(e,t,n,a){return`
    <div class="dash-card"${a?` data-goto="${a}" style="cursor:pointer;"`:""}>
      <i class="bi ${e} dash-card-icon"></i>
      <div class="dash-card-value">${n}</div>
      <div class="dash-card-label">${v(t)}</div>
    </div>`}function od(){return`
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
  </section>`}function ld(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=od();const n=e.querySelector('[data-role="dash-cards"]'),a=e.querySelector('[data-role="dash-warn"]'),r=e.querySelector('[data-role="dash-recent"]');e.addEventListener("click",l=>{const o=l.target?.closest("[data-goto]");if(!o)return;const c=o.getAttribute("data-goto");c&&t.state.updateSlice("app",u=>({...u,activeSection:c}))});const i=async()=>{if(R()!=="sqlite"){n&&(n.innerHTML='<div class="dash-empty">Bitte zuerst eine Datenbank öffnen.</div>');return}const l=t.state.getState(),o=(he(l.gps?.points)||[]).length;let c=0,u=0,d=0,f=0,b=[],S=[],p=0;try{c=(await Si())?.rows?.length||0}catch{}try{u=(await ki())?.rows?.length||0}catch{}try{const y=(await xi())?.rows||[];d=y.length,f=y.reduce((w,I)=>w+(I.plants||0),0)}catch{}try{b=(await wi())?.rows||[]}catch{}try{const y=await Ei({}),w=y?.entries||y?.rows||[];p=y?.totalCount??w.length,S=w.slice(0,6)}catch{}if(n&&(n.innerHTML=[dt("bi-geo-alt","Standorte",nt(o)),dt("bi-flower1","Kulturen",nt(c)),dt("bi-droplet","Mittel im Sortiment",nt(u),"lager"),dt("bi-journal-check","Anwendungen",nt(p),"documentation"),dt("bi-map","Acker-Flächen",nt(d),"acker"),dt("bi-flower3","Pflanzen (Acker)",nt(f),"acker")].join("")),a){const y=[];b.forEach(w=>{w.bestand<=0&&(w.verbraucht>0||w.zugang>0)&&y.push(`<div class="dash-row"><span><i class="bi bi-box-seam me-1" style="color:#ef4444"></i>${v(w.name)}</span><span style="color:#ef4444">Bestand ${nt(w.bestand)} ${v(w.einheit||"")}</span></div>`)}),b.forEach(w=>{if(!w.zulEnde)return;const I=Math.round((new Date(w.zulEnde).getTime()-Date.now())/864e5);I<0?y.push(`<div class="dash-row"><span><i class="bi bi-calendar-x me-1" style="color:#ef4444"></i>${v(w.name)}</span><span style="color:#ef4444">Zulassung abgelaufen</span></div>`):I<180&&y.push(`<div class="dash-row"><span><i class="bi bi-calendar-event me-1" style="color:#f59e0b"></i>${v(w.name)}</span><span style="color:#f59e0b">Zulassung endet in ${I} T</span></div>`)}),a.innerHTML=y.length?y.slice(0,8).join(""):'<div class="dash-empty">Alles im grünen Bereich. ✓</div>'}r&&(r.innerHTML=S.length?S.map(y=>{const w=sd(y.datum||y.dateIso||y.created_at||y.createdAt||null),I=y.kultur||"",L=y.standort||"";return`<div class="dash-row"><span>${v(L)}${I?" · "+v(I):""}</span><span class="dash-empty" style="padding:0">${v(w)}</span></div>`}).join(""):'<div class="dash-empty">Noch keine Anwendungen erfasst.</div>')};t.state.subscribe(l=>{l?.app?.activeSection==="dashboard"&&i()}),i()}function di(e){document.querySelectorAll(".content-section").forEach(n=>{n.style.display="none"});const t=document.getElementById(`section-${e}`);t instanceof HTMLElement&&(t.style.display="block")}function ui(){oo(),mi();const e={state:{getState:M,updateSlice:Ne,subscribe:Ln},events:{emit:(y,w)=>{Ge(async()=>{const{emit:I}=await import("./index.BYnQNgHq.js").then(L=>L.aH);return{emit:I}},[]).then(({emit:I})=>{I(y,w)})},subscribe:xe}},t=document.querySelector('[data-region="startup"]'),n=document.querySelector('[data-region="shell"]'),a=document.querySelector('[data-region="main"]'),r=document.querySelector('[data-region="footer"]');Ho(t,e);const i=document.querySelector('[data-feature="calculation"]');lo(i,e);const l=document.querySelector('[data-feature="documentation"]');ql(l,e);const o=document.querySelector('[data-feature="settings"]');Pc(o,e);const c=document.querySelector('[data-feature="lager"]');Ic(c,e);const u=document.querySelector('[data-feature="acker"]');Bc(u,e);const d=document.querySelector('[data-feature="fotos"]');co(d,e,{archiveMode:!0});const f=document.querySelector('[data-feature="import-page"]');id(f,{state:{getState:M,updateSlice:Ne},events:e.events});const b=document.querySelector('[data-feature="dashboard"]');ld(b,e);const S=y=>{const w=document.body;w&&(w.classList.toggle("bg-app",y),w.classList.toggle("bg-startup",!y))},p=y=>{const w=!!y.app?.hasDatabase;if(S(w),t instanceof HTMLElement&&t.classList.toggle("d-none",w),n instanceof HTMLElement&&n.classList.toggle("d-none",!w),a instanceof HTMLElement&&a.classList.toggle("d-none",!w),r instanceof HTMLElement&&r.classList.toggle("d-none",!w),w){const I=y.app?.activeSection??"dashboard";di(I)}};p(e.state.getState()),Ln((y,w)=>{y.app?.hasDatabase!==w.app?.hasDatabase&&p(y),y.app?.activeSection!==w.app?.activeSection&&y.app?.hasDatabase&&di(y.app.activeSection)}),xe("app:sectionChanged",()=>{})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ui,{once:!0}):ui();
