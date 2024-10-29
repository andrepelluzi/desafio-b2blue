"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Container,
  Snackbar,
  Typography,
} from "@mui/material";

import type { Station } from "@/types/station";
import { CollectionRequests } from "@/components/CollectionRequests";
import { StationCard } from "@/components/StationCard";
import { UpdateFillPercentageModal } from "@/components/UpdateFillPercentageModal";

export default function Home() {
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedStationId, setSelectedStationId] = useState<Station['id'] | null>(null);
  const [updateFillPercentageModalOpen, setUpdateFillPercentageModalOpen] = useState(false);
  const [collectionRequests, setCollectionRequests] = useState<Station[]>([]);
  
  const [notification, setNotification] = useState<{open: boolean, message: string}>({
    open: false,
    message: ''
  });
  
  // Busca as estações no servidor
  const fetchStations = async () => {
    try {
      const response = await fetch('/api/stations');
      const data = await response.json();
      setStations(data);
    } catch (error) {
      console.error('Falha ao buscar estações:', error);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  useEffect(() => {
    // Cria uma lista de pedidos de coleta para as estações com nível de armazenamento >= 80%
    const requests = stations.filter(station => station.fillPercentage >= 80);
    setCollectionRequests(requests);
  }, [stations]);

  // Abre o modal de atualização de volume
  const handleOpenUpdateFillModal = (id: number) => {
    setUpdateFillPercentageModalOpen(true);
    setSelectedStationId(id);
  };

  // Atualiza o volume da estação
  const handleUpdateFill = async (id: number, value: number) => {
    try {
      await fetch('/api/operations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stationId: id,
          operationType: 'update_fill',
          fillPercentage: value
        }),
      });

      setStations(prev => prev.map(station => {
        if (station.id === id) {
          const updatedStation = { ...station, fillPercentage: value };
          if (value >= 80) {
            updatedStation.lastCollectionRequest = new Date();
          }
          return updatedStation;
        }
        return station;
      }));
      
      setNotification({
        open: true,
        message: value >= 80
          ? 'Coleta necessária! O armazém está quase cheio.'
          : 'Volume atualizado!'
      });
      
      setUpdateFillPercentageModalOpen(false);
    } catch (error) {
      console.error('Falha ao confirmar a coleta:', error);
      setNotification({
        open: true,
        message: 'Falha ao atualizar o volume da estação. Por favor, tente novamente.'
      })
    }
  }

  // Confirma a coleta de uma estação
  const handleConfirmCollection = async (station: Station) => {
    const { id, fillPercentage } = station;
    try {
      await fetch('/api/operations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stationId: id,
          operationType: 'collection',
          fillPercentage
        }),
      });

      setStations(prev => prev.map(station => {
        if (station.id === id) {
          return {
            ...station,
            fillPercentage: 0,
            lastCollected: new Date(),
          };
        }
        return station;
      }));
      
      setNotification({
        open: true,
        message: 'Coleta confirmada! A estação foi esvaziada.'
      });
    } catch (error) {
      console.error('Falha ao confirmar a coleta:', error);
      setNotification({
        open: true,
        message: 'Falha ao confirmar a coleta. Por favor, tente novamente.'
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
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
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
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
              />
            ))}
          </Box>

          {collectionRequests.length > 0 && (
          <Box>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Pedidos de Coleta
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <CollectionRequests stations={collectionRequests} onConfirmCollection={handleConfirmCollection} />
            </Box>
          </Box>
          )}

          <UpdateFillPercentageModal
            open={updateFillPercentageModalOpen}
            stationName={
              stations.find((s) => s.id === selectedStationId)?.name || ""
            }
            fillPercentage={
              stations.find((s) => s.id === selectedStationId)?.fillPercentage || 0
            }
            onClose={() => setUpdateFillPercentageModalOpen(false)}
            onUpdateFill={(value) => selectedStationId && handleUpdateFill(selectedStationId, value)}
          />

          <Snackbar
            open={notification.open}
            autoHideDuration={6000}
            onClose={handleCloseNotification}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={handleCloseNotification} 
              severity={notification.message.includes('cheio') ? 'warning' : 'success'}
              sx={{ width: '100%' }}
            >
              {notification.message}
            </Alert>
          </Snackbar>

      </Box>
    </Container>
  );
}
