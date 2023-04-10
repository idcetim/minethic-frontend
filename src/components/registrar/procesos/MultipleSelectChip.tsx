'use client'

import { Box, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip, useTheme, SelectChangeEvent, Theme } from "@mui/material"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const MultipleSelectChip = ({ label, options, values, setValues }: {
    label: string,
    options: string[],
    values: string[],
    setValues: (values: string[]) => void
}) => {
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<typeof values>) => {
        const {
            target: { value },
        } = event;
        setValues(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <FormControl sx={{width: '100%'}}>
            <InputLabel>{label}</InputLabel>
            <Select
                multiple
                value={values}
                onChange={handleChange}
                input={<OutlinedInput label={label} />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        value={option}
                        style={getStyles(option, values, theme)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default MultipleSelectChip