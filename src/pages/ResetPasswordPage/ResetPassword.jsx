import React from "react";
import { RegisterSignupBtn } from "../../components/button/RegisterSignupBtn";

const ResetPassword = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
  };
  return (
    // <section className="py-5">
    //   <main className="flex items-center justify-center">
    //     <div className="max-w-2xl w-full px-4">
    //       <div className="max-w-2xl w-full space-y-8 mt-12">

    //       </div>
    //     </div>
    //   </main>
    // </section>
    <form onSubmit={onSubmit}>
      <input
        type="text"
        id="password"
        className="form-input"
        onChange={(e) => console.log(e.target.value)}
      />
      <button type="submit">Submit</button>
      {/* <RegisterSignupBtn text="Submit" /> */}
    </form>
  );
};

export default ResetPassword;
