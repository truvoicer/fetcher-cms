import React from "react";

const SettingsDropdown = React.forwardRef(({children, onClick}, ref) => (
    <a
        className="card-header-action btn-setting"
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        <svg className="c-icon">
            <use xlinkHref="/images/icons/sprites/free.svg#cil-settings"/>
        </svg>
    </a>
));
export default SettingsDropdown;
