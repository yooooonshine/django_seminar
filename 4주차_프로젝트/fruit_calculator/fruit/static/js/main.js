function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');


let fruitElement = "<li class=\"list-group-item\">\n" +
    "            <select class=\"form-select w-25 d-inline\" aria-label=\"Default select example\">\n" +
    "                <option value=\"1\">사과</option>\n" +
    "                <option value=\"2\">귤</option>\n" +
    "                <option value=\"3\">복숭아</option>\n" +
    "                <option value=\"4\">메론</option>\n" +
    "                <option value=\"5\">딸기</option>\n" +
    "                <option value=\"6\">수박</option>\n" +
    "            </select>\n" +
    "\n" +
    "            <input type=\"text\" placeholder=\"원가\">\n" +
    "            <input type=\"text\" placeholder=\"판매가\">\n" +
    "            <input type=\"text\" placeholder=\"수량\">\n" +
    "        </li>";

//과일 리스트 추가
function addFruitList() {
    $("#fruit-list").append(fruitElement);
}

//과일 계산하기
function requestCalculate() {
    let fruitsData = getFruitData();

    let data = {
        "fruits": fruitsData
    }

    $.ajax({
        type: 'post',
        headers: {'X-CSRFToken': csrftoken},
        url: '/fruit/calculate/',
        data: JSON.stringify(data),
        async: false,
        dataType: 'JSON',
        success: function (data) {
            showResults(data.result)
        },
        error: function (request, status, error) {
            if (request.status === 500) {
                alert("서버가 작동하지 않습니다.");
            } else {
                alert(request.status + " 예외입니다.");
            }
        },
    });
}

//입력된 과일 정보를 리스트로 가져오기
function getFruitData() {
    const fruitList = document.querySelectorAll('#fruit-list .list-group-item');
    const fruitsData = [];

    fruitList.forEach(item => {
        const select = item.querySelector('select');
        const inputs = item.querySelectorAll('input');

        const fruit = {
            "name": select.value,
            "costPrice": inputs[0].value,
            "sellingPrice": inputs[1].value,
            "quantity": inputs[2].value
        };

        fruitsData.push(fruit);
    });

    return fruitsData;
}

// 응답된 계산 결과를 띄우기
function showResults(result) {
    $('#result-wrapper').css('display', 'block')

    const totalCostPrice = result.totalCostPrice;
    const totalSellingPrice = result.totalSellingPrice;
    const totalEarningPrice = result.totalEarningPrice;
    const rateOfReturn = result.rateOfReturn;

    $('#total-cost-price').empty();
    $('#total-selling-price').empty();
    $('#total-earning-price').empty();
    $('#rate-of-return').empty();

    $('#total-cost-price').text(totalCostPrice);
    $('#total-selling-price').text(totalSellingPrice);
    $('#total-earning-price').text(totalEarningPrice);
    $('#rate-of-return').text(rateOfReturn);
}

//profit 저장하기
function saveProfit() {
    const totalCostPrice = $('#total-cost-price').html();
    const totalSellingPrice = $('#total-selling-price').html();
    const totalEarningPrice = $('#total-earning-price').html();
    const rateOfReturn = $('#rate-of-return').html();

    const data = {
        "totalCostPrice" : totalCostPrice,
        "totalSellingPrice" : totalSellingPrice,
        "totalEarningPrice" : totalEarningPrice,
        "rateOfReturn" : rateOfReturn,
    }

    $.ajax({
        type: 'post',
        headers: {'X-CSRFToken': csrftoken},
        url: '/profit/',
        data: JSON.stringify(data),
        async: false,
        dataType: 'JSON',
        success: function (data) {
            alert("저장되었습니다.")
        },
        error: function (request, status, error) {
            if (request.status === 500) {
                alert("서버가 작동하지 않습니다.");
            } else {
                alert(request.status + " 예외입니다.");
            }
        },
    });
}