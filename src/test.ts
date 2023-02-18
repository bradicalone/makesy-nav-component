import {testTwo} from './another-test'
console.log('testTwo:', testTwo)

class Main {
    year: number
    testTwo: Object
    constructor(
        public nameBook: string,
        years: number,
    ) {
        this.year = years
        this.testTwo = testTwo
    }

    
}

const main = new Main('medition', 2005)
console.log('main:', main)  
export default Main