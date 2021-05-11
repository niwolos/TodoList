'use strict';

let input = document.querySelector('.input-title')
const addBtn = document.querySelector('.add')
const cardsContainer = document.querySelector('.cards')


//get input value
const fillInput = () => {
	input.addEventListener('keyup', (e) => {
		e.preventDefault()
		if (e.keyCode === 13) {
			let valueInput = e.target.value
			console.log(valueInput)

			//card template
			let card = ''
			if (valueInput !== '') {
				card += `
					<!-- card template -->
					<div class="card">
						<div class="card-top">
						<p contenteditable="true" class="content">
							${valueInput}
						</p>
						</div>
						<div class="card-bottom">
						<!-- delete -->
						<div class="pretty p-default p-round p-thick">
						<input type="checkbox" />
						<div class="state p-danger-o">
							<label>delete</label>
						</div>
					</div>
						<!-- done -->
						<div class="pretty p-default p-round p-thick">
						<input type="checkbox" />
						<div class="state p-success-o">
							<label>done</label>
						</div>
					</div>
					</div>
					</div>
					<!-- --------------- -->
			`
			}
			else {
				alert('Please fill input field.')
			}
			cardsContainer.innerHTML += card
		}
	})
}


//input event
addBtn.addEventListener('click', () => {
	input.classList.toggle('input-title')
	fillInput()

})