import{a2 as e,a4 as t,a5 as n,a6 as o,a7 as r,K as s,a8 as a,a9 as i,M as d,aa as l,$ as c,ab as u,t as h,D as $,f as g,T as p,ac as f}from"./lib.bcb6d235.m.js";import{R as b,P as m,C as x,i as y,H as v,I as k,D as _,a as C,T as w,A as S,F as z,b as F,c as W,N as D,p as H,B as L,d as N,e as E,f as T,g as B,S as R,h as V}from"./wesib.68535cce.m.js";const A=new e("https://wesib.github.io/examples","bex","wesib-examples"),I=t.by({$:"settings"},{$color:new n({r:161,g:185,b:142}),$bgColor:new n({r:40,g:43,b:36}),$fontFace:"'Exo 2', sans-serif",$fontSize:o.of(1,"em"),$lineHeight:1.2,$fontWeight:"400",$linkFontWeight:"600",$layoutBreakpoint:r.of(576,"px")});function O({$layoutBreakpoint:e}){return{"@media:sm":`(max-width: ${e})`}}function j(e){const t=e.ref(I).read.keep,{root:{rules:n}}=e;return s(n.add({e:"a"},t.thru(M)),n.add({e:"a",s:":visited"},t.thru(M)),n.add({e:"a",s:":hover"},{textDecoration:"underline"}),n.add({e:"a",s:":active"},{textDecoration:"underline dotted"}),n.add({e:"a",s:":focus"},{textDecoration:"underline dotted"}))}function M({$color:e,$linkFontWeight:t}){return{color:e,fontWeight:t,textDecoration:"none"}}function K(e){const t=e.ref(I).read.keep;return s(e.root.add(t.thru(P)).add(t.thru(O)),e.style(j))}function P({$color:e,$fontFace:t,$fontSize:n,$lineHeight:o,$fontWeight:r}){return{color:e,font:`normal ${r} ${n}/${o} ${t}`}}function U(e){const t=e.ref(I).read.keep,{root:{rules:n}}=e;return s(n.add({e:"html"},{height:"100%",margin:0,padding:0}),n.add({e:"body"},t.thru(q)),e.style(K))}function q({$bgColor:e}){return{backgroundColor:e,height:"100%",margin:0,padding:0}}const G=t.by({$:"settings:form"},e=>a.by({global:I},e).read.keep.thru(J));function J({global:{$color:e,$bgColor:t,$fontFace:n,$fontSize:o,$lineHeight:s,$fontWeight:a}}){return{$color:e,$bgColor:t.hsl.set(({l:e})=>({l:.8*e})),$roBgColor:t.hsl.set(({l:e})=>({l:.94*e})),$fontFace:n,$fontSize:o,$errorFontSize:o.mul(.8),$lineHeight:s,$fontWeight:a,$borderColor:t,$marginV:o.div(4),$marginH:o.div(4),$paddingV:o.div(2),$paddingH:o,$borderW:r.of(1,"px")}}let Q=class{constructor(e){this._context=e,this._validity=d(),this._codes=new Set,y(e)(e=>this.validity=e),this._context.get(v).get(k).consume(({control:t})=>t&&t.aspect(l).applyTo(e.element,e.get(_)()))}get validity(){return this._validity}set validity(e){const t=this._validity;this._validity=e,this._context.updateState("validity",e,t)}setCode(e){this._codes=new Set(e?e.trim().split(/\s+/):[])}render(){const e=this._context.element,{classList:t}=e,n=c.name(X,this._context.get(C));return()=>{u(this._codes,e=>this.validity.has(e))?t.add(n):t.remove(n)}}style(){return this._context.get(w).style(Y)}};i([S("code")],Q.prototype,"setCode",null),i([b()],Q.prototype,"render",null),i([m()],Q.prototype,"style",null),Q=i([x(["in-error",A])],Q);const X=["has-error",A];function Y(e){const t=e.ref(G).read.keep,{root:{rules:n}}=e,r=o.of(4,"px");return s(n.add({u:[":","host"],$:"bex:in-error"},t.thru(({$color:e,$errorFontSize:t})=>({display:"none",fontSize:t,padding:t.div(2),borderLeft:`${r} dotted ${e}`,paddingLeft:t.sub(r)}))),n.add({u:[":","host",{c:X,u:[":","not",{c:"inap-has-focus"}]}],$:"bex:in-error"},{display:"block"}),n.add({u:[":","host",{c:X,u:[[":","not",{u:["code","~=","missing"]}],[":","not",{u:["code","~=","incomplete"]}]]}],$:"bex:in-error"},{display:"block"}))}let Z=class{};Z=i([z({needs:[F,Q,W]})],Z);let ee=class{constructor(e){this._context=e,this._response=h(),this._response.on((t,n)=>e.updateState("response",t,n));const t=e.get(D);e.whenOn(n=>{t.read.once(t=>{t.put(H,{fragment:{tag:e.element.tagName},receiver:{supply:n,receive:(e,t)=>this._response.it=t}})})})}render(){const e=this._context.get(L).document,t=e.createRange();return t.selectNodeContents(this._context.element),()=>{const n=this._response.it;if(n)if(t.deleteContents(),n.ok){const o=e.createDocumentFragment(),{fragment:r}=n;r&&(N(r,o),t.insertNode(o))}else null==n.ok?t.insertNode(e.createTextNode("Loading...")):t.insertNode(e.createTextNode(`Error. ${n.error}`))}}};function te({$fontSize:e}){return{flex:"1 1 auto",padding:0,margin:`0 0 0 ${e.div(2)}`}}i([b()],ee.prototype,"render",null),ee=i([x(["main",A])],ee);let ne=class{constructor(e){this._theme=e.get(w);const t=e.get(C),n=c.name(ae,t),o=e.get(E),r=e.get(D);e.whenOn(e=>{const t=o.select("a",{all:!0}),s=new Map;t.track.tillOff(e)((t,o)=>{o.forEach(e=>{const t=s.get(e);t&&(s.delete(e),t.off())}),t.forEach(t=>{const o=t.element,a=new $(o).on("click").instead(()=>{o.classList.contains(n)||r.open(o.getAttribute("href")||"")}).needs(e);s.set(t,a)})}),g({links:t,page:r})({supply:e,receive(e,{links:[t],page:[o]}){const r=oe(o.url);let s,a="";t.forEach(e=>{const t=e.element,o=oe(new URL(t.href));t.classList.remove(n),r.startsWith(o)&&a.length<o.length&&(s=t,a=o)}),s&&s.classList.add(n)}})})}style(){return this._theme.style(re)}};function oe(e){const t=e.pathname;return t.endsWith("/")?t:t+"/"}i([m()],ne.prototype,"style",null),ne=i([x(["nav",A])],ne);function re(e){const t=e.ref(I).read.keep,{root:{rules:n}}=e;return s(n.add({u:[":","host"],$:"bex:nav"},t.thru(se)),n.add({u:[":","host"],$:"bex:nav"},t.thru(e=>({flex:"0 1 200px",height:"100%",background:ie(e)}))),n.add({u:[":","host"],$:["bex:nav","@media:sm"]},{flex:"0 1 100%"}),n.add([{u:[":","host"],$:"bex:nav"},{e:"a",$:"bex:nav"}],t.thru(de)),n.add([{u:[":","host"],$:"bex:nav"},{e:"a",c:ae,$:"bex:nav"}],t.thru(le)))}function se({$fontSize:e}){return{padding:0,margin:`0 ${e.div(2)} 0 0`}}const ae=["nav-active",A];function ie({$bgColor:e}){return e.hsl.set(({l:e})=>({l:.8*e}))}function de(e){const{$fontSize:t}=e;return{display:"block",margin:0,padding:`${t.div(2)} ${t}`,border:0,outline:0,background:ie(e)}}function le({$fontSize:e,$color:t,$bgColor:n}){const r=o.of(4,"px");return{background:n,borderLeft:`${r} solid ${t}`,paddingLeft:e.sub(r)}}let ce=class{constructor(e){this._context=e}async style(){const{elementDef:{name:e}}=await this._context.get(T).whenDefined(ee);return this._context.get(w).style(function(e){return t=>{const n=t.ref(I).read.keep,{root:{rules:o}}=t;return s(o.add({u:[":","host"],$:"bex:container"},{height:"100%",display:"flex",flexFlow:"row wrap",alignItems:"stretch",alignContent:"flex-start"}).add(n.thru(O)),o.add({u:[":","host"],$:["bex:container","@media:sm"]},{height:"auto"}),o.add([{u:[":","host"],$:"bex:container"},{e,$:"bex:container"}],n.thru(te)))}}(e))}};i([m()],ce.prototype,"style",null),ce=i([x({name:["container",A],feature:{needs:[ee,ne]}})],ce);let ue=class{};ue=i([z({needs:[ce,F,B,R,W]})],ue);let he=class{};he=i([z({needs:W,init:function(e){e.whenReady(()=>{p(e.get(w).style(U))})}})],he);let $e=class{};function ge(e){const t=e.ref(G).read.keep,{root:{rules:n}}=e;return s(n.add({e:"input"},t.thru(pe)),n.add({e:"input",s:"[readonly]"},t.thru(fe)),n.add({e:"input",s:"[disabled]"},t.thru(fe)),n.add({e:"input",s:":focus"},t.thru(be)),n.add({e:"input",c:["inap-invalid","inap-touched"]},t.thru(me)),n.add({e:"input",c:["inap-missing","inap-touched"]},{outlineStyle:"dotted"}),n.add({e:"input",c:["inap-incomplete","inap-touched"]},{outlineStyle:"dotted"}))}function pe({$color:e,$fontFace:t,$fontSize:n,$lineHeight:o,$fontWeight:r,$marginV:s,$marginH:a,$paddingV:i,$paddingH:d,$bgColor:l,$borderColor:c,$borderW:u}){return{color:e,font:`normal ${r} ${n}/${o} ${t}`,padding:`${i} ${d}`,margin:`${s} ${a}`,backgroundColor:l,border:"0 none",outline:`${u} solid ${c}`,boxShadow:"inset 1px 1px 2px -2px black",boxSizing:"border-box",width:"100%"}}function fe({$roBgColor:e}){return{backgroundColor:e}}function be({$color:e,$borderColor:t}){return{outlineColor:f(t,e,.5)}}function me({$color:e,$borderW:t,$borderColor:n}){return{outline:`${t.mul(2)} dashed ${f(n,e,.25)}`}}$e=i([z({needs:[he,Z,ue]})],$e);const xe=V($e);export{$e as A,K as D,A as E,G as F,ge as I,I as T,xe as e,pe as i,fe as r};
//# sourceMappingURL=common.d5ed8f71.m.js.map
