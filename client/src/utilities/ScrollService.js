import { TOTAL_SCREENS } from "./commonUtils";
import { Subject } from 'rxjs';

export default class ScrollService {
    static scrollHandler = new ScrollService();

    static currentScreenBroadCaster = new Subject();
    static currentScreenFadeIn = new Subject();

    constructor() {
        window.addEventListener('scroll', this.checkCurrentScreenUnderViewport);
    }

    scrollToHireMe = () => {
        let ContactMeScreen = document.getElementById("ContactMe");
        if (!ContactMeScreen) return;
        ContactMeScreen.scrollIntoView({ behavior: "smooth" });
    }

    scrollToHome = () => {
        let homeScreen = document.getElementById("Home");
        if (!homeScreen) return;
        homeScreen.scrollIntoView({ behavior: "smooth" });
    }

    isElementInView = (elem, type) => {
        let rec = elem.getBoundingClientRect();
        let elementTop = rec.top;
        let elementBottom = rec.bottom;

        let partiallyVisible = elementTop < window.innerHeight && elementBottom >= 0;
        let completelyVisible = elementTop >= 0 && elementBottom <= window.innerHeight;

        switch (type) {
            case "partial":
                return partiallyVisible;
            case "complete":
                return completelyVisible;
            default:
                return false;
        }
    }

    checkCurrentScreenUnderViewport = (Event) => {
        if (!Event || Object.keys(Event).length > 1) return;

        for (let screen of TOTAL_SCREENS) {
            let screenFromDOM = document.getElementById(screen.screen_name);
            if (!screenFromDOM) continue;

            let fullyVisible = this.isElementInView(screenFromDOM, "complete");
            let partiallyVisible = this.isElementInView(screenFromDOM, "partial");

            if (fullyVisible && !screen.alreadyRendered) {
                // If the screen is fully visible and not yet rendered, fade in
                ScrollService.currentScreenFadeIn.next({
                    fadeInScreen: screen.screen_name
                });
                screen['alreadyRendered'] = true;
                break;
            }

            if (fullyVisible) {
                // If the screen is fully visible, broadcast it
                ScrollService.currentScreenBroadCaster.next({
                    screenInView: screen.screen_name
                });
                break;
            }

            if (partiallyVisible) {
                // If the screen is partially visible, broadcast it
                ScrollService.currentScreenBroadCaster.next({
                    screenInView: screen.screen_name,
                    partiallyVisible: true
                });
                // Continue checking for fully visible screens
            }
        }
    }
}
