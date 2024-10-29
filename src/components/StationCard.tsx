'use client';

import { Box, Card, CardContent, Typography, LinearProgress, Button } from '@mui/material';
import WarehouseIcon from '@mui/icons-material/Warehouse';

import { Station } from '../types/station';

interface StationCardProps {
  station: Station;
  handleOpenUpdateFillModal: (id: number) => void;
}

export const StationCard: React.FC<StationCardProps> = ({ station, handleOpenUpdateFillModal }) => {
  return (
    <Card 
      sx={{ 
        minWidth: 300,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <WarehouseIcon sx={{ mr: 1 }} />
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
        <Box sx={{ mb: 1 }}>
          <LinearProgress 
            variant="determinate" 
            value={station.fillPercentage}
            color={station.fillPercentage >= 80 ? "error" : "primary"}
            sx={{ height: 20, borderRadius: 5 }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
          Última coleta: {station.lastCollected?.toLocaleString('pt-BR')}
        </Typography>
      </CardContent>
    </Card>
  );
};
