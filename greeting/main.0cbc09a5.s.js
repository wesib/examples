System.register(["../js/lib.ebf0e7c0.s.js","../js/wesib.d0a0705b.s.js","../js/common.8c39812c.s.js"],(function(){"use strict";var e,t,n,r,o,i,u,s,c,a,l,d,f,p,g,y,m,v,h,b,x,k,T,j,_,$,w,O,E,H,S;return{setters:[function(f){e=f._,t=f.s,n=f.aG,r=f.E,o=f.aH,i=f.aI,u=f.d,s=f.aJ,c=f.aK,a=f.e,l=f.i,d=f.aL},function(e){f=e.T,p=e.g,g=e.h,y=e.P,m=e.R,v=e.C,h=e.i,b=e.j,x=e.D,k=e.k},function(e){T=e.T,j=e.F,_=e.D,$=e.i,w=e.r,O=e.E,E=e.I,H=e.A,S=e.e}],execute:function(){var z=function(){function t(e){this._context=e}return t.prototype.style=function(){return this._context.get(f).style(D)},t.prototype.render=function(){var e=this,t=this._context.get(p).document.createElement("span");return this._context.contentRoot.append(t),function(){var n,r;t.innerText=(r=null===(n=e.name)||void 0===n?void 0:n.trim())?"Hello, "+r+"!":"Hello!"}},e([g()],t.prototype,"name",void 0),e([y()],t.prototype,"style",null),e([m()],t.prototype,"render",null),t=e([v(["greeting-out",O]),h()],t)}();function D(e){var n=e.ref(T).read(),r=e.ref(j).read(),o=e.root.rules;return t(o.add({u:[":","host"],$:"bex:greeting-out"},r.keepThru($)).add(r.keepThru(w)).add(n.keepThru(I)),e.style(_))}function I(e){return{display:"block",margin:e.$fontSize.div(2)+" 0 0 0"}}var R=function(){function t(e){this._context=e,e.whenOn((function(t){var f=e.get(b),p=n({name:""});r({name:f.select("input",{all:!0,deep:!0}).first(),aspects:e.get(x)}).tillOff(t).consume((function(t){var n=o(t.name,1)[0],r=o(t.aspects,1)[0],d=n&&i(n.element).convert(r,u.to(n.element)).setup(s,(function(e){return e.by(c)})).setup(a,(function(e){return e.add(l())}));return p.controls.set("name",d),d&&k(e,d)}));var g=f.select(z,{deep:!0}).first().tillOff(t),y=new d("");y.sync(g,(function(e){return null==e?void 0:e.attribute("name")})),y.sync("in",p.controls.read(),(function(e){return null==e?void 0:e.get("name")})),t.whenOff((function(e){y.done(e),p.done(e),p.controls.clear()}))}))}return t.prototype.style=function(){return this._context.get(f).style(A)},e([y()],t.prototype,"style",null),t=e([v(["greeting",O],{feature:{needs:[z,H]}})],t)}();function A(e){var n=e.ref(T).read(),r=e.root.rules.add([{u:[":","host"],$:"bex:greeting"},{e:"label",$:"bex:greeting"}],n.keepThru(C));return t(e.style(E),r,r.rules.add({e:"input",$:"bex:greeting"},n.keepThru(I)))}function C(e){return{display:"block",margin:0,padding:""+e.$fontSize.div(2)}}S.load(R)}}}));//# sourceMappingURL=main.0cbc09a5.s.js.map
