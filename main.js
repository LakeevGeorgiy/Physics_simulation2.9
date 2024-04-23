let input_frequency_text = document.getElementById("input_frequency_id");
let information_frequency_text = document.getElementById("information_frequency_id");
let amplitude_text = document.getElementById("amplitude_id");
let button = document.getElementById("button_id");

let input_frequency = input_frequency_text.value;
let information_frequency = information_frequency_text.value;
let amplitude = amplitude_text.value;

function calculateCarrierWave(t){
	return amplitude * Math.cos(input_frequency * t);
}

function calculateInformationWave(t){
    return amplitude * Math.cos(information_frequency * t);
}

function calculateAmplitudeModulation(t){
    return amplitude * (1 + Math.cos(information_frequency * t)) * Math.cos(input_frequency * t);
}

function calculateSpectrum(t){
    return 1;
}

function calculateSpectrumModulation(spectrumModulation){ 
}

function plot() {

    let time_coordinates = [];
	let carrierWave = [];
	let informationWave = [];
	let amplitudeModulation = [];
    let spectrum = [];
    
    let xSpectrumInput = [-input_frequency, input_frequency];
    let spectrumInput = [amplitude, amplitude];

    let xSpectrumInformation = [-information_frequency, information_frequency];
    let spectrumInformation = [amplitude, amplitude];

    let xSpectrumModulation = [-input_frequency - information_frequency, -input_frequency, -input_frequency + information_frequency,
        input_frequency - information_frequency, input_frequency, input_frequency + information_frequency];
    let spectrumModulation = [amplitude /2, amplitude, amplitude / 2, amplitude / 2, amplitude, amplitude / 2];



    let T = 2 * Math.PI / information_frequency;
    for (let t = 0; t < 5 * T; t += 0.001) {

        time_coordinates.push(t);
        carrierWave.push(calculateCarrierWave(t));
        informationWave.push(calculateInformationWave(t));
        amplitudeModulation.push(calculateAmplitudeModulation(t));
        spectrum.push(calculateSpectrum(t));
	}

    let first = {
        x: time_coordinates, 
        y: carrierWave, 
        mode: 'lines',
		name: 'I осциллятор'
    };

    let second = {
        x: time_coordinates,
        y: informationWave,
        mode: 'lines',
		name: 'II осциллятор'
    };

    let third = {
        x: time_coordinates,
        y: amplitudeModulation,
        mode: 'lines',
		name: 'сумма колебаний'
    };

    let fourth = {
        x: xSpectrumInput,
        y: spectrumInput,
        type: 'bar',
        width: 0.2,
    };

    let fifth = {
        x: xSpectrumInformation,
        y: spectrumInformation,
        type: 'bar',
        width: 0.2,
    };

    let sixth = {
        x: xSpectrumModulation,
        y: spectrumModulation,
        type: 'bar',
        width: 0.2,
    };

	let layout1 = {
        title: 'Несущий сигнал',
		autosize: true,
		xaxis: {
			title: 't, c'
		},
		yaxis: {
			title: 'A, B'
		}
	};

    let layout2 = {
        title: 'Информационный сигнал',
		autosize: true,
		xaxis: {
			title: 't, c'
		},
		yaxis: {
			title: 'A, B'
		}
	};

    let layout3 = {
        title: 'Результат модуляции',
		autosize: true,
		xaxis: {
			title: 't, c'
		},
		yaxis: {
			title: 'A, B'
		}
	};

    let widthPlot = 1.5 * input_frequency + 2 * information_frequency;

    let layout4 = {
        title: 'Спектр несущего сигнала',
	    autosize: true,
		xaxis: {
			title: 'Omega, Гц',
            range: [-widthPlot, widthPlot]
		},
		yaxis: {
			title: 'A, B'
		}
	};

    let layout5 = {
        title: 'Спектр информационного сигнала',
	    autosize: true,
		xaxis: {
			title: 'Omega, Гц',
            range: [-widthPlot, widthPlot]
		},
		yaxis: {
			title: 'A, B'
		}
	};

    let layout6 = {
        title: 'Спектр результата модуляции',
	    autosize: true,
		xaxis: {
			title: 'Omega, Гц',
            range: [-widthPlot, widthPlot]
		},
		yaxis: {
			title: 'A, B'
		}
	};

	Plotly.react('tester1', [first], layout1);
	Plotly.react('tester2', [second], layout2);
	Plotly.react('tester3', [third], layout3);
	Plotly.react('tester4', [fourth], layout4);
	Plotly.react('tester5', [fifth], layout5);
	Plotly.react('tester6', [sixth], layout6);
}

button.addEventListener("click", function(e){

	input_frequency = parseFloat(input_frequency_text.value);
	if (input_frequency < 0) {
		alert("Частота меньше 0!");
		return;
	}
	
	information_frequency = parseFloat(information_frequency_text.value);
	if (information_frequency < 0) {
		alert("Частота меньше 0!");
		return;
	}

	amplitude = parseFloat(amplitude_text.value);
	if (amplitude < 0) {
		alert("Амплитуда меньше 0!");
		return;
	}
	
    plot();

});