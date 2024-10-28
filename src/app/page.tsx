"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
} from "@mui/material";

import type { Station } from "@/types/station";
import { StationCard } from "@/components/StationCard";
import { UpdateFillPercentageModal } from "@/components/UpdateFillPercentageModal";

// Configurações iniciais das estações
const initialStations: Station[] = [
  {
    id: 1,
    name: 'Estação 1',
    fillPercentage: 0,
    lastCollected: new Date(2024, 1, 1),
    status: 'normal',
  },
  {
    id: 2,
    name: 'Estação 2',
    fillPercentage: 0,
    lastCollected: new Date(2024, 1, 1),
    status: 'normal',
  },
  {
    id: 3,
    name: 'Estação 3',
    fillPercentage: 0,
    lastCollected: new Date(2024, 1, 1),
    status: 'normal',
  }
];

export default function Home() {
  const [stations, setStations] = useState<Station[]>(initialStations);
  const [selectedStationId, setSelectedStationId] = useState<number | null>(null);

  const [updateFillPercentageModalOpen, setUpdateFillPercentageModalOpen] = useState(false);

  // Abre o modal de atualização de volume
  const handleOpenUpdateFillModal = (id: number) => {
    setUpdateFillPercentageModalOpen(true);
    setSelectedStationId(id);
  };

  // Atualiza o volume da estação
  const handleUpdateFill = async (id: number, value: number) => {
    try {

      setStations(prev => prev.map(station => {
        if (station.id === id) {
          let status: Station['status'] = 'normal';
          if (value >= 80) status = 'collection-needed';
          else if (value >= 70) status = 'warning';
          
          return { ...station, fillPercentage: value, status };
        }
        return station;
      }));
      setUpdateFillPercentageModalOpen(false);
    } catch (error) {
      console.error('Falha ao atualizar o volume da estação:', error);
    }
  };

  // Confirma a coleta da estação
  const handleConfirmCollection = async (id: number) => {
    try {
      setStations(prev => prev.map(station => {
        if (station.id === id) {
          return {
            ...station,
            fillPercentage: 0,
            lastCollected: new Date(),
            status: 'normal'
          };
        }
        return station;
      }));
    } catch (error) {
      console.error('Falha ao confirmar a coleta:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        minHeight: '100vh',
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }}>
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          justifyContent: 'center',
          mb: 4
        }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Estações de Armazenamento de Resíduos
          </Typography>
        </Box>    
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)'
            },
            gap: 4
          }}>
            {stations.map(station => (
              <StationCard
                key={station.id}
                station={station}
                handleOpenUpdateFillModal={handleOpenUpdateFillModal}
                onConfirmCollection={handleConfirmCollection}
              />
            ))}
          </Box>
          <UpdateFillPercentageModal
            open={updateFillPercentageModalOpen}
            stationName={
              stations.find((s) => s.id === selectedStationId)?.name || ""
            }
            onClose={() => setUpdateFillPercentageModalOpen(false)}
            onUpdateFill={(value) => selectedStationId && handleUpdateFill(selectedStationId, value)}
          />
      </Box>
    </Container>
  );
}
