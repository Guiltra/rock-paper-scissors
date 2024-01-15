const home_parent = document.getElementById("home");
const home_children = home_parent.children;

const away_parent = document.getElementById("away");
const away_children = away_parent.children;

const result_text = document.getElementById("result");

let selectable = true;

Array.from(home_children).forEach((slot, index) => {
    slot.addEventListener("mouseover", event => {
        if(selectable){
            event.target.setAttribute("data-select", "true");
            event.target.style.cursor = "pointer";
        }
    })
    slot.addEventListener("mouseout", event => {
        if(selectable){
            event.target.setAttribute("data-select", "false");
            event.target.style.cursor = "pointer";
        }
    })
    slot.addEventListener("click", event => {
        if(selectable){
            event.target.setAttribute("data-select", "true");
            event.target.style.cursor = "default";
            selectable = false;

            setTimeout(botChoice, 500, index)
        }
    })
})

function botChoice(player){
    bot = Math.floor(Math.random() * 3);
    away_children[bot].setAttribute("data-random", "true")

    setTimeout(gameResult, 500, player, bot)
}

function gameResult(player, bot){
    switch(player){
        case bot:
            result_text.textContent = "DRAW!";
            break;
        case (bot + 1) % 3:
            result_text.textContent = "YOU WON!";
            result_text.style.color = "#38b000";
            break;
        default:
            result_text.textContent = "YOU LOST!";
            result_text.style.color = "red";
    }

    result_text.setAttribute("data-result", "true")
    setTimeout(gameReset, 1000, player, bot)
}

function gameReset(player, bot){
    home_children[player].setAttribute("data-select", "false");
    away_children[bot].setAttribute("data-random", "false");

    result_text.setAttribute("data-result", "false")
    result_text.textContent = "PLAYING...";
    result_text.style.color = "white";

    selectable = true;
}