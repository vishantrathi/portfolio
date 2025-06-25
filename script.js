// // 🔒 Disable right-click & dev tools
// document.addEventListener('contextmenu', function(e) {
//     e.preventDefault();
// });
// document.onkeydown = function(e) {
//     if (e.keyCode === 123 || // F12
//         (e.ctrlKey && e.shiftKey && ['I', 'J'].includes(e.key.toUpperCase())) || // Ctrl+Shift+I/J
//         (e.ctrlKey && e.key.toUpperCase() === 'U')) { // Ctrl+U
//         return false;
//     }
// };

// 💬 Chat message handler
var awaitingResponse = false;
function sendMessage() {
  if (!awaitingResponse) {
    var messageContent = document.getElementById("messageInput").value;
    var paragraph = document.createElement('p');
    paragraph.textContent = messageContent;
    paragraph.classList.add("my_message");
    document.getElementById('chat').appendChild(paragraph);
    awaitingResponse = true;
    sendSMS(messageContent);
  }
}

// 🎵 Music toggle
function toggleMusic() {
  const video = document.getElementById("videoElement");
  const musicToggle = document.getElementById("musicToggle");

  if (video.muted) {
    video.muted = false;
    video.style.display = "block";
    video.play();
    musicToggle.textContent = "Mute Music";
  } else {
    video.muted = true;
    video.style.display = "none";
    musicToggle.textContent = "Play Music";
  }
}

// 🪟 Window handling
let selectedIcon = null;
let topIndex = 3;

function openIcon(name) {
  const icon = document.getElementById(name + "Icon");
  const windowEl = document.getElementById(name);

  if (selectedIcon === icon) {
    openElement(windowEl);
    map?.invalidateSize?.(); // If using Leaflet map
    selectedIcon = null;
    icon.style.backgroundColor = "rgba(85, 166, 241, 0.0)";
  } else {
    if (selectedIcon) {
      selectedIcon.style.backgroundColor = "rgba(85, 166, 241, 0.0)";
    }
    selectedIcon = icon;
    icon.style.backgroundColor = "rgba(85, 166, 241, 0.6)";
  }
}

function openElement(elmnt) {
  elmnt.style.display = 'flex';
  elmnt.style.zIndex = topIndex++;
}

function closeElement(elmnt) {
  elmnt.style.display = 'none';
}

function tapWindow(elmnt) {
  elmnt.style.zIndex = topIndex++;
}

// 🧲 Make elements draggable via their headers
function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  const handle = document.getElementById(elmnt.id + "handle");

  (handle || elmnt).onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.zIndex = topIndex++;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    elmnt.style.position = 'absolute';
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// 🕒 Time updater
function updateTime() {
  const timeText = document.querySelector("#timeElement");
  if (timeText) {
    timeText.innerHTML = new Date().toLocaleString();
  }
}
setInterval(updateTime, 1000);

// 🎂 Age calculator
function getAge() {
  const currentDate = new Date();
  const targetDate = new Date("2004-09-28");
  const differenceMs = currentDate - targetDate;
  const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000;
  const yearsWithDecimals = (differenceMs / millisecondsPerYear).toFixed(5);
  const ageEl = document.getElementById("age");
  if (ageEl) {
    ageEl.textContent = yearsWithDecimals;
  }
}
getAge();

// 🕰️ Optional fallback time
function setDate() {
  const timeElement = document.getElementById("time");
  if (timeElement) {
    timeElement.innerText = new Date().toLocaleString();
    setTimeout(setDate, 1000);
  }
}
setDate();

// 🚀 Initialize draggable windows on load
window.onload = () => {
  ["welcome", "projects", "resume", "contact", "aboutMe"].forEach(id => {
    const el = document.getElementById(id);
    if (el) dragElement(el);
  });
};

// 📧 EmailJS integration for contact form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      console.log("Form submitted!");

      emailjs.sendForm("service_7mcalm3", "template_vo1kmbr", this)
        .then(() => {
          alert("✅ Message sent successfully!");
          this.reset(); // use `this` instead of `form`
        }, (error) => {
          console.error("❌ EmailJS Error:", error);
          alert("❌ Failed to send message. Please try again.");
        });
    });
  }
});

