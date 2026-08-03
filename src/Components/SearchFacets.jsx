import { facetOptions } from "../data/dishes.js";

export default function SearchFacets({ selectedFacets, onToggle, onClear }) {
    return (
        <aside className="search-facets" aria-labelledby="filter-heading">
            <div className="facet-heading-row">
                <div>
                    <p className="facet-eyebrow">Narrow it down</p>
                    <h2 id="filter-heading">Filter dishes</h2>
                </div>
                {selectedFacets.length > 0 && (
                    <button type="button" className="clear-facets" onClick={onClear}>
                        Clear
                    </button>
                )}
            </div>

            <div className="facet-options">
                {facetOptions.map((facet) => (
                    <label className="facet-option" key={facet.id}>
                        <input
                            type="checkbox"
                            checked={selectedFacets.includes(facet.id)}
                            onChange={() => onToggle(facet.id)}
                        />
                        <span>{facet.label}</span>
                    </label>
                ))}
            </div>
        </aside>
    );
}
