import React from "react";

import UserAction from "./user-action";
import CartButton from "./cart-button";

const NavActionsBar = () => {
  return (
    <div className="flex items-center space-x-6 justify-center relative z-10">
      <CartButton />
      <UserAction />
    </div>
  );
};

export default NavActionsBar;
