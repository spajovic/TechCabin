$(document).ready(function(){
    prikazNavigacije();  
    var lokacija = window.location.pathname;
    var stranica = lokacija.split("/").pop();

    $('.kupi_proiz').click(kupiProizvod);

    $(window).scroll(pozicionirajMeni);

    $('#main_btn').click(validirajMainMail);

    // Js za Help stranu
    if(stranica == "helpcenter.html" || stranica == "helpcenter.html#"){
        $('.pitanje_odg').collapse({
            open: function(){
                this.slideDown(400);
            },
            close: function(){
                this.stop();
                this.slideUp();
            }
        })            
    }

    // Js za contact stranicu
    if(stranica == "contact.html" || stranica == "contact.html#"){
        setInterval(prikaziVreme,100);
        $('#sbm_form').click(validateForm);
    }

    if(stranica == "deals.html" || stranica == "deals.html#"){
        
    }
    
});

// Pozicioniranje menija Sticky
function pozicionirajMeni(){
    var scrollPos = $(document).scrollTop();
    if(scrollPos >= 250){
        $('#header_menu').css({
                "position": "sticky",
                "top": "0",
                "z-index": "1"
            });
    }
    else{
        $('#header_menu').css({
            "position": "sticky",
            "top": "auto",
            "z-index": "1" 
        });
    }
}

// Funkcija za sat
function prikaziVreme(){
    var datum = new Date();
    var sati = datum.getHours();
    var minuti = datum.getMinutes();
    var sekunde = datum.getSeconds();
    var preposle = 'AM';
    if(sati == 0){
    sati == 12;
    }
    if(sati > 12){
    sati = sati-12;
    preposle = 'PM'
    }
    if(sati < 10){
    sati = '0'+sati;
    }
    if(minuti < 10){
    minuti = '0' + minuti;
    }
    if(sekunde <10){
    sekunde = '0'+sekunde;
    }
    var vreme = sati + ':' + minuti + ':' + sekunde +' '+ preposle;

    document.getElementById('contact_naslov').innerText = vreme;
}

// Funkcija za prikazivanje aktivnog linka menija
function prikazNavigacije(){
    var lokacija = window.location.pathname;
    var stranica = lokacija.split("/").pop();
    console.log(stranica);
    if(stranica == "contact.html"){
        $('#contact').css({
            "color":"#751fff",
            "border-bottom":"1px solid #751fff"
        });
    }
    if(stranica == "index.html" || stranica == "index.html#"){
        $('#home').css({
            "color":"#751fff",
            "border-bottom":"1px solid #751fff"
        });
    }
    if(stranica == "helpcenter.html" || stranica == "helpcenter.html#"){
        $('#help_centar').css({
            "color":"#751fff",
            "border-bottom":"1px solid #751fff"
        });
    }
    if(stranica == "deals.html" || stranica == "deals.html#"){
        $('#nav_deals').css({
            "color":"#751fff",
            "border-bottom":"1px solid #751fff"
        });
    }
}

// Funkcija za izbacivanje obavestenja o kupovini
function kupiProizvod(){
    alert('Product is in the cart!');
}

// Funkcija za validaciju forme na kontakt strani

function validateForm(){
    let firstName = $("#FirstName").val();
    let lastName = $("#LastName").val();
    let email = $("#Email").val();
    let subject = $("#Subject").val();
    let message = $("#text_area").val();
    let box = $("#cxbox_label");

    let imeprovera = /^[a-zA-Z/šđčćžŠĐČŽĆ]{2,30}(([a-zA-Z/šđčćžŠĐČŽĆ ])?[a-zAZ/šđčćžŠĐČŽĆ]*)*$/;

    let prezimeprovera = /^[a-zA-Z/šđčćžŠĐČŽĆ]{2,30}(([a-zA-Z/šđčćžŠĐČŽĆ ])?[azA-Z/šđčćžŠĐČŽĆ]*)*$/;

    let mailprovera = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zAZ]{2,}))$/;

    let subjectprovera = /^(.){2,30}$/;

    let messageprovera = /^(.){2,500}$/;

    let greske = [];
    
    if(!imeprovera.test(firstName)){
        $("#FirstName").css({
            "border":"0.2px solid red"
        });
        $("#labelName").html("First Name (No numbers, max 30 char)");
        greske.push(1);
    }
    else{
        $("#labelName").html("First Name");
        $("#FirstName").css({
            "border":"none"
        });
    

    }

    if(!prezimeprovera.test(lastName)){
        $("#LastName").css({
            "border":"0.2px solid red"
        });
        $("#labelSurname").html("Last Name (No numbers, max 30 char)");
        greske.push(1);
    }
    else{
        $("#LastName").css({
            "border":"none"
        });
        $("#labelSurname").html("Last Name");
    

    }

    if(!mailprovera.test(email)){
        $("#Email").css({
            "border":"0.2px solid red"
        });
        $("#labelEmail").html("Email (invalid format)");
        greske.push(1);
    }
    else{
        $("#Email").css({
            "border":"none"
        });
        $("#labelEmail").html("Email");
        

    }

    if(!subjectprovera.test(subject)){
        $("#Subject").css({
            "border":"0.2px solid red"
        });
        $("#labelSubject").html("Subject (max 2-30 char)");
        greske.push(1);
    }
    else{
        $("#Subject").css({
            "border":"none"
        });
        $("#labelSubject").html("Subject");
        

    }

    if(!messageprovera.test(message)){
        $("#text_area").css({
            "border":"0.2px solid red"
        });
        $("#labelArea").html("Message (max 2-500 char)");
        greske.push(1);
    }
    else{
        $("#text_area").css({
            "border":"none"
        });
        $("#labelArea").html("Message");
        
    }
    
    if(!document.getElementById('cxbox').checked){
        $('#boxLabel').css({
            "color":"red"
        });
        greske.push(1);
    }
    else{
        $('#boxLabel').css({
            "color":"black"
        });
    }

    if(greske.length = 0){
        alert('Message sent');
    }
}

// Validacija email-a na main strani
function validirajMainMail(){
    let email = $("#mail").val();
    let mailprovera = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zAZ]{2,}))$/;

    if(!mailprovera.test(email)){
        $("#mail").css({
            "border":"0.2px solid red"
        });
        $("#obavestenja_mail").html("Email * (Invalid mail input)");
    }
    else{
        $("#mail").css({
            "border":"none"
        });
        $("#obavestenja_mail").html("Email *")
        alert("Message sent");
    }
}






