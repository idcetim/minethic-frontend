import { Box, Tabs, Tab, Dialog } from "@mui/material"
import React from "react";
import CustomNavbar from "@/components/Navbar";
import MaterialesDespuesPretratamiento from "@/components/consultar/materiales/MaterialesDespuesPretratamiento";
import ResiduosIniciales from "@/components/consultar/materiales/ResiduosIniciales";
import MaterialesFinales from "@/components/consultar/materiales/MaterialesFinales";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ConsultarMateriales = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <main>
            <CustomNavbar />

            <Box sx={{ width: '100%', paddingTop: '56px' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                    <Tabs value={value} onChange={handleChange} centered variant="scrollable" scrollButtons="auto">
                        <Tab label="Materias iniciales" {...a11yProps(0)} />
                        <Tab label="Materias post pretratamiento" {...a11yProps(1)} />
                        <Tab label="Materias finales" {...a11yProps(2)} />
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                    <ResiduosIniciales />
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <MaterialesDespuesPretratamiento />
                </TabPanel>

                <TabPanel value={value} index={2}>
                    <MaterialesFinales />
                </TabPanel>
            </Box>
        </ main>
    );
}

export default ConsultarMateriales