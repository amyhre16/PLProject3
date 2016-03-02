/**
 * Created by pcannata on 2/20/16.
 */
/* person --> customer, employee
 *      fname, lname, email, number */

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
        return F.prototype.toString() + data['ssn'] + "<BR>";
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

    return f;
}(person);


/*

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
*/


var choice = prompt("Employee or Customer");
if (choice = 'e') {

}

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
document.writeln(cust.run('customer_number'));