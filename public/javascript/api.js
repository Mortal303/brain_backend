function query(e, t, n, r, success, error, showError) {
    showError = typeof showError !== "undefined" ? showError : true;
    if (typeof mprogress != "undefined") {
        mprogress.start();
    }
    $("#loader-wrap").show();
    var params = {};
    if (t == "GET" && n != undefined) {
        params = $.extend({}, params, n);
        n = undefined;
    }
    return $.ajax({
        url: "/api" + e + "?" + jQuery.param(params),
        async: r,
        method: t,
        data: n != undefined ? JSON.stringify(n) : "",
        dataType: "json",
        contentType: "application/json",
        success: function (msg) {
            if (typeof mprogress != "undefined") {
                mprogress.end(true);
            }
            success(msg);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (typeof mprogress != "undefined") {
                mprogress.end(true);
            }
            if (error != undefined) error(jqXHR.responseJSON);
        },
    });
}


var api = {
    ques: {
        create: function (data, success, error) {
            return query("/createQuestion", "POST", data, 1, success, error);
        },
        fetch: function (success, error) {
            return query("/fetchQuestion", "GET", null, 1, success, error);
        },
    },
};