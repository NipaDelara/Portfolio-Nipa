export default class Animations {
    static animations = new Animations();
  
    fadeInScreen = (screen_name) => {
      let screen = document.getElementById(screen_name);
      if (!screen) return;
  
      // Set the initial state before starting the animation
      screen.style.opacity = "0"; // Hidden at first
      screen.style.transform = "translateY(30px)"; // Moved slightly down initially
  
      // Trigger the animation after a short delay to make sure the initial styles are applied
      setTimeout(() => {
        // Apply fade-in effect with proper opacity and transform
        screen.style.opacity = "1"; // Fully visible
        screen.style.transform = "translateY(0px)";
        screen.style.transition = "opacity 1s ease-in-out, transform 1s ease-in-out"; // Smooth transition
      }, 100); // Delay to ensure initial styles are rendered
    };
  }
  