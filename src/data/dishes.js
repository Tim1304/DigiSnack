import dishData from "../assets/dishes.json";

const imageModules = import.meta.glob("../assets/FoodItems/**/*", {
    eager: true,
    import: "default",
    query: "?url",
});

const gameSlugs = {
    "Valheim": "valheim",
    "Fallout 76": "fallout-76",
    "Minecraft": "minecraft",
};

export const facetOptions = [
    { id: "vegetarian", label: "Vegetarian dishes", shortLabel: "Vegetarian", group: "diet" },
    { id: "meat", label: "Meat dishes", shortLabel: "Meat", group: "diet" },
    { id: "breakfast", label: "Breakfast dishes", shortLabel: "Breakfast", group: "meal" },
    { id: "lunch", label: "Lunch dishes", shortLabel: "Lunch", group: "meal" },
    { id: "dinner", label: "Dinner dishes", shortLabel: "Dinner", group: "meal" },
];

const vegetarianDishes = new Set([
    "queens-jam",
    "carrot-soup",
    "muckshake",
    "black-soup",
    "eyescream",
    "mushroom-omelette",
    "stuffed-mushroom",
    "yggdrasil-porridge",
    "baked-bloatfly",
    "blackberry-honey-crisp",
    "brain-bombs",
    "fasnacht-donut",
    "glowing-fungus-puree",
    "pumpkin-pie",
    "silt-bean-puree",
    "tato-salad",
    "apple",
    "baked-potato",
    "beetroot",
    "beetroot-soup",
    "bread",
    "cake",
    "carrot",
    "chorus-fruit",
    "cookie",
    "dried-kelp",
    "enchanted-golden-apple",
    "golden-apple",
    "glow-berries",
    "golden-carrot",
    "honey-bottle",
    "melon-slice",
    "mushroom-stew",
    "poisonous-potato",
    "potato",
    "minecraft-pumpkin-pie",
    "suspicious-stew",
    "sweet-berries",
]);

// Most hearty dishes suit both lunch and dinner. These exceptions make the
// meal facets more useful while keeping all classification in one data source.
const mealTagsByDish = {
    "queens-jam": ["breakfast"],
    "muckshake": ["breakfast", "lunch"],
    "eyescream": ["dinner"],
    "mushroom-omelette": ["breakfast", "lunch"],
    "yggdrasil-porridge": ["breakfast"],
    "blackberry-honey-crisp": ["breakfast", "dinner"],
    "brain-bombs": ["breakfast"],
    "fasnacht-donut": ["breakfast"],
    "pumpkin-pie": ["dinner"],
    "apple": ["breakfast", "lunch"],
    "baked-potato": ["breakfast", "lunch", "dinner"],
    "beetroot": ["lunch", "dinner"],
    "bread": ["breakfast", "lunch"],
    "cake": ["breakfast", "dinner"],
    "carrot": ["breakfast", "lunch"],
    "cookie": ["breakfast", "lunch"],
    "glow-berries": ["breakfast", "lunch"],
    "golden-apple": ["breakfast", "lunch"],
    "enchanted-golden-apple": ["breakfast", "lunch"],
    "golden-carrot": ["breakfast", "lunch"],
    "honey-bottle": ["breakfast", "lunch"],
    "melon-slice": ["breakfast", "lunch"],
    "minecraft-pumpkin-pie": ["breakfast", "dinner"],
    "sweet-berries": ["breakfast", "lunch"],
};

function formatDishName(slug) {
    return slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export const dishes = Object.entries(dishData).map(([slug, values]) => {
    const [
        game,
        description,
        recipe,
        imagePath,
        source,
        displayName,
    ] = values;
    const modulePath = imagePath.replace("./FoodItems/", "../assets/FoodItems/");

    return {
        slug,
        name: displayName ?? formatDishName(slug),
        game,
        gameSlug: gameSlugs[game],
        description,
        recipe,
        image: imageModules[modulePath],
        source,
        tags: [
            vegetarianDishes.has(slug) ? "vegetarian" : "meat",
            ...(mealTagsByDish[slug] ?? ["lunch", "dinner"]),
        ],
    };
});

export function findDish(gameSlug, dishSlug) {
    return dishes.find(
        (dish) => dish.gameSlug === gameSlug && dish.slug === dishSlug,
    );
}
