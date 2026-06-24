const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/index.B7LAEMgA.js","_astro/index.BOF67kan.js","_astro/leaflet.C03ySvDx.css","_astro/leaflet-src.BcflbDBd.js","_astro/_commonjsHelpers.Cpj98o6Y.js","_astro/index.CPadEFgJ.js"])))=>i.map(i=>d[i]);
import{M as ne,N as ji,J as Oe,O as Rs,P as Ws,Q as Gi,h as ut,l as js,a as Ui,s as Ve,n as Gs,q as Vi,p as Or,e as T,r as tn,C as an,u as Ke,_ as gt,R as Us,S as Vs,w as g,t as M,m as Kr,T as Zs,j as Fa,k as Rr,U as Qs,V as Js,W as ze,X as Ys,Y as Zi,Z as Qi,H as Ji,G as nn,$ as Xs,a0 as eo,a1 as to,a2 as ao,a3 as no,a4 as Ea,z as ga,a5 as ro,x as io,a6 as Te,a7 as He,a8 as so,a9 as La,aa as oo,ab as lo,D as co,ac as Yi,ad as Xi,ae as ba,af as uo,ag as po,ah as mo,ai as Wr,aj as An,ak as Pn,al as fo,am as go,an as bo,ao as ho,ap as vo,aq as yo,ar as wo,as as es,at as ko,au as ts,av as xo,aw as mr,ax as fr,ay as So,az as Eo,aA as bt,aB as ha,aC as Lo,aD as jr,aE as In,aF as Gr,aG as qa,aH as Ur,aI as Do,aJ as Vr,aK as $o,aL as Ao,aM as Po,aN as Io,aO as Co,aP as Rn,v as as,i as Mo,b as zo,c as Bo}from"./index.BOF67kan.js";const Wn="__psl_history_seeded",jn=200,Zr=["Salat","Apfel","Wein","Tomate","Kartoffel","Hopfen","Raps","Birne"],Qr=["Spritzung","Düngung","Pflege","Behandlung"],Jr=["LACES","MALDO","VITVI","SOLTU","PRNUS","CUPAR","CYNCR","ALLCE"],Yr=["BBCH 10","BBCH 31","BBCH 41","BBCH 55","BBCH 65","BBCH 71","BBCH 81"],No=[{mediumId:"seed-water",name:"Wasser",unit:"L",methodId:"perKiste",methodLabel:"pro Kiste",value:.02,zulassungsnummer:"N/A"},{mediumId:"seed-tonikum",name:"Tonikum X",unit:"ml",methodId:"perKiste",methodLabel:"pro Kiste",value:.85,zulassungsnummer:"Z-123456"},{mediumId:"seed-oel",name:"Pflegeöl Y",unit:"ml",methodId:"percentWater",methodLabel:"% vom Wasser",value:.12,zulassungsnummer:"Z-654321"}];function Fo(e){if(typeof window>"u")return;const a=new URLSearchParams(window.location.search).has("seedHistory");if(!a)return;const n=window;n.__PSL||(n.__PSL={});const r=n.__PSL;r.seedHistoryEntries=(s=jn)=>Xr(e,{count:s}),r.resetHistorySeedFlag=()=>localStorage.removeItem(Wn),!a&&!localStorage.getItem(Wn)&&ne()==="sqlite"&&Xr(e,{count:jn,setFlag:!0}).catch(s=>{console.error("History seeding failed",s)})}async function qo(e){if(!e.state.getState().app?.hasDatabase){if(typeof e.state.subscribe!="function")throw new Error("SQLite-Datenbank ist noch nicht initialisiert.");await new Promise((t,a)=>{const n=window.setTimeout(()=>{i(),a(new Error("SQLite-Datenbank wurde nicht rechtzeitig initialisiert."))},1e4),r=e.state.subscribe?.(s=>{s.app?.hasDatabase&&(i(),t())}),i=()=>{window.clearTimeout(n),typeof r=="function"&&r()}})}}async function Xr(e,t={}){const a=t.count??jn;if(ne()!=="sqlite")throw new Error("SQLite-Treiber muss aktiv sein, bevor Daten befüllt werden können.");await qo(e);const n=performance.now();let r=0;for(let i=0;i<a;i+=1){const s=To(i);await ji(s),r+=1}try{await Oe()}catch(i){console.warn("Seed-Daten konnten nicht persistent gespeichert werden",i)}return e.events.emit("history:data-changed",{source:"dev-history-seed"}),t.setFlag&&localStorage.setItem(Wn,"1"),{inserted:r,durationMs:performance.now()-n}}function To(e){const t=new Date;t.setDate(t.getDate()-e);const a=t.toLocaleDateString("de-DE"),n=t.toISOString(),r=20+e%30,i=Number((r*.5).toFixed(2));return{datum:a,dateIso:n,ersteller:`Seeder ${1+e%5}`,standort:`Test-Ort ${String.fromCharCode(65+e%6)}`,kultur:Zr[e%Zr.length],usageType:Qr[e%Qr.length],kisten:r,eppoCode:Jr[e%Jr.length],bbch:Yr[e%Yr.length],gps:`GPS-Notiz ${e}`,gpsCoordinates:{latitude:48+e%10*.01,longitude:11+e%10*.01},gpsPointId:`seed-gps-${e}`,invekos:`INV-${String(1e3+e).padStart(4,"0")}`,uhrzeit:`${String(6+e%12).padStart(2,"0")}:${String(e*7%60).padStart(2,"0")}`,savedAt:n,items:Ho(e,r,i)}}function Ho(e,t,a){return No.map((n,r)=>{const i=1+(e+r)%4*.05,s=Number((n.value*i).toFixed(4)),l=Number((s*t).toFixed(2));return{id:`seed-item-${e}-${r}`,name:n.name,unit:n.unit,methodLabel:n.methodLabel,methodId:n.methodId,value:s,total:l,inputs:{kisten:t,waterVolume:a},zulassungsnummer:n.zulassungsnummer,mediumId:n.mediumId}})}let Pt=null,Yt=null,ei=!1,ti=!1;async function _o(){if(!("serviceWorker"in navigator))return console.warn("[PWA] Service Workers nicht unterstützt"),null;try{return Yt=await navigator.serviceWorker.register("/psm/sw.js",{scope:"/psm/",updateViaCache:"none"}),console.log("[PWA] Service Worker registriert:",Yt.scope),Yt.addEventListener("updatefound",()=>{const e=Yt?.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&(console.log("[PWA] Neues Update verfügbar"),jt("pwa:update-available"))})}),navigator.serviceWorker.addEventListener("message",Oo),ei||(ei=!0,navigator.serviceWorker.addEventListener("controllerchange",()=>{ti||(ti=!0,window.location.reload())})),Yt}catch(e){return console.error("[PWA] Service Worker Registrierung fehlgeschlagen:",e),null}}function Oo(e){const{type:t,payload:a}=e.data||{};switch(t){case"DB_STATE":jt("pwa:db-state",a);break;case"CACHES_CLEARED":jt("pwa:caches-cleared");break}}async function gn(e){if(!navigator.serviceWorker.controller){localStorage.setItem("psm-db-state",JSON.stringify({...e,updatedAt:new Date().toISOString()}));return}navigator.serviceWorker.controller.postMessage({type:"SET_DB_STATE",payload:e})}async function ns(){const e=localStorage.getItem("psm-db-state");if(e)try{return JSON.parse(e)}catch{}return navigator.serviceWorker?.controller?new Promise(t=>{const a=n=>{n.data?.type==="DB_STATE"&&(navigator.serviceWorker.removeEventListener("message",a),t(n.data.payload))};navigator.serviceWorker.addEventListener("message",a),navigator.serviceWorker.controller.postMessage({type:"GET_DB_STATE"}),setTimeout(()=>{navigator.serviceWorker.removeEventListener("message",a),t(null)},1e3)}):null}async function Ko(){const e=await ns();return!!(e?.hasDatabase&&e?.autoStartEnabled)}function Ro(){window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),Pt=e,console.log("[PWA] Install Prompt verfügbar"),localStorage.getItem("psm-app-installed")==="true"&&(console.log("[PWA] Widerspruch erkannt: Flag sagt installiert, aber Prompt verfügbar"),localStorage.removeItem("psm-app-installed"),console.log("[PWA] Veraltetes Installations-Flag entfernt")),jt("pwa:install-available")}),window.addEventListener("appinstalled",()=>{Pt=null,hn(),console.log("[PWA] App installiert - Flag gesetzt"),jt("pwa:installed")})}function bn(){return Pt!==null}function Mt(){return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0}function gr(){const e=navigator.userAgent.toLowerCase();return e.includes("edg/")?"edge":e.includes("chrome")&&!e.includes("edg")?"chrome":e.includes("firefox")?"firefox":e.includes("safari")&&!e.includes("chrome")?"safari":"other"}function br(){return!!(Mt()||localStorage.getItem("psm-app-installed")==="true"||window.matchMedia("(display-mode: fullscreen)").matches||window.matchMedia("(display-mode: minimal-ui)").matches||window.matchMedia("(display-mode: window-controls-overlay)").matches)}async function rs(){if(br())return!0;try{if("getInstalledRelatedApps"in navigator){const e=await navigator.getInstalledRelatedApps();if(console.log("[PWA] getInstalledRelatedApps result:",e),e&&e.length>0)return hn(),!0}}catch(e){console.warn("[PWA] getInstalledRelatedApps API Fehler:",e)}return!1}function hn(){localStorage.setItem("psm-app-installed","true"),console.log("[PWA] App als installiert markiert")}function Wo(){localStorage.removeItem("psm-app-installed"),console.log("[PWA] Installations-Flag entfernt")}function is(){const e=gr(),t=Mt(),a=br();return{canInstall:bn(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function ss(){const e=gr(),t=Mt(),a=await rs();return{canInstall:bn(),isInstalled:a&&!t,isStandalone:t,browser:e,showBanner:!t}}async function jo(){if(!Pt)return console.warn("[PWA] Kein Install Prompt verfügbar"),!1;try{await Pt.prompt();const{outcome:e}=await Pt.userChoice;return console.log("[PWA] Install Prompt Ergebnis:",e),e==="accepted"&&hn(),Pt=null,e==="accepted"}catch(e){return console.error("[PWA] Install Prompt fehlgeschlagen:",e),!1}}function Go(e){if(!("launchQueue"in window)){console.log("[PWA] Launch Queue API nicht verfügbar");return}window.launchQueue?.setConsumer(async t=>{if(!t.files?.length){console.log("[PWA] Launch ohne Dateien");return}console.log("[PWA] Datei via Launch Queue empfangen:",t.files.length);for(const a of t.files)try{await e(a),await gn({hasDatabase:!0,fileHandleName:a.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0});break}catch(n){console.error("[PWA] Fehler beim Öffnen der Datei:",n)}}),console.log("[PWA] File Handling initialisiert")}const wt="psm-file-handles",hr="last-database";async function Gn(e){try{const t=await vr(),n=t.transaction(wt,"readwrite").objectStore(wt);await new Promise((r,i)=>{const s=n.put({key:hr,handle:e,savedAt:new Date().toISOString()});s.onsuccess=()=>r(),s.onerror=()=>i(s.error)}),t.close(),console.log("[PWA] FileHandle gespeichert"),await gn({hasDatabase:!0,fileHandleName:e.name,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}catch(t){console.error("[PWA] FileHandle speichern fehlgeschlagen:",t)}}async function Un(){try{const e=await vr(),a=e.transaction(wt,"readonly").objectStore(wt),n=await new Promise((i,s)=>{const l=a.get(hr);l.onsuccess=()=>i(l.result),l.onerror=()=>s(l.error)});if(e.close(),!n?.handle)return null;const r=n.handle;return typeof r.queryPermission=="function"&&await r.queryPermission({mode:"readwrite"})==="granted"?(console.log("[PWA] FileHandle mit Berechtigung geladen"),n.handle):(console.log("[PWA] FileHandle gefunden, aber Berechtigung erforderlich"),n.handle)}catch(e){return console.error("[PWA] FileHandle laden fehlgeschlagen:",e),null}}async function Uo(e){try{const t=e;return typeof t.requestPermission!="function"?(await e.getFile(),!0):await t.requestPermission({mode:"readwrite"})==="granted"}catch{return!1}}async function Vo(){try{const e=await vr(),a=e.transaction(wt,"readwrite").objectStore(wt);await new Promise((n,r)=>{const i=a.delete(hr);i.onsuccess=()=>n(),i.onerror=()=>r(i.error)}),e.close(),await gn({hasDatabase:!1,autoStartEnabled:!1}),console.log("[PWA] FileHandle gelöscht")}catch(e){console.error("[PWA] FileHandle löschen fehlgeschlagen:",e)}}async function vr(){return new Promise((e,t)=>{const a=indexedDB.open("psm-file-handles",1);a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result),a.onupgradeneeded=n=>{const r=n.target.result;r.objectStoreNames.contains(wt)||r.createObjectStore(wt,{keyPath:"key"})}})}function jt(e,t){window.dispatchEvent(new CustomEvent(e,{detail:t}))}function os(){return{serviceWorker:"serviceWorker"in navigator,fileSystemAccess:typeof window.showOpenFilePicker=="function",launchQueue:"launchQueue"in window,indexedDB:"indexedDB"in window,standalone:Mt(),installAvailable:bn()}}async function Zo(e){if(console.log("[PWA] Initialisierung..."),await _o(),Ro(),e?.onFileOpened&&Go(e.onFileOpened),e?.onAutoStart&&await Ko()){const t=await Un();if(t){const a=t;let n=!1;if(typeof a.queryPermission=="function"&&(n=await a.queryPermission({mode:"readwrite"})==="granted"),n){console.log("[PWA] Auto-Start mit gespeicherter Datei"),e.onFileOpened&&await e.onFileOpened(t);return}console.log("[PWA] Auto-Start: Berechtigung für Datei erforderlich"),jt("pwa:permission-required",{handle:t})}}console.log("[PWA] Capabilities:",os())}async function Qo(){if(console.group("🔧 PWA Debug Status"),console.log("📱 Standalone Mode:",Mt()),console.log("💾 localStorage Flag:",localStorage.getItem("psm-app-installed")),console.log("🔔 Install Prompt verfügbar:",bn()),console.log("🌐 Browser:",gr()),console.group("📺 Display Mode Checks"),console.log("standalone:",window.matchMedia("(display-mode: standalone)").matches),console.log("fullscreen:",window.matchMedia("(display-mode: fullscreen)").matches),console.log("minimal-ui:",window.matchMedia("(display-mode: minimal-ui)").matches),console.log("window-controls-overlay:",window.matchMedia("(display-mode: window-controls-overlay)").matches),console.log("browser:",window.matchMedia("(display-mode: browser)").matches),console.groupEnd(),console.group("🔍 getInstalledRelatedApps API"),"getInstalledRelatedApps"in navigator)try{const e=await navigator.getInstalledRelatedApps();console.log("Installierte Apps:",e)}catch(e){console.log("API Fehler:",e)}else console.log("API nicht verfügbar");console.groupEnd(),console.group("📊 Status Vergleich"),console.log("Sync (isProbablyInstalled):",br()),console.log("Async (checkIfInstalled):",await rs()),console.log("getInstallStatus():",is()),console.log("getInstallStatusAsync():",await ss()),console.groupEnd(),console.log("💡 Tipp: clearInstalledFlag() zum Zurücksetzen des Flags"),console.groupEnd()}typeof window<"u"&&(window.pwaDebug=Qo,window.pwaClearFlag=Wo);let Ta=!1;function Jo(e){const t=r=>{if(Ta){Ta=!1;return}return r.preventDefault(),r.returnValue="",""};let a=!1;const n=r=>{const i=!!r.app?.hasDatabase;i&&!a?(window.addEventListener("beforeunload",t),a=!0):!i&&a&&(window.removeEventListener("beforeunload",t),a=!1)};n(e.getState()),e.subscribe(n),document.addEventListener("click",r=>{const i=r.target.closest("a");i&&i.target==="_blank"&&(Ta=!0,setTimeout(()=>{Ta=!1},100))})}function Yo(){const e=document.getElementById("app-root");if(!e)throw new Error("app-root Container fehlt");return{startup:e.querySelector('[data-region="startup"]'),shell:e.querySelector('[data-region="shell"]'),main:e.querySelector('[data-region="main"]'),footer:e.querySelector('[data-region="footer"]')}}async function Xo(){if(Rs()){window.location.replace("/psm/m/");return}Yo(),Ws();const e=Gi();e!=="memory"&&ut(e),await js();const t={state:{getState:T,patchState:Or,updateSlice:Ke,subscribe:an},events:{emit:tn,subscribe:Ve}};Fo(t),Ui(),Jo(t.state),Zo({onFileOpened:async a=>{const n=await gt(()=>import("./index.BOF67kan.js").then(i=>i.aR),[]),r=await gt(()=>import("./index.BOF67kan.js").then(i=>i.aQ),[]);if(r.isSupported()){n.setActiveDriver("sqlite");const i=await a.getFile(),s=await i.arrayBuffer(),l=await r.importFromArrayBuffer(s,i.name);await Gn(a);const{applyDatabase:c}=await gt(async()=>{const{applyDatabase:u}=await import("./index.BOF67kan.js").then(d=>d.aT);return{applyDatabase:u}},[]);c(l.data),tn("database:connected",{driver:"sqlite",autoStarted:!0})}}}),Ve("database:connected",async a=>{await gn({hasDatabase:!0,lastAccess:new Date().toISOString(),autoStartEnabled:!0})}),Ve("database:connected",async a=>{if(ne()==="sqlite")try{await Gs(),await Vi()}catch(n){console.warn("GPS-Punkte konnten beim Start nicht geladen werden",n)}}),Or({app:{...T().app,ready:!0}})}const ai="__pflanzenschutz_bootstrapped__",ni=window;function ri(){Xo().catch(e=>{console.error("bootstrap failed",e)})}ni[ai]||(ni[ai]=!0,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ri,{once:!0}):ri());const ls=[{id:"start",label:"Start",icon:"bi-grid-1x2",sections:[{section:"dashboard",label:"Übersicht",icon:"bi-grid-1x2"}]},{id:"psm",label:"PSM",icon:"bi-flower1",sections:[{section:"calc",label:"Neu erfassen",icon:"bi-pencil-square"},{section:"documentation",label:"Übersicht",icon:"bi-list-ul"},{section:"lager",label:"Lager",icon:"bi-box-seam"},{section:"settings",label:"Einstellungen",icon:"bi-gear"}]},{id:"acker",label:"Acker-Planer",icon:"bi-map",sections:[{section:"acker",label:"Karte",icon:"bi-map"},{section:"kultur",label:"Kulturführung",icon:"bi-clipboard2-pulse"}]},{id:"fotos",label:"Fotos",icon:"bi-camera",sections:[{section:"fotos",label:"Fotos",icon:"bi-camera"}]},{id:"daten",label:"Daten",icon:"bi-database",sections:[{section:"daten",label:"Import",icon:"bi-cloud-upload"}]}],cs={dashboard:"start",calc:"psm",documentation:"psm",lager:"psm",history:"psm",report:"psm",acker:"acker",kultur:"acker",fotos:"fotos",settings:"psm",gps:"psm",lookup:"psm",import:"daten",daten:"daten"};function ds(e){return ls.find(t=>t.id===e)}function el(e){const t=cs[e];return t?ds(t):void 0}function tl(){const e=document.getElementById("offline-indicator");if(!e)return;const t=()=>{const a=!navigator.onLine;e.classList.toggle("d-none",!a)};t(),window.addEventListener("online",t),window.addEventListener("offline",t)}function ii(e){T().app.activeSection!==e&&(Ke("app",t=>({...t,activeSection:e})),tn("app:sectionChanged",e))}function si(){tl();const e=document.querySelectorAll(".nav-btn[data-area]"),t=document.getElementById("brand-link"),a=document.getElementById("topnav-tabs"),n=document.getElementById("topnav-area-icon"),r=document.getElementById("topnav-area-label"),i={};for(const f of ls)i[f.id]=f.sections[0].section;let s=null;function l(f,x){if(a){if(f.sections.length<=1){a.innerHTML="";return}a.innerHTML=f.sections.map(v=>`
        <button type="button" class="topnav-tab${v.section===x?" active":""}" data-section="${v.section}">
          <i class="bi ${v.icon}"></i><span>${v.label}</span>
        </button>`).join("")}}function c(f){a&&a.querySelectorAll(".topnav-tab").forEach(x=>{x.classList.toggle("active",x.dataset.section===f)})}const u=f=>{const x=ds(f);!x||!T().app.hasDatabase||ii(i[f]??x.sections[0].section)};e.forEach(f=>{f.addEventListener("click",()=>{const x=f.dataset.area;x&&u(x)})}),t?.addEventListener("click",f=>{f.preventDefault(),u("start")}),a?.addEventListener("click",f=>{const v=f.target?.closest(".topnav-tab")?.dataset.section;v&&ii(v)});const d=document.querySelector('.nav-btn[data-action="share-data"]');d?.addEventListener("click",()=>{d.disabled=!0,gt(async()=>{const{shareMobileData:f}=await import("./index.B7LAEMgA.js");return{shareMobileData:f}},__vite__mapDeps([0,1])).then(({shareMobileData:f})=>f()).catch(f=>console.error("Teilen fehlgeschlagen",f)).finally(()=>{d.disabled=!1})}),Us(),Ve("history:data-changed",f=>{if(!document.body.classList.contains("mobile-mode"))return;const x=f?.type;(x==="created"||x==="created-bulk")&&Vs()});const p=f=>{const x=document.getElementById("brand-title"),v=document.getElementById("brand-tagline"),$=document.getElementById("app-version");x&&f.company.name&&(x.textContent=f.company.name),v&&f.company.headline&&(v.textContent=f.company.headline),$&&f.app.version&&($.textContent=`v${f.app.version}`);const A=f.app.hasDatabase,K=f.app.activeSection,G=el(K);G&&cs[K]===G.id&&(i[G.id]=K),e.forEach(q=>{q.disabled=!A;const V=A&&G?.id===q.dataset.area;q.classList.toggle("active",!!V)}),G&&(n&&(n.className=`bi ${G.icon} topnav-area-icon`),r&&(r.textContent=G.label),s!==G.id?(l(G,K),s=G.id):c(K))};an(p),p(T());let m=!1;const y=document.title||"Pflanzenschutz";window.addEventListener("beforeprint",()=>{m||(m=!0,document.title=" ")}),window.addEventListener("afterprint",()=>{m&&(m=!1,document.title=y)})}function al(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",si,{once:!0}):si()}al();const nl="https://api.digitale-psm.de",rl="digitale-psm.de";async function il(e){try{const t=await fetch(`${nl}/api/v1/${rl}/views/${e}`,{method:"POST",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`API error: ${t.status}`);return(await t.json()).views}catch(t){return console.warn("[ViewCounter] Fehler beim Zählen:",t),null}}function sl(e){return e>=1e6?(e/1e6).toFixed(1).replace(".",",")+"M":e>=1e3?(e/1e3).toFixed(1).replace(".",",")+"K":e.toString()}const Vn="pflanzenschutz-datenbank.json";let oi=!1;function ol(e){return e?`${e.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"pflanzenschutz-datenbank"}.json`:Vn}async function Xt(e,t){if(!e){await t();return}const a=e.textContent??"";e.disabled=!0,e.dataset.busy="true",e.textContent="Bitte warten...";try{await t()}finally{e.disabled=!1,e.dataset.busy="false",e.textContent=a}}function li(e){return g(e)}function ll(e){const t=document.createElement("section");t.className="section-container d-none",t.innerHTML=`
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
                <input class="form-control" id="wizard-company-name" name="wizard-company-name" required value="${li(e.name)}" placeholder="z.B. Gärtnerei Müller" />
              </div>
              <div class="col-md-6">
                <label class="form-label d-block mb-2" for="wizard-company-headline">
                  Überschrift <span class="text-muted small">(optional)</span>
                </label>
                <input class="form-control" id="wizard-company-headline" name="wizard-company-headline" value="${li(e.headline)}" placeholder="z.B. Pflanzenschutz-Dokumentation 2025" />
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
  `;const a=t.querySelector("#database-wizard-form");if(!a)throw new Error("Wizard-Formular konnte nicht erzeugt werden");const n=t.querySelector('[data-role="wizard-result"]');if(!n)throw new Error("Wizard-Resultat-Container fehlt");return{section:t,form:a,resultCard:n,preview:t.querySelector('[data-role="wizard-preview"]'),filenameLabel:t.querySelector('[data-role="wizard-filename"]'),saveHint:t.querySelector('[data-role="wizard-save-hint"]'),saveButton:t.querySelector('[data-action="wizard-save"]'),reset(){a.reset(),n.classList.add("d-none");const r=t.querySelector('[data-role="wizard-preview"]');r&&(r.textContent="");const i=t.querySelector('[data-role="wizard-filename"]');i&&(i.textContent="")}}}function cl(e,t){if(!e||oi)return;const a=e;let n=null,r=Vn,i="landing";const l=t.state.getState().company,c=document.createElement("section");c.className="section-container";function u(I,D){const C=I;c.innerHTML=`
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
  `}u(!1,Mt());const d=ll(l);a.innerHTML="",a.appendChild(c),a.appendChild(d.section);const p=typeof window<"u"&&typeof window.showSaveFilePicker=="function";d.saveButton&&(p?d.saveHint&&(d.saveHint.textContent='Der Browser fragt nach einem Speicherort. Die erzeugte Datei kannst du später über "Bestehende Datei verbinden" erneut laden.'):(d.saveButton.disabled=!0,d.saveButton.textContent="Datei speichern (nicht verfügbar)",d.saveHint&&(d.saveHint.textContent="Dieser Browser unterstützt keinen direkten Dateidialog. Bitte nutze einen Chromium-basierten Browser (z. B. Chrome, Edge) über HTTPS oder http://localhost.")));function m(I=t.state.getState()){const D=!!I.app?.hasDatabase;if(a.classList.toggle("d-none",D),D){c.classList.add("d-none"),d.section.classList.add("d-none");return}i==="wizard"?(c.classList.add("d-none"),d.section.classList.remove("d-none")):(c.classList.remove("d-none"),d.section.classList.add("d-none"))}async function y(I){await Xt(I,async()=>{try{const D=ne();D==="sqlite"||D==="filesystem"?ut(D):ut("filesystem")}catch(D){throw M.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),D instanceof Error?D:new Error("Dateisystem nicht verfügbar")}try{const D=await Zs();Fa(D.data);const C=D.context;C?.fileHandle&&await Gn(C.fileHandle),t.events.emit("database:connected",{driver:ne()})}catch(D){console.error("Fehler beim Öffnen der Datenbank",D),M.error(D instanceof Error?D.message:"Öffnen der Datenbank fehlgeschlagen")}})}function f(I){Xt(I,async()=>{const D=Kr(),C=["localstorage","sqlite","memory"];for(const re of C)try{ut(re);const ee=await Rr(D);Fa(ee.data),t.events.emit("database:connected",{driver:ne()||re});return}catch(ee){console.warn(`Treiber ${re} konnte nicht initialisiert werden`,ee)}const _="Keine geeignete Speicheroption verfügbar. Bitte Browserberechtigungen prüfen.";console.error(_),M.error(_)})}async function x(I){if(!n){M.warning("Bitte erst die Datenbank erzeugen.");return}await Xt(I,async()=>{try{const D=ne();D==="sqlite"||D==="filesystem"?ut(D):ut("filesystem")}catch(D){throw M.error("Dateisystemzugriff wird nicht unterstützt in diesem Browser."),D instanceof Error?D:new Error("Dateisystem nicht verfügbar")}try{const D=await Rr(n);Fa(D.data),t.events.emit("database:connected",{driver:ne()})}catch(D){console.error("Fehler beim Speichern der Datenbank",D),M.error(D instanceof Error?D.message:"Die Datei konnte nicht gespeichert werden")}})}function v(I){I.preventDefault();const D=new FormData(d.form),C=(D.get("wizard-company-name")||"").toString().trim();if(!C){M.warning("Bitte einen Firmennamen angeben.");return}const _=(D.get("wizard-company-headline")||"").toString().trim(),re=(D.get("wizard-company-address")||"").toString().trim();n=Kr({meta:{company:{name:C,headline:_,logoUrl:"",contactEmail:"",address:re}}}),r=ol(C),d.preview.textContent=JSON.stringify(n,null,2),d.filenameLabel.textContent=r,d.resultCard.classList.remove("d-none"),d.resultCard.scrollIntoView({behavior:"smooth",block:"start"})}function $(){i="landing",n=null,r=Vn,d.reset(),m()}function A(){i="wizard",m()}async function K(I){await Xt(I,async()=>{try{const D=await Un();if(!D){M.warning("Keine gespeicherte Datei gefunden.");return}if(!await Uo(D)){M.warning("Berechtigung zum Zugriff auf die Datei wurde verweigert.");return}ut("sqlite");const _=await D.getFile(),re=await _.arrayBuffer(),ee=await Qs(re,_.name);Js(D),Fa(ee.data),await Gn(D),t.events.emit("database:connected",{driver:"sqlite",autoStarted:!0}),M.success("Datenbank erfolgreich geladen!")}catch(D){console.error("Auto-Start fehlgeschlagen:",D),M.error(D instanceof Error?D.message:"Fehler beim Laden der gespeicherten Datei")}})}async function G(){await Vo();const I=c.querySelector("#auto-start-banner");I&&I.classList.add("d-none"),M.info("Gespeicherte Datei wurde vergessen.")}async function q(I){await Xt(I,async()=>{if(await jo()){M.success("App wird installiert!");const C=c.querySelector("#pwa-install-banner");C&&C.classList.add("d-none")}})}if(c.addEventListener("click",I=>{const D=I.target?.closest("button[data-action]");if(!D)return;const C=D.dataset.action;if(C==="start-wizard"){A();return}C==="open"?y(D):C==="useDefaults"?f(D):C==="auto-start"?K(D):C==="auto-start-forget"?G():C==="install-pwa"&&q(D)}),d.form.addEventListener("submit",v),d.section.addEventListener("click",I=>{const D=I.target?.closest("[data-action]");if(!D)return;const C=D.dataset.action;if(C==="wizard-back"){$();return}C==="wizard-save"&&x(D)}),t.state.subscribe(I=>m(I)),m(t.state.getState()),!t.state.getState().app.hasDatabase){const I=Gi();if(I&&I!==ne())try{ut(I)}catch(D){console.warn("Bevorzugter Speicher konnte nicht gesetzt werden",D)}}(async()=>{const I=await Un(),D=await ns(),C=!!(I&&D?.hasDatabase),_=Mt();u(C,_);const re=c.querySelector('[data-role="view-count"]');if(re&&il("app").then(oe=>{oe!==null&&(re.textContent=sl(oe))}),C&&I){const oe=c.querySelector('[data-role="auto-start-filename"]');oe&&(oe.textContent=`Datei: ${I.name}`)}V(),window.addEventListener("pwa:install-available",()=>{V()}),window.addEventListener("pwa:installed",()=>{hn(),V()}),window.addEventListener("pwa:permission-required",async oe=>{const We=oe.detail?.handle;if(We){const qe=c.querySelector("#auto-start-banner"),Qe=c.querySelector('[data-role="auto-start-filename"]');qe&&Qe&&(Qe.textContent=`Datei: ${We.name} (Berechtigung erforderlich)`,qe.classList.remove("d-none"))}}),console.log("[Startup] PWA Capabilities:",os());const ee=await ss();console.log("[Startup] PWA Install Status (async):",ee),Fe(ee)})();function V(){const I=is();Fe(I)}function Fe(I){const D=c.querySelector("#pwa-install-banner"),C=c.querySelector('[data-role="pwa-content"]');if(!(!D||!C)){if(!I.showBanner){D.classList.add("d-none");return}D.classList.remove("d-none"),I.isInstalled?C.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-check-circle text-success me-1"></i>App ist bereits installiert
        </p>
        <p class="small mb-0" style="color: var(--text-muted);">
          Öffne die App über dein Desktop- oder Startmenü-Symbol für die beste Erfahrung.
        </p>
      `:I.canInstall?C.innerHTML=`
        <p class="small mb-2" style="color: var(--text-muted);">
          <i class="bi bi-download me-1"></i>Für schnelleren Zugriff als App installieren
        </p>
        <button class="btn btn-sm btn-outline-light" data-action="install-pwa">
          <i class="bi bi-download me-1"></i>App installieren
        </button>
      `:D.classList.add("d-none")}}oi=!0}function us(e){let t=!1,a=!1;const n=l=>{e.onStatusChange&&e.onStatusChange(l)},r=()=>{t||!a||T().app.activeSection!==e.section||e.shouldRefresh&&!e.shouldRefresh()||(a=!1,n("refreshing"),Promise.resolve(e.onRefresh()).catch(c=>{console.error("Auto-Refresh konnte nicht ausgeführt werden",c),a=!0,n("stale")}).finally(()=>{!t&&!a&&n("idle")}))},i=Ve(e.event,()=>{e.shouldHandleEvent&&!e.shouldHandleEvent()||(a=!0,n("stale"),r())}),s=Ve("app:sectionChanged",l=>{l===e.section&&(a?r():n("idle"))});return T().app.activeSection===e.section&&n("idle"),()=>{t=!0,i(),s()}}const dl={prev:"Zurück",next:"Weiter",loading:"Lädt …",empty:"Keine Einträge verfügbar"};function ci(){const e=document.createElement("span");return e.className="spinner-border spinner-border-sm",e.setAttribute("role","status"),e.setAttribute("aria-hidden","true"),e}function di(e){const t=document.createElement("div");return t.className="pager-widget__info text-muted small text-center flex-grow-1",t.textContent=e?.trim()||"",t}function Da(e,t){if(!e)return null;const a=document.createElement("div");a.className="pager-widget d-flex flex-column gap-2",e.innerHTML="",e.appendChild(a);let n={status:"hidden"},r=!1;const i={...dl,...t.labels||{}};function s(){a.replaceChildren()}function l(p){const m=di(p.info||i.empty);a.replaceChildren(m)}function c(p){const m=document.createElement("div");m.className="alert alert-danger mb-0",m.textContent=p.message||"Unbekannter Fehler",a.replaceChildren(m)}function u(p){const m=document.createElement("div");m.className="pager-widget__controls d-flex flex-column flex-md-row gap-2 align-items-stretch";const y=document.createElement("button");y.type="button",y.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",y.disabled=!p.canPrev||p.loadingDirection==="prev",y.textContent=i.prev,p.loadingDirection==="prev"&&y.prepend(ci()),y.addEventListener("click",()=>{y.disabled||t.onPrev()});const f=document.createElement("button");f.type="button",f.className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2",f.disabled=!p.canNext||p.loadingDirection==="next",f.textContent=i.next,p.loadingDirection==="next"&&f.append(ci()),f.addEventListener("click",()=>{f.disabled||t.onNext()});const x=di(p.info||(p.canPrev||p.canNext?i.loading:i.empty));m.append(y,x,f),a.replaceChildren(m)}function d(p){switch(p.status){case"hidden":s();break;case"disabled":l(p);break;case"error":c(p);break;case"ready":u(p);break;default:s();break}}return{update(p){r||(n=p,d(p))},destroy(){r||(r=!0,a.replaceChildren(),e.innerHTML="")},getState(){return n}}}const yr=new Set;let ui=!1;function ul(){return typeof window>"u"?null:window.__PSL?.debugOverlayApi??null}function ps(){ui||typeof window>"u"||(ui=!0,window.addEventListener("psl:debug-overlay-ready",()=>{yr.forEach(e=>{wr(e)})}))}function wr(e){const t=ul();t?.registerProvider&&(e.handle||(e.handle=t.registerProvider(e.config)),e.handle.update(e.lastMetrics??null))}function ms(e){const t={config:e,handle:null,lastMetrics:null};return yr.add(t),ps(),wr(t),t}function fs(e,t){e.lastMetrics=t,yr.add(e),ps(),wr(e)}function gs(e){if(e==null)return 0;try{const t=JSON.stringify(e);return t?Number((t.length/1024).toFixed(1)):0}catch{return null}}const pi=5e3,mi=50,kr=50,Ga=3;function Cn(e){if(e==null||e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function pl(e){if(!e)return null;const t=Cn(e.areaHa);if(t!==null)return t;const a=Cn(e.areaAr);if(a!==null)return a/100;const n=Cn(e.areaSqm);return n!==null?n/1e4:null}function ml(e,t="–"){const a=pl(e);return a===null?t:co(a,2,t)}function fl(e){return e.toISOString().slice(0,10)}function rn(e){if(!e)return;if(/^\d{4}-\d{2}-\d{2}$/.test(e))return e;const t=new Date(e);if(!Number.isNaN(t.getTime()))return fl(t)}function fi(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function xr(){return{startDate:"",endDate:""}}function bs(e,t){if(!e)return;const a=e.querySelector("#doc-start"),n=e.querySelector("#doc-end");a&&t.startDate&&(a.value=t.startDate),n&&t.endDate&&(n.value=t.endDate)}function gl(e,t="sqlite"){if(typeof e=="string")return e.includes(":")?e:/^\d+$/.test(e)?Ot(t,Number(e)):e;if(typeof e=="number")return Ot(t,e);if(e&&typeof e=="object"){const a=e.source||t;if(typeof e.ref=="string"&&e.ref.includes(":"))return e.ref;const n=Number(e.ref);if(!Number.isNaN(n))return Ot(a,n)}return null}function bl(e){const t=new Set;return e?.length&&e.forEach(a=>{const n=gl(a);n&&t.add(n)}),t}function hs(e){const t=e.querySelector('[data-role="doc-focus-banner"]'),a=e.querySelector('[data-role="doc-focus-text"]');if(!t||!a)return;if(!vt){t.classList.add("d-none");return}const n=j.startDate&&j.endDate?`${j.startDate} - ${j.endDate}`:"Aktuelle Filter",r=vt.label||"Importierter Zeitraum",i=vt.highlightEntryIds.size,s=i?` (${i} markiert)`:"";a.textContent=`${r}: ${n}${s}`,t.classList.remove("d-none")}function hl(e,t){const a=e.querySelector('[data-role="doc-refresh-indicator"]');if(a){if(a.classList.remove("alert-info","alert-warning"),t==="idle"){a.classList.add("d-none");return}a.classList.remove("d-none"),t==="stale"?(a.classList.add("alert-warning"),a.textContent="Neue Dokumentationseinträge verfügbar. Ansicht aktualisiert sich beim Öffnen."):(a.classList.add("alert-info"),a.textContent="Aktualisiere Dokumentation...")}}function Mn(e,t,a={}){vt&&(vt=null,da=null,hs(e),a.refreshList&&kt(e,t.state.getState().fieldLabels))}function vl(e,t){if(!da)return;const a=It(da);a&&(da=null,Ss(e,a,t))}function yl(e,t,a){if(!a)return;const n=rn(a.startDate),r=rn(a.endDate),i=!!a.entryIds?.length;if(!n&&!r&&!i)return;j={...j,...n?{startDate:n}:{},...r?{endDate:r}:{}},a.creator!==void 0&&(j={...j,creator:a.creator||void 0}),a.crop!==void 0&&(j={...j,crop:a.crop||void 0});const s=bl(a.entryIds);vt={label:a.label,reason:a.reason,startDate:j.startDate,endDate:j.endDate,highlightEntryIds:s},da=a.autoSelectFirst&&s.size?s.values().next().value??null:null;const l=e.querySelector("#doc-filter");bs(l,j),hs(e),Zn=!0,pt(e,t.state.getState()).finally(()=>{Zn=!1})}function wl(){if(typeof window>"u")return{enabled:!1,count:Ha};try{const e=new URLSearchParams(window.location.search);if(!e.has("seedHistory"))return{enabled:!1,count:Ha};const t=e.get("seedHistory"),a=t?Number(t):Number.NaN;return{enabled:!0,count:Number.isFinite(a)&&a>0?Math.min(Math.round(a),kl):Ha}}catch(e){return console.warn("seedHistory Parameter konnte nicht gelesen werden",e),{enabled:!1,count:Ha}}}const Ze=25,gi=4,zn=new Intl.NumberFormat("de-DE"),Ha=200,kl=2e3,Gt=wl();let bi=!1,fe="memory",j=xr(),De=0,ie=[],it=[],J=0;const Ue=new Map,_e=new Map([[0,null]]),Be=new Set,ht=new Map,_t=new Map;let Me=!1,ea=null,ta=0,vt=null,Zn=!1,da=null,sn=!1,Ua="",on=!1,_a=null,Oa=null,hi=null,Le=0,Ka=null,vi=null,Ge=null,ua=!1,yi=null;const xl=ms({id:"documentation",label:"Documentation",budget:{initialLoad:50,maxItems:150}});let vs=null;function Vt(e){return e.app?.storageDriver||ne()}function Ot(e,t){return`${e}:${t}`}function Sr(e){const t={},a=fi(e.startDate,"start"),n=fi(e.endDate,"end");return a&&(t.startDate=a),n&&(t.endDate=n),e.creator&&(t.creator=e.creator),e.crop&&(t.crop=e.crop),t}function Sl(e,t){return{id:Ot("state",t),entry:e,source:"state",ref:t}}function El(e){const t=Number(e?.id??e?.historyId??0),a={...e};return delete a.id,{id:Ot("sqlite",t),entry:a,source:"sqlite",ref:t}}function Ll(){return fe==="memory"?ie.length:De>0?De:J*Ze+ie.length||null}function Dl(){const e=[];if(Me&&e.push("Lädt …"),Ge&&e.push("Fehler"),vt&&e.push("Fokus aktiv"),fe==="sqlite"&&_e.get(J+1)&&e.push("Weitere Seiten verfügbar"),!!e.length)return e.join(" · ")}function $l(){const e={items:ie.length,totalCount:Ll(),cursor:fe==="sqlite"?`Seite ${J+1}`:null,payloadKb:gs(it.map(t=>t.entry)),lastUpdated:vs,note:Dl()};fs(xl,e)}function It(e){return ie.find(t=>t.id===e)}function vn(e){const t=e.querySelector('[data-role="archive-form"]');if(!t)return;const a=t.querySelector('input[name="archive-start"]'),n=t.querySelector('input[name="archive-end"]');a&&(a.value=j.startDate||""),n&&(n.value=j.endDate||"")}function he(e,t,a="info"){const n=e.querySelector('[data-role="archive-status"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a}`,n.textContent=t,n.classList.remove("d-none")}}function Qn(e,t){const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(!a)return;const r=!a.classList.contains("d-none"),i=typeof t=="boolean"?t:!r;a.classList.toggle("d-none",!i),n&&(n.textContent=i?"Archiv-Eingaben ausblenden":"Archiv erstellen"),i&&vn(e)}function Al(e){const t=e.querySelector('input[name="archive-start"]'),a=e.querySelector('input[name="archive-end"]');if(!t?.value||!a?.value)return null;const n=e.querySelector('input[name="archive-storage"]'),r=e.querySelector('textarea[name="archive-note"]'),i=e.querySelector('input[name="archive-remove"]');return{startDate:t.value,endDate:a.value,storageHint:n?.value.trim()||void 0,note:r?.value.trim()||void 0,removeAfterExport:i?i.checked:!0}}function Er(e,t){const a=e.querySelector('[data-action="archive-toggle"]'),n=e.querySelector('[data-action="archive-submit"]'),r=e.querySelector('[data-role="archive-form"]'),i=e.querySelector('[data-role="archive-driver-hint"]'),s=Vt(t)==="sqlite"&&!!t.app?.hasDatabase;a&&(a.disabled=!s||sn),n&&(n.disabled=!s||sn),!s&&r&&r.classList.add("d-none"),i&&(i.textContent=s?"Lokale SQLite-Datenbank aktiv":"Nur mit SQLite verfügbar",i.className=`badge ${s?"bg-success":"bg-secondary"}`),s?Lr():on=!1}function wi(e,t){sn=t;const a=e.querySelector('[data-role="archive-form"]'),n=e.querySelector('[data-action="archive-toggle"]');if(a&&a.querySelectorAll("input, textarea, button").forEach(r=>{if(r.dataset.action==="archive-cancel"&&t){r.setAttribute("disabled","disabled");return}t?r.setAttribute("disabled","disabled"):r.removeAttribute("disabled")}),n&&(n.disabled=t||n.disabled,!t)){const r=T();n.disabled=Vt(r)!=="sqlite"||!r.app?.hasDatabase}}function Pl(e,t){const a=n=>n?n.replace(/[^0-9-]/g,""):"unbekannt";return`pflanzenschutz-archiv-${a(e)}_${a(t)}.zip`}function Il(e){let t=[];return Ke("archives",a=>{const n=Array.isArray(a?.logs)?a.logs:[];return t=[e,...n].slice(0,kr),{...a||{logs:[]},logs:t}}),t}async function Lr({force:e=!1}={}){if(_a){if(await _a,!e)return}else if(on&&!e)return;const t=T();if(Vt(t)!=="sqlite"||!t.app?.hasDatabase)return;const n=(async()=>{try{const r=await Ys({limit:kr});Ke("archives",i=>({...i&&typeof i=="object"?i:{logs:[]},logs:r.items})),on=!0}catch(r){console.warn("Archive logs could not be loaded",r)}})();_a=n;try{await n}finally{_a=null}}async function Cl(e,t){const a=Vt(T());if(Il(e),a!=="sqlite"){console.warn("Archive logs require SQLite. Changes stored in memory only.");return}try{const n={...e,metadata:t??void 0};await ro(n),await Oe()}catch(n){console.error("Archive log could not be persisted",n),on=!1}finally{await Lr({force:!0})}}function Jn(e){return!Array.isArray(e)||!e.length?"[]":e.map(t=>`${t.id}:${t.archivedAt}:${t.entryCount}`).join("|")}function Ml(e){return e?ga(e)||e.slice(0,16).replace("T"," "):"-"}function va(e,t,a={}){const n=e.querySelector('[data-role="archive-log-list"]');if(!n)return;const r=Array.isArray(t)?t:[];a.resetPage!==!1&&(Le=0);const i=Ol(r);if(!i.total){n.innerHTML='<div class="text-muted small">Noch keine Archive erstellt.</div>',Si(e,i);return}const s=i.items.map(l=>{const c=Ml(l.archivedAt),u=`${l.startDate||"-"} – ${l.endDate||"-"}`,d=l.entryCount===1?"Eintrag":"Einträge";return`
        <div class="list-group-item border rounded mb-2 p-3" data-action="archive-log-focus" data-log-id="${l.id}" style="cursor: pointer;">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="fs-5 fw-bold mb-1">${g(u)}</div>
              <div class="text-muted">${l.entryCount} ${d} · Erstellt ${g(c)}</div>
            </div>
            <i class="bi bi-chevron-right text-muted fs-4"></i>
          </div>
        </div>
      `}).join("");n.innerHTML=`<div class="list-group list-group-flush">${s}</div>`,Si(e,i)}function ki(e,t){const a=e.archives?.logs;if(Array.isArray(a))return a.find(n=>n.id===t)}async function zl(e){if(e){if(typeof navigator<"u"&&navigator.clipboard&&typeof navigator.clipboard.writeText=="function"){await navigator.clipboard.writeText(e);return}if(typeof document<"u"){const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select(),document.execCommand("copy"),document.body.removeChild(t)}}}async function $a(e){if(_t.has(e.id))return _t.get(e.id);let t=null;if(e.source==="sqlite")try{t=await io(e.ref)}catch(a){console.error("History entry fetch failed",a)}else{const a=ze(T().history);t=(typeof e.ref=="number"?a[e.ref]:void 0)||e.entry}return t&&_t.set(e.id,t),t}function ys(e){return e&&(e.datum||ga(e.dateIso)||(typeof e.date=="string"?e.date:""))||""}function Bl(e){if(e?.gpsCoordinates){const t=lo(e.gpsCoordinates);if(t)return t}return""}function Nl(e){return e?.gps||""}function Yn(e){if(!e)return null;if(e.dateIso){const n=Yi(e.dateIso);if(n)return new Date(n.getFullYear(),n.getMonth(),n.getDate())}const t=typeof e.datum=="string"&&e.datum||typeof e.date=="string"&&e.date||null;if(!t)return null;const a=t.split(".");if(a.length===3){const[n,r,i]=a.map(Number);if(!Number.isNaN(n)&&!Number.isNaN(r)&&!Number.isNaN(i))return new Date(i,r-1,n)}return null}function Fl(e,t){const a=Yn(e);if(t.startDate){const r=new Date(t.startDate);if(r.setHours(0,0,0,0),!a||a<r)return!1}if(t.endDate){const r=new Date(t.endDate);if(r.setHours(23,59,59,999),!a||a>r)return!1}const n=[["creator",e.ersteller],["crop",e.kultur]];for(const[r,i]of n){const l=t[r]?.trim().toLowerCase();if(l&&!`${i||""}`.toLowerCase().includes(l))return!1}return!0}function Dr(e){if(!e)return"";const t=r=>r==null?"":String(r),n=(Array.isArray(e.items)?e.items:[]).map(r=>{const i=Object.keys(r).sort().reduce((s,l)=>(s[l]=r[l],s),{});return JSON.stringify(i)}).sort();return JSON.stringify({savedAt:t(e.savedAt),dateIso:t(e.dateIso),datum:t(e.datum),ersteller:t(e.ersteller),standort:t(e.standort),kultur:t(e.kultur),usageType:t(e.usageType),eppoCode:t(e.eppoCode),invekos:t(e.invekos),bbch:t(e.bbch),gps:t(e.gps),gpsPointId:t(e.gpsPointId),areaHa:e.areaHa??null,areaAr:e.areaAr??null,areaSqm:e.areaSqm??null,kisten:e.kisten??null,itemHashes:n})}function ws(e){e.size&&Ke("history",t=>{const a=Ea(t);if(!a.items.length)return a;let n=!1;const r=a.items.filter(i=>{const s=Dr(i);return e.has(s)?(n=!0,!1):!0});return n?{...a,items:r,totalCount:Math.min(a.totalCount,r.length),lastUpdatedAt:new Date().toISOString()}:a})}function ql(e){return e.slice().sort((t,a)=>{const n=Yn(t.entry)?.getTime()||new Date(t.entry.savedAt||0).getTime();return(Yn(a.entry)?.getTime()||new Date(a.entry.savedAt||0).getTime())-n})}function xi(){return fe==="sqlite"?De>0?Math.max(Math.ceil(De/Ze),1):Math.max(J+1,Ue.size||0):ie.length?Math.max(Math.ceil(ie.length/Ze),1):0}function ks(){if(fe==="sqlite"){const t=Math.max(xi()-1,0);return J>t&&(J=t),J<0&&(J=0),J*Ze}if(!ie.length)return J=0,0;const e=Math.max(xi()-1,0);return J>e&&(J=e),J<0&&(J=0),J*Ze}function yn(){if(!ie.length){it=[];return}if(fe==="sqlite"){it=ie.slice();return}const e=ks(),t=Math.min(e+Ze,ie.length);it=ie.slice(e,t)}function Tl(e){if(Ue.size<=gi)return;const t=Array.from(Ue.keys()).sort((a,n)=>{const r=Math.abs(a-e);return Math.abs(n-e)-r});for(;Ue.size>gi&&t.length;){const a=t.shift();a==null||a===e||Ue.delete(a)}}function Hl(e){const t=e.querySelector('[data-role="doc-pager"]');return t?((!Oa||hi!==t)&&(Oa?.destroy(),Oa=Da(t,{onPrev:()=>Wl(e),onNext:()=>jl(e),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Dokumentation...",empty:"Keine Einträge"}}),hi=t),Oa):null}function _l(e){const t=e.querySelector('[data-role="archive-log-pager"]');return t?((!Ka||vi!==t)&&(Ka?.destroy(),Ka=Da(t,{onPrev:()=>Kl(e),onNext:()=>Rl(e),labels:{prev:"Zurück",next:"Weiter",loading:"Archive werden geladen...",empty:"Keine Einträge"}}),vi=t),Ka):null}function Ol(e){const t=e.length;if(!t)return Le=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/Ga),1);Le>=a&&(Le=a-1),Le<0&&(Le=0);const n=Le*Ga,r=Math.min(n+Ga,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function Si(e,t){const a=_l(e);if(a){if(!t.total){a.update({status:"disabled",info:"Noch keine Archive"});return}a.update({status:"ready",info:`Einträge ${t.start+1}–${t.end} von ${t.total}`,canPrev:Le>0,canNext:t.end<t.total})}}function Kl(e){if(Le===0)return;Le=Math.max(Le-1,0);const t=T().archives?.logs??[];va(e,t,{resetPage:!1})}function Rl(e){const t=T().archives?.logs??[],a=t.length;if(!a)return;const n=Math.max(Math.ceil(a/Ga),1);Le>=n-1||(Le=Math.min(Le+1,n-1),va(e,t,{resetPage:!1}))}function Va(e){const t=Hl(e);if(!t)return;if(Ge){t.update({status:"error",message:Ge});return}const a=fe==="memory"?ie.length:De,n=it.length;if(!n){const u=Me?"Lade Dokumentation...":"Keine Einträge vorhanden.";t.update({status:"disabled",info:u});return}const r=fe==="sqlite"?J*Ze:ks(),i=`Einträge ${zn.format(r+1)}–${zn.format(r+n)}${a?` von ${zn.format(a)}`:""}`,s=fe==="memory"?r+n<ie.length:!!_e.get(J+1),l=!Me&&s,c=J>0&&!Me;t.update({status:"ready",info:i,canPrev:c,canNext:l,loadingDirection:Me&&s?"next":null})}function Xn(e){if(!Gt.enabled)return;const t=e.querySelector('[data-action="doc-seed"]');t&&(t.disabled=ua,t.textContent=ua?"Dummy-Daten werden erstellt...":`+ ${Gt.count} Dummy-Einträge`)}function Wl(e){if(J===0||Me)return;const t=Math.max(J-1,0);if(fe==="sqlite"){$r(e,T().fieldLabels,t);return}J=t,yn(),kt(e,T().fieldLabels),wa(e,T().fieldLabels)}function jl(e){if(Me)return;const t=J+1;if(fe==="sqlite"){const n=Ue.has(t),r=_e.get(t);if(!n&&!r)return;$r(e,T().fieldLabels,t);return}t*Ze<ie.length&&(J=t,yn(),kt(e,T().fieldLabels),wa(e,T().fieldLabels))}function ya(e){Be.clear(),ht.clear(),e&&wn(e)}function Gl(){return fe==="memory"?ie.length:De}function wn(e){const t=e.querySelector('[data-role="doc-selection-info"]'),a=e.querySelector('[data-action="print-selection"]'),n=e.querySelector('[data-action="pdf-selection"]'),r=e.querySelector('[data-action="export-selection"]'),i=e.querySelector('[data-action="export-zip"]'),s=e.querySelector('[data-action="delete-selection"]'),l=Be.size;t&&(t.textContent=l?`${l} Eintrag${l===1?"":"e"} ausgewählt`:"Keine Einträge ausgewählt");const c=l===0;a&&(a.disabled=c),n&&(n.disabled=c),r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=c);const u=e.querySelector('[data-action="toggle-select-all"]');if(u){const d=Gl();u.disabled=d===0,u.checked=d>0&&l>=d,u.indeterminate=l>0&&l<d}}function er(e,t){e.querySelectorAll('[data-role="doc-list"] .doc-sidebar-entry').forEach(n=>{const r=!!(t&&n.dataset.entryId===t);n.classList.toggle("active",r)})}function ia(e,t,a){const n=e.querySelector("#doc-detail"),r=e.querySelector("#doc-detail-body"),i=e.querySelector('[data-role="doc-detail-card"]'),s=e.querySelector('[data-role="doc-detail-empty"]');if(!n||!r||!i||!s)return;if(!t){n.dataset.entryId="",i.classList.add("d-none"),s.classList.remove("d-none"),r.innerHTML="",er(e,null);return}n.dataset.entryId=t.entry.id,i.classList.remove("d-none"),s.classList.add("d-none"),er(e,t.entry.id);const l=a||T().fieldLabels,c=l.history?.tableColumns??{},u=l.history?.detail??{},d=t.detail||t.entry.entry,p=so(d.items||[],l,"detail"),m=d.gpsCoordinates?La(d.gpsCoordinates):null,y=Nl(d),f=Bl(d),x=u.gpsNote||c.gpsNote||u.gps||c.gps||"GPS-Notiz",v=u.gpsCoordinates||c.gpsCoordinates||u.gps||c.gps||"GPS-Koordinaten",$=f?`${g(f)}${m?` <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${g(m)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:""}`:"-";r.innerHTML=`
    <p>
      <strong>${g(c.date||"Datum")}:</strong> ${g(ys(d))}<br />
      <strong>${g(u.creator||"Erstellt von")}:</strong> ${g(d.ersteller||"")}<br />
      <strong>${g(u.location||"Standort")}:</strong> ${g(d.standort||"")}<br />
      <strong>${g(u.crop||"Kultur")}:</strong> ${g(d.kultur||"")}<br />
      <strong>${g(u.usageType||"Art der Verwendung")}:</strong> ${g(d.usageType||"")}<br />
      <strong>${g(u.quantity||"Fläche (ha)")}:</strong> ${g(ml(d))}<br />
      <strong>${g(u.eppoCode||"EPPO-Code")}:</strong> ${g(d.eppoCode||"")}<br />
      <strong>${g(u.bbch||"BBCH")}:</strong> ${g(d.bbch||"")}<br />
      <strong>${g(u.invekos||"InVeKoS")}:</strong> ${g(d.invekos||"")}<br />
      <strong>${g(x)}:</strong> ${y?g(y):"-"}<br />
      <strong>${g(v)}:</strong> ${$}<br />
      <strong>${g(u.time||"Uhrzeit")}:</strong> ${g(d.uhrzeit||"")}<br />
    </p>
    ${oo({maschine:d.qsMaschine,schaderreger:d.qsSchaderreger,verantwortlicher:d.qsVerantwortlicher,wetter:d.qsWetter,behandlungsart:d.qsBehandlungsart})}
    <div class="table-responsive">
      ${p}
    </div>
  `}function kt(e,t){yn();const a=e.querySelector('[data-role="doc-list"]');if(!a)return;const r=e.querySelector("#doc-detail")?.dataset.entryId||null;if(!it.length)a.innerHTML=Me?'<div class="text-center text-muted py-4">Lädt ...</div>':'<div class="text-center text-muted py-4">Noch keine Einträge</div>';else{a.innerHTML="";const i=document.createDocumentFragment();(t||T().fieldLabels).history?.detail?.usageType,it.forEach(l=>{const c=document.createElement("div"),u=!!vt?.highlightEntryIds?.has(l.id);c.className=`doc-sidebar-entry list-group-item${u?" doc-sidebar-entry--highlight":""}`,c.dataset.entryId=l.id;const d=ys(l.entry)||"-",p=u?'<span class="badge bg-warning-subtle text-warning-emphasis badge-import">Import</span>':"";c.innerHTML=`
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
            <input type="checkbox" class="form-check-input" data-action="toggle-select" data-entry-id="${l.id}" ${Be.has(l.id)?"checked":""} />
            <span class="small">Auswahl</span>
          </label>
        </div>
      `,i.appendChild(c)}),a.appendChild(i)}er(e,r),vl(e,t),Va(e),wn(e),vs=new Date().toISOString(),$l()}function wa(e,t){const a=e.querySelector('[data-role="doc-info"]');if(!a)return;const n=De,r=!!(j.crop||j.creator);if(!n&&!Me){a.textContent="Keine Einträge";return}if(!n&&Me){a.textContent="Lädt...";return}if(j.startDate&&j.endDate){const i=`${j.startDate} - ${j.endDate} (${n})`;a.textContent=r?`${i} + Filter`:i;return}a.textContent=`Alle Einträge (${n})`}async function xs(e,t){const n=e.querySelector("#doc-detail")?.dataset.entryId;if(!n){ia(e,null,t);return}const r=It(n);if(!r){ia(e,null,t);return}const i=await $a(r);i?ia(e,{entry:r,detail:i},t):ia(e,null,t)}async function $r(e,t,a=J,n={}){const r=Math.max(0,a),i=!!n.forceReload;i&&(Ue.clear(),_e.clear(),_e.set(0,null),De=0,ie=[],it=[],J=0,Ge=null);const s=i?void 0:Ue.get(r);if(s&&!n.forceReload){J=r,ie=s,Ge=null,kt(e,t),wa(e),Va(e);return}const l=_e.has(r)?_e.get(r)??null:null,c=Symbol("doc-load");ea=c,Me=!0,Ge=null,Va(e);try{const u=await Zi({cursor:l,pageSize:Ze,filters:Sr(j),sortDirection:"desc",includeTotal:i||r===0||De===0});if(ea!==c)return;const d=u.items.map(p=>El(p));if(Ue.set(r,d),Tl(r),_e.set(r,l),_e.set(r+1,u.nextCursor??null),typeof u.totalCount=="number")De=u.totalCount;else{const p=r*Ze+d.length;De=Math.max(De,p)}J=r,ie=d,Ge=null,kt(e,t),wa(e,t)}catch(u){ea===c&&(console.error("Dokumentation konnte nicht geladen werden",u),Ge="Dokumentation konnte nicht geladen werden. Bitte erneut versuchen.",window.alert("Dokumentation konnte nicht geladen werden. Bitte erneut versuchen."))}finally{ea===c&&(Me=!1,ea=null,Va(e))}}async function Ul(e,t){const a=ze(t.history);ie=ql(a.map((n,r)=>Sl(n,r)).filter(n=>Fl(n.entry,j))),De=ie.length,J=0,Ge=null,yn(),kt(e,t.fieldLabels),wa(e,t.fieldLabels),await xs(e,t.fieldLabels)}async function pt(e,t){const a=Vt(t),n=!!t.app?.hasDatabase,r=a==="sqlite"&&n;if(fe=r?"sqlite":"memory",_t.clear(),J=0,Ge=null,De=0,ie=[],it=[],Ue.clear(),_e.clear(),_e.set(0,null),ya(e),Er(e,t),vn(e),va(e,t.archives?.logs??[]),Ua=Jn(t.archives?.logs),r){await $r(e,t.fieldLabels,0,{forceReload:!0}),await xs(e,t.fieldLabels);return}await Ul(e,t)}async function Bn(){const e=[];for(const t of Be){const a=ht.get(t)||It(t);if(!a)continue;const n=await $a(a);n&&e.push(n)}return e}async function Vl(e,t){if(!t){ya(e),kt(e,T().fieldLabels);return}if(Be.clear(),ht.clear(),fe==="memory")for(const a of ie)Be.add(a.id),ht.set(a.id,a);else try{const a=await Qi({filters:Sr(j),sortDirection:"desc",limit:1e4}),n=Array.isArray(a.historyIds)?a.historyIds:[];a.entries.forEach((r,i)=>{const s=Number(n[i]);if(!Number.isFinite(s))return;const l=Ot("sqlite",s);Be.add(l),ht.set(l,{id:l,entry:r,source:"sqlite",ref:s}),_t.has(l)||_t.set(l,r)})}catch(a){console.error("Alle Einträge konnten nicht ausgewählt werden",a),window.alert("Alle Einträge konnten nicht ausgewählt werden. Bitte erneut versuchen.")}kt(e,T().fieldLabels),wn(e)}async function Zl(e,t){if(!Be.size)return;const a=Array.from(Be).map(l=>ht.get(l)||It(l)).filter(l=>!!l),n=[];for(const l of a){const c=await $a(l);c&&n.push(c)}const r=a.filter(l=>l.source==="sqlite"),i=!!r.length;if(i)for(const l of r)await no(l.ref);const s=new Set(a.filter(l=>l.source==="state").map(l=>l.ref));if(s.size&&(Ke("history",l=>{const c=Ea(l),u=c.items.filter((d,p)=>!s.has(p));return u.length===c.items.length?c:{...c,items:u,totalCount:Math.min(c.totalCount,u.length),lastUpdatedAt:new Date().toISOString()}}),await Ql()),n.length){const l=new Set(n.map(c=>Dr(c)));ws(l)}if(i){try{await Oe()}catch(l){console.warn("SQLite-Datei konnte nach dem Löschen nicht gespeichert werden",l)}t.events?.emit?.("history:data-changed",{type:"deleted",ids:r.map(l=>l.ref)})}ya(e),await pt(e,t.state.getState())}async function Ss(e,t,a){const n=await $a(t);if(!n){window.alert("Details konnten nicht geladen werden.");return}ia(e,{entry:t,detail:n},a)}async function Ei(e){const t=await $a(e);t?await Es([t]):window.alert("Eintrag konnte nicht geladen werden.")}async function Ql(){const e=ne();if(!(!e||e==="memory"||e==="sqlite"))try{const t=Te();await He(t)}catch(t){throw console.error("Persist history failed",t),window.alert("Historie konnte nicht gespeichert werden. Bitte erneut versuchen."),t}}async function Jl(e,t,a){if(sn)return;const n=t.state.getState();if(Vt(n)!=="sqlite"||!n.app?.hasDatabase){he(e,"Archivieren ist nur mit einer lokalen SQLite-Datenbank möglich.","warning");return}const i=Al(a);if(!i?.startDate||!i.endDate){he(e,"Bitte Start- und Enddatum für das Archiv wählen.","warning");return}const s=rn(i.startDate),l=rn(i.endDate);if(!s||!l){he(e,"Die angegebenen Daten sind ungültig.","danger");return}if(new Date(s)>new Date(l)){he(e,"Startdatum darf nicht nach dem Enddatum liegen.","danger");return}const c={startDate:s,endDate:l,creator:j.creator,crop:j.crop},u=Sr(c);wi(e,!0),he(e,"Prüfe Zeitraum und Eintragsmenge...","info");try{const d=await Zi({cursor:null,pageSize:1,filters:u,sortDirection:"asc",includeTotal:!0}),p=d.totalCount??d.items.length??0;if(!p){he(e,"Im angegebenen Zeitraum wurden keine Einträge gefunden.","warning");return}if(p>pi){he(e,`Maximal ${pi} Einträge pro Archiv erlaubt. Bitte Zeitraum verkürzen.`,"warning");return}he(e,`Exportiere ${p} Einträge in ein ZIP-Archiv...`,"info");const m=await Qi({filters:u,limit:p,sortDirection:"asc"}),y=m?.entries??[];if(!y.length){he(e,"Archiv konnte nicht erstellt werden – Export lieferte keine Einträge.","danger");return}const f=y.map(D=>({...D})),x={format:"pflanzenschutz-archive",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:f.length,filters:{startDate:s,endDate:l,creator:c.creator||null,crop:c.crop||null},archive:{removeFromDatabase:i.removeAfterExport,storageHint:i.storageHint||null,note:i.note||null}},v=Ji({"pflanzenschutz.json":nn(JSON.stringify(f,null,2)),"metadata.json":nn(JSON.stringify(x,null,2))}),$=new ArrayBuffer(v.byteLength);new Uint8Array($).set(v);const A=new Blob([$],{type:"application/zip"}),K=Pl(s,l);Ar(A,K);let G=!1;if(i.removeAfterExport){he(e,"Export abgeschlossen. Entferne Einträge und bereinige Datenbank...","info"),await Xs({filters:u});const D=new Set(f.map(C=>Dr(C)));ws(D);try{await Oe()}catch(C){console.error("SQLite-Datei konnte nach dem Archivieren nicht gespeichert werden",C)}t.events?.emit?.("history:data-changed",{type:"deleted-range",filters:u});try{await eo()}catch(C){G=!0,console.error("VACUUM fehlgeschlagen",C)}}const q=new Date().toISOString(),V={id:`archive-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,archivedAt:q,startDate:s,endDate:l,entryCount:f.length,fileName:K,storageHint:i.storageHint||void 0,note:i.note||void 0};G&&(V.note=V.note?`${V.note} | VACUUM fehlgeschlagen`:"VACUUM fehlgeschlagen");const Fe={filters:{...c},removeAfterExport:!!i.removeAfterExport,historyIdSample:m?.historyIds?.slice(0,mi)};if(await Cl(V,Fe),!i.removeAfterExport&&m?.historyIds?.length){const D=m.historyIds.slice(0,mi).map(C=>({source:"sqlite",ref:C}));t.events?.emit?.("documentation:focus-range",{startDate:s,endDate:l,label:"Archiviert",reason:"archive",entryIds:D})}Qn(e,!1),a.reset(),vn(e),await pt(e,t.state.getState());const I=i.removeAfterExport?`Archiv ${K} erstellt und ${f.length} Einträge entfernt.`:`Archiv ${K} erstellt. ${f.length} Einträge bleiben in der Datenbank.`;he(e,I,G?"warning":"success")}catch(d){console.error("Archivieren fehlgeschlagen",d);const p=d instanceof Error?d.message:"Archiv konnte nicht erstellt werden.";he(e,p,"danger")}finally{wi(e,!1),Er(e,t.state.getState())}}const Yl=50;async function Es(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}if(e.length>Yl&&!window.confirm(`Sie möchten ${e.length} Einträge drucken. Bei sehr vielen Einträgen kann das Erstellen der Druckvorschau einige Sekunden dauern und lässt sich nicht unterbrechen.

Fortfahren?`))return;const t=T().fieldLabels,a=to(T().company||null);await ao(e,t,{title:"Dokumentation",headerHtml:a,chunkSize:25})}function Ar(e,t){const a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download=t,n.click(),URL.revokeObjectURL(a)}function Xl(e){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const t=e.map(s=>({...s})),a=JSON.stringify(t,null,2),n=new TextEncoder().encode(a),r=new Blob([n],{type:"application/json; charset=utf-8"}),i=new Date().toISOString().replace(/[:.]/g,"-");Ar(r,`pflanzenschutz-dokumentation-${i}.json`)}async function ec(e,t){if(!e.length){window.alert("Keine Einträge ausgewählt.");return}const a=e.map(c=>({...c})),n={format:"pflanzenschutz-export",formatVersion:1,exportedAt:new Date().toISOString(),entryCount:a.length,filters:{startDate:t.startDate||null,endDate:t.endDate||null,creator:t.creator||null,crop:t.crop||null}},r=Ji({"pflanzenschutz.json":nn(JSON.stringify(a,null,2)),"metadata.json":nn(JSON.stringify(n,null,2))}),i=new ArrayBuffer(r.byteLength);new Uint8Array(i).set(r);const s=new Blob([i],{type:"application/zip"}),l=new Date().toISOString().replace(/[:.]/g,"-");Ar(s,`pflanzenschutz-dokumentation-${l}.zip`)}function tc(){const e=document.createElement("div"),t=xr(),a=j.startDate||t.startDate||"",n=j.endDate||t.endDate||"";j={...j,startDate:a,endDate:n};const r=Gt.enabled?`<button class="btn btn-outline-info btn-sm" type="button" data-action="doc-seed">+ ${Gt.count} Dummy-Einträge</button>`:"";return e.className="section-inner",e.innerHTML=`
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
            <input type="text" class="form-control" id="doc-crop" name="doc-crop" placeholder="z. B. Äpfel" value="${j.crop||""}" />
          </div>
          <div class="col-md-3">
            <label class="form-label" for="doc-creator">Anwender (optional)</label>
            <input type="text" class="form-control" id="doc-creator" name="doc-creator" placeholder="Name" value="${j.creator||""}" />
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
            <small class="text-muted">Letzte ${kr}</small>
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
  `,e}function ac(e){if(!e)return{};const t=new FormData(e),a=r=>{const i=t.get(r);return typeof i=="string"&&i?i:void 0},n=r=>{const i=t.get(r);if(typeof i!="string")return;const s=i.trim();return s||void 0};return{startDate:a("doc-start"),endDate:a("doc-end"),crop:n("doc-crop"),creator:n("doc-creator")}}let Li="entries";function nc(e,t){Li!==t&&(Li=t,e.querySelectorAll("[data-doc-tab]").forEach(a=>{a.classList.toggle("active",a.dataset.docTab===t)}),e.querySelectorAll("[data-pane]").forEach(a=>{a.style.display=a.dataset.pane===t?"block":"none"}))}function rc(e,t){e.addEventListener("click",a=>{const n=a.target.closest("[data-doc-tab]");if(n&&n.dataset.docTab){nc(e,n.dataset.docTab);return}}),e.addEventListener("submit",a=>{if(a.target instanceof HTMLFormElement){if(a.target.id==="doc-filter"){a.preventDefault(),Mn(e,t,{refreshList:!0});const n=ac(a.target);if(!n.startDate||!n.endDate){window.alert("Bitte Start- und Enddatum auswählen.");return}j=n,ya(e),pt(e,t.state.getState());return}a.target.dataset.role==="archive-form"&&(a.preventDefault(),Jl(e,t,a.target))}}),e.addEventListener("click",a=>{const n=a.target;if(!n)return;const r=n.dataset.action;if(!r){n.closest("[data-action]")&&a.stopPropagation();return}if(r==="reset-filters"){const l=e.querySelector("#doc-filter");l?.reset(),j=xr(),bs(l??null,j),Mn(e,t,{refreshList:!0}),ya(e),pt(e,t.state.getState());return}if(r==="archive-toggle"){Qn(e),he(e,"");return}if(r==="archive-cancel"){Qn(e,!1),he(e,"");return}if(r==="archive-log-focus"){const l=n.dataset.logId;if(!l)return;const c=ki(t.state.getState(),l);if(!c){window.alert("Archiv-Eintrag nicht gefunden.");return}const u=c.fileName?`Archiv ${c.fileName}`:"Archivierter Zeitraum";typeof t.events?.emit=="function"?t.events.emit("documentation:focus-range",{startDate:c.startDate,endDate:c.endDate,label:u,reason:"archive-log"}):(j={...j,startDate:c.startDate,endDate:c.endDate},pt(e,t.state.getState())),he(e,`Dokumentation auf Archiv ${c.startDate} – ${c.endDate} fokussiert.`,"success");return}if(r==="archive-log-copy-hint"){const l=n.dataset.logId;if(!l)return;const c=ki(t.state.getState(),l);if(!c||!c.storageHint){window.alert("Kein Speicherhinweis vorhanden.");return}const u=c.storageHint;(async()=>{try{await zl(u),he(e,"Speicherhinweis kopiert.","success")}catch(d){console.error("Hinweis konnte nicht kopiert werden",d),window.alert("Hinweis konnte nicht kopiert werden.")}})();return}if(r==="doc-focus-clear"){Mn(e,t,{refreshList:!0});return}if(r==="print-selection"||r==="pdf-selection"){(async()=>{const l=await Bn();await Es(l)})();return}if(r==="export-selection"){(async()=>{const l=await Bn();Xl(l)})();return}if(r==="export-zip"){(async()=>{const l=await Bn();await ec(l,j)})();return}if(r==="delete-selection"){if(!Be.size||!window.confirm("Ausgewählte Einträge wirklich löschen?"))return;Zl(e,t);return}if(r==="doc-seed"){if(!Gt.enabled||ua)return;const c=window.__PSL?.seedHistoryEntries;if(typeof c!="function"){window.alert("Seed-Funktion ist nicht verfügbar. Bitte Entwicklungsmodus verwenden.");return}ua=!0,Xn(e),(async()=>{try{await c(Gt.count),await pt(e,t.state.getState())}catch(u){console.error("Dummy-Daten konnten nicht erstellt werden",u),window.alert("Dummy-Daten konnten nicht erstellt werden.")}finally{ua=!1,Xn(e)}})();return}if(r==="detail-print"){const c=e.querySelector("#doc-detail")?.dataset.entryId;if(!c){window.alert("Kein Eintrag ausgewählt.");return}const u=It(c);if(!u){window.alert("Eintrag nicht verfügbar.");return}Ei(u);return}const i=n.dataset.entryId;if(!i)return;const s=It(i);if(!s){window.alert("Eintrag nicht verfügbar.");return}if(r==="view-entry"){Ss(e,s,t.state.getState().fieldLabels);return}if(r==="print-entry"){Ei(s);return}}),e.addEventListener("change",a=>{const n=a.target;if(!n)return;if(n.dataset.action==="toggle-select-all"){Vl(e,n.checked);return}if(n.dataset.action!=="toggle-select")return;const r=n.dataset.entryId;if(r){if(n.checked){Be.add(r);const i=It(r);i&&ht.set(r,i)}else Be.delete(r),ht.delete(r);wn(e)}})}function ic(e,t){if(!e||bi)return;const a=e;a.innerHTML="";const n=tc();a.appendChild(n),rc(n,t),Xn(n),Er(n,t.state.getState()),vn(n);const r=t.state.getState().archives?.logs??[];va(n,r),Ua=Jn(r),Lr(),typeof t.events?.subscribe=="function"&&t.events.subscribe("documentation:focus-range",l=>{!l||typeof l!="object"||yl(n,t,l)});const i=l=>ze(l.history).length,s=()=>pt(n,t.state.getState());yi?.(),yi=us({section:"documentation",event:"history:data-changed",shouldHandleEvent:()=>fe==="sqlite",shouldRefresh:()=>fe==="sqlite",onRefresh:()=>s(),onStatusChange:l=>hl(n,l)}),ta=i(t.state.getState()),s(),t.state.subscribe(l=>{const c=Jn(l.archives?.logs);c!==Ua&&(Ua=c,va(n,l.archives?.logs??[]));const u=i(l);if(Zn){ta=u;return}if(fe==="sqlite"){ta=u;return}u!==ta&&(ta=u,s())}),bi=!0}const ka=e=>ze(e.gps.points),sa=e=>ze(e.points),sc=new Intl.NumberFormat("de-DE",{minimumFractionDigits:5,maximumFractionDigits:5}),oc=new Intl.DateTimeFormat("de-DE",{dateStyle:"short",timeStyle:"short"}),Di="Deutschland";let $i=!1,Ls="list",Ra=null,L=null,aa=null,Ai=null;const Za=25,Nn=new Intl.NumberFormat("de-DE");let ve=0,qt=null,tr=null,Pi=null;function Nt(e,t){typeof e.events?.emit=="function"&&e.events.emit("history:gps-activation-result",{...t,source:"gps",timestamp:Date.now()})}function pa(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function lc(){const e=document.createElement("section");return e.className="section-inner",e.innerHTML=`
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
  `,e}function cc(e){return{root:e,message:e.querySelector('[data-role="gps-message"]'),refreshIndicator:e.querySelector('[data-role="gps-refresh-indicator"]'),availability:e.querySelector('[data-role="gps-availability"]'),tabButtons:Array.from(e.querySelectorAll('[data-role="gps-tab"]')),panels:Array.from(e.querySelectorAll('[data-role="gps-panel"]')),listBody:e.querySelector('[data-role="gps-list"]'),emptyState:e.querySelector('[data-role="gps-empty"]'),activeInfo:e.querySelector('[data-role="gps-active-info"]'),summaryLabel:e.querySelector('[data-role="gps-summary"]'),statusBadge:e.querySelector('[data-role="gps-status"]'),form:e.querySelector('[data-role="gps-form"]'),formFields:{name:e.querySelector('[name="gps-name"]'),description:e.querySelector('[name="gps-description"]'),latitude:e.querySelector('[name="gps-latitude"]'),longitude:e.querySelector('[name="gps-longitude"]'),source:e.querySelector('[name="gps-source"]'),activate:e.querySelector('[name="gps-activate"]'),rawCoordinates:e.querySelector('[name="gps-raw-coordinates"]')},disableTargets:Array.from(e.querySelectorAll("[data-gps-disable]")),geolocationBtn:e.querySelector('[data-action="use-geolocation"]'),mapButton:e.querySelector('[data-role="gps-open-maps"]'),verifyButton:e.querySelector('[data-action="verify-coords"]')}}function oa(e){return`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e)}`}function Ds(e){const t=e.gps,a=sa(t),n=s=>{if(!s)return null;const l=La(s)||oa(`${s.latitude},${s.longitude}`),c=s.name?`${s.name}`:`${Ut(s.latitude)}, ${Ut(s.longitude)}`;return{url:l,label:c}};if(t.activePointId){const s=a.find(c=>c.id===t.activePointId),l=n(s||null);if(l)return l}if(a.length>0){const s=n(a[0]);if(s)return s}const r=e.company?.address?.trim();if(r)return{url:oa(r.replace(/\n/g,", ")),label:r};const i=e.company?.name?.trim();return i?{url:oa(i),label:i}:{url:oa(Di),label:Di}}function dc(e){if(!L)return;const t=Ds(e);L.mapButton&&(L.mapButton.href=t.url,L.mapButton.title=`Google Maps öffnen (${t.label})`);const a=L.root.querySelector('[data-role="gps-empty-map-link"]');a&&(a.href=t.url)}function uc(e){if(!e)return null;const a=e.trim().replace(/\s+/g," ").replace(/[,;]/g," ").match(/-?\d+(?:[.,]\d+)?/g);if(!a||a.length<2)return null;const n=s=>Number(s.replace(/,/g,".")),r=n(a[0]),i=n(a[1]);return!Number.isFinite(r)||!Number.isFinite(i)||r<-90||r>90||i<-180||i>180?null:{latitude:r,longitude:i}}function pc(){if(!L?.formFields)return null;const e=L.formFields.latitude?.value??"",t=L.formFields.longitude?.value??"";if(!e.trim()||!t.trim())return null;const a=Number(e),n=Number(t);return!Number.isFinite(a)||!Number.isFinite(n)||a<-90||a>90||n<-180||n>180?null:{latitude:a,longitude:n}}function Wa(e){return Number(e).toFixed(6)}function mc(e,t){const a=Wa(e),n=Wa(t);return ka(T()).some(r=>Wa(r.latitude)===a&&Wa(r.longitude)===n)}function ma(){if(!L?.verifyButton)return;const e=pc(),t=!!e;if(L.verifyButton.disabled=!t,e){const a=La({latitude:e.latitude,longitude:e.longitude});L.verifyButton.dataset.targetUrl=a||oa(`${e.latitude},${e.longitude}`)}else delete L.verifyButton.dataset.targetUrl}function Ut(e){const t=Number(e);return Number.isFinite(t)?`${sc.format(t)}°`:"–"}function fc(e){if(!e)return"–";const t=new Date(e);return Number.isNaN(t.getTime())?"–":oc.format(t)}function te(e,t="info",a=4500){if(L?.message){if(Ra&&(window.clearTimeout(Ra),Ra=null),!e){L.message.classList.add("d-none"),L.message.textContent="";return}L.message.className=`alert alert-${t}`,L.message.textContent=e,L.message.classList.remove("d-none"),a>0&&(Ra=window.setTimeout(()=>{L?.message?.classList.add("d-none")},a))}}function gc(e){const t=L?.refreshIndicator;if(t){if(t.classList.remove("alert-warning","alert-info"),e==="idle"){t.classList.add("d-none");return}t.classList.remove("d-none"),e==="stale"?(t.classList.add("alert-warning"),t.textContent="GPS-Daten wurden geändert. Ansicht aktualisiert sich beim Öffnen."):(t.classList.add("alert-info"),t.textContent="GPS-Daten werden aktualisiert...")}}function $s(e){L&&(Ls=e,L.tabButtons.forEach(t=>{const a=t.dataset.tab===e;t.classList.toggle("active",a)}),L.panels.forEach(t=>{const a=t.getAttribute("data-panel")===e;t.classList.toggle("d-none",!a)}))}function Ne(e){return e?.hasDatabase?e.storageDriver!=="sqlite"?"wrong-driver":"ok":"no-db"}function bc(e){if(L?.availability){if(e==="ok"){L.availability.classList.add("d-none"),L.availability.textContent="";return}L.availability.classList.remove("d-none"),L.availability.textContent=e==="no-db"?"Bitte verbinden Sie zuerst eine Datenbank, um GPS-Punkte zu verwalten.":"GPS-Funktionen benötigen eine aktive SQLite-Datenbank. Bitte den SQLite-Treiber in den Einstellungen auswählen."}}function Kt(e,t){if(!L)return;const a=t!=="ok"||e.pending||ba.isLocked();if(L.disableTargets.forEach(n=>{(n instanceof HTMLButtonElement||n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n instanceof HTMLSelectElement)&&(n.disabled=a)}),L.statusBadge){let n="badge bg-success",r="Bereit";t==="no-db"?(n="badge bg-secondary",r="Keine Datenbank"):t==="wrong-driver"?(n="badge bg-warning text-dark",r="Nur mit SQLite"):(e.pending||ba.isLocked())&&(n="badge bg-info text-dark",r="Wird verarbeitet"),L.statusBadge.className=n,L.statusBadge.textContent=r}}function As(e){const t=e.length;if(!t)return ve=0,{total:0,start:0,end:0,items:[]};const a=Math.max(Math.ceil(t/Za),1);ve>=a&&(ve=a-1),ve<0&&(ve=0);const n=ve*Za,r=Math.min(n+Za,t);return{total:t,start:n,end:r,items:e.slice(n,r)}}function hc(){if(!L?.root)return null;const e=L.root.querySelector('[data-role="gps-pager"]');return e?((!qt||tr!==e)&&(qt?.destroy(),qt=Da(e,{onPrev:()=>yc(),onNext:()=>wc(),labels:{prev:"Zurück",next:"Weiter",loading:"GPS-Punkte werden geladen...",empty:"Keine GPS-Punkte verfügbar"}}),tr=e),qt):null}function Ii(e,t){const a=hc();if(!a)return;if(t!=="ok"){ve=0;const s=t==="no-db"?"Keine Datenbank verbunden.":"Nur mit SQLite verfügbar.";a.update({status:"disabled",info:s});return}const n=ka(e).length;if(!n){ve=0;const s=e.gps.initialized?"Noch keine GPS-Punkte vorhanden.":"GPS-Punkte werden geladen...";a.update({status:"disabled",info:s});return}const{start:r,end:i}=As(ka(e));a.update({status:"ready",info:`Einträge ${Nn.format(r+1)}–${Nn.format(i)} von ${Nn.format(n)}`,canPrev:ve>0,canNext:i<n})}function vc(e,t){return e.length?e.map(a=>{const n=a.id===t,r=a.description?`<div class="text-muted small">${g(a.description)}</div>`:"",i=a.source?`<span class="badge-psm badge-psm-neutral">${g(a.source)}</span>`:'<span class="text-muted">–</span>',s=n?'<span class="badge bg-success ms-2">Aktiv</span>':"",l=La(a),c=l?`<a class="btn btn-outline-info" href="${pa(l)}" target="_blank" rel="noopener noreferrer">
              Karte
            </a>`:"";return`
        <tr data-point-id="${pa(a.id)}">
          <td>
            <div class="fw-semibold">${g(a.name||"Ohne Namen")}${s}</div>
            ${r}
          </td>
          <td class="font-monospace">
            <div>${Ut(a.latitude)}</div>
            <div>${Ut(a.longitude)}</div>
          </td>
          <td>
            <div>${i}</div>
            <div class="text-muted small">${fc(a.updatedAt)}</div>
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
`):""}function Pr(e,t){if(!L)return;const a=e.gps,n=Ds(e),r=t==="ok";if(L.summaryLabel){const i=sa(a).length;L.summaryLabel.textContent=r?`${i} Punkt${i===1?"":"e"} gespeichert`:"Funktion derzeit nicht verfügbar"}if(!r){L.listBody&&(L.listBody.innerHTML=""),L.emptyState&&(L.emptyState.textContent=t==="no-db"?"Keine Datenbank verbunden.":"Bitte SQLite als Speicher-Treiber aktivieren.",L.emptyState.classList.remove("d-none")),L.activeInfo&&(L.activeInfo.textContent=t==="no-db"?"Wartet auf Datenbank.":"Nur mit SQLite verfügbar."),Ii(e,t);return}if(L.listBody){const{items:i}=As(sa(a));L.listBody.innerHTML=vc(i,a.activePointId)}if(L.emptyState){const i=sa(a).length>0;L.emptyState.classList.toggle("d-none",i),!i&&a.initialized?L.emptyState.innerHTML=`
        <p class="mb-2">Noch keine GPS-Punkte vorhanden.</p>
        <p class="small text-muted mb-3">
          Nutzen Sie "Neuer Punkt" oder öffnen Sie Google Maps, um Koordinaten zu ermitteln.
        </p>
        <a class="btn btn-outline-info btn-sm" data-role="gps-empty-map-link" href="${pa(n.url)}" target="_blank" rel="noopener noreferrer">
          <i class="bi bi-box-arrow-up-right me-1"></i>
          Google Maps öffnen
        </a>
      `:a.initialized||(L.emptyState.textContent="GPS-Punkte werden geladen...")}if(L.activeInfo)if(a.activePointId){const i=sa(a).find(s=>s.id===a.activePointId);if(i){const s=`${i.name||"Ohne Namen"} (${Ut(i.latitude)}, ${Ut(i.longitude)})`,l=La(i);l?L.activeInfo.innerHTML=`${g(s)} <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${pa(l)}" target="_blank" rel="noopener noreferrer">Google Maps</a>`:L.activeInfo.textContent=s}else L.activeInfo.textContent="Aktiver Punkt nicht gefunden."}else L.activeInfo.innerHTML=`Kein aktiver Punkt ausgewählt. <a class="btn btn-link btn-sm p-0 ms-2 align-baseline" href="${pa(n.url)}" target="_blank" rel="noopener noreferrer">Google Maps öffnen</a>`;Ii(e,t)}function yc(){if(ve===0)return;ve=Math.max(ve-1,0);const e=T(),t=Ne(e.app);Pr(e,t)}function wc(){const e=T(),t=ka(e).length;if(!t)return;const a=Math.max(Math.ceil(t/Za)-1,0);if(ve>=a)return;ve=Math.min(ve+1,a);const n=Ne(e.app);Pr(e,n)}function Se(e){`${new Date().toLocaleString("de-DE")}${e}`}function Aa(e){if(!e)return null;const t=T();return ka(t).find(a=>a.id===e)||null}async function kc(e){if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(e);return}const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}function xc(){if(!L?.formFields?.rawCoordinates)return;const e=L.formFields.rawCoordinates.value,t=uc(e);if(!t){te("Koordinaten konnten nicht erkannt werden. Bitte Format 47.68952, 9.12091 verwenden.","warning",6e3);return}const a=t.latitude.toFixed(6),n=t.longitude.toFixed(6);L.formFields.latitude&&(L.formFields.latitude.value=a),L.formFields.longitude&&(L.formFields.longitude.value=n),te("Koordinaten übernommen.","success"),ma()}function Sc(){if(!L?.verifyButton)return;const e=L.verifyButton.dataset.targetUrl;if(!e){te("Bitte zuerst gültige Koordinaten eintragen, bevor die Prüfung geöffnet wird.","warning",6e3);return}window.open(e,"_blank","noopener,noreferrer")}async function ar(e={}){const{notify:t=!1}=e;if(!(!L||Ne(T().app)!=="ok"||T().gps.pending))try{await Vi(),t&&te("GPS-Punkte aktualisiert.","success"),Se("GPS-Punkte synchronisiert.")}catch(n){const r=n instanceof Error?n.message:"GPS-Punkte konnten nicht geladen werden.";te(r,"danger",7e3),Se(`Fehler beim Laden: ${r}`)}}async function Ec(e){if(!e)return;const t=Aa(e);if(!t){te("Ausgewählter GPS-Punkt wurde nicht gefunden.","warning");return}try{await Xi(t.id),te(`"${t.name}" ist nun aktiv.`,"success"),Se(`Aktiver GPS-Punkt: ${t.name}`)}catch(a){const n=a instanceof Error?a.message:"GPS-Punkt konnte nicht aktiviert werden.";te(n,"danger",7e3),Se(`Fehler beim Aktivieren: ${n}`)}}async function Lc(e){if(!e)return;const t=Aa(e);if(!t){te("GPS-Punkt existiert nicht mehr.","warning");return}if(window.confirm(`"${t.name}" wirklich löschen? Dieser Schritt kann nicht rückgängig gemacht werden.`))try{await uo(t.id),te(`"${t.name}" wurde gelöscht.`,"success"),Se(`GPS-Punkt gelöscht: ${t.name}`)}catch(n){const r=n instanceof Error?n.message:"GPS-Punkt konnte nicht gelöscht werden.";te(r,"danger",7e3),Se(`Löschen fehlgeschlagen: ${r}`)}}async function Dc(e){if(!e)return;const t=Aa(e);if(!t){te("GPS-Punkt nicht gefunden.","warning");return}const a=`${t.latitude}, ${t.longitude}`;try{await kc(a),te("Koordinaten in die Zwischenablage kopiert.","success")}catch(n){console.error("clipboard error",n),te("Koordinaten konnten nicht kopiert werden.","danger",7e3)}}async function $c(e,t){const a=(e||"").trim();if(!a){Nt(t,{status:"error",id:"",message:"Ungültige GPS-Anfrage ohne ID."});return}if(Ne(T().app)!=="ok"){te("GPS-Modul ist ohne aktive SQLite-Datenbank nicht verfügbar.","warning",6e3),Nt(t,{status:"error",id:a,message:"GPS-Modul ist derzeit nicht verfügbar."});return}const r=Aa(a);if(!r){te("Verknüpfter GPS-Punkt wurde nicht gefunden.","warning",6e3),Nt(t,{status:"error",id:a,message:"Verknüpfter GPS-Punkt wurde nicht gefunden."});return}Nt(t,{status:"pending",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wird aktiviert...`});try{await Xi(r.id),te(`"${r.name||"Ohne Namen"}" wurde aus der Historie aktiviert.`,"success"),Se(`Aus Historie aktiviert: ${r.name||r.id}`),Nt(t,{status:"success",id:r.id,name:r.name,message:`"${r.name||"Ohne Namen"}" wurde aktiviert.`})}catch(i){const s=i instanceof Error?i.message:"GPS-Punkt konnte nicht aktiviert werden.";te(s,"danger",7e3),Se(`Aktivierung aus Historie fehlgeschlagen: ${s}`),Nt(t,{status:"error",id:r.id,name:r.name,message:s})}}async function Ac(){try{await po(),Se("Aktiver GPS-Punkt synchronisiert."),te("Aktiver GPS-Punkt wurde synchronisiert.","success")}catch(e){const t=e instanceof Error?e.message:"Aktiver GPS-Punkt konnte nicht ermittelt werden.";te(t,"danger",7e3),Se(`Sync fehlgeschlagen: ${t}`)}}function Pc(){if(!L?.formFields)throw new Error("Formular nicht initialisiert");const e=L.formFields.name?.value.trim()||"",t=L.formFields.description?.value.trim()||"",a=L.formFields.source?.value.trim()||"",n=Number(L.formFields.latitude?.value),r=Number(L.formFields.longitude?.value),i=!!L.formFields.activate?.checked;if(!e)throw new Error("Name darf nicht leer sein.");if(!Number.isFinite(n)||!Number.isFinite(r))throw new Error("Koordinaten sind ungültig.");return{name:e,description:t,latitude:n,longitude:r,source:a,activate:i}}async function Ic(e){if(e.preventDefault(),ba.isLocked()){te("Speichern läuft bereits ...","info");return}try{const t=Pc();if(mc(t.latitude,t.longitude)){te("Ein GPS-Punkt mit identischen Koordinaten ist bereits vorhanden.","warning",6e3);return}Kt(T().gps,Ne(T().app)),await mo({name:t.name,description:t.description||null,latitude:t.latitude,longitude:t.longitude,source:t.source||null},{activate:t.activate}),M.success(`GPS-Punkt "${t.name}" gespeichert.`),Se(`GPS-Punkt gespeichert${t.activate?" und aktiv gesetzt":""}: ${t.name}`),L?.form?.reset()}catch(t){const a=t instanceof Error?t.message:"GPS-Punkt konnte nicht gespeichert werden.";M.error(a),Se(`Speichern fehlgeschlagen: ${a}`)}finally{Kt(T().gps,Ne(T().app))}}function Cc(){if(L?.formFields){if(!navigator.geolocation){M.warning("Geolocation wird von diesem Browser nicht unterstützt.");return}if(ba.isLocked()){M.info("Bitte warten...");return}ba.acquire(async()=>(Kt(T().gps,Ne(T().app)),new Promise(e=>{navigator.geolocation.getCurrentPosition(t=>{const{latitude:a,longitude:n}=t.coords;L?.formFields.latitude&&(L.formFields.latitude.value=a.toFixed(6)),L?.formFields.longitude&&(L.formFields.longitude.value=n.toFixed(6)),L?.formFields.source&&!L.formFields.source.value.trim()&&(L.formFields.source.value="Browser"),M.success("Koordinaten aus Browser-Position übernommen."),Se("Browser-Geolocation übernommen"),ma(),Kt(T().gps,Ne(T().app)),e()},t=>{const a=t.code===t.PERMISSION_DENIED?"Zugriff auf Standort wurde verweigert.":"Geolocation konnte nicht ermittelt werden.";M.warning(a),Se(`Geolocation fehlgeschlagen: ${a}`),Kt(T().gps,Ne(T().app)),e()},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})})))}}function Mc(){L&&(L.root.addEventListener("click",e=>{const t=e.target;if(!t)return;const a=t.closest('[data-role="gps-tab"]');if(a&&a.dataset.tab){$s(a.dataset.tab);return}const n=t.closest("[data-action]");if(!n||n.dataset.action==="")return;const i=n.closest("[data-point-id]")?.getAttribute("data-point-id")||"";switch(n.dataset.action){case"reload-points":ar({notify:!0});break;case"sync-active":Ac();break;case"set-active":Ec(i);break;case"delete-point":Lc(i);break;case"copy-coords":Dc(i);break;case"use-geolocation":Cc();break;case"apply-raw-coords":xc();break;case"verify-coords":Sc();break}}),L.form?.addEventListener("submit",e=>{Ic(e)}),L.form?.addEventListener("reset",()=>{window.setTimeout(()=>{ma()},0)}),L.formFields.latitude?.addEventListener("input",()=>{ma()}),L.formFields.longitude?.addEventListener("input",()=>{ma()}))}function zc(e,t){if(!e||$i)return;$i=!0;const a=e;a.innerHTML="";const n=lc();a.appendChild(n),L=cc(n),Pi?.(),Pi=us({section:"gps",event:"gps:data-changed",shouldHandleEvent:()=>Ne(t.state.getState().app)==="ok",shouldRefresh:()=>Ne(t.state.getState().app)==="ok",onRefresh:()=>ar({notify:!1}),onStatusChange:s=>gc(s)}),ve=0,qt?.destroy(),qt=null,tr=null,Mc(),$s(Ls),typeof t.events?.subscribe=="function"&&t.events.subscribe("gps:set-active-from-history",s=>{let l="";if(s&&typeof s=="object"&&(l=String(s.id||"").trim()),!l){te("Historische GPS-Anfrage ohne gültige ID erhalten.","warning",6e3);return}$c(l,t)});const r=t.state.getState();aa=r.gps.activePointId;const i=(s,l)=>{const c=Ne(s.app),u=s.gps;if(bc(c),Pr(s,c),Kt(u,c),dc(s),c==="ok"&&!u.initialized&&!u.pending&&ar({notify:!1}),c==="ok"&&Ai!=="ok"&&u.initialized&&te("GPS-Bereich ist wieder verfügbar.","success"),Ai=c,s.gps.activePointId!==aa&&(aa=s.gps.activePointId,typeof t.events?.emit=="function")){const d=Aa(aa);t.events.emit("gps:active-point-changed",{id:aa,point:d})}s.gps.lastError&&s.gps.lastError!==l.gps.lastError&&(te(s.gps.lastError,"danger",7e3),Se(`Fehler: ${s.gps.lastError}`))};t.state.subscribe(i),i(r,r)}let $e=[],Ae=[],nr=!1,Qa=null;async function Xe(){try{const[e,t]=await Promise.all([vo({limit:100}),yo({limit:100})]);$e=e.items||[],Ae=t.items||[],tn("savedCodes:changed",{eppoCount:$e.length,bbchCount:Ae.length})}catch(e){console.error("Failed to load saved codes:",e),$e=[],Ae=[]}}function Bc(){const e=$e.length>0,t=Ae.length>0;return`
    <div class="row g-4">
      <!-- EPPO Codes Section -->
      <div class="col-lg-6">
        <div class="card card-dark codes-card h-100">
          <div class="card-header codes-card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="bi bi-flower1 me-2 text-success"></i>
              Kulturen (EPPO-Codes)
            </h5>
            <span class="badge badge-psm-neutral">${$e.length} gespeichert</span>
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
                  <span class="badge bg-success ms-2">${$e.length}</span>
                </h6>
                <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${rr()}
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
            <span class="badge badge-psm-neutral">${Ae.length} gespeichert</span>
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
                  <span class="badge bg-info ms-2">${Ae.length}</span>
                </h6>
                <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
                  ${ir()}
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
  `}function rr(){return $e.length?$e.map(e=>`
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
    `}function ir(){return Ae.length?Ae.map(e=>`
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
    `}function et(e){const t=e.querySelector('[data-role="saved-eppo-list"]'),a=$e.length>0;if(t){const l=t.closest(".border-top");l&&a&&(l.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Kulturen
            <span class="badge bg-success ms-2">${$e.length}</span>
          </h6>
          <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${rr()}
          </div>
        `)}else if(a){const l=e.querySelector(".codes-card:first-child .border-top.pt-3.mb-3");l&&(l.innerHTML=`
        <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
          <i class="bi bi-bookmark-star me-1"></i>
          Meine Kulturen
          <span class="badge bg-success ms-2">${$e.length}</span>
        </h6>
        <div data-role="saved-eppo-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
          ${rr()}
        </div>
      `)}const n=e.querySelector('[data-role="saved-bbch-list"]'),r=Ae.length>0;if(n){const l=n.closest(".border-top");l&&r&&(l.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${Ae.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${ir()}
          </div>
        `)}else if(r){const c=e.querySelectorAll(".codes-card")[1];if(c){const u=c.querySelector(".border-top.pt-3.mb-3");u&&(u.innerHTML=`
          <h6 class="mb-2 text-muted small text-uppercase d-flex align-items-center">
            <i class="bi bi-bookmark-star me-1"></i>
            Meine Stadien
            <span class="badge bg-info ms-2">${Ae.length}</span>
          </h6>
          <div data-role="saved-bbch-list" class="list-group list-group-flush mb-3" style="max-height: 300px; overflow-y: auto;">
            ${ir()}
          </div>
        `)}}const i=e.querySelector(".codes-card:first-child .card-header .badge"),s=e.querySelector(".codes-card:last-child .card-header .badge");i&&(i.textContent=`${$e.length} gespeichert`),s&&(s.textContent=`${Ae.length} gespeichert`)}function Nc(e){const t=e.querySelector('[data-input="eppo-search"]'),a=e.querySelector('[data-role="eppo-search-results"]');if(t&&a){const l=Wr(async()=>{const c=t.value.trim();if(c.length<2){a.innerHTML="";return}try{const u=await bo(c,10);if(!u.length){a.innerHTML=`
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
        `}},300);t.addEventListener("input",l)}const n=e.querySelector('[data-input="bbch-search"]'),r=e.querySelector('[data-role="bbch-search-results"]');if(n&&r){const l=Wr(async()=>{const c=n.value.trim();if(c.length<1){r.innerHTML="";return}try{const u=await ho(c,10);if(!u.length){r.innerHTML=`
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
        `}},300);n.addEventListener("input",l)}e.dataset.codesClickBound!=="1"&&(e.dataset.codesClickBound="1",e.addEventListener("click",async l=>{const u=l.target.closest("[data-action]");if(!u)return;const d=u.dataset.action;if(d==="select-eppo"){const p=u.dataset.code||"",m=u.dataset.name||"",y=u.dataset.language||"",f=u.dataset.dtcode||"";if(!p||!m){console.warn("EPPO selection missing code or name");return}a&&(a.innerHTML=""),t&&(t.value="");const x=$e.find(v=>v.code.toUpperCase()===p.toUpperCase());if(x){const v=e.querySelector(`[data-eppo-id="${x.id}"]`);v&&(v.classList.add("flash-highlight"),setTimeout(()=>v.classList.remove("flash-highlight"),800));return}try{await An({code:p,name:m,language:y||void 0,dtcode:f||void 0,isFavorite:!1});const v=Te();await He(v),await Xe(),et(e)}catch(v){console.error("Failed to save EPPO from search:",v),alert("Speichern fehlgeschlagen")}}if(d==="select-bbch"){const p=u.dataset.code||"",m=u.dataset.label||"",y=u.dataset.principal,f=u.dataset.secondary,x=y?parseInt(y,10):void 0,v=f?parseInt(f,10):void 0;if(!p||!m){console.warn("BBCH selection missing code or label");return}r&&(r.innerHTML=""),n&&(n.value="");const $=Ae.find(A=>A.code===p);if($){const A=e.querySelector(`[data-bbch-id="${$.id}"]`);A&&(A.classList.add("flash-highlight"),setTimeout(()=>A.classList.remove("flash-highlight"),800));return}try{await Pn({code:p,label:m,principalStage:Number.isNaN(x)?void 0:x,secondaryStage:Number.isNaN(v)?void 0:v,isFavorite:!1});const A=Te();await He(A),await Xe(),et(e)}catch(A){console.error("Failed to save BBCH from search:",A),alert("Speichern fehlgeschlagen")}}if(d==="toggle-favorite-eppo"){const p=u.dataset.id;if(!p)return;const m=$e.find(y=>y.id===p);if(!m)return;try{await An({id:m.id,code:m.code,name:m.name,language:m.language,dtcode:m.dtcode,isFavorite:!m.isFavorite});const y=Te();await He(y),await Xe(),et(e)}catch(y){console.error("Failed to toggle EPPO favorite:",y)}}if(d==="toggle-favorite-bbch"){const p=u.dataset.id;if(!p)return;const m=Ae.find(y=>y.id===p);if(!m)return;try{await Pn({id:m.id,code:m.code,label:m.label,principalStage:m.principalStage,secondaryStage:m.secondaryStage,isFavorite:!m.isFavorite});const y=Te();await He(y),await Xe(),et(e)}catch(y){console.error("Failed to toggle BBCH favorite:",y)}}if(d==="delete-eppo"){const p=u.dataset.id;if(!p||!confirm("EPPO-Code wirklich löschen?"))return;try{await fo({id:p});const m=Te();await He(m),await Xe(),et(e)}catch(m){console.error("Failed to delete EPPO:",m)}}if(d==="delete-bbch"){const p=u.dataset.id;if(!p||!confirm("BBCH-Stadium wirklich löschen?"))return;try{await go({id:p});const m=Te();await He(m),await Xe(),et(e)}catch(m){console.error("Failed to delete BBCH:",m)}}}));const i=e.querySelector('[data-form="add-eppo"]');i&&i.addEventListener("submit",async l=>{l.preventDefault();const c=e.querySelector('[data-input="eppo-code"]'),u=e.querySelector('[data-input="eppo-name"]'),d=e.querySelector('[data-input="eppo-favorite"]'),p=c?.value.trim(),m=u?.value.trim();if(!p||!m){alert("Bitte Code und Name eingeben");return}try{await An({code:p,name:m,isFavorite:d?.checked||!1});const y=Te();await He(y),await Xe(),et(e),c&&(c.value=""),u&&(u.value=""),d&&(d.checked=!1)}catch(y){console.error("Failed to save EPPO:",y),alert("Speichern fehlgeschlagen")}});const s=e.querySelector('[data-form="add-bbch"]');s&&s.addEventListener("submit",async l=>{l.preventDefault();const c=e.querySelector('[data-input="bbch-code"]'),u=e.querySelector('[data-input="bbch-label"]'),d=e.querySelector('[data-input="bbch-favorite"]'),p=c?.value.trim(),m=u?.value.trim();if(!p||!m){alert("Bitte Code und Bezeichnung eingeben");return}try{await Pn({code:p,label:m,isFavorite:d?.checked||!1});const y=Te();await He(y),await Xe(),et(e),c&&(c.value=""),u&&(u.value=""),d&&(d.checked=!1)}catch(y){console.error("Failed to save BBCH:",y),alert("Speichern fehlgeschlagen")}})}function Fc(e,t,a={}){if(!e||nr)return;Qa=e,nr=!0,Qa.innerHTML=`
    <div class="section-inner codes-manager">
      <h4 class="mb-3"><i class="bi bi-tags me-2"></i>EPPO & BBCH Codes</h4>
      ${Bc()}
    </div>`;const n=Qa.querySelector(".codes-manager");if(!n)return;Nc(n);const r=async()=>{await Xe(),et(n)};t?.events?.subscribe?.("database:connected",()=>{r()}),t?.state?.getState?.().app?.hasDatabase&&r()}function qc(){nr=!1,Qa=null}let Ci=!1,at=null,la=null,Ja=null,ca=null,St=null,ln=null,nt=null,xa=null,cn=null,rt=null,sr=null,tt=null,ye=new Set,mt=null,Fn=!1,qn=!1,Rt=!1;const Re=e=>ze(e.mediums),Ya=25,Tn=new Intl.NumberFormat("de-DE");let xe=0,Tt=null,or=null,lr=null,Ir=null;function Tc(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function Hc(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`profile-${Date.now()}-${Math.random().toString(16).slice(2,10)}`}function Ps(e){if(!ye.size)return;const t=new Set(Re(e).map(n=>n.id));let a=!1;ye.forEach(n=>{t.has(n)||(ye.delete(n),a=!0)}),a&&(ye=new Set(ye))}function dn(){at&&at.querySelectorAll('[data-role="profile-select"]').forEach(e=>{const t=e.dataset.mediumId;e.checked=!!(t&&ye.has(t))})}function ft(e){const t=Re(e).length,a=ye.size;let n="Noch keine Mittel ausgewählt.";t?a===t&&t>0?n=`${a} Mittel ausgewählt (alle).`:a>0&&(n=`${a} Mittel ausgewählt.`):n="Keine Mittel vorhanden.",sr&&(sr.textContent=n),tt&&(tt.disabled=t===0,tt.indeterminate=a>0&&a<t,tt.checked=t>0&&a===t)}function Xa(e){mt=null,ln&&ln.reset(),xa&&(xa.value=""),nt&&(nt.value=""),rt&&(rt.textContent="Profil speichern"),ye=new Set,dn(),ft(e)}function _c(e,t){mt=e.id,xa&&(xa.value=e.id),nt&&(nt.value=e.name,nt.focus()),rt&&(rt.textContent="Profil aktualisieren"),ye=new Set(e.mediumIds),dn(),ft(t)}function Mi(e,t){if(rt){if(rt.disabled=e,e){rt.textContent=t||"Speichert...";return}rt.textContent=mt?"Profil aktualisieren":"Profil speichern"}}function un(e,t){if(la){if(la.disabled=e,e){la.textContent=t||"Speichert...";return}la.textContent="Hinzufügen"}}async function Oc(e,t,a){if(Rt)return;const n=t.state.getState(),i=(Re(n)[e]??null)?.id||null;Rt=!0,un(!0);const s=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediums",c=>{const u=Ea(c),d=u.items.slice();return d.splice(e,1),{...u,items:d,totalCount:Math.min(u.totalCount,d.length),lastUpdatedAt:new Date().toISOString()}}),await pn({silent:!0})&&i&&t.events?.emit?.("mediums:data-changed",{action:"deleted",id:i})}finally{Rt=!1,un(!1),a&&a.isConnected&&(a.disabled=!1,a.textContent=s??"Löschen")}}async function Kc(e,t,a){const n=a?.textContent??null;a&&(a.disabled=!0,a.textContent="Lösche...");try{t.state.updateSlice("mediumProfiles",(r=[])=>r.filter(i=>i.id!==e.id)),mt===e.id&&Xa(t.state.getState()),await pn({successMessage:"Profil gelöscht."})}finally{a&&(a.disabled=!1,a.textContent=n||"Löschen")}}function Rc(e){if(!cn)return;const t=cn,a=e.mediumProfiles||[];if(!a.length){t.innerHTML=`
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
    `,t.appendChild(i)})}function Wc(e,t){if(Fn||!e.mediumProfiles?.length)return;const a=new Set(Re(e).map(i=>i.id));let n=!1;const r=e.mediumProfiles.map(i=>{const s=i.mediumIds.filter(l=>a.has(l));return s.length!==i.mediumIds.length?(n=!0,{...i,mediumIds:s,updatedAt:new Date().toISOString()}):i}).filter(i=>i.mediumIds.length?!0:(n=!0,!1));n&&(Fn=!0,t.state.updateSlice("mediumProfiles",()=>r),Fn=!1)}function Is(e){if(!e)return xe=0,{start:0,end:0,total:0};const t=Math.max(Math.ceil(e/Ya),1);xe>=t&&(xe=t-1),xe<0&&(xe=0);const a=xe*Ya,n=Math.min(a+Ya,e);return{start:a,end:n,total:e}}function jc(){if(!lr)return null;const e=lr.querySelector('[data-role="mediums-pager"]');return e?((!Tt||or!==e)&&(Tt?.destroy(),Tt=Da(e,{onPrev:()=>Gc(),onNext:()=>Uc(),labels:{prev:"Zurück",next:"Weiter",loading:"Lade Mittel...",empty:"Keine Mittel verfügbar"}}),or=e),Tt):null}function zi(e){const t=jc();if(!t)return;const a=Re(e).length;if(!a){xe=0,t.update({status:"disabled",info:"Noch keine Mittel gespeichert."});return}const{start:n,end:r}=Is(a),i=`Mittel ${Tn.format(n+1)}–${Tn.format(r)} von ${Tn.format(a)}`;t.update({status:"ready",info:i,canPrev:xe>0,canNext:r<a})}function Gc(){if(xe===0)return;const e=Ir?.state.getState();e&&(xe=Math.max(xe-1,0),Cr(e))}function Uc(){const e=Ir?.state.getState();if(!e)return;const t=Re(e).length;if(!t)return;const a=Math.max(Math.ceil(t/Ya)-1,0);xe>=a||(xe=Math.min(xe+1,a),Cr(e))}function Cr(e){if(!at)return;Ps(e);const t=new Map(e.measurementMethods.map(s=>[s.id,s])),a=Re(e).length;if(!a){at.innerHTML=`
      <tr>
        <td colspan="9" class="text-center text-muted">Noch keine Mittel gespeichert.</td>
      </tr>
    `,ft(e),zi(e);return}const{start:n,end:r}=Is(a),i=Re(e).slice(n,r);at.innerHTML="",i.forEach((s,l)=>{const c=n+l,u=document.createElement("tr"),d=t.get(s.methodId),p=s.approval||s.zulassungsnummer,m=typeof p=="string"&&p.trim().length?g(p):"-",y=typeof s.wartezeit=="string"&&s.wartezeit.trim().length?g(s.wartezeit):typeof s.wartezeit=="number"?`${s.wartezeit} Tage`:"-",f=typeof s.wirkstoff=="string"&&s.wirkstoff.trim().length?g(s.wirkstoff):"-";u.innerHTML=`
      <td class="text-center">
        <input type="checkbox" class="form-check-input" data-role="profile-select" data-medium-id="${g(s.id)}" ${ye.has(s.id)?"checked":""} />
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
    `,at?.appendChild(u)}),ft(e),zi(e)}function Bi(e){if(!ca)return;const t=new Set;ca.innerHTML="",e.measurementMethods.forEach(a=>{const n=(a.label??"").toLowerCase(),r=(a.id??"").toLowerCase();if(n&&!t.has(n)){t.add(n);const i=document.createElement("option");i.value=a.label,ca.appendChild(i)}if(r&&!t.has(r)){t.add(r);const i=document.createElement("option");i.value=a.id,ca.appendChild(i)}})}function Vc(e){const t=e.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t||`method-${Date.now()}-${Math.random().toString(16).slice(2,6)}`}function Zc(e,t){if(!Ja)return null;const a=Ja.value.trim();if(!a)return window.alert("Bitte eine Methode angeben."),Ja.focus(),null;const n=e.measurementMethods.find(l=>l.label?.toLowerCase()===a.toLowerCase()||l.id?.toLowerCase()===a.toLowerCase());if(n)return n.id;const r=Vc(a),i=e.fieldLabels?.calculation?.fields?.quantity?.unit||"Kiste",s={id:r,label:a,type:"factor",unit:i,requires:["areaHa"],config:{sourceField:"areaHa"}};return t.state.updateSlice("measurementMethods",l=>[...l,s]),r}async function pn(e){try{const t=Te();return await He(t),e?.silent||window.alert(e?.successMessage??"Änderungen wurden gespeichert."),!0}catch(t){console.error("Fehler beim Speichern",t);const a=t instanceof Error?t.message:"Speichern fehlgeschlagen";return window.alert(a),!1}}function Qc(e,t){const a=!!t.app?.hasDatabase,n=t.app?.activeSection==="settings";e.classList.toggle("d-none",!(a&&n))}function Jc(e,t){if(!e||Ci)return;const a=e;a.innerHTML="";const n=Tc();a.appendChild(n),lr=n,Ir=t,xe=0,Tt?.destroy(),Tt=null,or=null,at=n.querySelector("#settings-mediums-table tbody"),Ja=n.querySelector('input[name="medium-method"]'),ca=n.querySelector("#settings-method-options"),St=n.querySelector("#settings-medium-form"),la=St?St.querySelector('button[type="submit"]'):null,ln=n.querySelector("#settings-profile-form"),nt=n.querySelector("#profile-name"),xa=n.querySelector('input[name="profile-id"]'),cn=n.querySelector("#settings-profile-table tbody"),rt=n.querySelector('[data-role="profile-submit"]'),sr=n.querySelector('[data-role="profile-selection-summary"]'),tt=n.querySelector('[data-role="profile-select-all"]');let r=!1,i=!1;function s(d){if(n.querySelectorAll("[data-settings-tab]").forEach(p=>{const m=p.dataset.settingsTab===d;p.classList.toggle("active",m)}),n.querySelectorAll("[data-pane]").forEach(p=>{const m=p.dataset.pane===d;p.style.display=m?"block":"none"}),d==="gps"&&!r){const p=n.querySelector('[data-feature="gps-embedded"]');p&&(zc(p,t),r=!0)}if(d==="codes"&&!i){const p=n.querySelector('[data-feature="codes-embedded"]');p&&(qc(),Fc(p,{state:t.state,events:{subscribe:t.events?.subscribe}},{}),i=!0)}}n.querySelectorAll("[data-settings-tab]").forEach(d=>{d.addEventListener("click",()=>{const p=d.dataset.settingsTab;p&&s(p)})});async function l(){if(!St||Rt)return;const d=t.state.getState(),p=new FormData(St),m=(p.get("medium-name")||"").toString().trim(),y=(p.get("medium-unit")||"").toString().trim(),f=p.get("medium-value"),x=Number(f),v=(p.get("medium-approval")||"").toString().trim(),$=p.get("medium-wartezeit"),A=$?Number($):null,K=(p.get("medium-wirkstoff")||"").toString().trim()||null;if(!m||!y||Number.isNaN(x)){window.alert("Bitte alle Felder korrekt ausfüllen.");return}const G=Zc(d,t);if(!G)return;const q=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`medium-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,V={id:q,name:m,unit:y,methodId:G,value:x,zulassungsnummer:v||null,wartezeit:A!=null&&!Number.isNaN(A)?A:null,wirkstoff:K};Rt=!0,un(!0,"Speichere...");try{t.state.updateSlice("mediums",I=>{const D=Ea(I),C=[...D.items,V];return{...D,items:C,totalCount:C.length,lastUpdatedAt:new Date().toISOString()}}),Bi(t.state.getState()),await pn({successMessage:"Mittel gespeichert.",silent:!0})&&(St.reset(),t.events?.emit?.("mediums:data-changed",{action:"created",id:q}))}finally{Rt=!1,un(!1)}}St?.addEventListener("submit",d=>{d.preventDefault(),l()}),at?.addEventListener("click",d=>{const p=d.target?.closest('[data-action="delete"]');if(!p)return;const m=Number(p.dataset.index);Number.isNaN(m)||Oc(m,t,p)}),at?.addEventListener("change",d=>{const p=d.target;if(!p||p.dataset.role!=="profile-select")return;const m=p.dataset.mediumId;if(!m)return;p.checked?ye.add(m):ye.delete(m);const y=t.state.getState();ft(y)}),tt?.addEventListener("change",()=>{const d=t.state.getState();tt&&(tt.indeterminate=!1,tt.checked?ye=new Set(Re(d).map(p=>p.id)):ye=new Set,dn(),ft(d))});const c=async()=>{if(!nt)return;const d=nt.value.trim();if(!d){window.alert("Bitte einen Profilnamen eingeben."),nt.focus();return}if(!ye.size){window.alert("Bitte mindestens ein Mittel auswählen.");return}const p=t.state.getState();if(p.mediumProfiles?.some(v=>v.name.toLowerCase()===d.toLowerCase()&&v.id!==mt)){window.alert("Ein Profil mit diesem Namen existiert bereits.");return}const y=Re(p).filter(v=>ye.has(v.id)).map(v=>v.id);if(!y.length){window.alert("Ausgewählte Mittel sind nicht mehr verfügbar. Bitte Auswahl prüfen."),Ps(p),dn(),ft(p);return}if(qn)return;const f=!!mt;qn=!0,Mi(!0,f?"Aktualisiere...":"Speichere...");const x=new Date().toISOString();try{if(mt)t.state.updateSlice("mediumProfiles",($=[])=>$.map(A=>A.id===mt?{...A,name:d,mediumIds:y,updatedAt:x}:A));else{const $={id:Hc(),name:d,mediumIds:y,createdAt:x,updatedAt:x};t.state.updateSlice("mediumProfiles",(A=[])=>[...A,$])}await pn({successMessage:f?"Profil aktualisiert und gespeichert.":"Profil gespeichert."})&&Xa(t.state.getState())}finally{qn=!1,Mi(!1)}};ln?.addEventListener("submit",d=>{d.preventDefault(),c()}),cn?.addEventListener("click",d=>{const p=d.target?.closest('[data-action^="profile-"]');if(!p)return;const m=p.dataset.id;if(!m)return;const y=t.state.getState();if(p.dataset.action==="profile-edit"){const f=y.mediumProfiles?.find(x=>x.id===m);f&&_c(f,y);return}if(p.dataset.action==="profile-delete"){const f=y.mediumProfiles?.find(x=>x.id===m);if(!f||!window.confirm(`Profil "${f.name}" wirklich löschen?`))return;Kc(f,t,p)}}),n.querySelector('[data-action="profile-reset"]')?.addEventListener("click",()=>{Xa(t.state.getState())}),Xa(t.state.getState());const u=d=>{Wc(d,t),Qc(n,d),d.app.activeSection==="settings"&&(Cr(d),Bi(d),Rc(d),ft(d))};t.state.subscribe(u),u(t.state.getState()),Ci=!0}const na=e=>g(e),Hn=(e,t=1)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function Wt(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function Yc(e){if(!e)return"";const t=new Date(e);if(Number.isNaN(t.getTime()))return g(e);const a=Math.round((t.getTime()-Date.now())/864e5);return a<0?`<span style="color:#ef4444;">${Wt(e)} · abgelaufen</span>`:a<180?`<span style="color:#f59e0b;">${Wt(e)} · ${a} T</span>`:`<span class="calc-hint">${Wt(e)}</span>`}function Xc(){return`
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
    </section>`}function ed(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Xc();const a=e.querySelector('[data-role="lager-uebersicht"]'),n=e.querySelector('[data-role="lager-bewegungen"]'),r=e.querySelector('[data-role="lager-form"]'),i=e.querySelector("#lager-mittel-options"),s=e.querySelector('[data-role="lager-empty"]'),l=new Map,c=y=>{if(a){if(!y.length){a.innerHTML='<tr><td colspan="6" class="calc-hint" style="padding:14px;">Noch keine Mittel. Erfasse unten einen Zugang oder dokumentiere Anwendungen in „Neu erfassen".</td></tr>';return}a.innerHTML=y.map(f=>{const x=f.bestand<0?"#ef4444":f.bestand===0?"#f59e0b":"inherit",v=g(f.einheit||"");return`<tr>
          <td><span class="fw-semibold">${g(f.name)}</span>${f.kennr?`<span class="d-block calc-hint">${g(f.kennr)}</span>`:""}</td>
          <td class="calc-hint">${g(f.wirkstoff||"")}</td>
          <td class="text-end">${Hn(f.verbraucht)} ${v}<span class="d-block calc-hint">${f.anwendungen} Anw.</span></td>
          <td class="text-end fw-semibold" style="color:${x};">${Hn(f.bestand)} ${v}</td>
          <td>${Yc(f.zulEnde)}</td>
          <td class="calc-hint">${f.naechsterAblauf?Wt(f.naechsterAblauf):""}</td>
        </tr>`}).join("")}},u=y=>{if(n){if(!y.length){n.innerHTML='<div class="calc-hint">Keine Bewegungen erfasst.</div>';return}n.innerHTML=y.map(f=>`
        <div class="d-flex align-items-center gap-2 py-1" style="border-bottom:1px solid var(--border-1);">
          <span class="badge" style="background:${f.typ==="zugang"?"#16a34a":"#64748b"};">${g(f.typ)}</span>
          <span class="flex-grow-1">${g(f.mittelName)} · <b>${Hn(f.menge)} ${g(f.einheit||"")}</b>${f.charge?` · Charge ${g(f.charge)}`:""}<span class="d-block calc-hint">${Wt(f.datum)}${f.lieferant?" · "+g(f.lieferant):""}${f.ablauf?" · Ablauf "+Wt(f.ablauf):""}</span></span>
          <button class="btn btn-sm" style="color:#ef4444;border:1px solid var(--border-1);background:transparent;" data-del="${na(f.id)}" title="Löschen">×</button>
        </div>`).join(""),n.querySelectorAll("[data-del]").forEach(f=>{f.addEventListener("click",async()=>{const x=f.getAttribute("data-del")||"";try{await xo({id:x}),await Oe().catch(()=>{}),await p()}catch{M.warning("Löschen fehlgeschlagen.")}})})}},d=()=>{i&&(i.innerHTML=Array.from(l.entries()).sort((y,f)=>y[0].localeCompare(f[0],"de")).map(([y,f])=>`<option value="${na(y)}" data-kennr="${na(f.kennr||"")}" data-einheit="${na(f.einheit||"")}" data-wirkstoff="${na(f.wirkstoff||"")}"></option>`).join(""))},p=async()=>{if(ne()!=="sqlite"){s&&(s.textContent="Bitte zuerst eine Datenbank öffnen.");return}try{const[y,f,x]=await Promise.all([es(),ko(),ts()]);c(y?.rows||[]),u(f?.rows||[]),l.clear(),(x?.rows||[]).forEach(v=>{v.name&&l.set(v.name,{kennr:v.kennr??null,einheit:v.einheit??null,wirkstoff:v.wirkstoff??null})}),(y?.rows||[]).forEach(v=>{v.name&&!l.has(v.name)&&l.set(v.name,{kennr:v.kennr??null,einheit:v.einheit??null,wirkstoff:v.wirkstoff??null})}),d()}catch(y){console.warn("[Lager] Laden fehlgeschlagen:",y)}};r?.addEventListener("submit",async y=>{if(y.preventDefault(),ne()!=="sqlite"){M.warning("Bitte zuerst eine Datenbank öffnen.");return}const f=new FormData(r),x=String(f.get("mittel")||"").trim(),v=Number(String(f.get("menge")||"").replace(",","."));if(!x||!Number.isFinite(v)){M.warning("Mittel und Menge angeben.");return}const $=String(f.get("preis")||"").trim();try{await wo({mittelName:x,kennr:String(f.get("kennr")||"").trim()||null,wirkstoff:l.get(x)?.wirkstoff||null,typ:String(f.get("typ")||"zugang"),menge:v,einheit:String(f.get("einheit")||"").trim()||null,datum:String(f.get("datum")||"").trim()||null,charge:String(f.get("charge")||"").trim()||null,ablauf:String(f.get("ablauf")||"").trim()||null,lieferant:String(f.get("lieferant")||"").trim()||null,preis:$?Number($.replace(",",".")):null}),await Oe().catch(()=>{}),r.reset(),M.success("Bewegung gespeichert."),await p()}catch{M.warning("Speichern fehlgeschlagen.")}});const m=e.querySelector('[name="mittel"]');m?.addEventListener("change",()=>{const y=l.get(m.value);if(!y)return;const f=e.querySelector('[name="einheit"]'),x=e.querySelector('[name="kennr"]');f&&y.einheit&&(f.value=y.einheit),x&&y.kennr&&(x.value=y.kennr)}),t.state.subscribe(y=>{y?.app?.activeSection==="lager"&&p()}),p()}const dt=["#ef4444","#3b82f6","#a855f7","#f59e0b","#06b6d4","#ec4899","#84cc16","#14b8a6"],td=()=>({bedW:1.2,pathW:.4,rowSp:.5,inRowSp:.4,angle:0}),se=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";let Y=null,je=null,R=null,_n=!1,Et=[];function Ni(){if(!R)return 1;const e=R.getCenter().lat;return 156543.03392*Math.cos(e*Math.PI/180)/Math.pow(2,R.getZoom())}function ad(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=nd();const a=[];let n=null;const r=new Map;let i=null,s=null,l={sat:null,osm:null},c=!0,u=!0;function d(){const o=[];if(a.forEach(w=>{const k=w.latlngs||[];if(k.length<3)return;const N=k.map(me=>[Number(me[1]),Number(me[0])]),z=N[0],X=N[N.length-1];(z[0]!==X[0]||z[1]!==X[1])&&N.push([z[0],z[1]]),o.push({type:"Feature",geometry:{type:"Polygon",coordinates:[N]},properties:{name:w.name||"",kultur:w.kultur||null,eppoCode:w.eppoCode||null,flaeche_m2:Math.round(w.result?.areaM2||0),flaeche_ha:Number(((w.result?.areaM2||0)/1e4).toFixed(4)),beete:w.result?.beds?.length||0,beetmeter_m:Math.round(w.result?.bedMeters||0),pflanzen:w.result?.plants||0,bettbreite_m:w.params?.bedW??null,wegbreite_m:w.params?.pathW??null,reihenabstand_m:w.params?.rowSp??null,pflanzabstand_m:w.params?.inRowSp??null,ausrichtung_grad:w.params?.angle??null}})}),(ze(t.state.getState().gps?.points)||[]).forEach(w=>{const k=Number(w.latitude),N=Number(w.longitude);if(!Number.isFinite(k)||!Number.isFinite(N))return;const z=Number(w.nutzflaecheQm);o.push({type:"Feature",geometry:{type:"Point",coordinates:[N,k]},properties:{name:w.name||"Standort",typ:"standort",flaeche_m2:Number.isFinite(z)&&z>0?Math.round(z):null,kind:w.kind||null}})}),!o.length){M.warning("Keine Flächen oder Standorte zum Exportieren.");return}const h={type:"FeatureCollection",name:"PSM Acker-Planer",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:o};try{const w=new Blob([JSON.stringify(h,null,2)],{type:"application/geo+json"}),k=URL.createObjectURL(w),N=document.createElement("a");N.href=k,N.download="acker-flaechen.geojson",document.body.appendChild(N),N.click(),N.remove(),setTimeout(()=>URL.revokeObjectURL(k),1e3),M.success(`${o.length} Objekt(e) als GeoJSON exportiert.`)}catch(w){console.error("[Acker] GeoJSON-Export fehlgeschlagen",w),M.error("Export fehlgeschlagen.")}}function p(){if(!Y||!i)return;i.clearLayers(),(ze(t.state.getState().gps?.points)||[]).forEach(b=>{const h=Number(b.latitude),w=Number(b.longitude);if(!Number.isFinite(h)||!Number.isFinite(w))return;const k=Number(b.nutzflaecheQm),N=Number.isFinite(k)&&k>0?`${Math.round(k)} m²`:"",z=b.name||"Standort",X=Y.marker([h,w],{icon:Y.divIcon({className:"acker-standort",html:'<span class="acker-standort-dot"></span>',iconSize:[16,16],iconAnchor:[8,8]})});X.bindTooltip(`${g(z)}${N?" · "+N:""}`,{permanent:!0,direction:"top",className:"acker-standort-label",offset:[0,-9]});const me=[`<b>${g(z)}</b>`,N?`Fläche: ${N}`:"",b.kind?g(String(b.kind)):""].filter(Boolean).join("<br>");X.bindPopup(me),i.addLayer(X)})}const m=o=>e.querySelector(o),y=m('[data-role="acker-list"]'),f=m('[data-role="acker-empty"]'),x=m('[data-role="acker-totals"]'),v=m('[data-role="acker-map"]'),$=o=>({id:o.id,name:o.name,kultur:o.kultur||null,eppoCode:o.eppoCode||null,standortId:o.standortId||null,color:o.color,latlngs:o.latlngs,areaQm:o.result?.areaM2||0,bedW:o.params.bedW,pathW:o.params.pathW,rowSp:o.params.rowSp,inRowSp:o.params.inRowSp,angle:o.params.angle,beds:o.result?.beds?.length||0,bedMeters:o.result?.bedMeters||0,plants:o.result?.plants||0}),A=(o,b=!1)=>{if(ne()!=="sqlite")return;const h=async()=>{try{const w=await Eo($(o));w?.id&&(o.id=w.id),await Oe().catch(()=>{})}catch(w){console.warn("[Acker] Speichern fehlgeschlagen:",w)}};if(b){h();return}clearTimeout(r.get(o._key)),r.set(o._key,setTimeout(h,600))};function K(o,b){const h=o.map(Ye=>[Ye[1],Ye[0]]);if(h.length<3)return{areaM2:0,beds:[],bedMeters:0,plants:0};const w=h[0],k=h[h.length-1];if((w[0]!==k[0]||w[1]!==k[1])&&h.push(w.slice()),h.length<4)return{areaM2:0,beds:[],bedMeters:0,plants:0};let N;try{N=je.polygon([h])}catch{return{areaM2:0,beds:[],bedMeters:0,plants:0}}const z=je.area(N),X=b.bedW+b.pathW;if(X<=0||b.bedW<=0||b.rowSp<=0||b.inRowSp<=0)return{areaM2:z,beds:[],bedMeters:0,plants:0};const me=je.centroid(N),we=je.transformRotate(N,-b.angle,{pivot:me}),ke=je.bbox(we),xt=1/111320,xn=X*xt,Os=b.bedW*xt,Jt=(ke[2]-ke[0])*.02+1e-4,Fr=[];let qr=0,Tr=0,Hr=0;for(let Ye=ke[1];Ye<ke[3]&&Hr<4e3;Ye+=xn,Hr++){const _r=Math.min(Ye+Os,ke[3]),Ks=je.polygon([[[ke[0]-Jt,Ye],[ke[2]+Jt,Ye],[ke[2]+Jt,_r],[ke[0]-Jt,_r],[ke[0]-Jt,Ye]]]);let Na=null;try{Na=je.intersect(we,Ks)}catch{Na=null}if(!Na)continue;let Sn;try{Sn=je.transformRotate(Na,b.angle,{pivot:me})}catch{continue}const En=je.area(Sn);if(En<Math.max(.4,b.bedW*.3))continue;const Ln=En/b.bedW,Dn=Math.max(1,Math.floor(b.bedW/b.rowSp)),$n=Math.max(0,Math.floor(Ln/b.inRowSp));qr+=Ln,Tr+=Dn*$n,Fr.push({geo:Sn,lenM:Ln,rows:Dn,perRow:$n,plants:Dn*$n,areaM2:En})}return{areaM2:z,beds:Fr,bedMeters:qr,plants:Tr}}const G=(o,b,h)=>({color:o.color,weight:b?3:2,fillColor:o.color,fillOpacity:h?b?.04:.1:b?.32:.22,dashArray:b?null:h?"5 5":null}),q=(o,b,h)=>{const w=b%2===0;return h?{color:"#ffffff",weight:.7,opacity:.85,fillColor:o.color,fillOpacity:w?.78:.52}:{color:o.color,weight:0,fillColor:o.color,fillOpacity:w?.5:.32}};function V(o){return!u||o.bedsHidden?!1:(o.params?.bedW||0)/Ni()>=2.2}function Fe(o){o.outline&&(R.removeLayer(o.outline),o.outline=null),o.bedsLayer&&(R.removeLayer(o.bedsLayer),o.bedsLayer=null),o.label&&s&&(s.removeLayer(o.label),o.label=null),_(o)}function I(o){const b=!!o.editing;o.outline&&R.removeLayer(o.outline),o.bedsLayer&&(R.removeLayer(o.bedsLayer),o.bedsLayer=null),o.label&&s&&s.removeLayer(o.label),_(o);const h=o._key===n,w=V(o);o._lastDetail=w,w&&(o.bedsLayer=Y.layerGroup(),(o.result?.beds||[]).forEach((k,N)=>{const z=Y.geoJSON(k.geo,{style:q(o,N,h),bubblingMouseEvents:!1});z.bindTooltip(`Beet ${N+1} · ${se(k.lenM,1)} m · ${k.rows}×${se(k.perRow)} = ${se(k.plants)} Pfl.`,{sticky:!0}),z.on("click",()=>ge(o._key)),z.on("contextmenu",X=>F(o,X,N+1)),z.addTo(o.bedsLayer)}),o.bedsLayer.addTo(R)),o.outline=Y.polygon(o.latlngs,{...G(o,h,w),bubblingMouseEvents:!1}).addTo(R),o.outline.on("click",()=>ge(o._key)),o.outline.on("dblclick",()=>lt(o)),o.outline.on("contextmenu",k=>F(o,k)),D(o,h),(h||b)&&C(o)}function D(o,b){if(!c||!s||!o.outline)return;let h;try{h=o.outline.getBounds().getCenter()}catch{return}const w=o.result?.plants||0,k=`<div class="acker-flabel${b?" sel":""}" style="--fc:${o.color}"><b>${g(o.name||"")}</b><i>${se(w)} Pfl.</i></div>`;o.label=Y.marker(h,{interactive:!1,keyboard:!1,icon:Y.divIcon({className:"acker-flabel-wrap",html:k,iconSize:[0,0]})}),s.addLayer(o.label)}function C(o){_(o),o.handles=o.latlngs.map((b,h)=>{const w=Y.marker(b,{draggable:!0,icon:Y.divIcon({className:"acker-vhandle"})}).addTo(R);return w.on("drag",k=>{o.latlngs[h]=[k.target.getLatLng().lat,k.target.getLatLng().lng],o.outline.setLatLngs(o.latlngs)}),w.on("dragend",()=>qe(o)),w.on("contextmenu",k=>pe(o,h,k)),w}),o.editing=!0}function _(o){(o.handles||[]).forEach(b=>R.removeLayer(b)),o.handles=[],o.editing=!1}function re(){a.forEach(o=>I(o))}function ee(){a.forEach(o=>{V(o)!==o._lastDetail&&I(o)})}function oe(o,b){o.color=b;try{o.outline?.setStyle({color:b,fillColor:b})}catch{}if(o.bedsLayer)try{o.bedsLayer.eachLayer(w=>w.setStyle&&w.setStyle({fillColor:b}))}catch{}try{const w=o.label?.getElement?.()?.querySelector?.(".acker-flabel");w&&w.style.setProperty("--fc",b)}catch{}const h=y?.querySelector(".acker-field.sel .acker-swatch");h&&(h.style.background=b)}function lt(o){if(o.latlngs?.length)try{R.fitBounds(Y.polygon(o.latlngs).getBounds(),{maxZoom:20,padding:[40,40]})}catch{}}function We(){const o=a.filter(b=>b.latlngs?.length>=3);if(!o.length){M.info("Keine Flächen vorhanden.");return}try{let b=Y.polygon(o[0].latlngs).getBounds();o.slice(1).forEach(h=>{b=b.extend(Y.polygon(h.latlngs).getBounds())}),R.fitBounds(b,{maxZoom:19,padding:[40,40]})}catch{}}function qe(o){o.result=K(o.latlngs,o.params),I(o),Q(),A(o)}function Qe(o){if(Ke("app",b=>({...b,activeSection:"kultur"})),o?.id)try{window.dispatchEvent(new CustomEvent("psm:openKultur",{detail:{typ:"acker",id:String(o.id)}}))}catch{}else M.info("Fläche wird gespeichert – in der Kulturführung gleich wählbar.")}let ue=null;const ct=()=>{ue&&(ue.remove(),ue=null,document.removeEventListener("pointerdown",Pa,!0),document.removeEventListener("keydown",Ia,!0))},Pa=o=>{ue&&!ue.contains(o.target)&&ct()},Ia=o=>{o.key==="Escape"&&ct()};function kn(o,b){b.style.left="",b.style.right="",b.style.top="";const h=o.getBoundingClientRect(),w=b.getBoundingClientRect(),k=w.width||210,N=w.height||260;h.right+3+k>window.innerWidth-8&&(b.style.left="auto",b.style.right="calc(100% + 3px)");let z=-5;h.top+z+N>window.innerHeight-8&&(z=Math.min(-5,window.innerHeight-8-N-h.top)),h.top+z<8&&(z=8-h.top),b.style.top=z+"px"}function Ca(o,b){b.forEach(h=>{if(!h)return;if(h.sep){const k=document.createElement("div");k.className="acker-ctx-sep",o.appendChild(k);return}if(h.type==="swatchGrid"){const k=document.createElement("div");k.className="acker-ctx-swatches",h.colors.forEach(X=>{const me=document.createElement("button");me.type="button",me.className="acker-sw"+(X===h.current?" on":""),me.style.background=X,me.title=X,me.addEventListener("click",we=>{we.stopPropagation(),ct(),h.onPick(X)}),k.appendChild(me)});const N=document.createElement("label");N.className="acker-sw-custom",N.innerHTML=`<i class="bi bi-eyedropper"></i><input type="color" value="${h.current||"#3b82f6"}">`;const z=N.querySelector("input");z.addEventListener("input",X=>(h.onLive||h.onPick)(X.target.value)),z.addEventListener("change",X=>{h.onPick(X.target.value),ct()}),k.appendChild(N),o.appendChild(k);return}const w=document.createElement("button");if(w.type="button",w.className="acker-ctx-item"+(h.danger?" danger":"")+(h.submenu?" has-sub":"")+(h.disabled?" disabled":""),w.innerHTML=`<span class="ic">${h.icon||""}</span><span class="lb">${g(h.label)}</span>`+(h.right?`<span class="rt">${g(h.right)}</span>`:"")+(h.submenu?'<span class="ch"><i class="bi bi-chevron-right"></i></span>':""),h.submenu){const k=document.createElement("div");k.className="acker-ctx-sub",Ca(k,h.submenu),w.appendChild(k),w.addEventListener("pointerenter",()=>kn(w,k))}else h.disabled||w.addEventListener("click",k=>{k.stopPropagation(),h.keepOpen||ct(),h.action?.()});o.appendChild(w)})}function Zt(o,b,h,w){if(ct(),ue=document.createElement("div"),ue.className="acker-ctx",w){const X=document.createElement("div");X.className="acker-ctx-title",X.textContent=w,ue.appendChild(X)}Ca(ue,h),document.body.appendChild(ue);const k=ue.getBoundingClientRect();let N=o,z=b;N+k.width>window.innerWidth-8&&(N=Math.max(8,window.innerWidth-k.width-8)),z+k.height>window.innerHeight-8&&(z=Math.max(8,window.innerHeight-k.height-8)),ue.style.left=N+"px",ue.style.top=z+"px",setTimeout(()=>{document.addEventListener("pointerdown",Pa,!0),document.addEventListener("keydown",Ia,!0)},0)}const Ce=o=>{const b=o.originalEvent||o;return b&&Y.DomEvent.preventDefault?.(b),o.originalEvent&&Y.DomEvent.stop?.(o),{x:b.clientX,y:b.clientY}};function zt(o,b){o.params.angle=(Math.round(o.params.angle+b)%180+180)%180,qe(o),M.info(`Beete-Ausrichtung: ${o.params.angle}°`)}function Ma(o,b){o.color=b,I(o),Q(),A(o)}function za(o,b){o.kultur=b||null,o.eppoCode=Et.find(h=>h.kultur===o.kultur)?.eppoCode||null,I(o),Q(),A(o),M.success(b?`Kultur: ${b}`:"Kultur entfernt.")}function Ba(o){o.bedsHidden=!o.bedsHidden,I(o),M.info(o.bedsHidden?"Beete ausgeblendet.":"Beete eingeblendet.")}function S(o){ge(o._key),setTimeout(()=>{const b=y?.querySelector(".acker-field.sel .acker-name");b&&(b.focus(),b.select())},30)}function E(o){const h=Ni()*18/111320,w={_key:"new-"+ ++Bt,id:null,name:(o.name||"Fläche")+" (Kopie)",kultur:o.kultur,eppoCode:o.eppoCode,standortId:o.standortId,color:dt[(dt.indexOf(o.color)+1)%dt.length],latlngs:o.latlngs.map(k=>[k[0]+h,k[1]+h]),params:{...o.params},outline:null,bedsLayer:null,label:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(w),n=w._key,qe(w),A(w,!0),M.success("Fläche dupliziert.")}function O(o){const b=o.latlngs||[];if(b.length<3){M.warning("Fläche hat keine Geometrie.");return}const h=b.map(k=>[Number(k[1]),Number(k[0])]);(h[0][0]!==h[h.length-1][0]||h[0][1]!==h[h.length-1][1])&&h.push([h[0][0],h[0][1]]);const w={type:"FeatureCollection",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:[{type:"Feature",geometry:{type:"Polygon",coordinates:[h]},properties:{name:o.name||"",kultur:o.kultur||null,eppoCode:o.eppoCode||null,flaeche_m2:Math.round(o.result?.areaM2||0),beete:o.result?.beds?.length||0,beetmeter_m:Math.round(o.result?.bedMeters||0),pflanzen:o.result?.plants||0}}]};try{const k=new Blob([JSON.stringify(w,null,2)],{type:"application/geo+json"}),N=URL.createObjectURL(k),z=document.createElement("a");z.href=N,z.download=`${(o.name||"flaeche").replace(/[^\w\-]+/g,"_")}.geojson`,document.body.appendChild(z),z.click(),z.remove(),setTimeout(()=>URL.revokeObjectURL(N),1e3),M.success("Fläche als GeoJSON exportiert.")}catch{M.error("Export fehlgeschlagen.")}}async function W(o){const b=o.result||{},h=[`Fläche: ${o.name||""}`,o.kultur?`Kultur: ${o.kultur}`:"",`Größe: ${se(b.areaM2||0)} m² (${se((b.areaM2||0)/1e4,3)} ha)`,`Beete: ${se(b.beds?.length||0)}`,`Beetmeter: ${se(b.bedMeters||0)} m`,`Pflanzen: ${se(b.plants||0)}`].filter(Boolean).join(`
`);try{await navigator.clipboard.writeText(h),M.success("Werte kopiert.")}catch{M.warning("Kopieren nicht möglich.")}}const P=o=>({icon:'<i class="bi bi-palette"></i>',label:"Farbe",submenu:[{type:"swatchGrid",colors:dt,current:o.color,onPick:b=>Ma(o,b),onLive:b=>oe(o,b)}]}),U=o=>({icon:'<i class="bi bi-flower1"></i>',label:"Kultur zuweisen",submenu:[{icon:'<i class="bi bi-x"></i>',label:"– keine –",action:()=>za(o,null)},...Et.length?[{sep:!0}]:[],...Et.map(b=>({icon:b.kultur===o.kultur?'<i class="bi bi-check2"></i>':"",label:`${b.kultur}${b.anbau?" ("+b.anbau+")":""}`,action:()=>za(o,b.kultur)}))]});function F(o,b,h){ge(o._key);const{x:w,y:k}=Ce(b),N=!!o.editing;Zt(w,k,[{icon:'<i class="bi bi-clipboard2-pulse"></i>',label:"Kulturführung öffnen",action:()=>Qe(o)},{icon:'<i class="bi bi-pencil"></i>',label:"Umbenennen",action:()=>S(o)},U(o),P(o),{sep:!0},{icon:'<i class="bi bi-arrow-clockwise"></i>',label:"Beete drehen +15°",keepOpen:!0,action:()=>zt(o,15)},{icon:'<i class="bi bi-arrow-counterclockwise"></i>',label:"Beete drehen −15°",keepOpen:!0,action:()=>zt(o,-15)},{icon:'<i class="bi bi-grid-3x3-gap"></i>',label:o.bedsHidden?"Beete einblenden":"Beete ausblenden",action:()=>Ba(o)},{icon:'<i class="bi bi-bounding-box-circles"></i>',label:N?"Eckpunkte fertig":"Eckpunkte bearbeiten",action:()=>{N?_(o):C(o)}},{sep:!0},{icon:'<i class="bi bi-copy"></i>',label:"Duplizieren",action:()=>E(o)},{icon:'<i class="bi bi-zoom-in"></i>',label:"Auf Fläche zoomen",action:()=>lt(o)},{icon:'<i class="bi bi-clipboard-data"></i>',label:"Werte kopieren",action:()=>W(o)},{icon:'<i class="bi bi-download"></i>',label:"Als GeoJSON exportieren",action:()=>O(o)},{sep:!0},{icon:'<i class="bi bi-trash"></i>',label:"Löschen",danger:!0,action:()=>be(o._key)}],h?`${o.name||"Fläche"} · Beet ${h}`:o.name||"Fläche")}function pe(o,b,h){const{x:w,y:k}=Ce(h);Zt(w,k,[{icon:'<i class="bi bi-node-minus"></i>',label:"Eckpunkt löschen",disabled:o.latlngs.length<=3,action:()=>{o.latlngs.length<=3||(o.latlngs.splice(b,1),qe(o))}},{icon:'<i class="bi bi-check2"></i>',label:"Bearbeiten beenden",action:()=>_(o)}],`Eckpunkt ${b+1}`)}function le(){!l.sat||!l.osm||(R.hasLayer(l.sat)?(R.removeLayer(l.sat),l.osm.addTo(R),M.info("Karte: OSM")):(R.removeLayer(l.osm),l.sat.addTo(R),M.info("Karte: Satellit")))}function ce(o){const b=o.latlng,{x:h,y:w}=Ce(o);Zt(h,w,[{icon:'<i class="bi bi-pencil-square"></i>',label:"Neue Fläche hier zeichnen",action:()=>{Qt(!0),zr({latlng:b})}},{icon:'<i class="bi bi-crosshair"></i>',label:"Hierhin zentrieren",action:()=>R.panTo(b)},{sep:!0},{icon:'<i class="bi bi-arrows-fullscreen"></i>',label:"Alle Flächen anzeigen",disabled:!a.some(k=>k.latlngs?.length>=3),action:We},{icon:'<i class="bi bi-layers"></i>',label:"Kartentyp wechseln (Satellit/OSM)",action:le},{sep:!0},{icon:'<i class="bi bi-geo-alt"></i>',label:"Koordinaten kopieren",action:async()=>{try{await navigator.clipboard.writeText(`${b.lat.toFixed(6)}, ${b.lng.toFixed(6)}`),M.success("Koordinaten kopiert.")}catch{M.warning("Kopieren nicht möglich.")}}}],"Karte")}function H(o){return['<option value="">– Kultur –</option>'].concat(Et.map(b=>{const h=`${b.kultur}${b.anbau?" ("+b.anbau+")":""}`;return`<option value="${g(b.kultur)}"${b.kultur===o?" selected":""}>${g(h)}</option>`})).join("")}function Z(o){const b=ze(t.state.getState().gps?.points)||[];return['<option value="">– Standort –</option>'].concat(b.map(h=>`<option value="${g(h.id)}"${h.id===o?" selected":""}>${g(h.name||"")}</option>`)).join("")}function Q(){if(!y||!f||!x)return;f.style.display=a.length?"none":"block",x.style.display=a.length?"block":"none",y.innerHTML="";let o=0,b=0,h=0,w=0;a.forEach(k=>{o+=k.result?.areaM2||0,b+=k.result?.beds?.length||0,h+=k.result?.bedMeters||0,w+=k.result?.plants||0;const N=k._key===n,z=document.createElement("div");z.className="acker-field"+(N?" sel open":""),z.innerHTML=`
        <div class="acker-fhead">
          <span class="acker-swatch" style="background:${k.color}"></span>
          <input class="acker-name" value="${g(k.name)}" />
          <span class="acker-stat">${se(k.result?.plants||0)} Pfl.</span>
        </div>
        <div class="acker-fbody">
          <div class="acker-grid">
            <label class="acker-fld span2">Kultur<select data-k="kultur">${H(k.kultur)}</select></label>
            <label class="acker-fld span2">Standort (für PSM)<select data-k="standortId">${Z(k.standortId)}</select></label>
            <label class="acker-fld">Bettbreite (m)<input data-k="bedW" type="number" step="0.05" min="0.1" value="${k.params.bedW}"/></label>
            <label class="acker-fld">Wegbreite (m)<input data-k="pathW" type="number" step="0.05" min="0" value="${k.params.pathW}"/></label>
            <label class="acker-fld">Reihenabstand (m)<input data-k="rowSp" type="number" step="0.05" min="0.05" value="${k.params.rowSp}"/></label>
            <label class="acker-fld">Pflanzabstand (m)<input data-k="inRowSp" type="number" step="0.05" min="0.05" value="${k.params.inRowSp}"/></label>
            <label class="acker-fld span2">Ausrichtung der Beete: ${k.params.angle}°<input data-k="angle" type="range" min="0" max="180" step="5" value="${k.params.angle}"/></label>
          </div>
          <div class="acker-res">
            <div class="r"><span>Fläche</span><b>${se(k.result?.areaM2||0)} m² · ${se((k.result?.areaM2||0)/1e4,3)} ha</b></div>
            <div class="r"><span>Beete</span><b>${se(k.result?.beds?.length||0)}</b></div>
            <div class="r"><span>Beetmeter</span><b>${se(k.result?.bedMeters||0)} m</b></div>
            <div class="r"><span>Pflanzen</span><b>${se(k.result?.plants||0)}</b></div>
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
        </div>`,z.querySelector(".acker-fhead").addEventListener("click",we=>{we.target.classList.contains("acker-name")||ge(k._key)}),z.querySelector(".acker-name").addEventListener("input",we=>{k.name=we.target.value,A(k)}),z.querySelectorAll("[data-k]").forEach(we=>{we.addEventListener("input",ke=>{const xt=we.dataset.k;if(xt==="kultur"){k.kultur=ke.target.value||null,k.eppoCode=Et.find(xn=>xn.kultur===k.kultur)?.eppoCode||null,A(k);return}if(xt==="standortId"){k.standortId=ke.target.value||null,A(k);return}xt==="angle"?k.params.angle=+ke.target.value:k.params[xt]=parseFloat(ke.target.value)||0,qe(k)})}),z.querySelector('[data-act="del"]').addEventListener("click",()=>be(k._key)),z.querySelector('[data-act="zoom"]').addEventListener("click",()=>lt(k)),z.querySelector('[data-act="dup"]').addEventListener("click",()=>E(k)),z.querySelector('[data-act="rot"]').addEventListener("click",()=>zt(k,15));const me=z.querySelector('[data-act="color"]');me.addEventListener("input",we=>oe(k,we.target.value)),me.addEventListener("change",we=>Ma(k,we.target.value)),y.appendChild(z)}),x.querySelector('[data-t="area"]').textContent=se(o)+" m² · "+se(o/1e4,3)+" ha",x.querySelector('[data-t="beds"]').textContent=se(b),x.querySelector('[data-t="meters"]').textContent=se(h)+" m",x.querySelector('[data-t="plants"]').textContent=se(w)}function ge(o){n=o,a.forEach(b=>I(b)),Q()}async function be(o){const b=a.find(w=>w._key===o);if(!b)return;Fe(b);const h=a.findIndex(w=>w._key===o);if(h>=0&&a.splice(h,1),n===o&&(n=null),Q(),b.id&&ne()==="sqlite")try{await So({id:b.id}),await Oe().catch(()=>{})}catch{}}let Pe=!1,Ie=[],Ee=null,Je=[],Bt=0;function Qt(o){Pe=o,m('[data-role="acker-banner"]').style.display=o?"block":"none",m('[data-role="acker-draw"]').style.display=o?"none":"block",R.getContainer().style.cursor=o?"crosshair":"",o||(Ee&&R.removeLayer(Ee),Je.forEach(b=>R.removeLayer(b)),Ee=null,Je=[],Ie=[])}function zr(o){Pe&&(Ie.push([o.latlng.lat,o.latlng.lng]),Je.push(Y.circleMarker(o.latlng,{radius:4,color:"#22c55e",fillColor:"#fff",fillOpacity:1,weight:2}).addTo(R)),Ee?Ee.setLatLngs(Ie):Ee=Y.polyline(Ie,{color:"#22c55e",weight:2,dashArray:"5 5"}).addTo(R))}function Br(){if(Ie.length<3){M.warning("Mindestens 3 Punkte setzen.");return}const o={_key:"new-"+ ++Bt,id:null,name:"Fläche "+(a.length+1),kultur:null,eppoCode:null,standortId:null,color:dt[a.length%dt.length],latlngs:Ie.map(b=>b.slice()),params:td(),outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};a.push(o),Qt(!1),n=o._key,qe(o),A(o,!0)}async function Nr(){const o=m('[data-role="acker-q"]').value.trim();if(o)try{const h=await(await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+encodeURIComponent(o))).json();h[0]?R.setView([+h[0].lat,+h[0].lon],18):M.info("Nichts gefunden.")}catch{M.warning("Suche nicht verfügbar.")}}async function Ts(){if(_n){setTimeout(()=>R&&R.invalidateSize(),60);return}_n=!0;try{await gt(()=>Promise.resolve({}),__vite__mapDeps([2]));const w=await gt(()=>import("./leaflet-src.BcflbDBd.js").then(k=>k.l),__vite__mapDeps([3,4]));Y=w.default||w,je=await gt(()=>import("./index.CPadEFgJ.js"),__vite__mapDeps([5,4]))}catch(w){console.warn("[Acker] Karten-Bibliotheken konnten nicht geladen werden:",w),f&&(f.textContent="Karte konnte nicht geladen werden (offline?)."),_n=!1;return}R=Y.map(v,{doubleClickZoom:!1,zoomControl:!0,attributionControl:!0}).setView([47.818,8.976],17);const o=Y.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:21,maxNativeZoom:19,attribution:"Tiles © Esri"}).addTo(R),b=Y.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"});l={sat:o,osm:b},i=Y.layerGroup(),p(),i.addTo(R),s=Y.layerGroup().addTo(R),Y.control.layers({Satellit:o,"Karte (OSM)":b},{"Freiland-Standorte":i},{position:"topright",collapsed:!0}).addTo(R);const h=Y.Control.extend({options:{position:"topleft"},onAdd(){const w=Y.DomUtil.create("div","leaflet-bar acker-toolbar");w.innerHTML='<a href="#" data-tb="fit" title="Alle Flächen anzeigen"><i class="bi bi-arrows-fullscreen"></i></a><a href="#" data-tb="labels" class="on" title="Beschriftungen ein/aus"><i class="bi bi-tag"></i></a><a href="#" data-tb="beds" class="on" title="Beete-Detail ein/aus"><i class="bi bi-grid-3x3"></i></a>',Y.DomEvent.disableClickPropagation(w);const k=(N,z)=>{w.querySelector(N).addEventListener("click",X=>{X.preventDefault(),z()})};return k('[data-tb="fit"]',We),k('[data-tb="labels"]',()=>{c=!c,w.querySelector('[data-tb="labels"]').classList.toggle("on",c),re()}),k('[data-tb="beds"]',()=>{u=!u,w.querySelector('[data-tb="beds"]').classList.toggle("on",u),re()}),w}});R.addControl(new h),R.on("click",zr),R.on("contextmenu",w=>{Pe||ce(w)}),R.on("zoomend",ee),m('[data-role="acker-draw"]').addEventListener("click",()=>Qt(!0)),m('[data-role="acker-export"]')?.addEventListener("click",d),m('[data-role="acker-finish"]').addEventListener("click",Br),m('[data-role="acker-cancel"]').addEventListener("click",()=>Qt(!1)),m('[data-role="acker-go"]').addEventListener("click",Nr),m('[data-role="acker-q"]').addEventListener("keydown",w=>{w.key==="Enter"&&Nr()}),document.addEventListener("keydown",w=>{if(Pe){if(w.key==="Backspace"){w.preventDefault(),Ie.pop();const k=Je.pop();k&&R.removeLayer(k),Ee&&Ee.setLatLngs(Ie)}w.key==="Enter"&&Br(),w.key==="Escape"&&Qt(!1)}}),await Hs(),await _s(),setTimeout(()=>R.invalidateSize(),60)}async function Hs(){if(ne()==="sqlite")try{Et=(await mr())?.rows||[]}catch{Et=[]}}async function _s(){if(ne()==="sqlite")try{((await fr())?.rows||[]).forEach(h=>{const w={_key:"db-"+h.id,id:h.id,name:h.name,kultur:h.kultur,eppoCode:h.eppoCode,standortId:h.standortId,color:h.color||dt[a.length%dt.length],latlngs:h.latlngs||[],params:{bedW:h.bedW??1.2,pathW:h.pathW??.4,rowSp:h.rowSp??.5,inRowSp:h.inRowSp??.4,angle:h.angle??0},outline:null,bedsLayer:null,handles:[],result:{areaM2:0,beds:[],bedMeters:0,plants:0}};w.result=K(w.latlngs,w.params),a.push(w),I(w)}),Q();const b=a.find(h=>h.latlngs?.length);if(b&&R)try{R.fitBounds(Y.polygon(b.latlngs).getBounds(),{maxZoom:19,padding:[30,30]})}catch{}}catch(o){console.warn("[Acker] Flächen laden fehlgeschlagen:",o)}}t.state.subscribe(o=>{o?.app?.activeSection==="acker"&&Ts()}),Q()}function nd(){return`
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
  </section>`}function ra(e){return e.typ+":"+e.id}function rd(e){if(!Array.isArray(e)||e.length<3)return null;let t=0,a=0,n=0;const r=e.length,i=e[r-1],s=e[0],c=i&&s&&Number(i[0])===Number(s[0])&&Number(i[1])===Number(s[1])?r-1:r;for(let u=0;u<c;u++){const d=Number(e[u]?.[0]),p=Number(e[u]?.[1]);Number.isFinite(d)&&Number.isFinite(p)&&(t+=d,a+=p,n++)}return n?{lat:t/n,lon:a/n}:null}async function Fi(e){const t=[];(ze(e.state.getState().gps?.points)||[]).forEach(n=>{if(n?.kind!=="gewaechshaus")return;const r=Number(n.latitude),i=Number(n.longitude),s=Number(n.nutzflaecheQm);t.push({typ:"haus",id:String(n.id),name:n.name||"Gewächshaus",areaQm:Number.isFinite(s)&&s>0?s:null,lat:Number.isFinite(r)?r:null,lon:Number.isFinite(i)?i:null,color:null})});try{((await fr())?.rows||[]).forEach(r=>{const i=rd(r.latlngs),s=Number(r.areaQm);t.push({typ:"acker",id:String(r.id),name:r.name||"Fläche",areaQm:Number.isFinite(s)&&s>0?s:null,lat:i?.lat??null,lon:i?.lon??null,color:r.color||null})})}catch{}return t}const id="Wetterdaten: Open-Meteo (CC BY 4.0)",sd="psm.weather.";function od(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function ld(e,t){return sd+e.toFixed(3)+"_"+t.toFixed(3)}function cd(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch{return null}}function dd(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function ud(e){return!!e&&e.slice(0,10)===od()}function pd(e,t,a){const n=e?.time||[],r=e?.temperature_2m_max||[],i=e?.temperature_2m_min||[],s=e?.precipitation_sum||[],l=e?.sunshine_duration||[],c=bt(new Date),u=ha(c.year,c.week),d=new Map;for(let m=0;m<n.length;m++){const y=Yi(n[m]);if(!y)continue;const{year:f,week:x}=bt(y),v=ha(f,x);let $=d.get(v);$||($={key:v,year:f,week:x,tmaxSum:0,tmaxN:0,tminSum:0,tminN:0,precip:0,precipN:0,sun:0,sunN:0,days:0},d.set(v,$)),Number.isFinite(r[m])&&($.tmaxSum+=r[m],$.tmaxN++),Number.isFinite(i[m])&&($.tminSum+=i[m],$.tminN++),Number.isFinite(s[m])&&($.precip+=s[m],$.precipN++),Number.isFinite(l[m])&&($.sun+=l[m],$.sunN++),$.days++}const p=[...d.values()].sort((m,y)=>m.key<y.key?-1:m.key>y.key?1:0).map(m=>{const y=m.tmaxN?m.tmaxSum/m.tmaxN:null,f=m.tminN?m.tminSum/m.tminN:null;return{weekKey:m.key,year:m.year,week:m.week,tMaxAvg:y,tMinAvg:f,tMeanAvg:y!=null&&f!=null?(y+f)/2:y,precipSum:m.precipN?m.precip:null,sunHours:m.sunN?m.sun/3600:null,days:m.days,isForecast:m.key>=u}});return{lat:t,lon:a,fetchedAt:new Date().toISOString(),weeks:p}}async function md(e,t){if(!Number.isFinite(e)||!Number.isFinite(t))return{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const a=ld(e,t),n=cd(a);if(n&&ud(n.fetchedAt)&&n.weeks?.length)return n;if(typeof navigator<"u"&&navigator.onLine===!1)return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]};const r="https://api.open-meteo.com/v1/forecast?latitude="+e.toFixed(4)+"&longitude="+t.toFixed(4)+"&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunshine_duration&timezone=Europe%2FBerlin&past_days=92&forecast_days=16";try{const i=await fetch(r);if(!i.ok)throw new Error("HTTP "+i.status);const s=await i.json(),l=pd(s.daily,e,t);return l.weeks.length&&dd(a,l),l}catch{return n?{...n,stale:!0}:{lat:e,lon:t,fetchedAt:new Date().toISOString(),weeks:[]}}}const Sa={mechanisch:{label:"Mechanisch",icon:"bi-tools",color:"#2563eb"},chemisch_psm:{label:"Pflanzenschutz",icon:"bi-droplet-half",color:"#dc2626"},duengung:{label:"Düngung",icon:"bi-flower1",color:"#b45309"},nuetzlinge:{label:"Nützlinge",icon:"bi-bug",color:"#7c3aed"},bewaesserung:{label:"Bewässerung",icon:"bi-moisture",color:"#0891b2"},monitoring:{label:"Monitoring",icon:"bi-eye",color:"#475569"},sonstiges:{label:"Sonstiges",icon:"bi-three-dots",color:"#64748b"}},fd=["mechanisch","chemisch_psm","duengung","nuetzlinge","bewaesserung","monitoring","sonstiges"];function Cs(e){return Sa[e]||Sa.sonstiges}const gd={geplant:{label:"geplant",color:"#64748b"},aktiv:{label:"aktiv",color:"#16a34a"},abgeschlossen:{label:"abgeschlossen",color:"#94a3b8"}},$t=["#16a34a","#0891b2","#7c3aed","#d97706","#dc2626","#0d9488","#65a30d","#db2777"],bd=/^#[0-9a-fA-F]{3,8}$/;function Ms(e){return typeof e=="string"&&bd.test(e.trim())?e.trim():null}function cr(e,t=0){return Ms(e&&e.color)||$t[t%$t.length]}function Dt(){const e=new Date;return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function ae(e){if(!e)return NaN;const t=String(e).slice(0,10).replace(/-/g,""),a=Number(t);return Number.isFinite(a)?a:NaN}function On(e){const t=[...e||[]].sort((i,s)=>(ae(i.pflanzDatum)||0)-(ae(s.pflanzDatum)||0)),a=Number(Dt().replace(/-/g,""));let n=t.find(i=>i.status==="aktiv")||null;if(!n){const i=t.filter(s=>s.status!=="abgeschlossen"&&ae(s.pflanzDatum)<=a&&(!s.ernteDatum||ae(s.ernteDatum)>=a));n=i.length?i[i.length-1]:null}let r=t.filter(i=>i!==n&&i.status!=="abgeschlossen"&&ae(i.pflanzDatum)>a).sort((i,s)=>(ae(i.pflanzDatum)||0)-(ae(s.pflanzDatum)||0))[0]||null;return r||(r=t.filter(i=>i!==n&&i.status==="geplant").sort((i,s)=>(ae(i.pflanzDatum)||0)-(ae(s.pflanzDatum)||0))[0]||null),{current:n,next:r,all:t}}function hd(e,t,a=70){const n=[],r=bt(e);let i=Lo(r.year,r.week);const s=t.getTime(),l=bt(new Date),c=ha(l.year,l.week);let u=0;for(;i.getTime()<=s&&u<a;){const d=bt(i),p=ha(d.year,d.week);n.push({year:d.year,week:d.week,key:p,monday:new Date(i),isCurrent:p===c,isPast:p<c,isFuture:p>c}),i=new Date(i.getFullYear(),i.getMonth(),i.getDate()+7),u++}return n}function dr(e,t){if(!t)return-1;const a=new Date(String(t).slice(0,10)+"T00:00:00");if(isNaN(a.getTime()))return-1;const n=bt(a),r=ha(n.year,n.week);return e.findIndex(i=>i.key===r)}function qi(e){return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function vd(e,t,a){if(!e||!e.length||!t)return null;const n=e[0].monday,r=e[e.length-1].monday,i=new Date(r.getFullYear(),r.getMonth(),r.getDate()+6),s=ae(qi(n)),l=ae(qi(i)),c=ae(t),u=a?ae(a):l;if(!Number.isFinite(c)||c>l||Number.isFinite(u)&&u<s)return null;let d=dr(e,t);d<0&&(d=c<s?0:e.length-1);let p=a?dr(e,a):e.length-1;return p<0&&(p=Number.isFinite(u)&&u>l?e.length-1:d),p<d&&(p=d),{s:d,e:p,openEnd:!a}}function yd(e,t){const{units:a,anbau:n,mass:r,onSelect:i}=t;if(!a||!a.length){e.innerHTML='<div class="km-empty"><i class="bi bi-calendar3"></i><p>Noch keine Flächen für den Anbauplan.</p></div>';return}const s=new Date;let l=new Date(s.getFullYear(),s.getMonth(),s.getDate()-28),c=new Date(s.getFullYear(),s.getMonth(),s.getDate()+112);const u=q=>{if(!q)return;const V=new Date(String(q).slice(0,10)+"T00:00:00");isNaN(V.getTime())||(V<l&&(l=V),V>c&&(c=V))};(n||[]).forEach(q=>{u(q.pflanzDatum),u(q.ernteDatum)}),(r||[]).forEach(q=>u(q.planDatum||q.erledigtDatum));const d=hd(l,c),p=d.length,m=30,y=a.filter(q=>q.typ==="haus"),f=a.filter(q=>q.typ==="acker"),x=[{label:"Gewächshäuser",arr:y},{label:"Freiland",arr:f}];let v='<div class="kb-corner" style="grid-row:1;grid-column:1">Fläche</div>';d.forEach((q,V)=>{v+=`<div class="kb-h${q.isCurrent?" cur":""}${q.isFuture?" fut":""}" style="grid-row:1;grid-column:${V+2}">${q.week}</div>`});let $="",A=1;x.forEach(q=>{q.arr.length&&(A++,$+=`<div class="kb-group" style="grid-row:${A};grid-column:1/-1">${g(q.label)}</div>`,q.arr.forEach(V=>{A++;const Fe=V.typ+":"+V.id;$+=`<div class="kb-name" data-ukey="${Fe}" title="${g(V.name)}" style="grid-row:${A};grid-column:1">${g(V.name)}</div>`,(n||[]).filter(_=>_.flaecheTyp===V.typ&&String(_.flaecheId)===String(V.id)).sort((_,re)=>(ae(_.pflanzDatum)||0)-(ae(re.pflanzDatum)||0)).forEach((_,re)=>{const ee=vd(d,_.pflanzDatum,_.ernteDatum);if(!ee)return;const oe=cr(_,re),lt=_.status==="geplant";$+=`<div class="kb-bar${lt?" planned":""}" title="${g(_.kultur||"Kultur")}" style="grid-row:${A};grid-column:${ee.s+2}/${ee.e+3};--cc:${oe}">${g(_.kultur||"")}</div>`});const D=(r||[]).filter(_=>_.flaecheTyp===V.typ&&String(_.flaecheId)===String(V.id)),C={};D.forEach(_=>{const re=_.status==="erledigt"?_.erledigtDatum||_.planDatum:_.planDatum||_.erledigtDatum,ee=dr(d,re);if(ee<0||C[ee])return;C[ee]=!0;const oe=Cs(_.art);$+=`<div class="kb-m" title="${g(oe.label)}" style="grid-row:${A};grid-column:${ee+2};--mc:${oe.color}"></div>`})}))});const K=d.findIndex(q=>q.isCurrent),G=K>=0?`<div class="kb-today" style="grid-row:1/${A+1};grid-column:${K+2}"></div>`:"";e.innerHTML=`<div class="kb-wrap"><div class="kb-grid" style="grid-template-columns:150px repeat(${p},${m}px);grid-auto-rows:26px">${v}${$}${G}</div></div>
    <div class="km-legend" style="margin-top:10px">${fd.map(q=>`<span class="km-leg"><span class="km-leg-dot" style="background:${Sa[q].color}"></span>${g(Sa[q].label)}</span>`).join("")}</div>`,e.querySelectorAll("[data-ukey]").forEach(q=>q.addEventListener("click",()=>i&&i(q.dataset.ukey)))}const wd=[{art:"bewaesserung",label:"Gießen",icon:"bi-droplet"},{art:"mechanisch",label:"Hacken",icon:"bi-tools"},{art:"duengung",label:"Düngen",icon:"bi-flower1"},{art:"nuetzlinge",label:"Nützlinge",icon:"bi-bug"},{art:"chemisch_psm",label:"Pflanzenschutz",icon:"bi-droplet-half"},{art:"monitoring",label:"Kontrolle",icon:"bi-eye"},{art:"sonstiges",label:"Sonstiges",icon:"bi-three-dots"}],kd=["Jan.","Feb.","März","Apr.","Mai","Juni","Juli","Aug.","Sep.","Okt.","Nov.","Dez."];function xd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Sd();let a=[],n=[],r=[],i=[],s=null,l="flaechen",c=!1,u=!1;const d={};let p=null;const m=S=>e.querySelector(S),y=()=>m('[data-role="list"]'),f=()=>m('[data-role="detail"]'),x=()=>m('[data-role="kpis"]'),v=()=>m('[data-role="board-view"]'),$=()=>m('[data-role="flaechen-view"]'),A=()=>ne()==="sqlite",K=()=>{A()&&Oe().catch(()=>{})},G=(S,E)=>S.filter(O=>O.flaecheTyp===E.typ&&String(O.flaecheId)===String(E.id)),q=S=>a.find(E=>ra(E)===S)||null,V=(S,E=0)=>Ms(S.color)||$t[E%$t.length];async function Fe(){if(a=await Fi(t),A()){try{n=(await jr())?.rows||[]}catch{n=[]}try{r=(await In())?.rows||[]}catch{r=[]}try{i=(await mr())?.rows||[]}catch{i=[]}if(!u){u=!0;try{const S=await Gr();S?.imported&&(r=(await In())?.rows||[],M.info(`${S.imported} Pflanzenschutz-Eintrag(e) übernommen.`),K())}catch{}}}!s&&a.length&&(s=ra(a[0])),C(),D()}async function I(){if(A()){try{n=(await jr())?.rows||[]}catch{}try{r=(await In())?.rows||[]}catch{}}}async function D(){const S=s?q(s):null;if(!S||S.lat==null||S.lon==null)return;const E=ra(S);if(!d[E]){d[E]={loading:!0,weeks:[]};try{d[E]=await md(S.lat,S.lon)}catch{d[E]={weeks:[]}}s===E&&We()}}function C(){re(),l==="plan"?($().style.display="none",v().style.display="block",yd(v(),{units:a,anbau:n,mass:r,onSelect:S=>{s=S,_("flaechen"),D()}})):(v().style.display="none",$().style.display="grid",oe(),We()),e.querySelectorAll(".km-modebtn").forEach(S=>S.classList.toggle("active",S.dataset.mode===l))}function _(S){l=S,C()}function re(){const S=x();if(!S)return;a.filter(P=>P.typ==="haus").length,a.filter(P=>P.typ==="acker").length;let E=0,O=null;a.forEach(P=>{const{current:U,next:F}=On(G(n,P));U&&E++,F?.pflanzDatum&&(!O||ae(F.pflanzDatum)<ae(O.pflanzDatum))&&(O=F)});const W=r.filter(P=>P.status==="geplant").length;S.innerHTML=`
      ${ee(String(a.length),"Flächen")}
      ${ee(String(E),"Kulturen aktiv")}
      ${ee(String(W),"Aufgaben offen")}
      ${ee(O?qa(Qe(O.pflanzDatum)):"–","Nächste Pflanzung")}
      <button class="km-psm" data-role="psm-import" title="Bestehende Pflanzenschutz-Einträge übernehmen"><i class="bi bi-arrow-down-circle"></i><span>PSM übernehmen</span></button>`,S.querySelector('[data-role="psm-import"]')?.addEventListener("click",kn)}const ee=(S,E)=>`<div class="km-kpi"><div class="km-kpi-v">${S}</div><div class="km-kpi-l">${g(E)}</div></div>`;function oe(){const S=y();if(!S)return;if(!a.length){S.innerHTML='<div class="km-empty"><i class="bi bi-geo-alt"></i><p>Noch keine Flächen.<br>Gewächshäuser unter Einstellungen, Freiland im Reiter „Karte".</p></div>';return}const E=a.filter(P=>P.typ==="haus"),O=a.filter(P=>P.typ==="acker"),W=(P,U)=>U.length?`<div class="km-grp">${g(P)}</div>`+U.map(lt).join(""):"";S.innerHTML=W("Gewächshäuser",E)+W("Freiland",O),S.querySelectorAll("[data-ukey]").forEach(P=>P.addEventListener("click",()=>{s=P.dataset.ukey,oe(),We(),D()}))}function lt(S,E){const O=ra(S),{current:W}=On(G(n,S));return`<div class="km-row${O===s?" sel":""}" data-ukey="${O}">
      <span class="km-dot" style="background:${g(W?cr(W):V(S,E))}"></span>
      <div class="km-row-main"><div class="km-row-name">${g(S.name)}</div>
      <div class="km-row-sub">${W?`<span class="crop">${g(W.kultur||"Kultur")}</span>`:'<span class="free">frei</span>'}</div></div>
    </div>`}function We(){const S=f();if(!S)return;const E=s?q(s):null;if(!E){S.innerHTML='<div class="km-empty"><i class="bi bi-hand-index"></i><p>Fläche links wählen.</p></div>';return}const O=G(n,E),W=G(r,E),{current:P,next:U}=On(O),F=d[ra(E)],pe=E.typ==="haus"?"Gewächshaus":"Freiland",le=E.areaQm?`${Math.round(E.areaQm).toLocaleString("de-DE")} m²`:"";let ce;if(P){const Z=P.pflanzDatum?`seit ${ue(P.pflanzDatum)} · ${qa(Qe(P.pflanzDatum))}`:"",Q=P.ernteDatum?` · Ernte ~${qa(Qe(P.ernteDatum))}`:"";ce=`<div class="km-hero active" style="--cc:${g(cr(P))}">
        <div class="km-hero-ic"><i class="bi bi-flower2"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop">${g(P.kultur||"Kultur")}</div><div class="km-hero-sub">${g(Z+Q)}</div></div>
        <button class="km-hero-edit" data-edit-crop="current" title="Bearbeiten"><i class="bi bi-pencil"></i></button>
      </div>`}else ce=`<div class="km-hero empty">
        <div class="km-hero-ic gray"><i class="bi bi-circle"></i></div>
        <div class="km-hero-body"><div class="km-hero-crop gray">Fläche ist frei</div><div class="km-hero-sub">Noch keine Kultur eingetragen</div></div>
        <button class="km-hero-add" data-edit-crop="current"><i class="bi bi-plus-lg"></i> Kultur setzen</button>
      </div>`;const H=U?`<div class="km-next"><i class="bi bi-arrow-right-short"></i>Danach geplant: <b>${g(U.kultur||"Kultur")}</b> · ab ${qa(Qe(U.pflanzDatum))} <button class="km-next-edit" data-edit-crop="next" title="Bearbeiten"><i class="bi bi-pencil"></i></button></div>`:P?'<button class="km-next-add" data-edit-crop="next"><i class="bi bi-plus"></i> Nächste Kultur planen</button>':"";S.innerHTML=`
      <div class="km-head"><div class="km-head-l"><span class="km-head-name">${g(E.name)}</span><span class="km-head-badge">${pe}${le?" · "+le:""}</span></div>
        <button class="km-headbtn" data-act="map"><i class="bi bi-map"></i> Auf Karte</button></div>
      ${ce}
      ${H}
      <div class="km-tasks-head"><span>Aufgaben</span><button class="km-addtask" data-act="add-massnahme"><i class="bi bi-plus-lg"></i> Aufgabe</button></div>
      ${qe(W)}
      <div class="km-foot">
        <span class="km-weather">${Pa(F)}</span>
        <button class="km-plan" data-act="plan"><i class="bi bi-calendar3"></i> Saison &amp; Plan</button>
      </div>
      <div class="km-attr">${g(id)}${F?.stale?" · offline":""}</div>`,S.querySelector('[data-act="map"]')?.addEventListener("click",()=>Ia()),S.querySelector('[data-act="plan"]')?.addEventListener("click",()=>_("plan")),S.querySelector('[data-act="add-massnahme"]')?.addEventListener("click",()=>Ba(E,null,P)),S.querySelectorAll("[data-edit-crop]").forEach(Z=>Z.addEventListener("click",()=>{const Q=Z.dataset.editCrop;za(E,Q==="current"?P:U,Q,O.length)})),S.querySelectorAll("[data-m-done]").forEach(Z=>Z.addEventListener("click",Q=>{Q.stopPropagation(),Ca(Z.dataset.mDone)})),S.querySelectorAll("[data-m-del]").forEach(Z=>Z.addEventListener("click",Q=>{Q.stopPropagation(),Zt(Z.dataset.mDel)})),S.querySelectorAll("[data-m-edit]").forEach(Z=>Z.addEventListener("click",()=>{const Q=r.find(ge=>ge.id===Z.dataset.mEdit);Ba(E,Q,P)}))}function qe(S){const E=S.filter(F=>F.status==="geplant").sort((F,pe)=>(ae(F.planDatum)||9e15)-(ae(pe.planDatum)||9e15)),O=S.filter(F=>F.status==="erledigt").sort((F,pe)=>(ae(pe.erledigtDatum)||0)-(ae(F.erledigtDatum)||0)).slice(0,6),W=Number(Dt().replace(/-/g,"")),P=(F,pe)=>{const le=Cs(F.art),ce=pe?F.erledigtDatum:F.planDatum,H=!pe&&ce&&ae(ce)<W,Z=pe?ue(ce):ct(ce,H),Q=F.notes||le.label,ge=F.historyId?'<span class="km-pill">PSM</span>':"",be=[];F.notes&&be.push(g(le.label)),F.mittel&&be.push(g(F.mittel)),F.menge!=null&&be.push(`${F.menge}${F.einheit?" "+g(F.einheit):""}`);const Pe=be.join(" · ");return`<div class="km-task${pe?" done":""}" data-m-edit="${F.id}">
        <span class="km-task-ic" style="--mc:${le.color}"><i class="bi ${le.icon}"></i></span>
        <div class="km-task-main"><div class="km-task-title">${g(Q)}${ge}</div>${Pe?`<div class="km-task-sub">${Pe}</div>`:""}</div>
        <span class="km-task-when${H?" overdue":""}">${Z}</span>
        ${pe?`<button class="km-tbtn del" data-m-del="${F.id}" title="Löschen"><i class="bi bi-trash"></i></button>`:`<button class="km-check" data-m-done="${F.id}" title="Erledigt"><i class="bi bi-check-lg"></i></button>`}
      </div>`};let U="";return E.length?U+=E.map(F=>P(F,!1)).join(""):U+='<div class="km-tasks-none"><i class="bi bi-check2-circle"></i> Nichts offen</div>',O.length&&(U+='<div class="km-done-h">Erledigt</div>'+O.map(F=>P(F,!0)).join("")),`<div class="km-tasks">${U}</div>`}function Qe(S){const E=new Date(String(S).slice(0,10)+"T00:00:00");return isNaN(E.getTime())?0:bt(E).week}function ue(S){const E=new Date(String(S).slice(0,10)+"T00:00:00");return isNaN(E.getTime())?"":`${E.getDate()}. ${kd[E.getMonth()]}`}function ct(S,E){if(!S)return"offen";const O=new Date(String(S).slice(0,10)+"T00:00:00");if(isNaN(O.getTime()))return"offen";const W=new Date;W.setHours(0,0,0,0);const P=Math.round((O.getTime()-W.getTime())/864e5);return P===0?"heute":P===1?"morgen":E?"überfällig":ue(S)}function Pa(S){if(!S||!S.weeks?.length)return S?.loading?"Wetter lädt…":"";const{year:E,week:O}=bt(new Date),W=S.weeks.find(F=>F.year===E&&F.week===O)||S.weeks.find(F=>!F.isForecast);if(!W)return"";const P=W.tMaxAvg!=null?Math.round(W.tMaxAvg)+"°":"–",U=W.precipSum!=null?Math.round(W.precipSum)+" mm":"–";return`<i class="bi bi-cloud-sun"></i> Diese Woche: ${P} · ${U} Regen`}function Ia(S){Ke("app",E=>({...E,activeSection:"acker"})),M.info("Karte geöffnet.")}async function kn(){if(!A()){M.warning("Keine Datenbank aktiv.");return}try{const S=await Gr();await I(),C(),S?.imported?(M.success(`${S.imported} übernommen.`),K()):M.info(`Nichts Neues${S?.skipped?` (${S.skipped} nicht zuordenbar)`:""}.`)}catch{M.error("Übernahme fehlgeschlagen.")}}async function Ca(S){const E=r.find(O=>O.id===S);if(E)try{await Vr({...E,status:"erledigt",erledigtDatum:E.erledigtDatum||Dt()}),await I(),C(),K()}catch{M.error("Speichern fehlgeschlagen.")}}async function Zt(S){try{await Ur({id:S}),await I(),C(),K()}catch{M.error("Löschen fehlgeschlagen.")}}function Ce(){p&&(p.remove(),p=null)}function zt(S,E,O,W){Ce();const P=document.createElement("div");return P.className="kmodal-ov",P.innerHTML=`<div class="kmodal" role="dialog" aria-modal="true">
      <div class="kmodal-h"><span>${g(S)}</span><button class="kmodal-x" aria-label="Schließen"><i class="bi bi-x-lg"></i></button></div>
      <div class="kmodal-b">${E}</div>
      <div class="kmodal-f"><button class="btn-cancel" data-k="cancel">Abbrechen</button><button class="btn-save" data-k="save">${g(O)}</button></div></div>`,e.appendChild(P),p=P,P.querySelector(".kmodal-x").addEventListener("click",Ce),P.querySelector('[data-k="cancel"]').addEventListener("click",Ce),P.addEventListener("mousedown",U=>{U.target===P&&Ce()}),P.querySelector('[data-k="save"]').addEventListener("click",()=>{W(P)!==!1&&Ce()}),P.querySelectorAll("[data-more]").forEach(U=>U.addEventListener("click",()=>{const F=P.querySelector("[data-more-box]");F&&(F.hidden=!1,U.style.display="none")})),setTimeout(()=>P.querySelector("input,select,textarea,.km-tile")?.focus?.(),30),P}function Ma(){const S=new Set;return`<datalist id="km-kultur-dl">${i.map(O=>O.kultur).filter(O=>O&&!S.has(O)&&S.add(O)).map(O=>`<option value="${g(O)}"></option>`).join("")}</datalist>`}function za(S,E,O,W){const P=O==="next"&&!E,U=E||{},F=E?.pflanzDatum?.slice(0,10)||(P?"":Dt()),pe=$t.map(H=>`<button type="button" class="km-sw${(U.color||"")===H?" on":""}" data-col="${H}" style="background:${H}"></button>`).join(""),le=`
      <label class="km-fld big">Was wächst hier?<input list="km-kultur-dl" data-f="kultur" value="${g(U.kultur||"")}" placeholder="z. B. Gurke" autocomplete="off" /></label>${Ma()}
      <label class="km-fld">${P?"Geplante Pflanzung":"Pflanzung / seit"}<input type="date" data-f="pflanz" value="${F}" /></label>
      <button type="button" class="km-more" data-more><i class="bi bi-sliders"></i> Mehr (Ernte, Status, Farbe, Notiz)</button>
      <div class="km-more-box" data-more-box hidden>
        <div class="km-frow2">
          <label class="km-fld">Status<select data-f="status">${["aktiv","geplant","abgeschlossen"].map(H=>`<option value="${H}"${(U.status||(P?"geplant":"aktiv"))===H?" selected":""}>${gd[H].label}</option>`).join("")}</select></label>
          <label class="km-fld">Erntedatum<input type="date" data-f="ernte" value="${(U.ernteDatum||"").slice(0,10)}" /></label>
        </div>
        <div class="km-fld">Farbe<div class="km-sws">${pe}</div></div>
        <label class="km-fld">Notiz<textarea data-f="notes" rows="2" placeholder="optional">${g(U.notes||"")}</textarea></label>
      </div>
      ${E?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Kultur löschen</button>':""}`,ce=zt(E?"Kultur bearbeiten":P?"Nächste Kultur planen":"Kultur eintragen",le,"Speichern",H=>{const Z=Bt=>H.querySelector(`[data-f="${Bt}"]`)?.value?.trim()||"",Q=Z("kultur");if(!Q)return M.warning("Bitte eine Kultur angeben."),!1;const ge=Z("pflanz")||null,be=!H.querySelector("[data-more-box]").hidden;let Pe=be?Z("status"):"";Pe||(Pe=P||ge&&ae(ge)>Number(Dt().replace(/-/g,""))?"geplant":"aktiv");const Ee=H.querySelector(".km-sw.on")?.dataset.col||U.color||$t[W%$t.length],Je=i.find(Bt=>Bt.kultur===Q)?.eppoCode||null;(async()=>{try{await $o({id:E?.id,flaecheTyp:S.typ,flaecheId:S.id,kultur:Q,eppoCode:Je,status:Pe,pflanzDatum:ge,ernteDatum:be?Z("ernte")||null:U.ernteDatum||null,color:Ee,notes:be?Z("notes")||null:U.notes||null}),await I(),C(),K()}catch{M.error("Speichern fehlgeschlagen.")}})()});ce.querySelectorAll(".km-sw").forEach(H=>H.addEventListener("click",()=>{ce.querySelectorAll(".km-sw").forEach(Z=>Z.classList.remove("on")),H.classList.add("on")})),ce.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(E?.id)try{await Do({id:E.id}),await I(),C(),K(),Ce()}catch{M.error("Löschen fehlgeschlagen.")}})}function Ba(S,E,O){const W=E||{art:"bewaesserung",status:"geplant"},P=wd.map(H=>`<button type="button" class="km-tile${(W.art||"bewaesserung")===H.art?" on":""}" data-art="${H.art}" style="--ac:${Sa[H.art].color}"><i class="bi ${H.icon}"></i><span>${g(H.label)}</span></button>`).join(""),U=(W.status||"geplant")==="erledigt",F=(U?W.erledigtDatum:W.planDatum)||Dt(),pe=`
      <div class="km-tasktiles">${P}</div>
      <div class="km-fld">Wann?<div class="km-when" data-when>
        <button type="button" class="km-chip" data-day="0">Heute</button>
        <button type="button" class="km-chip" data-day="1">Morgen</button>
        <button type="button" class="km-chip" data-day="x">Datum…</button>
        <input type="date" data-f="datum" value="${F.slice(0,10)}" />
      </div></div>
      <div class="km-seg" data-seg>
        <button type="button" class="km-segb${U?"":" on"}" data-status="geplant"><i class="bi bi-clock"></i> Geplant</button>
        <button type="button" class="km-segb${U?" on":""}" data-status="erledigt"><i class="bi bi-check-lg"></i> Erledigt</button>
      </div>
      <button type="button" class="km-more" data-more><i class="bi bi-sliders"></i> Notiz, Menge, Mittel</button>
      <div class="km-more-box" data-more-box hidden>
        <label class="km-fld">Bezeichnung<input data-f="notes" value="${g(W.notes||"")}" placeholder="z. B. Kompostgabe" /></label>
        <div class="km-frow2">
          <label class="km-fld">Menge<input type="number" step="0.1" data-f="menge" value="${W.menge!=null?W.menge:""}" placeholder="optional" /></label>
          <label class="km-fld">Einheit<input data-f="einheit" value="${g(W.einheit||"")}" placeholder="kg/ha, l" /></label>
        </div>
        <label class="km-fld">Mittel<input data-f="mittel" value="${g(W.mittel||"")}" placeholder="optional" /></label>
      </div>
      ${E?'<button type="button" class="km-dangerlink" data-f="del"><i class="bi bi-trash"></i> Aufgabe löschen</button>':""}`,le=zt(E?"Aufgabe bearbeiten":"Aufgabe hinzufügen",pe,"Speichern",H=>{const Z=H.querySelector(".km-tile.on")?.dataset.art||"bewaesserung",Q=H.querySelector(".km-segb.on")?.dataset.status||"geplant",ge=H.querySelector('[data-f="datum"]').value||Dt(),be=!H.querySelector("[data-more-box]").hidden,Pe=Ee=>{const Je=H.querySelector(`[data-f="${Ee}"]`)?.value;return Je?Number(Je):null},Ie=Ee=>H.querySelector(`[data-f="${Ee}"]`)?.value.trim()||null;(async()=>{try{await Vr({id:E?.id,flaecheTyp:S.typ,flaecheId:S.id,anbauId:E?.anbauId||O?.id||null,art:Z,status:Q,planDatum:Q==="geplant"?ge:E?.planDatum||null,erledigtDatum:Q==="erledigt"?ge:null,menge:be?Pe("menge"):E?.menge??null,einheit:be?Ie("einheit"):E?.einheit||null,mittel:be?Ie("mittel"):E?.mittel||null,historyId:E?.historyId||null,notes:be?Ie("notes"):E?.notes||null}),await I(),C(),K()}catch{M.error("Speichern fehlgeschlagen.")}})()});le.querySelectorAll(".km-tile").forEach(H=>H.addEventListener("click",()=>{le.querySelectorAll(".km-tile").forEach(Z=>Z.classList.remove("on")),H.classList.add("on")})),le.querySelectorAll(".km-segb").forEach(H=>H.addEventListener("click",()=>{le.querySelectorAll(".km-segb").forEach(Z=>Z.classList.remove("on")),H.classList.add("on")}));const ce=le.querySelector('[data-f="datum"]');le.querySelectorAll("[data-day]").forEach(H=>H.addEventListener("click",()=>{const Z=H.dataset.day;if(Z==="x"){ce.style.display="inline-block",ce.showPicker?.();return}const Q=new Date;Q.setDate(Q.getDate()+Number(Z)),ce.value=Q.toISOString().slice(0,10),ce.style.display="none"})),le.querySelector('[data-f="del"]')?.addEventListener("click",async()=>{if(E?.id)try{await Ur({id:E.id}),await I(),C(),K(),Ce()}catch{M.error("Löschen fehlgeschlagen.")}})}e.querySelectorAll(".km-modebtn").forEach(S=>S.addEventListener("click",()=>_(S.dataset.mode))),document.addEventListener("keydown",S=>{S.key==="Escape"&&p&&Ce()}),window.addEventListener("psm:openKultur",S=>{const E=S?.detail;!E?.typ||!E?.id||(s=E.typ+":"+E.id,_("flaechen"),c&&(oe(),We(),D()))}),t.state.subscribe(S=>{S?.app?.activeSection==="kultur"&&(c?(async()=>(a=await Fi(t),C(),D()))():(c=!0,Fe()))}),re()}function Sd(){return`
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
    @media(max-width:820px){.kultur-body{grid-template-columns:1fr}.kultur-list{max-height:200px}.km-frow2{grid-template-columns:1fr}.km-tasktiles{grid-template-columns:repeat(3,1fr)}}
  </style>
  <section class="calc-section kultur-wrap">
    <div class="kultur-top">
      <div class="kultur-modes">
        <button class="km-modebtn active" data-mode="flaechen"><i class="bi bi-grid-1x2"></i>Flächen</button>
        <button class="km-modebtn" data-mode="plan"><i class="bi bi-calendar3"></i>Anbauplan</button>
      </div>
      <div class="kultur-kpis" data-role="kpis"></div>
    </div>
    <div class="kultur-body" data-role="flaechen-view">
      <aside class="kultur-list" data-role="list"></aside>
      <div class="kultur-detail" data-role="detail"></div>
    </div>
    <div class="kultur-board" data-role="board-view" style="display:none"></div>
  </section>`}const Ed=["pflanzenschutz.json","history.json","entries.json"];let Ti=!1,B=null,st=!1;const Ct=25,Kn=new Intl.NumberFormat("de-DE");let de=0,ja=null,Hi=null;const Ld=ms({id:"import",label:"Import-Vorschau",budget:{initialLoad:20,maxItems:50}});let ur=null;function Dd(){const e=document.createElement("div");return e.className="section-inner",e.innerHTML=`
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
  `,e}function $d(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Ad(e,t){const a=e.querySelector('[data-role="import-log-list"]');if(a){if(!t.length){a.innerHTML='<tr><td colspan="5" class="text-muted small">Noch keine Importe protokolliert.</td></tr>';return}a.innerHTML=t.map(n=>{const r=n.rangeStart||n.rangeEnd?`${ga(n.rangeStart)||n.rangeStart||"?"} – ${ga(n.rangeEnd)||n.rangeEnd||"?"}`:"-",i=[n.source,n.device].filter(Boolean),s=i.length?g(i.join(" · ")):"-";return`
        <tr>
          <td>${g($d(n.importedAt))}</td>
          <td>${s}</td>
          <td class="text-end text-success">${n.added}</td>
          <td class="text-end text-muted">${n.skipped}</td>
          <td class="small text-muted">${g(r)}</td>
        </tr>`}).join("")}}async function en(e){if(ne()==="sqlite")try{const t=await Ao(50);Ad(e,t.items||[])}catch(t){console.warn("Import-Historie konnte nicht geladen werden",t)}}function ot(e,t,a="info"){const n=e.querySelector('[data-role="import-hint"]');if(n){if(!t){n.classList.add("d-none"),n.textContent="";return}n.className=`alert alert-${a} small mt-3`,n.textContent=t}}function At(e,t){const a=e.querySelector('[data-role="import-feedback"]');a&&(a.textContent=t)}function yt(e){const t=e.querySelector('[data-action="clear-import"]'),a=e.querySelector('[data-action="focus-import"]'),n=e.querySelector('[data-action="run-import"]'),r=!!B;if(t&&(t.disabled=!r||st),a&&(a.disabled=!r||st),n){const i=!!(B?.importableEntries?.length&&B.stats||B?.fotos?.length);n.disabled=!r||!i||st}}function Pd(e){B=null,Td(e);const t=e.querySelector('[data-role="import-summary-card"]'),a=e.querySelector('[data-role="import-file"]');t&&t.classList.add("d-none"),a&&(a.value=""),At(e,""),ot(e,"Bereit für eine neue Importdatei."),yt(e),Ht()}function zs(e){if(e.dateIso)return e.dateIso;if(e.datum){const t=new Date(e.datum);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.date){const t=new Date(e.date);if(!Number.isNaN(t.getTime()))return t.toISOString()}if(e.savedAt){const t=new Date(e.savedAt);if(!Number.isNaN(t.getTime()))return t.toISOString()}return null}function mn(e){return e?ga(e)||e.slice(0,10):"-"}function Bs(e){return e.savedAt||(e.savedAt=e.createdAt||e.dateIso||new Date().toISOString()),e}function _i(e,t){if(!e)return;const a=new Date(e);if(!Number.isNaN(a.getTime()))return t==="start"?a.setHours(0,0,0,0):a.setHours(23,59,59,999),a.toISOString()}function Id(e){if(!e||typeof e!="object")return null;const t={...e};if(!Array.isArray(t.items)){const a=e.items;t.items=Array.isArray(a)?[...a]:[]}return Bs(t),t}function Ns(e,t){const a=e.map(n=>zs(n)).filter(n=>!!n).sort();return{startIso:a[0]||t?.filters?.startDate||null,endIso:a[a.length-1]||t?.filters?.endDate||null}}function Cd(e){if(!e)return;const t=_i(e.startIso,"start"),a=_i(e.endIso,"end");if(!t&&!a)return;const n={};return t&&(n.startDate=t),a&&(n.endDate=a),n}async function Fs(e,t){if(ne()!=="sqlite"){const l=ze(e.history);return new Set(l.map(c=>fn(c)).filter(c=>!!c))}const n=Cd(t);if(!n)return new Set;const r=new Set;let i=1;const s=500;try{for(;;){const l=await as({page:i,pageSize:s,filters:n,sortDirection:"asc"});if(l.items.forEach(c=>{const u=fn(c);u&&r.add(u)}),i*s>=l.totalCount)break;i+=1}}catch(l){return console.warn("Konnte vorhandene Einträge für Duplikatprüfung nicht laden",l),new Set}return r}function fn(e){const t=typeof e.clientUuid=="string"&&e.clientUuid?e.clientUuid:"";if(t)return`uuid:${t}`;const a=e.savedAt||e.dateIso||e.createdAt||e.datum||"",n=e.ersteller||"",r=e.kultur||"",i=e.invekos||e.standort||"";return[a,n,r,i].join("|")}function Md(e,t,a,n){const r=n||Ns(e,a),i=r.startIso,s=r.endIso,l=new Set,c=new Set;return t.forEach(u=>{u.ersteller&&l.add(u.ersteller),u.kultur&&c.add(u.kultur)}),{startDateLabel:mn(i),endDateLabel:mn(s),startDateRaw:i,endDateRaw:s,entryCount:e.length,importableCount:t.length,duplicateCount:e.length-t.length,creators:Array.from(l).slice(0,5),crops:Array.from(c).slice(0,5)}}function zd(e,t){const a=e.querySelector('[data-role="import-stats"]');if(!a)return;if(!t){a.innerHTML="";return}const n=t.stats,r=t.metadata?.filters;a.innerHTML=`
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
  `}function qs(e){const t=e.entries.length;if(!t)return de=0,{start:0,end:0,total:0};const a=Math.max(Math.ceil(t/Ct),1);de>=a&&(de=a-1),de<0&&(de=0);const n=de*Ct,r=Math.min(n+Ct,t);return{start:n,end:r,total:t}}function Nd(e){const t=e.querySelector('[data-role="import-pager"]');return t?((!ja||Hi!==t)&&(ja?.destroy(),ja=Da(t,{onPrev:()=>Fd(e),onNext:()=>qd(e),labels:{prev:"Zurück",next:"Weiter",loading:"Vorschau wird geladen...",empty:"Keine Einträge verfügbar"}}),Hi=t),ja):null}function fa(e,t){const a=Nd(e);if(!a)return;if(!t){de=0,a.update({status:"hidden"});return}const n=t.entries.length;if(!n){de=0,a.update({status:"disabled",info:"Keine Einträge vorhanden."});return}const{start:r,end:i}=qs(t),s=`Einträge ${Kn.format(r+1)}–${Kn.format(i)} von ${Kn.format(n)}`;a.update({status:"ready",info:s,canPrev:de>0,canNext:i<n})}function Fd(e){!B||de===0||(de=Math.max(de-1,0),Mr(e,B))}function qd(e){if(!B)return;const t=B.entries.length;if(!t)return;const a=Math.max(Math.ceil(t/Ct)-1,0);de>=a||(de=Math.min(de+1,a),Mr(e,B))}function Td(e){de=0,e&&fa(e,B)}function Mr(e,t){const a=e.querySelector('[data-role="import-preview-table"]');if(!a){Ht();return}if(!t){a.innerHTML="",fa(e,null),Ht();return}if(!t.entries.length){a.innerHTML='<tr><td colspan="5" class="text-center text-muted">Keine Einträge</td></tr>',fa(e,t),Ht();return}const{start:r,end:i}=qs(t),l=t.entries.slice(r,i).map(c=>{const u=mn(zs(c));return`
        <tr>
          <td>${g(u)}</td>
          <td>${g(c.kultur||"-")}</td>
          <td>${g(c.ersteller||"-")}</td>
          <td>${g(c.standort||c.invekos||"-")}</td>
          <td>${g(c.savedAt?mn(c.savedAt):"-")}</td>
        </tr>
      `}).join("");a.innerHTML=l,fa(e,t),Ht()}async function Hd(e){const t=Co(e),a=Object.keys(t),n=a.find(u=>Ed.some(d=>u.toLowerCase().endsWith(d)));if(!n)throw new Error("ZIP enthält keine 'pflanzenschutz.json'.");const r=JSON.parse(Rn(t[n])),i=a.find(u=>u.toLowerCase().endsWith("metadata.json")),s=i?JSON.parse(Rn(t[i])):null,l=Array.isArray(r)?r:Array.isArray(r.entries)?r.entries:Array.isArray(r.history)?r.history:[],c=Array.isArray(r?.fotos)?r.fotos:[];for(const u of c){if(u?.data)continue;const d=u?.file?String(u.file):null,p=d?a.find(m=>m===d||m.toLowerCase().endsWith(d.toLowerCase())):null;p&&t[p]&&(u.data=_d(t[p]),u.mime||(u.mime="image/jpeg"))}return{entries:l,metadata:s,fotos:c}}function _d(e){let t="";for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode(...e.subarray(n,n+32768));return btoa(t)}async function Od(e){const t=Rn(e),a=JSON.parse(t);if(Array.isArray(a))return{entries:a,metadata:null,fotos:[]};const n=Array.isArray(a.fotos)?a.fotos:[];if(Array.isArray(a.entries))return{entries:a.entries,metadata:a.metadata||null,fotos:n};if(Array.isArray(a.history))return{entries:a.history,metadata:a.metadata||null,fotos:n};if(n.length)return{entries:[],metadata:a.metadata||null,fotos:n};throw new Error("JSON enthält keine Eintragsliste.")}async function Kd(e,t){const a=new Uint8Array(await e.arrayBuffer()),n=/\.zip$/i.test(e.name)||e.type==="application/zip",{entries:r,metadata:i,fotos:s}=n?await Hd(a):await Od(a),l=Array.isArray(s)?s:[],c=(Array.isArray(r)?r:[]).map(v=>Id(v)).filter(v=>!!v);if(!c.length&&!l.length)throw new Error("Die Datei enthielt keine verwertbaren Einträge.");const u=Ns(c,i),d=await Fs(t,u),p=new Set,m=[];let y=0;c.forEach(v=>{const $=fn(v);if(!$){m.push(v);return}if(d.has($)||p.has($)){y+=1;return}p.add($),m.push(v)});const f=Md(c,m,i,u),x=[];return y&&x.push(`${y} Datensätze wurden wegen gleicher Kennung übersprungen.`),(!f.startDateRaw||!f.endDateRaw)&&x.push("Zeitraum konnte nicht eindeutig ermittelt werden."),{filename:e.name,entries:c,importableEntries:m,metadata:i,stats:f,warnings:x,lastImportRefs:[],fotos:l}}function Oi(){if(!B)return"Keine Datei";const e=[];return st&&e.push("Verarbeitung"),B.warnings.length&&e.push("Warnungen"),B.stats.importableCount<B.stats.entryCount&&e.push("Duplikate entfernt"),e.length?e.join(" · "):void 0}function Rd(){const e=!!B,t=e?Math.max(Math.ceil((B?.entries.length||0)/Ct),1):null,a=e?{items:B?.entries.length??0,totalCount:B?.stats.entryCount??null,cursor:B&&(B.entries.length||0)>Ct?`Seite ${de+1}${t?` / ${t}`:""}`:null,payloadKb:gs(B?.entries.slice(0,Ct)),lastUpdated:ur,note:Oi()}:{items:0,totalCount:0,cursor:null,payloadKb:0,lastUpdated:ur,note:Oi()};fs(Ld,a)}function Ht(){ur=new Date().toISOString(),Rd()}function pr(e){const t=e.querySelector('[data-role="import-summary-card"]');if(!t)return;if(!B){t.classList.add("d-none"),fa(e,null),yt(e),Ht();return}t.classList.remove("d-none"),de=0;const a=t.querySelector('[data-role="import-file-name"]'),n=t.querySelector('[data-role="import-summary-subline"]');a&&(a.textContent=B.filename),n&&(n.textContent=`${B.stats.importableCount} von ${B.stats.entryCount} Einträgen importierbar`),zd(e,B),Bd(e,B),Mr(e,B),yt(e)}async function Wd(){const e=ne();if(!e||e==="memory"||e==="sqlite")return;const t=Te();await He(t)}function Ki(e,t){if(!t.length)return[];const a=typeof e.state.updateSlice=="function"?e.state.updateSlice:Ke,n=[];return a("history",r=>{const i=Ea(r),s=i.items.slice(),l=s.length;return t.forEach((c,u)=>{n.push(l+u),s.push(c)}),{...i,items:s,totalCount:s.length,lastUpdatedAt:new Date().toISOString()}}),n}async function jd(e,t){if(!B){window.alert("Bitte zuerst eine Importdatei laden.");return}const a=B.fotos||[];if(!B.importableEntries.length&&!a.length){window.alert("Alle Einträge wurden bereits importiert oder als Duplikat erkannt.");return}st=!0,yt(e),At(e,"Import läuft ...");const n=t.state.getState(),r={startIso:B.stats.startDateRaw,endIso:B.stats.endDateRaw};let i=new Set;try{i=await Fs(n,r)}catch(x){console.warn("Duplikatprüfung vor Import fehlgeschlagen",x)}const s=new Set(i),l=[];let c=0;if(B.importableEntries.forEach(x=>{const v=fn(x);if(v&&s.has(v)){c+=1;return}v&&s.add(v),l.push(x)}),!l.length&&!a.length){At(e,"Keine neuen Einträge gefunden."),ot(e,"Alle Datensätze sind bereits importiert worden.","warning"),st=!1,yt(e);return}const u=ne(),d=[],p=[];let m=0,y=0;const f=l.map(x=>Bs({...x}));try{if(u==="sqlite"){const A=[];for(const K of f)try{const G=await ji(K);if(G?.duplicate){c+=1;continue}G?.id!=null&&(d.push({source:"sqlite",ref:G.id}),A.push(K))}catch(G){console.error("appendHistoryEntry failed",G),p.push(K.savedAt||"Unbekannter Eintrag")}Ki(t,A);for(const K of a)try{(await Po(K))?.duplicate?y+=1:m+=1}catch(G){console.error("appendFoto failed",G)}m&&window.dispatchEvent(new CustomEvent("fotos:changed"));try{await Oe()}catch(K){console.warn("SQLite-Datei konnte nach dem Import nicht gespeichert werden",K)}}else Ki(t,f).forEach(K=>{d.push({source:"state",ref:K})}),await Wd();const x=d.length;if(x||m){u==="sqlite"&&x&&t.events?.emit?.("history:data-changed",{type:"created-bulk",count:x});const A=[];x&&A.push(`${x} Einträge`),m&&A.push(`${m} Foto(s)`),At(e,`${A.join(" und ")} importiert.${p.length?` ${p.length} Einträge konnten nicht übernommen werden.`:""}`.trim()),B.lastImportRefs=d,B.importableEntries=[],B.stats={...B.stats,importableCount:0},pr(e)}else At(e,"Keine neuen Daten importiert.");const v=[];let $="success";if(p.length&&(v.push(`${p.length} Einträge konnten nicht gespeichert werden. Details siehe Konsole.`),$="warning"),c&&(v.push(`${c} Einträge wurden während des Imports als Duplikat übersprungen.`),$="warning"),y&&v.push(`${y} Foto(s) waren bereits vorhanden (übersprungen).`),v.length||v.push("Import abgeschlossen."),ot(e,v.join(" "),$),u==="sqlite"&&(x||c||m||y))try{const A=[];p.length&&A.push(`${p.length} fehlgeschlagen`),m&&A.push(`${m} Fotos`),y&&A.push(`${y} Fotos doppelt`),await Io({source:B.filename||null,device:B.metadata?.device||B.metadata?.label||null,added:x,skipped:c,rangeStart:B.stats.startDateRaw,rangeEnd:B.stats.endDateRaw,note:A.length?A.join(", "):null}),await Oe().catch(()=>{}),await en(e)}catch(A){console.warn("Import-Historie konnte nicht geschrieben werden",A)}}catch(x){console.error("Import fehlgeschlagen",x),At(e,"Import fehlgeschlagen. Siehe Konsole für Details."),ot(e,"Import fehlgeschlagen. Bitte erneut versuchen.","danger")}finally{st=!1,yt(e)}}function Gd(e,t,a){if(!e.events?.emit)return;const n=t.metadata?.label||t.metadata?.filters?.label||`Import ${t.filename}`;e.events.emit("documentation:focus-range",{startDate:t.stats.startDateRaw||void 0,endDate:t.stats.endDateRaw||void 0,label:n,reason:"import",entryIds:a,autoSelectFirst:!!a.length})}function Ud(e,t){if(!B){window.alert("Bitte zuerst eine Importdatei laden.");return}if(!B.stats.startDateRaw||!B.stats.endDateRaw){window.alert("Zeitraum konnte nicht bestimmt werden.");return}Gd(t,B,B.lastImportRefs),ot(e,"Dokumentation wurde auf den Importzeitraum fokussiert.")}function Vd(e,t){const a=e.querySelector('[data-role="import-file"]');a&&a.addEventListener("change",()=>{const n=a.files?.[0];n&&(st=!0,ot(e,"Datei wird analysiert ..."),yt(e),At(e,""),Kd(n,t.state.getState()).then(r=>{B=r,pr(e),ot(e,`${r.importableEntries.length} Einträge bereit zum Import.`)}).catch(r=>{console.error("Importdatei konnte nicht gelesen werden",r),ot(e,r?.message||"Importdatei konnte nicht gelesen werden.","danger"),B=null,pr(e)}).finally(()=>{st=!1,yt(e)}))}),e.addEventListener("click",n=>{const r=n.target?.closest("[data-action]");if(!r)return;const i=r.dataset.action;if(i){if(i==="clear-import"){Pd(e);return}if(i==="focus-import"){Ud(e,t);return}i==="run-import"&&jd(e,t)}})}function Zd(e,t){if(!e||Ti)return;const a=e;a.innerHTML="";const n=Dd();a.appendChild(n),Vd(n,t),ot(n,"Wähle eine Datei aus, um den Import zu starten."),en(n),Ve("database:connected",()=>void en(n)),Ve("app:sectionChanged",r=>{(r==="daten"||r==="documentation"||r==="import")&&en(n)}),Ti=!0}const Lt=(e,t=0)=>Number.isFinite(e)?e.toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}):"–";function Qd(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("de-DE")}function Ft(e,t,a,n){return`
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
  </section>`}function Yd(e,t){if(!(e instanceof HTMLElement))return;e.innerHTML=Jd();const a=e.querySelector('[data-role="dash-cards"]'),n=e.querySelector('[data-role="dash-warn"]'),r=e.querySelector('[data-role="dash-recent"]');e.addEventListener("click",s=>{const l=s.target?.closest("[data-goto]");if(!l)return;const c=l.getAttribute("data-goto");c&&t.state.updateSlice("app",u=>({...u,activeSection:c}))});const i=async()=>{if(ne()!=="sqlite"){a&&(a.innerHTML='<div class="dash-empty">Bitte zuerst eine Datenbank öffnen.</div>');return}const s=t.state.getState(),l=(ze(s.gps?.points)||[]).length;let c=0,u=0,d=0,p=0,m=[],y=[],f=0;try{c=(await mr())?.rows?.length||0}catch{}try{u=(await ts())?.rows?.length||0}catch{}try{const x=(await fr())?.rows||[];d=x.length,p=x.reduce((v,$)=>v+($.plants||0),0)}catch{}try{m=(await es())?.rows||[]}catch{}try{const x=await as({}),v=x?.entries||x?.rows||[];f=x?.totalCount??v.length,y=v.slice(0,6)}catch{}if(a&&(a.innerHTML=[Ft("bi-geo-alt","Standorte",Lt(l)),Ft("bi-flower1","Kulturen",Lt(c)),Ft("bi-droplet","Mittel im Sortiment",Lt(u),"lager"),Ft("bi-journal-check","Anwendungen",Lt(f),"documentation"),Ft("bi-map","Acker-Flächen",Lt(d),"acker"),Ft("bi-flower3","Pflanzen (Acker)",Lt(p),"acker")].join("")),n){const x=[];m.forEach(v=>{v.bestand<=0&&(v.verbraucht>0||v.zugang>0)&&x.push(`<div class="dash-row"><span><i class="bi bi-box-seam me-1" style="color:#ef4444"></i>${g(v.name)}</span><span style="color:#ef4444">Bestand ${Lt(v.bestand)} ${g(v.einheit||"")}</span></div>`)}),m.forEach(v=>{if(!v.zulEnde)return;const $=Math.round((new Date(v.zulEnde).getTime()-Date.now())/864e5);$<0?x.push(`<div class="dash-row"><span><i class="bi bi-calendar-x me-1" style="color:#ef4444"></i>${g(v.name)}</span><span style="color:#ef4444">Zulassung abgelaufen</span></div>`):$<180&&x.push(`<div class="dash-row"><span><i class="bi bi-calendar-event me-1" style="color:#f59e0b"></i>${g(v.name)}</span><span style="color:#f59e0b">Zulassung endet in ${$} T</span></div>`)}),n.innerHTML=x.length?x.slice(0,8).join(""):'<div class="dash-empty">Alles im grünen Bereich. ✓</div>'}r&&(r.innerHTML=y.length?y.map(x=>{const v=Qd(x.datum||x.dateIso||x.created_at||x.createdAt||null),$=x.kultur||"",A=x.standort||"";return`<div class="dash-row"><span>${g(A)}${$?" · "+g($):""}</span><span class="dash-empty" style="padding:0">${g(v)}</span></div>`}).join(""):'<div class="dash-empty">Noch keine Anwendungen erfasst.</div>')};t.state.subscribe(s=>{s?.app?.activeSection==="dashboard"&&i()}),i()}function Ri(e){document.querySelectorAll(".content-section").forEach(a=>{a.style.display="none"});const t=document.getElementById(`section-${e}`);t instanceof HTMLElement&&(t.style.display="block")}function Wi(){Mo(),Ui();const e={state:{getState:T,updateSlice:Ke,subscribe:an},events:{emit:(v,$)=>{gt(async()=>{const{emit:A}=await import("./index.BOF67kan.js").then(K=>K.aS);return{emit:A}},[]).then(({emit:A})=>{A(v,$)})},subscribe:Ve}},t=document.querySelector('[data-region="startup"]'),a=document.querySelector('[data-region="shell"]'),n=document.querySelector('[data-region="main"]'),r=document.querySelector('[data-region="footer"]');cl(t,e);const i=document.querySelector('[data-feature="calculation"]');zo(i,e);const s=document.querySelector('[data-feature="documentation"]');ic(s,e);const l=document.querySelector('[data-feature="settings"]');Jc(l,e);const c=document.querySelector('[data-feature="lager"]');ed(c,e);const u=document.querySelector('[data-feature="acker"]');ad(u,e);const d=document.querySelector('[data-feature="kultur"]');xd(d,e);const p=document.querySelector('[data-feature="fotos"]');Bo(p,e,{archiveMode:!0});const m=document.querySelector('[data-feature="import-page"]');Zd(m,{state:{getState:T,updateSlice:Ke},events:e.events});const y=document.querySelector('[data-feature="dashboard"]');Yd(y,e);const f=v=>{const $=document.body;$&&($.classList.toggle("bg-app",v),$.classList.toggle("bg-startup",!v))},x=v=>{const $=!!v.app?.hasDatabase;if(f($),t instanceof HTMLElement&&t.classList.toggle("d-none",$),a instanceof HTMLElement&&a.classList.toggle("d-none",!$),n instanceof HTMLElement&&n.classList.toggle("d-none",!$),r instanceof HTMLElement&&r.classList.toggle("d-none",!$),$){const A=v.app?.activeSection??"dashboard";Ri(A)}};x(e.state.getState()),an((v,$)=>{v.app?.hasDatabase!==$.app?.hasDatabase&&x(v),v.app?.activeSection!==$.app?.activeSection&&v.app?.hasDatabase&&Ri(v.app.activeSection)}),Ve("app:sectionChanged",()=>{})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Wi,{once:!0}):Wi();
