import{F as e,E as t,T as o,D as n,A as r,e as d}from"./index.901d4f6d.js";import{s,I as a,m as i,J as l,_ as u,A as c,P as $,K as g,C as p,L as f,T as y,q as b,d as m,B as h,M as x,O as C,Q as S,U as v,V as _,X as w,Y as k}from"./vendor.d0de1fdb.js";function H(t){const o=t.ref(e).read,{root:{rules:n}}=t;return s(n.add({e:"input"},o.do(i(z))),n.add({e:"input",s:"[readonly]"},o.do(i(q))),n.add({e:"input",s:"[disabled]"},o.do(i(q))),n.add({e:"input",s:":focus"},o.do(i(D))),n.add({e:"input",c:[["invalid",a],["touched",a]]},o.do(i(T))),n.add({e:"input",c:[["missing",a],["touched",a]]},{outlineStyle:"dotted"}),n.add({e:"input",c:[["incomplete",a],["touched",a]]},{outlineStyle:"dotted"}))}function z({$color:e,$fontFace:t,$fontSize:o,$lineHeight:n,$fontWeight:r,$marginV:d,$marginH:s,$paddingV:a,$paddingH:i,$bgColor:l,$borderColor:u,$borderW:c}){return{color:e,font:`normal ${r} ${o}/${n} ${t}`,padding:`${a} ${i}`,margin:`${d} ${s}`,backgroundColor:l,border:"0 none",outline:`${c} solid ${u}`,boxShadow:"inset 1px 1px 2px -2px black",boxSizing:"border-box",width:"100%"}}function q({$roBgColor:e}){return{backgroundColor:e}}function D({$color:e,$borderColor:t}){return{outlineColor:l(t,e,.5)}}function T({$color:e,$borderW:t,$borderColor:o}){return{outline:`${t.mul(2)} dashed ${l(o,e,.25)}`}}let V=class{constructor(e){this._context=e}style(){return this._context.get(y).style(W)}render({content:e}){const t=b(e);e.appendChild(t.createTextNode(this._greeting()))}_greeting(){var e;const t=null===(e=this.name)||void 0===e?void 0:e.trim();return t?`Hello, ${t}!`:"Hello!"}};u([c()],V.prototype,"name",void 0),u([$()],V.prototype,"style",null),u([g()],V.prototype,"render",null),V=u([p(["greeting-out",t]),f()],V);function W(t){const r=t.ref(o).read,d=t.ref(e).read,{root:{rules:a}}=t;return s(a.add({u:[":","host"],$:"bex:greeting-out"},d.do(i(z))).add(d.do(i(q))).add(r.do(i(j))),t.style(n))}function j({$fontSize:e}){return{display:"block",margin:`${e.div(2)} 0 0 0`}}let A=class{constructor(e){this._context=e;const t=e.get(h);e.whenSettled((({element:o})=>{const n=o.querySelector("input"),r=this.name=x.by((e=>C(n,e).setup(S,(e=>e.by(v)))));t.whenDefined(V)((({elementDef:{tagName:t}})=>{const n=o.querySelector(t);_.of(n).whenReady((t=>{const o=new w(""),n=k(t,"name");o.sync(n),o.sync("in",r,(e=>e&&e.control)),e.supply.cuts(o).cuts(n)}))}))}))}style(){return this._context.get(y).style(B)}};u([m()],A.prototype,"name",void 0),u([$()],A.prototype,"style",null),A=u([p(["greeting",t],{feature:{needs:[V,r]}})],A);function B(e){const t=e.ref(o).read,{root:{rules:n}}=e,r=n.add([{u:[":","host"],$:"bex:greeting"},{e:"label",$:"bex:greeting"}],t.do(i(F)));return s(e.style(H),r,r.rules.add({e:"input",$:"bex:greeting"},t.do(i(j))))}function F({$fontSize:e}){return{display:"block",margin:0,padding:`${e.div(2)}`}}d.load(A);
//# sourceMappingURL=greeting.88860a58.js.map
