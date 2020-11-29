import {Box} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";

export default function TabPanel(props) {
    const {children, value, index} = props;

    return (
        <div hidden={value !== index}>
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};