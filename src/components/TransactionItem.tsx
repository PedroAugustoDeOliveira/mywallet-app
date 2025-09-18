import styled from "styled-components";
import { Link } from "react-router-dom";

interface TransactionItemProps {
  _id?: string;
  description: string;
  value: number;
  type: "income" | "expense";
  onDelete?: () => void;
}

export default function TransactionItem({
  _id,
  description,
  value,
  type,
  onDelete,
}: TransactionItemProps) {
  function handleDeleteClick() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (confirmDelete && onDelete) {
      onDelete();
    }
  }
  return (
    <Div>
      <span className="description">{description}</span>
      <span className={`value ${type}`}>{value.toFixed(2)}</span>
      <Link to={`/update/${type}/${_id}`} className="edit-btn">
        ✏️
      </Link>

      <button className="delete-btn" onClick={handleDeleteClick}>
        ✖
      </button>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  gap: 5px;
  .description {
    color: black; /* cor normal */
    font-size: 16px;
  }

  .value {
    font-weight: bold;
    margin: 0 10px;
  }

  .value.income {
    color: green;
  }

  .value.expense {
    color: red;
  }
  .edit-btn {
    background: none;
    border: none;
  }
  .delete-btn {
    background: none;
    border: none;
    color: #aaa;
    font-size: 16px;
    cursor: pointer;
  }

  .delete-btn:hover {
    color: #ff4d4d;
  }
`;
