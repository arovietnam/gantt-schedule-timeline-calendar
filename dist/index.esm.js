/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const t=new WeakMap,e=e=>(...n)=>{const i=e(...n);return t.set(i,!0),i},n=e=>"function"==typeof e&&t.has(e),i=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,s=(t,e,n=null,i=null)=>{for(;e!==n;){const n=e.nextSibling;t.insertBefore(e,i),e=n}},o=(t,e,n=null)=>{for(;e!==n;){const n=e.nextSibling;t.removeChild(e),e=n}},r={},a={},l=`{{lit-${String(Math.random()).slice(2)}}}`,d=`\x3c!--${l}--\x3e`,h=new RegExp(`${l}|${d}`),u="$lit$";class Template{constructor(t,e){this.parts=[],this.element=e;const n=[],i=[],s=document.createTreeWalker(e.content,133,null,!1);let o=0,r=-1,a=0;const{strings:c,values:{length:d}}=t;for(;a<d;){const t=s.nextNode();if(null!==t){if(r++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:n}=e;let i=0;for(let t=0;t<n;t++)p(e[t].name,u)&&i++;for(;i-- >0;){const e=c[a],n=g.exec(e)[2],i=n.toLowerCase()+u,s=t.getAttribute(i);t.removeAttribute(i);const o=s.split(h);this.parts.push({type:"attribute",index:r,name:n,strings:o}),a+=o.length-1}}"TEMPLATE"===t.tagName&&(i.push(t),s.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(l)>=0){const i=t.parentNode,s=e.split(h),o=s.length-1;for(let e=0;e<o;e++){let n,o=s[e];if(""===o)n=m();else{const t=g.exec(o);null!==t&&p(t[2],u)&&(o=o.slice(0,t.index)+t[1]+t[2].slice(0,-u.length)+t[3]),n=document.createTextNode(o)}i.insertBefore(n,t),this.parts.push({type:"node",index:++r})}""===s[o]?(i.insertBefore(m(),t),n.push(t)):t.data=s[o],a+=o}}else if(8===t.nodeType)if(t.data===l){const e=t.parentNode;null!==t.previousSibling&&r!==o||(r++,e.insertBefore(m(),t)),o=r,this.parts.push({type:"node",index:r}),null===t.nextSibling?t.data="":(n.push(t),r--),a++}else{let e=-1;for(;-1!==(e=t.data.indexOf(l,e+1));)this.parts.push({type:"node",index:-1}),a++}}else s.currentNode=i.pop()}for(const t of n)t.parentNode.removeChild(t)}}const p=(t,e)=>{const n=t.length-e.length;return n>=0&&t.slice(n)===e},f=t=>-1!==t.index,m=()=>document.createComment(""),g=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class TemplateInstance{constructor(t,e,n){this.__parts=[],this.template=t,this.processor=e,this.options=n}update(t){let e=0;for(const n of this.__parts)void 0!==n&&n.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=i?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],n=this.template.parts,s=document.createTreeWalker(t,133,null,!1);let o,r=0,a=0,l=s.nextNode();for(;r<n.length;)if(o=n[r],f(o)){for(;a<o.index;)a++,"TEMPLATE"===l.nodeName&&(e.push(l),s.currentNode=l.content),null===(l=s.nextNode())&&(s.currentNode=e.pop(),l=s.nextNode());if("node"===o.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,o.name,o.strings,this.options));r++}else this.__parts.push(void 0),r++;return i&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const v=` ${l} `;class TemplateResult{constructor(t,e,n,i){this.strings=t,this.values=e,this.type=n,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let i=0;i<t;i++){const t=this.strings[i],s=t.lastIndexOf("\x3c!--");n=(s>-1||n)&&-1===t.indexOf("--\x3e",s+1);const o=g.exec(t);e+=null===o?t+(n?v:d):t.substr(0,o.index)+o[1]+o[2]+u+o[3]+l}return e+=this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}class SVGTemplateResult extends TemplateResult{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const t=super.getTemplateElement(),e=t.content,n=e.firstChild;return e.removeChild(n),s(e,n.firstChild),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const b=t=>null===t||!("object"==typeof t||"function"==typeof t),y=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class AttributeCommitter{constructor(t,e,n){this.dirty=!0,this.element=t,this.name=e,this.strings=n,this.parts=[];for(let t=0;t<n.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new AttributePart(this)}_getValue(){const t=this.strings,e=t.length-1;let n="";for(let i=0;i<e;i++){n+=t[i];const e=this.parts[i];if(void 0!==e){const t=e.value;if(b(t)||!y(t))n+="string"==typeof t?t:String(t);else for(const e of t)n+="string"==typeof e?e:String(e)}}return n+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class AttributePart{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===r||b(t)&&t===this.value||(this.value=t,n(t)||(this.committer.dirty=!0))}commit(){for(;n(this.value);){const t=this.value;this.value=r,t(this)}this.value!==r&&this.committer.commit()}}class NodePart{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(m()),this.endNode=t.appendChild(m())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=m()),t.__insert(this.endNode=m())}insertAfterPart(t){t.__insert(this.startNode=m()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){for(;n(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=r,t(this)}const t=this.__pendingValue;t!==r&&(b(t)?t!==this.value&&this.__commitText(t):t instanceof TemplateResult?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):y(t)?this.__commitIterable(t):t===a?(this.value=a,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,n="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=n:this.__commitNode(document.createTextNode(n)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof TemplateInstance&&this.value.template===e)this.value.update(t.values);else{const n=new TemplateInstance(e,t.processor,this.options),i=n._clone();n.update(t.values),this.__commitNode(i),this.value=n}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let n,i=0;for(const s of t)void 0===(n=e[i])&&(n=new NodePart(this.options),e.push(n),0===i?n.appendIntoPart(this):n.insertAfterPart(e[i-1])),n.setValue(s),n.commit(),i++;i<e.length&&(e.length=i,this.clear(n&&n.endNode))}clear(t=this.startNode){o(this.startNode.parentNode,t.nextSibling,this.endNode)}}class BooleanAttributePart{constructor(t,e,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=n}setValue(t){this.__pendingValue=t}commit(){for(;n(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=r,t(this)}if(this.__pendingValue===r)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=r}}class PropertyCommitter extends AttributeCommitter{constructor(t,e,n){super(t,e,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new PropertyPart(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class PropertyPart extends AttributePart{}let w=!1;try{const t={get capture(){return w=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class EventPart{constructor(t,e,n){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=n,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;n(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=r,t(this)}if(this.__pendingValue===r)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),s=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=_(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=r}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const _=t=>t&&(w?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const $=new class DefaultTemplateProcessor{handleAttributeExpressions(t,e,n,i){const s=e[0];if("."===s){return new PropertyCommitter(t,e.slice(1),n).parts}return"@"===s?[new EventPart(t,e.slice(1),i.eventContext)]:"?"===s?[new BooleanAttributePart(t,e.slice(1),n)]:new AttributeCommitter(t,e,n).parts}handleTextExpression(t){return new NodePart(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function templateFactory(t){let e=x.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},x.set(t.type,e));let n=e.stringsArray.get(t.strings);if(void 0!==n)return n;const i=t.strings.join(l);return void 0===(n=e.keyString.get(i))&&(n=new Template(t,t.getTemplateElement()),e.keyString.set(i,n)),e.stringsArray.set(t.strings,n),n}const x=new Map,C=new WeakMap,M=(t,e,n)=>{let i=C.get(e);void 0===i&&(o(e,e.firstChild),C.set(e,i=new NodePart(Object.assign({templateFactory:templateFactory},n))),i.appendInto(e)),i.setValue(t),i.commit()};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const O=(t,...e)=>new TemplateResult(t,e,"html",$),P=(t,...e)=>new SVGTemplateResult(t,e,"svg",$);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var D=function(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e,n=t[Symbol.asyncIterator];return n?n.call(t):(t="function"==typeof __values?__values(t):t[Symbol.iterator](),e={},verb("next"),verb("throw"),verb("return"),e[Symbol.asyncIterator]=function(){return this},e);function verb(n){e[n]=t[n]&&function(e){return new Promise((function(i,s){(function settle(t,e,n,i){Promise.resolve(i).then((function(e){t({value:e,done:n})}),e)})(i,s,(e=t[n](e)).done,e.value)}))}}};const I=e((t,e)=>async n=>{var i,s;if(!(n instanceof NodePart))throw new Error("asyncAppend can only be used in text bindings");if(t===n.value)return;let o;n.value=t;let r=0;try{for(var a,l=D(t);!(a=await l.next()).done;){let i=a.value;if(n.value!==t)break;0===r&&n.clear(),void 0!==e&&(i=e(i,r));let s=n.startNode;void 0!==o&&(s=m(),o.endNode=s,n.endNode.parentNode.insertBefore(s,n.endNode)),(o=new NodePart(n.options)).insertAfterNode(s),o.setValue(i),o.commit(),r++}}catch(t){i={error:t}}finally{try{a&&!a.done&&(s=l.return)&&await s.call(l)}finally{if(i)throw i.error}}});
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */var T=function(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e,n=t[Symbol.asyncIterator];return n?n.call(t):(t="function"==typeof __values?__values(t):t[Symbol.iterator](),e={},verb("next"),verb("throw"),verb("return"),e[Symbol.asyncIterator]=function(){return this},e);function verb(n){e[n]=t[n]&&function(e){return new Promise((function(i,s){(function settle(t,e,n,i){Promise.resolve(i).then((function(e){t({value:e,done:n})}),e)})(i,s,(e=t[n](e)).done,e.value)}))}}};const S=e((t,e)=>async n=>{var i,s;if(!(n instanceof NodePart))throw new Error("asyncReplace can only be used in text bindings");if(t===n.value)return;const o=new NodePart(n.options);n.value=t;let r=0;try{for(var a,l=T(t);!(a=await l.next()).done;){let i=a.value;if(n.value!==t)break;0===r&&(n.clear(),o.appendIntoPart(n)),void 0!==e&&(i=e(i,r)),o.setValue(i),o.commit(),r++}}catch(t){i={error:t}}finally{try{a&&!a.done&&(s=l.return)&&await s.call(l)}finally{if(i)throw i.error}}}),A=new WeakMap,R=e(t=>e=>{if(!(e instanceof NodePart))throw new Error("cache can only be used in text bindings");let n=A.get(e);void 0===n&&(n=new WeakMap,A.set(e,n));const i=e.value;if(i instanceof TemplateInstance){if(t instanceof TemplateResult&&i.template===e.options.templateFactory(t))return void e.setValue(t);{let t=n.get(i.template);void 0===t&&(t={instance:i,nodes:document.createDocumentFragment()},n.set(i.template,t)),s(t.nodes,e.startNode.nextSibling,e.endNode)}}if(t instanceof TemplateResult){const i=e.options.templateFactory(t),s=n.get(i);void 0!==s&&(e.setValue(s.nodes),e.commit(),e.value=s.instance)}e.setValue(t)}),L=new WeakMap,E=e(t=>e=>{if(!(e instanceof AttributePart)||e instanceof PropertyPart||"class"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:n}=e,{element:i}=n;L.has(e)||(i.className=n.strings.join(" "));const{classList:s}=i,o=L.get(e);for(const e in o)e in t||s.remove(e);for(const e in t){const n=t[e];if(!o||n!==o[e]){s[n?"add":"remove"](e)}}L.set(e,t)}),N=new WeakMap,k=e((t,e)=>n=>{const i=N.get(n);if(Array.isArray(t)){if(Array.isArray(i)&&i.length===t.length&&t.every((t,e)=>t===i[e]))return}else if(i===t&&(void 0!==t||N.has(n)))return;n.setValue(e()),N.set(n,Array.isArray(t)?Array.from(t):t)}),j=e(t=>e=>{if(void 0===t&&e instanceof AttributePart){if(t!==e.value){const t=e.committer.name;e.committer.element.removeAttribute(t)}}else e.setValue(t)}),H=(t,e)=>{const n=t.startNode.parentNode,i=void 0===e?t.endNode:e.startNode,s=n.insertBefore(m(),i);n.insertBefore(m(),i);const o=new NodePart(t.options);return o.insertAfterNode(s),o},V=(t,e)=>(t.setValue(e),t.commit(),t),z=(t,e,n)=>{const i=t.startNode.parentNode,o=n?n.startNode:t.endNode,r=e.endNode.nextSibling;r!==o&&s(i,e.startNode,r,o)},W=t=>{o(t.startNode.parentNode,t.startNode,t.endNode.nextSibling)},B=(t,e,n)=>{const i=new Map;for(let s=e;s<=n;s++)i.set(t[s],s);return i},G=new WeakMap,Y=new WeakMap,F=e((t,e,n)=>{let i;return void 0===n?n=e:void 0!==e&&(i=e),e=>{if(!(e instanceof NodePart))throw new Error("repeat can only be used in text bindings");const s=G.get(e)||[],o=Y.get(e)||[],r=[],a=[],l=[];let c,d,h=0;for(const e of t)l[h]=i?i(e,h):h,a[h]=n(e,h),h++;let u=0,p=s.length-1,f=0,m=a.length-1;for(;u<=p&&f<=m;)if(null===s[u])u++;else if(null===s[p])p--;else if(o[u]===l[f])r[f]=V(s[u],a[f]),u++,f++;else if(o[p]===l[m])r[m]=V(s[p],a[m]),p--,m--;else if(o[u]===l[m])r[m]=V(s[u],a[m]),z(e,s[u],r[m+1]),u++,m--;else if(o[p]===l[f])r[f]=V(s[p],a[f]),z(e,s[p],s[u]),p--,f++;else if(void 0===c&&(c=B(l,f,m),d=B(o,u,p)),c.has(o[u]))if(c.has(o[p])){const t=d.get(l[f]),n=void 0!==t?s[t]:null;if(null===n){const t=H(e,s[u]);V(t,a[f]),r[f]=t}else r[f]=V(n,a[f]),z(e,n,s[u]),s[t]=null;f++}else W(s[p]),p--;else W(s[u]),u++;for(;f<=m;){const t=H(e,r[m+1]);V(t,a[f]),r[f++]=t}for(;u<=p;){const t=s[u++];null!==t&&W(t)}G.set(e,r),Y.set(e,l)}}),U=new WeakMap,J=e(t=>e=>{if(!(e instanceof NodePart))throw new Error("unsafeHTML can only be used in text bindings");const n=U.get(e);if(void 0!==n&&b(t)&&t===n.value&&e.value===n.fragment)return;const i=document.createElement("template");i.innerHTML=t;const s=document.importNode(i.content,!0);e.setValue(s),U.set(e,{value:t,fragment:s})}),q=new WeakMap,Z=e((...t)=>e=>{let n=q.get(e);void 0===n&&(n={lastRenderedIndex:2147483647,values:[]},q.set(e,n));const i=n.values;let s=i.length;n.values=t;for(let o=0;o<t.length&&!(o>n.lastRenderedIndex);o++){const r=t[o];if(b(r)||"function"!=typeof r.then){e.setValue(r),n.lastRenderedIndex=o;break}o<s&&r===i[o]||(n.lastRenderedIndex=2147483647,s=0,Promise.resolve(r).then(t=>{const i=n.values.indexOf(r);i>-1&&i<n.lastRenderedIndex&&(n.lastRenderedIndex=i,e.setValue(t),e.commit())}))}});
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function schedule(t){let e=0;return function wrapperFn(n){e||(e=requestAnimationFrame((function executeFrame(){e=0,t.apply(void 0,[n])})))}}function isObject(t){return t&&"object"==typeof t&&!Array.isArray(t)}function clone(t){if(void 0!==t.actions){const e=t.actions.map(t=>{const e=Object.assign({},t),n=Object.assign({},e.props);return delete n.state,delete n.api,delete e.element,e.props=n,e});t.actions=e}return function mergeDeep(t,...e){const n=e.shift();if(isObject(t)&&isObject(n))for(const e in n)if(isObject(n[e]))void 0===t[e]&&(t[e]={}),t[e]=mergeDeep(t[e],n[e]);else if(Array.isArray(n[e])){t[e]=[];for(let i of n[e])isObject(i)?t[e].push(mergeDeep({},i)):t[e].push(i)}else t[e]=n[e];return e.length?mergeDeep(t,...e):t}({},t)}function Vido(t,n){let i=0;const s=new Map;let o,r,a=new Map,l=0;const c=Promise.resolve(),d=new WeakMap;class PublicComponentMethods{constructor(t,e,n={}){this.instance=t,this.vidoInstance=e,this.props=n,this.destroy=this.destroy.bind(this),this.update=this.update.bind(this),this.change=this.change.bind(this),this.html=this.html.bind(this)}destroy(){return this.vidoInstance.debug&&(console.groupCollapsed(`destroying component ${this.instance}`),console.log(clone({components:s.keys(),actionsByInstance:a})),console.trace(),console.groupEnd()),this.vidoInstance.destroyComponent(this.instance,this.vidoInstance)}update(){return this.vidoInstance.debug&&(console.groupCollapsed(`updating component ${this.instance}`),console.log(clone({components:s.keys(),actionsByInstance:a})),console.trace(),console.groupEnd()),this.vidoInstance.updateTemplate(this.vidoInstance)}change(t,e){this.vidoInstance.debug&&(console.groupCollapsed(`changing component ${this.instance}`),console.log(clone({props:this.props,newProps:t,components:s.keys(),actionsByInstance:a})),console.trace(),console.groupEnd()),s.get(this.instance).change(t,e)}html(t={}){return s.get(this.instance).update(t,this.vidoInstance)}}function vido(){this.destroyable=[],this.onChangeFunctions=[],this.debug=!1,this.state=t,this.api=n,this.lastProps={},this.reuseComponents=this.reuseComponents.bind(this),this.onDestroy=this.onDestroy.bind(this),this.onChange=this.onChange.bind(this),this.update=this.update.bind(this)}vido.prototype.html=O,vido.prototype.svg=P,vido.prototype.directive=e,vido.prototype.asyncAppend=I,vido.prototype.asyncReplace=S,vido.prototype.cache=R,vido.prototype.classMap=E,vido.prototype.guard=k,vido.prototype.ifDefined=j,vido.prototype.repeat=F,vido.prototype.unsafeHTML=J,vido.prototype.until=Z,vido.prototype.schedule=schedule,vido.prototype.actionsByInstance=(t,e)=>{},vido.prototype.styleMap=e((t,e=!0)=>n=>{const i=n.committer.element.style;let s=d.get(n);if(void 0===s&&(s={}),e)for(const e in s)void 0===t[e]&&i.removeProperty(e);for(const e in t){const n=t[e];if(void 0===s[e]||s[e]!==n)if(e.includes("-"))i.setProperty(e,n);else try{i[e]=n}catch(t){i.setProperty(e,n)}}d.set(n,Object.assign({},t))}),vido.prototype.onDestroy=function onDestroy(t){this.destroyable.push(t)},vido.prototype.onChange=function onChange(t){this.onChangeFunctions.push(t)},vido.prototype.update=function update(){this.updateTemplate()},vido.prototype.reuseComponents=function reuseComponents(t,e,n,i,s=!0){const o=[],r=t.length,a=e.length;let l=!1,c=0;if(r<a){let s=a-r;for(;s;){const r=e[a-s],l=this.createComponent(i,n(r));t.push(l),o.push(l.instance),s--}}else if(r>a){let e=r-a;for(s&&(l=!0,c=r-e);e;){const n=r-e;s||(o.push(t[n].instance),t[n].destroy()),e--}s||(t.length=a)}let d=0;for(const i of t){const t=e[d];o.includes(i.instance)||i.change(n(t),{leave:l&&d>=c}),d++}return t};class InternalComponentMethods{constructor(t,e,n){this.instance=t,this.vidoInstance=e,this.updateFunction=n}destroy(){this.vidoInstance.debug&&(console.groupCollapsed(`component destroy method fired ${this.instance}`),console.log(clone({props:this.vidoInstance.props,components:s.keys(),destroyable:this.vidoInstance.destroyable,actionsByInstance:a})),console.trace(),console.groupEnd());for(const t of this.vidoInstance.destroyable)t();this.vidoInstance.onChangeFunctions=[],this.vidoInstance.destroyable=[]}update(t={}){return this.vidoInstance.debug&&(console.groupCollapsed(`component update method fired ${this.instance}`),console.log(clone({components:s.keys(),actionsByInstance:a})),console.trace(),console.groupEnd()),this.updateFunction(t)}change(t,e={leave:!1}){const n=t;this.vidoInstance.debug&&(console.groupCollapsed(`component change method fired ${this.instance}`),console.log(clone({props:n,components:s.keys(),onChangeFunctions:this.vidoInstance.onChangeFunctions,changedProps:t,actionsByInstance:a})),console.trace(),console.groupEnd());for(const n of this.vidoInstance.onChangeFunctions)n(t,e)}}return vido.prototype.createComponent=function createComponent(t,n={}){const o=t.name+":"+i++;let r;(r=new vido).instance=o,r.actions=function getActions(t){return e((function actionsByInstanceDirective(e,n={}){return function partial(i){const s=i.committer.element;for(const i of e)if("function"==typeof i){let e;if(a.has(t))for(const n of a.get(t))if(n.componentAction.create===i&&n.element===s){e=n;break}if(e)e.props=n;else{void 0!==s.vido&&delete s.vido;const e={instance:t,componentAction:{create:i,update(){},destroy(){}},element:s,props:n};let o=[];a.has(t)&&(o=a.get(t)),o.push(e),a.set(t,o)}}}}))}(o);const l=new PublicComponentMethods(o,r,n),c=new InternalComponentMethods(o,r,t(r,n));return s.set(o,c),s.get(o).change(n),r.debug&&(console.groupCollapsed(`component created ${o}`),console.log(clone({props:n,components:s.keys(),actionsByInstance:a})),console.trace(),console.groupEnd()),l},vido.prototype.destroyComponent=function destroyComponent(t,e){if(e.debug&&(console.groupCollapsed(`destroying component ${t}...`),console.log(clone({components:s.keys(),actionsByInstance:a})),console.trace(),console.groupEnd()),a.has(t))for(const e of a.get(t))"function"==typeof e.componentAction.destroy&&e.componentAction.destroy(e.element,e.props);a.delete(t),s.get(t).destroy(),s.delete(t),e.debug&&(console.groupCollapsed(`component destroyed ${t}`),console.log(clone({components:s.keys(),actionsByInstance:a})),console.trace(),console.groupEnd())},vido.prototype.updateTemplate=function updateTemplate(){const t=++l,e=this;c.then((function flush(){t===l&&(e.render(),l=0,e.debug&&(console.groupCollapsed("templates updated"),console.trace(),console.groupEnd()))}))},vido.prototype.createApp=function createApp(t){r=t.element;const e=this.createComponent(t.component,t.props);return o=e.instance,this.render(),e},vido.prototype.executeActions=function executeActions(){for(const t of a.values()){for(const e of t)if(void 0===e.element.vido){if("function"==typeof e.componentAction.create){const t=e.componentAction.create(e.element,e.props);this.debug&&(console.groupCollapsed(`create action executed ${e.instance}`),console.log(clone({components:s.keys(),action:e,actionsByInstance:a})),console.trace(),console.groupEnd()),void 0!==t&&("function"==typeof t?e.componentAction.destroy=t:("function"==typeof t.update&&(e.componentAction.update=t.update),"function"==typeof t.destroy&&(e.componentAction.destroy=t.destroy)))}}else e.element.vido=e.props,"function"==typeof e.componentAction.update&&(e.componentAction.update(e.element,e.props),this.debug&&(console.groupCollapsed(`update action executed ${e.instance}`),console.log(clone({components:s.keys(),action:e,actionsByInstance:a})),console.trace(),console.groupEnd()));for(const e of t)e.element.vido=e.props}},vido.prototype.render=function renderView(){M(s.get(o).update(),r),this.executeActions()},new vido}var X=function(){if("undefined"!=typeof Map)return Map;function getIndex(t,e){var n=-1;return t.some((function(t,i){return t[0]===e&&(n=i,!0)})),n}return(function(){function class_1(){this.__entries__=[]}return Object.defineProperty(class_1.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),class_1.prototype.get=function(t){var e=getIndex(this.__entries__,t),n=this.__entries__[e];return n&&n[1]},class_1.prototype.set=function(t,e){var n=getIndex(this.__entries__,t);~n?this.__entries__[n][1]=e:this.__entries__.push([t,e])},class_1.prototype.delete=function(t){var e=this.__entries__,n=getIndex(e,t);~n&&e.splice(n,1)},class_1.prototype.has=function(t){return!!~getIndex(this.__entries__,t)},class_1.prototype.clear=function(){this.__entries__.splice(0)},class_1.prototype.forEach=function(t,e){void 0===e&&(e=null);for(var n=0,i=this.__entries__;n<i.length;n++){var s=i[n];t.call(e,s[1],s[0])}},class_1}())}(),K="undefined"!=typeof window&&"undefined"!=typeof document&&window.document===document,Q="undefined"!=typeof global&&global.Math===Math?global:"undefined"!=typeof self&&self.Math===Math?self:"undefined"!=typeof window&&window.Math===Math?window:Function("return this")(),tt="function"==typeof requestAnimationFrame?requestAnimationFrame.bind(Q):function(t){return setTimeout((function(){return t(Date.now())}),1e3/60)},et=2;var nt=20,it=["top","right","bottom","left","width","height","size","weight"],st="undefined"!=typeof MutationObserver,ot=function(){function ResizeObserverController(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=function throttle(t,e){var n=!1,i=!1,s=0;function resolvePending(){n&&(n=!1,t()),i&&proxy()}function timeoutCallback(){tt(resolvePending)}function proxy(){var t=Date.now();if(n){if(t-s<et)return;i=!0}else n=!0,i=!1,setTimeout(timeoutCallback,e);s=t}return proxy}(this.refresh.bind(this),nt)}return ResizeObserverController.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},ResizeObserverController.prototype.removeObserver=function(t){var e=this.observers_,n=e.indexOf(t);~n&&e.splice(n,1),!e.length&&this.connected_&&this.disconnect_()},ResizeObserverController.prototype.refresh=function(){this.updateObservers_()&&this.refresh()},ResizeObserverController.prototype.updateObservers_=function(){var t=this.observers_.filter((function(t){return t.gatherActive(),t.hasActive()}));return t.forEach((function(t){return t.broadcastActive()})),t.length>0},ResizeObserverController.prototype.connect_=function(){K&&!this.connected_&&(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),st?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},ResizeObserverController.prototype.disconnect_=function(){K&&this.connected_&&(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},ResizeObserverController.prototype.onTransitionEnd_=function(t){var e=t.propertyName,n=void 0===e?"":e;it.some((function(t){return!!~n.indexOf(t)}))&&this.refresh()},ResizeObserverController.getInstance=function(){return this.instance_||(this.instance_=new ResizeObserverController),this.instance_},ResizeObserverController.instance_=null,ResizeObserverController}(),rt=function(t,e){for(var n=0,i=Object.keys(e);n<i.length;n++){var s=i[n];Object.defineProperty(t,s,{value:e[s],enumerable:!1,writable:!1,configurable:!0})}return t},at=function(t){return t&&t.ownerDocument&&t.ownerDocument.defaultView||Q},lt=createRectInit(0,0,0,0);function toFloat(t){return parseFloat(t)||0}function getBordersSize(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];return e.reduce((function(e,n){return e+toFloat(t["border-"+n+"-width"])}),0)}function getHTMLElementContentRect(t){var e=t.clientWidth,n=t.clientHeight;if(!e&&!n)return lt;var i=at(t).getComputedStyle(t),s=function getPaddings(t){for(var e={},n=0,i=["top","right","bottom","left"];n<i.length;n++){var s=i[n],o=t["padding-"+s];e[s]=toFloat(o)}return e}(i),o=s.left+s.right,r=s.top+s.bottom,a=toFloat(i.width),l=toFloat(i.height);if("border-box"===i.boxSizing&&(Math.round(a+o)!==e&&(a-=getBordersSize(i,"left","right")+o),Math.round(l+r)!==n&&(l-=getBordersSize(i,"top","bottom")+r)),!function isDocumentElement(t){return t===at(t).document.documentElement}(t)){var c=Math.round(a+o)-e,d=Math.round(l+r)-n;1!==Math.abs(c)&&(a-=c),1!==Math.abs(d)&&(l-=d)}return createRectInit(s.left,s.top,a,l)}var ct="undefined"!=typeof SVGGraphicsElement?function(t){return t instanceof at(t).SVGGraphicsElement}:function(t){return t instanceof at(t).SVGElement&&"function"==typeof t.getBBox};function getContentRect(t){return K?ct(t)?function getSVGContentRect(t){var e=t.getBBox();return createRectInit(0,0,e.width,e.height)}(t):getHTMLElementContentRect(t):lt}function createRectInit(t,e,n,i){return{x:t,y:e,width:n,height:i}}var dt=function(){function ResizeObservation(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=createRectInit(0,0,0,0),this.target=t}return ResizeObservation.prototype.isActive=function(){var t=getContentRect(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},ResizeObservation.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},ResizeObservation}(),ht=function ht(t,e){var n=function createReadOnlyRect(t){var e=t.x,n=t.y,i=t.width,s=t.height,o="undefined"!=typeof DOMRectReadOnly?DOMRectReadOnly:Object,r=Object.create(o.prototype);return rt(r,{x:e,y:n,width:i,height:s,top:n,right:e+i,bottom:s+n,left:e}),r}(e);rt(this,{target:t,contentRect:n})},ut=function(){function ResizeObserverSPI(t,e,n){if(this.activeObservations_=[],this.observations_=new X,"function"!=typeof t)throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=e,this.callbackCtx_=n}return ResizeObserverSPI.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof at(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)||(e.set(t,new dt(t)),this.controller_.addObserver(this),this.controller_.refresh())}},ResizeObserverSPI.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof at(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)&&(e.delete(t),e.size||this.controller_.removeObserver(this))}},ResizeObserverSPI.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},ResizeObserverSPI.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach((function(e){e.isActive()&&t.activeObservations_.push(e)}))},ResizeObserverSPI.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,e=this.activeObservations_.map((function(t){return new ht(t.target,t.broadcastRect())}));this.callback_.call(t,e,t),this.clearActive()}},ResizeObserverSPI.prototype.clearActive=function(){this.activeObservations_.splice(0)},ResizeObserverSPI.prototype.hasActive=function(){return this.activeObservations_.length>0},ResizeObserverSPI}(),pt="undefined"!=typeof WeakMap?new WeakMap:new X,ft=function ResizeObserver(t){if(!(this instanceof ResizeObserver))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var e=ot.getInstance(),n=new ut(t,e,this);pt.set(this,n)};["observe","unobserve","disconnect"].forEach((function(t){ft.prototype[t]=function(){var e;return(e=pt.get(this))[t].apply(e,arguments)}}));var mt=void 0!==Q.ResizeObserver?Q.ResizeObserver:ft;
/**
 * Main component
 *
 * @copyright Rafal Pospiech <https://neuronet.io>
 * @author    Rafal Pospiech <neuronet.io@gmail.com>
 * @package   gantt-schedule-timeline-calendar
 * @license   GPL-3.0 (https://github.com/neuronetio/gantt-schedule-timeline-calendar/blob/master/LICENSE)
 * @link      https://github.com/neuronetio/gantt-schedule-timeline-calendar
 */function Main(t,e={}){const{api:n,state:i,onDestroy:s,actions:o,update:r,schedule:a,createComponent:l,html:c}=t,d=n.name;let h,u;s(i.subscribe("config.components.List",t=>h=t)),s(i.subscribe("config.components.Chart",t=>u=t));const p=l(h);s(p.destroy);const f=l(u);let m;s(f.destroy),s(i.subscribe("config.plugins",e=>{if(void 0!==e&&Array.isArray(e))for(const n of e){const e=n(t);"function"==typeof e&&s(e)}})),s(i.subscribe("config.wrappers.Main",t=>m=t));const g=n.getActions("");let v,b,y,w,_,$,x=0,C=!1;s(i.subscribe("config.classNames",t=>{const e=i.get("config");v=n.getClass(d,{config:e}),C&&(v+=` ${d}__list-column-header-resizer--active`),b=n.getClass("vertical-scroll",{config:e}),r()}));s(i.subscribeAll(["config.height","config.headerHeight","_internal.scrollBarHeight"],()=>{const t=i.get("config"),e=i.get("_internal.scrollBarHeight"),n=t.height-t.headerHeight-e;i.update("_internal.height",n),y=`--height: ${t.height}px`,w=`height: ${n}px; width: ${e}px; margin-top: ${t.headerHeight}px;`,r()}));s(i.subscribe("_internal.list.columns.resizer.active",t=>{C=t,v=n.getClass(n.name),C&&(v+=` ${n.name}__list-column-header-resizer--active`),r()}));s(i.subscribeAll(["config.list.rows;","config.chart.items;","config.list.rows.*.parentId","config.chart.items.*.rowId"],(t,e)=>{if(i.get("_internal.flatTreeMap").length&&"subscribe"===e.type)return;const s=i.get("config.list.rows"),o=[];for(const t in s)o.push(s[t]);n.fillEmptyRowValues(o);const a=i.get("config.chart.items"),l=[];for(const t in a)l.push(a[t]);const c=n.makeTreeMap(o,l);i.update("_internal.treeMap",c),i.update("_internal.flatTreeMapById",n.getFlatTreeMapById(c)),i.update("_internal.flatTreeMap",n.flattenTreeMap(c)),r()},{bulk:!0}));s(i.subscribeAll(["config.list.rows.*.expanded","_internal.treeMap;"],()=>{const t=i.get("config.list.rows"),e=n.getRowsFromIds(n.getRowsWithParentsExpanded(i.get("_internal.flatTreeMap"),i.get("_internal.flatTreeMapById"),t),t);x=n.getRowsHeight(e),i.update("_internal.list.rowsHeight",x),i.update("_internal.list.rowsWithParentsExpanded",e),r()},{bulk:!0}));s(i.subscribeAll(["_internal.list.rowsWithParentsExpanded","config.scroll.top"],()=>{const{visibleRows:t,compensation:e}=n.getVisibleRowsAndCompensation(i.get("_internal.list.rowsWithParentsExpanded")),s=i.get("_internal.list.visibleRows");let o=!0;if(i.update("config.scroll.compensation",-e),t.length&&(o=t.some((t,e)=>void 0===s[e]||t.id!==s[e].id)),o){i.update("_internal.list.visibleRows",t);const e=[];for(const n of t)for(const t of n._internal.items)e.push(t);i.update("_internal.chart.visibleItems",e)}r()}));let M=0;s(i.subscribe("_internal.list.visibleRows;",()=>{const t=i.get("config.scroll.top");_=`height: ${x}px; width: 1px`,M!==t&&$&&(M=t,$.scrollTop=t),r()}));const O=(t,e)=>{const i=[];let s=e.leftGlobal;const o=e.rightGlobal,r=e.timePerPixel;let a=s-n.time.date(s).startOf(t),l=a/r,c=0,d=0;for(;s<o;){const e={sub:a,subPx:l,leftGlobal:s,rightGlobal:n.time.date(s).endOf(t).valueOf(),width:0,leftPx:0,rightPx:0};e.width=(e.rightGlobal-e.leftGlobal+a)/r,d=e.width>d?e.width:d,e.leftPx=c,c+=e.width,e.rightPx=c,i.push(e),s=e.rightGlobal+1,a=0,l=0}e.maxWidth[t]=d,e.dates[t]=i};s(i.subscribeAll(["config.chart.time","_internal.dimensions.width","config.scroll.left","_internal.scrollBarHeight","_internal.list.width","_internal.chart.dimensions"],()=>{const t=i.get("_internal.chart.dimensions.width");let e=n.mergeDeep({},i.get("config.chart.time"));const s=.01*(e=n.time.recalculateFromTo(e)).zoom;let o=i.get("config.scroll.left");if(e.timePerPixel=s+Math.pow(2,e.zoom),e.totalViewDurationMs=n.time.date(e.to).diff(e.from,"milliseconds"),e.totalViewDurationPx=e.totalViewDurationMs/e.timePerPixel,o>e.totalViewDurationPx&&(o=e.totalViewDurationPx-t),e.leftGlobal=o*e.timePerPixel+e.from,e.rightGlobal=e.leftGlobal+t*e.timePerPixel,e.leftInner=e.leftGlobal-e.from,e.rightInner=e.rightGlobal-e.from,e.leftPx=e.leftInner/e.timePerPixel,e.rightPx=e.rightInner/e.timePerPixel,Math.round(e.rightGlobal/e.timePerPixel)>Math.round(e.to/e.timePerPixel)){const t=(e.rightGlobal-e.to)/(e.rightGlobal-e.from);e.timePerPixel=e.timePerPixel-e.timePerPixel*t,e.leftGlobal=o*e.timePerPixel+e.from,e.rightGlobal=e.to,e.rightInner=e.rightGlobal-e.from,e.totalViewDurationMs=e.to-e.from,e.totalViewDurationPx=e.totalViewDurationMs/e.timePerPixel,e.rightInner=e.rightGlobal-e.from,e.rightPx=e.rightInner/e.timePerPixel,e.leftPx=e.leftInner/e.timePerPixel}O("day",e),O("month",e),i.update("_internal.chart.time",e),r()},{bulk:!0})),i.update("_internal.scrollBarHeight",n.getScrollBarHeight());let P=0;const D={handleEvent:a(t=>{const e=t.target.scrollTop;P!==e&&i.update("config.scroll",t=>{t.top=e,P=t.top;const n=i.get("_internal.elements.vertical-scroll-inner");if(n){const e=n.clientHeight;t.percent.top=t.top/e}return t},{only:["top","percent.top"]})}),passive:!0,capture:!1},I=t=>{t.stopPropagation(),t.preventDefault()},T={width:0,height:0};let S;const A=t=>{S||((S=new mt((e,n)=>{const s=t.clientWidth,o=t.clientHeight;T.width===s&&T.height===o||(T.width=s,T.height=o,i.update("_internal.dimensions",T))})).observe(t),i.update("_internal.elements.main",t))};g.includes(A)||g.push(A),s(()=>{S.disconnect()});const R=t=>{$||($=t,i.update("_internal.elements.vertical-scroll",t))},L=t=>{i.update("_internal.elements.vertical-scroll-inner",t)};return s=>m(c`
        <div
          class=${v}
          style=${y}
          @scroll=${I}
          @wheel=${I}
          data-actions=${o(g,Object.assign(Object.assign({},e),{api:n,state:i}))}
        >
          ${p.html()}${f.html()}
          <div
            class=${b}
            style=${w}
            @scroll=${D}
            data-action=${o([R])}
          >
            <div style=${_} data-actions=${o([L])} />
          </div>
        </div>
      `,{props:e,vido:t,templateProps:s})}
