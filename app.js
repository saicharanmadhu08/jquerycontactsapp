$(document).ready(onLoad);
function onLoad() {
    if (localStorage.getItem("allContactsData") === null) {
        getAllContacts();
    } else {
        showContactsAsTable();
    }



    $("#addNewContactButton").click(function () {
        $("#addNewContactButton, #contactsTable").hide();
        $("#CancelContactButton, #newContactForm").show();
    });

    $("#CancelContactButton").click(function () {
        $("#addNewContactButton").show();
        $("#CancelContactButton").hide();
        $("#contactsTable").show();
        $("#newContactForm").hide();
    });

    $("#submitContact").click(addNewContact);

    $("#showContactButton").click(function () {
        $("#showContactButton").hide();
        $("#contactsTable").show();
        $("#addNewContactButton").show();
    });


    $("#searchKey").keyup(function () {
        var searchKey = $(this).val();
        var tr = $("#bodyRows tr");
        for (var i = 0; i < tr.length; i++) {
            var td1 = tr[i].children[0];
            var td2 = tr[i].children[1];
            var td3 = tr[i].children[2];
            var td4 = tr[i].children[3];
            var condition1 = $(td1).html().toUpperCase().toLowerCase().indexOf(searchKey);
            var condition2 = $(td2).html().toUpperCase().toLowerCase().indexOf(searchKey);
            var condition3 = $(td3).html().toUpperCase().toLowerCase().indexOf(searchKey);
            var condition4 = $(td4).html().toUpperCase().toLowerCase().indexOf(searchKey);
            if (condition1 && condition2 && condition3 && condition4) {
                $(tr[i]).hide();
            } else {
                $(tr[i]).show();
            }
        }
    });

    $('tr').click(function (e) {
        $("#eachContactView").show().css({ 'top': e.pageY, 'left': e.pageX });
        $("#eachContactView").mouseenter(function () {
            $(this).show();
        });
    });

    $('tr').mouseleave(function (e) {
        $("#eachContactView").hide();
    });

    $('tr').on("click", function () {
        var trID = $(this).attr("id");
        var firstname = $(this).children().eq(0).html();
        var lastname = $(this).children().eq(1).html();
        var location = $(this).children().eq(2).html();
        var phone = $(this).children().eq(3).html();

        var viewContact = "<h6>"+ trID +"</h6><h4> First name: " + firstname + "</h4>" +
            "<h6> last name: " + lastname + "</h6>" +
            "<h6> Location: " + location + "</h6>" +
            "<h6> Phone: " + phone + "</h6><br /><br />" +
            "<button id='edit'>Edit</button> | <button id='deleteContact'>Delete</button> ";

        $("#eachContactView").html(viewContact);
    });


    $("#eachContactView").on("click", "#deleteContact", function () {

        var user = $("#eachContactView").children().html();
        var index = user.replace("user","")-1;

        var retrievedData = localStorage.getItem('allContactsData');
        var myObj = JSON.parse(retrievedData);
        myObj.splice(index, 1);
        $("#eachContactView").hide();
        localStorage.setItem('allContactsData', JSON.stringify(myObj));
        onLoad();

    });

    $("#eachContactView").on("click", "#edit", function () {
        var user = $("#eachContactView").children().eq(0).html();
        var firstname = $("#eachContactView").children().eq(1).html();
        var lastname = $("#eachContactView").children().eq(2).html();
        var location = $("#eachContactView").children().eq(3).html();
        var phone = $("#eachContactView").children().eq(4).html();
        var index = user.replace("user","")-1;

        $("#editContactView").show();
        var firstname1 = firstname.replace(" First name: ","");
        var lastname1 = lastname.replace(" last name:","");
        var location1 = location.replace(" Location: ","");
        var phone1 = phone.replace(" Phone: ","");

        $("#sno").val(index);
        $("#firstnameEdit").val(firstname1);
        $("#lastnameEdit").val(lastname1);
        $("#locationEdit").val(location1);
        $("#phoneEdit").val(phone1);

        $("#eachContactView").hide();
        
    });

    $("#save").click(function(){
         var idx = $("#sno").val();
         var fn = $("#firstnameEdit").val();
         var ln =$("#lastnameEdit").val();
         var loc = $("#locationEdit").val();
         var phn =  $("#phoneEdit").val();
         
         var Obj = { "firstname": fn, "lastname": ln, "location": loc, "phone": phn };

          var retrievedData = localStorage.getItem('allContactsData');
          var allContactsData = JSON.parse(retrievedData);

          allContactsData[idx] = Obj;

          localStorage.setItem('allContactsData', JSON.stringify(allContactsData));
          onLoad(); 

          $("#editContactView").hide();         

    });

}


var counter;
function getAllContacts() {
    $.get("data.json", function (data) {
        localStorage.setItem('allContactsData', JSON.stringify(data));
        showContactsAsTable();
    });
}

function showContactsAsTable() {

    var retrievedData = localStorage.getItem('allContactsData');
    var allContactsData = JSON.parse(retrievedData);
    $("#bodyRows").html("");
    for(var i=0; i < allContactsData.length; i++ ){
        var id = "user" + (i+1);
        var columns = "<tr id=" + id + ">" +
            "<td>" + allContactsData[i].firstname + "</td>" +
            "<td>" + allContactsData[i].lastname + "</td>" +
            "<td>" + allContactsData[i].location + "</td>" +
            "<td>" + allContactsData[i].phone + "</td></tr>";
        $("#bodyRows").append(columns);
        
    }
    

    $("#newContactForm").hide();
    $("#CancelContactButton").hide();
}

function addNewContact() {
    var firstname = $("#firstname").val();
    var lastname = $("#lastname").val();
    var location = $("#location").val();
    var phone = $("#phone").val();

    var firstnameRegex = /^[A-z ]+$/;
    var lastnameRegex = /^[A-z ]+$/;
    var locationRegex = /^[A-z ]+$/;
    var phoneRegex = /^[0-9]{1,10}$/;


    if (firstname == "" || !firstnameRegex.test(firstname)) {
        $("#firstNameError").show();
        $("#firstNameError").html("Please enter a valid First name");
        return;
    } else {
        $("#firstNameError").hide();
        $("#firstname").html("");
    }

    if (lastname == "" || !firstnameRegex.test(lastname)) {
        $("#lastNameError").show();
        $("#lastNameError").html("Please enter a valid Last name");
        return;
    } else {
        $("#lastNameError").hide();
        $("#lastname").html("");
    }

    if (location == "" || !locationRegex.test(location)) {
        $("#locationError").show();
        $("#locationError").html("Please enter a valid location");
        return;
    } else {
        $("#locationError").hide();
        $("#location").html("");
    }

    if (phone == "" || !phoneRegex.test(phone)) {
        $("#phoneError").show();
        $("#phoneError").html("Please enter a valid phone number");
        return;
    } else {
        $("#phoneError").hide();
        $("#phone").html("");
    }


    var Obj = { "firstname": firstname, "lastname": lastname, "location": location, "phone": phone };

    $("#firstname").val("");
    $("#lastname").val("");
    $("#location").val("");
    $("#phone").val("");

    var retrievedData = localStorage.getItem('allContactsData');
    var allContactsData = JSON.parse(retrievedData);

    allContactsData.push(Obj);
    localStorage.setItem('allContactsData', JSON.stringify(allContactsData));

    $("#contactsTable").show();
    $("#newContactForm").hide();
    $("#addNewContactButton").show();
    $("#CancelContactButton").hide();

    var retrievedData = localStorage.getItem('allContactsData');
    var allContactsData = JSON.parse(retrievedData);
    showContactsAsTable();

}