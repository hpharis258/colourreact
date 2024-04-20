//Game Music
window.onload = function() {
    let context = new AudioContext();
    let music = new Audio("sadtronic.mp3");
    music.play();
    music.setAttribute("autoplay", true );
  }
  



//Disable Scrolling
function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  
        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

//Delete Start Screen
function delStartScreen()
{
    let start = document.getElementById("start");
    let body = document.getElementById("page");
    body.removeChild(start);
}

//Reset
function Reset()
{
    if(GameOver == true)
    {
        let wholeBody = document.getElementById("page");
        let nestedSvg = document.getElementById("WHOLEpage");
        
        wholeBody.removeChild(nestedSvg);
        
        let resDiv = document.createElement("div");
        resDiv.setAttribute("id", "reset");

        resDiv.textContent = "GAME OVER";

        let Button = document.createElement("button");
        Button.setAttribute("id", "ResButton");
        Button.textContent = "RESET";

        Button.setAttribute("onClick","window.location.reload();");

        wholeBody.appendChild(resDiv);
        wholeBody.appendChild(resDiv.appendChild(Button));
        

        //draw();
    }
}

let GameOver = false;


let startDiv = document.getElementById("startScreen");

let playerCol;
playerCol = "lime";

class obstacle {
    constructor(x, y, height, width, fill, id){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.fill = fill;
        this.id = id;
    }

    create(x, y, height, width, fill, id){
        let newRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        newRect.setAttribute("x", x);
        newRect.setAttribute("Y", y);
        newRect.setAttribute("fill", fill);
        newRect.setAttribute("height", height);
        newRect.setAttribute("width", width);
        newRect.setAttribute("id", id);

        const svg = document.querySelector("svg");

        svg.appendChild(newRect);

    }
}

// All Aavailable Colours
let colours = ["lime", "yellow", "red", "blue"];

let obstacleColour = colours[Math.floor(Math.random() * colours.length)];

let speed = 0.09;

let ob1 = new obstacle("90%", "0%", "100%", "5%", "lime");
ob1.create("90%", "0%", "100%", "5%", "red", "obstacle1");
//let ob2 = new obstacle("120%", "0%", "100%", "5%", "lime");
//ob2.create("120%", "0%", "100%", "5%", "red", "obstacle2");

let score1 = document.getElementById("score");
score1.setAttribute("fill", "white");

let score = 0;
async function draw()
{
    while(1)
    {
        let i = 120;
        while(i != -20)
        {   
            let x = i + "%";
            let x2 = (i + 40) + "%";

            let id = document.getElementById("obstacle1");
            //let id2 = document.getElementById("obstacle2");

            let parent = document.getElementById("WHOLEpage");
            parent.removeChild(id);
            //parent.removeChild(id2);
            ob1.create(x, "0%", "100%", "5%", obstacleColour, "obstacle1");
            
            //ob2.create(x2, "0%", "100%", "5%", "red", "obstacle2");

           
            if(x === "3%" && obstacleColour != playerCol )
            {
                GameOver = true;
                Reset();
                return "Game Over";
                
            }
            if (x ==="1%")
            {
                score++;
                let score1 = document.getElementById("score");
                score1.textContent = "" + score;
                if(score > 1)
                {
                    speed = speed - 0.01;
                    if(speed < 0.02)
                    {
                        speed = 0.01;
                    }
                }
                
            }
            await sleep(speed);
            i = i - 1;
        }

        
        
        obstacleColour = colours[Math.floor(Math.random() * colours.length)];
    }
    
}


async function sleep(seconds){
    return new Promise ((resolve) => setTimeout(resolve,seconds*1000));
}

//Start Game Button
let btn = document.getElementById("startButton");
btn.addEventListener('click', event => {
    delStartScreen();
    draw();
});

//MAIN GAME
disableScroll();






let randColour = colours[Math.floor(Math.random() * colours.length)];

let player = document.getElementById("player");

let current;
//SPACE 
document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
    // Index of current colour in the Array
      let toRem = colours.indexOf(playerCol);
    // Copy of the colours array
      let cp = [...colours];
    // Remove index from the copy of the array 
    cp.splice(toRem, 1);

      let randColour = cp[Math.floor(Math.random() * cp.length)];  
      let current = player.style.fill=randColour;
    
      playerCol = current;
   }
})

//MOUSE/TOUCH
document.addEventListener("touchstart", touch);

  function touch()
  {
    let randColour = colours[Math.floor(Math.random() * colours.length)];  
    let current = player.style.fill=randColour;
    //let div = document.createElement('div');
    playerCol = current;
  }





