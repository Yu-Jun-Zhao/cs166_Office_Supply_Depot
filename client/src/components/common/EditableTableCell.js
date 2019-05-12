import TableCell from "@material-ui/core/TableCell";
import React from "react";
import TextField from "@material-ui/core/TextField";

const EditableTableCell = ({ row, fieldName, onCellValueChange, style }) => {
    const handleTextFieldChange = e => {
        onCellValueChange({
            fieldValue: e.target.value,
            fieldName: fieldName
        });
    };

    return (
        <TableCell padding="dense">
            <TextField
                onChange={handleTextFieldChange}
                id={fieldName}
                defaultValue={row[fieldName]}
                style={style}
            />
        </TableCell>
    );
};

export default EditableTableCell;