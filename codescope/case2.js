function createEmployee() {
    let Employees = [];
    
    return {
        AddEmployee: function (id, name, position) {
            Employees.push({
                ID: id,
                Name: name,
                Position: position,
                Performance: [],
            });
        },
        AddPerformance: function (id, p) {
            for (let i = 0; i < Employees.length; i++) {
                if (Employees[i].ID == id) {
                    Employees[i].Performance.push(p);
                }
            }
        },
        RemoveEmployee: function (id) {
            for (let i = 0; i < Employees.length; i++) {
                if (Employees[i].ID == id) {
                    Employees.splice(i, 1);
                }
            }
        },
        EmployeeList: function () {
            return Employees;
        },
        PerformaceAverage: function (performance) {
            if (performance.length === 0) {
                return 0; // Handle case with no performance data
            }
            let sum = 0;
            for (let i = 0; i < performance.length; i++) {
                sum += performance[i];
            }
            return sum / performance.length;
        },
        BonusElg: function (score) {
            if (score > 85) {
                console.log("Eligible for a 10% bonus");
            } else if (score >= 70 && score <= 85) {
                console.log("Eligible for a 5% bonus");
            } else {
                console.log("Not eligible for a bonus");
            }
        },
    };
}

let employee1 = createEmployee();
employee1.AddEmployee(806789, "Lola", "Developer");
employee1.AddPerformance(806789, 90);
employee1.AddPerformance(806789, 70);
let list = employee1.EmployeeList();

// Generate a report
for (let j = 0; j < list.length; j++) {
    console.log("----------------------------------------------------------------------------");
    console.log(`NAME : ${list[j].Name}`);
    console.log(`Position : ${list[j].Position}`);
    let p = employee1.PerformaceAverage(list[j].Performance);
    console.log(`Performance : ${p}`);
    employee1.BonusElg(p);
}
