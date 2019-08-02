import React from "react";
import { Link } from "react-router-dom";
const AddTodo: React.FC = () => {
  return (
    <div className="animate">
      This is add todo page! <Link to="/">Home</Link>
    </div>
  );
};

export default AddTodo;
