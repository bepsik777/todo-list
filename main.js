(()=>{"use strict";const e=(e,t,o,c)=>({finished:!1,title:e,description:t,dueDate:o,priority:c}),t=function(e){return{todosArray:[],title:e,rendered:!1}},o={projectsArray:[],activeProject:void 0,createProject:function(e,t,o){const c=e(t);return o.push(c),c},removeProject:(e,t)=>{t.splice(e,1)},switchProject:function(e,t){this.activeProject=t[e]},createTodo:(e,t,o,c,r,n)=>{const d=t(o,c,r,n);return e.push(d),d},removeTodo:(e,t)=>{t.splice(e,1)}},c=(()=>{const t=document.querySelector("#title"),c=document.querySelector("#description"),r=document.querySelector("#end-date"),n=document.querySelector("#priority"),d=[];return{renderTodos:function e(){document.querySelectorAll(".example-todo").forEach((e=>{e.remove()}));const t=document.querySelector(".active-project");o.activeProject.todosArray.forEach((c=>{const r=document.createElement("div"),n=document.createElement("div"),a=document.createElement("input"),i=document.createElement("h3"),s=document.createElement("div"),l=function(){const t=document.createElement("button");return t.textContent="X",t.classList.add("delete-todo-button"),d.push(t),t.dataset.id=d.indexOf(t),t.addEventListener("click",(t=>{t.target.dataset.id=t.target.parentElement.parentElement.dataset.id;const c=t.target.dataset.id;o.activeProject.todosArray.splice(c,1),e(),console.log(t.target.dataset.id)})),t}();r.classList.add("example-todo"),r.dataset.id=o.activeProject.todosArray.indexOf(c),n.classList.add("check-container"),i.classList.add("todo-title"),s.classList.add("icons-container"),a.id="finished",a.type="checkbox",a.name="checkbox",i.textContent=c.title,t.append(r),r.append(n,i,s),n.append(a),s.append(l)})),console.log(o.activeProject.todosArray)},domCreateTodo:function(){const d=o.activeProject.todosArray,a=t.value,i=c.value,s=r.value,l=n.value;o.createTodo(d,e,a,i,s,l)}}})(),r=(()=>{const e=document.getElementById("create-project-button"),r=document.querySelector(".add-project"),n=document.getElementById("project-title"),d=document.querySelector(".projects-list"),a=document.querySelector(".create-todo-button"),i=[];function s(){o.projectsArray.forEach((e=>{if(!1===e.rendered){const t=document.createElement("li"),c=function(e){const t=document.createElement("p");return t.textContent=e.title,t.addEventListener("click",(e=>{!function(e){e.target.dataset.id=e.target.nextSibling.dataset.id,o.switchProject(e.target.dataset.id,o.projectsArray),console.log(o.activeProject)}(e),l(),console.log(o.activeProject)})),t}(e),r=(()=>{const e=document.createElement("button");return i.push(e),e.textContent="Delete",e.classList.add("delete-project-button"),e.dataset.id=i.indexOf(e),e.addEventListener("click",(e=>{const t=document.querySelector(".active-project");o.projectsArray[e.target.dataset.id]===o.activeProject&&t.remove(),o.removeProject(e.target.dataset.id,o.projectsArray),i.splice(e.target.dataset.id,1),e.target.parentNode.remove(),document.querySelectorAll(".delete-project-button").forEach((e=>{e.dataset.id=i.indexOf(e)})),console.log(o.projectsArray)})),e})();d.append(t),t.appendChild(c),t.appendChild(r),e.rendered=!0}}))}function l(){const e=document.querySelector(".main"),t=document.querySelector(".active-project"),r=document.createElement("div"),n=document.createElement("h2");console.log(t),null!==t&&t.remove(),void 0!==o.activeProject&&(r.classList.add("active-project"),n.textContent=o.activeProject.title,n.classList.add("rendered-project-title"),e.appendChild(r),r.appendChild(n),c.renderTodos())}return e.addEventListener("click",(()=>{""!==n.value&&(function(){const e=n.value;o.createProject(t,e,o.projectsArray),console.log(o.projectsArray)}(),n.value="",s(),e.classList.toggle("hidden"),n.classList.toggle("hidden"))})),r.addEventListener("click",(()=>{e.classList.toggle("hidden"),n.classList.toggle("hidden")})),a.addEventListener("click",(e=>{e.preventDefault(),c.domCreateTodo(),l()})),{renderProjectList:s,renderActiveProject:l}})();o.createProject(t,"hello",o.projectsArray),o.switchProject(0,o.projectsArray);const n=o.createTodo(o.activeProject.todosArray,e,"project one","this is project one",new Date(2023,5,5));r.renderProjectList(),r.renderActiveProject(),console.log(n),console.log(o.activeProject)})();