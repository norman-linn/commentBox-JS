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

let counter = 1;
const createCommentContainer = () => {
  const commentContainerTag = document.querySelector("#comments");

  // div.listCommentContainer > liTag + trashIcon
  const listCommentContainerTag = document.createElement("div");
  listCommentContainerTag.classList.add("commentContainer");

  // create liTag later 'll append it to listCommentContainer
  const LiCommentTag = document.createElement("li");
  LiCommentTag.classList.add("commentList");
  LiCommentTag.id = counter; // save with id

  const key = `comment ${counter}`; // counter will be 1 because increment on the above.
  const value = userInputTag.value;
  localStorage.setItem(key, value);

  LiCommentTag.append(localStorage.getItem(key));
  // console.log(localStorage.getItem(key));

  // create trashIcon
  const trashIconTag = document.createElement("i");
  trashIconTag.classList.add("far", "fa-trash-alt", "trashIcon");

  listCommentContainerTag.append(LiCommentTag, trashIconTag);
  commentContainerTag.append(listCommentContainerTag);

  trashIconTag.addEventListener("click", () => {
    listCommentContainerTag.remove();
  });

  counter++;
};

postBtnTag.addEventListener("click", () => {
  // empty => do nth/return
  if (userInputTag.value === "") {
    userInputTag.placeholder = "Please TYPE Smth Before YOU POST!";
    return;
  }
  createCommentContainer();
  userInputTag.value = "";
});

window.addEventListener("load", () => {
  counter = 1;

  while (counter <= localStorage.length) {
    const commentContainerTag = document.querySelector("#comments");

    // div.listCommentContainer > liTag + trashIcon
    const listCommentContainerTag = document.createElement("div");
    listCommentContainerTag.classList.add("commentContainer");

    // create liTag later 'll append it to listCommentContainer
    const LiCommentTag = document.createElement("li");
    LiCommentTag.classList.add("commentList");
    LiCommentTag.id = counter; // save with id

    LiCommentTag.append(localStorage.getItem(`comment ${counter}`));
    console.log(
      localStorage.getItem(localStorage.getItem(`comment ${counter}`))
    );
    const trashIconTag = document.createElement("i");
    trashIconTag.classList.add("far", "fa-trash-alt", "trashIcon");

    listCommentContainerTag.append(LiCommentTag, trashIconTag);
    commentContainerTag.append(listCommentContainerTag);

    trashIconTag.addEventListener("click", () => {
      listCommentContainerTag.remove();
    });

    counter++;
  }
});
