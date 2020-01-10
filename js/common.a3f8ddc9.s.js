System.register(["./lib.8afd00b5.s.js","./wesib.3feaaf14.s.js"],(function(e){"use strict";var t,n,r,o,i,a,u,s,d,c,l,f,h,p,g,$,v,b,m,x,y,C,_,k,w,S,z,F,W,D,H,L,N,E,B,V,j,O,R,T,A,I,P;return{setters:[function(e){t=e.U,n=e.ai,r=e.aj,o=e.ak,i=e.al,a=e.X,u=e.am,s=e.ab,d=e.an,c=e.ao,l=e.V,f=e.ap,h=e.aq,p=e.t,g=e.D,$=e.o,v=e.ar,b=e.as,m=e.at,x=e.ae,y=e.au},function(e){C=e.D,_=e.T,k=e.R,w=e.P,S=e.C,z=e.i,F=e.H,W=e.I,D=e.A,H=e.F,L=e.a,N=e.b,E=e.B,B=e.c,V=e.N,j=e.p,O=e.d,R=e.e,T=e.f,A=e.g,I=e.S,P=e.h}],execute:function(){e({D:J,I:function(e){var t=e.ref(Z).read.keep,n=e.root.rules;return a(n.add({e:"input"},t.thru(ye)),n.add({e:"input",s:"[readonly]"},t.thru(Ce)),n.add({e:"input",s:"[disabled]"},t.thru(Ce)),n.add({e:"input",s:":focus"},t.thru(_e)),n.add({e:"input",c:["inap-invalid","inap-touched"]},t.thru(ke)),n.add({e:"input",c:["inap-missing","inap-touched"]},{outlineStyle:"dotted"}),n.add({e:"input",c:["inap-incomplete","inap-touched"]},{outlineStyle:"dotted"}))},i:ye,r:Ce});var U=e("E",new t("https://wesib.github.io/examples","bex","wesib-examples")),q=e("T",n.by({$:"settings"},{$color:new r({r:161,g:185,b:142}),$bgColor:new r({r:40,g:43,b:36}),$fontFace:"'Exo 2', sans-serif",$fontSize:o.of(1,"em"),$lineHeight:1.2,$fontWeight:"400",$linkFontWeight:"600",$layoutBreakpoint:i.of(576,"px")}));function M(e){return{"@media:sm":"(max-width: "+e.$layoutBreakpoint+")"}}function X(e){var t=e.ref(q).read.keep,n=e.root.rules;return a(n.add({e:"a"},t.thru(G)),n.add({e:"a",s:":visited"},t.thru(G)),n.add({e:"a",s:":hover"},{textDecoration:"underline"}),n.add({e:"a",s:":active"},{textDecoration:"underline dotted"}),n.add({e:"a",s:":focus"},{textDecoration:"underline dotted"}))}function G(e){return{color:e.$color,fontWeight:e.$linkFontWeight,textDecoration:"none"}}function J(e){var t=e.ref(q).read.keep;return a(e.root.add(t.thru(K)).add(t.thru(M)),e.style(X))}function K(e){var t=e.$color,n=e.$fontFace,r=e.$fontSize,o=e.$lineHeight;return{color:t,font:"normal "+e.$fontWeight+" "+r+"/"+o+" "+n}}function Q(e){var t=e.ref(q).read.keep,n=e.root.rules;return a(n.add({e:"html"},{height:"100%",margin:0,padding:0}),n.add({e:"body"},t.thru(Y)),e.style(J))}function Y(e){return{backgroundColor:e.$bgColor,height:"100%",margin:0,padding:0}}var Z=e("F",n.by({$:"settings:form"},(function(e){return u.by({global:q},e).read.keep.thru(ee)})));function ee(e){var t=e.global,n=t.$color,r=t.$bgColor,o=t.$fontFace,a=t.$fontSize,u=t.$lineHeight,s=t.$fontWeight;return{$color:n,$bgColor:r.hsl.set((function(e){return{l:.8*e.l}})),$roBgColor:r.hsl.set((function(e){return{l:.94*e.l}})),$fontFace:o,$fontSize:a,$errorFontSize:a.mul(.8),$lineHeight:u,$fontWeight:s,$borderColor:r,$marginV:a.div(4),$marginH:a.div(4),$paddingV:a.div(2),$paddingH:a,$borderW:i.of(1,"px")}}var te=function(){function e(e){var t=this;this._context=e,this._validity=l(),this._cssClasses=new f,this._codes=new Set,z(e)((function(e){return t.validity=e})),this._context.get(F).get(W).consume((function(e){var n=e.control;return n&&n.aspect(h).track((function(e,n){return t.updateCssClasses(e,n)}))}))}return Object.defineProperty(e.prototype,"validity",{get:function(){return this._validity},set:function(e){var t=this._validity;this._validity=e,this._context.updateState("validity",e,t)},enumerable:!0,configurable:!0}),e.prototype.updateCssClasses=function(e,t){this._cssClasses.clear(),this._cssClasses.delta(e,t),this._context.updateState("cssClasses",this._cssClasses,this._cssClasses)},e.prototype.setCode=function(e){this._codes=new Set(e.trim().split(/\s+/))},e.prototype.render=function(){var e=this,t=this._context.element.classList,n=s.name(ne,this._context.get(C)),r={add:function(e){return t.add(e)},delete:function(e){return t.remove(e)}};return function(){d(e._codes,(function(t){return!e.validity.has(t)}))?t.remove(n):t.add(n),e._cssClasses.redelta(r).undelta()}},e.prototype.style=function(){return this._context.get(_).style(re)},c([D("code")],e.prototype,"setCode",null),c([k()],e.prototype,"render",null),c([w()],e.prototype,"style",null),e=c([S(["in-error",U])],e)}(),ne=["has-error",U];function re(e){var t=e.ref(Z).read.keep,n=e.root.rules,r=o.of(4,"px");return a(n.add({u:[":","host"],$:"bex:in-error"},t.thru((function(e){var t=e.$color,n=e.$errorFontSize;return{display:"none",fontSize:n,padding:n.div(2),borderLeft:r+" dotted "+t,paddingLeft:n.sub(r)}}))),n.add({u:[":","host",{c:ne,u:[":","not",{c:"inap-has-focus"}]}],$:"bex:in-error"},{display:"block"}),n.add({u:[":","host",{c:ne,u:[[":","not",{u:["code","~=","missing"]}],[":","not",{u:["code","~=","incomplete"]}]]}],$:"bex:in-error"},{display:"block"}))}var oe=function(){function e(){}return e=c([H({needs:[L,te,N]})],e)}(),ie=function(){function e(e){var t=this;this._context=e,this._response=p(),this._response.on((function(t,n){return e.updateState("response",t,n)}));var n=e.get(V);e.whenOn((function(r){n.read.once((function(n){n.put(j,{fragment:{tag:e.element.tagName},receiver:{supply:r,receive:function(e,n){return t._response.it=n}}})}))}))}return e.prototype.render=function(){var e=this,t=this._context.get(E).document,n=t.createRange();return n.selectNodeContents(this._context.element),function(){var r=e._response.it;if(r)if(n.deleteContents(),r.ok){var o=t.createDocumentFragment(),i=r.fragment;i&&(B(i,o),n.insertNode(o))}else null==r.ok?n.insertNode(t.createTextNode("Loading...")):n.insertNode(t.createTextNode("Error. "+r.error))}},c([k()],e.prototype,"render",null),e=c([S(["main",U])],e)}();function ae(e){return{flex:"1 1 auto",padding:0,margin:"0 0 0 "+e.$fontSize.div(2)}}var ue=function(){function e(e){this._theme=e.get(_);var t=e.get(C),n=s.name(le,t),r=e.get(O),o=e.get(V);e.whenOn((function(e){var t=r.select("a",{all:!0}),i=new Map;t.track.tillOff(e)((function(t,r){r.forEach((function(e){var t=i.get(e);t&&(i.delete(e),t.off())})),t.forEach((function(t){var r=t.element,a=new g(r).on("click").instead((function(){r.classList.contains(n)||o.open(r.getAttribute("href")||"")})).needs(e);i.set(t,a)}))})),$({links:t,page:o})({supply:e,receive:function(e,t){var r,o=v(t.links,1)[0],i=se(v(t.page,1)[0].url),a="";o.forEach((function(e){var t=e.element,o=se(new URL(t.href));t.classList.remove(n),i.startsWith(o)&&a.length<o.length&&(r=t,a=o)})),r&&r.classList.add(n)}})}))}return e.prototype.style=function(){return this._theme.style(de)},c([w()],e.prototype,"style",null),e=c([S(["nav",U])],e)}();function se(e){var t=e.pathname;return t.endsWith("/")?t:t+"/"}function de(e){var t=e.ref(q).read.keep,n=e.root.rules;return a(n.add({u:[":","host"],$:"bex:nav"},t.thru(ce)),n.add({u:[":","host"],$:"bex:nav"},t.thru((function(e){return{flex:"0 1 200px",height:"100%",background:fe(e)}}))),n.add({u:[":","host"],$:["bex:nav","@media:sm"]},{flex:"0 1 100%"}),n.add([{u:[":","host"],$:"bex:nav"},{e:"a",$:"bex:nav"}],t.thru(he)),n.add([{u:[":","host"],$:"bex:nav"},{e:"a",c:le,$:"bex:nav"}],t.thru(pe)))}function ce(e){return{padding:0,margin:"0 "+e.$fontSize.div(2)+" 0 0"}}var le=["nav-active",U];function fe(e){return e.$bgColor.hsl.set((function(e){return{l:.8*e.l}}))}function he(e){var t=e.$fontSize;return{display:"block",margin:0,padding:t.div(2)+" "+t,border:0,outline:0,background:fe(e)}}function pe(e){var t=e.$fontSize,n=e.$color,r=e.$bgColor,i=o.of(4,"px");return{background:r,borderLeft:i+" solid "+n,paddingLeft:t.sub(i)}}var ge=function(){function e(e){this._context=e}return e.prototype.style=function(){return b(this,void 0,void 0,(function(){var e;return m(this,(function(t){switch(t.label){case 0:return[4,this._context.get(R).whenDefined(ie)];case 1:return e=t.sent().elementDef.name,[2,this._context.get(_).style($e(e))]}}))}))},c([w()],e.prototype,"style",null),e=c([S({name:["container",U],feature:{needs:[ie,ue]}})],e)}();function $e(e){return function(t){var n=t.ref(q).read.keep,r=t.root.rules;return a(r.add({u:[":","host"],$:"bex:container"},{height:"100%",display:"flex",flexFlow:"row wrap",alignItems:"stretch",alignContent:"flex-start"}).add(n.thru(M)),r.add({u:[":","host"],$:["bex:container","@media:sm"]},{height:"auto"}),r.add([{u:[":","host"],$:"bex:container"},{e:e,$:"bex:container"}],n.thru(ae)))}}var ve=function(){function e(){}return e=c([H({needs:[ge,L,T,A,I,N]})],e)}(),be=function(){function e(){}return e=c([H({needs:N,init:me})],e)}();function me(e){e.whenReady((function(){x(e.get(_).style(Q))}))}var xe=e("A",function(){function e(){}return e=c([H({needs:[be,oe,ve]})],e)}());function ye(e){var t=e.$color,n=e.$fontFace,r=e.$fontSize,o=e.$lineHeight,i=e.$fontWeight,a=e.$marginV,u=e.$marginH,s=e.$paddingV,d=e.$paddingH,c=e.$bgColor,l=e.$borderColor;return{color:t,font:"normal "+i+" "+r+"/"+o+" "+n,padding:s+" "+d,margin:a+" "+u,backgroundColor:c,border:"0 none",outline:e.$borderW+" solid "+l,boxShadow:"inset 1px 1px 2px -2px black",boxSizing:"border-box",width:"100%"}}function Ce(e){return{backgroundColor:e.$roBgColor}}function _e(e){var t=e.$color,n=e.$borderColor;return{outlineColor:y(n,t,.5)}}function ke(e){var t=e.$color,n=e.$borderW,r=e.$borderColor;return{outline:n.mul(2)+" dashed "+y(r,t,.25)}}e("e",P(xe))}}}));
//# sourceMappingURL=common.a3f8ddc9.s.js.map
