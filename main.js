(()=>{"use strict";const t=(()=>{const t=[];let e;return{debug:()=>console.log(t),projectsArray:t,activeProject:e,createProject:(e,r)=>{const o=e(r);t.push(o)},switchProject:t=>{e=t}}})();t.createProject((function(t){return{todosArray:[],title:t}}),"default project"),console.log(t.projectsArray)})();