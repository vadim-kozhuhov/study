import '../scss/app.scss';
import getData from './util';
document.addEventListener('DOMContentLoaded', function () {
    getData();
    document.getElementById('reload').addEventListener('click', function (event) {
        event.target.disabled = true;
        getData();
    })
})