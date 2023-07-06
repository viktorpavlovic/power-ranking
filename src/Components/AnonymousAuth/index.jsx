import React from "react";
import { signInAnonymously } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import "./anonymous-auth.scss";

const AnonymusAuth = ({ setAccessToken }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    signInAnonymously(auth).then((cred) => {
      const ref = doc(db, "users", cred.user.uid);
      setDoc(ref, {
        userName: values.userName,
      });
      if (cred?.user?.accessToken) {
        setAccessToken(cred.user.accessToken);
        localStorage.setItem(
          "accessToken",
          JSON.stringify(cred.user.accessToken)
        );
        navigate("/power_page");
      }
    });
  };

  return (
    <div className="anonymous-auth-div">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Kreiraj svoj power ranking:</h1>
        <section>
          <label>
            <h3>Izaberi svoje ime:</h3>
            <input type="text" {...register("userName", { required: true })} />
            {errors.userName && (
              <span className="submit-error">
                Bez imena ne mozes power renkovati &#128521;
              </span>
            )}
          </label>
          <button>Power renkuj &#128526;</button>
        </section>
      </form>
    </div>
  );
};

export default AnonymusAuth;
