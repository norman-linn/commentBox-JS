const containerTag = document.querySelector(".container");

const commentBoxTag = `
<div class="commentBoxContainer">
  <textarea class="form-control commentBox" id="inputComment" placeholder="Enter your comment..."></textarea>
</div>`;

const buttonTag = `<button type="button" class="btn button">Post comment</button>`;

const showCommentTag = `<div class="showCommentContainer" id="comments"></div>`;
// containerTag.innerHTML += showCommentTag;

containerTag.innerHTML += `${commentBoxTag} ${buttonTag} ${showCommentTag}`;

const userInputTag = document.querySelector("#inputComment");
const postBtnTag = document.querySelector(".button");

let counter = 0;

postBtnTag.addEventListener("click", () => {
  if (userInputTag.value === "") {
    userInputTag.placeholder = "Please TYPE Smth Before YOU POST!";
    return;
  }

  const commentContainerTag = document.querySelector("#comments");
  const listCommentContainerTag = document.createElement("div");
  listCommentContainerTag.classList.add("commentContainer");

  const LiCommentTag = document.createElement("li");
  LiCommentTag.classList.add("commentList");
  LiCommentTag.id = counter;
  counter++;

  const trashIconTag = document.createElement("i");
  trashIconTag.classList.add("far", "fa-trash-alt", "trashIcon");
  LiCommentTag.textContent += userInputTag.value;
  userInputTag.value = "";

  listCommentContainerTag.append(LiCommentTag, trashIconTag);
  commentContainerTag.append(listCommentContainerTag);

  trashIconTag.addEventListener("click", () => {
    listCommentContainerTag.remove();
  });
});
