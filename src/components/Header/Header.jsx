import React, { act } from 'react'
import {Container, Logo, LogoutBtn} from '../index'
//import {Container, Logo, LogoutBtn} from './components'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Header() {

    const authService = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const naItems = [  
        {
     
        name: 'Home',
        slug: '/',
        active: true,
    },
    {

        name: 'Login',
        slug: '/login',
        active: !authService,
    },
    {
     name: "Signup",
     slug: "/signup",
     active: !authService,
    },
    {

        name: 'All Posts',
        slug: '/all-posts',
        active: authService,
    },

    {

        name: 'Add Post',
        slug: '/add-post',
        active: authService
    },

     ]

  return (
   
   <header className="py-3 shadow bg-gray-500">

    <Container>
        <nav className='flex'>
            <div className='mr-4'>
              <Link to='/'>
                <Logo width='70px' />
              </Link>
            </div>
            <ul className='flex ml-auto'>
             {navItems.map((item) =>

              item.active ? (<li key={item.name}>
. 
                <button onClick={() => navigate(item.slug)} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'> {item.name}</button>
              </li>): null
             )}   

             {authService && (

                <li>
                    <LogoutBtn/>
                </li>
             )}
         </ul>
        </nav>
    </Container>
   </header>

  )
}

export default Header