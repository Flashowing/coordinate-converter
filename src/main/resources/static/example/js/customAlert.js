function customAlert(){

}
customAlert.prototype = {
    alert: function (){
        let alert = document.createElement('div');
        alert.style.position ='absolute';
        alert.style.background = '#069c1f';
        alert.style.width = '150px';
        alert.style.height = '80px';
        alert.style.top = '10vh';
        let WindowWidth = window.innerWidth;
        let left = WindowWidth/2-150;
        alert.style.left = left+'px';
        document.body.appendChild(alert);
        al
    }
}