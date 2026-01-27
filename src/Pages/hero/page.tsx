export type Props = {
  loading: () => void;
};
export default function Hero(props: Props) {
  return (
    <section id="home" className="hero">
      <div className="hero-left">
        <div style={{ color: "white" }}>
          <h1
            className="font-mono font-semibold text-7xl"
            style={{ maxWidth: "26rem" }}
          >
            CODE WHAT YOU <a className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">CANT</a>
          </h1>
          <div>
            {" "}
            <button
              className="rounded-sm about-us-text"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              ABOUT US{" "}
              <i style={{ paddingTop: ".3rem", paddingLeft: ".3rem" }}>
                <img
                  width="32"
                  height="32"
                  src="https://img.icons8.com/windows/32/FFFFFF/long-arrow-right.png"
                  alt="long-arrow-right"
                />
              </i>
            </button>
          </div>
        </div>
      </div>
      <div className="hero-right">
        <iframe
          onLoad={props.loading}
          src="https://my.spline.design/particles-efe9e3a9a7cc30fcfe2152e03f85e1e9/"
        ></iframe>
      </div>
    </section>
  );
}
