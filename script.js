const containerTag = document.querySelector(".container");
const commentBoxTag = `
<div class="commentBoxContainer">
  <textarea class="form-control commentBox" id="inputComment" placeholder="Enter your comment..."></textarea>
</div>`;

const buttonTag = `<button type="button" class="btn button">Post comment</button>`;

const showCommentTag = `<div class="showCommentContainer" id="comments"></div>`;

containerTag.innerHTML += `${commentBoxTag} ${buttonTag} ${showCommentTag}`;

const userInputTag = document.querySelector("#inputComment");
const postBtnTag = document.querySelector(".button");
const commentContainerTag = document.querySelector("#comments");

window.addEventListener("load", () => {
  for (let i = 0; i < localStorage.length; i++) {
    console.log(localStorage.getItem(i));
    if (localStorage.getItem(i) !== null) {
      showSavedComment(i);
    } else {
    }
  }
});

const showSavedComment = (index) => {
  const listCommentContainerTag = document.createElement("div");
  listCommentContainerTag.classList.add("commentContainer");

  const LiCommentTag = document.createElement("li");
  LiCommentTag.classList.add("commentList");

  LiCommentTag.append(localStorage.getItem(index));
  listCommentContainerTag.id = index;
  const trashIconTag = document.createElement("i");
  trashIconTag.classList.add("far", "fa-trash-alt", "trashIcon");

  listCommentContainerTag.append(LiCommentTag, trashIconTag);
  commentContainerTag.append(listCommentContainerTag);

  trashIconTag.addEventListener("click", () => {
    localStorage.removeItem(index);
    listCommentContainerTag.remove();
    return;
  });
};

let counter = 0;
const createCommentContainer = () => {
  const listCommentContainerTag = document.createElement("div");
  listCommentContainerTag.classList.add("commentContainer");

  const LiCommentTag = document.createElement("li");
  LiCommentTag.classList.add("commentList");
  const newCounter = counter + 1;

  const key = newCounter;
  const value = userInputTag.value;
  localStorage.setItem(key, value);

  LiCommentTag.append(localStorage.getItem(key));
  listCommentContainerTag.id = newCounter;
  counter++;
  const trashIconTag = document.createElement("i");
  trashIconTag.classList.add("far", "fa-trash-alt", "trashIcon");

  listCommentContainerTag.append(LiCommentTag, trashIconTag);
  commentContainerTag.append(listCommentContainerTag);

  trashIconTag.addEventListener("click", () => {
    localStorage.removeItem(key);
    listCommentContainerTag.remove();
    return;
  });
};

postBtnTag.addEventListener("click", () => {
  if (userInputTag.value === "") {
    userInputTag.placeholder = "Please TYPE Smth Before YOU POST!";
    return;
  }
  createCommentContainer();
  userInputTag.value = "";
});
