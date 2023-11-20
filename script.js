document.addEventListener('DOMContentLoaded', function () {
	let display = document.getElementById('inputBox')
	let buttons = document.querySelectorAll('button')
	let history = []
	let reg = /[A-Za-zA-Яа-яЁё]/g // запрет на ввод латиницы 

	display.oninput = function () {
		this.value = this.value.replace(reg, '') 
	}

	display.addEventListener('keydown', function (event) {
		if (event.key === 'Enter') {
			event.preventDefault() // Предотвратить переход на новую строку
			calculateResult()
		}
	})

	buttons.forEach(button => button.addEventListener('click', buttonClick))

	function buttonClick(event) {
		const clickedButton = event.target
		const buttonText = clickedButton.textContent

// объявления функциональности клавиш
		switch (buttonText) {
			case '=':
				calculateResult()
				break
			case 'Ce':
				clearEntry()
				break
			case '🠔':
				deleteLastCharacter()
				break
			case '±':
				toggleSign()
				break
			default:
				updateDisplay(buttonText)
				break
			case 'H':
				clearEntry()
				break
		}
	}

// запрет на повторы символов

	function updateDisplay(value) {
		if (
			/[\+\-\=\*\/\%]$/.test(display.value) &&
			/[\+\-\=\*\/\%]$/.test(value)
		) {
			return
		}

		display.value =
			display.value === '0' || display.value.includes('=')
				? value
				: display.value + value

		history.push({ query: display.value, result: '' })
	}

	function clearEntry() {
		display.value = '0'
	}

	function deleteLastCharacter() {
		display.value = display.value.slice(0, -1)
	}

	function toggleSign() {
		display.value = -parseFloat(display.value)
	}

	// —————————————— сохранение истории ——————————————

	let historyContainer = document.getElementById('historyContainer')
	let historyList = document.getElementById('historyList')

	// Обновляем историю при каждом нажатии "="
	function updateHistory() {
		let lastEntry = history[history.length - 1]
		let listItem = document.createElement('li')
		listItem.textContent = `${lastEntry.query} = ${lastEntry.result}`
		historyList.appendChild(listItem)
	}

	function calculateResult() {
		try {
			let result = eval(display.value)

			if (Number.isInteger(result)) {
				display.value = result
			} else {
				display.value = result.toFixed(2)
			}

			history[history.length - 1].result = display.value

			// Обновляем историю
			updateHistory()
		} catch (error) {
			display.value = 'Ошибка'
		}
	}

	let clearHistoryButton = document.getElementById('clearHistory')
	clearHistoryButton.addEventListener('click', clearHistory)

	function clearHistory() {
		history = []
		historyList.innerHTML = '' // Очистить отображение истории на странице
	}

})