/**
 * List component
 *
 * @copyright Rafal Pospiech <https://neuronet.io>
 * @author    Rafal Pospiech <neuronet.io@gmail.com>
 * @package   gantt-schedule-timeline-calendar
 * @license   GPL-3.0 (https://github.com/neuronetio/gantt-schedule-timeline-calendar/blob/master/LICENSE)
 * @link      https://github.com/neuronetio/gantt-schedule-timeline-calendar
 */function List(t,e={}){const{api:n,state:i,onDestroy:s,actions:o,update:r,reuseComponents:a,html:l,schedule:c}=t,d=n.getActions("list");let h,u,p,f,m;s(i.subscribe("config.wrappers.List",t=>h=t)),s(i.subscribe("config.components.ListColumn",t=>u=t)),s(i.subscribe("config.list",(function onListChange(){f=i.get("config.list"),m=f.columns.percent,r()}))),s(i.subscribe("config.classNames",()=>{p=n.getClass("list",{list:f}),r()}));let g=[];s(i.subscribe("config.list.columns.data;",(function onListColumnsDataChange(t){a(g,Object.values(t),t=>({columnId:t.id}),u),r()}))),s(()=>{g.forEach(t=>t.destroy())});let v="";s(i.subscribe("config.height",t=>{v=`height: ${t}px`,r()}));const b={handleEvent:c((function onScrollHandler(t){if(t.stopPropagation(),t.preventDefault(),"scroll"===t.type)i.update("config.scroll.top",t.target.scrollTop);else{const e=n.normalizeMouseWheelEvent(t);i.update("config.scroll.top",t=>n.limitScroll("top",t+=e.y*i.get("config.scroll.yMultiplier")))}})),passive:!1};let y;function getWidth(t){y||(y=t.clientWidth,0===m&&(y=0),i.update("_internal.list.width",y),i.update("_internal.elements.list",t))}return d.push(t=>(i.update("_internal.elements.list",t),getWidth(t),{update:getWidth})),s=>h(f.columns.percent>0?l`
            <div
              class=${p}
              data-actions=${o(d,Object.assign(Object.assign({},e),{api:n,state:i}))}
              style=${v}
              @scroll=${b}
              @wheel=${b}
            >
              ${g.map(t=>t.html())}
            </div>
          `:null,{vido:t,props:{},templateProps:s})}
