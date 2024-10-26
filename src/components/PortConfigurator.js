// PortConfigurator.js
import React, { useState } from 'react';
import {
  FormControlLabel,
  Checkbox,
  Grid,
  Card,
  CardContent,
  Typography,
  Switch,
  Box,
  TextField,
} from '@mui/material';

const PortConfigurator = ({ portNumber, onConfigChange }) => {
  const availableVlans = [100, 101, 130, 700, 850, 1000, 1001];
  const [selectedVlans, setSelectedVlans] = useState({});
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [packageAP, setPackageAP] = useState(false);
  const [packageTV, setPackageTV] = useState(false);

  // Определяем пакеты VLANов
  const packageAPVlans = {
    101: { tagged: false }, // untagged
    100: { tagged: true }, // tagged
    130: { tagged: true },
    700: { tagged: true },
    1000: { tagged: true },
    1001: { tagged: true },
  };

  const packageTVVlans = {
    850: { tagged: false }, // untagged
  };

  const handleVlanCheckboxChange = (vlan) => (event) => {
    const checked = event.target.checked;
    setSelectedVlans((prevState) => {
      const newState = { ...prevState };
      if (checked) {
        newState[vlan] = { tagged: false }; // По умолчанию untagged
      } else {
        delete newState[vlan];
      }
      onConfigChange(portNumber, { vlans: newState, name, disabled });
      return newState;
    });
  };

  const handleVlanTypeChange = (vlan) => (event) => {
    const checked = event.target.checked;
    setSelectedVlans((prevState) => {
      const newState = {
        ...prevState,
        [vlan]: { tagged: checked },
      };
      onConfigChange(portNumber, { vlans: newState, name, disabled });
      return newState;
    });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    onConfigChange(portNumber, { vlans: selectedVlans, name: e.target.value, disabled });
  };

  const handleDisabledChange = (e) => {
    setDisabled(e.target.checked);
    onConfigChange(portNumber, { vlans: selectedVlans, name, disabled: e.target.checked });
  };

  // Обработчики для пакетов
  const handlePackageAPChange = (e) => {
    const checked = e.target.checked;
    setPackageAP(checked);
    setSelectedVlans((prevState) => {
      let newState = { ...prevState };
      if (checked) {
        newState = { ...newState, ...packageAPVlans };
      } else {
        // Удаляем VLANы пакета AP
        Object.keys(packageAPVlans).forEach((vlan) => {
          delete newState[vlan];
        });
      }
      onConfigChange(portNumber, { vlans: newState, name, disabled });
      return newState;
    });
  };

  const handlePackageTVChange = (e) => {
    const checked = e.target.checked;
    setPackageTV(checked);
    setSelectedVlans((prevState) => {
      let newState = { ...prevState };
      if (checked) {
        newState = { ...newState, ...packageTVVlans };
      } else {
        // Удаляем VLANы пакета TV
        Object.keys(packageTVVlans).forEach((vlan) => {
          delete newState[vlan];
        });
      }
      onConfigChange(portNumber, { vlans: newState, name, disabled });
      return newState;
    });
  };

  return (
    <Card variant="outlined" style={{ marginBottom: 16 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Порт {portNumber}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* Переключатели пакетов */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={packageAP}
                  onChange={handlePackageAPChange}
                  color="primary"
                />
              }
              label="AP"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={packageTV}
                  onChange={handlePackageTVChange}
                  color="primary"
                />
              }
              label="TV"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">VLAN's</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" flexWrap="wrap">
              {availableVlans.map((vlan) => (
                <Box key={vlan} mr={2} mb={2} textAlign="center">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={selectedVlans[vlan]?.tagged || false}
                        onChange={handleVlanTypeChange(vlan)}
                        color="primary"
                        disabled={!selectedVlans[vlan]}
                      />
                    }
                    label={selectedVlans[vlan]?.tagged ? 'T' : 'U'}
                    labelPlacement="top"
                  />
                  <br/>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedVlans[vlan] !== undefined}
                        onChange={handleVlanCheckboxChange(vlan)}
                        color="primary"
                      />
                    }
                    label={`${vlan}`}
                    labelPlacement="bottom"
                  />
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Имя порта"
              value={name}
              onChange={handleNameChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={disabled}
                  onChange={handleDisabledChange}
                  color="primary"
                />
              }
              label="Отключить порт"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PortConfigurator;
