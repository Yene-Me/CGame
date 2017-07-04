import PubSub from './../core/PubSub'
import Const from './../core/Const'

// singleton Ajax function don't need to create more than one instance
// TODO qeue request
var Ajax = (function () {
    var ajax = null;

    function XMLHttp() {
        this._xhttp = new XMLHttpRequest();

        this._xhttp.onreadystatechange = function () {
            this._processResponse()
        }.bind(this);
    }

    XMLHttp.prototype.requestGet = function (data) {
        this._xhttp.open("GET", data, true);
        this._xhttp.send();
    }

    XMLHttp.prototype.requestPost = function (url, data) {
        this._xhttp.open("POST", url, true);
        this._xhttp.send(data);
    }


    XMLHttp.prototype._processResponse = function () {
        console.log(this._xhttp.readyState, this._xhttp.status)
        if (this._xhttp.readyState == 4) {
            if (this._xhttp.status == 200) {
                var parsedData = JSON.parse(this._xhttp.responseText);
                console.log(this._xhttp.responseText);
                PubSub.publish(Const.SEARCH_RESULT, parsedData);
            }
            else {
                PubSub.publish(Const.SEARCH_ERROR, "");
                console.error("oops...", this._xhttp);
            }

        }
    }
    return {
        init: function () {
            if (!ajax) {
                ajax = new XMLHttp
                return ajax;
            }
            else {
                return ajax;
            }
        }
    }

}());

export default Ajax
