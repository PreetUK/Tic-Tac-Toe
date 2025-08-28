const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const scoreX = document.querySelector("#score-x");
const scoreO = document.querySelector("#score-o");
const turnIndicator = document.querySelector("#turn-indicator");
const moveSound = document.querySelector("#move-sound");
const winSound = document.querySelector("#win-sound");

let turnO = true;
let scores = { X: 0, O: 0 };
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

const updateTurnIndicator = () => {
    turnIndicator.textContent = `Turn: ${turnO ? "O" : "X"}`;
};

const playSound = (sound) => {
    sound.currentTime = 0;
    sound.play().catch(() => {}); // Handle potential autoplay restrictions
};

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showResult = (message) => {
    msg.innerHTML = message;
    msgContainer.classList.remove("hide");
    disableBoxes();
    playSound(winSound);
};

const checkWin = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boxes[a].innerText && 
            boxes[a].innerText === boxes[b].innerText && 
            boxes[a].innerText === boxes[c].innerText) {
            scores[boxes[a].innerText]++;
            updateScores();
            showResult(`Congratulations, ${boxes[a].innerText} wins!`);
            return true;
        }
    }
    // Check for draw
    if ([...boxes].every(box => box.innerText !== "")) {
        showResult("It's a draw!");
        return true;
    }
    return false;
};

const updateScores = () => {
    scoreX.textContent = `X: ${scores.X}`;
    scoreO.textContent = `O: ${scores.O}`;
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    updateTurnIndicator();
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (box.innerText === "" && !msgContainer.classList.contains("hide") === false) {
            box.innerText = turnO ? "O" : "X";
            box.disabled = true;
            playSound(moveSound);
            turnO = !turnO;
            updateTurnIndicator();
            checkWin();
        }
    });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

// Initialize turn indicator
updateTurnIndicator();