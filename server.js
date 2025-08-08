const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// BigInt class implementation in JavaScript
class BigInt {
    constructor(num = "0") {
        if (typeof num === 'string') {
            this.number = num.replace(/^-/, '');
            this.isNegative = num.startsWith('-');
        } else {
            this.number = num.toString();
            this.isNegative = num < 0;
        }
        this.removeLeadingZeros();
    }

    removeLeadingZeros() {
        const nonZeroIndex = this.number.search(/[1-9]/);
        if (nonZeroIndex === -1) {
            this.number = "0";
            this.isNegative = false;
        } else {
            this.number = this.number.substring(nonZeroIndex);
        }
    }

    static addStrings(num1, num2) {
        let result = "";
        let carry = 0;
        let i = num1.length - 1;
        let j = num2.length - 1;

        while (i >= 0 || j >= 0 || carry > 0) {
            const digit1 = i >= 0 ? parseInt(num1[i--]) : 0;
            const digit2 = j >= 0 ? parseInt(num2[j--]) : 0;
            const sum = digit1 + digit2 + carry;
            carry = Math.floor(sum / 10);
            result = (sum % 10) + result;
        }

        return result;
    }

    static subtractStrings(num1, num2) {
        let result = "";
        let borrow = 0;
        let i = num1.length - 1;
        let j = num2.length - 1;

        while (i >= 0) {
            const digit1 = parseInt(num1[i--]);
            const digit2 = j >= 0 ? parseInt(num2[j--]) : 0;
            let diff = digit1 - digit2 - borrow;

            if (diff < 0) {
                diff += 10;
                borrow = 1;
            } else {
                borrow = 0;
            }

            result = diff + result;
        }

        const nonZeroIndex = result.search(/[1-9]/);
        if (nonZeroIndex === -1) {
            return "0";
        }
        return result.substring(nonZeroIndex);
    }

    static multiplyStrings(num1, num2) {
        if (num1 === "0" || num2 === "0") return "0";
        
        const result = new Array(num1.length + num2.length).fill(0);
        
        for (let i = num1.length - 1; i >= 0; i--) {
            for (let j = num2.length - 1; j >= 0; j--) {
                const product = parseInt(num1[i]) * parseInt(num2[j]);
                const sum = product + result[i + j + 1];
                result[i + j + 1] = sum % 10;
                result[i + j] += Math.floor(sum / 10);
            }
        }

        let res = "";
        for (let i = 0; i < result.length; i++) {
            if (!(res === "" && result[i] === 0)) {
                res += result[i];
            }
        }
        return res === "" ? "0" : res;
    }

    static isSmaller(num1, num2) {
        if (num1.length < num2.length) return true;
        if (num1.length > num2.length) return false;
        return num1 < num2;
    }

    static divideStrings(dividend, divisor) {
        if (divisor === "0") throw new Error("Division by zero");
        
        if (this.isSmaller(dividend, divisor)) {
            return { quotient: "0", remainder: dividend };
        }

        let quotient = "";
        let current = "";
        let index = 0;

        while (index < dividend.length) {
            current += dividend[index++];
            
            current = current.replace(/^0+/, '') || "0";
            
            if (this.isSmaller(current, divisor)) {
                if (quotient !== "") {
                    quotient += "0";
                }
                continue;
            }
            
            let count = 0;
            let tempDivisor = divisor;
            while (!this.isSmaller(current, tempDivisor)) {
                current = this.subtractStrings(current, tempDivisor);
                count++;
            }
            
            quotient += count;
        }
        
        if (quotient === "") quotient = "0";
        
        current = current.replace(/^0+/, '') || "0";
        
        return { quotient, remainder: current };
    }

    add(other) {
        if (this.isNegative === other.isNegative) {
            const result = new BigInt(BigInt.addStrings(this.number, other.number));
            result.isNegative = this.isNegative;
            return result;
        }
        
        if (BigInt.isSmaller(this.number, other.number)) {
            const result = new BigInt(BigInt.subtractStrings(other.number, this.number));
            result.isNegative = other.isNegative;
            return result;
        } else {
            const result = new BigInt(BigInt.subtractStrings(this.number, other.number));
            result.isNegative = this.isNegative;
            return result;
        }
    }

