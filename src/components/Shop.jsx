import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function Shop({ children }) {
  return (
    <section id="shop">
      <h2>
        <FontAwesomeIcon icon={faInstagram} />
        <FontAwesomeIcon icon={faWhatsapp} />
      </h2>

      <ul id="products">{children}</ul>
    </section>
  );
}
