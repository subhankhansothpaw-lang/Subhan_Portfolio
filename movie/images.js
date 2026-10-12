(() => {
  const imageByTitle = new Map([
    ["the batman", "b1.jpg"],
    ["interstellar", "Intersteller.jpg"],
    ["spider-man: brand new day", "spiderman brand new day.jpg"],
    ["the odyssey", "the odessy.jpg"],
    ["man of steel", "Man of Steel.jpg"],
    ["red dead redemption 2", "RDR 2 game.jpg"],
    ["the witcher 3: wild hunt", "Witcher 3.jpg"],
    ["elden ring", "Elden Ring game.jpg"],
    ["minecraft", "Minecraft.jpg"],
    ["cyberpunk 2077", "Cyber Punk 2077.jpg"],
    ["attack on titan", "Attack on titan.jpg"],
    ["one piece", "one peice.jpg"],
    ["demon slayer", "Demon Slayer.jpg"],
    ["jujutsu kaisen", "jujutsu kaisen.jpg"],
    ["fullmetal alchemist: brotherhood", "full metal.jpg"],
  ]);

  function addImage(container, filename, alt, onLoad) {
    const image = document.createElement("img");
    image.src = `images/${filename}`;
    image.alt = alt;
    image.loading = "eager";
    image.addEventListener("load", () => {
      if (onLoad) onLoad();
      container.classList.add("has-image");
    }, { once: true });
    image.addEventListener("error", () => {
      image.remove();
    }, { once: true });
    container.prepend(image);
  }

  document.querySelectorAll("article.slide").forEach((slide) => {
    const title = slide.querySelector(".info h3")?.textContent.trim().toLowerCase();
    const filename = imageByTitle.get(title);
    if (!filename) return;

    const poster = slide.querySelector(".poster");
    if (poster) {
      const fallback = poster.querySelector("svg");
      const titleText = slide.querySelector(".info h3").textContent.trim();
      addImage(poster, filename, `${titleText} poster`, () => {
        if (fallback) fallback.hidden = true;
      });
      return;
    }

    const artwork = slide.querySelector(".art");
    if (artwork) {
      const titleText = slide.querySelector(".info h3").textContent.trim();
      const label = artwork.querySelector("span");
      if (label) label.setAttribute("aria-hidden", "true");
      addImage(artwork, filename, `${titleText} artwork`);
    }
  });
})();
