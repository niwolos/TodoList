'use strict';

let input = document.querySelector('.input-title')
const addBtn = document.querySelector('.add')
const cardsContainer = document.querySelector('.cards')
let doneCheckbox = document.querySelector('.done')
let content = document.querySelector('.content')
const deleteBtn = document.querySelector('#delete')
let totalCards = 2


function getNewCardId() {
	const nextCardId = totalCards; //index of the next cards should be equal to total cards existing, e.g: 0 cards [] => [0]; 1 cards: [0] => [0,1]
	return nextCardId;
 }

function deleteCard(cardId) {
	var elem = document.getElementById(`card-${cardId}`); 
	elem.parentNode.removeChild(elem);
}

function addDeleteListener(cardId){
	const theDeleteButton = document.querySelector(`#delete-${cardId}`);
	theDeleteButton.addEventListener('click', function(e) {
		console.log(`delete button clicked in card${cardId}!`);
		console.log(`target clicked: ${e.target}`);
		console.log(`inner html: ${e.target.innerHTML}`);
		const cardToDelete = document.querySelector(`#card-${cardId}`);
		console.log(`card to delete: ${cardToDelete}`);
		console.log(`inner html: ${cardToDelete.innerHTML}`);
		cardToDelete.remove();
	});
}

function setupCardInput(){
	input.addEventListener('keyup', (e) => {
		const newCardId = getNewCardId();
		console.log(`Adding new card with ID:${newCardId}`);
		e.preventDefault()
		if (e.keyCode === 13) {
			let valueInput = e.target.value
			console.log(valueInput)

			//card template
			let card = ''
			if (valueInput !== '') {
				card += `
				<div class="card" id="card-${newCardId}">
				<div class="card-top">
				  <p contenteditable="true" class="content">
				  ${valueInput}
				  </p>
				</div>
				<div class="card-bottom">
				  <button class="button delete-button" id="delete-${newCardId}" label="delete">delete</button>
				</div>
				<div class="pretty p-default p-round">
				  <input type="checkbox" />
				  <div class="state p-success-o">
					  <label>done</label>
				  </div>
			  </div>
			  </div>
			`
			}
			else {
				alert('Please fill input field.')
			}
			cardsContainer.innerHTML += card
			totalCards++; //iterate totalCards since we created a new one
			addDeleteListener(newCardId);
		}
	})
}

//Add new card button
function setupAddButton() {
	addBtn.addEventListener('click', () => {
		addBtn.classList.toggle('active')
		input.classList.toggle('input-title')
	})
}

//site setup functions
setupCardInput();
setupAddButton();

//static cards present for testing purposes
addDeleteListener(0);
addDeleteListener(1);