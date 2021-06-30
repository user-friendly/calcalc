/**
 * @file
 * Await test example
 */

'use strict';

(async () => {

function processFoo(maxTime = 1500) { 
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.floor(Math.random() * Math.pow(10, 12) % 2)) {
                resolve('foo processed')
            } else {
                reject('failed to process foo')
            }
        }, maxTime)
    })
}

/*(async () => {
    console.log('Run test...')

    await processFoo()
    
    console.log('End test')
})()
*/

console.log('Run test...')

var runs = 3
for (let i = 0; i < runs; i++)
    await processFoo(500).then(value => { console.log('job done: ' + value) }, reason => { console.log('job failed: ' + reason) })

for (let i = 0; i < runs; i++)
    processFoo(500).then(value => { console.log('job done: ' + value) }, reason => { console.log('job failed: ' + reason) })

console.log('End test')
    
})()
