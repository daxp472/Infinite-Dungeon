// Example: Redirect on click of sidebar items
document.querySelectorAll('.sidebar ul li').forEach((item, index) => {
  item.addEventListener('click', () => {
    switch (index) {
      case 0: // Updates
        window.location.href = 'updates.html';
        break;
      case 1: // New
        window.location.href = 'new.html';
        break;
      case 2: // Recently Played
        window.location.href = 'recently_played.html';
        break;
      case 3: // Other
        window.location.href = 'other.html';
        break;
    }
  });
});
