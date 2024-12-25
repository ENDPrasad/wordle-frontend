
// Variables / constants
const inputBlocks = document.getElementsByClassName('block-input')
const submitBtn = document.getElementById('submit')
const reload = document.getElementById('reload')

const words = [
    'grain', 'white', 'index', 'shine'
]

let ran = Math.floor(Math.random() * words.length)

localStorage.setItem('word', words[ran])


// Function calls
handleDisableFields(0)


// Event Handlers
for(let i = 0; i < inputBlocks.length; i++){
    inputBlocks[i].addEventListener('input', (e)=>{
        handleInputChange(e.target.value, i)
    })
}

submitBtn.addEventListener('click', submitHandler)

reload.addEventListener('click', ()=>{
    window.location.reload()
    submitBtn.disabled = false
})







// Functions

function submitHandler(){
    let userText = ""
    for(let i = 0; i < inputBlocks.length; i++){
        if(!inputBlocks[i].disabled)
            userText += inputBlocks[i].value
    }
    userText = userText.toLowerCase()
    console.log(userText)
    if(userText === localStorage.getItem('word').toLowerCase()){
        checkForAllPossibilites()
        submitBtn.disabled = true
        
    }else{

    checkForAllPossibilites()
       let idx = findNextRowIndex()
       console.log(idx)
       handleDisableFields(idx)
    }    
}





function checkForAllPossibilites(){
    let computerText = localStorage.getItem('word')

    let j = 0
    for(let i = 0; i < inputBlocks.length; i++){
        if(!inputBlocks[i].disabled && inputBlocks[i].value === computerText[j]){
            inputBlocks[i].classList.add('correct')
            j++
        }
           
        else if(!inputBlocks[i].disabled && computerText.includes(inputBlocks[i].value)){
            inputBlocks[i].classList.add('some-where')
            j++
        }else if(!inputBlocks[i].disabled && !computerText.includes(inputBlocks[i].value)){
            inputBlocks[i].classList.add('no-where')
            j++
        }
    }

}

function findNextRowIndex(){
    let i = 0
    for(i = 0; i < inputBlocks.length; i++){
        if(!inputBlocks[i].disabled){
           return i + 5
        }
    }
    return null

}

function checkForNoMatches(){
    let computerText = localStorage.getItem('word')
    for(let i = 0; i < inputBlocks.length; i++){
        if(!inputBlocks[i].disabled && !computerText.includes(inputBlocks[i].value)){
            inputBlocks[i].classList.add('no-where')
        }
    }

}


function handleInputChange(data, idx){
    if(data)
        inputBlocks[idx + 1].focus()
    else
    inputBlocks[idx - 1].focus()

}


function handleDisableFields(idx){
    for(let i = 0; i < inputBlocks.length; i++){
        if(i == idx){
            inputBlocks[i].disabled = false
            inputBlocks[i].focus()
        }
        else if(i > idx && i < idx+5){
            inputBlocks[i].disabled = false
        }else{
            inputBlocks[i].disabled = true 

        }
    }
}


