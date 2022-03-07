import React from 'react'
import NavDesktop from './NavDesktop'
import NavMobile from './NavMobile'

function MultiNav() {
  return (
    <div>
        <NavDesktop className='NavDesktop' />
        <NavMobile className='NavMobile' />
    </div>
  )
}

export default MultiNav