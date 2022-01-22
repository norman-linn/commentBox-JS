const containerTag = document.querySelector(".container");
const commentBoxTag = `
<div class="commentBoxContainer">
  <textarea class="form-control commentBox" id="inputComment" placeholder="Enter your comment..."></textarea>
</div>`;

const buttonContainerTag = `
<div class=btnContainer>
  <button type="button" class="btn postBtn">Post comment</button>
  <button type="button" class="btn btn-danger clearBtn">Clear comment</button>
</div>`;

const showCommentTag = `<div class="showCommentContainer" id="comments"></div>`;

containerTag.innerHTML += `${commentBoxTag} ${buttonContainerTag} ${showCommentTag}`;

const userInputTag = document.querySelector("#inputComment");
const postBtnTag = document.querySelector(".postBtn");
const clearBtnTag = document.querySelector(".clearBtn");
const commentContainerTag = document.querySelector("#comments");

let counter = 0;
const createCommentContainer = (valueComment) => {
  const listCommentContainerTag = document.createElement("div");
  listCommentContainerTag.classList.add("commentContainer");

  const LiCommentTag = document.createElement("li");
  LiCommentTag.classList.add("commentList");
  const newCounter = counter + 1;

  listCommentContainerTag.id = newCounter;
  LiCommentTag.append(valueComment);

  const key = `comment ${newCounter}`;
  localStorage.setItem(key, valueComment);

  const trashIconTag = document.createElement("i");
  trashIconTag.classList.add("far", "fa-trash-alt", "trashIcon");

  listCommentContainerTag.append(LiCommentTag, trashIconTag);
  commentContainerTag.append(listCommentContainerTag);

  counter += 1; // counter++

  trashIconTag.addEventListener("click", () => {
    localStorage.removeItem(key);
    listCommentContainerTag.remove();
    console.log("counterValue", counter);
  });
};

postBtnTag.addEventListener("click", () => {
  const userComment = userInputTag.value;
  if (userComment === "") {
    userInputTag.placeholder = "Please TYPE Smth Before YOU POST!";
    return;
  }
  createCommentContainer(userComment);
  userInputTag.value = "";
});

// postBtnTag.addEventListener('click', postCommentFunc);
// can also write like that but make ur function first

clearBtnTag.addEventListener("click", () => {
  if (localStorage.length === 0) return;
  counter = 0;
  localStorage.clear();
  commentContainerTag.innerHTML = "";
});

window.addEventListener("load", () => {
  let commentFromLocalStorage = [];
  for (let i = 1; i <= localStorage.length; i++) {
    commentFromLocalStorage[i] = localStorage.getItem(`comment ${i}`);
    if (commentFromLocalStorage[i] !== null) {
      createCommentContainer(commentFromLocalStorage[i]);
    }
  }
});
