import logo  from "../assets/logo.png"
const Logo = ({ width = '' }) => {
  return (
    <div>
      <img className='h-15 w-25' src={logo} alt="Logo" style={{ width }} />
    </div>
  )
}

export default Logo
