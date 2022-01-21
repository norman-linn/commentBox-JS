const containerTag = document.querySelector(".container");

// create the div tags and append them to containerTag.
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

// dom
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

  trashIconTag.addEventListener("click", () => {
    localStorage.removeItem(key);
    listCommentContainerTag.remove();

    return counter;
  });

  counter += 1;
};

postBtnTag.addEventListener("click", () => {
  if (userInputTag.value === "") {
    userInputTag.placeholder = "Please TYPE Smth Before YOU POST!";
    return;
  }
  createCommentContainer(userInputTag.value);
  userInputTag.value = "";
});

clearBtnTag.addEventListener("click", () => {
  if (localStorage.length === 0) return;

  counter = 0;
  localStorage.clear();
  commentContainerTag.innerHTML = "";
});

let storedCommentFromLocalStorage = [];
window.addEventListener("load", () => {
  // this idea is from facebook post / groups.
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      storedCommentFromLocalStorage[i] =
        localStorage.key(i) + " " + localStorage.getItem(key);
    }
    storedCommentFromLocalStorage.sort();
    const newCommentArray = storedCommentFromLocalStorage.map((el) => {
      const comment = el.slice(10, el.length);
      return comment;
    });

    for (let j = 0; j < newCommentArray.length; j++) {
      const slicedComment = newCommentArray[j];
      createCommentContainer(slicedComment);
    }
  }
});
