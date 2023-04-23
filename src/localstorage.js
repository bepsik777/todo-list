
function addToStorage(id, project) {
  const json = JSON.stringify(project);
  localStorage.setItem(id, json);
  console.log(localStorage);
}


export { addToStorage };
