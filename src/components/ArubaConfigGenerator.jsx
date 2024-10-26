// ArubaConfigGenerator.js
import React, { useState } from 'react';
import PortConfigurator from './PortConfigurator';
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Paper,
  TextField,
} from '@mui/material';

const ArubaConfigGenerator = () => {
  const totalPorts = 28;
  const [portConfigs, setPortConfigs] = useState({});
  const [configText, setConfigText] = useState('');

  const handleConfigChange = (portNumber, config) => {
    setPortConfigs((prevConfigs) => ({
      ...prevConfigs,
      [portNumber]: config,
    }));
  };

  const generateConfig = () => {
    let config = '';

    // Конфигурация только настроенных портов
    Object.keys(portConfigs)
      .sort((a, b) => a - b)
      .forEach((portNumber) => {
        const portConfig = portConfigs[portNumber];
        config += `interface ${portNumber}\n`;
        if (portConfig.disabled) {
          config += `   disable\n`;
        } else {
          if (portConfig.name) {
            config += `   name "${portConfig.name}"\n`;
          }
          if (portConfig.vlans) {
            Object.keys(portConfig.vlans).forEach((vlan) => {
              const vlanItem = portConfig.vlans[vlan];
              const vlanType = vlanItem.tagged ? 'tagged' : 'untagged';
              config += `   ${vlanType} vlan ${vlan}\n`;
            });
          }
        }
      });

    setConfigText(config);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Генератор конфигурации Aruba
      </Typography>
      <Grid container spacing={2}>
        {Array.from({ length: totalPorts }, (_, i) => (
          <Grid item xs={12} key={i + 1}>
            <PortConfigurator
              portNumber={i + 1}
              onConfigChange={handleConfigChange}
            />
          </Grid>
        ))}
      </Grid>
      <Box textAlign="center" mt={4}>
        <Button variant="contained" color="primary" onClick={generateConfig}>
          Сгенерировать конфигурацию
        </Button>
      </Box>
      {configText && (
        <Paper elevation={3} style={{ padding: 16, marginTop: 24 }}>
          <Typography variant="h6">Сгенерированная конфигурация:</Typography>
          <pre>{configText}</pre>
        </Paper>
      )}
    </Container>
  );
};

export default ArubaConfigGenerator;
