
const tileDisplay = document.querySelector(".tile-container");
const resultDisplay = document.querySelector(".result-container");
const keyboard = document.querySelector(".cards-container");
const messageDisplay=document.querySelector(".message-container");//ovo
let wordle=["clubs","diamonds","favorite","joker"] //ovo
// const randomNum=Math.floor(Math.random()*words.length)//ovo
// const wordle = words[randomNum]//ovo
// console.log(wordle,randomNum)

const cards = [
    {
        name:'delete',
        url:"https://img.icons8.com/color/96/000000/clear-symbol--v1.png"    
    },
    {
        name:'clubs',
        url:"https://img.icons8.com/fluency/96/000000/clubs.png"    
    },
    {
        name:'diamonds',
        url:"https://img.icons8.com/fluency/96/000000/diamonds.png"    
    },
    {
        name:'favorite',
        url:"https://img.icons8.com/fluency/96/000000/hearts.png"    
    },
    {
        name:'joker',
        url:"https://img.icons8.com/fluency/96/000000/joker.png"    
    },
    {
        name:'spades',
        url:"https://img.icons8.com/fluency/96/000000/spades.png"    
    },
    {
        name:'star',
        url:"https://img.icons8.com/fluency/96/000000/star.png"    
    },
    {
        name:'enter',
        url:"https://img.icons8.com/color/96/000000/enter-key.png"   
    }
];

const guessRows = [
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""]
];
const resultRows=guessRows;
let currentRow = 0;
let currentTile = 0;
let isGameOver=false;

resultRows.forEach((resultRow, resultRowIndex) => {
    const rowElement = document.createElement("div");
    rowElement.setAttribute("id", "resultRow-" + resultRowIndex);
  
    resultRow.forEach((guess, guessIndex) => {
      const tileElement = document.createElement("div");
      tileElement.setAttribute(
        "id",
        "resultRow-" + resultRowIndex + "-tile-" + guessIndex
      );
      tileElement.classList.add("tile");
      rowElement.append(tileElement);
    });
  
    resultDisplay.append(rowElement);
  });




// WORKS Display tiles in game container
guessRows.forEach((guessRow, guessRowIndex) => {
  const rowElement = document.createElement("div");
  rowElement.setAttribute("id", "guessRow-" + guessRowIndex);

  guessRow.forEach((guess, guessIndex) => {
    const tileElement = document.createElement("div");
    tileElement.setAttribute(
      "id",
      "guessRow-" + guessRowIndex + "-tile-" + guessIndex
    );
    tileElement.classList.add("tile");
    rowElement.append(tileElement);
  });

  tileDisplay.append(rowElement);
});

//WORKS Display card buttons below the tiles
cards.forEach((card) => {
  const buttonElement = document.createElement("button");
  buttonElement.innerHTML = `<img src=${card.url}/>`;
  buttonElement.setAttribute("id", card.name);
  buttonElement.addEventListener("click", () => handleClick(card));
  keyboard.append(buttonElement);
});
//WORKS DELETE AND ADD FUNC -> NEED TO SEE checkrow()
const handleClick = (card) => {
  if (card.name === "delete") {
    deleteCard();
    return;
  }
  if (card.name === "enter") {
    checkRow()
    return;
  }
  addCard(card);
};

//WORKS Add card in tile
const addCard = (card) => {
    if(currentTile<4 && currentRow<6){
        const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`);
        tile.innerHTML = `<img src=${card.url}/>`;
        guessRows[currentRow][currentTile] = card.name;
        tile.setAttribute("data", card.name);
        currentTile++;
    }
};

//WORKS Delete card form row
const deleteCard = (letter) => {
    if (currentTile>0){
        currentTile--
        const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`);
        tile.innerHTML=''
        guessRows[currentRow][currentTile] = '';
        tile.setAttribute("data", '');
    }

}

const checkRow = () =>{
    const guess=guessRows[currentRow]

    const greenNum=flipTile()
    if(currentTile>=4){
        // console.log('guess is'+ guess,'wordle is'+wordle)
        if(greenNum==4){
            showMessage('БРАВОО')
            isGameOver=true
            return
        }else{
            if( currentRow>=6){
                isGameOver=true;
                showMessage('ИГРА ЈЕ ЗАВРШЕНА')
                return
                
            }
            if (currentRow<6){
                currentRow++
                currentTile=0
                return
            }
        }
    }
}
const messageElement=document.querySelector('p')
const showMessage=(message)=>{
    messageElement.textContent=message;
    messageElement.style.borderRadius='10px'
    messageElement.style.padding='10px'
    messageDisplay.append(messageElement)
    setTimeout(()=>messageDisplay.removeChild(messageElement),10000)
}





const flipTile = () => {

    let greenNum =0;
    let yellowNum=0; 
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle.map(e=>{return e})
    const guess = []
    let res
    rowTiles.forEach(tile => {
        guess.push({card_name: tile.getAttribute('data')})
    })
    guess.forEach((guess, index) => {
        // console.log(guess.card_name,wordle[index])
        if (guess.card_name == wordle[index]) {
            // console.log(guess.card_name,wordle[index])

            checkWordle[index] = ''

            greenNum+=1
        }

        
    })
    res=greenNum
    guess.forEach((guess,index) => {

        if (checkWordle.includes(guess.card_name)) {
            
            for(let i=0;i<checkWordle.length;i++){
                if(checkWordle[i]===guess.card_name){

                checkWordle[i]=''

                yellowNum+=1
                return}
            }
            
            
        }


    })
 

    const resultRows= document.querySelector('#resultRow-' + currentRow).childNodes
    resultRows.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
        
        if(greenNum>0){
            tile.classList.add('green-overlay')
            greenNum--
            return
        }else if(yellowNum>0){
            tile.classList.add('yellow-overlay')
            yellowNum--
            return
        }else{
            tile.classList.add('grey-overlay')
            return
        }
    }, 500 * index)
    })
    return res
}