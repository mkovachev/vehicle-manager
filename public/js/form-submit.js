(function getData() {

var form = document.getElementById('save-me');
var data = {};
var ajaxhttp = new XMLHttpRequest();
//var url = '../public/data/data.json';
var url = 'http://localhost:27017/garage';



form.addEventListener('submit', function(e) {
    e.preventDefault();
    var inputs = [].slice.call(form).forEach(input => {
        data[input.name] = input.value;
    });

    var JSONdata = JSON.stringify(data, null, '\t');
    //form.reset();

    console.log(JSONdata);

    ajaxhttp.open("POST", url, true);
    ajaxhttp.setRequestHeader("car-data","application/json");
    ajaxhttp.onreadystatechange = function(){
        if(ajaxhttp.readyState == 4 && ajaxhttp.status == 200){
            JSONdata = JSON.parse(ajaxhttp.responseText);
            console.log(JSONdata);
            console.log(ajaxhttp);
        }
        else {
            console.log('An error occurred!');
        }
    };
    ajaxhttp.send(JSONdata);
});

})();
