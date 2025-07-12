import HindsightLogo from '../assets/hindsight_logo.svg'
import HindsightLogoText from '../assets/hindsight_text.svg'

function LogoHeader() {
  return (
    <div className="logo-header">
      <img src={HindsightLogo} alt="Logo" style={{ height: 40 }} />
      <img src={HindsightLogoText} alt="LogoText" style={{ height: 40 }} />
    </div>
  )
}

export default LogoHeader
