interface HeroContent {
    title: string;
    subtitle: string;
    cover: string;
}

interface TestStrings {
    homePageTitle: string;
    navigationItems: string[];
    heroContent: {
        [key: string]: HeroContent;
    };
}

const strings: TestStrings = {
    homePageTitle: "Doctor Who Universe",
    navigationItems: ["Doctors", "Friends", "Enemies", "Timeline"],
    heroContent: {
        doctors: {
            title: "The Doctors",
            subtitle:
                "The many faces of the Time Lord who travels through time and space.",
            cover: "",
        },
        friends: {
            title: "The Friends",
            subtitle: "Brave individuals who have traveled with the Doctor.",
            cover: "",
        },
        enemies: {
            title: "The Adversaries",
            subtitle: "The most dangerous foes the Doctor has ever faced.",
            cover: "",
        },
        timeline: {
            title: "The Timeline",
            subtitle:
                "A journey through the key moments of the Doctor's history.",
            cover: "",
        },
    },
};

export default strings;
