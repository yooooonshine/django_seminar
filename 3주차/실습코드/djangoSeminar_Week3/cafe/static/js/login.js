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

function login() {
    let user_id = $('#id').val();
    let user_pw = $('#pw').val();

    let data = {
        "id": user_id,
        "pw": user_pw,
    }

    $.ajax({
        type: 'post',
        headers: {'X-CSRFToken': csrftoken},
        url: '/login/',
        data: JSON.stringify(data),
        async: false,
        dataType: 'JSON',
        success: function (data) {
            localStorage.setItem('userId', user_id);
            window.location.href = '/cafe_page';
        },
        error: function (request, status, error) {
            if (request.status === 404) {
                alert("등록되지 않은 아이디입니다.");
            } else if (request.status === 500) {
                alert("서버가 작동하지 않습니다.");
            } else {
                alert(request.status + " 예외입니다.");
            }
        },
    });
}