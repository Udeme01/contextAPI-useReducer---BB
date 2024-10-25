// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function Shop({ children }) {
  return (
    <section id="shop" className="">
      <ul id="products" className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </ul>
    </section>
  );
}
