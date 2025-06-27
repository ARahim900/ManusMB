import React, { useState, useEffect } from 'react';
import SubNavigation from '../ui/SubNavigation';
import { Settings, BarChart3, FileText, AlertTriangle, Database, LayoutDashboard } from 'lucide-react';

// --- Helper Functions ---
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const saveToLocalStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

const loadFromLocalStorage = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return null;
    }
};

// --- Initial Data ---
const INITIAL_DATA = [
    // CIF Building
    { building: 'CIF', mainSystem: 'York Chiller', equipment: 'Chiller #1 (Sys #1 & #2)', ppm1: 'Water sensor inlet (1); Plug sensor (1); Plug transducer (1)', ppm2: 'Water sensor inlet (1) (Need LPO); Plug sensor (1) (Need LPO); Plug transducer (1) (Need LPO)', ppm3: 'Water Sensor Inlet Defective (1); Plug Sensor Defective (2); Plug Transducer Defective (2)', ppm4: 'Water Sensor Inlet Defective Need To Replace (1); Plug Sensor Defective Need To Replace (2); Educator Sensor Defective Need To Replace (1); Plug Transducer Defective Need To Replace (2)', commonIssues: 'Water sensor inlet, plug sensor, plug transducer', fixedIssues: 'None', notes: 'Quantities adjusted between PPM1 and PPM2; PPM3/PPM4 show continued issues requiring replacement' },
    
    // FM Building
    { building: 'FM', mainSystem: 'York Chiller', equipment: 'Chiller #1', ppm1: 'Fuse 3A (3); Fuse 20A (6); Water sensor (2); Plug sensor (2); Plug transducer (2); Flow switch (1); Leak test; Solenoid valve (1); Insulation', ppm2: 'Fuse 3A (3), Fuse 20A (6), Water sensor (2), Plug sensor (2), Plug transducer (2), Flow switch (1), Leak test (1), Solenoid valve (1), Insulation (1) (all Need LPO). Also: R410A (2), N2 (1), Filter (1), Pump bearing (1), Check valve (1) (Need LPO)', ppm3: 'Water Sensor Defective Need To Replace (2); Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2); Power Main Switch Defective Need To Replace (1); Water Pressure Gauge Defective Need To Replace (1); Condenser Fan Motor Make Noise Need To Bearing Replacement (1); Pump Making Noise Need To Bearing Replacement And Check The Valve (1); Pump Need Overhauling (1)', ppm4: 'Water Sensor Defective Need To Replace (2); Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2); Power Main Switch Defective Need To Replace (1); Water Pressure Gauge Defective Need To Replace (1); Condenser Fan Motor Make Noise Need To Bearing Replacement (1); Pump Making Noise Need To Bearing Replacement And Check The Valve (1); Pump Need Overhauling (1)', commonIssues: 'Fuses, water sensor, plug sensor, plug transducer, flow switch, leak test, solenoid valve, insulation', fixedIssues: 'None', notes: 'Multiple mechanical issues identified in PPM3/PPM4 including pump overhaul requirements' },
    { building: 'FM', mainSystem: 'York Chiller', equipment: 'Chiller #2', ppm1: '', ppm2: '', ppm3: 'Pump No.1 Need Overhauling (1); Pump No.2 Need Overhauling (1); Water Sensor Inlet Defective Need To Replace (1); Exv Defective Need To Replace (1); Condenser Fan Motor Make Noise Need To Bearing Replacement (2)', ppm4: 'Pump No.1 Need Overhauling (1); Pump No.2 Need Overhauling (1); Water Sensor Inlet Defective Need To Replace (1); Exv Defective Need To Replace (1); Condenser Fan Motor Make Noise Need To Bearing Replacement (2)', commonIssues: '', fixedIssues: '', notes: 'Equipment identified in PPM3/PPM4 visits - not in original tracker' },
    { building: 'FM', mainSystem: 'Pressurisations', equipment: 'Pressurization Unit No.2', ppm1: '', ppm2: '', ppm3: 'High Pressure Cut Out Need to Replace (1); Switch Pressure Cut Out Need To Replace (1); Need Bearing Replacement (1)', ppm4: 'High Pressure Cut Out Need to Replace (1); Switch Pressure Cut Out Need To Replace (1); Need Bearing Replacement (1)', commonIssues: '', fixedIssues: '', notes: 'Equipment identified in PPM3/PPM4 visits - not in original tracker' },
    
    // B1 Building
    { building: 'B1', mainSystem: 'York Chiller', equipment: 'Pressurization Unit #3', ppm1: 'High-pressure cut-out (1)', ppm2: 'High-Pressure Cut-Out (1) → DONE (per contractor); Valve 1" (4) (Need LPO)', ppm3: 'High Pressure Cut Out Need to Replace (1); Need Change Valve 1 Inch (4)', ppm4: 'High Pressure Cut Out Need to Replace (1); Need Change Valve 1 Inch (4)', commonIssues: 'High-pressure cut-out (1)', fixedIssues: 'None', notes: 'Contractor separately listed "PRESSURE SWITCH (1) DONE," likely the same as High-Pressure Cut-Out. Valves (4) are new in PPM2 but not yet installed (Need LPO)' },
    { building: 'B1', mainSystem: 'York Chiller', equipment: 'Chiller #1 (Sys #1 & #2)', ppm1: 'Transformer (1); 12A fuse (1); 20A fuses (6); Plug sensor (2); Plug transducer (2); Flow switch (1); Water sensor (2); Insulation; Leak test', ppm2: 'Carried Over (Need LPO): Transformer (1), 12A fuse (1), 20A fuses (6), Plug sensor (2), Plug transducer (2), Flow switch (1), Water sensor (2), Insulation, Leak test, Solenoid valve (1) (new from earlier PPM2) Also from contractor: R410A (2), N2 (1), Filter (1) (Need LPO) (Consumables for refilling system.)', ppm3: 'Before Check The Chiller Then Transformer Need Replace (1); Fuse Defective Need To Replace (1); Fuse Defective Need To Replace (6); Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2); Need To Leak Test (1); Solenoid Valve Defective Need To Replace (1); Inlet And Outlet Water Pipe Need Insulation (1); Flow Switch Defective Need To Replace (1); Water Sensor Inlet Defective Need To Replace (2)', ppm4: 'Before Check The Chiller Then Transformer Need Replace (1); Fuse Defective Need To Replace (1); Fuse Defective Need To Replace (6); Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2); Need To Leak Test (1); Solenoid Valve Defective Need To Replace (1); Inlet And Outlet Water Pipe Need Insulation (1); Water Sensor Inlet Defective Need To Replace (2)', commonIssues: 'Transformer (1), 12A fuse (1), 20A fuses (6), plug sensor (2), plug transducer (2), flow switch (1), water sensor (2), insulation, leak test', fixedIssues: 'None', notes: 'Contractor explicitly added "R410A(2), N2(1), filter(1)" as new consumables. All main PPM1 items remain open (Need LPO). Solenoid valve was introduced in earlier PPM2 data and still needs replacement' },
    { building: 'B1', mainSystem: 'York Chiller', equipment: 'Chiller #2', ppm1: 'Plug sensor (1); Fuse (1); Flow switch (1)', ppm2: 'Plug sensor (2) (Need LPO), Plug transducer (2) (Need LPO), Flow switch (1) (Need LPO), Water temp. sensor (1) (Need LPO), Leak test (1) (Need LPO), (Fuse from PPM1 not repeated) Also: R410A (2), N2 (1), Filter (1) (Need LPO)', ppm3: 'Flow Switch Defective Need To Replace (1); Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2); Water Temperature Sensor Inlet Defective Need To Replace (1); Need To Leak Test (1)', ppm4: 'Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2); Water Temperature Sensor Inlet Defective Need To Replace (1); Need To Leak Test (1)', commonIssues: 'Plug sensor (common item; quantity discrepancy: PPM1=1 vs. PPM2=2), Flow switch (1)', fixedIssues: '', notes: 'Plug transducer(2) & water temp sensor(1) are new in PPM2. The missing fuse implies it was likely fixed. Additional consumables (R410A, N2, filter) per contractor' },
    
    // B2 Building
    { building: 'B2', mainSystem: 'Pressurisations', equipment: 'Pressurization Unit #3', ppm1: 'High-pressure cut-out (1)', ppm2: 'High-Pressure Cut Out (1) (Need LPO)', ppm3: '', ppm4: '', commonIssues: 'High-pressure cut-out (1)', fixedIssues: 'None', notes: 'No other PPM2 additions for this unit' },
    { building: 'B2', mainSystem: 'York Chiller', equipment: 'Chiller #1 (Sys #1 & #2)', ppm1: '12A Fuse (1); 20A Fuses (6); Leak test; Cooler insulation; Plug sensor (2); Plug transducer (2); Flow switch (1); Water sensor (2)', ppm2: '12A Fuse (1), 20A Fuses (6), Leak test (1), New Cooler (1), Cooler Insulation (1), Plug sensor (2), Plug transducer (2), Flow switch (1), Water sensor (2) (all Need LPO). Contractor also lists: R410A (4), N2 (1), Filter(s) (1), "Chell Filter"(1), "Core Filter"(2), Oil 32 RLH 1 GAL(2), Control Transformer 24V(1), Fuse KIT/Transducer/Sensor connectors(1) (Need LPO). Some items installed but "Need extra items" for final completion', ppm3: 'Fuse Defective Need To Replace (1); Flow Switch Defective Need To Replace (1); Need To Leak Test (1); Cooler Insulation (1); Water Sensor Defective Need To Replace (2); Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2); Fuse Defective Need To Replace (6)', ppm4: 'Fuse Defective Need To Replace (1); Need To Leak Test (1); Cooler Insulation (1); Water Sensor Defective Need To Replace (2); Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2); Fuse Defective Need To Replace (6)', commonIssues: '12A fuse, 20A fuses, leak test, cooler insulation, plug sensor(2), plug transducer(2), flow switch(1), water sensor(2)', fixedIssues: 'None', notes: 'Extensive additional consumables required' },
    { building: 'B2', mainSystem: 'York Chiller', equipment: 'Chiller #1 Sys#2', ppm1: '', ppm2: '', ppm3: 'Plug Sensor Defective (2); Plug Transducer Defective (2); Flow Switch Defective (1)', ppm4: 'Need To Leak Test (1); Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2)', commonIssues: '', fixedIssues: '', notes: 'Equipment identified in PPM3/PPM4 visits - not in original tracker' },
    { building: 'B2', mainSystem: 'Pressurisations', equipment: 'Pressurization Unit #4', ppm1: 'High-pressure cut-out (1)', ppm2: 'High-Pressure Cut Out (1) (Need LPO)', ppm3: 'High Pressure Cut Out (1)', ppm4: 'High Pressure Cut Out Need to Replace (1)', commonIssues: 'High-pressure cut-out (1)', fixedIssues: 'None', notes: 'No other PPM2 additions for this unit' },
    
    // B3 Building
    { building: 'B3', mainSystem: 'York Chiller', equipment: 'Chiller #1', ppm1: 'Flow switch (1); On/off switch (1)', ppm2: 'Flow switch (1) (Need LPO); On/off switch (1) (Need LPO)', ppm3: 'Flow Switch Defective Need To Replace (1); On/Off Switch Defective Need To Replace (1)', ppm4: 'On/Off Switch Defective Need To Replace (1)', commonIssues: 'Flow switch, on/off switch', fixedIssues: 'None', notes: 'No other PPM2 additions for this chiller' },
    { building: 'B3', mainSystem: 'York Chiller', equipment: 'Chiller #2', ppm1: '', ppm2: '', ppm3: 'Flow Switch Defective (1); Plug Sensor Defective (2); Plug Transducer Defective (2); On/Off Switch Defective (1)', ppm4: 'Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2); On/Off Switch Defective Need To Replace (1)', commonIssues: '', fixedIssues: '', notes: 'Equipment identified in PPM3/PPM4 visits - not in original tracker' },
    
    // B4 Building
    { building: 'B4', mainSystem: 'York Chiller', equipment: 'Chiller #1', ppm1: 'Plug sensor (1); Plug transducer (1); Flow switch (1)', ppm2: 'Plug sensor (1) (Need LPO), Plug transducer (1) (Need LPO), Flow switch (1) (Need LPO)', ppm3: 'Flow Switch Defective (1); Plug Sensor Defective (2); Plug Transducer Defective (2)', ppm4: 'Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2)', commonIssues: 'Plug sensor, plug transducer, flow switch', fixedIssues: 'None', notes: 'No other PPM2 additions for this chiller' },
    { building: 'B4', mainSystem: 'York Chiller', equipment: 'Chiller #2', ppm1: 'Plug sensor (1); Plug transducer (1); Flow switch (1)', ppm2: 'Plug sensor (1) (Need LPO), Plug transducer (1) (Need LPO), Flow switch (1) (Need LPO)', ppm3: 'Plug Sensor Defective (2); Plug Transducer Defective (2); Flow Switch Defective (1)', ppm4: 'Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2)', commonIssues: 'Plug sensor, plug transducer, flow switch', fixedIssues: 'None', notes: 'No other PPM2 additions for this chiller' },
    { building: 'B4', mainSystem: 'Pressurisations', equipment: 'Pressurization Unit No.6', ppm1: '', ppm2: '', ppm3: '', ppm4: 'Switch Pressure Cut Out Need To Replace (1); Pump Need Paint (1)', commonIssues: '', fixedIssues: '', notes: 'Equipment identified in PPM3/PPM4 visits - not in original tracker' },
    { building: 'B4', mainSystem: 'Pressurisations', equipment: 'Pressurization Unit #4', ppm1: '', ppm2: '', ppm3: '', ppm4: '', commonIssues: '', fixedIssues: 'None', notes: '' },
    
    // B5 Building
    { building: 'B5', mainSystem: 'York Chiller', equipment: 'Chiller #1', ppm1: 'Fuse 12A (1); Fuse 20A (6); Water sensor (2); Plug sensor (2); Plug transducer (2); Flow switch (1); Leak test; New cooler (1)', ppm2: 'Fuse 12A (1), Fuse 20A (6), Water sensor (2), Plug sensor (2), Plug transducer (2), Flow switch (1), Leak test (1), New cooler (1) (all Need LPO). Additional items: R410A (4), N2 (1), Filters (1), "Chell Filter"(1), "Core Filter"(2), Oil 32 RLH 1 GAL(2) (Need LPO)', ppm3: 'Flow Switch Defective Need To Replace (1); Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2); Fuse Defective Need To Replace (1); Fuse Defective Need To Replace (6); Water Sensor Defective Need To Replace (2); New Cooler Need to Replace (1); Need To Leak Test (1)', ppm4: 'Flow Switch Defective Need To Replace (1); Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2); Fuse Defective Need To Replace (1); Fuse Defective Need To Replace (6); Water Sensor Defective Need To Replace (2); New Cooler Need to Replace (1); Need To Leak Test (1)', commonIssues: 'Fuse 12A, fuse 20A, water sensor, plug sensor, plug transducer, flow switch, leak test, new cooler', fixedIssues: 'None', notes: 'Additional consumables added in PPM2: R410A, N2, filters, oil' },
    { building: 'B5', mainSystem: 'York Chiller', equipment: 'Chiller #2', ppm1: 'Flow switch (1); On/off switch (1)', ppm2: 'Flow switch (1) (Need LPO); On/off switch (1) (Need LPO)', ppm3: 'Flow Switch Defective Need To Replace (1); Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2); On/Off Switch Defective Need To Replace (1)', ppm4: 'Flow Switch Defective Need To Replace (1); Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2); On/Off Switch Defective Need To Replace (1)', commonIssues: 'Flow switch, on/off switch', fixedIssues: 'None', notes: 'No other PPM2 additions for this chiller' },
    { building: 'B5', mainSystem: 'York Chiller', equipment: 'Chiller#1 Sys#2', ppm1: '', ppm2: '', ppm3: 'Need To Leak Test (1)', ppm4: 'Need To Leak Test (1)', commonIssues: '', fixedIssues: '', notes: 'Equipment identified in PPM3/PPM4 visits - not in original tracker' },
    { building: 'B5', mainSystem: 'York Chiller', equipment: 'Chiller#2 Sys#2', ppm1: '', ppm2: '', ppm3: 'Need To Leak Test (1)', ppm4: 'Need To Leak Test (1)', commonIssues: '', fixedIssues: '', notes: 'Equipment identified in PPM3/PPM4 visits - not in original tracker' },
    { building: 'B5', mainSystem: 'Pressurisations', equipment: 'Pressurization Unit #7', ppm1: 'High-pressure cut-out (1)', ppm2: 'High-Pressure Cut Out (1) (Need LPO)', ppm3: 'High Pressure Cut Out Need to Replace (1)', ppm4: 'High Pressure Cut Out Need to Replace (1)', commonIssues: 'High-pressure cut-out (1)', fixedIssues: 'None', notes: 'No other PPM2 additions for this unit' },
    
    // B6 Building
    { building: 'B6', mainSystem: 'York Chiller', equipment: 'Chiller #1', ppm1: 'Plug sensor (2); Plug transducer (2); Flow switch (1)', ppm2: 'Plug sensor (2) (Need LPO), Plug transducer (2) (Need LPO), Flow switch (1) (Need LPO)', ppm3: 'Condenser Fan Motor Make Noise Need To Bearing Replacement (4); Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2); Flow Switch Defective Need To Replace (1)', ppm4: 'Condenser Fan Motor Make Noise Need To Bearing Replacement (4); Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2)', commonIssues: 'Plug sensor, plug transducer, flow switch', fixedIssues: 'None', notes: 'No other PPM2 additions for this chiller' },
    { building: 'B6', mainSystem: 'York Chiller', equipment: 'Chiller #2', ppm1: 'Plug sensor (2); Plug transducer (2); Flow switch (1)', ppm2: 'Plug sensor (2) (Need LPO), Plug transducer (2) (Need LPO), Flow switch (1) (Need LPO)', ppm3: 'Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2); Flow Switch Defective Need To Replace (1)', ppm4: 'Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2)', commonIssues: 'Plug sensor, plug transducer, flow switch', fixedIssues: 'None', notes: 'No other PPM2 additions for this chiller' },
    { building: 'B6', mainSystem: 'Pressurisations', equipment: 'Pressurization Unit #8', ppm1: 'Switch pressure cut-out (1)', ppm2: 'Switch Pressure Cut Out (1) (Need LPO)', ppm3: 'Switch Pressure Cut Out Need To Replace (1)', ppm4: 'Switch Pressure Cut Out Need To Replace (1)', commonIssues: 'Switch pressure cut-out (1)', fixedIssues: 'None', notes: 'No other PPM2 additions for this unit' },
    
    // B7 Building
    { building: 'B7', mainSystem: 'York Chiller', equipment: 'Chiller #1 (Sys #1)', ppm1: 'Plug sensor (2); Plug transducer (2); Flow switch (1)', ppm2: 'Plug sensor (2) (Need LPO), Plug transducer (2) (Need LPO), Flow switch (1) (Need LPO)', ppm3: 'Condenser Fan Motor Make Noise Need To Bearing Replacement (2); Plug Sensor Defective Need To Replace (2); Flow Switch Defective Need To Replace (1); Plug Transducer Defective Need To Replace (2)', ppm4: 'Condenser Fan Motor Make Noise Need To Bearing Replacement (2); Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2)', commonIssues: 'Plug sensor, plug transducer, flow switch', fixedIssues: 'None', notes: 'No other PPM2 additions for this chiller' },
    { building: 'B7', mainSystem: 'York Chiller', equipment: 'Chiller #2 (Sys #1 & #2)', ppm1: 'Fuse 3A (3); Water pump bearing (1); Plug sensor (2); Plug transducer (2); Flow switch (1); Leak test', ppm2: 'Fuse 3A (3) (Need LPO), Water pump bearing (1) (Need LPO), Plug sensor (2) (Need LPO), Plug transducer (2) (Need LPO), Flow switch (1) (Need LPO), Leak test (1) (Need LPO). Additional consumables: R410A (2), N2 (1), Filter (1) (Need LPO)', ppm3: 'Fuse Defective Need To Replace (3); Water Pump Need Bearing Change (1); Plug Sensor Defective Need To Replace (2); Need To Leak Test (1); Plug Transducer Defective Need To Replace (2); Flow Switch Defective Need To Replace (1)', ppm4: 'Fuse Defective Need To Replace (3); Water Pump Need Bearing Change (1); Plug Sensor Defective Need To Replace (2); Need To Leak Test (1); Plug Transducer Defective Need To Replace (2)', commonIssues: 'Fuse 3A, water pump bearing, plug sensor, plug transducer, flow switch, leak test', fixedIssues: 'None', notes: 'Contractor added consumables: R410A(2), N2(1), filter(1)' },
    { building: 'B7', mainSystem: 'York Chiller', equipment: 'Chiller#1 Sys #2', ppm1: '', ppm2: '', ppm3: 'Condenser Fan Contactor Defective Need To Replace (2); Fan Motor Defective Need To Rewinding (1); Required Leak Test (1); Fuse Defective Need To Replace (3); Water Pump Need Bearing Change (1)', ppm4: 'Condenser Fan Contactor Defective Need To Replace (2); Fan Motor Defective Need To Rewinding (1); Required Leak Test (1); Fuse Defective Need To Replace (3); Water Pump Need Bearing Change (1)', commonIssues: '', fixedIssues: '', notes: 'Equipment identified in PPM3/PPM4 visits - not in original tracker' },
    { building: 'B7', mainSystem: 'Pressurisations', equipment: 'Pressurization Unit #2', ppm1: 'Switch pressure cut-out (1); Valve 1" (4); Bearing replacement', ppm2: 'Switch pressure cut-out (1) (Need LPO); Valve 1" (4) (Need LPO); Bearing replacement (1) (Need LPO)', ppm3: '', ppm4: '', commonIssues: 'Switch pressure cut-out, valve 1", bearing replacement', fixedIssues: 'None', notes: 'No other changes in PPM2' },
    { building: 'B7', mainSystem: 'Pressurisations', equipment: 'Pressurization Unit No.9', ppm1: '', ppm2: '', ppm3: 'Need Change Start Control Hand Sit (1); Switch Pressure Cut Out Need To Replace (1); Need Change Valve 1 Inch (4)', ppm4: 'Need Change Start Control Hand Sit (1); Switch Pressure Cut Out Need To Replace (1); Need Change Valve 1 Inch (4)', commonIssues: '', fixedIssues: '', notes: 'Equipment identified in PPM3/PPM4 visits - not in original tracker' },
    
    // B8 Building
    { building: 'B8', mainSystem: '(All)', equipment: '(Misc. Water Chemical Treatment)', ppm1: 'Chemical treatment (Need LPO)', ppm2: 'Chemical treatment (1) (Need LPO)', ppm3: '', ppm4: '', commonIssues: 'Chemical treatment', fixedIssues: 'None', notes: 'Water chemical treatment required across all equipment' },
    { building: 'B8', mainSystem: 'York Chiller', equipment: 'Chiller #1 (Sys #1 & #2)', ppm1: 'Fuse (1); Suction transducer (1); Plug sensor (2); Plug transducer (2); Flow switch (1); Pump overhaul (1); Leak test', ppm2: 'Fuse (1) (Need LPO), Suction transducer (1) (Need LPO), Plug sensor (2) (Need LPO), Plug transducer (2) (Need LPO), Flow switch (1) (Need LPO), Pump overhaul (1) (Need LPO), Leak test (1) (Need LPO). Additional: R410A (2), N2 (1), Filter (1) (Need LPO)', ppm3: 'There Is No Gas (1); Pump No.1 Need Overhauling (1); Suction Transducer Defective (1); Plug Sensor Defective (2); Plug Transducer Defective (2); Flow Switch Defective (1)', ppm4: 'There Is No Gas Need To Leak Test (1); Pump No.1 Need Overhauling (1); Suction Transducer Defective Need To Replace (1); Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2)', commonIssues: 'Fuse, suction transducer, plug sensor, plug transducer, flow switch, pump overhaul, leak test', fixedIssues: 'None', notes: 'Critical issue: no refrigerant gas detected. Additional consumables: R410A(2), N2(1), filter(1)' },
    { building: 'B8', mainSystem: 'York Chiller', equipment: 'Chiller #2 (Sys #1 & #2)', ppm1: 'Suction transducer (1); Discharge transducer (1); Filter drier holder (1); Plug sensor (2); Plug transducer (2); Condenser fan bearing (1); Pump overhaul (1); Water sensor inlet (1); Fuse (1)', ppm2: 'Suction transducer (1) (Need LPO), Discharge transducer (1) (Need LPO), Filter drier holder (1) (Need LPO), Plug sensor (2) (Need LPO), Plug transducer (2) (Need LPO), Condenser fan bearing (1) (Need LPO), Pump overhaul (1) (Need LPO), Water sensor inlet (1) (Need LPO), Fuse (1) (Need LPO). Additional: R410A (2), N2 (1), Filter (1) (Need LPO)', ppm3: 'There Is No Gas (1); Suction Transducer Defective (1); Discharge Transducer Defective (1); Change The Filter Drier Holder (1); Plug Sensor Defective (2); Plug Transducer Defective (2); Condenser Fan Need Bearing (1); Pump No.2 Need Overhauling (1); Water Sensor Inlet Defective (1); Fuse Defective (1); Condenser Fan Need Bearing Replacement (1); Fuse Defective Need To Replace (1); Flow Switch Defective Need To Replace (1)', ppm4: 'There Is No Gas Need To Leak Test (1); Suction Transducer Defective Need To Replace (1); Discharge Transducer Defective Need To Replace (1); Change The Filter Drier Holder (1); Plug Sensor Defective Need To Replace (2); Plug Transducer Defective Need To Replace (2); Condenser Fan Need Bearing Replacement (1); Pump No.2 Need Overhauling (1); Water Sensor Inlet Defective Need To Replace (1); Fuse Defective Need To Replace (1); Fuse Defective Need To Replace (1); Condenser Fan Need Bearing Replacement (1)', commonIssues: 'Suction transducer, discharge transducer, filter drier holder, plug sensor, plug transducer, condenser fan bearing, pump overhaul, water sensor inlet, fuse', fixedIssues: 'None', notes: 'Critical issue: no refrigerant gas detected. Comprehensive repairs needed. Additional consumables: R410A(2), N2(1), filter(1)' },
    { building: 'B8', mainSystem: 'Pressurisations', equipment: 'Pressurization Unit #10', ppm1: 'High-pressure cut-out (1); Pipe connector (1)', ppm2: 'High-Pressure Cut Out (1) (Need LPO); Pipe connector for pump (1) (Need LPO)', ppm3: 'High Pressure Cut Out (1); Pipe Connector For Pump Need (1)', ppm4: 'High Pressure Cut Out Need to Replace (1)', commonIssues: 'High-pressure cut-out, pipe connector', fixedIssues: 'None', notes: 'New pipe connector identified in PPM2' }
];