/**
 * ListColumn component
 *
 * @copyright Rafal Pospiech <https://neuronet.io>
 * @author    Rafal Pospiech <neuronet.io@gmail.com>
 * @package   gantt-schedule-timeline-calendar
 * @license   GPL-3.0 (https://github.com/neuronetio/gantt-schedule-timeline-calendar/blob/master/LICENSE)
 * @link      https://github.com/neuronetio/gantt-schedule-timeline-calendar
 */function ListColumn(t,e){const{api:n,state:i,onDestroy:s,actions:o,update:r,createComponent:a,reuseComponents:l,html:c,styleMap:d}=t;let h,u,p;s(i.subscribe("config.wrappers.ListColumn",t=>h=t)),s(i.subscribe("config.components.ListColumnRow",t=>u=t)),s(i.subscribe("config.components.ListColumnHeader",t=>p=t));let f,m=`config.list.columns.data.${e.columnId}`;s(i.subscribe(m,(function columnChanged(t){f=t,r()})));const g=n.getActions("list-column"),v=n.getActions("list-column-rows");let b,y,w,_,$={width:""},x={width:"",height:""},C={width:"",height:"",transform:""};s(i.subscribe("config.classNames",t=>{b=n.getClass("list-column",{column:f}),y=n.getClass("list-column-rows",{column:f}),r()}));s(i.subscribeAll(["config.list.columns.percent","config.list.columns.resizer.width",`config.list.columns.data.${f.id}.width`,"_internal.chart.dimensions.width","_internal.height","config.scroll.compensation"],()=>{const t=i.get("config.list"),e=i.get("config.scroll.compensation");w=t.columns.data[f.id].width*t.columns.percent*.01,_=w+t.columns.resizer.width;const n=i.get("_internal.height");$.width=_+"px",x.width=_+"px",x.height=n+"px",C.width=_+"px",C.height=n+"px",C.transform=`translate(0px, ${e}px)`},{bulk:!0}));let M=[];s(i.subscribe("_internal.list.visibleRows;",t=>{l(M,t,t=>t&&{columnId:e.columnId,rowId:t.id,width:_},u),r()})),s((function rowsDestroy(){M.forEach(t=>t.destroy())}));const O=a(p,{columnId:e.columnId});function getRowHtml(t){return t.html()}return s(O.destroy),s=>h(c`
        <div
          class=${b}
          data-actions=${o(g,{column:f,state:i,api:n})}
          style=${d($)}
        >
          ${O.html()}
          <div
            class=${y}
            style=${d(x)}
            data-actions=${o(v,{api:n,state:i})}
          >
            <div class=${y+"--scroll-compensation"} style=${d(C)}>
              ${M.map(getRowHtml)}
            </div>
          </div>
        </div>
      `,{vido:t,props:e,templateProps:s})}
