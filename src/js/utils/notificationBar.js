const notificationBar = (content) => {
  const notificationBarEl = document.createElement("button");
  notificationBarEl.classList.add("cta", "custom", "notification-bar");
  notificationBarEl.innerHTML = `
    <img src="../src/images/icons/check-drk.svg" width="24" height="24" alt="Close">
    ${content}
  `
  document.body.appendChild(notificationBarEl);

  setTimeout (() => {
    notificationBarEl.remove();
  }, 1800);
}

export { notificationBar };
