# BigInt Calculator - Interactive Web Application

A modern, interactive web application for performing calculations with arbitrarily large integers. Built with React.js frontend and Node.js backend.

## Features

### 🧮 Calculator Operations
- **Addition** - Add two large numbers
- **Subtraction** - Subtract two large numbers  
- **Multiplication** - Multiply two large numbers
- **Division** - Divide two large numbers
- **Modulo** - Get remainder of division

### 🔢 Special Functions
- **Fibonacci Numbers** - Calculate Fibonacci numbers for large n
- **Factorial** - Calculate factorial for large numbers
- **Catalan Numbers** - Calculate Catalan numbers

### ✨ Interactive Features
- **Beautiful Modern UI** - Responsive design with smooth animations
- **Real-time Calculations** - Instant results with loading states
- **Calculation History** - Track your last 10 calculations
- **Copy to Clipboard** - Easy copying of results
- **Error Handling** - Clear error messages for invalid inputs
- **Mobile Responsive** - Works perfectly on all devices

## Technology Stack

- **Frontend**: React.js, Axios, CSS3
- **Backend**: Node.js, Express.js
- **BigInt Implementation**: Custom JavaScript implementation

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup
1. Install backend dependencies:
```bash
npm install
```

2. Start the backend server:
```bash
npm start
# or for development with auto-restart:
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup
1. Navigate to the client directory:
```bash
cd client
```

2. Install frontend dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

### Calculator Mode
1. Enter two large numbers in the input fields
2. Select an operation (+, -, ×, ÷, %)
3. Click "Calculate" to see the result
4. Results are automatically saved to history

### Special Functions Mode
1. Enter a number (n) for the function
2. Select a function (Fibonacci, Factorial, Catalan)
3. Click "Calculate" to see the result

### History Mode
- View your last 10 calculations
- Copy results to clipboard with one click
- See operation details and timestamps

## API Endpoints

### POST /api/calculate
Calculate BigInt operations.

**Request Body:**
```json
{
  "customOperation": "add", // or "subtract", "multiply", "divide", "modulo"
  "num1": "123456789",
  "num2": "987654321"
}
```

**Response:**
```json
{
  "success": true,
  "result": "1111111110",
  "operation": "Addition",
  "input1": "123456789",
  "input2": "987654321"
}
```

### Special Functions
```json
{
  "operation": "fibonacci", // or "factorial", "catalan"
  "num1": "50"
}
```

## Examples

### Large Number Calculations
- Add: `123456789123456789 + 987654321987654321`
- Multiply: `999999999 × 999999999`
- Fibonacci: Calculate Fibonacci(100)
- Factorial: Calculate 50!

### Performance
- Handles numbers with thousands of digits
- Real-time calculation feedback
- Optimized algorithms for large number operations

## Project Structure

```
BigIntger/
├── server.js              # Express backend server
├── package.json           # Backend dependencies
├── client/                # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styling
│   │   ├── index.js       # React entry point
│   │   └── index.css
│   └── package.json       # Frontend dependencies
├── BigInt.cpp            # Original C++ implementation
└── README.md
```

## Development

### Running Both Servers
You can run both servers simultaneously:

**Terminal 1 (Backend):**
```bash
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client && npm start
```

### Customization
- Modify `server.js` to add new BigInt operations
- Update `client/src/App.js` to add new UI features
- Customize styling in `client/src/App.css`

## Features in Detail

### BigInt Implementation
- Handles negative numbers
- Removes leading zeros automatically
- Supports all basic arithmetic operations
- Implements special mathematical functions

### UI/UX Features
- **Tabbed Interface** - Easy navigation between calculator and functions
- **Real-time Validation** - Input validation with helpful error messages
- **Loading States** - Visual feedback during calculations
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Copy Functionality** - One-click copying of results
- **History Tracking** - Automatic saving of calculations

### Error Handling
- Division by zero protection
- Invalid input validation
- Network error handling
- User-friendly error messages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

---

**Enjoy calculating with arbitrarily large numbers! 🚀** 