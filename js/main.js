var executeAjax = function (type, url, data, success) {
    $.ajax({
        type: type,
        url: url,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: "json"
    }).done(function (result) {
        console.log('Success: ', result);
        success(result);
    }).fail(function (el1, el2) {
        console.log('Failed: ', el1)
    });
};

$(document).ready(function () {
    $('#signin').submit(function (e) {
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        var success = function(result){
            $("#tokenResult").text(JSON.stringify(result));
            $("#createStoreToken").val(result.token);
        };
        executeAjax('POST', 'https://blockchain7.kmi.open.ac.uk/rdf/users/signin', {username: username, password: password}, success);
    });

    $('#createStore').submit(function (e) {
        e.preventDefault();
        var token = $('#createStoreToken').val();

        var success = function(result){
            $("#transactionResult").text(JSON.stringify(result));
        };
        executeAjax('POST', 'https://blockchain7.kmi.open.ac.uk/rdf/store/create', {token: token}, success);
    });

});