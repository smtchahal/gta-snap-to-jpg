(this["webpackJsonpgta-snap-to-jpg"]=this["webpackJsonpgta-snap-to-jpg"]||[]).push([[0],{21:function(e,n,t){e.exports=t(32)},26:function(e,n,t){},32:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(9),c=t.n(o),i=(t(26),t(5)),l=t.n(i),u=t(18),s=t(10),f=t(11),p=t(20),m=t(17),d=t(2),g=t(12),h=t(19),v=t(3);function b(){var e=Object(d.a)(["\n  margin-top: 16px;\n"]);return b=function(){return e},e}function w(){var e=Object(d.a)(["\n  padding: 0;\n  margin: 16px auto 0;\n  list-style: none;\n  max-width: 50vw;\n\n  @media (max-width: 767px) {\n    max-width: 100%;\n  }\n"]);return w=function(){return e},e}function x(){var e=Object(d.a)(["\n  width: 100%;\n"]);return x=function(){return e},e}function E(){var e=Object(d.a)(["\n  cursor: pointer;\n  border: dashed white 2px;\n  border-radius: 8px;\n  padding: 16px;\n\n  &:focus,\n  &:active {\n    outline: none;\n  }\n"]);return E=function(){return e},e}function j(){var e=Object(d.a)(["\n  cursor: pointer;\n  background-color: #1c1f24;\n  padding: 12px 16px;\n  user-select: none;\n  border: none;\n  border-radius: 8px;\n  color: white;\n"]);return j=function(){return e},e}function k(){var e=Object(d.a)(["\n  margin-top: 16px;\n  max-width: 400px;\n  display: flex;\n  justify-content: center;\n  margin-left: auto;\n  margin-right: auto;\n"]);return k=function(){return e},e}var y=v.a.div(k()),O=v.a.button(j()),A=v.a.div(E()),S=v.a.img(x()),C=v.a.ul(w()),P=v.a.li(b()),B=function(e){var n={jpeg:["ffd8ffe0","ffd8ffe1","ffd8ffe2","ffd8ffe3","ffd8ffe8"]};return new Promise((function(t){if(e.length<296)t(null);else{var a=new FileReader;a.onload=function(a){var r=a.target.result,o=r.slice(292,r.size),c=new Uint8Array(o),i=Array.from(c.subarray(0,4)).map((function(e){return e.toString(16)})).join("");i&&n.jpeg.includes(i)?t({name:e.name+".jpg",src:window.URL.createObjectURL(new Blob([c]))}):t(null)},a.readAsArrayBuffer(e)}}))},F=function(e){Object(p.a)(t,e);var n=Object(m.a)(t);function t(){var e;Object(f.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(e=n.call.apply(n,[this].concat(o))).state={images:[]},e.handleFileSelect=function(){var n=Object(s.a)(l.a.mark((function n(t){var a,r,o,c,i,s,f,p,m,d;return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(0!==t.length){n.next=2;break}return n.abrupt("return");case 2:a=!1,r=Object(u.a)(e.state.images),o=!0,c=!1,n.prev=6,s=Object(g.a)(t);case 8:return n.next=10,s.next();case 10:return f=n.sent,o=f.done,n.next=14,f.value;case 14:if(p=n.sent,o){n.next=24;break}return m=p,n.next=19,B(m);case 19:(d=n.sent)?r.push(d):a=!0;case 21:o=!0,n.next=8;break;case 24:n.next=30;break;case 26:n.prev=26,n.t0=n.catch(6),c=!0,i=n.t0;case 30:if(n.prev=30,n.prev=31,o||null==s.return){n.next=35;break}return n.next=35,s.return();case 35:if(n.prev=35,!c){n.next=38;break}throw i;case 38:return n.finish(35);case 39:return n.finish(30);case 40:a&&alert("Some images could not be converted, as they were not valid Snapmatic images"),e.setState({images:r});case 42:case"end":return n.stop()}}),n,null,[[6,26,30,40],[31,,35,39]])})));return function(e){return n.apply(this,arguments)}}(),e.clearAll=function(){e.setState({images:[]})},e.render=function(){return r.a.createElement("div",{className:"container"},r.a.createElement("h1",null,"GTA V Snapmatic to JPEG converter"),r.a.createElement("p",null,"A simple tool to convert your GTA V Snapmatic snaps to JPEG files."),r.a.createElement("p",null,r.a.createElement("b",null,"Note:")," This only works locally. All conversion takes place in your browser. No files are uploaded."),r.a.createElement(y,null,r.a.createElement(h.a,{onDrop:e.handleFileSelect},(function(e){var n=e.getRootProps,t=e.getInputProps;return r.a.createElement(A,n(),r.a.createElement("input",t()),"Click here to select files, or drag and drop.")}))),e.state.images.length>0&&r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Click any image to download it."," ",r.a.createElement(O,{title:"Clear all images",onClick:e.clearAll},"Clear all")),r.a.createElement(C,null,e.state.images.map((function(e,n){return r.a.createElement(P,{key:n},r.a.createElement("a",{href:"Click to download ".concat(e.src),download:e.name},r.a.createElement(S,{src:e.src,title:e.name})),r.a.createElement("span",null,e.name))})))))},e}return t}(r.a.PureComponent);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[21,1,2]]]);
//# sourceMappingURL=main.62d9ac96.chunk.js.map