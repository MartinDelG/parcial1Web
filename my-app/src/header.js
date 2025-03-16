import banner from "./banner.png";

function Header() {
  return (
    <div className="text-center">
      <h1>Adopta un Robot con Robot Lovers!</h1>
      <hr />
      <img src={banner} alt="Banner de Robot Lovers" style={{ maxWidth: "100%", height: "auto" }} />
      <hr />
    </div>
  );
}

export default Header;