    subtract(other) {
        if (this.isNegative !== other.isNegative) {
            const result = new BigInt(BigInt.addStrings(this.number, other.number));
            result.isNegative = this.isNegative;
            return result;
        }
        
        if (BigInt.isSmaller(this.number, other.number)) {
            const result = new BigInt(BigInt.subtractStrings(other.number, this.number));
            result.isNegative = !this.isNegative;
            return result;
        } else {
            const result = new BigInt(BigInt.subtractStrings(this.number, other.number));
            result.isNegative = this.isNegative;
            return result;
        }
    }

    multiply(other) {
        const result = new BigInt(BigInt.multiplyStrings(this.number, other.number));
        result.isNegative = this.isNegative !== other.isNegative;
        if (result.number === "0") result.isNegative = false;
        return result;
    }

    divide(other) {
        const divResult = BigInt.divideStrings(this.number, other.number);
        const result = new BigInt(divResult.quotient);
        result.isNegative = this.isNegative !== other.isNegative;
        if (result.number === "0") result.isNegative = false;
        return result;
    }

    modulo(other) {
        const divResult = BigInt.divideStrings(this.number, other.number);
        const result = new BigInt(divResult.remainder);
        result.isNegative = this.isNegative;
        if (result.number === "0") result.isNegative = false;
        return result;
    }

    toString() {
        return (this.isNegative ? "-" : "") + this.number;
    }

    static fibonacci(n) {
        if (n < 0) throw new Error("Fibonacci not defined for negative numbers");
        if (n === 0) return new BigInt("0");
        
        let a = new BigInt("0");
        let b = new BigInt("1");
        for (let i = 2; i <= n; ++i) {
            const temp = a.add(b);
            a = b;
            b = temp;
        }
        return b;
    }

    static factorial(n) {
        if (n < 0) throw new Error("Factorial not defined for negative numbers");
        let result = new BigInt("1");
        for (let i = 2; i <= n; ++i) {
            result = result.multiply(new BigInt(i.toString()));
        }
        return result;
    }

    static catalan(n) {
        if (n < 0) throw new Error("Catalan not defined for negative numbers");
        const a = BigInt.factorial(2 * n);
        const b = BigInt.factorial(n + 1);
        const c = BigInt.factorial(n);
        return a.divide(b.multiply(c));
    }
}

// API Routes
app.post('/api/calculate', (req, res) => {
    try {
        const { operation, num1, num2, customOperation } = req.body;
        
        let result;
        let operationName;
        
        if (customOperation) {
            // Handle custom operations
            const a = new BigInt(num1);
            const b = new BigInt(num2);
            
            switch (customOperation) {
                case 'add':
                    result = a.add(b);
                    operationName = 'Addition';
                    break;
                case 'subtract':
                    result = a.subtract(b);
                    operationName = 'Subtraction';
                    break;
                case 'multiply':
                    result = a.multiply(b);
                    operationName = 'Multiplication';
                    break;
                case 'divide':
                    result = a.divide(b);
                    operationName = 'Division';
                    break;
                case 'modulo':
                    result = a.modulo(b);
                    operationName = 'Modulo';
                    break;
                default:
                    throw new Error('Invalid operation');
            }
        } else {
            // Handle special functions
            const n = parseInt(num1);
            
            switch (operation) {
                case 'fibonacci':
                    result = BigInt.fibonacci(n);
                    operationName = 'Fibonacci';
                    break;
                case 'factorial':
                    result = BigInt.factorial(n);
                    operationName = 'Factorial';
                    break;
                case 'catalan':
                    result = BigInt.catalan(n);
                    operationName = 'Catalan';
                    break;
                default:
                    throw new Error('Invalid operation');
            }
        }
        
        res.json({
            success: true,
            result: result.toString(),
            operation: operationName,
            input1: num1,
            input2: num2 || null
        });
        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'BigInt Calculator API is running' });
});

// Serve React app for any non-API routes
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 