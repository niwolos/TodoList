'use strict';

const APP_NAME = "TodoList";

let descriptionInput
let addBtn

let cardContainer
let totalCards

let cardMap = new Map()

 //index of the next cards could be equal to total cards existing, 
 //e.g: 0 cards [] => [0]; 1 cards: [0] => [0,1]; 2 cards: [0,1] => [0,1,2]
function getNewCardId() {
    if (totalCards === undefined){
        totalCards = 0
    }
	const nextCardId = totalCards; 
	return nextCardId;
}

function getCurrentDate() {
    const currentDate = new Date()
    console.log('Date timestamp:'+currentDate.getTime())
    return currentDate.getTime();
}

class Card {
	constructor(id, date, description, done){
        this._id = id
		this._date = date
		this._description = description
        if (done === undefined){
            this._done = false
        } else {
            this._done = done
        }
	}
	get id(){
		return this._id
	}
	get date(){
		return this._date
	}
	get description(){
		return this._description
	}
	get done(){
		return this._done
	}
    set id(id){
        this._id = id
	}
    set date(date){
        this._date = date
	}
    set description(description){
		this._description = description
    } 
    set done(done){
        this._done = done
	}
    delete(){
        console.log(`Deleting card with id:${this._id}`)
		localStorage.removeItem(this._id)
        //we might need to return here later, to remove objects from DOM or lists or where we stored it
        /*
        if (this._id != undefined && this._id !== null){
            //localStorage.removeItem(`card-${this._id}`)
            cardMap.delete(this._id)
        }
        */
        console.log('cardMap before deleting:')
        for (const [key, value] of cardMap.entries()) {
            console.log(key, value);
        }
       try {
        cardMap.delete(this._id)
        console.log('cardMap after deleting:')
        for (const [key, value] of cardMap.entries()) {
            console.log(key, value);
        }
       } catch (e){
           console.log(e)
       }
    }
}


/**
 * If you only have an input text say from the description input field in the DOM
 * and want a new card object created. Returns the new card object
 */
function createNewCardFromInput(inputDescription) {
    //some code to create html Elements from generated ID & input description
    const newCardId = getNewCardId();
    console.log(`Creating new card with inputDescription: ${inputDescription}`);
    let newCardFromInput = new Card(newCardId, getCurrentDate(), inputDescription, undefined)
    console.log(`new Card created: object=${newCardFromInput} stringified json= ${JSON.stringify(newCardFromInput)}`)
    totalCards++;
    cardMap.set(newCardFromInput.id,newCardFromInput)
    console.log('Added new card to cardMap:')
    for (const [key, value] of cardMap.entries()) {
        console.log(key, value);
    }
    return newCardFromInput
}

/**
 * If cards were stored in localStorage in the form of Objects as JSON strings
 * you could recreate cards like this if you know their "card-ID" and the "card-ID" is the key 
 * for the JSON string ... localStorage[key:3,value={_id:3,_date:}           ]
 */
function createCardFromLocalStorage(storageKey) {
    console.log(`createCardFromLocalStorage called with storage key=${storageKey}`)
    //parse JSON string back into object
    const storedCard = JSON.parse(localStorage.getItem(storageKey));
    console.log('loaded storedCard = object=' + storedCard + '\njson string=' + JSON.stringify(storedCard));
    let storedCardId = storedCard._id
    let storedDate = storedCard._date
    let storedDescription = storedCard._description
    let storedDone = storedCard._done
    console.log(`creating new card from storage with values:\ncardId=${storedCardId} | storedDate=${storedDate} | storedDescription=${storedDescription} | storedDone=${storedDone}`)
    let cardFromStorage = new Card(storedCardId, storedDate, storedDescription, storedDone)
    cardMap.set(storedCardId,cardFromStorage)
    console.log('Added stored card to cardMap:')
    for (const [key, value] of cardMap.entries()) {
        console.log(key, value);
    }
    return cardFromStorage
}

//const card = new Card()

/*
function createAndDisplayNewCard(inputText){
    createNewCardFromInput(inputText)
}*/

function setupDescriptionInputListener() {
	descriptionInput.addEventListener('keyup', (e) => {
		// e.preventDefault()
		if (e.keyCode === 13) {
			let inputValue = e.target.value
			console.log(inputValue) //logging description input for testing 
			if (inputValue !== '') {
                //create a card object
                const newCard = createNewCardFromInput(inputValue)
                displayCardInDOM(newCard)
                //show a card on the website - add it to elements
            }
            document.querySelector('input').value = ''
        }
    })
}


