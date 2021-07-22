// Array to store all the task data
let globalStore = [];

// Local Storage
const updateLocalStorage = () => localStorage.setItem("tasky", JSON.stringify({tasks: globalStore}));

// Modal-container
const modalContainer = document.querySelector(".modal__container");

// Add-item Modal
const addItemModal = `
<div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Item</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
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
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" onclick="saveNewTask()" data-bs-dismiss="modal">Save changes</button>
          </div>
        </div>`;

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
    };

    // checking data for null values
    if(newTask.imageUrl === "")
        newTask.imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVv9Cztc5YU4tQFqfW0RuqNNEyRFQl25kKZw&usqp=CAU";

    if(newTask.title === "")
        newTask.title = "Task Title";

    if(newTask.type === "")
        newTask.type = "Task Type";
        
    if(newTask.desc === "")
        newTask.desc = "This is the task description.";

    // store the task data
    globalStore.push(newTask);
    
    // add to local storage
    updateLocalStorage();
};  