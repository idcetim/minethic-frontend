import { Box, Tabs, Tab, Dialog } from "@mui/material"
import React from "react";
import CustomNavbar from "@/components/Navbar";
import Pretratamientos from "@/components/consultar/procesos/Pretratamientos"
import Postratamientos from "@/components/consultar/procesos/Postratamientos"

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


const ConsultarProcesos = () => {
    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <main>
            <CustomNavbar />

            <Box sx={{width: '100%', paddingTop: '56px'}}>
                <Box sx={{boderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} centered variant="scrollable" scrollButtons="auto">
                        <Tab label="Pretratamientos" {...a11yProps(0)} />
                        <Tab label="Postratamientos" {...a11yProps(1)} />
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                    <Pretratamientos />
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <Postratamientos />
                </TabPanel>
            </Box>
        </main>
    )
}

export default ConsultarProcesos