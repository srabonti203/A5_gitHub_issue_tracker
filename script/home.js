const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
const cartContainer = document.getElementById("cart-container");
const filteredSection = document.getElementById("filtered-section");
const issueCount = document.getElementById("issue-count");
const losdingSpinner = document.getElementById("losdingSpinner");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let allIssues = [];
let openIssues = [];
let closedIssues = [];

//loading spinner function
function showSpinner() {
  losdingSpinner.classList.remove("hidden");
  cartContainer.classList.add("hidden");
}
function hideSpinner() {
  losdingSpinner.classList.add("hidden");
  cartContainer.classList.remove("hidden");
}

//toggle btn
function toggleStyle(id) {
  allBtn.classList.remove("btn-primary");
  openBtn.classList.remove("btn-primary");
  closedBtn.classList.remove("btn-primary");

  allBtn.classList.add("btn-soft");
  openBtn.classList.add("btn-soft");
  closedBtn.classList.add("btn-soft");

  let selected = document.getElementById(id);
  selected.classList.remove("btn-soft");
  selected.classList.add("btn-primary");

  if (id == "all-btn") {
    displayIssue(allIssues);
    issueCount.innerText = allIssues.length;
  }
  if (id == "open-btn") {
    displayIssue(openIssues);
    issueCount.innerText = openIssues.length;
  }
  if (id == "closed-btn") {
    displayIssue(closedIssues);
    issueCount.innerText = closedIssues.length;
  }
}
//dynamically show labels
const creatElements = (arr) => {
  const htmlElements = arr.map((el) => {
    let colour = "";
    let icon = "";
    if (el == "bug") {
      icon = '<i class="fa-solid fa-bug"></i>';
      colour = "btn-secondary";
    } else if (el == "help wanted") {
      colour = "btn-warning";
      icon = '<i class="fa-solid fa-life-ring"></i>';
    } else if (el == "enhancement") {
      colour = "btn-success";
      icon = '<i class="fa-solid fa-wand-magic-sparkles"></i>';
    } else if (el == "good first issue") {
      colour = "btn-info";
      icon = '<i class="fa-brands fa-first-order"></i>';
    } else {
      colour = "btn-primary";
      icon = '<i class="fa-solid fa-file"></i>';
    }
    return `<button class="btn w-41 rounded-full btn-outline ${colour}">${icon}${el}</button>`;
  });
  return htmlElements.join(" ");
};

const findIssues = (findIssue) => {
  //find open status and send it to the openissue array
  openIssues = findIssue.filter((issue) => issue.status === "open");
  closedIssues = findIssue.filter((issue) => issue.status === "closed");
};

//2. all issues are loaded using this function
const loadIssue = () => {
  showSpinner();
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      allIssues = json.data;
      findIssues(allIssues);
      displayIssue(allIssues);
      issueCount.innerText = allIssues.length;
      hideSpinner();
    });
};

//3 issues are displayed using this function
const displayIssue = (issues) => {
  cartContainer.innerHTML = "";
  for (let issue of issues) {
    //show colours on label btn dynamically
    let priorityClass = "";
    let borderColour = "";
    let checkIcon = "";
    if (issue.priority == "high") {
      priorityClass = "btn-secondary";
    } else if (issue.priority == "medium") {
      priorityClass = "btn-warning";
    } else if (issue.priority == "low") {
      priorityClass = "";
    }
    if (issue.status == "open") {
      borderColour = "border-green-600";
      checkIcon = "./assets/Open-Status.png";
    } else if (issue.status == "closed") {
      borderColour = "border-purple-600";
      checkIcon = "./assets/Closed- Status .png";
    }
    let cartDiv = document.createElement("div");
    cartDiv.innerHTML = `
    <div class="card w-full h-106 bg-base-100 card-xl shadow-sm  space-y-3 border-t-4 ${borderColour}">
            <div class="p-4 space-y-3">
              <div class="flex items-center justify-between">
              <img src="${checkIcon}" alt="">
              <button class="btn rounded-full btn-outline ${priorityClass}">${issue.priority}</button>
            </div>
            <div class=" space-y-3">
              <h3 class="font-bold text-xl">${issue.title}</h3>
              <p class="text-gray-500">${issue.description}</p>
              <div class="flex flex-col gap-2">
                ${creatElements(issue.labels)}
              </div>
            </div>
            </div>
            <hr class="border-gray-300 border-1">
            <div class="text-gray-400 px-4 pb-4 space-y-3">
              <p>${issue.id} by ${issue.author}</p>
              <p>${issue.createdAt}</p>
            </div>
          </div> 
    `;
    cartContainer.appendChild(cartDiv);
  }
};
loadIssue(); //1.all the functionality starts from here

//search issues
searchBtn.addEventListener("click", () => {
  const inputVal = searchInput.value.trim().toLowerCase();
  if (inputVal === "") {
    displayIssue(allIssues);
    issueCount.innerText = allIssues.length;
    return;
  }
  const filterIssue = allIssues.filter((issue) => {
    return issue.title.toLowerCase().includes(inputVal);
  });
  displayIssue(filterIssue);
  issueCount.innerText = filterIssue.length;

  allBtn.classList.remove("btn-primary");
  openBtn.classList.remove("btn-primary");
  closedBtn.classList.remove("btn-primary");

  allBtn.classList.add("btn-soft");
  openBtn.classList.add("btn-soft");
  closedBtn.classList.add("btn-soft");
});
searchInput.addEventListener("input", (e) => {
  const inputVal = searchInput.value.trim().toLowerCase();
  if (e.target.value == "") {
    displayIssue(allIssues);
    issueCount.innerText = allIssues.length;
  }
});

// modal functionality
const loadModal = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayModal(details.data);
};
const displayModal = (issue) => {
  const detailBox = document.getElementById("detail-box");
  // console.log(word);
  detailBox.innerHTML = `
  <h2>${issue.title}</h2>
      <div class="flex items-center gap-2">
        <button class="btn ${issue.status == "open" ? "btn-success" : "bg-purple-800"}">${issue.status}</button>
        <div class="w-2 h-2 rounded-full bg-gray-600"></div>
        <p>${issue.status == "open" ? `Opened by ${issue.assignee}` : `Closed by ${issue.assignee}`}</p>
        <div class="w-2 h-2 rounded-full bg-gray-600"></div>
        <p>${issue.}</>
      </div>
      <div class="flex gap-2">
        <button class="btn">fg</button>
        <button class="btn">fg</button>
      </div>
      <p>dfjhgdlrghdruighsdrgu</p>
      <div class="flex items-center gap-5 bg-base-200 p-4">
        <div>
          <p>fhgbfj</p>
          <h3>fdgfdh</h3>
        </div>
        <div>
          <p>fhgbfj</p>
          <h3>fdgfdh</h3>
        </div>
      </div>
  `;
};
