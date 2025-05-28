const field = document.getElementById("field");
const playerArr = [];

function addPlayer() {
  const name = document.querySelector("input[name=playerName]").value.trim();
  const pos = document.querySelector("select[name=playerPosition]").value;
  const foot = document.querySelector("select[name=preferredFoot]").value;

  if (!name || !pos || !foot) {
    alert("모든 항목을 입력하세요.");
    return;
  }

  const obj = { name, pos, foot };
  playerArr.push(obj);

  const div = document.createElement("div");
  div.className = "player";
  div.draggable = true;
  div.textContent = `${obj.name} (${obj.pos}, ${obj.foot})`;

  div.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", JSON.stringify(obj));
  });

  document.getElementById("playerList").appendChild(div);

  
  document.querySelector("input[name=playerName]").value = "";
  document.querySelector("select[name=playerPosition]").selectedIndex = 0;
  document.querySelector("select[name=preferredFoot]").selectedIndex = 0;
}

field.addEventListener("dragover", e => e.preventDefault());

field.addEventListener("drop", e => {
  e.preventDefault();
  const data = JSON.parse(e.dataTransfer.getData("text/plain"));
  const div = document.createElement("div");
  div.className = "draggable-player";
  div.textContent = `${data.name} (${data.pos}/${data.foot})`;
  div.style.left = `${e.offsetX}px`;
  div.style.top = `${e.offsetY}px`;
  enableDrag(div);
  field.appendChild(div);
});

function enableDrag(div) {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  div.addEventListener("mousedown", e => {
    isDragging = true;
    offsetX = e.clientX - div.getBoundingClientRect().left;
    offsetY = e.clientY - div.getBoundingClientRect().top;
    div.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", e => {
    if (!isDragging) return;
    const rect = field.getBoundingClientRect();
    const newLeft = e.clientX - rect.left - offsetX;
    const newTop = e.clientY - rect.top - offsetY;

    if (
      newLeft >= 0 &&
      newTop >= 0 &&
      newLeft + div.offsetWidth <= field.offsetWidth &&
      newTop + div.offsetHeight <= field.offsetHeight
    ) {
      div.style.left = `${newLeft}px`;
      div.style.top = `${newTop}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    div.style.cursor = "move";
  });

}