/**
 * ListColumnHeader component
 *
 * @copyright Rafal Pospiech <https://neuronet.io>
 * @author    Rafal Pospiech <neuronet.io@gmail.com>
 * @package   gantt-schedule-timeline-calendar
 * @license   GPL-3.0 (https://github.com/neuronetio/gantt-schedule-timeline-calendar/blob/master/LICENSE)
 * @link      https://github.com/neuronetio/gantt-schedule-timeline-calendar
 */function ListColumnHeader(t,e){const{api:n,state:i,onDestroy:s,actions:o,update:r,createComponent:a,html:l}=t;let c;s(i.subscribe("config.wrappers.ListColumnHeader",t=>c=t));const d=n.getActions("list-column-header");let h;s(i.subscribe("config.components.ListColumnHeaderResizer",t=>h=t));const u=a(h,{columnId:e.columnId});let p;s(u.destroy),s(i.subscribe("config.components.ListExpander",t=>p=t));const f=a(p,{});let m,g,v,b;return s(f.destroy),s(i.subscribe(`config.list.columns.data.${e.columnId}`,t=>{m=t,r()})),s(i.subscribeAll(["config.classNames","config.headerHeight"],()=>{const t=i.get("config");g=n.getClass("list-column-header",{column:m}),v=n.getClass("list-column-header-content",{column:m}),b=`--height: ${t.headerHeight}px;height:${t.headerHeight}px;`,r()})),s=>c(l`
        <div class=${g} style=${b} data-actions=${o(d,{column:m,api:n,state:i})}>
          ${"boolean"==typeof m.expander&&m.expander?function withExpander(){return l`
      <div class=${v}>
        ${f.html()}${u.html(m)}
      </div>
    `}():function withoutExpander(){return l`
      <div class=${v}>
        ${u.html(m)}
      </div>
    `}()}
        </div>
      `,{vido:t,props:e,templateProps:s})}
/**
 * ListColumnHeaderResizer component
 *
 * @copyright Rafal Pospiech <https://neuronet.io>
 * @author    Rafal Pospiech <neuronet.io@gmail.com>
 * @package   gantt-schedule-timeline-calendar
 * @license   GPL-3.0 (https://github.com/neuronetio/gantt-schedule-timeline-calendar/blob/master/LICENSE)
 * @link      https://github.com/neuronetio/gantt-schedule-timeline-calendar
 */function ListColumnHeaderResizer(t,e){const{api:n,state:i,onDestroy:s,update:o,html:r,actions:a}=t,l="list-column-header-resizer",c=n.getActions(l);let d,h,u,p,f,m,g,v,b;s(i.subscribe("config.wrappers.ListColumnHeaderResizer",t=>d=t)),s(i.subscribe(`config.list.columns.data.${e.columnId}`,t=>{h=t,o()}));let y=!1;s(i.subscribe("config.classNames",t=>{u=n.getClass(l,{column:h}),p=n.getClass(l+"-container",{column:h}),f=n.getClass(l+"-dots",{column:h}),m=n.getClass(l+"-dots-dot",{column:h}),g=n.getClass(l+"-line",{column:h}),o()})),s(i.subscribeAll([`config.list.columns.data.${h.id}.width`,"config.list.columns.percent","config.list.columns.resizer.width","config.list.columns.resizer.inRealTime"],(t,e)=>{const n=i.get("config.list");v=h.width*n.columns.percent*.01,b=`width: ${n.columns.resizer.width}px`,y=n.columns.resizer.inRealTime,o()}));let w=[1,2,3,4,5,6,7,8];s(i.subscribe("config.list.columns.resizer.dots",t=>{w=[];for(let e=0;e<t;e++)w.push(e);o()}));let _=!1,$=v;const x=`config.list.columns.data.${h.id}.width`;function onMouseDown(t){_=!0,i.update("_internal.list.columns.resizer.active",!0)}function onMouseMove(t){if(_){let e=i.get("config.list.columns.minWidth");"number"==typeof h.minWidth&&(e=h.minWidth),($+=t.movementX)<e&&($=e),y&&i.update(x,$)}}function onMouseUp(t){_&&(i.update("_internal.list.columns.resizer.active",!1),i.update(x,$),_=!1)}return document.body.addEventListener("mousemove",onMouseMove),s(()=>document.body.removeEventListener("mousemove",onMouseMove)),document.body.addEventListener("mouseup",onMouseUp),s(()=>document.body.removeEventListener("mouseup",onMouseUp)),s=>d(r`
        <div class=${u} data-actions=${a(c,{column:h,api:n,state:i})}>
          <div class=${p}>
            ${h.header.html?r`
                  ${h.header.html}
                `:h.header.content}
          </div>
          <div class=${f} style=${"--"+b} @mousedown=${onMouseDown}>
            ${w.map(t=>r`
                  <div class=${m} />
                `)}
          </div>
        </div>
      `,{vido:t,props:e,templateProps:s})}
/**
 * ListColumnRow component
 *
 * @copyright Rafal Pospiech <https://neuronet.io>
 * @author    Rafal Pospiech <neuronet.io@gmail.com>
 * @package   gantt-schedule-timeline-calendar
 * @license   GPL-3.0 (https://github.com/neuronetio/gantt-schedule-timeline-calendar/blob/master/LICENSE)
 * @link      https://github.com/neuronetio/gantt-schedule-timeline-calendar
 */function ListColumnRow(t,e){const{api:n,state:i,onDestroy:s,actions:o,update:r,html:a,createComponent:l,onChange:c,styleMap:d}=t;let h,u;s(i.subscribe("config.wrappers.ListColumnRow",t=>h=t)),s(i.subscribe("config.components.ListExpander",t=>u=t));let p,f,m=`_internal.flatTreeMapById.${e.rowId}`,g=i.get(m),v=`config.list.columns.data.${e.columnId}`,b=i.get(v),y={width:e.width+"px",height:g.height+"px",opacity:"1",pointerEvents:"all","--height":g.height+"px"};const w=l(u,{row:g});c((t,n)=>{if(n.leave)return y.opacity="0",y.pointerEvents="none",void r();const s=(e=t).rowId,o=e.columnId;p&&p(),f&&f(),m=`_internal.flatTreeMapById.${s}`,v=`config.list.columns.data.${o}`,p=i.subscribe(m,t=>{g=t,y["--height"]=g.height+"px",y.width=e.width+"px",y.height=g.height+"px",y.opacity="1",y.pointerEvents="all";for(let t of g._internal.parents){const e=i.get(`_internal.flatTreeMapById.${t}`);"object"==typeof e.style&&"Object"===e.style.constructor.name&&"string"==typeof e.style.children&&(y=Object.assign(Object.assign({},y),e.style.children))}"object"==typeof g.style&&"Object"===g.style.constructor.name&&"string"==typeof g.style.current&&(y=Object.assign(Object.assign({},y),g.style.current)),r()}),w&&w.change({row:g}),f=i.subscribe(v,t=>{b=t,r()})}),s(()=>{w&&w.destroy(),f(),p()});const _=n.getActions("list-column-row");let $;return s(i.subscribe("config.classNames",t=>{$=n.getClass("list-column-row"),r()})),function updateTemplate(s){return h(a`
        <div
          class=${$}
          style=${d(y)}
          data-actions=${o(_,{column:b,row:g,api:n,state:i})}
        >
          ${"boolean"==typeof b.expander&&b.expander?w.html():""}
          <div class=${$+"-content"}>${"string"==typeof b.html?function getHtml(){return"function"==typeof b.data?a`
        ${b.data(g)}
      `:a`
      ${g[b.data]}
    `}():function getText(){return"function"==typeof b.data?b.data(g):g[b.data]}()}</div>
        </div>
      `,{vido:t,props:e,templateProps:s})}}
/**
 * ListExpander component
 *
 * @copyright Rafal Pospiech <https://neuronet.io>
 * @author    Rafal Pospiech <neuronet.io@gmail.com>
 * @package   gantt-schedule-timeline-calendar
 * @license   GPL-3.0 (https://github.com/neuronetio/gantt-schedule-timeline-calendar/blob/master/LICENSE)
 * @link      https://github.com/neuronetio/gantt-schedule-timeline-calendar
 */function ListExpander(t,e){const{api:n,state:i,onDestroy:s,actions:o,update:r,html:a,createComponent:l,onChange:c}=t,d=n.getActions("list-expander");let h,u,p,f,m,g=[];s(i.subscribe("config.components.ListToggle",t=>m=t));const v=l(m,e.row?{row:e.row}:{});let b;if(s(v.destroy),s(i.subscribe("config.wrappers.ListExpander",t=>b=t)),s(i.subscribe("config.classNames",t=>{h=n.getClass("list-expander"),f=n.getClass("list-expander-padding"),r()})),s(i.subscribeAll(["config.list.expander.padding"],t=>{u=t,r()})),e.row){let t;c(n=>{e=n,t&&t(),t=i.subscribe(`_internal.list.rows.${e.row.id}.parentId`,(function parentChanged(t){p="width:"+e.row._internal.parents.length*u+"px",g=e.row._internal.children,r()})),v.change(e)}),s((function listExpanderDestroy(){t&&t()}))}else p="width:0px",g=[];return s=>b(a`
        <div class=${h} data-action=${o(d,{row:e.row,api:n,state:i})}>
          <div class=${f} style=${p}></div>
          ${g.length||!e.row?v.html():""}
        </div>
      `,{vido:t,props:e,templateProps:s})}
/**
 * ListToggle component
 *
 * @copyright Rafal Pospiech <https://neuronet.io>
 * @author    Rafal Pospiech <neuronet.io@gmail.com>
 * @package   gantt-schedule-timeline-calendar
 * @license   GPL-3.0 (https://github.com/neuronetio/gantt-schedule-timeline-calendar/blob/master/LICENSE)
 * @link      https://github.com/neuronetio/gantt-schedule-timeline-calendar
 */function ListToggle(t,e){const{api:n,state:i,onDestroy:s,actions:o,update:r,html:a,unsafeHTML:l,onChange:c}=t;let d;s(i.subscribe("config.wrappers.ListToggle",t=>d=t));const h=n.getActions("list-expander-toggle");let u,p,f,m,g,v,b=!1;if(s(i.subscribe("config.classNames",t=>{u=n.getClass("list-expander-toggle"),f=n.getClass("list-expander-toggle-open"),m=n.getClass("list-expander-toggle-closed"),r()})),s(i.subscribeAll(["config.list.expander.size","config.list.expander.icons"],()=>{const t=i.get("config.list.expander");p=`--size: ${t.size}px`,g=t.icons.open,v=t.icons.closed,r()})),e.row){function expandedChange(t){b=t,r()}let t;function onPropsChange(n){e=n,t&&t(),t=i.subscribe(`config.list.rows.${e.row.id}.expanded`,expandedChange)}c(onPropsChange),s((function listToggleDestroy(){t&&t()}))}else{function expandedChange(t){for(const e of t)if(e.value){b=!0;break}r()}s(i.subscribe("config.list.rows.*.expanded",expandedChange,{bulk:!0}))}function toggle(){b=!b,e.row?i.update(`config.list.rows.${e.row.id}.expanded`,b):i.update("config.list.rows",t=>{for(const e in t)t[e].expanded=b;return t},{only:["*.expanded"]})}return function updateTemplate(s){return d(a`
        <div
          class=${u}
          data-actions=${o(h,{row:e.row,api:n,state:i})}
          style=${p}
          @click=${toggle}
        >
          ${b?a`
                <div class=${f}>
                  ${l(g)}
                </div>
              `:a`
                <div class=${m}>
                  ${l(v)}
                </div>
              `}
        </div>
      `,{vido:t,props:e,templateProps:s})}}
/**
 * Chart component
 *
 * @copyright Rafal Pospiech <https://neuronet.io>
 * @author    Rafal Pospiech <neuronet.io@gmail.com>
 * @package   gantt-schedule-timeline-calendar
 * @license   GPL-3.0 (https://github.com/neuronetio/gantt-schedule-timeline-calendar/blob/master/LICENSE)
 * @link      https://github.com/neuronetio/gantt-schedule-timeline-calendar
 */function Chart(t,e={}){const{api:n,state:i,onDestroy:s,actions:o,update:r,html:a,schedule:l,createComponent:c}=t,d=i.get("config.components.ChartCalendar"),h=i.get("config.components.ChartTimeline");let u;s(i.subscribe("config.wrappers.Chart",t=>u=t));const p=c(d);s(p.destroy);const f=c(h);s(f.destroy);let m,g,v,b,y="",w="",_=n.getActions("chart");s(i.subscribe("config.classNames",t=>{m=n.getClass("chart"),g=n.getClass("horizontal-scroll"),v=n.getClass("horizontal-scroll-inner"),r()})),s(i.subscribe("config.scroll.left",t=>{b&&b.scrollLeft!==t&&(b.scrollLeft=t),r()})),s(i.subscribeAll(["_internal.chart.dimensions.width","_internal.chart.time.totalViewDurationPx"],(function horizontalScroll(t,e){y=`width: ${i.get("_internal.chart.dimensions.width")}px`,w=`width: ${i.get("_internal.chart.time.totalViewDurationPx")}px; height:1px`,r()})));const $=t=>{let e,s;if("scroll"===t.type)i.update("config.scroll.left",t.target.scrollLeft),e=t.target.scrollLeft;else{const o=n.normalizeMouseWheelEvent(t),r=i.get("config.scroll.xMultiplier"),a=i.get("config.scroll.yMultiplier");t.shiftKey&&o.y?i.update("config.scroll.left",t=>e=n.limitScroll("left",t+=o.y*r)):o.x?i.update("config.scroll.left",t=>e=n.limitScroll("left",t+=o.x*r)):i.update("config.scroll.top",t=>s=n.limitScroll("top",t+=o.y*a))}const o=i.get("_internal.elements.chart"),r=i.get("_internal.elements.horizontal-scroll-inner");if(o){const t=i.get("config.scroll.left");let e=0;t&&(e=Math.round(t/(r.clientWidth-o.clientWidth)*100))>100&&(e=100),i.update("config.scroll.percent.left",e)}},x={handleEvent:l($),passive:!0,capture:!1},C={handleEvent:$,passive:!0,capture:!1},M=t=>{b||(b=t,i.update("_internal.elements.horizontal-scroll",t))},O=t=>{i.update("_internal.elements.horizontal-scroll-inner",t)};let P,D=0;return _.push(t=>{P||((P=new mt((e,n)=>{const s=t.clientWidth,o=t.clientHeight,r=s-i.get("_internal.scrollBarHeight");D!==s&&(D=s,i.update("_internal.chart.dimensions",{width:s,innerWidth:r,height:o}))})).observe(t),i.update("_internal.elements.chart",t))}),s(()=>{P.disconnect()}),e=>u(a`
        <div class=${m} data-actions=${o(_,{api:n,state:i})} @wheel=${C}>
          ${p.html()}${f.html()}
          <div class=${g} style=${y} data-actions=${o([M])} @scroll=${x}>
            <div class=${v} style=${w} data-actions=${o([O])} />
          </div>
        </div>
      `,{vido:t,props:{},templateProps:e})}
