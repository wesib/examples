import{a8 as e,J as t,ac as n,ad as s,K as r,ae as o,a9 as a,af as l,ag as i}from"../js/lib.b2f3d37f.m.js";import{j as u,P as d,R as c,C as p,k as m,T as f,B as g,d as y,l as h}from"../js/wesib.b06661fa.m.js";import{E as b,T as v,F as x,D as $,i as j,r as k,A as _,I as w,e as O}from"../js/common.e5c21448.m.js";let T=class{constructor(e){this._context=e}style(){return this._context.get(f).style(z)}render(){const e=this,t=this._context.get(g).document.createElement("span");return this._context.contentRoot.append(t),()=>t.innerText=function(){var t;const n=null===(t=e.name)||void 0===t?void 0:t.trim();return n?`Hello, ${n}!`:"Hello!"}()}};e([u()],T.prototype,"name",void 0),e([d()],T.prototype,"style",null),e([c()],T.prototype,"render",null),T=e([p(["greeting-out",b]),m()],T);function z(e){const n=e.ref(v).read.keep,s=e.ref(x).read.keep,{root:{rules:r}}=e;return t(r.add({u:[":","host"],$:"bex:greeting-out"},s.thru(j)).add(s.thru(k)).add(n.thru(C)),e.style($))}function C({$fontSize:e}){return{display:"block",margin:`${e.div(2)} 0 0 0`}}let E=class{constructor(e){this._context=e,e.whenOn(t=>{const u=e.get(y),d=n({name:""});u.select("input",{all:!0,deep:!0}).first.tillOff(t).consume(t=>{const n=t&&s(t.element).setup(r,e=>e.by(o)).setup(a,e=>e.add(l()));return d.controls.set("name",n),n&&h(e,n)});const c=u.select(T,{deep:!0}).first.tillOff(t),p=new i("");p.sync(c,e=>{var t;return null===(t=e)||void 0===t?void 0:t.attribute("name")}),p.sync("in",d.controls.read,e=>{var t;return null===(t=e)||void 0===t?void 0:t.get("name")}),t.whenOff(e=>{p.done(e),d.done(e),d.controls.clear()})})}style(){return this._context.get(f).style(H)}nodeControl(e){const t=n({name:""});return t.controls.set("name",s(e.element).setup(r,e=>e.by(o)).setup(a,e=>e.add(l()))),t}};e([d()],E.prototype,"style",null),E=e([p(["greeting",b],{feature:{needs:[T,_]}})],E);function H(e){const n=e.ref(v).read.keep,{root:{rules:s}}=e,r=s.add([{u:[":","host"],$:"bex:greeting"},{e:"label",$:"bex:greeting"}],n.thru(R));return t(e.style(w),r,r.rules.add({e:"input",$:"bex:greeting"},n.thru(C)))}function R({$fontSize:e}){return{display:"block",margin:0,padding:`${e.div(2)}`}}O.load(E);
//# sourceMappingURL=main.cdc64980.m.js.map
