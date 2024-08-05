import { useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const [message, setMessage] = useState<string>("");

  return (
    <div>
      <div>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/user">User page</Link>
          </li>
        </ul>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submit");
          // socket.emit("message", message);
        }}
      >
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          id="message"
          value={message}
        />
        <button>submit</button>
      </form>
    </div>
  );
}

export default App;
