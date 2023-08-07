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
          component: 'test'
        },
        {
          id: 22,
          label: 'test',
          children: [ 
            {
              id: 24,
              label: 'hola2',
              children: [
                {
                  id: 29,
                  label: 'hola',
                  component: 'test'
                },
              ]
             
            },
            {
              id: 25,
              label: 'ejemplo',
              component: 'test'
            },
          ]
        },
      ],
      
    },
    {
      id: 2,
      label: 'Conteo de Conticidad',
      component: null
    },
    {
      id: 3,
      label: 'Conteo Pallet',
      component: 'test'
    },
  ];

  const renderComponent = ()=>{
    console.log('Render Component');
  }


  return (
    <DropDown menu={menuTree} renderComponenet={renderComponent}></DropDown>
  )
}
