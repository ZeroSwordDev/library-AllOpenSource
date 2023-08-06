import React, { ReactNode, useState } from "react";
import "./DropDown.css";

interface IMenuIten {
  id: number;
  label: string;
  component?: ReactNode;
  children?: IMenuIten[];
}

type Props = {
  menu: IMenuIten[];
  /*  renderComponenet: (Component: ReactNode) => void; */
};

export const DropDown: React.FC<Props> = (props: Props) => {
  const { menu } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <ul className="dropdown-ul">
        {menu.map((item) => (
          <li key={item.id}>
            <p onClick={toggleDropdown}>{item.label}</p>
            
            {item.children && isOpen && <DropDown menu={item.children} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
