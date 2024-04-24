let input_frequency_text = document.getElementById("input_frequency_id");
let information_frequency_text = document.getElementById("information_frequency_id");
let input_amplitude_text = document.getElementById("input_amplitude_id");
let information_amplitude_text = document.getElementById("information_amplitude_id")
let button = document.getElementById("button_id");

let input_frequency = input_frequency_text.value;
let information_frequency = information_frequency_text.value;
let input_amplitude = input_amplitude_text.value;
let information_amplitude = information_amplitude_text.value;
let m = information_amplitude / input_amplitude;

function calculateCarrierWave(t){
	return input_amplitude * Math.cos(input_frequency * t);
}

function calculateInformationWave(t){
    return information_amplitude * Math.cos(information_frequency * t);
}

function calculateAmplitudeModulation(t){
    return input_amplitude * (1 + m * Math.cos(information_frequency * t)) * Math.cos(input_frequency * t);
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

	let f0 = input_frequency / (2 * Math.PI);
	let F = information_frequency / (2 * Math.PI);
    
    let xSpectrumInput = [-f0, f0];
    let spectrumInput = [input_amplitude, input_amplitude];

    let xSpectrumInformation = [-F, F];
    let spectrumInformation = [information_amplitude, information_amplitude];

    let xSpectrumModulation = [-f0 - F, -f0, -f0 + F, f0 - F, f0, f0 + F];
    let spectrumModulation = [m * input_amplitude /2, input_amplitude, m * input_amplitude / 2, 
							m * input_amplitude / 2, input_amplitude, m * input_amplitude / 2];



    let T = 2 * Math.PI / information_frequency;
	let step = 5 * T / 10000;
    for (let t = 0; t < 5 * T; t += step) {

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

    let widthPlot = 1.5 * F + 2 * f0;

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
	if (input_frequency <= 0) {
		alert("Частота несущего сигнала должна быть больше 0!");
		return;
	}
	
	information_frequency = parseFloat(information_frequency_text.value);
	if (information_frequency <= 0) {
		alert("Частота информационного сигнала должна быть больше 0!");
		return;
	}


	if (information_frequency > input_frequency){
		alert("Частота информационного сигнала должна быть меньше частоты несущего сигнала!");
		return;
	}

	// if (information_frequency * 10 > input_frequency){
	// 	alert("Возможно частота несущего сигнала должна быть больше для корректной работы!");
	// }

	input_amplitude = parseFloat(input_amplitude_text.value);
	if (input_amplitude < 0) {
		alert("Амплитуда меньше 0!");
		return;
	}

	information_amplitude = parseFloat(information_amplitude_text.value);
	if (information_amplitude < 0) {
		alert("Амплитуда меньше 0!");
		return;
	}
	
	m = information_amplitude / input_amplitude;
    plot();

});