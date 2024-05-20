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
    getArticles();
};

function deleteArticle(postId) {
    $.ajax({
        type: 'delete',
        headers: {'X-CSRFToken': csrftoken},
        url: '/cafe/article?post-id=' + postId.value,
        async: false,
        dataType: 'JSON',
        success: function (data) {
            window.location.assign("/cafe_page");
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

function postArticle() {
    let data = {
        "userId": localStorage.getItem("userId"),
        "title": $("#title").val(),
        "content": $("#content").val()
    }

    $.ajax({
        type: 'post',
        headers: {'X-CSRFToken': csrftoken},
        url: '/cafe/article/',
        data: JSON.stringify(data),
        async: false,
        dataType: 'JSON',
        success: function (data) {
            window.location.assign("/cafe_page");
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

function getArticles() {

    $.ajax({
        type: 'get',
        headers: {'X-CSRFToken': csrftoken},
        url: '/cafe/article/',
        async: false,
        dataType: 'JSON',
        success: function (data) {
            showArticles(data.articles);
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

function showArticles(articles) {
    for (let i = 0; i < articles.length; i++) {
        let userId = articles[i].user_id;
        let title = articles[i].title;
        let content = articles[i].content;

        let innerHtml = '<li className="list-group-item">' + '유저명:' +  userId + ', 제목:' + title + ', 내용:' + content + '</li>';

        $('#articles').append(innerHtml)
    }
}