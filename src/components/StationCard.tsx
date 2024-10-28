'use client';

import React from 'react';
import { Box, Card, CardContent, Typography, LinearProgress, Button } from '@mui/material';
import { Station } from '../types/station';

interface StationCardProps {
  station: Station;
  handleOpenUpdateFillModal: (id: number) => void;
  onConfirmCollection: (id: number) => void;
}

export const StationCard: React.FC<StationCardProps> = ({ station, handleOpenUpdateFillModal,onConfirmCollection }) => {
  return (
    <Card 
      sx={{ 
        minWidth: 300,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            {station.name}
          </Typography>
          <Button
            variant="contained"
            onClick={() => handleOpenUpdateFillModal(station.id)}
            sx={{ ml: 'auto' }}
          >
            Atualizar Volume
          </Button>
        </Box>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Nível de armazenamento: {station.fillPercentage}%
          </Typography>
        <Box sx={{ mb: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={station.fillPercentage}
            color={station.fillPercentage >= 80 ? "error" : "primary"}
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
          Última coleta: {station.lastCollected.toLocaleString('pt-BR')}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {station.fillPercentage >= 80 && (
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => onConfirmCollection(station.id)}
              size="small"
            >
              Collect
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};