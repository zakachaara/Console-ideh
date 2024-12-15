let i = 0; 
let inputField = document.getElementsByTagName('input')[i];

inputField.addEventListener("keydown", function(event) {
    if (event.key === "Enter") { 
        event.preventDefault(); 

        
        const terminal = document.getElementById("terminal__body");
        terminal.appendChild(document.createElement("br"))
        
        let div = document.createElement("div"); 
        div.className = "console-wrapper"; 
        
        div.innerHTML = `
            <span id="terminal__prompt--user">ideh.v6@cit.inpt: </span>            
            <span id="terminal__prompt--location">~</span>            
            <span id="terminal__prompt--bling">$</span>   
            <span class="hidden-text" id="hidden-text"></span>
            <input type="text" id="console-input" class="console-input" autofocus>
        `;

        terminal.appendChild(div);

        const newInput = document.getElementById(`console-input`);
        newInput.focus();

        i++;
    }
});
