const notificationBar = (content) => {
  const notificationBarEl = document.createElement("button");
  notificationBarEl.classList.add("cta", "custom", "notification-bar");
  notificationBarEl.innerHTML = `${content}`
  document.body.appendChild(notificationBarEl);

  setTimeout (() => {
    notificationBarEl.remove();
  }, 1800);
}

export { notificationBar };
