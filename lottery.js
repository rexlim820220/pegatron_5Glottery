function generate(size, lowest, highest) {
	var numbers = [];
	for(var i = 0; i < size; i++) {
		var add = true;
		var randomNumber = Math.floor(Math.random() * highest) + 1;
		for(var y = 0; y < highest; y++) {
			if(numbers[y] == randomNumber) {
				add = false;
			}
		}
		if(add) {
			numbers.push(randomNumber);
		} else {
			i--;
		}
	}
  
	var highestNumber = 0;
	for(var m = 0; m < numbers.length; m++) {
		for(var n = m + 1; n < numbers.length; n++) {
			if(numbers[n] < numbers[m]) {
				highestNumber = numbers[m];
				numbers[m] = numbers[n];
				numbers[n] = highestNumber;
			}
		}
	}
	document.getElementById("numbers").innerHTML = numbers.join(" - ");
}

var select = 0;
var numbers = [];
var numbersSize = 35;
var buttonClicked = false;
var javascriptElement = "numbers-display";
for (var i = 0; i <= numbersSize; i++) numbers.push( i+1 );
//This function takes a single argument and displays it in the browser.
function displayContent (content) {
	document.getElementById(javascriptElement).style.textAlign = "center";
	document.getElementById(javascriptElement).innerHTML = content;
};

function runRandomNumbers (array) {
	select = array[Math.floor(Math.random()*numbersSize)];
	displayContent(select);		
};

function runOnInterval(fn, numbers) {
	return window.setInterval(function() { fn(numbers) }, 150);
};

var timeoutID = runOnInterval(runRandomNumbers, numbers);

const changeValue = (timeoutID) => {
	buttonClicked = !buttonClicked;
    if (buttonClicked == true){
    	window.clearTimeout(timeoutID);
    	document.getElementById("myText").innerHTML = timeoutID;
    }
    else{
    	document.getElementById("myText").innerHTML = buttonClicked;
    }
}

function IntervalTimer(callback, interval) {
        var timerId, startTime, remaining = 0;
        var state = 0; //  0 = idle, 1 = running, 2 = paused, 3= resumed

        this.pause = function () {
            if (state != 1) return;

            remaining = interval - (new Date() - startTime);
            window.clearInterval(timerId);
            state = 2;
        };

        this.resume = function () {
            if (state != 2) return;

            state = 3;
            window.setTimeout(this.timeoutCallback, remaining);
        };

        this.timeoutCallback = function () {
            if (state != 3) return;

            callback();

            startTime = new Date();
            timerId = window.setInterval(callback, interval);
            state = 1;
        };

        startTime = new Date();
        timerId = window.setInterval(callback, interval);
        state = 1;
    }

    var timer = new IntervalTimer(function () {
        alert("Done!");
    }, 5000);

    window.setTimeout(function () {
        timer.pause();
        window.setTimeout(function () {
            timer.resume();
        }, 5000);
    }, 2000);