/**
 * ChartCalendar component
 *
 * @copyright Rafal Pospiech <https://neuronet.io>
 * @author    Rafal Pospiech <neuronet.io@gmail.com>
 * @package   gantt-schedule-timeline-calendar
 * @license   GPL-3.0 (https://github.com/neuronetio/gantt-schedule-timeline-calendar/blob/master/LICENSE)
 * @link      https://github.com/neuronetio/gantt-schedule-timeline-calendar
 */function ChartCalendar(t,e){const{api:n,state:i,onDestroy:s,actions:o,update:r,reuseComponents:a,html:l,repeat:c}=t,d=n.getActions("chart-calendar"),h=i.get("config.components.ChartCalendarDate");let u,p;s(i.subscribe("config.wrappers.ChartCalendar",t=>u=t)),s(i.subscribe("config.classNames",t=>{p=n.getClass("chart-calendar"),r()}));let f,m,g="";s(i.subscribe("config.headerHeight",t=>{g=`height: ${f=t}px;--calendar-height: ${f}px`,r()})),s(i.subscribe("config.chart.time.period",t=>m=t));let v=[],b=[];return s(i.subscribe("_internal.chart.time.dates",t=>{const e=n.time.date().format("YYYY-MM-DD");"object"==typeof t.day&&Array.isArray(t.day)&&t.day.length&&a(v,t.day,t=>t&&{period:"day",date:t,currentDate:e},h),"object"==typeof t.month&&Array.isArray(t.month)&&t.month.length&&a(b,t.month,t=>t&&{period:"month",date:t,currentDate:e},h),r()})),s(()=>{v.forEach(t=>t.destroy())}),d.push(t=>{i.update("_internal.elements.calendar",t)}),s=>u(l`
        <div class=${p} data-actions=${o(d,Object.assign(Object.assign({},e),{api:n,state:i}))} style=${g}>
          <div class=${p+"-dates "+p+"-dates--months"}>${b.map(t=>t.html())}</div>
          <div class=${p+"-dates "+p+"-dates--days"}>${v.map(t=>t.html())}</div>
          </div>
        </div>
      `,{props:e,vido:t,templateProps:s})}
/**
 * ChartCalendarDate component
 *
 * @copyright Rafal Pospiech <https://neuronet.io>
 * @author    Rafal Pospiech <neuronet.io@gmail.com>
 * @package   gantt-schedule-timeline-calendar
 * @license   GPL-3.0 (https://github.com/neuronetio/gantt-schedule-timeline-calendar/blob/master/LICENSE)
 * @link      https://github.com/neuronetio/gantt-schedule-timeline-calendar
 */function ChartCalendarDate(t,e){const{api:n,state:i,onDestroy:s,actions:o,update:r,onChange:a,html:l}=t,c=n.getActions("chart-calendar-date");let d;s(i.subscribe("config.wrappers.ChartCalendarDate",t=>d=t));let h,u,p,f=n.getClass("chart-calendar-date",e),m="";m=n.time.date(e.date.leftGlobal).format("YYYY-MM-DD")===e.currentDate?" current":"";const g=()=>{if(!e)return;h=i.get("_internal.chart.time"),p=`width: ${e.date.width}px; margin-left:-${e.date.subPx}px;`;const t=n.time.date(e.date.leftGlobal);m=t.format("YYYY-MM-DD")===e.currentDate?" current":t.subtract(1,"days").format("YYYY-MM-DD")===e.currentDate?" next":t.add(1,"days").format("YYYY-MM-DD")===e.currentDate?" previous":"";const s=h.maxWidth[e.period];switch(e.period){case"month":u=l`
          <div
            class=${f+"-content "+f+"-content--month"+m}
            style="margin-left:${e.date.subPx+8}px;"
          >
            ${t.format("MMMM YYYY")}
          </div>
        `,s<=100&&(u=l`
            <div class=${f+"-content "+f+"-content--month"+m}>
              ${t.format("MMM'YY")}
            </div>
          `);break;case"day":if(u=l`
          <div class=${f+"-content "+f+"-content--day _0"+m}>
            <div class=${f+"-content "+f+"-content--day-small"+m}>
              ${t.format("DD")} ${t.format("ddd")}
            </div>
          </div>
        `,s>=40&&s<50&&(u=l`
            <div class=${f+"-content "+f+"-content--day _40"+m}>
              ${t.format("DD")}
            </div>
            <div class=${f+"-content "+f+"-content--day-word"+m}>
              ${t.format("dd")}
            </div>
          `),s>=50&&s<90&&(u=l`
            <div class=${f+"-content "+f+"-content--day _50"+m}>
              ${t.format("DD")}
            </div>
            <div class=${f+"-content "+f+"-content--day-word"+m}>
              ${t.format("ddd")}
            </div>
          `),s>=90&&s<180&&(u=l`
            <div class=${f+"-content "+f+"-content--day _90"+m}>
              ${t.format("DD")}
            </div>
            <div class=${f+"-content "+f+"-content--day-word"+m}>
              ${t.format("dddd")}
            </div>
          `),s>=180&&s<400){const e=[],n=t.startOf("day");for(let t=0;t<12;t++){const i=n.add(2*t,"hours"),s=(n.add(2*t+1,"hours").endOf("hour").valueOf()-i.valueOf())/h.timePerPixel;e.push({width:s,formatted:i.format("HH")})}u=l`
            <div class=${f+"-content "+f+"-content--day _180"+m}>
              ${t.format("DD dddd")}
            </div>
            <div class=${f+"-content "+f+"-content--hours"+m}>
              ${e.map(t=>l`
                    <div
                      class="${f+"-content "+f+"-content--hours-hour"+m}"
                      style="width: ${t.width}px"
                    >
                      ${t.formatted}
                    </div>
                  `)}
            </div>
          `}if(s>=400&&s<1e3){const e=[],n=t.startOf("day");for(let t=0;t<24;t++){const i=n.add(t,"hours"),s=(n.add(t,"hours").endOf("hour").valueOf()-i.valueOf())/h.timePerPixel;e.push({width:s,formatted:i.format("HH")})}u=l`
            <div class=${f+"-content "+f+"-content--day _400"+m}>
              ${t.format("DD dddd")}
            </div>
            <div class=${f+"-content "+f+"-content--hours"+m}>
              ${e.map(t=>l`
                    <div
                      class=${f+"-content "+f+"-content--hours-hour"+m}
                      style="width: ${t.width}px"
                    >
                      ${t.formatted}
                    </div>
                  `)}
            </div>
          `}const n=`overflow:hidden; text-align:left; margin-left: ${e.date.subPx+8}px;`;if(s>=1e3&&s<2e3){const e=[],i=t.startOf("day");for(let t=0;t<24;t++){const n=i.add(t,"hours"),s=(i.add(t,"hours").endOf("hour").valueOf()-n.valueOf())/h.timePerPixel;e.push({width:s,formatted:n.format("HH:mm")})}u=l`
            <div class=${f+"-content "+f+"-content--day _1000"+m} style=${n}>
              ${t.format("DD dddd")}
            </div>
            <div class=${f+"-content "+f+"-content--hours"+m}>
              ${e.map(t=>l`
                    <div
                      class=${f+"-content "+f+"-content--hours-hour"+m}
                      style="width: ${t.width}px"
                    >
                      ${t.formatted}
                    </div>
                  `)}
            </div>
          `}if(s>=2e3&&s<5e3){const e=[],i=t.startOf("day");for(let t=0;t<48;t++){const n=i.add(30*t,"minutes"),s=(i.add(30*(t+1),"minutes").valueOf()-n.valueOf())/h.timePerPixel;e.push({width:s,formatted:n.format("HH:mm")})}u=l`
            <div class=${f+"-content "+f+"-content--day _2000"+m} style=${n}>
              ${t.format("DD dddd")}
            </div>
            <div class=${f+"-content "+f+"-content--hours"+m}>
              ${e.map(t=>l`
                    <div
                      class=${f+"-content "+f+"-content--hours-hour"+m}
                      style="width: ${t.width}px"
                    >
                      ${t.formatted}
                    </div>
                  `)}
            </div>
          `}if(s>=5e3&&s<2e4){const e=[],i=t.startOf("day");for(let t=0;t<96;t++){const n=i.add(15*t,"minutes"),s=(i.add(15*(t+1),"minutes").valueOf()-n.valueOf())/h.timePerPixel;e.push({width:s,formatted:n.format("HH:mm")})}u=l`
            <div class=${f+"-content "+f+"-content--day _5000"+m} style=${n}>
              ${t.format("DD dddd")}
            </div>
            <div class=${f+"-content "+f+"-content--hours"+m}>
              ${e.map(t=>l`
                    <div
                      class=${f+"-content "+f+"-content--hours-hour"+m}
                      style="width: ${t.width}px"
                    >
                      ${t.formatted}
                    </div>
                  `)}
            </div>
          `}if(s>=2e4){const e=[],i=t.startOf("day");for(let t=0;t<288;t++){const n=i.add(5*t,"minutes"),s=(i.add(5*(t+1),"minutes").valueOf()-n.valueOf())/h.timePerPixel;e.push({width:s,formatted:n.format("HH:mm")})}u=l`
            <div class=${f+"-content "+f+"-content--day _20000"+m} style=${n}>
              ${t.format("DD dddd")}
            </div>
            <div class=${f+"-content "+f+"-content--hours"+m}>
              ${e.map(t=>l`
                    <div
                      class=${f+"-content "+f+"-content--hours-hour"+m}
                      style="width: ${t.width}px"
                    >
                      ${t.formatted}
                    </div>
                  `)}
            </div>
          `}}r()};let v;return a((t,n)=>{if(n.leave)return p="visibility: hidden",r();e=t,v&&v(),v=i.subscribeAll(["_internal.chart.time","config.chart.calendar.vertical.smallFormat"],g,{bulk:!0})}),s(()=>{v()}),s=>d(l`
        <div
          class=${f+" "+f+"--"+e.period+m}
          style=${p}
          data-actions=${o(c,{date:e.date,period:e.period,api:n,state:i})}
        >
          ${u}
        </div>
      `,{props:e,vido:t,templateProps:s})}
/**
 * ChartTimeline component
 *
 * @copyright Rafal Pospiech <https://neuronet.io>
 * @author    Rafal Pospiech <neuronet.io@gmail.com>
 * @package   gantt-schedule-timeline-calendar
 * @license   GPL-3.0 (https://github.com/neuronetio/gantt-schedule-timeline-calendar/blob/master/LICENSE)
 * @link      https://github.com/neuronetio/gantt-schedule-timeline-calendar
 */function ChartTimeline(t,e){const{api:n,state:i,onDestroy:s,actions:o,update:r,html:a,createComponent:l}=t,c=n.getActions("chart-timeline");let d;s(i.subscribe("config.wrappers.ChartTimeline",t=>d=t));const h=i.get("config.components.ChartTimelineGrid"),u=i.get("config.components.ChartTimelineItems"),p=l(h);s(p.destroy);const f=l(u);let m,g;s(f.destroy),s(i.subscribe("config.classNames",()=>{m=n.getClass("chart-timeline"),g=n.getClass("chart-timeline-inner"),r()}));let v="",b="";return s(i.subscribeAll(["_internal.height","_internal.chart.dimensions.width","_internal.list.rowsHeight","config.scroll.compensation"],(function calculateStyle(){const t=i.get("config.scroll.compensation"),e=i.get("_internal.chart.dimensions.width"),n=i.get("_internal.list.rowsHeight"),s=e?`width: ${e}px;`:"";v=`height: ${i.get("_internal.height")}px; ${s}`,b=`height: ${n}px; ${s} transform: translate(0px, ${t}px);`,r()}))),c.push(t=>{i.update("_internal.elements.chart-timeline",t)}),s=>d(a`
        <div
          class=${m}
          style=${v}
          data-actions=${o(c,Object.assign(Object.assign({},e),{api:n,state:i}))}
          @wheel=${n.onScroll}
        >
          <div class=${g} style=${b}>
            ${p.html()}${f.html()}
          </div>
        </div>
      `,{props:e,vido:t,templateProps:s})}
/**
 * ChartTimelineGrid component
 *
 * @copyright Rafal Pospiech <https://neuronet.io>
 * @author    Rafal Pospiech <neuronet.io@gmail.com>
 * @package   gantt-schedule-timeline-calendar
 * @license   GPL-3.0 (https://github.com/neuronetio/gantt-schedule-timeline-calendar/blob/master/LICENSE)
 * @link      https://github.com/neuronetio/gantt-schedule-timeline-calendar
 */function ChartTimelineGrid(t,e){const{api:n,state:i,onDestroy:s,actions:o,update:r,html:a,reuseComponents:l}=t,c=n.getActions("chart-timeline-grid");let d;s(i.subscribe("config.wrappers.ChartTimelineGrid",t=>d=t));const h=i.get("config.components.ChartTimelineGridRow");let u,p,f;s(i.subscribe("config.classNames",()=>{u=n.getClass("chart-timeline-grid"),r()})),s(i.subscribe("config.chart.time.period",t=>p=t)),s(i.subscribe("config.chart.grid.block.onCreate",t=>f=t));let m=[];const g=[],v=new Map;let b;s(i.subscribeAll(["_internal.list.visibleRows;",`_internal.chart.time.dates.${p};`,"_internal.height","_internal.chart.dimensions.width"],()=>{const t=i.get("_internal.chart.dimensions.width"),e=i.get("_internal.height"),s=i.get(`_internal.chart.time.dates.${p}`),o=i.get("_internal.list.visibleRows");if(!s||0===s.length)return;const r=s[0].subPx;b=`height: ${e}px; width: ${t}px; transform: translate(-${r}px, 0px);`;let a=0;g.length=0;for(const e of o){const i=[];for(const t of s){let s;v.has(t.leftGlobal)?s=v.get(t.leftGlobal):(s=n.time.date(t.leftGlobal).format("YYYY-MM-DD"),v.set(t.leftGlobal,s));let o={id:e.id+":"+s,time:t,row:e,top:a};for(const t of f)o=t(o);i.push(o)}g.push({row:e,blocks:i,top:a,width:t}),a+=e.height}i.update("_internal.chart.grid.rowsWithBlocks",g)},{bulk:!0}));return s(i.subscribe("_internal.chart.grid.rowsWithBlocks",t=>{t&&(l(m,t,t=>t,h),r())})),c.includes((function bindElement(t){i.update("_internal.elements.chart-timeline-grid",t)}))||c.push(),s(()=>{m.forEach(t=>t.destroy())}),s=>d(a`
        <div class=${u} data-actions=${o(c,{api:n,state:i})} style=${b}>
          ${m.map(t=>t.html())}
        </div>
      `,{props:e,vido:t,templateProps:s})}
/**
 * ChartTimelineGridRow component
 *
 * @copyright Rafal Pospiech <https://neuronet.io>
 * @author    Rafal Pospiech <neuronet.io@gmail.com>
 * @package   gantt-schedule-timeline-calendar
 * @license   GPL-3.0 (https://github.com/neuronetio/gantt-schedule-timeline-calendar/blob/master/LICENSE)
 * @link      https://github.com/neuronetio/gantt-schedule-timeline-calendar
 */function bindElementAction(t,e){return e.state.update("_internal.elements.chart-timeline-grid-rows",(function updateGridRows(e){return void 0===e&&(e=[]),e.push(t),e}),{only:null}),{update(){},destroy(t){e.state.update("_internal.elements.chart-timeline-grid-rows",e=>e.filter(e=>e!==t))}}}function ChartTimelineGridRow(t,e){const{api:n,state:i,onDestroy:s,actions:o,update:r,html:a,reuseComponents:l,onChange:c,styleMap:d}=t;let h;s(i.subscribe("config.wrappers.ChartTimelineGridRow",t=>{h=t,r()}));const u=i.get("config.components.ChartTimelineGridRowBlock"),p=n.getActions("chart-timeline-grid-row");let f=n.getClass("chart-timeline-grid-row"),m={width:e.width+"px",height:e.row.height+"px",opacity:"1",pointerEvents:"all",overflow:"hidden"},g=[];return c((t,n)=>{if(n.leave)return m.opacity="0",m.pointerEvents="none",void r();l(g,(e=t).blocks,t=>t,u),m.opacity="1",m.pointerEvents="all",m.height=e.row.height+"px",m.width=e.width+"px",r()}),s(()=>{g.forEach(t=>t.destroy())}),-1===p.indexOf(bindElementAction)&&p.push(bindElementAction),s=>h(a`
        <div
          class=${f}
          data-actions=${o(p,{row:e.row,blocks:e.blocks,top:e.top,api:n,state:i})}
          style=${d(m)}
        >
          ${g.map(t=>t.html())}
        </div>
      `,{vido:t,props:e,templateProps:s})}
