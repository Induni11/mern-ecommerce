import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5">
      <Container className="text-center py-3">
        © {new Date().getFullYear()} MERN E‑Commerce | All Rights Reserved
      </Container>
    </footer>
  );
};

export default Footer;
