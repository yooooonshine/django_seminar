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

window.onload = function () {
    requestAllProfits();
};
//입력된 기록들을 리스트로 가져오기
function requestAllProfits() {
    $.ajax({
        type: 'get',
        headers: {'X-CSRFToken': csrftoken},
        url: '/profit/',
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


function showResults(profitData) {
    // Clear existing list items
    $('#profit-list').empty();

    console.log(profitData);

    // Iterate over the profit data and create list items
    profitData.forEach(function(profit) {
        console.log(profit.total_earning_price);
        let listItem = $('<li class="list-group-item"></li>');
        listItem.append('<div>시간 : <span id="creatxe-date">' + new Date(profit.create_date).toLocaleString() + '</span></div>');
        listItem.append('<div>내가 쓴 금액: <span id="total-cost-price">' + profit.total_cost_price + '</span></div>');
        listItem.append('<div>내가 번 금액: <span id="total-selling-price">' + profit.total_selling_price + '</span></div>');
        listItem.append('<div>내가 번 금액: <span id="total-earning-price">' + profit.total_earning_price + '</span></div>');
        listItem.append('<div>수익률: <span id="rate-of-return">' + profit.rate_of_return + '</span></div>');

        // Append the list item to the list
        $('#profit-list').append(listItem);
    });
}