// Modal for Adding/Editing Records
const HvacRecordModal = ({ record, onSave, onCancel, buildings, mainSystems }) => {
    const [editedRecord, setEditedRecord] = useState(record || { building: '', mainSystem: '', equipment: '', ppm1: '', ppm2: '', ppm3: '', ppm4: '', commonIssues: '', fixedIssues: '', notes: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedRecord(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(editedRecord);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#ffffff' }}>
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#5f5168' }}>
                    {record && record.id ? 'Edit Record' : 'Add New Record'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input list="buildings" name="building" value={editedRecord.building} onChange={handleChange} placeholder="Building" 
                        className="p-2 border rounded-lg focus:ring-2 focus:border-transparent" 
                        style={{ borderColor: '#BFA181', focusRingColor: '#5f5168' }} />
                    <datalist id="buildings">
                        {buildings.map(b => <option key={b} value={b} />)}
                    </datalist>

                    <input list="mainSystems" name="mainSystem" value={editedRecord.mainSystem} onChange={handleChange} placeholder="Main System" 
                        className="p-2 border rounded-lg focus:ring-2 focus:border-transparent" 
                        style={{ borderColor: '#BFA181', focusRingColor: '#5f5168' }} />
                    <datalist id="mainSystems">
                        {mainSystems.map(s => <option key={s} value={s} />)}
                    </datalist>
                    
                    <input type="text" name="equipment" value={editedRecord.equipment} onChange={handleChange} placeholder="Equipment" 
                        className="p-2 border rounded-lg md:col-span-2 focus:ring-2 focus:border-transparent" 
                        style={{ borderColor: '#BFA181', focusRingColor: '#5f5168' }} />
                    
                    <textarea name="ppm1" value={editedRecord.ppm1} onChange={handleChange} placeholder="PPM1 Findings" 
                        className="p-2 border rounded-lg h-24 focus:ring-2 focus:border-transparent" 
                        style={{ borderColor: '#BFA181', focusRingColor: '#5f5168' }} />
                    <textarea name="ppm2" value={editedRecord.ppm2} onChange={handleChange} placeholder="PPM2 Findings" 
                        className="p-2 border rounded-lg h-24 focus:ring-2 focus:border-transparent" 
                        style={{ borderColor: '#BFA181', focusRingColor: '#5f5168' }} />
                    <textarea name="ppm3" value={editedRecord.ppm3} onChange={handleChange} placeholder="PPM3 Findings" 
                        className="p-2 border rounded-lg h-24 focus:ring-2 focus:border-transparent" 
                        style={{ borderColor: '#BFA181', focusRingColor: '#5f5168' }} />
                    <textarea name="ppm4" value={editedRecord.ppm4} onChange={handleChange} placeholder="PPM4 Findings" 
                        className="p-2 border rounded-lg h-24 focus:ring-2 focus:border-transparent" 
                        style={{ borderColor: '#BFA181', focusRingColor: '#5f5168' }} />

                    <textarea name="commonIssues" value={editedRecord.commonIssues} onChange={handleChange} placeholder="Common Issues" 
                        className="p-2 border rounded-lg h-24 focus:ring-2 focus:border-transparent" 
                        style={{ borderColor: '#BFA181', focusRingColor: '#5f5168' }} />
                    <textarea name="fixedIssues" value={editedRecord.fixedIssues} onChange={handleChange} placeholder="Fixed Issues" 
                        className="p-2 border rounded-lg h-24 focus:ring-2 focus:border-transparent" 
                        style={{ borderColor: '#BFA181', focusRingColor: '#5f5168' }} />
                    
                    <textarea name="notes" value={editedRecord.notes} onChange={handleChange} placeholder="Notes" 
                        className="p-2 border rounded-lg h-24 md:col-span-2 focus:ring-2 focus:border-transparent" 
                        style={{ borderColor: '#BFA181', focusRingColor: '#5f5168' }} />
                </div>
                <div className="flex justify-end mt-6">
                    <button onClick={onCancel} 
                        className="px-4 py-2 rounded mr-2 hover:opacity-80 transition-opacity" 
                        style={{ backgroundColor: '#BFA181', color: '#ffffff' }}>
                        Cancel
                    </button>
                    <button onClick={handleSave} 
                        className="px-4 py-2 rounded hover:opacity-80 transition-opacity" 
                        style={{ backgroundColor: '#5f5168', color: '#ffffff' }}>
                        Save Record
                    </button>
                </div>
            </div>
        </div>
    );
};

// Modal for Confirming Deletion
const ConfirmModal = ({ onConfirm, onCancel, message }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm" style={{ backgroundColor: '#ffffff' }}>
                <h2 className="text-lg font-bold mb-4" style={{ color: '#5f5168' }}>Confirm Action</h2>
                <p className="mb-6" style={{ color: '#0A1828' }}>{message}</p>
                <div className="flex justify-end">
                    <button onClick={onCancel} 
                        className="px-4 py-2 rounded-md mr-2 hover:opacity-80 transition-opacity" 
                        style={{ backgroundColor: '#BFA181', color: '#ffffff' }}>
                        Cancel
                    </button>
                    <button onClick={onConfirm} 
                        className="px-4 py-2 rounded-md hover:opacity-80 transition-opacity" 
                        style={{ backgroundColor: '#A8D5E3', color: '#5f5168' }}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main App Component ---
export default function HVACModule() {
    // App state
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // UI state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);
    
    // Filtering state
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBuilding, setFilterBuilding] = useState('');
    const [filterSystem, setFilterSystem] = useState('');
    
    // Add sub-navigation state
    const [activeSubSection, setActiveSubSection] = useState('dashboard');

    // Define sub-navigation sections
    const subSections = [
      { name: 'Dashboard', id: 'dashboard', icon: LayoutDashboard },
      { name: 'PPM Records', id: 'records', icon: Database },
      { name: 'Analytics', id: 'analytics', icon: BarChart3 },
      { name: 'Maintenance', id: 'maintenance', icon: Settings },
      { name: 'Issues', id: 'issues', icon: AlertTriangle },
      { name: 'Reports', id: 'reports', icon: FileText }
    ];

    const STORAGE_KEY = 'hvac-ppm-tracker-data';

// Function to verify data integrity
const verifyInitialData = () => {
    console.log('Verifying initial data integrity...');
    console.log('Total initial records:', INITIAL_DATA.length);
    
    const buildings = [...new Set(INITIAL_DATA.map(r => r.building))];
    const systems = [...new Set(INITIAL_DATA.map(r => r.mainSystem))];
    
    console.log('Buildings in initial data:', buildings);
    console.log('Systems in initial data:', systems);
    
    // Check for any records with missing required fields
    const invalidRecords = INITIAL_DATA.filter(record => 
        !record.building || !record.mainSystem || !record.equipment
    );
    
    if (invalidRecords.length > 0) {
        console.warn('Found invalid records:', invalidRecords);
    } else {
        console.log('All initial data records are valid');
    }
    
    return INITIAL_DATA;
};

    // Load data from localStorage on component mount
    useEffect(() => {
        const loadData = () => {
            console.log('HVAC Module: Loading data from localStorage...');
            const savedData = loadFromLocalStorage(STORAGE_KEY);
            console.log('HVAC Module: Saved data from localStorage:', savedData);
            
            if (savedData && Array.isArray(savedData)) {
                console.log('HVAC Module: Loading saved data, count:', savedData.length);
                setRecords(savedData);
            } else {
                // Initialize with default data if no saved data exists
                console.log('HVAC Module: No saved data found, initializing with default data...');
                const verifiedData = verifyInitialData();
                console.log('HVAC Module: Initial data count:', verifiedData.length);
                const initialRecords = verifiedData.map(record => ({
                    ...record,
                    id: generateId()
                }));
                console.log('HVAC Module: Initial records with IDs:', initialRecords.length);
                setRecords(initialRecords);
                saveToLocalStorage(STORAGE_KEY, initialRecords);
                console.log('HVAC Module: Data saved to localStorage');
            }
            setIsLoading(false);
            console.log('HVAC Module: Loading complete');
        };

        loadData();
    }, []);

    // --- CRUD Handlers ---
    const handleSaveRecord = (recordToSave) => {
        let updatedRecords;
        
        if (recordToSave.id) {
            // Update existing record
            updatedRecords = records.map(record => 
                record.id === recordToSave.id ? recordToSave : record
            );
        } else {
            // Add new record
            const newRecord = {
                ...recordToSave,
                id: generateId()
            };
            updatedRecords = [...records, newRecord];
        }
        
        setRecords(updatedRecords);
        saveToLocalStorage(STORAGE_KEY, updatedRecords);
        setIsModalOpen(false);
        setEditingRecord(null);
    };
    
    const handleEdit = (record) => {
        setEditingRecord(record);
        setIsModalOpen(true);
    };
    
    const handleDeleteRequest = (id) => {
        setRecordToDelete(id);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!recordToDelete) return;
        
        const updatedRecords = records.filter(record => record.id !== recordToDelete);
        setRecords(updatedRecords);
        saveToLocalStorage(STORAGE_KEY, updatedRecords);
        
        setIsConfirmModalOpen(false);
        setRecordToDelete(null);
    };

    const handleCancelDelete = () => {
        setIsConfirmModalOpen(false);
        setRecordToDelete(null);
    };

    const handleAddNew = () => {
        setEditingRecord(null);
        setIsModalOpen(true);
    };
    
    // --- Derived State and Rendering ---
    const buildings = [...new Set(records.map(r => r.building))].sort();
    const mainSystems = [...new Set(records.map(r => r.mainSystem))].sort();

    const filteredRecords = records.filter(record => {
        const searchTermLower = searchTerm.toLowerCase();
        const matchesSearch = Object.values(record).some(value =>
            String(value).toLowerCase().includes(searchTermLower)
        );
        const matchesBuilding = filterBuilding ? record.building === filterBuilding : true;
        const matchesSystem = filterSystem ? record.mainSystem === filterSystem : true;
        return matchesSearch && matchesBuilding && matchesSystem;
    });

    // Debug logging
    console.log('HVAC Module: Current state - isLoading:', isLoading, 'records count:', records.length, 'filteredRecords count:', filteredRecords.length);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen" style={{ backgroundColor: '#F2F0EA' }}>
                <div className="text-xl" style={{ color: '#5f5168' }}>Loading HVAC Tracker...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: '#F2F0EA' }}>
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold" style={{ color: '#5f5168' }}>HVAC PPM Tracker</h1>
                    <p className="mt-1" style={{ color: '#0A1828' }}>Manage and track HVAC/BMS equipment maintenance across all buildings.</p>
                </header>

                {/* Sub Navigation */}
                <SubNavigation 
                  sections={subSections}
                  activeSection={activeSubSection}
                  onSectionChange={setActiveSubSection}
                />

                {/* Conditional Content Based on Active Section */}
                {activeSubSection === 'dashboard' && (
                  <>
                    {/* Dashboard Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      <div className="p-6 rounded-xl shadow-md" style={{ backgroundColor: '#ffffff' }}>
                        <div className="flex items-center">
                          <div className="p-3 rounded-full" style={{ backgroundColor: '#A8D5E3' }}>
                            <span className="text-2xl font-bold" style={{ color: '#5f5168' }}>🏢</span>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium" style={{ color: '#0A1828' }}>Total Buildings</p>
                            <p className="text-2xl font-bold" style={{ color: '#5f5168' }}>
                              {buildings.length}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 rounded-xl shadow-md" style={{ backgroundColor: '#ffffff' }}>
                        <div className="flex items-center">
                          <div className="p-3 rounded-full" style={{ backgroundColor: '#C3FBF4' }}>
                            <span className="text-2xl font-bold" style={{ color: '#5f5168' }}>⚙️</span>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium" style={{ color: '#0A1828' }}>Total Equipment</p>
                            <p className="text-2xl font-bold" style={{ color: '#5f5168' }}>
                              {filteredRecords.length}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 rounded-xl shadow-md" style={{ backgroundColor: '#ffffff' }}>
                        <div className="flex items-center">
                          <div className="p-3 rounded-full" style={{ backgroundColor: '#F2F0EA' }}>
                            <span className="text-2xl font-bold" style={{ color: '#5f5168' }}>🔧</span>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium" style={{ color: '#0A1828' }}>Critical Issues</p>
                            <p className="text-2xl font-bold" style={{ color: '#5f5168' }}>
                              {filteredRecords.filter(record => 
                                record.ppm4.toLowerCase().includes('need to replace') || 
                                record.ppm4.toLowerCase().includes('defective') ||
                                record.ppm4.toLowerCase().includes('no gas')
                              ).length}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 rounded-xl shadow-md" style={{ backgroundColor: '#ffffff' }}>
                        <div className="flex items-center">
                          <div className="p-3 rounded-full" style={{ backgroundColor: '#BFA181' }}>
                            <span className="text-2xl font-bold" style={{ color: '#ffffff' }}>📋</span>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium" style={{ color: '#0A1828' }}>Maintenance Systems</p>
                            <p className="text-2xl font-bold" style={{ color: '#5f5168' }}>
                              {mainSystems.length}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Building-wise Summary */}
                    <div className="p-6 rounded-xl shadow-md mb-6" style={{ backgroundColor: '#ffffff' }}>
                      <h3 className="text-xl font-bold mb-4" style={{ color: '#5f5168' }}>Building Summary</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        {buildings.map(building => {
                          const buildingRecords = filteredRecords.filter(record => record.building === building);
                          const criticalIssues = buildingRecords.filter(record => 
                            record.ppm4.toLowerCase().includes('need to replace') || 
                            record.ppm4.toLowerCase().includes('defective') ||
                            record.ppm4.toLowerCase().includes('no gas')
                          ).length;
                          
                          return (
                            <div key={building} className="text-center p-4 rounded-lg" 
                              style={{ 
                                backgroundColor: criticalIssues > 0 ? '#A8D5E3' : '#F2F0EA',
                                border: criticalIssues > 0 ? '2px solid #5f5168' : '1px solid #BFA181'
                              }}>
                              <h4 className="font-bold text-lg" style={{ color: '#5f5168' }}>{building}</h4>
                              <p className="text-sm" style={{ color: '#0A1828' }}>
                                {buildingRecords.length} Equipment
                              </p>
                              {criticalIssues > 0 && (
                                <p className="text-xs font-bold mt-1" style={{ color: '#5f5168' }}>
                                  {criticalIssues} Critical
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

                {activeSubSection === 'records' && (
                  <>
                    {/* Controls and Table */}
                    <div className="p-6 rounded-xl shadow-md mb-6" style={{ backgroundColor: '#ffffff' }}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                          type="text"
                          placeholder="Search all fields..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="p-3 border rounded-lg focus:ring-2 focus:border-transparent"
                          style={{ borderColor: '#BFA181', focusRingColor: '#5f5168' }}
                        />
                         <select
                          value={filterBuilding}
                          onChange={(e) => setFilterBuilding(e.target.value)}
                           className="p-3 border rounded-lg focus:ring-2 focus:border-transparent"
                           style={{ borderColor: '#BFA181', focusRingColor: '#5f5168' }}
                        >
                          <option value="">All Buildings</option>
                          {buildings.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                        <select
                          value={filterSystem}
                          onChange={(e) => setFilterSystem(e.target.value)}
                          className="p-3 border rounded-lg focus:ring-2 focus:border-transparent"
                          style={{ borderColor: '#BFA181', focusRingColor: '#5f5168' }}
                        >
                          <option value="">All Systems</option>
                          {mainSystems.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                       <div className="mt-4 flex justify-end">
                           <button
                              onClick={handleAddNew}
                              className="font-bold py-3 px-6 rounded-lg shadow hover:opacity-80 transition-opacity"
                              style={{ backgroundColor: '#5f5168', color: '#ffffff' }}
                          >
                              Add New Record
                          </button>
                       </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl shadow-md" style={{ backgroundColor: '#ffffff' }}>
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase" style={{ backgroundColor: '#F2F0EA', color: '#0A1828' }}>
                          <tr>
                            {['Building', 'Main System', 'Equipment', 'PPM1 Findings', 'PPM2 Findings', 'PPM3 Findings', 'PPM4 Findings', 'Common Issues', 'Fixed Issues', 'Notes', 'Actions'].map(header => (
                              <th key={header} scope="col" className="px-6 py-3 min-w-[150px]">{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {filteredRecords.map((record, index) => (
                            <tr key={record.id} className="border-b hover:opacity-80 transition-opacity" 
                              style={{ 
                                backgroundColor: index % 2 === 0 ? '#ffffff' : '#fffeff',
                                borderBottomColor: '#F2F0EA'
                              }}>
                              <td className="px-6 py-4 font-medium" style={{ color: '#5f5168' }}>{record.building}</td>
                              <td className="px-6 py-4" style={{ color: '#0A1828' }}>{record.mainSystem}</td>
                              <td className="px-6 py-4" style={{ color: '#0A1828' }}>{record.equipment}</td>
                              <td className="px-6 py-4 whitespace-pre-wrap" style={{ color: '#0A1828' }}>{record.ppm1}</td>
                              <td className="px-6 py-4 whitespace-pre-wrap" style={{ color: '#0A1828' }}>{record.ppm2}</td>
                              <td className="px-6 py-4 whitespace-pre-wrap" style={{ color: '#0A1828' }}>{record.ppm3}</td>
                              <td className="px-6 py-4 whitespace-pre-wrap" style={{ color: '#0A1828' }}>{record.ppm4}</td>
                              <td className="px-6 py-4 whitespace-pre-wrap" style={{ color: '#0A1828' }}>{record.commonIssues}</td>
                              <td className="px-6 py-4 whitespace-pre-wrap" style={{ color: '#0A1828' }}>{record.fixedIssues}</td>
                              <td className="px-6 py-4 whitespace-pre-wrap" style={{ color: '#0A1828' }}>{record.notes}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <button onClick={() => handleEdit(record)} 
                                    className="font-medium hover:underline" 
                                    style={{ color: '#5f5168' }}>
                                    Edit
                                  </button>
                                  <button onClick={() => handleDeleteRequest(record.id)} 
                                    className="font-medium hover:underline" 
                                    style={{ color: '#A8D5E3' }}>
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                     {filteredRecords.length === 0 && (
                        <div className="text-center py-10 rounded-xl shadow-md mt-6" style={{ backgroundColor: '#ffffff' }}>
                            <p style={{ color: '#BFA181' }}>No records found. Try adding a new record or adjusting your filters.</p>
                            <p className="text-sm mt-2" style={{ color: '#0A1828' }}>
                                Total records in system: {records.length} | Search term: "{searchTerm}" | Building filter: "{filterBuilding}" | System filter: "{filterSystem}"
                            </p>
                            <button 
                                onClick={() => {
                                    localStorage.removeItem(STORAGE_KEY);
                                    window.location.reload();
                                }}
                                className="mt-4 px-4 py-2 rounded-lg" 
                                style={{ backgroundColor: '#A8D5E3', color: '#5f5168' }}
                            >
                                Reset Data & Reload
                            </button>
                        </div>
                    )}
                  </>
                )}

                {activeSubSection === 'analytics' && (
                  <div className="chart-card">
                    <div className="text-center py-12">
                      <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-slate-700 mb-2">Analytics Dashboard</h3>
                      <p className="text-slate-500">Comprehensive analysis of HVAC system performance</p>
                    </div>
                  </div>
                )}

                {activeSubSection === 'maintenance' && (
                  <div className="chart-card">
                    <div className="text-center py-12">
                      <Settings className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-slate-700 mb-2">Maintenance Scheduler</h3>
                      <p className="text-slate-500">Schedule and track preventive maintenance activities</p>
                    </div>
                  </div>
                )}

                {activeSubSection === 'issues' && (
                  <div className="chart-card">
                    <div className="text-center py-12">
                      <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-slate-700 mb-2">Critical Issues</h3>
                      <p className="text-slate-500">Monitor and resolve critical HVAC system issues</p>
                    </div>
                  </div>
                )}

                {activeSubSection === 'reports' && (
                  <div className="chart-card">
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-slate-700 mb-2">HVAC Reports</h3>
                      <p className="text-slate-500">Generate comprehensive maintenance and performance reports</p>
                    </div>
                  </div>
                )}
            </div>

            {isModalOpen && (
                <HvacRecordModal
                    record={editingRecord}
                    onSave={handleSaveRecord}
                    onCancel={() => { setIsModalOpen(false); setEditingRecord(null); }}
                    buildings={buildings}
                    mainSystems={mainSystems}
                />
            )}
            {isConfirmModalOpen && (
                <ConfirmModal
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    message="Are you sure you want to delete this record? This action cannot be undone."
                />
            )}
        </div>
    );
} 