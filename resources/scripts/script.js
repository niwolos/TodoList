'use strict';

let input = document.querySelector('.input-title')
const addBtn = document.querySelector('.add')
const cardsContainer = document.querySelector('.cards')
let doneCheckbox = document.querySelector('.done')
let content = document.querySelector('.content')
const deleteBtn = document.querySelector('#delete')

input.addEventListener('keyup', (e) => {
	e.preventDefault()
	if (e.keyCode === 13) {
		let valueInput = e.target.value
		console.log(valueInput)

		//card template
		let card = ''
		if (valueInput !== '') {
			card += `
				<div class="card">
					<div class="card-top">
					<p contenteditable="true" class="content">
						${valueInput}
					</p>
					</div>
					<div class="card-bottom">
					<div class="pretty p-default p-round p-thick">
					<input type="checkbox" />
					<div class="state p-danger-o">
						<label>delete</label>
					</div>
				</div>
					<div class="pretty p-default p-round p-thick done">
					<input type="checkbox" />
					<div class="state p-success-o">
						<label>done</label>
					</div>
				</div>
				</div>
				</div>
		`
		}
		else {
			alert('Please fill input field.')
		}
		cardsContainer.innerHTML += card
	}
})

//input event
addBtn.addEventListener('click', () => {
	addBtn.classList.toggle('active')
	input.classList.toggle('input-title')
})
