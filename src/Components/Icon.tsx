interface IconProps {
  img: string
  css?: string
}

function Icon({ img, css = '' }: IconProps) {
  return (
    <div className='iconWrapper'>
      <img src={img} alt="work image" className={css} />
    </div>
  )
}

export default Icon
