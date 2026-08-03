const ingredientNamesByDish = {
    "minced-meat-sauce": "Ground pork|Chicken thighs|Carrots|Stock|Olive oil|Salt|Black pepper|Mixed herbs",
    "queens-jam": "Raspberries|Blueberries|Sugar|Lemon",
    "carrot-soup": "Mushrooms|Carrots|Butter|Vegetable stock|Salt|Black pepper",
    "deer-stew": "Venison or beef|Carrots|Blueberries|Beef stock|Onion|Thyme|Olive oil|Salt|Black pepper",
    "muckshake": "Raspberries|Blueberries|Plain yogurt|Lime|Honey|Spirulina powder",
    "turnip-stew": "Pork shoulder|Turnips|Stock|Onion|Thyme|Olive oil|Salt|Black pepper",
    "sausages": "Ground pork|Garlic|Dried herbs|Salt|Black pepper|Cooking oil",
    "black-soup": "Turnips|Beets|Onion|Vegetable stock|Honey|Olive oil|Salt|Black pepper",
    "serpent-stew": "Firm white fish|Mushrooms|Seafood stock|Honey|Fresh herbs|Olive oil|Salt|Black pepper",
    "wolf-skewer": "Venison or lamb|Mushrooms|Onion|Olive oil|Salt|Black pepper",
    "eyescream": "Vanilla ice cream|Blueberries|Lime|Candy eyes",
    "fish-wraps": "Firm white fish|Flatbreads|Cabbage|Plain yogurt|Fresh herbs|Lime|Salt|Black pepper",
    "lox-meat-pie": "Beef or venison|Blueberries|Puff pastry|Onion|Butter|Egg|Salt|Black pepper",
    "blood-pudding": "Pearl barley|Onion|Beets|Ground sausage|Stock|Fresh herbs|Salt|Black pepper",
    "meat-platter": "Beef|Rabbit or chicken|Mushrooms|Olive oil|Fresh herbs|Salt|Black pepper",
    "honey-glazed-chicken": "Chicken|Honey|Mustard|Mushrooms|Olive oil|Salt|Black pepper",
    "misthare-supreme": "Rabbit or chicken thighs|Carrots|Mushrooms|Stock|Thyme|Olive oil|Salt|Black pepper",
    "mushroom-omelette": "Mushrooms|Eggs|Butter|Salt|Black pepper",
    "stuffed-mushroom": "Portobello mushrooms|Breadcrumbs|Turnip|Garlic|Fresh herbs|Olive oil|Salt|Black pepper",
    "yggdrasil-porridge": "Rolled oats|Milk|Maple syrup|Blueberries|Toasted seeds|Salt",

    "appalachili": "Ground beef|Onion|Beans|Crushed tomatoes|Chili powder|Hot sauce|Olive oil|Salt",
    "baked-bloatfly": "Portobello mushrooms|Breadcrumbs|Cheese|Garlic|Fresh herbs|Olive oil|Salt|Black pepper",
    "blackberry-honey-crisp": "Blackberries|Honey|Lemon|Rolled oats|Flour|Butter|Cinnamon|Salt",
    "brain-bombs": "Flour|Butter|Sugar|Eggs|Milk|Baking powder|Mixed baking spices|Pink icing",
    "cranberry-meatball-grinder": "Meatballs|Sandwich rolls|Tomato sauce|Cranberry relish|Cheese",
    "deathclaw-wellington": "Beef tenderloin|Mushrooms|Puff pastry|Mustard|Egg|Butter|Salt|Black pepper",
    "fasnacht-donut": "Flour|Yeast|Milk|Eggs|Butter|Sugar|Cinnamon|Frying oil",
    "fried-deerskins": "Venison or beef strips|Flour|Eggs|Buttermilk|Paprika|Frying oil|Salt|Black pepper",
    "glowing-fungus-puree": "Mushrooms|Spinach|Garlic|Stock|Cream|Lemon|Butter|Salt|Black pepper",
    "iguana-soup": "Chicken|Onion|Carrots|Celery|Stock|Fresh herbs|Salt|Black pepper",
    "mirelurk-cake-bloodleaf-aioli": "Crab meat|Breadcrumbs|Eggs|Mayonnaise|Beets|Garlic|Lemon|Cooking oil|Salt",
    "pepperoni-roll": "Bread dough|Pepperoni|Mozzarella cheese|Egg",
    "pumpkin-pie": "Pumpkin puree|Eggs|Evaporated milk|Sugar|Cinnamon|Ginger|Nutmeg|Pie crust",
    "radscorpion-kebab": "Shrimp|Bell peppers|Onion|Chili oil|Lime|Salt",
    "ribeye-steak": "Ribeye steak|Butter|Garlic|Thyme|Salt|Black pepper",
    "silt-bean-puree": "White beans|Onion|Garlic|Olive oil|Lemon|Stock|Salt|Black pepper",
    "smoked-mirelurk-fillets": "Firm white fish|Paprika|Brown sugar|Olive oil|Salt",
    "squirrel-on-a-stick": "Chicken thighs|Bell peppers|Onion|Zucchini|Olive oil|Fresh herbs|Salt|Black pepper",
    "tato-salad": "Potatoes|Tomatoes|Celery|Fresh herbs|Mustard|Mayonnaise|Salt|Black pepper",
    "tasty-squirrel-stew": "Chicken thighs|Potatoes|Carrots|Onion|Stock|Fresh herbs|Olive oil|Salt|Black pepper",

    "apple": "Apples|Lemon|Cinnamon|Honey|Rolled oats",
    "baked-potato": "Russet potatoes|Olive oil|Salt|Butter|Cheese|Chives",
    "beetroot": "Beets|Olive oil|Thyme|Salt",
    "beetroot-soup": "Beets|Onion|Butter|Vegetable stock|Plain yogurt|Salt|Black pepper",
    "bread": "Flour|Yeast|Water|Salt",
    "cake": "Butter|Sugar|Eggs|Vanilla extract|Flour|Milk|Baking powder|Vanilla frosting",
    "carrot": "Carrots|Butter|Honey|Parsley|Salt|Black pepper",
    "chorus-fruit": "Black grapes|Blackberries|Plums|Lime|Honey|Sparkling sugar",
    "cooked-chicken": "Chicken|Olive oil|Garlic|Rosemary|Salt|Black pepper",
    "cooked-cod": "Cod fillets|Butter|Lemon|Fresh herbs|Salt|Black pepper",
    "cooked-mutton": "Lamb chops|Garlic|Rosemary|Olive oil|Salt|Black pepper",
    "cooked-porkchop": "Pork chops|Paprika|Thyme|Olive oil|Salt|Black pepper",
    "cooked-rabbit": "Rabbit or chicken thighs|Garlic|Thyme|Onion|Stock|Olive oil|Salt|Black pepper",
    "cooked-salmon": "Salmon fillets|Honey|Mustard|Lemon|Olive oil|Salt|Black pepper",
    "cookie": "Butter|Sugar|Eggs|Vanilla extract|Flour|Cocoa nibs or chocolate chips|Baking soda|Salt",
    "dried-kelp": "Nori sheets|Sesame oil|Salt",
    "enchanted-golden-apple": "Apples|Caramel|Edible gold luster|Jewel-toned sugar sprinkles",
    "golden-apple": "Apples|Caramel|Honeycomb candy|Gold sanding sugar",
    "glow-berries": "Blueberries|Golden berries|Sugar|Lemon|Plain yogurt",
    "golden-carrot": "Carrots|Honey|Butter|Turmeric|Parsley|Salt|Black pepper",
    "honey-bottle": "Honey|Lemon|Fresh ginger|Water",
    "melon-slice": "Melon|Lime|Chili salt|Mint",
    "mushroom-stew": "Mixed mushrooms|Onion|Garlic|Vegetable stock|Thyme|Cream|Butter|Salt|Black pepper",
    "poisonous-potato": "Purple potatoes|Garlic|Butter|Milk|Salt|Black pepper",
    "potato": "Potatoes|Onion|Olive oil|Rosemary|Salt|Black pepper",
    "pufferfish": "Sushi rice|Cooked salmon|Nori sheets|Cucumber|Rice vinegar|Salt",
    "minecraft-pumpkin-pie": "Pumpkin puree|Eggs|Milk|Brown sugar|Cinnamon|Ginger|Nutmeg|Pie crust",
    "rabbit-stew": "Rabbit or chicken thighs|Carrots|Potatoes|Mushrooms|Onion|Stock|Fresh herbs|Olive oil|Salt|Black pepper",
    "raw-beef": "Beef|Garlic|Olive oil|Salt|Black pepper",
    "raw-chicken": "Chicken strips|Breadcrumbs|Eggs|Flour|Honey mustard|Salt|Black pepper",
    "raw-cod": "Cod fillets|Potatoes|Fresh herbs|Eggs|Breadcrumbs|Cooking oil|Salt|Black pepper",
    "raw-mutton": "Lamb|Plain yogurt|Cumin|Garlic|Lemon|Salt|Black pepper",
    "raw-porkchop": "Pork chops|Flour|Eggs|Breadcrumbs|Cooking oil|Salt|Black pepper",
    "raw-rabbit": "Rabbit or chicken thighs|Onion|Carrots|Thyme|Stock|Olive oil|Salt|Black pepper",
    "raw-salmon": "Salmon fillets|Breadcrumbs|Eggs|Scallions|Lemon|Cooking oil|Salt|Black pepper",
    "rotten-flesh": "Beef strips|Soy sauce|Smoked paprika|Garlic|Brown sugar|Black pepper",
    "spider-eye": "Lychees|Blueberries|Raspberries|Sugar|Lemon",
    "steak": "Beef steak|Butter|Garlic|Thyme|Salt|Black pepper",
    "suspicious-stew": "Mixed mushrooms|Onion|Vegetable stock|Cream|Spinach|Edible herbs|Butter|Salt|Black pepper",
    "sweet-berries": "Mixed berries|Honey|Lemon|Water",
    "tropical-fish": "Cod or tilapia|Tortillas|Cabbage|Mango|Lime|Paprika|Olive oil|Salt",
};

