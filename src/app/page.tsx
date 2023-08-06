'use client'
import { DropDown } from "..";





export default function Home() {


  const menuTree = [
    {
      id: 1,
      label: 'Contadores',
      children: [
        {
          id: 21,
          label: 'ejemplo',
        },
        {
          id: 22,
          label: 'ejemplo',
        },
      ],
      component: null
    },
    {
      id: 2,
      label: 'Conteo de Conticidad',
      component: null
    },
    {
      id: 3,
      label: 'Conteo Pallet',
      component: null
    },
  ];



  return (
    <DropDown menu={menuTree}></DropDown>
  )
}
