const dataset = require('../dataset.json');
const fs=require('fs');
const  generateAccessToken = require('../middleware/generateToken');
// Controller functions
const controller = {
    getAccess:(req,res)=>{
        const username=req.body.username;
        const password=req.body.password;
         if(username=="Harsh Vardhan Gupta" && password=="Harsh")
        {
            const token = generateAccessToken({ username: username });
            res.status(201).json({ message: 'Token Generated Successfully', token: token });
        }else
        {
            res.status(201).json({ message: 'User not Verified'});
        }

    },
    addRecord: (req, res) => {
        const newRecord = req.body;
        let dataset = [];

         
        fs.readFile('./dataset.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading dataset file:', err);
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }

            try {
                dataset = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing dataset JSON:', parseError);
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }

           
            dataset.push(newRecord);

            // Write the updated dataset back to the file
            fs.writeFile('./dataset.json', JSON.stringify(dataset, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error writing dataset file:', writeErr);
                    res.status(500).json({ message: 'Internal Server Error' });
                    return;
                }
                
                console.log('Dataset updated and written to file');
                res.status(201).json({ message: 'Record added successfully' });
            });
        });
    },
     

    deleteRecord: (req, res) => {
        const recordName = req.body.name;

        // Read the existing dataset from the file
        fs.readFile('./dataset.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading dataset file:', err);
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }
           
            let dataset = [];

            try {
                dataset = JSON.parse(data);
                
            } catch (parseError) {
                console.error('Error parsing dataset JSON:', parseError);
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }
         
            // Filter out the record(s) to delete by name
            const  filteredDataset = dataset.map(subDataset => {
                return subDataset.filter(record => record.name !== recordName);
            });
            // Check if any records were deleted
            // if (dataset.length === filteredDataset.length) {
            //     res.status(404).json({ message: 'Record not found' });
            //     return;
            // }

            // Write the updated dataset back to the file
            fs.writeFile('./dataset.json', JSON.stringify(filteredDataset, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error writing dataset file:', writeErr);
                    res.status(500).json({ message: 'Internal Server Error' });
                    return;
                }
                
                console.log('Dataset updated and written to file');
                res.status(200).json({ message: 'Record deleted successfully' });
            });
        });
    },
    getSummaryStatisticsAll: (req, res) => {
        let dataset = [];

         
        fs.readFile('./dataset.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading dataset file:', err);
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }

            try {
                dataset = JSON.parse(data);
                 
                const salary = dataset.flatMap(subset => {
                    return subset.map(record => {
                        const salary = parseFloat(record.salary);
                        console.log(salary);
                        return salary;
                    });
                });
                 
                 console.log(salary);
                 
                const mean = calculateMean(salary);
                const min = Math.min(...salary);
                const max = Math.max(... salary);
                res.status(200).json({ mean, min, max });
            } catch (parseError) {
                console.error('Error parsing dataset JSON:', parseError);
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }});

        
        
    },

    getSummaryStatisticsOnContract: (req, res) => {
        let dataset = [];

         
        fs.readFile('./dataset.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading dataset file:', err);
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }

            try {
                dataset = JSON.parse(data);
                 
                const contractSalaries = dataset.flatMap(subset => {
                    return subset
                        .filter(record => record.on_contract === 'true')
                        .map(record => parseFloat(record.salary));
                });
               console.log( contractSalaries);

         console.log(contractSalaries);
    const mean = calculateMean(contractSalaries);
    const min = Math.min(...contractSalaries);
    const max = Math.max(...contractSalaries);
    res.status(200).json({ mean, min, max });
            } catch (parseError) {
                console.error('Error parsing dataset JSON:', parseError);
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }});
       
    },

    getSummaryStatisticsByDepartment: (req, res) => {
        let dataset = [];

         
        fs.readFile('./dataset.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading dataset file:', err);
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }

            try {
                dataset = JSON.parse(data);
                 
                const departmentSalaries = {};
dataset.forEach(subset => {
    subset.forEach(record => {
        const department = record.department;
        const salary = parseFloat(record.salary);
        if (!departmentSalaries[department]) {
            departmentSalaries[department] = [salary];
        } else {
            departmentSalaries[department].push(salary);
        }
    });
});

const summaryStatistics = {};
for (const department in departmentSalaries) {
    const salaries = departmentSalaries[department];
    const mean = calculateMean(salaries);
    const min = Math.min(...salaries);
    const max = Math.max(...salaries);
    summaryStatistics[department] = { mean, min, max };
}
                res.status(200).json(summaryStatistics);
 
            } catch (parseError) {
                console.error('Error parsing dataset JSON:', parseError);
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }});
       
    },

    getSummaryStatisticsByDepartmentAndSubDepartment: (req, res) => {
        let dataset = [];

         
        fs.readFile('./dataset.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading dataset file:', err);
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }

            try {
                dataset = JSON.parse(data);
                 
                const departmentSalaries = {};
dataset.forEach(subset => {
    subset.forEach(record => {
        const department = record.department;
        const salary = parseFloat(record.salary);
        if (!departmentSalaries[department]) {
            departmentSalaries[department] = [salary];
        } else {
            departmentSalaries[department].push(salary);
        }
    });
});

const summaryStatistics = {};
for (const department in departmentSalaries) {
    const salaries = departmentSalaries[department];
    const mean = calculateMean(salaries);
    const min = Math.min(...salaries);
    const max = Math.max(...salaries);
    summaryStatistics[department] = { mean, min, max };
}
                res.status(200).json(summaryStatistics);
 
 
            } catch (parseError) {
                console.error('Error parsing dataset JSON:', parseError);
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }});
       
    }
};
function calculateMean(arr) {
    const sum = arr.reduce((acc, curr) => acc + curr, 0);
    return sum / arr.length;
}
module.exports = controller;
