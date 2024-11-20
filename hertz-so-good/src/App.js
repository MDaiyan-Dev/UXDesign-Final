import React, { useState } from "react";
import MainPage from "./components/MainPage";
import SignInModal from "./components/SignInModal";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );
  const [showSignIn, setShowSignIn] = useState(false);

  // Handle user sign-in
  const handleSignIn = (username) => {
    setUser({ username });
    localStorage.setItem("loggedInUser", JSON.stringify({ username }));
    setShowSignIn(false); // Close the modal
  };

  // Handle user sign-out
  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <div>
      <MainPage
        user={user}
        onSignIn={() => setShowSignIn(true)}
        onSignOut={handleSignOut}
      />
      {showSignIn && <SignInModal onSignIn={handleSignIn} onClose={() => setShowSignIn(false)} />}
    </div>
  );
}

export default App;
