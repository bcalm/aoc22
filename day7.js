const fs = require("fs");

const temp1 = fs.readFileSync('./data/day7.txt', "utf-8").split("\n")

let sum=0; 
let directory= {'/':{size:0}}; 
let cwd=['/']; 
temp1.forEach( x=> {
    x=x.split(' '); 
    if(x[0]==='$') {        
        if(x[1]==='cd') {
            if(x[2]==='..') {
                cwd.pop();
            }
            else {
                const dirname=x[2];
                cwd.push(dirname); 
                const fullpath=cwd.join('/');
                directory[fullpath]={};
                directory[fullpath].size=0;
            }
        }
    }
    else if(x[0]==='dir') return;
    else {
        const fileSize=parseInt(x[0]);
        const temp=[];        
        cwd.forEach(d=> {
            temp.push(d);            
            const temp2=temp.join('/');
            directory[temp2].size+=fileSize;    
        });
    }
});
for(dir in directory) {
    if(directory[dir].size<=100000)sum+=directory[dir].size; 
}
console.log(sum);

const sizeToFree=directory['/'].size-70000000+30000000
let closestSize=70000000;
for(dir in directory) {
    if(directory[dir].size>sizeToFree && directory[dir].size<closestSize)closestSize=directory[dir].size;
}
console.log(directory)
console.log('Answer 1: ', sum);
console.log('Answer 2: ', closestSize);

// const updateParentValue = (valueToAdd, parent, idMap, nodes) => {
//     if(parent != null) {
//         nodes[idMap[parent]].size += valueToAdd;
//         updateParentValue(valueToAdd, parent.parent, idMap, nodes)
//     }
// }

// const calculateSize = (nodes, directoryIdMap) => {
//   nodes
//     .filter((node) => node.type === "file")
//     .forEach((node) => {
//       updateParentValue(node.size, node.parent, directoryIdMap, nodes);
//     });
//   nodes
//     .filter((node) => node.type === "file")
//     .forEach((node) => {
//       updateParentValue(node.size, node.parent, directoryIdMap, nodes);
//     });
// };