/**
 * ChartTimelineGridRowBlock component
 *
 * @copyright Rafal Pospiech <https://neuronet.io>
 * @author    Rafal Pospiech <neuronet.io@gmail.com>
 * @package   gantt-schedule-timeline-calendar
 * @license   GPL-3.0 (https://github.com/neuronetio/gantt-schedule-timeline-calendar/blob/master/LICENSE)
 * @link      https://github.com/neuronetio/gantt-schedule-timeline-calendar
 */const gt=(t,e)=>(e.state.update("_internal.elements.chart-timeline-grid-row-blocks",e=>(void 0===e&&(e=[]),e.push(t),e),{only:null}),t=>{e.state.update("_internal.elements.chart-timeline-grid-row-blocks",e=>e.filter(e=>e!==t),{only:[""]})}),vt=(t,e)=>{const{api:n,state:i,onDestroy:s,actions:o,update:r,html:a,onChange:l}=t,c=n.getActions("chart-timeline-grid-row-block");let d;s(i.subscribe("config.wrappers.ChartTimelineGridRowBlock",t=>{d=t,r()}));const h=n.time.date().startOf("day").valueOf();let u,p;const f=t=>{u=n.getClass("chart-timeline-grid-row-block"),p=u+"-content",t.leftGlobal===h&&(u+=" current")};f(e.time);let m=`width: ${e.time.width}px;height: ${e.row.height}px;`;return l((t,n)=>{if(n.leave)return m="visibility: hidden;",r();f((e=t).time),m=`width: ${e.time.width}px; height: ${e.row.height}px;`;const s=i.get("config.list.rows");for(const t of e.row._internal.parents){const e=s[t];"object"==typeof e.style&&"object"==typeof e.style.gridBlock&&"string"==typeof e.style.gridBlock.children&&(m+=e.style.gridBlock.children)}"object"==typeof e.row.style&&"object"==typeof e.row.style.gridBlock&&"string"==typeof e.row.style.gridBlock.current&&(m+=e.row.style.gridBlock.current),r()}),-1===c.indexOf(gt)&&c.push(gt),s=>d(a`
        <div class=${u} data-actions=${o(c,Object.assign(Object.assign({},e),{api:n,state:i}))} style=${m}>
          <div class=${p} />
        </div>
      `,{props:e,vido:t,templateProps:s})};
/**
 * ChartTimelineItems component
 *
 * @copyright Rafal Pospiech <https://neuronet.io>
 * @author    Rafal Pospiech <neuronet.io@gmail.com>
 * @package   gantt-schedule-timeline-calendar
 * @license   GPL-3.0 (https://github.com/neuronetio/gantt-schedule-timeline-calendar/blob/master/LICENSE)
 * @link      https://github.com/neuronetio/gantt-schedule-timeline-calendar
 */
function ChartTimelineItems(t,e={}){const{api:n,state:i,onDestroy:s,actions:o,update:r,html:a,reuseComponents:l}=t,c=n.getActions("chart-timeline-items");let d;s(i.subscribe("config.wrappers.ChartTimelineItems",t=>d=t));const h=i.get("config.components.ChartTimelineItemsRow");let u,p;s(i.subscribe("config.classNames",()=>{u=n.getClass("chart-timeline-items"),r()}));s(i.subscribeAll(["_internal.height","_internal.chart.dimensions.width"],()=>{const t=i.get("_internal.chart.dimensions.width"),e=i.get("_internal.height");p=`width: ${t}px; height: ${e}px;`}));let f=[];return s(i.subscribeAll(["_internal.list.visibleRows","config.chart.items","config.list.rows"],()=>{const t=i.get("_internal.list.visibleRows");f=l(f,t,t=>({row:t}),h),r()},{bulk:!0})),s((function destroyRows(){f.forEach(t=>t.destroy())})),s=>d(a`
        <div class=${u} style=${p} data-actions=${o(c,{api:n,state:i})}>
          ${f.map(t=>t.html())}
        </div>
      `,{props:e,vido:t,templateProps:s})}
/**
 * ChartTimelineItemsRow component
 *
 * @copyright Rafal Pospiech <https://neuronet.io>
 * @author    Rafal Pospiech <neuronet.io@gmail.com>
 * @package   gantt-schedule-timeline-calendar
 * @license   GPL-3.0 (https://github.com/neuronetio/gantt-schedule-timeline-calendar/blob/master/LICENSE)
 * @link      https://github.com/neuronetio/gantt-schedule-timeline-calendar
 */const bt=(t,e)=>(e.state.update("_internal.elements.chart-timeline-items-rows",e=>(void 0===e&&(e=[]),e.push(t),e),{only:null}),{update(){},destroy(t){e.state.update("_internal.elements.chart-timeline-items-rows",e=>e.filter(e=>e!==t))}}),yt=(t,e)=>{const{api:n,state:i,onDestroy:s,actions:o,update:r,html:a,onChange:l,reuseComponents:c,styleMap:d}=t;let h;s(i.subscribe("config.wrappers.ChartTimelineItemsRow",t=>h=t));const u=i.get("config.components.ChartTimelineItemsRowItem");let p,f,m=`_internal.flatTreeMapById.${e.row.id}._internal.items`,g={opacity:"1",pointerEvents:"all",width:"",height:"",overflow:"hidden"},v={width:"",height:"",overflow:"hidden"},b=[];const y=()=>{const t=i.get("_internal.chart");if(g.opacity="1",g.pointerEvents="all",g.width=t.dimensions.width+"px",v.width=t.time.totalViewDurationPx+"px",!e)return g.opacity="0",void(g.pointerEvents="none");g.height=e.row.height+"px",g["--row-height"]=e.row.height+"px",v.height=e.row.height+"px"};l((t,n)=>{if(n.leave)return y(),r();(t=>{m=`_internal.flatTreeMapById.${t.id}._internal.items`,"function"==typeof p&&p(),"function"==typeof f&&f(),p=i.subscribe("_internal.chart",(t,e)=>{y(),r()}),f=i.subscribe(m,e=>{b=c(b,e,e=>({row:t,item:e}),u),y(),r()})})((e=t).row)}),s(()=>{f(),p(),b.forEach(t=>t.destroy())});const w=n.getActions("chart-timeline-items-row");let _,$;return s(i.subscribe("config.classNames",()=>{_=n.getClass("chart-timeline-items-row",e),$=n.getClass("chart-timeline-items-row-inner",e),r()})),w.includes(bt)||w.push(bt),s=>h(a`
        <div
          class=${_}
          data-actions=${o(w,Object.assign(Object.assign({},e),{api:n,state:i}))}
          style=${d(g,!0)}
        >
          <div class=${$} style=${d(v)}>
            ${b.map(t=>t.html())}
          </div>
        </div>
      `,{props:e,vido:t,templateProps:s})},wt=(t,e)=>(e.state.update("_internal.elements.chart-timeline-items-row-items",(function updateRowItems(e){return void 0===e&&(e=[]),e.push(t),e}),{only:null}),{update(){},destroy(t){e.state.update("_internal.elements.chart-timeline-items-row-items",e=>e.filter(e=>e!==t))}}),_t=(t,e)=>{const{api:n,state:i,onDestroy:s,actions:o,update:r,html:a,onChange:l,styleMap:c}=t;let d;s(i.subscribe("config.wrappers.ChartTimelineItemsRowItem",t=>d=t));let h={width:"",height:"",transform:"",opacity:"1",pointerEvents:"all"},u={},p=0,f=0,m=!1;const g=()=>{if(m)return;u={};let t=i.get("_internal.chart.time");p=(e.item.time.start-t.leftGlobal)/t.timePerPixel,f=(e.item.time.end-e.item.time.start)/t.timePerPixel,f-=i.get("config.chart.spacing")||0,h.width=f+"px",h.height=e.row.height+"px",h.transform=`translate(${p}px, 0px)`,h.opacity="1",h.pointerEvents="all","object"==typeof e.item.style&&"Object"===e.item.style.constructor.name&&"string"==typeof e.item.style.current&&(u=Object.assign(Object.assign({},u),e.item.style.current)),r()};l((t,n)=>{if(n.leave)return m=!0,h.opacity="0",h.pointerEvents="none",r();m=!1,e=t,g()});const v="chart-timeline-items-row-item",b=n.getActions(v);let y,w,_;return s(i.subscribe("config.classNames",()=>{y=n.getClass(v,e),w=n.getClass(v+"-content",e),_=n.getClass(v+"-content-label",e),r()})),s(i.subscribe("_internal.chart.time",t=>{g()})),-1===b.indexOf(wt)&&b.push(wt),s=>d(a`
        <div
          class=${y}
          data-actions=${o(b,{item:e.item,row:e.row,left:p,width:f,api:n,state:i})}
          style=${c(h)}
        >
          <div class=${w} style=${c(u)}>
            <div class=${_}>${e.item.label}</div>
          </div>
        </div>
      `,{vido:t,props:e,templateProps:s})},$t=["","list","list-column","list-column-header","list-expander","list-expander-toggle","list-column-header-resizer","list-column-row","chart","chart-calendar","chart-calendar-date","chart-timeline","chart-timeline-grid","chart-timeline-grid-row","chart-timeline-grid-row-block","chart-timeline-items","chart-timeline-items-row","chart-timeline-items-row-item"];function defaultConfig(){const t=function generateEmptyActions(){const t={};return $t.forEach(e=>t[e]=[]),t}();return{plugins:[],plugin:{},height:740,headerHeight:86,components:{Main:Main,List:List,ListColumn:ListColumn,ListColumnHeader:ListColumnHeader,ListColumnHeaderResizer:ListColumnHeaderResizer,ListColumnRow:ListColumnRow,ListExpander:ListExpander,ListToggle:ListToggle,Chart:Chart,ChartCalendar:ChartCalendar,ChartCalendarDate:ChartCalendarDate,ChartTimeline:ChartTimeline,ChartTimelineGrid:ChartTimelineGrid,ChartTimelineGridRow:ChartTimelineGridRow,ChartTimelineGridRowBlock:vt,ChartTimelineItems:ChartTimelineItems,ChartTimelineItemsRow:yt,ChartTimelineItemsRowItem:_t},wrappers:{Main:t=>t,List:t=>t,ListColumn:t=>t,ListColumnHeader:t=>t,ListColumnHeaderResizer:t=>t,ListColumnRow:t=>t,ListExpander:t=>t,ListToggle:t=>t,Chart:t=>t,ChartCalendar:t=>t,ChartCalendarDate:t=>t,ChartTimeline:t=>t,ChartTimelineGrid:t=>t,ChartTimelineGridRow:t=>t,ChartTimelineGridRowBlock:t=>t,ChartTimelineItems:t=>t,ChartTimelineItemsRow:t=>t,ChartTimelineItemsRowItem:t=>t},list:{rows:{},rowHeight:40,columns:{percent:100,resizer:{width:10,inRealTime:!0,dots:6},minWidth:50,data:{}},expander:{padding:20,size:20,icons:{open:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>',closed:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>'}}},scroll:{top:0,left:0,xMultiplier:1.5,yMultiplier:1,percent:{top:0,left:0}},chart:{time:{from:0,to:0,zoom:21,period:"day",dates:{},maxWidth:{}},calendar:{vertical:{smallFormat:"YYYY-MM-DD"}},grid:{block:{onCreate:[]}},items:{},spacing:1},classNames:{},actions:t,locale:{name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekStart:1,relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},ordinal:t=>{const e=["th","st","nd","rd"],n=t%100;return`[${t}${e[(n-20)%10]||e[n]||e[0]}]`}}}}"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var xt=function createCommonjsModule(t,e){return t(e={exports:{}},e.exports),e.exports}((function(t,e){t.exports=function(){var t="millisecond",e="second",n="minute",i="hour",s="day",o="week",r="month",a="quarter",l="year",d=/^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,h=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,u=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},p={s:u,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+u(i,2,"0")+":"+u(s,2,"0")},m:function(t,e){var n=12*(e.year()-t.year())+(e.month()-t.month()),i=t.clone().add(n,r),s=e-i<0,o=t.clone().add(n+(s?-1:1),r);return Number(-(n+(e-i)/(s?i-o:o-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(c){return{M:r,y:l,w:o,d:s,h:i,m:n,s:e,ms:t,Q:a}[c]||String(c||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},f={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m="en",g={};g[m]=f;var v=function(t){return t instanceof _},b=function(t,e,n){var i;if(!t)return m;if("string"==typeof t)g[t]&&(i=t),e&&(g[t]=e,i=t);else{var s=t.name;g[s]=t,i=s}return n||(m=i),i},y=function(t,e,n){if(v(t))return t.clone();var i=e?"string"==typeof e?{format:e,pl:n}:e:{};return i.date=t,new _(i)},w=p;w.l=b,w.i=v,w.w=function(t,e){return y(t,{locale:e.$L,utc:e.$u,$offset:e.$offset})};var _=function(){function c(t){this.$L=this.$L||b(t.locale,null,!0),this.parse(t)}var u=c.prototype;return u.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(w.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(d);if(i)return n?new Date(Date.UTC(i[1],i[2]-1,i[3]||1,i[4]||0,i[5]||0,i[6]||0,i[7]||0)):new Date(i[1],i[2]-1,i[3]||1,i[4]||0,i[5]||0,i[6]||0,i[7]||0)}return new Date(e)}(t),this.init()},u.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},u.$utils=function(){return w},u.isValid=function(){return!("Invalid Date"===this.$d.toString())},u.isSame=function(t,e){var n=y(t);return this.startOf(e)<=n&&n<=this.endOf(e)},u.isAfter=function(t,e){return y(t)<this.startOf(e)},u.isBefore=function(t,e){return this.endOf(e)<y(t)},u.$g=function(t,e,n){return w.u(t)?this[e]:this.set(n,t)},u.year=function(t){return this.$g(t,"$y",l)},u.month=function(t){return this.$g(t,"$M",r)},u.day=function(t){return this.$g(t,"$W",s)},u.date=function(t){return this.$g(t,"$D","date")},u.hour=function(t){return this.$g(t,"$H",i)},u.minute=function(t){return this.$g(t,"$m",n)},u.second=function(t){return this.$g(t,"$s",e)},u.millisecond=function(e){return this.$g(e,"$ms",t)},u.unix=function(){return Math.floor(this.valueOf()/1e3)},u.valueOf=function(){return this.$d.getTime()},u.startOf=function(t,a){var c=this,d=!!w.u(a)||a,h=w.p(t),u=function(t,e){var n=w.w(c.$u?Date.UTC(c.$y,e,t):new Date(c.$y,e,t),c);return d?n:n.endOf(s)},p=function(t,e){return w.w(c.toDate()[t].apply(c.toDate(),(d?[0,0,0,0]:[23,59,59,999]).slice(e)),c)},f=this.$W,m=this.$M,g=this.$D,v="set"+(this.$u?"UTC":"");switch(h){case l:return d?u(1,0):u(31,11);case r:return d?u(1,m):u(0,m+1);case o:var b=this.$locale().weekStart||0,y=(f<b?f+7:f)-b;return u(d?g-y:g+(6-y),m);case s:case"date":return p(v+"Hours",0);case i:return p(v+"Minutes",1);case n:return p(v+"Seconds",2);case e:return p(v+"Milliseconds",3);default:return this.clone()}},u.endOf=function(t){return this.startOf(t,!1)},u.$set=function(o,a){var c,d=w.p(o),h="set"+(this.$u?"UTC":""),u=(c={},c[s]=h+"Date",c.date=h+"Date",c[r]=h+"Month",c[l]=h+"FullYear",c[i]=h+"Hours",c[n]=h+"Minutes",c[e]=h+"Seconds",c[t]=h+"Milliseconds",c)[d],p=d===s?this.$D+(a-this.$W):a;if(d===r||d===l){var f=this.clone().set("date",1);f.$d[u](p),f.init(),this.$d=f.set("date",Math.min(this.$D,f.daysInMonth())).toDate()}else u&&this.$d[u](p);return this.init(),this},u.set=function(t,e){return this.clone().$set(t,e)},u.get=function(t){return this[w.p(t)]()},u.add=function(t,a){var c,d=this;t=Number(t);var h=w.p(a),u=function(e){var n=y(d);return w.w(n.date(n.date()+Math.round(e*t)),d)};if(h===r)return this.set(r,this.$M+t);if(h===l)return this.set(l,this.$y+t);if(h===s)return u(1);if(h===o)return u(7);var p=(c={},c[n]=6e4,c[i]=36e5,c[e]=1e3,c)[h]||1,f=this.$d.getTime()+t*p;return w.w(f,this)},u.subtract=function(t,e){return this.add(-1*t,e)},u.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",i=w.z(this),s=this.$locale(),o=this.$H,r=this.$m,a=this.$M,l=s.weekdays,c=s.months,d=function(t,i,s,o){return t&&(t[i]||t(e,n))||s[i].substr(0,o)},u=function(t){return w.s(o%12||12,t,"0")},p=s.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},f={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:w.s(a+1,2,"0"),MMM:d(s.monthsShort,a,c,3),MMMM:c[a]||c(this,n),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:d(s.weekdaysMin,this.$W,l,2),ddd:d(s.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(o),HH:w.s(o,2,"0"),h:u(1),hh:u(2),a:p(o,r,!0),A:p(o,r,!1),m:String(r),mm:w.s(r,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:i};return n.replace(h,(function(t,e){return e||f[t]||i.replace(":","")}))},u.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},u.diff=function(t,c,d){var h,u=w.p(c),p=y(t),f=6e4*(p.utcOffset()-this.utcOffset()),m=this-p,g=w.m(this,p);return g=(h={},h[l]=g/12,h[r]=g,h[a]=g/3,h[o]=(m-f)/6048e5,h[s]=(m-f)/864e5,h[i]=m/36e5,h[n]=m/6e4,h[e]=m/1e3,h)[u]||m,d?g:w.a(g)},u.daysInMonth=function(){return this.endOf(r).$D},u.$locale=function(){return g[this.$L]},u.locale=function(t,e){if(!t)return this.$L;var n=this.clone();return n.$L=b(t,e,!0),n},u.clone=function(){return w.w(this.$d,this)},u.toDate=function(){return new Date(this.valueOf())},u.toJSON=function(){return this.isValid()?this.toISOString():null},u.toISOString=function(){return this.$d.toISOString()},u.toString=function(){return this.$d.toUTCString()},c}();return y.prototype=_.prototype,y.extend=function(t,e){return t(e,_,y),y},y.locale=b,y.isDayjs=v,y.unix=function(t){return y(1e3*t)},y.en=g[m],y.Ls=g,y}()}));
