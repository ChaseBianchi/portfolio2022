import React from 'react'

function Icon(props) {
  const {img, css = ''} = props
  return (
    <div className='iconWrapper'>
        <img src={img} alt="work image" className={css} />
    </div>
  )
}

export default Icon