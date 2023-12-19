// import React from "react";
// import Transaction from "./Transaction";

// function TransactionsList() {
//   const [transactions, setTransactions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     // Fetch transactions from the backend API
//     fetch("/transactions")
//       .then((response) => response.json())
//       .then((data) => setTransactions(data))
//       .catch((error) => console.error("Error fetching transactions:", error));
//   }, []);

//   const filteredTransactions = transactions.filter((transaction) =>
//     transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  
//   return (
//     <div>
//     <input
//       type="text"
//       placeholder="Search by description"
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//     />
//     <table className="ui celled striped padded table">
//       <tbody>
//         <tr>
//           <th>
//             <h3 className="ui center aligned header">Date</h3>
//           </th>
//           <th>
//             <h3 className="ui center aligned header">Description</h3>
//           </th>
//           <th>
//             <h3 className="ui center aligned header">Category</h3>
//           </th>
//           <th>
//             <h3 className="ui center aligned header">Amount</h3>
//           </th>
//         </tr>
//         {TransactionsList.map((transaction, index)  => (
//           <Transaction key={index} {...transaction} />
//         ))}
//         {/* render a list of <Transaction> components here */}
//       </tbody>
//     </table>
//     </div>
//   );
// }

// export default TransactionsList;


// import React, { useState, useEffect } from "react";
// import Transaction from "./Transaction";

// function TransactionsList() {
//   const [transactions, setTransactions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     // Update the backend API base URL
//     const baseUrl = "http://localhost:8001";

//     // Fetch transactions from the backend API
//     fetch(`${baseUrl}/transactions`)
//       .then((response) => response.json())
//       .then((data) => setTransactions(data))
//       .catch((error) => console.error("Error fetching transactions:", error));
//   }, []);

//   const filteredTransactions = transactions.filter((transaction) =>
//     transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search by description"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <table className="ui celled striped padded table">
//         <tbody>
//           <tr>
//             <th>
//               <h3 className="ui center aligned header">Date</h3>
//             </th>
//             <th>
//               <h3 className="ui center aligned header">Description</h3>
//             </th>
//             <th>
//               <h3 className="ui center aligned header">Category</h3>
//             </th>
//             <th>
//               <h3 className="ui center aligned header">Amount</h3>
//             </th>
//           </tr>
//           {filteredTransactions.map((transaction, index) => (
//             <Transaction
//               key={index}
//               date={transaction.date}
//               description={transaction.description}
//               amount={transaction.amount}
//               category={transaction.category}
//             />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default TransactionsList;

// TransactionsList.js

import React, { useState, useEffect } from "react";
import Transaction from "./Transaction";

function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    description: "",
    amount: "",
    category: "",
  });

  const backendUrl = "http://localhost:8001"; // Update with your actual backend URL

  useEffect(() => {
    // Fetch transactions from the backend API
    fetch(`${backendUrl}/transactions`)
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleInputChange = (e) => {
  //   setNewTransaction({
  //     ...newTransaction,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Post new transaction to the backend API
    fetch(`${backendUrl}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received from backend:", data)
        // Update the transactions in the state with the new data
        setTransactions([...transactions, data]);

        // Reset the newTransaction state
        setNewTransaction({
          date: "",
          description: "",
          amount: "",
          category: "",
        });
      })
      .catch((error) => console.error("Error adding transaction:", error));
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {/* ... (unchanged form input fields) */}
        {/* <button type="submit">Add Transaction</button> */}
      </form>

      <input
        type="text"
        placeholder="Search by description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="ui celled striped padded table">
        <tbody>
          <tr>
            {/* ... (unchanged table headers) */}
          </tr>
          {filteredTransactions.map((transaction, index) => (
            <Transaction
              key={index}
              date={transaction.date}
              description={transaction.description}
              amount={transaction.amount}
              category={transaction.category}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsList;
