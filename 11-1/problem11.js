var person = function(){
    // private data
    var data = {
        first_name:'',
        $first_name: function(fname){
            data.first_name = fname },
        last_name: '',
        $last_name: function(lname) {
            data.last_name = lname
        },
        email: '',
        $email: function(person_email) {
            data.email = person_email
        }
    };

    var F = function(){};
    f = new F();



    // public data
    f.run = function (e) {
        return data[e];
    };
    f.toString = function () {
        return "Name : " + data['first_name'] + " " + data['last_name'] + "<BR>" +
                "Email : " + data['email'] + "<BR>";
    }

    return f;
}();



var employee = function(p){
    // private data
    var data = {
        ssn: '',
        $ssn: function(ssnumber) {
            data.ssn = ssnumber
        }
    };

    var F = function(){};
    F.prototype = p;        // The prototype property sets up Inheritance.
    f = new F();

    // public data
    f.run = function (e) {
        var r = data[e];
        if(r === undefined) return F.prototype.run(e);
        else return r;
    };

    f.displayText = function () {
        return F.prototype.toString() + "Social security number: " + data['ssn'].substring(0, 3) + "-" + data['ssn'].substring(3, 5) + "-" + data['ssn'].substring(5) + "<BR><BR>";
    }

    return f;
}(person);




var customer = function(p){
    // private data
    var data = {
        customer_number: '',
        $customer_number: function(cust_numb) {
            data.customer_number = cust_numb
        }
    };

    var F = function(){};
    F.prototype = p;
    f = new F();

    // public data
    f.run = function (e) {
        var r = data[e];
        if(r === undefined) return F.prototype.run(e);
        else {
            return r;
        }
    };
    f.displayText = function() {
        return F.prototype.toString() + "Customer nuumber: " + data['customer_number'] + "<BR><BR>";
    }

    return f;
}(person);



// testing one way to do it
document.writeln("Welcome to the Person Tester application<BR><BR>")
do {
    var choice = prompt("Create customer or employee? (c/e): ");
    while (choice.toUpperCase() != 'C' && choice.toUpperCase() != 'E') {
        alert("Please enter a valid input.");
        choice = prompt("Create customer or employee? (c/e): ");
    }
    if (choice.toUpperCase() == 'C') {
        var cust = Object.create(customer);
        cust.run('$first_name')(prompt("Enter first name: "));
        cust.run('$last_name')(prompt("Enter last name: "));
        cust.run('$email')(prompt("Enter email address: "));
        var validateEmail =function (email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
            return re.test(email);
        }
        while (!validateEmail(cust.run(('email')))) {
            alert("Please enter a valid email address.");
            cust.run('$email')(prompt("Enter email address: "));
        }
        cust.run('$customer_number')(prompt("Customer number: "));
        document.writeln("You entered:<BR>" + cust.displayText());

    }
    else if (choice.toUpperCase() == 'E') {
        var emp = Object.create(employee);
        emp.run('$first_name')(prompt("Enter first name: "));
        emp.run('$last_name')(prompt("Enter last name: "));
        emp.run('$email')(prompt("Enter email address: "));
        var validateEmail =function (email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
            return re.test(email);
        }
        while (!validateEmail(emp.run(('email')))) {
            alert("Please enter a valid email address.");
            emp.run('$email')(prompt("Enter email address: "));
        }
        emp.run('$ssn')(prompt("Social security number in format 123456789: "));
        var ssn_boo = true;
        while (ssn_boo) {
            if (emp.run('ssn').length != 9 && (isNaN(emp.run('ssn')))) {
                alert("Please enter valid social security number");
                emp.run('$ssn')(prompt("Social security number in format 123456789: "));
            }
            else ssn_boo = false;
        }
        document.writeln("You entered:<BR>" + emp.displayText());
    }
    var cont = prompt("Continue? (y/n): ");
    while (cont.toUpperCase() != 'Y' && cont.toUpperCase() != 'N') {
        alert("Please enter a valid input.");
        cont = prompt(("Continue? (y/n): "));
    }
}
while (cont.toUpperCase() == 'Y');
