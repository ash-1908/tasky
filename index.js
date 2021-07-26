//        GLOBALS

// Array to store all the task data
let globalStore = [];

// Card Container div
const cardContainer = document.querySelector(".card__container");

// Modal-container
const modalContainer = document.querySelector(".modal__container");

// Local Storage
const updateLocalStorage = () =>
  localStorage.setItem("tasky", JSON.stringify({ tasks: globalStore }));

//        MODALS

// Add-item Modal
const addItemModal = `
<div class="modal-content">
  <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">Add Item</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
    <form class="container d-flex flex-column gap-4">
      <div>
        <label class="form-label" for="imageUrl" name="imageUrl">Image URL</label>
        <input class="form-control" type="url" id="imageUrl" name="imageUrl" placeholder="https://www.example.com/imagelink" />
      </div>
      <div>
        <label class="form-label" for="title" name="title">Task Title</label>
        <input class="form-control" type="text" id="title" name="title" placeholder="Title" />
      </div>
      <div>
        <label class="form-label" for="badge" name="badge">Task Type</label>
        <input class="form-control" type="text" id="badge" name="badge" placeholder="Type" />
      </div>
      <div>
        <label class="form-label" for="desc" name="desc">Task Description</label>
        <textarea style="height: 130px;" class="form-control" type="text" id="desc" name="desc" placeholder="Description"></textarea>
      </div>
    </form>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
      Close
    </button>
    <button type="button" class="btn btn-primary" onclick="saveNewTask()" data-bs-dismiss="modal">
      Save changes
    </button>
  </div>
</div>`;

// Open-Task Modal
const openTaskModal = ({ imageUrl, title, type, desc, updated }) => `
<div class="modal-content">
  <div class="modal-header">
    <h4 class="modal-title" id="exampleModalLabel">${title}</h4>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body border-0">
   
      <div style="width: 100%; height: 350px; margin-bottom: 5px;">
        <img src=${imageUrl} alt="${imageUrl} Poster" class="w-100 h-100 rounded" />
      </div>
      <div class="p-2">
        <p class="text__clamp fw-normal">
          ${desc}
        </p>
      </div>
      <h4 class="badge bg-secondary fw-normal m-2">
        ${type}
      </h4>
      <p class="card-text fs-6 fw-light m-2">
        <small class="text-muted" id="lastUpdate">
          Last Updated: ${updated} 
        </small>
      </p>
   
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
      Close
    </button>
  </div>
</div>
`;

// Edit-Task Modal
const editTaskModal = ({ id, imageUrl, title, type, desc }) => `
<div class="modal-content">
  <div class="modal-header">
    <h4 class="modal-title" id="exampleModalLabel">${title}</h4>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body border-0">
    <div style="width: 100%; height: 100%; margin-bottom: 10px;">
      <img src=${imageUrl} alt="${imageUrl} Poster" class="w-100 h-100 rounded" />
    </div>
    <form class="container d-flex flex-column gap-4">
      <div>
        <label class="form-label" for="imageUrl" name="imageUrl">Image URL</label>
        <input class="form-control" type="url" id="imageUrl" name="imageUrl" value="${imageUrl}" />
      </div>
      <div>
        <label class="form-label" for="title" name="title">Task Title</label>
        <input class="form-control" type="text" id="title" name="title" value="${title}" />
      </div>
      <div>
        <label class="form-label" for="badge" name="badge">Task Type</label>
        <input class="form-control" type="text" id="badge" name="badge" value="${type}" />
      </div>
      <div>
        <label class="form-label" for="desc" name="desc">Task Description</label>
        <textarea style="height: 130px;" class="form-control" type="text" id="desc" name="desc">${desc}</textarea>
      </div>
    </form>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id=${id} onclick="saveEdit.apply(this, arguments)">
      Save
    </button>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
      Close
    </button>
  </div>
</div>
`;

//        FUNCTIONS

// Function to calculate time
const calcTime = () => {
  let dateObj = new Date();
  // find day
  let day = dateObj.getDay();
  if (day === 0) day = "Sun";
  else if (day === 1) day = "Mon";
  else if (day === 2) day = "Tue";
  else if (day === 3) day = "Web";
  else if (day === 4) day = "Thu";
  else if (day === 5) day = "Fri";
  else day = "Sat";
  // get date
  let date = dateObj.getDate();
  let month = dateObj.getMonth() + 1;
  let year = dateObj.getFullYear();
  // get time
  let hour = dateObj.getHours();
  let AM = "AM";
  if (hour > 12) {
    AM = "PM";
    hour = hour - 12;
  }
  let min = dateObj.getMinutes();
  if (min < 10) min = "0" + min;

  const currTime =
    day +
    " " +
    date +
    "/" +
    month +
    "/" +
    year +
    " " +
    hour +
    ":" +
    min +
    " " +
    AM;

  return currTime;
};

// Add-item Button (Navbar)
const addItem = () => {
  modalContainer.innerHTML = addItemModal;
};

