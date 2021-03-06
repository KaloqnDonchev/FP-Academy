/////////////////////////////////////////////////////////
/////		Base definitions. DO NOT EDIT!!!		/////
/////////////////////////////////////////////////////////

// API URL to get the latest exchange rates
// Note: the returned rates are based on the EUR
var endpointURL = 'https://api.exchangeratesapi.io/latest';

// use this object to create logic to populate the table
var testExchangeRates = {
	base: "EUR",
	date: "2019-05-31",
	rates: {
		AUD: 1.6136,
		BGN: 1.9558,
		BRL: 4.4462,
		CAD: 1.5115,
		CHF: 1.1214,
		CNY: 7.7045,
		CZK: 25.816,
		DKK: 7.468,
		GBP: 0.88693,
		HKD: 8.7457,
		HRK: 7.4185,
		HUF: 324.34,
		IDR: 15982.17,
		ILS: 4.0505,
		INR: 77.741,
		ISK: 138.3,
		JPY: 121.27,
		KRW: 1328.31,
		MXN: 21.8922,
		MYR: 4.6747,
		NOK: 9.7915,
		NZD: 1.7134,
		PHP: 58.225,
		PLN: 4.2843,
		RON: 4.743,
		RUB: 72.9053,
		SEK: 10.639,
		SGD: 1.5378,
		THB: 35.282,
		TRY: 6.527,
		USD: 1.1151,
		ZAR: 16.3834
	}
};

function errorAlert(error) {
	let errorMessage = $(".error-message");
	errorMessage.removeClass("results error-message").addClass("show-container");
	errorMessage.text(error);
}


/////////////////////////////////////////////////////////
/////					SOLUTIONS					/////
/////////////////////////////////////////////////////////

$(document).ready(function () {
	let fromCurrency = $("#base-currency");
	let toCurrency = $(".currencies");
	let metCondition;
	let newEndpointURL;
	let temp = [];

	$(".btn").click(function (event) {
		event.preventDefault();
		
		if (fromCurrency[0].selectedIndex > 0) {
			fromCurrency = fromCurrency.find('option:selected').text();
			$(".currencies .form-check-input").each(function (i, obj) {
				if (obj.checked) {
					metCondition = true;
					toCurrency.push(obj.value);
				}
			});

			if (metCondition) {
				for (let i = 1; i < toCurrency.length; i++) {
					temp.push(toCurrency[i]);
				}
				newEndpointURL = `${endpointURL}?base=${fromCurrency}&symbols=${temp.toString()} `;
			} else {
				newEndpointURL = `${endpointURL}?base=${fromCurrency}`;
			}

			$.ajax({ url: newEndpointURL })
				.done((json) => {
					$(".exchange-rates-container").removeClass("results exchange-rates-container").addClass("show-container");
					for (let key in json.rates) {
						$("tbody").append($("<tr></tr>")).append($(`<th>${key}</th>`)).append($(`<th>${json.rates[key]}</th>`));
					}
				})
				.fail(() => {
					errorAlert("Error, could not find currencies");
				})
		} else {
			errorAlert("Please choose a currency first");
		}
	})
})