/**
 * Gantt-Schedule-Timeline-Calendar
 *
 * @copyright Rafal Pospiech <https://neuronet.io>
 * @author    Rafal Pospiech <neuronet.io@gmail.com>
 * @package   gantt-schedule-timeline-calendar
 * @license   GPL-3.0
 */function timeApi(t,e){const n=t.get("config.locale");return xt.locale(n,null,!0),{date:t=>t?xt(t).locale(n.name):xt().locale(n.name),recalculateFromTo(e){0!==(e={...e}).from&&(e.from=this.date(e.from).startOf("day").valueOf()),0!==e.to&&(e.to=this.date(e.to).endOf("day").valueOf());let n=Number.MAX_SAFE_INTEGER,i=0;const s=t.get("config.chart.items");if(0===Object.keys(s).length)return e;if(0===e.from||0===e.to){for(let t in s){const e=s[t];n>e.time.start&&(n=e.time.start),i<e.time.end&&(i=e.time.end)}0===e.from&&(e.from=this.date(n).startOf("day").valueOf()),0===e.to&&(e.to=this.date(i).endOf("day").valueOf())}return e}}}function Matcher(t,e="*"){this.wchar=e,this.pattern=t,this.segments=[],this.starCount=0,this.minLength=0,this.maxLength=0,this.segStartIndex=0;for(let n=0,i=t.length;n<i;n+=1){const i=t[n];i===e&&(this.starCount+=1,n>this.segStartIndex&&this.segments.push(t.substring(this.segStartIndex,n)),this.segments.push(i),this.segStartIndex=n+1)}this.segStartIndex<t.length&&this.segments.push(t.substring(this.segStartIndex)),this.starCount?(this.minLength=t.length-this.starCount,this.maxLength=1/0):this.maxLength=this.minLength=t.length}function WildcardObject(t,e,n){this.obj=t,this.delimeter=e,this.wildcard=n}Matcher.prototype.match=function match(match){if(this.pattern===this.wchar)return!0;if(0===this.segments.length)return this.pattern===match;const{length:t}=match;if(t<this.minLength||t>this.maxLength)return!1;let e=this.segments.length-1,n=match.length-1,i=!1;for(;;){const t=this.segments[e];if(e-=1,t===this.wchar)i=!0;else{const e=n+1-t.length,s=match.lastIndexOf(t,e);if(-1===s||s>e)return!1;if(i)n=s-1,i=!1;else{if(s!==e)return!1;n-=t.length}}if(0>e)break}return!0},WildcardObject.prototype.simpleMatch=function simpleMatch(t,e){if(t===e)return!0;if(t===this.wildcard)return!0;const n=t.indexOf(this.wildcard);if(n>-1){const i=t.substr(n+1);if(0===n||e.substring(0,n)===t.substring(0,n)){const t=i.length;return!(t>0)||e.substr(-t)===i}}return!1},WildcardObject.prototype.match=function match(t,e){return t===e||t===this.wildcard||e===this.wildcard||this.simpleMatch(t,e)||new Matcher(t).match(e)},WildcardObject.prototype.handleArray=function handleArray(t,e,n,i,s={}){let o=t.indexOf(this.delimeter,n),r=!1;-1===o&&(r=!0,o=t.length);const a=t.substring(n,o);let l=0;for(const n of e){const e=l.toString(),c=""===i?e:i+this.delimeter+l;(a===this.wildcard||a===e||this.simpleMatch(a,e))&&(r?s[c]=n:this.goFurther(t,n,o+1,c,s)),l++}return s},WildcardObject.prototype.handleObject=function handleObject(t,e,n,i,s={}){let o=t.indexOf(this.delimeter,n),r=!1;-1===o&&(r=!0,o=t.length);const a=t.substring(n,o);for(let n in e){n=n.toString();const l=""===i?n:i+this.delimeter+n;(a===this.wildcard||a===n||this.simpleMatch(a,n))&&(r?s[l]=e[n]:this.goFurther(t,e[n],o+1,l,s))}return s},WildcardObject.prototype.goFurther=function goFurther(t,e,n,i,s={}){return Array.isArray(e)?this.handleArray(t,e,n,i,s):this.handleObject(t,e,n,i,s)},WildcardObject.prototype.get=function get(t){return this.goFurther(t,this.obj,0,"")};class ObjectPath{static get(t,e,n=null){if(null===n&&(n=t.slice()),0===n.length||void 0===e)return e;const i=n.shift();return e.hasOwnProperty(i)?0===n.length?e[i]:ObjectPath.get(t,e[i],n):void 0}static set(t,e,n,i=null){if(null===i&&(i=t.slice()),0===i.length){for(const t in n)delete n[t];for(const t in e)n[t]=e[t];return}const s=i.shift();0!==i.length?(n.hasOwnProperty(s)||(n[s]={}),ObjectPath.set(t,e,n[s],i)):n[s]=e}}const Ct={delimeter:".",notRecursive:";",param:":",wildcard:"*",log:function log(t,e){console.debug(t,e)}},Mt={bulk:!1,debug:!1,source:"",data:void 0},Ot={only:[],source:"",debug:!1,data:void 0};function DeepState(t={},e=Ct){this.listeners=new Map,this.data=t,this.options=Object.assign(Object.assign({},Ct),e),this.id=0,this.pathGet=ObjectPath.get,this.pathSet=ObjectPath.set,this.scan=new WildcardObject(this.data,this.options.delimeter,this.options.wildcard)}DeepState.prototype.getListeners=function getListeners(){return this.listeners},DeepState.prototype.destroy=function destroy(){this.data=void 0,this.listeners=new Map},DeepState.prototype.match=function match(t,e){return t===e||(t===this.options.wildcard||e===this.options.wildcard||this.scan.match(t,e))},DeepState.prototype.getIndicesOf=function getIndicesOf(t,e){const n=t.length;if(0==n)return[];let i,s=0,o=[];for(;(i=e.indexOf(t,s))>-1;)o.push(i),s=i+n;return o},DeepState.prototype.getIndicesCount=function getIndicesCount(t,e){const n=t.length;if(0==n)return 0;let i,s=0,o=0;for(;(i=e.indexOf(t,s))>-1;)o++,s=i+n;return o},DeepState.prototype.cutPath=function cutPath(t,e){t=this.cleanNotRecursivePath(t),e=this.cleanNotRecursivePath(e);const n=this.getIndicesCount(this.options.delimeter,e),i=this.getIndicesOf(this.options.delimeter,t);return t.substr(0,i[n])},DeepState.prototype.trimPath=function trimPath(t){return(t=this.cleanNotRecursivePath(t)).charAt(0)===this.options.delimeter?t.substr(1):t},DeepState.prototype.split=function split(t){return""===t?[]:t.split(this.options.delimeter)},DeepState.prototype.isWildcard=function isWildcard(t){return t.includes(this.options.wildcard)},DeepState.prototype.isNotRecursive=function isNotRecursive(t){return t.endsWith(this.options.notRecursive)},DeepState.prototype.cleanNotRecursivePath=function cleanNotRecursivePath(t){return this.isNotRecursive(t)?t.substring(0,t.length-1):t},DeepState.prototype.hasParams=function hasParams(t){return t.includes(this.options.param)},DeepState.prototype.getParamsInfo=function getParamsInfo(t){let e={replaced:"",original:t,params:{}},n=0,i=[];for(const s of this.split(t)){e.params[n]={original:s,replaced:"",name:""};const t=new RegExp(`\\${this.options.param}([^\\${this.options.delimeter}\\${this.options.param}]+)`,"g");let o=t.exec(s);o?(e.params[n].name=o[1],t.lastIndex=0,e.params[n].replaced=s.replace(t,this.options.wildcard),i.push(e.params[n].replaced),n++):(delete e.params[n],i.push(s),n++)}return e.replaced=i.join(this.options.delimeter),e},DeepState.prototype.getParams=function getParams(t,e){if(!t)return;const n=this.split(e),i={};for(const e in t.params){i[t.params[e].name]=n[e]}return i},DeepState.prototype.subscribeAll=function subscribeAll(t,e,n=Mt){let i=[];for(const s of t)i.push(this.subscribe(s,e,n));return()=>{for(const t of i)t();i=[]}},DeepState.prototype.getCleanListenersCollection=function getCleanListenersCollection(t={}){return Object.assign({listeners:{},isRecursive:!1,isWildcard:!1,hasParams:!1,match:void 0,paramsInfo:void 0,path:void 0,count:0},t)},DeepState.prototype.getCleanListener=function getCleanListener(t,e=Mt){return{fn:t,options:Object.assign(Object.assign({},Mt),e)}},DeepState.prototype.getListenerCollectionMatch=function getListenerCollectionMatch(t,e,n){t=this.cleanNotRecursivePath(t);const i=this;return function listenerCollectionMatch(s){return e&&(s=i.cutPath(s,t)),!(!n||!i.match(t,s))||t===s}},DeepState.prototype.getListenersCollection=function getListenersCollection(t,e){if(this.listeners.has(t)){let n=this.listeners.get(t);return this.id++,n.listeners[this.id]=e,n}let n={isRecursive:!0,isWildcard:!1,hasParams:!1,paramsInfo:void 0,originalPath:t,path:t};this.hasParams(n.path)&&(n.paramsInfo=this.getParamsInfo(n.path),n.path=n.paramsInfo.replaced,n.hasParams=!0),n.isWildcard=this.isWildcard(n.path),this.isNotRecursive(n.path)&&(n.isRecursive=!1);let i=this.getCleanListenersCollection(Object.assign(Object.assign({},n),{match:this.getListenerCollectionMatch(n.path,n.isRecursive,n.isWildcard)}));return this.id++,i.listeners[this.id]=e,this.listeners.set(n.path,i),i},DeepState.prototype.subscribe=function subscribe(t,e,n=Mt,i="subscribe"){let s=this.getCleanListener(e,n);const o=this.getListenersCollection(t,s);if(o.count++,t=o.path,o.isWildcard){const r=this.scan.get(this.cleanNotRecursivePath(t));if(n.bulk){const a=[];for(const t in r)a.push({path:t,params:this.getParams(o.paramsInfo,t),value:r[t]});e(a,{type:i,listener:s,listenersCollection:o,path:{listener:t,update:void 0,resolved:void 0},options:n,params:void 0})}else for(const a in r)e(r[a],{type:i,listener:s,listenersCollection:o,path:{listener:t,update:void 0,resolved:this.cleanNotRecursivePath(a)},params:this.getParams(o.paramsInfo,a),options:n})}else e(this.pathGet(this.split(this.cleanNotRecursivePath(t)),this.data),{type:i,listener:s,listenersCollection:o,path:{listener:t,update:void 0,resolved:this.cleanNotRecursivePath(t)},params:this.getParams(o.paramsInfo,t),options:n});return this.debugSubscribe(s,o,t),this.unsubscribe(t,this.id)},DeepState.prototype.unsubscribe=function unsubscribe(t,e){const n=this.listeners,i=n.get(t);return function unsub(){delete i.listeners[e],i.count--,0===i.count&&n.delete(t)}},DeepState.prototype.same=function same(t,e){return(["number","string","undefined","boolean"].includes(typeof t)||null===t)&&e===t},DeepState.prototype.notifyListeners=function notifyListeners(t,e=[],n=!0){const i=[];for(const s in t){let{single:o,bulk:r}=t[s];for(const t of o){if(e.includes(t))continue;const s=this.debugTime(t);t.listener.fn(t.value(),t.eventInfo),n&&i.push(t),this.debugListener(s,t)}for(const t of r){if(e.includes(t))continue;const s=this.debugTime(t),o=t.value.map(t=>Object.assign(Object.assign({},t),{value:t.value()}));t.listener.fn(o,t.eventInfo),n&&i.push(t),this.debugListener(s,t)}}return i},DeepState.prototype.getSubscribedListeners=function getSubscribedListeners(t,e,n,i="update",s=null){n=Object.assign(Object.assign({},Ot),n);const o={};for(let[r,a]of this.listeners)if(o[r]={single:[],bulk:[],bulkData:[]},a.match(t)){const l=a.paramsInfo?this.getParams(a.paramsInfo,t):void 0,c=a.isRecursive||a.isWildcard?()=>this.get(this.cutPath(t,r)):()=>e,d=[{value:c,path:t,params:l}];for(const e in a.listeners){const h=a.listeners[e];h.options.bulk?o[r].bulk.push({listener:h,listenersCollection:a,eventInfo:{type:i,listener:h,path:{listener:r,update:s||t,resolved:void 0},params:l,options:n},value:d}):o[r].single.push({listener:h,listenersCollection:a,eventInfo:{type:i,listener:h,path:{listener:r,update:s||t,resolved:this.cleanNotRecursivePath(t)},params:l,options:n},value:c})}}return o},DeepState.prototype.notifySubscribedListeners=function notifySubscribedListeners(t,e,n,i="update",s=null){return this.notifyListeners(this.getSubscribedListeners(t,e,n,i,s))},DeepState.prototype.getNestedListeners=function getNestedListeners(t,e,n,i="update",s=null){const o={};for(let[r,a]of this.listeners){o[r]={single:[],bulk:[]};const l=this.cutPath(r,t);if(this.match(l,t)){const c=this.trimPath(r.substr(l.length)),d=new WildcardObject(e,this.options.delimeter,this.options.wildcard).get(c),h=a.paramsInfo?this.getParams(a.paramsInfo,t):void 0,u=[],p={};for(const e in d){const l=()=>d[e],c=[t,e].join(this.options.delimeter);for(const e in a.listeners){const d=a.listeners[e],f={type:i,listener:d,listenersCollection:a,path:{listener:r,update:s||t,resolved:this.cleanNotRecursivePath(c)},params:h,options:n};d.options.bulk?(u.push({value:l,path:c,params:h}),p[e]=d):o[r].single.push({listener:d,listenersCollection:a,eventInfo:f,value:l})}}for(const e in p){const s=p[e],l={type:i,listener:s,listenersCollection:a,path:{listener:r,update:t,resolved:void 0},options:n,params:h};o[r].bulk.push({listener:s,listenersCollection:a,eventInfo:l,value:u})}}}return o},DeepState.prototype.notifyNestedListeners=function notifyNestedListeners(t,e,n,i="update",s,o=null){return this.notifyListeners(this.getNestedListeners(t,e,n,i,o),s,!1)},DeepState.prototype.getNotifyOnlyListeners=function getNotifyOnlyListeners(t,e,n,i="update",s=null){const o={};if("object"!=typeof n.only||!Array.isArray(n.only)||void 0===n.only[0]||!this.canBeNested(e))return o;for(const r of n.only){const a=new WildcardObject(e,this.options.delimeter,this.options.wildcard).get(r);o[r]={bulk:[],single:[]};for(const e in a){const l=t+this.options.delimeter+e;for(const[c,d]of this.listeners){const h=d.paramsInfo?this.getParams(d.paramsInfo,l):void 0;if(this.match(c,l)){const u=()=>a[e],p=[{value:u,path:l,params:h}];for(const e in d.listeners){const a=d.listeners[e],f={type:i,listener:a,listenersCollection:d,path:{listener:c,update:s||t,resolved:this.cleanNotRecursivePath(l)},params:h,options:n};a.options.bulk?o[r].bulk.some(t=>t.listener===a)||o[r].bulk.push({listener:a,listenersCollection:d,eventInfo:f,value:p}):o[r].single.push({listener:a,listenersCollection:d,eventInfo:f,value:u})}}}}}return o},DeepState.prototype.notifyOnly=function notifyOnly(t,e,n,i="update",s=null){return void 0!==this.notifyListeners(this.getNotifyOnlyListeners(t,e,n,i,s))[0]},DeepState.prototype.canBeNested=function canBeNested(t){return"object"==typeof t&&null!==t},DeepState.prototype.getUpdateValues=function getUpdateValues(t,e,n){"object"==typeof t&&null!==t&&(t=Array.isArray(t)?t.slice():Object.assign({},t));let i=n;return"function"==typeof n&&(i=n(this.pathGet(e,this.data))),{newValue:i,oldValue:t}},DeepState.prototype.wildcardUpdate=function wildcardUpdate(t,e,n=Ot){n=Object.assign(Object.assign({},Ot),n);const i=this.scan.get(t),s={};for(const t in i){const n=this.split(t),{oldValue:o,newValue:r}=this.getUpdateValues(i[t],n,e);this.same(r,o)||(s[t]=r)}const o=[];for(const e in s){const i=s[e];n.only.length?o.push(this.getNotifyOnlyListeners(e,i,n,"update",t)):(o.push(this.getSubscribedListeners(e,i,n,"update",t)),this.canBeNested(i)&&o.push(this.getNestedListeners(e,i,n,"update",t))),n.debug&&this.options.log("Wildcard update",{path:e,newValue:i}),this.pathSet(this.split(e),i,this.data)}let r=[];for(const t of o)r=[...r,...this.notifyListeners(t,r)]},DeepState.prototype.update=function update(t,e,n=Ot){if(this.isWildcard(t))return this.wildcardUpdate(t,e,n);const i=this.split(t),{oldValue:s,newValue:o}=this.getUpdateValues(this.pathGet(i,this.data),i,e);if(n.debug&&this.options.log(`Updating ${t} ${n.source?`from ${n.source}`:""}`,s,o),this.same(o,s))return o;if(this.pathSet(i,o,this.data),null===(n=Object.assign(Object.assign({},Ot),n)).only)return o;if(n.only.length)return this.notifyOnly(t,o,n),o;const r=this.notifySubscribedListeners(t,o,n);return this.canBeNested(o)&&this.notifyNestedListeners(t,o,n,"update",r),o},DeepState.prototype.get=function get(t){return void 0===t||""===t?this.data:this.pathGet(this.split(t),this.data)},DeepState.prototype.debugSubscribe=function debugSubscribe(t,e,n){t.options.debug&&this.options.log("listener subscribed",n,t,e)},DeepState.prototype.debugListener=function debugListener(t,e){(e.eventInfo.options.debug||e.listener.options.debug)&&this.options.log("Listener fired",{time:Date.now()-t,info:e})},DeepState.prototype.debugTime=function debugTime(t){return t.listener.options.debug||t.eventInfo.options.debug?Date.now():0};
