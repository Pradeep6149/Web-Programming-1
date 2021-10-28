(function () {
  const staticForm = document.getElementById('static-form');
  function fibonacciFunction(parsedInputValue) {
    if (!parsedInputValue && parsedInputValue!=0) throw 'Provide a valid Input';
    if (parsedInputValue === 1) return parsedInputValue; 
    if (parsedInputValue < 1) return 0;
    return fibonacciFunction(parsedInputValue - 1) + fibonacciFunction(parsedInputValue - 2);
  }

  function primeChecker(fibonacciResult) {
    if (!fibonacciResult && fibonacciResult!=0) throw 'Provide a valid Input';
	if(fibonacciResult === 1 || fibonacciResult === 0 ) return 0;
	else if(fibonacciResult === 2) return 1;
	else{
		for(let i = 2 ; i < fibonacciResult ; i++){
			if(fibonacciResult % i === 0) return 0;
		}
	}
    return 1;
  }

  

  if (staticForm) {

    staticForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const errorContainer = document.getElementById('error-container');
      const errorTextElement = errorContainer.getElementsByClassName(
        'text-goes-here'
      )[0];
      errorContainer.classList.add('hidden');
      try {
        const inputNumberElement = document.getElementById('number');
        const inputNumberValue = inputNumberElement.value;
        const parsedInputValue = parseInt(inputNumberValue);
        if(inputNumberValue === '') throw "Provide a valid Input"
        const fibonacciResult = fibonacciFunction(parsedInputValue);
        const primeResult = primeChecker(fibonacciResult);
        if(primeResult){
          const listItems = document.createElement('li');
          const printResult = document.createTextNode(`The Fibonacci of ${inputNumberValue} is ${fibonacciResult}.`);
          listItems.appendChild(printResult);
          listItems.className = "is-prime"
          const myUl = document.getElementById("results");
          myUl.appendChild(listItems);
          staticForm.reset();
          inputNumberElement.focus();
        }
        else{
          const listItems = document.createElement('li');
          const printResult = document.createTextNode(`The Fibonacci of ${inputNumberValue} is ${fibonacciResult}.`);
          listItems.appendChild(printResult);
          listItems.className = "not-prime"
          const myUl = document.getElementById("results");
          myUl.appendChild(listItems);
          staticForm.reset();
          inputNumberElement.focus();
        }        
      } catch (e) {
        const message = typeof e === 'string' ? e : e.message;
        const error = document.getElementById('error-container');
        errorTextElement.textContent = message;
        error.classList.remove('hidden');
      }
    });
  }
})();