// Save-changes Button (Add-item Modal)
const saveNewTask = () => {
  const newTask = {
    id: `${Date.now()}`,
    imageUrl: document.getElementById("imageUrl").value,
    title: document.getElementById("title").value,
    type: document.getElementById("badge").value,
    desc: document.getElementById("desc").value,
    updated: calcTime(),
  };

  // checking data for null values
  if (newTask.imageUrl === "")
    newTask.imageUrl =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVv9Cztc5YU4tQFqfW0RuqNNEyRFQl25kKZw&usqp=CAU";

  if (newTask.title === "") newTask.title = "Task Title";

  if (newTask.type === "") newTask.type = "Task Type";

  if (newTask.desc === "") newTask.desc = "This is the task description.";

  // store the task data
  globalStore.push(newTask);

  // add to local storage
  updateLocalStorage();

  // load task-card
  const newCard = taskCard(newTask);
  cardContainer.insertAdjacentHTML("beforeend", newCard);
};

// Function to create a Task-Card using data from local storage
const taskCard = ({ id, imageUrl, title, type, desc, updated }) => `
<div class="col-12 col-md-6 col-lg-4 pb-3">
  <div class="card">
    
    <div class="card-header d-flex gap-2 justify-content-end">
      <button type="button" id=${id} class="btn btn-outline-primary addRad" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editTask.apply(this, arguments)">
        <i class="bi bi-pencil" id=${id} data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editTask.apply(this, arguments)"></i>
      </button>
      <button type="button" id=${id} class="btn btn-outline-danger addRad" onclick="deleteCard.apply(this, arguments)">
        <i class="bi bi-trash" id=${id} onclick="deleteCard.apply(this, arguments)"></i>
      </button>
    </div>
            
    <div class="card-body">
      
        <div style="width: 100%; height: 250px;">
          <img src=${imageUrl} alt="${title} Cover" class="w-100 h-100 rounded" />
        </div>
        <h1 class="p-2">${title}</h1>
        <div class="p-2">
          <p class="text__clamp fw-normal">
            ${desc}
          </p>
        </div>
        <h4 class="badge bg-secondary fw-normal m-2">
          ${type}
        </h4>
        <p class="card-text fs-6 fw-light m-2">
          <small class="text-muted" id="lastUpdate">
            Last Updated: ${updated}
          </small>
        </p>
      
    </div>
            
    <div class="card-footer">
      <button type="button" id=${id} data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-outline-success float-end addRad" onClick="openTask.apply(this, arguments)">
        Open Task
      </button>
    </div>
  </div>
</div>`;

// To render Task-Cards on load/reload
const loadInitialTaskCards = () => {
  // get data from local storage
  const taskData = localStorage.tasky;
  // return if no data in local storage
  if (!taskData) return;
  // get data from tasks key
  const { tasks } = JSON.parse(taskData);
  // store the data in global store
  globalStore = tasks;

  tasks.map((task) => {
    const card = taskCard(task);
    cardContainer.insertAdjacentHTML("beforeend", card);
  });
};

// Search bar functionality
const search = () => {
  // get id
  const toSearch = document.getElementById("searchBar").value;

  // find the query in global store
  const result = globalStore.filter(({title}) => title.toLowerCase().includes(toSearch.toLowerCase()));

  // load the cards from task
  const cards = result.map((task) => taskCard(task));

  // remove all task-cards
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  // load the result tasks
  cards.map((card) => cardContainer.insertAdjacentHTML("beforeend", card));
};

// Open-Task button functionality
const openTask = (event) => {
  // find the card
  event = window.event;
  const targetID = event.target.id;

  const getCardDetails = globalStore.filter((data) => data.id === targetID);

  // call the modal with these details
  modalContainer.innerHTML = openTaskModal(getCardDetails[0]);
};

// Edit-Task Modal
const editTask = (event) => {
  // find the card clicked
  event = window.event;
  const targetID = event.target.id;

  // get the card details
  let data = globalStore.filter((data) => data.id === targetID);

  // give a modal
  modalContainer.innerHTML = editTaskModal(data[0]);
};

// Save edited task
const saveEdit = (event) => {
  event = window.event;
  const targetID = event.target.id;

  // get edited details
  
    const imageUrl= document.getElementById("imageUrl").value;
    const title= document.getElementById("title").value;
    const type= document.getElementById("badge").value;
    const desc= document.getElementById("desc").value;
    const updated= calcTime();
  

  // get original details
  let originalTask = globalStore.filter((data) => data.id === targetID);
  originalTask = originalTask[0];

  // checking null values
  if(imageUrl !== "") originalTask.imageUrl = imageUrl;
  if(title !== "") originalTask.title = title;
  if(type !== "") originalTask.type = type;
  if(desc !== "") originalTask.desc = desc;
  originalTask.updated = updated;

  // push changes to global store
  globalStore = globalStore.map((data) => {
        if(data.id === targetID){
            return {
                id: data.id,
                imageUrl: originalTask.imageUrl,
                title: originalTask.title,
                type: originalTask.type,
                desc: originalTask.desc,
                updated: originalTask.updated,
            };
        }
        return data;
  });

  // update the local storage
  updateLocalStorage();

  // remove all the cards from dom
  while(cardContainer.firstChild){
    cardContainer.removeChild(cardContainer.firstChild);
  }  

  // reload cards
  loadInitialTaskCards();
};

// Delete task-card functionality
const deleteCard = (event) => {
  // find the card
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  // remove from local storage
  globalStore = globalStore.filter((data) => data.id !== targetID);
  updateLocalStorage();

  // remove from dom
  if(tagname === "BUTTON")
    return cardContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  else
    return cardContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);

};