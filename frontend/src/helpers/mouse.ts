export const mouseEnterHandler = (
  e: React.MouseEvent,
  isFollowing: (profileId: string) => boolean,
  profileId: string,
  meId?: string
) => {
  if (!isFollowing(profileId)) return;
  if (profileId === meId) return;

  const button = e.target as HTMLButtonElement;
  const span = button.children[0] as HTMLElement;

  if (span) {
    span.textContent = "Unfollow";
    button.classList.add("hover:border-rose-200");
    button.classList.add("hover:bg-rose-100");
    button.classList.add("hover:text-red-500");
  }
};

export const mouseLeaveHandler = (e: React.MouseEvent) => {
  const button = e.target as HTMLButtonElement;
  const span = button.children[0];

  button.classList.remove("hover:border-rose-200");
  button.classList.remove("hover:bg-rose-100");
  button.classList.remove("hover:text-red-500");

  if (span && span.textContent === "Unfollow") {
    span.textContent = "Following";
  }
};
