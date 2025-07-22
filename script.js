const items = {
  milk: false,
  egg: false,
  wheat: false
};

// 🐄 Cow Click
document.getElementById("cow").onclick = () => {
  const sound = document.getElementById("cowSound");
  sound.currentTime = 0;
  sound.play();
  if (!items.milk) {
    items.milk = true;
    document.getElementById("cow").src = "cow_love.png";
    updateInventory();
  }
};

// 🐔 Chicken Click
document.getElementById("chicken").onclick = () => {
  const sound = document.getElementById("chickenSound");
  sound.currentTime = 0;
  sound.play();
  if (!items.egg) {
    items.egg = true;
    document.getElementById("chicken").src = "chicken_love.png";
    updateInventory();
  }
};

// 🧑‍🌾 Farmer Click
document.getElementById("farmer").onclick = () => {
  const sound = document.getElementById("farmerSound");
  sound.currentTime = 0;
  sound.play();
  if (!items.wheat) {
    items.wheat = true;
    document.getElementById("farmer").src = "farmer_angry.png";
    updateInventory();
  }
};

// 🧺 Inventory Update
function updateInventory() {
  const container = document.getElementById("item-images");
  container.innerHTML = "";

  if (items.milk) {
    const img = document.createElement("img");
    img.src = "milk.png";
    img.classList.add("item-icon");
    img.id = "drag-milk";
    img.draggable = true;
    container.appendChild(img);
  }

  if (items.egg) {
    const img = document.createElement("img");
    img.src = "egg.png";
    img.classList.add("item-icon");
    img.id = "drag-egg";
    img.draggable = true;
    container.appendChild(img);
  }

  if (items.wheat) {
    const img = document.createElement("img");
    img.src = "wheat.png";
    img.classList.add("item-icon");
    img.id = "drag-wheat";
    img.draggable = true;
    container.appendChild(img);
  }

  if (items.milk && items.egg && items.wheat) {
    document.getElementById("craftMsg").style.display = "block";
  }
}

// 🎂 Show Crafting Grid
document.getElementById("finalCraftBtn").onclick = () => {
  document.getElementById("craftMsg").style.display = "none";
  document.getElementById("craftingArea").style.display = "block";
  document.getElementById("craftSound").play();
};

// 🧩 Drag and Drop Logic
const slots = document.querySelectorAll(".slot");

slots.forEach((slot) => {
  slot.addEventListener("dragover", (e) => e.preventDefault());
  slot.addEventListener("drop", (e) => {
    const draggedId = e.dataTransfer.getData("text/plain");
    const draggedEl = document.getElementById(draggedId);

    if (!slot.hasChildNodes()) {
      slot.appendChild(draggedEl.cloneNode(true));
      checkCraftingSuccess();
    }
  });
});

document.querySelectorAll(".draggable").forEach((el) => {
  el.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  });
});

// ✅ Crafting Check
function checkCraftingSuccess() {
  const pos0 = slots[0].querySelector("img")?.id === "drag-milk";
  const pos4 = slots[4].querySelector("img")?.id === "drag-egg";
  const pos8 = slots[8].querySelector("img")?.id === "drag-wheat";

  if (pos0 && pos4 && pos8) {
    showCakeCrafted();
  }
}

// 🎉 Show Cake + Celebrate Button
function showCakeCrafted() {
  const craftingContainer = document.getElementById("craftingArea");

  craftingContainer.innerHTML = `
    <h2 style="color: white;">🎂 Cake Crafted! 🎉</h2>
    <img src="cake.png" class="cake-image floating" />
    <button id="celebrateBtn" class="celebrate-button">Celebrate</button>
  `;

  // 👏 Add Event Listener
  const celebrateBtn = document.getElementById("celebrateBtn");
console.log("Celebrate button clicked");

  celebrateBtn.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "celebration.html";
  });
}
