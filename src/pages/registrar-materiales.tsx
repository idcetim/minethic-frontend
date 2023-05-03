import { Box, Tabs, Tab } from "@mui/material"
import React from "react";
import ResiduosIniciales from "../components/registrar/materiales/ResiduosIniciales";
import MaterialesDespuesPretratamiento from "../components/registrar/materiales/MateriaslesDespuesPretratamiento";
import MaterialesFinales from "../components/registrar/materiales/MaterialesFinales";
import CustomNavbar from "@/components/Navbar";

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

export default function RegistrarMateriales() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <main>
            <CustomNavbar />

            <Box sx={{ width: '100%', paddingTop: '56px' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Tabs
                        value={value} 
                        onChange={handleChange} 
                        aria-label="basic tabs example" 
                        variant="scrollable" 
                        scrollButtons="auto" 
                        allowScrollButtonsMobile
                    >
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