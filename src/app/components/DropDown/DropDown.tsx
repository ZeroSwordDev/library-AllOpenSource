import React, { ReactNode, useState } from "react";
import "./DropDown.css";

interface IMenuIten {
  id: number;
  label: string;
  component?: ReactNode;
  children: IMenuIten[];
}

type Props = {
  menu: IMenuIten[];
  /*  renderComponenet: (Component: ReactNode) => void; */
};

export const DropDown: React.FC<Props> = (props: Props) => {
  const { menu } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (item: IMenuIten) => {
    if (item.children && item.children.length > 0) {
      setIsOpen(!isOpen);
      console.log(item.children)
    } else if (item.component) {
      console.log("Renderizando componente:", item.component);
    
    } else {
      console.log("No tiene hijos ni componente para renderizar.");
    }
  };

  const hasNestedChildren = (item: IMenuIten) => {
    if (item.children) {
      return item.children.some(child => child.children && child.children.length > 0);
    }
    return false;
  };

  return (
    <div className="dropdown">
      <ul className="dropdown-ul">
        {menu.map((item) => (
          <li key={item.id} >
            <p style={{cursor:'pointer'}} onClick={() => toggleDropdown(item)}> {item.label}</p>
            {item.children && isOpen && (
              <DropDown menu={item.children}  />
            )}
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
