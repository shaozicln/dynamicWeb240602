let $$ = xxx => {
    return document.querySelector(xxx);
}

let x = $$(".search");
let y = $$(".searchtb");
let c1 = $$(".clear");
let c2 = $$("input[type='text']");

y.addEventListener('click', () => {
    x.classList.toggle('changewidth');
});
c1.addEventListener('click', () => {
    c2.value = '';
});

window.onload = function(){
    var Input = document.getElementById("input");
    var Btn = document.getElementById("go");
    var Iframe = document.getElementById("iframe");
    Btn.onclick = function(){
        Iframe.src ="http://cn.bing.com/search?q=" + Input.value;
    }

}