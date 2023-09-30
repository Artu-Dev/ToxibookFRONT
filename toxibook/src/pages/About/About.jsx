import React from "react";
import "./About.css";

const About = () => {
  return (
    <main className="aboutContainer">
      <span>
        <h1>Emojis fornecidos por Tweeoji</h1>
        <p>Copyright 2020 Twitter, Inc and other contributors</p>
        <p>
          Code licensed under the MIT License:
					<a href="http://opensource.org/licenses/MIT">http://opensource.org/licenses/MIT</a>
        </p>
        <p>
          Graphics licensed under CC-BY 4.0:
					<a href="https://creativecommons.org/licenses/by/4.0/">https://creativecommons.org/licenses/by/4.0/</a>
        </p>
      </span>

      <span>
				<h1>Ícones fornecidos por</h1>
        <p>
          <a href="https://fontawesome.com/">Font Awesome</a> e estão
          licenciados sob a{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/">
            CC BY 4.0 License
          </a>
          .
        </p>
      </span>
    </main>
  );
};

export default About;
