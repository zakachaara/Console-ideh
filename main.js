let i = 0;

// Callback to adjust input width dynamically
function adjustInputWidth(inputElement, hiddenTextElement) {
  inputElement.addEventListener("input", () => {
    hiddenTextElement.textContent = inputElement.value || "|";
    inputElement.style.width = hiddenTextElement.offsetWidth + "px";
  });
}

const lines = [
  "[1]_ Team name\t\t\t:",
  "[2]_ Represented School \t:",
  "[3]_ Leader's name\t\t:",
  "[4]_ Leader's email\t\t:",
  "[5]_ Leader's phone number \t:",
  "[6]_ 2nd member's name\t\t:",
  "[7]_ 2nd member's email\t\t:",
  "[8]_ 3rd member's name\t\t:",
  "[9]_ 3rd member's email\t\t:",
  "[10]_ 4th member's name\t\t:",
  "[11]_ 4th member's email\t:",
];

let currentLine = 0;
let shown = false;
// Function to add a new line with an input field
function addLine(index) {
  if (!shown) {
    const terminal = document.getElementById("terminal__body");
    terminal.appendChild(document.createElement("br"));
    let div = document.createElement("div");
    div.className = "console-wrapper";
    div.innerHTML = `
               
              <p id="first">> Only students are allowed to take part of the event.</p>
              <div id="lines"></div> <!-- Container for all input lines -->
              <p id="finalNote" style="display:none;">>> Sure about the provided information, run "ideh push" .</p> 
            `;
    terminal.appendChild(div);
    shown = true;
  }

  // Reference to the container and state variables
  const container = document.getElementById("lines");
  const lineWrapper = document.createElement("div");
  lineWrapper.classList.add("line-wrapper");

  // Add line text
  const lineText = document.createElement("span");
  lineText.textContent = lines[index];
  lineWrapper.appendChild(lineText);

  // Add input field
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.className = "line-input";
  lineWrapper.appendChild(inputField);

  container.appendChild(lineWrapper);
  inputField.focus();

  inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      inputField.disabled = true;

      currentLine++;
      if (currentLine < lines.length) {
        addLine(currentLine);
      } else {
        document.getElementById("finalNote").style.display = "block";
        i++; // Increment the index for the new input
        const terminal = document.getElementById("terminal__body");
        terminal.appendChild(document.createElement("br")); // Add a line break

        // Create new console-wrapper
        let div = document.createElement("div");
        div.className = "console-wrapper";
        div.innerHTML = `
                <span id="terminal__prompt--user">ideh.v6@cit.inpt: </span>            
                <span id="terminal__prompt--location">~</span>            
                <span id="terminal__prompt--bling">$</span>   
                <span class="hidden-text" id="hidden-text-${i}"></span>
                <input type="text" id="console-input-${i}" class="console-input" autofocus>
            `;
        terminal.appendChild(div);
        const newInput = document.getElementById(`console-input-${i}`);
        const newHiddenText = document.getElementById(`hidden-text-${i}`);
        newInput.focus();

        // Reapply the listeners to the new input
        addInputListeners(newInput, newHiddenText);
      }
    }
  });
}
function addInputListeners(inputElement, hiddenTextElement) {
  adjustInputWidth(inputElement, hiddenTextElement);

  inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      let textvalue = document.activeElement.value.trim();
      if (textvalue === "ideh init") {
        // Remove the 'active' class from all console-wrappers
        document.querySelectorAll(".console-wrapper").forEach((wrapper) => {
          wrapper.classList.remove("active");
        });

        document.activeElement.disabled = true; // Disable current input
        addLine(currentLine);
      } else if (textvalue === "ideh push") {
        document.getElementById("terminal").style.display = "none";
      } else {
        inputElement.disabled = true;
        i++; // Increment the index for the new input
        const terminal = document.getElementById("terminal__body");
        terminal.appendChild(document.createElement("br")); // Add a line break
        let warn = document.createElement("div");
        warn.className = "Content";
        warn.innerHTML = `
                <p>
                  <span id="first">${textvalue}</span> <span class="option">NOT</span> a valid IDEH command;<br>
                  Check : <span class="cmd" >--help </span> for more information.
                </p>
        `;
        terminal.appendChild(warn);
        let div = document.createElement("div");
        div.className = "console-wrapper";
        div.innerHTML = `
                <span id="terminal__prompt--user">ideh.v6@cit.inpt: </span>            
                <span id="terminal__prompt--location">~</span>            
                <span id="terminal__prompt--bling">$</span>   
                <span class="hidden-text" id="hidden-text-${i}"></span>
                <input type="text" id="console-input-${i}" class="console-input" autofocus>
            `;

        // Remove the 'active' class from all console-wrappers
        document.querySelectorAll(".console-wrapper").forEach((wrapper) => {
          wrapper.classList.remove("active");
        });

        // Add the new console-wrapper
        terminal.appendChild(div);
        div.classList.add("active");

        // Focus on the new input field
        const newInput = document.getElementById(`console-input-${i}`);
        const newHiddenText = document.getElementById(`hidden-text-${i}`);
        newInput.focus();

        // Reapply the listeners to the new input
        addInputListeners(newInput, newHiddenText);
      }
    }
  });
}

// Initialize the first input field
const input = document.getElementById(`console-input-${i}`);
const hiddenText = document.getElementById(`hidden-text-${i}`);
addInputListeners(input, hiddenText);