/**
 * Api functions
 *
 * @copyright Rafal Pospiech <https://neuronet.io>
 * @author    Rafal Pospiech <neuronet.io@gmail.com>
 * @package   gantt-schedule-timeline-calendar
 * @license   GPL-3.0
 */
const Pt="gantt-schedule-timeline-calendar";function isObject$1(t){return t&&"object"==typeof t&&!Array.isArray(t)}function mergeDeep$1(t,...e){const n=e.shift();if(isObject$1(t)&&isObject$1(n))for(const e in n)if(isObject$1(n[e]))void 0===t[e]&&(t[e]={}),t[e]=mergeDeep$1(t[e],n[e]);else if(Array.isArray(n[e])){t[e]=[];for(let i of n[e])isObject$1(i)?t[e].push(mergeDeep$1({},i)):t[e].push(i)}else t[e]=n[e];return e.length?mergeDeep$1(t,...e):t}const Dt={name:Pt,stateFromConfig:function stateFromConfig(t){const e=defaultConfig(),n=function mergeActions(t,e){const n=mergeDeep$1({},e.actions),i=mergeDeep$1({},t.actions);let s=[...Object.keys(n),...Object.keys(i)];s=s.filter(t=>s.includes(t));const o={};for(const t of s)o[t]=[],void 0!==n[t]&&Array.isArray(n[t])&&(o[t]=[...n[t]]),void 0!==i[t]&&Array.isArray(i[t])&&(o[t]=[...o[t],...i[t]]);return delete t.actions,delete e.actions,o}(t,e),i={config:mergeDeep$1({},e,t)};return i.config.actions=n,new DeepState(i,{delimeter:"."})},mergeDeep:mergeDeep$1,date:t=>t?xt(t):xt(),dayjs:xt};
/**
 * Gantt-Schedule-Timeline-Calendar
 *
 * @copyright Rafal Pospiech <https://neuronet.io>
 * @author    Rafal Pospiech <neuronet.io@gmail.com>
 * @package   gantt-schedule-timeline-calendar
 * @license   GPL-3.0
 */
function GSTC(t){const e=t.state,n=function getInternalApi(t){let e=t.get(),n=[];const i={name:Pt,debug:!1,log(...t){this.debug&&console.log.call(console,...t)},mergeDeep:mergeDeep$1,getClass(t){let e=`${Pt}__${t}`;return t===this.name&&(e=this.name),e},allActions:[],getActions(e){this.allActions.includes(e)||this.allActions.push(e);let n=t.get("config.actions."+e);return void 0===n&&(n=[]),n},isItemInViewport:(t,e,n)=>t.time.start>=e&&t.time.start<n||t.time.end>=e&&t.time.end<n,fillEmptyRowValues(t){let n=0;for(const i in t){const s=t[i];s._internal={parents:[],children:[],items:[]},"number"!=typeof s.height&&(s.height=e.config.list.rowHeight),"boolean"!=typeof s.expanded&&(s.expanded=!1),s.top=n,n+=s.height}return t},generateParents(t,e="parentId"){const n={};for(const i of t){const t=void 0!==i[e]?i[e]:"";void 0===n[t]&&(n[t]={}),n[t][i.id]=i}return n},fastTree(t,e,n=[]){const i=t[e.id];if(e._internal.parents=n,void 0===i)return e._internal.children=[],e;""!==e.id&&(n=[...n,e.id]),e._internal.children=Object.values(i);for(const e in i){const s=i[e];this.fastTree(t,s,n)}return e},makeTreeMap(t,e){const n=this.generateParents(e,"rowId");for(const e of t)e._internal.items=void 0!==n[e.id]?Object.values(n[e.id]):[];const i=this.generateParents(t);return this.fastTree(i,{id:"",_internal:{children:[],parents:[],items:[]}})},getFlatTreeMapById(t,e={}){for(const n of t._internal.children)e[n.id]=n,this.getFlatTreeMapById(n,e);return e},flattenTreeMap(t,e=[]){for(const n of t._internal.children)e.push(n.id),this.flattenTreeMap(n,e);return e},getRowsFromMap:(t,e)=>t.map(t=>e[t.id]),getRowsFromIds(t,e){const n=[];for(const i of t)n.push(e[i]);return n},getRowsWithParentsExpanded(t,e,n){const i=[];t:for(const s of t){for(const t of e[s]._internal.parents){if(!n[t].expanded)continue t}i.push(s)}return i},getRowsHeight(t){let e=0;for(let n of t)e+=n.height;return e},getVisibleRowsAndCompensation(e){const n=[];let i=0,s=0;const o=t.get("config.scroll.top"),r=t.get("_internal.height");let a=0,l=0;for(const t of e)if(a=o+r,i+t.height>=o&&i<=a&&(t.top=s,l=t.top+o-i,s+=t.height,n.push(t)),(i+=t.height)>=a)break;return{visibleRows:n,compensation:l}},normalizeMouseWheelEvent(t){let e=t.deltaX||0,n=t.deltaY||0,i=t.deltaZ||0;const s=t.deltaMode,o=parseInt(getComputedStyle(t.target).getPropertyValue("line-height"));let r=1;switch(s){case 1:r=o;break;case 2:r=window.height}return{x:e*=r,y:n*=r,z:i*=r,event:t}},limitScroll(e,n){if("top"===e){const e=t.get("_internal.list.rowsHeight")-t.get("_internal.height");return n<0?n=0:n>e&&(n=e),n}{const e=t.get("_internal.chart.time.totalViewDurationPx")-t.get("_internal.chart.dimensions.width");return n<0?n=0:n>e&&(n=e),n}},time:timeApi(t),getScrollBarHeight(){const t=document.createElement("div");t.style.visibility="hidden",t.style.height="100px",t.style.msOverflowStyle="scrollbar",document.body.appendChild(t);var e=t.offsetHeight;t.style.overflow="scroll";var n=document.createElement("div");n.style.height="100%",t.appendChild(n);var i=n.offsetHeight;return t.parentNode.removeChild(t),e-i+1},getGridBlocksUnderRect(e,n,i,s){if(!t.get("_internal.elements.main"))return[]},destroy(){e=void 0;for(const t of n)t();n=[],i.debug&&delete window.state}};return i.debug&&(window.state=t,window.api=i),i}(e),i={components:{Main:Main},scrollBarHeight:17,height:0,treeMap:{},flatTreeMap:[],flatTreeMapById:{},list:{expandedHeight:0,visibleRows:[],rows:{},width:0},dimensions:{width:0,height:0},chart:{dimensions:{width:0,innerWidth:0},visibleItems:[],time:{dates:{},timePerPixel:0,firstTaskTime:0,lastTaskTime:0,totalViewDurationMs:0,totalViewDurationPx:0,leftGlobal:0,rightGlobal:0,leftPx:0,rightPx:0,leftInner:0,rightInner:0,maxWidth:{}}},elements:{}};"boolean"==typeof t.debug&&t.debug&&(window.state=e),e.update("",t=>({config:t.config,_internal:i}));const s=Vido(e,n);return{state:e,app:s.createApp({component:Main,props:s,element:t.element})}}GSTC.api=Dt;export default GSTC;
//# sourceMappingURL=index.esm.js.map