export function getRecipeIngredients(dish) {
    return (ingredientNamesByDish[dish.slug] ?? "Salt|Black pepper")
        .split("|")
        .map((name) => name.trim())
        .filter(Boolean);
}

function ensureSentence(text) {
    const trimmed = text.trim();
    const capitalized = `${trimmed.charAt(0).toLocaleUpperCase()}${trimmed.slice(1)}`;
    return /[.!?]$/.test(capitalized) ? capitalized : `${capitalized}.`;
}

function coreRecipeSteps(recipe) {
    return recipe
        .replace(/;\s*/g, "|")
        .replace(/,\s+then\s+/gi, "|Then ")
        .split("|")
        .map(ensureSentence);
}

function finishingStep(dish) {
    const recipe = dish.recipe.toLocaleLowerCase();

    if (recipe.includes("chill") || recipe.includes("cool")) {
        return "Allow the finished dish to chill or cool for the time indicated so its flavor and texture can settle before serving.";
    }
    if (recipe.includes("bake") || recipe.includes("roast")) {
        return "Check the center and edges for doneness, allow the dish to rest briefly, and serve while its texture is at its best.";
    }
    if (recipe.includes("simmer") || recipe.includes("stew") || recipe.includes("soup")) {
        return "Taste the finished pot, adjust the salt, pepper, and acidity, and serve hot once every component is tender.";
    }
    return "Taste, adjust the seasoning, and serve promptly with any garnish or accompaniment named in the recipe.";
}

export function getDetailedRecipeSteps(dish) {
    const ingredients = getRecipeIngredients(dish);
    const meatSafetyStep = dish.tags.includes("meat")
        ? "Prepare produce first, keep raw meat or seafood separate, wash hands and utensils after handling it, and preheat the cooking equipment."
        : "Wash and dry the produce, measure the pantry ingredients, and preheat or prepare the cooking equipment.";

    return [
        `Gather and measure everything before starting: ${ingredients.join(", ")}.`,
        meatSafetyStep,
        ...coreRecipeSteps(dish.recipe),
        finishingStep(dish),
    ];
}

export function groceryKey(name) {
    return name.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
