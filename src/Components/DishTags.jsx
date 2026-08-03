import { facetOptions } from "../data/dishes.js";

const labels = Object.fromEntries(
    facetOptions.map((option) => [option.id, option.shortLabel]),
);

export default function DishTags({ tags }) {
    return (
        <div className="dish-tags" aria-label="Dish tags">
            {tags.map((tag) => (
                <span className={`dish-tag dish-tag-${tag}`} key={tag}>
                    {labels[tag]}
                </span>
            ))}
        </div>
    );
}
