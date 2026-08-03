import { NavLink } from "react-router";

export default function Breadcrumbs({ items }) {
    return (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol className="breadcrumb-list">
                {items.map((item, index) => {
                    const isCurrentPage = index === items.length - 1;

                    return (
                        <li key={`${item.label}-${index}`}>
                            {isCurrentPage ? (
                                <span aria-current="page">{item.label}</span>
                            ) : (
                                <NavLink to={item.to}>{item.label}</NavLink>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