function displayCardInDOM(cardObject) {
    //creating lements
    const card = document.createElement('div')
    card.classList.add('card', 'animate__animated', 'animate__fadeInDown')
    const cardTop = document.createElement('div')
    cardTop.classList.add('card-top')
    const cardBottom = document.createElement('div')
    cardBottom.classList.add('card-bottom')
    let content = document.createElement('p')
    content.classList.add('content')
    content.setAttribute('contenteditable', 'true')
    content.textContent = cardObject.description //object oriented!

    content.addEventListener("focusout", function() {
        console.log(`focusout event fired\ndescription now:${this.textContent}`);
        console.log(`setting cardObject description. Before:\n${JSON.stringify(cardObject)}`)
        cardObject.description = this.textContent;
        console.log(`after:${JSON.stringify(cardObject)}`)
    }, false);

    const removeBtn = document.createElement('button')
    removeBtn.classList.add('remove')
    removeBtn.innerHTML = `
    <div class='custom-remove'></div>
    <span class='custom-text'>delete</span>`
    const doneBtn = document.createElement('button')
    doneBtn.classList.add('read')
    doneBtn.innerHTML = `
    <div class='custom-done'></div>
    <span class='custom-text'>done</span>
    `

     /* completed cards - testing*/
     let completeCard = document.createElement('div')
     completeCard.classList.add('check')
     console.log(completeCard)
     console.log(cardObject.done)

     /*
    if(cardObject.done){
        completeCard.appendChild(card)

    } else {
		content.classList.remove('line')
        cardContainer.appendChild(card)
	}
    */

    //apending elements
    cardContainer.appendChild(card)
    card.appendChild(cardTop)
    card.appendChild(cardBottom)
    cardTop.appendChild(content)
    cardBottom.appendChild(removeBtn)
    cardBottom.appendChild(doneBtn)
    

    const cardBackground = () => {
        const colors = ['#D4F49C', '#F4B69C', '#66D7EE', '#C69CF4', '#f5d782']
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        card.style.backgroundColor = randomColor
    }

    cardBackground()
    if(cardObject.done){
    content.classList.add('line')
    document.querySelector('.check').appendChild(card)
    }


    //add delete listener
	removeBtn.addEventListener('click', () => {
        card.remove()
        //1. manipulate DOM object
		/* cardContainer.removeChild(card) */
        //2. manipulate JS object
        cardObject.delete()
        
	})

    //add done listener
	doneBtn.addEventListener('click', () => {
        //1. manipulate DOM object
		content.classList.toggle('line')
        console.log(`setting card to \'done\'`)
        //2. manipulate JS object
        cardObject.done = !(cardObject.done)
        console.log(`flipped the done status of card - now:\nid:${cardObject.id}\ndescription:${cardObject.description}\ndone:${cardObject.done}`)
        if(cardObject.done === true){
            document.querySelector('.check').appendChild(card)
        } else {
            document.querySelector('.cards').appendChild(card)
        }
	})
}

function setupAddButtonListener() {
    addBtn.addEventListener('click', (e) => {
		e.preventDefault()
		addBtn.classList.toggle('active')
		descriptionInput.classList.toggle('input-title')
	})
}

function prepareWebsiteListeners() {
    descriptionInput = document.querySelector('.input-title')
    addBtn = document.querySelector('#add')
    cardContainer = document.querySelector('.cards')
    setupDescriptionInputListener()
    setupAddButtonListener()
}

function setupCardsFromLocalStorage() {
    //create stored cards from localstorage
    //save cards into cardmap
    for (var i = 0; i < localStorage.length; i++) {
        var storageKey = localStorage.key(i); //i is the order in which keys were stored (we just iterate here) - nothing to do the actual card-id inside the value
        var storageValue = localStorage.getItem(storageKey); //json string currently, contains the entire card object data
        console.log(storageValue);
        if (storageKey.startsWith('card-')){
            //create a card from the localstorage key
            //createCardFromLocalStorage(...) <= this already returns the Card object (btw)
            const keyParameter = storageKey
            console.log('keyParameter='+keyParameter)
		    const storedCard = createCardFromLocalStorage(keyParameter)
            //now show card in DOM
		    displayCardInDOM(storedCard)
            //displayCardInDOM(...)
        
        }
	}
}


window.addEventListener('beforeunload', function (e) {
    // Cancel the event
    e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    // Chrome requires returnValue to be set
    e.returnValue = '';
    //1. save all Card objects in cardMap to localstorage 1 by 1
    localStorage.clear();
    for (const [key, value] of cardMap.entries()) {
        if (key != undefined && key != null){
            if (Number.isInteger(key)){
                //localStorage key from cardMap key (card._id) & prefix "card-" makes e.g.: "card-0"...
                let storageKey = 'card-'+key
                let storageValue = JSON.stringify(value)
                console.log('saving key:'+ storageKey +' & value:' + storageValue + ' to localStorage')
                localStorage.setItem(storageKey,storageValue)
            }
        }
    }
  });

  window.addEventListener('scroll', () => {
      let header = document.querySelector('.header')
      if(window.pageYOffset > 10){
          header.classList.add('sticky')
      } else {
          header.classList.remove('sticky')
      }
  })

//set up website event listeners for interactions
prepareWebsiteListeners()
setupCardsFromLocalStorage()

//service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function(error) {
      console.log('Service worker registration failed, error:', error);
    });
  }
//to get an object from localstorage...
//aCard = JSON.parse(localStorage.getItem(`card-${this._id}`))
//to save an object to localstorage
//key: card-aCard.id
//value: JSON.stringify(aCard)
//localStorage.setItem(`card-${aCard.id}`, JSON.stringify(aCard))



//some testing / debug stuff

/*
//let aCard = createNewCardFromInput("I am a test card!!")
console.log(`create a new card:${JSON.stringify(aCard)}`)
//cardMap.set('card-'+(aCard.id+1), JSON.stringify(aCard))
//cardMap.set("1", "World")
//cardMap.set(`card-${aCard.id}`, JSON.stringify(aCard))

//print the manually set key value pairs
for (const [key, value] of cardMap.entries()) {
    console.log(key, value);
}

//overwrite key value pairs with new cards
for (let i=0; i<10; i++) {
    //aCard = createNewCardFromInput("I am another test card!!")
    //cardMap.set(i, JSON.stringify(aCard))
}

//print new and overwritten key value pairs
for (const [key, value] of cardMap.entries()) {
    console.log(key, value);
}

function someTestFunction() {
    let aCard = new Card(1, getCurrentDate(), "hello world im a new card", false)
    console.log(`created a new card:\n${JSON.stringify(aCard)}`)
    aCard.done = true
    console.log(`changed done to TRUE:\n${JSON.stringify(aCard)}`)
    aCard.id = 2;
    console.log(`changed id to \'2\'\n${JSON.stringify(aCard)}`)
}
*/
