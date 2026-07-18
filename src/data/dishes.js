import dishData from "../assets/dishes.json";

const imageModules = import.meta.glob("../assets/FoodItems/**/*", {
    eager: true,
    import: "default",
    query: "?url",
});

const gameSlugs = {
    "Valheim": "valheim",
    "Fallout 76": "fallout-76",
    "Red Dead Redemption 2": "red-dead-redemption-2",
};

function formatDishName(slug) {
    return slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export const dishes = Object.entries(dishData).map(([slug, values]) => {
    const [game, description, recipe, imagePath, source] = values;
    const modulePath = imagePath.replace("./FoodItems/", "../assets/FoodItems/");

    return {
        slug,
        name: formatDishName(slug),
        game,
        gameSlug: gameSlugs[game],
        description,
        recipe,
        image: imageModules[modulePath],
        source,
    };
});

export function findDish(gameSlug, dishSlug) {
    return dishes.find(
        (dish) => dish.gameSlug === gameSlug && dish.slug === dishSlug,
    );
}
