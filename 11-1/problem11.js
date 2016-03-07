/**
 * Created by pcannata on 2/20/16.
 */
/* person --> customer, employee
 *      fname, lname, email, number */
$(document).ready(function() {
    var person = function(){        // creates person
        // private data
        var data = {
            fname:$("#fname"),
            $fname: function(fname){
                data.fname = $("#fname") },
            lname: $("#lname"),
            $lname: function(lname) {
                data.lname = $("#lname")
            },
            email: $("#email"),
            $email: function(person_email) {
                data.email = $("#email")
            },
            password: $("#password"),           // go back and delete this part...this is for testing
            $password: function(password) {
                data.password = password
            },
            emailRegex: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            allFields: $( [] ).add( fname ).add( lname ).add( email ).add( password ),
            tips: $( ".validateTips" )
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
            return F.prototype.toString() + "Social security number: " + data['ssn'] + "<BR><BR>";
        }

        f.checkLength = function(o, n, min, max) {
            if (o.length > max || o.length < min) {
                o.addClass("ui-state-error");
                f.updateTips("length of " + n + " must be between " + min + " and " + max + ".");
                return false;
            }
            else return true;
        }

        f.updateTips = function(t) {
            data['tips'].text(t).addClass("ui-state-highlight");
            setTimeout(function() {
                data['tips'].removeClass("ui-state-highlight", 1500);
            });
        }

        //f.checkRegexp()
        return f;
    }(person);

    $("#create-user").click((function(){   // NEED TO GO BACK AND CHANGE THIS TO create-employee
        var emp = Object.create(employee);
        var dialog,
            form,
        // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
            emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,

            allFields = $( [] ).add( fname ).add( lname ).add( email ).add( password ),
            tips = $( ".validateTips" );

        function updateTips( t ) {
            tips.text( t ).addClass( "ui-state-highlight" );
            setTimeout(function() {
                tips.removeClass( "ui-state-highlight", 1500 );
            }, 500 );
        }

        /*function checkLength( o, n, min, max ) {
            if ( o.val().length > max || o.val().length < min ) {
                o.addClass( "ui-state-error" );
                updateTips( "Length of " + n + " must be between " +
                    min + " and " + max + "." );
                return false;
            } else {
                return true;
            }
        }*/

        function checkRegexp( o, regexp, n ) {
            if ( !( regexp.test( o ) ) ) {
                o.addClass( "ui-state-error" );
                emp.updateTips( n );
                return false;
            } else {
                return true;
            }
        }

        function addUser() {
            var valid = true;
            allFields.removeClass( "ui-state-error" );

            valid = valid && emp.checkLength(emp.run('fname'), "first name", 3, 16 );
            valid = valid && emp.checkLength(emp.run('lname'), "last name", 3, 16 );
            valid = valid && emp.checkLength(emp.run('email'), "email", 6, 80 );
            valid = valid && emp.checkLength( emp.run('password'), "password", 5, 16 );

            valid = valid && checkRegexp( emp.run('fname'), /^[a-z]([0-9a-z_\s])+$/i, "First name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
            valid = valid && checkRegexp( emp.run('lname'), /^[a-z]([0-9a-z_\s])+$/i, "Last name may consiste of a-z, 0-9, underscores, spaces and must begin with a letter.");
            valid = valid && checkRegexp( emp.run('email'), emailRegex, "eg. ui@jquery.com" );
            valid = valid && checkRegexp( emp.run('password'), /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );

            if ( valid ) {
                $( "#customers tbody" ).append( "<tr>" +
                    "<td>" + emp.run('fname') + "</td>" +
                    "<td>" + emp.run('lname') + "</td>" +
                    "<td>" + emp.run('email') + "</td>" +
                    "<td>" + emp.run('password') + "</td>" +
                    "</tr>" );
                dialog.dialog( "close" );
            }
            return valid;
        }

        dialog = $( "#dialog-form" ).dialog({
            autoOpen: false,
            height: 300,
            width: 350,
            modal: true,
            buttons: {
                "Create an account": addUser,
                Cancel: function() {
                    dialog.dialog( "close" );
                }
            },
            close: function() {
                form[ 0 ].reset();
                allFields.removeClass( "ui-state-error" );
            }
        });

        form = dialog.find( "form" ).on( "submit", function( event ) {
            event.preventDefault();
            addUser();
        });

        $( "#create-user" ).button().on( "click", function() {
            dialog.dialog( "open" );
        });
    }));
});
/*

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
        return F.prototype.toString() + "Social security number: " + data['ssn'] + "<BR><BR>";
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
        else return r;
    };
    f.displayText = function() {
        return F.prototype.toString() + "Customer nuumber: " + data['customer_number'] + "<BR><BR>";
    }

    return f;
}(person);


/!*

var human = function(p){
    // private data
    var data = {
        name:'Human',
        $name: function(n){data.memo += 1; data.name = n},
        memo: 0,
        dob: new Date('January 1, 2010'),
        $dob: function(n){data.memo += 1; data.dob = n},
        says:"Hello, I'm a human",
        $says: function(n){data.memo += 1; data.says = n}
    };

    var F = function(){};
    F.prototype = p;
    f = new F();

    // public data
    f.hname = 'Human'
    f.run = function (e) {
        var r = data[e];
        if(r === undefined) return F.prototype.run(e);
        else return r;
    };
    f.age = (new Date()).getFullYear() - f.run('dob').getFullYear();

    return f;
}(animal);

var a1 = Object.create(animal);

document.writeln(Object.getPrototypeOf(a1) + "<BR>");
document.writeln(a1.sname + "<BR>");
document.writeln(a1.run('says') + "<BR>");
a1.run('$name')('a1');
document.writeln(a1.run('name') + "<BR>");

var myCat = Object.create(cat);

document.writeln("<BR>");
document.writeln(Object.getPrototypeOf(myCat) + "<BR>");
document.writeln(myCat.sname + "<BR>");
document.writeln(myCat.run('says') + "<BR>");
document.writeln(myCat.run('quality') + "<BR>");
myCat.run('$name')('myCat');
document.writeln(myCat.run('name') + "<BR>");

var socrates = Object.create(human);

document.writeln("<BR>");
document.writeln(Object.getPrototypeOf(socrates) + "<BR>");
document.writeln(socrates.sname + "<BR>");
document.writeln(socrates.run('says') + "<BR>");
document.writeln(socrates.run('quality') + "<BR>");
socrates.run('$name')('socrates');
socrates.run('$says')('I am Socrates.');
document.writeln(socrates.run('says') + "<BR>");
document.writeln(socrates.age + "<BR>");

// View local properties.
document.writeln("<BR>" + "Local properties are: <BR>");
for (var key in Object.getPrototypeOf(socrates)) {
    if (Object.getPrototypeOf(socrates).hasOwnProperty(key)) {
        document.writeln('socrates: ' + key + " -> " + Object.getPrototypeOf(socrates)[key] + "<BR>");
    }
}

// View local and inherited properties.
document.writeln("<BR>" + "Local and inherited properties are: <BR>");
for (var key in Object.getPrototypeOf(socrates)) {
        document.writeln('socrates: ' + key + " -> " + Object.getPrototypeOf(socrates)[key] + "<BR>");
}

document.writeln("<BR>");
document.writeln("Socrates memo is: " + socrates.run('memo') + "<BR>");

// Polymorphism.
a1.speak = function(a){ document.writeln(a.run('says') + "<BR>"); }
document.writeln("<BR>");
a1.speak(a1);
a1.speak(myCat);
a1.speak(socrates);*!/
*!/

// testing one way to do it
document.writeln("Welcome to the Person Tester application<BR><BR>")
do {
    var choice = prompt("Create customer or employee? (c/e): ");

    if (choice == 'c') {
        var cust = Object.create(customer);
        cust.run('$first_name')(prompt("Enter first name: "));
        cust.run('$last_name')(prompt("Enter last name: "));
        cust.run('$email')(prompt("Enter email address: "));
        cust.run('$customer_number')(prompt("Customer number: "));
        document.writeln("You entered:<BR>" + cust.displayText());

    }
    else {
        var emp = Object.create(employee);
        emp.run('$first_name')(prompt("Enter first name: "));
        emp.run('$last_name')(prompt("Enter last name: "));
        emp.run('$email')(prompt("Enter email address: "));
        emp.run('$ssn')(prompt("Social security number: "));
        document.writeln("You entered:<BR>" + emp.displayText());
    }
    var cont = prompt("Continue? (y/n): ");
}
while (cont == 'y');
/!*

var emp = Object.create(employee);


document.writeln(Object.getPrototypeOf(emp) + "<BR>");
emp.run('$first_name')('bob');
emp.run('$last_name')('smith');
emp.run('$email')('test@yahoo.com');
emp.run('$ssn')('99999999999999999');
document.writeln(emp.displayText());
//document.writeln(emp.run('first_name') + "<BR>");



var cust = Object.create(customer);
cust.run('$first_name')('sarah');
cust.run('$customer_number')('3333');

document.writeln(cust.run('first_name') + "<BR>");
document.writeln(cust.run('customer_number'));*!/
*/
