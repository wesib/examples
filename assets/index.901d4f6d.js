import{N as e,R as t,S as o,a as n,b as r,s as a,m as s,c as d,_ as i,d as l,A as c,P as u,C as $,t as f,e as h,f as g,T as p,I as b,F as x,g as m,h as y,i as v,j as w,k,l as C,n as S,o as z,p as _,q as F,r as W,u as D,v as H,W as L,w as T,B,x as E,y as j,z as A,D as N,E as P,G as R,H as q}from"./vendor.d0de1fdb.js";const I=new e("https://wesib.github.io/examples","bex","wesib-examples"),V=t.by({$:"settings"},{$color:new o({r:161,g:185,b:142}),$bgColor:new o({r:40,g:43,b:36}),$fontFace:"'Exo 2', sans-serif",$fontSize:n.of(1,"em"),$lineHeight:1.2,$fontWeight:"400",$linkFontWeight:"600",$layoutBreakpoint:r.of(576,"px")});function G({$layoutBreakpoint:e}){return{"@media:sm":`(max-width: ${e})`}}function J(e){const t=e.ref(V).read,{root:{rules:o}}=e;return a(o.add({e:"a"},t.do(s(K))),o.add({e:"a",s:":visited"},t.do(s(K))),o.add({e:"a",s:":hover"},{textDecoration:"underline"}),o.add({e:"a",s:":active"},{textDecoration:"underline dotted"}),o.add({e:"a",s:":focus"},{textDecoration:"underline dotted"}))}function K({$color:e,$linkFontWeight:t}){return{color:e,fontWeight:t,textDecoration:"none"}}function M(e){const t=e.ref(V).read;return a(e.root.add(t.do(s(O))).add(t.do(s(G))),e.style(J))}function O({$color:e,$fontFace:t,$fontSize:o,$lineHeight:n,$fontWeight:r}){return{color:e,font:`normal ${r} ${o}/${n} ${t}`}}function Q(e){const t=e.ref(V).read,{root:{rules:o}}=e;return a(o.add({e:"html"},{height:"100%",margin:0,padding:0}),o.add({e:"body"},t.do(s(U))),e.style(M))}function U({$bgColor:e}){return{backgroundColor:e,height:"100%",margin:0,padding:0}}const X=t.by({$:"settings:form"},(e=>d.by({global:V},e).read.do(s(Y))));function Y({global:{$color:e,$bgColor:t,$fontFace:o,$fontSize:n,$lineHeight:a,$fontWeight:s}}){return{$color:e,$bgColor:t.hsl.set((({l:e})=>({l:.8*e}))),$roBgColor:t.hsl.set((({l:e})=>({l:.94*e}))),$fontFace:o,$fontSize:n,$errorFontSize:n.mul(.8),$lineHeight:a,$fontWeight:s,$borderColor:t,$marginV:n.div(4),$marginH:n.div(4),$paddingV:n.div(2),$paddingH:n,$borderW:r.of(1,"px")}}let Z=class{constructor(e){this._context=e,this._code=f();const t=this._code.read.do(h(((e,t)=>t?e(...t.trim().split(/\s+/)):e())));this.indicator=g((o=>t.do(m(((...t)=>({control:o.adjusted.control.convert(y.to(e.element)).setup(v,(e=>e.add(w()))).setup(v,(e=>e.add(k({when:t}))))}))))))}get code(){return this._code.it}set code(e){this._code.it=e}style(){return this._context.get(p).style(te)}};i([l({share:{share:class extends x{constructor(){super("field-error")}},local:!0},name:""})],Z.prototype,"indicator",void 0),i([c({updateState:!1})],Z.prototype,"code",null),i([u()],Z.prototype,"style",null),Z=i([$(["field-error",I])],Z);const ee=["has-error",b];function te(e){const t=e.ref(X).read,{root:{rules:o}}=e,r=n.of(4,"px");return a(o.add({u:[":","host"],$:"bex:in-error"},t.do(s((({$color:e,$errorFontSize:t})=>({display:"none",fontSize:t,padding:t.div(2),borderLeft:`${r} dotted ${e}`,paddingLeft:t.sub(r)}))))),o.add({u:[":","host",{c:[ee,["touched",b]],u:[":","not",{c:["has-focus",b]}]}],$:"bex:in-error"},{display:"block"}),o.add({u:[":","host",{c:ee,u:[[":","not",{u:["code","~=","missing"]}],[":","not",{u:["code","~=","incomplete"]}]]}],$:"bex:in-error"},{display:"block"}))}let oe=class{};oe=i([C({needs:[S,z,Z]})],oe);let ne=class{renderPage({content:e,response:t}){if(!t.ok){const o=F(e);null==t.ok?e.appendChild(o.createTextNode("Loading...")):e.appendChild(o.createTextNode(`Error. ${t.error}`))}}};function re({$fontSize:e}){return{flex:"1 1 auto",padding:0,margin:`0 0 0 ${e.div(2)}`}}i([_({target:({contentRoot:e})=>W(e)})],ne.prototype,"renderPage",null),ne=i([$(["main",I])],ne);let ae=class{constructor(e){this._theme=e.get(p),new D((({element:e})=>H(e.querySelectorAll("a"),(e=>T(e))))).bindTo(e)}style(){return this._theme.style(se)}};i([u()],ae.prototype,"style",null),ae=i([$(["nav",I])],ae);function se(e){const t=e.ref(V).read,{root:{rules:o}}=e;return a(o.add({u:[":","host"],$:"bex:nav"},t.do(s(de))),o.add({u:[":","host"],$:"bex:nav"},t.do(s((e=>({flex:"0 1 200px",height:"100%",background:ie(e)}))))),o.add({u:[":","host"],$:["bex:nav","@media:sm"]},{flex:"0 1 100%"}),o.add([{u:[":","host"],$:"bex:nav"},{e:"a",$:"bex:nav"}],t.do(s(le))),o.add([{u:[":","host"],$:"bex:nav"},{e:"a",c:["active",L],$:"bex:nav"}],t.do(s(ce))))}function de({$fontSize:e}){return{padding:0,margin:`0 ${e.div(2)} 0 0`}}function ie({$bgColor:e}){return e.hsl.set((({l:e})=>({l:.8*e})))}function le(e){const{$fontSize:t}=e;return{display:"block",margin:0,padding:`${t.div(2)} ${t}`,border:0,outline:0,background:ie(e)}}function ce({$fontSize:e,$color:t,$bgColor:o}){const r=n.of(4,"px");return{background:o,borderLeft:`${r} solid ${t}`,paddingLeft:e.sub(r)}}let ue=class{constructor(e){this._context=e}async style(){const{elementDef:{name:e}}=await this._context.get(B).whenDefined(ne);return this._context.get(p).style(function(e){return t=>{const o=t.ref(V).read,{root:{rules:n}}=t;return a(n.add({u:[":","host"],$:"bex:container"},{height:"100%",display:"flex",flexFlow:"row wrap",alignItems:"stretch",alignContent:"flex-start"}).add(o.do(s(G))),n.add({u:[":","host"],$:["bex:container","@media:sm"]},{height:"auto"}),n.add([{u:[":","host"],$:"bex:container"},{e,$:"bex:container"}],o.do(s(re))))}}(e))}};i([u()],ue.prototype,"style",null),ue=i([$({name:["container",I],feature:{needs:[ne,ae]}})],ue);let $e=class{};$e=i([C({needs:[ue,E,j]})],$e);let fe=class{};fe=i([C({setup(e){e.perComponent({a:A,as:N})},init(e){e.whenReady((()=>{P(e.get(p).style(Q),R())}))}})],fe);let he=class{};he=i([C({needs:[fe,oe,$e]})],he);const ge=q(he);export{he as A,M as D,I as E,X as F,V as T,ge as e};
//# sourceMappingURL=index.901d4f6d.js.map
