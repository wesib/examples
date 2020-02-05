System.register(["./lib.9c3ede28.s.js","./wesib.06d38de7.s.js"],(function(e){"use strict";var t,n,o,r,i,u,a,d,c,l,s,f,h,$,g,p,b,x,v,m,y,k,C,S,w,z,F,W,H,_,D,B,L,N;return{setters:[function(e){t=e.N,n=e.ap,o=e.aq,r=e.ar,i=e.as,u=e.ab,a=e.at,d=e.au,c=e.av,l=e.aw,s=e.ax,f=e.ay,h=e.az,$=e.aA,g=e.aB,p=e.ah,b=e.aC},function(e){x=e.T,v=e.C,m=e.a,y=e.A,k=e.P,C=e.t,S=e.F,w=e.b,z=e.c,F=e.I,W=e.d,H=e.H,_=e.W,D=e.B,B=e.e,L=e.S,N=e.f}],execute:function(){e({D:j,I:function(e){var t=e.ref(G).read.keep,n=e.root.rules;return u(n.add({e:"input"},t.thru(ce)),n.add({e:"input",s:"[readonly]"},t.thru(le)),n.add({e:"input",s:"[disabled]"},t.thru(le)),n.add({e:"input",s:":focus"},t.thru(se)),n.add({e:"input",c:[["invalid",c],["touched",c]]},t.thru(fe)),n.add({e:"input",c:[["missing",c],["touched",c]]},{outlineStyle:"dotted"}),n.add({e:"input",c:[["incomplete",c],["touched",c]]},{outlineStyle:"dotted"}))},i:ce,r:le});var T=e("E",new t("https://wesib.github.io/examples","bex","wesib-examples")),V=e("T",n.by({$:"settings"},{$color:new o({r:161,g:185,b:142}),$bgColor:new o({r:40,g:43,b:36}),$fontFace:"'Exo 2', sans-serif",$fontSize:r.of(1,"em"),$lineHeight:1.2,$fontWeight:"400",$linkFontWeight:"600",$layoutBreakpoint:i.of(576,"px")}));function A(e){return{"@media:sm":"(max-width: "+e.$layoutBreakpoint+")"}}function E(e){var t=e.ref(V).read.keep,n=e.root.rules;return u(n.add({e:"a"},t.thru(I)),n.add({e:"a",s:":visited"},t.thru(I)),n.add({e:"a",s:":hover"},{textDecoration:"underline"}),n.add({e:"a",s:":active"},{textDecoration:"underline dotted"}),n.add({e:"a",s:":focus"},{textDecoration:"underline dotted"}))}function I(e){return{color:e.$color,fontWeight:e.$linkFontWeight,textDecoration:"none"}}function j(e){var t=e.ref(V).read.keep;return u(e.root.add(t.thru(R)).add(t.thru(A)),e.style(E))}function R(e){var t=e.$color,n=e.$fontFace,o=e.$fontSize,r=e.$lineHeight;return{color:t,font:"normal "+e.$fontWeight+" "+o+"/"+r+" "+n}}function q(e){var t=e.ref(V).read.keep,n=e.root.rules;return u(n.add({e:"html"},{height:"100%",margin:0,padding:0}),n.add({e:"body"},t.thru(P)),e.style(j))}function P(e){return{backgroundColor:e.$bgColor,height:"100%",margin:0,padding:0}}var G=e("F",n.by({$:"settings:form"},(function(e){return a.by({global:V},e).read.keep.thru(J)})));function J(e){var t=e.global,n=t.$color,o=t.$bgColor,r=t.$fontFace,u=t.$fontSize,a=t.$lineHeight,d=t.$fontWeight;return{$color:n,$bgColor:o.hsl.set((function(e){return{l:.8*e.l}})),$roBgColor:o.hsl.set((function(e){return{l:.94*e.l}})),$fontFace:r,$fontSize:u,$errorFontSize:u.mul(.8),$lineHeight:a,$fontWeight:d,$borderColor:o,$marginV:u.div(4),$marginH:u.div(4),$paddingV:u.div(2),$paddingH:u,$borderW:i.of(1,"px")}}var K=function(){function e(e){this._context=e}return e.prototype.style=function(){return this._context.get(x).style(O)},d([k()],e.prototype,"style",null),e=d([v(["in-error",T],y("code"),m((function(e){var t=e.control.control,n=e.aspects,o=e.context;return C(o,"code").read.keep.thru_((function(e){return e?e.trim().split(/\s+/):[]})).keep.thru((function(e){return t.convert(l.to(o.element),n).setup(s,(function(t){t.add(f()),t.add(h({when:e}))}))}))})))],e)}(),M=["has-error",c];function O(e){var t=e.ref(G).read.keep,n=e.root.rules,o=r.of(4,"px");return u(n.add({u:[":","host"],$:"bex:in-error"},t.thru((function(e){var t=e.$color,n=e.$errorFontSize;return{display:"none",fontSize:n,padding:n.div(2),borderLeft:o+" dotted "+t,paddingLeft:n.sub(o)}}))),n.add({u:[":","host",{c:[M,["touched",c]],u:[":","not",{c:["has-focus",c]}]}],$:"bex:in-error"},{display:"block"}),n.add({u:[":","host",{c:M,u:[[":","not",{u:["code","~=","missing"]}],[":","not",{u:["code","~=","incomplete"]}]]}],$:"bex:in-error"},{display:"block"}))}var Q=function(){function e(){}return e=d([S({needs:[w,K,z]})],e)}(),U=function(){function e(){}return e=d([v(["main",T],F({onResponse:function(e){var t=e.response,n=e.range;t.ok||(n.deleteContents(),null==t.ok?n.insertNode(document.createTextNode("Loading...")):n.insertNode(document.createTextNode("Error. "+t.error)))}}))],e)}();function X(e){return{flex:"1 1 auto",padding:0,margin:"0 0 0 "+e.$fontSize.div(2)}}var Y=function(){function e(e){this._theme=e.get(x)}return e.prototype.style=function(){return this._theme.style(Z)},d([k()],e.prototype,"style",null),e=d([v(["nav",T],H(),W())],e)}();function Z(e){var t=e.ref(V).read.keep,n=e.root.rules;return u(n.add({u:[":","host"],$:"bex:nav"},t.thru(ee)),n.add({u:[":","host"],$:"bex:nav"},t.thru((function(e){return{flex:"0 1 200px",height:"100%",background:te(e)}}))),n.add({u:[":","host"],$:["bex:nav","@media:sm"]},{flex:"0 1 100%"}),n.add([{u:[":","host"],$:"bex:nav"},{e:"a",$:"bex:nav"}],t.thru(ne)),n.add([{u:[":","host"],$:"bex:nav"},{e:"a",c:["active",_],$:"bex:nav"}],t.thru(oe)))}function ee(e){return{padding:0,margin:"0 "+e.$fontSize.div(2)+" 0 0"}}function te(e){return e.$bgColor.hsl.set((function(e){return{l:.8*e.l}}))}function ne(e){var t=e.$fontSize;return{display:"block",margin:0,padding:t.div(2)+" "+t,border:0,outline:0,background:te(e)}}function oe(e){var t=e.$fontSize,n=e.$color,o=e.$bgColor,i=r.of(4,"px");return{background:o,borderLeft:i+" solid "+n,paddingLeft:t.sub(i)}}var re=function(){function e(e){this._context=e}return e.prototype.style=function(){return $(this,void 0,void 0,(function(){var e;return g(this,(function(t){switch(t.label){case 0:return[4,this._context.get(D).whenDefined(U)];case 1:return e=t.sent().elementDef.name,[2,this._context.get(x).style(ie(e))]}}))}))},d([k()],e.prototype,"style",null),e=d([v({name:["container",T],feature:{needs:[U,Y]}})],e)}();function ie(e){return function(t){var n=t.ref(V).read.keep,o=t.root.rules;return u(o.add({u:[":","host"],$:"bex:container"},{height:"100%",display:"flex",flexFlow:"row wrap",alignItems:"stretch",alignContent:"flex-start"}).add(n.thru(A)),o.add({u:[":","host"],$:["bex:container","@media:sm"]},{height:"auto"}),o.add([{u:[":","host"],$:"bex:container"},{e:e,$:"bex:container"}],n.thru(X)))}}var ue=function(){function e(){}return e=d([S({needs:[re,w,B,L,z]})],e)}(),ae=function(){function e(){}return e=d([S({needs:z,init:function(e){e.whenReady((function(){p(e.get(x).style(q))}))}})],e)}(),de=e("A",function(){function e(){}return e=d([S({needs:[ae,Q,ue]})],e)}());function ce(e){var t=e.$color,n=e.$fontFace,o=e.$fontSize,r=e.$lineHeight,i=e.$fontWeight,u=e.$marginV,a=e.$marginH,d=e.$paddingV,c=e.$paddingH,l=e.$bgColor,s=e.$borderColor;return{color:t,font:"normal "+i+" "+o+"/"+r+" "+n,padding:d+" "+c,margin:u+" "+a,backgroundColor:l,border:"0 none",outline:e.$borderW+" solid "+s,boxShadow:"inset 1px 1px 2px -2px black",boxSizing:"border-box",width:"100%"}}function le(e){return{backgroundColor:e.$roBgColor}}function se(e){var t=e.$color,n=e.$borderColor;return{outlineColor:b(n,t,.5)}}function fe(e){var t=e.$color,n=e.$borderW,o=e.$borderColor;return{outline:n.mul(2)+" dashed "+b(o,t,.25)}}e("e",N(de))}}}));//# sourceMappingURL=common.ff00b14f.s.js.map
