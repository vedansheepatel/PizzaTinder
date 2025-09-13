import styled from "styled-components";
import logo from "../assets/SliceSwipe.png"; 

 const StyledLogo = styled.img`
  width: 300px;
  height: 300px;
  margin-bottom:1.5rem;

  @media (min-width: 768px) {
    width: 300px;
    height: 300px;
  }
`;
const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return <StyledLogo src={logo} alt="SliceSwipe Logo" className={className} />;
};

export default Logo;