import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Home</h1>
      <Button text="Sair" onClick={() => [signout(), navigate("/")]}>
        Sair
      </Button>
    </div>
  );
};

export default Home;