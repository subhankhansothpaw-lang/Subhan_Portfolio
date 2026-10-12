(() => {
  const accountKey = "movieNightAccounts";
  const sessionKey = "movieNightSession";

  function updateAccountLink() {
    const accountLink = Array.from(document.querySelectorAll("nav a"))
      .find((link) => /(?:^|\/)Login\.html(?:#.*)?$/i.test(link.getAttribute("href") || ""));
    if (!accountLink) return;

    try {
      const email = localStorage.getItem(sessionKey);
      if (!email) {
        accountLink.href = "Login.html";
        accountLink.textContent = "Login / Sign Up";
        accountLink.removeAttribute("aria-label");
        return;
      }
      const accounts = JSON.parse(localStorage.getItem(accountKey) || "[]");
      if (!Array.isArray(accounts)) throw new Error("Saved account data is invalid.");
      const account = accounts.find((item) => item.email === email);
      if (!account) {
        localStorage.removeItem(sessionKey);
        accountLink.href = "Login.html";
        accountLink.textContent = "Login / Sign Up";
        accountLink.removeAttribute("aria-label");
        return;
      }
      accountLink.href = "Login.html#account";
      accountLink.textContent = `Hi, ${account.name}`;
      accountLink.setAttribute("aria-label", `Hi, ${account.name}. Open account settings`);
    } catch (error) {
      console.error("Could not update the account navigation link.", error);
    }
  }

  updateAccountLink();
  window.addEventListener("storage", updateAccountLink);
  window.addEventListener("movieNightAccountChanged", updateAccountLink);
})();
