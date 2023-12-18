import React from "react";

function Transaction() {
  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{amount}</td>
      <td>{category}</td>
    </tr>
  );
}

export default Transaction;
