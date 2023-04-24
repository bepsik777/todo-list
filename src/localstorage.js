
import controllerModule from './controller';

function addToStorage(id, project) {
  const json = JSON.stringify(project);
  localStorage.setItem(id, json);
}

function populateStorage() {
  for (let i = 0; i < controllerModule.projectsArray.length; i += 1) {
    controllerModule.projectsArray[i].id = i;
  }
  localStorage.clear();
  controllerModule.projectsArray.forEach((e) => {
    console.log(e);
    addToStorage(e.id, e);
    console.log(localStorage);
  });
}

function fetchProjectsFromStorage() {
  if (localStorage.length !== 0) {
    const array = [];
    console.log(localStorage);
    const obj = JSON.parse(JSON.stringify(localStorage));
    console.log(obj);
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        console.log(JSON.parse(obj[key]));
        array.push(JSON.parse(obj[key]));
      }
    }
    array.forEach((project) => {
      controllerModule.projectsArray.push(project);
      project.rendered = false;
    });
  }
}

function isStorageSupported(globalObject, storageType) {
  try {
    const storage = globalObject[storageType];
    storage.setItem('test', 'test');
    storage.removeItem('test');
    return true;
  } catch (err) {
    return false;
  }
}


export { populateStorage, fetchProjectsFromStorage, isStorageSupported };
